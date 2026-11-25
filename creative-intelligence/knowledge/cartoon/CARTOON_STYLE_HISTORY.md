# Cartoon Style History & Taxonomy: ประวัติและแผนผังสไตล์การ์ตูน/แอนิเมชัน (M44, part 2)

> สรุปสั้น มีแหล่งอ้างอิงกำกับ (key อยู่ใน `sources_ai.json`) ใช้เลือกสไตล์และเขียน prompt แบบบรรยาย **ลักษณะ** ของยุค โดยไม่ใส่ชื่อศิลปิน สตูดิโอ หรือตัวละครที่มีเจ้าของ (เหตุผลอยู่ใน `AI_CARTOON_GENERATION.md` §6)
> ใช้ได้กับงานทุกประเภท ไม่ได้จำกัดแค่งานของร้าน

## 0. Scope & status
**ครอบคลุม:** rubber hose (1920s–30s), Disney golden age, UPA กับ limited animation, Hanna-Barbera TV, สายอนิเมะ/มังงะ (Tezuka), ligne claire / bande dessinée, webtoon, ประวัติการ์ตูนและแอนิเมชันไทย (แหล่งภาษาไทย 3 ชิ้น), การ์ตูน TV และงานอินดี้ยุคใหม่ (แบบสั้น)
**ไม่ครอบคลุม / อ่อน:** ประวัติก่อนยุคภาพยนตร์ (เช่น Töpffer, หนังสือพิมพ์อเมริกัน), gekiga, US underground comix, stop-motion ของยุโรปตะวันออก, ประวัติ 3D/CG ฉบับละเอียด, การ์ตูนในอาเซียนประเทศอื่น · แหล่งเรื่องตะวันตกส่วนใหญ่เป็นวารสารการค้าหรือหน้าจาก archive (tier B/C) ไม่มีหนังสือวิชาการฉบับเต็ม (เช่น Bashara *Cartoon Vision* ซึ่งรู้จักผ่านหน้า archive ของ IU เท่านั้น) · หัวข้อ "thin-line / CalArts style" ยังไม่มีแหล่งที่น่าเชื่อถือ

**วิธีดูรายการสไตล์ใน library (ห้ามแก้ skill):**
```
python -c "import json;d=json.load(open('.claude/skills/ai-visual-artist/ART_STYLE_LIBRARY.json',encoding='utf-8'));[print(s['id'],'|',s['family'],'|',s['name']) for s in d['styles']]"
```
(102 styles; กลุ่ม `comic_animation` มี 9 id)

