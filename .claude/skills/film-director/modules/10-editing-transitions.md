# FD10 — Editing & Transitions (การตัดต่อและการเปลี่ยนช็อต)

> ต่อยอดจาก `story-clips/_craft/curriculum/11-edit-grade.md` §1.1–1.2 (Rule of Six, cut on action, J/L, match cut, pacing) และ `story-clips/_craft/FX.md` §1.5 (ตาราง transition + โค้ด `R.cut / R.dissolve / R.dip / X.wipe / X.iris / X.glitch`) — **ไม่ทวนซ้ำ** บทนี้เพิ่ม: กลไกการรับรู้ (AToCC), ข้อมูล shot length จริง, ความต่าง "transition ที่รักษา/ทำลาย continuity", และวิธีทำใน HTML/ffmpeg/HyperFrames
> คลังที่ใช้คู่กัน: `../libraries/TRANSITION_LIBRARY.json` (28 รายการ) · แหล่ง: `../sources/story-edit.json`
> ป้าย: **[EVIDENCE]** = มีงานวิจัย · **[CRAFT]** = ความรู้ผู้ปฏิบัติ (tier D) ไม่ใช่ข้อเท็จจริงทางวิทยาศาสตร์

## 1. นิยามและหลักการพื้นฐาน
- **Cut** = รอยต่อระหว่างช็อตที่ภาพเปลี่ยนทั้งจอในเฟรมเดียว; **transition** ในความหมายกว้าง = ทุกวิธีที่เชื่อมช็อต (cut, dissolve, wipe, sound bridge, J/L)
- **Continuity editing** = ระบบกฎที่ทำให้ผู้ชม "ไม่รู้สึกว่ามีการตัด": establishing → coverage, shot/reverse shot, 180°, eyeline match, match on action, matched exits/entrances `[BordwellThompsonFilmArt]` `[Smith2012]`
- **ประเภทหลัก** (ดู id ในคลัง): `cut.hard` · `cut.on_action` · `cut.match_graphic` · `audio.j_cut` / `audio.l_cut` · `cut.cutaway` · `cut.insert` · `cut.reaction` · `cut.cross` · `cut.jump` · `cut.smash` · `cut.axial` · optical (`trans.dissolve`, `trans.dip_black`, `trans.wipe`, `trans.iris`) · camera (`trans.whip`, `trans.hidden`, `trans.zoom_through`)
- **Pacing** = ความเร็วรวม (shot length เฉลี่ย, ASL); **rhythm** = รูปแบบการสลับยาว-สั้นและการลงจังหวะกับเสียง

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 Attentional Theory of Cinematic Continuity (AToCC)** `[Smith2012]` [EVIDENCE — ทฤษฎี + eye-tracking demo]
- ระหว่างช็อต ความสนใจอยู่ที่ "ชุดลักษณะเล็กๆ" (หน้า, การเคลื่อนไหว, ทิศ) ไม่ใช่ทั้งฉาก ถ้าคัทเกิดโดยไม่มีสิ่งบอกล่วงหน้า **visual transient** จะดึงความสนใจและผู้ชมรู้สึกถึงรอยต่อ
- Continuity rules ทำงานเพราะ **ใช้ cue ธรรมชาติพาความสนใจข้ามคัท**: เสียงนอกจอ, การผลัดพูด, motion onset, การมอง (gaze), การชี้, การเดินออกเฟรม, จังหวะที่คาดเดาได้
- ถ้าความคาดหวัง (ตำแหน่งบนจอ, การหัน, ทิศการกระทำ) ถูกเติมเต็ม "ภายในไม่กี่เฟรม" → **a priori continuity** (ไม่รู้สึกตัว); ถ้าไม่ → ผู้ชมเข้าโหมด **a posteriori** ต้องค้นหาหลักฐาน = ใช้แรงมากขึ้นและรู้ตัวว่าถูกตัดต่อ
- ข้อสรุปเชิงปฏิบัติ: **ไม่ต้องแมตช์ทุกอย่าง — แมตช์สิ่งที่ความสนใจอยู่ ณ จุดตัด** (สำคัญมากกับภาพ AI ที่ไม่เหมือนกันเป๊ะ)

