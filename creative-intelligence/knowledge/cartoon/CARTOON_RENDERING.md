# CARTOON RENDERING (M44): เส้น สี การลงแสงเงา และฉากหลัง ในงานการ์ตูน/ภาพประกอบ

ไฟล์คู่กัน: `rendering_recipes.json` (32 สูตร เอาไปทำได้ทันที) · `sources_render.json` (30 แหล่ง)
ไฟล์ที่ต้องอ่านคู่กัน (เนื้อหาในนั้นจะไม่เขียนซ้ำที่นี่):
- `../visual-arts/EDGE_CONTROL.md`: line weight, line quality, junctions (T/X/Y) และ hierarchy ของขอบ
- `../visual-arts/ADVANCED_COLOR_SCIENCE.md`: OKLCH, limited palette, saturation hierarchy, ICC/gamut (§9.4)
- `../visual-arts/VALUE_AND_NOTAN.md`, `COLOR_SCRIPTING.md`
- `story-clips/_craft/STYLES.md`: style catalogue A–N, scene layer stack, FLUX tips
- `.claude/skills/ai-visual-artist/ART_STYLE_LIBRARY.json`: style ที่มีอยู่แล้วและใกล้การ์ตูน (19 ตัว) ได้แก่
  `anime_cel, anime_painterly_bg, chibi_kawaii, western_cartoon_rubberhose, modern_cartoon_tv, webtoon_digital,
  vintage_comic_halftone, manga_bw_screentone, children_book_crayon, flat_vector, flat_illustration_corporate, risograph,
  storybook_gouache, gouache_flat, cel_shaded_3d, ink_line_clean, graphic_novel_noir, line_art_minimal, screenprint_poster`
  สูตรใน `rendering_recipes.json` **ต่อยอด** style เหล่านี้ในระดับการลงมือ render ผ่านฟิลด์ `extends_style_ids` โดยไม่ได้สร้าง style ใหม่ซ้ำ

ป้ายกำกับ: **[EVIDENCE]** มีงานวิจัยรองรับ · **[CRAFT]** ธรรมเนียมช่าง/ประสบการณ์โปรดักชัน (tier C–D) · **[DERIVED]** เราอนุมานเองจากหลักฐาน ยังไม่ได้ทดสอบ

---

## 0. Scope & status

**ครอบคลุม:** inking (brush/pen/digital, ลำดับน้ำหนักเส้น, เส้นนอก vs เส้นใน, สไตล์ไม่มีเส้น) · cel shading (เงา 1–2 tone, การออกแบบรูปเงา, rim light) ·
ธรรมเนียมสีแบบอนิเมะ (hue-shift ของเงา, รูปทรง highlight) · flat/vector · limited palette · texture styles (crayon, watercolour, gouache, riso, halftone/Ben-Day, screentone) ·
งานวิจัย NPR (Gooch shading, toon ramp, X-Toon, Cole 2008/2009, suggestive contours, XDoG) ในฐานะ "วิทยาศาสตร์ของสิ่งที่เส้นสื่อ" ·
ฉากหลังการ์ตูน (painted anime BG, flat TV BG, layout) · การรวมตัวละครเข้ากับฉาก · สีสำหรับจอ vs งานพิมพ์

**ยังไม่ครอบคลุม:** animation timing (on 2s, smear) ซึ่งอยู่ใน GUIDE.md · character design และ shape language (ดู `SHAPE_LANGUAGE.md`) · การออกแบบตัวอักษรในการ์ตูน (lettering) ·
งานวิจัยความชอบของผู้ใหญ่ต่อสไตล์การ์ตูนแต่ละแบบ (หาไม่เจอในรอบนี้) · ประวัติ ligne claire และ Disney/Ghibli BG ในระดับวิชาการ (ได้มาเพียงระดับ practitioner)

**สถานะหลักฐาน:** แหล่งข้อมูล 30 รายการ อ่าน full text 22 รายการ (73%) ส่วนเรื่อง "เส้นสื่ออะไร" มีหลักฐานแข็งแรง (tier A)
แต่ธรรมเนียมสีการ์ตูน (hue-shift, รูปเงา, BG) ยังเป็น CRAFT เกือบทั้งหมด โดยมีงาน industry อย่าง TF2 และ Studio Pablo มารองรับ สูตรทุกสูตรมี `test_status: "untested"`

---

## 1. วิทยาศาสตร์ของเส้น: เส้นในภาพการ์ตูนบอกอะไรกับสมอง

