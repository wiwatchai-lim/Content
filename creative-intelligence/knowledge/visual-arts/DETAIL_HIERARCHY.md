# DETAIL HIERARCHY — ความหนาแน่น/การกระจายรายละเอียด, texture, visual noise, selective detail, simplification

Batch VA1 · task `form` · modules M07, M04, M05, M35 · 2026-11-25 · sources: `sources_form.json` + *(registry)* keys
ป้าย: **EVIDENCE / CRAFT / DERIVED / OBSERVED** · ขอบ/เส้น → `EDGE_CONTROL.md` · value → `VALUE_AND_NOTAN.md`

## Scope & status
- ครอบคลุม: detail density, detail distribution, texture density, visual noise/clutter, selective detail, simplification /
  visual reduction, peripheral vision + crowding, ระดับความซับซ้อนที่คนชอบ, ขั้นตอน "detail budget" และการวัด
- ไม่ได้ทำ: ทดลองกับผู้ชม; ไม่ได้อ่าน full text ของ DiPaola 2010/2013 (abstract/summary เท่านั้น); fractal preference อ่านจาก secondary
- ไม่ซ้ำของเดิม: ART_FUNDAMENTALS §5 (texture) และ R1 #24–25 พูดถึง multi-scale texture และ texton — ไฟล์นี้เพิ่ม selective detail,
  clutter/crowding, peripheral, การวัด, กฎสำหรับ AI

---
## 1. หลักฐาน

| # | ข้อค้นพบ | ป้าย | keys | confidence |
|---|---|---|---|---|
| D1 | ภาพเหมือนแบบ Rembrandt (รายละเอียดเฉพาะจุด) ทำให้สายตาไปที่ตาที่มีรายละเอียดเร็วและนานกว่า เคลื่อนสายตาสงบกว่า และผู้ชมชอบมากกว่าภาพถ่ายที่รายละเอียดเท่ากันทั้งภาพ | EVIDENCE | DiPaolaRiebeEnns2010, DiPaolaRiebeEnns2013 | medium |
| D2 | ระบบ stylisation ที่เก็บรายละเอียดเฉพาะจุดที่ผู้ชมมอง (จาก eye tracking ไม่กี่วินาที) และลดส่วนอื่นเป็นพื้นที่ใหญ่ ให้ภาพที่สื่อสารชัด | EVIDENCE (graphics) | DeCarloSantella2002, SantellaDeCarlo2002 | medium |
| D3 | peripheral vision ได้ข้อมูลแบบ "สรุป/lossy" — รายละเอียดนอกจุดมองถูกรับรู้เป็นสถิติคล้าย texture | EVIDENCE (review) | Rosenholtz2016 | medium-high |
| D4 | crowding: วัตถุเล็กที่มีของอื่นใกล้ ๆ ในวงรอบนอกระบุไม่ได้ (โซนประมาณครึ่งหนึ่งของ eccentricity — Bouma) | EVIDENCE (review) | WhitneyLevi2011 | high (หลักการ) |
| D5 | clutter วัดได้จากภาพ (feature congestion, subband entropy, edge density); edge density อย่างง่ายทำนายความยากในการหาได้พอ ๆ กัน | EVIDENCE | Rosenholtz2007 | medium |
| D6 | ความชอบรูปแบบ fractal สูงสุดที่ความซับซ้อนกลาง (D ≈ 1.3–1.5) — มีความต่างระหว่างบุคคล, "universal" ถูกตั้งคำถาม | EVIDENCE (secondary) | Spehar2003 | low-medium |
| D7 | งานศิลปะและภาพธรรมชาติมีสถิติ spatial frequency คล้ายกัน (slope ≈ −2) — พื้นผิวเรียบไร้ texture ดูประดิษฐ์ | EVIDENCE | GrahamRedies2010 *(registry)* | medium |
| D8 | line drawing เส้นน้อย ๆ ก็พอให้สมองถอดรหัสประเภทฉาก | EVIDENCE | Walther2011 | high |
| D9 | gist มาก่อนรายละเอียด (30–50 ms); ฉากจำได้ที่ 32×32 | EVIDENCE | GreeneOliva2009, Torralba2009, SchynsOliva1994 | high |
| D10 | ลวดลายละเอียดเกินความสามารถ contrast sensitivity ที่ระยะดู = มองไม่เห็น/เป็น noise | EVIDENCE | CampbellRobson1968 | high (หลักการ) |
| D11 | ใบหน้า/รูปที่ simplified หรือ exaggerated ยังจำได้ (บางครั้งดีกว่า) | EVIDENCE (secondary in review) | ConwayLivingstone2007, SinhaEtAl2006 | medium |

