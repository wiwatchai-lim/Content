# VALUE & NOTAN — ค่าน้ำหนักแสงเงา (value), notan, key, การจัดมวลแสง-เงา

Batch VA1 · task `form` · modules M07 (art fundamentals), M04/M05 (perception evidence) · 2026-11-25
Sources: `sources_form.json` (this task) + keys ที่มีอยู่แล้วใน `SOURCE_REGISTRY.json` (เขียนว่า *(registry)*)

**ป้ายกำกับทุกกฎ:** **EVIDENCE** = งานวิจัย peer-reviewed / มาตรฐาน / ฟิสิกส์ · **CRAFT** = ธรรมเนียมช่าง (tier D) ·
**DERIVED** = เราอนุมานเองจากหลักฐาน (บอกว่าจากอะไร) · **OBSERVED** = ตัวเลขที่เราวัดจากภาพของร้านเอง (ยังไม่ใช่เกณฑ์คุณภาพ)

## Scope & status
- ครอบคลุม: value scale (Munsell value, CIE L*, OKLab L), notan, high/middle/low key, 3-value และ 5-value design,
  value grouping, shadow mass vs light mass, contrast hierarchy, tonal compression / dynamic range (Zone System, HDR tone
  mapping พื้นฐาน), chiaroscuro, silhouette readability, greyscale + thumbnail analysis; ขั้นตอน "ออกแบบ value ก่อนสี"
  และ greyscale check ที่มีตัวเลข
- ไม่ได้ทำ: ทดลองกับผู้ชมจริง; อ่าน Livingstone *Vision and Art* ฉบับเต็ม (ยังเป็น bibliographic ผ่าน Dupree2003 *(registry)*);
  ตัวเลขเกณฑ์ทั้งหมดเป็น DERIVED ต้อง calibrate กับภาพที่ผู้ใช้อนุมัติ
- ไม่ซ้ำของเดิม: `ART_FUNDAMENTALS.md` §3 และ R1 §F พูดถึง notan 2–4 ค่า และ "greyscale check" แบบไม่มีตัวเลข —
  ไฟล์นี้เติม scale, key, 3/5-value, grouping, compression, และเกณฑ์วัดได้

---
## 1. หลักฐานด้าน perception (แยกจาก craft)

| # | ข้อค้นพบ | ป้าย | keys | confidence |
|---|---|---|---|---|
| P1 | รูปทรง 3 มิติและความลึกถูกประมวลผลผ่าน luminance เป็นหลัก; สีที่ luminance เท่ากัน (equiluminant) ทำให้ภาพแบนและขอบสั่น | EVIDENCE (science journalism สรุปหนังสือ) | Dupree2003, Livingstone2002 *(registry)* | medium |
| P2 | สายตาไปหยุดที่จุด local contrast สูง; ดวงตาดึงสายตาส่วนหนึ่งเพราะ contrast สูง | EVIDENCE | ConwayLivingstone2007; Itti1998, Parkhurst2002 *(registry)* | medium-high |
| P3 | **แต่** เมื่อปรับ contrast ในภาพธรรมชาติ ไม่พบว่า luminance contrast *เป็นสาเหตุ* ให้สายตาไปที่นั่น — saliency อาจถูกคำนวณช้า (ระดับความหมาย) | EVIDENCE (ขัดกับ P2) | EinhauserKonig2003 | medium |
| P4 | เงาต้องมืดกว่ารอบข้างและ "หม่นกว่า" (desaturated) จึงอ่านเป็นเงา; สีของเงาเป็นอะไรก็ได้ถ้าเงื่อนไขนี้ครบ; การมองสีช่วยแยกเงาออกจากการเปลี่ยนแปลงความสว่างแบบอื่น | EVIDENCE | Kingdom2004, ConwayLivingstone2007 | medium-high |
| P5 | ระบบสายตาสมมติว่าแสงมาจากด้านบน (อาจเอียงซ้ายบน ~20–30° แต่บางงานไม่พบ) — กำหนดว่าก้อนนูน/บุ๋มอ่านแบบไหน | EVIDENCE (left-bias contested) | MamassianGoutcher2001 | high (above) / low (left) |
| P6 | "gist" ของภาพมาจากโครงหยาบ (low spatial frequency, global layout) ก่อนรายละเอียด: ใน 30 ms ผู้ชมใช้ส่วน low-frequency ของ hybrid image; global property อ่านได้ที่ ~34 ms, ชื่อฉาก ~50 ms | EVIDENCE | SchynsOliva1994, OlivaTorralba2006, GreeneOliva2009 | high |
| P7 | การจำแนกฉากยังแม่นที่ 32×32 พิกเซล; ใบหน้าที่คุ้นเคยจำได้ที่ความละเอียดต่ำมาก | EVIDENCE | Torralba2009, SinhaEtAl2006 | high (ฉาก) |
| P8 | ภาพวาดไม่สามารถทำ dynamic range เท่าธรรมชาติ; ศิลปินบีบ luminance แบบ non-linear (ประมาณ log) และแต่ละคนมี "curve" ของตัวเอง | EVIDENCE (proceedings) | GrahamField2008 | medium |
| P9 | ศิลปินไม่ได้ "เห็น" ค่าน้ำหนักจริงแม่นกว่าคนทั่วไป — โดน lightness constancy เหมือนกัน | EVIDENCE (mixed) | PerdreauCavanagh2013 | medium |
| P10 | รายละเอียดที่ low spatial frequency (เช่นรอยยิ้มโมนาลิซา) เห็นชัดใน peripheral vision แต่หายเมื่อจ้องตรง | EVIDENCE (secondary only) | Livingstone2000 | low-medium |

