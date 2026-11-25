# EDGE CONTROL — ขอบแข็ง/นุ่ม/หาย/พบ, ลำดับขอบ, น้ำหนักเส้นและคุณภาพเส้น

Batch VA1 · task `form` · modules M07, M04, M34 · 2026-11-25 · sources: `sources_form.json` + *(registry)* keys
ป้าย: **EVIDENCE / CRAFT / DERIVED / OBSERVED** (ความหมายเดียวกับ VALUE_AND_NOTAN.md)

## Scope & status
- ครอบคลุม: hard / soft / lost / found edges, lost-and-found, edge hierarchy, edge contrast, line weight, line quality,
  mark making, brushwork, junctions (T/Y/X) สำหรับ line art, กฎปฏิบัติสำหรับ FLUX / Codex / HTML / SVG rig
- รายละเอียด/texture density/clutter/selective detail → `DETAIL_HIERARCHY.md`
- ไม่ได้ทำ: งานวิจัยตรงเรื่อง "lost and found edges" ในจิตรกรรม — **ไม่พบ** ในรอบนี้; หลักฐานที่ใกล้ที่สุดคือ selective detail
  (DiPaola) และ edges → fixation (Tatler). ทุกกฎเรื่องขอบนุ่ม/หายจึงเป็น CRAFT หรือ DERIVED
- ไม่ซ้ำของเดิม: `DRAWING_TECHNIQUES.md` §6 มีย่อหน้าเดียว; `ART_FUNDAMENTALS.md` §1 มีกฎ line weight หนาด้านเงา (craft) —
  ไฟล์นี้เพิ่มหลักฐาน, ลำดับขอบ, เกณฑ์วัด, junctions และสเปกเส้นสำหรับงานเรา

---
## 1. หลักฐาน (แยกจาก craft)

| # | ข้อค้นพบ | ป้าย | keys | confidence |
|---|---|---|---|---|
| E1 | ขอบ (edge content) ทำนายจุดที่สายตาหยุดได้ดีกว่าสี | EVIDENCE (secondary) | TatlerBaddeleyGilchrist2005 | medium |
| E2 | เส้นในภาพวาดแทน "ความไม่ต่อเนื่องของความลึก/ความเอียง" (occluding contour, crease); ศิลปิน *ไม่วาดขอบเงา* เพราะจะอ่านเป็นขอบวัตถุปลอม | EVIDENCE (review) | SayimCavanagh2011, Cavanagh2005 *(registry)* | high |
| E3 | ศิลปินหลายคนวาดเส้นตรงกัน 75% (ภายใน 1 mm) โดยเฉพาะ occluding contour; เส้นที่เหลือส่วนมากอยู่ที่ gradient ความสว่างแรง; 14% อธิบายไม่ได้ | EVIDENCE | Cole2008 | high |
| E4 | junction: T = การบัง, Y = มุมนูน, X = ความโปร่งใส; เส้นจบเองได้ตรงที่ผิวโค้งหนีสายตา | EVIDENCE (review) | SayimCavanagh2011, Cavanagh2005 *(registry)* | high |
| E5 | ความหนาเส้นที่ดูเป็นธรรมชาติ ≈ ระยะถึง isophote: หนาเมื่อใกล้/ฟอร์มใหญ่/โค้งน้อย, บางเมื่อไกล/เล็ก/โค้งมาก; หนาด้านล่างเมื่อแสงจากบน | EVIDENCE (graphics method, visual validation) | GoodwinVollickHertzmann2007 | medium |
| E6 | silhouette หนากว่าเส้นใน; เส้นปลายอิสระเรียว แต่ไม่เรียวตรงที่ลอดใต้วัตถุอื่น; ศิลปินบีบช่วงความหนาและสนใจความต่างสัมพัทธ์ | CRAFT-expert (สังเกต ไม่ใช่ทดลอง) | Hertzmann2021_LineThickness | medium |
| E7 | ระบบสายตาตีความ line drawing เหมือนภาพจริงโดยประมาณ (realism hypothesis) | EVIDENCE (theory) | Hertzmann2020 | low-medium |
| E8 | line drawing ธรรมดาพอให้สมองถอดรหัสประเภทฉากได้เท่าภาพถ่าย | EVIDENCE | Walther2011 | high |
| E9 | contrast sensitivity เป็น band-pass — ลวดลายละเอียดมาก ๆ ที่ระยะดูจริงแทบมองไม่เห็น | EVIDENCE | CampbellRobson1968 | high (หลักการ) |
| E10 | contrast ที่จุด fixation สูงขึ้น แต่ปรับ contrast แล้วไม่เปลี่ยนจุดมอง (ไม่ใช่เหตุ) | EVIDENCE (contested) | EinhauserKonig2003 | medium |
| E11 | Rembrandt-style: รายละเอียด/ความคมเฉพาะจุดดึงสายตาเร็วและนานกว่า | EVIDENCE | DiPaolaRiebeEnns2010/2013 | medium |

