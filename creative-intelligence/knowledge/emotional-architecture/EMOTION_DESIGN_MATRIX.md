# EMOTION DESIGN MATRIX — 20 อารมณ์ × 11 คันโยก

เมทริกซ์นี้บอกว่า "ถ้าอยากให้คนดูรู้สึก X ให้ปรับอะไร" ข้ามทุกสื่อ ใช้ได้ทุกลูกค้า ทุกสาขา
- รายละเอียดการเล่นเสียงละเอียด → `EMOTION_LIBRARY.json` (id ในคอลัมน์ links) · ภาพ → `EMOTION_VISUAL_LIBRARY.json`
- เมทริกซ์นี้เน้น *การออกแบบทั้งชิ้น* และบอกตรงๆ ว่าช่องไหนมีหลักฐาน ช่องไหนเป็น craft

## Legend
- **[E:key]** = EVIDENCE, key ใน `sources.json` ของโฟลเดอร์นี้ (หรือ `M02:key` = `knowledge/emotions/sources.json`, `M31:key` = `knowledge/comedy/sources.json`)
- **[E:VL]** = ทิศทาง prosody ตามคลังเสียง `EMOTION_LIBRARY.json` ซึ่งอ้าง BanseScherer1996 / JuslinLaukka2003 / Scherer2003 (key อยู่ในคลังเสียง) — หลักการ: arousal ↔ pitch level/range, rate, loudness
- **[C]** = CRAFT (ความรู้ผู้ปฏิบัติ, tier D — ไม่ใช่ข้อเท็จจริงทางวิทยาศาสตร์)
- **[D]** = DERIVED (เราอนุมานจากหลักฐาน/ทฤษฎี ยังไม่มีงานทดสอบตรง)
- ค่า V/A = valence/arousal โดยประมาณ (−/0/+) ใช้วาง arc

กฎใหญ่ที่มีหลักฐานซึ่งใช้ทุกแถว:
- **ดนตรี**: tempo = คันโยก arousal, mode = คันโยก valence [E:HusainThompsonSchellenberg2002]; แต่อารมณ์มาจากหลายพารามิเตอร์ร่วมกัน [E:GabrielssonLindstrom2010]
- **เสียง**: arousal สูง → pitch สูง/กว้าง เร็ว ดัง; ต่ำ → กลับกัน [E:VL]
- **สี**: แพทเทิร์นสี-อารมณ์คล้ายกันข้ามชาติ แต่มีความต่างเฉพาะชาติ [E:Jonauskaite2020] — *คู่สีเฉพาะในตารางเป็น C/D* เพราะยังไม่ได้อ่านตัวเลขคู่สี
- **lighting / SFX / camera / space**: ส่วนใหญ่ CRAFT (ไม่พบงานวิจัยตรงในรอบนี้ ยกเว้น camera angle ที่หลักฐานอ่อน [E:MeyersLevyPeracchio1992])

---

## 1. Joy (ความสุข) — V+ A+
links: voice `joy.happiness`, `joy.elation` · visual `joy.happiness`, `visual.warmth`
| lever | design | tag |
|---|---|---|
| voice | pitch สูงกว่าฐานเล็กน้อย, range กว้าง, เร็วเล็กน้อย, pause สั้นและน้อย | [E:VL] |
| word | กริยาเคลื่อนไหว, คำอุทานบวกสั้นๆ, ประโยคสั้น | [C] |
| colour | อิ่มตัวปานกลาง-สูง, โทนอุ่น (เหลือง/ส้ม) | [C] (universal-ish pattern [E:Jonauskaite2020], คู่เฉพาะไม่ได้ตรวจ) |
| light | high-key, สว่างทั่ว, เงานุ่ม | [C] |
| camera | eye-level, เคลื่อนลื่นตามตัวละคร | [C] |
| music | tempo เร็ว + major | [E:HusainThompsonSchellenberg2002] |
| SFX | เสียงสว่างความถี่สูง (กระดิ่ง, pop) เบาๆ | [C] |
| edit rhythm | ตัดตาม beat, ช็อตกลาง-สั้น | [C] |
| motion | เด้ง, ขึ้นด้านบน, overshoot เล็ก | [C] |
| space | เปิด โล่ง ตัวละครกลางเฟรม | [C] |
| silence | น้อย — เงียบเฉพาะ beat ก่อน reveal | [D] |

