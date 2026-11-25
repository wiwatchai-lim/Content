# M44 Cartoon, Comics & Illustration (batch C1, 2026-11-25)

The user asked to learn every cartoon style ("เรียนเลย ทุกแนว"). This is general knowledge for any client or topic.
Mint & Tao and TIME OPTIC appear only as examples.

| need | file |
|---|---|
| character design per style: proportions, eyes, cuteness, exaggeration, expression sheets, turnarounds, casts | CHARACTER_DESIGN_CARTOON.md + character_style_specs.json (14 style cards) |
| line, inking, cel shading, flat or vector, textures, cartoon backgrounds | CARTOON_RENDERING.md + rendering_recipes.json (32 recipes: HTML/SVG build + FLUX prompt) |
| comics, manga, webtoon, strips, carousel comics, LINE stickers, speech balloons, Thai SFX words | COMICS_AND_SEQUENTIAL_ART.md + panel_layouts.json (34 layouts) |
| generating cartoons with our AI tools and keeping one character consistent | AI_CARTOON_GENERATION.md (`ai_tests` T1–T9) |
| style history and taxonomy, mapped to ART_STYLE_LIBRARY ids, plus 9 proposed new styles | CARTOON_STYLE_HISTORY.md |
| sources | sources_character / _render / _comics / _ai .json (120 sources) |

Existing knowledge this links to, not copied: `.claude/skills/ai-visual-artist/` (CHARACTER_DESIGN, ART_STYLE_LIBRARY with
about 30 cartoon-like styles), `story-clips/_craft/curriculum/06-2d-animation.md`, `knowledge/visual-arts/SHAPE_LANGUAGE.md`,
`knowledge/acting/POSE_LIBRARY.json`.

## What our own tests showed (VISUAL_EXPERIMENTS.json)
- **C1-001:** in FLUX schnell, style names alone ("anime", "webtoon", "chibi") barely change the picture; the model's
  default "cute sticker" look wins. Concrete traits do change it: outline weight, crayon texture, black-and-white ink.
- **C1-002:** describing traits instead of names fully fixed 1 of 4 styles and partly fixed 3. Black and white works
  only when no colour word is left in the prompt. FLUX ignores exact proportions such as "head as big as the body".
- **Consequence:** for a precise or repeatable cartoon character, draw it in HTML/SVG (rig.js) or start from an approved
  image (img2img). FLUX Redux and IP-Adapter for FLUX are FLUX-dev models under a non-commercial licence, so they cannot be
  used for client or shop work (AI_CARTOON_GENERATION.md).
- **C1-003 (turnaround):** 3 separate images with the same seed gave 9/9 correct views. A sheet in one image was usable only 1 time in 3 (a floating head, a duplicated front view).
