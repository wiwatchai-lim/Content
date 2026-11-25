# Master Knowledge — AI Voice Direction (overview)

A one-file map of what the skill knows and where the detail is. Read this for orientation; follow the links for
specifics. Science vs craft is separated in EVIDENCE_MATRIX.md; sources in RESEARCH_SOURCES.md.

## 1. Speech in three views (phonetics)
- **Articulatory** — how sounds are made: airflow (breath), vocal-fold vibration (voicing, pitch, voice quality),
  vocal tract shaping (vowels, consonants, resonance) [IPA1999, Laver1980].
- **Acoustic** — what the sound wave carries: fundamental frequency F0 (heard as pitch), intensity (loudness), duration
  (timing), formants (vowel quality; F1 ≈ openness, F2 ≈ front/back), spectral balance (tense ↔ breathy), periodicity
  (HNR, jitter, shimmer) [Eyben2016, Praat-Manual].
- **Auditory** — what listeners perceive: pitch on a log scale (use semitones), loudness, length, timbre; perception is
  categorical for tones/phonemes and gradient for emotion [Ladd2008].
- **IPA** is the shared notation for pronunciations (Thai tones: mid, low, falling, high, rising) [IPA1999, TingsabadhAbramson1993].

## 2. Prosody (the melody, rhythm and weight of speech)
- **Intonation** — phrase-level pitch: accents on important words and boundary tones at phrase ends; meaning comes from
  contrast with what is given [Pierrehumbert1980, Ladd2008, PierrehumbertHirschberg1990].
- **Stress** — lexical (which syllable of a word) and sentence (which word of a sentence) prominence via pitch, length,
  loudness [Fry1958, Cutler1997]. Thai: prominence mostly duration on the final syllable; unstressed syllables reduce
  [PotisukGandourHarper1996].
- **Rhythm** — timing patterns differ by language (English stress-timed tendencies, many languages more syllable-timed;
  metrics are debated) [Ramus1999, GrabeLow2002].
- **Connected speech** — assimilation, reduction, elision in fluent speech; over-careful TTS sounds robotic
  [Shockey2003]. Thai: r→l, cluster simplification, tone reduction in unstressed syllables [IwasakiIngkaphirom2005].
- **Pragmatics** — the same words do different things (request, offer, refusal); politeness and face shape hedges and
  particles [BrownLevinson1987]. Thai particles (ครับ/ค่ะ/คะ/นะ/จ้ะ/ล่ะ/สิ) carry attitude and boundary intonation
  [Pittayaporn2007, Cooke1989].

## 3. Emotion
- **Models**: basic emotions [Ekman1992], wheel of blends [Plutchik2001], circumplex valence × arousal [Russell1980],
  PAD with dominance [Mehrabian1996], 27 categories with gradients [CowenKeltner2017], 24 kinds of vocal bursts
  [Cowen2019]. None is "the" standard; the library (108 states) is a working tool, not a taxonomy.
- **Vocal emotion**: arousal is the strongest cue set (pitch level/range, loudness, rate, spectral energy); valence and
  attitude rely more on voice quality; members of a family differ by intensity (cold vs hot anger) [Scherer2003,
  BanseScherer1996, JuslinLaukka2003, GoblNiChasaide2003, GoudbeekScherer2010].
- **Push vs pull**: emotional speech is part physiology, part social display — genre and politeness decide how much
  shows [BanseScherer1996, Scherer2003].
- **Culture**: recognition works across languages but better in-group; display rules differ (Thai krengjai, face)
  [Pell2009, ElfenbeinAmbady2002, LaukkaElfenbein2021].
- **Hidden, mixed, sarcastic speech**: the outer layer plus a leak; sarcasm cues differ by language (English slow/low;
  Thai faster/higher in one small study) [CheangPell2008, KumwapeeJitwiriyanont2020].

## 4. Acting and direction (craft)
Given circumstances → objective (a verb) → obstacle → action; subtext = what is meant but not said; beats and turning
points; play the intention, not the emotion name; consistency of character across scenes [Alburger2024; Stanislavski
tradition — craft]. Implemented in SCRIPT_ANALYSIS.md, EMOTION_TRANSITIONS.md, CHARACTER_VOICE_BIBLE.md.

## 5. Thai
5 lexical tones decided by consonant class × live/dead syllable × tone mark; contrastive vowel length; unreleased final
stops; clusters; silent letters; spoken readings that differ from spelling (เขา, ฉัน, ไหม→มั้ย); particles by gender and
politeness; numbers/dates/prices need normalisation; English loanwords get tones by rule tendencies; emotion must ride
on top of tones, mainly through register, range, rate, voice quality and particles. → THAI_PRONUNCIATION.md.

## 6. Speech synthesis
From concatenative/unit-selection (Thai VAJA) to neural TTS (Tacotron 2, FastSpeech 2 with pitch/energy/duration
predictors, VITS), style tokens and prosody transfer, and now prompt-controlled TTS (PromptTTS, InstructTTS,
Parler-TTS, Gemini/OpenAI style prompts) [Shen2018, Ren2021, Kim2021, Wang2018, SkerryRyan2018, Guo2023, Yang2023,
LythKing2024]. Control surfaces differ per provider: natural-language style, SSML, style tags, lexicons
→ TTS_PROVIDER_ADAPTERS.md.

## 7. Measuring and judging
Acoustics with Praat/Parselmouth (GeMAPS-style features) → AUDIO_ANALYSIS.md. Subjective quality by listening tests
(ACR/MOS, MUSHRA; compare within one session) and intelligibility via ASR CER; automatic MOS predictors only as a
rough screen → QUALITY_CONTROL.md. Emotional speech datasets and their licences → AUDIO_ANALYSIS.md §5.

## 8. What is known to be weak
- Almost all emotion-acoustics evidence is acted and non-Thai; Thai emotional prosody data are scarce (THAI-SER has 5
  labels; one sarcasm study with 4 speakers).
- Most of the 108 emotion profiles are craft (80 marked low confidence).
- Provider docs change monthly (model names already drifted between this project's scripts and the docs).
- Automatic checks cannot judge tones or naturalness; a native listener is required for a real 90/100.
