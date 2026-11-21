# บทที่ 5 — Camera Movement & Film Language (การเคลื่อนกล้องและภาษาภาพยนตร์)

> เป้าหมาย: เลือกการเคลื่อนกล้องและการตัดต่อจาก "ความหมาย" ไม่ใช่จากความสวย อธิบายได้ว่าทุก move และทุกคัตบอกอะไรกับคนดู แล้วสั่ง Wan/Kling/Runway หรือ `rig.js` ให้ได้ move นั้นทีละ shot
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21 · บทนี้ต่อยอดจาก [`GUIDE.md`](../GUIDE.md) หมวด 1 (shot grammar, 180°) และหมวด 2 (ตาราง move ↔ rig.js) จึงไม่อธิบายซ้ำ ให้เปิดคู่กัน

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — การเคลื่อนกล้องมี 2 แบบ: "หมุน" กับ "ย้าย"
สิ่งที่มือใหม่สับสนที่สุดคือ pan กับ truck และ tilt กับ pedestal ภาพดูคล้ายกันแต่ให้ความรู้สึกต่างกันมาก เพราะแบบหนึ่ง **ไม่มี parallax** และอีกแบบ **มี**

| กลุ่ม | Move | กล้องทำอะไร | Parallax | ความรู้สึก |
|---|---|---|---|---|
| **หมุนอยู่กับที่** (กล้องอยู่จุดเดิม) | **Pan** | หมุนซ้าย-ขวาบนขาตั้ง | ไม่มี (ฉากหน้า-หลังเลื่อนพร้อมกัน) | "หันไปมอง" = สายตาคน |
| | **Tilt** | ก้ม-เงย | ไม่มี | ไล่สายตาขึ้นลง, เผยความสูง |
| | **Roll / Dutch** | เอียงรอบแกนเลนส์ | ไม่มี | โลกผิดปกติ |
| **ย้ายตำแหน่ง** (ตัวกล้องเคลื่อนในอวกาศ) | **Dolly / Push-in / Pull-out** | เข้าหรือออกจากวัตถุ | มี (ของใกล้วิ่งเร็วกว่า) | "เข้าไปในใจ" / "ถอยออกมาดู" |
| | **Truck (crab)** | เลื่อนซ้าย-ขวาขนานวัตถุ | มีมาก | เดินคู่ไปกับตัวละคร, เผยของหลังเสา |
| | **Pedestal** | ยกขึ้น-ลงทั้งตัวกล้อง (มุมเลนส์เท่าเดิม) | มี | ตามระดับคนที่ลุก/นั่ง |
| | **Crane / Jib / Boom** | แขนยกกล้องไปทุกทิศ มักรวม pedestal + tilt | มีมาก | เปิดหรือปิดฉากใหญ่, มุมเหนือมนุษย์ |
| | **Orbit / Arc** | วนรอบวัตถุเป็นส่วนโค้ง | มีมาก | วัตถุกลายเป็นศูนย์กลางโลก, โรแมนติก/ฮีโร่ |
| **เลนส์ (ไม่ขยับกล้อง)** | **Zoom** | เปลี่ยนทางยาวโฟกัส | ไม่มี (แค่ crop/ขยาย) | ดูเป็น "เครื่องจักร", ข่าว, สารคดียุค 70 |
| | **Dolly zoom** | dolly + zoom สวนทาง ขนาดวัตถุคงที่แต่ perspective ฉากหลังยืด/หด | กลับด้าน | โลกถล่ม, ตระหนักรู้, เวียนหัว |
| **ระบบพยุง (ลักษณะการสั่น)** | **Locked-off / Tripod** | นิ่งสนิท | — | สังเกตการณ์, ตลก, สยองรอจังหวะ |
| | **Handheld** | ถือมือ มีการสั่นแบบมนุษย์ | — | ตื่นเต้น, สารคดี, ไม่ปลอดภัย |
| | **Steadicam** | ร่างกายคนเดิน แต่ภาพลื่นลอย | — | ลอยตามไปเหมือนผี/ผู้ติดตาม, long take |
| | **Gimbal** | มอเตอร์ 3 แกนกันสั่น (รุ่นพกพาของ steadicam) | — | คล้าย steadicam แต่ "ลื่นเกินไป" ถ้าไม่ระวัง |
| | **Drone** | บินสูง ไปไหนก็ได้ | มีมาก | establishing, อิสระ, ขนาดของโลก |
| **ความเร็วพิเศษ** | **Whip pan** | pan เร็วจนภาพเบลอเป็นเส้น | — | พลังงาน, ข้ามเวลา/สถานที่, ตลก |

หลักจำ: **Pan/tilt = กล้องเป็น "ดวงตา"**, **dolly/truck/crane = กล้องเป็น "ร่างกาย"** ที่อยู่ในฉาก ถ้าอยากให้คนดูรู้สึกว่า "อยู่ในห้องนั้นจริง" ต้องย้ายตำแหน่ง ไม่ใช่แค่หมุน

