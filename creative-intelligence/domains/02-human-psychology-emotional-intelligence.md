# Domain 02 — Human Psychology & Emotional Intelligence (จิตวิทยามนุษย์และความฉลาดทางอารมณ์)

**Modules:** M01 (Human Psychology), M02 (Emotion Science) · **Date researched:** 2026-11-26 · **Sources:** `sources/02-human-psychology-emotional-intelligence.json` (50 keys)

**Status: SOURCE VERIFIED** — อ่าน full_text 11 + abstract 32 = 43/50 (86%) ; ที่เหลือ search_summary 3, bibliographic 2, publisher_page 2

| Tier | จำนวน | | access_status | จำนวน |
|---|---|---|---|---|
| S (meta-analysis / official guideline) | 14 | | full_text | 11 |
| A (peer-reviewed / academic text) | 28 | | abstract | 32 |
| B (expert publication / SEP / editorial) | 4 | | publisher_page | 2 |
| C (case / news) | 3 | | search_summary | 3 |
| D (popular book) | 1 | | bibliographic | 2 |

**Builds on (อ่านก่อน ไม่ทำซ้ำ):**
- `creative-intelligence/knowledge/psychology/README.md` (M01): attention, memory, SDT สั้น ๆ, empathy สั้น ๆ, biases, fear/trust/hope/nostalgia — และตาราง contested ที่บอกว่า "EQ สำคัญกว่า IQ" = low confidence
- `creative-intelligence/knowledge/emotions/README.md` (M02): basic vs constructionist, appraisal (Lazarus/Scherer/Moors), Gross process model, reappraisal vs suppression, การอ่านสีหน้า, Thai emotion terms (เกรงใจ, ใจเย็น, สนุก)
- `creative-intelligence/knowledge/emotional-architecture/README.md` (M32): emotional arcs, peak-end, pacing
- `creative-intelligence/knowledge/culture/README.md` (M30): Hofstede + คำวิจารณ์, ค่านิยมไทย, high/low context

**Scope — ครอบคลุม:** ประวัติ EI (Thorndike → Gardner → Salovey & Mayer → Goleman), ability vs trait vs mixed models และหลักฐาน meta-analysis + คำวิจารณ์, emotion recognition ข้ามวัฒนธรรม, empathy (affective/cognitive, motivated empathy, Bloom + คำโต้แย้ง), emotion regulation เชิงประสิทธิผล (Webb meta-analysis), SDT สำหรับข้อความให้กำลังใจ, wellbeing messaging (ความเหนื่อย, การเปรียบเทียบ, ความเหงา, self-doubt), **safe messaging เรื่องฆ่าตัวตาย** (WHO 2023, Werther/Papageno), feedback (ให้/รับ), บริบทไทย (เกรงใจ, หน้า, ลำดับชั้นกับ feedback), จริยธรรมของ emotional manipulation ในการตลาด
**ไม่ครอบคลุม:** การวินิจฉัย/บำบัดทางคลินิก, EI ของเด็กเล็ก, neuroscience ของ empathy, รายการอารมณ์รายตัว (อยู่ใน M02 และ EMOTION_LIBRARY), Hofstede รายละเอียด (อยู่ใน M30)

> กติกาการอ่าน: `[Key]` = แหล่งใน JSON · **(craft)** = แนวปฏิบัติช่าง ไม่ใช่ผลวิจัย · **(opinion)** = ความเห็นผู้เขียน · **(our test)** = ต้องทดสอบกับงานจริงของสตูดิโอ
> ระดับ: **FACT** = ซ้ำได้ดี · **THEORY** = โมเดล อาจถกเถียง · **PRACTICE** = ธรรมเนียมช่าง · **OPINION**

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 เส้นเวลา

| ปี | เหตุการณ์ | ความหมายต่อแนวคิด | แหล่ง |
|---|---|---|---|
| 1909–1911 | Dewey และ Lull ใช้คำ "social intelligence" ก่อน | ชื่อเกิดก่อนการวัด | `[KihlstromCantor2011]` |
| 1920 | E. L. Thorndike แบ่ง intelligence เป็น abstract / mechanical / **social** — "the ability to understand and manage men and women … to act wisely in human relations" และยอมรับว่า "convenient tests of social intelligence are hard to devise" | ต้นแบบของแนวคิด "ฉลาดเรื่องคน" | `[KihlstromCantor2011]` |
| 1927–1937 | George Washington Social Intelligence Test ถูกวิจารณ์ว่า "swamped" ด้วย abstract intelligence (Thorndike & Stein 1937) | **บทเรียนแรก:** แบบวัด "ทักษะอ่อน" ล้มเพราะแยกไม่ออกจาก IQ | `[KihlstromCantor2011]` |
| 1934 / 1960 | Wechsler พูดถึง "non-intellective" aspects ; Cronbach (1960) สรุปว่า social intelligence ยัง "undefined and unmeasured" | ครึ่งศตวรรษที่ไม่สำเร็จ | `[GrewalSalovey2005]` |
| 1983 | Gardner, *Frames of Mind*: intrapersonal intelligence ("access to one's own feeling life … to label them … as a means of understanding and guiding one's behavior") + interpersonal | ให้ "สิทธิ์" ทางทฤษฎีกับความฉลาดหลายแบบ | `[GrewalSalovey2005]` `[KihlstromCantor2011]` |
| 1990 | Salovey & Mayer นิยาม EI เป็น **ชุดทักษะ**: appraisal/expression ของอารมณ์ตนและผู้อื่น, regulation, ใช้ความรู้สึกเพื่อวางแผนและทำให้สำเร็จ | จุดกำเนิดทางวิทยาศาสตร์ | `[SaloveyMayer1990]` |
| 1995 | Goleman, *Emotional Intelligence: Why It Can Matter More Than IQ* — ขายดี, ปก TIME "What's your EQ?" ; ขยายนิยามรวม zeal, persistence | การ popularise ที่ทำให้นิยามสาธารณะ ≠ นิยามวิชาการ | `[Goleman1995]` (bibliographic) `[GrewalSalovey2005]` |
| 1997–2006 | Bar-On EQ-i (self-report, 5 composites/15 subscales) ; Petrides & Furnham เสนอ **trait EI** = self-perception ในโครงสร้างบุคลิกภาพ | แตกเป็น 3 สาย: ability / trait / mixed | `[BarOn2006]` `[PetridesFurnham2001]` |
| 2003 | MSCEIT V2.0: ผู้เชี่ยวชาญ 21 คนกับกลุ่มตัวอย่าง 2,112 คนเห็นตรงกันเรื่อง "คำตอบถูก" ; reliability พอใช้ ; CFA รองรับโมเดล 4 สาขา | ability EI วัดได้จริง | `[MayerEtAl2003_MSCEIT]` |
| 2005 | Locke: "EI is an invalid concept" — ไม่ใช่ intelligence และนิยามกว้างจนไร้ความหมาย | คลื่นคำวิจารณ์ | `[Locke2005]` |
| 2008 | Mayer, Salovey & Caruso: เกิด "schism" — สาย ability vs สาย "eclectic mix of positive traits" (happiness, self-esteem, optimism) | ผู้คิดค้นเองแยกตัวจาก mixed models | `[Mayer2008_EI]` |
| 2000–2009 | PsycInfo: บทความ "emotional intelligence" 1,838 ชิ้น เทียบ 77 ในทศวรรษ 1990 | การระเบิดของงานวิจัย | `[KihlstromCantor2011]` |
| 2010–2020 | meta-analyses: Joseph & Newman (cascading model), O'Boyle et al. (r .24–.30 กับผลงาน), MacCann et al. (ρ = .20 กับผลการเรียน) | จาก "ปฏิวัติ" → "ตัวทำนายขนาดเล็ก-กลาง" | `[JosephNewman2010]` `[OBoyle2011]` `[MacCann2020]` |
| 2016 | Mayer, Caruso & Salovey ปรับ ability model (7 principles) วาง EI ในกลุ่ม "hot intelligences" (personal, social) | สถานะปัจจุบันของโมเดล ability | `[MayerCarusoSalovey2016]` |

**ข้อขัดแย้งในแหล่ง (บันทึกตรง ๆ):** Grewal & Salovey (2005) เขียนว่า "Robert Thorndike … 1930s" ขณะที่ Kihlstrom & Cantor (2011) อ้าง E. L. Thorndike (1920) พร้อมหน้าและคำพูด — เอกสารนี้ใช้ **E. L. Thorndike 1920** เพราะมี citation ละเอียดกว่า แต่ไม่ได้อ่านบทความ Harper's ต้นฉบับ

### 1.2 แนวคิดเปลี่ยนไปอย่างไร (สรุป)
1. **จาก "เหตุผล vs อารมณ์" → "อารมณ์เป็นข้อมูล"**: Grewal & Salovey เล่าว่ามุมมองแบบ Stoic (อารมณ์ = ไร้เหตุผล) อยู่ยาวถึงศตวรรษที่ 20 ก่อนจะถูกท้าทาย `[GrewalSalovey2005]`
2. **จากคำกว้าง → ทักษะย่อยที่วัดได้**: บทเรียน GWSIT ทำให้สาย ability ยืนยันว่าต้องพิสูจน์ว่าไม่ใช่ IQ/บุคลิกภาพซ้ำ `[KihlstromCantor2011]` `[Mayer2008_EI]`
3. **จาก hype → ขนาดผลจริง**: ตัวเลขยุค popular ("เกือบ 90% ของความต่างระหว่างคนเก่ง") ถูกผู้คิดค้นเองเรียกว่าเกินจริง (ดู M01 §3) ; meta-analysis ให้ค่าความสัมพันธ์ระดับ .20–.30
4. **จาก "EQ สูง = ดี" → "EI เป็นเครื่องมือ ใช้ดีหรือร้ายก็ได้"**: งาน empathy (Bloom, Zaki) และจริยธรรม manipulation (SEP) ทำให้คำถามเปลี่ยนเป็น "ใช้เพื่ออะไร" `[Zaki2014]` `[SEP_Manipulation]`

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 นิยามหลัก

| คำ | นิยามที่ใช้ในคลังนี้ | ระดับ | แหล่ง |
|---|---|---|---|
| **Emotional intelligence (ability EI)** | ความสามารถประมวลผลข้อมูลอารมณ์: perceive → use → understand → manage อารมณ์ตนและผู้อื่น | THEORY (มีหลักฐานวัดได้) | `[SaloveyMayer1990]` `[MayerCarusoSalovey2016]` |
| **Trait EI** | การรับรู้ตนเองว่ามีความสามารถทางอารมณ์ — อยู่ในโครงสร้างบุคลิกภาพ | THEORY | `[PetridesFurnham2001]` |
| **Mixed model** | รวมทักษะอารมณ์ + บุคลิก/แรงจูงใจ (optimism, happiness, assertiveness, stress tolerance) | THEORY (ถูกวิจารณ์หนัก) | `[BarOn2006]` `[Mayer2008_EI]` |
| **Social intelligence** | ความสามารถเข้าใจและจัดการคน — "พี่น้อง" ของ EI ไม่ใช่สิ่งเดียวกัน (กลัวงูไม่ใช่เรื่องสังคม) | THEORY | `[KihlstromCantor2011]` |
| **Empathy** | ไม่มีนิยามเดียว: 43 นิยาม, 8 ประเด็น (cognitive vs affective, congruent/incongruent, self-other distinction, automatic vs controlled …) | FACT (ว่านิยามไม่ตรงกัน) | `[Cuff2016]` |
| **Cognitive empathy** | เข้าใจว่าอีกฝ่ายรู้สึก/คิดอะไร (perspective taking) | THEORY | `[Cuff2016]` |
| **Affective empathy** | รู้สึกตาม/รู้สึกร่วม | THEORY | `[Cuff2016]` |
| **Compassion** | ห่วงใยและอยากช่วย โดยไม่ต้องรู้สึกเจ็บตาม (นิยามของ Bloom ถูกวิจารณ์ว่าไม่ชัด) | THEORY | `[Bloom2017_TICS]` `[Vastfjall2017]` |
| **Emotion regulation** | กระบวนการที่กำหนดว่าจะมีอารมณ์อะไร เมื่อไร และแสดงอย่างไร ; extended model = identification → selection → implementation | THEORY แข็งแรง | `[Gross2015]` |
| **Person-centered message** | ข้อความปลอบที่ยอมรับ ให้ความชอบธรรม และช่วยสำรวจความรู้สึกของผู้รับ (ระดับสูงในลำดับ 9 ขั้น) | THEORY + meta-analysis | `[HighDillard2012]` |
| **Manipulation** | อิทธิพลที่ bypass/บั่นทอนการใช้เหตุผล, หลอก (ให้เชื่อ/รู้สึกผิดจากความจริง), หรือกดดันแบบไม่ใช่การบังคับ | THEORY (ปรัชญา) | `[SEP_Manipulation]` |
| **Safe messaging** | แนวทางสื่อสารเรื่องฆ่าตัวตาย/สุขภาพจิตที่ลดความเสี่ยงเลียนแบบและเพิ่มการขอความช่วยเหลือ | FACT (แนวทางทางการ + หลักฐานเชิงระบาดวิทยา) | `[WHO2023_MediaSuicide]` `[Niederkrotenthaler2020]` |

