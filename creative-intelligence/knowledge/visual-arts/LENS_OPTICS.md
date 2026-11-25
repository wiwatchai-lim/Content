# Lens Optics & Visual Language (VA05 · M18 / M04 / M34) — batch VA1, tag `camera`, 2026-11-25

Deepens `curriculum/02-camera-lens.md` (sensor, crop, lens types, anamorphic, flare, T-stop) and
`curriculum/01-photography-fundamentals.md` (exposure triangle). Not repeated here: lens-type history, T-stops,
codecs. New here: formulas with worked numbers, the camera-distance evidence, DOF/hyperfocal/CoC maths, depth of
focus, aberrations, shutter angle, and what FLUX/Codex do and ignore. Examples library → `lens_examples.json`.
Labels: **EVIDENCE** (physics/standard/peer-reviewed) · **CRAFT** · **DERIVED** (basis named). Sources →
`sources_camera.json`. All numbers below were recomputed by us from the formulas (python, 2026-11-25).

---

## 1. Field of view, focal length, sensor, crop factor

**Formula (EVIDENCE, rectilinear lens focused at infinity; Wiki-AngleOfView):**
`FOV = 2 · arctan( d / (2f) )`, d = sensor width, height or diagonal; full frame 36 × 24 mm, diagonal 43.3 mm.
Close focus: replace f by f·(1+m) (m = magnification) — FOV narrows ("focus breathing" is related).
Crop factor k = 43.3 / sensor diagonal; equivalent focal length = f·k (same FOV); equivalent f-number for the same
DOF/background blur = N·k (DERIVED from the CoC scaling in Nasse2010-Zeiss and Wiki-DepthOfField; confidence high).

| f (full-frame) | H° | V° | diag° | class (CRAFT boundaries) | 9:16 crop from a vertical FF frame, H° × V° |
|---|---|---|---|---|---|
| 14 | 104.3 | 81.2 | 114.2 | ultra-wide | |
| 24 | 73.7 | 53.1 | 84.1 | wide (≈ phone main camera, 23–26 mm eq.) | 45.7 × 73.7 |
| 35 | 54.4 | 37.8 | 63.4 | moderate wide ("cone of vision" lens) | 32.3 × 54.4 |
| 50 | 39.6 | 27.0 | 46.8 | standard / normal (36–60 mm per Wiki-AngleOfView; "diagonal = 43 mm" rule) | 22.9 × 39.6 |
| 85 | 23.9 | 16.1 | 28.6 | short tele / portrait | 13.6 × 23.9 |
| 100 | 20.4 | 13.7 | 24.4 | macro / product | |
| 135 | 15.2 | 10.2 | 18.2 | tele | |
| 200 | 10.3 | 6.9 | 12.3 | tele | |
| 400 | 5.2 | 3.4 | 6.2 | super-tele | |

**Standard lens — where "normal" comes from**: photographers' rule f ≈ format diagonal (43 mm → "50 mm"). Cooper et
al. showed it works only because people view prints from a distance that puts them near the COP; on small screens
viewed at ~30 cm the natural-looking focal length is much longer; median focal length of 3,930 Flickr SLR photos was
68 mm (CooperPiazzaBanks2012, A, high). DERIVED for us: IG/TikTok on phones → favour 70–100 mm-equivalent looks for
people and products; keep 24–35 mm for environment and energy.

---

## 2. Camera distance is THE determinant of perspective (and is not lens distortion)

| effect | cause | fix | evidence |
|---|---|---|---|
| Near things huge, far things tiny, "big nose", deep space | **camera distance** (perspective / "extension") | move back, then choose a longer lens to refill the frame | EVIDENCE: geometry; Wiki-PerspectiveDistortion; BryanPeronaAdolphs2012 |
| Background looks stacked/close to subject ("compression") | **camera distance** (far) | move closer | same; "lens compression" is a misnomer (curriculum ch. 2) |
| Straight lines bow outward/inward | **lens aberration** (barrel / pincushion / mustache) | lens profile correction; better lens | Wiki-DistortionOptics |
| Verticals converge | **camera pitch** (picture plane tilted) | level the camera, shift lens or keystone correction | PERSPECTIVE_MASTERY §2 |
| Spheres/faces stretched at the frame edges of a wide shot | **marginal (projection) distortion** + viewing from the wrong distance | keep subjects central, longer focal length, or stereographic/"Panini" re-projection | Kubovy1986_va; CooperPiazzaBanks2012 |