### 1.2 แรงจูงใจของการเคลื่อน (Motivation)
GUIDE.md บอกว่า "motivate every move" ส่วนนี้แยกให้ละเอียดว่า motivation มี 4 ชนิด เรียงจากมองเห็นง่ายไปยาก
1. **Physical motivation** — ตัวละครขยับ กล้องขยับตาม (ลูกค้าลุกจากเก้าอี้วัดสายตา → pedestal ขึ้นตาม) คนดูไม่รู้สึกว่ากล้องขยับเลย
2. **Attention motivation** — ตัวละครหันไปมอง เสียงดังนอกเฟรม → pan ไปทางนั้น (กล้องทำตัวเป็นความอยากรู้ของคนดู)
3. **Emotional motivation** — ไม่มีอะไรในฉากขยับ แต่อารมณ์เปลี่ยน → slow push-in บนหน้าคนที่เพิ่งได้ยินข่าวร้าย กล้อง "รู้สึก" แทนคนดู
4. **Narrative / authorial motivation** — กล้องรู้มากกว่าตัวละคร เช่น crane ขึ้นให้เห็นว่ามีคนแอบดูอยู่ (Hitchcock ชอบใช้เพื่อสร้าง suspense) หรือ truck ผ่านกำแพงไปเผยสิ่งที่ตัวละครยังไม่รู้

ถ้าตอบไม่ได้ว่า move นั้นอยู่ในข้อไหน แปลว่าเป็น **unmotivated move** ให้ตัดเป็น static + drift

### 1.3 ความเร็วและ Easing (ส่วนที่ทำให้ดู "แพง" หรือ "ถูก")
- **ความเร็ว = น้ำหนักของอารมณ์**: push-in 3–5 % ต่อวินาที = ครุ่นคิด; 10–20 % ต่อวินาที = ตกใจ/ตระหนัก; snap zoom ใน 4–8 F = มุกตลกหรือ action
- **Pan judder**: ที่ 24 fps ถ้า pan เร็วปานกลาง (ไม่เร็วพอจะเป็น whip และไม่ช้าพอจะลื่น) ภาพจะกระตุก (strobing) แนวปฏิบัติทั่วไปคือวัตถุไม่ควรวิ่งข้ามเฟรมเร็วกว่าประมาณ 5–7 วินาที ยกเว้นจะเร็วจนเป็น whip ไปเลย ใน 2D ของเรา motion blur ช่วยได้ (FX.md smear)
- **Ease = มีมือคนอยู่หลังกล้อง**: กล้องจริงมีมวล ต้องเร่งและหน่วงเสมอ
  - `sine.inOut` — dolly บนราง, ลื่นแบบหนัง
  - `power2.inOut` — move ที่มีแรงจูงใจชัด
  - `power3.out` / `expo.out` — snap: ออกตัวแรงแล้วค่อย ๆ จอด (เหมือนคนหันขวับ)
  - `back.out(1.2)` — overshoot เล็กน้อยแล้วเด้งกลับ = operator ถือมือที่เบรกเลยไปนิด ใช้กับ handheld/whip จะดูจริงมาก
  - `none` (linear) — เฉพาะ drift ต่อเนื่องหรือ truck ตามคนเดินเท่านั้น ถ้าใช้กับ push-in ที่เริ่ม-จบในช็อต จะดูเหมือนเครื่องจักร
- **Settle**: ให้กล้องหยุดนิ่ง 6–12 F ก่อนคัต (ตรงกับ GUIDE.md) ยกเว้นตั้งใจ "cut in motion" ที่ต่อกับช็อตถัดไปที่เคลื่อนทิศเดียวกันและความเร็วใกล้กัน

### 1.4 ขั้นสูง — กล้องในฐานะผู้เล่าเรื่อง
- **มุมมองของกล้อง 3 แบบ**:
  - *Objective* — กล้องเป็นผู้สังเกต (wide, static) ใช้เปิดฉากและให้คนดูตัดสินเอง
  - *Subjective* — กล้องเป็นตัวละคร (POV, handheld ที่ระดับตา) คนดูถูกบังคับให้รู้สึกเหมือนตัวละคร
  - *Omniscient / authorial* — กล้องรู้มากกว่าทุกคน (crane สูง, truck เผยสิ่งที่ซ่อนอยู่) = suspense
- **Shot size เป็นระยะทางทางจิตใจ** (ต่อจาก GUIDE.md ตาราง 1): ระยะห่างของกล้องคือระยะที่คนดูยืนห่างจากตัวละคร
  - wide = คนแปลกหน้า
  - medium = คนรู้จัก
  - close-up = คนรัก หรือศัตรูที่หน้าชิดกัน
  - การ **เปลี่ยน** ระยะ (ด้วย move หรือคัต) จึงเท่ากับเปลี่ยนความสัมพันธ์ระหว่างคนดูกับตัวละคร
