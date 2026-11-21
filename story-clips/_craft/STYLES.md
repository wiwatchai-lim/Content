# Cartoon & line-art scene styles — how to build each one here

Companion to `GUIDE.md` (shots/acting) and `FX.md` (effects + sound). A **style** = background look + line treatment +
character treatment + colour + motion texture. Pick one per series and keep it for every episode (a bible line in SERIES.md).
Never copy a named studio/artist's characters or a specific film's frames; describe the *qualities* (line weight, texture,
palette) instead of "in the style of <name>" in prompts.

Tools: backgrounds = local FLUX (`tools/flux.py`, free) or Codex (ask first, quota); characters + props = SVG via `rig.js`;
treatments = `fx.js` (boil, grade, film, particles) and CSS filters.

---

## 1. Anatomy of a 2D scene (layers, back to front)

| Layer | Content | `--d` (parallax) | Notes |
|---|---|---|---|
| Sky / far BG | sky, distant city, far wall | .5–.7 | lowest contrast, coolest colour (aerial perspective) |
| BG | the painted room/street (FLUX) | .75–.85 | oversized 112 % (RIG_CSS) so pans never show edges |
| Mid props | counter, lamp glow, particles behind characters | .95 | |
| Characters | rig puppets | 1 | line weight 5 px @ s=1, contact shadow under feet |
| FG | plant, door frame, shelf edge, rain on glass | 1.2–1.4 | dark, slightly blurred (`--blur:4–8`) — instantly "cinematic" |
| Atmosphere | fog, rays, dust, grade overlay | — | `fx.fog/rays/particles`, screen/multiply blends |
| Lens | vignette, grain, scratches, letterbox | — | `fx.film`, vignette div |
| Text | subtitles, titles | — | never under the grain |

Rules that make a painted BG and a code character look like one picture:
- **Match the light**: same key direction (glow on the side facing the lamp), same colour temperature (warm lamp → add a warm `fxGlow`/radial on the puppet; moonlight → cool rim).
- **Match the values**: characters must be the clearest value contrast in the frame; darken/blur the BG behind them (`cam.rack`, grade).
- **Ground them**: contact shadow ellipse, feet on a believable floor line (pick y from the BG perspective, check in a snapshot).
- **Same texture**: if the BG is gritty, give characters `boil` + grain; if the BG is clean flat, no boil, crisp lines.
- **Scale**: decide the floor line and the camera height (horizon line) per BG once; characters further back get smaller and higher (s ∝ distance from horizon).

---

## 2. Style catalogue

Each entry: **look** · **use for** · **FLUX prompt core** (append "empty scene with no people, no text") · **code treatment**.

### A. Gritty ink-wash storybook (ร้านแว่นตีสอง EP01)
- Look: hand-painted gouache + ink, worn textures, warm amber lamps against teal-blue night, simple round-head characters with thick ink outlines.
- Use: ghost/mystery/drama storytelling, long 16:9 narration.
- Prompt: `moody hand-painted 2D animation background art, textured gouache and ink, gritty worn surfaces, cinematic lighting, muted desaturated palette with warm amber lamp light`
- Code: outline 5 px #241c18, `boil(on 3)` subtle (2–3), grain .07–.12, vignette 55 %, dust in lamp light, `night`/`dawn` grades.

### B. Clean flat vector (explainer)
- Look: geometric shapes, no outlines or thin uniform ones, flat fills + one soft gradient, bright limited palette (4–6 colours), long soft shadows.
- Use: eye-science explainers, how-to, product facts.
- Prompt: `flat vector illustration background, clean geometric shapes, soft gradients, minimal, limited pastel palette, smooth`
- Code: no boil, no grain; motion = snappy (`back.out`), elements pop in with stagger; shapes drawn in SVG are often better than FLUX here.

