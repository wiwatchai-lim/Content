#!/usr/bin/env python3
"""Blind the two runs and score the judges' JSON.

  python blind.py make  [--a baseline --b after --seed 26]   # runs/blind/<task>/{X,Y}.md + _key/blind_map.json
  python blind.py score                                        # reads runs/judge/*.json → RESULTS_TABLE.md (unblinded)
"""
import argparse, glob, json, os, random, re, shutil, statistics as st, sys

for _s in (sys.stdout,):
    try:
        _s.reconfigure(encoding="utf-8")
    except Exception:
        pass

B = os.path.dirname(os.path.abspath(__file__))
RUNS = os.path.join(B, "runs")
MAP = os.path.join(B, "_key", "blind_map.json")
KEY = os.path.join(B, "_key", "KEY.md")


def make(a, b, seed):
    rnd = random.Random(seed)
    out = os.path.join(RUNS, "blind")
    shutil.rmtree(out, ignore_errors=True)
    m = {}
    for p in sorted(glob.glob(os.path.join(RUNS, a, "*.md"))):
        t = os.path.basename(p)[:-3]
        q = os.path.join(RUNS, b, t + ".md")
        if not os.path.exists(q):
            print("missing in", b, t); continue
        flip = rnd.random() < 0.5
        x, y = (q, p) if flip else (p, q)
        os.makedirs(os.path.join(out, t))
        for lab, src in (("X", x), ("Y", y)):
            txt = open(src, encoding="utf-8").read()
            txt = re.sub(r"(?im)^files consulted:.*$", "Files consulted: [hidden for blind judging]", txt)
            open(os.path.join(out, t, lab + ".md"), "w", encoding="utf-8").write(txt)
        m[t] = {"X": b if flip else a, "Y": a if flip else b}
    json.dump(m, open(MAP, "w", encoding="utf-8"), indent=1)
    print("blinded", len(m), "tasks →", out)


def key_counts():
    """number of scored planted items and critical items per C task; number of key points per D task."""
    k = open(KEY, encoding="utf-8").read()
    res = {}
    for t in [f"C{i}" for i in range(1, 9)]:
        sec = re.search(rf"^## {t} .*?$(.*?)(?=^## )", k, re.S | re.M).group(1)
        items = re.findall(r"^(\d+)(†?)(?:\s|b)", sec, re.M)
        items = [(n, c) for n, c in items if "VOID" not in re.search(rf"^{n}.*$", sec, re.M).group(0)]
        res[t] = {"n": len({n for n, _ in items}), "crit": len({n for n, c in items if c})}
    dsec = re.search(r"^## Decisions.*?$(.*?)(?=^## )", k, re.S | re.M).group(1)
    for line in dsec.splitlines():
        m = re.match(r"^(D\d+):(.*)$", line)
        if m:
            res[m.group(1)] = {"points": len([x for x in m.group(2).split("·") if x.strip()])}
    return res


