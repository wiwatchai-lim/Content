# Color Theory — science + practice

Tags: [finding: keys] (research/R2_color_light.md, RESEARCH_SOURCES.md) · [craft]. Tool: `tools/color_tools.py`.

## 1. Describing colour
| term | meaning | note |
|---|---|---|
| hue | position on the colour circle (red, yellow…) | in OKLCH `h` (degrees) |
| saturation / chroma | colourfulness; distance from grey | OKLCH `C`; HSL "S" is NOT perceptual |
| value / lightness | light–dark | OKLCH `L` ≈ perceived lightness; WCAG uses relative luminance for contrast |
| temperature | warm (red-yellow) vs cool (blue-green) feel | the most robust colour-emotion axes are warm–cool, heavy–light, active–passive [finding: Ou2004] |

## 2. Colour spaces — use the right one
| space | what it is | use for | refs |
|---|---|---|---|
| sRGB (hex) | device encoding (gamma-encoded) | storage, CSS, files | IEC61966_2_1 |
| linear RGB | sRGB with the transfer curve removed | **all maths**: blending, luminance, CVD simulation | IEC61966_2_1, W3C_WCAG21, Machado2009 |
| HSL / HSV | RGB re-parameterised as hue/sat/light | UI colour pickers only — equal L ≠ equal perceived lightness | Smith1978 |
| CIE XYZ / CIELAB (D65) | CIE standard, roughly perceptual | **measuring** differences (ΔE00) e.g. brand-colour drift | CIE15_2018, Sharma2005 |
| OKLab / OKLCH | modern perceptual space (Ottosson 2020), in CSS Color 4 | **building** ramps, tints, gradients, harmonies (hold h, step L/C); stable blues | Ottosson2020, W3C_CSSColor4 |
`color_tools.py info "#123A29"` prints all of them. Gradients/ramps: interpolate in OKLab (CSS default).

## 3. Harmony schemes (choose by purpose, never by trend)
| scheme | build (in OKLCH) | effect | risk |
|---|---|---|---|
| monochromatic | one hue, steps in L and C | calm, elegant, cohesive | dull — add value contrast or one texture |
| analogous | hues within ~±30–40° | natural, warm/cool mood | low emphasis — make the focal point the value extreme |
| complementary | +180° | strongest hue contrast, vibrancy | vibration at equal lightness; let one dominate |
| split-complementary | +150° / +210° | contrast with less tension | — |
| triadic | +120° / +240° | playful, energetic | chaos — mute two |
| tetradic | 4 hues | rich | hard to balance |
| neutral + accent | greys/beiges + one saturated hue | premium, editorial, product focus | accent overuse |
Evidence: harmony judgements for colour **pairs** rise with hue similarity; preference leans on lightness contrast
and liked component colours [finding: OuLuo2006, SchlossPalmer2011] — evidence is for patches, weaker for whole
images. Preference follows object associations (sky blue vs rot brown) [finding: PalmerSchloss2010] → context beats
the wheel. `color_tools.py harmony "#hex" triadic` generates candidates; then judge in the composite.

## 4. Proportion (60-30-10 and alternatives)
60-30-10 (dominant / secondary / accent) is a decorating heuristic of unknown origin [Unverified_60_30_10; Artistic].
Use it as one option: single accent on neutrals (90/10), analogous wash (70/20/10), duotone (50/50 split by value).
`analyze_image.py` reports the top-3 colour shares so you can see the real split.

## 5. Context effects
Same colour looks different on different grounds (simultaneous contrast) and under different adapting light
(constancy/adaptation) [finding: Chevreul1839, Land1977, Fairchild2013; craft: Albers1963]. → Judge brand colours
inside the final composite, not as swatches. Itten's seven contrasts (hue, light-dark, cold-warm, complementary,
simultaneous, saturation, extension) are a useful vocabulary: name the contrast that carries each image
[Itten1961 bibliographic; craft].

## 6. Colour and emotion — how strong is the evidence?
- Cross-cultural core of colour–emotion associations is strong (r ≈ .88 across 30 nations) **with** real national and
  linguistic variation; data are colour *words*, not images [finding: Jonauskaite2020].
- The robust dimensions are warm–cool, heavy–light, active–passive, hard–soft [finding: Ou2004].
- Applied claims ("red increases sales") are early-stage, partly unreplicated — never state them as facts in briefs
  [finding: ElliotMaier2014].
- Thai/Asian context [craft, culturally documented practice]: white and black for mourning/funerals; red and gold for
  Chinese New Year prosperity; colours of the days of the week (e.g. yellow Monday) carry royal and personal
  associations — use respectfully; avoid saffron-monk orange + temple imagery in ads.
→ EMOTION_VISUAL_LIBRARY.json always gives several palettes per emotion.

## 7. Accessibility
- Text contrast (WCAG 2.1): **4.5:1** normal text, **3:1** large text (≥ 18 pt / 14 pt bold), **7:1** AAA; meaningful
  non-text (icons, CTA pill borders, logos as information) **3:1** [finding: W3C_WCAG21].
- Formula: L = 0.2126 R + 0.7152 G + 0.0722 B on linearised channels; ratio = (L1 + 0.05)/(L2 + 0.05).
  `color_tools.py contrast fg bg`. Text over photos: test the lightest local area or add a scrim.
- APCA / WCAG 3 contrast is a draft — do not cite it as a standard [finding: W3C_WCAG3_WD].
- Colour-vision deficiency: ~8 % of men of European descent (4–6.5 % of Chinese/Japanese men) have red-green CVD
  [finding: Birch2012]. Never encode meaning by red vs green alone; simulate with `color_tools.py cvd` (Machado2009).
- Brand check: Peach #EFCF9C on Snow = 1.43:1 → accent only, never text (matches brand/tokens.json rule);
  Snow on Phthalo = 12.1:1 (AAA).

## 8. Colour temperature of light
Low CCT (2000–3200 K) reads as evening, candle, cosy; 5000–6500 K daylight; > 7000 K cool, blue-hour, clinical. This
mood link is associative/cultural; lab evidence that CCT drives pleasantness is weak (Kruithof not supported)
[finding: McCamy1992, Fotios2017]. Warm key + cool fill/ambient is a strong depth device [Artistic]. → LIGHTING_LIBRARY.json.

## 9. Workflow
1. Start from purpose + audience + brand (brand jobs: `pal.brand_timeoptic` or a derived variant).
2. Pick a scheme and a palette from COLOR_PALETTE_LIBRARY.json (150+) or build in OKLCH.
3. Assign roles (background, primary, secondary, accent, text) and proportions.
4. Check contrast + CVD (`color_tools.py palette <id>`).
5. Generate; then measure the result (`analyze_image.py` dominant colours) and judge in context.
