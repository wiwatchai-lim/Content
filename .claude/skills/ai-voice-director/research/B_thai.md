# B — Thai phonetics, prosody, particles, text normalisation (research file)

Scope B of the ai-voice-director research. I checked every source below myself on 2026-11-24 using web search and fetch.
The "Accessed" field says how much of each source I actually saw. **Scientific finding** = from the source.
**[craft]** = practitioner or director advice, not a research result. Following `_BRIEF.md`, nothing here is invented.
If I could not confirm an item, it is in the Unverified section at the end.

Summary: **34 verified sources** (by bibliographic record, abstract or full text; the access level is stated for each.
4 of them I read in full, and 5 rest only on secondary citation and are marked as such) and **9 unverified items**.

---

## 1. Verified sources

### 1.1 Phonetics and phonology of Standard Thai

**TingsabadhAbramson1993** (brief key)
- Tingsabadh, M.R. Kalaya & Abramson, Arthur S. (1993). "Thai." *Illustrations of the IPA*. Journal of the International Phonetic Association 23(1), 24–28. doi:10.1017/S0025100300004746
- Type: descriptive phonetic reference (IPA illustration).
- Accessed: Cambridge publisher page and the PHOIBLE record. I downloaded the PDF, but it is a scanned image with no text layer, so I could not read the body.
- Findings: describes Standard (Bangkok) Thai from recordings of three educated speakers reading "The North Wind and the Sun" in a relaxed style. It covers the consonants, the vowels with their length contrast, the five tones (mid, low, falling, high, rising) and stress. Use it as the citation for the tone inventory.
- Limitations: I did not read the body, so I cannot quote its details. Do not confuse it with the separate chapter "Thai" in the *Handbook of the IPA* (1999), pp. 147–150.

**MorenZsiga2006**
- Morén, Bruce & Zsiga, Elizabeth (2006). "The lexical and post-lexical phonology of Thai tones." *Natural Language & Linguistic Theory* 24(1), 113–178. doi:10.1007/s11049-004-5454-y
- Type: phonological theory (Optimality Theory) built on phonetic data.
- Accessed: abstract (ProQuest) plus secondary summaries (Karlin 2014; a TCI article).
- Findings: (1) contour tones are simplified at the post-lexical level (in connected speech) *without neutralising* the contrasts. A tone gets shorter or flatter in running speech but stays a different tone. (2) The authors argue the mora is the tone-bearing unit, so short syllables carry only simple tones; this claim is debated. (3) They link gaps in which tones occur on stop-final syllables to final glottalisation.
- Limitations: I did not read the full text. The mora claim is contested.

**ZsigaNitisaroj2007**
- Zsiga, Elizabeth & Nitisaroj, Rattima (2007). "Tone features, tone perception, and peak alignment in Thai." *Language and Speech* 50(3), 343–383.
- Type: production and perception experiment.
- Accessed: secondary citations only (a 2024 J. Phonetics paper; Zsiga 2008, Penn Working Papers).
- Findings, as reported by others: falling vs high and low vs rising differ mainly in *where the F0 peak or valley sits* (its alignment), not only in its height. In a re-run of Abramson's synthetic-pitch test, a steep rise was heard as **high** about 85% of the time and as rising only about 5%. A token was heard as "rising" only when the peak came late in the syllable.
- Voice-direction use: if a TTS line puts pitch movement too early in a syllable (for example, an "excited" rise), the tone can shift from rising to high and change the word.
- Limitations: secondary only.

**GandourEtAl1999**
- Gandour, J., Tumtavitikul, A. & Satthamnuwong, N. (1999). "Effects of speaking rate on Thai tones." *Phonetica* 56, 123–134.
- Type: acoustic production study.
- Accessed: the abstract posted by Gandour on SEALANG-L (Jan 2000).
- Findings: (1) fast speech changes F0 contours of **unstressed** syllables much more than stressed ones. (2) Contour tones (falling, high, rising) get flatter at the fast rate. (3) **All five tones stay distinct** even in fast unstressed syllables, just in a compressed tonal space.
- Voice-direction use: fast, excited delivery is safe for tones as long as stressed syllables (usually the last syllable of a word or phrase) keep their full contour.

