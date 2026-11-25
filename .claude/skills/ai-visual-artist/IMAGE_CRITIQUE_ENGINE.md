# Image Critique Engine

Critique = located, specific, fixable. Never "beautiful / not beautiful". Every issue goes into the job's `critique`
array (VISUAL_QUALITY_SCHEMA.json): **area · where · problem · severity · likely_cause · fix · side_effects**.

## 1. Procedure (in this order — big structure before details)
1. **Read the intent** (job.intent.message + scene objective). Everything is judged against purpose, not taste.
2. **Thumbnail test** — look at it tiny (≈ 150 px) and blurred: is the focal point obvious? does the value pattern
   (3–4 masses) read? Tool: `python tools/analyze_image.py img --overlay o.png` (saliency peaks, balance point, notan inset).
3. **Hierarchy & path** — what is seen 1st, 2nd, 3rd? Does it match `blueprint.viewing_path`? Saliency peaks are a
   model's guess, not eye-tracking [Itti1998]; trust them only as a second opinion.
4. **Composition & balance** — placement vs blueprint, tangents (edges kissing), cut-off limbs at joints, crowding at
   the frame edge, unintended centre split, horizon through a head, dead negative space vs intentional space.
5. **Value & light** — one light logic (direction, temperature, softness consistent on every object), cast + contact
   shadows present, form shading on curved objects, highlights not clipped where detail matters.
6. **Colour** — harmony with the chosen palette, temperature logic (warm light ↔ cool shadow or justified otherwise),
   saturation hierarchy (most saturated = most important), accent used sparingly, contrast/CVD for any text.
7. **Drawing accuracy** — perspective (vanishing points agree, ellipses on the right axis), anatomy (hands, fingers,
   joints, eye alignment, glasses sitting on nose bridge and ears), proportion vs the character bible.
8. **Story & emotion** — does it show the scene objective and subtext? expression + body language agree with the
   emotion id? Is there a visual metaphor and does it read?
9. **Consistency** — character signature features, costume, palette; brand palette/logo rules; product fidelity
   (shape, colour, logo, lens tint identical to the reference photo).
10. **Text & layout** (if any) — legibility at phone size, contrast ≥ 4.5:1 for body text (≥ 3:1 large), Thai
    proofreading (THAI_TYPOGRAPHY.md), safe zones, margins, alignment, kerning of headlines.
11. **Artefacts & finish** — AI tells (melted details, extra fingers, warped glasses, fake text/watermarks, smeared
    patterns, inconsistent reflections in lenses), noise/banding, compression, edge halos on cut-outs, wrong crop.

## 2. Severity
| level | meaning | examples |
|---|---|---|
| critical | the image fails its purpose or cannot be published | product altered, misspelt Thai text, wrong character, extra fingers on the focal hand, brand colour wrong, text unreadable |
| major | clearly weakens the message or quality | focal point not the most salient, competing light directions, flat values, cluttered background behind the subject |
| minor | noticeable to a trained eye | tangent, slightly busy corner, accent colour repeated too often |
| polish | taste-level improvements | add rim light separation, soften one edge, 2% crop |

## 3. Issue patterns (problem → likely cause → fix → side effects)
| problem | likely cause | fix | watch for |
|---|---|---|---|
| subject not where the eye goes | brighter/more saturated/sharper element elsewhere | darken/desaturate/blur the competitor, raise contrast at the subject | mood shift if you darken too much |
| image feels flat | values bunched in the middle | set a value plan (lightest light next to darkest dark at the focal point), add a backlight/rim | over-contrast looks harsh in soft styles |
| muddy colours | complementary mixing in shadows, too many hues | limit to the palette, keep shadows in one temperature family | lose richness — add one accent back |
| "AI look" | over-smooth skin, symmetric clutter, generic lighting | ask for texture & imperfection, real lens/light terms, simplify the set | grain can fight text legibility |
| glasses wrong (bent, extra bridge, lens missing) | models struggle with thin symmetric objects | composite the real cut-out; or img2img from the photo; or Codex `-i` | lighting mismatch → match direction & add contact shadow |
| hands broken | known model weakness | hide/crop hands, simpler pose, regenerate only the region (inpaint), or redraw | pose change alters the story beat |
| text artefacts / fake watermark | model hallucination | "no text" constraint; inpaint; crop | inpaint smear |
| character drift across frames | text-only identity | reuse master image, fixed palette, rig | — |
| safe-zone collision on 9:16 | focal point/text in the top 11 % or bottom 22 % | move subject or text up/down; recompose | crop may cut heads |

## 4. Score
`python tools/score.py job.json [--profile …]`. Rate each of the 10 criteria 0–10; profiles re-weight for purpose:

| criterion | default | product_ad | story_frame | character_sheet | social_post_text | key_visual | infographic |
|---|---|---|---|---|---|---|---|
| composition | 15 | 12 | 15 | 8 | 12 | 15 | 12 |
| color_harmony | 10 | 10 | 8 | 8 | 8 | 12 | 8 |
| lighting | 10 | 12 | 10 | 5 | 6 | 12 | 2 |
| visual_hierarchy | 10 | 15 | 10 | 5 | 22 | 12 | 25 |
| emotional_impact | 15 | 8 | 20 | 7 | 10 | 15 | 3 |
| storytelling | 10 | 5 | 20 | 5 | 7 | 8 | 10 |
| art_style | 10 | 6 | 7 | 20 | 7 | 8 | 5 |
| technical_accuracy | 10 | 20 | 5 | 30 | 15 | 6 | 25 |
| originality | 5 | 4 | 3 | 7 | 5 | 8 | 2 |
| finishing | 5 | 8 | 2 | 5 | 8 | 4 | 8 |

Default = the brief's weights. Pass = total ≥ 90 **and** no critical issue (internal bar). The rater is recorded:
`claude` scores are judgements, not proof that people will like the image — when possible, A/B test with real
viewers (two versions to the user/friends or as two posts) and record the result in CHANGELOG.md.

## 5. Fix loop
1. Sort issues (critical → polish; focal-point issues first).
2. Change **one** thing per iteration (prompt sentence, seed, crop, composite, colour grade) so the good parts stay.
3. Prefer the cheapest fix: crop/grade/composite in HTML → img2img on FLUX → new FLUX seed → prompt rewrite → Codex.
4. Re-run analyze_image.py + re-score; keep the better version; stop at pass or when fixes stop improving (log why).
