# 07 — Worldbuilding and Narrative Continuity (การสร้างโลกและความต่อเนื่องของเรื่องเล่า)

**Modules:** M16 (World Building) · M38 (Continuity Management) — domain v2, 2026-11-26

**Scope — ครอบคลุม:**
- ประวัติแนวคิด storyworld: Tolkien (sub-creation) → Wolf (infrastructures, canon) → Jenkins (transmedia, continuity vs multiplicity) → Mittell (complex TV) → soap opera (Allen) → reboot/retcon (Proctor, DC Crisis) → canon governance ของ Lucasfilm Story Group
- จิตวิทยาของ continuity รอบสอง: event segmentation (EST), event-indexing model, event horizon, การอ่าน picture story (SPECT, bridging inference), การตรวจจับ jump/180° ของคนดูจริง, ความไม่ universal ของการอ่านภาพต่อเนื่อง (Cohn)
- การออกแบบซีรีส์สั้น: cliffhanger (หลักฐานขัดกัน), parasocial relationship กับตัวละครประจำ, running gag/callback, redundancy แบบ soap
- เครื่องมือ/โครงข้อมูล: canon tiers, registry (map–timeline–genealogy), undetermined facts, decision log ของ discrepancy, AI story consistency benchmark (ViStoryBench, StoryDiffusion)
- กฎของโลกแบบ craft (Sanderson ข้อ 2–3) และฐานวัฒนธรรมไทย (ความเชื่อเรื่องผี — Anuman Rajadhon 1954; ตึกแถวริมคลอง)

**ไม่ครอบคลุม (ดูไฟล์เดิมหรือยังไม่มีหลักฐาน):** ทฤษฎีโลกพื้นฐานที่อยู่ใน M16 แล้ว (Wolf invention/completeness/consistency, minimal departure, environmental storytelling, iceberg, transmedia 101), change blindness/edit blindness/AToCC/script supervision/schema `continuity.json` ที่อยู่ใน M38 แล้ว, conlang, game systemic worlds, กฎหมายลิขสิทธิ์ตัวละคร, webcomic canon management (ไม่พบแหล่งที่เอกสารชัด), Pixar process (HBR paywall — อ่านไม่ได้), หลักฐานเชิงปริมาณว่า continuity error ลด engagement บน TikTok/IG (ไม่พบ)

`Status: SOURCE VERIFIED` — อ่านจริง (full_text + abstract) 35/41 = 85%

**Sources: 41** — tier S 1 · A 28 · B 4 · C 5 · D 3 | access: full_text 20 · abstract 15 · search_summary 4 · bibliographic 1 · publisher_page 1
(ใหม่ 33 รายการ + reuse 8 คีย์จาก M16/M38: Macdonald2018, Chee2012, Sanderson2007, ZwaanRadvansky1998, SmithHenderson2008, MaglianoZacks2011 [อัปเกรดเป็น abstract], Mittell2015, Tewel2024)

**Builds on (อ่านก่อน ไม่ทำซ้ำ):**
- `creative-intelligence/knowledge/world-building/README.md` (M16 core concepts 1–9)
- `creative-intelligence/knowledge/world-building/STORY_BIBLE_TEMPLATE.md` (ชั้น DNA / case law / ตอน)
- `creative-intelligence/knowledge/continuity/README.md` (M38 core concepts 1–7)
- `creative-intelligence/knowledge/continuity/CONTINUITY_SYSTEM.md` + `continuity.schema.json`
- `story-clips/night-optic/SERIES.md`, `slowly-growing/README.md`, `carousel/kits/*/kit.md` (ข้อสังเกตจริงใน §6)

> วิธีอ่าน: **FACT** = ผลซ้ำได้/หลักฐานแข็ง · **THEORY** = โมเดล อาจถูกโต้แย้ง · **PRACTICE** = ธรรมเนียมวงการ · **OPINION** = ความเห็น.
> ทุก claim มี `[Key]` ที่อยู่ใน sources JSON หรือป้าย **(craft)** / **(opinion)** / **(our test)**

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 ไทม์ไลน์ย่อ
| ปี | เหตุการณ์/งาน | ความคิดที่เปลี่ยน |
|---|---|---|
| 1939 / 1947 | Tolkien บรรยาย "On Fairy-Stories" (Andrew Lang Lecture, St Andrews, มี.ค. 1939) ขยายพิมพ์ 1947 [Flieger_TolkienEstate] | ผู้เขียนเป็น **sub-creator** ที่สร้าง **Secondary World** ด้วยถ้อยคำ — โลกเป็นงานศิลป์ในตัว ไม่ใช่แค่ฉากหลังของ plot |
| 1930s–1980s | Soap opera วิทยุ→ทีวี (Irna Phillips ฯลฯ); Allen 1985 วิเคราะห์ว่า soap "ตั้งอยู่บนความเป็นไปไม่ได้ของการปิดเรื่อง" [Allen1985] | ความต่อเนื่องไม่ได้อยู่ที่ plot เดียว แต่อยู่ที่ **เครือข่ายความสัมพันธ์ + ประวัติ** ของชุมชนตัวละคร 40+ คน |
| 1986 | DC *Crisis on Infinite Earths* ทำลาย multiverse เพื่อหนี continuity ที่ "ซับซ้อน สับสน ขัดกันเอง"; *Infinite Crisis* (2006) ย้อนบางส่วน [Proctor2012] | continuity สะสมจนเป็นภาระ → เกิด **reboot ระดับจักรวาล** และ retcon เป็นเครื่องมือจงใจ [Friedenthal_RetconGame] |
| 2000 | Lucasfilm ย้าย "bible" ในแฟ้มไปเป็นฐานข้อมูล Holocron (อยู่ใน M16 แล้ว) [Chee2012] | continuity กลายเป็น **ฐานข้อมูล** มีผู้ดูแลเต็มเวลา |
| 2005–2012 | กระแส franchise reboot (Batman Begins, Casino Royale, Star Trek) [Proctor2012] | reboot = แนวคิดระดับ franchise: ตัดประวัติเดิม เริ่ม "year one" |
| 2006 / 2015 | Mittell "Narrative Complexity" (Velvet Light Trap 58) [Mittell2006] → *Complex TV* (2015) [Mittell2015] | ทีวีผสม episodic + serial; คนดูต้องจำข้ามตอน → paratext (recap, wiki) และการเล่นกับความจำที่จางของคนดู |
| 2006–2011 | Jenkins: transmedia 101 (2007, อยู่ใน M16) → "Transmedia 202" (2011) [Jenkins2011] | เพิ่มขั้วตรงข้าม **continuity vs multiplicity** — บางแฟรนไชส์ฉลองการเล่าตัวละครเดิมหลายเวอร์ชัน |
| 2012–2013 | Wolf *Building Imaginary Worlds* (2012) + สัมภาษณ์กับ Jenkins (2013) [Wolf2013Interview] | โลกมี **infrastructures**: map / timeline / genealogy; "ระดับของ canon"; แฟนคอย police continuity |
| 2007–2013 | Sanderson's Laws 1–3 (craft) [Sanderson2007][Sanderson2011][SandersonThirdLaw] | กฎโลกต้องเข้าใจได้ก่อนใช้แก้ปม, ข้อจำกัด > พลัง, ขยายของเดิมก่อนเพิ่มใหม่ |
| 25 เม.ย. 2014 | Lucasfilm ประกาศ canon ใหม่: 6 ภาพยนตร์ + *The Clone Wars* เป็นแกน; EU เดิมเป็น "Legends"; ตั้ง story group [StarWars2014Legends] | **canon governance**: คณะทำงานกำหนด canon ข้ามสื่อ, ของเก่าไม่ทิ้งแต่ลดชั้น |
| 2024–2025 | StoryDiffusion [Zhou2024StoryDiffusion], ConsiStory [Tewel2024], ViStoryBench [Zhuang2025ViStoryBench] | continuity เชิงภาพกลายเป็นปัญหา ML ที่วัดได้ — และพบ trade-off consistency vs prompt adherence |

### 1.2 สายวิทยาศาสตร์ (เดินคู่ขนาน)
- 1995: **event-indexing model** — เหตุการณ์คือจุดศูนย์กลางของ situation model เชื่อมกันใน 5 มิติ: time, space, protagonist, causality, intentionality [ZwaanLangstonGraesser1995]; ขยายเป็น review 1998 (อยู่ใน M38) [ZwaanRadvansky1998]
- 2007: **Event Segmentation Theory (EST)** — สมองทำนายสิ่งที่จะเกิดต่อไปตลอดเวลา เมื่อ prediction error พุ่งชั่วขณะ = รับรู้ "รอยต่อเหตุการณ์" [ZacksEtAl2007][KurbyZacks2008]
- 2009: การเปลี่ยนตัวละคร/สถานที่/การจับวัตถุ/เป้าหมาย ทำนายจุดที่คนอ่าน-คนดูหนังตัดเหตุการณ์ และทำให้อ่านช้าลง [ZacksSpeerReynolds2009]; วัตถุที่อยู่ ณ รอยต่อถูกจำได้ดีกว่า [SwallowZacksAbrams2009]
- 2011: continuity editing — ความไม่ต่อเนื่องของ **action** มีผลต่อการตัดเหตุการณ์มากที่สุด, space/time มีผลน้อย [MaglianoZacks2011]
- 2016–2020: picture story/comics — bridging inference (ภาพที่หายไป) [Magliano2016][Hutson2018], SPECT [Loschky2019SPECT], และ "การอ่านภาพต่อเนื่องไม่ universal" [Cohn2020Universal]
- 2017: **Event Horizon Model** — event model ปัจจุบันเข้าถึงง่าย, model เก่าเข้าถึงยากลง [RadvanskyZacks2017]
- 2019–2023: ทดสอบกฎ craft กับคนดูจริง — 180° [Kachkovski2019], jump ในหนัง [Upadhyayula2023], cliffhanger [Wirz2022][Schibler2023]

**สิ่งที่เปลี่ยนไป:** จาก "continuity = ห้ามมีรอยผิด" (มุมมองช่าง) → "continuity = การจัดการ **โมเดลในหัวคนดู**" (มุมมองวิทยาศาสตร์การรับรู้) → "continuity = **governance ของข้อมูล** ข้ามทีม/สื่อ/AI" (มุมมองอุตสาหกรรม 2014+)

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 นิยามที่ใช้ในเอกสารนี้
| คำ | นิยาม | แหล่ง |
|---|---|---|
| **Storyworld / Secondary World** | โลกที่เรื่องเกิด มีกฎและข้อเท็จจริงของตัวเอง | [Flieger_TolkienEstate], M16 |
| **Canon** | ชุดข้อเท็จจริงที่ผู้ถือสิทธิ์ประกาศว่า "จริงในโลกนี้" | [StarWars2014Legends][Wolf2013Interview] |
| **Canon tier** | ระดับความเป็น canon (canon / Legends / approved-but-not-canon) | [StarWars2014Legends][Lussier2015] |
| **Undetermined fact** | ข้อเท็จจริงที่ตั้งใจยังไม่ตัดสิน (Boba Fett "ทั้งตายและไม่ตาย จนกว่าจะมีเรื่องดึงขึ้นมา") | [Lussier2015] |
| **Retcon** (retroactive continuity) | การแก้/เติม/ขัดข้อเท็จจริงที่เคยเล่าไปแล้วในงานชิ้นหลัง โดยจงใจ | [Friedenthal_RetconGame], [Proctor2012] |
| **Reboot** | เริ่มแฟรนไชส์ใหม่จาก "year one" ตัดความต่อเนื่องเดิม — เป็นแนวคิดระดับ franchise | [Proctor2012] |
| **Multiplicity** | ตัวละครเดียวกัน เล่าหลายเวอร์ชันโดยไม่ต้องสอดคล้องกัน | [Jenkins2011] |
| **Infrastructure** | โครงจัดข้อมูลโลก: map (ที่), timeline (เวลา), genealogy (ตัวละคร/สายสัมพันธ์) + nature, culture, language, mythology, philosophy | [Wolf2013Interview] |
| **Event model / situation model** | ภาพในหัวคนดูว่า "ตอนนี้เกิดอะไร ที่ไหน ใคร ทำไม" | [ZwaanLangstonGraesser1995][Loschky2019SPECT] |
| **Event boundary** | จุดที่คนดูรู้สึกว่าเหตุการณ์หนึ่งจบ อีกเหตุการณ์เริ่ม | [ZacksEtAl2007] |
| **Bridging inference** | การเติมเหตุการณ์ที่ไม่ได้แสดงระหว่างสองภาพ | [Magliano2016] |
| **Paradigmatic complexity** | ความหมายที่มาจากเครือข่ายความสัมพันธ์+ประวัติ ไม่ใช่จาก plot ที่เดินหน้า | [Allen1985] |
| **Mini-closure** | ปมย่อยที่ปิดได้ โดยเรื่องใหญ่ไม่จบ | [Allen1985] |
| **Callback** | สิ่งที่คุ้นกลับมาในบริบทใหม่จนความหมายเปลี่ยน | [Winet2025] |
| **PSR / PSI** | parasocial relationship (ความผูกพันระยะยาวกับตัวละคร) / parasocial interaction (ความรู้สึกโต้ตอบระหว่างดู) | [Tukachinsky2020][HartmannGoldhoorn2011] |

