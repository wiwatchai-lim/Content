# M23 — Music Theory & Music Psychology (ทฤษฎีดนตรีและจิตวิทยาดนตรี)

ผู้ใช้ใส่เพลงเองภายหลัง แต่เรายังต้อง **เลือก/brief เพลง ตัดเพลงให้เข้ากับภาพ และ mix รอบ VO** — โมดูลนี้ให้เหตุผลและหลักฐานสำหรับงานนั้น ใช้ได้กับทุกงาน (ไม่ใช่แค่แว่น)
ไฟล์ในโฟลเดอร์:
- `README.md` — ไฟล์นี้
- `MUSIC_DIRECTION.md` — **ใช้งานจริง**: ตาราง mood → tempo/mode/instrument brief + กฎการตัดต่อเพลง + กฎ licensing
- `sources.json` — 24 แหล่ง

ของที่มีอยู่แล้ว: `tools/soundtrack.py` (สร้าง beat สังเคราะห์ + SFX), skill `beat-clip` (ตัดภาพตาม beat ด้วย librosa). การ mix เพลงใต้ VO รายละเอียดเทคนิคอยู่ที่ `../audio-engineering/MIX_PLAYBOOK.md`

---

## 1. Scope & status
**ครอบคลุม**: tempo/BPM, rhythm, dynamics, instrumentation/timbre, mode กับอารมณ์ (และขีดจำกัดทางวัฒนธรรม), tension/resolution (Huron ITPRA, Lerdahl), กลไกอารมณ์จากดนตรี (BRECVEMA), งานทบทวนดนตรี-อารมณ์, ผลของเพลงพื้นหลังต่อโฆษณา/การเรียนรู้/การอ่าน, irrelevant sound effect, เพลงใต้ VO, การเลือก/ตัดเพลง, sync กับภาพ, licensing (YouTube Audio Library, CC, คลังเพลงแพลตฟอร์ม, กฎหมายลิขสิทธิ์ไทย)
**ไม่ครอบคลุม**: การแต่งเพลง/ประสานเสียงเชิงลึก, ดนตรีไทยเดิมเชิงทฤษฎี (ระบบเสียง 7 เสียงเท่า), music therapy, การเจรจาสิทธิ์กับค่ายเพลง
**สถานะหลักฐาน**: 24 แหล่ง — S 4, A 14, C 5, D 1 · access (อัปเกรด 2026-11-25): full_text 10, abstract 3, publisher_page 1, bibliographic 1, search_summary 9
- อ่านฉบับเต็ม: Kämpfe 2011 (meta-analysis), Husain 2002, YouTube Audio Library help, CC licences, พ.ร.บ.ลิขสิทธิ์ (คำแปลไม่เป็นทางการ)
- งานดนตรี-อารมณ์ส่วนใหญ่ใช้เพลงคลาสสิกตะวันตกและผู้ฟังตะวันตก (Eerola & Vuoskoski 2013) → ต้องระวังเมื่อนำมาใช้กับผู้ชมไทย/เพลงป๊อป/lo-fi

---

## 2. Core concepts

### 2.1 Tempo & arousal
- **คืออะไร**: tempo (BPM) = ความเร็วจังหวะ
- **หลักฐาน**: Husain et al. 2002 (อ่านเต็ม, n=36, Mozart 165 vs 60 bpm × major/minor) — **tempo เปลี่ยน arousal ไม่เปลี่ยน mood; mode เปลี่ยน mood ไม่เปลี่ยน arousal**; Gagnon & Peretz 2003 — ทั้ง tempo และ mode มีผลต่อการตัดสิน happy/sad โดย tempo เด่นกว่า; Kämpfe 2011 — tempo ของเพลงลากจังหวะกิจกรรมที่ทำระหว่างฟัง
- **ใช้งาน**: tempo = ปุ่ม "พลังงาน" ของคลิป; ช่วงคร่าว ๆ [D]: สงบ 60–80, เล่าเรื่องสบาย 80–100, กระฉับกระเฉง 100–124, เร้าใจ/โปร 120–140+. คลิปตัดเร็วต้อง tempo ที่รองรับจำนวน cut (ดู MUSIC_DIRECTION)
- **ข้อจำกัด**: tempo ที่ "รู้สึก" ขึ้นกับ subdivision (hi-hat 16th ทำให้ 70 bpm รู้สึกเร็ว), ไม่ใช่ BPM อย่างเดียว
- **Tier/keys**: A, S — Husain2002_TempoMode, Gagnon2003_ModeTempo, Kampfe2011_BGMmeta · **ความมั่นใจ**: high (ทิศทาง), medium (ช่วง BPM)

