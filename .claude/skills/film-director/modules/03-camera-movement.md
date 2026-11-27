# FD03 — Camera Movement (การเคลื่อนกล้อง: หมุน/ย้าย/เลนส์/ระบบพยุง + วิธีทำในเครื่องมือของเรา)

> ต่อยอด ไม่ซ้ำ: ตาราง pan/tilt/roll vs dolly/truck/pedestal/crane/orbit, แรงจูงใจ 4 ชนิด, speed+easing, Kuleshov/montage อยู่ใน
> `story-clips/_craft/curriculum/05-movement-language.md` §1; ตาราง move→rig.js ใน `GUIDE.md` §2; AI video ทั่วไปใน `curriculum/10-ai-video.md`.
> บทนี้เพิ่ม: **หลักฐานวิจัย** (dolly vs zoom ในสมอง, parallax, vection/เมาภาพ), ข้อวิจารณ์ "กล้องขยับตลอด" (Bordwell 2023),
> **ข้อจำกัดจริงของ rig.js** (pan ต้องมี s>1, zoom vs dolly ขึ้นกับ `--d`), วิธีทำใน 2.5D, และคำ/ค่าที่ Wan/Kling/Luma/Veo/Runway ระบุ (ณ 2026-11-27).
> คลัง → `libraries/CAMERA_MOVEMENT_LIBRARY.json` (24 move; ทุกตัวมี `rig_js`, `html_25d`, `wan_prompt`, `kling_setting`, `luma_key`)

## 1. นิยามและหลักการพื้นฐาน
แยก move ด้วยคำถาม 3 ข้อ:
1. **กล้องหมุนหรือย้าย?** หมุน (pan/tilt/roll) = ไม่มี parallax, ย้าย (dolly/truck/pedestal/crane/arc/track) = มี parallax
2. **เปลี่ยนแค่เลนส์?** zoom = ขยายภาพ ไม่มี perspective change (`Google-VeoPromptGuide`: "the camera itself doesn't move"; `Runway-CameraControl2026`: "without parallax"); rack focus = ย้ายระนาบชัด
3. **อุปกรณ์พยุงให้ "ลายมือ" อะไร?** tripod (นิ่ง), handheld (สั่นแบบคน), Steadicam/gimbal (ลอย), drone/FPV (บิน)
และอีกชั้นหนึ่ง (จาก CameraBench): move แต่ละแบบอธิบายได้ทั้ง **เชิงเรขาคณิต** (truck ขวา 1 ม.) และ **เชิงความหมาย** (ตามคนเดิน) —
อัลกอริทึม SfM พลาดแบบหลัง, VLM พลาดแบบแรก, และคนที่ได้ tutorial ก่อนจะ annotate แม่นขึ้น (`Lin2025-CameraBench`) → ใน shot list เขียนทั้งสองชั้นเสมอ

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 หลักฐานวิจัย
| ข้อค้นพบ | ใช้อย่างไร | ระดับ |
|---|---|---|
| คลิปห้องว่างแบบ Steadicam ทำให้ beta mu-rhythm desynchronisation (ตัวชี้ motor resonance) แรงกว่า still และ zoom; ไม่พบผลในบริเวณ attention; ผู้ชมเล่าว่า Steadicam "เหมือนคนเดินเข้าไปหา" ที่สุด (n=18) | อยากให้คนดู "ก้าวเข้าไป" → ใช้การย้ายกล้อง/parallax ไม่ใช่ zoom | A, full text `Heimann2019`; งานก่อนหน้า `Heimann2014` |
| Motion parallax อย่างเดียวพอให้รับรู้รูปทรงและความลึก รวมถึงแบบที่ไม่ได้เกิดจากการขยับของผู้ดูเอง (เช่นในหนัง) | เหตุผลที่ `--d` layers ของ rig.js และ 2.5D depth ทำให้ภาพนิ่ง "เป็น 3D" | A, search-summary `RogersGraham1979` |
| จอ field-of-view กว้าง → vection และอาการเมาภาพ; การเพิ่ม jitter ให้ภาพที่พุ่งไปข้างหน้าเพิ่มทั้ง vection และอาการ; หมุนหลายแกนทำให้เมามากกว่าแกนเดียว | handheld + พุ่งหน้า + roll พร้อมกัน = สูตรเสี่ยงที่สุด → สั้น/แกนเดียว | A review, full text `KeshavarzRiecke2015` |
| วิดีโอโมเดลคุมกล้องแม่นได้ต้องใช้ pose/trajectory conditioning (โมดูลเสริม); camera กับ object motion แยกเป็นสองช่อง | คำใน prompt เป็นตัวคุมที่อ่อน → 1 move ต่อคลิป, เขียน move กับการกระทำของวัตถุแยกประโยค | A, abstract `He2024-CameraCtrl`, `Wang2024-MotionCtrl` |
| สายตาคนดูซิงก์กันสูงในหนังฮอลลีวูด | move ต้องพาไปที่ที่ตาคนดูอยู่แล้ว ไม่ใช่ไปทางอื่น | A, abstract `Loschky2015` |

