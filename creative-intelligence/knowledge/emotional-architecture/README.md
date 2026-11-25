# M32 — Emotional Architecture (สถาปัตยกรรมอารมณ์: ออกแบบอารมณ์ตามเวลา)

**Emotional architecture** = การออกแบบว่าอารมณ์ของผู้ชม "ขึ้น-ลง-เปลี่ยน" อย่างไรตลอดทั้งชิ้นงาน (โพสต์ คารูเซล คลิป ซีรีส์) ไม่ใช่แค่ "ฉากนี้อารมณ์อะไร"
ใช้ได้กับทุกสาขา ทุกลูกค้า ตัวอย่างประยุกต์เป็นงานของสตูดิโอ

ไฟล์ในโฟลเดอร์
- `README.md` — ทฤษฎี หลักฐาน ข้อจำกัด
- `EMOTION_DESIGN_MATRIX.md` — 20 อารมณ์หลัก × 11 คันโยก (voice, word, colour, light, camera, music, SFX, edit, motion, space, silence) ติดป้าย EVIDENCE/CRAFT/DERIVED + ลิงก์ id ในคลังอารมณ์
- `ARC_TEMPLATES.md` — แม่แบบ arc อารมณ์ พร้อม timing ตามความยาวงาน
- `sources.json` — 24 แหล่ง

ป้าย: **EVIDENCE** (มี key) · **CRAFT** (ความรู้คนทำงาน tier D — ไม่ใช่วิทยาศาสตร์) · **DERIVED** (เราอนุมานจากหลักฐาน)

**ไม่ซ้ำกับ** (อ่านคู่กัน):
- M02 `knowledge/emotions/README.md` — นิยามอารมณ์, appraisal, circumplex/PAD, intensity & duration, peak-end พื้นฐาน (FredricksonKahneman1993), emotional contagion (Hatfield1993, ManySmiles2022)
- `.claude/skills/ai-voice-director/EMOTION_TRANSITIONS.md` — การเปลี่ยนอารมณ์ *ในเสียง* ระดับประโยค/บรรทัด
- `EMOTION_LIBRARY.json` (108 id เสียง) และ `EMOTION_VISUAL_LIBRARY.json` (114 id ภาพ) — วิธีเล่นอารมณ์เดี่ยวๆ
- M04 `knowledge/cognitive-science/README.md` — attention, cognitive load, self-paced vs system-paced
- M31 `knowledge/comedy/` — โครงสร้างมุก

โมดูลนี้เพิ่ม: **มิติเวลา** — ลำดับ, จังหวะ, จุดพีค, ตอนจบ, การพัก, การเปลี่ยนข้ามฉาก

---

## 1. Scope & status
**ครอบคลุม**: emotional arcs (Reagan et al.), peak-end ในโฆษณา + meta-analysis, affective forecasting, mood management + appreciation (eudaimonic), tension/suspense/curiosity, anticipation-reward ในดนตรี, กลไกอารมณ์จากดนตรี, tempo/mode, mood-cue ในภาพยนตร์, pace ของภาพยนตร์, excitation transfer, awe, nostalgia, colour-emotion ข้ามวัฒนธรรม, camera angle
**ไม่ครอบคลุม / อ่อน**: ไม่มีงานวิจัยที่วัด arc อารมณ์ของ *คลิปสั้นแนวตั้ง* หรือ *คารูเซล* โดยตรง; lighting-emotion ไม่มีงานวิจัยที่ค้นเจอในรอบนี้ (ใช้ CRAFT); SFX-emotion ไม่มี source เฉพาะ; full text อ่านได้แค่ LehneKoelsch2015; colour-emotion คู่เฉพาะ (เช่น yellow-joy) ยังไม่ได้อ่านตัวเลข

---

## 2. Core concepts

