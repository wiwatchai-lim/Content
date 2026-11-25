# M21 Thai language specialisation (+ M20 voice) — `knowledge/thai-language/`

Files: `README.md` (this: scope, phonology for TTS, patterns) · `STYLE_GUIDE.md` (registers, particles, elderly,
ads, English for staff) · `NORMALIZATION_RULES.md` (missing TTS rules + bugs found) · `pronunciation_proposals.json`
(28 readings) · `sources.json` (41 sources). Everything is a **proposal** for `.claude/skills/ai-voice-director/`;
nothing in the skill was edited. Researched 2026-11-25.

## Scope & status

**Covered:** brand/term readings with Thai-source evidence (HOYA, Essilor, Varilux, Comfort Max, ZEISS, Progressive,
presbyopia/myopia/astigmatism/hyperopia, optometry, titanium; Rx fields SPH CYL AXIS ADD PD VA); Royal Institute (RI)
English-transcription rules; normaliser gaps (ranges, ครึ่ง, units, codes, URLs, acronyms, code-mixing, ฯลฯ, years) with
the current code actually run; register/politeness/particles with sociolinguistic sources; Thai phonology facts for TTS
from primary phonetics (Tingsabadh & Abramson 1993; Abramson 1979; Potisuk et al. 1996).

**NOT covered / weak:** no Thai-script spelling found from the brands for Crizal, Transitions, PhotoFusion, SmartLife,
Physio Extensee (Essilor/ZEISS Thai pages render by JavaScript and returned only titles); Cambridge and Oxford
dictionaries blocked automated access (HTTP 403) so English IPA comes from Wiktionary (Tier E); no สภาการทัศนมาตรศาสตร์
document or RI medical-term list was reachable (orst.go.th refused connection); Luksaneeyanawin's intonation work was
not read (only cited); Prasithrathsint 2001 on ครับ/ค่ะ is an image scan (not read). Regional Thai (อีสาน, ใต้) not covered.

## Core concepts

### 1. Brand readings come from the brand, not from RI rules
- **What:** a brand's Thai name is whatever the brand writes in Thai (press releases, company registration).
- **Mechanism:** viewers have heard the brand's own ads; a different reading sounds like a different (fake) brand.
- **Creative use:** lock one reading per brand in the dictionary; subtitles show the brand's spelling.
- **Found:** HOYA → **โฮยา** (company ไทยโฮยา เลนซ์) [Marketeer_HOYA2025]; Essilor → **เอสซีลอร์** [ThaiPR_Essilor2020;
  Naewna_Essilor2019]; Varilux → **วารีลักซ์/วารีลักส์** (long รี) [same]; Comfort Max → **คอมฟอร์ต แม็กซ์** [ThaiPR_Essilor2020];
  ZEISS writes **ไซส์ส** / คาร์ล ไซส์ส [Brandbuffet_ZEISS2021; ZEISS_TH_GTC]; progressive → **โปรเกรสซีฟ** (both brands).
- **Current dictionary readings that disagree with the brand:** โฮย่า (brand: โฮยา), เอสซิลอร์ (brand: เอสซีลอร์),
  วาริลักซ์ (brand: วารีลักซ์). ไซส์ is kept as the *spoken* respelling because ไซส์ส may make a TTS add a final -t.
- **Limits:** RI-style brand spellings omit tone marks, so a brand spelling proves the segments, not always the spoken
  tone (โฮยา may still be *said* โฮ-ย่า). Listen once.
- **Tier/conf:** C (brand press releases) · high for Essilor/Varilux/Comfort Max, medium for HOYA/ZEISS.

### 2. RI transcription ≠ TTS respelling
- **What:** RI rules write loanwords without tone marks (except clashes like โค้ก, โคม่า), use ์ on silent letters, ไม้ไต่คู้
  to separate from Thai words (ล็อก), and write compounds joined [RI_Transcription_DLTV].
- **Mechanism:** the written standard deliberately ignores tone because English stress-pitch varies with the sentence.
  A TTS reads by Thai spelling rules, so RI spellings often produce the wrong tone or vowel length.