### 1.1 เส้น = ขอบของวัตถุ ไม่ใช่ขอบของแสง
- **คืออะไร:** ในโลกจริงไม่มีเส้นรอบวัตถุ แต่สมองอ่าน line drawing ได้ทันที ทั้งทารก คนที่ไม่เคยเห็นภาพวาด และลิงชิมแปนซี
- **กลไก:** neuron ที่ไวต่อทิศทาง (V1–V4) วิวัฒน์มาเพื่อจับขอบ และตอบสนองต่อเส้นด้วย เส้นจึง "แทน" ขอบจริงได้
  ในภาพวาด เส้นแต่ละเส้นถูกอ่านว่าเป็น depth/slant discontinuity ถ้าวาดขอบเงาเป็นเส้น สมองจะอ่านว่าเป็นขอบวัตถุไปด้วย แล้วภาพจะพัง [EVIDENCE: SayimCavanagh2011, BiedermanJu1988]
- **ใช้กับงาน:** (1) ห้ามใช้เส้นดำเดียวกับ outline ลากรอบเงา ให้ใช้ "รูปสี" แบบ cel shadow หรือเส้นสีของเงาแทน (`colour_held_lines`)
  (2) ทุกเส้นในตัว Mint & Tao ต้องมีความหมาย คือเป็นขอบ รอยพับ หรือการบัง
- **ข้อจำกัด:** เป็นบทความ perspective ที่รวบรวมงานอื่น ยังมีธรรมเนียมทางวัฒนธรรมของเส้นอยู่ด้วย (เช่น speed line, เส้นอารมณ์) ซึ่งต้องเรียนรู้ · **ความมั่นใจ:** high

### 1.2 คนวาดเส้นที่ไหน: งบประมาณเส้น (line budget)
- **ผลวิจัย:** ศิลปินวาดเส้นตรงกันมาก โดย 75% ของเส้นอยู่ห่างจากเส้นของศิลปินคนอื่นไม่เกิน 1 mm และขอบนอก (exterior boundary) ครอง 35–50% ของเส้นทั้งหมด
  interior occluding contour ครอง 10–20% ที่เหลือส่วนใหญ่อยู่บน gradient ความสว่างแรง ๆ (ridge/valley, apparent ridge, suggestive contour)
  วัตถุเหลี่ยมใช้ ridge line มาก ส่วนวัตถุนุ่มใช้เส้นในน้อย และราว 14% ของเส้นอธิบายด้วยคุณสมบัติท้องถิ่นใด ๆ ไม่ได้ ส่วนนี้คือ "สไตล์" [EVIDENCE: Cole2008]
- **ใช้กับงาน:** ลำดับการใส่เส้นคือ silhouette → เส้นบังภายใน → เส้นสันหรือรอยพับไม่กี่เส้น กรอบแว่น โต๊ะ และกล่อง ต้องมี crease line ส่วนหน้า แขน และผ้า ใช้เส้นในน้อย
- **ความมั่นใจ:** high (เฉพาะ grey 3D model ที่วาดโดยนักศึกษาศิลปะ)

### 1.3 เส้นอย่างเดียวพอไหม
- ถ้าใช้ contour อย่างเดียว คนอ่านรูปทรงได้แย่กว่าสไตล์อื่นชัดเจน พอเพิ่ม suggestive contour, ridge หรือ apparent ridge แล้ว บางรูปทรงอ่านได้ใกล้เคียงภาพที่ลงเงา
  แต่รูปทรงนุ่ม ๆ แบบก้อน (blobby) ยังอ่านยากแม้จะลงเงาแล้ว [EVIDENCE: Cole2009]
- **Suggestive contour** คือเส้นสั้น ๆ ตรงจุดที่ผิวกำลังจะหันหนีจากกล้อง เช่นข้างจมูกในมุมหน้าตรง หรือใต้แก้ม เส้นพวกนี้ช่วยให้ภาพเส้นน้อยอ่านง่ายขึ้น [EVIDENCE เชิงภาพ: DeCarlo2003; ทดสอบเชิงปริมาณใน Cole2009]
- **ใช้กับงาน:** ภาพเส้นน้อยของ Slowly Growing ควรเพิ่ม "รูปเงานุ่มหนึ่งก้อน" ที่ตัว เบาะ หรืออาหาร แทนการเพิ่มเส้น (`sparse_suggestive_line`) · **ความมั่นใจ:** medium-high

### 1.4 ฉากหลังด้วยเส้น: เก็บเส้นยาว ทิ้งเส้นสั้น
- จาก fMRI ถอดรหัสประเภทฉาก (ชายหาด เมือง ป่า ฯลฯ) จาก line drawing ได้ดีเท่าภาพถ่าย และในการทดลองพฤติกรรม การลบ **เส้นยาว** ทำให้แยกประเภทฉากแย่ลงมากกว่าการลบเส้นสั้น
  เพราะเส้นยาวพาโครงสร้างใหญ่ของฉากไว้ [EVIDENCE: Walther2011]