### 2.1 Emotional arcs (รูปทรงอารมณ์ของเรื่อง)
- **คืออะไร**: วัด sentiment ของคำตลอดนิยายพันกว่าเรื่อง พบว่ารวมเป็น 6 รูปทรงหลัก เป็น "ตัวต่อ" ของรูปทรงที่ซับซ้อนกว่า และบางรูปทรงสัมพันธ์กับยอดดาวน์โหลดสูงกว่า (ReaganEtAl2016) รูปทรงที่มักอ้าง: rise (rags to riches), fall (tragedy), fall-rise (man in a hole), rise-fall (Icarus), rise-fall-rise (Cinderella), fall-rise-fall (Oedipus)
- **ใช้งาน**: เลือกรูปทรงก่อนเขียน — คอนเทนต์ "ปัญหา→ทางออก" ทุกธุรกิจ = fall-rise; เรื่องซึ้ง Mint & Tao = rise-fall-rise
- **ข้อจำกัด**: วัดจาก *คำ* ไม่ใช่ความรู้สึกคนอ่าน; ยอดดาวน์โหลด ≠ คุณภาพ; นิยายยาว ≠ คลิป 15 วิ
- **Tier/keys**: A — ReaganEtAl2016 (abstract) · **ความมั่นใจ**: medium (ว่ารูปทรงมีจริงในข้อความ), low (ว่าใช้ได้กับสื่อสั้น)

### 2.2 Peak-end rule และขีดจำกัดสำหรับสื่อ
- **หลักฐาน**: meta-analysis 174 effect sizes — ผล peak-end ต่อการประเมินย้อนหลังใหญ่ (r ≈ .58) แข็งแรงข้ามเงื่อนไข **แต่ค่าเฉลี่ยทั้งประสบการณ์ก็มีผลแรงพอๆ กัน** (AlaybekEtAl2022); ในโฆษณา: ความชอบรวมขึ้นกับจุดพีค + ช่วงสุดท้าย + *แนวโน้มที่ดีขึ้น* (trend); ความยาวมีผลน้อย — ยาวกว่าได้เปรียบ *ถ้าไต่ไปหาพีค*; คนชอบพีคที่มาช้าและตอนจบสูง (BaumgartnerSujanPadgett1997)
- **ขีดจำกัดสำหรับสื่อ**: (1) peak-end อธิบาย *ความจำ/การประเมินย้อนหลัง* ไม่ใช่ว่าคนจะดูจนจบไหม — ในฟีด คนเลื่อนผ่านก่อนถึงพีคได้ ดังนั้นต้องมี hook ด้วย (DERIVED + M04 attention); (2) ค่าเฉลี่ยยังสำคัญ — ช่วงกลางที่น่าเบื่อไม่ได้ถูกลบ (AlaybekEtAl2022); (3) ประสบการณ์ที่ไม่มีจุดเริ่ม-จบชัด (ฟีดทั้งวัน) อาจไม่ตาม peak-end (secondary ใน AlaybekEtAl2022 summary)
- **ใช้งาน**: 1 พีคชัด วางราว 60–85% ของความยาว + ตอนจบสูง/อุ่น + เส้นทางโดยรวมไต่ขึ้น (DERIVED จาก Baumgartner); แบรนด์/สินค้าอยู่ *ในหรือติด* พีคหรือตอนจบ ไม่ใช่หลังอารมณ์จบ (สอดคล้องกับ M02)
- **Tier/keys**: S — AlaybekEtAl2022; A — BaumgartnerSujanPadgett1997; M02:FredricksonKahneman1993 · **ความมั่นใจ**: high (peak/end สำคัญ), medium (ตำแหน่งพีคที่แน่นอน)