**DERIVED synthesis:** ผู้ชมเห็นรายละเอียดคมจริง ๆ เฉพาะจุดที่มอง (D3, D4); นอกจุดนั้นรายละเอียดกลายเป็น texture/noise ที่
เพิ่ม clutter (D5) และแย่งความสนใจ. ดังนั้น "รายละเอียด" คืองบประมาณ: ใช้ให้หนักที่ focal (D1, D2), ปานกลางแบบสม่ำเสมอ
ที่อื่น (D6, D7 — ไม่ว่างเปล่าจนดูปลอม), และเรียบที่สุดใต้ข้อความ.

---
## 2. หัวข้อหลัก

### 2.1 Detail density & distribution
- **Definition:** density = ปริมาณรายละเอียด (ขอบ, texture, ชิ้นเล็ก) ต่อพื้นที่; distribution = รายละเอียดกระจายแบบไหนในภาพ.
- **Foundation:** EVIDENCE D1–D5; สัดส่วนเฉพาะ = DERIVED.
- **Practical:** 3 โซน: **focal** (≈ 10–20% พื้นที่, รายละเอียดสูงสุด), **support** (รายละเอียดกลาง, ลดลงตามระยะจาก focal), **rest/quiet** (เรียบ,
  มี texture บาง ๆ เท่านั้น). อัตราส่วน detail focal : rest ≥ 1.5–2 : 1 [DERIVED จาก D1/D2; calibrate].
- **Example (โปรโมทร้าน):** มือหยิบแว่นบนเคาน์เตอร์ — แว่น + นิ้ว = focal รายละเอียดสูง (สกรูบานพับ, ลายกระ acetate); เคาน์เตอร์ไม้ = support (ลายไม้นุ่ม); ชั้นวางด้านหลัง = rest (bokeh เป็นก้อน).
- **Correct:** gradient ของรายละเอียดจาก focal ออกไป (ไม่ใช่ขั้นบันไดกระโดด).
- **Incorrect:** "ทุกอย่างคม" (AI default); รายละเอียดสูงที่มุมภาพ (ป้าย, ใบไม้) ดึงตาออกนอกเฟรม.
- **Exceptions:** ภาพ "สำรวจ" (ฉากเมืองให้หาของ), pattern, infographic, catalogue shot ที่ต้องเห็นทุกส่วนของแว่นเท่ากัน.
- **Emotional:** รายละเอียดรอบนอกสูง = อึดอัด วุ่นวาย ตื่นเต้น; ต่ำ = สงบ โฟกัส หรู (CRAFT).
- **Technical:** `detail_ratio_focal_vs_rest` (Laplacian energy) และ `edge_density_focal_vs_rest` จาก form_check.
- **Keys:** DiPaolaRiebeEnns2010, DeCarloSantella2002, Rosenholtz2016 · EVIDENCE+DERIVED · medium.

### 2.2 Texture density
- **Definition:** ความถี่/ความหนาแน่นของ texture (ลายไม้, เกรนกระดาษ, ผ้า, hatching).
- **Foundation:** EVIDENCE: texture ต่างกัน (ทิศ, ความหนาแน่น) แยกพื้นที่ได้ทันที (Julesz1981 *(registry)*); texture หลายสเกลดูเป็นธรรมชาติ (D7); ความซับซ้อนกลางน่าชอบ (D6).
- **Practical:** ใช้ texture *ต่าง* เพื่อแยก subject จากพื้น โดยไม่ต้องเพิ่ม contrast; พื้นหลังมี texture สม่ำเสมอระดับเบา; อย่าทำพื้นเรียบสนิท (ดูพลาสติก) ยกเว้นงาน flat.
- **Example:** ชาร์โคล — เกรนกระดาษทั่วภาพ (สม่ำเสมอ, เบา) + hatching แน่นเฉพาะเงาใต้ตัวละคร.
- **Incorrect:** texture ความหนาแน่นสูงทั่วภาพ = visual noise; texture ซ้ำ (tiling) เห็นรอยต่อ.
- **Keys:** Julesz1981, GrahamRedies2010 *(registry)*, Spehar2003 · EVIDENCE · medium.