## 1. Timeline + ลักษณะ + การ map เข้า library
| ยุค / สาย | ช่วงเวลา | ลักษณะทางภาพและการเคลื่อนไหว (ใช้เป็น trait ใน prompt) | กลไก / ทำไมจึงเป็นแบบนั้น | style id ที่มีอยู่ | แหล่ง · confidence |
|---|---|---|---|---|---|
| **Rubber hose** | 1920s ถึงกลาง 1930s | แขนขาเหมือนสายยาง ไม่มีข้อต่อ, ตัวเด้งเป็นจังหวะเพลง, ตาแบบ pie-cut, ถุงมือสีขาว, กางเกงกระดุมสองเม็ด, ตรรกะแบบความฝัน, ของไม่มีชีวิตขยับได้ | ความเด้งยืดหยุ่นคือแกนหลักของสไตล์; ยุคแรกของหนังเสียงทำให้ภาพผูกกับดนตรี jazz; Disney เลิกใช้ตอนกลาง 1930s เพราะหันไปหาการเคลื่อนไหวที่น่าเชื่อ | `western_cartoon_rubberhose`, `vintage_comic_halftone` (สำหรับงานพิมพ์) | Alexander2022-RubberHose · medium (วารสารการค้า) |
| **Disney golden age / full animation** | ปลาย 1930s ถึง 1940s (Snow White 1937) | การเคลื่อนไหวเต็ม 24 ภาพ/วินาที แบบ naturalistic, ตัวละครกลมมีปริมาตร, ฉากหลังลงสีละเอียด, มีความลึกจาก multiplane | ต้องการ "แข่งกับหนังคนแสดง" (ใช้ 3 ปี, 1.4 ล้านดอลลาร์, ศิลปิน 750 คน); multiplane ซ้อนเลเยอร์ทำให้เกิดความลึก (ทดลองครั้งแรกใน The Old Mill 1937) | ไม่มีตัวตรง → ใกล้ที่สุดคือ `storybook_gouache` + `stylized_3d_animation` (ฉบับ CG) | History2024-SnowWhite · medium (คำว่า "เรื่องยาวเรื่องแรก" ยังเป็นข้อถกเถียง ดู §3) |
| **UPA / mid-century modern** | 1943 ถึงกลาง 1950s (Gerald McBoing-Boing ได้ Oscar ปี 1950) | รูปทรงเรียบง่าย, สีแบน สดชัด ไม่มีแรเงา, เน้นความแบนของภาพ 2D, layout แบบกราฟิก, ใช้ภาพน้อย (12/8/6 ภาพต่อวินาที) | งบน้อยบวกกับความตั้งใจทางศิลปะแบบ modernism ทำให้ "จำกัด" กลายเป็นสุนทรียะ; กลางทศวรรษ 1950 "UPA style had become cartoon style" | `flat_vector` (ใกล้เคียง), `screenprint_poster` (ด้านสี) → **เสนอเพิ่ม** `midcentury_limited_animation` | IU-UPA · medium-high (archive มหาวิทยาลัยที่สรุปจากหนังสือวิชาการ) |
| **Hanna-Barbera TV limited** | 1957–1960s (The Flintstones ฉายช่วง prime time ครั้งแรก 30 ก.ย. 1960) | ฉากหลังอยู่นิ่ง, ท่าทางค้าง (held pose), ขยับแค่ปาก/ตา, หน้ามีราวหกแบบ, ฉากหลังวนซ้ำ, outline หนาและเรียบ | ต้นทุนรายการทีวี: จำนวนภาพต่อครึ่งชั่วโมงลดลงเกือบ 97% ในบางกรณี | `modern_cartoon_tv` (ทายาทยุคหลัง) → **เสนอเพิ่ม** `classic_tv_limited_cartoon` | Cormack2021-Flintstones · medium (ตัวเลขต่างกันไปตามแหล่ง) |
| **Anime / story-manga lineage** | 1963 เป็นต้นมา (Astro Boy, Fuji TV 1 ม.ค. 1963) | limited animation (เฟรมน้อยลง, ใช้ภาพซ้ำ, บางฉากขยับแค่ปาก), เน้นเนื้อเรื่องต่อเนื่องหลายตอนจากมังงะ; ต่อมามีแรเงา cel 2 โทน และฉากหลังวาดมือ | ผลิตรายสัปดาห์ด้วย 24 fps ทำไม่ได้ → ให้เรื่องแข็งชดเชยการเคลื่อนไหวที่น้อย; เกิดโมเดลธุรกิจ manga → anime → สินค้า | `anime_cel`, `anime_painterly_bg`, `manga_bw_screentone`, `chibi_kawaii` | Nakano2026-Tezuka · medium |
| **Bande dessinée / ligne claire** | ราก 1930s (Tintin), คำนี้เกิดปี 1977 (Swarte, *De Klare Lijn*), ฟื้นอีกครั้งปลาย 1970s | (จากบทสรุปทุติยภูมิ) เส้นน้ำหนักเท่ากัน, สีแบน, แทบไม่มี hatching/เงา, ตัวละครการ์ตูนบนฉากหลังที่ละเอียดสมจริง; หัวใจคือ "clarity of drawing, composition and narrative" | ความอ่านง่ายและความเป็นระเบียบมาก่อน; Hergé เองไม่ชอบให้มองว่าเป็นแค่สไตล์ | `ink_line_clean` (ใกล้เคียง) → **เสนอเพิ่ม** `ligne_claire` | Gravett2008-ClearLine · medium (trait ด้านเส้นและสีมาจาก summary ไม่ได้มาจาก Gravett โดยตรง) |
| **Webtoon / webcomic** | Daum เปิดพอร์ทัลปี 2003, Naver ปี 2004, ยุค smartphone ตั้งแต่ 2009 | เลย์เอาต์แนวตั้ง scroll ยาว, เป็นภาพสี, ผลิตเร็ว อ่านเร็ว ("snack culture"), จังหวะเล่าผ่านช่องว่างระหว่างช่อง | ออกแบบมาเพื่ออ่านด้วยนิ้วโป้งบนมือถือ | `webtoon_digital` | Jin2019-Webtoon · high (วารสารวิชาการ) |
| **การ์ตูน TV และงานอินดี้ยุคใหม่** | 2000s เป็นต้นมา | สีแบน, outline เรียบ, รูปทรงกราฟิก, ทำ puppet/vector ได้; มีกระแส "เส้นบาง หัวกลม แขนขาเหมือนเส้นบะหมี่" ในทศวรรษ 2010s (ยังไม่มีแหล่งน่าเชื่อถือ) | การผลิตแบบดิจิทัลทำให้ rig ซ้ำได้ (คำอธิบายของ library เอง ไม่ใช่ข้อมูลจากแหล่งในชุดนี้) | `modern_cartoon_tv`, `flat_vector`, `cel_shaded_3d`, `stylized_3d_animation`, `claymation`, `stop_motion_felt` | — · low (ช่องว่าง) |

