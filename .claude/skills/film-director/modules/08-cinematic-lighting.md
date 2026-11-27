# FD08 — Cinematic Lighting (การจัดแสงแบบภาพยนตร์: three-point, motivated, high/low key, practicals, chiaroscuro, rim, bounce, Kelvin, continuity)

> ต่อยอด ไม่ซ้ำ: hard/soft, ทิศแสง, รูปแบบพอร์ตเทรต (loop/Rembrandt/butterfly/split), gel, การกัน glare บนแว่น อยู่ใน
> `story-clips/_craft/curriculum/04-lighting.md`; ฟิสิกส์ (inverse-square, Fresnel, SSS, GI, family of angles) ใน
> `creative-intelligence/knowledge/visual-arts/LIGHTING_PHYSICS.md`; 51 setup ภาพนิ่งใน `.claude/skills/ai-visual-artist/LIGHTING_LIBRARY.json` (`ava.light:<id>`);
> 17 setup + 16 บรรยากาศใน `visual-arts/light_libraries.json` (`va.light:<id>`, `va.atm:<id>`).
> บทนี้เพิ่ม: **อัตราส่วนแสงและความกำกวมของนิยาม**, **คณิต Kelvin/mired**, **practical-as-key / continuity จากกรณีจริง (ASC)**,
> **หลักฐานเรื่องความสว่างของหนังและส่วนโค้งความมืดของเรื่อง**, **light-from-above prior**, และ preset ภาพยนตร์ 20 แบบ
> ใน `libraries/LIGHTING_PRESET_LIBRARY.json` (`lp.*` มี ratio, Kelvin, ทิศ, ความแข็ง, คำ prompt)

