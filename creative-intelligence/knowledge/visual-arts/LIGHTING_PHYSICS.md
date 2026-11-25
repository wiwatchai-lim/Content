# LIGHTING_PHYSICS — ฟิสิกส์ของแสง → กฎของจิตรกร → การจัดแสงของเรา (M10, M34)

> Batch VA1 · tag `light` · 2026-11-25 · ต่อยอดจาก `R2_color_light.md` (§E–F), `curriculum/04-lighting.md`,
> `DRAWING_TECHNIQUES.md §7` และ `LIGHTING_LIBRARY.json` (51 setups) — **ไม่ทวนซ้ำ** สิ่งที่อยู่ในนั้นแล้ว
> (three-point, portrait patterns, ratio 2:1/4:1/8:1, gels, glare บนแว่นแบบพื้นฐาน)
> ที่มา: `sources_light.json` · ไลบรารี: `light_libraries.json` · วัสดุ: `MATERIAL_RENDERING.md` · บรรยากาศ: `ATMOSPHERIC_EFFECTS.md`

ป้ายกำกับทุกกฎ: **EVIDENCE** = ฟิสิกส์/มาตรฐาน/งานวิจัย · **CRAFT** = ธรรมเนียมช่าง (tier D) · **DERIVED** = เราอนุมานเอง (บอกว่าจากอะไร)

---

## 0. Scope & status

ครอบคลุม (audit VA07 เคยขาด/บาง): direct vs indirect light, fill light, back light, form shadow, hard light, cast shadow,
core shadow, reflected light, atmospheric scattering (สรุปสั้น รายละเอียดอยู่ใน ATMOSPHERIC_EFFECTS) + ทุกหัวข้อในโจทย์:
inverse-square และข้อยกเว้นของแหล่งแสงใหญ่, source size → penumbra/umbra, shadow family, light-on-form sequence,
specular vs diffuse, Fresnel, refraction/TIR, caustics, subsurface scattering, global illumination, volumetric light,
และ setup ศิลปะใหม่ (ไฟสำหรับแว่น/คน/สถาปัตย์/ธรรมชาติ/หนัง) ที่ยังไม่มีในไลบรารีเดิม

**ไม่ได้ครอบคลุม / อ่อน:** ไม่ได้อ่านเนื้อหาจริงของ Hecht *Optics* และ *Real-Time Rendering* (ยืนยันแค่ bibliographic);
ไม่ได้ทดสอบ setup ใดกับ FLUX/Codex เลย (`test_status: untested` ทั้งหมด); Light Science & Magic อ่านได้แค่ preview;
ไม่มีแหล่ง peer-reviewed เรื่อง "light-on-form sequence" (เป็นธรรมเนียมช่างล้วน)

---

## 1. Direct vs indirect light (แสงตรง / แสงอ้อม)

| field | |
|---|---|
| Definition | **Direct** = แสงที่เดินทางจากแหล่งแสงถึงผิวโดยไม่กระทบอะไรก่อน · **Indirect** = แสงที่สะท้อน/กระเจิงจากผิวหรือตัวกลางอื่นมาก่อน (bounce, sky, ผนัง, หมอก) |
| Foundation | **EVIDENCE** — rendering equation: radiance ออก = emitted + ∫ BRDF × radiance เข้า × cosθ ทุกทิศ; ส่วนที่ "เข้า" มาจากผิวอื่น = indirect (Kajiya1986 ในทะเบียนเดิม; Goral1984 แสดง colour bleeding จาก diffuse interreflection) |
| Practical | ในฉากกลางวันจริง ฟ้า (sky dome) คือแหล่ง indirect ใหญ่ที่สุด เงาเลยไม่ดำ และมีสีฟ้า; ในห้อง ผนังขาวคือ fill อัตโนมัติ |
| Visual example | แว่นวางบนโต๊ะไม้สีส้มใต้หน้าต่าง: ด้านล่างของขาแว่นโลหะติดสีส้มอุ่น (bounce จากไม้) ส่วนด้านบนสะท้อนฟ้าสีขาวอมฟ้า |
| Correct use | บอก AI ทั้ง "แหล่ง direct" และ "สิ่งที่ bounce" เช่น *warm bounce from the wooden table on the underside of the temples* |
| Incorrect use | สั่งแค่ key light แล้วคาดว่าเงาจะมีรายละเอียด → เงาดำตัน ดูเหมือน cutout |
| Exceptions | อวกาศ/ฉากดำสนิท (indirect ≈ 0) และฉาก stylized cel ที่ตั้งใจตัด indirect ออก |
| Emotional | indirect มาก = นุ่ม ปลอดภัย (high-key) · indirect น้อย = โดดเดี่ยว ดราม่า (low-key, tenebrism) |
| Technical | ใน 3D = GI/bounce; ในภาพถ่าย = fill/bounce card; ใน 2D = "reflected light" สีของพื้น |
| Mistakes | ลืมว่า indirect **มีสี** (สีของผิวที่ bounce) → เงาเป็นสีเทากลาง |
| Sources · tier · conf. | Goral1984 (A, abstract), Hoffman2013 (A, full), RTR4 (A, biblio) · **high** |