def score():
    m = json.load(open(MAP, encoding="utf-8"))
    kc = key_counts()
    judges = [json.load(open(p, encoding="utf-8")) for p in sorted(glob.glob(os.path.join(RUNS, "judge", "*.json")))]
    agg = {}  # (task, system) -> list of per-judge dicts
    pair = {}
    for j in judges:
        for t, v in j["tasks"].items():
            for lab in ("X", "Y"):
                if lab in v:
                    agg.setdefault((t, m[t][lab]), []).append(v[lab])
            if "preferred" in v:
                pref = v["preferred"]
                pair.setdefault(t, []).append(m[t][pref] if pref in ("X", "Y") else "tie")
    systems = sorted({s for _, s in agg})
    rows = ["# Studio Benchmark v1 — results (unblinded by blind.py)", "",
            "Scores are AI-judge scores against the answer key (`_key/KEY.md`); not human ratings.", ""]
    # critique
    rows += ["## A. Critique — planted-defect recall", "",
             "| task | items | " + " | ".join(f"{s} found · critical · extra valid/invalid · fix · reason" for s in systems) + " |",
             "|---|---|" + "---|" * len(systems)]
    tot = {s: {"found": 0, "n": 0, "crit": 0, "ncrit": 0, "ev": 0, "ei": 0, "fix": [], "rea": []} for s in systems}
    for t in [f"C{i}" for i in range(1, 9)]:
        cells = []
        for s in systems:
            js = agg.get((t, s), [])
            if not js:
                cells.append("–"); continue
            f = st.mean(len(set(x.get("found", []))) + 0.5 * len(x.get("partial", [])) for x in js)
            c = st.mean(len(set(x.get("found_critical", []))) for x in js)
            ev = st.mean(x.get("extra_valid", 0) for x in js); ei = st.mean(x.get("extra_invalid", 0) for x in js)
            fq = st.mean(x.get("fix_quality", 0) for x in js); rq = st.mean(x.get("reason_quality", 0) for x in js)
            T = tot[s]; T["found"] += f; T["n"] += kc[t]["n"]; T["crit"] += c; T["ncrit"] += kc[t]["crit"]
            T["ev"] += ev; T["ei"] += ei; T["fix"].append(fq); T["rea"].append(rq)
            cells.append(f"{f:.1f}/{kc[t]['n']} · {c:.1f}/{kc[t]['crit']} · {ev:.1f}/{ei:.1f} · {fq:.2f} · {rq:.2f}")
        rows.append(f"| {t} | {kc[t]['n']} | " + " | ".join(cells) + " |")
    rows.append("| **total** | | " + " | ".join(
        f"**{tot[s]['found']:.1f}/{tot[s]['n']} ({100 * tot[s]['found'] / max(1, tot[s]['n']):.0f}%) · crit {tot[s]['crit']:.1f}/{tot[s]['ncrit']} "
        f"({100 * tot[s]['crit'] / max(1, tot[s]['ncrit']):.0f}%) · extra {tot[s]['ev']:.0f}/{tot[s]['ei']:.0f} · fix {st.mean(tot[s]['fix'] or [0]):.2f} · reason {st.mean(tot[s]['rea'] or [0]):.2f}**"
        for s in systems) + " |")
    # decisions
    rows += ["", "## B. Decisions — key points (0–2 each)", "", "| task | " + " | ".join(f"{s} points · wrong claims" for s in systems) + " |",
             "|---|" + "---|" * len(systems)]
    dt = {s: [0, 0, 0] for s in systems}
    for t in [f"D{i}" for i in range(1, 13)]:
        cells = []
        for s in systems:
            js = agg.get((t, s), [])
            if not js:
                cells.append("–"); continue
            mx = 2 * kc.get(t, {}).get("points", 0)
            p = st.mean(sum(x.get("points", [])) for x in js); w = st.mean(x.get("wrong_claims", 0) for x in js)
            dt[s][0] += p; dt[s][1] += mx; dt[s][2] += w
            cells.append(f"{p:.1f}/{mx} · {w:.1f}")
        rows.append(f"| {t} | " + " | ".join(cells) + " |")
    rows.append("| **total** | " + " | ".join(f"**{dt[s][0]:.1f}/{dt[s][1]} ({100 * dt[s][0] / max(1, dt[s][1]):.0f}%) · wrong {dt[s][2]:.1f}**" for s in systems) + " |")
    # create
    rows += ["", "## C. Create — rubric mean (1–5) and pairwise preference (both orders)", "",
             "| task | " + " | ".join(f"{s} rubric mean · critical failures" for s in systems) + " | pairwise votes |",
             "|---|" + "---|" * len(systems) + "---|"]
    gt = {s: [] for s in systems}
    for t in [f"G{i}" for i in range(1, 5)]:
        cells = []
        for s in systems:
            js = agg.get((t, s), [])
            if not js:
                cells.append("–"); continue
            r = st.mean(st.mean(x["rubric"].values()) for x in js if x.get("rubric"))
            cf = st.mean(len(x.get("critical_failures", [])) for x in js)
            gt[s].append(r)
            cells.append(f"{r:.2f} · {cf:.1f}")
        votes = pair.get(t, [])
        rows.append(f"| {t} | " + " | ".join(cells) + f" | {', '.join(votes) or '–'} |")
    rows.append("| **mean** | " + " | ".join(f"**{st.mean(gt[s] or [0]):.2f}**" for s in systems) + " | |")
    open(os.path.join(B, "RESULTS_TABLE.md"), "w", encoding="utf-8").write("\n".join(rows) + "\n")
    print("\n".join(rows))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["make", "score"])
    ap.add_argument("--a", default="baseline"); ap.add_argument("--b", default="after"); ap.add_argument("--seed", type=int, default=26)
    x = ap.parse_args()
    make(x.a, x.b, x.seed) if x.cmd == "make" else score()
