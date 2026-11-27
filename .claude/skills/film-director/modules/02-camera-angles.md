# FD02 — Camera Angles (มุมกล้อง: ความสูง, มุมก้ม-เงย, มุมรอบตัว, roll)

> ต่อยอด ไม่ซ้ำ: 31 มุม/ขนาดพร้อมหลักฐานการรับรู้ละเอียดอยู่ใน `creative-intelligence/knowledge/visual-arts/CAMERA_ANGLE_LIBRARY.json`
> (`cam.low_angle` ฯลฯ: Kraft1987, MandellShaw1973, SevenantsDYdewalle2006, BaranowskiHecht2018, Giessner2011, MeyersLevyPeracchio1992);
> perspective/เส้นขอบฟ้า → `PERSPECTIVE_MASTERY.md`; มุมพื้นฐานใน GUIDE.md §1 "Angles".
> บทนี้เพิ่ม: **ชั้นภาพยนตร์** — หน้าที่ทางเรื่องเล่าของมุม, มุมใน shot/reverse-shot และ AI video, ความสูงกล้อง (shoulder/hip/knee), selfie, aerial oblique.
> คลัง → `libraries/CAMERA_ANGLE_LIBRARY.json` (17 รายการ: 12 ลิงก์ id เดิม + 5 ใหม่ `new_entry:true`)

## 1. นิยามและหลักการพื้นฐาน
มุมกล้องมี 4 แกนที่เลือกแยกกันได้:
1. **ความสูงกล้อง (camera height)**: ground → knee → hip → shoulder → eye → above eye → overhead/aerial
2. **มุมก้ม-เงย (pitch / vertical angle)**: high (ก้ม), eye-level (ระดับ), low (เงย), bird's-eye (ดิ่ง 90°), worm's-eye
3. **มุมรอบตัว (horizontal angle)**: frontal → 3/4 → profile → rear (ต้องสัมพันธ์กับเส้น 180° — FD04)
4. **Roll**: ระดับ หรือ Dutch/canted
ความสูงกับมุมก้มเงย **ไม่ใช่สิ่งเดียวกัน**: กล้องสูงระดับไหล่แต่เล็งระดับ (shoulder level) ≠ low angle [CRAFT, `Mascelli1965` จัด camera angle เป็น C แรก]

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 หลักฐาน: มุมมีผล แต่ **ขึ้นกับบริบท** (สรุปจาก visual-arts, อย่าเขียนเกินหลักฐาน)
| คำกล่าวในวงการ | หลักฐานจริง | ความเชื่อมั่น |
|---|---|---|
| Low angle = ทรงพลัง | พบในภาพที่เรียงเป็นเรื่อง แต่ **ไม่พบ** เมื่อภาพไม่มีลำดับเรื่อง (`va:SevenantsDYdewalle2006`); งานยุค 70–80 ผสม | medium/mixed |
| Low angle น่าเชื่อถือ | ผู้พูดหันหากล้อง (direct address) ถ่ายจากล่าง → ได้คะแนน **trust ต่ำสุด** (`va:BaranowskiHecht2018`) | medium |
| สื่อถ่ายคนมีอำนาจจากล่าง | พบว่าสื่อทำแบบนั้นบ่อยกว่า = รหัสที่เรียนรู้ (`va:Giessner2011`) | medium |
| Low angle ขายสินค้าได้ | ผลกับผู้ชมแรงจูงใจต่ำ, การทำซ้ำยังเป็นข้อถกเถียง (`va:MeyersLevyPeracchio1992`) | low |
| มุมกล้อง × ท่าศีรษะ | กล้องต่ำทำให้หัวดูเงย; ก้มหัว+สบตา = ดูข่ม (`va:WitkowerTracy2019`, search-summary) | low-medium |
**ข้อสรุปเชิงปฏิบัติ**: มุมทำงานเป็น "การเปลี่ยนเมื่อเทียบกับ baseline" ในลำดับเรื่อง — ถ้าทั้งคลิปเป็น low angle มันจะไม่มีความหมายอะไรเลย [DERIVED]

