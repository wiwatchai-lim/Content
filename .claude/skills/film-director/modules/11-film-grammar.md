# FD11 — Film Grammar (ไวยากรณ์ภาพยนตร์)

> ต่อยอดจาก `story-clips/_craft/GUIDE.md` §1 (180° rule, eyeline, screen direction — กฎสั้นสำหรับ rig) และ `creative-intelligence/knowledge/visual-arts/CAMERA_ANGLE_LIBRARY.json` (ใช้ id `cam.establishing`, `cam.ots`, `cam.reverse`, `cam.two_shot`, `cam.pov`, `cam.reaction`, `cam.insert`) — บทนี้เพิ่ม **ว่าทำไมกฎได้ผล, หลักฐานว่าเมื่อไรละเมิดได้, และวิธีวาง coverage**
> แหล่ง: `../sources/story-edit.json` · ป้าย [EVIDENCE]/[CRAFT]

## 1. นิยามและหลักการพื้นฐาน
- **Axis of action (เส้น 180°):** เส้นสมมติลากผ่านตัวละครสองคน (หรือทิศการเคลื่อนที่) กล้องอยู่ฝั่งเดียวของเส้นตลอดฉาก → A อยู่ซ้าย B อยู่ขวาในทุกช็อต
- **30° rule:** ช็อตต่อเนื่องของ subject เดียวกันควรเปลี่ยนมุม ≥ ~30° หรือเปลี่ยนขนาด ≥ 1 ขั้น มิฉะนั้นเป็น jump cut [CRAFT — ตัวเลข 30° เป็นธรรมเนียม ไม่ใช่ค่าที่วัดได้]
- **Eyeline match:** ทิศการมองของ A (เช่นมองขวา) ตรงกับตำแหน่งสิ่งที่ถูกมองในช็อตถัดไป; ใน shot/reverse shot "eyelines meet on screen" `[Smith2012]`
- **Shot/reverse shot:** สลับช็อตระหว่างคนสองคน (OTS หรือ single) มักตามการผลัดพูด
- **Screen direction:** การเดินทาง L→R ต้องคงทิศเดิมตลอดเส้นทางเดียวกัน
- **Establishing → coverage / master scene:** ถ่าย master ทั้งฉากกว้าง แล้วถ่าย coverage (MS, OTS, CU, insert, reaction) ทั้งฉากหรือบางส่วน เพื่อให้ editor เลือก `[BordwellThompsonFilmArt]`

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 ผู้ชมใช้ heuristic ไม่ใช่แผนที่ 3D** [EVIDENCE]
- รถสองคันในสองช็อต: เมื่อกำกวม ผู้ชมตัดสินว่า "ทิศเดียวกัน" ถ้าทิศบนจอเหมือนกัน; ถ้า cue สภาพแวดล้อมขัดกับทิศบนจอ reaction time นานขึ้น → ผู้ชมใช้ **screen-direction heuristic** และสลับไปใช้กระบวนการ alignment ที่ใช้แรงกว่าเมื่อไม่สอดคล้อง `[HuffSchwan2012]`
- Smith: ผู้ชม "เข้าใจผัง" ของ shot/reverse shot ได้ถ้าถาม (Frith & Robson 1975; Kraft 1987; Kraft et al. 1991) แต่ในการดูปกติ **มักไม่สังเกตเมื่อข้ามเส้น**; สิ่งที่สำคัญคือ "orient ไปหาเนื้อหาของช็อตใหม่ได้เร็ว" ซึ่งทำได้ด้วยการ **กำหนดตำแหน่งบนจอของแต่ละตัวละครให้ชัด** (ผู้ชมเก็บ "attentional pointer" ว่า Deckard อยู่ขวาของ Bryant) `[Smith2012]` `[FrithRobson1975]` `[Kraft1987]`
- สมองยังประมวลคัทข้ามเส้นต่างจาก continuity edit แม้ไม่รู้ตัว `[Heimann2016]`
- **สรุป:** กฎ 180° ไม่ได้ปกป้อง "แผนที่ฉาก" เท่ากับปกป้อง **ตำแหน่งที่ตาคาดไว้** → ละเมิดแล้วผู้ชมต้องกวาดตาหาผู้พูดสวนทาง eyeline (ตัวอย่าง *Requiem for a Dream* 2000 ใน Smith2012)

