# M41 — Critical Thinking & Problem Solving (การคิดเชิงวิพากษ์และการแก้ปัญหา)

> ใช้ตอนตรวจงานก่อนส่ง (ภาพ/คลิป/แคปชั่นที่มีข้อเท็จจริงเรื่องสายตา) ตอนวิเคราะห์ว่าทำไมคลิปไม่ปัง และตอนเลือกทางเลือก
> แหล่งอ้างอิงอยู่ใน `sources.json` (key ในวงเล็บเหลี่ยม) · ค้นคว้า 2026-11-25
> ตัวที่ใช้งานจริงคือ **[`PRE_DELIVERY_CHECK.md`](PRE_DELIVERY_CHECK.md)**
> ป้าย: **EVIDENCE** = มาจากงานวิจัย · **CRAFT** = แนวปฏิบัติ/ตรรกะของงาน ไม่ได้ทดสอบเชิงวิทยาศาสตร์

## 1. Scope & status

**ครอบคลุม:** นิยาม critical thinking (SEP), heuristics & biases (confirmation, anchoring, availability, overconfidence, framing, survivorship, recency) พร้อมสถานะ replication, debiasing (consider-the-opposite, training ที่มี feedback), pre-mortem / prospective hindsight, inside vs outside view, probabilistic thinking, root cause analysis และจุดอ่อนของ 5 Whys, correlation vs causation (Hill), fallacies
**ไม่ลงลึก / อยู่โมดูลอื่น:** negativity bias, loss aversion, peak-end, replication crisis ภาพรวม (OSC2015, Many Labs 2, ego depletion, priming) → `../psychology/README.md` §2.11, §3 · cognitive load / processing fluency / truth effect → `../cognitive-science/README.md`
**ไม่พบหลักฐานวิจัยในรอบนี้ (ถือเป็น CRAFT):** MECE, decision matrix แบบถ่วงน้ำหนัก, fishbone/Ishikawa, first-principles, second-order thinking, inversion, scenario planning — เป็นเครื่องมือที่สมเหตุสมผลเชิงตรรกะ แต่ไม่มีงานทดลองที่เราอ่าน
**สถานะหลักฐาน:** 20 แหล่ง (S 1, A 15, B 3, D 1); full text 1 (SEP), abstract 12, search_summary 5, bibliographic 2 — ส่วนใหญ่อ่านได้แค่ abstract จึงไม่ยกตัวเลขที่ไม่อยู่ใน abstract

## 2. Core concepts

### 2.1 Critical thinking คืออะไร
- **คืออะไร:** "careful goal-directed thinking" — ความสามารถ (ตั้งคำถามให้ชัด, อนุมาน, ทดสอบสมมติฐาน, ประเมินความน่าเชื่อถือของแหล่ง, สร้างคำอธิบายทางเลือก) + นิสัย (เปิดใจ, ชะลอการตัดสิน, อยากรู้ความจริง) + ความรู้ในเรื่องนั้น [SEP_CriticalThinking]
- **กลไก/หลักฐาน:** สอนได้ แต่ผลเล็ก–ปานกลาง (g ≈ 0.30, 341 effect sizes); dialogue + โจทย์จริง + mentoring ได้ผลดีสุด; หลักฐานว่าย้ายข้ามสาขาได้ "บาง" [Abrami2015; SEP_CriticalThinking]
- **ใช้กับงานเรา:** อย่าหวังว่า "คิดให้ดี ๆ" จะพอ → ใช้ checklist เฉพาะงาน (PRE_DELIVERY_CHECK) และให้มี "บทสนทนา" (คนที่สอง/ผู้ใช้รีวิว)
- **ข้อจำกัด:** evidence มาจากการศึกษาในห้องเรียน · **S/B · confidence medium**

