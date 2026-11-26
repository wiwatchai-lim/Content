# Domain 03 — Aesthetic Intelligence & Artistic Taste (สุนทรียปัญญาและรสนิยมทางศิลปะ)

**Modules:** M05 (Neuroaesthetics & Empirical Aesthetics) · M06 (Aesthetic Intelligence & Taste)
**ค้นคว้า:** 2026-11-26 · แหล่งอ้างอิง: `sources/03-aesthetic-intelligence-taste.json` (43 รายการ)

**Scope — ครอบคลุม:** ประวัติรสนิยม (Hume, Kant, Fechner, Dewey, Greenberg, Bourdieu + omnivore critique) ·
empirical aesthetics รุ่นใหม่ (Leder 2004/2014, VIMAP, mere exposure meta-analysis, canon formation) ·
expertise vs novice · การฝึกรสนิยม (perceptual learning, interleaving, reference library, taste gap) ·
รสนิยมร่วม vs ส่วนตัว (Vessel 2018, Germine 2015) · kitsch, cliché, "AI look" (homogenization, LAION aesthetic filter) ·
design taste ในงานจริง (Rams, Hekkert 4 หลัก) · การวัดคุณภาพสุนทรียะ (AVA, NIMA, LAION predictor, human panel) ·
ความต่างข้ามวัฒนธรรม (Masuda 2008, Reinecke & Gajos 2014, Lee et al. 2025, ญี่ปุ่น — SEP, ไทย — Jory, Pittayamatee)

**Scope — ไม่ครอบคลุม (ลิงก์แทน ไม่ทำซ้ำ):** fluency/MAYA/Berlyne inverted-U/fractal/symmetry/awe/kama muta → M05
[`../knowledge/neuroaesthetics/README.md`](../knowledge/neuroaesthetics/README.md) · ลุค premium/luxury/minimal/white space/typography/AI disclosure →
M06 [`../knowledge/aesthetics/README.md`](../knowledge/aesthetics/README.md) · คำลุค 17 คำ →
[`../knowledge/aesthetics/LOOK_DICTIONARY.md`](../knowledge/aesthetics/LOOK_DICTIONARY.md) · วิธีวิจารณ์ 3 ชั้น T/C/P →
[`../knowledge/aesthetics/CRITIQUE_PROTOCOL.md`](../knowledge/aesthetics/CRITIQUE_PROTOCOL.md) · องค์ประกอบศิลป์ (line, value, balance, hierarchy) →
[`../../.claude/skills/ai-visual-artist/ART_FUNDAMENTALS.md`](../../.claude/skills/ai-visual-artist/ART_FUNDAMENTALS.md) ·
ประสาทวิทยา (DMN, reward) → M05 · ตัวอักษรไทย → THAI_TYPOGRAPHY ของ ai-visual-artist

**Status: SOURCE VERIFIED** — 27/43 แหล่ง (63%) อ่านระดับ `full_text` หรือ `abstract` (ไม่นับ SEP Hume/Kant ที่อ่านรอบก่อน = 25/41, 61%)

**Counts by tier:** S 3 · A 29 · B 8 · C 1 · D 1 · E 1
**Counts by access_status:** full_text 17 · abstract 10 · search_summary 13 · bibliographic 2 · publisher_page 1

**Builds on:** `knowledge/aesthetics/README.md`, `LOOK_DICTIONARY.md`, `CRITIQUE_PROTOCOL.md`, `knowledge/neuroaesthetics/README.md`,
`.claude/skills/ai-visual-artist/ART_FUNDAMENTALS.md`

**ป้ายที่ใช้:** FACT (ทำซ้ำได้ดี/หลักฐานหลายชิ้น) · THEORY (โมเดล อาจถูกโต้แย้ง) · PRACTICE / **(craft)** (ธรรมเนียมช่าง) · **(opinion)** (ความเห็นเรา) · **(our test)** (สิ่งที่ต้องทดสอบเอง)
แหล่งที่เป็น `search_summary`/`bibliographic` → อ้างได้เฉพาะสิ่งที่แหล่งรองบอก และระบุไว้ในวงเล็บ

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 เส้นเวลา
| ปี | คน/งาน | ความคิดหลัก | เปลี่ยนอะไร |
|---|---|---|---|
| 1757 | Hume, *Of the Standard of Taste* | รสนิยมมาจากความรู้สึก แต่มี "true judges" ที่ดีกว่า: ประสาทละเอียด ฝึกฝน เปรียบเทียบ ปลอดอคติ; มาตรฐาน = joint verdict ของคนเหล่านั้น `[SEP_HumeAesthetics]` | รสนิยม "ฝึกได้" และ "มีผู้ตัดสินที่ดีกว่า" |
| 1790 | Kant, *Critique of Judgment* | ความงาม = ความพอใจแบบ disinterested ที่ "อ้าง" ความเป็นสากลแต่ไม่มีกฎพิสูจน์; free vs adherent beauty `[SEP_KantAesthetics]` | แยก "งาม" ออกจาก "ชอบส่วนตัว" |
| 1866/1876 | Fechner, *Das Associationsprincip* / *Vorschule der Aesthetik* | "aesthetics from below" — ศึกษาความชอบด้วยการทดลอง; ความชอบส่วนใหญ่มาจาก **associative factor** (ประวัติการเรียนรู้ของผู้ดู) มากกว่า **direct factor** (รูปทรงของวัตถุ) `[OrtliebFechner2020]` | เริ่ม empirical aesthetics |
| 1934 | Dewey, *Art as Experience* | สุนทรียะ = "an experience" ที่มีต้น-กลาง-จบ ต่อเนื่องกับชีวิตประจำวัน; วิจารณ์ "museum conception of art" `[SEP_DeweyAesthetics]` | ย้ายจาก "วัตถุ" ไปที่ "ประสบการณ์" |
| 1939 | Greenberg, *Avant-Garde and Kitsch* | kitsch = ของเทียมที่ลอกผลลัพธ์ผิว ๆ ของศิลปะ "vicarious experience and faked sensations" (ตามแหล่งรอง) `[Greenberg1939]` | ตั้งคำ kitsch เป็นศัตรูของรสนิยม (ภายหลังเขาถอยจากบางส่วน) |
| 1960s–1970s | Berlyne (psychobiological aesthetics) | arousal, novelty, complexity → inverted-U (รายละเอียดใน M05) `[LederNadal2014]` | ทฤษฎีรวมทฤษฎีแรกของจิตวิทยาสุนทรียะ หลังยุค behaviourism |
| 1979/1984 | Bourdieu, *Distinction* | รสนิยมเรียนรู้ผ่าน habitus/cultural capital และทำหน้าที่แบ่งชนชั้น — "taste classifies, and it classifies the classifier" (ตามแหล่งรอง) `[Bourdieu1984]` `[Wikipedia_Distinction]` | รสนิยม = เครื่องหมายทางสังคม ไม่ใช่แค่การรับรู้ |
| 1968–1989 | Zajonc → Bornstein meta-analysis | mere exposure: เห็นซ้ำ → ชอบขึ้น (r ≈ .26 ตามแหล่งรอง) `[Bornstein1989]` | ความคุ้นเคยเป็นตัวสร้างรสนิยม |
| 1996 | Peterson & Kern | "snob → omnivore": คนชั้นสูงในสหรัฐเปิดรับวัฒนธรรมทุกระดับมากขึ้น `[PetersonKern1996]` | ท้าทาย Bourdieu |
| 1996 | Kulka, *Kitsch and Art* | kitsch 3 เงื่อนไข (stock emotion, จำได้ทันที, ไม่เพิ่ม association) `[Kulka1996]` | นิยาม kitsch ที่ตรวจได้ |
| 2003 | Cutting | mere exposure ช่วย "รักษา canon" ของ Impressionism `[Cutting2003]` | รสนิยมร่วม = ผลของการเผยแพร่ซ้ำ |
| 2003–2006 | Hekkert | MAYA + 4 หลัก pleasure in design `[Hekkert2003]` `[Hekkert2006]` | รสนิยมออกแบบผลิตภัณฑ์ทดสอบได้ |
| 2004 / 2014 | Leder et al. / Leder & Nadal | โมเดล 5 ขั้น + emotion + context `[LederBelke2004]` `[LederNadal2014]` | กรอบหลักของสาขา |
| 2013 | Meskin et al. | เห็นงานแย่ (Kinkade) ซ้ำ → ชอบ**น้อยลง** `[Meskin2013]` | exposure ไม่ได้ทำงานแยกจากคุณภาพ |
| 2017 | Pelowski et al. VIMAP; Montoya et al. meta-analysis | outcomes หลายแบบ (ผิวเผิน → เปลี่ยนมุมมอง) `[Pelowski2017]`; exposure → liking เป็น inverted-U `[Montoya2017]` | |
| 2018 | Vessel et al. | รสนิยมร่วมสูงในใบหน้า/ธรรมชาติ ต่ำในสถาปัตยกรรม/ศิลปะ `[Vessel2018]` | "beholder's share" วัดได้ |
| 2012–2022 | AVA, NIMA, LAION-Aesthetics | วัดความงามด้วยโมเดล `[Murray2012]` `[Talebi2018]` | รสนิยมถูกฝังลงในโมเดล AI |
| 2024–2026 | Zhou & Lee; Holzner et al.; Taylor et al. | AI เพิ่ม productivity แต่ visual style ลู่เข้าหากัน `[ZhouLee2024]`; ความหลากหลายของไอเดียลดลง `[Holzner2025]`; ตัวกรอง aesthetic มีอคติ `[Taylor2026LAP]` | "AI look" มีหลักฐานเชิงปริมาณ |

### 1.2 ความคิดเปลี่ยนอย่างไร (สรุป)
1. **จากวัตถุ → ผู้ดู → บริบท → ระบบ:** Kant/Hume ถามว่า "การตัดสินงาม" คืออะไร; Fechner ทำให้วัดได้; Berlyne หา "ตัวแปรเดียว" (arousal);
   Leder ปฏิเสธคำอธิบายตัวแปรเดียว แล้วเสนอการทำงานร่วมของ cognition + emotion + context `[LederNadal2014]`; ยุค AI: รสนิยมถูกฝังในชุดข้อมูลและตัวกรอง `[Taylor2026LAP]`
2. **จาก "รสนิยมดีมีหนึ่งเดียว" → "รสนิยมมีโครงสร้างทางสังคม"** (Bourdieu) → "แต่โครงสร้างนั้นเปลี่ยนแล้ว" (omnivore) `[PetersonKern1996]`
3. **จาก "ความคุ้นเคยสร้างความชอบ" → "ความคุ้นเคย × คุณภาพ"** `[Cutting2003]` `[Meskin2013]` `[Montoya2017]`
4. ความตึงที่ไม่เคยจบ: Hume (มีมาตรฐาน) vs หลักฐานว่าความชอบส่วนตัวในบางโดเมนสูงมาก `[Vessel2018]` `[Germine2015]` — คำตอบที่ใช้งานได้: **บางชั้นของรสนิยมเป็นสากล บางชั้นเป็นส่วนตัว** (ดู §3.3)

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 นิยามที่ใช้ในเอกสารนี้
- **Aesthetic judgement:** การประเมิน (สวย/ดี/ชอบ) — ผลลัพธ์หนึ่งของโมเดล Leder; อีกผลลัพธ์คือ **aesthetic emotion** `[LederBelke2004]`
- **Taste (รสนิยม):** แนวโน้มที่ค่อนข้างคงที่ของคนหนึ่ง/กลุ่มหนึ่งในการตัดสินสุนทรียะ — ประกอบด้วย (ก) ส่วนที่ทุกคนแชร์ (ข) ส่วนที่เรียนรู้จากวัฒนธรรม/ชนชั้น (ค) ส่วนที่มาจากประวัติชีวิตส่วนตัว `[Vessel2018]` `[Germine2015]` `[Bourdieu1984]`
- **Aesthetic intelligence (ในเอกสารนี้ — นิยามทำงาน (opinion)):** ความสามารถ 4 อย่าง: (1) *รับรู้* ความต่างที่สำคัญ (perceptual learning) (2) *จัดหมวด/อ่านสไตล์* (3) *ตัดสินเทียบจุดประสงค์และผู้ชม* (4) *อธิบายและสร้างซ้ำได้* — ไม่ใช่ construct ทางจิตวิทยาที่มีมาตรวัดมาตรฐาน (ไม่พบในรอบนี้)
- **Expertise (ทางศิลปะ):** ในงานวิจัยมักวัดจากการศึกษา/อาชีพศิลปะ; ผลคือการประมวลผลต่างจาก novice (ดู §3.4)
- **Kitsch:** งานที่ (1) มีธีมบรรจุอารมณ์สำเร็จรูป (stock emotions) กระตุ้นอารมณ์แบบไม่ไตร่ตรอง (2) จำได้ทันที (3) ไม่เพิ่ม association ใหม่ `[Kulka1996]` (จากคำโปรยสำนักพิมพ์+แหล่งอ้าง); Ortlieb & Carbon เพิ่มว่าอารมณ์ต้องเป็นบวก `[OrtliebCarbon2019]`
- **Cliché (craft):** วิธีแก้ปัญหาที่เคยได้ผลจนถูกใช้ซ้ำจนผู้ชมทำนายได้ก่อนเห็น — คือ kitsch ระดับ "รูปแบบ" แทนระดับ "ธีม" **(opinion)**
- **"AI look":** ลักษณะร่วมของภาพจากโมเดลที่ผู้ชมจับได้ว่าเป็นภาพสำเร็จรูป — หลักฐานเชิงปริมาณมีด้าน *convergence ของ visual style* `[ZhouLee2024]` และ *อคติของตัวกรอง aesthetic* `[Taylor2026LAP]`; รายการสัญญาณทางสายตาอยู่ใน LOOK_DICTIONARY §17
- **Canon:** ชุดงานที่วัฒนธรรมยกย่อง สมาชิกภาพเป็นแบบไล่ระดับ (กลาง/ขอบ) เหมือน natural category `[Cutting2003]`

