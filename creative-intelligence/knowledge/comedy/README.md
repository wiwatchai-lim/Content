# M31 — Humor & Comedy (อารมณ์ขันและการเล่าเรื่องตลก)

โมดูลนี้อธิบายว่า "ทำไมคนถึงขำ" และ "เมื่อไหร่มุกจะพัง" แบบใช้ได้กับทุกงาน ทุกลูกค้า ทุกหัวข้อ (ไม่ใช่แค่แว่นตา)
ส่วนตัวอย่างประยุกต์ใช้กับงานของสตูดิโอ: คารูเซล Mint & Tao, คลิปเรื่องเล่าไทยที่ใช้ TTS, โพสต์และคลิปสินค้า

ไฟล์ในโฟลเดอร์
- `README.md` — ไฟล์นี้ (ทฤษฎี + หลักฐาน + ข้อควรระวัง)
- `COMEDY_PLAYBOOK.md` — โครงสร้างมุกพร้อมตัวอย่าง, วิธีทดสอบมุก, เส้นที่ห้ามข้าม
- `sources.json` — 32 แหล่ง (key ที่อ้างในไฟล์นี้) — อัปเกรด 2026-11-25: อ่านจริง (full text/abstract/publisher page) 18/32 = 56% (ก่อนหน้า 10/30 = 33%)

ป้ายกำกับที่ใช้: **EVIDENCE** = มีงานวิจัยรองรับ · **CRAFT** = ความรู้จากคนทำงานจริง (tier D) ไม่ใช่ข้อเท็จจริงทางวิทยาศาสตร์ · **DERIVED** = เราอนุมานเองจากหลักฐาน ยังไม่มีใครทดสอบตรงๆ

ไม่ซ้ำกับ: M02 `knowledge/emotions/` (ทฤษฎีอารมณ์, emotional contagion, Duchenne smile) · คลังเสียง `joy.amusement`, `stance.playful_teasing`, `stance.sarcasm`, `mixed.nervous_laughter`, `joy.mischief` ในคลังอารมณ์ทั้งสอง — ที่นี่พูดถึง *โครงสร้างมุก* ไม่ใช่วิธีเล่นเสียง

---

## 1. Scope & status

**ครอบคลุม**
- ทฤษฎีหลัก: incongruity(-resolution), benign violation (BVT) + คำวิจารณ์, superiority, relief, play
- humor styles (HSQ — Martin et al. 2003)
- จังหวะ/timing: งานวัด prosody ของ punchline (Attardo, Pickering) เทียบกับงาน stand-up (Ma et al. 2026)
- humour กับความจำ, puns/wordplay (Kao et al.), คำผวนและอารมณ์ขันไทย
- humour ในโฆษณา (Eisend meta-analysis 2009; Weinberger & Gulas 1992) และใน health communication (Fraustino & Ma 2015)
- ความต่างทางวัฒนธรรม (Jiang et al. 2019; Hatzithomas et al. 2011) และงานวิจัยไทยที่หาได้
- โครงสร้าง sitcom/sketch และ physical comedy (ส่วนใหญ่เป็น CRAFT)

**ยังไม่ครอบคลุม / อ่อน**
- อ่าน full text งาน BVT แล้ว (McGraw & Warren 2010, Warren & McGraw 2016, McGraw et al. 2012, 2014) + review Warren, Barsky & McGraw 2021 — แต่ทั้งหมดเขียนโดยกลุ่มผู้เสนอทฤษฎี; คำวิจารณ์ (KantNorman2019, EarleywineMankoff) ยังเข้าถึงไม่ได้ (captcha / SSO); Eisend 2009/2011 ยังไม่ได้อ่านฉบับเต็ม
- งานวิจัยอารมณ์ขันไทยที่เจอส่วนใหญ่เป็นงานวิเคราะห์ภาษาของสื่อ (film/sitcom/talk show) ไม่ใช่การทดลองว่าคนไทยขำอะไร
- ไม่มีงานวิจัยที่ทดสอบ "มุกของแบรนด์ร้านค้าไทยบนโซเชียล" โดยตรง
- โครงสร้าง sitcom, rule of three, callback = CRAFT เกือบทั้งหมด
- ไม่ได้ทำ humour กับเด็ก/พัฒนาการ, humour กับ AI-generated joke quality

---

## 2. Core concepts

