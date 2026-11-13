---
name: flux-like-chatgpt
description: Redraw a ChatGPT/Codex picture with the free local FLUX (tools/flux.py img2img) so the result looks almost the same — same scene, pose, tone and pencil texture — without using ChatGPT quota. Use when the user wants a FLUX version that "looks like ChatGPT" ("เอาให้เหมือน ChatGPT", "ทำแบบ FLUX ให้เหมือน chat gpt", "ทำเวอร์ชันฟรี"), or says a FLUX picture is too jagged/streaky ("หยักเกิน", "ลายเยอะ").
---

# FLUX that looks like ChatGPT

Text-to-image FLUX alone never matched the Codex/ChatGPT look closely enough for the user (2026-11-13: "ยังไม่เหมือน"). What worked was **img2img**: give FLUX the ChatGPT picture as the starting image and let it redraw only a little.

Needs ComfyUI + FLUX set up (CLAUDE.md step 8.6). No quota, about 1–2 min per image on the RTX 3050.

## Steps

1. **Crop the reference the same way the page crops it.** Codex slides are 4:5 and the dialogue HTML shows the bottom square (`object-position: 50% 100%`), so cut the bottom square:
   ```
   python -c "import cv2; im=cv2.imread('slides/slide-06.png'); h,w=im.shape[:2]; cv2.imwrite('slides-flux/ref-06-sq.png', im[h-w:, :])"
   ```
   If the reference is not cropped first, `ImageScale` centre-crops it and the layout shifts.

2. **Run FLUX img2img** with a short prompt that describes the scene and asks for smooth shading:
   ```
   python tools/flux.py "A detailed graphite pencil drawing with sepia tone on warm beige textured paper, soft smooth shading, gentle smudged graphite, smooth round heads. <describe the scene in one or two sentences>. Quiet tender mood." slides-flux/k06.png --init slides-flux/ref-06-sq.png --denoise 0.2 --seed 11
   ```

3. **Pick the denoise:**
   | denoise | result |
   |---|---|
   | 0.2 | almost the same as ChatGPT, smooth lines — **the default the user approved** |
   | 0.35 | still the same scene but stripy, jagged strokes on heads and clothes ("หยักเกิน", rejected 2026-11-13) |
   | 0.45 | more redrawn, stripes stronger |
   | 0.6+ | drifts away from the reference |
   If the user still sees stripes, go to 0.15. If they want it to look less like a copy, go up, but warn that the lines get streakier.

4. **Point the page at the new image** (`<img class="art" src="slides-flux/...">` in `0N-flux.html`), render with `npm run render -- <kit folder>`, open the PNG with Read and compare it side by side with the ChatGPT version before showing the user.

5. Write which file and denoise each slide uses in the kit's `kit.md`.

## Notes
- This only works when a ChatGPT/Codex picture of the scene already exists. For a brand new scene with no reference, FLUX text-to-image gets only roughly close; tell the user that plainly. Recipe for that case: describe every object, add "fully shaded from edge to edge with rich grey mid-tones", then `python tools/charcoal_tone.py in.png out.png` for the paper tone (see `carousel/styles/charcoal-dialogue/style.md`).
- FLUX ignores "no …" phrases and draws a signature at the bottom right in text-to-image mode; img2img at low denoise keeps the reference clean.
- Worked example: `carousel/kits/2026-11-13_dialogue-quotes/` — slides 05, 07, 08 at 0.35 (`j0N.png`), slide 06 at 0.2 (`k06-d0.2.png`).