## 2. ประวัติการ์ตูนและแอนิเมชันไทย (แหล่งภาษาไทย)
**สิ่งพิมพ์ (การ์ตูนเล่ม/การ์ตูนล้อ)** [Arochasiri2022-ThaiCartoonEvolution]
- ขรัวอินโข่งได้รับการยกย่องว่าเป็น "นักเขียนการ์ตูนไทยคนแรก" (รับวิธีวาดแบบตะวันตกเข้ามา); สมัยรัชกาลที่ 6 ภาพล้อเป็นที่นิยม และมีนักเขียนการ์ตูนล้อการเมืองคนแรกคือ ขุนปฏิภาคพิมพ์ลิขิต (เปล่ง ไตรปิ่น)
- หลังปี 2475: สวัสดิ์ จุฑะรพ วาดสังข์ทองเป็นการ์ตูนเรื่องยาวเรื่องแรก (ลง *สยามราษฎร์*) และสร้างตัวตลก "ขุนหมื่น" ที่ได้แรงบันดาลใจจาก Popeye และใส่รองเท้าแบบ Mickey แต่แต่งตัวแบบไทย → ตัวอย่างการ **ผสมแบบตะวันตกกับแบบไทย** ตั้งแต่ยุคแรก; ฉันท์ สุวรรณบุณย์ บุกเบิกการ์ตูนเด็ก
- ปี 2495 "ตุ๊กตา" (พิมล กาฬสีห์) หนูนิด หนูไก่ หนูหน่อย หนูแจ๋ว เป็นนิตยสารการ์ตูนเด็กฉบับแรก; ประยูร จรรยาวงษ์ ("ราชาการ์ตูนไทย", นายศุขเล็ก, ได้รางวัลแมกไซไซ) ทำทั้งการ์ตูนตลกและการ์ตูนล้อการเมือง; นิยายภาพจักร ๆ วงศ์ ๆ และเรื่องผี (เช่น ทวี วิษณุกร)
- **ขายหัวเราะ:** มุก 3 ช่องจบ ภาพเรียบง่าย (อาวัฒน์, คุณโฉลง, คนติดเกาะ, โจรมุมตึก); หลังปี 2510 การ์ตูนไทยได้อิทธิพลจากหนังตะวันตกและญี่ปุ่น เช่น อัศวินสายฟ้า (พ.บางพลี); หลัง 14 ตุลา 2516 มี "ผู้ใหญ่มากับทุ่งหมาเมิน" (ชัย ราชวัตร) เป็นการ์ตูนการเมือง
- ยุคดิจิทัล: นักวาดใช้แอปบนแท็บเล็ต อิทธิพลมังงะสูง มีความกังวลว่า "การ์ตูนแบบไทย" ที่มีเอกลักษณ์อาจหายไป; มีนักวาดไทยที่โด่งดังในต่างประเทศด้วยเส้นหยาบเรียบง่ายที่เน้นความคิด (*hesheit*)
- ขายหัวเราะทำ "ฉบับ AI" (2566) ให้ AI เขียนมุกและวาดภาพ ส่วนคนเป็นผู้คัดและแก้ไข [Thairath2023-KhaiHuaRaoAI]