- **Creative use:** two layers — subtitles: brand/RI spelling; `spoken_text`: respelling *as said* (tone marks allowed:
  มัลติโค้ต, โฟโต้ฟิวชั่น). Example: ออปติก by rule = long low /ʔɔ̀ːp/; Thai speakers say a short syllable → test อ็อปติก.
- **Tier/conf:** S (standard, via a school reproduction) · high for the rules, low for each respelling until heard.

### 3. Optical Rx speech in the shop
- **What:** customers hear powers in "hundreds": −2.00 D → **สั้นสองร้อย**; technical text → สองจุดศูนย์ไดออปเตอร์ [ODOptical_Rx].
  Thai glosses: SPH ค่าสายตาสั้น/ยาว (กำลังทรงกลม), CYL ค่าสายตาเอียง (กำลังทรงกระบอก), AXIS องศา(แกน)เอียง, ADD ค่าแอด,
  PD ระยะห่างรูม่านตา [ODOptical_Rx; Putuchon_Rx].
- **Normaliser findings:** `CYL → ไซลินเดอร์` has the wrong vowel (English /ˈsɪlɪndə/ → ซิ-); `SPH → สเฟียร์` has no Thai
  source; `6/6` is read as a date; `ADD-ON` → `แอด-ON` (NORMALIZATION_RULES §A).
- **Tier/conf:** D (two practitioner pages) · medium. Confirm with Time Optic's own optometrist.

### 4. Thai phonology facts that matter for TTS
(Adds to THAI_PRONUNCIATION §2.1–2.5; does not repeat the tone-rule table, which is also in [Wikipedia_ThaiScript].)
- **Five tones; length contrast in all nine vowels**; only /p t k ʔ m n ŋ w j/ end syllables; final /p t ʔ/ unreleased
  [TingsabadhAbramson1993]. High/mid/low are "static" tones (slow movement; high appears as a rise high in the range),
  falling/rising are "dynamic" (fast F0 movement) [Abramson1979ICPhS].
- **Stress is word-final**: primary stress on the last syllable; the last stressed syllable before a major break gets
  extra stress [TingsabadhAbramson1993]. Content words are strong, function words/clitics weak; compounds weak-strong;
  **rhyme duration** is the best stress cue [PotisukHarperGandour1996]. → emphasis = lengthen the last syllable of the key
  word + clear tone shape + loudness, not higher pitch [Abramson1979ICPhS: sentence accent = lengthening + ideal tone
  contour + amplitude].
- **Unstressed syllables lose tone**: short-/a/ syllables (กระ- ประ- สะ-) that have low/high tone in citation become
  mid or toneless, without glottal stop, in running speech [TingsabadhAbramson1993; Abramson1979ICPhS].
- **Tone vs intonation**: intonation sits on top of tones. Abramson describes three terminal junctures — rising
  (surprise, doubt, question), sustained (syntactic break, prolonged final syllable), falling (sentence end); the final
  particle is the main carrier, and its own "lexical" tone is often overridden [Abramson1979ICPhS]. Sentence-final tones
  are lower in F0 than initial/medial ones [Gandour1997BrainLang]; neighbouring tones coarticulate (a falling tone before
  another tone falls less far) [Abramson1979ICPhS; Gandour1993Coartic]. Luksaneeyanawin's Fall / Rise / Convoluted
  classes [Luksaneeyanawin1998; Charnvivit2003 — not read]. The high tone's rise is optional in citation and absent in
  connected speech [ZsigaNitisaroj2007, snippet].
- **r/l and clusters**: /r/ vs /l/ is not robust; many speakers use [l]; second elements of clusters tend to drop
  [TingsabadhAbramson1993] — normal for casual characters, not for brand VO (where ครับ, เกรส, ทราน need the cluster).
- **อักษรนำ** beyond ห/อ: a high- or mid-class letter before a low sonorant in an unwritten-vowel cluster can lend its
  class to the second syllable (ขนม /kʰa.nǒm/, สนุก /sa.nùk/) — a classic TTS error point [DERIVED from the class rules in
  Wikipedia_ThaiScript; check in the RI dictionary].
- **Tier/conf:** A (primary phonetics) · high for inventory/stress; medium for intonation (small corpora).