### 2.2 Four-branch model (ability EI) — ใช้เป็นภาษากลางของสตูดิโอ
1. **Perceive** — อ่านอารมณ์จากหน้า เสียง ภาพ ข้อความ
2. **Use (facilitate)** — ใช้อารมณ์ช่วยคิด เช่น อารมณ์บางแบบเหมาะกับงานบางแบบ
3. **Understand** — รู้สาเหตุ ผลต่อเนื่อง อารมณ์ผสม การเปลี่ยนจากอารมณ์หนึ่งไปอีกอารมณ์ (เช่น หงุดหงิด → โกรธ)
4. **Manage** — จัดการอารมณ์ตนและผู้อื่น รวมถึง **คงไว้** อารมณ์ลบเมื่อจำเป็น (เช่น ใช้ความโกรธต่อความไม่เป็นธรรมเพื่อปลุกคนให้ลงมือ) `[GrewalSalovey2005]`

MSCEIT ให้คะแนนสองแบบ — **consensus** (ตรงกับคำตอบของกลุ่มตัวอย่างใหญ่ราว 5,000 คนจาก 7 ประเทศ) และ **expert** ; โมเดลตั้งสมมติฐานว่า "คำตอบถูก" ผูกกับบรรทัดฐานของกลุ่มสังคม `[GrewalSalovey2005]` `[MayerEtAl2003_MSCEIT]` → นัยสำคัญต่อบริบทไทย (ดู §9)

### 2.3 หลักการแกน (core principles)
- **P1 — EI คือทักษะเฉพาะ ไม่ใช่คุณธรรม** (THEORY): ทักษะเข้าใจอารมณ์ใช้ปลอบหรือใช้หลอกก็ได้ `[SEP_Manipulation]` **(opinion: ใช้เป็นหลักจริยธรรมของสตูดิโอ)**
- **P2 — Self-report ≠ skill** (FACT ระดับกลาง): self-report EI สัมพันธ์กับ extraversion r = .37 แต่ MSCEIT แค่ .11 ; คนที่ทักษะต่ำสุดประเมินตัวเองสูงเกิน `[GrewalSalovey2005]`
- **P3 — ลำดับ cascade** (THEORY มี meta-analysis รองรับ): perceive → understand → regulate → performance `[JosephNewman2010]`
- **P4 — Understanding + managing คือส่วนที่ "ทำงาน"** (FACT ระดับกลาง): สองสาขานี้อธิบายผลการเรียนเพิ่มเหนือ IQ + Big Five 3.9% และ 3.6% ขณะที่ perception/facilitation แทบไม่เพิ่ม `[MacCann2020]`
- **P5 — Empathy มีแรงจูงใจ** (THEORY): คนหลีก empathy เมื่อมันเจ็บ/มีต้นทุน และเข้าหาเมื่อได้ความรู้สึกดี ความผูกพัน หรือภาพลักษณ์ที่ดี `[Zaki2014]`
- **P6 — การปลอบที่ดี = ยอมรับ + ให้ความชอบธรรม + สำรวจ** (FACT ระดับกลาง) `[HighDillard2012]`
- **P7 — Feedback ที่ชี้ไปที่ "ตัวตน" ทำผลงานแย่ลงได้** (FACT): 1 ใน 3 ของ feedback intervention ทำให้ผลงานแย่ลง `[KlugerDeNisi1996]`
- **P8 — การพูดถึงความทุกข์มีผลระดับประชากร** (FACT ระดับกลาง-สูง): รูปแบบการเล่า (วิธีการ, ซ้ำ, myth) เพิ่มความเสี่ยง ; เรื่องการผ่านวิกฤตได้ลดความเสี่ยง `[Niederkrotenthaler2010]` `[Niederkrotenthaler2020]`

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 สามสายของ EI — กลไกและการแข่งขันกันของโมเดล

| | Ability (MSCEIT) | Trait (TEIQue / self-report) | Mixed (Bar-On EQ-i, Goleman) |
|---|---|---|---|
| วัดอะไร | performance — มีคำตอบถูก/ผิด | self-perception | self-report ทักษะ + บุคลิก + แรงจูงใจ |
| วางตรงไหน | เป็น "intelligence" ในกลุ่ม hot intelligences `[MayerCarusoSalovey2016]` | composite ในโครงสร้างบุคลิกภาพ `[PetridesFurnham2001]` | "cross-section of competencies, skills and facilitators" `[BarOn2006]` |
| ทับซ้อน | IQ บ้าง (reading comprehension อาจเป็น confound) `[MacCann2020]` | Big Five สูง | Big Five + self-esteem + optimism สูง `[Mayer2008_EI]` |
| ทำนายผลการเรียน | ρ = .24 (ดีที่สุด) | ρ = .12 | ρ = .19 `[MacCann2020]` |
| ทำนายผลงาน | อ่อนที่สุดในสามสาย, ขึ้นกับ emotional labour `[JosephNewman2010]` | incremental สูง `[OBoyle2011]` | incremental สูง `[OBoyle2011]` |
| คำวิจารณ์หลัก | consensus scoring = ความถูกต้องตามบรรทัดฐานกลุ่ม | วัด "ความมั่นใจ" ไม่ใช่ทักษะ | Locke: นิยามกว้างไร้ความหมาย `[Locke2005]` |

**ทำไมผลต่างกัน (กลไกที่เสนอ):** MacCann et al. เสนอว่า ability EI ทำนายผลการเรียนดีกว่าเพราะ**วิธีวัดตรงกัน** (ข้อสอบเชิงวัตถุ ↔ งานเชิงวัตถุ) ขณะที่ผลงาน (job performance) มักวัดด้วย supervisor rating ซึ่งใกล้กับ self/peer rating ของ trait/mixed — ความต่างจึงอาจเป็น **method bias** ไม่ใช่ความต่างของเนื้อหา `[MacCann2020]`

**Cascading model** (Joseph & Newman): perception สะท้อน Conscientiousness, understanding สะท้อน cognitive ability, regulation สะท้อน Neuroticism ต่ำ → ability EI สัมพันธ์บวกกับผลงานในงาน **high emotional labour** แต่สัมพันธ์**ลบ**ในงาน low emotional labour `[JosephNewman2010]` — นัย: EI มีค่ามากเมื่อ "งานคืออารมณ์" (บริการ, การดูแล, งานเขียนเพื่อสร้างอารมณ์)

### 3.2 Emotion perception — universality กับ in-group advantage
- Meta-analysis: อารมณ์ถูกจำได้ข้ามวัฒนธรรมสูงกว่าโอกาส แต่ **แม่นกว่าเมื่อผู้แสดงและผู้ดูอยู่กลุ่มเดียวกัน** ; ข้อได้เปรียบลดลงเมื่อสองกลุ่มติดต่อกันมาก ; กลุ่มส่วนใหญ่อ่านกลุ่มส่วนน้อยได้แย่กว่ากรณีกลับกัน `[ElfenbeinAmbady2002]`
- ต่อยอด M02 §2.10 (ข้อถกเถียงเรื่องการอ่านสีหน้า): ข้อมูลนี้เป็นหลักฐานว่า "การอ่านอารมณ์" มีทั้งส่วนสากลและส่วนเรียนรู้ทางวัฒนธรรม (THEORY ระดับกลาง)

### 3.3 Empathy: motivated account และข้อถกเถียง Bloom
- **Zaki (motivated empathy):** empathy ทั้งอัตโนมัติและขึ้นกับบริบท — แรงจูงใจหลีก 3 แบบ (ความทุกข์, ต้นทุนวัตถุ, การแข่งขัน) และเข้าหา 3 แบบ (positive affect, affiliation, social desirability) ; คนควบคุม empathy ผ่าน situation selection, attention, appraisal — **ใช้โครงเดียวกับ Gross** `[Zaki2014]`
- **Bloom ("Against Empathy"):** empathy เป็นไฟฉาย (spotlight) ส่องคนเดียวตรงหน้า ลำเอียงไปกลุ่มตัวเอง อาจผลักให้ทำสิ่งเลวร้าย → เสนอ "rational compassion" `[Bloom2017_TICS]` (bibliographic) `[Bloom2016_AgainstEmpathy]` (search_summary)
- **คำโต้แย้ง:** Västfjäll, Erlandsson, Slovic & Tinghög — compassion ของ Bloom นิยามไม่คงที่ ; identifiable-victim และ singularity effect ที่ Bloom ยกมาเป็นการลดลงของ compassion ด้วย ; compassion ก็ลำเอียง ; ทางออกคือ**ออกแบบโครงสร้าง**ที่พาอารมณ์ไปสู่ค่านิยม ไม่ใช่ตัดอารมณ์ทิ้ง `[Vastfjall2017]`
- สรุปสถานะ: **contested** — ทั้งสองฝั่งเห็นตรงกันว่าอารมณ์ต่อ "คนหนึ่งคน" ไม่ใช่เข็มทิศศีลธรรมที่พอ ; ไม่ตรงกันว่าควรทิ้ง empathy หรือไม่ (ความมั่นใจ: medium)

### 3.4 Emotion regulation — อะไรได้ผลจริง (ต่อยอด M02 §2.9)
Meta-analysis 306 การเปรียบเทียบเชิงทดลอง `[Webb2012]`:

| กลยุทธ์ | d+ | อ่านว่า |
|---|---|---|
| Attentional deployment (รวม) | 0.00 | โดยรวมไม่ได้ผล แต่แยกย่อยต่างกันมาก |
| — distraction (หันไปสนใจอย่างอื่น) | 0.27 | ได้ผล |
| — concentration (จ้องความรู้สึก) | −0.26 | **แย่ลง** |
| Response modulation (รวม) | 0.16 | เล็ก |
| — suppress expression | 0.32 | ลดการแสดงออกได้ |
| — suppress experience / thoughts | −0.04 / −0.12 | ไม่ได้ผล |
| Cognitive change (รวม) | 0.36 | ดีที่สุด (เล็ก-กลาง) |
| — reappraise stimulus / perspective taking | 0.36 / สูงกว่า reappraise response | มองเหตุการณ์ใหม่ / มองจากอีกฝ่าย |
| — reappraise response | 0.23 | อ่อนกว่า |

- นิสัย: reappraisers มีอารมณ์บวกมากกว่าและความสัมพันธ์ดีกว่า ; suppressors ตรงข้าม (correlational, ตัวอย่างสหรัฐฯ) `[GrossJohn2003]`
- Extended process model: regulation = การประเมินค่า (valuation) 3 ขั้น — **identification** (รู้ว่าต้องจัดการ), **selection** (เลือกกลยุทธ์), **implementation** (ทำ) `[Gross2015]` ; ความสามารถแยกแยะอารมณ์ลบละเอียด (emotion differentiation) สัมพันธ์กับการใช้กลยุทธ์จัดการมากขึ้น `[GrewalSalovey2005]`

### 3.5 Appraisal theory — การใช้ในงานปลอบใจ (ต่อยอด M02 §2.3)
M02 อธิบาย appraisal ไว้แล้ว ส่วนที่เพิ่มคือ**การเชื่อมกับ regulation**: cognitive change คือการเปลี่ยน appraisal และเป็นกลุ่มกลยุทธ์ที่ได้ผลที่สุด `[Webb2012]` ; loneliness intervention ที่ได้ผลที่สุดใน RCT คือการแก้ **maladaptive social cognition** (ความคิด/การตีความว่าคนอื่นไม่ต้องการเรา) ไม่ใช่การเพิ่มโอกาสเจอคนอย่างเดียว `[Masi2011]` → ในงานเล่าเรื่อง "จุดหัก" ที่น่าเชื่อคือการเปลี่ยนการตีความ ไม่ใช่การเปลี่ยนสถานการณ์ด้วยปาฏิหาริย์ **(craft, อนุมานจากหลักฐาน)**

### 3.6 Motivation — SDT สำหรับข้อความ (ต่อยอด M01 §2.7)
ความต้องการพื้นฐาน 3 อย่าง: **competence, autonomy, relatedness** — เมื่อได้รับ → แรงจูงใจในตัวและสุขภาพจิตดี ; เมื่อถูกขัดขวาง → แรงจูงใจและ wellbeing ลด `[RyanDeci2000]`
แปลเป็นข้อความ (craft): autonomy = "เลือกเองได้" ไม่ใช่ "ต้อง" ; competence = ก้าวเล็กที่ทำได้จริง ; relatedness = "ไม่ได้เป็นคนเดียว"