### 2.1 Incongruity → Resolution (ความไม่เข้ากัน แล้วคลี่ได้)
- **คืออะไร**: มุกเกิดเมื่อตอนจบ "ไม่เข้ากับ" สิ่งที่ปูไว้ แล้วผู้ฟังหากฎที่ทำให้มัน "เข้ากันได้" (Suls 1972: two-stage model) ปัจจุบันเป็นทฤษฎีกระแสหลักทั้งในปรัชญาและจิตวิทยา (Morreall2024SEP)
- **กลไก**: สมองทำนายต่อจาก setup → punchline ละเมิดคำทำนาย → ผู้ฟังย้อนตีความ setup ใหม่ (reinterpretation) ความรู้สึก "อ๋อ" คือรางวัล
- **ใช้งาน**: ทุกมุกต้องมี "กฎที่หาเจอได้ในเวลาที่สื่อให้" — คารูเซลให้เวลาคนอ่านเอง (self-paced) ใช้มุกที่ต้องคิดนิดได้; คลิป TTS ไหลตามเวลา (system-paced) ต้องคลี่ง่ายกว่า
- **ข้อจำกัด**: incongruity อย่างเดียว *ไม่พอ* — ความไม่คาดคิดอาจทำให้กลัว งง หรือรังเกียจแทน (Morreall2024SEP); review ปี 2021 สรุปว่า **surprise ไม่ใช่ตัวแยกสิ่งที่ขำออกจากสิ่งที่ไม่ขำ** — punchline ที่เดาได้ถูกให้คะแนนขำกว่าบางกรณี, เห็นมุกบางส่วนมาก่อนกลับขำขึ้น, callback/running gag ยังได้ผล; ตัวที่แยกได้คือ simultaneity (สองการตีความพร้อมกัน) + violation + benign (WarrenBarskyMcGraw2021); resolution ไม่จำเป็นต้องสมบูรณ์ (absurd humour) แต่เสี่ยงกว่ากับผู้ชมกว้าง (Ritchie2009)
- **Tier/keys**: A/B — Suls1972 (bibliographic), Morreall2024SEP (full text), Ritchie2009 · **ความมั่นใจ**: high (ว่าเป็นองค์ประกอบสำคัญ), medium (ว่าพอเพียง)

### 2.2 Benign Violation Theory (การละเมิดที่ไม่อันตราย)
- **คืออะไร**: ขำเมื่อมีบางอย่าง "ผิด" (คุกคามความเป็นอยู่ ตัวตน หรือบรรทัดฐาน) แต่ในขณะเดียวกัน "ไม่เป็นไร" (WarrenMcGraw2016) ตัวทำให้ benign มี 3 ทาง: มีบรรทัดฐานอื่นที่ทำให้มันโอเค, คนดูไม่ได้ยึดบรรทัดฐานนั้นมาก, และระยะห่างทางจิตใจ (McGrawWarren2010)
- **ระยะห่าง**: โศกนาฏกรรมขำขึ้นเมื่อไกล (เวลา/สังคม/สมมติ/พื้นที่) แต่เรื่องพลาดเล็กๆ ขำขึ้นเมื่อใกล้ — 99% บอกว่าโดนรถชนจะขำกว่าถ้าเกิด 5 ปีก่อน แต่แค่ 18% บอกแบบนั้นกับการเตะขอบโต๊ะ (McGrawEtAl2012); มุกเรื่องพายุ Sandy: ขำน้อยสุดวันที่ 15 ('too soon'), ขำสุดวันที่ 36, แล้วตกลงอีกถึงวันที่ 99 → มี 'sweet spot' ไม่ใช่ยิ่งนานยิ่งขำ (McGrawWilliamsWarren2014)
- **ใช้งาน**: ช่องเรื่องราวแบบ wholesome เหมาะกับ "mishap เล็กๆ ใกล้ตัว" (หาแว่นทั้งที่อยู่บนหัว, เทนมผิดแก้ว) — violation เล็ก ใกล้ตัว benign ชัด; อย่าเล่นกับความทุกข์จริงของลูกค้า (ตาบอด โรคตา) เพราะใกล้และไม่ benign
- **คำวิจารณ์**: (1) BVT ถูกพัฒนาและทดสอบส่วนใหญ่โดยกลุ่มผู้เสนอเอง; (2) มุกที่ violation ไม่ benign ก็ยังมีคนขำได้ และ BVT ไม่อธิบายว่าทำไมคนในสถานการณ์เดียวกันขำไม่เท่ากัน — ต้องดูอำนาจและบริบทสังคม (KantNorman2019, search summary); (3) คำถามว่า "จำเป็นหรือไม่" ยังเปิดอยู่ (EarleywineMankoff)
- **Tier/keys**: A — McGrawWarren2010, WarrenMcGraw2016, McGrawEtAl2012, McGrawWilliamsWarren2014, WarrenBarskyMcGraw2021 (full text; ตัวอย่างการทดลองเล็ก N = 36–80 ต่อ study, นักศึกษา/MTurk สหรัฐ); critique KantNorman2019, EarleywineMankoff (search summary) · **ความมั่นใจ**: medium — ใช้เป็น *checklist* ไม่ใช่กฎธรรมชาติ