## 1. นิยามและหลักการพื้นฐาน
- **Key** = แสงหลักที่กำหนดทิศและเงา; **fill** = ลดเงา; **back/rim** = แยกขอบจากพื้นหลัง; **background light**; **practical** = แหล่งแสงที่เห็นในเฟรม (โคม เทียน จอ)
- **Motivated lighting** = แสงที่ดูเหมือนมาจากแหล่งในโลกของเรื่อง (หน้าต่าง โคม จอ) แม้จะเสริมด้วยไฟกองถ่าย [CRAFT]
- **คุณภาพแสง (hard/soft)** = ความกว้างของช่วงเปลี่ยนจากสว่างไปเงา กำหนดด้วย *ขนาดแหล่งแสงเทียบกับระยะ*: แข็ง = แหล่งเล็กอยู่ไกล; นุ่ม = แหล่งใหญ่อยู่ใกล้; diffusion/bounce กลายเป็นแหล่งแสงใหม่; diffusion ที่หน้าเลนส์แทบไม่ช่วย [`Holben2020_LightQuality`, D]
- **High key / low key** = โทนรวมสว่าง-คอนทราสต์ต่ำ vs มืด-คอนทราสต์สูง; **chiaroscuro** = การปั้นรูปทรงด้วยแสง-เงาเข้ม
- **Kelvin (K)** = อุณหภูมิสีของแสง (ต่ำ = ส้ม เช่น เทียน ~1900K, หลอดทังสเตน 3200K; สูง = ฟ้า เช่น เงา/ฟ้า 6500–8000K+)

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 Lighting ratio — ระวังนิยามสองแบบ** [CRAFT]
- นิยามแบบ ASC ที่ถูกอ้าง: **(key + fill) : fill** [`StudioBinder_LightingRatios` อ้าง ASC]; แต่บทความเดียวกันเทียบ 1 stop ≈ 2:1, 2 stops ≈ 4:1, 3 stops ≈ 8:1 โดยวัด *ด้านสว่าง vs ด้านเงา* — สองวิธีให้ตัวเลขต่างกัน (key = fill จะเป็น 2:1 ในแบบแรก แต่ 1:1 ในแบบหลัง)
- **มาตรฐานของ repo นี้:** `lit_to_shadow_ratio` = ค่าแสงตกกระทบด้านสว่างของหน้า : ด้านเงา (incident) → 2:1 = ต่าง 1 stop, 4:1 = 2 stops, 8:1 = 3 stops; เขียนกำกับทุกครั้งเมื่ออ้างจากแหล่งอื่น
- ภาษาอารมณ์ (craft): 1:1–2:1 สว่างเรียบ คอมเมดี้/โฆษณา; 3:1–4:1 ละครทั่วไป; 8:1+ noir/สยองขวัญ [`StudioBinder_LightingRatios`, D]
**2.2 Kelvin & mired (คิดเป็น mired เสมอ)** — mired = 1,000,000 / K; gel แต่ละแผ่นมี "mired shift" คงที่ → ผลเป็น K ขึ้นกับแหล่ง: Lee Full CTO (+159) เปลี่ยน 5600K → ~3000K แต่ 7000K → ~3300K; Rosco Full CTO +167, GAM +146; 1/4 CTO +63 [`Holben2014_Mired`, D]
- ใช้กับ AI/HTML: ความต่าง "อุ่น-เย็น" ที่รู้สึกเท่ากันคือระยะ mired ที่เท่ากัน ไม่ใช่ K ที่เท่ากัน (3000→3500K ต่าง ~48 mired; 6000→6500K ต่างแค่ ~13 mired) → ปรับ `colortemperature` ใน ffmpeg ฝั่งอุ่นทีละน้อย ฝั่งเย็นทีละมาก [เลขคณิตจากนิยาม]
- ffmpeg `colortemperature=temperature=K` ในเวอร์ชันที่เราใช้ (9.0): **K ต่ำ = ภาพอุ่นขึ้น** (ทดสอบ: เทา 128 → 3000K ให้ RGB 128/88/55; 10000K ให้ 101/109/128) — ใช้ `mix` 0.3–0.6 และ `pl=1` รักษาความสว่าง [ทดสอบใน session นี้]
**2.3 Practical-as-key และ motivation** [CRAFT, กรณีจริง tier C]
- *L.A. Confidential* (1997): Spinotti บอก production designer ว่า "สิ่งที่คุณเลือกเป็น practical จะเป็นแหล่งแสงหลัก" — practical "บ่อยครั้งคือ key"; ต้องการ halo/burn-out ของหลอด; ฉากห้องนอนกลางคืนใช้ HMI gel ฟ้า 1/4–1/2; แดดเช้าต่ำใช้ gel ส้ม+magenta [`Rudolph1997_LAConfidential`]
- *The Goldfinch* (2019): ร้านอาหารใช้เทียนจริงเป็นแสงโดยไม่มีไฟเสริมนอกจาก practical ฉากหลัง; ฉากพิพิธภัณฑ์หลังระเบิด หรี่ไฟเพดานใกล้กล้อง ไฟไกลสว่างกว่า → ย้อนแสงเป็นเงาดำ [`Bosley2020_Deakins`]
- Gordon Willis: ตัดสินใจก่อนว่า "ภาพควรเป็นอย่างไร" แล้วค่อยเลือกวิธีจัดแสง; เริ่มจากไฟที่มีอยู่ในฉาก; overhead diffusion ใช้อย่างเลือกสรร; "บางครั้งดีกว่าที่จะยังไม่เห็นว่าเกิดอะไรขึ้นจนถึงจุดหนึ่งของฉาก" [`Willis1978_AFI`]
**2.4 Continuity ของแสงข้ามช็อต** — *1917*: ซ้อมตอนแดดออก ถ่ายตอนมีเมฆ เพราะเป็น "one-shot" จึง "สำคัญมากที่ dailies ต้องเรียบเสมอกัน" [`Bosley2020_Deakins`] → กฎของเรา: **ล็อก "สภาพแสง" หนึ่งอย่างต่อ sequence** (ทิศ key, K, ความแข็ง, ratio) แล้วเขียนเป็นบล็อก `LIGHT:` คำต่อคำทุก prompt (สอดคล้อง curriculum 11 §4.1 เรื่อง LOOK:)
**2.5 หลักฐานเชิงปริมาณเรื่องความมืด** [EVIDENCE, correlational]
- หนังฮอลลีวูด 160 เรื่อง 1935–2010 **มืดลงเรื่อยๆ** (วัด median luminance ต่อเฟรม); แอนิเมชันคงที่และสว่างกว่า; ขาวดำ vs สีเกือบเท่ากัน (132 vs 130); เหตุผลที่ผู้วิจัยเสนอ: dynamic range ดีขึ้น, ไม่ต้องใช้ไฟจัดเพราะฟิล์ม, ภาพมืดในโรงมืดให้การควบคุมความสนใจมากขึ้น [`Cutting2011_QuickerDarker`, full_text]
- ภายในเรื่อง (180 เรื่อง 1930–2015): ความสว่างลดลงช่วง complication/development **มืดสุดราว 3/4 ของเรื่อง** แล้วสว่างขึ้นช่วงไคลแม็กซ์/epilogue — ชัดเฉพาะหนัง 1990–2015 [`Cutting2016_Pace`] → ใช้วาง *lighting script* (คู่กับ colour script ใน `COLOR_SCRIPTING.md`)
- ข้อจำกัด: ทำมาเพื่อโรงภาพยนตร์มืด; มือถือกลางแดด → low key ต้องยก mid ตอนเกรด (FD09 `grade.reels_daylight_lift`)
**2.6 Light-from-above prior** — ระบบการมองตีความ shading โดยสมมุติว่าแสงมาจากด้านบน และ prior นี้ปรับได้ด้วยประสบการณ์ (Adams, Graf & Ernst 2004); งานภายหลังพบว่าขึ้นกับบริบท/ท่าทางร่างกาย [`Adams2004_LightFromAbove`, search_summary] → under-light ขัดกับ prior จึงอ่านเป็น "ผิดธรรมชาติ" — เป็น *เหตุผลที่สมเหตุสมผล* ของธรรมเนียม horror under-light แต่ยังไม่มีหลักฐานตรงว่าทำให้กลัว [MIXED]