- **ใช้กับงาน:** ฉากของ Mint & Tao ต้องเก็บเส้นขอบฟ้า ขอบผนังกับพื้น และขอบโต๊ะใหญ่ไว้ แล้วตัดรายละเอียดเล็กออกก่อน (`line_bg_light_char_heavy`) · **ความมั่นใจ:** medium (มีผู้ร่วมการทดลองเพียง 10 คน)

### 1.5 สูตรคำนวณที่นำมาใช้ได้
- **XDoG:** เส้นจาก DoG มีความหนาที่แปรตามขนาดของขอบ จึงดูเหมือนวาดมือมากกว่า Canny ที่หนาเท่ากันทุกเส้น ใช้แปลงฉาก FLUX ให้เป็น line art [EVIDENCE เชิงเทคนิค: Winnemoller2012_XDoG]
  ข้อควรระวังคือเครื่องมือนี้ยังลากเส้นตามขอบแสงอยู่ ซึ่งเป็นปัญหาตาม §1.1 จึงต้องลบเส้นที่เกิดจากขอบเงาออกเองด้วยมือ
- **ความหนาเส้นตาม isophote distance:** ส่วนที่อยู่ใกล้หรือโค้งน้อยได้เส้นหนา ส่วนที่ไกลหรือโค้งมากได้เส้นบาง (Hertzmann2010, ต่อจาก EDGE_CONTROL 2.4)
- **NPR เป็นวิธีทดสอบสมมติฐานศิลปะ:** "กฎสไตล์" ทุกข้อควรถูกทดสอบแบบ A/B ไม่ใช่เชื่อเพราะดูสวยครั้งเดียว [Hertzmann2010]

---

## 2. Inking: brush / pen / digital

| | Brush | Technical pen | Digital (vector/stabilised) |
|---|---|---|---|
| ลักษณะเส้น | หนา-บาง ปลายเรียว, dry-brush | หนาเท่ากัน คม | แล้วแต่ตั้งค่า, มักเรียบเกิน |
| เงา | spotting blacks (ก้อนดำ) | hatching / cross-hatch | cel shape / tone |
| อารมณ์ [CRAFT] | มีชีวิต ดราม่า | ละเอียด เป็นเทคนิค | สะอาด ทันสมัย |
| recipe | `brush_ink_tapered` | `pen_hatching` | `cel_1tone_tv`, `ligne_claire` |

- **ลำดับน้ำหนักเส้นและเส้นนอก vs เส้นใน:** ดู EDGE_CONTROL 2.4 (silhouette > crease > texture, เส้นด้านเงาหนา, ปลายอิสระเรียว)
  ส่วนที่เพิ่มในที่นี้: **ในการ์ตูน เส้นในควรเป็นสี** คือใช้สีเข้มของพื้นที่ติดกัน (colour hold) แทนเส้นดำ ทำให้หน้าและผมนุ่มขึ้นโดยรูปไม่แตก [CRAFT: ClipStudio_AnimeSkin; สอดคล้องกับ SayimCavanagh2011]
- **สีของเส้น:** ดำสนิทบนฉากที่วาดสีจะดูแข็ง ใช้น้ำตาลเข้มอุ่นแทน (STYLES.md §3) ทิศนี้สอดคล้องกับ Gooch1998 ที่สงวนค่าสุดขั้วไว้ให้เส้นและ highlight
- **สไตล์ไม่มีเส้น (line-less):** ขอบเกิดจากความต่างของ value ไม่ใช่ hue อย่างเดียว ถ้าสองพื้นที่ที่อยู่ติดกันมี luminance เท่ากัน ขอบจะหายไป (EVIDENCE เรื่อง equiluminance อยู่ใน ADVANCED_COLOR_SCIENCE §8)
  ให้ทดสอบด้วย `filter: grayscale(1)` เสมอ (`lineless_shapes`) [DERIVED]
- **Rim light แทน outline:** นักวาดภาพประกอบเชิงพาณิชย์ต้นศตวรรษที่ 20 (ตามที่ TF2 สรุปไว้) เน้น silhouette ด้วย rim highlight แทนเส้นดำ
  ใช้ได้ดีเฉพาะบนพื้นหลังสีเข้มหรือกลาง (`rim_no_outline`) [CRAFT tier C: Mitchell2007_TF2]

---

## 3. Cel shading

### 3.1 เงา 1 หรือ 2 tone
- **คืออะไร:** แบ่งแสงออกเป็นแถบสีเรียบที่มีขอบคม ในงาน 3D ทำด้วย 1D toon ramp ที่ใช้ Lambert term เป็น index และวาง texel สว่างไม่กี่ตัวที่ปลายฝั่งสว่างให้เป็น pseudo-highlight [EVIDENCE เชิงเทคนิค: Lake2000 (summary), Mitchell2007_TF2]
  X-Toon เพิ่มแกนที่สอง (ระยะลึก/ทิศ) ทำให้ของไกลมีจำนวน tone น้อยลงและ contrast ต่ำลง [Barla2006_XToon (summary)]
