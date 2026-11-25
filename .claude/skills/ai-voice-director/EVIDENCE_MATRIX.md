# Evidence Matrix

Each claim the skill relies on, its support and how much to trust it. **Strength:** A = several studies / meta-analysis
agree; B = one or two solid studies, or a standard/official doc; C = single small study, abstract-only, or indirect;
D = craft/practitioner only (`Artistic`). Keys → RESEARCH_SOURCES.md. "Science" and "craft" are kept in separate
columns on purpose.

| # | claim used by the skill | scientific support | strength | craft / notes | where used |
|---|---|---|---|---|---|
| 1 | Arousal is the most reliably conveyed vocal dimension (F0 level/range, loudness, rate, HF energy rise together) | Scherer2003, BanzigerScherer2005, Laukka2005, JuslinLaukka2003, Pell2009 | A | — | PROSODY_RULES §1 |
| 2 | Valence is weakly coded by pitch/rate, more by voice quality / spectral balance | GoudbeekScherer2010, Laukka2005, Scherer2003 | B | name the quality in prompts | PROSODY_RULES §3.1 |
| 3 | Hot vs cold anger, panic vs anxiety, despair vs sadness differ acoustically | BanseScherer1996, Scherer2003 | A–B | name the member + intensity | EMOTION_LIBRARY |
| 4 | Basic-emotion profiles (anger loud/high/fast; sadness low/slow/soft; boredom flat) | Scherer2003 (Table 1), JuslinLaukka2003, MurrayArnott1993 | A (acted) | tendencies, not recipes | EMOTION_LIBRARY (high-confidence entries) |
| 5 | Voice quality (breathy, tense, creaky) carries attitude & mild moods | GoblNiChasaide2003, Scherer1986 | B | — | PROSODY_RULES §3.5 |
| 6 | Lower/falling F0 = dominance; higher = deference/smallness (frequency code) | Ohala1984, Gussenhoven2002 | B | character status | bible, PROSODY §1 |
| 7 | Emotion is recognised across languages, better in-group | Pell2009, ElfenbeinAmbady2002, Scherer2001, LaukkaElfenbein2021, Laukka2016 | A | don't import Western exaggeration into Thai | PROSODY §4.9 |
| 8 | Non-verbal vocal bursts carry 20+ distinguishable emotions | Cowen2019, Sauter2010 | B | script sighs/gasps separately | schema `nonverbal` |
| 9 | Emotions form blended gradients; categories > dimensions for labels | CowenKeltner2017, Cowen2019 | B | mixed/transition entries | EMOTION_LIBRARY types |
| 10 | Emotion models: circumplex (valence × arousal), PAD | Russell1980, Mehrabian1996 | B (theory) | `vad` is a rough placement only | EMOTION_LIBRARY |
| 11 | English sarcasm: slower, lower, less F0 variation | CheangPell2008, Rockwell2000, BryantFoxTree2005 | B | — | sarcasm entries |
| 12 | Sarcasm cues differ by language (Cantonese higher; Thai faster/higher/wider) | CheangPell2009, KumwapeeJitwiriyanont2020 (n = 4) | C for Thai | A/B test two readings | sarcasm entries, PROSODY §4.7 |
| 13 | Accent marks new/contrastive information; de-accent given | Gussenhoven2002, Cutler1997, PierrehumbertHirschberg1990 (content not read) | B | — | PROSODY §3.4 |
| 14 | Thai has 5 contrastive tones; tone must be preserved | TingsabadhAbramson1993, GandourEtAl1999, MorenZsiga2006 | A | — | THAI_PRONUNCIATION §2.1 |
| 15 | Thai tones stay distinct in fast/connected speech (reduced, not neutralised) | GandourEtAl1999, MorenZsiga2006 (abstract) | B | — | PROSODY §4.1 |
| 16 | Pitch-peak timing is part of Thai tone identity | ZsigaNitisaroj2007 | B–C | never ask for word-level rises | PROSODY §4.2 |
| 17 | Thai attitude intonation sits on sentence-final particles | Pittayaporn2007 (fragments), Jiamsundutsadee2023 (abstract) | C | strongly matches practice | PROSODY §4.3 |
| 18 | Thai emphasis via duration on the final syllable | PotisukGandourHarper1996 | C | — | PROSODY §4.4 |
| 19 | Thai vowel length is contrastive; duration is the main cue | Abramson1993ASA, Maspong2025 | B | stretch proportionally | THAI §2.2 |
| 20 | Spoken readings differ from spelling (เขา high, ฉัน high, r→l) | IwasakiIngkaphirom2005 (front matter) | B | dictionary `style: casual` | PRONUNCIATION_DICTIONARY |
| 21 | ค่ะ/คะ errors common after นะ in written scripts | Tiratanti2022 | C | spelling check step | THAI §1 |
| 22 | English loanword tones (CVN mid, CVN+stop high; RI spelling hides tones) | Gandour1979, KenstowiczSuchato2006, Sirikanerat2015, Kanchanawan2006 | B–C | spell brands as said | dictionary |
| 23 | Thai TTS weak on numbers & code-switching → normalise | Lin2014, JaiTTS2026, Geng2025 | B | thai_normalize.py | THAI §2.7 |
| 24 | Thai number reading (เอ็ด, ยี่สิบ, decimals digit-by-digit, money units) | ThaiNumberReading_Textbook (secondary) | C (RI rule page not found) | tested in run_tests.py | thai_normalize.py |
| 25 | Even validated acted emotion is recognised ≈ 60 % audio-only | Livingstone2018 | B | support emotion with picture/words | PROSODY §3.9, QC |
| 26 | Thai acted emotions: native listener agreement ≈ 0.77 after filtering | WongpithayadisaiEtAl2025 | B | context matters | QC |
| 27 | Gemini TTS: style field + inline tags; ≤ 2 speakers; Thai on 3.8 Flash not Flash-Lite | GeminiTTSDocs (2026-11-24) | B (vendor doc, changes often) | re-check model list | ADAPTERS §1 |
| 28 | Some style tags are spoken aloud | Google-CloudGeminiTTS, EL-Controls | B | QC listens for it; ASR catches inserted words | QC, ADAPTERS |
| 29 | SSML prosody/break/emphasis/phoneme semantics | W3C_SSML11 (full text) | A (standard) | engine support varies | ADAPTERS §2 |
| 30 | Azure express-as styles & styledegree; th-TH HD voice styles | Azure-SSMLVoice, Azure-LangSupport | B | — | ADAPTERS §2 |
| 31 | Stochastic TTS gives different rhythm per take → re-roll | Kim2021, EL-Settings | B | 2–4 takes | ADAPTERS §4 |
| 32 | Exaggerate slightly for animated characters | Schroder2001 (citing Bates 1994) | C | cartoon display rule | PROSODY §3.8 |
| 33 | GeMAPS parameter definitions (F0 st, jitter, shimmer, HNR, alpha ratio, Hammarberg) | Eyben2016 (full text) | A (standard set) | — | AUDIO_ANALYSIS |
| 34 | Jitter/shimmer/HNR meant for sustained vowels | Praat-Manual | B | indicators only | AUDIO_ANALYSIS |
| 35 | MOS from different sessions is not comparable | ITU-T-P800.2 (via Wiki-MOS, secondary) | C | compare takes in one session | QC |
| 36 | Automatic MOS predictors correlate well at system level, only fairly per utterance | Lo2019, Saeki2022 (abstracts) | C | not used for pass/fail | QC |
| 37 | ASR (Whisper) usable as an intelligibility screen | Radford2022 (abstract) | C | CER after normalisation; confirm by ear | qc.py |
| 38 | Politeness / face as the reason for hedges and krengjai | BrownLevinson1987 (bibliographic) | C (not read) | Thai krengjai = cultural craft | krengjai entries |
| 39 | Script analysis (given circumstances, objective, subtext) | — | D | Stanislavski tradition; Alburger2024 (voice acting practice) | SCRIPT_ANALYSIS |
| 40 | Transition rules (trigger, breath before the change, one change per TTS unit) | — | D | craft + TTS practice | EMOTION_TRANSITIONS |
| 41 | Character consistency rules, voice bible | — | D | industry practice | CHARACTER_VOICE_BIBLE |
| 42 | Pause durations (micro/breath/dramatic) | — | D | working values | PROSODY §2 |
| 43 | Relative-label thresholds in analyze_audio.py | — | D | chosen for this skill; tune with experience | AUDIO_ANALYSIS §2 |
| 44 | 100-point rubric weights and the 90 bar | — | D | the user's specification | QUALITY_CONTROL |

Emotion-by-emotion confidence is stored in each EMOTION_LIBRARY.json entry (`confidence`, `evidence_note`):
7 high, 21 medium, 80 low — most social, mixed, hidden and performance states have no direct acoustic research.
