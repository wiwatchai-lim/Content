#!/usr/bin/env python3
"""Creative Memory — the studio's store of real experience.

One JSON-lines file per record type in creative-intelligence/memory/store/. Every record is something that really
happened (a user verdict, a test run, an observed error) with a pointer to where it came from. Nothing is invented.

  python creative-intelligence/tools/memory.py add --type approval --json '{...}'      # or --file rec.json
  python creative-intelligence/tools/memory.py recall --tags carousel,mint-tao --text "ความอดทน" [--type ...] [--limit 12]
  python creative-intelligence/tools/memory.py brief --job "Slowly Growing EP162" --tags slowly-growing,carousel
  python creative-intelligence/tools/memory.py stats | validate | digest     # digest → memory/MEMORY_DIGEST.md
  python creative-intelligence/tools/memory.py types                          # field guide per type

Run with `python -X utf8` on Windows if Thai prints as '?'.
"""
import argparse, datetime as dt, json, os, re, sys

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8")
    except Exception:
        pass

HERE = os.path.dirname(os.path.abspath(__file__))
CI = os.path.dirname(HERE)
STORE = os.path.join(CI, "memory", "store")
DIGEST = os.path.join(CI, "memory", "MEMORY_DIGEST.md")

# type → (meaning, required fields beyond the common ones, optional fields)
TYPES = {
    "approval":    ("work the user approved",                  ["artifact"], ["what_worked", "prompt_ref"]),
    "rejection":   ("work the user rejected or asked to redo", ["artifact"], ["what_failed", "fixed_by"]),
    "taste":       ("a stable preference of the user",         [],           ["applies_to", "not_for"]),
    "brand_style": ("a brand's visual/verbal rules",           ["brand"],    ["tokens", "do", "dont"]),
    "character":   ("a recurring character's fixed traits",    ["series", "name"], ["look", "voice", "personality", "never"]),
    "prompt":      ("a prompt that was actually run",          ["model", "text", "outcome"], ["settings", "seed", "output", "use_when"]),
    "error":       ("a mistake that happened or was caught",   ["what", "cause"], ["fix_ref", "detect_by"]),
    "fix":         ("a fix that worked, with proof",           ["problem", "solution"], ["proof", "error_ref"]),
    "rating":      ("a human (or AI, labelled) score",         ["rater", "score", "scale"], ["criteria", "artifact"]),
    "critique":    ("a Creative Critic report on a work",      ["artifact", "verdict"], ["findings", "critic", "accepted"]),
}
COMMON_REQ = ["id", "type", "date", "summary", "source", "evidence"]
EVIDENCE = {"user", "test", "observed", "sourced", "ai-judgement"}
SECRET = re.compile(r"(sk-[A-Za-z0-9]{16,}|AIza[0-9A-Za-z_\-]{20,}|api[_-]?key\s*[:=]\s*\S{8,}|password\s*[:=])", re.I)


def path(t):
    return os.path.join(STORE, f"{t}.jsonl")


def load(types=None):
    out = []
    for t in (types or TYPES):
        p = path(t)
        if not os.path.exists(p):
            continue
        with open(p, encoding="utf-8") as f:
            for n, line in enumerate(f, 1):
                line = line.strip()
                if line:
                    try:
                        out.append(json.loads(line))
                    except json.JSONDecodeError as e:
                        sys.exit(f"{p}:{n}: bad JSON ({e})")
    return out


def check(r):
    err = []
    t = r.get("type")
    if t not in TYPES:
        return [f"unknown type {t!r}"]
    for k in COMMON_REQ + TYPES[t][1]:
        if r.get(k) in (None, "", []):
            err.append(f"{r.get('id', '?')}: missing {k}")
    if r.get("evidence") and r["evidence"] not in EVIDENCE:
        err.append(f"{r.get('id')}: evidence must be one of {sorted(EVIDENCE)}")
    if r.get("date") and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(r["date"])):
        err.append(f"{r.get('id')}: date must be YYYY-MM-DD")
    if t == "rating" and r.get("rater", "").lower().startswith(("claude", "ai")) and r.get("evidence") != "ai-judgement":
        err.append(f"{r.get('id')}: an AI rating must have evidence 'ai-judgement'")
    if SECRET.search(json.dumps(r, ensure_ascii=False)):
        err.append(f"{r.get('id')}: looks like it contains a secret — never store keys or passwords")
    return err