## 2. Sadness (ความเศร้า) — V− A−
links: voice `sadness.sadness`, `sadness.melancholy` · visual `sadness.sadness`
| lever | design | tag |
|---|---|---|
| voice | pitch ต่ำกว่าฐาน, range แคบ, ช้า สระยาว, pause มากและยาวก่อนคำยาก | [E:VL] |
| word | คำน้อย, ประโยคไม่จบ, อดีตกาล/สิ่งที่หายไป | [C] |
| colour | desaturated, ฟ้าเทา | [C] |
| light | low-key นุ่ม, แหล่งแสงเดียว, ฝน/ครึ้ม | [C] |
| camera | นิ่งหรือ dolly ช้า, ระยะไกลให้ตัวละครเล็ก | [C] |
| music | tempo ช้า + minor | [E:HusainThompsonSchellenberg2002] |
| SFX | ambience เบา (ฝน, นาฬิกา), ลดเสียงอื่น | [C] |
| edit rhythm | ช็อตยาว, dissolve | [C] (setup ช้าลงในหนัง [E:Cutting2016] คนละบริบท) |
| motion | ช้า ลงด้านล่าง ไหล่ตก | [C] |
| space | negative space มาก, ตัวละครชิดขอบ | [C] |
| silence | มาก — เงียบหลังประโยคสำคัญ | [C] |
หมายเหตุเวลา: เศร้าค้างได้หลาย beat (sadness อยู่นานสุด — M02:VerduynLavrijsen2015); ปลายทางที่ดีคือ appreciation/ความหมาย [E:OliverBartsch2010]

## 3. Fear (ความกลัว) — V− A+
links: voice `fear.fear`, `fear.panic` · visual `fear.fear`
| lever | design | tag |
|---|---|---|
| voice | pitch สูง, เร็วไม่สม่ำเสมอ, หยุดค้างกลางประโยค (freeze) แล้วรีบ | [E:VL] |
| word | คำถามสั้น, ประโยคขาด | [C] |
| colour | เย็น, contrast สูง, เงาดำลึก | [C] |
| light | low-key แข็ง, แหล่งแสงไม่เห็น, ด้านหลังมืด | [C] |
| camera | มือถือสั่น, มุมจำกัดการมองเห็น, POV | [C] |
| music | drone ต่ำ, dissonance, ไม่มี resolution | [E:LehneKoelsch2015 dissonance→tension]; [C] รายละเอียด |
| SFX | เสียงดังกะทันหัน = brain-stem reflex (ใช้น้อย) | [E:JuslinVastfjall2008] |
| edit rhythm | ช็อตยาวค้างก่อนเหตุ แล้วตัดเร็ว | [C] |
| motion | หยุดนิ่ง → กระตุก | [C] |
| space | ขอบเฟรมว่าง (สิ่งที่มองไม่เห็น), พื้นที่ปิด | [C] |
| silence | เงียบก่อนเหตุ = tension | [D จาก LehneKoelsch2015] |
งานแบรนด์: กลัวต้องคลี่เร็ว (M02) — อย่าค้างความกลัวในเรื่องสุขภาพ

