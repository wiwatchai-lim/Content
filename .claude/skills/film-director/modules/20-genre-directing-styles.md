# FD20 — Film Genre & Directing Styles (ประเภทภาพยนตร์และแนวทางการกำกับ)

> คลัง: `../libraries/GENRE_STYLE_LIBRARY.json` (13 genre + 7 directing approach) · ต่อยอด `story-clips/_craft/STYLES.md` (looks ของเรา) และ `.claude/skills/ai-visual-artist/ART_STYLE_LIBRARY.json` (สไตล์ภาพนิ่ง)
> หลักจริยธรรม: อธิบาย **ด้วยเทคนิค** (ขนาดช็อต แสง สี จังหวะ) ไม่ใช่ "ทำให้เหมือนผู้กำกับคนนั้น" — ห้ามเลียนแบบสไตล์ของผู้กำกับที่ยังมีชีวิตคนใดคนหนึ่งโดยระบุชื่อใน prompt

## 1. นิยามและหลักการพื้นฐาน
- **Genre** = ข้อตกลงร่วมระหว่างผู้สร้างและผู้ชมว่าเรื่องแบบนี้ "ทำงานอย่างไร" — ทั้งองค์ประกอบที่เห็น และความสัมพันธ์ระหว่างองค์ประกอบ
- **Altman: semantic vs syntactic** `[Altman1984]` — นิยามแบบ semantic = รายการองค์ประกอบ (ฉาก, prop, ประเภทตัวละคร; เช่น western = ทะเลทราย ม้า เมืองเล็ก); syntactic = โครงความสัมพันธ์ (เช่น อารยธรรม vs ป่าเถื่อน); Altman เสนอว่า **ต้องใช้ทั้งสองแบบร่วมกัน** [EVIDENCE: ทฤษฎีวิชาการ]
- **Directing approach** = วิธีทางเทคนิคที่ไม่ผูกกับ genre: classical continuity, intensified continuity, long-take staging, observational, formalist tableau, expressive montage, slow cinema

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 Genre look = semantics + syntax ที่เป็นภาพ** — แสง/สี/prop คือ semantics; ส่วน **syntax ทางภาพ** คือ ใครอยู่ในเฟรมกับใคร ใครถูกถ่ายจากมุมไหน ข้อมูลอะไรถูกซ่อนจากใคร (เช่น suspense = ผู้ชมรู้มากกว่าตัวละคร — Carroll ผ่าน `[Allen2003]`) → prompt ที่ใส่แค่ semantics (เช่น "film noir lighting") ได้ "ผิว" ไม่ได้ "เรื่อง"
**2.2 ภาษาเทคนิคของแสงใน genre** — Place & Peterson (1976) บรรยาย film noir ด้วยศัพท์ Hollywood: key/fill/back, low-key (คอนทราสต์สูง) vs high-key, แสง spotted vs flooded, ทิศแสงสูง/ต่ำ, highlight/shadow modelling `[VanLeeuwenBoeriis2016]` → **ใช้ศัพท์เหล่านี้ใน prompt แทนชื่อหนัง**
**2.3 Pace ต่างตาม genre และยุค** — Cutting & Candan ศึกษาสัดส่วน shot class ข้าม genre และพบการลด ASL สม่ำเสมอข้ามทุก shot class `[CuttingCandan2015]` (ตัวเลขราย genre ยังไม่ได้อ่าน); ฐานข้อมูล Cinemetrics ใช้วัด ASL ของหนังอ้างอิงได้ `[Tsivian2009]`
**2.4 Intensified continuity คือสไตล์หลักของหนังตลาด** `[Bordwell2002]` `[Bordwell2007_Revisited]` — และเป็นรากของการตัดคลิปแนวตั้ง
**2.5 ระดับการควบคุมต่างกันตามแนวทาง** — หนังที่กำกับแน่น (Hitchcock) ทำให้สมองผู้ชม sync สูงกว่ารายการที่ถ่ายแบบไม่มีบท (*Curb*) และวิดีโอ one-shot `[Hasson2008]` → เลือกแนวทางตามเป้าหมาย: สารเดียวชัด (โฆษณา) vs ประสบการณ์เปิด (สารคดี/ศิลปะ)

