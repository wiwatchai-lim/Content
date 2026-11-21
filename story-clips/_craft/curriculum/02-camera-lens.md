# บทที่ 2 — Camera & Lens Mastery (กล้องและเลนส์)

> เป้าหมาย: เลือก "เซนเซอร์ + ทางยาวโฟกัส + ระยะกล้อง + ชนิดเลนส์" ให้ตรงกับอารมณ์ที่ต้องการ แล้วอธิบายเหตุผลได้ เมื่อสั่ง AI หรือจัดกล้องใน rig.js จะได้ภาพที่ตั้งใจ ไม่ใช่ภาพ "สวยแบบสุ่ม"
> ต่อจากบทที่ 1 (exposure, DoF, กฎ 180°, WB) ซึ่งบทนี้จะไม่อธิบายซ้ำ ดู [01-photography-fundamentals.md](01-photography-fundamentals.md)
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — เซนเซอร์, ทางยาวโฟกัส, ระยะกล้อง
**ขนาดเซนเซอร์และ crop factor**
- ฟูลเฟรม (36×24 mm เท่าฟิล์ม 35mm) เป็นค่าอ้างอิง = crop 1×
- APS-C ≈ 1.5× (Canon 1.6×), Micro Four Thirds = 2×, เซนเซอร์ 1" ≈ 2.7×, กล้องมือถือเล็กกว่านั้นมาก
- **Equivalent focal length** = ทางยาวโฟกัสจริง × crop factor เช่น เลนส์ 50mm บน APS-C ให้มุมภาพเท่า ~75mm บนฟูลเฟรม
- crop factor เปลี่ยน **มุมรับภาพ (field of view)** เท่านั้น ไม่ได้เปลี่ยนทางยาวโฟกัสหรือ f-number จริงของเลนส์ แต่ถ้าถ่ายมุมเดียวกันที่ระยะเดียวกัน เซนเซอร์เล็กจะได้ DoF ลึกกว่า (ฉากหลังละลายยากกว่า) เพราะต้องใช้เลนส์สั้นกว่า

**ทางยาวโฟกัส (focal length) กับมุมภาพ** (เทียบฟูลเฟรม ตัวเลขเป็น rule of thumb)

| ช่วง | มุมภาพ | อ่านทางอารมณ์ |
|---|---|---|
| ≤ 16mm ultra-wide / fisheye | กว้างมาก เส้นโค้งหรือยืด | ตื่นเต้น, เพี้ยน, ฝัน, ความกดดันในที่แคบ |
| 24–35mm wide | เห็นสภาพแวดล้อม | "อยู่ในเหตุการณ์", สารคดี, สตรีท |
| 40–58mm normal | ใกล้สายตาคน | เป็นกลาง, ซื่อสัตย์ |
| 85–135mm short tele | แคบ ฉากหลังน้อย | พอร์ตเทรต, ใกล้ชิด, สุภาพ |
| 200mm+ tele | แคบมาก | สังเกตการณ์จากไกล, แอบมอง, ฉากหลังอัดแน่น |

**Perspective มาจากระยะกล้อง ไม่ใช่จากเลนส์**
- สัดส่วนระหว่างหน้า-ฉากหลัง (จมูกโต, ตึกด้านหลังดูใหญ่) ถูกกำหนดโดย **ระยะจากกล้องถึงวัตถุ** เลนส์แค่กำหนดว่าเก็บภาพได้กว้างแค่ไหน ถ้าถ่ายด้วย 15mm แล้ว crop ให้เท่ามุมของ 70mm จากจุดเดิม perspective จะเหมือนกันแทบทุกอย่าง
- "lens compression" จึงเป็นชื่อเรียกที่คลาดเคลื่อน ชื่อที่ถูกต้องกว่าคือ distance compression แต่ในทางปฏิบัติ คนที่ใช้ tele มักยืนไกล และคนที่ใช้ wide มักยืนใกล้ ผลจึงผูกกับเลนส์
- **วิธีคิดแบบช่างภาพ:** เลือกระยะที่ให้ perspective ที่ต้องการก่อน แล้วค่อยเลือกเลนส์ที่ทำให้วัตถุเต็มเฟรมพอดี
- ใบหน้าคนที่ระยะ < 1 m (ต้องใช้ wide) จมูกจะดูใหญ่ หูจะดูเล็ก หน้ากรอบแว่นดูบานกว่าขา ระยะ 1.5–3 m (ใช้ 85–135mm) สัดส่วนหน้าดูเป็นธรรมชาติ จึงเป็นเหตุที่ 85mm คือ "เลนส์พอร์ตเทรต"