## 4. Anger (ความโกรธ) — V− A+ (hot) / A0 (cold)
links: voice `anger.hot`, `anger.cold`, `anger.frustration` · visual เดียวกัน
| lever | design | tag |
|---|---|---|
| voice | hot: ดัง เร็ว pitch สูงกว้าง · cold: ช้า ชัดทุกคำ pitch ต่ำ range แคบ pause จงใจ | [E:VL] |
| word | ประโยคคำสั่ง, คำซ้ำ, ตัดคำลงท้ายสุภาพ | [C] (Thai particles → voice library thai_note) |
| colour | แดง/ส้มเข้ม, contrast สูง | [C] |
| light | แข็ง, ข้าง (side light), เงาคม | [C] |
| camera | ใกล้, มุมต่ำเล็กน้อย, ผลักเข้า | [C] (low angle = อำนาจ หลักฐานอ่อน [E:MeyersLevyPeracchio1992]) |
| music | percussive, ดัง, เร็ว | [C] + tempo→arousal [E:HusainThompsonSchellenberg2002] |
| SFX | กระแทก, ของหล่น | [C] |
| edit rhythm | ตัดแข็ง (hard cut), เร็ว | [C] |
| motion | เส้นตรง แรง หยุดกะทันหัน | [C] |
| space | แน่น อึดอัด | [C] |
| silence | cold anger: เงียบก่อนประโยคหนัก | [E:VL] |
งานแบรนด์: แทบไม่ใช้กับผู้ชม; ใช้กับ "ปัญหา" ไม่ใช่ "คน"

## 5. Surprise (ความประหลาดใจ) — V±  A+ (สั้นมาก)
links: voice `surprise.pleasant`, `surprise.shock`, `surprise.neutral` · visual เดียวกัน
| lever | design | tag |
|---|---|---|
| voice | หยุด 300–700 ms, หายใจเข้า, pitch กระโดดขึ้น range กว้าง | [E:VL] + EMOTION_TRANSITIONS |
| word | คำเดียว/อุทาน; reveal อยู่คำท้าย | [C] |
| colour | เปลี่ยนสีกะทันหันระหว่างช็อต | [D] |
| light | flash/เปิดไฟ, เปลี่ยนระดับแสง | [C] |
| camera | snap zoom / whip | [C] |
| music | หยุด (stop) แล้ว hit; deceptive cadence | [E:Huron2006 surprise chapter; LehneKoelsch2015] |
| SFX | hit สั้น หรือ silence drop | [C] |
| edit rhythm | หักจังหวะที่ตั้งไว้ | [D จาก M31:MaEtAl2026 + Huron2006] |
| motion | หยุด → ถอย | [C] |
| space | สิ่งใหม่เข้าเฟรมจากขอบ | [C] |
| silence | 0.3–0.7 s ก่อน reveal | [E:VL] |
เวลา: surprise เกิด *หลัง* เหตุการณ์ tension เกิด *ก่อน* [E:LehneKoelsch2015] — ต้องมี expectation ก่อน surprise ถึงจะทำงาน

## 6. Curiosity (ความอยากรู้) — V+ A+ (ปานกลาง)
links: voice `cognitive.curiosity`, `cognitive.interest` · visual `cognitive.curiosity`, `visual.mystery`
| lever | design | tag |
|---|---|---|
| voice | pitch ขึ้นปลายคำถาม, rate กลาง, pause หลังคำถาม | [E:VL] |
| word | คำถามเจาะจงที่ตอบได้ในชิ้นนี้; "ทำไม…", ตัวเลขแปลก | [E:Loewenstein1994 info gap] |
| colour | ส่วนใหญ่ neutral + จุดสีเดียวบนสิ่งที่ซ่อน | [C] |
| light | spot/ส่องบางส่วน ซ่อนบางส่วน | [C] |
| camera | เผยทีละส่วน (partial reveal), rack focus | [C] |
| music | motif ไม่จบ, pizzicato เบา | [C] |
| SFX | เสียงที่ไม่รู้ที่มา | [D] |
| edit rhythm | ตัดก่อนเฉลย (hold the answer) | [D จาก Loewenstein1994] |
| motion | ตัวละครเอียงตัวเข้าหา | [C] |
| space | ประตู กรอบ สิ่งบัง | [C] |
| silence | เงียบสั้นหลังคำถาม | [C] |
กฎ: gap ต้องรู้สึกว่า "ใกล้จะรู้" — ปิด gap ในชิ้นเดียวกัน ไม่งั้นกลายเป็น frustration [D]