### 2.2 Mode & emotion (major/minor) — และขีดจำกัดทางวัฒนธรรม
- **หลักฐาน**: major ↔ happy, minor ↔ sad เป็นผลที่ซ้ำได้ในผู้ฟังที่โตมากับดนตรี tonal ตะวันตก (Husain 2002; Gabrielsson 2014). Parncutt 2014 (อ่านเต็ม) — ความสัมพันธ์นี้ robust แต่ **ยังไม่มีคำอธิบายเดียว**: เทียบ 6 ทฤษฎี (dissonance, minor เป็น "ของแปลก/ไม่ปกติ", ความกำกวมของ root/scale, degree 3 และ 6 ต่ำกว่าคาดคล้ายเสียงพูดเศร้า, salience ของ flat, การเรียนรู้ทางวัฒนธรรมที่เกิดราวศตวรรษ 14–16) — ทุกทฤษฎีมีหลักฐานทั้งหนุนและแย้ง อาจเป็นผลรวม. Fritz 2009 — ชาว Mafa (ไม่เคยฟังดนตรีตะวันตก) จำ happy/sad/scary ในเพลงตะวันตกได้เกินโอกาส แต่ผู้เขียนเตือนว่าอย่าเรียกดนตรีว่า "ภาษาสากลของอารมณ์"
- **ใช้งาน**: ผู้ชมไทยปัจจุบันฟังป๊อป/ลูกทุ่งที่เป็น tonal ตะวันตกเป็นหลัก → major/minor ใช้ได้; แต่ "minor = เศร้า" ไม่ตายตัว — minor ที่เร็ว + กลองหนัก = มุ่งมั่น/เท่ ไม่ใช่เศร้า (tempo ชนะ). ลูกทุ่ง/หมอลำมีขนบอารมณ์ของตัวเอง (ช่องว่างความรู้)
- **Tier/keys**: A — Husain2002_TempoMode, Parncutt2014_MajorMinor, Fritz2009_Mafa, Gabrielsson2014_Structure · **ความมั่นใจ**: high (ผู้ฟังตะวันตก), medium (ผู้ชมไทย)

### 2.3 Dynamics, register, timbre, instrumentation
- **หลักฐาน**: Gabrielsson 2014 — ผลชัดที่สุดมาจากตัวแปรการได้ยินพื้นฐาน (loudness, timbre, pitch) และการเคลื่อนไหว (tempo); ตัวแปร "ทางดนตรี" (harmony ฯลฯ) ชัดน้อยกว่า; ปัจจัยเดียวชี้ได้หลายอารมณ์และทำงานร่วมกัน. Juslin & Laukka 2003 (meta-analysis 145 งาน) — เสียงพูดกับดนตรีใช้ "code" อารมณ์เดียวกัน (rate, intensity, pitch, timbre)
- **ใช้งาน**: เขียน brief ด้วยภาษา **tempo / ความดัง / ช่วงเสียงสูงต่ำ / สีเสียง** ก่อนพูดถึง chord; **ให้เพลงกับ VO พูด code เดียวกัน** — VO ช้า-นุ่ม-ต่ำ + เพลงเร็ว-สว่าง = สัญญาณขัดกัน
- **Tier/keys**: A, S — Gabrielsson2014_Structure, JuslinLaukka2003 · **ความมั่นใจ**: high