### 1.2 ขั้นสูง
- **ชนิดเลนส์**
  - **Prime** (ระยะเดียว): เปิดรูรับแสงกว้างกว่า คมกว่า เบากว่า ช่วยให้ทีมเดินเข้า-ออกเพื่อจัดภาพ
  - **Zoom**: ยืดหยุ่น แต่ระวังว่าการซูมแทนการเดินจะเปลี่ยนแค่ขนาดภาพ ไม่ได้เปลี่ยน perspective ส่วน **parfocal zoom** ของซีเนม่าจะรักษาโฟกัสไว้ขณะซูม
  - **Macro**: โฟกัสใกล้ได้มาก (1:1 คือภาพบนเซนเซอร์มีขนาดเท่าวัตถุจริง) เหมาะกับบานพับ, โลโก้บนขาแว่น, ผิวเลนส์ ที่ระยะใกล้ DoF จะบางมาก ต้องใช้ f/8–f/16 หรือ focus stacking
  - **Tilt-shift**: *shift* เลื่อนเลนส์ขนานกับเซนเซอร์เพื่อแก้เส้นตั้งลู่ (ตึก, ตู้โชว์) ส่วน *tilt* เอียงเลนส์เพื่อหมุนระนาบโฟกัสตาม **Scheimpflug principle** โฟกัสจะเป็นรูปลิ่ม ใช้ทำให้ระนาบเอียงชัดทั้งแผ่นที่ f กว้าง หรือกลับด้านจนได้ลุค "ของจิ๋ว/diorama"
  - **Anamorphic**: มีชิ้นเลนส์ทรงกระบอกบีบภาพแนวนอน (นิยม 2×) แล้วคลายออกในโพสต์ให้ได้จอกว้าง ~2.39:1 จุดเด่นคือ **flare เป็นเส้นแนวนอน** (มักออกฟ้า), **bokeh เป็นวงรี**, ขอบภาพโค้งเล็กน้อย, DoF แนวตั้งเท่าเลนส์ปกติแต่มุมกว้างกว่า เลนส์ 50mm 2× มีมุมแนวนอนเท่า 25mm ปกติ ระวัง "anamorfake" (รูรับแสงวงรีหรือฟิลเตอร์ streak) ที่เลียนแบบได้แค่บางอย่าง
  - **Fisheye**: ตั้งใจใช้ barrel distortion เพื่อใส่ภาพครึ่งทรงกลมลงในกรอบ เส้นที่ผ่านจุดกึ่งกลางภาพยังตรง แต่เส้นอื่นโค้งมาก
- **Distortion**
  - *Barrel* เส้นตรงโป่งออก (พบใน wide และ zoom ช่วงกว้าง) / *Pincushion* เส้นหุบเข้า (พบใน tele รุ่นเก่า) / *Mustache* ผสมกัน แก้ยากที่สุด
  - ต้องแยกให้ออกระหว่าง **optical distortion** (แก้ได้ด้วยโปรไฟล์เลนส์) กับ **perspective distortion** จากการยืนใกล้ (แก้ด้วยโปรไฟล์ไม่ได้ ต้องเปลี่ยนระยะ)
  - ภาพสินค้าแว่นต้องไม่มี distortion เพราะกรอบจะดูผิดทรงจากของจริง
