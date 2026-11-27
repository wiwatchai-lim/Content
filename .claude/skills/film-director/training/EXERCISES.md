# Practical Training — แบบฝึกหัดทุกโมดูล

ดึงจาก §14 ของแต่ละ module (2026-11-27). ผลทดลองจริง → `EXPERIMENTS.md`; ทดลองแล้วค่อยเปลี่ยน test_status ใน library

## 01-shot-sizes — FD01 — Shot Sizes (ขนาดภาพ / ระยะภาพ: EWS → ECU, insert, coverage)
- **TC-FD01-A (ฉากเดียว 3 แบบ)**: ฉาก "ลูกค้าเห็นราคาแล้วตกใจ" ทำ 3 เวอร์ชันใน rig.js: (1) WS ตลอด, (2) WS→MS→CU ตามบันได,
  (3) WS→ECU shock cut. เทียบ: เวอร์ชันไหนคนดู (ผู้ใช้) บอกได้ว่าตกใจเร็วที่สุด, อันไหนตลกที่สุด. บันทึกใน LEARNING-LOG
- **TC-FD01-B (9:16)**: ถ่าย/สร้างภาพเดียวกันที่ MS และ MCU ในแนวตั้ง ใส่ caption ล่าง → ดูบนโทรศัพท์: หน้าถูกบังไหม, อ่านอารมณ์ได้ไหม
- **TC-FD01-C (AI)**: prompt เดียวกันเปลี่ยนแค่ "medium shot" ↔ "framed from the chest up" 3 seeds ต่อแบบ (FLUX ฟรี) — แบบไหนได้เส้นตัดตรงกว่า


## 02-camera-angles — FD02 — Camera Angles (มุมกล้อง: ความสูง, มุมก้ม-เงย, มุมรอบตัว, roll)
- **TC-FD02-A**: ภาพพนักงานแนะนำเลนส์ 3 มุม (eye / low 20° / high 20°) ด้วย FLUX seed เดียว → ให้ผู้ใช้เลือก "น่าเชื่อที่สุด"; คาด: eye-level (ตาม `va:BaranowskiHecht2018`) — บันทึกผลจริงลง memory
- **TC-FD02-B**: ฉาก Mint & Tao ทะเลาะ 2 เวอร์ชัน: (1) eye-level ตลอด (2) baseline eye-level + low/high ที่จุดพลิก → อันไหนอ่านจุดพลิกได้โดยไม่ต้องอ่าน bubble
- **TC-FD02-C (rig)**: `rot` 3°, 6°, 10° ที่ s เท่าเดิม vs s ตามสูตร → ตรวจขอบ และความรู้สึก "ตั้งใจ" vs "พลาด"


## 03-camera-movement — FD03 — Camera Movement (การเคลื่อนกล้อง: หมุน/ย้าย/เลนส์/ระบบพยุง + วิธีทำในเครื่องมือของเรา)
- **TC-FD03-A (dolly vs zoom)**: ฉาก 3 layer ใน rig.js, ทำ (1) s+0.3 ที่ `--d` .8/1/1.3 (dolly) (2) s+0.3 ที่ `--d` 1 ทั้งหมด (zoom) (3) static. เทียบ: อันไหน "รู้สึกเหมือนเดินเข้าไป" (คาดจาก `Heimann2019`: dolly)
- **TC-FD03-B (Wan wording)**: ภาพเดียว seed เดียว 4 prompt: "slow dolly in", "slow push-in", "slow zoom in", "camera moves closer" (`--seconds 2 --steps 8`) → วัดว่าอันไหนมี parallax จริง/ตรงคำ บันทึกลง LEARNING-LOG + CAPABILITY_MATRIX
- **TC-FD03-C (payoff)**: truck 3 s ผ่านชั้นวาง: (1) จบที่ผนังว่าง (2) จบที่แว่นรุ่นใหม่ที่ส่องไฟ → ผู้ใช้เลือก


## 04-camera-positioning — FD04 — Camera Positioning (ตำแหน่งกล้อง: เส้น 180°, 30°, eyeline, ระยะ, coverage, ตำแหน่งที่ "มีเหตุผล")
- **TC-FD04-A (180°)**: ฉากสนทนา Mint & Tao 6 ช็อต 2 เวอร์ชัน (รักษา vs ข้ามที่ช็อต 4 โดยไม่มีตัวเชื่อม) → ถามผู้ใช้ "ใครพูดกับใคร/ใครอยู่ไหน" และ "ชอบอันไหน" — คาด (Kachkovski2019): งงขึ้นเล็กน้อย, ความชอบไม่ต่าง
- **TC-FD04-B (ระยะ)**: MCU พนักงานเดียวกัน 2 แบบ (ใกล้ 0.6 ม. wide vs 2 ม. tele, FLUX) → เลือกอันน่าไว้ใจ (คาด: ไกล)
- **TC-FD04-C (eye trace 9:16)**: ช็อต A จบที่มือขวาบน; ช็อต B เริ่มสินค้า (1) ตรงจุดเดิม (2) ล่างซ้าย → อันไหนดู "ลื่น"


