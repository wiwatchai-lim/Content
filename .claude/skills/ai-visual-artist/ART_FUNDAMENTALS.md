# Art Fundamentals — elements, principles, perception

Each entry: **What** · **Why it works (perception)** · **How** · **Good** · **Bad** · **Fix** · **Break it when** ·
**For AI generation** · **Refs**. Tags: [finding: keys] research (RESEARCH_SOURCES.md, research/R1 & R2);
[craft] = Artistic practice. Rules are tools chosen by the image's purpose — never formulas.

---
## A. Elements

### 1. Line
- **What:** a mark with direction and weight; contour (outer edge), interior contour (folds, rims), gesture line, implied line (gaze, pointing, alignments).
- **Why:** contours that define form (silhouette, occluding edges, creases) carry most shape information; viewers read line drawings as easily as photos for object recognition [finding: Cavanagh2005].
- **How:** vary weight — thicker on the shadow side, at overlaps and near the viewer; thinner in light and distance [craft]. Use implied lines (eye direction, arms, roads) to steer the eye.
- **Good:** a charcoal figure whose heavy outline is only on the shadow side; light silhouette edge on the lit side.
- **Bad:** even, wire-like outline everywhere ("colouring-book" look); outlines around shadow shapes.
- **Fix:** taper and break lines; drop lines inside light areas; draw only form-defining contours.
- **Break it when:** flat graphic/vector styles want uniform weight; one-line drawing style.
- **AI:** ask for "varied line weight, thicker in shadow, tapered strokes, lost-and-found edges"; avoid "clean outline" for painterly styles.
- **Refs:** Cavanagh2005, Nicolaides1941 [craft], Getty-Elements.

### 2. Shape & form
- **What:** shape = 2D area; form = shape turned 3D by light (value modelling), overlap and perspective.
- **Why:** the visual system groups regions into figure vs ground; lower and convex regions tend to read as figure [finding: Vecera2002, Wagemans2012].
- **How:** design big simple shapes first (silhouette), then secondary, then detail (big-medium-small variety) [craft]. Shape language: circles friendly/soft, squares stable/reliable, triangles dynamic/dangerous [craft, animation practice — CHARACTER_DESIGN.md].
- **Good:** glasses read as two clear lens shapes even in silhouette.
- **Bad:** equal-size shapes evenly spaced; silhouette that merges with the background.
- **Fix:** vary sizes (one dominant), overlap to create depth, separate silhouette by value.
- **Break it when:** pattern-based design (repetition_rhythm) wants equal units on purpose.
- **AI:** describe silhouette and dominant shape ("a tall narrow figure, a wide round lamp shade"); models default to busy medium-size clutter — ask for "simple large shapes, uncluttered".
- **Refs:** Wagemans2012, Vecera2002, Arnheim1974 (bibliographic).

