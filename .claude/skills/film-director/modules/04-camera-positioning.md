# FD04 — Camera Positioning (ตำแหน่งกล้อง: เส้น 180°, 30°, eyeline, ระยะ, coverage, ตำแหน่งที่ "มีเหตุผล")

> ต่อยอด ไม่ซ้ำ: กฎ 180°/eyeline/ทิศการเคลื่อนที่/cut on action อยู่ใน `GUIDE.md` §1 "Screen direction"; วิธีข้ามเส้น 4 แบบ, กฎ 30°, eye trace ใน
> `curriculum/05-movement-language.md` §1.4; ระยะกล้อง = perspective ใน `visual-arts/LENS_OPTICS.md` §2.
> บทนี้เพิ่ม: **หลักฐานวิจัยเรื่องเส้น 180°** (ละเมิดแล้วงงแต่ไม่ลดความชอบ), ทฤษฎี attention ของ continuity (AToCC), การเลือกตำแหน่งกล้องจาก
> "ใครรู้อะไร" (POV/objective/omniscient), ผังตำแหน่งกล้อง (floor plan) ที่ใช้กับ rig.js และ AI, และตำแหน่งกล้องในงาน 9:16.

## 1. นิยามและหลักการพื้นฐาน
- **Camera position** = จุด (x, y, z) + ทิศ ของกล้องในพื้นที่ฉาก; ขนาดภาพ (FD01), มุม (FD02), perspective (FD05) ล้วนเป็นผลของตำแหน่ง+เลนส์
- **Axis of action / เส้น 180°**: เส้นสมมติระหว่างสองตัวละคร (หรือทิศการเคลื่อนที่); กล้องอยู่ฝั่งเดียว → A อยู่ซ้าย B อยู่ขวาทุกช็อต (`Wiki-180Rule`, `Smith2012-AToCC`)
- **กฎ 30°**: คัตไปวัตถุเดิมต้องย้ายมุม ≥ ~30° หรือเปลี่ยนขนาดชัด [CRAFT; ทฤษฎีที่มาใน Smith2012]
- **Eyeline match**: คนมองทางไหน ช็อตถัดไปอยู่ทางนั้น; **screen direction**: ทิศการเคลื่อนที่คงที่ข้ามช็อต
- **Coverage**: ชุดตำแหน่งกล้องที่ครอบฉาก — master, two-shot, OTS×2, singles×2, inserts (`Mascelli1965` จัด continuity+cutting เป็น 2 ใน 5C)

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 เส้น 180° — สิ่งที่หลักฐานบอกจริง
| การศึกษา | ผล | ความเชื่อมั่น |
|---|---|---|
| Kachkovski et al. 2019 (3 การทดลอง) | คนดูทั่วไป **จับได้** ว่ามีการข้ามเส้น (ผลใหญ่); การข้ามเส้น **ทำให้งง/เสียทิศได้** (ผลเล็ก); แต่ **ไม่ทำให้ชอบน้อยลง** | A, full text `Kachkovski2019` |
| Frith & Robson 1975; Magliano & Zacks 2011 (ตามที่ Wikipedia อ้าง) | การละเมิดไม่ทำให้เข้าใจลำดับเหตุการณ์แย่ลง | E→A, secondary `Wiki-180Rule` |
| Smith 2012 AToCC | continuity ไม่ต้องอาศัยแผนที่พื้นที่ในหัวที่สมบูรณ์ — ต้องการแค่ให้ความสนใจถูกพาข้ามคัตด้วย cue (การมอง, การพูดสลับ, เสียงนอกจอ, การเคลื่อนที่, การชี้) | A, full text `Smith2012-AToCC` |
**ข้อสรุป**: เส้น 180° เป็นเครื่องมือ **ความชัดเจนของพื้นที่** ไม่ใช่กฎศักดิ์สิทธิ์ — รักษาไว้เมื่อคนดูต้องรู้ว่าใครอยู่ไหน (ไล่ล่า, บทสนทนาหลายคน, จอเล็ก);
ข้ามโดยเจตนาเมื่อต้องการความสับสน/การพลิกของความสัมพันธ์ (ตัวอย่าง §7) [DERIVED]

