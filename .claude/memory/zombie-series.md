---
name: zombie-series
description: "story-clips/zombie/ \"กรุงเทพฯ ไม่มีพรุ่งนี้\" — pure zombie action series, no eyewear/brand; all 10 EPs rendered 2026-10-28"
metadata:
  node_type: memory
  type: project
  originSessionId: 4779378d-3574-40d1-a99b-94daf34deedc
  modified: 2026-10-28T07:34:58.292Z
---

2026-10-28: user wanted a zombie series with fun fight scenes and said explicitly: nothing about glasses (no eye science, no TIMEOPTIC end card). Bible in `story-clips/zombie/SERIES.md`. Thai VO + subs like [[story-clips-thai]], voice per [[gemini-tts-sulafat]]. All 10 EPs rendered to `Zxx_<slug>/export/Zxx_<slug>_th.mp4` (76–118 s each). Season-2 tease ("เรือลำนั้น") is on Z10's end card.

User stopped the parallel builder agents midway and said to do episodes one at a time myself — prefer no sub-agents for this series.

Pipeline (Z02+): shared drawings/timeline helpers in `_shared/cast.js`; per EP `audio/tts_all.py` (one Gemini request) → `audio/split.py` (DP phrase aligner, run with PYTHONIOENCODING=utf-8) → `audio/timeline.py` → `build.py` → `_shared/fxlog.py` (headless Chrome dumps SFX word events) → `audio/ambience.py` (`_shared/sfx.py` Mix) → `make.sh`. Snapshots always with `--describe false`.

Gemini TTS free quota ≈ 6–7 full takes per day; resets ~14:00 Thai time.

**Why:** user wants entertainment content, not product content, for this series.
**How to apply:** never add brand/eyewear content; for a season 2, copy a Z0x folder as template.
