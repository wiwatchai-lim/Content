# บทที่ 1 — Photography Fundamentals (พื้นฐานการถ่ายภาพ)

> เป้าหมาย: เข้าใจว่า "แสงเข้ากล้องอย่างไร" จนอธิบายภาพใดก็ได้ด้วยตัวแปร 6 ตัว (ปริมาณแสง, รูรับแสง, ความเร็วชัตเตอร์, ISO, อุณหภูมิสี, ระยะโฟกัส) แล้วสั่ง AI ให้ได้ภาพแบบนั้นแทนการเดา
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — Exposure Triangle
ความสว่างของภาพ (exposure) มาจาก 3 ตัวที่ทำงานร่วมกัน ถ้าเปลี่ยนตัวหนึ่ง ต้องชดเชยด้วยอีกตัวเพื่อให้ความสว่างเท่าเดิม

| ตัวแปร | คุมแสงอย่างไร | ผลข้างเคียงทางภาพ (สิ่งที่สำคัญกว่าความสว่าง) |
|---|---|---|
| **Aperture (f-number)** | รูรับแสงกว้าง (f/1.4) แสงเข้ามาก / แคบ (f/16) แสงเข้าน้อย | **ระยะชัด (depth of field)** — f กว้าง = ฉากหลังละลาย, f แคบ = ชัดทั้งภาพ |
| **Shutter speed** | เปิดนาน (1/15 s) แสงมาก / สั้น (1/2000 s) แสงน้อย | **การเคลื่อนไหว** — เร็ว = หยุดนิ่ง, ช้า = เบลอตามการเคลื่อนที่ (motion blur) |
| **ISO** | ขยายสัญญาณเซนเซอร์ | **noise/เกรน** เพิ่มเมื่อ ISO สูง |

**Stop** = หน่วยของแสง: +1 stop = แสงเพิ่มเป็น 2 เท่า, −1 stop = ลดครึ่ง
- f-number เรียงทีละ stop: 1.4 → 2 → 2.8 → 4 → 5.6 → 8 → 11 → 16 (คูณ √2 ทุกขั้น)
- ชัตเตอร์: 1/1000 → 1/500 → 1/250 …
- ISO: 100 → 200 → 400 → 800 …
ตัวอย่าง: f/4 · 1/250 · ISO 400 สว่างเท่ากับ f/2.8 · 1/500 · ISO 400 (เปิดรูรับแสงเพิ่ม 1 stop และชัตเตอร์เร็วขึ้น 1 stop) ภาพสองใบนี้สว่างเท่ากัน แต่ใบที่สองฉากหลังเบลอกว่า

### 1.2 ขั้นสูง
- **Depth of field (DoF)** ขึ้นกับ 4 อย่าง: รูรับแสง, ระยะโฟกัส (ยิ่งใกล้ยิ่งตื้น), ทางยาวโฟกัสเลนส์, และ **circle of confusion** (ขนาดจุดเบลอที่ตายังมองว่าคม ขึ้นกับขนาดเซนเซอร์ ขนาดภาพที่ดู และระยะดู ค่าที่นิยมของฟูลเฟรมคือ ~0.03 mm)
- **Hyperfocal distance** H ≈ f² / (N·c) — โฟกัสที่ H แล้วทุกอย่างตั้งแต่ H/2 ถึงอินฟินิตีจะชัด เป็นเทคนิคของภาพวิว/สตรีท
- **Motion ในวิดีโอ — กฎ 180°:** ชัตเตอร์ ≈ 1/(2×fps) เช่น 24 fps → 1/48 s (ใช้ 1/50) ให้ motion blur ดูเป็นธรรมชาติแบบหนัง ถ้าชัตเตอร์เร็วกว่านี้มาก ภาพจะกระตุกแข็งแบบฉากสู้ใน Saving Private Ryan
- **Dynamic range & histogram:** histogram แสดงจำนวนพิกเซลในแต่ละระดับความสว่าง (ซ้าย = มืด, ขวา = สว่าง) ถ้ากองชนขอบขวา = highlight หลุด (clipping) เป็นขาวว่างกู้ไม่ได้ ถ้าชนซ้าย = เงาดำตัน ภาพกลางคืนที่ histogram กองซ้ายเป็นเรื่องปกติ ไม่ใช่ความผิด (สิ่งที่ต้องดูคือมีรายละเอียดตรงที่สำคัญหรือไม่)
- **ETTR (expose to the right):** ในไฟล์ RAW ให้เปิดรับแสงจนเกือบชนขวาแล้วค่อยลดในโพสต์ จะได้ noise ต่ำกว่า ห้ามใช้ถ้า highlight สำคัญจะหลุด
- **White balance / Color temperature (Kelvin):** ตัวเลขต่ำ = แสงส้ม (เทียน ~1900K, หลอดไส้ ~2700–3200K), ~5600K = กลางวัน, สูง = ฟ้า (เงาร่ม/ฟ้าครึ้ม 6500–8000K)
  - ระวัง: การตั้ง WB บนกล้องทำงานกลับด้าน ถ้าตั้งค่าต่ำ กล้องจะชดเชยจนภาพออกฟ้า
  - ภายใต้แสงผสม (หน้าต่าง + หลอดไส้) ไม่มี WB "ที่ถูกต้อง" ค่าเดียว ต้องเลือกว่าอะไรต้องเป็นกลาง (ส่วนใหญ่คือสีผิว)
  - การปล่อยให้ส่วนหนึ่งของภาพออกส้มและอีกส่วนออกฟ้าเป็นภาษาภาพที่นิยม (warm/cool contrast)
