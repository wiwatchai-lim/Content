# FD07 — Perspective & Spatial Depth (มิติลึกในภาพเคลื่อนไหว: depth cues, ชั้น fg/mg/bg, parallax, staging in depth, 2.5D)

> ต่อยอด ไม่ซ้ำ: ระบบเปอร์สเปกทีฟ (1/2/3 จุด, foreshortening, ellipses, เงา/เงาสะท้อน, forced perspective) และวิธีจับ error ภาพ AI อยู่ใน
> `creative-intelligence/knowledge/visual-arts/PERSPECTIVE_MASTERY.md` + `PERSPECTIVE_ERROR_LIBRARY.json`; เลนส์/compression ใน `LENS_OPTICS.md`
> และ `libraries/LENS_KNOWLEDGE_LIBRARY.json` (`lens.*`); multiplane/`--d` ของ `rig.js` ใน `modules/17-cartoon-cinematography.md` §2.2;
> aerial perspective ใน `ATMOSPHERIC_EFFECTS.md`. บทนี้เพิ่ม: **depth cue ไหนแรงที่ระยะไหน (หลักฐาน)**, **parallax เชิงตัวเลขสำหรับ 2.5D**,
> **blur กับขนาดฉาก (miniature effect)**, **staging in depth ≠ deep focus**, และขั้นตอน 2.5D จาก depth map

