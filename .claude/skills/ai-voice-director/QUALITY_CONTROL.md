# Quality Control — 100-point voice score

Target: **≥ 90/100 for high-quality work** (an internal bar for this studio, not a scientific certification).
Score **per line**, then report the clip as the mean plus the weakest line. Human and automatic scores are kept
apart; an automatic number never replaces a listener's judgement. Ratings protocol follows the spirit of absolute
category rating listening tests (ITU-T P.800 ACR, 5-point scale; see RESEARCH_SOURCES.md) adapted to this rubric.

## 1. Rubric
| criterion | pts | 100% | 75% | 50% | 25% | 0 |
|---|---|---|---|---|---|---|
| **Pronunciation accuracy** | 20 | every syllable right: tones, vowel length, finals unreleased, clusters as directed, brand names per dictionary | 1 small slip a native listener notices but understands | 1 wrong tone/length that changes a word, or a brand misread | several errors; meaning still guessable | wrong words / unintelligible |
| **Human naturalness** | 20 | could pass as a recorded actor; breath and rhythm natural | slightly synthetic texture or one odd pitch movement | clearly TTS: flat rhythm, robotic endings, odd stress on particles | artefacts (glitches, metallic, wrong language accent) | unusable |
| **Emotional authenticity** | 20 | the intended emotion (incl. masked/inner layer) is believable without being told | right emotion, a bit generic or a bit over | wrong intensity (melodrama or flat) or only the surface layer | different emotion read | contradicts the scene |
| **Contextual appropriateness** | 15 | fits listener, relationship, politeness, setting, previous/next line | one mismatch (e.g. too loud for 2 a.m.) | wrong register (formal vs casual) or wrong particle attitude | ignores the scene | harmful/offensive mismatch |
| **Timing and rhythm** | 10 | pauses where directed, speed fits, line fits its slot | one pause too long/short | choppy or rushed; misses the target length by >12% | several timing faults; >25% off | breaks the edit |
| **Character consistency** | 10 | same identity as the bible and other lines (voice, age, habits, particles) | slight drift | noticeable drift (age/energy) | sounds like another character | different voice |
| **Technical audio quality** | 5 | peak ≤ -1 dBFS, no clipping, no clicks, clean edges, ≥ 22.05 kHz | one minor issue | audible noise/click | distortion | broken file |

Score each criterion in the steps above (e.g. pronunciation 20 / 15 / 10 / 5 / 0) or in between when the rater is sure.

## 2. Who scores what
| criterion | human (native Thai listener for Thai) | automatic indicator (`tools/qc.py`) |
|---|---|---|
| Pronunciation | **score** | ASR character error rate vs `spoken_text` (faster-whisper). High CER = listen again; not a score |
| Naturalness | **score** | — (automatic MOS predictors exist, see C research; not installed) |
| Emotion | **score** | `follows_direction`: measured pitch level/range/rate/ending vs directed labels (needs a neutral baseline take of the same voice) |
| Context | **score** | — |
| Timing | score (5 of 10) | **auto 5 of 10**: duration vs `target_duration_s`, pause count vs directed pauses |
| Character | **score** | voice id fixed per character (validate.py); F0 median within ±2 st of the character baseline |
| Technical | score optional | **auto 5**: peak, clipping, edge silence, sample rate |

When no native listener is available, the director (Claude) may give a provisional score marked
`"rater": "claude-provisional"`; it never counts as a pass for final delivery of Thai lines.

Human ratings file (CSV): `rater,line,criterion,score` with criteria `pronunciation, naturalness, emotion, context,
timing, character, technical`. Two or more raters → mean; report the spread when raters differ by > 25% of the scale.

## 3. Procedure
1. `python tools/validate.py direction.json` → 0 errors.
2. Generate (ask the user first when it uses quota). Save takes as `<audio-dir>/<line id>.wav`.
3. `python tools/qc.py --direction direction.json --audio-dir takes/ --baseline <neutral take of the voice> --asr small --human ratings.csv --out qc.json`.
4. For each line under 90 (or any criterion under 75%): name the problem in one sentence, **fix only that part**
   (re-write the style phrase, add/remove a pause, split the line, fix spoken_text), regenerate only that line,
   re-score. Keep the old take until the new one is better.
5. Record the final scores in the direction file (`qc.status`, `qc.score`, `qc.notes`) and lessons in CHANGELOG.md or
   story-clips/_craft/LEARNING-LOG.md.

## 4. Fix map (symptom → first thing to change)
| symptom | fix |
|---|---|
| wrong tone on one word | spoken_text respelling (dictionary) or add tone mark; remove pitch words from the style prompt |
| particle stressed / too long | style: "light, short ครับ"; or end the sentence before the particle with a comma-less join |
| emotion too big | lower intensity words ("a little", "quietly"), remove exclamation marks, add the masking layer |
| emotion flat | give the situation and the goal in the prompt (not more adjectives); add a breath/pause at the trigger |
| change inside the line smeared | split the line (EMOTION_TRANSITIONS.md rule 5) |
| characters sound alike | different voice per character; age + body in the style ("an 80-year-old grandmother") |
| inconsistent takes across lines | same model, same voice, same base style sentence; generate a scene's lines in one request then split |
| numbers/brands misread | thai_normalize.py + dictionary |

## 5. Real test run (2026-11-24) — automatic part on ร้านแว่นตีสอง EP01
9 existing EP01 takes (Gemini 3.1 flash TTS, voice Charon, one narrator voice for all characters), retro-annotated in
`research/ep01_direction.json`; output `research/ep01_qc_auto.json`.
- technical: 5/5 on all 9 lines (peak ≈ -2.7 dBFS, no clipping).
- timing (auto half): 4–5 / 5 — 5 lines flagged "choppy?" (3–6 internal pauses ≥ 150 ms; no pauses were directed in
  the retro file). Thai stop closures and "…" pauses both count, so this flag needs an ear check, not an automatic deduction.
- ASR CER (faster-whisper small): 0.00–0.13 on 7 lines; **0.42 on line 03** (ASR heard only the second half — the
  first half "คืนแรก ตีสองตรง…" needs a listening check) and 0.28 on line 22 (a year read digit by digit, "สองห้าหนึ่งเก้า",
  vs ASR "2519" → normalised differently; a reference-text issue, not a pronunciation error).
- follows_direction vs line 01 as baseline: the grandma lines (06, 09, 18) were directed slightly higher/slower than
  the narrator and measured slightly_lower / lower and baseline/slightly_fast — **the characters were not voiced
  distinctly**, which the bible now fixes (separate voices).
- **Thai-specific finding:** measured "ending" was a *rise* on lines ending in ครับ / นะ / จ๊ะ / ไหม even where a soft fall
  was directed — the final particle's own lexical tone (high/rising) dominates the last 300 ms. For Thai, judge the
  ending on the last content word or by ear, not on the particle (AUDIO_ANALYSIS.md §4).
Human scores: **not collected yet** — no native-listener rating was run, so no line has a total out of 100.