### 2.2 มุมในระบบ coverage
- **Shot/reverse-shot**: สองฝั่งใช้ความสูง/มุมเท่ากัน = ความสัมพันธ์เท่ากัน; ทำให้ฝั่งหนึ่ง high อีกฝั่ง low = ความไม่เท่ากันของอำนาจ [CRAFT]
- **Power shift ภายในฉาก**: เริ่ม eye-level ทั้งคู่ → เมื่ออีกฝ่ายได้เปรียบ ค่อย ๆ ลดกล้องของเขา (pedestal ลง) [CRAFT]
- ความต่อเนื่องของสายตาข้ามคัต (eyeline) ขับด้วย attention cues — การมอง, การหันพูด, เสียงนอกจอ (`Smith2012-AToCC`) → มุมของช็อต B ต้องรับกับทิศสายตาใน A
- **Bird's-eye** ตัดเส้นขอบฟ้าออก → คนกลายเป็นลวดลาย (pattern) = มุมของ "ผู้เล่าที่รู้ทุกอย่าง" [CRAFT]

### 2.3 Dutch angle
- เอียง ≥ ~5° ให้เห็นว่าตั้งใจ; ใช้ 1–2 ช็อตตรงจุด "ผิดปกติสุด" (GUIDE.md) [CRAFT]
- ใน rig.js `rot` หมุนทั้ง `.cam` → ต้องเพิ่ม `s` ให้ขอบไม่โผล่: `s ≥ cosθ + 1.78·sinθ` สำหรับ layer เต็มเฟรม 16:9 (θ=5° → 1.15) [DERIVED เรขาคณิต; ดู FD24]

## 3. เหตุผลที่ใช้
มุมคือ "ความสัมพันธ์เชิงอำนาจและมุมมอง" ระหว่างคนดูกับตัวละคร/สินค้า โดยไม่ต้องใช้คำพูด; และเป็นวิธีถูกที่สุดในการเปลี่ยน "ความรู้สึก" ของภาพนิ่ง/คลิปเดิม

## 4. ผลต่ออารมณ์และการรับรู้
- Eye level: เท่าเทียม, น่าไว้ใจสำหรับ direct address (EVIDENCE medium)
- High: เปราะบาง/ถูกเฝ้ามอง — ในลำดับเรื่อง (EVIDENCE mixed)
- Low: มีอำนาจ/คุกคามในเรื่อง แต่ **ลด trust** ของผู้พูดหากล้อง (EVIDENCE medium)
- Dutch: ไม่มั่นคง (CRAFT); การหมุนหลายแกนพร้อมกันเพิ่มความเสี่ยงเมารถจากภาพ (EVIDENCE, `KeshavarzRiecke2015` — เรื่องอาการ ไม่ใช่อารมณ์)
- Selfie/ใกล้: ดูจริงใจแบบ UGC แต่ใบหน้าที่ถ่ายใกล้ถูกให้คะแนนน่าไว้ใจ/น่าดึงดูดต่ำกว่า (`va:BryanPeronaAdolphs2012`)

## 5. ใช้เมื่อไร
- พนักงาน/ผู้เชี่ยวชาญพูดกับกล้อง → `angle.frontal` + `angle.eye_level`
- ฮีโร่/วายร้าย/สินค้าเป็นอนุสาวรีย์ → `angle.low` (ไม่ใช่ตอนพูดขาย)
- ความพ่ายแพ้/โดดเดี่ยว → `angle.high` + พื้นที่ว่างเยอะ
- เปิดเมือง/ชายหาด → `angle.aerial_oblique`; flat lay/แผนที่/โต๊ะ → `angle.birds_eye`
- มุมเด็ก/สัตว์เลี้ยง/เท้า → `angle.knee_level`, `angle.worms_eye`
- ส่งมือ ส่งของบนเคาน์เตอร์ → `angle.hip_level`

