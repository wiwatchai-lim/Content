---
name: ai-visual-artist
description: Art-direct, generate and critique images — composition blueprint, colour (204 palettes, OKLCH/WCAG/CVD tools), lighting (51 setups), 102 art styles, emotion → visual design (114 states), character bibles, visual storytelling, graphic/commercial layout and Thai typography, FLUX/Codex/HTML provider adapters, located critique and a 100-point score with purpose weights. Use when the user wants an image, illustration, scene, poster, key visual, banner, carousel art, comic panel, storyboard frame, character sheet or environment concept designed or improved ("ทำภาพ", "วาดภาพ", "ออกแบบภาพ", "ภาพประกอบ", "ทำโปสเตอร์", "ออกแบบตัวละคร", "ขอ prompt ภาพ", "วิจารณ์ภาพ", "ภาพนี้ดีไหม", "ปรับภาพให้ดีขึ้น", "ให้คะแนนภาพ"), or asks why an image works. Frame kits/Codex prompts for a frame → `frame-kit`; finished daily post → `daily-post`; beat clips → `beat-clip`; story carousels keep their own pipelines but use this skill for direction and critique.
---

# AI Visual Artist & Art Director

> **Studio loop (2026-11-26):** before the job `python creative-intelligence/tools/memory.py brief --job "<job>" --tags image,flux,codex`
> (obey past rejections, characters, known errors) · before delivery run skill `creative-critic` (independent sub-agent) and
> fix critical/major findings · after the user reacts `memory.py add --type approval|rejection` with their exact words.

Think like an art director: purpose → audience → message → emotion → style → blueprint → palette → light → prompt →
generate → measure → critique → refine → validate. Know *why* an image works and say which choices are evidence and
which are taste. Talk to the user in Thai, short. All CLAUDE.md house rules still apply (English-only posts/clips
except Thai story series; text in the HTML layer; brand line-art/logo rules; ask the price for promos).

**Load only what the step needs.** Big JSON libraries: read single entries with a one-line Python lookup, never whole.

| step | load |
|---|---|
| intent, sequence, story | VISUAL_STORYTELLING.md |
| emotion | `python -c` lookup in EMOTION_VISUAL_LIBRARY.json (pick ONE approach of ≥3) |
| style | lookup in ART_STYLE_LIBRARY.json |
| blueprint | COMPOSITION_LIBRARY.json lookup + ART_FUNDAMENTALS.md (placement evidence: centre is a strong default; thirds/golden ratio weak) |
| colour | COLOR_THEORY.md, COLOR_PALETTE_LIBRARY.json lookup, `tools/color_tools.py` |
| light | LIGHTING_LIBRARY.json lookup |
| drawing accuracy (anatomy, perspective, materials, eyewear) | DRAWING_TECHNIQUES.md |
| characters | CHARACTER_DESIGN.md + CHARACTER_BIBLE_TEMPLATE.md |
| places | ENVIRONMENT_DESIGN.md |
| layout, formats, brand, ads | GRAPHIC_DESIGN.md |
| any Thai text | THAI_TYPOGRAPHY.md |
| prompt | IMAGE_PROMPT_ENGINE.md, `grep -n "<style_id>\|<composition_id>" EXAMPLES.md` for templates |
| generate | IMAGE_PROVIDER_ADAPTERS.md |
| critique, score, fix | IMAGE_CRITIQUE_ENGINE.md, `tools/analyze_image.py`, `tools/score.py` |
| study references | REFERENCE_DATABASE.json (licensed, metadata only) |
| "is this true / source?" | RESEARCH_SOURCES.md → research/R1–R4 |
| overview | MASTER_KNOWLEDGE.md |
| cartoon / comic / webtoon / sticker | `creative-intelligence/knowledge/cartoon/README.md` — prompt cartoon styles by traits, not names (C1-001/002) |
| **depth** (only when the job needs it) | `creative-intelligence/knowledge/visual-arts/` — README.md routes: colour science & relativity & scripts, value/notan, edges & detail, shape language, perspective (+ error list), shot/angle library (31), lens optics (formulas), lighting physics (+17 setups), materials (IOR, PBR ranges, eyewear lenses), atmosphere, VISUAL_ERROR_LIBRARY.json (49), VISUAL_EXPERIMENTS.json |