## 1. นิยามและหลักการพื้นฐาน
- **Depth cue** = ข้อมูลที่ระบบการมองใช้สร้างความลึก; จอแบน (ไม่มี binocular disparity ระหว่างสองตา) จึงต้องพึ่ง cue ตาเดียว (pictorial) + การเคลื่อนไหว
- Cue หลักบนจอ: **occlusion** (บัง), **relative size**, **height in visual field**, **texture gradient**, **linear perspective**, **aerial perspective** (ไกล = จาง/อมฟ้า/คอนทราสต์ต่ำ), **shading/shadow**, **defocus blur**, **motion parallax** (ใกล้เคลื่อนเร็วกว่าไกล)
- **Layering** = แยกภาพเป็นชั้น foreground / midground / background; **staging in depth** = วางการกระทำในชั้นเหล่านั้น (FD06 `comp.depth_three_zones`)
- **2.5D** = ภาพนิ่งที่ถูกแยกชั้น (ด้วยมือหรือ depth map) แล้วขยับกล้อง/ชั้นให้เกิด parallax — ไม่ใช่ 3D จริง (ไม่มีด้านหลังวัตถุ)

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 ความแรงของ cue เปลี่ยนตามระยะ** — Cutting & Vishton (1995) เสนอว่าข้อมูลความลึกหลายแหล่งถูกรวมกัน และ "ความแรงสัมพัทธ์" ต่างกันใน 3 พื้นที่: personal, action, vista space [`CuttingVishton1995`, bibliographic — รายละเอียดต่อไปนี้มาจากแหล่งรอง]: disparity แรงที่ใกล้และอ่อนลงตามระยะ; occlusion และ aerial perspective ยังให้ข้อมูลในฉากกลางแจ้งที่ลึกมาก; cue เชิงเมตริกเสื่อมประโยชน์ราว 100 ม. (ขอบเขต ~1.5–2 ม./~30 ม. มาจากสรุปบรรยาย ยังไม่ยืนยันกับต้นฉบับ) → ใช้งาน: **ฉากใกล้** (ของบนโต๊ะ, หน้าคน) ความลึกบนจอแบนมาจาก shading + blur + occlusion; **ฉากไกล** (ทะเล ภูเขา) มาจาก aerial perspective + occlusion ของชั้น + ขนาดสัมพัทธ์ [CRAFT inference]
**2.2 Motion parallax เป็น cue อิสระ** — Rogers & Graham (1979) ใช้จุดสุ่มที่ไม่มี cue อื่นเลย แค่ความเร็วสัมพัทธ์ที่ผูกกับการขยับหัว ก็เห็นพื้นผิวลอนชัด [`RogersGraham1979`, bibliographic; อ้างผ่าน `Kim2016_MotionParallax`]
- Kim, Angelaki & DeAngelis (2016, review): วัตถุต่างระยะเคลื่อนบนภาพด้วยความเร็วต่างกัน → ความลึกเชิงปริมาณ; ในไพรเมต disparity แม่นกว่า parallax; **parallax อย่างเดียวกำกวมว่าใกล้หรือไกล** — สมองใช้สัญญาณการกลอกตา และ cue "dynamic perspective" จากพื้นหลังกว้างที่มีลาย ช่วยตัดสิน [EVIDENCE, `Kim2016_MotionParallax`, full_text]
- ใช้งาน: ใน 2.5D ต้องมี **พื้นหลังกว้างที่มี texture** และ **ชั้นที่บังกัน (occlusion)** เพื่อให้รู้ว่าอะไรอยู่หน้า — ไม่งั้น parallax อาจอ่านกลับด้าน/ดูเป็นการเลื่อนกระดาษ [CRAFT inference จาก EVIDENCE]
**2.3 เรขาคณิตของ parallax (สำหรับตั้งค่าชั้น)** — กล้อง pinhole เลื่อนข้าง (truck) ระยะ T: การเลื่อนบนภาพของจุดที่ระยะ Z ≈ f·T/Z → **ความเร็วชั้น ∝ 1/Z** [เรขาคณิตพื้นฐาน]
| ชั้น | Z สัมพัทธ์ (เทียบตัวหลัก = 1) | ตัวคูณความเร็ว (= 1/Z) | ตัวอย่าง |
|---|---|---|---|
| foreground (ใบไม้/ไหล่) | 0.5 | 2.0 | ขอบกรอบหน้า |
| subject | 1 | 1.0 | คน/แว่น |
| midground | 2 | 0.5 | เคาน์เตอร์ |
| background | 5 | 0.2 | ผนังร้าน |
| sky/horizon | ∞ | ~0 | ฟ้า (แค่ rotate/pan เท่านั้นที่ขยับ) |
Pan/tilt (หมุนกล้องเฉยๆ) **ไม่เกิด parallax** — ทุกชั้นเลื่อนเท่ากัน; ต้อง truck/pedestal/dolly หรือ arc (ดู `move.truck`, `move.arc`, `move.pedestal`)
Dolly-in: ชั้นใกล้ขยายเร็วกว่า (scale ∝ 1/(Z−d)) → ใช้ scale ต่างกันต่อชั้น ไม่ใช่ zoom ทั้งภาพ (zoom = ไม่มี parallax; `move.zoom` vs `move.dolly_in`)
**2.4 Blur: ช่วยลำดับความลึก และเปลี่ยน "ขนาดฉาก"** — Held, Cooper & Banks (2012): disparity แม่นใกล้จุดโฟกัส, blur แม่นกว่าที่ห่างจากจุดโฟกัส ผู้ดูใช้ cue ที่แม่นกว่า [`Held2012_BlurDisparity`, search_summary]; **ข้อโต้แย้ง:** Vishwanath ว่าวัดแค่การแยก blur ไม่ใช่ความลึกที่รับรู้, งานปี 2015 พบ blur ทำให้แยกความลึกในภาพธรรมชาติแย่ลงได้ → confidence ต่ำ-กลาง
- Vishwanath & Blaser (2010): **gradient ของ blur ทำให้พื้นผิวดูใกล้ขึ้น และขนาดของ blur ส่งผลแรงต่อขนาดฉากที่รับรู้ = tilt-shift miniaturisation** [`VishwanathBlaser2010`, search_summary] → ช็อตกว้างที่ blur บน-ล่างแรง จะดูเหมือนโมเดลจิ๋ว: ใช้เมื่ออยากได้ "โลกของเล่น" และระวังเมื่อใส่ DoF ปลอมแรงๆ ใน 2.5D ฉากเมือง
**2.5 Staging in depth ≠ deep focus** — Bordwell แยกสองอย่าง: Renoir ยุค 1930s ใช้ depth staging มาก แต่ deep focus ไม่มาก [`Bordwell2005_FiguresTraced`, bibliographic] → วางชั้นลึกได้แม้ชั้นหลังเบลอ; ใช้ rack focus (`move.rack_focus`) ย้ายความสำคัญ
**2.6 Contrast & affinity ของ space** — Block แบ่ง deep / flat / limited / ambiguous space; เปลี่ยนจากแบน→ลึกเพื่อเพิ่มความเข้มตามเรื่อง [`Block2020_VisualStory`, publisher_page, CRAFT]