**PotisukGandourHarper1996**
- Potisuk, S., Gandour, J. & Harper, M.P. (1996). "Acoustic correlates of stress in Thai." *Phonetica* 53(4), 200–220.
- Type: acoustic study.
- Accessed: the De Gruyter table of contents (citation) plus an abstract on scite.
- Findings: in Thai both duration and F0 carry lexical contrasts, yet **duration is the main cue** separating stressed from unstressed syllables.
- Voice-direction use: to emphasise a word in Thai, *lengthen* its stressed syllable instead of pushing its pitch, because pushing pitch risks distorting the tone [craft inference from the finding].

**PotisukHarperGandour1996ICSLP**
- Potisuk, S., Harper, M.P. & Gandour, J. (1996). "Using stress to disambiguate spoken Thai sentences containing syntactic ambiguity." *Proc. ICSLP 1996*, 805–808. ISCA Archive.
- Type: speech-technology experiment.
- Accessed: abstract (ISCA Archive page).
- Findings: stress in connected Thai is classified at 96–99% accuracy from rhyme duration, mean F0, F0 standard deviation and energy. Stress placement disambiguates compound vs phrase readings.
- Voice-direction use: where stress falls changes meaning in compound-like strings. A TTS that stresses every syllable evenly sounds robotic and can be ambiguous.

**Abramson1993ASA**
- Abramson, Arthur S. (1993). "The stability of a temporal distinction: vowel length in Thai." Paper 3aSP7, 126th Meeting of the Acoustical Society of America, Denver.
- Type: conference abstract (production study: read speech, fast rate, casual conversation).
- Accessed: full abstract (auditory.org).
- Findings: Thai short and long vowels are distinguished by **relative duration**. The contrast is "rather stable" across rates and in casual conversation, and overlap mostly disappears once context is controlled.
- Voice-direction use: slow or dramatic delivery must stretch short vowels *proportionally*. A short vowel stretched to "long" length can become a different word (เขา vs ขาว).

**Maspong2025**
- Maspong, Sireemas (2025). "Articulatory characteristics of vowel length: intrinsic vs extrinsic accounts." Abstract, IPS LMU Munich (Mampf colloquium, SS 2025).
- Type: articulatory (EMA) study, 19 speakers, three speaking rates.
- Accessed: full abstract (PDF).
- Findings: Thai vowel length is contrastive for all monophthongs, and duration is the primary acoustic and perceptual cue. Long vowels also have a longer articulatory plateau and a more extreme tongue position. These differences stay stable across fast, normal and slow rates.

**AbramsonRen1990** (verified as a citation only)
- Abramson, A.S. & Ren, N. (1990). "Distinctive vowel length: duration vs. spectrum in Thai." *Journal of Phonetics* 18, 79–92.
- Accessed: secondary citation (an LMU abstract and Chula references).
- Findings, as cited: duration rather than vowel quality is the main length cue.
- Limitations: I did not see its abstract.

**Abramson1979ICPhS**
- Abramson, A.S. (1979). Paper on Thai tones, *Proceedings of the 9th ICPhS* (Copenhagen), p. 380.
- Accessed: search-indexed summary. The PDF is a scan, so I could not read the body.
- Findings, as indexed: Thai tones fall into *dynamic* tones (falling, rising), which have fast F0 movement, and *static* tones (high, mid, low).
- Limitations: I did not read the full text, and the exact title is unconfirmed.

**Aroonmanakun2007**
- วิโรจน์ อรุณมานะกุล (2007, preface dated 7 April 2550). *อักขรวิธีไทยและการถอดอักษรฯ* [Thai orthography and transliteration]. Dept. of Linguistics, Chulalongkorn University (PDF on arts.chula.ac.th). Based on TRF-funded research 2546–2548.
- Type: scholarly handbook of Thai spelling and its rules, written to build Thai reading software.
- Accessed: **full text** (225 pages; I read the tone-rule chapter).
- Findings: (1) three consonant classes: high = 11 letters (ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห), mid = 9 (ก จ ฎ ฏ ด ต บ ป อ), low = the rest. Low class splits into 14 "paired" low letters (ค ฅ ฆ ช ฌ ซ ฑ ฒ ท ธ พ ภ ฟ ฮ, which pair with high letters) and 10 "single" low letters (ง ญ ณ น ม ย ร ล ว ฬ). (2) Full tone tables by class and by live vs dead syllable: mid live กา ก่า ก้า ก๊า ก๋า; high live: no mark = rising (ขา), ่ = low, ้ = falling; low live: no mark = mid, ่ = falling (ค่า), ้ = high (ค้า); low dead: short vowel with no mark = high (คะ), long vowel with no mark = falling (คาก). (3) Separate chapters on leading consonants (อักษรนำ), clusters and การันต์. The book also says common software reads many words wrongly because they are not pronounced as spelled.
- Voice-direction use: the source for the tone-rule summary in §2.

