# FD01 — Shot Sizes (ขนาดภาพ / ระยะภาพ: EWS → ECU, insert, coverage)

> ต่อยอด ไม่ซ้ำ: ตารางขนาดภาพ + ค่า `s` ของ rig.js อยู่ใน `story-clips/_craft/GUIDE.md` §1; "ระยะภาพ = ระยะทางทางจิตใจ",
> clean/dirty OTS, insert vs cutaway อยู่ใน `curriculum/05-movement-language.md` §1.4; นิยามรายตัว + หลักฐานการรับรู้อยู่ใน
> `creative-intelligence/knowledge/visual-arts/CAMERA_ANGLE_LIBRARY.json` (`cam.ews` … `cam.ecu`, `cam.insert`, `cam.two_shot`).
> บทนี้เพิ่ม: **หลักฐานวิจัยเรื่อง shot scale**, การเลือกขนาดภาพตามโครงเรื่องและจำนวนตัวละคร, กฎเวลา hold ตามขนาด,
> ขนาดภาพในจอแนวตั้ง 9:16, และ prompt สำหรับ AI. คลังใช้งาน → `libraries/SHOT_TYPE_LIBRARY.json` (19 รายการ, ลิงก์ id เดิม)
> ป้าย: **[EVIDENCE]** = งานวิจัย, **[CRAFT]** = แนวปฏิบัติวงการ (ไม่ใช่วิทยาศาสตร์)

## 1. นิยามและหลักการพื้นฐาน
- **Shot scale (ขนาดภาพ)** วัดจาก "ขนาดของตัวหลักในเฟรม" ไม่ใช่ระยะกล้องหรือเลนส์ — ภาพเดียวกันได้จากกล้องใกล้+เลนส์กว้าง หรือไกล+เลนส์ยาว
  (ความต่างอยู่ที่ perspective ดู FD05) [EVIDENCE: นิยามที่ใช้ใน `va:CuttingArmstrong2016`, `Savardi2021-CineScale`]
- บันไดมาตรฐาน 7 ขั้น: **ELS/EWS → LS/WS → MLS/MWS → MS → MCU → CU → ECU** + ชั้นพิเศษ **Foreground shot** และ **Insert**
  (taxonomy ของชุดข้อมูล CineScale 792,000 เฟรมจาก 124 เรื่อง) [EVIDENCE, search-summary `Savardi2021-CineScale`]
- นิยามแต่ละตำรามี "เส้นตัด" ต่างกัน (เช่น MS = เอว หรือ สะโพก) → ใน shot list และ prompt **ให้ระบุเส้นตัดเป็นคำ** ("framed from the knees up")
  แทนชื่อย่ออย่างเดียว [CRAFT]
- ขนาดภาพแบ่งตาม **หน้าที่** ได้อีกชั้น: master, coverage (two-shot, OTS, single), insert, cutaway, reaction, POV (`SHOT_TYPE_LIBRARY` category)

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 สิ่งที่งานวิจัยบอก (ไม่ใช่แค่ความเชื่อของช่าง)
| ข้อค้นพบ | ความหมายต่อการกำกับ | ระดับ |
|---|---|---|
| ระยะกล้อง-ตัวละคร "กำหนดการเล่าเรื่องอย่างมาก" และวัด/จำแนกอัตโนมัติจากเฟรมได้ (สี, การกระจายการเคลื่อนไหว, spectral amplitude) | ตรวจความหลากหลายของขนาดภาพในคลิปเราแบบอัตโนมัติได้ (FD30) | A, abstract `CaniniBeniniLeonardi2013` |
| หน้ายิ่งเล็กในเฟรมและฉากยิ่งรก คนดูยิ่งใช้เวลาอ่านอารมณ์นาน → ภาพกว้างต้อง hold นานกว่า | กฎเวลา hold ด้านล่าง | A, `va:CuttingArmstrong2016` |
| จำนวนตัวละครในเฟรมสัมพันธ์กับขนาดภาพและความยาวช็อต; จำนวนตัวละครต่อเฟรมลดลงตามปี (หนังนิยม 1935–2010) | คนมาก → กว้างและยาว, คนเดียว → ใกล้และสั้น | A, abstract `Cutting2015-Framing` |
| ภาพใกล้เพิ่มแนวโน้มที่คนดูจะอนุมาน "ความคิด/ความรู้สึก" ของตัวละคร (theory of mind) | เก็บ CU ไว้ให้จังหวะที่ต้องการให้คนดู "เข้าไปในใจ" | A, `va:RooneyBalint2018` (ผลระดับปานกลาง) |
| หนังฮอลลีวูดทำให้คนดูมองจุดเดียวกันพร้อมกัน (attentional synchrony) แม้ไม่รู้เรื่องราวก่อนหน้า | ขนาดภาพ+การจัดวางคุมสายตาได้มากกว่าเนื้อเรื่อง → ใส่สิ่งสำคัญตรงที่ตาอยู่ | A, abstract `Loschky2015` |
| ช็อตยาวขึ้นในช่วงเปิดเรื่อง สั้นลงในช่วง climax | ขนาด/ความถี่การตัดควรไต่ตามองก์ | A, search-summary `Cutting2016-Pace` |