- **POV ที่ดีต้องมี 3 ช็อต**: (1) คนมอง → (2) สิ่งที่เห็น (POV) → (3) ปฏิกิริยาของคนมอง ถ้าขาดข้อ 3 คนดูจะไม่รู้ว่าควรรู้สึกอย่างไร
- **OTS: clean vs dirty**
  - *dirty single / dirty OTS* — มีบ่าหรือศีรษะของอีกคนในเฟรม = สองคนยังเชื่อมกัน
  - *clean single* — ตัดอีกคนออกจากเฟรม = เริ่มโดดเดี่ยว ไม่ฟังกัน
  - การเปลี่ยนจาก dirty → clean กลางบทสนทนาเป็นวิธีบอกว่าความสัมพันธ์แตก โดยไม่ต้องมีบทพูด
- **Insert vs Cutaway**
  - *insert* = รายละเอียดของสิ่งที่อยู่ในฉากเดียวกัน (เลนส์ร้าว, ใบเสร็จ)
  - *cutaway* = ภาพนอกฉากหลัก (นาฬิกาบนผนัง, ถนนข้างนอก) ใช้ย่นเวลาหรือซ่อนรอยต่อ
- **Reaction shot**: ในหลายฉาก หน้าคนฟังสำคัญกว่าหน้าคนพูด เพราะคนดูเรียนอารมณ์จากคนฟัง (คือ Kuleshov ในทางปฏิบัติ)
- **Montage theory**
  - **Kuleshov effect** (ทศวรรษ 1910–1920): Lev Kuleshov ตัดใบหน้านิ่งของนักแสดงคนเดียวกันสลับกับภาพต่างกัน (ซุป, โลงศพ, ผู้หญิง) คนดูรายงานว่าใบหน้าแสดงอารมณ์ต่างกัน ทั้งที่เป็นฟุตเทจเดิม → **ความหมายเกิดจากการวางภาพต่อกัน ไม่ได้อยู่ในภาพเดี่ยว** (รายละเอียดของการทดลองต้นฉบับแต่ละแหล่งเล่าไม่ตรงกัน และฟิล์มต้นฉบับไม่หลงเหลือ ให้ถือเป็น "หลักการ" มากกว่า "ผลวิจัย")
  - **Pudovkin — linkage**: ช็อตต่อกันเหมือนอิฐ สร้างเรื่องทีละก้อน (ฐานของ continuity editing)
  - **Eisenstein — collision (dialectical montage)**: ภาพ A ปะทะภาพ B เกิดความหมาย C ที่ไม่มีในภาพไหนเลย Eisenstein แบ่ง montage เป็น 5 แบบ
    1. *metric* — คัตตามความยาวคงที่ เหมือนจังหวะเพลง
    2. *rhythmic* — คัตตามการเคลื่อนไหวในภาพ
    3. *tonal* — คัตตามอารมณ์/โทน (แสง, รูปทรง)
    4. *overtonal* — ผสมสามแบบแรก
    5. *intellectual* — วางภาพเพื่อสร้าง "ความคิด" เช่น ใน *Strike* (1925) ที่ตัดการปราบคนงานสลับกับการฆ่าวัว
- **Continuity editing (ระบบ Hollywood)**: เป้าหมายคือทำให้คนดู "ไม่เห็นรอยคัต" เครื่องมือหลัก
  - กฎ 180° (GUIDE.md)
  - **กฎ 30°** — ถ้าคัตไปยังวัตถุเดิม กล้องต้องย้ายมุมอย่างน้อย ~30° หรือเปลี่ยน shot size ชัดเจน ไม่งั้นจะเกิด jump cut โดยไม่ตั้งใจ
  - **match on action** — คัตกลางการเคลื่อนไหว
  - **eyeline match** — คนมองไปทางไหน ช็อตถัดไปต้องอยู่ทางนั้น
  - **eye trace** — จุดที่ตาคนดูจ้องอยู่ตอนจบช็อต A ควรเป็นจุดเดียวกับที่สิ่งสำคัญปรากฏในช็อต B (สำคัญมากในแนวตั้ง 9:16)
  - **screen direction** — การเคลื่อนที่ในเฟรมคงทิศข้ามช็อต
