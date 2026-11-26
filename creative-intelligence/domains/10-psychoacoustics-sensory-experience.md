# Domain 10: Psychoacoustics and Sensory Experience (จิตสวนศาสตร์และประสบการณ์ทางประสาทสัมผัส)

**Modules:** M22 (Sound Design), M24 (Audio Engineering) · **Version:** Creative Intelligence v2, 2026-11-26

**Scope: ครอบคลุม**
- ประวัติศาสตร์ psychoacoustics: Helmholtz, Fletcher & Munson, Stevens (power law/sone), Zwicker (critical bands/Bark), Bregman (auditory scene analysis)
- การรับรู้ความดังและมาตรฐาน: ISO 226:2023, ITU-R BS.1770, EBU R128 / Tech 3341 (แต่ละตัววัดอะไร), true peak
- masking (simultaneous/temporal) และเหตุผลที่ ducking ได้ผล
- ความเข้าใจคำพูดในเสียงรบกวน (SNR, Lombard, speech-in-noise), WCAG background audio
- ข้อจำกัดของลำโพงมือถือ, spatial/binaural ขั้นพื้นฐาน (อ้างอิงต่อจาก M22)
- timbre กับอารมณ์ (brightness, attack, roughness)
- crossmodal correspondences: pitch–size/brightness/elevation, bouba/kiki, sound–colour, sonic seasoning
- multisensory integration: McGurk, ventriloquism, หน้าต่าง sync ภาพ-เสียง (ค่า ms ที่มีแหล่ง)
- การดึงความสนใจด้วยเสียง (onset/novelty, rising intensity/looming)
- ASMR, sensory overload, accessibility (captions, ความชุกของการสูญเสียการได้ยิน, การดูแบบปิดเสียง)
- ความเงียบในฐานะเครื่องมือออกแบบ
- การนำไปใช้: Reels/TikTok ที่มีเสียง TTS, beat clips (ผู้ใช้ใส่เพลงเอง), SFX ของ story clips, eye-break clips แนวผ่อนคลาย, การดูแบบปิดเสียง

**Scope: ไม่ครอบคลุม** (มีแล้วหรืออยู่นอกขอบเขต)
- ค่าตั้ง mix chain, คำสั่ง ffmpeg, ตารางค่า LUFS ของแต่ละแพลตฟอร์ม → อยู่ใน [MIX_PLAYBOOK](../knowledge/audio-engineering/MIX_PLAYBOOK.md)
- foley, สูตรเสียงตาม event, Chion → [sound/README](../knowledge/sound/README.md) และ [SOUND_DESIGN_LIBRARY](../knowledge/sound/SOUND_DESIGN_LIBRARY.md)
- ทฤษฎีดนตรี, mode/tempo กับอารมณ์ → [music/README](../knowledge/music/README.md)
- กายวิภาคหู/ประสาทวิทยาเชิงลึก, การวัดลำโพงเอง, haptics ของอุปกรณ์ (ยังไม่พบแหล่งที่ดีพอในรอบนี้)

**Status: SOURCE VERIFIED** — แหล่งที่อ้าง 24/40 (60%) อ่านแบบ full_text หรือ abstract

**Counts (40 แหล่ง)**
- tier: S 9 · A 26 · B 2 · C 2 · D 0 · E 1
- access_status: full_text 11 · abstract 13 · publisher_page 4 · search_summary 8 · bibliographic 4

**Builds on (ไม่เขียนซ้ำ ใช้ลิงก์แทน)** (path นับจาก `creative-intelligence/domains/`)
- [../knowledge/sound/README.md](../knowledge/sound/README.md) — synchresis, added value, sync tolerance BT.1359, looming bias, silence, ITD/ILD/HRTF
- [../knowledge/sound/SOUND_DESIGN_LIBRARY.md](../knowledge/sound/SOUND_DESIGN_LIBRARY.md)
- [../knowledge/audio-engineering/README.md](../knowledge/audio-engineering/README.md) — equal-loudness, masking (Moore), ducking LD (Torcoli 2019), ลำโพงมือถือ
- [../knowledge/audio-engineering/MIX_PLAYBOOK.md](../knowledge/audio-engineering/MIX_PLAYBOOK.md)
- [../knowledge/music/README.md](../knowledge/music/README.md)
- `story-clips/_craft/FX.md` Part 2 (5 layers, sync rules, ระดับ mix, silence)

**Key ที่ใช้ซ้ำจาก registry:** `ISO2023_226`, `ITU2023_BS1770_5`, `EBU2020_R128`, `web:tech.ebu.ch:278` (EBU Tech 3341), `Cwiek2022`, `Gernsbacher2015`
ค่าเหล่านี้อยู่ในโมดูลเดิม (อ้างด้วยลิงก์ ไม่ได้ใส่ key ในไฟล์นี้เพราะไม่ได้เปิดอ่านซ้ำในรอบนี้):
- Torcoli 2019 (LD ≥ 10 LU เพลง / ≥ 15 LU ambience)
- ITU-R BT.1359 (+45/−125 ms)
- Wallace & Stevenson 2014 (temporal binding window)
- Neuhoff 1998 (rising tones)
- Moore (upward spread of masking)

**ป้ายกำกับ:**
- **FACT** = ผลซ้ำได้ดี
- **THEORY** = โมเดล อาจยังเถียงกัน
- **PRACTICE** = ธรรมเนียมช่าง
- **OPINION** = ความเห็น
- **(craft)** = ไม่ใช่ผลวิจัย
- **(our test)** = ทดลองของเราเอง
- **(our calc)** = คำนวณจากตัวเลขในแหล่ง

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 จากฟิสิกส์ของโทนสู่ "ความรู้สึก" ของเสียง (1863–1933)
- **Helmholtz** — *Die Lehre von den Tonempfindungen* (1863); Ellis แปลเป็นอังกฤษ 1875 จากฉบับเยอรมันพิมพ์ครั้งที่ 3 และปรับตามฉบับที่ 4 ในปี 1885 [Helmholtz1875_SensationsTone]
  - งานนี้วางรากว่า **timbre มาจากองค์ประกอบ harmonics** และความกระด้างของ dissonance มาจาก beats/roughness
  - ทฤษฎี "resonance-place" ของเขาถูกแทนที่ในรายละเอียดภายหลัง แต่กรอบคิด "หูวิเคราะห์ความถี่" ยังอยู่
  - access ของแหล่งนี้คือ bibliographic เราไม่ได้อ่านเนื้อหาซ้ำในรอบนี้
- **Fletcher & Munson (1933, Bell Labs)** [FletcherMunson1933_Loudness] เปลี่ยนคำถามจาก "เสียงแรงแค่ไหน" เป็น "คนได้ยินดังแค่ไหน"
  - นิยาม **loudness level** ของเสียงใด ๆ = ระดับความเข้ม (intensity level) ของโทน 1000 Hz อ้างอิงที่ฟังแล้ว "ดังเท่ากัน" (ผู้ฟังหันหน้าหาแหล่งเสียงขนาดเล็ก ฟังสองหู)
  - ให้เหตุผลว่าถ้าความดังขึ้นกับความเข้มอย่างเดียว การวัดทางฟิสิกส์ก็จะบอกความดังได้เลย ซึ่งไม่เป็นเช่นนั้น
  - งานนี้ให้ **equal-loudness contours** ชุดแรก ("Fletcher–Munson curves")
  - ภายหลังมีการวัดซ้ำ: Churcher & King 1937 ได้ผลต่างมาก; Robinson & Dadson 1956 กลายเป็นฐานของ ISO 226 (ตามแหล่งรองที่ค้นพบ)

### 1.2 สเกลของความรู้สึก (1957–1961)
- **Stevens (1957)** [Stevens1957_PsychophysicalLaw] ฟื้น **power law**: ความรู้สึก = k·(สิ่งเร้า)^n
  - ใช้ magnitude estimation ทำให้ความดังกลายเป็นมาตรวัดแบบอัตราส่วน (ฐานของหน่วย **sone**)
  - เขาจัดความดังเป็นต่อเนื่องแบบ *prothetic* (Class I): JND มีขนาดทางความรู้สึกโตขึ้นเมื่อสูงขึ้นในสเกล
  - แหล่งรองระบุ exponent ของความดังราว 0.67 เทียบกับ sound pressure (โทน 3 kHz)
  - คำวิจารณ์: วิธีเฉลี่ยข้ามผู้ร่วมทดลองแล้ว fit ฟังก์ชันไม่ได้พิสูจน์กฎโดยตรง
- **Zwicker (1961)** [Zwicker1961_CriticalBands] แบ่งย่านความถี่ที่ได้ยินเป็น **24 critical bands (Bark)**
  - แถบกว้างราว 100 Hz ต่ำกว่า ~500 Hz และกว้างขึ้นเกือบเป็นสัดส่วนเหนือจากนั้น (ตามแหล่งรอง)
  - แนวคิดนี้อธิบายทั้ง masking และการรวมความดัง: เสียงในแถบเดียวกัน "แย่งพื้นที่" กัน
  - ตำรามาตรฐานรุ่นหลังคือ Fastl & Zwicker [FastlZwicker2007_Psychoacoustics]

### 1.3 จากโทนบริสุทธิ์สู่ "ฉากเสียง" (1976–1990)
- **McGurk & MacDonald (1976)** [McGurkMacDonald1976]
  - เสียง [ba] ที่พากย์ทับปากที่พูด [ga] ถูกได้ยินเป็น [da]
  - เป็นหลักฐานคลาสสิกว่าการได้ยินคำพูดเป็นเรื่องหลายประสาทสัมผัส (multisensory)
- **Bregman (1990)** [Bregman1990_ASA] ตั้งสาขา **auditory scene analysis**
  - สมองจัดองค์ประกอบเสียงเป็น "stream" ต่อแหล่งเสียง ทั้งแบบเรียงตามเวลา (sequential) และแบบพร้อมกัน (simultaneous)
  - ตัวอย่างคลาสสิก: โทนสลับสูง-ต่ำแยกเป็นสองทำนองเมื่อห่างกันมากหรือเร็วพอ
  - การเปลี่ยนโฟกัสจากโทนเดี่ยวไปสู่ "ฉาก" คือสิ่งที่งานมิกซ์ทำอยู่ทุกวัน

### 1.4 มาตรฐานความดังสมัยใหม่ (2010–2023)
- **EBU R128** [EBU2020_R128] เปลี่ยนการ normalize จาก peak เป็น **programme loudness**
  - R128 ระบุเองว่า peak normalisation ทำให้ความดังกระโดด
  - relative gate เปลี่ยนจาก −8 เป็น −10 LU ในปี 2010
- **EBU Tech 3341** [web:tech.ebu.ch:278] กำหนดมิเตอร์ "EBU Mode" (Momentary / Short-term / Integrated)
- **ITU-R BS.1770** (ฉบับ -5, 11/2023) [ITU2023_BS1770_5] คืออัลกอริทึมกลางที่ทุกมาตรฐานอ้าง
- **ISO 226:2023** [ISO2023_226] คือ equal-loudness contours ฉบับที่ 3 ต่างจากปี 2003 ไม่เกิน 0.6 dB
- ทางกฎหมาย: สหรัฐฯ ออก **CALM Act** (15 ธ.ค. 2010) หลังผู้บริโภคร้องเรียนโฆษณาดัง [FCC_CALM] ดู §8

### 1.5 คลื่น "crossmodal" และ "sensory experience" (2009–2023)
- **Spence (2011)** [Spence2011_Crossmodal] รวบรวม crossmodal correspondences เป็นทฤษฎีสามชนิด
- **Parise & Spence (2009)** [PariseSpence2009_BirdsFeather] ให้หลักฐาน psychophysics ครั้งแรกว่าความเข้ากัน (congruency) ทำให้ภาพ-เสียง "หลอมรวม" แน่นขึ้น
- **Palmer et al. (2013)** [Palmer2013_MusicColor] แสดงว่าการจับคู่ดนตรี-สี ผ่านอารมณ์
- **Ćwiek et al. (2022)** [Cwiek2022] ยืนยัน bouba/kiki ใน 25 ภาษา
- ฝั่งตลาด: "sonic seasoning" ถูกใช้ในแคมเปญราว 30 ชิ้น ช่วงปี 2011–2021 [Spence2021_SonicSeasoningCommercial]

### 1.6 ASMR และการเข้าถึง (2015–2024)
- **ASMR** เริ่มจากชุมชนออนไลน์:
  - งานวิชาการชิ้นแรก Barratt & Davis 2015 [BarrattDavis2015_ASMR]
  - การวัด physiology ชิ้นแรก Poerio et al. 2018 [Poerio2018_ASMR]
  - systematic review: Lohaus et al. ตีพิมพ์ออนไลน์ 2023 [Lohaus2023_ASMRReview]
- **ฝั่ง accessibility:**
  - Gernsbacher 2015 สรุปว่า captions ช่วยความเข้าใจ [Gernsbacher2015]
  - WHO World report on hearing 2021 [WHO2021_WorldReportHearing]
  - ข้อมูลไทย Bangkok 2024 [Ruencharoen2024_BangkokHearing]
  - ข้อมูลการดูแบบปิดเสียงบนโซเชียล (สหรัฐฯ 2019) [VerizonPublicis2019_SoundOff]

**สรุปการเปลี่ยนแปลงของแนวคิด:**
- เดิมถามว่า "ความถี่/ความแรงคืออะไร" (ฟิสิกส์)
- จากนั้นถามว่า "คนรับรู้ความดัง/ความถี่อย่างไร" (psychophysics)
- ต่อมาถามว่า "สมองจัดฉากเสียงหลายแหล่งอย่างไร" (ASA)
- ล่าสุดถามว่า "เสียงรวมกับภาพ/รส/สัมผัสเป็นประสบการณ์เดียวอย่างไร และทุกคนเข้าถึงได้ไหม" (multisensory + accessibility)

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 Level ≠ Loudness
- **Level** (dB SPL, dBFS) เป็นค่าทางกายภาพ
- **Loudness** เป็นความรู้สึกที่ขึ้นกับความถี่ ระยะเวลา แบนด์วิดท์ และระดับที่เปิดฟัง [FletcherMunson1933_Loudness]
- **FACT**

