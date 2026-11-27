# FD13 — Emotional Cinematography (ภาพยนตร์เชิงอารมณ์: Emotional Camera Matrix)

> ต่อยอดจาก `creative-intelligence/knowledge/emotional-architecture/EMOTION_DESIGN_MATRIX.md` (20 อารมณ์ × 11 คันโยก: เสียง คำ สี แสง กล้อง ดนตรี SFX จังหวะ…) และ `.claude/skills/ai-visual-artist/EMOTION_VISUAL_LIBRARY.json` (114 สภาวะ) — บทนี้ **ขยายเฉพาะคันโยกฝั่งกล้อง/ตัดต่อ** ให้ละเอียด: emotion × shot size × angle × movement × lens × light × colour × pace
> คลัง: `../libraries/EMOTIONAL_CAMERA_MATRIX.json` (34 อารมณ์ แต่ละรายการมี `emotion_links` ชี้กลับไปยัง § ของ EMOTION_DESIGN_MATRIX และ id ใน EMOTION_VISUAL_LIBRARY)
> ความซื่อตรง: **ส่วนใหญ่ของเมทริกซ์เป็น [CRAFT]** มีหลักฐานจริงเพียงไม่กี่คันโยก (ระบุใน `evidence_notes` ของแต่ละรายการ)

## 1. นิยามและหลักการพื้นฐาน
- **Emotional cinematography** = การเลือกค่ากล้อง/แสง/สี/จังหวะเพื่อให้ผู้ชม *รู้สึก* อารมณ์ของ beat ไม่ใช่แค่เห็น
- **คันโยก 7 ตัวของเมทริกซ์:** shot size (`cam.*`) · angle · movement · lens · light · colour · pace (+ acting และเสียงเป็นคันโยกคู่)
- **หลักใหญ่:** กล้อง **ขยาย** อารมณ์ที่การแสดง/บริบทให้มา ไม่ได้สร้างจากศูนย์ (หลักฐาน: close-up เพิ่มการคิดถึงจิตใจตัวละครเฉพาะเมื่อหน้าเศร้า ไม่ใช่หน้าเฉย `[RooneyBalint2018]`)

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 คันโยกที่มีหลักฐาน** (ที่เหลือ = craft)
| คันโยก | ผล | หลักฐาน | ความมั่นใจ |
|---|---|---|---|
| Close-up ใบหน้าที่แสดงอารมณ์ | ผู้ชมพูดถึงสภาวะจิตใจตัวละครมากขึ้น (ไม่ใช่ความสามารถ ToM โดยรวม; ไม่ข้ามไปตัวละครอื่น) | `RooneyBalint2018` (N=136), `Balint2020` (N=495, จำนวน close-up 0–หลายช็อต) | medium |
| กล้องเข้าใกล้แบบกายภาพ (Steadicam) vs zoom/นิ่ง | รู้สึกมีส่วนร่วมมากกว่า + motor cortex ตอบสนองแรงกว่า; zoom มี rebound | `Heimann2014` | medium (การกระทำของมือ, แล็บ) |
| Close-up บนความขัดแย้งไม่สุภาพ | ผู้ชมมองฝ่ายที่ถูกถ่ายว่าชอบธรรมน้อยลง | `Mutz2007` | medium (บริบทการเมือง US) |
| ช็อตสั้น + motion มาก | ลักษณะของช่วง climax; ผู้วิจัยเชื่อมกับการดึง attention | `Cutting2016`, `Cutting2011` | medium (correlational) |
| ความสว่าง | หนังมืดลงช่วงกลาง สว่างขึ้นช่วง climax; ผู้วิจัย *ตีความ* ว่าสว่าง/มืด ↔ บวก/ลบ | `Cutting2016` | low–medium |
| มุมกล้อง | เปลี่ยนการตัดสินตัวละครอย่างคาดเดาได้; ผล "มุมต่ำ=มีอำนาจ" อ่อนและขึ้นกับบริบท | `Kraft1987`; emotional-architecture: MeyersLevyPeracchio1992 | low |
| บริบทที่วางคู่กับใบหน้า | บริบทกลัว/คุกคามเปลี่ยนการอ่านหน้าได้ชัดสุด, บริบทสุขอ่อน | `Calbi2017`, `Barratt2016`, `Mobbs2006` | medium |
| การไต่ระดับ joy / ระดับ surprise ในโฆษณา | ความเร็วที่ joy เพิ่มทำนายการดูต่อ; ระดับ surprise รวมสายตา | `Teixeira2012` | medium |

