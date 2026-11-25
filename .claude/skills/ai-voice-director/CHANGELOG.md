# Changelog — ai-voice-director

## 1.0 — 2026-11-24
Created from the user's "MASTER INSTRUCTION — AI VOICE DIRECTOR" brief.
- Research: three verified passes (emotion/prosody, Thai, TTS/SER/QC) + one manual check → 123 distinct works
  (RESEARCH_SOURCES.md; full records in research/A_*.md, B_*.md, C_*.md). Access: 19 full text, 54 abstract only,
  22 docs pages, 19 bibliographic/secondary, 7 catalogue, 4 search summaries. Unverified items listed, not cited.
- EMOTION_LIBRARY.json: 108 states (primary, secondary, mixed, suppressed, hidden, conflict, transition, social, stance,
  performance), 15+ fields each, 2–4 variants, Thai + English examples; confidence 7 high / 21 medium / 80 low.
  Sarcasm/irony/mockery entries updated with the Thai and Cantonese findings (sarcasm is not slower/lower in every language).
- EXAMPLES.md: 207 directed lines (147 Thai). TEST_CASES.json: 48 cases (6 × 8 categories).
- Tools: thai_normalize.py, validate.py, to_gemini.py, analyze_audio.py (Parselmouth), qc.py (+ faster-whisper ASR), run_tests.py.
- Installed: praat-parselmouth 0.4.7 (pip).
- Tests (offline): run_tests.py 388/388 pass. Real audio: analyze_audio.py on all 27 EP01 takes; qc.py with ASR on 9.
- Findings from the real run: EP01 characters were not vocally distinct (one narrator voice); Thai final particles make
  automatic "ending" measurements read as rises; ASR CER needs number normalisation on both sides.
- Not done: no new TTS audio was generated (it spends the user's Gemini quota — ask first); no native-listener ratings yet,
  so no line has a full 100-point score; voices for ton/jan/chan/mint/tao are proposals to audition.
- Known drift: `gemini-2.5-flash-preview-tts` (used by tools/gemini_tts.py) was not in Google's model list on 2026-11-24.

## 2026-11-25 — optical normalisation + brand fixes (Creative Intelligence batch T1)
- thai_normalize: signed lens powers → ลบ/บวก, SPH/CYL/AXIS/ADD/PD/VA names (unverified, ask a Thai optometrist), visual
  acuity 6/6 no longer read as a date, numeric ranges read ถึง, °C. ISO dates (2026-11-25) still not handled.
- Dictionary: HOYA/Hoya โฮยา, Essilor เอสซีลอร์, Varilux วารีลักซ์ (brand's own Thai spellings, spot-checked), + Comfort Max.
- Proposals not yet merged: creative-intelligence/knowledge/thai-language/pronunciation_proposals.json.
