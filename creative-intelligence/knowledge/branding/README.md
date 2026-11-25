# M27 — Branding & Visual Identity (ระบบอัตลักษณ์แบรนด์)

> ใช้ได้กับทุกแบรนด์/ลูกค้า ไม่ผูกกับร้านเดียว ตัวอย่างจากงานของสตูดิโอ (โพสต์ IG/FB, carousel Mint & Tao, คลิปเล่าเรื่องไทย, คลิปสินค้า) เป็นแค่ applied examples
> **ไม่ทำซ้ำ:** brand positioning / personality (Aaker) / archetypes / CEPs → `knowledge/marketing/README.md` §2.1–2.4 · layout, ตัวอักษรไทย, format → `.claude/skills/ai-visual-artist/GRAPHIC_DESIGN.md` · กฎบ้านเรื่องโลโก้ของสตูดิโอ → `CLAUDE.md`
> ไฟล์: `README.md` (แนวคิด + หลักฐาน) · `BRAND_GUIDE_TEMPLATE.md` (แม่แบบ brand book) · `BRAND_CHECK.md` (เช็คก่อนโพสต์) · `sources.json` (26 แหล่ง)

## 1. Scope & status

**ครอบคลุม:** ระบบอัตลักษณ์ (logo, colour, type, imagery, voice) แบบ design-system · distinctive brand assets (Romaniuk/Ehrenberg-Bass) + ข้อวิจารณ์ · งานวิจัยโลโก้ (Henderson & Cote 1998; Jiang et al. 2016; review ของ Kim & Lim 2019) · การเขียน voice & tone (Mailchimp, Microsoft เป็นตัวอย่าง tier C) · โครงสร้าง brand guideline · co-branding / partner logos · consistency บนโซเชียล · ความเสี่ยงของ rebrand · วิธีวัดแบรนด์แบบที่ธุรกิจเล็กทำเองได้

**ไม่ครอบคลุม / อ่อน:** sonic branding (เสียงประจำแบรนด์ มีแค่คำแนะนำจาก vendor) · กฎหมายเครื่องหมายการค้า/การจดทะเบียนโลโก้ในไทย · งานวิจัย typeface เชิงลึก (ดูได้ใน Kim & Lim 2019 §typeface) · motion/dynamic logo · งานวิจัย SME ไทยโดยตรง (ไม่พบงาน peer-reviewed) · naming

**สถานะหลักฐาน:** 26 แหล่ง อ่านจริง 19 (full_text 14, abstract 5) · Henderson & Cote 1998 **ไม่ได้อ่านต้นฉบับ** — ข้อค้นพบมาจาก review ของ Kim & Lim (2019) ที่อ้างตาราง/ข้อแนะนำของเขาไว้ละเอียด · หนังสือ Romaniuk (2018) และ Wheeler รู้จากสารบัญ/บทสรุปรอง

## 2. Core concepts

### 2.1 Brand identity system = ชุดกฎ ไม่ใช่แค่โลโก้
- **คืออะไร:** ชุดองค์ประกอบที่แบรนด์ใช้ซ้ำทุกจุดสัมผัส: logo (และรุ่นย่อย), colour palette, typography, imagery style (ภาพถ่าย/ภาพวาด/ไอคอน), voice & tone, รวมถึง "ตัวละคร" หรือ "เสียง" ถ้ามี — พร้อม **กฎการใช้** (ขนาด, clear space, สีพื้น, ห้ามทำ) แบบเดียวกับ design system ในงาน UI
- **กลไก:** Keller (1993) — brand knowledge = awareness (recognition + recall) + image (associations) ข้อมูลที่ **สอดคล้อง (congruent)** กับ association เดิมเรียนรู้/จำง่ายกว่า และภาพแบรนด์ที่ไม่เป็นเนื้อเดียวทำให้ดึงความจำได้น้อยลง `[Keller1993]` ระบบที่เขียนเป็นกฎทำให้คนหลายคน (และ AI) ผลิตงานที่ "ดูเป็นแบรนด์เดียวกัน" ได้
- **ใช้:** แยก **fixed** (ห้ามเปลี่ยน: โลโก้, สีหลัก, ฟอนต์หัวเรื่อง, ลายเส้นตัวละคร) กับ **flexible** (เปลี่ยนได้: ฉาก, มุมกล้อง, สีรอง, เรื่อง) — Ipsos เรียกว่า guardrails `[Ipsos2026_DBA]` · ในสตูดิโอ: style profile + prompt ของ Codex/FLUX คือส่วนหนึ่งของ identity system ต้องอยู่ใน brand book ด้วย
- **ข้อจำกัด:** Keller เองระบุว่าข้อมูลที่ "ไม่คาดคิด" บางครั้งสร้าง association ที่แรงกว่า — consistency ไม่ได้แปลว่าห้ามแปลกใหม่ แต่ให้แปลกใหม่ใน flexible layer
- **Tier/confidence:** A (แนวคิด) + C/D (practice) · **high** ว่ามีประโยชน์เชิงปฏิบัติ, **medium** ว่าส่งผลต่อยอดขาย

