# Asset sources

- `turtle/source.mp4`: footage the user supplied on 2026-09-28, originally `Downloads/Green_sea_turtle_swimming_underw…_20260928121427.mp4` (10 s, 1080×1920, 24 fps, with its own underwater sound).
- `turtle/turtle_slow.mp4`: the source slowed to about half speed (`setpts=2.06*PTS`, `minterpolate` to 30 fps), 20.43 s.
- `turtle/turtle_audio.m4a`: the source's own sound looped 3 times with 1.5 s cross-fades, 27 s.
- Voice: `audio/en/voice15_turtle.wav`, Gemini TTS voice Aoede, made 2026-09-28 (`tts_all.py`). The old reused `voice15_ocean.wav` (Sulafat) is kept for the old render.