**2.2 กฎเรียนรู้ได้** — เด็กอายุ 7/9/13 สร้างลำดับแอ็กชันจากภาพช็อตได้ต่างกันตามวิธีตัด `[FrithRobson1975]` (TLDR) → ผู้ชมที่ดูหนังน้อย/เด็ก ต้องการ establishing ชัดกว่า [inference]

**2.3 มุมกล้องเปลี่ยนการตัดสินตัวละคร** — มุมกล้องมีผล "คาดเดาได้" ต่อการตัดสินลักษณะกาย/บุคลิกตัวละครและการจำใจความ `[Kraft1987]` [EVIDENCE, TLDR — ทิศและขนาดผลไม่ได้อ่าน]; ผลมุมต่ำ=มีอำนาจ อ่อนและขึ้นกับบริบท (ดู `knowledge/emotional-architecture` MeyersLevyPeracchio1992)

**2.4 การข้ามเส้นอย่างถูกต้อง** [CRAFT]
1. แสดงกล้องเคลื่อนข้ามเส้นในช็อตเดียว (dolly/arc ต่อเนื่อง)
2. ให้ตัวละครเดินข้าม/เปลี่ยนตำแหน่งในเฟรม → สร้างเส้นใหม่
3. คั่นด้วยช็อตบนเส้นพอดี (neutral: เดินตรงเข้า/ออกกล้อง)
4. ใช้ insert/cutaway แล้วตั้งเส้นใหม่ด้วย establishing
5. ตั้งใจละเมิดเพื่อ disorientation/ความขัดแย้ง (ต้องเป็นทางเลือก ไม่ใช่อุบัติเหตุ)

## 3. เหตุผลที่ใช้
ไวยากรณ์ทำให้ผู้ชมใช้ความสนใจกับเรื่อง ไม่ใช่กับการถอดรหัสพื้นที่; ภาพ AI ที่ฉากหลังเปลี่ยนเล็กน้อยทุกช็อต ยิ่งต้องพึ่ง **ตำแหน่งตัวละครบนจอ + ทิศการมอง** เป็นหลักยึด (change blindness ช่วยเรื่องฉากหลัง — ดู `knowledge/continuity/README.md`)

## 4. ผลต่ออารมณ์และการรับรู้
- ไวยากรณ์ถูก → ไหล, เชื่อ, ลืมกล้อง [EVIDENCE: `Smith2012`, `SmithHenderson2008`]
- ข้ามเส้น/ทิศสลับ → สับสน, ต้องใช้เวลาตีความมากขึ้น [EVIDENCE: `HuffSchwan2012`]; ใช้ตั้งใจ = ความแตกแยก ความสัมพันธ์พลิก [CRAFT]
- Eyeline สูง/ต่ำต่างกัน → บอกสถานะ/ความสูงต่างกัน [CRAFT]
- Establishing ที่ขาดหาย → ผู้ชมใหม่อาจไม่รู้ว่าอยู่ไหน; ในฟีดสั้น ใช้ establishing สั้นมาก (≤1 s) หรือแทรกทีหลัง [CRAFT]

## 5. ใช้เมื่อไร
- ทุกบทสนทนา 2 คน (Mint & Tao, ลูกค้า–ช่าง) → ล็อกซ้าย/ขวาทั้งซีรีส์
- ทุกการเดินทาง (ไปร้าน, ไปทะเล) → L→R = ไปข้างหน้า, R→L = กลับ [CRAFT สำหรับผู้อ่านซ้าย→ขวา]
- เปิดฉากใหม่ → establishing หนึ่งช็อตก่อน coverage (หรือ "late establishing" หลัง hook)