### 2.2 Consistency → ผลต่อทัศนคติ (หลักฐานจริงมีแค่ไหน)
- **หลักฐาน:** การทดลอง 2×2 บนโซเชียล: visual identity ที่สม่ำเสมอทำให้ทัศนคติต่อบริษัท, reputation และความตั้งใจติดตามดีกว่าแบบไม่สม่ำเสมออย่างมีนัยสำคัญ `[KaurKaur2021]` · แบบสำรวจโรงแรม: communication consistency สัมพันธ์กับ trust/image/perceived quality `[SericMikulic2020]` (อ่านแค่ snippet) · Fiocchi & Seyed Esfahani พบว่าแบรนด์รถส่วนใหญ่ใช้ฟอนต์/สี/สโลแกนไม่สม่ำเสมอ ทำให้สิ่งเหล่านี้ไม่ "เป็นของ" แบรนด์ใดเลย `[Fiocchi2024]`
- **ใช้:** template ประจำแบรนด์สำหรับ feed, ตำแหน่งโลโก้คงที่, palette จำกัด — แล้ววัดผลจริงแทนที่จะเชื่อ
- **ข้อจำกัด:** ส่วนใหญ่เป็นการทดลอง/สำรวจครั้งเดียว ไม่มี meta-analysis เรื่อง consistency → ยอดขาย
- **Tier/confidence:** A (อ่านแค่ abstract) · **medium**

### 2.3 Distinctive brand assets (DBA) — fame × uniqueness
- **คืออะไร:** องค์ประกอบที่ทำให้คนรู้ว่า "นี่คือแบรนด์ X" แม้ไม่มีชื่อ: โลโก้, logotype, ตัวละคร, สี, รูปทรง, สโลแกน, เสียง ต้อง **unique** (นึกถึงแบรนด์เดียว) และ **famous** (คนในหมวดส่วนใหญ่ผูกกับแบรนด์) `[Romaniuk2018]` (สรุปรอง)
- **หลักฐาน:** 1,281 องค์ประกอบ, 13 หมวด FMCG, 19 ประเทศ: **ตัวละคร, โลโก้, logotype** มีศักยภาพเป็นเจ้าของได้มากที่สุด, **สี** ยากที่สุดเพราะคู่แข่งใช้ร่วมกัน `[Ward2020]` · รถยนต์ UK: โลโก้ unique สุด ส่วนฟอนต์/สโลแกน/สี ต่ำ `[Fiocchi2024]` · Ipsos: มีแค่ ~15% ของ asset ที่ถึงระดับ "gold" `[Ipsos2026_DBA]`
- **กลไก:** ทางลัดความจำ (memory cue) ที่ผูกโฆษณา/โพสต์เข้ากับแบรนด์ที่ถูกต้อง — ลด "misattribution" (เห็นโฆษณาแต่จำว่าเป็นของคู่แข่ง) · เชื่อม mere exposure และ selection history ใน M01/M04 (ดู marketing §2.4)
- **ใช้:** ตัวละครประจำ (เช่น คู่ตัวละครดินสอไร้หน้า) เป็น asset ที่ **แรงที่สุดตามหลักฐาน** — ล็อกลายเส้น สัดส่วน ชุด ห้ามเปลี่ยนตามอารมณ์ · สีใช้เป็นตัวเสริม ไม่ใช่ตัวหลัก · ทดสอบด้วย **"cover the logo test"** และถามคน 10–20 คน "ภาพนี้ของแบรนด์อะไร"
- **ข้อจำกัด:** หลักฐานหลักมาจากสำนักเดียว (Ehrenberg-Bass) และหมวด FMCG/รถ; เป็นงานวัด "ศักยภาพเป็นเจ้าของ" ไม่ใช่ผลต่อยอดขาย; ตัวเลขของ Ipsos เป็น correlational (แบรนด์ใหญ่มี asset ดังกว่าอยู่แล้ว)
- **Tier/confidence:** A (abstract/full) + C · **medium-high** ว่า logo/character เป็นเจ้าของง่ายกว่าสี