### 2.2 หลักการแกน 8 ข้อ
1. **คนดูไม่ได้เก็บ "ทุกพิกเซล" แต่เก็บ event model 5 มิติ** — เวลา ที่ ตัวเอก เหตุ-ผล เป้าหมาย (FACT/THEORY, high-medium) [ZwaanLangstonGraesser1995][ZacksSpeerReynolds2009]. ดังนั้น continuity ที่ต้องคุมก่อนคือสิ่งที่ index 5 มิตินี้ ไม่ใช่สีแก้วน้ำฉากหลัง (ต่อยอดจาก M38 §4)
2. **รอยต่อเหตุการณ์คือจุดที่ความจำ "อัปเดต"** — ของที่อยู่ ณ รอยต่อถูกจำดีกว่า [SwallowZacksAbrams2009]; หลังรอยต่อ รายละเอียดเหตุการณ์ก่อนหน้าเข้าถึงยากลง [RadvanskyZacks2017] → วาง clue/hero prop ไว้ "ที่รอยต่อ" และย้ำข้อมูลสำคัญหลังเปลี่ยนฉาก
3. **Action continuity > space/time continuity** สำหรับความรู้สึกว่าเรื่องต่อเนื่อง [MaglianoZacks2011] — กระโดดที่/เวลาได้ถ้า action ต่อ
4. **ช่องว่างระหว่างภาพมีต้นทุน** — คนดูเติมได้ถ้าเหตุการณ์ "อนุมานได้ง่าย" แต่ใช้เวลาดูภาพถัดไปนานขึ้น [Magliano2016][Hutson2018]
5. **ความเข้าใจภาพต่อเนื่องเป็นทักษะ ไม่ใช่สัญชาตญาณ** — ต้องมี fluency จากการเคยอ่าน comics/picture stories [Cohn2020Universal]
6. **Canon ต้องประกาศ ไม่ใช่ปล่อยให้เดา** — แฟนจะ police continuity; ผู้สร้างควรชัดว่าอะไรคือ canon [Wolf2013Interview]; ตัวอย่างจริงคือการแบ่ง canon/Legends [StarWars2014Legends]
7. **ซีรีส์ยาวมีทรัพย์สินคือ "ประวัติร่วม"** — ฉากธรรมดาจะมีความหมายพิเศษสำหรับคนดูประจำที่รู้ประวัติความสัมพันธ์ [Allen1985]
8. **ข้อจำกัดของโลก/ตัวละครน่าสนใจกว่าพลัง** และ **ขยายลึกก่อนขยายกว้าง** (craft) [Sanderson2011][SandersonThirdLaw]

### 2.3 ความต่อเนื่อง 4 ชั้น (กรอบของ domain นี้)
| ชั้น | คำถาม | ใครเห็นความผิด | ตัวอย่างที่ผิด |
|---|---|---|---|
| L1 **Perceptual** (ภาพ/เสียงระหว่างช็อต) | ของ/เสื้อผ้า/ตำแหน่งตรงไหม | คนดูครั้งแรกเห็นน้อย (change blindness, M38) ยกเว้นใกล้หน้า/มือ/สินค้า | ผ้าพันคอเปลี่ยนสีระหว่างสไลด์ |
| L2 **Situational** (ภายในตอน) | เวลา ที่ ใคร ทำไม เป้าหมาย สอดคล้องไหม | คนดูส่วนใหญ่ — อ่านช้าลง/งง [ZacksSpeerReynolds2009] | ตัวละครรู้สิ่งที่ยังไม่เคยรู้ |
| L3 **Serial** (ข้ามตอน) | สถานะ ความสัมพันธ์ ไทม์ไลน์ กฎโลก | คนดูประจำ/แฟน (in-group) [Allen1985][Wolf2013Interview] | ลุงชาญที่ตายแล้วโผล่ |
| L4 **Canon/Brand** (ข้ามซีรีส์/สื่อ/ทีม) | อะไรคือ canon, เวอร์ชันไหน, ใครอนุมัติ | ทีมงาน + แฟนฮาร์ดคอร์ | ตัวละครชื่อซ้ำสองซีรีส์ (M38 namespace) |

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 Event Segmentation Theory (EST) — ทำไม "รอยต่อ" ถึงสำคัญ (THEORY, หลักฐานดี)
- **กลไก:** ระบบรับรู้สร้าง event model เพื่อทำนายอนาคตอันใกล้; เมื่อทำนายพลาดมากขึ้นชั่วขณะ จะ "รีเซ็ต" model = รับรู้เป็นรอยต่อ [ZacksEtAl2007]
- **หลักฐาน:** การเปลี่ยนในมิติสถานการณ์ทำนายรอยต่อทั้งใน text และ film; รอยต่อทำให้อ่านช้าลง [ZacksSpeerReynolds2009]; ความจำวัตถุขึ้นกับว่ามีรอยต่อเกิดเมื่อไร [SwallowZacksAbrams2009]
- **ผลต่อ continuity:** ความผิดที่เกิด **ข้ามรอยต่อ** (เปลี่ยนฉาก) มักไม่ถูกจับ เพราะ model เก่าถูกปิดไปแล้ว (Event Horizon) [RadvanskyZacks2017]; แต่ความผิด **ภายใน event เดียว** ขัดกับการทำนาย → ถูกรู้สึกได้ง่ายกว่า **(การอนุมานของเรา — ยังไม่มีงานทดสอบตรง; confidence low-medium)**
- **คู่แข่ง/ข้อโต้แย้ง:** event-indexing [ZwaanLangstonGraesser1995] เน้นการอัปเดตทีละมิติ (incremental) ส่วน EST เน้นการรีเซ็ตทั้ง model (global) — งานรุ่นหลังเสนอว่าทั้งสองแบบเกิดได้ (search summary; ยังไม่ได้อ่านต้นฉบับ → อย่าอ้างเป็นข้อยุติ)

### 3.2 SPECT — การอ่าน picture story (carousel) ไม่เหมือนการดูหนัง (THEORY)
- **Front-end** (ภายใน fixation เดียว): เลือกจุดสนใจ + ดึงข้อมูล; **back-end** (ข้ามหลาย fixation): สร้าง/อัปเดต event model ทั้งใน working memory และ episodic memory [Loschky2019SPECT]
- picture story ต่างจาก film: ไม่มี motion ต่อเนื่อง, คนดูคุมจังหวะเอง, ช่องว่างระหว่างภาพใหญ่ → พึ่ง bridging inference มากกว่า [Loschky2019SPECT][Magliano2016]
- **นัยต่อ carousel 5 สไลด์:** ทุกสไลด์ต้องให้ front-end หาสิ่งสำคัญเจอเร็ว (ตัวละคร 2 คน + ของสำคัญ 1 ชิ้น) ก่อน back-end จะอัปเดตเรื่องได้ — ถ้าภาพรก การอนุมานช่องว่างจะล้มเหลว **(การประยุกต์; confidence medium)**

### 3.3 Bridging inference — ช่องว่างที่ดี vs ช่องว่างที่ทำลายเรื่อง (FACT ในแล็บ)
- เอาภาพ "เหตุการณ์กลาง" ออก → คนดูใช้เวลาดูภาพผลลัพธ์นานขึ้น และ think-aloud มีการอนุมาน action มากขึ้น [Magliano2016]
- ทั้ง visuospatial และ linguistic working memory ช่วยการอนุมานนี้ (shared systems) แต่การพูดในใจ (subvocalization) ไม่จำเป็น [Magliano2016] → ข้อความบนสไลด์ไม่ได้เป็นตัวบังคับให้เข้าใจ ภาพเองต้องพอ
- ใช้ได้กับช่องว่างที่ "อนุมานได้สูง" เท่านั้น (เช่น ยื่นร่ม → อีกคนถือร่ม); ช่องว่างที่อนุมานไม่ได้ = ความขาดตอน (L2 error)

### 3.4 Paradigmatic vs syntagmatic continuity (Allen) — THEORY (มนุษยศาสตร์)
- **Syntagmatic:** เรื่องเดินหน้า (เหตุ→ผล→ปิดปม). soap แทบไม่ปิด แต่มี mini-closures ซ้อนกัน [Allen1985]
- **Paradigmatic:** ความหมายจากตำแหน่งของตัวละครในเครือข่าย (ใครเคยแต่งกับใคร ใครเคยเสียใคร) — คนดูประจำอ่าน close-up ของแขกในงานแต่งด้วยประวัติ ซึ่งคนดูใหม่มองไม่เห็น [Allen1985]
- **Redundancy 2 แบบ:** interepisodic (ทวนเรื่องเมื่อวาน ให้คนที่พลาด) vs intraepisodic (ข่าวเดียวส่งต่อหลายคู่ — ซ้ำในเชิง plot แต่ใหม่ในเชิงความสัมพันธ์) [Allen1985]
- **นัย:** ในซีรีส์ยาว continuity ไม่ใช่แค่ "ไม่ผิด" แต่เป็น **แหล่งความหมาย** — ยิ่งเก็บประวัติความสัมพันธ์ดี ยิ่งเขียนฉากเรียบ ๆ ให้มีน้ำหนักได้

### 3.5 Canon governance: 3 โมเดลจากอุตสาหกรรม (PRACTICE)
| โมเดล | กลไก | ตัวอย่างที่มีเอกสาร | ต้นทุน/ความเสี่ยง |
|---|---|---|---|
| **Central authority** | กลุ่มเดียวกำหนด canon ข้ามสื่อ วางแผนหลายปี | Lucasfilm Story Group (ประกาศ 2014; panel 2015) [StarWars2014Legends][Lussier2015] | คอขวด; ต้องมีคนเต็มเวลา + ฐานข้อมูล [Chee2012] |
| **Tiered canon** | ของเก่าไม่ลบ แต่ลดชั้น (Legends) และยังขุดมาใช้ได้ | Rebels ใช้ Inquisitor/ISB จาก RPG ยุค 80 [StarWars2014Legends] | แฟนเก่ารู้สึกเสียของ (ไม่มีข้อมูลเชิงปริมาณ) |
| **Reset (reboot/crisis)** | ล้าง continuity ทั้งชุด เริ่มใหม่ | DC Crisis 1986 → Infinite Crisis 2006 ย้อนบางส่วน [Proctor2012] | reset ไม่ถาวร — continuity สะสมใหม่และถูกย้อนอีก |
| **Multiplicity** | ไม่บังคับ consistency ข้ามเวอร์ชัน | Jenkins 2011 [Jenkins2011] | คนดูต้องรู้ว่าดูเวอร์ชันไหน |
| **Distributed roles** | continuity กระจายไปตามตำแหน่งงาน (script editor, script supervisor, makeup, archive) | Coronation Street job listings (search summary) [ITVCorrieScriptEditor] | ถ้าไม่มีฐานข้อมูลกลาง ข้อมูลกระจัดกระจาย |