**2.2 Edit blindness** `[SmithHenderson2008]` [EVIDENCE]: แม้สั่งให้ "หาคัท" ผู้ชมพลาดราว 1/4 ของคัทในฉากเดียวกัน และราว 1/3 เมื่อคัทตรงกับ motion onset; ส่วนน้อยเกิดจากกะพริบตา/saccade ส่วนใหญ่เกิดจาก **inattention** (รายละเอียดตัวเลขเต็มใน `creative-intelligence/knowledge/continuity/README.md` §3)

**2.3 กะพริบตากับจุดตัด** — Murch เสนอว่าคัทที่ดีตรงกับ "จังหวะกะพริบ" ของความคิด [CRAFT `Murch2001`]. งานวิจัยใกล้เคียง: ผู้ชมวิดีโอเรื่องเดียวกัน **กะพริบพร้อมกัน** ในจังหวะที่ต้องใช้ความสนใจน้อย — จบแอ็กชัน, ตัวละครหลักไม่อยู่, ช็อตกว้าง, ฉากซ้ำ — และ **ไม่ได้ผูกกับ scene break** `[Nakano2009]` [EVIDENCE] → สนับสนุนการตัด "ตอนจบ action" แต่ไม่ได้พิสูจน์สูตร Murch โดยตรง

**2.4 Shot length: ข้อมูลจริง** [EVIDENCE, correlational]
- หนังป๊อปภาษาอังกฤษ 1912–2013 (9,400 เรื่อง): ASL ลดลงแบบเชิงเส้นบนสเกล log ในยุคเสียง; ~25% ของการลดมาจากการหันไปใช้ "ชนิดช็อต" ที่สั้นกว่า, ~8% จากการใช้ shot scale ที่ใกล้ขึ้น `[CuttingCandan2015]`
- 1935–2010: ช็อตสั้นลง, motion มากขึ้น, ช็อตสั้นมี motion มากกว่า, หนังมืดลง `[Cutting2011]`; ความยาวช็อตที่อยู่ติดกันสัมพันธ์กันมากขึ้น (โครงสร้าง 1/f) ซึ่งผู้วิจัย "เสนอ" ว่าช่วยคุมความสนใจ `[Cutting2010]`
- ภายในเรื่อง: setup ช็อตยาวขึ้น-motion น้อยลง; ช่วงต้น climax ช็อตสั้นลง-motion มากขึ้น; ท้าย climax ช็อตยาวขึ้นอีกครั้ง `[Cutting2016]`
- Hollywood 1930–60 ASL ~8–11 s; ยุคหลังหลายเรื่อง 3–6 s `[Bordwell2002]` (snippet); ฉากเดียวกัน *The Shop Around the Corner* (1940) 14 ช็อต ~21 s vs *You've Got Mail* 84 ช็อต ~4.3 s `[Bordwell2007_Revisited]`
- **Intensified continuity** = ตัดเร็วขึ้น ใกล้ขึ้น แต่ "ยังใช้ตรรกะ continuity" ไม่ใช่การทิ้งมัน `[Bordwell2002]` `[Bordwell2007_Revisited]`

**2.5 Cross-cutting กับ suspense** — suspense เกิดเมื่อผลที่ดี "ไม่น่าเกิด" และผลร้าย "น่าเกิด" (Carroll ผ่าน `[Allen2003]`) ตัวอย่างคลาสสิก *The Lonely Villa* (Griffith, 1909) cross-cut ผู้ร้าย-นางเอก-พระเอกที่อยู่ไกล [EVIDENCE: ทฤษฎีวิชาการ]

**2.6 การข้ามเส้นในสมอง** — EEG: ทุกคัทกระตุ้น ERP ช่วงต้นคล้าย "การละเมิดไวยากรณ์" (เหมือนภาษา/ดนตรี) ส่วนคัทข้ามเส้น 180° ต่างจาก continuity edit ใน component ช่วงหลัง (spatial remapping) `[Heimann2016]` [EVIDENCE, abstract]

