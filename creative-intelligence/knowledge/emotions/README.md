# M02 — Emotion Science (วิทยาศาสตร์ของอารมณ์)

โมดูลนี้คือ "ทฤษฎีเบื้องหลัง" ของคลังอารมณ์สองชุดที่สตูดิโอมีอยู่แล้ว:
- `.claude/skills/ai-voice-director/EMOTION_LIBRARY.json` — 108 อารมณ์ สำหรับกำกับเสียง (prosody)
- `.claude/skills/ai-visual-artist/EMOTION_VISUAL_LIBRARY.json` — 114 อารมณ์ สำหรับภาพ (108 id เดียวกัน + 6 id เฉพาะภาพ)

สองคลังนั้นบอกว่า "เล่นอารมณ์นี้อย่างไร" ส่วนโมดูลนี้บอกว่า "อารมณ์คืออะไร เกิดจากอะไร เปลี่ยนอย่างไร คนอื่นอ่านมันได้แค่ไหน" เพื่อให้งานทุกสาขา ทุกลูกค้า ทุกหัวข้อใช้อารมณ์อย่างถูกหลัก ไม่ใช่แค่ถูกสูตร — แกนของแต่ละหัวข้อเขียนเป็นหลักทั่วไป ส่วนตัวอย่าง (เรื่อง Mint & Tao, คลิปเสียง TTS, โพสต์ร้านแว่น) เป็น **ตัวอย่าง ไม่ใช่ขอบเขต**

ไฟล์ในโฟลเดอร์:
- `README.md` — ไฟล์นี้
- `sources.json` — 50 แหล่ง (key ที่อ้างในไฟล์นี้)
- `emotion_crosswalk.json` — ตารางเชื่อม id ของคลังเสียงกับคลังภาพ + หมายเหตุทางทฤษฎี (114 แถว)
- `_build/gap_analysis.py`, `_build/build_crosswalk.py`, `_build/make_sources.py` — สคริปต์ที่สร้างตาราง gap, crosswalk และ sources (รันซ้ำได้)

---

## 1. Scope & status (ขอบเขตและสถานะ)

**ครอบคลุม**
- ทฤษฎีหลัก 4 สาย: basic emotions (Ekman), constructionist (Barrett, Russell core affect), appraisal (Lazarus, Scherer, Roseman, Moors et al.), dimensional (circumplex, PAD)
- อารมณ์ซับซ้อน: self-conscious (shame, guilt, embarrassment, pride), social/moral (envy, gratitude, awe, elevation), mixed emotions
- ความเข้มและการเปลี่ยนผ่าน (intensity, duration, dynamics), ความจำเชิงอารมณ์ (emotional memory, peak-end)
- emotional contagion (Hatfield) และ facial feedback
- emotion regulation (Gross process model, reappraisal vs suppression)
- ข้อถกเถียงเรื่องการอ่านอารมณ์จากใบหน้า (Barrett et al. 2019)
- ความแตกต่างข้ามวัฒนธรรม รวมถึงงานไทย (kreng jai, รอยยิ้มไทย, คำอารมณ์ที่มี "ใจ", sanuk, ความสงบ/อุเบกขา)
- Gap analysis ของคลังสองชุด + ข้อเสนอ unified id + `emotion_crosswalk.json`

**ไม่ครอบคลุม (ตั้งใจ)**
- vocal prosody / acoustic cues — มีแล้วใน `ai-voice-director/EVIDENCE_MATRIX.md` และ `RESEARCH_SOURCES.md` ไม่ทำซ้ำ
- สี/แสง/องค์ประกอบภาพต่ออารมณ์ — อยู่ใน `ai-visual-artist`
- ประสาทวิทยาเชิงลึก, ความผิดปกติทางอารมณ์เชิงคลินิก, อารมณ์ในสัตว์

**สถานะหลักฐาน (สำคัญ — อ่านก่อนใช้)**
- 50 แหล่ง: tier S 7, A 35, B 7, C 1
- access: full_text 23, abstract 11, publisher_page 1, search_summary 13, bibliographic 2 → อ่านจริง 35/50 (70%; รอบแรก 22/50 = 44%)
- อัปเกรดรอบสอง (2026-11-25): อ่านเพิ่ม 13 แหล่งผ่าน OpenAlex, PMC, Europe PMC และ repository ของผู้เขียน (ฉบับเต็ม: Barrett2017, CowenKeltner2017, Lindquist2012, Kramer2014, Jack2012, Crivelli2016, TangneyStuewigMashek2007, Gross1998, VerduynLavrijsen2015, FredricksonKahneman1993, Jackson2019, ThaiES16_2026 ; abstract: ManySmiles2022) — แหล่ง search_summary ที่เหลือเขียนตามที่ secondary source บอกเท่านั้น
- `_build/make_sources.py` เป็นรุ่นก่อนอัปเกรด — ห้ามรันทับ sources.json
- งานไทยส่วนใหญ่เป็นภาษาศาสตร์/วาทกรรม/สำรวจ ไม่ใช่การทดลองทางจิตวิทยา

---

## 2. Core concepts (แนวคิดหลัก)

รูปแบบแต่ละหัวข้อ: **คืออะไร · กลไก · การใช้งานสร้างสรรค์ · ข้อจำกัด · tier + keys · ความมั่นใจ**

### 2.1 Basic emotions (อารมณ์พื้นฐาน — Ekman)
- **คืออะไร**: อารมณ์จำนวนน้อย (anger, fear, disgust, sadness, happiness, surprise; contempt เป็นตัวที่ถกเถียง) ที่วิวัฒน์มาเพื่อแก้ปัญหาการอยู่รอด แต่ละตัวเป็น "family" ที่สมาชิกมีสาเหตุ สรีรวิทยา และการแสดงออกคล้ายกัน
- **กลไก**: appraisal อัตโนมัติ → ชุดการตอบสนองที่สอดประสาน (coherence); เกิดเร็ว อยู่สั้น เกิดเองโดยไม่ได้เลือก
- **ใช้งาน**: ใช้เป็น "ดัชนีหยาบ" ของคลัง (family prefix เช่น `joy.`, `anger.`) — สะดวกต่อการค้นหาและสื่อสารกับทีม
- **ข้อจำกัด**: หลักฐานเรื่อง "หน้าเฉพาะอารมณ์ที่เป็นสากล" อ่อนกว่าที่เชื่อกันมาก (ดู 2.10) ; โมเดลหน้าในใจของกลุ่มตัวอย่างเอเชียตะวันออกไม่แยกเป็น 6 กลุ่มชัดแบบตะวันตก (Jack2012 — ยังถกเถียง)
- **Tier/keys**: A — Ekman1992, Jack2012, Barrett2019 · **ความมั่นใจ**: medium (ใช้เป็นหมวดหมู่ได้, ใช้เป็นกฎอ่านหน้าไม่ได้)

