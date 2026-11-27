# FD06 — Composition & Framing for the Moving Image (การจัดองค์ประกอบภาพเคลื่อนไหว: headroom, lead room, 9:16 vs 16:9, frame-in-frame, blocking in depth, aspect ratio)

> ต่อยอด ไม่ซ้ำ: กฎพื้นฐาน (thirds, golden ratio เชิงวิจารณ์, leading lines, symmetry, safe zone รวมของทีม) อยู่ใน `story-clips/_craft/curriculum/03-composition.md`;
> 30 แบบภาพนิ่งอยู่ใน `.claude/skills/ai-visual-artist/COMPOSITION_LIBRARY.json` (อ้างเป็น `ava.comp:<id>`); มุม/ขนาดช็อตอยู่ใน
> `creative-intelligence/knowledge/visual-arts/CAMERA_ANGLE_LIBRARY.json` (`cam.*`) และ `libraries/SHOT_TYPE_LIBRARY.json` (`shot.*`).
> บทนี้เพิ่ม: **หลักฐานเชิงทดลอง** เรื่องตำแหน่ง/ทิศของวัตถุในกรอบ, **องค์ประกอบที่เปลี่ยนตามเวลา**, ทฤษฎี **กรอบตั้ง 9:16**, **staging in depth**
> และ **aspect ratio เป็นเครื่องมือเล่าเรื่อง** — ไลบรารี: `libraries/COMPOSITION_LIBRARY.json` (22 รายการ `comp.*`)

## 1. นิยามและหลักการพื้นฐาน
- **Composition (ภาพเคลื่อนไหว)** = การจัดสิ่งที่อยู่ในกรอบ *ตลอดช่วงเวลาของช็อต* ไม่ใช่แค่เฟรมแรก: ตัวละครเดิน กล้องขยับ สิ่งใหม่เข้ากรอบ → สมดุลเปลี่ยนได้ (`comp.balance_shift_in_shot`) [CRAFT]
- **Headroom** = ช่องว่างเหนือศีรษะ; **look/nose room** = ช่องว่างด้านที่หน้าหันไป; **lead room** = ช่องว่างด้านหน้าทิศที่วัตถุเคลื่อน [CRAFT, `Clayton2019_Vertical`]
- **Frame within frame** = ประตู/หน้าต่าง/กระจก/จอ/ขอบแว่น เป็นกรอบซ้อนในภาพ [CRAFT]
- **Blocking / staging** = การวางตำแหน่งและเส้นทางของนักแสดงเทียบกับกล้อง; **staging in depth** = จัดการกระทำเป็นชั้นหน้า-กลาง-หลังในช็อตเดียว [`Bordwell2015_ModestVirtuosity`]
- **Aspect ratio** = สัดส่วนกว้าง:สูงของกรอบ (16:9 = 1.78, 9:16 = 0.56, 1:1, 4:5, 2.39) — กำหนด "พื้นที่" ที่เรื่องมีให้เล่น
- Block: ภาพมี 7 องค์ประกอบพื้นฐาน (space, line, shape, tone, colour, movement, rhythm) และหลัก **contrast & affinity** — ความต่างมาก = ความเข้มทางสายตามาก; ความคล้าย = เบาลง [`Block2020_VisualStory`, publisher_page]

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 งานวิจัยบอกอะไร (ภาพนิ่งของวัตถุเดี่ยว — ยังไม่ใช่ภาพยนตร์)** [EVIDENCE, `PalmerLab_SpatialAesthetics`, tier B สรุปงาน peer-reviewed]
- **Center bias:** ตำแหน่งที่คนชอบที่สุดของวัตถุเดี่ยวคือ *กลางกรอบ* ทุกทิศที่วัตถุหัน (แรงสุดเมื่อวัตถุสมมาตรหันหน้าตรง)
- **Inward bias:** ถ้าไม่อยู่กลาง คนชอบให้วัตถุ *หันเข้าหากรอบ* (หันขวา → วางซ้าย) = หลักฐานรองรับ look room; อคตินี้ **อ่อนลงเมื่อการเคลื่อนที่ที่สื่อเร็วขึ้น** และทิศการเคลื่อนอาจชนะทิศที่หน้าหัน
- **Rule of thirds:** การทดสอบตรงของ Palmer, Hara & Griscom "ขัดกับข้อเสนอหลักทั้งสองข้อของ ROT อย่างชัดเจน"; Amirshahi et al. 2014 ถูกอ้างว่าไม่พบความชอบภาพที่ทำตาม ROT [`Amirshahi2014_RuleOfThirds`, search_summary, unverified title] → thirds = heuristic ให้ "ลองนอกกลาง" ไม่ใช่เกณฑ์ให้คะแนน
- **Ecological fit:** วัตถุที่อยู่สูงในโลกจริง (นกอินทรี) ชอบวางสูง ของที่อยู่ต่ำ (ปลากระเบน) วางต่ำ; ของเล็ก (หนู) ชอบให้เล็กในกรอบ ของใหญ่ (ช้าง) ให้ใหญ่; **representational fit**: องค์ประกอบผิดธรรมดาเป็นที่ชอบมากกว่า *ถ้าบริบทให้เหตุผล* (เปลี่ยนชื่อภาพก็เปลี่ยนความชอบได้)
- ความมั่นใจ: medium — ภาพนิ่ง ผู้ร่วมทดลองตะวันตก ยังไม่มีงานทดสอบในคลิปเคลื่อนไหว/9:16

