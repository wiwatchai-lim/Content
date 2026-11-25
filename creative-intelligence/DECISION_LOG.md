# Decision Log

## 2026-11-25 — D001: one knowledge base, existing files stay where they are
Context: two skills (ai-visual-artist, ai-voice-director) and the story craft curriculum already hold ~600 sources and most
visual/voice libraries. Options: (a) move everything into `creative-intelligence/`; (b) keep in place and index.
Chose (b): moving breaks skill paths that work in production. `SOURCE_REGISTRY.json` imports their sources with a pointer
to the full record; `KNOWLEDGE_MAP.md` maps modules to files.

## 2026-11-25 — D002: no 42 thin skills
The directive lists 42 example skills. Each skill's description sits in every session's context, and a skill without real
knowledge behind it would only pretend. Chose: one router (`master-creative-director`) + the existing specialist skills.
A new specialist skill is created only when its module reaches SOURCE VERIFIED and has a repeatable workflow
(candidates in order: storytelling/screenwriting for Mint & Tao, then continuity, then sound/music).

## 2026-11-25 — D003: honest statuses
Modules were rated from evidence in the repo, not from file existence. Nothing is HUMAN REVIEWED or PRODUCTION READY yet,
because the user has not reviewed outputs against these rules. `registry.py validate` blocks SOURCE VERIFIED+ without
registry sources and PRODUCTION READY without a human review entry.

## 2026-11-25 — D004: legacy tiers are provisional
Imported legacy sources get tier U, or an automatic first guess (`tier_method: auto`) from source type/domain. Confirm before
relying on a tier.

## 2026-11-25 — D005: research in parallel batches of ~4 modules
Each batch = background research agents with the shared brief, then merge + validate + review by the main session.
Phase 2 started with M01–M04.

## 2026-11-25 — D006: visual-arts brief deepens the existing skill; no second visual skill
The "Advanced Visual Arts" brief lists ~30 files. Files that already exist in `ai-visual-artist` (palette, composition,
drawing, research sources) are extended there. The new deep reference files go in `knowledge/visual-arts/`, and the
skill routes to them only when a job needs that depth, so the skill stays small enough to load every session.
Libraries hold only distinct entries (the targets are ceilings, not quotas). One error library is generated from the per-area files.

## 2026-11-25 — D007: brief v3 is mapped onto the existing system, not rebuilt
Brief v3 asks for 51 folders, 15 files per folder and 35 deliverables. Most already exist under other names.
`MASTER_CREATIVE_INTELLIGENCE_PLAN.md` maps each deliverable to its existing file, a new file or a planned batch.
We add a new module only where nothing covers the topic: M43 optical and eye-health. We do not create empty
per-folder file sets (CORE_THEORY, EXERCISES …); a module README holds those sections until real content needs its own file.