**Face evidence (A, high for direction, effect small):** Bryan, Perona & Adolphs photographed the same faces at the
same instant from ~45 cm and ~135 cm (lens distortion checked negligible). Close-range photos were rated less
trustworthy, competent and attractive and received less money in a trust game (pooled d ≈ 0.24), while viewers did
not notice the manipulation. Close faces: nose relatively larger, ears smaller, face narrower.
DERIVED arithmetic: the nose tip is ~10 cm nearer than the ears, so its relative magnification is
(u+10)/u: ×1.22 at 45 cm, ×1.07 at 135 cm, ×1.03 at 3 m. For glasses: the frame front is ~1–2 cm in front of the
eyes and temples run ~10 cm back — at arm's length the front looks oversized and the temples shrink fast; at
≥1.5 m the frame reads true-to-shape.
Camera-angle × head-pose caution: a camera below a face makes the head read as tilted up; downward head tilt (with
eyes to camera) increases perceived dominance via illusory lowered brows (WitkowerTracy2019, A, search-summary
level). Camera height and head pose interact — direct both.

---

## 3. Aperture, depth of field, circle of confusion, hyperfocal, depth of focus

Definitions (EVIDENCE): f-number N = f / entrance-pupil diameter. **Circle of confusion (CoC, c)** = the largest blur
spot still read as sharp at the intended output size; convention for full frame c ≈ 0.029–0.03 mm = diagonal/1500
(Nasse2010-Zeiss; web:en.wikipedia.org:6_va). For other formats scale c by 1/crop factor. CoC is a *viewing* criterion:
a 9:16 phone frame enlarged from a crop needs a smaller c (DERIVED).

Formulas (u = focus distance, f focal length, all in mm):
- **Hyperfocal** `H = f²/(N·c) + f` ≈ f²/(N·c). Focus at H → sharp from H/2 to ∞ (EVIDENCE; web:en.wikipedia.org:6_va).
- **DOF (u ≫ f)** `DOF ≈ 2·u²·N·c / f²` (Wiki-DepthOfField).
- **Near/far limits** `D_N = u(H−f)/(H+u−2f)`, `D_F = u(H−f)/(H−u)` (∞ if u ≥ H) — DERIVED from thin-lens geometry
  (standard textbook form; not quoted from a source read this session).
- **Close-up/macro** `DOF ≈ 2·N·c·(1+m)/m²` — DERIVED (thin lens, pupil magnification 1); the far-field formula
  overestimates at m≈1.
- **Depth of focus** (image side, sensor tolerance) `t ≈ 2·N·c·(1+m)` ≈ 2Nc — depends on N, not on focal length or
  subject distance (Wiki-DepthOfFocus; Nasse2010-Zeiss). Never confuse with depth of field.

Worked numbers (c = 0.03 mm):
| setting | result | meaning for us |
|---|---|---|
| 24 mm f/8 | H = 2.42 m (sharp 1.21 m → ∞) | deep-focus shop interior / street establishing |
| 50 mm f/8 | H = 10.5 m | landscape at Hua Hin beach |
| 85 mm f/2 at 1.5 m | DOF ≈ 3.5 cm (1.483–1.518 m) | eyes sharp, temple tips already soft; focus on the near eye/lens front |
| 85 mm f/5.6 at 1.5 m | DOF ≈ 10 cm | whole frame (front + temples) sharp on a face |
| 50 mm f/1.8 at 1 m | DOF ≈ 4 cm | phone-like "portrait mode" depth |
| 100 mm f/11 at 40 cm | DOF ≈ 8 mm | catalogue packshot: stack 5–10 frames |
| macro 1:1 f/11 | DOF ≈ 1.3 mm | hinge/logo detail: focus stacking mandatory |
| 200 mm f/4 at 30 m | DOF ≈ 5.4 m | street-tele portrait, crowd melts |

