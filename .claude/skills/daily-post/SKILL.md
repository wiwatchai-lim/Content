---
name: daily-post
description: Create the daily Facebook/Instagram post for an eyewear shop — pair a frame + lens + coating from data/, build a layered image (HTML → PNG + PSD) that is beautiful and built on the structure of a style in styles/ without copying its reference image, and write the caption. Use when the user asks to make a post ("ทำโพสต์", "โพสต์วันนี้"), edit an image ("แก้ภาพ"), or move/change a layer ("ขยับ/เปลี่ยน layer").
---

# Daily eyewear post

The user wants this to be effortless: no forms to fill in, and the shop logo goes on every post. Two goals: the image must be **beautiful** and must **borrow the structure of the style's reference image without looking like a copy of it**. Only ask the user something when you are truly blocked, and keep it short.

## Inputs
- `data/frames/frames-stock-*.csv` — frames in stock (Brand, Model); use the latest file
- `data/frames/images/<Brand>/<Model>_1..3.*` — frame photos: `_1` front, `_2` three-quarter angle, `_3` side. A model name containing `/` (e.g. `REILLY/G 807`) becomes `-` in the filename (`REILLY-G 807_1.jpg`) — never a nested folder
- `data/frames/images/_check/*.csv` — photo verification results; only use rows with status `ยืนยัน` (verified) or `รุ่นตรง สีต่าง` (model verified, different color — never state the color in the post)
- The photo must also be big enough **for the width the chosen style puts it at** — never upscale. Most retailer photos are 980px wide, which is sharp in a centred layout (the product sits at 680–880px) but soft in a bleed-off-the-edge one like `2-titanium-center` (1480px): for those, source a photo of 1500px or more. Under about 600px wide the photo is unusable in any style — mark it `ข้อมูลไม่พอ` and find a better source
- `data/lenses/<brand>.md`, `data/coatings/<brand>.md` — HOYA, ZEISS, Shamir, Essilor (written in Thai, each entry has a source URL); a lens and its coating always come from the same brand file pair
- `styles/<name>/` — `ref.*` reference image(s), `base.html` layout, `preview.png`; overview of all styles in `styles/README.md`
- `styles/color_palete.jpg` — shared color palette
- `brand/` — the TIMEOPTIC brand kit and the source of truth for colour, type and spacing: `brand/tokens.css` (the `--to-*` variables), `brand/tokens.json` (same values for scripts), `brand/logo/*.svg`, `brand/ci.html` (one-page guide), and `brand/preview/a-quiet` + `brand/preview/b-bold` — two worked example posts built on the tokens. Read `brand/README.md` before designing anything
- `log/used-combos.csv` — combinations already posted

Never invent specs, prices or product claims that are not in the data.

**Language: all on-image text is English only** (confirmed by the user). Captions are currently written in English too. The data files are in Thai — translate faithfully, and when the manufacturer's own English wording is quoted in the data, use that wording. Talk to the user in Thai.

**Brand signature on every post and clip** (user, 2026-09-21; since 2026-09-25 clips drop the line art and keep only the moving wordmark): on posts the storefront line art `brand/store-lineart.png` (white strokes on transparent) sits faint at the top right, around the leaf shadow — `opacity` ~0.6 with `filter: drop-shadow(0 1px 1px rgba(33,33,33,.16))` so white lines read on light grounds; on dark grounds drop the shadow and lower the opacity. In clips the TIMEOPTIC wordmark moves: it rises into its own box and a Peach shine crosses it (see `kits/2026-09-21_ox8208-0552/motion.html`).

## Steps
1. **Pick the set** — 1 frame + 1 lens + 1 coating (the user may specify any of them)
   - The frame must have a verified photo (see `_check`)
   - Never repeat a combination, and don't reuse a frame within 14 days — check the log
   - The set must satisfy the pairing rules below
