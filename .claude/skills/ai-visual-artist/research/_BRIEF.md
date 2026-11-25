# Shared brief — ai-visual-artist skill

Skill folder: `C:\timeoptic-content\.claude\skills\ai-visual-artist\`. Project: Time Optic, a Thai eyewear shop's
content studio. Real outputs: IG/FB posts and carousels (1:1, 4:5), Reels/TikTok (9:16), story clips (16:9 cartoon
"ร้านแว่นตีสอง", charcoal/pencil story carousels "Slowly Growing", line-art dialogue images), promo images with real
frame photos, kits with Codex prompts. Image tools that really exist here: **local FLUX.1 schnell** via ComfyUI
(`tools/flux.py`, free, RTX 3050 6 GB, ~1–2 min/1024², supports img2img `--init --denoise`), **Codex image
generation** (ChatGPT plan quota — must ask the user first; can attach reference photos with `-i`), **HTML → PNG
renderer** (`npm run render`, Chrome; all text/logos/Thai typography live in this layer, images are generated
text-free). Brand: `brand/tokens.json` — Phthalo Green #123A29, Raisin Black #212121, Snow #FAFAFA, Peach #EFCF9C
(accent only), Timberwolf #D9D4CB, Pastel Gray #CFD0BF; fonts Archivo (display), Inter (body); Thai fonts used in
project: Sriracha, Noto Sans Thai, Mitr, Mali, Itim, Prompt. Existing craft notes worth reading for context (do not
copy blindly): `story-clips/_craft/curriculum/01..12-*.md` (photography, lens, composition, lighting, storyboard, AI
image prompts, edit/grade, QC), `story-clips/_craft/STYLES.md`.

## Honesty rules (every file)
- Never invent a reference. Cite only what you found; say what you accessed (full text / abstract / publisher page /
  museum page / book listing only). A book you only saw listed is "bibliographic only" — never claim to have read it.
- Separate **evidence** (perception science, colour science, standards, documented history) from **craft** (artistic
  practice, taste). Label craft as `Artistic`.
- Art "rules" are tools chosen by purpose, never formulas. Every library entry offers alternatives.
- Styles: describe characteristics of movements/techniques; never instruct to copy a specific artwork or a living
  artist's signature style; no living artists' names in prompt templates.

## Citation keys (verify; research agents add more, format AuthorYear or Org-Doc)
| key | reference |
|---|---|
| Arnheim1974 | Arnheim, Art and Visual Perception: A Psychology of the Creative Eye (new version 1974), Univ. of California Press |
| Wertheimer1923 | Wertheimer 1923, Untersuchungen zur Lehre von der Gestalt II, Psychologische Forschung 4, 301–350 |
| Wagemans2012 | Wagemans et al. 2012, A century of Gestalt psychology in visual perception I, Psych. Bulletin 138(6) 1172–1217, doi:10.1037/a0029333 |
| Livingstone2002 | Livingstone, Vision and Art: The Biology of Seeing (2002), Abrams |
| Itti1998 | Itti, Koch & Niebur 1998, A model of saliency-based visual attention for rapid scene analysis, IEEE TPAMI 20(11), doi:10.1109/34.730558 |
| Yarbus1967 | Yarbus, Eye Movements and Vision (1967), Plenum |
| Albers1963 | Albers, Interaction of Color (1963), Yale UP |
| Itten1961 | Itten, The Art of Color (Kunst der Farbe, 1961) |
| Fairchild2013 | Fairchild, Color Appearance Models (3rd ed. 2013), Wiley |
| Ottosson2020 | Ottosson 2020, A perceptual color space for image processing (OKLab), blog https://bottosson.github.io/posts/oklab/ |
| ElliotMaier2014 | Elliot & Maier 2014, Color psychology: effects of perceiving color on psychological functioning in humans, Annual Review of Psychology 65, 95–120, doi:10.1146/annurev-psych-010213-115035 |
| W3C_WCAG21 | W3C WCAG 2.1 (2018), contrast success criteria 1.4.3 / 1.4.11 |
| Loomis1943 | Loomis, Figure Drawing for All It's Worth (1943) |
| Gurney2010 | Gurney, Color and Light: A Guide for the Realist Painter (2010) |
| MullerBrockmann1981 | Müller-Brockmann, Grid Systems in Graphic Design (1981) |
| Bringhurst2004 | Bringhurst, The Elements of Typographic Style (3rd ed. 2004) |
| McCloud1993 | McCloud, Understanding Comics (1993) |
| Block2008 | Block, The Visual Story (2nd ed. 2008) |
| Ho2020 | Ho, Jain & Abbeel 2020, Denoising Diffusion Probabilistic Models, arXiv:2006.11239 |
| Rombach2022 | Rombach et al. 2022, High-Resolution Image Synthesis with Latent Diffusion Models, CVPR, arXiv:2112.10752 |
| Zhang2023 | Zhang, Rao & Agrawala 2023, Adding Conditional Control to Text-to-Image Diffusion Models (ControlNet), ICCV, arXiv:2302.05543 |
| Talebi2018 | Talebi & Milanfar 2018, NIMA: Neural Image Assessment, IEEE TIP 27(8), doi:10.1109/TIP.2018.2831899 |
| Artistic | practitioner / art-direction craft, not a research finding |

## Shared ids
- Emotions: `research/_emotion_ids.txt` (108 ids shared with the ai-voice-director skill, e.g. sadness.melancholy) +
  visual-only ids: visual.mystery, visual.warmth, will.courage, visual.peaceful_solitude, visual.majesty, visual.coziness.
- Aspect ratios: 1:1, 4:5, 9:16, 16:9, 3:2, 2:3, 21:9, web_banner (e.g. 1200×628), print poster (A-series).

## Fixed id lists (every library and every example/test must use exactly these)
**Composition (30):** rule_of_thirds golden_ratio golden_spiral leading_lines symmetry asymmetrical_balance radial
triangular diagonal center negative_space frame_within_frame layered_depth subject_isolation visual_weight_counterbalance
figure_ground s_curve_flow repetition_rhythm scale_contrast pattern_break odd_grouping z_pattern f_pattern flatlay_grid
over_shoulder dominant_foreground low_horizon high_horizon vignette_tunnel split_screen

**Lighting (51):** three_point key_fill_soft broad short butterfly loop rembrandt split clamshell rim_only backlit_silhouette
high_key low_key chiaroscuro tenebrism golden_hour blue_hour overcast_soft midday_hard window_side north_window
practical_lamp candle_fire neon_night streetlight_sodium moonlight_blue volumetric_god_rays fog_atmospheric underwater_caustics
dappled_foliage spotlight_theatrical top_light under_light_horror cross_light bounce_fill_warm ambient_occlusion_only
global_illumination_interior product_softbox product_gradient_sweep product_backlit_glass jewelry_specular
eyewear_lens_reflection_control flat_cartoon_cel two_tone_anime_shade storybook_soft_glow noir_venetian
sunset_rim_warm_cool screen_glow_face lightning_flash snow_bounce stage_colour_gels

**Art styles (100):** see the list in the agent prompts; ids are lowercase_snake (e.g. watercolor_loose, storybook_gouache,
charcoal_expressive, manga_bw_screentone, flat_vector, isometric_3d, claymation, photoreal_product, cinematic_realism,
luxury_commercial). Read ART_STYLE_LIBRARY.json once it exists.

**Palettes:** ids `pal.<slug>`; always includes `pal.brand_timeoptic` (Phthalo #123A29, Raisin #212121, Snow #FAFAFA,
Peach #EFCF9C, Timberwolf #D9D4CB). Jobs may also say `brand` or `custom`.

**Art style ids (102), in this order — part 1 = first 51, part 2 = last 51:**
watercolor_loose watercolor_botanical gouache_flat storybook_gouache oil_painting_classical oil_impasto acrylic_bold
pastel_soft pencil_graphite_realistic pencil_sketch_loose colored_pencil charcoal_expressive charcoal_academic
ink_pen_crosshatch ink_brush_sumi_e ink_line_clean woodcut_print linocut etching_engraving risograph screenprint_poster
collage_mixed_media papercut_layered embroidery_textile mosaic renaissance_realism baroque_dramatic romanticism_landscape
impressionism post_impressionism pointillism expressionism fauvism cubism art_nouveau art_deco bauhaus_modernist
constructivism surrealism pop_art op_art minimalism abstract_expressionism ukiyo_e_woodblock thai_traditional_mural
chinese_gongbi persian_miniature folk_art_naive vintage_comic_halftone manga_bw_screentone anime_cel
anime_painterly_bg chibi_kawaii western_cartoon_rubberhose modern_cartoon_tv webtoon_digital graphic_novel_noir
editorial_conceptual children_book_crayon line_art_minimal one_line_drawing sketchnote_doodle technical_blueprint
botanical_scientific fashion_illustration tattoo_flash pixel_art low_poly digital_painting_painterly concept_art_fantasy
concept_art_scifi matte_painting isometric_3d flat_vector flat_illustration_corporate gradient_glassmorphism claymation
stop_motion_felt toy_3d_render stylized_3d_animation cel_shaded_3d voxel paper_craft_3d architectural_visualization
interior_render photoreal_product photoreal_lifestyle cinematic_realism film_noir_photo analog_film_35mm polaroid_instant
documentary_photo fashion_editorial_photo luxury_commercial macro_photography double_exposure vaporwave_retro synthwave
cyberpunk_neon steampunk dark_fantasy_gothic solarpunk