- **การข้ามเส้น 180° อย่างถูกวิธี** (สิ่งที่ GUIDE.md ยังไม่พูด): (1) ให้กล้องเคลื่อนข้ามเส้นต่อหน้าคนดู (dolly/orbit), (2) คั่นด้วย neutral shot ตรงเส้นพอดี (ตัวละครเดินเข้าหากล้อง), (3) ให้ตัวละครเดินข้ามเอง, (4) คั่นด้วย insert แล้วตั้งแกนใหม่ — หรือ **จงใจ** กระโดดข้ามเส้นเพื่อบอกว่าสถานการณ์พลิก/ความสัมพันธ์แตก
- **Motif**: ภาพ เสียง หรือ move ที่ซ้ำและเปลี่ยนความหมายตามเรื่อง เช่น ให้ "push-in ช้าบนแว่นที่วางบนโต๊ะ" ปรากฏ 3 ครั้งใน 3 สภาพ (ใหม่ → ร้าว → ซ่อมแล้ว) คนดูจะอ่านเส้นเรื่องจาก motif ได้โดยไม่ต้องบรรยาย
- **Subtext**: สิ่งที่ภาพบอกแต่บทไม่พูด เช่น ตัวละครพูดว่า "ไม่เป็นไร" แต่กล้อง pull-out ช้า ๆ จนเธอตัวเล็กในห้องว่าง คนดูจะเชื่อกล้องมากกว่าคำพูดเสมอ

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Pan / Tilt / Roll | หมุนซ้ายขวา / ก้มเงย / เอียงรอบแกนเลนส์ — ไม่มี parallax |
| Dolly in/out, Push-in, Pull-out | ย้ายกล้องเข้า/ออกจากวัตถุ |
| Truck (crab) left/right | เลื่อนกล้องขนานวัตถุ |
| Pedestal up/down | ยกหรือลดกล้องทั้งตัวในแนวดิ่ง |
| Crane / Jib / Boom | แขนยกกล้อง ทำ move สูง-กว้าง |
| Orbit / Arc shot | วนรอบวัตถุ (บางส่วน 90°/180° หรือครบ 360°) |
| Tracking / Follow shot | กล้องเคลื่อนตามวัตถุที่เคลื่อนที่ (นำหน้า, ตามหลัง, ข้าง) |
| Zoom / Snap zoom / Crash zoom | เปลี่ยนทางยาวโฟกัส / ซูมเร็วฉับ |
| Dolly zoom (Vertigo effect, Hitchcock zoom) | dolly กับ zoom สวนทาง วัตถุขนาดเท่าเดิมแต่ฉากหลังยืด/หด |
| Whip pan (swish pan) | pan เร็วจนเบลอ ใช้เป็นทรานสิชัน |
| Handheld / Steadicam / Gimbal / Drone | ระบบพยุงกล้อง ให้ลายมือการสั่นต่างกัน |
| Long take / Oner | ช็อตยาวไม่มีคัต มักใช้ steadicam |
| Motivated move | move ที่มีเหตุจากตัวละคร ความสนใจ หรืออารมณ์ |
| Ease in / ease out | เร่งออก / หน่วงเข้า ของกล้อง |
| POV | ภาพจากสายตาตัวละคร |
| OTS (dirty / clean) | ข้ามไหล่ / ช็อตเดี่ยวที่มีหรือไม่มีอีกคนในเฟรม |
| Insert / Cutaway | รายละเอียดในฉาก / ภาพนอกฉาก |
| Reaction shot | หน้าคนฟังหรือคนเห็น |
| Kuleshov effect | ความหมายของหน้าเปลี่ยนตามภาพที่ตัดต่อคู่ |
| Montage (Soviet) / Intellectual montage | การปะทะของภาพสร้างความหมายใหม่ |
| Continuity editing | ระบบตัดต่อให้รอยคัตล่องหน |
| 180° rule / 30° rule | แกนของฉาก / มุมขั้นต่ำเมื่อคัตวัตถุเดิม |
| Eyeline match / Eye trace | ต่อสายตาตัวละคร / ต่อจุดที่ตาคนดูจ้อง |
| Screen direction | ทิศการเคลื่อนที่ในเฟรม คงเดิมข้ามช็อต |
| Match on action / Match cut | คัตกลางการเคลื่อน / คัตด้วยรูปทรงหรือการเคลื่อนที่ซ้ำกัน |
| Jump cut | คัตวัตถุเดิมมุมใกล้เดิมจนภาพกระโดด (ผิดพลาดหรือจงใจ) |
| Motif / Subtext | ภาพซ้ำที่สะสมความหมาย / ความหมายที่ไม่ได้พูดออกมา |

---

## 3. ตัวอย่างงานจริง (ผู้กำกับใช้อย่างไร)
| งาน | เทคนิค | ทำอะไรกับคนดู |
|---|---|---|
| *Vertigo* (Alfred Hitchcock, 1958) | dolly zoom ลงปล่องบันไดหอระฆัง (ช่างภาพ second unit Irmin Roberts ได้รับเครดิตว่าเป็นผู้คิดวิธีถ่าย) | ทำให้คนดู "เป็น" อาการกลัวความสูงของ Scottie ไม่ใช่แค่ดูเขากลัว จึงได้ชื่อ Vertigo effect |
| *Jaws* (Steven Spielberg, 1975) | dolly zoom บนหน้า Brody ที่ชายหาด ตอนเห็นฉลาม | Hitchcock ใช้เทคนิคนี้สื่อความเวียนหัวและความลึก ส่วน Spielberg ใช้สื่อ "ช็อกและไม่สบายใจ" — move เดียวกัน ความหมายต่างกันตามบริบท |
| *Rocky* (John G. Avildsen, 1976) | Steadicam วิ่งขึ้นบันไดพิพิธภัณฑ์ฟิลาเดลเฟีย ถือโดย Garrett Brown ผู้ประดิษฐ์ Steadicam | กล้องวิ่งไปพร้อมฮีโร่ คนดูรู้สึกเหนื่อยและชนะไปด้วย ซึ่ง dolly บนรางทำไม่ได้ |
| *Goodfellas* (Martin Scorsese, 1990) | long take Steadicam เข้าไนต์คลับ Copacabana ทางประตูหลัง ผ่านครัว (operator Larry McConkey, DP Michael Ballhaus) | กล้องไม่คัตเลย = โลกเปิดทางให้ Henry ทุกประตู คนดูหลงเสน่ห์อำนาจไปพร้อมกับ Karen |
| *Battleship Potemkin* (Sergei Eisenstein, 1925) | ฉากบันไดโอเดสซา: คัตถี่ สลับทหารก้าวเป็นจังหวะกับใบหน้าชาวบ้าน รถเข็นเด็กไหลลงบันได | rhythmic + tonal montage ยืดเวลาจริงให้ยาวกว่าที่เกิด สร้างความตื่นตระหนกด้วยการตัดต่อล้วน |
| การทดลองของ Kuleshov (1910s–20s) | หน้านิ่งเดียวตัดคู่กับภาพต่างกัน | พิสูจน์ว่าการแสดง "ครึ่งหนึ่ง" เกิดที่โต๊ะตัดต่อ — เหตุผลที่เราต้องมี reaction shot |
| Hitchcock โดยทั่วไป | กล้องรู้มากกว่าตัวละคร (เช่นให้คนดูเห็นระเบิดใต้โต๊ะก่อน) | สร้าง suspense แทน surprise: authorial motivation |

