# บทที่ 6 — 2D Cartoon & Animation (การ์ตูนและแอนิเมชัน 2 มิติ)

> เป้าหมาย: คิดการเคลื่อนไหวเป็น "เฟรม" ได้ (timing + spacing) วางคีย์/เบรกดาวน์/อินบีตวีนเป็น ออกแบบตัวละครที่ rig ได้ และรู้ว่าเมื่อไรควรใช้ limited animation, cut-out rig หรือ AI video แล้วนำไปสั่ง `rig.js` / FLUX / Codex / Wan / Kling ได้ตรงเจตนา
> บทนี้ต่อยอดจาก `../GUIDE.md` §4 (12 principles ในโค้ดของเรา) และ §5 (การแสดงแบบ limited animation) อ่านสองหัวข้อนั้นก่อน ในบทนี้จะไม่ซ้ำตัวเลขที่อยู่ในนั้นแล้ว
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — Timing กับ Spacing คนละเรื่องกัน
- **Timing** = การเคลื่อนไหวใช้เวลา**กี่เฟรม** (ใช้ 24 fps เป็นหลัก, 1 F ≈ 0.042 s ใน `rig.js` คือ `R.F`) เป็นตัวบอกน้ำหนักและอารมณ์
- **Spacing** = ในแต่ละเฟรม วัตถุ**ห่างจากเฟรมก่อนเท่าไร** ระยะห่างมาก = เร็ว, ถี่ = ช้า ถ้าเวลาเท่ากันแต่ spacing ต่างกัน จะได้ความรู้สึกต่างกันมาก (ease-in, ease-out, linear)
- **ตัวอย่าง:** ลูกบอลตก 12 F เท่ากันสองลูก ลูกหนึ่ง spacing เท่ากันทุกเฟรม (ลอยเหมือนลิฟต์) อีกลูก spacing ถี่ด้านบนแล้วห่างขึ้นเรื่อย ๆ (ตกเหมือนมีแรงโน้มถ่วง) ใน GSAP ตัวแรกคือ `ease:'none'` ตัวหลังคือ `'power2.in'`

**ลำดับชั้นของภาพวาด (drawing hierarchy)**
| ชั้น | หน้าที่ | ใครวาด (สตูดิโอ) | เทียบกับเรา |
|---|---|---|---|
| **Key / Extreme** | ท่าที่เล่าเรื่อง จุดเริ่ม-จบ-สุดทาง | animator หลัก | คำสั่ง `R.pose`, `R.emote`, `cam.set` |
| **Breakdown** | ภาพตรงกลางที่ "บอกทาง" ของการเคลื่อน (โค้งไปทางไหน, ใครนำ) | animator หลัก | ท่าคั่นที่เราใส่เอง เช่น anticipation ใน `jolt` |
| **Inbetween** | เติมช่องว่างตาม timing chart | assistant / inbetweener | GSAP ease เติมให้ |

- **Timing chart** (เขียนข้างคีย์ในกระดาษ): เส้นตรงที่มีขีดบอกตำแหน่งของภาพแต่ละใบ ขีดแบ่งครึ่ง = half inbetween, ขีดเบียดไปทางคีย์ใดคีย์หนึ่ง = slow in/out ("favor" คีย์นั้น), ขีด ⅓-⅔ = thirds
- **ลำดับการวาด inbetween:** วาดภาพตรงกลางก่อน แล้วค่อยแบ่งครึ่งต่อทีละข้าง วิธีนี้ทำให้ spacing ไม่เพี้ยนสะสม (ใน GSAP ใช้ ease แทนได้ แต่ถ้าต้องการ "ease ที่ไม่สมมาตร" ให้เพิ่ม breakdown แทนการหา ease แปลก ๆ)

**On 1s / 2s / 3s**
| แบบ | ภาพต่อวินาที (24 fps) | ใช้เมื่อ | ความรู้สึก |
|---|---|---|---|
| On 1s | 24 | ของเร็ว, กล้องแพน, ฉากแอ็กชัน, ของที่เลื่อนเทียบกับฉาก | ลื่น แบบฟีเจอร์ |
| On 2s | 12 | ค่ามาตรฐานของการแสดงตัวละคร | มีชีวิตแบบวาดมือ |
| On 3s | 8 | TV/anime ที่ประหยัด, ท่าช้า | กระตุกเป็นสไตล์ ถ้าใช้กับลูกบอลที่ลอยเร็วจะดูไม่ดี |
- **กฎผสม:** ตัวละครบน 2s แต่**ฉากแพนต้องอยู่บน 1s** (ถ้าแพนบน 2s ฉากจะสั่น) ใช้ 1s เฉพาะช่วงเร็ว แล้วกลับไป 2s
- **มือใหม่:** ให้วางการเคลื่อนไหวบน 2s/3s ก่อนให้จังหวะลงตัว แล้วค่อยเติมเฟรมเฉพาะจุดที่เร็วหรือละเอียด

**Pose-to-pose vs Straight ahead**
- **Pose-to-pose:** วางคีย์ → breakdown → inbetween คุมเวลาและท่าได้แม่น เหมาะกับการแสดงและบทพูด (`rig.js` ทำงานแบบนี้)
- **Straight ahead:** วาดเฟรม 1, 2, 3 ต่อกันไปเรื่อย ๆ ได้ความสดและไม่คาดเดา เหมาะกับไฟ น้ำ ควัน ผม และสิ่งที่ไม่มีรูปทรงตายตัว (ของเราคือ `fx.js` particles/noise)
- **งานจริงใช้ผสม:** ตัวละคร pose-to-pose แล้วผม/ผ้า/ควันแบบ straight ahead ทับลงไป