### 2.2 ตำแหน่งกล้อง = ตำแหน่งความรู้
| มุมมอง | ตำแหน่ง | ใครรู้อะไร |
|---|---|---|
| Objective | นอกการกระทำ, ระดับตา, ห่าง | คนดูสังเกตเอง |
| Subjective (POV) | ที่ตาตัวละคร | รู้เท่าตัวละคร |
| Over-the-shoulder | หลังไหล่ A มอง B | อยู่ "ข้าง" A |
| Omniscient / authorial | สูง, หลังกำแพง, มุมที่ตัวละครไม่มีทางยืน | คนดูรู้มากกว่าตัวละคร = suspense |
(ต่อยอด curriculum 05 §1.4) — Bordwell ชี้ว่า "free camera" ปัจจุบันยืมลุคสารคดี แต่ใช้ **vantage point ที่เป็นไปไม่ได้** และตัดให้เรื่องชัด ซึ่งต่างจากสารคดีจริง;
Kwapis: "ไม่มี reverse angle ในสารคดี" (`Bordwell2023-CalmCamera`) → ถ้าอยากได้ลุคสารคดีแท้ ให้กล้องอยู่ฝั่งเดียวและพลาดบางอย่างได้

### 2.3 ระยะกล้อง (distance) เป็นการตัดสินใจแยกจากขนาดภาพ
- ระยะกำหนด perspective: ใกล้ = จมูกโต, ฉากลึก; ไกล = หน้าตรงรูปจริง, ฉากหลังดูชิด (`va:BryanPeronaAdolphs2012`, LENS_OPTICS §2)
- MCU เดียวกันได้จาก 0.6 ม.+24 มม. (ดุดัน/ตลก) หรือ 2 ม.+85 มม. (อบอุ่น/น่าไว้ใจ) → **เลือกระยะก่อน แล้วเลือกเลนส์ให้เต็มเฟรม**

### 2.4 ผังตำแหน่งกล้อง (floor plan) — มาตรฐานของเรา
```
          B (ขวา)
           ●
          / \            เส้น 180° = A—B ; ฝั่งกล้อง = "ใต้เส้น"
   A ●───────────        C1 master (WS)      : กลาง ห่าง 4 ม., eye level
          C3   C4        C2 two-shot (MS)    : กลาง ห่าง 2.5 ม.
       C2                C3 OTS หลัง A → B   : ซ้ายล่าง ห่าง 1.5 ม. จาก B, 85 มม.
          C1             C4 OTS หลัง B → A   : ขวาล่าง (ฝั่งเดียวกัน!)
                         C5/C6 clean singles: ตำแหน่งเดียวกับ C3/C4 ตัดไหล่ออก
```
- ใน rig.js ไม่มีกล้อง 3D: "ตำแหน่ง" = เวอร์ชันของฉาก (OTS = ฉากใหม่ที่มี A ด้านหลังเป็น fg layer) + สถานะ `cam` (px, py, s);
  ให้เก็บ floor plan นี้ใน shot list เพื่อให้ทุกฉากย่อยวาง A ซ้าย B ขวาตรงกัน

## 3. เหตุผลที่ใช้
ตำแหน่งกล้องตัดสินว่าคนดู "ยืนข้างใคร", "รู้แค่ไหน", และ "เข้าใจพื้นที่ไหม" — สามอย่างนี้คือรากของ suspense, empathy, และ clarity

## 4. ผลต่ออารมณ์และการรับรู้
- รักษาเส้น → พื้นที่อ่านง่าย, การสับสนลดลง (EVIDENCE: Kachkovski2019 Exp.2 ผลเล็ก)
- ข้ามเส้น → คนดูสังเกตได้ แต่ไม่ได้เกลียด (EVIDENCE) → ใช้เป็นสัญญาณ "ความสัมพันธ์แตก/สถานการณ์พลิก" ได้ (CRAFT)
- POV/OTS → empathy กับเจ้าของตำแหน่ง (CRAFT); omniscient สูง → suspense (CRAFT)
- กล้องใกล้หน้ามาก → ดูน่าไว้ใจน้อยลง (EVIDENCE, BryanPeronaAdolphs2012)