### 2.4 กลไกที่ดนตรีทำให้เกิดอารมณ์ (BRECVEMA)
- **คืออะไร**: Juslin & Västfjäll 2008 → Juslin 2013: 8 กลไก — **B**rain stem reflex (เสียงดังฉับพลัน), **R**hythmic entrainment (ร่างกายตามจังหวะ), **E**valuative conditioning (เพลงที่ผูกกับประสบการณ์ซ้ำ ๆ), **C**ontagion (เลียนแบบอารมณ์ในเสียง), **V**isual imagery, **E**pisodic memory (ความทรงจำส่วนตัว), **M**usical expectancy (คาดเดา/ผิดคาด), **A**esthetic judgement
- **ใช้งาน**: brief ต้องระบุว่าใช้กลไกไหน — โปรโมชัน = entrainment + brain stem (drop); เรื่องซึ้ง Mint & Tao = contagion (เครื่องสายช้า/เปียโน) + expectancy (resolution ตอนจบ); เพลงฮิตเก่า = episodic memory (แรงมากแต่ **ติดลิขสิทธิ์** และต่างกันรายคน)
- **ข้อจำกัด**: เป็นกรอบทฤษฎี, กลไกแยกวัดยาก; commentary ใน BBS ถกเถียง
- **Tier/keys**: A — JuslinVastfjall2008, Juslin2013_BRECVEMA · **ความมั่นใจ**: medium

### 2.5 Tension & resolution (Huron ITPRA, Lerdahl)
- **Huron 2006**: ความคาดหวังสร้างอารมณ์ผ่าน 5 ระบบ — Imagination (คิดล่วงหน้า), Tension (ตึงเมื่อไม่แน่นอน ก่อนเหตุการณ์), Prediction (รางวัลเมื่อเดาถูก), Reaction (ตอบสนองเร็วแบบป้องกันตัว), Appraisal (ประเมินภายหลัง) → อธิบาย syncopation, cadence, climax, ขนลุก, เสียงหัวเราะ; นักวิจารณ์ชี้ว่าอ้างความเป็นสากลมากเกิน
- **Lerdahl & Krumhansl 2007**: Tonal Pitch Space ทำนาย tension ที่ผู้ฟังให้คะแนนได้ — tension เพิ่มเมื่อออกห่างจาก chord บ้าน + dissonance; resolution = กลับบ้าน
- **ใช้งาน**: build (riser, กลองถี่ขึ้น, harmony ค้าง) **ก่อน** reveal แล้ว resolve (กลับ tonic/drop) **ตรง** ภาพสินค้า/ข้อความหลัก; ตลก = expectation violation (หยุดเพลงกะทันหัน, tape-stop); จบคลิปบน resolution (cadence) ให้รู้สึก "ครบ" — ตัดกลางวลี = รู้สึกค้าง (ใช้ได้ถ้าตั้งใจ cliffhanger)
- **Tier/keys**: A — Huron2006_SweetAnticipation, LerdahlKrumhansl2007 · **ความมั่นใจ**: medium

### 2.6 เพลงพื้นหลังกับการรับรู้/ความจำ/โฆษณา
- **Kämpfe et al. 2011 (meta-analysis, อ่านเต็ม, 97 studies)**: ผลรวมเป็นศูนย์เพราะผลเฉพาะหักล้างกัน; เทียบกับไม่มีเพลง → **รบกวนการอ่าน** (ทั้ง 8 งานเป็นลบ, r = −.11, n = 680), ความจำลดเล็กน้อย, **อารมณ์ดีขึ้น**, กีฬาดีขึ้น; ความจำเนื้อหาโฆษณา **แทบไม่ต่าง** (r = −.05, 7 งาน)
- **โฆษณา**: Allan 2007 (review) — ผลต่อ recall ผสมกัน; Oakes (WARC) — **musical fit/congruity** กับแบรนด์/ภาพเป็นตัวแปรหลัก; บางงานพบเพลงไม่เข้ากันเพิ่ม attention/recall
- **Cohen CAM**: ผู้ชมสร้างเรื่องจากทั้งสองช่องทาง — จังหวะเพลงที่ตรงกับ accent ภาพดึงสายตา, อารมณ์เพลงย้อมความหมายฉาก
- **ใช้งาน**: เพลงช่วย "ความรู้สึก" มากกว่า "ความจำข้อมูล" → ข้อมูลสำคัญ (ราคา, วันที่, ที่อยู่) ให้ VO + ตัวหนังสือ + เพลงต่ำ/เงียบ; อารมณ์/แบรนด์ให้เพลงทำงาน
- **Tier/keys**: S, A, C — Kampfe2011_BGMmeta, Allan2007_SoundAdvertising, Oakes_MusicalCongruity, Cohen2015_CAM · **ความมั่นใจ**: medium-high