- **ใน SVG/CSS:** ใช้ `feComponentTransfer` กับ `type="discrete"` ทำ posterise แทน ramp ได้ (`toon_ramp_3d_product`, `depth_abstraction_bg`)
- **เลือกจำนวน tone:** 1 tone สำหรับคลิปทีวีและ puppet ส่วน 2 tone (เงาใหญ่ + เงาลึกตรงรอยพับ/การบัง) สำหรับภาพนิ่งหรือ thumbnail
  ถ้าตัวละครสูงน้อยกว่าประมาณ 300 px ให้ตัด tone ที่ 2 ทิ้ง [DERIVED]

### 3.2 รูปเงาเป็นงานออกแบบ ไม่ใช่ผลคำนวณ
- toon shader ปกติสร้างเงาที่ไม่ต้องการ เช่นก้อนดำทับตา ผู้กำกับจึงต้องลบเงาบางก้อนและ **เพิ่มเงาที่ไม่มีจริงทางฟิสิกส์** เข้าไป เช่นใต้ตาเพื่อให้ดุ หรือใต้จมูกเพื่อให้มีมิติ [EVIDENCE เชิงโปรดักชัน: Todo2007]
  ผิวเพียงแค่ "โดนแสง" หรือ "ไม่โดนแสง" ดังนั้น normal ที่เปลี่ยนเล็กน้อยก็ทำให้เกิดก้อนเงาใหญ่ได้ [CRAFT: Motomura2015_GGXrd snippet]
- TF2 ออกแบบรายละเอียดภายในตัวละคร "ด้วยรูปเงา" และรอยพับเสื้อที่ล้อรูป silhouette [CRAFT: Mitchell2008_GDC]
- **ใช้กับงาน:** puppet ใน `rig.js` ควรวาดรูปเงาแยกต่อ pose (แค่ path ที่ clip กับรูปฐาน) แทนการคำนวณ และห้ามให้เงาทับตา/ปาก ยกเว้นตั้งใจให้ดูน่ากลัว · **ความมั่นใจ:** medium-high

### 3.3 สีของเงา: hue-shift ไม่ใช่ใส่ดำ
- **Gooch1998 [EVIDENCE เชิงวิธี]:** เมื่อมีเส้นดำและ highlight ขาว การลงเงาต้องอยู่ใน mid-tone เท่านั้น ทิศของผิวสื่อด้วย hue (เย็นสำหรับฝั่งที่หันหนี อุ่นสำหรับฝั่งที่รับแสง)
  ใช้สูตร `I = ((1+l·n)/2)·k_cool + (1−(1+l·n)/2)·k_warm` โดย `k_cool = blue(b) + α·k_d` และ `k_warm = yellow(y) + β·k_d` ค่าตัวอย่าง b=y=0.4, α=0.2, β=0.6 และผู้เขียนระบุว่าตัวเลขเป๊ะ ๆ ไม่สำคัญ
- **ธรรมเนียมภาพประกอบเชิงพาณิชย์ (TF2) [CRAFT]:** เงาไปทางเย็น ไม่ใช่ดำ ความสดสูงขึ้นที่ terminator (เส้นแบ่งแสง-เงา) ซึ่งมักอมแดง
- **ธรรมเนียมอนิเมะ (practitioner) [CRAFT tier D]:** เงาผิวใช้สีพีช/ส้มอุ่น หรือม่วง/ฟ้าเย็น แต่ไม่ใช้เทาหรือดำ ซึ่งทำให้ผิว "ตาย" ทำ cel ก่อน แล้วค่อยเกลี่ยเฉพาะขอบ และ tone ที่ 2 เป็น optional [ClipStudio_AnimeSkin]
- **สูตรเริ่มต้น [DERIVED, untested]:** ใน OKLCH ให้เงา 1 มี L −0.12 ถึง −0.18, C +0.01 ถึง +0.03 และ h เลื่อนไปทางน้ำเงิน/ม่วง 10–25° ส่วนเงา 2 มี L −0.25
  ระวังสีเหลืองและส้ม เพราะถ้าเลื่อน hue ไปทางน้ำเงินมากจะกลายเป็นเขียวขุ่น ควรเลื่อนไปทางแดงหรือม่วงแทน (ตามลำดับ natural value of hues ใน ADVANCED_COLOR_SCIENCE §1)
- **ข้อจำกัด:** hue-shift ทำให้การรับรู้สีจริงคลาดเคลื่อน (Gooch1998 ยอมรับข้อนี้) ห้ามใช้กับสีกรอบแว่นที่ต้องตรงกับสินค้า ให้คงสีจริงไว้ในแถบที่รับแสง (`toon_ramp_3d_product`)