### 2.4 Logo design research — สิ่งที่รู้จริง
- **Henderson & Cote (1998)** (ผ่าน Kim & Lim 2019): มิติหลัก 3 อย่าง — **elaborateness** (ความซับซ้อน/มีมิติ/เคลื่อนไหว), **naturalness** (เหมือนวัตถุที่คุ้นตา), **harmony** (สมมาตร+สมดุล) · เป้าจำง่าย → very natural, very harmonious, moderately elaborate · เป้า "ภาพลักษณ์ดี" → moderately natural, very harmonious, moderately elaborate · โลโก้ figurative เรียนรู้ง่ายกว่า abstract `[HendersonCote1998][KimLim2019]`
- **Roundness vs angularity (Jiang et al. 2016, อ่าน full text):** 5 การทดลอง — โลโก้วงกลมกระตุ้น "นุ่ม" → รองเท้าดูสบายกว่า; เหลี่ยมกระตุ้น "แข็ง" → ทนกว่า · กลไกคือ mental imagery (หายไปเมื่อมี visual load) · **ไม่มีผลต่อทัศนคติรวม** ยกเว้นเมื่อหัวข้อโฆษณาเน้น attribute เดียวกับรูปทรง; ถ้าหัวข้อเน้นคนละเรื่อง ผลหาย `[Jiang2016]`
- **อื่น ๆ (ผ่าน review):** เหลี่ยม/หนา → ดู masculine, มน/บาง → feminine; กรอบรอบโลโก้ให้ความรู้สึก "ปกป้อง" เมื่อการซื้อมีความเสี่ยง; ความไม่สมมาตรสัมพันธ์กับ excitement `[KimLim2019]`
- **ใช้:** ตอนออกแบบ/ปรับโลโก้ให้ลูกค้า: brief "harmonious + moderately elaborate"; เลือกภาษารูปทรงให้ตรงกับ attribute ที่จะขาย (ดูแล/สบาย = มน, แม่นยำ/ทนทาน = เหลี่ยม) แล้ว **ให้ headline พูดเรื่องเดียวกัน**
- **ข้อจำกัด:** โลโก้ทดลองเรียบง่าย แบรนด์สมมติ กลุ่มตัวอย่างนักศึกษา effect size เล็ก (ηp² ≈ .04–.09); ความหมายของรูปทรงขึ้นกับบริบท (ไม้กางเขนในโบสถ์ vs โรงพยาบาล)
- **Tier/confidence:** A · **medium** (ทิศทางชัด ขนาดผลเล็ก)

### 2.5 Voice & tone — เขียนให้คนอื่นเขียนแทนได้
- **คืออะไร:** voice = บุคลิกคงที่; tone = ปรับตามสถานการณ์และอารมณ์ของผู้อ่าน (Mailchimp, Microsoft ใช้นิยามเดียวกัน) `[Mailchimp_VoiceTone][Microsoft_BrandVoice]`
- **รูปแบบที่แบรนด์ใหญ่ใช้ (tier C):** 3–4 คุณลักษณะ + คู่ **"X แต่ไม่ Y"** (ฉลาดแต่ไม่อวดรู้, ขำแต่ไม่หยาบ) · ตาราง tone ตามสถานการณ์ (ฉลอง / ขอโทษ / ให้ข้อมูลสุขภาพ / โปรโมชัน) · style tips ที่เป็นพฤติกรรม (ประเด็นหลักก่อน, คำสั้น, ตัดคำเกิน) · กฎเรื่องมาสคอต (Mailchimp ไม่ให้มาสคอตพูดเอง)
- **ใช้:** ภาษาไทยต้องกำหนดเพิ่ม: สรรพนาม (เรา/ผม/ดิฉัน/แอดมิน), คำลงท้าย (ค่ะ/ครับ/นะ/จ้า), ระดับภาษา, คำทับศัพท์, emoji — และ voice ของ TTS (เพศ, ความเร็ว, อารมณ์) ถ้าทำคลิปเสียง (เชื่อมกับ skill `ai-voice-director`)
- **ข้อจำกัด:** ไม่มีงานวิจัยที่แสดงว่ารูปแบบ guide แบบไหนดีกว่า เป็น craft ล้วน
- **Tier/confidence:** C · **medium** (practice สอดคล้องกันหลายแบรนด์)

