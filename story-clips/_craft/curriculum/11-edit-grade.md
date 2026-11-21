# บทที่ 11 — Video Editing & Color Grading (การตัดต่อและเกรดสี)

> เป้าหมาย: ตัดสินใจได้ว่าจะตัดภาพ "ตรงไหน" และ "เพราะอะไร" ด้วยหลักที่อธิบายได้ (Rule of Six, cut on action, J/L cut, จังหวะ) แล้วทำสีให้ทุกช็อตในคลิปดูเป็นเรื่องเดียวกัน โดยอ่านจาก scope แทนการเดาด้วยตา จากนั้นส่งออกไฟล์ที่ TikTok/Reels/YouTube บีบอัดแล้วยังสวย
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21 · บทนี้ต่อยอดจาก `GUIDE.md` §3 (Editing rhythm) และ `FX.md` §1.5–1.6 (transitions, grades), §2.3 (loudness)

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — การตัดต่อคือการเลือกว่า "ผู้ชมรู้สึกอะไรต่อไป"
ทุกการตัด (cut) คือการกระโดดของเวลา/มุมมองที่ผู้ชมต้องยอมรับ ถ้ามีเหตุผล ผู้ชมจะไม่รู้สึกว่ามีการตัด ถ้าไม่มีเหตุผล ผู้ชมจะ "สะดุด"

**Walter Murch — Rule of Six** (จากหนังสือ *In the Blink of an Eye*) ใช้เป็นลำดับความสำคัญเวลาตัดสินว่าจุดตัดไหนดีที่สุด น้ำหนักที่หลายแหล่งสรุปไว้:

| ลำดับ | เกณฑ์ | น้ำหนัก | คำถามที่ต้องถามตัวเอง |
|---|---|---|---|
| 1 | **Emotion** | 51% | การตัดนี้ซื่อตรงกับอารมณ์ของขณะนั้นไหม |
| 2 | **Story** | 23% | มันพาเรื่องไปข้างหน้าไหม |
| 3 | **Rhythm** | 10% | ตัดตรงจังหวะที่ "ถูก" ไหม (จังหวะเสียง/ดนตรี/ลมหายใจ) |
| 4 | **Eye-trace** | 7% | สายตาผู้ชมอยู่ตรงไหนของจอ และช็อตใหม่รับต่อได้ไหม |
| 5 | **2D plane of screen** | 5% | ทิศทางบนจอ / แกน 180° ไม่สลับ |
| 6 | **3D space of action** | 4% | ความต่อเนื่องของตำแหน่งในพื้นที่จริง |

ใจความสำคัญไม่ใช่ตัวเลข แต่คือ **ลำดับ**: ถ้าต้องเสียอย่างใดอย่างหนึ่ง ให้เสียจากล่างขึ้นบน ช็อตที่ความต่อเนื่องผิด (แก้วน้ำย้ายมือ) แต่อารมณ์ถูก ดีกว่าช็อตที่ต่อเนื่องเป๊ะแต่อารมณ์ตาย

**เครื่องมือตัดพื้นฐาน 4 แบบ**
- **Cut on action** — ตัดกลางการเคลื่อนไหว (ลุก หัน เปิดซอง) การเคลื่อนที่กลบรอยตัด เพราะสมองกำลังตามท่าทาง ไม่ได้ตามภาพ
- **J-cut** — เสียงของช็อตถัดไปเข้ามาก่อนภาพ (ได้ยินกระดิ่งประตูก่อน แล้วค่อยเห็นประตู) ชื่อมาจากรูปตัว J บน timeline
- **L-cut** — เสียงของช็อตก่อนหน้าลากต่อไปบนภาพใหม่ (เสียงเธอยังพูด ขณะเราเห็นหน้าเขาฟัง = reaction shot)
- **Match cut** — รูปทรง/การเคลื่อนไหว/สีซ้ำกันข้ามรอยตัด (ตัวอย่างคลาสสิก: กระดูกที่ลิงโยนกลายเป็นยานอวกาศใน *2001: A Space Odyssey*) ให้ความหมายเชื่อมสองช่วงเวลา แต่ก็ "ดึงความสนใจมาที่การตัด" จึงควรใช้เฉพาะเมื่อมีความหมาย

### 1.2 ขั้นสูง — จังหวะ, beat-sync, retention
- **Pacing vs rhythm:** pacing = ความเร็วรวมของเรื่อง (ความยาวช็อตเฉลี่ย), rhythm = รูปแบบการสลับยาว-สั้น ช็อตยาวเท่ากันหมดทุกช็อต = จังหวะตาย แม้จะเร็วก็ตาม
- **โค้งจังหวะของตอน** (GUIDE.md §3): hook เร็ว → setup กลาง → rising ช็อตสั้นลงและใกล้ขึ้น → climax ค้างภาพนานที่สุดบนภาพสำคัญ → resolution ช้าและกว้าง → teaser จบด้วยคำถาม
- **Cutting on the blink:** Murch สังเกตว่าคนกะพริบตาเมื่อความคิดเปลี่ยน จุดตัดที่ดีมักตรงกับจุดที่นักแสดง (หรือผู้ชม) "กะพริบ" คือจบความคิดหนึ่ง ในงานการ์ตูนของเรา = ตัดหลังตัวละครกะพริบ/หลบตา/หายใจออก
- **Beat-synced editing (beat clip):**
  - ตัดบน **downbeat** (จังหวะ 1 ของห้อง) สำหรับการเปลี่ยนช็อตใหญ่, บน beat ย่อยสำหรับ punch-in
  - ไม่ต้องตัดทุก beat — ตัดทุก 2 หรือ 4 beat แล้ว "เร่ง" เป็นทุก beat ช่วง build-up ให้ความรู้สึก drop
  - ตัด **ก่อน** beat 1–2 เฟรมให้ความรู้สึกแน่นกว่าตัดหลัง (สมองรับภาพช้ากว่าเสียงเล็กน้อย) — หลักเดียวกับ FX.md §2.2 "เสียงเร็ว 1 เฟรมแน่นกว่าช้า 1 เฟรม"
  - Hit ใหญ่ (kick + snare พร้อมกัน, drop) = ใช้ flash/shake/scale punch 2–4 เฟรมบนเฟรมนั้นพอดี