**2.2 Gradation of emphasis (การไล่ระดับความสำคัญ)** — Charles Barr (1963) เสนอว่ากรอบกว้างให้ "ช่วงการไล่ระดับความสำคัญ" มากขึ้น รายละเอียดรองวางได้โดยไม่ดูจงใจ; Bordwell: "ถ้าเน้นองค์ประกอบรองมากไป มันจะกลายเป็นองค์ประกอบหลัก" [`Bordwell2008_GradationEmphasis`, CRAFT/วิจารณ์]
**2.3 Staging แทนการตัด** — Bordwell วิเคราะห์ *Panic in the Streets* (1950, Kazan): ฉาก 2 นาทีใน 2 ช็อต ใช้ actor เดินเข้า-ออกความลึก, blocking & revealing ("เปิดช่อง"), ให้ตัวประกอบนิ่ง, head-blocking, พื้นที่นอกจอ, เลื่อนการตัดไว้จุดที่มีผลสุด; "พื้นที่ภาพยนตร์ถูกคำนวณสำหรับแนวสายตาเดียว คือของกล้อง" [`Bordwell2015_ModestVirtuosity`]
**2.4 ทฤษฎีกรอบตั้ง 9:16** [CRAFT, `Clayton2019_Vertical`, การสังเคราะห์ของผู้เขียน ไม่ใช่การทดลอง]
- คนเป็นสัตว์แนวตั้ง → เต็มกรอบได้ทั้งตัว เหมาะ monologue/talking head; ของยาว-ผอม, ของถือมือยกถึงหน้า (แว่น!), ทางเดิน บันได อุโมงค์ ยานพาหนะ
- การเคลื่อนตามแกน Y (ขึ้น-ลง) และ Z (เข้า-ออกกล้อง) เข้ากับกรอบตั้ง; การเคลื่อนแนว X ให้หมุนกล้องเป็นแนวทแยง (`comp.diagonal_x_to_z`)
- **ขนาดช็อตต้องคิดใหม่:** CU แบบ 16:9 (ถึงไหล่) กินจอ ~1/2; เอาไปใส่ 9:16 จะกิน ~4/5 = กลายเป็น BCU/ECU → "CU" ในแนวตั้งให้ตัดล่างที่อก/สะดือ (`comp.vertical_single_cu`)
- Thirds ไม่พอสำหรับ look room ในแนวตั้ง → เสนอ **rule of fifths** + เลนส์กว้าง; เลนส์ยาวทำให้ฉากหลังบางลง
- บน-ล่าง = อำนาจ (ผู้มีอำนาจอยู่บน) และความเปราะบาง (คนตัวเล็กใต้ท้องฟ้ากว้าง); กรอบแคบ = ความรู้สึกติดกับ
**2.5 Aspect ratio เป็นภาษา** — *The Grand Budapest Hotel* (2014) ใช้ 1.37 ช่วง 1932, 1.85 ปัจจุบัน, anamorphic กว้างช่วง 1968: Anderson "อัตราส่วนบอกผู้ชมว่าอยู่ตรงไหนของเส้นเวลา" [`Hellerman2021_GrandBudapest`, ตัวเลขในบทความไม่ตรงกันเอง 2.35/2.40]; *Mommy* (2014) ส่วนใหญ่ 1:1 แล้ว **ขยายเป็น 1.85 ในช่วงปลดปล่อย** ก่อนกลับเป็นจัตุรัส [`ScreenDaily_Mommy`, search_summary]
**2.6 องค์ประกอบตามเวลา (Block)** — ใช้ contrast/affinity ของ *space* (แบน vs ลึก) และ *movement* ให้เพิ่มตามความเข้มของเรื่อง: ต้นเรื่องเฟรมสงบ (affinity) → ไคลแม็กซ์ใช้ความลึก/ทแยง/สมดุลแตก (contrast) [`Block2020_VisualStory`, CRAFT]

