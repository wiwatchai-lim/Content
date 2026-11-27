# FD15 — Character Acting & Body Language for Camera (การแสดงและภาษากายสำหรับกล้อง)

> **ความรู้ภาษากายหลักอยู่ที่ `creative-intelligence/knowledge/acting/`** — README (BAP/de Gelder, คิวร่างกายเฉพาะอารมณ์, form vs motion, gesture McNeill/Kendon, proxemics Hall + Sorokowska 42 ประเทศ, gaze Langton/Emery, FACS, Laban, animation acting, ธรรมเนียมไทย), `ACTING_GUIDE.md` (workflow กำกับช็อต, ระยะห่าง, ทิศศีรษะ, checklist ไทย) และ `POSE_LIBRARY.json` — **บทนี้ไม่ทวน** แต่เพิ่ม "ชั้นกล้อง": blocking, ขนาดช็อตกับระยะทางสังคม, การแสดงตามขนาดเฟรม, การมองกล้อง, และการแสดงที่ใช้กับการตัดต่อ
> แหล่ง: `../sources/story-edit.json` + keys ข้ามโฟลเดอร์ `acting:*`

## 1. นิยามและหลักการพื้นฐาน
- **Blocking:** การกำหนดตำแหน่งและเส้นทางเคลื่อนของนักแสดงสัมพันธ์กับกล้องและกันและกัน ในแต่ละ beat
- **Staging:** blocking + กล้อง + แสง เพื่อพาสายตา (ใน long take ทำหน้าที่แทนการตัด — `GENRE_STYLE_LIBRARY` `approach.long_take_staging`)
- **Frame proxemics** [CRAFT]: ขนาดช็อตทำงานเหมือน "ระยะทางสังคม" ระหว่างผู้ชมกับตัวละคร — ECU/CU ≈ intimate, MS ≈ personal/social, WS ≈ public (แนวคิดเชื่อมกับ Hall ใน `acting:Hall1966`; การ map ตรงนี้เป็นธรรมเนียมผู้ปฏิบัติ)
- **Acting scale:** ยิ่งเฟรมแน่น ยิ่งต้องแสดงเล็ก (ตา ลมหายใจ) ยิ่งเฟรมกว้าง ยิ่งต้องใช้ทั้งตัวและ silhouette [CRAFT]
- **Eyeline to lens:** มองตรงเลนส์ = พูดกับผู้ชม (presenter, testimonial); มองใกล้เลนส์ = ผู้ชมอยู่ในบทสนทนา; มองไกลจากเลนส์ = ผู้ชมแอบดู [CRAFT]

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 Close-up ขยายสิ่งที่หน้าส่ง ไม่สร้างใหม่** [EVIDENCE] — close-up หน้าเศร้าเพิ่มการพูดถึงสภาวะจิตใจตัวละคร แต่ close-up หน้าเฉยไม่ได้ผล; ไม่ข้ามไปยังตัวละครที่ถ่ายแต่ long shot `[RooneyBalint2018]`; จำนวน close-up เป็นตัวแปรที่ทดลองได้ `[Balint2020]` → **การแสดงต้องมาก่อน ขนาดช็อตเป็นตัวคูณ**
**2.2 Close-up บนความขัดแย้ง = ใกล้เกิน** [EVIDENCE] — ในการโต้เถียงทางทีวีที่ไม่สุภาพ มุมกล้องใกล้ทำให้ผู้ชมมองฝ่ายตรงข้ามว่าชอบธรรมน้อยลง `[Mutz2007]` → สอดคล้องกับแนวคิดว่าระยะเฟรมถูกอ่านแบบระยะทางสังคม (การตีความเชิงทฤษฎี)
**2.3 การแสดงกับการตัดต่อ** — gaze, การชี้, การหัน, การเริ่มเคลื่อน ของนักแสดง คือ "cue" ที่ AToCC ใช้พาสายตาข้ามคัท `[Smith2012]` → นักแสดง/puppet ต้องมี **จังหวะมองก่อนคัท** (look → cut → target) และ **เริ่ม action ก่อนจุดตัด** เพื่อให้ cut on action ได้
**2.4 Intensified continuity เปลี่ยนการแสดง** — Bordwell สังเกตว่าเมื่อตัดเร็ว/ใกล้ การแสดงกลายเป็น "broader, more demonstrative" และหยุดชั่วคราวน้อยลง `[Bordwell2007_Revisited]` [B, expert observation] → คลิปสั้นมักต้องการ reaction ที่อ่านได้ใน < 1.5 s
**2.5 Reaction เป็นครึ่งหนึ่งของการแสดง** — Kuleshov replications: บริบทเปลี่ยนการอ่านหน้า **ที่กำกวม** (`Barratt2016`, `Calbi2017`) → reaction shot ที่ "เล็ก/กำกวม" ใช้ร่วมกับบริบทได้ แต่ reaction ที่ขัดบริบทจะชนะ
**2.6 Acting for camera — ศาสตร์ด้านการแสดงภาพยนตร์** — Naremore (1988) วิเคราะห์การแสดงภาพยนตร์ (protocols, expressive technique, expressive coherence) `[Naremore1988]` [bibliographic — อ่านแค่สารบัญ]; รายละเอียด craft ภาคปฏิบัติดู `acting/README.md` §2.9 (Lasseter, Hooks)

