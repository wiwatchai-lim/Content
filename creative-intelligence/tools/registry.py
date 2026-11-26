"""Build, validate and report on the Creative Intelligence knowledge base.

  python creative-intelligence/tools/registry.py build     # rebuild SOURCE_REGISTRY.json from every source file
  python creative-intelligence/tools/registry.py validate  # schema + cross-file checks (exit 1 on errors)
  python creative-intelligence/tools/registry.py stats     # counts for the progress report

Sources come from (never edited here, only read):
  - creative-intelligence/knowledge/*/sources*.json       (new research batches, full records)
  - .claude/skills/ai-voice-director/RESEARCH_SOURCES.md  (legacy table; full records in research/*.md)
  - .claude/skills/ai-visual-artist/RESEARCH_SOURCES.md   (legacy table; full records in research/R*.md)
  - story-clips/_craft/curriculum/*.md                     (links listed in section 9, web pages)
Legacy entries keep a pointer to the file that holds their full record instead of copying it.
"""
import json, re, sys, glob, os
from collections import Counter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CI = os.path.join(ROOT, "creative-intelligence")
REG = os.path.join(CI, "SOURCE_REGISTRY.json")

ACCESS = {"full_text", "abstract", "publisher_page", "bibliographic", "search_summary", "web_page", "catalogue"}
TIERS = {"S", "A", "B", "C", "D", "E", "U"}  # U = not yet rated
STATUSES = ["NOT STARTED", "RESEARCHING", "DRAFTED", "SOURCE VERIFIED", "PRACTICALLY TESTED",
            "HUMAN REVIEWED", "PRODUCTION READY"]
REQUIRED = ["id", "key", "title", "url", "source_type", "tier", "access_status", "verification_status",
            "date_accessed", "modules", "origin"]


def norm_access(s):
    s = (s or "").strip().lower()
    if s.startswith("full"): return "full_text"
    if s.startswith("abstract"): return "abstract"
    if "biblio" in s: return "bibliographic"
    if "search" in s: return "search_summary"
    if "catalogue" in s: return "catalogue"
    if "publisher" in s or "docs" in s or "museum" in s: return "publisher_page"
    if "web page" in s: return "web_page"
    return s.replace(" ", "_")


def md_rows(path):
    for line in open(path, encoding="utf-8"):
        if line.startswith("| ") and not line.startswith("| key") and not line.startswith("|---"):
            yield [c.strip() for c in line.strip().strip("|").split("|")]


VOICE_AREA = {"emotion / prosody / phonetics": ["M02", "M20"], "Thai": ["M21", "M20"],
              "TTS/SER/QC": ["M36", "M24", "M42"], "pragmatics": ["M21"]}
VISUAL_AREA = {"fundamentals / perception": ["M04", "M05", "M07", "M08"], "colour / light / materials": ["M09", "M10", "M07"],
               "design / Thai type / story / character": ["M26", "M13", "M15"],
               "AI generation / evaluation / styles / rights": ["M36", "M42", "M11", "M39"],
               "reference licences": ["M39", "M11"]}
CURRIC = {"01": ["M18", "M10"], "02": ["M18"], "03": ["M08", "M18"], "04": ["M10"], "05": ["M18", "M25"],
          "06": ["M19"], "07": ["M19", "M34"], "08": ["M13", "M18"], "09": ["M36"], "10": ["M36", "M19"],
          "11": ["M25", "M09"], "12": ["M42", "M37"]}


def first_url(s):
    m = re.search(r"https?://[^\s)|,]+", s or "")
    return m.group(0).rstrip(".") if m else ""


def first_doi(s):
    m = re.search(r"10\.\d{4,9}/[^\s|,;]+", s or "")
    return m.group(0).rstrip(".") if m else ""


def legacy_voice():
    p = os.path.join(ROOT, ".claude/skills/ai-voice-director/RESEARCH_SOURCES.md")
    for r in md_rows(p):
        if len(r) < 7: continue
        key, title, by, ident, etype, acc, area = r[:7]
        if not re.match(r"^[A-Za-z]", key) or " " in key: continue
        yield {"key": key, "title": title, "authors": by, "year": None, "url": first_url(ident),
               "doi_isbn": first_doi(ident), "source_type": etype, "tier": "U",
               "access_status": norm_access(acc), "verification_status": "verified",
               "date_accessed": "2026-11-24", "modules": VOICE_AREA.get(area, ["M20"]),
               "origin": "ai-voice-director", "full_record": ".claude/skills/ai-voice-director/research/ (A/B/C files)"}


def legacy_visual():
    p = os.path.join(ROOT, ".claude/skills/ai-visual-artist/RESEARCH_SOURCES.md")
    for r in md_rows(p):
        if len(r) < 5: continue
        key, ref, acc, area, f = r[:5]
        if not re.match(r"^[A-Za-z]", key) or " " in key: continue
        t = re.search(r"Title:\s*(.+?)(?:\s+Authors?:|\s+Publisher:|$)", ref)
        y = re.search(r"Year:\s*(\d{4})", ref)
        yield {"key": key, "title": (t.group(1) if t else ref)[:200], "authors": "", "year": int(y.group(1)) if y else None,
               "url": first_url(ref), "doi_isbn": first_doi(ref), "source_type": "see full record", "tier": "U",
               "access_status": norm_access(acc), "verification_status": "verified", "date_accessed": "2026-11-24",
               "modules": VISUAL_AREA.get(area, ["M07"]), "origin": "ai-visual-artist",
               "full_record": ".claude/skills/ai-visual-artist/" + f}