## 3. เหตุผลที่ใช้
- ผู้ชมใช้ genre เป็น "สคีมา" ทำนายเรื่อง → เปิดด้วยสัญญาณ genre ที่ชัด ช่วยให้เข้าใจเร็วในฟีด
- Genre คือชุดเครื่องมือสำเร็จรูปสำหรับอารมณ์เป้าหมาย (horror→dread, romcom→tenderness)
- การผสม genre (เช่น ตลก+suspense) สร้างความแปลกใหม่ แต่ต้องรู้ว่าส่วนไหนมาจากไหน

## 4. ผลต่ออารมณ์และการรับรู้
- สัญญาณ genre ในวินาทีแรก (แสง สี ดนตรี การเคลื่อน) ตั้งความคาดหวัง → อารมณ์ beat ถัดไปถูกอ่านผ่านกรอบนั้น [CRAFT; สอดคล้องกับผลบริบทแบบ Kuleshov — FD12]
- สัญญาณขัดกัน (ภาพ horror + เพลงร่าเริง) = ironic/comic หรือ สับสน ขึ้นกับความตั้งใจ [CRAFT]

## 5. ใช้เมื่อไร
- เลือก genre/approach ก่อน shot list: กำหนด `genre.*` 1 ตัว + `approach.*` 1 ตัว ต่อชิ้นงาน
- Parody/บทล้อ (เช่น "standoff แบบ western" ระหว่างแว่นสองแบบ) — ใช้ semantics ชัดๆ แต่ syntax ตลก

## 6. ไม่ควรใช้เมื่อไร
- อย่าใช้ genre ที่ขัดกับแบรนด์ (horror/fear กับคลิปสุขภาพตาที่ต้องการ trust — ยกเว้นตั้งใจขำและเบา)
- อย่าใส่ชื่อผู้กำกับที่มีชีวิตใน prompt เพื่อลอกสไตล์ — ใช้คำอธิบายเทคนิค
- อย่าใช้ genre ที่ต้องอาศัยความรู้วัฒนธรรมตะวันตกลึกกับผู้ชมไทยทั่วไปโดยไม่ทดสอบ

## 7. ตัวอย่าง (sourced)
- Western: *The Good, the Bad and the Ugly* (1966) — ISC 45%, สายตารวมที่ตัวเอก `[Hasson2008]`; Altman ใช้ western เป็นตัวอย่าง semantic/syntactic `[Altman1984]`
- Suspense: *The Lonely Villa* (1909) `[Allen2003]`; *Alfred Hitchcock Presents: "Bang! You're Dead"* `[Hasson2008]`
- Romcom: *The Shop Around the Corner* (1940) vs *You've Got Mail* `[Bordwell2007_Revisited]`
- Sci-fi: *Blade Runner* (1982) `[Smith2012]`
- Spy/action: *Moonraker* (1979) `[Loschky2015]`
- Noir: ตามการวิเคราะห์ของ Place & Peterson `[VanLeeuwenBoeriis2016]`
- Comedy: *Curb Your Enthusiasm* (2000) — ISC ต่ำ, ถ่ายไม่มีบท `[Hasson2008]`; Méliès — trick ทำให้ขำ `[Smith2012]`

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip ไทย:** drama (`genre.drama`) + classical continuity; EP ที่มีความลับ → thriller syntax (ผู้ชมรู้ก่อน)
- **Zombie series / night-optic:** horror/thriller semantics; อย่าให้ jump scare แทนเรื่อง
- **Product/promo:** `genre.music_video_promo` หรือ parody genre 1 ชิ้นต่อแคมเปญ (noir สำหรับแว่นกันแดดตอนกลางคืน, western standoff สำหรับเปรียบเทียบเลนส์)
- **Reels:** intensified continuity; เปิดด้วยสัญญาณ genre ใน 1 วินาที
- **Explainer:** `genre.explainer` + formalist tableau เพื่อความเป็นระเบียบ
- **Cartoon (Aaron):** fantasy/family animation; iris/wipe ได้
- **Eye-break:** slow contemplative

