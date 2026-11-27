# FD25 — Storyboarding & Shot Planning (thumbnails, floor plan, overhead diagram, animatic, shot list, coverage)

> ต่อยอด ไม่ซ้ำ: ขั้นตอน logline → beat → VO → shot list → thumbnails → panels → animatic, โครงโฆษณา 30/15/6 s, ABCD,
> คำศัพท์และสัญลักษณ์บอร์ดของทีม อยู่ใน `story-clips/_craft/curriculum/08-storyboard.md` §1.5–2; ลำดับงาน 5 ขั้นของ story clip ใน `GUIDE.md` §0
> บทนี้เพิ่ม: **floor plan / overhead diagram** (สัญกรณ์), **coverage planning**, รูปแบบ shot list ที่ผูกกับ 20 ขั้นของ `DECISION_ENGINE.md`,
> animatic แบบ data (timing ↔ `timing.json`), กราฟความเข้ม (Block), การบอร์ดสำหรับ AI/rig pipeline
> แม่แบบ: `templates/STORYBOARD_TEMPLATE.md`, `templates/SHOT_LIST_TEMPLATE.md`, `templates/SCENE_DECISION.json`, `libraries/STORYBOARD_TEMPLATES.json`

## 1. นิยามและหลักการพื้นฐาน
- **Thumbnail** = บอร์ดหยาบขนาดแสตมป์ ใช้ลองหลายทางเลือกเร็ว ๆ · **Panel** = กรอบสัดส่วนจริงพร้อมลูกศร/VO/SFX/เวลา · **Animatic** = panel ตั้งเวลากับเสียงจริง (curriculum 08)
- **Floor plan (overhead diagram)** = แผนผังมองจากบนลงล่าง: ตำแหน่งกล้อง นักแสดง prop และเส้นทางเคลื่อน; ผู้กำกับภาพใช้วางตำแหน่งกล้อง/ไฟ/นักแสดง [D, `StudioBinder_ShotList`]
- **Shot list** = ตารางช็อตทุกช็อตพร้อมข้อมูลกล้อง; คอลัมน์ทั่วไป: scene #, shot #, subject, description, camera, shot size, shot type, movement, equipment, lens (+ frame rate, angle, sound, location) [D, `StudioBinder_ShotList`]
- **Layout** (แอนิเมชัน) = พิมพ์เขียวต่อช็อต (FD17) — ขั้นต่อจาก storyboard
- **Coverage** = ชุดช็อตที่ถ่าย/สร้างเพื่อให้ตัดฉากได้หลายแบบ (master, singles, overs, inserts, cutaways) [CRAFT]
- **X-sheet camera column** = สัญกรณ์กล้องเชิงเฟรม (TI/TO, pan, field) [D, `Lemay_ExposureSheet`]

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 Storyboard เป็นเครื่องมือ "ตัดสินใจ" ไม่ใช่ภาพประกอบ
Katz สอนด้วยการวางทางเลือกการจัดช็อตหลายแบบเทียบกัน แล้วเลือกจากเหตุผลของเรื่อง [B, `Katz1991_ShotByShot`, bibliographic] → ทุก panel ต้องตอบ DECISION_ENGINE ข้อ 1, 4, 6 (เปลี่ยนอะไร, รู้สึกอะไร, มองที่ไหน) ก่อนวาดรายละเอียด

### 2.2 กราฟความเข้มของภาพ (Block)
Block จัดโครงสร้างภาพด้วย **contrast & affinity** ขององค์ประกอบพื้นฐาน (space, line, shape, tone, colour, movement, rhythm) ตลอดเรื่อง [B, `Block2020_VisualStory`, bibliographic] → ในบอร์ด: วาดกราฟเส้นใต้แถว panel บอกความเข้มของเรื่อง แล้ววางให้ **contrast ทางภาพ (ช็อตใกล้ขึ้น, การเคลื่อนเร็วขึ้น, สีตัดกันขึ้น) ขึ้นตามกราฟ**; ช่วงพักใช้ affinity (ภาพกลมกลืน)

