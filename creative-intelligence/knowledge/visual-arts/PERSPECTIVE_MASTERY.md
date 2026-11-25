# Perspective Mastery (VA03 · M07 / M04 / M35) — batch VA1, tag `camera`, 2026-11-25

Deepens, does not repeat: `DRAWING_TECHNIQUES.md` §4 (1-/2-/3-point basics, ellipses, foreshortening),
`curriculum/03-composition.md` (one-point/leading lines), `curriculum/02-camera-lens.md` (distance vs lens).
Lens physics and camera distance → `LENS_OPTICS.md`. Shot/angle meanings → `CAMERA_ANGLE_LIBRARY.json`.
Error checklist for AI images → `PERSPECTIVE_ERROR_LIBRARY.json` (and §7 below). Sources → `sources_camera.json`
(+ registry keys `CuttingVishton1995`, `Smarthistory-Perspective`).

Labels: **EVIDENCE** = geometry/physics or peer-reviewed perception · **CRAFT** = drawing/film convention ·
**DERIVED** = our inference (the basis is named). Tier and confidence after each rule. Thai gloss in brackets once.

---

## 0. What this file covers / does not
Covered: projection geometry (central vs parallel), every n-point system and curvilinear, the viewer model (station
point, picture plane, cone of vision, centre of projection), depth cues, forced/reverse perspective, ellipses,
shadows and reflections, perception of pictures seen from the "wrong" place, and an AI-image perspective QC procedure.
Not covered: lens aberrations (LENS_OPTICS.md), human-figure construction (DRAWING_TECHNIQUES.md §1–3), light/colour.
Gaps: Cutting & Vishton 1995 cue-range table was not reachable this session (only secondary summaries);
Robertson & Bertling and Loomis texts not read (catalogue only).

---

## 1. The viewer model (the five terms every perspective decision depends on)

| term | definition | foundation | practical meaning for us |
|---|---|---|---|
| **Station point (SP)** [จุดยืนผู้ดู] | the single eye/camera position from which the scene is projected | EVIDENCE (projective geometry) | = camera position. Decide it first: height and distance. |
| **Picture plane (PP)** [ระนาบภาพ] | the imaginary glass window the scene is traced onto, perpendicular to the central line of sight | EVIDENCE | = the sensor/canvas. Tilting it (looking up/down) is what creates the 3rd vanishing point. |
| **Centre of vision / principal point** | where the central line of sight pierces the PP | EVIDENCE | lies on the horizon when the camera is level; not necessarily the canvas centre if the image is cropped/shifted. |
| **Horizon line (HL) = eye level** [เส้นขอบฟ้า = ระดับสายตา] | the image of all lines parallel to the ground; the vanishing line of the ground plane; always at the camera's height | EVIDENCE (Norling1939: "the horizon is at your eye height wherever you are"; Ozkan&Braunstein2010) | the single most important line for checking AI images. It exists even when hidden behind walls. |
| **Centre of projection (COP)** | the point in front of a finished picture from which it reproduces the original light rays; distance = focal length × print magnification | EVIDENCE (CooperPiazzaBanks2012) | viewers usually sit at the wrong distance; see §6. |

**Cone of vision** [กรวยการมองเห็น] — convention: a 60° cone from the SP (30° each side of the line of sight);
draw inside it, or forms bend (BYUI-ART110-ConeOfVision). *Where the 60° comes from:*
- It is **not** a lens or optics law and the course claim that things outside "appear blurred" is a simplification.
  The real reason is geometric: central projection enlarges and stretches off-axis objects (spheres → ellipses,
  columns widen), and the stretching only looks right from the exact COP. Leonardo already discussed this
  "marginal distortion" and recommended a viewing distance ≥ 20× the object size (Kubovy1986_va, ch. VIII; ch. V).
  EVIDENCE for the geometry, tier B, confidence high.
- The specific number is CRAFT (practitioner rule; ranges of 30–60° or 45–60° are also taught). DERIVED support:
  Cooper et al. found people *prefer* to view pictures so that they subtend ~22–36°, i.e. well inside 60°
  (CooperPiazzaBanks2012, tier A) — a picture whose content spans more than ~60° from its COP will almost always be
  viewed from too far and look stretched at the edges.
- Equivalent lens: a 60° horizontal field on full frame = **31 mm**, 60° diagonal = **37 mm**
  (2·atan(18/f), 2·atan(21.6/f); DERIVED from Wiki-AngleOfView). So "inside the cone" ≈ the field of a 35 mm lens.