**phon กับ sone**
- **phon** = loudness level: เสียงที่ "ดังเท่า" โทน 1 kHz ที่ X dB มีค่า X phon
- **sone** = สเกลอัตราส่วน: 2 sone ดังเป็นสองเท่าของ 1 sone
- จาก exponent ~0.67 (เทียบ pressure) การเพิ่ม 10 dB ≈ ความดังเพิ่ม ~2.1 เท่า (3.16^0.67) **(our calc)** จากค่าในแหล่งรองของ [Stevens1957_PsychophysicalLaw]
- ผลเชิงปฏิบัติ: duck เพลง −10 dB ≈ "เบาลงครึ่งหนึ่ง" ในความรู้สึก ไม่ใช่ "นิดเดียว"
- ความมั่นใจ: medium เพราะ exponent ขึ้นกับความถี่และบริบท

**Equal-loudness (ISO 226:2023)** [ISO2023_226]
- หูต้องการระดับมากขึ้นที่ความถี่ต่ำมากและสูงมากเพื่อให้ "ดังเท่ากัน"
- ความต่างนี้ชันขึ้นเมื่อเปิดเบา
- ขอบเขตของ contours ในมาตรฐาน:
  - โทนบริสุทธิ์ 20 Hz–12.5 kHz
  - ผู้ฟังหูปกติอายุ 18–25 ปี
  - คลื่นระนาบจากด้านหน้า ฟังสองหู
- **ข้อจำกัดสำคัญ:** ไม่ได้ออกแบบมาสำหรับเสียงรายการที่ซับซ้อน หรือผู้ฟังสูงวัย

### 2.2 Critical band, masking

**Simultaneous masking**
- เสียงดัง (masker) ทำให้เสียงเบาในแถบความถี่ใกล้กันได้ยินยากขึ้น
- ผลแรงสุดภายใน critical band เดียวกัน [Zwicker1961_CriticalBands]
- masking แผ่ไปทางความถี่สูงมากกว่าทางต่ำ (upward spread; Moore ใน [M24 README §2.5](../knowledge/audio-engineering/README.md))
- **FACT**

**Temporal masking**
- เสียงดังกลบเสียงที่ตามมา (forward/post-masking) ได้นานถึง ~200 ms หลัง masker จบ
- กลบเสียงก่อนหน้า (backward/pre-masking) ได้เพียง ~5–20 ms [FastlZwicker2007_Psychoacoustics]
- **FACT** (หลักการ) / medium (ตัวเลข) เพราะตัวเลขมาจากแหล่งรองและเปลี่ยนตามระดับเสียง

**ผลต่องาน: ทำไม ducking ได้ผล** (กลไกสามชั้น)
1. ลดระดับ bed ในแถบเดียวกับพยัญชนะ → ลด simultaneous masking
2. ความดังรับรู้แบบ power law → การลด 8–12 dB เปลี่ยนความรู้สึกมาก แต่เพลงยัง "อยู่"
3. ASA: เมื่อ VO ต่างจาก bed ชัด (ระดับ, timbre, onset) สมองแยก stream ได้ง่าย [Bregman1990_ASA]
- ตัวเลข LD ที่ใช้อยู่ (≥ 10 LU เพลง, ≥ 15 LU ambience) มาจาก Torcoli 2019 ใน [MIX_PLAYBOOK §0](../knowledge/audio-engineering/MIX_PLAYBOOK.md)
- สำหรับผู้ฟังที่หูไม่ดี WCAG แนะนำ background ต่ำกว่าเสียงพูด **≥ 20 dB** [W3C_WCAG22_SC147]

### 2.3 Loudness metering: แต่ละตัววัดอะไร

**ITU-R BS.1770** [ITU2023_BS1770_5]
- ขั้นตอน: K-weighting (shelving ที่จำลองผลของศีรษะ + high-pass RLB) → mean square ต่อ channel → ถ่วงน้ำหนักแล้วรวม (ไม่นับ LFE) → gating
- หน่วย LUFS/LKFS
- เป็น "โมเดลง่าย" ของความดัง: ไม่จำลอง masking และไม่ใช่รูปร่าง ISO 226 เต็ม

**True peak (dBTP)**
- วัดด้วย oversampling + interpolation เพราะ peak อาจอยู่ระหว่าง sample [ITU2023_BS1770_5]
- (แหล่งรองระบุ oversampling ×4)

**EBU Tech 3341** [web:tech.ebu.ch:278]

| มิเตอร์ | หน้าต่าง | gated? | ใช้ทำอะไร |
|---|---|---|---|
| Momentary (M) | 0.4 s sliding | ไม่ | จับ SFX/hit ที่ดังพุ่ง |
| Short-term (S) | 3 s sliding | ไม่ | ดูความดังช่วงประโยค/ท่อน |
| Integrated (I) | ทั้งรายการ | gate absolute −70 LUFS แล้ว relative −10 LU บน block 400 ms (overlap 75%) | ค่าส่งมอบ (เช่น −14 LUFS) |
| LRA | จากค่า short-term | — | ความกว้าง dynamics; **R128 ไม่แนะนำสำหรับรายการ < 1 นาที** [EBU2020_R128] |

ผลสำคัญต่อคลิปสั้น:
- **ความเงียบที่ออกแบบไว้แทบไม่ดึงค่า Integrated ลง** เพราะถูก gate ออก [web:tech.ebu.ch:278]
- LRA ของคลิป 15–30 วิ ไม่น่าเชื่อถือ [EBU2020_R128]
- **FACT** (มาตรฐาน)

### 2.4 Speech intelligibility in noise

**SNR (signal-to-noise ratio)**
- QuickSIN วัด SNR ที่ทำให้เข้าใจคำสำคัญ 50% ในเสียง babble 4 คน [Killion2004_QuickSIN]
- แหล่งรองระบุว่าคนหูปกติต้องการราว **+2 dB SNR** สำหรับ 50%
- "SNR loss" = จำนวน dB ที่คนหูเสียต้องการเพิ่ม
- 50% เป็นระดับที่ฟัง **ลำบาก** ไม่ใช่สบาย → เป้าของสื่อต้องสูงกว่ามาก (10–20 dB)
- **FACT** (หลักการ)

**Lombard effect**
- คนพูดดังขึ้นและเปลี่ยนวิธีพูดเมื่ออยู่ในเสียงดัง พบในสัตว์หลายกลุ่ม [BrummZollinger2011_Lombard]
- ผลต่องาน: เสียง TTS ที่สังเคราะห์ "เหมือนพูดในห้องเงียบ" แล้ววางบนฉากตลาดดัง ฟังผิดธรรมชาติ **(craft inference)**

**STI (Speech Transmission Index; IEC 60268-16)**
- เป็นดัชนีวัดความชัดของระบบเสียง
- ฉบับ 2020 ไม่ได้ให้เกณฑ์รับรองแต่มีค่าตัวอย่างใน Annex
- เราไม่ได้อ่านตารางค่า จึงไม่ใส่ตัวเลข (และไม่ได้ใส่ใน sources)

### 2.5 Multisensory integration
- **McGurk**: ภาพปากเปลี่ยนพยางค์ที่ได้ยิน [McGurkMacDonald1976] (FACT ในเชิงปรากฏการณ์ แต่ความแรงต่างกันมากระหว่างบุคคล)
- **Ventriloquism**: ตำแหน่งเสียงถูก "ดึง" ไปที่ภาพเมื่อภาพระบุตำแหน่งได้ชัดกว่า [AlaisBurr2004_Ventriloquist]
  - ถ้าภาพเบลอมาก เสียงกลับดึงภาพ
  - ช่วงกลาง: รับรู้ตามค่าเฉลี่ยถ่วงน้ำหนักด้วยความน่าเชื่อถือ (MLE)
- **ช่วงเวลา sync** (ค่า ms ที่มีแหล่ง):
  - EBU R37: ปลายทางยอมให้เสียง **นำภาพได้ไม่เกิน 40 ms** และ **ตามหลังได้ไม่เกิน 60 ms** [EBU2007_R37]
    - แต่ละขั้นของสายผลิต: เร็ว 5 ms ถึงช้า 15 ms
    - ค่ามาจากจุดที่ผู้ชม 50% เริ่มสังเกตเห็น
  - van Wassenhove et al.: McGurk fusion ยังเกิดตั้งแต่ราว **−30 ms (เสียงนำ) ถึง +170 ms (เสียงตาม)** = หน้าต่างไม่สมมาตรราว 200 ms [vanWassenhove2007_TWI]
  - ค่า BT.1359 (+45/−125 detect) อยู่ใน [sound/README §2.4](../knowledge/sound/README.md)
  - แปลงเป็นเฟรม 30 fps (33.3 ms/เฟรม) **(our calc)**:
    - เสียงเร็วได้ ≤ 1 เฟรม
    - เสียงช้าได้ ≤ ~2 เฟรมตามมาตรฐานออกอากาศ และการหลอมรวมของคำพูดยังรับได้ถึง ~5 เฟรม
- **FACT** (ความไม่สมมาตร: เสียงช้ายอมได้มากกว่าเสียงเร็ว)

### 2.6 Crossmodal correspondences
- **นิยาม:** ความสัมพันธ์ที่คนส่วนใหญ่จับคู่ระหว่างคุณสมบัติของประสาทสัมผัสต่างกัน [Spence2011_Crossmodal]
- **ตัวอย่างหลัก** (FACT ในเชิงพฤติกรรม):
  - เสียงสูง ↔ เล็ก, สว่าง, อยู่สูง
  - เสียงดัง ↔ ใหญ่, สว่าง
- **bouba/kiki** — FACT ข้ามวัฒนธรรมในระดับหนึ่ง [Cwiek2022]
  - คำ/เสียงกลมมน (b, m, o, u) ↔ รูปทรงกลม
  - เสียงแหลม/หยุดกระทันหัน (k, t, i) ↔ รูปทรงแหลม
- **ดนตรี ↔ สี:** เร็ว + major ↔ สีสว่าง อิ่ม เหลือง; ช้า + minor ↔ มืด หม่น ฟ้า [Palmer2013_MusicColor]
- **sonic seasoning:** การจับคู่เสียงกับรสโดยตั้งใจ [Spence2021_SonicSeasoningCommercial]

### 2.7 Timbre และอารมณ์
- **Timbre** = "สีเสียง" ที่เหลือเมื่อ pitch/ความดัง/ความยาวเท่ากัน
- มิติที่วัดได้:
  - **brightness / spectral balance** (สัดส่วนพลังงานความถี่สูงต่อต่ำ)
  - **attack** (ความชันตอนเริ่มเสียง)
  - **spectral flux** (การเปลี่ยนสเปกตรัม)
  - **roughness** (amplitude modulation เร็ว ~30–150 Hz)
- Eerola et al.: เสียงเครื่องดนตรีเดี่ยว (pitch/ความยาว/ความดังเท่ากัน) ถูกให้คะแนน valence/energy ได้สม่ำเสมอ [Eerola2012_TimbreAffect]
  - feature ไม่กี่ตัวอธิบายได้ 50–57%
  - **valence สัมพันธ์ทางลบกับสัดส่วนพลังงานความถี่สูง (r = −.74)** = ยิ่ง "สว่าง/แหลม" ยิ่งน่าฟังน้อยลง
  - attack/flux สัมพันธ์กับ energy arousal
- **Roughness** คือ "ช่องเฉพาะ" ของเสียงกรีดร้องและสัญญาณเตือน [Arnal2015_Screams]
  - เสียงพูดปกติ modulate ราว 4–5 Hz
  - ยิ่งหยาบยิ่งถูกให้คะแนนว่าน่ากลัว และ amygdala ตอบสนองมากขึ้น

### 2.8 Attention capture
- **Onset/novelty:** เสียงแปลกใหม่ที่ไม่เกี่ยวกับงานทำให้ตอบสนองต่องานภาพช้าลง 17 ms [Escera1998_Novelty]
  - กลไก: ตัวจับ onset (N1) และตัวจับการเปลี่ยนแปลง (MMN ~150 ms)
  - เป็นการดึงความสนใจ "โดยไม่ตั้งใจ"
- **Rising intensity:** เสียงที่ดังขึ้นกระตุ้น orienting reflex และ amygdala มากกว่าเสียงที่เบาลง [Bach2008_RisingIntensity]
  - ต่อยอดจาก looming bias ใน [sound/README §2.7](../knowledge/sound/README.md)
- **FACT** (ในห้องทดลอง)

### 2.9 ASMR
- **ASMR** = ความรู้สึกซ่า (tingling) ที่หนังศีรษะ/คอ ตอบสนองต่อ trigger
- trigger ที่พบบ่อยที่สุด [BarrattDavis2015_ASMR]:
  - กระซิบ 75%
  - personal attention 69%
  - เสียงกรอบ/เคาะ 64%
  - การเคลื่อนไหวช้า 53%
- ผลวัดในห้องทดลอง [Poerio2018_ASMR]:
  - **เฉพาะคนที่มี ASMR**: อารมณ์ดีขึ้น
  - หัวใจเต้นช้าลงเฉลี่ย 3.41 bpm และ skin conductance เพิ่ม = ผ่อนคลายแต่ตื่นตัวไปพร้อมกัน

### 2.10 Accessibility และการดูแบบปิดเสียง
- WHO ประมาณว่าปี 2050 คนราว **2.5 พันล้าน (1 ใน 4)** จะมีการสูญเสียการได้ยินระดับใดระดับหนึ่ง [WHO2021_WorldReportHearing]
- **ข้อมูลไทย:**
  - Bangkok 2024: hearing loss 53.02% ในผู้ใหญ่อายุ 15–96 (เกณฑ์ >25 dB HL ที่ความถี่ใดก็ได้) [Ruencharoen2024_BangkokHearing]
  - ผู้สูงอายุ 60+ สี่จังหวัด: hearing disability 38.34% [Chayaopas2021_ThaiElderlyHearing]