- **Short-form retention editing** (TikTok/Reels — แนวปฏิบัติของวงการ ไม่ใช่กฎแพลตฟอร์ม):
  - **0–1.5 วินาทีแรก**คือทุกอย่าง: เปิดด้วยภาพที่เคลื่อนไหวแล้ว + คำถาม/ข้อความที่สร้างความสงสัย ห้ามเปิดด้วยโลโก้หรือ fade-in จากดำ
  - **Pattern interrupt** ทุก 2–4 วินาที: เปลี่ยนขนาดช็อต, punch-in, เปลี่ยนตัวหนังสือ, เสียง SFX
  - **ตัดลมหายใจ/ช่วงเงียบที่ไม่ตั้งใจ** ออก (jump cut ในคลิปพูด) แต่เก็บความเงียบที่ตั้งใจไว้ก่อน punchline
  - **Loop ending:** ช็อตสุดท้ายต่อกับช็อตแรกได้ ทำให้คนดูวนซ้ำ (ยอดดูซ้ำนับเป็น watch time)
  - **Eye-trace สำคัญกว่าที่ Murch ให้น้ำหนัก** ในคลิปเร็ว: จุดเด่นของช็อตใหม่ควรอยู่ใกล้ตำแหน่งที่สายตาค้างจากช็อตเก่า มิฉะนั้นคนดูจะหาไม่ทันใน 0.5 วินาที
- **Sound editing basics:** เสียงคือครึ่งหนึ่งของการตัด
  - Room tone/ambience ต้องต่อเนื่องข้ามรอยตัดภายในฉาก — ถ้าเสียงพื้นหลังหายวูบ ผู้ชมจะ "ได้ยิน" รอยตัด
  - ใส่ fade สั้น 5–20 ms ที่ปลายคลิปเสียงทุกชิ้นกันเสียงคลิก
  - Ducking: เพลง/ambience ลดลงใต้เสียงพูด (−6 ถึง −12 dB) ระดับเป้าหมายทั้งคลิป −14 LUFS integrated, true peak ≤ −1.5 dBTP (FX.md §2.3)

### 1.3 Color — correction ก่อน grading
| ขั้น | เป้าหมาย | ตัวอย่างงาน |
|---|---|---|
| **Color correction** (ทางเทคนิค) | ทำให้ภาพ "ถูกต้องและเป็นกลาง" | ตั้งจุดดำ/ขาว, แก้ WB, ให้ผิวเป็นธรรมชาติ, จับคู่ช็อตให้เท่ากัน |
| **Color grading** (ทางศิลป์) | ทำให้ภาพ "รู้สึก" ตามเรื่อง | look teal-orange, ซีดแบบความทรงจำ, เขียวหม่นแบบสยองขวัญ |

ลำดับที่ถูก: **normalize (log → Rec.709) → primary correction → secondary correction → look → output** ถ้าใส่ look ก่อนแก้ WB ทุกช็อตจะได้ look ที่เพี้ยนต่างกันไป

**Primary vs Secondary**
- **Primary** = ปรับทั้งภาพ: lift/gamma/gain (เงา/กลาง/สว่าง), offset, contrast, pivot, saturation, curves
- **Secondary** = ปรับเฉพาะส่วน: qualifier (เลือกตามสี/ความสว่าง), power window (เลือกตามรูปทรง), hue-vs-hue/hue-vs-sat curves เช่น ทำฟ้าให้น้ำเงินขึ้นโดยไม่แตะผิว หรือทำให้กรอบแว่นสีแดงเด่นขึ้นอย่างเดียว

**Scopes — อ่านภาพด้วยตัวเลข**
- **Waveform (luma):** แกนนอน = ตำแหน่งซ้าย-ขวาในภาพ, แกนตั้ง = ความสว่าง (0–100 IRE / 0–1023) ใช้ดูว่าจุดดำแตะพื้นหรือยัง highlight clip หรือไม่
- **RGB Parade:** waveform ของ R, G, B แยกกันวางเรียง ใช้แก้ WB: ส่วนที่ควรเป็นสีเทา/ขาว (ผนัง กระดาษ) ต้องมีสามช่องสูงเท่ากัน
- **Vectorscope:** วงกลม มุม = hue, ระยะจากศูนย์ = saturation ใช้ดูว่าสีเกิน (หลุดกรอบ) ไหม และสีผิว
- **Skin tone line (flesh line):** เส้นทแยงราว "11 นาฬิกา" ระหว่างแดงกับเหลือง ผิวมนุษย์ทุกเชื้อชาติจะไปกองใกล้เส้นนี้ (ต่างกันที่ระยะ = ความเข้ม ไม่ใช่มุม) ถ้ากองเอียงไปทางเขียว = ผิวป่วย, ไปทางม่วงแดง = ผิวช้ำ เป็นแนวทาง ไม่ใช่เป้าที่ต้องเป๊ะ
- **Histogram:** ดู exposure รวม (บทที่ 1)