**IwasakiIngkaphirom2005**
- Iwasaki, Shoichi & Ingkaphirom, Preeya (2005). *A Reference Grammar of Thai*. Cambridge University Press. ISBN 0521650852.
- Type: reference grammar built on spoken data.
- Accessed: front matter (table of contents plus the "Transcription and data information" section) from cambridge.org.
- Findings: (1) **Some common words are always pronounced with a different tone than the spelling implies**: เขา 'he', ฉัน 'I' and หนังสือ 'book' are given high tone on the relevant syllable in the book's pronunciation spelling. (2) Some words vary in **vowel length** against their spelling, e.g. ได้ (short or long) and น้ำ 'water' (náam vs nám). (3) "In most speech, the orthographic /r/ is pronounced as /l/", e.g. โรงเรียน, รู้สึก. (4) The book has a section on "glottal stop deletion and tone neutralization" and one on "stress and syllable duration" (§1.2.5–1.2.6). Chapter 14, speech-level particles, is organised by **high / mid / low formality** plus response tokens. Chapter 15, pragmatic particles, has general, information-oriented and action-oriented particles plus particle combinations.
- Limitations: I saw the front matter only, not the particle chapters themselves.

### 1.2 Tone vs intonation and emotion in Thai

**Pittayaporn2007**
- Pittayaporn, Pittayawat (2007). "Prosody of final particles in Thai: interaction between lexical tones and intonation." Paper, workshop "Intonational Phonology: Understudied or Fieldwork Languages", Saarbrücken (ICPhS satellite), 5 Aug 2007.
- Type: phonological analysis.
- Accessed: search-engine fragments of the PDF (the UCLA host blocked direct fetch) plus the summary in Jiamsundutsadee 2023.
- Findings: Thai sentence-final particles are **intonational clitics** at the right edge of the intonational phrase. Some are tonal and some toneless, and **boundary tones (intonation) surface only on toneless particles**.
- Voice-direction use: in Thai, much of the "attitude intonation" an English speaker puts on the last content word belongs on the **particle**. Content words keep their lexical tones.

**Jiamsundutsadee2023**
- Jiamsundutsadee, Ratanon (2023). "On the acoustic reality of 'toneless' morphemes in Thai: preliminary investigations from sequence-internal final particles." *Journal of Integrative and Innovative Humanities* 3(1), 52–76.
- Type: acoustic study of natural speech.
- Accessed: abstract (TCI page).
- Findings: tonal final particles have a significantly greater F0 rate of change, and toneless ones have more variable pitch range. This supports the tonal / toneless split for particles.

**KumwapeeJitwiriyanont2020**
- Kumwapee, Nimit & Jitwiriyanont, Sujinat (2020). "Expressing the opposite: acoustic cues of Thai verbal irony." *Proc. PACLIC 34* (ACL Anthology 2020.paclic-1.50).
- Type: acted reading (4 speakers, neutral vs sarcastic readings).
- Accessed: **full text**.
- Findings: (1) overall, Thai sarcasm was produced with a **faster** rate, **higher** mean F0, **wider** F0 range and higher amplitude. Its review notes this is the *opposite* of English and Cantonese, where sarcasm is usually slower with lower F0 (CheangPell2008). (2) Gender differed: male speakers *slowed down* and raised F0 mean, female speakers widened F0 range, and both got louder.
- Voice-direction use: do not port the English sarcasm recipe (slow, low, flat) straight into Thai. Give two or more options. Only 4 speakers, so confidence is low.

**Yimngam2011**
- Yimngam, S., Premchaiswadi, W. & Kreesuradej, W. (2011). "Prosody analysis of Thai emotion utterances." *NLDB 2011*, LNCS 6716, 177–184. doi:10.1007/978-3-642-22327-3_18
- Type: acoustic analysis of interjections clipped from Thai films, in 8 categories (neutral, anger, happiness, sadness, fear, pleasant, unpleasant, surprise), compared with other languages. Aimed at emotional TTS.
- Accessed: abstract (KMITL repository / Springer record).
- Findings: the abstract gives no figures, so this is cited only as evidence that **interjections** (e.g. โอ๊ย, อุ๊ย, เฮ้ย) are a studied carrier of Thai emotion.