### 3.6 Serial engagement: cliffhanger, PSR, callback (หลักฐานผสม)
- **Cliffhanger:** เพิ่ม arousal จริง (EDA/cortisol) แต่ **ไม่เพิ่ม enjoyment หรือความตั้งใจดูต่อ** เทียบกับ "เรื่องที่ยังไม่จบ" ธรรมดา (N=133, ดู 3–4 ตอน) [Wirz2022]; ขณะที่อีกงาน (ข้อความ, N=202/273) พบว่า cliffhanger เพิ่ม **ความอยากอ่านภาคต่อ** โดยไม่ลด enjoyment [Schibler2023] → ข้อสรุป: cliffhanger ช่วย "อยากรู้ต่อ" แต่ไม่ใช่เวทมนตร์; โครงเรื่องใหญ่ที่ยังเปิดอาจทำงานแทนได้ (confidence medium-low)
- **Parasocial relationship:** meta-analysis k=120 — PSR แยกจาก PSI, PSR ทำนาย media involvement ได้ดีกว่า, ไม่สัมพันธ์กับความเหงา [Tukachinsky2020 — search summary]; การหันมาพูดกับคนดู (bodily + verbal addressing) เพิ่ม PSI และความสนุก [HartmannGoldhoorn2011]
- **Callback / running gag:** callback (ของเดิมในบริบทใหม่) ได้เสียงหัวเราะนานกว่า (~8 vs ~3 วินาที) และถูกจำได้ดีกว่าการฉายซ้ำหลังสองสัปดาห์ — แต่เป็นงานที่ยังไม่ตีพิมพ์ (tier C) [Winet2025]
- **ทฤษฎีรวม (opinion ของเรา):** ซีรีส์สั้นยึดคนดูด้วย 3 อย่าง: (1) ความผูกพันกับตัวละครที่ "คงที่" (PSR), (2) ความคุ้นที่ถูกพลิก (callback), (3) ปมใหญ่ที่ยังไม่ปิด — ทั้งสามข้อพึ่ง continuity

### 3.7 AI consistency เป็นปัญหา trade-off ไม่ใช่ปัญหาที่ "แก้แล้ว"
- ViStoryBench (80 เรื่อง, 344 ตัวละคร, 30+ ระบบ รวม GPT-4o, Gemini, Seedream, Sora2): มี **trade-off ชัดระหว่าง character consistency กับ prompt adherence**; ใส่ภาพอ้างอิงช่วย consistency แต่ลด novelty; baseline ที่ "แปะภาพอ้างอิงลงผืน" ได้คะแนน consistency ดีแต่ไม่ทำตามบท → ต้องวัด **copy-paste rate**; โมเดลมัก **เพิ่ม/ลืมตัวละคร** [Zhuang2025ViStoryBench]
- ตัวชี้วัดอัตโนมัติที่สัมพันธ์กับคนมากที่สุดคือ self-consistency ของตัวละคร (Kendall τ .50) — ยังห่างจากสมบูรณ์ [Zhuang2025ViStoryBench]
- วิธี training-free แบบแชร์ attention ในชุด (StoryDiffusion, ConsiStory) คุมได้ "ภายใน batch" ไม่ใช่ข้ามตอน [Zhou2024StoryDiffusion][Tewel2024]
- (ตาราง reference/seed/LoRA/IP-Adapter อยู่ใน M38 §7 แล้ว — ไม่ซ้ำ)

### 3.8 Bible ที่มีชีวิต + การซ่อนรอยต่อ: สองแรงที่ต้องสมดุล
- **ฝั่งเอกสาร:** bible ในทีวีคือ "DNA" ไม่ใช่ "แผ่นศิลา" — เปลี่ยนตามการผลิต และซีรีส์ยาวจะกลายเป็นฐานข้อมูล fictional facts ที่ต้องถามเสมอว่า "เวอร์ชันไหน" [Macdonald2018]. นี่คือเหตุผลที่ต้องมี canon tiers + version (ไม่ใช่ทำ bible ครั้งเดียวแล้วจบ)
- **ฝั่งการรับรู้:** คัทในฉากเดียวกันและ match-action ถูกพลาดบ่อยกว่าคัทข้ามฉาก [SmithHenderson2008] ร่วมกับ action continuity ที่สำคัญกว่า space/time [MaglianoZacks2011] → รอยเพี้ยนเล็กของภาพ AI ซ่อนได้ด้วยการคัทกลาง action
- **สมดุล (opinion ของเรา):** ความผิด L1 จัดการด้วย **การตัดต่อ** (ราคาถูก); ความผิด L2–L4 จัดการด้วย **เอกสาร** (ราคาแพงแต่จำเป็น) — อย่าสลับกัน: อย่าใช้การตัดต่อซ่อนตรรกะที่ขัด และอย่าเขียนเอกสารละเอียดเพื่อคุมฉากหลังไกล

### 3.9 สามคำถามของ "ความจำคนดู" ในซีรีส์ (สังเคราะห์)
| คำถาม | กลไก | แหล่ง | ใช้ทำอะไร |
|---|---|---|---|
| คนดู **จำอะไรได้** จากตอนก่อน? | event model เก่าเข้าถึงยากหลังรอยต่อ; ของที่อยู่ ณ รอยต่อจำดีกว่า | [RadvanskyZacks2017][SwallowZacksAbrams2009] | เลือกว่าอะไรต้องทวน |
| คนดู **รู้สึกผิด** เมื่อไร? | การกระทำขัดนิสัย/ข้อมูลเดิม → อ่านช้าลง (จับได้แม้ไม่รู้ตัว) | [ZwaanRadvansky1998] | จัดลำดับความสำคัญ continuity |
| คนดู **อยากกลับมา** เพราะอะไร? | PSR กับตัวละคร, ปมค้าง, ความคุ้นที่ถูกพลิก | [Tukachinsky2020][Schibler2023][Winet2025] | ออกแบบ series hook |

ผู้สร้างเล่นกับความจำที่จางของคนดูเพื่อสร้าง surprise ได้ด้วย (เช่น ปล่อยรายละเอียดเล็กในตอนต้น แล้วจ่ายหลายตอนให้หลัง) [Mittell2015] — แต่ต้องมี registry เพราะผู้สร้างเองก็ลืมได้

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| Key | พบ/เสนออะไร | Tier | Access |
|---|---|---|---|
| ZwaanLangstonGraesser1995 | event-indexing: เหตุการณ์เชื่อมใน 5 มิติ; verb-clustering สนับสนุน | A | abstract |
| ZwaanRadvansky1998 | review situation model; ขัดนิสัยเดิม → อ่านช้าลง | A | full_text |
| ZacksEtAl2007 | EST: prediction error → event boundary; คุม attention/memory | A | abstract |
| KurbyZacks2008 | review EST + neural correlates | A | search_summary |
| ZacksSpeerReynolds2009 | situational change ทำนายรอยต่อทั้ง text/film; รอยต่อ = อ่านช้า | A | abstract |
| SwallowZacksAbrams2009 | วัตถุ ณ รอยต่อถูกจำดีกว่า; ความจำอัปเดตที่รอยต่อ | A | abstract |
| MaglianoZacks2011 | action discontinuity มีผลมากสุดต่อ segmentation | A | abstract |
| RadvanskyZacks2017 | Event Horizon Model | A | abstract |
| Loschky2019SPECT | front-end/back-end ใน visual narratives | A | abstract |
| Magliano2016 | ภาพกลางหาย → ดูภาพผลนานขึ้น (bridging inference) | A | full_text |
| Hutson2018 | eye-tracking ของ bridging inference ใน picture stories | A | abstract |
| Cohn2020Universal | การอ่านภาพต่อเนื่องต้องมี fluency; ไม่ universal | A | full_text |
| SmithHenderson2008 | edit blindness (M38) — ใช้เทียบ | A | full_text |
| Kachkovski2019 | คนทั่วไปจับ 180° violation ได้ (.42 vs .08) งงได้ แต่ไม่ลดความชอบ | A | full_text |
| Upadhyayula2023 | พลาด time jump 10–30%; jump ไปข้างหน้าถูกจับน้อยกว่าย้อนหลัง ~10% | A | abstract |
| Wirz2022 | cliffhanger ↑arousal แต่ไม่ ↑enjoyment/ความตั้งใจดูต่อ | A | full_text |
| Schibler2023 | cliffhanger ↑ความอยากอ่านภาคต่อ; enjoyment ไม่ต่าง | A | abstract |
| Tukachinsky2020 | meta-analysis PSR k=120 | S | search_summary |
| HartmannGoldhoorn2011 | addressing คนดู ↑PSI ↑enjoyment | A | abstract |
| Allen1985 | soap: ไม่มีการปิด, paradigmatic complexity, redundancy 2 แบบ | A | full_text |
| Mittell2006 / Mittell2015 | complex TV, orienting paratexts, เล่นกับความจำคนดู | A | bibliographic / abstract |
| Macdonald2018 | series bible = DNA ไม่ใช่แผ่นศิลา (M16) | A | full_text |
| Proctor2012 | anatomy ของ reboot; DC Crisis | A | full_text |
| Friedenthal_RetconGame | retcon กับวัฒนธรรมอเมริกัน | A | search_summary (unverified) |
| Wolf2013Interview | infrastructures; แฟน police continuity; ชัดเรื่อง canon | B | full_text |
| Flieger_TolkienEstate | sub-creation, Secondary World, ประวัติตีพิมพ์ | B | full_text |
| Jenkins2011 | continuity vs multiplicity; seriality | B | full_text |
| StarWars2014Legends | canon/Legends + story group | C | full_text |
| Lussier2015 | วิธีทำงาน Story Group; undetermined facts; approved ≠ canon | C | full_text |
| Chee2012 | Holocron database (M16) | C | full_text |
| ITVCorrieScriptEditor | บทบาท continuity ใน soap จริง | C | search_summary |
| Winet2025 | callback ↑เสียงหัวเราะ ↑ความจำ (ยังไม่ตีพิมพ์) | C | publisher_page |
| Sanderson2007 / Sanderson2011 / SandersonThirdLaw | กฎเวทมนตร์ 1–3 | D | full_text |
| Zhou2024StoryDiffusion | consistent self-attention (training-free) | A | abstract |
| Tewel2024 | ConsiStory (M38) | A | abstract |
| Zhuang2025ViStoryBench | benchmark story visualization; trade-off; copy-paste; ตัวละครหาย | A | full_text |
| AnumanRajadhon1954 | ประเภทผีไทย: chao phi, phi ruan, phi tai hong ฯลฯ | B | full_text |
| Angkasuparakul2025 | ตึกแถวตะวันตกริมคลองคูเมืองเดิม หลังสนธิสัญญาเบาว์ริง | A | abstract |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| Claim | ระดับหลักฐาน | เหตุผล / ข้อโต้แย้ง |
|---|---|---|
| คนดูติดตาม time/space/protagonist/causality/goal | **high** | หลายแล็บ หลายวิธี (reading time, clustering) [ZwaanLangstonGraesser1995][ZwaanRadvansky1998][ZacksSpeerReynolds2009]; ส่วนใหญ่ text ภาษาอังกฤษ |
| การเปลี่ยนสถานการณ์ทำนายรอยต่อเหตุการณ์ทั้ง text และ film | **high** | [ZacksSpeerReynolds2009]; ทฤษฎีกลไก (prediction error) ยัง medium [ZacksEtAl2007] |
| Action discontinuity สำคัญกว่า space/time | **medium** | หนังเรื่องเดียว + fMRI [MaglianoZacks2011] |
| ช่องว่างที่อนุมานได้เพิ่มเวลาประมวลผลภาพถัดไป | **medium-high** | หลายการทดลองในกลุ่มเดียวกัน [Magliano2016][Hutson2018]; ยังไม่ทดสอบกับ carousel บนมือถือ |
| การอ่านภาพต่อเนื่องไม่ universal | **medium** | review ข้ามวัฒนธรรม แต่งานภาคสนามเก่า/เล็ก [Cohn2020Universal]; สำหรับผู้ใช้ IG ไทยที่คุ้น comics ผลกระทบน่าจะน้อย (การอนุมาน) |
| คนทั่วไปจับ 180° ได้ แต่ไม่ลดความชอบ | **medium** | การทดลองเดียว 3 experiments, ภาพสั้น [Kachkovski2019] — ขัดกับความเชื่อวงการว่า "ผิดแกน = แย่" |
| Time jump ไปข้างหน้าถูกจับน้อยกว่า | **medium** | [Upadhyayula2023] คนดูที่ถูกสั่งให้หา → ในการดูจริงน่าจะพลาดมากกว่า |
| Cliffhanger เพิ่ม retention | **low / contested** | [Wirz2022] null ต่อ intention; [Schibler2023] บวกต่อ "desire for next installment" — ต่างสื่อ ต่างตัววัด; ยังไม่มีงานกับคลิปสั้น |
| PSR ทำนาย involvement | **medium-high** | meta-analysis [Tukachinsky2020] — อ่านแค่ summary |
| Callback ดีกว่าการซ้ำเฉย ๆ | **low-medium** | ยังไม่ peer-review; correlational บางส่วน [Winet2025] |
| Canon governance แบบรวมศูนย์ทำให้แฟรนไชส์ "ดีขึ้น" | **ไม่มีหลักฐาน** | มีแค่เอกสารว่ามีอยู่และทำงานอย่างไร [StarWars2014Legends][Lussier2015]; ไม่มีการวัดผล |
| Reboot แก้ปัญหา continuity ได้ถาวร | **low (หลักฐานแย้ง)** | DC reset 1986 แล้วย้อน 2006 [Proctor2012] |
| AI tool ใด "แก้" character consistency แล้ว | **ไม่จริงตามหลักฐาน** | benchmark แสดง trade-off และปัญหาตัวละครหาย/เกิน [Zhuang2025ViStoryBench] |
| กฎ Sanderson | **craft (ไม่ใช่หลักฐาน)** | สอดคล้องกับงาน situation model เรื่อง inconsistency (M16) แต่ไม่เคยทดสอบโดยตรง |

