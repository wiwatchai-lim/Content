# Master Knowledge — overview & map

What the skill knows, how strong the evidence is, and where the detail lives. Evidence keys → RESEARCH_SOURCES.md.

## 1. Seeing (perception)
- Gestalt grouping and figure-ground organise every image [Wertheimer1923, Wagemans2012, Vecera2002].
- Attention goes to local contrast (value, colour, orientation), faces and meaning; there is a centre bias; scan paths depend on task and cannot be predicted exactly [Itti1998, Parkhurst2002, Massaro2012, Tatler2007, Tatler2010].
- Value carries form and depth; equiluminant colour flattens [Livingstone2002 via Dupree2003].
- Depth = stacked agreeing cues; aerial perspective lowers contrast and shifts hue with distance [CuttingVishton1995, OShea1994].
- Placement evidence: centre preferred for single objects; inward bias for off-centre subjects; **rule of thirds and golden ratio have weak/mixed support** — they are layout tools, not beauty laws [Palmer2008, PalmerLab-Spatial, Amirshahi2014, McManus1980, Green1995].
- Judgement unfolds in stages and depends on context; individual taste varies [Leder2004, PalmerSchloss2013].
→ ART_FUNDAMENTALS.md, DRAWING_TECHNIQUES.md

## 2. Colour
Perceptual spaces (OKLab/OKLCH for building, CIELAB ΔE00 for measuring, linear RGB for maths); context changes appearance;
harmony evidence is for colour pairs; colour–emotion has a cross-cultural core plus cultural variation and is
context-dependent; WCAG contrast 4.5/3/7; ~8 % of European-descent men have red-green CVD
[Ottosson2020, W3C_CSSColor4, Sharma2005, OuLuo2006, SchlossPalmer2011, Jonauskaite2020, Ou2004, ElliotMaier2014, W3C_WCAG21, Birch2012, Machado2009].
→ COLOR_THEORY.md, COLOR_PALETTE_LIBRARY.json (204), tools/color_tools.py

## 3. Light & materials
Source size ↔ shadow softness; inverse-square fall-off; CCT ↔ mood is associative; Rayleigh/Mie scattering; Fresnel —
dielectrics white reflections, metals tinted; gloss perception needs consistent highlights; skin needs subsurface
scattering; composites need contact shadows/occlusion [Penumbra_SourceSize, HyperPhysics_InverseSquare, McCamy1992,
Fotios2017, Schlick1994, Burley2012, Fleming2014, Jensen2001, Zhukov1998, Landis2002, Cavanagh2005 (glass/transparency)].
→ LIGHTING_LIBRARY.json (51), DRAWING_TECHNIQUES §7

## 4. Styles & history
102 styles described by traits (medium, line, shape, colour, light, texture, composition, emotion) with history from
museum glossaries where opened (Tate, V&A, National Gallery, Thai mural sources); no copying of specific works; no
living artists or studio brands in prompts; style itself isn't protected by US copyright but imitation of living
creators raises concerns [Tate-*, NG-*, VA-Ukiyoe, ThaiEmbassy-Murals, USCO2025-Part3]. → ART_STYLE_LIBRARY.json

## 5. Emotion → image
114 states, each with ≥ 3 different approaches (composition, palette, light, camera, expression, body, environment,
metaphor, symbolism); never one colour or angle per emotion; Thai cultural notes. Mostly craft. → EMOTION_VISUAL_LIBRARY.json

## 6. Characters, environments, stories
Silhouette and shape language (craft), baby-schema levers for cute [Lorenz1943, Glocker2009], uncanny valley [Mori2012],
expressions as muscle actions [EkmanFriesen1978, Faigin1990]; landmarks and edges for orientation [Lynch1960];
closure and panel transitions [McCloud1993]; contrast/affinity for intensity [Block2008]; shot grammar [Mascelli1965].
→ CHARACTER_DESIGN.md, CHARACTER_BIBLE_TEMPLATE.md, ENVIRONMENT_DESIGN.md, VISUAL_STORYTELLING.md

## 7. Graphic design & Thai type
Two-layer rule (plate + HTML type); grids, hierarchy, layer-cake for text-heavy slides; platform safe zones; Thai
stacked marks need line-height 1.5–1.7; set `lang="th"`, control breaks, proofread renders; looped vs loopless by
context [MullerBrockmann1981, NNG-Pernice2017/2019, Meta-ReelsAds, MS-ThaiOpenType, W3C-ThaiLreq2026, MangasAfonso2025].
→ GRAPHIC_DESIGN.md, THAI_TYPOGRAPHY.md

## 8. Generation
Diffusion / rectified-flow models; FLUX schnell: 1–4 steps, CFG 1 → no negative prompts, ≤ 256 T5 tokens, natural
sentences, seeds matter, weak counting/spatial binding/text; Apache-2.0 for schnell only; img2img keeps layout at low
denoise; real products need compositing or reference-image editing [Ho2020, Rombach2022, Esser2024, BFL-FluxSchnellCard,
HF-DiffusersFlux, LiuChilton2022, Huang2023, Cho2023, Ruiz2023, Zhang2023, Ye2023, OpenAI-ImageGen].
Learned in this project's real test (2026-11-24): photo-lens words pull illustration styles toward 3D renders;
naming an unwanted object ("no lamp") summons it — remove the word entirely; fake signs/signatures appear in shop
scenes — inpaint or re-roll.
→ IMAGE_PROMPT_ENGINE.md, IMAGE_PROVIDER_ADAPTERS.md, EXAMPLES.md (239 templates)

## 9. Judging
Located critique with severity and side effects; purpose-weighted 100-point score; automatic aesthetic scores only
pre-sort batches (trained on photo-contest taste, circular with SD training), CLIPScore/PickScore/HPS measure prompt
match or pooled preference, FID is for model comparison [Talebi2018, LAION2022, Hessel2021, Kirstain2023, Wu2023,
Xu2023, Heusel2017]. Real viewers decide; AI scores are judgements. → IMAGE_CRITIQUE_ENGINE.md, tools/score.py

## 10. Known gaps
No ControlNet/IP-Adapter/LoRA installed; no automatic aesthetic model installed; reference database entries were
analysed from catalogue text (images not viewed); Thai typography evidence is thin (conflicting looped/loopless
findings); most emotion and style guidance is craft; Met essays were rate-limited during research.