### 5. Register is built by particles, pronouns and address terms
- Register = frequency and combination of particles, pronouns, names, kin terms, titles; strangers settle on a middle
  register [IwasakiHorie2000]. นะ softens, emphasises and marks topic [Maklai2017]; particle use differs by gender in
  chat but is socially constructed [Jitpaisarnwattana2018]. Details in STYLE_GUIDE.md. · A · medium-high.

### 6. Code-mixing is the default in Thai commercial copy
- Intrasentential mixing is the most frequent type [Kunarawong2014 snippet]; English in Thai ads signals image more than
  meaning [Trakulkasemsuk2018]; it is the known hard case for Thai TTS (end-to-end models now cope better, JaiTTS2026;
  normalisation problems = detecting and disambiguating non-standard words, Lin2014). · A/B · medium.

## Contested / replication notes
- **Particle tones**: some describe each particle with a fixed lexical tone; Abramson (1979) doubts these have "any
  standing" in running speech. Keep the ค่ะ/คะ spelling contrast (normative, and audible in careful speech), but allow
  the TTS's sentence melody on the particle. Confidence medium.
- **Unstressed short-a syllables**: "toneless" vs "neutralised to mid" — two analyses of the same phenomenon
  [Abramson1979ICPhS; TingsabadhAbramson1993]; for TTS both mean "do not force the citation tone".
- **Elderspeak**: whether simplified speech helps comprehension is mixed; exaggerated prosody hurting comprehension and
  being felt as patronising is more consistent [Elderspeak2021 — search summary, Western data].
- **SPH/CYL spoken names**: no source shows staff saying สเฟียร์/ไซลินเดอร์; one shop page documents สั้นสองร้อย. Low evidence
  either way.

## Applied patterns for our production
- **Mint & Tao (Slowly Growing)**: สนทนา register, particles chosen by personality (CHARACTER_VOICE_BIBLE), นะ after the
  topic for natural pauses ("แว่นใหม่นะ ... ใส่แล้วเห็นใบไม้ชัดเลย"), no English terms — say สายตาสั้น not myopia.
- **Promo VO (Hua Hin)**: กึ่งทางการ; brand names exactly as in pronunciation_proposals.json; one mood line + one
  credibility line ("ตรวจวัดโดยนักทัศนมาตร", "เลนส์วารีลักซ์จากเอสซีลอร์") + one invitation CTA ("แวะมาลองได้นะคะ") [Khotchaphet2026;
  Leelaharattanarak2016].
- **Presbyopia clips** (สายตายาวตามอายุ series): use the brand-shared term สายตายาวตามอายุ; explain progressive in plain
  Thai first; slow −10 % but no sing-song (STYLE_GUIDE §5).
- **Rx explainers**: customer style "สั้นสองร้อย เอียงเจ็ดสิบห้า"; on-screen text keeps −2.00 / −0.75.

## Anti-patterns
- Feeding RI or brand spellings with silent-letter tricks (ไซส์ส) straight to the TTS without listening.
- Transliterating medical English (มายโอเปีย, แอสติกมาทิซึม) in consumer VO when a common Thai term exists.
- Raising pitch on a content word for emphasis (changes tones) — lengthen instead.
- Gender-stereotyped particle density; จ้ะ/จ้า from staff to elderly customers; baby-talk prosody for older people.
- Reading URLs and handles letter by letter in VO; say "ค้นหา ไทม์ ออปติก".
- Two readings of one brand in one clip (โฮยา / โฮย่า; ออปติก / ออพติก).

## Open questions / next research
1. Ask Essilor/HOYA/ZEISS reps (or LINE OA) for official Thai readings of Crizal, Transitions, PhotoFusion, SmartLife,
   Physio Extensee; check Thai YouTube ad audio (not possible with text tools).
2. Get สภาการทัศนมาตรศาสตร์ / faculty material on how Rx values are spoken; confirm the "hundreds" convention for CYL/ADD.
3. Check RI dictionary readings: ทัศนมาตรศาสตร์, จักษุวิทยา, แอซีเทต vs อะซิเตท, ไทเทเนียม (RI science terms).
4. Read Luksaneeyanawin 1998, Prasithrathsint 2001 (needs OCR), Cooke 1989 (PL A-80 open PDF).
5. Thai elderspeak / address-term research in Thai healthcare or retail (none found this session).
6. Implement NORMALIZATION_RULES §A–K behind tests, then listen.
