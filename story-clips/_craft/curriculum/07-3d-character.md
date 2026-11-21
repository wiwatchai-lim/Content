# บทที่ 7 — 3D & Character Animation (สามมิติและการทำให้ตัวละครเคลื่อนไหว)

> เป้าหมาย: เข้าใจสายการผลิต 3D ตั้งแต่ปั้นโมเดลจนเรนเดอร์ (modeling → UV → texture/PBR → rig → skin → animate → light → render) พอจะ "สั่ง" AI ให้ได้ภาพแบบ 3D ที่ดูมีเหตุผล ทำภาพสินค้าแว่นที่วัสดุถูกต้อง (แก้ว/acetate/โลหะ) และรู้ว่าเมื่อไรควรใช้ 3D จริงใน browser (Three.js) เมื่อไรใช้ AI ก็พอ
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — Pipeline 8 ขั้น
งาน 3D ทุกชิ้น (หนัง Pixar, เกม, ภาพสินค้าแว่น) เดินตามลำดับเดียวกัน ขั้นหลังพังได้ถ้าขั้นก่อนทำไม่ดี

| ขั้น | ทำอะไร | ผิดพลาดตรงนี้แล้วเห็นผลที่ไหน |
|---|---|---|
| **Modeling** | ปั้นรูปทรงด้วย polygon (vertex → edge → face) | ขอบแว่นเหลี่ยมเป็นซี่, ข้อต่อพับแล้วยุบ |
| **Topology** | วาง "เส้นไหล" ของ polygon ให้เป็นสี่เหลี่ยม (quad) วนรอบข้อต่อ ตา ปาก | rig แล้วยืดเพี้ยน หน้าย่นผิดที่ |
| **UV unwrapping** | คลี่ผิว 3D ออกเป็นแผ่น 2D เพื่อแปะลาย | ลายกระดองเต่ายืด/มีรอยต่อ (seam) โผล่ |
| **Texturing / PBR** | ใส่ base color, roughness, metallic, normal map | วัตถุดูพลาสติก/ดูเป็นของเล่น |
| **Rigging** | ใส่โครงกระดูก (armature/bones) + ตัวควบคุม (controls) | animator ขยับยาก ท่าแข็ง |
| **Skinning** | ผูกผิวกับกระดูกด้วยน้ำหนัก (weight painting) | ศอกพับแล้วบี้แบน ไหล่ยุบ ("candy wrapper") |
| **Animation** | ตั้ง keyframe แล้วปรับเส้นโค้งใน graph editor | ขยับเหมือนหุ่นยนต์ ไม่มีน้ำหนัก |
| **Lighting & Rendering** | วางไฟ กล้อง แล้วคำนวณภาพ | ภาพแบน, noise, render ช้าเกินงบเวลา |

**PBR (Physically Based Rendering)** = ระบบวัสดุที่อิงฟิสิกส์ แทนที่จะ "ระบายให้ดูเงา" เราบอกค่าวัสดุจริง แล้ว renderer คำนวณแสงเอง มาตรฐานที่ใช้กันมากที่สุดคือ **metallic-roughness** (เป็นแกนกลางของ glTF 2.0):
- **Base color** — สีเนื้อวัสดุ (ไม่มีเงา/ไฮไลต์ติดมา)
- **Metallic** — 0 = ไม่ใช่โลหะ (พลาสติก acetate, ผิว, ไม้), 1 = โลหะ (ไทเทเนียม, สแตนเลส) ค่ากลาง ๆ ใช้แค่ขอบเขตผสม เช่น สนิม/ฝุ่น
- **Roughness** — 0 = เงาเหมือนกระจก, 1 = ด้านกระจายแสง
- **Normal map** — หลอกรายละเอียดผิว (รอยขีด, ลายสลัก) โดยไม่ต้องเพิ่ม polygon
- **Transmission + IOR** — วัสดุโปร่งแสงหักเหแสง (เลนส์) IOR 1.5 คือค่าประมาณของแก้วที่ Blender manual แนะนำเป็นค่า default

### 1.2 ขั้นสูง
- **FK vs IK:**
  - **FK (Forward Kinematics)** หมุนจากโคนไปปลาย (ไหล่ → ศอก → ข้อมือ) ได้ **arc** สวยเป็นธรรมชาติ เหมาะกับแขนเหวี่ยง โบกมือ
  - **IK (Inverse Kinematics)** จับปลาย (มือ/เท้า) วางไว้ แล้วระบบคำนวณข้อต่อกลางให้ เหมาะกับเท้าที่ต้องติดพื้น มือวางบนโต๊ะ มือจับขาแว่น
  - rig ที่ดีมี **FK/IK switch** ใน Blender IK เป็น constraint ตัวหนึ่ง (Inverse Kinematics constraint) ต้องมี **pole target** บอกทิศเข่า/ศอก ไม่งั้นเข่าพลิก
