# M24 — Audio Engineering (วิศวกรรมเสียง)

โมดูลนี้เป็นพื้นฐานทางเทคนิคของทุกงานที่มีเสียง: คลิป VO ภาษาไทย (TTS), story clips, Reels/TikTok, คลิปสินค้า และงานลูกค้าในอนาคต
ไฟล์ในโฟลเดอร์:
- `README.md` — ไฟล์นี้ (ทฤษฎี + หลักฐาน)
- `MIX_PLAYBOOK.md` — **ใช้งานจริง**: VO-first mix chain, ค่าตั้งต้น, คำสั่ง ffmpeg (ทดสอบแล้วบน ffmpeg 9.0), เช็กลิสต์ QC และข้อเสนอเพิ่มใน `qc.py`
- `sources.json` — 20 แหล่ง (key ที่อ้างในไฟล์นี้)

ของที่มีอยู่แล้ว ไม่เขียนซ้ำ: `story-clips/_craft/sound.py` (mixer: hit/amb/duck/muffle/room, write peak 0.89), `tools/soundtrack.py` (beat + SFX, ffmpeg `loudnorm=I=-14:TP=-1.5` แบบ single-pass), `.claude/skills/ai-voice-director/tools/qc.py` (peak ≤ -1 dBFS, clipping, ขอบเงียบ < 0.6 s, sample rate ≥ 22.05 kHz)

---

## 1. Scope & status

**ครอบคลุม**: คลื่นเสียงพื้นฐาน (frequency, amplitude, phase, harmonics), digital audio (sample rate, bit depth, Nyquist), dynamic range/SNR, clipping & true peak, psychoacoustics (equal-loudness, masking), เครื่องมือ mix (EQ, filter, compressor, limiter, de-esser, gate, noise reduction, reverb/delay), stereo/mono, ducking, loudness (BS.1770, R128, ตัวเลขแพลตฟอร์ม), mastering สำหรับวิดีโอโซเชียล

**ไม่ครอบคลุม**: การอัดเสียงด้วยไมค์/ห้องอัด (เราใช้ TTS เป็นหลัก), surround/Atmos, การออกแบบ DSP, การวัดลำโพง

**สถานะหลักฐาน**: 20 แหล่ง — tier S 4, A 6, B 1, C 4, D 4, E 1 · access: full_text 7, abstract 3, publisher_page 1, bibliographic 2, search_summary 7
- มาตรฐาน (R128 อ่านฉบับเต็มส่วน "recommends"; BS.1770-5 เห็นแค่หน้า ITU) และเอกสารแพลตฟอร์ม (Spotify, Apple, Meta, YouTube Audio Library) อ่านเต็ม
- **TikTok, Instagram/Facebook, YouTube ไม่มีหน้าเอกสารทางการที่บอกค่า LUFS** (ค้นแล้วไม่พบใน session นี้) — ตัวเลข -14 ที่ใช้กันเป็นค่าที่ผู้ปฏิบัติวัด/รายงาน
- ค่าตั้ง EQ/compressor ส่วนใหญ่เป็น craft (tier D) — เขียนแยกจากวิทยาศาสตร์เสมอ

---

## 2. Core concepts

รูปแบบ: **คืออะไร · กลไก · ใช้งาน · ข้อจำกัด · tier/keys · ความมั่นใจ**

### 2.1 Frequency, amplitude, phase, harmonics
- **คืออะไร**: frequency (Hz) = ระดับเสียงสูงต่ำ; amplitude (dB) = ความแรง; phase = ตำแหน่งในรอบคลื่น; harmonics = ความถี่ทวีคูณของ fundamental ที่ทำให้เกิด timbre (เสียงไวโอลินกับขลุ่ยโน้ตเดียวกันแต่ต่างกัน)
- **กลไก**: เสียงพูดมี fundamental ต่ำ (ประมาณ 85–255 Hz ในผู้ใหญ่ — ค่า craft ทั่วไป) แต่ความเข้าใจคำอยู่ที่พยัญชนะย่าน kHz; สองสัญญาณที่ phase ตรงข้ามกันจะหักล้างกันเมื่อรวม (สำคัญตอนรวม stereo เป็น mono)
- **ใช้งาน**: ตัด/ลดย่านที่ไม่ใช่ของ VO ใน music bed แทนการลดทั้งเพลง (ดู 2.5)
- **ข้อจำกัด**: ตัวเลขย่านความถี่ของเสียงพูดเป็นค่าประมาณ ต่างตามผู้พูด/เสียง TTS
- **Tier/keys**: B — YorkU_DigitizingAudio · **ความมั่นใจ**: high (ฟิสิกส์), medium (ตัวเลขย่าน)

