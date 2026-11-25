# Advanced Colour Science (M09) — ลงลึกจากของที่มีอยู่

> Batch VA1 · tag `color` · 2026-11-25 · ภาษาไทย + ศัพท์เทคนิคอังกฤษ
> ไฟล์ในชุดนี้: `ADVANCED_COLOR_SCIENCE.md` (ไฟล์นี้) · `COLOR_RELATIVITY.md` (การมองเห็นสีแบบสัมพัทธ์ / constancy / #TheDress) ·
> `COLOR_SCRIPTING.md` (colour script + grading ตามเรื่อง) · `color_relationships.json` (คลัง "ความสัมพันธ์ของสี" ไม่ใช่ palette) ·
> `sources_color.json` (แหล่งใหม่ของ batch นี้)

## 0. ขอบเขตและสถานะ

**ไม่ทำซ้ำ** สิ่งที่ `.claude/skills/ai-visual-artist/COLOR_THEORY.md` และ `research/R2_color_light.md` อธิบายดีแล้ว:
สูตร OKLab, สูตร WCAG luminance, ตาราง harmony พื้นฐาน, 60-30-10 (unverified), colour–emotion ของ Jonauskaite/Ou,
CCT ของแสง, CVD prevalence ของ Birch — ไฟล์นี้อ้าง key เดิมเหล่านั้นตรง ๆ แล้วต่อยอดเฉพาะส่วนที่ audit (`_audit.json`,
module "VA01 color science") บอกว่า **missing/thin**: additive/subtractive/CMYK, Munsell, CIE XYZ, relativity,
simultaneous/successive contrast, chromatic adaptation/constancy, split-complementary/triadic/tetradic/monochromatic
(สถานะงานวิจัย), dominance, saturation hierarchy, discord, local/reflected/environmental colour, symbolism,
colour grading, colour script, gamut mapping, metamerism, spectral power.

**สิ่งที่ยังไม่ได้ทำ**: ยังไม่ได้ทดลอง generate ภาพจริงตามกฎใดเลย (`test_status: untested` ทุกตัวในคลัง) · ยังไม่ได้วัดสเปกตรัม
ไฟร้านจริง (ไม่มี spectrometer) · ยังไม่ได้อ่านฉบับเต็มของมาตรฐานที่ต้องซื้อ (CIE 224, ICC.1 v4.4, BT.709/BT.1886, ISO/CIE 11664-2) ·
Thai colour symbolism ส่วนใหญ่ยังเป็น **HYPOTHESIS** (ระบุไว้ทุกจุด)

### ป้ายกำกับทุกกฎ
- **EVIDENCE** = peer-reviewed / มาตรฐาน / ฟิสิกส์
- **CRAFT** = ธรรมเนียมช่าง (tier D) — ห้ามเขียนเหมือนข้อเท็จจริงทางวิทยาศาสตร์
- **DERIVED** = ข้อสรุปของเราเองจากหลักฐาน (บอกว่ามาจากอะไร)
- **HYPOTHESIS** = ยังไม่มีแหล่ง หรือแหล่งระดับ E — ใช้ได้แต่ต้องทดสอบ/ถามคนไทยในทีม

Key ที่ขึ้นต้นด้วยชื่อเดิม (เช่น `Fairchild2013`, `OuLuo2006`) อยู่ใน registry แล้ว · key ใหม่อยู่ใน `sources_color.json`

---

## 1. อธิบายสีให้แม่น — hue / value / chroma / saturation ไม่ใช่คำเดียวกัน

ปัญหาที่เจอบ่อยในงานเรา: brief เขียน "สีสด" หรือ "เพิ่ม saturation" แต่จริง ๆ ต้องการ chroma หรือ lightness คนละแกน

| คำ | นิยามเชิงการรับรู้ (CIE / colour appearance) | ในเครื่องมือเรา | ตัวอย่างงานเรา |
|---|---|---|---|
| **Hue** | ความรู้สึกว่า "เป็นแดง เหลือง เขียว น้ำเงิน หรือผสมระหว่างคู่ใด" | OKLCH `h` (องศา) | กรอบ acetate กระดองเต่า hue ≈ ส้ม-น้ำตาล |
| **Brightness** | ความสว่าง *แบบสัมบูรณ์* ของสิ่งเร้า (ปล่อยแสงมาก/น้อย) | ไม่มีตัวเลขตรง ๆ — ขึ้นกับจอ/สภาพดู | โพสต์เดียวกันดูบนจอ 100% vs โหมดประหยัดแบต |
| **Lightness / value** | ความสว่าง *เทียบกับสีขาวในฉากเดียวกัน* | OKLCH `L`, CIELAB `L*`, Munsell Value 0–10 | กรอบดำบนพื้นขาว: L ต่าง ~0.7 |
| **Colourfulness** | ปริมาณ "ความเป็นสี" แบบสัมบูรณ์ — เพิ่มเมื่อแสงแรงขึ้น (Hunt effect) | — | กรอบแดงกลางแดดดูจัดกว่าในร่ม ทั้งที่เป็นวัตถุเดิม |
| **Chroma** | colourfulness *เทียบกับขาวที่สว่างเท่ากัน* — ระยะห่างจากเทา | OKLCH `C`, Munsell Chroma | acetate เขียวมรกต C สูง; กรอบ gunmetal C ≈ 0 |
| **Saturation** | colourfulness *เทียบกับ brightness ของตัวมันเอง* (≈ chroma/lightness) | HSL/HSV "S" **ไม่ใช่** อันนี้ | เงาบนกรอบแดง: chroma ลด แต่ saturation อาจคงที่ |

Foundation: **EVIDENCE** — นิยามชุดนี้คือกรอบของ colour appearance models (CIECAM02 → CAM16 ทำนาย lightness, brightness, chroma,
colourfulness, saturation, hue แยกกัน) [Moroney2002, Li2017_CAM16, Fairchild2013 (bibliographic)] · Munsell ใช้ Hue–Value–Chroma
มาตั้งแต่ต้น และ renotation 1943 ผูกกับ CIE ภายใต้ Illuminant C [Newhall1943] · confidence: **high**

**ทำไม HSL "L" ไม่ใช่ lightness (ตัวเลขจริงจาก `color_tools.py info`)**

| สี | HSL | OKLCH L | relative luminance |
|---|---|---|---|
| `#FFFF00` เหลือง | (60°, 100%, **50%**) | **0.968** | 0.928 |
| `#0000FF` น้ำเงิน | (240°, 100%, **50%**) | **0.452** | 0.072 |

HSL บอกว่าสว่างเท่ากัน (50%) แต่ตาเห็นต่างกันมาก — HSL/HSV เป็นแค่การจัดพิกัด RGB ของอุปกรณ์ใหม่ (hexcone) ไม่ได้ฟิตกับข้อมูลการรับรู้
[Smith1978] · Ottosson ระบุตรง ๆ ว่า HSL lightness "does not match the perception of lightness well at all for saturated colors"
และ hue ของ HSV บิดเบือนมาก จึงเสนอ Okhsv/Okhsl (hue จาก OKLab + ยังเป็นทรงกระบอกให้ color picker ใช้ง่าย) แต่ยอมรับว่าเป้าหมาย
"L/C/h อิสระ" กับ "ทรงกระบอกใน sRGB" ขัดกันโดยธรรมชาติ [Ottosson2021_Okhsv] · **EVIDENCE**, confidence high

**กฎใช้งาน (DERIVED จากข้างบน)**: ใน brief/prompt ให้แยกพูด 3 แกนเสมอ — "เข้มขึ้น" = ลด L, "สดขึ้น" = เพิ่ม C,
"อุ่นขึ้น" = หมุน h — ห้ามใช้ slider S ของ HSL ตัดสินว่าสี "สดเท่ากัน"

### Natural value order of hues (ลำดับความสว่างตามธรรมชาติ)
ที่ chroma สูงสุดของ sRGB เหลืองสว่างที่สุด (L≈0.97) น้ำเงิน/ม่วงมืดที่สุด (L≈0.45) — ข้อเท็จจริงเชิงคำนวณ (**EVIDENCE**, จากตารางข้างบน)
ช่างยุคเก่าเรียก "natural order" (Rood → Carpenter → Harlan) และใช้เป็นฐานของ **discord** (§6.6) [Harlan1986_Discord — CRAFT]
ผลต่องานเรา: ถ้าอยากได้เหลืองที่ "มืด" ต้องยอมให้มันกลายเป็นน้ำตาล/มัสตาร์ด (chroma หาย) — เพราะ gamut ของเหลืองที่ L ต่ำแคบมาก

---

## 2. การผสมสี — แสง ≠ สีย้อม ≠ หมึกพิมพ์

| ระบบ | กลไกทางฟิสิกส์ | primaries | ผลผสม 2 สี | ใช้ที่ไหนในงานเรา |
|---|---|---|---|---|
| **Additive** (แสง) | แสงรวมกันเข้าตา พลังงานบวกกัน | R, G, B | R+G = เหลือง, รวมสาม = ขาว | จอ, HTML layer, ไฟ 2 ดวงคนละสีส่องจุดเดียว |
| **Subtractive** (filter ซ้อน) | แต่ละชั้นดูดกลืนบางช่วงคลื่น เหลือส่วนที่ผ่านทุกชั้น | C, M, Y | C+Y = เขียว, รวมสาม ≈ ดำขุ่น | เลนส์สี/tint ซ้อนกัน, gel หน้าไฟ |
| **Pigment** (สีทา/สีน้ำ/ถ่านสี) | อนุภาคดูดกลืน **และ** กระเจิงแสงซ้ำ ๆ — Kubelka–Munk | ขึ้นกับ pigment จริง | น้ำเงิน+เหลือง = เขียว (ไม่ใช่เทา) | style สีน้ำ/สีโปสเตอร์ใน carousel |
| **Print CMYK** | หมึกโปร่งแสงพิมพ์เป็นจุด (halftone) บนกระดาษขาว | C, M, Y + K | จุดเล็กผสมด้วยตา (partitive) + ซ้อนแบบ subtractive | ใบปลิวร้าน, ป้าย, นามบัตร |

- RGB average ของน้ำเงินกับเหลืองให้ **เทา** ส่วนสีจริงให้ **เขียว** เพราะ pigment ดูดกลืนและกระเจิงแสงซ้ำในชั้นสีจนเหลือแต่ช่วงเขียว;
  Kubelka–Munk (1931) ทำนายได้ แต่ซอฟต์แวร์วาดภาพแทบไม่ใช้ เพราะต้องทิ้ง RGB · Mixbox แก้ด้วย latent space (ผสม pigment หลัก 4 ตัว +
  additive residual) ให้ RGB เข้า-ออกได้ · ผู้เขียนยังชี้ว่า subtractive mixing แบบง่าย (ที่ CMYK ใช้) "too dark หรือ wrong color" เมื่อเทียบ K–M
  [SochorovaJamriska2021 full_text, KubelkaMunk1931 bibliographic] · **EVIDENCE**, high
- **K ใน CMYK**: เหตุผลมาตรฐานในวงการพิมพ์คือ CMY รวมกันไม่ได้ดำสนิทและเปลืองหมึก — **CRAFT/industry** (ไม่ได้อ่านมาตรฐานพิมพ์ฉบับเต็มใน batch นี้)
- **Partitive mixing** (จุดเล็กผสมด้วยตา — halftone, pointillism, จอ subpixel) คือ additive เชิงพื้นที่ — **DERIVED** จากหลัก additive

**ผลต่องานเรา**
- ภาพ AI ที่ขอ "watercolor" แล้วต่อด้วย blend ใน HTML/CSS (`mix-blend-mode`, gradient) จะผสมแบบแสง → ขอบที่สีน้ำเงินชนเหลืองจะขุ่นเทา
  ถ้าต้องการรอยต่อแบบสีจริงให้ทำใน raster ด้วยตัวผสม pigment หรือให้ AI วาดมาเลย (**DERIVED** จาก SochorovaJamriska2021)
- ทำงานคณิตศาสตร์สี (blend, เบลอ, ย่อภาพ) ใน **linear light** เสมอ — มีใน COLOR_THEORY §2 แล้ว [IEC61966_2_1]
- งานพิมพ์: สีสด ๆ บนจอ (โดยเฉพาะเขียว Phthalo #123A29 ของแบรนด์ หรือส้ม/ฟ้าสด) อาจอยู่นอก gamut CMYK → ดู §9.4 rendering intent

---

## 3. Colour spaces — ใช้ตัวไหนทำงานอะไร (ส่วนที่เพิ่มจาก COLOR_THEORY §2)

### 3.1 CIE XYZ — "ภาษากลาง"
- **นิยาม**: ค่า tristimulus X, Y, Z คำนวณจาก spectral power distribution (SPD) ของสิ่งเร้า × colour-matching functions ของ standard observer
  (CIE 1931 2°, 1964 10°); **Y = luminance**; chromaticity (x, y) = สัดส่วน · เป็นฐานของ CIELAB/CIELUV และ PCS ของ ICC
  [CIE15_2018, ICC_Profiles] · **EVIDENCE**, high
- **สิ่งที่ XYZ บอก**: สองสิ่งเร้าที่มี XYZ เท่ากัน *ภายใต้สภาพดูเดียวกัน* จะดูเหมือนกัน (คือคำจำกัดความของ metamer, §9.5)
- **สิ่งที่ XYZ ไม่บอก**: หน้าตาสีเมื่อพื้นหลัง/แสงรอบ/ระดับการปรับตัวเปลี่ยน — ต้องใช้ appearance model (§3.4) [Fairchild2013]
- ไม่ uniform: ระยะเท่ากันใน xy ≠ ความต่างที่เห็นเท่ากัน → อย่าวัด ΔE ใน XYZ
- งานเรา: ไม่ต้องแตะตรง ๆ แต่ต้องเข้าใจว่า D65 white point (x 0.3127, y 0.3290) คือขาวอ้างอิงของ sRGB, BT.709, Display P3
  [ICC_BT709_Registry, ISO_CIE_11664_2_2022]

### 3.2 CIELAB / LCh(ab)
L* a* b* (และรูป polar L* C* h) คือ uniform space ของ CIE 1976 — ใช้วัด ΔE (ΔE00 ต้องใช้ library ที่ทดสอบแล้ว) [CIE15_2018, Sharma2005]
จุดอ่อน: hue ของน้ำเงินลอยไปม่วงเมื่อลด chroma [Ottosson2020] · **คู่ตรงข้ามใน CIELAB ไม่ทำนาย "complementary" ที่คนเลือก**
(Mahyar et al. 2007 พบว่า opposite hues ใน CIELAB ไม่ตรงกับคู่ complementary ที่ observers เห็น) [Mahyar2007 search_summary] → ระวังเวลา
ให้โปรแกรม "หมุน 180°" แล้วเรียกว่าคู่ตรงข้าม — ใน OKLCH ก็เป็นแค่ค่าประมาณ (**DERIVED**)

### 3.3 OKLab / OKLCH, Okhsl/Okhsv
มีใน COLOR_THEORY แล้ว ส่วนที่เพิ่ม: Okhsl/Okhsv สำหรับ picker ที่ให้ผู้ใช้ลากแล้วไม่หลุด gamut [Ottosson2021_Okhsv] · ข้อจำกัด: ไม่มีพจน์
surround/adaptation, ครอบคลุมแค่ sRGB ไม่รวม wide-gamut/HDR — **EVIDENCE (author's own)**, confidence medium

### 3.4 Colour appearance models — CIECAM02 → CAM16
- CIECAM02 = chromatic adaptation (CAT02) + เงื่อนไขการดู (adapting luminance, surround) → ทำนาย 6 แอตทริบิวต์ใน §1 [Moroney2002]
- **CAM16 / CAT16 / CAM16-UCS** (Li et al. 2017) ทำให้ง่ายขึ้น แก้ปัญหาคณิตศาสตร์ของ CIECAM02 และให้ uniform space สำหรับ colour difference
  [Li2017_CAM16 abstract] · งานต่อยอดเพิ่ม "size effect" (สีพื้นที่ใหญ่ดูต่างจาก swatch เล็ก) ใน CAT16 space [Li2017_CAM16 — search_summary ของ
  follow-up] · **EVIDENCE**, medium-high
- งานเรา: ยังไม่ต้องคำนวณ CAM16 แต่ใช้ *ข้อสรุป*: สีเดียวกันจะดูต่างเมื่อ (ก) พื้นหลังต่าง (ข) แสงรอบต่าง (ค) ขนาดต่าง (ง) ความสว่างจอต่าง
  → ตัดสินสีในภาพประกอบเสร็จ ในขนาดที่ผู้ชมเห็นจริง (thumbnail IG + เต็มจอ) — **DERIVED**

### 3.5 Munsell — ระบบที่ช่างวาดยังใช้
- Hue (5R, 10YR, …) · Value 0 (ดำ) – 10 (ขาว) · Chroma 0 (เทา) → ไม่มีเพดาน (pigment จริงไม่ค่อยเกิน ~16) · เขียน H V/C เช่น 5P 5/10;
  เทาเขียน N [Newhall1943 abstract; รายละเอียดสัญกรณ์จาก search_summary ของแหล่งสารานุกรม — ไม่ได้ลง key แยก] · **EVIDENCE** (renotation ผูกกับ CIE)
- ข้อดีเชิงช่าง: แยก value ออกจาก chroma ชัด และ "ทรงต้นไม้" ไม่สมมาตร — เหลืองไปได้ chroma สูงที่ value สูงเท่านั้น สอดคล้อง §1
- ข้อจำกัด: ระบบ polar ไม่ uniform สมบูรณ์; renotation อิง Illuminant C ไม่ใช่ D65 · Witzel & Gegenfurtner เตือนว่าชุด chip Munsell ที่
  chroma สูงสุดทำให้งานวิจัยเรื่อง focal colours ปนกับ "ความสดของชุดตัวอย่าง" [WitzelGegenfurtner2018 full_text]
- งานเรา: ใช้ภาษา Munsell ใน critique ได้ ("ลด value ของพื้นลง 2 ขั้น, chroma คงเดิม") แล้วแปลงเป็น OKLCH ด้วย `color_tools.py`

### 3.6 Opponent coding และ colour categories (ฐานของ "complementary")
- ทฤษฎี opponent process: ระบบประสาทเข้ารหัสสีเป็นคู่ตรงข้าม แดง–เขียว, น้ำเงิน–เหลือง, ขาว–ดำ (Hurvich & Jameson 1957 วัดด้วย hue cancellation)
  [HurvichJameson1957 bibliographic] · ข้อโต้แย้ง: unique hues ไม่ได้ตรงกับช่อง cone-opponent ทางสรีระพอดี (search_summary) → confidence medium
- **Colour categories**: จำนวน basic colour terms ต่างตามภาษา (อังกฤษ/เยอรมัน 11, รัสเซีย 12 ฯลฯ); สีที่อยู่คนละหมวดถูกมองว่าต่างกันมากกว่า
  เมื่อทดสอบแบบเร็ว และ verbal interference ลดผลนี้ → ผลของภาษาอยู่ "ระดับสูง" ของการประมวลผล [WitzelGegenfurtner2018] · **EVIDENCE**, medium
- **ภาษาไทย**: งานวิจัยไทยเถียงกันว่ามี basic terms 5 (ขาว ดำ แดง เหลือง เขียว — Unthanon & Chanthao 2020 ใช้เกณฑ์ "ไม่ตั้งชื่อตามสิ่งของ") ถึง 12
  (Laophairoj 2005) — ต่างที่เกณฑ์นับ [Unthanon2020 abstract, Laophairoj2005 search_summary] · ภาษาไทยแยก **ฟ้า** กับ **น้ำเงิน** เป็นคำต่างกัน
  (Unthanon นับ "light blue" แยกจาก "blue") → **HYPOTHESIS (DERIVED จาก Witzel เรื่องรัสเซีย goluboy/siniy)**: คนไทยอาจเห็นฟ้ากับน้ำเงินเป็น "คนละสี"
  มากกว่าคนอังกฤษ — ผลต่อ brief: ถ้าเขียน "โทนฟ้า" แล้วได้น้ำเงินเข้ม ลูกค้าไทยอาจรู้สึกว่าผิดสี ไม่ใช่แค่เข้มไป

---

## 4. การรับรู้สีแบบสัมพัทธ์ (สรุป — รายละเอียดอยู่ใน `COLOR_RELATIVITY.md`)
- สีของวัตถุไม่ได้กำหนดด้วยแสงจากวัตถุนั้นอย่างเดียว [ShevellKingdom2008 full_text] — simultaneous contrast, assimilation, successive contrast,
  chromatic adaptation, colour constancy, memory colour, HK effect, size effect
- #TheDress: 57% blue/black, 30% white/gold, 11% blue/brown (N = 1,401) — ตัดสินตามสมมติฐานเรื่องแสงที่ไม่มีใครรู้ตัว [LaferSousa2015 full_text]
- warm/cool เป็นของ **สัมพัทธ์** — ม่วงแดงดู "อุ่น" ข้างน้ำเงิน แต่ "เย็น" ข้างส้ม (**CRAFT**, Albers1963) — `analyze_image.py` ใช้ bin hue ตายตัว
  (warm = h < 110° หรือ > 330°, cool = 150–300°, เฉพาะ C > 0.04) จึงเป็น *absolute* indicator ไม่ใช่การรับรู้ — อ่านด้วยความระวัง

---

## 5. ความสามัคคีของสี (harmony): งานวิจัยบอกอะไร vs ธรรมเนียมช่างบอกอะไร

### 5.1 สถานะหลักฐานของแต่ละ scheme

| Scheme | สิ่งที่ช่างสอน (CRAFT) | สิ่งที่งานวิจัยพบ (EVIDENCE) | สรุปใช้งาน |
|---|---|---|---|
| Monochromatic | สงบ กลมกลืน | คู่ hue คล้ายกัน → harmony และ preference สูงขึ้น [SchlossPalmer2011, OuLuo2006] | หลักฐานรองรับดีที่สุด แต่ต้องมี value contrast |
| Analogous | ธรรมชาติ อบอุ่น/เย็น | เหมือนข้างบน (hue similarity) | ดี; จุดเด่นต้องมาจาก value หรือ chroma |
| Complementary | ตัดกันแรงสุด | คนชอบคู่ที่มี lightness contrast มากกว่าหมุน hue 180°; opposite ใน CIELAB ไม่ตรงคู่ที่คนเลือก [SchlossPalmer2011, Mahyar2007] | ใช้ได้ถ้าคุม value + สัดส่วน |
| Split-complementary | ตัดกันแต่ตึงน้อยกว่า | ไม่พบงานทดสอบเฉพาะ scheme นี้ใน batch นี้ | **CRAFT only** |
| Triadic / Tetradic | สนุก / รวย | three-colour harmony ≈ ค่าเฉลี่ยของ harmony ทั้ง 3 คู่ (additivity) [Ou2011_Additivity] — คือคุณภาพมาจาก "คู่" ไม่ใช่ "รูปสามเหลี่ยม" | ตรวจทีละคู่ |
| Hue templates ทั้งหมด (Matsuda/Kuler) | หมุนบนวงล้อแล้วจะสวย | ข้อมูล theme >2 ล้านชิ้น (Kuler, COLOURLovers, MTurk): "little evidence that people gravitate to templates naturally, or that matching a template produces higher scores"; theme ที่ตรง template เป๊ะกลับคะแนนต่ำกว่าเล็กน้อย; ชอบ 2–3 hues ต่อ 5 สี [ODonovan2011 full_text] | template = เครื่องมือหาไอเดีย ไม่ใช่เกณฑ์คุณภาพ |

- Westland et al. (2007) review ทฤษฎี harmony ตั้งคำถามว่ามี "กฎพื้นฐาน" จริงหรือไม่ [Westland2007 search_summary]
- Color harmonization (Cohen-Or et al. 2006) *บังคับ* hue histogram ของภาพเข้า template ได้อัตโนมัติ — เป็นเครื่องมือ ไม่ใช่หลักฐานว่ามันสวยกว่า
  [CohenOr2006 search_summary]
- ความชอบสีขึ้นกับ "สิ่งของที่สีนั้นชวนนึกถึง" (ecological valence) [PalmerSchloss2010] → บริบทชนะวงล้อ

**DERIVED rule (จาก OuLuo2006 + SchlossPalmer2011 + ODonovan2011)**: เลือก scheme ได้อิสระ แต่ต้องผ่าน 3 ด่าน — (1) value contrast พอสำหรับจุดเด่น/ตัวอักษร
(2) hue ไม่เกิน ~2–3 กลุ่มหลัก (3) ตรวจ harmony ทีละคู่ที่ "อยู่ติดกันจริงในภาพ" ไม่ใช่ทุกคู่ใน palette · confidence medium (หลักฐานจาก patch/theme
ไม่ใช่ภาพเต็ม)

### 5.2 Limited palette, muted / neutral / accent
- **Limited palette** (CRAFT): จำกัดสีตั้งต้น ทำให้ทุกส่วนของภาพ "อยู่บนแสงเดียวกัน" — วิธีทำ: (ก) *mother colour* ผสมสีหลักหนึ่งสีลงไปในทุกสีเล็กน้อย
  (ข) *gamut mask* วาดรูปหลายเหลี่ยมบนวงล้อแล้วใช้เฉพาะสีในนั้น [Gurney2010 — CRAFT]
- **Neutral** = chroma ≈ 0 (เทา ขาว ดำ, OKLCH C < ~0.02) · **Muted** = chroma ต่ำแต่ยังมี hue (C ~0.02–0.06: เบจ เทาอมเขียว) ·
  **Accent** = chroma สูงในพื้นที่เล็ก — ตัวเลข C เป็น **DERIVED working thresholds** จากเกณฑ์ `analyze_image.py` (chromatic = C > 0.04) ไม่ใช่มาตรฐาน
- ตัวอย่างจากโพสต์ `_example` (วัดจริง): dominant 3 สี = เทาอุ่น L 0.96/0.92/0.89 (C ≤ 0.008) รวม 93.6% + เขียว Phthalo 3.3% + ดำ 2.5%;
  `mean_chroma` 0.009, `harmony_guess` monochromatic/analogous → นี่คือ "neutral field + single accent" แบบชัดเจน

### 5.3 Dominance และ proportion
- Itten เรียก "contrast of extension": สีที่แรงกว่าต้องใช้พื้นที่น้อยกว่าจึงจะสมดุล [Itten1961 bibliographic — CRAFT]; 60-30-10 ยังไม่ทราบที่มา
  [Unverified_60_30_10]
- **Dominance** หมายถึงมีสามอย่างที่ "ชนะ": hue family เดียว, value key เดียว (high/mid/low), temperature เดียว — ส่วนที่เหลือรับใช้ (CRAFT)
- งานวิจัยจากข้อมูล theme ชี้ว่าคนให้คะแนน theme ที่มี 2–3 hues สูงกว่า theme hue เดียวหรือกระจาย 5 hues [ODonovan2011] — สนับสนุน dominance แบบหลวม ๆ
- เครื่องมือ: `analyze_image.py` → `color.proportion_top3_pct` + `proportion_note` (ระวัง: k-means นับตาม **พื้นที่** ไม่ใช่ความเด่น; accent 2% อาจเป็นสิ่งแรกที่ตาไปหา)

### 5.4 Saturation hierarchy (ลำดับชั้นความสด)
- CRAFT: chroma สูงสุดสงวนไว้ที่จุดเด่นจุดเดียว; ระยะกลางลดลง; ขอบภาพ/ฉากหลังต่ำสุด
- **DERIVED (จาก saliency)**: โมเดล visual weight ของเรา (saliency × local contrast × saturation) ให้น้ำหนักความสด จึงทำนายว่าจุดที่ chroma สูงสุดจะดึงสายตา —
  แต่ saliency model ไม่ใช่ eye-tracking จริง [Itti1998 / Hou & Zhang 2007 ตามที่ `analyze_image.py` อ้าง]
- งานแว่น: กรอบ acetate สีสด → ฉากหลังต้อง muted; กรอบโลหะ/ใส (chroma ≈ 0) → ใช้ value contrast และ *สีของสภาพแวดล้อมในเลนส์/โลหะ* เป็น accent แทน (§7)

### 5.5 Colour discord (CRAFT)
- นิยาม (Harlan, ต่อจาก Rood/Carpenter): สองสีวางชิดกันโดย **value กลับลำดับธรรมชาติ** — เช่น ม่วงอ่อนที่สว่างกว่าเหลืองข้าง ๆ, ฟ้าอ่อนเหนือดินแดงที่มืดกว่า
  แบ่งเป็น light / dark / double / muted discord [Harlan1986_Discord full_text (เว็บต้นฉบับ)]
- ใช้: ปริมาณน้อย ๆ ปลุกคู่สีที่จืด, สร้างความไม่สบายใจในฉากเรื่องเล่า (night-optic ฉากลึกลับ); เยอะไปจะ "ทำลายภาพ"
- หลักฐานวิทยาศาสตร์: **ไม่มี** ใน batch นี้ — ห้ามอ้างว่า discord "ทำให้คนกังวล" เป็นข้อเท็จจริง

---

## 6. Local, reflected, environmental colour (ฟิสิกส์ + การวาด)

| คำ | นิยาม | foundation | ในงานเรา |
|---|---|---|---|
| **Local colour** | สีเนื้อแท้ของพื้นผิว (reflectance) ภายใต้แสงขาว ไม่มีเงา | EVIDENCE: วัตถุจริงมี *การกระจาย* สี ไม่ใช่ค่าเดียว; คนประมาณ lightness ของวัตถุจากส่วนที่สว่างที่สุด *ยกเว้น highlight* [WitzelGegenfurtner2018] | สีกรอบที่เห็นชัดที่สุดคือระนาบที่โดนแสงตรงแต่ไม่ใช่จุดสะท้อน |
| **Reflected colour** (colour bleed, interreflection) | แสงที่สะท้อนจากผิวหนึ่งไปย้อมอีกผิว | EVIDENCE: ระบบการมองเห็น "รู้" เรื่อง mutual illumination — การ์ดพับครึ่ง magenta/ขาว: ด้านขาวดูชมพูอ่อน↔ magenta เข้มเมื่อรูปทรงที่รับรู้พลิกเว้า↔นูน [Bloj1999 abstract]; interreflection เป็น cue หนึ่งของ constancy [WitzelGegenfurtner2018, ShevellKingdom2008] | ใต้คางนางแบบติดสีเสื้อ, ขากรอบด้านในติดสีผิว, แว่นวางบนโต๊ะไม้ได้แสงอุ่นจากด้านล่าง |
| **Environmental colour** | สีโดยรวมของแสงรอบตัว (ท้องฟ้า, ผนัง, ป้ายไฟ) ที่ย้อมทุกอย่าง โดยเฉพาะเงาและผิวมันวาว | EVIDENCE (ฟิสิกส์ scattering: เงากลางแจ้งได้แสงฟ้า) [HyperPhysics_Scattering]; CRAFT (Gurney2010) | กรอบโลหะ/เลนส์มิเรอร์แทบไม่มี local colour — โชว์สีสภาพแวดล้อม |
| **Specular highlight** | การสะท้อนผิวหน้า (dielectric เช่น acetate, เลนส์) มีสีของ **แหล่งแสง** ไม่ใช่สีวัตถุ; โลหะสะท้อนแบบมีสีของโลหะ | EVIDENCE: specularities เป็น cue ของ constancy [WitzelGegenfurtner2018]; ฟิสิกส์ PBR [Burley2012, Schlick1994] | highlight บน acetate แดงต้องขาว/สีไฟ ไม่ใช่ชมพู; บนกรอบทองต้องอมทอง |

**ข้อผิดพลาดที่พบบ่อยในภาพ AI/HTML**: (1) cutout แว่นวางบนพื้นหลังใหม่โดยไม่มี reflected colour → ดูแปะ (2) เงา drop shadow สีดำเทา 50%
บนพื้นอุ่น → เงาควรเป็นสีพื้นที่มืดลงและเย็นลงเล็กน้อย (3) highlight สีเดียวกับกรอบ → ดูเป็นพลาสติกด้าน · ทางแก้อยู่ใน `color_relationships.json`
(`crel.colour_bleed_ground_to_underside`, `crel.metal_shows_environment`, `crel.specular_carries_light_colour`)

---

## 7. จิตวิทยาสี สัญลักษณ์ วัฒนธรรม — และความอ่อนของหลักฐาน

### 7.1 หลักฐานแข็งแค่ไหน (ต่อจาก COLOR_THEORY §6)
| Claim ที่ได้ยินบ่อย | หลักฐานล่าสุดที่อ่าน | ระดับความมั่นใจ |
|---|---|---|
| "สีแดงทำให้ทำข้อสอบแย่ลง" | Meta-analysis 67 effect sizes: anagram d −0.06, knowledge d −0.04 (ไม่ significant), reasoning d −0.34 แต่มี decline effect (งานแรก ~−0.86) และ publication bias; หลังแก้ bias ≈ 0 — "casts doubt on the existence of a robust color-priming effect" [Gnambs2020 full_text, tier S] | **low** |
| "แดงทำให้ดูน่าดึงดูด" | Meta-analysis (adversarial collaboration รวม Elliot เอง): ชายดูหญิง d = 0.26 [0.12, 0.40], หญิงดูชาย d = 0.13 [0.01, 0.25]; ผลลดลงตามปี; งาน preregistered ฝั่งหญิงได้ d −0.10 vs 0.21 ไม่ preregistered [Lehmann2018, tier S] | **low–medium** (เล็ก, น่าจะ overestimate) |
| "ฟ้าทำให้ดูน่าเชื่อถือ / แสงฟ้าทำให้ตื่นตัว" | อยู่ในรายการผลที่มี ≥5 lab แต่ผู้เขียน review เองเตือน "premature to offer any bold … definitive empirical pronouncements"; ตัวอย่างเล็ก, ควบคุมสีไม่ถึงระดับสเปกตรัม [Elliot2015 full_text] | **low–medium** |
| colour–emotion *association* ข้ามวัฒนธรรม | แกนร่วมแข็งแรง r ≈ .88 ใน 30 ประเทศ แต่เป็น *คำ* สี และยังมีความต่างตามชาติ/ภาษา [Jonauskaite2020]; ยืนยันไม่ได้ว่ามีประเทศไทยในกลุ่มตัวอย่าง | **medium** (association ≠ ทำให้เกิดอารมณ์) |
| ความหมายสีขึ้นกับบริบท | color inference framework: association ≠ meaning; คนจับคู่สีกับความหมายโดยเทียบกับตัวเลือกอื่นในชุด (assignment inference) — เช่น ม่วงถูกตีความว่า "ขยะ" ได้ในชุดหนึ่ง แม้ขยะสัมพันธ์กับขาวมากกว่า; ความชอบสี ~80% ของความแปรปรวนอธิบายด้วย ecological valence [Schloss2024 full_text, PalmerSchloss2010] | **medium-high** |

**กฎ**: ใน brief ใช้ภาษา "สีนี้ *มักถูกเชื่อมโยงกับ* …" ไม่ใช่ "สีนี้ *ทำให้* ลูกค้า…" · ห้ามอ้าง red-sells / blue-trust เป็นข้อเท็จจริงในแคปชัน/สไลด์ (**EVIDENCE-based caution**)

### 7.2 สัญลักษณ์และวัฒนธรรมไทย (แยกระดับหลักฐาน)
| เรื่อง | สถานะ | แหล่ง |
|---|---|---|
| สีประจำวัน: อาทิตย์แดง จันทร์เหลือง อังคารชมพู พุธเขียว พฤหัสส้ม ศุกร์ฟ้า เสาร์ม่วง; ที่มาจากโหราศาสตร์ฮินดู (นวเคราะห์) ผูกกับพระประจำวัน; สีวันเกิดเป็นสีมงคล | มีอยู่จริงอย่างกว้างขวาง แต่แหล่งที่พบเป็น tier E; รายละเอียดบางจุดต่างกัน (พุธกลางวัน/กลางคืน) | [Wiki_ThaiDayColours — E] |
| ดำ/ขาว = ไว้ทุกข์; ช่วงไว้ทุกข์ ร.9 (ต.ค. 2016) รัฐประกาศไว้ทุกข์ 1 ปี, คนใส่ดำ/ขาวทั่วประเทศ | ข่าวหลายสำนักตรงกัน | [AlJazeera2016_Mourning — C] |
| เหลือง/ชมพู/ฟ้า ผูกกับวันพระราชสมภพและพระราชวงศ์ | **HYPOTHESIS (ตามข้อ "สีวันเกิด" ข้างบน)** — ไม่ได้ตรวจแหล่งทางการ; ใช้ด้วยความเคารพ, หลีกเลี่ยงในโฆษณาสินค้า | — |
| แดง+ทอง = ตรุษจีน/มงคล; ส้มจีวร+วัด ห้ามใช้ขายของ | **HYPOTHESIS/CRAFT** (มีใน COLOR_THEORY แล้ว ยังไม่มีแหล่ง) | — |
| ฟ้า vs น้ำเงินเป็นคนละสีในภาษาไทย | basic term debate [Unthanon2020, Laophairoj2005]; ผลต่อการรับรู้ = **HYPOTHESIS** | §3.6 |
| เขียว = สุขภาพตา/ธรรมชาติ, ฟ้า = สะอาดทางการแพทย์ (ร้านแว่น) | **HYPOTHESIS** (ecological association ทำนายทิศทาง [PalmerSchloss2010] แต่ไม่มีข้อมูลคนไทย) | — |

---

## 8. Accessibility (ส่วนที่เพิ่ม)
- WCAG 2.2 ยังใช้เกณฑ์เดิม 4.5:1 / 3:1 · เหตุผลของ 4.5:1 = ชดเชยการสูญเสีย contrast sensitivity ระดับสายตา ~20/40 (ทั่วไปในวัย ~80) ·
  "large" = ≥18 pt หรือ ≥14 pt bold (~24 px / ~18.5 px) · **ห้ามปัดเศษ** (4.499 ไม่ผ่าน) · logotype ยกเว้น แต่ "brand guidelines ไม่ใช่ข้อยกเว้น"
  ของตัวอักษรทั่วไป · พื้นหลังเป็นภาพที่ contrast ไม่พอ = fail [W3C_WCAG22_Understanding143 full_text, tier S]
  → ลูกค้าร้านแว่นจำนวนมากเป็นผู้สูงอายุ/สายตายาว: 4.5:1 คือพื้น ไม่ใช่เป้า (**DERIVED**)
- **APCA**: ผู้พัฒนาให้ค่า Lc 90 (body text ที่ต้องการ), 75 (ขั้นต่ำ body), 60 (content text อื่น), 45 (หัวข้อใหญ่/ไอคอนละเอียด), 30 (ขั้นต่ำข้อความอื่น),
  15 (ขั้นต่ำ non-text) [APCA_Nutshell — D, ผู้พัฒนาเอง] · **สถานะ**: WCAG 3 ยังเป็น Working Draft และ editor's note บอก algorithm "yet to be determined"
  [W3C_WCAG3_WD] → ใช้ APCA เป็น *ตัวตรวจเสริม* สำหรับข้อความบนพื้นมืด ห้ามอ้างว่าเป็นมาตรฐาน
- **Helmholtz–Kohlrausch**: สีอิ่ม (แดง น้ำเงิน) ดูสว่างกว่า luminance ที่วัดได้ [Corney2009 full_text] → ตาเราจะ *ประเมิน contrast ของตัวอักษรแดง/น้ำเงินสูงเกินจริง*
  ต้องวัดด้วย `color_tools.py contrast` เสมอ (**DERIVED**)
- CVD: มีใน COLOR_THEORY §7 แล้ว เพิ่มเพียง — observer metamerism (§9.5) คือเหตุผลเชิงฟิสิกส์ว่าทำไมคู่สีที่ "เหมือนกัน" สำหรับคนหนึ่งไม่เหมือนสำหรับอีกคน

---

## 9. Production pipeline — จากแสงจริงถึงหน้าจอผู้ชม

### 9.1 Spectral power distribution (SPD) และแหล่งแสง
- SPD = พลังงานแสงต่อความยาวคลื่น; สีที่เข้าตา = SPD ของแสง × reflectance ของผิว (× ความไวของ cone) — **EVIDENCE (ฟิสิกส์/colorimetry)** [CIE15_2018]
- D65 = ตารางสเปกตรัมแทน "แสงกลางวันเฉลี่ย" CCT ≈ 6504 K; **ไม่มีหลอดจริงที่ CIE รับรองว่าเป็น D65** [ISO_CIE_11664_2_2022 publisher_page]
- การรับรู้ไม่ได้รู้ SPD: ตา 3 ชนิด cone ให้ข้อมูลแค่ 3 ค่า จึงไม่พอจะแยก SPD ของแสงกับ reflectance ของวัตถุออกจากกัน [ShevellKingdom2008]

### 9.2 White balance และ computational colour constancy
- กล้อง/AI ต้องเดาสีของแสงเองเหมือนสมอง · สมมติฐานคลาสสิก: **gray-world** (ค่าเฉลี่ยของฉากควรเป็นเทา), **white-patch/max-RGB** (จุดสว่างสุดคือขาว),
  gray-edge; อัลกอริทึมแบ่งเป็น static / gamut-based / learning-based [Gijsenij2011 full_text] · คนเราใช้ cue มากกว่านั้น (specular, เงา, interreflection) [ShevellKingdom2008]
- **DERIVED (จาก gray-world)**: ฉากที่สีเดียวครองภาพ (ทะเลหัวหิน, ใบไม้, พื้นหลังส้ม) ทำให้ auto-WB ดึงทั้งภาพไปทางสีตรงข้าม → สีกรอบเพี้ยน
  วิธีแก้: ถ่ายคู่ grey card/ผ้าเช็ดเลนส์สีขาวในแสงเดียวกัน, ล็อก WB แบบ manual, หรือ pick neutral ในโปรแกรม
- **DERIVED (จาก Witzel 2018: ความไม่แน่นอนของคนอยู่ตามแกนน้ำเงิน–เหลือง/daylight)**: ความเพี้ยนแบบอุ่น/เย็นผู้ชมให้อภัยมากกว่าความเพี้ยนแบบเขียว/magenta
  → เวลาแก้ WB ให้แก้แกน tint (green–magenta) ให้เป๊ะก่อน แล้วค่อยเลือก temperature ตามอารมณ์

### 9.3 Transfer functions / gamma
| มาตรฐาน | primaries / white | transfer | หมายเหตุ |
|---|---|---|---|
| **sRGB** | ≈ BT.709 primaries, D65 | piecewise (linear ใกล้ดำ + power 2.4) ≈ gamma 2.2 | ค่าเริ่มต้นของเว็บ, CSS, PNG ของเรา [IEC61966_2_1] |
| **BT.709** (HDTV) | R(0.64,0.33) G(0.30,0.60) B(0.15,0.06), D65 | **OETF** ของกล้อง: linear 4.5·L ใต้ 0.018 + power 0.45 | ไม่ได้กำหนดจอ [ICC_BT709_Registry — search_summary] |
| **BT.1886** | — | **EOTF** ของจอ ≈ power 2.4 (เบี่ยงใกล้ดำตาม black level) | คู่กับ 709 [ICC_BT709_Registry] |
| **Display P3** | primaries ของ DCI-P3, **D65** | **sRGB transfer** | ใหญ่กว่า sRGB ~25% (พื้นที่)/~50% (ปริมาตร) — iPhone ถ่าย/แสดงแบบนี้ [MDN_DisplayP3 — search_summary] |

- ความสับสนที่เจอจริง: แพลตฟอร์มต่างกันตีความ 709 ต่างกัน (มีรายงานใน W3C discussion ว่า Apple ใช้ gamma ≈1.96) — **unverified**, จึงทดสอบคลิปบนมือถือจริงทุกครั้ง
- Pipeline ของเรา (HTML → PNG/MP4): ทำงานใน sRGB; ส่งออกวิดีโอเป็น Rec.709 SDR (มีรายละเอียดใน curriculum บทที่ 11 §4.4)

### 9.4 ICC profiles, rendering intents, gamut mapping
- ICC profile = ข้อมูลแปลงระหว่าง color space ของอุปกรณ์ ↔ **PCS** (profile connection space อิง CIE 1931) — "virtual destination for input transforms
  and virtual source for output transforms" · spec ปัจจุบัน v4.4 + iccMAX [ICC_Profiles publisher_page, tier S]
- **Rendering intents** (นิยามตาม ICC):
  - *Perceptual* — vendor-specific, ยอมเสีย contrast เพื่อรักษารายละเอียดทั้งช่วง → **ภาพถ่าย/ภาพ AI**
  - *Saturation* — ยอมเสีย hue เพื่อให้สีสดยังสด → กราฟ/แผนภาพ
  - *Media-relative colorimetric* — สีที่อยู่ใน gamut ตรง, map ขาวของสื่อเป็นขาวอ้างอิง → งานพิมพ์ทั่วไป, proof
  - *ICC-absolute colorimetric* — สีใน gamut ไม่เปลี่ยน (รวมสีกระดาษ) → spot colour, จำลองสื่อหนึ่งบนอีกสื่อ
- **Gamut mapping**: เมื่อสีต้นทางอยู่นอก gamut ปลายทาง ต้องเลือกว่าจะ clip หรือบีบทั้งช่วง; Morovič รวบรวมอัลกอริทึม 90+ แบบ และมีแนวทางประเมินของ CIE
  (TC 8-03) [Morovic2008 publisher_page] · ACES 1.3 เพิ่ม gamut compression ใน pipeline ภาพยนตร์ [ACES_Docs search_summary]
- **DERIVED สำหรับงานเรา**: (1) รูป iPhone (Display P3) ที่มี acetate เขียว/แดงสด → แปลงเป็น sRGB แบบ perceptual/compression ก่อนใส่ HTML ไม่งั้นเบราว์เซอร์/IG จะ clip
  เป็นก้อนสีแบน (2) โลโก้/สีแบรนด์ในงานพิมพ์ → relative colorimetric + ตรวจ proof (3) ห้ามแก้สีแบรนด์ "ด้วยตา" บนจอที่ไม่ได้ calibrate

### 9.5 Metamerism — ทำไมสีกรอบในร้านไม่เหมือนตอนลูกค้าเดินออกไปกลางแดด
- **Metamers** = สิ่งเร้าที่มี SPD ต่างกันแต่ให้ค่าสีเท่ากันภายใต้สภาพดูหนึ่ง · *illuminant metamerism* = คู่ที่เหมือนกันใต้แสงหนึ่งแต่ต่างใต้อีกแสง ·
  *observer metamerism* = เหมือนสำหรับคนหนึ่งแต่ไม่เหมือนสำหรับอีกคน [Berns2000_Metamerism — search_summary ของคำนิยามที่ยกมา]
- Witzel & Gegenfurtner ยกตัวอย่างตรงเป๊ะ: เสื้อในร้านที่แสงไม่ดีดูต่างเมื่อออกไปกลางแจ้ง = metamer mismatching; ในกรณีนี้ constancy *เป็นไปไม่ได้*;
  แต่ในโลกจริง metamerism เกิดไม่บ่อย [WitzelGegenfurtner2018 full_text] · **EVIDENCE**, high
- สำหรับกรอบแว่น: สองชิ้นส่วน (เช่น ขาอะซิเตทกับหน้ากรอบที่ผลิตคนละล็อต หรือกรอบกับ case) อาจเข้ากันใต้ LED ร้านแต่ไม่เข้ากันกลางแดด; และสีเดียวกันจะ "ดูต่าง"
  ใต้ LED ที่ color rendition ต่ำ แม้ไม่มี metamer pair (**DERIVED**)

### 9.6 Colour rendition ของแสง: CRI (Ra) → CIE Rf → IES TM-30
- CRI Ra (CIE 13.3-1995) ใช้กว้างในอุตสาหกรรม/กฎหมาย · CIE 224:2017 นิยาม **Rf** (colour fidelity) ด้วยตัวอย่างสี 99 ตัวและ colour space ใหม่ — แต่ CIE บอกเองว่า
  Rf "ไม่ใช่ตัวแทน Ra" สำหรับสเปก/กฎหมาย [CIE224_2017 publisher_page]
- **TM-30**: Rf (fidelity เฉลี่ย 99 CES), **Rg** (gamut: >100 = สีอิ่มขึ้นโดยเฉลี่ย), Rcs,hj (chroma shift 16 กลุ่ม hue), colour vector graphic; ใช้ CAM02-UCS ·
  งานวิจัย (Royer et al. 2016) พบว่าความชอบขับด้วย **red chroma + fidelity**: เกณฑ์ที่เสนอ — "normalness" 0% ≤ Rcs,h1 ≤ 8% กับ Rf ≥ 80;
  "preference" Rf ≥ 74 กับ Rg ≥ 100 หรือ 0% ≤ Rcs,h16/h1 ≤ 15% [Royer2017_TM30 full_text (สไลด์ DOE), tier C ที่สรุปงาน peer-reviewed]
- **DERIVED สำหรับร้านและการถ่ายสินค้า**: (1) ไฟถ่ายสินค้า/ไฟโต๊ะลองแว่น: เลือก Rf สูง (≥ 90 ถ้าหาได้) และ red chroma ไม่ติดลบ → ผิวลูกค้าและกรอบแดง/กระดองเต่าไม่หมอง
  (2) อย่าผสมหลอดคนละรุ่น/คนละ CCT ในจุดถ่ายเดียว (3) โพสต์ที่ต้องโชว์ "สีจริง" ควรมีช็อตแสงกลางวัน (ใกล้ D65) อย่างน้อยหนึ่งช็อต

### 9.7 Colour grading (ส่วนที่ไม่ซ้ำกับ curriculum บทที่ 11)
- Correction → grading ลำดับ, scopes, LUT, teal-orange อยู่ในบท 11 แล้ว
- **Scene-referred vs display-referred**: ACES เก็บภาพเป็นค่าแสงของฉาก (ACES2065-1, ACEScg linear AP1 สำหรับ CG/compositing, ACEScct log สำหรับเกรด) แล้วค่อย
  แปลงเป็นจอด้วย output transform [ACES_Docs] → หลักคิดที่ใช้ได้แม้เราไม่ใช้ ACES: *ผสม/คอมโพสิตในค่าแสงเชิงเส้น เกรดหลังจากนั้น แปลงเป็นจอเป็นขั้นสุดท้าย* (**DERIVED**)
- กรณีศึกษาที่มีแหล่ง: *O Brother, Where Art Thou?* (2000) — ถ่ายหน้าร้อนใบไม้เขียวจัด; Deakins + colorist Julius Friede เลือกเฉพาะเขียวของต้นไม้/หญ้าเปลี่ยนเป็น
  "dry browns and yellows" ให้ความรู้สึก "old, hand-tinted postcards"; แทบไม่แตะอย่างอื่น ("affected the greens and played with the overall saturation but little
  else") เพราะยิ่งแต่งยิ่งเกิด noise; ใช้เวลา ~10 สัปดาห์ที่ Cinesite [Deakins2000_ASC full_text, tier C]
  → บทเรียน: grade ที่ดีเปลี่ยน *ความสัมพันธ์* (เขียว→เหลือง ทั้งฉาก) โดยปกป้อง memory colours (ผิว) — ตรงกับงานวิจัย memory colour [WitzelGegenfurtner2018]

---

## 10. Method A — วิเคราะห์ palette ของภาพอ้างอิงทีละขั้น

เป้าหมาย: ได้ "ความสัมพันธ์" ที่ทำให้ภาพนั้นทำงาน ไม่ใช่แค่ hex 5 ตัว

1. **บันทึกบริบทการดู** — ภาพนี้ถูกออกแบบให้ดูขนาดไหน (thumbnail/เต็มจอ), พื้นหลังจอขาว/ดำ — เพราะ size และ surround เปลี่ยนการรับรู้ (COLOR_RELATIVITY §5)
2. **วัด** `python .claude/skills/ai-visual-artist/tools/analyze_image.py ref.png --overlay ref_overlay.png`
   - `value.key`, `mean_L`, `rms_contrast`, `notan_3_pct` → โครง value (อ่านก่อนสีเสมอ)
   - `color.dominant[]` (hex, share_pct, oklch) → สีหลักตาม *พื้นที่*
   - `color.mean_chroma`, `hue_spread_deg`, `harmony_guess` → ความสดรวมและความกว้างของ hue
   - `color.warm_pct` / `cool_pct` → indicator แบบ absolute (ดู §4)
   - `saliency_peaks` + overlay → จุดที่สายตาน่าจะไป
3. **แยกบทบาท**: จัด dominant เป็น neutral (C < ~0.02) / muted (~0.02–0.06) / chromatic (> ~0.06) แล้วหาว่า **accent** คือสีที่ share น้อยแต่ C สูงที่อยู่ใกล้ saliency peak
   (k-means อาจรวม accent เล็ก ๆ เข้ากับสีอื่น — ถ้าสงสัยให้ crop บริเวณ focal แล้ววัดซ้ำ)
4. **ตรวจทีละคู่ที่อยู่ติดกันจริง**: `color_tools.py contrast A B` (luminance contrast), `color_tools.py info` (ดู L/C/h), เทียบ ΔL และ Δh ของคู่ subject/พื้น →
   ภาพนี้แยก subject ด้วย value, chroma หรือ hue? (งานวิจัยบอกว่า lightness contrast สำคัญต่อ preference มาก [SchlossPalmer2011])
5. **อ่านแสง**: highlight มีสีอะไร (= สีแสง key), เงาเลื่อนไปทางไหน (= สีแสง fill/ambient), มี reflected colour ไหม → บันทึกเป็นความสัมพันธ์ เช่น "key 3200K-ish warm,
   shadow ไปทาง h≈250 (ฟ้า), bounce จากพื้นไม้"
6. **ระบุ contrast ที่แบกภาพ** ด้วยศัพท์ Itten (hue / light-dark / warm-cool / complementary / simultaneous / saturation / extension) — เลือกได้ 1–2 ตัว
7. **ตรวจ CVD + text**: `color_tools.py cvd A B` คู่สำคัญ; ถ้ามีตัวอักษร วัด contrast บนจุดพื้นหลังที่สว่าง/มืดที่สุดใต้ตัวอักษร
8. **เขียนผล** เป็น 3–6 บรรทัด "relationship" (อ้าง id จาก `color_relationships.json` ถ้าตรง) + ตัวเลข L/C/h ของบทบาทหลัก — **ไม่ copy hex ไปทั้งชุด**
   เพราะสีเดียวกันในบริบทใหม่จะดูไม่เหมือนเดิม (relativity)
9. **ข้อจำกัด**: JPEG compression, การเกรดของต้นฉบับ, และ profile ที่ฝังมา (P3 vs sRGB) เปลี่ยนตัวเลขได้ — ถ้า profile ไม่ชัด ให้ถือว่าเป็นค่าประมาณ

## 11. Method B — เลือกสีให้ตรงจุดประสงค์ (value ก่อนเสมอ)

1. **Purpose + ผู้ชม + ที่แสดง** (IG feed 1:1? Reels 9:16 บนมือถือกลางแดด? ใบปลิว?) → กำหนดเกณฑ์ contrast ขั้นต่ำและ gamut ปลายทาง
2. **Value structure ก่อน** — เลือก key (high/mid/low) และ notan 2–3 ระดับ; subject ต้องอยู่คนละระดับ value กับพื้นที่ติดกัน (ตรวจด้วย grayscale/`notan_3_pct`)
   *เหตุผล*: ความต่าง value เป็นตัวแบก legibility (WCAG ใช้ luminance) และ preference ของคู่สี [W3C_WCAG21, SchlossPalmer2011]; chroma กับ luminance เป็นช่องข้อมูลอิสระกัน
   — chroma ช่วยแยกวัตถุ ส่วน luminance รับภาระเงา/shading [WitzelGegenfurtner2018] → **EVIDENCE + DERIVED**
3. **บริบท/surround** — สีจะถูกมองเทียบกับพื้นรอบ (simultaneous contrast, adaptation): ตั้งสีพื้นก่อน แล้วค่อยตั้งสีวัตถุ *บนพื้นนั้น*
4. **วัสดุ** — acetate (dielectric: highlight สีแสง, local colour ชัด), โลหะ (สะท้อนสภาพแวดล้อม, local colour น้อย), TR90 ด้าน (local colour เด่น, highlight กว้างนุ่ม),
   เลนส์ AR/mirror (สะท้อน; ต้องมี lens layer) → วัสดุบอกว่า "สีอยู่ตรงไหน" ของวัตถุ
5. **แสง** — เลือก key/fill temperature ให้เป็นความสัมพันธ์ (warm key/cool shadow หรือกลับกัน) แล้วใช้ *ทั้งภาพ* (รวมผิว) เพื่อให้อ่านเป็นแสง ไม่ใช่สีวัตถุ [LaferSousa2015]
6. **อารมณ์/ความหมาย** — ตัดสินท้ายสุด และใช้ระดับ association (Jonauskaite, Ou: warm–cool/heavy–light/active–passive) + บริบทไทย (§7.2) + ความหมายแบบสัมพัทธ์ในชุด
   [Schloss2024]; ห้ามอ้าง causal claim
7. **Dominance + saturation hierarchy** — hue family หลัก 1, รอง 1, accent ≤ 1; chroma สูงสุดที่ focal
8. **ตรวจ** `color_tools.py palette` / `contrast` / `cvd`; render → `analyze_image.py`; ดูที่ขนาด thumbnail และเต็มจอ; ถ้าเป็นสินค้า เทียบกับรูปจริงใต้แสงกลางวัน
9. **บันทึก** ความสัมพันธ์ที่ใช้ (id) ลงใน job/kit เพื่อให้ภาพต่อ ๆ ไปของชุดเดียวกันใช้ความสัมพันธ์เดิม

---

## 12. Topic cards (ฟิลด์ตาม brief) — หัวข้อหลัก

> คอลัมน์: Def = นิยาม · Found = foundation · Correct / Incorrect · Exc = ข้อยกเว้น · Emo = ใช้เชิงอารมณ์ · Tech = ใช้เชิงเทคนิค · Mist = ความผิดพลาดบ่อย ·
> Tier/Conf = ระดับหลักฐาน/ความมั่นใจ · ตัวอย่างภาพเขียนเป็นคำบรรยาย (งานเรา)

**Hue / value / chroma / saturation** — Def §1 · Found EVIDENCE (CAM attributes) · ตัวอย่าง: สไลด์ Mint & Tao ถ่านดินสอบนกระดาษครีม + accent peach — accent ต้อง C สูงกว่าพื้น
แต่ L ใกล้กันได้ · Correct: สั่งแยกแกน · Incorrect: "เพิ่ม saturation" ใน HSL แล้วเหลืองจ้าจนตัดกับตัวอักษรไม่ได้ · Exc: งานโมโนโครมถ่าน (C≈0) ใช้ value อย่างเดียว ·
Emo: chroma ต่ำ = นิ่ง/ความทรงจำ (CRAFT) · Tech: OKLCH ramps · Mist: เชื่อ HSL L · Keys: Moroney2002, Li2017_CAM16, Smith1978, Ottosson2021_Okhsv · Tier A/S · Conf high

**Additive / subtractive / pigment / CMYK** — Def §2 · Found EVIDENCE (ฟิสิกส์, K–M) · ตัวอย่าง: carousel style สีน้ำ ฟ้าซ้อนเหลืองต้องได้เขียวสด ไม่ใช่เทา · Correct: ผสม pigment ใน raster/AI ·
Incorrect: CSS blend น้ำเงิน+เหลือง · Exc: style "digital flat" ที่ตั้งใจให้ผสมแบบแสง · Emo: — · Tech: linear-light blend, ตรวจ CMYK gamut ก่อนพิมพ์ ·
Mist: คิดว่า RGB average = ผสมสี · Keys: SochorovaJamriska2021, KubelkaMunk1931, IEC61966_2_1 · Tier A · Conf high

**CIE XYZ / CIELAB / OKLab / CAM16 / Munsell** — Def §3 · Found EVIDENCE · ตัวอย่าง: วัดความเพี้ยนสีโลโก้ Phthalo ระหว่างไฟล์กับภาพ AI ด้วย ΔE ใน Lab/OKLab · Correct: วัดใน uniform space ·
Incorrect: วัด ΔE ใน RGB หรือ XYZ · Exc: appearance ต่างบริบท → ΔE ไม่พอ ใช้ CAM · Tech: OKLCH สำหรับสร้าง, Lab/ΔE00 สำหรับวัด, Munsell สำหรับคุยแบบช่าง ·
Mist: หมุน 180° ใน Lab แล้วเรียก complementary · Keys: CIE15_2018, Newhall1943, Li2017_CAM16, Mahyar2007, Ottosson2020 · Tier S/A · Conf high

**Harmony schemes** — Def §5.1 · Found CRAFT (templates) + EVIDENCE (hue similarity, lightness contrast, additivity, ไม่มีหลักฐานว่า template ให้คะแนนสูง) · ตัวอย่าง: promo หัวหิน
ทะเลฟ้า-เขียว (analogous) + กรอบกระดองเต่าส้มน้ำตาล (complement แบบ muted) พื้นที่เล็ก · Correct: template หาไอเดีย + ตรวจทีละคู่ · Incorrect: triadic สดเท่ากันสามสี ·
Exc: สื่อเด็ก/สนุกที่ต้องการความจัด · Emo: analogous = กลมกลืน (CRAFT) · Tech: `color_tools.py harmony` แล้ว judge ใน composite · Mist: คิดว่าตรง template = สวย ·
Keys: ODonovan2011, OuLuo2006, Ou2011_Additivity, SchlossPalmer2011, CohenOr2006, Westland2007 · Tier A · Conf medium

**Dominance / proportion / saturation hierarchy / limited palette** — Def §5.2–5.4 · Found CRAFT (+ ODonovan 2–3 hues) · ตัวอย่าง: โพสต์ `_example` เทาอุ่น 93.6% + เขียว 3.3% ·
Correct: hue family หลักชัด, chroma สูงสุดที่ focal · Incorrect: สามสีพื้นที่เท่ากัน chroma เท่ากัน · Exc: pattern/textile design ที่ตั้งใจ all-over · Emo: limited palette = ความเป็นเรื่องเดียวกัน ·
Tech: `proportion_top3_pct`, crop focal วัดซ้ำ · Mist: ยึด 60-30-10 · Keys: Itten1961, Gurney2010, ODonovan2011, Unverified_60_30_10 · Tier D/A · Conf medium-low

**Discord** — Def §5.5 · Found CRAFT · ตัวอย่าง: night-optic ฉากผีในร้าน: ม่วงอ่อนสว่างกว่าป้ายไฟเหลืองหมองข้าง ๆ ในพื้นที่เล็ก · Correct: จุดเดียว เวลาสั้น · Incorrect: ทั้งเฟรม ·
Exc: — · Emo: ตึง แปลก ไม่สบายใจ (CRAFT) · Tech: กลับลำดับ L ของคู่ hue (ตรวจด้วย OKLCH L) · Mist: อ้างว่าพิสูจน์แล้ว · Keys: Harlan1986_Discord · Tier D · Conf low

**Local / reflected / environmental / specular** — Def §6 · Found EVIDENCE (Bloj, Witzel, PBR) + CRAFT (Gurney) · ตัวอย่าง: แว่นกรอบทองวางบนผ้าลินินเขียวมะกอก — ขอบล่างกรอบรับเขียวอ่อน,
highlight อมทอง, เลนส์สะท้อนหน้าต่าง · Correct: ใส่ bounce + เงาสีพื้น · Incorrect: cutout บนพื้นใหม่ไม่มี interaction · Exc: style flat graphic ที่ตั้งใจไม่มีแสง · Emo: อบอุ่นเชื่อมโยง ·
Tech: HTML layer เพิ่ม gradient สีพื้นใต้วัตถุ opacity ต่ำ · Mist: drop shadow ดำ · Keys: Bloj1999, WitzelGegenfurtner2018, Gurney2010, Burley2012 · Tier A · Conf high (หลักการ) / medium (ค่าที่ใช้)

**Colour psychology & symbolism** — Def §7 · Found EVIDENCE (association แข็ง, causal อ่อน) · ตัวอย่าง: แคปชัน "สีฟ้าช่วยให้สบายตา" → เปลี่ยนเป็น "โทนฟ้าที่หลายคนรู้สึกว่าสบายตา" ·
Correct: association + บริบท · Incorrect: red-sells · Exc: ข้อห้ามทางวัฒนธรรม (ไว้ทุกข์) ต้องเคารพแม้หลักฐานเชิงทดลองไม่มี · Emo: ใช้แกน warm–cool/heavy–light · Tech: ใช้หลาย palette ต่ออารมณ์ ·
Mist: ใช้ผลงานวิจัยเดี่ยว · Keys: Gnambs2020, Lehmann2018, Elliot2015, ElliotMaier2014, Jonauskaite2020, Schloss2024, PalmerSchloss2010 · Tier S/A · Conf medium

**Accessibility** — Def §8 · Found EVIDENCE/standard · ตัวอย่าง: ราคาโปรตัวแดงบนพื้นเขียว Phthalo — ตาบอกว่าเด่น (HK) แต่ contrast จริงอาจต่ำและ CVD แยกไม่ได้ · Correct: วัด, redundancy ·
Incorrect: ตัดสินด้วยตา · Exc: logotype · Tech: `contrast`, `cvd`, APCA เสริม · Mist: อ้าง APCA เป็นมาตรฐาน · Keys: W3C_WCAG22_Understanding143, W3C_WCAG3_WD, APCA_Nutshell, Corney2009, Machado2009 · Tier S · Conf high

**Pipeline (WB, gamma, ICC, gamut, metamerism, SPD, CRI/TM-30)** — Def §9 · Found EVIDENCE/standard · ตัวอย่าง: ถ่ายกรอบแดงในร้านใต้ LED ราคาถูก + ถ่ายอีกช็อตริมหน้าต่าง: ช็อตแรกแดงอมส้มหมอง ·
Correct: ล็อก WB, ไฟ Rf สูง, แปลง P3→sRGB แบบ perceptual · Incorrect: auto-WB ในฉากทะเล, clip P3 · Exc: งานอารมณ์ที่ตั้งใจให้แสงผิดสี (ป้ายนีออน) · Tech: grey card, scopes ·
Mist: แก้สีบนจอไม่ calibrate · Keys: Gijsenij2011, ICC_Profiles, Morovic2008, CIE224_2017, Royer2017_TM30, WitzelGegenfurtner2018, MDN_DisplayP3 · Tier S/A/C · Conf high

---

## 13. Contested / replication notes
- **Red effects**: ผล red→performance แทบหายเมื่อแก้ publication bias [Gnambs2020]; red→attractiveness เล็กและลดลงตามเวลา [Lehmann2018]; ผู้เสนอเดิมเองแนะนำให้ระวัง [Elliot2015]
- **Harmony templates**: งานข้อมูลใหญ่ไม่สนับสนุน [ODonovan2011] แต่ยังถูกใช้ในอัลกอริทึม harmonization [CohenOr2006] — ทั้งสองจริง: "ใช้ได้เป็นเครื่องมือ, ไม่เป็นเกณฑ์"
- **Thai basic colour terms**: 5 vs 9 vs 12 ขึ้นกับเกณฑ์นับ [Unthanon2020, Laophairoj2005]
- **#TheDress**: กลุ่ม Lafer-Sousa อธิบายด้วย prior ของแสง (ไม่สรุปเรื่อง chronotype ได้ — แนวโน้มไม่ significant); กลุ่มอื่น (Gegenfurtner et al. 2015 ฉบับเดียวกัน) เน้นการกระจายตาม
  daylight locus — สอดคล้องกันมากกว่าขัดกัน [LaferSousa2015, WitzelGegenfurtner2018]
- **APCA**: ผู้พัฒนาเรียกว่า candidate ของ WCAG 3, W3C draft บอกยังไม่กำหนด — เชื่อ W3C [APCA_Nutshell vs W3C_WCAG3_WD]
- **Opponent theory**: กรอบใหญ่ยอมรับ แต่ unique hues ไม่ตรงกับ cone-opponent channels [HurvichJameson1957 + search summaries]

## 14. Anti-patterns
- "สีนี้ทำให้ขายดี/ทำให้เชื่อใจ" ในเอกสารทีม → ผิดหลักฐาน
- ใช้ HSL S/L ตัดสินความสด/ความสว่างเท่ากัน
- copy hex ของภาพอ้างอิงมาวางในบริบทใหม่แล้วคาดว่าจะดูเหมือนเดิม
- หมุนวงล้อ 120°/180° แล้วถือว่าจบ
- ตัดพื้นแว่นไปวางพื้นสีจัด โดยไม่มี reflected colour, ไม่มี lens layer, และไม่ตรวจ simultaneous contrast บนกรอบใส/เทา
- auto-WB ในฉากสีเดียว แล้วโพสต์ว่า "สีจริง"
- ใช้สีวันเกิด/สีพระราชวงศ์เพื่อขายของ; ใช้ palette สดใสในช่วงไว้ทุกข์

## 15. Open questions / วิจัยต่อ
1. วัด SPD ของไฟร้านจริง (spectrometer มือถือราคาถูก) → คำนวณ Rf/Rg ด้วย tool ของ CIE 224
2. ทดลอง A/B ภาพ eyewear ที่มี/ไม่มี reflected colour ด้วย critique score ของ skill
3. หาข้อมูล colour–emotion/preference ของคนไทยโดยตรง (Jonauskaite dataset มีไทยหรือไม่ — เปิด Method section)
4. อ่านเต็ม: ICC.1 v4.4 (ฟรีที่ color.org), BT.709-6/BT.1886 (ฟรีที่ ITU), Foster 2011 (PMC), Royer 2016 LRT
5. ทดสอบ hypothesis ฟ้า/น้ำเงินในภาษาไทยกับ brief ของลูกค้าจริง (ถามทีม)
6. ทำสคริปต์ colour-script strip อัตโนมัติจากเฟรมคลิป (ดู `COLOR_SCRIPTING.md` §6)
