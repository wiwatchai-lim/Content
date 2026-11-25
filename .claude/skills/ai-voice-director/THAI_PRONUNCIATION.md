# Thai Pronunciation for AI Voice

Load this for any Thai or Thai-English line. Sources and evidence levels: `research/B_thai.md` (keys in
RESEARCH_SOURCES.md). Tags: [key] = research; [ortho] = standard spelling rule; [craft] = director practice.

## 1. Workflow per script
1. **Spelling check** — ค่ะ/คะ (นะคะ not นะค่ะ), การันต์, ๆ, ฯ [Tiratanti2022].
2. **Normalise** — `python tools/thai_normalize.py --file script.txt [--style casual]` writes numbers, prices, dates,
   times, phone numbers and dictionary words out in Thai words; put the result in `spoken_text` (subtitles keep `text`).
   `--style casual` = conversational readings (บ่ายสองโมงครึ่ง, มั้ย, ยังไง); default formal (สิบสี่นาฬิกาสามสิบนาที).
3. **Brands & loanwords** — one fixed reading per brand per project from `PRONUNCIATION_DICTIONARY.json` (§2.8).
4. **Register** — choose standard vs spoken forms per character (CHARACTER_VOICE_BIBLE.md): narration and shop VO
   standard; cartoon dialogue may use spoken forms (§2.5).
5. **Emotion words in the prompt** never ask to change the pitch of words; they ask for overall level/range, speed,
   weight, breath, voice quality and the particle (§2.1 rule 8–10).
6. **Listen** — every new word gets one listening check; when right, set `verified: true` in the dictionary.
   Automatic intelligibility: `tools/qc.py --asr small` (CER vs spoken_text; ASR errors ≠ mispronunciation).

## Pronunciation Dictionary (PRONUNCIATION_DICTIONARY.json)
Fields: `written`, `spoken` (Thai-script respelling sent to the TTS), optional `ipa`, `style` (casual/formal),
`whole_word` (Latin words), `case_sensitive`, `not_in` (longer words to protect, e.g. ไหม → มั้ย but never in ผ้าไหม;
เขา → เค้า but never in ภูเขา), `category`, `note`, `verified`. Applied longest-first, before numbers.
Add a word → run `python tools/run_tests.py` → generate one test take → listen → `verified: true`.

Known limits of the normaliser (tested in TEST_CASES / run_tests.py): years are read as full numbers
(สองพันห้าร้อยหกสิบเก้า); casual digit-by-digit years ("ปีสองห้าหกเก้า") must be written by hand; 1,000,001 →
หนึ่งล้านหนึ่ง; model codes glued to Latin letters (RB3025) are left to the TTS; ๆ is kept (write the word twice if a
TTS skips it).

## 2. Rules (กฎภาษาไทยสำหรับผู้กำกับเสียง AI)

Tag key: [source key] = has research support; [ortho] = standard Thai spelling rule (Aroonmanakun2007 /
textbook level); [craft] = director experience, not research. "มาตรฐาน" = standard Thai; "ภาษาพูด" = conversational.

