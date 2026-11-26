# Domain 13 — Quality Assurance & Evaluation (QA/QC และการประเมินผลงานสร้างสรรค์/สื่อ)

Module: **M42** · เขียน 2026-11-26 · ภาษา: อธิบายไทย + ศัพท์เทคนิคอังกฤษ

**Scope — ครอบคลุม:** ประวัติ QA (Shewhart → Deming/Juran → ISO 9000 → software testing/regression → ML/AI evaluation → broadcast loudness QC);
การออกแบบ rubric (analytic vs holistic, descriptor ที่สังเกตได้, anchor); validity (Messick) และ reliability (kappa, Krippendorff's alpha, ICC);
golden set / regression test สำหรับงานสร้างสรรค์; การออกแบบ before-vs-after และ confound; A/B test ออนไลน์ (Kohavi), power, SRM, Twyman's law,
vanity metrics + Goodhart/Strathern; human evaluation ของสื่อที่ AI สร้าง (MOS/P.800/P.808, BT.500, SSIM/FID/CMMD, LLM-as-judge, ความไม่น่าเชื่อของ rater ที่ไม่ฝึก);
สเปกเสียง (BS.1770 / EBU R128 / Spotify); checklist (WHO surgical checklist, Michigan, Ontario) และขีดจำกัด.

**Scope — ไม่ครอบคลุม:** สถิติเชิงลึก (Bayesian A/B, sequential testing, CUPED variance reduction — กล่าวถึงชื่อเท่านั้น); Six Sigma/Lean เชิงเครื่องมือ;
psychometrics IRT; สเปก delivery ของ broadcaster เฉพาะราย (เช่น AS-11/DPP, Netflix) — ไม่ได้ค้นในรอบนี้; สเปกแพลตฟอร์มโซเชียล (ขนาด/safe zone/AI label) อยู่ใน
`story-clips/_craft/curriculum/12-production-qc.md` แล้ว ไม่ทำซ้ำ; กฎหมายโฆษณา อย. (อยู่ในไฟล์เดียวกัน).

**Status: SOURCE VERIFIED** — 30 จาก 46 แหล่ง (65%) อ่านเป็น full_text หรือ abstract ในรอบนี้.

**Counts:** tier S 8 · A 31 · B 3 · C 2 · D 2 (รวม 46) · access_status: full_text 12 · abstract 18 · publisher_page 5 · bibliographic 7 · search_summary 4.

**Builds on (ไม่ทำซ้ำ — ลิงก์ไปแทน; path นับจาก root ของ repo):**
- `creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md` — คะแนน 100 + critical failures (ไฟล์นี้เพิ่ม: วิธีทำให้คะแนนนั้น *เชื่อถือได้* — reliability, anchor, calibration)
- `story-clips/_craft/curriculum/12-production-qc.md` — สเปกแพลตฟอร์ม, loudness −14 LUFS, สิทธิ์, AI label, hook/hold/CTR (ไฟล์นี้เพิ่ม: ทดลองอย่างไรให้ตัวเลขพวกนี้ไม่หลอก)
- `creative-intelligence/knowledge/critical-thinking/PRE_DELIVERY_CHECK.md` — checklist ก่อนส่ง (ไฟล์นี้เพิ่ม: หลักฐานว่า checklist ได้ผลเมื่อไรและไม่ได้ผลเมื่อไร)
- `.claude/skills/ai-voice-director/QUALITY_CONTROL.md` — rubric เสียง 100 คะแนน, P.800 ACR, คนกับเครื่องแยกคอลัมน์ (ไฟล์นี้เพิ่ม: MOS ต้องรายงานอย่างไร, crowdsourcing P.808, reliability ของ rater)
- `.claude/skills/ai-visual-artist/VISUAL_QUALITY_SCHEMA.json` + `tools/score.py` — คะแนนภาพ (ไฟล์นี้เพิ่ม: ขีดจำกัดของ metric อัตโนมัติ เช่น SSIM/FID)
- `creative-intelligence/evaluations/studio-benchmark/` — benchmark ก่อน/หลัง (ไฟล์นี้เพิ่ม: confound และวิธีอ่านผล before-vs-after; §6.6)

ป้ายที่ใช้: **FACT** (ซ้ำได้หลายครั้ง) · **THEORY** (แบบจำลอง อาจถูกโต้แย้ง) · **PRACTICE** (ธรรมเนียมวิชาชีพ) · **OPINION** · **(craft)** · **(opinion)** · **(our test)**

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 จากการตรวจของสำเร็จ (inspection) สู่การควบคุมกระบวนการ (process control)
- **ยุคกิลด์ (Middle Ages):** คุณภาพมาจากการฝึกงานยาวและการพิสูจน์ฝีมือ — คุณภาพผูกกับ "คน" และ "กระบวนการ" ไม่ใช่การสุ่มตรวจ [NIST_SQC_History].
- **16 พ.ค. 1924:** Walter A. Shewhart (Bell Telephone Laboratories) เขียนบันทึกที่มีภาพร่าง **control chart** สมัยใหม่ [NIST_SQC_History].
- **1931:** Shewhart ตีพิมพ์ *Economic Control of Quality of Manufactured Product* (Van Nostrand) — แนวคิดหลัก: ความแปรปรวนมีสองแบบ
  **chance/common cause** (เสียงรบกวนปกติของระบบ) กับ **assignable/special cause** (มีสาเหตุเฉพาะที่หาเจอได้); อย่าแก้ระบบเมื่อเห็นแค่ noise [Shewhart1931; NIST_SQC_History].
  Dodge และ Romig (Bell Labs เช่นกัน) นำสถิติไปใช้กับ **sampling inspection** [NIST_SQC_History].
- **Deming (ทศวรรษ 1950–1980s):** 14 points ใน *Out of the Crisis* — ข้อ 3 "Cease dependence on inspection to achieve quality" = สร้างคุณภาพเข้าไปในกระบวนการตั้งแต่ต้น
  แทนการคัดของเสียตอนท้าย; Deming Institute เตือนว่า 14 ข้อไม่ใช่ checklist ให้ติ๊ก ต้องอ่านกับเนื้อความของหนังสือและ System of Profound Knowledge [Deming1986].
- **Juran (1986):** "Quality Trilogy" — quality **planning** → quality **control** → quality **improvement** เป็นวงจรต่อเนื่อง [Juran1986].
- **ISO 9000 family:** มาตรฐานระบบบริหารคุณภาพ; หลัก 7 ข้อ (customer focus, leadership, engagement of people, process approach, improvement,
  **evidence-based decision making**, relationship management) — หมายเหตุ: ผลค้นพบว่า ISO อาจออกฉบับ 2026 แล้ว (ISO 9001:2026 / ISO 9000:2026) ยืนยันสถานะฉบับ 2015 ไม่ได้ในรอบนี้ [ISO_QMP].

### 1.2 Software testing และ regression
- **1979:** Glenford Myers, *The Art of Software Testing* — นิยาม "Testing is the process of executing a program with the intent of finding errors":
  การทดสอบที่ "สำเร็จ" คือการทดสอบที่ **หาข้อผิดพลาดเจอ** ไม่ใช่ที่พิสูจน์ว่าไม่มี [Myers1979]. นี่คือรากของทัศนคติ "critic หาเรื่อง ไม่ใช่ปลอบใจ".
- **Regression testing:** ทุกครั้งที่แก้ระบบ ให้รันชุดทดสอบเดิมซ้ำเพื่อยืนยันว่าของเดิมที่เคยดียังดี. ในงาน ML, Google เสนอ **ML Test Score** — 28 tests/monitoring
  สำหรับ data, model, infrastructure, monitoring; จุดสำคัญ: "พฤติกรรมของโมเดลระบุล่วงหน้าได้ยาก" จึงต้องมีชุดทดสอบเชิงพฤติกรรมและการเฝ้าระวังหลังปล่อย [Breck2017].

### 1.3 การวัดด้วยคน (human judgement) — reliability และ validity
- **1960:** Jacob Cohen เสนอ **kappa** สำหรับความเห็นตรงกันของผู้ประเมิน 2 คน บน nominal scale ที่หักส่วน "ตรงกันโดยบังเอิญ" [Cohen1960].
- **1977:** Landis & Koch เสนอเกณฑ์อ่าน kappa (slight/fair/moderate/substantial/almost perfect ทีละ 0.20) — ภายหลังถูกวิจารณ์ว่า **เป็นความเห็น ไม่มีหลักฐานรองรับ** [LandisKoch1977].
- **1979:** Shrout & Fleiss — ICC 6 แบบ สำหรับ n targets ที่ให้คะแนนโดย k judges [ShroutFleiss1979]; **2016** Koo & Li ทำ guideline เลือก/รายงาน ICC [KooLi2016];
  **2022/2024** ten Hove และคณะ ปรับด้วย generalizability theory: rater แทบไม่ควรถือว่า "fixed" [tenHove2024].
- **1990:** Feinstein & Cicchetti — "high agreement but low kappa" paradoxes [FeinsteinCicchetti1990].
- **1995:** Messick — validity เป็นคุณสมบัติของ **การตีความคะแนน** ไม่ใช่ของแบบทดสอบ; unified construct validity 6 ด้าน [Messick1995].
- **2007:** Hayes & Krippendorff เสนอ **Krippendorff's alpha** เป็นมาตรฐาน reliability ของข้อมูลที่ "คนลงรหัส" [HayesKrippendorff2007].
- **Rubric research:** Jönsson & Svingby (2007) review → Brookhart (2018) review ในอุดมศึกษา: ส่วนใหญ่เป็น analytic, 4–5 ระดับ; **criteria ที่เหมาะสมคือกุญแจ** [JonssonSvingby2007; Brookhart2018].

### 1.4 การทดลองออนไลน์ (online controlled experiments)
- **2007–2009:** Kohavi และคณะ (Microsoft) — "Listen to your customers, not to the HiPPO" (Highest Paid Person's Opinion); OEC (Overall Evaluation Criterion), A/A test,
  power/sample size, robots, primacy/novelty [Kohavi2009_DMKD; Kohavi2009_ThinkWeek].
- **2019:** Sample Ratio Mismatch (SRM) taxonomy [Fabijan2019]. **2020:** หนังสือ *Trustworthy Online Controlled Experiments* (Kohavi, Tang, Xu) — รวม Twyman's law, OEC, trustworthiness checks [KohaviTangXu2020].
- **2009:** Eric Ries แยก **vanity metrics** vs **actionable metrics** [Ries2009]. **1997:** Strathern เขียนประโยคดังที่ภายหลังเรียกว่า Goodhart's law: "When a measure becomes a target, it ceases to be a good measure." [Strathern1997].
- **2013:** Button et al. — median power ของงานวิจัยประสาทวิทยา ≈ 21%; การศึกษาเล็ก ⇒ PPV ต่ำ + winner's curse [Button2013]. (บทเรียนตรงกับ A/B test ขนาดเล็กของร้านเรา.)

### 1.5 คุณภาพสื่อ (media quality) — จากห้องแล็บถึง crowd และ AI
- **1996:** ITU-T P.800 — วิธีวัดคุณภาพเสียงเชิงอัตวิสัย (subjective) ที่ให้ MOS [ITU-T-P800]; **2018/2021:** P.808 — ทำแบบ crowdsourcing ได้ โดยมี qualification, environment test, gold/trap questions [ITU-T-P808; NaderiCutler2020].
- **ITU-R BT.500** (ฉบับ -15, 05/2023): วิธีประเมินภาพโทรทัศน์โดยคน (DSCQS, SSCQE, SAMVIQ ฯลฯ) และย้ำว่า **objective measure อย่างเดียวไม่พอ** [ITU-R_BT500].
- **2004:** SSIM — วัดการเสียโครงสร้างภาพ (full-reference) [Wang2004_SSIM]. FID (2017) กลายเป็น metric มาตรฐานของ generative image แต่ **2024** Jayasumana et al. พบว่า FID ขัดกับ human raters สำหรับ text-to-image และเสนอ CMMD [Jayasumana2024].
- **2021:** Clark et al. — คนที่ไม่ได้ฝึกแยกข้อความ GPT-3 กับคนเขียนได้แค่ระดับบังเอิญ [Clark2021]; van der Lee et al. — best practice ของ human evaluation [vanderLee2021].
- **2023:** Zheng et al. — **LLM-as-a-judge**: GPT-4 เห็นตรงกับคน ~80%+ (เท่ากับคนกับคน) แต่มี position/verbosity/self-enhancement bias [Zheng2023].

### 1.6 Loudness — QC ที่กลายเป็นมาตรฐานสากล
- ITU-R **BS.1770** (ฉบับ -5, 11/2023, in force) นิยามการวัด programme loudness (LKFS = LUFS) และ true-peak [ITU2023_BS1770_5].
- **EBU R128**: normalise ที่ −23 LUFS ±0.5 LU (เข้มขึ้นตั้งแต่ v3.0 มิ.ย. 2014); หน้าเว็บปัจจุบันแสดง v5.0 (21 พ.ย. 2023) [EBU2020_R128].
- สตรีมมิ่ง: Spotify normalise ที่ −14 LUFS (Loud −11 / Quiet −19) วัดตาม ITU 1770 [Spotify_Loudness].

### 1.7 Checklist ในงานความปลอดภัย
- **2006:** Michigan Keystone ICU — การติดเชื้อ catheter ลดลงถึง 66% [Pronovost2006]; **2011** Dixon-Woods et al. อธิบายว่าไม่ใช่ "checklist ง่าย ๆ" แต่เป็น social intervention [DixonWoods2011].
- **2009:** WHO Surgical Safety Checklist 19 ข้อ, 8 รพ. — ตาย 1.5% → 0.8%, complication 11.0% → 7.0% [Haynes2009]; หนังสือ *The Checklist Manifesto* [Gawande2009].
- **2014:** Ontario บังคับใช้ทั้งมณฑล (101 รพ.) — **ไม่พบการลดลงที่มีนัยสำคัญ** [Urbach2014]. Meta-analysis/systematic review ต่อมา: ผลชี้ไปทางดี แต่หลักฐานคุณภาพต่ำ [Bergs2014; deJager2016; GonzalezMarino2024].

**ความคิดที่เปลี่ยนไป (สรุป):** inspect ของปลายทาง → ควบคุมกระบวนการ → วัดด้วยคนอย่างมีระเบียบ (reliability/validity) → ทดลองแบบสุ่มกับผู้ใช้จริง →
ประเมินสื่อที่ AI สร้างด้วยทั้งคน, metric และ AI judge — แต่ละขั้นพบว่า "ตัวเลข" หลอกได้ถ้าไม่ตรวจความเชื่อถือของตัวเลขเอง.

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 นิยามหลัก
| คำ | ความหมาย | ป้าย |
|---|---|---|
| **QA (Quality Assurance)** | ระบบ/กระบวนการที่ทำให้มั่นใจว่างานจะออกมาตามมาตรฐาน — *ป้องกัน* | PRACTICE |
| **QC (Quality Control)** | การตรวจ/วัดผลงานจริงเทียบสเปก — *ตรวจจับ* | PRACTICE |
| **Verification vs Validation** | verification = "ทำถูกตามสเปกไหม" (spec, ขนาด, LUFS); validation = "สเปกนั้นตอบโจทย์ผู้ชมจริงไหม" | PRACTICE (craft) |
| **Common vs special cause** | ความแปรปรวนปกติของระบบ vs สาเหตุเฉพาะที่ชี้ได้ [Shewhart1931; NIST_SQC_History] | THEORY (คลาสสิก, ใช้กว้าง) |
| **Rubric** | criteria (ดูอะไร) + performance level descriptions (แต่ละระดับหน้าตาเป็นอย่างไร); checklist/rating scale ไม่มีส่วนหลัง [Brookhart2018] | FACT (นิยาม) |
| **Reliability** | ความคงที่ของการวัด: คนละผู้ประเมิน (inter-rater), คนเดิมต่างเวลา (intra-rater/test-retest) [KooLi2016] | FACT |
| **Validity** | หลักฐานว่า *การตีความ* คะแนนถูกต้องและใช้คะแนนได้อย่างเหมาะสม [Messick1995] | THEORY (ฉันทามติสูงในวงการวัดผล) |
| **Golden set** | ชุดตัวอย่างคงที่ที่รู้คำตอบ/ระดับคุณภาพแล้ว ใช้วัดซ้ำก่อน-หลังเปลี่ยนระบบ | PRACTICE |
| **Regression test** | รันชุดทดสอบเดิมหลังแก้ เพื่อยืนยันว่าของที่เคยดีไม่พัง [Breck2017] | PRACTICE |
| **OEC** | ตัวชี้วัดหลักที่ตกลงล่วงหน้าว่าจะใช้ตัดสินการทดลอง ควรสะท้อนเป้าระยะยาว [Kohavi2009_DMKD] | PRACTICE (มีหลักฐานจากอุตสาหกรรม) |
| **A/A test** | แบ่งผู้ใช้เป็นสองกลุ่มแต่ให้เห็นของเหมือนกัน เพื่อตรวจว่าระบบทดลองไม่ลำเอียง [Kohavi2009_DMKD] | PRACTICE |
| **SRM** | สัดส่วนคนในแต่ละกลุ่มไม่ตรงกับที่ตั้งไว้ = อาการของปัญหาข้อมูล [Fabijan2019] | FACT (เชิงสถิติ) |
| **MOS** | Mean Opinion Score — ค่าเฉลี่ยคะแนนความเห็นจากผู้ฟัง/ผู้ชม ตามวิธีมาตรฐาน [ITU-T-P800] | PRACTICE/standard |
| **LUFS / dBTP** | ความดังตามการรับรู้ (gated) / พีคจริงหลัง oversample [ITU2023_BS1770_5] | standard |

### 2.2 หลักการแกน 10 ข้อ
1. **สร้างคุณภาพในกระบวนการ ไม่ใช่คัดตอนท้าย** — QC ตอนท้ายจำเป็นแต่ไม่พอ [Deming1986]. ในสตูดิโอ: brief/direction JSON/validator ที่ดี ป้องกันได้มากกว่าการตรวจภาพสุดท้าย. (THEORY/PRACTICE)
2. **แยก noise กับ signal ก่อนตัดสิน** — อย่าปรับสูตรเพราะโพสต์เดียวยอดตก (อาจเป็น common cause) [Shewhart1931]. (THEORY)
3. **ทดสอบเพื่อหาข้อผิด** — ผู้ตรวจที่ดีพยายามทำให้งานล้ม [Myers1979]. (PRACTICE)
4. **ตัวเลขไม่มีความหมายถ้าไม่รู้ว่าเชื่อถือได้แค่ไหน** — ต้องรายงาน reliability (alpha/ICC + CI) และจำนวน rater [HayesKrippendorff2007; KooLi2016]. (FACT)
5. **Validity มาก่อนความแม่น** — rubric ที่วัด "ทำตามคำสั่ง" แทน "คุณภาพจริง" จะชี้ทิศผิด แม้ rater เห็นตรงกัน [Brookhart2018; Messick1995]. (FACT/THEORY)
6. **ตั้ง OEC/คำถามก่อนดูข้อมูล** — ไม่งั้นจะเลือก metric ที่ดูดีหลังเห็นผล (HARKing) [Kohavi2009_DMKD; KohaviTangXu2020]. (PRACTICE)
7. **ตัวอย่างเล็ก = ผลบวกปลอมและขนาดผลที่ถูกขยาย** [Button2013]. (FACT)
8. **ตัวเลขที่ "น่าสนใจผิดปกติ" มักผิด (Twyman's law)** — ตรวจ pipeline ก่อนฉลอง [KohaviTangXu2020]. (PRACTICE/heuristic)
9. **เมื่อ measure กลายเป็น target มันเลิกเป็น measure ที่ดี** [Strathern1997]. (THEORY, สังเกตซ้ำหลายวงการ)
10. **Checklist ได้ผลเมื่อเป็นส่วนหนึ่งของวัฒนธรรมทีม ไม่ใช่กระดาษ** [DixonWoods2011; Urbach2014]. (THEORY + หลักฐานผสม)

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 Validity ตาม Messick — 6 ด้าน และ 2 ภัยคุกคาม
Messick (1995) รวม content/criterion/construct validity เข้าเป็น **unified construct validity** ที่ต้องดูทั้ง "ความหมายของคะแนน" และ "ผลทางสังคมของการใช้คะแนน";
6 ด้าน: **content, substantive, structural, generalizability, external, consequential** [Messick1995].
- ภัยหลักสองแบบที่วงการวัดผลใช้ต่อจาก Messick: **construct underrepresentation** (วัดแคบไป เช่น ให้คะแนนคลิปจาก "ความคม" อย่างเดียว) และ
  **construct-irrelevant variance** (คะแนนถูกกวนด้วยสิ่งที่ไม่ใช่ตัวคุณภาพ เช่น rater ให้คะแนนภาพสูงเพราะชอบโทนสีส่วนตัว). (หมายเหตุ: สองคำนี้มาจากความรู้ทั่วไปของบทความ Messick; รอบนี้อ่านได้ระดับ abstract — ความมั่นใจปานกลาง)
- **Consequential aspect** ในสตูดิโอ: ถ้า rubric ให้คะแนน "ตรงกับ house rules" หนักเกินไป ทีมจะผลิตงานปลอดภัยซ้ำ ๆ — ผลข้างเคียงของการวัดเป็นส่วนหนึ่งของ validity.

### 3.2 Reliability — เลือกสถิติให้ตรงข้อมูล
| สถานการณ์ | สถิติ | เหตุผล / ข้อควรระวัง |
|---|---|---|
| 2 rater, หมวดหมู่ (ผ่าน/ไม่ผ่าน) | Cohen's kappa [Cohen1960] | หักโอกาสบังเอิญ แต่: ใช้ได้ 2 rater, nominal เท่านั้น; ถือ rater ไม่สลับกันได้ [HayesKrippendorff2007]; paradox เมื่อ marginal ไม่สมดุล [FeinsteinCicchetti1990] |
| ≥2 rater, มี missing, ordinal/interval | **Krippendorff's alpha** [HayesKrippendorff2007] | α = 1 − D_o/D_e (observed/expected disagreement); ใช้ได้ทุกระดับการวัด, จำนวน rater ใดก็ได้, bootstrap CI ได้ |
| คะแนนต่อเนื่อง (เช่น 0–100), rater ชุดเดียวกันทุกชิ้น | **ICC** [ShroutFleiss1979; KooLi2016] | ต้องระบุ model (one-way / two-way random / mixed), type (single / mean of k), definition (consistency / absolute agreement) |
| rater เปลี่ยนไปตามชิ้นงาน (incomplete design) | ICC ตาม G-theory [tenHove2024] | rater แทบไม่ควรถือว่า fixed; มี flowchart 4 การตัดสินใจ |

- **ตัวอย่างจาก Hayes & Krippendorff:** ข้อมูลชุดเดียวกันได้ α = 0.48 ถ้ามองเป็น nominal แต่ 0.76 ถ้ามองเป็น ordinal เพราะความเห็นต่างส่วนใหญ่ห่างกัน 1 ระดับ —
  **เลือก metric ผิดระดับการวัดทำให้ตัดสินผิด** [HayesKrippendorff2007]. ตัวอย่างเดียวกันแสดงว่า CI ของ α = 0.71–0.81 และโอกาสต่ำกว่า 0.80 = 0.95 → ถ้าเกณฑ์คือ 0.80 ข้อมูลนี้ "มีปัญหา" แต่ถ้าเกณฑ์ 0.70 ความเสี่ยงต่ำ (q = 0.0125).
- **การอ่าน ICC (Koo & Li):** <0.5 poor, 0.5–0.75 moderate, 0.75–0.9 good, >0.9 excellent — **ตัดสินจาก 95% CI ไม่ใช่ค่าจุด**; แนะนำ ≥30 ชิ้นที่หลากหลาย และ ≥3 rater เมื่อทำได้;
  ICC ต่ำอาจเกิดจากชิ้นงานคล้ายกันเกินไป (variance ระหว่างชิ้นน้อย) ไม่ใช่ rater ไม่ตรงกัน [KooLi2016].
- **เกณฑ์ตัด (cutoff) เป็นธรรมเนียม ไม่ใช่กฎธรรมชาติ:** Landis-Koch bands ไม่มีหลักฐานรองรับ [LandisKoch1977 ตามแหล่งรอง]; เกณฑ์ α ≥ 0.80 / ≥ 0.667 ของ Krippendorff ก็เป็นธรรมเนียมตามความเสี่ยงที่ยอมรับได้ (ใน Hayes & Krippendorff ใช้เกณฑ์ α_min หลายค่าเป็นตัวอย่าง) [HayesKrippendorff2007].

### 3.3 Rubric design — ทฤษฎีที่ใช้งานได้
- **Analytic vs holistic:** analytic ให้คะแนนทีละ criterion → ดีสำหรับ feedback/การแก้; holistic ให้คะแนนเดียวรวม → เร็ว เหมาะกับการคัด/อนุมัติ [Brookhart2018].
- **General vs task-specific:** rubric แบบ general ใช้ได้กับงานตระกูลเดียวกันและสอนคนได้ — Brookhart เรียกความ general ว่า "perhaps the most important characteristic" [Brookhart2018].
- **Descriptive vs evaluative language:** ระดับที่เขียนว่า "ดีมาก/แย่" (evaluative) ไม่ช่วยให้รู้ว่าต้องแก้อะไร; เขียนสิ่งที่ *เห็นได้* (descriptive) เช่น "แว่นเป็นจุดเด่นอันดับ 1 ในภาพย่อขนาดโทรศัพท์" [Brookhart2018].
- **กับดัก compliance criteria:** criterion แบบ "มี 3 แหล่งอ้างอิง" ทำให้ทีมไล่ตามจำนวน แทน "ใช้แหล่งที่เกี่ยวข้องและน่าเชื่อถือหลากหลาย" — "misdirect … and mis-measure" [Brookhart2018].
  ในสตูดิโอ: "มีโลโก้แบรนด์กรอบ" เป็น *check* (ใช่/ไม่ใช่) ไม่ใช่ *criterion คุณภาพ* — แยกไว้ใน critical-failure/checklist.
- **หลักฐาน rubric:** review พบว่า rubric อาจเพิ่ม reliability ของการให้คะแนน แต่การมี rubric อย่างเดียวไม่รับประกัน reliability/validity; Brookhart ไม่พบรูปแบบที่ชัดระหว่างชนิด rubric กับ reliability [JonssonSvingby2007 ตามแหล่งรอง; Brookhart2018].
- **Anchor examples (exemplars):** ตัวอย่างงานจริงที่ตกลงกันว่าเป็นระดับ 1/2/3/4 ช่วย calibrate rater (PRACTICE ในการวัดผล — ไม่ได้หาหลักฐานเชิงทดลองเฉพาะในรอบนี้ (craft)).

### 3.4 Causal inference — ทำไม before/after หลอก
- Pre-post ที่ไม่มีกลุ่มเปรียบเทียบเสี่ยงต่อ **history** (เหตุการณ์อื่นเกิดพร้อมกัน), **maturation** (เปลี่ยนเองตามเวลา), **regression to the mean** (เลือกช่วงที่แย่สุดมาแก้ → ดีขึ้นเองบางส่วน),
  **testing** (คุ้นข้อสอบ), **instrumentation** (เครื่องวัด/rater เปลี่ยน) [ShadishCookCampbell2002 ตามแหล่งรอง].
- Controlled experiment แบบสุ่มเป็น "best scientific design" สำหรับ causal claim [Kohavi2009_DMKD] แต่มีข้อจำกัด: บอก "อะไรดีกว่า" ไม่บอก "ทำไม";
  วัดระยะสั้น; **primacy effect** (ผู้ใช้เก่าชินของเดิม) และ **newness effect** (ของใหม่ถูกกดเล่น) → บางการทดลองต้องรันหลายสัปดาห์ [Kohavi2009_DMKD].

### 3.5 Power, PPV และ winner's curse
- Power ต่ำทำให้ (1) พลาดผลจริง (2) **PPV ต่ำ** — ผล "มีนัยสำคัญ" มีโอกาสเป็นของจริงน้อยลง (3) **winner's curse** — ผลที่ผ่านเกณฑ์ถูกขยายขนาด [Button2013].
- สูตรประมาณ sample size ต่อกลุ่ม (95% confidence, 80% power) ที่ Kohavi et al. ยกจาก van Belle: **n ≈ 16σ²/Δ²** (σ² = variance ของ metric, Δ = ขนาดผลที่อยากตรวจจับ) [Kohavi2009_DMKD].
  ตัวอย่างคิดเอง (our test, คณิตล้วน): CTR ฐาน 2% (σ² ≈ 0.0196) อยากเห็นเพิ่ม 10% สัมพัทธ์ (Δ = 0.002) → n ≈ 16×0.0196/0.000004 ≈ **78,400 impressions ต่อกลุ่ม**.
  ร้านเล็กที่มีแอด ~5,000 impressions/ครีเอทีฟ จึง **ตรวจจับความต่างเล็ก ๆ ไม่ได้** — ต้องทดสอบเฉพาะความต่างใหญ่ หรือรวมหลายรอบ.
- ข้อโต้แย้ง: บางงานวิเคราะห์ซ้ำพบว่า power ต่ำไม่ได้เป็นทุกสาขาย่อย (การกระจายกว้าง) — แต่หลักคณิตศาสตร์ PPV/winner's curse ไม่ถูกโต้แย้ง [Button2013 + การวิจารณ์ที่สรุปในผลค้น].

### 3.6 Goodhart / Campbell / Strathern — ระบบวัดเปลี่ยนพฤติกรรม
Strathern (1997) วิเคราะห์ audit มหาวิทยาลัยอังกฤษ: "When a measure becomes a target, it ceases to be a good measure. The more a 2.1 examination performance becomes an expectation,
the poorer it becomes as a discriminator" — และ "Measurement and target rise together" [Strathern1997]. Michigan เองยอมรับความเสี่ยง **gaming/underreporting** เมื่อใช้ข้อมูลเป็นแรงกดดัน [DixonWoods2011].
ในสตูดิโอ: ถ้าบอก AI critic ว่า "ต้องได้ ≥ 90" คะแนนจะเฟ้อ (score inflation) — แยกคนให้คะแนนออกจากคนที่ได้ประโยชน์จากคะแนน (opinion, สอดคล้องกับ MASTER_QUALITY_SCORE §3).

### 3.7 วัดสื่อด้วยเครื่อง vs คน vs AI judge
| ชนิด | ตัวอย่าง | จุดแข็ง | จุดอ่อนที่มีหลักฐาน |
|---|---|---|---|
| Full-reference objective | SSIM [Wang2004_SSIM] | ซ้ำได้ 100%, ดีสำหรับ "ภาพนี้เสียหายจากต้นฉบับไหม" (compress/encode) | ต้องมีต้นฉบับ; ไม่บอกความสวย/ความเหมาะกับ brief |
| Distribution metric | FID / CMMD [Jayasumana2024] | วัดโมเดลทั้งชุด | FID ขัดกับคน, ต้องตัวอย่างมาก, ไม่เหมาะวัดภาพเดียว [Jayasumana2024] |
| Lab human test | P.800 ACR → MOS [ITU-T-P800]; BT.500 [ITU-R_BT500] | ตรงกับการรับรู้ | แพง; MOS เป็นค่าประมาณที่มีความไม่แน่นอน ต้องมี CI [P.800.2 มีเรื่อง interpretation & reporting — อ่านได้แค่ชื่อเรื่อง] |
| Crowd human test | P.808 [ITU-T-P808; NaderiCutler2020] | ถูก/เร็ว | ต้องมี qualification, environment/headset test, gold & trap questions |
| Untrained human judges | [Clark2021] | ง่าย | แยกข้อความ GPT-3 กับคนได้ระดับบังเอิญ; ฝึกสั้น ๆ เพิ่มถึง ~55% ไม่มีนัยสำคัญ; เหตุผลขัดกันเอง |
| LLM-as-judge | [Zheng2023] | ถูก, ขยายได้ | position bias (ความคงที่เมื่อสลับตำแหน่ง: GPT-4 65%, Claude-v1 23.8%), verbosity bias, self-enhancement, ตรวจเลข/เหตุผลพลาด |

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| key | พบ/เสนออะไร | tier | access |
|---|---|---|---|
| NIST_SQC_History | ลำดับประวัติ SQC: Shewhart memo 1924, หนังสือ 1931, Dodge-Romig sampling | B | full_text |
| Shewhart1931 | control chart; common vs assignable cause | A | bibliographic |
| Deming1986 | 14 points; ข้อ 3 เลิกพึ่ง inspection | A | bibliographic |
| Juran1986 | Quality Trilogy: planning–control–improvement | B | bibliographic |
| ISO_QMP | 7 quality management principles (incl. evidence-based decision making) | S | search_summary |
| Myers1979 | testing = หาข้อผิด | A | search_summary |
| Breck2017 | ML Test Score: 28 tests/monitoring สำหรับระบบ ML | A | abstract |
| Cohen1960 | kappa | A | bibliographic |
| LandisKoch1977 | วิธีสถิติ observer agreement; kappa bands (ถูกวิจารณ์ว่าเป็นความเห็น) | A | abstract |
| ShroutFleiss1979 | ICC 6 รูปแบบ + CI | A | abstract |
| FeinsteinCicchetti1990 | kappa paradoxes; เสนอรายงาน p_pos/p_neg แยก | A | search_summary |
| HayesKrippendorff2007 | 5 เกณฑ์ของ reliability measure ที่ดี; เสนอ alpha; bootstrap | A | full_text |
| KooLi2016 | guideline เลือก/รายงาน ICC; cutoffs บน CI; ≥30 ชิ้น ≥3 rater | A | full_text |
| tenHove2024 | ICC ด้วย G-theory; rater แทบไม่ fixed; incomplete designs | A | abstract |
| Messick1995 | unified construct validity 6 ด้าน รวม consequences | A | abstract |
| JonssonSvingby2007 | review rubric: reliability/validity/ผลต่อการเรียน | A | bibliographic |
| Brookhart2018 | review rubric 2005–2017: criteria เหมาะสมคือกุญแจ; analytic/holistic; descriptive | A | full_text |
| Chen1995_ResponseStyle | นักเรียนญี่ปุ่น/ไต้หวันใช้จุดกลาง scale มากกว่า; สหรัฐใช้ปลายสุดมากกว่า | A | abstract |
| KohaviTangXu2020 | ตำรา A/B testing: OEC, trustworthiness, Twyman's law | A | publisher_page |
| Kohavi2009_DMKD | survey/practical guide: power, A/A, robots, limitations (primacy/newness) | A | full_text |
| Kohavi2009_ThinkWeek | ที่ Microsoft ~1/3 ไอเดียดี, 1/3 แบน, 1/3 แย่; A/A test จับบั๊ก cache/cookie | C | full_text |
| Fabijan2019 | SRM taxonomy + rules of thumb | A | abstract |
| Button2013 | median power 21%; PPV; winner's curse | A | full_text |
| ShadishCookCampbell2002 | threats to validity (history, maturation, regression ...) | A | bibliographic |
| Ries2009 | vanity vs actionable metrics; cohort, split test | D | full_text |
| Strathern1997 | "When a measure becomes a target..."; audit culture | A | full_text |
| ITU-T-P800 | วิธี subjective ของคุณภาพเสียง (1996, in force) | S | publisher_page |
| ITU-T-P808 | crowdsourcing speech quality (06/2021) | S | publisher_page |
| NaderiCutler2020 | open-source P.808 + validation กับ lab | B | abstract |
| ITU-R_BT500 | subjective assessment ภาพ TV (BT.500-15, 2023) | S | search_summary |
| Wang2004_SSIM | SSIM structural similarity | A | abstract |
| Jayasumana2024 | FID ขัดกับคนใน T2I; เสนอ CMMD | A | abstract |
| Zheng2023 | LLM-as-judge: agreement & biases & mitigations | A | full_text |
| Clark2021 | untrained human eval ≈ chance | A | abstract |
| vanderLee2021 | best practice human eval NLG (planning; execution & release) | A | abstract |
| ITU2023_BS1770_5 | การวัด loudness/true-peak | S | publisher_page |
| EBU2020_R128 | −23 LUFS ±0.5 LU; v5.0 2023 | S | publisher_page |
| Spotify_Loudness | −14 LUFS default; TP < −1 dBTP (< −2 ถ้าดังกว่า −14) | C | full_text |
| Haynes2009 | WHO checklist 8 รพ.: ตาย 1.5→0.8%, complication 11.0→7.0% (pre-post) | A | abstract |
| Urbach2014 | Ontario 101 รพ. ~215k ผ่าตัด: ไม่ลดอย่างมีนัยสำคัญ | A | abstract |
| Bergs2014 | meta-analysis 7 studies: RR complication 0.59, mortality 0.77; ยังไม่ definitive | S | abstract |
| deJager2016 | SR 25 studies: ผลไม่สม่ำเสมอ; อาจเป็น temporal change/confound/publication bias | S | abstract |
| GonzalezMarino2024 | AMSTAR-2: ความเชื่อมั่นใน meta-analyses ของ checklist "critically low" | A | abstract |
| Pronovost2006 | Michigan ICU: CRBSI ลดถึง 66% คงอยู่ 18 เดือน | A | abstract |
| DixonWoods2011 | Michigan = social intervention 6 กลไก; เตือน "cargo cult" | A | full_text |
| Gawande2009 | Checklist Manifesto; DO-CONFIRM vs READ-DO (Boeing/Boorman) | D | bibliographic |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| ข้อกล่าวอ้าง | ความแข็งของหลักฐาน | หมายเหตุ / ข้อโต้แย้ง |
|---|---|---|
| ตัวอย่างเล็กทำให้ผลบวกปลอมและขนาดผลเฟ้อ | **high** [Button2013] | คณิตศาสตร์ของ PPV ไม่ถูกโต้แย้ง; ระดับ power จริงต่างกันตามสาขา |
| Randomised controlled experiment ดีที่สุดสำหรับ causal claim ของการเปลี่ยนแปลงหนึ่งอย่าง | **high** [Kohavi2009_DMKD; ShadishCookCampbell2002] | ไม่บอก "ทำไม"; ระยะสั้น; primacy/newness |
| ไอเดียส่วนใหญ่ไม่ชนะเมื่อทดลองจริง (~1/3 ดี) | **medium** [Kohavi2009_ThinkWeek] | ตัวเลขภายใน Microsoft ปี 2009; ไม่ใช่กฎสากล |
| "ตัวเลขน่าสนใจมักผิด" (Twyman) | **low–medium** (heuristic) [KohaviTangXu2020] | "9 ใน 10" ของ Kohavi เป็นเรื่องเล่า ไม่ใช่อัตราที่วัด |
| Percent agreement หลอก; ควรใช้สถิติที่หักโอกาสบังเอิญ | **high** [HayesKrippendorff2007; Cohen1960] | — |
| Kappa มี paradox เมื่อ prevalence ไม่สมดุล | **high** [FeinsteinCicchetti1990] | ทางแก้: รายงาน p_pos/p_neg, alpha, หรือ Gwet AC1 (ไม่ได้ตรวจ AC1 รอบนี้) |
| Cutoff ของ kappa/ICC/alpha | **low** (ธรรมเนียม) [LandisKoch1977; KooLi2016] | ใช้เป็นภาษากลางได้ แต่เลือกตามความเสี่ยงของการตัดสิน |
| Rubric เพิ่ม reliability | **medium** [JonssonSvingby2007; Brookhart2018] | review ส่วนใหญ่ในการศึกษา; ไม่มีรูปแบบชัดระหว่างชนิด rubric กับ reliability |
| คนที่ไม่ฝึกประเมินข้อความ AI ได้ไม่ดี | **medium–high** [Clark2021] | ศึกษา GPT-2/3 ภาษาอังกฤษ 3 domain; โมเดลปัจจุบันยิ่งแยกยาก |
| LLM judge เห็นตรงกับคนระดับคน-คน | **medium** [Zheng2023] | งานเดียว, open-ended chat อังกฤษ, รวม helpfulness เป็นคะแนนเดียว; มี bias ชัด |
| FID ไม่เหมาะประเมิน T2I สมัยใหม่ | **medium** [Jayasumana2024] | ผู้เขียนเสนอ metric ของตัวเอง (CMMD) → conflict of interest ทางวิชาการเล็กน้อย; ยังไม่มีฉันทามติ |
| Crowd listening test ใช้ได้ถ้ามี QC | **medium** [ITU-T-P808; NaderiCutler2020] | ยังไม่ได้อ่านตัวเลข correlation lab-vs-crowd ฉบับเต็ม |
| WHO checklist ลดตาย/complication | **medium–low** [Haynes2009; Bergs2014; deJager2016; GonzalezMarino2024] | pre-post ไม่มี control (Hawthorne, temporal trend); meta-analyses "critically low" confidence; Ontario mandate ไม่เห็นผล [Urbach2014] |
| Michigan ICU ลดการติดเชื้อมาก | **medium** [Pronovost2006] | cohort ไม่สุ่ม; DixonWoods ชี้ว่าผลมาจาก social mechanism ไม่ใช่ตัวกระดาษ |
| Goodhart/Strathern | **medium** (THEORY, สังเกตซ้ำหลายวงการ) [Strathern1997] | เป็นข้อสังเกตเชิงคุณภาพ; Campbell's law อาจมาก่อน |
| Vanity metrics หลอกการตัดสินใจ | **low–medium** (practitioner) [Ries2009] | ความเห็นนักปฏิบัติ; vanity metric บางตัวเป็น leading indicator ได้ |
| −14 LUFS สำหรับโซเชียล | **medium** | Spotify ระบุเป็นทางการ [Spotify_Loudness]; YouTube/IG/TikTok ไม่ได้ยืนยันในรอบนี้ (ดู 12-production-qc §1.5) |
| ความต่างวัฒนธรรมในการใช้ rating scale | **medium** [Chen1995_ResponseStyle] | ศึกษาเอเชียตะวันออก vs อเมริกาเหนือ ไม่ใช่ไทยโดยตรง; ความต่าง "เล็ก" และไม่ได้เปลี่ยนการเปรียบเทียบค่าเฉลี่ยมากนัก |

**จุดที่ยังโต้แย้ง:** (1) จะถือ rater เป็น fixed หรือ random [tenHove2024 vs ธรรมเนียม Shrout-Fleiss]; (2) MOS เป็นค่าเฉลี่ยของข้อมูล ordinal — มีข้อเสนอให้รายงาน distribution/percentile (ผลค้นพาดพิง Streijl et al. 2016 และงาน Pinson 2021 — **ไม่ได้อ่าน**, ไม่ใส่เป็นแหล่ง);
(3) Checklist: Gawande โต้แย้งวิธีวิจัยของ Ontario (จากบทสรุป PSNet — ไม่ได้อ่านบทความของเขาเอง).

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 Generic: วงจร QA 7 ขั้น สำหรับงานสร้างสรรค์ใด ๆ
1. **นิยามคุณภาพก่อนผลิต** — เขียน 3–6 criteria ที่ผูกกับเป้าของ brief (ไม่ใช่ "สวย") + critical failures (ตาม Juran: planning) [Juran1986; Brookhart2018].
2. **ป้องกันในกระบวนการ** — template, validator, style bible, direction JSON (Deming ข้อ 3) [Deming1986].
3. **ตรวจเชิงเทคนิคอัตโนมัติ** (verification) — ขนาด/fps/LUFS/true-peak/การสะกด/ไฟล์เปิดได้ — ทำซ้ำได้ 100% ให้เครื่องทำ [ITU2023_BS1770_5].
4. **ตรวจเชิงรับรู้โดยคน** (validation) — rater ≥2 คนที่ไม่ได้ทำงานชิ้นนั้น, ให้คะแนนอิสระก่อนคุยกัน, ใช้ rubric + anchor.
5. **ตรวจความน่าเชื่อของการตรวจ** — ทุก ๆ N ชิ้น คำนวณ alpha/ICC; ถ้าต่ำ → แก้ descriptor/anchor ไม่ใช่โทษ rater [HayesKrippendorff2007; KooLi2016].
6. **วัดผลจริงกับผู้ชม** — ตั้ง OEC ล่วงหน้า; A/B เมื่อ power พอ, ไม่งั้นใช้เป็น "สัญญาณ" ไม่ใช่ "ข้อพิสูจน์" [Kohavi2009_DMKD; Button2013].
7. **Regression + บันทึกบทเรียน** — golden set รันซ้ำทุกครั้งที่เปลี่ยน prompt/skill/model; บันทึกใน LEARNING-LOG (Juran: improvement).

### 6.2 วิธีเขียน rubric ที่ใช้ได้ (how-to)
1. เริ่มจาก **เป้าหมาย** ไม่ใช่รายการคุณสมบัติ: "ผู้ชมเข้าใจ payoff ของ Mint & Tao ภายในการอ่านครั้งเดียว".
2. เลือก **4–6 criteria** ที่ไม่ทับกัน (Brookhart พบว่าส่วนใหญ่ใช้ 4–5 ระดับ) [Brookhart2018].
3. เขียน **descriptor เชิงสังเกต** ระดับ 1–4: "ในภาพย่อ 360 px ตัวอักษรอ่านออกทุกคำ" แทน "อ่านง่าย".
4. แยก **check (ใช่/ไม่ใช่)** ออกจาก **criterion (ระดับ)** — โลโก้/ภาษา/ขนาด = check; ความชัดของเรื่อง = criterion.
5. เลือก **anchor** อย่างน้อย 1 ชิ้นต่อระดับจากงานจริงของสตูดิโอ (เก็บเป็น golden set).
6. **Pilot:** 2–3 rater ให้คะแนน 10–30 ชิ้นแยกกัน → คำนวณ alpha (ordinal) → criterion ที่ α ต่ำ = descriptor กำกวม → เขียนใหม่ → วัดซ้ำ.
7. ระบุ **critical failures** ที่ตัดสินทันทีโดยไม่รวมคะแนน (มีแล้วใน MASTER_QUALITY_SCORE §1).

### 6.3 Reliability ในทางปฏิบัติ (สตูดิโอเล็ก)
- มี rater จริงน้อย (ผู้ใช้ 1 คน + Claude + critic sub-agent) → ใช้ **Krippendorff's alpha (ordinal)** เพราะรับ missing และ rater ต่างชุดได้ [HayesKrippendorff2007].
- **Claude หลาย instance ≠ rater อิสระหลายคน** — ข้อผิดพลาดของโมเดลเดียวกันมีแนวโน้มสัมพันธ์กัน (opinion; สอดคล้องกับ self-enhancement bias ใน [Zheng2023]). ให้นับเป็น "เครื่องมือ" คอลัมน์หนึ่ง ไม่ใช่ "หลายคน".
- Test-retest ของ AI judge: ให้คะแนนชิ้นเดิมซ้ำ (สลับลำดับ/ตำแหน่ง) แล้วดูความคงที่ — ถ้าเปลี่ยนเกิน 1 ระดับบ่อย คะแนนนั้นใช้ไม่ได้ [Zheng2023].

### 6.4 Golden set / regression สำหรับงานสร้างสรรค์
- **ประกอบ:** 20–40 ชิ้นที่รู้คำตอบแล้ว: (ก) งานดีที่ผู้ใช้อนุมัติ (ข) งานที่ผู้ใช้ตีกลับพร้อมเหตุผล (ค) "planted defects" — งานที่ใส่ข้อผิดไว้จงใจ (สะกดไทยผิด, โลโก้หาย, true-peak เกิน, หน้าตัวละครเปลี่ยน).
- **ใช้:** ทุกครั้งที่แก้ skill/prompt/critic → รัน critic กับ golden set → วัด **recall ของ planted defects** และ **false alarm** บนงานดี. ลดลง = regression → ห้าม merge.
- **เทียบกับ ML Test Score:** ต้องทดสอบทั้ง data (ชุดอ้างอิงยังแทนงานปัจจุบันไหม), model (prompt), infrastructure (tools), monitoring (ผลจริงหลังโพสต์) [Breck2017].
- **ระวัง overfitting กับ golden set:** ถ้าปรับ critic จนจับ planted defect ชุดเดิมได้ 100% ให้เพิ่มชุด held-out ใหม่ที่ไม่เคยเห็น (Goodhart) [Strathern1997].

### 6.5 Human evaluation ของสื่อที่ AI สร้าง (ภาพ/เสียง/ข้อความ)
- **เสียง TTS ไทย:** ใช้ ACR 5 ระดับแบบ P.800 (ตามที่ QUALITY_CONTROL.md ทำอยู่) และรายงาน MOS **พร้อม n, SD/CI** — MOS จาก 1 ผู้ฟังไม่ใช่ MOS [ITU-T-P800].
  ถ้าจะใช้ crowd (เช่นเพื่อน/ลูกค้า 10–20 คนผ่านแบบฟอร์ม) ทำตามแนว P.808: ตรวจหูฟัง/สภาพแวดล้อม, ใส่ **gold question** (ตัวอย่างที่รู้ว่าเสียงพังชัด ๆ) และ **trap** เพื่อตัดผู้ตอบมั่ว [ITU-T-P808; NaderiCutler2020].
- **ภาพ:** SSIM ใช้ตรวจ "ภาพ export เสียหายจาก master ไหม" (compression ของ IG) เท่านั้น ไม่ใช้วัดความงาม [Wang2004_SSIM]; ไม่ใช้ FID ตัดสินภาพเดี่ยว [Jayasumana2024].
  ความงาม/ความเหมาะกับ brief → rubric + คน (BT.500 หลักการ: objective measure ไม่พอ) [ITU-R_BT500].
- **LLM-as-judge (รวม critic sub-agent):** ทำ pairwise **สองรอบสลับตำแหน่ง** นับชนะเฉพาะเมื่อชนะทั้งสองรอบ ไม่งั้น = เสมอ; ให้ **reference** (brief, house rules, ภาพสินค้าจริง) เพื่อลดการตัดสินพลาด;
  ระวัง verbosity — คำวิจารณ์ยาวไม่ได้แปลว่าถูก [Zheng2023].
- **อย่าเชื่อ rater ที่ไม่ฝึก:** ผู้ชมทั่วไปอาจแยกภาพ/ข้อความ AI ไม่ได้ — ใช้ความเห็นเขาวัด "ความชอบ/ความเข้าใจ" ได้ แต่ไม่ใช่ "ความถูกต้องทางเทคนิค" [Clark2021].
- **วางแผน human eval ล่วงหน้า:** ระบุ criteria, scale, จำนวน rater, การสุ่มลำดับ, และรายงาน agreement [vanderLee2021].

### 6.6 Before-vs-after (เช่น studio-benchmark) — อ่านผลอย่างไรไม่ให้หลอกตัวเอง
`creative-intelligence/evaluations/studio-benchmark/` วัดความสามารถ "ก่อน vs หลัง" อัปเกรดความรู้ด้วยงานชุดเดียวกัน — เป็น pre-post design จึงเสี่ยง:
- **Instrumentation:** ผู้ให้คะแนน/เกณฑ์เปลี่ยนระหว่างรอบ → ล็อก KEY และ rubric ก่อนรอบแรก (ทำอยู่แล้ว: `_key/` + `baseline.sha256`) และให้คะแนนแบบ **blind** (ผู้ตรวจไม่รู้ว่าคำตอบมาจากรอบไหน; สุ่มลำดับ).
- **Testing effect / leakage:** ถ้าความรู้ใหม่ถูกเขียนโดยเห็นโจทย์ benchmark → คะแนนเฟ้อ (Goodhart) → ต้องมี **held-out tasks** ที่ไม่ได้ใช้ตอนพัฒนา [Strathern1997].
- **History/maturation:** โมเดล/เครื่องมือเปลี่ยนเวอร์ชันระหว่างรอบ → บันทึก model id/วันที่; ถ้าเป็นไปได้รัน baseline ซ้ำในวันเดียวกับ after (concurrent control).
- **Randomness ของ LLM:** รันแต่ละ task ≥3 ครั้ง/รอบ แล้วดูการกระจาย — ความต่างที่เล็กกว่าความแปรปรวนภายในรอบ = noise (common cause) [Shewhart1931].
- **Regression to the mean:** ถ้าเลือก "task ที่ baseline แย่สุด" มาโชว์ว่าดีขึ้น → ส่วนหนึ่งดีขึ้นเอง; รายงาน **ทุก task**.
- **รายงาน:** ค่าเฉลี่ย + ช่วง, จำนวน task ที่ดีขึ้น/แย่ลง/เท่าเดิม, และ critical failures ที่หายไป/เกิดใหม่ (regression) — ไม่ใช่ตัวเลขรวมตัวเดียว.

### 6.7 A/B test สำหรับร้านเล็ก/เพจเล็ก
- **ตั้ง OEC ที่ใกล้ธุรกิจ:** สำหรับร้านแว่นคือ **cost per chat / chats started** (ตาม 12-production-qc §1.7) ไม่ใช่ likes [Ries2009; Kohavi2009_DMKD].
- **เปลี่ยนทีละตัวแปร** (เช่น hook 3 วินาทีแรก) และใช้ฟีเจอร์ A/B test ของ Meta ที่สุ่มกลุ่มให้ (ไม่ใช่โพสต์สองวันแล้วเทียบ — นั่นคือ before/after ที่มี confound วัน/เวลา/อัลกอริทึม).
- **คำนวณ power คร่าว ๆ ก่อน** (n ≈ 16σ²/Δ²) — ถ้า impressions ไม่พอ ให้ทดสอบเฉพาะความต่างใหญ่ (คอนเซ็ปต์ต่างกันชัด) หรือยอมรับว่าเป็นการสำรวจ [Kohavi2009_DMKD; Button2013].
- **ตรวจ SRM:** ถ้าตั้ง 50/50 แต่ impressions ออก 60/40 → ผลไม่น่าเชื่อ (การส่งแอดของแพลตฟอร์ม optimise ไม่เท่ากัน) [Fabijan2019].
- **Twyman:** ผลชนะ +80% จากแอดใหม่ → ตรวจก่อนว่ากลุ่มเป้าหมาย/งบ/ช่วงเวลาเท่ากันไหม [KohaviTangXu2020].
- **ระวัง novelty:** ครีเอทีฟใหม่ชนะสัปดาห์แรกเพราะใหม่ — ดูผลต่อเนื่อง ≥2 สัปดาห์ก่อนสรุป [Kohavi2009_DMKD].

### 6.8 Loudness/เสียงก่อนส่ง (เชื่อมกับของเดิม)
- วัด integrated loudness + true peak ด้วย BS.1770 (`ffmpeg ebur128`/`loudnorm`); เป้าของสตูดิโอ −14 LUFS / TP ≤ −1.5 dBTP อยู่ใน 12-production-qc แล้ว;
  เหตุผลภายนอก: Spotify −14 LUFS default และแนะนำ TP < −1 dBTP (หรือ < −2 ถ้ามาสเตอร์ดังกว่า −14) [Spotify_Loudness]; broadcast ใช้ −23 LUFS ±0.5 LU [EBU2020_R128].
- QC ข้อนี้ **ให้เครื่องทำ** (ซ้ำได้) แล้วให้คนฟังเรื่อง "เสียงพูดชัดกว่าเพลงไหม" (validation) — ตัวเลขผ่านไม่ได้แปลว่าฟังดี.

### 6.9 ตัวอย่างประยุกต์กับงานของสตูดิโอ
- **Slowly Growing (Mint & Tao, IG 1:1 carousel):** rubric analytic 5 ข้อ — (1) payoff เข้าใจได้ในการอ่านครั้งเดียว (2) บทพูดไทยเป็นธรรมชาติ/สะกดถูก (3) ตัวละครคงที่ตาม bible
  (4) ภาพอ่านได้ที่ขนาดฟีด (5) อารมณ์ตรงกับเป้า. Golden set = 10 เซ็ตที่ผู้ใช้ชม + 5 ที่ตีกลับ + 5 planted defects (เช่น ใบหน้า Mint ถูกวาดมีตา = ผิด bible "faceless").
- **Story clips ไทย + TTS:** MOS ต่อบรรทัดจากผู้ฟังไทย ≥3 คน (ไม่ใช่ Claude) + CER อัตโนมัติจาก qc.py เป็นคอลัมน์แยก; รายงานบรรทัดที่แย่ที่สุดด้วย (มีแล้วใน QUALITY_CONTROL.md).
- **Product clip แว่น:** critical check "สินค้าเหมือนรูปจริง" ใช้ **paired comparison** ภาพจริง vs เฟรมคลิป ทีละมุม (กรอบ, สี, โลโก้ขา, สีเลนส์) — เป็น full-reference check เชิงคน.
- **Caption/โพสต์:** ตัวชี้วัดฟีด (reach, likes) = vanity สำหรับร้าน; actionable = แชทที่เริ่ม/ลูกค้านัดตรวจตา แยกตาม cohort ของโพสต์ [Ries2009].

### 6.10 ตัวอย่างเต็ม: analytic rubric สำหรับ Slowly Growing carousel (ร่างเพื่อ pilot — ยังไม่ได้วัด reliability)
สร้างตามหลัก §6.2 (descriptor สังเกตได้, แยก check ออก). **Checks ก่อนให้คะแนน:** 1:1, ไม่มีโลโก้ (ตามกฎ quote images), ตัวละคร faceless, ภาษาไทยสะกดถูก — ไม่ผ่านข้อใด = ไม่ให้คะแนน.

| Criterion | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **Payoff clarity** | ผู้อ่านใหม่ 2 ใน 3 คนอธิบาย "ประเด็น" ไม่ได้ | อธิบายได้หลังอ่านซ้ำ หรือต้องอ่าน caption | อธิบายได้ในการอ่านครั้งเดียว | + บอกได้ว่าสไลด์ไหนเป็นจุดหักมุม โดยไม่ถูกถาม |
| **Dialogue naturalness (ไทย)** | มีประโยคที่คนไทยไม่พูดจริง ≥2 จุด หรือระดับภาษาผิดความสัมพันธ์ | 1 จุด | ทุกประโยคพูดออกเสียงได้ลื่น ระดับภาษาตรงตัวละคร | + มีคำ/จังหวะเฉพาะตัวของ Mint หรือ Tao ที่จำได้ |
| **Character consistency** | สัดส่วน/เสื้อผ้า/ท่าทางต่างจาก bible ชัดในสไลด์ใดสไลด์หนึ่ง | ต่างเล็กน้อยที่ผู้ตรวจเห็นเมื่อวางเทียบ | ตรง bible ทุกสไลด์เมื่อวางเทียบ | + ภาษากายสื่ออารมณ์ต่างกันชัดโดยไม่หลุด bible |
| **Feed legibility** | ที่ภาพย่อ 360 px มีข้อความอ่านไม่ออก | อ่านออกแต่ต้องเพ่ง หรือบับเบิลแข่งกับภาพ | อ่านออกทุกคำ, ลำดับการอ่านชัด | + สไลด์แรกหยุดนิ้วได้: จุดเด่น 1 จุดเห็นใน <1 วินาที (ทดสอบกับคนจริง) |
| **Emotional target** | อารมณ์ที่ผู้อ่านรายงานต่างจากเป้าใน brief | ใกล้เคียงแต่จาง | ผู้อ่านส่วนใหญ่ใช้คำตรงกับเป้า | + อารมณ์เปลี่ยนตามโครง (เช่น อึดอัด → อบอุ่น) ตามที่ออกแบบ |

**Pilot protocol (our test — ยังไม่ได้รัน):** 3 ผู้ประเมิน (ผู้ใช้ + 2 ผู้อ่านไทยที่ไม่ได้ทำงาน) × 20 เซ็ตที่ตีพิมพ์แล้ว, ให้คะแนนแยก, สุ่มลำดับ →
Krippendorff's alpha ordinal ต่อ criterion → criterion ที่ α < 0.667 ให้เขียน descriptor ใหม่ + เพิ่ม anchor แล้ว pilot ซ้ำ [HayesKrippendorff2007]. เกณฑ์ 0.667 ที่นี่เป็นเกณฑ์ "งานสำรวจ" (opinion) ไม่ใช่เกณฑ์ตัดสินส่งงาน.
หมายเหตุ "ผู้อ่านใหม่ 2 ใน 3 คน" ทำให้ criterion แรกเป็น *validation กับผู้ชม* ไม่ใช่ความเห็นผู้ตรวจ — แพงกว่า แต่ valid กว่า (Messick: external aspect) [Messick1995].

### 6.11 แม่แบบรายงาน QC 8 บรรทัด (ใช้ได้ทุกชิ้นงาน)
```
ชิ้นงาน / เวอร์ชัน / วันที่:
Checks อัตโนมัติ: ผ่าน n/n (ระบุตัวที่ไม่ผ่าน + ค่าที่วัดได้ เช่น -13.2 LUFS, TP -0.6 dBTP)
Critical failures: ไม่มี | มี: <ข้อ> → หยุดส่ง
คะแนนคน (rater, อิสระ): <criterion: ระดับ — หลักฐานระบุตำแหน่ง>
คะแนน AI (provisional / validated บน golden set วันที่ ...): <...>
ความเห็นต่างระหว่าง rater > 1 ระดับ: <criterion + เหตุ>
การตัดสิน: ส่ง | แก้ <ข้อ> | ตีกลับ
บทเรียน/planted defect ใหม่: <...>
```

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

### 7.1 Michigan Keystone ICU (2003–2005 data; ตีพิมพ์ 2006)
- **บันทึกไว้:** 103 ICU รายงานข้อมูล, 375,757 catheter-days; median CRBSI ต่อ 1000 catheter-days ลด 2.7 → 0 ใน 3 เดือน; mean 7.7 → 1.4 ที่ 16–18 เดือน; ลดสูงสุด 66% [Pronovost2006].
- **ทำไมได้ผล (ex post theory):** แรงกดดันให้เข้าร่วม, เครือข่ายแนวราบ, reframe ปัญหาเป็นเรื่องแก้ได้, intervention หลายชั้น, **ข้อมูลเป็นแรงวินัย**, "hard edges" (พยาบาลมีอำนาจทักแพทย์) [DixonWoods2011].
- **บทเรียน (analysis):** QA ที่ได้ผลคือ *ระบบสังคม + การวัด + อำนาจหยุดงาน* — ในสตูดิโอ critic ต้องมีสิทธิ์ "หยุดการส่ง" จริง (critical failure) ไม่ใช่แค่ให้คะแนน.

### 7.2 WHO Surgical Safety Checklist (Haynes 2009)
- **บันทึกไว้:** 8 รพ. 8 เมือง (รายได้ต่างกัน), 3,733 vs 3,955 ผู้ป่วย; ตาย 1.5% → 0.8% (P=0.003), complication 11.0% → 7.0% (P<0.001) [Haynes2009]; 3 จุดหยุด: sign-in, time-out, sign-out (สรุป PSNet).
- **ข้อจำกัด:** pre-post ไม่มี concurrent control → Hawthorne/temporal trend เป็นไปได้ (ดู §8.1).
- **บทเรียน:** checklist ที่ดี **สั้น, อยู่ที่จุดหยุดตามธรรมชาติของงาน, เน้นการสื่อสารในทีม** และแบบ DO-CONFIRM (ทำจากความชำนาญแล้วหยุดยืนยัน) [Gawande2009]. → ในสตูดิโอ: จุดหยุด 3 จุด = ก่อนเจน (brief/สิทธิ์/quota), ก่อน render (ข้อความ/โลโก้/ภาษา), ก่อนส่ง (สเปก/LUFS/critic).

### 7.3 Online experimentation ที่ Microsoft (ExP)
- **บันทึกไว้:** ทีมประเมินว่าไอเดียที่ทดสอบ ~1/3 ดี ~1/3 แบน ~1/3 แย่; ไอเดีย "ที่คิดว่าดีแต่ทำให้ metric แย่" ≈ 1/3 ของการทดลอง; A/A test จับบั๊ก cache key และ cookie ที่ทำให้กลุ่มไม่เท่ากัน [Kohavi2009_ThinkWeek].
- **บทเรียน:** สัญชาตญาณของผู้เชี่ยวชาญ (HiPPO) ผิดบ่อยพอจะต้องวัด; และ **ต้องทดสอบระบบวัดก่อน (A/A)** — เทียบได้กับการให้ critic ตรวจ golden set ก่อนใช้จริง.

### 7.4 Loudness normalisation (BS.1770 + EBU R128 → สตรีมมิ่ง)
- **บันทึกไว้:** มาตรฐานการวัดเดียว (BS.1770, ฉบับ -5 ปี 2023) ถูกใช้ทั้ง broadcast (R128: −23 LUFS ±0.5 LU) และสตรีมมิ่ง (Spotify −14 LUFS วัดตาม ITU 1770) [ITU2023_BS1770_5; EBU2020_R128; Spotify_Loudness].
- **บทเรียน (analysis):** QC ที่ประสบความสำเร็จระดับอุตสาหกรรมเกิดเมื่อมี **เครื่องวัดที่ตกลงร่วมกัน + เป้าหมายที่ประกาศ + การ normalise ปลายทาง** — การ "ดังกว่า" จึงไม่ได้เปรียบ. สตูดิโอควรมีมาตรวัดร่วมแบบนี้สำหรับทุกอย่างที่วัดได้ (ขนาด, safe zone, LUFS).

### 7.5 P.808 crowdsourced speech quality
- **บันทึกไว้:** ITU-T ยอมรับวิธี crowdsourcing (P.808) เป็นส่วนเสริมของ lab test (P.800/P.835) [ITU-T-P808]; มี implementation open-source ที่ใส่ qualification, environment test, gold/trap questions, headset test และเทียบกับ lab MOS [NaderiCutler2020].
- **บทเรียน:** การประเมินด้วยคนจำนวนมากแบบถูกทำได้ **ถ้ามีกลไก QC ของผู้ประเมินเอง** — ใช้กับแบบฟอร์มฟังเสียง TTS จากลูกค้า/ผู้ติดตาม.

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 Ontario: บังคับใช้ checklist ทั้งมณฑล → ไม่เห็นผล (จริง, documented)
- **What:** 101 รพ., 109,341 vs 106,370 ผ่าตัด; ตาย 0.71% → 0.65% (OR 0.91, P=0.13), complication 3.86% → 3.82% (OR 0.97, P=0.29) [Urbach2014].
- **Why (ตีความ):** อัตราก่อนเริ่มต่ำอยู่แล้ว (เพดาน); การบังคับทำให้ได้ "รูปแบบ" แต่อาจไม่ได้ "กลไก" — Leape เสนอว่าต้องปรับใช้ระดับท้องถิ่น ฝึกทีม ทั้งทีมมีส่วนร่วม (สรุป PSNet); Dixon-Woods เรียกการลอกเปลือกว่า cargo cult [DixonWoods2011].
  Systematic review ภายหลังพบว่าหลายผลบวก "อาจเกิดจาก temporal change, confounding และ publication bias" [deJager2016]; meta-analyses มีความเชื่อมั่น "critically low" [GonzalezMarino2024].
- **Lesson:** checklist ที่ผู้ใช้ไม่ได้ร่วมออกแบบ = พิธีกรรม; และ **การวัดผล pre-post ของ checklist เองก็ต้องมี control**.

### 8.2 Goodhart ในการ audit มหาวิทยาลัยอังกฤษ (จริง, documented)
- **What:** เมื่อเกรด 2.1 กลายเป็นความคาดหวัง มันแยกนักศึกษาได้แย่ลง; การวัดกับเป้าหมาย "rise together" [Strathern1997].
- **Lesson สำหรับสตูดิโอ:** คะแนน 100 ของ MASTER_QUALITY_SCORE จะเฟ้อ ถ้าผู้ผลิตให้คะแนนตัวเองและรู้ว่าต้อง ≥90 → แยกบทบาท maker/critic, เก็บหลักฐานต่อคะแนน, สุ่มตรวจด้วยคน.

### 8.3 FID ขัดกับคน (จริง, documented)
- **What:** FID ไม่สะท้อนการพัฒนาของโมเดล T2I แบบค่อยเป็นค่อยไป, ไม่จับระดับ distortion, ผลเปลี่ยนตาม sample size, และ "contradicts human raters" [Jayasumana2024].
- **Lesson:** metric อัตโนมัติที่เป็นที่นิยม ≠ valid สำหรับงานของเรา; ทุก metric ต้องผ่าน **validation กับการตัดสินของคน** บน golden set ก่อนใช้ (Messick: external aspect) [Messick1995].

### 8.4 Untrained human eval และ LLM judge ที่ลำเอียง (จริง, documented)
- **What:** คนไม่ฝึกแยก GPT-3 กับคนได้ ~บังเอิญ [Clark2021]; LLM judge บางตัวเลือกคำตอบตำแหน่งแรก 75% และถูกหลอกด้วยการ "พูดซ้ำให้ยาว" 91.3% (Claude-v1, GPT-3.5) [Zheng2023].
- **Lesson:** ทั้งคนและ AI ต้องมี **protocol** (การฝึก, anchor, สลับตำแหน่ง, reference) — "มีคนตรวจแล้ว" หรือ "AI ให้ 92" ไม่ใช่หลักฐานคุณภาพโดยตัวมันเอง.

### 8.5 A/B ร้านเล็กที่ "ชนะ" เพราะ noise (typical failure — **ตัวอย่างสมมติ, ไม่ใช่เหตุการณ์จริง**)
- **What:** แอด A ได้ 6 แชทจาก 3,000 impressions, B ได้ 11 แชท → ทีมสรุปว่า B ดีกว่า 83% แล้วเปลี่ยนสูตรครีเอทีฟทั้งหมด; เดือนต่อมาผลกลับ.
- **Why:** จำนวนเหตุการณ์น้อยมาก (power ต่ำ) → ผลที่ "ชนะ" มักถูกขยาย (winner's curse) [Button2013]; งบ/การส่งแอดไม่เท่ากัน (SRM) [Fabijan2019]; novelty [Kohavi2009_DMKD].
- **Lesson:** ใช้ผลแบบนี้เป็น hypothesis แล้วทดสอบซ้ำ; ตัดสินจากหลายรอบ/ช่วงยาว; รายงาน CI ไม่ใช่แค่ % ต่าง.

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

- **วัฒนธรรมการให้คะแนน (Thai/East Asian vs Western):** นักเรียนญี่ปุ่น/ไต้หวันใช้จุดกลาง scale มากกว่า, นักเรียนสหรัฐใช้ปลายสุดมากกว่า (ความต่างเล็กแต่มีนัยสำคัญ) [Chen1995_ResponseStyle].
  ไม่มีข้อมูลไทยโดยตรงในรอบนี้ — สมมติฐาน (opinion): ผู้ประเมินไทยอาจเลี่ยงคะแนนต่ำเพื่อรักษาน้ำใจ (เกรงใจ) → ใช้ **forced-choice/paired comparison** ("A หรือ B ดีกว่า") และ **4 ระดับไม่มีจุดกลาง** เมื่อขอความเห็นลูกค้า/ทีม.
- **ภาษา:** การประเมินเสียงไทยต้องใช้ผู้ฟังเจ้าของภาษา (วรรณยุกต์, ความยาวสระ) — ตามที่ QUALITY_CONTROL.md กำหนดแล้ว; metric ASR (CER) ภาษาไทยมีปัญหาการตัดคำ — ใช้เป็นสัญญาณให้ฟังซ้ำเท่านั้น.
- **แพลตฟอร์ม:** broadcast (−23 LUFS, สเปกตายตัว) vs โซเชียล (normalise ไม่เปิดเผยทุกเจ้า, สเปกเปลี่ยนบ่อย) → สเปกโซเชียลต้องตรวจซ้ำเป็นระยะ ไม่ถือเป็นค่าคงที่ [EBU2020_R128; Spotify_Loudness].
- **ประเภทงาน:** งานโปรโมทที่วัดผลได้ (แชท, ยอดจอง) → A/B มีความหมาย; งานเล่าเรื่อง/ศิลปะ (Mint & Tao) → OEC ที่เหมาะคือ retention/saves/shares + ความเห็นเชิงคุณภาพ; อย่าตัดสินงานศิลปะด้วย CTR.
- **ระดับความเสี่ยง:** ข้ออ้างสุขภาพตา/กฎหมาย = critical failure (ศูนย์ความอดทน) ; ความงาม = ช่วงยอมรับได้กว้าง. เลือกเกณฑ์ reliability ตามความเสี่ยง: งานตัดสิน "ส่ง/ไม่ส่ง" ต้องการ α สูงกว่างานสำรวจ [HayesKrippendorff2007].
- **ขนาดทีม:** checklist แบบ WHO สร้างมาสำหรับทีมหลายบทบาท; ทีมคน+AI เล็ก ๆ ต้องย่อเหลือจุดหยุดที่จับความผิดที่เกิดจริงบ่อย (ดู LESSONS_LEARNED) — ไม่ลอกยาว ๆ [DixonWoods2011].
- **ผู้ชมต่างกลุ่ม:** ผลทดสอบกับผู้ติดตามเดิม (คุ้นแบรนด์) ไม่ generalise ไปลูกค้าใหม่จากแอด (Messick: generalizability aspect) [Messick1995].

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| Domain | เชื่อมอย่างไร |
|---|---|
| 01 creative thinking & cognitive science | divergent → convergent: ใช้ rubric เฉพาะช่วงคัดเลือก ไม่ใช่ช่วงคิด; การประเมินเร็วเกินไปฆ่าไอเดีย (opinion) |
| 02 psychology & EI | ให้ feedback แบบ descriptive ลดการป้องกันตัวของผู้ทำงาน [Brookhart2018]; แยกคนออกจากผลงาน |
| 03 aesthetic intelligence & taste | taste ต้องถูก "calibrate" ด้วย anchor — ดู `creative-intelligence/knowledge/aesthetics/CRITIQUE_PROTOCOL.md` |
| 04 visual language | descriptor เชิงสังเกต (focal point, hierarchy) มาจาก visual grammar; `score.py` เป็น automated column |
| 05 semiotics | validity ของการตีความสัญลักษณ์ต้องทดสอบกับผู้ชมจริง (comprehension test) ไม่ใช่ผู้ออกแบบ |
| 06 character psychology | character consistency = regression test เทียบ bible (`knowledge/continuity/`) |
| 07 worldbuilding & continuity | continuity checks = golden reference ต่อ EP; ใช้ schema `continuity.schema.json` เป็น verification |
| 08 philosophy/literature | ข้อจำกัดของการวัด: ไม่ใช่ทุกคุณค่าวัดเป็นตัวเลขได้ (Strathern) |
| 09 cultural studies | response style ข้ามวัฒนธรรม [Chen1995_ResponseStyle]; `knowledge/culture/CULTURAL_CHECK.md` เป็น critical check |
| 10 psychoacoustics | BS.1770/R128, P.800/P.808 = การวัดการรับรู้เสียงเชิงมาตรฐาน; `knowledge/audio-engineering/MIX_PLAYBOOK.md` |
| 11 consumer psychology & marketing | OEC, A/B, vanity metrics, power — วัดผลแคมเปญ; `knowledge/audience/RETENTION_REVIEW.md` |
| 12 independent creative criticism | critic แยกจาก maker = หลัก independent inspection; skill `creative-critic` ใช้ rubric และ golden set ของโดเมนนี้ |
| 14 knowledge management | LESSONS_LEARNED / LEARNING-LOG = quality improvement loop (Juran); บันทึก failure เป็น planted defects ใหม่ |
| 15 workflow automation | ทุก check ที่ซ้ำได้ → เขียนเป็น validator/script (Deming: build quality in); regression ก่อนเปลี่ยน skill |

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 ตรวจอะไรด้วยอะไร
| ถ้าสิ่งที่ตรวจ… | ใช้ | ไม่ใช้ |
|---|---|---|
| วัดได้ด้วยเครื่องและมีสเปกชัด (ขนาด, fps, LUFS, TP, ภาษา, สะกดชื่อแบรนด์) | script อัตโนมัติ, ผ่าน/ไม่ผ่าน | ความเห็นคน |
| เทียบกับต้นฉบับได้ (สินค้าจริง, ตัวละคร bible, ภาพ master) | paired/full-reference comparison (คน ± SSIM สำหรับความเสียหายจาก encode) | คะแนนความงาม |
| เป็นการรับรู้/รสนิยม/อารมณ์ | rubric analytic + ≥2 rater อิสระ + anchor | metric อัตโนมัติอย่างเดียว |
| เป็นผลทางธุรกิจ (แชท, ยอดจอง) | experiment แบบสุ่ม (ถ้า power พอ) หรือ cohort tracking | likes/reach (vanity) |
| ต้องตัดสินเร็วจำนวนมาก | holistic rubric หรือ pairwise | analytic เต็มชุดทุกชิ้น |
| ต้อง feedback เพื่อแก้ | analytic rubric + located findings | คะแนนรวมตัวเดียว |

### 11.2 เลือกสถิติ agreement
- 2 rater + ผ่าน/ไม่ผ่าน + สัดส่วนสมดุล → kappa ได้; สัดส่วนไม่สมดุล (เช่น 95% ผ่าน) → รายงาน p_pos/p_neg หรือใช้ alpha [FeinsteinCicchetti1990; HayesKrippendorff2007].
- ≥2 rater, ordinal 1–4, มีช่องว่าง → **Krippendorff's alpha (ordinal)**.
- คะแนนต่อเนื่อง, rater ชุดเดียวกันทุกชิ้น → ICC two-way, absolute agreement, ระบุ single/mean [KooLi2016]; rater ไม่ครบทุกชิ้น → ดู [tenHove2024].
- รายงาน **ค่า + 95% CI + n ชิ้น + n rater + ระดับการวัด** เสมอ.

### 11.3 ควรทำ A/B ไหม
1. มี OEC ที่ตกลงล่วงหน้าไหม? ไม่ → กำหนดก่อน.
2. คำนวณ n ≈ 16σ²/Δ² ต่อกลุ่ม; impressions/เหตุการณ์ที่หาได้ ≥ n? ไม่ → (ก) ทดสอบความต่างใหญ่ (ข) รวมหลายรอบ (ค) ถือเป็นการสำรวจ/qualitative.
3. แพลตฟอร์มสุ่มให้จริงไหม (split test)? ไม่ → เป็น before/after → ระบุ confound.
4. ระหว่างรัน: ตรวจ SRM; อย่าแอบดูแล้วหยุดเมื่อชนะ (peeking — PRACTICE จากวงการ A/B; ไม่ได้ตรวจแหล่งเฉพาะรอบนี้).
5. ผลน่าตื่นเต้นเกิน → Twyman: ตรวจ pipeline ก่อน.

### 11.4 Checklist ควรเป็นแบบไหน
- งานที่ทีมทำเป็นอยู่แล้ว ต้องการจับสิ่งที่ลืม → **DO-CONFIRM** ที่จุดหยุด; งานใหม่/ซับซ้อนที่ทำไม่บ่อย (เช่น setup ComfyUI) → **READ-DO** [Gawande2009].
- เก็บเฉพาะข้อที่ (ก) ลืมบ่อยจริง (ข) ผลร้ายแรง (ค) ตรวจได้ใน <30 วินาที (craft); ข้ออื่นย้ายไป validator อัตโนมัติ.
- ทบทวน checklist ทุกครั้งที่มี failure ใหม่ที่ checklist ไม่จับ (improvement loop).

### 11.5 เมื่อไหร่เชื่อ AI judge ได้
- มี golden set ที่คนตัดสินแล้ว และ AI judge เห็นตรงกับคน ≥ ระดับคน-คน บนชุดนั้น → ใช้เป็น first-pass ได้ [Zheng2023].
- ทุก pairwise ต้องสลับตำแหน่ง; ทุกคะแนนต้องมี located evidence; ห้ามใช้ AI judge ตัดสิน critical failure ด้านภาษาไทย/สุขภาพคนเดียว.
- ไม่เคย validate → คะแนน AI = provisional (สอดคล้องกับ QUALITY_CONTROL.md "claude-provisional").

---

## 12. แบบฝึกหัด (Exercises)

1. **(พื้นฐาน) แยก check กับ criterion** — นำ rubric 10 ข้อใน `story-clips/_craft/curriculum/12-production-qc.md` §8 มาแยกเป็น check (ใช่/ไม่ใช่) vs criterion (ระดับ).
   *คำตอบที่ดี:* สเปก/โลโก้/ภาษา/LUFS เป็น check; storytelling/emotion เป็น criterion; อธิบายว่าทำไมการรวมสองชนิดในคะแนนเดียวบิด validity [Brookhart2018].
2. **(พื้นฐาน) เขียน descriptor ใหม่** — เปลี่ยน "ภาพสวย, อ่านง่าย" เป็น descriptor ระดับ 1–4 ที่สังเกตได้สำหรับ carousel 1:1.
   *คำตอบที่ดี:* ใช้สิ่งที่สองคนตรวจแล้วได้ผลเดียวกัน (ขนาดตัวอักษรที่ 360 px, จุดเด่นอันดับ 1, จำนวนองค์ประกอบแข่งกัน) ไม่มีคำประเมินลอย ๆ.
3. **(กลาง) คำนวณ agreement** — rater 2 คนให้ ผ่าน/ไม่ผ่าน 20 ชิ้น: ตรงกัน 18 ชิ้น, ทั้งคู่ให้ "ผ่าน" 17 ชิ้น. คำนวณ % agreement และ kappa แล้วอธิบายว่าทำไม kappa ต่ำทั้งที่ตรงกัน 90%.
   *คำตอบที่ดี:* เห็น paradox จาก prevalence สูง; เสนอรายงาน p_pos/p_neg หรือ alpha; ไม่สรุปว่า "rater แย่" [FeinsteinCicchetti1990].
4. **(กลาง) ออกแบบ golden set** — สร้าง golden set 20 ชิ้นสำหรับ critic ของ product clip แว่น พร้อม planted defects อย่างน้อย 6 ชนิด และวิธีวัด recall/false alarm.
   *คำตอบที่ดี:* ครอบคลุม critical failures จริงของสตูดิโอ, มี held-out, ระบุว่าจะรันเมื่อไหร่ (ก่อนแก้ skill) และเกณฑ์ไม่ให้ merge.
5. **(กลาง) วิจารณ์ before/after** — ผลรอบ after ของ studio-benchmark ดีขึ้น 12 คะแนนเฉลี่ย. เขียน 5 คำอธิบายทางเลือกที่ไม่ใช่ "ความรู้ดีขึ้น" และวิธีตัดแต่ละข้อ.
   *คำตอบที่ดี:* instrumentation, leakage/testing, model version (history), LLM randomness, regression to mean, rater ไม่ blind — พร้อมวิธีแก้เฉพาะ [ShadishCookCampbell2002].
6. **(สูง) Power** — แอดของร้านมี CTR 1.5% ต้องการตรวจจับ +20% สัมพัทธ์ ด้วย 95%/80%. ต้องใช้ impressions เท่าไรต่อกลุ่ม? ถ้างบได้ 8,000 ต่อกลุ่ม จะทำอย่างไร?
   *คำตอบที่ดี:* σ² ≈ 0.01478, Δ = 0.003 → n ≈ 16×0.01478/0.000009 ≈ 26,000; งบไม่พอ → เพิ่มขนาดความต่างที่ทดสอบ/รวมรอบ/เปลี่ยน OEC ให้ใกล้ funnel บนขึ้น; ไม่สรุปจากรอบเดียว [Kohavi2009_DMKD; Button2013].
7. **(สูง) Validate AI judge** — ออกแบบการทดลองเพื่อดูว่า critic sub-agent เชื่อถือได้แค่ไหนในการให้คะแนน Mint & Tao carousel.
   *คำตอบที่ดี:* golden set ที่ผู้ใช้ให้คะแนนแล้ว, สลับลำดับ, test-retest, วัด agreement กับคน (alpha) เทียบ agreement คน-คน, ตรวจ verbosity/position bias [Zheng2023; HayesKrippendorff2007].
8. **(สูง) Checklist redesign** — ย่อ PRE_DELIVERY_CHECK ให้เหลือจุดหยุด 3 จุดแบบ DO-CONFIRM โดยใช้ข้อมูล failure จริงจาก LESSONS_LEARNED.
   *คำตอบที่ดี:* แต่ละข้อมีที่มาจาก failure จริง, ตรวจได้เร็ว, ย้ายข้อที่อัตโนมัติได้ไปเป็น script, อธิบายว่าจะวัดว่า checklist ได้ผลอย่างไรโดยไม่ตกหลุม pre-post [Urbach2014; DixonWoods2011].

---

## 13. Checklist (ใช่/ไม่ใช่ — ก่อนใช้ผลการประเมินหรือส่งงาน)

1. [ ] เกณฑ์คุณภาพ (criteria + critical failures) เขียนไว้ **ก่อน** ผลิต/ก่อนดูผล?
2. [ ] ทุก check ที่วัดด้วยเครื่องได้ (ขนาด, fps, LUFS, true peak, ภาษา, สะกดแบรนด์) รันด้วย script แล้ว และผ่าน?
3. [ ] critical failures ทุกข้อใน MASTER_QUALITY_SCORE §1 ถูกตรวจและผ่าน (ไม่มีการเอาคะแนนส่วนอื่นมาชดเชย)?
4. [ ] ผู้ตรวจอย่างน้อยหนึ่งคน/agent **ไม่ใช่ผู้ทำ** ชิ้นงานนั้น?
5. [ ] rater ให้คะแนนแยกกันก่อนคุยกัน (independent ratings)?
6. [ ] ทุกคะแนนมีหลักฐานระบุตำแหน่ง (located evidence) ไม่ใช่ความรู้สึก?
7. [ ] คะแนนอัตโนมัติ / คะแนน AI / คะแนนคน อยู่คนละคอลัมน์ และ AI ถูกระบุว่า provisional ถ้ายังไม่ validate?
8. [ ] ถ้าใช้ AI judge แบบเปรียบเทียบ: สลับตำแหน่งแล้วผลยังเหมือนเดิม?
9. [ ] เสียงไทย/ข้อความไทย: มีผู้ฟัง/ผู้อ่านเจ้าของภาษาตรวจ?
10. [ ] ถ้ามีหลาย rater: รายงาน agreement (alpha/ICC + CI + n)?
11. [ ] สินค้า/ตัวละครถูกเทียบกับ reference จริงแบบ side-by-side?
12. [ ] golden set / regression ถูกรันหลังแก้ skill/prompt/critic ล่าสุด และไม่มี defect เดิมกลับมา?
13. [ ] ตัวเลขผลลัพธ์ที่อ้าง (ยอด, % ต่าง) มี n, ช่วงเวลา และกลุ่มเปรียบเทียบที่ชัด?
14. [ ] ถ้าเป็น A/B: แพลตฟอร์มสุ่มจริง, ไม่มี SRM, ตัวอย่างพอ (หรือระบุว่าเป็น exploratory)?
15. [ ] ถ้าผลดูดีผิดปกติ: ตรวจ pipeline/ข้อมูลแล้ว (Twyman)?
16. [ ] OEC ที่ใช้ตัดสินเป็น actionable (แชท/นัด/การจอง) ไม่ใช่ vanity (likes/reach) เพียงอย่างเดียว?
17. [ ] บันทึกผล/บทเรียน/failure ใหม่ลง LEARNING-LOG หรือ LESSONS_LEARNED และเพิ่มเป็น planted defect ใน golden set ถ้าเหมาะ?

---

## 14. Evaluation Rubric — ประเมิน "ระบบ/รายงานการประเมิน" (meta-evaluation)

ใช้ให้คะแนน *งานประเมิน* เช่น รายงาน QC ของคลิป, รายงานผล A/B, ผล benchmark ก่อน/หลัง, หรือ rubric ใหม่ที่ทีมเขียน. 6 criteria × 4 ระดับ.

| Criterion | 1 — ไม่พอ | 2 — กำลังพัฒนา | 3 — ใช้ได้ | 4 — ดีเยี่ยม |
|---|---|---|---|---|
| **A. Criteria validity** (วัดสิ่งที่ควรวัด) | เกณฑ์เป็นความชอบ/คำกว้าง ("สวย") หรือวัดแค่การทำตามคำสั่ง | มีเกณฑ์ผูกกับ brief บางข้อ แต่มี check ปนกับ criterion | เกณฑ์ผูกกับเป้าของ brief ทุกข้อ, แยก check/criterion/critical failure | + ระบุว่าแต่ละเกณฑ์ไม่ครอบคลุมอะไร (underrepresentation) และผลข้างเคียงของการใช้เกณฑ์ (consequences) |
| **B. Observable descriptors & anchors** | ไม่มี descriptor ระดับ หรือใช้คำประเมินล้วน | descriptor บางระดับ เป็นคำประเมินผสม | ทุกระดับเป็นสิ่งที่สังเกต/วัดได้ | + มี anchor งานจริงอย่างน้อย 1 ชิ้นต่อระดับ และผ่าน pilot |
| **C. Reliability evidence** | คนเดียวให้คะแนน (หรือ AI เดียว) ไม่มีตรวจซ้ำ | ≥2 ผู้ตรวจ แต่คุยกันก่อนให้คะแนน หรือรายงานแค่ % agreement | ผู้ตรวจอิสระ ≥2, รายงาน alpha/ICC ที่ถูกชนิด | + CI, n, ระดับการวัด, และแก้ descriptor ที่ agreement ต่ำแล้ววัดซ้ำ |
| **D. Design & causal reasoning** | สรุปเหตุผลจาก before/after หรือโพสต์เดียว | ระบุ confound แต่ไม่จัดการ | มีกลุ่มเปรียบเทียบ/สุ่ม หรือ blind + held-out สำหรับ pre-post | + power/sample size คิดไว้ล่วงหน้า, ตรวจ SRM/A-A/variance ภายในรอบ |
| **E. Metric honesty** | ใช้ vanity metric หรือ metric อัตโนมัติเป็นคำตัดสินสุดท้าย | มี actionable metric แต่ไม่แยกจาก vanity | OEC ล่วงหน้า; metric อัตโนมัติถูก validate หรือระบุข้อจำกัด | + รายงานทุกผล (รวมที่แย่ลง), ตรวจ Twyman, เตือน Goodhart |
| **F. Reporting & learning loop** | ตัวเลขรวมตัวเดียว ไม่มีหลักฐาน ไม่บันทึก | มีเหตุผลบางคะแนน | ทุกคะแนนมีหลักฐานระบุตำแหน่ง; แยกคอลัมน์คน/เครื่อง/AI | + บทเรียนลง log และกลายเป็น regression case/planted defect |

**วิธีให้คะแนน:** ให้ 1–4 ต่อ criterion (รวม 6–24). ≥21 = เชื่อถือได้สำหรับการตัดสินใจ · 16–20 = ใช้ได้แบบมีเงื่อนไข (ระบุข้อจำกัด) · ≤15 = ใช้เป็นข้อสังเกตเท่านั้น.
ให้ ≥2 ผู้ประเมินแยกกัน; ถ้าต่างกัน >1 ระดับใน criterion ใด ให้คุยหา descriptor ที่กำกวมแล้วบันทึก.

**Critical failures (ตัดสินว่าไม่น่าเชื่อถือทันที ไม่ว่าคะแนนรวม):**
- ผู้ทำงานเป็นผู้ให้คะแนนเพียงคนเดียว และใช้คะแนนนั้นอนุมัติการส่ง.
- เปลี่ยนเกณฑ์/key หลังเห็นผล (ทั้งที่อ้างว่าเปรียบเทียบก่อน/หลัง).
- อ้างว่า "A ดีกว่า B" จากข้อมูลที่ไม่สุ่มและไม่มีการกล่าวถึง confound.
- ใช้ AI judge ตัดสิน critical failure ด้านภาษาไทย/สุขภาพ/สิทธิ์ โดยไม่มีคนตรวจ.
- ซ่อนผลที่แย่ลง (เลือกรายงานเฉพาะ task/metric ที่ดี).

---

## 15. แหล่งอ้างอิง (References)

รูปแบบ: key — citation — URL — access_status (อ่านจริงในรอบนี้เท่าที่ระบุ)

- **NIST_SQC_History** — NIST/SEMATECH e-Handbook of Statistical Methods, §6.1.1 "How did Statistical Quality Control begin?" — https://itl.nist.gov/div898/handbook/pmc/section1/pmc11.htm — full_text
- **Shewhart1931** — Shewhart, W. A. (1931). *Economic Control of Quality of Manufactured Product*. New York: Van Nostrand. — https://itl.nist.gov/div898/handbook/pmc/section1/pmc11.htm (cited there) — bibliographic
- **Deming1986** — Deming, W. E. (1982/1986). *Out of the Crisis*. MIT CAES (14 points). — https://deming.org/fourteen-points (403 เมื่อเปิด; เนื้อหาจากผลค้น IFM Cambridge / IndustryWeek / Deming Institute) — bibliographic
- **Juran1986** — Juran, J. M. (1986). The Quality Trilogy. *Quality Progress*, 19(8), 19–24. — https://asq.org/-/media/ASQ-Supplemental-Media-Import/E/F/7/9/D/7188.pdf — bibliographic
- **ISO_QMP** — ISO. Quality management principles (ISO 9000 family; 7 principles). — https://www.iso.org/quality-management/principles (403; จากผลค้น) — search_summary
- **Myers1979** — Myers, G. J. (1979). *The Art of Software Testing*. Wiley. — https://www.oreilly.com/library/view/the-art-of/9780471469124/9780471469124_the_psychology_of_testing.html — search_summary
- **Breck2017** — Breck, E., Cai, S., Nielsen, E., Salib, M., & Sculley, D. (2017). The ML Test Score: A rubric for ML production readiness and technical debt reduction. *IEEE Big Data*, 1123–1132. doi:10.1109/BigData.2017.8258038 — https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/ — abstract
- **Cohen1960** — Cohen, J. (1960). A coefficient of agreement for nominal scales. *Educational and Psychological Measurement*, 20, 37–46. doi:10.1177/001316446002000104 — https://doi.org/10.1177/001316446002000104 — bibliographic
- **LandisKoch1977** — Landis, J. R., & Koch, G. G. (1977). The measurement of observer agreement for categorical data. *Biometrics*, 33, 159–174. doi:10.2307/2529310 — https://doi.org/10.2307/2529310 — abstract
- **ShroutFleiss1979** — Shrout, P. E., & Fleiss, J. L. (1979). Intraclass correlations: Uses in assessing rater reliability. *Psychological Bulletin*, 86(2), 420ff. doi:10.1037/0033-2909.86.2.420 — https://pubmed.ncbi.nlm.nih.gov/18839484/ — abstract
- **FeinsteinCicchetti1990** — Feinstein, A. R., & Cicchetti, D. V. (1990). High agreement but low kappa: I. The problems of two paradoxes. *J Clin Epidemiol*, 43, 543–549 (+ Part II, Cicchetti & Feinstein, 551–558). doi:10.1016/0895-4356(90)90158-L — https://doi.org/10.1016/0895-4356(90)90158-L — search_summary
- **HayesKrippendorff2007** — Hayes, A. F., & Krippendorff, K. (2007). Answering the call for a standard reliability measure for coding data. *Communication Methods and Measures*, 1(1), 77–89. doi:10.1080/19312450709336664 — https://www.asc.upenn.edu/sites/default/files/2021-03/Answering%20the%20Call%20for%20a%20Standard%20Reliability%20Measure%20for%20Coding%20Data.pdf — full_text
- **KooLi2016** — Koo, T. K., & Li, M. Y. (2016). A guideline of selecting and reporting intraclass correlation coefficients for reliability research. *Journal of Chiropractic Medicine*. doi:10.1016/j.jcm.2016.02.012 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4913118/ — full_text
- **tenHove2024** — ten Hove, D., Jorgensen, T. D., & van der Ark, L. A. (2024; online 2022). Updated guidelines on selecting an ICC for interrater reliability, with applications to incomplete observational designs. *Psychological Methods*, 29(5), 967–979. doi:10.1037/met0000516 — https://doi.org/10.1037/met0000516 — abstract
- **Messick1995** — Messick, S. (1995). Validity of psychological assessment. *American Psychologist*, 50(9), 741–749. doi:10.1037/0003-066X.50.9.741 — https://www.ets.org/research/policy_research_reports/publications/article/1995/buwh.html — abstract
- **JonssonSvingby2007** — Jönsson, A., & Svingby, G. (2007). The use of scoring rubrics: Reliability, validity and educational consequences. *Educational Research Review*, 2(2), 130–144. doi:10.1016/j.edurev.2007.05.002 — https://doi.org/10.1016/j.edurev.2007.05.002 — bibliographic
- **Brookhart2018** — Brookhart, S. M. (2018). Appropriate criteria: Key to effective rubrics. *Frontiers in Education*, 3:22. doi:10.3389/feduc.2018.00022 — https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2018.00022/full — full_text (อ่าน ~87% ของหน้า)
- **Chen1995_ResponseStyle** — Chen, C., Lee, S.-Y., & Stevenson, H. W. (1995). Response style and cross-cultural comparisons of rating scales among East Asian and North American students. *Psychological Science*. doi:10.1111/j.1467-9280.1995.tb00327.x — https://escholarship.org/uc/item/1b00n182 — abstract
- **KohaviTangXu2020** — Kohavi, R., Tang, D., & Xu, Y. (2020). *Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing*. Cambridge University Press. doi:10.1017/9781108653985 — https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/D97B26382EB0EB2DC2019A7A7B518F59 — publisher_page
- **Kohavi2009_DMKD** — Kohavi, R., Longbotham, R., Sommerfield, D., & Henne, R. M. (2009). Controlled experiments on the web: Survey and practical guide. *Data Mining and Knowledge Discovery*, 18(1), 140–181. doi:10.1007/s10618-008-0114-1 — https://link.springer.com/content/pdf/10.1007/s10618-008-0114-1.pdf — full_text
- **Kohavi2009_ThinkWeek** — Kohavi, R., Crook, T., Longbotham, R., Frasca, B., Henne, R., Lavista Ferres, J., & Melamed, T. (2009). Online Experimentation at Microsoft (ThinkWeek paper, public version). — https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf — full_text
- **Fabijan2019** — Fabijan, A., et al. (2019). Diagnosing sample ratio mismatch in online controlled experiments: A taxonomy and rules of thumb for practitioners. *KDD '19*, 2156–2164. doi:10.1145/3292500.3330722 — https://www.lukasvermeer.nl/publications/papers/2019/07/25/diagnosing-sample-ratio-mismatch-in-online-controlled-experiments.html — abstract
- **Button2013** — Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: Why small sample size undermines the reliability of neuroscience. *Nature Reviews Neuroscience*. doi:10.1038/nrn3475 — https://www.gwern.net/doc/statistics/bias/2013-button.pdf — full_text
- **ShadishCookCampbell2002** — Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002). *Experimental and Quasi-Experimental Designs for Generalized Causal Inference*. Houghton Mifflin. — https://www.jmu.edu/assessment/sass/_files/threats-to-validity-handout.pdf (secondary handout) — bibliographic
- **Ries2009** — Ries, E. (2009, May 19). Vanity metrics vs. actionable metrics (guest post). — https://tim.blog/blog/2009/05/19/vanity-metrics-vs-actionable-metrics/ — full_text
- **Strathern1997** — Strathern, M. (1997). 'Improving ratings': Audit in the British university system. *European Review*, 5(3), 305–321. — https://www.gwern.net/doc/statistics/decision/1997-strathern.pdf — full_text
- **ITU-T-P800** — ITU-T Recommendation P.800 (08/1996). Methods for subjective determination of transmission quality (in force). — https://www.itu.int/rec/T-REC-P.800-199608-I — publisher_page
- **ITU-T-P808** — ITU-T Recommendation P.808 (06/2021). Subjective evaluation of speech quality with a crowdsourcing approach (in force). — https://www.itu.int/rec/T-REC-P.808 — publisher_page
- **NaderiCutler2020** — Naderi, B., & Cutler, R. (2020). An open source implementation of ITU-T Recommendation P.808 with validation. arXiv:2005.08138. — https://arxiv.org/abs/2005.08138 — abstract
- **ITU-R_BT500** — ITU-R Recommendation BT.500-15 (05/2023). Methodologies for the subjective assessment of the quality of television images. — https://www.itu.int/rec/R-REC-BT.500 — search_summary
- **Wang2004_SSIM** — Wang, Z., Bovik, A. C., Sheikh, H. R., & Simoncelli, E. P. (2004). Image quality assessment: From error visibility to structural similarity. *IEEE Trans. Image Processing*, 13(4), 600–612. doi:10.1109/TIP.2003.819861 — https://ece.uwaterloo.ca/~z70wang/publications/ssim.html — abstract
- **Jayasumana2024** — Jayasumana, S., et al. (2024). Rethinking FID: Towards a better evaluation metric for image generation. arXiv:2401.09603. — https://arxiv.org/abs/2401.09603 — abstract
- **Zheng2023** — Zheng, L., et al. (2023). Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena. *NeurIPS 2023*; arXiv:2306.05685. — https://arxiv.org/html/2306.05685v4 — full_text
- **Clark2021** — Clark, E., August, T., Serrano, S., Haduong, N., Gururangan, S., & Smith, N. A. (2021). All that's 'human' is not gold: Evaluating human evaluation of generated text. *ACL-IJCNLP 2021*, 7282–7296. — https://aclanthology.org/2021.acl-long.565 — abstract
- **vanderLee2021** — van der Lee, C., Gatt, A., van Miltenburg, E., & Krahmer, E. (2021). Human evaluation of automatically generated text: Current trends and best practice guidelines. *Computer Speech & Language*, 67, 101151. doi:10.1016/j.csl.2020.101151 — https://www.sciencedirect.com/science/article/pii/S088523082030084X — abstract
- **ITU2023_BS1770_5** — ITU-R Recommendation BS.1770-5 (11/2023). Algorithms to measure audio programme loudness and true-peak audio level (in force). — https://www.itu.int/rec/R-REC-BS.1770 — publisher_page
- **EBU2020_R128** — EBU R 128: Loudness normalisation and permitted maximum level of audio signals (v4.0 2020 in registry; publication page shows v5.0, 21 Nov 2023). — https://tech.ebu.ch/publications/r128 — publisher_page (−1 dBTP มาจากบันทึก registry ของ v4.0 full text ที่อ่านในรอบก่อน)
- **Spotify_Loudness** — Spotify for Artists. Loudness normalization. — https://support.spotify.com/us/artists/article/loudness-normalization/ — full_text
- **Haynes2009** — Haynes, A. B., Weiser, T. G., Berry, W. R., et al. (2009). A surgical safety checklist to reduce morbidity and mortality in a global population. *NEJM*, 360(5), 491–499. doi:10.1056/NEJMsa0810119 — https://pubmed.ncbi.nlm.nih.gov/19144931/ (abstract via Europe PMC) — abstract
- **Urbach2014** — Urbach, D. R., Govindarajan, A., Saskin, R., Wilton, A. S., & Baxter, N. N. (2014). Introduction of surgical safety checklists in Ontario, Canada. *NEJM* (2014). doi:10.1056/NEJMsa1308261 — https://pubmed.ncbi.nlm.nih.gov/24620866/ (abstract via Europe PMC) — abstract
- **Bergs2014** — Bergs, J., Hellings, J., Cleemput, I., et al. (2014). Systematic review and meta-analysis of the effect of the WHO surgical safety checklist on postoperative complications. *Br J Surg*, 101(3), 150–158. doi:10.1002/bjs.9381 — https://documentserver.uhasselt.be/handle/1942/16492 — abstract
- **deJager2016** — de Jager, E., McKenna, C., Bartlett, L., Gunnarsson, R., & Ho, Y.-H. (2016). Postoperative adverse events inconsistently improved by the WHO Surgical Safety Checklist: A systematic literature review of 25 studies. *World J Surg*. doi:10.1007/s00268-016-3519-9 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4943979/ — abstract
- **GonzalezMarino2024** — González Mariño, M. A. (2024). Safety of surgery: Quality assessment of meta-analyses on the WHO checklist. *Annals of Medicine and Surgery*. doi:10.1097/MS9.0000000000002006 — https://pmc.ncbi.nlm.nih.gov/articles/PMC11060208/ — abstract
- **Pronovost2006** — Pronovost, P., Needham, D., Berenholtz, S., et al. (2006). An intervention to decrease catheter-related bloodstream infections in the ICU. *NEJM* (2006). doi:10.1056/NEJMoa061115 — https://doi.org/10.1056/NEJMoa061115 (abstract via Europe PMC) — abstract
- **DixonWoods2011** — Dixon-Woods, M., Bosk, C. L., Aveling, E. L., Goeschel, C. A., & Pronovost, P. J. (2011). Explaining Michigan: Developing an ex post theory of a quality improvement program. *Milbank Quarterly*, 89(2), 167–205. doi:10.1111/j.1468-0009.2011.00625.x — https://pmc.ncbi.nlm.nih.gov/articles/PMC3142336/ — full_text (อ่าน ~73%)
- **Gawande2009** — Gawande, A. (2009). *The Checklist Manifesto: How to Get Things Right*. Metropolitan Books. ISBN 978-0-8050-9174-8 — https://books.google.com/books/about/The_Checklist_Manifesto.html?id=x3IcNujwHxcC — bibliographic (DO-CONFIRM/READ-DO จากบทสรุปรอง)

**ไม่ได้เข้าถึง/ไม่ได้ยืนยัน:** เนื้อหาเต็มของ P.800 (ACR scale), P.800.2, BT.500, ISO 9000:2015/2026, หนังสือ Deming/Shewhart/Shadish/Gawande, Streijl et al. 2016 (MOS revisited — พบแต่ไม่ได้อ่าน จึงไม่ใส่),
ตัวเลข lab-vs-crowd ของ P.808, สเปก loudness ทางการของ YouTube/IG/TikTok, หลักฐาน peeking/sequential testing, ข้อมูล response style ของผู้ประเมินไทยโดยตรง.