### 2.2 Sample rate, bit depth, Nyquist
- **คืออะไร**: sample rate ต้องมากกว่า 2 เท่าของความถี่สูงสุดที่ต้องการเก็บ (Nyquist); bit depth กำหนด noise floor ≈ 6.02 dB/bit (+1.76 dB สำหรับ sine เต็มสเกล) → 16-bit ≈ 96 dB, 24-bit ≈ 144 dB
- **กลไก**: bit depth ไม่เกี่ยวกับ frequency response; sample rate ไม่เกี่ยวกับความดัง
- **ใช้งาน**: ทำงานที่ **48 kHz** (มาตรฐานวิดีโอ) และ 24-bit หรือ 32-bit float ระหว่าง mix; ส่งออก AAC 48 kHz. TTS ที่มา 24 kHz ให้ resample ขึ้น 48 kHz ครั้งเดียวก่อน mix (ข้อมูลเหนือ 12 kHz ไม่มีอยู่แล้ว ไม่ได้กลับมา)
- **ข้อจำกัด**: `loudnorm` โหมด dynamic upsample เป็น 192 kHz ภายใน → ต้องใส่ `-ar 48000` เสมอ (FFmpeg_Filters)
- **Tier/keys**: B, C — YorkU_DigitizingAudio, FFmpeg_Filters, Apple_PodcastAudio · **ความมั่นใจ**: high

### 2.3 Dynamic range, SNR, headroom
- **คืออะไร**: dynamic range = ช่วงจากเสียงเบาสุด (noise floor) ถึงดังสุดก่อน clip; SNR = ระดับสัญญาณเทียบ noise; headroom = ระยะจาก peak ถึง 0 dBFS
- **ใช้งาน**: วัด noise floor ในช่องว่างระหว่างประโยค VO (`astats` Noise_floor) — TTS มักสะอาดมาก แต่เสียงที่ลูกค้าอัดมาเองมักมี hiss/hum
- **Tier/keys**: B — YorkU_DigitizingAudio · **ความมั่นใจ**: high

### 2.4 Clipping & true peak
- **คืออะไร**: clipping = สัญญาณเกิน 0 dBFS แล้วถูกตัด (distortion); **inter-sample peak** = คลื่นจริงหลังแปลงเป็น analog/resample สูงกว่าค่า sample สูงสุด → ต้องวัด **true peak (dBTP)** ด้วย oversampling (BS.1770 Annex 2)
- **กลไก**: inter-sample peak อาจสูงกว่า 0 dBFS มาก (NielsenLund2000_0dBFSplus); codec แบบ lossy (AAC) เพิ่ม overshoot อีก
- **ใช้งาน**: R128 จำกัด -1 dBTP ใน production และบอกว่าระบบ distribution/bitrate ต่ำอาจต้องต่ำกว่านี้; Spotify แนะนำ < -1 dBTP สำหรับ lossy และ < -2 dBTP ถ้า master ดังกว่า -14 LUFS → **เราใช้ -1.5 dBTP เป็นเพดานส่งออก** (ค่าเดียวกับ `tools/soundtrack.py`)
- **ข้อจำกัด**: `qc.py` ปัจจุบันวัด sample peak ไม่ใช่ true peak (ดู MIX_PLAYBOOK §7)
- **Tier/keys**: S, A, C — ITU2023_BS1770_5, EBU2020_R128, NielsenLund2000_0dBFSplus, Spotify_Loudness · **ความมั่นใจ**: high