- **Blendshapes / Shape keys / Morph targets** (ชื่อต่างกันตามโปรแกรม: Maya = blendshape, Blender = shape key, glTF/Three.js = morph target) — เก็บรูปทรงหน้าหลายแบบ (ยิ้ม, อ้าปาก "A", หลับตา) แล้วผสมด้วยค่า 0–1 ใช้กับหน้าและปากเป็นหลัก เพราะกระดูกอย่างเดียวทำรอยย่นแก้มไม่ได้ ระบบมาตรฐานคือ **FACS** (Facial Action Coding System แยกการขยับหน้าเป็น action unit) ซึ่ง MetaHuman และ ARKit (52 blendshapes) ใช้
- **Skinning ขั้นสูง:** Linear blend skinning ทำให้ข้อต่อบิดแล้วยุบ ("candy wrapper") แก้ด้วย dual quaternion skinning, corrective shape keys (shape ที่ติดเมื่อศอกพับเกิน 90°) หรือ helper bones
- **Animation — curves:**
  - Keyframe คือ "ท่า" ส่วนเส้นโค้งระหว่างคีย์ (interpolation) คือ "จังหวะ" — **graph editor** แสดงค่า (เช่น ตำแหน่ง Y) เทียบเวลา
  - เส้นลาดชัน = เร็ว, แบนราบ = ช้า/หยุด
  - **Bezier ease in/out** = เร่ง-ผ่อน (ดูนุ่มแต่ถ้าทุกคีย์ ease หมดจะดู "ลอย") / **Linear** = เครื่องจักร / **Constant (stepped)** = ใช้ตอน blocking
  - ลำดับทำงานมืออาชีพ: **blocking (stepped)** → **spline** → **polish** อย่าเปิด spline ตั้งแต่ต้น
- **หลักแอนิเมชันที่ใช้มากที่สุดใน 3D** (จาก 12 principles ของ Disney):
  - **Arcs** — สิ่งมีชีวิตเคลื่อนเป็นเส้นโค้ง ใน 3D ต้องเปิด motion path ตรวจทุกครั้ง เพราะ interpolation มักทำให้มือวิ่งเป็นเส้นตรง
  - **Overlap & follow-through** — ส่วนต่าง ๆ ไม่หยุดพร้อมกัน (ผม, ชายเสื้อ, หาง, สายคล้องแว่น ช้ากว่าตัว 2–4 เฟรม) ทำด้วยการ **offset keys** ในกราฟ
  - **Anticipation, squash & stretch, timing/spacing** — เหมือนบท 2D (GUIDE.md) แต่ใน 3D ต้องคุมไม่ให้ volume เปลี่ยน
- **Mocap & AI mocap:**
  - **Optical mocap** (มาร์กเกอร์ + กล้องหลายตัว) แม่นที่สุด, **inertial suit** (Xsens, Rokoko) พกพาได้
  - **AI mocap จากวิดีโอธรรมดา** (เช่น Move.ai, Rokoko Vision, DeepMotion) เร็วและถูก แต่มี **foot sliding**, jitter และมือ/นิ้วเพี้ยน ต้องทำ cleanup เสมอ
  - Mocap ให้ "ความจริง" แต่ไม่ให้ "การแสดง" งานสไตล์การ์ตูนมักต้อง retime และ exaggerate ต่อ
  - **Retargeting** = ย้ายท่าจากโครงกระดูกหนึ่งไปอีกโครง (สัดส่วนต่างกันต้องตั้ง IK เท้าให้ไม่ลอย)
- **Facial animation & lip-sync:**
  - ใช้ **visemes** (รูปปากตามเสียง ประมาณ 8–15 แบบ) ไม่ใช่ตัวอักษร
  - หลักเดียวกับ 2D ของเรา: ปากนำเสียง 1–2 เฟรม, ปิดปาก (M/B/P) ให้ชัด, ไม่ "flap" ทุกพยางค์
  - งานระดับสูง: MetaHuman Animator (Unreal) แปลงวิดีโอหน้า/iPhone depth เป็น facial animation ส่วน audio-to-face (เช่น NVIDIA Audio2Face) สร้างจากเสียง
- **Lighting & Rendering:**
  - **Path tracing** (Blender **Cycles**, Unreal **Path Tracer**, Arnold, RenderMan) ยิงแสงสุ่มสะท้อนหลายรอบ แม่นทางฟิสิกส์ (แก้วหักเห caustics, GI) แต่ช้าและมี noise ต้อง denoise
  - **Real-time / rasterization** (Blender **EEVEE**, Unreal **Lumen**, Three.js) เร็วระดับวินาทีต่อเฟรม แต่ต้องโกง (screen-space reflection, probe) แก้วและเงาซ้อนกันมักผิด
  - Blender manual ระบุว่า EEVEE ไม่ใช่ path tracer และ Cycles จะแม่นทางฟิสิกส์กว่าเสมอ แต่ใช้ shader node ชุดเดียวกัน ควรเลือก engine ตั้งแต่ต้นโปรเจกต์ เพราะวัสดุอาจออกมาต่างกัน
  - Unreal: **Lumen** = GI/reflection แบบ dynamic เป็นค่า default ส่วน **Path Tracer** = โหมด progressive สำหรับภาพ final ต้องเปิด Hardware Ray Tracing
  - **HDRI** (ภาพ 360° ที่เก็บความสว่างจริง) เป็นทั้งแหล่งแสงและสิ่งที่สะท้อนบนโลหะ/เลนส์ — สำหรับสินค้าเงาวาว *สิ่งที่สะท้อนสำคัญกว่าตัวไฟ*