### 2.6 โครงสร้าง brand guidelines
- **ส่วนที่พบบ่อย:** brand core (purpose, positioning, personality) → logo (รุ่น, ขนาดขั้นต่ำ, clear space, สีพื้น) → colour (ชื่อ, HEX, สัดส่วน, คู่สีที่ผ่าน contrast) → typography → imagery → voice & tone → grammar → templates → asset list/ที่เก็บไฟล์ → ผู้อนุมัติ `[Shopify_BrandGuidelines][Wheeler_DBI]`
- **คำแนะนำสำหรับธุรกิจเล็ก (tier D):** เริ่มจาก 3 อย่าง (โลโก้, palette, ฟอนต์) ไม่กี่หน้าก็พอ; เขียน "ใช้อย่างไร" ไม่ใช่แค่ "มีอะไร"; ใส่ do/don't พร้อมภาพตัวอย่าง `[Shopify_BrandGuidelines]`
- **ใช้:** → `BRAND_GUIDE_TEMPLATE.md`
- **Tier/confidence:** C/D · **medium**

### 2.7 Co-branding / partner logos
- **หลักฐาน:** ทัศนคติต่อ "การจับคู่แบรนด์" ไหลกลับไปที่แต่ละแบรนด์ (spillover) ผลขึ้นกับความคุ้นเคย และสองฝ่ายไม่ได้รับผลเท่ากัน — แบรนด์ที่คนรู้จักน้อยกว่าได้รับผลมากกว่า `[SimoninRuth1998]`
- **practice (tier C):** แบรนด์ผู้นำ (lead) ใช้ template/ฟอนต์/สีของตัวเอง; โลโก้คู่ค้าวางที่สอง; ปรับให้ **น้ำหนักภาพเท่ากัน** (ไม่ใช่ความสูงเท่ากัน); มี clear space และเส้นคั่นบาง; horizontal สำหรับโลโก้กว้าง stacked สำหรับโลโก้สูง; 3+ แบรนด์ใช้ logo wall น้ำหนักเท่ากัน; **ขออนุญาตทุกครั้ง** และทำตามกฎของคู่ค้าถ้ามี; ห้ามสร้างโลโก้ผสมด้วย AI `[RedHat_CoBrand][GitLab_Lockups]`
- **ใช้:** ร้านค้าปลีกที่ขายแบรนด์อื่น (เช่น โลโก้แบรนด์กรอบในคลิป) = partner logo — ดาวน์โหลดไฟล์ทางการ อย่า redraw/AI generate, ไม่บิดสี, ตรวจ brand guideline ของเจ้าของแบรนด์เรื่องการใช้โดยตัวแทนจำหน่าย
- **Tier/confidence:** A (abstract) + C · **medium**

### 2.8 Rebrand — ความเสี่ยงที่มีหลักฐาน
- **หลักฐาน:** ยิ่งเปลี่ยนโลโก้มาก ลูกค้าที่ผูกพันสูงยิ่งประเมินแย่ลง และลากทัศนคติต่อแบรนด์ลงด้วย; ลูกค้าผูกพันต่ำกลับเฉยหรือบวก `[Walsh2010][PSU2011_LogoRedesign]` · โลโก้ใหม่เสีย processing fluency → ต้องให้เห็นซ้ำหลายช่องทาง `[KimLim2019]` · กรณี Gap 2010: เปิดตัว 6 ต.ค. ถอยกลับ 12 ต.ค.; ความหมายแบรนด์ถูกสร้างร่วมกันออนไลน์และแตกขั้วเร็ว `[Tarnovskaya2018_Gap]`
- **ใช้:** evolutionary ก่อน revolutionary · บอกลูกค้าประจำก่อน/ชวนมีส่วนร่วม · อธิบายเหตุผล · เปลี่ยนทุกจุดสัมผัสพร้อมกัน · เฝ้าคอมเมนต์สัปดาห์แรก · มีแผนถอย
- **ข้อจำกัด:** Walsh = การทดลองนักศึกษา 2 แบรนด์รองเท้า; Gap = กรณีเดียว (survivorship: rebrand ที่สำเร็จเงียบ ๆ ไม่มีใครเขียน)
- **Tier/confidence:** A · **medium**