## 6. ไม่ควรใช้เมื่อไร
- Low angle กับ testimonial/คนขาย (trust ลด); Dutch ทั้งฉาก; high angle บน talking head แบบเบา ๆ (ดูเหมือน webcam ไม่ใช่เจตนา);
  ultra-wide + low angle กับใบหน้าสินค้าความงาม; มุม AI "top-down" ที่ได้ high oblique — ต้องเขียน "directly overhead, 90 degrees"

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- **Last Year at Marienbad (Resnais)** — Smith วิเคราะห์ลำดับ shot/reverse-shot ที่ "ผิด" โดยเจตนาเป็นตัวอย่างการละเมิดความต่อเนื่อง (`Smith2012-AToCC`)
- **Blade Runner (1982)** — สายตา Rachael/Deckard/นกฮูก สร้างพื้นที่ข้ามคัต (`Smith2012-AToCC`)
- **The Quick and the Dead (1995)** — dolly zoom ผสม Dutch angle ในฉากดวลปืน (`Wiki-DollyZoom`, tier E)
- ตัวอย่างมุม low/high ในหนังที่มีแหล่งวิชาการรองรับยังขาด → gap

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip**: ตั้ง baseline eye-level ทั้งเรื่อง แล้วใช้ high/low เฉพาะจุดเปลี่ยนอำนาจ; rig.js: low = ตัวละครต่ำลง+ใหญ่ขึ้น, เห็นพื้น, ตัดเพดาน (`cam py` ต่ำกว่าหน้า)
- **Product/promo**: แว่นบนแท่น → low angle เล็กน้อย + ฟ้าใส; ลองแว่นบนหน้า → eye/shoulder level; รายละเอียดกรอบ → 3/4 + profile (โชว์ทรงขาแว่น)
- **Reels 9:16**: แนวตั้งเหมาะกับ tilt/มุมเงยที่เห็นความสูง; หลีกเลี่ยงมุมสูงมากกับหน้า (คางหาย, หน้าผากใหญ่)
- **Explainer**: eye-level frontal + overhead insert (มือทำงานบนโต๊ะ)
- **Cartoon**: ตัวละคร chibi (Aaron) หัวใหญ่ → low angle เกินไปจะเห็นใต้คางกว้าง; ใช้ knee level สำหรับมุมของเด็ก
- **Documentary/talking head**: eye-level เสมอ ยกเว้นเจตนาวิจารณ์ผู้พูด

## 9. AI image prompt examples
```
low-angle shot looking up at a pair of sunglasses on a stone pedestal against a clear blue sky, 35mm, crisp midday light
high-angle shot looking down at a man sitting alone on the floor of an empty white room, lots of floor around him
directly overhead, 90 degree top-down flat lay of eyeglasses, a notebook and a coffee cup on light oak, soft even light
camera at knee height, a small dog's viewpoint looking up at a person's legs at a shop door
Dutch angle, horizon tilted about 15 degrees, a man in a narrow corridor under flickering light
```

## 10. AI video prompt examples
```
High-angle shot looking down at a man sitting alone; camera slowly cranes up, making him smaller.
Low-angle shot of the hero; camera slowly pedestals down, making her loom larger.
Dutch angle medium shot in a narrow corridor; the camera slowly rolls further off level as he backs away.
Selfie-style handheld video at arm's length; he talks to camera while walking out of the shop.
```
- คำมุมที่ผู้ผลิตระบุ: Veo (eye-level, low, high, bird's-eye/top-down, worm's-eye, Dutch, OTS, POV; บางมุม "ไม่รองรับอย่างเป็นทางการ") `Google-VeoPromptGuide`;
  Luma keys `low_angle, high_angle, overhead, ground_level, eye_level, selfie, pov, over_the_shoulder` `Luma-Concepts` — ทั้งหมด **untested ที่นี่**