- **ระบบโฟกัส**
  - ภาพนิ่ง: AF-S (ล็อกครั้งเดียว), AF-C (ตามวัตถุ), Eye-AF / subject detection, MF + focus peaking
  - วิดีโอ: ต้องมีคนทำหน้าที่ **focus puller** ใช้ follow focus และระยะที่วัดจริง การเปลี่ยนโฟกัสคือการเล่าเรื่อง (rack focus ย้ายความสนใจ)
  - **Focus breathing**: มุมภาพเปลี่ยนเล็กน้อยเมื่อหมุนโฟกัส เลนส์ภาพนิ่งมักเป็นมาก จึงเห็นชัดตอน rack
  - **ถ่ายคนใส่แว่น**: ระวัง AF จับที่กรอบหรือแสงสะท้อนบนเลนส์แทนดวงตา
- **Cinema vs photo lens**
  - เลนส์ซีเนม่าระบุ **T-stop** = f-stop ที่ปรับตามแสงที่ผ่านแก้วจริง (เช่น f/2 ที่ส่งผ่านแสง 75% ≈ T2.3) จึงสลับเลนส์ในชุดแล้วความสว่างเท่ากัน T-stop มีผลต่อ exposure เท่านั้น ส่วน DoF ยังคำนวณจาก f-number
  - เลนส์ซีเนม่ามีวงแหวนเฟือง (gear) ตำแหน่งเดียวกันทั้งชุด, ระยะหมุนโฟกัสยาว, รูรับแสงหมุนแบบไม่มีคลิก (declicked), สีเลนส์ทุกตัวตรงกัน และ breathing ต่ำ จึงแพงกว่า
- **Bokeh character** (ต่อจากบทที่ 1): รูปทรงจุดเบลอขึ้นกับจำนวนใบรูรับแสง (ใบน้อย = เหลี่ยม), *cat's-eye* (จุดเบลอขอบภาพเป็นรูปเมล็ดจาก vignetting เชิงกล), *onion ring* (วงในจุดจากชิ้นเลนส์ aspherical), *soap bubble* (ขอบสว่างคม), *swirl* (เบลอหมุนวน เช่น Petzval) และวงรีของ anamorphic bokeh ฉากหลังที่ "นุ่ม" หรือ "ยุ่ง" คืออารมณ์ด้วย
- **Lens flare**: แสงสะท้อนภายในชิ้นเลนส์ → ghost (จุดสีตามรูปรูรับแสง) และ veiling glare (คอนทราสต์ลดลงทั้งภาพ) เคลือบเลนส์สมัยใหม่ช่วยลด เลนส์วินเทจจึงให้ flare อบอุ่นกว่า flare คือสัญลักษณ์ของ "แสงจริง ความทรงจำ ความหวัง" ถ้าใช้เกินจะดูราคาถูก
- **Frame rate / resolution / codec (พื้นฐาน)**
  - 24/25 fps = ลุคหนัง, 30 fps = วิดีโอ/โซเชียล, 50–60 fps = ลื่น/กีฬา, 120 fps+ ใช้ทำสโลว์โมชัน (เล่นที่ 24 = ช้าลง 5 เท่า) ทุกค่ายังต้องใช้กฎ 180° จากบทที่ 1
  - ความละเอียด: 1080p พอสำหรับ TikTok/Reels ส่วน 4K เผื่อ crop เพื่อ punch-in หรือ reframe แนวตั้ง 9:16 จากแนวนอน
  - Codec: H.264/H.265 = ไฟล์ส่งงาน ขนาดเล็ก (long-GOP) / ProRes, DNxHR = ไฟล์ตัดต่อ (intra-frame, ใหญ่ แต่ลื่น) / 8-bit vs 10-bit: 10-bit เกรดสีได้มากกว่า ไม่เกิด banding บนฟ้าและฉากหลังไล่เฉด / Log profile = เก็บ dynamic range ไว้เกรดทีหลัง

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Crop factor / equivalent focal length | อัตราส่วนเซนเซอร์เทียบฟูลเฟรม / ทางยาวโฟกัสคูณ crop |
| Field of view (FoV) | มุมรับภาพ ขึ้นกับเลนส์ + เซนเซอร์ |
| Perspective / distance compression | สัดส่วนใกล้-ไกล ซึ่งเกิดจากระยะกล้อง |
| Prime / zoom / parfocal | ระยะเดียว / ซูมได้ / ซูมแล้วโฟกัสไม่หลุด |
| Macro 1:1 | ภาพบนเซนเซอร์มีขนาดเท่าวัตถุจริง |
| Tilt / shift / Scheimpflug | เอียงระนาบโฟกัส / แก้เส้นลู่ / หลักเรขาคณิตของการเอียง |
| Anamorphic, squeeze, desqueeze | บีบภาพแนวนอน แล้วคลายทีหลัง |
| Barrel / pincushion / mustache | เส้นโป่ง / เส้นหุบ / ผสม |
| Focus breathing | มุมภาพขยับเมื่อเปลี่ยนโฟกัส |
| Rack focus / follow focus | ย้ายโฟกัสระหว่างระนาบ / อุปกรณ์หมุนโฟกัส |
| T-stop | ค่ารูรับแสงตามแสงที่ผ่านจริง |
| Cat's-eye, onion ring, swirl bokeh | ลักษณะเฉพาะของจุดเบลอ |
| Ghosting / veiling glare | จุด flare / หมอกคอนทราสต์ต่ำ |
| Dolly zoom (vertigo) | ถอยกล้องพร้อมซูมเข้า ฉากหลังยืด-หด วัตถุขนาดคงที่ |
| fps, VFR/HFR, 4K, 10-bit, Log, ProRes | พื้นฐานไฟล์วิดีโอ |