- **Two-point rule (DERIVED, geometry):** for a box with right-angled corners, the lines SP→VP1 and SP→VP2 meet at
  90°, so the SP lies on the circle whose diameter is VP1–VP2 (Thales). With a 60° cone, the two VPs must be at least
  **2 × SP distance ≈ 1.73 × image width** apart — i.e. usually both off-canvas. Norling's warning that close VPs give
  "violent", diamond-shaped boxes is the same fact (Norling1939, CRAFT/EVIDENCE). Confidence high.

---

## 2. Linear perspective systems (central projection)

Core law (EVIDENCE, projective geometry): every set of parallel lines that is **not** parallel to the picture plane
converges to one vanishing point (VP); all VPs of lines lying in (or parallel to) one plane fall on one line, that
plane's **vanishing line**; the ground plane's vanishing line is the horizon (Farid2022-Perspective uses exactly
these constraints). Lines parallel to the PP keep their direction (no VP).

| system | what is going on | use for us | mistakes |
|---|---|---|---|
| **1-point** | one face of the box parallel to the PP; depth lines → 1 VP on HL | symmetrical shop interior, corridor, counter dead-on, Wes-Anderson-like frontal product shelf; strong "centre = formal/uncanny" | VP not on HL; side walls with two different VPs; floor tiles whose diagonals do not share a diagonal VP (tile diagonals must meet on the HL too) |
| **2-point** | box turned; verticals stay vertical (camera level) | storefront corner, product box at 3/4, Mint & Tao room corner | VPs too close (§1); verticals converging slightly (= unintended 3-point) |
| **3-point** | camera pitched up/down → verticals converge to VP3 above/below | worm's-eye tower, bird's-eye street, looking down at a desk of frames | VP3 on the wrong side (looking down ⇒ VP3 below); verticals of nearby objects converging at different rates |
| **4-point** | a curvilinear variant: horizontal lines bend through two VPs on the HL plus two vertical VPs (panorama feel) | wide panorama of Hua Hin beachfront | mixing straight and curved lines inconsistently |
| **5-point / curvilinear (fisheye)** | four VPs on a circle (N, S, E, W) + one at the centre; straight lines become arcs except those through the centre (BarreFlocon1968, tier B, unverified details) | peephole/door-cam POV, skate-style energy, dream sequence | curving only the background while the product stays rectilinear; bending lines through the centre (they must stay straight) |

Inclined planes (stairs, roofs, a sloping street): their VPs sit **above or below** the ordinary VP on a vertical
through it — up-slope above the HL, down-slope below (Norling1939, CRAFT/EVIDENCE, confidence high). An AI street
that climbs but vanishes on the HL is a common error.

**Perspective grid**: draw HL, choose VPs from the camera (§1), add a measuring line and diagonals to space equal
units (tiles, shelves, display-case modules); the diagonal of a square grid cell must hit a common diagonal VP on the
HL (EVIDENCE: diagonals are parallel lines too). Robertson & Bertling teach building grids before forms
(RobertsonBertling2013, bibliographic).

### 2.1 Foreshortening, overlap, relative size, ground plane
- **Foreshortening** [การย่อส่วนตามมุมมอง]: a length pointing toward the viewer projects shorter; with a close SP the
  near end also projects much bigger (extension). EVIDENCE. Our use: temples of glasses pointing at the camera look
  short and the hinge near the lens looks large; a hand reaching to camera in a low-angle shot.
- **Overlap / occlusion** [การบัง]: the strongest ordinal depth cue at every distance (CuttingVishton1995 per
  secondary summaries; tier A, confidence medium for the ranking). Always give the product a clear overlap relation:
  glasses *in front of* the coffee cup, not touching edges ("tangent").
- **Relative size & height in the visual field**: identical objects get smaller and closer to the horizon as they
  recede; below the horizon higher = farther (OzkanBraunstein2010, tier A).
- **Ground plane** [ระนาบพื้น]: most size/distance reading depends on a visible, continuous floor. Ozkan & Braunstein
  found the *perceived* horizon is pulled toward where the visible ground ends — a cropped floor or a fog line can
  silently move the viewer's horizon (EVIDENCE, tier A, confidence medium).