### 2.2 ไวยากรณ์ขนาดภาพ (craft ที่ใช้ได้จริง)
- **บันไดอารมณ์**: เปิดกว้าง → เข้าใกล้เมื่ออารมณ์ขึ้น → ถอยกว้างเมื่อคลี่คลาย (GUIDE.md) [CRAFT]
- **กระโดดทีละ 1–2 ขั้นต่อคัต**; WS → ECU ตรง ๆ = shock cut โดยเจตนา [CRAFT]
- **กฎ 30°/ขนาด**: คัตไปวัตถุเดิมต้องเปลี่ยนมุม ≥ ~30° หรือเปลี่ยนขนาดชัด ไม่งั้นเกิด jump โดยไม่ตั้งใจ; Smith อ้างว่าที่มาคือ apparent motion ที่ไม่ตั้งใจ
  (Anderson 1996; Hochberg & Brooks 1978 ตามที่ `Smith2012-AToCC` อ้าง) [CRAFT + ทฤษฎี]
- **CU คือเงินก้อนสุดท้าย**: ประโยคสำคัญที่สุดของฉากได้ภาพใกล้ที่สุด ห้ามใช้หมดก่อน [CRAFT]
- **Matched coverage**: ใน shot/reverse-shot ทั้งสองฝั่งใช้ขนาดเท่ากัน จนกว่าจะอยากบอกว่า "อำนาจเปลี่ยน" แล้วค่อยให้ฝั่งหนึ่งใกล้กว่า [CRAFT]
- **Mascelli (1965)** จัดการถ่ายทำเป็น 5C: camera angles, continuity, cutting, close-ups, composition — close-up ถูกแยกเป็นหมวดเพราะเป็น
  "เครื่องมือเน้น" ที่ต้องได้มาจากเรื่อง [B, bibliographic `Mascelli1965`]

### 2.3 กฎเวลา hold ตามขนาด (ของเรา, DERIVED จาก `va:CuttingArmstrong2016` + GUIDE)
| ขนาด | hold ขั้นต่ำ (ไม่มีข้อความ) | ถ้ามีข้อความ/ป้ายบนจอ |
|---|---|---|
| EWS/WS | 2.5–4 s | + เวลาอ่าน 2 รอบ |
| FS/MWS/MS | 1.2–3 s | ≥ 2.5 s |
| MCU/CU | 0.8–3 s | ≥ 2.5 s |
| ECU/insert ข้อความ | 1–2.5 s | ≥ 2.5 s (อ่านได้ 2 รอบ) |

## 3. เหตุผลที่ใช้
ขนาดภาพคือ "ระยะห่างระหว่างคนดูกับตัวละคร": กว้าง = คนแปลกหน้าที่สังเกต, กลาง = คนรู้จัก, ใกล้ = คนสนิท/ศัตรูหน้าชิด (curriculum 05) [CRAFT];
และในทางปฏิบัติ ขนาดภาพกำหนด **ข้อมูลที่อ่านได้** — หน้าเล็ก = อ่านอารมณ์ช้า (`va:CuttingArmstrong2016`), จอโทรศัพท์ทำให้ทุกอย่างเล็กลงอีก