## 3. เหตุผลที่ใช้
ตัวละคร AI/puppet/คนจริงในร้านไม่ใช่นักแสดงอาชีพ → ต้องออกแบบ "สิ่งที่ทำ" ให้กล้องจับได้ (action ที่เห็น, gaze ชัด, จังหวะ) แทนการหวังอารมณ์ละเอียด

## 4. ผลต่ออารมณ์และการรับรู้
| องค์ประกอบ | ผล | ป้าย |
|---|---|---|
| ระยะระหว่างตัวละครในเฟรม | ความสัมพันธ์ (ใกล้/ห่าง/ขัดแย้ง) | [EVIDENCE ลำดับระยะ `acting:Sorokowska2017`] + [CRAFT การใช้ในเฟรม] |
| ทิศศีรษะ/สายตา | พาสายตาผู้ชม | [EVIDENCE `acting:Langton2000`, `Smith2012`] |
| ขนาดช็อต × การแสดง | ใกล้ + หน้าแสดงอารมณ์ = คิดถึงใจตัวละครมากขึ้น | [EVIDENCE `RooneyBalint2018`] |
| ใกล้ + ขัดแย้ง | ประเมินผู้ถูกถ่ายลบขึ้น | [EVIDENCE `Mutz2007`] |
| ระดับสายตา (สูง/ต่ำ) ระหว่างตัวละคร | สถานะ/อำนาจ | [CRAFT; หลักฐาน head pitch ขัดแย้ง — `acting/README.md` §2.6] |

## 5. ใช้เมื่อไร
- Blocking ทุกฉากที่มี ≥ 2 ตัวละคร: วาดผังจากด้านบนก่อนกำหนดช็อต
- เปลี่ยนความสัมพันธ์ = เปลี่ยนระยะ (Mint & Tao) และเปลี่ยนขนาดช็อตร่วมกัน
- Testimonial/พนักงานพูดกับกล้อง: มองเลนส์ระดับตา, MS–MCU

## 6. ไม่ควรใช้เมื่อไร
- อย่าให้มองกล้องในฉากละครที่ผู้ชม "แอบดู" (ทำลาย fourth wall โดยไม่ตั้งใจ)
- อย่าใช้ ECU กับคนที่ต้องการให้ผู้ชมไว้ใจในฉากที่ตึงเครียด (`Mutz2007`)
- อย่าให้ทุกคนยืนเรียงแนวขนานกล้อง (flat staging) ในฉากดราม่า — ไม่มีความลึก/ความสัมพันธ์ [CRAFT]
- ธรรมเนียมไทย: ห้ามท่าที่ไม่สุภาพ (เท้า/ศีรษะ/ยืนค้ำผู้ใหญ่) — checklist `acting/ACTING_GUIDE.md` §6

## 7. ตัวอย่าง (sourced)
- *Blade Runner* (1982): ผู้ชมเลื่อนความสนใจตามเสียงผู้พูดนอกจอ; gaze ของนกฮูกนำสายตา `[Smith2012]`
- *Rear Window* และ *The King of Comedy*: Naremore ใช้เป็น "performance texts" `[Naremore1988]` (สารบัญ)
- *You've Got Mail* vs *The Shop Around the Corner*: การแสดงที่ "demonstrative" มากขึ้นในสไตล์ตัดเร็ว `[Bordwell2007_Revisited]`
- การ์ตูนสั้นในงาน Rooney & Bálint: close-up หน้าเศร้าของเด็กหญิง `[RooneyBalint2018]`

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip (rig.js puppet):** ก่อนทุกคัทที่เป็น eyeline cut ให้ puppet หันหัว/ตา 0.2–0.4 s ก่อน; action (ยกแก้ว, ยื่นแว่น) เริ่มก่อนจุดตัด 3–5 เฟรม; lip-sync เฉพาะช็อตที่ปากเห็นชัด
- **Mint & Tao (faceless pencil):** ไม่มีหน้า → ระยะ, ทิศลำตัว, ไหล่, มือ, การเอียงหัว คือทั้งหมด; ใช้ POSE_LIBRARY ids
- **Product/promo (คนจริง/โมเดล AI):** มือสวมแว่นช้าและชัด, หน้าหันเฉียง 3/4 ให้เห็นทรงแว่น (กฎบ้าน: หลายมุม); สายตาจากนายแบบไปที่ข้อความ/สินค้า
- **Reels 9:16:** เฟรมแคบแนวนอน → blocking แนวลึก (หน้า-หลัง) แทนซ้าย-ขวา; สองคนใน 9:16 ใช้ OTS หรือ stack บน-ล่าง
- **Explainer/talking head:** มองเลนส์; ท่ามือ (beat gestures) ประกอบคำสำคัญ (`acting:McNeill1992`)
- **Documentary:** ให้คนทำงานจริง (action) แทนการโพสท่า — กล้องจับ "การทำ"

