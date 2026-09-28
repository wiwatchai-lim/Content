---
name: frame-kit
description: Pick a random in-stock frame (or the one the user names), pair a compatible lens + coating, and hand over a "kit" — the sharpest photos of every angle, transparent cutouts, the frame's style profile, and layered image prompts ready for Codex. Use when the user asks to pick/randomise a frame ("สุ่มแว่น", "สุ่มมา 3 ตัว"), wants frame photos/cutouts/layers ("ขอรูปแว่น", "ตัดพื้น"), or wants prompts for Codex ("ขอ prompt", "prompt ไปทำรูป"), or wants the kit turned into a 2.5D/AI-video clip ("ทำ 2.5D"). Beat clips (kinetic type cut to a song, "ทำคลิป") belong to the `beat-clip` skill. This is now the default job; `daily-post` is only for when the user explicitly asks for a finished post.
---

# Frame kit

The user (and a friend who uses the output) no longer wants finished posts from Claude. They want the **raw material**: a randomly picked frame with its data, clean photos from several angles, background-free layers, and a set of prompts they paste into Codex to make the images themselves. Talk to the user in Thai; prompts are in English (image models follow English best).

Never invent specs, colours or claims that are not in `data/`. Never upscale a photo to make it look "sharp" — sharp means the largest real file we have.

## Steps

1. **Pick** — `npm run pick` prints one random frame as JSON (verified photo only, not picked in the last 14 days, every photo ≥ 980px wide).
   - Options: `--brand Oakley`, `--angles 2` (only frames with ≥ 2 angles — prefer this, the user wants several angles), `--min-width 1500`, `--list` (show every candidate)
   - The user names a frame → use it, but still check its row in `data/frames/images/_check/*.csv`
   - "สุ่มมา N ตัว" → run it N times, skip duplicates, one kit per frame
2. **Pair a lens + coating** — follow the **Pairing rules** in `.claude/skills/daily-post/SKILL.md` exactly (same brand, `ใช้คู่กับ` lines win, never cross clear/sun/photochromic/kids/driving groups, sunglasses frames get no prescription lens). Pick at random among the valid pairs, varying brand between kits. The user may name either one.
3. **Build the kit** in `kits/YYYY-MM-DD_<model-slug>/`:
   ```
   photos/   original photos copied as-is (_1 front, _2 three-quarter, _3 side)
   layers/   transparent PNG cutouts, same names as photos/
   preview.html + export/preview.png   cutout check sheet
   kit.md    everything the user reads and copies
   ```
   - `cp data/frames/images/<Brand>/<Model>_* kits/<folder>/photos/`
   - `npm run cutout -- kits/<folder>/layers kits/<folder>/photos/<file> [...]`
   - `cp kits/_template/preview.html kits/<folder>/`, set `ANGLES` to the layer files and `data-height` to `40 + rows × 420`, then `npm run render -- kits/<folder>`. Delete `export/preview.psd` — it is not needed.
4. **Check the cutouts** — open `export/preview.png` with Read. Edges intact, no white halo on the grey tile, temples and nose pads not eaten, clear/transparent frames still visible. A cutout that fails → say so in `kit.md` and tell the user to use `photos/` for that angle (the user said: if the background can't be removed cleanly, don't remove it). Never hand over a broken cutout as if it were fine.
   - Silver, chrome, clear and rimless frames shot on white lose opacity in the cutout (their colour is close to the background): mark those layers "light backgrounds only", and in the prompts attach the original from `photos/` instead of the cutout
5. **Profile the frame** — open `photos/<model>_1` (and `_2`) with Read and describe what you actually see, plus the `_check` note:
   - shape (square, rectangle, round, panto/P3, oval, cat-eye, browline, aviator, geometric, wrap/sport)
   - rim (full-rim, semi-rimless, rimless) · material look (acetate, metal, titanium, TR90/nylon, combination) · colour and finish as seen (glossy/matte/transparent)
   - style tags, 2–4 of: classic, minimal, bold, retro, preppy, sporty, luxury, street, soft/feminine, business
   - who it suits (face shape, mood) — general styling wisdom, labelled as a suggestion, not a product claim
   - If `status` is `รุ่นตรง สีต่าง`, write that the photo's colour may differ from stock: prompts describe the frame by shape, never promise the colour
6. **Write the prompts** (see below) into `kit.md`.
7. **Log** — append `date,kit_folder,frame_sku,lens,coating` to `log/kits.csv` (create it with that header if missing). `npm run pick` reads it to avoid repeats.
8. **Report** in Thai: frame + style in one line, lens + coating in one line, the kit path, and anything that failed. Don't paste the prompts into chat — they live in `kit.md`.

## kit.md layout