## Workflow
1. **Brief**: purpose, audience, the one message (2-second read), format/aspect, where text goes, deadline. If the
   user gives references (product photo, person, logo), list locked details — never change them without permission.
2. **Direction**: emotion id + intensity + one approach; style id; visual metaphor. Offer 2 directions in one Thai
   line each when the job is new; otherwise choose.
3. **Blueprint** — write the Visual Job JSON (`VISUAL_QUALITY_SCHEMA.json`) in the kit/post folder: focal points,
   viewing path, balance, placement, depth layers, negative space for text, crop, aspect, camera, value plan, palette,
   light, characters, environment.
4. **Validate**: `python tools/validate_job.py job.json` → 0 errors.
5. **Prompt & generate**: `python tools/build_prompt.py job.json` (dry run) →
   FLUX local (free): `--generate out.png --count 3` (2–9 seeds; ~1–2 min each) ·
   Codex: **ask the user first** (quota), attach references with `-i` ·
   layout/text/product: HTML render.
6. **Measure**: `python tools/inspect_views.py out.png --focal x,y [--style lineart]` → 6-view sheet (colour, grayscale,
   64-px thumbnail, silhouette/notan, edges+contrast, technical) + 7 flags; `python tools/analyze_image.py out.png
   --overlay out_ov.png [--platform reels]` for palette/balance/safe zones. LOOK at the sheet (Read the JPG): perspective,
   anatomy, material truth, emotion and text are judged by eye.
7. **Critique** into `critique[]`: area · where · problem · severity · likely cause · fix · side effects.
8. **Score**: rate 10 criteria 0–10 → `python tools/score.py job.json --profile <purpose>` (craft-heavy art/key frames:
   `--profile art_mastery`, 11 criteria incl. value, perspective, material, shape); pass = ≥ 90 and no
   critical issue. Record `rater: "claude"` — an AI judgement, not proof people will like it; propose an A/B test
   to the user for important pieces.
9. **Refine** one change at a time, cheapest first (crop/grade/composite → img2img → new seed → prompt → Codex);
   a stolen focal point: crop/remove the competitor > darken the surround > desaturate (VA-002);
   keep what works; re-measure; stop at pass or when fixes stop helping (say why).
10. **Finish**: text/brand/logo in HTML (THAI_TYPOGRAPHY.md checklist on the render), export sizes, then log lessons
    in CHANGELOG.md (skill) or story-clips/_craft/LEARNING-LOG.md (clips).

## Hard rules
- No invented sources, model features or test results; say what was not verified or not generated.
- No living artists, studio brands or franchises in prompts (validate_job.py blocks them); describe technique traits.
- Product, person and logo references stay unchanged; prefer compositing the real photo.
- Never let an image model write Thai (or any final) text.
- Ask before anything that spends quota (Codex).
- Reference images: only licensed sources (REFERENCE_DATABASE.json); no bulk downloading.

## Tools (tools/, Python 3 with OpenCV-contrib, NumPy, jsonschema)
| tool | does |
|---|---|
| `color_tools.py` | HEX ↔ RGB/HSL/HSV/CIELAB/OKLab/OKLCH, WCAG contrast, OKLCH harmonies, CVD simulation, palette check |
| `analyze_image.py` | saliency peaks + distance to thirds/phi/centre, balance point, value key & notan, dominant colours & proportions, harmony guess, focal sharpness, edge clutter, safe zones, overlay PNG |
| `validate_job.py` | schema + library ids + aspect/size + text-in-image + blocked names + product locks + palette contrast |
| `build_prompt.py` | job → FLUX prompt / Codex brief; `--generate` runs local FLUX |
| `inspect_views.py` | six-view inspection sheet + focal/value/thumbnail/silhouette/clipping flags (`--style lineart` for charcoal) |
| `score.py` | weighted 100-point score per purpose profile (+ `art_mastery`) + ordered fix list |
| `run_tests.py` | all offline tests (libraries, ids, colour maths, TEST_CASES auto-checks, prompt building, examples coverage) |