### 2.5 Psychoacoustics: equal-loudness & masking
- **Equal-loudness (ISO 226:2023)**: หูไวต่อเสียงย่านกลางมากกว่าเบสและแหลมสุด โดยเฉพาะที่ระดับเปิดเบา; ฉบับ 2023 ต่างจาก 2003 ไม่เกิน 0.6 dB (Suzuki2024_ISO226) → mix ที่ฟังดังบนหูฟังจะ "บาง" เมื่อเปิดเบาบนมือถือ; **ตัดสิน balance ที่ระดับฟังปานกลาง** และเช็กที่ระดับเบาด้วย
- **Masking**: เสียงหนึ่งกลบอีกเสียงเมื่ออยู่ใน critical band ใกล้กัน; masking แผ่ขึ้นไปทางความถี่สูงมากกว่าลงต่ำ (Moore) → เบส/ย่านกลางต่ำที่หนาของเพลงกลบพยัญชนะของ VO ได้มากกว่าที่ระดับ dB บอก; เสียงที่ "เปลี่ยนสเปกตรัมตลอด" (เนื้อร้อง, กลองถี่) รบกวนการฟังคำพูดมากกว่า pad ที่นิ่ง (ดู M23 irrelevant sound effect)
- **ใช้งาน**: ลด music ช่วง ~1–4 kHz (ย่านความชัดของคำ — ค่า craft) ระหว่าง VO แทนลดทั้งเพลงมาก ๆ; high-pass music bed ที่ ~100–150 Hz ถ้าคลิปเน้นพูด
- **Tier/keys**: S, A — ISO2023_226, Suzuki2024_ISO226, Moore_PsychHearing · **ความมั่นใจ**: high (หลักการ), medium (ตัวเลขย่าน craft)

### 2.6 EQ และ filters
- **คืออะไร**: high-pass (HPF) ตัดต่ำ, low-pass (LPF) ตัดสูง, peaking/bell ยก/ลดย่านแคบ, shelf ยก/ลดทั้งขอบ
- **ใช้งาน (craft, D)**: VO — HPF 70–100 Hz, ลด "มัว" 200–400 Hz -2 ถึง -4 dB, presence 2–5 kHz +1 ถึง +3 dB (ถ้าจำเป็น); off-screen/หลังประตู = LPF 700 Hz–4 kHz (มีแล้วใน `sound.py muffle`)
- **ข้อจำกัด**: EQ ทีละน้อย; TTS แต่ละเสียงต้องการต่างกัน — ฟังก่อนตั้ง
- **Tier/keys**: D — SOS_Sibilance + craft ทั่วไป · **ความมั่นใจ**: medium

### 2.7 Compression, limiting
- **คืออะไร**: compressor ลดความดังส่วนที่เกิน threshold ตาม ratio; attack/release คือความเร็วตอบสนอง; knee คือความนุ่มของจุดเริ่มทำงาน; limiter = compressor ratio สูงมาก + lookahead เพื่อกัน peak
- **กลไก**: เป็นระบบ nonlinear มี memory; feed-forward คาดเดาได้ดีกว่า; RMS detection ตามความรู้สึกดัง, peak detection จับ transient (Giannoulis2012_Compressor)
- **ใช้งาน**: VO compression 2:1–4:1, gain reduction 3–6 dB, attack 5–20 ms, release 80–200 ms (craft) ทำให้ VO สม่ำเสมอบนลำโพงมือถือ; limiter ท้ายสุดเพื่อ true peak
- **ข้อจำกัด**: บีบมากไป = เสียงหายใจ/noise ดังขึ้น, ไร้ชีวิต, pumping
- **Tier/keys**: A — Giannoulis2012_Compressor; ค่า = D · **ความมั่นใจ**: high (กลไก), medium (ค่า)

### 2.8 De-essing, noise reduction, gate
- **De-esser**: compressor เฉพาะย่าน sibilance (ส่วนใหญ่ 5–8 kHz; ไมค์หลายตัวยก ~5 kHz) — มากไปเสียงทึบ/ลิ้นแข็ง (SOS_Sibilance, D). TTS บางเสียงมี "ส/ซ/ช/s" แหลม → de-ess เบา ๆ
- **Noise reduction** (`afftdn`): ลด hiss คงที่; มากไปเกิด "musical noise"/เสียงใต้น้ำ → ใช้ 6–12 dB
- **Gate**: ปิดเสียงเมื่อต่ำกว่า threshold; สำหรับ TTS แทบไม่จำเป็น, ใช้กับเสียงอัดจริงที่มี noise ระหว่างประโยค ตั้ง range ไม่ให้ปิดสนิท (ให้ room tone เหลือ ~10–20 dB ต่ำกว่า) ไม่งั้นช่องว่าง "ดำ" ผิดธรรมชาติ
- **Tier/keys**: C, D — FFmpeg_Filters, SOS_Sibilance · **ความมั่นใจ**: medium

