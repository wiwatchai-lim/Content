# MATERIAL_RENDERING — วัสดุ: ฟิสิกส์ PBR → การรับรู้ → prompt (M10, M34)

> Batch VA1 · tag `light` · 2026-11-25 · ต่อจาก `DRAWING_TECHNIQUES.md §7` (ตาราง acetate/metal/lens 3 แถว) และ
> `R2_color_light.md §F` · ไลบรารีวัสดุพร้อมช่วงพารามิเตอร์: `light_libraries.json › material_examples` · ที่มา: `sources_light.json`
> ป้าย: **EVIDENCE** · **CRAFT** · **DERIVED**

## 0. Scope & status
ครอบคลุม (audit VA10 ขาด: transparent plastic, index of refraction, absorption; บาง: leather, ceramic, opacity, BSSRDF):
พารามิเตอร์ PBR (base colour, metallic, roughness, specular/F0, IOR, transmission, opacity, absorption/attenuation,
scattering/subsurface, anisotropy, sheen, clearcoat, thin-film), BRDF/BSDF/BSSRDF, และวัสดุ 20+ ชนิด เน้นวัสดุแว่น
**ไม่ครอบคลุม/อ่อน:** ค่าดัชนีหักเหของ acetate และ TR90 สำหรับแว่นโดยตรงหาไม่พบ (มีเพียงช่วงของ cellulose ester และ
datasheet TR90 ที่ต้องล็อกอิน); ค่า roughness ของแต่ละวัสดุในไลบรารีเป็น **ช่วงประมาณการ (DERIVED/CRAFT)** ไม่ได้วัด;
fur/leather/ceramic ไม่มีแหล่งวัดค่าเฉพาะในรอบนี้

## 1. กฎสินค้า (สูงสุด — ใช้ก่อนทุกอย่าง)
**ห้ามเปลี่ยนโครงสร้าง วัสดุ สี หรือรูปทรงของสินค้าจริง** — กรอบ titanium ต้องเป็นโลหะ (metallic = 1) ไม่ใช่พลาสติกเทา;
acetate ลายกระดองเต่าต้องคงลายและความโปร่งแสงเดิม; สี AR ตกค้างต้องตรงสเปกเลนส์ที่ขาย; ความหนาเลนส์ห้ามบางลงเพื่อความสวย.
แสงและฉากเปลี่ยนได้ วัสดุเปลี่ยนไม่ได้. (กฎร้าน; ตรงกับ CLAUDE.md ที่ใช้ภาพแว่นจริง/cutout)

## 2. ค่าดัชนีหักเห (IOR) ที่ตรวจแล้ว