**Replication / critique notes**
- **Doorway effect** (ส่วนหนึ่งของ event horizon) ไม่พบในบาง experiment ตามรายงานรอง — อย่าใช้ "เปลี่ยนฉาก = คนลืมแน่นอน" เป็นกฎตายตัว [RadvanskyZacks2017]
- **Zeigarnik effect** (เหตุผลยอดนิยมของ cliffhanger) มีปัญหา replication ตามที่ search summary รายงาน — ไม่ได้อ่านต้นฉบับ จึง **ไม่อ้าง Zeigarnik** ในเอกสารนี้
- งาน event cognition ส่วนใหญ่ใช้นักศึกษาตะวันตก, text หรือหนังยาว; การย้ายมาใช้กับ carousel 5 สไลด์/คลิป 20–90 วินาที เป็น **การอนุมาน**
- งาน cliffhanger สองชิ้นขัดกัน: ต่างกันที่สื่อ (ทีวี vs ข้อความ), ตัววัด (intention ระยะยาว vs desire) และจังหวะการวัด
- ViStoryBench เตือนเองว่ายังไม่วัด background consistency และ video; vendor เปลี่ยนรุ่นเร็ว ผลอาจล้าสมัย [Zhuang2025ViStoryBench]

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 Generic how-to (ใช้กับทุกซีรีส์ ทุกลูกค้า)

**A. ตั้งโครงสร้าง canon ก่อนเรื่องที่ 1** (ต่อจาก `STORY_BIBLE_TEMPLATE.md`)
1. ประกาศ **canon tiers**: `canon` (ออกแล้ว) · `planned` · `archive/legends` (เคยทำแต่ไม่นับ) · `multiplicity` (เวอร์ชันพิเศษ/what-if/โฆษณา ที่ไม่นับต่อเนื่อง) [StarWars2014Legends][Jenkins2011]
2. สร้าง **infrastructure 3 ชิ้น**: map (สถานที่ + ทิศ), timeline (เวลาในเรื่อง), genealogy/relationship graph [Wolf2013Interview] — ใน `continuity.json` คือ `places[]`, `timeline[]`, `characters[].relations` (เสนอ field ใหม่ — ดู 6.3)
3. ทำรายการ **undetermined facts** (สิ่งที่ตั้งใจยังไม่ตัด เช่น อายุจริง, บ้านอยู่ไหน) — ห้ามระบุโดยไม่ตั้งใจ [Lussier2015]
4. แยก **"on-brand" vs "canon"**: ชิ้นงานโฆษณา/collab อาจผ่านเกณฑ์ "เป็นตัวละครนี้จริง" แต่ไม่นับเป็นเหตุการณ์ในเรื่อง [Lussier2015]

**B. ออกแบบแต่ละตอนตามการรับรู้**
1. **1 รอยต่อ = 1 การเปลี่ยนหลัก** — เปลี่ยนที่ หรือ เวลา หรือ เป้าหมาย ทีละอย่างต่อสไลด์/ช็อต; การเปลี่ยนซ้อนหลายมิติ = ต้นทุนประมวลผลสูง [ZacksSpeerReynolds2009]
2. **วางข้อมูลสำคัญที่รอยต่อ** (hero prop, clue, ข้อความหลัก) — จำได้ดีกว่า [SwallowZacksAbrams2009]
3. **ย้ำหลังรอยต่อ** ถ้าข้อมูลก่อนหน้าจำเป็นต่อฉากถัดไป (event horizon) [RadvanskyZacks2017]
4. **ช่องว่างระหว่างภาพ**: ตัดได้เฉพาะ action ที่อนุมานได้สูง; ให้ภาพผลลัพธ์มีเวลา/ความชัดพอ [Magliano2016]
5. **คงทิศ action ข้ามคัท** มากกว่าคงฉากหลัง [MaglianoZacks2011]; คงฝั่งจอเพื่อความเข้าใจ (ผิดแล้วงง แต่ไม่ถึงกับไม่ชอบ) [Kachkovski2019]
6. **ข้ามเวลาไปข้างหน้าได้อิสระ; ย้อนเวลาต้องติดป้าย** (การ์ด/สี/สไตล์) [Upadhyayula2023]

**C. ออกแบบซีรีส์**
1. **สูตรตอน (episode formula)** = ส่วนที่คงที่ (โครง, จังหวะ, ตัวละคร, device) + ส่วนที่แปร (สถานการณ์) — ความคงที่ช่วยคนดูใหม่ (orienting) [Mittell2015] **(craft)**
2. **Mini-closure ทุกตอน + ปมใหญ่ค้าง 1–2 ปม** [Allen1985]; อย่าพึ่ง cliffhanger อย่างเดียว [Wirz2022][Schibler2023]
3. **Running gag = callback** — กลับมาในบริบทใหม่และเปลี่ยนความหมาย ไม่ใช่ซ้ำเหมือนเดิม; บันทึก `appearances[]` และ `rest_after` ใน running_elements (schema M38) [Winet2025]
4. **Redundancy แบบ soap**: ข้อเท็จจริงที่คนใหม่ต้องรู้ ให้มาจากปากตัวละคร/ภาพในบริบทใหม่ ไม่ใช่สไลด์ "ตอนที่แล้ว" เสมอไป [Allen1985]
5. **Deep before wide**: ก่อนเพิ่มตัวละคร/สถานที่ใหม่ ถามว่าของที่มีอยู่รับบทได้ไหม [SandersonThirdLaw]
6. **กฎโลกเขียนเป็น "ข้อจำกัด + ต้นทุน"** ไม่ใช่ "พลัง" [Sanderson2011]

**D. เมื่อพบ continuity error ที่ออกไปแล้ว** → ใช้ decision table §11.3 (fix / ignore / explain / retcon / soft reboot)

### 6.2 สำหรับสตูดิโอ (applied)

**Slowly Growing / story carousels (charcoal, 160 ชุด, IG 1:1, 5 สไลด์)**
- **ข้อสังเกตจริงจากไฟล์ (our test, 2026-11-26):** `slowly-growing/README.md` นิยามตัวละคร **Mint** (สเวตเตอร์ไหมพรมสีข้าวโอ๊ต) และ **Tao** (โค้ทยาวชาร์โคล ผ้าพันคอน้ำตาล) แต่ `carousel/kits/*/kit.md` ทั้ง 160 ชุดเขียนว่า "ซ้าย = คนใส่ฮู้ด, ขวา = คนใส่โค้ทยาว" ไม่มีชื่อ → มี **สองนิยามของคู่หลัก** ในสองช่องทาง. ต้องตัดสิน (ผู้ใช้เป็นคนเลือก): (ก) เป็นคู่เดียวกัน → ทำ alias ใน registry (`slowly.mint` = "hoodie/left" ใน charcoal?) หรือ (ข) เป็นคนละคู่ → แยก series id (`slowly` vs `charcoal`). ห้ามเดาแทนผู้ใช้
- **จุดแข็งที่มีอยู่แล้ว:** ฝั่งจอคงที่ 160/160 ชุด (ซ้าย=ฮู้ด, ขวา=โค้ท) — สอดคล้องกับ M38 และ [Kachkovski2019]
- **paradigmatic asset:** 160 เรื่อง = ประวัติร่วมมหาศาล (ร่มที่ลืม, พลุปีใหม่, sticky note…) แต่ยังไม่มี registry → ไม่สามารถทำ callback ได้อย่างตั้งใจ. เสนอ `continuity.json` แบบเบา: `episodes[]` (id, ชื่อ, ฤดู/เทศกาล, สถานที่, prop สำคัญ, มุก/ประโยคเด่น) — แล้วให้เรื่องที่ 161+ เรียก callback 1 อย่างต่อ 5–10 เรื่อง [Allen1985][Winet2025] **(craft)**
- **สูตร 5 สไลด์ = event model ที่ดี:** สไลด์ 1 ตั้ง goal ("ไปดูพลุ"), 2 อุปสรรค, 3 ทางเลือก, 4 การเปลี่ยนที่, 5 mini-closure — แต่ละสไลด์เปลี่ยนมิติเดียว [ZacksSpeerReynolds2009]
- **ปฏิทินในเรื่อง:** ชุดล่าสุดมีเทศกาล (ปีใหม่, countdown, resolution) → ต้องมี `timeline` ระดับ "ฤดูกาลในเรื่อง" เพื่อไม่ให้ปีใหม่เกิดสองครั้งในเดือนเดียวกันของเรื่อง (หรือประกาศว่าเป็น **floating timeline** = ไม่นับอายุ/ปี — ต้องเขียนไว้ใน DNA) **(craft)**
- **AI consistency:** FLUX ในเครื่องสร้างทีละภาพ → ใช้ QC 3 ข้อจาก ViStoryBench: ตัวตนตรงไหม, ทำตามบทไหม, **มีคนครบสองคนไม่เกินไม่ขาดไหม** [Zhuang2025ViStoryBench]

**ร้านแว่นตีสอง (night-optic, 16:9 ghost stories)**
- **กฎผีจากความเชื่อไทยจริง:** แนวคิด **phi ruan** — ญาติที่ตายแล้วอยู่ในบ้านอย่างมองไม่เห็น คุ้มครองครอบครัว มีมุมที่เป็นที่ศักดิ์สิทธิ์ ครอบครัวขออนุญาตในเรื่องสำคัญ [AnumanRajadhon1954] → เข้ากับ "ร้านของคุณตา" ได้ดี (คุณตาเป็นผีเรือน = soft rule ใช้สร้างบรรยากาศ ไม่ใช้แก้ปม — ตาม Sanderson ใน M16)
- **ลูกค้าผีมาตอนตีสอง** = กฎ (ontological change) ต้องมี `cost_or_limit` เช่น "มาได้เฉพาะคนที่ยังมีเรื่องค้างเกี่ยวกับการมองเห็น" **(craft)**; หลีกเลี่ยงการใช้ **phi tai hong** (ผีตายโหง) แบบขำ ๆ — ความเชื่อจริงถือว่าน่ากลัว และเกี่ยวกับการตายรุนแรง [AnumanRajadhon1954] **(opinion: ความอ่อนไหวทางวัฒนธรรม)**
- **External realism ของฉาก:** ตึกแถวริมคลองย่านเก่า — ถ้าระบุยุค ต้องสอดคล้องกับประวัติ (ตึกแถวสไตล์ตะวันตกริมคลองคูเมืองเดิมเกิดหลังเบาว์ริง/ยุค ร.5 และค่อย ๆ ไปทาง modern) [Angkasuparakul2025]; แต่ night-optic ใช้ "ตึกแถวไม้" — ไม่ต้องระบุปีถ้าไม่จำเป็น (iceberg) **(craft)**
- **Narrator "ผม" (Ton)** พูดกับคนดู → PSI สูงขึ้นได้ [HartmannGoldhoorn2011]; ต้องคงเสียง (Charon) + น้ำเสียงเดิมทุกตอน (ดู ai-voice-director)
- **EP02 tease แล้ว** ("ลูกค้าคนต่อไป มาก่อนตีสองด้วยซ้ำ") = open thread ที่ **ละเมิดกฎตีสอง** → ต้องจ่ายด้วยเหตุผลในโลก (ไม่ใช่ลืม) **(our test: อ่านจาก SERIES.md)**