## 2. Inverse-square falloff — และทำไมมันไม่ใช่เรื่องทั้งหมด

**EVIDENCE:** แหล่งแสงจุด (point source) — irradiance ∝ 1/d²: ระยะ ×2 → แสงเหลือ ¼ (−2 stop) (HyperPhysics_InverseSquare
ในทะเบียนเดิม). Unreal Engine 4 ใช้ inverse-square จริงแต่ "window" ให้ค่าเป็นศูนย์ที่รัศมีจำกัด:
`falloff = saturate(1 − (d/r)^4)^2 / (d² + 1)` — "+1" กันค่าระเบิดเมื่อใกล้แหล่งแสงมาก (Karis2013, full text)

**ข้อยกเว้นของแหล่งแสงใหญ่ (large/area source):**
- **EVIDENCE (มาตรฐานวัดแสง):** inverse-square ใช้ได้เฉพาะเลย *limiting photometric distance*; ธรรมเนียมทดสอบคือ
  ระยะ ≥ 5 เท่าของมิติใหญ่สุดของแหล่งแสง (five-times rule; ที่ 10× รัศมี ความคลาดเคลื่อน ~1%) — แหล่งแคบ/ไม่ Lambertian
  ต้องไกลกว่านั้น (FiveTimesRule_sources ซึ่งรวมเปเปอร์ CIE 2025 ของ Dotreppe et al. — search summary)
- **DERIVED (จาก radiometry ของจานแสงสม่ำเสมอ, on-axis):** E ∝ R²/(R²+d²) แทน R²/d². ที่ระยะ = เส้นผ่านศูนย์กลางของ
  softbox (d = 2R) แสงจริง = 80% ของที่ inverse-square ทำนาย; ที่ d = R เหลือ 50%. แปลว่า **softbox ใหญ่ที่อยู่ใกล้มาก
  falloff ช้ากว่า 1/d²** — เลื่อนแว่นถอยจาก softbox 60 cm ไป 10 cm แสงไม่ได้ลดตามสูตรจุด
- **DERIVED:** ดวงอาทิตย์ไกลมาก (d ≫ ขนาด) → ความสว่างแทบคงที่ตลอดความลึกฉาก ไม่มี falloff ให้ใช้เล่าเรื่อง ต้องใช้เงา/ฟ้า/บรรยากาศแทน

| field | |
|---|---|
| Correct use | อยากให้ฉากหลังมืดลงเร็ว (cinematic, ร้านแว่นตีสอง) → ไฟใกล้ตัวแบบ; อยากให้สินค้าทั้งแถวสว่างเท่ากัน (แคตตาล็อก) → ไฟใหญ่และไกลกว่า 5× ขนาดแถว |
| Incorrect use | ใช้สูตร 1/d² คำนวณ exposure ของแว่นที่วางห่าง softbox 120 cm แค่ 30 cm |
| Emotional | falloff ชัน = ความลับ/ความใกล้ชิด · falloff ราบ = ความโปร่งใส/ข้อมูล |
| Mistakes (AI) | prompt "dramatic falloff" ในฉากกลางแจ้งกลางวัน → ขัดฟิสิกส์ (แดดไม่มี falloff) ผลจะดูเหมือนจัดไฟสตูดิโอกลางทะเล |
| conf. | สูตรจุด **high**; ตัวเลข five-times **medium** (search summary); สูตรจาน **medium** (DERIVED) |

## 3. Source size → hard/soft, umbra/penumbra

**EVIDENCE (geometric optics):** ความกว้าง penumbra ขึ้นกับ **ขนาดเชิงมุม (angular size)** ของแหล่งแสงที่ตัวแบบ "เห็น"
และระยะจากวัตถุบังถึงพื้นรับเงา (Penumbra_SourceSize ในทะเบียนเดิม). **Umbra** = จุดที่ไม่เห็นแหล่งแสงเลย,
**penumbra** = เห็นบางส่วน. Karis2013 เสริมว่าเมื่อจำลองแหล่งแสงเป็นทรงกลม/หลอด (sphere/tube light) ต้องขยาย
highlight และรักษา energy conservation เพื่อให้ "วัสดุเดิมดูเหมือนเดิมไม่ว่าแหล่งแสงจะใหญ่แค่ไหน" — **ไฮไลต์บนผิวเงา
คือภาพสะท้อนของแหล่งแสง ใหญ่แหล่ง = ไฮไลต์ใหญ่และจางลง**