| วัสดุ | n (ประมาณ) | Abbe | แหล่ง | สถานะ |
|---|---|---|---|---|
| Ophthalmic crown glass | ~1.523 | ~58–59 | OphthalmicLensMaterials_summary (search summary) | consistent across sources; ไม่ได้อ่าน datasheet |
| Optical crown N-BK7 (อ้างอิงแก้วทั่วไป) | 1.5168 (nd) | 64.17 | SCHOTT_NBK7 (refractiveindex.info จาก SCHOTT catalog) | full_text ✔ — **ไม่ใช่แก้วเลนส์แว่นโดยตรง** |
| CR-39 (ADC) | 1.498 | 58 | CR39_PPG_summary (Wikipedia + slides; PPG ยืนยันเป็นเจ้าของ CR-39) | search summary |
| Trivex | 1.53 (บางแหล่ง 1.54) | 43–45 | OphthalmicLensMaterials_summary | search summary, มีความต่างระหว่างแหล่ง |
| Polycarbonate | 1.585–1.586 | ~30 (30–32) | Sultanova2009 (Sellmeier ที่ 587.6 nm → 1.585) + summary (1.586) | data page ✔ |
| MR-8 | 1.60 | νe 41 | Mitsui_MR (หน้า lineup) | publisher_page ✔ |
| MR-7 / MR-10 | 1.67 | νe 31 | Mitsui_MR | ✔ |
| MR-174 | 1.74 | νe 32 | Mitsui_MR | ✔ |
| Cellulose ester (acetate) | ~1.46–1.50 (cellulose acylate 1.48) | — | CelluloseAcetate_patents (search summary) | ขึ้นกับระดับ acetyl substitution; ไม่ใช่ค่า acetate แว่นโดยตรง |
| น้ำ | 1.333 | — | PBRT4 ตาราง 9.1, PhysicallyBased_DB | ✔ |
| น้ำแข็ง | 1.31 | — | PBRT4 | ✔ |
| ตา (eyes) | 1.38 | — | glTF_KHR_ior ตารางตัวอย่าง | ✔ |
| กระจกหน้าต่าง | 1.52 | — | glTF_KHR_ior | ✔ |
| Sapphire | 1.76–1.77 | — | glTF / PBRT4 | ✔ |
| เพชร | 2.417–2.42 | — | PBRT4, PhysicallyBased_DB | ✔ |
| ผิวคน (ชั้นน้ำมัน, สมมติ) | 1.4 → F0 0.028 | — | dEon2007 | ✔ (เป็นสมมติฐานโมเดล) |
| นม / หินอ่อน / กระดาษ / คอนกรีต / porcelain | 1.348 / 1.5 / 1.5 / 1.5 / 1.5 | — | PhysicallyBased_DB | ✔ (ค่า 1.5 คือค่า default ทั่วไป) |
| Clearcoat (polyurethane) | 1.5 คงที่ | — | Burley2012 | ✔ |

ค่าที่โจทย์ให้ตรวจ: crown ~1.52 ✔, polycarbonate ~1.586 ✔, CR-39 ~1.498 ✔ (search summary), high-index 1.67/1.74 ✔ (Mitsui).
Mitsui เองเตือนว่าค่าเป็น "representative measurement ไม่ใช่สเปกรับประกัน"

## 3. พารามิเตอร์ PBR — นิยาม + ใช้อย่างไร