## 6. ไม่ควรใช้เมื่อไร (หรือละเมิดได้)
- Vlog/talking head หน้ากล้องคนเดียว — แทบไม่มีเส้น
- ฉากที่ต้องการให้ผู้ชมเสียหลัก (ฝัน, ทะเลาะแตกหัก, horror)
- Hook ของฟีดที่ต้องเริ่มด้วยจุดพีค: ข้าม establishing ไปก่อนได้

## 7. ตัวอย่างจากภาพยนตร์ (sourced)
- *Blade Runner* (1982) — Bryant ซ้าย/Deckard ขวา ผู้ชมเลื่อนความสนใจไปขวาก่อนคัทเมื่อได้ยิน Deckard `[Smith2012]`
- *Requiem for a Dream* (2000) — คัทแรกไป CU ข้ามเส้น และ eyeline ไม่พบกัน `[Smith2012]`
- *Blade Runner* ฉากนกฮูก — gaze cue เชื่อมตัวละครที่ไม่เคยอยู่ในช็อตเดียวกัน `[Smith2012]`
- *Last Year in Marienbad* (1961) — บทสนทนาที่ใช้ shot/reverse shot สร้างความต่อเนื่องผิดปกติโดยตั้งใจ `[Smith2012]`

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip / Mint & Tao:** บันทึกใน continuity file: Mint ซ้าย, Tao ขวา (ทั้งซีรีส์); OTS ต้องเห็นไหล่คนฟังฝั่งเดิม
- **Product/promo:** สินค้าหมุนทิศเดียวกันทุกช็อต (เช่น ตามเข็ม) ให้รู้สึกเป็นการเคลื่อนต่อเนื่อง
- **Reels 9:16:** OTS แนวตั้งเห็นไหล่น้อย → ใช้ single ที่วางหน้าในซีกซ้าย/ขวาคงที่แทน; หลีกเลี่ยงให้หน้าอยู่ใต้ UI ขวาล่าง
- **Explainer:** ผู้นำเสนอมองกล้อง; กราฟิกโผล่ฝั่งที่ผู้นำเสนอชี้/มอง (gaze cue)
- **Cartoon/rig.js:** ตั้งค่า `side: 'L'|'R'` ต่อตัวละครใน scene JSON; ตรวจอัตโนมัติด้วย `tools/check_scene.py` ของสกิลนี้ถ้ารองรับ
- **Documentary/สัมภาษณ์:** ผู้ให้สัมภาษณ์มองนอกกล้องไปฝั่งผู้สัมภาษณ์ — สลับฝั่งระหว่างคนสองคนเพื่อจำลองการคุยกัน

## 9. AI image prompt examples
1. Establishing: `wide establishing shot of a small optician shop interior, customer seated on the left, optometrist standing on the right, eye-level, soft daylight`
2. OTS A: `over-the-shoulder shot from behind the optometrist's right shoulder (frame right, out of focus), customer on the left half of frame looking screen-right`
3. Reverse B: `over-the-shoulder from behind the customer's left shoulder (frame left, out of focus), optometrist on the right half of frame looking screen-left`
(ระบุ "looking screen-left/right" และ "frame left/right" ทุกครั้ง — โมเดลภาพไม่รู้กฎ 180° เอง)

## 10. AI video prompt examples
1. `static over-the-shoulder shot, the woman on frame-left listens, the man on frame-right speaks and gestures toward frame-left`
2. ข้ามเส้นอย่างถูก: `slow arc shot moving from behind the woman to behind the man, continuous, both remain seated` (ความยาว/ความนิ่งของ arc ขึ้นกับโมเดล — ตรวจ CAPABILITY_MATRIX)
3. Screen direction: `the cyclist rides from frame-left to frame-right along the beach road, camera tracking alongside`