**2.2 Contrast & Affinity** `[Block2021]` [CRAFT]: ความเข้มทางภาพ (visual intensity) เพิ่มเมื่อคอนทราสต์ของ component (space, line, shape, tone, colour, movement, rhythm) เพิ่ม → จับคู่ "กราฟความเข้มของเรื่อง" กับ "กราฟความเข้มของภาพ"; อารมณ์ถูกขับด้วย **การเปลี่ยน** ของค่า (wide→CU, อุ่น→เย็น) มากกว่าค่าคงที่

**2.3 Emotion as a curve, not a stamp** — ใช้ `ARC_TEMPLATES.md` ของ emotional-architecture วางโค้ง แล้วเลือกแถวเมทริกซ์ต่อ beat; อย่าดันทุกคันโยกถึงสุดในช็อตแรก (ไม่มีที่ให้ไต่)

**2.4 Mood vs emotion** [CRAFT; Greg M. Smith 2003 อยู่ใน emotional-architecture sources]: แสง/สี/ดนตรีตั้ง "mood" ยาวๆ ให้ผู้ชมพร้อมรับ ส่วนช็อต/คัทส่ง "emotion" สั้นๆ ที่ beat

## 3. เหตุผลที่ใช้
ให้ทีม (และ Claude) เลือกค่ากล้องจากเป้าหมายอารมณ์อย่างมีเหตุผลและตรวจย้อนได้ แทนการใช้ "cinematic" แบบลอยๆ ใน prompt

## 4. ผลต่ออารมณ์และการรับรู้ (ย่อจากเมทริกซ์)
| อารมณ์ | ขนาด | มุม | การเคลื่อน | เลนส์ | แสง | สี | จังหวะ |
|---|---|---|---|---|---|---|---|
| Joy | MS/two-shot | eye-level | follow ลื่น | 35–50 | high-key | อุ่นอิ่มตัว | กลาง ตาม beat |
| Sadness | CU / WS ว่าง | eye/สูงเล็กน้อย | นิ่ง/push ช้า | 85+ | low-key นุ่ม | เย็นจืด | ช้า ค้าง reaction |
| Fear | CU/ECU | Dutch/สูงบนเหยื่อ | handheld สั่น | กว้างใกล้หน้า | low-key แข็ง | เขียวฟ้า ดำจม | ค้างนานแล้วคัทกะทันหัน |
| Tension | insert/CU | eye-level | push ช้า | tele บีบ | low-key | เย็น+จุดแดง | cross-cut ถี่ขึ้น |
| Calm | WS/EWS | eye-level | นิ่ง/slide ช้า | ปกติ-กว้าง | ธรรมชาตินุ่ม | analogous | ช็อต 4–8 s |
| Awe | EWS | ต่ำ/บน | crane/pull-back ช้า | กว้าง + คนตัวเล็ก | god rays | น้ำเงิน-ทอง | ช้า |
| Trust | MS/MCU | eye-level | นิ่ง | 50 ไม่บิดเบี้ยว | นุ่ม ratio ต่ำ | สีจริง | สม่ำเสมอ |
(ครบ 34 อารมณ์ในคลัง JSON)

## 5. ใช้เมื่อไร
- ก่อนเขียน shot list ทุกครั้ง: ระบุ target emotion ต่อ beat → ดึงแถวจากเมทริกซ์ → ปรับตามเรื่อง
- เมื่อ critic บอก "ภาพสวยแต่ไม่รู้สึก" → ตรวจว่าคันโยกไหนขัดกับเป้าหมาย