**Log / RAW / LUT**
- **Log** (S-Log3, V-Log, BMD Film, Apple Log): เส้นโค้งที่บีบ dynamic range ของเซนเซอร์ลงไฟล์วิดีโอ ภาพจึงดู "ซีดเทา" ตั้งใจให้เกรดทีหลัง
- **RAW:** ข้อมูลเซนเซอร์ก่อน debayer แก้ WB/ISO ภายหลังได้จริง
- **Rec.709:** มาตรฐาน ITU-R สำหรับ HDTV (ฉบับล่าสุด BT.709-6, 2015) — เป็น color space ของ SDR ที่โทรศัพท์และเว็บส่วนใหญ่แสดง ส่วนจอแสดงผลใช้ gamma ตาม BT.1886 (~2.4)
- **CST (Color Space Transform):** แปลง log → Rec.709 แบบคณิตศาสตร์ ถูกต้องกว่า "LUT แปลงสี" และไม่ตัด highlight
- **3D LUT (.cube):** ตาราง 3 มิติ แปลงค่า RGB เข้า → RGB ออก ใช้ได้ทั้ง (ก) technical LUT แปลง color space และ (ข) creative LUT สำหรับ look ข้อควรระวัง: LUT ตัดค่าที่หลุดช่วงทิ้ง, ใช้ได้กับ color space ที่มันออกแบบมาเท่านั้น, และถ้าเปิด color management อยู่แล้วยังใส่ LUT แปลงซ้ำ = แปลงสองชั้น ภาพพัง
- **HDR vs SDR:** HDR (PQ/HLG, Rec.2020) สว่างได้มากกว่ามาก แต่แต่ละแอป/โทรศัพท์แสดงไม่เหมือนกัน งานของเราส่งเป็น **SDR Rec.709** เสมอ ปลอดภัยและคาดเดาได้

**Color theory & harmony**
- **Complementary** (ตรงข้ามบนวงล้อ): ส้ม-ฟ้าอมเขียว (teal-orange) — ผิวคนอยู่ในโทนส้ม จึงดันฉากหลัง/เงาไปทาง teal ให้คนเด่น
- **Analogous** (ติดกัน): เหลือง-ส้ม-แดง = อบอุ่นกลมกลืน เหมาะกับความทรงจำ
- **Split-complementary / triadic:** หลากหลายกว่า ใช้กับการ์ตูนสดใส
- **Saturation คืออารมณ์:** ลด sat = เศร้า/จริงจัง/อดีต, เพิ่ม sat = สนุก/ฝัน แต่สีสินค้า (กรอบแว่น) ต้องตรงของจริง — ห้ามให้ look เปลี่ยนสีกรอบ

**Look development — look ยอดนิยม**
| Look | วิธีสร้าง | อารมณ์ |
|---|---|---|
| **Teal-orange** | เงา/ฉากหลัง → teal, highlight/ผิว → ส้ม, ปกป้องผิวด้วย qualifier | ภาพยนตร์ฮอลลีวูด, แอ็กชัน |
| **Bleach bypass** | ข้ามขั้นฟอกสีในล้างฟิล์ม เก็บเงินไว้บนฟิล์ม = สีจาง ดำเข้ม คอนทราสต์สูง (ดิจิทัล: ลด sat ~40–60% + เพิ่ม contrast + overlay luma) | สงคราม, หม่น, แข็ง |
| **Film emulation** | toe/shoulder นุ่ม (ดำไม่ตัน ขาวไม่ตัด), เงาเลื่อนเขียว-ฟ้าเล็กน้อย, เกรน, halation รอบไฟ | อบอุ่น มีเสน่ห์ "ไม่ดิจิทัล" |
| **Day-for-night** | ลด exposure 2 stop, เลื่อนไปน้ำเงิน, ลด sat | กลางคืนจากภาพกลางวัน |
| **Memory / sepia** | lift ดำ, ลด contrast, โทนเหลืองน้ำตาล | ย้อนอดีต (`X.grade(...,'memory')`) |