| พารามิเตอร์ | นิยาม (EVIDENCE) | ช่วง/ค่าจริง | ใช้ใน prompt / HTML (DERIVED) |
|---|---|---|---|
| **Base colour** | สีของ diffuse (อโลหะ) หรือสี specular (โลหะ) | sRGB ของวัสดุ; โลหะใช้ค่า F0 (ทอง 1.00,0.71,0.29 linear) | บอกสีจริงของกรอบ ห้ามให้โมเดล "เดา" |
| **Metallic** | 0 = dielectric, 1 = conductor; "โมเดลโลหะไม่มี diffuse และ specular ถูกย้อมเป็นสี base" (Burley2012) | 0 หรือ 1 เกือบเสมอ; ค่ากลางใช้เฉพาะรอยต่อ/ฝุ่น | กรอบโลหะชุบ = metallic 1; กรอบโลหะ **พ่นสี** = metallic 0 + clearcoat (ต้องรู้ว่าสินค้าจริงเป็นแบบไหน) |
| **Roughness** | ความหยาบระดับไมโคร คุมทั้ง diffuse และ specular; Burley map α = roughness² เพื่อให้รับรู้เป็นเส้นตรง | 0 (กระจก) – 1 (ด้านสนิท) | "mirror-polished" ≈ 0.05–0.15, "satin" ≈ 0.3–0.5, "matte" ≈ 0.6–0.9 (CRAFT ประมาณการ) |
| **Specular / F0** | reflectance ที่มุมตั้งฉาก; Burley: specular 0–1 → F0 0–0.08 ↔ IOR 1.0–1.8, ค่ากลาง 0.5 = IOR 1.5 = 4% | อโลหะเกือบทั้งหมด 2–5% (Hoffman2013) | UE4 ตัด specular ทิ้ง ใช้ F0 = 0.04 คงที่เพราะ "IOR แปรผันไม่สำคัญนักสำหรับอโลหะ" (Karis2013) — **ยกเว้นเลนส์แว่น** ที่ความต่าง 4%→7% คือจุดขาย |
| **IOR** | อัตราส่วนความเร็วแสง; ควบคุม refraction และ F0 = ((n−1)/(n+1))² | ตาราง §2 | glTF default 1.5 |
| **Transmission** | สัดส่วนแสงที่ผ่านผิวเข้าไป (BTDF) | 0–1 | เลนส์ใส = 1; acetate สีทึบ = 0; acetate ใส/ฝ้า = 1 + roughness |
| **Opacity / alpha** | **ไม่ใช่** transmission: opacity คือการ "เจาะรู" (ผิวหายไปบางส่วน ไม่มีการหักเห) | 0–1 | ใช้กับลูกไม้/ตาข่าย/ขอบผม; ห้ามใช้ทำแก้ว (แก้วที่ทำด้วย opacity ไม่มี refraction และไม่มี Fresnel ที่ขอบ → ดูเป็นฟิล์มใส) — DERIVED จาก glTF/OpenPBR แยกสองแนวคิดนี้ |
| **Absorption / attenuation** | ใน volume: แสงลดตาม Beer–Lambert; glTF: σt = −ln(c)/d, T(x) = c^(x/d) — "สีที่แสงขาวกลายเป็นเมื่อเดินทางครบ attenuationDistance" | attenuationColor + distance | เลนส์สี/acetate สี: **ส่วนหนากว่า = สีเข้มกว่า** (ขอบเลนส์ลบเข้มกว่ากลาง) — DERIVED |
| **Thickness / thin-walled** | glTF: thickness 0 = thin-walled; ไม่ใช่ 0 = volume ที่หักเหจริง | — | ฟองสบู่/ฟิล์ม = thin-walled; เลนส์ = volume |
| **Scattering / subsurface** | แสงกระเจิงภายใน → BSSRDF (ออกคนละจุดกับที่เข้า); OpenPBR subsurface radius_scale ค่าเริ่ม (1.0, 0.5, 0.25) = แดงไปไกลสุด | radius เป็น cm | ผิว, หยก, acetate ขุ่น, ขี้ผึ้ง, นม |
| **Anisotropy** | highlight ยืดเป็นทิศเดียว (Burley: ควบคุม aspect ratio ของ highlight) | 0–1 | โลหะขัดลาย (brushed), ผม, ผ้าซาติน — ทิศการยืดของ highlight สัมพันธ์กับทิศรอยขัด (ทิศที่แน่นอนยังไม่ได้ยืนยันจากแหล่งรอบนี้ — Ward1992 ระบุแค่โมเดล) |
| **Sheen** | lobe ที่มุมเฉียดสำหรับผ้า (Burley); Estevez-Kulla 2017 microfacet sheen ("Charlie") ใช้ใน glTF | 0–1 | กำมะมี่, ผ้าซับในกล่องแว่น |
| **Clearcoat / coat** | ชั้น specular ที่สอง IOR 1.5 (Burley) | 0–1 | สีรถ, ไม้เคลือบ, กรอบโลหะพ่นสีเคลือบเงา, acetate ขัดเงา (DERIVED) |
| **Thin-film** | การแทรกสอดในชั้นบาง (μm); ความหนา+IOR คุม "ความเข้ม ระยะห่าง และเฉด" ของขอบสีรุ้ง (OpenPBR) | thickness μm | **AR coating / mirror coating คือ thin-film** → สีตกค้างเปลี่ยนตามมุมมอง (DERIVED) |
| **Dispersion** | Abbe number; สูง = แยกสีน้อย (OpenPBR default 20) | 9–91 | PC (~30) มีขอบรุ้งมากกว่า CR-39 (58) |

**BRDF / BSDF / BSSRDF (EVIDENCE, Hoffman2013):** BRDF = การสะท้อนที่จุดเดียว (เข้า-ออกที่เดียว); BSDF = BRDF + การส่งผ่าน
(BTDF); BSSRDF = แสงออกคนละจุด (subsurface). GGX = Trowbridge-Reitz microfacet distribution (Walter2007 รวม rough
refraction เช่น "ground glass")