## 5. ใช้เมื่อไร
- ทุกฉากสนทนา/ไล่ล่า: กำหนดเส้นก่อนวางช็อตแรก
- คลิปที่ประกอบจากหลายแหล่ง (AI + 2D + ภาพจริง): ใช้ floor plan เดียวเพื่อให้ทิศสายตาตรงกัน
- งานที่อยากให้คนดูรู้มากกว่าตัวละคร: วางกล้อง omniscient

## 6. ไม่ควรใช้เมื่อไร (หรือ "ไม่จำเป็น")
- ไม่ต้องยึด 180° เมื่อ: ตัวละครเดียวพูดกับกล้อง, ฉากความฝัน/สับสน, montage ที่ไม่ต้องการภูมิศาสตร์
- อย่าวางกล้อง "ตำแหน่งที่เป็นไปไม่ได้" ในงานที่ขายความจริง (testimonial/สารคดี)

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- ผู้กำกับที่ข้ามเส้นโดยเจตนา (ตาม Wikipedia): Dreyer *The Passion of Joan of Arc*, Kubrick *The Shining* (ฉากห้องน้ำ), Godard *Breathless* (ฉากในรถ),
  von Trier *Antichrist*, Ozu, Wong Kar-wai, Tati (`Wiki-180Rule`, tier E — ยังไม่ได้ยืนยันกับแหล่งวิชาการ)
- *Blade Runner* (1982): eyeline/gaze cue สร้างพื้นที่สามตัวละครข้ามคัต (`Smith2012-AToCC`)
- *Succession*: free camera กระโดดข้ามเส้น + wobblecam (`Bordwell2023-CalmCamera`)
- *1917* (2019): ตำแหน่งกล้องวางจาก blocking ที่ซ้อมก่อน → ภาพนิ่ง → storyboard/schematic ให้ทีม grip (`Deakins1917-Planning`)

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip**: เขียน floor plan + "A ซ้าย / B ขวา" ไว้หัว shot list; ข้ามเส้นด้วย 4 วิธี (กล้องเคลื่อนข้าม, neutral shot บนเส้น, ตัวละครเดินข้าม, insert แล้วตั้งแกนใหม่ — curriculum 05)
- **Product/promo**: เส้นคือ "สินค้า—ลูกค้า"; ลูกค้ามองสินค้าไปทางขวา → ช็อตสินค้าถัดไปควรเข้ามาจากขวา/อยู่ทางขวา
- **Reels 9:16**: แนวตั้งแคบ → การสลับซ้ายขวาเห็นชัดน้อยกว่า แต่ eye trace สำคัญมาก: จุดที่ตาคนดูจบช็อต A = จุดที่สิ่งสำคัญเริ่มในช็อต B (Smith2012 attention cue)
- **Explainer**: presenter มองกล้อง (ไม่มีเส้น); เมื่อหันไปชี้กราฟิก ให้กราฟิกอยู่ฝั่งที่เขาชี้
- **Cartoon carousel (Mint & Tao)**: ทุกสไลด์ Mint ซ้าย Tao ขวา (bubble ตามด้วย) — สลับเฉพาะตอนเรื่องพลิก (ใช้เป็น "ภาษา")
- **Documentary/talking head**: สองกล้อง (กว้าง + ใกล้) ฝั่งเดียวกัน ห่างกัน ≥ 30°; ผู้ให้สัมภาษณ์มองผู้สัมภาษณ์ที่อยู่ข้างกล้อง (eyeline ไม่ใช่เข้ากล้อง)

## 9. AI image prompt examples
```
over-the-shoulder shot from behind the man's LEFT shoulder, he is on the left of frame, the woman on the right faces camera — reverse angle of a two-person conversation at a cafe table
the reverse angle: over-the-shoulder from behind the woman's RIGHT shoulder, she is on the right of frame, the man on the left faces camera, same cafe, same window light from the left
```
- AI ไม่รู้ "เส้น" — ต้องระบุซ้าย/ขวาของเฟรมและไหล่ข้างไหนทุกครั้ง; ทิศแสงต้องคงที่ในพิกัดฉาก (หน้าต่างอยู่ซ้ายใน master)

