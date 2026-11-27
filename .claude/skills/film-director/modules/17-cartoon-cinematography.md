# FD17 — Cartoon Cinematography (การกำกับภาพในงานการ์ตูน: layout, staging, กล้อง 2D/3D, multiplane, ธรรมเนียมอนิเมะ)

> ต่อยอด ไม่ซ้ำ: ตารางการเคลื่อนกล้อง → `rig.js` อยู่ใน `story-clips/_craft/GUIDE.md` §2; limited animation 2 สำนัก, layout/OL/UL,
> value hierarchy, tangent อยู่ใน `story-clips/_craft/curriculum/06-2d-animation.md` §1.2(ง)(ซ); 3D camera/rig ใน `curriculum/07-3d-character.md`;
> ฉากหลังการ์ตูน/layout มาก่อนสี ใน `creative-intelligence/knowledge/cartoon/CARTOON_RENDERING.md` §6; ประวัติสไตล์ใน `CARTOON_STYLE_HISTORY.md`
> บทนี้เพิ่ม: **ขั้น layout ในฐานะการตัดสินใจกล้อง**, สัญกรณ์กล้องแบบ X-sheet (TI/TO/pan/field), **กลกล้องของ limited animation** เป็นรายการ,
> ฟิสิกส์ของ parallax/multiplane, ทฤษฎี animetism vs cinematism, และ "กล้อง 2D ทำอะไรไม่ได้" vs 3D

## 1. นิยามและหลักการพื้นฐาน
- **Layout** = พิมพ์เขียวของแต่ละช็อต: กรอบภาพ (field), ฉาก, ตำแหน่งและเส้นทางตัวละคร, ทิศแสง, การเคลื่อนกล้อง — ทำก่อนวาด BG/animate
  นิทรรศการ Studio Ghibli Layout Designs แสดง layout ~1,300 แผ่นในฐานะ "พิมพ์เขียว" ของหนัง [`Ghibli_LayoutDesigns2008`, tier C]
- **Field / field guide** = พื้นที่ที่กล้องเห็นบนกระดาษ; ตำแหน่งกล้องเขียนเป็น N/S, E/W บนตาราง field guide; **TI/TO** (truck in/out) = เข้า/ออกหาภาพวาด; **pan** = เลื่อนภาพใต้กล้อง; ทั้งหมดเขียนในคอลัมน์กล้องของ **X-sheet** [CRAFT, `Lemay_ExposureSheet`]
- **Multiplane** = ภาพวาดหลายชั้นที่ระยะต่างกัน เลื่อนด้วยความเร็วต่างกัน (ชั้นใกล้เร็วสุด) → parallax/ความลึก; Disney (Garity) 1937 ใช้ได้ถึง 7 ชั้น ทดสอบใน *The Old Mill* ก่อน *Snow White*; ต่อมาแทนด้วย digital multiplane [`Wikipedia_Multiplane`]
  ใน repo = layer `--d` ของ `rig.js` cam (`.layer` เลื่อน/ขยายตาม `camera × d`)
- **Staging for silhouette** = วางท่าและมุมให้การกระทำอ่านออกแม้เป็นเงาดำ; หนึ่งความคิดต่อครั้ง [CRAFT, `Lasseter1987`]

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 Animetism vs Cinematism (Lamarre)
Lamarre เสนอว่าอนิเมะเป็น "multiplanar image": การเคลื่อนแบบ **animetism** = เลื่อนชั้นภาพแบน ๆ ด้านข้างสัมพันธ์กัน (ความลึกเกิดจากช่องว่างระหว่างชั้น) ต่างจาก **cinematism** = พุ่งเข้าไปในความลึกตามเปอร์สเปกทีฟจุดเดียว (เช่นภาพจากหน้าต่างรถไฟ vs ภาพมองตรงไปข้างหน้า) [`Lamarre2009_AnimeMachine`, A, bibliographic — ทฤษฎีสื่อ ไม่ใช่การทดลอง]
→ ใช้งาน: แพนข้าง/slide ชั้นภาพ = "ลุคอนิเมะ/สตอรี่บุ๊ก"; push-in เข้าหาจุดหายเรียกความรู้สึก "หนัง/3D" — เลือกให้ตรงสไตล์ทั้งเรื่อง [CRAFT inference]

