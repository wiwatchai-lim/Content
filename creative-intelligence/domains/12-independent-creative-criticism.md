# Domain 12 — Independent Creative Criticism (การวิจารณ์งานสร้างสรรค์อย่างเป็นอิสระ)

Modules: **M42** (independent critic / critique method) · **M06** (aesthetic intelligence & taste — ส่วนที่เกี่ยวกับการตัดสิน)
Date researched: 2026-11-26 · Sources: `sources/12-independent-creative-criticism.json` (43 แหล่ง)

**Status: SOURCE VERIFIED** — 23/43 แหล่ง (53%) อ่านเป็น `full_text` หรือ `abstract`

| tier | S | A | B | C | D |
|---|---|---|---|---|---|
| จำนวน | 3 | 26 | 9 | 3 | 2 |

| access_status | full_text | abstract | publisher_page | search_summary | bibliographic |
|---|---|---|---|---|---|
| จำนวน | 8 | 15 | 2 | 16 | 2 |

**Builds on (อ่านก่อน ไม่ทำซ้ำ):**
- `../knowledge/aesthetics/CRITIQUE_PROTOCOL.md` — 3 ชั้น T/C/P (technical / contextual / preference), formal → contextual → comparative → judgement, ตาราง bias filter (expert taste, exposure, label, averaging, neuro halo, single judge)
- `../knowledge/aesthetics/README.md` — M06 รสนิยม, Kant adherent beauty, Hume "joint verdict"
- `../../.claude/skills/ai-visual-artist/IMAGE_CRITIQUE_ENGINE.md` — 11 ขั้นตรวจภาพ, severity, issue patterns, score.py
- `../evaluations/MASTER_QUALITY_SCORE.md` — critical failures + 100 คะแนนรวมทั้งชิ้น
- `../../.claude/skills/creative-critic/SKILL.md` — skill ที่ใช้ไฟล์นี้เป็นฐานหลักฐาน (critic = sub-agent แยกจาก maker)

**Scope — ครอบคลุม:** ประวัติการวิจารณ์ (ศิลปะ, วรรณกรรม/workshop, design crit, peer review), วิธีวิจารณ์ (Feldman, Barrett, Carroll, Lerman CRP, Pixar Braintrust, CAT), เหตุผลที่ต้องแยก critic ออกจาก creator (IKEA effect, self-forecasting, bias blind spot, Dunning–Kruger พร้อมข้อโต้แย้ง), bias ในการตัดสิน (halo, order/serial position, anchoring, identity/blind review), วิจัยเรื่อง feedback (Kluger & DeNisi, Hattie & Timperley, specificity, rubric), **AI-as-judge** (position, verbosity, self-preference, familiarity, anchoring, self-correction, MLLM/aesthetic judges), บริบทไทย (kreng jai)
**ไม่ครอบคลุม:** สถิติ IRR เชิงลึก (ICC/Krippendorff → domain 13), การทดสอบ A/B กับผู้ชมจริง (→ 11/13), ปรัชญาสุนทรียะ Kant/Hume (มีแล้วใน M06), การวิจารณ์ดนตรี/เสียงโดยเฉพาะ (→ 10), รายการ issue ภาพ (มีใน IMAGE_CRITIQUE_ENGINE)

ป้ายที่ใช้: **FACT** (ทำซ้ำได้ดี) · **THEORY** (โมเดล อาจโต้แย้ง) · **PRACTICE** (ธรรมเนียมช่าง) · **OPINION** · **(craft)** / **(opinion)** / **(our test)** = ไม่ใช่ผลวิจัย

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 จากชีวประวัติศิลปิน สู่ Salon review สู่ทฤษฎี
- **1550 — Vasari, *Lives of the Most Eminent Painters, Sculptors and Architects*** ถือเป็นงานวิจารณ์ยุคต้นที่เป็นหลัก — ผสมชีวประวัติ เกร็ด และการตัดสินคุณค่า `[Britannica_ArtCriticism]`
- **1708 — Roger de Piles, "Balance des peintres"** ให้คะแนนจิตรกร ~56–57 คน แต่ละคน 0–20 ใน 4 เกณฑ์ (composition, drawing, colour, expression) — เป็น **rubric หลายเกณฑ์ที่เก่าแก่ที่สุดอันหนึ่ง** และถูกล้อโดย Hogarth `[DePiles1708_Balance]`. บทเรียน (analysis ของเรา): rubric ของ de Piles สะท้อนสำนัก "colourist" ของเขาเอง → **rubric ไม่เป็นกลางโดยอัตโนมัติ มันฝังรสนิยมของผู้เขียน rubric**
- **1759–1781 — Diderot วิจารณ์ Paris Salon** เขียนให้คนที่ไม่ได้ไปดูงาน → การวิจารณ์กลายเป็นงานเขียนสาธารณะ ไม่ใช่แค่ความเห็นในวงช่าง `[Britannica_ArtCriticism]`
- **1845–1846 — Baudelaire, Salons**; **1843 — Ruskin, *Modern Painters*** ปกป้อง Turner ที่ถูกนักวิจารณ์คนอื่นเยาะว่ากล้าเกินไป — ตัวอย่างว่า "ฉันทามติของนักวิจารณ์" ผิดได้ต่องานใหม่ `[Britannica_ArtCriticism]`
- **1939 — Greenberg, "Avant-Garde and Kitsch"** → formalism กลางศตวรรษที่ 20: ตัดสินจากคุณสมบัติรูปแบบของสื่อ `[Britannica_ArtCriticism]`

### 1.2 การวิจารณ์กลายเป็น "วิธีสอน" (pedagogy)
- **Feldman (ทศวรรษ 1960–70)** แปลงการวิจารณ์เป็นลำดับขั้นที่สอนได้: **Description → Analysis → Interpretation → Judgment** — handout ของมหาวิทยาลัยระบุว่าขั้น judgment "มักใช้กับผู้ชมที่โตแล้ว" `[GVSU_FeldmanModel]`; แหล่งรองเน้นว่า Feldman ถือ interpretation เป็นหัวใจ และ formal analysis มีไว้ "สะสมหลักฐาน" ให้ interpretation และ judgment `[Feldman1967_Varieties]` (unverified — ไม่ได้อ่านเล่ม)
- **Barrett (1994)** เขียน principles of interpretation: งานศิลป์ "เป็นเรื่องเกี่ยวกับบางอย่าง", การตีความคือ "ข้อโต้แย้งที่ต้องโน้มน้าว", การตีความบางอันดีกว่าอันอื่น (วัดด้วย coherence, correspondence, inclusiveness), งานไม่จำเป็นต้องหมายถึงสิ่งที่ศิลปินตั้งใจ `[Barrett1994_CriticizingArt]`
- **Carroll (2009), *On Criticism*** ยืนยันว่าแก่นของการวิจารณ์คือ **การประเมินที่มีเหตุผลรองรับ (reasoned evaluation)**; description, classification, analysis, interpretation เป็น "เหตุผล" ให้การประเมิน; คุณค่า = ความสำเร็จของศิลปินตามเป้าที่ตั้งใจ (intentionalism) — ผู้รีวิวโต้ว่างานเป็นวัตถุสาธารณะ มีคุณค่าเกินเจตนาได้ `[Goldman2010_NDPR_Carroll]`

### 1.3 Workshop / crit / jury — การวิจารณ์ต่อหน้าผู้สร้าง
- **1936 — Iowa Writers' Workshop** ก่อตั้ง กลายเป็นต้นแบบของโปรแกรมเขียนสร้างสรรค์ 300+ แห่ง: วิจารณ์งานใหม่ของนักเรียนทุกสัปดาห์ `[IowaWW_History]` (กฎ "ผู้เขียนห้ามพูด" ที่เล่ากันทั่วไป — **ไม่พบเอกสารยืนยัน** ในรอบนี้)
- **Design jury / crit ในโรงเรียนสถาปัตย์** มาจากระบบ "examination" ของ École/RIBA ศตวรรษที่ 19 `[Webster2006_DesignJury]`; **Anthony (1991) *Design Juries on Trial*** ใช้ข้อมูลจาก 900+ คน 7 ปี และนำไปสู่รายงาน AIAS Studio Culture (2002) `[Anthony1991_DesignJuries]`; **Webster (2006)** ethnography 1 ปี พบว่า jury มักเป็น "monologue" ของ critic ตาม paradigm ส่วนตัว ทำให้นักเรียนเล่นปลอดภัย `[Webster2006_DesignJury]`
- **1990 — Liz Lerman, Critical Response Process (CRP)** ตอบโต้วัฒนธรรมวิจารณ์ที่ทำร้ายผู้สร้าง: ให้ผู้สร้างคุมบทสนทนา, ถามคำถามกลางก่อน, ความเห็นต้องขออนุญาต `[Lerman_CRP]`
- **Pixar Braintrust (เอกสาร HBR 2008, หนังสือ 2014)** — กลุ่มให้ "notes" อย่างตรงไปตรงมาแต่ **ไม่มีอำนาจสั่ง**; ผู้กำกับตัดสินใจเอง `[Catmull2014_Braintrust]`

### 1.4 การวัดการตัดสิน (judgement science)
- **1920 — Thorndike** ตั้งชื่อ "halo": นายทหารให้คะแนนลูกน้องหลายคุณลักษณะสัมพันธ์กันสูงเกินจริง `[Thorndike1920_Halo]`
- **1982 — Amabile, Consensual Assessment Technique (CAT)**: ให้ผู้เชี่ยวชาญหลายคนให้คะแนนอิสระ แล้วดูความสอดคล้อง `[Amabile1982_CAT]` `[CsehJeffries2019_ScatteredCAT]`
- **2010 — Bornmann et al.** meta-analysis: reviewer วารสารวิทยาศาสตร์เห็นตรงกันต่ำ (ICC ≈ .34, kappa ≈ .17) `[Bornmann2010_PeerReviewIRR]`
- **1996/2007 — งานวิจัย feedback**: Kluger & DeNisi พบ feedback ทำให้แย่ลง > 1/3 ของกรณี `[KlugerDeNisi1996]`; Hattie & Timperley จัดระดับ feedback `[HattieTimperley2007]`

### 1.5 ยุค AI critic (2023–)
- **2023 — Zheng et al.** "LLM-as-a-judge": GPT-4 เห็นตรงกับมนุษย์ ~85% (non-tie) เท่ากับมนุษย์เห็นตรงกันเอง แต่มี position / verbosity / self-enhancement bias `[Zheng2023_LLMJudge]`
- **2023–2025** ชุดงานที่ยืนยันและวัด bias: order hacking `[Wang2024_NotFairEvaluators]`, self-preference `[Panickssery2024_SelfPreference]`, familiarity/anchoring `[Stureborg2024_Inconsistent]`, 12 bias `[Ye2025_CALM]`, human vs LLM bias `[Chen2024_HumansOrLLMs]`, multimodal judges `[Chen2024_MLLMJudge]`, aesthetic perception `[Huang2024_AesBench]`, self-correction ล้มเหลวเมื่อไม่มี feedback ภายนอก `[Huang2024_NoSelfCorrect]` `[Kamoi2024_SelfCorrectSurvey]`