Rules:
- At the **same subject size** and same N, DOF is almost the same for any focal length, but a **longer lens from
  farther away blurs a distant background more** (bigger, smoother bokeh); a short lens keeps more context
  (Nasse2010-Zeiss, C, high). To melt the shop behind a face: step back + longer lens, not only a wider aperture.
- Small sensors (phones) need N·k for equivalent blur → that is why phones fake DOF computationally (DERIVED).
- Diffraction softens everything at small apertures (roughly beyond f/11–f/16 on full frame for critical work —
  CRAFT figure; Wiki-DepthOfField says it matters mostly in close-up work).
- **Focus plane** is a plane parallel to the sensor (unless tilted, §5); everything on it is equally sharp. For a
  3/4 face with glasses, the near eye and the far eye are at different depths → put focus on the near eye (CRAFT).
- **Bokeh** = rendering quality of out-of-focus areas: aperture shape (blade count), spherical-aberration correction
  (soap-bubble vs smooth), cat's-eye at the edges from mechanical vignetting (curriculum ch. 2; Nasse2010-Zeiss
  covers bokeh, read in part). Background blur disk size grows with aperture diameter and with the background's
  distance behind the subject: `b = d·m·x_d / D` (Wiki-DepthOfField).
- Perception: defocus blur is a depth and *scale* cue — strong blur says "small and near" (Held2010, A) → the
  tilt-shift miniature effect; also lower contrast reads as farther (OSheaBlackburnOno1994).

---

## 4. Aberrations and lens artefacts (what they are, how to read them)

| artefact | physics (EVIDENCE) | how it looks | stopping down helps? | creative use / risk |
|---|---|---|---|---|
| **Barrel distortion** | magnification decreases off-axis | straight lines bow outward | no (correct with profile) | fisheye energy; ruins product geometry |
| **Pincushion** | magnification increases off-axis | lines bow inward | no | rarely wanted |
| **Mustache** | barrel centre + pincushion edge | wavy horizon | no | hard to correct |
| **Longitudinal chromatic aberration** | colours focus at different distances | purple/green fringes in front of/behind focus | yes | "vintage" look; on metal frames looks like dirt |
| **Lateral chromatic aberration** | magnification differs per wavelength | colour fringes toward the edges | no (software fix) | glitch/RGB-split stylisation |
| **Vignetting** (mechanical/optical/natural cos⁴/pixel) | blocked or oblique light; cos⁴: 94% at 10°, 78% at 20°, 56% at 30° off-axis | darker corners | optical yes; cos⁴ no | holds the eye central; heavy = toy/retro |
| **Flare / ghosting / veiling glare** | internal reflections between elements | streaks, aperture-shaped ghosts, lowered contrast | — | warmth/hope/memory; overuse looks cheap (curriculum ch. 2) |
| **Coma, astigmatism, field curvature** | off-axis point blur | smeared points at edges | yes | rarely relevant to us |

Sources: Wiki-DistortionOptics, Wiki-ChromaticAberration, Wiki-Vignetting (cos⁴ values recomputed).
Eyewear note (DERIVED): the same physics (dispersion → colour fringes; reflections → ghosting) is what AR coatings
and high-Abbe lens materials reduce in spectacles — a strong visual metaphor for coating promos (show a flare/ghost
on the "before" side). The spectacle-lens claims need a lens-material source before publishing.

---

## 5. Special lenses (additions beyond curriculum ch. 2)
- **Fisheye** — not "a wider rectilinear" but a different mapping: rectilinear r = f·tanθ; equidistant r = f·θ;
  equisolid r = 2f·sin(θ/2); stereographic r = 2f·tan(θ/2); orthographic r = f·sinθ. Circular fisheye ≈ 8–10 mm on full
  frame (black corners), diagonal 12–18 mm (Wiki-FisheyeLens, E). Lines through the centre stay straight.
- **Macro** — magnification m = image size/object size; 1:1 → DOF ~1 mm at f/8–f/11; effective aperture darkens by
  (1+m) (DERIVED); working distance matters for lighting glasses (long macro = room for a softbox).