- **Inverse square law:** แสงลดลงตาม 1/ระยะ² ถ้าเลื่อนไฟห่างเป็น 2 เท่า แสงลดเหลือ ¼ (−2 stop) ใช้อธิบายว่าทำไมไฟที่วางใกล้ตัวแบบทำให้ฉากหลังมืด (ลงลึกในบทที่ 4)
- **Metering:** กล้องวัดแสงโดยพยายามให้ฉากเป็น "เทากลาง 18%" ฉากหิมะจึงออกมาเทาเกินไป (ต้อง +1~2 EV) และฉากมืดจึงออกมาสว่างเกินไป (ต้อง −EV) การชดเชยนี้เรียกว่า exposure compensation

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| EV / stop | หน่วยแสง ×2 หรือ ÷2 |
| f-number, T-stop | รูรับแสงตามสูตร / ตามแสงที่ผ่านจริง (เลนส์ซีเนม่าใช้ T) |
| Bokeh | ลักษณะความนุ่มของส่วนที่หลุดโฟกัส (กลม/เป็นเหลี่ยม/วงแหวน) |
| Shallow / deep focus | ชัดตื้น / ชัดลึก (Citizen Kane คือ deep focus) |
| Motion blur / freeze | เบลอตามการเคลื่อนที่ / หยุดการเคลื่อนไหว |
| Panning shot | ชัตเตอร์ช้าแล้วแพนตามวัตถุ ให้วัตถุคมแต่ฉากหลังเป็นเส้น |
| Long exposure | เปิดนานหลายวินาที เช่น น้ำนุ่มเป็นหมอก, เส้นไฟรถ |
| ND filter | ฟิลเตอร์ลดแสง ใช้เปิดรูรับแสงกว้างหรือชัตเตอร์ช้าในวันแดดจัด |
| Histogram, clipping | กราฟความสว่าง / ส่วนที่หลุดเป็นขาวหรือดำล้วน |
| High key / low key | ภาพโทนสว่าง เงาน้อย / ภาพโทนมืด คอนทราสต์สูง |
| Dynamic range | ช่วงจากมืดสุดถึงสว่างสุดที่เซนเซอร์เก็บได้ |
| Kelvin, WB, tint | อุณหภูมิสี / สมดุลขาว / แกนเขียว-ม่วง |
| Golden hour / blue hour | หลังพระอาทิตย์ขึ้นและก่อนตก แสงส้มนุ่ม / ช่วงหลังตกที่ฟ้าเป็นน้ำเงิน |
| RAW vs JPEG | ข้อมูลดิบแก้ได้มาก / ไฟล์ที่กล้องประมวลผลแล้ว |
| Noise / grain | จุดรบกวนดิจิทัล / เกรนฟิล์ม (เกรนฟิล์มดูมีเสน่ห์กว่า) |

