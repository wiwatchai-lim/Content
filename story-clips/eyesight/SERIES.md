# Eyesight series — "survival story" explainers (eye science, TIMEOPTIC end card)

Vertical 9:16 clips in the style of the reference in `_ref/` (TikTok @promptkubai, "EP.2", 69 s).
One folder per episode: `story-clips/eyesight/EP01_<slug>/`.

## What the reference does
- **Format:** second-person survival story ("you are in a field hut at 04:40, something is out there…"), told by a voiceover, one short subtitle per line (white = narration, yellow = key fact, red box = danger/twist).
- **Look:** flat 2D vector illustration, night palette (navy sky, full moon, rice fields), simple characters (you, an old uncle, a dog), slow camera pushes; dawn palette (pink/purple sky, mist) near the end.
- **UI layer:** clock chip top-left (current time / countdown, turns red near zero), cream info cards with a gold left edge (eye diagram, `1 km ÷ 3 km/h = 20 min`), top-down map with a dotted route and labelled pins, small badges.
- **Science hook:** the twist is real science — e.g. dark-adapted eyes need ~20 min to re-adapt after a phone flash, so "don't turn on the flashlight" is the survival rule. That is the part that fits TIMEOPTIC.
- **Structure:** hook question (0–3 s) → rule + reason with an info card → plan with a map + countdown → journey → twist at dawn (footprints in the dew: four trails, not three) → "next episode" card → creator end card.
- **Sound:** voiceover + soft ambience + small UI ticks.

## Sheets
`_ref/sheets/sheet01–08.jpg` — 2 frames per second, 18 frames per sheet, in order.

## How an episode is built (EP01)
1. `audio/tts_all.py` — whole script in ONE Gemini TTS request (Sulafat, `gemini-3.1-flash-tts-preview`), then `split.py` → `01..NN.wav`.
2. `audio/timeline.py` — speeds lines ×1.08, places them, writes `voice.wav` + `timing.json` (cue times used in `hf/index.html`).
3. `audio/ambience.py` — synthesised night bed (crickets, wind, drone) + footsteps + low hits. No music: the user adds music later.
4. `hf/index.html` — HyperFrames composition, everything drawn in SVG; `make.sh` renders and mixes → `export/EP01_..._th.mp4`.

## Episodes
Each episode's end card teases the next one.
| EP | Folder | Science |
|----|--------|---------|
| 01 | `EP01_lost-in-forest` | dark adaptation, red light, averted vision |
| 02 | `EP02_car-in-the-dark` | lit cabin = mirror windows, night-mode mirror, look at the edge line under high beams |
| 03 | `EP03_home-hallway` | afterimage, floaters/flashes = see a doctor, blind spot (viewer test) |
| 04 | `EP04_morning-light` | light adaptation (stop at the door, shade your eyes), never stare at the sun (no pain), UV sunglasses |
| 05 | `EP05_bathroom-mirror` | pinhole trick without glasses, Troxler fading (viewer test) |
| 06 | `EP06_phone-screen` | fewer blinks on screens, 20-20-20 (viewer eye break), no full-bright screen in a dark room; teases EP7 "ถ้ามันรู้ชื่อคุณ" |
| 07 | `EP07_knows-your-name` | red looks black in the dark (Purkinje shift), peripheral vision sees motion not detail, dominant eye (viewer test) |
| 08 | `EP08_in-your-eyes` | chemical in the eye = rinse 15 min + doctor, don't rub grit, one eye misjudges depth (viewer pen test) |
| 09 | `EP09_fog-road` | low beams in fog, fog makes things look farther, halos = uncorrected sight/astigmatism, astigmatism dial (viewer test) |
| 10 | `EP10_last-night` | presbyopia from ~40, yearly eye exam, near point (viewer finger test); season 1 finale |
