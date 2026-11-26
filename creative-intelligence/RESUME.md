# Resume — Master Learning Roadmap

**Say to Claude:** "เรียนรู้ต่อ" (or "continue Creative Intelligence from RESUME.md").

## Checkpoint (update at the end of every batch)
- Last session: 2026-11-25 — Phase 0, Phase 1, and Phase 2 first pass (P2: M01–M04) done. **Next: P3.**
- Open debt from P2: M01/M02 need full-text reads (PMC blocked by captcha — try publisher OA PDFs); merge the 22 missing emotions + Thai `th.` ids into the libraries after the user agrees.
- 2026-11-25 (later): visual-arts brief, batch **VA1** done (colour science, value/edges/shape, light/materials/atmosphere,
  perspective/shots/lens → `knowledge/visual-arts/`, +183 sources, tools inspect_views + art_mastery score, experiments VA-000..002).
  **Next visual batch: VA2** (see the visual-arts track below). Say "เรียนรู้ภาพต่อ" for VA2, "เรียนรู้ต่อ" for P3.
- 2026-11-25 (latest): brief v3 mapped in `MASTER_CREATIVE_INTELLIGENCE_PLAN.md` (D007). Batch **T1** done: M43 optical
  (new, DRAFTED), M21 Thai pronunciation (brand fixes merged), M41/M33 thinking, M28/M29 audience + marketing ethics.
  **Next: T2 integration** (TIME_OPTIC_CREATIVE_STANDARD, router recipes, rubric anchors, feedback loop, M43 full-text reads),
  then P3. Open questions for the user: emotion merge; lens-power reading for customers ("สั้นสองร้อย" vs "ลบสองจุดศูนย์ศูนย์").
- 2026-11-25 (end of day): user asked to learn everything, general-purpose. U1+U2+U3 done → **31 SOURCE VERIFIED +
  9 PRACTICALLY TESTED + 3 DRAFTED (M35 computer vision, M39 copyright/ethics/AI-label law, M40 knowledge management)**, 1544 sources.
  **Next "เรียนรู้ต่อ": U4** = those 3 modules → then T2 integration → VA2–VA4 → P11 practical tests + the user's ratings.
- 2026-11-25: cartoon batch C1 → new module M44 (SOURCE VERIFIED, 120 sources, experiments C1-001..003). Remaining
  cartoon tests: AI_CARTOON_GENERATION.md ai_tests T1-T3, T5-T9 (free FLUX).
- 2026-11-26: **v2 upgrade** (user directive: 15 domains, critic, memory, before/after test). Done: `domains/` 15 guides
  (all SOURCE VERIFIED, 715 sources), Creative Memory (`tools/memory.py`, 47 real records), skill `creative-critic`,
  benchmark (`evaluations/studio-benchmark/RESULTS.md`: small gains in precision + memory decisions; recall at ceiling).
  Log: `UPGRADE_LOG.md`. **Next:** benchmark v2 (harder, domain-specific tasks) + first human ratings from the user;
  then U4 (M35, M39) and T2 integration as before. Open question for the user: Mint & Tao vs the hoodie/coat duo.
- Check state: `python creative-intelligence/tools/registry.py stats` and `validate`.

## How to run a batch
1. Pick the next row below. Read `schemas/RESEARCH_BRIEF.md`.
2. Launch one background research agent per module (≤4 at once) with the brief + module scope + existing files to not duplicate.
3. When they finish: read each README (spot-check 3 sources per module by opening the URL), fix honesty problems.
4. `registry.py build` → `validate` (0 errors). Update LEARNING_PROGRESS.json (status, files, notes, batches[]), CHANGELOG.md,
   KNOWLEDGE_MAP (auto), DESIGN/ANTI_PATTERNS for any applied rule, add the knowledge row to master-creative-director routing.
5. If the module is ready for practice, run one free experiment (FLUX/HTML) and log it.