**WongpithayadisaiEtAl2025** (THAI-SER)
- Wongpithayadisai, J., Chaksangchaichot, C., …, Nutanong, S. & Chuangsuwanich, E. (2025). "THAI Speech Emotion Recognition (THAI-SER) corpus." arXiv:2507.09618. VISTEC, Chulalongkorn University and depa. CC BY-SA 4.0, HF `airesearch/thai-ser`.
- Type: corpus paper.
- Accessed: arXiv abstract plus the HF dataset listing.
- Findings: 41 h 36 min, 27,854 utterances from 200 professional actors (directed by Chula Faculty of Arts people), with **5 labels: neutral, angry, happy, sad, frustrated**. Krippendorff's α = 0.692 after filtering, and human recognition accuracy up to 0.772. Even native listeners disagree on about 1 in 4 acted clips, so Thai emotion needs context and words, not just prosody.
- Limitations: the abstract reports no acoustic profiles per emotion.

### 1.3 Particles and politeness

**Cooke1989**
- Cooke, Joseph R. (1989). "Thai sentence particles: forms, meanings and formal-semantic variations." In *Papers in Southeast Asian Linguistics No. 12: Thai sentence particles and other topics*, Pacific Linguistics A-80, ANU, viii+183 pp. Open access (CC BY-SA 4.0), ANU repository PL-A80.pdf.
- Type: descriptive semantics.
- Accessed: repository record and table of contents. The same volume reprints Cooke's articles on **si** and **na**.
- Findings, as later cited (Rutherford 2022): Thai discourse particles sit sentence-finally and modify the whole sentence, and their form varies in tone and length with meaning.
- Limitations: I did not read the chapter body, so I cite no specific meanings from it.

**Tiratanti2022**
- Tiratanti, Prapatsorn (2022). "Variation of [kháʔ] and [khàʔ] in written Thai and its relation to users' knowledge of tone marking system." *Journal of Studies in the Field of Humanities* (Kasetsart) 29(2).
- Type: questionnaire, 249 native speakers.
- Accessed: abstract.
- Findings: most writers use **ค่ะ (falling) for statements** and **คะ (high) for questions** as the grammar says. Deviations cluster **after นะ** (นะคะ vs นะค่ะ). Correct use was only weakly related to knowing the tone-mark rules.
- Voice-direction use: scripts written by staff will contain นะค่ะ, which should be นะคะ. A TTS will read the mark it is given, so fix it before synthesis.

**LINE2018 (gender and final particles)**
- (Author not captured.) "Gender differences in Thai final particles in LINE chat." *Journal of English Studies* (Thammasat) 13(1), 2018, TCI so04 jsel 159701.
- Accessed: search abstract only.
- Findings: the gendered use of final particles is shaped by social setting and platform, not by sex alone.
- Limitations: author name not captured; low weight.

**Kanchanawan2006**
- Kanchanawan, Nitaya (2006). "The use of tone markers or specific consonants signifying tones in borrowed English words." *Journal of the Royal Institute of Thailand* 31(1), Jan–Mar 2006.
- Type: policy and discussion paper from the Royal Institute.
- Accessed: abstract (orst.go.th; the Thai body text had broken encoding).
- Findings: the **current Royal Institute rule forbids tone marks (and tone-signalling consonant choices) in loanwords from non-tonal languages such as English, Pali and Sanskrit**. Tone marks are allowed for loans from tonal languages (Lao, Chinese). So the official spelling of English loans often **does not show the tone people actually say**.
- Voice-direction use: a TTS that applies the spelling rules to an official loanword spelling can produce a "correct by the book" tone nobody uses. For voice scripts, spell brand names by how they are said.

### 1.4 Loanwords

**Gandour1979**
- Gandour, Jack (1979). "Tonal rules for English loanwords in Thai." In Thongkum, Kullavanijaya, Panupong & Tingsabadh (eds.), *Studies in Tai and Mon-Khmer Phonetics and Phonology in Honour of Eugénie J.A. Henderson*, 94–105. Chulalongkorn University Press. (The ANU Open Research record lists it under Pacific Linguistics / Southeast Asian Linguistic Studies; I did not reconcile the two bibliographic records.)
- Accessed: bibliographic records plus secondary descriptions.
- Findings, as reported: rules that map English **stress and syllable structure** onto Thai tones. An obstruent after a nasal coda triggers **high** tone.