### 3.7 Wellbeing messaging — กลไกของการ "ช่วย" vs "ทำร้าย"
1. **Affirmation backfire:** คน self-esteem ต่ำที่ท่อง "I'm a lovable person" รู้สึก**แย่ลง** ; การยอมให้ข้อความ "จริงบ้างไม่จริงบ้าง" ช่วยกลุ่มนี้มากกว่า `[WoodPerunovicLee2009]` — กลไกที่ผู้วิจัยเสนอ: ข้อความที่ห่างจากความเชื่อตนเองมากเกินไปกระตุ้นความคิดแย้ง (THEORY ; การ replicate ไม่ได้ตรวจในรอบนี้)
2. **Upward comparison:** การเห็นคนที่ "ดีกว่า" บนโซเชียลลด self-evaluation/อารมณ์ g = −0.24 (body image −0.31) ; contrast เป็นปฏิกิริยาหลัก ไม่ใช่แรงบันดาลใจ `[McComb2023]`
3. **Self-compassion:** สัมพันธ์กับ psychopathology ต่ำ r = −0.54 (correlational) `[MacBeth2012]`
4. **Loneliness** เป็นปัจจัยเสี่ยงตาย OR 1.26 (เทียบเท่าปัจจัยเสี่ยงที่รู้จักกันดี) `[HoltLunstad2015]` → หัวข้อจริงจัง ไม่ใช่มุก
5. **Werther vs Papageno:** การรายงานซ้ำและ myth สัมพันธ์กับการฆ่าตัวตายเพิ่ม ; เรื่อง "mastery of crisis" สัมพันธ์กับการลดลง `[Niederkrotenthaler2010]` ; ข่าวคนดังฆ่าตัวตาย +13%, บอกวิธี +30% เฉพาะวิธีนั้น `[Niederkrotenthaler2020]`
6. **Feeds ส่งต่ออารมณ์:** ลดโพสต์บวกใน feed → ผู้ใช้โพสต์บวกน้อยลง (ผลเล็กมากแต่ระดับมหาศาล) `[Kramer2014]`

### 3.8 Feedback — ทฤษฎี FIT และ person-centeredness
- **Feedback Intervention Theory:** feedback ย้ายจุดสนใจขึ้นลงระหว่าง task learning → task motivation → meta-task/self ; ยิ่งขึ้นไปใกล้ "ตัวตน" ผลยิ่งแย่ `[KlugerDeNisi1996]`
- Hattie & Timperley: feedback ทรงพลังแต่ผลบวกหรือลบขึ้นกับชนิดและวิธีให้ `[HattieTimperley2007]`
- **การรับ feedback** (ฝั่งผู้รับ): ข้อมูลไทยชี้ว่าคนรับ feedback แรงได้ถ้ามีข้อเสนอแนะ และเชื่อเมื่อผู้ให้รู้ความพยายามจริง `[Areemit2021_KrengJai]`

### 3.9 จริยธรรมของการโน้มน้าวด้วยอารมณ์
- SEP: 3 สายหลัก — (1) bypass/บั่นทอน reason, (2) trickery = ทำให้เกิดความเชื่อ**หรืออารมณ์**ที่ผิดจากความจริง, (3) pressure แบบไม่บังคับ ; **การดึงอารมณ์ไม่ใช่ manipulation เสมอ** (เช่น ภาพเตือนบนซองบุหรี่) ; manipulation ส่วนใหญ่ถือว่า "ผิดโดยหลัก" (pro tanto) เพราะทำร้าย ลดอิสระ หรือปฏิบัติต่อคนเหมือนสิ่งของ ; ยังไม่มีฉันทามติว่า nudge/framing แบบไหน manipulative `[SEP_Manipulation]`
- Dark patterns ในเว็บช้อปปิ้ง: 1,818 กรณี 15 ประเภท, 183 เว็บหลอกลวง, 22 บริษัทขายเป็นบริการ `[Mathur2019]`
- กรณีทดลอง Facebook: PNAS ออก expression of concern เรื่อง informed consent/opt-out `[Verma2014]`

**เกณฑ์ใช้งานของสตูดิโอ (opinion ที่ยึดจาก SEP):** อารมณ์ที่กระตุ้น (1) **ตรงกับความจริง** ของสถานการณ์/สินค้า และ (2) ผู้ชม**จะยอมรับได้ถ้าเห็นกลไก** → ไม่ใช่ manipulation ; ถ้าข้อใดข้อหนึ่งไม่ผ่าน → ห้าม

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| Key | พบ/เสนออะไร | Tier | Access |
|---|---|---|---|
| `[SaloveyMayer1990]` | นิยาม EI แรกเป็นชุดทักษะ | A | abstract |
| `[MayerEtAl2003_MSCEIT]` | ผู้เชี่ยวชาญ–กลุ่มตัวอย่างเห็นตรงกัน, reliability พอ, 4 branches | A | abstract |
| `[Mayer2008_EI]` | schism ability vs eclectic traits ; ability มี incremental validity | A | abstract |
| `[MayerCarusoSalovey2016]` | 7 principles, ปรับโมเดล, hot intelligences | A | abstract |
| `[GrewalSalovey2005]` | ประวัติ + extraversion .37 vs .11 + self-estimate ผิด + emotion differentiation | B | full_text |
| `[KihlstromCantor2011]` | Thorndike 1920, GWSIT ล้มเพราะทับ IQ, การระเบิดของ EI | A | full_text |
| `[Goleman1995]` | หนังสือ popularise (ไม่ได้อ่าน) | D | bibliographic |
| `[BarOn2006]` | ESI 5/15, EQ-i 133 ข้อ, ข้ออ้าง validity จากงานตัวเอง | A | full_text |
| `[PetridesFurnham2001]` | trait EI เป็น composite ในบุคลิกภาพ | A | abstract |
| `[Locke2005]` | EI ไม่ใช่ intelligence, นิยามกว้างเกิน | A | abstract |
| `[JosephNewman2010]` | cascading model ; ผลขึ้นกับ emotional labour | S | abstract |
| `[OBoyle2011]` | r .24–.30 กับผลงาน ; incremental ของ stream 2–3 | S | abstract |
| `[MacCann2020]` | ρ .20 กับผลการเรียน ; understanding/management สำคัญ ; humanities > science | S | full_text |
| `[Miao2018_LeaderEI]` | EI ของหัวหน้าสำคัญกว่าใน collectivist/high power distance | S | abstract |
| `[ElfenbeinAmbady2002]` | universality + in-group advantage | S | abstract |
| `[Cuff2016]` | 43 นิยาม empathy, 8 ประเด็น | A | abstract |
| `[Zaki2014]` | motivated empathy | A | abstract |
| `[Bloom2017_TICS]` | ต่อต้าน empathy เป็นเข็มทิศศีลธรรม | A | bibliographic |
| `[Bloom2016_AgainstEmpathy]` | หนังสือ rational compassion | B | search_summary |
| `[Vastfjall2017]` | โต้แย้ง Bloom | A | full_text |
| `[Gross2015]` | extended process model | A | abstract |
| `[GrossJohn2003]` | reappraisal vs suppression นิสัย | A | abstract |
| `[Webb2012]` | ประสิทธิผลกลยุทธ์ regulation | S | abstract |
| `[RyanDeci2000]` | SDT 3 needs | A | abstract |
| `[WoodPerunovicLee2009]` | affirmation backfire ใน self-esteem ต่ำ | A | abstract |
| `[MacBeth2012]` | self-compassion ↔ psychopathology r −.54 | S | abstract |
| `[Masi2011]` | ลดความเหงา: social cognition ได้ผลที่สุด, ผลรวมเล็ก | S | full_text |
| `[HoltLunstad2015]` | loneliness/isolation เพิ่มความเสี่ยงตาย ~26–32% | S | abstract |
| `[McComb2023]` | upward comparison บนโซเชียล g −.24 | S | abstract |
| `[KlugerDeNisi1996]` | feedback d .41 แต่ 1/3 ทำให้แย่ลง | S | abstract |
| `[HattieTimperley2007]` | โมเดล feedback | A | abstract |
| `[HighDillard2012]` | person-centeredness ↔ ประสิทธิผลการปลอบ | S | abstract |
| `[Areemit2021_KrengJai]` | ลำดับชั้น + เกรงใจ กับ feedback ในไทย | A | abstract |
| `[Thaithae2026]` | กลวิธีวิจารณ์ในที่ทำงานไทย | A | abstract |
| `[AndrewsChompusri2013]` | เกรงใจในบริษัทลูกไทย | A | abstract |
| `[Persons2008]` | 5 องค์ประกอบของ "หน้า" แบบไทย | A | abstract |
| `[Komin1990]` | 9 กลุ่มค่านิยมไทย (ไม่ได้อ่าน) | A | search_summary |
| `[WHO2023_MediaSuicide]` | Dos & Don'ts การสื่อสารเรื่องฆ่าตัวตาย | S | publisher_page |
| `[Niederkrotenthaler2010]` | Werther vs Papageno | A | abstract |
| `[Niederkrotenthaler2020]` | meta-analysis ผลของข่าว | S | full_text |
| `[Niederkrotenthaler2021_Logic]` | เพลง Logic ↔ สายด่วน +6.9%, ฆ่าตัวตาย −5.5% | A | abstract |
| `[Bridge2019_13RW]` | 13 Reasons Why ↔ วัยรุ่นสหรัฐฯ +29% | A | full_text |
| `[Lotrakul2022]` | ข่าวไทยไม่ทำตาม WHO | A | abstract |
| `[SEP_Manipulation]` | ปรัชญา manipulation | B | full_text |
| `[Mathur2019]` | dark patterns 11K เว็บ | A | abstract |
| `[Kramer2014]` | emotional contagion ใน feed | A | abstract |
| `[Verma2014]` | expression of concern เรื่อง consent | B | full_text |
| `[LoveTheWork_UnsungHero]` | Thai Life "Unsung Hero" | C | search_summary |
| `[Dove2013_WARC]` | Dove Real Beauty Sketches | C | publisher_page |
| `[Pepsi2017_ABC13]` | Pepsi × Kendall Jenner ถูกถอด | C | full_text |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| ข้ออ้าง | ความแข็งแรง | หลักฐาน | ข้อจำกัด/ฝั่งค้าน |
|---|---|---|---|
| EI (ทุกสาย) สัมพันธ์กับผลงาน/ผลการเรียน | **high** (ว่ามีความสัมพันธ์) / **ขนาดเล็ก-กลาง** | r .24–.30 `[OBoyle2011]` ; ρ .20 `[MacCann2020]` | correlational ; criterion เป็น rating |
| "EQ สำคัญกว่า IQ" | **low** | MacCann: EI เป็นตัวทำนายอันดับ 3 รอง IQ และ conscientiousness `[MacCann2020]` | ข้ออ้าง popular `[Goleman1995]` ถูกผู้คิดค้นวิจารณ์ `[Mayer2008_EI]` |
| EI เพิ่มอำนาจทำนายเหนือ IQ + Big Five | **medium** | ability 1.7%, mixed 2.3% ; understanding 3.9% `[MacCann2020]` ; streams 2–3 ใหญ่สุด `[OBoyle2011]` | mixed EI ทับซ้อนตัวแปรอื่น `[JosephNewman2010]` ; Locke ว่าไม่ใช่ intelligence `[Locke2005]` |
| Self-report EI วัดทักษะได้ | **low** | ทับ extraversion ; ประเมินตนผิด `[GrewalSalovey2005]` | trait EI มีประโยชน์ในฐานะ self-perception `[PetridesFurnham2001]` |
| Mixed models (Bar-On) มี validity สูง (.59) | **low-medium** | `[BarOn2006]` | งานส่วนใหญ่ของผู้พัฒนาเอง, cross-sectional, บางชิ้นไม่ตีพิมพ์ |
| EI ฝึกได้ | **ไม่ได้ประเมินรอบนี้** | Bar-On อ้างการเพิ่มคะแนนจากงานเล็ก `[BarOn2006]` | ไม่มี meta-analysis การฝึกที่อ่านในรอบนี้ — gap |
| อ่านอารมณ์ข้ามวัฒนธรรมได้ แต่ in-group แม่นกว่า | **high** | `[ElfenbeinAmbady2002]` | ข้อมูลส่วนใหญ่เป็นสีหน้าแสดงท่า (posed) |
| Reappraisal/perspective taking ได้ผลกว่าการกดความรู้สึก | **high** (ในแลบ) | `[Webb2012]` `[GrossJohn2003]` | ผลระยะสั้น ; ตัวอย่างตะวันตก ; ผลของ suppression ขึ้นกับวัฒนธรรม (M02) |
| Empathy ลำเอียงและเป็นเข็มทิศศีลธรรมที่ไม่ดี | **medium / contested** | `[Bloom2017_TICS]` | `[Vastfjall2017]` ว่า compassion ก็ลำเอียง ; `[Zaki2014]` ว่า empathy ปรับได้ด้วยแรงจูงใจ |
| Affirmation กว้าง ๆ ย้อนศรคน self-esteem ต่ำ | **medium-low** | 2 การทดลอง `[WoodPerunovicLee2009]` | ตัวอย่างนักศึกษา, ไม่ได้ตรวจ replication |
| Upward comparison บนโซเชียลทำให้รู้สึกแย่ | **high** (ระยะสั้น) | 48 บทความ, g −.24 `[McComb2023]` | การทดลองเปิดรับระยะสั้น |
| การปลอบแบบ person-centered ได้ผลกว่า | **medium-high** | 23 งาน `[HighDillard2012]` | อ่อนลงเมื่อใช้ confederate จริง |
| Feedback ที่ชี้ตัวตนลดผลงาน | **high** | 607 effect sizes `[KlugerDeNisi1996]` | moderator ด้าน task ยังไม่ชัด |
| ข่าวคนดังฆ่าตัวตายเพิ่มการฆ่าตัวตาย | **medium-high** | RR 1.13 ; บอกวิธี 1.30 `[Niederkrotenthaler2020]` | observational, heterogeneity สูง, publication bias บ้าง |
| เรื่องการผ่านวิกฤตปกป้อง (Papageno) | **medium** | `[Niederkrotenthaler2010]` `[Niederkrotenthaler2021_Logic]` ; WHO ระบุ "growing evidence" `[WHO2023_MediaSuicide]` | ecological ; ไม่ใช่ RCT |
| Fiction ไม่ปลอดภัยกว่าข่าว | **medium** | `[Bridge2019_13RW]` | quasi-experimental ; แยก content จากการโปรโมตไม่ได้ |
| Emotional contagion ผ่าน feed | **medium** (มีจริง, ผลเล็กมาก) | `[Kramer2014]` | ปัญหา consent `[Verma2014]` |
| เกรงใจ/ลำดับชั้นทำให้ feedback ในไทยไหลทางเดียวและอ้อม | **medium** (หลายงานเล็กสอดคล้องกัน) | `[Areemit2021_KrengJai]` `[Thaithae2026]` `[AndrewsChompusri2013]` | qualitative/ตัวอย่างเล็ก ; คนละบริบท (แพทย์, ออฟฟิศ, บริษัทข้ามชาติ) |
| EI ของผู้นำมีผลมากขึ้นในวัฒนธรรม collectivist/power distance สูง | **medium** | `[Miao2018_LeaderEI]` | ใช้คะแนน Hofstede ระดับประเทศ (ดูคำวิจารณ์ Hofstede ใน M30) |

