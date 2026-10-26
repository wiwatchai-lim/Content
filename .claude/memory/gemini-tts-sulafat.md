---
name: gemini-tts-sulafat
description: Voiceover for clips uses Gemini TTS voice Sulafat; key is in the GEMINI_API_KEY user env var; script lives in the huahin-anantara kit
metadata:
  node_type: memory
  type: reference
  originSessionId: 8414d883-242f-4f6a-a3dd-6608dfb5076c
  modified: 2026-09-29T08:19:21.352Z
---

Preferred voiceover voice: Gemini TTS "Sulafat" (the user's friend chose it over Kokoro voices, 2026-09-28). Mix preference: no footage ambience, soft music bed ducked gently under the voice.

- Key: Windows user env var `GEMINI_API_KEY` (set 2026-09-28; a new shell may be needed to see it). Never write the key into files.
- Script: `kits/2026-09-28_huahin-anantara/audio/gemini_tts.py <out dir> Sulafat "line" ...` (one wav per line, 24 kHz mono). Use model `gemini-2.5-flash-preview-tts`; `gemini-3.8-flash-tts` returned odd 12 s takes and 429s.
- Free tier allows only 10 requests/day per TTS model (2026-09-28: 2.5-flash ran out). `gemini-3.1-flash-tts-preview` has its own quota and gave clean takes (Centara clip, `kits/2026-09-28_huahin-centara`). Keep all lines of one clip on the same model — mixing models sounds inconsistent.
- 2026-09-29: both 3.1-flash and 2.5-flash daily quotas were already used up by ~10:30 Thai time (quota resets at midnight Pacific ≈ 14:00 Thai). A plain probe request also spends one of the 10 — don't probe, just generate. Generic lines like "Time Optic. Take care of your vision." can be reused from earlier kits (`huahin-centara/audio/vo31/07.wav`).
- 2026-09-29 afternoon (after the reset) each model gave only 4–5 good takes before the daily 429, so the retry loop in gemini_tts.py (3 tries × 20 s) and probe calls seem to burn quota too. A 30 s clip has ~7 lines, so plan on 1 clip a day, and don't loop retries on a 429 whose quotaId is `...PerDay...`.
- Mix recipe: `kits/2026-09-28_huahin-anantara/audio/mix.sh`.
- 2026-10-02: reading all lines of a clip in ONE request ("…pause two seconds between lines") then splitting by silence works well on `gemini-3.1-flash-tts-preview` (scripts: `kits/2026-10-02_eye-break-palm/audio/v3/`, `kits/2026-09-28_huahin-anantara/audio/vo-v3/`). The same prompt on 2.5-flash once returned ~4 s of speech then 20 s of silence — check the take before splitting.
