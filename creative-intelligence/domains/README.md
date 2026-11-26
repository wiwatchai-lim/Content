# Domains — Creative Intelligence v2 (2026-11-26)

15 deep domain guides that sit **on top of** the 44 modules in `../knowledge/` and the skill files. Each guide has
the same 15 sections, so you can jump straight to the part a job needs:

| § | section | use it when |
|---|---|---|
| 1 | history | explaining where an idea comes from |
| 2 | fundamentals | defining terms |
| 3 | advanced theory | choosing between competing models |
| 4 | key research & texts | finding the source behind a claim |
| 5 | evidence & limits | **before stating anything as fact** |
| 6 | applications | doing the work (generic → studio) |
| 7 | success cases | arguing for a direction |
| 8 | failure analysis | risk check |
| 9 | exceptions & context | Thai vs Western, platform, audience |
| 10 | cross-discipline | combining domains (graph below) |
| 11 | decision guide | making a choice — if/then tables |
| 12 | exercises | training / testing |
| 13 | checklist | **before delivery** |
| 14 | evaluation rubric | **critique and scoring** (creative-critic packets point here) |
| 15 | references | every key → `sources/<file>.json` → `../SOURCE_REGISTRY.json` |

**Never load a whole guide.** Read the § you need (`grep -n "^## " <file>` gives line numbers).
Evidence labels inside: FACT · THEORY · PRACTICE (craft) · OPINION · (our test). Status line at the top of each file.

## The 15 guides
| # | guide | builds on | key decision it helps with |
|---|---|---|---|
| 01 | [Creative thinking & cognitive science](01-creative-thinking-cognitive-science.md) | M33, M04, IDEATION_PLAYBOOK | getting 3 truly different ideas; picking one |
| 02 | [Human psychology & emotional intelligence](02-human-psychology-emotional-intelligence.md) | M01, M02 | reading the audience's emotional need; safe wording on worry/loneliness |
| 03 | [Aesthetic intelligence & taste](03-aesthetic-intelligence-taste.md) | M05, M06 | "is it good / premium / generic AI look?" |
| 04 | [Visual language & grammar](04-visual-language-grammar.md) | visual-arts, M07, M08, M18 | how a slide/clip/scene is read; text–image relations |
| 05 | [Semiotics, symbolism & metaphor](05-semiotics-symbolism-metaphor.md) | M12, SYMBOL_LIBRARY | fresh vs cliché metaphor; unintended meanings |
| 06 | [Character psychology & development](06-character-psychology-development.md) | M15, M17 | consistent, believable characters; faceless acting |
| 07 | [Worldbuilding & narrative continuity](07-worldbuilding-narrative-continuity.md) | M16, M38 | series bibles, canon, continuity checks |
| 08 | [Philosophy, literature & poetry](08-philosophy-literature-poetry.md) | M03, new M45 | short wise lines, Thai poetic forms, quote checks |
| 09 | [Cultural studies & cross-cultural communication](09-cultural-studies-cross-cultural.md) | M30, CULTURAL_CHECK | Thai/foreign audiences, festivals, representation |
| 10 | [Psychoacoustics & sensory experience](10-psychoacoustics-sensory-experience.md) | M22–M24, MIX_PLAYBOOK | loudness, masking, sync, sound-off viewing |
| 11 | [Consumer psychology & creative marketing](11-consumer-psychology-creative-marketing.md) | M27–M29 | persuasion that is honest and works |
| 12 | [Independent creative criticism](12-independent-creative-criticism.md) | CRITIQUE_PROTOCOL | how the critic works; biases of AI judges |
| 13 | [Quality assurance & evaluation](13-quality-assurance-evaluation.md) | M42, MASTER_QUALITY_SCORE | rubrics, reliability, before/after tests |
| 14 | [Knowledge management & experience learning](14-knowledge-management-experience-learning.md) | M40 | what to record, how to reuse it (Creative Memory) |
| 15 | [Creative workflow automation](15-creative-workflow-automation.md) | M37, CAPABILITY_MATRIX | pipelines, human checkpoints, quotas |

## Cross-discipline recipes (which domains combine for a job)
Load §11 (decide) and §13 (check) of each listed domain; §14 goes into the critic packet.

| job | domains (lead first) | how they combine |
|---|---|---|
| Thai story carousel (Slowly Growing / story sets) | 06 · 08 · 02 · 07 · 04 · 05 | character voice (06) → short line craft (08) → emotional need, safe wording (02) → continuity (07) → slide reading order (04) → metaphor freshness (05) |
| Story clip with characters | 06 · 07 · 04 · 10 · 02 | + `story-clips/_craft/GUIDE.md` |
| Glasses beat clip / product clip | 04 · 11 · 10 · 03 · 15 | hook + branding (11), reading in 9:16 (04), sound/sync (10), "not generic" (03), pipeline gates (15) |
| Promo image / post | 03 · 04 · 11 · 09 · 05 | |
| Caption / ad copy | 11 · 08 · 09 · 02 | honesty + persuasion (11), rhythm (08), register (09), tone (02) |
| Health / eye message | 11 · 02 · 09 | + `../knowledge/optical/FACT_CHECK_WORKFLOW.md` (mandatory) |
| Festival / cultural content | 09 · 05 · 11 | + `../knowledge/culture/CULTURAL_CHECK.md` |
| Voice-over | 10 · 02 · 06 | + skill `ai-voice-director` |
| New campaign / series concept | 01 · 11 · 06 · 07 · 09 | 3 directions (01), audience (11), cast (06), world (07) |
| Critique of any work | 12 · 13 · + the job's domains | skill `creative-critic` |
| Learning after a job | 14 · 13 | `tools/memory.py`, debrief questions in 14 §6 |
| Automating a repeated job | 15 · 13 · 14 | |

Graph data (domain ↔ module ↔ skill ↔ tool): `../CROSS_DOMAIN_RELATIONSHIPS.json` (nodes `D01`…`D15`).