## 3. เหตุผลที่ใช้
ควบคุม *ลำดับการมอง* (primary→secondary→tertiary), บอกความสัมพันธ์ของตัวละคร (ใกล้/ไกล/บน/ล่าง), เตรียม payoff (priming), ลดจำนวนคัตในคลิปสั้นที่ทุกคัตเสี่ยงคนเลื่อนผ่าน, และกันไม่ให้ UI แพลตฟอร์มทับของสำคัญ

## 4. ผลต่ออารมณ์และการรับรู้
| การจัด | ผลที่รายงาน | ระดับหลักฐาน |
|---|---|---|
| วัตถุหันเข้ากรอบ / มี look room | ชอบมากกว่า, รู้สึก "ถูก" | EVIDENCE (ภาพนิ่ง) |
| short-siding (หันชนขอบ) | อึดอัด, ถูกปิดทาง | CRAFT |
| กลางกรอบ สมมาตร | มั่นคง เป็นทางการ (และเป็นค่าที่คนชอบเริ่มต้น) | EVIDENCE+CRAFT |
| headroom มาก / ตัวเล็กล่างกรอบ | โดดเดี่ยว เปราะบาง | CRAFT (`Clayton2019_Vertical`) |
| ขยายกรอบกลางเรื่อง | โล่ง ปลดปล่อย | CRAFT (กรณี *Mommy*) |
| staging in depth | ผู้ชมจับตาเองได้, ตึงเมื่อมีสิ่งเคลื่อนข้างหลัง | CRAFT (Bordwell) |

## 5. ใช้เมื่อไร
- Look/lead room: ทุกช็อตที่คนหันข้าง/เคลื่อนที่ ยกเว้นต้องการความอึดอัด
- Centre: product hero, talking head แนวตั้ง, โทนนิทาน/deadpan
- Depth staging: ฉากหลายตัวละคร, คลิปที่อยากตัดน้อย, ฉากร้าน (ลูกค้าหน้า-ช่างแว่นกลาง-ผนังแว่นหลัง)
- Frame change: แยกยุค/โลก, ช่วงอารมณ์ปลดปล่อย

## 6. ไม่ควรใช้เมื่อไร
- อย่าให้คะแนนเฟรมด้วย "ตรง thirds ไหม" (ไม่มีหลักฐานรองรับ)
- อย่าวางหน้าตัวละครแนวตั้งชิดขอบขวา (ปุ่ม like/share ของ Reels/TikTok)
- อย่าใช้ two-shot แบบยืนเคียงกันในกรอบ 9:16 ถ้าทั้งสองหน้าต้องอ่านออก — ซ้อนในความลึกหรือสลับ single
- อย่าเปลี่ยน aspect ratio ถ้าอธิบายกฎไม่ได้ในประโยคเดียว