**Replication / contested notes**
- ไม่พบ replication failure ใหญ่ระดับ "ego depletion" ในวรรณกรรม EI ที่อ่าน — ปัญหาหลักของ EI คือ **construct validity** (นิยามและการทับซ้อน) ไม่ใช่การทำซ้ำผล
- ข้อมูลไทยสำหรับ EI โดยตรง: พบเพียงแบบประเมิน EQ ของกรมสุขภาพจิต (ดี-เก่ง-สุข) ผ่านเอกสารผู้ใช้/บล็อก **ไม่ได้ยืนยันจากแหล่งทางการ จึงไม่ใส่เป็น source** — ห้ามอ้างคะแนน/เกณฑ์ไทยจนกว่าจะได้เอกสารทางการ

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 แกนทั่วไป (ใช้ได้กับทุกสาขา)

**A. อ่านความต้องการทางอารมณ์ของผู้ชม (perceive + understand)** — **(craft บนฐาน four-branch)**
1. ระบุ "อารมณ์ตั้งต้น" ของผู้ชมตอนเลื่อนเจอ (เหนื่อย? เปรียบเทียบตัวเอง? เหงา? เบื่อ?) — ใช้คำอารมณ์ละเอียด ไม่ใช่ "รู้สึกไม่ดี" (emotion differentiation `[GrewalSalovey2005]`)
2. ถาม "เขาอยากได้อะไรจากเราตอนนี้": ถูกเข้าใจ / ทางออก / ได้หัวเราะ / ได้พัก — ตรงกับ approach motives ของ Zaki (affiliation, positive affect) `[Zaki2014]`
3. ตรวจว่าเนื้อหาไม่บังคับให้ผู้ชม "หลีก empathy" (เจ็บเกินโดยไม่มีอะไรให้ทำ) `[Zaki2014]`

**B. เขียนบทปลอบใจ (comforting dialogue)** — ลำดับ 4 จังหวะ (craft อิง `[HighDillard2012]` `[Webb2012]` `[RyanDeci2000]` `[WoodPerunovicLee2009]`)
1. **Acknowledge** — สะท้อนความรู้สึกเฉพาะ ("เหนื่อยแบบที่นอนแล้วก็ไม่หาย")
2. **Legitimise** — บอกว่าความรู้สึกนี้สมเหตุสมผล ("ใครเจอแบบนี้ก็เหนื่อย")
3. **Explore / reappraise เบา ๆ** — ชวนมองมุมใหม่หรือมองจากอีกฝ่าย ไม่ใช่สั่งให้คิดบวก
4. **Small autonomous step** — ก้าวเล็กที่เลือกเองได้ + "ไม่ได้อยู่คนเดียว"
ห้าม: "อย่าคิดมาก", "คนอื่นแย่กว่านี้อีก", "เธอเก่งที่สุดในโลก" (ปฏิเสธความรู้สึก / เปรียบเทียบ / affirmation เกินจริง)

**C. ให้ feedback (กับทีม คนจ้าง ฟรีแลนซ์ หรือ AI)** — อิง `[KlugerDeNisi1996]` `[HattieTimperley2007]`
- พูดถึง **งาน** ไม่ใช่ **คน** ("สไลด์ 3 ตัวหนังสือแน่นเกิน" แทน "คุณไม่มีเซนส์")
- สามคำถาม: เป้าคืออะไร / ตอนนี้อยู่ตรงไหน / ทำอะไรต่อ
- ให้ข้อเสนอแนะที่ทำได้จริงคู่กับคำวิจารณ์ (ผู้รับยอมรับคำแรงได้เมื่อมีทางแก้ `[Areemit2021_KrengJai]`)

**D. รับ feedback** — (craft) แยก "ข้อมูลเกี่ยวกับงาน" ออกจาก "คำตัดสินตัวตน" ; ถามต่อหนึ่งคำถามก่อนตอบโต้ ; ใช้ reappraisal ("นี่คือข้อมูลว่าผู้ชมยังไม่เข้าใจ") แทน suppression `[Webb2012]`

**E. Wellbeing / safe messaging** — ดู §11 decision guide และ checklist ข้อ 1–6

### 6.2 สำหรับสตูดิโอ TIME OPTIC

**Mint & Tao / Slowly Growing (คารูเซลเรื่องเล่าไทย 1:1)**
- **โครงตอนเรื่องเหนื่อย/เปรียบเทียบ:** สไลด์ 1 ภาพที่ผู้ชมจำตัวเองได้ (Tao เลื่อนดูชีวิตคนอื่นตอนตีหนึ่ง) → 2 Tao พูดความรู้สึกจริง → 3 Mint ไม่รีบแก้ แต่ยอมรับ (acknowledge/legitimise) → 4 Mint เล่า "หลังบ้าน" ของตัวเอง (ลด upward comparison `[McComb2023]`) → 5 มุมใหม่ (reappraisal) → 6 ก้าวเล็ก ("วันนี้ปิดจอเร็วขึ้นสิบนาทีพอ") → 7 จบด้วยความอยู่ด้วยกัน (relatedness `[RyanDeci2000]`)
- **ห้ามให้ Mint พูด affirmation ใหญ่** ("Tao เก่งที่สุดแล้ว!") กับตัวละครที่กำลังสงสัยตัวเอง — ใช้แบบ "จริงบางส่วน" ("ยังไม่เก่งเรื่องนี้ แต่เมื่อเดือนก่อนยังทำไม่ได้เลยนะ") `[WoodPerunovicLee2009]` **(our test: เทียบ save/share ระหว่างสองแบบ)**
- **ความเหงา:** เปลี่ยนการตีความ ("เขาไม่ตอบ = เขาไม่ชอบเรา?") สำคัญกว่าการพาไปปาร์ตี้ `[Masi2011]`
- **ความเกรงใจ:** ในฉาก Tao ไม่กล้าบอกว่าเหนื่อย — ให้ Mint เป็นคน "เปิดประตู" (ตามข้อมูลว่าฝ่ายรองไม่ค่อยขอ `[Areemit2021_KrengJai]`) และไม่เขียนเกรงใจเป็นข้อบกพร่อง (ต่อยอด M02 §2.12)

**Story clips + TTS (ภาษาไทย)**
- เสียงปลอบใจ: จังหวะช้าลงตอน acknowledge, ไม่ขึ้นเสียงสูงแบบเชียร์ ; ดู `.claude/skills/ai-voice-director` สำหรับ direction JSON **(craft)**
- ถ้าเนื้อเรื่องแตะความคิดอยากตาย/ทำร้ายตัวเอง: **ไม่แสดงวิธีการ สถานที่ หรือเหตุผลเดียว** ; แสดงการขอความช่วยเหลือและการผ่านพ้น ; ใส่ข้อมูลช่วยเหลือ (สายด่วนสุขภาพจิต — **ตรวจเบอร์ปัจจุบันจากกรมสุขภาพจิตก่อนเผยแพร่ทุกครั้ง**; ไม่ได้ยืนยันในรอบนี้) `[WHO2023_MediaSuicide]`

**คลิป/โพสต์สินค้าแว่น**
- อารมณ์ที่ซื่อตรง: ความโล่งเมื่อมองชัด ความมั่นใจเมื่อใส่แล้วเป็นตัวเอง — **ตรงกับสิ่งที่สินค้าทำได้จริง** (เกณฑ์ SEP §3.9)
- ห้าม: "คนใส่แว่นดูไม่ดี เลยต้องรุ่นนี้" (สร้าง insecurity), "เหลือ 2 ชิ้นสุดท้าย" ที่ไม่จริง (dark pattern `[Mathur2019]`), ใช้ความเหงา/ความเศร้าเป็นตัวขาย
- ลูกค้าไทยที่เกรงใจอาจไม่บ่นแต่เลิกมา (M30) → ข้อความ "ลองได้ทุกอัน ไม่ต้องเกรงใจ" เป็นการใช้ EI แบบให้เกียรติ

### 6.3 ตัวอย่างบท (worked examples) — ก่อน/หลัง **(craft อิงหลักฐานที่อ้าง)**

**ตัวอย่าง 1 — ความเหนื่อย (Slowly Growing)**

| จังหวะ | ก่อน (ปัญหา) | หลัง | หลักที่ใช้ |
|---|---|---|---|
| Tao | "ช่วงนี้เหนื่อยมาก" | "ช่วงนี้เหนื่อยแบบนอนแล้วก็ไม่หาย" | emotion differentiation `[GrewalSalovey2005]` |
| Mint ตอบ | "สู้ ๆ นะ! เธอทำได้!" | "เหนื่อยแบบนั้นหนักนะ… ไม่แปลกเลยที่รู้สึกแบบนี้" | acknowledge + legitimise `[HighDillard2012]` |
| Mint ต่อ | "อย่าคิดมาก" | "อะไรที่หนักที่สุดในอาทิตย์นี้เหรอ" | explore แทน suppress `[Webb2012]` |
| จุดหัก | "พรุ่งนี้ทุกอย่างจะดีเอง" | "งั้นคืนนี้ลองวางงานชิ้นนั้นไว้ก่อน แล้วพรุ่งนี้ค่อยทำทีละครึ่ง เอาไหม" | ก้าวเล็ก + ทางเลือก `[RyanDeci2000]` |
| จบ | ภาพ Tao ยิ้มกว้างหายเหนื่อยทันที | ภาพสองคนนั่งเงียบ ๆ ข้างกัน แสงเย็น | relatedness ; หลีกเลี่ยง "ปาฏิหาริย์" `[Masi2011]` |

**ตัวอย่าง 2 — การเปรียบเทียบ**
- ก่อน: Mint บอก "อย่าไปดูคนอื่น ดูตัวเองสิ" (คำสั่ง = กดความคิด ไม่ได้ผล `[Webb2012]`)
- หลัง: Mint หยิบโทรศัพท์ตัวเองให้ดู "รูปนี้ที่ทุกคนกดไลก์ ถ่ายตอนฉันเพิ่งร้องไห้เสร็จเลยนะ" → เปลี่ยนการตีความเป้าการเปรียบเทียบ (reappraise stimulus d = .36 `[Webb2012]`) และลด contrast `[McComb2023]`

**ตัวอย่าง 3 — self-doubt**
- ก่อน: "เธอเก่งที่สุดแล้ว!" (ย้อนศรกับคน self-esteem ต่ำ `[WoodPerunovicLee2009]`)
- หลัง: "ยังไม่เก่งเรื่องนี้หรอก แต่เดือนก่อนเธอยังเปิดไฟล์นี้ไม่ได้เลย" — ยอมให้จริงบางส่วน + หลักฐานเล็กเฉพาะเจาะจง

**ตัวอย่าง 4 — ความเกรงใจในฉาก feedback**
- รุ่นน้อง (Tao) ไม่กล้าบอกรุ่นพี่ว่างานที่สั่งมาไม่ทันแน่ — ฉากสมจริงแบบไทยคือ Tao พูดอ้อม ("พี่… งานนี้น่าจะต้องใช้เวลานิดนึงนะ") และรุ่นพี่ที่มี EI **อ่าน**ความอ้อมนั้นออก แล้ว**เปิดพื้นที่**: "ไม่ทันใช่ไหม บอกพี่ตรง ๆ ได้ ไม่ต้องเกรงใจ" `[Areemit2021_KrengJai]` `[Thaithae2026]`
- ห้ามเขียนให้ Tao "ผิด" เพราะพูดอ้อม — ความอ้อมคือทักษะทางสังคมในบริบทไทย (M30)

