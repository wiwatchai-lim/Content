# Shared brief for everyone building the ai-voice-director skill

Skill folder: `C:\timeoptic-content\.claude\skills\ai-voice-director\`
Project: a Thai eyewear shop's content studio (Time Optic). Voices are made with **Gemini TTS** (`tools/gemini_tts.py`,
models `gemini-2.5-flash-preview-tts` / `gemini-3.1-flash-tts-preview`, prebuilt voices such as Puck, Sulafat; style is
given as a natural-language prompt "Say this like <style>: <text>"). Story clips are Thai (cartoon series "ร้านแว่นตีสอง"
night-optic: Ton = young optician, Jan = gentle ghost grandma, Chan = old uncle; "eyesight" series; Mint & Tao dialogue
stories). Commercial VO for the shop is Thai or English.

## Honesty rules (apply to every file)
- Never invent a reference. Only cite what you actually found. If you could only see an abstract / publisher page, say
  "abstract only". Record what you could not verify.
- Separate **scientific finding** (with a source) from **artistic / practitioner advice** (voice-acting craft).
- Acoustic tendencies of emotions are *tendencies across studies, mostly acted speech, mostly Western languages* —
  never "the" pattern. Always give more than one way to perform an emotion.

## Citation keys (use exactly these keys; research agents verify them and add more)
| key | reference |
|---|---|
| BanseScherer1996 | Banse & Scherer 1996, Acoustic profiles in vocal emotion expression, JPSP 70(3) 614–636, doi:10.1037/0022-3514.70.3.614 |
| JuslinLaukka2003 | Juslin & Laukka 2003, Communication of emotions in vocal expression and music performance, Psych. Bulletin 129(5) 770–814, doi:10.1037/0033-2909.129.5.770 |
| Scherer2003 | Scherer 2003, Vocal communication of emotion: a review of research paradigms, Speech Communication 40, 227–256, doi:10.1016/S0167-6393(02)00084-5 |
| Russell1980 | Russell 1980, A circumplex model of affect, JPSP 39(6) 1161–1178, doi:10.1037/h0077714 |
| Mehrabian1996 | Mehrabian 1996, Pleasure-arousal-dominance: a general framework…, Current Psychology 14, 261–292, doi:10.1007/BF02686918 |
| Ekman1992 | Ekman 1992, An argument for basic emotions, Cognition & Emotion 6(3–4) 169–200, doi:10.1080/02699939208411068 |
| Plutchik2001 | Plutchik 2001, The nature of emotions, American Scientist 89(4) 344–350, doi:10.1511/2001.4.344 |
| CowenKeltner2017 | Cowen & Keltner 2017, Self-report captures 27 distinct categories of emotion…, PNAS 114(38) E7900–E7909, doi:10.1073/pnas.1702247114 |
| Cowen2019 | Cowen, Elfenbein, Laukka & Keltner 2019, Mapping 24 emotions conveyed by brief human vocalization, American Psychologist 74(6) 698–712, doi:10.1037/amp0000399 |
| GoblNiChasaide2003 | Gobl & Ní Chasaide 2003, The role of voice quality in communicating emotion, mood and attitude, Speech Communication 40, 189–212, doi:10.1016/S0167-6393(02)00082-1 |
| BanzigerScherer2005 | Bänziger & Scherer 2005, The role of intonation in emotional expressions, Speech Communication 46, 252–267, doi:10.1016/j.specom.2005.02.016 |
| CheangPell2008 | Cheang & Pell 2008, The sound of sarcasm, Speech Communication 50(5) 366–381, doi:10.1016/j.specom.2007.11.003 |
| Pell2009 | Pell, Paulmann, Dara, Alasseri & Kotz 2009, Factors in the recognition of vocally expressed emotions: a comparison of four languages, J. Phonetics 37(4) 417–435, doi:10.1016/j.wocn.2009.07.005 |
| Eyben2016 | Eyben et al. 2016, The Geneva Minimalistic Acoustic Parameter Set (GeMAPS), IEEE Trans. Affective Computing 7(2) 190–202, doi:10.1109/TAFFC.2015.2457417 |
| TingsabadhAbramson1993 | Tingsabadh & Abramson 1993, Thai (Illustrations of the IPA), JIPA 23(1) 24–28, doi:10.1017/S0025100300004746 |
| Ladd2008 | Ladd 2008, Intonational Phonology (2nd ed.), Cambridge UP |
| BrownLevinson1987 | Brown & Levinson 1987, Politeness: Some Universals in Language Usage, Cambridge UP |
| W3C_SSML11 | W3C 2010, Speech Synthesis Markup Language (SSML) 1.1, https://www.w3.org/TR/speech-synthesis11/ |
| GeminiTTSDocs | Google, Gemini API speech generation docs, https://ai.google.dev/gemini-api/docs/speech-generation |
| Artistic | practitioner / voice-acting craft advice, not a scientific finding |

Research agents may add keys (format AuthorYear). Content agents (emotion library, examples) cite ONLY keys above,
plus `Artistic`.

## Emotion entry format (EMOTION_LIBRARY.json → "emotions": [ … ])
```json
{
  "id": "sadness.melancholy",               // family.name, lowercase, unique
  "name_en": "Melancholy", "name_th": "เศร้าซึม",
  "type": "primary|secondary|mixed|suppressed|hidden|conflict|transition|social|stance|performance",
  "family": "sadness",
  "vad": { "valence": -0.6, "arousal": 0.25, "dominance": 0.3 },   // valence -1..1, arousal 0..1, dominance 0..1 (rough placement)
  "meaning": "psychological meaning + typical context (1–2 sentences)",
  "speaker_intent": "what the speaker is usually trying to do",
  "pitch_level": "relative to the character baseline, e.g. slightly lower",
  "pitch_range": "e.g. narrow; little movement",
  "rate": "e.g. slow, longer vowels",
  "energy": "e.g. low, soft onsets",
  "pauses": "where and how long",
  "voice_quality": "e.g. breathy, sometimes creaky at phrase ends",
  "breath": "e.g. audible exhale before phrases",
  "emphasis": "which words get weight and how",
  "thai_note": "how to do it in Thai without changing lexical tones / with particles (ครับ ค่ะ นะ จ้ะ เนอะ ล่ะ)",
  "examples_th": ["…", "…"],
  "examples_en": ["…"],
  "variants": ["2–4 different valid performances, each a short actor note"],
  "ai_mistakes": ["typical TTS / AI errors for this emotion"],
  "gemini_style": "a short natural-language style phrase for Gemini TTS, e.g. 'a tired man quietly remembering his late wife, slow and soft'",
  "refs": ["BanseScherer1996", "Artistic"],
  "confidence": "high|medium|low",            // confidence in the acoustic tendencies (high = several studies agree)
  "evidence_note": "what is measured vs. what is craft; e.g. 'acted-speech studies; no Thai data'"
}
```
Scientific tendencies you may rely on (from the key sources): high-arousal emotions (hot anger, fear/panic, joy/elation)
→ higher F0 level, wider range, faster rate, more energy; low-arousal (sadness, boredom, tenderness) → lower/narrower F0,
slower, softer; hot vs cold anger differ in arousal; voice quality (tense / breathy / creaky) carries much of the
attitude (GoblNiChasaide2003); recognition of vocal emotion works across languages but better in-group (Pell2009);
sarcasm in English often slower rate, lower mean F0, less F0 variation (CheangPell2008). Many mixed/social/hidden emotions
have little or no direct acoustic research → mark confidence low and refs ["Artistic", ...].