### 2.3 Superiority (ขำเพราะรู้สึกเหนือกว่า)
- **คืออะไร**: Plato, Aristotle, Hobbes — หัวเราะเมื่อรู้สึกว่าตัวเองชนะ/ดีกว่า (Morreall2024SEP)
- **ข้อจำกัด**: ไม่จำเป็นและไม่พอเพียง (Hutcheson) — เราขำคำผวนหรือความพลาดของตัวเองโดยไม่ได้รู้สึกเหนือใคร
- **ใช้งาน**: เป็น *ตัวขับที่เสี่ยง* — มุกเหยียด/เยาะ ใช้ได้กับ "ตัวเองในอดีต" หรือ "สถานการณ์" แต่ไม่ใช่ "ลูกค้า"; งานวิเคราะห์ sitcom ไทยพบว่าความตลกมักผูกกับ aggression/superiority ของผู้พูด (Wangsomchok_ThaiSitcom — sitcom ไทย 5 เรื่อง, speech act ตลก 6 แบบ: โอ้อวด ดูถูก ขู่ โทษ แซว เสียดสี) → นั่นคือค่าเริ่มต้นของตลาด ที่แบรนด์ wholesome ควรเลี่ยงอย่างตั้งใจ
- **Tier/keys**: B — Morreall2024SEP; B — Wangsomchok_ThaiSitcom · **ความมั่นใจ**: medium

### 2.4 Relief (ขำเพื่อปลดความตึง)
- **คืออะไร**: Spencer, Freud — หัวเราะคือการปล่อยพลังประสาทที่สะสม
- **สถานะ**: โมเดล "แรงดันประสาท" ล้าสมัย นักวิชาการปัจจุบันแทบไม่มีใครยึด (Morreall2024SEP) แต่ *รูปแบบ* tension → release ยังเป็นเครื่องมือ craft ที่ใช้ได้ (ดู M32 `emotional-architecture/`)
- **ใช้งาน**: มุกหลังฉากตึง (comic relief) — ใช้ได้ในเชิง CRAFT; อย่าอ้างว่า "หัวเราะปล่อยความเครียดที่อัดไว้" เป็นวิทยาศาสตร์
- **Tier/keys**: B — Morreall2024SEP · **ความมั่นใจ**: low (กลไก), medium (ในฐานะ craft pattern)

### 2.5 Play frame & laughter types (กรอบการเล่น)
- **คืออะไร**: humour เป็นการเล่น; เสียงหัวเราะวิวัฒน์มาจากสัญญาณเล่นของลิง (relaxed open-mouth display) (Morreall2024SEP) ; หัวเราะมี 2 แบบ: Duchenne (เกิดเอง จากสิ่งเร้า เป็นสื่อของ playful contagion) กับ non-Duchenne (ตั้งใจ ใช้เชิงสังคม รวมถึงเยาะ/เขิน) (GervaisWilson2005)
- **กลไก**: สัญญาณ "นี่เล่นนะ" ทำให้ violation กลายเป็น benign — สอดคล้องกับงาน conversation ที่พบว่ารอยยิ้มมัก *ตั้งกรอบตลกก่อน* มุกจะมา (AttardoEtAl2011_2013)
- **ใช้งาน**: ภาพ Mint & Tao ไม่มีหน้า → ส่ง play signal ผ่านท่าทาง, ลายเส้นนุ่ม, จังหวะ; ในเสียง TTS ใช้ smile voice ตั้งแต่ต้นประโยค ไม่ใช่แค่ตอนมุก
- **Tier/keys**: A — GervaisWilson2005, AttardoEtAl2011_2013 (unverified); B — Morreall2024SEP · **ความมั่นใจ**: medium