**ตัวอย่าง 5 — คลิปสินค้าแว่น (ข้อความเสียง TTS)**
- ก่อน: "ใส่แว่นเก่าแล้วดูแก่ใช่ไหม? เปลี่ยนด่วน! เหลือ 3 ชิ้นสุดท้าย" (insecurity + fake scarcity `[Mathur2019]`)
- หลัง: "อ่านตัวหนังสือเล็กแล้วต้องยื่นมือออกไปไกล ๆ … เป็นเรื่องปกติของสายตาตามวัย ลองเลนส์ที่ร้านได้ ไม่ต้องรีบตัดสินใจ" — อารมณ์ "โล่งที่ได้รู้ว่าปกติ" ตรงความจริง + autonomy `[SEP_Manipulation]` `[RyanDeci2000]`

### 6.4 แม่แบบ feedback (ใช้ในทีม/กับลูกค้า/กับ AI critic)

| สถานการณ์ | แม่แบบ | หลัก |
|---|---|---|
| งานของรุ่นน้อง/ฟรีแลนซ์ | "เป้าของชิ้นนี้คือ __ ตอนนี้ __ ทำได้ดีแล้ว จุดที่ยังไม่ถึงเป้าคือ __ ลอง __ ดูไหม" | where am I going / how / next `[HattieTimperley2007]` |
| งานของลูกค้าอาวุโส | "ถ้าเป้าหมายคือให้คนกดเซฟ เราลองเทียบสองแบบนี้ดูไหมคะ แบบ B อาจอ่านง่ายกว่าบนมือถือ" (อ้อม เสนอทางเลือก ไม่ชี้ผิด) | indirect กับผู้อาวุโส `[Thaithae2026]` |
| งานที่พลาดซ้ำ | พูดถึง pattern ในงาน ไม่ใช่นิสัย: "สามชิ้นล่าสุดตัวหนังสือชิดขอบ" ไม่ใช่ "คุณไม่ละเอียด" | task ไม่ใช่ self `[KlugerDeNisi1996]` |
| เมื่อเราเป็นผู้รับ | ขอบคุณ → ถามหนึ่งข้อให้เจาะจง → สรุปสิ่งที่จะแก้ → ค่อยอธิบายเหตุผลถ้าจำเป็น | reappraisal ของผู้รับ `[Webb2012]` **(craft)** |
| ให้ AI ตรวจงาน (creative-critic) | ขอให้ระบุตำแหน่ง + เหตุผล + ทางแก้ ; ห้ามคำตัดสินรวม ("แย่") | task-level feedback `[KlugerDeNisi1996]` |

### 6.5 โปรไฟล์ EI ของตัวละคร (character bible add-on)
**(craft)** ใช้ four-branch + extended process model เป็นช่องในไบเบิลตัวละคร — ความต่างของโปรไฟล์คือแหล่งของบทสนทนา

| ช่อง | Mint (ตัวอย่าง) | Tao (ตัวอย่าง) |
|---|---|---|
| Perceive | อ่านคนอื่นเก่ง ; อ่านตัวเองช้า | อ่านตัวเองไว แต่ตีความคนอื่นลบ |
| Understand | รู้ว่าความเหนื่อยของ Tao มาจากการเปรียบเทียบ | สับสนระหว่างเหนื่อยกับขี้เกียจ |
| Manage (self) | reappraise เป็นนิสัย | suppress ("ไม่เป็นไร") แล้วระเบิดทีหลัง `[GrossJohn2003]` |
| Manage (others) | เปิดพื้นที่ ไม่รีบแก้ | ปลอบด้วยการให้คำแนะนำทันที |
| จุดเติบโตใน season | ยอมรับว่าตัวเองก็เหนื่อย | เรียนรู้ identification ก่อนจะเลือกกลยุทธ์ `[Gross2015]` |

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

> แยก **documented** (สิ่งที่แหล่งบันทึก) กับ **analysis** (การวิเคราะห์ของเรา — opinion/craft)

### 7.1 Logic — "1-800-273-8255" (2017, เพลง)
- **Documented:** ในช่วง 34 วันหลังจุดสนใจสูงสุด 3 ครั้ง (ปล่อยเพลง, MTV VMA 2017, Grammy 2018) สายด่วน Lifeline มีสายเกินคาด ~9,915 สาย (+6.9%) และการฆ่าตัวตายต่ำกว่าคาด ~245 ราย (−5.5%) `[Niederkrotenthaler2021_Logic]`
- **Analysis (opinion):** เพลงเล่าความคิดอยากตาย**โดยไม่มีพฤติกรรม** และจบที่การขอความช่วยเหลือ — ตรงกับรูปแบบ Papageno `[Niederkrotenthaler2010]` ; ชื่อเพลงคือเบอร์สายด่วน = ทางออกที่ทำได้ทันที (competence)
- **บทเรียน:** งานสร้างสรรค์แตะความมืดได้ ถ้าโครงเรื่องพาไปสู่ความช่วยเหลือ — แต่เป็นหลักฐาน time-series ไม่ใช่ causal

### 7.2 Papageno effect ในข่าวออสเตรีย (2005)
- **Documented:** บทความประเภท "mastery of crisis" (คนที่ใช้วิธีรับมืออื่นแทนการฆ่าตัวตาย) สัมพันธ์เชิงลบกับอัตราฆ่าตัวตาย ; การรายงานซ้ำและ myth สัมพันธ์เชิงบวก `[Niederkrotenthaler2010]`
- **บทเรียน:** "เรื่องคนผ่านพ้น" คือฟอร์แมตเชิงป้องกันที่มีหลักฐาน — WHO 2023 จึงแนะนำให้รายงาน coping stories `[WHO2023_MediaSuicide]`

### 7.3 Thai Life Insurance — "Unsung Hero" (2014, Ogilvy & Mather Bangkok)
- **Documented (secondary, unverified):** มากกว่า 10 ล้านวิวในสองสัปดาห์, ~17 ล้านในหนึ่งเดือนจาก 232 ประเทศ, ภายหลัง 110 ล้าน+ ; จุดกระแส "try not to cry" `[LoveTheWork_UnsungHero]` — ตัวเลขต่างกันตามวันที่เก็บ ไม่มีข้อมูลยอดขาย
- **Analysis (opinion):** ชายคนหนึ่งทำความดีเล็ก ๆ ทุกวันโดยไม่ได้อะไรตอบแทน → ผลตอบแทนเป็น "อารมณ์" (เห็นคนอื่นมีความสุข) ; แบรนด์ปรากฏท้ายเรื่อง ; ใช้ empathy ต่อ "คนเดียวที่ระบุตัวได้" ในทางที่ไม่ขายความกลัว ; ตรงกับค่านิยมไทยเรื่องน้ำใจ/บุญคุณ (M30)
- **บทเรียนสำหรับ Mint & Tao:** ความอบอุ่นที่ได้มาจากการกระทำเล็ก ๆ ซ้ำ ๆ ทำงานได้ข้ามวัฒนธรรม — แต่ความ "เรียกน้ำตา" เป็นสไตล์ที่ถูกวิจารณ์ในสื่อท้องถิ่นว่า "ทำให้โลกซึ้งแต่ไม่เปลี่ยน" (พบเพียงหัวข้อบทความ Chiang Mai CityLife ในผลค้นหา ไม่ได้อ่าน — ไม่ใช้เป็น source)

### 7.4 Dove — "Real Beauty Sketches" (2013)
- **Documented (brand-side):** นักวาด (ผ่านการฝึกของ FBI) วาดผู้หญิงจากคำบรรยายของตัวเธอเองและจากคนแปลกหน้า ; อ้างว่าเป็นหนังออนไลน์ที่มีคนดูมากที่สุด ; Gold, Creative Effectiveness Lions 2014 `[Dove2013_WARC]`
- **Analysis (opinion):** ทำให้ "ช่องว่างระหว่างการมองตัวเองกับที่คนอื่นเห็น" มองเห็นได้ — เป็น reappraisal ผ่านภาพ ; แต่ถูกวิจารณ์ (ตามผลค้นหา, ไม่ได้อ่านต้นฉบับ) ว่ายังผูกคุณค่าผู้หญิงกับความสวย และแบรนด์ขายผลิตภัณฑ์ความงาม → **กรณี "สำเร็จแต่มีข้อถกเถียง"**
- **บทเรียน:** การแก้ self-doubt ด้วยภาพที่พิสูจน์ได้ ดีกว่าคำ affirmation ลอย ๆ (สอดคล้องกับ `[WoodPerunovicLee2009]` เชิงแนวคิด) ; ต้องระวังว่าทางออกที่เสนอไม่ย้อนกลับไปตอกย้ำมาตรฐานเดิม

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 *13 Reasons Why* (Netflix, 2017) — fiction ที่ละเลย safe messaging
- **What (documented):** อัตราฆ่าตัวตายในวัยรุ่นสหรัฐฯ 10–17 ปีเพิ่มหลังปล่อย (IRR 1.29; เด็กชาย 1.35), ไม่เปลี่ยนในผู้ใหญ่, homicide (ตัวควบคุม) ไม่เปลี่ยน ; ประมาณ ~195 รายเพิ่มเม.ย.–ธ.ค. 2017 `[Bridge2019_13RW]`
- **Why (ตามผู้วิจัย + WHO):** ผู้วิจัยแยกไม่ได้ว่าเป็นเพราะเนื้อหา การไม่ทำตามแนวทางสื่อ หรือปัจจัยอื่น ; WHO ระบุว่าการแสดงวิธีและการทำให้การฆ่าตัวตายดูเป็นทางออกเพิ่มความเสี่ยงเลียนแบบ `[WHO2023_MediaSuicide]`
- **Lesson:** "เป็นแค่เรื่องแต่ง" ไม่ใช่ข้อยกเว้น ; ผู้ชมวัยรุ่น + การแสดงวิธี = เส้นที่ห้ามข้าม

### 8.2 ข่าวฆ่าตัวตายในหนังสือพิมพ์ไทย (2019)
- **What:** 309 ข่าวจาก 3 ฉบับ: ~98.7% บอกวิธีและสถานที่, ~90% ระบุชื่อ, ~40% พาดหัวเร้าอารมณ์, ~29% มีภาพผู้เสียชีวิต, มีข้อมูลขอความช่วยเหลือเพียง ~4% `[Lotrakul2022]`
- **Why (analysis):** บรรทัดฐานข่าวไทยให้ค่าความละเอียดและความเร้าใจ ; ขัดกับหลักฐานว่าการบอกวิธีเพิ่มการตายด้วยวิธีเดียวกัน 30% `[Niederkrotenthaler2020]`
- **Lesson:** อย่าใช้ "สไตล์ข่าวไทย" เป็นต้นแบบสำหรับเนื้อหาสุขภาพจิต — ต้องยึด WHO แม้คนไทยจะ "คุ้น" กับแบบเดิม

### 8.3 Pepsi × Kendall Jenner (2017) — ยืมความเจ็บปวดร่วมมาทำ feel-good
- **What:** ฉากยื่น Pepsi ให้ตำรวจกลางม็อบที่ยิ้มแย้ม ; ถูกวิจารณ์ว่าทำให้การประท้วงเป็นเรื่องเล็ก และพ้องกับภาพ Ieshia Evans ; Pepsi ปกป้องวันอังคาร ถอดวันพุธ: "Clearly we missed the mark, and we apologize" `[Pepsi2017_ABC13]`
- **Why (analysis, opinion):** EI ล้มที่สาขา **understand** — อ่านอารมณ์ของขบวนการ (ความโกรธ ความเศร้า ความเสี่ยงจริง) ผิดเป็น "ความสามัคคีสดใส" ; ข้อความ "unity" ไม่ตรงกับความจริงของสถานการณ์ → เข้าเกณฑ์ trickery ทางอารมณ์ `[SEP_Manipulation]`
- **Lesson:** ก่อนแตะความทุกข์ร่วมของสังคม (น้ำท่วม, การเมือง, โศกนาฏกรรม) ถาม: แบรนด์มีสิทธิ์และมีอะไรให้จริงไหม ถ้าไม่ — ไม่ทำ

### 8.4 Facebook emotional contagion experiment (2012 data, ตีพิมพ์ 2014)
- **What:** ปรับ feed ผู้ใช้เพื่อดูผลต่ออารมณ์ ; ผลเล็กมาก `[Kramer2014]` ; PNAS ออก expression of concern เรื่อง consent/opt-out ; IRB มหาวิทยาลัยถือว่าอยู่นอกขอบเขตเพราะ Facebook ทำเพื่อใช้ภายใน `[Verma2014]`
- **Lesson:** การ "ทดสอบอารมณ์" กับผู้ชมจริงต้องมีขอบเขตจริยธรรม — สตูดิโอ A/B test hook ได้ แต่**ห้ามทดสอบเนื้อหาที่ตั้งใจทำให้คนรู้สึกแย่**

