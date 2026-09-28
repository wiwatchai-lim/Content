---
name: eye-break-clip
description: Make the 15-second "eye break" clips (close your eyes, follow a voice through neck stretches) for TikTok/Reels, in the two approved looks — the person version (a real staff member doing each pose) and the nature version (calm nature footage, almost no text, the voice leads). Use when the user asks for "คลิปหลับตา", "คลิปพักสายตา", "คลิปพักสายตา 15 วิ", "คลิปยืดคอ", "eye break", "neck break", "เวอร์ชันมีคน", "เวอร์ชันธรรมชาติ", a new nature scene ("ทำแบบทะเล/ภูเขา/เมฆ/ปู …"), a new staff member, or captions for these clips. Glasses beat clips belong to `beat-clip`.
---

# Eye-break clip (15 s)

A vertical 1080×1920 follow-along clip: the viewer closes their eyes and a calm voice leads them through six neck moves, then "Open your eyes" and the TIMEOPTIC wordmark. Unlike beat clips, the **sound is part of the upload file** (voice + tick or nature sound); the user posts it with the original sound on. Talk to the user in Thai, short. Everything on screen, the voice and the captions are **English**.

Everything needed is in this file and in the reference kit; nothing depends on Claude's memory on the owner's machine.

## The reference (watch it before the first clip on a machine)

Kit `kits/2026-09-26_neck-break/`. The approved, posted renders are in its `export/`:

| Look | Render | Source |
|---|---|---|
| Person (staff 1) | `neck-break-15_staff_en.mp4` | `hf15-photo/` (stills in `assets/staff/`) |
| Person (staff 2) | `neck-break-15_staff2_en.mp4` | `hf15-photo2/` |
| Nature: ocean | `neck-break-15_ocean_en.mp4` | `hf-ocean/` + `ocean/ocean_long.mp4` |
| Nature: crab | `neck-break-15_crab_en.mp4` | `hf-crab/` + `crab/` |
| Nature: mountain | `neck-break-15_mountain_en.mp4` | `hf-mountain/` + `mountain/` |
| Nature: clouds | `neck-break-15_clouds_en.mp4` | `hf-clouds/` + `clouds/` |

Posted captions: `export/captions.txt`. Also in the folder but **not** the approved looks: cartoon versions (`hf15-en`, `hf15-girl`), the older 20 s Thai/English versions (`hf`, `hf-en`), and the "motion" staff versions (`hf15-photo-motion`, RIFE/Wan morphs between stills). Don't use them as the pattern unless the user asks.

Make a contact sheet of the reference you are following and look at it with Read before building:
`ffmpeg -i <render> -vf "fps=1,drawbox=x=60:y=220:w=880:h=1260:color=red@0.8:t=4,scale=216:-2,tile=7x3" -frames:v 1 tmp/eb-ref.png`

## Fixed script and timing (both looks)

Total **20.5 s** = 2.5 s intro + 15 s body + 3 s end. Constants in the HTML and the audio scripts: `INTRO = 2.5, CLOSE = 1, STEP = 2, BODY = 15`. Body times below are after the intro.

| Body time | Voice line | On-screen line (person look) | Staff still |
|---|---|---|---|
| intro −2.45 | "Let's take a break. Fifteen seconds." | LET'S / TAKE A / BREAK · 15 SECONDS | open |
| 0.1 | "Close your eyes." | Close your eyes | open, then closed at 0.5 |
| 1.1 | "Look up." | Look up | up |
| 3.1 | "Turn to the right." | Turn right | right |
| 5.1 | "Turn to the left." | Turn left | left |
| 7.1 | "Look up, and stretch your neck back." | Look up and stretch your neck | back |
| 9.1 | "Turn right, chin to your shoulder." | Turn right, chin to shoulder | chinright |
| 11.1 | "Turn left, chin to your shoulder." | Turn left, chin to shoulder | chinleft |
| 13.1 | "Open your eyes." | Open your eyes | open |
| 15.25 | "Let Time Optic take care of your eyes." | Let **Time Optic** take care of your eyes + wordmark | — |

Keep this script unless the user asks for other moves. Then the finished voice files can be reused and no TTS is needed (see Voice).