### 2.6 Humor styles (HSQ)
- **คืออะไร**: 4 สไตล์ — affiliative (ขำเพื่อเชื่อมคน), self-enhancing (มองโลกขำๆ เพื่อรับมือ), aggressive (เยาะ/แซะ), self-defeating (ด่าตัวเองให้คนอื่นขำ) (MartinEtAl2003)
- **หลักฐาน**: สองแบบแรกสัมพันธ์กับสุขภาวะ สองแบบหลังสัมพันธ์กับ neuroticism/aggression; รูปแบบนี้พบทั้งตะวันตกและตะวันออก แต่ความแรงต่างกัน (JiangLiHou2019) — เป็นงานสหสัมพันธ์ ไม่ใช่เหตุผล
- **ใช้งาน**: ตัวละคร wholesome (Mint & Tao) = affiliative + self-enhancing เป็นหลัก; แซวกันได้แบบ "playful teasing" ที่อีกฝ่ายยิ้มด้วย (ดู playbook); self-defeating เป็น running gag ของตัวเอกไม่ได้ (ทำให้ตัวละครดูน่าสงสารแทนน่ารัก — DERIVED)
- **Tier/keys**: A — MartinEtAl2003, JiangLiHou2019 · **ความมั่นใจ**: medium-high (โครงสร้าง 4 สไตล์), medium (การแปลไปใช้ข้ามวัฒนธรรม)

### 2.7 Timing (จังหวะ) — ความเชื่อ vs หลักฐาน
- **ความเชื่อ**: "ตลกคือจังหวะ — หยุดก่อน punchline"
- **หลักฐานฝั่งเล่าเรื่อง/สนทนา**: วัดเสียงจริงพบว่า punchline *ไม่ดังกว่า*, มักต่ำลงและช้าลง, มีเสียงยิ้ม/หัวเราะ และ *ไม่มี pause สำคัญก่อน punchline* (PickeringEtAl2009); ในบทสนทนาไม่พบ pitch/volume/speed/pause ที่ต่างอย่างมีนัย และผล pitch ต่ำไม่ replicate (AttardoEtAl2011_2013)
- **หลักฐานฝั่ง stand-up**: 828 โชว์ stand-up จีน — ลักษณะเชิงเวลา (pause pattern, จังหวะ punchline) ทำนายเสียงตอบรับได้ดีกว่าความแปลกของเนื้อหา; เสนอ "dual prediction violation" = เนื้อหาเซอร์ไพรส์ + จังหวะแตก พร้อมกัน (MaEtAl2026, conference, search summary)
- **สรุป**: สองฝั่งไม่ได้ขัดกันตรงๆ — ในบทสนทนา/เล่าเรื่อง pause ไม่ใช่ตัวบอกมุก; ในการแสดงที่ "ตั้งจังหวะ" ไว้ (stand-up, คลิปตัดต่อ) การ *ทำลายจังหวะที่ตั้งไว้* อาจสำคัญ
- **ใช้งาน TTS**: punchline = ต่ำลงเล็กน้อย ช้าลงเล็กน้อย มี smile; ไม่ใส่ pause ยาวตามสูตร; ถ้าคลิปตั้ง rhythm ด้วยภาพตัด (beat) ให้ "ตัดผิดจังหวะ" หนึ่งครั้งตรงมุก (DERIVED จาก MaEtAl2026)
- **Tier/keys**: A — PickeringEtAl2009, AttardoEtAl2011_2013; B — MaEtAl2026 · **ความมั่นใจ**: medium (ขัดกันบางส่วน, genre ต่างกัน)

### 2.8 Humor and memory
- ประโยคตลกจำได้ดีกว่าประโยคธรรมดา (free/cued recall) (Schmidt1994) แต่ข้อได้เปรียบปรากฏใน "list ผสม" (ตลกปนธรรมดา) มากกว่า list ที่ตลกล้วน; กลไก (distinctiveness vs humour เอง) ยังถกเถียง
- **ใช้งาน (DERIVED)**: มุกหนึ่งจุดในคารูเซลที่เหลือจริงจัง = จุดที่คนจำ; ฟีดที่ตลกทุกโพสต์ทำให้ข้อได้เปรียบหาย; วาง *ข้อมูลสำคัญไว้ในมุก* ไม่ใช่ข้างๆ มุก
- **Tier/keys**: A — Schmidt1994 (search summary) · **ความมั่นใจ**: medium