def legacy_curriculum():
    seen = {}
    for p in sorted(glob.glob(os.path.join(ROOT, "story-clips/_craft/curriculum/[0-9]*.md"))):
        num = os.path.basename(p)[:2]
        txt = open(p, encoding="utf-8").read()
        sec = txt.split("## 9.")[-1] if "## 9." in txt else txt
        for label, url in re.findall(r"\[([^\]]+)\]\((https?://[^)]+)\)", sec):
            if url in seen:
                seen[url]["modules"] = sorted(set(seen[url]["modules"]) | set(CURRIC.get(num, [])))
                continue
            dom = re.sub(r"^https?://(www\.)?", "", url).split("/")[0]
            seen[url] = {"key": "web:" + dom + ":" + str(len(seen) + 1), "title": label, "authors": dom, "year": None,
                         "url": url, "doi_isbn": "", "source_type": "web page", "tier": "U",
                         "access_status": "web_page", "verification_status": "verified", "date_accessed": "2026-11-21",
                         "modules": CURRIC.get(num, []), "origin": "craft-curriculum",
                         "full_record": "story-clips/_craft/curriculum/" + os.path.basename(p)}
    return seen.values()


def new_batches():
    paths = sorted(glob.glob(os.path.join(CI, "knowledge", "*", "sources*.json")))
    paths += sorted(glob.glob(os.path.join(CI, "domains", "sources", "*.json")))  # v2 domain guides (2026-11-26)
    for p in paths:
        try:
            arr = json.load(open(p, encoding="utf-8"))
        except Exception as e:
            print("ERROR reading", p, e); continue
        for s in arr:
            s = dict(s)
            s["access_status"] = norm_access(s.get("access_status"))
            folder = os.path.basename(os.path.dirname(p))
            s.setdefault("origin", "ci:domain-" + os.path.basename(p)[:2] if folder == "sources" else "ci:" + folder)
            s.setdefault("full_record", os.path.relpath(p, ROOT).replace("\\", "/"))
            yield s


def auto_tier(s):
    """Rough first-pass tier for legacy entries (marked tier_method=auto; a human/agent should confirm)."""
    t = (s.get("source_type") or "").lower()
    if s["origin"] == "craft-curriculum":
        u = s.get("url", "")
        if re.search(r"docs\.|/docs|developer|\.edu|github\.com|w3\.org|itu\.int|ebu\.ch|theasc\.com|oscars\.org", u): return "C"
        return "D"
    if "meta-analysis" in t or "standard" in t: return "S"
    if any(k in t for k in ("review", "empirical", "textbook", "theory", "descriptive")): return "A"
    if "corpus" in t or "course" in t: return "B"
    if "docs" in t or "model card" in t: return "C"
    return "U"


