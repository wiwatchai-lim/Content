#!/usr/bin/env python3
"""Domain guides (creative-intelligence/domains/) — status table and knowledge-graph links.

  python creative-intelligence/tools/domains.py status        # per guide: lines, sections, sources, read ratio, status line
  python creative-intelligence/tools/domains.py graph         # (re)writes D01..D15 nodes + edges in CROSS_DOMAIN_RELATIONSHIPS.json
  python creative-intelligence/tools/domains.py section 06 11 # print one section (§11) of guide 06 — load only what you need

Edges come from the text of each guide: §10 (cross-discipline) mentions of other domains → domain↔domain,
module ids (M01..M45) anywhere → domain→module "deepens", and skill names → domain→skill "used by". Re-run after edits.
"""
import glob, json, os, re, sys

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8")
    except Exception:
        pass

HERE = os.path.dirname(os.path.abspath(__file__))
CI = os.path.dirname(HERE)
DOM = os.path.join(CI, "domains")
CROSS = os.path.join(CI, "CROSS_DOMAIN_RELATIONSHIPS.json")
SKILLS = ["creative-critic", "master-creative-director", "ai-visual-artist", "ai-voice-director", "frame-kit", "beat-clip",
          "eye-break-clip", "daily-post", "flux-like-chatgpt"]
ACCESS_READ = {"full_text", "abstract"}


def guides():
    out = {}
    for p in sorted(glob.glob(os.path.join(DOM, "[0-9][0-9]-*.md"))):
        num = os.path.basename(p)[:2]
        out[num] = p
    return out


def sections(md):
    parts = re.split(r"^## (\d+)\.", md, flags=re.M)
    return {parts[i]: parts[i + 1] for i in range(1, len(parts) - 1, 2)}


def title(md):
    m = re.search(r"^# (.+)$", md, re.M)
    return m.group(1).strip() if m else "?"


def status():
    print("| # | guide | lines | §§ | sources | read (full/abstract) | status line |")
    print("|---|---|---|---|---|---|---|")
    for num, p in guides().items():
        md = open(p, encoding="utf-8").read()
        src = os.path.join(DOM, "sources", os.path.basename(p)[:-3] + ".json")
        arr = json.load(open(src, encoding="utf-8")) if os.path.exists(src) else []
        read = sum(1 for s in arr if s.get("access_status") in ACCESS_READ)
        st = re.search(r"Status:\s*\**\s*([A-Z ]+[A-Z])", md)
        print(f"| {num} | {title(md)[:60]} | {len(md.splitlines())} | {len(sections(md))} | {len(arr)} | "
              f"{read} ({read * 100 // max(1, len(arr))}%) | {st.group(1) if st else '?'} |")


def graph():
    cross = json.load(open(CROSS, encoding="utf-8"))
    cross["nodes"] = [n for n in cross["nodes"] if not n["id"].startswith("D")]
    cross["edges"] = [e for e in cross["edges"] if not (e["from"].startswith("D") or e["to"].startswith("D"))]
    known = {n["id"] for n in cross["nodes"]}
    added = 0
    for num, p in guides().items():
        md = open(p, encoding="utf-8").read()
        did = "D" + num
        cross["nodes"].append({"id": did, "type": "domain", "name": title(md), "file": os.path.relpath(p, os.path.dirname(CI)).replace("\\", "/")})
        sec10 = sections(md).get("10", "")
        # explicit references only: "domain 05", "โดเมน 05", "D05", or a file name "05-semiotics…"
        others = set(re.findall(r"(?:domain|โดเมน|\bD)\s*(\d{2})\b", sec10, re.I)) | set(re.findall(r"\b(\d{2})-[a-z]", sec10)) \
            | set(re.findall(r"^\s*(?:\|\s*|[-*]\s*)\**\s*(?:D|domain\s*)?(\d{2})\b", sec10, re.M | re.I))  # table row / bullet "| 05 Semiotics"
        for o in sorted(others):
            o = o.zfill(2)
            if o != num and 1 <= int(o) <= 15:
                cross["edges"].append({"from": did, "to": "D" + o, "relation": "cross-discipline",
                                       "use_case": f"see §10 of {os.path.basename(p)}", "evidence": "link stated in the guide"})
                added += 1
        for m in sorted(set(re.findall(r"\bM(\d{2})\b", md))):
            mid = "M" + m
            if mid in known:
                cross["edges"].append({"from": did, "to": mid, "relation": "deepens", "use_case": "domain guide builds on the module",
                                       "evidence": "reference in the guide"})
                added += 1
        for s in SKILLS:
            sid = "skill:" + s
            if s in md:
                if sid not in known:
                    cross["nodes"].append({"id": sid, "type": "skill", "name": s}); known.add(sid)
                cross["edges"].append({"from": did, "to": sid, "relation": "used by", "use_case": "skill applies this domain",
                                       "evidence": "named in the guide"})
                added += 1
    # domain-to-domain edges point at D-nodes that must exist
    ids = {n["id"] for n in cross["nodes"]}
    cross["edges"] = [e for e in cross["edges"] if e["from"] in ids and e["to"] in ids]
    json.dump(cross, open(CROSS, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    d_edges = [e for e in cross["edges"] if e["from"].startswith("D")]
    print(f"graph: {len(guides())} domain nodes, {len(d_edges)} domain edges "
          f"({sum(e['relation'] == 'cross-discipline' for e in d_edges)} cross, {sum(e['relation'] == 'deepens' for e in d_edges)} module, "
          f"{sum(e['relation'] == 'used by' for e in d_edges)} skill)")


def section(num, sec):
    p = guides().get(num.zfill(2))
    if not p:
        sys.exit("no guide " + num)
    md = open(p, encoding="utf-8").read()
    print(f"## {sec}." + sections(md).get(str(int(sec)), " (not found)"))


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print(__doc__); sys.exit(0)
    cmd = sys.argv[1]
    if cmd == "status":
        status()
    elif cmd == "graph":
        graph()
    elif cmd == "section" and len(sys.argv) == 4:
        section(sys.argv[2], sys.argv[3])
    else:
        print(__doc__); sys.exit(1)