### 2.9 Normalization vs loudness normalization
- **Peak normalization**: ยกให้ peak ถึงค่าที่กำหนด — ไม่บอกความดังที่หูรู้สึก (R128 ข้อ a–b: peak normalisation ทำให้ความดังต่างกันมาก และเป็นสาเหตุคำร้องเรียนอันดับหนึ่ง)
- **Loudness normalization**: วัด **integrated loudness (LUFS)** แบบ K-weighted + gating ตาม BS.1770 แล้วปรับ gain ทั้งไฟล์
- **มาตรฐาน**: EBU R128 = -23.0 LUFS ±1 LU (live), ±0.2 LU สำหรับ QC, ≤ -1 dBTP, วัดทั้งรายการไม่เน้นเฉพาะเสียงพูด (EBU2020_R128, full text)
- **แพลตฟอร์ม** (ดูตารางเต็มใน MIX_PLAYBOOK §5):
  - Spotify: -14 LUFS (Loud -11 / Quiet -19), ยกเสียงเบาขึ้นได้จำกัดด้วย peak (เหลือ 1 dB headroom) — ทางการ
  - Apple Podcasts: -16 LKFS ±1, ≤ -1 dBTP — ทางการ
  - AES TD1008 (distributor guidance): เพลง -16, speech/podcast -18 LUFS (ตามสรุปของ Shepherd)
  - YouTube: **ไม่มีเอกสารทางการเรื่องค่า**; ผู้ปฏิบัติรายงานว่าเป็น -14 LUFS และ YouTube ลดเฉพาะคลิปที่ดังกว่า ไม่ยกคลิปที่เบา (ดูได้จาก Stats for nerds → content loudness)
  - Instagram/Facebook: Meta ใช้ xHE-AAC + MPEG-D DRC — เก็บ loudness metadata แล้วให้แอปเลือก target ตามบริบท (หูฟัง/ลำโพง/เสียงรอบข้าง) **ไม่ประกาศตัวเลข**
  - TikTok: **ไม่พบเอกสารทางการ**; บล็อกต่าง ๆ บอก -14 หรือ -16 ขัดกันเอง
- **ข้อสรุปเชิงปฏิบัติ**: ส่ง master ที่ **-14 LUFS integrated, ≤ -1.5 dBTP** สำหรับวิดีโอโซเชียลทุกแพลตฟอร์ม; ไม่มีประโยชน์ที่จะดังกว่า (จะถูกลดลงและเสีย dynamics) และเบากว่ามากเสี่ยงไม่ถูกยก (YouTube)
- **Tier/keys**: S, C, D — EBU2020_R128, ITU2023_BS1770_5, Spotify_Loudness, Apple_PodcastAudio, AES2021_TD1008, Shepherd_TD1008, Shepherd2017_StatsForNerds, Meta2023_xHEAAC, ForaSoft2026_PlatformLUFS · **ความมั่นใจ**: high (มาตรฐาน), medium (ค่าที่เลือกสำหรับ TikTok/IG/YouTube)

### 2.10 Reverb & delay
- **คืออะไร**: reverb = เสียงสะท้อนรวมของห้อง (pre-delay, decay time, wet/dry); delay = เสียงซ้ำแยกชัด
- **ใช้งาน**: reverb บอก "ที่ไหน" (ห้องเล็ก/โถง/กลางแจ้ง) — `sound.py room()` มีแล้ว; VO ผู้บรรยาย (narrator) ควรแห้งเกือบสนิท อยู่ "นอกฉาก" ใกล้หูผู้ชม; เสียงตัวละครในฉากใส่ reverb เดียวกับ SFX ฉากนั้นให้กลมกลืน
- **ข้อจำกัด**: reverb มากทำให้คำพูดเข้าใจยาก โดยเฉพาะบนลำโพงมือถือและผู้ฟังสูงวัย
- **Tier/keys**: D (craft) · **ความมั่นใจ**: medium