**ถอดบทเรียนสำหรับร้านแว่น**: แบรนด์ที่ใช้ move ดีไม่ได้ใช้ move เยอะ แต่ใช้ **move เดียวที่ตรงความหมาย** ในจังหวะที่เรื่องหักเห
- *ตัวอย่าง*: ลูกค้าสวมแว่นใหม่แล้วมองเห็นชัดครั้งแรก
  - dolly zoom สั้น ๆ 1 วินาที = "โลกเปลี่ยน" (ถ้าใช้ตลอดคลิปจะไม่เหลือความหมาย)
  - ตามด้วย POV ที่ rack focus จากเบลอเป็นคม
  - ปิดด้วย reaction shot ยิ้ม

---

## 4. นำไปใช้กับ AI Image / Video
1. **คำศัพท์กล้องเป็นภาษากลางของ AI video**: ทั้ง Kling, Runway, Wan, Luma เข้าใจคำ `dolly in`, `pan left`, `orbit`, `crane up`, `static shot` ข้อแนะนำที่หลายแหล่งตรงกัน
   - **หนึ่ง move ต่อหนึ่งช็อต** — ถ้าสั่งสอง move พร้อมกัน ผลมักสับสน ถ้าต้องการสอง move ให้แยกเป็นสองคลิปแล้วคัต
   - **ระบุความเร็ว** (`slow`, `gradual`, `smooth`)
   - **ระบุจุดศูนย์กลางของ orbit** และระยะโค้ง (90°/180°/360°)
   - เขียนแบบ **บวก** (บอกสิ่งที่ต้องการ) มากกว่าแบบ **ลบ**
2. **Runway**: คู่มือแนะนำโครงสร้าง `[Camera] shot of [subject] [action] in [environment]` และสำหรับ image-to-video ให้เขียน `The camera [motion] as the subject [action]` — ภาพนิ่งบอก "ฉาก" แล้ว prompt มีหน้าที่บอก "การเคลื่อน" ไม่ต้องบรรยายของในภาพซ้ำ ถ้าต้องการกล้องนิ่งให้เขียนย้ำ `the camera remains locked`
3. **Kling**: ใช้ camera control (pan/tilt/zoom/roll ฯลฯ) หรือเขียนใน prompt ก็ได้ ให้เลือกวิธีใดวิธีหนึ่ง ถ้าตั้ง slider แล้วเขียน move ขัดกันใน prompt ภาพจะไหล
4. **Wan 2.2 (ของเรา: `tools/wan.py`, TI2V 5B, 5 s)**
   - คู่มือของ Alibaba แบ่ง prompt เป็น Entity / Scene / Motion / **Aesthetic control** (แสง, shot size, มุม, เลนส์, camera movement) / Stylization และเตือนว่า prompt ส่วนใหญ่อ่อนเพราะขาดส่วน aesthetic control
   - ถ้าต้องการกล้องนิ่ง ให้ใส่ `static shot` / `fixed shot`
   - ComfyUI มี workflow **Wan2.2 Fun Camera** ที่รับ trajectory กล้องเป็นพารามิเตอร์ (ยังไม่ได้ติดตั้งในเครื่องเรา) ถ้าต้องการ orbit แม่น ๆ ควรใช้ workflow นั้นแทนการเขียน prompt
   - ข้อจำกัดของ 5B: move ใหญ่ (orbit 180°) มักทำให้หน้าและกรอบแว่นบิด ควรใช้ move เล็ก เช่น slow push-in หรือ slight truck
5. **FLUX schnell / Codex (ภาพนิ่ง)**: ภาพนิ่งเคลื่อนไม่ได้ แต่ **ต้องออกแบบภาพให้รองรับ move ที่จะทำ**
   - push-in → เว้นขอบให้ crop ได้ และวางจุดเด่นตรง third
   - truck → สร้างฉากหน้า-กลาง-หลังแยกชั้น (เพื่อ parallax ใน 2.5D/`depth.py`)
   - whip → ทำภาพ A และ B ที่มีทิศ motion blur เดียวกัน
   - สั่ง `wide 21:9 plate with extra room on the right` เมื่อจะ pan ไปทางขวา