## 7. Excitement (ความตื่นเต้น) — V+ A++
links: voice `hope.excitement`, `joy.elation` · visual `hope.excitement`
| lever | design | tag |
|---|---|---|
| voice | pitch สูง range กว้าง เร็ว ดัง, pause น้อย | [E:VL] |
| word | ตัวเลข, กริยาแรง, ประโยคสั้นมาก | [C] |
| colour | อิ่มตัวสูง, contrast สูง | [C] |
| light | สว่าง, rim light, flare | [C] |
| camera | เคลื่อนเร็ว, orbit, push-in | [C] |
| music | tempo เร็ว, build → drop | [E:HusainThompsonSchellenberg2002; Salimpoor2011 anticipation] |
| SFX | whoosh, riser | [C] |
| edit rhythm | ตัดเร็วตาม beat, เร่งขึ้นเรื่อยๆ | [C] (pace trend [E:CuttingDeLongNothelfer2010]) |
| motion | เร่ง, scale ขึ้น | [C] |
| space | ไดนามิก, เส้นทแยง | [C] |
| silence | 1 beat ก่อน drop | [D จาก Salimpoor2011] |

## 8. Calm (ความสงบ) — V+ A−
links: voice `calm.serenity`, `joy.contentment` · visual `calm.serenity`, `visual.peaceful_solitude`
| lever | design | tag |
|---|---|---|
| voice | pitch ต่ำ-กลาง range แคบ ช้า pause ผ่อนคลาย ลมหายใจได้ยิน | [E:VL] |
| word | ประโยคยาวไหล, คำธรรมชาติ, ปัจจุบันกาล | [C] |
| colour | low saturation, ฟ้า/เขียวนุ่ม/ครีม | [C] |
| light | แสงธรรมชาติกระจาย, golden hour | [C] |
| camera | นิ่งหรือ drift ช้ามาก | [C] |
| music | tempo ช้า + major/modal, ไดนามิกแคบ | [E:HusainThompsonSchellenberg2002] |
| SFX | ambience ธรรมชาติต่อเนื่อง | [C] |
| edit rhythm | ช็อตยาว, cross-dissolve | [C] |
| motion | ช้า สม่ำเสมอ วนซ้ำ (loop) | [C] |
| space | กว้าง โล่ง แนวนอน | [C] |
| silence | มาก แต่มี room tone (ไม่เงียบสนิท) | [C] |
mood management: คนเครียดเลือกสื่อสงบ [E:Zillmann1988] — เหมาะกับโพสต์ช่วงดึก

## 9. Empathy (ความเห็นอกเห็นใจ) — V0/− A−
links: voice `care.empathy`, `care.compassion_consoling` · visual `care.empathy`
| lever | design | tag |
|---|---|---|
| voice | นุ่ม ช้า pitch ต่ำลงเล็กน้อย breathy | [E:VL] |
| word | สะท้อนความรู้สึก ("เหนื่อยใช่ไหม"), "เรา" แทน "คุณ" | [C] |
| colour | อุ่นจาง | [C] |
| light | นุ่ม ด้านหน้า | [C] |
| camera | ระยะใกล้ระดับตา, ช็อตสองคน | [C] |
| music | เครื่องเดี่ยว, ช้า | [C] |
| SFX | น้อยมาก | [C] |
| edit rhythm | ค้างที่ปฏิกิริยาของผู้ฟัง (reaction shot) | [C] |
| motion | ตัวละครเข้าใกล้กัน, ท่าทางสะท้อนกัน (mirroring) | [D จาก HatfieldCacioppoRapson1993] |
| space | ใกล้ ลดระยะห่าง | [C] |
| silence | ปล่อยเงียบหลังคำเปิดใจ | [C] |
กลไก: ตัวละครที่แสดงอารมณ์ = เส้นทาง contagion สู่คนดู [E:HatfieldCacioppoRapson1993; M02:ManySmiles2022 ผลเล็ก]