**DERIVED กฎใช้งาน:**
1. เงาตกกระทบ (cast shadow) **คมที่จุดสัมผัส แล้วนุ่มขึ้นตามระยะ** จากวัตถุ — ขาแว่นที่แตะโต๊ะ เงาคมตรงจุดแตะ, ขอบเลนส์ที่ลอยสูง 3 cm เงานุ่มกว่า
2. ไฟเดียวกันเลื่อนเข้าใกล้ = นุ่มขึ้น (มุมใหญ่ขึ้น) แต่ **สว่างขึ้นด้วย** — เปลี่ยนกำลังไฟไม่เปลี่ยนความแข็ง (ตรงกับ curriculum-04)
3. ในภาพ AI: ระบุ "hard noon sun, crisp shadow edges" หรือ "large overhead silk, shadow edges fading over ~5 cm" — การบอก *ระยะ penumbra* ทำให้โมเดลคุมได้ดีกว่าคำว่า soft เฉยๆ (สมมติฐาน ยังไม่ทดสอบ)

**Hard light (ช่องว่างใน audit):** แหล่งแสงเชิงมุมเล็ก — ดวงอาทิตย์ (~0.5° ตามความรู้ทั่วไป ไม่ได้ตรวจซ้ำรอบนี้), หลอดเปลือย,
fresnel ไกล. ใช้เมื่อต้องการ texture, เวลา (เที่ยงวันหัวหิน), ความจริงจัง. **ผิดเมื่อ** ใช้กับหน้าผู้สูงวัยในโฆษณาเลนส์
progressive (เน้นริ้วรอย) หรือกับเลนส์ใส (เกิดจุดสะท้อนแสบ). **CRAFT** conf. high.

## 4. Shadow family (ครอบครัวของเงา)

| ชนิด | นิยาม | ฟิสิกส์ (EVIDENCE) | กฎจิตรกร (CRAFT) | ความผิดพลาดของ AI/เรา |
|---|---|---|---|---|
| **Form shadow** (เงาตัว) | ส่วนของผิวที่หันหนีแหล่งแสง (n·l ≤ 0) | Lambert cosθ = 0 ที่ terminator | เงาตัวมีขอบนุ่มกว่าเงาตกกระทบ "โดยทั่วไป แต่ไม่เสมอ" | ทำเงาตัวขอบแข็งเท่าเงาตก → ดูเป็นแผ่นกระดาษ |
| **Terminator** | เส้นแบ่งแสง/เงาบนตัววัตถุ | จุดที่แสงสัมผัสผิว (tangent) | ความนุ่มของ terminator บอกขนาดแหล่งแสง | terminator คมทั้งที่สั่ง soft light |
| **Core shadow** | แถบมืดที่สุดในเงาตัว ถัดจาก terminator | ได้แสงตรง = 0 และยังได้ reflected light น้อย (ผิวยังหันไปทางเดียวกับแสง ไม่หันหา bounce) — **DERIVED** จาก cosθ ของ bounce | Gurney: "core มักอยู่เลย terminator เล็กน้อย แต่ไม่ได้ปรากฏเสมอ"; บางคนแย้งว่า core มีอยู่เพราะ reflected light เท่านั้น | วาด core เป็นเส้นดำทึบในงานชาร์โคล → ดูเป็น outline ซ้ำ |
| **Reflected light** | แสงที่ bounce จากสิ่งรอบข้างเข้าเงาตัว | indirect / GI, มีสีของผิวที่ bounce | **ต้องมืดกว่าโทนกลางของด้านสว่างเสมอ** (Proko, Gurney comment: squint ตรวจ) | reflected light สว่างจนแย่งด้านสว่าง → รูปทรงแบน "ลูกบอลพลาสติก" |
| **Cast shadow** (เงาตกกระทบ) | เงาที่วัตถุบังแสงลงบนผิวอื่น | umbra/penumbra ตามข้อ 3 | ขอบคมใกล้วัตถุ นุ่มออกไป; สีเงาติดสีฟ้า (กลางแจ้ง) | cast shadow ทิศไม่ตรงกับ highlight; ไม่มีเงาเลย (ของลอย) |
| **Contact / occlusion shadow** | ความมืดเข้มสุดตรงร่องแคบและจุดสัมผัส | ambient occlusion — แสงอ้อมถูกบังจากเกือบทุกทิศ (Zhukov1998, Landis2002 เดิม) | Gurney comment: "จุดมืดสุดมักเป็นร่องที่ลูกบอลแตะพื้น ไม่ใช่ terminator" | cutout แว่นไม่มีเงาใต้แป้นจมูก/ปลายขา → ลอย (กฎ lens/cutout ของคลิปเรา) |
| **Ambient occlusion** | ค่าคูณที่ลด indirect ตามการถูกบัง | Zhukov "obscurances" | ใช้เป็นเลเยอร์ multiply ใน HTML ได้ | ใส่ AO หนักในฉากแดดจ้า (AO เป็นเรื่องของแสงอ้อม ไม่ใช่แสงตรง) — **DERIVED** |