### 2.3 Affective forecasting (การทำนายอารมณ์ล่วงหน้า)
- **หลักฐาน**: คนทำนายความแรงและความยาวของอารมณ์ในอนาคตเกินจริง (impact bias) เพราะ focalism และไม่คาดว่าตัวเองจะ "ทำความเข้าใจ" เหตุการณ์ได้เร็ว (WilsonGilbert2005)
- **ใช้งาน (DERIVED)**: (1) ผู้สร้างเองก็ทำนายเกินจริงว่า "ฉากนี้คนต้องร้องไห้" → ต้องทดสอบกับคนดูจริง; (2) อารมณ์ลบช่วงสั้นในเรื่องหายเร็วกว่าที่กลัว — กล้าใส่ beat เศร้า/ตึงสั้นๆ ได้; (3) ในโฆษณา: อย่าสัญญาความสุขเกินจริง ("ใส่แล้วชีวิตเปลี่ยน") — ลูกค้าจะปรับตัวเร็ว
- **Tier/keys**: A — WilsonGilbert2005 · **ความมั่นใจ**: high (bias มีจริง), low (การแปลไปสู่สื่อ)

### 2.4 Emotional contagion (สรุปเฉพาะมิติเวลา — รายละเอียดใน M02)
- อารมณ์ของตัวละคร/ผู้บรรยายเป็นเส้นทางระดับล่างไปสู่คนดู (HatfieldCacioppoRapson1993; M02:ManySmiles2022 พบว่า facial feedback มีแต่เล็ก)
- **มิติเวลา (DERIVED)**: ผู้บรรยายควร "นำ" อารมณ์เปลี่ยนก่อนภาพเล็กน้อย หรือพร้อมกัน ไม่ใช่ตามหลัง; ตัวละครที่ไม่มีหน้า (Mint & Tao) ใช้ท่าทาง/จังหวะ/เสียงเป็นพาหะแทน
- **ความมั่นใจ**: medium

### 2.5 Mood management & appreciation (ทำไมคนเลือกดูอะไร และไม่ใช่แค่ "ให้รู้สึกดี")
- **Mood management**: คนเลือกสื่อเพื่อปรับอารมณ์ — เบื่อเลือกสื่อตื่นเต้น เครียดเลือกสื่อสงบ (Zillmann1988, secondary)
- **ข้อโต้แย้ง**: คนชอบสื่อเศร้า/โศกนาฏกรรม ซึ่งขัดกับสมมติฐาน hedonic; **appreciation** (ซึ้ง ชวนคิด มีความหมาย) เป็นการตอบสนองที่แยกจาก enjoyment และแยกจาก valence (OliverBartsch2010)
- **ใช้งาน**: (1) โพสต์ช่วงดึก/เช้าตรู่ เปิดด้วยพลังงานต่ำ-อุ่น (DERIVED); (2) เรื่องเศร้าแต่มีความหมายเป็นเป้าหมายที่ถูกต้อง — วัดความสำเร็จด้วย "ซึ้ง/แชร์/เซฟ" ไม่ใช่แค่ "สนุก"
- **Tier/keys**: A — Zillmann1988 (search summary), OliverBartsch2010 · **ความมั่นใจ**: medium