### 2.2 หลักการแกน 10 ข้อ
| # | หลักการ | ประเภท | แหล่ง | confidence |
|---|---|---|---|---|
| P1 | รสนิยมมีหลายชั้น: ชั้นร่วม (symmetry, ใบหน้า, ภูมิทัศน์) กับชั้นส่วนตัว (สถาปัตยกรรม, งานศิลป์, สไตล์) | FACT | `[Vessel2018]` `[Lee2025CrossCultural]` | high |
| P2 | ความชอบส่วนตัวมาจากประสบการณ์เฉพาะตัว ไม่ใช่พันธุกรรมหรือครอบครัวเป็นหลัก (ใบหน้า) | FACT (โดเมนเดียว) | `[Germine2015]` | medium–high |
| P3 | ความคุ้นเคยเพิ่มความชอบ แต่เป็น inverted-U และขึ้นกับคุณภาพ | FACT + เงื่อนไข | `[Montoya2017]` `[Meskin2013]` | medium–high |
| P4 | สิ่งที่วัฒนธรรมเผยแพร่ซ้ำกลายเป็น "รสนิยมดี" (canon) | THEORY มีข้อมูลสนับสนุน | `[Cutting2003]` | medium |
| P5 | บริบท/ป้าย/สถานที่เปลี่ยนการตัดสิน (gallery vs computer label, museum vs lab) | FACT | `[LederNadal2014]` `[Chamberlain2018]` | high |
| P6 | ผู้เชี่ยวชาญ: ให้น้ำหนัก originality สูงกว่า, ใช้สไตล์จัดหมวด, อารมณ์ตอบสนองถูกหน่วง, ชอบงานเชิงลบมากกว่า | FACT (หลายงาน แล็บ) | `[HekkertVanWieringen1996]` `[LederNadal2014]` `[LederGerger2014]` | medium–high |
| P7 | การรับรู้สุนทรียะฝึกได้ผ่าน perceptual learning (attention weighting, differentiation, unitization, imprinting) | THEORY + หลักฐานจากโดเมนอื่น | `[Goldstone1998]` `[SEP_PerceptualLearning]` | medium |
| P8 | เรียนสไตล์แบบสลับ (interleaving) ดีกว่าแบบเป็นก้อน แม้ "รู้สึก" ตรงข้าม | FACT (ทำซ้ำได้หลายครั้ง) | `[KornellBjork2008]` | high |
| P9 | ความหมาย/association ของผู้ดูมีน้ำหนักมากกว่ารูปทรงล้วน | THEORY (Fechner) | `[OrtliebFechner2020]` | medium |
| P10 | งานที่ใช้ AI/ตัวกรองความงามมีแนวโน้มลู่เข้าสู่ "ค่ากลาง" ทางสไตล์ | FACT (ข้อมูลสังเกต 1 งาน + meta-analysis ด้านไอเดีย) | `[ZhouLee2024]` `[Holzner2025]` | medium |

### 2.3 หลักออกแบบที่ใช้เป็น "ภาษารสนิยม" (craft, ไม่ใช่กฎวิทยาศาสตร์)
- **Hekkert 4 หลัก** (ทฤษฎีมีหลักฐานบางส่วน): maximum effect for minimum means · unity in variety · MAYA · optimal match (ทุกประสาทสัมผัสพูดเรื่องเดียวกัน) `[Hekkert2006]`
- **Dieter Rams 10 ข้อ** (craft, tier C): innovative · useful · aesthetic · understandable · unobtrusive · honest · long-lasting · thorough · environmentally friendly · as little design as possible ("less, but better") `[Vitsoe_Rams]`
- **Dewey:** งานดี = ประสบการณ์ที่สมบูรณ์ (สะสม มีแรงต้าน มีจังหวะ ไปถึงจุดเติมเต็ม); จังหวะแบบ functional — แต่ละช่วงสรุปของเดิมแล้วผลักไปข้างหน้า ไม่ใช่ "tick-tock" ซ้ำเดิม `[SEP_DeweyAesthetics]`

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 โมเดลกระบวนการ: Leder 2004 → 2014 → VIMAP
- **Leder 2004** (THEORY): perception → implicit memory integration (ความคุ้นเคย, prototypicality) → explicit classification (สไตล์, เนื้อหา) →
  cognitive mastering (ตีความ) → evaluation; ระหว่างทางมี emotional evaluation ต่อเนื่อง; ผลลัพธ์ = judgement + emotion `[LederBelke2004]` `[LederNadal2014]`
- **ปรับปี 2014:** emotion ไม่ใช่สภาวะภายนอกอีกต่อไป; ขั้นต้นซ้อนเวลากัน; เพิ่มบริบท (สถาบัน กายภาพ สังคม) ตามแนว Dewey ที่ว่า
  ประสบการณ์คือปฏิสัมพันธ์ของสิ่งมีชีวิตกับสิ่งแวดล้อม `[LederNadal2014]`
- **VIMAP 2017** (THEORY): รวม bottom-up (จากงาน) กับ top-down (ผู้ดูปรับตัว/เปลี่ยน) ผ่าน 3 processing checks → ผลลัพธ์ต่างกันตั้งแต่ธรรมดา
  ไปจนถึงซึ้ง สับสน รบกวนใจ หรือเปลี่ยนมุมมอง; ครอบคลุม chills, awe, sublime `[Pelowski2017]`
- **การใช้:** ใช้ลำดับขั้นเป็นลำดับตรวจงาน: "เห็นอะไร → นึกถึงอะไร → จัดเป็นแบบไหน → หมายความว่าอะไร → เข้าใจได้ไหม" — ถ้างานติดที่ "mastering" (ตีความไม่ออก) ผลอาจเป็นการปฏิเสธ
- **ข้อจำกัด:** โมเดล box-and-arrow ทดสอบทั้งระบบไม่ได้; ส่วนใหญ่ทดสอบกับศิลปะสมัยใหม่ในแล็บ `[LederNadal2014]`

### 3.2 Mere exposure: จากแล็บ → canon → คุณภาพ
- **Meta-analysis เก่า:** ผลบวก (r ≈ .26 ตาม Wikipedia/แหล่งรอง), แรงขึ้นกับสิ่งเร้าซับซ้อน, หลายสิ่งเร้า, และเมื่อไม่รู้ตัวว่าเคยเห็น `[Bornstein1989]` (search_summary)
- **Meta-analysis ใหม่:** 268 เส้นโค้งจาก 81 บทความ → **inverted-U**: ชอบขึ้นแล้วลดลงเมื่อเห็นมากไป; ชัดในสิ่งเร้าทางภาพ (ไม่ใช่เสียง),
  การเห็นสั้น < 10 วิ และยาว > 1 นาที; โมเดลเดิมอธิบายไม่ครบ `[Montoya2017]`
- **Canon:** ภาพ Impressionist 132 ภาพ นับการตีพิมพ์ในหนังสือ 980 เล่ม (4,232 ครั้ง) → ความชอบของผู้ใหญ่สัมพันธ์กับความถี่การตีพิมพ์
  ไม่ใช่กับ complexity/prototypicality/การจำได้; เด็กไม่สัมพันธ์ → ผู้ใหญ่ "เรียน" canon จากการเห็นซ้ำ `[Cutting2003]`
- **ข้อโต้แย้ง:** Cutting ใช้แต่งานคุณภาพสูง; เมื่อใช้ Kinkade (ศิลปินที่นักวิจารณ์เรียก kitsch) การเห็นซ้ำทำให้ชอบ**น้อยลง** ส่วน Millais ไม่ลด
  → exposure ขยายคุณภาพที่มีอยู่ ไม่ได้สร้างคุณภาพ `[Meskin2013]` (summary จากข่าว/บล็อก OUP)
- **นัยเชิงปรัชญา:** Nanay (2017, ตาม SEP) — ถ้าความเห็นตรงกันเกิดจากการเห็นสิ่งเดียวกันซ้ำ ข้อโต้แย้งว่า "คนเห็นตรงกัน = มีความงามจริง" ก็อ่อนลง `[SEP_PerceptualLearning]`
- **สังเคราะห์ (opinion):** template ซ้ำ ๆ ของแบรนด์ (สี โลโก้ ฟอร์แมต) ได้ประโยชน์จาก exposure **ถ้า** แต่ละชิ้นคุณภาพดีและมีความแปรผัน; ถ้า template อ่อน การซ้ำทำให้คนเบื่อเร็วขึ้น

### 3.3 รสนิยมร่วม vs รสนิยมส่วนตัว (beholder's share)
- **ระดับโดเมน:** ใบหน้าและภูมิทัศน์ธรรมชาติ = shared taste สูง; สถาปัตยกรรมภายนอก/ภายในและงานศิลป์ = individual สูง;
  ผู้เขียนเสนอว่าโดเมนธรรมชาติมี "behavioural relevance" ร่วมกัน ขณะที่ artefact ของวัฒนธรรมต้องใช้ความรู้/ประสบการณ์เฉพาะตัว `[Vessel2018]`
- **ระดับบุคคล:** แฝด 547 คู่ MZ + 214 คู่ DZ → ความชอบใบหน้าเฉพาะบุคคล: พันธุกรรม 22%, สิ่งแวดล้อมร่วม (ครอบครัว) 0%,
  สิ่งแวดล้อมเฉพาะตัว + error 78% `[Germine2015]`
- **ระดับวัฒนธรรม:** 10 ประเทศ 4,835 คน: symmetry เป็นที่ชอบทุกที่; สี่เหลี่ยมจัตุรัส 1:1 เป็นยอด; **ไม่พบ peak ที่ golden ratio ในประเทศใดเลย**;
  ญี่ปุ่นชอบเส้นตรงแบบไม่เหมือนใคร; ทำนองดนตรีต่างกันมากที่สุด `[Lee2025CrossCultural]`
- **ระดับกลุ่มประชากร:** เว็บ 430 เว็บ 2.4 ล้านคะแนน — ระดับสีที่ชอบที่สุดต่างกันตั้งแต่ 3.6 ถึง 7.6 (จาก 9) ตามกลุ่ม; การศึกษาสูง → ชอบสีน้อย/เรียบกว่า;
  อายุ 41+ ชอบสีและความซับซ้อนมากกว่า; ประเทศใกล้กันชอบคล้ายกัน `[ReineckeGajos2014]`
- **Hekkert:** หลัก unity-in-variety น่าจะเป็นสากล; MAYA ทำให้เกิดความต่างส่วนบุคคลเพราะ "อะไรใหม่/อะไรปกติ" ขึ้นกับสิ่งที่แต่ละคนเคยเห็น `[Hekkert2006]`
- **โมเดลทำงาน (opinion, สังเคราะห์):** ชั้น 1 *perceptual universals* (symmetry, contrast, figure-ground, legibility) → ตัดสินได้ค่อนข้าง "ถูก/ผิด";
  ชั้น 2 *cultural codes* (สีมงคล, ความเรียบร้อย, รหัส premium) → ถูก/ผิด **ต่อกลุ่มผู้ชม**; ชั้น 3 *personal taste* → เป็นทางเลือก ต้องทดสอบ
  ตรงกับชั้น T/C/P ใน CRITIQUE_PROTOCOL

### 3.4 Expertise: ผู้เชี่ยวชาญมองต่างอย่างไร
- **Originality:** ผู้เชี่ยวชาญกับคนทั่วไปเห็นตรงกันเรื่อง "ความแปลกใหม่" แต่ไม่ตรงกันเรื่อง craftsmanship/คุณภาพ; originality–quality r = .88 (ผู้เชี่ยวชาญ) vs .40 (ทั่วไป) `[HekkertVanWieringen1996]` (search_summary)
- **Style:** ผู้เชี่ยวชาญจัดกลุ่มงานตามสไตล์ คนทั่วไปไม่; คนทั่วไปชอบงาน representational มากกว่า abstract `[LederNadal2014]`
- **อารมณ์:** ผู้เชี่ยวชาญตอบสนองอารมณ์แบบหน่วงลง (EMG, คะแนน valence ไม่สุดโต่ง) และชอบงานเชิงลบมากกว่า — ทั้งกับงานศิลป์และภาพ IAPS → ความต่างทั่วไปในการประมวลผล ไม่ใช่เฉพาะศิลปะ `[LederGerger2014]`
- **ความกลมกลืน:** การฝึกศิลปะลดความชอบ conventional harmony (หลายงานที่ Ortlieb & Carbon อ้าง) `[OrtliebCarbon2019]`
- **Implicit vs explicit:** ความชอบ symmetry แบบอัตโนมัติไม่ต่างกันตามความเชี่ยวชาญ แต่การตัดสินแบบไตร่ตรองต่าง (M05 §2.7, `Weichselbaum2018`)
- **ผลต่องานจริง:** "ช่องว่างผู้เชี่ยวชาญ" — ทีมครีเอทีฟเห็นภาพซ้ำ ชอบความแปลก ทนความยาก มากกว่าผู้ชมในฟีด → อย่าใช้ความชอบของทีมแทนผู้ชม **(opinion ต่อยอดจากหลักฐาน)**