**การรับรู้ (EVIDENCE):** cast shadow ช่วยสมองตัดสินตำแหน่งเชิงพื้นที่ของวัตถุมากที่สุด โดยเฉพาะเมื่อเงาเคลื่อน และระบบการเห็น
น่าจะ "สมมติว่าแหล่งแสงอยู่นิ่ง" (Mamassian1998, abstract). **DERIVED สำหรับคลิป:** ในคลิป 2.5D/puppet ที่แว่นลอยขึ้นจากโต๊ะ
ให้เงาตกกระทบเลื่อนห่างและนุ่มลงตามความสูง = ผู้ชมอ่านว่า "ลอยขึ้น" ทันที; ห้ามขยับไฟพร้อมกัน (ขัดสมมติฐานแสงนิ่ง)

## 5. Light-on-form sequence (ลำดับแสงบนรูปทรง) — CRAFT

ลำดับจากด้านสว่างไปเงา (Proko_Elements, Gurney2010_LightForm — tier D, full text):
**highlight → center light → light halftones → dark halftones → terminator → core shadow → reflected light** · บนพื้น:
**cast shadow** (และ **occlusion** ที่จุดสัมผัส)

- *Center light* = จุดที่แสงตกตั้งฉากที่สุด; *highlight* = ภาพสะท้อนแหล่งแสงบนผิวมัน **ไม่จำเป็นต้องอยู่ที่ center light** (Gurney)
- Gurney + ผู้อ่าน: "ปั้นแสง หรือ ปั้นเงา อย่างใดอย่างหนึ่ง แล้วทำอีกฝั่งให้แบน" — ป้องกัน over-modeling (กฎเหมาะกับชาร์โคล Mint & Tao)

### ช่างวาด ↔ ฟิสิกส์ (mapping)
| กฎจิตรกร | ฟิสิกส์ที่อยู่ข้างใต้ | ป้าย |
|---|---|---|
| ด้านสว่างไล่จาก center light ลงถึง terminator | Lambert: ความสว่าง diffuse ∝ cosθ ระหว่าง normal กับทิศแสง | EVIDENCE |
| Highlight ย้ายตามมุมมอง แต่ center light ไม่ย้าย | specular ขึ้นกับทั้งทิศแสงและทิศกล้อง (half vector); diffuse ขึ้นกับทิศแสงอย่างเดียว | EVIDENCE (Hoffman2013, Burley2012) |
| Highlight ของผิวด้านมีน้อย/กว้าง ของผิวมันเล็ก/คม | roughness → microfacet normal กระจาย (GGX, Walter2007) | EVIDENCE |
| Highlight บนผิวอโลหะเป็นสีขาว (สีแหล่งแสง) | specular ของ dielectric ไม่ถูกย้อมสี; diffuse ถูกย้อมเพราะผ่านการดูดกลืนใต้ผิว | EVIDENCE (Burley2012 full: "specular reflectance comes from the surface and is not tinted (unless the surface is metallic)") |
| Highlight ของโลหะมีสีของโลหะ (ทอง) | conductor: F0 สูงและมีสี, ไม่มี diffuse | EVIDENCE (Hoffman2013 ตาราง F0) |
| Reflected light มืดกว่าด้านสว่างเสมอ | bounce สูญพลังงาน (albedo < 1) + ระยะ | DERIVED จาก energy conservation |
| ขอบวัตถุ "rim" สว่างขึ้นเมื่อมองเฉียด | Fresnel: reflectance → 1 ที่ grazing angle | EVIDENCE |
| ของไกลจางและอมฟ้า | Rayleigh in-scattering + extinction (aerial perspective) | EVIDENCE — ดู ATMOSPHERIC_EFFECTS |
| เงาในแดดอมฟ้า | form/cast shadow ได้แสงจากฟ้า (Rayleigh) เท่านั้น | EVIDENCE + DERIVED |
| "Core shadow" | ไม่มีชื่อในฟิสิกส์ — เป็นผลรวมของ direct = 0 กับ indirect ที่ยังน้อย | DERIVED; ช่างเองยังเถียงกัน (Gurney comments) |

## 6. Specular vs diffuse

**EVIDENCE (Hoffman2013, full text):** แสงที่ตกบนผิวแยกเป็น (1) **surface reflection** = specular และ (2) แสงที่หักเหเข้าไป
แล้วกระเจิง/ดูดกลืน ออกมาใหม่ = diffuse. "diffuse ธรรมดา **คือ** subsurface scattering ที่ระยะกระเจิงเล็กกว่าพิกเซล" —
ต่างกันแค่สเกลการมอง. ผลต่อเรา: ผิวคนที่ไกลกล้องใช้ diffuse ปกติได้ แต่ macro ใกล้มาก (ปลายจมูกที่รองแป้นแว่น) ต้องเห็นการกระเจิง