- **กล้องใน 3D:** กล้อง 3D มี focal length, sensor size, f-stop, focus distance เหมือนกล้องจริง (บทที่ 1) และควรตั้งให้สมจริง: 50–100mm สำหรับสินค้า (ไม่บิด), ใช้ DoF จริงของ renderer, กล้องเคลื่อนด้วยเส้นโค้งนุ่มแต่ไม่ "ลอยแบบโดรน" ทุกช็อต — เพิ่ม camera shake เบา ๆ หรือ handheld noise เพื่อให้มีคนถือ
- **Stylized 3D / NPR (Non-Photorealistic Rendering):**
  - **Spider-Verse look:** animate ส่วนใหญ่ **on twos** (ท่าเปลี่ยนทุก 2 เฟรม) ผสม ones/threes, ไม่ใช้ motion blur แต่ใช้ smear และเส้นแทน, halftone/Ben-Day dots, เส้น ink วาดทับ, offset สี (chromatic misregistration) ทำผ่านเครื่องมือ compositing ที่ทำให้ภาพ 3D ดูวาดมือ (Sony Imageworks นำเสนอที่ SIGGRAPH)
  - **Arcane (Fortiche):** ตัวละคร 3D + texture ระบายมือ (painted textures) + ฉากหลัง 2D painting + เอฟเฟกต์ 2D วาดมือ
  - **Toon shader / cel shading:** แสงแบ่งเป็น 2–3 ขั้น (ramp) แทนไล่เฉด + เส้นขอบ (outline: inverted hull หรือ Freestyle/Line Art ใน Blender) ใน Blender ทำด้วย Shader to RGB → Color Ramp (EEVEE เท่านั้น)
  - หัวใจของ stylized คือ **ออกแบบให้เลือกทิ้งความจริง** (เงาเป็นรูปทรงที่จงใจ, จำนวนเฟรมที่จงใจ) ไม่ใช่แค่ใส่ filter
- **3D Product rendering ของแว่น — วัสดุ 3 แบบ:**

| วัสดุ | Metallic | Roughness | สิ่งที่ต้องมี |
|---|---|---|---|
| **เลนส์ (glass/polycarbonate)** | 0 | 0–0.05 | Transmission 1, IOR 1.5 (CR-39) ~1.59 (polycarbonate) ~1.67/1.74 (high-index), thickness ที่ขอบ, coating = สะท้อนสีเขียว/ม่วงจาง ๆ (thin-film) |
| **Acetate** | 0 | 0.05–0.2 (ขัดเงา) / 0.4+ (matte) | ลายกระดองเต่าที่ **มีความลึก** → ใช้ subsurface/transmission บาง ๆ + clearcoat, ลายต้องไม่ยืดตามขอบ (UV ดี) |
| **โลหะ (titanium/stainless)** | 1 | 0.15–0.35 (brushed ใช้ anisotropic) | สีโลหะอยู่ใน base color (ทองอุ่น, ไทเทเนียมเทาอมน้ำตาล), ต้องมีสิ่งแวดล้อมให้สะท้อน (HDRI/softbox) ไม่งั้นดำ |

  ปัญหาเฉพาะของแว่น: เลนส์ใสโปร่งแต่ต้อง **มองเห็นว่ามีอยู่** → ใช้ไฮไลต์จาก softbox แถบยาว + การหักเหที่บิดฉากหลังเล็กน้อย (เดียวกับกฎ "lens layer" ในบ้านเรา)
- **Image-to-3D AI:** TRELLIS (Microsoft), Hunyuan3D (Tencent), Meshy, Tripo, Rodin ฯลฯ รับภาพ 1–4 ภาพแล้วคืนโมเดล GLB พร้อม PBR texture ภายในวินาทีถึงนาที
  - ดีกับ: ของทรงตัน (แก้วกาแฟ, กล่อง, ตัวละครมาสคอต), placeholder ในฉาก
  - แย่กับ: **แว่นตา** (ชิ้นบาง โปร่ง มีรู มีบานพับ — ได้เลนส์ทึบ ขาแว่นหลอมติดกัน), ตัวหนังสือ/โลโก้, ความแม่นของสัดส่วน — ใช้ขายสินค้าจริงไม่ได้ถ้าไม่ซ่อม
  - topology มักเป็นสามเหลี่ยมยุ่ง ต้อง retopology ก่อน rig