**การเปลี่ยนของแนวคิด (สรุป, analysis ของเรา):** (1) จากนักวิจารณ์ผู้มีรสนิยม → วิธีการที่สอนได้; (2) จาก "ตัดสิน" → "feedback เพื่อพัฒนา"; (3) จากความเชื่อในผู้เชี่ยวชาญคนเดียว → การวัดว่าผู้ตัดสินเห็นตรงกันแค่ไหนและมี bias อะไร; (4) วันนี้ critic เป็น AI ซึ่ง **มี bias ชุดใหม่ที่วัดได้** และ bias แบบมนุษย์บางอย่าง (order, halo, anchoring) ก็ยังอยู่

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 นิยาม
| คำ | ความหมายในไฟล์นี้ |
|---|---|
| **criticism / critique** | การประเมินงานที่มีเหตุผลรองรับ (reasoned evaluation) ซึ่งเหตุผลมาจาก description, analysis, interpretation `[Goldman2010_NDPR_Carroll]` |
| **feedback** | ข้อมูลเกี่ยวกับช่องว่างระหว่างผลงานตอนนี้กับเป้า ที่ใช้ปิดช่องว่างได้ — ตอบ 3 คำถาม Where am I going? How am I going? Where to next? `[HattieTimperley2007]` |
| **independent critic** | ผู้ประเมินที่ (ก) ไม่ได้สร้างงานชิ้นนั้น (ข) ไม่เห็นเหตุผล/ความภูมิใจของผู้สร้าง (ค) ไม่มีส่วนได้เสียกับผลตัดสิน (ง) ไม่มีอำนาจสั่ง — เป็นผู้ให้ notes `[Berg2016_CreativeHighwire]` `[Catmull2014_Braintrust]` (นิยามรวมเป็น craft ของเรา) |
| **located finding** | issue ที่ระบุ **ที่ไหน · อะไร · ทำไม (กฎ/หลักฐาน) · แก้อย่างไร · ร้ายแรงแค่ไหน · มั่นใจแค่ไหน** — format เดียวกับ IMAGE_CRITIQUE_ENGINE + CRITIQUE_PROTOCOL |
| **judge bias** | ความเอียงเชิงระบบที่ทำให้คำตัดสินเปลี่ยนตามสิ่งที่ไม่เกี่ยวกับคุณภาพ (ลำดับ ความยาว ป้ายชื่อ ใครทำ) |

### 2.2 หลักแกน 8 ข้อ
1. **บรรยายก่อนตัดสิน** — Feldman/Carroll: judgement ต้องมีเหตุผลที่มาจากสิ่งที่เห็น `[GVSU_FeldmanModel]` `[Goldman2010_NDPR_Carroll]`; Kahneman: "delay intuition" — ให้คะแนนแต่ละมิติก่อน แล้วค่อยตัดสินรวม `[KahnemanLovalloSibony2019_MAP]` (PRACTICE มีเหตุผลเชิงทฤษฎี)
2. **ตัดสินเทียบเป้าหมาย** — งาน commission วัดจากความสำเร็จตาม brief (success value) `[Goldman2010_NDPR_Carroll]`; สอดคล้องกับ "adherent beauty" ใน M06
3. **ผู้สร้างไม่ใช่ผู้ตัดสินสุดท้ายของงานตัวเอง** — creators พยากรณ์งานคนอื่นได้ดีกว่า manager แต่ประเมินงานตัวเองสูงเกิน `[Berg2016_CreativeHighwire]`; IKEA effect `[NortonMochonAriely2012]` (FACT ระดับ medium–high)
4. **ผู้ให้ความเห็นไม่มีอำนาจสั่ง** — Braintrust `[Catmull2014_Braintrust]`; CRP ให้ผู้สร้างคุมการขอความเห็น `[Lerman_CRP]` (PRACTICE)
5. **feedback ต้องชี้ที่งานและขั้นต่อไป ไม่ใช่ตัวคน** — FIT: ประสิทธิผลลดลงเมื่อ attention ย้ายไปที่ self `[KlugerDeNisi1996]`; self-level feedback ได้ผลน้อยที่สุด `[HattieTimperley2007]` (FACT/THEORY)
6. **เจาะจง + มีเหตุผล + มี rubric** — rubric ทำให้มือใหม่วิจารณ์ได้มีค่าใกล้ผู้เชี่ยวชาญ; ความเจาะจงและมีเหตุผลถูกมองว่ามีประโยชน์ `[Yuan2016_AlmostExpert]`; แต่เจาะจงเกินไปอาจลดการเรียนรู้ระยะยาว `[GoodmanWoodHendrickx2004]`
7. **คุม bias ด้วยกระบวนการ ไม่ใช่ด้วยความตั้งใจ** — คนมองไม่เห็น bias ตัวเอง `[ProninLinRoss2002]`; halo เปลี่ยนการตัดสินโดยไม่รู้ตัว `[NisbettWilson1977_Halo]` → ใช้ blind, สลับลำดับ, ให้คะแนนแยกมิติ
8. **ผู้ตัดสินคนเดียว = ตัวอย่างเดียว** — reviewer ผู้เชี่ยวชาญเห็นตรงกันต่ำ `[Bornmann2010_PeerReviewIRR]`; CAT ใช้หลายคนอิสระ `[CsehJeffries2019_ScatteredCAT]`

### 2.3 สูตรของ critique 1 ข้อ (ใช้ทั่วไปทุกสาขา)
```
WHERE   : ตำแหน่งที่ชี้ได้ (พิกัด/เวลา/บรรทัด/สไลด์)
WHAT    : สิ่งที่เห็น (บรรยาย ไม่ตัดสิน)
WHY     : เทียบกับอะไร — brief / house rule / หลักฐาน [key] / craft
EFFECT  : ผลต่อคนดู/เป้าหมาย
FIX     : ทางแก้ 1–2 ทาง + side effect
LAYER   : T / C / P  (จาก CRITIQUE_PROTOCOL)
SEVERITY: critical / major / minor / polish
CONFIDENCE: high / medium / low (+ เหตุผลถ้า low)
```
ที่มา: รวม Hattie 3 คำถาม (goal–gap–next) `[HattieTimperley2007]` + MEC "evidence ก่อนคะแนน" `[Wang2024_NotFairEvaluators]` + justification `[Yuan2016_AlmostExpert]` + severity/layer ของไฟล์เดิม — การรวมเป็น **(craft)**

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 ทำไมผู้สร้างประเมินงานตัวเองไม่ได้ — 4 กลไกที่แข่งกันอธิบาย
| กลไก | หลักฐาน | สิ่งที่ทำนาย | ความมั่นใจ |
|---|---|---|---|
| **Effort justification / IKEA effect** — แรงงานทำให้รัก | ประเมินของที่ประกอบเองเท่างานผู้เชี่ยวชาญ และคิดว่าคนอื่นเห็นด้วย; ต้องทำเสร็จ `[NortonMochonAriely2012]` | ยิ่งทำนาน ยิ่งประเมินสูง | medium–high |
| **Privileged intent (รู้ว่าตั้งใจอะไร)** — ผู้สร้าง "เห็น" สิ่งที่ตั้งใจแทนสิ่งที่อยู่ในงาน | Barrett: งานไม่จำเป็นต้องหมายถึงสิ่งที่ศิลปินตั้งใจ `[Barrett1994_CriticizingArt]`; creators ประเมินตัวเองสูงเกิน `[Berg2016_CreativeHighwire]` | critic ที่ไม่เห็นเจตนาจะจับ "สิ่งที่ไม่สื่อ" ได้ | medium (THEORY + 1 field study) |
| **Overconfidence ทั่วไป (ไม่ใช่ Dunning–Kruger แบบเฉพาะ)** | DK pattern ส่วนใหญ่อธิบายได้ด้วย overconfidence + regression `[GignacZajenkowski2020]`; แต่ replication พบ DK จริงแต่เล็ก `[Dunkel2023_DKReplication]` | ทุกคนประเมินตัวเองสูงเกินพอสมควร | medium (contested) |
| **Bias blind spot** | เห็น bias คนอื่นมากกว่าตัวเอง `[ProninLinRoss2002]` | การ "ตั้งใจเป็นกลาง" ไม่พอ | medium |

**นัยสำหรับ AI:** โมเดลที่สร้าง prompt/caption แล้วตัดสินงานตัวเองมีครบทั้ง "privileged intent" (เห็น reasoning ของตัวเอง) และ **self-preference ที่วัดได้** `[Panickssery2024_SelfPreference]` `[Liu2023_GEval]` และ self-correction แบบไม่มี feedback ภายนอกมักทำให้แย่ลง `[Huang2024_NoSelfCorrect]` → นี่คือเหตุผลเชิงหลักฐานของการแยก creative-critic เป็น sub-agent สด (fresh context)

### 3.2 Feedback Intervention Theory (FIT) vs Hattie–Timperley
- **FIT** `[KlugerDeNisi1996]`: feedback ดึง attention ไปที่ 3 ระดับลำดับชั้น — task learning (รายละเอียดงาน), task motivation (งานโดยรวม), meta-task (ตัวตน) ยิ่งขึ้นไปทาง self ยิ่งแย่
- **Hattie–Timperley** `[HattieTimperley2007]`: 4 ระดับ FT (task) · FP (process) · FR (self-regulation) · FS (self); FS ได้ผลน้อยสุด; FP/FR ทรงพลัง; FT มีพลังเมื่อนำไปสู่ process ได้; **FT ที่เจาะจงเกินไปอาจดึง attention ต่ำกว่าระดับที่ต้องใช้**
- **จุดตรงกัน:** อย่าวิจารณ์ตัวคน; ชี้ที่งาน + กลยุทธ์
- **จุดต่าง:** FIT เน้นว่า feedback อาจ **ลด** performance; Hattie เน้นว่า feedback (เมื่อทำถูก) เป็นปัจจัยที่แรงที่สุดตัวหนึ่ง (avg 0.79) — สองข้อนี้ไม่ขัดกัน: ค่าเฉลี่ยสูงแต่ variance ใหญ่ (32% ของผลเป็นลบในชุด Kluger & DeNisi ที่ Hattie สรุป)
- **ตัวเลข moderator (Kluger & DeNisi ผ่าน Hattie Table 3):** feedback บอกการเปลี่ยนแปลงจากครั้งก่อน 0.55 vs ไม่บอก 0.28; feedback แบบ discouraging −0.14; praise เกี่ยวกับงาน 0.09; คุกคาม self-esteem มาก 0.08; งานซับซ้อนมาก 0.03 vs ไม่ซับซ้อน 0.55 `[HattieTimperley2007]`

### 3.3 Specificity paradox
- เจาะจงมาก → performance ตอนฝึกดีขึ้น แต่ไม่คงทน ไม่ transfer และลดการสำรวจ `[GoodmanWoodHendrickx2004]`
- สอดคล้องกับ Hattie: FT เจาะจงเกินทำให้ trial-and-error `[HattieTimperley2007]`
- **ข้อสรุปเชิงปฏิบัติ (THEORY → PRACTICE):** แยก 2 เป้า — (ก) **ส่งงานชิ้นนี้** → เจาะจงสุด (พิกัด + ค่า); (ข) **พัฒนาระบบ/ผู้สร้าง** → เพิ่มหลักการ/สาเหตุ (process level) เพื่อให้ไม่ผิดซ้ำ (เช่น อัปเดต prompt template, เพิ่มกฎลง memory)