## 05-lens-optics — FD05 — Lens & Optical Physics (เลนส์และฟิสิกส์แสงเชิง "ภาษาภาพยนตร์")
- **TC-FD05-A (ระยะ vs เลนส์)**: MCU คนเดียวกัน FLUX 3 prompt: "24mm from 0.5 m", "50mm from 1.2 m", "100mm from 2.5 m" (seed เดียว) → AI ทำตามระยะไหม? ผู้ใช้เลือกน่าไว้ใจสุด
- **TC-FD05-B (2D lens emulation)**: ฉาก rig.js เดียว `--d` ชุด wide (1.4/1/0.7) vs tele (1.1/1/0.95) + push เท่ากัน → ความรู้สึกต่างกันไหม
- **TC-FD05-C (anamorphic word)**: prompt "anamorphic" อย่างเดียว vs "vertical oval bokeh + horizontal streak flare" → อันไหนได้ลักษณะจริงมากกว่า (คาด: แบบบรรยาย)


## 06-composition-framing — FD06 — Composition & Framing for the Moving Image (การจัดองค์ประกอบภาพเคลื่อนไหว: headroom, lead room, 9:16 vs 16:9, frame-in-frame, blocking in depth, aspect ratio)
- **T1 Look room:** ฉากเดียว 3 แบบ — (ก) look room ปกติ (ข) กลางกรอบ (ค) short-side; ให้คนดู 3 คนบอกอารมณ์ด้วยคำเดียว เปรียบกับตาราง §4 — คาดว่า (ค) ได้คำแนว "อึดอัด/ระแวง"
- **T2 9:16 shot size:** ถ่าย/สร้าง CU ตามนิยาม 16:9 แล้วตัดเป็น 9:16 vs เฟรมใหม่ตัดที่อก; วัดสัดส่วนหน้า/ความสูงเฟรม (เกณฑ์ `comp.vertical_single_cu` ≤ ~45%)
- **T3 Depth staging vs coverage:** บทพูด 4 บรรทัด ทำ (ก) 1 ช็อต staging ในความลึก (ข) 4 ช็อต shot/reverse; เทียบความยาว จำนวนคัต และว่าผู้ชมรู้ไหมว่าใครพูด
- **T4 Ratio change:** flashback 1:1 ใน 9:16 แล้วขยายเต็มจอตอนกลับปัจจุบัน — ผู้ชมเข้าใจการข้ามเวลาโดยไม่มีข้อความไหม
บันทึกผลลง `story-clips/_craft/LEARNING-LOG.md` และเปลี่ยน `test_status` ในไลบรารี


## 07-perspective-depth — FD07 — Perspective & Spatial Depth (มิติลึกในภาพเคลื่อนไหว: depth cues, ชั้น fg/mg/bg, parallax, staging in depth, 2.5D)
- **T1 Speed ratio:** ภาพเดียว 3 เวอร์ชัน 4 วิ — (ก) ทุกชั้นเท่ากัน (ข) ตามตาราง 1/Z (ค) ชั้นไกลเร็วกว่า; ถามผู้ดู 3 คนว่าแบบไหน "เหมือนกล้องเคลื่อนจริง" — คาด (ข) ชนะ, (ค) อ่านเป็นแปลก/กลับด้าน
- **T2 Occlusion helps sign:** ทำ (ข) ซ้ำแต่ตัดชั้น foreground ที่บังออก — เทียบว่าความลึกอ่านง่ายลงไหม (ทดสอบข้อเสนอจาก `Kim2016_MotionParallax` ในบริบทของเรา)
- **T3 Miniature:** ภาพตลาดกว้าง blur บน-ล่าง 0/ปานกลาง/แรง — ให้ผู้ดูประเมินว่า "จริง vs ของเล่น"
- **T4 Depth staging:** ฉากร้าน 3 ชั้น เทียบ deep focus vs rack focus ชั้นกลาง→หลัง; อะไรนำสายตาได้ดีกว่า
บันทึกผลใน `story-clips/_craft/LEARNING-LOG.md`