## 4. ผลต่ออารมณ์และการรับรู้
- ใกล้ → การอนุมานจิตใจตัวละครเพิ่ม (EVIDENCE ปานกลาง), ความเข้มข้น/อึดอัดเพิ่ม (CRAFT)
- กว้าง → สังเกตการณ์, โดดเดี่ยว, เห็นภูมิศาสตร์; คนดูต้องใช้เวลาหา subject (EVIDENCE เรื่องเวลาอ่าน)
- การ **เปลี่ยน** ขนาด (คัตหรือ push) = การเปลี่ยนความสัมพันธ์คนดู-ตัวละคร (CRAFT)
- ข้อควรระวัง: "ใกล้ = อารมณ์แรงเสมอ" ไม่ใช่กฎสากล — หนังศิลปะบางสายเล่าอารมณ์ด้วยภาพกว้างนิ่ง (ระดับความเชื่อมั่นต่ำ, ต้องหาแหล่งเพิ่ม)

## 5. ใช้เมื่อไร
| ต้องการ | ขนาด (id) |
|---|---|
| บอกสถานที่/เวลา/สเกล | `shot.ews`, `shot.ws` |
| ท่าทางทั้งตัว/เดิน/แฟชั่นแว่น | `shot.fs`, `shot.mws` |
| บทสนทนาปกติ / presenter | `shot.ms`, `shot.mcu` |
| จุดเปลี่ยนอารมณ์ / ประโยคสำคัญ | `shot.cu`, `shot.bcu` |
| เบาะแส/รายละเอียดสินค้า | `shot.ecu`, `shot.insert` |
| ความสัมพันธ์ | `shot.two_shot`, `shot.ots_dirty` ↔ `shot.clean_single` |

## 6. ไม่ควรใช้เมื่อไร
- CU ทุกบรรทัด (หมดพลัง), EWS เป็นเฟรมแรกของ hook บนโทรศัพท์ (subject เล็กเกินอ่าน), ECU ก่อนคนดูรู้ว่าเป็นของอะไร,
  BCU กับหน้า AI ความละเอียดต่ำ (artefact โผล่), master shot ในคลิปสั้น 9:16 ที่ทุกวินาทีต้องอ่านง่าย [CRAFT]

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- **Blade Runner (1982)** — ลำดับ gaze-cued cuts ระหว่าง Rachael–Deckard–นกฮูก สร้างความสัมพันธ์ทางพื้นที่ด้วยการมอง (eyeline) โดยไม่เคยเห็นทั้งสามในเฟรมเดียว;
  heat map ของคนดูตามสายตาข้ามคัต (`Smith2012-AToCC`)
- **คลิป James Bond 12 วินาที (ฉาก "Jaws" ตกเต็นท์)** — คนดูส่วนใหญ่มองจุดเดียวกันไม่ว่าจะรู้บริบทหรือไม่ (`Loschky2015`)
- ตัวอย่างการใช้ขนาดภาพรายเรื่องอื่น ๆ ยังไม่มีแหล่งที่เปิดอ่านได้ในรอบนี้ → **gap** (ดู §15) — อย่าแต่งเพิ่ม

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip (2D rig)**: ใช้ `s` ตาม GUIDE (WS 1.0–1.15 … CU 2.2–2.6); สร้างฉากเป็น master แล้ว "ตัด coverage" เป็นสถานะกล้องบนเวทีเดียวกัน
  (ประหยัดและ continuity ตรงเสมอ); ECU/insert ทำเป็นฉากแยก (ขยาย bg 1920 ไป s 6 จะแตก)
