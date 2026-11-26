#!/usr/bin/env python3
"""Creative Critic helper — builds an independent critic packet and records critiques into Creative Memory.

  python creative-intelligence/tools/critic.py packet --work kits/x/export --brief "..." --kind carousel --tags slowly-growing,mint-tao --out kits/x/critique/packet.md
  python creative-intelligence/tools/critic.py record kits/x/critique/critique.json [--accepted F1,F3] [--rejected F2]
  python creative-intelligence/tools/critic.py check kits/x/critique/critique.json      # schema check only

The packet holds the work paths, the brief, house rules, the memory brief and the rubric files — never the maker's
reasoning or self-score (that is what keeps the critic independent).
"""
import argparse, datetime as dt, io, json, os, re, subprocess, sys
from contextlib import redirect_stdout

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8")
    except Exception:
        pass

HERE = os.path.dirname(os.path.abspath(__file__))
CI = os.path.dirname(HERE)
ROOT = os.path.dirname(CI)
SKILL = os.path.join(ROOT, ".claude", "skills", "creative-critic", "SKILL.md")
sys.path.insert(0, HERE)
import memory  # noqa: E402

D = "creative-intelligence/domains/"
K = "creative-intelligence/knowledge/"
# kind → knowledge the critic should use (only these; never the whole base)
RUBRICS = {
    "image":      [D + "04-visual-language-grammar.md#14", D + "03-aesthetic-intelligence-taste.md#14", ".claude/skills/ai-visual-artist/IMAGE_CRITIQUE_ENGINE.md", K + "aesthetics/CRITIQUE_PROTOCOL.md"],
    "post":       [D + "04-visual-language-grammar.md#14", D + "11-consumer-psychology-creative-marketing.md#14", ".claude/skills/ai-visual-artist/GRAPHIC_DESIGN.md", K + "branding/BRAND_CHECK.md"],
    "carousel":   [D + "06-character-psychology-development.md#14", D + "07-worldbuilding-narrative-continuity.md#14", D + "08-philosophy-literature-poetry.md#14", K + "screenwriting/SCRIPT_CHECKER.md", K + "cognitive-science/README.md"],
    "script":     [D + "06-character-psychology-development.md#14", D + "08-philosophy-literature-poetry.md#14", K + "screenwriting/SCRIPT_CHECKER.md", K + "storytelling/README.md"],
    "caption":    [D + "11-consumer-psychology-creative-marketing.md#14", K + "marketing/ETHICS_AND_THAI_AD_RULES.md", K + "thai-language/STYLE_GUIDE.md", K + "philosophy/README.md (misattributed quotes)"],
    "voice":      [".claude/skills/ai-voice-director/QUALITY_CONTROL.md", ".claude/skills/ai-voice-director/THAI_PRONUNCIATION.md", D + "10-psychoacoustics-sensory-experience.md#14"],
    "storyboard": ["story-clips/_craft/GUIDE.md (§1-3, §10 checklist)", "story-clips/_craft/curriculum/12-production-qc.md", D + "07-worldbuilding-narrative-continuity.md#14", K + "continuity/CONTINUITY_SYSTEM.md"],
    "clip":       [".claude/skills/beat-clip/SKILL.md (rules part)", K + "audience/RETENTION_REVIEW.md", "story-clips/_craft/curriculum/12-production-qc.md", D + "10-psychoacoustics-sensory-experience.md#14"],
    "mix":        [K + "audio-engineering/MIX_PLAYBOOK.md", D + "10-psychoacoustics-sensory-experience.md#14", K + "music/README.md (§ licensing)"],
    "concept":    [D + "09-cultural-studies-cross-cultural.md#14", D + "11-consumer-psychology-creative-marketing.md#14", D + "05-semiotics-symbolism-metaphor.md#14", K + "culture/CULTURAL_CHECK.md", K + "creative-thinking/IDEATION_PLAYBOOK.md"],
}
ALWAYS = [D + "12-independent-creative-criticism.md (§11 decision guide, §13 checklist)", "creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md (critical failures)"]
CLAIM_FILES = [K + "optical/FACT_CHECK_WORKFLOW.md", K + "optical/claims_library.json"]


def section(md, title):
    m = re.search(rf"^## {re.escape(title)}.*?$(.*?)(?=^## |\Z)", md, re.S | re.M)
    return m.group(0).strip() if m else ""


def exists(ref):
    p = ref.split("#")[0].split(" (")[0]
    return os.path.exists(os.path.join(ROOT, p))