## 3. เหตุผลที่ใช้
- ตัดเพื่อ **ส่งข้อมูลใหม่**, **คุมว่าผู้ชมมองอะไร** (`[Hasson2008]`: หนังที่กำกับแน่น → สมองและสายตาผู้ชมคล้ายกันมาก; วิดีโอ one-shot ไม่ตัดต่อ → กระจาย), **คุมเวลา** (ellipsis), **สร้างอารมณ์และความหมาย** (juxtaposition, Kuleshov — ดู FD12)

## 4. ผลต่ออารมณ์และการรับรู้
| เครื่องมือ | ผลที่รับรู้ | ป้าย |
|---|---|---|
| คัทตาม cue (มอง/เสียง/motion) | ไม่รู้สึกตัว, ไหลลื่น | [EVIDENCE] `Smith2012` `SmithHenderson2008` |
| ช็อตสั้น + motion มาก | ตื่นตัว (arousal), ดึงสายตา | [EVIDENCE, correlational] `Cutting2011` `Cutting2016` |
| Whip pan | สายตากระจาย, ตาเคลื่อนแบบ OKR อาจรู้สึกเมา | [EVIDENCE-demo] `Smith2012` |
| Dissolve | เวลาผ่าน/นุ่ม/ฝัน | [CRAFT] |
| Smash cut | ตกใจ/ขำ | [CRAFT] |
| L-cut ไปหน้าผู้ฟัง | น้ำหนักกับคำพูด + empathy | [CRAFT]; close-up ใบหน้าที่แสดงอารมณ์เพิ่มการคิดถึงจิตใจตัวละคร [EVIDENCE `RooneyBalint2018`] |

## 5. ใช้เมื่อไร
- `cut.on_action` เมื่อต่อช็อต AI/2D สองช็อตที่ไม่ตรงกัน 100%
- `audio.j_cut` เปลี่ยนฉาก (เสียงฉากใหม่นำ), `audio.l_cut` ประโยคสำคัญ → ตัดไปผู้ฟัง
- `cut.cross` สร้าง suspense (เมื่อผู้ชมรู้เดิมพัน)
- `pace.accelerate` ช่วงต้น climax แล้วจบด้วยช็อตยาว 1 ช็อตเป็น release
- `trans.dissolve`/`trans.dip_black` เฉพาะเมื่อ "เวลาผ่าน" จริง

## 6. ไม่ควรใช้เมื่อไร
- Transition ตกแต่งในทุกคัทของเรื่องเล่า (dissolve กลางบทสนทนา = บอกว่าเวลากระโดด)
- **ข้อขัดแย้งกับ HyperFrames:** คู่มือ animation ของ HyperFrames บอก "every composition uses transitions" — ถูกสำหรับ motion graphics/slideshow แต่ **สำหรับ narrative scene ให้ hard cut เป็นค่าเริ่มต้น** และจดเหตุผลไว้ (`TRANSITION_LIBRARY` `cut.hard`)
- Dip to black ใน 3 วินาทีแรกของคลิปฟีด; whip pan ซ้ำๆ ในคลิปสงบ
- Match cut ที่ไม่มีความหมาย (ดึงความสนใจมาที่การตัดเปล่าๆ)