### 2.1 Tones (วรรณยุกต์)
1. ภาษาไทยกลางมี 5 เสียง: สามัญ (กลาง), เอก (ต่ำ), โท (ตก), ตรี (สูง), จัตวา (ขึ้น). มา/ม่า/ม้า/หมา differ only in tone, so getting the tone wrong changes the word [TingsabadhAbramson1993].
2. Tone comes from three things together: the **consonant class** (สูง/กลาง/ต่ำ), the **syllable type** (คำเป็น = long vowel or a final ง น ม ย ว; คำตาย = short vowel or a final -k -t -p), and the **tone mark** [Aroonmanakun2007].
3. Mid class (ก จ ด ต บ ป อ ฎ ฏ), live syllables: กา = mid, ก่า = low, ก้า = falling, ก๊า = high, ก๋า = rising. This is the only class where the mark name matches the tone [Aroonmanakun2007].
4. High class (ข ฉ ถ ผ ฝ ส ศ ษ ห ฐ ฃ), live, no mark = **rising** (ขา). ่ = low (ข่า), ้ = falling (ข้า) [Aroonmanakun2007].
5. Low class, live, no mark = mid (คา). ่ = **falling** (ค่า), ้ = **high** (ค้า). The mark name does not match the sound, and this is where AI most often goes wrong [Aroonmanakun2007].
6. Dead syllables with no mark: mid or high class = low (กะ, ขาก). Low class with a short vowel = high (คะ, นะ). Low class with a long vowel = falling (คาก, มาก) [Aroonmanakun2007].
7. ห นำ: ห in front of a single low letter (ง ญ น ม ย ร ล ว) makes it follow the high-class rules: หมา (rising), หน้า (falling), หลาย (rising). อ นำ ย has only 4 words: อย่า อยู่ อย่าง อยาก, read with mid-class rules (low tone) [ortho].
8. **Emotion must not change the lexical tone.** Emotion is carried by overall register, pitch range, speed, loudness, voice quality, pauses, particles and interjections. The tone *shape* of each syllable stays [MorenZsiga2006; GandourEtAl1999; Pittayaporn2007]. Even fast, compressed speech keeps all five tones distinct [GandourEtAl1999].
9. Watch the timing of pitch movement. Thai tones depend on where the peak or valley falls. A rise that comes too early can be heard as high instead of rising [ZsigaNitisaroj2007]. Do not tell the AI to "rise at the end" on content words; put the rise on the particle [Pittayaporn2007].
10. The attitude intonation English puts on the last word goes on the **sentence-final particle** in Thai (นะ, ล่ะ, เหรอ, สิ, จ้ะ …). Particles are the natural place for boundary tones [Pittayaporn2007; Jiamsundutsadee2023].

### 2.2 Vowel length (สระสั้น–ยาว)
11. Short vs long is contrastive in every vowel, and duration is the main cue. Minimal pairs: เขา–ขาว, เข้า–ข้าว [Abramson1993ASA; Maspong2025].
12. When you direct "slow, drawn out" (sad, sleepy, ghostly), stretch **in proportion**: short vowels must stay clearly shorter than long ones, or the word changes [Abramson1993ASA; craft].
13. Some common words vary in length in real speech: ได้ (short or long), น้ำ (náam or nám). Either is fine; do not make the AI over-correct [IwasakiIngkaphirom2005].

### 2.3 Finals and clusters (ตัวสะกด, คำควบกล้ำ)
14. Final consonants have 8 sounds: -k (ก ข ค ฆ), -t (ด ต ถ ท ธ จ ช ซ ศ ษ ส ฎ ฏ ฐ ฑ ฒ), -p (บ ป พ ฟ ภ), -n (น ญ ณ ร ล ฬ), -ng, -m, -j (ย), -w (ว). So บาล = /baan/, รส = /rót/ [ortho; Aroonmanakun2007].
15. Final -k -t -p are **unreleased**: no puff of air at the end. If an AI voice releases them (like "rot-tuh"), it sounds foreign. Note it in the style: "Thai unreleased final stops" [TingsabadhAbramson1993 (inventory); craft for the wording].
16. True clusters: กร กล กว ขร ขล ขว คร คล คว ตร ปร ปล พร พล ผล (e.g. ครับ, กลับ, ปลา, ตรง, พร้อม). In formal or commercial voice-over, pronounce **both** consonants [ortho; craft].
17. False clusters: ทร = ซ (ทราย, ทรัพย์, ทราบ). ร is silent in จริง, สร้าง, ศรี, สร้อย [ortho].
18. Everyday speech drops the second consonant (ปลา → ปา, ครับ → คับ/ฮะ) and turns ร into ล (โรงเรียน → โลงเลียน) [IwasakiIngkaphirom2005 (r→l)]. Use this for cartoon characters (young or casual). For commercial VO and narration, keep the standard form [craft].