### 3. Value (light–dark)
- **What:** lightness independent of hue; the structure that carries form, depth and focus.
- **Why:** form and depth are processed mainly through luminance; equiluminant colour flattens and edges shimmer [finding: Dupree2003 (Livingstone2002)]; gaze goes to local contrast [finding: Itti1998, Parkhurst2002].
- **How:** plan a 2–4 value **notan** (big masses) before detail [craft: Dow1899 tradition]; put the lightest light next to the darkest dark at the focal point; group values (don't scatter).
- **Good:** subject in light against a mid-dark ground; background held within 2 values.
- **Bad:** everything mid-grey; equal contrast everywhere; hero separated only by hue.
- **Fix:** greyscale check (`analyze_image.py` notan inset); darken/lighten masses; add rim light.
- **Break it when:** high-key / low-key moods deliberately compress values; fog scenes.
- **AI:** say the key and the value plan ("mostly dark with a bright pool of light on the counter"); models over-light everything — ask for "deep shadows, limited light".
- **Refs:** Livingstone2002 (bibliographic), Dupree2003, Itti1998, Parkhurst2002.

### 4. Colour
- See COLOR_THEORY.md (hue, chroma, value; harmony; temperature; context; accessibility).

### 5. Texture
- **What:** surface quality — actual (paper, canvas) or implied (painted fur, metal).
- **Why:** texture differences segment regions preattentively (stroke direction, density) [finding: Julesz1981]; natural images and artworks share multi-scale statistics — flat, textureless surfaces look artificial [finding: GrahamRedies2010].
- **How:** richest texture on the subject or the place you want examined; calmer texture behind it; a texture change behind the subject separates it [craft from Julesz1981].
- **Bad:** uniform grain everywhere; plastic-smooth AI surfaces.
- **Fix:** add multi-scale texture, vary by area; reduce it where text sits.
- **Break it when:** flat vector / minimal styles.
- **AI:** name the material and its micro-detail ("matte acetate with faint polish marks", "cold-press watercolour paper grain").
- **Refs:** Julesz1981, GrahamRedies2010.

### 6. Space & depth
- **What:** the illusion of 3D space and the use of empty (negative) space.
- **Why:** depth is built from stacked cues — occlusion, relative size, height in field, texture gradient, aerial perspective, linear perspective; cues that agree strengthen depth [finding: CuttingVishton1995, OShea1994].
- **How:** at least two agreeing cues; foreground/midground/background layers; lower contrast + cooler/greyer in the distance [finding: OShea1994, Britannica-AerialPerspective].
- **Bad:** everything at the same contrast and sharpness → flat; conflicting cues (far object sharper and darker).
- **Fix:** haze the distance, overlap planes, scale cues (people, doors).
- **Break it when:** flat design, ukiyo-e/mural flatness, poster graphics.
- **AI:** "foreground X out of focus, subject in the midground, distant Y softened by haze".
- **Refs:** CuttingVishton1995, OShea1994, Smarthistory-Perspective.

---
## B. Principles

### 7. Balance
- **What:** the felt equilibrium of visual weight around the frame centre (symmetrical, asymmetrical, radial).
- **Why:** viewers judge balance around the centre; preference rises with balance then plateaus — perfect symmetry is not needed [finding: Locher1998, McManus1985, WilsonChatterjee2005]; balance is judged globally (grouping, structure), not by summing areas [finding: Gershoni2011].
- **How:** weight grows with size, contrast, saturation, isolation, faces/text and distance from centre [craft]; counter a big quiet mass with a small strong accent.
- **Good:** product left-of-centre balanced by a small bright highlight on the right.
- **Bad:** all weight in one corner without intent.
- **Fix:** move/scale elements; `analyze_image.py` balance point (aim near centre unless tension is wanted).
- **Break it when:** unease, tension, falling, loneliness (intentionally_unbalanced).
- **AI:** models centre by default — that is often fine (see 8); for asymmetry give explicit placement or crop afterwards.
- **Refs:** Locher1998, McManus1985, WilsonChatterjee2005, Gershoni2011, Arnheim1974 (bibliographic).

### 8. Placement (centre, thirds, golden section)
- **What:** where the subject sits in the frame.
- **Why:** viewers prefer a single object at the centre; the rule of thirds' predicted preference peaks were not found; off-centre subjects should face into the frame (inward bias) [finding: Palmer2008, PalmerLab-Spatial]. High-rated photos/paintings follow thirds no more than others [finding: Amirshahi2014]. Golden-ratio preference evidence is weak/mixed [finding: McManus1980, Green1995].
- **How:** centre for a single hero (product, icon, symmetric shots); off-centre when there is a second element, a direction of gaze/motion, or text space; place things where they live (hanging high, supported low) [finding: PalmerLab-Spatial].
- **Bad:** pushing a lone product onto a thirds point with nothing balancing it; subject facing out of frame.
- **Fix:** centre it, or add a counterweight/headroom/lead room on the facing side.
- **Break it when:** a subject looking out of frame to show escape, isolation or an off-screen threat.
- **AI:** thirds/golden spiral words are weakly followed — use explicit placement words, layout init images, or crop.
- **Refs:** Palmer2008, PalmerLab-Spatial, Amirshahi2014, McManus1980, Green1995, Tyler1998.

### 9. Emphasis / focal point / contrast
- **What:** the one place the eye should land first.
- **Why:** attention goes to local contrast in value, colour, orientation and to faces/people and meaning [finding: Itti1998, Parkhurst2002, Massaro2012, Henderson2003]; centre bias exists regardless of content [finding: Tatler2007].
- **How:** make the focal point the maximum of contrast (value, saturation, sharpness, detail, isolation); lower everything else; lead with lines and gazes; faces pull attention — point them toward the product.
- **Bad:** two equal focal points; a bright distraction in a corner; a model's face stealing attention from the glasses.
- **Fix:** knock back competitors; sharpen/brighten the hero; redirect gaze.
- **Break it when:** "where's Waldo"/pattern images, crowd scenes meant to be explored.
- **AI:** describe what is sharp, bright and saturated, and what is soft and muted.
- **Refs:** Itti1998, Parkhurst2002, Massaro2012, Henderson2003, Tatler2007, Nodine1993.

### 10. Hierarchy & viewing path
- **What:** the order of reading: 1st, 2nd, 3rd.
- **Why:** scan paths depend on task and knowledge, and cannot be predicted exactly; untrained viewers look at central foreground figures [finding: Yarbus1967 (bibliographic), Tatler2010, Greene2012, Nodine1993].
- **How:** design one clear hero, a secondary element, then detail; in layouts, size + contrast + position (top/left in Thai and English reading) [craft; NN/g patterns in GRAPHIC_DESIGN.md].
- **Bad:** headline, product and model all the same weight.
- **Fix:** scale steps (≥1.5× between levels), value steps, space.
- **AI:** generated images carry the picture hierarchy; text hierarchy is built in the HTML layer.
- **Refs:** Tatler2010, Greene2012, Quiroga2011, Nodine1993.

### 11. Unity & grouping (Gestalt)
- **What:** proximity, similarity, common fate, continuity, closure, figure-ground make parts read as wholes.
- **Why:** classic and modern Gestalt research [finding: Wertheimer1923, Wagemans2012].
- **How:** cluster related items, separate unrelated with space; give variants one shared treatment (same frame, light, palette).
- **Bad:** carousel slides with different light/palette for the same story.
- **Fix:** shared palette, style, character masters, consistent margins.
- **Refs:** Wertheimer1923, Wagemans2012.

### 12. Rhythm, repetition, pattern
- **What:** recurring elements with interval; a break in the pattern becomes a focal point.
- **Why:** grouping by similarity and continuity; an odd element in a repeated field pops out [finding: Wagemans2012; Julesz1981 for texture pop-out].
- **How:** repeat shapes/colours across the image; break once at the focal point (pattern_break).
- **Refs:** Wagemans2012, Julesz1981.

### 13. Proportion & scale
- **What:** size relationships within objects and between objects and the frame.
- **Why:** frame size should roughly match real size class unless detail is the point [finding: PalmerLab-Spatial]; scale contrast reads as power, vastness or intimacy [craft].
- **How:** use a scale cue (person, door) for big spaces; macro for product detail.
- **Refs:** PalmerLab-Spatial; Proko-Proportions (figures).

### 14. Movement & direction
- **What:** implied motion and eye travel (diagonals, gesture, gaze, motion lines).
- **Why:** moving subjects should have space in front; fast motion overrides inward bias [finding: Palmer2008].
- **How:** diagonals for energy, horizontals for calm, verticals for stability/dignity [craft].
- **Refs:** Palmer2008; Block2008 (bibliographic) for the camera/screen-direction grammar.

---
## C. How viewers judge images (empirical aesthetics)
Judgement unfolds in stages — perception, classification, interpretation, evaluation — and context (caption, series)
changes it [finding: Leder2004, LederNadal2014]. Preference has measurable regularities (centre/inward bias, colour
pairs) but large individual differences [finding: PalmerSchloss2013]. Therefore: **design for the purpose, check
measurable basics, then test with real viewers.**