### 2.9 วัดแบรนด์แบบธุรกิจเล็ก
- **กรอบ:** awareness = **recognition** (เห็นแล้วจำได้) + **recall** (นึกออกเองจากหมวด/ความต้องการ) — recognition สำคัญกว่าเมื่อการตัดสินใจเกิดหน้าร้าน/หน้าฟีด; image วัดด้วย free association (คำ 3 คำที่นึกถึง) `[Keller1993]`
- **Share of Search:** สัดส่วนการค้นหาชื่อแบรนด์เทียบคู่แข่งใน Google Trends — ในตลาดใหญ่สัมพันธ์และนำหน้า market share; ไม่ใช่ silver bullet `[Binet2020_SoS]` · แบรนด์ท้องถิ่นเล็กอาจมี volume ไม่พอ
- **ชุดตัวชี้วัดที่แนะนำ (craft, ไม่ใช่ข้อเท็จจริงทางวิทยาศาสตร์):** ดู `BRAND_CHECK.md` §C — ค้นหาชื่อแบรนด์ (Trends/Search Console/Business Profile), การค้นหาแบบมีชื่อแบรนด์ vs ไม่มี, % คนที่ทักมาว่า "เห็นจากโพสต์/คลิป", แบบสอบถาม 3 ข้อทุกไตรมาส, cover-the-logo test กับคน 10–20 คน
- **Tier/confidence:** A (Keller) + C (Binet) · **medium**

## 3. Contested / replication notes

| ประเด็น | ฝั่ง A | ฝั่ง B | สรุป/ความมั่นใจ |
|---|---|---|---|
| Distinctiveness vs differentiation | Ehrenberg-Bass: คนส่วนน้อยมองว่าแบรนด์ต่างกันจริง ให้เน้นถูกนึกถึง + ถูกจดจำ `[RomaniukSharpEhrenberg_Diff][EBI_AnsweringCritics]` | Thomaz: growth มาจาก perceived differentiation; การวัด differentiation ด้วย self-report ประเมินต่ำเกินไป; หลักฐานกระจุกในสถาบันเดียว `[Thomaz_Contagious]` | Ritson "bothism": ต้องมีทั้ง DBA (ให้จำได้) และ positioning (ให้เลือก) `[Ritson2022_Bothism]` — **ใช้ทั้งสอง, medium** |
| สีควรต่างจากผู้นำตลาด? | DBA: ต้อง unique, สีที่ใช้ร่วมกันเป็นเจ้าของไม่ได้ `[Ward2020]` | Labrecque & Milne (2013, ผ่าน review): สีที่ต่างจากผู้นำมากสัมพันธ์กับ brand equity ต่ำลงในบางหมวด (อาจดูไม่ใช่ "ตัวเลือกในหมวด") `[KimLim2019]` | ใช้ category cue ให้คนรู้ว่าอยู่หมวดไหน + asset อื่น (ตัวละคร/โลโก้) ให้รู้ว่าเป็นใคร · **low-medium** |
| Consistency vs ความสดใหม่ | consistency เพิ่มทัศนคติ/ความจำ `[KaurKaur2021][Keller1993]` | ข้อมูลที่ไม่คาดคิดบางครั้งสร้าง association แรงกว่า; wear-out ของ mere exposure (M01) | ล็อก asset, เปลี่ยน execution · **medium** |
| ตัวเลขสีแบบ "62–90% ตัดสินจากสี", "สีเพิ่มการจำ 80%" | ถูกอ้างแม้ใน review วิชาการ `[KimLim2019]` | ต้นทางไม่ใช่งาน peer-reviewed ที่ตรวจสอบได้ | **ห้ามใช้เป็นข้อเท็จจริง** |
| ตัวเลข Ipsos (+31% consideration) | vendor data ขนาดใหญ่ | correlational, วิธีปิด, ทิศทางเหตุผลกลับได้ | ใช้เป็นแรงบันดาลใจ ไม่ใช่หลักฐาน · **low** |

## 4. Applied patterns for our production

