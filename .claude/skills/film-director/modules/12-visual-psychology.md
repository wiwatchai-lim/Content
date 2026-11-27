# FD12 — Visual Psychology of Film (จิตวิทยาการมองในภาพยนตร์)

> ต่อยอดจาก `creative-intelligence/knowledge/cognitive-science/README.md` (selective attention, inattentional blindness, attentional capture จากใบหน้า/การเริ่มเคลื่อนไหว, gaze cueing) และ `knowledge/continuity/README.md` (change/edit blindness, event segmentation) — **ไม่ทวน**; บทนี้เน้นสิ่งที่เฉพาะกับ **ภาพเคลื่อนไหวที่ตัดต่อ**: attentional synchrony, "tyranny of film", neurocinematics, Kuleshov พร้อมผล replication, Gestalt ในการเคลื่อนไหว
> แหล่ง: `../sources/story-edit.json`

## 1. นิยามและหลักการพื้นฐาน
- **Attentional synchrony:** ผู้ชมหลายคนมองจุดเดียวกันในเวลาเดียวกัน — เกิดชัดในวิดีโอ dynamic มากกว่าภาพนิ่ง; สายตาไปที่ **คน** และ **บริเวณที่มี flicker/motion** `[SmithMital2013]`; feature ทางเวลา (flicker, motion และ contrast ของมัน) ทำนายตำแหน่งสายตาได้ดีที่สุด `[Mital2011]`
- **Central bias:** saccade แรกหลังเริ่ม/หลังคัทมักไปกลางจอ `[SmithMital2013]` `[Smith2012]`
- **Edit blindness:** ไม่เห็นคัทแม้ตั้งใจหา `[SmithHenderson2008]`
- **Kuleshov effect:** การวางช็อตบริบทติดกับใบหน้าทำให้อ่านอารมณ์ของใบหน้าต่างไป
- **Gestalt in motion:** หลักการรวมกลุ่ม — proximity, similarity, **common fate** (สิ่งที่เคลื่อนพร้อมกันเป็นกลุ่มเดียว), good continuation, closure, symmetry และหลักใหม่ **synchrony**, common region, connectedness; Gestalt เริ่มจากงาน Wertheimer 1912 เรื่อง **phi (apparent) motion** — รากเดียวกับการเห็นภาพยนตร์เคลื่อนไหว `[Wagemans2012]`

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 Tyranny of film** [EVIDENCE] — คลิป *Moonraker* 12 s: กลุ่มที่ดูบริบท 2.5 นาทีก่อน อนุมานเหตุการณ์ได้มากกว่า (91% vs 71%) แต่ **สายตาของทั้งสองกลุ่ม sync สูงมาก** (d > 2.98 เทียบ baseline) ความต่างจากความเข้าใจเล็ก (d ≈ 0.42, p = .054); ผลของตัวหนังใหญ่กว่าผลของ mental model 1.5–6 เท่า `[Loschky2015]`
→ ความหมาย: **การตัดต่อแบบ intensified continuity คุมสายตาได้เกือบหมด แต่ไม่ได้รับประกันว่าผู้ชม "เข้าใจ"** — ความเข้าใจต้องมาจากข้อมูลเรื่อง (back-end) ไม่ใช่การพาตาอย่างเดียว

**2.2 SPECT** `[Loschky2019]` — front-end (ภายใน fixation: เลือกจุดสนใจ + ดึงข้อมูล) vs back-end (ข้าม fixation: สร้าง event model ใน working memory/episodic memory) → แยกงานออกแบบ: **ช็อต = front-end** (ตาไปไหน ได้อะไร), **ลำดับ = back-end** (ตอนนี้เกิดอะไร ต่อไปจะเกิดอะไร)

**2.3 Neurocinematics** `[Hasson2008]` [EVIDENCE, full text] — inter-subject correlation (ISC) ของ fMRI:
| คลิป | % เปลือกสมองที่ sync ข้ามผู้ชม |
|---|---|
| *Alfred Hitchcock Presents: "Bang! You're Dead"* (1961) | > 65% |
| *The Good, the Bad and the Ugly* (Leone, 1966) | 45% |
| *Curb Your Enthusiasm* (2000) | 18% (ผู้วิจัยชี้ว่ามักถ่ายโดยไม่มีบท) |
| วิดีโอ one-shot ไม่ตัดต่อ Washington Square Park | < 5% |
- ISC ของตอน Hitchcock สูงขึ้นช่วง climax; สายตาของผู้ชมหนัง Leone รวมกลุ่มที่การกระทำของตัวเอก ส่วนวิดีโอ one-shot กระจาย
- **ข้อจำกัด:** "control" ≠ คุณภาพ/ความชอบ (มีนักวิชาการวิจารณ์แนวคิด control นี้ — Poulaki 2014 ตาม OpenAlex abstract); ตัวอย่างเป็นนักศึกษา