## 3. เหตุผลที่ใช้
แสงกำหนดสิ่งที่ผู้ชมเห็นก่อน (ส่วนที่สว่าง/คอนทราสต์สุด), รูปทรง (ปั้นด้วยเงา), เวลาและสถานที่ (K, ทิศ), และอารมณ์ (ratio, key); ในงาน AI แสงเป็นสิ่งที่ "หลุด" ง่ายที่สุดระหว่างช็อต จึงต้องออกแบบเป็นระบบ

## 4. ผลต่ออารมณ์และการรับรู้
| ตัวแปร | ผลที่ใช้ในวงการ | หลักฐาน |
|---|---|---|
| ratio ต่ำ / high key | ปลอดภัย สดใส ตรงไปตรงมา | CRAFT |
| ratio สูง / low key | ลึกลับ อันตราย หนักแน่น | CRAFT; ความมืดของหนังยุคใหม่ = EVIDENCE เชิงพรรณนา |
| ความสว่างรวมสูง | ความพึงพอใจ (pleasure) สูงขึ้น (จากแผ่นสี) | EVIDENCE `ValdezMehrabian1994` (ดู FD09) |
| under-light | ผิดธรรมชาติ | MIXED |
| ตาอยู่ในเงา (top light) | ปิดบังเจตนา | CRAFT (`Willis1978_AFI`) |
| warm practical ในความมืด | อบอุ่น เหงา โรแมนติก | CRAFT |

## 5. ใช้เมื่อไร (เลือก preset)
- talking head/explainer → `lp.three_point_interview`; ช็อตลองแว่น → `lp.eyewear_glare_free_key`
- โปรโมทคลินิก/เทคโนโลยีเลนส์ → `lp.high_key_commercial`
- ร้านแว่นตีสอง/กลางคืน → `lp.motivated_practical_night` + `lp.moonlight_day_for_night`
- จุดมืดสุดของเรื่อง (~75%) → `lp.low_key_drama` / `lp.top_light_eyes_shadow`
- Mint & Tao / ตัวละครไร้หน้า → `lp.silhouette_backlit`; การ์ตูน rig → `lp.flat_cel_key_shadow`
- คลิปที่ต้องตัดต่อหลายช็อต AI → `lp.overcast_continuity` (แสงนุ่ม คุมง่าย)

## 6. ไม่ควรใช้เมื่อไร
- low key สำหรับโฆษณาที่ต้องเห็นสีสินค้าจริง หรือคลิปที่คนดูกลางแดด (ถ้าจำเป็น ให้ยก mid ตอนเกรด)
- neon/gel แรงกับสินค้าที่ต้องโชว์สีจริง (กรอบกระ/สีพาสเทล)
- แสงที่ไม่มีแหล่งในโลกของเรื่อง (แสงอุ่นที่ข้างหน้าโดยไม่มีโคม) — ยกเว้นสไตล์ที่ประกาศชัด
- ring light ด้านหน้ากับคนใส่แว่น (วงแหวนสะท้อนในเลนส์)