### 2.9 Wordplay & puns (รวมคำผวนและมุกภาษาไทย)
- **กลไก pun**: ambiguity (สองความหมายถูกกระตุ้นพร้อมกัน) แยก pun จากประโยคธรรมดา; distinctiveness (แต่ละความหมายมีคำอื่นในประโยคหนุน) แยก pun เจ๋งจาก pun จืด (KaoLevyGoodman2016) — ทดสอบกับ homophone ภาษาอังกฤษ
- **ไทย**: ภาษาไทยมีคำพ้องเสียง/พ้องรูปมาก + วรรณยุกต์ → pun ทำได้หลากหลาย; งานวิเคราะห์ "พี่มาก..พระโขนง" (15 ฉากจาก 76 ฉากตลก) พบ analogy 25%, pun 18.75%, loanword 18.75% และ slang/การอธิบาย/ออกเสียงผิดที่ไม่อยู่ในหมวดของ Berger ก็เรียกเสียงหัวเราะได้; การสลับตำแหน่งคำถูกอ้างในส่วนทบทวนวรรณกรรมว่าเป็นสไตล์ยอดนิยม แต่ **ไม่พบคำผวนในฉากที่สุ่ม** (SenchantichaiKadsantier2019)
- **คำผวน**: เป็นทั้ง speech error และการเล่นคำตั้งใจ, ใช้เลี่ยงคำหยาบในภาษาสุภาพ, มี "ภาษาลู" เป็นภาษาลับ (Siriwatananawin2013); บทความวิชาการไทย (ไม่ใช่งานทดลอง) สรุปหน้าที่ของคำผวน 5 ข้อ: สร้างคำใหม่, เครื่องมือสื่อสาร, กลทางภาษา, เลี่ยงคำไม่สุภาพ, สร้างอารมณ์ขัน และชี้ว่าคำผวนจำนวนมากผวนกลับแล้วเป็นเรื่องเพศ — ผู้เขียนเองรู้สึกว่าใช้บ่อยในที่ทำงานแล้ว 'เกินงาม' (PhumathonDuangloy_Kampuan)
- **ใช้งาน**: pun ไทยที่ดี = ทั้งสองความหมายมีคำในประโยครองรับ (เช่น ภาพ/บริบทหนุนความหมาย A, คำพูดหนุนความหมาย B); **ทุกคำผวนต้องผวนกลับเช็กทั้งสองทาง** ก่อนใช้
- **Tier/keys**: A — KaoLevyGoodman2016 (435 ประโยค, full text), SenchantichaiKadsantier2019 (full text); B — PhumathonDuangloy_Kampuan (full text), Siriwatananawin2013 (search summary) · **ความมั่นใจ**: medium (pun theory), low-medium (ข้อสรุปเฉพาะไทย — ฐานงานวิจัยบาง)

### 2.10 Humor in advertising & persuasion
- **Meta-analysis** (369 correlations): humour เพิ่ม attention, positive affect, attitude ต่อโฆษณา, brand attitude และ purchase intention อย่างมีนัย แต่ **ลด source credibility** อย่างมีนัย (Eisend2009) ; review เก่ากว่า: humour ไม่รับประกันโฆษณาดีขึ้น ผลขึ้นกับเป้าหมาย ผู้ชม สถานการณ์ และชนิดมุก; ไม่ช่วยความเข้าใจ (comprehension) อย่างสม่ำเสมอ (WeinbergerGulas1992)
- **ใช้งาน**: humour = เครื่องมือหยุดนิ้ว (stopping power) และสร้างความชอบ — *ไม่ใช่* เครื่องมือส่งความน่าเชื่อถือ ; โพสต์ที่ต้องการความเชื่อถือ (ค่าสายตา, การวัดสายตา, เลนส์) ใช้มุกเปิดได้ แต่ส่วนที่เป็นข้อมูลต้องจริงจัง
- **Tier/keys**: S — Eisend2009; A — WeinbergerGulas1992; S — Eisend2011 (bibliographic) · **ความมั่นใจ**: high (attention/liking ↑, credibility ↓)

