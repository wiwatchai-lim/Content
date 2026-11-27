# FD05 — Lens & Optical Physics (เลนส์และฟิสิกส์แสงเชิง "ภาษาภาพยนตร์")

> ต่อยอด ไม่ซ้ำ: **สูตรและตัวเลข** (FOV, crop factor, DOF/CoC/hyperfocal, depth of focus, aberration, shutter angle) อยู่ใน
> `creative-intelligence/knowledge/visual-arts/LENS_OPTICS.md` (คำนวณใหม่แล้ว 2026-11-25) และตัวอย่างใช้งาน 19 แบบใน `lens_examples.json`;
> ประเภทเลนส์/T-stop/ประวัติใน `curriculum/02-camera-lens.md`.
> บทนี้เพิ่ม: **การเลือกเลนส์จากเรื่อง** (เลนส์เป็นมุมมองของใคร), เลนส์ × ขนาดภาพ × ระยะ เป็นตารางตัดสินใจ, anamorphic/probe/tilt-shift ในเชิงเล่าเรื่อง,
> zoom vs dolly ในเชิงการรับรู้, และวิธีเขียนเลนส์ใน prompt ให้ได้ผล. คลัง → `libraries/LENS_KNOWLEDGE_LIBRARY.json` (17 รายการ, ลิงก์ `lens.*` เดิม)

## 1. นิยามและหลักการพื้นฐาน
- **Focal length** กำหนด field of view เท่านั้น; **perspective มาจากระยะกล้อง** (ใกล้ = ใกล้-ไกลต่างกันมาก) — "เลนส์กว้างบิดหน้า" จริง ๆ คือ "ยืนใกล้" (LENS_OPTICS §2, `va:Wiki-PerspectiveDistortion`)
- **Aperture / f-number** + ระยะโฟกัส + focal length + ขนาดเซนเซอร์ → **depth of field** (`va:Nasse2010-Zeiss`)
- **Normal lens** ≈ เส้นทแยงฟอร์แมต (43 มม. FF) แต่ "ดูเป็นธรรมชาติ" เฉพาะเมื่อดูจากระยะใกล้ center of projection; บนจอเล็กที่ถือห่าง ~30 ซม. focal ที่ดูธรรมชาติยาวขึ้น
  (ค่ามัธยฐานของภาพ Flickr SLR 3,930 ภาพ = 68 มม.) (`va:CooperPiazzaBanks2012`, A)
- ทุกตัวเลขในบทนี้เป็น **FF-equivalent** (`lens.sensor_crop`)

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 ตารางตัดสินใจ: ขนาดภาพ × ระยะ × เลนส์ × ความหมาย [CRAFT เว้นแต่ระบุ]
| ต้องการ | ระยะ | เลนส์ | ผลข้างเคียง |
|---|---|---|---|
| CU หน้าน่าไว้ใจ, สินค้ารูปทรงจริง | ≥ 1.5 ม. | 85–135 | ฉากหลังละลาย (EVIDENCE: BryanPeronaAdolphs2012) |
| CU ตลก/อึดอัด/ดุดัน | 0.3–0.6 ม. | 16–24 | จมูกโต, ฉากลึก (`lens.close_wide_comedy`) |
| ตัวละครในสภาพแวดล้อม | 2–3 ม. | 24–35 | เห็นห้องรอบตัว |
| คนถูกเฝ้ามอง/โดดเดี่ยวในฝูงชน | ไกลมาก | 135–400 | ฉากหลัง "ชิด", มือสั่นขยาย |
| รายละเอียดฝีมือ | ระยะ macro | macro 60–105 / probe 24 | DOF เป็นมิลลิเมตร |
| ทั้งฉากชัด (staging in depth) | กลาง | 18–28 f/8–16 hyperfocal | ไม่มีตัวช่วยเลือกจุดมอง |

### 2.2 เลนส์เป็นมุมมอง (lens as POV)
- เลนส์กว้างใกล้ = "อยู่ในฉากกับตัวละคร", เลนส์ยาวไกล = "มองจากที่อื่น" (voyeur/surveillance) [CRAFT]
- การเปลี่ยนเลนส์ตามองก์ (เช่น กว้างขึ้นเรื่อย ๆ เมื่อโลกของตัวละครพัง) เป็น "lens arc" [CRAFT, unverified — ยังไม่มีแหล่งที่อ่าน]
- **Zoom vs dolly** ต่อสมอง: ในห้องเดียวกัน Steadicam approach กระตุ้น motor-cortex desynchronisation แรงกว่า zoom; ผู้ชมรู้สึกเหมือนคนเดินเข้าไป (`Heimann2019`, A, n=18) →
  zoom = "มองใกล้ขึ้น" (optical, เครื่องจักร, สารคดียุค 70 — CRAFT), dolly = "ก้าวเข้าไป"