## 10. Trust (ความไว้วางใจ) — V+ A− (ไม่มี id ตรงในคลัง)
links: voice `performance.trusted_expert`, `care.reassurance`, `will.confidence` · visual `will.confidence`
| lever | design | tag |
|---|---|---|
| voice | pitch กลาง-ต่ำ คงที่, rate สม่ำเสมอ, ท้ายประโยคลงแน่น | [E:VL] |
| word | เจาะจง ตัวเลขจริง แหล่งที่มา ไม่โอ้อวด; ไม่ใช้มุกพาข้อมูล | [E:M31:Eisend2009 humour ↓ credibility] |
| colour | จำกัดสี, น้ำเงิน/กลาง, สม่ำเสมอข้ามชิ้น | [C] |
| light | สว่างเท่ากัน ไม่มีเงาลึก (เห็นชัด = ไม่ซ่อน) | [C] |
| camera | eye-level, นิ่ง, ช็อตสาธิตชัด | [C] |
| music | เบา ไม่ดราม่า หรือไม่มี | [C] |
| SFX | เสียงจริงของการใช้งาน (foley) | [C] |
| edit rhythm | ช้าพอให้อ่านทัน (M04 system-paced) | [D] |
| motion | น้อย นิ่ง | [C] |
| space | เป็นระเบียบ grid | [C] |
| silence | pause หลังข้อเท็จจริงสำคัญ | [C] |
trust สร้างจากความสม่ำเสมอข้ามเวลา — ระดับซีรีส์มากกว่าชิ้นเดียว [D]

## 11. Nostalgia (ความคิดถึงอดีต) — V± (บวกมากกว่า) A−
links: voice `nostalgia.nostalgia`, `nostalgia.longing` · visual `nostalgia.nostalgia`
| lever | design | tag |
|---|---|---|
| voice | ช้า อุ่น ยิ้มเศร้า, pause ก่อนรายละเอียดความจำ | [E:VL] |
| word | รายละเอียดประสาทสัมผัสเจาะจง (กลิ่น ของเล่น เพลง), "ตอนนั้น" | [C] |
| colour | ซีด อุ่น (film/sepia), grain | [C] |
| light | golden hour, หน้าต่าง | [C] |
| camera | ช้า, ระยะกลาง, เฟรมแบบรูปถ่ายเก่า | [C] |
| music | เพลงที่กลุ่มเป้าหมายรู้จัก (episodic memory) | [E:JuslinVastfjall2008] |
| SFX | เสียงยุคเก่า (เทป, พัดลม) | [C] |
| edit rhythm | dissolve, ช็อตยาว | [C] |
| motion | ช้า ลอย | [C] |
| space | บ้าน ห้องที่คุ้น | [C] |
| silence | ปานกลาง | [C] |
จบ beat ด้วยความเชื่อมโยงหรือก้าวต่อ ไม่ใช่การสูญเสีย [E:SedikidesEtAl2008]

## 12. Hope (ความหวัง) — V+ A0→+
links: voice `hope.hope`, `care.encouragement` · visual `hope.hope`
| lever | design | tag |
|---|---|---|
| voice | เริ่มนุ่มแล้ว pitch ขึ้นทีละน้อย, rate เร่งเล็กน้อย | [E:VL] |
| word | อนาคตกาล, "ยัง…", "เดี๋ยวก็…" | [C] |
| colour | จากหม่นไปสว่าง (ไล่สี) | [D] |
| light | แสงเข้ามาจากนอกเฟรม, รุ่งเช้า | [C] |
| camera | tilt ขึ้น, crane ขึ้น | [C] |
| music | จาก minor ไป major, build ช้า | [E:HusainThompsonSchellenberg2002 mode→valence] + [C] |
| SFX | นก, ลม | [C] |
| edit rhythm | ค่อยๆ เร่ง | [C] |
| motion | ขึ้น ไปข้างหน้า | [C] |
| space | ขอบฟ้า ทางเปิด | [C] |
| silence | เงียบก่อนแสงแรก | [C] |
hope = tension ที่ผลลัพธ์ที่คาดเป็นบวก [E:LehneKoelsch2015 hope/fear]