6. **`rig.js` (คลิปการ์ตูนของเรา)** — การ map ตาม GUIDE.md หมวด 2 ข้อเพิ่มเติมจากบทนี้
   - pan จริง = เปลี่ยน `px` **โดยให้ทุกเลเยอร์ `--d` เท่ากัน** (ไม่มี parallax) ส่วน truck = เปลี่ยน `px` โดยให้เลเยอร์ `--d` ต่างกัน
   - เลือกให้ตรงความหมายข้อ 1.1: `cam.move(t, 3, { s: '+=.15' }, 'sine.inOut')` = emotional push-in
   - `cam.drift(t0, t1, 4)` = locked-off ที่ "ยังหายใจ"; amp 8–12 + `shake` เล็ก = handheld
   - `cam.vertigo(t, 1.2, '#bg', .3)` = dolly zoom — ใช้ไม่เกินครั้งเดียวต่อตอน
   - whip = `cam.move` 6–8 F `expo.inOut` แล้ว `R.cut` ตรงกลางที่เบลอที่สุด
   - orbit ทำไม่ได้จริงใน 2D แต่ปลอมได้ด้วย truck + เลื่อน fg สวนทาง + slide หน้าตัวละคร 3/4 (GUIDE.md หลัก solid drawing)
7. **HyperFrames**: move แบบ punch-in, Ken Burns, whip handoff ของคลิป beat ใช้ skill `hyperframes-keyframes` ซึ่งใช้ easing ชุดเดียวกับข้อ 1.3
8. **ภาษาภาพยนตร์ใช้ในการตัดต่อ AI เช่นกัน**: คลิปจาก AI 5 วินาทีหลายคลิปจะไม่เป็นเรื่องเล่าถ้าไม่วางตาม continuity ต้องคุมทิศมอง (eyeline) และทิศเดินในทุก prompt ด้วยคำอย่าง `looking toward frame right`, `walking from left to right` มิฉะนั้น AI จะสุ่มทิศให้และกฎ 180° จะพัง

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ (สำหรับ image-to-video: Wan / Kling / Runway)
1. **Emotional push-in (ลูกค้าเห็นชัดครั้งแรก)**
   `Medium close-up of an elderly Thai woman in a small eyewear shop putting on new thin gold-rim glasses. The camera slowly dollies in toward her face over five seconds, smooth and steady, as her eyes widen and a soft smile appears. Warm 3200K shop lamps, background shelves softly out of focus, cinematic, 24 fps.`
2. **Slow orbit สินค้า (ระบุศูนย์กลางและระยะโค้ง)**
   `Black titanium eyeglass frames standing on a polished teak counter. The camera performs a slow 90-degree orbit to the right around the frames, keeping them centred and the same size in frame, lens reflections sliding across the glass. Dark background, single soft key light from above, shallow depth of field, no text.`
3. **Truck + parallax ตามคนเดิน (screen direction ซ้าย→ขวา)**
   `Wide shot of a young Thai man walking from left to right along a Hua Hin beachfront promenade at golden hour, wearing tortoiseshell sunglasses. The camera trucks right alongside him at walking pace, palm trees in the foreground passing faster than the sea behind. Smooth gimbal movement, warm backlight, gentle lens flare.`
4. **Locked-off สำหรับมุก/ความสยอง (เน้นกล้องนิ่ง)**
   `Static shot, the camera remains completely locked. A dim Bangkok shophouse eyewear shop at 2 a.m., one desk lamp lit over an empty optometry chair. After a pause, the chair slowly turns by itself toward the camera. No camera movement, low-key cool moonlight from the window, deep shadows, subtle film grain.`