## 4. วัสดุ — ตารางการรับรู้และกฎ

รูปแบบ: ลักษณะทางฟิสิกส์ · สิ่งที่ตาใช้ตัดสิน (cue) · ใช้ถูก/ผิด · ป้าย

### 4.1 วัสดุแว่น (สำคัญที่สุด)
| วัสดุ | ฟิสิกส์ | Cue ที่ต้องมี | ผิดบ่อย |
|---|---|---|---|
| **Titanium / stainless (ขัดเงา)** | conductor, F0 ราว 0.5–0.6 สีเทาเย็น (เหล็ก 0.56–0.58 ตาม Hoffman; ค่า titanium ไม่มีในตารางที่ตรวจ) · ไม่มี diffuse | ภาพสะท้อนของสภาพแวดล้อม: แถบสว่าง (strip) สลับมืด (การ์ดดำ) ตามความโค้ง | ทำเป็นเทาด้านเรียบๆ → ดูเป็นพลาสติก; ไฮไลต์จุดเดียวกลมๆ |
| **Gold-plated / rose gold** | conductor F0 สีทอง (1.00,0.71,0.29) | ไฮไลต์มีสีทอง **ไม่ขาว**; เงาสะท้อนก็ติดทอง | ทาสีเหลือง + ไฮไลต์ขาว = "พลาสติกสีทอง" |
| **Brushed metal** | anisotropic roughness | ไฮไลต์ยืดเป็นแถบ | ใส่ลายขัดแต่ไฮไลต์กลม |
| **Acetate ทึบ ขัดเงา** | dielectric F0 ~4% (n ~1.46–1.50), roughness ต่ำ, diffuse มีสี | base colour เด่น + ไฮไลต์ขาวคม 1 เส้นต่อรอบความโค้ง + ขอบสว่างขึ้นที่มุมเฉียด (Fresnel) | "shiny" มากเกิน = ดูเป็นกระจกเงา |
| **Acetate ใส (crystal)** | transmission 1, roughness ต่ำ, absorption เล็กน้อย | ขอบหนาเห็นมืด (bright-field) หรือสว่าง (dark-field) จาก refraction/TIR; ของด้านหลังเห็นบิดเล็กน้อย | ทำด้วย opacity → ไม่มีขอบ ดูเป็นเจลลี่แบน |
| **Acetate ลายกระดองเต่า (translucent)** | volume ที่มี absorption ลาย + scattering | ย้อนแสงเห็นลายลึกสีอำพัน; ด้านหน้าลายดูเข้ม | ลายเป็นลายพิมพ์บนผิว (ไม่มีความลึก) |
| **TR90 / nylon ด้าน** | dielectric, roughness สูง (ด้าน/กึ่งด้าน) | ไฮไลต์กว้างจาง สีเรียบ น้ำหนักเบา | ใส่ไฮไลต์คมแบบ acetate (ผิดวัสดุ) |
| **เลนส์ใส ไม่เคลือบ** | dielectric volume, F0 4–7% ตาม n | สะท้อนแหล่งแสงเป็นแผ่นขาวจาง; เห็นทะลุ; ขอบเลนส์ (ความหนา) | สะท้อนเป็นกระจกเงา; ไม่มีเงาสะท้อนเลย (ดูไม่มีเลนส์) |
| **เลนส์ AR coated** | thin-film multilayer: total reflectance ลดเหลือ <1–2%; สีตกค้างมักเขียว (ใกล้ peak ความไวตา 555 nm) แต่ออกแบบให้ฟ้า/ม่วงได้ (ARCoating_patents) | แถบสะท้อนจางมาก **มีสี** (เขียว/ฟ้า/ม่วงตามรุ่น) เปลี่ยนเฉดตามมุม | สีตกค้างผิดรุ่น; สะท้อนขาวจ้าแบบไม่เคลือบ |
| **เลนส์ปรอท (mirror)** | thin-film สะท้อนสูง มีสี | ภาพสะท้อนของฉากชัดเจน → ต้องออกแบบสิ่งที่สะท้อน | สะท้อนกล้อง/ช่างภาพ/สตูดิโอ |
| **เลนส์สี/gradient (sun)** | absorption ใน volume หรือชั้นสี | เข้มบน จางล่าง (gradient) ; เงาตกกระทบมีสี | gradient กลับด้าน, เลนส์สีทึบจนไม่เห็นตา (ถ้าสินค้าจริงไม่ทึบ) |
| **Silicone nose pad** | dielectric ใส/ขุ่น นุ่ม roughness กลาง | ขุ่นเล็กน้อย ไฮไลต์นุ่ม | ลืมทำ (แป้นจมูกหาย) |