## 3. เหตุผลที่ใช้
ความลึกทำให้ภาพ "มีโลก" แยกตัวหลักจากพื้นหลัง (figure/ground) และให้กล้องเคลื่อนแล้วมีความหมาย; ในงาน AI/HTML ที่วัตถุดิบเป็นภาพนิ่ง ความลึกปลอม (2.5D) คือวิธีถูกที่สุดที่จะได้การเคลื่อนกล้องที่ดูจริง

## 4. ผลต่ออารมณ์และการรับรู้
- Deep space + parallax ชัด: ดื่มด่ำ เดินทาง เปิดกว้าง [CRAFT]
- Flat space (เลนส์ยาว, ชั้นชิดกัน, แสงแบน): อึดอัด กราฟิก ตลกแบบ deadpan [CRAFT; `Block2020_VisualStory`]
- Tilt-shift blur ฉากกว้าง: เล็ก น่ารัก เหมือนของเล่น [EVIDENCE สำหรับการรับรู้ขนาด; อารมณ์ = CRAFT]
- Parallax ผิดทาง/ชั้นฉีก: ภาพ "ไม่จริง" รู้สึกเป็นกระดาษตัด (เหมาะเฉพาะสไตล์ paper cut-out — `STYLES.md` G)

## 5. ใช้เมื่อไร
- เปิดฉาก (establishing) ด้วย truck/arc ช้าๆ ให้ parallax บอกพื้นที่
- Product hero: ฉากหลังเบลอไล่ระดับ + rim (FD08) แยกแว่นออกจากพื้น
- 2.5D จากภาพ Codex/FLUX เมื่อไม่มีงบ/เวลาทำ AI video (`tools/depth.py`, CAPABILITY_MATRIX: depth-anything-v2-small verified สำหรับ 2.5D)
- ฉากร้าน/ห้อง: วางของหน้าเลนส์ (foreground) เพื่อให้มี occlusion

## 6. ไม่ควรใช้เมื่อไร
- 2.5D กับวัตถุโปร่ง/บาง (เลนส์แว่น ขาแว่นลวด ผม) — depth map ฉีกขอบ เห็นรอยยืด → แยก cutout แว่นเป็นชั้นของตัวเอง (`kits/*` มี cutout อยู่แล้ว)
- เคลื่อนมากเกินช่องว่างหลังวัตถุ (เผยพื้นที่ที่ไม่มีภาพ = รอยยืด/ซ้ำ)
- Blur ปลอมแรงในฉากเมือง/ร้านจริงที่ต้องดู "ขนาดจริง" (จะดูเป็นโมเดล)
- สไตล์ flat cartoon ที่ตั้งใจแบน — อย่าใส่ DoF/atmospheric ขัดสไตล์ (ดู `capability flux: lens/DoF words push non-photo styles toward 3D photo look`)