### 3.4 ทำไมผู้ตัดสินหลายคนไม่เห็นตรงกัน — และนั่นไม่ใช่ความล้มเหลวเสมอไป
- peer review IRR ต่ำ `[Bornmann2010_PeerReviewIRR]`; CAT ได้ IRR สูงเมื่อทำตามเงื่อนไข (ผู้เชี่ยวชาญในสาขา, ให้คะแนนอิสระ, เทียบในชุดตัวอย่าง, ลำดับสุ่ม) และจำนวนคนมีผลต่อ alpha (มากกว่า 10 อาจ inflate, น้อยกว่า 5 เสี่ยง) `[CsehJeffries2019_ScatteredCAT]`
- **สองแหล่งของความต่าง:** (1) noise/bias — ควรลด; (2) ความต่างที่ "blameless" ด้านรสนิยม (Hume ใน M06) — ไม่ควรลบทิ้ง แต่ควรแยกเป็นชั้น P
- Expert vs novice: ผลไม่คงที่ ขึ้นกับสาขา; นักวิจารณ์หนังกับนักศึกษาจัดอันดับหนังสัมพันธ์สูง แต่ผู้เชี่ยวชาญให้คะแนนเฉลี่ยต่ำกว่า `[CsehJeffries2019_ScatteredCAT]` → **อย่าเทียบคะแนนดิบข้ามผู้ตัดสิน ให้เทียบอันดับ/คู่**

### 3.5 LLM-as-judge: กลไกของ bias
| bias | กลไกที่เสนอ | หลักฐาน | สิ่งที่ใช้แก้ (ที่ทดสอบแล้ว) |
|---|---|---|---|
| **position** | ความเอียงไปตำแหน่งแรก/หลังในบริบท | consistency Claude-v1 23.8%, GPT-3.5 46.2%, GPT-4 65% `[Zheng2023_LLMJudge]`; Vicuna ชนะ ChatGPT 66/80 แค่สลับลำดับ `[Wang2024_NotFairEvaluators]` | ประเมิน 2 ลำดับแล้วรวม (BPC); นับชนะเฉพาะที่ชนะทั้ง 2 ลำดับ; few-shot เพิ่ม consistency GPT-4 65→77.5% `[Zheng2023_LLMJudge]` `[Wang2024_NotFairEvaluators]` |
| **verbosity / length** | ยาว = ดูละเอียด | repetitive-list attack หลอก Claude-v1/GPT-3.5 91.3%, GPT-4 8.7% `[Zheng2023_LLMJudge]`; length bias ใน MLLM `[Chen2024_MLLMJudge]` | ตัดความยาวให้เท่ากัน/ให้คะแนนเฉพาะเกณฑ์ |
| **self-preference** | จำ "ลายมือ" ตัวเองได้ → ชอบ | GPT-4 จำงานตัวเองได้ 73.5%, self-recognition สัมพันธ์เชิงเส้นกับ self-preference; สลับป้ายแล้ว preference กลับ `[Panickssery2024_SelfPreference]`; G-Eval เอียงไปทางข้อความที่ LLM เขียน `[Liu2023_GEval]` | ซ่อนผู้แต่ง (authorship obfuscation — เสนอ ยังไม่ทดสอบ), ใช้โมเดลอื่น/มนุษย์ตัดสินขั้นสุดท้าย |
| **familiarity** | ชอบข้อความ perplexity ต่ำ (คุ้น) | GPT-4 เอียงไปทาง summary perplexity ต่ำกว่าผู้เชี่ยวชาญ `[Stureborg2024_Inconsistent]` | ระวังเมื่อตัดสิน "ความใหม่" — AI critic อาจลงโทษงานแปลก |
| **anchoring (multi-attribute)** | คะแนนเกณฑ์แรกดึงเกณฑ์ถัดไป | `[Stureborg2024_Inconsistent]` | ให้คะแนนเกณฑ์แยก call หรือสุ่มลำดับเกณฑ์ |
| **authority / beauty / misinformation-oversight** | รูปแบบภายนอก (อ้างอิง, หน้าตาเรียบร้อย) ดึงคะแนน | ทั้งคนและ LLM โดน `[Chen2024_HumansOrLLMs]`; CALM วัด 12 bias `[Ye2025_CALM]` | ลอก formatting/ป้าย ก่อนตัดสิน; perturbation test |
| **hallucinated judgement** | AI "เห็น" issue ที่ไม่มี | MLLM judges hallucinate `[Chen2024_MLLMJudge]` | บังคับ WHERE ที่ตรวจซ้ำได้ |
| **weak reasoning / aesthetic perception** | ตัดสินถูก/ผิดเชิงตรรกะ หรือรสนิยมไม่แม่น | math grading fail 70% → reference-guided 15% `[Zheng2023_LLMJudge]`; MLLM มี aesthetic perception "rudimentary" `[Huang2024_AesBench]` | ให้ reference (brief, ภาพสินค้าจริง, script) ; ลดน้ำหนักชั้น P ของ AI |

**รูปแบบงาน:** MLLM ใกล้มนุษย์ใน **pair comparison** แต่ห่างใน **scoring** และ **batch ranking** `[Chen2024_MLLMJudge]` → THEORY ที่ใช้ได้: ถาม AI critic แบบ "A หรือ B ดีกว่าในเกณฑ์ X เพราะอะไร" น่าเชื่อกว่า "ให้ 0–10"

### 3.6 Self-correction ≠ independent critique
- Intrinsic self-correction (โมเดลเดียวกันทบทวนตัวเองโดยไม่มีข้อมูลใหม่) ลดความแม่นยำ: GPT-3.5 CommonSenseQA 75.8 → 38.1; เปลี่ยนคำตอบถูกเป็นผิดบ่อยกว่ากลับกัน `[Huang2024_NoSelfCorrect]`
- Survey: ไม่มีงานไหนแสดง self-correction สำเร็จจาก feedback ของ LLM ที่ prompt เอา ยกเว้นงานที่เหมาะเป็นพิเศษ; ได้ผลเมื่อมี **feedback ภายนอกที่เชื่อถือได้** `[Kamoi2024_SelfCorrectSurvey]`
- **ข้อจำกัด:** หลักฐานมาจาก reasoning tasks; งานสุนทรียะไม่มีคำตอบเดียว — แต่ชั้น T (สะกด, สินค้าเพี้ยน, safe zone) มีคำตอบ → ใช้ได้ตรง ๆ
- **นัย:** critic ต้องได้ **ข้อมูลภายนอก**: ภาพสินค้าจริง, brief, การวัดจาก tools (analyze_image.py, qc.py, ffprobe), memory ของข้อผิดพลาดเก่า — ไม่ใช่แค่ "ลองดูอีกที"

### 3.7 Order effects ในคณะกรรมการ
- คะแนน Eurovision สูงขึ้นตามลำดับการแสดง ทั้งแบบให้คะแนนตอนจบและทีละคน; figure skating ก็เช่นกัน; การสุ่มลำดับไม่ลบผลแต่ทำให้ยุติธรรม `[BruineDeBruin2005_LastDance]`
- คนกับ LLM เอียงตามลำดับเหมือนกัน (ทิศอาจต่างกัน) `[Zheng2023_LLMJudge]` → กฎเดียวกันใช้ได้ทั้งคนและ AI: **สุ่ม + สลับ + บันทึกลำดับ**

