# Thai text normalisation rules still missing (M21 → proposals for `tools/thai_normalize.py`)

Proposals only. Nothing here was applied to `.claude/skills/ai-voice-director/`. Each rule has: example input → spoken
output, status in the current code (tested 2026-11-25 by running `thai_normalize.py`), and its source key
(`sources.json`) or **DERIVED** (my own reasoning from Thai usage, to be checked by ear and by a Thai editor).

Style column: F = formal/narration, C = casual (`--style casual`), S = proposed new `--style shop` (how optical
staff talk to customers), * = all styles.

## A. Bugs found in the current normaliser

| # | Input | Current output | Proposed output | Style | Source |
|---|---|---|---|---|---|
| A1 | `VA 6/6` | `วีเอ วันที่ หก มิถุนายน` | `วีเอ หก ส่วน หก` | * | Lin2014 (ambiguity of non-standard words); DERIVED reading |
| A2 | `20/20` | `ยี่สิบ/ยี่สิบ` (slash left) | `ยี่สิบ ส่วน ยี่สิบ` | * | DERIVED |
| A3 | `ADD-ON` | `แอด-ON` | leave `ADD-ON` (or `แอดออน`) — match ADD only when followed by space+sign/number | * | DERIVED |
| A4 | `CYL -0.75` | `ไซลินเดอร์ ลบ ศูนย์จุดเจ็ดห้า` | F: `ค่าเอียง ลบศูนย์จุดเจ็ดห้า`; S: `เอียงเจ็ดสิบห้า` | F/S | ODOptical_Rx; English /ˈsɪlɪndə/ → ซิ- not ไซ- (RI_Transcription_DLTV) |
| A5 | `SPH -2.00` | `สเฟียร์ ลบ สองจุดศูนย์ศูนย์` | F: `ค่าสายตา ลบสองจุดศูนย์ศูนย์`; S: `สั้นสองร้อย` | F/S | ODOptical_Rx ("มักเรียกให้ติดปากว่า สั้นสองร้อย") |
| A6 | `ADD +2.00` | `แอด บวก สองจุดศูนย์ศูนย์` | S: `แอดสองร้อย` | S | ODOptical_Rx (pattern), DERIVED for ADD |
| A7 | `PD 31/32` | `พีดี สามสิบเอ็ด/สามสิบสอง` | `พีดี สามสิบเอ็ด สามสิบสอง` (monocular PD pair, slash = pause) | * | DERIVED |
| A8 | `Hoya` / `Essilor` / `Varilux` dictionary | `โฮย่า` / `เอสซิลอร์` / `วาริลักซ์` | `โฮยา` / `เอสซีลอร์` / `วารีลักซ์` (brand spellings) | * | Marketeer_HOYA2025; ThaiPR_Essilor2020; Naewna_Essilor2019 |
| A9 | Project uses both `ไทม์ ออปติก` and `ไทม์ ออพติก` | inconsistent | one form everywhere (ออปติก = RI form) | * | RI_Transcription_DLTV |

Note on A5/A6: shop "hundreds" = power × 100 (−2.00 → สองร้อย, −0.75 → เจ็ดสิบห้า, −1.25 → ร้อยยี่สิบห้า). The sign
becomes a word: minus SPH → สั้น, plus SPH → ยาว, CYL → เอียง. Only OD Optical documents the pattern (Tier D) —
have a Time Optic optometrist confirm before making it default.

## B. Ranges, fractions, multipliers

| # | Input | Spoken | Style | Source |
|---|---|---|---|---|
| B1 | `10-20%` | `สิบถึงยี่สิบเปอร์เซ็นต์` (current: `สิบ-ยี่สิบเปอร์เซ็นต์`) | * | DERIVED |
| B2 | `2,500-3,900 บาท` | `สองพันห้าร้อยถึงสามพันเก้าร้อยบาท` | * | DERIVED |
| B3 | `10:00-20:00 น.` | F `สิบนาฬิกาถึงยี่สิบนาฬิกา`; C `สิบโมงเช้าถึงสองทุ่ม` | F/C | DERIVED (casual clock already in code) |
| B4 | `5-7 วัน` | `ห้าถึงเจ็ดวัน` | * | DERIVED |
| B5 | `x2` / `2x` / `×2` | `สองเท่า` (multiplier), but `2 x 3` → `สองคูณสาม` | * | DERIVED |
| B6 | `1/2` (not a date, not a fraction of time) | `ครึ่ง` or `หนึ่งส่วนสอง` | * | DERIVED |

Guard: a hyphen between numbers is a range only when both sides are plain numbers, never in phone numbers
(already handled earlier), model codes (`CR-39`) or lens powers (`-1.00`).

## C. ครึ่ง (half) — natural speech