### 2.2 ข้อวิจารณ์ "กล้องขยับตลอดเวลา" (expert opinion, tier B)
Bordwell เรียกสไตล์ปัจจุบันว่า intensified continuity ที่กล้องขยับแทบทุกช็อตแม้ตัวละครไม่ขยับ; ระบุ tic: **wobblecam**, **peekaboo reframing**
(เริ่มชัดแล้วลอยไปบังตัวละคร), **arc/"roundy-round"** (คำของ Ken Kwapis, ใช้ใน *E.R.* ให้รู้สึกเวลาไหลหาย), **slider drift** ที่สัญญาว่าจะเผยแต่ไม่เผย
— ตัดเร็วช่วยซ่อน move; เขาชื่นชม move ที่มีแรงจูงใจและ "จ่ายผลทางภาพ" (`Bordwell2023-CalmCamera`)
→ กฎของเรา: **ทุก move ต้องมี payoff ที่เฟรมจบ** (เผยอะไร/เปลี่ยนความสัมพันธ์อะไร) ไม่งั้นเปลี่ยนเป็น static + drift

### 2.3 ข้อจำกัดเครื่องมือที่ต้องรู้ก่อนวาง move (อ่านจาก `rig.js` 2026-11-27)
- `cam.move` clamp การเลื่อน: `|(px-960)·s| ≤ (s-1)·960` และ `|(py-540)·s| ≤ (s-1)·540` → **ที่ s=1 pan/truck ไม่ขยับเลย**;
  จะเลื่อน Δpx ต้อง `s ≥ 960/(960-|Δpx|)` (Δ200 → s≥1.27), แนวตั้ง `s ≥ 540/(540-|Δpy|)`
- **zoom vs dolly ใน rig.js** = ขึ้นกับ `--d` ของ layer: ทุก layer `--d:1` → การเพิ่ม s คือ zoom (ไม่มี parallax); bg .8 / ตัวละคร 1 / fg 1.3 → dolly
- **pan vs truck** ก็เช่นกัน: เปลี่ยน px บนฉากที่ `--d` ต่างกัน = truck (parallax), `--d` เท่ากันหมด = pan
- `rot` หมุนทั้ง `.cam` รอบ (960,540) ไม่มี clamp → ต้องเพิ่ม s เอง (FD02 §2.3)
- `drift` ใช้ `--dx/--dy` แยกจาก move → ซ้อนกับ move ได้; `shake` ใช้ `--shx/--shy`; แต่ **`move` สองอันซ้อนเวลากันบน node เดียว = tween ชนกัน** → รวมเป็น move เดียว
- ค่าคงที่ 960/540 ผูกกับ stage 1920×1080 → คลิป 9:16 (1080×1920) ต้องปรับค่าคงที่ก่อนใช้ (gap ของ rig — ยังไม่แก้ไฟล์)
- 2.5D (`kits/_template/clip-25d.html`): uniform `cam` (x,y ~±0.06) = truck/orbit, `zoom` 1.08→1.22 = push, `FOCUS` = ระนาบความลึกที่อยู่นิ่ง
  (FOCUS ที่ subject → subject นิ่ง ฉากหลังเลื่อนทางหนึ่ง ฉากหน้าเลื่อนอีกทาง = orbit เล็ก); เกิน ~8% ขอบจะฉีก (curriculum 10 §4.3)