### 3.8 Blind review: ได้ผล แต่ไม่ใช่ยาวิเศษ
- Orchestra screen: โอกาสผู้หญิงผ่านรอบแรก +~50% `[GoldinRouse2000_Blind]` — แต่ตัวเลขมี noise สูง ถูกวิจารณ์ และการทดลอง de-identification ของรัฐบาลออสเตรเลีย 2017 ได้ผลตรงข้าม (รายงานในแหล่งข่าว) → THEORY: blind ลบ cue ที่ไม่เกี่ยว แต่ผลขึ้นกับว่า cue นั้นเอียงไปทางไหนในบริบทนั้น
- สำหรับ AI: label "AI-generated", "เวอร์ชันใหม่", "ของผู้ใช้" เป็น cue ที่ควรซ่อน (ดู label effect ใน CRITIQUE_PROTOCOL §4) + self-preference `[Panickssery2024_SelfPreference]`

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| key | สิ่งที่พบ / เสนอ | tier | access |
|---|---|---|---|
| `[KlugerDeNisi1996]` | 607 ES: feedback เฉลี่ย d=.41 แต่ >1/3 ทำให้แย่ลง; FIT: ยิ่งไปทาง self ยิ่งแย่ | S | abstract |
| `[HattieTimperley2007]` | 3 คำถาม, 4 ระดับ; praise 0.14, cues 1.10; timing ตามระดับ | S | full_text |
| `[Bornmann2010_PeerReviewIRR]` | peer review IRR ต่ำ (ICC .34, κ .17) | S | abstract |
| `[GoodmanWoodHendrickx2004]` | specificity ช่วยตอนฝึก ทำร้ายการเรียนรู้/transfer | A | search_summary |
| `[Yuan2016_AlmostExpert]` | rubric → novice critique มีค่าเท่า expert; specific+positive มีประโยชน์ | A | search_summary |
| `[Dow2010]` | สร้างหลายต้นแบบก่อน feedback > serial | A | search_summary |
| `[NortonMochonAriely2012]` | IKEA effect, ต้องทำเสร็จ | A | abstract |
| `[Berg2016_CreativeHighwire]` | creators ทำนายงานเพื่อนดีกว่า manager, งานตัวเองสูงเกิน | A | publisher_page |
| `[Silvia2008_Discernment]` | คนเลือกไอเดียตัวเองที่สร้างสรรค์สุดได้ "พอใช้" (contested) | A | search_summary |
| `[GignacZajenkowski2020]` · `[Dunkel2023_DKReplication]` | DK ส่วนใหญ่เป็น artefact vs มีจริงแต่เล็ก | A | search_summary |
| `[ProninLinRoss2002]` | bias blind spot | A | search_summary |
| `[Thorndike1920_Halo]` · `[NisbettWilson1977_Halo]` | halo; คนไม่รู้ตัว | A | search_summary |
| `[BruineDeBruin2005_LastDance]` | serial position ใน jury | A | abstract |
| `[GoldinRouse2000_Blind]` | blind audition + ข้อวิจารณ์ | A | abstract |
| `[Amabile1982_CAT]` · `[CsehJeffries2019_ScatteredCAT]` | CAT เงื่อนไขความน่าเชื่อ; ปัญหาวิธีการ | A | bibliographic · full_text |
| `[Webster2006_DesignJury]` | design jury → monologue, เล่นปลอดภัย | A | full_text |
| `[Areemit2021_KrengJai]` | hierarchy + kreng jai กับ feedback ในไทย | A | abstract |
| `[Zheng2023_LLMJudge]` | LLM judge 85% agreement; position/verbosity/self bias; mitigations | A | full_text |
| `[Wang2024_NotFairEvaluators]` | order hacking; MEC/BPC/HITL | A | abstract |
| `[Panickssery2024_SelfPreference]` | self-recognition → self-preference | A | full_text |
| `[Chen2024_MLLMJudge]` | MLLM: pair ดี, scoring/ranking ห่างคน | A | abstract |
| `[Huang2024_AesBench]` | MLLM aesthetic perception rudimentary | B | abstract |
| `[Stureborg2024_Inconsistent]` | familiarity, anchoring, inconsistent | B | abstract |
| `[Chen2024_HumansOrLLMs]` | authority/beauty/misinformation bias ทั้งคนและ LLM | A | abstract |
| `[Ye2025_CALM]` | 12 bias, perturbation framework | A | abstract |
| `[Liu2023_GEval]` | CoT form-filling; เอียงไปข้อความ LLM | A | abstract |
| `[Huang2024_NoSelfCorrect]` · `[Kamoi2024_SelfCorrectSurvey]` | self-correction ต้องมี feedback ภายนอก | A | full_text · abstract |
| `[Gu2024_LLMJudgeSurvey]` | survey ความน่าเชื่อของ LLM judge | B | abstract |
| `[KahnemanLovalloSibony2019_MAP]` | Mediating Assessments Protocol, delay intuition | B | search_summary |
| `[Goldman2010_NDPR_Carroll]` | Carroll: criticism = reasoned evaluation; intentionalism + ข้อโต้แย้ง | B | full_text |
| `[Barrett1994_CriticizingArt]` | principles of interpretation | B | search_summary |
| `[Feldman1967_Varieties]` · `[GVSU_FeldmanModel]` | 4 ขั้น D-A-I-J | B · D | bibliographic · full_text |
| `[DePiles1708_Balance]` | rubric 4 เกณฑ์ 0–20 ปี 1708 | B | search_summary |
| `[Anthony1991_DesignJuries]` | วิจัย jury 900+ คน | B | search_summary |
| `[Britannica_ArtCriticism]` | ประวัติการวิจารณ์ศิลปะ | C | search_summary |
| `[Catmull2014_Braintrust]` | Braintrust ไม่มีอำนาจ ผู้กำกับตัดสิน | C | search_summary |
| `[IowaWW_History]` | workshop 1936 | C | search_summary |
| `[Lerman_CRP]` | CRP 4 ขั้น 3 บทบาท | D | publisher_page |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| ข้อกล่าวอ้าง | ความแข็งแรง | เหตุผล / ข้อโต้แย้ง |
|---|---|---|
| feedback ช่วยโดยเฉลี่ยแต่ทำร้ายได้บ่อย | **high** | meta-analysis ใหญ่ `[KlugerDeNisi1996]` + synthesis `[HattieTimperley2007]`; ข้อจำกัด: งานเก่า หลายงานเป็น lab/การศึกษา; วิธีรวม effect size ของ Hattie มีคนวิจารณ์ (ไม่ได้ทบทวนที่นี่) |
| feedback ที่ชี้ไปที่ตัวคน (praise/blame) ได้ผลน้อย | **high** | praise 0.14, praise-about-task 0.09 `[HattieTimperley2007]` |
| feedback ที่บอกการเปลี่ยนแปลงจากครั้งก่อนดีกว่า | **medium** | 0.55 vs 0.28 (moderator เดียว) `[HattieTimperley2007]` |
| specificity ช่วยระยะสั้น ทำร้ายการเรียนรู้ระยะยาว | **medium** | 1 ชุด lab `[GoodmanWoodHendrickx2004]`; ผลขึ้นกับว่าเรียนอะไร (บทความคู่ของผู้เขียนกลุ่มเดียวกัน, search-level) |
| rubric ทำให้ novice critique ใกล้ expert | **medium** | 1 การทดลอง วัด "perceived value" ไม่ใช่การพัฒนาจริง `[Yuan2016_AlmostExpert]` |
| ผู้สร้างประเมินงานตัวเองสูงเกิน | **medium–high** | field + lab `[Berg2016_CreativeHighwire]`; IKEA `[NortonMochonAriely2012]`; ข้อโต้: Silvia 2008 พบคนเลือกไอเดียตัวเองดีที่สุดได้พอใช้ `[Silvia2008_Discernment]` → "เลือก" ≠ "ทำนายผลกับผู้ชม" |
| Dunning–Kruger | **low–medium (contested)** | artefact `[GignacZajenkowski2020]` vs เล็กแต่จริง `[Dunkel2023_DKReplication]` — **ห้ามใช้เป็นข้ออ้างว่าผู้ใช้/ผู้สร้าง "ไม่รู้ว่าตัวเองไม่รู้"** |
| halo effect | **high** (ปรากฏการณ์) / medium (ขนาด) | ตั้งแต่ 1920 `[Thorndike1920_Halo]`; การทดลองคลาสสิกขนาดเล็ก `[NisbettWilson1977_Halo]` |
| order/serial position ในคณะกรรมการ | **medium–high** | field data หลายการแข่งขัน `[BruineDeBruin2005_LastDance]`; LLM เช่นกัน `[Zheng2023_LLMJudge]` `[Wang2024_NotFairEvaluators]` |
| blind review ลด bias | **medium (context-dependent)** | `[GoldinRouse2000_Blind]` มีข้อวิจารณ์เรื่องความแม่น; ผลกลับทิศในบางบริบท |
| ผู้ตัดสินผู้เชี่ยวชาญเห็นตรงกันต่ำในหลายสาขา | **high** (peer review) | `[Bornmann2010_PeerReviewIRR]`; CAT ทำได้สูงกว่าเมื่อคุมวิธี `[CsehJeffries2019_ScatteredCAT]` |
| LLM judge ใกล้มนุษย์ในเฉลี่ย | **medium** | 85% vs 81% (non-tie) `[Zheng2023_LLMJudge]` — โมเดลปี 2023, งาน chat; MLLM ห่างในการให้คะแนน `[Chen2024_MLLMJudge]` |
| LLM judge มี position bias | **high** | ทำซ้ำหลายทีม `[Zheng2023_LLMJudge]` `[Wang2024_NotFairEvaluators]` `[Ye2025_CALM]` `[Chen2024_MLLMJudge]` |
| LLM judge มี self-preference | **medium** | Zheng: "ยังสรุปไม่ได้"; Panickssery: มีและสัมพันธ์กับ self-recognition (summarisation) `[Panickssery2024_SelfPreference]`; G-Eval สังเกตเบื้องต้น `[Liu2023_GEval]` |
| LLM judge ด้าน aesthetic ยังอ่อน | **medium** | AesBench `[Huang2024_AesBench]` (preprint, ต้นปี 2024 — โมเดลใหม่อาจดีขึ้น **ยังไม่ได้ทดสอบ**) |
| self-correction ไม่มี feedback ภายนอกไม่ช่วย | **medium–high** (reasoning) / **low** (aesthetic — ยังไม่มีงานตรง) | `[Huang2024_NoSelfCorrect]` `[Kamoi2024_SelfCorrectSurvey]` |
| Lerman CRP / Braintrust ได้ผล | **low (เชิงประจักษ์)** | เป็น practice ที่มีผู้ใช้มาก แต่ **ไม่พบงานวิจัยควบคุม** วัดผล — ใช้เป็น craft |
| Feldman D-A-I-J ปรับปรุงคุณภาพการวิจารณ์ | **low (เชิงประจักษ์)** | เป็นกรอบการสอน; มีข้อวิจารณ์ว่าเน้น formal จนละเลยบริบทสังคม (Anderson, ไม่ได้อ่าน — 403) |
| kreng jai ทำให้ feedback ในไทยไหลจากบนลงล่าง | **medium (qualitative, 1 site)** | `[Areemit2021_KrengJai]` การแพทย์ |

**ปัญหา replication / ความน่าเชื่อที่ต้องรู้:**
- Ariely (ผู้เขียนร่วม IKEA effect) มีงานอื่นถูกตรวจสอบเรื่องข้อมูล — paper IKEA effect ไม่พบว่าถูกถอน แต่ **ไม่ได้ตรวจ replication อิสระ** ในรอบนี้ → ใช้ระดับ medium–high ไม่ใช่ high
- ตัวเลข LLM-judge เปลี่ยนเร็วตามรุ่นโมเดล — **ทิศทาง** ของ bias (order, length, self) ทำซ้ำได้หลายทีม แต่ **ขนาด** ใช้ไม่ได้ข้ามรุ่น ต้องวัดของเราเอง (our test, §6.4)
- งาน feedback ส่วนใหญ่วัด performance/learning ของผู้รับ ไม่ได้วัด "คุณภาพงานสร้างสรรค์ชิ้นถัดไป" ตรง ๆ — ยกเว้น Dow2010 (โฆษณา, CTR) และ Berg (การทำนายผู้ชม)

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 Generic — Independent Critique Protocol (ICP) 7 ขั้น
ใช้ร่วมกับ CRITIQUE_PROTOCOL (T/C/P) — ไฟล์นั้นบอกจัดชั้น ไฟล์นี้บอก **ใครวิจารณ์ ด้วยข้อมูลอะไร และกันอคติอย่างไร**

1. **แยกบทบาท** — maker ≠ critic ≠ decider. critic ให้ notes; owner (ผู้ใช้/ผู้กำกับ) ตัดสิน `[Catmull2014_Braintrust]` `[Berg2016_CreativeHighwire]`
2. **สร้าง packet ที่ "เย็น" (cold packet)** — ใส่: งาน, brief (เป้า/ผู้ชม/แพลตฟอร์ม), house rules, reference ภายนอก (ภาพสินค้าจริง, script, character bible), rubric. **ไม่ใส่:** เหตุผล/ความภูมิใจ/คะแนนตัวเองของ maker, ป้าย "เวอร์ชันใหม่", ชื่อโมเดลที่สร้าง `[Panickssery2024_SelfPreference]` `[NortonMochonAriely2012]`
3. **Describe → Analyse → Interpret → Judge** ตามลำดับ; ห้ามคำตัดสินในขั้น describe `[GVSU_FeldmanModel]`; ให้คะแนนแต่ละเกณฑ์ก่อน total `[KahnemanLovalloSibony2019_MAP]` `[Thorndike1920_Halo]`
4. **Evidence ก่อนคะแนน** — ทุก issue มี WHERE ที่ตรวจซ้ำได้ + WHY (กฎ/key/craft) `[Wang2024_NotFairEvaluators]` `[Chen2024_MLLMJudge]`
5. **ใช้การวัดภายนอก** — tools วัด (contrast, safe zone, loudness, CER, ffprobe), เทียบกับ reference `[Zheng2023_LLMJudge]` (reference-guided) `[Kamoi2024_SelfCorrectSurvey]`
6. **ถ้ามีหลาย variant → pairwise, สลับลำดับ, blind** — นับชนะเฉพาะที่ชนะทั้ง 2 ลำดับ, ปิดป้าย `[Zheng2023_LLMJudge]` `[BruineDeBruin2005_LastDance]` `[Dow2010]`
7. **ส่ง feedback แบบ goal → gap → next**; จัดลำดับ critical ก่อน; ไม่ praise/blame ตัวคน; บอกการเปลี่ยนแปลงจากเวอร์ชันก่อน `[HattieTimperley2007]` `[KlugerDeNisi1996]`

### 6.2 Feedback ที่เขียนดี vs ไม่ดี (generic)
| ไม่ดี | ทำไม | ดี |
|---|---|---|
| "ภาพยังไม่ปัง" | self/อารมณ์, ไม่มี where/fix | "จุดสว่างสุดอยู่ที่หน้าต่างมุมขวาบน ไม่ใช่สินค้า (analyze_image peak #1) → ลด exposure หน้าต่าง 1 stop หรือ crop ออก" |
| "เก่งมาก ชอบ" | praise ไม่มีข้อมูล (0.14/0.09) `[HattieTimperley2007]` | "hook 2 วิแรกได้ผลเพราะคำถามตรงปัญหาผู้ชม — เก็บโครงนี้ไว้ใน template" (FR/process) |
| รายการ 25 ข้อเท่ากันหมด | ไม่จัดลำดับ, too-specific FT `[HattieTimperley2007]` | 1–3 critical/major ก่อน + กลุ่ม polish ท้าย |
| "ควรใช้ฟ้าแทนเขียว" (ชั้น P พูดเป็นคำสั่ง) | ผิดชั้น | "ทางเลือก (P): ถ้าอยากเย็นลง ลองฟ้า — ทั้งคู่ผ่าน T/C" |
| critique ยาวมากเพื่อดูละเอียด | verbosity ≠ คุณภาพ `[Zheng2023_LLMJudge]` | สั้น เจาะจง มี key |