### 2.6 Tension, suspense, curiosity, anticipation
- **Tension model**: ความตึงเกิดจาก conflict/instability/dissonance/uncertainty ที่กระตุ้นการคาดการณ์ถึงเหตุการณ์ที่ *มีความหมาย*; แรงขึ้นเมื่อผลลัพธ์มีทั้งดีมากและแย่มาก และเมื่อตัวละคร/คนดูควบคุมไม่ได้; suspense = สองผลลัพธ์ชัด, tension = กว้างกว่า; **surprise เกิดหลังเหตุการณ์ tension เกิดก่อน**; ผลลัพธ์หนึ่งเป็นจุดเริ่ม tension ถัดไปได้ (chain) หลายสเกลเวลา; ระยะหน่วงที่ดีที่สุดยังไม่มีข้อมูล (LehneKoelsch2015, full text)
- **Suspense ต้องการความชอบตัวละคร**: suspense เพิ่มเมื่อคนดูรู้สึกดีต่อตัวเอก (ComiskyBryant1982, unverified attribution)
- **Curiosity**: เกิดจาก "ช่องว่างความรู้" ที่รู้ตัว (information gap) (Loewenstein1994)
- **Anticipation เป็นรางวัลในตัว**: ช่วงรอคอยก่อนพีคในดนตรีปล่อย dopamine ในวงจรต่างจากตอนพีค (Salimpoor2011); ทฤษฎี ITPRA แยก tension ก่อนเหตุการณ์ออกจาก reaction/appraisal หลังเหตุการณ์ (Huron2006)
- **ใช้งาน**: hook = ช่องว่างที่เจาะจงและตอบได้ในชิ้นนั้น; build-up ไม่ใช่เวลาตาย; ให้คนดูรักตัวละครก่อนให้ตัวละครเจอปัญหา; ซีรีส์ = chain ของ resolution → คำถามใหม่
- **Tier/keys**: A — LehneKoelsch2015, Loewenstein1994, Salimpoor2011, Huron2006, ComiskyBryant1982 · **ความมั่นใจ**: medium-high

### 2.7 Tension–release ในดนตรีและภาพยนตร์
- **ดนตรี**: tempo คุม arousal, mode (major/minor) คุม mood/valence — แยกกันได้ (HusainThompsonSchellenberg2002); แต่ไม่มีพารามิเตอร์เดียวที่ = อารมณ์เดียว อารมณ์ที่รับรู้มาจากหลายตัวร่วมกัน (GabrielssonLindstrom2010); ดนตรีกระตุ้นอารมณ์ผ่านหลายกลไก: brain-stem reflex (เสียงดังกะทันหัน), contagion, episodic memory, expectancy ฯลฯ (JuslinVastfjall2008); deceptive cadence = หน่วงการคลี่ (LehneKoelsch2015)
- **ภาพยนตร์**: mood-cue — mood ที่ตั้งไว้ยาว ต้องมี emotion cue เล็กๆ มาเติมเรื่อยๆ; การเปลี่ยนโทนได้ผลถ้าคนดูถูกบอกล่วงหน้า (Smith2003); shot length ลดลงตามยุคและการแปรผันมีโครงสร้าง (1/f) ไม่ใช่เท่ากันหมด (CuttingDeLongNothelfer2010); ช่วง setup มีแนวโน้มช็อตยาวขึ้นและเคลื่อนไหวน้อยลง (Cutting2016, snippet)
- **Excitation transfer**: arousal ที่ค้างอยู่จากฉากก่อนอาจขยายอารมณ์ฉากถัดไป ถ้าคนไม่ได้โยงกับต้นเหตุ — หลักฐานผสม (CantorZillmannBryant1975, secondary; มี null result กับโฆษณาคั่นรายการ)
- **ความมั่นใจ**: high (tempo/mode), medium (ภาพยนตร์), low (excitation transfer)

### 2.8 Valence/arousal trajectories & emotional pacing
- คิดอารมณ์เป็นจุดบนระนาบ valence × arousal (M02 circumplex) แล้ว **วาดเส้นทางตามเวลา** — arc = เส้นทาง, pacing = ความเร็วที่เคลื่อน
- **กฎ (DERIVED จากหลักฐานด้านบน + EMOTION_TRANSITIONS)**:
  1. arousal ขึ้นเร็วได้ ลงต้องมีเวลา settle (สอดคล้องกับ EMOTION_TRANSITIONS rule 3)
  2. valence เปลี่ยนขั้วต้องมี trigger ที่เห็น/ได้ยิน (appraisal เปลี่ยน — M02)
  3. contrast ทำให้พีครู้สึกแรงขึ้น: พีคต้องมี "ที่ต่ำกว่า" อยู่ก่อน (rest beat)
  4. ค่าเฉลี่ยยังนับ (AlaybekEtAl2022) — rest beat ต้องสั้นและยังมีเรื่อง ไม่ใช่ช่วงว่าง