### 3.5 Kitsch, fluency และแรงจูงใจ
- Ortlieb & Carbon (THEORY): kitsch = fluent ให้ความพอใจเร็ว; art = disfluent ต้องใช้ความพยายาม ให้ insight; ความชอบสลับตามแรงจูงใจ —
  เมื่อรู้สึกถูกคุกคาม/prevention focus/อารมณ์เศร้า → ชอบของคุ้นเคย; เมื่อปลอดภัย/self-efficacy สูง → อยากได้ความใหม่ `[OrtliebCarbon2019]`
- หลักฐานย่อย (ตามที่บทความรวบรวม): mortality salience ลดความชอบ modern art ในคนต้องการโครงสร้างสูง; อารมณ์เศร้าเพิ่มความชอบ pattern คุ้นเคย — ผู้เขียนเองเรียกว่า preliminary
- เชื่อมกับ M05: fluency → ความพอใจ (ReberSchwarzWinkielman2004); kitsch คือ fluency ที่ "ไม่ให้อะไรเพิ่ม" (เงื่อนไขที่ 3 ของ Kulka)
- **นัย:** kitsch ไม่ได้ "ผิด" เสมอ — ในบริบทปลอบใจ (คลิปพักสายตา, เรื่องอบอุ่น) ความ fluent เป็นประโยชน์; ปัญหาคือเมื่อ **อ้างว่าลึก** แต่ไม่เพิ่ม association **(opinion)**

### 3.6 "AI look": กลไกที่มีหลักฐาน
1. **Convergence ของสไตล์ในผู้ใช้:** ศิลปินที่ใช้ AI — productivity ↑, favourites/view ↑ (~2% → ~3%), แต่ average content novelty ↓ และ
   ทั้ง average + peak **visual** novelty ↓ (ลู่เข้าสไตล์ที่นิยม); คนที่ใช้ AI สำรวจ "ไอเดีย" ใหม่ได้รางวัล แต่คนที่ใช้ AI สำรวจ "สไตล์ภาพ" ใหม่โดนลงโทษ `[ZhouLee2024]`
2. **Homogenization ข้ามคน:** meta-analysis 28 งาน — มนุษย์+GenAI ดีกว่ามนุษย์ล้วน (g = 0.27) แต่ความหลากหลายของไอเดียลดลงมาก (g = −0.86) `[Holzner2025]` (preprint; ส่วนใหญ่งานข้อความ)
3. **ตัวกรองความงามมีรสนิยมเฉพาะ:** LAION-Aesthetics Predictor (CLIP + MLP) ที่ใช้คัดข้อมูลฝึก Stable Diffusion รุ่นแรก ให้คะแนนสูงกับภาพ realistic
   ภูมิทัศน์/เมือง/พอร์ตเทรต, ศิลปะ 2 มิติตะวันตกและญี่ปุ่น; abstract art และวัตถุ 3 มิติได้ต่ำ; ไม่มีวัตถุแอฟริกา/อเมริกันพื้นเมือง/โอเชียเนียของ MET ได้ ≥ 6.5;
   คะแนนฝึกมาจากช่างภาพอังกฤษ-ตะวันตก (AVA) และผู้สนใจ AI ตะวันตก `[Taylor2026LAP]`
4. **Reward fine-tuning → mode collapse:** งาน preprint หลายชิ้นรายงานว่าการ fine-tune ด้วย aesthetic/preference reward ดันภาพไปสู่สไตล์แคบ (เช่น สไตล์เดียว, overexposure) `[PreferenceModeCollapse2025]` (search_summary)
5. **อคติของผู้ดู:** ป้าย "คอมพิวเตอร์สร้าง" ลดคุณค่า เพราะความเชื่อว่าอัลกอริทึมทำอะไรได้ `[Chamberlain2018]`; รายละเอียดผลต่อ trust อยู่ใน M06 §2.9
- **สังเคราะห์ (opinion):** "AI look" = (ก) ค่ากลางทางสไตล์ที่ตัวกรอง/reward ให้รางวัล (realistic, สวย, แสงสวยทั่วไป, ใบหน้าเฉลี่ย) + (ข) kitsch ระดับธีม (stock emotion)
  + (ค) ข้อผิดพลาดทางเทคนิค (LOOK_DICTIONARY §17) — แก้ (ก)(ข) ด้วยรสนิยม, แก้ (ค) ด้วย QC

### 3.7 รสนิยมกับชนชั้น: Bourdieu และคำวิจารณ์
- Bourdieu: aesthetic disposition (ชื่นชมรูปแบบเหนือหน้าที่) เป็นของชนชั้นที่มี cultural capital; ชนชั้นแรงงานคาดหวังให้วัตถุมีหน้าที่ — การยอมรับรสนิยมผู้ครองอำนาจเป็น symbolic violence `[Bourdieu1984]` `[Wikipedia_Distinction]` (ไม่ได้อ่านตัวหนังสือ)
- Omnivore: ข้อมูลสหรัฐ — คนชั้นสูงเปิดรับทุกระดับมากขึ้น `[PetersonKern1996]`; แหล่งรองที่พบในการค้นระบุว่าแนวคิด omnivore เองก็ยืดหยุ่นเกินไป และการ "กินทุกอย่างอย่างมีวิจารณญาณ" อาจยังเป็นการแบ่งชั้นแบบใหม่ (search_summary — ไม่ได้อ่านต้นฉบับ)
- Dewey (ก่อน Bourdieu) วิจารณ์การแยกศิลปะออกจากชีวิตไปไว้ในพิพิธภัณฑ์ซึ่งกลายเป็นที่แสดง prestige `[SEP_DeweyAesthetics]`
- **นัยต่องาน:** "ลุคแพง" คือรหัสชนชั้นที่เรียนรู้ได้ (M06 §2.2–2.4) — ใช้ได้ แต่ต้องถามว่า **ผู้ชมเป้าหมายอ่านรหัสนี้เป็นของ "พวกเรา" หรือ "ของคนอื่น"**

### 3.8 การวัดคุณภาพสุนทรียะด้วยเครื่อง: ทำอะไรได้ ทำอะไรไม่ได้
| เครื่องมือ | ฝึกจาก | ทำได้ | ข้อจำกัดที่มีหลักฐาน |
|---|---|---|---|
| AVA dataset | ภาพ 250,000+ คะแนนจากการประกวดภาพถ่าย + style labels `[Murray2012]` | benchmark | รสนิยมช่างภาพประกวด; เป็น relative quality ในการประกวด `[Taylor2026LAP]` |
| NIMA | AVA; ทำนาย "การกระจาย" คะแนน 1–10 ไม่ใช่ค่าเดียว `[Talebi2018]` | จัดอันดับภาพถ่ายใกล้ค่าเฉลี่ยมนุษย์ | ภาพ AVA ครึ่งหนึ่งมี SD > 1.4 — ความเห็นต่างเป็นธรรมชาติของข้อมูล |
| LAION-Aesthetics Predictor | SAC + LAION-Logos + AVA `[Taylor2026LAP]` | คัดข้อมูลปริมาณมหาศาล | อคติ realistic/ตะวันตก/เพศ; ผสม absolute กับ relative quality; สร้างโดยคนเดียวเป็นหลัก |
| Human panel | คนจริงกลุ่มเป้าหมาย | วัดบริบท/ความหมาย | แพง; ต้องออกแบบดี (ตัวอย่างพอ, ไม่บอกเจตนา, เกณฑ์ชัด) |
- **หลัก:** เครื่องวัดได้ "ค่ากลางของคนกลุ่มที่ใช้ฝึก" — ใช้เป็น **ตัวกรองขยะทางเทคนิค** ได้ ไม่ใช่ **ตัวเลือกผู้ชนะทางสร้างสรรค์** **(opinion ตามหลักฐาน)**; การ optimize ด้วยคะแนนเดียวผลักไปสู่ mode collapse `[PreferenceModeCollapse2025]`

### 3.9 "True judge" ของ Hume แปลงเป็นสิ่งที่วัด/ฝึกได้ (synthesis)
Hume ให้เกณฑ์ผู้ตัดสินที่ดี 5 ข้อ `[SEP_HumeAesthetics]` — แต่ละข้อมีคู่เทียบเชิงประจักษ์ที่พบในรอบนี้ (การจับคู่เป็น **(opinion)**; หลักฐานแต่ละฝั่งเป็นของแหล่งนั้น):
| Hume | คู่เทียบเชิงประจักษ์ | วิธีฝึก/ตรวจในทีม |
|---|---|---|
| Delicacy (ประสาทละเอียด) | differentiation ใน perceptual learning `[Goldstone1998]` | แบบฝึกคู่ภาพต่างเล็กน้อย (E3, §6.3) |
| Practice (ฝึกฝน) | perceptual learning ผูกกับโดเมนที่ฝึก และอาจกลายเป็นอคติเมื่อเปลี่ยนโดเมน `[RansomGoldstone2024]` | ฝึกกับฟอร์แมตจริงที่จะส่ง (ฟีดมือถือ ไม่ใช่จอใหญ่) |
| Comparison (เปรียบเทียบ) | interleaving ทำให้จับสไตล์ได้ดีกว่า `[KornellBjork2008]` | reference board สลับ, เทียบหลายเวอร์ชันเสมอ |
| Freedom from prejudice (ปลอดอคติ) | ป้าย/บริบทเปลี่ยนการตัดสิน `[LederNadal2014]` `[Chamberlain2018]`; exposure สร้างความชอบโดยไม่รู้ตัว `[Montoya2017]` | ซ่อนที่มา (AI/คน, ใครทำ) ตอนให้คะแนนรอบแรก; ระวังงานที่เห็นมาแล้ว 50 รอบ |
| Good sense (เข้าใจจุดประสงค์) | adherent beauty — ตัดสินเทียบจุดประสงค์ `[SEP_KantAesthetics]`; optimal match กับหน้าที่ `[Hekkert2006]` | เขียนเจตนาของชิ้นงานก่อนดู (CRITIQUE_PROTOCOL Step 0) |
- **ข้อจำกัด:** เกณฑ์ของ Hume ถูกวิจารณ์ว่าวนกลับ (ผู้ตัดสินดีคือคนที่ชอบงานดี) — การแปลงเป็นกระบวนการช่วยลดปัญหาแต่ไม่แก้ทางปรัชญา `[SEP_HumeAesthetics]`
- **ผลของ expertise ที่ Hume ไม่ได้คาด:** ผู้เชี่ยวชาญ "ปลอดอคติ" ไม่ได้แปลว่า "ตัดสินเหมือนผู้ชม" — อารมณ์หน่วง, ชอบ originality มากกว่า `[LederGerger2014]` `[HekkertVanWieringen1996]`
  → สตูดิโอต้องมี **สองการตัดสิน**: คุณภาพตามเกณฑ์ช่าง (expert) + การตอบรับของผู้ชมเป้าหมาย (test)