### 2.3 Floor plan / overhead diagram — สัญกรณ์ (มาตรฐานทีม) [CRAFT]
```
 [C1]>  = กล้อง 1 หันทางลูกศร, รูปกรวยเส้นประ = มุมรับภาพ (กว้าง=wide lens, แคบ=tele)
 C1 --> C1'  = กล้องเคลื่อน (dolly/truck) จากตำแหน่งต้นไปปลาย; ⟳ = pan
 (A)  (B)    = ตัวละคร (วงกลม + จมูก/ขีดบอกทิศหน้า); A → A' = ตัวละครเดิน
 ═══════     = เส้น 180° (axis of action) ลากผ่านคู่สนทนา — กล้องทุกตัวอยู่ฝั่งเดียว เว้นแต่ตั้งใจข้าม
 ▭ = prop/เฟอร์นิเจอร์, ☼ = แหล่งแสงหลัก (motivated), ▯ = ประตู/หน้าต่าง
```
ใน 2D/rig: floor plan ยังจำเป็น — ใช้กำหนดว่า BG ช็อตไหนต้องวาดมุมไหน (reverse angle ต้องมี BG อีกด้านของห้อง) และทิศหน้าจอ

### 2.4 Coverage planning
| ช็อต | หน้าที่ | ใน AI/rig pipeline |
|---|---|---|
| Master (wide ทั้งฉาก) | ภูมิศาสตร์, ใครอยู่ไหน | 1 BG กว้าง + puppets; ใช้ crop ได้ |
| Singles (MS/CU แต่ละคน) | อารมณ์ บทพูด | cam.set ซูมใน BG เดียวกันได้ถ้า res พอ |
| Overs (OTS) | ความสัมพันธ์ ทิศการมอง | ต้องมีด้านหลังหัว/ไหล่ของอีกคนเป็นชั้น FG |
| Insert | รายละเอียดสำคัญ (ป้ายราคา, เลนส์, มือ) | ภาพแยก (ภาพจริงของแว่น) |
| Cutaway / reaction | เวลา ความรู้สึกของคนฟัง | puppet `listen` |
กฎ [CRAFT]: ในงาน gen ทุกช็อตมี "ต้นทุน" (โควตา/เวลา) — วางแผน coverage แบบ **ตัดในหัว (edit-in-camera)**: สร้างเฉพาะช็อตที่บอร์ดใช้ + reaction สำรอง 1–2 ช็อต/ฉาก + insert ของสินค้า; แต่สำหรับ rig/HTML (ถูก) ทำ master + singles ได้เลย

### 2.5 Animatic = timing data
- ทุก panel มีเวลา; เปลี่ยนความยาว panel หนึ่งแล้วช็อตถัดไปเลื่อนตาม (ripple) — เหมือนพฤติกรรม default ของ Storyboard Pro [C, `ToonBoom_SBP_Animatic`]
- Animatic ใส่ **เสียงจริง** (TTS + SFX draft) และ **การเคลื่อนกล้อง** แล้ว export เป็นวิดีโอ/EDL [C, `ToonBoom_SBP_Animatic`]
- ใน repo: เวลาของ VO มาจาก `audio/timing.json` (cue start/end) → panel duration = cue end − cue start + handles; `Bed.from_timing()` อ่านไฟล์เดียวกัน (`sound.py`) → บอร์ด เสียง และ build ใช้นาฬิกาเดียว
- Animatic ทำใน HyperFrames ได้ทันที: ภาพ panel (หรือ FLUX draft) + `cam.move` + VO → render 480p ตรวจจังหวะก่อน gen จริง

### 2.6 Thumbnail ก่อน panel
ลอง 3+ ทางเลือกต่อ beat สำคัญ (hook, turn, climax) ก่อนเลือก 1 [CRAFT, curriculum 08 + Katz]; ใน AI pipeline ใช้ **FLUX draft ราคาถูก (local, ไม่ใช้โควตา)** เป็น thumbnail ได้ แต่ต้องตัดสินใจกล้องเองก่อน prompt ไม่ใช่ปล่อยโมเดลเลือก

### 2.7 บอร์ดสำหรับ 9:16 และ multi-format
- Panel 9:16 + เส้น safe zone (UI ด้านล่าง ~20%, ด้านขวาไอคอน) — วาดลงในกรอบทุก panel
- ถ้าต้องส่งทั้ง 9:16 และ 1:1/16:9 ให้บอร์ดที่ 9:16 แล้วทำ "center-safe" ของ 1:1 ทับ (เส้นประ) [CRAFT]

## 3. เหตุผลที่ใช้
ตัดสินใจบนกระดาษถูกกว่าบนโควตา AI/เวลา render; บอร์ด+animatic เผยปัญหาจังหวะ ทิศหน้าจอ และช็อตที่ไม่มีเหตุผลก่อนผลิต; shot list ทำให้ทีม (และ agent ตัวอื่น) ทำงานจาก spec เดียวกัน

