# Image Prompt Engine — the 15-step process

A prompt is the *last* step of art direction, not the first. Steps 1–9 fill the Visual Job
(VISUAL_QUALITY_SCHEMA.json); step 10 is `tools/build_prompt.py`; steps 12–15 are IMAGE_CRITIQUE_ENGINE.md.

| # | step | output | load |
|---|---|---|---|
| 1 | Analyse user intent | intent.purpose / audience / message (one sentence the viewer must get in 2 s) / CTA | — |
| 2 | Analyse references | references[] with role + locked_details; describe each (subject, light, palette, composition) | REFERENCE_DATABASE.json for licensed study refs |
| 3 | Creative direction | concept + visual metaphor; 2–3 alternatives considered, one chosen and why | VISUAL_STORYTELLING.md |
| 4 | Emotional direction | emotion id + intensity; pick one *approach* from the library entry (never the only one) | EMOTION_VISUAL_LIBRARY.json (one entry) |
| 5 | Art style | style id + why it fits purpose/audience/brand | ART_STYLE_LIBRARY.json (one entry) |
| 6 | Composition blueprint | composition id, focal points, viewing path, balance, placement, depth layers, negative space (where text goes), crop, aspect, camera, value plan | COMPOSITION_LIBRARY.json, ART_FUNDAMENTALS.md |
| 7 | Palette | palette id or custom hexes + proportion; contrast for text; CVD | COLOR_PALETTE_LIBRARY.json, COLOR_THEORY.md, `tools/color_tools.py` |
| 8 | Lighting | lighting id, key direction, quality, K, motivation | LIGHTING_LIBRARY.json |
| 9 | Character & environment | character bible ids (locked features), environment description with scale & depth cues | CHARACTER_BIBLE_TEMPLATE.md, ENVIRONMENT_DESIGN.md |
| 10 | Generate prompt | provider-specific prompt; validate | `validate_job.py`, `build_prompt.py` |
| 11 | Generate | FLUX free (2–4 seeds) / Codex after asking / HTML render | IMAGE_PROVIDER_ADAPTERS.md |
| 12 | Analyse output | `analyze_image.py --overlay` + look | IMAGE_CRITIQUE_ENGINE.md |
| 13 | Identify problems | critique[] located with severity | same |
| 14 | Refine | one change per iteration, cheapest fix first | same §5 |
| 15 | Validate final | score ≥ 90 + no critical; text/brand/product checks; export sizes | `score.py`, GRAPHIC_DESIGN.md |

## Prompt anatomy (text-to-image, natural language)
1. **Medium & style traits** (not names): "Soft graphite pencil drawing on aged cream paper, fine cross-hatching…"
2. **Subject + action + emotional read**: who, doing what, showing what feeling through body and face.
3. **Composition & camera**: shot size, angle, lens, placement ("the boy small in the lower-left third"), depth of field.
4. **Setting & depth layers**: foreground / midground / background with scale cues.
5. **Light**: source, direction, quality, colour temperature, motivation ("a single warm desk lamp from the right").
6. **Palette & value**: dominant / secondary / accent, overall key.
7. **Texture & finish**: paper grain, film grain, brush texture, material detail.
8. **Constraints, positively phrased**: "no text anywhere", "empty clear sky in the top third", "hands relaxed".
Rules: subject first; one idea per sentence; concrete nouns over adjectives ("tortoiseshell acetate frame" not
"beautiful glasses"); avoid stacking 10 quality words ("masterpiece, 8k…") — they add little for T5-based models and
are community habit, untested [Oppenlaender2023]; FLUX schnell reads ≤ 256 T5 tokens and follows plain sentences best [BFL-FluxSchnellCard, HF-DiffusersFlux]; seeds matter more than glue words — try 3–9 seeds before rewriting [LiuChilton2022]; no living artists, studio brands or franchises (validate_job.py
blocks them); Thai text never inside the generated image.

## Template slots used in EXAMPLES.md
`{subject} {action} {emotion_read} {style_traits} {composition} {shot} {angle} {lens} {setting} {fg} {mg} {bg}
{light} {palette} {texture} {negative_space} {constraints}` — EXAMPLES.md holds 200+ templates with these slots.

## Sequences (carousels, comic strips, storyboards)
Write a **sequence sheet** first: per frame — beat, emotion id & intensity curve, shot size progression (wide →
medium → close for intimacy; reverse for reveal), screen direction (keep left/right consistent: 180° rule), colour
script (palette shift across frames), repeated anchors (same prop, same character features). Then one job per frame
sharing palette, style, character masters and seed family. VISUAL_STORYTELLING.md has the patterns.