## Roadmap (order chosen by what the shop produces most: Thai story carousels + clips)
| batch | phase | modules | why now |
|---|---|---|---|
| P2 | 2 | M01 psychology, M02 emotion science, M03 philosophy, M04 cognitive science | ✔ first pass 2026-11-25 |
| P3 | 4 | M13 story patterns, M14 dialogue & subtext, M31 comedy, M32 emotional architecture | 120+ carousels written without a sourced story base |
| P4 | 4/9 | M15+M16 world building & lore store, M38 continuity tooling, M17 FACS/expression library | 4 running series need continuity |
| P5 | 6 | M22 sound design theory, M23 music psychology & mood library, M24 mix/master + LUFS for Reels | clips need sound; user adds music |
| P6 | 7 | M28 audience, M29 content strategy (verify Meta/IG docs live), M27 brand bible, M30 Thai cultural context | links content to results |
| P7 | 3 | M05 neuroaesthetics, M06 aesthetics, M12 semiotics & symbol library (Thai + Western meanings) | deepen visual |
| P8 | 5/7 | structured libraries: shots 200, camera moves 50, editing 100, layouts 200 — from curriculum prose, each with source + test status | reuse |
| P9 | 8 | M34, M35 sourced write-up of our CV tools, M36 model matrix refresh, M37 pipeline docs | engineering |
| P10 | 9 | M33 creative thinking, M39 copyright/ethics rules (Thai + platform AI labels), M40, M41 | integration |
| P11 | 10–11 | practical tests: one experiment per library; collect the user's ratings → first HUMAN REVIEWED modules | evidence |
| P12 | 12 | progress report, prune, consolidate | |

Unify the two emotion libraries after P2 (crosswalk from M02 batch) — target 200 states only with real entries.

## Visual-arts track (brief 2026-11-25, `knowledge/visual-arts/README.md`)
| batch | topics | output files |
|---|---|---|
| VA1 ✔ | colour science · value/notan · edges/detail · shape · lighting physics · materials · atmosphere · perspective · shots · lens | done 2026-11-25 |
| VA2 | composition master (extend skill COMPOSITION_LIBRARY, 30 → real new patterns) · perception + eye guidance (saliency vs real eye-tracking) · typography mastery (grids, optical alignment, pairing; Thai rules stay in THAI_TYPOGRAPHY.md) · compositing (shadow/light/colour/reflection matching for real product photos) | COMPOSITION_MASTER.md, VISUAL_PERCEPTION.md, EYE_GUIDANCE.md, TYPOGRAPHY_MASTERY.md, IMAGE_COMPOSITING.md |
| VA3 | visual development (mood/style boards, colour script per series) · drawing + painting techniques · art criticism & taste · error library merge · experiments VA-P01/P02/P04 | VISUAL_DEVELOPMENT.md, PAINTING_TECHNIQUES.md, ART_CRITICISM.md |
| VA4 | practical tests: one controlled experiment per library (HTML/grade/crop = controlled; FLUX only with fixed geometry); user ratings → HUMAN REVIEWED | experiments/ |
Lesson from VA1: a FLUX light phrase changed the camera and the product (VA-001) — do controlled tests outside the model.

## Full-coverage plan (user 2026-11-25: learn everything, general-purpose — not only eyewear)
Goal: every module at least SOURCE VERIFIED, written domain-neutral. "เรียนรู้ต่อ" runs the next unchecked row.
| batch | modules | status |
|---|---|---|
| U1 | M13, M14, M31, M32, M22, M23, M24, M12, M30 | ✔ 2026-11-25 |
| U2 | M16, M38, M27, M17, M05, M06 | ✔ 2026-11-25 |
| U3 | full-text upgrade M01, M02, M43, M13, M31, M22, M23, M12, M30 | ✔ 2026-11-25 |
| U4 | M35 computer vision, M39 copyright + AI-label law (read the Royal Gazette notice), M40 knowledge management | next |
| T2 | integration: creative standard, router recipes per job type (any field), rubric anchors, feedback loop | |
| VA2–VA4 | visual track (composition, perception, typography, compositing, visual dev, painting, criticism, tests) | |
| P11 | practical tests + the user's ratings → HUMAN REVIEWED | |

