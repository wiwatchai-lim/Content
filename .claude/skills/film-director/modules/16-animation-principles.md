# FD16 — Animation Principles (หลักการแอนิเมชัน: 12 หลัก, timing, spacing, holds, smears, 1s/2s)

> ต่อยอด ไม่ซ้ำ: พื้นฐาน timing/spacing, drawing hierarchy, 1s/2s/3s, walk cycle, lip-sync, smear อยู่ใน
> `story-clips/_craft/curriculum/06-2d-animation.md` §1 และการ map 12 หลักเข้า `rig.js` อยู่ใน `story-clips/_craft/GUIDE.md` §4
> บทนี้เพิ่ม: **หลักฐานวิจัย** ว่าหลักไหนช่วยการรับรู้จริง, **ตารางเฟรม 24/30 fps** ที่ใช้ตัดสินใจได้ทันที, moving hold,
> การอ่าน timing chart → GSAP ease, และวิธีตรวจ/แก้ งานจริงเรียกใช้ท่าจาก `libraries/ANIMATION_MOTION_LIBRARY.json`
> ป้าย: **[EVIDENCE]** = มีงานวิจัยรองรับ, **[CRAFT]** = แนวปฏิบัติของวงการ (tier D/B ไม่ใช่วิทยาศาสตร์)

## 1. นิยามและหลักการพื้นฐาน
- **12 principles** (Thomas & Johnston 1981) — squash & stretch, anticipation, staging, straight ahead / pose to pose,
  follow through & overlapping action, slow in / slow out, arcs, secondary action, timing, exaggeration, solid drawing, appeal
  [CRAFT; ที่มา `ThomasJohnston1981_IllusionOfLife` ผ่านการสรุปใน `Lasseter1987`]
- **Timing** = จำนวนเฟรมของการกระทำ → บอก *น้ำหนัก ขนาด และอารมณ์* · **Spacing** = ระยะห่างระหว่างภาพแต่ละเฟรม → บอก *ความเร่ง*
  Lasseter (อ้าง Whitaker & Halas): "ผลของน้ำหนักขึ้นกับ spacing ของท่า ไม่ใช่ตัวท่า" — ลูกปืนใหญ่ที่วาดสวยแต่เคลื่อนแบบลูกโป่ง จะไม่ดูเป็นลูกปืนใหญ่ [CRAFT, `Lasseter1987`, `WhitakerHalas2009_Timing`]
- **หน่วยเวลา**: 24 fps → 1 F = 41.7 ms; 30 fps → 1 F = 33.3 ms. แปลงเฟรม: `F30 = round(F24 × 1.25)` (12 F@24 = 15 F@30)
- **Hold** = ค้างท่า, **moving hold** = ค้างท่าแต่ยังมีชีวิต (หายใจ กะพริบ ผมไหวนิด ๆ) — ตัวละครที่หยุดนิ่งสนิทใน rig/CG ดู "ตาย" [CRAFT]
- **On 1s / 2s / 3s** — ภาพเปลี่ยนทุก 1/2/3 เฟรม (รายละเอียดใน curriculum 06 §1.1) ใน CSS เทียบเท่า `steps(n)` [`W3C_CSSEasing1`]; ใน rig.js คือ `R.twos(P, true)`

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 Timing = ความหมาย (ตารางหันหัวของ Thomas & Johnston)
สองภาพเดียวกัน (หัวเอียงขวา → หัวเอียงซ้ายเงยคางนิด) ความหมายเปลี่ยนตามจำนวน inbetween [CRAFT, อ้างใน `Lasseter1987`]

| inbetween | ความหมาย | เฟรมโดยประมาณ ถ้าวาดบน 2s (24 fps) [CRAFT, การคำนวณของเรา] | @30 fps |
|---|---|---|---|
| 0 | โดนแรงมหาศาล หัวแทบหลุด | 2 F (cut ตรง) | 2–3 F |
| 1 | โดนอิฐ/ไม้คลึงแป้งตีหัว | 4 F | 5 F |
| 2 | กระตุก ประสาท | 6 F | 8 F |
| 3 | หลบอิฐ | 8 F | 10 F |
| 4 | สั่งเฉียบ "ไปเลย!" | 10 F | 13 F |
| 5 | ทักทายเป็นมิตร "ทางนี้" | 12 F | 15 F |
| 6 | เห็นของที่อยากได้ | 14 F | 18 F |
| 7 | พยายามมองให้ชัด | 16 F | 20 F |
| 8 | หาเนยถั่วบนชั้น | 18 F | 23 F |
| 9 | พิจารณาอย่างใคร่ครวญ | 20 F | 25 F |
| 10 | ยืดกล้ามเนื้อที่ปวด | 22 F | 28 F |