**Zombie (Z01–Z10, จบแล้ว)**
- เป็น serial เต็มรูป → ถ้าทำ season 2 เลือกระหว่าง continuation vs soft reboot (§11.3); ตัวละครที่ตายแล้ว (ลุงชาญ Z08) ห้ามกลับมาโดยไม่มีกฎ (Z10 brute มีกฎแล้ว: ถูกกัด → กลับมา) [Sanderson2007]

**Eyesight (anthology + season 2 จาก EP11)**
- "One year later" (EP11) = **forward time jump** — คนดูรับได้ง่าย [Upadhyayula2023] แต่ต้องอัปเดต state ของทุก recurring element; fact ทางวิทยาศาสตร์คือ canon ที่ห้าม retcon (ถ้าผิด → fix + ปักหมุดแก้ ไม่ใช่ retcon)

**คลิปสินค้าแว่น / แบรนด์อื่น**
- "brand world" ก็มี canon: โลโก้, wordmark เคลื่อนไหว, กฎ "ไม่มี line art ในคลิป" (CLAUDE.md house rules) = `rules[] type: brand`; โฆษณาร่วมแบรนด์ (collab) = tier "approved, not canon" [Lussier2015]

### 6.2b สูตรตอนต่อซีรีส์ (episode formula — craft, ตรวจจากไฟล์จริง)
| ซีรีส์ | คงที่ (formula) | แปร | ปมใหญ่ | running elements | ความเสี่ยงหลัก |
|---|---|---|---|---|---|
| Story carousels (charcoal) | 5 สไลด์ 1:1, สองคน ซ้ายฮู้ด/ขวาโค้ท, บทสั้นสองบรรทัดต่อคน, ไม่มีโลโก้ | สถานที่, ฤดู, ปัญหาเล็ก | ไม่มี (episodic) | ไม่ได้บันทึก → ควรเริ่ม | นิยามตัวละครคนละชุดกับ Slowly Growing; ปฏิทินเทศกาลซ้ำ |
| Slowly Growing (TikTok 20 วิ) | 3 ช่วง 0–6/6–13/13–20 วิ, Mint กังวล → Tao ตอบอบอุ่น | สถานการณ์ชีวิต | ไม่มี | บทบาทพูด Mint/Tao | ภาพอ้างอิง EP01 หาย/เปลี่ยน |
| ร้านแว่นตีสอง | narrator "ผม", ตีสอง, ลูกค้าไม่ใช่คน, แว่นเป็นสื่อ | ลูกค้า/ปมของผี | ประวัติคุณตา/ร้าน (เสนอ) | เวลา 02:00, กระดิ่งประตู (เสนอ) | กฎตีสองถูกละเมิดใน tease EP02 |
| Eyesight | clock chip, การ์ดครีมขอบทอง, tease ตอนถัดไป | หัวข้อสายตา | season arc (S2 จาก EP11) | format device | fact ขัดกันข้ามตอน |
| Zombie | Day/time card, กรุงเทพฯ จริง | สถานที่/การหนี | เอาชีวิตรอด Day 1–3 | กฎกัด 1–3 นาที | state คนตาย/ถูกกัด |

### 6.2c ตัวอย่าง registry แบบเบาสำหรับซีรีส์ episodic duo (ข้อเสนอ — ไม่ได้สร้างไฟล์)
```json
{
 "series": {"id": "charcoal", "kind": "episodic", "timeline_mode": "floating",
            "canon_tiers": ["canon", "archive", "multiplicity", "approved_not_canon"]},
 "characters": [
  {"id": "charcoal.hood", "aliases": ["ซ้าย = คนใส่ฮู้ด", "slowly.mint? (รอผู้ใช้ยืนยัน)"],
   "identity_markers": ["hoodie", "always screen-left", "faceless round head"],
   "voice_role": "asks / worries / notices small things",
   "relations": [{"with": "charcoal.coat", "type": "close friends", "since_ep": "001"}]},
  {"id": "charcoal.coat", "aliases": ["ขวา = คนใส่โค้ทยาว"],
   "identity_markers": ["long coat", "always screen-right", "slightly taller"],
   "voice_role": "answers short, warm, leads to a better place"}
 ],
 "undetermined": [
  {"fact": "names of the two characters in the carousel channel", "owner": "user"},
  {"fact": "where they live / do they live together", "owner": "user"}
 ],
 "episodes": [
  {"id": "160", "title_th": "พลุปีใหม่", "season_cue": "New Year", "places": ["riverside", "small bridge"],
   "props": [], "line_hook": "สวยที่สุด / ที่เคยดูมา",
   "boundaries": [{"slide": 2, "changed": "obstacle"}, {"slide": 4, "changed": "place"}],
   "callbacks": []}
 ]
}
```
ข้อมูลตอน 160 มาจาก `carousel/kits/2026-11-26_160-fireworks/kit.md` (our test); ชื่อ field ใหม่เป็นข้อเสนอใน 6.3

### 6.2d ขั้นตอนก่อนเขียนเรื่องใหม่ในซีรีส์ยาว (5 นาที)
1. เปิด registry → อ่าน 10 ตอนล่าสุด (สถานที่, ฤดู, prop, ประโยคเด่น)
2. เลือก: เรื่องนี้จะ **ขยายลึก** อะไรของคู่หลัก (นิสัย/ความสัมพันธ์/ประวัติ) [SandersonThirdLaw]
3. ถ้าถึงรอบ callback (เช่น ทุก 5–10 ตอน) → เลือกของเก่า 1 ชิ้น ใส่ในบริบทใหม่ [Winet2025] **(ความถี่เป็น craft heuristic ไม่ใช่ผลวิจัย)**
4. เขียนบท → ตรวจ 5 มิติต่อสไลด์ [ZwaanLangstonGraesser1995]
5. หลังเผยแพร่ → เพิ่มตอนลง registry + บันทึก discrepancy ถ้ามี

### 6.3 ข้อเสนอเพิ่ม field ใน `continuity.json` (ไม่แก้ไฟล์ — ข้อเสนอให้ M38)
| field ใหม่ | เหตุผล | แหล่ง |
|---|---|---|
| `canon_tiers` + `entry.tier` (`canon/planned/archive/multiplicity/approved_not_canon`) | แยกชั้น canon | [StarWars2014Legends][Lussier2015][Jenkins2011] |
| `undetermined[]` (fact, reason, owner) | กันการตัดสินโดยไม่ตั้งใจ | [Lussier2015] |
| `characters[].relations[]` (with, type, since_ep, history) | paradigmatic network | [Allen1985][Wolf2013Interview] |
| `characters[].aliases[]` (ชื่อในช่องทางอื่น) | แก้ปัญหา Mint/hoodie | our test |
| `episodes[].boundaries[]` (slide/shot, dimension changed) | ตรวจ 1 รอยต่อ = 1 การเปลี่ยน | [ZacksSpeerReynolds2009] |
| `episodes[].callbacks[]` (refers_to_ep, element, new_context) | วางแผน callback | [Winet2025] |
| `timeline_mode`: `fixed` / `floating` | ซีรีส์เทศกาลวนปี | (craft) |
| `generation[].qc` (identity, prompt_adherence, char_count_ok, copy_paste_risk) | QC ภาพ AI | [Zhuang2025ViStoryBench] |

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

### 7.1 Lucasfilm canon reset + Story Group (2014–)
- **Documented:** 25 เม.ย. 2014 ประกาศ canon = 6 ภาพยนตร์ + The Clone Wars; EU เดิมเป็น Legends แต่ยังพิมพ์ขาย; ตั้งกลุ่มดูแล "all Star Wars creative development"; Rebels ดึง Inquisitor/ISB จากวัสดุยุค 80 มาใช้ [StarWars2014Legends]. Panel 2015: วางแผนหลายปี, รับ pitch, บางครั้งตอบ "กลับมาอีกหกปี", แยก authenticity กับ canon, คง undetermined facts [Lussier2015]; ฐานข้อมูล Holocron มีมาก่อนตั้งแต่ 2000 [Chee2012]
- **วิเคราะห์ (ของเรา):** สำเร็จในแง่ "ทำให้ทุกสื่อเล่าเรื่องเดียวกันได้" และให้ผู้กำกับภาพยนตร์ใหม่มีอิสระ — ต้นทุนคือความไม่พอใจของแฟน EU (ไม่มีข้อมูลเชิงปริมาณในแหล่งที่อ่าน). บทเรียน: **canon tiers + archive ที่ยังขุดได้** ดีกว่าการลบทิ้ง

### 7.2 American daytime soap (Allen 1985) — continuity เป็นแหล่งความหมาย
- **Documented:** soap มีตัวละคร 40+ คน ไม่มีตัวขับเรื่องเดียว; ใช้ redundancy สองแบบ; ฉากงานแต่ง Kelly–Morgan (Guiding Light, ส.ค. 1981) ตัด close-up แขกที่ไม่เกี่ยวกับ plot แต่คนดูประจำอ่านออกด้วยประวัติ; Love of Life (ยุติ 1981) "ไม่ได้จบ แต่หมดลมกลางเรื่อง" [Allen1985]
- **บทเรียน:** สำหรับซีรีส์ที่ไม่มีวันจบ (Slowly Growing) — ลงทุนกับ **เครือข่ายความสัมพันธ์** และ **mini-closure** มากกว่าปมใหญ่

### 7.3 Coronation Street — continuity กระจายตามตำแหน่งงาน
- **Documented (search summary, tier C):** ตำแหน่ง Assistant Script Editor อ่านบทเพื่อให้ตัวละครถูกปฏิบัติอย่างสอดคล้อง ต้องรู้ storyline/plots/characters; script supervisor จด continuity; makeup ดูแล continuity ข้าม filming blocks [ITVCorrieScriptEditor]. ซีรีส์ออกอากาศตั้งแต่ 1960 (ตามข้อมูลรองในผลค้นหา)
- **บทเรียน:** ในทีมเล็ก "ตำแหน่ง" เหล่านี้คือ **ขั้นตอน QC** — script check (L2–L3), shot check (L1), look check (identity) — Claude ทำได้เป็น checklist