**ข้อสรุปสำหรับเรา (DERIVED จาก P1, P6, P7, P9):** โครง value ขนาดใหญ่คือสิ่งที่คนเลื่อนฟีดได้เห็น *ก่อน* — ต้องออกแบบ
และ *วัด* ในขนาดเล็ก/greyscale เพราะตาเราเองหลอกได้ (P9). **P2 vs P3:** contrast เป็นตัวช่วยที่ดี แต่ไม่พอ — ต้องให้จุด
contrast สูงสุดตรงกับสิ่งที่มีความหมาย (แว่น, หน้า/ท่าตัวละคร) และมีรายละเอียดมากที่สุดด้วย (ดู DETAIL_HIERARCHY.md).

---
## 2. Value scale — มาตรวัดที่ใช้พูดกัน

**Definition:** value/lightness = ความสว่างที่รับรู้ ไม่ขึ้นกับ hue. **Munsell value** 0 (ดำ) – 10 (ขาว) ขั้นเท่ากันทางการรับรู้,
N5 = เทากลาง; สีจริงเข้าใกล้ N0/N10 เท่านั้น [EVIDENCE/standard: Munsell_Value]. **CIE L\*** 0–100 จากรากที่สามของ
relative luminance (มีช่วงเชิงเส้นใกล้ดำ) [EVIDENCE/standard: ISO_CIE_11664_4]. `analyze_image.py` ใช้ **OKLab L** (0–1)
[Ottosson2020 *(registry)*]; สำหรับสีเทา OKLab L = ∛Y และ L\* = 116·L − 16 → แปลงได้ตรง ๆ.

| Munsell (≈) | L\* | OKLab L (เทา) | ชื่อเรียกในบรีฟ | ใช้กับงานเรา |
|---|---|---|---|---|
| N1 | 10 | 0.22 | black accent | เส้นชาร์โคลเข้มสุด, กรอบแว่นดำ |
| N2–3 | 20–30 | 0.31–0.40 | dark | มวลเงา, ฉากกลางคืน |
| N4 | 40 | 0.48 | low-mid | เงาบนผิวสว่าง |
| N5 | 50 | 0.57 | middle grey | พื้นหลังกลาง (studio grey) |
| N6–7 | 60–70 | 0.66–0.74 | high-mid | halftone, กระดาษในเงา |
| N8 | 80 | 0.83 | light | ผิวด้านสว่าง |
| N9–9.5 | 90–95 | 0.91–0.96 | white / paper | กระดาษ, พื้น high-key |

ความสัมพันธ์ Munsell ≈ L\*/10 เป็นค่าประมาณ (Hunter Lab ใช้ ~10× Munsell value) — DERIVED, พอใช้สื่อสาร ไม่ใช่สูตรแม่น.
เกณฑ์ notan ในเครื่องมือ: dark < 0.40 (≈ L\* 30), mid 0.40–0.70, light ≥ 0.70 (≈ L\* 65); key: mean L > 0.72 high, < 0.38 low.

---
## 3. หัวข้อหลัก (ฟิลด์ครบตามบรีฟ)