**2.4 Kuleshov effect — หลักฐานทั้งสองฝั่ง** (confidence: **medium**, effect มีจริงแต่ขนาดปานกลาง ขึ้นกับอารมณ์)
| งาน | วิธี | ผล |
|---|---|---|
| Kuleshov (ทศวรรษ 1920) | ฟุตเทจต้นฉบับ **สูญหาย** — เป็น "film mythology" | ไม่มีข้อมูลตรวจสอบได้ `[Barratt2016]` |
| Prince & Hensley 1992 | สร้างซ้ำแบบเดิม, checklist, trial เดียวต่อเงื่อนไข | **ไม่พบผล** (ส่วนใหญ่ตอบ "no emotion"); ถูกวิจารณ์ว่า power ต่ำ `[PrinceHensley1992]` (ผ่าน Calbi2017) |
| Mobbs et al. 2006 | fMRI n = 14, ใบหน้า subtle + หนังบริบท | ผลทั้ง rating และสมอง (amygdala, STS, temporal pole, ACC) `[Mobbs2006]` |
| Barratt et al. 2016 | 36 คน, 24 sequence, 6 เงื่อนไข, eye-tracking | "some sort of Kuleshov effect does exist" — เลือกหมวดตรงบริบทบ่อยกว่า, valence/arousal ไปทางที่คาด `[Barratt2016]` |
| Calbi et al. 2017 | 28 คน, บริบท happy/fear/neutral | **fear มีผลชัด**, happy **ไม่มีผล** ต่อ valence/arousal `[Calbi2017]` |
→ ใช้จริง: บริบท "ดัน" การอ่านใบหน้าที่ **กำกวม** ได้ โดยเฉพาะบริบทคุกคาม; **อย่าคาดหวังว่าหน้าเปล่าจะกลายเป็นสุขได้เพราะช็อตถัดไปสวย**

**2.5 Gestalt ในการเคลื่อนไหว** [EVIDENCE สำหรับหลักการรับรู้; การใช้ในหนัง = CRAFT]
- Common fate/synchrony → สินค้า + มือที่เคลื่อนพร้อมกันอ่านเป็นหน่วยเดียว; ตัวอักษร kinetic ที่ขยับพร้อมกันอ่านเป็นวลีเดียว
- Figure–ground ถูกกำหนดด้วยประสบการณ์และ attention ด้วย `[Wagemans2012]` → ฉากหลังที่ขยับ (ใบไม้, คลื่น) แข่งกับ figure ได้ (motion ชนะ — `Mital2011`)

## 3. เหตุผลที่ใช้
รู้ว่า "ตาจะไปไหน" = วางข้อมูลสำคัญตรงนั้นได้, ซ่อนรอยต่อได้, ตรวจ QC แบบไม่ต้องเดา (ใช้ `analyze-image` saliency ใน CAPABILITY_MATRIX กับเฟรม key)

## 4. ผลต่ออารมณ์และการรับรู้
- Motion/ใบหน้า/แสงตัด → ดึงตา [EVIDENCE]
- ช็อตบริบทคุกคามก่อน/หลังใบหน้า → ใบหน้าดูกลัว/เศร้า/ตื่นตัวขึ้น [EVIDENCE medium]
- โครงสร้างที่กำกับแน่น → ผู้ชมตอบสนองคล้ายกัน (ดีสำหรับโฆษณาที่ต้องส่งสารเดียว) [EVIDENCE]
- Whip pan → ตาเคลื่อนแบบ optokinetic อาจเกิดความรู้สึกคล้ายเมา `[Smith2012]` [EVIDENCE-demo]

## 5. ใช้เมื่อไร
- วางราคา/ข้อความ/โลโก้: ในจุดที่ตาอยู่แล้ว **หลัง** action หลักจบ (ไม่ทับ motion — เสี่ยง inattentional blindness, ดู cognitive-science)
- ใช้ Kuleshov สำหรับ reaction ที่กำกวม + บริบทที่แรง
- ใช้ common fate ให้ elements ที่เป็นกลุ่มเดียวเคลื่อนพร้อมกัน

## 6. ไม่ควรใช้เมื่อไร
- อย่าใช้ "ผลวิจัยสมอง" อ้างความชอบ/ยอดขาย (ISC สูง ≠ ชอบ)
- อย่าอ้าง Kuleshov ว่าเป็นกฎสากลแรงเท่ากันทุกอารมณ์
- อย่าให้ background motion แรงกว่าตัว subject

## 7. ตัวอย่างจากภาพยนตร์ (sourced)
- Hitchcock *Bang! You're Dead*, Leone *The Good, the Bad and the Ugly*, *Curb Your Enthusiasm* — ISC `[Hasson2008]`
- *Moonraker* — tyranny of film `[Loschky2015]`
- *Blade Runner* — gaze heatmap 11 คนรวมที่การเริ่มเคลื่อนไหวและใบหน้า; gaze cue ผ่านนกฮูก `[Smith2012]`
- *Dancer in the Dark* — whip pan กับ OKR `[Smith2012]`

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip:** reaction ที่ "เกือบนิ่ง" + บริบทชัด แทนการให้ TTS บอกอารมณ์
- **Product:** แว่นเป็นสิ่งเดียวที่ขยับ/สะท้อนแสงในเฟรม (flicker ดึงตา) — ฉากหลังสงบ (ตรงกับกฎบ้าน)
- **Reels 9:16:** ตาเริ่มที่กลางจอ → เฟรมแรกวาง subject กลาง + มี motion ใน 0.5 s แรก `[SmithMital2013]`
- **Explainer:** ผู้นำเสนอ "มอง" ไปที่กราฟิกก่อนกราฟิกขึ้น (gaze cue)
- **Cartoon:** common fate — Mint & Tao ที่เดินพร้อมจังหวะ = ความสัมพันธ์ใกล้; เดินไม่พร้อม = ห่าง [CRAFT]
- **Documentary:** one-shot ยาวไม่ตัด → สายตากระจาย (`Hasson2008`) → ต้องจัดองค์ประกอบ/แสงให้มี subject เดียว