## 13. Inspiration / Elevation (แรงบันดาลใจ) — V+ A+ (ไม่มี id ตรง)
links: voice `will.determination`, `awe.admiration` · visual `will.courage`, `awe.admiration`
| lever | design | tag |
|---|---|---|
| voice | มั่นคง ไต่ระดับ, emphasis บนคำกริยา | [E:VL] |
| word | การกระทำที่มีคุณธรรมของคนธรรมดา, ข้อเท็จจริงสั้น | [D จาก OliverBartsch2010 virtue/meaning] |
| colour | อุ่น สว่างขึ้นตามเรื่อง | [C] |
| light | backlight/rim, แสงตามตัวละคร | [C] |
| camera | low angle เล็กน้อยตอนพีค, push-in | [C] ([E:MeyersLevyPeracchio1992] อ่อน) |
| music | build ยาว, เพิ่มชั้นเครื่อง | [C] + anticipation [E:Salimpoor2011] |
| SFX | น้อย ให้ดนตรีนำ | [C] |
| edit rhythm | montage เร่ง → ช็อตยาวที่พีค | [C] |
| motion | ขึ้น ไปข้างหน้า | [C] |
| space | เปิดออกตอนพีค | [C] |
| silence | hold หลังพีคก่อนข้อความสุดท้าย | [C] |

## 14. Anticipation (การรอคอย) — V+ A↑
links: (ไม่มี id ตรง) ใกล้สุด voice `hope.excitement`, `cognitive.interest`
| lever | design | tag |
|---|---|---|
| voice | ช้าลงก่อนจุดสำคัญ, pitch ค้าง (ไม่ลงท้าย) | [E:VL] + [C] |
| word | countdown, "อีกนิดเดียว", สัญญาว่าจะได้เห็น | [C] |
| colour | คงที่ แล้วเปลี่ยนตอน reveal | [D] |
| light | ค่อยๆ สว่าง | [C] |
| camera | push-in ช้าเข้าหาสิ่งที่ปิดอยู่ | [C] |
| music | riser, build, ขึ้นคีย์ | [E:Salimpoor2011 anticipation reward; Huron2006] |
| SFX | tick, heartbeat | [C] |
| edit rhythm | ช็อตยาวขึ้นหรือ cutting เร่งเข้าหา | [C] |
| motion | ช้าลงก่อนถึง (ease-in) | [C] |
| space | เป้าหมายอยู่กลางเฟรม ถูกบัง | [C] |
| silence | หยุดสั้นก่อน payoff | [D] |
build-up ไม่ใช่เวลาตาย: การรอเองเป็นรางวัล [E:Salimpoor2011]

## 15. Relief (ความโล่งใจ) — V+ A↓
links: voice `relief.relief`, `transition.fear_to_relief` · visual `relief.relief`
| lever | design | tag |
|---|---|---|
| voice | หายใจออกยาว, pitch ลง, ช้าลง, tense→breathy; หัวเราะเล็กได้ | [E:VL] + EMOTION_TRANSITIONS |
| word | "ไม่เป็นไรแล้ว", ประโยคสั้นอุ่น | [C] |
| colour | จากเย็น/contrast สูง → อุ่นนุ่ม | [D] |
| light | แสงกลับมา, เปิดม่าน | [C] |
| camera | ถอยออก (pull back), นิ่ง | [C] |
| music | resolution (cadence), ลดชั้นเครื่อง | [E:LehneKoelsch2015 resolution] |
| SFX | เสียงชีวิตปกติกลับมา | [C] |
| edit rhythm | ช็อตยาวขึ้นทันที | [C] |
| motion | ไหล่ลด, ทรุดนั่ง | [C] |
| space | เปิดออก | [C] |
| silence | เงียบสั้นหลังความตึงจบ | [C] |
relief แรงตามความตึงก่อนหน้า; arousal ที่ค้างอาจขยาย relief [E:CantorZillmannBryant1975 — หลักฐานผสม]