- **Dolly zoom**: subject ขนาดคงที่ แต่ perspective ฉากหลังเปลี่ยน; ความกว้างคงที่ W ที่ระยะ d เมื่อ d = W/(2·tan(FOV/2)) (`Wiki-DollyZoom`)

### 2.3 เลนส์พิเศษในเชิงเล่าเรื่อง
- **Anamorphic**: bokeh รูปไข่แนวตั้ง (ต้องเป็น front-anamorphic element หน้า iris), flare เส้นแนวนอน (astigmatism), squeeze 2x (S35) / 1.8x (FF) — squeeze น้อย = ลักษณะอ่อนลง
  (`NFS-AnamorphicBokeh` D, `Cooke-Anamorphic` C) → สัญญาณ "หนังใหญ่/ไซไฟ/neo-noir" [CRAFT]; **ขัดกับ 9:16**
- **Tilt**: หมุนระนาบโฟกัส (Scheimpflug) → DOF รูปลิ่ม: ระนาบเอียงชัดทั้งแผ่น หรือแถบชัดบาง ๆ = miniature (`Canon-TSE`); blur gradient แรงทำให้ฉากดูเป็นโมเดลจิ๋ว (`va:Held2010`, A)
- **Shift**: เลื่อนภาพโดยไม่ขยับกล้อง → เส้นตั้งขนาน (สถาปัตย์/หน้าร้านแนวตั้ง) (`Canon-TSE`; `lens.shift_storefront_9x16`)
- **Probe lens**: macro มุมกว้าง 85°, 2:1, ท่อยาวสอดเข้าไประหว่างวัตถุ — โลกของแมลง (`Laowa-Probe`)
- **Fisheye**: ไม่ใช่ rectilinear — ช่องตาแมว/กล้องประตู/กีฬา (`lens.fisheye_peephole_pov`)

### 2.4 สิ่งที่โมเดล AI ทำ/ไม่ทำกับคำเลนส์
- Veo ระบุคำ: wide-angle, telephoto, fisheye effect, shallow/deep DOF, rack focus, lens flare, vertigo effect (บางเลนส์ "ไม่รองรับอย่างเป็นทางการ") (`Google-VeoPromptGuide`)
- FLUX (ในเครื่อง): คำ lens/DoF ดึงภาพสไตล์ไม่ใช่ภาพถ่ายให้กลายเป็นภาพถ่าย 3D (CAPABILITY_MATRIX — สังเกตจริง) → งานดินสอ/ชาร์โคล **ห้ามใส่คำเลนส์**
- โมเดลไม่จำลองเซนเซอร์ → เขียน "ผลที่เห็น" (ฉากหลังละลาย, bokeh รูปไข่แนวตั้ง, เส้นตั้งตรง) ไม่ใช่แค่ชื่อเลนส์

## 3. เหตุผลที่ใช้
เลนส์+ระยะคือการเลือก "ความสัมพันธ์ทางกายภาพ" ระหว่างกล้องกับ subject — มันเปลี่ยนรูปหน้า (trust), ความลึกของโลก, และสิ่งที่คนดูถูกบังคับให้มอง (DOF)

## 4. ผลต่ออารมณ์และการรับรู้
- ระยะใกล้กับใบหน้า → น่าไว้ใจ/สามารถ/น่าดึงดูดน้อยลงเล็กน้อย (d≈0.24) และคนดูไม่รู้ตัว (`va:BryanPeronaAdolphs2012`, EVIDENCE)
- DOF ตื้น → ตาไปที่จุดชัด; gradient blur แรง → ฉากดูเล็กลง (`va:Held2010`)
- Zoom < dolly ในการกระตุ้นการรับรู้แบบ embodied (`Heimann2019`)
- Anamorphic/flare → "cinematic", nostalgia (CRAFT)

