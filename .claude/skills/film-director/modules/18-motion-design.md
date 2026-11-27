# FD18 — Motion Design (easing, kinetic typography, overlap/offset, follow-through, ระบบ motion ของ Material/Apple, GSAP)

> ต่อยอด ไม่ซ้ำ: ease guide ของกล้องอยู่ใน `story-clips/_craft/GUIDE.md` §2 และ `curriculum/05-movement-language.md` §1.3;
> หลัก 12 ข้อกับตัวละครอยู่ใน FD16. งานลงมือจริงใน HyperFrames ใช้ skill **`hyperframes-animation`** (กฎ motion, scene blueprints,
> 24 text-animation effects, GSAP adapter), **`hyperframes-keyframes`** (punch-in, reframe, mask, SVG draw), **`hyperframes-registry`**
> (ของสำเร็จรูป ~400 ชิ้น — ค้นก่อนสร้างเอง), `beat-clip` (kinetic type ตามเพลงของร้าน)
> บทนี้เพิ่ม: **ค่า cubic-bezier ที่ตรวจแล้ว**, ตาราง ms → เฟรม, งานวิจัย kinetic typography → อารมณ์, กฎ stagger/offset, motion budget

## 1. นิยามและหลักการพื้นฐาน
- **Motion design** = การออกแบบการเคลื่อนของกราฟิก/ตัวอักษร/UI/สินค้า เพื่อสื่อสาร (ลำดับข้อมูล, ความสัมพันธ์, อารมณ์, แบรนด์)
- **Easing** = ฟังก์ชันเวลา→ความคืบหน้า; **ease-out (decelerate)** = เข้าเฟรมแล้วชะลอ (สิ่งที่ "มาถึง"), **ease-in (accelerate)** = ออกจากเฟรม (สิ่งที่ "จากไป"), **ease-in-out** = ย้ายตำแหน่งในเฟรม
  Material ใช้หลักเดียวกัน: decelerate สำหรับเข้า, accelerate สำหรับออก, standard สำหรับเริ่มและจบบนจอ [`Material3_MotionTokens`, C]
- **Overlap / offset & delay (stagger)** = ชิ้นที่เกี่ยวข้องกันเริ่มไม่พร้อมกัน → ตาเห็นลำดับและความสัมพันธ์; มาจาก follow-through/overlap ของ Disney [D, `Willenskomer2017_UXinMotion`]
- **Follow-through ใน motion** = overshoot แล้ว settle (`back.out`, spring) แทนการหยุดแข็ง
- **Kinetic typography** = การสื่อความหมาย/อารมณ์ด้วยตัวอักษรที่เคลื่อน [`Lee2002_KineticTypeEngine`]

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 ค่า easing ที่ตรวจแล้ว (ใช้ได้ทั้ง CSS, GSAP CustomEase, After Effects)
| ชื่อ | cubic-bezier | ใช้กับ | ที่มา |
|---|---|---|---|
| CSS `ease` | (0.25, 0.1, 0.25, 1) | ค่า default ของเว็บ | `W3C_CSSEasing1` (S) |
| CSS `ease-in` | (0.42, 0, 1, 1) | ออกจากจอ | `W3C_CSSEasing1` |
| CSS `ease-out` | (0, 0, 0.58, 1) | เข้าจอ | `W3C_CSSEasing1` |
| CSS `ease-in-out` | (0.42, 0, 0.58, 1) | ย้ายในจอ | `W3C_CSSEasing1` |
| M3 standard | (0.2, 0, 0, 1) | utility, เริ่ม-จบบนจอ | `Material3_MotionTokens` (C) |
| M3 standard decelerate | (0, 0, 0, 1) | utility เข้า | 〃 |
| M3 standard accelerate | (0.3, 0, 1, 1) | utility ออก | 〃 |
| M3 emphasized decelerate | (0.05, 0.7, 0.1, 1) | hero เข้า (ไวมากแล้วร่อนยาว) | 〃 |
| M3 emphasized accelerate | (0.3, 0, 0.8, 0.15) | hero ออก | 〃 |
| M3 emphasized | path `M0,0 C0.05,0 0.133333,0.06 0.166666,0.4 C0.208333,0.82 0.25,1 1,1` | hero ย้ายในจอ | 〃 |
| linear | (0, 0, 1, 1) | กลไก, scroll, ticker, ลูปไม่รู้จบ | 〃 |
ใช้ใน GSAP: `CustomEase.create("m3EmphDecel", "0.05,0.7,0.1,1")` (CustomEase รับ cubic-bezier string; ต้องโหลด plugin แยก) [`GSAP_CustomEase`]