- **Browser 3D — Three.js + glTF:**
  - **glTF 2.0** ("JPEG ของ 3D", ไฟล์ `.glb`) เก็บ mesh, PBR metallic-roughness, skin, animation, morph target ในไฟล์เดียว เป็นมาตรฐาน ISO/IEC 12113:2022
  - Blender export glTF ได้ตรง, Three.js โหลดด้วย `GLTFLoader`; วัสดุที่มี extension `KHR_materials_transmission` จะกลายเป็น `MeshPhysicalMaterial` (มี transmission, ior, clearcoat, iridescence)
  - ข้อควรรู้: MeshPhysicalMaterial กินแรงต่อพิกเซลมากกว่า material อื่น, เมื่อใช้ transmission ไม่ควรใช้ร่วมกับ opacity แบบ alpha
  - ใน HyperFrames ใช้ Three.js ผ่าน adapter ได้ ต้องให้ทุกอย่าง **seek-safe** (ตำแหน่งคำนวณจากเวลา ไม่ใช่ `requestAnimationFrame` สะสม)

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Mesh, vertex/edge/face, quad/tri, n-gon | ตัวโมเดล / จุด-เส้น-หน้า / หน้า 4 เหลี่ยม-3 เหลี่ยม / หน้ามากกว่า 4 ด้าน (ควรเลี่ยง) |
| Topology, edge loop, retopology | การเรียง polygon / วงเส้นรอบข้อต่อ / ปั้นผิวใหม่ทับโมเดลยุ่ง |
| Subdivision surface | ทำให้โมเดลโค้งเนียนโดยแบ่ง polygon |
| UV, seam, texel density | พิกัดคลี่ผิว / รอยตัด / ความละเอียด texture ต่อพื้นที่ (ควรเท่ากันทั้งโมเดล) |
| PBR, base color, metallic, roughness, normal map, AO | ระบบวัสดุอิงฟิสิกส์และแผนที่ texture หลัก |
| IOR, transmission, clearcoat, anisotropy, SSS | ดัชนีหักเห / ความโปร่ง / ชั้นเคลือบใส / ไฮไลต์ยืดแบบโลหะขัดลาย / แสงทะลุใต้ผิว (ผิวคน, acetate) |
| Armature, bone, joint, control | โครงกระดูก / กระดูก / ข้อต่อ / ตัวจับที่ animator ใช้ |
| FK / IK, pole target, IK/FK switch | หมุนจากโคน / จับปลาย / ทิศเข่า-ศอก / สลับโหมด |
| Skinning, weight painting, corrective shape | ผูกผิวกับกระดูก / ระบายน้ำหนัก / shape แก้ข้อต่อพับ |
| Blendshape / shape key / morph target | รูปทรงผสม 0–1 (ชื่อต่างกันตามโปรแกรม) |
| FACS, viseme, ARKit 52 | ระบบแยกกล้ามเนื้อหน้า / รูปปากตามเสียง / ชุด blendshape มาตรฐานของ iPhone |
| Keyframe, interpolation, graph editor, tangent | ท่าหลัก / วิธีเติมระหว่างคีย์ / หน้าต่างเส้นโค้ง / มือจับความชันเส้น |
| Blocking → spline → polish | ลำดับการ animate |
| Arcs, overlap, follow-through, offset | เส้นทางโค้ง / ส่วนช้ากว่าตัว / ไหลต่อหลังหยุด / เลื่อนคีย์ |
| On ones / twos | เปลี่ยนท่าทุก 1 / 2 เฟรม |
| Mocap, retargeting, foot sliding, cleanup | จับท่าจริง / ย้ายท่าข้ามโครง / เท้าไถล / เก็บงาน |
| Path tracing vs rasterization | ยิงแสงจริง (Cycles) vs วาดเร็วแบบเกม (EEVEE, Lumen, WebGL) |
| GI, HDRI, denoise, samples | แสงสะท้อนรอบสอง / ภาพแสงรอบทิศ / ลบ noise / จำนวนรอบยิงแสง |
| NPR, toon/cel shading, outline, halftone | การเรนเดอร์แบบไม่เหมือนจริง / แสงเป็นขั้น / เส้นขอบ / จุดสกรีน |
| glTF / GLB, Three.js, GLTFLoader | ฟอร์แมต 3D สำหรับเว็บ / ไลบรารี 3D บน browser / ตัวโหลด |
| Turntable | วิดีโอหมุนสินค้า 360° (ช็อตมาตรฐานของ 3D product) |

---