---

## 3. ตัวอย่างงานจริง (การตั้งค่าที่ใช้กันจริง)
| สถานการณ์ | ค่าโดยประมาณ | เหตุผล |
|---|---|---|
| พอร์ตเทรตหน้าร้านแว่น แสงหน้าต่าง | 85mm · f/1.8 · 1/250 · ISO 200 · 5200K | ฉากหลังละลาย ลูกค้าเด่น ไม่มีภาพสั่น |
| ภาพสินค้ากรอบแว่นบนโต๊ะ | 100mm macro · f/8–f/11 · ขาตั้ง · ISO 100 | ต้องชัดตั้งแต่ขาแว่นถึงหน้าเลนส์ |
| วิวทะเลหัวหินตอนเช้า | 24mm · f/11 · โฟกัส hyperfocal | ชัดตั้งแต่โขดหินใกล้ถึงขอบฟ้า |
| ถนนกลางคืน ไฟรถเป็นเส้น | f/8 · 10–20 s · ISO 100 · ขาตั้ง | เส้นไฟ ภาพสะอาด |
| วิดีโอเล่าเรื่อง 24 fps | 1/50 · ND ปรับแสง · f/2.8 | motion blur แบบหนัง |
| กีฬา/เด็กวิ่ง | 1/1000+ · f/2.8 · Auto ISO | หยุดการเคลื่อนไหว |

สิ่งที่ช่างภาพทำจริงคือ **เลือกผลข้างเคียงก่อน** ("อยากได้ฉากหลังเบลอ" → f กว้าง) แล้วค่อยใช้อีกสองตัวชดเชยความสว่าง

---

## 4. นำไปใช้กับ AI Image / Video
1. **AI ไม่มีกล้อง แต่เรียนจากภาพที่มี metadata และคำบรรยาย** คำอย่าง `85mm, f/1.8, shallow depth of field` จึงดึงลักษณะภาพแบบนั้นมาได้ คู่มือของ Black Forest Labs (ผู้ทำ FLUX) แนะนำให้ **ระบุกล้อง/เลนส์/ฟิล์มจริง แทนคำว่า "professional photo"** แล้ว **บรรยายลักษณะที่ได้** (เกรน, สีเพี้ยน) ต่อท้ายด้วย
2. **บรรยายผลลัพธ์ ไม่ใช่แค่ตัวเลข:** ตัวเลขอย่างเดียวไม่พอ ต้องเขียนผลด้วย เช่น `f/1.4 → creamy background blur, only the eyes sharp` โมเดลเข้าใจคำบรรยายภาพดีกว่าคณิตศาสตร์
3. **Motion:** ในภาพนิ่งใช้ `motion blur trails, 1/15s panning shot` ส่วนในวิดีโอ (Wan/Kling) ต้องบอกการเคลื่อนไหวของวัตถุและกล้องแยกกัน
4. **แสงและสี:** ใช้ `warm 3200K tungsten practicals vs cool 6500K window light` หรือ `golden hour` / `blue hour` ซึ่งได้ผลดีกว่าคำว่า "beautiful lighting"
5. **Exposure เป็นอารมณ์:** `low-key, deep shadows, single light` สำหรับฉากผี / `high-key, soft even light` สำหรับโฆษณาเลนส์
6. **ข้อจำกัดของเครื่องมือเรา:**
   - `tools/flux.py` ใช้ FLUX schnell (4 step) ซึ่งตามคำสั่งกล้องได้หยาบกว่ารุ่นใหญ่ ควรเขียนคำบรรยายผลให้ชัด
   - img2img คงแสงของต้นฉบับไว้ (บันทึกแล้วใน LEARNING-LOG) อยากได้กลางวันต้อง generate ใหม่
   - Midjourney ใช้ `--style raw` (ใน docs รุ่นใหม่มี `--raw`) เพื่อลดการแต่งภาพอัตโนมัติ ทำให้คำสั่งกล้องมีผลมากขึ้น