### C. Ligne-claire comic (clear line)
- Look: uniform black line weight everywhere (BG too), flat colour, no hatching, crisp shadows as flat shapes, detailed but clean backgrounds.
- Use: adventure, travel, city stories, light mystery.
- Prompt: `clean clear-line comic illustration background, uniform black ink outlines, flat colours, no shading gradients, detailed architecture, bright daylight`
- Code: puppet outline = BG line weight (often 3–4 px), no grain, gentle camera, `poster` grade off.

### D. Painted anime background (lush)
- Look: highly detailed painted BG with big skies, volumetric clouds, saturated greens/blues, light shafts; simple cel-shaded characters (one shadow tone, crisp edge).
- Use: heartwarming, summer/nostalgia, season changes, travel (หัวหิน, sea).
- Prompt: `lush painted anime background art, detailed, big cumulus clouds, summer light, saturated blue sky and greenery, soft light shafts`
- Code: characters get a **cel shadow** (a darker duplicate shape clipped to one side), `rays` + `dust`, parallax sky `--d:.5`, slow pans; wind = `leaves/petals` particles.

### E. Pencil / charcoal sketch (our story carousels)
- Look: graphite or charcoal on paper, visible strokes and smudges, mostly monochrome with one accent colour.
- Use: emotional quotes, memories, flashbacks inside another style.
- Prompt: see `carousel/styles/charcoal-dialogue/style.md`.
- Code: `boil(on 2)` stronger (4–6) so lines "redraw", paper texture overlay (multiply), `memory` grade, slow dissolves. Flashbacks: switch a colour scene to this with `R.dip(..., '#fff')`.

### F. Watercolour storybook
- Look: soft wet edges, colour blooms, paper grain, light ink lines, pastel palette.
- Use: children's stories, gentle morals, family.
- Prompt: `soft watercolor children's book illustration background, wet edges, paper texture, pastel colors, light ink line`
- Code: puppet fills at 85 % opacity + `fxRough` edge, paper overlay, no hard shadows, slow sine moves.

### G. Paper cut-out / collage
- Look: layers of cut paper with drop shadows, visible paper fibres, slightly misaligned, stop-motion feel.
- Use: playful explainers, kids, comedy.
- Prompt: `layered paper cut-out craft diorama, colored construction paper, visible paper texture, soft drop shadows, shallow depth`
- Code: every layer gets a hard drop shadow (`filter: drop-shadow(6px 8px 0 rgba(0,0,0,.25))`); animate **on twos/threes** (step all tweens with `ease: 'steps(n)'` or move in 2-frame holds), small random rotation jitter = stop-motion.

### H. Manga / screentone (black & white action)
- Look: black ink, white paper, halftone dot shading, speed lines, impact frames, big onomatopoeia.
- Use: action, comedy, zombie fights, dramatic reveals.
- Prompt: `black and white manga panel background, ink lines, screentone halftone shading, high contrast, dramatic perspective`
- Code: `noir` grade, `speedLines`, `impact`, halftone pattern fill (SVG `<pattern>` of dots) on shadows, shake; text SFX in bold brush type with a white stroke.

### I. Noir silhouette
- Look: near-black frames, hard light, venetian-blind shadows, characters as silhouettes, one accent colour (red, amber).
- Use: tension, crime, secrets, ghost reveals.
- Prompt: `film noir night scene, deep black shadows, single hard light source, venetian blind shadows, rain-wet street, high contrast`
- Code: puppets filled near-black with a thin rim line (stroke of the light colour on one side), `noir` grade, rain particles, slow pushes, long silences.

### J. Chalkboard / whiteboard doodle
- Look: white or coloured chalk/marker lines drawing themselves on dark green or white board.
- Use: teaching (eye facts, how lenses work), lists.
- Code: everything SVG; `stroke-dasharray` path draw (`hyperframes-animation` rule `svg-path-draw`), `boil(on 2)` light, hand-drawn font (Sriracha/Mali for Thai). No FLUX needed.

