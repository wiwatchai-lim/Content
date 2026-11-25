# Master Creative Intelligence Plan (brief v3 "Human Thinking & Multimedia Mastery", 2026-11-25)

This is the third big brief on the same day. Briefs 1 (42 modules) and 2 (visual arts) already built most of the
structure, so this plan **maps brief v3 onto what exists** and adds only what is missing (decision D007).
The status labels in brief v3 map to ours: RESEARCHING/DRAFTED → DRAFTED · VERIFIED → SOURCE VERIFIED ·
TESTED → PRACTICALLY TESTED · IMPLEMENTED → HUMAN REVIEWED / PRODUCTION READY · NEEDS IMPROVEMENT → a note on the module.

## Phase 0 — Existing knowledge audit (answers the 8 questions)
| # | question | answer |
|---|---|---|
| 1 | what we already have | 42-module system (`LEARNING_PROGRESS.json`), 991 sources; skills: ai-visual-artist (libraries + 6 tools), ai-voice-director (direction schema, Thai normaliser, QC, 108 emotions, 43 pronunciations), master-creative-director (router), 6 production skills; story craft guide + 12-lesson curriculum + rig/fx/sound + 83 CC0 SFX; deep visual reference `knowledge/visual-arts/` |
| 2 | incomplete | thinking (M33/M41 not started), audience/marketing (M28/M29 not started), music (M23), story/dialogue/comedy (M13 drafted, M14/M31/M32), optical domain (**no module at all** → new M43), voice presets (character bible only, no preset library), motion presets for eyewear explainers |
| 3 | duplicated | two emotion libraries (voice 108, visual 114 — crosswalk exists, merge pending the user's OK); lighting/camera prose in both curriculum and skill (now indexed, not copied) |
| 4 | out of date | model/tool docs older than a month must be re-checked before use (M36, CAPABILITY_MATRIX dates); platform safe-zone numbers in analyze_image are "working values, check current specs" |
| 5 | to study next | see roadmap below (ordered by practical value for TIME OPTIC) |
| 6 | usable now | Thai normaliser (now reads lens powers −1.00 → "ลบ หนึ่งจุดศูนย์ศูนย์", SPH/CYL/AXIS/ADD/PD), inspect_views, score profiles, fear-appeal + efficacy rule, misattributed-quote list, subtitle ≤17 cps, focal-point fix order |
| 7 | needs more tools | MOS/listening tests need the user's ears; ASR comparison for Thai needs a Thai ASR (none installed — would need a check of a free model before install); eye-tracking: none (saliency model only); music generation: none (the user adds music) |
| 8 | capability limits | Codex + Gemini TTS cost quota (ask first); FLUX schnell ignores fine light/camera control (VA-001); Wan 2.2 5 s clips on a 6 GB GPU; no voice cloning (and none without consent); Gemini TTS has no SSML — style is natural-language only (TTS_PROVIDER_ADAPTERS.md) |

## Phase → module → where it lives
| brief v3 phase | module(s) | status now | where |
|---|---|---|---|
| 1 thinking | M41, M33 | NOT STARTED → batch T1 running | knowledge/critical-thinking, knowledge/creative-thinking |
| 2 psychology & cognition | M01, M04 | DRAFTED / SOURCE VERIFIED | knowledge/psychology, cognitive-science |
| 2.3 audience, 20 attention & retention | M28 | batch T1 running | knowledge/audience |
| 2.4 ethics, 21 marketing & brand | M29, M27, M39 | batch T1 running (M29) | knowledge/marketing |
| 3 emotion | M02, M32 | DRAFTED / NOT STARTED | knowledge/emotions + both skill emotion libraries |
| 4 linguistics, 5 Thai | M21 | PRACTICALLY TESTED (+ batch T1 for verification) | voice skill THAI_PRONUNCIATION, normaliser; knowledge/thai-language |
| 6 voice acting, 7 direction, 8 TTS | M20, M36 | PRACTICALLY TESTED | ai-voice-director (schema, adapters, QC) |
| 9 audio, sound, music | M22, M23, M24 | DRAFTED / NOT STARTED | story-clips/_craft/FX.md, sound.py, sfxlib |
| 10–11 story, script, copy | M13, M14, M31 | DRAFTED / NOT STARTED | batch P3 (next) |
| 12–15 art, colour, light, type, photo | M05–M11, M26 | mostly SOURCE VERIFIED+ | ai-visual-artist + knowledge/visual-arts |
| 15 eyewear photography | M10, M18, M43 | lighting setups for eyewear exist (VA1, untested) | knowledge/visual-arts/light_libraries.json |
| 16–18 film, edit, motion | M18, M19, M25 | PRACTICALLY TESTED / SOURCE VERIFIED | curriculum 05/06/08/10/11, GUIDE.md, rig.js |
| 19 multimodal | M04 | SOURCE VERIFIED | knowledge/cognitive-science (sync, redundancy) |
| 22 AI generation | M36 | PRACTICALLY TESTED | curriculum 09/10, IMAGE_PROVIDER_ADAPTERS, TTS_PROVIDER_ADAPTERS |
| 23 optical & healthcare | **M43 (new)** | batch T1 running | knowledge/optical |
| 24 research system | M40 | DRAFTED | schemas/RESEARCH_BRIEF.md, registry.py |
| 25 KB architecture, 32 retrieval | M40 | built | MASTER_INDEX, KNOWLEDGE_MAP, master-creative-director routing |
| 26 expert system | — | D002: one router + 2 knowledge skills, not 31 agents | master-creative-director |
| 27 workflow, 28 self-critique, 29 scoring | M42 | PRACTICALLY TESTED | evaluations/MASTER_QUALITY_SCORE.md, score.py, voice qc.py, inspect_views |
| 30 experiments, 31 improvement | M42 | running | experiments/, VISUAL_EXPERIMENTS.json, memory/, LESSONS_LEARNED |
| 33 TIME OPTIC application | all | — | the production skills (frame-kit, beat-clip, eye-break-clip, story clips, carousels) |
| 34 unknown knowledge | — | list below | this file |

## The 35 deliverables → existing file, new file, or planned
Rule: no second copy of something that exists. "→" means the deliverable is that file.
| # | deliverable | answer |
|---|---|---|
| 1 | MASTER_CREATIVE_INTELLIGENCE_PLAN | this file |
| 2 | EXISTING_KNOWLEDGE_AUDIT | → reports/PHASE0_AUDIT.md + Phase 0 table above |
| 3 | KNOWLEDGE_GAP_ANALYSIS | → table above + knowledge/visual-arts/_audit.json (visual terms) |
| 4 | RESEARCH_CURRICULUM | → LEARNING_PROGRESS.json (43 modules) + RESUME.md roadmap |
| 5 | MASTER_KNOWLEDGE_INDEX | → MASTER_INDEX.md + KNOWLEDGE_MAP.md (generated) |
| 6 | RESEARCH_REFERENCE_DATABASE | → SOURCE_REGISTRY.json (generated) |
| 7–8 | THINKING_FRAMEWORK, CREATIVE_THINKING_PLAYBOOK | → knowledge/critical-thinking/PRE_DELIVERY_CHECK.md, knowledge/creative-thinking/IDEATION_PLAYBOOK.md (batch T1) |
| 9 | HUMAN_PSYCHOLOGY_GUIDE | → knowledge/psychology/README.md |
| 10 | EMOTION_DESIGN_MATRIX | planned P3 (M32): one matrix emotion × voice/word/colour/light/camera/music/SFX/cut/motion/space/silence, built from the two emotion libraries |
| 11–12 | THAI_PRONUNCIATION_DICTIONARY, THAI_TEXT_NORMALIZATION_RULES | → ai-voice-director/PRONUNCIATION_DICTIONARY.json + tools/thai_normalize.py; proposals in knowledge/thai-language (T1) |
| 13–16 | VOICE_ACTING_GUIDE, VOICE_DIRECTION_SYSTEM, VOICE_PRESET_LIBRARY, TTS_ENGINEERING_GUIDE | → ai-voice-director (PROSODY_RULES, VOICE_DIRECTION_SCHEMA, TTS_PROVIDER_ADAPTERS); **preset library missing** → planned batch T3 |
| 17–18 | AUDIO_ENGINEERING_PLAYBOOK, SOUND_DESIGN_LIBRARY | → story-clips/_craft/FX.md + sfxlib (83 sounds); playbook planned P5 |
| 19–20 | STORYTELLING_FRAMEWORK, SCRIPTWRITING_PLAYBOOK | planned P3 (next) |
| 21–23 | ART_DIRECTION_GUIDE, VISUAL_DESIGN_STANDARDS, COLOR_AND_LIGHTING_GUIDE | → ai-visual-artist/SKILL.md + knowledge/visual-arts/ |
| 24–25 | CINEMATIC_LANGUAGE_LIBRARY, VIDEO_EDITING_PLAYBOOK | → visual-arts/CAMERA_ANGLE_LIBRARY.json + curriculum 05/11 + GUIDE.md; camera-move and edit libraries planned P8 |
| 26 | MULTIMODAL_SYNCHRONIZATION_GUIDE | → knowledge/cognitive-science (sync rules) — expand in P5 with sound timing |
| 27 | OPTICAL_KNOWLEDGE_BASE | → knowledge/optical/ (T1) |
| 28 | CREATIVE_PRODUCTION_WORKFLOW | → master-creative-director SKILL.md (scaled 9-stage) |
| 29 | QUALITY_EVALUATION_RUBRIC | → evaluations/MASTER_QUALITY_SCORE.md + score.py profiles; **behavioural anchors** to add (T2) |
| 30 | BENCHMARK_TEST_SUITE | → TEST_CASES.json in both skills (run_tests: visual 734, voice 392 checks) |
| 31 | EXPERIMENT_REGISTRY | → experiments/README.md log + knowledge/visual-arts/VISUAL_EXPERIMENTS.json + memory/PROMPT_EXPERIMENTS.json |
| 32 | KNOWLEDGE_RETRIEVAL_SYSTEM | → master-creative-director routing table (+ job-type recipes, T2) |
| 33 | CONTINUOUS_IMPROVEMENT_SYSTEM | → memory/FEEDBACK_HISTORY.json + LESSONS_LEARNED + ANTI_PATTERNS; feedback loop steps to add (T2) |
| 34 | TIME_OPTIC_CREATIVE_STANDARD | planned T2: one page from CLAUDE.md house rules + USER_PREFERENCES + brand rules |
| 35 | IMPLEMENTATION_ROADMAP | → RESUME.md |
The brief's 9 continuous-improvement files (USER_PREFERENCES, CREATIVE_STANDARDS, COMMON_FAILURES …) map to
USER_PREFERENCES.md, DESIGN_PATTERNS.md, ANTI_PATTERNS.md, LESSONS_LEARNED.md, memory/*.json. Approved and rejected
style libraries are created only once the user has approved or rejected something.

## Roadmap (ordered by practical value × evidence × feasibility)
| batch | content | status |
|---|---|---|
| T1 | M43 optical + fact-check workflow · M21 Thai pronunciation verification + style guide · M41/M33 thinking · M28/M29 audience, retention, marketing ethics + Thai ad rules | running 2026-11-25 |
| T2 | integration: TIME_OPTIC_CREATIVE_STANDARD, router recipes per job type, rubric behavioural anchors, feedback loop, merge T1 proposals into the voice skill after spot-check | next |
| P3 | story, dialogue, comedy, emotional architecture + EMOTION_DESIGN_MATRIX + script checker | next after T2 |
| T3 | voice preset library (22 presets) + one listening A/B test (Gemini TTS — **ask first, uses quota**) | planned |
| P4–P12, VA2–VA4 | as in RESUME.md | planned |

## Phase 34 — knowledge the brief did not list (proposed, ranked)
1. **Health-communication science** (risk communication, numeracy, Fagerlin/Zikmund-Fisher): our UV and presbyopia clips talk about risk.
2. **Thai health-advertising law** (อย., Consumer Protection Board): a legal limit on what scripts can say (started in T1 M29).
3. **Accessibility for people with low vision**: this shop's audience includes people with poor eyesight. Topics: font size, contrast, motion sensitivity, caption standards.
4. **Human–AI co-creation**: when AI ideation makes outputs more alike (Doshi & Hauser 2024), and how to keep variety (in T1 M33).
5. **Measurement with tiny samples**: what a small shop can conclude from IG Insights; Bayesian A/B for small numbers.
6. **Retail / in-store experience design**: the clips drive people to a physical shop in Hua Hin.
7. **Tourist communication**: English-as-a-lingua-franca research for foreign customers.

## Honesty rules carried over
No invented sources or results. Unrun experiments are not reported. Statuses follow the rules in LEARNING_PROGRESS.json.
Feedback from one job does not change long-term rules without a second case (directive v3 phase 31).