**ตาราง F0 (reflectance ที่มุมตั้งฉาก, linear) — Hoffman2013 จาก RTR3:** น้ำ 0.02 · พลาสติก/แก้ว(ต่ำ) 0.03 ·
พลาสติก(สูง) 0.05 · แก้ว(สูง)/ทับทิม 0.08 · เพชร 0.17 · เหล็ก 0.56–0.58 · ทองแดง 0.95,0.64,0.54 · ทอง 1.00,0.71,0.29 ·
อะลูมิเนียม 0.91–0.92 · เงิน 0.95,0.93,0.88. **"อโลหะเกือบทั้งหมดที่เจอนอกห้องแล็บอยู่ในช่วง 2–5%"** และแทบไม่มีวัสดุ
อยู่ในช่วง 20–40%. **ผลต่อการเขียน prompt:** อย่าสั่ง "highly reflective acetate" — acetate สะท้อนแค่ ~4% ที่มุมตรง
ความเงาของมันมาจาก roughness ต่ำ (ไฮไลต์คม) ไม่ใช่ปริมาณสะท้อน

**Perception (Fleming2014 เดิม):** ความรู้สึก "มัน" มาจาก cue ของไฮไลต์ (คม/ตำแหน่งสอดคล้องกับ shading) ไม่ใช่ค่า BRDF
→ **DERIVED:** ไฮไลต์ที่ไม่ตรงกับทิศแสงหลักทำให้วัสดุดู "ทาสีขาว" แทน "มัน" — จุดตรวจใน critique

## 7. Fresnel

**EVIDENCE:** สัดส่วนแสงที่สะท้อนขึ้นกับมุมตกกระทบ (Fresnel equations; PBRT4 §9.3 full text). Schlick:
F(θ) ≈ F0 + (1−F0)(1−cosθ)^5 (Hoffman2013 eq.5). Hoffman แบ่งโซน: 0–45° แทบคงที่, 45–75° ค่อยๆ เพิ่ม, 75–90° พุ่งไป 1
แต่เมื่อคูณกับส่วนอื่นของ BRDF แล้ว **โซนแดงเห็นเฉพาะขอบสุดๆ** ของวัตถุ

**แว่นตา (DERIVED จาก F0 = ((n−1)/(n+1))², สูตรใน glTF KHR_materials_ior):**

| เลนส์ | n | สะท้อน/ผิว (ตั้งฉาก) | 2 ผิวรวม ไม่เคลือบ | Brewster | critical angle (TIR ภายใน) |
|---|---|---|---|---|---|
| CR-39 | 1.498 | 4.0% | ~7.6% | 56.3° | 41.9° |
| Crown glass | 1.523 | 4.3% | ~8.2% | 56.7° | 41.0° |
| Trivex | 1.53 | 4.4% | ~8.4% | 56.8° | 40.8° |
| Polycarbonate | 1.586 | 5.1% | ~9.8% | 57.8° | 39.1° |
| MR-8 1.60 | 1.60 | 5.3% | ~10.1% | 58.0° | 38.7° |
| High-index 1.67 | 1.67 | 6.3% | ~11.8% | 59.1° | 36.8° |
| High-index 1.74 | 1.74 | 7.3% | ~13.6% | 60.1° | 35.1° |

(ค่า n: ดู MATERIAL_RENDERING §2 และแหล่งอ้างอิง; ตัวเลขสะท้อนคำนวณเอง ไม่รวมการสะท้อนซ้ำหลายรอบ)
→ **เรื่องเล่าขายของได้จริง:** เลนส์ 1.74 ที่ไม่เคลือบสะท้อนเกือบเท่าตัวของ CR-39 จึง "ต้อง" เคลือบ AR — ตรงกับที่แหล่ง
ผู้บริโภคบอกว่า high-index สะท้อนมากกว่า CR-39 สูงสุด ~50% (OphthalmicLensMaterials_summary; ตัวเลขเราคำนวณได้สูงกว่านั้นที่ 1.74)

**Brewster & polarizer (EVIDENCE, Brewster_Wiki):** θ_B = arctan(n₂/n₁) ≈ 56° สำหรับแก้ว; แสงสะท้อนที่มุมนี้เป็น
polarized เกือบทั้งหมด → **CPL บนกล้องลดเงาสะท้อนบนเลนส์ได้ดีที่สุดเมื่อมองเลนส์ที่ ~56–60°** แต่แทบไม่ช่วยเมื่อมองตรง (0°)
(DERIVED). Cross-polarization (ฟิล์ม polarizer บนไฟ + CPL บนกล้องหมุนตั้งฉาก) ตัด specular ได้เกือบหมด (CrossPol_PetaPixel, D)

## 8. Refraction, total internal reflection, dispersion

**EVIDENCE (PBRT4 §9.3):** Snell's law ขึ้นกับอัตราส่วน IOR; ตาราง IOR: อากาศ 1.00029, น้ำแข็ง 1.31, น้ำ 1.333,
fused quartz 1.46, แก้ว 1.5–1.6, sapphire 1.77, เพชร 2.42; TIR เกิดเลย critical angle ≈ 42° สำหรับแก้ว–อากาศ
"สัมผัสได้เองในสระว่ายน้ำ". **Dispersion** วัดด้วย Abbe number (สูง = แยกสีน้อย) — OpenPBR ใช้พารามิเตอร์
`transmission_dispersion_abbe_number` (ค่าเริ่ม 20) (OpenPBR, full text บางส่วน)