### 2.3 Visual noise / clutter
- **Definition:** รายละเอียด/ความแปรปรวนที่ไม่ส่งสาร แต่เพิ่มภาระการมอง ทำให้สิ่งใหม่ดึงความสนใจยาก.
- **Foundation:** EVIDENCE D5 (นิยามเชิงปฏิบัติของ Rosenholtz: clutter = ยากที่จะเพิ่มสิ่งที่ดึงความสนใจได้), D4.
- **Practical:** ตรวจ edge density ทั้งภาพและในกล่องข้อความ; ลดด้วย blur/flatten/ลดจำนวนวัตถุ.
- **เกณฑ์เริ่มต้น (DERIVED, calibrate):** edge density (Canny 40/120 บนภาพ 512 px) ในกล่องข้อความ HTML ≤ 0.03; ทั้งภาพ: line art ของเรา OBSERVED 0.056–0.19 → > 0.15 ให้ตรวจว่ามีเส้นฉากเกิน.
- **Incorrect:** ข้อความไทยวางบนใบไม้/ฝูงคน; ของประดับฉากมากจนตัวละครหาย.
- **Emotional:** clutter ตั้งใจ = ความวุ่นวาย (ฉากตลาด) — ตอนนั้นให้ตัวละครแยกด้วย value/texture ต่าง.
- **Keys:** Rosenholtz2007, WhitneyLevi2011 · EVIDENCE · medium.

### 2.4 Selective detail
- **Definition:** ตั้งใจเรนเดอร์บางส่วนละเอียด/คม และปล่อยส่วนอื่นหยาบ — "textural agency" ของ Rembrandt.
- **Foundation:** EVIDENCE D1, D2.
- **Practical:** เลือก 1 จุดรายละเอียดสูงสุด + 1 จุดรอง; ที่เหลือ simplified. ในภาพ product จริง: ใช้ DOF/HTML blur; ใน line art: เส้นละเอียดเฉพาะมือ/แว่น.
- **Example:** carousel "แว่นหาย" — ช่องที่ Mint พบแว่นใต้โซฟา: แว่นวาดละเอียด (บานพับ, ขอบเลนส์ 2 เส้น), โซฟาเป็นเส้นหยาบไม่กี่เส้น.
- **Incorrect:** ละเอียดจุดหนึ่งแต่ไม่ใช่จุดที่เรื่องต้องการ (เช่นรองเท้าละเอียดกว่าแว่น).
- **Keys:** DiPaolaRiebeEnns2010/2013, SantellaDeCarlo2002 · EVIDENCE · medium.

### 2.5 Simplification / visual reduction
- **Definition:** ตัดสิ่งที่ไม่จำเป็นให้เหลือโครงที่อ่านได้: รวมชิ้นเล็กเป็นมวล, ตัดเส้นใน, ลดจำนวนค่า/สี.
- **Foundation:** EVIDENCE: รูปที่ simplified ยังจำได้ (D8, D9, D11); CRAFT: "big–medium–small", squint.
- **Practical (ลำดับลด):** (1) ตัดวัตถุที่ไม่เล่าเรื่อง; (2) รวมชิ้นค่าใกล้เป็นมวล (VALUE §3.4); (3) ตัดเส้นในที่ไม่ใช่ crease/contour (EDGE §2.4); (4) ลด texture รอบนอก; (5) สุดท้ายค่อยเพิ่มรายละเอียดเฉพาะ focal.
- **Correct:** หลังลดยังผ่าน G1 (32/64 px บอกได้ว่าคืออะไร).
- **Incorrect:** ลดจน "generic" ตัวตนหาย (ตัวละครสองตัวเหมือนกัน; แว่นทุกทรงกลายเป็นวงรีเดียวกัน — **ห้ามลดรูปทรงกรอบแว่นจริง** เพราะคือสินค้า).
- **Exceptions:** catalogue/spec shot ต้องครบทุกรายละเอียดของสินค้า.
- **Emotional:** ลดมาก = เงียบ เรียบ ร่วมสมัย ใกล้ minimal; ลดน้อย = อุดม อบอุ่น nostalgic.
- **Keys:** Walther2011, SinhaEtAl2006, ConwayLivingstone2007 · EVIDENCE+CRAFT · medium-high.