## 6. ไม่ควรใช้เมื่อไร
- อย่าใช้เมทริกซ์แทนการแสดง (ถ้าหน้า/ท่าไม่ส่ง ให้แก้การแสดงก่อน — FD15)
- อย่าใช้ค่ามาตรฐานเดียวกันทุก beat → ไม่มี contrast
- อย่าอ้างค่าในเมทริกซ์ว่า "วิทยาศาสตร์พิสูจน์แล้ว" ยกเว้นแถวที่มี [EVIDENCE]
- วัฒนธรรมต่างกัน: ความหมายของสีไม่สากลทั้งหมด (ดู emotional-architecture: Jonauskaite2020)

## 7. ตัวอย่าง (sourced)
- ภาพยนตร์แอนิเมชันสั้นในงาน Rooney & Bálint: close-up หน้าเศร้า > long shot ในการกระตุ้นให้คิดถึงความรู้สึกตัวละคร `[RooneyBalint2018]`
- Hitchcock *Bang! You're Dead*: ISC ขึ้นช่วง climax `[Hasson2008]`
- การทดลองกล้อง 4 แบบ (fixed/zoom/dolly/Steadicam) บนการกระทำของมือ `[Heimann2014]`
- ภาพยนตร์ยอดนิยม 4 องก์: มืดลงตรงกลาง สว่างขึ้นตอน climax `[Cutting2016]`

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip (ไทย):** แต่ละ EP วางโค้ง 3–5 beat; ช็อตแน่นสุด (CU) เก็บไว้ที่จุดเปลี่ยนเดียว; ใช้ `emo.empathy` + L-cut
- **Product/promo:** `emo.curiosity` (ซ่อนบางส่วน) → `emo.anticipation` (push ช้า) → `emo.satisfaction` (reveal เต็ม, แสงเปิด); ห้าม `emo.fear` กับแบรนด์ trust
- **Reels/TikTok:** joy ต้อง "ไต่" ไม่ใช่คงที่ (`Teixeira2012`); surprise ต้นคลิป
- **Explainer:** `emo.trust` + `emo.curiosity`; หลีกเลี่ยง wide-angle บิดหน้าผู้เชี่ยวชาญ
- **Cartoon (chibi Aaron):** ใช้ shot size และ colour script แทนการแสดงสีหน้าละเอียด; push-in เมื่อคิด
- **Eye-break clip:** `emo.calm`: ช็อต 4–8 s, ไม่มีคัทแรง, dissolve

## 9. AI image prompt examples (จากเมทริกซ์ — ใช้ภาษาเทคนิค ไม่ใช่คำว่า cinematic ลอยๆ)
1. Sadness: `a man sits alone on a bus bench in the rain looking down, close-up, eye-level, 85mm shallow depth of field, low-key soft single source with cool fill, desaturated blue-grey palette`
2. Awe: `a tiny hiker at the foot of a massive waterfall, extreme wide shot, low angle, wide lens deep focus, god rays through mist, deep blue and gold palette`
3. Trust: `a pharmacist explains to camera in a clean bright shop, medium close-up, eye-level, 50mm, soft even key with gentle fill, neutral true colours`

## 10. AI video prompt examples
1. Empathy: `medium close-up, the camera slowly physically moves closer (not a zoom) as the optometrist listens and nods; soft frontal key`
2. Tension: `static insert of a phone screen showing 1% battery, then the camera slowly pushes toward the woman's face as she searches her bag; low-key light`
3. Relief: `tight close-up as he exhales, then the camera pulls back to a wide shot as warm light fills the room`