## 16. Confusion (ความงง) — V− A0
links: voice `cognitive.confusion`, `cognitive.hesitation` · visual `cognitive.confusion`
| lever | design | tag |
|---|---|---|
| voice | คำถามซ้อน, หยุดกลางคำ, pitch ขึ้นลงไม่แน่นอน | [E:VL] |
| word | ศัพท์ที่ไม่คุ้นของ *ตัวละคร* (ไม่ใช่ของคนดู) | [D] |
| colour | หลายสีชนกัน (ฉากปัญหา) | [C] |
| light | ไม่มีทิศชัด | [C] |
| camera | ช็อตเอียง (dutch) เบาๆ, POV มองไปมา | [C] |
| music | jazz/off-beat เบา หรือ motif ไม่จบ | [C] |
| SFX | "?" เสียงการ์ตูนได้ในงานเบา | [C] |
| edit rhythm | jump cut, ตัดกลับไปมา | [C] |
| motion | หันซ้ายขวา หมุน | [C] |
| space | รก มากเกิน | [C] |
| silence | เงียบอึดอัดสั้น | [C] |
ห้ามให้ *คนดู* งงจริงนาน — ให้ตัวละครงงแทน (cognitive load M04) [D]

## 17. Tension (ความตึงเครียด) — V− A+
links: voice `fear.anxiety`, `fear.dread`, `will.urgency` · visual `fear.anxiety`
| lever | design | tag |
|---|---|---|
| voice | เร็วเล็กน้อย หยุด-เริ่มใหม่, เสียงแน่น (tense) | [E:VL] |
| word | เดิมพันชัด ("ถ้าไม่ทัน…"), เส้นตาย | [E:LehneKoelsch2015 emotional significance] |
| colour | contrast สูง สีจำกัด | [C] |
| light | low-key, แหล่งแสงกะพริบ | [C] |
| camera | ใกล้ขึ้นเรื่อยๆ, dramatic irony (คนดูเห็นสิ่งที่ตัวละครไม่เห็น) | [E:LehneKoelsch2015 dramatic irony] |
| music | ostinato, dissonance ค้าง, ไม่ resolve | [E:LehneKoelsch2015; Huron2006] |
| SFX | tick, ลมหายใจ | [C] |
| edit rhythm | cross-cut สองพื้นที่ที่จะมาบรรจบ | [C] ([M31:Crafton_PieChase] gag ของ Keaton ใช้หลักเดียวกัน) |
| motion | ช้า ระวัง | [C] |
| space | ปิด แคบ ไม่มีทางออกในเฟรม | [C] |
| silence | เงียบ = tension สูงสุด | [C] |
ต้องให้คนดู *ชอบ* ตัวละครก่อน [E:ComiskyBryant1982 unverified]; ความตึงแรงขึ้นเมื่อควบคุมไม่ได้ [E:LehneKoelsch2015]

## 18. Humor / Amusement (ความขำ) — V+ A+
links: voice `joy.amusement`, `stance.playful_teasing`, `joy.mischief` · visual `joy.amusement`, `joy.mischief`
| lever | design | tag |
|---|---|---|
| voice | smile voice ตั้งแต่ต้น; punchline ต่ำลง-ช้าลงเล็กน้อย; ไม่ pause ยาวตามสูตร | [E:M31:PickeringEtAl2009; M31:AttardoEtAl2011_2013 unverified] |
| word | ตั้ง expectation → หักที่คำท้าย | [E:M31:Suls1972] |
| colour | สดใส, สีตัดกันเล่น | [C] |
| light | high-key | [C] |
| camera | ช็อตกว้างให้เห็น physical gag ทั้งตัว; reaction close-up | [C] |
| music | pizzicato, staccato, หยุดตรงมุก | [C] |
| SFX | cartoon SFX (boing) — ใช้น้อย | [C] |
| edit rhythm | ตั้ง rhythm แล้วหักหนึ่งครั้งตรงมุก (dual violation) | [E:M31:MaEtAl2026 unverified] + [D] |
| motion | squash & stretch, hold ก่อนผล | [C] |
| space | ว่างพอให้ gag อ่านออก | [C] |
| silence | เงียบหลังมุกให้คนดูขำทัน (ในคลิปที่ไม่มีเสียงหัวเราะ) | [C] |
ดูทั้งหมดใน `../comedy/COMEDY_PLAYBOOK.md`