**แอนิเมชัน** [Junma-PayutThaiIdentity; Khemmapat2018-ThaiAnimation]
- ปยุต เงากระจ่าง: "เหตุมหัศจรรย์ในเช้าวันหนึ่ง" (2498) เป็นภาพยนตร์การ์ตูนไทยเรื่องแรกอย่างเป็นทางการ, "หนุมานเผชิญภัย" (2500) ตัวละครดัดแปลงจากจิตรกรรมไทยประเพณี (รามเกียรติ์) ทำให้กลมมนนุ่มนวล, "สุดสาคร" (2522) เป็นแอนิเมชันเรื่องยาวเรื่องแรก วาดบน cel ถ่ายด้วยกล้อง 16 มม. งบ 5 ล้านบาท
- อัตลักษณ์ไทยในงานของปยุต: ลดทอนสัดส่วนหน้าตาและร่างกายจากคนไทยจริง, ใส่เครื่องแต่งกายไทย, ฉากบ้านไทย, ใช้ลายไทยเป็นของประดับ (เช่น ม่าน) ไม่ได้ใช้เต็มภาพ; งานยุคแรกมีการยืดยุบแบบยางยืด
- หลังสุดสาครเกือบไม่มีเรื่องยาวเลยกว่า 20 ปี ทีมไทยรับจ้างลงสีให้งานญี่ปุ่น; จากนั้นนโยบาย SIPA ทำให้มีปังปอนด์ (2545, ดัดแปลงจาก "ไอ้ตัวเล็ก" ในขายหัวเราะ), ก้านกล้วย (2549, 3D, งบ 150 ล้าน, เดิมจะทำเป็น 2D แต่ทีมต่างชาติ "สื่อความเป็นไทยไม่ได้"), ยักษ์ (2555) ฯลฯ รวม 12 เรื่อง (2522–2559) แต่ที่ทำเงินได้มีแค่ก้านกล้วยกับยักษ์
- ปัจจัยที่ทำให้ล้มเหลว (จากงานวิจัย): กลุ่มเป้าหมายแคบเกินไป, ย้ายจากทีวีไปฉายโรงโดยคุณภาพไม่พอ, ดัดแปลงวรรณกรรมไทยโดยไม่มีความคิดใหม่, เทคนิคยังตามหลัง · **confidence: medium-high** (บทความวารสารไทย 3 ฉบับที่อ่านฉบับเต็ม แต่บางตอนอ้างแหล่งเว็บต่ออีกที)

**Map เข้า library:** จิตรกรรมไทย → `thai_traditional_mural`; การ์ตูน 3D แบบก้านกล้วย → `stylized_3d_animation`; การ์ตูนเด็กหรือแก๊กไทย → ยังไม่มีตัวตรง (ดูข้อเสนอ §4)