### 2.2 ฟิสิกส์ของ parallax (ใช้ตั้งค่า `--d`)
ขณะกล้อง truck ด้านข้าง ความเร็วที่เห็นบนจอของวัตถุแปรผกผันกับระยะ (ใกล้ = เร็ว) — หลักเดียวกับ multiplane [`Wikipedia_Multiplane`; เรขาคณิตพื้นฐาน]
| ชั้น | `--d` ที่ใช้ | ความหมาย |
|---|---|---|
| ฟ้า/ภูเขาไกล | 0.2–0.5 | แทบไม่ขยับ = ไกลมาก |
| BG หลัก (ร้าน ห้อง) | 0.75–0.9 | |
| ตัวละคร | 1.0 | ระนาบโฟกัส |
| Foreground (ใบไม้ เสา ขอบโต๊ะ) | 1.2–1.6 | ผ่านหน้ากล้อง = ความลึกชัดสุด |
กฎ [CRAFT]: ความต่าง d มากเกิน + ระยะเคลื่อนยาว → ชั้นแยกเป็น "ป๊อปอัปการ์ดกระดาษ"; ถ้าต้องการกระดาษ (paper-theatre style) ทำโดยตั้งใจ; ถ้าไม่ ให้ d ห่างกัน ≤ 0.3 ต่อชั้นและเพิ่มชั้นกลาง
**หมุนไม่ได้:** multiplane เลื่อนชั้นแบนเท่านั้น การหมุนรอบวัตถุต้องปลอมด้วยการเลื่อน fore/background สวนทางกัน [`Wikipedia_Multiplane`] หรือสลับ view (`R.turn`)

### 2.3 กล้อง 2D ทำอะไรได้/ไม่ได้ vs 3D
| อยากได้ | 2D/2.5D (rig, HTML, ภาพนิ่ง) | 3D / AI video |
|---|---|---|
| Pan/tilt/truck/zoom | ✔ (`cam.move`, parallax) | ✔ |
| Orbit รอบตัวละคร | ✘ (ปลอม: สลับ view + parallax สวน, หรือ 2.5D depth map ±5°) | ✔ |
| Dolly zoom | ✔ ปลอม (`cam.vertigo`) | ✔ |
| เลนส์ (FOV/บิดเบือน) | วาดเข้าไปใน layout (เปอร์สเปกทีฟของ BG) | ตั้งค่าได้จริง |
| Rack focus | ✔ blur ชั้น (`cam.rack`) | ✔ |
| Crane ผ่านสิ่งกีดขวาง | ✔ ถ้ามีชั้น FG แยก | ✔ |
→ เลือกช็อตตามข้อจำกัด: ถ้า storyboard ต้องการ orbit แต่เครื่องมือคือ rig ให้ redesign ช็อตเป็น pan + cut แทนที่จะฝืน (FD24 camera path)

### 2.4 กลกล้องของ limited animation (ประหยัดเฟรมแต่ยังเล่าเรื่อง) [CRAFT, สรุปจาก curriculum 06 + `Lemay_ExposureSheet` + การปฏิบัติของวงการ]
| กล | ทำอย่างไร | ใช้เมื่อ |
|---|---|---|
| Pan over still | ภาพนิ่งละเอียด + แพนช้า | เปิดฉาก, บรรยากาศ, ความทรงจำ |
| Truck-in on held cel | ตัวละครค้างท่า กล้องเข้าเร็ว 4–8 F | ช็อก, ตระหนักรู้ (มักคู่กับ SFX hit) |
| Pan cycle (BG loop) | BG วนซ้ำ + walk cycle อยู่กับที่ | เดิน/วิ่ง/ขับรถยาว ๆ |
| Shake on still | ภาพนิ่ง + กล้องสั่น | ระเบิด, ตกใจ, ตลก |
| Speed-line hold | ตัวละครค้าง + พื้นเส้นความเร็ววน | พุ่ง, ความเร็ว (อนิเมะ) |
| Held reaction + moving hold | ปากขยับ/กะพริบเท่านั้น | บทสนทนายาว ("illustrated radio" — ระวัง) |
| Split screen / panels | แบ่งจอเป็นช่อง | โทรศัพท์, เปรียบเทียบ, montage |
| Cut to still "bank" image | ภาพใช้ซ้ำ (transformation, logo) | ซีรีส์ — สร้างลายเซ็นจำได้ |
| Iris / wipe | เปิด-ปิดฉากด้วยรูปทรง | การ์ตูนคลาสสิก, ตลก |

