---
name: vananava-clip-pending-voice
description: Hua Hin Vana Nava clip (2026-09-29) is rendered but still needs voice lines 01-06 — run audio/make-vo.sh after the Gemini quota reset
metadata:
  node_type: memory
  type: project
  originSessionId: 3feb6e27-d4a6-42ea-a9b8-d37e12dde1bd
  modified: 2026-09-29T09:12:10.219Z
---

`kits/2026-09-29_huahin-vananava` — 30 s clip in the huahin-marriott style, built from 8 waterpark photos the user downloaded from ChatGPT (`photos/`). Script written by Claude (user chose that). Visuals (v2: 2.5D depth-parallax shots, one grade, dissolves) rendered to `export/huahin-vananava-v2.mp4`; only line 07 (shop ending, copied from Marriott) exists because the Gemini TTS daily quota was used up on 2026-09-29.

**Why:** free tier is 10 TTS requests/day, reset ≈ 14:00 Thai — see [[gemini-tts-sulafat]].
**How to apply:** after 14:00 Thai on a later day, run `bash audio/make-vo.sh` in that kit (makes 01-06, trims, mixes → `export/huahin-vananava_sulafat.mp4`), check line lengths against the text timings in `hf/index.html`, then add the song to `music/songs.md`.