## 7. ตัวอย่างจากภาพยนตร์ (มีแหล่ง)
- *Panic in the Streets* (1950) — ฉาก 2 นาที 2 ช็อต, ฉากห้องเก็บศพ 3 โซนความลึก [`Bordwell2015_ModestVirtuosity`]
- *The Best Years of Our Lives* (1946) — โฮเมอร์ที่เปียโนหน้าภาพ ขณะการกระทำสำคัญอยู่ในตู้โทรศัพท์ไกลออกไป [`Bordwell2008_GradationEmphasis`]
- *3:10 to Yuma* (1957) — คนโผล่หลังเบลอหลัง Ben Wade = posse กำลังมา (priming) [`Bordwell2008_GradationEmphasis`]
- *The Grand Budapest Hotel* (2014) — 3 อัตราส่วนแยกยุค [`Hellerman2021_GrandBudapest`]
- *Mommy* (2014) — 1:1 ขยายเป็น 1.85 ช่วงปลดปล่อย [`ScreenDaily_Mommy`]
- ตัวอย่างอื่นใน curriculum 03 (Mr. Robot short-siding ฯลฯ) = [CRAFT, unverified example]

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip 16:9 (night optic):** วางฉากร้าน 3 ชั้น; ใช้ `comp.priming_background_plant` วางแว่นบนชั้นตั้งแต่ช็อตแรก; ใน `rig.js` ใช้ `--d` แยกชั้น (ดู FD07)
- **Product/promo:** `comp.center_hero` + rim (FD08) + ข้อความเหนือ/ใต้ภายใน safe box; แว่นหันเข้ากรอบเมื่อวางมุม 3/4
- **Reels/TikTok 9:16:** หน้าอยู่ ~38% จากบน, ตัดที่อก (= "CU" แนวตั้ง), การกระทำแนว Y/Z, ทุกตัวหนังสืออยู่ใน `x 65–1015, y 269–1248` (1080×1920; Meta 14/35/6%) [`Meta_AdsGuide_IGReels`]; TikTok ใช้ template ดาวน์โหลด [`TikTok_Ads_InFeedSpec`]
- **Explainer:** กลางกรอบ + negative space สำหรับกราฟิก; กราฟิกอยู่ฝั่งที่ผู้พูดหันไป (look room กลายเป็นพื้นที่ข้อมูล)
- **Cartoon (Mint & Tao, Aaron):** ตัวละครไร้หน้า → ใช้ตำแหน่งบน/ล่าง ระยะห่าง และ silhouette เล่าความสัมพันธ์; frame-within-frame ผ่านหน้าต่างบ้าน
- **Documentary/talking head:** look room ไปทางผู้สัมภาษณ์; 9:16 = มองกล้องตรง (ไม่มีที่ให้ look room)

## 9. AI image prompt examples
1. `vertical 9:16, young woman framed from head to chest, eyes at the upper 40% of the frame, she lifts round glasses toward her face, calm plain wall, empty lower third`
2. `three depth layers: blurred customer shoulder in the left foreground, optician holding glasses in sharp focus in the midground, softly glowing display wall in the background, eye-level`
3. `small figure at the bottom of a vertical frame, huge pale sky above, lonely, minimal`
4. `view through a dark doorway, a girl framed by the door edges in a warm bright room beyond, symmetrical`
5. `eyeglasses centred, front view, perfectly symmetrical, generous space above and below for text`
(FLUX: คำวางตำแหน่งต้องมาต้น prompt; เพิ่ม "empty lower third" ถ้าจะวางตัวหนังสือ — ตาม BFL guide ใน curriculum 03 §9)

## 10. AI video prompt examples
1. `vertical 9:16, the man walks diagonally from the far left background toward the camera, camera static, he stays in frame` (แทนเดินขวาง X)
2. `static medium shot, the man in the foreground steps left, revealing the woman behind him staring at the camera` (blocking & revealing — Wan อาจหลอมสองร่าง: ตรวจทุกเฟรม)
3. `camera slowly dollies forward through a dark doorway toward the woman in the bright room` (frame-within-frame transition)
4. `tracking shot alongside a cyclist, she stays on the left third with open road ahead` (lead room)
หมายเหตุ: ยังไม่มีการทดสอบระบบว่า Wan 2.2 รักษา headroom/lead room ตลอดคลิปได้แค่ไหน [`Wan22_ModelCard` ไม่ได้อ้างเรื่องนี้] → ถือว่า untested