---

## 3. ตัวอย่างงานจริง (การตั้งค่าที่ใช้กันจริง)
| สถานการณ์ | เลนส์ / ระยะ / ค่า | เหตุผล |
|---|---|---|
| ลูกค้าลองแว่นหน้ากระจก | 85mm · ระยะ ~1.5 m · f/2 | หน้าไม่บิด กรอบแว่นเป็นทรงจริง ฉากหลังร้านนุ่ม |
| Packshot กรอบแว่นแบบ catalog | 100mm macro · f/11 · ระยะ ~40 cm · แก้ distortion = 0 | เลนส์ยาวทำให้ขาแว่นไม่ยืด ทรงกรอบถูกต้อง |
| Detail บานพับ / โลโก้บนขา | macro 1:1 · f/8 + focus stacking 5–10 ภาพ | DoF ระยะใกล้บางมาก |
| ภายในร้านเล็กให้ดูกว้าง | 24mm · shift แก้เส้นตั้งของตู้โชว์ | เห็นร้านทั้งร้าน เส้นตรงดูเป็นมืออาชีพ |
| ถนนหน้าร้านแบบ diorama | tilt-shift · มุมสูง · ระนาบโฟกัสเอียงสวน | ทำให้ถนนดูเหมือนของเล่น เหมาะกับ intro |
| คนเดินบนถนนคนเดินหัวหิน ฉากหลังอัดแน่น | 200mm · ระยะ 30 m | ป้ายและฝูงคนดูซ้อนชิดตัวแบบ |
| คลิปโปรโมทลุคหนัง | anamorphic 2× · T2 · 24 fps · 1/50 | flare เส้นแนวนอนจากไฟรถ, bokeh วงรี |
| Slow-mo หยิบแว่นขึ้นจากโต๊ะ | 50mm · 120 fps · 1/250 · เล่นที่ 24 fps | ช้าลง 5 เท่า เห็นแสงไล่บนเลนส์ |