| # | Input | Spoken | Style | Source |
|---|---|---|---|---|
| C1 | `1.5 ชม.` | C `ชั่วโมงครึ่ง` / F `หนึ่งชั่วโมงครึ่ง` (current: `หนึ่งจุดห้า ชั่วโมง`) | C/F | Elon_ThaiMeasures (pattern N + unit + ครึ่ง); DERIVED for ชั่วโมง |
| C2 | `2.5 ลิตร` | `สองลิตรครึ่ง` | * | Elon_ThaiMeasures |
| C3 | `0.5 ปี` | `ครึ่งปี` (ครึ่ง BEFORE the unit when there is no whole number) | * | Elon_ThaiMeasures |
| C4 | `14:30` casual | `บ่ายสองโมงครึ่ง` (already in code) | C | — |
| C5 | `1.5 เท่า` | `หนึ่งเท่าครึ่ง` / `เท่าครึ่ง` | C | DERIVED |

Rule: N.5 + time/measure unit (ชม. ชั่วโมง ปี เดือน วัน นาที ลิตร กิโล เมตร เท่า) → N + unit + ครึ่ง; 0.5 + unit →
ครึ่ง + unit. Never for prices (2.50 บาท = สองบาทห้าสิบสตางค์) or lens powers / indexes (1.50 → หนึ่งจุดห้าศูนย์).

## D. Units and symbols

| # | Input | Spoken | Source |
|---|---|---|---|
| D1 | `30°C` / `30 °C` | `สามสิบองศาเซลเซียส` (current: `สามสิบ°C`) | DERIVED |
| D2 | `12 g` / `12g` | `สิบสองกรัม` (current leaves `g`) | DERIVED |
| D3 | `52□18` (frame size box) | `ห้าสิบสอง สิบแปด` or `เลนส์กว้างห้าสิบสอง สะพานจมูกสิบแปด` | DERIVED (frame marking convention) |
| D4 | `140mm` | `หนึ่งร้อยสี่สิบมิลลิเมตร` (works now) | — |
| D5 | `1.67` after `index`/`ดัชนี` | `ดัชนีหนึ่งจุดหกเจ็ด` (works now; translate `index` → `ดัชนี` or `อินเด็กซ์`) | DERIVED |
| D6 | `UV400` / `UV 400` | `ยูวีสี่ร้อย` (works) | — |
| D7 | `cm`, `ซม.` | `เซนติเมตร` (add `cm` to dictionary) | DERIVED |
| D8 | `D` after a power (`-2.00 D`) | `ไดออปเตอร์` | ODOptical_Rx |
| D9 | `+` alone between words | `บวก` / `และ` by context; `1+1` → `หนึ่งแถมหนึ่ง` in promos (C) | DERIVED |

## E. Model numbers and codes

| # | Input | Spoken | Source |
|---|---|---|---|
| E1 | `RB3025` | `อาร์บี สามศูนย์สองห้า` (letters by name, digits one by one) — current leaves it to the TTS | DERIVED |
| E2 | `CR-39` | `ซีอาร์ สามสิบเก้า` (industry says the number as a whole) — current `CR-สามสิบเก้า` | DERIVED |
| E3 | `รุ่น 2026` | ambiguous: year → `สองพันยี่สิบหก`; model → `สองศูนย์สองหก`. Rule: after `รุ่น`/`model`/`code`, 4+ digits → digit by digit unless 19xx/20xx/25xx | DERIVED |
| E4 | Letter names for TTS | A เอ, B บี, C ซี, D ดี, E อี, F เอฟ, G จี, H เอช, I ไอ, J เจ, K เค, L แอล, M เอ็ม, N เอ็น, O โอ, P พี, Q คิว, R อาร์, S เอส, T ที, U ยู, V วี, W ดับเบิลยู, X เอ็กซ์, Y วาย, Z แซด | DERIVED (common Thai letter names; verify W/Z) |

## F. URLs, handles, hashtags, emails

| # | Input | Spoken | Source |
|---|---|---|---|
| F1 | `www.timeoptic.com` | `ดับเบิลยู ดับเบิลยู ดับเบิลยู ดอต ไทม์ออปติก ดอต คอม` — better: do not read URLs in VO; say `ค้นหา ไทม์ ออปติก` | DERIVED |
| F2 | `@timeoptic` | `แอดไทม์ออปติก` (in dictionary) | — |
| F3 | `#แว่นหัวหิน` | drop `#` in VO, read `แว่นหัวหิน`; or `แฮชแท็ก แว่นหัวหิน` when the tag itself is the CTA | DERIVED |
| F4 | `info@x.com` | `อินโฟ แอท เอ็กซ์ ดอต คอม` | DERIVED |
| F5 | `LINE OA`, `IG`, `FB`, `DM` | `ไลน์โอเอ`, `ไอจี`, `เฟซบุ๊ก` (FB is usually said as the full name), `ดีเอ็ม` / `ทักแชต` | DERIVED |