## 3. ตัวอย่างงานจริง (การตั้งค่าที่ใช้กันจริง)
| สถานการณ์ | ค่า/วิธีโดยประมาณ | เหตุผล |
|---|---|---|
| Turntable แว่นไทเทเนียมบนพื้นขาว (Blender Cycles) | กล้อง 85–100mm · f/5.6–8 · HDRI studio + softbox แถบยาว 2 ตัว · 256–512 samples + denoise · หมุน 360° ใน 5 s (120 F @24fps) แบบ linear | สะท้อนแถบไฟสวยบนโลหะ เลนส์มีไฮไลต์ให้เห็น หมุนสม่ำเสมอวนลูปได้ |
| Hero shot แว่น acetate กระดองเต่า | Principled BSDF: roughness 0.1, coat 1, subsurface/transmission เล็กน้อย, backlight หลังกรอบ | แสงทะลุให้เห็นความลึกของลาย (จุดขายของ acetate) |
| ตัวละครพูดในคลิปเล่าเรื่องแบบ 3D การ์ตูน | EEVEE + toon ramp 2 ขั้น + outline, animate on twos, blendshape ปาก 6–8 viseme | render เร็ว ภาพดูวาดมือ เข้ากับซีรีส์ 2D ของเรา |
| MetaHuman พูดในโฆษณา (Unreal) | MetaHuman Animator จากวิดีโอ iPhone → Lumen ตอนพรีวิว → Path Tracer ตอน final | หน้าแสดงละเอียด แสงผิวและผมแม่นในภาพสุดท้าย |
| คนเดินในฉาก (ไม่มีนักแสดง) | AI mocap จากวิดีโอมือถือ → retarget → แก้ foot sliding ด้วย IK เท้า | เร็วกว่าคีย์มือ 10 เท่า แต่ต้อง cleanup |
| แว่นหมุนบนหน้าเว็บ/ในคลิป HyperFrames | GLB < 5 MB, MeshPhysicalMaterial (transmission เลนส์), environment map, กล้อง orbit ตามเวลา | เรนเดอร์ใน browser ได้จริง ไม่ต้องรอ path tracer |

สิ่งที่มืออาชีพทำจริงคือ **ตัดสินใจ "ช็อตไหนต้องจริง ช็อตไหนโกงได้"** — ภาพ hero ใช้ path tracing, ส่วนพรีวิวและฉากเคลื่อนที่เร็วใช้ real-time และงานตัวละครใช้เวลาไปกับการแสดง (animation) มากกว่าการ render

---

## 4. นำไปใช้กับ AI Image / Video
1. **AI image/video เรียนจากภาพ render 3D จำนวนมาก** คำศัพท์ 3D จึงดึง "หน้าตา" แบบนั้นได้: `Octane/Cycles render, PBR materials, studio HDRI lighting, subsurface scattering, ray-traced reflections, toon shading with clean outlines` — แต่ต้องบรรยายผลประกอบเสมอ (เหมือนบทที่ 1) เช่น `ray-traced glass lens with a long softbox highlight and slight refraction of the background`
2. **บรรยายวัสดุเป็นภาษา PBR:** แทน "shiny glasses" ให้เขียน `brushed titanium temples, metallic, soft anisotropic highlight; polished acetate front with deep amber tortoiseshell pattern, glossy clear coat; clear lenses with thin green anti-reflective sheen` AI จะแยกวัสดุได้ดีขึ้นมาก
3. **สไตล์ 3D ที่ใช้ได้:** `stylized 3D animated film look, soft subsurface skin, toon shading, painterly textures (Arcane-like), comic halftone and ink lines (Spider-Verse-like)` — อย่าใส่ชื่อสตูดิโอ/ชื่อเรื่องตรง ๆ ใน prompt ที่จะใช้ขาย ให้บรรยายลักษณะแทน (halftone, ink lines, painted texture, on twos)
4. **Video (Wan 2.2 / Kling) กับการเคลื่อนไหวแบบ 3D:**
   - ภาพต้นที่เป็น "3D render" ช่วยให้วิดีโอคงรูปทรงดีกว่าภาพถ่ายซับซ้อน — `turntable, the glasses rotate slowly 90 degrees on a white seamless background, camera static` ได้ผลพอใช้ แต่เกิน ~90° โมเดลมัก **เดาด้านที่ไม่เห็น** ผิด (ขาแว่นงอกเพิ่ม, บานพับหาย)
   - การเคลื่อนไหวตัวละคร: บอก arc/overlap เป็นภาษาภาพ เช่น `her hair follows a moment later as she turns, the hand moves in a smooth arc` และใช้ `animated on twos, stepped motion` ถ้าอยากได้สไตล์ Spider-Verse (Kling มักยังทำนุ่มเกิน)
   - อย่าคาดหวัง lip-sync แม่นจาก Wan; lip-sync ทำในชั้น HTML/rig ของเรา