2. **Pick the style** — use the one the user asks for; otherwise pick one that differs from the latest post and suits the content
   - **Take the structure, not the skin.** What to borrow from `ref.*`: composition grid, where the eye goes first, how much empty space, the size relationship between product and headline, typographic weight contrast. What must be our own on every post: the colors (from `styles/color_palete.jpg`, tuned to the frame), the crop and angle of the product, the wording, the decoration.
   - **Never reproduce** anything that belongs to whoever made the reference: their headline or body text, logos, badges, model photos, illustrations, or a signature graphic device that reads as their identity. A post that could be mistaken for the reference brand's own ad is a failed post — redo it.
   - **Vary between posts in the same style** so the feed doesn't look like one template: change the accent/background tone with the frame, swap which photo (`_1` / `_2`) is the hero, and shift the product's size and position within the layout.
   - Open `ref.*` every time and note what to borrow before touching HTML:
     - Color: background, text, accent (use palette colors when they fit)
     - Composition: where the product sits and how big, where text sits, how much empty space
     - Typography: weight, serif or sans, headline size vs body, amount of text
     - Background and lighting; hard or soft product shadow
     - Decoration: lines, borders, badges, icons
   - A style without `base.html`: build one from the ref, get the user's approval, then keep it for reuse
3. **Prepare the frame photo** — cut out the background into transparent PNGs in the post folder:
   `npm run cutout -- posts/<folder>/layers data/frames/images/<Brand>/<Model>_1.jpg data/frames/images/<Brand>/<Model>_2.jpg`
   - Check the result by rendering it on the post background (a transparent PNG viewed alone looks wrong); edges must be intact and light/clear frames still visible — otherwise use another photo of the same model
   - Styles that use `angle.png` need `_2`; if there is none, use `_1` and adapt the layout
4. **Build the post** in `posts/YYYY-MM-DD_<slug>/`
   - `post.html` — copy `styles/<name>/base.html`, then:
     - replace `src="../_preview/..."` with the images in `layers/`
     - replace placeholder text (Brand, Model, Lens name, Coating name, …) with real data
     - adjust product position/size to the real photo
     - `1-type-behind`: measure the inner rim of the larger lens on a gridded crop of the render and update the `.type-lens` clip polygon
     - `4-bold-promo`: remove the `badge` layer unless there is a real promotion · `5-tonal`: set `--tone*` to match the frame color
   - `caption.md` — short, easy-to-read English caption + hashtags
5. **Render** — `npm run render -- posts/<folder>` produces `export/post.png` + `export/post.psd`
   - **Clip (only when the user asks for one)** — add `clip.html` next to `post.html` and run `npm run video -- posts/<folder>` for `export/clip.mp4`
     - Same layer rules as the still, plus `<body data-duration="6" data-fps="30">`
     - Every animation must have a period of `data-duration` (or a divisor of it) so the loop is seamless — offset repeats with a negative `animation-delay`, never with a one-shot fade-in
     - Keep the motion slow and small: a drift of 20–30px, a tilt of about a degree. The frame is the subject, not the effect
     - Each frame is captured with the animations paused and seeked, so the render is deterministic; the encoder is `ffmpeg-static` (an npm dependency, no system ffmpeg)
6. **Self-review before showing the user** — open the PNG with Read next to the style's `ref.*`:
   - Compare point by point against the notes from step 2: the structure should hold up, the surface should not match. If the render looks like the reference recolored, change the crop, the product angle or the layout until it stands on its own
   - Compare it with the last few posts in `posts/` too — if the same style looks identical to its previous use, vary it
   - It should look like professional work: not crowded, not empty, the product is the hero
   - Text does not overflow or cover the product
   - Model, lens and coating names match `data/`
7. **Log** — append a row to `log/used-combos.csv` once the user is happy with the post