**Consistency across shots (shot matching)**
- เลือก **hero shot** หนึ่งช็อตของฉาก เกรดให้สมบูรณ์ แล้วจับคู่ช็อตอื่นเข้าหามัน (ไม่ใช่เกรดทุกช็อตแยกกัน)
- จับคู่ตามลำดับ: จุดดำ → จุดขาว → ระดับผิว (ความสูงบน waveform) → มุมผิวบน vectorscope
- ภาพ AI แต่ละช็อตมาจากการ generate ต่างครั้ง = WB/contrast ต่างกันเสมอ ขั้น shot-matching จึงสำคัญกว่าในงานเรามากกว่ากองถ่ายจริง
- เกรดเป็นชั้น: **node/adjustment layer ระดับช็อต** (correction) + **ระดับฉาก/timeline** (look เดียวกันทั้งคลิป)

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Rule of Six | ลำดับเกณฑ์ตัดของ Murch: emotion > story > rhythm > eye-trace > 2D > 3D |
| Cut on action | ตัดกลางท่าทาง ให้การเคลื่อนไหวกลบรอยตัด |
| J-cut / L-cut | เสียงนำภาพ / เสียงลากตามภาพ (split edit) |
| Match cut | รูปทรง/การเคลื่อน/สีซ้ำข้ามรอยตัด |
| Jump cut | ตัดช็อตเดิมมุมเดิมข้ามเวลา (vlog, ตัดลมหายใจ) |
| Smash cut | ตัดกระแทกจากเงียบไปดัง หรือกลับกัน |
| Pacing / rhythm | ความเร็วรวม / รูปแบบยาว-สั้นของช็อต |
| Downbeat | จังหวะที่ 1 ของห้องดนตรี จุดตัดหลักของ beat clip |
| Pattern interrupt | การเปลี่ยนภาพ/เสียงเพื่อดึงความสนใจกลับ ทุก 2–4 s |
| Room tone | เสียงพื้นหลังของห้อง ต้องต่อเนื่องข้ามรอยตัด |
| Ducking / sidechain | ลดเพลงอัตโนมัติเมื่อมีเสียงพูด |
| LUFS / true peak | ความดังรับรู้ / พีคจริงหลังแปลงอนาล็อก |
| Correction vs grading | แก้ให้ถูก / แต่งให้รู้สึก |
| Lift / gamma / gain | ปรับเงา / กลาง / สว่าง |
| Offset | เลื่อนทุกโทนพร้อมกัน |
| Qualifier / power window | เลือกพื้นที่ตามสี / ตามรูปทรง (secondary) |
| Waveform / parade | ความสว่างตามตำแหน่ง / แยก R G B |
| Vectorscope | hue (มุม) + saturation (ระยะ) |
| Skin tone line | เส้นทแยงบน vectorscope ที่ผิวคนควรอยู่ใกล้ |
| IRE | หน่วยความสว่างวิดีโอ 0 = ดำ, 100 = ขาว |
| Clipping / crushing | สว่างหลุดขาว / มืดจมดำ |
| Log / RAW | ไฟล์โค้งแบน เก็บ DR / ข้อมูลเซนเซอร์ดิบ |
| CST | แปลง color space ด้วยคณิตศาสตร์ |
| LUT (.cube) | ตาราง 3D แปลงสี (technical / creative) |
| Rec.709 / Rec.2020 | color space SDR / HDR (กว้างกว่า) |
| PQ / HLG | transfer function ของ HDR |
| Teal-orange | look complementary ผิวส้ม เงาฟ้าเขียว |
| Bleach bypass | สีจาง ดำเข้ม คอนทราสต์สูง จากการล้างฟิล์ม |
| Halation | แสงฟุ้งแดงรอบจุดสว่างแบบฟิล์ม |
| Shot matching | ทำให้ทุกช็อตในฉากสีเท่ากัน |
| CRF / VBR | คุณภาพคงที่ (x264) / bitrate แปรผัน |
| yuv420p | chroma subsampling 4:2:0 ที่ทุกแพลตฟอร์มเล่นได้ |
| faststart | ย้าย moov atom ไว้หน้าไฟล์ ให้เล่นได้ก่อนโหลดเสร็จ |

---

## 3. ตัวอย่างงานจริง
| สถานการณ์ | การตัดต่อ | การเกรด | เหตุผล |
|---|---|---|---|
| **Beat clip แว่น 15 s (TikTok)** | ช็อตแรก 0.6–1 s ภาพแว่นหมุนแล้ว + ข้อความ hook; ตัดทุก 2 beat แล้วเร่งเป็นทุก beat ก่อน drop; punch-in รายละเอียดบานพับบน snare | ฉากหลังลด sat −20% และเลื่อนไป teal เล็กน้อย, กรอบแว่น**ไม่แตะสี** | แว่นต้องเด่น สีกรอบต้องตรงของจริง (house rule: ฉากหลังสงบ) |
| **Story clip ตอนละ 60–90 s (night-optic)** | WS → MS → CU ทีละขั้น; L-cut เสียงพูดไปบน reaction; J-cut ambience ฉากถัดไป 0.3–0.6 s | `X.grade(bg,t,'night')` ที่ฉากหลังเท่านั้น ตัวละครอ่านออก | อารมณ์ (Murch ข้อ 1) มาก่อนความต่อเนื่อง |
| **ฉากความทรงจำ** | dissolve 0.8–1.2 s เข้า, dip to white ออก | `memory`: lift ดำ, ลด contrast, sepia | ภาษาภาพ "อดีต" ที่คนดูอ่านได้ทันที |
| **ฉากผี/สยอง** | เงียบ 0.5–1.5 s → ตัดพร้อมเสียง hit บนเฟรมเดียวกัน | `horror`: เขียว-cyan, crush เงา | เงียบคือการตัดอย่างหนึ่ง (GUIDE.md §3) |
| **คลิปโปรโมทหัวหิน (ภาพจริงจากมือถือ)** | ตัดลมหายใจ (jump cut), b-roll ทะเลบนเสียงพูด | correction ก่อน: แก้ WB ด้วย parade, ผิวบน skin line → ใส่ look อุ่นเบาๆ ทั้ง timeline | ภาพจากมือถือหลายตัว WB ไม่เท่ากัน ต้อง match ก่อน |
| **หนังจริงที่ควรศึกษา** | *Mad Max: Fury Road* (center framing ทำให้ตัดเร็วมากแต่ตามทัน = eye-trace), *2001* (match cut) | *O Brother, Where Art Thou?* (เกรดดิจิทัลทั้งเรื่องเป็นโทนเหลืองแห้ง), *Saving Private Ryan* (look แบบ bleach bypass) | ดูว่า look รับใช้เรื่องอย่างไร |

---

## 4. นำไปใช้กับ AI Image / Video และ pipeline ของเรา