## 08-cinematic-lighting — FD08 — Cinematic Lighting (การจัดแสงแบบภาพยนตร์: three-point, motivated, high/low key, practicals, chiaroscuro, rim, bounce, Kelvin, continuity)
- **T1 Ratio ladder:** หน้าเดียว 4 ภาพ ratio 1:1 / 2:1 / 4:1 / 8:1 (ภาพนิ่ง FLUX หรือถ่ายจริง) — ผู้ดูจับคู่กับคำ "สดใส/ปกติ/จริงจัง/อันตราย"; ดูว่าตรงกับ §4 ไหม
- **T2 Motivation:** ฉากกลางคืนเดียวกัน (ก) key อุ่นข้างที่มีโคม (ข) key อุ่นข้างที่ไม่มีโคม — ถามว่าภาพไหน "ดูจริง"
- **T3 Continuity:** generate 4 ช็อตของฉากเดียว (ก) prompt แสงต่างกันเล็กน้อย (ข) บล็อก LIGHT: เดียวกันคำต่อคำ — วัดความต่างความสว่างเฉลี่ย/ทิศเงาข้ามช็อต
- **T4 Darkness arc:** คลิป 60 วิ สองเวอร์ชัน: ความสว่างคงที่ vs มืดสุดที่ ~45 วิ แล้วสว่าง — ถามผู้ดูว่าเวอร์ชันไหน "มีจุดพีค"
- **T5 Mired:** เกรดฉากเดียวด้วย `colortemperature` 5500→5000 และ 7000→6500 — เห็นว่าระยะ K เท่ากันแต่ความเปลี่ยนต่างกัน


## 09-color-grading — FD09 — Colour Theory & Grading (colour script, primary vs secondary, LUT, log, curves, skin tone line, look development, teal-orange, เกรดสำหรับ Reels, ffmpeg/HyperFrames)
- **T1 Same scene, 3 looks:** ช็อตเดียว → `grade.warm_daylight` / `grade.cold_clinical` / `grade.muted_editorial`; ผู้ดู 3 คนให้คำอารมณ์; ตรวจว่าความต่างมาจาก brightness/saturation มากกว่า hue ไหม (ทดสอบ `ValdezMehrabian1994` ในบริบทวิดีโอของเรา)
- **T2 Matrix bug:** ส่งออก PNG เดียวกันสองแบบ (สูตรเก่า vs `spec.master_h264_bt709`) เปิดบน iPhone/Android เทียบสีแดงและผิว
- **T3 Teal-orange strength:** ค่า 0.03 / 0.06 / 0.12 บนช็อตคน+แว่นสีฟ้า — หาจุดที่ผิวเริ่มส้มและกรอบฟ้าหาย
- **T4 Phone lift:** ฉาก low-key ก่อน/หลัง `grade.reels_daylight_lift` ดูกลางแดด
- **T5 Flashback code:** ใช้ `grade.memory_flashback` เฉพาะอดีต — ถามผู้ดูว่าแยกเวลาได้ไหมโดยไม่มีข้อความ
อัปเดต `test_status` ใน `COLOR_GRADE_LIBRARY.json` หลังทดสอบ (ตอนนี้ = syntax_tested เท่านั้น)


## 10-editing-transitions — FD10 — Editing & Transitions (การตัดต่อและการเปลี่ยนช็อต)
- **T10-A (cue vs no cue):** ฉากเดียวกัน 3 เวอร์ชัน: (1) คัทบนเฟรมนิ่ง (2) คัทตอนหันหน้า (3) J-cut เสียงนำ 0.5 s → ให้คน 3 คนดูโดย "นับคัท" เปรียบเทียบจำนวนคัทที่พลาด (คาดว่า 2,3 ซ่อนได้ดีกว่า — ทดสอบเล็ก ไม่ใช่ผลวิจัย)
- **T10-B (pace curve):** ตัดฟุตเทจชุดเดียวเป็น 3 แบบ: ASL คงที่ 2 s / ASL คงที่ 0.8 s / โค้ง 3→0.6→4 s → เทียบว่าคลิปไหนรู้สึกมี "พีค"
- **T10-C (Bordwell test):** บทสนทนา 20 s ทำแบบ 2 ช็อตยาว vs 10 singles → จดว่าแบบไหนอ่านความสัมพันธ์ได้ดีกว่า แบบไหนพลังกว่า
- เกณฑ์ผ่าน: ทุกคัทมี cue, ไม่มี jump โดยไม่ตั้งใจ, กราฟ ASL มีรูปทรง, transition ไม่เกิน 3 ชนิด