### 1.2 ขั้นสูง

**(ก) 12 principles ในงาน 2D — ตัวอย่างคลาสสิกและวิธีตรวจ** (การ map เข้า `rig.js` อยู่ที่ GUIDE §4 แล้ว)
| หลัก | ตัวอย่าง 2D คลาสสิก | วิธีตรวจงานตัวเอง |
|---|---|---|
| Squash & stretch | ลูกบอลเด้ง, แก้มตอนเคี้ยว | ถ่ายภาพหยุดที่เฟรม squash แล้วถามว่า "ปริมาตรเท่าเดิมไหม" |
| Anticipation | ตัวละครย่อตัวก่อนพุ่งออกจากเฟรม | ปิดเสียงแล้วดู คนดูเดาได้ไหมว่ากำลังจะเกิดอะไร |
| Staging | ท่าที่อ่านออกได้แม้เป็นเงาดำ | ถม silhouette เป็นสีดำทั้งตัว ถ้าท่ายังอ่านออก = ผ่าน |
| Straight ahead / Pose to pose | ไฟ/น้ำ vs บทพูด | แยกเลเยอร์ตามวิธีที่ใช้ |
| Follow-through & overlap | หู หาง ผ้าพันคอ ยังแกว่งต่อหลังตัวหยุด | ส่วนห้อยหยุดช้ากว่าลำตัว 2–4 F หรือไม่ |
| Slow in / slow out | ลูกตุ้มนาฬิกา | ดู timing chart ว่าขีดเบียดคีย์ถูกฝั่งไหม |
| Arcs | มือที่โบก, หัวที่หัน | ใช้ onion skin หรือวาดจุดตามจมูก/มือทุกเฟรม เส้นที่ได้ต้องโค้ง ไม่หักเป็นซิกแซก |
| Secondary action | ขยับแว่นขณะพูด | ปิดเลเยอร์ secondary แล้ว ใจความต้องไม่หาย |
| Timing | ช้างเดิน 16 F/ก้าว vs หนูวิ่ง 3 F/ก้าว | จับเวลาด้วยนาฬิกาจับเวลาขณะแสดงท่าเอง |
| Exaggeration | ตาเด้งออกจากหัวแบบ Tex Avery | ดันคีย์ให้เกินจริง แล้วถอยกลับ 1 ขั้น |
| Solid drawing | หัวยังเป็นทรงกลมตอนหัน 3/4 | วางภาพบน model sheet แล้วเทียบสัดส่วน |
| Appeal | ตัวร้ายที่ "ดูน่าติดตาม" | ทดสอบ thumbnail 64 px บนมือถือ |

**(ข) Walk & run cycle — contact method ของ Richard Williams**
- **การเดิน 1 ก้าวมี 4 ท่าหลัก:**
  - **Contact** (ส้นเท้าหน้าแตะพื้น ขากางสุด)
  - **Down** (ทิ้งน้ำหนักลง ตัวต่ำสุด)
  - **Passing** (ขาสวนกัน ขาที่ลอยผ่านขาที่ยืน)
  - **Up** (ดันตัวขึ้นสูงสุด)
  - จากนั้นกลับมา contact ของอีกขา 2 ก้าว = 1 cycle (8 ท่า)
- **Timing ที่ใช้บ่อย:**
  - ก้าวละ 12 F (on 12s = ครึ่งวินาที, เดินปกติ ตรงกับ `step:.5` ใน `R.walk`)
  - 8 F (เร่ง/เด็ก)
  - 16 F ขึ้นไป (แก่/เศร้า)
  - ตัวอย่างหนึ่งจากหลักสูตรมหาวิทยาลัยวาง contact ที่ F1, 13, 25 และ down ที่ F4, 16 (ถือเป็นตัวอย่าง ไม่ใช่ตัวเลขตายตัวของหนังสือ)
- **บุคลิกอยู่ที่ down และ up:**
  - down ลึก = หนัก/เหนื่อย
  - up สูงเด้ง = ร่าเริง
  - ไหล่สวนกับสะโพกเสมอ (แขนตรงข้ามขา)
- **การวิ่ง:**
  - ต่างจากการเดินที่ **มีช่วงลอย (flight)** ที่ไม่มีเท้าแตะพื้นเลย
  - ตัวโน้มไปหน้าตลอด
  - down จะเกิด*หลัง* contact และลึกกว่าการเดิน
  - ปกติทำบน 1s และใช้ประมาณ 4–8 F ต่อก้าว (การ์ตูนตลกเร็วได้ถึง 2–3 F แล้วใส่ smear)
- **Cycle ใน 2D:**
  - ตัวละครอยู่กับที่ แล้วเลื่อน BG ด้วยความเร็ว = ระยะก้าว ÷ จำนวนเฟรม
  - ถ้าความเร็วไม่ตรง เท้าจะ **ไถลบนพื้น (foot sliding)** ซึ่งเป็นข้อผิดพลาดที่เห็นชัดที่สุดของ cycle