ใช้เป็น "ไม้บรรทัด": อยากให้หันหัวรู้สึก "ตกใจ" → ≤ 6 F; "สนใจ/ครุ่นคิด" → 14–22 F. `R.look` ของเราใช้ head 9 F (≈ ช่วง "สั่ง/ทัก") — ปรับได้ตามอารมณ์

### 2.2 Anticipation ↔ ความเร็วของ action
ยิ่งคนดูคาดได้มาก action ยิ่งเร็วได้โดยไม่หลุด: Wally B. พุ่งออกจริงแค่ 3–4 เฟรม แต่ anticipation ยาวพอให้รู้ล่วงหน้า; ถ้า action เร็วมากแต่ไม่เตรียม ต้องขยาย anticipation หรือทำ action ให้ช้าลง; action ช้า → anticipation ลดลงได้ [CRAFT, `Lasseter1987`]
กฎทอง: เวลา **anticipation : action : reaction** ต้อง "พอ แต่ไม่เกิน" — มากไปความสนใจหลุด น้อยไปคนดูพลาด [CRAFT, `Lasseter1987`]

### 2.3 Follow-through ตามวัสดุ
อัตราการลากตามขึ้นกับมวลและความยืดหยุ่น: หนวดเบา → ลากนิดเดียว, เหล็กไม่ยืด → ลากมากกว่า, เท้านิ่มหนัก → ลากไกลสุดพร้อม squash/stretch และค้างอยู่หลายเฟรมหลังตัวออกไปแล้ว; ส่วนห้อยหลายชิ้นออกห่างกัน 1–2 เฟรม (overlap) [CRAFT, `Lasseter1987`]
→ ใน rig: ผม/tuft 2–4 F, ผ้าคลุม/ชายกระโปรง 4–6 F, สายคล้องแว่น/ต่างหูหนัก 3–5 F แล้ว overshoot ด้วย `back.out`

### 2.4 หลักฐานวิจัย — หลักไหนช่วยการรับรู้จริง
| หลัก | ผลวิจัย | ระดับความมั่นใจ |
|---|---|---|
| Squash & stretch | ช่วยให้คนทำนายวิถีของวัตถุเด้งได้แม่นขึ้นอย่างมีนัยสำคัญ (โดยเฉพาะของยืดหยุ่นสูง/ข้อมูลน้อย) และเกมที่ใช้ถูกเลือกว่าน่าดึงดูดกว่าเกือบ 2 เท่า; แต่ไม่พบว่าดึงความสนใจได้ [EVIDENCE, `Garcia2008_CartoonPhysics`] | กลาง (N เล็ก วัตถุง่าย) |
| Exaggeration (S&S บนลูกบอล) | squash เล็กน้อยถูกมองว่า "สมจริง" เท่าการเคลื่อนตามฟิสิกส์จริง; ถ้าไม่บอกวัสดุ คนยอมรับการเกินจริงได้มาก; ถ้าบอกวัสดุ ช่วงยอมรับแคบลงแต่ยังเกินฟิสิกส์ [EVIDENCE, `Schmidt2024_ExaggeratedMotion`] | กลาง–สูง (Cognition, CC BY) |
| Slow in/out, arcs, follow-through ใน UI | ลด "ความประหลาดใจ" ช่วยให้ติดตามการเปลี่ยนแปลงได้ (รายงานเชิงออกแบบ ไม่ใช่การทดลอง) [CRAFT/design report, `ChangUngar1993`] | ต่ำ–กลาง |
| Timing → น้ำหนัก/อารมณ์ | หลักวงการ ยังไม่พบการทดลองตรงในรอบนี้ [CRAFT] | — |

### 2.5 Timing chart → GSAP
ขีดบนชาร์ตเบียดไปทางคีย์ไหน = "favor" คีย์นั้น = slow in/out ทางนั้น: เบียดคีย์ปลาย → `power2.out`; เบียดคีย์ต้น → `power2.in`; เบียดทั้งสอง → `sine.inOut`/`power2.inOut`; ขีดเท่ากัน → `none` (กลไก) ถ้าต้องการ ease ไม่สมมาตร ให้เพิ่ม **breakdown** (คีย์กลาง) แทนการหา ease แปลก [CRAFT; ชื่อ ease จาก `GSAP_Eases`]