### 2.11 When humor backfires — หัวข้อจริงจัง/สุขภาพ
- แคมเปญ CDC "Zombie Apocalypse" ได้ reach ตามเป้า แต่ในการทดลอง กลุ่มที่เห็นเวอร์ชันตลก *ตั้งใจเตรียมตัวน้อยกว่า* — ผู้เขียนสรุปว่าโทนเบาทำให้เรื่องดูไม่สำคัญ (trivialise) (FraustinoMa2015)
- ฝั่งตรงข้าม: บางงาน (เช่นเรื่องวัคซีน MMR) พบ humour ลด reactance ; งานที่ HSPH สรุป (882 คน, meme COVID): ข้อความ *ป้องกัน* (เลี่ยงพฤติกรรมเสี่ยง) ถูกแชร์มากขึ้นเมื่อจับคู่กับมุกไม่ทำร้ายใครที่ชี้สิ่งที่คาดไม่ถึง แต่ข้อความ *ส่งเสริม* (ทำพฤติกรรมดี) ถูกแชร์มากขึ้นกับมุก **aggressive** ที่ล้อคนที่ไม่ทำ — วัดแค่ความตั้งใจแชร์ ไม่ใช่พฤติกรรม (HSPH_MatchHumor)
- **ข้อสรุป**: มุกในเรื่องสุขภาพไม่ได้ห้าม แต่ (1) ห้ามทำให้ *ความเสี่ยง* ดูไม่จริง (2) มุกต้องชี้ไปที่พฤติกรรม/สถานการณ์ ไม่ใช่ผู้ป่วย (3) call-to-action ต้องจริงจัง
- **Tier/keys**: A — FraustinoMa2015; C — HSPH_MatchHumor · **ความมั่นใจ**: medium (หลักฐานผสม) — หมายเหตุ: ฉบับก่อนเขียนว่า "playful > aggressive" ซึ่งกลับด้านจากที่หน้า HSPH เขียนจริง (แก้ 2026-11-25); แบรนด์ wholesome ยังเลือกไม่ใช้มุก aggressive ได้ด้วยเหตุผลเรื่อง face/แบรนด์ ไม่ใช่เพราะหลักฐานบอกว่ามันแชร์น้อยกว่า

### 2.12 Culture — ไทย / เอเชีย
- งานรีวิว: ตะวันตกมองว่า humour เป็นคุณสมบัติที่พึงปรารถนา, ตะวันออก (ส่วนใหญ่คือจีน) มองแบบลังเล; ใช้ humour รับมือปัญหาน้อยกว่า; ใช้ aggressive น้อยกว่า affiliative มากกว่า — **ไม่มีข้อมูลไทย** (JiangLiHou2019)
- โฆษณา: ประเทศ collectivist/uncertainty-avoidance สูง ใช้ humour เป็น "พาหนะของข้อมูล" มากกว่า humour ล้วน (HatzithomasEtAl2011 — UK vs กรีซ)
- ไทย: วัฒนธรรม sanuk ให้ค่ากับความสนุก (Filbeck, working paper — ไม่ได้ใส่ใน sources เพราะเห็นแค่ snippet) ; การใช้เสียงหัวเราะในทีวีไทยต่างจากอเมริกันตามรูปแบบภาษาและค่านิยม (Hanks2022, unverified) ; สื่อตลกไทยหนัก pun/analogy (SenchantichaiKadsantier2019) และ sitcom มี aggression/superiority บ่อย (Wangsomchok_ThaiSitcom)
- **DERIVED สำหรับไทย**: ความสนุกเป็นที่ต้องการสูง แต่ต้องรักษาหน้า (face) และ krengjai — แซวได้เมื่อชัดว่าสนิทกันและอีกฝ่ายไม่เสียหน้า; มุกแซะลูกค้า/คนแก่/รูปร่าง = เสียหน้าแทนคนดู
- **ความมั่นใจ**: low-medium (ฐานงานวิจัยไทยบาง)