- **การดูแบบปิดเสียง:**
  - สหรัฐฯ เมษายน 2019: 69% ดูวิดีโอแบบปิดเสียงในที่สาธารณะ, 25% ในที่ส่วนตัว [VerizonPublicis2019_SoundOff]
  - ฝั่ง TikTok อ้างว่า 88% ผู้ใช้บอกว่าเสียง "vital" (Nielsen กรกฎาคม 2020) [TikTok2021_EvolutionSound]
- **Captions:** งานกว่า 100 ชิ้นพบว่า captions ช่วยความเข้าใจ ความสนใจ และความจำ [Gernsbacher2015]

### 2.11 Silence
- ช่วงหยุด 2 นาทีระหว่างเพลง ทำให้หัวใจเต้นช้าลง ความดันลดลง และการหายใจลดลง **ต่ำกว่า baseline** [Bernardi2006_Silence]
- ความเงียบหลังเสียงจึงเป็นเครื่องมือผ่อนคลายที่ "แรง" กว่าเงียบตั้งแต่ต้น
- ดู silence design ใน [sound/README §2.10](../knowledge/sound/README.md)

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 Cue integration แบบ Bayesian/MLE (THEORY ที่มีหลักฐานแข็ง)
- **หลัก:** สมองรวมสัญญาณจากหลายประสาทสัมผัสโดยถ่วงน้ำหนักตาม **ความน่าเชื่อถือ (1/variance)** ของแต่ละสัญญาณ
- **หลักฐาน:** Alais & Burr แสดงว่า ventriloquism ไม่ใช่ "ภาพชนะเสมอ" [AlaisBurr2004_Ventriloquist]
  - เมื่อภาพเบลอพอ เสียงกลับเป็นฝ่ายชนะ
  - ความแม่นยำของการรวมดีกว่าประสาทสัมผัสใดประสาทเดียว
- **ส่วนต่อขยาย: "coupling prior"**
  - สมองมีความเชื่อล่วงหน้าว่าสัญญาณสองอย่างมาจากแหล่งเดียวกันหรือไม่
  - คู่ที่ "เข้ากัน" ตาม correspondence (เสียงต่ำ + วัตถุใหญ่) มี prior แรงกว่า → หลอมรวมแน่นกว่า
  - ผลข้างเคียง: คนจับความคลาดเคลื่อนเวลา/ตำแหน่งได้แย่ลง [PariseSpence2009_BirdsFeather]
  - Spence อธิบาย statistical correspondences ด้วยกรอบนี้ [Spence2011_Crossmodal]
- **ผลต่องาน:** SFX ที่ "เข้ากับ" วัตถุ (ขนาด, วัสดุ, รูปทรง) ช่วยกลบ sync error เล็ก ๆ ได้ด้วย ส่วน SFX ที่ไม่เข้ากันทำให้ error เด่นขึ้น **(inference จากผลวิจัย; ยังไม่มีการทดสอบตรงกับคลิป)**

### 3.2 สามชนิดของ crossmodal correspondence (THEORY, Spence 2011)

| ชนิด | ตัวอย่าง | กำเนิด (ตาม Spence) | นัยต่องาน |
|---|---|---|---|
| Structural | loudness–brightness | อาจมีมาแต่กำเนิด เกิดจากการเข้ารหัส "ขนาด" ในระบบประสาท (Stevens: ความเข้มสูง = firing มาก) | ใช้ได้กว้างที่สุด ข้ามวัฒนธรรม |
| Statistical | pitch–elevation, pitch–size, loudness–size | เรียนรู้จากความสม่ำเสมอของโลก (ของใหญ่สั่นช้า → เสียงต่ำ) | ค่อนข้างสากล แต่สัมพัทธ์ต่อชุดสิ่งเร้า |
| Semantic | pitch "สูง/ต่ำ" ↔ ตำแหน่งสูง/ต่ำ | ผ่านภาษา เกิดหลังพัฒนาการด้านภาษา | **ขึ้นกับภาษา** — ต้องเช็กกับภาษาไทย |

[Spence2011_Crossmodal]
- **ข้อถกเถียง:** แยกชนิดได้ยากในทางปฏิบัติ คำอธิบายเชิงภาษา (linguistic mediation) อธิบายผลหลายอย่างได้พอ ๆ กัน (Spence ยอมรับเอง)
- **ข้อสังเกตจากเรา:** ภาษาไทยก็ใช้ "เสียงสูง/ต่ำ" แต่คำว่า "สูง/ต่ำ" ในไทยยังใช้กับ **วรรณยุกต์** (เสียงสูง = tone class) ด้วย ผลนี้อาจซ้อนกัน **(opinion; ยังไม่มีงานไทยในแหล่งรอบนี้)**

### 3.3 Emotional mediation vs direct mapping (THEORY, contested)
- **ฝั่ง mediation:** Palmer et al. เสนอว่าการจับคู่ดนตรี-สี **ผ่านอารมณ์ร่วม** [Palmer2013_MusicColor]
  - สหสัมพันธ์ระหว่างอารมณ์ของเพลงกับอารมณ์ของสีที่เลือก 0.89–0.99 ทั้งในสหรัฐฯ และเม็กซิโก
- **ฝั่งค้าน/ขยาย:**
  - งานติดตามกับ synaesthete (ตามรายงานข่าว) เสนอว่าคนกลุ่มนั้นจับคู่ตรงจากเสียงไปสี ไม่ผ่านอารมณ์
  - การทดสอบใช้เพลงคลาสสิกตะวันตกเท่านั้น
- **ผลต่องาน:** ให้เลือก **อารมณ์เป้าหมายก่อน** แล้วเลือกทั้ง grade สีและเสียงจากอารมณ์นั้น อย่าเลือกสีจากเสียงตรง ๆ (หรือกลับกัน)
- ความมั่นใจ: medium

### 3.4 Auditory scene analysis กับการมิกซ์ (THEORY, คลาสสิก)
- **หลักของ Bregman** [Bregman1990_ASA]: สมองใช้ "เบาะแส" จัดกลุ่มเสียงเป็นแหล่งเดียวกัน
  - onset/offset พร้อมกัน
  - harmonicity (ฮาร์มอนิกเป็นชุดเดียวกัน)
  - ตำแหน่งเดียวกัน
  - การเปลี่ยนต่อเนื่อง (ความถี่/timbre ค่อย ๆ เปลี่ยน)
  - ความใกล้กันของ pitch และเวลา
- **การแปลเป็นการมิกซ์ (PRACTICE จาก THEORY):**
  - VO ต้อง "แยก stream" จาก bed: register ต่าง, timbre ต่าง (แห้ง/ใกล้ vs เปียก/ไกล), onset ไม่ตรงกับ transient ของเพลง
  - SFX ที่ตั้งใจให้ "เป็นของวัตถุ" ต้องมี onset ตรงกับภาพ (เบาะแส onset ร่วม)
  - เสียงที่ไม่อยากให้เด่น (ambience) ควรต่อเนื่อง ไม่มี onset ชัด
- **ข้อจำกัด:** เราอ่านได้แค่ข้อมูลเชิงบรรณานุกรม (bibliographic) รายละเอียดเป็นความรู้ทั่วไปของสาขา ต้องอ่านตัวหนังสือจริงก่อนอ้างเชิงลึก

### 3.5 ทำไมเสียงหยาบ/ดังขึ้นจึง "จับ" เรา (THEORY, วิวัฒนาการ — contested)
- **Arnal et al.:** roughness (30–150 Hz AM) เป็นช่องที่เสียงพูดปกติไม่ใช้ จึงเป็น "ช่องสัญญาณเตือนภัย" ที่ไม่ชนกับการสื่อสารปกติ [Arnal2015_Screams]
  - สัญญาณเตือนที่มนุษย์ออกแบบเองก็มาตกในช่องนี้
- **Bach et al.:** rising intensity เป็น "warning cue" พื้นฐาน [Bach2008_RisingIntensity]
- **ข้อถกเถียง:** คำอธิบายเชิงวิวัฒนาการของ looming bias ถูกท้าทายด้วยคำอธิบายแบบ speed prior (ดู [sound/README §3](../knowledge/sound/README.md))
  - ผลทางพฤติกรรมซ้ำได้ แต่ "ทำไม" ยังเปิดอยู่

### 3.6 Involuntary attention: ต้นทุนของ "hook เสียง" (THEORY + FACT)
- Escera et al. แยกกลไกไว้สองแบบ [Escera1998_Novelty]:
  - **transient detector**: ตอบ onset ใหม่
  - **change detector**: ตอบสิ่งที่ผิดจากรูปแบบ (MMN)
- ทั้งสองแบบ **ขโมยทรัพยากรจากงานภาพ** (ตอบสนองช้าลง, ถูกน้อยลง)
- **นัย:**
  - เสียง onset แรงตอนต้นคลิปดึงความสนใจได้จริง
  - แต่ถ้าวางพร้อมข้อความที่ต้องอ่าน จะ **ลด** การอ่าน
  - วาง hit ก่อนข้อความ ~200–300 ms แล้วค่อยให้ข้อความขึ้น **(craft inference จาก latency ของ P3a 230–315 ms)**

### 3.7 ASMR: relaxation หรือ arousal? (THEORY, กำลังพัฒนา)
- **Barratt & Davis** เสนอว่า ASMR เป็นสภาวะคล้าย flow [BarrattDavis2015_ASMR]
- **Poerio et al.** พบทั้ง HR ลดลง (ผ่อนคลาย) และ SC เพิ่มขึ้น (ตื่นตัว) พร้อมความรู้สึก "connectedness" [Poerio2018_ASMR]
  - เป็นอารมณ์ผสม ไม่ใช่ "ผ่อนคลายล้วน"
  - ใช้ได้เฉพาะผู้ที่มี ASMR
- **Lohaus et al.** (systematic review, 54 การศึกษา): หลักฐานส่วนใหญ่มาจากตัวอย่างเล็กและขาดความหลากหลาย ยังไม่มีผลระยะยาว [Lohaus2023_ASMRReview]
- **ข้อถกเถียง:** ผู้ที่ไม่มี ASMR อาจรู้สึกเฉย ๆ หรือรำคาญ (การรายงานข่าวพูดถึง "relaxation or irritation") จึงไม่ควรใช้เป็นเครื่องมือหลักกับผู้ชมทั่วไป

### 3.8 Captions กับ cognitive load (THEORY, contested)
- **ฝั่งสนับสนุน:** Gernsbacher สรุปว่า captions ช่วยทุกกลุ่ม [Gernsbacher2015]
- **ฝั่งวิจารณ์:**
  - Andrew Watson (บล็อก Learning and the Brain) แย้งว่าหลักฐานส่วนใหญ่มาจากผู้ดูภาษาที่สอง ผู้เรียนที่ไม่ใช่ neurotypical นักศึกษา และการรายงานตนเอง
  - ไม่พบงานวัดผลเชิงวัตถุในผู้ดูภาษาแม่ทั่วไป (ระบุในข้อจำกัดของ [Gernsbacher2015])
  - อีกมุมจาก redundancy/split-attention ในทฤษฎีสื่อการเรียน: ข้อความซ้ำกับเสียงอาจเพิ่มภาระบางกรณี (ไม่ได้ใส่แหล่งรอบนี้ → **(opinion)**)