## Layer rules
- Every layer is a direct child of `<body>` with `data-layer="name"` and `position: absolute` — never nest a layer inside another
- HTML order = layer order: the first element is the bottom layer
- `html, body` background is always transparent; the real background is the `background` layer
- `<body data-width="1080" data-height="1080">` is required — square is the standard post size
- One layer = one thing
- Avoid `mix-blend-mode` / `backdrop-filter` that depend on other layers — the PSD renders each layer on its own
- Fonts: Google Fonts via `<link>` (rendering needs internet)
- **Every template links the brand tokens** — `<link rel="stylesheet" href="../../brand/tokens.css">` — and uses `var(--to-green)`, `var(--to-peach)`, `var(--to-margin)` and friends instead of literal values. Fonts are Archivo (display, 700/800) and Inter (body), loaded from Google Fonts
- **Every post carries a `logo` layer** — `<img data-layer="logo" src="../../brand/logo/timeoptic.svg">`, or `timeoptic-white.svg` on a dark ground
  - `width: var(--to-logo-width)` (170px), in a corner at `var(--to-margin)`, never over the product or a headline
  - It signs the post, it is not the subject: one size and one position per style, and never tinted or restyled
- **Brand rules the layout must keep**: one green only (Phthalo `--to-green`; on a dark ground an accent uses `--to-green-on-dark`), one accent per image, `var(--to-margin)` (72px) safe margin, square corners, and Peach-Orange is never text on a light ground (1.4:1) — only a rule, bar, dot or fill, or text on green/black

## Editing
- The user asks for a change ("move the glasses up", "change the headline") → edit only that layer in `post.html` and re-render
- The user can edit `export/post.psd` in Photoshop or Photopea — text in the PSD is rasterized and can't be retyped
- If the user has already edited the PSD, ask before re-rendering over it

## Pairing rules
- **Pick the lens first, then the coating for that lens** — coatings are not interchangeable between lens brands or lens types
  - Lens and coating must be the same brand (HOYA lens → HOYA coating, ZEISS lens → ZEISS coating, Shamir lens → Shamir coating)
  - If the lens entry in `data/lenses/<brand>.md` has a "ใช้คู่กับ" (compatible with) line, the coating must come from that list — it wins over every other consideration
  - Otherwise check the coating's own "ใช้คู่กับ" line: if it names lenses, the chosen lens must be one of them
  - When neither side names the other, match by type and never cross these groups:
    - clear prescription lens → general AR coating (e.g. HOYA Hi-Vision LongLife / LongLife BlueControl / Meiryo, ZEISS DuraVision Plus Platinum / Silver / BlueProtect, Shamir Glacier Plus UV / Glacier Blue-shield UV)
    - tinted, polarised or mirror-finish sun lens → sun/mirror coating (e.g. HOYA Hi-Vision SUN Pro, HOYA Mirror, ZEISS DuraVision Plus Sun / Mirror / Flash UV, Shamir Glacier Sun UV)
    - everyday photochromic lens (clear indoors, dark outdoors — Sensity, PhotoFusion X, Transitions) → a general AR coating, the same as a clear lens; it only takes a sun coating when the maker's own "ใช้คู่กับ" line says so (as Sensity Fast and Sensity Colours do)
    - children's myopia-control lens → only its own coating (e.g. MiYOSMART → MiYOSMART Coating STX)
    - driving lens → the driving coating of the same brand where one exists (ZEISS DriveSafe → DuraVision Plus DriveSafe UV)
  - Add-on-only coatings (HOYA Hi-Vision Anti-Bacterial, ZEISS CleanGuard, ZEISS UVProtect) sit on top of another coating — don't post one as the coating of the set
- Grooved (nylor/semi-rimless) and drilled (rimless) frames: the lens material must be groovable/drillable, e.g. Polycarbonate, Trivex
- Progressive lenses: the frame must be tall enough per the lens maker's minimum fitting height
- Myopia-control lenses for children (e.g. MiyoSmart, Stellest, MyoCare): only with frames suitable for children
- Sunglasses in stock (codes containing `S`, e.g. `/S`, `CS`, or the product page says sunglasses) are not paired with prescription lenses unless the user asks
- Lens and coating claims come only from `data/`; never make medical claims beyond the manufacturer's wording

## Image sizes
- IG + FB feed: **1080×1080 square**, one file for both — this is the default for every post and every style's `base.html`
- Keep at least 40px side margins; the square is shown uncropped in the IG profile grid
- A square gives less vertical room than the old 3:4: use fewer lines of text, a smaller headline, and let the product hold the middle
- Portrait 1080×1350 or story 1080×1920 only when the user asks for it