### 2.13 Sitcom / sketch structure & physical comedy (ส่วนใหญ่ CRAFT)
- **Rule of three**: สองรายการแรกตั้ง pattern ให้ชัด (setup ต้องตรงๆ ไม่ตลกเอง ไม่ซับซ้อน) รายการที่สามหัก pattern; มากกว่าสามรู้สึกเกิน (Levine2017RuleOf3 — tier D); **callback**: ปูไว้เงียบๆ แล้วเอากลับมาจ่ายทีหลัง; sitcom มัก A/B/C plot (practitioner pages อื่น — ไม่ได้อยู่ในโพสต์ของ Levine)
- เชื่อมกับหลักฐาน: rule of three = วิธีสร้าง expectation ให้ incongruity มีน้ำหนัก (DERIVED จาก 2.1); callback = ใช้ distinctiveness/ความจำ (DERIVED จาก 2.8); review 2021 ใช้ callback/running gag เป็นหลักฐานว่ามุกไม่ต้องเซอร์ไพรส์ก็ขำได้ (WarrenBarskyMcGraw2021)
- **Physical comedy**: นักวิชาการภาพยนตร์มองว่ามีแรงตึงระหว่าง "gag" (การแสดง ตัวหยุดเรื่อง) กับ "narrative" (เรื่องเดินต่อ) (Crafton_PieChase) ; gag ของ Keaton สร้างจากการตัดสลับสองพื้นที่ที่มาบรรจบกัน (Trahair 2002 ตาม search summary — ไม่ได้ใส่ใน sources)
- **ใช้งาน**: ตัวละคร faceless → physical comedy ผ่าน silhouette, ท่าทาง, timing ของ prop (แว่นหล่น, ร่มพลิก) เหมาะมาก; ทุก gag ต้องรู้ว่า "ดันเรื่อง" หรือ "พักเรื่อง"
- **ความมั่นใจ**: CRAFT (ไม่ใช่ข้อเท็จจริงทางวิทยาศาสตร์)

### 2.14 Gentle humour for wholesome characters
- สังเคราะห์จาก BVT (violation เล็ก ใกล้ตัว benign ชัด), HSQ (affiliative/self-enhancing), ผล culture (affiliative เหมาะกับเอเชีย) และเหตุผลด้านแบรนด์/การรักษาหน้า (หลักฐาน health ไม่ได้บอกว่า aggressive แพ้เสมอ — ดู 2.11) → "gentle humour" = **ความพลาดเล็กของตัวเอง/สถานการณ์ + ความอบอุ่นหลังมุก + ไม่มีผู้แพ้**
- **ความมั่นใจ**: DERIVED (ยังไม่มีงานทดสอบตรง)

---

## 3. Contested / replication notes
| ประเด็น | ฝั่ง A | ฝั่ง B | ความมั่นใจ |
|---|---|---|---|
| BVT เป็นเงื่อนไขจำเป็นและพอเพียงของ humour? | WarrenMcGraw2016: แยก humour ได้ดีกว่า incongruity | KantNorman2019: มุกไม่ benign ก็ขำได้ / ไม่อธิบายความเห็นต่าง; EarleywineMankoff: ยังเปิด | medium |
| surprise จำเป็นต่อความขำ? | ทฤษฎี incongruity หลายสาย (Suls1972) | WarrenBarskyMcGraw2021: surprise ไม่แยกขำ/ไม่ขำ; punchline ที่คาดได้บางครั้งขำกว่า (แต่ผู้เขียนคือกลุ่ม BVT) | medium |
| pause ก่อน punchline สำคัญ? | MaEtAl2026 (stand-up): timing > เนื้อหา | PickeringEtAl2009, AttardoEtAl2011_2013: ไม่พบ pause ก่อน punchline ในการเล่าเรื่อง/สนทนา | medium — ขึ้นกับ genre |
| punchline เสียงต่ำลง? | PickeringEtAl2009: ใช่ (narratives) | Attardo 2013: ไม่ replicate (conversation) | low |
| humour ช่วยความจำเพราะ distinctiveness? | Schmidt1994 + งานตามมา: เห็นใน mixed list | Schmidt & Williams 2001 (ตาม summary): ไม่สอดคล้องกับ distinctiveness ล้วน | medium |
| humour ในข้อความสุขภาพ | FraustinoMa2015: ลดความตั้งใจป้องกัน | งาน MMR (ตาม summary): ลด reactance | medium — ขึ้นกับชนิดมุก |
| Eisend 2009 บอกว่างานวิชาการ "biased" | ผลบวกของ humour อาจถูกประเมินสูง | — | ให้ลดน้ำหนักตัวเลขผลบวก |

---