### 4.2 วัสดุทั่วไป (ฉาก/คน/ธรรมชาติ)
| วัสดุ | ฟิสิกส์หลัก | กฎภาพ | ป้าย |
|---|---|---|---|
| Glass (ภาชนะ) | dielectric, n 1.5–1.52 | ขอบเข้ม/สว่างตาม bright/dark field; อย่าผสมสองแบบ (HunterBiverFuqua) | EVIDENCE+CRAFT |
| Transparent vs translucent plastic | transparent: แทบไม่ดูดกลืน/ไม่กระเจิง แสงวิ่งตรง; translucent: กระเจิงภายในมาก (Hoffman2013: "white appearance = high scattering + low absorption") | transparent เห็นภาพข้างหลังคม; translucent เห็นแค่แสง/รูปทรงเบลอ | EVIDENCE |
| Glossy vs matte (paint) | ต่างกันที่ roughness ไม่ใช่ F0 | glossy: ไฮไลต์คม + สีอิ่มในเงา; matte: ไฮไลต์กว้าง สีจางลงเล็กน้อย (DERIVED) | EVIDENCE+DERIVED |
| Wood (ดิบ / เคลือบ) | diffuse ลายเสี้ยน, Burley พบ "specular modulation" ในไม้บางชนิดจากเสี้ยน | ไม้เคลือบ = clearcoat บนลาย; ไม้ดิบ = ด้าน | EVIDENCE (Burley MERL obs.) |
| Stone / marble | marble มี SSS (Jensen2001) n 1.5 | ขอบหินอ่อนนุ่ม แสงซึม; หินแกรนิตด้านไม่ซึม | EVIDENCE |
| Water | n 1.333, F0 2%; ดูดกลืนแดดแดงตามระยะ (Braun-Smirnov 1993: เห็นสีฟ้าเมื่อผ่าน "หลายเมตร"; ท่อ 3 m ส่ง 660 nm ได้ ~44%) | น้ำตื้นใส น้ำลึกฟ้า-เขียว; สะท้อนมากเมื่อมองเฉียด | EVIDENCE |
| Fabric | sheen ที่มุมเฉียด; Burley: ผ้ามีการตอบสนองที่มุมเฉียด "แปลก" | ขอบผ้าสว่างนุ่ม (velvet ขอบสว่าง กลางมืด) | EVIDENCE |
| Leather | dielectric กึ่งด้าน + ลายรูขุมขน | ไฮไลต์กว้างนุ่ม มี micro-texture; หนังขัดเงา = clearcoat | CRAFT (ไม่มีค่าวัดในรอบนี้) |
| Skin | SSS หลายชั้น, specular ขาว F0 0.028 (dEon2007) | ขอบ terminator อุ่น; ไฮไลต์ไม่เหลือง; ระวังเรืองแดงรอบเงา | EVIDENCE |
| Hair | เส้นใยใส: R (สะท้อนผิว), TT (ทะลุ), TRT (สะท้อนภายใน = highlight ที่สอง มีสี) ; secondary highlight ไม่ปรากฏในผมดำ (Marschner2003) | ไฮไลต์สองแถบ (ขาว + สีผม) บนผมสว่าง; ผมดำมีแถบเดียว | EVIDENCE (search summary) |
| Fur | ใช้หลักเดียวกับ hair แต่ไม่ได้ค้นเฉพาะรอบนี้ | rim/back light ทำให้ขนเรือง | DERIVED/unresearched |
| Ceramic (เคลือบ) | ฐาน diffuse + ชั้นเคลือบแก้ว (clearcoat), porcelain n 1.5 | ไฮไลต์คมบนผิวเคลือบ + สีฐานด้าน | DERIVED |
| Paper | diffuse สูง, office paper n 1.5 สีอมฟ้าเล็กน้อย (PhysicallyBased_DB: 0.794,0.834,0.884) | กระดาษบางย้อนแสงโปร่ง (translucent) | EVIDENCE |
| Rubber | dielectric roughness สูง | ไฮไลต์กว้างจางมาก สีดำไม่ดำสนิท | CRAFT |
| Crystal / diamond | n 2.42, F0 17%, TIR ที่ ~24° → แสงวนภายใน + dispersion สูง → "fire" | ประกายหลายจุด + สีรุ้ง | EVIDENCE+DERIVED |
| Painted surface (รถ/โลหะพ่นสี) | base diffuse + clearcoat IOR 1.5 | ไฮไลต์สองชั้น (คมบนเคลือบ + นุ่มบนสี) | EVIDENCE (Burley) |