### 3.10 รสนิยมของ "ระบบ": ใครเป็นผู้ตัดสินในยุคแพลตฟอร์ม (synthesis, opinion)
- ยุค Caillebotte: ผู้คัดเลือก = รัฐ/พิพิธภัณฑ์/สำนักพิมพ์ → canon ผ่านการพิมพ์ซ้ำ `[Cutting2003]`
- ยุคโมเดลภาพ: ผู้คัดเลือก = ตัวกรองข้อมูลฝึก + reward model → ค่ากลางที่ผู้ใช้ได้รับเป็น default `[Taylor2026LAP]` `[PreferenceModeCollapse2025]`
- ยุคฟีด: ผู้คัดเลือก = อัลกอริทึมการกระจาย + พฤติกรรมผู้ชม — **ไม่ได้ค้นคว้าในรอบนี้** (เปิดไว้ให้ domain 11/13)
- นัย: "รสนิยมส่วนตัว" ของนักสร้างงานถูกดึงเข้าหาค่ากลางของระบบทั้งสามชั้นผ่าน exposure — การสร้าง reference library ที่เลือกเองอย่างมีสติคือการถ่วงน้ำหนักกลับ

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| Key | พบ/เสนออะไร | Tier | Access |
|---|---|---|---|
| `[SEP_HumeAesthetics]` | มาตรฐานรสนิยม = joint verdict ของ true judges | B | full_text (รอบก่อน) |
| `[SEP_KantAesthetics]` | disinterested, อ้างสากลไม่มีกฎ, free/adherent beauty | B | full_text (รอบก่อน) |
| `[OrtliebFechner2020]` | Fechner: associative factor > direct factor | A | abstract |
| `[SEP_DeweyAesthetics]` | "an experience", continuity, rhythm; คำวิจารณ์ Carroll, Shusterman, Saito | B | full_text |
| `[Greenberg1939]` | kitsch = ประสบการณ์มือสอง/ความรู้สึกปลอม | B | bibliographic |
| `[Kulka1996]` | kitsch 3 เงื่อนไข | A | search_summary |
| `[OrtliebCarbon2019]` | kitsch/art ตาม safety vs growth motivation | A | full_text |
| `[Bourdieu1984]` | รสนิยม = habitus + cultural capital → แบ่งชนชั้น | A | bibliographic |
| `[Wikipedia_Distinction]` | สรุปข้อโต้แย้ง/ข้อมูล survey ของ Bourdieu | E | full_text |
| `[PetersonKern1996]` | snob → omnivore | A | search_summary |
| `[LederBelke2004]` | โมเดล 5 ขั้น + 2 ผลลัพธ์ | A | search_summary |
| `[LederNadal2014]` | ทบทวน 10 ปี: emotion, context, expertise, museum vs lab | A | full_text |
| `[Pelowski2017]` | VIMAP: 3 checks → outcome หลายแบบ | A | abstract |
| `[Bornstein1989]` | mere exposure meta-analysis | S | search_summary |
| `[Montoya2017]` | exposure–liking = inverted-U | S | abstract |
| `[Cutting2003]` | exposure รักษา canon | A | abstract |
| `[Meskin2013]` | งานแย่เห็นซ้ำ → ชอบน้อยลง | A | search_summary |
| `[Vessel2018]` | shared taste: ธรรมชาติ > artefact | A | abstract |
| `[Germine2015]` | ความชอบใบหน้า: 78% สิ่งแวดล้อมเฉพาะตัว | A | full_text |
| `[ReineckeGajos2014]` | ความชอบสี/ความซับซ้อนของเว็บต่างตามกลุ่ม/ประเทศ | A | full_text |
| `[Lee2025CrossCultural]` | 10 ประเทศ: symmetry สากล, ไม่มี golden ratio | A | full_text |
| `[Masuda2008]` | เอเชียตะวันออก context-inclusive vs ตะวันตก object-focused | A | abstract |
| `[Che2018]` | review cross-cultural empirical aesthetics | A | search_summary |
| `[HekkertVanWieringen1996]` | ผู้เชี่ยวชาญให้น้ำหนัก originality (r .88 vs .40) | A | search_summary |
| `[LederGerger2014]` | ผู้เชี่ยวชาญ: อารมณ์หน่วง ชอบงานเชิงลบมากกว่า | A | abstract |
| `[Goldstone1998]` | perceptual learning 4 กลไก | A | search_summary |
| `[SEP_PerceptualLearning]` | กลไก + ข้อถกเถียง + aesthetic expertise | B | full_text |
| `[RansomGoldstone2024]` | perceptual learning มีอคติตามความสนใจ/สภาพแวดล้อมฝึก | A | abstract |
| `[KornellBjork2008]` | interleaving สอนสไตล์จิตรกรดีกว่า; ผู้เรียนเชื่อผิด | A | full_text |
| `[Glass_TasteGap]` | taste gap (craft) | D | full_text |
| `[Hekkert2006]` | 4 หลัก pleasure in design | A | full_text |
| `[Hekkert2003]` | MAYA ในผลิตภัณฑ์ | A | search_summary |
| `[Vitsoe_Rams]` | Rams 10 ข้อ | C | full_text |
| `[SEP_JapaneseAesthetics]` | wabi, sabi, yugen, iki, kire + คำเตือน essentialism | B | full_text |
| `[Jory_ThaiManners]` | ความเรียบร้อย (riap roi), กาลเทศะ (kala thesa) ใน Thai habitus | A | publisher_page |
| `[Pittayamatee2020]` | สีไทยโบราณ + ความหมายพุทธ | B | abstract |
| `[Chamberlain2018]` | อคติต่อศิลปะคอมพิวเตอร์ | A | search_summary |
| `[ZhouLee2024]` | AI: productivity ↑, visual novelty ↓ | A | full_text |
| `[Holzner2025]` | meta-analysis: diversity g = −0.86 | S | abstract |
| `[Taylor2026LAP]` | audit LAION aesthetic predictor | A | full_text |
| `[Murray2012]` | AVA dataset | A | search_summary |
| `[Talebi2018]` | NIMA: ทำนายการกระจายคะแนน | A | search_summary |
| `[PreferenceModeCollapse2025]` | reward fine-tuning → สไตล์แคบ | B | search_summary |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| ข้ออ้าง | ความแข็งแรง | เหตุผล / ข้อโต้แย้ง |
|---|---|---|
| บริบท/ป้ายเปลี่ยนการตัดสินสุนทรียะ | **high** | หลายงาน (label gallery vs computer, museum vs lab) `[LederNadal2014]`; อคติต่อ AI/คอมพิวเตอร์ `[Chamberlain2018]` |
| Interleaving สอนสไตล์ได้ดีกว่า | **high** | d ≈ 1 ใน Exp 1a, ทำซ้ำได้หลายงาน (มีโปสเตอร์ replication 2025 ตามผลค้น) `[KornellBjork2008]` — แต่วัด "จำสไตล์" ไม่ใช่ "ตัดสินคุณภาพ" |
| รสนิยมร่วมต่างตามโดเมน | **medium–high** | 2 การทดลอง, reliability เท่ากัน `[Vessel2018]`; ตัวอย่างตะวันตก ออนไลน์ |
| ความชอบส่วนตัว (ใบหน้า) มาจากประสบการณ์เฉพาะตัว | **medium–high** | แฝดจำนวนมาก `[Germine2015]`; แต่ E รวม measurement error; โดเมนเดียว |
| Exposure → liking เป็น inverted-U | **medium–high** | meta-analysis `[Montoya2017]`; โมเดลอธิบายยังไม่ลงตัว |
| Exposure รักษา canon | **medium** | correlational + แล็บ `[Cutting2003]`; ไม่ทดสอบงานคุณภาพต่ำ |
| Exposure ไม่ทำงานแยกจากคุณภาพ | **medium–low** | งานเดียว, อ่านจากข่าว, ขนาดตัวอย่างไม่ชัด `[Meskin2013]` |
| ผู้เชี่ยวชาญให้น้ำหนัก originality | **medium** | `[HekkertVanWieringen1996]` (summary) + สอดคล้องกับ Leder `[LederGerger2014]` |
| Perceptual learning ทำให้ "เห็น" สุนทรียะได้มากขึ้น | **medium** | กลไกมีหลักฐานแข็งในโดเมนอื่น `[Goldstone1998]`; การประยุกต์กับสุนทรียะเป็นข้อเสนอเชิงปรัชญา (Ransom) `[SEP_PerceptualLearning]`; Fodor แย้งว่าอาจเป็นแค่ความเชื่อ/exposure |
| AI ทำให้ visual style ลู่เข้า | **medium** | ข้อมูลจริง 4 ล้านภาพแต่แพลตฟอร์มเดียว, สังเกต ไม่สุ่ม `[ZhouLee2024]` |
| AI ลดความหลากหลายของไอเดีย | **medium** | meta-analysis preprint, ส่วนใหญ่งานข้อความ `[Holzner2025]` |
| ตัวกรอง aesthetic มีอคติวัฒนธรรม/เพศ | **medium–high** | audit 3 ชุดข้อมูล + ethnography `[Taylor2026LAP]` (preprint→FAccT) |
| Symmetry สากล / golden ratio ไม่มี peak | **medium–high** | 10 ประเทศ 400k คะแนน `[Lee2025CrossCultural]`; สอดคล้องงานเก่าที่หาความชอบ golden ratio ไม่เจอ (อ้างในเปเปอร์เดียวกัน) |
| East Asian ชอบภาพมีบริบท | **medium** | `[Masuda2008]` ญี่ปุ่น/สหรัฐ; **ไม่ได้ทดสอบคนไทย** |
| Kitsch = fluency + safety motive | **low** | ทฤษฎี, หลักฐาน preliminary `[OrtliebCarbon2019]` |
| Rams/Hekkert principles ทำให้งาน "ดี" | **low (ในฐานะวิทยาศาสตร์)** | Rams = craft; Hekkert มีหลักฐานบางหลัก (MAYA) — ใช้เป็นภาษาตรวจงาน |
| Taste gap ของ Ira Glass | **ไม่ใช่หลักฐาน** | คำแนะนำ craft `[Glass_TasteGap]`; มีคนแย้งว่า taste ไม่ได้นำงานเสมอ |

**จุดอ่อนเชิงระบบของสาขา**
1. ตัวอย่างตะวันตก นักศึกษา ออนไลน์ — งานข้ามวัฒนธรรมยังน้อย `[Che2018]` `[Lee2025CrossCultural]`; **ไม่พบงาน empirical ที่วัดรสนิยมภาพของคนไทยโดยตรง** ในรอบนี้
2. แล็บ ≠ ชีวิตจริง: museum vs lab ต่างกันจริง `[LederNadal2014]`; ฟีดโซเชียล (เลื่อนเร็ว เสียงปิด จอเล็ก) ยิ่งต่าง
3. ค่าเฉลี่ยกลุ่มซ่อนกลุ่มย่อยที่ชอบตรงข้าม (ดู M05 §3) — ทุกตัวเลข "คนชอบ X" ต้องถามว่า "คนกลุ่มไหน"
4. การวัดด้วยเครื่องสืบทอดรสนิยมของผู้ให้คะแนน `[Taylor2026LAP]`

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 Generic — กระบวนการ "Taste loop" 6 ขั้น (ใช้ได้ทุกสายงาน)
1. **ระบุชั้น:** ส่วนไหนของงานเป็นชั้น universal (อ่านออก/contrast/symmetry), cultural code, personal → ตัดสินคนละแบบ (§3.3)
2. **ระบุผู้ชม:** expert หรือ general? (§3.4) — ถ้าผู้ชมทั่วไป ลด originality ที่ต้องตีความมาก, ให้ "ทางออก" ของความแปลก (MAYA, VIMAP)
3. **สร้าง reference board แบบ interleaved:** 3–5 แนวทางวางคู่กัน ไม่ใช่ทีละแนว `[KornellBjork2008]`; รวมงานนอกผลลัพธ์ของโมเดล AI เพื่อสู้ convergence `[ZhouLee2024]`
4. **ทำหลายเวอร์ชัน (volume):** อย่างน้อย 3 ทิศที่ต่างกันจริง แล้วค่อยขัด (สู้ homogenization `[Holzner2025]`; craft: taste gap ปิดด้วยปริมาณ `[Glass_TasteGap]`)
5. **ตรวจ kitsch/cliché:** ใช้ 3 เงื่อนไข Kulka: ธีม stock emotion? จำได้ทันที? เพิ่ม association ใหม่ไหม? `[Kulka1996]` — ถ้าใช่-ใช่-ไม่ → เติม "ความเฉพาะ" หนึ่งอย่าง
6. **ตัดสินแบบแยกชั้น + ทดสอบ:** ชั้น T แก้, ชั้น C เทียบเจตนา, ชั้น P เสนอเป็นตัวเลือก/A-B (CRITIQUE_PROTOCOL) — บันทึกผลจริงลง experiments

### 6.2 Generic — สู้ "AI look" (ประยุกต์จาก §3.6)
| ต้นเหตุ | วิธีแก้ | ฐาน |
|---|---|---|
| ค่ากลางทางสไตล์ | กำหนด house style ที่เฉพาะ (palette จำกัด, เส้น/texture เฉพาะ, มุมกล้องเฉพาะ) ใน prompt ทุกครั้ง; ใช้ reference จากงานคน | `[ZhouLee2024]` `[Taylor2026LAP]` |
| ใบหน้า/ฉาก "สวยเฉลี่ย" | ใส่ความเฉพาะที่ไม่เฉลี่ย (อายุ ร่องรอย อาชีพ แสงจากแหล่งจริงหนึ่งทิศ) | `[Taylor2026LAP]` (ตัวกรองชอบ realistic portrait/landscape) + (craft) |
| ธีม stock emotion | เปลี่ยน "ฉากสำเร็จรูป" (พระอาทิตย์ตก, กอดกัน) เป็นรายละเอียดเฉพาะเรื่อง | `[Kulka1996]` |
| ลดความหลากหลายในทีม | ให้แต่ละคน/แต่ละ agent ร่างทิศก่อนดูผล AI; เลือกโดยคน | `[Holzner2025]` |
| ใช้ aesthetic score เลือก | ใช้คะแนนแค่คัดภาพเสียทางเทคนิค; เลือกผู้ชนะด้วยเกณฑ์เจตนา + คนกลุ่มเป้าหมาย | `[Talebi2018]` `[Taylor2026LAP]` |
| ผู้ชมลดค่าเมื่อรู้ว่า AI | แสดงเจตนาและงานคนเบื้องหลัง; ของจริงสำหรับสินค้า/คน (M06 §2.9) | `[Chamberlain2018]` |