### 2.7 Irrelevant sound effect, lyrics vs VO
- **หลักฐาน**: Ellermeier & Zimmer 2014 — เสียงพื้นหลังที่มีโครงสร้าง (โดยเฉพาะคำพูด/คล้ายคำพูด) ทำให้ความจำระยะสั้นแย่ลง; (อ่านเต็ม) คำพูดที่ไม่คุ้นเพิ่มความผิดพลาด ~50%; ต้องมี **การเปลี่ยนสเปกตรัมตามเวลา** — การเปลี่ยนระดับอย่างเดียวไม่พอ → **ลดเพลงให้เบาลงไม่ได้ทำให้ผลหายไป**; โทน FM รบกวนสูงสุดที่อัตรา ~4 Hz; เพลงที่ซับซ้อนพอรบกวนได้เกือบเท่าคำพูด. งานอ่าน (Frontiers 2024, อ่านเต็ม: นศ.จีน 90 คน, ป๊อปจีน/ป๊อปอังกฤษ/เงียบ): เพลงมีเนื้อร้องทำให้เข้าใจบทอ่านแย่ลงกว่าเงียบ, แย่สุดเมื่อเนื้อร้องภาษาเดียวกับบทอ่าน (ภาษาแม่), คนที่ไม่ชินฟังเพลงตอนอ่านโดนหนักกว่า — งานนี้ **ไม่ได้** เทียบกับเพลงบรรเลง (ข้อ "เนื้อร้อง > บรรเลง" มาจาก Perham & Currie 2014 และ Salamé & Baddeley 1989 ตามที่อ้าง); Salamé & Baddeley 1989 เป็นงานคลาสสิกเรื่องเพลงกับความจำเสียง
- **ใช้งาน**: **ไม่มีเนื้อร้องใต้ VO หรือใต้ตัวหนังสือที่ต้องอ่าน** — โดยเฉพาะเนื้อร้องภาษาไทย (ภาษาเดียวกับ VO); ถ้าต้องใช้เพลงมีเนื้อร้อง ให้ใช้ช่วง instrumental/intro หรือเฉพาะช่วงไม่มี VO; bed ที่สเปกตรัมนิ่ง (pad, drone, เปียโนห่าง ๆ) รบกวนน้อยกว่ากลองถี่/arpeggio
- **ข้อจำกัด**: งาน ISE ใช้ serial recall ในแล็บ ไม่ใช่การดูวิดีโอ; งานเนื้อร้องบางงานไม่พบความต่าง (Gillis 2010 ตามที่อ้าง)
- **Tier/keys**: A — EllermeierZimmer2014_ISE, Frontiers2024_LyricsReading, SalameBaddeley1989 · **ความมั่นใจ**: medium-high

### 2.8 Music under VO (ระดับและความถี่)
- VO ดังกว่าเพลง ≥ 10 LU ขณะพูด (Torcoli 2019 — ดู M24); carve 1–4 kHz ของเพลง; เลือกเพลงที่ไม่มี lead melody ในช่วงเสียงพูด (ประมาณ 200 Hz–3 kHz [D]) หรือ melody ที่เล่นในช่องว่างของ VO
- **Tier/keys**: A, D — Torcoli2019_Ducking (M24) · **ความมั่นใจ**: medium