### 2.4 Silent letters and special marks
19. **การันต์ (์)** makes a letter silent: จันทร์ /jan/, ศุกร์ /sùk/, สิทธิ์ /sìt/, ไมค์, เบอร์, คอมพิวเตอร์. TTS sometimes reads the cancelled letter; listen for it [ortho; Aroonmanakun2007 ch. 4.5].
20. **ๆ** (repeat): write it with a space before (เด็ก ๆ / เด็กๆ). If the TTS skips it, write the word twice: เด็กเด็ก [craft; JaiTTS2026 / Lin2014 on normalisation weakness].
21. **ฯ, ฯลฯ**: write กรุงเทพฯ as กรุงเทพ or กรุงเทพมหานคร, and replace ฯลฯ with "และอื่น ๆ" [craft].
22. Some words are not read as spelled and need the RI dictionary or "อ่านอย่างไร เขียนอย่างไร" (e.g. สมาธิ /sa-maa-thí/, ประวัติศาสตร์). Check doubtful words there before you tell the AI how to say them [ORST_Dictionary_App2015; Yamasaki2022 on g2p ambiguity].

### 2.5 Spoken forms (คำพูดที่ออกเสียงต่างจากรูปเขียน)
23. **เขา** is spelled with rising tone but almost always said **short and high** (/kháw/). This is normal everywhere, not just slang [IwasakiIngkaphirom2005].
24. **ฉัน** is said with high tone (/chán/), so the informal spelling "ชั้น" exists. The spoken form is standard; writing "ชั้น" is informal only (chat or cartoon dialogue) [IwasakiIngkaphirom2005; craft for the spelling].
25. **หนังสือ** is said /náŋ-sɯ̌ɯ/ (high tone on the first syllable) [IwasakiIngkaphirom2005].
26. **ไหม → มั้ย** (/máj/): the spelling ไหม is standard, but everyday speech uses high tone. If the AI reads ไหม with a full rising tone in dialogue, it sounds stiff. In a cartoon script you may write มั้ย [craft; widespread usage].
27. **อย่างไร → ยังไง**, **อะไร → ไร**, **หรือ → เหรอ/รึ**, **ไม่ใช่หรือ → ไม่ใช่เหรอ**, **เท่าไร → เท่าไหร่**: the right column is spoken or colloquial. Use it for dialogue and the standard forms for formal VO [craft].
28. **ครับ → คับ/ฮะ**, **ค่ะ → ค่า (drawn out)**, **ใช่ไหม → ใช่มะ**: casual or cute forms. Use them only if they fit the character [craft].
29. Unstressed syllables (the first syllable of กระ- ประ- สะ- มะ-, and of two-syllable words) are said shorter and lighter. Their tone may be neutralised and their glottal stop dropped. Do not stress them [IwasakiIngkaphirom2005 §1.2.5; PotisukGandourHarper1996]. To emphasise a word, lengthen its **last syllable** rather than raise its pitch [PotisukGandourHarper1996 → craft].

### 2.6 Particles (คำลงท้าย) by gender, politeness and emotion
30. **ครับ** (male, polite) / **ค่ะ** (female, falling, statements) / **คะ** (female, high, questions and after นะ: **นะคะ** not นะค่ะ) [Tiratanti2022; IwasakiIngkaphirom2005 ch. 14].
31. **นะ** = softens, persuades, asks for understanding. **นะครับ/นะคะ** = polite and warm, good for ad CTAs. **เนอะ** = invites agreement (friendly). **ล่ะ** = pushes for an answer, or contrast. **สิ/ซิ** = urges or insists. **หรอก** = softens a denial. **เหรอ** = surprised or doubtful question [Cooke1989 (particle family; meanings here from craft); IwasakiIngkaphirom2005 ch. 15].
32. **จ้ะ/จ๊ะ/จ้า**: warm, intimate, from elders to younger people (ghost grandma Jan: "กินข้าวหรือยังจ๊ะ หลาน"). **จ้า** is bright and friendly in ads. **ฮะ/ครับผม**: a young man being polite (Ton). **วะ/ว่ะ/โว้ย**: rude, male friends only, never in shop VO [craft].
33. The particle carries the emotion: soft, short and falling = gentle; drawn out = whining or cute; clipped and loud = annoyed. **The particle's own tone shape still stays** (ค่ะ falls, คะ rises high) [Pittayaporn2007; Jiamsundutsadee2023; craft].
34. Interjections (โอ๊ย อุ๊ย เฮ้ย ว้าย อ้าว เอ๊ะ) are important carriers of Thai emotion and good places to change voice quality without touching a content word's tone [Yimngam2011; craft].
35. Sarcasm in Thai does not have to be slow and low like English. One Thai study found it faster, higher and with a wider range (small sample). Give the AI both options and pick by ear [KumwapeeJitwiriyanont2020; CheangPell2008].