## 7. ตัวอย่างจากภาพยนตร์ (มีแหล่ง)
- *L.A. Confidential* (1997, Spinotti) — practical เป็น key, gel ฟ้า 1/4–1/2 กลางคืน [`Rudolph1997_LAConfidential`]
- *The Goldfinch* (2019, Deakins) — เทียนเป็นแสงเดียวในร้านอาหาร; ย้อนแสงเพดานในพิพิธภัณฑ์ [`Bosley2020_Deakins`]
- *1917* (2019, Deakins) — ถ่ายใต้เมฆเพื่อ continuity; โบสถ์ไฟไหม้ใช้เปลวไฟ+พลุ, rig 360° คุมด้วย dimmer [`Bosley2020_Deakins`]
- *The Godfather* (Willis) — overhead diffusion, ความมืดรอบตัว Pacino ตามตัวละคร [`Willis1978_AFI`]
- *Harry Potter and the Deathly Hallows Part 1* (2010) — หนังที่มืดที่สุดในตัวอย่าง 160 เรื่องของ Cutting et al. [`Cutting2011_QuickerDarker`]

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip:** เขียน *lighting script* คู่ colour script: แต่ละฉากระบุ preset id + K + ทิศ key; วางฉากมืดสุดที่ ~75% ของเรื่อง แล้วสว่างขึ้นตอนคลี่คลาย [`Cutting2016_Pace` เป็นแนวโน้ม ไม่ใช่กฎ]
- **Product/promo (แว่น):** rim ขอบกรอบบนพื้นมืด (`lp.rim_separation_dark_bg` ↔ `va.light:eyewear_metal_wire_edge_strips`), เลนส์ไม่มี glare ทุกเฟรมที่หมุน; สีกรอบถูก = ไม่ใส่ gel สีบนสินค้า
- **Reels/TikTok:** high-key หรือ low-key ที่ยก mid; key ด้านเดียวกันทุกคัตเพื่อไม่ให้ "กระพริบทิศแสง" ในการตัดเร็ว
- **Explainer:** high-key เรียบ ratio 2:1 ให้กราฟิกเด่น
- **Cartoon:** แสงเป็น "รูปทรงเงา 1 ระดับ" ทิศเดียวทั้งฉาก; ฉากกลางคืนเพิ่ม rim สีเย็นด้านตรงข้าม (`lp.flat_cel_key_shadow`)
- **Documentary/talking head:** ใช้หน้าต่างเป็น key + bounce; negative fill ด้านเงาในห้องขาว

## 9. AI image prompt examples (ระบุ แหล่ง-ทิศ-ขนาด-K-ratio)
1. `night optical shop, the only key light is a warm 2700K desk lamp on the counter at frame left, cool moonlight through the window as faint fill, deep shadows, warm pools of light` (`lp.motivated_practical_night`)
2. `portrait wearing clear glasses, large soft key high and 50 degrees to the left, gentle fill, no reflections on the lenses, eyes clearly visible` (`lp.eyewear_glare_free_key`)
3. `black acetate frames on a dark background, two thin strip lights behind on both sides outlining the frame, minimal front fill` (`lp.rim_separation_dark_bg`)
4. `faceless girl in silhouette against a bright window, completely dark figure, clean profile` (`lp.silhouette_backlit`)
5. `man under a single overhead light, eyes hidden in shadow under the brow, dark room` (`lp.top_light_eyes_shadow`)
หลีกเลี่ยงคำว่า "cinematic lighting" เฉยๆ — ไม่บอกแหล่ง/ทิศ (curriculum 04 §4 เห็นตรงกัน)

## 10. AI video prompt examples
1. `LIGHT: warm practical desk lamp key from frame left, cool moonlight fill from the window, lighting stays constant.` + action (บล็อก LIGHT: เหมือนกันทุกช็อตของฉาก)
2. `candlelight gently flickers on her face, only surfaces near the flame flicker` (กัน flicker ทั้งเฟรม)
3. `overcast soft daylight, no direct sun, consistent diffuse light throughout the shot` (`lp.overcast_continuity`)
หมายเหตุ: CAPABILITY_MATRIX ระบุ Wan 2.2 "lighting words untested systematically"; model card อ้างว่าข้อมูลฝึกมี label แสง/คอนทราสต์/โทนสี (คำอ้างของผู้ผลิต สำหรับ Wan2.2 ทั้งตระกูล) [`Wan22_ModelCard`] — Wan รักษาแสงของภาพต้นทาง (image-to-video) มากกว่าตาม prompt → **จัดแสงให้ถูกในภาพนิ่งก่อน**

## 11. Shot list example (ร้านแว่นตีสอง EP, 4 ช็อต)
| # | ช็อต | preset | Key (ทิศ/K) | Fill/ratio | Back | continuity note |
|---|---|---|---|---|---|---|
| 1 | WS ร้านจากถนน | `lp.moonlight_day_for_night` + ป้ายร้าน | จันทร์ขวาบน 7000K | ไม่มี, 8:1 | หน้าต่างร้าน 2700K | ป้ายร้านเป็น warm reference |
| 2 | MS ช่างที่เคาน์เตอร์ | `lp.motivated_practical_night` | โคมซ้าย 2700K | หน้าต่าง 6500K, 4:1 | ไฟถนน 4000K | โคมอยู่ซ้ายทุกช็อต |
| 3 | CU ลูกค้าลองแว่น | `lp.eyewear_glare_free_key` (motivated เป็นโคม) | ซ้ายสูง 50° 2700K | 3:1 | rim เย็น | ไม่มี glare บนเลนส์ |
| 4 | Insert แว่นบนถาด | `lp.rim_separation_dark_bg` | — | — | strip 2 ข้าง | สีกรอบตรงกับรูปจริงใน kit |