## 11-film-grammar — FD11 — Film Grammar (ไวยากรณ์ภาพยนตร์)
- **T11-A:** บทสนทนาเดียว 3 เวอร์ชัน: ถูกเส้น / ข้ามเส้น 1 คัทกลางฉาก / ข้ามเส้นแบบ arc ต่อเนื่อง → ให้ผู้ชม 3 คนวาดตำแหน่งคนทั้งสอง และเล่าความรู้สึก; เทียบเวลาที่ใช้ตอบ (สะท้อน `HuffSchwan2012` ในระดับเล็ก)
- **T11-B:** ทำเส้นทาง "บ้าน → ร้าน" 4 ช็อต ทิศคงที่ vs สลับทิศช็อตที่ 3 → ถามว่า "เขากำลังไปหรือกลับ"
- เกณฑ์ผ่าน: ผังกล้องฝั่งเดียว, arrow test ผ่านทุกคัท, ทิศเดินทางคงที่


## 12-visual-psychology — FD12 — Visual Psychology of Film (จิตวิทยาการมองในภาพยนตร์)
- **T12-A (Kuleshov ย่อส่วน):** หน้าเดียวกัน × บริบท 3 แบบ (อาหาร/งานศพ/อันตราย) → ถาม 5 คนให้ให้คะแนน valence −4..+4 และ arousal 1–9 (ตามสเกล Calbi2017) — คาดว่าบริบทอันตรายเปลี่ยนมากสุด
- **T12-B (motion wins):** ภาพสินค้าเดียวกัน 3 เวอร์ชัน: ฉากหลังนิ่ง / ฉากหลังใบไม้ไหว / สินค้ามี glint เคลื่อน → saliency + ถามว่า "จำอะไรได้"
- **T12-C (tyranny):** คลิป 15 s ดูแบบมี/ไม่มี 10 s ก่อนหน้า → ถามคำถามอนุมาน 1 ข้อ
- เกณฑ์ผ่าน: subject = จุด saliency สูงสุดในทุก key frame; ข้อความสำคัญไม่ชน action


## 13-emotional-cinematography — FD13 — Emotional Cinematography (ภาพยนตร์เชิงอารมณ์: Emotional Camera Matrix)
- **T13-A (one scene, three emotions):** ฉาก "ลูกค้าลองแว่น" ถ่าย 3 แบบตามแถว `emo.joy`, `emo.vulnerability`, `emo.mystery` เปลี่ยนเฉพาะกล้อง/แสง/สี/จังหวะ (บทเดิม) → ผู้ชมทายอารมณ์; ดูว่าคันโยกไหนพาอารมณ์ได้จริง
- **T13-B (CU dose):** คลิป 30 s เวอร์ชัน 0/2/5 close-up (ตามแนว `Balint2020`) → ให้ผู้ชมเล่าเรื่องสั้นๆ นับคำที่พูดถึงความรู้สึกตัวละคร
- **T13-C (push vs zoom):** push-in กายภาพ (2.5D parallax) vs scale zoom บนภาพเดียวกัน → ถามว่า "รู้สึกใกล้ชิดแค่ไหน 1–7"
- เกณฑ์ผ่าน: ≥ 2/3 คนระบุอารมณ์ตรงหรือใกล้เคียง; โค้งความเข้มมีจุดพีคเดียวชัด


## 14-visual-storytelling — FD14 — Visual Storytelling (เล่าเรื่องด้วยภาพ)
- **T14-A:** ฉากเดียว 3 แบบ: (1) VO อธิบายทั้งหมด (2) VO + ภาพแสดง (3) ภาพอย่างเดียว + 1 ข้อความ → ถามความเข้าใจ 2 ข้อ + ความชอบ 1–7
- **T14-B:** ออกแบบ motif 1 ชิ้นที่เปลี่ยน 3 สถานะใน 3 ช็อต; คนดูอธิบายการเปลี่ยนได้ไหม
- **T14-C:** carousel 5 ภาพ Mint & Tao ติดป้ายบทบาท Cohn; สลับลำดับ peak/initial แล้วดูว่าเรื่องพังไหม
- เกณฑ์ผ่าน: mute test ≥ 70%, ทุก payoff มี plant, VO ไม่ซ้ำภาพ