## 3. Contested / หมายเหตุ
- "Snow White คือแอนิเมชันเรื่องยาวเรื่องแรก" เป็นการนับแบบสหรัฐฯ/cel แหล่งที่อ่านเองก็ใช้คำว่า "traditional, hand-drawn"; ก่อนหน้านั้นมีเรื่องยาวของประเทศอื่นที่ใช้เทคนิคอื่น (ไม่ได้ค้นคว้าในชุดนี้) → เขียนว่า "เรื่องยาวแบบ cel วาดมือที่มีอิทธิพลที่สุดยุคแรก" จะปลอดภัยกว่า
- คนที่ได้รับเครดิตว่าเริ่ม rubber hose คือ Bill Nolan ตามแหล่งการค้าและ wiki; บล็อกของ Society for Animation Studies ใช้ Steamboat Willie (1928) เป็นหมุดเปลี่ยนยุค (ข้อนี้มาจาก search ในรอบนี้ ไม่ได้อยู่ใน sources)
- ตัวเลขจำนวนภาพของ Hanna-Barbera ต่างกันมากในแต่ละแหล่ง (ราว 2,000–3,500 ภาพ เทียบกับ 14,000–25,000 ภาพต่อหนังสั้น 7 นาที) → ใช้แค่ "ลดลงมาก"
- Mushi Production: ปีก่อตั้งที่แหล่งให้ไว้คือ 1961 หรือ 1962 (ไม่ตรงกัน)
- ปีของบทความวิสิฐ จันมา (Junma) ไม่ปรากฏใน PDF ที่อ่าน

## 4. ข้อเสนอสไตล์ที่ library ยังไม่มี (proposals — ไม่ได้แก้ skill)
| proposed id | trait สำหรับ prompt (ไม่ใช้ชื่อเฉพาะ) | ใช้กับงานแบบไหน | แหล่ง |
|---|---|---|---|
| `golden_age_full_animation` | round appealing characters with soft volume, smooth naturalistic motion, lush hand-painted watercolour-gouache backgrounds with layered depth, warm storybook light | นิทาน, งานเทศกาล, แบรนด์ครอบครัว | History2024-SnowWhite |
| `midcentury_limited_animation` | simplified geometric figures, flat bold colour areas with no shading, off-register colour shapes, sparse stylised backgrounds, graphic negative space | explainer, infographic เล่าเรื่อง, โปสเตอร์ย้อนยุค | IU-UPA |
| `classic_tv_limited_cartoon` | thick even outlines, flat colours, characters in held poses with simple collars and neckties, repeating flat painted backgrounds, only mouths and eyes move | คลิปตลกต้นทุนต่ำ, ใช้กับ rig.js ได้ (ท่าค้าง + เปลี่ยนปาก) | Cormack2021-Flintstones |
| `ligne_claire` | uniform-weight clean black contours, flat even colour fills, no hatching and almost no cast shadows, simple cartoon figures in detailed realistic settings, high clarity | carousel ที่ต้องอ่านง่าย, แผนที่/การเดินทาง, งานแนวยุโรป | Gravett2008-ClearLine |
| `thai_gag_strip` | simple round-nosed Thai everyday characters, clean brush-pen outline, three-panel gag rhythm (setup, beat, punch), flat newsprint colour, minimal backgrounds | มุกตลก 3 ช่องบน IG/FB, โฆษณาแบบขำ | Arochasiri2022-ThaiCartoonEvolution |
| `thai_caricature_editorial` | exaggerated head-to-body caricature, confident ink line, single-panel social comment, Thai street details | การ์ตูนแสดงความเห็น/ข่าว (ห้ามล้อคนจริงโดยไม่ได้รับอนุญาต) | Arochasiri2022-ThaiCartoonEvolution |
| `thai_folk_tale_comic` | Thai fable / jakkrawong costume and crowns simplified into rounded cartoon forms, lai thai ornament used only as accents, warm flat colours, one comic sidekick | นิทานไทย, งานวัฒนธรรม, เทศกาล | Arochasiri2022-ThaiCartoonEvolution; Junma-PayutThaiIdentity |
| `thai_mural_softened_animation` | figures adapted from Thai mural painting with softened rounded shapes, slender graceful poses, flat mural colour, kranok ornament at the edges | ต่อยอดจาก `thai_traditional_mural` ให้เหมาะกับการ animate | Junma-PayutThaiIdentity |
| `rough_idea_line` | quick uneven pen line, deliberately unpolished, lots of white space, handwritten feel (text added later in HTML), idea over finish | งาน reflective/ปรัชญา คล้ายโทนของ Slowly Growing | Arochasiri2022-ThaiCartoonEvolution |
| *(ยังไม่เสนอ)* thin-line 2010s TV | — | — | ยังไม่มีแหล่งน่าเชื่อถือ; ใช้ `modern_cartoon_tv` ไปก่อน |