## 11. Shot list example (ร้านแว่น 9:16, 15 วิ, "หาแว่นที่ใช่")
| # | วินาที | ขนาด/มุม | Composition id | เนื้อหา |
|---|---|---|---|---|
| 1 | 0–2 | BCU แนวตั้ง, กลาง | `comp.center_hero` | แว่นบนหน้าเพื่อน — hook |
| 2 | 2–5 | WS 3 ชั้น | `comp.depth_three_zones` | ลูกค้าหน้า, ช่างกลาง, ผนังแว่นหลัง (แว่นที่จะชนะวางเด่นเล็กน้อย = priming) |
| 3 | 5–8 | MS ตัดที่อก | `comp.vertical_single_cu` | ลูกค้ายกแว่นขึ้นใส่ (แกน Y) |
| 4 | 8–11 | OTS dirty | `comp.dirty_single` | มองกระจก (frame-in-frame `comp.frame_within_frame_moving`) |
| 5 | 11–15 | MS กลาง, headroom ปกติ | `comp.safe_zone_reels_layout` | ยิ้ม + ข้อความใน safe box |

## 12. ข้อผิดพลาดที่พบบ่อย
- headroom เท่ากันทุกขนาดช็อต; ตาอยู่กลางจอ 9:16
- center-crop 16:9 → 9:16 ทั้งคลิปจนคนพูดหลุดขอบ (`comp.reframe_16x9_to_9x16`)
- ตัดสินจากเฟรมแรก (AI video มักลอยวัตถุเข้ากลางช่วงท้าย)
- ชั้นหน้าสว่าง/คมกว่าตัวหลัก (ลำดับการมองกลับหัว)
- ใช้ short-side สลับกับ look room ปกติแบบสุ่มในบทสนทนาเดียว

## 13. วิธีตรวจและแก้
1. ดึง 3 เฟรม (ต้น/กลาง/ท้าย): `ffmpeg -i clip.mp4 -vf "select='eq(n,0)+eq(n,45)+eq(n,89)'" -vsync 0 tmp/f%02d.png`
2. วาด safe box: ดู `TECH_SPEC_PRESETS.json › spec.ig_reels_9x16.qc_command`
3. ตอบ 4 ข้อ: primary คืออะไร (ต้องสว่าง/คม/ใหญ่สุด)? หันไปไหน มีที่ว่างไหม? ตาอยู่ระดับที่ตั้งใจไหม? ข้อความอยู่ใน safe box ไหม?
4. แก้: reframe ด้วย crop keyframe (HyperFrames `hyperframes-keyframes`), ลดความสว่างชั้นหน้า, generate ใหม่ด้วยตำแหน่งต้น prompt

## 14. แบบฝึกหัด + test case
- **T1 Look room:** ฉากเดียว 3 แบบ — (ก) look room ปกติ (ข) กลางกรอบ (ค) short-side; ให้คนดู 3 คนบอกอารมณ์ด้วยคำเดียว เปรียบกับตาราง §4 — คาดว่า (ค) ได้คำแนว "อึดอัด/ระแวง"
- **T2 9:16 shot size:** ถ่าย/สร้าง CU ตามนิยาม 16:9 แล้วตัดเป็น 9:16 vs เฟรมใหม่ตัดที่อก; วัดสัดส่วนหน้า/ความสูงเฟรม (เกณฑ์ `comp.vertical_single_cu` ≤ ~45%)
- **T3 Depth staging vs coverage:** บทพูด 4 บรรทัด ทำ (ก) 1 ช็อต staging ในความลึก (ข) 4 ช็อต shot/reverse; เทียบความยาว จำนวนคัต และว่าผู้ชมรู้ไหมว่าใครพูด
- **T4 Ratio change:** flashback 1:1 ใน 9:16 แล้วขยายเต็มจอตอนกลับปัจจุบัน — ผู้ชมเข้าใจการข้ามเวลาโดยไม่มีข้อความไหม
บันทึกผลลง `story-clips/_craft/LEARNING-LOG.md` และเปลี่ยน `test_status` ในไลบรารี

## 15. แหล่งอ้างอิง
`PalmerLab_SpatialAesthetics`, `Amirshahi2014_RuleOfThirds`, `Bordwell2015_ModestVirtuosity`, `Bordwell2008_GradationEmphasis`, `Clayton2019_Vertical`,
`Block2020_VisualStory`, `Hellerman2021_GrandBudapest`, `ScreenDaily_Mommy`, `Meta_AdsGuide_IGReels`, `TikTok_Ads_InFeedSpec`, `YouTube_Shorts3min`,
`Brown2022_Cinematography` — รายละเอียดใน `sources/image.json`