### 6.3 Generic — ฝึกรสนิยมทีม (perceptual learning ในทางปฏิบัติ)
- **Attention weighting:** ฝึกดู "จุดที่ผู้เชี่ยวชาญดู" — ใช้ checklist ลำดับการดู (value → edge → hierarchy → detail) ซ้ำจนอัตโนมัติ `[Goldstone1998]` `[SEP_PerceptualLearning]`
- **Differentiation:** คู่เทียบที่ต่างกันเล็กน้อย (ภาพเดียวกัน 2 เวอร์ชัน: kerning, value key, crop) ให้ทายว่าอันไหนดีกว่าและเพราะอะไร **(craft, อิงกลไก)**
- **Unitization:** ตั้งชื่อ "หน่วย" ที่เห็นบ่อย (เช่น "แสง rim + พื้นมืด = hero shot") ให้ทีมเห็นเป็นก้อนเดียว
- **Interleaving:** reference library จัดตามคำถาม ("ภาพเงียบที่ขายได้") ไม่ใช่ตามสไตล์ล้วน; สุ่มสลับตอนทบทวน `[KornellBjork2008]`
- **Calibration กับคนอื่น (Hume):** เปรียบเทียบหลายงาน + หลายผู้ตัดสิน, จด verdict แยกก่อนคุย (กัน anchoring) `[SEP_HumeAesthetics]`
- **ระวังอคติของการฝึก:** ตาที่ฝึกกับแพลตฟอร์ม/สไตล์หนึ่งอาจตัดสินอีกแบบผิด — รีคาลิเบรตเมื่อเปลี่ยนฟอร์แมต `[RansomGoldstone2024]`
- **อย่าเชื่อความรู้สึกว่า "เรียนรู้ดี":** ผู้เรียนเชื่อว่า blocking ดีกว่า แม้ผลสอบตรงข้าม `[KornellBjork2008]`

### 6.4 สำหรับสตูดิโอ (Thai story carousels Mint & Tao, story clips, คลิปแว่น, TTS)
**Mint & Tao (charcoal/pencil, IG 1:1, ไม่มีโลโก้)**
- ชั้น universal: ตัวอักษรไทยอ่านออกบนจอมือถือ, contrast ของตัวละครกับพื้น, ช่องว่าง — ตัดสินแบบถูก/ผิด
- ชั้น cultural: ความเรียบร้อย/กาลเทศะของบทสนทนาและท่าทาง (Thai habitus `[Jory_ThaiManners]`) — ตรวจว่าภาษาภาพไม่ "หยาบ" เกินบริบทเรื่อง
- Kitsch risk สูง: เรื่องให้กำลังใจมีธีม stock emotion โดยธรรมชาติ → แต่ละเรื่องต้องมี **รายละเอียดเฉพาะหนึ่งอย่าง** ที่ผู้อ่านไม่เคยเห็น (Kulka เงื่อนไข 3) **(opinion)**
- Exposure: ซีรีส์ 160+ ชุด ใช้ฟอร์แมตเดิม → ได้ประโยชน์จากความคุ้นเคย **ถ้า** คุณภาพแต่ละชุดคงที่; ระวังจุดเบื่อ (inverted-U) — หมุนองค์ประกอบรอง (มุมมอง ฉาก จังหวะสไลด์) ทุก ~10 ชุด **(our test)** `[Montoya2017]` `[Meskin2013]`
- Interleaved reference: เก็บสไลด์ที่ engagement สูง/ต่ำ วางสลับกันตอนทบทวน แทนดูชุดล่าสุดอย่างเดียว

**Story clips (Thai VO + subs, TTS)**
- Dewey: คลิปหนึ่งตอน = "an experience" — ต้องมีแรงต้าน (ปัญหา) → การสะสม → การคลี่คลาย; จังหวะตัดแบบ functional (แต่ละช็อตต่อยอดช็อตก่อน) ไม่ใช่ตัดตามบีตซ้ำ ๆ `[SEP_DeweyAesthetics]`
- Optimal match: เสียงพากย์ (TTS) ภาพ ดนตรี ต้องพูดอารมณ์เดียวกัน `[Hekkert2006]` — เช่น ภาพ charcoal เงียบ + เสียง TTS สดใสเกิน = ไม่ match
- AI look ในฉาก: ใช้ palette/เส้นของซีรีส์คงที่, หลีกเลี่ยงแสง golden-hour สำเร็จรูปทุกฉาก (ค่ากลางที่ตัวกรองชอบ) `[Taylor2026LAP]`

**คลิป/โพสต์สินค้าแว่น**
- MAYA: กรอบแว่นต้องดู "เป็นแว่น" ชัด (typicality) ก่อนเพิ่มความแปลกของฉาก `[Hekkert2006]`
- Rams "honest/unobtrusive": ฉากไม่แย่งแว่น, ไม่ทำให้สินค้าดูดีกว่าจริง (สอดคล้องกฎบ้าน: แว่นจริง, พื้นหลังสงบ) `[Vitsoe_Rams]`
- Masuda: ผู้ชมเอเชียอาจรับภาพสินค้า "ในบริบท" (บนโต๊ะ, บนใบหน้า, ในร้าน) ได้ดีกว่าภาพลอยบนพื้นขาวล้วน — **ไม่ได้ทดสอบกับคนไทย** → A/B `[Masuda2008]` **(our test)**
- Reinecke: ระดับสีที่ "พอดี" ต่างตามกลุ่ม; ลูกค้าวัย 40+ (สายตายาว) อาจรับสี/ความซับซ้อนมากกว่ากลุ่มอายุน้อย — ข้อมูลเว็บ ไม่ใช่ไทย → ใช้เป็นสมมติฐาน `[ReineckeGajos2014]`

### 6.5 Worked example (สมมติ — ใช้สาธิตกระบวนการ ไม่ใช่งานจริงที่บันทึกไว้)
**งาน:** เฟรมเปิดคลิปแว่น 9:16 — ฉาก AI: โต๊ะไม้ แสงอาทิตย์ยามเย็นจากหน้าต่าง, แว่นจริง composite ตรงกลาง, ใบไม้เบลอฉากหน้า, ข้อความ "See the world clearly"
1. **ชั้น T:** เงาแว่นไม่ตรงทิศแสงหน้าต่าง → แก้ (ชั้น universal); ข้อความอ่านได้ใน safe zone → ผ่าน
2. **ผู้ชม:** ผู้ชมทั่วไปในฟีด, ไทย, 30–50 → fluent entry สำคัญ; ไม่ต้องดัน originality แบบ expert `[HekkertVanWieringen1996]`
3. **Anti-generic (§3.6):** "golden hour + ไม้ + ใบไม้เบลอ" = ค่ากลางของภาพ realistic ที่ตัวกรองชอบ `[Taylor2026LAP]` → ภาพสวยแต่จำแบรนด์ไม่ได้
   ทางเลือก: ใช้ palette ประจำร้าน, วัตถุเฉพาะ (กล่องแว่นของร้าน, แผ่นวัดสายตา), แสงทิศเดียวจากแหล่งที่เห็นในภาพ
4. **Kitsch test:** ข้อความ "See the world clearly" + แสงเย็น = stock emotion, จำได้ทันที, ไม่เพิ่ม association `[Kulka1996]` → เปลี่ยนเป็นรายละเอียดเฉพาะ (เช่น ตัวอักษรบนป้ายไกล ๆ ที่ค่อย ๆ ชัดเมื่อแว่นเลื่อนเข้า) — เป็นไอเดีย ไม่ใช่ข้อเท็จจริงว่าดีกว่า **(our test)**
5. **MAYA:** แว่นยังเด่นและจำหมวดได้ทันที → ความแปลกใส่ที่การเคลื่อนไหว/การเปิดเผย ไม่ใช่ที่รูปทรงสินค้า `[Hekkert2006]`
6. **Optimal match:** เพลง/เสียงที่ผู้ใช้ใส่ภายหลัง — โน้ตใน brief ว่าภาพสงบ → เพลงไม่ควรเร้าเกิน `[Hekkert2006]`
7. **ตัดสิน:** T แก้เงา; C เปลี่ยนฉากเป็น house style; P (โทนไม้อุ่น vs เย็น) → A/B
- **ผลที่คาดว่าจะบันทึก:** เวอร์ชัน generic vs เฉพาะ — completion rate / saves (บันทึกใน experiments ตาม domain 14)

### 6.6 Reference library spec (craft, อิงหลักฐาน)
| ส่วน | เนื้อหา | เหตุผล |
|---|---|---|
| Canon ภายใน | งานของเราที่ผลดีจริง (มีตัวเลข) | exposure กับงานคุณภาพดีขยายผลดี `[Meskin2013]` |
| Counter-examples | งานที่ผลแย่/เป็น cliché พร้อมเหตุผล | differentiation ต้องมีคู่เทียบ `[Goldstone1998]` |
| Outside-the-model | ภาพถ่าย/ศิลปะของคนจริง หลายวัฒนธรรม (ไทย ญี่ปุ่น ตะวันตก ฯลฯ) | ถ่วงค่ากลางของโมเดล `[ZhouLee2024]` `[Taylor2026LAP]` |
| Thai references | สีไทยโบราณพร้อมความหมาย, ภาพจิตรกรรมไทย, งานกราฟิกไทยร่วมสมัย | รหัสวัฒนธรรมผู้ชม `[Pittayamatee2020]` |
| การจัดเรียง | ตามคำถาม/ปัญหา และสลับสไตล์ตอนทบทวน | interleaving `[KornellBjork2008]` |
| การหมุนเวียน | ทบทวน/เติมทุกเดือน, ลบสิ่งที่ทุกคนเห็นจนชิน | inverted-U ของ exposure `[Montoya2017]` |

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

### 7.1 Caillebotte bequest → Impressionist canon (documented)
- **ที่บันทึกไว้:** Caillebotte ซื้องานเพื่อนจิตรกรตั้งแต่ 1876 และยกให้รัฐฝรั่งเศส; หลังต่อรองหลายปี รัฐรับ 38 ภาพ ที่เหลือถูกปฏิเสธ;
  ภาพที่เข้าคอลเลกชันรัฐถูกตีพิมพ์ซ้ำมากกว่า และความชอบของผู้ใหญ่ปัจจุบันสัมพันธ์กับความถี่การตีพิมพ์ `[Cutting2003]`
- **บทเรียน (analysis):** "รสนิยมดี" ของยุคหนึ่งถูกสร้างจาก **การคัดเลือก + การเผยแพร่ซ้ำ** — ใครควบคุม reference library ของทีม ก็ควบคุมรสนิยมทีม
- **ข้อจำกัด:** correlational; งานคุณภาพสูงทั้งหมด `[Meskin2013]`

### 7.2 Dieter Rams / Braun — "less, but better" (documented as practice)
- **ที่บันทึกไว้:** Rams ตั้ง 10 หลักช่วงปลาย 1970s เพื่อตอบคำถาม "งานของฉันดีไหม" ท่ามกลาง "ความสับสนของรูปทรง สี เสียง"; Vitsoe ยังเผยแพร่หลักนี้ภายใต้ CC BY-NC-ND `[Vitsoe_Rams]`
- **บทเรียน (analysis):** รสนิยมที่ถ่ายทอดได้ต้องเป็น **เกณฑ์ที่พูดออกมาได้** (honest, unobtrusive, thorough) ไม่ใช่ "รู้สึกว่าสวย" — คล้าย Hume ที่ว่าผู้ตัดสินดีต้องเปรียบเทียบได้
- **ข้อจำกัด:** ไม่มีงานวิจัยในรอบนี้ที่วัดว่าหลัก Rams ทำนายความชอบผู้บริโภค — ความสำเร็จเชิงประวัติศาสตร์ ไม่ใช่หลักฐานเชิงทดลอง

### 7.3 MAYA — Loewy → Hekkert (documented)
- **ที่บันทึกไว้:** Raymond Loewy ตั้งชื่อหลัก MAYA (1951); Hekkert et al. ทดสอบกับโทรศัพท์ กาต้มน้ำ รถยนต์ — typicality และ novelty ติดลบต่อกันสูงแต่ไม่สมบูรณ์ จึง "เพิ่มความใหม่โดยรักษาความเป็นแบบฉบับ" ได้ `[Hekkert2006]` `[Hekkert2003]`
- **บทเรียน:** ความใหม่ที่ขายได้คือความใหม่ที่ยังจำหมวดได้ — ใช้กับฟอร์แมตคอนเทนต์ซีรีส์เช่นกัน

### 7.4 ศิลปินที่ใช้ AI "สำรวจไอเดีย ไม่ใช่สไตล์" (documented, observational)
- **ที่บันทึกไว้:** บนแพลตฟอร์มแชร์งานศิลปะขนาดใหญ่ ผู้ใช้ AI ได้ favourites/view เพิ่มจาก ~2% เป็น ~3% ภายใน 6 เดือน; ผู้ที่ได้ประโยชน์มากสุดคือคนที่ใช้ AI สำรวจ **content** ใหม่ ขณะที่การใช้ AI สำรวจ **visual style** ใหม่ถูกประเมินต่ำ `[ZhouLee2024]`
- **บทเรียน:** ให้ AI ช่วยเรื่องจำนวนและไอเดีย แต่รักษา "ลายมือ" ทางภาพของตัวเองไว้ — ตรงกับแนวทางสตูดิโอที่ใช้สไตล์ซีรีส์คงที่ (charcoal Mint & Tao)