## 4. ผลต่ออารมณ์และการรับรู้
บอร์ดเองไม่ถึงคนดู แต่: animatic ที่ตั้งเวลากับ VO จริงทำให้รู้ว่าอารมณ์ "ทัน" หรือ "ค้าง" ก่อนสร้าง; กราฟความเข้ม (Block) ทำให้ climax มีภาพที่ต่างจริง ไม่ใช่ทุกช็อตเท่ากัน

## 5. ใช้เมื่อไร
ทุกคลิปที่มี > 3 ช็อต; ทุกครั้งที่จะใช้โควตา (Codex/Kling) — บอร์ดก่อนเสมอ; ซีรีส์ (บอร์ดตอนแรกเป็น template ตอนถัดไป)

## 6. ไม่ควรใช้เมื่อไร
- Beat clip สูตรตายตัวที่ skill `beat-clip` มี template แล้ว — ใช้ cue sheet ของ skill นั้นแทน
- บอร์ดรายละเอียดสวยเกินจำเป็น (เสียเวลา; บอร์ดคือแผน ไม่ใช่ผลงาน)
- เปลี่ยนบอร์ดหลัง animatic อนุมัติแล้วโดยไม่อัปเดต shot list (แหล่งความจริงสองที่)

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- Katz ใช้บอร์ดจริงของภาพยนตร์ประกอบการวิเคราะห์ทางเลือกการจัดช็อต [`Katz1991_ShotByShot`]
- Layout ของ Ghibli (~1,300 แผ่น) = ขั้นวางแผนต่อจากบอร์ด กำหนดกรอบ ฉาก และการเคลื่อน [`Ghibli_LayoutDesigns2008`]
- Storyboard Pro animatic → export EDL/XML ให้ฝ่ายตัดต่อ [`ToonBoom_SBP_Animatic`]
- Pixar in a Box (Khan Academy) มีบทเรียน storyboarding ในชุด Art of Storytelling — เนื้อหาภายในยังไม่ได้อ่าน [unverified]

## 8. ประยุกต์ตามประเภทวิดีโอ
| ประเภท | บอร์ด/แผน |
|---|---|
| Story clip (Thai VO) | 1 panel ต่อ 1 บรรทัด VO; floor plan ต่อสถานที่; coverage: master + singles + 1 insert; animatic จาก timing.json |
| Product/promo | บอร์ด 6/15/30 s (curriculum 08 §1.5) + insert list ของแว่นจริง (มุม: หน้า, 3/4, ข้าง, บานพับ, เลนส์) ตาม house rules |
| Reels/TikTok | บอร์ด 9:16 + safe zone, hook panel 0–2 s บังคับ, เลข beat ใต้ panel |
| Explainer | บอร์ดเป็น "scene per idea", ระบุ icon/graphic ต่อ panel, เวลาอ่านข้อความ (~11 ตัวอักษรไทย/s ตาม DECISION_ENGINE) |
| Cartoon | thumbnail → layout (FD17) → animatic on 2s; ระบุ X-sheet camera notes (TI 6F, pan E 24F) |
| Talking head/doc | paper edit + B-roll list แทนบอร์ด; floor plan กล้อง A/B + มุมสัมภาษณ์ (eyeline off-axis) |

## 9. AI image prompt examples (ทำ thumbnail/บอร์ดด้วย FLUX local — ไม่ใช้โควตา)
1. `rough storyboard panel, black pencil sketch on white, 9:16 frame, medium shot of a young man behind an optical shop counter looking up surprised, arrow showing camera push-in, minimal detail`
2. `top-down floor plan diagram of a small eyeglass shop: counter, door, display shelf, two figures as circles with direction marks, camera icon with view cone, clean line drawing, no text`
3. `six storyboard thumbnails in a grid, same scene from different camera angles: wide, over-the-shoulder, low angle, close-up, insert of hands, POV through glasses, loose sketch style, no text`
4. `cinematic keyframe for shot 3 of the storyboard: [shot description], 9:16, [style token], text-free` (ทำหลังบอร์ดอนุมัติ)

## 10. AI video prompt examples
บอร์ด → keyframe image → image-to-video (Wan local / Kling ต้องถามโควตา) — prompt ต่อช็อตเขียนจาก shot list:
1. `[from shot 4] medium shot, camera slowly pushes in, the man looks up from the counter toward the door, surprised, warm interior light, 5 seconds`
2. `[from shot 6] insert, static camera, hands place round eyeglasses on the counter, shallow depth of field`
กฎ: 1 prompt = 1 ช็อตของ shot list; ถ้า prompt มี 2 การกระทำหรือ 2 การเคลื่อนกล้อง = ช็อตยังวางไม่ดี (แยก)