สิ่งที่มืออาชีพทำคือ **ตัดสินใจระยะกล้องก่อน** (perspective = อารมณ์) จากนั้นเลือกเลนส์ (ขนาดภาพ) แล้วจึงเลือกบุคลิกเลนส์ (bokeh, flare, distortion) เป็นอันดับสุดท้าย

---

## 4. นำไปใช้กับ AI Image / Video
1. **เขียนเป็นชุดที่สอดคล้องกัน:** `85mm portrait lens, shot from 2 meters` ดีกว่า `85mm` อย่างเดียว เพราะบอกทั้งมุมภาพและระยะ (perspective) ส่วนแนวทางการใส่ภาษากล้อง/เลนส์จริงตาม BFL docs ดูที่บทที่ 1 ข้อ 4
2. **บรรยายผลของเลนส์ ไม่ใช่แค่ชื่อเลนส์:** เช่น `anamorphic → horizontal blue streak flare, oval bokeh, 2.39:1 widescreen`, `tilt-shift → miniature effect, narrow band of focus across the street`, `24mm close → exaggerated perspective, nose closer to camera` เพราะ FLUX schnell (`tools/flux.py`, 4 step) ไม่รู้จักชื่อรุ่นเลนส์มากนัก แต่เข้าใจคำบรรยายลักษณะภาพ
3. **ภาพสินค้าแว่นให้ใช้ภาษาของเลนส์ยาว:** `100mm macro, no lens distortion, true-to-shape frame` เพื่อลดโอกาสที่ AI จะบิดทรงกรอบ แต่สุดท้ายต้องเทียบกับรูปแว่นจริงใน kit (Codex `-i`) ทุกครั้ง
4. **วิดีโอ (Wan 2.2 / Kling):**
   - **การเคลื่อนกล้องหนึ่งแบบต่อหนึ่งช็อต** (Kling camera guide และคู่มือหลายแหล่งตรงกัน) เช่น `slow push-in` และใช้ push-in เมื่อต้องการพาสายตาไปที่ใบหน้า โลโก้ หรือผิวสินค้า
   - **dolly ≠ zoom:** zoom คือเปลี่ยนเลนส์โดยกล้องอยู่กับที่ perspective จึงไม่เปลี่ยน ส่วน dolly คือกล้องเคลื่อนเข้าไป ฉากหลังจึงเปลี่ยนสัดส่วน ให้เลือกคำให้ตรงกับเจตนา
   - Wan เข้าใจคำกลุ่ม shot size / lens / camera movement (ตามพจนานุกรม prompt ของ Alibaba) แต่ไม่มีเอกสารทางการว่ารองรับตัวเลข mm แค่ไหน **ให้ถือว่าตัวเลข mm เป็นคำใบ้ลุค** ไม่ใช่คำสั่งที่แม่นยำ อยากให้กล้องนิ่งให้เขียน `fixed lens, static camera`
   - Wan ของเรา (`tools/wan.py`) ทำงานที่ 480×848 บนการ์ด 6 GB ดังนั้นรายละเอียดเล็ก ๆ (โลโก้ขาแว่น) ควรทำเป็น insert/macro shot แยก ไม่ควรหวังให้ชัดใน wide
   - Frame rate: งานส่งเป็น 24 fps ตาม GUIDE.md ไม่ต้องใส่ "60fps" ใน prompt เพราะไม่ได้ทำให้ภาพลื่นขึ้นจริง