### 2.6 Smear / multiples / dry-brush
เฟรมเบลอยืดตามทิศ 1–2 F บนการเคลื่อนเร็วกว่าที่ inbetween จะอ่านทัน — UI ใช้ motion blur เพื่อให้ของเร็ว "ยังอ่านออก" [design report, `ChangUngar1993`]; rig: `R.smear(P,t,dir)` จำกัด ≤ 2 F (ยาวกว่านั้นดูเป็น glitch) [CRAFT]

## 3. เหตุผลที่ใช้
- คนดูอ่าน "แรงและเจตนา" จากการเคลื่อน ไม่ใช่จากภาพนิ่ง — timing ผิดทำให้ตัวละคร/สินค้าดูผิดน้ำหนัก ดูถูก ดู AI
- Moving hold ทำให้ตัวละครมีชีวิตระหว่างบทพูด; staging/silhouette ทำให้อ่านออกบนจอมือถือ 6 นิ้ว

## 4. ผลต่ออารมณ์และการรับรู้
| ตัวแปร | ผล |
|---|---|
| เร็ว + ease-out แรง + overshoot | ร่าเริง มั่นใจ ตลก [CRAFT] |
| ช้า + sine.inOut + hold ยาว | สงบ คิด เศร้า [CRAFT] |
| ไม่มี inbetween (cut ตรง) | กระแทก ช็อก [CRAFT, ตาราง 2.1] |
| linear (`none`) กับสิ่งมีชีวิต | แข็ง เป็นกลไก หุ่นยนต์ [CRAFT] |
| squash เล็กน้อยบนของแข็ง | ยังสมจริง [EVIDENCE, `Schmidt2024_ExaggeratedMotion`] |

## 5. ใช้เมื่อไร
- ทุกครั้งที่มีตัวละคร rig/puppet, สินค้าเด้งเข้าเฟรม, โลโก้/ข้อความกระโดด, ไอคอน
- Anticipation: ก่อนทุกการกระทำใหญ่หรือเร็ว (กระโดด หันขวับ ยื่นแว่นเข้ากล้อง)
- Moving hold: ทุกช็อตที่ตัวละครค้าง > 1 s (ฟังอีกฝ่าย, ฟัง VO)
- On 2s: ตัวละคร 2D สไตล์วาดมือ/anime; on 1s: กล้องแพน/ของเลื่อนเทียบฉาก/ช่วง sakuga

## 6. ไม่ควรใช้เมื่อไร
- Squash & stretch แรงบน **สินค้าจริง** ที่ต้องดูพรีเมียม/แข็ง (กรอบโลหะ, เลนส์) — ใช้ ≤ 3% หรือไม่ใช้; ผลวิจัยบอกช่วงยอมรับแคบลงเมื่อรู้วัสดุ [EVIDENCE+CRAFT]
- Overshoot/bounce ในฉากเศร้า สุขภาพ หรือข้อมูลการแพทย์ — ดูไม่จริงจัง
- On 2s บนการแพนฉาก (ฉากสั่น) และบน lip-sync (sync หลุด) — rig.js เก็บปากไว้บน 1s แล้ว
- Smear ใน Reels ที่ถูกดูแบบ pause/scrub บ่อย — เฟรม smear ที่ค้างดูเป็นภาพเสีย ใช้ motion blur เบา ๆ แทน

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- *The Adventures of André and Wally B.* (Pixar/Lucasfilm 1984): zip-off 3–4 เฟรมพร้อม anticipation ยาว; เท้าลากตามจนค้างบนจอหลังตัวหายไป; เท้าออกห่างกัน 1–2 เฟรม [`Lasseter1987`]
- *Luxo Jr.* (1986): ทุก action วางให้อ่านออกเป็น silhouette [`Lasseter1987`]
- แนวทาง silhouette ของยุคการ์ตูนขาวดำ (ตัวละครดำทั้งตัว จึงต้องวางท่าด้านข้าง) และคำของ Chaplin ที่ว่านักแสดงที่รู้อารมณ์ตัวเองดีแสดงได้ด้วยเงา — ตามที่ Lasseter อ้าง Thomas & Johnston [`Lasseter1987`]
- เกมฟิสิกส์ cartoon vs ไม่ stylise ในการทดลอง [`Garcia2008_CartoonPhysics`]