### 3.1 Notan (โนตัง)
- **Definition:** การจัดภาพเป็นมวลสว่าง–มืด ล้วน ๆ (ไม่มีสี texture รายละเอียด) — คำจาก Fenollosa/Dow.
- **Foundation:** CRAFT (Dow, *Composition* 1899 tradition: PublicDomainReview-Dow *(registry)*); เหตุผลที่ได้ผลมีฐาน EVIDENCE P1+P6 (DERIVED).
- **Practical:** ร่าง 2 ค่า (ขาว/ดำ) หรือ 3 ค่าก่อนทำอะไรอื่น; ถ้า 2 ค่าแล้วเรื่องไม่อ่าน สีจะไม่ช่วย.
- **Visual example (งานเรา):** Mint & Tao นั่งบนม้านั่ง — notan 2 ค่า: สองร่างรวมเป็นมวลดำเดียวกับม้านั่ง บนกระดาษขาว; ช่องว่างระหว่างไหล่สองคน (negative shape) บอกความสัมพันธ์.
- **Correct:** มวลน้อยชิ้น, ขอบมวลบอกเรื่อง, counterchange (มืดบนสว่าง แล้วสลับเป็นสว่างบนมืด) ที่จุดสำคัญ.
- **Incorrect:** จุดมืดเล็ก ๆ กระจายทั่วภาพ ("spotty"); ทำ notan แล้วไม่ใช้.
- **Exceptions:** ภาพ pattern/texture ทั้งภาพ, ภาพหมอกที่ตั้งใจไม่มีมวลชัด.
- **Emotional use:** มวลมืดใหญ่ = หนัก/เศร้า/ลึกลับ; มวลขาวใหญ่ = โล่ง/สงบ/โดดเดี่ยว (CRAFT).
- **Technical:** `analyze_image.py --overlay` มี notan inset 3 ค่า; `form_check` (§6) วัด % แต่ละกลุ่ม.
- **Common mistakes:** ใช้ notan เป็นแค่ "ตรวจท้าย" ไม่ได้ใช้ออกแบบ; ลืมว่าข้อความ HTML ก็เป็นมวลหนึ่ง.
- **Keys / tier / confidence:** PublicDomainReview-Dow, Gurney2019_ValueGrouping (D); P1/P6 (A) · CRAFT+DERIVED · medium.

### 3.2 Key — high / middle / low
- **Definition:** ตำแหน่งที่ค่าส่วนใหญ่ของภาพอยู่บน scale: high key = ส่วนใหญ่ N7–N9.5; middle key = กระจายรอบ N4–N6; low key = ส่วนใหญ่ N1–N3.
- **Foundation:** CRAFT/photography (Zone System: Reinhard2002 อธิบาย 11 zones, "key value"); เกณฑ์ตัวเลขในเครื่องมือ = DERIVED.
- **Practical:** เลือก key จากอารมณ์และแบรนด์ *ก่อน* prompt; key ไม่ใช่ exposure ผิด — ภาพ high key ที่ดียังมี accent มืดเล็ก ๆ.
- **Example:** การ์ตูนชาร์โคล Slowly Growing = high key (OBSERVED: mean L 0.79–0.94 ในภาพ raw 20 ภาพ จาก 2 kits); promo กลางคืน "ร้านแว่นตีสอง" = low key มีแสงไฟร้านเป็น accent.
- **Correct:** high key + 1 จุดมืด = focal; low key + 1 pool แสง = focal.
- **Incorrect:** "low key" ที่จริงคือภาพมืดทั้งภาพไม่มีจุดสว่างชัด (มัว); high key ที่ไม่มีดำเลย (ซีด).
- **Exceptions:** ภาพ mood หมอก/หิมะที่ตั้งใจไม่มี accent.
- **Emotional:** high key = เบา สดใส สะอาด ความหวัง; low key = ดราม่า ลึกลับ ใกล้ชิด กลางคืน; middle key = ธรรมดา สารคดี (CRAFT).
- **Technical:** analyze_image `value.key`; ตรวจ `L_p2_p98` ด้วย — high key ที่ดีควรมี p2 ≤ 0.45 (มี accent มืดจริง) [DERIVED].
- **Mistakes:** เชื่อว่า FLUX จะทำ low key เอง — โมเดลชอบเปิดเงาสว่าง (ART_FUNDAMENTALS §3); ต้องสั่ง "deep shadows, single light pool".
- **Keys:** Reinhard2002, LIGHTING_LIBRARY `high_key`/`low_key` (ไม่ซ้ำ) · CRAFT · medium.

### 3.3 3-value และ 5-value design
- **Definition:** 3-value = light / mid / dark (มวลใหญ่ 3 กลุ่ม). 5-value = เพิ่ม highlight/white accent และ darkest accent (เช่น N9 / N7 / N5 / N3 / N1).
- **Foundation:** CRAFT (ครูจิตรกรรม; Proko "Designing Value Groups"); เหตุผลเชิง perception — มวลน้อยอ่านเร็วที่ขนาดเล็ก (P6, P7) — DERIVED.
- **Practical:** ออกแบบ 3 มวลก่อน แล้วใช้ค่าสุดขั้ว (N1, N9) *เฉพาะ* ที่ focal = 5-value. ค่ากลางเป็น "พื้น" ไม่ใช่ตัวแสดง.
- **Example:** แว่น acetate ดำบนโต๊ะไม้: light = ผนัง (N8), mid = โต๊ะ (N5), dark = แว่น (N2); accent N9.5 = specular บนขอบเลนส์, N0.5 = รอยต่อบานพับ.
- **Correct:** สัดส่วนไม่เท่ากัน (เช่น 60/30/10) — ค่าหนึ่งครอง.
- **Incorrect:** 3 กลุ่มเท่ากัน 33/33/33 → ไม่มีอะไรครอง; ใช้ N1 และ N9 กระจายทั่วภาพ → accent ไม่เหลือความหมาย.
- **Exceptions:** cel/flat (2 ค่าต่อวัตถุ) ตั้งใจลดค่า; ภาพสารคดี middle key อาจกว้าง.
- **Emotional:** ยิ่งน้อยค่ายิ่งกราฟิก/หนักแน่น; ยิ่งหลายค่ายิ่งนุ่ม/สมจริง.
- **Technical:** `form_check`: `dominant_group_pct`, `two_largest_pct`.
- **Mistakes:** สับสน "จำนวน value ในภาพ" กับ "จำนวนกลุ่ม" — ภาพมีค่าได้มากมาย แต่ต้อง *อ่าน* เป็น 3 กลุ่ม.
- **Keys:** Proko_Edges (value groups course, D), Gurney2019_ValueGrouping (D), Munsell_Value · CRAFT · medium.