def packet(a):
    skill = open(SKILL, encoding="utf-8").read()
    rules = section(skill, "STUDIO_RULES")
    critic_rules = section(skill, "3. Critic rules")
    out_fmt = section(skill, "4. Output")
    buf = io.StringIO()
    with redirect_stdout(buf):
        memory.brief(a.brief[:80], a.tags, a.brief)
    refs = RUBRICS.get(a.kind, []) + ALWAYS
    if a.claims:
        refs += CLAIM_FILES
    lines = [
        f"# Critic packet — {a.kind} — {dt.date.today().isoformat()}",
        "",
        "You are the studio's independent Creative Critic. You did not make this work. Judge it cold, with evidence.",
        "Do not edit the work. Do not generate images or call any paid/quota API. Read only what you need.",
        "",
        "## Work to critique",
        *[f"- `{w}`" for w in a.work],
        "",
        "## Brief (what was asked, for whom, where it runs)",
        a.brief,
        "",
        critic_rules,
        "",
        rules,
        "",
        "## Memory (real past verdicts, errors and fixes — cite their ids)",
        buf.getvalue().strip(),
        "",
        "## Knowledge to use (open the sections named; missing files are marked)",
        *[f"- `{r}`" + ("" if exists(r) else "  ← not present yet: rely on the other files") for r in refs],
        "",
        out_fmt,
        "",
        f"Write `{a.json_out}` and `{a.md_out}`. Then reply with the verdict and the number of findings per severity.",
    ]
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print("wrote", a.out)
    print("next: launch a fresh general-purpose agent: \"Read", a.out, "and follow it.\"")


SEV = {"critical", "major", "minor"}


def check(c):
    err = []
    for k in ("artifact", "kind", "critic", "findings", "verdict"):
        if k not in c:
            err.append(f"missing {k}")
    if c.get("verdict") not in ("pass", "revise", "fail"):
        err.append("verdict must be pass|revise|fail")
    for f in c.get("findings", []):
        for k in ("id", "location", "problem", "why", "fix", "severity", "confidence"):
            if not f.get(k):
                err.append(f"{f.get('id', '?')}: missing {k}")
        if f.get("severity") not in SEV:
            err.append(f"{f.get('id')}: severity {f.get('severity')!r}")
    sev = [f.get("severity") for f in c.get("findings", [])]
    want = "fail" if "critical" in sev else "revise" if "major" in sev else "pass"
    if c.get("verdict") and c["verdict"] != want:
        err.append(f"verdict {c['verdict']} does not match findings (expected {want})")
    return err


def record(a):
    c = json.load(open(a.file, encoding="utf-8"))
    e = check(c)
    if e:
        sys.exit("critique not recorded:\n  " + "\n  ".join(e))
    acc = {x for x in (a.accepted or "").split(",") if x}
    rej = {x for x in (a.rejected or "").split(",") if x}
    n = {s: sum(1 for f in c["findings"] if f["severity"] == s) for s in SEV}
    tags = [t for t in (a.tags or "").split(",") if t] + [c["kind"], "critique"]
    cid = memory.add({"type": "critique", "artifact": c["artifact"], "verdict": c["verdict"], "critic": c["critic"],
                      "summary": f"{c['kind']} critique: {c['verdict']} — {n['critical']} critical, {n['major']} major, {n['minor']} minor",
                      "findings": [{k: f[k] for k in ("id", "location", "problem", "severity")} for f in c["findings"]],
                      "accepted": sorted(acc), "rejected": sorted(rej), "source": os.path.relpath(a.file, ROOT).replace("\\", "/"),
                      "evidence": "ai-judgement", "tags": tags})
    for f in c["findings"]:
        if f["id"] in acc and f["severity"] in ("critical", "major"):
            memory.add({"type": "error", "what": f["problem"], "cause": f["why"], "detect_by": f"critic {cid} {f['id']}",
                        "summary": f"[{f['location']}] {f['problem']}"[:200], "source": f"critique {cid}",
                        "evidence": "observed", "tags": tags, "fix_ref": "", "artifact": c["artifact"], "proposed_fix": f["fix"]})


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest="cmd", required=True)
    p = sp.add_parser("packet")
    p.add_argument("--work", action="append", required=True)
    p.add_argument("--brief", required=True)
    p.add_argument("--kind", required=True, choices=sorted(RUBRICS))
    p.add_argument("--tags", default="")
    p.add_argument("--claims", action="store_true", help="the work makes health/product claims → add fact-check files")
    p.add_argument("--out", required=True)
    r = sp.add_parser("record"); r.add_argument("file"); r.add_argument("--accepted"); r.add_argument("--rejected"); r.add_argument("--tags")
    c = sp.add_parser("check"); c.add_argument("file")
    a = ap.parse_args()
    if a.cmd == "packet":
        base = os.path.dirname(a.out)
        a.json_out = os.path.join(base, "critique.json").replace("\\", "/")
        a.md_out = os.path.join(base, "critique.md").replace("\\", "/")
        packet(a)
    elif a.cmd == "record":
        record(a)
    else:
        e = check(json.load(open(a.file, encoding="utf-8")))
        print("ok" if not e else "\n".join(e))
        sys.exit(1 if e else 0)


if __name__ == "__main__":
    main()