## 7. ตัวอย่างจากภาพยนตร์ (sourced)
- *Blade Runner* (1982): match-action วางหน้า Rachael ตรงตำแหน่งหน้า Deckard; shot/reverse shot กับ Bryant–Deckard ผู้ชมเลื่อนความสนใจไปตำแหน่งเดิมของผู้พูดนอกจอ ~200 ms หลังเสียงเริ่ม `[Smith2012]`
- *Dancer in the Dark* (2000): whip pan ทำให้สายตาผู้ชมกระจาย `[Smith2012]`
- *Last Year in Marienbad* (1961): การหันตัวพาสายตาข้ามคัทไปฉากใหม่ทั้งฉาก; Méliès ใช้หลักเดียวกันทำของหาย `[Smith2012]`
- *The Shop Around the Corner* vs *You've Got Mail*: ฉากเดียวกัน 14 vs 84 ช็อต `[Bordwell2007_Revisited]`
- *Moonraker* (1979) 12 วินาที cross-cut 6 ช็อต: ผู้ชมที่เห็นบริบทก่อนหน้ารับรู้ความต่อเนื่องดีกว่า แต่สายตาของทุกกลุ่ม sync กันสูงมาก `[Loschky2015]`
- *2001: A Space Odyssey* กระดูก→ยาน: อยู่ใน curriculum 11 — `[CRAFT, unverified example]` รอบนี้ไม่ได้เปิดแหล่ง

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip (ไทย, TTS):** continuity แบบคลาสสิก; L-cut ทุกประโยคพีคไปหน้าผู้ฟัง; จุดเปลี่ยนฉากใช้ J-cut ด้วย ambience; ASL 2–4 s ตามบทพูด
- **Product/promo:** `cut.axial` punch-in ไปรายละเอียดแว่น (กฎบ้าน: หลายมุม + detail punch-in) + `audio.hit`; `trans.zoom_through` เข้าเลนส์ 1 ครั้งต่อคลิป
- **Reels/TikTok 9:16:** intensified continuity; คัทแรกภายใน ~1–2 s ถ้าเฟรมแรกนิ่ง; ตำแหน่งหน้าคงที่ใน safe zone ข้ามคัท (ช่วย eye-trace บนจอเล็ก)
- **Explainer:** jump cut ตัด pause ได้; transition ครอบครัวเดียว (wipe/push) เมื่อขึ้นหัวข้อใหม่
- **Cartoon (Aaron chibi / rig.js):** cut on action ตอนหันหัว puppet; iris out ตอนจบ
- **Documentary/talking head:** jump cut + cutaway B-roll ปิดรอย; L-cut เสียงสัมภาษณ์ลงบน B-roll

## 9. AI image prompt examples
1. คู่ match-action: A `medium shot, a woman in a mustard coat begins to turn her head to screen-left, warm window light from left, 50mm` / B `close-up, the same woman mid head-turn to screen-left, same mustard coat, same warm light from left, her face in the left third of frame`
2. Insert ที่แสงตรงกับ master: `macro insert, fingertip adjusting the nose pad of tortoiseshell glasses, warm key light from screen-left, shallow depth of field, same wooden counter as previous shot`
3. Graphic match: `full moon centred in frame, 40% of frame height` → `round lens of glasses centred, 40% of frame height, same position`

## 10. AI video prompt examples
1. ช็อตจบด้วย cue: `medium close-up, static camera, he hears a sound off-screen right and turns his head right, eyes searching` (แล้วคัทไปสิ่งที่เขาเห็น)
2. Whip-transition half: `the camera whip pans fast to the right with heavy motion blur, ending the shot in blur`
3. Listener สำหรับ L-cut: `close-up of a listener, lips closed the entire time, a slow blink and a small nod, no speaking` (โมเดลชอบใส่การขยับปาก — ต้องตรวจ)
> ความสามารถโมเดล (first/last frame, ความยาว) เปลี่ยนเร็ว อ้าง `creative-intelligence/CAPABILITY_MATRIX.json` (Wan 2.2 TI2V ยืนยันแค่ image→video 5 s)

## 11. Shot list example — "ลูกค้าลองแว่นแล้วเห็นชัด" (30 s, 9:16)
| # | ช็อต | เวลา | ทางเชื่อม→ถัดไป | เหตุผล |
|---|---|---|---|---|
| 1 | MCU ลูกค้าหรี่ตาอ่านเมนู | 0–2.0 | cut on action (ยกเมนูเข้าใกล้) | hook ปัญหา + motion cue |
| 2 | Insert ตัวอักษรเบลอ (POV) | 2.0–3.2 | J-cut เสียงกระดิ่งร้าน | eyeline/POV |
| 3 | WS หน้าร้าน ลูกค้าเดินเข้า L→R | 3.2–5.5 | matched exit/entrance (ออกขวา-เข้าซ้าย) | screen direction คงที่ |
| 4 | MS ช่างวัดสายตา | 5.5–9 | L-cut เสียงช่างอธิบาย → 5 | ผู้ฟัง = ลูกค้า |
| 5 | CU ลูกค้าฟัง | 9–11 | cut on action (ใส่แว่น) | reaction |
| 6 | ECU มือใส่แว่น | 11–12.5 | axial punch-in + audio hit | รายละเอียดสินค้า |
| 7 | POV เมนูคมชัด | 12.5–14.5 | hard cut | payoff |
| 8 | CU ลูกค้ายิ้ม (ช็อตยาวสุด) | 14.5–19 | dissolve 0.6 | release, เวลาผ่าน |
| 9 | WS ลูกค้าออกจากร้าน L→R | 19–24 | dip to black 1.0 | จบบท |
| 10 | Logo/ข้อความ | 24–30 | — | CTA |