### 3.4 Value grouping (shape welding)
- **Definition:** เชื่อมพื้นที่ค่าใกล้เคียงที่อยู่ติดกันเป็นมวลเดียว แม้เป็นวัตถุต่างชิ้น.
- **Foundation:** CRAFT (Gurney2019_ValueGrouping: "connect darks into one unbroken mass… reserve high contrast for what should be noticed"); สอดคล้อง Gestalt similarity/proximity (Wagemans2012 *(registry)*) — DERIVED.
- **Practical:** ผมของ Tao + เงาบนผนัง + เก้าอี้ด้านเงา = มวลดำเดียว; ขอบระหว่างกันถูก "lost".
- **Correct:** ขอบมวลที่ *เหลืออยู่* คือขอบที่เล่าเรื่อง (silhouette ของตัวละคร).
- **Incorrect:** มวลรวมจนกลืน silhouette ที่สำคัญ (ข้อกังวลที่ผู้อ่าน Gurney ถามแล้วไม่มีคำตอบ — ต้องเว้นช่อง/rim).
- **Exceptions:** ภาพข้อมูล/infographic ที่ต้องแยกทุกชิ้น.
- **Emotional:** มวลเชื่อม = สงบ รวมกัน; แตกเป็นชิ้น = วุ่นวาย ตื่นเต้น.
- **Technical:** นับจำนวน connected components ของ notan dark mask ที่ใหญ่ > 0.5% ของภาพ — น้อย = grouped [DERIVED; ยังไม่ทดสอบ].
- **Keys:** Gurney2019_ValueGrouping · CRAFT · medium.

### 3.5 Shadow mass vs light mass (light family / shadow family)
- **Definition:** ทุกพื้นผิวแบ่งเป็นครอบครัวแสง (lit) และครอบครัวเงา (core + cast shadow + reflected light); ค่าใดในเงาต้องมืดกว่าค่าใดในแสง.
- **Foundation:** EVIDENCE บางส่วน (เงาต้องมืดกว่าและหม่นกว่า: Kingdom2004, ConwayLivingstone2007; เงาต้องโปร่ง: Cavanagh2005 *(registry)*); กฎ "reflected light ไม่สว่างกว่าแสง" = CRAFT + ฟิสิกส์ (แสงสะท้อนอ่อนกว่าแสงตรง).
- **Practical:** วางเส้นแบ่ง (terminator) ให้ชัดก่อน; อย่าให้ reflected light สว่างจนเงาแตก.
- **Example:** แว่นโลหะบนผ้า: เงาตกใต้แว่นมืดสุดที่จุดสัมผัส (contact shadow), ค่อย ๆ จาง.
- **Correct:** ช่องว่าง (value gap) ระหว่างครอบครัว ≥ 2 ขั้น Munsell (≈ ΔL\* 20 / ΔOKLab ~0.17) [DERIVED จาก craft "2-step separation"; calibrate].
- **Incorrect:** halftone ในแสงมืดเท่าเงา → รูปทรงแตก; เงาขุ่นทึบ (opaque) ไม่เห็นพื้นผิว.
- **Exceptions:** แสงฟุ้ง (overcast) แทบไม่มี terminator — ใช้ ambient occlusion แทน.
- **Emotional:** สัดส่วนเงาใหญ่ = ดราม่า/ลึกลับ.
- **Technical:** FLUX: "single key light from upper left, shadow side in deep shade, no fill".
- **Keys:** Kingdom2004, ConwayLivingstone2007, MamassianGoutcher2001; Cavanagh2005 *(registry)* · EVIDENCE+CRAFT · medium-high.