### 8.5 (typical failure — ไม่ใช่กรณีจริงที่บันทึก) "โพสต์ให้กำลังใจที่ทำร้าย"
- **รูปแบบ:** คารูเซล "คุณสุดยอด! อย่ายอมแพ้! คิดบวกเข้าไว้!" + ภาพชีวิตสมบูรณ์แบบ
- **Why:** affirmation เกินจริงย้อนศรกลุ่มที่ต้องการมากที่สุด `[WoodPerunovicLee2009]` ; ภาพชีวิตดีเกิน = upward comparison `[McComb2023]` ; "คิดบวก" = suppression ของประสบการณ์ ซึ่งไม่ได้ผล `[Webb2012]`
- **Lesson:** ความอบอุ่นที่น่าเชื่อ = เฉพาะเจาะจง + ยอมรับความไม่สมบูรณ์ + ก้าวเล็ก

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

### 9.1 ไทย vs ตะวันตก
- **"คำตอบถูก" ของ EI ผูกกับกลุ่ม:** MSCEIT ใช้ consensus scoring ซึ่งโมเดลยอมรับว่าความถูกต้องขึ้นกับบรรทัดฐานกลุ่ม `[GrewalSalovey2005]` → การจัดการอารมณ์ที่ "ฉลาด" ในไทย (เช่น เก็บความไม่พอใจต่อหน้าผู้ใหญ่) อาจได้คะแนนต่างจากตะวันตก — **ไม่มีข้อมูล MSCEIT ไทยในรอบนี้ (gap)**
- **Feedback:** ไทยมี feedback ทางเดียวจากบนลงล่าง ฝ่ายรองเกรงใจไม่ขอ `[Areemit2021_KrengJai]` ; ต่อหน้าคนนิยม "ไม่วิจารณ์" หรือ "วิจารณ์อ้อม" และวิจารณ์ตรงกับรุ่นน้องเท่านั้น `[Thaithae2026]` ; เกรงใจบางครั้งสนับสนุน บางครั้งขัดกับสิ่งที่ Hofstede ทำนาย `[AndrewsChompusri2013]`
- **หน้า (face):** ไม่ใช่สิ่งเดียว — หน้าตา, เกียรติ, ศักดิ์ศรี, ชื่อเสียง, บารมี แยกกันได้ `[Persons2008]` ; Komin จัดให้ ego orientation และ grateful relationship เป็นกลุ่มค่านิยมนำ (search_summary) `[Komin1990]`
- **EI ของผู้มีสถานะสูงสำคัญกว่าในวัฒนธรรม collectivist/power distance สูง** `[Miao2018_LeaderEI]` → ในเรื่องเล่าไทย คนที่ "เปิดพื้นที่ทางอารมณ์" มักต้องเป็นรุ่นพี่/ผู้ใหญ่ **(craft อนุมาน)**
- **Suppression:** ผลเสียทางสังคมน้อยกว่าในคนที่ถือค่านิยมเอเชีย (M02 §2.9) — อย่าเขียน "เก็บอารมณ์" เป็นสิ่งผิดเสมอ

### 9.2 แพลตฟอร์ม
- **IG/FB feed:** อารมณ์ติดต่อผ่าน feed ได้ (ผลเล็กแต่สะสม) `[Kramer2014]` ; upward comparison เป็นภัยหลักของ feed `[McComb2023]` → คารูเซล wellbeing ไม่ควรมีภาพชีวิตสมบูรณ์แบบ
- **Reels/TikTok:** algorithm อาจดันเนื้อหาเรื่องฆ่าตัวตายให้วัยรุ่น — ใช้เกณฑ์เข้มที่สุด (ตาม `[Bridge2019_13RW]` เรื่องความเปราะบางของวัยรุ่น) **(opinion)**

### 9.3 ผู้ชม
- **วัยรุ่น:** กลุ่มเสี่ยงต่อ contagion มากที่สุดในหลักฐานที่อ่าน `[Bridge2019_13RW]`
- **ผู้สูงวัย/วัยกลางคน (ลูกค้าสายตายาว):** ความเหงา-การแยกตัวเป็นปัจจัยเสี่ยงจริง ; ผลต่อการตายสูงกว่าในกลุ่มอายุเฉลี่ย <65 `[HoltLunstad2015]` → อย่าใช้ "อยู่คนเดียว" เป็นมุกในคอนเทนต์ผู้สูงวัย
- **คนที่ self-esteem ต่ำ:** affirmation ใหญ่ย้อนศร `[WoodPerunovicLee2009]`

### 9.4 ประเภทงาน (genre)
- **Comedy:** ใช้ความเหนื่อยเป็นมุกได้ แต่ไม่ใช้ความคิดทำร้ายตัวเองเป็นมุก (WHO: ไม่ทำให้ดูปกติ/เป็นทางออก) `[WHO2023_MediaSuicide]`
- **โฆษณา:** การดึงอารมณ์ไม่ผิดในตัว (SEP) แต่ต้องตรงกับความจริงของสินค้า `[SEP_Manipulation]`
- **Drama/story clip:** แสดงความมืดได้ ถ้าโครงเรื่องพาไปสู่การรับมือ (Papageno) `[Niederkrotenthaler2010]`

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| Domain | เชื่อมอย่างไร |
|---|---|
| 01 Creative thinking & cognitive science | emotion "use/facilitate" branch: อารมณ์ต่างกันเหมาะกับขั้นต่างกันของงาน — เป็นสมมติฐานของโมเดล ไม่ได้ตรวจหลักฐานรอบนี้ ; คู่กับงาน creativity ใน domain 01 |
| 03 Aesthetic intelligence & taste | การวิจารณ์งานแบบไม่ทำร้ายตัวตนช่วยให้ทีมกล้าทดลองรสนิยมใหม่ `[KlugerDeNisi1996]` |
| 04 Visual language | ภาพ "หลังบ้าน" (ไม่สมบูรณ์แบบ) แทนภาพ highlight ลด upward comparison `[McComb2023]` ; ภาพในเนื้อหาสุขภาพจิตห้ามแสดงวิธี/สถานที่ `[WHO2023_MediaSuicide]` |
| 05 Semiotics & metaphor | อุปมาความเหนื่อย (แบตหมด, ฝนตก) ต้องไม่สื่อว่าความตายคือการพัก — เกณฑ์ "ไม่ทำให้เป็นทางออก" |
| 06 Character psychology | ใส่ "โปรไฟล์ EI" ให้ตัวละคร: Mint แข็งที่ understand/manage, Tao อ่อนที่ identification (Gross extended model) → ความต่างสร้างบทสนทนา `[Gross2015]` `[MacCann2020]` |
| 07 Worldbuilding & continuity | อาการ/อารมณ์ของตัวละครต้องต่อเนื่องข้ามตอน ; การหายเหงาแบบทันทีขัดกับหลักฐานว่าผลจริงเล็ก `[Masi2011]` |
| 08 Philosophy, literature & poetry | จริยธรรม manipulation `[SEP_Manipulation]` ; ข้อถกเถียง Bloom/Västfjäll เรื่อง empathy เป็นปรัชญาศีลธรรมโดยตรง |
| 09 Cultural studies | เกรงใจ, หน้า, ลำดับชั้น ใน feedback `[Areemit2021_KrengJai]` `[Thaithae2026]` `[Persons2008]` ; in-group advantage ในการอ่านอารมณ์ `[ElfenbeinAmbady2002]` |
| 10 Psychoacoustics | น้ำเสียง TTS ในจังหวะ acknowledge vs เชียร์ ; ผู้ฟังอ่านอารมณ์จากเสียงด้วย (perceive branch) |
| 11 Consumer psychology & marketing | dark patterns `[Mathur2019]` ; emotional appropriation (Pepsi) ; ความเกรงใจของลูกค้า (M30) |
| 12 Independent creative criticism | หลัก feedback ที่ task-focused, มีทางแก้ ใช้กับการวิจารณ์งาน `[HattieTimperley2007]` |
| 13 QA & evaluation | checklist §13 + rubric §14 เป็น gate ก่อนเผยแพร่เนื้อหาอารมณ์อ่อนไหว |
| 14 Knowledge management | บันทึกผล "(our test)" เช่น affirmation แบบจริงบางส่วน vs เต็ม ใน `creative-intelligence/memory` |
| 15 Workflow automation | ทำ lint อัตโนมัติ: คำเสี่ยง (วิธีการ, "ฆ่าตัวตายสำเร็จ"), affirmation สุดโต่ง, fake scarcity — เตือนก่อน render |

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 ตาราง if/then

| ถ้า… | ให้… | เหตุผล |
|---|---|---|
| ผู้ชมเป้าหมายกำลังเหนื่อย/ท้อ | acknowledge → legitimise → reappraise เบา ๆ → ก้าวเล็ก | `[HighDillard2012]` `[Webb2012]` `[RyanDeci2000]` |
| ผู้ชมสงสัยตัวเอง (self-doubt) | หลักฐานเล็กที่เฉพาะเจาะจง ไม่ใช่ affirmation ใหญ่ | `[WoodPerunovicLee2009]` |
| หัวข้อเปรียบเทียบกับคนอื่น | แสดง "หลังบ้าน" ของคนที่ดูดี ; อย่าปิดท้ายด้วย highlight | `[McComb2023]` |
| หัวข้อเหงา | เปลี่ยนการตีความเรื่องคนอื่น + การเชื่อมต่อเล็ก ๆ | `[Masi2011]` |
| เนื้อหาแตะความคิดอยากตาย/ทำร้ายตัวเอง | ใช้ WHO Dos/Don'ts ทั้งหมด + ใส่ช่องทางช่วยเหลือที่ตรวจแล้ว + ให้คนที่สองตรวจ | `[WHO2023_MediaSuicide]` |
| ต้องการแสดงวิธี/สถานที่ "เพื่อความสมจริง" | **ไม่ทำ** | `[Niederkrotenthaler2020]` |
| เรื่องอ้างอิงคนดัง/ข่าวจริงที่เสียชีวิต | ไม่ทำในคอนเทนต์สตูดิโอ ; ถ้าจำเป็น เน้นชีวิตและผลงาน ไม่เดาสาเหตุ | `[WHO2023_MediaSuicide]` |
| อยากใช้โศกนาฏกรรม/ความเจ็บปวดของสังคมในโฆษณา | ถามว่าแบรนด์มีสิทธิ์และให้อะไรจริงไหม ; ถ้าไม่ — ไม่ทำ | `[Pepsi2017_ABC13]` `[SEP_Manipulation]` |
| อยากใช้ความกลัว/ความไม่มั่นใจขายของ | ใช้ได้เฉพาะเมื่อตรงกับความเสี่ยงจริง + มีทางออกจริง (ดู fear ใน M01) ; ห้ามสร้าง insecurity เรื่องรูปลักษณ์ | `[SEP_Manipulation]` |
| อยากใช้ "เหลือน้อย/หมดเขต" | ใช้เมื่อเป็นความจริงเท่านั้น | `[Mathur2019]` |
| ต้องให้ feedback กับรุ่นพี่/ลูกค้าไทย | อ้อม + เน้นงาน + เสนอทางเลือก ; ในที่ส่วนตัว | `[Thaithae2026]` `[Areemit2021_KrengJai]` |
| ต้องให้ feedback กับรุ่นน้อง/ฟรีแลนซ์ | เปิดประตูให้ถามก่อน ; บอกตรงเรื่องงาน + ทางแก้ + ยอมรับความพยายาม | `[Areemit2021_KrengJai]` `[KlugerDeNisi1996]` |
| ลูกค้าบอก "ขอให้ EQ สูง ๆ" / "ทีมต้องมี EQ" | แปลงเป็นทักษะย่อยที่สังเกตได้ (อ่าน, เข้าใจ, จัดการ) | `[Locke2005]` `[MayerCarusoSalovey2016]` |
| จะใช้แบบทดสอบ "EQ" ออนไลน์เป็นคอนเทนต์ | ระบุว่าเพื่อความบันเทิง ; ไม่อ้างว่าวัดความสามารถ | `[GrewalSalovey2005]` |
| อยากทำให้ผู้ชม "ร้องไห้" (tearjerker) | ต้องมีการคลายท้ายเรื่อง (ความหวัง/ความอบอุ่น) และไม่ใช้ความทุกข์จริงของคนจริงโดยไม่ยินยอม | `[Zaki2014]` (approach motives) **(craft)** |

### 11.2 Safe-messaging triage (สำหรับทุกชิ้นที่แตะสุขภาพจิต)
```
มีคำ/ภาพเกี่ยวกับการตาย/ทำร้ายตัวเอง?
 ├─ ไม่มี → ตรวจ wellbeing checklist (§13 ข้อ 7–12) → ผ่าน
 └─ มี → (1) ตัดวิธีการ/สถานที่/โน้ตลา  (2) ไม่ให้เหตุผลเดียว  (3) ไม่ทำให้ดูเป็นทางออก/สวยงาม
         (4) แสดงการรับมือ/ขอความช่วยเหลือ  (5) ใส่ช่องทางช่วยเหลือที่ตรวจล่าสุด
         (6) ให้คนที่สองตรวจ  (7) ผู้ชมเป้าหมายเป็นวัยรุ่น? → ลดระดับลงหรือไม่ทำ
```