- **Product/promo (แว่น)**: WS ร้าน → MS คนลองแว่น → CU ตา+กรอบ → ECU บานพับ/โลโก้ → MS ยิ้ม; ห้าม ECU ก่อนเห็นทั้งชิ้น
- **Reels/TikTok 9:16**: MCU/MS คือขนาดหลัก (หน้าเต็มความกว้าง), ตาอยู่เส้น 1/3 บน, เว้น 20–25% ล่างให้ caption; ภาพกว้างให้ใช้ "ความสูง"
  (ฟ้า/ถนนสูง) แทนความกว้าง; สองคนให้ซ้อนลึก ไม่ใช่ยืนเรียงข้าง
- **Explainer**: MS presenter + insert กราฟิก; เปลี่ยนขนาดทุก 1–2 ประโยคแทน jump cut
- **Cartoon (Mint & Tao / Aaron)**: ตัวละครเรียบง่ายอ่านได้แม้ภาพกว้าง แต่ใบหน้าไม่มีรายละเอียด (faceless) → อารมณ์ต้องมาจากท่าทาง: ใช้ FS/MWS บ่อยกว่า CU
- **Documentary/talking head**: MCU หลัก, MS เมื่อมือเล่าเรื่อง, cutaway/insert ปิดรอยตัด

## 9. AI image prompt examples
```
medium close-up framed from the chest up, an older man trying on reading glasses in a small optician's shop, eye-level, 85mm lens, soft window light, eyes sharp, background softly blurred
extreme wide shot, a tiny lone figure on the lower third of a vast empty beach at dawn, horizon on the upper third, lots of negative space, calm pastel sky
over-the-shoulder shot from behind the man's blurred right shoulder, a woman across the table facing camera, warm cafe light, 85mm, shallow depth of field
insert shot from directly above, a pair of tortoiseshell glasses beside a blank prescription card on a wooden counter, soft top light, no text
```
- ระบุ **เส้นตัด + ความสูงกล้อง + เลนส์** เสมอ; สไตล์ดินสอ/ชาร์โคล: ตัดคำเลนส์/DOF ออก (FLUX จะดึงเป็นภาพถ่าย 3D — CAPABILITY_MATRIX)

## 10. AI video prompt examples
```
Medium close-up, an older man puts on reading glasses and blinks, then smiles. Very slow push-in.          (Wan/Kling/Runway)
Extreme wide shot of a vast beach at dawn, a tiny figure walks along the waterline left to right. Locked-off tripod shot.
Close-up of a woman reading a letter; her eyes fill with tears. Slow push-in on her face as she reads.     (สูตร Runway: move+speed+subject+reason)
```
- ขนาดภาพที่ Veo ระบุในคู่มือ: eye-level… CU, ECU, MS, full/long, wide/establishing, OTS, POV (`Google-VeoPromptGuide`)
- AI video ทำ "coverage ที่ตรงกัน" ไม่ได้ดี → สร้าง master เป็นภาพนิ่งเดียว แล้ว crop/2.5D เป็นช็อตต่าง ๆ (`shot.master` note)

## 11. Shot list example (คลิป 20 s "แว่นใหม่ของคุณยาย", 9:16)
| # | ขนาด | มุม/กล้อง | เวลา | เนื้อหา | เหตุผล |
|---|---|---|---|---|---|
| 1 | MCU | eye-level, locked + drift | 2.5 s | ยายหรี่ตาอ่านฉลากยา | hook: ปัญหาอ่านได้ทันที |
| 2 | Insert | overhead | 2.5 s | ฉลากยาเบลอ (POV) | ให้คนดูเห็นสิ่งที่ยายเห็น |
| 3 | MS | eye-level | 3 s | หลานยื่นแว่น | ความสัมพันธ์ (two-shot ซ้อนลึก) |
| 4 | CU | slow push-in | 3 s | ยายใส่แว่น ตาเบิก | จุดเปลี่ยนอารมณ์ = CU แรกของเรื่อง |
| 5 | Insert POV | rack focus | 2 s | ฉลากชัด | payoff |
| 6 | MCU | locked | 3 s | ยายยิ้มหันหาหลาน | reaction |
| 7 | WS | pull-out | 4 s | ทั้งสองในบ้าน + โลโก้ | คลี่คลาย, ปิดด้วยภาพกว้าง |

