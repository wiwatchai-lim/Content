# Story clips — "survival story" explainers

Vertical 9:16 clips in the style of the reference in `_ref/` (TikTok @promptkubai, "EP.2", 69 s).
One folder per episode: `story-clips/EP01_<slug>/`.

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