### 2.7 Numbers, dates, times and prices: write them so TTS reads them right
36. **Prices**: in short ads, write them **in Thai words** to be safe: "หนึ่งพันสองร้อยเก้าสิบบาท" instead of "1,290 บาท" or "฿1,290" (a TTS may read the comma, the ฿ symbol or the digits wrongly). Remember **เอ็ด**: 21 = ยี่สิบเอ็ด, 101 = หนึ่งร้อยเอ็ด, and 20 = **ยี่**สิบ [ThaiNumberReading_Textbook; JaiTTS2026; Lin2014; craft].
37. **Satang**: 2.50 บาท → "สองบาทห้าสิบสตางค์" (money is read with its units). For other decimals, read the digits after the point one by one: 3.25 → "สามจุดสองห้า" [ThaiNumberReading_Textbook].
38. **Time**: "14:30 น." in formal or announcement style → "สิบสี่นาฬิกาสามสิบนาที" [ThaiNumberReading_Textbook]. In everyday speech or ads → "บ่ายสองโมงครึ่ง". Common spoken times: 07:00 เจ็ดโมงเช้า, 12:00 เที่ยง/เที่ยงวัน, 13:00 บ่ายโมง, 16:00 สี่โมงเย็น, 19:00 หนึ่งทุ่ม, 23:00 ห้าทุ่ม, 24:00 เที่ยงคืน, 02:00 ตีสอง (the night-optic series ร้านแว่นตีสอง) [craft]. Write it in words so the AI does not pick its own reading.
39. **Dates and years**: "พ.ศ. 2569" in formal style → "พุทธศักราชสองพันห้าร้อยหกสิบเก้า". In casual speech or ads, people say "ปีสองห้าหกเก้า" (digit by digit). For dates, write "วันที่ยี่สิบสี่ พฤศจิกายน" instead of "24/11" [craft; ThaiNumberReading_Textbook for official digit-by-digit numbers].
40. **Phone numbers and codes**: digit by digit with grouping pauses, e.g. "ศูนย์แปดหนึ่ง - สองสามสี่ - ห้าหกเจ็ดแปด". Also write out percentages ("ห้าสิบเปอร์เซ็นต์"), abbreviations (ซม. → เซนติเมตร, กม. → กิโลเมตร, น. → นาฬิกา) and the % sign. Never leave Latin abbreviations to the AI [Lin2014; craft].

### 2.8 English brand names and loanwords in Thai text
41. The Royal Institute's loanword spelling does not use tone marks, so official spellings like คอมพิวเตอร์ or เทคโนโลยี do not show the tone people actually use. For voice scripts, **spell how it is said** (you may add tone marks), or test the AI on the word first [Kanchanawan2006].
42. Tendencies for English → Thai tones: a syllable ending in a nasal is mid (แฟน, เคลม). A nasal plus an English stop at the end, or a short stop-final syllable, tends towards **high** (แคมป์, เต็นท์). English p/t/k at the start become aspirated พ/ท/ค [Sirikanerat2015; KenstowiczSuchato2006; Gandour1979].
43. Decide for every brand whether to say it the **English way** (keep it in Latin script, e.g. "Ray-Ban") or the **Thai way** (write it in Thai, e.g. "เรย์แบน"). Do not let the AI choose differently in each line. Write the decision in the clip's pronunciation sheet [craft; JaiTTS2026 code-switching].
44. For a mixed Thai-English line, test-generate it first, because code-switching is a known weak point of Thai TTS [JaiTTS2026; Geng2025].

### 2.9 Quick checklist before generating
45. Check: ค่ะ/คะ matches the sentence type; the particle fits the character's gender and status; numbers, times and prices are written out; every brand has one fixed reading; the character's register (formal or casual) matches the script; the emotion instruction does not say "change the pitch of the words", only "the overall voice / speed / weight / breath / particle" [craft, summary].

---