## 15-acting-body-language — FD15 — Character Acting & Body Language for Camera (การแสดงและภาษากายสำหรับกล้อง)
- **T15-A (distance):** ภาพ Mint & Tao 3 ระยะ (ไกล/กลาง/ใกล้) โดยท่าทางเดิม → ผู้ชมเดาความสัมพันธ์
- **T15-B (scale):** การแสดงเดียวกันใน WS และ CU (เล็ก vs ใหญ่) × 2 = 4 เวอร์ชัน → อันไหน "จริง" ที่สุดในแต่ละขนาด
- **T15-C (look-before-cut):** คัทแบบมีการหันมองก่อน vs คัทเฉยๆ ไปยังสินค้า → นับว่าผู้ชมจำสินค้าได้กี่คน
- เกณฑ์ผ่าน: silhouette อ่านได้, ไม่มีการมองผิดทิศ, การแสดงสเกลตรงกับขนาดช็อต


## 16-animation-principles — FD16 — Animation Principles (หลักการแอนิเมชัน: 12 หลัก, timing, spacing, holds, smears, 1s/2s)
1. **ตารางหันหัว**: ทำ `R.look` ฉากเดียวกัน 3 แบบ head dur = 2 F / 9 F / 20 F + VO เดิม → ถามคนดู 3 คนว่า "ตัวละครรู้สึกอะไร" แล้วเทียบกับตาราง 2.1 (บันทึกผลใน `story-clips/_craft/LEARNING-LOG.md`)
2. **น้ำหนักสินค้า**: แว่นหล่นลงโต๊ะ 3 แบบ — (ก) linear 8 F (ข) `power2.in` 10 F + bounce 1 ครั้ง 4 F (ค) `power3.in` 12 F + squash 3% → ถามว่าแบบไหน "ดูแพง/ดูเบา/ดูปลอม"
3. **Moving hold**: ช็อตฟัง VO 4 s แบบนิ่งสนิท vs breathe+blink vs breathe+blink+drift — วัดว่ามีคน "รู้สึกว่าค้าง" กี่คน
4. **On 1s vs 2s**: ฉาก walk 3 s ด้วย `R.twos` เปิด/ปิด → เปรียบเทียบความรู้สึก "วาดมือ" vs "ลื่นแบบ CG"
- Test case ผ่านเมื่อ: ทุกช็อตมี moving hold, ไม่มี action > 6 F ที่ไม่มี anticipation, overlap ≥ 2 F ทุกส่วนห้อย


## 17-cartoon-cinematography — FD17 — Cartoon Cinematography (การกำกับภาพในงานการ์ตูน: layout, staging, กล้อง 2D/3D, multiplane, ธรรมเนียมอนิเมะ)
1. ฉากเดียวกัน 3 แบบ: (ก) ภาพเดียวแพน (ข) 3 ชั้น d .8/1/1.3 (ค) 4 ชั้น d .3/.8/1/1.5 → ให้คน 3 คนจัดอันดับ "ความลึก" และ "ดูแพง"
2. ช็อกแบบเต็ม (`emote shock` 18 F) vs truck-in on held + hit → เทียบแรงกระแทกและเวลาทำ
3. Animetism vs cinematism: เปิดเรื่องด้วย lateral slide vs push-in — ถามว่าโทนเรื่อง "นุ่ม/นิทาน" หรือ "ดราม่า/หนัง"
- ผ่านเมื่อ: ไม่มีขอบโผล่, ทุกช็อตมี layout checklist ครบ 8 ข้อ, ใช้กล limited อย่างน้อย 1 อย่างแทนงาน animate ที่ไม่จำเป็น


## 18-motion-design — FD18 — Motion Design (easing, kinetic typography, overlap/offset, follow-through, ระบบ motion ของ Material/Apple, GSAP)
1. **คำเดียว 4 อารมณ์**: คำว่า "ใหม่" ทำ 4 แบบ (jumping / expansion / shimmy / pendulum) ความเร็วเท่ากัน → ให้คน 5 คนเลือกอารมณ์ → เทียบกับตาราง 2.6 (ทดสอบว่าผลของ Kim2016 ใช้กับคำไทยได้ไหม; บันทึกผล)
2. **Ease A/B**: ราคาเข้าแบบ `power2.out` vs M3 emphasized decelerate vs `back.out(1.7)` → อันไหน "ดูพรีเมียม"
3. **Stagger**: callout 3 ชิ้น stagger 0 / 4 / 12 F → อันไหนอ่านลำดับได้และไม่รู้สึกรอ
- ผ่านเมื่อ: ไม่มี linear บนสิ่งที่ไม่ใช่กลไก, ราคาอ่านนิ่ง ≥ 1.5 s, เข้า-ออกใช้ decel/accel ถูกทิศ