## 11. Shot list example — โค้ง "กังวล → โล่ง → ยินดี" (20 s)
| beat | อารมณ์ (id) | ช็อต | เลนส์/แสง/สี | ยาว |
|---|---|---|---|---|
| 1 | emo.anxiety | MCU หญิงชราขยี้ตาอ่านฉลากยา | tele, แสงผสมอุณหภูมิ, จืด | 3 s |
| 2 | emo.anxiety→tension | insert ฉลากเบลอ (POV) | macro, เย็น | 1.5 s |
| 3 | emo.empathy | MS ช่างนั่งระดับสายตาเดียวกับเธอ, push ช้า | 50mm, นุ่ม | 4 s |
| 4 | emo.anticipation | ECU มือสวมแว่น | shallow DoF, แสงอุ่นเริ่มเข้า | 1.5 s |
| 5 | emo.relief | CU เธอหายใจออก → pull-back WS | แสงเปิด, อุ่นขึ้น | 5 s |
| 6 | emo.joy | two-shot หัวเราะกับหลาน | high-key อุ่น | 5 s |

## 12. ข้อผิดพลาดที่พบบ่อย
- CU บนหน้าที่ว่าง (AI มักให้หน้าเฉย) แล้วคาดว่าเศร้า
- Prompt "cinematic, moody" ทุกฉาก → ทุก beat หน้าตาเดียวกัน
- Low angle ฮีโร่กับสินค้าทั่วไป → ดูล้อเลียน
- Zoom ดิจิทัลแทน push-in ในฉาก intimate (`Heimann2014`: zoom รู้สึกมีส่วนร่วมน้อยกว่า)
- Close-up รุนแรงกับผู้เชี่ยวชาญในฉากเถียง (`Mutz2007`)

## 13. วิธีตรวจและแก้
1. **Beat table:** ทุก beat มี `emo.*` 1 ตัว + ค่าคันโยก 7 ช่อง; ตรวจว่าค่าต่างจาก beat ก่อนหน้าอย่างน้อย 2 คันโยก (contrast)
2. **Mute-3-frames test:** ส่ง 3 เฟรมให้คนดูตั้งชื่ออารมณ์ (ตาม `check` ในคลัง)
3. **Intensity graph:** วาดกราฟ story intensity กับ visual intensity (Block) ควรขึ้นลงด้วยกัน
4. **แก้:** แก้การแสดงก่อน → แสง/สี → ขนาด/การเคลื่อนกล้อง → จังหวะ

## 14. แบบฝึกหัด + test case
- **T13-A (one scene, three emotions):** ฉาก "ลูกค้าลองแว่น" ถ่าย 3 แบบตามแถว `emo.joy`, `emo.vulnerability`, `emo.mystery` เปลี่ยนเฉพาะกล้อง/แสง/สี/จังหวะ (บทเดิม) → ผู้ชมทายอารมณ์; ดูว่าคันโยกไหนพาอารมณ์ได้จริง
- **T13-B (CU dose):** คลิป 30 s เวอร์ชัน 0/2/5 close-up (ตามแนว `Balint2020`) → ให้ผู้ชมเล่าเรื่องสั้นๆ นับคำที่พูดถึงความรู้สึกตัวละคร
- **T13-C (push vs zoom):** push-in กายภาพ (2.5D parallax) vs scale zoom บนภาพเดียวกัน → ถามว่า "รู้สึกใกล้ชิดแค่ไหน 1–7"
- เกณฑ์ผ่าน: ≥ 2/3 คนระบุอารมณ์ตรงหรือใกล้เคียง; โค้งความเข้มมีจุดพีคเดียวชัด

## 15. แหล่งอ้างอิง
RooneyBalint2018 · Balint2020 · Heimann2014 · Mutz2007 · Cutting2016 · Cutting2011 · Kraft1987 · Calbi2017 · Barratt2016 · Mobbs2006 · Teixeira2012 · Hasson2008 · Block2021 · VanLeeuwenBoeriis2016 — ข้ามโฟลเดอร์: `knowledge/emotional-architecture/sources.json` (Smith2003, MeyersLevyPeracchio1992, Jonauskaite2020, CuttingDeLongNothelfer2010)