- **Tilt-shift** — shift keeps verticals parallel (architecture, shop fronts in 9:16); tilt rotates the focus plane
  (Scheimpflug, curriculum ch. 2) — miniature look works when the blur gradient matches a top-down ground plane
  (Held2010 + DERIVED).
- **Anamorphic** — see curriculum ch. 2; adds: horizontal streak flares and oval bokeh are the recognisable cues for
  prompts and fakes.

---

## 6. Motion: shutter speed, shutter angle, motion blur

`exposure time = (shutter angle / 360°) / fps` (EVIDENCE/standard; RED-ShutterAngle gives 180° at 24 fps ≈ 1/48 s).
| fps | angle | exposure | look |
|---|---|---|---|
| 24 | 180° | 1/48 | standard cinema blur |
| 25 | 180° | 1/50 | PAL/50 Hz-lighting safe — Thailand mains is 50 Hz (DERIVED, check flicker on LED) |
| 30 | 180° | 1/60 | social video default |
| 24 | 90° / 45° | 1/96 / 1/192 | crisp, staccato action, "newsreel" (RED-ShutterAngle) |
| 24 | 270° | 1/32 | smeary, dreamy, more light |
| 60 | 180° | 1/120 | slow-motion source |
The "180° rule" is CRAFT (a look), not physics; at high fps for slow motion it no longer describes how the result
looks. Motion blur direction must follow the motion path; a sharp moving object on a blurred static background reads
as panning.
2D rig: our puppets have no shutter; add directional blur only on fast moves (whips, falls) to imitate 180°.

---

## 7. Expressing optics in FLUX / Codex prompts — and what the models ignore

| intent | phrase that tends to work (CRAFT/vendor guidance) | what models ignore or get wrong (evidence level) |
|---|---|---|
| camera distance/perspective | "shot from 2 m away with an 85 mm lens", "close, 24 mm, nose closer to camera" | numbers are hints, not measurements (unverified for FLUX schnell; curriculum ch. 2) |
| angle | "eye-level", "low-angle shot from knee height looking up" | models drift back to flat eye-level, mid-horizon framing (BernalBerdun2025-PreciseCam, B) |
| lens distortion | "fisheye lens, curved horizon, circular image" | prompts could not produce controlled lens distortion in SDXL (same, B); rectilinear correctness not guaranteed |
| DOF | "shallow depth of field, f/1.8, background softly blurred" / "deep focus, everything sharp" (no negative prompts in FLUX: web:docs.bfl.ai:13_va) | blur often applied as a uniform background layer, not consistent with depth (DERIVED from Held2010 + Farid2022 pattern; test) |
| bokeh | "creamy round bokeh from fairy lights" / "oval anamorphic bokeh" | blade count/cat's-eye ignored |
| realism | "photographed as if captured in the moment, 50 mm lens, natural light" (OpenAI-ImageGen15-Guide) | generic "8K, ultra-detailed" adds less than camera terms (same guide) |
| aberrations | "subtle chromatic aberration at the edges, light vignette, lens flare from the window" | effects drawn decoratively, not physically (e.g., flare not aligned with the light) — check |
| motion | "motion blur on the passing scooter, background sharp" | blur direction often wrong |
| edits with real frame (Codex `-i`) | "preserve the exact proportions and perspective of the glasses" | drift of small details — re-specify (OpenAI-ImageGen15-Guide) |

General rule (DERIVED): name the **cause** (distance, height, aperture) and the **visible effect** together; never
rely on a lens model name alone. Every claim in this table is `untested` in our pipeline — log results in
`VISUAL_EXPERIMENTS.json` when tested.

## 8. Anti-patterns
"Wide lens distorts faces" (it is the distance); "telephoto compresses" (distance); quoting f/1.4 for an AI image as
if it computed optics; fisheye for glasses; heavy CA/vignette to look "cinematic"; DOF so thin the product's
temple is lost; using "depth of focus" for depth of field.

## 9. Open questions
Does FLUX schnell change face proportions between "24 mm close" and "135 mm far" prompts (measurable with landmark
ratios)? Can Codex keep frame geometry when we ask for "100 mm macro"? Measure phone viewing distance of our audience?