### 2.2 Constructionist view (อารมณ์ถูกสร้างขึ้น — Barrett, Russell)
- **คืออะไร**: อารมณ์ไม่ใช่ "วงจรสำเร็จรูป" ในสมอง แต่สมองสร้างขึ้นทันทีจากส่วนประกอบทั่วไป: **core affect** (ความรู้สึกดี/ไม่ดี + ตื่นตัว/สงบ) + **concept** อารมณ์ที่เรียนรู้จากวัฒนธรรมและภาษา
- **กลไก**: Russell2003 — core affect คือสภาวะดิบที่รู้สึกได้เสมอ ถ้าไม่ผูกกับอะไรเป็น mood ถ้าผูก (attribute) กับ "Object" เช่น คน/เหตุการณ์ จะกลายเป็นตอนอารมณ์ (emotional episode) เช่น กลัว/โกรธ ; Barrett2017 — สมองทำนาย (prediction) และจัดหมวด (categorisation) จากประสบการณ์เดิม ; Barrett2017 ยังเสนอว่าหมวดอารมณ์มี degeneracy (สมองต่างรูปแบบสร้างอารมณ์หมวดเดียวกันได้) ; Lindquist2012 meta-analysis ภาพสมอง: **พบหลักฐานน้อยมาก** ว่าแต่ละอารมณ์อยู่ในบริเวณสมองเฉพาะ — กลับพบเครือข่ายทั่วไปชุดเดียวกันทำงานข้ามหลายอารมณ์ (และงานที่ไม่ใช่อารมณ์)
- **ใช้งาน**:
  - ภาพ/คลิปตั้ง "affective quality" (สบาย-สงบ, ตื่นเต้น-สว่าง) ส่วนคำบรรยาย/บทพูดเป็นตัวบอก Object ที่ทำให้กลายเป็นอารมณ์มีชื่อ → แคปชันสำคัญพอ ๆ กับภาพ
  - id ฝั่งภาพแบบ `visual.coziness`, `visual.mystery` คือ affective quality ของฉาก ไม่ใช่อารมณ์ของตัวละคร
  - **emotional granularity**: คนที่แยกอารมณ์ลบละเอียด (เช่น "น้อยใจ" ≠ "เสียใจ" ≠ "ผิดหวัง") จัดการอารมณ์ได้ดีกว่า (Kashdan2015) → ใช้คำไทยที่แม่นในแคปชันและบท
- **ข้อจำกัด**: ทฤษฎีกว้าง ทดสอบตรง ๆ ยาก ; ฝ่าย basic emotion โต้แย้งต่อเนื่อง (เช่นคำตอบต่อ CowenKeltner2017)
- **Tier/keys**: A — Russell2003, Barrett2017 (full_text), Lindquist2012 (full_text), Kashdan2015 ; B — ScarantinoDeSousa2018 · **ความมั่นใจ**: medium

### 2.3 Appraisal theory (อารมณ์เกิดจากการประเมิน — Lazarus, Scherer, Roseman, Moors)
- **คืออะไร**: อารมณ์เป็น *กระบวนการ* ไม่ใช่สภาวะนิ่ง เกิดจากการประเมินว่าเหตุการณ์มีความหมายต่อ "สิ่งที่เราใส่ใจ" (concerns: ความต้องการ ความผูกพัน คุณค่า เป้าหมาย ความเชื่อ) อย่างไร
- **กลไก** (Moors2013): ตัวแปรประเมินหลัก
  - goal relevance (เกี่ยวกับฉันไหม), goal congruence (ดีหรือร้ายต่อเป้าหมาย)
  - certainty (แน่นอนแค่ไหน), agency (ใครเป็นต้นเหตุ: ตัวเอง/คนอื่น/สถานการณ์)
  - coping potential/control (รับมือได้ไหม) ; บางทฤษฎีเพิ่ม novelty, urgency, fairness, norm compatibility
  - อารมณ์มีหลาย component: appraisal, action tendency, ร่างกาย, การแสดงออก, ความรู้สึก — ต่อเนื่องและวนกลับ (recursive) ; หลายตอนอารมณ์วิ่งขนานกันได้
  - Lazarus1991: primary appraisal (กระทบฉันไหม) + secondary appraisal (ฉันรับมือได้ไหม) ; **core relational theme** เช่น anger = ถูกดูแคลนอย่างไม่เป็นธรรม, anxiety = อันตรายที่คาดว่าจะมา + ไม่แน่ใจว่ารับมือได้
  - Scherer2009: ลำดับ stimulus evaluation checks (novelty → pleasantness → goal relevance → coping → norms)
  - Roseman2013: อารมณ์เป็นระบบกลยุทธ์รับมือ (coping strategies) ทั้งกับภัยและโอกาส
- **ใช้งาน**:
  - เขียน turning point เป็น "การเปลี่ยน appraisal": เหตุการณ์เดียว ตีความต่างกัน = อารมณ์ต่างกัน (Tao ทำแว่นหาย — โทษตัวเอง = guilt / โทษร้าน = anger / คิดว่าหาใหม่ได้ = relief)
  - ใส่ "core relational theme" 1 บรรทัดในบรีฟฉากทุกครั้ง ให้คนเขียนบท คนกำกับเสียง และคนทำภาพเข้าใจตรงกัน
  - ปฏิกิริยาในคลิป animate ตามลำดับ Scherer: สะดุ้ง (novelty) → หน้าเปลี่ยน (ดี/ร้าย) → ท่าทางตัดสินใจ (coping)
- **ข้อจำกัด**: รายการตัวแปรไม่ครบทุกวัฒนธรรม ; บทบาทเชิงสาเหตุของ appraisal ยังถกเถียง (ScarantinoDeSousa2018)
- **Tier/keys**: A — Moors2013 (full_text), Lazarus1991 (full_text), Scherer2009, Roseman2013 · **ความมั่นใจ**: high (ในฐานะกรอบเขียนเรื่อง), medium (ในฐานะทฤษฎีเชิงสาเหตุ)

### 2.4 Dimensional models: circumplex & PAD
- **คืออะไร**: วางอารมณ์บนแกนต่อเนื่อง — valence (ดี/ไม่ดี) × arousal (ตื่นตัว/สงบ) [circumplex, Russell2003] ; PAD เพิ่ม dominance (คุมสถานการณ์ได้/ถูกครอบงำ) [Mehrabian1996]
- **กลไก**: valence + arousal เป็นโครงสร้างร่วมที่พบในทุกตระกูลภาษา จากการวิเคราะห์ colexification 2,474 ภาษา (Jackson2019) แม้เครือข่ายคำอารมณ์จะต่างกันตามวัฒนธรรม
- **ใช้งาน**:
  - คลังเสียงมี `vad` อยู่แล้ว (`vad_from_voice_lib` ถูกคัดลอกมาใน crosswalk) → ใช้กรองหาอารมณ์ข้างเคียงสำหรับ transition
  - แกน dominance แยก anger (D สูง) กับ fear (D ต่ำ) ที่ valence/arousal ใกล้กัน → มุมกล้องต่ำ/สูง, ท่ายืดตัว/หดตัว
  - Cowen & Keltner (วิดีโอ 2,185 คลิป) พบ 27 หมวดที่เชื่อมด้วย "gradient" ต่อเนื่อง (เช่น calmness → aesthetic appreciation → awe) และป้ายหมวดอธิบายรายงานได้ดีกว่าแกน valence/arousal → transition ที่ลื่นคือเดินไปหมวดข้างเคียง ไม่กระโดด