### 3.4 Highlight เป็นรูปทรง
- highlight แบบการ์ตูนคือรูปทรงที่ศิลปินออกแบบเอง (เลื่อน หมุน แยกเป็นสองชิ้น หรือทำเป็นเหลี่ยม) และแก้ต่อ keyframe [EVIDENCE เชิงเทคนิค: AnjyoHiramitsu2003 (abstract)]
- ธรรมเนียมอนิเมะ [CRAFT]: ผมใช้แถบหรือวงแหวนตามทรงหัว ตาใช้จุดใหญ่หนึ่งจุดบวกจุดเล็ก ผิวใช้จุดเล็กหรือเส้นหยักที่โหนกแก้ม เปลือกตา และริมฝีปาก [ClipStudio_AnimeSkin]
- **แว่น:** ให้ใช้แถบขาวทแยงหนึ่งแถบต่อเลนส์ และเส้นฉากหลังต้องวิ่งผ่านเลนส์ไป (X-junction ตาม EDGE_CONTROL 2.7) ซึ่งตรงกับ house rule เรื่อง "lens layer" (`glasses_lineart_lens`)

---

## 4. สี: flat, limited, การ์ตูนบนจอ vs งานพิมพ์

- **ลักษณะร่วมของภาพการ์ตูน (CV research):** โครงสร้างเป็นบล็อกสีเรียบไม่กี่บล็อก รายละเอียดล้อมด้วยขอบคม และผิวเรียบ [EVIDENCE เชิงพรรณนา: WangYu2020, ChenLaiLiu2018]
  ถ้าภาพ FLUX ดู "เป็นภาพวาด ไม่ใช่การ์ตูน" สิ่งที่ขาดมักเป็นขอบคมกับการลงเงาที่แบนกว่านี้ ให้ระบุสองอย่างนี้ใน prompt ตรง ๆ
- **Limited palette 3+1:** ดู ADVANCED_COLOR_SCIENCE §5.2–5.4 ส่วนที่เพิ่มคือ TF2 ใช้ "สีหม่นเป็นส่วนใหญ่และสีสดเป็นพื้นที่เล็ก" และให้ฉากทั้งฉากหม่นกว่าตัวละคร [CRAFT tier C] (`limited_palette_3p1`)
- **Flat vector:** ใช้ token สี 4–6 สี มุมโค้งเท่ากันทั้งชุด และ long shadow ทำมุมเดียวกันทั้งภาพ (`flat_vector_geometric`) [CRAFT]
- **ข้อจำกัดของงานพิมพ์:**
  - comic ยุค Golden Age มีสีจริงเพียง 64 สี คือ C/M/Y ที่ 0 / ~20–25 / ~40–50 / 100% ไม่มี gradient จุด dot ในการ์ตูนจริงเล็กกว่าภาพ "pop-art" มาก
    ความไม่สม่ำเสมอของเส้นและ dot มาจากการกัดแม่พิมพ์และกระดาษ ไม่ได้ตั้งใจ [tier C expert: Lawley2016_BenDay] (`vintage_halftone_comic`)
  - RGB กว้างกว่า CMYK สีนีออนพิมพ์ไม่ได้ และเมื่อแปลงแล้วจะหม่นลง total ink limit อยู่ที่ 235–320% ตามชนิดแท่นพิมพ์และกระดาษ ตัวหนังสือเล็กใช้ 100% K
    ให้ขอ proof ทุกครั้ง [tier C: Walsworth2024_ComicPrint; ICC/gamut ดู ADVANCED_COLOR_SCIENCE §9.4] (`print_cmyk_comic`)
  - Riso พิมพ์ทีละสีด้วยหมึก spot ไฟล์ต้องแยกเป็น grayscale ทีละหมึก และพื้นทึบควรลดเหลือ 80–90% พิมพ์สีอ่อนก่อนสีเข้ม หมึกเรืองแสงไม่มีค่าเทียบใน RGB [tier C: UIUC_RisoGuide] (`risograph_overprint`, `duotone_spot`)
- **จอมือถือ:** glow, neon และ gradient airbrush แบบ webtoon เป็นของจอโดยแท้ งานที่ตั้งใจจะพิมพ์ต้อง soft-proof ก่อนออกแบบ [DERIVED]

---

## 5. Texture styles

