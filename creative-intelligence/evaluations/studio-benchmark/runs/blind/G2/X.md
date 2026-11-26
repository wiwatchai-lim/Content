Files consulted: [hidden for blind judging]

# 15 s beat clip — titanium half-rim frame (TIME OPTIC)

**Before building:**
- **Price:** none was given, so I ask the user once in Thai whether they want a price or promo. Until they answer, the clip has **no price and no promo text**.
- **Frame:** the exact model and colour must be a stock row in `data/frames/frames-stock-*.csv`, with verified photos (front `_1`, three-quarter `_2`, side `_3`, ≥ 980 px).
- **"Titanium":** this word appears on screen only if the maker's data/spec says titanium. Otherwise the type says "HALF-RIM" (what is visible), never "lightweight / feather-light" unless that is the maker's wording.
- **Lens and coating:** paired by the daily-post pairing rules (same brand, `ใช้คู่กับ` lines win). Names are taken from `data/lenses`/`data/coatings` exactly.

**Format and look:**
- 1080×1920, `hyperframes@0.8.59`, GSAP 3.14.2. Start from a copy of an approved kit's `hf/index.html` (privatejet machinery: `B`, `b(n)`, `bounceIn`/`hop`/`bounceOut`, `whip`, the letter-slice wordmark with the shine).
- Mood **minimal / luxury**: light warm-grey studio ground with faint wall lines and a soft floor shadow, thin white rings pulsing on the beat. Calm, so the thin titanium line stays visible; dark grounds hide a silver metal frame.
- Type: Archivo (mega, letters) + Inter (spec lines), dark graphite type.
- Frame brand logo top-left (left 64, top 64, explicit width and height) for the whole clip.

**Song (for the user to add in TikTok):** *Silent Desire* (90.8 BPM, moody minimal R&B, luxury; last used 2026-09-25, so not recent). Alternative: *Late Night Loops* (80.7, unused). With B = 60/90.8 = 0.661 s, 22 beats = 14.5 s plus a 0.5 s hold = **15.0 s**. `song_start` is set with librosa so the drop lands on **b4 (2.64 s)**. The upload file carries SFX only.

## Shot list

| beats | time (s) | shot / motion | on-screen text (English, from data only) | SFX (clip-audio.json) |
|---|---|---|---|---|
| b0 | 0.00–0.66 | **Hook:** macro on the hinge and temple joint, where the titanium join is cleanest. Slammed in: over-scale 1.25 → 1.0, blur 12 → 0 px, white flash, snapping to rest in 0.15 s; small shake | — | impact-bass-1 @0.00 |
| b1–b3 | 0.66–2.64 | Hard cut on b1 to macro of the **upper rim (brow line)** gliding 3%. Hard cut on b2 to the **open lower lens edge**, the half-rim signature, with a light glint sweeping the bevel | b1: `HALF-RIM` letters bounceIn (y≈760) · b3: `TITANIUM` (only if in data) | click-soft @0.66, 1.32; whoosh-short @2.40 |
| b4 | 2.64–3.30 | **Drop:** whip zoom out to the full **front cutout + lens layer**, big and centred (y 600–1300); bop on b4 | brand name (mega) + model code chip `<MODEL-COLOUR>` | whoosh @2.55, impact-bass-2 @2.64 |
| b5–b8 | 3.30–5.95 | **Detail punch-ins, one per beat:** b5 nose pads, b6 temple tip, b7 hinge screw, b8 bridge. Each is a mask reveal from a different side (L, R, up, iris) so the moves don't repeat | `THE LENS` (b5) → `<lens name>` (b6) → one maker line (b7–8), letter hop on beats | click-soft each beat |
| b9–b12 | 5.95–8.59 | Background shifts to a slightly cooler grey (wipe). The **three-quarter cutout** glides in from the right, sways ±2° on beats; a soft light sweep across the lens on b11 | `THE COATING` + `<coating name>` + spec chip from the maker's wording | whoosh-short @5.90, sparkle @7.27 |
| b13–b16 | 8.59–11.23 | **Side view** teleports in (warp-scale cut) to show the thin profile and temple length; on b15 a quick macro of the temple tip from the side; back to the side view on b16 | `<BRAND> <MODEL>`; if several stock colours exist, a quick 3-colour line-up instead (one per beat) | glitch-1 @8.59 (soft), pop @9.91 |
| b17 | 11.23–11.89 | Front cutout returns small at the centre, the veil rises | — | riser @11.0 |
| b18–b22 | 11.89–14.54 | **End card:** TIMEOPTIC wordmark (colour version on the light ground, TIME–OPTIC gap) pushes up to the centre big, letters hop on b19–b21, shine sweep on b21; glasses sit under it | `Time Optic` (Hua Hin line only if the user wants it) | chime @13.22, sparkle @13.88 |
| hold | 14.54–15.00 | Hold the end card, no motion | — | fade out |

**Rules applied:**
- Every text block and logo stays inside the safe zone x 60–940, y 220–1480, with key type in y 300–1400. The wordmark stays above y 1480.
- No storefront line art. English only.
- Lens layer on each cutout so the lenses don't look empty.
- Glasses never upscaled past their real pixels; detail shots crop from the largest real file.

## Sound plan
- **Upload file:** SFX only (cues above). **Preview file:** song + SFX for the user to judge (`tools/beat-audio.py` makes both).
- SFX come from the HyperFrames sfx folder and sit under the music feel: impacts only on the hook and the drop, soft clicks on punch-ins, no SFX at all during the wordmark hold except the chime.
- Mix target about −14 LUFS integrated, true peak ≤ −1.5 dBTP (limiter on the master so impacts don't clip). Short fade-out.
- `caption.md` gives the TikTok sound name and the start time.

## Checks before delivery
1. **Data:** stock row, colour and photos verified. Every word on screen traced to `data/` (titanium, lens, coating); no price.
2. **Cutouts:**
   - Thin metal shot on white often turns semi-transparent. Check alpha percentiles (median < ~230 → boost alpha and rebuild the colour from the original).
   - Check `export/preview.png` on grey: temples and pads intact, no halo.
3. **Lens layer:** the usual "fill the alpha holes" mask **fails on a half-rim** because the lens bottom is open, so the hole doesn't close. Close the contour along the lens bevel (draw the bottom edge from the photo, or take it from the photo's lens edge), then dilate 5 px. Check that the lens tint doesn't spill below the real edge.
4. `npx hyperframes@0.8.59 check` → 0 errors. Logo `<img>` has width and height.
5. **Contact sheet:** one frame per beat with the red safe-zone box (`drawbox=x=60:y=220:w=880:h=1260`), plus frames at 0.00, 0.15 and 2.64 s, all read with Read. Check that:
   - the hook frame is the most striking frame;
   - type is readable and doesn't overlap;
   - glasses are sharp;
   - backgrounds are calm;
   - the motions differ from the previous clip.
6. **Retention review:** frame 0 has one focal point; by 3 s the viewer knows it's a new frame from this brand; something new every beat; understandable with the sound off.
7. **Audio:** measure LUFS and true peak with ffmpeg `ebur128`. I can't hear it, so I tell the user and ask them to listen to the preview.
8. **Hand-over:** `kit.md`, `caption.md` (title, sound + start, short English caption from data, hashtags), `log/kits.csv`, a "used for" line in `songs.md`, open the preview, and report in Thai what is uncertain.