## Person look (staff)

Pattern: `hf15-photo/index.html`. Green intro panel ("LET'S / TAKE A / BREAK", pause icon, lines slam in, panel wipes up), then a real staff member in 8 still photos that cross-fade on each cue (each pose still eases from scale 1.04 to 1), a countdown ring 15→0 with a pulse every second, the move text in a soft light band low in the frame, a 7-segment progress bar, then the TIMEOPTIC letter-slice wordmark with a shine and the end line (sentence in white, "Time" green `#123A29` + "Optic" black `#212121`, bold).

Steps for a new staff member:
1. **Consent first.** A real person's face: ask the user to confirm this staff member agreed to appear. Get one clear front photo of them (`ref-staff.png`).
2. **Stills with Codex**, one `image_gen` call per pose: `closed, up, right, left, back, chinright, chinleft, open`. Script: copy `kits/2026-09-26_neck-break/codex2/gen.sh` into the new kit, change `OUT`, and rewrite the clothing/hair description in `BASE` to match the new photo (keep "No glasses", "Vertical 2:3 portrait … mid-chest up … centred", "Plain soft light sage-grey studio background", "No text, no watermark, no logo"). Every generation uses the user's ChatGPT quota: **ask before running**, say it is 8 images.
3. **Check every still with Read**: same face as the reference, eyes closed where they should be, head turned the right way. Known Codex problems and fixes (see `codex2/NOTES.txt`): it may turn the head the wrong way (then `hflip` the image and use it for the other side) or refuse one pose (then `hflip` its mirror pose, e.g. chinright = flipped chinleft).
4. **Composition**: new kit `kits/YYYY-MM-DD_eye-break-<name>/`, copy `hf15-photo/` to `hf/`, put the 8 stills in `hf/assets/staff/`. Set `#bg` to the grey of the new photos (sample the top rows of `closed.png`) so the photo's top edge disappears; `#char` is masked soft at the top.
5. **Audio**: voice + a soft tick every second + the shop's own ambient bed. Render to a silent file, then
   `python tools/ambient.py <silent.mp4> <out.mp4> 20.5 --no-chimes --voice kits/2026-09-26_neck-break/audio/en/track15.wav`
   (`track15.wav` = the finished voice + ticks track, reusable as long as the script above is unchanged).

## Nature look

Pattern: `hf-ocean/index.html`. No person and almost no text: full-screen nature footage with a light top/bottom shade, intro "Let's take **a break**" + "15 seconds · close your eyes and listen" (fades out at 2.5 s), then only a thin white progress line at y 1440 for 15 s while the voice leads the moves, then a soft veil, the **white** TIMEOPTIC wordmark (`assets/timeoptic-white-spaced.svg`) and "Let **Time Optic** take care of your eyes" in white. Sound = the footage's own nature sound (no music bed, no ticks), ducked a little under the voice.

Steps for a new scene:
1. **Footage**: vertical 1080×1920 (crop if not), calm, slow, nothing that fights for attention, with its own natural sound (waves, wind, birds). From the user, or Pexels / Pixabay / Unsplash (record the link in `<kit>/assets-sources.md`), or generated (Wan via `tools/wan.py`, or Codex video only after the user approves the quota). Must cover ≥ 20.5 s:
   - Short clip (the references were 10 s): slow it to about half speed with frame interpolation, e.g. `ffmpeg -i source.mp4 -an -vf "setpts=2.05*PTS,minterpolate=fps=30:mi_mode=mci" -c:v libx264 -crf 18 <name>_slow.mp4`, or loop it with cross-fades (like `ocean/ocean_long.mp4`). Check a few frames for warping.
   - Sound bed ≥ 20.5 s: the clip's own audio, looped with `acrossfade` if short; or a matching free nature sound from Pixabay/Freesound (record the source).
2. **Build + render + mix** with the reference script. New kit `kits/YYYY-MM-DD_eye-break-<name>/`; copy into it `hf-ocean/`, `nature.sh`, and `audio/en/voice15_ocean.wav` (keep the same relative paths) and create an empty `export/`, then
   `bash kits/<new kit>/nature.sh <name> <video ≥20.5 s> <nature sound> [gain dB]`
   It copies `hf-ocean` to `hf-<name>`, swaps the video, renders, and mixes → `export/neck-break-15_<name>_en.mp4`. Gain: the references used 12–14 dB; the waves should be clearly heard between voice lines but never cover a word.