---

## 12. แบบฝึกหัด (Exercises)

1. **(ง่าย) แยกสามสาย:** ให้ข้อความ 6 ข้อ (เช่น "ฉันเข้าใจความรู้สึกคนอื่นได้ดี", ข้อสอบเลือกอารมณ์ของ Tom, "ฉันมองโลกในแง่ดี") — จัดเข้า ability / trait / mixed
   *คำตอบที่ดี:* แยกได้ถูกและอธิบายว่าทำไม self-report วัดความเชื่อ ไม่ใช่ทักษะ `[GrewalSalovey2005]` `[PetridesFurnham2001]`
2. **(ง่าย) แก้ประโยคปลอบ:** เขียนใหม่ 5 ประโยค ("อย่าคิดมาก", "คนอื่นแย่กว่านี้", "เธอเก่งที่สุด", "ยิ้มไว้", "เดี๋ยวก็หาย")
   *ดี:* ทุกประโยคมี acknowledge หรือ legitimise และไม่มีการเปรียบเทียบ/ปฏิเสธ `[HighDillard2012]`
3. **(กลาง) ออกแบบคารูเซล Mint & Tao 7 สไลด์** หัวข้อ "เลื่อนดูชีวิตคนอื่นตอนตีหนึ่ง"
   *ดี:* มีจุด reappraisal ชัด, มี "หลังบ้าน", จบด้วย relatedness + ก้าวเล็ก, ไม่มีภาพชีวิตสมบูรณ์แบบในสไลด์จบ `[McComb2023]` `[RyanDeci2000]`
4. **(กลาง) Feedback ข้ามลำดับชั้น:** เขียน feedback เรื่อง thumbnail ที่ไม่ดีถึง (ก) ลูกค้าอาวุโส (ข) ฟรีแลนซ์รุ่นน้อง เป็นภาษาไทย
   *ดี:* (ก) อ้อม เน้นเป้าหมายร่วม มีทางเลือก ; (ข) ตรงเรื่องงาน มีทางแก้ ยอมรับความพยายาม ; ทั้งสองไม่พูดถึงตัวตน `[Thaithae2026]` `[KlugerDeNisi1996]`
5. **(กลาง) Audit โพสต์ขายแว่น 3 แบบ** ด้วยเกณฑ์ SEP (ตรงความจริง? ผู้ชมยอมรับกลไก?)
   *ดี:* ระบุจุดที่เป็น trickery/pressure และเสนอเวอร์ชันที่ซื่อตรงโดยคงอารมณ์ไว้ `[SEP_Manipulation]` `[Mathur2019]`
6. **(ยาก) Safe-messaging rewrite:** ให้บทคลิปสั้นที่ตัวละครพูดถึงอยากหายไป พร้อมรายละเอียดวิธี — เขียนใหม่ให้ผ่าน WHO
   *ดี:* ไม่มีวิธี/สถานที่, มีการขอความช่วยเหลือและการผ่านพ้น, ไม่มีเหตุผลเดียว, มีช่องทางช่วยเหลือ, ยังมีความจริงทางอารมณ์ (ไม่กลายเป็นโฆษณาสุขภาพจิตแห้ง ๆ) `[WHO2023_MediaSuicide]` `[Niederkrotenthaler2010]`
7. **(ยาก) Debate:** เขียนครึ่งหน้า "ควรใช้เรื่องคนเดียวที่ระบุตัวได้ในแคมเปญการกุศลไหม" อ้างทั้ง Bloom และ Västfjäll
   *ดี:* ยอมรับ spotlight bias, เสนอวิธีจับคู่เรื่องคนหนึ่งคนกับข้อมูลขนาดจริง, ไม่สรุปเกินหลักฐาน `[Bloom2017_TICS]` `[Vastfjall2017]` `[Zaki2014]`
8. **(ยาก) Claim check:** ลูกค้าส่งสไลด์ "EQ สำคัญกว่า IQ 2 เท่า" — เขียนคำแนะนำแก้
   *ดี:* ใช้ตัวเลขจริง (r .24–.30 ; ρ .20 ; EI อันดับ 3 รอง IQ และ conscientiousness) และเสนอข้อความที่ถูกต้องแต่ยังน่าสนใจ `[OBoyle2011]` `[MacCann2020]`

---

## 13. Checklist (ก่อนส่งงานที่มีเนื้อหาอารมณ์)

**Safe messaging (ข้อ 1–6 ต้องผ่านทุกข้อถ้าแตะเรื่องตาย/ทำร้ายตัวเอง)**
1. [ ] ไม่มีวิธีการ สถานที่ หรือโน้ตลา ทั้งในภาพ เสียง ข้อความ caption `[WHO2023_MediaSuicide]`
2. [ ] ไม่อธิบายสาเหตุเดียว และไม่ทำให้การตายดูเป็นทางออกหรือสวยงาม
3. [ ] มีการรับมือ/ขอความช่วยเหลือ/การผ่านพ้นในเรื่อง (Papageno) `[Niederkrotenthaler2010]`
4. [ ] มีช่องทางช่วยเหลือที่ตรวจความถูกต้องในวันที่เผยแพร่
5. [ ] พาดหัว/hook ไม่ใช้คำ "ฆ่าตัวตาย" เป็นตัวเรียกความสนใจ
6. [ ] มีคนที่สองตรวจ ; ถ้าผู้ชมหลักเป็นวัยรุ่น ตรวจเข้มขึ้น `[Bridge2019_13RW]`

**Wellbeing & comfort**
7. [ ] ประโยคปลอบมี acknowledge/legitimise ก่อนเสนอทางออก `[HighDillard2012]`
8. [ ] ไม่มี affirmation ใหญ่เกินจริงกับตัวละคร/ผู้ชมที่กำลังสงสัยตัวเอง `[WoodPerunovicLee2009]`
9. [ ] ไม่ปิดท้ายด้วยภาพ/ชีวิตสมบูรณ์แบบที่ชวนเปรียบเทียบ `[McComb2023]`
10. [ ] ทางออกเป็นก้าวเล็กที่เลือกได้ (ไม่ใช่ "ต้อง") `[RyanDeci2000]`
11. [ ] ไม่ใช้ความเหงา/ความเศร้าเป็นมุกหรือเป็นตัวขาย `[HoltLunstad2015]`
12. [ ] จุดหักของเรื่องเป็นการเปลี่ยนการตีความที่น่าเชื่อ ไม่ใช่ปาฏิหาริย์ `[Webb2012]` `[Masi2011]`

**Ethics & culture**
13. [ ] อารมณ์ที่กระตุ้นตรงกับความจริงของสินค้า/สถานการณ์ และผู้ชมจะยอมรับได้ถ้าเห็นกลไก `[SEP_Manipulation]`
14. [ ] ไม่มี fake scarcity / countdown ปลอม / confirmshaming `[Mathur2019]`
15. [ ] ไม่ยืมความเจ็บปวดร่วมของสังคมที่แบรนด์ไม่มีส่วนเกี่ยวข้อง `[Pepsi2017_ABC13]`
16. [ ] ความเกรงใจ/การเก็บอารมณ์แบบไทยไม่ถูกเขียนเป็นข้อบกพร่องอัตโนมัติ (M02, M30)
17. [ ] ข้ออ้างเรื่อง EQ/EI ในข้อความใช้ขนาดผลจริง ไม่ใช่ "EQ สำคัญกว่า IQ" `[MacCann2020]`
18. [ ] Feedback ที่ส่งให้ทีม/ลูกค้าพูดถึงงานและมีทางแก้ `[KlugerDeNisi1996]`

---

## 14. Evaluation Rubric

**วิธีให้คะแนน:** 6 เกณฑ์ × 1–4 คะแนน (รวม 24) ; เกณฑ์ E (Safety) นับ **×2** สำหรับเนื้อหาที่แตะสุขภาพจิต (รวม 28) ; ผ่าน ≥ 75% และไม่มี critical failure

| เกณฑ์ | 1 (ไม่ผ่าน) | 2 (อ่อน) | 3 (ดี) | 4 (ยอดเยี่ยม) |
|---|---|---|---|---|
| **A. Emotional accuracy (perceive/understand)** | อารมณ์ของผู้ชม/ตัวละครผิดหรือคลุมเครือ ("รู้สึกไม่ดี") | ระบุได้แต่กว้าง | อารมณ์เฉพาะเจาะจงและสาเหตุสมเหตุสมผล | อารมณ์ผสม/การเปลี่ยนผ่านอารมณ์ชัด และตรงกับบริบทไทย |
| **B. Comfort quality (person-centeredness)** | ปฏิเสธ/ตัดสิน/เปรียบเทียบ | ปลอบแต่รีบแก้ปัญหา | acknowledge + legitimise + ทางออก | + reappraisal เบา ๆ ที่น่าเชื่อ + ก้าวเล็กที่เลือกได้ + relatedness |
| **C. Motivation design (SDT)** | สั่ง/กดดัน/ทำให้รู้สึกผิด | ให้กำลังใจทั่วไป | แตะ 1–2 needs | autonomy + competence + relatedness ครบโดยไม่ยัดเยียด |
| **D. Cultural fit (Thai)** | ขัดค่านิยม/ทำให้เสียหน้า/เขียนเกรงใจเป็นความผิด | ไม่คำนึงลำดับชั้น | ลำดับชั้นและความเกรงใจถูกต้อง | ใช้ความเกรงใจ/หน้า/บุญคุณเป็นกลไกเรื่องอย่างลึกซึ้งและให้เกียรติ |
| **E. Safety (safe messaging & wellbeing)** | มีวิธี/สถานที่/การทำให้ดูเป็นทางออก (= critical) | ไม่มีอันตรายชัดแต่ไม่มีช่องทางช่วยเหลือ/การรับมือ | ผ่าน WHO Dos/Don'ts | ผ่าน + มีเรื่องการผ่านพ้นที่มีชีวิต ไม่แห้ง |
| **F. Ethical influence** | trickery/pressure ชัด (fake scarcity, insecurity) | อารมณ์เกินความจริงเล็กน้อย | อารมณ์ตรงความจริง | อารมณ์ตรงความจริง + โปร่งใส + ผู้ชมได้ประโยชน์แม้ไม่ซื้อ |

**Critical failures (ตกทันทีไม่ว่าคะแนนรวม):**
- แสดง/อธิบายวิธีการหรือสถานที่ทำร้ายตัวเอง หรือโน้ตลา
- ทำให้การฆ่าตัวตายดูเป็นทางออก วีรกรรม หรือความสวยงาม
- ใช้ความทุกข์ของบุคคลจริงโดยไม่ยินยอม หรือเดาสาเหตุการเสียชีวิตของคนจริง
- Fake scarcity / รีวิวปลอม / สร้างความไม่มั่นใจเรื่องรูปลักษณ์เพื่อขาย
- อ้างตัวเลขหรือข้ออ้างทางจิตวิทยาที่ไม่มีแหล่ง (เช่น "EQ สำคัญกว่า IQ 80%")

---

## 15. แหล่งอ้างอิง (References)