### 4.1 หลักคิดเมื่อวัตถุดิบมาจาก AI
1. **สั่ง AI ให้ "เป็นกลาง" แล้วค่อยเกรดเอง** ดีกว่าสั่ง look แรงๆ ใน prompt เพราะ look ที่ generate ต่างครั้งจะไม่ตรงกัน เกรดทีหลังด้วยค่าเดียวกันทั้งคลิปจะ consistent กว่า เขียนใน prompt ว่า `neutral color balance, natural contrast, no heavy color grade` สำหรับช็อตที่จะเกรดเอง
2. **ถ้าต้องการ look จาก AI** ให้เขียน look เดียวกันแบบคำต่อคำทุก prompt ของคลิป (copy บล็อก "LOOK:" ไปทุกช็อต) และระบุ **ผลทางเทคนิค** ไม่ใช่แค่ชื่อ: `teal shadows, warm orange skin highlights, lifted blacks, soft highlight roll-off` แทน `cinematic`
3. **Wan/Kling (image-to-video) รักษาสีของภาพต้นทาง** — เกรดภาพนิ่งก่อนส่งเข้าโมเดลวิดีโอ หรือเกรดวิดีโอผลลัพธ์ทีหลังด้วย ffmpeg (อย่าหวังให้ motion prompt เปลี่ยนสี)
4. **วิดีโอ AI มักมี flicker ของความสว่างระหว่างเฟรม** — เกรดอย่าเพิ่ม contrast จนขยาย flicker; ใช้ `deflicker` ของ ffmpeg ถ้าจำเป็น
5. **สีสินค้าศักดิ์สิทธิ์:** ภาพแว่นจริง (cutout) วางบนเลเยอร์แยก เกรดเฉพาะฉากหลัง เหมือนที่ FX.md §1.6 ให้เกรด bg ไม่เกรดตัวละคร

### 4.2 ตัดต่อใน HyperFrames / rig.js
- จุดตัดใน `rig.js`: `R.cut(t, outId, inId)`, `R.dissolve(t, d, ...)`, `R.dip(t, d, ..., '#000')` — ทุก `t` ควรมาจาก**รายการ beat หรือจากเวลาคำในเสียงพูด** ไม่ใช่ตัวเลขกลมๆ ที่เดาเอา
- หาจังหวะเพลง: `npx hyperframes beats <song>` หรือ librosa (`librosa.beat.beat_track`) ใน `tools/soundtrack.py` แล้ว snap จุดตัดเข้ากับ beat ที่ใกล้สุด ลบ 1–2 เฟรม
- J/L cut ในโค้ด = เวลาเริ่มของ `<audio>` ของช็อตถัดไป **ไม่เท่ากับ** เวลาเริ่มของภาพ (J: เสียงเริ่ม `t − 0.4`, L: เสียงเก่าจบ `t + 0.5`)
- Cut on action: ให้ท่าทางของตัวละครเริ่มในช็อตเก่า (เช่น หันหน้าไปครึ่งทาง) แล้วตัดไปช็อตใหม่ที่ท่าเดิมทำต่อจากกลางทาง — ห้ามเริ่มท่าใหม่ตั้งแต่ศูนย์
- Grade ใน `fx.js`: `X.grade(sel, t, name, dur)` ชื่อที่มี: `night`, `dawn`, `memory`, `horror`, `noir`, `warm`, `cold`, `poster` (CSS filter บนเลเยอร์) — ใช้ `dur` 1–3 s สำหรับการเปลี่ยนเวลาในเรื่อง, `dur` ≈ 0 สำหรับเปลี่ยนฉาก

### 4.3 ffmpeg — ดู scope และเกรด
```bash
# ดู waveform แบบ parade และ vectorscope ของเฟรมที่ 3 วินาที (เซฟเป็น PNG แล้วเปิดดูด้วย Read)
ffmpeg -ss 3 -i in.mp4 -frames:v 1 -vf "waveform=display=parade:intensity=0.2" tmp/parade.png
ffmpeg -ss 3 -i in.mp4 -frames:v 1 -vf "format=yuv444p,vectorscope=mode=color3" tmp/vscope.png

# Primary correction: contrast/brightness/saturation/gamma
ffmpeg -i in.mp4 -vf "eq=contrast=1.06:brightness=0.01:saturation=1.08:gamma=1.0" -c:a copy out.mp4

# Curves: S-curve เบาๆ (ค่า x/y ช่วง 0–1) หรือใช้ preset
ffmpeg -i in.mp4 -vf "curves=master='0/0.03 0.25/0.22 0.75/0.80 1/0.97'" -c:a copy out.mp4
ffmpeg -i in.mp4 -vf "curves=preset=medium_contrast" -c:a copy out.mp4

# Teal-orange: เงาไป teal (ลดแดง เพิ่มน้ำเงิน), highlight ไปส้ม (เพิ่มแดง ลดน้ำเงิน)
ffmpeg -i in.mp4 -vf "colorbalance=rs=-0.06:gs=0.01:bs=0.07:rh=0.05:gh=0.01:bh=-0.05" -c:a copy out.mp4

# Bleach bypass แบบง่าย: ลด sat + เพิ่ม contrast + S-curve
ffmpeg -i in.mp4 -vf "eq=saturation=0.5:contrast=1.2,curves=preset=strong_contrast" -c:a copy out.mp4

# Creative/technical LUT (.cube)
ffmpeg -i in.mp4 -vf "lut3d=file=looks/film.cube:interp=tetrahedral" -c:a copy out.mp4

# ทั้ง chain: correction → look (ลำดับสำคัญ)
ffmpeg -i in.mp4 -vf "eq=gamma=1.03:saturation=1.05,colorbalance=rs=-0.04:bs=0.05:rh=0.04:bh=-0.03,curves=preset=medium_contrast" -c:a copy out.mp4
```
หมายเหตุ: ค่าใน `colorbalance` อยู่ในช่วง −1 ถึง 1 ค่าที่ใช้จริงควรเล็ก (±0.02–0.08) ค่าเกิน 0.15 มักทำให้ผิวเพี้ยน ตรวจผิวบน vectorscope ทุกครั้งหลังใส่ look