## 12. ข้อผิดพลาดที่พบบ่อย
- ทิศ key สลับข้างระหว่างช็อตของฉากเดียว (โดยเฉพาะ AI ที่ generate แยก)
- fill เท่า key → แบน "ไร้แหล่ง"; rim แรงจนขอบเรือง
- ใช้ K เป็นตัวเลขตรงๆ แทนการคิดเป็น mired → อุ่นเกิน
- กลางคืนที่ฟ้าทั้งเฟรมโดยไม่มี warm reference → อ่านเป็น white balance ผิด
- flicker ของ AI video ทำให้ความสว่างทั้งภาพกระพริบ (แก้ `deflicker` ตาม curriculum 11)
- ตีความ ratio จากแหล่งที่ใช้นิยามต่างกัน

## 13. วิธีตรวจและแก้
1. **Thumbnail strip:** ดึง 1 เฟรม/ช็อต เรียงต่อกัน (`ffmpeg ... tile`) ดูว่าทิศเงาบนหน้าไปทางเดียวกันทุกช็อต
2. **Waveform:** หน้า 55–75% (โทนกลาง/ผิวทั่วไป, CRAFT), ฉากหลังต่ำกว่า 1–2 stops สำหรับ preset ทั่วไป: `ffmpeg -ss 2 -i clip.mp4 -frames:v 1 -vf "waveform=display=parade:intensity=0.2" tmp/parade.png`
3. **Practical audit:** ชี้ทุกจุดสว่างแล้วบอกแหล่งในเฟรม — ถ้าบอกไม่ได้ = unmotivated
4. **แว่น:** เลื่อนดูทุกเฟรมที่หัวหมุน หา glare บังรูม่านตา
5. **แก้:** AI ภาพนิ่ง → regenerate ด้วยบล็อก LIGHT เดียวกัน หรือ FLUX img2img denoise ~0.35 เพื่อดึงให้ตรงช็อตอ้างอิง (CAPABILITY_MATRIX: img2img ทำกลางวัน↔กลางคืนไม่ได้); วิดีโอ → เกรดจับคู่ (FD09)

## 14. แบบฝึกหัด + test case
- **T1 Ratio ladder:** หน้าเดียว 4 ภาพ ratio 1:1 / 2:1 / 4:1 / 8:1 (ภาพนิ่ง FLUX หรือถ่ายจริง) — ผู้ดูจับคู่กับคำ "สดใส/ปกติ/จริงจัง/อันตราย"; ดูว่าตรงกับ §4 ไหม
- **T2 Motivation:** ฉากกลางคืนเดียวกัน (ก) key อุ่นข้างที่มีโคม (ข) key อุ่นข้างที่ไม่มีโคม — ถามว่าภาพไหน "ดูจริง"
- **T3 Continuity:** generate 4 ช็อตของฉากเดียว (ก) prompt แสงต่างกันเล็กน้อย (ข) บล็อก LIGHT: เดียวกันคำต่อคำ — วัดความต่างความสว่างเฉลี่ย/ทิศเงาข้ามช็อต
- **T4 Darkness arc:** คลิป 60 วิ สองเวอร์ชัน: ความสว่างคงที่ vs มืดสุดที่ ~45 วิ แล้วสว่าง — ถามผู้ดูว่าเวอร์ชันไหน "มีจุดพีค"
- **T5 Mired:** เกรดฉากเดียวด้วย `colortemperature` 5500→5000 และ 7000→6500 — เห็นว่าระยะ K เท่ากันแต่ความเปลี่ยนต่างกัน

## 15. แหล่งอ้างอิง
`Holben2020_LightQuality`, `StudioBinder_LightingRatios`, `Holben2014_Mired`, `Rudolph1997_LAConfidential`, `Bosley2020_Deakins`, `Willis1978_AFI`,
`Cutting2011_QuickerDarker`, `Cutting2016_Pace`, `Adams2004_LightFromAbove`, `Brown2022_Cinematography`, `ValdezMehrabian1994`, `Wan22_ModelCard` — ใน `sources/image.json`