- **ข้อสรุปที่ปลอดภัย:** captions คุ้มแน่นอนสำหรับ **การเข้าถึง + การดูแบบปิดเสียง**; ผลต่อ "การเรียนรู้ของทุกคน" ยังไม่สรุป

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| key | พบ/เสนออะไร | tier | access |
|---|---|---|---|
| Helmholtz1875_SensationsTone | ตำราก่อตั้ง physiological acoustics; timbre = harmonics | A | bibliographic |
| FletcherMunson1933_Loudness | นิยาม loudness level เทียบโทน 1 kHz; equal-loudness contours ชุดแรก | A | abstract |
| Stevens1957_PsychophysicalLaw | power law; ความดังเป็น prothetic continuum | A | bibliographic |
| Zwicker1961_CriticalBands | 24 critical bands (Bark) | A | bibliographic |
| Bregman1990_ASA | auditory scene analysis, stream segregation | A | bibliographic |
| FastlZwicker2007_Psychoacoustics | ตำรามาตรฐาน; forward masking ~200 ms, backward ~5–20 ms (แหล่งรอง) | A | search_summary |
| ISO2023_226 | equal-loudness ฉบับ 3; 20 Hz–12.5 kHz; อายุ 18–25; ต่างจากเดิม ≤ 0.6 dB | S | search_summary |
| ITU2023_BS1770_5 | K-weighting + gating + true peak (oversampling) | S | search_summary |
| EBU2020_R128 | normalize ด้วย programme loudness; LRA ไม่แนะนำ < 1 นาที | S | full_text |
| web:tech.ebu.ch:278 | มิเตอร์ M 0.4 s / S 3 s / I gated (−70 LUFS, −10 LU) | S | full_text |
| EBU2007_R37 | sync ปลายทาง: เสียงนำ ≤ 40 ms, ตาม ≤ 60 ms; แต่ละขั้น +5/−15 ms | S | full_text |
| McGurkMacDonald1976 | ภาพปากเปลี่ยนพยางค์ที่ได้ยิน | A | search_summary |
| vanWassenhove2007_TWI | fusion −30 ถึง +170 ms; หน้าต่างไม่สมมาตร ~200 ms (n = 43) | A | abstract |
| AlaisBurr2004_Ventriloquist | การรวมแบบ near-optimal (MLE); ภาพเบลอแล้วเสียงชนะ | A | search_summary |
| Spence2011_Crossmodal | ทฤษฎี correspondences 3 ชนิด; binding constraint | A | full_text |
| PariseSpence2009_BirdsFeather | คู่ที่เข้ากันหลอมรวมแน่นกว่า (TOJ/spatial JND แย่ลง) | A | full_text |
| Cwiek2022 | bouba/kiki ใน 25 ภาษา 10 ระบบเขียน; ไม่ขึ้นกับตัวอักษร | A | abstract |
| Palmer2013_MusicColor | ดนตรี-สีผ่านอารมณ์ r 0.89–0.99 (สหรัฐฯ/เม็กซิโก) | A | abstract |
| Spence2021_SonicSeasoningCommercial | ~30 แคมเปญ sonic seasoning; มีหลักฐานวัดผลน้อย | B | full_text (บางส่วน) |
| Eerola2012_TimbreAffect | timbre ทำนาย valence/energy 50–57%; สว่างขึ้น → valence ต่ำลง (r −.74) | A | full_text |
| Arnal2015_Screams | roughness 30–150 Hz = ช่องสัญญาณเตือนภัย; amygdala | A | publisher_page |
| Bach2008_RisingIntensity | เสียงดังขึ้น = warning cue; orienting + amygdala | A | abstract |
| Escera1998_Novelty | เสียงแปลกใหม่ดึงความสนใจโดยไม่ตั้งใจ (+17 ms RT) | A | abstract |
| BrummZollinger2011_Lombard | ทบทวน 100 ปีของ Lombard effect | A | abstract |
| Killion2004_QuickSIN | SNR สำหรับเข้าใจคำ 50%; SNR loss | A | abstract |
| Meng2022_ToneNoise | tone ทนเสียงรบกวนกว่าพยัญชนะ (Mandarin) | A | abstract |
| Poerio2018_ASMR | ASMR: HR −3.41 bpm, SC เพิ่ม, เฉพาะผู้มี ASMR | A | full_text |
| BarrattDavis2015_ASMR | trigger: กระซิบ 75%, attention 69%, crisp 64%, ช้า 53% (n = 475) | B | full_text |
| Lohaus2023_ASMRReview | systematic review 54 การศึกษา; ไม่มีผลระยะยาว | S | search_summary |
| Bernardi2006_Silence | ช่วงหยุดลด HR/BP/การหายใจต่ำกว่า baseline | A | abstract |
| WHO2021_WorldReportHearing | 2.5 พันล้านคน (1 ใน 4) มีปัญหาการได้ยินภายในปี 2050 | S | publisher_page |
| Ruencharoen2024_BangkokHearing | กรุงเทพฯ: hearing loss 53.02% (15–96 ปี) | A | abstract |
| Chayaopas2021_ThaiElderlyHearing | ไทย 60+: hearing disability 38.34% | A | abstract |
| Gernsbacher2015 | captions ช่วยความเข้าใจ/ความสนใจ/ความจำ (>100 งาน) | A | full_text |
| VerizonPublicis2019_SoundOff | สหรัฐฯ 2019: 69% ปิดเสียงในที่สาธารณะ | C | publisher_page |
| TikTok2021_EvolutionSound | 88% บอกว่าเสียง vital (Nielsen 2020; แพลตฟอร์มจ้างวิจัย) | C | publisher_page |
| W3C_WCAG22_SC147 | background ≤ −20 dB ใต้เสียงพูด (AAA) | S | full_text |
| FCC_CALM | CALM Act 2010: โฆษณาห้ามดังกว่ารายการโดยเฉลี่ย | S | search_summary |
| ChangWang2019_Microspeaker | ลำโพงแท็บเล็ต: ขอบล่างจาก 630 Hz ขยายได้ถึง 300 Hz | A | abstract |
| Nolan_DialogueMix | ข่าวคำร้องเรียนบทพูดไม่ได้ยินใน Tenet/Interstellar | E | search_summary |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| ข้อกล่าวอ้าง | ความแรงหลักฐาน | หมายเหตุ / การซ้ำ |
|---|---|---|
| ความดังขึ้นกับความถี่และระดับ (equal-loudness) | **high** | วัดซ้ำตั้งแต่ 1933 จนถึงมาตรฐาน 2023 [FletcherMunson1933_Loudness][ISO2023_226]; ใช้กับโทนบริสุทธิ์และคนหนุ่มสาว |
| LUFS (BS.1770) ประมาณความดังของรายการได้ดีพอสำหรับ normalize | **high** (เชิงมาตรฐาน) | ใช้ทั่วโลก แต่เป็นโมเดลง่าย; เครื่องมือต่างกันอ่านค่าได้ต่าง ~1 LU (การทดลองของ M24) |
| masking แรงสุดในแถบเดียวกันและแผ่ขึ้นทางสูง | **high** | หลักคลาสสิก [Zwicker1961_CriticalBands][FastlZwicker2007_Psychoacoustics] |
| forward masking ~200 ms | **medium** | ตัวเลขจากแหล่งรอง ขึ้นกับระดับ/ระยะของ masker |
| ducking (LD ≥ 10 LU) ช่วยความเข้าใจ | **medium-high** | Torcoli 2019 (ดู M24); ความชอบของแต่ละคนต่างกันมาก; WCAG ใช้ 20 dB |
| คนหูปกติต้องการ ~+2 dB SNR สำหรับ 50% คำ | **medium** | การทดสอบทางคลินิก ภาษาอังกฤษ [Killion2004_QuickSIN]; ไม่ใช่เป้าความสบาย |
| tone ทนเสียงรบกวนกว่าพยัญชนะ | **medium** (Mandarin) / **low** (ไทย) | [Meng2022_ToneNoise] และงานอื่นในผลค้นหา; **ไม่พบงานภาษาไทยตรง** |
| เสียงช้ากว่าภาพยอมได้มากกว่าเสียงเร็ว | **high** | R37, BT.1359, van Wassenhove สอดคล้องกัน |
| McGurk effect | **high** (มีอยู่จริง) / **medium** (ความแรง) | ความแรงต่างกันมากตามบุคคล ภาษา และสิ่งเร้า; เป็น lab effect |
| Ventriloquism แบบ MLE | **high** | ซ้ำได้หลายงาน; n ต่องานเล็ก [AlaisBurr2004_Ventriloquist] |
| pitch–size/brightness/elevation correspondences | **high** (พฤติกรรม) | Spence review; อาจเป็นแบบสัมพัทธ์ |
| bouba/kiki ข้ามวัฒนธรรม | **high** | 25 ภาษา [Cwiek2022]; ความแรงต่างกันตามภาษา; ตัวเลข "95%" ที่แชร์กันไม่พบแหล่ง |
| ดนตรี-สีผ่านอารมณ์ | **medium** | สองวัฒนธรรม เพลงคลาสสิกเท่านั้น [Palmer2013_MusicColor] |
| sonic seasoning เปลี่ยนรสที่รับรู้ | **medium** (lab) / **low** (แคมเปญจริง) | Spence2021: มีแคมเปญที่วัดผลน้อยมาก; มี critique ว่าคำในการทดลองอาจชี้นำผล |
| timbre สว่างขึ้น → valence ต่ำลง | **medium** | เสียงเครื่องดนตรีเดี่ยว [Eerola2012_TimbreAffect]; ใน mix เต็ม ความ "ใส" อาจถูกอ่านต่างออกไป |
| roughness = น่ากลัว/เตือนภัย | **medium-high** | การให้คะแนน + fMRI [Arnal2015_Screams]; อ่านจาก press release |
| rising intensity ดึงความสนใจ | **high** (ผล) / **medium** (คำอธิบาย) | [Bach2008_RisingIntensity] + Neuhoff; กลไกวิวัฒนาการยังเถียงกัน |
| ASMR ผ่อนคลาย | **medium** (สำหรับผู้มี ASMR) / **low** (ผู้ชมทั่วไป) | ผลเล็ก (d ~0.4), กลุ่มคัดเลือกตัวเอง [Poerio2018_ASMR][Lohaus2023_ASMRReview] |
| silence หลังดนตรีผ่อนคลายต่ำกว่า baseline | **low-medium** | n = 24, กลุ่มเดียว [Bernardi2006_Silence]; ยังไม่พบการซ้ำในแหล่งรอบนี้ |
| captions ช่วยความเข้าใจ | **high** (L2, หูไม่ดี, เด็ก) / **medium** (ผู้ใหญ่ทั่วไป) | ดู critique §3.8 |
| 69% ปิดเสียงในที่สาธารณะ | **low-medium** | สำรวจในสหรัฐฯ อุตสาหกรรมจ้าง ปี 2019 รายงานผ่านผู้ขาย; ไม่มีข้อมูลไทย |
| 88% บอกเสียง vital บน TikTok | **low** | แพลตฟอร์มจ้างวิจัย ไม่มีขนาดตัวอย่าง [TikTok2021_EvolutionSound] |
| ลำโพงมือถือแทบไม่มีเบสต่ำกว่า ~300–600 Hz | **medium** | งานออกแบบชิ้นเดียว [ChangWang2019_Microspeaker] + patents; ยังขาดการวัดหลายรุ่น |

**ช่องว่างใหญ่:**
- ไม่มีงานวิจัยตรงของ psychoacoustics กับ **คลิปสั้นแนวตั้งบนลำโพงมือถือ**
- ไม่มีงานด้าน **ภาษาไทย** (tone + masking, captions ภาษาไทย, ความหมายวัฒนธรรมของเสียง)
- ไม่มีข้อมูล **sound-off ของผู้ชมไทย**

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 หลักทั่วไป (ใช้ได้ทุกงาน ทุกลูกค้า)
1. **ออกแบบให้ใช้ได้ทั้ง "เปิดเสียง" และ "ปิดเสียง"**
   - ข้อมูลสำคัญต้องมีอย่างน้อยสองช่องทาง (ภาพ/ข้อความ + เสียง)
   - เหตุผล: 69% ปิดเสียงในที่สาธารณะ (สหรัฐฯ 2019) [VerizonPublicis2019_SoundOff], captions ช่วยความเข้าใจ [Gernsbacher2015], 1 ใน 4 คนจะมีปัญหาการได้ยิน [WHO2021_WorldReportHearing]
2. **เสียงพูดชนะเสมอ**
   - LD ≥ 10 LU เหนือเพลง (M24); สำหรับงาน accessibility/ผู้สูงวัย ≥ 20 dB [W3C_WCAG22_SC147]
   - เหตุผลเชิงกลไก: masking + power law (§2.2)
3. **กันย่านพยัญชนะ (~2–5 kHz, craft)** ใน bed ขณะพูด แทนการลดทั้งเพลง
   - ผู้ฟังไทยก็ต้องได้ยินพยัญชนะ เพราะในภาษาวรรณยุกต์ tone ทนเสียงรบกวนได้ดีกว่าพยัญชนะ [Meng2022_ToneNoise] (Mandarin; ใช้กับไทยโดยอนุมาน)
4. **เว้นช่องหลัง hit ใหญ่ ≥ 150–200 ms** ก่อนคำสำคัญ (forward masking) [FastlZwicker2007_Psychoacoustics]
   - อย่าวางคำสำคัญคำแรกทับ impact
5. **sync:** เสียงเร็วกว่าภาพ ≤ 1 เฟรม (≤ 40 ms) และช้า ≤ 2 เฟรม (≤ 60 ms) [EBU2007_R37]
   - ถ้าไม่แน่ใจ ให้ **ช้าดีกว่าเร็ว** [vanWassenhove2007_TWI]
6. **จับคู่เสียงกับวัตถุตาม correspondence** [Spence2011_Crossmodal][PariseSpence2009_BirdsFeather]
   - เล็ก/เบา/สว่าง → เสียงสูง ใส สั้น
   - ใหญ่/หนัก/มืด → ต่ำ ยาว
   - กลม/นุ่ม → onset นุ่ม (bouba)
   - แหลม/คม → onset คม (kiki) [Cwiek2022]
7. **เลือกอารมณ์ก่อน แล้วค่อยเลือกสีและเสียงพร้อมกัน** [Palmer2013_MusicColor][Eerola2012_TimbreAffect]
   - สงบ/อบอุ่น = attack ช้า สเปกตรัมมืด/นุ่ม + สีอุ่นอ่อน
   - ตื่นตัว = attack เร็ว สว่าง + สีอิ่ม
8. **roughness / rising intensity = เครื่องมือเตือนภัย** [Arnal2015_Screams][Bach2008_RisingIntensity]
   - ใช้เฉพาะเมื่อต้องการความตึง/กลัว
   - ห้ามใช้ใต้เสียงพูดสงบ
9. **hook เสียง:** onset ที่ไม่คาดคิดดึงความสนใจได้จริง แต่ขโมยความสนใจจากการอ่าน [Escera1998_Novelty]
   - วาง hit **ก่อน** ข้อความ (ราว 200–300 ms, craft inference) ไม่ใช่พร้อมกัน
10. **ทดสอบบนลำโพงมือถือ** [ChangWang2019_Microspeaker]
    - อะไรที่อยู่ต่ำกว่า ~300 Hz อาจหายไป
    - น้ำหนักต้องมาจาก harmonics/ย่านกลาง (เช่น เติม transient "click" ให้ kick/sub hit)
    - วิธี preview ดูได้ใน [MIX_PLAYBOOK §6](../knowledge/audio-engineering/MIX_PLAYBOOK.md)
11. **ความเงียบหลังเสียงคือเครื่องมือผ่อนคลาย/เน้น** [Bernardi2006_Silence]
    - ความเงียบไม่ดึงค่า Integrated LUFS ลงมาก เพราะ gate [web:tech.ebu.ch:278]
    - เหลือ room tone ไว้เสมอ (M22)

### 6.2 สำหรับสตูดิโอ: Reels/TikTok ที่มีเสียง TTS (story clips ไทย, Hua Hin promo)
- **บท + captions burn-in เสมอ** (ภาษาไทยตามโปรเจกต์) ใน safe zone
  - เหตุผล: ผู้ชม FB/IG จำนวนมากปิดเสียง [VerizonPublicis2019_SoundOff]
  - ผู้ชมกลุ่มเป้าหมายร้านแว่น (สายตายาวตามวัย 40+, ผู้สูงอายุ) มีสัดส่วน hearing loss สูง: 60+ ราว 38% [Chayaopas2021_ThaiElderlyHearing]; กรุงเทพฯ odds เพิ่ม 8.56 เท่าที่อายุ 65+ [Ruencharoen2024_BangkokHearing]