**DERIVED synthesis:** ขอบที่ "พบ" (found = คม + contrast สูง) คือแม่เหล็กสายตาระดับต่ำ (E1, E11) แต่ต้องอยู่บนสิ่งที่มีความหมาย (E10).
ขอบที่ "หาย" ช่วยรวมมวล (VALUE §3.4) และลดคู่แข่ง. สำหรับ line art: วาด contour + crease, ห้ามวาดขอบเงา (E2, E3).

---
## 2. หัวข้อหลัก

### 2.1 Hard / firm / soft / lost edge (ประเภทขอบ)
| type | definition | foundation | ใช้ที่ | ห้าม |
|---|---|---|---|---|
| hard (found) | เปลี่ยนค่า/สีทันที ใน ≤ 1–2 px (ที่ 1080 px) | CRAFT; ฐาน E1 | focal 1 ที่, plane ที่หันหนีแสงชัด, ขอบวัตถุแข็ง (กรอบโลหะ) | ทุกที่ (ภาพแข็งเหมือนสติกเกอร์) |
| firm | คมแต่มี anti-alias/ไล่ 2–5 px | CRAFT | silhouette รอง, ขอบวัตถุในแสง | — |
| soft | ไล่ค่า 6–30 px | CRAFT; ฟิสิกส์ (ผิวโค้ง, penumbra, DOF) | ผิวโค้งหมุนหนีแสง, ผม, ผ้า, ขอบเงาตก (cast shadow) ไกลจากจุดสัมผัส, ระยะไกล | ขอบ focal |
| lost | ค่าทั้งสองฝั่งเท่ากันจนขอบหายไป ผู้ชมเติมเอง | CRAFT (Proko_Edges); Gestalt closure (Wagemans2012 *(registry)*) | ด้านเงาที่ชนพื้นมืด, ด้านแสงที่ชนพื้นสว่าง, ส่วนที่ไม่สำคัญ | ส่วนที่บอกตัวตน (มือที่ถือแว่น, ตัวแว่น) |
ความกว้าง px เป็น DERIVED สำหรับภาพ 1080 px — ปรับตามขนาด.

### 2.2 Lost-and-found (เส้นขอบที่หายแล้วกลับมา)
- **Definition:** ขอบเส้นเดียวกันสลับคม–หาย ตามค่าที่อยู่ติดกัน — เกิดตามธรรมชาติเมื่อวัตถุซ้อนพื้นหลังที่มีค่าเปลี่ยนไป.
- **Foundation:** CRAFT (ครูจิตรกรรม/วอเตอร์คัลเลอร์); การที่ผู้ชมเติมขอบที่หายได้ = closure (EVIDENCE ระดับ Gestalt) → DERIVED.
- **Practical:** ให้ขอบ "พบ" ตรงที่อยากให้มอง (ใบหน้า/แว่น) และ "หาย" ตรงที่ร่างกลืนเงา. ในชาร์โคล: ยกดินสอ (เส้นขาด) ด้านแสง.
- **Example (งานเรา):** Tao ยืนหน้าหน้าต่างตอนเย็น — ไหล่ด้านหน้าต่างหายเข้าแสง (lost), แขนที่ยื่นแว่นให้ Mint ตัดกับผนังมืด (found).
- **Correct:** ขอบที่หายไม่ทำให้ silhouette สำคัญหาย (ตรวจด้วย silhouette test).
- **Incorrect:** "หาย" แบบสุ่มจากโมเดล (เส้นขาดตรงข้อมือ/นิ้ว) → อ่านเป็นภาพเสีย ไม่ใช่สไตล์.
- **Exceptions:** flat vector / logo / cel style: เส้นต่อเนื่องสม่ำเสมอโดยตั้งใจ.
- **Emotional:** ขอบหายเยอะ = ฝัน นุ่ม ความทรงจำ ลึกลับ; ขอบพบเยอะ = ชัด จริงจัง ตึง.
- **Technical:** ตรวจ gradient magnitude ตามแนว silhouette mask: สัดส่วนจุดที่ |∇L| ต่ำกว่า 0.02 = "lost fraction"; focal ควร lost < 10% [DERIVED; untested].
- **Keys:** Proko_Edges (D), SayimCavanagh2011 (closure/prototype completion) · CRAFT+DERIVED · medium.