## 7. ตัวอย่างจากภาพยนตร์ (มีแหล่ง)
- *Panic in the Streets* (1950) ฉากห้องเก็บศพจัด 3 โซนความลึก [`Bordwell2015_ModestVirtuosity`]
- *The Best Years of Our Lives* (1946) การกระทำสำคัญในตู้โทรศัพท์ลึกเข้าไป [`Bordwell2008_GradationEmphasis`]
- Renoir ยุค 1930s: depth staging โดยไม่ deep focus [`Bordwell2005_FiguresTraced`, bibliographic]
- Disney multiplane (*The Old Mill* → *Snow White*) อยู่ใน FD17 [`Wikipedia_Multiplane` ของ sources/animation-sound.json]

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip:** ฉากร้านแว่นตีสอง: fg = ขอบประตู/ชั้นแว่น (d≈0.5), subject (1), เคาน์เตอร์ (2), ถนนนอกหน้าต่าง (6) + หมอกบาง; truck ซ้าย 3–5% ความกว้างภาพต่อ 4 วิ
- **Product/promo:** แว่น cutout = ชั้นของตัวเอง, ฉากหลังจาก Codex แยก 2–3 ชั้นด้วย depth map; arc เล็กน้อย (หมุนชั้นแว่นด้วยมุมภาพหลายมุมแทนการบิด 2D)
- **Reels 9:16:** parallax แนวตั้ง (pedestal ขึ้น/ลง) เข้ากับกรอบตั้ง (FD06 §2.4) — ชั้นหน้าลอดผ่านล่างจอ
- **Explainer:** ใช้ flat space เป็นหลัก ความลึกเฉพาะตอนเปลี่ยนหัวข้อ (contrast)
- **Cartoon:** ใช้ `rig.js` `--d`; เลือก animetism (slide ข้าง) หรือ cinematism (พุ่งเข้าจุดหาย) ให้ตรงสไตล์ทั้งเรื่อง (FD17 §2.1)
- **Documentary/talking head:** ห่างจากผนังหลัง ≥ 1.5–2 ม. + ไฟแยกพื้นหลัง (FD08 `lp.rim_separation_dark_bg`) → ลดความแบน

## 9. AI image prompt examples (สร้างภาพต้นทางที่ "แยกชั้นได้")
1. `cosy optical shop at night, foreground: out-of-focus edge of a glasses display shelf on the left, midground: optician at the counter, background: street visible through the window with soft haze, clear separation between layers`
2. `wide beach at golden hour, distinct layers: dune grass foreground, couple walking midground, hazy headland far background fading in blue aerial perspective`
3. `product on a table, generous empty space behind the object, background wall 2 metres behind, soft gradient` (มีที่ว่างหลังวัตถุ = 2.5D เคลื่อนได้มากขึ้น)
4. `tilt-shift miniature effect, aerial view of a Thai market, strong blur at top and bottom` (ตั้งใจให้เป็นของเล่น)
(ข้อควรระวัง FLUX: คำแนว "depth of field, bokeh" อาจดันภาพสไตล์วาดให้เป็นภาพถ่าย 3D — CAPABILITY_MATRIX `flux-schnell-local.limits`)

## 10. AI video prompt examples
1. `slow sideways truck to the right, foreground shelf passes quickly, the optician moves less, the street outside barely moves` (สั่ง parallax ชัดๆ)
2. `camera pedestal rises slowly from behind the counter revealing the shop` (vertical parallax สำหรับ 9:16)
3. `slow push in, the background stays soft, focus stays on the glasses` (ไม่ใช่ zoom)
Wan 2.2: ไม่มีการทดสอบระบบว่ารักษาความสัมพันธ์ parallax ได้ถูกต้องแค่ไหน — ตรวจด้วยการดูว่าชั้นใกล้เคลื่อนเร็วกว่าชั้นไกลจริง (untested)

## 11. Shot list example (2.5D promo 9:16, 6 วิ)
| # | วิ | ชั้น (Z สัมพัทธ์) | การเคลื่อน | หมายเหตุ |
|---|---|---|---|---|
| 1 | 0–3 | ใบไม้ fg (0.5), แว่น cutout (1), ชายหาด bg (6) | truck ซ้าย 4% ของความกว้าง: fg ×2, แว่น ×1, bg ×0.17 | แว่นมีชั้นเลนส์ (house rule) |
| 2 | 3–6 | แว่น (1), ฟ้า (∞) | pedestal ขึ้น + scale แว่น 1.00→1.06 | ฟ้าไม่ขยับ; ข้อความใน safe box |