### 2.9 Music selection, editing, sync
- **Craft**: ตัดบน downbeat และขอบ phrase (4/8/16 บาร์); cut ภาพบน beat ไม่ต้องใช้ transition; เพลงมัก "กำหนด tempo ของการตัด" (Apple FCP beat detection ใช้ beat/bar grid, แม่นสุดกับ 4/4)
- **ทฤษฎีที่รองรับ**: Huron (prediction reward — จังหวะที่เดาได้ทำให้ cut บน beat รู้สึก "ถูก"); Cohen CAM (structural congruence ดึงความสนใจ)
- **Tier/keys**: D, A — Apple_FCP_BeatDetection, Huron2006_SweetAnticipation, Cohen2015_CAM · **ความมั่นใจ**: medium (craft)

### 2.10 Licensing basics
- **YouTube Audio Library** (อ่านเต็ม): track CC ต้องใส่เครดิตใน description; standard licence ไม่ต้อง; ปลอด Content ID **บน YouTube**; หน้า help **ไม่บอก** สิทธิ์นอก YouTube
- **Creative Commons** (อ่านเต็ม): ทุก licence ต้อง attribution; NC = ห้ามเชิงพาณิชย์ (โพสต์ร้าน = เชิงพาณิชย์); ND = ห้ามเผยแพร่งานดัดแปลง (การตัดเพลงเข้ากับภาพอาจนับเป็นดัดแปลง → หลีกเลี่ยง); CC0 = สละสิทธิ์
- **TikTok Commercial Music Library** (อ่านหน้า help เต็ม, อัปเดต ก.ค. 2025): 1 ล้านเพลง clear แล้ว ฟรีสำหรับธุรกิจ **บน TikTok** — ใช้กับ organic (รวม duet/react/stitch), video ads, branded content; ธุรกิจห้ามใช้คลังเพลงทั่วไปเชิงพาณิชย์; ใช้ original sound ของคนอื่นต้องเช็กสิทธิ์เอง
- **Meta Sound Collection**: ใช้ได้ในคอนเทนต์บนผลิตภัณฑ์ Meta เท่านั้น; หน้า help ขัดกันเรื่อง commercial → ตรวจก่อนใช้กับแอด (unverified)
- **กฎหมายไทย** (พ.ร.บ.ลิขสิทธิ์ 2537, คำแปล): อายุคุ้มครอง = ชีวิตผู้สร้าง + 50 ปี (ม.19); สิทธิ์นักแสดง 50 ปีจากการแสดง/บันทึก (ม.49); ข้อยกเว้น ม.32 ต้องไม่ขัดการแสวงประโยชน์ตามปกติและไม่กระทบสิทธิ์เกินสมควร + วัตถุประสงค์ที่ระบุ (วิจัย/ศึกษาไม่หากำไร, ใช้ส่วนตัว, วิจารณ์, ข่าว, สอน) — **โฆษณาร้านไม่อยู่ในข้อยกเว้น**; มีแก้ไขถึงฉบับที่ 5 (2565) ที่ยังไม่ได้ตรวจ; **ไม่ใช่คำแนะนำทางกฎหมาย**
- **Tier/keys**: C, S — YouTube_AudioLibrary, CC_Licenses, TikTok_CML, Meta_SoundCollection, Thailand1994_CopyrightAct · **ความมั่นใจ**: high (YouTube/CC), medium (TikTok/Meta), medium (กฎหมาย — คำแปลไม่เป็นทางการ)

---