### 2.2 GSAP ease ที่มีใน core (ไม่ต้องโหลดเพิ่ม)
`none`, `power1–4`, `sine`, `circ`, `expo`, `back`, `elastic`, `bounce`, `steps` + `.in/.out/.inOut`; power1 = quad, power2 = cubic, power3 = quart, power4 = quint; ค่า default = `power1.out` [`GSAP_Eases`]
สมการ (Penner, อนุมานจากความเทียบเท่าข้างบน): `powerN.out(p) = 1 − (1−p)^(N+1)` → ยิ่ง N สูง ยิ่ง "พุ่งแล้วเบรกยาว"
| อารมณ์ของ motion | GSAP | หมายเหตุ [CRAFT] |
|---|---|---|
| นุ่ม สงบ หายใจ | `sine.inOut` | drift, breathe, ลอย |
| ปกติ มีเหตุผล | `power2.inOut` / `power2.out` | ค่าใช้ประจำ |
| ฉับไว มั่นใจ (snap) | `power3.out` / `expo.out` | punch-in, title slam |
| ร่าเริง มีชีวิต | `back.out(1.4–2)` | overshoot = follow-through |
| ตลก ของเด้ง | `elastic.out`, `bounce.out` | ใช้น้อย ห้ามทั้งคลิป |
| หุ่นยนต์/วาดมือ | `steps(n)` | on 2s/3s, typewriter |

### 2.3 Duration: ms ↔ เฟรม และขนาดการเคลื่อน
Material: duration เพิ่มตามพื้นที่/ระยะการเคลื่อน; token 50–1000 ms [`Material3_MotionTokens`]. Apple: feedback ควร "สั้นและแม่น" [`Apple_HIG_Motion`]
| ms | @24 fps | @30 fps | ใช้กับ (video motion, CRAFT) |
|---|---|---|---|
| 100 | 2.4 F | 3 F | flash, กระพริบ, smear |
| 200 | 4.8 F | 6 F | ไอคอนเล็ก, pop-in คำเดียว |
| 300 | 7.2 F | 9 F | ข้อความเข้า, ปุ่ม, การ์ดเล็ก |
| 500 | 12 F | 15 F | การ์ดใหญ่, panel, product slide |
| 700–1000 | 17–24 F | 21–30 F | full-screen transition, hero reveal |
หมายเหตุ: ค่า UI ออกแบบให้ผู้ใช้ไม่ต้องรอ; วิดีโอไม่มีการรอแบบ UI จึง **ยาวกว่าได้ 1.2–2×** สำหรับ hero moment แต่ข้อความต้องจบการเข้าก่อนคนเริ่มอ่าน [CRAFT]

### 2.4 Spring (follow-through แบบฟิสิกส์)
Apple อธิบาย spring ด้วย **damping ratio** (1 = ไม่เด้ง, < 1 = เด้ง) และ **response** (คาบ) แทนมวล/ความแข็ง [`Apple_WWDC2018_FluidInterfaces`, search summary]
Material: spatial damping 0.9 (เด้งนิด) stiffness 1400 (เล็ก/เร็ว) / 700 (กลาง) / 300 (เต็มจอ); **effects (สี/opacity) damping 1 ห้าม overshoot** [`Material3_MotionTokens`]
→ กฎ: ตำแหน่ง/ขนาด overshoot ได้; สี/ความโปร่งใส ห้าม overshoot (ดูเป็น glitch) — ใน GSAP ใช้ `back.out(1.2–1.7)` เฉพาะ x/y/scale

