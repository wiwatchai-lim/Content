# Visual Arts — deepening track (from the "Advanced Visual Arts & Image Design Mastery" brief, 2026-11-25)

This folder deepens the visual knowledge that already exists. It does **not** replace it:
- Working skill (loaded on image jobs): `.claude/skills/ai-visual-artist/` — palettes 204, lighting 51, compositions 30,
  styles 102, emotion→visual 114, critique engine, tools (`analyze_image`, `inspect_views`, `color_tools`, `score`).
- Craft curriculum (photo, lens, composition, light, storyboard, grade): `story-clips/_craft/curriculum/01–12`.
- Earlier research write-ups: `.claude/skills/ai-visual-artist/research/R1–R4`.

The deep files here are reference material. The skill loads them only when a job needs that depth (see the routing in
`.claude/skills/ai-visual-artist/SKILL.md`).

## Module map (the brief's 18 visual modules → system modules)
| brief module | system module | where the deep file lives | batch |
|---|---|---|---|
| 01 colour science | M09 | ADVANCED_COLOR_SCIENCE.md, COLOR_RELATIVITY.md, COLOR_SCRIPTING.md, color_relationships.json | VA1 |
| 02 value & notan | M07 | VALUE_AND_NOTAN.md | VA1 |
| 03 perspective | M07 | PERSPECTIVE_MASTERY.md, PERSPECTIVE_ERROR_LIBRARY.json | VA1 |
| 04 shots & angles | M18 | CAMERA_ANGLE_LIBRARY.json | VA1 |
| 05 lens optics | M18 | LENS_OPTICS.md, lens_examples.json | VA1 |
| 06 composition | M08 | COMPOSITION_MASTER.md (skill COMPOSITION_LIBRARY.json is extended, not copied) | VA2 |
| 07 lighting | M10 | LIGHTING_PHYSICS.md, light_libraries.json | VA1 |
| 08 edges & detail | M07 | EDGE_CONTROL.md, DETAIL_HIERARCHY.md | VA1 |
| 09 shape language | M07/M15 | SHAPE_LANGUAGE.md | VA1 |
| 10 materials | M10/M34 | MATERIAL_RENDERING.md | VA1 |
| 11 atmosphere | M10 | ATMOSPHERIC_EFFECTS.md | VA1 |
| 12 perception & eye guidance | M04/M05 | VISUAL_PERCEPTION.md, EYE_GUIDANCE.md | VA2 |
| 13 visual development | M07/M16 | VISUAL_DEVELOPMENT.md | VA3 |
| 14 drawing & painting | M07 | skill DRAWING_TECHNIQUES.md (extend) + PAINTING_TECHNIQUES.md | VA3 |
| 15 graphic design & typography | M26 | TYPOGRAPHY_MASTERY.md (skill THAI_TYPOGRAPHY.md stays the Thai rulebook) | VA2 |
| 16 editing & compositing | M35 | IMAGE_COMPOSITING.md | VA2 |
| 17 art criticism & taste | M06/M11 | ART_CRITICISM.md | VA3 |
| 18 experiment lab | M42 | VISUAL_EXPERIMENTS.json + `creative-intelligence/experiments/` | every batch |

## Gap audit (Phase VA0, 2026-11-25)
`_build/audit.py` counts how often each term of the brief appears in 37 existing files → `_audit.json`.
This is only a rough measure. A term listed only once counts as "thin", and a different spelling (e.g. "low-angle"
written instead of "low angle") shows up as missing.

