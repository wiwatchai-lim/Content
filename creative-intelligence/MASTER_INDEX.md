# Creative Intelligence — Master Index

ฐานความรู้กลางของ TIME OPTIC studio (เริ่ม 2026-11-25 จาก "MASTER DIRECTIVE: AI CREATIVE INTELLIGENCE & PRODUCTION STUDIO").
**Do not load everything.** Start from the `master-creative-director` skill (`.claude/skills/master-creative-director/SKILL.md`),
which picks the few files a job needs.

## Start here
| need | file |
|---|---|
| Resume work / what's next | `RESUME.md` |
| Which module lives where (45 modules → files) | `KNOWLEDGE_MAP.md` |
| **15 deep domain guides (v2, 2026-11-26)** — same 15 sections each, job recipes | `domains/README.md` (`python creative-intelligence/tools/domains.py status`) |
| **Creative Memory** — approvals, rejections, taste, brand styles, characters, tested prompts, errors, fixes, ratings | `memory/README.md` (`tools/memory.py brief/add`) · readable: `memory/MEMORY_DIGEST.md` |
| **Independent critic** | skill `.claude/skills/creative-critic/` (`tools/critic.py`) |
| Before/after test of the studio | `evaluations/studio-benchmark/` (RESULTS.md) |
| Skill audit + v2 change plan + log | `SKILL_AUDIT.md` · `CHANGE_PLAN.md` · `UPGRADE_LOG.md` |
| Status of every module | `LEARNING_PROGRESS.json` (`python creative-intelligence/tools/registry.py stats`) |
| Every source, tier, access level | `SOURCE_REGISTRY.json` (generated — `registry.py build`) · how to research: `RESEARCH_INDEX.md` |
| Claims and how strong the evidence is | `EVIDENCE_MATRIX.json` |
| What our tools/models really do | `CAPABILITY_MATRIX.json` |
| Links between modules, skills, tools | `CROSS_DOMAIN_RELATIONSHIPS.json` |
| What the user wants (confirmed) | `USER_PREFERENCES.md` |
| Patterns that work / fail | `DESIGN_PATTERNS.md` · `ANTI_PATTERNS.md` · `LESSONS_LEARNED.md` |
| Why we chose something | `DECISION_LOG.md` · `CHANGELOG.md` |
| Quality score (100 pts) + critical failures | `evaluations/MASTER_QUALITY_SCORE.md` |
| Experiments | `experiments/README.md` (template + log) |
| Audit + progress reports | `reports/` |

## Where the knowledge already lives (kept in place, linked — not copied)
- `.claude/skills/ai-visual-artist/` — art, composition, colour, lighting, styles, emotion→visual, graphic design, Thai type, critique.
- `creative-intelligence/knowledge/visual-arts/` — deep visual reference (colour science, value, edges, shape, perspective, shots, lens, light physics, materials, atmosphere); README routes.
- `.claude/skills/ai-voice-director/` — emotion→voice, prosody, Thai pronunciation, TTS, audio QC.
- `story-clips/_craft/` — GUIDE (shots, acting, editing), STYLES, FX, rig/fx/sound tools, 12-lesson curriculum, LEARNING-LOG.
- Production skills: `frame-kit`, `beat-clip`, `eye-break-clip`, `daily-post`, `flux-like-chatgpt`; carousels in `carousel/`, `slowly-growing/`.
- New research batches: `knowledge/<module>/README.md` + `sources.json`.

## Library targets (directive part 6) — real counts
| library | target | now | where |
|---|---|---|---|
| Emotion | 200 | 108 voice + 114 visual (not yet unified) | ai-voice-director / ai-visual-artist |
| Color palette | 300 | 204 | ai-visual-artist/COLOR_PALETTE_LIBRARY.json |
| Composition | 100 | 30 | ai-visual-artist/COMPOSITION_LIBRARY.json |
| Lighting | 150 (VA brief) | 51 + 17 new setups (VA1) | ai-visual-artist/LIGHTING_LIBRARY.json + knowledge/visual-arts/light_libraries.json |
| Art style | 150 | 102 | ai-visual-artist/ART_STYLE_LIBRARY.json |
| Prompt templates | 300 | 239 image + 207 directed voice lines | EXAMPLES.md (both skills) |
| Quality test cases | 300 | 117 visual + 48 voice = 165 | TEST_CASES.json (both skills) |
| Pronunciation dictionary | — | 43 | ai-voice-director |
| Colour relationships | 100 | 60 | knowledge/visual-arts/color_relationships.json |
| Tonal compositions | 100 | 13 | knowledge/visual-arts/form_libraries.json |
| Camera angles & shots | 200 | 31 (one per distinct shot/angle) | knowledge/visual-arts/CAMERA_ANGLE_LIBRARY.json |
| Lens usage | 100 | 19 | knowledge/visual-arts/lens_examples.json |
| Perspective errors | 100 | 26 | knowledge/visual-arts/PERSPECTIVE_ERROR_LIBRARY.json |
| Material rendering | 100 | 31 | knowledge/visual-arts/light_libraries.json |
| Atmospheric effects | 50 | 16 | knowledge/visual-arts/light_libraries.json |
| Shape language / edge control | 100 / 50 | 12 / 11 | knowledge/visual-arts/form_libraries.json |
| Visual error patterns | 200 | 49 (generated index) | knowledge/visual-arts/VISUAL_ERROR_LIBRARY.json |
| Visual experiments (real runs) | — | 3 (VA-000…002) | knowledge/visual-arts/VISUAL_EXPERIMENTS.json |
| Symbol/metaphor, story pattern, dialogue, archetype, expression, pose, shot, camera move, animation move, sound, music mood, editing, layout | 50–300 each | 0 as structured files (some prose in GUIDE/curriculum) | — |

Numbers are targets, not reasons to pad. A library grows only with entries that have source, limits, example and test status.