## 11. Shot list example (ฉากต่อรองราคา 4 ช็อต, power shift)
| # | ขนาด/มุม | เหตุผล |
|---|---|---|
| 1 | MS two-shot, eye-level | เริ่มเท่ากัน |
| 2 | MCU ลูกค้า, eye-level; MCU คนขาย, eye-level | shot/reverse-shot สมดุล |
| 3 | MCU คนขาย, กล้องลดลงช้า ๆ (shoulder → low เล็กน้อย) | คนขายได้เปรียบ |
| 4 | MCU ลูกค้า, high angle เล็กน้อย + clean single | ลูกค้ารู้สึกแพ้ — แล้วพลิกด้วยช็อตลูกค้ากลับมา eye-level เมื่อตัดสินใจ |

## 12. ข้อผิดพลาดที่พบบ่อย
- ใช้มุมเป็นสไตล์ทั้งเรื่องจนไม่มี baseline · มุมเอียงน้อยจนเหมือนตั้งกล้องพลาด · eye-level ของ "คนถ่าย" ไม่ใช่ของตัวละคร (เด็ก/คนนั่ง)
· reverse shot มุมสูง-ต่ำไม่ตรงกับความสูงจริงของสองตัวละคร · rig.js หมุน `rot` โดยไม่เพิ่ม `s` → มุมดำโผล่

## 13. วิธีตรวจและแก้
- เส้นขอบฟ้า/จุดหายลับผ่านตาตัวละครไหม (eye-level)? ถ้าไม่ ระบุเจตนาให้ได้ (high/low)
- ทำตาราง "มุมต่อช็อต" ข้างบท: มุมเปลี่ยนตรงกับจังหวะอำนาจเปลี่ยนจริงไหม
- direct address ที่ trust สำคัญ → บังคับ eye-level
- AI: ถ้ามุมไม่ตาม prompt ให้เปลี่ยนจากชื่อมุมเป็น "คำอธิบายสิ่งที่เห็น" (เห็นเพดาน/เห็นพื้น/ไม่มีเส้นขอบฟ้า)

## 14. แบบฝึกหัด + test case
- **TC-FD02-A**: ภาพพนักงานแนะนำเลนส์ 3 มุม (eye / low 20° / high 20°) ด้วย FLUX seed เดียว → ให้ผู้ใช้เลือก "น่าเชื่อที่สุด"; คาด: eye-level (ตาม `va:BaranowskiHecht2018`) — บันทึกผลจริงลง memory
- **TC-FD02-B**: ฉาก Mint & Tao ทะเลาะ 2 เวอร์ชัน: (1) eye-level ตลอด (2) baseline eye-level + low/high ที่จุดพลิก → อันไหนอ่านจุดพลิกได้โดยไม่ต้องอ่าน bubble
- **TC-FD02-C (rig)**: `rot` 3°, 6°, 10° ที่ s เท่าเดิม vs s ตามสูตร → ตรวจขอบ และความรู้สึก "ตั้งใจ" vs "พลาด"

## 15. แหล่งอ้างอิง
`sources/camera.json`: Smith2012-AToCC, Mascelli1965, FilmArt13, Google-VeoPromptGuide, Luma-Concepts, KeshavarzRiecke2015, Wiki-DollyZoom, Brown2022, Bowen2017 ·
visual-arts `sources_camera.json`: SevenantsDYdewalle2006, BaranowskiHecht2018, Giessner2011, MeyersLevyPeracchio1992, Kraft1987, MandellShaw1973,
WitkowerTracy2019, BryanPeronaAdolphs2012.
**Gaps**: shoulder/hip/knee level ไม่มีงานวิจัยการรับรู้ (CRAFT ล้วน); มุมกล้องในจอแนวตั้งยังไม่มีหลักฐาน; การทำตามคำสั่งมุมของ Wan/Kling ยังไม่ได้ทดสอบ
