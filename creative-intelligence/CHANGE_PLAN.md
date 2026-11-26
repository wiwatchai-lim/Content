# Change plan — Creative Intelligence upgrade v2 (2026-11-26)

Directive (user, 2026-11-26): deepen 15 knowledge domains, link them, add an independent Creative Critic, a Creative
Memory that stores real experience, before/after tests; back up first, log every step, no external publishing.
Builds on `SKILL_AUDIT.md` (same day). Nothing existing is deleted; every change is additive or a documented fix.

## 0. Safety
- Backup ✔ — git tag `backup/pre-creative-upgrade-2026-11-26` (HEAD 1b4ad0d) + archive
  `C:\timeoptic-backups\skills-ci-2026-11-26.tgz` (skills, creative-intelligence, craft GUIDE/LOG, CLAUDE.md).
  Restore one file: `git checkout backup/pre-creative-upgrade-2026-11-26 -- <path>`.
- No posting, no Codex / Gemini / paid calls, no ads changes. Research uses web reading only.
- Every step is logged in `UPGRADE_LOG.md` (done · not done · limits).

## 1. Baseline test (before any change) — `evaluations/studio-benchmark/`
24 tasks: 8 critiques with planted defects (77 defects, answer key in `_key/`), 12 decisions with key points,
4 creative briefs. Solved by fresh agents using the system as it is (`runs/baseline/`). Scored by an independent judge
blind to which run is which. Same tasks + same prompt after the upgrade (`runs/after/`).
Limits: the judge is an AI; the key was written by the same author as the upgrade (bias risk — mitigated by keeping the key
to rules that already existed before today, and by blind A/B labels).

## 2. Knowledge: 15 domains (Markdown per domain, 15-part template)
Location: `creative-intelligence/domains/NN-<slug>.md` + sources `creative-intelligence/domains/sources/NN-<slug>.json`
(registry extended to read them). Each domain builds on the existing modules (links, not copies) and adds what is missing.

| # | domain | existing base | new focus |
|---|---|---|---|
| 01 | Creative Thinking & Cognitive Science | M33, M04 | history (Guilford, Wallas, Torrance), divergent/convergent, incubation evidence, constraints, expertise |
| 02 | Human Psychology & Emotional Intelligence | M01, M02 | EI models (Mayer-Salovey ability vs mixed models) + critiques, empathy, appraisal |
| 03 | Aesthetic Intelligence & Artistic Taste | M05, M06 | taste formation, expertise effects, fluency, Bourdieu, judging quality |
| 04 | Advanced Visual Language & Visual Grammar | visual-arts, M07, M08 | Kress & van Leeuwen, Cohn's visual language, Arnheim, film grammar |
| 05 | Semiotics, Symbolism & Metaphor | M12 | conceptual metaphor (Lakoff & Johnson), visual metaphor (Forceville), Peirce/Barthes |
| 06 | Character Psychology & Development | M15 (no folder), M17 | trait models for characters, want/need, arcs, theory of mind, consistency |
| 07 | Worldbuilding & Narrative Continuity | M16, M38 | transmedia, story bibles, continuity science (change blindness) |
| 08 | Philosophy, Literature & Poetry | M03 | poetics, narrative theory, Thai poetic forms, close reading |
| 09 | Cultural Studies & Cross-cultural Communication | M30 | Hall, Hofstede (+ critiques), GLOBE, Thai context, localisation |
| 10 | Psychoacoustics & Sensory Experience | M22–M24 | loudness (ISO 226, LUFS), masking, crossmodal correspondences, multisensory |
| 11 | Consumer Psychology & Creative Marketing | M28, M29, M27 | ELM, Ehrenberg-Bass, Binet & Field, persuasion evidence + replication |
| 12 | Independent Creative Criticism | aesthetics/CRITIQUE_PROTOCOL | Feldman/Barrett methods, critic independence, bias in judgement |
| 13 | Quality Assurance & Evaluation | M42 | rubric design, inter-rater reliability, A/B testing, golden sets |
| 14 | Knowledge Management & Experience Learning | M40 (DRAFTED) | SECI, after-action review, case-based reasoning, Kolb, lessons-learned failure modes |
| 15 | Creative Workflow Automation | M37 | pipelines, idempotent renders, human-in-the-loop, asset management |

15-part template per domain: history · fundamentals · advanced theory · research & texts · evidence & limits ·
applications · success case studies · failure analysis · exceptions & context · cross-discipline use · decision guide ·
exercises · checklist · evaluation rubric · references (verified, honest access status).
Research runs as background agents (≤4 at once) with `schemas/RESEARCH_BRIEF.md` + a domain brief; each output is
spot-checked (≥3 sources opened per domain) before it is accepted.

## 3. Linking — `domains/DOMAIN_GRAPH.md` + `domains/graph.json`
Domain ↔ module ↔ skill ↔ tool edges, and "cross-discipline recipes": for a job type, which domains combine and how
(e.g. Thai story carousel = 06 + 07 + 08 + 02 + 04 + 12).

## 4. Creative Critic — new skill `.claude/skills/creative-critic/`
Separate role from the maker: runs as a fresh sub-agent that sees only the work, the brief and the rubric (never the
maker's reasoning). Output: located findings (where · what · why with rule/source · fix · severity · confidence),
what works, verdict. Tools: `critic.py` (builds the critic packet, records the critique to memory). Uses domain 12
+ 13 + the rubric of whichever domain the work belongs to.

## 5. Creative Memory — `creative-intelligence/memory/` store + `tools/memory.py`
One JSONL store per record type: approvals, rejections (with reasons), taste, brand styles, characters, tested prompts,
errors, fixes that worked, human ratings. CLI: `add`, `recall` (by tags/job/text), `stats`, `export-md`.
Seeded only from real existing records (auto-memory, FEEDBACK_HISTORY, ANTI/DESIGN_PATTERNS, LEARNING-LOG, kits.csv,
character bibles). Skills call `recall` before a job and `add` after user feedback.

## 6. Routing
`master-creative-director` gets a domain table (load only the needed domain section). Production skills get one line
each: "before delivery → creative-critic; after the user's verdict → memory add".

## 7. After test + report
Re-run the benchmark (`runs/after/`), blind-judge, write `evaluations/studio-benchmark/RESULTS.md` and
`UPGRADE_LOG.md`. Claims of improvement only from these numbers.

## Order
0 ✔ → 1 → (2 research in background) ∥ 5 memory → 4 critic → 3 graph → 6 routing → 7.