- **Rest beats / contrast** (CRAFT): หลังพีคให้ 1–2 จังหวะพัก (ช็อตยาว เงียบ ดนตรีลด) ก่อนพีคถัดไป; ในคารูเซลคือสไลด์ภาพเดียวไม่มีข้อความ

### 2.9 Emotional transitions: plausible vs jarring
- **plausible** เมื่อ: (ก) มี trigger ชัด (ข) เดินผ่านอารมณ์ข้างเคียง (M02: CowenKeltner2017 gradients) (ค) ถ้าเปลี่ยนโทนใหญ่ มี cue บอกล่วงหน้า (Smith2003)
- **jarring** เมื่อ: valence กลับขั้ว + arousal กระโดด + ไม่มี trigger ในจังหวะเดียว; หรือ "whiplash" ซึ้ง→ขายของทันที
- **ใช้ jarring อย่างตั้งใจ** ได้เฉพาะเป็นมุก (M31 incongruity) หรือ shock ที่ออกแบบไว้ — และต้องคลี่ให้ได้
- **ตาราง "ระยะห่าง" ที่ปลอดภัยต่อหนึ่ง beat** (DERIVED): เปลี่ยนแค่ arousal หรือแค่ valence = ปลอดภัย; เปลี่ยนทั้งสอง = ต้องมี trigger + bridge 1 beat

### 2.10 Awe, nostalgia (อารมณ์ที่ต้องการโครงสร้างเฉพาะ)
- **Awe** = vastness + need for accommodation; อาจไม่สบายใจได้ (KeltnerHaidt2003) → ต้องมี "ขนาด" และ "สิ่งที่เกินความเข้าใจเดิม"
- **Nostalgia** = ambivalent แต่บวกมากกว่าลบ, หนุนความหมายผ่านความผูกพันทางสังคม, มีทิศไปอนาคต (SedikidesEtAl2008 + งานกลุ่มเดียวกัน) → จบ beat nostalgia ด้วยความเชื่อมโยง/ก้าวต่อ ไม่ใช่จบที่การสูญเสีย; เพลงที่คนรู้จักกระตุ้น episodic memory (JuslinVastfjall2008)

### 2.11 Colour, camera — หลักฐานที่มีจริงและที่ไม่มี
- **Colour**: การจับคู่สี-อารมณ์ (เป็น *คำ* สี) คล้ายกันข้าม 30 ประเทศ (r ≈ .88) แต่มีความต่างเฉพาะชาติ (Jonauskaite2020) → คู่สีในเมทริกซ์ส่วนใหญ่เป็น CRAFT/DERIVED; ตรวจความหมายวัฒนธรรมไทยเสมอ (ดู M02 cultural notes และ `cultural_notes` ในคลังภาพ)
- **Camera angle**: low angle → สินค้าดูดีขึ้น (MeyersLevyPeracchio1992 ตามที่อ้างต่อ) แต่ replicate ได้บางส่วน (ใบหน้าใช่ วัตถุส่วนใหญ่ไม่) → ใช้เป็น CRAFT ที่มีหลักฐานอ่อน
- **Lighting / SFX**: ไม่พบงานวิจัยในรอบนี้ → CRAFT

---

## 3. Contested / replication notes
| ประเด็น | หลักฐาน | ความมั่นใจ |
|---|---|---|
| peak-end "แทน" ค่าเฉลี่ย? | ไม่ — AlaybekEtAl2022: ค่าเฉลี่ยแรงพอกัน | high |
| ความยาวไม่มีผล (duration neglect) | Baumgartner: ผลน้อย แต่ยาวขึ้นช่วยได้ถ้าไต่สู่พีค | medium |
| mood management (hedonic) | ขัดกับความนิยมสื่อเศร้า → appreciation (OliverBartsch2010) | medium |
| excitation transfer ในสื่อ | มีผลในแลบ (misattribution) / null กับโฆษณาคั่นรายการ (MSU dissertation) | low |
| camera low angle = บวก | replicate บางส่วน | low |
| 6 arcs | วัดจากคำ ไม่ใช่ความรู้สึก; ขนาด corpus รายงานไม่ตรงกัน | medium-low |
| tension: หน่วงนานยิ่งดี? | ยังไม่มีข้อมูล (LehneKoelsch2015) | open |