### 6.3 สำหรับสตูดิโอ (TIME OPTIC / Slowly Growing / story clips / TTS)
**ก. Mint & Tao story carousel (charcoal, ไทย 1:1)**
- packet: สไลด์ PNG ทั้งชุด + script ไทย + character bible + กฎ "ไม่มีโลโก้" (quote images) + memory ของ error เก่า (สระ/วรรณยุกต์, ตัวละครเพี้ยน)
- critic ตอบ 3 คำถาม Hattie ต่อเรื่องทั้งชุด: เป้า (อารมณ์/ข้อคิดที่ตั้งไว้) → ตอนนี้ (สไลด์ไหนพาไปถึง/ไม่ถึง) → ต่อไป (แก้สไลด์ไหน)
- T: คำไทยผิด, bubble ล้น, ตัวละครหน้าเพี้ยน (เทียบ bible — reference-guided); C: จังหวะ setup→turn→payoff; P: น้ำหนักเส้นถ่าน
- ใช้ **Statements of Meaning (CRP step 1)** ก่อน: "สไลด์ 4 ตรงที่ Tao เงียบ ให้ความรู้สึกเหงาชัด" → บอก maker ว่าอะไร "ต้องเก็บไว้" กันการแก้จนเสียของดี `[Lerman_CRP]` (craft)

**ข. Story clip + TTS ไทย**
- แยก critic เสียง: qc.py (CER, loudness, clipping) = การวัดภายนอก; คนไทยฟัง tone = human judge (AI ฟังวรรณยุกต์ไม่น่าเชื่อ — **(our test)** ยังไม่ได้วัด)
- ถ้ามี 2 take: ฟังแบบ blind สลับลำดับ, ให้ AI ตัดสินแบบ pairwise "take ไหนเน้นคำ X ถูก" ดีกว่าให้คะแนน 0–10 `[Chen2024_MLLMJudge]`

**ค. คลิป/โพสต์สินค้าแว่น**
- reference ภายนอกที่สำคัญที่สุด = **ภาพถ่ายกรอบจริง** → critic เทียบรูปทรง/สี/โลโก้/สีเลนส์ (critical failure ใน MASTER_QUALITY_SCORE) — นี่คือ reference-guided grading ที่ลด error มากที่สุดใน Zheng `[Zheng2023_LLMJudge]`
- กฎบ้าน (โลโก้แบรนด์กรอบซ้ายบน, TIMEOPTIC wordmark เคลื่อนไหว, ไม่มี line art ในคลิป, English-only ในคลิปสินค้า) อยู่ใน packet เป็น checklist ชั้น T
- ภาพจาก Codex/FLUX หลายภาพ: critic ดูแบบ **ไม่รู้ว่าภาพไหนมาจาก provider ไหน** (label effect + self-preference) `[Panickssery2024_SelfPreference]`

**ง. Caption / prompt ที่ Claude เขียนเอง**
- ความเสี่ยงสูงสุดของ self-preference: Claude เขียน caption แล้ว Claude ตัดสิน → ต้องเป็น fresh sub-agent ที่ไม่เห็น reasoning + ถ้าเป็นไปได้เทียบกับ caption ทางเลือกแบบ blind `[Panickssery2024_SelfPreference]` `[Huang2024_NoSelfCorrect]`

### 6.4 (our test) — Calibration ของ critic ในสตูดิโอ: วิธีวัด bias ของเราเอง
ยังไม่ได้ทำ — ขั้นตอนที่เสนอ:
1. **Position test:** 10 คู่ภาพ ตัดสิน 2 ลำดับ → % consistency (เป้า ≥ 80%; ถ้าต่ำ → ใช้ "ชนะทั้ง 2 ลำดับ" เสมอ)
2. **Length test:** critique ฉบับยาว vs สั้นที่มี issue เดียวกัน → ให้ critic ตัวที่สองเลือก → ถ้าเลือกยาวบ่อย = verbosity bias
3. **Label test:** ภาพเดียวกัน ติดป้าย "AI" vs "ช่างภาพ" → คะแนนต่าง? `[Chen2024_HumansOrLLMs]` `[Ye2025_CALM]`
4. **Agreement with user:** บันทึกการเลือกของผู้ใช้เทียบ verdict ของ critic 20 ครั้ง → % agreement; ถ้าต่ำในชั้น P → ลดน้ำหนัก P ของ AI
5. บันทึกผลใน `creative-intelligence/evaluations/` และ LESSONS_LEARNED

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

### 7.1 Pixar Braintrust — แยก "ผู้ให้ notes" ออกจาก "ผู้ตัดสิน"
- **documented:** กลุ่มผู้กำกับ/คนเล่าเรื่องดู cut ระหว่างทาง ให้ความเห็นตรง แต่ **ไม่มีอำนาจ** ผู้กำกับไม่ต้องทำตาม; HBR 2008 สรุปว่าวาง creative authority ไว้ที่หัวหน้าโปรเจกต์ไม่ใช่ผู้บริหาร `[Catmull2014_Braintrust]` (แหล่งรอง — ฉบับเต็มเข้าไม่ได้)
- **analysis ของเรา:** เป็นการแยก critic ↔ decider ที่ลดแรงจูงใจให้ปกป้องตัวเอง (FIT: ไม่ดึง attention ไปที่ self) `[KlugerDeNisi1996]`; และใช้ peer creators เป็น critic ซึ่ง Berg พบว่าแม่นกว่า manager `[Berg2016_CreativeHighwire]`
- **ข้อจำกัด:** เป็นเรื่องเล่าของคนใน ไม่มีกลุ่มควบคุม

### 7.2 Blind auditions ของวงออร์เคสตรา
- **documented:** ฉากกั้นในรอบคัดเลือก + ข้อมูลจริง: ผู้หญิงผ่านรอบแรกเพิ่ม ~50%; อธิบาย 30–55% ของสัดส่วนผู้หญิงที่จ้างใหม่ที่เพิ่มขึ้น `[GoldinRouse2000_Blind]`
- **ข้อควรระวัง:** ความแม่นทางสถิติถูกวิจารณ์ — ใช้เป็นตัวอย่างของ "ลบ cue ที่ไม่เกี่ยวกับคุณภาพ" ไม่ใช่ตัวเลขที่แน่นอน
- **นำมาใช้:** ซ่อนผู้สร้าง/provider/เวอร์ชันจาก critic

### 7.3 Parallel prototyping + comparative critique
- **documented:** ผู้ที่ทำโฆษณาหลายแบบก่อนรับ feedback ได้ผล CTR และคะแนนผู้เชี่ยวชาญดีกว่ากลุ่มที่รับ critique ทีละชิ้น, งานหลากหลายกว่า, self-efficacy เพิ่ม `[Dow2010]`
- **นำมาใช้:** carousel/คลิป: ทำ 2–3 hook แล้ววิจารณ์เทียบ ไม่ใช่ขัดเกลาชิ้นเดียว

### 7.4 MT-Bench / Chatbot Arena — ทำ AI judge ให้น่าเชื่อขึ้นด้วยกระบวนการ
- **documented:** swap positions, few-shot, CoT, reference-guided ลด error; reference-guided ลดการตัดสินคณิตผิดจาก 70% → 15%; GPT-4 เห็นตรงกับคน 85% (non-tie) `[Zheng2023_LLMJudge]`
- **นำมาใช้:** critic ของสตูดิโอต้องได้ reference (ภาพสินค้าจริง, bible, script) — ตรงกับ creative-critic packet

### 7.5 Crowd critique ด้วย rubric
- **documented:** novice + rubric ได้ critique ที่นักออกแบบให้ค่าเท่า expert; rubric เพิ่มความเจาะจงและน้ำเสียงบวก `[Yuan2016_AlmostExpert]`
- **นำมาใช้:** rubric ที่ชัดทำให้ AI critic หรือเพื่อนของผู้ใช้ (ไม่ใช่ผู้เชี่ยวชาญ) วิจารณ์ได้มีประโยชน์

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 Design jury ที่กลายเป็น monologue (real, documented)
- **อะไร:** โรงเรียนสถาปัตย์ในอังกฤษ — critic ใช้ paradigm ส่วนตัว ใช้คำรุนแรง ("mumbo jumbo", "rubbish"), นักศึกษาไม่เข้าใจภาษาของ critic, ตอบสนองโดย "วาดตาม sketch ของอาจารย์" ลดการเสี่ยง `[Webster2006_DesignJury]`
- **ทำไม:** critic มีอำนาจให้คะแนน + วิจารณ์ตัวคน/ความเชื่อ + ไม่ผูกกับ learning outcome ที่ประกาศ
- **บทเรียน:** วิจารณ์เทียบ brief, ภาษาธรรมดา, ไม่ใช้คำตัดสินตัวคน — ไม่งั้นผู้สร้าง (หรือ AI pipeline ที่ถูก tune ตาม critic) จะเล่นปลอดภัยจนงานจืด

### 8.2 LLM judge ที่ถูก "hack" ด้วยลำดับ (real, documented)
- **อะไร:** แค่สลับลำดับคำตอบ Vicuna-13B ชนะ ChatGPT 66/80 โดยมี ChatGPT เป็นกรรมการ `[Wang2024_NotFairEvaluators]`
- **บทเรียน:** การเปรียบเทียบ A/B ด้วย AI ครั้งเดียวไม่มีความหมาย — ต้อง 2 ลำดับเสมอ

### 8.3 Self-correction ที่ทำให้แย่ลง (real, documented)
- **อะไร:** ขอให้โมเดล "ทบทวนคำตอบ" โดยไม่มีข้อมูลใหม่ → เปลี่ยนคำตอบถูกเป็นผิด (GPT-3.5 CSQA 75.8 → 38.1) `[Huang2024_NoSelfCorrect]`
- **typical failure ในสตูดิโอ (labelled typical, ไม่ใช่เหตุการณ์จริงที่บันทึกไว้):** ขอให้ AI "หาจุดแก้อีก" กับภาพที่ผ่านแล้ว → AI คิดปัญหาขึ้นมาเอง (เช่น "เพิ่ม rim light") แล้ว maker แก้จนเสีย hierarchy เดิม
- **บทเรียน:** critic ต้องได้รับอนุญาตให้ตอบว่า **"ผ่าน ไม่มี issue ระดับ major"**; ทุก issue ต้องมี WHERE ตรวจได้

### 8.4 Feedback ที่ทำร้าย performance (research-level)
- **อะไร:** >1/3 ของ feedback interventions ลด performance; discouraging feedback −0.14 `[KlugerDeNisi1996]` `[HattieTimperley2007]`
- **บทเรียน:** การวิจารณ์ไม่ใช่ "ยิ่งแรงยิ่งดี"; ต้องบอกทางแก้และการเปลี่ยนแปลงจากครั้งก่อน