### 2.11 Stereo imaging & mono compatibility
- **คืออะไร**: stereo image = ตำแหน่งเสียงซ้าย-ขวา (pan = ต่างระดับระหว่างหู, ILD); mono compatibility = mix ยังดีเมื่อรวมเป็นช่องเดียว
- **กลไก**: ลำโพงมือถือจำนวนมากเล่นแบบ mono หรือแทบไม่มีระยะ stereo และตัดเบสหนัก (GSMArena_SpeakerTest — วัดแล้วเบสตกชัด แต่ไม่มีตัวเลข cut-off ที่เชื่อถือได้); เสียงที่ทำให้ "กว้าง" ด้วย phase (stereo widener, Haas) อาจหายหรือบางลงเมื่อรวม mono
- **ใช้งาน**: VO และ SFX หลัก **center**; pan เฉพาะ ambience/SFX รอง; เช็ก mono fold (ความดังไม่ควรตกเกิน ~1.5–3 LU — ค่า craft) และฟังผ่าน HPF 150 Hz จำลองลำโพงมือถือ
- **Tier/keys**: B, E — ChengWakefield_HRTF (ใน M22), GSMArena_SpeakerTest · **ความมั่นใจ**: medium

### 2.12 Ducking & VO-to-background level
- **คืออะไร**: ลดเสียงพื้นหลัง (เพลง/บรรยากาศ) ระหว่างมีคำพูด
- **หลักฐาน**: Torcoli et al. 2019 (JAES, ผู้ฟัง 22 คน) — แนะนำ VO ดังกว่า **เพลง ≥ 10 LU** และ **ambience ≥ 15 LU**; ผู้ฟังทั่วไปชอบ LD สูงกว่าผู้เชี่ยวชาญ ~4 LU (เราคือ "ผู้เชี่ยวชาญ" จึงมักตั้ง VO เบาเกินไป); ผู้ฟังอายุเกิน 50 ต้องการ ≥ 7 LU; ความชอบต่างกันมากระหว่างคน. Ward & Shirley 2019 (systematic review): ความเข้าใจคำดีขึ้นด้วย speech-to-noise ratio, การแยกตำแหน่ง, และ redundancy (ซับไตเติล)
- **ใช้งาน**: duck ด้วย sidechain หรือ volume automation จาก timing ของ VO (`sound.py duck`); ตั้งเป้า LD 10–15 LU ช่วงพูด แล้วให้เพลงขึ้นกลับในช่องว่าง (ramp 150–400 ms)
- **ข้อจำกัด**: ผลจากรายการสารคดีทีวีเยอรมัน ผู้ฟังหูปกติ — ยังไม่มีงานเฉพาะคลิปสั้นมือถือหรือภาษาไทย
- **Tier/keys**: A — Torcoli2019_Ducking, WardShirley2019 · **ความมั่นใจ**: medium-high

### 2.13 Mastering for social video
- ลำดับ: stems สะอาด → balance (VO นำ) → bus compression เบา → loudness ไป -14 LUFS → true-peak limit -1.5 dBTP → encode AAC 48 kHz ≥ 192 kbps (ค่าที่ใช้ใน soundtrack.py)
- เช็กบน: ลำโพงมือถือ (mono, เบส หาย), หูฟัง, ระดับเปิดเบา
- **Tier/keys**: S, C — EBU2020_R128, Spotify_Loudness, Meta2023_xHEAAC · **ความมั่นใจ**: medium

---