---

## 4. Applied patterns for our production
1. **คลิปเรื่องเล่า Mint & Tao / ไทย TTS**: เลือก arc จาก `ARC_TEMPLATES.md` → วาด intensity curve (0–1) ต่อ beat → ตรวจว่ามี 1 พีค, ตอนจบสูง/อุ่น, ไม่มี beat ที่เปลี่ยนทั้ง valence และ arousal โดยไม่มี trigger → ส่งต่อให้ ai-voice-director (EMOTION_TRANSITIONS) ทำระดับบรรทัด
2. **คารูเซล (self-paced)**: สไลด์ 1 = gap (curiosity) · สไลด์กลาง = build + rest slide · สไลด์พีค ~70–85% · สไลด์สุดท้าย = warm end (ไม่ใช่ CTA เย็นชา)
3. **คลิปสินค้า (ทุกธุรกิจ)**: Calm→Excited→Satisfied; สินค้าเผยตัวที่พีค, ตอนจบคือภาพสินค้าในชีวิตจริง (satisfaction) — ไม่ตัดจบดื้อๆ
4. **หัวข้อสุขภาพ**: Concerned→Educated→Relieved — ความกังวลสั้นและพอดี (forecasting: คนดูหายกังวลเร็วอยู่แล้ว ไม่ต้องขู่หนัก)
5. **ซีรีส์**: ทุกตอนปิดคำถามหลัก แล้วเปิดคำถามเล็กใหม่ (tension chain — LehneKoelsch2015)
6. **เพลง**: brief เพลงเป็นคู่ tempo (arousal) + mode (valence) และจุดที่ต้อง build/drop ตรงกับพีคของภาพ

---

## 5. Anti-patterns
- "peak-end แปลว่ากลางเรื่องทำอะไรก็ได้" — ผิด ค่าเฉลี่ยนับ
- พีคหลายจุดเท่ากันหมด = ไม่มีพีค (ไม่มี contrast)
- จบด้วย CTA/ราคาแข็งๆ หลังพีคซึ้ง (whiplash; end = ความรู้สึกสุดท้ายที่คนจำ)
- ใส่ shock เสียงดัง (brain-stem reflex) เพื่อ "ตื่นเต้น" ในงานที่ต้องการความไว้ใจ
- ขู่สุขภาพหนักเพราะคิดว่าคนจะกังวลนาน (impact bias ของผู้สร้าง)
- อ้าง "สีเหลือง = มีความสุขทั่วโลก" เป็นกฎ — ความต่างเฉพาะชาติมีจริง
- อ้าง low angle = พลังเสมอ เป็นวิทยาศาสตร์
- "6 basic shapes" เป็นสูตรตายตัวของทุกเรื่อง

---

## 6. Open questions / what to research next
- งานวัด moment-to-moment ของคลิปสั้นแนวตั้ง (retention curve vs อารมณ์)
- lighting-emotion (high-key/low-key) งานทดลองจริง; SFX-emotion
- อ่าน full text: Alaybek 2022 (moderators: ความยาว, ชนิดประสบการณ์), Baumgartner 1997, Jonauskaite 2020 (คู่สีเฉพาะ + ไทยอยู่ใน 30 ชาติไหม)
- optimal delay ของ tension ในสื่อสั้น
- arc ไหนให้ save/share สูงสุดบน IG carousel ไทย — ทดสอบภายใน