### 2.4 ความเร็วและ easing (สรุปสั้น; รายละเอียด curriculum 05 §1.3, FD24)
- push ช้า 3–5% scale/s (ครุ่นคิด), 10–20%/s (ตระหนัก), snap 4–8 F [CRAFT]
- GSAP default ease = `power1.out` แต่ `cam.move` default = `sine.inOut` → ส่ง ease ทุกครั้งโดยตั้งใจ (`GSAP-Eases`)
- pan ความเร็วกลาง ๆ ที่ 24 fps กระตุก (judder) → ช้ามาก หรือเร็วเป็น whip [CRAFT]

## 3. เหตุผลที่ใช้
move เปลี่ยน "ข้อมูล" (เผย/ซ่อน), "ความสัมพันธ์" (เข้าใกล้/ถอย), และ "ร่างกายคนดู" (embodiment — EVIDENCE เบื้องต้น) ในช็อตเดียวโดยไม่ต้องคัต;
และกับภาพนิ่ง/ภาพ AI move คือสิ่งที่ทำให้มันเป็นวิดีโอ

## 4. ผลต่ออารมณ์และการรับรู้
| move | รู้สึก | หลักฐาน |
|---|---|---|
| push-in | สำคัญขึ้น, เข้าไปในใจ | CRAFT + Heimann2019 (embodiment) |
| pull-out | โดดเดี่ยว, คลี่คลาย, เผยบริบท | CRAFT |
| truck/track | ร่วมเดินทาง, สำรวจ | CRAFT; parallax = ความลึก (RogersGraham1979) |
| crane/drone | ยิ่งใหญ่, ผู้เล่ารู้ทุกอย่าง | CRAFT |
| handheld | ทันที, กังวล; jitter เพิ่ม vection+อาการ | CRAFT + EVIDENCE (KeshavarzRiecke2015) |
| zoom | มอง "ใกล้ขึ้น" แบบสังเกตการณ์ ไม่ใช่ก้าวเข้าไป | Heimann2019 (zoom < Steadicam) |
| dolly zoom | ตระหนักรู้/โลกเอียง | CRAFT + ตัวอย่างหนังใน Wiki-DollyZoom |

## 5. ใช้เมื่อไร
- มีแรงจูงใจชัด 1 ใน 4: physical / attention / emotional / narrative (curriculum 05 §1.2)
- ภาพนิ่ง (Codex/FLUX/ภาพจริง) ต้องกลายเป็นคลิป → push/orbit 2.5D
- ต้องเผยข้อมูลตามลำดับ (เผยสินค้าหลังชั้นวาง) → `move.reveal_past_foreground`

## 6. ไม่ควรใช้เมื่อไร
- ตอนมุก/ตอนตกใจที่ต้องรอ (เฟรมนิ่งให้คนดูหาสิ่งที่เปลี่ยน) · move ซ้อน move ที่ไม่ใช่ท่าทางเดียวกัน · ระหว่างคัตที่ไม่ใช่ whip/match ·
  FPV/handheld ยาวในคลิปพักสายตา (eye-break) หรือผู้ชมสูงวัย · orbit รอบแว่นด้วย AI video (กรอบละลาย)

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- **Vertigo (1958)** dolly zoom ออกแบบโดย Irmin Roberts; **Jaws (1975)** Brody ตระหนักว่ามีฉลาม; **The Lion King (1994)** Simba หลัง stampede;
  **Shaun of the Dead (2004)** ใช้แบบตลก; **Ratatouille (2007)** flashback ของ Anton Ego (`Wiki-DollyZoom`, tier E)