### 2.3 Edge hierarchy & edge contrast
- **Definition:** ลำดับความคมและ contrast ของขอบทั้งภาพ: คมสุด+contrast สูงสุด 1 จุด → firm รอง → soft → lost.
- **Foundation:** EVIDENCE ว่าขอบ/รายละเอียดดึงสายตา (E1, E11); "หนึ่งจุดคมที่สุด" = CRAFT.
- **Practical (ladder 4 ขั้น):** L1 hard+max contrast (focal, ≤ 5% ของความยาวขอบทั้งหมด) · L2 firm (silhouette หลัก) · L3 soft (ฟอร์มหมุน, รอบนอก) · L4 lost (เงารวมมวล).
- **Edge contrast:** ขอบที่ ΔL ต่ำแต่คม ดึงสายตาน้อยกว่าขอบ ΔL สูงที่นุ่มหรือไม่ — ยังไม่มีหลักฐานชัด; ปฏิบัติ: ให้ L1 มีทั้งคมและ ΔL สูง [DERIVED].
- **Example:** แว่นโลหะทองบนพื้นผ้าลินินครีม: ขอบเลนส์ด้านแสงคม + highlight (L1); ขาแว่นที่ไกลออกไป soft (L3); เงาตกด้านปลาย lost (L4).
- **Incorrect:** พื้นหลังคมกว่า subject (FLUX บางครั้งให้ texture พื้นคมจัด); cutout ติดลงบนพื้นเบลอแต่ขอบ cutout คม 0 px ทุกด้าน (ดู "sticker look").
- **Technical:** `edge_density_focal_vs_rest` ≥ 1.5 และ `detail_ratio_focal_vs_rest` ≥ 1.5 (form_check) [DERIVED จาก E11; calibrate].
- **Keys:** TatlerBaddeleyGilchrist2005, DiPaolaRiebeEnns2010, EinhauserKonig2003 · EVIDENCE+CRAFT · medium.

### 2.4 Line weight (น้ำหนักเส้น) — สำคัญกับ pencil/charcoal และ SVG rig
- **Definition:** ความหนาของเส้นและการเปลี่ยนความหนาตามเส้น.
- **Foundation:** E5 (graphics method), E6 (expert observation), ART_FUNDAMENTALS §1 (craft) — ทิศทางตรงกัน.
- **กฎ (เรียงตามความหนักแน่น):**
  1. silhouette > เส้นใน (crease/fold) > texture/hatching [E6; CRAFT].
  2. ใกล้ = หนา, ไกล = บาง (ช่วยความลึก) [E5].
  3. ฟอร์มใหญ่/หนา (ลำตัว, ขา) หนากว่าฟอร์มเล็ก (นิ้ว, ขาแว่น) [E5, E6].
  4. ด้านเงา/ใต้ฟอร์ม หนากว่าด้านแสง (แสงซ้ายบน → หนาที่ขวาล่าง) [E5, E6; P5 ใน VALUE].
  5. เส้นเรียวที่ปลายอิสระ; ไม่เรียวตรงที่ลอดใต้อีกวัตถุ (T-junction ต้องชนสนิท) [E4, E6].
  6. บางลงตรงโค้งแรง (มุมแก้ม, ขอบเลนส์ทรงกลมที่โค้งเร็ว) [E5].
- **อัตราส่วนเริ่มต้นที่ 1080 px (DERIVED จาก E6 "artists compress the range"; untested):** silhouette 3–5 px · เส้นใน 1.5–2.5 px · texture 0.75–1.2 px;
  silhouette : เส้นใน ≈ 1.5–2 : 1; max : min ทั้งภาพ ≤ 4 : 1.