## 10. AI video prompt examples
```
Medium two-shot, the man on the left and the woman on the right at a cafe table; she slides a gift across to him. Locked-off.
Neutral shot on the line: the camera looks straight down the aisle as the customer walks directly toward camera.   (ใช้รีเซ็ตแกน)
```

## 11. Shot list example (ฉากคืนแว่นที่ซื้อผิด — ข้ามเส้นโดยเจตนา)
| # | ตำแหน่ง | ขนาด | หมายเหตุ |
|---|---|---|---|
| 1 | C1 master ใต้เส้น | WS | ลูกค้า ซ้าย / พนักงาน ขวา |
| 2 | C3 OTS หลังลูกค้า | MCU พนักงาน | dirty |
| 3 | C4 OTS หลังพนักงาน | MCU ลูกค้า | dirty |
| 4 | กล้องอยู่บนเส้น (neutral) | MS | ลูกค้าเดินไปที่ชั้นวาง → แกนใหม่ |
| 5 | C5' ฝั่งใหม่ | CU ลูกค้าเจอแว่นที่ใช่ | การ "ข้ามแล้ว" = มุมมองใหม่ต่อปัญหา |

## 12. ข้อผิดพลาดที่พบบ่อย
- reverse OTS ถ่ายจากอีกฝั่งเส้น (สองคนมองทางเดียวกัน) · คัต 2 ช็อตขนาดเดียว มุมต่าง < 30° · ไล่ล่าที่ทิศสลับไปมา ·
  ทิศแสงเปลี่ยนระหว่าง reverse (AI) · ผู้ให้สัมภาษณ์มองเข้ากล้องบ้าง ไม่มองบ้าง · กล้องใกล้หน้ามากใน testimonial

## 13. วิธีตรวจและแก้
- วาดลูกศรทิศสายตา/ทิศเคลื่อนที่บน thumbnail ทุกช็อต — ลูกศรต่อกันเป็นเรื่องเดียวไหม
- พลิก thumbnail ช็อต B ซ้าย-ขวา (mirror) ถ้าข้ามเส้นโดยไม่ตั้งใจ — สำหรับ 2D/AI ที่ไม่มีข้อความ แก้ได้เร็วที่สุด (ระวังโลโก้/ตัวอักษรกลับด้าน)
- ใส่ neutral shot หรือ insert คั่นถ้าต้องการรีเซ็ตแกน

## 14. แบบฝึกหัด + test case
- **TC-FD04-A (180°)**: ฉากสนทนา Mint & Tao 6 ช็อต 2 เวอร์ชัน (รักษา vs ข้ามที่ช็อต 4 โดยไม่มีตัวเชื่อม) → ถามผู้ใช้ "ใครพูดกับใคร/ใครอยู่ไหน" และ "ชอบอันไหน" — คาด (Kachkovski2019): งงขึ้นเล็กน้อย, ความชอบไม่ต่าง
- **TC-FD04-B (ระยะ)**: MCU พนักงานเดียวกัน 2 แบบ (ใกล้ 0.6 ม. wide vs 2 ม. tele, FLUX) → เลือกอันน่าไว้ใจ (คาด: ไกล)
- **TC-FD04-C (eye trace 9:16)**: ช็อต A จบที่มือขวาบน; ช็อต B เริ่มสินค้า (1) ตรงจุดเดิม (2) ล่างซ้าย → อันไหนดู "ลื่น"

## 15. แหล่งอ้างอิง
`sources/camera.json`: Kachkovski2019, Smith2012-AToCC, Wiki-180Rule, Bordwell2023-CalmCamera, Deakins1917-Planning, Mascelli1965, Brown2022, Bowen2017, Katz2019 ·
visual-arts: BryanPeronaAdolphs2012, CooperPiazzaBanks2012.
**Gaps**: Frith & Robson 1975, Magliano & Zacks 2011, Germeys & d'Ydewalle 2007 (reverse-angle eye movements) ยังไม่ได้อ่านต้นฉบับ; ไม่มีข้อมูล 180° บนจอแนวตั้ง