- **ข้อจำกัด**: สองแกนแยก fear/anger/disgust ไม่ได้ ; circumplex แบบ bipolar อธิบาย mixed emotions ไม่ได้ (ดู 2.7) ; ค่า VAD ในคลังเสียงเป็นการวางคร่าว ๆ ไม่ได้วัดจริง
- **Tier/keys**: A — Russell2003, Mehrabian1996, Jackson2019, CowenKeltner2017 · **ความมั่นใจ**: high (valence/arousal), medium (dominance)

### 2.5 Self-conscious emotions (shame, guilt, embarrassment, pride)
- **คืออะไร**: อารมณ์ที่ต้องมี "ตัวตน" ให้ประเมิน — ต้องรู้ตัว มีภาพตัวเอง และโยงเหตุการณ์กลับมาที่ตัวเอง ; เกิดทีหลังในพัฒนาการ ซับซ้อนกว่า และหลักฐานใบหน้าสากลอ่อนกว่า basic emotions (TracyRobins2004)
- **กลไก** (TracyRobins2004):
  - ทุกตัว: สนใจตัวเอง → เหตุการณ์เกี่ยวกับ identity goal → โยงสาเหตุเข้าตัว (internal attribution)
  - **shame** = โทษ "ตัวตนทั้งหมดที่คงที่" ("ฉันมันโง่") → ซ่อนตัว ป้องกันตัว โกรธ (TangneyStuewigMashek2007)
  - **guilt** = โทษ "การกระทำเฉพาะครั้ง" ("ฉันไม่ได้พยายามพอ") → อยากชดเชย ขอโทษ เห็นใจ ; โดยรวม guilt ปรับตัวได้ดีกว่า shame และ guilt-proneness สัมพันธ์กับ perspective-taking/empathic concern ; อารมณ์กลุ่มนี้เป็น "emotional moral barometer" ที่คาดล่วงหน้าได้ก่อนลงมือ (TangneyStuewigMashek2007)
  - **embarrassment** = ตัวตนต่อหน้าคนอื่นสะดุด ; มีชุดท่าทาง appeasement เฉพาะ: ก้มมอง เหลือบตา กลั้นยิ้ม หันหน้า แตะหน้า (94% ของกลุ่มอาย มองต่ำ) (Keltner1995)
  - **pride** สองแบบ: achievement-oriented/authentic ("ฉันซ้อมมา") vs hubristic ("ฉันเก่งที่สุด")
  - **humiliation**: ถูกทำให้อับอายต่อหน้าคนอื่น + โทษตัวตนคงที่ (ยังมีงานวิจัยน้อย)
- **ใช้งาน**:
  - เขียนบทแยก shame/guilt ด้วยรูปประโยค: "ฉันมันแย่" (shame) vs "ฉันลืมแว่นของเธอ" (guilt)
  - คอนเทนต์แบรนด์/สุขภาพ: กระตุ้นได้แค่ guilt แบบอ่อนที่ชี้ไปที่การกระทำ ห้ามใช้ shame ที่โจมตีตัวตน — ตัวอย่างงานร้าน: "ถึงเวลาตรวจตาแล้วนะ" ได้ / "สายตาแย่เพราะคุณไม่ดูแลตัวเอง" ไม่ได้
  - Mint & Tao ไม่มีหน้า → embarrassment เล่นด้วยลำดับท่า 2–3 วินาที (ก้ม → หัน → แตะแก้ม) ได้ดีกว่าการพยายามวาดหน้าแดง
  - pride ของตัวละครที่น่ารักควรเป็นแบบ "ภูมิใจในความพยายาม"
- **ข้อจำกัด**: แบบจำลองเชิงทฤษฎี ; ตัวอย่างส่วนใหญ่ตะวันตก ; สาเหตุและการแสดงออกต่างกันตามวัฒนธรรม (TracyRobins2004 เองระบุ)
- **Tier/keys**: A — TracyRobins2004 (full_text), Keltner1995 (full_text), TangneyStuewigMashek2007 (full_text) · **ความมั่นใจ**: high (shame vs guilt), medium (pride สองแบบ), low (humiliation)

### 2.6 Social & moral emotions (envy, gratitude, awe, elevation)
- **envy**: แยกเป็น **benign** (อยากยกตัวเองขึ้น พัฒนาตัวเอง) กับ **malicious** (อยากดึงอีกฝ่ายลง) — พบทั้งในภาษาที่มีสองคำ (ดัตช์) และคำเดียว (อังกฤษ สเปน) ; ความรู้สึกว่า "เขาไม่สมควรได้" ดัน malicious (vandeVen2009) → การตลาดใช้ได้แค่ benign ("ฉันก็มีได้") ห้ามเยาะคู่แข่งหรือลูกค้า
- **gratitude**: find-remind-bind — ช่วยหาความสัมพันธ์ใหม่ เตือนถึงคนที่มีอยู่ และผูกให้แน่น (Algoe2012) → โพสต์ขอบคุณลูกค้าคือการ "bind" ความสัมพันธ์ ไม่ใช่แค่มารยาท ; ไทยมีแนวคิด "บุญคุณ" (gratitude + ภาระตอบแทน) ซึ่ง session นี้ยังไม่พบงานวิจัยรองรับ
- **awe**: vastness (ยิ่งใหญ่เกินตัว) + need for accommodation (ไม่เข้ากับกรอบเดิม) (KeltnerHaidt2003) ; 5 รสชาติ: threat, beauty, ability, virtue, supernatural ; มักมาพร้อม "small self" และความรู้สึกเชื่อมโยง ; คนจีนรายงาน awe ต่อ "บุคคล" มากกว่า คนอเมริกันรายงานต่อ "ความสำเร็จตัวเอง" มากกว่า (Allen2018)
  - awe → พฤติกรรมช่วยเหลือ (Piff2015) แต่ meta-analysis ปี 2025 ชี้ว่าผลกับพฤติกรรมจริงเล็กกว่าผลแบบรายงานตนเอง (r ≈ .24 vs .41) และมีรายงานการทำซ้ำไม่สำเร็จเรื่อง small self (Lin2025AweMeta) → ใช้ awe ทำฉากได้ แต่อย่าอ้างว่ามันทำให้คนใจดีขึ้นแน่นอน
- **elevation**: อารมณ์บวกเมื่อเห็นความดีของคนอื่น (อยู่ในรีวิวของ TangneyStuewigMashek2007) — ทั้งสองคลังยังไม่มี
- **Tier/keys**: A — vandeVen2009, Algoe2012, KeltnerHaidt2003, Piff2015 ; S — Lin2025AweMeta ; B — Allen2018 · **ความมั่นใจ**: high (envy สองแบบ), medium (gratitude, awe), low (awe → prosocial)