### 7.4 ซีรีส์ภาพต่อเนื่องที่ใช้ช่องว่างอย่างตั้งใจ (หลักฐานแล็บ → craft)
- **Documented:** การตัดภาพเหตุการณ์กลางที่อนุมานได้ ทำให้คนดูสร้างการอนุมานเอง (วัดได้จาก viewing time + think-aloud) [Magliano2016]
- **บทเรียน:** carousel ชุด "พลุ" (#160) ตัดการเดินจากริมน้ำไปสะพาน (สไลด์ 3→4) — อนุมานได้จากบท "มีที่หนึ่ง / ตามมา" → ช่องว่างดี **(our analysis)**

### 7.5 Sanderson ขยายลึกก่อนกว้าง (craft case)
- **Documented (ผู้เขียนเล่าเอง):** Mistborn ผูกพลังเข้ากับบทบาทในแก๊งขโมย; คำแนะนำให้ Robert Jordan ตัดตัวละครที่ใช้น้อยแล้วโอนบทให้คนอื่น [SandersonThirdLaw]
- **บทเรียน:** ซีรีส์ยาวที่มีตัวละครประจำน้อย (2 คน) ได้เปรียบ — ทุกเรื่องใหม่เพิ่ม "ความลึก" ของคู่เดิม

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 DC multiverse ก่อน 1986 → Crisis → ย้อนกลับ (real, documented)
- **What:** continuity สะสมจน "ซับซ้อน สับสน ขัดกันเอง" ไม่เป็นมิตรกับคนอ่านใหม่ → Crisis (1986) ล้าง; Infinite Crisis (2006) ย้อนบางส่วน [Proctor2012]
- **Why:** ไม่มี canon tiers ตั้งแต่ต้น ทุกเรื่องนับหมด; reset ไม่ได้แก้ "กลไก" ที่ทำให้สะสม
- **Lesson:** reset เป็นยาแรงที่ไม่ถาวร — ป้องกันด้วย registry + tiers ตั้งแต่เรื่องแรก

### 8.2 ความเชื่อว่า cliffhanger = ยอดดูตอนต่อไป (typical failure, labelled)
- **What:** ทีมหลายทีมจบทุกตอนด้วย cliffhanger เพื่อ retention
- **Why it fails:** หลักฐานแล็บแสดงว่าเพิ่ม arousal แต่ไม่เพิ่ม enjoyment/ความตั้งใจดูต่อเมื่อเทียบกับเรื่องที่ยังไม่จบ [Wirz2022]; ถ้า cliffhanger ไม่ถูกจ่าย (เช่น ซีรีส์หยุด) = open thread ค้าง (M16 mystery budget)
- **Lesson:** ใช้ cliffhanger เป็นเครื่องมือหนึ่ง [Schibler2023] ไม่ใช่สูตรตายตัว; ทุก tease ต้องลงใน `open_threads` พร้อม `payoff_ep`

### 8.3 AI "copy-paste consistency" (typical failure, documented เป็นปรากฏการณ์)
- **What:** ภาพตัวละครเหมือนภาพอ้างอิงเป๊ะ แต่ท่าทาง/การกระทำไม่ตรงบท หรือหายไปหนึ่งคน
- **Why:** trade-off consistency vs prompt adherence; โมเดลมักเพิ่ม/ลืมตัวละคร [Zhuang2025ViStoryBench]
- **Lesson:** QC ต้องมีคำถาม "ภาพนี้ทำสิ่งที่บทสั่งไหม" แยกจาก "หน้าตาเหมือนไหม"

### 8.4 นิยามตัวละครสองชุดในสองช่องทาง (real, ในโปรเจกต์นี้ — our test)
- **What:** Mint/Tao (README) vs "ฮู้ด/โค้ท" ไม่มีชื่อ (160 carousel kits)
- **Why:** ช่องทางใหม่ (carousel) เกิดจาก pipeline ใหม่ ไม่ได้อ้าง bible เดิม; ไม่มี registry กลาง (L4)
- **Lesson:** ทุก pipeline ใหม่ต้อง "ลงทะเบียน" ตัวละครกับ series id + aliases ก่อนผลิตชิ้นแรก (Holocron logic [Chee2012])

### 8.5 ใช้ความเชื่อท้องถิ่นแบบผิวเผิน (typical failure, labelled)
- **What:** ซีรีส์ผีไทยใช้ผีแบบตะวันตก (ปีศาจ/ไล่ผีแบบคริสต์) หรือใช้ผีตายโหงเป็นมุกตลก
- **Why:** ละเลย ontology ท้องถิ่นที่คนดูรู้ดีกว่าผู้สร้าง (external realism ของความเชื่อ) — phi ruan, chao phi, phi tai hong มีความหมายและข้อห้ามเฉพาะ [AnumanRajadhon1954]
- **Lesson:** กฎผีใน bible ต้องมี `source` ชี้ไปยังความเชื่อจริง หรือระบุว่า "ประดิษฐ์ใหม่" ชัด ๆ

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

**วัฒนธรรม (ไทย vs ตะวันตก)**
- **ผีในโลกไทยไม่ได้แยกขาดจากชีวิตประจำวัน:** phi ruan อยู่ร่วมบ้าน คุ้มครอง ได้รับการเคารพ; chao phi เป็นผู้คุ้มครองพื้นที่ มีศาล [AnumanRajadhon1954] → "minimal departure" สำหรับคนดูไทยต่างจากตะวันตก: ผีเรือนไม่ใช่การเปลี่ยนระดับ ontological ที่น่าตกใจเท่ากับในสายตาฝรั่ง **(การอนุมาน; confidence medium)**
- **ละครไทย (lakhon) ส่วนใหญ่จบในซีซัน** (ตามข้อมูลรองจากผลค้นหา — ไม่ได้อ่านงานวิชาการ; ยังไม่ใส่เป็น source) ต่างจาก soap อเมริกันที่ไม่จบ [Allen1985] → คนดูไทยอาจคาดหวัง closure มากกว่า **(hypothesis — ต้องหาแหล่ง)**
- **Visual narrative fluency:** คนไทยรุ่นใหม่คุ้นการ์ตูน/เว็บตูนสูง; กลุ่มสูงวัยหรือผู้ไม่อ่านการ์ตูนอาจอ่านสไลด์แยกเป็นภาพเดี่ยว [Cohn2020Universal] → คลิปสินค้าแว่นสำหรับผู้สูงวัย (สายตายาว) ควรใช้ต่อเนื่องแบบ "ตัวละครเดียว ที่เดียว" มากกว่า montage

**แพลตฟอร์ม**
- **IG carousel:** คนดูคุมจังหวะเอง ย้อนได้ → change blindness ช่วยน้อยกว่าในหนัง (ปัดกลับเทียบได้) — error ใกล้หน้า/มือ/ของสำคัญเสี่ยงสูงขึ้น (M38 + [Loschky2019SPECT]) **(การอนุมาน)**
- **TikTok/Reels:** วนดูซ้ำ, คอมเมนต์ชี้จุดผิด (M38); คนดูส่วนใหญ่มาจาก feed ไม่ได้ดูตามลำดับ → **ทุกตอนต้องเข้าใจได้โดยไม่รู้ตอนก่อน** (Jenkins additive comprehension ใน M16) และ redundancy แบบ interepisodic สำคัญ [Allen1985]
- **YouTube 16:9 ยาว (night-optic):** คนดูมีแนวโน้มดูเป็นชุด → serial continuity (L3) มีน้ำหนักมากขึ้น **(opinion)**

**ผู้ชม**
- แฟนประจำ (in-group) จับ continuity ได้มากกว่าและ "police" [Wolf2013Interview] แต่ก็ "อธิบายแทน" ความผิดเล็ก ๆ ได้เอง [Wolf2013Interview]
- PSR ไม่ได้ผูกกับความเหงา [Tukachinsky2020] — อย่าออกแบบตัวละครประจำโดยสมมติว่าคนดูเหงา

**ประเภทงาน**
| ประเภท | continuity ที่สำคัญที่สุด | ผ่อนได้ |
|---|---|---|
| Anthology (eyesight, quotes) | format, device, facts | ตัวละคร/ที่ |
| Serial (zombie, night-optic) | state, timeline, rules, knowledge | ฉากหลังไกล |
| Episodic duo (Slowly Growing) | identity markers, ฝั่งจอ, นิสัย, ความสัมพันธ์ | เวลา (floating) |
| Brand/product | hero prop ตรงเป๊ะ, brand rules | เรื่อง (multiplicity ได้) |
| Comedy | กฎของมุก (callback) | realism |

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| Domain | เชื่อมอย่างไร |
|---|---|
| **01 creative thinking & cognitive science** | EST/situation model = ฐานของ "ทำไมคนเข้าใจเรื่อง" — ใช้ร่วมกับ working memory/attention; การ brainstorm ตอนใหม่ใช้ Third Law (expand before add) เป็น constraint |
| **02 psychology & EI** | PSR/PSI [Tukachinsky2020][HartmannGoldhoorn2011]; การรักษานิสัยตัวละครให้คงที่ = ความไว้ใจของคนดู |
| **03 aesthetic intelligence** | style consistency (ลายเส้นชาร์โคล) เป็น canon ระดับ L1/L4; trade-off consistency vs novelty [Zhuang2025ViStoryBench] |
| **04 visual language & grammar** | 180°/screen direction [Kachkovski2019], bridging inference ระหว่าง panel [Magliano2016], SPECT [Loschky2019SPECT] |
| **05 semiotics & metaphor** | motif/prop ที่กลับมา = สัญญะสะสมความหมาย (callback) [Winet2025]; paradigmatic reading [Allen1985] |
| **06 character psychology** | knowledge state, never-list, Second Law (ข้อจำกัด > พลัง) [Sanderson2011]; relationship graph |
| **08 philosophy, literature & poetry** | Tolkien sub-creation, Secondary World [Flieger_TolkienEstate]; possible worlds (M16) |
| **09 cultural studies** | ผีไทย [AnumanRajadhon1954], ตึกแถวริมคลอง [Angkasuparakul2025], ความต่างในการอ่านภาพ [Cohn2020Universal] |
| **10 psychoacoustics** | เสียงประจำซีรีส์ (เสียง narrator, sting ตีสอง) เป็น running element; continuity เสียงข้ามตอน (ยังไม่มีแหล่งในโดเมนนี้) |
| **11 consumer psychology & marketing** | brand world canon, callback ในโฆษณา [Winet2025], approved-not-canon collab [Lussier2015] |
| **12 independent criticism** | ใช้ rubric §14 วิจารณ์ซีรีส์คนอื่น; แยก "error ที่คนดูเห็น" vs "error ที่เราเห็นเพราะรู้" (M38) |
| **13 QA & evaluation** | checklist §13 + rubric §14 เข้า QC gate; ViStoryBench metrics เป็นต้นแบบ auto-QC |
| **14 knowledge management** | registry/canon tiers/undetermined/decision log = KM ของเรื่องแต่ง; Holocron [Chee2012] |
| **15 workflow automation** | `continuity.json` + validator; สคริปต์ตรวจ: ตัวละครครบ, ID namespace, callback interval, open thread ค้างเกิน N ตอน |

Module links: M16 (`../world-building/README.md`), M38 (`../continuity/README.md`, `CONTINUITY_SYSTEM.md`), M44 cartoon (ตาม MEMORY: มีโมดูลการ์ตูน), `story-clips/_craft/GUIDE.md` (shot grammar)

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 ซีรีส์นี้ควรเป็นแบบไหน
| ถ้า… | แล้ว… |
|---|---|
| คนดูส่วนใหญ่มาจาก feed ไม่เรียงตอน | episodic/anthology; ทุกตอนจบในตัว + ปมใหญ่เบา ๆ 1 ปม |
| มีตัวละครประจำ ≤3 และอยากได้ความผูกพัน | episodic duo + relationship registry + callback (Slowly Growing) |
| เรื่องต้องการ stakes สะสม (ตาย/บาดเจ็บ/รู้ความลับ) | serial + state tracking เต็ม (zombie) |
| ต้องการเล่าตัวละครเดียวหลายเวอร์ชัน (ฤดู, what-if, โฆษณา) | ประกาศ multiplicity tier [Jenkins2011] |
| งานลูกค้า หลายทีม หลายช่องทาง | canon owner คนเดียว + tiers + approval "on-brand vs canon" [Lussier2015] |

### 11.2 ใส่ cliffhanger ไหม
| เงื่อนไข | ตัดสิน |
|---|---|
| ตอนถัดไปผลิตเสร็จ/กำหนดแน่นอน | ใส่ได้ (อยากรู้ต่อ ↑) [Schibler2023] |
| ไม่แน่ใจว่าจะทำตอนต่อ | ใช้ mini-closure + hint เบา ๆ แทน [Allen1985][Wirz2022] |
| ฟอร์แมต feed (คนเจอตอนเดี่ยว) | ตอนต้องให้รางวัลในตัวก่อน; cliffhanger เป็นโบนัส |

### 11.3 เจอ continuity error ที่ออกไปแล้ว
| ระดับ (§2.3) | ใกล้จุดสนใจ/มีคนทักแล้ว? | การตัดสิน |
|---|---|---|
| L1 ไกลจุดสนใจ | ไม่ | **ignore** + log ใน `discrepancies` |
| L1 ใกล้หน้า/มือ/สินค้า/ข้อความ | ใช่ | **fix_reupload** (ถ้าแพลตฟอร์มอนุญาต) หรือปักหมุดแก้ |
| L2 ภายในตอน (ตรรกะ) | ใช่ | fix ถ้าทำได้; ไม่ได้ → **explain_in_story** ในตอนถัดไป |
| L3 ข้ามตอน (state/กฎ) | — | **retcon** เฉพาะเมื่อมีคำอธิบายในโลกที่ทำให้เรื่องดีขึ้น; ไม่งั้น explain/ignore |
| L3 สะสมจนเรื่องพัง | — | **soft reboot** (ซีซันใหม่ "one year later") > hard reboot [Proctor2012] |
| L4 นิยามตัวละครสองชุด | — | ประชุมตัดสิน canon + alias; อย่าแก้งานเก่าทั้งหมด |
| ข้อเท็จจริงวิทยาศาสตร์/สุขภาพผิด | — | **fix เสมอ** (ไม่ใช่ retcon) + แจ้งในคอมเมนต์ |

### 11.4 เพิ่มสิ่งใหม่เข้าโลกไหม
1. ของเดิมรับบทได้ไหม? → ใช่ = ใช้ของเดิม [SandersonThirdLaw]
2. สิ่งใหม่มีข้อจำกัด/ต้นทุนไหม? → ไม่มี = ยังไม่พร้อม [Sanderson2011]
3. จะใช้แก้ปมไหม? → ใช่ = ต้องปูก่อนอย่างน้อย 1 ตอน [Sanderson2007]
4. ชนกับชื่อ/กฎในซีรีส์อื่นไหม? → เช็ก namespace (M38)
5. อิงวัฒนธรรมจริงไหม? → ใส่ `source` หรือป้าย "invented"

### 11.5 เครื่องมือ AI สำหรับตัวละครซ้ำ
| สถานการณ์ | ตัวเลือก |
|---|---|
| ภาพหลายภาพในเรื่องเดียว ทำพร้อมกัน | batch/shared-attention (StoryDiffusion/ConsiStory-type) [Zhou2024StoryDiffusion][Tewel2024] |
| ข้ามตอน ข้ามวัน | master reference + identity markers เป็นคำ + QC ตา (M38) |
| ต้องตรงบทมาก (ท่าทางเฉพาะ) | ลดน้ำหนัก reference / ตรวจ copy-paste [Zhuang2025ViStoryBench] |
| ตัวละครไม่มีหน้า (Mint/Tao) | identity = silhouette + เสื้อผ้า + ฝั่งจอ → เขียนเป็นคำทุก prompt (M38) |

---

## 12. แบบฝึกหัด (Exercises)

1. **(ง่าย) ตรวจ 5 มิติ** — เอา carousel 1 ชุด (เช่น #160 พลุ) เขียนตาราง 5 สไลด์ × 5 มิติ (time/space/protagonist/cause/goal) ระบุว่าแต่ละสไลด์เปลี่ยนมิติไหน.
   *คำตอบที่ดี:* ระบุได้ครบ, ชี้สไลด์ที่เปลี่ยน >1 มิติ และบอกว่าจำเป็นหรือไม่ [ZacksSpeerReynolds2009]
2. **(ง่าย) ช่องว่างดี/ร้าย** — เลือก 2 จุดที่ตัด action ระหว่างสไลด์ ตัดสินว่า "อนุมานได้สูง" ไหม ถ้าไม่ เสนอภาพ/ข้อความเสริม.
   *ดี:* ใช้เกณฑ์ bridging inference และไม่เติมภาพเกินจำเป็น [Magliano2016]
3. **(กลาง) Canon tiers** — จัด 20 ชิ้นงานของซีรีส์หนึ่งเข้า canon / planned / archive / multiplicity / approved-not-canon พร้อมเหตุผล.
   *ดี:* มีเกณฑ์ชัด ใช้ได้ซ้ำ; ระบุ undetermined facts อย่างน้อย 3 ข้อ [StarWars2014Legends][Lussier2015]
4. **(กลาง) Relationship registry** — จาก 20 เรื่องล่าสุดของ story carousels ดึงประวัติร่วม (สถานที่, prop, เหตุการณ์) แล้วออกแบบ callback 3 อันสำหรับเรื่องใหม่.
   *ดี:* callback อยู่ในบริบทใหม่และเปลี่ยนความหมาย ไม่ซ้ำตรง ๆ; มีช่วงพัก [Winet2025][Allen1985]
5. **(กลาง) กฎผีร้านแว่นตีสอง** — เขียน `rules[]` 4 ข้อ แต่ละข้อมี cost_or_limit, established_in, may_resolve_plot, source (ความเชื่อจริงหรือ invented).
   *ดี:* อย่างน้อย 1 ข้ออิง phi ruan/chao phi ถูกต้อง; ไม่มีกฎที่แก้ปมโดยไม่ปู [AnumanRajadhon1954][Sanderson2007]
6. **(ยาก) Error triage** — ให้รายการ error 8 ข้อ (ผสม L1–L4) ใช้ §11.3 ตัดสิน และเขียน `discrepancies[]`.
   *ดี:* แยกตามระดับและความใกล้จุดสนใจถูก; ไม่ retcon ข้อเท็จจริงสุขภาพ
7. **(ยาก) Season 2 plan** — วางแผน zombie S2: continuation vs soft reboot vs multiplicity เขียนข้อดี/ต้นทุน และสิ่งที่ต้องอัปเดตใน continuity.
   *ดี:* อ้าง DC Crisis/reboot อย่างระมัดระวัง [Proctor2012]; ระบุ open threads ที่ต้องจ่ายหรือประกาศปิด
8. **(ยาก) AI QC** — สร้าง 5 ภาพของเรื่องเดียว ให้คะแนน identity / prompt adherence / character count / copy-paste ต่อภาพ แล้วอธิบาย trade-off.
   *ดี:* เห็นว่าภาพ "เหมือนที่สุด" อาจทำตามบทแย่ที่สุด [Zhuang2025ViStoryBench]

---

## 13. Checklist (ก่อนส่งงาน — yes/no)

1. [ ] ชิ้นนี้มี series id และอยู่ใน canon tier ที่ประกาศแล้ว (canon/planned/archive/multiplicity/approved-not-canon)?
2. [ ] ตัวละครทุกตัวใช้ ID แบบมี namespace และตรงกับ aliases ในทุกช่องทาง?
3. [ ] identity markers ครบในทุกภาพ และ **จำนวนตัวละครถูกต้อง** (ไม่ขาด ไม่เกิน)?
4. [ ] ภาพทำสิ่งที่บทสั่ง (ไม่ใช่แค่หน้าตาเหมือน reference)?
5. [ ] ฝั่งจอของตัวละคร/ทิศ action คงที่ (หรือเปลี่ยนอย่างตั้งใจและมีเหตุผล)?
6. [ ] แต่ละสไลด์/ช็อตเปลี่ยนมิติหลักไม่เกิน 1–2 มิติ?
7. [ ] ช่องว่างระหว่างภาพทุกจุดอนุมานได้สูง?
8. [ ] ข้อมูลสำคัญ (prop/clue/ข้อความหลัก) อยู่ ณ รอยต่อ และถูกย้ำหลังเปลี่ยนฉากถ้าจำเป็น?
9. [ ] การย้อนเวลา (flashback) ถูกติดป้ายชัด?
10. [ ] ตัวละครไม่รู้สิ่งที่ยังไม่ควรรู้ (knowledge state)?
11. [ ] ไม่มีกฎโลกใหม่ที่ใช้แก้ปมโดยไม่ปูมาก่อน; ทุกกฎมีข้อจำกัด/ต้นทุน?
12. [ ] ไม่ไปตัดสิน undetermined fact โดยไม่ตั้งใจ?
13. [ ] ตอนนี้จบในตัว (mini-closure) แม้คนดูไม่เคยดูตอนก่อน?
14. [ ] tease/cliffhanger ทุกอันถูกบันทึกใน open_threads พร้อมแผนจ่าย?
15. [ ] running gag/callback อยู่ในบริบทใหม่ และไม่ถี่เกินช่วงพักที่ตั้งไว้?
16. [ ] องค์ประกอบวัฒนธรรมจริง (ผี ศาสนา สถานที่ ยุค) มีแหล่งอ้างอิงหรือป้าย "invented"?
17. [ ] ข้อเท็จจริงวิทยาศาสตร์/สุขภาพไม่ขัดกับตอนก่อน?
18. [ ] อัปเดต `continuity.json` (episodes, state_changes, callbacks, discrepancies) หลังเผยแพร่แล้ว?

---

## 14. Evaluation Rubric

**วิธีให้คะแนน:** 6 เกณฑ์ × ระดับ 1–4. รวมเต็ม 24. ผ่าน ≥ 17 และไม่มีเกณฑ์ใดได้ 1. น้ำหนัก: ซีรีส์ serial ให้ C3 ×1.5; งานสินค้าให้ C1 ×1.5 (รายงานคะแนนดิบด้วย).

| เกณฑ์ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **C1 Identity & perceptual continuity** (L1) | ตัวละคร/สินค้าเพี้ยนชัดหรือจำนวนคนผิด | markers ครบแต่มีเพี้ยนใกล้หน้า/มือ | ตรงทุกจุดสนใจ เพี้ยนเฉพาะฉากหลังไกล | ตรงทุกจุดสนใจ + ฝั่งจอ/ทิศคงที่ + ไม่มี copy-paste ที่ฝืนบท |
| **C2 Situational coherence** (L2) | คนดูงงเวลา/ที่/ใคร/ทำไม | มีช่องว่างที่อนุมานไม่ได้ 1 จุด | ทุกช่องว่างอนุมานได้; เปลี่ยนมิติเยอะในบางจุด | 1 รอยต่อ = 1 การเปลี่ยน; ข้อมูลสำคัญอยู่ที่รอยต่อ |
| **C3 Serial continuity** (L3) | ขัดกับ state/กฎ/ความรู้ตัวละครที่เคยออก | ขัดเล็กน้อยที่แฟนจะทัก | ไม่ขัด แต่ไม่ใช้ประวัติให้เกิดความหมาย | ไม่ขัด + ใช้ประวัติ/callback เพิ่มความหมาย |
| **C4 World rules** | กฎใหม่โผล่มาแก้ปม | กฎมีแต่ไม่มีต้นทุน/ไม่ได้ปู | กฎชัดมีต้นทุน ปูก่อนใช้ | กฎชัด + ขยายลึกจากของเดิม + อิงแหล่งวัฒนธรรมถูกต้อง |
| **C5 Episode design** | ไม่จบในตัว/ต้องดูตอนก่อน | จบแต่ tease ไม่มีแผนจ่าย | mini-closure + ปมใหญ่เบา ๆ | mini-closure + ปมใหญ่ + redundancy ที่ไม่น่าเบื่อสำหรับคนดูประจำ |
| **C6 Canon governance** (L4) | ไม่มี series id/ID ชน/นิยามตัวละครสองชุด | มี id แต่ไม่ระบุ tier | tier + aliases + registry อัปเดต | + undetermined list + decision log ของ discrepancy |

**Critical failures (ตกทันทีไม่ว่าคะแนนรวม):**
- hero prop (แว่นสินค้า) ไม่ตรงรุ่น/สีในช็อตที่เป็นจุดสนใจ
- ข้อเท็จจริงสุขภาพตาขัดกับตอนก่อนหรือผิดจริง
- ตัวละครที่ตายแล้ว/ออกไปแล้วกลับมาโดยไม่มีกฎ
- ใช้ความเชื่อทางศาสนา/ผีของจริงแบบดูหมิ่นหรือผิดความหมาย
- จำนวนตัวละครในภาพผิดจากบท (เช่น Mint & Tao เหลือคนเดียว)

---

## 15. แหล่งอ้างอิง (References)

Format: **Key** — Author(s) (year). Title. Venue. URL · access_status · tier

1. **ZwaanLangstonGraesser1995** — Zwaan, R. A., Langston, M. C., & Graesser, A. C. (1995). The construction of situation models in narrative comprehension: An event-indexing model. *Psychological Science*, 6(5), 292–297. https://doi.org/10.1111/j.1467-9280.1995.tb00513.x · abstract · A
2. **ZwaanRadvansky1998** — Zwaan, R. A., & Radvansky, G. A. (1998). Situation models in language comprehension and memory. *Psychological Bulletin*. https://cs.uky.edu/~sgware/reading/papers/zwaan1998situation.pdf · full_text · A (reused from M16/M38)
3. **ZacksEtAl2007** — Zacks, J. M., Speer, N. K., Swallow, K. M., Braver, T. S., & Reynolds, J. R. (2007). Event perception: A mind-brain perspective. *Psychological Bulletin*, 133(2), 273–293. https://doi.org/10.1037/0033-2909.133.2.273 · abstract · A
4. **KurbyZacks2008** — Kurby, C. A., & Zacks, J. M. (2008). Segmentation in the perception and memory of events. *Trends in Cognitive Sciences*. https://doi.org/10.1016/j.tics.2007.11.004 · search_summary · A
5. **ZacksSpeerReynolds2009** — Zacks, J. M., Speer, N. K., & Reynolds, J. R. (2009). Segmentation in reading and film comprehension. *Journal of Experimental Psychology: General*, 138(2), 307–327. https://doi.org/10.1037/a0015305 · abstract · A
6. **SwallowZacksAbrams2009** — Swallow, K. M., Zacks, J. M., & Abrams, R. A. (2009). Event boundaries in perception affect memory encoding and updating. *Journal of Experimental Psychology: General*. https://doi.org/10.1037/a0015631 · abstract · A
7. **MaglianoZacks2011** — Magliano, J. P., & Zacks, J. M. (2011). The impact of continuity editing in narrative film on event segmentation. *Cognitive Science*. https://doi.org/10.1111/j.1551-6709.2011.01202.x · abstract · A (reused, upgraded)
8. **RadvanskyZacks2017** — Radvansky, G. A., & Zacks, J. M. (2017). Event boundaries in memory and cognition. *Current Opinion in Behavioral Sciences*. https://doi.org/10.1016/j.cobeha.2017.08.006 · abstract · A
9. **Loschky2019SPECT** — Loschky, L. C., Larson, A. M., Smith, T. J., & Magliano, J. P. (2019 online). The Scene Perception & Event Comprehension Theory (SPECT) applied to visual narratives. *Topics in Cognitive Science*. https://doi.org/10.1111/tops.12455 · abstract · A
10. **Magliano2016** — Magliano, J. P., Larson, A. M., Higgs, K., & Loschky, L. C. (2016). The relative roles of visuospatial and linguistic working memory systems in generating inferences during visual narrative comprehension. *Memory & Cognition*, 44, 207–219. https://doi.org/10.3758/s13421-015-0558-7 · full_text · A
11. **Hutson2018** — Hutson, J. P., Magliano, J. P., & Loschky, L. C. (2018). Understanding moment-to-moment processing of visual narratives. *Cognitive Science*. https://doi.org/10.1111/cogs.12699 · abstract · A
12. **Cohn2020Universal** — Cohn, N. (2020). Visual narrative comprehension: Universal or not? *Psychonomic Bulletin & Review*, 27, 266–285. https://doi.org/10.3758/s13423-019-01670-1 · full_text · A
13. **SmithHenderson2008** — Smith, T. J., & Henderson, J. M. (2008). Edit blindness. *Journal of Eye Movement Research*. https://bop.unibe.ch/JEMR/article/view/2264 · full_text · A (reused)
14. **Kachkovski2019** — Kachkovski, G. V., Vasilyev, D., Kuk, M., Kingstone, A., & Street, C. N. H. (2019). Exploring the effects of violating the 180-degree rule on film viewing preferences. *Communication Research*. https://doi.org/10.1177/0093650219838959 (preprint read: https://doi.org/10.31219/osf.io/vqn5a) · full_text · A
15. **Upadhyayula2023** — Upadhyayula, A., & Henderson, J. M. (2023). Spatiotemporal jump detection during continuous film viewing. *Journal of Vision*, 23(2), 13. https://doi.org/10.1167/jov.23.2.13 · abstract · A
16. **Wirz2022** — Wirz, D. S., Ort, A., Rasch, B., & Fahr, A. (2022 manuscript). The role of cliffhangers in serial entertainment: An experiment on cliffhangers' effects on enjoyment, arousal, and intention to continue watching. (Psychology of Popular Media, per search). https://sonar.ch/documents/319990/files/2022_Wirz_Role.pdf · full_text · A
17. **Schibler2023** — Schibler, K., Hahn, L., & Green, M. C. (2023). Investigating responses to narrative cliffhangers using affective disposition theory. *Media Psychology*. https://doi.org/10.1080/15213269.2023.2219456 · abstract · A
18. **Tukachinsky2020** — Tukachinsky, R., Walter, N., & Saucier, C. J. (2020). Antecedents and effects of parasocial relationships: A meta-analysis. *Journal of Communication*, 70(6), 868–894. https://doi.org/10.1093/joc/jqaa034 · search_summary · S
19. **HartmannGoldhoorn2011** — Hartmann, T., & Goldhoorn, C. (2011). Horton and Wohl revisited: Exploring viewers' experience of parasocial interaction. *Journal of Communication*. https://doi.org/10.1111/j.1460-2466.2011.01595.x · abstract · A
20. **Allen1985** — Allen, R. C. (1985). *Speaking of Soap Operas*. University of North Carolina Press (ch. "A Reader-Oriented Poetics of the Soap Opera", pp. 69–75 read). https://worldradiohistory.com/Bookshelf/Radio-Programming/Speaking-of-Soap-Operas-Allen-1985.pdf · full_text · A
21. **Mittell2006** — Mittell, J. (2006). Narrative complexity in contemporary American television. *The Velvet Light Trap*, 58, 29–40. https://muse.jhu.edu/article/204769 · bibliographic · A
22. **Mittell2015** — Mittell, J. (2015). *Complex TV: The Poetics of Contemporary Television Storytelling*. NYU Press (Scalar companion: Orienting Paratexts; Comprehension). https://scalar.usc.edu/works/complex-television/comprehension · abstract · A (reused)
23. **Macdonald2018** — Macdonald, I. W. (2018). Tablets of stone or DNA? TV series bibles. https://eprints.whiterose.ac.uk/id/eprint/125213/ · full_text · A (reused)
24. **Proctor2012** — Proctor, W. (2012). Regeneration & rebirth: Anatomy of the franchise reboot. *Scope: An Online Journal of Film and Television Studies*, 22. https://www.nottingham.ac.uk/scope/documents/2012/february-2012/proctor.pdf · full_text · A
25. **Friedenthal_RetconGame** — Friedenthal, A. J. (year not confirmed). *Retcon Game: Retroactive Continuity and the Hyperlinking of America*. University Press of Mississippi. https://muse.jhu.edu/book/60613 · search_summary · A (unverified)
26. **Wolf2013Interview** — Jenkins, H. (interviewer) & Wolf, M. J. P. (2013). Building imaginary worlds: An interview with Mark J. P. Wolf (Part Three). *Confessions of an Aca-Fan*. http://henryjenkins.org/blog/2013/09/building-imaginary-worlds-an-interview-with-mark-j-p-wolf-part-three.html · full_text · B
27. **Flieger_TolkienEstate** — Flieger, V. (n.d.). On Fairy Stories (commentary). The Tolkien Estate. https://www.tolkienestate.com/?p=35367 · full_text · B
28. **Jenkins2011** — Jenkins, H. (2011, July 31). Transmedia 202: Further reflections. http://henryjenkins.org/blog/2011/08/defining_transmedia_further_re.html · full_text · B
29. **StarWars2014Legends** — StarWars.com (2014, April 25). The legendary Star Wars Expanded Universe turns a new page. https://www.starwars.com/news/the-legendary-star-wars-expanded-universe-turns-a-new-page · full_text · C
30. **Lussier2015** — Lussier, G. (2015, April 20). How the Lucasfilm Story Group figures out the Star Wars canon. *SlashFilm*. https://www.slashfilm.com/537322/lucasfilm-story-group-star-wars-canon/ · full_text · C
31. **Chee2012** — Chee, L. (2012). What is the Holocron? StarWars.com. https://www.starwars.com/news/what-is-the-holocron · full_text · C (reused)
32. **ITVCorrieScriptEditor** — ITV / ProductionBase (n.d.). Assistant Script Editor – Coronation Street (job listing). https://www.productionbase.co.uk/film-tv-jobs/assistant-script-editor-manchester-11.21.0220866 · search_summary · C
33. **Winet2025** — Duke Fuqua Insights (2025, Jan 15). How marketers can harness the power of "callbacks" (research by Y. Winet et al., unpublished). https://www.fuqua.duke.edu/duke-fuqua-insights/how-marketers-can-harness-power-of-callbacks · publisher_page · C
34. **Sanderson2007** — Sanderson, B. (2007). Sanderson's First Law. https://www.brandonsanderson.com/sandersons-first-law/ · full_text · D (reused)
35. **Sanderson2011** — Sanderson, B. (2011). Sanderson's Second Law. https://www.brandonsanderson.com/blogs/blog/sandersons-second-law · full_text · D
36. **SandersonThirdLaw** — Sanderson, B. (n.d.). Sanderson's Third Law of Magic. https://www.brandonsanderson.com/blogs/blog/sandersons-third-law-of-magic · full_text · D
37. **Zhou2024StoryDiffusion** — Zhou, Y., Zhou, D., Cheng, M.-M., Feng, J., & Hou, Q. (2024). StoryDiffusion: Consistent self-attention for long-range image and video generation. NeurIPS 2024. https://arxiv.org/abs/2405.01434 · abstract · A
38. **Tewel2024** — Tewel, Y., Kaduri, O., Gal, R., et al. (2024). Training-free consistent text-to-image generation (ConsiStory). https://arxiv.org/abs/2402.03286 · abstract · A (reused)
39. **Zhuang2025ViStoryBench** — Zhuang, C., Huang, A., Hu, Y., Wu, J., Cheng, W., Liao, J., et al. (2025). ViStoryBench: Comprehensive benchmark suite for story visualization. arXiv:2505.24862 (v4). https://arxiv.org/html/2505.24862v4 · full_text (main body) · A
40. **AnumanRajadhon1954** — Anuman Rajadhon, Phya (1954). The "Phi" (ed. M. Coughlin). *Journal of the Siam Society*, 41(2). https://thesiamsociety.org/wp-content/uploads/1954/03/JSS_041_2c_PhyaAnumanRajathon_ThePhi.pdf · full_text · B
41. **Angkasuparakul2025** — Angkasuparakul, P. (2025). Western-styled buildings in Bangkok: Shophouses and commercial buildings in Khlong Khu Mueang Doem canal area. *Damrong Journal*, 24(2). https://so01.tci-thaijo.org/index.php/damrong/article/view/282766 · abstract · A

**อ่านไม่ได้ / ยังไม่ยืนยัน:** Mittell 2006 ฉบับเต็ม (MUSE verification), SPECT ฉบับเต็ม (Wiley 403), PMC ทุกชิ้น (bot check), Tolkien ฉบับเต็ม (ลิขสิทธิ์ — ใช้ commentary ของ Flieger แทน), Wolf 2012 บท Retcon/Levels of Canonicity (มีแค่สารบัญ — ไม่ได้อ้าง), Friedenthal ปีพิมพ์, HBR Catmull/Pixar (paywall — ไม่ได้ใช้), งานวิชาการเรื่องโครงสร้างละครไทย (พบแค่วิทยานิพนธ์ใน search snippet — ไม่ได้ใส่), งาน webcomic canon management (ไม่พบแหล่งที่มีเอกสาร)