### 7.5 การปรับงานตามความชอบเชิงกลุ่ม (documented research tool)
- **ที่บันทึกไว้:** Reinecke & Gajos ได้ peak-appeal ของสี/ความซับซ้อนสำหรับกลุ่มประชากรต่าง ๆ และเสนอใช้ประเมินต้นแบบเว็บสำหรับกลุ่มเป้าหมาย `[ReineckeGajos2014]`
- **บทเรียน:** "รสนิยมผู้ชม" วัดได้ด้วยข้อมูลมาก ๆ — สตูดิโอเล็กทำเวอร์ชันย่อได้ด้วย A/B ของตัวเอง

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 การเห็นซ้ำทำให้แย่ลง — Kinkade (documented study)
- **อะไร:** ภาพของ Kinkade (ศิลปินที่นักวิจารณ์เรียกว่า kitsch) ยิ่งให้ดูซ้ำยิ่งถูกชอบน้อยลง `[Meskin2013]`
- **ทำไม (analysis):** ความหวานสำเร็จรูปให้ความพอใจครั้งแรก แต่ไม่มีอะไรใหม่ให้ค้นในครั้งต่อไป (Kulka เงื่อนไข 3)
- **บทเรียน:** template ซ้ำในซีรีส์ต้องมี "ชั้นที่ค้นพบได้" เพิ่มขึ้น ไม่ใช่แค่ความหวานเดิม

### 8.2 ตัวกรองความงามที่กลายเป็นรสนิยมโลก — LAION-Aesthetics (documented audit)
- **อะไร:** ตัวทำนายที่สร้างโดยคนหลักคนเดียว จากคะแนนช่างภาพ/ผู้สนใจ AI ตะวันตก ถูกใช้คัดข้อมูลฝึกโมเดลภาพรุ่นแรก — ให้ค่าต่ำกับ abstract art, วัตถุ 3 มิติ และงานจากหลายภูมิภาค `[Taylor2026LAP]`
- **ทำไม:** "aesthetic score" ถูกมองเป็นค่าสากล ทั้งที่เป็นค่ากลางของกลุ่มผู้ให้คะแนน; ผสม absolute กับ relative quality
- **บทเรียน:** ทุกคะแนนความงามต้องถามว่า "ของใคร"; อย่าใช้ score เดียวเลือกงาน; ภาพ "สวยแบบ AI" อาจไม่ใช่สิ่งที่ผู้ชมไทยตอบรับ

### 8.3 ทีมเชื่อสัญชาตญาณการเรียนรู้ผิด (documented)
- **อะไร:** ~80% ของผู้เข้าร่วมคิดว่าการดูงานจิตรกรทีละคนเป็นก้อนดีเท่าหรือดีกว่าการสลับ แม้ผลสอบตรงข้าม `[KornellBjork2008]`
- **บทเรียน:** reference board แบบ "หนึ่งสไตล์ต่อบอร์ด" รู้สึกชัดแต่สอนตาได้แย่กว่า; การฝึกรสนิยมต้องวัดผล ไม่ใช่วัดความรู้สึก

### 8.4 Typical failure (clearly labelled — ไม่ใช่กรณีจริงที่บันทึก): "ทีมชอบ ผู้ชมไม่เข้าใจ"
- **อะไร:** คลิป/โพสต์ที่ทีมชื่นชมเพราะแปลกใหม่ ตีความหลายชั้น — ในฟีด ผู้ชมเลื่อนผ่าน
- **ทำไม:** ผู้เชี่ยวชาญให้น้ำหนัก originality สูง ทนความยาก/ด้านลบมากกว่า `[HekkertVanWieringen1996]` `[LederGerger2014]`; ฟีดให้เวลาไม่กี่วินาที (พิพิธภัณฑ์เองยังมัธยฐาน 11–17 วิ) `[LederNadal2014]`; VIMAP: ความไม่ลงล็อกที่ไม่มีทางคลี่คลาย → ปฏิเสธ `[Pelowski2017]`
- **บทเรียน:** ทดสอบกับคนนอกทีม; ให้ "ทางเข้า" ที่ fluent ก่อน แล้วค่อยใส่ชั้นลึก

### 8.5 Typical failure (labelled): "wabi-sabi preset"
- **อะไร:** ใช้คำ wabi-sabi/yugen เป็นแค่ฟิลเตอร์สีหม่น + grain
- **ทำไม:** แนวคิดมีความหมายเฉพาะ (wabi = ความงามเรียบเคร่ง, sabi = ร่องรอยกาลเวลา/ความสงัด, yugen = ความลึกผ่านการชี้นำ) และเคยถูกใช้ทางการเมือง/ชาตินิยม `[SEP_JapaneseAesthetics]`
- **บทเรียน:** ยืมคำวัฒนธรรมอื่นต้องยืมความหมาย ไม่ใช่ผิว — ไม่เช่นนั้นคือ kitsch ข้ามวัฒนธรรม **(opinion)**

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

### 9.1 ไทย vs ตะวันตก (สิ่งที่มีหลักฐาน vs สิ่งที่ต้องทดสอบ)
| ประเด็น | หลักฐานที่มี | สถานะสำหรับไทย |
|---|---|---|
| ความเรียบร้อย, กาลเทศะ | Thai habitus: มารยาทผูกกับความเคารพ วินัย ความเรียบร้อย (khwam riap roi); Van Esterik: kala thesa = การตระหนักบริบทสังคมสูงที่กำหนดการแต่งกาย พูด ทำ `[Jory_ThaiManners]` | ประวัติศาสตร์/มานุษยวิทยา ไม่ใช่การวัดความชอบภาพ — ใช้เป็นสมมติฐาน: งานสาธารณะที่ "ไม่เรียบร้อย/ผิดกาลเทศะ" เสี่ยงกว่าในตะวันตก **(our test)** |
| Context-inclusive | เอเชียตะวันออกชอบภาพมีบริบทมากกว่า `[Masuda2008]` | ไทยไม่ได้อยู่ในตัวอย่าง → A/B |
| ความหมายของสี | สีไทยโบราณผูกกับสัญลักษณ์พุทธ (เช่น ชาด/แดง กับสวรรค์) `[Pittayamatee2020]` | งานศิลปะเชิงปฏิบัติ — ใช้เป็นแหล่ง palette ที่มีความหมาย ไม่ใช่กฎความชอบ |
| ระดับสี/ความซับซ้อน | ต่างกันตามประเทศ/อายุ/การศึกษา `[ReineckeGajos2014]` | ไม่มีข้อมูลไทยแยก |
| สากล | symmetry, 1:1 ชอบทุกประเทศที่ศึกษา `[Lee2025CrossCultural]` | น่าจะใช้ได้ (ไม่มีไทยในตัวอย่าง) |
- **ข้อควรระวัง essentialism:** แม้ SEP เองเตือนว่าการกล่าวว่า "เอเชียตะวันออกชอบการชี้นำ" เป็นข้อเหมารวมที่ไม่ได้ทดสอบ และแนวคิดหลายตัวถูกสร้างในยุคสมัยใหม่ `[SEP_JapaneseAesthetics]` — ใช้กับ "ไทย" เช่นกัน
- **ศิลปะไทยสมัยใหม่:** การค้นพบงานของ Apinan Poshyananda (*Modern Art in Thailand*, 1992) และการถกเถียงว่าศิลปะไทยสมัยใหม่ไม่ได้มาจากตะวันตกล้วน — ข้อมูลระดับผลค้น (search_summary) ไม่ได้ใส่ใน JSON เพราะไม่ได้อ่านแหล่ง

### 9.2 แพลตฟอร์ม
- **ฟีด (IG/FB/TikTok):** เวลาตัดสินสั้นมาก → ชั้น universal + fluent entry สำคัญกว่า; ความลึก (cognitive mastering) อยู่ในสไลด์/วินาทีถัดไป (ต่อยอด M06 §2.6)
- **Carousel:** ผู้ที่ปัดต่อคือผู้ที่ "ลงทุน" แล้ว → ทนความใหม่/ซับซ้อนได้มากขึ้นในสไลด์หลัง **(opinion)**
- **Reels พร้อมเพลง:** optimal match ระหว่างจังหวะภาพกับเพลง `[Hekkert2006]`

### 9.3 ผู้ชม
- **Expert (ลูกค้าธุรกิจ, นักออกแบบ):** ให้ค่าความแปลกใหม่, ทนความยาก `[HekkertVanWieringen1996]` `[LederGerger2014]`
- **General:** ชอบ representational, fluent; ความชอบส่วนตัวกระจายมากในโดเมน artefact `[Vessel2018]`
- **อารมณ์/สถานการณ์:** ช่วงเครียด/ไม่มั่นคง คนอาจหันหาความคุ้นเคย (kitsch-friendly) `[OrtliebCarbon2019]` (low confidence) — เช่น คอนเทนต์ปลอบใจช่วงวิกฤต

### 9.4 Genre
- **Comfort / healing content** (คลิปพักสายตา, เรื่องอบอุ่น): fluency และความคุ้นเคยเป็นจุดประสงค์ — "kitsch-adjacent" ยอมรับได้ถ้าซื่อตรง **(opinion)**
- **Brand image / premium:** restraint, honesty (Rams), รหัสเงียบ (M06 §2.4)
- **Promo/deal:** รหัสดีลชัด ๆ ใช้ได้ — คนละ genre กับ brand image (M06)
- **Art/experimental:** originality นำ — เหมาะกับผู้ชม expert

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| Domain | เชื่อมอย่างไร |
|---|---|
| 01 creative thinking & cognitive science | homogenization ของ AI `[Holzner2025]` → เทคนิค divergence ก่อนใช้ AI; MAYA = ขอบเขตของ novelty |
| 02 psychology & EI | ผู้เชี่ยวชาญมีอารมณ์ตอบสนองหน่วง `[LederGerger2014]`; kitsch กับ safety motive `[OrtliebCarbon2019]` |
| 04 visual language & grammar | ชั้น universal (contrast, symmetry, hierarchy) = ไวยากรณ์; ดู ART_FUNDAMENTALS |
| 05 semiotics, symbolism & metaphor | Fechner associative factor `[OrtliebFechner2020]`; สีไทยกับสัญลักษณ์ `[Pittayamatee2020]`; ลุค = รหัสที่เรียนรู้ (M06 §2.2) |
| 06 character psychology | ใบหน้าที่ "เฉลี่ยเกิน" = AI look; ตัวละครต้องมีความเฉพาะ (ต่อยอด §6.2) |
| 07 worldbuilding & continuity | house style คงที่ = ภูมิคุ้มกัน convergence `[ZhouLee2024]`; exposure ของซีรีส์ `[Montoya2017]` |
| 08 philosophy, literature & poetry | Hume, Kant, Dewey, Greenberg — กรอบคุณค่า; kire (ตัด-ต่อเนื่อง) ใช้กับจังหวะสไลด์/บทกวี `[SEP_JapaneseAesthetics]` |
| 09 cultural studies | Bourdieu/omnivore; Thai habitus `[Jory_ThaiManners]`; Masuda; Reinecke |
| 10 psychoacoustics | optimal match ภาพ-เสียง `[Hekkert2006]`; ทำนองดนตรีต่างกันข้ามวัฒนธรรมมากที่สุด `[Lee2025CrossCultural]` → เลือกเพลงให้ตรงตลาด |
| 11 consumer psychology & marketing | exposure × quality ในการซ้ำแบรนด์; omnivore → ผสมรหัสสูง/ต่ำได้ |
| 12 independent creative criticism | Hume's true judge + เกณฑ์ที่พูดได้ (Rams) + ตัวกรองอคติ (CRITIQUE_PROTOCOL) |
| 13 QA & evaluation | ใช้ aesthetic score เป็นตัวกรองเทคนิคเท่านั้น `[Taylor2026LAP]` `[Talebi2018]`; rubric §14 |
| 14 knowledge management & learning | reference library แบบ interleaved `[KornellBjork2008]`; บันทึกผล A/B |
| 15 workflow automation | pipeline สร้างหลายทิศ + เลือกโดยคน; ห้าม optimize ด้วย score เดียว `[PreferenceModeCollapse2025]` |