### 2.2 Heuristics & cognitive biases (พร้อมสถานะ replication)
| Bias | ความหมายย่อ | หลักฐาน / replication | ใช้ตอนตรวจงาน | conf. |
|---|---|---|---|---|
| **Confirmation bias** | หา/ตีความหลักฐานเข้าข้างความเชื่อเดิม | review กว้าง [Nickerson1998]; ลดได้ด้วย training เกมที่มี feedback และย้ายไปใช้ในเคสจริงได้ (เลือกทางผิดน้อยลง 29%, การทดลองเดียว) [Sellier2019; Morewedge2015] | หาหลักฐานแย้ง claim ตัวเองทุกครั้ง | high (มีอยู่จริง) / medium (ลดได้) |
| **Anchoring** | ตัวเลข/ตัวอย่างแรกดึงการประเมิน | Many Labs 1 ทำซ้ำได้ และ (ตาม Nature) แรงกว่าต้นฉบับ [Klein2014_ManyLabs1; TverskyKahneman1974] | ไอเดียแรก/ภาพ reference แรกเป็น anchor → สร้างทางเลือกก่อนดู reference | high |
| **Framing (gain vs loss)** | ข้อมูลเดียวกัน กรอบต่างกัน ตัดสินต่างกัน | อยู่ใน Many Labs 1 (ผลรายตัวยังไม่ได้ยืนยันรอบนี้); loss aversion ทำซ้ำ 19 ประเทศ → ดู psychology [Ruggeri2020] | ตรวจว่ากรอบคำโฆษณาไม่ทำให้เข้าใจผิด (เช่น "ลดความเสี่ยง 50%" จากฐานที่เล็กมาก) | medium-high |
| **Availability / recency** | สิ่งที่นึกออกง่าย/เพิ่งเห็น ดูบ่อยหรือสำคัญกว่าจริง | heuristic คลาสสิก [TverskyKahneman1974]; "recency" ในการตัดสินใจ — ไม่ได้หาแหล่งเฉพาะรอบนี้ | อย่าสรุปจากคลิปล่าสุด 1–2 ตัว ดูทั้งชุด | medium |
| **Overconfidence** | 3 แบบ: overestimation, overplacement, overprecision | แยกเป็น 3 construct ต่างกัน; overprecision คงทนสุด [MooreHealy2008] | ให้ช่วงความไม่แน่นอน + ระดับความมั่นใจ แทนคำฟันธง | high |
| **Survivorship bias** | เห็นแต่ "ผู้รอด" | เคส Wald เครื่องบินรบ [MangelSamaniego1984 — bibliographic, เรื่องเล่ายอดนิยมเกินจริง] | "คลิปไวรัลทำ X" ไม่ได้แปลว่า X ทำให้ไวรัล — คลิปที่ทำ X แล้วเงียบเราไม่เห็น | high (ตรรกะ) |
| **Planning fallacy / inside view** | ประเมินจากแผนของงานนี้ ไม่ดูงานคล้ายกันในอดีต | [KahnemanLovallo1993]; probability training + reference class ปรับปรุงการพยากรณ์จริง [Mellers2014] | ประเมินเวลา render/โควตา TTS จาก log งานก่อน ๆ | high |

**Debiasing โดยรวม:** งานวิจัยเรื่อง bias มีมากกว่างานเรื่องการแก้ bias มาก [Lilienfeld2009]; "consider the opposite" ได้ผลกว่าการสั่งให้ "ยุติธรรม/ไม่ลำเอียง" [LordLepperPreston1984]; training ครั้งเดียวที่มี feedback + การฝึก ได้ผลกลาง–ใหญ่ อยู่ได้ ≥ 2 เดือน (เกม > วิดีโอ) [Morewedge2015] → **กลไกเชิงโครงสร้าง (checklist, คนรีวิว, ทางเลือกบังคับ) เชื่อได้กว่าความตั้งใจ**