### 2.7 Mixed, suppressed และ conflicted emotions
- **mixed emotions**: รู้สึกสองขั้วตรงข้ามพร้อมกัน (เช่น สุข-เศร้า) เป็นประสบการณ์จริงที่วัดได้ ไม่ใช่ความผิดพลาดของการวัด — meta-analysis 63 การทดลอง d = 0.77 (หลังปรับ publication bias ≈ 0.53) ใช้ได้ทั้งหนัง เพลง โฆษณา การนึกย้อน (BerriosTotterdellKellett2015) ; สนับสนุน Evaluative Space Model (บวก/ลบเป็นสองระบบแยก) มากกว่า circumplex แบบขั้วเดียว
- **suppressed/hidden**: ดู 2.9 (expressive suppression) และ 2.11 (display rules)
- **conflict** (รักแต่โกรธ): appraisal theory อนุญาตให้หลายตอนอารมณ์วิ่งขนานกัน (Moors2013)
- **ใช้งาน**: ตอนจบ bittersweet (ลาจาก, วันสุดท้ายของฤดู, แว่นคู่เก่าที่เลิกใช้) เป็นเป้าที่มีหลักฐาน ; ในภาพ ให้ "สองสัญญาณขัดกัน" อยู่ในเฟรมเดียว (แสงอุ่น + ระยะห่าง)
- **Tier/keys**: S — BerriosTotterdellKellett2015 (full_text) · **ความมั่นใจ**: high

### 2.8 Intensity, duration, dynamics & emotional memory
- **duration**: อารมณ์อยู่นานต่างกันมาก — ความสำคัญของเหตุการณ์ + การคิดวนซ้ำ (rumination) อธิบายความต่างระหว่างอารมณ์ได้ 43% ; sadness อยู่นานที่สุด (median ~120 ชม. ตามกราฟในบทความ), shame/surprise/fear/disgust/boredom/being touched/irritation/relief สั้นที่สุด, guilt นานกว่า shame, anxiety นานกว่า fear (VerduynLavrijsen2015 — นักเรียนมัธยมเบลเยียม 233 คน นึกย้อน 27 อารมณ์)
- **dynamics**: emotional inertia (อารมณ์ดื้อต่อการเปลี่ยน) และ variability เป็นลักษณะเฉพาะบุคคล (KuppensVerduyn2017 — bibliographic)
- **gradients**: 27 หมวดเชื่อมกันต่อเนื่อง (CowenKeltner2017) → transition ที่เชื่อได้คือเดินผ่านอารมณ์ข้างเคียง
- **peak-end**: การประเมินย้อนหลังเหมือนค่าเฉลี่ยของ "snapshot" — ในการทดลองคลิปหนัง (32 + 96 คน) ผลของความยาวเล็กมาก อธิบายได้ด้วยอารมณ์ขณะดู และเล็กลงอีกเมื่อประเมินจากความจำ (duration neglect) ; ตัวเลข peak + end = 94% มาจาก reanalysis ข้อมูลเก่าที่ paper อ้าง (FredricksonKahneman1993) ; ใช้กับคลิปสั้น/ประสบการณ์สั้นได้ดี แต่ไม่ค่อยถือสำหรับประสบการณ์ทั้งวัน (ตาม secondary)
- **emotional memory**: amygdala เสริมการเข้ารหัสและ consolidation ของความจำที่มีอารมณ์ (LaBarCabeza2006) ; แต่ flashbulb memory "รู้สึกชัด" ไม่ได้ "แม่นกว่า" — ความแม่นลดลงเท่าความจำธรรมดา มีแค่ความมั่นใจที่คงอยู่ (TalaricoRubin2003)
- **ใช้งาน**:
  - ทุกคลิป/คารูเซลออกแบบ peak ชัด 1 จุด และสไลด์สุดท้ายที่อบอุ่น (สินค้า/แบรนด์อยู่ใน beat ที่มีอารมณ์ ไม่ใช่ต่อท้ายหลังอารมณ์จบ)
  - เศร้า/รู้สึกผิดค้างข้ามหลายสไลด์ได้ ; ตกใจ/กลัวควรคลี่คลายเร็ว
  - ตัวละครจำอดีตผิดอย่างมั่นใจได้ = อุปกรณ์เล่าเรื่องที่มีหลักฐานรองรับ
- **Tier/keys**: A — VerduynLavrijsen2015, FredricksonKahneman1993, LaBarCabeza2006, TalaricoRubin2003, KuppensVerduyn2017 · **ความมั่นใจ**: medium–high

### 2.9 Emotion regulation (Gross process model)
- **คืออะไร**: กระบวนการที่คนกำหนดว่าจะมีอารมณ์อะไร เมื่อไหร่ รู้สึกและแสดงออกอย่างไร — แยกจาก coping, mood regulation, defence (Gross1998, full_text)
- **กลไก**: 5 จุดแทรกตามเวลา — situation selection → situation modification → attentional deployment → cognitive change (reappraisal) → response modulation (เช่น suppression) ; รุ่นขยาย: identification → selection → implementation (Gross2015)
  - **reappraisal** (ต้นทาง): ลดทั้งความรู้สึกและการแสดงออก ไม่เสียความจำ
  - **expressive suppression** (ปลายทาง): ลดสีหน้าแต่ไม่ลดความรู้สึก (อารมณ์ลบ) ทำให้จำแย่ลง และร่างกายตื่นตัวขึ้นทั้งตัวเองและคู่สนทนา (Gross2002 — full_text) ; การกดยิ้มลดความขำได้จริง
  - คนที่ reappraise เป็นนิสัยมี well-being และความสัมพันธ์ดีกว่า ผู้ที่ suppress เป็นนิสัยตรงข้าม (GrossJohn2003, correlational)
  - meta-analysis 306 การเปรียบเทียบ: perspective taking d+ 0.45, reappraise สิ่งเร้า 0.36, distraction 0.27, ระงับการแสดงออก 0.32 แต่ระงับความรู้สึก/ความคิดไม่ได้ผล, จดจ่อกับอารมณ์ −0.26 (Webb2012)
  - **วัฒนธรรม**: ผลเสียทางสังคมของ suppression น้อยลงในคนที่ถือคุณค่าแบบเอเชีย (ButlerLeeGross2007 — ตัวอย่างหญิงนักศึกษาในสหรัฐฯ ไม่ใช่คนไทย)
- **ใช้งาน**:
  - `suppressed.holding_back_tears` = suppression: ความรู้สึกยังอยู่ ร่างกาย "รั่ว" (หายใจสะดุด กราม มือ) — ภาพและเสียงต้องให้คนดูเห็นรอยรั่ว
  - จุดหักของ Mint & Tao ควรเป็น perspective taking/reappraisal ("ลองมองจากฝั่งยายดูสิ") ซึ่งเป็นกลยุทธ์ที่มีผลชัดที่สุด
  - ความสุภาพแบบไทย/ความเกรงใจ ไม่ควรถูกเขียนเป็น "เย็นชา/เสแสร้ง" อัตโนมัติ