### 2.2 Atmospheric (aerial) perspective vs linear perspective
- Linear perspective = geometry of size and convergence. Atmospheric perspective = distant surfaces lose contrast and
  saturation and shift toward the sky colour because of scattering. Perception: lower contrast alone makes a region
  look farther, even against a conflicting size cue (OSheaBlackburnOno1994, tier A, abstract-level); blur is a
  separate depth cue (O'Shea et al. 1997, same record).
- Use: charcoal carousels — push backgrounds to light grey, low contrast; keep the darkest dark and sharpest edge on
  the subject. Product scenes — hazy background, crisp frame. Exception: night/neon scenes where distant lights stay
  bright (atmosphere adds glow, not fade). Mistake: AI haze applied evenly to near and far, or a distant mountain
  darker and sharper than the mid-ground.

---

## 3. Parallel projections (no vanishing points)

| projection | definition (Wiki-ParallelProjection, tier E; Krikke 2000 cited there) | use | note |
|---|---|---|---|
| **Orthographic** | rays perpendicular to the plane; multiview front/side/top | frame spec sheets, size diagrams (lens width / bridge / temple) | the only honest way to show true dimensions |
| **Axonometric – isometric** | one parallel projection with equal scale on all three axes; standard drafting shows axes 120° apart (30° from horizontal) — CRAFT convention, not stated on the page read | shop-floor map, infographic, "how lens coatings stack" exploded view | looks "game-like"; no size loss with depth, so it never reads as a photo |
| **dimetric / trimetric** | two / three different axis scales | more natural-looking technical views | |
| **Oblique (cavalier, cabinet)** | rays oblique; one face shown true shape; depth axis drawn at an angle (cabinet = half depth — drafting convention, CRAFT) | quick diagram of a box/case with the front label readable | depth looks too long in cavalier |

Properties (EVIDENCE): parallels stay parallel, ratios along parallels preserved, circles parallel to the plane stay
circles, others become ellipses. AI note: ask for "isometric illustration, no perspective, parallel lines" — models
often add slight convergence (unverified; test).

---

## 4. Forced and reverse perspective
- **Forced perspective** (Wiki-ForcedPerspective, tier E; CRAFT + EVIDENCE for angular size): objects of different real
  size/distance aligned so they project as touching or scaled. Needs (a) DOF covering both planes, (b) matched
  light/contrast (otherwise aerial-perspective cues give it away), (c) a locked camera at the zero-parallax point.
  Our use: giant glasses "worn" by a building, tiny Mint walking on a lens. Mistake in AI: contact shadows missing
  where the two planes "touch" (DERIVED: shadow contact is what sells the false adjacency).
- **Reverse (Byzantine) perspective** (Wiki-ReversePerspective): far things larger, parallels diverge, VPs in front of
  the picture. Use only on purpose (folk/naive/icon look, child's drawing in a story). In AI images an unintended
  reverse-perspective table top is a frequent error (see PERR library).

---

## 5. Ellipses, shadows and reflections in perspective

### 5.1 Ellipses (circles in perspective) [วงรีในทัศนียภาพ]
1. **Minor-axis rule** — the minor (short) axis of the ellipse lies along the axis of the cylinder/wheel/lens it
   belongs to; the major axis is perpendicular to it (forms a "T") (Norling1939; RobertsonBertling2013 "drawing an
   ellipse on the minor axis"). EVIDENCE (geometry), confidence high. For a lens of glasses seen at 3/4: the minor
   axis points along the direction the lens faces (its optical axis), so both lens ellipses on one frame share that
   direction.
2. **Degree** — horizontal circles get fuller (rounder) the farther they are from the horizon; on the horizon they
   collapse to a line. EVIDENCE.
3. **Centre shift** — the perspective centre of the circle sits *behind* the ellipse's geometric centre (far half is
   smaller). EVIDENCE. Mistake: putting a stem/pin at the ellipse centre.
4. Ellipses are smooth ovals, never lemon-pointed or flat-sided. CRAFT/EVIDENCE.
5. Near the image edge a correct projection of a sphere is an ellipse that *looks* wrong; painters drew circles
   instead (Kubovy1986_va, ch. VIII). Use: round lenses near the edge of a wide promo shot — keep them circular or move
   them inward.

### 5.2 Shadows
- Sun = parallel rays: shadows of parallel verticals are parallel on the ground and converge to a **shadow VP on the
  HL** (directly below/above the sun's own vanishing point); a nearby lamp is a point source and shadows fan out from
  the point below the lamp (Norling1939; EVIDENCE).
- Sun in front of the camera → light VP above the HL, shadows come toward the viewer; sun behind the camera → light
  VP below the HL (anti-solar point), shadows run away from the viewer (Farid2022-Perspective). Lines from each
  object point to its shadow point must all meet at the projected light position — the forensic test.
- Craft: every object touching the ground needs a dark contact shadow; floating = no contact shadow.

### 5.3 Reflections
- Water/floor (horizontal mirror): reflection is flipped, as far below the surface as the object is above, measured
  from the point on the surface directly beneath the object, and shares the object's VPs (Norling1939). The closer the
  eye to the surface, the more the reflection matches the object.
- Vertical mirror / shop window: lines from object points to their reflections are parallel in 3D and must converge
  to one VP in the image (Farid2022-Perspective).
- Glasses lenses (curved mirrors): reflections are small, curved, and both lenses mirror the same scene from almost
  the same viewpoint — mismatched lens reflections are a top AI tell for eyewear (DERIVED from the same constraint).
- Evidence on AI: DALL-E 2 failed reflections in 22/25 images, and plausible-looking ones still failed geometry;
  shadows were inconsistent in 25/25 sunny scenes (Farid2022-Perspective, tier B, exploratory). Newer models likely
  better (unknown) — check every time.

---

## 6. How people actually perceive perspective pictures (why "correct" ≠ "looks right")

| finding | evidence | consequence |
|---|---|---|
| A picture is geometrically correct only from its COP; viewers do not compensate for viewing distance, so wide-angle pictures (COP close) viewed from normal distance look depth-expanded and telephoto pictures look compressed | CooperPiazzaBanks2012 (A, high) | "wide-angle distortion" is largely a viewing-geometry effect; phone viewing (~30 cm) favours longer focal-length looks for natural proportions |
| People view from a distance set by print/screen size, not by focal length (preferred field ~22–36°) | same | design for the screen; do not count on viewers "standing in the right place" |
| Shapes stay stable when viewing a picture obliquely (sideways), via an estimate of the picture surface's slant | VishwanathGirshickBanks2005 (A, abstract) | sideways/angled phone viewing is mostly fine; marginal distortion is not fixed by this |
| "Robustness of perspective": big predicted distortions from wrong viewpoints are rarely noticed — but the claim is contested | Kubovy1986_va (B; Rosinski & Farber critique) | perfect geometry is less important than *consistency*; inconsistency (two horizons) is noticed |
| Horizon ratio: on flat ground the horizon cuts every object at the camera's height, so equal-height objects are cut in the same proportion at any distance; viewers use explicit or implicit horizons | Sedgwick1973 via OzkanBraunstein2010 (A) | basis of the figure-height check (§7 step 4) |
| Pictorial depth cues have different ranges (personal ≈ <1.5 m, action ≈ to ~30 m, vista beyond; binocular cues only near; occlusion and aerial perspective still work at vista) | CuttingVishton1995 (bibliographic in registry; ranges from secondary summaries) | product close-ups: overlap, blur, shading; landscapes: haze, overlap, height in field |
| Defocus blur signals absolute scale: a strong blur gradient implies a small, near scene (miniature effect); some blur approximations work, others do not | Held2010 (A, abstract) | tilt-shift "toy town" intros work only if the blur follows the scene's depth gradient (DERIVED) |

---

## 7. Procedure — checking an AI image for perspective errors (use before any critique score)

Tools: draw on a copy (any editor, or the skill's `inspect_views`), lines ≥ 3 per family. Tolerance: a few pixels
is fine (Farid allowed small deviations); anything you can see without zoom is an error.

1. **Name the camera you asked for** (height, pitch, lens feel). If the prompt said "eye level" but the image shows
   three-point convergence, that is already a prompt-adherence failure (PreciseCam paper: models drift to flat,
   eye-level, mid-horizon framing — expect the opposite failure too).
2. **Find the horizon.** Extend 2–3 receding horizontals of the floor/table/counter/shelf to their VPs. All ground-
   parallel families must meet on **one** horizontal line. Two horizons = error `perr.two_horizons`.
3. **Check every plane family.** For each box-like object (counter, case, building, product box) extend its edges:
   same object → same VPs; objects aligned to the room → share the room's VPs; rotated objects → their own VPs but
   still on the same HL. Locally-right/globally-wrong is the typical AI failure (Farid2022: floor right, counter wrong).
4. **Heads-on-horizon (horizon-ratio) test for figures** — on flat ground, the HL crosses every standing figure at
   the *camera's* height above that figure's feet:
   - camera at standing eye height ⇒ all standing adults have their eyes on (near) the HL, near and far;
   - camera at seated/child height ⇒ the HL crosses all standing adults at the same body point (e.g. chest);
   - measure for each figure *r = (feet→HL) / (feet→top of head)*; figures of equal real height must give equal r
     (EVIDENCE: Sedgwick horizon ratio; DERIVED as a QC test). Children/sitting figures get proportionally larger r.
   - Norling's transfer method checks a suspect figure: line from its feet through a known figure's feet to the HL,
     back through the known head — the new head must land on that line (Norling1939).
   - Exceptions: sloped ground, stairs, figures on a stage or kneeling; extremely tilted camera (then use the tilted
     horizon/vanishing line).
5. **Verticals.** Camera level ⇒ verticals parallel to the frame edge. Pitched ⇒ all verticals converge to one VP3
   (looking down ⇒ below). Mixed parallel and converging verticals = error.
6. **Ellipses.** Cups, lens rims, wheels, plates: minor axis along the object's axis; fuller farther from the HL;
   both lenses of one pair of glasses with the same ellipse orientation and similar degree (unless the frame is
   strongly foreshortened, then the near lens is slightly larger and rounder).
7. **Shadows.** Lines object-point → shadow-point meet in one point (light position); shadow VP on the HL; every
   ground contact has a contact shadow.
8. **Reflections.** Mirror/water: object→reflection lines converge (vertical mirror) or are vertical (water); lens
   reflections on both lenses depict the same scene.
9. **Scale against known sizes.** Door ≈ 2 m, counter ≈ 0.9–1 m, glasses front ≈ 13–15 cm wide (DERIVED, typical sizes
   — verify with the real frame in the kit). A pair of glasses as wide as a shoulder on the counter = scale error.
10. **Edges / marginal distortion.** Round objects and faces near the frame edge of a wide image — stretched? Move
    the product to the centre third or regenerate with a longer-lens description.
11. **Decide**: fix in post (crop to remove the inconsistent object, perspective-warp a pasted product to the grid,
    repaint the shadow) or regenerate with a simpler scene (fewer receding planes, explicit "one-point perspective,
    straight vertical lines").

Prompting notes (FLUX schnell / Codex; untested): describe the camera, not "perfect perspective": `eye-level camera at
1.6 m, level, straight vertical lines, one-point perspective down the aisle`; FLUX has no negative prompt
(web:docs.bfl.ai:13_va), so write the positive ("vertical lines stay vertical") not "no distortion". For Codex edits
with the real frame photo: "preserve the exact proportions and perspective of the frame" (OpenAI-ImageGen15-Guide).

---

## 8. Applied patterns for our production
- **Eyewear packshot**: true-shape frame = orthographic-like view: long lens look, camera on the lens axis height,
  horizon through the bridge; slight high angle (5–15°) shows the top bar and both temples (CRAFT). Never 3-point.
- **Frame on a counter, 3/4**: 2-point with VPs far off-canvas; lens ellipses' minor axes parallel to the temples'
  direction; contact shadows under the temple tips and the lens bottoms.
- **Mint & Tao charcoal carousels (1:1)**: keep a simple 1- or 2-point room drawn once per story and reused; the
  HL at the characters' eye height for empathy panels, lowered (child height) for wonder panels; aerial perspective
  done with lighter, softer charcoal in the background.
- **Cinematic promo (9:16)**: vertical frames make vertical convergence obvious — keep the camera level for
  architecture (shift-lens look) unless a deliberate worm's-eye shot.
- **2D puppet clips**: our rig fakes depth with parallax layers; horizon must be the same across all background
  layers of a scene, and characters' eye lines placed using §7 step 4 when several stand in depth.

## 9. Anti-patterns
"Perspective" used as a mood word in prompts; trusting a pleasant first glance (Farid: errors are often not visually
obvious); fisheye on product shots; mixing an isometric icon into a perspective scene; equal-size figures at different
depths with their heads at different heights relative to the HL on flat ground; using the 60° cone as a law of
optics.

## 10. Open questions
Exact Cutting & Vishton cue ranges (get the chapter); whether FLUX schnell obeys "one-point/two-point" words
(test grid: 10 prompts × 4 seeds, count VP consistency); whether newer Codex image models still fail Farid's tests;
a measured tolerance (px) for the heads-on-horizon test at our 1080-px outputs.
