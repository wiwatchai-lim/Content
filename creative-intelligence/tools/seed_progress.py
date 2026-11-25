"""One-off seed of LEARNING_PROGRESS.json from the Phase 0 audit (2026-11-25).
Kept for the record; after seeding, edit LEARNING_PROGRESS.json directly (do not re-run: it would reset statuses)."""
import json, os, sys

OUT = os.path.join(os.path.dirname(__file__), "..", "LEARNING_PROGRESS.json")
if os.path.exists(OUT) and "--force" not in sys.argv:
    sys.exit("LEARNING_PROGRESS.json exists - edit it directly (use --force only to reset)")

V = ".claude/skills/ai-visual-artist/"; A = ".claude/skills/ai-voice-director/"; C = "story-clips/_craft/"
M = [
("M01", "Human Psychology", "psychology", "RESEARCHING", [], "Batch P2 running 2026-11-25"),
("M02", "Emotion Science", "emotions", "RESEARCHING", [A + "EMOTION_LIBRARY.json", V + "EMOTION_VISUAL_LIBRARY.json", A + "EVIDENCE_MATRIX.md"], "Two libraries exist (108 voice + 114 visual), not linked; theory batch P2 running"),
("M03", "Philosophy and Wisdom", "philosophy", "RESEARCHING", [], "Batch P2 running"),
("M04", "Cognitive Science", "cognitive-science", "RESEARCHING", [V + "research/R1_fundamentals_perception.md"], "Perception covered in R1; attention/memory/load batch P2 running"),
("M05", "Neuroaesthetics", "neuroaesthetics", "DRAFTED", [V + "research/R1_fundamentals_perception.md", V + "ART_FUNDAMENTALS.md"], "Partial: balance/preference studies in R1. No dedicated pass yet"),
("M06", "Aesthetic Intelligence", "aesthetics", "DRAFTED", [V + "IMAGE_CRITIQUE_ENGINE.md", V + "MASTER_KNOWLEDGE.md"], "Critique + taste rules exist; no taste study with human raters"),
("M07", "Visual Art Fundamentals", "art", "SOURCE VERIFIED", [V + "ART_FUNDAMENTALS.md", V + "DRAWING_TECHNIQUES.md"], ""),
("M08", "Composition and Visual Design", "composition", "PRACTICALLY TESTED", [V + "COMPOSITION_LIBRARY.json", C + "curriculum/03-composition.md"], "30 of 100 target; tested with FLUX + analyze_image (golden glasses job)"),
("M09", "Color Science", "color", "SOURCE VERIFIED", [V + "COLOR_PALETTE_LIBRARY.json", V + "COLOR_THEORY.md", V + "tools/color_tools.py"], "204 of 300 palettes"),
("M10", "Lighting and Shadow", "lighting", "PRACTICALLY TESTED", [V + "LIGHTING_LIBRARY.json", C + "curriculum/04-lighting.md"], "51 of 100; FLUX lighting lessons logged"),
("M11", "Art History and Art Style", "art-history", "SOURCE VERIFIED", [V + "ART_STYLE_LIBRARY.json", V + "REFERENCE_DATABASE.json"], "102 of 150 styles; 141 licensed artwork records (metadata only)"),
("M12", "Visual Semiotics", "semiotics", "NOT STARTED", [V + "VISUAL_STORYTELLING.md"], "Only scattered metaphor notes"),
("M13", "Storytelling", "storytelling", "DRAFTED", [V + "VISUAL_STORYTELLING.md", C + "curriculum/08-storyboard.md"], "120 story carousels produced in practice, but no sourced story-pattern library"),
("M14", "Screenwriting and Dialogue", "screenwriting", "DRAFTED", [C + "GUIDE.md"], "Practice only (Mint & Tao, eyesight series); no sourced knowledge"),
("M15", "Character Design and Psychology", "characters", "SOURCE VERIFIED", [V + "CHARACTER_DESIGN.md", V + "CHARACTER_BIBLE_TEMPLATE.md"], ""),
("M16", "World Building", "world-building", "NOT STARTED", [], "Series exist (eyesight, zombie, night-optic, slowly-growing) without a lore/continuity store"),
("M17", "Body Language and Facial Acting", "acting", "DRAFTED", [C + "GUIDE.md", C + "rig.js"], "GUIDE section 5 + rig emotes; no FACS-sourced library"),
("M18", "Cinematography", "cinematography", "PRACTICALLY TESTED", [C + "curriculum/01-photography-fundamentals.md", C + "curriculum/02-camera-lens.md", C + "curriculum/05-movement-language.md", C + "GUIDE.md"], "Shot library not yet a structured file"),
("M19", "Animation and Movement", "animation", "PRACTICALLY TESTED", [C + "curriculum/06-2d-animation.md", C + "curriculum/07-3d-character.md", C + "rig.js"], "rig v2 measured (twos, walk, lip-sync)"),
("M20", "Voice Acting and Emotional Speech", "voice", "PRACTICALLY TESTED", [A + "SKILL.md", A + "PROSODY_RULES.md", A + "CHARACTER_VOICE_BIBLE.md"], "EP01 27 takes analysed; no native-listener ratings"),
("M21", "Thai Language Specialization", "thai-language", "PRACTICALLY TESTED", [A + "THAI_PRONUNCIATION.md", A + "PRONUNCIATION_DICTIONARY.json", V + "THAI_TYPOGRAPHY.md"], "Dictionary has 43 entries; dialogue pragmatics/humour not covered"),
("M22", "Sound Design", "sound", "DRAFTED", [C + "FX.md", C + "sound.py", C + "sfxlib/CREDITS.md"], "83 CC0 SFX in use; no sourced theory"),
("M23", "Music Theory and Music Psychology", "music", "NOT STARTED", [], "beat-clip uses librosa beat tracking only"),
("M24", "Audio Engineering", "audio-engineering", "DRAFTED", [A + "QUALITY_CONTROL.md", A + "tools/qc.py"], "Voice loudness QC exists; no mix/master guide"),
("M25", "Film Editing", "editing", "SOURCE VERIFIED", [C + "curriculum/11-edit-grade.md", C + "GUIDE.md"], ""),
("M26", "Graphic Design and Typography", "graphic-design", "SOURCE VERIFIED", [V + "GRAPHIC_DESIGN.md", V + "THAI_TYPOGRAPHY.md"], "No layout library yet"),
("M27", "Branding and Visual Identity", "branding", "DRAFTED", ["CLAUDE.md"], "House rules only; no Brand Bible file"),
("M28", "Audience Psychology", "audience", "NOT STARTED", [], ""),
("M29", "Marketing and Content Strategy", "marketing", "NOT STARTED", [], "ads-meta skill reads real ad results; no strategy knowledge"),
("M30", "Anthropology and Cultural Intelligence", "culture", "NOT STARTED", [], ""),
("M31", "Humor and Comedy", "comedy", "NOT STARTED", [], ""),
("M32", "Emotional Architecture", "emotional-architecture", "NOT STARTED", [A + "EMOTION_TRANSITIONS.md"], "Only voice transitions"),
("M33", "Creative Thinking", "creative-thinking", "NOT STARTED", [], ""),
("M34", "Computer Graphics", "computer-graphics", "DRAFTED", [C + "curriculum/07-3d-character.md"], ""),
("M35", "Computer Vision and Image Processing", "computer-vision", "DRAFTED", [V + "tools/analyze_image.py", "tools/depth.py", "tools/cutout.mjs"], "Tools work in production; no sourced knowledge file"),
("M36", "Generative AI", "generative-ai", "PRACTICALLY TESTED", [V + "IMAGE_PROVIDER_ADAPTERS.md", C + "curriculum/09-ai-image-prompts.md", C + "curriculum/10-ai-video.md"], "FLUX, Wan, Codex, Gemini TTS used for real"),
("M37", "Production Engineering", "engineering", "PRACTICALLY TESTED", [C + "curriculum/12-production-qc.md", "tools/render.mjs", "tools/video.mjs"], ""),
("M38", "Continuity Management", "continuity", "NOT STARTED", [V + "CHARACTER_BIBLE_TEMPLATE.md"], ""),
("M39", "Copyright, Ethics and Safety", "copyright", "DRAFTED", [V + "REFERENCE_DATABASE.json", C + "sfxlib/CREDITS.md", "sources/sources.csv"], "Licence checks done per asset; no rules file"),
("M40", "Knowledge Management", "knowledge-management", "DRAFTED", ["creative-intelligence/MASTER_INDEX.md", "creative-intelligence/tools/registry.py"], "This system, started 2026-11-25"),
("M41", "Critical Thinking", "critical-thinking", "NOT STARTED", [], "Evidence practice embedded in skills (tiers, access levels) but not written up"),
("M42", "Quality Assurance and Evaluation", "quality-control", "PRACTICALLY TESTED", [V + "tools/score.py", A + "tools/qc.py", V + "TEST_CASES.json", A + "TEST_CASES.json"], "Automated scores only; no inter-rater human evaluation"),
]
PH = {"M01": 2, "M02": 2, "M03": 2, "M04": 2, "M05": 3, "M06": 3, "M07": 3, "M08": 3, "M09": 3, "M10": 3, "M11": 3, "M12": 3,
      "M13": 4, "M14": 4, "M15": 4, "M16": 4, "M17": 4, "M31": 4, "M18": 5, "M19": 5, "M20": 6, "M21": 6, "M22": 6, "M23": 6,
      "M24": 6, "M25": 7, "M26": 7, "M27": 7, "M28": 7, "M29": 7, "M30": 7, "M32": 7, "M33": 7, "M34": 8, "M35": 8, "M36": 8,
      "M37": 8, "M38": 9, "M39": 9, "M40": 9, "M41": 9, "M42": 11}