- **คลิปกลุ่มผู้สูงวัย** (presbyopia, UV/ต้อเนื้อ): bed ใต้ VO ~15–20 dB (แทน 10–12) และ ambience ≥ 20 dB [W3C_WCAG22_SC147]
  - ตั้ง reverb ของ VO แห้ง
- **TTS ในฉากเสียงดัง** (ตลาด, ชายหาด): ถ้า TTS มีสไตล์ "พูดดังขึ้น/ชัดขึ้น" (เช่น direction "projecting") ให้ใช้ในฉากดัง ตามหลัก Lombard [BrummZollinger2011_Lombard]
  - หรือลด ambience ลงแทนการยก VO ให้ดังผิดธรรมชาติ **(craft)**
  - ดูวิธีกำกับเสียงใน `.claude/skills/ai-voice-director`
- **Lip-sync ของ rig** (`rig.js talk`):
  - ภาพตามเสียง (FX.md) และ offset ต้องอยู่ใน +40/−60 ms [EBU2007_R37]
  - ปากปิดสนิทตรงพยัญชนะ b/p/m (บ/ป/พ/ม) สำคัญที่สุด เพราะภาพปากเปลี่ยนสิ่งที่ได้ยิน [McGurkMacDonald1976]
  - **(craft inference)** ตัวละครไร้หน้าของ Mint & Tao ไม่มีปาก → ไม่มีความเสี่ยง McGurk แต่ก็ไม่ได้ช่วยความเข้าใจด้วย → captions จำเป็นกว่า

### 6.3 Beat clips (แว่น + kinetic type, ผู้ใช้ใส่เพลงเองภายหลัง)
- เพลงที่ผู้ใช้ใส่จะครองทั้งสเปกตรัม → SFX ของเราต้อง "อยู่ใน" เพลง ไม่ใช่สู้กับเพลง
  - ใช้ transient สั้น (≤ 150 ms) ย่านกลาง-สูง วางตรงจุดตัด/punch-in
  - หลีกเลี่ยง sub/boom ที่หายบนลำโพงมือถือ [ChangWang2019_Microspeaker] และจะชนกับเบสของเพลงที่เราไม่รู้
- **Correspondence ของสินค้า** [Spence2011_Crossmodal][PariseSpence2009_BirdsFeather]
  - กรอบโลหะบาง = "ting"/shimmer สูง ใส
  - acetate หนา = "tock" ทุ้ม นุ่ม
  - เลนส์ = shimmer เบา
  - เสียงต้อง "เข้ากับ" วัสดุ จะหลอมรวมกับภาพดีกว่า
- **sound-off ต้องเล่าได้:** ข้อความ kinetic ใน HTML layer ทำหน้าที่ "เสียง" อยู่แล้ว (house rule: images text-free, text in HTML) — จุด beat ต้องเห็นได้ด้วยตา (cut/scale pulse)
- ราคา/โปร: ห้ามใช้ roughness/alarm เพื่อ "เร่งด่วน" กับแบรนด์พรีเมียม → ใช้ rising + hit สั้น 1 ครั้ง [Bach2008_RisingIntensity] **(opinion: brand fit)**

### 6.4 Story clips SFX (eyesight, zombie, night-optic)
- **zombie/horror:**
  - roughness (growl, distorted, AM 30–150 Hz) คือเครื่องมือที่มีหลักฐาน [Arnal2015_Screams]
  - rising intensity ก่อน scare [Bach2008_RisingIntensity]
  - แล้วความเงียบ (silence before scare: FX.md 2.6)
- **heartwarming / night-optic:** timbre attack นุ่ม สเปกตรัมไม่แหลม [Eerola2012_TimbreAffect], ไม่มี roughness
- **ฉากที่ตัวละครเล็ก (Mint & Tao, แมว):** pitch สูง สั้น; ตัวใหญ่/ของหนัก: pitch ต่ำ (statistical correspondence)
- **เสียงข้ามฉาก:** ใช้ ASA cue — ambience ไม่มี onset ชัด (fade 300–600 ms) เพื่อไม่แย่งความสนใจจาก VO [Bregman1990_ASA]

### 6.5 Eye-break / calming clips (คลิปหลับตา 15 วิ)
- **ความขัดแย้งในตัว:** คลิปสั่งให้ "หลับตาแล้วฟัง" แต่ผู้ชมกลุ่มใหญ่ปิดเสียง [VerizonPublicis2019_SoundOff]
  - ต้องมีข้อความเปิด (มีอยู่แล้ว: "15 seconds · close your eyes and listen") บอกให้ **เปิดเสียง** ภายใน 1–2 วิแรก
  - หรือทำเวอร์ชันที่ทำตามได้ด้วยตา (person version) — ปัจจุบันมีทั้งสอง look ตาม skill `eye-break-clip`
- **เสียงผ่อนคลาย** [Eerola2012_TimbreAffect][Arnal2015_Screams][Bach2008_RisingIntensity][Escera1998_Novelty]
  - VO นุ่ม attack ช้า
  - bed สเปกตรัมมืด/นุ่ม (คลื่น ลม)
  - ไม่มี roughness
  - ไม่มี rising intensity
  - ไม่มี onset แปลกใหม่
- **tick ทุกวินาที** (มีใน `track15.wav`): เป็น onset ที่ **คาดเดาได้** จึงไม่ดึงความสนใจแบบ novelty (เทียบ Escera: เสียงที่ผิดจากรูปแบบคือตัวดึง)
  - ให้เบา และสม่ำเสมอเป๊ะ — tick ที่เพี้ยนจังหวะจะกลายเป็น deviant **(inference)**
- **ปิดท้ายด้วยความเงียบสั้น ๆ ก่อน "Open your eyes"** [Bernardi2006_Silence] (ช่วงหยุดผ่อนคลายต่ำกว่า baseline)
- **ASMR (กระซิบ, เสียงใกล้ไมค์)** ใช้ได้แค่ "เสริม" [Poerio2018_ASMR][Lohaus2023_ASMRReview]
  - ช่วยเฉพาะผู้มี ASMR
  - บนลำโพงมือถือเสียงกระซิบเบาและหาย → ห้ามใช้เป็นคำสั่งหลัก
- **binaural/stereo:** ถ้าจะใช้ ต้องบอก "ใช้หูฟัง" — ลำโพงมือถือ mono ทำให้ทิศหาย (M22 §2.12)

### 6.6 Carousel → Reel (Mint & Tao, เพลงใส่ในแอป)
- เสียงหนึ่งครั้งตอนเปลี่ยนสไลด์ทำให้ภาพนิ่ง "ขยับ" (synchresis, M22)
- ให้ onset ตรงเฟรมเปลี่ยน (≤ 1 เฟรมเร็ว) [EBU2007_R37]
- **หลัก correspondence ของตัวละคร** [Cwiek2022]:
  - Mint = เสียงสั้น สูงกว่า "กลม" (bouba-like ถ้าบุคลิกนุ่ม)
  - Tao = ทุ้มกว่า
  - ทำเป็น motif คงที่ (M22 §2.8)
- ภาพดินสอสีเทา/ถ่าน (charcoal) อารมณ์สงบ-คิด → เสียงกระดาษ/ดินสอ attack นุ่ม ไม่ใช้ shimmer สว่าง [Eerola2012_TimbreAffect][Palmer2013_MusicColor] (สว่าง/อิ่มไม่เข้ากับภาพหม่น)

### 6.7 งานลูกค้าอื่น (ร้านอาหาร/คาเฟ่/สินค้าอื่น)
- **sonic seasoning:** เสียงสูง ใส กลม → "หวาน"; ทุ้ม/กระด้าง → "ขม" (lab correspondences ตามที่ Spence 2021 สรุป) [Spence2021_SonicSeasoningCommercial]
  - ใช้เป็น **บรรยากาศสนับสนุน** เท่านั้น
  - ห้ามโฆษณาว่า "เพลงทำให้หวานขึ้น" ถ้าไม่มีการทดสอบ
- **โฆษณา/แบรนด์:** อย่าทำให้โฆษณาดังกว่าเนื้อหา [FCC_CALM]
  - แพลตฟอร์ม normalize อยู่แล้ว (M24) และผู้ชมเกลียดเสียงดังกระโดด [EBU2020_R128]

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

> แยก **documented** (สิ่งที่แหล่งบันทึก) กับ **analysis** (การตีความของเรา)

### 7.1 EBU R128: เปลี่ยนจาก peak เป็น loudness normalisation (ยุโรป, 2010–2020)
- **Documented:**
  - R128 ระบุว่าการ normalize ด้วย peak ทำให้ความดังระหว่างรายการกระโดด จึงแนะนำ programme loudness (gated ตาม BS.1770 = วัด "foreground loudness") และ true peak [EBU2020_R128]
  - มาตรฐานมีมิเตอร์ M/S/I เฉพาะ [web:tech.ebu.ch:278]
  - ปรับ gate จาก −8 เป็น −10 LU ในปี 2010
- **Analysis:**
  - ความสำเร็จมาจากการวัด "สิ่งที่หูรู้สึก" (K-weighting + gating) แทน "สิ่งที่เครื่องเห็น" (peak)
  - การ gate ทำให้รายการที่มีช่วงเงียบตั้งใจไม่ถูกลงโทษ
  - บทเรียน: **วัดด้วยหน่วยของการรับรู้** และเปิดพื้นที่ให้ dynamics

### 7.2 Facebook auto-captions สำหรับวิดีโอโฆษณา (2016)
- **Documented (แหล่งรอง):**
  - การทดสอบภายในของ Facebook พบว่า captions เพิ่ม view time เฉลี่ย **12%**
  - Facebook ออกเครื่องมือ captions อัตโนมัติ สำหรับฟีดที่ส่วนใหญ่ปิดเสียง (อ้างผ่าน 3Play Media) [VerizonPublicis2019_SoundOff]
  - หน้าเดียวกันระบุว่า 41% ของวิดีโอ "ไม่รู้เรื่องหากไม่มีเสียง"
- **Analysis:**
  - เป็นการยอมรับว่าการรับรู้บนโซเชียลเป็น multisensory ที่ "ขาดหนึ่งช่องทาง" บ่อย
  - captions ชดเชยช่องเสียง ซึ่งสอดคล้องกับงานวิชาการ [Gernsbacher2015]
- **ข้อจำกัด:** ตัวเลขเป็นข้อมูลภายในบริษัท ส่งต่อผ่านบล็อกผู้ขาย captions (ผลประโยชน์ทับซ้อน)

### 7.3 The Singleton Sensorium (ลอนดอน, 2013) — sonic seasoning ที่ "วัดผล"
- **Documented:**
  - ห้องสามห้อง (หญ้า / หวาน / ไม้) แต่ละห้องมีเสียงเฉพาะ
  - แขกราว 500 คนให้คะแนนวิสกี้ตัวเดียวกัน
  - ห้อง "หญ้า" ได้คะแนนความเป็นหญ้าสูงกว่าอย่างมีนัยสำคัญ; ความหวานและ finish แบบไม้เป็นไปตามคาด (Spence et al. ทบทวน) [Spence2021_SonicSeasoningCommercial]
- **Analysis:**
  - สำเร็จเพราะ (1) ใช้ correspondence ที่มีหลักฐาน lab (2) เสียงมา **ก่อน/ระหว่าง** การชิม (3) **วัดผลจริง**
  - บทเรียนสำหรับลูกค้า F&B: ถ้าอ้างผลต่อรส ต้องวัด

### 7.4 ASMR ในฐานะประเภทสื่อ (genre)
- **Documented:**
  - ชุมชน ASMR ใช้วิดีโอเพื่อผ่อนคลาย (98%) และช่วยนอน (82%) ส่วนใหญ่ดูก่อนนอน (81%) [BarrattDavis2015_ASMR]
  - การวัดในห้องทดลองยืนยันว่า HR ลดลงจริงในผู้มี ASMR [Poerio2018_ASMR]
  - แบรนด์ (เช่น Glenmorangie 2017) ทำฟิล์ม ASMR จากการวิจัย trigger แต่ **ไม่ได้รายงานผลลัพธ์** [Spence2021_SonicSeasoningCommercial]
- **Analysis:**
  - ประเภทสื่อที่เกิดจากผู้ชมเอง แล้ววิทยาศาสตร์ตามมาตรวจทีหลัง
  - สำเร็จเพราะตรงกับบริบทการฟัง (หูฟัง, ห้องเงียบ, ก่อนนอน)
  - บทเรียน: **บริบทการฟัง** สำคัญเท่ากับตัวเสียง

### 7.5 CALM Act (สหรัฐฯ, 2010–2012) — แก้ปัญหาด้วยมาตรฐานการรับรู้
- **Documented:**
  - หลังผู้บริโภคร้องเรียนเรื่องโฆษณาดัง สภาออก CALM Act (15 ธ.ค. 2010)
  - FCC ใช้ ATSC A/85: ความดัง **เฉลี่ย** ของโฆษณาห้ามเกินรายการ (ไม่มีเพดานสัมบูรณ์)
  - กฎมีผล 13 ธ.ค. 2012; A/85:2013 เพิ่ม gating [FCC_CALM]
- **Analysis:** ใช้ loudness แบบรับรู้เป็นเครื่องมือกำกับ จึงแก้ได้ตรงจุดกว่าการจำกัด peak — ดูด้านล้มเหลวที่ §8.1

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 "ดังกว่าขายได้มากกว่า": โฆษณาทีวีดังเกินรายการ (สหรัฐฯ ก่อน 2010, documented)
- **What:** โฆษณาถูกทำให้ดังกว่ารายการรอบข้าง จนผู้ชมร้องเรียนมากพอให้รัฐสภาออกกฎหมาย และ FCC ระบุว่าคำร้องเรียนเพิ่มขึ้นอีกในปี 2024 [FCC_CALM]
- **Why:**
  - ใช้ peak เป็นตัวควบคุม → บีบ dynamics ให้ความดังเฉลี่ยสูงโดย peak ไม่เกิน
  - ละเลยว่าผู้ชมรับรู้ "ความดังกระโดด" เป็นการรุกราน
  - ตรงกับเหตุผลที่ R128 ทิ้ง peak normalisation [EBU2020_R128]