| Key | Citation | URL | Access |
|---|---|---|---|
| SaloveyMayer1990 | Salovey, P., & Mayer, J. D. (1990). Emotional intelligence. *Imagination, Cognition and Personality*, 9(3). | https://doi.org/10.2190/DUGG-P24E-52WK-6CDG | abstract |
| MayerEtAl2003_MSCEIT | Mayer, J. D., Salovey, P., Caruso, D. R., & Sitarenios, G. (2003). Measuring emotional intelligence with the MSCEIT V2.0. *Emotion*, 3(1). | https://doi.org/10.1037/1528-3542.3.1.97 | abstract |
| Mayer2008_EI | Mayer, J. D., Salovey, P., & Caruso, D. R. (2008). Emotional intelligence: New ability or eclectic traits? *American Psychologist*, 63(6). | https://doi.org/10.1037/0003-066X.63.6.503 | abstract |
| MayerCarusoSalovey2016 | Mayer, J. D., Caruso, D. R., & Salovey, P. (2016). The ability model of emotional intelligence: Principles and updates. *Emotion Review*. | https://doi.org/10.1177/1754073916639667 | abstract |
| GrewalSalovey2005 | Grewal, D., & Salovey, P. (2005). Feeling smart: The science of emotional intelligence. *American Scientist*, 93(4), 330–339. | https://local.psy.miami.edu/faculty/dmessinger/c_c/rsrcs/rdgs/emot/salovey.emot_intell.amersci.05.pdf | full_text |
| KihlstromCantor2011 | Kihlstrom, J. F., & Cantor, N. (2011). Social intelligence. In R. J. Sternberg & S. B. Kaufman (Eds.), *The Cambridge Handbook of Intelligence* (ch. 28). | https://www.ocf.berkeley.edu/~jfkihlstrom/PDFs/2010s/2011/KihlstromCantor_SocialIntelligence_3e_2011.pdf | full_text |
| Goleman1995 | Goleman, D. (1995). *Emotional Intelligence: Why It Can Matter More Than IQ*. Bantam. | — | bibliographic |
| BarOn2006 | Bar-On, R. (2006). The Bar-On model of emotional-social intelligence (ESI). *Psicothema*, 18(Suppl.), 13–25. | https://www.psicothema.com/pi?pii=3271 | full_text |
| PetridesFurnham2001 | Petrides, K. V., & Furnham, A. (2001). Trait emotional intelligence: Psychometric investigation with reference to established trait taxonomies. *European Journal of Personality*, 15. | https://doi.org/10.1002/per.416 | abstract |
| Locke2005 | Locke, E. A. (2005). Why emotional intelligence is an invalid concept. *Journal of Organizational Behavior*, 26. | https://doi.org/10.1002/job.318 | abstract |
| JosephNewman2010 | Joseph, D. L., & Newman, D. A. (2010). Emotional intelligence: An integrative meta-analysis and cascading model. *Journal of Applied Psychology*, 95(1). | https://doi.org/10.1037/a0017286 | abstract |
| OBoyle2011 | O'Boyle, E. H., Humphrey, R. H., Pollack, J. M., Hawver, T. H., & Story, P. A. (2011). The relation between emotional intelligence and job performance: A meta-analysis. *Journal of Organizational Behavior*, 32. | https://doi.org/10.1002/job.714 | abstract |
| MacCann2020 | MacCann, C., Jiang, Y., Brown, L. E. R., Double, K. S., Bucich, M., & Minbashian, A. (2020). Emotional intelligence predicts academic performance: A meta-analysis. *Psychological Bulletin*, 146(2). | https://doi.org/10.1037/bul0000219 | full_text |
| Miao2018_LeaderEI | Miao, C., Humphrey, R. H., & Qian, S. (2018). A cross-cultural meta-analysis of how leader emotional intelligence influences subordinate task performance and OCB. *Journal of World Business*. | https://doi.org/10.1016/j.jwb.2018.01.003 | abstract |
| Bloom2017_TICS | Bloom, P. (2017). Empathy and its discontents. *Trends in Cognitive Sciences*, 21(1). | https://doi.org/10.1016/j.tics.2016.11.004 | bibliographic |
| Bloom2016_AgainstEmpathy | Bloom, P. (2016). *Against Empathy: The Case for Rational Compassion*. Ecco. | https://www.publishersweekly.com/9780062339331 | search_summary |
| Vastfjall2017 | Västfjäll, D., Erlandsson, A., Slovic, P., & Tinghög, G. (2017). Commentary: Empathy and its discontents. *Frontiers in Psychology*, 8:542. | https://doi.org/10.3389/fpsyg.2017.00542 | full_text |
| Zaki2014 | Zaki, J. (2014). Empathy: A motivated account. *Psychological Bulletin*, 140(6). | https://doi.org/10.1037/a0037679 | abstract |
| Cuff2016 | Cuff, B. M. P., Brown, S. J., Taylor, L., & Howat, D. J. (2016). Empathy: A review of the concept. *Emotion Review*, 8(2). | https://doi.org/10.1177/1754073914558466 | abstract |
| ElfenbeinAmbady2002 | Elfenbein, H. A., & Ambady, N. (2002). On the universality and cultural specificity of emotion recognition: A meta-analysis. *Psychological Bulletin*, 128(2). | https://doi.org/10.1037/0033-2909.128.2.203 | abstract |
| Gross2015 | Gross, J. J. (2015). Emotion regulation: Current status and future prospects. *Psychological Inquiry*, 26(1). | https://doi.org/10.1080/1047840X.2014.940781 | abstract |
| GrossJohn2003 | Gross, J. J., & John, O. P. (2003). Individual differences in two emotion regulation processes. *JPSP*, 85(2). | https://doi.org/10.1037/0022-3514.85.2.348 | abstract |
| Webb2012 | Webb, T. L., Miles, E., & Sheeran, P. (2012). Dealing with feeling: A meta-analysis of the effectiveness of strategies derived from the process model of emotion regulation. *Psychological Bulletin*, 138(4). | https://doi.org/10.1037/a0027600 | abstract |
| RyanDeci2000 | Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. *American Psychologist*, 55(1), 68–78. | https://doi.org/10.1037/0003-066X.55.1.68 | abstract |
| WoodPerunovicLee2009 | Wood, J. V., Perunovic, W. Q. E., & Lee, J. W. (2009). Positive self-statements: Power for some, peril for others. *Psychological Science*, 20(7). | https://doi.org/10.1111/j.1467-9280.2009.02370.x | abstract |
| MacBeth2012 | MacBeth, A., & Gumley, A. (2012). Exploring compassion: A meta-analysis of the association between self-compassion and psychopathology. *Clinical Psychology Review*, 32(6), 545–552. | https://doi.org/10.1016/j.cpr.2012.06.003 | abstract |
| Masi2011 | Masi, C. M., Chen, H.-Y., Hawkley, L. C., & Cacioppo, J. T. (2011). A meta-analysis of interventions to reduce loneliness. *Personality and Social Psychology Review*, 15(3). | https://doi.org/10.1177/1088868310377394 | full_text |
| HoltLunstad2015 | Holt-Lunstad, J., Smith, T. B., Baker, M., Harris, T., & Stephenson, D. (2015). Loneliness and social isolation as risk factors for mortality. *Perspectives on Psychological Science*, 10(2). | https://doi.org/10.1177/1745691614568352 | abstract |
| McComb2023 | McComb, C., Vanman, E. J., & Tobin, S. J. (2023). A meta-analysis of the effects of social media exposure to upward comparison targets on self-evaluations and emotions. *Media Psychology*. | https://doi.org/10.1080/15213269.2023.2180647 | abstract |
| KlugerDeNisi1996 | Kluger, A. N., & DeNisi, A. (1996). The effects of feedback interventions on performance. *Psychological Bulletin*, 119(2). | https://doi.org/10.1037/0033-2909.119.2.254 | abstract |
| HattieTimperley2007 | Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of Educational Research*, 77(1). | https://doi.org/10.3102/003465430298487 | abstract |
| HighDillard2012 | High, A. C., & Dillard, J. P. (2012). A review and meta-analysis of person-centered messages and social support outcomes. *Communication Studies*, 63(1), 99–118. | https://doi.org/10.1080/10510974.2011.598208 | abstract |
| Areemit2021_KrengJai | Areemit, R. S., Cooper, C. M., Wirasorn, K., Paopongsawan, P., Panthongviriyakul, C., & Ramani, S. (2021). Hierarchy, "kreng jai" and feedback. *Teaching and Learning in Medicine*, 33(3). | https://doi.org/10.1080/10401334.2020.1813584 | abstract |
| Thaithae2026 | ศิรวัตร ไทยแท้ (2569/2026). การวิจารณ์ในที่ทำงาน: การวิเคราะห์เชิงวัจนปฏิบัติศาสตร์สังคม [Criticism in the workplace: A sociopragmatic analysis]. *วารสารศิลปศาสตร์ ม.ธรรมศาสตร์*, 26(1). | https://so03.tci-thaijo.org/index.php/liberalarts/article/download/291779/193412/1381666 | abstract |
| AndrewsChompusri2013 | Andrews, T. G., & Chompusri, N. (2013). Understanding organizational practice adoption at the Thai subsidiary corporation. *Management International Review*, 53(1), 61–82. | https://doi.org/10.1007/s11575-012-0163-y | abstract |
| Persons2008 | Persons, L. S. (2008). The anatomy of Thai face. *Manusya, Journal of Humanities*, 11(1), 53–75. | https://digital.car.chula.ac.th/manusya/vol11/iss1/5 | abstract |
| Komin1990 | Komin, S. (1990/1991). *Psychology of the Thai People: Values and Behavioral Patterns*. NIDA. | https://search.worldcat.org/oclc/35221306 | search_summary |
| WHO2023_MediaSuicide | WHO & IASP (2023). *Preventing suicide: a resource for media professionals, update 2023*. ISBN 9789240076846. (อ่านผ่านหน้าเปิดตัวของ WHO และสรุป Dos/Don'ts ของ HKU CSRP https://csrp.hku.hk/responsible-reporting-on-suicide/) | https://www.who.int/publications/i/item/9789240076846 | publisher_page |
| Niederkrotenthaler2010 | Niederkrotenthaler, T., Voracek, M., Herberth, A., Till, B., Strauss, M., et al. (2010). Role of media reports in completed and prevented suicide: Werther v. Papageno effects. *British Journal of Psychiatry*, 197(3). | https://doi.org/10.1192/bjp.bp.109.074633 | abstract |
| Niederkrotenthaler2020 | Niederkrotenthaler, T., Braun, M., Pirkis, J., Till, B., Stack, S., et al. (2020). Association between suicide reporting in the media and suicide: Systematic review and meta-analysis. *BMJ*, 368, m575. | https://doi.org/10.1136/bmj.m575 | full_text |
| Niederkrotenthaler2021_Logic | Niederkrotenthaler, T., Tran, U. S., Gould, M., Sinyor, M., Sumner, S., et al. (2021). Association of Logic's hip hop song "1-800-273-8255" with Lifeline calls and suicides in the United States. *BMJ*, 375. | https://doi.org/10.1136/bmj-2021-067726 | abstract |
| Bridge2019_13RW | Bridge, J. A., Greenhouse, J. B., Ruch, D., Stevens, J., Ackerman, J., et al. (2019). Association between the release of Netflix's *13 Reasons Why* and suicide rates in the United States. *JAACAP*. | https://doi.org/10.1016/j.jaac.2019.04.020 | full_text |
| Lotrakul2022 | Lotrakul, M., & Suwannakan, P. (2022). Newspaper reporting of suicides in Thailand: Compliance with WHO media guidelines. *Journal of the Psychiatric Association of Thailand*, 67(2), 203–211. | https://he01.tci-thaijo.org/index.php/JPAT/article/view/253509 | abstract |
| SEP_Manipulation | The Ethics of Manipulation. *Stanford Encyclopedia of Philosophy* (first published 2018; rev. 31 Mar 2026). ผู้เขียนตามรายชื่อ SEP: Robert Noggle (ไม่ได้ยืนยันจากข้อความที่ดึงมา) | https://plato.stanford.edu/entries/ethics-manipulation/ | full_text |
| Mathur2019 | Mathur, A., Acar, G., Friedman, M. J., Lucherini, E., Mayer, J., Chetty, M., & Narayanan, A. (2019). Dark patterns at scale. *Proc. ACM HCI*, 3(CSCW). | https://doi.org/10.1145/3359183 | abstract |
| Kramer2014 | Kramer, A. D. I., Guillory, J. E., & Hancock, J. T. (2014). Experimental evidence of massive-scale emotional contagion through social networks. *PNAS*, 111(24), 8788–8790. | https://doi.org/10.1073/pnas.1320040111 | abstract |
| Verma2014 | Verma, I. M. (2014). Editorial expression of concern: Experimental evidence of massive-scale emotional contagion through social networks. *PNAS*, 111(29). | https://doi.org/10.1073/pnas.1412469111 | full_text |
| LoveTheWork_UnsungHero | Thai Life Insurance / Ogilvy & Mather Bangkok (2014). *Unsung Hero*. Cannes Lions case page + secondary coverage (The Drum 2022, Selfstorming). | https://lovethework.com/work-awards/campaigns/unsung-hero-222662 | search_summary |
| Dove2013_WARC | WARC (2014). Dove: Real Beauty Sketches — Cannes Creative Effectiveness Lions, Gold. | https://www.warc.com/en/article/dove%3A-real-beauty-sketches-eec8d862d8a04228a314674f5137d0a7 | publisher_page |
| Pepsi2017_ABC13 | Associated Press via ABC13 (2017, 5 Apr). Pepsi pulls widely mocked ad featuring Kendall Jenner. | https://abc13.com/post/pepsi-pulls-widely-mocked-kendall-jenner-ad/1838657/ | full_text |

**เข้าไม่ถึง / ยังไม่ยืนยัน:** PDF ฉบับเต็มของ WHO 2023 (403/404 ทั้ง WHO IRIS และ HSE) ; Mayer 2008 author PDF (403) ; Bloom TICS (ไม่มี abstract) และหนังสือ Bloom/Goleman/Komin (ไม่ได้อ่าน) ; ตัวเลขวิวของ Unsung Hero (secondary เท่านั้น) ; คำวิจารณ์ Dove (search summary เท่านั้น — ไม่ได้ใส่เป็น source) ; แนวทางสื่อของกรมสุขภาพจิตไทยและแบบประเมิน EQ ทางการ (ไม่พบเอกสารทางการ) ; เบอร์สายด่วนสุขภาพจิตไทยปัจจุบัน (ไม่ได้ยืนยัน — ต้องตรวจก่อนใช้) ; meta-analysis การฝึก EI และ meta-analysis reactance (Rains 2013 พบแค่ citation)