- **Tier/keys**: S — Webb2012 ; A — Gross1998, Gross2002, GrossJohn2003, Gross2015, ButlerLeeGross2007 · **ความมั่นใจ**: high (reappraisal > suppression ในแลบตะวันตก), medium (ข้ามวัฒนธรรม)

### 2.10 Reading emotion from faces — ข้อถกเถียงและกฎของสตูดิโอ
- **หลักฐาน** (Barrett2019, tier S, full_text): คนยิ้ม/บึ้ง/ขมวดคิ้วในอารมณ์ที่ตรงกัน "มากกว่าบังเอิญ" แต่ความเชื่อมโยงอ่อน — ค่าเฉลี่ยที่อ้างจาก meta-analysis r = .32 และสัดส่วน .19 ; สีหน้าแบบโพสท่าตรงต้นแบบมากกว่าสีหน้าจริง ; ยิ้ม Duchenne เกิดเมื่อไม่ได้สุขก็ได้ และมักใช้สื่อสารการยอมหรือความเป็นมิตร ; บริบทแทบไม่ถูกวัด ; ระบบ AI อ่านหน้าแม่นต่ำลงนอกแลบ
- ข้ามวัฒนธรรม: หน้า "หอบตกใจ (fear)" ถูกวัยรุ่นชาว Trobriand อ่านเป็นการข่มขู่/โกรธ และเมื่อให้เลือกหน้าที่ "ข่มขู่" ชาว Trobriand เลือกหน้าหอบ ส่วนชาวสเปนเลือกหน้าบึ้ง (Crivelli2016) ; โมเดลหน้าในใจของผู้สังเกตเอเชียตะวันออก 15 คนไม่แยก 6 กลุ่มชัดแบบตะวันตก 15 คน และใช้ "ดวงตา" บอกความเข้ม (Jack2012 — กลุ่มตัวอย่างเล็ก) ; มีความได้เปรียบภายในกลุ่ม — คนวัฒนธรรมเดียวกันอ่านกันแม่นกว่า (ElfenbeinAmbady2002, มีข้อโต้แย้งจาก Matsumoto)
- **กฎของสตูดิโอ (บังคับ)**: **ห้ามสรุปอารมณ์ภายในจากใบหน้าหรือเสียงอย่างเดียว** — ทั้งในการวิจารณ์ภาพ ("ลูกค้าคนนี้เศร้า"), แคปชัน, การวิเคราะห์คลิปลูกค้า, และการ QC เสียง TTS ให้ใช้ภาษา "สีหน้า/น้ำเสียงแบบ X" และระบุบริบท (เหตุการณ์ คำพูด การกระทำ) ทุกครั้ง ; การ "เล่น" อารมณ์ให้คนดูอ่าน (performance) ยังทำได้ แต่ต้องมีบริบทช่วย
- **ใช้งาน**: Mint & Tao ไร้หน้า = สอดคล้องกับวิทยาศาสตร์นี้พอดี อารมณ์มาจากสถานการณ์ ท่าทาง ระยะห่าง และบทพูด
- **ความมั่นใจ**: high (ว่าการอ่านหน้าอย่างเดียวไม่น่าเชื่อถือ) ; ยังถกเถียงว่าหน้ามีข้อมูลอารมณ์ "แค่ไหน"

### 2.11 Emotional contagion (การติดต่อทางอารมณ์ — Hatfield)
- **คืออะไร**: อารมณ์ส่งต่อกันแบบอัตโนมัติ: เลียนแบบหน้า เสียง ท่าทางโดยไม่รู้ตัว → feedback จากร่างกายเปลี่ยนความรู้สึก → อารมณ์บรรจบกัน (Hatfield1993 ตามสรุปของ secondary sources)
- **หลักฐาน**: facial feedback มีจริงแต่เล็ก — การทดลองหลายแลบ 3,878 คน 19 ประเทศ พบว่าการเลียนแบบ/ยิ้มโดยตั้งใจเพิ่มความสุขที่รายงาน, วิธีคาบปากกาให้หลักฐานอ่อน (ManySmiles2022) ; ในโซเชียล (N = 689,003) การลดโพสต์บวกในฟีดทำให้คำบวกในโพสต์ของผู้ใช้ลด 0.1% (d = 0.02) และคำลบเพิ่ม 0.04% (d = 0.001) ; การลดโพสต์ลบให้ผลกลับกัน (Kramer2014 — ผลเล็กมากตามที่ผู้เขียนเองระบุ และมีปัญหาจริยธรรมเรื่อง consent)
- **ใช้งาน**: เสียงผู้บรรยายที่สงบอบอุ่น + ภาษากายผ่อนคลายในคลิป = เส้นทางระดับล่างสู่คนดูที่สงบ ; ฟีดของแบรนด์ (เช่น ร้าน) ควรโทนอุ่น ไม่สร้างความกังวล — แต่อย่าคาดหวังผลใหญ่จากโทนฟีดอย่างเดียว ; อย่าสัญญาว่า "ยิ้มแล้วจะมีความสุข" ในคอนเทนต์สุขภาพ
- **Tier/keys**: A — Hatfield1993 (search_summary), Kramer2014 (full_text) ; S — ManySmiles2022 (abstract) · **ความมั่นใจ**: medium