### 2.5 ธรรมเนียมอนิเมะ/มังงะ (ใช้ได้กับ Aaron chibi และ story clips) [CRAFT, tier D–E; ตัวอย่างงานจริงยัง unverified]
- ภาพ establishing ยาวบน BG วาดละเอียด, ฟ้าใหญ่ → ตัวละคร cel เรียบกว่าฉาก (ดู CARTOON_RENDERING §6)
- จังหวะ "ma" (ช่วงว่าง) — ช็อตเงียบของวัตถุ/ธรรมชาติระหว่างฉากอารมณ์
- Extreme close-up ดวงตา, ปาก, มือ แบบตัดเป็นชุด 3–4 ช็อตก่อน action
- Dutch angle + speed lines สำหรับความตื่นเต้น; ภาพนิ่ง + zoom เร็ว + SFX สำหรับ "ช็อก"
- Sakuga: ลงเฟรม (1s) เฉพาะช่วงพีค ที่เหลือ 2s/3s

### 2.6 Layout checklist ต่อช็อต [CRAFT]
1 field/aspect (9:16 safe zone) · 2 เส้นขอบฟ้า + จุดหาย (ตรงกับเลนส์ที่ตั้งใจ) · 3 ตำแหน่งตัวละคร start/end + เส้นทาง · 4 OL/UL ชั้นไหนอยู่หน้า · 5 พื้นที่เงียบหลังหัว (ไม่มี tangent) · 6 ทิศแสง · 7 camera move + timing (TI/TO, pan เฟรมเท่าไร) · 8 screen direction ตรงกับช็อตข้างเคียง (FD11)

## 3. เหตุผลที่ใช้
การ์ตูนไม่มีกล้องจริง — ทุก "มุมกล้อง" ต้องถูกวาด/ตัดสินใจก่อน; layout ผิด = แก้ทั้ง BG และ animation; กลกล้อง limited ทำให้ทีมเล็ก (เรา) ได้ภาพที่ดูมีงบ

## 4. ผลต่ออารมณ์และการรับรู้
- Parallax หลายชั้น → ความลึก/ความแพง; ชั้นเดียวแพน → แบนเหมือนเลื่อนรูป [CRAFT]
- Lateral slide (animetism) → นุ่ม ล่องลอย ดูเหมือนหนังสือภาพ; push into depth → พุ่ง ดราม่า [ทฤษฎี `Lamarre2009_AnimeMachine` + CRAFT]
- Still + กล้องสั่น/ซูมเร็ว → แรงกระแทกเท่ากับ animation เต็มถ้ามีเสียงช่วย (synchresis, FD19) [CRAFT + `Chion2019_AudioVision`]

## 5. ใช้เมื่อไร
- ทุกคลิปการ์ตูน/rig: ทำ layout ก่อน gen ภาพ BG ด้วย FLUX/Codex (ภาพ BG ต้องกว้างพอสำหรับ pan + oversize 12% ตาม RIG_CSS)
- งบเฟรมน้อย/เวลาน้อย → เลือกกลกล้องในตาราง 2.4 แทนการ animate ตัวละครเพิ่ม

