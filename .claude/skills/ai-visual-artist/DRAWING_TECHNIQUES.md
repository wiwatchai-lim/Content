# Drawing Techniques

Practical drawing knowledge for directing and critiquing images (human-drawn, rig-drawn or AI-generated). Most of it is
craft from art teaching [Artistic]; perception findings are tagged. Fundamentals → ART_FUNDAMENTALS.md.

## 1. Gesture → construction → contour → detail
1. **Gesture / line of action** — one flowing line for the whole pose (C, S or straight), drawn in seconds; it holds
   the energy [craft: Nicolaides1941 (secondary), Loomis1943 (bibliographic)].
2. **Construction** — boxes, cylinders, spheres for masses; the head as sphere + jaw plane (Loomis method); ribcage
   and pelvis as two tilted masses; check their tilt against the line of action.
3. **Contour** — draw the form-defining edges (silhouette, overlaps, creases); not shadow outlines [finding: Cavanagh2005].
4. **Detail last** — only where the focal point is.
AI use: describe the pose by its action and line ("leaning forward, one hand reaching toward the bird, weight on
the left foot") rather than "dynamic pose".

## 2. Proportion (human figure)
| canon | heads tall | use |
|---|---|---|
| realistic average adult | 7–7.5 | documentary, product lifestyle |
| idealised / fashion / heroic | 8–9 | fashion illustration, key visuals |
| teen / stylised | 6–7 | webtoon, modern cartoon |
| cartoon / storybook | 3–5 | this project's SVG rig (~3.5) |
| chibi / kawaii | 2–2.5 | mascots, stickers |
[craft: Proko-Proportions, Loomis1943 (bibliographic)]. Landmarks (realistic adult): eyes at half of the head height;
shoulders ≈ 2 head widths (male) / ≈ 1.5–1.75 (female); elbow at waist; wrist at hip/crotch; fingertips mid-thigh.
Keep the chosen canon fixed across a series (CHARACTER_BIBLE_TEMPLATE.md).

## 3. Anatomy checkpoints (where AI images fail most)
- **Hands:** 4 fingers + thumb; thumb from the side of the palm; finger length steps; knuckles in an arc. Hide or
  simplify hands when not the subject; crop at the wrist, never at a knuckle.
- **Face:** eyes on one line, one eye-width apart; nose base ≈ halfway brow-to-chin; ears between brow and nose base.
- **Glasses on a face:** bridge sits on the nose (not floating), temples reach the ears at eye level, both lenses
  the same size and shape, the far temple partly hidden in 3/4 view, lens reflections consistent with the light.
- **Joints:** never crop at elbows, knees, wrists, ankles (looks amputated) [craft].
- **Weight:** the centre of gravity over the supporting foot; shoulders and hips tilt opposite (contrapposto).

## 4. Perspective
- **Linear perspective**: horizon = eye level; parallel lines converge to vanishing points on the horizon (1-, 2-, 3-point);
  historical origin in Renaissance Florence (Brunelleschi demonstration, Alberti's treatise) [finding: Smarthistory-Perspective].
- Viewers tolerate viewing from many positions, but wide-angle edges distort — keep faces/frames away from corners in
  wide shots [finding: Kubovy1986 (secondary)].
- **Ellipses**: circles in perspective (lens rims, cups) — minor axis points along the cylinder's axis; ellipses get
  rounder further from the horizon.
- **Foreshortening**: overlapping forms + size change along depth; use overlap (near form overlaps far form) and
  shorten lengths; strong foreshortening = drama (low/wide angles).
- AI use: state camera height and lens ("eye level, 35mm lens"); check vanishing lines of shelves/counters in critiques.

## 5. Value & light on form
Light family vs shadow family; core shadow at the terminator; reflected light inside the shadow (darker than any
light); cast shadow darkest at the contact point (occlusion); highlight on glossy surfaces only [finding for contact
shadows/occlusion: Zhukov1998, Landis2002; rest craft]. Keep shadows transparent and darker than surroundings even
when stylised [finding: Cavanagh2005]. Plan a notan (2–3 values) first [craft: Dow1899].

## 6. Edge control
Hard edges attract attention and define planes facing away from light; soft edges for turning forms, atmosphere,
distance; lost edges where shapes merge (value match) — lose edges away from the focal point, keep the sharpest
edge at the focal point [craft]. Texture/stroke-direction change can separate edges without extra contrast
[finding: Julesz1981].

## 7. Rendering materials (and eyewear)
| material | diffuse | specular / reflection | tip |
|---|---|---|---|
| acetate (plastic frames) | base colour visible | weak, white highlights, stronger at grazing angles (Fresnel) | one clean highlight per rim + base colour; tortoiseshell needs translucency |
| metal (titanium, gold, steel) | almost none | strong, tinted by the metal; mirrors the surroundings | describe what it reflects; gold = warm tint; titanium = cool grey |
| lens glass | transparent | white reflections; anti-reflective coats reduce them, leaving faint green/purple residual tint | transparency reads through background edges continuing behind the lens; any plausible reflection works [finding: Cavanagh2005] |
| skin | warm, translucent | soft sheen | subsurface scattering — soft terminator, warm edge glow; its absence = plastic AI skin [finding: Jensen2001] |
| fabric | matte, texture | low; velvet edge sheen | folds follow tension points |
[finding for dielectric vs metal reflection: Schlick1994, Burley2012, PBRT4; gloss perception: Fleming2014.]

## 8. Atmospheric (aerial) perspective
Distance → lower contrast, lighter/greyer, bluer (clear air, Rayleigh) or whiter (haze/fog, Mie) [finding: OShea1994,
HyperPhysics_Scattering, Britannica-AerialPerspective]. Leonardo described it in his notes; landscape painters use it
systematically. Use it to separate layers even indoors (smoke, dust, lamp haze).

## 9. Stylisation choices (simplify on purpose)
Decide per style: line or no line, number of values (cel: 2; painterly: 5+), physics level (cel/flat styles drop
fall-off and GI on purpose) [Artistic]. Consistency inside one image matters more than realism.