5. **สิ่งที่ทำได้จริงในเครื่องเรา:**
   - **FLUX schnell (`tools/flux.py`)** — ทำภาพ "ดูเหมือน 3D render" ได้ดีสำหรับฉาก/ตัวละครมาสคอต/คีย์วิชวล แต่ **ห้ามใช้แทนรูปแว่นสินค้าจริง** (แว่นที่ AI วาดเป็นรุ่นที่ไม่มีขาย); ถ้าต้องมีแว่นจริงในฉาก ใช้ Codex + `-i` ภาพแว่นจริง (frame-kit) หรือวาง cutout ทับ
   - **Wan 2.2 (`tools/wan.py`)** — ทำ 2–5 s camera move/turntable เล็ก ๆ จากภาพนิ่งได้ฟรี; แว่นจริงยังเสี่ยงรูปทรงเพี้ยน ตรวจทุกเฟรม (มี skill `remove-spots` ลบจุดแปลกที่ AI เติม)
   - **2.5D (`tools/depth.py`)** — depth map + parallax ให้ความรู้สึก 3D โดยไม่ต้องมีโมเดล เป็นทางเลือกที่ปลอดภัยที่สุดสำหรับภาพสินค้าจริง
   - **HyperFrames + Three.js** — ใช้ได้กับวัตถุเรขาคณิต (โลโก้ 3D TIMEOPTIC ลอยหมุน, เลนส์ใสหักเหแสงบนพื้นหลัง, particle, กล่อง/การ์ดพลิก) และ GLB ที่มีอยู่แล้ว; ยังไม่มีโมเดล 3D ของแว่นจริงในร้าน การปั้นเองต้องใช้ Blender (ยังไม่ได้ติดตั้ง) และใช้เวลาหลายชั่วโมงต่อรุ่น
   - **Image-to-3D AI** — ลองได้กับ prop/มาสคอต แต่สำหรับแว่นให้ถือว่า "ใช้ไม่ได้โดยไม่ซ่อม" (ดูข้อ 1.2)
   - **ตัวละครการ์ตูนของเรา (rig.js)** เป็น 2D puppet แต่ใช้หลัก 3D เดียวกันอยู่แล้ว: กระดูกแบบ FK (หัว-ตัว-แขน), ปาก = viseme จาก `visemes.py` (เทียบ blendshape), overlap ผม/หาง, กล้อง push/parallax เป็นกล้องหลายชั้น — เรียนบทนี้เพื่อทำ puppet ให้ "มีน้ำหนักแบบ 3D" ไม่ใช่เพื่อเปลี่ยนไปทำ 3D เต็มรูป
6. **ข้อจำกัดของ Three.js ในคลิป:** transmission/ไฮไลต์ใน WebGL ไม่แม่นเท่า Cycles, ไฟล์ GLB ใหญ่ทำให้ render ช้า, ห้ามใช้เวลาจริง (clock) ต้องคำนวณจาก timeline เพื่อให้ render ทุกเฟรมตรงกัน

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ
1. **3D product render แว่น (ภาพ mood ไม่ใช่สินค้าจริง)**
   `Studio product render of a pair of round eyeglasses, polished amber tortoiseshell acetate front with visible depth in the pattern, brushed titanium temples with a soft anisotropic highlight, clear lenses with a faint green anti-reflective sheen and a long vertical softbox reflection, slight refraction bending the background through the lenses, white seamless sweep, 100mm lens at f/8, path-traced global illumination, soft contact shadow, no text, no logo.`
2. **Stylized 3D ตัวละคร (animated-film look)**
   `Stylized 3D animated film still of a kind elderly Thai optician in a cozy night eyeglass shop, soft subsurface skin, slightly exaggerated proportions with big expressive eyes, warm 2700K desk lamp key light and cool blue rim light from the window, painterly hand-textured surfaces, shallow depth of field, cinematic 35mm framing, text-free.`
3. **Comic-book 3D (Spider-Verse-like แบบบรรยายลักษณะ)**
   `A teenage girl leaping between Bangkok rooftops at night, 3D characters rendered like a printed comic: halftone dot shading, hand-drawn ink outlines, slight color misregistration offset, flat graphic shadows, smear frames instead of motion blur, neon pink and cyan palette, dynamic low-angle wide lens, no text.`
4. **Toon shader / cel-shaded mascot**
   `Cel-shaded 3D mascot of a cheerful owl wearing oversized black acetate glasses, two-tone toon shading with a hard shadow edge, clean thick outline, pastel background, front three-quarter view, soft rim light, toy-like but crisp, centered composition, text-free.`
