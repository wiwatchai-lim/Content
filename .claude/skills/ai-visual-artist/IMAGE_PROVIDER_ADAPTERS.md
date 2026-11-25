# Image Provider Adapters

Only tools that really exist in this project. Facts about models come from research/R4_ai_eval_styles.md (keys in
RESEARCH_SOURCES.md); facts about how this project runs them come from its own scripts and notes. `tools/build_prompt.py`
turns a Visual Job into each provider's input.

| provider | what it is here | cost | sees reference images? | text in image | best for | weak at |
|---|---|---|---|---|---|---|
| **flux_local** | FLUX.1 [schnell] GGUF Q4 in ComfyUI, `tools/flux.py` (RTX 3050 6 GB, ~1–2 min / 1024²) | free, no quota | only as img2img init (`--init ref.png --denoise 0.3–0.7`): keeps layout/colours, redraws details | not used (HTML layer) | backgrounds, scenes, moods, style studies, story frames, iterations | exact product shapes, readable text, precise hands/counting, keeping a character identical across images |
| **codex** | Codex CLI → built-in `image_gen` (OpenAI image model), command in `data/models/README.md` / frame-kit skill | ChatGPT plan quota — **ask the user before every batch** | yes, `-i file.png` (product/person reference) | possible but never trusted for Thai — HTML layer | scenes that must include the real frame or a model wearing it, high-finish key visuals | cost; can still alter a product — always compare with the photo |
| **html_render** | `npm run render` (Chrome) — HTML/CSS layers → PNG (+PSD) | free | composes real photos/cut-outs exactly | **yes — all text, Thai typography, logos, prices** | posts, carousels, layouts, brand assets, exact product fidelity | painterly imagery (use as a layer under the type) |

## 1. FLUX.1 [schnell] (local)
Documented facts [BFL-FluxSchnellCard, HF-DiffusersFlux, BFL-FluxRepo, BFL-Launch2024, HoSalimans2022]: timestep-
distilled for 1–4 steps, run with guidance 0 (Diffusers) / cfg 1.0 (this project's ComfyUI workflow: 4 steps, euler,
zeroed negative) → **negative prompts have no effect** (they need true CFG > 1) — write constraints positively
("clean empty tabletop", "hands relaxed at her sides"); T5 prompt capped at **256 tokens** in Diffusers → keep prompts
to a few sentences (≈ 60–180 words) with the important content first; prompt following depends on prompting style —
plain natural sentences beat tag soup; stay within 0.1–2.0 MP (≈ 1 MP at the target aspect, then crop/upscale);
**only schnell (+VAE) is Apache-2.0** — FLUX dev / Kontext / Canny / Depth weights are non-commercial, don't add them
for shop content without a licence. Seeds change quality a lot → 3–9 seeds before rewriting [LiuChilton2022].
Counting, attribute binding and spatial relations stay weak [Huang2023, Cho2023] → lay out in HTML or composite.
Practice in this project (`tools/flux.py`, `flux-like-chatgpt` skill, LEARNING-LOG): sizes in multiples of 64
(1024², 896×1120, 768×1344, 1344×768); FLUX sometimes adds fake watermark text → inpaint (cv2.inpaint) or re-roll;
img2img keeps the source lighting (it cannot turn night into day); seeds make takes reproducible.
Prompt shape: 60–180 words of natural sentences, subject first, then composition/camera, setting, light, palette,
texture; one idea per sentence (IMAGE_PROMPT_ENGINE.md).
Layout control without ControlNet: (1) sketch or block the layout in HTML/any drawing, render it, use it as
`--init` with denoise 0.55–0.75; (2) generate wider than needed and crop to the blueprint; (3) composite the subject
layer in HTML.
Command: `python tools/build_prompt.py job.json --generate out.png --count 2 --seed 7`.

## 2. Codex image_gen
Run only after the user agrees (quota). Use the cheapest controller model with reasoning low and pass the prompt
verbatim (`data/models/README.md`). For products: attach the cut-out/photo with `-i` and state the locked details
("keep the frame exactly as in the photo: shape, colour, temple logo, lens tint"). Background runs need `< /dev/null`.
Output lands in `%USERPROFILE%\.codex\generated_images\<session>\` → copy into the kit. After generation compare the
product region with the photo (IMAGE_CRITIQUE_ENGINE.md → product fidelity); if it changed, composite the real photo.
`python tools/build_prompt.py job.json --provider codex` prints the brief and the files to attach.

## 3. HTML render (layout + typography)
Text, logos, prices, Thai copy, brand lines and exact product photos are always placed here (fonts and tokens in
`brand/tokens.css`; Thai fonts in THAI_TYPOGRAPHY.md). The generated image is a background or a layer. This is also
how a product stays unchanged: cut-outs from `tools/cutout.mjs` / frame kits are composited, not redrawn.

## 4. Choosing
- Exact product, exact logo, any text → html_render (+ image layer).
- Mood/background/story scene → flux_local first (free iterations), codex only if quality or a reference is required.
- Product inside a generated scene → codex with `-i`, then verify; fallback: flux scene + composited real cut-out with
  matching light direction and contact shadow (LIGHTING_LIBRARY → product_* entries).
- Consistent characters across frames → the cartoon rig (story-clips/_craft/rig.js) or one approved reference image
  reused with img2img / Codex `-i`, plus the Character Bible; never trust text-only prompts for identity.

## 5. What is NOT available here
No ControlNet / IP-Adapter / LoRA training is installed (R4 describes them; installing them in ComfyUI is possible
later). No automatic aesthetic model (NIMA/LAION) is installed; `tools/analyze_image.py` gives measurable indicators
only.