## 19-sound-music-sync — FD19 — Sound Design & Music Sync (diegetic, synchresis, added value, hit points, beat-sync, J/L, room tone, SFX layering)
1. **Synchresis**: ภาพแว่นวางโต๊ะเดียวกัน ใส่ 3 เสียง (คลิกพลาสติก / กริ๊งแก้ว / ทุ้มไม้) → ถามว่า "แว่นทำจากอะไร ราคาประมาณเท่าไร" (เสียงเปลี่ยนการรับรู้วัสดุ)
2. **Offset test**: hit เดียวกันวาง −2, −1, 0, +1, +2 F → ให้ 3 คนบอกว่าอันไหน "ตรง" (ทดสอบกฎ 2.1 กับการ์ตูนของเรา; บันทึกผลใน LEARNING-LOG)
3. **Music meaning**: ฉากกำกวม (ทอนมองประตู) กับเพลง major/ minor/ ไม่มีเพลง → ถามว่าจะเกิดอะไรต่อ (ทดลองซ้ำแบบ Boltz2001)
4. **Beat vs emotion**: montage 10 s คัตทุก beat vs คัตทุก 2 bar + 1 คัต off-beat ที่ reaction → อันไหนดูจบ
- ผ่านเมื่อ: ทุก hit อยู่ 0/+1 F, ไม่มีรูเสียง, คัตใหญ่ ±1 F จาก beat ที่ตั้งใจ, VO ชัด LD ≥ 10 LU


## 20-genre-directing-styles — FD20 — Film Genre & Directing Styles (ประเภทภาพยนตร์และแนวทางการกำกับ)
- **T20-A:** ฉากเดียว 3 genre (ตารางข้อ 11) → ผู้ชมทาย genre จาก 3 วินาทีแรก; จดว่าคันโยกไหนบอก genre มากสุด (แสง? เสียง? การเคลื่อน?)
- **T20-B:** classical vs intensified (ตามแนว `Bordwell2007_Revisited`) — ฉากบทสนทนาเดียวกัน
- **T20-C:** semantic-only prompt vs semantic+syntax shot list → critic ให้คะแนน "เหมือนหนัง genre นั้นจริง" 1–10
- เกณฑ์ผ่าน: ≥ 2/3 ทาย genre ถูก; prompt ผ่าน audit


## 21-video-technical-specs — FD21 — Video Technical Specs (ความละเอียด, fps และความรู้สึกการเคลื่อนไหว, shutter 180°, codec/bitrate, Rec.709/sRGB, สเปกแพลตฟอร์ม)
- **T1 Matrix:** PNG ผิว+กรอบแดง ส่งออก 2 แบบ (default vs bt709+setparams) ดูบน iPhone และ Android — บันทึกความต่าง
- **T2 Conform:** คลิป Wan 5 วิ → `fps=30` vs `minterpolate` — ดูหน้า/มือ/ขอบแว่นทีละเฟรม เลือกค่าเริ่มต้นของบ้าน
- **T3 Motion blur:** kinetic type เดียวกัน 30 fps ไม่มี blur vs 60→tmix→30 — ถามผู้ดูว่าอันไหน "ลื่น/ดูแพง" และอ่านออกไหม
- **T4 Bitrate floor:** ส่ง CRF 14/18/23 ขึ้นบัญชีทดสอบ (ถ้าผู้ใช้อนุญาต) ดาวน์โหลดกลับ เทียบ banding บน gradient ฟ้า
- **T5 Shorts rule:** คลิป 9:16 ยาว 2:50 vs 16:9 ยาว 2:50 — ยืนยันการจัดหมวดตาม `YouTube_Shorts3min`
อัปเดต `test_status` ใน `TECH_SPEC_PRESETS.json`