def build():
    out, ids = [], Counter()
    for gen in (new_batches(), legacy_voice(), legacy_visual(), legacy_curriculum()):
        for s in gen:
            base = re.sub(r"[^A-Za-z0-9:._-]", "", s.get("key") or "src")
            ids[base] += 1
            if s.get("tier", "U") == "U" and s["origin"] in ("ai-voice-director", "craft-curriculum"):
                s["tier"] = auto_tier(s); s["tier_method"] = "auto"
            s["id"] = base if ids[base] == 1 else f"{base}~{ids[base]}"
            out.append(s)
    # same DOI or URL in several origins → link them, keep both records
    by = {}
    for s in out:
        k = (s.get("doi_isbn") or "").lower() or (s.get("url") or "").lower().rstrip("/")
        if k: by.setdefault(k, []).append(s["id"])
    for s in out:
        k = (s.get("doi_isbn") or "").lower() or (s.get("url") or "").lower().rstrip("/")
        dup = [i for i in by.get(k, []) if i != s["id"]]
        if dup: s["same_work_as"] = dup
    json.dump({"schema_version": "1.0", "generated_by": "tools/registry.py build",
               "note": "Generated file - edit the source files, then rebuild. tier U = not yet rated.",
               "sources": out}, open(REG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("registry:", len(out), "sources")


def validate():
    err, warn = [], []
    reg = json.load(open(REG, encoding="utf-8"))["sources"]
    seen = set()
    for s in reg:
        for f in REQUIRED:
            if s.get(f) in (None, "", []) and not (f == "url" and s.get("doi_isbn")):
                (err if f in ("id", "title", "access_status", "modules") else warn).append(f"{s.get('id')}: missing {f}")
        if s["id"] in seen: err.append("duplicate id " + s["id"])
        seen.add(s["id"])
        if s.get("tier") not in TIERS: err.append(f"{s['id']}: bad tier {s.get('tier')}")
        if s.get("access_status") not in ACCESS: err.append(f"{s['id']}: bad access_status {s.get('access_status')}")
        if s.get("origin", "").startswith("ci:"):
            for f in ("key_findings", "limitations"):
                if not s.get(f): warn.append(f"{s['id']}: no {f}")
            if s.get("access_status") in ("bibliographic", "search_summary") and s.get("tier") in ("S", "A") and s.get("key_findings"):
                warn.append(f"{s['id']}: findings claimed from {s['access_status']} - make sure they quote a secondary source")
    prog = json.load(open(os.path.join(CI, "LEARNING_PROGRESS.json"), encoding="utf-8"))
    for m in prog["modules"]:
        if m["status"] not in STATUSES: err.append(f"{m['id']}: bad status {m['status']}")
        for f in m.get("files", []):
            if not os.path.exists(os.path.join(ROOT, f)): err.append(f"{m['id']}: file not found {f}")
        if m["status"] in STATUSES[3:] and not any(m["id"] in s.get("modules", []) for s in reg):
            err.append(f"{m['id']}: status {m['status']} but no sources in registry")
        if m["status"] == "PRODUCTION READY" and not m.get("human_review"):
            err.append(f"{m['id']}: PRODUCTION READY needs human_review")
    cross = json.load(open(os.path.join(CI, "CROSS_DOMAIN_RELATIONSHIPS.json"), encoding="utf-8"))
    nodes = {n["id"] for n in cross["nodes"]}
    for e in cross["edges"]:
        for end in (e["from"], e["to"]):
            if end not in nodes: err.append(f"edge {e['from']}->{e['to']}: unknown node {end}")
    for w in warn[:40]: print("warn:", w)
    if len(warn) > 40: print(f"warn: ... {len(warn) - 40} more")
    for e in err: print("ERROR:", e)
    print(f"validate: {len(reg)} sources, {len(err)} errors, {len(warn)} warnings")
    return not err


def evidence():
    """Seed/refresh EVIDENCE_MATRIX.json: voice-skill claims (parsed) + claims added by hand (kept)."""
    out = os.path.join(CI, "EVIDENCE_MATRIX.json")
    keep = []
    if os.path.exists(out):
        keep = [c for c in json.load(open(out, encoding="utf-8"))["claims"] if c.get("origin") != "ai-voice-director"]
    claims = []
    p = os.path.join(ROOT, ".claude/skills/ai-voice-director/EVIDENCE_MATRIX.md")
    for r in md_rows(p):
        if len(r) < 6 or not r[0].isdigit(): continue
        claims.append({"id": "V" + r[0].zfill(3), "claim": r[1], "sources": [k.strip() for k in re.split(r",\s*", r[2]) if k.strip()],
                       "strength": r[3], "craft_notes": r[4], "used_in": r[5], "modules": ["M20", "M02"], "origin": "ai-voice-director"})
    json.dump({"schema_version": "1.0",
               "strength_scale": "A = several studies/meta-analysis agree; B = one or two solid studies or official doc; C = single small/abstract-only/indirect; D = craft only",
               "claims": claims + keep}, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("evidence:", len(claims), "voice +", len(keep), "other claims")


def knowledge_map():
    prog = json.load(open(os.path.join(CI, "LEARNING_PROGRESS.json"), encoding="utf-8"))
    reg = json.load(open(REG, encoding="utf-8"))["sources"]
    n = Counter(m for s in reg for m in s.get("modules", []))
    L = ["# Knowledge Map (generated by `registry.py map` - edit LEARNING_PROGRESS.json, not this file)", "",
         "| id | module | phase | status | sources | files (existing knowledge) | notes |", "|---|---|---|---|---|---|---|"]
    for m in prog["modules"]:
        own = m["folder"] + "/README.md"
        files = ([own] if os.path.exists(os.path.join(ROOT, own)) else []) + m.get("files", [])
        L.append(f"| {m['id']} | {m['name']} | {m['phase']} | {m['status']} | {n.get(m['id'], 0)} | "
                 + "<br>".join("`" + f + "`" for f in files) + f" | {m.get('notes', '')} |")
    open(os.path.join(CI, "KNOWLEDGE_MAP.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")
    print("map written")


def stats():
    reg = json.load(open(REG, encoding="utf-8"))["sources"]
    print("total", len(reg))
    print("origin", dict(Counter(s["origin"] for s in reg)))
    print("access", dict(Counter(s["access_status"] for s in reg)))
    print("tier", dict(Counter(s["tier"] for s in reg)))
    mods = Counter(m for s in reg for m in s.get("modules", []))
    print("per module", dict(sorted(mods.items())))
    prog = json.load(open(os.path.join(CI, "LEARNING_PROGRESS.json"), encoding="utf-8"))
    print("module status", dict(Counter(m["status"] for m in prog["modules"])))


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "validate"
    if cmd == "build": build(); evidence(); knowledge_map()
    elif cmd == "map": knowledge_map()
    elif cmd == "stats": stats()
    else: sys.exit(0 if validate() else 1)
