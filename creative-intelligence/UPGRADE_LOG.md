# Upgrade log — Creative Intelligence v2 (2026-11-26)

Plan: `CHANGE_PLAN.md` · audit: `SKILL_AUDIT.md` · results: `evaluations/studio-benchmark/RESULTS.md`.

## Done (each step checked)
| # | step | check | limits |
|---|---|---|---|
| 0 | Backup | git tag `backup/pre-creative-upgrade-2026-11-26` (1b4ad0d) + `C:\timeoptic-backups\skills-ci-2026-11-26.tgz` (40 MB) | carousel/kits not archived (untouched, in git) |
| 1 | Baseline benchmark (before any change) | 24 answers `runs/baseline/`, frozen `runs/baseline.sha256` | solvers self-report not opening the key |
| 2 | Creative Memory | `tools/memory.py` add/recall/brief/stats/validate/digest/types; usage log; review_by warnings; secret filter; 47 records seeded from real sources only (taste 13, brand styles 4, characters 6, approvals 1, rejections 5, errors 10, fixes 5, prompts 2, rating 1 labelled ai-judgement); `validate` 0 errors; recall precision tuned (stray single-word matches dropped) | tag + word matching, not semantic; almost no human verdicts exist yet |
| 3 | Skill `creative-critic` + `tools/critic.py` | YAML loads; packet builds (no missing rubric files); `check` rejects a verdict that contradicts findings; **end-to-end run** (`evaluations/studio-benchmark/critic-e2e/`): fresh sub-agent found all 11 planted C2 defects + 3 valid extras, 0 invalid, checked claims against the real kit data (lens coating spec, existing lens layer) | one run only; `record` (→ memory) tested only by unit logic, not on a real user job |
| 4 | 15 domain guides `domains/` | each: 15 sections, 535–925 lines, every cited key in its sources JSON, 3 DOIs checked on Crossref (45/45 real; 2 lookups failed on malformed ISBN strings), registry `validate` 0 errors (2379 sources) | 2 guides under the 600-line target (12: 535, 14: 596); many Thai-specific claims are proposals to test, labelled so |
| 5 | Linking | `domains/README.md` (section guide + 12 job recipes); `tools/domains.py` status/graph/section; D01–D15 in `CROSS_DOMAIN_RELATIONSHIPS.json` (210 cross, 47 module, 25 skill edges); M45 added; M40 DRAFTED → SOURCE VERIFIED; modules link their guides in LEARNING_PROGRESS | cross edges come from the guides' own §10 tables — nearly every guide lists every other, so the graph is dense |
| 6 | Routing | master-creative-director (memory brief, domain table, critic, learning loop, routes for flux/remove-spots/daily-post/promo style); studio-loop note in 7 skills; CLAUDE.md note; MASTER_INDEX rows; dated notes in `carousel/README.md` and `slowly-growing/README.md` | existing text kept; nothing deleted |
| 7 | After benchmark + blind judging | `runs/after/` frozen; 5 judge agents, X/Y blind, create tasks judged in both orders → `RESULTS.md` | see RESULTS limits (AI judges, one run, partial blinding, D8 exposure self-reported) |

## Result in one line
Small real gains (fewer false critique findings 5→1, decisions 93%→97%, create 4.53→4.66 with 2 of 4 pairwise wins);
defect recall unchanged at ceiling (99%/98%). No large improvement is claimed.

## Not done / still open
- **Human ratings:** none collected — needed for calibration and for any module to pass PRACTICALLY TESTED.
- **Benchmark v2** with domain-specific tasks (list in RESULTS.md).
- **Real-job use** of the loop (memory brief → critic → user verdict → memory add) — starts with the next real job.
- Audit hygiene items from `SKILL_AUDIT.md` §2 not yet fixed: remove-spots YAML description, 9:16 safe-zone numbers in
  ai-visual-artist docs, `--help` crashes, ISO-date normalisation, dead `research/*_part*.json` copies, Puck proposed for Ton.
- **Question for the user:** are the 160 story-carousel characters (hoodie + long coat) the same as Mint & Tao
  (oatmeal sweater + charcoal coat)? (memory `cha-20261116-001`)
- Nothing was committed to git, posted, or sent to any external service; no Codex/Gemini/paid calls were made.