## 22-ai-video-generation — FD22 — AI Video Generation (การสร้างวิดีโอด้วย AI: เลือกโมเดล คุมกล้อง คุมเฟรม)
- **Test A (ไวยากรณ์กล้อง):** ภาพเดียว 3 เวอร์ชันบน Wan seed เดียว: (1) ไม่ระบุกล้อง (2) "locked-off static camera" (3) "slow push in" → วัด: กล้องขยับเองไหมใน (1)? background parallax ต่างกันไหม? บันทึก dynamic degree ด้วยตา (0–2)
- **Test B (positive vs negative):** Wan `--negative` ค่าเริ่ม vs prompt ที่ไม่มีคำปฏิเสธ แต่เขียน "rigid glasses keep their exact shape" → นับเฟรมที่กรอบ warp (sample 2 fps)
- **Test C (ความยาว):** 2 s × 2 ต่อกัน vs 4 s รวด (เท่าที่ VRAM ไหว) → เทียบ identity drift ช่วงท้าย (ข้อเสนอของ Sora cookbook — ยังไม่ทดสอบในเครื่องเรา: `test_status: untested`)
- ผ่านเมื่อ: เขียนผลลง LEARNING-LOG พร้อม seed/prompt/เวลา และสรุปว่าข้อแนะนำไหนจริงกับ Wan 5B GGUF


## 23-consistency — FD23 — Character & Scene Consistency (ความต่อเนื่องของตัวละครและฉาก ในงานภาพ/วิดีโอ AI)
- **Test A (3 วิธีคุมตัวตน):** ฉากเดียว "Aaron เปิดประตู" 3 เวอร์ชัน: (1) text descriptor อย่างเดียว (2) Codex `-i` ref sheet (3) ภาพจาก (2) → Wan I2V. ให้คะแนน markers 7 ข้อ (หัว ผม แว่น ตา ไฝ เส้น สัดส่วน) ต่อเวอร์ชัน (ถามโควตา Codex ก่อน)
- **Test B (chaining):** 3 ช็อตต่อกันแบบ last-frame handoff vs anchor keyframes → นับ markers ที่หลุดในช็อต 3
- **Test C (mirror):** ขอภาพ Aaron หันขวา 4 seed → นับว่าไฝย้ายข้างกี่ครั้งเมื่อระบุ/ไม่ระบุ "viewer's left"
- บันทึกผลใน `story-clips/_craft/LEARNING-LOG.md` และ memory (`memory.py add --type error` ถ้าเจอแพทเทิร์น)


## 24-camera-path-planning — FD24 — Camera Path Planning (วางเส้นทางกล้องเป็น keyframe: เฟรมเริ่ม/จบ, easing, ความเร็ว, parallax, 180°, แรงจูงใจ → JSON → rig.js / 2.5D / AI)
- **TC-FD24-A (ease)**: path เดียว 3 ease (`none`, `sine.inOut`, `power2.inOut`) → อันไหน "มีคนถือกล้อง"; คาด: inOut
- **TC-FD24-B (clamp)**: key px 1300 ที่ s 1.1 vs 1.6 → validator ต้องเตือนอันแรก; render ยืนยันว่ากล้องไม่ไปถึง
- **TC-FD24-C (หนึ่งแผน หลายเครื่องมือ)**: path push 3 s เดียวกัน → rig.js, 2.5D (mapping §2.8), Wan (`--seconds 3 --steps 8`) → เทียบ parallax, เสถียรภาพสินค้า, เวลาที่ใช้; บันทึกผลลง LEARNING-LOG และอัปเดต `test_status`


## 25-storyboard-shot-planning — FD25 — Storyboarding & Shot Planning (thumbnails, floor plan, overhead diagram, animatic, shot list, coverage)
1. **3 ทางเลือก**: บทเดียวกัน ("ยายจันทร์ยื่นแว่นให้ทอน") บอร์ด 3 แบบ — (ก) master + 2 singles (ข) OTS สลับ + insert มือ (ค) POV ผ่านเลนส์ + ECU → ทำ animatic ทั้ง 3 ด้วย rig (ถูก) แล้วถามคนดูว่าแบบไหน "อบอุ่นที่สุด" และทำไม
2. **Floor plan**: วาด overhead ของร้าน + ตำแหน่งกล้อง 5 ช็อต แล้วตรวจเส้น 180°
3. **Ripple test**: ยืด panel 3 จาก 1 s เป็น 2 s → ตรวจว่าเสียง/คัตถัดไปเลื่อนตาม (ทดสอบว่า pipeline ใช้ timing.json ตัวเดียว)
- ผ่านเมื่อ: ทุก panel มี duration + why + visual focus, floor plan ไม่มีการข้ามเส้นโดยไม่ตั้งใจ, animatic ยาวเท่า VO ± 0.2 s