### 2.5 Stagger / offset & delay
- ชิ้นที่เคลื่อนพร้อมกันความเร็วเท่ากันถูกอ่านเป็น "กลุ่มเดียว"; offset แยกลำดับ [D, `Willenskomer2017_UXinMotion` ผ่าน Toptal summary]
- ค่าแนะนำ [CRAFT]: ตัวอักษร 1–2 F/ตัว (24 fps), คำ 2–4 F/คำ, บรรทัด 4–8 F, การ์ด/ไอคอนในลิสต์ 3–6 F; รวม stagger ทั้งหมด ≤ ~0.6 s ไม่งั้นคนรอ
- Parenting: ชิ้นลูก (ราคา, badge) ตามชิ้นแม่ (สินค้า) ด้วย delay 2–4 F = เห็นความสัมพันธ์

### 2.6 Kinetic typography → อารมณ์ (หลักฐาน)
- **ประเภทของการเคลื่อน** สำคัญที่สุด; ความเร็วและ dynamics เป็นแค่ "ตัวขยาย" [EVIDENCE, `Kim2016_YoKineticType`, N=20]
  | ประเภท | ไปทาง | อารมณ์ที่เหมาะ |
  |---|---|---|
  | vertical, jumping | ตื่นเต้น (mood +, energy +) | ดีใจ, ประหลาดใจ |
  | horizontal, expansion | เครียด (mood −, energy +) | โกรธ, กลัว, ประหลาดใจ |
  | vibration, flopping, shimmy | หดหู่ (mood −, energy −) | เศร้า, กลัว, ผิดหวัง |
  | pendulum | กลาง | ข้อมูลกลาง ๆ |
- ความสุ่ม (entropy) + ความเร็ว ปรับ "ความแรง" ของอารมณ์ในข้อความเคลื่อนไหวได้ [EVIDENCE, `Xie2023_Emordle`, abstract]
- ข้อจำกัด: กลุ่มตัวอย่างเล็ก, ภาษาเกาหลี/อังกฤษ, คำเดียว → ใช้เป็นจุดเริ่ม แล้วทดสอบกับข้อความไทยเอง (§14)

### 2.7 Motion budget (จาก Apple HIG มาปรับกับวิดีโอ)
"Add motion purposefully… don't add motion for the sake of adding motion"; motion มากเกินทำให้ไขว้เขวหรือไม่สบาย; motion ไม่ควรเป็นช่องทางเดียวของข้อมูลสำคัญ [`Apple_HIG_Motion`]
→ กฎ [CRAFT]: 1 hero motion ต่อช่วงความสนใจ (~1–2 s); ข้อความสำคัญ (ราคา, ชื่อรุ่น) ต้องอ่านได้ตอน **นิ่ง** อย่างน้อย 1.5 s; ไม่ใช่ทุกชิ้นต้องเด้ง

## 3. เหตุผลที่ใช้
Ease/stagger ที่ถูกต้องบอก "อะไรสำคัญ อะไรมาก่อน อะไรเกี่ยวกับอะไร" โดยไม่ต้องใช้คำ; motion แบบสุ่ม/linear ทำให้งานดูราคาถูกหรือ template

## 4. ผลต่ออารมณ์และการรับรู้
- Decelerate เข้า = "มาถึงอย่างมั่นใจ"; accelerate ออก = "จากไปอย่างตั้งใจ" [CRAFT/C]
- Overshoot เล็ก = มีชีวิต เป็นมิตร; overshoot มาก/elastic = ตลก ไม่จริงจัง [CRAFT]
- Vertical/jumping text = บวก กระตือรือร้น; vibration/shimmy = ลบ หดหู่/กลัว [EVIDENCE, `Kim2016_YoKineticType`]
- Motion มากเกินในพื้นที่กว้าง → ไม่สบาย (vestibular) [C, `Apple_HIG_Motion`]