## 12. ข้อผิดพลาดที่พบบ่อย
- ใช้ zoom/scale ทั้งภาพแล้วเรียกว่า dolly (ไม่มี parallax)
- ทุกชั้นเลื่อนเท่ากัน หรือชั้นไกลเลื่อนเร็วกว่าชั้นใกล้
- ขอบวัตถุจาก depth map มี "ม่านยืด" (rubber sheet) — ไม่ได้ inpaint พื้นหลังหลังวัตถุ
- aerial perspective กลับด้าน (ของไกลคอนทราสต์จัด)
- ฉาก AI ที่ทุกชั้นคมเท่ากันและสว่างเท่ากัน → แบน

## 13. วิธีตรวจและแก้
1. **ตรวจทิศ parallax:** ดึงเฟรมแรก/สุดท้าย วัดการเลื่อนของจุดในแต่ละชั้น (px) — ต้องเรียง fg > subject > bg ตามตาราง §2.3
2. **ตรวจขอบ:** ดูที่ความเร็ว 0.25×; หา halo/การยืดรอบผมและขอบแว่น → แก้ด้วยการขยาย mask 2–4 px และ inpaint พื้นหลังชั้นหลัง (FLUX img2img/inpaint)
3. **ตรวจ depth map:** `python tools/depth.py in.png tmp/depth.png` แล้วเปิดดู — Depth Anything V2 ให้ค่า *สัมพัทธ์* (ไม่ใช่เมตร) [`Yang2024_DepthAnythingV2`]: ใช้แบ่ง "ลำดับชั้น" เท่านั้น แล้วกำหนดตัวคูณความเร็วเองตาม §2.3
4. **ตรวจขนาดฉาก:** ถ้าภาพดูเป็นโมเดลจิ๋วโดยไม่ตั้งใจ → ลด blur บน-ล่าง, เพิ่มรายละเอียดพื้นผิว

## 14. แบบฝึกหัด + test case
- **T1 Speed ratio:** ภาพเดียว 3 เวอร์ชัน 4 วิ — (ก) ทุกชั้นเท่ากัน (ข) ตามตาราง 1/Z (ค) ชั้นไกลเร็วกว่า; ถามผู้ดู 3 คนว่าแบบไหน "เหมือนกล้องเคลื่อนจริง" — คาด (ข) ชนะ, (ค) อ่านเป็นแปลก/กลับด้าน
- **T2 Occlusion helps sign:** ทำ (ข) ซ้ำแต่ตัดชั้น foreground ที่บังออก — เทียบว่าความลึกอ่านง่ายลงไหม (ทดสอบข้อเสนอจาก `Kim2016_MotionParallax` ในบริบทของเรา)
- **T3 Miniature:** ภาพตลาดกว้าง blur บน-ล่าง 0/ปานกลาง/แรง — ให้ผู้ดูประเมินว่า "จริง vs ของเล่น"
- **T4 Depth staging:** ฉากร้าน 3 ชั้น เทียบ deep focus vs rack focus ชั้นกลาง→หลัง; อะไรนำสายตาได้ดีกว่า
บันทึกผลใน `story-clips/_craft/LEARNING-LOG.md`

## 15. แหล่งอ้างอิง
`CuttingVishton1995`, `RogersGraham1979`, `Kim2016_MotionParallax`, `Held2012_BlurDisparity`, `VishwanathBlaser2010`, `Bordwell2005_FiguresTraced`,
`Bordwell2015_ModestVirtuosity`, `Bordwell2008_GradationEmphasis`, `Block2020_VisualStory`, `Yang2024_DepthAnythingV2`, `Wan22_ModelCard` — ใน `sources/image.json`
