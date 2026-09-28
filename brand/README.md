# TIMEOPTIC brand kit

One-page guide: `ci.html` (open it in a browser).

| File | Use |
|---|---|
| `logo/timeoptic.svg` | primary wordmark, light backgrounds — TIME in Phthalo Green, OPTIC in Raisin Black |
| `logo/timeoptic-white.svg` | dark backgrounds (Phthalo or Raisin Black) |
| `logo/timeoptic-black.svg` | one ink: black-and-white print, embossing |
| `logo/timeoptic-mono.svg` | inline in HTML, takes `currentColor` |
| `logo/png/*@2x.png` | 2520 × 400 raster, where SVG is not accepted |
| `tokens.css` | colour and type variables for post templates |
| `tokens.json` | the same values for scripts |
| `store-lineart.png` | white line art of the shop front (traced from `data/TimeOptic_store.png`), faint at the top right of every post and clip |

The SVGs were traced from `data/logo-TimeOptic-Original.png`; that PNG stays the archive master.

In a post template:

```html
<link rel="stylesheet" href="../../brand/tokens.css">
```

then use `var(--to-green)`, `var(--to-peach)`, `var(--to-margin)` instead of literal values.

Rules that layouts must keep: one green only (Phthalo `#123A29`), one accent per image,
72px margin on the 1080 × 1080 canvas, square corners, logo 150–190px in a fixed corner
per style, and never Peach-Orange as text on a light ground (1.4 : 1).