### 2.12 Cross-cultural emotion (รวมไทย/เอเชียตะวันออกเฉียงใต้)
- **หลักทั่วไป**: วัฒนธรรมต่างและเหมือนได้ทุกขั้นของกระบวนการอารมณ์ (สิ่งกระตุ้น การประเมิน การแสดงออก การจัดการ) และขึ้นกับระดับการอธิบาย (MesquitaFrijda1992) ; colexification 2,474 ภาษา: เครือข่ายคำอารมณ์ต่างกันตามตระกูลภาษา (ทำนายได้จากความใกล้ทางภูมิศาสตร์) แต่ทุกตระกูลแยกอารมณ์ด้วย valence ก่อน แล้วจึง activation (Jackson2019)
- **ideal affect**: วัฒนธรรมกำหนด "อยากรู้สึกอย่างไร" มากกว่า "รู้สึกจริงอย่างไร" ; กลุ่มเอเชียตะวันออกให้ค่าอารมณ์บวกแบบสงบ (LAP) มากกว่าชาวอเมริกันเชื้อสายยุโรป (TsaiKnutsonFung2006 — ไม่มีตัวอย่างไทย)
- **ไทย**:
  - **รอยยิ้มไทย**: เมื่อไม่ได้สุข คนไทยยิ้มมากกว่าญี่ปุ่นตอนทักทายและขอโทษ ; ยิ้มแบบเศร้าคนไทยยกแก้ม (AU6) มากกว่า (Pothisitthiporn2016) → รอยยิ้มไทยเป็นการกระทำทางสังคม ไม่ใช่หลักฐานความสุข
  - **เกรงใจ (kreng jai)**: ความเกรงใจ/ไม่อยากรบกวน/ให้เกียรติ มีหลายความหมาย ศึกษาด้วยการวิเคราะห์วาทกรรม + แบบสอบถาม 471 คน (WyattPromkandorn2012 — search_summary) ; เป็นท่าทีทางสังคม-ศีลธรรมที่มีความรู้สึกประกอบ ไม่ใช่ basic emotion
  - **คำอารมณ์ "ใจ"**: คำอารมณ์พื้นฐานภาษาไทย 195 คำ หลายคำมาจากผลทางร่างกาย (ชื่นใจ, ต้องใจ, น้ำตาตกใน, เสียวสันหลัง, เลือดพล่าน) (ThaiEmotionWords2020) ; อุปลักษณ์ "ใจ" แบ่งเป็นใจเป็นคน วัตถุ พื้นที่ ภาชนะ (Bovonwiwat2023) → ให้ภาษาภาพ ("ใจกว้าง", "ใจเย็น", "ใจหาย")
  - **sanuk / harmony / face / mai pen rai**: ค่านิยมสนุก ความกลมกลืน ไม่ระเบิดอารมณ์ เรื่องหน้า (Komin1990 — bibliographic ; Scroope2025 — tier C)
  - **ใจเย็น/อุเบกขา**: แบบวัด Thai ES-16 (ผู้ใหญ่ไทยสายปฏิบัติสติ 437 คน, retest 211 คน) มีสององค์ประกอบ — การยอมรับประสบการณ์ (experiential acceptance) + การไม่ตอบสนองทันที (non-reactivity) ; fit ดี (CFI .994, RMSEA .020), α .84, retest r = .89 ; อุเบกขาสูงสัมพันธ์กับเมตตา-กรุณามากขึ้น ; ผู้เขียนแย้งว่าแบบวัดตะวันตกลดอุเบกขาเหลือแค่ "การกด/ลดปฏิกิริยา" (ThaiES16_2026, full_text — ไม่ใช่ตัวอย่างประชาชนทั่วไป)
- **ใช้งาน**: แปลอารมณ์ตามความหมาย ไม่แปลคำต่อคำ ; ใช้นักแสดง/เสียงไทยเพื่อให้คนไทยอ่านแม่น ; ใช้สำนวนร่างกายไทยในแคปชัน ; ทดสอบภาพโทนสงบ-บวก (LAP) กับกลุ่มเป้าหมายแทนการเดา
- **ความมั่นใจ**: medium (หลักทั่วไป), low (ข้อสรุปเฉพาะไทย — ตัวอย่างน้อยและส่วนใหญ่ไม่ใช่การทดลอง)

---

## 3. Contested / replication notes

| ประเด็น | ฝั่ง A | ฝั่ง B | สถานะ/ความมั่นใจ |
|---|---|---|---|
| ใบหน้าเป็นสากลไหม | Ekman1992: basic emotions มีสัญญาณเฉพาะ | Barrett2019, Jack2012, Crivelli2016: ความเชื่อมโยงอ่อน, ขึ้นกับวัฒนธรรม/บริบท ; Jack2012 ถูกโต้ (Sauter & Eisner) | ฝั่ง B ชนะเรื่อง "อ่านหน้าเพื่อวินิจฉัย" ; ยังถกเถียงเรื่อง "มีสัญญาณบางส่วน" — medium |
| อารมณ์เป็นหมวดหรือมิติ | CowenKeltner2017: 27 หมวดแยกได้ | Barrett et al. (คำตอบต่อ PNAS): ข้อมูลเข้ากับ constructionist | ใช้ทั้งสอง: หมวด = ป้ายชื่อ, มิติ = ทิศทาง — medium |
| สมองมีวงจรเฉพาะอารมณ์ไหม | locationist | Lindquist2012 meta-analysis: หลักฐานน้อยมากสำหรับบริเวณเฉพาะแต่ละอารมณ์ ; Barrett2017 degeneracy | ฝั่ง constructionist มีหลักฐานภาพสมองหนุน แต่ fMRI ระดับบริเวณยังจำกัด — medium |
| Facial feedback | การทดลองคาบปากกาเดิม (Strack et al. 1988 — ไม่ได้อ่าน, อ้างผ่าน ManySmiles2022) | การทำซ้ำล้มเหลวกับคาบปากกา ; ManySmiles2022 พบผลจริงแต่เล็ก (ยิ้มตั้งใจ/เลียนแบบ) | medium |
| Awe → prosocial | Piff2015 | รายงานทำซ้ำ small self ไม่สำเร็จ (ไม่ตีพิมพ์) ; meta 2025 ผลพฤติกรรม r ≈ .24 | ผลมีแต่เล็ก, กลไกไม่ชัด — low–medium |
| In-group advantage | ElfenbeinAmbady2002 | Matsumoto 2002: ข้อบกพร่องของการออกแบบ | medium |
| Social contagion ออนไลน์ | Kramer2014 (N = 689,003, มีนัยสำคัญทางสถิติ) | d = 0.001–0.02 + ปัญหาจริยธรรม | มีอยู่จริงแต่เล็กมาก — low (สำหรับผลเชิงปฏิบัติ) |
| Suppression เสียเสมอไหม | Gross2002, GrossJohn2003 (ตะวันตก) | ButlerLeeGross2007: ผลเสียทางสังคมขึ้นกับวัฒนธรรม | medium |
| Peak-end | FredricksonKahneman1993 | ไม่ถือในประสบการณ์ทั้งวัน ; ค่าเฉลี่ยทำนายได้ใกล้เคียงในบาง reanalysis | high สำหรับคลิปสั้น |
| ระยะเวลาอารมณ์ (ตัวเลขชั่วโมง) | VerduynLavrijsen2015: sadness median ~120 ชม. (กราฟในบทความ) | ตัวเลข ~35 ชม. ของ joy จาก press ยังยืนยันจากข้อความไม่ได้ ; เป็นการนึกย้อนของวัยรุ่นกลุ่มเดียว | ใช้ทิศทาง/ลำดับ ไม่ใช้ตัวเลขเป็นกฎ — medium |

---

## 4. Applied patterns for our production

> รูปแบบเป็นหลักทั่วไป — ตัวอย่างมาจากงานปัจจุบัน (Mint & Tao, คลิป TTS, ร้านแว่นหัวหิน) ใช้กับลูกค้า/หัวข้ออื่นได้โดยเปลี่ยนตัวอย่าง

1. **บรีฟอารมณ์ 4 บรรทัด** (ใส่ทุกฉากของ Mint & Tao / คลิปเรื่อง):
   `emotion id` · `core relational theme` (1 ประโยค) · `appraisal ที่เปลี่ยน` (agency/certainty/coping) · `regulation` (แสดงออก/กด/reappraise)
   ตัวอย่าง: `selfconscious.guilt` · "ฉันทำแว่นยายพัง" · agency = ตัวเอง, เฉพาะครั้ง · กดไว้ก่อนแล้วสารภาพ