## 5. ใช้เมื่อไร
Title, caption, ราคา/โปร, lower-third, ไอคอนอธิบาย, logo sting, transition กราฟิก, beat clip kinetic type, product callout (ลูกศรชี้บานพับ เลนส์)

## 6. ไม่ควรใช้เมื่อไร
- เนื้อหาเศร้า/สุขภาพ/การแพทย์ กับ bounce/elastic
- Shake/vibration ตลอดเวลาบนข้อความยาว (อ่านไม่ได้, ผู้แพ้ motion)
- ข้อความที่ต้องอ่าน > 6 คำ ด้วย per-letter animation (ช้าเกิน)
- Overshoot บน opacity/สี

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- Self UI (Chang & Ungar 1993): ใช้ slow in/out, arcs, follow-through, motion blur และ dissolve ให้ object "แข็ง" และติดตามได้ [`ChangUngar1993`]
- วิดีโอประกอบ UIST 2002 ทำด้วย kinetic type engine ทั้งหมด [`Lee2002_KineticTypeEngine`]
- ชุด "Yo" 32 แบบ (After Effects) ที่ใช้ทดสอบ [`Kim2016_YoKineticType`]
- ตัวอย่าง title sequence ภาพยนตร์ (เช่น Saul Bass) = [CRAFT, unverified example] ยังไม่ได้หาแหล่งวิเคราะห์ในรอบนี้

## 8. ประยุกต์ตามประเภทวิดีโอ
| ประเภท | ใช้อย่างไร |
|---|---|
| Story clip | ซับไทยเข้า `power2.out` 6 F ออก `power1.in` 4 F, ไม่เด้ง; ชื่อตอน = M3 emphasized decelerate 12–15 F |
| Product/promo (แว่น) | แว่นเข้า emphasized decelerate 15 F → callout ลูกศร stagger 4 F → ราคาเข้า `back.out(1.4)` 9 F แล้ว **นิ่ง ≥ 1.5 s** |
| Reels/TikTok (beat-clip) | คำละ beat; ประเภทการเคลื่อนตามอารมณ์ (§2.6); ตัดคำบน beat (FD19 `sync.beat_cut`) |
| Explainer | ไอคอน stagger 3–6 F, parenting ลูกศรตามไอคอน, ease-in-out ระหว่างขั้น |
| Cartoon | text effects แบบมังงะ (SFX lettering) ใช้ `steps(3)` + scale punch |
| Talking head | lower-third: เข้า decelerate 9 F, ออก accelerate 6 F; caption คำต่อคำ highlight แทนเด้ง |

## 9. AI image prompt examples
(ข้อความจริงทำใน HTML เสมอ — ภาพสำหรับคลิป gen แบบไม่มีตัวอักษร ตามกฎบ้าน)
1. `clean product background plate for motion graphics, eyeglasses centred lower third, large empty negative space upper half for animated title, no text`
2. `set of flat vector icons (lens, frame, sun, eye) in one consistent line style, separated, transparent background, no text`
3. `abstract motion-graphic shapes: soft gradient circles and lines on deep navy, for animated background loop, no text`

## 10. AI video prompt examples
AI video ไม่ควรใช้ทำ typography (ตัวอักษรเพี้ยน) — ใช้ทำ **พื้นหลัง/plate** แล้วซ้อน type ใน HyperFrames:
1. `seamless slow drift of soft bokeh lights, no objects, loopable, calm` (BG สำหรับ title)
2. `eyeglasses rotate slowly 30 degrees on a turntable, studio light, static camera, clean background` (plate สำหรับ callout)