- **ข้อจำกัดของเรา:**
  - `R.walk` ของเราเป็น "storybook walk" มุมหน้า (ยกขาสลับ, bob, แกว่งแขน) ไม่ใช่ walk มุมข้างแบบ 4 ท่า
  - ถ้าต้องการเดินผ่านจอแบบ profile ต้องทำ look มุมข้าง (ดูไอเดียปรับปรุงในข้อ 4)

**(ค) Lip-sync & mouth chart**
- **Mouth chart มาตรฐานวงการ** มาจากชาร์ตของ Preston Blair ใน Toon Boom Harmony 20 ใช้ชื่อปากดังนี้ ซึ่ง**ตัวอักษรเป็นแค่ชื่อเรียก ไม่ใช่เสียง**:
  | ชื่อปาก | เสียง |
  |---|---|
  | A | m b p (ปากปิด) |
  | B | s d j i k t (ฟันชิด ปากแง้ม) |
  | C | e a |
  | D | A E (อ้ากว้าง) |
  | E | o |
  | F | u oo |
  | G | f ph (ฟันบนแตะริมฝีปากล่าง) |
  | X | เงียบ |
- **ขั้นตอนมืออาชีพ:**
  1. ฟังเสียงทีละเฟรม (sound scrubbing / track reading) แล้วจดลง exposure sheet (x-sheet)
  2. ทำ **phrasing** คือกำหนดจังหวะหัว/ตัวตามวลีก่อน
  3. ใส่ปากทีหลัง
  4. ปากนำเสียง 1–2 F
- **ภาษาไทย:**
  - สระเปิดกว้าง (า แ) = D/C, สระห่อ (โ อ ุ ู) = E/F
  - **พยัญชนะริมฝีปาก ม บ ป พ ผ** = A (ต้องปิดปากจริง ไม่งั้นดูพากย์ไม่ตรงทันที)
  - **ฟ ฝ** = G
  - ส ซ ต ด ท ช = B
- **เทียบกับ `rig.js`:**
  - `R.talk` มีปาก rest/M/A/E/O/U และตัดสินจากความดังและสระไทย
  - ✔ มีปาก "B ฟันชิด" และ "G ฟ" แล้ว (2026-11-24) และปิดปากตอน ม บ ป พ ทั้งต้นและท้ายพยางค์

**(ง) Limited animation — สองสำนัก**
- **Hanna-Barbera (TV อเมริกา):**
  - แยกตัวละครเป็นชิ้น (หัว/ปาก/แขน) บนเซลคนละแผ่น แล้วขยับแค่ชิ้นที่จำเป็น
  - นำ cycle และฉากกลับมาใช้ซ้ำ ใช้ปกคอเสื้อหรือเนกไทเป็น "รอยต่อ" ซ่อนหัวที่แยกจากตัว
  - Chuck Jones เรียกแนวนี้แบบเหน็บว่า "illustrated radio" เพราะบทพูดแบกเรื่องทั้งหมด
  - บทเรียนสำหรับเรา: limited ได้ แต่**ภาพต้องเล่าอะไรที่คำพูดไม่ได้พูด**
- **Anime:**
  - ใช้ 3s เป็นหลัก มี moving hold (ปากขยับ + กะพริบตา)
  - แพนช้า ๆ บนภาพนิ่งที่วาดละเอียดมาก, still frame ดราม่า
  - เปลี่ยนเป็น 1s เฉพาะ "sakuga" ช่วงสำคัญ (ฉากสู้/อารมณ์พีค)
  - ลงแรงไม่เท่ากันในแต่ละฉาก = งบอยู่ที่จุดที่คนดูจำ
- **ของเรา (นายจ๋อง/storybook):** อยู่ระหว่างสองสำนัก คือ rig ชิ้นส่วน + moving hold + กล้องขยับ (GUIDE §5)

**(จ) Smear frame และ line boil**
- **Smear frame:**
  - ภาพ 1–2 F ที่ "ยืด/ซ้อน/เบลอ" ตัวละครตามทิศการเคลื่อน เพื่อจำลอง motion blur
  - เป็นการขยาย squash & stretch ให้สุดทาง
  - **รูปแบบ:**
    - ยืดยาว (elongated)
    - หลายแขน/หลายขา (multiples)
    - เส้นความเร็ว (speed lines)
    - ทิ้งรอย (dry brush)
  - วางไว้**ระหว่าง** key สองตัวที่ห่างกันมาก และห้ามค้างนานกว่า 2 F (ถ้าค้างนาน คนดูจะเห็นว่าเป็นภาพแปลก)
- **Line boil:**
  - เส้นสั่นเพราะวาดใหม่ทุกเฟรมแม้ตัวละครจะนิ่ง
  - งานวาดมือแบบประหยัดจะ*เลี่ยง* line boil ด้วยการใช้ภาพซ้ำ
  - งานสมัยใหม่*ใส่ line boil โดยตั้งใจ* เพื่อให้ดูวาดมือ เช่น 3 สถานะ noise วนทุก 2–3 F (STYLES §3)
  - กฎ: ถ้าจะ boil ต้อง boil ทั้งเฟรมให้เท่ากัน ไม่ใช่ boil ตัวละครแต่ฉากนิ่ง หรือกลับกัน