2. **โครงคารูเซล 6–8 สไลด์ตาม appraisal + peak-end**: เหตุการณ์ → appraisal แรก (ผิด) → อารมณ์พุ่ง (peak) → อีกตัวช่วย perspective taking → reappraisal → ตอนจบอบอุ่น/bittersweet (end) ; แบรนด์/แว่นอยู่ในจังหวะ peak หรือ end
3. **Shame → guilt rewrite**: ถ้าบทมีประโยคโทษตัวตน ("ฉันมันซุ่มซ่าม") ให้เปลี่ยนเป็นโทษการกระทำ ("ฉันวางแว่นไว้ขอบโต๊ะ") แล้วตามด้วยการซ่อมแซม — ตัวละครน่ารักขึ้น และไม่ส่ง shame ให้คนดู
4. **Embarrassment ไร้หน้า**: ลำดับท่า 2–3 วินาที ก้มหัว → หันข้าง → มือแตะแก้ม/ท้ายทอย ; เสียง TTS ใช้ `selfconscious.embarrassment` ของคลังเสียง
5. **Suppressed ให้เห็นรอยรั่ว**: เวลาใช้ `suppressed.*`/`hidden.*` ภาพต้องมี "leak" อย่างน้อย 1 อย่าง (มือกำ ไหล่ตึง หายใจสะดุด) และบทต้องมีบริบทที่ทำให้คนดูรู้ว่าตัวละครกำลังกด
6. **Bittersweet ending**: `mixed.bittersweet_farewell` สำหรับตอนจบซีซั่น/โพสต์ลาแว่นคู่เก่า — ภาพมีสัญญาณบวกและลบในเฟรมเดียว
7. **Awe ในฉากสถานที่**: แยก beauty-awe (เช่น พระอาทิตย์ตกทะเลหัวหิน, ฟ้าโปร่ง) ออกจาก threat-awe (พายุ, คลื่นใหญ่) ; คนตัวเล็กในฉากกว้าง ; อย่าเคลมว่า "ดูแล้วใจดีขึ้น"
8. **Kreng jai เป็นท่าทีมีบริบท**: ระบุความต่างสถานะ/บุญคุณ/ความสนิทในฉากเสมอ ; รอยยิ้มไทยในฉากขอโทษคือการกระทำทางสังคม
9. **โพสต์แบรนด์**: กระตุ้น benign envy ("คุณก็มีแบบนี้ได้"), gratitude แบบ bind ("ขอบคุณที่ไว้ใจเรามา 5 ปี"), LAP (สงบ-อุ่น) เป็นทางเลือกที่ต้องทดสอบ ไม่ใช่สูตร (ตัวอย่างงานร้าน: "คุณก็ใส่แบบนี้ได้")
10. **QC/critique**: ใน IMAGE_CRITIQUE หรือการรีวิวคลิปลูกค้า เขียนว่า "ท่าทางอ่านได้เป็น X ในบริบทนี้" ไม่ใช่ "ตัวละคร/คนนี้รู้สึก X"

---

## 5. Anti-patterns (สิ่งที่ห้ามทำ)

- **"Emotion detection" จากหน้า/เสียง** — เช่น ใช้ AI ตรวจว่าลูกค้า "ชอบ" สินค้า (แว่น) จากสีหน้า หรือเขียนแคปชันว่า "ดูหน้าก็รู้ว่ามีความสุข" (Barrett2019)
- ตาราง "สีหน้าสากล 6 แบบ" แปะเป็นกฎตายตัวสำหรับตัวละครไทย
- ใช้ shame เป็นเครื่องมือขาย (เช่น "ใส่แว่นเก่าน่าอาย")
- ใช้ malicious envy/เยาะเย้ยคู่แข่ง
- อ้าง "ยิ้มแล้วจะมีความสุข", "ดูวิวแล้วใจดีขึ้นแน่นอน", "Facebook ทำให้ซึมเศร้า" เป็นข้อเท็จจริง (ผลเล็กหรือยังถกเถียง)
- "7-38-55 rule", "อารมณ์อยู่ได้ 90 วินาที" และตัวเลขป๊อปอื่นที่ไม่มีใน sources — ห้ามใช้ (ไม่ได้ตรวจใน session นี้ ถือว่าไม่ผ่าน)
- เขียนความสงบแบบไทย/ความเกรงใจเป็น "เก็บกด/เสแสร้ง" อัตโนมัติ
- แปลคำอารมณ์ไทย ↔ อังกฤษแบบคำต่อคำ (น้อยใจ ≠ sad)
- ปะปนป้าย `performance.*`/`stance.*` ว่าเป็นอารมณ์ภายใน — มันคือวิธีพูด/ท่าที
- เขียนข้อเสนอแนะเชิงช่าง (craft, tier D) ว่าเป็นข้อเท็จจริงทางวิทยาศาสตร์

---

## 6. Gap analysis of the two existing libraries

### 6.1 วิธีทำ
- `_build/gap_analysis.py` โหลด id + `name_en` ของทั้งสองคลัง (รวม 114 id ไม่ซ้ำ: 108 ร่วม + 6 เฉพาะภาพ ; ไม่มี id เฉพาะเสียง) แตกเป็น token แล้วจับคู่กับ "รายการอ้างอิง" 56 แนวคิดจากงานวิจัยใน session นี้ (27 หมวดของ CowenKeltner2017, self-conscious/moral, appraisal themes, mixed, แนวคิดไทย) ด้วยรายการคำพ้อง
- การจับคู่เป็นระดับ token จึงมี "partial hit" ที่ต้องตรวจด้วยคน (เช่น threat-based awe ↔ `performance.eerie_calm` เป็นการชนคำที่ไม่ตรงจริง ; empathic pain ↔ `care.empathy` ตรงเพียงบางส่วน)

### 6.2 ผลลัพธ์: ครอบคลุม 34/56, ขาด 22

**ขาดจากทั้งสองคลัง**

| กลุ่ม | แนวคิดที่ขาด | ที่มา | สำคัญต่อสตูดิโอ |
|---|---|---|---|
| Cowen-Keltner 27 | adoration, aesthetic appreciation, awkwardness, craving, entrancement, horror, sexual desire | CowenKeltner2017 | aesthetic appreciation, awkwardness, adoration = สูง (ภาพสินค้า, เรื่องตลกอบอุ่น) ; horror = กลาง (ซีรีส์ zombie) ; craving = กลาง (อาหารในเรื่อง) ; sexual desire = ไม่ใช้ |
| Self-conscious | authentic pride, hubristic pride, humiliation | TracyRobins2004 | สูง — `joy.pride` ปัจจุบันไม่บอกว่าแบบไหน |
| Moral/social | elevation, benign envy, malicious envy, hate | TangneyStuewigMashek2007, vandeVen2009 | สูง — `social.envy` ไม่แยกสองแบบ ; elevation เหมาะกับเรื่องคนใจดี |
| Mixed | ambivalence ทั่วไป, being moved (kama muta — ยังไม่ได้วิจัยใน session นี้) | BerriosTotterdellKellett2015 | กลาง |
| ไทย | sanuk, jai yen, nam jai, sia na (เสียหน้า), bun khun, mai pen rai | Komin1990, Scroope2025, ThaiES16_2026 (nam jai, bun khun ยังไม่พบแหล่ง) | สูง — เป็นภาษาอารมณ์ของคนดูหลัก |