ทุกข้อเสนอต้องผ่าน T1/T2 (`AI_CARTOON_GENERATION.md` §9) ก่อนจะเพิ่มเข้า library: รัน 3 seed แล้วนับว่าเห็น trait ที่ระบุได้กี่ข้อ

## 5. Applied patterns
- **เลือกสไตล์ตามงบการเคลื่อนไหว:** งานที่ใช้ rig หรือ puppet → ใช้สาย limited animation (UPA, TV limited, anime) ซึ่งเป็นสุนทรียะที่ได้รับการยอมรับมาแล้ว ไม่ใช่ข้อด้อย [IU-UPA; Nakano2026-Tezuka]; เมื่อการเคลื่อนไหวน้อย ต้องให้ **เนื้อเรื่องแข็ง** มาชดเชย (บทเรียนจาก Astro Boy)
- **ความเป็นไทยที่ไม่ใช่ลายไทยเต็มจอ:** ใช้สัดส่วน เครื่องแต่งกาย และฉากชีวิตประจำวันแบบไทย ลายไทยใช้แค่เป็นของประดับ [Junma-PayutThaiIdentity]; การแค่ดัดแปลงวรรณกรรมไทยยังไม่พอ ต้องมีมุมใหม่ด้วย [Khemmapat2018-ThaiAnimation]
- **ผสมได้แต่ต้องอ่านง่าย:** ตั้งแต่ขุนหมื่น การ์ตูนไทยก็ผสมแบบตะวันตกกับแบบไทยมาตลอด [Arochasiri2022-ThaiCartoonEvolution]; ใช้แนวคิด ligne claire (ตัวละครเรียบบนฉากที่ละเอียด) กับ carousel ที่ต้องอ่านเร็ว
- **9:16 / carousel:** ใช้ไวยากรณ์ของ webtoon คือแนวตั้ง แต่ละจังหวะเว้นช่องว่าง อ่านจบไว [Jin2019-Webtoon]

## 6. Anti-patterns
- ใช้ชื่อตัวละครหรือสตูดิโอเพื่อเรียกสไตล์ (เช่น ใส่ชื่อหนูหรือแมวที่มีเจ้าของ) → ให้บรรยาย trait ของยุคแทน
- ใช้ลายไทยเต็มทุกพื้นที่เพื่อให้ดู "ไทย" (เป็นสิ่งที่งานวิจัยชี้ว่าไม่จำเป็น)
- คิดว่า limited animation คือของถูกที่ดูไม่ดี → ประวัติศาสตร์แสดงว่ามันเป็นสไตล์ที่ตั้งใจได้
- อ้างตัวเลขประวัติศาสตร์ที่แหล่งยังขัดกันโดยไม่มีหมายเหตุ

## 7. Open questions / ต่อไป
- หาแหล่งวิชาการฉบับเต็มเรื่อง rubber hose และ Disney (เช่น Crafton, Klein *Seven Minutes*, Thomas & Johnston) และเรื่อง thin-line TV ยุค 2010s
- ประวัติ webcomic ไทย (LINE Webtoon ไทย, เพจการ์ตูนบน FB/IG) และตลาด sticker LINE ซึ่งเกี่ยวกับ IG carousel โดยตรง
- กฎหมายลิขสิทธิ์ไทยเรื่องตัวละครการ์ตูนและงาน AI
- ทดสอบว่า trait ของแต่ละยุคใช้กับ FLUX schnell ได้จริงไหม (T1/T2) แล้วจึงเสนอเพิ่ม id เข้า library
