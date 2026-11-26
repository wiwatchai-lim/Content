# Skill Audit — TIME OPTIC AI Creative Studio

Date: 2026-11-26 · Phase 1 of the "AI Creative Production Studio" directive · read-only audit, nothing changed.
Method: every file of the 9 project skills read (`.claude/skills/*`), plus `story-clips/_craft/`, `carousel/`,
`slowly-growing/` and `creative-intelligence/`. Every path a skill references was tested (`test -e`). Both offline
test suites run (`run_tests.py`: visual 734/734, voice 396/396). `registry.py validate`: 1664 sources, 0 errors,
482 warnings. 13 source URLs spot-checked on the web: 11 confirmed, 2 blocked (403), 0 invented.
Plugin skills outside the repo (HyperFrames, SEO, ads-meta) are counted as tools, not audited.

Labels: **fact** = checked in a file or by running it · **opinion** = auditor judgement.

---

## 1. Inventory

| skill / pipeline | kind | size | sourced knowledge | tests | learning log |
|---|---|---|---|---|---|
| `frame-kit` | production (default job) | SKILL.md 93 lines | no (craft + user decisions) | none | none (kit.md per job) |
| `beat-clip` | production | 102 lines | no | none | rules folded back into SKILL.md |
| `eye-break-clip` | production | 101 lines | no | none (strongest QC: loudness + frame checks) | none |
| `daily-post` | production (legacy, on request) | 110 lines | lens/coating data only | none | `log/used-combos.csv` = header only |
| `flux-like-chatgpt` | production helper | 41 lines | user tests 2026-11-13 | none | kit.md |
| `remove-spots` | production helper | 4 files | no | none | none |
| `ai-visual-artist` | knowledge + craft | 74 files, 20 MB | yes — 192 keys, tiered | 117 cases, 734 checks pass; 3 real jobs scored 65–77.5 | CHANGELOG |
| `ai-voice-director` | knowledge + craft | 47 files, 3.2 MB | yes — 125 keys, evidence matrix A–D | 48 cases, 396 checks pass; EP01 27 takes analysed | CHANGELOG |
| `master-creative-director` | router + learning loop | 68 lines | routes to 1664 sources | none | KB CHANGELOG, DECISION_LOG |
| `story-clips/_craft/` (no SKILL.md) | knowledge + tools | GUIDE 245 lines, 12-lesson curriculum ~3150 lines, rig.js, fx.js, sound.py, 83 CC0 SFX | curriculum yes (18–39 URLs per lesson); GUIDE/STYLES/FX barely | demo scenes only | LEARNING-LOG: 2 entries, 16 lessons |
| `carousel/` (no SKILL.md) | pipeline | README 26 lines | no | none | none |
| `slowly-growing/` (no SKILL.md) | series bible | README 31 lines | no | none | none |
| `creative-intelligence/` | knowledge base | 44 modules, 27 knowledge folders | 1664 sources (S 116, A 612, B 145, C 191, D 296, E 37, U 267) | MASTER_QUALITY_SCORE; 4 experiment folders | CHANGELOG, LESSONS_LEARNED, DESIGN/ANTI_PATTERNS |

Module status (fact, `LEARNING_PROGRESS.json`): 32 SOURCE VERIFIED · 9 PRACTICALLY TESTED · 3 DRAFTED (M35 computer
vision, M39 copyright/ethics, M40 knowledge management) · **0 HUMAN REVIEWED**.

---

## 2. Per-skill findings

### frame-kit
- **Does:** random in-stock frame → lens + coating pairing → photos, cutouts, style profile, layered Codex prompts (L1–L4, S1/S2, C1–C3, V) → `kits/<date_slug>/`.
- **Strong:** "use the attached glasses exactly as they are" guard; never upscale; all 20+ referenced paths exist.
- **Problems (fact):** all prompts 1:1 (:70) vs C-shots 9:16 (:67); claims "ทำคลิป" (:74) which `beat-clip` owns; clip section omits the frame-brand logo rule from CLAUDE.md; Codex command (:88) lacks `-C <project>` that `data/models/README.md:34` uses; pairing rules live in legacy `daily-post`.
- **Gaps:** no brand-token colour/lighting rationale, no prompt-experiment log, no image rubric.

### beat-clip
- **Does:** 10–15 s vertical kinetic-type clips cut to a song with HyperFrames; parallel forks; contact sheet with safe zone.
- **Strong:** 16-beat grid, hook rules, exact TikTok safe zone, licence whitelist for extra assets.
- **Problems:** description 10–15 s vs "up to 30 beats" (:75); safe zone and naming rules duplicated in eye-break-clip.
- **Gaps:** no loudness target, no grade step, no hook/retention review (knowledge exists in `audience/RETENTION_REVIEW.md`, not linked), no record of how posted clips performed.