**ครอบคลุมแต่ควรระบุให้ชัด (partial)**
- `joy.pride` → แยก `selfconscious.pride_authentic` / `selfconscious.pride_hubristic` (pride เป็น self-conscious ไม่ใช่ joy)
- `social.envy` → แยก benign/malicious
- `care.empathy` → ไม่ครอบคลุม empathic pain เต็ม ๆ
- `anger.indignation` → ใกล้ moral outrage แต่ไม่เท่ากัน
- `fear.dread` → threat-awe ไม่มีจริง (ควรเพิ่ม `awe.threat`)
- `calm.serenity` → ใกล้ jai yen แต่ jai yen เป็นนิสัย/วิธีจัดการอารมณ์ที่ได้รับคุณค่า ไม่ใช่แค่สภาวะสงบ

ตารางเต็มทุกแนวคิดรันได้ด้วย `python _build/gap_analysis.py --md`

### 6.3 ข้อเสนอ: Unified emotion id scheme

ทั้งสองคลังใช้ id ชุดเดียวกันอยู่แล้ว (108 ตัว) จึง **คง id เดิมเป็น unified_id** เพื่อไม่ให้โค้ดเดิมพัง และเพิ่มกติกา:

1. **รูปแบบ**: `<family>.<state>` ตัวเล็ก ขีดล่าง (เหมือนเดิม) ; family ใช้ชุดเดิม (joy, sadness, anger, fear, disgust, surprise, cognitive, awe, low, calm, love, social, relief, hope, will, selfconscious, regret, nostalgia, vulnerable, care, stance, suppressed, hidden, mixed, transition, conflict, performance)
2. **ฟิลด์ `kind`** (ใหม่ ใน crosswalk) บอกว่ารายการนั้น "เป็นอะไร" ในเชิงทฤษฎี:
   `state` (อารมณ์), `self_conscious`, `social`, `epistemic` (interest/confusion), `motivational` (determination, courage), `low_arousal`, `blend` (mixed/conflict/nostalgia), `transition`, `regulated` (suppressed/hidden), `stance` (ท่าทีการพูด), `register` (performance), `atmosphere` (บรรยากาศฉาก)
3. **namespace ใหม่ `mood.`** สำหรับบรรยากาศฉากที่ไม่ใช่อารมณ์ตัวละคร: `visual.mystery → mood.mystery`, `visual.warmth → mood.warmth`, `visual.majesty → mood.majesty`, `visual.peaceful_solitude → mood.peaceful_solitude`, `visual.coziness → mood.coziness` (เหตุผล: Russell2003 — affective quality ของสิ่งเร้า ≠ อารมณ์ของคน) ; `will.courage` คงเดิม และควรเพิ่มฝั่งเสียง
4. **ตัวแปรย่อยด้วย suffix** แทนการสร้าง family ใหม่: `social.envy_benign`, `social.envy_malicious`, `selfconscious.pride_authentic`, `selfconscious.pride_hubristic`, `awe.threat`, `awe.beauty`
5. **namespace วัฒนธรรม `th.`** สำหรับแนวคิดไทยที่ไม่ใช่การแปล: `th.krengjai` (ชี้ไปที่ `social.deference_krengjai` + `social.krengjai_refusal`), `th.sanuk`, `th.jaiyen`, `th.namjai`, `th.sia_na`, `th.bunkhun`, `th.mai_pen_rai` — แต่ละตัวมี `related_ids` ไปยังอารมณ์สากล
6. **ฟิลด์แนะนำเพิ่มในทั้งสองคลัง**: `appraisal` (relevance, congruence, agency, certainty, coping), `core_relational_theme`, `typical_duration` (short/medium/long), `regulation_default`
7. ทุกคลังอ้าง crosswalk เป็น "single source of truth" สำหรับการเชื่อมกัน ; เพิ่ม id ใหม่ที่ crosswalk ก่อน แล้วค่อยเติมรายละเอียดในคลังเสียง/ภาพ

### 6.4 emotion_crosswalk.json
- 114 แถว: `exact_id` 99, `exact_id_name_variant` 9 (id เดียวกัน ชื่อเขียนต่างกันเล็กน้อย เช่น "Fear to relief" / "Fear → relief"), `uncertain` 6 (id เฉพาะภาพที่จับคู่ด้วยคนกับ voice id ที่ใกล้ที่สุด)
- ฟิลด์: `unified_id`, `voice_ids`, `visual_ids`, `kind`, `match`, `name_en`, `vad_from_voice_lib`, `theory_notes` (อ้าง key ใน sources.json)
- รายการ `uncertain`: `visual.mystery`↔`cognitive.curiosity/interest`, `visual.warmth`↔`love.affection/tenderness`, `visual.majesty`↔`awe.awe/admiration`, `visual.peaceful_solitude`↔`calm.serenity`, `visual.coziness`↔`joy.contentment/calm.serenity`, `will.courage`↔`will.determination/hidden.bravado_over_fear`
- สร้างใหม่ได้ด้วย `python _build/build_crosswalk.py`

---

## 7. Open questions / what to research next

1. งานทดลองอารมณ์ในกลุ่มตัวอย่างไทยจริง: ideal affect (LAP) ในคนไทย, การอ่านอารมณ์จากเสียง/ท่าทางของคนไทย, display rules ไทยแบบมีตัวเลข
2. แหล่งวิชาการสำหรับ nam jai, bun khun, sia na, mai pen rai (ยังไม่พบใน session นี้) และอ่าน Komin (1990/1991) ฉบับเต็ม
3. แหล่งที่ยังเข้าไม่ถึงฉบับเต็ม (ไม่มี OA copy ใน OpenAlex/repository รอบนี้): Hatfield1993, Webb2012, TsaiKnutsonFung2006, WyattPromkandorn2012, Ekman1992, Scherer2009, Roseman2013, Mehrabian1996, KeltnerHaidt2003, Piff2015, Algoe2012, Gross2015, Lin2025AweMeta, KuppensVerduyn2017, Komin1990 ; ManySmiles2022 ได้แค่ abstract
4. Being moved / kama muta, elevation, nostalgia (Sedikides) — อารมณ์ที่เหมาะกับคอนเทนต์ "Slowly Growing" มาก
5. อารมณ์ของคนดูต่อเรื่องเล่า (narrative transportation, empathy with fictional characters) — เชื่อมกับโมดูล story
6. Awe และสุขภาพ/พฤติกรรม: รอ meta-analysis ที่อ่านได้ฉบับเต็ม
7. ทดสอบจริงในร้าน: A/B โทน LAP vs HAP ในโพสต์ IG ของร้าน แล้วบันทึกใน `creative-intelligence/experiments/`