## 8. ประยุกต์ตามประเภทวิดีโอ
| ประเภท | ใช้อย่างไร |
|---|---|
| Story clip (rig puppet, Thai VO) | pose-to-pose ด้วย `R.emote`/`R.pose`, moving hold `R.breathe`+`R.blinks` ตลอด, หันหัวตามตาราง 2.1, ผม/ผ้า overlap 2–4 F, ตัวละครบน 2s กล้องบน 1s |
| Product/promo (แว่นจริง) | แว่นเข้าเฟรมด้วย anticipation เล็ก (ถอย 4–6% ก่อนพุ่ง), settle ด้วย `back.out(1.4)` แทน squash, ขาแว่น/สายคล้อง follow-through 3 F |
| Reels/TikTok 9:16 | action สำคัญอยู่ใน safe zone กลางจอ, ทุกท่าอ่านออกที่ thumbnail 64 px, hook 2 s แรกต้องมี motion ที่ชัด 1 อย่าง |
| Explainer | ไอคอน/ลูกศรใช้ slow-in/out + stagger 2–4 F (ดู FD18), ห้าม bounce ทุกชิ้น |
| Cartoon (Aaron chibi, Mint & Tao) | exaggeration สูงได้, smear ≤ 2 F, จังหวะตลก = anticipation ยาว → action 2–4 F → hold 12+ F (take) |
| Documentary/talking head | ไม่มีตัว rig; หลักนี้ใช้กับกราฟิก lower-third และ punch-in (ease out เสมอ ห้าม linear) |

## 9. AI image prompt examples
1. `character key pose, strong line of action, clear silhouette readable as a black shape, three-quarter view, exaggerated anticipation crouch before a jump, plain background, model-sheet clarity`
2. `pose sheet of the same chibi boy: anticipation, action, follow-through, settle — four poses left to right, consistent proportions, flat colours, no text`
3. `smear frame of a cartoon character spinning to the right, stretched body with speed lines, 1950s limited animation style`
4. `product hero frame: tortoiseshell eyeglasses mid-air at the top of an arc, temples slightly trailing the front, soft studio light, clean background` (follow-through ในภาพนิ่ง)
5. `turnaround of a character in 5 views (front, 3/4, side, 3/4 back, back), same height lines, solid drawing` (ใช้กับ FD23 consistency)

## 10. AI video prompt examples
(ความสามารถจริงของ Wan/Kling ดู `creative-intelligence/CAPABILITY_MATRIX.json` และ FD22 — โมเดลวิดีโอคุม frame timing ไม่ได้ แต่สั่ง "คุณภาพการเคลื่อน" ได้)
1. `the boy crouches slightly, then jumps up in surprise and lands softly, hair bouncing after he lands, then he holds still breathing` (anticipation → action → follow-through → moving hold)
2. `slow, thoughtful head turn from left to right, eyes move first, then the head` (eyes lead)
3. `the eyeglasses drop onto the table, bounce once with a tiny squash, and settle; camera static` (มักได้ผลไม่แน่นอน → ทำด้วย GSAP แทน)
4. `cel-animated character waves hello, animated on twos, limited animation look` (Wan/Kling มักไม่เคารพ "on twos" → ทำ post ด้วย `fps=12,fps=24` หรือ `R.twos`)

## 11. Shot list example (คลิป 6 s: "ทอนลองแว่นใหม่")
| # | เวลา | ภาพ/การแสดง | timing (24 fps) | rig/GSAP |
|---|---|---|---|---|
| 1 | 0.0–1.5 | ทอนยืนฟัง (moving hold) | breathe 3.2 s/รอบ, blink | `R.breathe`, `R.blinks` |
| 2 | 1.5–2.2 | หันมาหากล้อง "ทาง นี้" | eyes 3 F → head 12 F (ทักเป็นมิตร) | `R.look(P,1.5,0)` + head dur 12 F |
| 3 | 2.2–3.4 | ยกแว่นใส่ | anticip. 4 F (มือลดลง) → action 8 F → overshoot 3 F → settle 6 F | `R.arm` + `back.out(1.6)` |
| 4 | 3.4–4.4 | take: ตาโต ตัวเด้ง | squash 3 F → stretch 4 F → land 5 F → settle 6 F | `R.emote(P,3.4,'shock')` |
| 5 | 4.4–6.0 | ยิ้ม ค้าง (hold) | hold 1.6 s + breathe | `R.emote('happy')` |