```
# <Brand> <Model>
## ข้อมูลกรอบ        sku, status, source link, photos with pixel sizes, layers (and which ones failed)
## สไตล์             profile from step 5
## เลนส์ + coating   names, one-line Thai summary of each from data/ with the manufacturer's quoted wording, source links
## Prompts           the layered prompt set below, each in its own ```text block so it copies cleanly
## วิธีใช้กับ Codex   the command below with this kit's paths filled in
```

## Prompt set

Write **one layered set** and **two full-scene variants** per kit. Every prompt is specific to this frame: its shape, rim, finish and style tags drive the mood, the setting, the palette and the model's styling. A metal aviator and a chunky black acetate square must not get the same prompt with the name swapped.

Layers — each one makes a separate image the user stacks in Photoshop/Canva, so each asks for only its own subject:
1. **L1 background** — the set or backdrop only, no people, no product, no text. Leaves clear negative space where the glasses and headline go (say where: centre, left third, …). Palette chosen to flatter this frame's colour.
2. **L2 model** — person only, **not wearing glasses** (glasses come from the real photo), transparent or plain flat single-colour background so it cuts out cleanly. Age range, styling, pose, gaze and expression that fit the frame's style tags. Head angle matching one of the kit's photo angles (front for `_1`, three-quarter for `_2`) so the real frame can be placed on the face later.
3. **L3 product scene** — attach the cutout (`-i layers/<file>.png`) and ask for the real glasses placed in a scene/on a surface with a realistic contact shadow. Must say: *use the attached glasses exactly as they are — same shape, proportions, colour, temples and hinges; do not redesign, restyle or add logos*.
4. **L4 light & props** (optional) — light effects or props only on transparent: lens flare, reflections, sun shadow pattern, a prop that fits the lens story (e.g. a screen glow for a blue-light coating, a steering wheel blur for a driving lens).

Full scenes — one image with everything, the real product attached with `-i`:
- **S1 on-model** — the model wearing the attached glasses (same *use exactly as they are* sentence), lifestyle setting matching lens + coating use (screen work, outdoors, driving …)
- **S2 product hero** — glasses alone as the hero, studio or editorial still life

Clip shots — for the cinematic clip (refs in `refs/clips/1-cinematic/`, user guide `docs/clip-howto.md`):
- **C1 wide / C2 macro detail / C3 low hero** — one scene, one light, three camera positions; **vertical 9:16** and no text (type is added in the clip). C1 attaches the real photo; C2 and C3 attach the real photo **and** C1's result (`-i` twice) so the scene carries over
- **V** — ONE image-to-video prompt for CapCut AI (Seedance 2.5) that turns C1–C3 into a single 10 s vertical take: timed beats (0–3.5 s wide dolly-in like C1, 3.5–6.5 s push into the macro like C2, 6.5–10 s low arc ending on C3, hold the last second), one continuous camera move, atmosphere moves, the glasses stay still with their exact shape and colours restated, no cuts, no text. Write two variants: **A** for multi-image reference (C1, C2, C3 in order) and **B** for first frame C1 + last frame C3. Note: 9:16, 10 s, export as `gen/V.mp4`, regenerate any take where the frame warps

Every prompt ends with the same guard lines: square 1:1 (unless the user asked otherwise), photorealistic, no text, no logos, no watermark, no brand names; for people also: an original face that does not resemble any real person. Never ask the model to render lens or coating claims as text — the user adds text afterwards.

Mention in `kit.md` that S1, S2 and L3 redraw the product: check the result against `photos/` and reject it if the shape, bridge or temples changed, because a post must show glasses the shop really sells. L1 + L2 + the real cutout layer is the safe route.

## Clip (when the user asks, e.g. "ตัดคลิป", "ทำคลิป")

- Every clip: English-only text and the moving wordmark from the brand signature (no storefront line art in clips since 2026-09-25) in `.claude/skills/daily-post/SKILL.md`. A motion poster (style from `styles/`, layers animated, real cutout + a lens layer so the glasses don't look empty) is `kits/2026-09-21_ox8208-0552/motion.html` — build the lens mask by filling the holes of the cutout's alpha (padded, alpha > 40), save as `layers/<file>_lens.png`

- **`gen/V.mp4`** (or several takes V1…) → `cp kits/_template/clip.html kits/<folder>/`, fill in the title (`Brand × LensBrand`, lens · coating, model — from `kit.md`, never invented), adjust `SHOTS` if a take needs trimming, then `npm run video -- kits/<folder>` → `export/clip.mp4` (1080×1920, no audio — music goes on in CapCut)
- **Only C images, no V** (user says "ทำ 2.5D แทน") → depth-parallax per shot: `python tools/depth.py gen/C1.png` makes `C1_depth.png`; start from `kits/_template/clip-25d.html` (one shot, 1080×1080; set the canvas and body to 1080×1920 for vertical C images, retune `FOCUS` to the depth of the glasses, and replace the sample Ray-Ban title) — the glasses sit at the focus depth so they stay put while the background slides
- Check before handing over: contact sheet with ffmpeg (`fps=1.2,scale=216:-2,tile=7x2`) and Read it — crossfades clean, type readable, no baked-in text from the AI images colliding with ours
- Price or promo text only when the user gives it for that clip — ask, never reuse an old price

## Codex command

Each run uses the user's ChatGPT quota — **Claude never runs `codex exec` unless the user asks it to**, and then asks before each batch. The command the user (or Claude, when asked) runs from the project folder:

```
codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -o tmp/codex-last.txt "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached image as the product reference. Do not rewrite the prompt, do not generate variants. Reply with only the saved file path. PROMPT: <prompt>" -i "kits/<folder>/layers/<file>.png"
```
- `-i` takes several files, so it must come **after** the prompt (placed before, it swallows the prompt as an image path). C2/C3: `-i "<photo>" "kits/<folder>/gen/C1.png"`
- Drop `-i …` for L1, L2 and L4 (no product in those)
- Output lands in `%USERPROFILE%\.codex\generated_images\<session>\` (the sandbox can't write into the project) — copy it into `kits/<folder>/gen/`
- Model fallback and other gotchas: `data/models/README.md`