## 12. ข้อผิดพลาดที่พบบ่อย
1. ใช้ CU เร็วเกินไป/ทุกช็อต → จุดเปลี่ยนจริงไม่มีภาพที่ใกล้กว่าให้ใช้
2. เส้นตัดอยู่ที่ข้อต่อ (เข่า ข้อเท้า ข้อมือ) → ดูเหมือนตัดอวัยวะ
3. WS ที่ subject ไม่มีคอนทราสต์ → หาไม่เจอใน 1 วินาที
4. คัตขนาดเดียวกันมุมใกล้กัน (< 30°) → jump cut ไม่ตั้งใจ
5. ECU สินค้า AI ที่มีชิ้นส่วนเกิน (สกรู ขาแว่นเพิ่ม)
6. 9:16 วางสองคนเรียงข้าง → หน้าเล็กเท่าเหรียญ

## 13. วิธีตรวจและแก้
- **ตรวจบันได**: เขียนลำดับขนาดของทุกช็อตเป็นแถว (WS MS MCU CU …) — มีจุดขึ้นสุดตรงจุดสำคัญที่สุดไหม? มีการถอยกว้างตอนจบไหม?
- **ตรวจเวลาอ่าน**: หรี่ตาดูบนมือถือที่ระยะแขน: หา subject ภายใน 1 วินาทีได้ไหม; ข้อความอ่านได้ 2 รอบไหม
- **ตรวจอัตโนมัติ (แนวคิด)**: วัดสัดส่วนความสูงใบหน้า/ตัว ต่อความสูงเฟรม (face detector) → จัดกลุ่มขนาด; รายงานถ้า 70%+ ของช็อตเป็นขนาดเดียว
  (แนวทางจาก `CaniniBeniniLeonardi2013`; ยังไม่ได้สร้างเครื่องมือ — ส่งต่อ FD30)
- แก้: CU ใช้เร็ว → เปลี่ยนเป็น MCU แล้วเก็บ CU ไว้ที่ beat; subject หาย → เพิ่มแสง/คอนทราสต์หรือ hold นานขึ้น

## 14. แบบฝึกหัด + test case
- **TC-FD01-A (ฉากเดียว 3 แบบ)**: ฉาก "ลูกค้าเห็นราคาแล้วตกใจ" ทำ 3 เวอร์ชันใน rig.js: (1) WS ตลอด, (2) WS→MS→CU ตามบันได,
  (3) WS→ECU shock cut. เทียบ: เวอร์ชันไหนคนดู (ผู้ใช้) บอกได้ว่าตกใจเร็วที่สุด, อันไหนตลกที่สุด. บันทึกใน LEARNING-LOG
- **TC-FD01-B (9:16)**: ถ่าย/สร้างภาพเดียวกันที่ MS และ MCU ในแนวตั้ง ใส่ caption ล่าง → ดูบนโทรศัพท์: หน้าถูกบังไหม, อ่านอารมณ์ได้ไหม
- **TC-FD01-C (AI)**: prompt เดียวกันเปลี่ยนแค่ "medium shot" ↔ "framed from the chest up" 3 seeds ต่อแบบ (FLUX ฟรี) — แบบไหนได้เส้นตัดตรงกว่า

## 15. แหล่งอ้างอิง
`sources/camera.json`: CaniniBeniniLeonardi2013, Savardi2021-CineScale, Cutting2015-Framing, Cutting2016-Pace, Loschky2015, Smith2012-AToCC,
Mascelli1965, FilmArt13, Bowen2017, Google-VeoPromptGuide, Runway-CameraControl2026 · visual-arts `sources_camera.json`: CuttingArmstrong2016,
RooneyBalint2018, BryanPeronaAdolphs2012, Wiki-Shot, StudioBinder-CameraShots.
**Gaps**: ไม่มีงานวิจัยเรื่องขนาดภาพบนจอแนวตั้ง/โทรศัพท์โดยตรง; ตัวอย่างหนังรายเรื่องของแต่ละขนาดยังไม่มีแหล่งที่เปิดอ่าน; Film Art ch.5 ยังไม่ได้อ่านเนื้อหา