### 4.4 Export สำหรับ TikTok / Reels / YouTube (SDR Rec.709)
```bash
ffmpeg -i master.mp4 \
  -vf "scale=1080:1920:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 -profile:v high -r 30 \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000 \
  -movflags +faststart out-9x16.mp4
```
| แพลตฟอร์ม | ขนาด | หมายเหตุ |
|---|---|---|
| TikTok / Reels | 1080×1920 (9:16), 30 fps | ข้อความอยู่ใน safe zone (ไม่ชิดล่าง ~20% และขวาที่มีปุ่ม) |
| YouTube Shorts | 1080×1920 | เหมือนด้านบน |
| YouTube แนวนอน (story 16:9) | 1920×1080 | YouTube แนะนำ MP4, 4:2:0, VBR, ~10 Mbps ที่ 1080p (high fps ~15 Mbps), เสียง stereo 384 kbps |

- **ติด tag bt709 เสมอ** — ไม่ติด tag แล้วบางแอป/มือถือเดาเป็น bt601 ทำให้สีเลื่อน (เขียว/ส้มเพี้ยนเล็กน้อย) โดยเฉพาะภาพที่ render จาก Chrome (sRGB)
- **อย่าส่ง HDR** — แอปบนมือถือแปลง HDR → SDR เอง ผลไม่แน่นอน
- **ไฟล์ต้นฉบับคุณภาพสูงไว้ก่อน** (CRF 16–18) แพลตฟอร์มจะบีบซ้ำอยู่แล้ว ไฟล์ที่บีบหนักมาก่อนจะแตกสองชั้น (banding บนท้องฟ้า, ฉากหลัง gradient) — เพิ่ม `noise=alls=2:allf=t` เล็กน้อยช่วยลด banding
- **CapCut:** ถ้าผู้ใช้เกรดใน CapCut ให้ export 1080p/30fps, "Smart HDR" ปิด, ใช้ filter ตัวเดียวกันทุกคลิปในชุด แล้วปรับ intensity เท่ากัน

### 4.5 เครื่องมืออื่น
- **DaVinci Resolve (ฟรี):** มาตรฐานวงการเกรดสี — node tree (ช็อต/กลุ่ม/timeline), scopes ครบ, color management (RCM) แปลง log อัตโนมัติ, คู่มือ *Colorist Guide* ฟรีจาก Blackmagic
- **Premiere Pro:** Lumetri Color (Basic → Creative → Curves → HSL Secondary → Vignette) เรียงตามลำดับ correction → grade อยู่แล้ว
- **CapCut:** เร็ว แต่ไม่มี scope — ใช้ ffmpeg ส่งออกภาพ parade/vectorscope มาเช็คแทน

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ — สำหรับ look ใน AI image/video
1. **Neutral base (สำหรับเกรดเอง)**
   `Medium shot of a small eyewear shop counter at late afternoon, a Thai optician handing a pair of round titanium glasses to a customer, neutral white balance around 5600K, natural contrast with detail in shadows and highlights, no heavy color grade, no stylized look, realistic skin tones, flat even exposure suitable for color grading later, no text.`
2. **Teal-orange cinematic**
   `Close-up of a young woman trying on black acetate glasses in front of a shop mirror at dusk, cinematic teal-and-orange grade: cool teal shadows and background, warm orange skin highlights, skin tones natural and not oversaturated, gentle S-curve contrast, soft highlight roll-off, the glasses frames keep their true black color, subtle 35mm film grain, no text.`
3. **Bleach bypass / gritty**
   `Wide shot of a rainy Bangkok alley at night outside a closed optical shop, bleach bypass look: desaturated muted colors, deep rich blacks, high contrast, silvery highlights on wet pavement, harsh sodium streetlight, gritty texture, slightly crushed shadows but readable shapes, no text.`
4. **Film emulation (warm memory)**
   `An elderly man reading an old letter by a window, Kodak Portra 400 film emulation: warm creamy highlights, lifted soft blacks, gentle green-cyan tint in the shadows, low contrast, fine natural grain, slight halation glow around the bright window, nostalgic calm mood, no text.`
5. **Consistent series look (วางท้ายทุก prompt ในคลิปเดียวกัน)**
   `LOOK: soft cinematic grade, black point slightly lifted, highlights rolled off without clipping, midtones neutral, shadows cool blue-green, highlights warm amber, saturation 80% of natural except the eyewear which keeps true product color, consistent lighting direction from frame left, same grade in every shot of this sequence.`
   (สำหรับวิดีโอ Wan/Kling ให้เพิ่ม: `stable exposure, no flicker, color stays constant through the shot`)

---