**แว่น:** polycarbonate Abbe ~30, CR-39 ~58, Trivex ~43–45, MR-174 νe = 32 (Mitsui) → **DERIVED:** เลนส์ PC/1.74
มีขอบรุ้ง (chromatic fringe) ที่ขอบเลนส์ได้มากกว่า CR-39 — **ห้ามใส่ขอบรุ้งปลอม** ในภาพสินค้าที่ไม่ใช่ PC; และขอบเลนส์ที่หนา
(ค่าสายตาสูง) จะเห็นเป็น "วงแหวนสว่าง" จาก TIR ที่ผิวขอบ (DERIVED จาก critical angle) — ใช้บอกความหนาได้ แต่ห้ามเปลี่ยนความหนาจริงของสินค้า

## 9. Caustics

**EVIDENCE (Caustic_optics, search summary):** caustic = เปลือก (envelope) ของรังสีที่ถูกผิวโค้งหักเห/สะท้อนรวมกัน →
เส้น/รูปสว่างบนพื้น (ลายก้นสระ, ดวงสว่างรูปไตจากแก้วน้ำ). **DERIVED สำหรับแว่น:** เลนส์บวก (สายตายาว) ใต้แดดตรงจะ
รวมแสงเป็นจุดสว่างในเงาตกกระทบ, เลนส์ลบ (สายตาสั้น) ให้เงาตรงกลางมืดกว่าขอบ; เลนส์สีให้เงาสี → ใช้เป็นภาพ "ของจริง"
ในโพสต์ได้ (setup `eyewear_tinted_lens_sun_shadow`). **ห้าม** วาด caustic ที่ไม่มีแหล่งแสงแข็ง (ใต้ overcast ไม่มี caustic ชัด)

## 10. Subsurface scattering (SSS)

**EVIDENCE:** BSSRDF — แสงเข้าจุดหนึ่ง ออกอีกจุด (Jensen2001 เดิม). GPU Gems 3 ch.14 (dEon2007, full text): ผิวคน
= ชั้นน้ำมัน (specular ขาว, F0 0.028 จาก n ≈ 1.4) + epidermis กระเจิงแคบ + dermis กระเจิงกว้าง; **แสงแดงกระเจิงไกลกว่า
เขียว/น้ำเงินมาก** (profile แดงกว้าง ~16 mm ในโมเดลนั้น); ไม่มี SSS ผิวดู "แข็งและแห้ง"; specular ที่ไม่ขาวทำให้ผิวเหลือง

**กฎช่างที่ตรงกับฟิสิกส์ (DERIVED):** ขอบ terminator บนผิวคนอมแดง/ส้มเล็กน้อย, ใบหูย้อนแสงแดง, ใบไม้ย้อนแสงเขียวสด
(setup `leaf_backlight_translucency`), acetate ลายกระดองเต่าย้อนแสงเห็นลายลึก (ใน MATERIAL_RENDERING)
**ข้อควรระวัง:** dEon2007 เตือนว่าทำ SSS ผิดวิธีเกิด "red glow รอบเงา" และหูดูเป็นขี้ผึ้ง — ภาพ AI ที่ผิวเรืองแดงเกินคือ artefact

## 11. Global illumination (GI) & colour bleeding

**EVIDENCE:** Goral1984 (radiosity) จำลอง diffuse interreflection รวม "colour bleeding"; Kajiya1986 = รูปแบบทั่วไป.
**ใช้กับเรา:** ฉากร้านแว่น (ผนังสีครีม พื้นไม้) — ด้านเงาของหน้าลูกค้าควรอุ่นตามพื้น; ในการ์ตูน HTML ใส่ gradient สีพื้น
บนครึ่งล่างของตัวละครเพื่อ "แกล้งทำ GI" (DERIVED). **ผิด:** colour bleeding จากผนังสีเขียวแรงจนผิวลูกค้าดูป่วย — ใช้
negative fill (ผ้าดำ) ตัด

## 12. Volumetric light (แสงเป็นลำ)

**EVIDENCE (PBRT4 Volume Scattering, full text):** ตัวกลางมีการดูดกลืน σa, กระเจิงออก σs, รวม σt = σa+σs; การส่งผ่าน
(transmittance) ลดแบบ exponential (Beer–Lambert); single-scattering albedo ρ = σs/σt; mean free path = 1/σt.
**ลำแสงมองเห็นได้เพราะมีอนุภาคกระเจิงแสงเข้าตา** — ไม่มีฝุ่น/ไอน้ำ ไม่มีลำ (Atoptics_Crepuscular). รายละเอียดหมอก/ฝุ่น/รังสีพระอาทิตย์ → ATMOSPHERIC_EFFECTS

---

## 13. Artistic lighting — นิยามเพิ่ม (audit: fill light, back light ขาด)

