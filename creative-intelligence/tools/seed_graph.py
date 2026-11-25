"""Seed CROSS_DOMAIN_RELATIONSHIPS.json (knowledge graph). After seeding, edit the JSON directly."""
import json, os, sys
CI = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(CI, "CROSS_DOMAIN_RELATIONSHIPS.json")
if os.path.exists(OUT) and "--force" not in sys.argv:
    sys.exit("exists - edit directly")
prog = json.load(open(os.path.join(CI, "LEARNING_PROGRESS.json"), encoding="utf-8"))
nodes = [{"id": m["id"], "type": "module", "name": m["name"]} for m in prog["modules"]]
skills = ["master-creative-director", "ai-visual-artist", "ai-voice-director", "frame-kit", "beat-clip", "eye-break-clip",
          "daily-post", "flux-like-chatgpt", "story-craft", "carousel-stories", "ads-meta"]
nodes += [{"id": "skill:" + s, "type": "skill", "name": s} for s in skills]
tools = ["codex-image", "flux-schnell-local", "wan-2.2-ti2v-5b", "gemini-tts", "hyperframes", "html-render", "analyze-image",
         "voice-qc", "librosa-beats", "sfxlib", "depth-anything-v2-small"]
nodes += [{"id": "tool:" + t, "type": "tool", "name": t} for t in tools]
E = [
 # directive section 7 combinations: (from, to, relation, use case)
 ("M01", "M13", "informs", "stories built on real human motivation (needs, fears, hopes)"),
 ("M03", "M14", "informs", "dialogue with meaning; ideas stated accurately, not as fake quotes"),
 ("M02", "M09", "informs", "emotion -> palette choice (valence/arousal as a starting point, culture-dependent)"),
 ("M02", "M10", "informs", "emotion -> lighting key/contrast"),
 ("M17", "M20", "must_agree_with", "face, body and voice show the same emotion beat"),
 ("M17", "M19", "implemented_by", "acting realised through animation timing"),
 ("M12", "M18", "combined_with", "meaning through framing/objects instead of explanation"),
 ("M23", "M25", "combined_with", "music phrasing drives cut rhythm"),
 ("M28", "M29", "informs", "content fitted to audience, tested with real results"),
 ("M35", "M42", "implemented_by", "automated image/continuity checks"),
 ("M40", "M42", "combined_with", "lessons from experiments feed back into rules"),
 ("M04", "M26", "informs", "cognitive load -> words per slide, hierarchy"),
 ("M04", "M25", "informs", "audio-visual sync and caption timing"),
 ("M05", "M06", "informs", "what is evidence vs taste in aesthetic judgement"),
 ("M15", "M38", "requires", "character bible is the reference for continuity checks"),
 ("M16", "M38", "requires", "world rules/timeline for multi-episode continuity"),
 ("M21", "M20", "constrains", "Thai tones must survive emotional prosody"),
 ("M21", "M26", "constrains", "Thai line breaking and typography"),
 ("M30", "M12", "constrains", "symbols change meaning across cultures"),
 ("M31", "M14", "informs", "comic timing in dialogue"),
 ("M32", "M13", "structures", "emotional timeline of a story"),
 ("M32", "M23", "drives", "music mood per beat"),
 ("M39", "M36", "constrains", "licences/consent for AI inputs and outputs"),
 ("M41", "M40", "governs", "evidence tiers and verification of every source"),
 ("M33", "M13", "generates", "several concept options before choosing"),
 ("M27", "M26", "constrains", "brand rules on every layout"),
 # modules -> skills
 ("M07", "skill:ai-visual-artist", "used_by", ""), ("M08", "skill:ai-visual-artist", "used_by", ""),
 ("M09", "skill:ai-visual-artist", "used_by", ""), ("M10", "skill:ai-visual-artist", "used_by", ""),
 ("M11", "skill:ai-visual-artist", "used_by", ""), ("M26", "skill:ai-visual-artist", "used_by", ""),
 ("M02", "skill:ai-voice-director", "used_by", ""), ("M20", "skill:ai-voice-director", "used_by", ""),
 ("M21", "skill:ai-voice-director", "used_by", ""), ("M24", "skill:ai-voice-director", "used_by", ""),
 ("M18", "skill:story-craft", "used_by", ""), ("M19", "skill:story-craft", "used_by", ""),
 ("M22", "skill:story-craft", "used_by", ""), ("M25", "skill:story-craft", "used_by", ""),
 ("M13", "skill:carousel-stories", "used_by", ""), ("M14", "skill:carousel-stories", "used_by", ""),
 ("M03", "skill:carousel-stories", "used_by", "Slowly Growing themes"),
 ("M29", "skill:ads-meta", "used_by", ""), ("M23", "skill:beat-clip", "used_by", ""),
 # skills -> tools
 ("skill:ai-visual-artist", "tool:flux-schnell-local", "uses", ""), ("skill:ai-visual-artist", "tool:codex-image", "uses", "ask first"),
 ("skill:ai-visual-artist", "tool:analyze-image", "uses", ""), ("skill:ai-voice-director", "tool:gemini-tts", "uses", ""),
 ("skill:ai-voice-director", "tool:voice-qc", "uses", ""), ("skill:story-craft", "tool:hyperframes", "uses", ""),
 ("skill:story-craft", "tool:sfxlib", "uses", ""), ("skill:beat-clip", "tool:librosa-beats", "uses", ""),
 ("skill:frame-kit", "tool:codex-image", "uses", "prompts only; user runs"), ("skill:frame-kit", "tool:depth-anything-v2-small", "uses", "2.5D"),
 ("skill:daily-post", "tool:html-render", "uses", ""), ("skill:flux-like-chatgpt", "tool:flux-schnell-local", "uses", ""),
 ("skill:eye-break-clip", "tool:hyperframes", "uses", ""), ("skill:carousel-stories", "tool:html-render", "uses", ""),
]
edges = [{"from": a, "to": b, "relation": r, "use_case": u, "evidence": "design decision (not a research finding)"} for a, b, r, u in E]
for n in skills:
    edges.append({"from": "skill:master-creative-director", "to": "skill:" + n, "relation": "routes_to", "use_case": "", "evidence": ""}) if n != "master-creative-director" else None
json.dump({"schema_version": "1.0", "note": "Edges are design links for routing, not claims of scientific causation.",
           "nodes": nodes, "edges": edges}, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(nodes), "nodes", len(edges), "edges")