### 8.5 Rubric ที่ฝังรสนิยมผู้ตั้ง (historical + typical)
- **อะไร:** Balance des peintres ของ de Piles ให้คะแนนจิตรกรตามเกณฑ์ที่สะท้อนฝ่าย colourist; Hogarth ล้อ `[DePiles1708_Balance]` (การตีความว่าสะท้อนสำนักเป็น analysis ของเรา)
- **typical ในสตูดิโอ:** score.py ที่ให้น้ำหนัก "originality" ต่ำในโพสต์สินค้า → งานใหม่ ๆ ถูกตัดตกตลอด ทั้งที่ Berg พบว่างาน novel บางชิ้นคือ hit ที่ manager มองข้าม `[Berg2016_CreativeHighwire]`; AI critic มี familiarity bias ซ้ำเติม `[Stureborg2024_Inconsistent]`
- **บทเรียน:** เขียน weights ลงก่อน, ทบทวนกับผลจริง (saves/comments/การเลือกของผู้ใช้), เก็บช่อง "novel but risky" แยก

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

### 9.1 วัฒนธรรม: ไทย vs ตะวันตก
- **Hierarchy + kreng jai:** ในบริบทการแพทย์ไทย feedback ไหลบนลงล่าง ผู้น้อยไม่ค่อยขอ/ให้ feedback เพราะเกรงใจ; แต่ผู้เรียน **ยอมรับ feedback แรงได้ถ้ามีข้อเสนอแนะทางแก้**; feedback น่าเชื่อเมื่อผู้ให้รู้ว่าผู้รับพยายามแค่ไหน `[Areemit2021_KrengJai]`
- **นัยสำหรับสตูดิโอ (DERIVED):** (ก) ผู้ใช้เป็นเจ้าของร้าน — คนที่ผู้ใช้ส่งงานให้ดู (พนักงาน เพื่อน) อาจไม่กล้าติ → ถามคำถามกลางแบบเจาะจง (CRP step 3) แทน "ดีไหม" `[Lerman_CRP]`; (ข) critique ที่ Claude ส่งผู้ใช้: **ปัญหา + ทางแก้คู่กันเสมอ**, สั้น, ภาษาไทย; (ค) อย่าตีความ "ก็โอเค" ของผู้ใช้หรือคนดูว่า "ผ่าน" — อาจเป็นความเกรงใจ (opinion — ยังไม่ได้วัด)
- งานวิจัย feedback ส่วนใหญ่ (Kluger, Hattie, Goodman) มาจากตะวันตก — **ทิศทาง** (อย่าวิจารณ์ตัวคน) น่าจะใช้ได้ แต่ **ความตรง** ที่ยอมรับได้ต่างกัน (Areemit: "one size feedback training does not fit all")

### 9.2 แพลตฟอร์ม
- IG/FB feed: ผู้ชมตัดสินใน < 1 วินาที → critic ต้องดูที่ขนาดฟีด/thumbnail (มีใน CRITIQUE_PROTOCOL) — critique ขนาดเต็มจอให้ผลต่าง
- IG Reels/TikTok 9:16: safe zone เป็นชั้น T; hook 2 วิแรกเป็นชั้น C
- งานที่ผู้ชม "ตัดสินจริง" ได้ (ยอด save, ยอดแชท) → ข้อมูลจริงมีน้ำหนักกว่า critic ทุกคน (Hume joint verdict + test of time ใน M06)

### 9.3 ประเภทงาน (genre)
- **งานศิลปะ/เรื่องเล่า (Mint & Tao):** Barrett — หลายการตีความดีได้พร้อมกัน; critic ไม่ควรบังคับความหมายเดียว `[Barrett1994_CriticizingArt]`; Carroll local principles ขึ้นกับ genre (เช่น pratfall ดีสำหรับ slapstick) `[Goldman2010_NDPR_Carroll]`
- **งานโฆษณา/สินค้า:** success value ตาม brief ชัดกว่า → ชั้น T/C มีน้ำหนักมาก
- **งานใหม่/ทดลอง:** critic (ทั้งคนแบบ manager และ AI ที่มี familiarity bias) มีแนวโน้มลงโทษความใหม่ `[Berg2016_CreativeHighwire]` `[Stureborg2024_Inconsistent]` → เพิ่มคำถาม "ความแปลกนี้มีมือจับให้เข้าใจไหม" แทน "แปลก = ผิด"

### 9.4 ผู้รับ critique
- **ผู้สร้างมือใหม่/AI pipeline ใหม่:** task-level ชัด ๆ ก่อน; **ผู้ชำนาญ/pipeline ที่นิ่งแล้ว:** process/self-regulation (กฎ, template) `[HattieTimperley2007]` (การจับคู่ระดับกับความชำนาญเป็นการตีความเชิงการสอนของแหล่งรอง ไม่ใช่ผลในบทความ)
- **ขั้นงาน:** concept (ต้นน้ำ) → CRP/Braintrust แบบเปิด, ไม่ให้คะแนน; ก่อนส่ง (ปลายน้ำ) → checklist + rubric + critical failures

### 9.5 เมื่อ "ไม่ควร" แยก critic
- งานเล็กมาก/ด่วน (แก้ typo ตามสั่ง) — ใช้ checklist อัตโนมัติพอ
- เมื่อผู้ใช้ขอความเห็นจาก Claude ตรง ๆ ระหว่างทำ — ตอบได้ แต่ติดป้ายว่าเป็น "ความเห็นของ maker" ไม่ใช่ critique อิสระ (craft)

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| domain | เชื่อมอย่างไร |
|---|---|
| 01 creative thinking | divergent (สร้าง) vs convergent (ประเมิน) — Berg: คนที่ทำทั้งสองอย่างทำนายงานใหม่ได้ดีกว่า `[Berg2016_CreativeHighwire]`; parallel prototyping `[Dow2010]` → แยกเฟสสร้าง/ตัดสิน |
| 02 psychology & EI | IKEA, bias blind spot, FIT/self-threat → วิธีส่ง critique ให้ผู้ใช้ไม่รู้สึกถูกตัดสินตัวตน |
| 03 aesthetic intelligence | ชั้น P (รสนิยม) — AI aesthetic perception ยังอ่อน `[Huang2024_AesBench]` → P ให้ผู้ใช้/ผู้ชมตัดสิน; ลิงก์ M06 |
| 04 visual language | WHERE ในภาพต้องใช้ศัพท์ visual grammar (focal point, value, line) ที่ตรวจได้ |
| 05 semiotics | Interpretation step (Feldman/Barrett): เสนอความหมายพร้อมหลักฐาน, ยอมรับหลายการตีความ |
| 06 character psychology | reference-guided: character bible = reference ภายนอกของ critic |
| 07 worldbuilding & continuity | critic ตรวจ continuity เทียบ episode ก่อน (reference) — งานที่ AI ทำได้ดีเพราะมีคำตอบ |
| 08 philosophy & literature | Carroll (reasoned evaluation, intentionalism), Barrett (interpretation as argument), Hume/Kant (M06) |
| 09 cultural studies | kreng jai, hierarchy `[Areemit2021_KrengJai]`; jury ที่ลงโทษ Feng Shui ของนักศึกษาเอเชีย `[Webster2006_DesignJury]` = bias ทางวัฒนธรรมของ critic |
| 10 psychoacoustics | critique เสียง: qc.py (ภายนอก) + human tone check; blind A/B take |
| 11 consumer psychology | ผลจริงกับผู้ชม (CTR, saves) เป็น ground truth ที่ critic ต้องถูก calibrate ด้วย; Dow2010 ใช้ CTR |
| 13 quality assurance & evaluation | rubric, IRR, severity, critical failures — domain 13 = "วัดอย่างไร", domain 12 = "ใครวัดและกันอคติอย่างไร" |
| 14 knowledge management | บันทึก verdict + ผลจริง → calibration (§6.4); "feedback about change from previous trials" 0.55 → เก็บประวัติเวอร์ชัน |
| 15 workflow automation | creative-critic skill: packet → fresh sub-agent → critique.json; swap-order และ blind ทำอัตโนมัติได้ |

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 ใครควรเป็น critic
| สถานการณ์ | critic | เหตุผล |
|---|---|---|
| ตรวจชั้น T (สะกด, สินค้าเพี้ยน, safe zone, loudness) | tools + AI critic sub-agent สด + checklist | มีคำตอบถูก/ผิด, ใช้ reference ได้ `[Zheng2023_LLMJudge]` |
| ชั้น C (fit กับ brief/ผู้ชม) | AI critic สด + หลักฐานจาก domain อื่น; ถ้าเป็นงานสำคัญ → ผู้ใช้ | AI พอใช้เมื่อมี brief ชัด |
| ชั้น P (รสนิยม) | ผู้ใช้ หรือ A/B กับผู้ชมจริง | AI aesthetic อ่อน `[Huang2024_AesBench]`; ความต่าง blameless |
| งานที่ Claude สร้าง prompt/caption เอง | sub-agent สดที่ไม่เห็น reasoning; ถ้าทำได้ โมเดลอื่น/ผู้ใช้ตัดสินสุดท้าย | self-preference `[Panickssery2024_SelfPreference]` |
| Concept ต้นน้ำ | CRP-style: statements of meaning + neutral questions, ไม่ให้คะแนน | ไม่ฆ่าไอเดียใหม่ `[Lerman_CRP]` `[Berg2016_CreativeHighwire]` |

### 11.2 if/then rules
- **ถ้า** มี ≥ 2 variant → pairwise, 2 ลำดับ, blind; ชนะ = ชนะทั้ง 2 ลำดับ; ไม่งั้น = เสมอ → ส่งผู้ใช้เลือก `[Zheng2023_LLMJudge]` `[Wang2024_NotFairEvaluators]`
- **ถ้า** มีงานเดียว → criterion-by-criterion ก่อน total; total เขียนท้ายสุด `[KahnemanLovalloSibony2019_MAP]`
- **ถ้า** critic ให้ issue ที่ไม่มี WHERE ตรวจได้ → ลด confidence เป็น low และไม่บังคับแก้ `[Chen2024_MLLMJudge]`
- **ถ้า** critic กับ tool วัดขัดกัน (เช่น critic ว่า contrast พอ แต่ tool วัด 3.2:1) → เชื่อ tool ในชั้น T
- **ถ้า** critic รอบที่ 2 พบ issue ใหม่ที่รอบแรกไม่เห็นในงานที่ไม่ได้เปลี่ยนส่วนนั้น → สงสัย "หาเรื่อง" (manufactured issue) — ตรวจ WHERE ด้วยตา `[Huang2024_NoSelfCorrect]` (DERIVED)
- **ถ้า** ไม่มี critical/major → ส่งได้; polish เป็นตัวเลือก ไม่ใช่เงื่อนไข
- **ถ้า** ผู้ใช้ไม่เห็นด้วยกับ critic → ผู้ใช้ชนะ (decider); บันทึกเพื่อ calibrate §6.4 `[Catmull2014_Braintrust]`
- **ถ้า** issue เดิมเกิดซ้ำ ≥ 2 งาน → ยกระดับจาก task-level fix เป็น process fix (แก้ template/prompt/กฎ memory) `[HattieTimperley2007]` `[GoodmanWoodHendrickx2004]`
- **ถ้า** งานแปลกใหม่และ critic ให้คะแนนต่ำโดยเหตุผลคือ "ไม่คุ้น/ไม่ตาม convention" → แยกเป็นชั้น P/C และเสนอทดสอบจริง แทนตัดทิ้ง `[Berg2016_CreativeHighwire]` `[Stureborg2024_Inconsistent]`
- **ถ้า** ต้องให้คะแนนเทียบกับเวลาก่อน → ใช้ critic config เดิม (prompt, model, rubric) ไม่งั้นคะแนนไม่เทียบกัน `[Stureborg2024_Inconsistent]`