**Module links:** M05 (fluency, MAYA, complexity, symmetry, awe) · M06 (ลุค, critique) · ai-visual-artist (IMAGE_CRITIQUE_ENGINE, ART_FUNDAMENTALS, THAI_TYPOGRAPHY)

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 ตารางตัดสินใจหลัก
| ถ้า… | แล้ว… | เพราะ |
|---|---|---|
| ข้อวิจารณ์เป็นเรื่องอ่านออก/contrast/สมมาตร/ข้อผิดพลาดโมเดล | แก้เลย (ชั้น T) | universal `[Lee2025CrossCultural]` |
| ข้อวิจารณ์เป็นรหัสวัฒนธรรม (สี มารยาท ลุคแพง) | ถามว่า "ผู้ชมเป้าหมายอ่านรหัสนี้อย่างไร" แล้วตัดสินเทียบกลุ่มนั้น | `[ReineckeGajos2014]` `[Jory_ThaiManners]` |
| ข้อวิจารณ์เป็นความชอบส่วนตัว (สไตล์, ใบหน้า, สถาปัตยกรรม) | เสนอเป็นตัวเลือก/A-B ไม่ใช่คำสั่ง | `[Vessel2018]` `[Germine2015]` |
| ผู้ชมเป็นคนทั่วไปในฟีด | fluent entry + ความแปลกหนึ่งจุดที่คลี่คลายได้ (MAYA) | `[Hekkert2006]` `[Pelowski2017]` |
| ผู้ชมเป็นผู้เชี่ยวชาญ/ลูกค้าครีเอทีฟ | ดัน originality ได้มากขึ้น | `[HekkertVanWieringen1996]` |
| ภาพ AI ดู "สวยแต่จำไม่ได้" | เติม house style + ความเฉพาะ 1–2 อย่าง; ตัดแสง/ฉากสำเร็จรูป | `[ZhouLee2024]` `[Taylor2026LAP]` |
| เนื้อหาเป็นธีมอารมณ์สำเร็จรูป | ใช้เกณฑ์ Kulka; ถ้าไม่เพิ่ม association → เติมรายละเอียดเฉพาะเรื่อง | `[Kulka1996]` |
| เนื้อหาเป็น comfort/healing | ยอมให้ fluent/คุ้นเคยได้ แต่ห้ามอ้างลึกเกินจริง | `[OrtliebCarbon2019]` (low) |
| ฟอร์แมตซีรีส์ใช้มานาน engagement ลด | หมุนองค์ประกอบรอง รักษาองค์ประกอบหลัก | `[Montoya2017]` `[Meskin2013]` |
| จะใช้ aesthetic score/AI judge เลือกภาพ | ใช้คัดทิ้งเฉพาะภาพเสียเทคนิค; เลือกจริงด้วยเกณฑ์เจตนา + คนกลุ่มเป้าหมาย | `[Taylor2026LAP]` `[Talebi2018]` |
| จะยืมแนวคิดวัฒนธรรมอื่น (wabi-sabi, iki) | ใช้ความหมายตามแหล่ง (SEP) ไม่ใช่ฟิลเตอร์ | `[SEP_JapaneseAesthetics]` |
| อยากอ้าง golden ratio/สูตรตัวเลข | ไม่อ้างเป็นวิทยาศาสตร์ | `[Lee2025CrossCultural]` |
| ทีมเห็นไม่ตรงกันเรื่องรสนิยม | แต่ละคนเขียน verdict แยกก่อน → เทียบ → ถ้ายังต่างและเป็นชั้น P → ทดสอบ | `[SEP_HumeAesthetics]` |

### 11.2 คำถาม 5 ข้อก่อนตัดสินว่า "งานนี้มีรสนิยมไหม"
1. ชั้นไหน (T/C/P)? 2. ผู้ชมใคร (expert/general, ไทย/สากล, อายุ)? 3. genre/เจตนาอะไร (comfort/brand/promo/art)?
4. เพิ่มอะไรใหม่ (association/ความเฉพาะ) หรือแค่ทำซ้ำสูตร? 5. เกณฑ์ที่ใช้ "พูดออกมาได้" ไหม (ถ้าพูดไม่ได้ = ความชอบส่วนตัว)

---

## 12. แบบฝึกหัด (Exercises)

**E1 (พื้นฐาน) — แยกชั้น:** ให้ข้อวิจารณ์ 10 ข้อของภาพหนึ่ง จัดเป็น universal / cultural / personal
- *คำตอบที่ดี:* ใช้หลักฐานจาก §3.3 (เช่น "ตัวอักษรอ่านไม่ออก" = universal; "สีแดงดูถูก" = cultural ต้องระบุกลุ่ม; "ไม่ชอบหน้าตัวละคร" = personal) และบอกว่าจะจัดการแต่ละชั้นอย่างไร

**E2 (พื้นฐาน) — Kitsch audit:** เลือกโพสต์ให้กำลังใจ 5 โพสต์ (ของเราหรือคนอื่น) ใช้ 3 เงื่อนไข Kulka ให้คะแนน
- *คำตอบที่ดี:* ชี้ได้ว่า "ธีม" กับ "การทำ" ต่างกัน; เสนอรายละเอียดเฉพาะ 1 อย่างที่เปลี่ยนเงื่อนไข 3 ได้ ไม่ใช่สั่งตัดอารมณ์ทิ้ง

**E3 (กลาง) — Interleaved reference board:** สร้างบอร์ด 12 ภาพ จาก 4 แนวทาง แบบสลับ แล้วให้เพื่อนร่วมทีมทายแนวทางของภาพใหม่ 6 ภาพ
- *คำตอบที่ดี:* ออกแบบบอร์ดสลับจริง, วัดผลด้วยภาพใหม่ (induction) ไม่ใช่ภาพเดิม, บันทึกว่าความรู้สึก "เข้าใจ" ตรงกับผลหรือไม่ `[KornellBjork2008]`

**E4 (กลาง) — AI convergence test:** สร้างภาพจาก prompt เดียวกัน 8 ครั้ง วางคู่กับภาพจาก prompt ที่มี house style + ความเฉพาะ
- *คำตอบที่ดี:* บรรยายค่ากลางที่โมเดลชอบ (แสง ใบหน้า องค์ประกอบ) ด้วยภาษาที่ตรวจได้, เชื่อมกับ `[Taylor2026LAP]` `[ZhouLee2024]`, และวัดความต่างระหว่าง 8 ภาพ (สายตาหรือ embedding)

**E5 (กลาง) — Expert gap:** ให้ทีม 3 คน และคนนอก 5 คน จัดอันดับ 6 เวอร์ชันของ cover สไลด์
- *คำตอบที่ดี:* เปรียบเทียบอันดับ, ตั้งสมมติฐานว่าทีมให้ค่า originality มากกว่า `[HekkertVanWieringen1996]`, ระวังขนาดตัวอย่างเล็ก ไม่สรุปเกินข้อมูล

**E6 (ยาก) — Cross-cultural brief:** เขียน brief สำหรับโพสต์แว่นที่จะใช้ทั้งตลาดไทยและญี่ปุ่น
- *คำตอบที่ดี:* แยกสิ่งที่สากล (symmetry, legibility) กับสิ่งที่ต้องปรับ (บริบทในภาพ, สี, เส้นตรงที่คนญี่ปุ่นชอบใน `[Lee2025CrossCultural]`), ระบุว่าอะไร "ไม่มีข้อมูลไทย" และวางแผน A/B

**E7 (ยาก) — Score critique:** เอา aesthetic predictor ใดก็ได้ให้คะแนนชุดภาพของสตูดิโอ 20 ภาพ แล้วเทียบกับ engagement จริง
- *คำตอบที่ดี:* ไม่เชื่อคะแนนโดยตรง; อธิบายความไม่ตรงด้วยที่มาของข้อมูลฝึก `[Taylor2026LAP]` `[Murray2012]`; เสนอใช้คะแนนเป็นตัวกรองเทคนิคเท่านั้น

**E8 (ยาก) — Dewey edit:** ตัดต่อคลิป story 45 วิ สองเวอร์ชัน: ตัดตามบีตทุก 1 วิ vs ตัดแบบ "แต่ละช็อตต่อยอดช็อตก่อน"
- *คำตอบที่ดี:* อธิบายความต่างของ "an experience" (การสะสม แรงต้าน การคลี่คลาย) `[SEP_DeweyAesthetics]`, ตรวจ optimal match เสียง-ภาพ `[Hekkert2006]`, ทดสอบกับคนนอก

---

## 13. Checklist (ก่อนส่งงาน — ตอบ ใช่/ไม่ใช่)

1. ☐ แยกข้อวิจารณ์ทุกข้อเป็นชั้น universal / cultural / personal แล้ว
2. ☐ ปัญหาชั้น universal (อ่านออก, contrast, ข้อผิดพลาดเทคนิค) แก้ครบ
3. ☐ ระบุผู้ชมเป้าหมาย (expert/general, ไทย/ต่างชาติ, ช่วงอายุ) ชัด
4. ☐ รหัสวัฒนธรรม (สี มารยาท กาลเทศะ ความเรียบร้อย) เหมาะกับผู้ชมนั้น
5. ☐ มีความเฉพาะอย่างน้อย 1 อย่างที่ไม่ใช่ค่ากลางของโมเดล AI
6. ☐ ผ่าน kitsch test: ถ้าธีมเป็น stock emotion มีสิ่งที่เพิ่ม association ใหม่
7. ☐ ความแปลกใหม่ยังจำหมวดได้ (MAYA) และมีทางคลี่คลาย
8. ☐ ภาพ เสียง (TTS/เพลง) และข้อความพูดอารมณ์เดียวกัน (optimal match)
9. ☐ ไม่มีองค์ประกอบที่ไม่ทำหน้าที่ (as little design as possible / honest)
10. ☐ สินค้า/คนจริงไม่ถูกทำให้ดูดีเกินจริง (honest)
11. ☐ house style ของซีรีส์คงที่ (palette, เส้น, ฟอนต์)
12. ☐ ถ้าเป็นฟอร์แมตซ้ำ: มีองค์ประกอบรองที่หมุนเวียน
13. ☐ ไม่ได้ใช้คะแนน aesthetic/AI judge เป็นตัวตัดสินผู้ชนะ
14. ☐ คำศัพท์วัฒนธรรมอื่นที่ใช้ (wabi-sabi ฯลฯ) ใช้ตามความหมายจริง
15. ☐ ไม่อ้างสูตรตัวเลข (golden ratio, 60-30-10) เป็นวิทยาศาสตร์
16. ☐ ความชอบของทีม (expert) ถูกตรวจกับคนนอกอย่างน้อย 1–3 คน หรือวางแผน A/B
17. ☐ ถ้าใช้ AI: มี AI label ตามกฎแพลตฟอร์ม + เจตนามนุษย์ชัด

---

## 14. Evaluation Rubric

**วิธีให้คะแนน:** 5 เกณฑ์ × 1–4 คะแนน (รวม 20). ให้คะแนนแยกก่อนคุย (กัน anchoring), ผู้ประเมิน ≥ 2 คนถ้าเป็นงานสำคัญ; ใช้ค่ากลาง.
ผ่าน = ≥ 14 และไม่มีเกณฑ์ใดได้ 1 และไม่มี critical failure.

| เกณฑ์ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **A. ความถูกต้องชั้น universal** (legibility, contrast, hierarchy, ไม่มีข้อผิดพลาดเทคนิค) | อ่าน/มองไม่ออกในจอมือถือ หรือมีข้อผิดพลาดชัด | อ่านได้แต่ต้องพยายาม; hierarchy สับสน 1 จุด | ชัดเจน มี hierarchy; ข้อบกพร่องเล็กน้อย | ชัดใน < 1 วิ, hierarchy ชัด, ไม่มีข้อบกพร่องที่พบ |
| **B. ความเหมาะกับผู้ชมและวัฒนธรรม** | ใช้รหัสที่ผู้ชมเป้าหมายอ่านผิด/ไม่เหมาะกาลเทศะ | รหัสกลาง ๆ ไม่ได้คิดถึงผู้ชม | ตรงกลุ่มเป้าหมายส่วนใหญ่; มีจุดที่ยังเป็นสมมติฐาน | ตรงกลุ่มชัด และมีหลักฐาน (A/B, ข้อมูลเดิม) รองรับ |
| **C. ความเฉพาะ vs ค่ากลาง (anti-generic)** | ภาพ/ธีมสำเร็จรูป แทบแยกจากผลลัพธ์ default ไม่ออก | มีความเฉพาะเล็กน้อยแต่ "AI look" ยังเด่น | house style ชัด + ความเฉพาะ 1 อย่าง | จำได้ว่าเป็นของแบรนด์/ซีรีส์นี้แม้ไม่มีโลโก้; ไม่มีจุดสำเร็จรูป |
| **D. ความลึก/association (anti-kitsch)** | stock emotion ล้วน ไม่เพิ่มอะไร | มีรายละเอียดแต่ไม่สร้างความหมายใหม่ | เพิ่ม association ใหม่ 1 ชั้น | มีชั้นที่ค้นพบได้เมื่อดูซ้ำ และยังเข้าถึงง่ายตอนแรก |
| **E. ความกลมกลืนและ restraint** (optimal match, ไม่มีส่วนเกิน, honest) | ภาพ/เสียง/ข้อความขัดกัน หรือหลอกเกินจริง | กลมกลืนบางส่วน; มีส่วนเกินหลายจุด | กลมกลืน มีส่วนเกินเล็กน้อย | ทุกองค์ประกอบทำหน้าที่ และพูดเรื่องเดียวกัน |