- **OBSERVED (rig.js):** ลำตัว stroke 5 vs ชิ้นใน 4 → อัตราส่วน 1.25 : 1 (เบากว่าแนะนำ) — ถ้าตัวละครดู "แบน" ลองเพิ่ม silhouette เป็น 6–7 หรือลดเส้นในเป็น 3.
- **Correct example:** Mint นั่งกอดเข่า — เส้นหลังและใต้ขา (ด้านเงา) หนา, เส้นผมด้านแสงขาดเป็นช่วง, รอยพับแขนเสื้อบาง.
- **Incorrect:** "wire outline" ความหนาเท่ากันทุกเส้น (colouring-book); เส้นในหนาเท่า silhouette → รูปแตกเป็นชิ้น.
- **Exceptions:** flat/vector icon, logo, ligne claire (Hergé) — สม่ำเสมอโดยตั้งใจ; ตอนนั้นใช้ *value และสี* แยกชั้นแทน.
- **Emotional:** เส้นหนามน = เป็นมิตร เด็ก; เส้นบางคม = ละเอียด เปราะ หรู; เส้นหนักสั่น = กังวล โกรธ.
- **Technical:** วัดได้ด้วย distance transform บน skeleton ของเส้น (ink mask) → ความหนาเฉลี่ยในแถบ silhouette vs ภายใน [DERIVED; ยังไม่เขียนเป็นเครื่องมือ].
- **Keys:** GoodwinVollickHertzmann2007, Hertzmann2021_LineThickness, SayimCavanagh2011 · EVIDENCE(graphics)+CRAFT · medium.

### 2.5 Line quality & mark making
- **Definition:** line quality = ลักษณะของเส้น (ความมั่นใจ, ความเร็ว, ความเรียว, ความต่อเนื่อง, ความหยาบ); mark making = รูปแบบรอยของเครื่องมือ (ชาร์โคลด้านข้าง, hatching, scumble, stipple, smudge, eraser lift).
- **Foundation:** CRAFT เกือบทั้งหมด; texture boundary จาก stroke direction/density แยกพื้นที่ได้ preattentive (Julesz1981 *(registry)*) — EVIDENCE สำหรับ "ทิศ hatching ต่างกัน = แยกชั้นได้".
- **Practical:** (1) เส้นเดียวมั่นใจ > หลายเส้นขีดซ้ำ (hairy line) สำหรับ contour หลัก; (2) hatching ตามทิศของฟอร์ม (cross-contour) หรือทิศเดียวทั้งภาพเป็นสไตล์; (3) เปลี่ยนทิศ/ความหนาแน่น hatching เพื่อแยกตัวละครจากฉากโดยไม่ต้องเพิ่มเส้นขอบ [EVIDENCE Julesz → DERIVED].
- **Example:** ชาร์โคล Slowly Growing — ตัวละคร: เส้นต่อเนื่อง + smudge นุ่ม; ฉาก: hatching ทิศเฉียงเดียว จาง → ตัวละครแยกออกเองด้วย texture.
- **Incorrect:** AI "sketchy" ที่เส้นซ้อนสุ่มทุกขอบ (ไม่มี hierarchy); hatching ทิศสุ่มทุกพื้นที่ (เป็น noise).
- **Emotional:** เส้นเร็ว/หัก = พลัง ตื่นเต้น; เส้นช้า/นุ่ม = สงบ อบอุ่น; รอยลบ/ขาวยก = แสง ความหวัง (CRAFT).
- **Keys:** Julesz1981 *(registry)*, Cole2008 (เส้นที่ "ควร" มี) · CRAFT+EVIDENCE · medium-low.

### 2.6 Brushwork (ภาพวาด/FLUX painterly)
- **Definition:** ขนาด ทิศ และความหนาของฝีแปรง; ใช้เป็นตัวควบคุมรายละเอียดและขอบ.
- **Foundation:** EVIDENCE เชิงคำนวณ: painterly rendering ที่ใช้ฝีแปรงเล็กเฉพาะจุดที่คนมอง (eye-tracking) และฝีใหญ่ที่อื่น (SantellaDeCarlo2002, DeCarloSantella2002); Rembrandt (DiPaola) — selective.
- **Practical:** ฝีเล็ก/คมที่ focal, ฝีใหญ่/ทิศเดียวรอบนอก. Prompt: "loose large brushstrokes in the background, tight detailed rendering on the glasses".
- **Incorrect:** ขนาดฝีเท่ากันทั้งภาพ (filter look).
- **Keys:** SantellaDeCarlo2002, DeCarloSantella2002, DiPaolaRiebeEnns2010 · EVIDENCE+CRAFT · medium.