### eye-break-clip
- **Does:** person and nature versions of the close-your-eyes / neck-stretch clip, voice baked in.
- **Strong:** the only clip skill with a loudness check (max −1 dB, mean ≈ −20 dB) and fixed-time frame checks.
- **Problems:** named "15-second" but the clip is 20.5 s (:32, :84); bakes sound in while CLAUDE.md says the user adds music later (deliberate exception, undocumented in CLAUDE.md).
- **Gaps:** health wording not routed through `optical/FACT_CHECK_WORKFLOW.md`; nature look has no burned-in captions.

### daily-post
- **Does:** finished FB/IG post (HTML → PNG + PSD) and caption; legacy since 2026-09-18.
- **Strong:** the richest design rules (structure vs skin, brand tokens, 72 px margin, contrast floor).
- **Problems:** single home of the **pairing rules** that two active skills depend on, inside a legacy skill (fragile); examples omit Essilor though `data/lenses/essilor.md` exists; two separate pick logs (`log/used-combos.csv` empty, `log/kits.csv` used by `pick.mjs`); "แก้ภาพ" overlaps ai-visual-artist.
- **Gaps:** no caption/copy or hashtag guidance, no audience reasoning.

### flux-like-chatgpt
- **Does:** free FLUX img2img redraw of a Codex picture (denoise table from the user's own tests).
- **Problems:** cites "CLAUDE.md step 8.6" (really item 6 of step 8); hard-coded to the dialogue-slide layout and RTX 3050; not in the master router; shows no description in the session skill listing.

### remove-spots
- **Problems (fact, blocking):** the YAML front-matter description contains `untouched: a rivet` — a colon-space inside a plain scalar, so `yaml.safe_load` fails and the skill may not register correctly. `examples/` and `examples/glasses-honeycomb.json` referenced (SKILL.md:39, README.md:35) do not exist. Commands use bare `python inspect_video.py` (works only from the skill folder).
- **Code limits:** loads every frame into memory (`remove_spots.py:36-41`); debug tile hard-crops rows 500–1300 (:53); tracker has no confidence threshold, so drift is silent (:24).

### ai-visual-artist
- **Does:** brief → direction → Visual Job JSON → prompt → FLUX / Codex / HTML → measured critique (6-view sheet, saliency, safe zones) → 100-point purpose-weighted score → one change at a time.
- **Depth (opinion):** deep — perception, composition, colour (OKLab, ΔE00, WCAG, CVD), critique, FLUX prompting; working — lighting, art styles, graphic design, Thai typography, character design, visual storytelling; thin — anatomy, facial expression, cinematography (lives elsewhere), branding, audience; none — animation, editing, grading, sound.
- **Sources:** honest access levels (45 full text / 55 abstract / 38 bibliographic / 54 web); 191 of 204 palettes `source: "Artistic"` with no evidence field; 141 reference artworks are metadata only ("image not viewed").
- **Problems (fact):** 9:16 safe zone disagrees — `IMAGE_CRITIQUE_ENGINE.md` §3 "top 11 % / bottom 22 %" vs `GRAPHIC_DESIGN.md` and `THAI_TYPOGRAPHY.md` rule 22 "top ≈14 % / bottom 35 %"; `COLOR_THEORY.md` §9 says 150+ palettes (204 exist); `validate_job.py --help` and `score.py --help` crash (no argparse); `research/styles_part*.json` + `emotions_visual_part*.json` (~690 KB) are dead byte-identical copies; `EXAMPLES.md` 446 KB is grep-only; lighting split between the skill (51) and `visual-arts/light_libraries.json` (+17) with no reconciliation.
- **Evaluation:** structure tests only; best real image 77.5/100 by AI judgement; **no viewer test**, so the 90 bar is uncalibrated.

### ai-voice-director
- **Does:** script analysis → emotion id → Thai normaliser → `direction.json` → Gemini TTS (ask first) → `qc.py` (acoustics + Whisper CER) → retake failing lines.
- **Depth (opinion):** deep — phonetics/prosody, Thai pronunciation, TTS adapters, audio QC; working — voice acting, character voice, ethics; thin — pragmatics, mixing; none — music, visuals.
- **Sources:** 4/4 spot-checks confirmed (THAI-SER CC BY-SA 4.0, JaiTTS, Gemini TTS docs, PACLIC 2020).
- **Problems (fact):** ISO date `2026-11-25` normalises to "สองพันยี่สิบหก-สิบเอ็ด-ยี่สิบห้า"; `validate.py --help` crashes; only 6 of 44 dictionary entries verified (not even "Time Optic"); bible proposes **Puck** for Ton — already the user's Thai male promo voice; `research/emotions_part*.json` stale (3 sarcasm entries differ); SKILL.md never routes to creative-intelligence acting / sound / thai-language; project `tools/gemini_tts.py` still uses `gemini-2.5-flash-preview-tts`, no longer listed by Google.
- **Evaluation:** no new takes, no native-listener ratings → no line has a full 100-point score.

### master-creative-director
- **Does:** understand → route (32-row table, all 34 paths exist) → 2–3 directions → QC (`PRE_DELIVERY_CHECK`, `MASTER_QUALITY_SCORE`) → learn (feedback / experiment logs) → research batches.
- **Problems:** no route for `daily-post`, `flux-like-chatgpt`, `remove-spots`, the Slowly Growing channel, or the "ทำภาพโปรโมท" promo style (memory only); shows no description in the session listing.
- **Gap (opinion, important):** it routes *to* knowledge, but the five production skills never call it — the QC score, retention review, mix playbook and fact-check never run on routine clips.

### story-clips/_craft (acts as cinematographer + animation director + editor + sound designer, without a SKILL.md)
- GUIDE (shots, 180° rule, camera in 2D, editing rhythm, 12 principles for SVG puppets, limited-animation acting, sound, pre-render checklist); 14 styles; FX + 5-layer sound with −14 LUFS; deep 12-lesson curriculum with references and 10-point rubrics.
- Tools are real and deterministic: `rig.js` (puppets, Thai lip-sync, walk without foot slide, camera), `fx.js` (particles, 8 grades, transitions), `sound.py` (bed mixer, ducking, limiter), `visemes.py`, 83 CC0 SFX.
- **Gap:** curriculum all marked done on 2026-11-21, tested in production only through rig v2 / night-optic EP01 (opinion).

### carousel/ and slowly-growing/ (most-produced output: 160 story carousels — no SKILL.md)
- **Stale (fact):** `slowly-growing/README.md:3,22-31` still describes 9:16 20 s TikTok clips; the channel is IG 1:1 carousels since 2026-11-16 and the real scripts (`carousel.mjs`, `carousel-gen.*`, `pick.py`, `audio.py`, `captions-carousel.md`) are not mentioned. `carousel/README.md:20` lists one style (six exist), :24 recommends 1080×1350 (kits are 1080×1080), :26 says English-only (these kits are Thai).
- **Gap:** the pipeline that produces the most content has no skill, no QC and no log.

---

## 3. Cross-skill findings

### 3.1 Same rule in several places
| rule | copies | status |
|---|---|---|
| no line art in clips | CLAUDE.md, daily-post, frame-kit, beat-clip, eye-break | 5 copies, agree |
| English-only | CLAUDE.md, daily-post, beat-clip, eye-break, carousel | **conflicts** with the Thai exceptions kept only in memory (story clips, Hua Hin promos, carousels, Slowly Growing) |
| TikTok safe zone x 60–940, y 220–1480 | beat-clip, eye-break | agree — but ai-visual-artist has two other sets of numbers |
| shop name "Time Optic", `#123A29` / `#212121` | beat-clip, eye-break | agree |
| lens-layer mask recipe | frame-kit (alpha > 40, padded) vs beat-clip (alpha > 40, parts > 5000 px, dilate 5 px) | slightly different |
| contact sheet | frame-kit 7×2, beat-clip 7×3 + safe zone, eye-break own | 3 variants |
| music added later by the user | CLAUDE.md vs eye-break | eye-break contradicts |
| ask before Codex / Gemini quota; price only when given | 4–5 copies | agree |

Opinion: one `STUDIO_RULES.md` (house rules + language exceptions + safe zones + brand tokens) referenced by every skill
would end the drift.

### 3.2 Trigger phrases claimed twice
"ทำคลิป" (beat-clip vs frame-kit) · "แก้ภาพ" (daily-post) vs "ปรับภาพให้ดีขึ้น" (ai-visual-artist) · "ขอ prompt"
(frame-kit vs ai-visual-artist) · "ขอแคปชั่น" exists only for beat clips — nothing covers post/carousel captions.

### 3.3 Character data in three places
`ai-visual-artist/CHARACTER_BIBLE_TEMPLATE.md`, `ai-voice-director/CHARACTER_VOICE_BIBLE.md`, `story-clips/_craft/rig.js`
(+ `slowly-growing/README.md` for Mint & Tao). Nothing checks they agree.

### 3.4 Emotion ids
All 108 voice ids exist in the 114 visual ids; `emotions/emotion_crosswalk.json` links them. Nothing tests that the ids
stay in sync.

---

## 4. Coverage of the 27 directive domains (where it lives today)

| domain | where | depth (opinion) |
|---|---|---|
| Fine Arts & Art History | ART_STYLE_LIBRARY (102), REFERENCE_DATABASE, cartoon style history; **M11 has no knowledge folder** | thin |
| Graphic Design & Visual Communication | GRAPHIC_DESIGN.md (59 lines), THAI_TYPOGRAPHY.md; M26 no folder | thin–working |
| Color Theory & Psychology | COLOR_THEORY, 204 palettes, color_tools, visual-arts colour science / relativity / scripting | deep |
| Composition & Hierarchy | curriculum 03, COMPOSITION_LIBRARY (30), DETAIL_HIERARCHY, VALUE_AND_NOTAN | working–deep |
| Cinematography & Film Language | curriculum 01/02/05, GUIDE §1–2, CAMERA_ANGLE_LIBRARY (31), LENS_OPTICS | deep |
| Photography & Lighting | curriculum 01/04, LIGHTING_LIBRARY (51+17), LIGHTING_PHYSICS, MATERIAL_RENDERING | deep |
| Animation Principles | GUIDE §4–5, curriculum 06/07, rig.js | deep (tool-backed) |
| Character Design & Development | CHARACTER_DESIGN (39 lines), bible template, cartoon character specs | working |
| Human Anatomy & Body Language | acting README / POSE_LIBRARY; DRAWING_TECHNIQUES checklist; **no anatomy module** | thin (anatomy) / working (body language) |
| Facial Expressions & Emotional Acting | acting §2.7 FACS basics, GUIDE §5, rig.js emote; expression library = 0 | working |
| Storytelling & Narrative Psychology | storytelling, emotional-architecture, world-building, curriculum 08 | deep |
| Screenwriting & Dialogue | screenwriting + SCRIPT_CHECKER; dialogue library = 0 | working |
| Human Psychology & Behavioural Science | psychology, emotions, critical-thinking | working–deep |
| Cognitive Psychology & Visual Perception | cognitive-science (51 sources), neuroaesthetics, ART_FUNDAMENTALS | deep |
| Voice Acting & Voice Direction | ai-voice-director | deep (practically tested) |
| Phonetics, Phonology & Prosody | PROSODY_RULES, THAI_PRONUNCIATION, normaliser; general phonetics thin | working (Thai-strong) |
| Music Theory & Emotional Scoring | music README + MUSIC_DIRECTION = music *psychology*; **no harmony / form / scoring craft** | thin–working |
| Sound Design & Audio Engineering | FX.md, sound.py, sfxlib, SOUND_DESIGN_LIBRARY, MIX_PLAYBOOK, voice qc.py | deep |
| Video Editing & Motion Graphics | curriculum 11, GUIDE §3; motion graphics only in outside HyperFrames plugin; editing library = 0 | working / thin |
| Color Grading | curriculum 11, fx.js grades, COLOR_SCRIPTING, VA-002 | working |
| Branding & Marketing Psychology | branding, marketing, USER_PREFERENCES | working |
| Audience Analysis | audience + RETENTION_REVIEW, culture | working (theory only, **no own data**) |
| Creative Criticism | IMAGE_CRITIQUE_ENGINE, CRITIQUE_PROTOCOL, score.py; story/audio critique scattered | working (image) / thin (other) |
| AI Image / Video / Audio Generation | curriculum 09/10, provider adapters, CAPABILITY_MATRIX | deep (image) / working (video, audio) |
| Prompt Engineering | IMAGE_PROMPT_ENGINE, build_prompt.py, 239 image prompts, to_gemini.py | deep (image) / working (voice, video) |
| Quality Assurance | MASTER_QUALITY_SCORE, score.py, inspect_views, qc.py, curriculum 12, PRE_DELIVERY_CHECK | deep (automated) / **no human calibration** |
| Copyright, Licensing & AI Ethics | M39 DRAFTED; pieces in music §2.10, ETHICS_AND_THAI_AD_RULES, CULTURAL_CHECK J1, sfxlib CREDITS | thin, scattered |

**11-part reference template** (definition → checklist → references): module READMEs already have definition,
mechanism, use, limits, anti-patterns, references. Most often missing (estimate): **checklist** (cognitive-science,
continuity, creative-thinking, emotions, optical, psychology, screenwriting, sound, neuroaesthetics) and a
**"how to check and fix"** procedure (audio-engineering, neuroaesthetics). Good-example sections are thin in music and sound.

---

## 5. Biggest gaps (ranked, opinion)

1. **No feedback from real results.** Nothing stores views, retention, saves, chats or the user's ratings
   (`QUALITY_BENCHMARKS.json` 0, `FEEDBACK_HISTORY.json` 2, `PROMPT_EXPERIMENTS.json` 1). No module can pass PRACTICALLY
   TESTED; the 90/100 bar is uncalibrated. `ads-meta` can read ad results but is not wired in.
2. **Production skills don't use the knowledge.** QC score, retention review, mix playbook, fact-check, cultural check
   exist but routine clips/kits never call them.
3. **The most-produced output (story carousels) has no skill**, and its two READMEs are stale.
4. **House rules duplicated 5×** with an unrecorded language exception.
5. **Domain gaps:** art history (M11), anatomy, music theory/scoring, motion graphics, graphic design/typography (M26),
   copyright & AI ethics (M39 drafted), editing library.
6. **No tests** for 7 of 9 skills and for rig.js / fx.js / sound.py.
7. **Hygiene:** remove-spots YAML, stale counts (MASTER_INDEX 42 vs 44 modules; PROGRESS report pre-U1), ~950 KB dead
   research copies, safe-zone disagreement, `--help` crashes, ISO-date bug, Puck clash.

---

## 6. Phase 4 preview — the 20 proposed skills

Rule: a new skill only when it has a clear job no existing skill does; otherwise extend. (Full specs go in
`SKILL_REGISTRY.md` after approval.)

| proposed | verdict | why |
|---|---|---|
| ai-quality-control | **new (`studio-qc`)** | one shared gate every production skill calls: safe zone, loudness, brand, language, fact-check, cultural check, score. Gap #2 |
| ai-storytelling + ai-screenwriter + ai-character-designer (continuity) | **new, merged (`story-director`)** | story carousels and story clips have no skill; owns series bibles, character registry, continuity, script check |
| ai-audience-analyst + ai-creative-analyst | **new, merged (`performance-review`)** | records published results + user ratings, compares with predictions, feeds lessons back. Gap #1 |
| ai-knowledge-manager + ai-researcher | extend `master-creative-director` | already runs research batches, registry, routing |
| ai-cinematographer, ai-animation-director, ai-video-editor, ai-sound-designer, ai-colorist, ai-motion-designer | extend `story-clips/_craft` (give it a SKILL.md: `clip-director`) | knowledge and tools already exist there; six skills would split one pipeline |
| ai-visual-critic, ai-production-designer | extend `ai-visual-artist` | critique engine + environment design already there |
| ai-prompt-engineer | extend `ai-visual-artist` (image) + `ai-voice-director` (voice) + `_craft` curriculum 10 (video) | prompting is provider-specific |
| ai-music-director | extend knowledge (music module) inside `clip-director` | user adds music; brief-writing only |
| ai-human-psychology | knowledge module, not a skill | psychology/emotions already routed |
| ai-brand-strategist | extend knowledge (branding) + `STUDIO_RULES.md` | |

Net: **3 new skills + 1 SKILL.md for existing tools**, not 20.

---

## 7. Proposed order of work (each step verified before the next)

| step | content | risk |
|---|---|---|
| S1 hygiene | fix remove-spots YAML, stale READMEs/counts, safe-zone numbers, `--help`, ISO date, dead copies, router rows | low; tests re-run |
| S2 STUDIO_RULES.md | one house-rules file incl. the Thai exceptions; skills point to it (rules kept, not deleted) | low |
| S3 architecture docs | SKILL_REGISTRY, SKILL_DEPENDENCIES, MASTER_WORKFLOW, KNOWLEDGE_GAPS, QUALITY_STANDARDS | none |
| S4 new skills | studio-qc → performance-review → story-director → clip-director SKILL.md | medium; tested on a past job each |
| S5 research | gap domains in the 11-part format under `references/`: art history, anatomy, music theory/scoring, motion graphics, typography, copyright/AI ethics, editing library | research batches, ≤4 agents each |
| S6 evaluation | test suite per skill (real brief, criteria, expected output, expected failures) + first human rating session | needs the user's ratings |
| S7 deliverables | EVALUATION_REPORT, IMPROVEMENT_ROADMAP, RESEARCH_SOURCES (generated from the registry), CHANGELOG | none |

No capability is claimed improved until S6 has results.
