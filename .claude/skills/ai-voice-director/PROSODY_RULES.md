# Prosody Rules

How direction values (VOICE_DIRECTION_SCHEMA.json → `prosody`) are chosen. Every value is **relative to the
character's baseline** (CHARACTER_VOICE_BIBLE.md). Tags: [finding: keys] = research (RESEARCH_SOURCES.md),
[craft] = practice. Most findings come from acted speech in Western languages; treat them as tendencies.

## 1. The main axes
| axis | what moves | evidence |
|---|---|---|
| **Arousal / activation** (calm ↔ excited) | F0 level ↑, F0 range ↑, loudness ↑, rate ↑, more high-frequency energy (flatter spectral tilt) | strongest, most replicated cue set [finding: Scherer2003, BanzigerScherer2005, Laukka2005, Pell2009, JuslinLaukka2003] |
| **Valence** (pleasant ↔ unpleasant) | weakly coded by pitch/speed; more by voice quality (tension, breathiness, roughness) and spectral balance | [finding: GoudbeekScherer2010, Laukka2005, Scherer2003] |
| **Dominance / power** | lower F0, falling endings, steady rate, tense/pressed quality = power; raised F0, rising/soft endings = deference | frequency code [finding: Ohala1984, Gussenhoven2002, GoblNiChasaide2003] |
| **Intensity** inside one emotion | same family, different member: cold vs hot anger, anxiety vs panic, sadness vs despair, happiness vs elation | [finding: BanseScherer1996, Scherer2003] |

**Starting map (Scherer2003 Table 1 tendencies, never a recipe):** hot anger — loud, high, wide, fast, bright, falling;
fear/panic — high, fast, bright; sadness — low, narrow, slow, soft; joy/elation — higher, wider, faster; boredom —
flat, narrow, slow; tenderness — low-soft, breathy, slow. Each emotion entry in EMOTION_LIBRARY.json gives its own
values and 2–4 valid variants.

## 2. Value guide (relative to baseline)
| field | small change | clear change | big change | notes |
|---|---|---|---|---|
| pitch_baseline | ±0.75–2 st (slightly_) | ±2–4 st | > 4 st (much_) | thresholds used by tools/analyze_audio.py |
| pitch_range | ×0.8–1.25 = baseline | ×0.55–0.8 narrow / ×1.25–1.6 wide | < 0.55 / > 1.6 | measured p5–p95 in semitones |
| rate | ±5–15 % | ±15–28 % | > 28 % | articulation rate (syllables per second of speech) |
| loudness | soft / projected | whisper / shout | — | TTS loudness is normalised: express it through effort/voice quality words |
| pauses | micro 80–200 ms | breath 250–450 ms, hesitation 300–700 ms | dramatic 600–1500 ms, comic beat 400–900 ms | [craft]; Thai punctuation-free text needs explicit pause marks |

## 3. Rules
1. **Direct arousal first, then voice quality, then melody.** Pitch and speed alone cannot separate e.g. joy from anger; say the quality (warm/tense/breathy/rough) explicitly [finding: GoudbeekScherer2010, GoblNiChasaide2003].
2. **Name the family member and intensity**, not just the family ("quiet, cold anger at 0.6", not "angry") [finding: BanseScherer1996].
3. **Level and range matter more than contour shape.** Calm/sad readings peak early and drift down; high-arousal readings keep F0 high until a late, steep fall [finding: BanzigerScherer2005; tentative].
4. **Accent = information.** Bigger pitch movement / length on new or contrastive words; de-accent given words; never stress function words or particles [finding: Gussenhoven2002, Cutler1997].
5. **Voice quality carries attitude** — mild moods, warmth, intimacy, politeness are mostly voice quality: breathy/lax = intimate, tired, sad; tense/pressed = stressed, angry, confident; creak at phrase ends = resigned, bored, cool [finding: GoblNiChasaide2003, Scherer1986].
6. **Non-verbal bursts are their own channel** (sigh, gasp, laugh, "อือ") — script them separately; they carry emotion strongly and some travel across cultures [finding: Cowen2019, Sauter2010].
7. **Two or three readings per emotion.** Studies show several valid cue combinations; choose by scene and character [finding: BanzigerScherer2005, BryantFoxTree2005; craft].
8. **Display rules:** acted emotion is partly social display ("pull"). Cartoon = stylised and slightly bigger; commercial = restrained warmth; narration = colours, never fully becomes the character [finding: BanseScherer1996, Schroder2001 (low confidence for "exaggerate for cartoons")].
9. **Voice alone is not enough.** Even validated acted audio-only emotion was recognised ≈ 60% in RAVDESS — support emotion with words, picture, music [finding: Livingstone2018].
10. **Avoid the AI defaults:** uniform pauses at every comma, over-long dramatic pauses, the same melody on every sentence, stressed particles, "announcer" endings on intimate lines [craft].

## 4. Thai (lexical tone + emotion)
1. **Emotion never changes a word's lexical tone.** It moves the overall register (level), range, rate, loudness, voice quality, pauses, particles and interjections. Thai keeps the five tones distinct even in fast, compressed speech [finding: TingsabadhAbramson1993, GandourEtAl1999, MorenZsiga2006].
2. **Do not ask for pitch moves on words** ("rise at the end of เปิด"): the timing of the pitch peak is part of the tone and a misplaced rise can turn a rising tone into a high one [finding: ZsigaNitisaroj2007].
3. **Attitude intonation lives on the sentence-final particle.** What English puts on the last word, Thai puts on นะ / ล่ะ / เหรอ / สิ / จ้ะ / ครับ / ค่ะ; boundary tones surface on toneless particles [finding: Pittayaporn2007, Jiamsundutsadee2023].
4. **Emphasis in Thai = length (and loudness) on the last syllable of the word**, more than a pitch jump [finding: PotisukGandourHarper1996 → craft].
5. **Stretch vowels in proportion** for slow/sad/ghostly lines — short vowels must stay shorter than long ones or the word changes (เขา/ขาว) [finding: Abramson1993ASA; craft].
6. **Unstressed syllables are light** (first syllables of กระ- ประ- สะ-, function words); never stress them [finding: IwasakiIngkaphirom2005, PotisukGandourHarper1996].
7. **Sarcasm/irony in Thai is not the English recipe.** One small Thai study: faster, higher, wider, louder; English: slower, lower, flatter. A/B test both [finding: KumwapeeJitwiriyanont2020, CheangPell2008, CheangPell2009].
8. **Measuring endings in Thai:** a final particle's own tone (ครับ, คะ, นะ high; ไหม rising) dominates the last 300 ms — judge "falling/soft ending" on the last content word or by ear (QUALITY_CONTROL.md §5, measured on EP01).
9. **Thai listeners decode Thai-native expressive style best**; don't import exaggerated Western templates [finding: Pell2009, LaukkaElfenbein2021, ElfenbeinAmbady2002].

## 5. Turning values into provider controls
See TTS_PROVIDER_ADAPTERS.md. Conceptual values above are never sent as-is: Gemini receives words ("a little slower
than normal, breathy, letting the end fall softly"), SSML providers receive numbers (rate %, pitch st, break ms).