## 4. Applied patterns for our production
1. **Mint & Tao คารูเซล 3–5 สไลด์**: สไลด์ 1–2 ปู pattern (rule of three), สไลด์ 3 หัก, สไลด์สุดท้าย "warm beat" (ไม่ใช่มุกซ้อน) → ขำแล้วอุ่น; ตัวอย่างใน `COMEDY_PLAYBOOK.md`
2. **คลิปเรื่องเล่า TTS**: smile voice ตั้งกรอบตั้งแต่บรรทัดแรก; punchline ต่ำลง-ช้าลงเล็กน้อย ไม่ pause ยาว; ถ้าใช้ภาพตัดตาม beat ให้ "ผิดจังหวะ" หนึ่งครั้งตรงมุก (dual violation — DERIVED)
3. **โพสต์สินค้า/ร้าน (ทุกธุรกิจ)**: มุกอยู่ที่ hook (หยุดนิ้ว) ข้อมูลอยู่ในเสียงจริงจัง; ห้ามให้มุกเป็นตัวส่งคำกล่าวอ้างทางการแพทย์/เทคนิค (credibility ↓ — Eisend2009)
4. **หัวข้อสุขภาพ (สายตา UV ต้อ ฯลฯ)**: มุกที่พฤติกรรม ("ถอดแว่นไว้บนหัวแล้วหา") ไม่ใช่ที่โรค; CTA จริงจัง; ทดสอบด้วยคำถาม "คนดูยังคิดว่าความเสี่ยงนี้จริงไหม"
5. **ภาษาไทย**: pun ที่ภาพหนุนความหมายหนึ่ง คำหนุนอีกความหมาย; คำผวนผ่านด่านตรวจสองทาง
6. **ทั่วไปทุกลูกค้า**: ตั้ง "humour budget" — หนึ่งชิ้นมีมุกหลักหนึ่งจุด; ฟีดสลับมุกกับชิ้นจริงจัง (ใช้ mixed-list advantage — DERIVED)

---

## 5. Anti-patterns
- เอา "relief theory" มาอ้างว่าหัวเราะ "ปล่อยแรงดันประสาท" เป็นวิทยาศาสตร์
- เชื่อว่า "pause ก่อน punchline" เป็นกฎสากล แล้วยัด pause 1 วินาทีทุกมุกใน TTS (ทำให้ดูแข็ง)
- มุกที่ทำให้ลูกค้าเป็นฝ่ายแพ้ (ล้อสายตาไม่ดี, อายุ, รูปร่าง, ฐานะ) — superiority + เสียหน้า
- มุกบนความทุกข์จริงที่ยังใกล้ (ข่าวภัยพิบัติ, ผู้ป่วยจริง) — "too soon" (McGrawEtAl2012, McGrawWilliamsWarren2014)
- humour เป็นตัวพาข้อมูลทางการแพทย์/ราคา/โปรโมชัน (credibility ↓, trivialise)
- คำผวน/สองแง่สองง่ามโดยไม่เช็ก — คำผวนไทยมีชั้นความหมายเรื่องเพศเป็นทุนเดิม
- มุกที่ต้องแปลจากอังกฤษ (pun อังกฤษตายเมื่อแปล) — งานเราภาษาไทย (story) หรืออังกฤษ (post/clip) ต้องคิดมุกในภาษานั้นตั้งแต่ต้น
- มุกซ้อนทุกสไลด์ — ลด distinctiveness, ตัวละครดูไม่จริงใจ
- self-defeating humour เป็นบุคลิกหลักของตัวเอก

---

## 6. Open questions / what to research next
- อ่าน full text: Eisend 2009/2011 (กลไก affect vs cognition), Weinberger & Gulas 2019 update, Kant & Norman 2019 (PMC captcha), งานต้นฉบับ Health Communication 2023 ที่ HSPH สรุป (BVT ต้นฉบับอ่านแล้ว 2026-11-25)
- งานทดลองว่าคนไทยขำอะไร (ไม่ใช่แค่วิเคราะห์สื่อ); HSQ ฉบับไทย
- ฐานข้อมูล TCI-Thaijo: "คำผวน อารมณ์ขัน", "มุกตลก โฆษณาไทย"
- humour ใน carousel (self-paced) vs video (system-paced) — ไม่มีงานเทียบตรง
- ผลของมุกต่อ engagement บนโซเชียลจริง (แชร์/เซฟ) แยกตามชนิดมุก
- timing ใน TTS: ทดลอง A/B ภายในสตูดิโอ (pause vs ไม่ pause) แล้วบันทึกใน LEARNING-LOG