**(ฉ) Cut-out / rig animation — เครื่องมือหลักและแนวคิดที่ยืมมาใช้ได้**
| เครื่องมือ | หน่วยพื้นฐาน | จุดเด่น | ยืมมาใช้ใน `rig.js` |
|---|---|---|---|
| **Toon Boom Harmony** | peg (จุดหมุน) + drawing substitution + deformer | ใช้ในซีรีส์ทีวีระดับโลก มี lip-sync detection ที่เติมตัวอักษรปากลงคอลัมน์ให้ (แต่ไม่ได้วาดปากให้) | `joint()` = peg, `swap()` = drawing substitution |
| **Moho** | bone + binding (region of influence) + **Smart Bones** | Smart Bone = กระดูกที่ขับ "action" แก้รูปทรงเมื่อหมุน (เช่น หมุนหัวแล้วจมูกย้ายข้าง) เป็นทั้ง corrective deformation และ driven key | การ "fake 3/4 turn" ใน GUIDE §4 ข้อ 11 คือ smart bone แบบทำมือ |
| **Spine** | bone + mesh + weights | mesh deform ตาม bone, ส่งออกไป runtime เกม | ยังไม่มี mesh ในของเรา |
| **Live2D Cubism** | warp deformer + rotation deformer + parameter (Angle X/Y/Z) | แปลงภาพวาดภาพเดียวให้หันหน้าได้ แต่ถ้าหมุนมากจะเกิดรูปหด | `look()` = Angle X/Y แบบง่าย |
| **After Effects + Duik Ángela** | layer + IK + controller | ฟรี (GPL-v3) ใช้กับไฟล์ AI/PSD ได้เลย | แนวคิด controller (ขยับมือแล้วศอกตามเอง = IK) |
- **หลักร่วมของทุกตัว:** hierarchy พ่อ-ลูก (สะโพก → ลำตัว → ไหล่ → แขน → มือ) และ **pivot ต้องอยู่ตรงข้อต่อจริง** ถ้า pivot ผิด แขนจะหลุดจากไหล่เมื่อหมุน
- **Live2D แนะนำว่า:**
  - rotation ซ้อน rotation เหมาะกับแขน/ขา
  - rotation เป็นพ่อของ warp เหมาะกับคอ

**(ช) Character design for animation**
- **Silhouette:** ถมดำทั้งตัวแล้วต้องจำได้ว่าเป็นใคร (ทรงผม, แว่น, ไม้เท้า) ตัวละครในเรื่องเดียวกันต้องมี silhouette ต่างกัน
- **Shape language:**
  - วงกลม = อบอุ่น/เป็นมิตร (ยายจันทร์)
  - สี่เหลี่ยม = มั่นคง/ดื้อ (เจ้าของร้านรุ่นเก่า)
  - สามเหลี่ยม = เคลื่อนไหว/อันตราย/ฉลาดแกมโกง
  - ผสมได้ แต่ต้องมี "รูปหลัก" หนึ่งรูป
- **Design for rig:**
  - ข้อต่อซ่อนอยู่ใต้รูปที่ซ้อนกัน (แขนเสื้อคลุมไหล่, ปกเสื้อคลุมคอ)
  - เส้นนอกหนา เส้นในบาง
  - รายละเอียดน้อย = animate ง่ายและคงที่ทุกช็อต
  - ลายผ้าที่ซับซ้อน = ฝันร้ายของ rig
- **ชุดเอกสาร (model pack):**
  - **Model sheet:** สัดส่วนเทียบความสูงหัว
  - **Turnaround:** หน้า, 3/4, ข้าง, 3/4 หลัง, หลัง วางบนเส้นระดับ (ตา/คาง/ไหล่/เอว) เดียวกัน
  - **Expression sheet**
  - **Mouth chart ของตัวนั้น**
  - **Color model:** ค่าสีจริงกลางวัน/กลางคืน
  - ใน `rig.js` ข้อมูล color model คือ `LOOKS.xxx`
- **แว่นคือเอกลักษณ์ของเรา:** ทรงแว่นต้องคงที่ทุกมุม ให้เขียนลงใน turnaround (กรอบกลม/ทอง/เหลี่ยม ความหนาขา ตำแหน่งบนจมูก)

**(ซ) Backgrounds & layout**
- **Layout** = ภาพวางฉากที่ระบุกรอบกล้อง (field), ตำแหน่งตัวละคร, ทิศแสง และเส้นทางกล้อง ทำ*ก่อน*วาด BG จริง
- **BG สำหรับแพน** ต้องยาวกว่าเฟรม (ดูขนาด wide master ใน STYLES §5)
- **Overlay (OL) / Underlay (UL):** ชิ้นฉากที่อยู่หน้า/หลังตัวละคร (โต๊ะที่ตัวละครยืนหลัง) = layer `--d` ต่างกันใน scene markup
- **Value hierarchy:**
  - BG คอนทราสต์ต่ำกว่าและอิ่มสีน้อยกว่าตัวละคร
  - จุดที่ตัวละครยืน ควรเป็นพื้นที่ "เงียบ" (ไม่มีลาย ไม่มีขอบตัดผ่านหัว)