- **Bound for Glory (1976)** เครนลดลงแล้ว Garrett Brown เดินถือ Steadicam ต่อผ่านฉาก; **Rocky (1976)** วิ่งขึ้นบันไดพิพิธภัณฑ์ (`Wiki-Steadicam`, tier E, ปีขัดกันบางแหล่ง)
- **1917 (2019)** "หนึ่งช็อต" จาก long take หลายช็อตเย็บกัน, วางแผนกล้องเหมือนบทที่สอง, เปลี่ยน rig กลางช็อต (`Deakins1917-Planning`, tier D)
- **E.R.** circling camera ("roundy-round") ระหว่างผ่าตัด; **Succession** wobblecam; **The Bourne Ultimatum (2007)** peekaboo (`Bordwell2023-CalmCamera`)

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip (rig.js)**: ทุก move ต้องผูก beat ใน shot list; ใช้ `--d` 3 ชั้นเสมอเพื่อให้ push เป็น dolly; settle 6–12 F ก่อนคัต
- **Product/promo แว่น**: 2.5D push + orbit เล็ก (FOCUS ที่แว่น) ปลอดภัยที่สุด — กรอบไม่ละลาย; AI video ใช้กับฉากหลัง/นางแบบ แล้ววาง cutout แว่นจริงทับ (curriculum 10 §4.3)
- **Reels/TikTok 9:16**: tilt และ pedestal แนวตั้งได้ผลดี (ความสูงของเฟรม); whip/snap zoom เป็นตัวต่อ beat; ระวังแกนหลายแกน+สั่นบนจอเต็ม
- **Explainer**: slow push ระหว่างประโยคสำคัญ, truck ตามรายการ (list) บนกระดาน
- **Cartoon (Mint & Tao / Aaron)**: ภาพ 1:1 carousel → ใช้ "move ที่วาดเป็นภาพ" (เปลี่ยนขนาด/มุมระหว่างสไลด์) แทน; ใน Reel ใช้ drift + push ช้า
- **Documentary/talking head**: locked + drift, punch-in ดิจิทัล (zoom) ระหว่างคำสำคัญ — ซื่อสัตย์ว่าเป็น zoom

## 9. AI image prompt examples
(ภาพนิ่งไม่มี move — ให้เตรียม "เฟรมเริ่ม/เฟรมจบ" ที่ทำให้ move ในขั้นวิดีโอง่าย)
```
wide shot of a small optician's shop seen from the doorway, deep space with foreground shelf on the left, midground counter, background window — layered depth for a slow push-in
the same shop, medium close-up at the counter, the optician holding glasses, foreground shelf blurred at the left edge — end frame of the push
```

## 10. AI video prompt examples
```
Slow push-in on her face as she reads the letter.                                         (Runway formula: move + speed + subject + reason)
Start low behind the ledge on a lone figure, then crane up over the ridge to reveal the canyon below.   (multi-stage: describe what each stage reveals)
Locked-off tripod shot. The old man reads the label; the camera does not move.              (นิ่ง: "locked/tripod" ไม่ใช่ "no camera movement")
The camera trucks right along the display shelves, glasses sliding past in the foreground.
```
**กฎจากผู้ผลิต (ณ 2026-11-27, untested ที่นี่ยกเว้นระบุ)**
- Runway: 1 move ต่อคลิปเสถียรที่สุด; preset กับ prompt ต้องไม่ขัดกัน; ตั้งค่า movement เป็น 0 ใน settings เพื่อหยุดกล้อง; ทดสอบสั้นก่อนหา drift/ขอบบิด (`Runway-CameraControl2026`); ห้ามประโยคปฏิเสธ (`Runway-Gen4Guide`)
- Kling: 6 แกน horizontal, vertical, zoom, pan, tilt, roll + Master Shots 4 แบบ (`Kling-CameraGuide`); ตาม ComfyUI doc **pan = หมุนขึ้นลง, tilt = หมุนซ้ายขวา (สลับกับภาษาหนัง)** และ zoom = focal length (`Comfy-KlingCameraNode`) → ทดสอบ 2 s ก่อน
- Luma: keys `push_in, pull_out, truck_*, pedestal_*, crane_*, orbit_*, roll_*, dolly_zoom, bolt_cam, handheld, static…` (`Luma-Concepts`); learning hub เรียก push-in ว่า "zoom" → เขียนความหมายกายภาพเพิ่ม (`Luma-LearningHubMotion`)
- Wan 2.2 TI2V 5B: ไม่มีพารามิเตอร์กล้อง — คุมด้วยคำใน prompt เท่านั้น (`Wan22-TI2V5B-Card`); ใน `tools/wan.py` ถ้าขยับแรงเกินให้ใส่ "very subtle", "almost still" ก่อนแตะโค้ด (curriculum 10)