## 11. Shot list example (promo 5 s แบบ kinetic)
| # | t (s) | element | motion | ease / dur (24 fps) |
|---|---|---|---|---|
| 1 | 0.0 | BG plate | scale 1.06→1 | `sine.out` 5 s |
| 2 | 0.2 | แว่น cutout | y +40%→0 | M3 emph. decel 15 F |
| 3 | 0.8 | "NEW" | scale 0→1 | `back.out(1.7)` 7 F |
| 4 | 1.1–1.5 | callout ×3 | stagger 4 F, draw line | `power2.out` 9 F each |
| 5 | 2.0 | ราคา | y 20→0 + opacity | `power3.out` 9 F → **hold 2.2 s** |
| 6 | 4.4 | ทั้งหมดออก | y 0→−20 + fade | emph. accel 9 F |

## 12. ข้อผิดพลาดที่พบบ่อย
1. linear กับทุกอย่าง / ค่า default เดียวทั้งคลิป
2. ease-in ตอนเข้า (ช้าแล้วกระแทกหยุด) — ต้องกลับกัน
3. ทุกชิ้นเข้าพร้อมกัน (ไม่มี stagger) หรือ stagger ยาวจนรอ
4. Bounce/elastic ทุกชิ้น
5. ข้อความยังเคลื่อนอยู่ตอนที่ต้องอ่าน
6. Overshoot บน opacity/สี
7. Motion บังกัน/แย่ง hero

## 13. วิธีตรวจและแก้
- **Read-at-rest test**: หยุดภาพทุก 0.5 s — ข้อความสำคัญนิ่งและอ่านได้รวม ≥ 1.5 s ไหม
- **Ease audit**: list ทุก tween (`hyperframes-animation` มี animation map audit) → เข้า=decel, ออก=accel, ย้าย=inOut
- **Hierarchy test**: ดู 1 ครั้งแล้วถามว่า "เห็นอะไรเป็นอย่างแรก" ต้องตรงกับ visual focus (DECISION_ENGINE ข้อ 6)
- **Reduce-motion version**: ถ้าลบ motion ทั้งหมด ข้อมูลยังครบไหม [`Apple_HIG_Motion`]
- Frame grid: ที่ 24 fps duration ควรเป็นจำนวนเฟรมเต็ม (0.3 s → 7 หรือ 8 F ไม่ใช่ 7.2)

## 14. แบบฝึกหัด + test case
1. **คำเดียว 4 อารมณ์**: คำว่า "ใหม่" ทำ 4 แบบ (jumping / expansion / shimmy / pendulum) ความเร็วเท่ากัน → ให้คน 5 คนเลือกอารมณ์ → เทียบกับตาราง 2.6 (ทดสอบว่าผลของ Kim2016 ใช้กับคำไทยได้ไหม; บันทึกผล)
2. **Ease A/B**: ราคาเข้าแบบ `power2.out` vs M3 emphasized decelerate vs `back.out(1.7)` → อันไหน "ดูพรีเมียม"
3. **Stagger**: callout 3 ชิ้น stagger 0 / 4 / 12 F → อันไหนอ่านลำดับได้และไม่รู้สึกรอ
- ผ่านเมื่อ: ไม่มี linear บนสิ่งที่ไม่ใช่กลไก, ราคาอ่านนิ่ง ≥ 1.5 s, เข้า-ออกใช้ decel/accel ถูกทิศ

## 15. แหล่งอ้างอิง
`Material3_MotionTokens`, `W3C_CSSEasing1`, `GSAP_Eases`, `GSAP_CustomEase`, `Apple_HIG_Motion`, `Apple_WWDC2018_FluidInterfaces`, `Willenskomer2017_UXinMotion`,
`Kim2016_YoKineticType`, `Xie2023_Emordle`, `Lee2002_KineticTypeEngine`, `ChangUngar1993`, `Schmidt2024_ExaggeratedMotion`
+ skills: `hyperframes-animation`, `hyperframes-keyframes`, `hyperframes-registry`, `beat-clip`