## 12. ข้อผิดพลาดที่พบบ่อย
- คัทบนเฟรมนิ่งที่ไม่มี cue → รู้สึกสะดุด (AToCC)
- ช็อต AI สองช็อตขนาด/มุมใกล้กัน → jump cut โดยไม่ตั้งใจ
- ใช้ transition คนละแบบทุกคัท (HyperFrames เองแนะนำ primary 1 + accent 1–2)
- เสียง J/L ยาวเกินจนผู้ชมไม่รู้ว่าเสียงเป็นของฉากไหน
- ตัดเร็วทั้งคลิป → ไม่มีคอนทราสต์ ไม่มีจุดพีค (`Cutting2016`: pace มีรูปทรง)
- ลืม release หลังช่วงเร่ง

## 13. วิธีตรวจและแก้
1. **Cue audit:** ทุกคัทเขียน 1 คำ — `look / sound / motion / line / none`; ถ้า `none` ให้ย้ายจุดตัดไปที่ motion onset หรือเพิ่ม J-cut
2. **Landing test:** เล่นทีละคัท ดูว่าสายตาเจอ subject ภายใน ~3 เฟรมไหม; ถ้าไม่ ย้ายตำแหน่ง subject ใน B ไปที่จุดที่ตาอยู่ใน A
3. **Shot-length plot:** ffmpeg หาเวลาคัท `ffmpeg -i clip.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep pts_time` → วาดกราฟ ASL ต่อช่วง ควรเห็นรูปทรง (ช้า→เร่ง→ปล่อย)
4. **Unintended jump:** ถ้าขนาดเปลี่ยน < 1 ขั้นและมุม < ~30° ให้ใส่ cutaway/insert คั่น หรือ punch-in ≥ 1.3×
5. **Flash safety:** dip-to-white/glitch ไม่เกิน 3 แฟลชต่อวินาที

## 14. แบบฝึกหัด + test case
- **T10-A (cue vs no cue):** ฉากเดียวกัน 3 เวอร์ชัน: (1) คัทบนเฟรมนิ่ง (2) คัทตอนหันหน้า (3) J-cut เสียงนำ 0.5 s → ให้คน 3 คนดูโดย "นับคัท" เปรียบเทียบจำนวนคัทที่พลาด (คาดว่า 2,3 ซ่อนได้ดีกว่า — ทดสอบเล็ก ไม่ใช่ผลวิจัย)
- **T10-B (pace curve):** ตัดฟุตเทจชุดเดียวเป็น 3 แบบ: ASL คงที่ 2 s / ASL คงที่ 0.8 s / โค้ง 3→0.6→4 s → เทียบว่าคลิปไหนรู้สึกมี "พีค"
- **T10-C (Bordwell test):** บทสนทนา 20 s ทำแบบ 2 ช็อตยาว vs 10 singles → จดว่าแบบไหนอ่านความสัมพันธ์ได้ดีกว่า แบบไหนพลังกว่า
- เกณฑ์ผ่าน: ทุกคัทมี cue, ไม่มี jump โดยไม่ตั้งใจ, กราฟ ASL มีรูปทรง, transition ไม่เกิน 3 ชนิด

## 15. แหล่งอ้างอิง (keys ใน `../sources/story-edit.json`)
Smith2012 · SmithHenderson2008 · Nakano2009 · Murch2001 · Cutting2010 · Cutting2011 · CuttingCandan2015 · Cutting2016 · Bordwell2002 · Bordwell2007_Revisited · BordwellThompsonFilmArt · Allen2003 · Heimann2016 · Hasson2008 · Loschky2015 · RooneyBalint2018 · Tsivian2009 — และข้ามโฟลเดอร์: `knowledge/continuity/sources.json` (MaglianoZacks2011, SimonsLevin1998)