## 5. ข้อสังเกตการรับรู้วัสดุ
- **EVIDENCE (Fleming2014):** การรับรู้วัสดุขึ้นกับ cue ทางภาพ (ไฮไลต์ คม/ตำแหน่ง/ความสอดคล้องกับ shading) และเปลี่ยนตามแสงและรูปทรง
  → **วัสดุเดียวกันอาจอ่านผิดถ้าแสงผิด** — โลหะใต้แสง overcast ไร้ขอบเขตดูเป็นพลาสติกเทา
- **DERIVED:** สำหรับโลหะ "แสงคือสิ่งแวดล้อม" — ต้องให้มีสิ่งมืด/สว่างให้มันสะท้อน (ไฟ strip + การ์ดดำ) ไม่ใช่เพิ่มความสว่าง
- **EVIDENCE (Burley2012):** สีบอกว่าเป็น diffuse หรือ specular — "diffuse ถูกย้อมสี specular ไม่ถูกย้อม (ยกเว้นโลหะ)" → กฎตรวจภาพ AI:
  ไฮไลต์บน acetate สีแดงต้องขาว; ถ้าแดง = โมเดลทำเป็นโลหะแดง (ผิดวัสดุ)

## 6. Anti-patterns
1. ใช้ opacity แทน transmission สำหรับเลนส์/acetate ใส
2. ไฮไลต์มีสีบนอโลหะ / ไฮไลต์ขาวบนทอง
3. metallic 0.5 ทั้งชิ้น ("โลหะครึ่งๆ") — ไม่มีในธรรมชาติยกเว้นพื้นผิวผสม
4. F0 เกิน 0.08 สำหรับพลาสติก/เลนส์ ("ultra reflective lens") — ผิดฟิสิกส์
5. เปลี่ยนวัสดุสินค้าจริงเพื่อให้ภาพสวย (ผิดกฎร้าน)
6. ขอบรุ้ง/dispersion บนเลนส์ CR-39 หรือสีตกค้าง AR ผิดรุ่น

## 7. Open questions
- ขอ datasheet acetate (Mazzucchelli) และ TR90 (EMS) เพื่อได้ n จริง
- วัด/ประมาณ roughness ของกรอบในสต็อกจากภาพจริง (ไฮไลต์กว้าง/แคบ) แล้วผูกกับ frame profile ใน `kits/`
- ตรวจทิศ anisotropic highlight กับแหล่งที่อ่านได้จริง (Ward 1992 ฉบับเต็ม หรือ PBRT ch.9.6)