### 2.3 Pre-mortem & prospective hindsight
- **คืออะไร:** สมมติว่างานล้มเหลวไปแล้ว แล้วให้แต่ละคนเขียนเหตุผล [Klein2007_Premortem]
- **กลไก:** การมองเหตุการณ์ว่า "เกิดขึ้นแล้ว" ทำให้คนหาเหตุผลได้มากขึ้น (~30% ตามแหล่งรอง) [Mitchell1989 — bibliographic]; ลด overconfidence ในแผนได้มากกว่า pros/cons (นักศึกษา 178 คน, proceedings) [Veinott2010]
- **ใช้กับงานเรา:** ก่อนส่งคลิป: "สัปดาห์หน้าคลิปนี้โดนคอมเมนต์ด่า/ไม่มีใครดู — เพราะอะไร?"
- **ข้อจำกัด:** วัดความมั่นใจและจำนวนเหตุผล ไม่ได้วัดว่างานล้มเหลวน้อยลงจริง · **A(bibl.)/B/D · confidence medium-low**

### 2.4 Root cause analysis — 5 Whys, fishbone
- **5 Whys:** ดีสำหรับสอน แต่เป็นเครื่องมือวิเคราะห์ที่อ่อน: ลดปัญหาซับซ้อนเหลือโซ่เหตุเดียว เลข 5 ไม่มีเหตุผล ไม่มีจุดหยุดที่เป็นกลาง [Card2017]; คำว่า "root cause" เองชวนให้คิดว่ามีสาเหตุเดียว [Peerally2017] · **A · confidence medium** (บริบทโรงพยาบาล)
- **Fishbone/Ishikawa:** ไม่พบงานประเมินผลรอบนี้ → **CRAFT**: ใช้เป็นรายการหมวดสาเหตุ (เนื้อหา / hook / ภาพ / เสียง / เวลาโพสต์ / แพลตฟอร์ม) เพื่อบังคับให้คิดหลายสาเหตุ
- **ใช้กับงานเรา:** บั๊ก render เดี่ยว ๆ → 5 Whys พอ; "ทำไม Reels ชุด 31–50 ยอดตก" → หลายสาเหตุร่วม ทดสอบทีละตัว

### 2.5 Probabilistic & causal thinking
- พูดเป็นความน่าจะเป็นและใช้ reference class ฝึกได้และทำให้แม่นขึ้น [Mellers2014] · **A · high** (ในบริบทพยากรณ์)
- **Correlation ≠ causation:** Hill เสนอ 9 มุมมอง (strength, consistency, dose-response ฯลฯ) — "viewpoints" ไม่ใช่ "criteria"; คำถามหลัก: ถ้าเปลี่ยน A แล้ว B เปลี่ยนไหม [Hill1965] · **A · high**
- **ใช้กับงานเรา (ข้อความสุขภาพตา):** เขียน "สัมพันธ์กับ" / "เพิ่มความเสี่ยง" ตามหลักฐาน; ใช้ "ทำให้เกิด" เฉพาะเมื่อแหล่งทางการแพทย์ระบุเอง

### 2.6 Problem framing / decomposition / MECE / decision matrix / inversion / second-order / scenario
- ทั้งหมดเป็น **CRAFT** (ไม่ได้หาหลักฐานทดลองรอบนี้) แต่ใช้ได้จริงเป็นโครงคิด:
  - **Framing:** เขียนโจทย์เป็นคำถามเดียวที่ชัด (SEP ระบุ "questioning" เป็นความสามารถหลัก [SEP_CriticalThinking])
  - **MECE:** แตกปัญหาเป็นหมวดที่ไม่ซ้อนกันและครบ — ใช้กับการไล่สาเหตุ
  - **Decision matrix:** เกณฑ์ + น้ำหนัก ก่อนดูตัวเลือก (ลด anchoring กับตัวเลือกที่ชอบ — inference จาก 2.2, ไม่ได้ทดสอบ)
  - **Inversion / second-order:** "อะไรจะทำให้งานนี้แย่แน่ ๆ?" และ "แล้วผลถัดไปคืออะไร?" (เช่น โปรลดราคาแรง → ลูกค้ารอแต่โปร)
- **Fallacies:** fallacy = ข้อโต้แย้งที่ดูดีกว่าความจริง [SEP_Fallacies] — ที่เจอบ่อยในคอนเทนต์: testimonial เดียวเป็นหลักฐาน, appeal to authority ที่ไม่เกี่ยว, false dilemma, post hoc