### K. Retro 90s cel / VHS
- Look: cel-painted characters, painted BG with slight colour bleed, film grain, soft chroma, 4:3 or letterbox.
- Use: nostalgia, parody of old cartoons, "memories from 2539".
- Prompt: `1990s hand-painted cel animation background, gouache, slightly faded colours, film grain`
- Code: `film({ weave: '#root', scratches: true })`, slight `glitch` on cuts, warm faded grade, 24 fps feel by stepping camera moves (`steps(12)` per second).

### L. Thai mural (จิตรกรรมฝาผนังไทย) inspired
- Look: flat perspective (no vanishing point), stacked registers, gold leaf accents, red-ochre grounds, zig-zag "sin-thao" dividers between scenes, figures in profile with flowing lines.
- Use: folk tales, temple/heritage stories, Songkran or Thai festival content.
- Prompt: `traditional Thai temple mural painting style background, flat perspective, red ochre and gold leaf, decorative patterns, ancient`
- Code: scenes are side-by-side registers on one wide canvas — the camera **pans between** them instead of cutting; zig-zag dividers as SVG; gold shimmer (`ray` sweep) on titles. Characters: keep our round heads but add Thai costume patterns.

### M. Pixel art
- Look: low-res grid, limited palette, dithering.
- Use: game parodies, retro fun, kids.
- Code: render the scene at 1/6 size and upscale with `image-rendering: pixelated` (a wrapper div at 320×180 scaled ×6); animate on whole pixels; FLUX: `pixel art game background, 16-bit, limited palette`.

### N. Neon line (night city)
- Look: dark BG, glowing single-weight lines (pink/cyan), bloom.
- Use: night city, modern stories, music clips.
- Code: SVG strokes + `fxGlow`, flicker on signs, rain + reflections (mirror the bottom half with low opacity + blur).

---

## 3. Line quality & motion texture

- **Line weight hierarchy**: outer silhouette thickest (5 px), inner details 3–4 px, far objects thinner. Thicker lines = closer & heavier.
- **Line colour**: pure black reads harsh on painted BGs — use a dark warm brown (#241c18) or a dark of the scene colour.
- **Boil** (hand-drawn wobble): 3 noise states cycled every 2–3 frames. Subtle = alive; strong = nervous / horror / dream. Turn it OFF on still inserts with text (it hurts reading).
- **Animating on 2s/3s**: real cartoons hold each drawing 2–3 frames. For a hand-made feel, step moves (`ease: 'steps(n)'`) — but keep the camera smooth unless the style is stop-motion.
- **Texture**: grain (overlay), paper (multiply), dust/scratches (film); apply to the whole frame so BG and characters share it.

## 4. Colour

- One **key palette per scene** (3 main + 1 accent), written in the shot list. The accent goes on the story object (gold glasses, the letter).
- **Colour script** for an episode: a strip of the dominant colour per scene, it should tell the emotional arc by itself.
- Day = warm sun + blue shadows; night = blue/teal + warm practical lights; memory = sepia/desaturated; horror = green-cyan cast, crushed blacks; tender = peach/pink, lifted shadows.
- Complementary contrast (orange vs teal) puts the eye on the warm thing.

## 5. FLUX background tips (what worked here)

- 1344×768 (16:9) or 768×1344 (9:16); describe light source + time of day + materials + camera angle; end with "empty scene with no people, no text".
- FLUX often adds fake text/watermarks — inpaint them out (EP01 `shop.png`: `cv2.inpaint` on the rectangle).
- img2img (`--init ref.png --denoise .35–.6`) keeps the layout but **keeps the lighting too** — it can't turn night into day; generate day/night as separate prompts with the same seed and wording instead, or grade with CSS.
- For one place seen from many angles, write the place once (materials, colours, props) and reuse that paragraph in every prompt.
- Make a **wide master** (2688×768 via two prompts or one wide size) for pans.