| สไตล์ | ผลจริงที่ต้องเลียนแบบ (ไม่ใช่แค่ filter) | หลักฐาน | recipe |
|---|---|---|---|
| Watercolour | ขอบเข้ม (edge darkening) จากเม็ดสีที่ไหลไปขอบตอนแห้ง, granulation ในร่องกระดาษ, backrun, glaze โปร่งซ้อน | Curtis1997 (A, สรุปจากธรรมเนียมช่าง) | `watercolor_picturebook` |
| Gouache | ระนาบทึบ value เป็นขั้น, ทาสีอ่อนทับสีเข้มได้, ขอบ dry-brush | CRAFT | `gouache_flat_bg` |
| Crayon/oil pastel | ฟันกระดาษเป็นจุดขาว, ทิศการระบายเป็น scribble | CRAFT | `crayon_picturebook` |
| Coloured pencil | ชั้นเส้นทิศเดียว, ค่าตามแรงกด | CRAFT | `colored_pencil_soft` |
| Riso / duotone | overprint สร้างสีที่สาม, misregistration, grain | UIUC_RisoGuide (C) | `risograph_overprint` |
| Halftone/Ben-Day | dot เฉพาะ tint อ่อน, palette 64 สี | Lawley2016 (C) | `vintage_halftone_comic` |
| Screentone | เทาจาก pattern, highlight ขูดขาว | CRAFT | `manga_screentone` |

- **ข้อควรระวังทางเทคนิค [DERIVED]:** pattern ละเอียด (hatching, tone, fine pencil) จะเกิด moiré หรือหายไปเมื่อ IG/TikTok บีบอัดหรือย่อภาพ ให้ render ที่ขนาดสุดท้าย และเว้นระยะ pattern ≥ 3 px
- **Picture-book สำหรับเด็กเล็ก [EVIDENCE: Strouse2018 (review), Ganea2008 ผ่านแหล่งรอง]:** เด็ก 15–30 เดือนถ่ายโอนความรู้จากหนังสือไปยังของจริงได้ดีกว่าเมื่อภาพสมจริง ส่วนภาพการ์ตูนยากที่สุด และความสามารถนี้ดีขึ้นตามอายุ
  สัตว์ที่ทำให้เหมือนคน (anthropomorphism) ทำให้เด็กแยกข้อเท็จจริงออกจากนิยายยากขึ้น **จึงไม่ควรใช้การ์ตูนจัด ๆ สอนข้อเท็จจริงเรื่องตา/แว่นให้เด็กเล็ก** สำหรับผู้ใหญ่ ยังไม่มีหลักฐานว่าผลนี้เกิดขึ้น

---

## 6. ฉากหลังการ์ตูน

### 6.1 Layout มาก่อนสี
- layout คือการตัดสินใจเรื่องเลนส์ มุมกล้อง composition เส้นพื้น และขอบฟ้า ก่อนลงมือวาด [tier C: DisneyAnimation_Layout]
  ใน 2D ช่าง layout วาดโครงมุมมองของ BG แล้วช่าง BG ลงสีทับ
- **Pipeline ของ BG อนิเมะ [CRAFT tier D: StudioPablo_Interview]:** art director กำหนดโลก → **art setting** (ลายเส้นที่เป็น "พิมพ์เขียวของเวที") → **art board** (ฉบับลงสีที่ใช้แชร์กับทีม) → วาด BG ทุก cut โดยอิง art board
  ตอนยาว 30 นาทีมีราว 250–400 cut โดย 70–80% ต้องวาด BG ใหม่ และการ reuse BG ตัดสินกันตั้งแต่ขั้น storyboard
- **ใช้กับงาน:** ทุกสถานที่ในซีรีส์ (ร้านแว่นตีสอง, ห้องของ Mint) ต้องมี 1 art setting (line/XDoG) และ 1 art board (สีหลักกับทิศแสง) แล้วให้ทุก prompt FLUX อ้างถึงย่อหน้าเดียวกันนี้ (ต่อจาก STYLES.md §5)

### 6.2 ฉากหลังสามตระกูล
1. **Painted anime BG:** ฉากระบายสีละเอียด ฟ้าใหญ่ และ aerial perspective ส่วนตัวละครเป็น cel ที่เรียบกว่าฉาก ความต่างของ "ความแบน" นี้เองที่แยกตัวละครออกจากฉาก (`anime_painterly_bg_cel_char`) [CRAFT + WangYu2020 เชิงพรรณนา]
2. **Flat TV / modernist:** ใช้ colour field และรูปเรขาคณิตแทนพื้นที่สามมิติ ซึ่งมีรากมาจาก graphic design สมัยใหม่ (UPA) [bibliographic: Bottini_UPA] ราคาถูก ทำได้หลายฉาก เหมาะกับงานตลกและ explainer (`tv_flat_bg`)
3. **Line BG:** ฉากเป็นเส้นที่บางและอ่อนกว่าตัวละคร เก็บเส้นยาวไว้ (Walther2011) เหมาะกับ storyboard และ Slowly Growing (`line_bg_light_char_heavy`)
- เมื่อฉากมีหลายชั้น ให้ทำ **depth abstraction**: ชั้นไกลลดจำนวน tone ลดเส้น ลดความสด และสว่างและเย็นขึ้น [Barla2006_XToon (summary); CRAFT] (`depth_abstraction_bg`)