def new_id(t, existing):
    day = dt.date.today().strftime("%Y%m%d")
    n = sum(1 for r in existing if r.get("id", "").startswith(f"{t[:3]}-{day}-")) + 1
    return f"{t[:3]}-{day}-{n:03d}"


def add(rec):
    t = rec.get("type")
    if t not in TYPES:
        sys.exit(f"--type must be one of {', '.join(TYPES)}")
    existing = load([t])
    rec = {k: v for k, v in rec.items() if v not in ("", None)}
    rec.setdefault("date", dt.date.today().isoformat())
    rec.setdefault("tags", [])
    rec["tags"] = sorted({s.strip().lower() for s in rec["tags"] if s.strip()})
    if not rec.get("id"):
        rec["id"] = new_id(t, existing)
    if any(r["id"] == rec["id"] for r in existing):
        sys.exit(f"id {rec['id']} already exists")
    e = check(rec)
    if e:
        sys.exit("not saved:\n  " + "\n  ".join(e))
    os.makedirs(STORE, exist_ok=True)
    with open(path(t), "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    print("saved", rec["id"])
    return rec["id"]


TOKEN = re.compile(r"[a-z0-9]+|[฀-๿]+", re.I)


def words(s):
    return {w.lower() for w in TOKEN.findall(s or "") if len(w) > 1}


def score(r, tags, q):
    rt = set(r.get("tags", []))
    s = 3.0 * len(rt & tags)
    if q:
        meta = ("id", "type", "date", "evidence", "superseded_by")
        blob = json.dumps({k: v for k, v in r.items() if k not in meta}, ensure_ascii=False).lower()
        hits = sum(1.0 for w in q if re.search((rf"{re.escape(w)}s?" if w.isascii() else re.escape(w)), blob))
        # without a shared tag, a single stray word is noise: need 2+ word hits
        s += hits if (s > 0 or hits >= 2) else 0
    if s == 0:
        return 0
    # mild recency and evidence weight: user verdicts and tests beat AI judgement
    s += {"user": 1.0, "test": 0.8, "observed": 0.6, "sourced": 0.4, "ai-judgement": 0.0}.get(r.get("evidence"), 0)
    try:
        age = (dt.date.today() - dt.date.fromisoformat(r["date"])).days
        s += max(0.0, 0.5 - age / 365)
    except Exception:
        pass
    if r.get("superseded_by"):
        s -= 2.5
    return s


def recall(types=None, tags="", text="", limit=12):
    tg = {t.strip().lower() for t in tags.split(",") if t.strip()}
    q = words(text)
    rows = [(score(r, tg, q), r) for r in load(types)]
    rows = [x for x in rows if x[0] > 0]
    rows.sort(key=lambda x: -x[0])
    return [r for _, r in rows[:limit]]


def line(r):
    extra = r.get("what_worked") or r.get("what_failed") or r.get("solution") or r.get("outcome") or r.get("verdict") or ""
    s = f"- [{r['id']}] ({r['type']}, {r['date']}, {r['evidence']}) {r['summary']}"
    if extra and extra not in r["summary"]:
        s += f" — {extra if isinstance(extra, str) else json.dumps(extra, ensure_ascii=False)}"
    if r.get("superseded_by"):
        s += f" [superseded by {r['superseded_by']}]"
    return s + f"  ⟵ {r['source']}"


def brief(job, tags, text):
    sections = [
        ("Taste & house preferences", ["taste", "brand_style"]),
        ("Characters", ["character"]),
        ("Approved before", ["approval", "rating"]),
        ("Rejected before (don't repeat)", ["rejection"]),
        ("Known errors to check", ["error"]),
        ("Fixes that worked", ["fix"]),
        ("Prompts already tested", ["prompt"]),
        ("Past critiques", ["critique"]),
    ]
    out = [f"# Memory brief — {job}", f"tags: {tags or '-'} · text: {text or '-'}", ""]
    total = 0
    for title, ts in sections:
        rs = recall(ts, tags, f"{job} {text}", limit=6)
        if rs:
            total += len(rs)
            out.append(f"## {title}")
            out += [line(r) for r in rs]
            out.append("")
    if not total:
        out.append("(no matching memory — say so; do not pretend there is history)")
    print("\n".join(out))
    used = re.findall(r"^- \[([a-z]{3}-\d{8}-\d{3})\]", "\n".join(out), re.M)
    os.makedirs(STORE, exist_ok=True)
    with open(os.path.join(STORE, "_usage.log"), "a", encoding="utf-8") as f:  # which lessons reached which job
        f.write(json.dumps({"date": dt.date.today().isoformat(), "job": job, "tags": tags, "ids": used}, ensure_ascii=False) + "\n")


def stats():
    rs = load()
    by = {}
    for r in rs:
        by.setdefault(r["type"], {}).setdefault(r["evidence"], 0)
        by[r["type"]][r["evidence"]] += 1
    print("records:", len(rs))
    for t in TYPES:
        print(f"  {t:12s} {sum(by.get(t, {}).values()):4d}  {by.get(t, {})}")


def validate():
    rs, errs, ids = load(), [], set()
    for r in rs:
        errs += check(r)
        if r["id"] in ids:
            errs.append(f"duplicate id {r['id']}")
        ids.add(r["id"])
    for r in rs:
        for k in ("superseded_by", "fix_ref", "error_ref", "prompt_ref", "fixed_by"):
            v = r.get(k)
            if isinstance(v, str) and re.fullmatch(r"[a-z]{3}-\d{8}-\d{3}", v) and v not in ids:
                errs.append(f"{r['id']}: {k} → {v} not found")
    today = dt.date.today().isoformat()
    due = [r["id"] for r in rs if r.get("review_by") and r["review_by"] < today and not r.get("superseded_by")]
    if due:
        print("review due (model/tool lessons may be stale - re-test, then update review_by or supersede):", ", ".join(due))
    print(f"validate: {len(rs)} records, {len(errs)} errors")
    for e in errs:
        print("  ", e)
    return not errs


def digest():
    rs = load()
    out = ["# Creative Memory — digest (generated by `tools/memory.py digest`, do not edit by hand)", "",
           f"{len(rs)} records · store: `memory/store/*.jsonl` · add with `memory.py add` · recall with `memory.py brief`", ""]
    for t, (meaning, *_ ) in TYPES.items():
        sub = sorted([r for r in rs if r["type"] == t], key=lambda r: r["date"], reverse=True)
        if not sub:
            continue
        out.append(f"## {t} — {meaning} ({len(sub)})")
        out += [line(r) for r in sub]
        out.append("")
    with open(DIGEST, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print("wrote", os.path.relpath(DIGEST, os.path.dirname(CI)))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest="cmd", required=True)
    a = sp.add_parser("add"); a.add_argument("--type", required=True); g = a.add_mutually_exclusive_group(required=True)
    g.add_argument("--json"); g.add_argument("--file")
    r = sp.add_parser("recall"); r.add_argument("--type", default=""); r.add_argument("--tags", default="")
    r.add_argument("--text", default=""); r.add_argument("--limit", type=int, default=12)
    b = sp.add_parser("brief"); b.add_argument("--job", required=True); b.add_argument("--tags", default="")
    b.add_argument("--text", default="")
    for c in ("stats", "validate", "digest", "types"):
        sp.add_parser(c)
    x = ap.parse_args()
    if x.cmd == "add":
        rec = json.loads(x.json) if x.json else json.load(open(x.file, encoding="utf-8"))
        rec["type"] = x.type
        add(rec)
    elif x.cmd == "recall":
        types = [t for t in x.type.split(",") if t] or None
        for rec in recall(types, x.tags, x.text, x.limit):
            print(line(rec))
    elif x.cmd == "brief":
        brief(x.job, x.tags, x.text)
    elif x.cmd == "stats":
        stats()
    elif x.cmd == "validate":
        sys.exit(0 if validate() else 1)
    elif x.cmd == "digest":
        digest()
    elif x.cmd == "types":
        print("common required:", ", ".join(COMMON_REQ), "· evidence:", ", ".join(sorted(EVIDENCE)))
        for t, (m, req, opt) in TYPES.items():
            print(f"  {t:12s} {m}\n{'':16s}required: {', '.join(req) or '-'} · optional: {', '.join(opt)} · always: tags, job, artifact paths")
        print("optional on any record: user_words, elicitation (asked-A/B|rating|said-unprompted|used-silently), "
              "review_by (YYYY-MM-DD, for model/tool lessons), model_version, superseded_by")


if __name__ == "__main__":
    main()