## 6. ไม่ควรใช้เมื่อไร
- Pan over still ยาว > 6 s โดยไม่มีอะไรเปลี่ยน (คนเลื่อนผ่านใน Reels)
- Held reaction เกิน 3–4 ประโยค — กลายเป็นวิทยุมีภาพ (curriculum 06)
- Orbit ปลอมใน 2D ที่ทำให้ตัวละครบิดรูป — ตัดเป็นสองช็อตดีกว่า
- Dutch angle ทุกช็อต (เสียความหมาย)

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- *The Old Mill* (Disney 1937): ทดสอบ multiplane ก่อน *Snow White* ได้ Oscar สาขาการ์ตูนสั้น และกล้องได้รางวัลวิทยาศาสตร์ [`Wikipedia_Multiplane`]
- *The Adventures of Prince Achmed* (Reiniger 1926): multiplane รุ่นแรกจากหุ่นเงา [`Wikipedia_Multiplane`]
- Fleischer "Setback" 1934: ใช้ฉาก 3D จิ๋วหลังเซล [`Wikipedia_Multiplane`]
- Layout ของ Ghibli (Nausicaä → Marnie) จัดแสดงเป็นพิมพ์เขียว [`Ghibli_LayoutDesigns2008`]
- ตัวอย่างอนิเมะเฉพาะเรื่องสำหรับ §2.5 = [CRAFT, unverified example] ยังไม่ได้หาแหล่งที่วิเคราะห์ช็อตจริง

## 8. ประยุกต์ตามประเภทวิดีโอ
| ประเภท | ใช้อย่างไร |
|---|---|
| Story clip (rig) | layout 3–4 ชั้น `--d`, establishing = pan over still 2–3 s, ช็อก = truck-in on held pose 6 F + hit |
| Product/promo | 2.5D: แว่น cutout ชั้น 1.0, BG 0.8, FG blur 1.3 — truck ช้า 3% scale/s; "orbit" = สลับมุมภาพแว่นจริงด้วย cut ไม่ใช่หมุนปลอม |
| Reels 9:16 | layout แนวตั้ง: เส้นทางเคลื่อนขึ้น-ลง (tilt/pedestal) ได้เปรียบกว่าแพนข้าง; หัวตัวละครอยู่ 1/3 บน ไม่โดน UI ด้านล่าง |
| Explainer | split screen / panels เปรียบเทียบ, iris เน้นจุด |
| Cartoon (Aaron) | ธรรมเนียมอนิเมะ §2.5, speed-line hold, sakuga สั้นที่จุดพีค |
| Documentary/talking head | multiplane กับภาพถ่ายเก่า (แยก FG/BG ด้วย cutout + depth) = "parallax photo"; ใช้ d ต่างเล็กน้อย |

## 9. AI image prompt examples
1. `wide establishing background painting for a 2D animation, 9:16 vertical, extra 15% margin on all sides for camera pans, no characters, no text, clear empty area lower centre for a character`
2. `animation layout drawing, pencil, perspective grid visible, horizon line at upper third, single vanishing point, marked character path arrow, camera field rectangle`
3. `separate foreground overlay layer: out-of-focus leaves on transparent background, for multiplane parallax` (ใช้ทำ OL)
4. `anime-style background, painterly sky, detailed shop exterior at dusk, flat cel-shaded character-friendly lighting, no people`
5. `storybook paper-theatre layers: background hills, middle trees, foreground grass, each layer flat and separate`

## 10. AI video prompt examples
1. `slow lateral camera slide to the right across a layered painted landscape, strong parallax between foreground and background, no zoom` (animetism)
2. `the camera pushes straight forward down the narrow street toward the vanishing point` (cinematism)
3. `static shot, character frozen in a surprised pose, then a fast zoom into the face` (truck-in on held)
4. ข้อควรระวัง: Wan/Kling มักขยับตัวละครเองเมื่อสั่งกล้อง — ถ้าต้องการ "ตัวละครนิ่ง กล้องขยับ" ทำใน rig/2.5D แทน (ดู CAPABILITY_MATRIX)