| module | covered / terms | weakest (missing) |
|---|---|---|
| 01 colour | 28/56 | additive/subtractive, CMYK, Munsell, colour relativity, successive contrast, constancy, local/reflected colour, gamut mapping, metamerism, SPD |
| 02 value | 5/21 | value scale, 3/5-value design, value grouping, shadow/light mass, contrast hierarchy, tonal compression |
| 03 perspective | 10/29 | 2/4/5-point, curvilinear, forced/reverse, axonometric, horizon line, station point, picture plane, cone of vision, shadows in perspective |
| 04 shots | 13/31 | high/low angle (as written), worm's eye, reverse, EWS/FS/MWS/cowboy, two/group shot |
| 05 lens | 14/29 | camera distance, depth of focus, chromatic aberration, shutter angle |
| 06 composition | 28/41 | C/Z/L-composition, cruciform, rule of odds, visual mass/tension/flow, directional force, cropping |
| 07 lighting | 25/35 | direct/indirect, fill, back light, form shadow |
| 08 edges | 4/19 | edge hierarchy, line quality, mark making, detail density, selective detail |
| 09 shape | 7/19 | primary/secondary/tertiary shapes, shape rhythm/contrast/hierarchy, positive/negative shapes |
| 10 materials | 25/32 | transparent plastic, IOR, absorption |
| 11 atmosphere | 15/20 | water reflections, sun/crepuscular rays |
| 12 perception | 13/21 | contrast sensitivity, spatial frequency, peripheral/foveal vision |
| 13 visual dev | 7/19 | mood/style board, production/set/prop design, environmental storytelling, mise-en-scène |
| 14 drawing/painting | 10/23 | gesture, blind contour, structural drawing, wet-on-wet, glazing, scumbling, alla prima, grisaille, photobash |
| 15 typography | 12/25 | baseline/hierarchical grid, optical alignment, font pairing, trim, CMYK |
| 16 compositing | 10/26 | dodge & burn, blend modes, frequency separation, restoration, light/colour/reflection matching |
| 17 criticism | 5/12 | comparative analysis, cultural context |
| 18 experiments | 4/8 | fixed seed, comparison sheet |

Strong already: harmony basics, OKLCH/WCAG tooling, key/fill/rim lighting, PBR basics, saliency, thirds-vs-centre
evidence, Thai typography rules.

## Batches (checkpoint in `creative-intelligence/RESUME.md`)
- **VA1** (2026-11-25): colour · value/edges/shape · lighting/materials/atmosphere · perspective/shots/lens.
- **VA2**: composition master + eye guidance/perception + typography mastery + compositing.
- **VA3**: visual development + drawing/painting techniques + art criticism + error library merge + more experiments.

## Image design workflow (scaled to the job)
The brief lists 25 steps. Running all 25 on a simple job wastes time, so the depth depends on the job:
| job | steps |
|---|---|
| quick (re-roll, one quote image in a known style) | purpose → focal point → value check → generate → inspect_views → fix one thing |
| standard (carousel frame, promo scene) | + audience, emotion, reference, composition blueprint, palette, camera + lens, lighting setup |
| full (key visual, new series look, product hero) | all 25: + perspective, shape language, edge and detail hierarchy, materials, atmosphere, lessons logged |
The order matters more than the count: **value and focal point come before colour, and colour comes before rendering detail**.

## Six-view inspection (built 2026-11-25)
`python .claude/skills/ai-visual-artist/tools/inspect_views.py image.png --focal x,y` → a sheet with 6 views
(colour · grayscale · 64-px thumbnail · silhouette/notan · edges + local contrast · technical) and 7 checks (focal
point, value range, value grouping, focal contrast, thumbnail readability, silhouette mass, clipping).
The thresholds are our own working values (DERIVED), not established science. Things it cannot check: perspective,
anatomy, whether a material looks true, emotion, and text legibility. A person (or Claude looking at the sheet)
judges those.
Validated on real images from earlier work: golden-glasses v1 → v4 → v5 scored 0.61 → 0.85 → 1.11 for "focal holds
the strongest saliency", and only v5, the version already judged fixed, passes (experiment VA-000 in VISUAL_EXPERIMENTS.json).

## Scoring
`tools/score.py --profile art_mastery` uses the brief's 11 criteria (composition 15, colour 15, value 10,
perspective 10, light 10, hierarchy 10, material 5, shape 5, emotion 10, taste 5, technical 5). The internal bar is 90.
A critical issue blocks a pass whatever the total, for example breaking the user's instructions or altering a product.
The score is a tool for us to check our own work. It does not measure beauty in general.