3. If the footage is bright at the centre, check the white text reads; strengthen `#shade` / `#ishade` rather than adding boxes.

## Voice

The voice is Google Gemini TTS, voice **Sulafat**, style "a warm, friendly fitness coach giving a quick, crisp cue, brisk natural pace, short, no pauses" (see `kits/2026-09-26_neck-break/audio/en/gemini.txt`).
- **Same script** (the normal case): reuse the finished tracks in `kits/2026-09-26_neck-break/audio/en/`: `track15.wav` (voice + ticks, person look) and `voice15_ocean.wav` (voice only, nature look). No TTS, no key needed.
- **New lines**: `python tools/gemini_tts.py <kit>/audio/en/gemini.txt <kit>/audio/en/gemini --voice Sulafat` (one wav per line; lines `NN|text||style`). It needs `GEMINI_API_KEY` in `.env` at the project root: **each machine uses its own free key** from Google AI Studio — never copy someone else's key into the folder. The free tier allows about 10 requests a day, so the reference read all lines in one request (`gemini_all.wav`) and split it with `split_voice.py`. Then place the lines on the cue times with a copy of `make_voice_15.py` (adjust `LINES`; `--no-ticks` for the nature look). No key: `make_voice_15.py` falls back to Kokoro (English, free, local) — tell the user the voice will differ from the posted clips.
- Python packages for TTS: `python -m pip install google-genai numpy` (+ `kokoro-onnx soundfile` for the fallback).

## Rules (every clip)

- 1080×1920, 20.5 s, English only on screen, in the voice and in captions.
- TikTok safe zone: all text and logos inside x 60–940, y 220–1480 (top bar, bottom caption area and the right-hand button column cover the rest). The face in the person look and the key part of the scene may run under the UI, the text may not.
- The shop name in sentences is **Time Optic** (two words, bold); on light grounds "Time" green `#123A29` + "Optic" black `#212121`; on footage both white. The wordmark logo: green/black on light grounds, all white on footage, with the small gap between TIME and OPTIC.
- No storefront line art, no glasses, no prices, no frame brand logo in these clips (they are care clips, not product clips).
- Care/health wording speaks to everyone ("everyone", "you"), never "customers". No medical claims beyond "take a break, stretch, rest your eyes".
- Calm pacing: soft fades and cross-fades, no whip cuts, no SFX hits. The voice sets the timing.
- Render with `npx --yes hyperframes@0.8.59 render -o <silent.mp4> --quiet` from the composition folder; run `npx --yes hyperframes@0.8.59 check` first until 0 errors.

## Check and hand over

1. Contact sheet with the safe zone (command above) plus frames at 1.5 s, 4 s, 10 s and 19 s, read with Read: text inside the red box and readable, no text over the face, stills in the right order, wordmark at the end. You can't hear the audio: check the loudness with `ffmpeg -i out.mp4 -af volumedetect -f null -` (max near −1 dB, mean around −20 dB) and say you couldn't listen.
2. `caption.md` in the kit (and the line in the kit's `export/captions.txt` style): one short English line + hashtags, e.g. from the reference:
   - person: "Stretch with us 👀 A 15-second break from your screen. Save it for later." `#eyebreak #neckstretch #deskstretch #screentime #eyecare #TIMEOPTIC #fyp`
   - nature: "Close your eyes. Listen to the waves. 15 seconds for your eyes 🌊" `#eyebreak #relax #oceansounds #neckstretch #eyecare #TIMEOPTIC #fyp`
   Vary the first line per scene; keep #eyebreak #eyecare #TIMEOPTIC #fyp.
3. Open the video (`Start-Process <file>`) and report in Thai: the file to post, "เปิดเสียงต้นฉบับไว้ ไม่ต้องใส่เพลง", the caption, and anything uncertain.

When the user gives a new general preference for these clips, add it to this file (not only Claude's memory) so it travels with the folder.