## 9. AI image prompt examples
1. Saliency control: `a pair of gold-rim glasses catching a bright specular highlight on a dark matte table, everything else low contrast and still, shallow depth of field`
2. Kuleshov context (คุกคาม): `dark empty parking garage at night, a single flickering light, no people` (วางหลังใบหน้ากำกวม)
3. Ambiguous face: `close-up of a woman with a neutral, slightly parted-lips expression, eyes looking just off-camera, soft flat light`

## 10. AI video prompt examples
1. `static shot, everything still except the glasses rotating slowly on a turntable, a light glint travelling across the lens`
2. `close-up, the woman's face stays still, only a slow blink and a small breath` (reaction กำกวมสำหรับ Kuleshov cut)
3. `a flock of birds turns together across the sky, all moving in the same direction` (common fate)

## 11. Shot list example — Kuleshov triptych สำหรับคลิป 9:16
| # | ช็อต | เวลา | วัตถุประสงค์ |
|---|---|---|---|
| 1 | CU หน้ากำกวม (1.5 s) | 0–1.5 | baseline |
| 2 | บริบท: ข้อความสอบตก / ลูกค้าพบภาพเบลอ (3 s) | 1.5–4.5 | ใส่ความหมาย |
| 3 | CU หน้าเดิม (1.5 s) | 4.5–6 | ผู้ชมอ่านอารมณ์ใหม่ |
(ล้อแบบทดลอง face 1.5 s – context 3 s – face 1.5 s ของ `Calbi2017`)

## 12. ข้อผิดพลาดที่พบบ่อย
- ข้อความสำคัญโผล่พร้อม action ใหญ่ → ไม่มีใครเห็น
- ฉากหลัง AI มีคน/รถขยับ แย่งตา
- เชื่อว่า "Kuleshov" แก้การแสดงแข็งได้ทุกกรณี
- อ้างผล neuro เป็นการตลาด ("พิสูจน์ด้วยสมองแล้ว")

## 13. วิธีตรวจและแก้
1. **Gaze proxy:** export เฟรมทุก 0.5 s → รัน saliency (`ai-visual-artist/tools`) ดูว่าจุดพีคตรง subject ไหม
2. **Squint + mute test:** หรี่ตา ดูแบบไม่มีเสียง — จุดที่ "เด้ง" คือที่ตาไป
3. **Motion map:** ffmpeg `tblend=all_mode=difference` ดูว่าพื้นที่ไหนขยับมากสุด
4. **Kuleshov sanity:** ให้คนดูช็อตหน้าเดี่ยวๆ ก่อน — ถ้าอ่านเป็นอารมณ์ตรงข้ามอย่างชัด บริบทจะสู้ไม่ได้ → gen หน้าใหม่ให้กำกวมหรือตรงอารมณ์

## 14. แบบฝึกหัด + test case
- **T12-A (Kuleshov ย่อส่วน):** หน้าเดียวกัน × บริบท 3 แบบ (อาหาร/งานศพ/อันตราย) → ถาม 5 คนให้ให้คะแนน valence −4..+4 และ arousal 1–9 (ตามสเกล Calbi2017) — คาดว่าบริบทอันตรายเปลี่ยนมากสุด
- **T12-B (motion wins):** ภาพสินค้าเดียวกัน 3 เวอร์ชัน: ฉากหลังนิ่ง / ฉากหลังใบไม้ไหว / สินค้ามี glint เคลื่อน → saliency + ถามว่า "จำอะไรได้"
- **T12-C (tyranny):** คลิป 15 s ดูแบบมี/ไม่มี 10 s ก่อนหน้า → ถามคำถามอนุมาน 1 ข้อ
- เกณฑ์ผ่าน: subject = จุด saliency สูงสุดในทุก key frame; ข้อความสำคัญไม่ชน action

## 15. แหล่งอ้างอิง
SmithMital2013 · Mital2011 · Smith2012 · SmithHenderson2008 · Loschky2015 · Loschky2019 · Hasson2008 · PrinceHensley1992 · Mobbs2006 · Barratt2016 · Calbi2017 · Wagemans2012 · Nakano2009 · Murch2001 — ข้ามโฟลเดอร์: `knowledge/cognitive-science/sources.json` (Simons1999, Frischen2007, Abrams2003), `knowledge/continuity/sources.json`