7. **ภาพการ์ตูนของเราก็ใช้หลักเดียวกัน:**
   - DoF = เบลอเลเยอร์ไกล (`--blur` ใน rig.js)
   - Motion blur = smear (FX.md 1.3)
   - WB = เกรดสี `X.grade(...,'warm'|'cold')`

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ
1. **Portrait ฉากหลังละลาย**
   `Close-up portrait of a Thai optician in his 50s adjusting round tortoiseshell glasses, shot on a full-frame camera with an 85mm lens at f/1.8, eyes tack sharp, background shop shelves melted into soft round bokeh, soft window light from camera left at 5200K, natural skin texture, subtle film grain.`
2. **สินค้าชัดทั้งชิ้น**
   `Product photo of titanium eyeglass frames on dark slate, 100mm macro lens at f/11, everything sharp from temple tips to lens edge, single softbox above with a white bounce card, crisp specular highlight along the rim, deep clean shadows, no text.`
3. **Long exposure กลางคืน**
   `Night street in an old Bangkok shophouse district after rain, 20-second long exposure on a tripod, f/8 ISO 100, red and white light trails from passing cars, wet asphalt reflecting neon, buildings perfectly still and sharp, cool blue hour sky.`
4. **หยุดการเคลื่อนไหว / panning**
   `Panning shot of a boy cycling past a canal at 1/30s, the boy and bicycle sharp, the background streaked into horizontal motion lines, golden hour backlight rimming his hair, warm 3000K tones.`