## 3. Contested / replication notes
- **ค่า LUFS ของ TikTok/IG/YouTube**: ไม่มีตัวเลขทางการ; บล็อกให้ -14, -16, หรือ -10 ถึง -12 ขัดกัน; Meta ยืนยันเองว่าใช้ target แบบ adaptive ตามอุปกรณ์ → ความมั่นใจ low ต่อ "ตัวเลขที่แพลตฟอร์มใช้จริง", medium ต่อ "-14 เป็นค่าส่งที่ปลอดภัย"
- **ค่า True peak**: R128 -1 dBTP (production); Spotify -1 หรือ -2; บล็อกอ้าง EBU Tech 3344 ว่า -3 dBTP สำหรับ lossy แต่ไม่ได้อ่านต้นฉบับ (unverified)
- **การวัดต่างเครื่องมือ**: ทดสอบใน session นี้ `loudnorm` pass-1 รายงาน -22.08 LUFS ขณะ `ebur128` วัด -21.2 LUFS บนสัญญาณสังเคราะห์ (sine stereo + pink noise mono) → linear pass 2 ได้ -13.2 แทน -14.0. **ต้องวัดผลลัพธ์ซ้ำเสมอ** และใช้มิเตอร์ตัวเดียวตลอด pipeline (เสนอ `ebur128`)
- **Ducking LD**: ความชอบต่างกันมากระหว่างบุคคล (Torcoli) — ตัวเลขเป็น "อย่างน้อย" ไม่ใช่ค่าที่ดีที่สุดสำหรับทุกคน

## 4. Applied patterns for our production
- **Story clip ภาษาไทย (TTS + เพลง + SFX)**: VO ผ่าน chain ใน MIX_PLAYBOOK §2 → เพลง duck ให้ต่ำกว่า VO ≥ 10 LU ขณะพูด, ambience ≥ 15 LU → SFX สำคัญ (ประตู, แก้ววาง) ดังได้ใกล้ VO แต่ไม่ทับคำ → master -14 LUFS / -1.5 dBTP
- **คลิปสินค้าแว่น (ไม่มี VO, เพลงล้วน)**: เพลงคือ "VO" — normalize -14, ระวัง true peak ของเพลงที่มาสเตอร์ดังมาก (ลดลงอย่างเดียว)
- **Reels จาก carousel (เพลงที่ผู้ใช้ใส่ภายหลัง)**: ถ้าเพลงใส่ในแอป IG ระดับเพลงถูกตั้งในแอป — ส่ง SFX/ambience ที่ระดับต่ำพอให้มีที่ว่าง (เช่น SFX bus -20 ถึง -24 LUFS) เพื่อเพลงไม่ต้องสู้
- **งานลูกค้าอื่น (podcast/เสียงล้วน)**: -16 LUFS (Apple) หรือ -18 (TD1008 speech)

## 5. Anti-patterns
- Peak-normalize ทุกไฟล์ที่ 0 dBFS แล้วคิดว่า "ดังเท่ากัน"
- เร่งความดังเป็น -8 LUFS เพื่อ "ดังกว่าคนอื่น" — แพลตฟอร์มลดลงอยู่แล้ว เหลือแต่ distortion
- ตัดสิน mix บนหูฟังดี ๆ อย่างเดียว ไม่เช็กลำโพงมือถือ/mono
- Widener/phase trick บน VO หรือเบส
- Gate ปิดสนิทจนช่องว่างระหว่างประโยคเงียบดำ (ไม่มี room tone)
- เชื่อตัวเลข "TikTok ต้อง -14 LUFS" ว่าเป็นข้อบังคับทางการ
- ใช้ `loudnorm` single-pass กับเพลง/คลิปที่มี dynamics ตั้งใจ — โหมด dynamic บีบ LRA (ทดสอบ: LRA 7.1 → 3.6)

## 6. Open questions / research next
- งานวิจัย VO-to-music LD สำหรับคลิปสั้นบนลำโพงมือถือ และสำหรับภาษาวรรณยุกต์ (ไทย) — tone อาจไวต่อ masking ต่างจากภาษาอังกฤษหรือไม่
- อ่าน EBU Tech 3344 (true peak สำหรับ lossy) และ AES77-2023 ฉบับเต็ม
- วัดจริง: อัปโหลดคลิปทดสอบหลายระดับ (-10/-14/-18 LUFS) ขึ้น YouTube/IG/TikTok แล้ววัดเสียงที่เล่นออกมา (เป็นการทดลองของเราเอง)
- ข้อมูล frequency response ลำโพงมือถือที่เชื่อถือได้ (งานตีพิมพ์)