### 6.3 รวมตัวละครกับฉาก (ต่อจาก STYLES.md §1 "match light/values/texture")
- **Value separation ก่อนเสมอ:** ตัวละครต้องเป็นจุดที่ contrast สูงสุดในภาพ TF2 วาง contrast สูงสุดไว้ที่ระดับอกซึ่งเป็นตำแหน่งที่ถืออาวุธ และไล่จากเท้าเข้มขึ้นไปอกสว่าง [CRAFT tier C: Mitchell2008_GDC]
  ในงานของเรา ให้ contrast สูงสุดอยู่ที่มือที่ถือแว่นหรือที่ใบหน้า
- **รายละเอียดและความสด:** ฉากหม่นกว่าและ noise น้อยกว่าตัวละคร มีของซ้ำ ๆ ให้น้อยที่สุด (เสาไฟ ราว) [CRAFT tier C: Mitchell2007_TF2]
- **เส้นในฉาก vs เส้นในตัวละคร:** เลือกหนึ่งในสามแบบ (ก) ฉากไม่มีเส้นแต่ตัวละครมีเส้น ซึ่งเป็นแบบอนิเมะและแบบที่ง่ายที่สุด (ข) ฉากมีเส้นบางและสีอ่อนกว่า (ค) ใช้เส้นเท่ากันทั้งภาพแบบ ligne claire แล้วใช้สีแยกตัวละคร
  ห้ามให้ฉากมีเส้นดำหนาเท่าหรือหนากว่าตัวละคร [CRAFT; DERIVED จาก EDGE_CONTROL 2.3]
- **Silhouette test:** ตัวละครและสินค้าต้องอ่านออกเมื่อเป็นเงาดำล้วน TF2 ใช้ข้อนี้ validate การออกแบบตัวละคร [CRAFT tier C]
- **Sticker keyline:** ถ้าต้องวาง cutout บนภาพถ่ายที่รก ให้ใช้ขอบขาวหนาแยกตัวออกจากพื้น (`sticker_keyline`) [CRAFT]

---

## 7. Contested / replication notes
- **Line drawing vs ภาพถ่าย ในการจำวัตถุ:** Biederman & Ju 1988 รายงานว่าเร็วพอกัน (เราเห็นผ่านแหล่งรองเท่านั้น) แต่มีงานภายหลังที่ชี้ว่าวัตถุที่มี "สีเป็นตัวบอก" (ผลไม้ อาหาร) พึ่งสีมากกว่า ความมั่นใจสำหรับงานของเราจึงอยู่ที่ medium:
  ภาพเส้นพอสำหรับ "จำได้" แต่สีอาจจำเป็นสำหรับ "อยากกิน/อยากซื้อ"
- **Cole2009:** line drawing ที่ดีอ่านรูปทรงได้ "เกือบ" เท่าภาพลงเงา แต่เฉพาะบางรูปทรง และค่าคลาดเคลื่อนยังสูง (35–40° ในรูปทรงที่ยาก) ไม่ควรสรุปว่า "เส้นอย่างเดียวพอเสมอ"
- **McCloud (amplification through simplification, หน้าเรียบช่วยให้คนดูอินกับตัวละคร):** ถูกอ้างถึงมาก แต่เป็นทฤษฎีช่างที่ยังไม่ผ่านการทดสอบ (tier D) และมีผู้โต้แย้ง ห้ามเขียนว่าเป็นข้อเท็จจริงทางจิตวิทยา
- **เด็กกับการ์ตูน:** ผลเรื่องภาพสมจริงช่วยการถ่ายโอนความรู้ใช้กับเด็กเล็ก (ราว ≤ 3 ขวบ) และงานสอนข้อเท็จจริงเท่านั้น ไม่ได้บอกว่าการ์ตูนดึงความสนใจหรือสร้างความชอบได้น้อยกว่า
- **Hue-shift shadow:** Gooch ให้เหตุผลทางการรับรู้แบบอ้อม ๆ (cool recede / warm advance และแสงฟ้า vs แสงแดด) แต่ไม่ได้ทดสอบกับผู้ใช้ จึงเป็น CRAFT ที่มีเหตุผลรองรับ ไม่ใช่ข้อพิสูจน์

## 8. Applied patterns (งานของเรา และใช้ได้กับทุกลูกค้า)
1. **Slowly Growing (charcoal + faceless):** ใช้ `charcoal_story_accent` โดยให้สี accent อยู่บนของในเรื่องเพียงชิ้นเดียว ฉากใช้ `line_bg_light_char_heavy` (เก็บเส้นยาว ใช้ทิศ hatching คนละทิศกับตัวละคร)
   และใส่รูปเงานุ่มหนึ่งก้อนเมื่อตัวละครกอดเข่าหรือนั่งบนเบาะ (Cole2009)