- **Lesson:**
  - บนโซเชียลวันนี้แพลตฟอร์ม normalize อยู่แล้ว (M24)
  - การ master ดังเกินได้แค่เสีย dynamics
  - **ใช้ LUFS ไม่ใช่ความรู้สึก "ต้องดังกว่า"**

### 8.2 บทพูดฟังไม่ออกใน Tenet (2020) / Interstellar (2014) (documented ในข่าว)
- **What:** ผู้ชมและนักวิจารณ์รายงานว่าบทพูดสำคัญถูกเพลง/เอฟเฟกต์กลบ [Nolan_DialogueMix]
  - Nolan ยืนยันว่าเป็นความตั้งใจ ("right approach for an experimental film" ต่อ Interstellar, THR 2014)
  - เขาเล่าว่าผู้กำกับคนอื่นโทรมาบ่นว่าบทพูด "inaudible"
- **Why (analysis):**
  - LD ระหว่างบทพูดกับ bed ต่ำมาก + masking ในย่านพยัญชนะ
  - ในโรงภาพยนตร์อาจตั้งใจได้ แต่ที่บ้าน/มือถือ (ลำโพงเล็ก ห้องมีเสียงรบกวน ผู้ฟังสูงวัย) intelligibility ตกต่อ
- **Lesson:**
  - สำหรับสื่อมวลชนบนมือถือ ความคลุมเครือของบทพูดถูกอ่านเป็น **ข้อผิดพลาด** ไม่ใช่ศิลปะ
  - ถ้าตั้งใจให้คลุมเครือ ต้องมีอย่างอื่นพาเรื่อง (ภาพ, captions)
  - (การตัดสินว่า "ผิด" เป็น **opinion** — ผู้สร้างตั้งใจ)

### 8.3 Courvoisier (2013): sonic seasoning ที่ไม่ตรงเจตนา (documented)
- **What:** ทำเพลง 6 แทร็กตามกลิ่น cognac
  - การทดสอบ (Crisinel et al. 2013 ตามที่ Spence et al. สรุป) พบว่าการจับคู่ของผู้ฟัง **ตรงกับเจตนาของนักแต่งเพียงบางส่วน**
  - เช่น crème brûlée ไม่มีรูปแบบชัด [Spence2021_SonicSeasoningCommercial]
- **Why:** ความคิดสร้างสรรค์ของนักแต่ง "แปล" correspondence ผิดเพี้ยน; กลิ่นซับซ้อนมีหลายมิติ
- **Lesson:**
  - correspondence ที่ได้จาก lab ต้อง **ทดสอบกับผู้ฟังจริง** หลังแต่ง
  - อย่าเชื่อว่า "ผู้แต่งเข้าใจ" = "ผู้ฟังรู้สึก"

### 8.4 (typical, ไม่ใช่เคสสาธารณะ) Sub-drop reveal ที่หายบนมือถือ
- **What:** คลิปสินค้าพึ่ง sub hit 40–60 Hz ตอนเผยโลโก้/ราคา บนหูฟังทรงพลัง แต่บนลำโพงมือถือเงียบ
- **Why:** microspeaker ให้เสียงน้อยมากต่ำกว่า ~300–600 Hz [ChangWang2019_Microspeaker]
  - (ระดับเริ่มต้นของ equal-loudness ต่ำ ๆ ก็สูงอยู่แล้ว [ISO2023_226])
- **Lesson:**
  - ทุก "น้ำหนัก" ต้องมีองค์ประกอบย่านกลาง (click/transient, harmonics)
  - ข้อมูลสำคัญต้องมีคู่ภาพ (flash/scale)
  - เช็กด้วย phone preview (MIX_PLAYBOOK §6)

### 8.5 (typical, ความเสี่ยงของเราเอง) คลิป "หลับตาแล้วฟัง" ที่ไม่มีใครได้ยิน
- **What:** คลิปพักสายตาที่ข้อมูลทั้งหมดอยู่ในเสียง ถูกดูแบบปิดเสียงในฟีด
- **Why:** sound-off viewing ในที่สาธารณะสูง [VerizonPublicis2019_SoundOff]; ลำโพงเบา/เสียงกระซิบหาย
- **Lesson:**
  - ข้อความเปิดต้องสั่ง "เปิดเสียง" ทันที
  - เวอร์ชัน person look ทำตามได้ด้วยตา
  - วัดผลของเราเอง: เทียบ retention ระหว่างสองเวอร์ชันใน Insights **(our test — ยังไม่ทำ)**

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

### 9.1 วัฒนธรรมไทย vs ตะวันตก
- **ภาษาวรรณยุกต์**
  - ข้อมูล Mandarin ชี้ว่า tone ทนเสียงรบกวนดีกว่าพยัญชนะ [Meng2022_ToneNoise] — ภาษาไทยอาจคล้ายกัน (ยังไม่พบงานไทยตรง)
  - **นัย:** ผู้ฟังไทยในที่มีเสียงรบกวนยังจับ "ทำนอง" ของคำได้ แต่พลาดพยัญชนะ (ส/ซ/ฉ/ช, ต้น-ท้าย)
  - ข้อสรุป: กันย่านพยัญชนะสำคัญพอ ๆ กับภาษาอังกฤษ
  - **ข้อควรระวัง:** การปรับ pitch ของ VO ไทยแรง ๆ (pitch shift/auto-tune) อาจทำวรรณยุกต์เพี้ยนจนความหมายเปลี่ยน **(opinion/craft)**
- **semantic correspondence:** คำว่า "เสียงสูง/ต่ำ" ภาษาไทยใช้ทั้งกับ pitch และวรรณยุกต์ (หมวดอักษรสูง/กลาง/ต่ำ ไม่ตรงกับ pitch จริงเสมอ) — correspondence แบบ semantic อาจต่างจากผู้ฟังอังกฤษ [Spence2011_Crossmodal] **(open question)**
- **bouba/kiki:** ข้ามวัฒนธรรมได้ดีแต่ความแรงต่างตามภาษา [Cwiek2022] — ใช้ได้กับชื่อ/เสียงตัวละครไทย แต่ทดสอบด้วยตัวอย่างไทยก่อนถ้าสำคัญ
- **ความหมายวัฒนธรรมของเสียง:** ระฆังวัด, เสียงสวด = ศักดิ์สิทธิ์ (และ "ผี" ในหนังไทย) — ดู M22 §2.9
  - correspondence ทางกายภาพ (roughness = กลัว) ข้ามวัฒนธรรมได้ดีกว่าความหมายเชิงสัญลักษณ์ **(inference จาก Arnal + Spence)**
- **ดนตรี-สี:** ทดสอบแค่สหรัฐฯ/เม็กซิโกกับเพลงคลาสสิก [Palmer2013_MusicColor]
  - เพลงไทย/ลูกทุ่ง/หมอลำ ที่ใช้บันไดเสียงต่างออกไปยังไม่ทดสอบ
  - mapping "major = เหลือง/สว่าง" อาจไม่ตรงกับความรู้สึกต่อเพลงไทยเดิม

### 9.2 แพลตฟอร์ม
- **TikTok:** วัฒนธรรม sound-on (เพลง/เทรนด์เสียง) — 88% ตามแพลตฟอร์มเอง (ความน่าเชื่อถือต่ำ) [TikTok2021_EvolutionSound]
- **FB/IG feed:** ผู้ชมจำนวนมากปิดเสียง [VerizonPublicis2019_SoundOff] → captions/text layer สำคัญกว่า
- **Reels:** อยู่ระหว่างกลาง → ทำคลิปให้ใช้ได้ทั้งสองแบบ
- **Meta:** ปรับ loudness ตามบริบทอุปกรณ์ (xHE-AAC DRC, ดู M24) → dynamics ที่ส่งไปอาจถูกบีบเพิ่มบนลำโพง

### 9.3 ผู้ชม
- **สูงวัย/hearing loss:** ต้องการ SNR สูงขึ้น (SNR loss) [Killion2004_QuickSIN]
  - กลุ่มลูกค้าแว่นสายตายาวตามวัยตรงกับกลุ่มนี้ [Chayaopas2021_ThaiElderlyHearing][Ruencharoen2024_BangkokHearing]
  - ใช้ WCAG 20 dB [W3C_WCAG22_SC147] และ captions ขนาดใหญ่
- **ผู้ดูภาษาที่สอง:** captions ช่วยมากที่สุด [Gernsbacher2015]
  - คลิปภาษาอังกฤษ (house rule) สำหรับผู้ชมไทย = ภาษาที่สอง → captions อังกฤษช่วยมาก
- **ผู้มี / ไม่มี ASMR:** ผลต่างกันโดยสิ้นเชิง [Poerio2018_ASMR]
- **ผู้ที่ไวต่อเสียง (sensory overload):**
  - หลีกเลี่ยง onset แปลกใหม่ถี่ ๆ [Escera1998_Novelty], roughness [Arnal2015_Screams], ความดังกระโดด [EBU2020_R128]
  - WCAG มีเกณฑ์ background audio [W3C_WCAG22_SC147]
  - กลุ่ม misophonia/hyperacusis ยังไม่ได้ศึกษาในรอบนี้

### 9.4 ประเภทงาน (genre)
- **Horror/zombie:** เป็นข้อยกเว้นที่ "ควร" ใช้ roughness, rising intensity, onset ไม่คาดคิด [Arnal2015_Screams][Bach2008_RisingIntensity][Escera1998_Novelty]
- **Calming/eye-break:** ตรงข้ามทั้งหมด
- **Comedy:** synchresis (M22) + correspondence ที่ "ผิด" อย่างจงใจ (ตัวใหญ่เสียงเล็ก) สร้างความตลกจากความไม่เข้ากัน **(craft; ไม่มีแหล่งรอบนี้)**
- **โรงหนัง vs มือถือ:** ความคลุมเครือของบทพูดที่โรงหนังยอมรับได้ กลายเป็นข้อผิดพลาดบนมือถือ (§8.2)

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| Domain | เชื่อมอย่างไร | วิธีใช้ |
|---|---|---|
| 01 Creative thinking & cognitive science | attention capture, cognitive load, ASA = "การจัดกลุ่ม" แบบ Gestalt ในเสียง | ใช้ onset ดึงความสนใจก่อนข้อมูล ไม่ใช่พร้อมกัน (§3.6) |
| 02 Psychology & emotional intelligence | valence/arousal ของ timbre, roughness = กลัว, silence = ผ่อนคลาย | ออกแบบ arousal curve ของคลิปด้วยเสียง (rising → hit → silence) |
| 03 Aesthetic intelligence & taste | ความเงียบ, dynamics, "ไม่ดังเกิน" เป็นรสนิยม | rubric §14 เกณฑ์ "restraint" |
| 04 Visual language & grammar | correspondences pitch–size/brightness/elevation; ดนตรี–สี | จับคู่ขนาด/สี/ตำแหน่งบนจอกับ pitch/timbre; grade สีกับเพลงจากอารมณ์เดียวกัน |
| 05 Semiotics, symbolism & metaphor | bouba/kiki = sound symbolism; ระฆังวัด = สัญลักษณ์ทางวัฒนธรรม | ตั้งชื่อตัวละคร/แบรนด์/โลโก้ motion ให้เสียงสอดคล้องรูป |
| 06 Character psychology | เสียงประจำตัวละคร (pitch ตามขนาด, timbre ตามนิสัย) | motif ของ Mint/Tao |
| 07 Worldbuilding & continuity | ambience ต่อเนื่อง, ASA stream ของสถานที่ | คงเสียงพื้นที่ข้าม cut; เปลี่ยน ambience = เปลี่ยนโลก |
| 08 Philosophy, literature & poetry | ความเงียบเชิงกวี, จังหวะ | ช่องว่างใน VO แบบบทกวี (pause) |
| 09 Cultural studies | ไทย vs ตะวันตก (วรรณยุกต์, ความหมายเสียง) | ทดสอบกับผู้ชมไทย §9.1 |
| 11 Consumer psychology & marketing | sonic seasoning, sonic logo, sound-off, captions +12% view time | ใช้ correspondence เป็นบรรยากาศสนับสนุน + วัดผล |
| 12 Independent creative criticism | วิจารณ์ mix: intelligibility, masking, sync | ใช้ checklist §13 เป็นภาษาวิจารณ์ที่ตรวจสอบได้ |
| 13 Quality assurance & evaluation | LUFS/TP/LD/sync เป็นค่าวัดได้ | เพิ่มใน `qc.py`: LD, sync offset, short-term max |
| 14 Knowledge management | ช่องว่างงานวิจัยไทย | บันทึกผลทดสอบของเรา (A/B retention) ลง LEARNING-LOG |
| 15 Creative workflow automation | ffmpeg ebur128, timing จาก TTS | สคริปต์คำนวณ LD และเว้นช่องหลัง hit อัตโนมัติ |

โมดูลที่เกี่ยว: M22 (sound design), M23 (music), M24 (audio engineering), ai-voice-director, ai-visual-artist (สี-อารมณ์)

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 ตารางตัดสินใจหลัก