## 6. ข้อผิดพลาดที่พบบ่อย
- ตัดเพราะ "ช็อตนี้นานแล้ว" แทนที่จะถามว่าอารมณ์/เรื่องต้องการอะไร (ลืม Rule of Six ข้อ 1–2)
- ตัดทุก beat ตลอดทั้งคลิป → เหนื่อยตาและไม่มี build-up; ต้องมีช่วงยาวให้ช่วงสั้นมีความหมาย
- จุดตัดช้ากว่า beat 1–3 เฟรม ทำให้รู้สึก "หลวม" (ควรตรงหรือเร็วกว่าเล็กน้อย)
- ตัดภาพพร้อมเสียงทุกครั้ง (hard cut ทั้งคู่) ไม่เคยใช้ J/L cut → ดูเหมือนสไลด์โชว์
- ambience หายวูบที่รอยตัดภายในฉากเดียวกัน
- เปิดคลิปด้วยโลโก้/fade จากดำ เสีย 1–2 วินาทีที่มีค่าที่สุด
- ใส่ LUT/look ก่อนแก้ WB และ exposure → แต่ละช็อตเพี้ยนไม่เท่ากัน
- ใส่ LUT แปลง log บนภาพที่เป็น Rec.709 อยู่แล้ว (หรือแปลงซ้ำกับ color management) → ภาพคอนทราสต์จัด สีหลุด
- เกรดด้วยตาบนจอเดียวโดยไม่ดู scope; จอมือถือ/โน้ตบุ๊กที่ตั้ง night mode หรือ true tone หลอกสี
- Teal-orange แรงจนผิวคนกลายเป็นส้มเรืองแสง หรือ**กรอบแว่นเปลี่ยนสี** (ลูกค้ามาร้านแล้วสีไม่ตรง = เสียความเชื่อใจ)
- เพิ่ม saturation ทั้งภาพแทนการใช้ secondary กับสิ่งที่ต้องการให้เด่น
- เกรดทีละช็อตโดยไม่มี hero shot → ทั้งคลิปสีกระโดด
- export ไม่ติด tag bt709 / ใช้ yuv444p หรือ 10-bit ที่บางแอปเล่นไม่ได้ / ลืม `+faststart`
- loudness ไม่ normalize → คลิปเบากว่าคลิปอื่นในฟีด หรือดังจนแพลตฟอร์มลดเสียงลงและพีคแตก

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - ดูฉากบทสนทนา 1 นาทีจากหนังที่ชอบ จดเวลาทุกจุดตัด แล้วระบุว่าแต่ละจุดเป็น straight cut / J / L / cut on action / match cut และเกณฑ์ Murch ข้อไหนที่ทำให้ตัดตรงนั้น
  - ใช้ ffmpeg สร้างภาพ parade และ vectorscope ของ 3 เฟรมจากคลิปเก่าของเรา แล้วตอบ: จุดดำแตะพื้นหรือยัง? ผิวอยู่ใกล้ skin line ไหม? มีช่องสีไหนสูงเกินในส่วนที่ควรเป็นสีเทา?
- **ระดับ 2 (ประยุกต์):**
  - ทำ beat clip แว่น 10 วินาทีจากเพลงเดียวกัน 2 เวอร์ชัน: (ก) ตัดทุก beat ตลอด (ข) ตัดทุก 2 beat แล้วเร่งเป็นทุก beat 2 วินาทีก่อน drop เปรียบเทียบว่าแบบไหนรู้สึกมีพลังกว่าและเพราะอะไร
  - เอาภาพ AI 4 ช็อตของฉากเดียวกัน (generate คนละครั้ง) มา shot-match ด้วย `eq`/`colorbalance` ให้เท่ากับ hero shot แล้วใส่ look เดียวกันทั้งหมด แสดง parade ก่อน-หลัง