### 2.6 Peripheral vision & crowding → ตำแหน่งรายละเอียดเล็ก
- **Practical:** โลโก้แบรนด์กรอบ (มุมซ้ายบนในคลิป), ลายสลักขาแว่น, ราคา — ถ้าอยู่รอบนอก ให้มี *ที่ว่างรอบตัว* และขนาดพอ; อย่าวางชิดรายละเอียดอื่น (crowding) [DERIVED จาก D4].
- **Clip:** punch-in เพื่อพารายละเอียดเล็กเข้ากลางจอ แทนการหวังว่าผู้ชมจะมองไปหาเอง [DERIVED จาก D3, D4; สอดคล้อง house rule "detail punch-ins"].

---
## 3. Detail budget procedure (ใช้ทุกภาพ)
1. ระบุ focal (1) และ secondary (≤ 1) + กล่องข้อความ HTML. [CRAFT]
2. ทำ value plan ก่อน (VALUE §4). รายละเอียดไม่ช่วยภาพที่ value ไม่อ่าน. [DERIVED จาก D9]
3. ตั้งงบ: focal = รายละเอียดเต็ม; support = กลาง; rest = texture เบาสม่ำเสมอ; กล่องข้อความ = เรียบ. [DERIVED จาก D1–D5]
4. Generate (§4) → วัด `form_check` ROI focal:
   - `detail_ratio_focal_vs_rest` ≥ 1.5 · `edge_density_focal_vs_rest` ≥ 1.5 · edge density ในกล่องข้อความ ≤ 0.03 [ทั้งหมด DERIVED; calibrate]
   - ภาพ product ที่สินค้ากินพื้นที่ > 40%: ใช้ ROI = สินค้า และคาดอัตราส่วนต่ำลงได้ (เทียบพื้นที่ต่างกัน)
5. แก้: blur/flatten รอบนอกใน HTML; crop ตัดของรก; regen เฉพาะเมื่อ focal เองขาดรายละเอียด.

## 4. Provider notes
- **FLUX schnell:** ชอบใส่รายละเอียดทุกที่ ("AI clutter") — สั่ง "simple uncluttered background, few large shapes, empty space around
  the subject"; บอก *ตำแหน่ง* ของรายละเอียด ("fine detail only on the glasses"). ขั้นตอนน้อย (schnell 4 steps) มักให้ texture หยาบเป็น noise
  ทั่วภาพ → แก้ใน HTML ด้วย blur พื้นหลังดีกว่า [DERIVED; untested].
- **Codex:** ภาพจริงของแว่นผ่าน `-i` = รายละเอียดสินค้าครบอยู่แล้ว; สิ่งที่ต้องคุมคือฉากไม่ให้แย่ง: "calm, softly blurred, uncluttered setting".
- **HTML:** `filter: blur()` เฉพาะ layer, `mask-image: radial-gradient()` ให้ blur เพิ่มตามระยะจาก focal; ลด saturation รอบนอกเล็กน้อยช่วยด้วย.
- **Line art (charcoal/pencil):** รายละเอียด = จำนวนเส้น. นับคร่าว ๆ: focal อาจมีเส้น 3–5× ต่อพื้นที่เทียบฉาก [DERIVED จาก Walther2011 (ฉากใช้เส้นน้อยได้)].

## 5. Contested / gaps
- Fractal "universal" preference: Spehar 2003 vs งานภายหลังที่พบความต่างระหว่างบุคคล — ใช้แค่ "อย่ารกสุด/ว่างสุด".
- Feature congestion vs edge density: เครื่องมือซับซ้อนกว่าไม่ได้ดีกว่าเสมอ → เราใช้ edge density (ถูก, อธิบายง่าย).
- ยังไม่มีหลักฐานเรื่องสัดส่วนพื้นที่ focal ที่เหมาะ (10–20% เป็น DERIVED/craft).

## 6. Open questions
- ทดสอบ detail ratio บนภาพที่ผู้ใช้อนุมัติ vs ปฏิเสธ (ทั้ง promo และ carousel).
- ใช้ saliency map ของ analyze_image เป็น ROI อัตโนมัติ แทนกล่องมือ — ต้องตรวจว่าตรงกับ focal ที่ตั้งใจไหม.