## 26-production-workflow — FD26 — Video Production Workflow (ขั้นตอนการผลิตวิดีโอ: pre → production → post → deliver)
- **Test A:** เอาคลิปที่เคยส่งแล้ว 1 ชิ้น ไล่ย้อนตาราง G0–G11 — ด่านไหนไม่มีหลักฐาน (ไฟล์/บันทึก)? เขียนสิ่งที่ขาด
- **Test B (audio-first vs image-first):** คลิป 15 s เดียวกัน ทำ 2 ลำดับ → วัดจำนวน gen ที่ทิ้งและเวลาที่ใช้
- **Test C:** รัน video_qc กับ export ทุกตอนของซีรีส์หนึ่ง → ตารางสรุป loudness/true peak/black → ตัดสินว่าต้องแก้ export template ไหม


## 27-video-quality — FD27 — Video Quality Assessment (การประเมินคุณภาพวิดีโอ: เทคนิค + AI artifact + คนดู)
- **Test A:** รัน video_qc กับ export ทุกไฟล์ใน `story-clips/*/EP*/export/` → ตาราง I/TP/LRA/black → หาแพทเทิร์น (export template ขาด limiter?)
- **Test B (ตาคน vs เครื่อง):** คลิป AI 5 ชิ้น ให้ผู้ใช้ให้คะแนน 1–5 และให้ critic ให้คะแนนตาม checklist → ดูว่าเรียงลำดับตรงกันไหม (Spearman ด้วยมือ) — ฐานของการ calibrate (FD30)
- **Test C:** export คลิปเดียวที่ CRF 18/23/28 → SSIM เทียบ master + ดูบนมือถือ → หาค่า CRF ต่ำสุดที่คนแยกไม่ออก


## 28-attention-retention — FD28 — Audience Attention & Retention (ความสนใจและการดูต่อของผู้ชม)
- **T28-A (3 openings):** คลิปเดียว 3 เปิด: (1) โลโก้ 1.5 s (2) ปัญหาที่เห็นได้ (3) ผลลัพธ์ก่อน (in medias res) → โพสต์เป็น A/B ถ้าแพลตฟอร์มให้ หรือให้ 5 คนดูในฟีดจำลองแล้วจดว่าปัดที่วินาทีไหน
- **T28-B (pulse vs static brand):** โลโก้ค้าง 3 s กลางจอ vs 3 pulse × 1 s มุมบน (ตามแนว `Teixeira2010`)
- **T28-C (joy staircase):** ภาพลูกค้าดีใจคงที่ vs ไต่จาก neutral → ยิ้ม → หัวเราะ (`Teixeira2012`)
- เกณฑ์ผ่าน: frame 0 อ่านได้ที่ 1/4 ขนาด; proposition ≤ 3 s; ไม่มีโลโก้ค้างกลางจอ; retention dip ทุกจุดมีบันทึกสาเหตุ


## 29-originality-identity — FD29 — Originality & Creative Identity (ความเป็นต้นฉบับ และลายเซ็นของสตูดิโอ)
- **Test A (reference → principle):** เลือกช็อตจากหนังที่ชอบ 1 ช็อต เขียน 3 หลักการ (องค์ประกอบ แสง จังหวะ) แล้วสร้างช็อตของเราเองที่ใช้หลักการเดียวกันกับเรื่องแว่น → ให้คนอื่นดูคู่กัน: จำได้ไหมว่ามาจากหนังเรื่องไหน? ถ้าจำได้ = ใกล้เกิน
- **Test B (signature):** ทำ 3 คลิปเรื่องต่างกันด้วย signature sheet เดียว → ให้ผู้ใช้ดูปนกับคลิปร้านอื่น 3 ชิ้น: แยกของเราออกได้ไหม
- **Test C:** prompt เดียวกัน "with/without" ชื่อสไตล์ทั่วไป (เช่น "film noir" = แนว ไม่ใช่บุคคล) → เปรียบเทียบความ generic


## 30-automated-evaluation — FD30 — Automated Creative Evaluation (การประเมินงานสร้างสรรค์แบบอัตโนมัติ: rubric, AI judge, frame sampling, ffmpeg)
- **Test A (position bias ของเรา):** คลิป 2 เวอร์ชัน → critic sub-agent 2 ตัว คนละลำดับ → ผลตรงกันไหม (บันทึกใน domains/12 §6.4 calibration)
- **Test B (sampling blind spot):** สร้างคลิปทดสอบที่มี flicker 3 เฟรม (ffmpeg overlay) → contact sheet 2 fps เห็นไหม? freezedetect/blackdetect จับไหม? → สรุปว่าอะไรต้องคนดูความเร็วจริง
- **Test C (agreement):** 10 คลิปเก่า: verdict critic vs verdict ผู้ใช้ (จาก memory) → % ตรงกัน และ critic เข้มหรือหลวมไป