### 11.3 ตาราง bias → การควบคุม (คน + AI)
| bias | คน | AI | การควบคุม |
|---|---|---|---|
| self/IKEA | ✓ | ✓ (self-preference) | maker ≠ critic; ซ่อนผู้สร้าง |
| halo | ✓ | ✓ (anchoring multi-attr) | ให้คะแนนแยกเกณฑ์, total ท้าย |
| order/position | ✓ | ✓ | สุ่ม + สลับ + บันทึก |
| length/verbosity | ✓ (Chen) | ✓ | ให้คะแนนตามเกณฑ์ ไม่ใช่ความยาว |
| label/authority | ✓ | ✓ | blind, ลอกป้าย |
| familiarity / anti-novelty | ✓ (manager) | ✓ (perplexity) | ช่อง novel แยก + ทดสอบจริง |
| bias blind spot | ✓ | — (AI "บอก" ว่าเป็นกลางได้เสมอ) | เชื่อกระบวนการ ไม่เชื่อคำประกาศ |

---

## 12. แบบฝึกหัด (Exercises)

1. **(ง่าย) แปลง feedback** — เขียนใหม่ 5 คอมเมนต์คลุมเครือ ("ยังไม่ปัง", "สีแปลก", "ดีมาก", "อ่านยาก", "ไม่ค่อยเข้าแบรนด์") ให้เป็น located finding ครบ 8 ช่อง (§2.3)
   *คำตอบดีแสดง:* WHERE ที่ชี้ได้จริง, WHY ผูก brief/key, FIX + side effect, ติดชั้น T/C/P ถูก และ "ดีมาก" ถูกแปลงเป็นสิ่งที่ "ต้องเก็บไว้" พร้อมเหตุผล
2. **(ง่าย) Describe ห้ามตัดสิน** — บรรยายสไลด์ Mint & Tao 1 ภาพ 8 ประโยคโดยไม่ใช้คำประเมินเลย
   *ดี:* ไม่มี "สวย/ดี/แปลก"; มี value, focal point, ตำแหน่ง bubble, ท่าทางตัวละคร
3. **(กลาง) Position test** — ให้ AI critic เทียบ 2 caption ใน 2 ลำดับ 5 คู่ บันทึก consistency
   *ดี:* รายงาน % consistency, แยกคู่ที่ flip, ตัดสินคู่ที่ flip เป็นเสมอและส่งผู้ใช้; อ้าง `[Zheng2023_LLMJudge]`
4. **(กลาง) Cold packet** — สร้าง packet สำหรับคลิปแว่นโดยตัดทุกอย่างที่ทำให้ critic เอียงออก
   *ดี:* ไม่มี reasoning/คะแนนของ maker, ไม่มีป้าย provider/เวอร์ชัน, มีภาพกรอบจริง + house rules + brief + rubric; อธิบายเหตุผลแต่ละการตัดด้วย key
5. **(กลาง) CRP session** — จำลอง 4 ขั้น CRP กับ storyboard story clip: 3 statements of meaning, 3 คำถามจาก maker, 3 neutral questions, 2 opinions หลังขออนุญาต
   *ดี:* neutral questions ไม่มีความเห็นแฝง (ไม่ใช่ "ทำไมไม่ใช้…?"); opinion มีทางแก้
6. **(ยาก) Self-correction trap** — ให้งานที่ผ่านแล้วกับ critic 2 รอบ "หาเพิ่ม" แล้วตรวจว่า issue ใหม่จริงไหม
   *ดี:* แยก issue จริง vs manufactured ด้วยการตรวจ WHERE; สรุปกฎ "อนุญาตให้ผ่าน"; อ้าง `[Huang2024_NoSelfCorrect]`
7. **(ยาก) ออกแบบ calibration** — วางแผน 4 สัปดาห์วัด agreement ระหว่าง critic กับการเลือกของผู้ใช้และยอด save
   *ดี:* แยก T/C/P, จำนวนตัวอย่าง, ใช้อันดับ/คู่แทนคะแนนดิบ, เงื่อนไขปรับน้ำหนัก, ระวัง kreng jai ในการเก็บความเห็นคน
8. **(ยาก) วิจารณ์ rubric** — วิเคราะห์ weights ของ score.py profile `product_ad` แบบ de Piles: rubric นี้ฝังรสนิยมอะไร ลงโทษงานแบบไหน
   *ดี:* ชี้ originality 4/100 อาจกดงานใหม่, เสนอทางวัดกับผลจริง ไม่ใช่เปลี่ยนตามความชอบ

---

## 13. Checklist (ก่อนส่ง critique / ก่อนส่งงาน)

- [ ] critic ไม่ใช่ผู้สร้างงานชิ้นนี้ (หรือเป็น sub-agent สดที่ไม่เห็น reasoning ของ maker)
- [ ] packet มี brief (เป้า/ผู้ชม/แพลตฟอร์ม) + house rules + reference ภายนอกที่เกี่ยวข้อง (ภาพสินค้าจริง/bible/script)
- [ ] packet ไม่มีคะแนนตัวเอง ความภูมิใจ ป้าย provider/เวอร์ชัน ของ maker
- [ ] ทำ describe/analyse ก่อน judge; ให้คะแนนรายเกณฑ์ก่อน total
- [ ] ทุก issue มี WHERE ที่ตรวจซ้ำได้
- [ ] ทุก issue มี WHY (กฎ / key / craft ติดป้ายชัด)
- [ ] ทุก issue มี FIX และ side effect
- [ ] ทุก issue ติดชั้น T/C/P และ severity; ไม่มีชั้น P ที่เขียนเป็นคำสั่ง
- [ ] ชั้น T ที่วัดได้ ใช้ tool วัดจริง (ไม่ใช่ตาเดา)
- [ ] ถ้ามีหลาย variant: ตัดสินแบบ pairwise 2 ลำดับ และ blind
- [ ] critique ไม่มีคำตัดสินตัวคน (praise/blame) — มีแต่งานและขั้นต่อไป
- [ ] บอกสิ่งที่ "ทำงานได้ดีและต้องเก็บไว้" อย่างน้อย 1 ข้อ พร้อมเหตุผล
- [ ] จัดลำดับ: critical → major → minor → polish; ไม่เกิน ~3 major ที่ต้องแก้รอบนี้
- [ ] อนุญาตผลลัพธ์ "ผ่าน" ได้ (ไม่ manufacture issue)
- [ ] บอก confidence และสิ่งที่ critic ตัดสินไม่ได้ (เช่น วรรณยุกต์เสียง, รสนิยมผู้ใช้)
- [ ] ระบุการเปลี่ยนแปลงจากเวอร์ชันก่อน (ถ้ามี)
- [ ] ข้อความถึงผู้ใช้เป็นภาษาไทย สั้น ปัญหาคู่ทางแก้
- [ ] ผู้ตัดสินสุดท้าย (decider) ชัดเจน = ผู้ใช้

---

## 14. Evaluation Rubric (ประเมิน "คุณภาพของ critique" ไม่ใช่ของงาน)

| เกณฑ์ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **A. Independence & bias control** | maker ตัดสินงานตัวเอง หรือ critic เห็น reasoning/คะแนนของ maker | critic แยก แต่ packet มีป้าย/เวอร์ชัน; ไม่มีการคุมลำดับ | critic สด, ซ่อนป้าย, รายเกณฑ์ก่อน total | + pairwise 2 ลำดับ/blind เมื่อมี variant, บันทึกลำดับ, ระบุ bias ที่คุมไม่ได้ |
| **B. Location & specificity** | คำทั่วไป ("ยังไม่ดี") | บางข้อชี้ตำแหน่ง | ทุก issue มี WHERE | WHERE ตรวจซ้ำได้ + ค่าที่วัด (contrast, เวลา, px) |
| **C. Justification** | ไม่มีเหตุผล | เหตุผลเป็นความรู้สึก | อ้าง brief/กฎ/หลักการ | อ้าง key หรือ craft ติดป้ายถูก, แยก evidence vs opinion |
| **D. Actionability (goal–gap–next)** | ไม่มีทางแก้ | ทางแก้กว้าง | ทางแก้เจาะจงทุก major | + side effect, ลำดับความสำคัญ, process fix เมื่อผิดซ้ำ |
| **E. Layer & severity accuracy** | ไม่แยกชั้น/ severity | แยกแต่ผิดบ่อย (P เป็นคำสั่ง) | แยกถูกเกือบทั้งหมด | ถูกทั้งหมด + confidence สมเหตุผล + ยอมรับสิ่งที่ตัดสินไม่ได้ |
| **F. Tone & usability for receiver** | ตัดสินตัวคน/รุนแรง หรือยาวเกิน | กลาง ๆ แต่ยาว/ไม่จัดลำดับ | มุ่งที่งาน, จัดลำดับ, มีสิ่งที่ต้องเก็บไว้ | + เหมาะกับผู้รับ (ไทย สั้น ปัญหาคู่ทางแก้; maker/pipeline ได้ process fix) |

**วิธีให้คะแนน:** แต่ละเกณฑ์ 1–4, รวม 24; ≥ 20 = ใช้ได้เลย, 15–19 = แก้ critique ก่อนส่ง, < 15 = ทำ critique ใหม่ (critic สดตัวใหม่). ให้ critic ตัวที่สอง (ไม่ใช่ตัวที่เขียน critique) ให้คะแนน — ไม่งั้นคือ self-evaluation อีกชั้น

**Critical failures ของ critique (ข้อใดข้อหนึ่ง = critique ใช้ไม่ได้):**
- critic คือ maker หรือเห็น reasoning/self-score ของ maker
- มี issue critical/major ที่ไม่มี WHERE ตรวจได้ หรือ WHERE ผิด (hallucinated)
- พลาด critical failure ของ MASTER_QUALITY_SCORE ที่ตรวจได้ (สะกดไทยผิด, สินค้าเพี้ยน, ผิดกฎบ้าน)
- เปรียบเทียบ variant ด้วยลำดับเดียวแล้วสรุปผู้ชนะ
- อ้าง "งานวิจัยบอก" โดยไม่มี key หรือเป็นแค่ craft
- วิจารณ์ตัวผู้สร้าง (ความสามารถ/นิสัย) แทนงาน

---

## 15. แหล่งอ้างอิง (References)