## 5. ใช้เมื่อไร
- หน้าคน/สินค้าที่ต้อง "จริง": `lens.fl_85` ที่ ≥ 1.5 ม.
- อยากให้คนดูอยู่ในห้องกับตัวละคร: `lens.fl_wide`/`lens.fl_35` + กล้องเคลื่อน
- รายละเอียด: `lens.macro`, ฉากจิ๋ว: `lens.tilt`, หน้าร้านแนวตั้ง: `lens.shift`
- หลายระนาบมีความหมาย: `lens.deep_focus`

## 6. ไม่ควรใช้เมื่อไร
- wide ใกล้หน้าในงาน beauty/try-on · anamorphic ใน 9:16 · tilt-shift ที่ eye level (ไม่เป็นจิ๋ว) · DOF ตื้นกับภาพกลุ่ม/มุกที่อยู่ฉากหลัง ·
  คำเลนส์ใน prompt สไตล์วาดมือ (FLUX) · flare ที่ไม่มีแหล่งแสงในเฟรม

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- Dolly zoom (ผลทางเลนส์+ระยะ): *Vertigo* (1958), *Jaws* (1975), *Goodfellas* (1990), *Raging Bull* (1980), *The Lion King* (1994), *Ratatouille* (2007) (`Wiki-DollyZoom`, E)
- *1917* (2019): ถ่ายด้วยกล้อง large format ARRI Alexa Mini LF (`Deakins1917-Planning`, D — รายงานข่าว)
- *Mission: Impossible III* — ภาพนิ่งประกอบคำอธิบาย bokeh anamorphic ใน No Film School (`NFS-AnamorphicBokeh`)
- ตัวอย่าง lens arc/เลนส์ตามองก์ในหนังที่มีแหล่งรองรับ — ยังไม่มี (gap)

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip (2D)**: ไม่มีเลนส์จริง แต่ "เลียนแบบผล": DOF = `--blur` ต่อ layer; wide = เพิ่มความต่างขนาด fg/bg และ `--d` ห่างกัน (1.4/1/0.7); tele = `--d` ใกล้กัน (1.1/1/0.95) + bg เบลอมาก
- **Product/promo แว่น**: 85–100 มม. ≥1.5 ม. สำหรับหน้า; catalogue packshot ระยะไกล+tele ให้รูปทรงจริง (`lens.catalogue_packshot`); macro บานพับ (`lens.hinge_macro_stack`); โชว์ AR coating ด้วย flare ก่อน/หลัง (`lens.coating_ghost_demo`)
- **Reels 9:16**: บนมือถือ 70–100 มม.-equivalent ดูเป็นธรรมชาติกว่าสำหรับคน/สินค้า (DERIVED จาก CooperPiazzaBanks2012, LENS_OPTICS); ใช้ shift ให้หน้าร้านตรง
- **Explainer**: deep focus ให้ presenter + กระดานชัดทั้งคู่
- **Cartoon**: ภาพดินสอ/ชาร์โคล → ไม่มีคำเลนส์; ใช้ "ขนาด+การทับซ้อน" แทน perspective
- **Documentary/talking head**: 50–85 มม., f/2.8–4 (หน้าชัดทั้งหน้า: `lens.whole_frame_sharp_face`), กล้องที่ 2 กว้างกว่า

## 9. AI image prompt examples
```
portrait of a woman trying on glasses, 85mm lens, photographed from 1.5 m, f/2, shallow depth of field, eyes in sharp focus, soft shop background
anamorphic lens look, vertical oval bokeh, horizontal blue streak flare from a street light, night city, 2.39:1 framing
tilt-shift miniature effect, high angle over a busy night market, thin band of sharp focus, toy-like saturated colours
macro photograph of an eyeglass hinge, 1:1 magnification, razor-thin depth of field, specular highlights, dark background
architectural photo of a shopfront, level camera, perfectly vertical lines, shift-lens perspective correction, vertical 9:16
```

## 10. AI video prompt examples
```
A cinematic close-up portrait of a woman sitting in a café at night, with a very shallow depth of field.      (ตัวอย่างจาก Veo guide)
85mm close-up, shallow focus on her eyes as she adjusts her new glasses; focus stays on the eyes.
Long-lens telephoto shot from across the street; she walks toward camera through the crowd, background stacked and soft.
Dolly zoom on the man's face: he stays the same size while the corridor behind him stretches away.
```
- AI rack focus/dolly zoom ไม่แน่นอน → ทำใน rig.js (`cam.rack`, `cam.vertigo`) หรือ 2.5D ที่ deterministic