1. **ตัวละครเป็น asset หลัก** (carousel เรื่องเล่า): ตามหลักฐาน character เป็นเจ้าของง่ายที่สุด → ล็อกลายเส้น สัดส่วน เสื้อผ้า ท่าประจำ ใน character bible; ห้ามให้ AI "ตีความใหม่" ทีละชุด; ฉาก/สี/เรื่องเปลี่ยนได้
2. **Template ฟีด** (โพสต์สินค้า, quote 1:1): ตำแหน่งโลโก้/ลายน้ำคงที่, palette 1 หลัก + 1–2 รอง, ฟอนต์หัว 1 + เนื้อ 1 → ผ่าน `BRAND_CHECK.md` ก่อน export
3. **คลิปสินค้าที่มีโลโก้แบรนด์คู่ค้า:** ใช้ไฟล์ทางการ, น้ำหนักภาพสมดุลกับ wordmark ของร้าน, clear space, ไม่บิดสี, ไม่ redraw ด้วย AI (Red Hat ห้ามชัดเจน) — กฎตำแหน่งจริงของสตูดิโอดู CLAUDE.md
4. **Headline + shape congruence:** ถ้าภาพ/กราฟิกเน้นเส้นมน (นุ่ม สบาย) ให้ข้อความขาย comfort; ถ้าเหลี่ยม คม ให้ขาย precision/durability (Jiang 2016) — อย่าให้ภาพกับคำพูดขายคนละเรื่อง
5. **Voice ภาษาไทยของแต่ละลูกค้า:** เขียนเป็น 3 คุณลักษณะ + "แต่ไม่" + ตาราง tone + รายการคำห้าม; ส่งต่อให้ TTS/voice director เป็น direction เดียวกัน
6. **Rebrand ให้ลูกค้า:** เสนอแบบ evolutionary 2 ระดับ, แผนแจ้งลูกค้าประจำ, เปลี่ยนทุกช่องทางในวันเดียว, เฝ้าคอมเมนต์ 7 วัน
7. **วัดผลรายเดือน:** Google Trends ชื่อแบรนด์ vs คู่แข่ง 2–4 ราย + ถามลูกค้าที่ทักมาว่ารู้จักจากไหน + cover-the-logo test ปีละ 2 ครั้ง

## 5. Anti-patterns

- **โลโก้คือแบรนด์:** brand book ที่มีแค่โลโก้ ไม่มีกฎการใช้/voice/imagery → ทุกคนตีความเอง
- **เปลี่ยน asset เพราะทีมเบื่อ:** ทีมเห็นทุกวัน ลูกค้าเห็นนาน ๆ ครั้ง — ความเบื่อของคนทำไม่ใช่สัญญาณให้เปลี่ยน (craft wisdom, สอดคล้อง fluency/commitment evidence)
- **พึ่งสีอย่างเดียว:** สีเป็นเจ้าของยากที่สุดตามหลักฐาน
- **ตาราง "จิตวิทยาสี" สากล** (แดง=ตื่นเต้น, น้ำเงิน=น่าเชื่อถือ ทุกวัฒนธรรม) และสถิติสีที่หาต้นทางไม่ได้ — ความหมายสีแปรตามวัฒนธรรมและหมวดสินค้า
- **Archetype/personality ถูกใช้เป็นวิทยาศาสตร์** (ดู marketing §2.3 — หลักฐานอ่อน)
- **ปั้นโลโก้คู่ค้าเอง** หรือให้ AI สร้างโลโก้ผสม / ใช้โลโก้คู่ค้าโดยไม่ขออนุญาต
- **Rebrand แบบเปิดตัวเงียบแล้วหวังให้คนรัก** (กรณี Gap) หรือเปลี่ยนครึ่ง ๆ กลาง ๆ (บางช่องทางยังเป็นของเก่าเป็นเดือน)
- **ใส่โลโก้ใหญ่ทุกที่เพื่อ "branding":** ระบบที่ดีทำให้จำได้แม้โลโก้เล็ก — วัดด้วย cover-the-logo test แทน
- **Voice guide ที่เป็นแค่คำคุณศัพท์** ("friendly, professional") ไม่มีตัวอย่างประโยค/คำห้าม → ใช้ไม่ได้จริง

## 6. Open questions / next research

- ผลของ consistency ต่อยอดขาย/การทักแชทของ SME (ยังไม่พบงานวิจัยไทย/อาเซียนที่ดี)
- DBA สำหรับแบรนด์ท้องถิ่นขนาดเล็กที่ไม่มี "fame" — ควรลงทุน asset ไหนก่อน (ตัวละคร vs โลโก้)? งานวิจัยทั้งหมดเป็นแบรนด์ใหญ่
- Sonic branding (เสียง/เสียงพากย์ประจำแบรนด์) — หาหลักฐานนอก vendor
- กฎหมายเครื่องหมายการค้าไทย + การใช้โลโก้แบรนด์ที่ตัวแทนจำหน่ายขาย (nominative use)
- อ่านต้นฉบับ Henderson & Cote (1998), Romaniuk (2018), Labrecque & Milne (2012/2013) และงาน typeface (Henderson, Giese & Cote 2004)
- Dynamic / responsive logos บนโซเชียลและวิดีโอแนวตั้ง