5. **Handheld POV (subjective)**
   `First-person POV, handheld camera with natural slight shake, walking through a busy Chatuchak market aisle, blurry crowds and hanging signs out of focus. The view stops at a stall of colourful vintage glasses and the camera gently tilts down toward a pair of round red frames as they come into sharp focus. Daylight, documentary feel.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- ใช้ zoom แทน dolly เพราะง่าย ทำให้ภาพแบน ไม่มี parallax คนดูรู้สึกว่ามองผ่านกล้องส่องทางไกล ไม่ได้อยู่ในฉาก
- ใส่ move ทุกช็อต (ตามสูตร "ให้คลิปไม่นิ่ง") จน move ไม่มีน้ำหนักเมื่อถึงจังหวะสำคัญ
- move กับอารมณ์สวนกัน เช่น orbit แบบฮีโร่บนบทสนทนาเศร้า หรือ handheld ในโฆษณาเลนส์ที่ควรสงบ
- ใช้ easing แบบ linear กับ push-in ที่เริ่มและจบในช็อต ทำให้ออกตัวกระตุกเหมือนเครื่องจักร
- pan ความเร็วกลาง ๆ ที่ 24 fps จนภาพกระตุก (judder)
- POV ไม่มี reaction shot ตามหลัง คนดูจึงไม่รู้ว่าต้องรู้สึกอย่างไร
- คัตไปวัตถุเดิมด้วยมุมต่างน้อยกว่า 30° และขนาดใกล้เดิม ทำให้เกิด jump cut ที่ไม่ได้ตั้งใจ
- คลิป AI หลายคลิปที่ทิศมอง/ทิศเดินสุ่ม ทำให้ตัวละครดูเหมือนหันหนีกันในบทสนทนา
- ใช้ dolly zoom / whip / crash zoom ซ้ำหลายครั้งในตอนเดียว จนกลายเป็นลูกเล่นแทนความหมาย
- (AI) สั่งหลาย move ใน prompt เดียว (`dolly in, then orbit, then crane up`) ทำให้ได้ภาพไหลไม่มีทิศ
- (AI) สั่ง orbit ใหญ่กับ Wan 5B บนหน้าคนหรือกรอบแว่น ทำให้ทรงกรอบบิด ควรเลือก move เล็ก
- (AI) บรรยายของในภาพซ้ำใน image-to-video แทนการบรรยายการเคลื่อน ทำให้โมเดลเปลี่ยนภาพแทนที่จะขยับกล้อง

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - ดูฉาก Copacabana ใน *Goodfellas* และฉากชายหาดใน *Jaws* เขียนว่าแต่ละ move อยู่ใน motivation แบบไหน (ข้อ 1.2) และถ้าเปลี่ยนเป็นกล้องนิ่ง ความหมายจะหายไปอย่างไร
  - ใน `rig.js` ทำช็อตเดียวกัน 2 แบบ: pan (ทุกเลเยอร์ `--d:1`) กับ truck (`--d` .8/1/1.3) แล้วเขียนอธิบายว่าความรู้สึกต่างกันอย่างไร
- **ระดับ 2 (ประยุกต์):**
  - ทำ Kuleshov test ของร้าน: ใช้ภาพหน้าลูกค้านิ่ง (FLUX) ตัดคู่กับ 3 insert (ใบเสร็จราคาแพง / แว่นของคุณยายที่เสียไปแล้ว / สุนัขวิ่งเล่น) ให้ทีม 3 คนดูแล้วทายอารมณ์โดยไม่บอกโจทย์
  - ทำคลิป Wan 3 คลิปจากภาพเดียวกัน: `static shot` / `slow dolly in` / `slow truck right` แล้วบันทึกว่าแบบไหนรักษาทรงกรอบแว่นได้ดีที่สุด
- **ระดับ 3 (เชี่ยวชาญ):**
  - เขียน shot list ของคลิป 30 วินาที "แว่นของพ่อ" โดย
    - ทุกช็อตต้องมี shot size, move, motivation, easing, ทิศมอง/ทิศเดิน
    - ใช้ motif อย่างน้อย 1 อย่าง (เช่น push-in บนแว่นซ้ำ 3 ครั้งใน 3 สภาพ)
    - มีการข้ามเส้น 180° ที่จงใจ 1 ครั้งพร้อมเหตุผล
    - มี subtext ที่ภาพขัดกับคำบรรยาย 1 จุด
  - สร้างคลิปด้วย `rig.js` หรือ Wan + HyperFrames แล้วประเมินตามเกณฑ์ข้อ 8 จนได้ ≥ 8/10 บันทึกบทเรียนใน `LEARNING-LOG.md`

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| Motivation | ทุก move อธิบายได้ว่ามาจากตัวละคร ความสนใจ อารมณ์ หรือผู้เล่าเรื่อง | มี move ลอย ๆ 1–2 จุด | move สุ่ม หรือขยับทุกช็อตโดยไม่มีเหตุผล |
| Speed & easing | ความเร็วเข้ากับอารมณ์ ออกตัวและจอดนุ่ม settle ก่อนคัต | กระตุกหรือเร็ว/ช้าผิดจังหวะบางจุด | linear แข็ง, judder, คัตกลาง move โดยไม่ตั้งใจ |
| Shot size & coverage | ขนาดภาพไล่ตามอารมณ์, มี insert และ reaction ที่จำเป็น | ขาด reaction หรือ insert 1 จุด | ใช้ CU หมดตั้งแต่ต้น หรือไม่มีช็อตคนฟังเลย |
| Continuity | 180°, 30°, eyeline, screen direction ถูกทั้งหมด (หรือหักอย่างจงใจและมีเหตุผล) | หลุด 1 จุดที่ไม่ทำให้สับสน | คนดูงงว่าใครอยู่ตรงไหน มองใคร ไปทางไหน |
| ความหมายเชิงภาษา | มี motif หรือ subtext ที่ภาพเล่าเกินคำบรรยาย | ภาพตรงกับคำบรรยายแต่ไม่เพิ่มอะไร | ภาพขัดกับเรื่องโดยไม่ตั้งใจ |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- การเคลื่อนกล้องและอุปกรณ์:
  - StudioBinder — [Types of camera rigs in film](https://www.studiobinder.com/blog/types-of-camera-rigs-in-film/)
  - MasterClass — [Guide to Camera Moves: 13 Types of Camera Movement](https://masterclass.com/articles/guide-to-camera-moves)
  - Videomaker — [Camera movement: 11 techniques you should master](https://www.videomaker.com/article/14221-camera-movement-techniques-tilt-pan-zoom-pedestal-dolly-and-truck?amp=1)
  - StudioBinder — [What is a Steadicam shot](https://www.studiobinder.com/blog/what-is-a-steadicam-shot)
  - Columbia Film Glossary — [Steadicam Shot](https://filmglossary.ccnmtl.columbia.edu/term/steadicam-shot)
- Dolly zoom:
  - Wikipedia — [Dolly zoom](https://en.wikipedia.org/wiki/Dolly_zoom)
  - StudioBinder — [What is the Vertigo effect](https://www.studiobinder.com/blog/what-is-the-vertigo-effect/)
  - PremiumBeat — [The Dolly Zoom: film history and video tutorial](https://www.premiumbeat.com/blog/the-dolly-zoom-film-history-and-video-tutorial)
  - Guinness World Records — [First shot using 'dolly zoom'](https://www.guinnessworldrecords.com/world-records/first-shot-using-dolly-zoom)
  - No Film School — [What Moment From 'Jaws' Did Spielberg Borrow From Hitchcock?](https://nofilmschool.com/spielberg-borrow-from-hitchcock)
- Steadicam ในงานจริง:
  - Filmmaker Magazine — [Larry McConkey on filming the Goodfellas Copacabana tracking shot](https://filmmakermagazine.com/?p=93916)
  - No Film School — [How Was the Copa Long Take in 'Goodfellas' Shot?](https://nofilmschool.com/goodfellas-copa-long-take)
  - DGA Quarterly — [Shot to Remember: Rocky](https://www.dga.org/craft/dgaq/issues/1201-winter-2012/shot-to-remember-rocky)
- Montage theory:
  - Wikipedia — [Kuleshov effect](https://Www.Wikipedia.org/wiki/Kuleshov_effect)
  - Wikipedia — [Soviet montage theory](https://en.wikipedia.org/wiki/Soviet_montage_theory)
  - StudioBinder — [Soviet montage theory](https://www.studiobinder.com/blog/soviet-montage-theory/)
  - EBSCO Research Starters — [Kuleshov and Pudovkin introduce montage filmmaking](https://www.ebsco.com/research-starters/film/kuleshov-and-pudovkin-introduce-montage-filmmaking)
  - Reframing Cinema (Pressbooks) — [Editing: Constructing Time and Space](https://pressbooks.pub/reframingcinema/?p=67)
- Continuity editing:
  - StudioBinder — [What is continuity editing in film](https://www.studiobinder.com/blog/what-is-continuity-editing-in-film/)
  - StudioBinder — [What is an eyeline match](https://www.studiobinder.com/blog/what-is-an-eyeline-match/)
  - StudioBinder — [What is screen direction in film](https://www.studiobinder.com/blog/what-is-screen-direction-in-film/)
  - StudioBinder — [What is the 180 degree rule](https://www.studiobinder.com/blog/what-is-the-180-degree-rule/)
  - Wikipedia — [Eyeline match](https://en.wikipedia.org/wiki/Eyeline_match)
- AI video camera control:
  - Kling — [How to Control Camera Angles and Movements in AI](https://kling.ai/blog/ai-camera-control-movement-prompts-guide)
  - Runway — [AI camera prompts](https://runway.com/resources/ai-camera-prompts)
  - Runway Academy — [Prompt guide](https://academy.runwayml.com/prompt-guide)
  - Runway Help — [Image to Video Prompting Guide](https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide)
  - Alibaba Cloud Model Studio — [Video generation prompt guide](https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt)
  - ComfyUI docs — [Wan2.2 Fun Camera](https://docs.comfy.org/tutorials/video/wan/wan2-2-fun-camera)
  - Luma AI — [AI camera movement prompts](https://lumalabs.ai/news/ai-camera-movement-prompts)
- หมายเหตุ:
  - ตัวเลขความเร็ว (% ต่อวินาที, 5–7 วินาทีต่อการ pan ข้ามเฟรม, กฎ 30°) เป็นแนวปฏิบัติทั่วไปของวงการ ไม่ใช่ค่าตายตัว
  - รายละเอียดการทดลองต้นฉบับของ Kuleshov และผู้คิดค้น dolly zoom แต่ละแหล่งเล่าไม่ตรงกัน (Wikipedia ระบุว่า Hitchcock คิดไว้ตั้งแต่ *Rebecca* 1940 แต่ทำไม่สำเร็จ ส่วน Guinness ให้เครดิต Irmin Roberts)
  - คู่มือ AI video เปลี่ยนตามรุ่นบ่อย (Runway แนะนำ Gen-4.5 แทน Gen-4 แล้ว) ควรเปิดดูหน้าล่าสุดก่อนใช้ syntax เฉพาะ