## 12. ข้อผิดพลาดที่พบบ่อย
1. ทุกท่าใช้เวลาเท่ากัน (เช่น 0.5 s ทุกอย่าง) → ไม่มีน้ำหนัก ไม่มีจังหวะ
2. หยุดตัวละครสนิท (no moving hold) ระหว่าง VO
3. ใช้ `none` (linear) กับสิ่งมีชีวิต หรือใช้ `bounce` กับทุกอย่าง
4. ทุกส่วนเริ่ม/หยุดพร้อมกัน (twinning, no overlap)
5. Anticipation ทิศเดียวกับ action (ต้องตรงข้าม)
6. Squash ไม่รักษาปริมาตร (sy ลดแต่ sx ไม่เพิ่ม) — ใช้ `sx = 1/√sy`
7. Action เร็วจนอ่านไม่ทัน แต่ไม่มี anticipation/smear ช่วย
8. On 2s ทั้งตัวละครและกล้อง → ภาพสั่น

## 13. วิธีตรวจและแก้
| ตรวจ | วิธี | แก้ |
|---|---|---|
| น้ำหนัก | ดูทีละเฟรมบริเวณ start/stop ของการเคลื่อน: ของหนักต้องเร่ง/หยุดช้า | เพิ่มเฟรมเร่ง (`power2.in` ยาวขึ้น) |
| Silhouette | ถม shape เป็นดำ (CSS `filter: brightness(0)`) แล้วดูท่าสำคัญ | กางแขนออกจากลำตัว, หันข้าง |
| Arcs | วาดจุดตามจมูก/มือทุก 2 F (onion skin หรือ screenshot ซ้อน) | หมุน joint แทนเลื่อน x/y |
| Overlap | เทียบเฟรมหยุดของลำตัว vs ผม/ผ้า — ต้องห่าง 2–6 F | offset `t + 2*F` |
| ชีวิต | หยุดภาพที่ช่วง hold แล้วเล่น 3 s — มีอะไรขยับบ้างไหม | `breathe`, `blinks`, `cam.drift` |
| Timing ตามอารมณ์ | เทียบกับตาราง 2.1 | ปรับ dur ของ head/arm |
| Seek-safe | render ที่ t ใด ๆ ต้องได้ภาพเดิม (HyperFrames) | ใช้ fromTo + immediateRender:false ตาม RULE ใน rig.js |

## 14. แบบฝึกหัด + test case
1. **ตารางหันหัว**: ทำ `R.look` ฉากเดียวกัน 3 แบบ head dur = 2 F / 9 F / 20 F + VO เดิม → ถามคนดู 3 คนว่า "ตัวละครรู้สึกอะไร" แล้วเทียบกับตาราง 2.1 (บันทึกผลใน `story-clips/_craft/LEARNING-LOG.md`)
2. **น้ำหนักสินค้า**: แว่นหล่นลงโต๊ะ 3 แบบ — (ก) linear 8 F (ข) `power2.in` 10 F + bounce 1 ครั้ง 4 F (ค) `power3.in` 12 F + squash 3% → ถามว่าแบบไหน "ดูแพง/ดูเบา/ดูปลอม"
3. **Moving hold**: ช็อตฟัง VO 4 s แบบนิ่งสนิท vs breathe+blink vs breathe+blink+drift — วัดว่ามีคน "รู้สึกว่าค้าง" กี่คน
4. **On 1s vs 2s**: ฉาก walk 3 s ด้วย `R.twos` เปิด/ปิด → เปรียบเทียบความรู้สึก "วาดมือ" vs "ลื่นแบบ CG"
- Test case ผ่านเมื่อ: ทุกช็อตมี moving hold, ไม่มี action > 6 F ที่ไม่มี anticipation, overlap ≥ 2 F ทุกส่วนห้อย

## 15. แหล่งอ้างอิง
`ThomasJohnston1981_IllusionOfLife`, `Williams2009_SurvivalKit`, `WhitakerHalas2009_Timing`, `Lasseter1987`, `ChangUngar1993`,
`Garcia2008_CartoonPhysics`, `Schmidt2024_ExaggeratedMotion`, `GSAP_Eases`, `W3C_CSSEasing1` (ใน `sources/animation-sound.json`)
+ ภายใน repo: `story-clips/_craft/curriculum/06-2d-animation.md` §9 (Wikipedia/Toon Boom/Brian Lemay/Monmouth walk), `story-clips/_craft/GUIDE.md` §4–5, `story-clips/_craft/rig.js`
