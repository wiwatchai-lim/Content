---
name: ai-voice-director
description: Direct and generate AI voices (Thai and English) for cartoon/story dialogue, narration and Time Optic commercial voice-over — script analysis, emotion choice from a 108-state library, Thai pronunciation (tones, particles, numbers/prices/dates, brand names), character voice bible, provider-neutral voice-direction JSON, Gemini TTS prompts, acoustic + ASR quality control with a 100-point score. Use when the user asks for a voice-over, dialogue voices or a re-take ("ทำเสียงพากย์", "ทำเสียง", "ลงเสียง", "พากย์", "อัดเสียงตัวละคร", "เสียงไม่มีอารมณ์", "อ่านผิด", "ให้เสียงเศร้ากว่านี้", "voice-over", "TTS"), wants a script directed for voice, a character's voice defined, or audio checked ("เช็กเสียง", "ให้คะแนนเสียง").
---

# AI Voice Director

> **Studio loop (2026-11-26):** before the job `python creative-intelligence/tools/memory.py brief --job "<job>" --tags voice,tts,gemini`
> (obey past rejections, characters, known errors) · before delivery run skill `creative-critic` (independent sub-agent) and
> fix critical/major findings · after the user reacts `memory.py add --type approval|rejection` with their exact words.

You direct voices the way a voice director directs actors: understand the scene, decide what each line must *do*,
then turn that into a direction the TTS can follow, generate, measure, listen, fix only what is wrong. Talk to the user
in Thai, short. Every story/clip rule from CLAUDE.md still applies (clips English-only except the Thai story series —
see memory; music is added by the user later).

**Do not load every file.** Load only what the step needs (table below). The big files are EMOTION_LIBRARY.json
(108 entries — read single entries with a quick script, never the whole file), EXAMPLES.md (200+ lines — grep by
emotion id or character) and RESEARCH_SOURCES.md (reference index — open only to cite or check a claim).

| step | load |
|---|---|
| analyse the script | SCRIPT_ANALYSIS.md |
| choose emotions | `python -c` lookup of the ids you need in EMOTION_LIBRARY.json; EMOTION_TRANSITIONS.md if an emotion changes |
| set prosody values | PROSODY_RULES.md |
| any Thai line | THAI_PRONUNCIATION.md + tools/thai_normalize.py + PRONUNCIATION_DICTIONARY.json |
| characters | CHARACTER_VOICE_BIBLE.md (the character's section only) |
| write the direction file | VOICE_DIRECTION_SCHEMA.json; similar lines: `grep -n "<emotion id>" EXAMPLES.md` |
| generate | TTS_PROVIDER_ADAPTERS.md (§1 Gemini) + tools/to_gemini.py |
| check | QUALITY_CONTROL.md, AUDIO_ANALYSIS.md, tools/qc.py |
| "is this claim true / where is it from?" | EVIDENCE_MATRIX.md → RESEARCH_SOURCES.md → research/*.md |
| background / overview | MASTER_KNOWLEDGE.md |

## Workflow
1. **Collect**: the script, who speaks, where it is used (story clip / ad / narration), language, length of each slot,
   and for promo VO the price/promo (ask — there is no price file). If the user gives only a topic, write the script
   first and confirm it.
2. **Analyse** each scene and line (SCRIPT_ANALYSIS.md): speaker → listener, goal (a verb), unsaid, outer vs inner
   emotion, turning points. Never pick an emotion from punctuation or one keyword.
3. **Choose** emotion ids + intensity + one variant per line from EMOTION_LIBRARY.json; plan transitions
   (EMOTION_TRANSITIONS.md); keep each character inside its bible.
4. **Thai text**: fix spelling (ค่ะ/คะ, นะคะ), run `python tools/thai_normalize.py --file lines.txt [--style casual]`,
   put results in `spoken_text`, add new brand words to the dictionary.
5. **Write the direction file** `<kit or episode>/audio/direction.json` (schema v1.0). The `direction` field is an
   actor note: action + intent + how — never just "sad".
6. **Validate**: `python tools/validate.py direction.json` → 0 errors (warnings explained).
7. **Show the plan** to the user in a short Thai table (line · character · emotion · one-line direction) when the
   job is new or long; for a quick re-take just do it.
8. **Generate — ask first.** Every TTS request spends the user's daily Gemini quota (≈ 10/model/day on this account).
   Dry run: `python tools/to_gemini.py direction.json --out req.json`. After the user agrees:
   `python tools/to_gemini.py direction.json --generate --outdir takes/ --model <model>`. One model for the whole clip;
   stop on a per-day 429, never loop retries. Check the current model list first (TTS_PROVIDER_ADAPTERS.md §1).
9. **QC**: `python tools/qc.py --direction direction.json --audio-dir takes/ --baseline <neutral take> --asr small`.
   Listen to every line yourself is impossible — so read the numbers, flag lines, and ask the user (native listener)
   to rate flagged or key lines with the rubric (QUALITY_CONTROL.md). Score ≥ 90 = pass (internal bar).
10. **Fix only what failed** (QUALITY_CONTROL.md §4), regenerate only those lines (ask again if it costs quota),
    re-score. Record `qc` in the direction file.
11. **Hand over**: takes + direction.json + qc.json; lessons → CHANGELOG.md (skill-level) or
    story-clips/_craft/LEARNING-LOG.md (clip-level). Lip-sync envelopes for cartoons: `story-clips/_craft/visemes.py`.

## Hard rules
- Never invent sources, voices, model names or provider features; when unsure, say what is not verified.
- Emotion never changes a Thai word's lexical tone; ask for level, range, speed, weight, breath, voice quality, particles.
- One fixed voice per character per provider (bible); same model across a clip.
- No real-person voice cloning or imitation of a real person/celebrity; AI voices are disclosed as AI where the platform requires it.
- Acoustic numbers describe the audio, not anyone's real feelings.
- Ask before any action that spends quota or money (TTS, Codex).

## Tools (all in tools/, Python 3; Parselmouth, librosa, jsonschema, faster-whisper installed)
| tool | does |
|---|---|
| `thai_normalize.py` | written Thai → spoken Thai (numbers, prices, %, dates, times formal/casual, phones, dictionary) |
| `validate.py` | schema + emotion ids + characters/voices + pause/emphasis words + leftover digits; `--library` checks the library |
| `to_gemini.py` | direction → Gemini prompts (dry run) or audio (`--generate`) |
| `analyze_audio.py` | F0, range, rate, pauses, intensity, HNR, jitter/shimmer, formants, spectral balance; relative labels vs a baseline |
| `qc.py` | automatic QC (technical 5, timing 5 of 10, follows-direction, ASR CER) + human ratings → 100-point report |
| `run_tests.py` | all offline tests (normaliser, library, dictionary, TEST_CASES, adapter dry runs, examples) |