## 3. Contested / replication notes
| เรื่อง | สนับสนุน | ข้อแย้ง/ข้อจำกัด | confidence |
|---|---|---|---|
| Anchoring | Many Labs 1 ทำซ้ำได้แรง [Klein2014_ManyLabs1] | ขนาดผลต่างกันตามไซต์ | high |
| Debiasing training | ผลกลาง–ใหญ่ อยู่ได้ 2 เดือน, ย้ายสู่เคสจริง [Morewedge2015; Sellier2019] | ทีมเดียวกัน, field study เดียว, เกมราคาแพง | medium |
| Pre-mortem | ลดความมั่นใจเกิน [Veinott2010] | ตัวอย่างเล็ก, ไม่วัดผลลัพธ์จริง, ข้อมูลรอง | medium-low |
| 5 Whys | ใช้สอนได้ | อ่อนเป็นเครื่องมือวิเคราะห์ [Card2017; Peerally2017] | medium (ว่าอ่อน) |
| Critical thinking ย้ายข้ามสาขา | สอนได้ g≈0.30 [Abrami2015] | หลักฐานการ transfer บาง [SEP_CriticalThinking] | low-medium |
| Wald/survivorship | ตรรกะชัด | เรื่องเล่าเครื่องบินถูกแต่งเติม (AMS) | ตรรกะ high / เรื่องเล่า low |

## 4. Applied patterns for our production
1. **ทุกงานที่ส่ง** → รัน [`PRE_DELIVERY_CHECK.md`](PRE_DELIVERY_CHECK.md) (2–5 นาที)
2. **คาร์รูเซลมีข้อเท็จจริงเรื่องตา (UV/ต้อเนื้อ/สายตายาว)** → ข้อ 2 (evidence) + ข้อ 5 (ใครอาจเข้าใจผิด) เข้มสุด; คำว่า "ทำให้" ต้องมีแหล่ง
3. **ยอดตก/คลิปไม่ปัง** → ไม่ใช่ 5 Whys; ทำรายการสาเหตุหลายหมวด + เทียบกับชุดก่อนหน้า (reference class) + ระวัง survivorship เวลาเลียนแบบคลิปไวรัลของคนอื่น
4. **เลือกระหว่าง 3 ทิศทาง** → เขียนเกณฑ์ก่อนดูตัวเลือก (ดู `../creative-thinking/IDEATION_PLAYBOOK.md` §4)
5. **ประเมินเวลา/โควตา** (TTS, Codex) → ดู log งานก่อน ไม่ใช่แผนในหัว

## 5. Anti-patterns
- เรียกเครื่องมือ CRAFT (MECE, 5 Whys, six hats) ว่า "วิธีที่พิสูจน์แล้ว"
- อ้าง priming/ego depletion/power pose เป็นความจริง (ดู psychology §3)
- สั่งตัวเอง "ให้ไม่ลำเอียง" แทนการเขียนข้อโต้แย้งฝั่งตรงข้ามจริง ๆ
- ใช้คลิปไวรัลตัวเดียว (หรือคลิปเราตัวล่าสุด) เป็นหลักฐานว่าสูตรได้ผล
- เขียน "X ทำให้ Y" จากงานที่เป็นแค่ correlation
- ฟันธงตัวเลขแม่นเกินหลักฐาน (overprecision) — ใช้ช่วง/ระดับความมั่นใจ

## 6. Open questions / next research
- อ่าน full text Many Labs 1 (ผลรายตัวของ framing, sunk cost), Card2017, Morewedge2015 (ขนาดผลจริง)
- หลักฐานของ checklist ในงานความรู้/สร้างสรรค์ (Gawande-style checklists วิจัยในการแพทย์ — ยังไม่ได้ค้น)
- เปรียบเทียบ "red team / devil's advocate" กับ "dialectical inquiry" (Schweiger et al.) — ยังไม่ได้ค้น
- งาน debiasing ที่ทำกับตัวอย่างคนไทย/เอเชีย — ยังไม่พบ
- recency bias ในการประเมินผลงาน — ยังไม่มีแหล่งเฉพาะ