| ถ้า… | แล้ว… | เหตุผล/แหล่ง |
|---|---|---|
| คลิปมีข้อมูลในเสียงพูด | burn-in captions + key text บนจอ | [VerizonPublicis2019_SoundOff][Gernsbacher2015] |
| ผู้ชมเป้าหมาย 50+/ผู้สูงอายุ | bed ≤ −15 ถึง −20 dB ใต้ VO, VO แห้ง, captions ใหญ่ | [W3C_WCAG22_SC147][Chayaopas2021_ThaiElderlyHearing] |
| ผู้ชมทั่วไป, มีเพลง | LD ≥ 10 LU (12–15 บนมือถือ) | M24 (Torcoli) |
| มี impact ใหญ่ตามด้วยคำสำคัญ | เว้น ≥ 150–200 ms | [FastlZwicker2007_Psychoacoustics] |
| ต้องการ hook เสียงเปิดคลิป | onset ไม่คาดคิด 1 ครั้ง ก่อนข้อความ ~0.2–0.3 s | [Escera1998_Novelty] |
| ต้องการความตึง/กลัว | roughness + rising → hit → เงียบ | [Arnal2015_Screams][Bach2008_RisingIntensity] |
| ต้องการผ่อนคลาย | attack ช้า, สเปกตรัมนุ่ม, ไม่มี rising/roughness, จบด้วยเงียบ | [Eerola2012_TimbreAffect][Bernardi2006_Silence] |
| SFX ให้วัตถุบนจอ | pitch/timbre ตามขนาด-วัสดุ-รูปทรง | [Spence2011_Crossmodal][PariseSpence2009_BirdsFeather][Cwiek2022] |
| sync ไม่แน่ใจ | เลื่อนเสียงช้าลง ไม่ใช่เร็วขึ้น; ≤ +40/−60 ms | [EBU2007_R37][vanWassenhove2007_TWI] |
| น้ำหนักเสียงอยู่ต่ำกว่า 200 Hz | เติม transient/harmonics ย่านกลาง; คู่กับภาพ | [ChangWang2019_Microspeaker] |
| อยากใช้ ASMR/กระซิบ | ใช้เป็นชั้นเสริม, บอกใช้หูฟัง, คำสั่งหลักต้องชัด | [Poerio2018_ASMR][Lohaus2023_ASMRReview] |
| อยากใช้ binaural/ทิศเสียงเล่าเรื่อง | เฉพาะคอนเทนต์ "ใส่หูฟัง"; ไม่งั้นอย่าให้ทิศเป็นข้อมูล | M22 §2.12 |
| ลูกค้า F&B อยากใช้เสียงให้ "อร่อยขึ้น" | ใช้ correspondence เป็นบรรยากาศ; ห้ามอ้างผลถ้าไม่วัด | [Spence2021_SonicSeasoningCommercial] |
| คลิป < 1 นาที | ไม่ใช้ LRA ตัดสิน; ดู short-term max | [EBU2020_R128] |
| เลือกสี grade และเพลงพร้อมกัน | เลือกอารมณ์ก่อน แล้วเลือกทั้งคู่ | [Palmer2013_MusicColor] |

### 11.2 Flow สั้น (ก่อนวางเสียงทุกคลิป)
1. คลิปนี้ดูแบบปิดเสียงรู้เรื่องไหม? → ไม่ → เพิ่มข้อความ/captions/ภาพเล่าเรื่อง
2. อารมณ์เป้าหมาย (valence × arousal) คืออะไร? → เลือก timbre/roughness/rising/silence ตาม §11.1
3. ผู้ชมเป็นใคร (อายุ, ภาษา, แพลตฟอร์ม)? → เลือก LD (10 / 15 / 20)
4. วาง SFX ให้เข้ากับวัตถุ → sync ≤ 1 เฟรมเร็ว
5. วัด: LUFS / TP / LD / mono / phone preview (MIX_PLAYBOOK)

---

## 12. แบบฝึกหัด (Exercises)

**E1 (พื้นฐาน) — อ่านมิเตอร์**
- โจทย์: วัดคลิป story 30 วิ ด้วย `ebur128` แล้วรายงาน I, M max, S max, TP และอธิบายว่าทำไม LRA ของคลิปนี้ไม่ควรใช้ตัดสิน
- คำตอบที่ดีแสดง:
  - รู้ว่า M = 0.4 s, S = 3 s, I gated
  - อ้าง R128 ว่า LRA ไม่แนะนำ < 1 นาที
  - ชี้ช่วงที่ M max สูงเกิน (SFX พุ่ง) พร้อม timestamp

**E2 (พื้นฐาน) — sync เป็นเฟรม**
- โจทย์: แปลงขอบเขต R37 (+40/−60 ms) และหน้าต่าง fusion ของ van Wassenhove (−30/+170 ms) เป็นจำนวนเฟรมที่ 24, 30 และ 60 fps แล้วตั้งกฎ offset สำหรับ `rig talk` และ SFX contact
- คำตอบที่ดีแสดง:
  - คำนวณถูก (30 fps: +1.2/−1.8 เฟรม)
  - แยกกฎคำพูด (ยืดหยุ่นกว่า) จาก object contact (เข้มกว่า)
  - เลือก "ช้าดีกว่าเร็ว"

**E3 (กลาง) — ducking ด้วยเหตุผล**
- โจทย์: คลิป Hua Hin presbyopia (ผู้ชม 50+) มีเพลง + คลื่น + TTS ให้ตั้งเป้า LD ของแต่ละชั้นพร้อมเหตุผลเชิงกลไก (masking, power law, ASA, hearing loss)
- คำตอบที่ดีแสดง:
  - ใช้ 15–20 dB แทน 10
  - อ้าง WCAG 20 dB และข้อมูล hearing loss ไทย
  - อธิบายว่าทำไมการลดย่าน 2–5 kHz ของ bed ได้ผลกว่าการลดทั้งเพลง
  - ไม่เขียนค่า craft เป็นข้อเท็จจริง

**E4 (กลาง) — correspondence ของสินค้า**
- โจทย์: ออกแบบ SFX 3 ชุดสำหรับแว่น (titanium บาง, acetate หนา, เลนส์ blue-cut) ระบุ pitch, attack, ความยาว และให้เหตุผลด้วย correspondence
- คำตอบที่ดีแสดง:
  - map ขนาด/น้ำหนัก/รูปทรง → pitch/attack สอดคล้องกัน
  - อ้าง Spence/Parise
  - มีเวอร์ชันที่ไม่พึ่ง sub (phone-safe)

**E5 (กลาง) — คลิปผ่อนคลาย**
- โจทย์: วิจารณ์ eye-break clip ปัจจุบัน (voice + tick + ambient) ว่าองค์ประกอบใดอาจทำลายความสงบ และเสนอการแก้ 3 ข้อพร้อมแหล่ง
- คำตอบที่ดีแสดง:
  - ตรวจ rising intensity, onset แปลกใหม่, ความสว่างของ timbre, ความเงียบตอนท้าย
  - พูดถึงปัญหา sound-off
  - แยก ASMR เป็นตัวเสริม

**E6 (สูง) — sound-off audit**
- โจทย์: เลือก 3 คลิปที่เผยแพร่แล้ว ดูแบบปิดเสียงทั้งหมด จดว่าข้อมูลใดหาย แล้วเขียนแผนแก้และตัวชี้วัด (retention 3 วิ, completion) สำหรับ A/B
- คำตอบที่ดีแสดง:
  - รายการข้อมูลที่หายแบบเจาะจง
  - แผนทดสอบที่แยกตัวแปรเดียว
  - ไม่อ้างตัวเลขสหรัฐฯ เป็นค่าของไทย

**E7 (สูง) — horror vs calm**
- โจทย์: ใช้ภาพชุดเดียวกัน (ร้านแว่นตอนตีสอง) ออกแบบ sound design สองเวอร์ชัน: ตึง/น่ากลัว vs อบอุ่น โดยเปลี่ยนเฉพาะเสียง (roughness, rising, onset, silence, timbre)
- คำตอบที่ดีแสดง:
  - spot sheet ที่ระบุตัวแปรเสียงชัด
  - อธิบายกลไก (Arnal, Bach, Escera, Eerola, Bernardi)
  - ระดับ mix ที่ VO ยังชนะในทั้งสองเวอร์ชัน

**E8 (สูง) — วิจัยของเราเอง**
- โจทย์: ออกแบบการทดสอบเล็กกับผู้ชมไทย (n ≥ 20) ว่า bouba/kiki หรือ pitch–size ใช้ได้กับชื่อ/เสียงตัวละครไทยไหม
- คำตอบที่ดีแสดง:
  - มี control (สุ่มลำดับ, ไม่บอกสมมติฐาน)
  - pre-register เกณฑ์
  - ระวัง semantic confound ของคำว่า "สูง/ต่ำ" ในภาษาไทย
  - บันทึกผลเป็น **(our test)**

---

## 13. Checklist (ตอบ ใช่/ไม่ใช่ ก่อนส่งงาน)

1. ดูแบบ **ปิดเสียง** แล้วยังเข้าใจเรื่อง/ข้อเสนอหลักไหม?
2. มี captions/ข้อความสำหรับเสียงพูดทุกประโยคที่มีข้อมูลไหม (ใน safe zone, อ่านทัน)?
3. VO ดังกว่า bed ≥ 10 LU ไหม (≥ 15–20 สำหรับผู้ชมสูงวัย/งาน accessibility)?
4. ย่านพยัญชนะ (~2–5 kHz) ของ bed ถูกเปิดทางให้ VO ขณะพูดไหม?
5. ไม่มีคำสำคัญอยู่ภายใน ~200 ms หลัง impact ดังใช่ไหม?
6. เสียงทุกจุด sync อยู่ใน ≤ 1 เฟรมเร็ว / ≤ 2 เฟรมช้า (คำพูด) และ contact ตรงเฟรมใช่ไหม?
7. ถ้ามีปากตัวละคร: ปากปิดตรง บ/ป/พ/ม ไหม?
8. SFX "เข้ากับ" ขนาด/วัสดุ/รูปทรงของวัตถุบนจอไหม?
9. timbre/roughness/rising ตรงกับอารมณ์เป้าหมาย (ไม่มี roughness/rising ในคลิปผ่อนคลาย) ไหม?
10. มี hook เสียงไม่เกิน 1–2 ครั้งต่อ 30 วิ และไม่ชนกับการอ่านข้อความไหม?
11. ฟังผ่าน phone preview (mono, ตัด < 150 Hz) แล้วข้อมูลสำคัญยังอยู่ไหม?
12. Integrated −14 LUFS (±1), TP ≤ −1.5 dBTP, และ M/S max ไม่พุ่งเกินจนน่ารำคาญไหม?
13. ความเงียบที่ใช้เป็น "ความเงียบที่ออกแบบ" (มี room tone, มีเหตุผล) ไม่ใช่ digital silence ใช่ไหม?
14. ไม่มีข้อมูลเรื่องเล่าที่พึ่ง **ทิศเสียง** หรือ **เบสลึก** อย่างเดียวใช่ไหม?
15. ถ้าใช้ ASMR/binaural: บอกผู้ชมให้ใช้หูฟัง และคำสั่งหลักยังชัดบนลำโพงไหม?
16. ไม่มี claim ทางวิทยาศาสตร์ที่เกินหลักฐานในแคปชัน (เช่น "เสียงนี้ทำให้สมองผ่อนคลาย 100%", "432 Hz รักษา") ใช่ไหม?
17. เสียง/สัญลักษณ์ทางวัฒนธรรม (ระฆังวัด, สวด) ใช้อย่างเหมาะสมกับบริบทไทยไหม?

---

## 14. Evaluation Rubric

**วิธีให้คะแนน**
- ให้คะแนนแต่ละเกณฑ์ 1–4 ตามหลักฐานที่ "สังเกตได้" (ฟัง/ดู/วัด)
- น้ำหนัก: Intelligibility ×2, Access ×2, เกณฑ์อื่น ×1 → คะแนนเต็ม (2+2+1+1+1+1)×4 = 32
- **ผ่าน ≥ 24 และไม่มี critical failure**

| เกณฑ์ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **A. Intelligibility (×2)** | คำสำคัญถูกกลบ; ต้องฟังซ้ำ | เข้าใจได้บนหูฟัง แต่หายบนลำโพงมือถือ | เข้าใจบนลำโพงมือถือที่ระดับปกติ; LD ≥ 10 LU | เข้าใจที่ระดับเบา/มีเสียงรอบข้าง; LD ตามกลุ่มผู้ชม; ไม่มีคำในช่วง forward masking |
| **B. Access & sound-off (×2)** | ปิดเสียงแล้วไม่รู้เรื่อง | มีข้อความบางส่วน | captions ครบ, เรื่องหลักเข้าใจได้แบบปิดเสียง | ครบ + captions อธิบาย SFX สำคัญ + ข้อมูลไม่พึ่งทิศเสียง/เบส; ตรงตามเกณฑ์ WCAG ถ้าเป็นงาน accessibility |
| **C. Sync & multisensory fit** | เสียงเร็ว/ช้าเห็นชัด (> 2 เฟรม) | sync พอใช้ แต่ SFX ไม่เข้ากับวัตถุ | sync ≤ 1 เฟรมเร็ว; SFX เข้ากับวัสดุ/ขนาด | sync แม่น + correspondence ทั้งคลิปสม่ำเสมอ (ขนาด/สี/pitch/timbre ไปทางเดียวกัน) |
| **D. Emotional design** | เสียงขัดกับอารมณ์เป้าหมาย (เช่น roughness ในคลิปผ่อนคลาย) | อารมณ์คลุมเครือ | timbre/dynamics สนับสนุนอารมณ์ | arousal curve ชัด (build → peak → silence) สอดคล้องกับภาพและเรื่อง |
| **E. Loudness & translation** | clip/TP > 0 dBTP หรือดังกระโดด | LUFS ผิดเป้า > 2 LU หรือ mono ตก > 3 LU | ตรงเป้า −14 ±1, TP ≤ −1.5 | ตรงเป้า + M/S max เหมาะสม + phone preview ผ่าน |
| **F. Restraint & attention** | hook/SFX ทุกวินาที หรือเงียบผิดที่ | hook มากเกิน หรือชนกับการอ่าน | hook 1–2 ครั้งวางก่อนข้อความ | ใช้ความเงียบและ hook อย่างตั้งใจ; ทุกเสียงมีหน้าที่ |