5. **การ์ตูน 2D ของเรา (rig.js) จำลองเลนส์ได้:**
   - **ทางยาวโฟกัส = ระยะห่างของค่า parallax:** ลุค wide ให้กาง `--d` ห่าง (fg 1.4 / bg 0.7) ส่วนลุค tele ให้บีบเข้าหากัน (fg 1.1 / bg 0.9) และให้ฉากหลังใหญ่ในเฟรม
   - `cam.move({s})` = **zoom ไม่ใช่ dolly** (ทุกเลเยอร์ขยายเท่ากันถ้า `--d` เท่ากัน) อยากได้ dolly จริงต้องให้ parallax ทำงาน
   - Dolly zoom = `cam.vertigo(...)` / rack focus = `cam.rack(...)` (ดู [GUIDE.md](../GUIDE.md) §2)
   - flare/แสงเข้าเลนส์ = god rays + glow ใน [FX.md](../FX.md) 1.1–1.2, letterbox 2.39:1 ผ่าน `film({letterbox})` เพื่อสื่อลุค anamorphic, ลุค barrel/fisheye ใช้กับช็อต POV หรือฝันเท่านั้น
   - เลือกสไตล์ที่เข้ากับเลนส์ได้ที่ [STYLES.md](../STYLES.md) (เช่น Noir silhouette + tele, Neon line + anamorphic flare)

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ
1. **Portrait 85mm ทรงกรอบแว่นถูกต้อง**
   `Head-and-shoulders portrait of a Thai woman in her 30s trying on thin gold round eyeglasses in a small optical shop, 85mm lens from about 2 meters, natural facial proportions, frame shape true to life with no lens distortion, eyes sharp through clean lenses with no glare, shop shelves behind melted into smooth round bokeh, soft window light, no text.`
2. **Macro detail**
   `Extreme macro of the hinge and temple of a matte black acetate eyeglass frame, 100mm macro lens at 1:1 magnification, f/11 with focus stacking so the whole hinge is sharp, fine screw threads and acetate grain visible, dark gradient background, single soft light from above, no text.`
3. **Tilt-shift miniature ถนนไทย**
   `High-angle tilt-shift photograph of a busy Hua Hin night market street, tilted plane of focus leaving only a thin band across the middle sharp, top and bottom strongly blurred, tiny-looking people and tuk-tuks like a toy diorama, saturated colours, warm string lights, no text.`
4. **Anamorphic cinematic (วิดีโอ Wan/Kling)**
   `Cinematic 2.39:1 anamorphic shot, slow dolly push-in toward a young Thai man in a rainy Bangkok soi at night lifting tortoiseshell glasses to his eyes, passing headlights create long horizontal blue streak flares, oval bokeh from neon signs, shallow depth of field, gentle film grain, one camera move only, no text.`