## 11. Shot list example (คลิปโปรโมต 12 s, 9:16, ทุกช็อตมี move + payoff)
| # | ช็อต | move (geometry / semantics) | เครื่องมือ | payoff |
|---|---|---|---|---|
| 1 | WS หน้าร้าน | pedestal up 0.5 ม. / เผยป้ายเหนือประตู | 2.5D cam.y + zoom | ชื่อร้าน |
| 2 | MS นางแบบ | leading track / เดินเข้าหากล้อง | Wan (ฉาก) | ความมั่นใจ |
| 3 | CU แว่นบนหน้า | slow push 4%/s / เข้าไปที่ดวงตา | 2.5D FOCUS=แว่น | รายละเอียด |
| 4 | ECU บานพับ | rack focus fg→hinge | rig.js `cam.rack` | งานฝีมือ |
| 5 | MS ยิ้ม | static + drift | rig/HTML | ปิด + โลโก้ |

## 12. ข้อผิดพลาดที่พบบ่อย
1. move ไม่มีแรงจูงใจ/ไม่มี payoff (slider ว่างเปล่า) 2. linear ease กับ push → เหมือนเครื่องจักร 3. pan/truck ใน rig.js ที่ s=1 (ไม่ขยับ)
4. ใช้ zoom ทั้งที่อยากได้ dolly 5. คัตระหว่างกล้องยังวิ่ง (ยกเว้น whip/match) 6. handheld แรงบนจอโทรศัพท์ 7. Kling pan/tilt สลับแกน 8. orbit รอบสินค้าด้วย AI

## 13. วิธีตรวจและแก้
- เขียนประโยค: "กล้อง [move] เพราะ [แรงจูงใจ] และจบที่ [payoff]" — เขียนไม่ได้ = ตัด
- ดูเฉพาะเฟรมแรกและเฟรมสุดท้าย: ทั้งคู่จัดองค์ประกอบดีไหม
- ตรวจ parallax: fg/bg เลื่อนต่างกันไหม (ถ้าต้องการ dolly/truck)
- AI clip: ดูทีละเฟรมที่กลางคลิป (จุดที่มักบิด); ใช้แค่ 1.5–3 s ที่ดีที่สุด
- ความสบายตา: เล่นบนโทรศัพท์เต็มจอ 3 รอบ — เวียนหัวไหม

## 14. แบบฝึกหัด + test case
- **TC-FD03-A (dolly vs zoom)**: ฉาก 3 layer ใน rig.js, ทำ (1) s+0.3 ที่ `--d` .8/1/1.3 (dolly) (2) s+0.3 ที่ `--d` 1 ทั้งหมด (zoom) (3) static. เทียบ: อันไหน "รู้สึกเหมือนเดินเข้าไป" (คาดจาก `Heimann2019`: dolly)
- **TC-FD03-B (Wan wording)**: ภาพเดียว seed เดียว 4 prompt: "slow dolly in", "slow push-in", "slow zoom in", "camera moves closer" (`--seconds 2 --steps 8`) → วัดว่าอันไหนมี parallax จริง/ตรงคำ บันทึกลง LEARNING-LOG + CAPABILITY_MATRIX
- **TC-FD03-C (payoff)**: truck 3 s ผ่านชั้นวาง: (1) จบที่ผนังว่าง (2) จบที่แว่นรุ่นใหม่ที่ส่องไฟ → ผู้ใช้เลือก

## 15. แหล่งอ้างอิง
`sources/camera.json`: Heimann2019, Heimann2014, RogersGraham1979, KeshavarzRiecke2015, He2024-CameraCtrl, Wang2024-MotionCtrl, Lin2025-CameraBench,
Loschky2015, Bordwell2023-CalmCamera, Google-VeoPromptGuide, Runway-CameraControl2026, Runway-Gen4Guide, Kling-CameraGuide, Comfy-KlingCameraNode,
Luma-Concepts, Luma-LearningHubMotion, Wan22-TI2V5B-Card, GSAP-Eases, Wiki-DollyZoom, Guinness-DollyZoom, Wiki-Steadicam, Deakins1917-Planning, Katz2019, Bowen2017, FilmArt13.
**Gaps**: ไม่มีงานวิจัยผลของ move ต่อ retention บนโซเชียล; ไม่มีการทดสอบคำกล้องกับ Wan/Kling ในเครื่อง; Kling API ทางการยังไม่ได้เปิดอ่าน (ช่วงค่า/รุ่นที่รองรับ)