- **Tangent:** หลีกเลี่ยงเส้นฉากที่แตะพอดีกับขอบหัว/ไหล่ตัวละคร เพราะตาจะอ่านว่าเป็นชิ้นเดียวกัน

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Timing / Spacing | จำนวนเฟรม / ระยะห่างระหว่างเฟรม |
| On 1s / 2s / 3s | เปลี่ยนภาพทุก 1/2/3 เฟรม |
| Key, Extreme, Breakdown, Inbetween | ท่าหลัก / ท่าสุดทาง / ท่าบอกทาง / ท่าเติม |
| Timing chart, favor | ขีดบอกตำแหน่ง inbetween / เบียดเข้าหาคีย์ |
| Hold, Moving hold | ค้างนิ่ง / ค้างแต่ยังหายใจ-กะพริบ |
| Cycle | ชุดภาพวนซ้ำ (เดิน, วิ่ง, ธงโบก) |
| Contact / Down / Passing / Up | 4 ท่าหลักของการเดิน (Williams) |
| Foot sliding | เท้าไถลเพราะความเร็ว BG ไม่ตรงกับก้าว |
| Exposure sheet (x-sheet) | ตารางเฟรม: ภาพไหน ค้างกี่เฟรม เสียงพูดอะไร |
| Mouth chart / Phoneme / Viseme | ชุดปาก / หน่วยเสียง / รูปปากที่ตาเห็น |
| Smear frame | ภาพยืด/ซ้อน 1–2 F จำลอง motion blur |
| Line boil | เส้นสั่นจากการวาดใหม่ทุกเฟรม |
| Onion skin | ซ้อนเฟรมก่อน/หลังแบบจาง เพื่อตรวจ arc/spacing |
| Peg, Pivot | จุดหมุนของชิ้นส่วน |
| Drawing substitution | สลับภาพของชิ้นเดียวกัน (ปาก มือ ตา) |
| Deformer, Mesh, Weights | ดัดรูปทรงภาพ / ตาข่ายจุด / น้ำหนักที่กระดูกมีต่อจุด |
| Smart Bones (Moho) | กระดูกที่สั่งชุดการแก้รูปทรงอัตโนมัติ |
| IK / FK | ขยับปลายแล้วข้อต่อตาม / หมุนทีละข้อจากโคน |
| Model sheet, Turnaround | แผ่นสัดส่วน / ตัวละครหลายมุม |
| Silhouette, Shape language | เงาดำที่ต้องอ่านออก / ภาษารูปทรง |
| Layout, OL/UL | ภาพวางฉาก / ชิ้นฉากหน้า-หลังตัวละคร |
| Sakuga | ช่วงที่แอนิเมชันละเอียดเป็นพิเศษ (anime) |

---

## 3. ตัวอย่างงานจริง (ค่าที่ใช้กันจริง)
| สถานการณ์ | ค่าโดยประมาณ | เหตุผล |
|---|---|---|
| ตัวละครพูดคุยในร้านแว่น (ซีรีส์ TV) | ตัว on 2s, กะพริบ 2-1-3 F, หัว accent 2–3° | ประหยัดแต่ยังมีชีวิต |
| ซีนดราม่าสไตล์ anime | on 3s, ค้างหน้า 2–3 s, แพนช้าบน BG ละเอียด | แรงอยู่ที่ภาพนิ่งและเสียง |
| ฉากสู้/ไล่ล่า (sakuga) | on 1s, smear 1–2 F, กล้องสั่น | สลับความเร็วให้รู้สึกพีค |
| เดินปกติมุมข้าง | ก้าวละ 12 F, cycle 24 F, BG on 1s | คลาสสิก "on 12s" |
| คุณยายเดิน | ก้าวละ 16–20 F, down ลึก, up ต่ำ | น้ำหนักและความเหนื่อย |
| วิ่งการ์ตูน | ก้าวละ 4–6 F on 1s, มี flight | เร็วและเบา |
| ตกใจ (take) | anticipation 3–4 F → extreme ค้าง 1–2 F (อาจเป็น smear) → settle 8–12 F | ตลกต้องจบด้วยการค้าง |
| VTuber / อินโทรคลิป Live2D | หัวหมุน Angle X ±30, ผมใช้ physics | ภาพเดียวแต่ดูเป็น 3D |
| Cut-out rig ในเกม (Spine) | mesh + weights, 30–60 fps | runtime ใช้ทรัพยากรน้อย |

สิ่งที่สตูดิโอทำจริงคือ **"ใช้งบในจุดที่คนดูจะจำ"** ซีนพูดคุยทำแบบ limited ส่วนช็อตพีคทำบน 1s ให้เต็มที่

---

## 4. นำไปใช้กับ AI Image / Video + `rig.js` / `fx.js`
1. **AI ทำ "ชิ้นงาน" ส่วน rig ทำ "การแสดง":**
   - ใช้ FLUX schnell (`tools/flux.py`) หรือ Codex ทำ model sheet, BG และชิ้นส่วน
   - การแสดงทำใน `rig.js` เพราะ timing/spacing คุมได้ระดับเฟรมและ seek-safe
   - วิดีโอ AI (Wan 2.2 ผ่าน `tools/wan.py`, Kling) เหมาะกับ **BG ที่มีชีวิต** (น้ำในคลองไหว, ไฟกะพริบ, ใบไม้) ไม่เหมาะกับตัวละครที่ต้องพูดตรงปาก
2. **ความต่อเนื่องของตัวละคร (solid drawing ในยุค AI):**
   - สร้าง turnaround ครั้งเดียว แล้วใช้ภาพนั้นเป็น reference (Codex `-i`, FLUX img2img `--init`) ทุกครั้ง
   - เขียน "character paragraph" (ทรงผม สีเสื้อ ทรงแว่น) ครั้งเดียวแล้ว copy ไปทุก prompt เหมือนกฎ "one place many angles" ใน STYLES §5