| บทบาท | นิยาม | ป้าย | หมายเหตุใหม่ (ไม่ซ้ำ curriculum-04) |
|---|---|---|---|
| **Key** | แหล่งที่กำหนดทิศเงาหลัก | CRAFT | ในฉากกลางแจ้ง key คือดวงอาทิตย์ — "ห้ามมี key ที่สอง" ที่ทำเงาสองทิศ |
| **Fill light** | ยกเงาโดยไม่สร้างเงาใหม่ที่เห็นได้ | CRAFT | fill ที่ดีต้อง **ใหญ่และใกล้แกนกล้อง** เพื่อให้เงาของมันซ่อนอยู่หลังวัตถุ (DERIVED จากเรขาคณิตเงา); ในแว่น fill ใหญ่ = สะท้อนบนเลนส์เป็นแผ่นจางทั้งเลนส์ (ทำให้เลนส์ "มีตัวตน") |
| **Back light** | อยู่หลังวัตถุ ชี้มาทางกล้อง | CRAFT | ต่างจาก rim ตรงที่ back light ให้ "halo" รอบผม/ไอน้ำ/ฝุ่น — ในฉากชายทะเลหัวหิน back light ทำให้ละอองทะเลเรืองขาว (Mie forward scattering, ดู ATMOSPHERIC) |
| **Rim / kicker** | เส้นสว่างตามขอบ | CRAFT | บนโลหะขัดเงา rim ไม่ใช่ "เส้นบาง" แต่เป็น **ภาพสะท้อนของ strip box** — ต้องจัดให้ยาวต่อเนื่องตามขอบ (setup `eyewear_metal_wire_edge_strips`) |
| **Practical** | แหล่งแสงที่อยู่ในเฟรม | CRAFT | ใน 2D/HTML practical ต้องมี glow + falloff ตามระยะ ไม่อย่างนั้นอ่านเป็นสติกเกอร์ |
| **Motivated** | แสงที่มีเหตุผลจากแหล่งในเรื่อง | CRAFT | ฉาก AI: เขียน "motivated by the shop window on the left" แทน "soft key from left" ให้ทั้งทิศและสีสอดคล้อง |
| **Negative fill** | ดูดแสงสะท้อนออก | CRAFT | สำหรับเลนส์/โลหะ negative fill คือ "สิ่งดำที่ให้เลนส์สะท้อน" เพื่อสร้างขอบมืด (dark-field) |

**Ratios — มองแบบฟิสิกส์ (DERIVED):** ratio = (key+fill):fill ที่ผิวตัวแบบ; เพราะ fill ใหญ่และไกลกว่ามักลดตามระยะช้ากว่า key
ตัวแบบที่เดินห่างจาก key จะ ratio ลดลงเอง — ในคลิปเดิน ต้องคุม ratio ตามตำแหน่ง

### Family of angles (ศัพท์สำคัญสำหรับแว่น) — CRAFT รองรับด้วยฟิสิกส์
Light Science & Magic (HunterBiverFuqua, preview/search summary): "family of angles" = ชุดตำแหน่งแหล่งแสงที่ทำให้เกิด
**direct reflection** เข้ากล้อง; แหล่งแสงใหญ่ "เติมเต็ม" family of angles. บทเรื่องแก้ว: **bright-field** (ฉากหลังสว่าง ขอบมืด) กับ
**dark-field** (ฉากหลังมืด ขอบสว่าง) "ใช้ทั้งสองพร้อมกันคือสาเหตุหลักที่ภาพแก้วล้มเหลว"
**DERIVED (มุมตกกระทบ = มุมสะท้อน):** สำหรับเลนส์ที่มองตรงจากกล้อง family of angles ของผิวหน้าเลนส์คือกรวยรอบแกนกล้อง
กว้างเท่ากับ ±(ครึ่งหนึ่งของความโค้งเลนส์ที่เห็น) → ไฟที่อยู่นอกกรวยนี้ (สูง > 30° หรือข้าง > 45° ตามไลบรารีเดิม) ไม่สะท้อนเข้ากล้อง;
ไฟที่ตั้งใจให้อยู่ในกรวยคือไฟที่ "เขียน" แถบสะท้อนบนเลนส์

---

## 14. Setup ใหม่ (สรุป — รายละเอียดเต็มใน `light_libraries.json` › `lighting_setups`)
ตรวจกับ 51 ids เดิมแล้ว (รายการใน JSON). Setup ใหม่ทั้งหมด `test_status: untested`

