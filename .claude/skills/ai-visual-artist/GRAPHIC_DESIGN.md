# Graphic Design & Commercial Art

Sources: research/R3 (keys in RESEARCH_SOURCES.md). [craft] = practice. Thai text → THAI_TYPOGRAPHY.md.

## 1. Two-layer rule
Every deliverable = **plate** (generated/photographed image, text-free, with planned calm zones) + **type & brand
layer** (HTML: headline, copy, price, CTA, logos, exact product cut-outs) [Liu2023 inference; house rule]. Never ask
an image model for Thai text, prices or logos.

## 2. Formats (1080-px base)
| format | size | live area / safe zone | notes |
|---|---|---|---|
| 1:1 feed | 1080×1080 | 6–8 % outer margins | quote/story carousels in this project (no logo unless asked) |
| 4:5 feed | 1080×1350 (ads 1440×1800) | keep key text within the centre 1:1 — the profile grid crops 4:5 [Meta-AdsGuide-IGFeed; crop margin craft] | best feed real estate |
| 9:16 Reels/TikTok/Stories | 1080×1920 | keep text, prices, logos out of the bottom 35 % [Meta-ReelsAds]; house margins ~14 % top, ~6 % sides [craft, unconfirmed figures]; TikTok: overlay the official safe-zone template [TikTok-InFeedSpecs] | `analyze_image.py --platform reels` flags focal points under UI |
| 16:9 | 1920×1080 | title-safe ~5 % | story clips, presentations |
| web banner | e.g. 1200×628 | logo + one line + CTA | test at 50 % size |
| poster | A-series (√2 ratio), 300 dpi at print size | 10 mm bleed area clear | vector/HTML type for print |
| product cover | per marketplace spec | product ≥ 70 % of frame on plain ground | [craft] |

## 3. Layout principles
- **Hierarchy first:** decide what is read 1st/2nd/3rd (subject → headline → CTA/logo) before composing the plate [Block2008, NNG-Pernice2019].
- **Grid:** 4–6 columns for 1:1 / 4:5, margins 6–8 % of width; snap headline, logo, product to the grid [MullerBrockmann1981; numbers craft].
- **Reading patterns:** F / layer-cake patterns are for text-heavy pages; single images are read by salience — build it on purpose [NNG-Pernice2017, NNG-Pernice2019]. Z-pattern is craft, not eye-tracking evidence.
- **Text-heavy carousels:** layer-cake — strong descriptive headings that start with information-carrying words, short chunks, bold key terms [NNG-Pernice2017].
- **Information design:** maximise data-ink; remove decoration unless it carries brand/memory — say which [Tufte1983].
- **White space** groups and separates (proximity) and signals premium; don't fill every corner [Wagemans2012; craft].
- **Alignment:** one dominant alignment per layout (left for Thai/English reading; centred for short posters).
- **Contrast for text:** ≥ 4.5:1 normal, ≥ 3:1 large [W3C_WCAG21]; text over photos needs a calm area or a scrim.

## 4. Typography basics
| term | definition | rule of thumb |
|---|---|---|
| kerning | space between a specific pair of letters | fix visually in large Latin headlines (AV, To); Thai: never manually space clusters |
| tracking | uniform letter spacing | + for Latin caps (spaced TIME OPTIC wordmark), 0 for Thai body |
| leading (line-height) | baseline-to-baseline distance | Latin body 1.3–1.5; Thai body 1.5–1.7; Thai headline 1.25–1.4 [W3C-WCAG21-1.4.12 floor; craft] |
| measure | line length | 45–75 characters Latin body [Bringhurst2004 (bibliographic) as widely cited]; shorter on mobile |
| pairing | display + body faces | contrast in role, harmony in proportions; Thai+Latin by matched heights (THAI_TYPOGRAPHY rule 19) |
Brand: Archivo 700/800 headlines, Inter 400/500 body (`brand/tokens.css`).

## 5. Brand system (Time Optic)
Palette tokens (`brand/tokens.json`): Phthalo #123A29, Raisin #212121, Snow #FAFAFA, Peach #EFCF9C (single accent,
never body text — 1.43:1 on Snow), Timberwolf #D9D4CB, Pastel Gray #CFD0BF, green-on-dark #41996E. House rules
(CLAUDE.md): posts carry `brand/store-lineart.png` faint top-right; clips carry the moving TIMEOPTIC wordmark + the
frame brand's logo top-left and no line art; quote/story images 1:1 with no logo unless asked. Check every output
against the tokens, not memory [Wheeler2017; house rules].

## 6. Product & advertising
- **Product fidelity:** the real frame (shape, colour, logo, lens tint) must match the photo; composite real cut-outs or use Codex `-i` and compare. Never "improve" a product without permission.
- **Product photography language:** soft key at 45° + fill, gradient sweep background, clean highlights along rims, controlled lens reflections (move the key off-axis), contact shadow + reflection on the surface (LIGHTING_LIBRARY product_* / eyewear_lens_reflection_control).
- **Ad structure:** one message, one hero, one CTA; price large but below the product in hierarchy unless the price *is* the message.
- **Poster:** readable from 3 m — one image, ≤ 7 words headline, strong value contrast.
- **Editorial:** concept/metaphor over literal depiction (style editorial_conceptual).
- **Social:** first frame/slide must work at thumbnail size; carousels: slide 1 = hook, last = CTA/summary; consistent margins and type positions across slides.

## 7. Pre-export checklist
1. Hierarchy readable in 1 second at phone size. 2. Text proofread on the render (Thai checklist). 3. Contrast ≥ 4.5:1.
4. Safe zones (9:16 overlay). 5. Brand tokens and logo rules. 6. Product unchanged vs photo. 7. Artefacts (hands, lenses,
fake text). 8. Size/format/compression correct (PNG for flat graphics, high-quality JPEG for photos).