2. **ร้านแว่นตีสอง (night, 16:9):** ใช้ `rim_no_outline` หรือ `cel_1tone_tv` บนฉาก gouache/ink ให้เงาตัวละครเป็นสีฟ้าอมเขียวตามแสงจันทร์ ด้านที่หันหาโคมไฟมีขอบ terminator อุ่น และใช้ rim สีของแสงหลังตัวละคร
3. **Explainer เรื่องเลนส์ (ลูกค้าใดก็ได้):** ใช้ `gooch_cool_warm` สำหรับภาพตัดชั้นเลนส์ โดยใช้เส้นดำ เงา mid-tone และ highlight ขาวเฉพาะจุดเงาสะท้อน แล้วเปลี่ยนเป็น `flat_vector_geometric` สำหรับ infographic
4. **สินค้า (กรอบแว่น) แทรกในคลิปการ์ตูน:** ใช้ `toon_ramp_3d_product` + `glasses_lineart_lens` สีกรอบในแถบที่รับแสงต้องตรงกับของจริง ส่วนเลนส์ต้องเห็นฉากที่อยู่ด้านหลัง
5. **งานพิมพ์หน้าร้าน (โปสเตอร์ ใบปลิว):** ใช้ `print_cmyk_comic` คือ soft-proof ก่อน หลีกเลี่ยงชมพูนีออนและฟ้าไฟฟ้า ตัวหนังสือเล็กใช้ 100% K
6. **ลูกค้าอื่น (คาเฟ่ คลินิก การศึกษา):** สำหรับสื่อสอนเด็กเล็ก ใช้ภาพที่สมจริงกว่า เช่น `watercolor_picturebook` ที่รูปทรงแม่น แทน `chibi_round_line`

## 9. Anti-patterns
- ใช้เส้นดำลากรอบขอบเงา ทำให้เงากลายเป็น "วัตถุ" (SayimCavanagh2011)
- ทำเงาด้วยการใส่ดำ/เทา (multiply ดำ) ผิวจะตายและสีจะสกปรก ให้ใช้ hue-shift แทน
- ให้ toon shader สร้างเงาทับตา/ปาก แล้วปล่อยไว้แบบนั้น (Todo2007)
- ใช้เส้นหนาเท่ากันทุกเส้นโดยไม่ได้ตั้งใจทำ ligne claire (EDGE_CONTROL 2.4)
- ให้ฉากมีเส้นและรายละเอียดคมกว่าตัวละคร หรือมีความสดสูงกว่า
- ใช้ filter "cartoon" ที่ลากเส้นตามขอบแสงทั้งภาพ (Canny/XDoG ดิบ) จนได้เส้นเงาและเส้น noise เต็มภาพ
- ใช้ dot halftone ขนาดยักษ์แล้วเรียกว่า "comic แท้" หรือใส่ gradient ใน retro comic (Lawley2016)
- ใช้ texture ละเอียดที่หายหรือเกิด moiré บนมือถือ
- ทำงานพิมพ์ที่ออกแบบด้วยสีนีออนบนจอโดยไม่ soft-proof
- เขียน prompt ว่า "in the style of <ชื่อสตูดิโอ/ศิลปิน>" ให้บรรยายคุณสมบัติแทน (กฎของ STYLES.md)
- อ้างว่า "การ์ตูนทำให้คนอินมากกว่า" เป็นข้อเท็จจริงทางวิทยาศาสตร์ (เป็น craft ของ McCloud ที่ยังไม่ผ่านการทดสอบ)

## 10. Open questions / วิจัยต่อ
- ยังไม่มีงานวิจัยความชอบหรือการจดจำของผู้ใหญ่ (โฆษณา social) ต่อ cel vs painterly vs flat ควรค้นต่อใน advertising/marketing journals แล้วทำ A/B ใน feed ของเราเอง
- ควรอ่าน Lake2000, Barla2006 และ Anjyo2003 ฉบับเต็ม (ACM/HAL ปิดกั้นการเข้าถึงในรอบนี้) รวมถึง Motomura GDC handout
- ยังไม่มีแหล่งวิชาการเรื่อง BG อนิเมะ (art director ของ Ghibli หรือ Shinkai) และประวัติ ligne claire ควรค้นใน Animation Studies, Mechademia และ Journal of Graphic Novels and Comics
- ควรวัดจริงว่า hue-shift เท่าไรใน OKLCH ที่ดีที่สุดสำหรับผิวคนไทย (เทียบภาพ A/B กับ `critique` tools ของ ai-visual-artist)
- ควรวัดจริงว่า moiré และความละเอียดของ pattern เท่าไรที่รอดการบีบอัดของ IG/TikTok
- ควรเขียนเครื่องมือ: ตรวจ value separation ระหว่างตัวละครกับฉาก (ΔL เฉลี่ยในแถบรอบ silhouette) และตรวจว่าเส้นในฉากหนักกว่าเส้นตัวละครหรือไม่