| id | ใช้กับ | หัวใจ |
|---|---|---|
| eyewear_ar_residual_reveal | สินค้าเลนส์ AR | strip เล็กหนึ่งดวง *ใน* family of angles + ฉากหลังดำ → เห็นสีตกค้าง AR (เขียว/ม่วง) บนเลนส์ จริงตามสเปก |
| eyewear_cross_polarized_flat | ภาพ catalogue/cutout | ฟิล์ม polarizer หน้าไฟ 2 ดวง ±45° + CPL ตั้งฉาก → เลนส์ใสไร้ glare, สีกรอบอิ่ม |
| eyewear_overhead_flatlay_scrim | flat-lay 1:1 | scrim 120 cm สูง 80 cm เอียง 15° + การ์ดดำใต้กล้อง → เลนส์สะท้อนดำ ไม่ใช่กล้อง |
| eyewear_on_face_twin_high_strips | คนใส่แว่น | strip 2 ดวง ±60°, สูง 40° เหนือแนวตา + fill ระดับอก → ตาเห็นชัด เลนส์สะท้อนนอกเฟรม |
| eyewear_mirror_lens_scene | แว่นกันแดดเลนส์ปรอท | ออกแบบ "สิ่งที่เลนส์สะท้อน" (gradient card/ทะเล) แทนการจัดไฟบนเลนส์ |
| eyewear_metal_wire_edge_strips | กรอบโลหะบาง/ไร้ขอบ | strip box แคบ 2 ดวง หลังเฉียง 120–150° → เส้นสะท้อนต่อเนื่องตามโลหะ |
| eyewear_tinted_lens_sun_shadow | แว่นกันแดด/ฤดูร้อน | แดดแข็งมุมต่ำ 25–35° → เงาสีของเลนส์ + caustic บนพื้น |
| acetate_lightpad_transillumination | กรอบ acetate ลาย | light pad ใต้แผ่นฝ้า + key อ่อนด้านบน → ลายกระดองเต่าเรืองจากข้างใน |
| tropical_open_shade_sand_bounce | คนใส่แว่นกลางแจ้งหัวหิน | หลบใต้ร่มชายคา ขอบเงา, ทรายสว่างเป็น fill ล่าง, ฟ้าเป็น key ใหญ่ |
| beach_noon_overhead_silk | ถ่ายกลางวันชายหาด | silk 2×2 m เหนือหัว 30° เอียงรับแดด + reflector เงินต่ำ |
| book_light_soft_key | สัมภาษณ์/หน้าคนใส่แว่น | ไฟยิงใส่ bounce → ผ่าน diffusion อีกชั้น ใหญ่ 1.2–2 m ที่ 45° |
| raking_texture_light | ไม้/หิน/ผ้า/ผิวสินค้า | ไฟจุดเดียวเฉียด 5–15° จากผิว → texture ชัด |
| architecture_dusk_interior_balance | หน้าร้านยามค่ำ | ถ่ายช่วงฟ้าสว่างเท่าในร้าน (blue hour) ไฟร้าน 3000–4000K |
| shop_window_plus_ceiling_led | ร้านแว่นจริง | หน้าต่าง daylight เป็น key + LED เพดาน 4000K เป็น ambient + การ์ดดำคุมเลนส์ |
| leaf_backlight_translucency | ธรรมชาติ/พักสายตา | แดดหลังใบไม้ 150–180° → ใบเรืองเขียวจาก SSS |
| charcoal_three_value_plan | ชาร์โคล Mint & Tao | แผน 3 ค่า (กระดาษ/ฮาล์ฟโทน/เงา) + core เบา + occlusion เข้มสุด |
| product_caustic_projection | โพสต์ฤดูร้อน | แดด/ไฟแข็งผ่านถาดน้ำใส → ลาย caustic ไหวบนฉากหลังแว่น |

## 15. Anti-patterns (สรุป)
1. ไฮไลต์บนเลนส์/โลหะที่ไม่ตรงกับทิศแสงหลัก (Fleming: cue ผิด → ดูเป็นสีทา)
2. เงาตกกระทบหลายทิศในฉากแดด (มีดวงอาทิตย์ดวงเดียว)
3. reflected light สว่างกว่าฮาล์ฟโทน
4. ไม่มี contact/occlusion shadow ใต้แป้นจมูก/ปลายขา (ของลอย)
5. "dramatic falloff" ในฉากแดดกลางแจ้ง; "soft" แต่ terminator คม
6. เลนส์ไร้ reflection เลย (ดูเหมือนไม่มีเลนส์) หรือเลนส์ใสที่สะท้อนเท่ากระจกเงา (F0 จริงแค่ 4–7%)
7. ขอบรุ้งปลอมบนเลนส์, AR สีผิดจากสเปกจริง (กฎสินค้า: ห้ามเปลี่ยนวัสดุ/สี/รูปทรงสินค้าจริง)

## 16. Open questions
- ทดสอบว่า FLUX schnell ตอบคำว่า "penumbra 5 cm", "family of angles", "cross-polarized" ได้จริงหรือไม่ (ยังไม่มีข้อมูล)
- หาแหล่ง peer-reviewed เรื่องการรับรู้ core shadow/terminator (มีเฉพาะ shape-from-shading ทั่วไป)
- อ่าน RTR4 ch.9–10, 14 และ PBRT4 ch.11 (media) ฉบับเต็มเพื่อยืนยันตัวเลข roughness ของวัสดุ