5. **Low-key อารมณ์ / mixed white balance**
   `Low-key interior of a tiny eyeglass shop at 2 a.m., one warm 2700K desk lamp lighting an old man's hands, cool 7000K moonlight through the window behind, most of the frame in deep shadow, histogram weighted to the left but detail kept in the hands, 35mm lens f/2, gentle grain.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- คิดว่ารูรับแสงมีไว้คุมความสว่างอย่างเดียว ลืมว่ามันเปลี่ยน DoF (และชัตเตอร์เปลี่ยน motion)
- ดูความสว่างจากจอ LCD แทน histogram ทั้งที่จอหลอกตาได้ โดยเฉพาะกลางแดด
- ฉากมืดจะถูก "แก้" ให้สว่างเกินจนเสียอารมณ์ เพราะเชื่อว่า histogram ต้องอยู่ตรงกลาง
- ตั้งรูรับแสงแคบสุด (f/22) เพื่อให้ชัดสุด แต่ภาพกลับนุ่มลงเพราะ diffraction ค่าที่คมที่สุดมักอยู่ราว f/5.6–f/8
- พอร์ตเทรตใช้ f/1.2 ระยะใกล้ ทำให้ตาข้างหนึ่งชัดและอีกข้างหลุด ถ้าหน้าเอียง ให้ใช้ f/2–2.8
- WB ผิดเพราะแสงผสม ทำให้ผิวคนออกเขียวหรือส้ม
- (AI) ใส่ตัวเลขกล้องขัดกันเอง เช่น `f/1.4, everything in focus, deep depth of field`
- (AI) ใส่ชื่อกล้อง 5 ยี่ห้อพร้อมกัน ซึ่งไม่ได้ช่วยอะไร ควรเลือกหนึ่งชุดที่สอดคล้องกัน
- (AI) ใช้ "8k, ultra realistic, masterpiece" แทนการบรรยายแสง ทำให้ได้ภาพพลาสติกเรียบ

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - ถ่าย/สร้างภาพเดียวกัน 3 ใบที่ f/1.8, f/5.6, f/16 แล้วเขียนว่า DoF ต่างกันอย่างไร
  - คำนวณ: ถ้า f/4 · 1/125 · ISO 400 แล้วเปลี่ยนเป็น f/8 ต้องใช้ชัตเตอร์เท่าไรให้สว่างเท่าเดิม (คำตอบ: 1/30)
- **ระดับ 2 (ประยุกต์):**
  - ทำภาพชุด 4 ใบ "ร้านแว่นเดียวกัน 4 เวลา" (เช้า 5600K, บ่ายแดดแรง, golden hour, ตีสอง low-key) ด้วย FLUX โดยคุม prompt ให้ต่างกันแค่แสง/WB/exposure
  - อธิบายว่าแต่ละใบใช้ค่ากล้องสมมุติเท่าไร
- **ระดับ 3 (เชี่ยวชาญ):**
  - วางแผน key visual โฆษณาเลนส์ 1 ภาพ
    - เขียน "shot spec" ครบ: เลนส์, f, ชัตเตอร์, ISO, K, ทิศแสง, histogram ที่ตั้งใจ
    - สร้างด้วย AI แล้วตรวจว่าภาพตรงกับ spec ทุกข้อหรือไม่
  - ทำซ้ำจนได้ ≥ 8/10 ตามเกณฑ์ข้อ 8 และบันทึกว่าคำไหนใน prompt ที่ได้ผล

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| Exposure | จุดสำคัญมีรายละเอียด ไม่ clip ในที่ที่ไม่ตั้งใจ | clip เล็กน้อย | หน้า/สินค้าหลุดขาวหรือดำ |
| DoF ตรงเจตนา | ระยะชัดนำสายตาไปที่จุดเด่น | เกือบ | สิ่งสำคัญเบลอ หรือพื้นหลังแย่งความสนใจ |
| Motion | หยุด/เบลอตามที่ตั้งใจ | | ภาพสั่นโดยไม่ตั้งใจ |
| สีและ WB | ผิวเป็นธรรมชาติ, warm/cool มีเหตุผล | สีเพี้ยนเล็กน้อย | สีเพี้ยนจนเสียอารมณ์ |
| ความสอดคล้องของ spec | ค่าทุกตัวเข้ากันได้ทางฟิสิกส์ | ขัดกัน 1 จุด | ขัดกันหลายจุด |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- Exposure triangle:
  - PetaPixel — [A Beginner's Guide to Aperture, Shutter Speed, and ISO](https://petapixel.com/aperture-shutter-speed-iso-beginners-guide-photography/)
  - Digital Camera World — [Understanding the exposure triangle](https://digitalcameraworld.com/tutorials/understanding-the-exposure-triangle)
  - MPB — [Guide to the exposure triangle](https://www.mpb.com/en-us/blog/article/12745/)
- Depth of field / hyperfocal:
  - B&H Explora — [Depth of Field, Part II: The Math](https://www.bhphotovideo.com/explora/photography/tips-and-solutions/depth-field-part-ii-math)
  - PhotoPills — [Depth of Field: The Definitive Guide](https://photopills.com/articles/depth-of-field-guide)
  - Wikipedia — [Hyperfocal distance](https://en.wikipedia.org/wiki/Hyperfocal_distance)
  - Canon UK — [Hyperfocal focusing](https://www.canon.co.uk/canon-club/hyperfocal-focusing/)
  - Michigan Tech (C.-K. Shene) — [Depth of Field](https://pages.mtu.edu/~shene/DigiCam/User-Guide/950/depth-of-field.html)
- Histogram / white balance:
  - Canon Europe — [How to read and use the histogram](https://canon-europe.com/pro/infobank/how-to-read-and-use-histogram)
  - Cambridge in Colour — [White Balance tutorial](https://cdn.cambridgeincolour.com/tutorials/white-balance.htm)
  - Nikon USA — [Setting White Balance](https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/setting-white-balance.html)
  - Adobe — [White balance](https://www.adobe.com/uk/creativecloud/photography/discover/white-balance.html)
- AI prompt:
  - Black Forest Labs docs — [FLUX.2 prompting guide](https://docs.bfl.ai/guides/prompting_guide_flux2)
  - Black Forest Labs docs — [Style: camera and lens language](https://docs.bfl.ai/guides/prompting_unified_style)
  - Black Forest Labs docs — [Building prompts](https://docs.bfl.ai/guides/prompting_unified_building)
  - Midjourney — [Parameter list](https://docs.midjourney.com/docs/parameter-list)
  - Midjourney — [Style](https://docs.midjourney.com/docs/style)
- หมายเหตุ:
  - ตัวเลขเชิงประสบการณ์ (f/5.6–8 คมสุด, Kelvin ของแหล่งแสง, กฎ 180°) เป็นแนวปฏิบัติทั่วไปของวงการ ค่าจริงต่างกันตามเลนส์และกล้อง
  - ค่า circle of confusion ต่างกันตามแหล่ง ควรใช้เครื่องคำนวณ DoF จริงเมื่อต้องการตัวเลขแม่น