**Critical failures** (ตกทันทีไม่ว่าคะแนนรวม)
- คำพูดที่มีข้อมูลสำคัญ (ราคา, คำเตือนสุขภาพ, ชื่อร้าน) ฟังไม่ออกบนลำโพงมือถือ **และ** ไม่มีข้อความแทน
- clipping / true peak > 0 dBTP
- เสียงนำภาพเกิน 2 เฟรมในจุด lip/contact สำคัญ
- claim เชิงสุขภาพ/วิทยาศาสตร์เกินหลักฐาน (ASMR รักษา, ความถี่รักษาโรค)
- ใช้เสียงทางศาสนา/วัฒนธรรมไทยแบบไม่เคารพ

---

## 15. แหล่งอ้างอิง (References)

ทุก key ที่ใช้ในไฟล์นี้ (40) — รายละเอียดเต็มใน `sources/10-psychoacoustics-sensory-experience.json` · date_accessed 2026-11-26

- **[Helmholtz1875_SensationsTone]** Helmholtz, H. von. *On the Sensations of Tone as a Physiological Basis for the Theory of Music* (trans. A. J. Ellis; German orig. 1863; Eng. 1875; 1895 reprint). https://archive.org/details/onsensationsofto00helmrich/mode/2up — **bibliographic**
- **[FletcherMunson1933_Loudness]** Fletcher, H., & Munson, W. A. (1933). Loudness, its definition, measurement and calculation. *JASA* 5, 82–108; also *BSTJ* 12(4). doi:10.1121/1.1915637. https://archive.org/details/bstj12-4-377/bstj12-4-377 — **abstract** (อ่านบทคัดย่อ บทนำ และนิยามจากฉบับสแกน)
- **[Stevens1957_PsychophysicalLaw]** Stevens, S. S. (1957). On the psychophysical law. *Psychological Review* 64(3), 153–181. doi:10.1037/h0046162. https://terhardt.userweb.mwn.de/ter/ref/Stevens1957a.html — **bibliographic**
- **[Zwicker1961_CriticalBands]** Zwicker, E. (1961). Subdivision of the audible frequency range into critical bands (Frequenzgruppen). *JASA* 33(2), 248. doi:10.1121/1.1908630. https://en.wikipedia.org/wiki/Bark_scale — **bibliographic**
- **[Bregman1990_ASA]** Bregman, A. S. (1990). *Auditory Scene Analysis: The Perceptual Organization of Sound*. MIT Press. https://en.wikipedia.org/wiki/Auditory_scene_analysis — **bibliographic**
- **[FastlZwicker2007_Psychoacoustics]** Fastl, H., & Zwicker, E. (2007). *Psychoacoustics: Facts and Models* (3rd ed.). Springer. https://link.springer.com/book/10.1007/978-3-540-68888-4 — **search_summary** (ค่า temporal masking มาจากแหล่งรอง; unverified)
- **[ISO2023_226]** ISO 226:2023 Acoustics — Normal equal-loudness-level contours (3rd ed.). https://www.iso.org/standard/83117.html — **search_summary**
- **[ITU2023_BS1770_5]** ITU-R BS.1770-5 (11/2023). Algorithms to measure audio programme loudness and true-peak audio level. https://www.itu.int/dms_pubrec/itu-r/rec/bs/R-REC-BS.1770-5-202311-I!!PDF-E.pdf — **search_summary** (PDF ถูกบล็อกสำหรับ client ของเรา)
- **[EBU2020_R128]** EBU (2020). R 128 v4.0: Loudness normalisation and permitted maximum level of audio signals. https://tech.ebu.ch/docs/r/r128.pdf — **full_text**
- **[web:tech.ebu.ch:278]** EBU Tech 3341: Loudness Metering "EBU Mode". https://tech.ebu.ch/docs/tech/tech3341.pdf — **full_text**
- **[EBU2007_R37]** EBU (2007). R37-2007: The relative timing of the sound and vision components of a television signal. https://tech.ebu.ch/files/live/sites/tech/files/shared/r/r037.pdf — **full_text**
- **[McGurkMacDonald1976]** McGurk, H., & MacDonald, J. (1976). Hearing lips and seeing voices. *Nature* 264, 746–748. doi:10.1038/264746a0. https://www.doi.org/10.1038/264746A0 — **search_summary**
- **[vanWassenhove2007_TWI]** van Wassenhove, V., Grant, K. W., & Poeppel, D. (2007). Temporal window of integration in auditory-visual speech perception. *Neuropsychologia* 45(3), 598–607. https://scholar.usuhs.edu/en/publications/temporal-window-of-integration-in-auditory-visual-speech-percepti/ — **abstract**
- **[AlaisBurr2004_Ventriloquist]** Alais, D., & Burr, D. (2004). The ventriloquist effect results from near-optimal bimodal integration. *Current Biology* 14(3), 257–262. doi:10.1016/j.cub.2004.01.029. https://flore.unifi.it/handle/2158/202581 — **search_summary**
- **[Spence2011_Crossmodal]** Spence, C. (2011). Crossmodal correspondences: A tutorial review. *Attention, Perception, & Psychophysics* 73(4), 971–995. doi:10.3758/s13414-010-0073-7. https://link.springer.com/content/pdf/10.3758/s13414-010-0073-7.pdf — **full_text**
- **[PariseSpence2009_BirdsFeather]** Parise, C. V., & Spence, C. (2009). "When birds of a feather flock together": Synesthetic correspondences modulate audiovisual integration in non-synesthetes. *PLoS ONE* 4(5), e5664. doi:10.1371/journal.pone.0005664. https://pmc.ncbi.nlm.nih.gov/articles/PMC2680950 — **full_text** (ผ่าน Europe PMC)
- **[Cwiek2022]** Ćwiek, A., et al. (2022). The bouba/kiki effect is robust across cultures and writing systems. *Phil. Trans. R. Soc. B* 377(1841), 20200390. doi:10.1098/rstb.2020.0390. https://doi.org/10.1098/rstb.2020.0390 — **abstract**
- **[Palmer2013_MusicColor]** Palmer, S. E., Schloss, K. B., Xu, Z., & Prado-León, L. R. (2013). Music–color associations are mediated by emotion. *PNAS* 110(22), 8836–8841. doi:10.1073/pnas.1212562110. https://www.pnas.org/content/pnas/110/22/8836.full.pdf — **abstract**
- **[Spence2021_SonicSeasoningCommercial]** Spence, C., Wang, Q. J., Reinoso-Carvalho, F., & Keller, S. (2021). Commercializing sonic seasoning in multisensory offline experiential events and online tasting experiences. *Frontiers in Psychology* 12, 740354. doi:10.3389/fpsyg.2021.740354. https://www.frontiersin.org/articles/10.3389/fpsyg.2021.740354/full — **full_text** (อ่าน ~40% แรกของหน้า: บทนำ + ตารางกรณีศึกษา)
- **[Eerola2012_TimbreAffect]** Eerola, T., Ferrer, R., & Alluri, V. (2012). Timbre and affect dimensions. *Music Perception* 30(1), 49–70. doi:10.1525/mp.2012.30.1.49. https://jyx.jyu.fi/bitstreams/33c4638f-38ea-40c1-94cd-952258621ff4/download — **full_text**
- **[Arnal2015_Screams]** Arnal, L. H., Flinker, A., Kleinschmidt, A., Giraud, A.-L., & Poeppel, D. (2015). Human screams occupy a privileged niche in the communication soundscape. *Current Biology* 25(15), 2051–2056. doi:10.1016/j.cub.2015.06.043. https://www.mpg.de/9323826/acoustic-signature-screams — **publisher_page**
- **[Bach2008_RisingIntensity]** Bach, D. R., Schächinger, H., Neuhoff, J. G., et al. (2008). Rising sound intensity: An intrinsic warning cue activating the amygdala. *Cerebral Cortex* 18(1), 145–150. doi:10.1093/cercor/bhm040. https://boris.unibe.ch/21529/1/bhm040.pdf — **abstract**
- **[Escera1998_Novelty]** Escera, C., Alho, K., Winkler, I., & Näätänen, R. (1998). Neural mechanisms of involuntary attention to acoustic novelty and change. *J. Cognitive Neuroscience* 10(5), 590–604. doi:10.1162/089892998562997 — **abstract**
- **[BrummZollinger2011_Lombard]** Brumm, H., & Zollinger, S. A. (2011). The evolution of the Lombard effect: 100 years of psychoacoustic research. *Behaviour* 148(11–13), 1173–1198. doi:10.1163/000579511X605759 — **abstract**
- **[Killion2004_QuickSIN]** Killion, M. C., Niquette, P. A., Gudmundsen, G. I., Revit, L. J., & Banerjee, S. (2004). Development of a quick speech-in-noise test… *JASA* 116(4), 2395–2405. doi:10.1121/1.1784440 — **abstract**
- **[Meng2022_ToneNoise]** Meng, Y., Chen, F., Yan, F., Peng, G., & Zheng, W. (2022). Age-related differences of Mandarin tone and consonant aspiration perception in babble noise. *JSLHR* 65(9), 3438–3451. doi:10.1044/2022_JSLHR-21-00564 — **abstract**
- **[Poerio2018_ASMR]** Poerio, G. L., Blakey, E., Hostler, T. J., & Veltri, T. (2018). More than a feeling: ASMR is characterized by reliable changes in affect and physiology. *PLoS ONE* 13(6), e0196645. doi:10.1371/journal.pone.0196645. https://eprints.whiterose.ac.uk/132445 — **full_text**
- **[BarrattDavis2015_ASMR]** Barratt, E. L., & Davis, N. J. (2015). ASMR: a flow-like mental state. *PeerJ* 3, e851. doi:10.7717/peerj.851 — **full_text** (ผ่าน Europe PMC)
- **[Lohaus2023_ASMRReview]** Lohaus, T., Schreckenberg, S. C., Bellingrath, S., & Thoma, P. (2023 online; 2025 print). ASMR: A PRISMA-guided systematic review. *Psychology of Consciousness* 12(4), 594–648. doi:10.1037/cns0000368. https://news.rub.de/english/press-releases/2023-11-09-psychology-whats-story-behind-asmr-clips — **search_summary**
- **[Bernardi2006_Silence]** Bernardi, L., Porta, C., & Sleight, P. (2006). Cardiovascular, cerebrovascular, and respiratory changes induced by different types of music in musicians and non-musicians: the importance of silence. *Heart* 92(4), 445–452. doi:10.1136/hrt.2005.064600 — **abstract**
- **[WHO2021_WorldReportHearing]** WHO (2 Mar 2021). WHO: 1 in 4 people projected to have hearing problems by 2050 (World report on hearing). https://www.who.int/news/item/02-03-2021-who-1-in-4-people-projected-to-have-hearing-problems-by-2050 — **publisher_page**
- **[Ruencharoen2024_BangkokHearing]** Ruencharoen, S., et al. (2024). Hearing health survey of the population in Bangkok. *BMC Public Health* 24, 1024. doi:10.1186/s12889-024-18424-x — **abstract**
- **[Chayaopas2021_ThaiElderlyHearing]** Chayaopas, N., Kasemsiri, P., Thanawirattananit, P., Piromchai, P., & Yimtae, K. (2021). The effective screening tools for detecting hearing loss in elderly population: HHIE-ST versus TSQ. *BMC Geriatrics* 21, 37. doi:10.1186/s12877-020-01996-9 — **abstract**
- **[Gernsbacher2015]** Gernsbacher, M. A. (2015). Video captions benefit everyone. *Policy Insights from the Behavioral and Brain Sciences* 2(1), 195–202. doi:10.1177/2372732215602130. https://successforkidswithhearingloss.com/wp-content/uploads/2020/04/Video-Captions-Benefit-Everyone_2015.pdf — **full_text**
- **[VerizonPublicis2019_SoundOff]** Verizon Media & Publicis Media survey (April 2019, n = 5,616 US adults), reported by 3Play Media. https://www.3playmedia.com/blog/verizon-media-and-publicis-media-find-viewers-want-captions/ — **publisher_page** (69%/25% จากแหล่งรอง)
- **[TikTok2021_EvolutionSound]** TikTok for Business (21 Dec 2021). Evolution of Sound, Volume 1. https://ads.tiktok.com/business/en-US/blog/evolution-of-sound-volume-1 — **publisher_page**
- **[W3C_WCAG22_SC147]** W3C WAI. Understanding SC 1.4.7: Low or No Background Audio (WCAG 2.2). https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html — **full_text**
- **[FCC_CALM]** FCC. Loud Commercials / CALM Act (Public Law 111-311; ATSC A/85). https://www.fcc.gov/general/loud-commercials-0 — **search_summary**
- **[ChangWang2019_Microspeaker]** Chang, J. R., & Wang, C. N. (2019). Bass extension of microspeaker system on mobile device. *Journal of Mechanics* 35(4). https://www.cambridge.org/core/journals/journal-of-mechanics/article/bass-extension-of-microspeaker-system-on-mobile-device/2F765A1986D3D93F3D8A365ACC4C8A7A — **abstract**
- **[Nolan_DialogueMix]** Press coverage of dialogue-intelligibility complaints, Tenet (2020)/Interstellar (2014), e.g. The Playlist (13 Nov 2020). https://theplaylist.net/christopher-nolan-sound-design-complaints-20201113/ — **search_summary** (unverified)

**เข้าถึงไม่ได้/ยืนยันไม่ได้ในรอบนี้**
- ITU PDFs (BS.1770-5, BT.1359) ถูกบล็อก
- PMC/PubMed (bot check)
- ISO page (403)
- FCC page (403)
- Alais & Burr PDF (403)
- Knöferle & Spence 2012 (ตัดออก)
- ตาราง STI ของ IEC 60268-16 (ไม่ได้ใส่ตัวเลข)
- ตัวเลข "bouba/kiki 95%" ที่แชร์กันทั่วไป **ไม่พบแหล่ง** → ห้ามใช้