## 9. AI image prompt examples
1. Frame proxemics ห่าง: `two people at opposite ends of a long sofa, both turned slightly away from each other, wide shot, eye-level, lots of empty space between them`
2. Gaze cue: `a young woman looks down and to frame-right toward a pair of glasses on the counter, her body angled toward it, medium shot`
3. Acting scale CU: `close-up, an elderly man's eyes glistening, a restrained small smile, chin slightly trembling, soft key light` (เล็ก ไม่ใช่ร้องไห้โฮ)

## 10. AI video prompt examples
1. Look → cut: `medium close-up, she hears something off-screen right, pauses, then turns her head and eyes to the right and holds the look` (จบด้วย look ให้คัท)
2. Blocking in depth (9:16): `vertical frame, the customer in the foreground tries on glasses facing a mirror, the optometrist in the background walks closer and stops behind her shoulder`
3. Restraint: `close-up, he hears the news and does not cry; he swallows, looks down, and slowly takes off his glasses` (โมเดลชอบเล่นเกิน — ระบุสิ่งที่ "ไม่ทำ" อย่างระวัง เพราะคำปฏิเสธบางครั้งเรียกสิ่งนั้นออกมา ดู CAPABILITY_MATRIX FLUX limits)

## 11. Shot list example — blocking ฉาก "ช่างแนะนำแว่น" (ผังบน + ช็อต)
- ผัง: เคาน์เตอร์แนวนอน, ลูกค้า (A) นั่งซ้าย, ช่าง (B) ยืนขวาหลังเคาน์เตอร์ → เส้น 180° ผ่าน A–B; กล้องฝั่งหน้าเคาน์เตอร์
| beat | blocking | ช็อต | เหตุผล |
|---|---|---|---|
| 1 | A นั่ง มองแว่นในตู้ (มองขวา) | WS | establish + gaze cue |
| 2 | B เดินเข้าจากขวา หยุดตรงหน้า A | MS two-shot | การเข้า = เริ่มความสัมพันธ์ |
| 3 | B ยื่นแว่น มือเข้าจากขวา | insert | cut on action |
| 4 | A ลองแว่น หันเฉียง 3/4 ไปกระจก (ซ้าย) | MCU | เห็นทรงแว่น |
| 5 | B ก้าวถอยครึ่งก้าว ยิ้ม (ให้พื้นที่) | MS B | proxemics: เคารพพื้นที่ลูกค้า |
| 6 | A หันกลับหา B ยิ้ม | CU A | reaction ที่จุดเปลี่ยน |

## 12. ข้อผิดพลาดที่พบบ่อย
- โมเดล AI ทำหน้า "ยิ้มโฆษณา" ทุกช็อต → ไม่มี arc
- ตัวละครยืนนิ่งพูด ไม่มี action ให้ตัด
- มองผิดทิศเมื่อ gen แยกช็อต (ดู FD11)
- ท่าทางขัดธรรมเนียมไทยในฉากไทย
- เล่นใหญ่ใน CU / เล่นเล็กใน WS

## 13. วิธีตรวจและแก้
1. **Top-down plan** ต่อฉาก + ลูกศรเคลื่อนที่
2. **Silhouette test** (ช็อตกว้าง): เติมดำ — ยังอ่านท่าได้ไหม (`acting/README.md` §2.9)
3. **Scale check:** ช็อต CU ห้ามการเคลื่อนไหวใหญ่; ช็อต WS ต้องอ่านได้จากทั้งตัว
4. **Cue check:** ทุก eyeline cut มี look ก่อนคัท; ทุก match cut มี action ที่เริ่มก่อนคัท
5. **Thai etiquette checklist:** ACTING_GUIDE §6

## 14. แบบฝึกหัด + test case
- **T15-A (distance):** ภาพ Mint & Tao 3 ระยะ (ไกล/กลาง/ใกล้) โดยท่าทางเดิม → ผู้ชมเดาความสัมพันธ์
- **T15-B (scale):** การแสดงเดียวกันใน WS และ CU (เล็ก vs ใหญ่) × 2 = 4 เวอร์ชัน → อันไหน "จริง" ที่สุดในแต่ละขนาด
- **T15-C (look-before-cut):** คัทแบบมีการหันมองก่อน vs คัทเฉยๆ ไปยังสินค้า → นับว่าผู้ชมจำสินค้าได้กี่คน
- เกณฑ์ผ่าน: silhouette อ่านได้, ไม่มีการมองผิดทิศ, การแสดงสเกลตรงกับขนาดช็อต

## 15. แหล่งอ้างอิง
RooneyBalint2018 · Balint2020 · Mutz2007 · Smith2012 · Bordwell2007_Revisited · Barratt2016 · Calbi2017 · Naremore1988 — ข้ามโฟลเดอร์ `knowledge/acting/sources.json`: Hall1966, Sorokowska2017, Langton2000, Emery2000, McNeill1992, Lasseter1987, Hooks2023, AnumanRajadhon_wai