**KenstowiczSuchato2006**
- Kenstowicz, Michael & Suchato, Atiwong (2006). "Issues in loanword adaptation: a case study from Thai." *Lingua* 116(7), 921–949. Some citers give the year as 2005 (online first).
- Accessed: bibliographic references plus secondary summaries.
- Findings, as reported: English voiceless initial stops become Thai **aspirated** stops (p→พ, t→ท, k→ค). Syllables like CVN+obstruent ("camp", "tent") are treated like dead syllables and get **high tone**, while CVN ("fan", "claim") gets **mid**.

**Sirikanerat2015** (author name taken from the file name; the title is confirmed)
- "Tonal assignment on English loanwords in Thai: a case study of assignment of Mid and High tone on <CVN> syllable structure." Abstract, ICPP 2015 (NINJAL phonology project).
- Type: XAB perception experiment.
- Accessed: **full text** (2 pages).
- Findings: confirms Gandour (1979) and Kenstowicz & Suchato. CVN goes to **mid** (แฟน 'fan', เคลม 'claim'), and CVN+obstruent goes to **high** (แคมป์ 'camp', เต็นท์ 'tent'). A short rhyme alone also tends towards high.
- Voice-direction use: rules of thumb for brand names (§2.8).

### 1.5 Pronunciation authority

**ORST_Dictionary_App2015**
- Thai PBS News (22 Sep 2015). Royal Institute (สำนักงานราชบัณฑิตยสภา) and NECTEC launch the apps "พจนานุกรมฉบับราชบัณฑิตยสถาน พ.ศ. 2554" and "อ่านอย่างไรและเขียนอย่างไร ฉบับราชบัณฑิตยสถาน". thaipbs.or.th/news/content/5365
- Type: news / official tool.
- Accessed: full article.
- Findings: the RI Dictionary 2554 has 43,000+ entries **with pronunciations (คำอ่าน)**. "อ่านอย่างไร เขียนอย่างไร" covers commonly mis-read and mis-spelled words and gives the correct reading.
- Voice-direction use: the authority to check a word's standard reading before telling TTS to say it differently.

**ThaiNumberReading_Textbook** (secondary, school level)
- Trueplookpanya. "ภาษาไทย ป.3 เรื่อง ความรู้พื้นฐานเพื่อการอ่าน." trueplookpanya.com/learning/detail/31878-044467
- Type: school-curriculum summary, **not** a Royal Institute primary source.
- Accessed: search summary.
- Findings: a number of two or more digits ending in 1 is read **เอ็ด** (11 สิบเอ็ด, 21 ยี่สิบเอ็ด, 101 หนึ่งร้อยเอ็ด). Decimals: the part before the point is read as a whole number and the digits after it one by one, but money uses its units (บาท/สตางค์). Clock time reads the hour with **นาฬิกา**. Official document numbers are read digit by digit.
- Limitations: secondary; I did not find the RI's own number-reading rule page.

### 1.6 Thai TTS, g2p and text normalisation

**PhatthiyaphaibunEtAl2023**
- Phatthiyaphaibun, Wannaphong et al. (2023). "PyThaiNLP: Thai natural language processing in Python." *Proc. 3rd Workshop on NLP Open Source Software (NLP-OSS 2023)*, Singapore, 25–36. doi:10.18653/v1/2023.nlposs-1.4. arXiv:2312.04649. The ACL Anthology record lists the co-authors, among them K. Chaovavanich, A. Suriyawongkul and T. Suntorntip; I did not copy the full author list.
- Accessed: abstract.
- Findings: an open-source Thai NLP library (tokenisation, normalisation, transliteration, g2p models, `thai2fit`, etc.). The `pythainlp/thaig2p-v2.0` HF model is trained on Wiktionary-derived data.
- Voice-direction use: tools to word-segment or convert numbers to words (`num_to_thaiword`, `bahttext` are library functions; I know them from general knowledge, not from this paper) before sending text to TTS.

**VAJA_NECTEC**
- NECTEC. "Vaja 8.0: a Thai/English text-to-speech commercialized software" (2018). nectec.or.th/en/?p=17178. Also NECTEC STU team page.
- Accessed: publisher pages / search summary.
- Findings: Thai TTS developed since 1997, with corpus-based unit selection on the TSynC-1 corpus (13+ h) and a **text pre-processing / g2p tool** as a separate component. Thai TTS has always needed explicit text normalisation.