## 11. Shot list example (โฆษณาเลนส์กรองแสงสีฟ้า 15 s, 9:16)
| # | ช็อต | เลนส์/ระยะ | เหตุผล |
|---|---|---|---|
| 1 | MCU คนทำงานหน้าจอตอนดึก | 35 มม., 0.8 ม. | อยู่ "ในห้อง" กับความเหนื่อย |
| 2 | CU ตาแสบ | 100 มม., 1.5 ม., DOF ตื้น | อารมณ์โดยไม่บิดหน้า |
| 3 | ECU เลนส์สะท้อนจอ | macro | แสดงผลิตภัณฑ์ |
| 4 | MS ใส่แว่น ผ่อนคลาย | 85 มม., 2 ม. | trust |
| 5 | WS ห้อง+โลโก้ | 24 มม. deep focus | ปิดกว้าง |

## 12. ข้อผิดพลาดที่พบบ่อย
1. โทษเลนส์ว่าบิดหน้า (จริง ๆ คือระยะ) 2. ใช้ focal จริงของมือถือ (6 มม.) ใน prompt 3. DOF ตื้นจนโฟกัสหลุดไปที่กรอบแว่นแทนตา 4. anamorphic ทุกช็อต
5. ใส่ "85mm, bokeh" ในภาพดินสอ (กลายเป็นภาพถ่าย) 6. ใช้ zoom ดิจิทัลบนภาพความละเอียดต่ำ (แตก)

## 13. วิธีตรวจและแก้
- ใบหน้า: ระยะ ≥ 1.5 ม. ไหม (ถ้าไม่ตั้งใจให้ตลก)? จมูก/หูสัดส่วนปกติไหม
- โฟกัส: ซูม 100% ที่ตาข้างใกล้ — ชัดไหม
- สินค้าแว่น: รูปทรงตรงกับภาพ catalogue ไหม (ขาแว่นไม่หด/ยืด)
- prompt: คำเลนส์อธิบาย "ผลที่เห็น" ด้วยไหม; สไตล์วาดมือไม่มีคำเลนส์
- เครื่องมือวัดคมชัด: `analyze_image.py` วัดที่ saliency peak ไม่ใช่จุดโฟกัสที่ตั้งใจ (CAPABILITY_MATRIX limit) → ตรวจด้วยตาที่ตำแหน่งตา

## 14. แบบฝึกหัด + test case
- **TC-FD05-A (ระยะ vs เลนส์)**: MCU คนเดียวกัน FLUX 3 prompt: "24mm from 0.5 m", "50mm from 1.2 m", "100mm from 2.5 m" (seed เดียว) → AI ทำตามระยะไหม? ผู้ใช้เลือกน่าไว้ใจสุด
- **TC-FD05-B (2D lens emulation)**: ฉาก rig.js เดียว `--d` ชุด wide (1.4/1/0.7) vs tele (1.1/1/0.95) + push เท่ากัน → ความรู้สึกต่างกันไหม
- **TC-FD05-C (anamorphic word)**: prompt "anamorphic" อย่างเดียว vs "vertical oval bokeh + horizontal streak flare" → อันไหนได้ลักษณะจริงมากกว่า (คาด: แบบบรรยาย)

## 15. แหล่งอ้างอิง
`sources/camera.json`: Heimann2019, Wiki-DollyZoom, Cooke-Anamorphic, NFS-AnamorphicBokeh, Canon-TSE, Laowa-Probe, Google-VeoPromptGuide, Deakins1917-Planning, Brown2022, FilmArt13 ·
visual-arts `sources_camera.json`: CooperPiazzaBanks2012, BryanPeronaAdolphs2012, Nasse2010-Zeiss, Held2010, Wiki-AngleOfView, Wiki-DepthOfField, Wiki-PerspectiveDistortion, Wiki-FisheyeLens, RED-ShutterAngle.
**Gaps**: ไม่มีงานวิจัยผลทางอารมณ์ของ focal length โดยตรง (แยกจากระยะ); lens arc ในหนังยังไม่มีแหล่ง; ไม่ได้อ่านเอกสาร Cooke ต้นฉบับ (search-summary)