**Critical failures (ไม่ผ่านทันทีไม่ว่าคะแนนรวม):**
- ข้อความ/ข้อมูลอ่านไม่ออกหรือผิด (ชั้น universal พัง)
- สินค้าหรือคนจริงถูกบิดให้ดูต่างจากจริง (ผิด honest) หรือใช้ AI แทนสินค้า/คนจริงในงานขาย
- ละเมิดกาลเทศะ/ความเคารพที่ผู้ชมไทยน่าจะรู้สึกว่าไม่เหมาะ (ศาสนา สถาบัน ร่างกาย) — ต้องตรวจโดยคนไทย
- ใช้สัญลักษณ์/คำของวัฒนธรรมอื่นผิดความหมายอย่างเห็นได้ชัด
- ตัดสินผู้ชนะด้วย aesthetic score เดียวโดยไม่มีการดูโดยคน

---

## 15. แหล่งอ้างอิง (References)

- **[SEP_HumeAesthetics]** Hume's Aesthetics. *Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/hume-aesthetics/ — full_text (อ่านรอบ 2026-11-25, reuse key)
- **[SEP_KantAesthetics]** Kant's Aesthetics and Teleology. *Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/kant-aesthetics/ — full_text (อ่านรอบ 2026-11-25, reuse key)
- **[OrtliebFechner2020]** Ortlieb, S. A., Kügel, W. A., & Carbon, C.-C. (2020). Fechner (1866): The Aesthetic Association Principle — A Commented Translation. *i-Perception*, 11(3). doi:10.1177/2041669520920309 — abstract
- **[SEP_DeweyAesthetics]** Dewey's Aesthetics. *Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/dewey-aesthetics/ — full_text (อ่าน ~100k จาก 132k ตัวอักษร)
- **[Greenberg1939]** Greenberg, C. (1939). Avant-Garde and Kitsch. *Partisan Review*, 6(5). https://www.bu.edu/partisanreview/books/PR1939V6N5/HTML/files/assets/basic-html/page38.html — bibliographic (เนื้อหาจากแหล่งรอง)
- **[Kulka1996]** Kulka, T. (1996). *Kitsch and Art*. Penn State University Press. ISBN 0-271-01556-X. https://www.psupress.org/books/titles/0-271-01556-X.html — search_summary
- **[OrtliebCarbon2019]** Ortlieb, S. A., & Carbon, C.-C. (2019). A Functional Model of Kitsch and Art: Linking Aesthetic Appreciation to the Dynamics of Social Motivation. *Frontiers in Psychology*, 9:2437. doi:10.3389/fpsyg.2018.02437 — full_text (~60%)
- **[Bourdieu1984]** Bourdieu, P. (1984). *Distinction: A Social Critique of the Judgement of Taste* (R. Nice, Trans.). Harvard University Press (orig. 1979). — bibliographic
- **[Wikipedia_Distinction]** Distinction (book). Wikipedia. https://en.wikipedia.org/wiki/Distinction_(book) — full_text (E tier)
- **[PetersonKern1996]** Peterson, R. A., & Kern, R. M. (1996). Changing Highbrow Taste: From Snob to Omnivore. *American Sociological Review*, 61, 900–907. doi:10.2307/2096460 — search_summary
- **[LederBelke2004]** Leder, H., Belke, B., Oeberst, A., & Augustin, D. (2004). A model of aesthetic appreciation and aesthetic judgments. *British Journal of Psychology*, 95(4), 489–508. doi:10.1348/0007126042369811 — search_summary
- **[LederNadal2014]** Leder, H., & Nadal, M. (2014). Ten years of a model of aesthetic appreciation and aesthetic judgments: The aesthetic episode — Developments and challenges in empirical aesthetics. *British Journal of Psychology*, 105, 443–464. doi:10.1111/bjop.12084. https://cognitivescience.univie.ac.at/fileadmin/user_upload/p_cogsci/Literature/Leder_Nadal_2014_Ten_years_of_a_model.pdf — full_text
- **[Pelowski2017]** Pelowski, M., Markey, P. S., Forster, M., Gerger, G., & Leder, H. (2017). Move me, astonish me… delight my eyes and brain: The Vienna Integrated Model of top-down and bottom-up processes in Art Perception (VIMAP)… *Physics of Life Reviews*. doi:10.1016/j.plrev.2017.02.003 — abstract
- **[Bornstein1989]** Bornstein, R. F. (1989). Exposure and affect: Overview and meta-analysis of research, 1968–1987. *Psychological Bulletin*, 106, 265–289. https://proquest.com/docview/614332207 — search_summary
- **[Montoya2017]** Montoya, R. M., Horton, R. S., Vevea, J. L., Citkowicz, M., & Lauber, E. A. (2017). A re-examination of the mere exposure effect. *Psychological Bulletin*. doi:10.1037/bul0000085 — abstract
- **[Cutting2003]** Cutting, J. E. (2003). Gustave Caillebotte, French Impressionism, and mere exposure. *Psychonomic Bulletin & Review*, 10(2), 319–343. doi:10.3758/BF03196493 — abstract (+ อ่านบางส่วน)
- **[Meskin2013]** Meskin, A., Phelan, M., Moore, M., & Kieran, M. (2013). Mere Exposure to Bad Art. *British Journal of Aesthetics*. https://blog.oup.com/2013/07/what-makes-art-bad-exposure-effect/ — search_summary
- **[Vessel2018]** Vessel, E. A., Maurer, N., Denker, A. H., & Starr, G. G. (2018). Stronger shared taste for natural aesthetic domains than for artifacts of human culture. *Cognition*, 179, 121–131. doi:10.1016/j.cognition.2018.06.009 — abstract
- **[Germine2015]** Germine, L., Russell, R., Bronstad, P. M., … Wilmer, J. B. (2015). Individual Aesthetic Preferences for Faces Are Shaped Mostly by Environments, Not Genes. *Current Biology*, 25. doi:10.1016/j.cub.2015.08.048 — full_text
- **[ReineckeGajos2014]** Reinecke, K., & Gajos, K. Z. (2014). Quantifying Visual Preferences Around the World. *CHI '14*, 11–20. doi:10.1145/2556288.2557052. https://iis.seas.harvard.edu/papers/reinecke14visual.pdf — full_text
- **[Lee2025CrossCultural]** Lee, H., Van Geert, E., Çelen, E., Marjieh, R., van Rijn, P., Park, M., & Jacoby, N. (2025). Visual and Auditory Aesthetic Preferences Across Cultures. arXiv:2502.14439. https://arxiv.org/abs/2502.14439 — full_text
- **[Masuda2008]** Masuda, T., Gonzalez, R., Kwan, L., & Nisbett, R. E. (2008). Culture and aesthetic preference: Comparing the attention to context of East Asians and Americans. *Personality and Social Psychology Bulletin*, 34(9), 1260–1275. doi:10.1177/0146167208320555 — abstract
- **[Che2018]** Che, J., Sun, X., Gallardo, V., & Nadal, M. (2018). Cross-cultural empirical aesthetics. *Progress in Brain Research*. doi:10.1016/bs.pbr.2018.03.002 — search_summary
- **[HekkertVanWieringen1996]** Hekkert, P., & van Wieringen, P. C. W. (1996). Beauty in the Eye of Expert and Nonexpert Beholders: A Study in the Appraisal of Art. *American Journal of Psychology*, 109(3), 389–407. — search_summary (DOI ไม่ได้ยืนยัน)
- **[LederGerger2014]** Leder, H., Gerger, G., Brieber, D., & Schwarz, N. (2014). What makes an art expert? Emotion and evaluation in art appreciation. *Cognition and Emotion*. doi:10.1080/02699931.2013.870132 — abstract
- **[Goldstone1998]** Goldstone, R. L. (1998). Perceptual learning. *Annual Review of Psychology*, 49, 585–612. doi:10.1146/annurev.psych.49.1.585 — search_summary
- **[SEP_PerceptualLearning]** Perceptual Learning. *Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/perceptual-learning/ — full_text
- **[RansomGoldstone2024]** Ransom, M., & Goldstone, R. L. (2024). Bias in perceptual learning. *WIREs Cognitive Science*. doi:10.1002/wcs.1683 — abstract
- **[KornellBjork2008]** Kornell, N., & Bjork, R. A. (2008). Learning Concepts and Categories: Is Spacing the "Enemy of Induction"? *Psychological Science*, 19(6). https://www.gwern.net/docs/spaced-repetition/2008-kornell.pdf — full_text
- **[Glass_TasteGap]** Popova, M. (2014, Jan 29). The Taste Gap: Ira Glass on the Secret of Creative Success. *The Marginalian*. https://www.themarginalian.org/2014/01/29/ira-glass-success-daniel-sax/ — full_text (D tier, craft)
- **[Hekkert2006]** Hekkert, P. (2006). Design aesthetics: principles of pleasure in design. *Psychology Science*, 48(2), 157–172. https://pure.tudelft.nl/ws/portalfiles/portal/54686438/Hekkert_P._Design_aesthetics_principles_of_pleasure_in_design.pdf — full_text
- **[Hekkert2003]** Hekkert, P., Snelders, D., & van Wieringen, P. C. W. (2003). 'Most advanced, yet acceptable': Typicality and novelty as joint predictors of aesthetic preference in industrial design. *British Journal of Psychology*. https://research.vu.nl/en/publications/most-advanced-yet-acceptable-typicality-and-novelty-as-joint-pred/ — search_summary (reuse key)
- **[Vitsoe_Rams]** Vitsœ. Good design (Dieter Rams's ten principles). https://vitsoe.com/us/about/good-design — full_text (C tier; CC BY-NC-ND 4.0)
- **[SEP_JapaneseAesthetics]** Parkes, G., & Loughnane, A. Japanese Aesthetics. *Stanford Encyclopedia of Philosophy* (rev. 2023-12-06). https://plato.stanford.edu/entries/japanese-aesthetics/ — full_text
- **[Jory_ThaiManners]** Jory, P. *A History of Manners and Civility in Thailand*. Cambridge University Press. ISBN 978-1-108-49124-2. Excerpt: https://assets.cambridge.org/97811084/91242/excerpt/9781108491242_excerpt.pdf — publisher_page (อ่านเฉพาะบทนำ; ปีพิมพ์ไม่ได้ยืนยัน)
- **[Pittayamatee2020]** Pittayamatee, P. (2020). Aesthetic Experience from Thai Colors. *Silpa Bhirasri (Journal of Fine Arts)*, 5(1). https://so02.tci-thaijo.org/index.php/jfa/article/view/240983 — abstract
- **[Chamberlain2018]** Chamberlain, R., Mullin, C., Scheerlinck, B., & Wagemans, J. (2018). Putting the Art in Artificial: Aesthetic Responses to Computer-generated Art. *Psychology of Aesthetics, Creativity, and the Arts*. https://research.gold.ac.uk/id/eprint/20443 — search_summary
- **[ZhouLee2024]** Zhou, E., & Lee, D. (2024). Generative artificial intelligence, human creativity, and art. *PNAS Nexus*, 3(3). doi:10.1093/pnasnexus/pgae052 — full_text
- **[Holzner2025]** Holzner, N., Maier, S., & Feuerriegel, S. (2025). Generative AI and Creativity: A Systematic Literature Review and Meta-Analysis. arXiv:2505.17241 — abstract
- **[Taylor2026LAP]** Taylor, J., Agnew, W., Sap, M., Fox, S. E., & Zhu, H. (2026). The Algorithmic Gaze of Image Quality Assessment: An Audit and Trace Ethnography of the LAION-Aesthetics Predictor. FAccT 2026 / arXiv:2601.09896. doi:10.1145/3805689.3806462 — full_text
- **[Murray2012]** Murray, N., Marchesotti, L., & Perronnin, F. (2012). AVA: A large-scale database for aesthetic visual analysis. *CVPR 2012*, 2408–2415. doi:10.1109/CVPR.2012.6247954 — search_summary (reuse key)
- **[Talebi2018]** Talebi, H., & Milanfar, P. (2018). NIMA: Neural Image Assessment. *IEEE Transactions on Image Processing*, 27(8), 3998–4011. arXiv:1709.05424 — search_summary (reuse key)
- **[PreferenceModeCollapse2025]** Taming Preference Mode Collapse via Directional Decoupling Alignment. arXiv:2512.24146 (2025). — search_summary (ไม่ได้บันทึกผู้เขียน)

**ไม่สามารถเข้าถึง/ยืนยันในรอบนี้:** ตัวหนังสือ Bourdieu, Kulka, Greenberg ต้นฉบับ; Bornstein 1989 และ Goldstone 1998 ฉบับเต็ม (OpenAlex ถูก rate-limit, PMC บล็อก bot);
ผลละเอียดของ Meskin 2013 (ขนาดตัวอย่างขัดกัน 57 vs >100); Chamberlain 2018 ฉบับเต็ม; Van Esterik *Materializing Thailand* (อ้างผ่าน Jory เท่านั้น);
งาน empirical ที่วัดรสนิยมภาพของคนไทยโดยตรง — **ไม่พบ**; คำว่า "sanuk" ในฐานะแนวคิดสุนทรียะ — ไม่พบแหล่งวิชาการ
