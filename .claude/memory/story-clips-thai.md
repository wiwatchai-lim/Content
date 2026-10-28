---
name: story-clips-thai
description: story-clips/ survival-story series (from a @promptkubai TikTok) is Thai-language, an exception to the English-only clip rule
metadata:
  type: project
---

2026-10-26: user asked to copy the style of a TikTok survival-story clip (@promptkubai EP.2) into its own folder `story-clips/`. User chose: Thai voice + Thai subtitles (exception to the English-only house rule, only for this series), new eye-science stories ending with TIMEOPTIC, visuals drawn in code (HyperFrames SVG, no Codex quota). EP01 "หลงป่าตอนตีสอง" (dark adaptation, red light, averted vision) and EP02 "รถในความมืด" (cabin light = mirror windows, night-mode rear-view mirror, look at the left edge line under high beams) and EP03 "ทางเดินในบ้าน" (afterimage, floaters/flashes = see a doctor, blind spot + a viewer blind-spot test) all rendered 2026-10-26; 2026-10-27: EP04 "ถ้าเช้าแล้ว มันยังไม่ไป" (light adaptation, sun), EP05 "ถ้ามันอยู่ในกระจก" (pinhole, Troxler test), EP06 "ถ้ามันออกมาจากจอ" (blink rate, 20-20-20) rendered; EP06 end card teases EP7 "ถ้ามันรู้ชื่อคุณ". 2026-10-28: EP07–EP10 built in parallel by 4 agents (one TTS request each, all rendered); EP10 "คืนสุดท้าย" closes season 1 ("จบซีซั่น 1"). Parallel renders sometimes fail silently in make.sh (--quiet) — just rerun. Episode table in story-clips/eyesight/SERIES.md.

Gemini TTS on this series often ignores "pause two seconds between lines" and pauses every phrase alike; the split then groups phrases per line (see EP02/EP03 split.py) and can be off where the voice ran two phrases together.

**Why:** Thai ghost stories land better in Thai.
**How to apply:** new episodes go in `story-clips/eyesight/EPxx_<slug>/`, reuse EP01's pipeline (see `story-clips/eyesight/SERIES.md`); each series has its own subfolder under story-clips/ (user, 2026-10-28); voice per [[gemini-tts-sulafat]].