3. **ให้ AI วาดแบบที่ rig ได้:**
   - ขอ `flat colors, clean closed outlines, no gradients, separated parts on plain background`
   - ขอแขน/ขาตรง ไม่ไขว้ทับลำตัว
   - หลีกเลี่ยงคำว่า `dynamic pose` ใน asset ที่จะนำไปตัดเป็นชิ้นส่วน
4. **On 2s กับวิดีโอ AI:**
   - วิดีโอ AI ออกมาลื่นแบบ on 1s ซึ่งดู "ไม่เป็นการ์ตูน" และ line boil มักเกิดเองแบบสุ่ม
   - ลดเป็น 12 ภาพ/วินาทีแล้วค้าง เช่น `ffmpeg -i in.mp4 -vf "fps=12,fps=24" out.mp4` จะได้ความรู้สึก on 2s และกลบอาการเส้นไหลไปมาได้มาก
   - กล้องแพนจาก rig ยังคงเป็น 1s ตามกฎผสมในข้อ 1.1
5. **Stepping ใน `rig.js`:**
   - GSAP `ease:'steps(n)'` ใช้ทำ on 2s/3s ให้ทั้ง tween (STYLES §3)
   - คำนวณ n = จำนวนเฟรม ÷ 2 เช่น ท่า 12 F on 2s → `steps(6)`
   - ห้ามใส่ steps กับ `cam.move`
6. **Smear และ boil ใน `fx.js`/CSS:**
   - smear = `filter: blur()` หรือ scaleX 1.3 ค้าง 1–2 F (FX.md)
   - boil = `feTurbulence` + `feDisplacementMap` สลับ seed 3 ค่าทุก 2–3 F
   - ต้องใส่ boil ทั้งเฟรม (BG + ตัวละคร) ให้เท่ากัน
7. **Lip-sync:**
   - `R.talk` ใช้ envelope ความดัง + สระไทย คล้ายลำดับ "phrasing ก่อน ปากทีหลัง" ของ Harmony (`talk` มี head accent บน peak อยู่แล้ว)
   - คำที่มี ม บ ป พ ต้องตรวจด้วยตาว่าปากปิดจริง
8. **ไอเดียปรับปรุง `rig.js` — ✔ ทำแล้ว 2026-11-24 (ทดสอบใน `../demo-rig2/`):**
   - `opt.twos` แบบ global ที่ปัดเวลาทุก keyframe ของตัวละครให้ลงเฟรมคู่ และใส่ steps ให้อัตโนมัติ (ไม่รวมกล้อง)
   - เพิ่มปาก `B` (ฟันชิด: ส ซ ต ด ช) และ `F` (ฟ ฝ) ใน `VOW`/mouth set
   - เพิ่มตัวช่วย `R.smear(P, t, dir)` และ look มุมข้าง (profile) พร้อม `walkSide` แบบ contact/down/passing/up สำหรับเดินผ่านจอ

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ
1. **Character turnaround (model sheet)**
   `Character turnaround sheet of a Thai optician in his 30s, messy black hair, round black glasses, sage-green shirt over a cream inner shirt, dark trousers, five views in one row — front, three-quarter, side profile, three-quarter back, back — all standing on the same baseline with matching eye, chin, shoulder and waist heights, flat colors, clean closed dark-brown outlines of even weight, plain light-grey background, no text, no shadows on the ground.`
2. **Expression + mouth chart sheet**
   `Expression and mouth chart sheet for the same character, head only, three-quarter view, 3×4 grid on a plain off-white background: neutral, happy, sad, shock, fear, angry, thinking, shy, plus four mouth shapes — closed lips, teeth together, wide open, rounded O — same head size and same round glasses in every cell, flat colors, consistent line weight, no text, no labels.`
3. **Cut-out-ready parts (for rigging)**
   `Cut-out puppet parts of an elderly Thai grandmother with a white hair bun and thin gold glasses, cream blouse and pale-teal shawl, laid out separately with clear gaps on a flat white background: head without neck, torso, upper arms, forearms with hands, skirt, each part with a rounded overlapping end at the joint, flat colors, closed outlines, front view, no overlapping parts, no text.`
4. **Background layout สำหรับแพน (ฉากว่าง)**
   `Wide panoramic background for a horizontal camera pan, the inside of an old two-storey Bangkok shophouse eyeglass shop at night, wooden display cabinets with frames, a warm desk lamp on a workbench at the left, a rolling steel shutter half open to a blue street on the right, painted storybook style, muted values and low contrast, an empty clear floor area in the centre third where characters will stand, eye-level camera, empty scene with no people, no text.`