## 9. AI image prompt examples (เทคนิค ไม่ใช่ชื่อผู้กำกับ)
1. Noir: `night office, single hard key light through venetian blinds, striped shadows across the face, low-key high contrast, spotted light from a high side angle, black and white`
2. Formalist tableau: `perfectly symmetrical frontal shot of a small shop counter, centred figure, planimetric composition, flat even light, limited pastel palette of four colours`
3. Western standoff parody: `extreme close-up of narrowed eyes behind two different pairs of sunglasses facing each other, hard noon sun, dusty warm palette, extreme wide desert background`

## 10. AI video prompt examples
1. Horror: `slow creeping push-in down a dim corridor toward a half-open door, static long take, faint flicker, low-key hard light, desaturated green-cyan`
2. Observational: `handheld camera with slight natural shake follows a staff member unlocking the shop at sunrise, available light, imperfect framing`
3. Slow cinema: `static extreme wide shot, clouds drift over a mountain lake, nothing else moves, 10 seconds`

## 11. Shot list example — คลิปเดียว 3 genre (เทสต์ genre signal)
ฉากเดิม: "ลูกค้าหาแว่นที่หายในบ้าน" 15 s
| genre | ช็อตเปิด | แสง/สี | การเคลื่อน | จังหวะ | เสียง |
|---|---|---|---|---|---|
| horror | WS ห้องมืด ประตูแง้ม | low-key เขียวฟ้า | creep push | ค้างนาน → คัทกะทันหัน | drone เงียบ |
| comedy | FS ทั้งตัว แว่นอยู่บนหัวตัวเอง | high-key สดใส | นิ่ง | hold → reaction cut | เงียบ → ding |
| noir | MCU ไฟโต๊ะดวงเดียว เงามู่ลี่ | low-key B/W | นิ่ง | ช้า | VO สืบสวน + ฝน |

## 12. ข้อผิดพลาดที่พบบ่อย
- ใช้ filter/LUT แทนการจัดแสงจริง (noir ที่ไม่มีคอนทราสต์ในแสง)
- ผสม genre โดยไม่มีหลัก → โทนสับสน
- ใส่ semantics แต่ syntax ผิด (thriller ที่ซ่อนอันตรายจากผู้ชม → กลายเป็น surprise)
- prompt ชื่อผู้กำกับ/หนัง → ภาพลอกเลียน, เสี่ยงลิขสิทธิ์/จริยธรรม

## 13. วิธีตรวจและแก้
1. **Genre signal test:** ให้คนดู 2 วินาทีแรกแบบไม่มีเสียง → ทาย genre
2. **Syntax check:** เขียนหนึ่งประโยค "ใครรู้อะไร ใครต้องการอะไรจากใคร" ตรงกับ genre ไหม
3. **Prompt audit:** ไม่มีชื่อผู้กำกับที่มีชีวิต; มีศัพท์เทคนิค ≥ 3 คำ (แสง/เลนส์/การเคลื่อน)
4. **ASL check:** วัด ASL เทียบกับหนังอ้างอิง (Cinemetrics หรือวัดเอง)

## 14. แบบฝึกหัด + test case
- **T20-A:** ฉากเดียว 3 genre (ตารางข้อ 11) → ผู้ชมทาย genre จาก 3 วินาทีแรก; จดว่าคันโยกไหนบอก genre มากสุด (แสง? เสียง? การเคลื่อน?)
- **T20-B:** classical vs intensified (ตามแนว `Bordwell2007_Revisited`) — ฉากบทสนทนาเดียวกัน
- **T20-C:** semantic-only prompt vs semantic+syntax shot list → critic ให้คะแนน "เหมือนหนัง genre นั้นจริง" 1–10
- เกณฑ์ผ่าน: ≥ 2/3 ทาย genre ถูก; prompt ผ่าน audit

## 15. แหล่งอ้างอิง
Altman1984 · VanLeeuwenBoeriis2016 · Allen2003 · Hasson2008 · Bordwell2002 · Bordwell2007_Revisited · CuttingCandan2015 · Tsivian2009 · Smith2012 · Loschky2015 · BordwellThompsonFilmArt