- `[Amabile1982_CAT]` Amabile, T. M. (1982). Social psychology of creativity: A consensual assessment technique. *JPSP*, 43(5), 997–1013. https://doi.org/10.1037/0022-3514.43.5.997 — bibliographic (ผ่าน Cseh & Jeffries)
- `[Anthony1991_DesignJuries]` Anthony, K. H. (1991). *Design Juries on Trial: The Renaissance of the Design Studio*. Van Nostrand Reinhold. https://cuny.manifoldapp.org/read/edra-as-a-springboard-for-design-juries-on-trial-designing-for-diversity-defined-by-design — search_summary
- `[Areemit2021_KrengJai]` Areemit, R. S., Cooper, C. M., Wirasorn, K., Paopongsawan, P., Panthongviriyakul, C., & Ramani, S. (2021). Hierarchy, "Kreng Jai" and feedback: A grounded theory study exploring perspectives of clinical faculty and medical students in Thailand. *Teaching and Learning in Medicine*. https://doi.org/10.1080/10401334.2020.1813584 — abstract (Europe PMC)
- `[Barrett1994_CriticizingArt]` Barrett, T. (1994; rev. 1999). *Criticizing Art: Understanding the Contemporary*. Mayfield. https://lkouniv.ac.in/site/writereaddata/siteContent/202004061919580450balram_sharma_FA_barrett_criticizing_art.pdf — search_summary
- `[Berg2016_CreativeHighwire]` Berg, J. M. (2016). Balancing on the creative highwire: Forecasting the success of novel ideas in organizations. *Administrative Science Quarterly*, 61(3), 433–468. https://doi.org/10.1177/0001839216642211 ; summary https://www.gsb.stanford.edu/insights/managers-are-not-best-judge-creative-ideas — publisher_page
- `[Bornmann2010_PeerReviewIRR]` Bornmann, L., Mutz, R., & Daniel, H.-D. (2010). A reliability-generalization study of journal peer reviews. *PLoS ONE*, 5(12), e14331. https://doi.org/10.1371/journal.pone.0014331 — abstract
- `[Britannica_ArtCriticism]` Encyclopaedia Britannica. Art criticism. https://www.britannica.com/art/art-criticism — search_summary (page 403)
- `[BruineDeBruin2005_LastDance]` Bruine de Bruin, W. (2005). Save the last dance for me: Unwanted serial position effects in jury evaluations. *Acta Psychologica*, 118, 245–260. https://research.tue.nl/en/publications/save-the-last-dance-for-me-unwanted-serial-position-effects-in-ju/ — abstract
- `[Catmull2014_Braintrust]` Catmull, E., & Wallace, A. (2014). *Creativity, Inc.* Random House; Catmull, E. (2008). How Pixar fosters collective creativity. *HBR*. https://www.fastcompany.com/3027135/inside-the-pixar-braintrust — search_summary (403)
- `[Chen2024_HumansOrLLMs]` Chen, G. H., Chen, S., Liu, Z., Jiang, F., & Wang, B. (2024). Humans or LLMs as the judge? A study on judgement bias. *EMNLP 2024*. https://arxiv.org/abs/2402.10669 — abstract
- `[Chen2024_MLLMJudge]` Chen, D., et al. (2024). MLLM-as-a-Judge: Assessing multimodal LLM-as-a-judge with vision-language benchmark. *ICML 2024*. https://arxiv.org/abs/2402.04788 — abstract
- `[CsehJeffries2019_ScatteredCAT]` Cseh, G. M., & Jeffries, K. K. (2019). A scattered CAT: A critical evaluation of the Consensual Assessment Technique for creativity research. *Psychology of Aesthetics, Creativity, and the Arts*. https://doi.org/10.1037/aca0000220 ; AAM https://knowledge.lancashire.ac.uk/id/eprint/28402/ — full_text
- `[DePiles1708_Balance]` de Piles, R. (1708). *Cours de peinture par principes* (Balance des peintres). https://en.wikipedia.org/wiki/Roger_de_Piles — search_summary
- `[Dow2010]` Dow, S. P., Glassco, A., Kass, J., Schwarz, M., Schwartz, D. L., & Klemmer, S. R. (2010). Parallel prototyping leads to better design results, more divergence, and increased self-efficacy. *ACM TOCHI*, 17(4), 18. https://doi.org/10.1145/1879831.1879836 — search_summary
- `[Dunkel2023_DKReplication]` Dunkel, C. S., Nedelec, J., & van der Linden, D. (2023). Reevaluating the Dunning-Kruger effect: A response to and replication of Gignac and Zajenkowski (2020). *Intelligence*, 96. https://ideas.repec.org/a/eee/intell/v96y2023ics0160289622000988.html — search_summary
- `[Feldman1967_Varieties]` Feldman, E. B. (1967; later eds.). *Art as Image and Idea* / *Varieties of Visual Experience*. https://www.taylorfrancis.com/books/e/9781315303666 — bibliographic (unverified edition details)
- `[GignacZajenkowski2020]` Gignac, G. E., & Zajenkowski, M. (2020). The Dunning-Kruger effect is (mostly) a statistical artefact. *Intelligence*, 80, 101449. https://doi.org/10.1016/j.intell.2020.101449 — search_summary
- `[GoldinRouse2000_Blind]` Goldin, C., & Rouse, C. (2000). Orchestrating impartiality: The impact of "blind" auditions on female musicians. *American Economic Review*, 90(4), 715–741. https://www.nber.org/papers/w5903 — abstract
- `[Goldman2010_NDPR_Carroll]` Goldman, A. H. (2010). Review of N. Carroll, *On Criticism* (Routledge, 2009). *Notre Dame Philosophical Reviews*. https://ndpr.nd.edu/reviews/on-criticism/ — full_text (review)
- `[GoodmanWoodHendrickx2004]` Goodman, J. S., Wood, R. E., & Hendrickx, M. (2004). Feedback specificity, exploration, and learning. *Journal of Applied Psychology*, 89(2), 248–262. https://doi.org/10.1037/0021-9010.89.2.248 — search_summary
- `[Gu2024_LLMJudgeSurvey]` Gu, J., Jiang, X., et al. (2024). A survey on LLM-as-a-judge. arXiv:2411.15594. https://arxiv.org/abs/2411.15594 — abstract
- `[GVSU_FeldmanModel]` Grand Valley State University (2008). Feldman's Model of Art Criticism (handout). https://www2.gvsu.edu/hipshean/resources/Feldman's%20Model%20Crit.pdf — full_text
- `[HattieTimperley2007]` Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of Educational Research*, 77(1), 81–112. https://doi.org/10.3102/003465430298487 ; copy https://www.uky.edu/~gmswan3/575/Hattie_Timperly_2007.pdf — full_text
- `[Huang2024_AesBench]` Huang, Y., et al. (2024). AesBench: An expert benchmark for multimodal large language models on image aesthetics perception. arXiv:2401.08276. https://arxiv.org/abs/2401.08276 — abstract
- `[Huang2024_NoSelfCorrect]` Huang, J., Chen, X., Mishra, S., et al. (2024). Large language models cannot self-correct reasoning yet. *ICLR 2024*. https://arxiv.org/abs/2310.01798 — full_text
- `[IowaWW_History]` University of Iowa. Iowa Writers' Workshop — Our History. https://writersworkshop.uiowa.edu/node/521 — search_summary
- `[KahnemanLovalloSibony2019_MAP]` Kahneman, D., Lovallo, D., & Sibony, O. (2019). A structured approach to strategic decisions. *MIT Sloan Management Review*, 60(3). https://sloanreview.mit.edu/article/a-structured-approach-to-strategic-decisions/ — search_summary
- `[Kamoi2024_SelfCorrectSurvey]` Kamoi, R., Zhang, Y., Zhang, N., Han, J., & Zhang, R. (2024). When can LLMs actually correct their own mistakes? A critical survey of self-correction of LLMs. *TACL*, 12, 1417–1440. https://doi.org/10.1162/tacl_a_00713 — abstract
- `[KlugerDeNisi1996]` Kluger, A. N., & DeNisi, A. (1996). The effects of feedback interventions on performance: A historical review, a meta-analysis, and a preliminary feedback intervention theory. *Psychological Bulletin*, 119(2), 254–284. https://doi.org/10.1037/0033-2909.119.2.254 — abstract
- `[Lerman_CRP]` Lerman, L. (1990–). Critical Response Process. https://lizlerman.com/critical-response-process ; Lerman, L., & Borstel, J. *Critique Is Creative*. — publisher_page
- `[Liu2023_GEval]` Liu, Y., Iter, D., Xu, Y., Wang, S., Xu, R., & Zhu, C. (2023). G-Eval: NLG evaluation using GPT-4 with better human alignment. *EMNLP 2023*. https://arxiv.org/abs/2303.16634 — abstract
- `[NisbettWilson1977_Halo]` Nisbett, R. E., & Wilson, T. D. (1977). The halo effect: Evidence for unconscious alteration of judgments. *JPSP*, 35(4), 250–256. https://deepblue.lib.umich.edu/items/da93fb79-74ef-4ff0-a1fe-da088de2dc42 — search_summary
- `[NortonMochonAriely2012]` Norton, M. I., Mochon, D., & Ariely, D. (2012). The IKEA effect: When labor leads to love. *Journal of Consumer Psychology*, 22(3), 453–460. https://doi.org/10.1016/j.jcps.2011.08.002 — abstract
- `[Panickssery2024_SelfPreference]` Panickssery, A., Bowman, S. R., & Feng, S. (2024). LLM evaluators recognize and favor their own generations. *NeurIPS 2024*. https://arxiv.org/abs/2404.13076 — full_text
- `[ProninLinRoss2002]` Pronin, E., Lin, D. Y., & Ross, L. (2002). The bias blind spot: Perceptions of bias in self versus others. *PSPB*, 28(3), 369–381. https://doi.org/10.1177/0146167202286008 — search_summary
- `[Silvia2008_Discernment]` Silvia, P. J. (2008). Discernment and creativity: How well can people identify their most creative ideas? *Psychology of Aesthetics, Creativity, and the Arts*, 2(3), 139–146. https://doi.org/10.1037/1931-3896.2.3.139 — search_summary
- `[Stureborg2024_Inconsistent]` Stureborg, R., Alikaniotis, D., & Suhara, Y. (2024). Large language models are inconsistent and biased evaluators. arXiv:2405.01724. https://arxiv.org/abs/2405.01724 — abstract
- `[Thorndike1920_Halo]` Thorndike, E. L. (1920). A constant error in psychological ratings. *Journal of Applied Psychology*, 4(1), 25–29. https://doi.org/10.1037/h0071663 — search_summary
- `[Wang2024_NotFairEvaluators]` Wang, P., Li, L., Chen, L., et al. (2024). Large language models are not fair evaluators. *ACL 2024*, 9440–9450. https://arxiv.org/abs/2305.17926 — abstract
- `[Webster2006_DesignJury]` Webster, H. (2006). A Foucauldian look at the design jury. *Art, Design & Communication in Higher Education*, 5(1), 5–19. https://doi.org/10.1386/adch.5.1.5_1 ; AAM https://radar.brookes.ac.uk/radar/items/938b4ced-7a1f-8e1f-090e35c08af02800/1/ — full_text
- `[Ye2025_CALM]` Ye, J., Wang, Y., Huang, Y., et al. (2025). Justice or prejudice? Quantifying biases in LLM-as-a-judge. *ICLR 2025*. https://arxiv.org/abs/2410.02736 — abstract
- `[Zheng2023_LLMJudge]` Zheng, L., Chiang, W.-L., Sheng, Y., et al. (2023). Judging LLM-as-a-judge with MT-Bench and Chatbot Arena. *NeurIPS 2023 Datasets & Benchmarks*. https://arxiv.org/abs/2306.05685 — full_text

**เข้าถึงไม่ได้ / ยังไม่ได้ยืนยัน:** Catmull HBR 2008 ฉบับเต็ม (403), Britannica (403), Anderson ว่าด้วย Feldman (core.ac.uk 403), Kluger & DeNisi ฉบับเต็ม (404 — ใช้ abstract + ตาราง moderator ใน Hattie), Goldin & Rouse ฉบับเต็ม (404), Feldman และ Barrett ตัวเล่ม, Amabile 1982 ตัวบทความ, กฎ "silent author" ของ workshop (ไม่พบแหล่ง), Webster/Anthony งาน 1986–87 เรื่อง diary