5. **Key-pose sheet สำหรับท่าตกใจ (anticipation → smear → settle)**
   `Animation key-pose sheet, four poses left to right of a young Thai man with round glasses: anticipation crouch with eyes squeezed, stretched take with body elongated upward and glasses flying off, a smear frame with a motion-streaked stretched silhouette, settle pose holding the glasses with wide eyes, same scale on one baseline, clean line art with flat colors, plain background, no text.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- ทุกอย่างเคลื่อนด้วย ease เดียวกันและเวลาเท่ากัน ไม่มี timing ต่างกันตามน้ำหนัก ทำให้ทั้งฉากดูเป็นสไลด์ PowerPoint
- เข้าใจว่า "on 2s = ช้าลงครึ่งหนึ่ง" ทั้งที่จริงคือเวลาเท่าเดิมแต่จำนวนภาพครึ่งเดียว
- แพนกล้องบน 2s ทำให้ฉากทั้งฉากกระตุก
- Twinning: แขนสองข้างขยับพร้อมกันและเหมือนกัน ทำให้หัวกับมือหยุดในเฟรมเดียวกัน
- Arc หักเป็นเส้นตรง เพราะเลื่อน x/y แทนที่จะหมุนข้อต่อ
- Walk cycle เท้าไถลบนพื้น, ไม่มี down/up, หรือแขนแกว่งข้างเดียวกับขา
- ปากขยับทุกพยางค์ (flapping), ปากไม่ปิดตอน ม/บ/ป, ปากช้ากว่าเสียง
- Smear ค้าง 3 F ขึ้นไป จนคนดูเห็นเป็นภาพประหลาด
- Boil ตัวละครแต่ BG นิ่งสนิท (หรือกลับกัน) หรือ boil บนตัวหนังสือ
- Pivot ไม่ตรงข้อต่อ ทำให้แขนหลุดจากไหล่เมื่อหมุนเกิน 30°
- ออกแบบตัวละครที่มีลายละเอียด/เกรเดียนต์ ทำให้ rig และ AI คุมให้เหมือนเดิมทุกช็อตไม่ได้
- ตัวละครสองตัว silhouette เหมือนกัน คนดูแยกไม่ออกบนจอมือถือ
- BG คอนทราสต์จัดกว่าตัวละคร หรือมีเส้นฉาก tangent กับหัว
- (AI) ขอ turnaround แล้วได้คนละคนในแต่ละมุม เพราะไม่ได้ล็อก baseline และ character paragraph
- (AI) ใช้ Wan/Kling ให้ตัวละครพูด หน้าจึงละลาย (morph) และแว่นเปลี่ยนทรงกลางคลิป ควรใช้ AI video กับ BG แล้วให้ rig ทำการแสดง
- (AI) asset มีเงาตกบนพื้นหรือ gradient ทำให้ตัดชิ้นไม่ได้

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - ทำลูกบอลตก 3 แบบใน HTML/GSAP ที่เวลาเท่ากัน 12 F: `none`, `power2.in`, `power2.in` + `steps(6)` แล้วอธิบายว่า timing/spacing ต่างกันตรงไหน
  - วาด timing chart ของ "หันหัว 9 F แบบ favor ท่าจบ" แล้วระบุว่าภาพใบไหนคือ key, breakdown และ inbetween
- **ระดับ 2 (ประยุกต์):**
  - สร้าง turnaround + expression sheet ของตัวละครใหม่ 1 ตัวด้วย FLUX (prompt 1–2) แล้วทดสอบ silhouette
  - เขียน `LOOKS` ของตัวนั้นใน `rig.js`
  - ทำคลิป 6 วินาที: เดินเข้า → ตกใจ (มี anticipation + smear 1 F) → พูด 1 ประโยคไทยที่มี ม/บ/ป
  - ตรวจว่าปากปิดถูกเฟรม และ settle ค้าง ≥ 12 F
- **ระดับ 3 (เชี่ยวชาญ):**
  - วางแผนและทำช็อต 10 วินาทีแบบผสม:
    - BG มีชีวิตจาก Wan (ลดเป็น on 2s ด้วย ffmpeg)
    - ตัวละคร rig บน 2s ยกเว้นช่วงพีคที่เป็น 1s
    - กล้องแพนบน 1s
    - line boil ทั้งเฟรม
  - เขียน x-sheet สั้น ๆ (เฟรม / ท่า / ปาก / เสียง) ก่อนลงมือ
  - ประเมินด้วยเกณฑ์ข้อ 8 จนได้ ≥ 8/10 แล้วบันทึกบทเรียนใน `../LEARNING-LOG.md`

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| Timing & spacing | น้ำหนักต่างกันชัด, ease มีเหตุผล, จังหวะ 1s/2s ถูกที่ | สม่ำเสมอเกินไป | ทุกอย่างเร็ว/ช้าเท่ากัน หรือกล้องกระตุก |
| Poses & arcs | คีย์อ่านออกเป็น silhouette, arc โค้ง, ไม่ twinning | อ่านออกแต่แข็ง | ท่าไม่ชัด/ข้อต่อหลุด |
| Overlap & follow-through | ส่วนห้อยตามหลัง, settle มีค้าง | มีแต่น้อย | ทุกส่วนหยุดพร้อมกัน |
| Lip-sync / acting | ปากนำเสียง, ม บ ป ปิด, คิดก่อนพูด | ตรงบ้าง flap บ้าง | ปากไม่สัมพันธ์กับเสียง |
| Design & consistency | ตัวละคร/แว่น/สีเหมือนกันทุกช็อต, BG ไม่แย่งตัวละคร | เพี้ยน 1 จุด | ตัวละครเปลี่ยนหน้าตาหรือหายไปในฉาก |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- 12 principles / หนังสือคลาสสิก:
  - Wikipedia — [Twelve basic principles of animation (Wikiwand mirror)](https://wikiwand.com/en/Twelve_basic_principles_of_animation)
  - Wikipedia — [Disney Animation: The Illusion of Life](https://Www.wikipedia.org/wiki/Disney_Animation)
  - Adobe — [Principles of animation](https://www.adobe.com/creativecloud/animation/discover/principles-of-animation.html?mv2=cch)
  - StudioBinder — [What are the 12 principles of animation](https://www.studiobinder.com/blog/what-are-the-12-principles-of-animation/)
- Timing, spacing, 1s/2s/3s, inbetween:
  - Wikipedia — [Inbetweening](https://en.wikipedia.org/wiki/Inbetweening)
  - iD Tech — [What does animating on ones, twos, and threes mean?](https://www.idtech.com/blog/what-does-animating-on-ones-twos-and-threes-mean)
  - Brian Lemay — [Timing Charts](https://brianlemay.com/Pages/animationschool/animation/lipsyncbook/timingcharts.html)
  - Brian Lemay — [Principles of animation: Timing](https://brianlemay.com/Pages/animationschool/animation/lipsyncbook/timing.html)
  - Foundry Modo docs — [Spacing Chart](https://learn.foundry.com/modo/Content/help/pages/animation/tools/spacing_chart.html)
- Walk cycle (Richard Williams contact method):
  - Monmouth University — [Movement: Walk Cycle](https://animation.monmouth.edu/instruct/?p=351)
  - Toon Boom Learn — [Walk Analysis](https://learn.toonboom.com/modules/walk-cycle-animation/topic/walk-analysis1)
  - Adobe — [Animation walk cycle](https://www.adobe.com/creativecloud/animation/discover/animation-walk-cycle)
  - University of Washington CSE 459 — [Assignment #5: Basic Walk Cycle](https://courses.cs.washington.edu/courses/cse459/19au/assignments/assignment_5/index.html)
- Lip-sync / mouth chart:
  - Toon Boom Harmony 20 docs — [About Lip-sync](https://docs.toonboom.com/help/harmony-20/premium/sound/about-lip-sync.html)
  - Toon Boom Harmony 24 docs — [Animating Lip-Sync](https://docs.toonboom.com/help/harmony-24/premium/cut-out-animation/animate-lip-sync.html)
  - Toon Boom Harmony 20 docs — [Generating a Lip-sync Detection](https://docs.toonboom.com/help/harmony-20/premium/sound/generate-lip-sync-detection.html)
  - Toon Boom Learn — [Mouth charts](https://learn.toonboom.com/modules/lip-sync-animation1/topic/mouth-charts1)
- Limited animation, smear, line boil:
  - Wikipedia — [Limited animation](https://en.wikipedia.org/wiki/Limited_animation)
  - Wikipedia — [Smear frame](https://Www.Wikipedia.org/wiki/Smear_frame)
  - TV Tropes — [Line Boil](https://TVTropes.org/pmwiki/pmwiki.php/Main/LineBoil)
- Cut-out / rig tools:
  - Moho manual (Lost Marble) — [Bone Tools](https://www.lostmarble.com/moho/manual/bone_tools.html)
  - Moho manual — [Bone Layers](https://www.lostmarble.com/moho/manual/bone_layers.html)
  - Lester Banks — [Working with Moho's Smart Bone Actions](https://lesterbanks.com/2016/11/working-mohos-smart-bone-actions/)
  - Live2D Cubism manual — [About Deformers](https://docs.live2d.com/en/cubism-editor-manual/deformer/)
  - Live2D Cubism manual — [Warp Deformer](https://docs.live2d.com/en/cubism-editor-manual/making-and-placement-of-warp-deformer/)
  - Live2D Cubism manual — [Combination of Parent-Child Hierarchy](https://docs.live2d.com/en/cubism-editor-manual/combintion-of-parent-child-relation)
  - Live2D tutorial — [Adding XY Facial Movement](https://docs.live2d.com/en/cubism-editor-tutorials/xy/)
  - Esoteric Software — [Spine User Guide](https://en.esotericsoftware.com/spine-user-guide)
  - Esoteric Software — [Spine mesh attachments](https://fr.esotericsoftware.com/spine-meshes)
  - RxLaboratory — [Duik (tool page)](https://rxlaboratorio.org/rx-tool/duik/)
  - RxLaboratory — [Duik 17 user guide](https://rxlaboratorio.org/rx-tutorial/duik-17-user-guide/)
  - GitHub — [RxLaboratory/Duik](https://github.com/RxLaboratory/Duik)
- AI prompt/vendor: ดูรายการของบทที่ 1 (`01-photography-fundamentals.md` §9) ส่วนเรื่อง Wan/Kling จะลงลึกในบทที่ 10
- หมายเหตุ:
  - ตัวเลขเฟรม (ก้าว 12 F, วิ่ง 4–8 F, smear ≤ 2 F, กะพริบ 2-1-3) เป็นแนวปฏิบัติทั่วไปของวงการ แต่ละสตูดิโอปรับต่างกัน
  - หนังสือ *The Animator's Survival Kit* (Richard Williams) ไม่มีเผยแพร่ฟรีอย่างเป็นทางการ ข้อมูล contact method ในบทนี้มาจากหลักสูตรที่อ้างถึงหนังสือ
  - เรื่อง shape language, silhouette, turnaround และ layout/OL/UL เป็นความรู้ทั่วไปของวงการ ในรอบค้นนี้ยังไม่พบแหล่งทางการที่เหมาะจะอ้าง ควรเพิ่มเมื่อตรวจรอบถัดไป
  - คำสั่ง ffmpeg `fps=12,fps=24` และไอเดียปรับปรุง `rig.js` ในข้อ 4 เป็นข้อเสนอของทีม ยังไม่ได้ทดสอบใน pipeline