## 11. Shot list example (รูปแบบเต็มอยู่ใน `templates/SHOT_LIST_TEMPLATE.md`)
| shot | VO/beat | size·angle·move | lens | focus (1 สิ่ง) | emotion | dur | sound | trans | tool | why |
|---|---|---|---|---|---|---|---|---|---|---|
| 1-01 | hook "ร้านนี้เปิดตอนตีสอง" | WS·eye·truck R 4% | wide 24mm-equiv | ป้ายร้านไฟเปิด | สงสัย 3 | 2.5 | amb กลางคืน, จิ้งหรีด | cut in | rig+FLUX BG | เปิดโลก + คำถาม |
| 1-02 | "ทอนยังไม่นอน" | MS·eye·static+drift | normal 50 | หน้าทอน | เหงา 2 | 2.0 | นาฬิกา | cut | rig | แนะนำตัวละคร |
| 1-03 | (เงียบ) | ECU ตา·static | tele 85 | ตาเหลือบ | ตึง 4 | 0.6 | duck | cut | rig | เตรียมคนดู |
| 1-04 | กริ๊ง! | MS·low·TI 6F | normal | ทอนสะดุ้ง | ตกใจ 4 | 1.0 | กระดิ่ง hit | cut | rig | hit point |
| 1-05 | — | OTS ทอน→ประตู·rack | normal | ประตู | ลุ้น 5 | 2.4 | ลมเข้า | J-cut 0.4 s | rig | เผยผู้มาเยือน |

## 12. ข้อผิดพลาดที่พบบ่อย
1. บอร์ดไม่มีเวลา → animatic ยาว/สั้นกว่า VO
2. ไม่มี floor plan → ทิศการมอง/เดินสลับ ข้ามเส้น 180° โดยไม่ตั้งใจ
3. ทุก panel ขนาดช็อตเดียวกัน (ไม่มีกราฟความเข้ม)
4. Panel มี 2–3 ความคิด (ตาคนดูไม่รู้จะไปไหน)
5. ปล่อยให้ AI "เลือกช็อต" แทนการบอร์ด
6. ลืม insert สินค้า/รายละเอียดที่ต้องขาย
7. Shot list กับบอร์ดคนละเวอร์ชัน

## 13. วิธีตรวจและแก้
- ทุก panel ผ่าน `python .claude/skills/film-director/tools/check_scene.py <scene.json>` (ช่องว่าง/ไม่มี why = แก้)
- Animatic ดูแบบปิดเสียง 1 รอบ + ฟังอย่างเดียว 1 รอบ (FD19 §13)
- เดินตาม floor plan: ทุกคัตอยู่ฝั่งเดียวของเส้น 180° ไหม
- กราฟความเข้ม: ขนาดช็อต/ความเร็วคัตขึ้นตามเรื่องไหม (นับขนาดช็อตต่อช่วง)
- Coverage: แต่ละฉากมี reaction สำรองอย่างน้อย 1 ช็อตไหม

## 14. แบบฝึกหัด + test case
1. **3 ทางเลือก**: บทเดียวกัน ("ยายจันทร์ยื่นแว่นให้ทอน") บอร์ด 3 แบบ — (ก) master + 2 singles (ข) OTS สลับ + insert มือ (ค) POV ผ่านเลนส์ + ECU → ทำ animatic ทั้ง 3 ด้วย rig (ถูก) แล้วถามคนดูว่าแบบไหน "อบอุ่นที่สุด" และทำไม
2. **Floor plan**: วาด overhead ของร้าน + ตำแหน่งกล้อง 5 ช็อต แล้วตรวจเส้น 180°
3. **Ripple test**: ยืด panel 3 จาก 1 s เป็น 2 s → ตรวจว่าเสียง/คัตถัดไปเลื่อนตาม (ทดสอบว่า pipeline ใช้ timing.json ตัวเดียว)
- ผ่านเมื่อ: ทุก panel มี duration + why + visual focus, floor plan ไม่มีการข้ามเส้นโดยไม่ตั้งใจ, animatic ยาวเท่า VO ± 0.2 s

## 15. แหล่งอ้างอิง
`Katz1991_ShotByShot`, `Block2020_VisualStory`, `Hart2008_ArtOfStoryboard`, `ToonBoom_SBP_Animatic`, `StudioBinder_ShotList`, `Lemay_ExposureSheet`, `Ghibli_LayoutDesigns2008`, `Murch2001_Blink`, `SmithHenderson2008_EditBlindness`
+ repo: `story-clips/_craft/curriculum/08-storyboard.md`, `GUIDE.md` §0, `.claude/skills/film-director/DECISION_ENGINE.md`, `story-clips/_craft/sound.py` (`Bed.from_timing`)