- **ระดับ 3 (เชี่ยวชาญ):**
  - ตัดต่อ story clip 45–60 วินาทีหนึ่งตอนให้ครบ: shot list พร้อมเหตุผลของทุกจุดตัด (อ้าง Rule of Six), J-cut ≥ 2 จุด, L-cut ≥ 2 จุด, cut on action ≥ 1, match cut ≥ 1 ที่มีความหมาย
  - ทำ "look bible" ของซีรีส์: correction chain มาตรฐาน + look 3 แบบ (ปกติ / ความทรงจำ / กลางคืน) เป็นคำสั่ง ffmpeg หรือ `.cube` พร้อมภาพตัวอย่างและ scope; export ตามข้อ 4.4 แล้วตรวจ −14 LUFS ด้วย `ffmpeg -af ebur128`
  - ให้คะแนนตามข้อ 8 จนได้ ≥ 8/10 และบันทึกบทเรียนลง `_craft/LEARNING-LOG.md`

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| จุดตัดมีเหตุผล | ทุกจุดตัดอธิบายได้ด้วย emotion/story/rhythm, ใช้ J/L/cut on action อย่างเหมาะสม | บางจุดตัดโดยไม่มีเหตุผล | ตัดตามเวลาสุ่ม ดูเหมือนสไลด์โชว์ |
| จังหวะและ hook | hook ใน 1.5 s แรก, จังหวะยาว-สั้นสลับ, ตรง beat (≤ 1 เฟรม) | ตรง beat แต่จังหวะซ้ำซาก | หลุด beat / เปิดช้า |
| เสียง | ambience ต่อเนื่อง, ducking ถูก, −14 LUFS ±1, ไม่มีคลิก | ระดับเพี้ยนเล็กน้อย | เสียงกระโดด พีคแตก หรือเสียงพูดจม |
| Correction และ consistency | ดำ/ขาว/WB/ผิวถูกต้องบน scope, ทุกช็อตในฉาก match กัน | ช็อตต่างกันเล็กน้อย | สีกระโดดระหว่างช็อต ผิวเพี้ยน |
| Look และ export | look รับใช้อารมณ์ สีสินค้าตรง, export 9:16/16:9 ถูก tag bt709 เล่นได้ทุกแอป | look แรงไปนิด หรือ export ขาดบางค่า | กรอบแว่นเปลี่ยนสี / ไฟล์ผิดสเปก |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- Rule of Six / Walter Murch:
  - StudioBinder — [Walter Murch's Rule of Six](https://www.studiobinder.com/blog/walter-murch-rule-of-six/)
  - No Film School — [6 'Rules' for Good Cutting According to Walter Murch](https://nofilmschool.com/2016/11/6-rules-good-cutting-according-oscar-winning-editor-walter-murch)
  - No Film School — [Is the Rule of Six incorrect about eye-trace?](https://nofilmschool.com/2018/08/editing-eye-trace-mind-rule-six-incorrect)
  - PremiumBeat — [Cutting on the Blink: Editing Tips from Walter Murch](https://www.premiumbeat.com/blog/cutting-on-the-blink-editing-tips-from-walter-murch)
- ประเภทการตัด (J/L, cut on action, match cut):
  - Adobe — [J-cut and L-cut](https://www.adobe.com/africa/creativecloud/video/discover/j-cut-and-l-cut.html)
  - Vimeo — [How and when to make Jump cuts, L-cuts, and J-cuts](https://vimeo.com/blog/post/guide-to-film-cuts)
  - PremiumBeat — [9 Essential Video Editing Cuts](https://www.premiumbeat.com/blog/9-essential-video-editing-cuts)
  - No Film School — [Eight Essential Cuts Every Video Editor Needs to Know](https://nofilmschool.com/essential-cuts-every-video-editor-needs-know)
- Color grading / scopes / log:
  - Blackmagic Design — [The Colorist Guide to DaVinci Resolve 20 (PDF)](https://documents.blackmagicdesign.com/UserManuals/DaVinci-Resolve-20-Colorist-Guide.pdf)
  - Blackmagic Design — [DaVinci Resolve Color](https://www.blackmagicdesign.com/products/davinciresolve/color)
  - Blackmagic Design — [DaVinci Resolve Training](https://www.blackmagicdesign.com/products/davinciresolve/training/color)
  - Envato Tuts+ — [How to Read Scopes in Resolve: Waveform, Parade, Histogram, Vectorscope](https://photography.tutsplus.com/tutorials/how-to-read-scopes-in-resolve-waveform-parade-histogram-vectorscope--cms-41868)
  - Frame.io Insider — [When to Use Color Scopes (and When Not To)](https://blog.frame.io/2023/09/18/when-to-use-color-scopes-and-when-not-to/)
  - Frame.io Insider — [When Should You Color Grade in Log vs. Linear?](https://blog.frame.io/2024/08/05/when-should-you-color-grade-in-log-linear/)
  - LibreTexts — [Video scopes for post-production](https://human.libretexts.org/Bookshelves/Theater_Film_and_Storytelling/Video_Production_Handbook/16%3A_The_Finishing_Process/16.05%3A_Video_scopes_for_post-production)
- มาตรฐานและ look:
  - Wikipedia — [Rec. 709](https://en.wikipedia.org/wiki/Rec._709)
  - Wikipedia — [3D lookup table](https://en.wikipedia.org/wiki/3D_lookup_table)
  - Wikipedia — [Bleach bypass](https://en.wikipedia.org/wiki/Bleach_bypass)
- ffmpeg:
  - FFmpeg — [FFmpeg Filters Documentation](https://ffmpeg.org/ffmpeg-filters.html) (eq, curves, colorbalance, lut3d, waveform, vectorscope, loudnorm)
- Export สเปกแพลตฟอร์ม:
  - YouTube Help — [YouTube recommended upload encoding settings](https://support.google.com/youtube/answer/1722171)
  - YouTube Help — [Video and audio formatting specifications](https://support.google.com/youtube/answer/4603579?hl=en)
  - Kapwing — [TikTok Video Resolutions and Size Guide](https://kapwing.com/resources/the-best-tiktok-video-size-guide-for-2022/)
  - ManyPixels — [TikTok ad sizes and specs (with measured safe zones)](https://www.manypixels.co/blog/social-media-design/tiktok-ad-specs)
- หมายเหตุ:
  - ตัวเลขน้ำหนัก Rule of Six (51/23/10/7/5/4) มาจากแหล่งที่สรุปหนังสือ ไม่ได้ตรวจกับต้นฉบับโดยตรง Murch เองย้ำว่าทำครบทั้ง 6 ข้อพร้อมกันไม่ได้และไม่จำเป็นต้องทำ
  - สเปก TikTok มาจากแหล่งรองที่ตัวเลขขั้นต่ำและขนาดไฟล์ไม่ตรงกัน (ทุกแหล่งตรงกันที่ 9:16 · 1080×1920) ควรเช็คหน้า help ของแพลตฟอร์มอีกครั้งก่อนลงโฆษณา
  - หลัก retention editing (hook 1.5 s, pattern interrupt 2–4 s, loop ending) และค่า colorbalance ที่แนะนำเป็นแนวปฏิบัติของวงการ/ประสบการณ์ ไม่ใช่กฎของแพลตฟอร์ม
  - ตัวอย่างหนังในข้อ 3 เป็นความรู้ทั่วไปของวงการ ไม่ได้ตรวจกับแหล่งในรอบนี้