## 11. Shot list example (การ์ตูน 8 s "ร้านแว่นตอนดึก")
| # | s | Layout/กล้อง | กล | เสียง |
|---|---|---|---|---|
| 1 | 0–2.5 | wide ร้าน 4 ชั้น d .3/.8/1/1.4, truck ขวา 4% | pan over still | room tone + จิ้งหรีด |
| 2 | 2.5–4 | MS ทอน หน้าเคาน์เตอร์, กล้องนิ่ง + drift | moving hold | นาฬิกาติ๊ก |
| 3 | 4–4.3 | ECU ตาทอน | anime ECU cut | เงียบ (duck) |
| 4 | 4.3–5 | MS ทอนสะดุ้ง, truck-in 6 F on held shock | truck-in on held cel | hit + กระดิ่งประตู |
| 5 | 5–8 | OTS ประตูเปิด, rack focus ทอน → ประตู | rack focus | ลมเข้า + เสียงก้าว |

## 12. ข้อผิดพลาดที่พบบ่อย
1. Gen BG ขนาดพอดีเฟรม แล้วแพนไม่ได้ (ขอบโผล่)
2. ทุกชั้น d เท่ากัน (แพนแล้วแบน) หรือ d ต่างมากเกิน (กระดาษแยก)
3. เปอร์สเปกทีฟ BG ไม่ตรงกับระดับสายตา/ขนาดตัวละคร (ตัวละครลอย)
4. ไม่มีพื้นที่เงียบหลังหัว, tangent กับขอบฉาก
5. ซูมเข้าภาพ raster จน pixel แตก (ภาพต้นฉบับต้องใหญ่ ≥ scale สูงสุด × ขนาดเฟรม)
6. สลับทิศหน้าจอระหว่างช็อตโดยไม่ตั้งใจ

## 13. วิธีตรวจและแก้
- Render เฟรมแรก/สุดท้ายของทุก camera move → ดูขอบ BG (แก้: oversize/ลด move)
- เปิด silhouette check ของช็อต action (FD16 §13)
- คำนวณความละเอียด: BG กว้าง ≥ 1080 × s_max × 1.12 px สำหรับ 9:16
- Thumbnail test 64 px: ยังรู้ไหมว่าใครอยู่ไหน
- ดู screen direction เทียบช็อตก่อน/หลังใน storyboard (FD25)

## 14. แบบฝึกหัด + test case
1. ฉากเดียวกัน 3 แบบ: (ก) ภาพเดียวแพน (ข) 3 ชั้น d .8/1/1.3 (ค) 4 ชั้น d .3/.8/1/1.5 → ให้คน 3 คนจัดอันดับ "ความลึก" และ "ดูแพง"
2. ช็อกแบบเต็ม (`emote shock` 18 F) vs truck-in on held + hit → เทียบแรงกระแทกและเวลาทำ
3. Animetism vs cinematism: เปิดเรื่องด้วย lateral slide vs push-in — ถามว่าโทนเรื่อง "นุ่ม/นิทาน" หรือ "ดราม่า/หนัง"
- ผ่านเมื่อ: ไม่มีขอบโผล่, ทุกช็อตมี layout checklist ครบ 8 ข้อ, ใช้กล limited อย่างน้อย 1 อย่างแทนงาน animate ที่ไม่จำเป็น

## 15. แหล่งอ้างอิง
`Wikipedia_Multiplane`, `Lamarre2009_AnimeMachine`, `Ghibli_LayoutDesigns2008`, `Lemay_ExposureSheet`, `Lasseter1987`, `Block2020_VisualStory`, `Chion2019_AudioVision`
+ repo: `story-clips/_craft/GUIDE.md` §2, `curriculum/06-2d-animation.md`, `curriculum/07-3d-character.md`, `creative-intelligence/knowledge/cartoon/CARTOON_RENDERING.md` §6, `CARTOON_STYLE_HISTORY.md`, `story-clips/_craft/rig.js` (cam, layers)