5. **Video prompt (Wan/Kling) — turntable + overlap**
   `Image-to-video: the eyeglasses on the white sweep rotate slowly about 60 degrees to the left on a turntable, constant speed, camera locked off, the long softbox highlight glides smoothly across the metal temples and lens surfaces, refraction in the lenses shifts naturally, no new parts appear, shape stays identical, 5 seconds.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- ข้ามขั้น topology/UV แล้วไปแก้ที่ texture — ลายกระดองเต่ายืดหรือข้อต่อพับเพี้ยนแก้ด้วย texture ไม่ได้
- ตั้ง metallic เป็น 0.5 เพราะ "อยากให้เงานิดหน่อย" — วัสดุจริงเป็น 0 หรือ 1; ความเงาคุมด้วย roughness
- ใส่สีเงา/ไฮไลต์ลงใน base color (baked lighting) ทำให้แสงในฉากไม่ตรงกับเงาบนวัตถุ
- โลหะ/เลนส์ render ออกมาดำหรือแบน เพราะไม่มีอะไรให้สะท้อน (ไม่มี HDRI/softbox)
- เลนส์ใส่ opacity ต่ำแทน transmission → ดูเป็นแผ่นเทาไม่ใช่แก้ว; หรือใสจนมองไม่เห็นว่ามีเลนส์
- ใช้ IK กับทุกอย่าง → แขนเหวี่ยงไม่มี arc; ใช้ FK กับเท้า → เท้าไถลบนพื้น
- Ease in/out ทุกคีย์ (ค่า default) → ตัวละครดู "ลอยในน้ำ"; ทุกส่วนหยุดพร้อมกัน → ไม่มี overlap ดูเป็นหุ่น
- เชื่อ AI mocap ตรง ๆ ไม่ cleanup → เท้าไถล มือสั่น นิ้วบิด
- Lip-sync ขยับปากทุกตัวอักษร (flap) และไม่ปิดปากที่ M/B/P
- เปลี่ยน render engine กลางโปรเจกต์ (EEVEE → Cycles) แล้ววัสดุเปลี่ยนหน้าตา
- ใส่ "Spider-Verse style" แต่ animate on ones พร้อม motion blur — เป็นแค่ filter ไม่ใช่สไตล์
- (AI) ใช้ภาพแว่นที่ FLUX/Codex วาดขึ้นเองเป็นภาพขายสินค้า — แว่นรุ่นนั้นไม่มีอยู่จริง
- (AI) สั่ง Wan หมุนแว่น 360° → ด้านหลังถูกเดา ขาแว่นงอก/หาย
- (AI) ใช้ image-to-3D กับแว่นแล้วหวังว่าเลนส์จะใสและบานพับพับได้
- (Three.js) ใช้ `Date.now()`/`requestAnimationFrame` สะสมใน HyperFrames → render ไม่ตรงกับ preview

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - เขียนตาราง PBR (base color, metallic, roughness, transmission, IOR) ของวัสดุ 6 อย่าง: เลนส์ CR-39, เลนส์ high-index 1.67, acetate ดำเงา, acetate ด้าน, ไทเทเนียมขัดลาย, ทองชุบเงา
  - ดูคลิปตัวละครเดิน/หันหน้า 1 คลิป (หนัง 3D ใดก็ได้) แล้วชี้ arc 2 จุด, overlap 2 จุด และบอกว่าช็อตนั้น on ones หรือ twos
  - อธิบายในสามบรรทัดว่าทำไมเท้าใช้ IK แต่แขนเหวี่ยงใช้ FK
- **ระดับ 2 (ประยุกต์):**
  - ใช้ FLUX ทำภาพ "แว่นในจินตนาการ" 3 ใบ ต่างกันแค่ประโยควัสดุ (เลนส์ใส/โลหะ/acetate) แล้วเทียบว่าคำ PBR คำไหนทำให้วัสดุถูก
  - ใช้ Three.js ใน HyperFrames ทำช็อต 5 s: เลนส์ใส (MeshPhysicalMaterial, transmission 1, ior 1.5) ลอยหมุนหน้าโลโก้ TIMEOPTIC กล้อง orbit คำนวณจากเวลา render แล้วตรวจว่า preview กับ render ตรงกันทุกเฟรม
  - ปรับ puppet ใน rig.js 1 ช็อต: เพิ่ม overlap ผม/ชายเสื้อ 2–4 เฟรม และตรวจ arc ของมือ แล้วเขียนบันทึกก่อน-หลัง
- **ระดับ 3 (เชี่ยวชาญ):**
  - วางแผนคลิปโปรโมท 15 s ที่ใช้ "ความรู้สึก 3D" กับแว่นจริงของร้าน 1 รุ่น
    - เขียน shot list ระบุว่าแต่ละช็อตใช้เทคนิคไหน (2.5D depth, Wan turntable ≤ 60°, Three.js เลนส์/โลโก้, Codex scene ที่แนบภาพจริง) และเหตุผล
    - ระบุ material spec ของแว่นรุ่นนั้นเป็นค่า PBR และ lighting spec (HDRI/softbox, ทิศไฮไลต์บนเลนส์)
  - ผลิตจริง ตรวจทุกเฟรมว่ารูปทรงแว่นไม่เพี้ยน ได้ ≥ 8/10 ตามเกณฑ์ข้อ 8 แล้วบันทึกบทเรียนใน `LEARNING-LOG.md`

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| วัสดุ (PBR) | แก้ว/acetate/โลหะแยกออกชัด เลนส์มองเห็นว่ามีและใส | วัสดุหนึ่งดูผิด | ทุกอย่างดูพลาสติกเหมือนกัน หรือเลนส์หาย/ทึบ |
| ความถูกต้องของสินค้า | รูปทรงแว่นตรงของจริงทุกเฟรม | เพี้ยนเล็กน้อยใน 1–2 เฟรม | ขาแว่น/บานพับ/สัดส่วนผิด หรือใช้แว่นที่ AI แต่งขึ้น |
| การเคลื่อนไหว | มี arc, overlap, timing ตั้งใจ (ones/twos สอดคล้องกับสไตล์) | ถูกบางส่วน | ลอย แข็ง หรือหยุดพร้อมกันทั้งตัว |
| แสงและกล้อง | ไฮไลต์อธิบายรูปทรง เลนส์กล้องเหมาะกับสินค้า กล้องเคลื่อนมีเหตุผล | แสงแบนหรือกล้องลอยเล็กน้อย | มืด/แบน/สะท้อนผิด กล้องบิดสินค้า |
| สไตล์และความต่อเนื่อง | สไตล์ (real/toon/comic) คงที่ทั้งคลิป และเข้ากับแบรนด์ | สะดุดหนึ่งช็อต | สไตล์ปนกัน ดูเป็นคนละงาน |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- Blender (วัสดุ, render engine, animation):
  - Blender Manual — [Principled BSDF (4.2)](https://docs.blender.org/manual/en/4.2/render/shader_nodes/shader/principled.html)
  - Blender Manual — [Principled BSDF (4.3)](https://docs.blender.org/manual/en/4.3/render/shader_nodes/shader/principled.html)
  - Blender Manual — [Render Engines](https://docs.blender.org/manual/en/dev/render/render_engines.html)
  - Blender Manual — [EEVEE Introduction (4.2)](https://docs.blender.org/manual/en/4.2/render/eevee/introduction.html)
  - Blender Manual — [Animation & Rigging (4.5)](https://docs.blender.org/manual/en/4.5/animation/index.html)
- Unreal Engine:
  - Epic Developer Docs — [Lumen Global Illumination and Reflections](https://dev.epicgames.com/documentation/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)
  - Epic Developer Docs — [Lumen Technical Details](https://dev.epicgames.com/documentation/en-us/unreal-engine/lumen-technical-details-in-unreal-engine)
  - Epic Developer Docs — [Path Tracer in Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine/path-tracer-in-unreal-engine)
  - Unreal Engine Forums — [MetaHumans: Lumen vs Path Tracing in UE 5.7 (community tutorial)](https://forums.unrealengine.com/t/community-tutorial-metahumans-lumen-vs-path-tracing-in-unreal-engine-5-7/2675853)
- glTF / Three.js:
  - Khronos — [glTF: The 3D Asset Delivery Format](https://www.khronos.org/glTF/)
  - Khronos — [glTF PBR](https://www.khronos.org/gltf/pbr/)
  - Khronos Registry — [glTF 2.0 Specification (PDF)](https://registry.khronos.org:443/glTF/specs/2.0/glTF-2.0.pdf)
  - Khronos (GitHub) — [KHR_materials_specular](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_materials_specular/)
  - Three.js docs — [MeshPhysicalMaterial](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)
  - Three.js docs — [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader)
  - Codrops — [Creating the Effect of Transparent Glass and Plastic in Three.js](https://tympanus.net/codrops/?p=57089)
- Stylized 3D:
  - ACM SIGGRAPH History Archives — [Non-photorealistic compositing of the Spider-Verse (Davignon & St. Clair)](https://history.siggraph.org/learning/non-photorealistic-compositing-of-the-spider-verse-by-davignon-and-st-clair/)
  - Cartoon Brew — [Sony Imageworks' Renegade Approach to Spider-Man: Into the Spider-Verse](https://www.cartoonbrew.com/?p=167321)
  - CG Spectrum — [How Spider-Verse got that mind-blowing look](https://www.cgspectrum.com/blog/spider-man-into-the-spider-verse-how-they-got-that-mind-blowing-look)
  - Foundry — [Creating Spider-Man: Across the Spider-Verse with Nuke, Mari & Katana](https://foundry.com/insights/film-tv/across-the-spider-verse-nuke-mari-katana)
  - Leiden Arts in Society Blog — [The Aesthetics of Contemporary Animation: Melding 2D & 3D Techniques](https://www.leidenartsinsocietyblog.nl/articles/the-aesthetics-of-contemporary-animation-melding-2d-3d-techniques)
- Image-to-3D AI:
  - Microsoft (Azure AI Labs) — [TRELLIS](https://labs.ai.azure.com/?p=880)
  - Scenario Help Center — [Comparing Generative 3D Models](https://help.scenario.com/en/articles/comparing-generative-3d-models/)
  - All3DP — [The Best AI 3D Model Generators](https://all3dp.com/2/ai-generated-3d-model-best-tools/)
- หมายเหตุ:
  - ค่า roughness/IOR ในตารางวัสดุแว่นเป็นค่าเริ่มต้นเชิงประสบการณ์ของงาน product render (IOR เลนส์ตามชนิดวัสดุเป็นค่าที่ผู้ผลิตเลนส์ระบุโดยทั่วไป) ต้องปรับตามภาพอ้างอิงจริง
  - ชื่อ input ของ Principled BSDF เปลี่ยนตามเวอร์ชัน Blender (4.x อิง OpenPBR, รุ่นเก่าอิง Disney) ให้ดู manual ของเวอร์ชันที่ใช้
  - รุ่นและความสามารถของ image-to-3D (TRELLIS, Hunyuan3D, Meshy, Tripo) เปลี่ยนเร็วมาก แหล่งเปรียบเทียบเป็นของบุคคลที่สาม ควรตรวจเว็บผู้พัฒนาก่อนใช้งานจริง
  - ข้อมูลเทคนิคของ Arcane ในบทนี้มาจากแหล่งรอง ยังไม่พบบทสัมภาษณ์ทีม Fortiche โดยตรงในการค้นครั้งนี้
  - ชื่อเครื่องมือ mocap/facial (Move.ai, Rokoko, DeepMotion, MetaHuman Animator, Audio2Face, ARKit 52 blendshapes) และหลัก FK/IK, 12 principles เป็นความรู้ทั่วไปของวงการ ไม่ได้อ้างลิงก์ในการค้นครั้งนี้