### 3.6 Contrast hierarchy
- **Definition:** ลำดับระดับ contrast: สูงสุด 1 ที่ (focal), รอง 1–2 ที่, ที่เหลือต่ำ.
- **Foundation:** EVIDENCE ว่าสายตาไปหา local contrast (P2) แต่ไม่ใช่สาเหตุเดียว (P3); การจัดลำดับเป็น CRAFT.
- **Practical:** ค่าสว่างสุดติดค่ามืดสุด *ที่ focal เท่านั้น*; ลด contrast ด้วย value compression ที่ขอบภาพ.
- **Example:** แว่นกรอบดำบนหน้าผู้หญิงในร้าน: กรอบดำชนแก้มสว่าง = contrast สูงสุด; ผม/พื้นหลังลด contrast.
- **Correct:** focal ROI ถือ ≥ 2× ส่วนแบ่งพื้นที่ของ "top-5% local contrast" [DERIVED, §6].
- **Incorrect:** ป้ายร้านขาวจัดที่มุมขวาบนแย่งสายตา; ข้อความ HTML contrast สูงกว่าแว่น (ยอมได้ถ้าข้อความคือ focal).
- **Exceptions:** ภาพ "สำรวจ" (Where's Waldo), pattern.
- **Keys:** ConwayLivingstone2007, EinhauserKonig2003, TatlerBaddeleyGilchrist2005; Itti1998 *(registry)* · EVIDENCE+CRAFT · medium.

### 3.7 Tonal compression & dynamic range (HDR tone mapping basics)
- **Definition:** ฉากจริงมี luminance range กว้างกว่าจอ/กระดาษมาก ต้อง "บีบ" ให้พอดี; tone mapping = ฟังก์ชันแปลง scene → display.
- **Foundation:** EVIDENCE (Reinhard2002: global operator ตาม Zone System + dodging-and-burning เฉพาะที่; GrahamField2008: ศิลปินบีบแบบเกือบ log และมี curve ประจำตัว).
- **Practical:** (1) เลือก key = ค่ากลางของ subject ไปอยู่ zone ไหน; (2) roll-off highlight แทนตัด (clip); (3) รักษา local contrast ที่ subject; (4) ยอมบีบ (compress) พื้นหลัง.
- **Example:** promo ร้านตอนกลางวันที่หน้าต่างสว่างจ้า: หน้าต่างเป็น N9 ไม่ clip ทั้งแผ่น; หน้าคน N6–7; แว่น N2 ชนหน้า.
- **Correct:** clipped highlight ≤ 0.5% ของภาพ (ยกเว้น specular จุดเล็ก) [DERIVED จาก Reinhard roll-off]; crushed shadow ≤ 2% ยกเว้นงานกราฟิก low-key.
- **Incorrect:** "HDR look" — local tone mapping แรงจน halo รอบขอบ และทุกส่วน contrast เท่ากัน (ทำลาย hierarchy).
- **Exceptions:** silhouette/backlit ตั้งใจ crush ดำ; high-key product ตั้งใจ clip พื้นขาว (แต่ไม่ใช่บนสินค้า).
- **Emotional:** compression สูง (ช่วงแคบ) = นุ่ม ฝัน หมอก ความทรงจำ; ช่วงกว้าง = ดราม่า ชัด.
- **Technical:** `L_p2_p98` span: ≥ 0.55 = full range; 0.30–0.55 = compressed; < 0.30 = very compressed (หมอก/ซีด) — ใช้ *จำแนก* ไม่ใช่ตัดสินผ่าน/ตก [DERIVED]. "House curve" ต่อ series (เช่นชาร์โคล: ยก black เป็น ~0.28–0.33, OBSERVED p2 ในภาพเรา).
- **Keys:** Reinhard2002, GrahamField2008 · EVIDENCE · medium.

### 3.8 Chiaroscuro
- **Definition:** การปั้นรูปทรงด้วยแสง-เงาเข้มต่อเนื่อง (light, halftone, core shadow, reflected light, cast shadow) มักบนพื้นมืด; tenebrism = เวอร์ชันสุดขั้ว.
- **Foundation:** CRAFT/art history; ส่วน "ศิลปินควบคุมสายตาด้วยรายละเอียด+แสง" มี EVIDENCE (DiPaolaRiebeEnns2010 กับ Rembrandt).
- **Practical:** มีอยู่แล้วใน LIGHTING_LIBRARY `chiaroscuro` (setup แสง) — ที่นี่เน้น *value plan*: 70%+ ของภาพอยู่ N1–N4, focal อยู่ N7–N9, transition นุ่มยกเว้นขอบ focal.
- **Example:** แว่นทองบนผ้ากำมะหยี่ดำ ไฟเดียวซ้ายบน.
- **Incorrect:** เปิด fill จนเงาเทา = เสียทั้งดราม่าและรูปทรง.
- **Emotional:** ศักดิ์สิทธิ์ ลึกลับ หรูหรา ใกล้ชิด.
- **Keys:** DiPaolaRiebeEnns2010; LIGHTING_LIBRARY `chiaroscuro` · CRAFT (+EVIDENCE บางส่วน) · medium.

### 3.9 Silhouette readability
- **Definition:** วัตถุ/ตัวละครอ่านออกจากรูปเงาทึบอย่างเดียว.
- **Foundation:** EVIDENCE ว่า identifiability ของ silhouette แปรมากตามวัตถุและมุม (Wagemans2008_Silhouette); โครงหยาบพอสำหรับจำ (SinhaEtAl2006, Torralba2009). เกณฑ์ตัวละคร = CRAFT.
- **Practical:** เลือก *มุม* ที่ silhouette บอกตัวตน (แว่น: มุม 3/4 เห็นทั้งเลนส์และขาแว่น; มุมข้างเห็นแค่เส้น).
- **Correct:** ความต่างค่า subject vs รอบข้าง ΔOKLab L ≥ 0.26 สำหรับ hero silhouette (≈ WCAG non-text 3:1; คำนวณ: 3:1 ≈ ΔL 0.26–0.33 ทั่วช่วงค่า) และ ≥ 0.10 (≈ 1.5:1) เป็นขั้นต่ำของการแยกชั้น [DERIVED จาก W3C_WCAG21 SC 1.4.11 *(registry)*].
- **Incorrect:** แขนทับลำตัว (silhouette หาย), แว่นดำบนผมดำ.
- **Exceptions:** ฉากซ่อน/หลอน ที่ตั้งใจให้ร่างกลืน.
- **Technical:** threshold มาสก์ subject (cutout มีอยู่แล้วใน frame-kit) แล้วเติมดำ ย่อ 64 px — ต้องบอกได้ว่าคืออะไร.
- **Keys:** Wagemans2008_Silhouette, SinhaEtAl2006, Torralba2009 · EVIDENCE+DERIVED · medium. (รายละเอียด shape → SHAPE_LANGUAGE.md)

### 3.10 Greyscale & thumbnail analysis
- **Definition:** ดูภาพเป็นขาวดำและขนาดเล็ก เพื่อตัดสีและรายละเอียดออก เหลือโครง value.
- **Foundation:** EVIDENCE: gist อ่านจากโครงหยาบ (P6, P7); ตาคน/ศิลปินตัดสิน value บนภาพสีพลาดง่าย (P9) → ต้องวัด. การ "หรี่ตา" (squint) = CRAFT ทำหน้าที่เดียวกัน.
- **Practical:** ดู 3 ขนาด: 32×32 (gist), 64–128 px (ขนาด thumbnail ในฟีด/grid), เต็มจอ.
- **Mistakes:** แปลงเป็นเทาด้วยค่าเฉลี่ย RGB — ต้องใช้ luminance (Y) / L\* / OKLab L; สีเหลืองกับน้ำเงินที่ RGB เฉลี่ยเท่ากันมีค่าน้ำหนักต่างกันมาก.
- **Keys:** GreeneOliva2009, Torralba2009, SchynsOliva1994, PerdreauCavanagh2013 · EVIDENCE · high.

---
## 4. ขั้นตอน "ออกแบบ value ก่อนสี" (procedure)
1. **Purpose → key** (2 นาที): ระบุอารมณ์ + งาน (product/story/promo) → เลือก high / mid / low key. [CRAFT]
2. **Focal + contrast hierarchy:** เขียนว่า focal คืออะไร (แว่น, ท่าทาง Mint) และจะได้ "ค่าสุดขั้วคู่" ที่นั่น. [EVIDENCE P2 + CRAFT]
3. **Notan 2 ค่า** (thumbnail 3–5 แบบ, ขนาดแสตมป์): เลือกแบบที่อ่านเรื่องได้ทั้งที่ไม่มีรายละเอียด. ใช้ `form_libraries.json → tonal_compositions` เป็นตัวเลือกตั้งต้น. [CRAFT; DERIVED จาก P6]
4. **ขยายเป็น 3 ค่า:** กำหนดสัดส่วน (ค่าหนึ่งครอง ≥ 45%) และ value gap ระหว่าง light family กับ shadow family. [CRAFT]
5. **วาง accent → 5 ค่า:** N9+/N1 เฉพาะ focal (และ secondary 1 จุดที่อ่อนกว่า). [CRAFT]
6. **ทิศแสง:** ซ้ายบนเป็นค่าเริ่มต้น เว้นแต่มีเหตุผล (กลางคืน/ไฟใต้ = น่ากลัว). [EVIDENCE P5]
7. **แผนที่ข้อความ:** พื้นที่ข้อความ HTML ให้อยู่ในกลุ่มค่าเดียว (เรียบ) และต่างจากสีตัวอักษรตาม WCAG. [DERIVED: W3C_WCAG21 *(registry)*]
8. **แปลงเป็นสี:** เลือกสีที่ *ค่าตรงกับแผน* — ตรวจค่าของแต่ละสีด้วย `color_tools.py` (OKLab L) ก่อนใช้; hue/chroma อิสระได้ ตราบที่ L ตรง. [DERIVED จาก P1]
9. **Prompt/generate** (ดู §7) → **greyscale check** (§5) → แก้ด้วย HTML/curves ก่อน regen.

## 5. Greyscale check (ขั้นตอน + เกณฑ์ตัวเลข — ทั้งหมด DERIVED, ต้อง calibrate)
ใช้ `form_check.py` (§6) + `analyze_image.py`. ตัวเลขใน OKLab L (0–1) ให้ตรงกับเครื่องมือเดิม.

| # | check | pass | เหตุผล/ที่มา | ถ้าตก |
|---|---|---|---|---|
| G1 | ดู 32×32 และ 64 px greyscale | บอกได้ว่าเป็นฉากอะไร + focal อยู่ไหน | Torralba2009, GreeneOliva2009 (EVIDENCE) → เกณฑ์ DERIVED | กลับไปข้อ 3 (notan) |
| G2 | `thumb32_rms` | ≥ 0.08 (line art), ≥ 0.12 (photo/promo) | OBSERVED: ภาพชาร์โคลเรา 0.066–0.18; ภาพที่ค่าต่ำสุด (hiccups 03–04) คือเส้นจางที่สุด → 0.08 เป็นเส้นเตือน | เพิ่มน้ำหนักร่าง/มวลเงา |
| G3 | `dominant_group_pct` | ≥ 45% และ `two_largest_pct` ≥ 75% | CRAFT (ค่าหนึ่งครอง, Gurney/Dow) | รวมกลุ่ม (§3.4) |
| G4 | `focal_share_top5_contrast` | ≥ 2 × `focal_area_share` | P2 (EVIDENCE) + CRAFT hierarchy; ระวัง P3 | ลด contrast รอบนอก / เพิ่มที่ focal |
| G5 | `deltaL_focal_vs_surround` | ≥ 0.26 hero; ≥ 0.10 ขั้นต่ำ | WCAG 1.4.11 3:1 ≈ ΔL 0.26–0.33 (คำนวณแล้ว) | rim light, เปลี่ยนค่าพื้น |
| G6 | key ตรงแผน | `value.key` = key ที่ตั้งใจ | analyze_image thresholds | curves ใน HTML/ffmpeg |
| G7 | clipping | highlights ≤ 0.5%, shadows ≤ 2% (ยกเว้นตั้งใจ) | Reinhard2002 roll-off (DERIVED) | regen หรือ curve roll-off |
| G8 | high key มี accent | ถ้า key=high: p2 ≤ 0.45 | CRAFT (high key ≠ ซีด) | เพิ่มค่ามืดที่ focal |
| G9 | equiluminance | hero vs พื้นที่ ΔL < 0.05 แต่ต่าง hue มาก → FLAG | Dupree2003 (P1) | แยกด้วยค่า ไม่ใช่สี |
| G10 | ทิศแสงสม่ำเสมอ | เงาทุกชิ้นชี้ทางเดียว (ตรวจด้วยตา) | P5 + Cavanagh2005 (คนยอมรับเงาผิดฟิสิกส์ได้ แต่ทิศกลับด้านทำให้ นูน/บุ๋ม สลับ) | regen/แก้ใน HTML |

**OBSERVED calibration (2026-11-25):** ภาพ raw ชาร์โคล 20 ภาพ (kits 81-baby-bird, 110-hiccups): notan dark 0.5–7.9%,
mid 3.7–32%, light 63–96%; mean L 0.79–0.94; p2 0.28–0.54; edge density 0.056–0.19. แปลว่างาน line art ของเราเป็น
*high key + dark accent* เสมอ → G3 ผ่านโดยอัตโนมัติ, ตัววัดที่มีความหมายคือ G2, G4, G8 (p2 > 0.45 = เส้นจางเกินไป).

## 6. `form_check` (โค้ดอ้างอิง — วางใน scratch แล้วรัน; ทดสอบแล้วบน posts/_example และ 20 ภาพชาร์โคล)
```python
import sys, json, cv2, numpy as np
def load(path, short=512):
    img = cv2.imread(path, cv2.IMREAD_COLOR); h, w = img.shape[:2]; s = short / min(h, w)
    img = cv2.resize(img, (round(w*s), round(h*s)), interpolation=cv2.INTER_AREA)
    c = img[..., ::-1].astype(np.float32) / 255
    lin = np.where(c <= 0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    return img, np.cbrt(lin @ np.array([0.2126, 0.7152, 0.0722], np.float32))  # OKLab L (neutral); L* = 116L-16
def report(path, roi=None):            # roi = x0,y0,x1,y1 fractions of the intended focal area
    img, L = load(path); h, w = L.shape; f = lambda v, n=3: round(float(v), n)
    g = [(L < .4).mean(), ((L >= .4) & (L < .7)).mean(), (L >= .7).mean()]
    mu = cv2.GaussianBlur(L, (0, 0), 3)
    local = np.sqrt(np.maximum(cv2.GaussianBlur(L*L, (0, 0), 3) - mu*mu, 0))   # local RMS contrast
    lap = np.abs(cv2.Laplacian(L, cv2.CV_32F))                                  # fine-detail energy
    edges = cv2.Canny((L*255).astype(np.uint8), 40, 120) > 0                    # edge density (clutter proxy)
    t32 = cv2.resize(L, (32, 32), interpolation=cv2.INTER_AREA)
    out = {'notan_dark_mid_light_pct': [f(100*x, 1) for x in g], 'dominant_group_pct': f(100*max(g), 1),
           'two_largest_pct': f(100*sum(sorted(g)[1:]), 1), 'mean_L': f(L.mean()),
           'L_p2_p98': [f(np.percentile(L, 2)), f(np.percentile(L, 98))], 'thumb32_rms': f(t32.std()),
           'edge_density': f(edges.mean())}
    if roi:
        x0, y0, x1, y1 = int(roi[0]*w), int(roi[1]*h), int(roi[2]*w), int(roi[3]*h)
        m = np.zeros_like(L, bool); m[y0:y1, x0:x1] = True
        ring = np.zeros_like(L, bool); pad = max(4, int(.04*min(h, w)))
        ring[max(0, y0-pad):y1+pad, max(0, x0-pad):x1+pad] = True; ring &= ~m
        top = local >= np.percentile(local, 95)
        out.update({'focal_area_share': f(m.mean(), 2),
                    'focal_share_top5_contrast': f((top & m).sum() / max(top.sum(), 1), 2),
                    'detail_ratio_focal_vs_rest': f(lap[m].mean() / max(lap[~m].mean(), 1e-6), 2),
                    'edge_density_focal_vs_rest': f(edges[m].mean() / max(edges[~m].mean(), 1e-6), 2),
                    'deltaL_focal_vs_surround': f(abs(np.median(L[m]) - np.median(L[ring])))})
    return out
if __name__ == '__main__':
    roi = tuple(float(v) for v in sys.argv[2].split(',')) if len(sys.argv) > 2 else None
    print(json.dumps(report(sys.argv[1], roi), indent=1))
```
Usage: `python form_check.py image.png 0.3,0.35,0.7,0.65` (ROI = กล่อง focal). ROI สี่เหลี่ยมหยาบ → ΔL ใช้ median เพื่อลดผลขอบ;
ถ้ามี cutout mask (frame-kit) ให้ใช้ mask แทนกล่องจะแม่นกว่า.

## 7. Provider notes (FLUX / Codex / HTML)
- **FLUX schnell:** อธิบาย *แผนค่า* เป็นคำ ไม่ใช่ศัพท์ทฤษฎี: "mostly dark room, one warm pool of light on the counter, the glasses
  catch the brightest highlight, background falls into deep shadow" (low key) / "bright white paper, airy, only the two figures in dark
  charcoal" (high key + accent). "notan", "5-value" ไม่ค่อยมีผล [DERIVED จาก ART_FUNDAMENTALS AI notes; untested].
- **Codex (`-i`):** แนบ notan sketch 2 ค่าเป็น reference composition ได้ — ระบุว่า "follow the light/dark layout of the attached sketch".
- **HTML layer:** แก้ value หลัง generate ได้ถูกกว่า regen: CSS `filter: brightness() contrast()` เฉพาะ layer พื้นหลัง; radial-gradient
  vignette ลดค่าขอบ (compress รอบนอก); ใส่ scrim (แถบไล่ค่า) ใต้ข้อความให้พื้นข้อความอยู่กลุ่มค่าเดียว.

## 8. Contested / replication notes
- **Contrast → gaze:** สัมพันธ์ (Itti/Parkhurst, Conway citing Reinagel) แต่ไม่พบความเป็นเหตุใน Einhäuser & König 2003; Parkhurst & Niebur 2004
  ตอบด้วย texture contrast. ใช้ contrast ร่วมกับความหมายและรายละเอียดเสมอ (confidence ของ "contrast อย่างเดียวพอ" = low).
- **Light-from-above-left:** above = แข็ง; left bias = มีทั้งพบและไม่พบ.
- **Artists' perception:** Perdreau & Cavanagh (ไม่ต่าง) vs Ostrofsky (สัมพันธ์กับ shape constancy) — mixed.
- **Mona Lisa / low-SF:** อ่านจาก secondary เท่านั้น; Kontsevich & Tyler 2004 เสนอคำอธิบายอื่น (noise) — low confidence.

## 9. Open questions
- เกณฑ์ G2/G4/G5 ต้อง calibrate: ให้ผู้ใช้เลือกภาพ "ดี/ไม่ดี" 20 คู่ แล้วดูว่าตัวเลขแยกได้ไหม.
- ยังไม่มีงานวิจัยตรงเรื่อง "จำนวนกลุ่มค่า vs ความชอบ/การอ่านในฟีดมือถือ" — ช่องว่างใหญ่.
- อ่าน Livingstone *Vision and Art* (ยังไม่ได้) และ Gurney *Color and Light* (มีใน registry เป็น Gurney2010).