## 3. Contested / replication notes
- **Mozart effect**: Husain 2002 ชี้ว่าเป็นผลของ arousal/mood ไม่ใช่ "Mozart" — อย่าอ้างว่าเพลงคลาสสิกทำให้ฉลาด
- **ความเป็นสากลของอารมณ์ดนตรี**: Fritz 2009 (หยาบ ๆ ข้ามวัฒนธรรมได้) vs คำเตือนของผู้เขียนเอง + Parncutt (เรียนรู้ทางวัฒนธรรม) + คำวิจารณ์ Huron ทางมานุษยวิทยา → ความมั่นใจ medium
- **เนื้อร้อง vs บรรเลง**: ส่วนใหญ่พบว่าเนื้อร้องรบกวนมากกว่า, บางงานไม่พบ; ขึ้นกับนิสัยการฟังและภาษา (Frontiers 2024)
- **เพลงในโฆษณา**: recall ผลผสม, fit สำคัญ, incongruity บางครั้งเพิ่ม attention
- **Stimulus bias**: งานส่วนใหญ่ใช้เพลงคลาสสิกตะวันตกที่คุ้นเคย (Eerola & Vuoskoski) — ผลกับ lo-fi/ป๊อปไทยยังไม่รู้

## 4. Applied patterns for our production
- **Mint & Tao (charcoal story, IG Reel พร้อมเพลง)**: เปียโน/กีตาร์โปร่ง/เครื่องสายเบา 70–90 bpm, major สำหรับ warm/hopeful, minor หรือ modal สำหรับ bittersweet; เพลงไม่มีเนื้อร้องเพราะผู้ชมต้องอ่าน bubble ภาษาไทย; จบที่ cadence ตรงสไลด์สุดท้าย
- **Story clip ไทยมี VO**: bed บรรเลง spectrum นิ่ง, duck ≥ 10 LU; build + resolve ตรงจุดหักมุม; เงียบแทนเพลงในช่วงหนักที่สุด
- **คลิปสินค้า/โปร**: 110–128 bpm, กลองชัด, major/สดใส หรือ minor-groove (เท่); cut บน beat, reveal สินค้าบน downbeat ของ phrase ใหม่ (drop); ราคาโชว์ตอนเพลงเบาลง (ให้อ่านได้)
- **คลิปหลับตา/พักสายตา**: ไม่มี beat ชัด (ambient pad ≤ 60–70 bpm หรือไม่มีจังหวะ), ไม่มีเนื้อร้อง — VO นำ
- **งานลูกค้าอื่น**: ใช้ตาราง MUSIC_DIRECTION + ถามสิทธิ์/แพลตฟอร์มทุกครั้ง

## 5. Anti-patterns
- เพลงฮิตที่มีลิขสิทธิ์ในโพสต์ร้าน ("ใส่เครดิตแล้วไม่เป็นไร" — ผิด)
- เพลงมีเนื้อร้องใต้ VO/ข้อความยาว
- "minor = เศร้า เสมอ" / "เพลงคลาสสิกทำให้ฉลาด" / "432 Hz ดีต่อสุขภาพ" — pseudo-science หรือเกินหลักฐาน
- ตัดเพลงกลาง phrase หรือนอก beat โดยไม่ตั้งใจ; fade-out แบบขี้เกียจทุกคลิป
- เพลงพลังงานสูงใต้เรื่องเศร้า (code ขัดกับ VO)
- ใช้คลัง Meta นอก FB/IG, คลัง TikTok นอก TikTok

## 6. Open questions / research next
- งานวิจัยดนตรี-อารมณ์กับผู้ฟังไทย, ลูกทุ่ง/หมอลำ/เพลงไทยเดิม (ขนบอารมณ์ของโหมดไทย)
- ผลของเพลงต่อ retention/completion rate ในคลิปสั้น (ข้อมูลแพลตฟอร์ม/การทดลองของเราเอง A/B)
- อ่านฉบับเต็ม: Huron 2006, Juslin 2013, Gabrielsson 2014, พ.ร.บ.ลิขสิทธิ์ฉบับแก้ไขล่าสุด (IP Thailand) และ terms ของ TikTok CML/Meta Sound Collection ฉบับปัจจุบัน
- การจัดเก็บค่าลิขสิทธิ์เพลงในไทย (องค์กรจัดเก็บ) — ยังไม่ได้ค้น