## G. English acronyms: letter-by-letter vs word

| Read as letters | Read as a word | Rule |
|---|---|---|
| UV ยูวี, PD พีดี, VA วีเอ, AI เอไอ, DM ดีเอ็ม, IG ไอจี, OK โอเค | LINE ไลน์, ZEISS ไซส์, HOYA โฮยา, SALE เซล, ADD แอด, AXIS แอกซิส | DERIVED: read as a word when it is pronounceable AND Thai speakers already say it as a word; otherwise letters. Unknown all-caps tokens of 2–3 letters → letters by default (E4 table). |

The dictionary is the right place for exceptions; the default for unknown 2–4 letter capitals should be letters (avoids
TTS guessing "VA" as /va/). Source: DERIVED; code-mixing frequency in Thai copy: Kunarawong2014, Trakulkasemsuk2018.

## H. Thai–English code-mixing

| # | Rule | Source |
|---|---|---|
| H1 | Decide per word: **translate** (Myopia → สายตาสั้น), **Thai respelling** (Progressive → โปรเกรสซีฟ) or **keep Latin** (product sub-names). Never mix two treatments of one word in one clip. | Trakulkasemsuk2018 (English as image signal); JaiTTS2026 (code-switching handled but risky) |
| H2 | Single English words inside Thai sentences (the most frequent mixing type) → respell in Thai for TTS; keep Latin in subtitles. | Kunarawong2014; Lin2014 |
| H3 | English plural -s: drop in speech (`Transitions` → ทรานซิชั่น, `lenses` → เลนส์). | DERIVED (Thai has no final clusters: Pathanasin_FinalC) |
| H4 | Respelling may carry tone marks the RI form omits (โค้ต, โฟโต้), because RI spelling deliberately does not show tones. | RI_Transcription_DLTV |
| H5 | A full English sentence in a Thai clip → separate TTS call in an English voice/lang setting, not inline. | DERIVED; JaiTTS2026 notes code-switching as a known hard case |

## I. ไม้ยมก, ฯ, ฯลฯ

| # | Input | Spoken | Status / Source |
|---|---|---|---|
| I1 | `เด็กๆ` | `เด็กเด็ก` only if the TTS skips ๆ (listen); keep ๆ otherwise | kept now; craft |
| I2 | `ก ฯลฯ ฮ` (ฯลฯ followed by more of the list) | `กอ ละถึง ฮอ` | MISSING — current gives `และอื่นๆ` everywhere. ORST_Punctuation; Wiktionary_TH_ฯลฯ |
| I3 | `... ผัก ผลไม้ ฯลฯ` (end of list) | `และอื่น ๆ` (or `ละ`) | works. ORST_Punctuation |
| I4 | `กรุงเทพฯ` | `กรุงเทพ` or `กรุงเทพมหานคร` | works |
| I5 | Words with ฯ like `ทูลเกล้าฯ`, `โปรดเกล้าฯ` | full form must be written by hand (`ทูลเกล้าทูลกระหม่อม`, `โปรดเกล้าโปรดกระหม่อม`); dropping ฯ (current behaviour) changes the meaning | DERIVED; add to dictionary |

## J. Years and eras

| # | Input | Spoken | Style | Source |
|---|---|---|---|---|
| J1 | `พ.ศ. 2569` | F `พุทธศักราชสองพันห้าร้อยหกสิบเก้า`; C `ปีสองห้าหกเก้า` | F/C | works for F; C missing (THAI_PRONUNCIATION §1 limit). DERIVED for C |
| J2 | `ปี 69` | C `ปีหกเก้า` (current `ปี หกสิบเก้า`) | C | DERIVED |
| J3 | `ค.ศ. 2026` | F `คริสต์ศักราชสองพันยี่สิบหก`; C `ปีสองพันยี่สิบหก` | F/C | works for F |
| J4 | Bare `2026` / `2569` | cardinal (works); the TTS will not add พ.ศ./ค.ศ. — say the era once in the script if both calendars appear | — | DERIVED |
| J5 | `24/11/69` | dates: ambiguous short year → write years in full (already noted in code) | — | — |

## K. Order of operations (proposal)

dictionary → phones → **optical (new shop style, before dates so 6/6 and 20/20 are protected)** → dates → times →
**ranges** → **halves (ครึ่ง)** → money/percent/decimals → **units/symbols** → **codes/acronyms** → symbols (ฯลฯ with
position). Each new rule needs a test line in `TEST_CASES.json` / `run_tests.py` before it is enabled.