## 11. Shot list example — บทสนทนา 2 คน (master scene + coverage)
| # | id | กรอบ | ตำแหน่ง | หมายเหตุ |
|---|---|---|---|---|
| 1 | cam.establishing / cam.two_shot | WS ทั้งคู่ | A ซ้าย B ขวา | ตั้งเส้น |
| 2 | cam.ots | OTS หลัง B → A | A ครึ่งซ้าย มองขวา | |
| 3 | cam.reverse | OTS หลัง A → B | B ครึ่งขวา มองซ้าย | eyeline พบกัน |
| 4 | cam.mcu | single A | A ซีกซ้าย-กลาง | ระดับความเข้มขึ้น |
| 5 | cam.mcu | single B | B ซีกขวา-กลาง | |
| 6 | cam.insert | มือ B ยื่นแว่น | มือเข้าจากขวา | ตามฝั่ง B |
| 7 | cam.cu | A รับแว่น (reaction) | ซ้าย | ช็อตแน่นสุด = จุดเปลี่ยน |
| 8 | cam.two_shot | กลับ WS | A ซ้าย B ขวา | release |

## 12. ข้อผิดพลาดที่พบบ่อย
- Gen ภาพแต่ละช็อตแยกกันแล้วตัวละครสลับฝั่ง/มองผิดทิศ
- Mirror (flip) ภาพเพื่อแก้ฝั่ง แล้วโลโก้/ตัวอักษร/ด้ามแว่น/ไรผมกลับด้าน
- Eyeline ไม่ตรงความสูง (คนยืนมองคนนั่ง แต่ทั้งคู่มองระดับตา)
- ช็อต single ขนาดไม่เท่ากันระหว่าง A กับ B ในจังหวะเดียวกัน → ดูไม่สมดุล [CRAFT]

## 13. วิธีตรวจและแก้
1. **Side map:** วาดผังบนกระดาษ: เส้น + ตำแหน่งกล้องทุกช็อต (ต้องอยู่ฝั่งเดียว)
2. **Arrow test:** ลูกศรจากตา A ในช็อต N ต้องชี้ไปทางที่ B ปรากฏในช็อต N+1
3. **Direction log:** ตารางช็อต × ทิศเคลื่อนที่ (L→R/R→L/เข้า/ออก)
4. แก้: (a) regenerate ด้วย prompt ระบุ frame-left/right (b) flip ถ้าไม่มีตัวอักษร/อสมมาตร (c) แทรก neutral shot (d) ยอมรับถ้าความสนใจไม่อยู่ตรงนั้นและอารมณ์ถูก (Rule of Six — FD10)

## 14. แบบฝึกหัด + test case
- **T11-A:** บทสนทนาเดียว 3 เวอร์ชัน: ถูกเส้น / ข้ามเส้น 1 คัทกลางฉาก / ข้ามเส้นแบบ arc ต่อเนื่อง → ให้ผู้ชม 3 คนวาดตำแหน่งคนทั้งสอง และเล่าความรู้สึก; เทียบเวลาที่ใช้ตอบ (สะท้อน `HuffSchwan2012` ในระดับเล็ก)
- **T11-B:** ทำเส้นทาง "บ้าน → ร้าน" 4 ช็อต ทิศคงที่ vs สลับทิศช็อตที่ 3 → ถามว่า "เขากำลังไปหรือกลับ"
- เกณฑ์ผ่าน: ผังกล้องฝั่งเดียว, arrow test ผ่านทุกคัท, ทิศเดินทางคงที่

## 15. แหล่งอ้างอิง
Smith2012 · HuffSchwan2012 · FrithRobson1975 · Kraft1987 · Heimann2016 · BordwellThompsonFilmArt · Bordwell2007_Revisited · ข้ามโฟลเดอร์: `knowledge/continuity/sources.json` (SmithHenderson2008, SimonsLevin1998), `knowledge/emotional-architecture/sources.json` (MeyersLevyPeracchio1992)
