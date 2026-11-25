# Visual Arts deepening — brief add-on (batch VA1, 2026-11-25)

Read `creative-intelligence/schemas/RESEARCH_BRIEF.md` first: its hard rules, tiers and the sources.json record
format all apply. This add-on changes only what is listed here.

## Context
The shop already has a visual skill and a curriculum. **Deepen, don't repeat.** Before writing, skim the existing
files named in your task. Coverage audit (term mentions, a rough proxy): `knowledge/visual-arts/_audit.json` —
look up your modules' `missing` and `thin` lists; those are your priorities.

The shop's images: eyewear product shots (metal / acetate / TR90 frames, glass and polycarbonate lenses, AR and
mirror coatings), Thai story carousels in charcoal / pencil line-art (Mint & Tao, faceless), cinematic promo scenes
made with FLUX schnell (local) or Codex, 2D puppet story clips (HTML), IG 1:1 and 9:16.

## Duplicate check (do this before adding a source)
`python creative-intelligence/tools/registry.py stats` shows the counts. To see whether a source is already in the
registry: `grep -i "<distinctive title words or DOI>" creative-intelligence/SOURCE_REGISTRY.json`. If it is there, do not
add it again unless you really read new content from it; then add a record with the same key and the suffix `_va`,
and say in `limitations` which record it extends.

## Per topic, write these fields (a compact table is fine for minor terms)
Definition · foundation (science **or** artistic convention — label which) · practical explanation · a visual example
described in words (for our work if possible) · correct use · incorrect use · exceptions · emotional use ·
technical use · common mistakes · source keys · evidence tier · confidence.

Labels on every rule: **EVIDENCE** (peer-reviewed / standard / physics), **CRAFT** (practitioner convention),
**DERIVED** (our own inference from evidence — say from what).

## Libraries
Only real, distinct entries. Each entry: `id`, `name`, `purpose`, `how` (concrete settings / placement), `limits`,
`use_for` (our job types), `source_keys`, `test_status: "untested"` (nothing here has been generated yet).
Never pad to reach a number; never rename an existing entry to count it twice. Check ids already used in
`.claude/skills/ai-visual-artist/*_LIBRARY.json` (python one-liner) and don't reuse them.

## Where to write
Only into `creative-intelligence/knowledge/visual-arts/`, using the file names in your task. Your sources go in
`sources_<your-tag>.json` (a JSON array, same record format). `modules` uses the existing ids:
M07 art fundamentals, M08 composition, M09 colour, M10 lighting, M18 cinematography, M26 graphic design,
M34 computer graphics, M35 computer vision, M04 cognitive science, M05 neuroaesthetics, M06 aesthetics.
Do not edit any other file. Validate every JSON you write with Python before you finish.

Target 35–45 sources for your task, honest access_status. Final reply: 5–10 lines — files, sources by tier and
access_status, biggest gaps, anything you could not reach.