### 2.7 Junctions สำหรับ line art (เฉพาะเรา)
- **T-junction** (การบัง): เส้นหลังต้องชนเส้นหน้าแล้วหยุดสนิท ไม่ทะลุ ไม่เว้นช่อง → ตำแหน่งหน้า-หลังชัด [EVIDENCE E4].
- **X-junction** (โปร่งใส) — **แว่น/เลนส์:** เส้นพื้นหลัง (ขอบโต๊ะ, กรอบหน้าต่าง) ต้อง *วิ่งต่อผ่านเลนส์* (เปลี่ยนค่าเล็กน้อย) — นี่คือสิ่งที่ทำให้เลนส์อ่านว่า "มีกระจก" [EVIDENCE: SayimCavanagh2011, Cavanagh2005 *(registry)*]. ตรงกับกฎ house rule "cutout glasses in clips get a lens layer".
- **Y-junction** (มุมนูน): ใช้กับกล่องแว่น/โต๊ะ.
- **เส้นจบกลางฟอร์ม:** ตรงที่ผิวโค้งหนี (แก้ม, หัวไหล่) ให้เส้นจบเรียว ไม่ต้องปิด [E4].
- **Tangent (ขอบแตะกันพอดี):** ขอบสองวัตถุแตะกันพอดี → อ่าน T/X ไม่ออก; ให้ซ้อนชัดหรือเว้นชัด [CRAFT; DERIVED จาก E4].

---
## 3. กฎปฏิบัติ: ให้ focal คมที่สุด รอบนอกเรียบ (FLUX / Codex / HTML / rig)
1. **ตัดสินก่อน generate:** เขียนว่า L1 edge อยู่ตรงไหน (เช่น "ขอบบนของกรอบแว่นด้านซ้าย"). [CRAFT]
2. **FLUX prompt:** ระบุความคมเป็นคำ: "the glasses in razor-sharp focus, crisp edges and fine detail; the background softly out of focus,
   simplified, large calm shapes" + เลนส์ "85mm, shallow depth of field" สำหรับภาพถ่าย; สำหรับ line art: "bold confident outline on the
   figures, thin faint lines in the background, no outlines on shadows". ไม่ใช้คำว่า "highly detailed" ลอย ๆ (FLUX ให้รายละเอียดทุกที่) [DERIVED; untested].
3. **Codex `-i` (ภาพแว่นจริง):** สั่ง "keep the attached frame's edges sharp and unchanged; render the scene behind it softer" — และตรวจว่าโมเดลไม่ทำให้ขอบกรอบเพี้ยน.
4. **HTML compositing (ทางที่ควบคุมได้แน่นอนที่สุด):** แยก layer: พื้นหลัง `filter: blur(1–3px)` (ที่ 1080 px) หรือ mask-blur เฉพาะรอบนอก,
   cutout แว่นคมเต็ม; ใส่ edge feather 0.5–1 px บน cutout + contact shadow เพื่อไม่ให้ดู "ตัดแปะ"; ถ้าพื้นหลังเบลอ cutout ต้องมีขอบ
   firm ไม่ใช่ hard 0 px [DERIVED].
5. **Clip (HyperFrames):** punch-in ไปที่รายละเอียด = ย้าย L1 ไปตามจุดที่ต้องการให้ดู; ระหว่าง motion ยอมให้ขอบนุ่ม (motion blur) แล้วคมตอนหยุด.
6. **SVG rig / line art:** ตั้ง stroke ตามตาราง §2.4; เส้นฉากใช้สีอ่อนกว่า INK (ลด contrast ไม่ใช่แค่ลดความหนา).
7. **ตรวจ:** `form_check` ROI = focal → `edge_density_focal_vs_rest` ≥ 1.5, `detail_ratio_focal_vs_rest` ≥ 1.5 [DERIVED]; ดูด้วยตาที่ 100% ว่า L1 อยู่ที่เดียว.

## 4. Contested / gaps
- ไม่พบงานวิจัยที่ทดสอบ "lost and found edges" ตรง ๆ — ใช้ selective detail (DiPaola) แทนได้บางส่วน.
- edge → gaze: Tatler (edges ทำนายดี) vs Einhäuser & König (contrast ไม่ใช่เหตุ) — ไม่ขัดกันทีเดียว (edges ≠ contrast รวม) แต่ต้องระวัง.
- กฎ line weight มาจาก graphics + การสังเกต ไม่มี perception experiment ว่าเพิ่มการอ่านรูปทรงจริง (Hertzmann เสนอ gauge task แต่ยังไม่ทำ).

## 5. Open questions
- ทดสอบ A/B: Mint & Tao stroke ratio 1.25 vs 2.0 — ผู้ชมอ่านท่าทางเร็วขึ้นไหม?
- เขียนเครื่องมือวัด line weight (distance transform บน ink mask) ถ้าต้องตรวจ carousel เป็นชุด.