mods = [{"id": i, "name": n, "folder": "creative-intelligence/knowledge/" + f, "phase": PH[i], "status": s, "files": fl,
         "notes": no, "human_review": None, "updated": "2026-11-25"} for i, n, f, s, fl, no in M]
prog = {"schema_version": "1.0",
        "statuses": ["NOT STARTED", "RESEARCHING", "DRAFTED", "SOURCE VERIFIED", "PRACTICALLY TESTED", "HUMAN REVIEWED", "PRODUCTION READY"],
        "status_rules": {"DRAFTED": "written down; sources not checked or not attached",
                         "SOURCE VERIFIED": "claims tied to SOURCE_REGISTRY entries that were really opened",
                         "PRACTICALLY TESTED": "used in a real job with the measured/observed result logged",
                         "HUMAN REVIEWED": "the user (or a named human) reviewed outputs built with it",
                         "PRODUCTION READY": "human reviewed + tests pass + no open critical gaps; never just because docs exist"},
        "current_phase": "Phase 2 - Psychology, Emotion, Philosophy (+ M04 Cognitive Science)",
        "phases_done": ["Phase 0 audit (2026-11-25)", "Phase 1 infrastructure (2026-11-25)"],
        "batches": [], "modules": mods}
json.dump(prog, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(mods), "modules seeded")