5. **Wide 24mm ใกล้ตัว / tele 200mm (คู่เปรียบเทียบ)**
   - A: `24mm wide-angle lens close to the subject, an old Thai optician leaning toward the camera holding a trial lens, exaggerated perspective with his hand looming large, the whole cramped workshop visible behind, slightly claustrophobic mood.`
   - B: `200mm telephoto from across the street, the same old Thai optician seen through the shop window, background signs stacked tightly behind him, flattened perspective, observational and lonely mood.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- เชื่อว่าเลนส์ tele "บีบภาพ" ทั้งที่จริงคือระยะกล้อง เลยใช้ zoom ซูมเข้าแทนที่จะเดินถอยออกไป
- ถ่ายหน้าลูกค้าใส่แว่นด้วยมือถือ wide ระยะใกล้ ทำให้หน้าบานและกรอบแว่นดูใหญ่ผิดจริง
- แก้ distortion ด้วยโปรไฟล์เลนส์แล้วคิดว่าแก้ perspective distortion ได้ด้วย
- ใช้ f/1.4 กับ macro ทำให้ชัดแค่ขอบเดียว
- ไม่เข้าใจ crop factor เลยซื้อเลนส์ 50mm มาใช้กับ APS-C แล้วงงว่าทำไมแคบ
- ทำ rack focus ด้วยเลนส์ภาพนิ่งที่ breathing แรง ทำให้ภาพดูเหมือนซูม
- flare ทุกช็อต, ฟิลเตอร์ anamorphic ปลอม และ bokeh ซ้อน ซึ่งทำให้ภาพดูเป็นเทมเพลต
- ถ่าย 8-bit H.264 แล้วเกรดหนัก ทำให้ฟ้าเป็นขั้นบันได (banding)
- (AI) ใส่ `fisheye, 85mm, telephoto` พร้อมกัน ทำให้คำสั่งขัดกันเอง
- (AI) ขอทั้ง `dolly in, pan left, zoom out, orbit` ในช็อตเดียว ทำให้ Wan/Kling สับสนจนภาพบิด
- (AI) ปล่อยให้ AI สร้างทรงกรอบแว่นเอง ภาพสวยแต่เป็นสินค้าที่ไม่มีขายในร้าน

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - คำนวณ equivalent: 35mm บน APS-C Canon (1.6×) และ 25mm บน M4/3 (คำตอบ: 56mm, 50mm)
  - ถ่ายแว่นวางบนโต๊ะที่ 24mm ระยะใกล้ และ 100mm ระยะไกล (ขนาดกรอบเท่ากันในเฟรม) แล้วเขียนว่าทรงกรอบและฉากหลังต่างกันอย่างไร
- **ระดับ 2 (ประยุกต์):**
  - สร้างภาพชุด 4 ใบ "ลูกค้าคนเดิม ร้านเดิม" ด้วย FLUX: 24mm ใกล้ / 50mm / 85mm / 200mm ไกล โดยเปลี่ยนแค่เลนส์และระยะ
  - ใน rig.js ทำช็อต 4 วินาทีสองแบบ: zoom (`s` อย่างเดียว) กับ dolly (parallax `--d` กางออก) แล้วอธิบายความรู้สึกที่ต่างกัน
- **ระดับ 3 (เชี่ยวชาญ):**
  - วาง "lens plan" ของคลิปโปรโมท 15 วินาที 5 ช็อต
    - ทุกช็อตระบุ: ระยะกล้อง, focal length, ชนิดเลนส์, T-stop, fps, การเคลื่อนกล้อง, เหตุผลทางอารมณ์
    - มีอย่างน้อย 1 macro insert และ 1 ช็อตที่ใช้ flare อย่างมีเหตุผล
  - สร้างด้วย FLUX/Codex + Wan หรือ Kling แล้วตรวจตามเกณฑ์ข้อ 8 จนได้ ≥ 8/10 บันทึกคำ prompt ที่ได้ผลลงใน LEARNING-LOG

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| Perspective ตรงอารมณ์ | ระยะกล้องสื่อความหมาย (ใกล้ชิด/สังเกต/กดดัน) | ถูกแต่ไม่ชัด | สุ่ม หรือขัดกับเรื่อง |
| ทรงสินค้า / ใบหน้า | กรอบแว่นและหน้าไม่บิดเกินตั้งใจ | บิดเล็กน้อย | ทรงกรอบผิดจากของจริง |
| บุคลิกเลนส์ | bokeh/flare/distortion มีเหตุผลและพอดี | ใช้มากไปนิด | ใส่เพื่อความเท่ล้วน ๆ |
| โฟกัส | ระนาบโฟกัสและ rack อยู่ที่จุดสำคัญ | ช้า/หลุดเล็กน้อย | ตา/สินค้าหลุดโฟกัส |
| ความสอดคล้องของ lens spec | เซนเซอร์, mm, ระยะ, fps, การเคลื่อนกล้องเข้ากันได้ | ขัด 1 จุด | ขัดหลายจุด |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- Sensor / crop factor:
  - Canon UK — [APS-C vs full-frame – the difference explained](https://www.canon.co.uk/get-inspired/tips-and-techniques/aps-c-vs-full-frame/)
  - PetaPixel — [What is Crop Factor?](https://petapixel.com/what-is-crop-factor/)
  - Adobe — [Crop sensor vs full frame](https://www.adobe.com/ph_en/creativecloud/photography/discover/crop-sensor-vs-full-frame.html)
- Perspective / compression:
  - PetaPixel — [Perspective Distortion, Or: Why Lens Compression Doesn't Exist](https://petapixel.com/2018/05/23/perspective-distortion-or-why-lens-compression-doesnt-exist)
  - Fstoppers — [How Lens Compression and Perspective Distortion Work](https://fstoppers.com/architecture/how-lens-compression-and-perspective-distortion-work-251737)
  - Digital Camera World — [Compression of perspective is a lie](https://digitalcameraworld.com/news/fake-news-compression-of-perspective-is-a-lie)
- Lens types / distortion:
  - Wikipedia — [Scheimpflug principle](https://en.wikipedia.org/wiki/Scheimpflug_principle)
  - Adobe — [Tilt-shift photography](https://www.adobe.com/africa/creativecloud/photography/discover/tilt-shift-photography.html)
  - ASC — [Practical Optics 3: Introduction to Anamorphic](https://theasc.com/blog/the-film-book/practical-optics-3-introduction-to-anamorphic)
  - RED — [Anamorphic lenses](https://www.red.com/red-101/anamorphic-lenses)
  - DPReview — [How does anamorphic photography work?](https://www.dpreview.com/articles/2155009744/how-does-anamorphic-photography-work)
  - No Film School — [Why do anamorphic bokeh balls look like that?](https://nofilmschool.com/anamorphic-bokeh-balls)
  - ASC — [Understanding lens distortion](https://theasc.com/article/understanding-lens-distortion/)
  - Adorama — [Lens distortion](https://www.adorama.com/alc/lens-distortion-what-is-it-and-how-does-it-affect-your-photography)
- T-stop / cinema lens:
  - PetaPixel — [F-Stops vs T-Stops in plain English](https://petapixel.com/2016/12/30/f-stops-vs-t-stops-difference-explained-plain-english/)
  - No Film School — [Difference between f-stops and T-stops](https://nofilmschool.com/2016/12/whats-difference-between-f-stops-and-t-stops-and-why-does-it-matter)
- AI video:
  - Kling AI — [Camera control: push, pull, pan & tilt](https://kling.ai/blog/kling-ai-camera-control-video-guide)
  - Kling AI — [Text-to-video prompt guide](https://kling.ai/quickstart/text-to-video-prompt-guide)
  - Alibaba Cloud Model Studio (Wan) — [Video generation prompt guide](https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt)
  - Alibaba Cloud Model Studio (Wan) — [Text-to-image prompt guide](https://help.aliyun.com/en/model-studio/text-to-image-prompt)
  - Leonardo.ai — [How to write Kling AI prompts](https://www.leonardo.ai/news/kling-ai-prompts/)
- หมายเหตุ:
  - ช่วง focal length กับอารมณ์, ระยะพอร์ตเทรต 1.5–3 m, ค่า f สำหรับ macro และค่า parallax ใน rig.js เป็น **rule of thumb** ไม่ใช่กฎทางฟิสิกส์
  - ส่วนรายละเอียดของ bokeh (cat's-eye, onion ring, swirl), focus breathing และ codec/fps เป็นความรู้ทั่วไปของวงการ ไม่ได้อ้างจากแหล่งในรายการนี้โดยตรง
  - แหล่งข้อมูลยังเห็นไม่ตรงกันว่ากลไกของ anamorphic bokeh มาจากรูรับแสงหรือการบีบภาพ และวงรีเป็นแนวตั้งหรือแนวนอน ให้ตรวจกับเลนส์จริงก่อนอ้างตัวเลข
  - ความสามารถของ Wan/Kling ในการตามตัวเลข mm ยังไม่มีเอกสารทางการรองรับ ต้องทดสอบเอง