## 19. Satisfaction (ความพึงพอใจ / ครบถ้วน) — V+ A0
links: voice `joy.contentment`, `will.triumph` · visual `joy.contentment`, `visual.coziness`
| lever | design | tag |
|---|---|---|
| voice | ท้ายประโยคลงแน่น, ช้าลง, pause "ปิด" | [E:VL] |
| word | ปิด loop ที่เปิดไว้ (callback), ผลลัพธ์จับต้องได้ | [D จาก Loewenstein1994 gap closed] |
| colour | สมดุล อุ่น | [C] |
| light | สม่ำเสมอ นุ่ม | [C] |
| camera | ช็อตสมมาตร, ภาพก่อน-หลัง, หยุดนิ่ง | [C] |
| music | cadence สมบูรณ์ (resolution) | [E:LehneKoelsch2015; Huron2006] |
| SFX | "click/snap" ของที่เข้าที่ | [C] |
| edit rhythm | match cut, จบตรง beat | [C] |
| motion | ease-out, ของเข้าที่ | [C] |
| space | จัดระเบียบ ครบ | [C] |
| silence | 0.5–1 วิ หลังภาพสุดท้าย | [C] |
ตอนจบคือสิ่งที่คนจำ — satisfaction เป็นตอนจบที่ดีของคลิปสินค้า [E:BaumgartnerSujanPadgett1997; AlaybekEtAl2022]

## 20. Awe (ความทึ่ง/ยำเกรง) — V+ (หรือ ±) A+
links: voice `awe.awe`, `awe.childlike_wonder` · visual `awe.awe`, `visual.majesty`
| lever | design | tag |
|---|---|---|
| voice | ช้า เบา breathy, pause ยาว, คำน้อย | [E:VL] |
| word | ไม่อธิบายมาก, ขนาด/ตัวเลขที่เกินความเข้าใจ | [E:KeltnerHaidt2003 vastness/accommodation] |
| colour | ไล่โทนกว้าง, ท้องฟ้า | [C] |
| light | แสงธรรมชาติใหญ่ (god rays, ดาว) | [C] |
| camera | ช็อตกว้างมาก, คนตัวเล็กในเฟรม, crane/drone ขึ้น | [E:KeltnerHaidt2003 vastness] → การแปลเป็นกล้อง [D] |
| music | ชั้นเสียงกว้าง (pad, choir), crescendo ช้า | [C] |
| SFX | ลดลงจนเหลือ ambience | [C] |
| edit rhythm | ช็อตยาวมาก | [C] |
| motion | ช้ามาก | [C] |
| space | ใหญ่ สูง ลึก | [E:KeltnerHaidt2003] |
| silence | มาก — ให้คนดู "อึ้ง" | [C] |
awe อาจไม่สบายใจได้ [E:KeltnerHaidt2003] — ถ้าต้องการบวก ให้มีมนุษย์/ความอบอุ่นในเฟรม [D]

---

## Transitions ระหว่างแถว (ข้าม beat)
| จาก → ไป | ปลอดภัยไหม | เงื่อนไข | tag |
|---|---|---|---|
| เปลี่ยนแค่ arousal (calm→excitement) | ปลอดภัย | ขึ้นเร็วได้, ลงต้องมี settle | [E:VL via EMOTION_TRANSITIONS] |
| เปลี่ยนแค่ valence (tension→relief ที่ arousal ลด) | ปลอดภัย | ต้องมี trigger ที่เห็น | [E:LehneKoelsch2015 resolution] + M02 appraisal |
| เปลี่ยนทั้งสอง (sadness→excitement) | เสี่ยง jarring | bridge 1 beat (hope) + trigger | [D] |
| ซึ้ง → ขายของ | jarring | ใส่ satisfaction/warm beat คั่น, สินค้าอยู่ในเรื่อง | [D + Smith2003 tonal shift cue] |
| อะไรก็ได้ → humour | ได้ถ้า benign | ห้ามล้อสิ่งที่ทำให้ซึ้ง | [E:M31:McGrawWarren2010] |