**Yamasaki2022**
- Yamasaki, Tomohiro (2022). "Grapheme-to-phoneme conversion for Thai using neural regression models." *Proc. NAACL 2022*, ACL Anthology 2022.naacl-main.315.
- Accessed: abstract.
- Findings: candidate pronunciations are generated from Thai orthography rules and a neural model ranks them, at about 0.931 accuracy. Thai g2p is ambiguous: one spelling can have several rule-based readings, so even good g2p errs on about 7% of items.

**Saychum2016**
- Saychum, S. et al. (2016). "Efficient Thai grapheme-to-phoneme conversion using CRF-based joint sequence modeling." *Interspeech 2016*.
- Accessed: title and ISCA record only.
- Findings: CRF joint-sequence g2p baseline (no detail checked).

**Geng2025**
- Geng et al. (2025). "Scaling under-resourced TTS: a data-optimized framework with advanced acoustic modeling for Thai." *Proc. ACL 2025 (Industry Track)*, 593–604. Also arXiv:2504.07858.
- Accessed: abstract and search summary.
- Findings: zero-shot Thai TTS on about 500 h of speech, with a **phoneme-tone front end** (g2p to IPA with tone markers). Modern Thai neural TTS still models tone explicitly.

**Aung2025** (ThonburianTTS)
- Aung, Sriwirote, Thavornmongkol et al. (2025). "ThonburianTTS: enhancing neural flow matching models for authentic Thai text-to-speech." iSAI-NLP 2025. doi:10.1109/iSAI-NLP66160.2025.11320472 (Mahidol repository).
- Accessed: repository abstract.
- Findings: F5-TTS / E2-TTS fine-tuned for Thai, aimed at pronunciation accuracy and alignment. The authors report it beats MMS-TTS and PyThaiTTS on intelligibility.

**JaiTTS2026**
- "JaiTTS: a Thai voice cloning model" (2026). arXiv:2604.27607.
- Accessed: search summary of the HTML.
- Findings: the paper says traditional Thai TTS pipelines depend heavily on normalising **numbers and Thai-English code-switching**. The model claims to handle them directly. Number and English-word handling is a known weak point, so it should be checked on every line.

**Lin2014**
- Lin, Yang & Zhao (2014). Rule-based Thai text normalisation (maximum matching plus context). *ISCSLP 2014*. doi:10.1109/ISCSLP.2014.6936630
- Accessed: abstract snippet.
- Findings: the two hard parts of Thai normalisation are **detecting** non-standard words (digits, abbreviations, currency symbols, Latin script) and **disambiguating** them.

---

## 2. Thai rules for a TTS director (กฎภาษาไทยสำหรับผู้กำกับเสียง AI)

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

## 3. Unverified (no reference; do not cite as fact)

| Item | Why it is unverified |
|---|---|
| Gandour et al., "Tonal coarticulation in Thai" (*J. Phonetics* 1994) | Found only library records of related titles ("Tonal coarticulation in Thai disyllabic utterances: a preliminary study"; "Anticipatory tonal coarticulation in Thai noun compounds") with no confirmed venue or year. |
| Luksaneeyanawin 1983, *Intonation in Thai* (PhD, Edinburgh) | Cited in Pittayaporn 2007 and Chula theses. I could not see the thesis or its abstract, so I cite none of its content. |
| Abramson 1962, *The vowels and tones of Standard Thai* | It exists (WALS, British Museum, ProQuest dissertation 1960), but the series details conflict (IJAL 28.2 Part III vs Indiana Univ. Research Center Pub. 20) and I saw no content. |
| Abramson 1997, "The Thai tonal space" | Only a reference-list entry (Festschrift for Vichin Panupong, 1–10); I saw no content and the editor line looks wrong. |
| Abramson 1978, "Static and dynamic acoustic cues in distinctive tones" | Listed in a Haskins status-report table of contents. The *Language and Speech* venue is unconfirmed. |
| Camp, "The perception and production of the interaction of tone and intonation in Thai" (Univ. of Hawaiʻi dissertation) | Search snippet only (the repository was blocked by Cloudflare): "tone and intonation interact … affects not just acoustic realizations but also perception". I could not get the year or the details. |
| "F0 manipulation for emotion is more restricted in tonal languages incl. Thai than English" | Seen only as a second-hand claim in a 2017 MDPI paper summary. I did not identify the original study. |
| Royal Institute's own number, time and money reading rules | I could not find the official RI page. §2.7 relies on a school-level secondary source plus craft. |
| Prasithrathsint 2019, "Syntactic distribution and communicative function of the /kh/ polite particles in Thai," *Language and Linguistics* 20(1) | Citation only; I did not see its content. |
