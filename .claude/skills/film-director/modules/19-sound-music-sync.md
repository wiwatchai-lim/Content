# FD19 — Sound Design & Music Sync (diegetic, synchresis, added value, hit points, beat-sync, J/L, room tone, SFX layering)

> ต่อยอด ไม่ซ้ำ: 5 ชั้นเสียง, sync rules, ระดับมิกซ์, genre palettes, เสียงสถานที่ไทย อยู่ใน `story-clips/_craft/FX.md` Part 2;
> แนวคิด synchresis/added value/foley/silence อยู่ใน `creative-intelligence/knowledge/sound/README.md` (+ `SOUND_DESIGN_LIBRARY.md` event→recipe, spot-sheet);
> mood→music brief และกฎตัดเพลง ใน `knowledge/music/MUSIC_DIRECTION.md`; loudness/ducking ใน `knowledge/audio-engineering/MIX_PLAYBOOK.md`
> เครื่องมือ: `story-clips/_craft/sound.py` (`Bed`: amb/hit/steps/room/muffle/duck), `tools/soundtrack.py` (beat สังเคราะห์ + SFX ตาม cue), librosa (beat tracking, ติดตั้งแล้วตาม CLAUDE.md)
> บทนี้เพิ่ม: **ความทนต่อการคลาดเคลื่อน (หลักฐาน) → กฎเฟรม**, คณิตศาสตร์ beat→เฟรม, รูปแบบการ sync (catch/play-through/mickey-mousing),
> งานวิจัยว่าเพลงเปลี่ยนความหมาย/ไม่เปลี่ยนการมอง, และเสียงซ่อนรอยตัด — patterns อยู่ใน `libraries/SOUND_SYNC_LIBRARY.json`

## 1. นิยามและหลักการพื้นฐาน
- **Diegetic** = เสียงในโลกของเรื่อง (ตัวละครได้ยิน: บทพูด ฝีเท้า วิทยุในฉาก) · **Non-diegetic** = เสียงนอกโลก (เพลงประกอบ, VO ผู้บรรยาย, stinger) · เส้นแบ่งเล่นได้ (เพลงวิทยุกลายเป็นเพลงประกอบ = "trans-diegetic") [CRAFT; คำศัพท์มาตรฐานในตำราเสียงภาพยนตร์ เช่น `Chion2019_AudioVision`, `Sonnenschein2001_SoundDesign`]
- **On-screen / off-screen** — แหล่งเสียงเห็นหรือไม่เห็นในเฟรม; เสียงที่ไม่เห็นต้นทางสร้างความสงสัย/พื้นที่นอกเฟรม [CRAFT]
- **Synchresis** (Chion) = เสียงกับเหตุการณ์ภาพที่เกิดพร้อมกันถูกหลอมรวมโดยอัตโนมัติ ไม่ว่าเสียงจะ "ถูกต้อง" หรือไม่ (เสียงต่อยที่พากย์ทับ) · **Added value** = คุณค่าที่เสียงเพิ่มให้ภาพจนรู้สึกว่ามาจากภาพเอง [A, `Chion2019_AudioVision` (bibliographic); ดู `knowledge/sound` §2.1–2.2]
- **Hit point** = เฟรมที่เสียง/ดนตรีต้อง "จับ" (การกระแทก ตัด เผย) · **Spotting** = ประชุมดูหนังแล้วกำหนดว่าเสียง/เพลงเริ่ม-จบ-จับที่ไหน [B, `KarlinWright2004_OnTheTrack` (TOC: spotting, timings & clicks)]
- **J-cut** = เสียงช็อตถัดไปเริ่มก่อนภาพ · **L-cut** = เสียงช็อตก่อนต่อเลยทับภาพใหม่ (split edit) [C, `Adobe_JLCut`]
- **Room tone (presence)** = "ความเงียบ" ของสถานที่ อัด ≥ 30 s ต่อสถานที่/เซ็ตอัพ ใช้เติมช่องว่างให้รอยตัดบทพูดไม่ขาด [D, `RoomTone_Presence`]

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 ความคลาดเคลื่อนที่ยอมได้ → กฎเฟรม
| หลักฐาน | ค่า |
|---|---|
| ITU-R BT.1359: ตรวจพบได้ | เสียงนำภาพ ~+45 ms, เสียงตามภาพ ~−125 ms; ยอมรับได้ +90 / −185 ms; คนไวต่อ "เสียงมาก่อน" มากกว่า [S, `ITU_BT1359`] |
| ฟิล์ม (ITU-R BR.265 ที่ BT.1359 อ้าง) | ± ครึ่งเฟรม (~22 ms ที่ 24 fps) |
| บทพูด (van Wassenhove 2007) | หน้าต่าง ~200 ms ไม่สมมาตร ยอมให้ภาพนำมากกว่า [A, `vanWassenhove2007`] |
| สิ่งเร้าซับซ้อน (Vatakis & Spence 2010) | กว้างหลายร้อย ms ไม่สมมาตร ขึ้นกับชนิด; บทพูดตัดสินแม่นกว่าดนตรี [A, `VatakisSpence2010`] |
**กฎที่ได้** (24 fps, 1 F = 41.7 ms): SFX ตรงเฟรมกระทบ = ดีที่สุด; ช้า 1–2 F ยังไม่สังเกต; **เร็ว 1 F อยู่ที่ขอบการตรวจพบ (≈45 ms)**, เร็ว 2 F (83 ms) ตรวจพบได้ → ปากนำเสียง 1 F (rig `talk`) ปลอดภัยเพราะเป็น "ภาพนำ" ซึ่งยอมได้มากกว่า
**ข้อขัดแย้ง (contested):** FX.md §2.2 บอก "เสียงเร็ว 1 เฟรมรู้สึกแน่นกว่าช้า 1 เฟรม" [CRAFT] ส่วนหลักฐาน broadcast บอกว่าเสียงที่มาก่อนตรวจพบง่ายกว่า → ข้อยุติชั่วคราว: **วางที่เฟรมกระทบพอดี (0 F)**; ถ้าต้องเลื่อน ให้เลื่อนไปทางช้า ≤ 1 F; ยกเว้นเสียงที่มี attack ช้า (whoosh, swell) ต้องวาง "จุดพีค" ที่เฟรม ไม่ใช่จุดเริ่ม. ความมั่นใจ: กลาง (ข้อมูล broadcast เป็นบทพูด/ใบหน้า ไม่ใช่ cartoon hit)

### 2.2 เสียงซ่อนรอยตัด (หลักฐาน)
- คัตต่อเนื่อง (continuity) ถูกมองข้ามมากกว่า; ~1/4 ของคัตระหว่างสองมุมของฉากเดียวพลาด และเพิ่มเป็น ~1/3 เมื่อคัตตรงกับการเริ่มเคลื่อนไหว [A, `SmithHenderson2008_EditBlindness`]
- Match-action cuts ถูกพลาด 32.4% และ **edit blindness แทบหายไปเมื่อปิดเสียง** [A, `SmithSantacreu2017_MatchAction`, search summary]
→ กฎ: เสียงพื้น (ambience/room tone/เพลง) ต่อเนื่องข้ามคัต + คัตบนการเคลื่อน = คัตล่องหน; อยากให้คนรู้สึกการตัด (smash cut) → เปลี่ยนเสียงพร้อมภาพอย่างแรง

### 2.3 เพลงเปลี่ยนความหมาย แต่ไม่ได้นำสายตา
- Soundtrack เปลี่ยน "ความหมาย" ของฉาก [A, `LipscombKendall1994`]; คลิปกำกวมถูกตีความตามอารมณ์เพลง (บวก/ลบ) [A, `Boltz2001`]
- Congruence-Association Model: ความสอดคล้องเชิงโครงสร้าง (accent ตรงกัน) ดึงความสนใจไปยังสิ่งที่ sync; association ของเพลงระบายอารมณ์ให้ภาพกลาง ๆ [A, `Cohen2015_CAM`]
- ในฉาก slow-motion เพลงเพิ่ม arousal (pupil) แต่ **ไม่เปลี่ยนการเคลื่อนตาอย่างเป็นระบบ**; คัตกำหนดการมองมากกว่า [A, `HammerschmidtWollner2018`]
→ ใช้ภาพ (คัต, motion, contrast) นำสายตา; ใช้เพลงกำหนดความรู้สึกและความหมาย

### 2.4 Accent alignment: consonant / out-of-phase / dissonant
Lipscomb นิยามการวางเพลงกับภาพ 3 แบบ: **consonant** (accent อัตราเดียวกันและตรงกัน), **out-of-phase** (อัตราเดียวกันแต่เหลื่อม), **dissonant** (ไม่สัมพันธ์) [B, `Lipscomb1995_AccentAlignment` — ผลการทดลองยังไม่ได้อ่าน]
งานวิจัย music video คัต on-beat vs off-beat พบความต่างด้าน cognition/attention [A, `SwenbergCarlgren2021_OnBeat`] — **ยังไม่รู้ทิศทาง** จึงห้ามอ้างว่า "on-beat ดีกว่าเสมอ"
Craft [CRAFT]: on-beat = พลัง ความสนุก (beat clip, promo); off-beat/ปล่อยไหล = ความต่อเนื่องทางอารมณ์ (story); ทุกคัตตรง beat ตลอดคลิป = จังหวะเครื่องจักร น่าเบื่อหลัง ~10 s → ใช้ downbeat/phrase (ทุก 2–4 bar) สำหรับคัตใหญ่

### 2.5 คณิตศาสตร์ beat → เฟรม
`frames_per_beat = fps × 60 / BPM`
| BPM | @24 fps | @30 fps | หมายเหตุ |
|---|---|---|---|
| 60 | 24 | 30 | |
| 90 | 16 | 20 | |
| 100 | 14.4 | 18 | 24 fps ไม่ลงตัว |
| 120 | 12 | 15 | ลงตัวทั้งคู่ |
| 128 | 11.25 | 14.06 | ไม่ลงตัว |
| 140 | 10.29 | 12.86 | |
ถ้าไม่ลงตัว: **คำนวณเวลาคัตจาก beat time จริง แล้วปัดเป็นเฟรมที่ใกล้สุดทีละจุด** (`frame_k = round(t_beat_k × fps)`) ห้ามบวกสะสม 14 F ไปเรื่อย ๆ (ที่ 100 BPM/24 fps หลุด 0.4 F ต่อ beat → 60 beat (36 s) หลุด 24 F = 1 วินาทีเต็ม) — ดีที่สุดคือใช้ beat times จาก librosa (`beat_track`) ของเพลงจริง เพราะเพลงจริงไม่ได้ tempo คงที่เสมอ

### 2.6 Sync styles ของดนตรีกับภาพ [CRAFT + `KarlinWright2004_OnTheTrack` vocabulary]
- **Catch (hit)** — ดนตรีเน้นตรง hit point (ประตูปิด, ล้ม, logo)
- **Play through** — ดนตรีไหลข้ามเหตุการณ์ ไม่จับ (อารมณ์ต่อเนื่อง)
- **Mickey-mousing** — ดนตรีเลียนทุกการเคลื่อน (การ์ตูนคลาสสิก, ตลก) — ใช้กับ dramatic content จะดูล้อเลียน
- **Stinger** — เสียงสั้นกระแทกบนการเผย/ตลก
- **Silence hit** — ตัดทุกเสียงก่อน/บนจุดสำคัญ (ดู `knowledge/sound` §2.10)

### 2.7 SFX layering (สร้างเสียงเดียวจากหลายชั้น) [CRAFT, ต่อจาก FX.md 2.1]
| ชั้น | หน้าที่ | ตัวอย่าง "แว่นวางบนโต๊ะ" |
|---|---|---|
| Transient (click/attack) | ความคม sync เฟรม | คลิกพลาสติก/โลหะ |
| Body (mid) | วัสดุ น้ำหนัก | ไม้โต๊ะ thump เบา |
| Sweetener / tail | ความหรู/พื้นที่ | shimmer เบา + reverb ห้อง |
| Sub (ถ้า hero) | แรงกระแทก | 50–80 Hz สั้น (ไม่ใส่ถ้าออกลำโพงมือถือเท่านั้น — ไม่ได้ยิน) |
กฎ: transient ตรงเฟรม, body ช้าได้ 0–1 F, tail ยาวตามขนาดห้อง; ทุกชั้นผ่าน `b.room()` เดียวกัน

### 2.8 Murch Rule of Six กับ beat-cut
ลำดับความสำคัญของคัต: emotion > story > rhythm > eye-trace > 2D plane > 3D space (น้ำหนักตามที่แหล่งรองรายงาน 51/23/10/7/5/4%) [B, `Murch2001_Blink`, craft] → ถ้า beat บังคับให้คัตก่อนที่ reaction จะจบ: **อารมณ์ชนะ เลื่อนคัตไป beat ถัดไปหรือ off-beat**

## 3. เหตุผลที่ใช้
เสียงทำให้ภาพเคลื่อนไหวน้อย (rig, 2.5D, ภาพนิ่ง) รู้สึกมีน้ำหนักและต่อเนื่อง (synchresis/added value); ซ่อนรอยตัด; กำหนดความหมาย; บน Reels ส่วนใหญ่คนดูเปิดเสียงกับเพลง แต่ต้องรองรับการดูแบบปิดเสียงด้วย (ซับ/ภาพเล่าได้)

## 4. ผลต่ออารมณ์และการรับรู้
| การเลือก | ผล |
|---|---|
| Hit ตรงเฟรม | แรงกระแทกจริง "ภาพหนักขึ้น" [A, synchresis] |
| เสียงล้ำหน้าภาพ ≥ 2 F | รู้สึก "ผิด" / พากย์ไม่ตรง [S, ITU] |
| เงียบก่อนเผย 0.5–1.5 s | ตึง คาดหวัง [CRAFT, FX §2.6] |
| เพลงบวกบนภาพกำกวม | ตีความบวก (และกลับกัน) [A, Boltz2001] |
| เสียงพื้นต่อเนื่องข้ามคัต | คัตล่องหน ลื่น [A, Smith 2008/2017] |
| Mickey-mousing | ตลก การ์ตูน ไม่จริงจัง [CRAFT] |

## 5. ใช้เมื่อไร
- Story clip: ทุกฉาก (5 ชั้น + room tone), J-cut ambience ทุกครั้งที่เปลี่ยนสถานที่
- Beat clip/promo: คัตใหญ่บน downbeat, kinetic type บน beat, hit บน logo
- Cartoon: SFX ทุก contact (ฝีเท้า, ตกพื้น), stinger บน take
- Explainer: soft UI clicks บนไอคอนเข้า (เบา −20 dB vs VO)

## 6. ไม่ควรใช้เมื่อไร
- Hit/stinger ทุกคัต (เหนื่อยหู, ไม่มีอะไรเด่น)
- Mickey-mousing ในฉากเศร้า/ดราม่าจริงจัง
- Sub-bass hits เพื่อ "อลัง" ในคลิปที่คนดูบนลำโพงมือถือเท่านั้น (ไม่ได้ยิน แต่กิน headroom)
- เพลงที่มีเนื้อร้องใต้ VO ภาษาเดียวกัน (แย่งคำ; ดู MUSIC_DIRECTION §4)
- เงียบสนิทแบบ digital zero กลางฉาก (ฟังเหมือนไฟล์เสีย) — ใช้ room tone

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- เสียงต่อยที่พากย์ทับในฉากต่อสู้ = ตัวอย่างมาตรฐานของ synchresis ของ Chion [`Chion2019_AudioVision` ผ่านบทวิจารณ์]
- คัต match-action ในหนังจริงถูกพลาดเพราะเสียงต่อเนื่อง [`SmithSantacreu2017_MatchAction`]
- ฉากจากหนังเชิงพาณิชย์ 5 ฉากกับดนตรีต้นฉบับ/สลับ เปลี่ยนความหมาย [`LipscombKendall1994`]
- ตัวอย่างเพิ่มเติมของ Hitchcock/sound design ดู `knowledge/sound/sources.json` (`InsideScience_Hitchcock`)

## 8. ประยุกต์ตามประเภทวิดีโอ
| ประเภท | ใช้อย่างไร |
|---|---|
| Story clip (Thai TTS) | VO = king; room tone ทุกฉาก; ฝีเท้าจาก contact times ของ `walk`; J-cut ambience 0.3–0.6 s; L-cut เสียงพูดทับ reaction; ปากตามเสียง (ห้ามเลื่อนเสียงให้ตรงปาก) |
| Product/promo | เพลงสต็อก/สังเคราะห์ (`soundtrack.py`), แว่นเข้า = whoosh พีคที่จุดเร็วสุด + click ตอนหยุด, ราคา = soft hit บน downbeat |
| Reels/TikTok | beat-cut ตาม librosa beat times, เปลี่ยนเพลงได้โดยผู้ใช้ (CLAUDE.md: music added later) → วาง cue SFX ให้ไม่ชนกับเพลงที่ยังไม่รู้: เบาและสั้น |
| Explainer | ambience เบา, UI clicks, ไม่มีเพลงเนื้อร้อง |
| Cartoon | Mickey-mousing ได้, boing/slide whistle (FX §2.4), stinger บน take |
| Talking head/doc | room tone เติมทุกรอยตัด jump cut, L-cut เสียงสัมภาษณ์ทับ B-roll |

## 9. AI image prompt examples
(ภาพไม่ใช่เสียง — ใช้ทำ visual hit points ให้ sync ได้)
1. `a single drop of water hitting a still surface, frozen at the moment of impact, macro, black background` (ภาพสำหรับ hit frame)
2. `cartoon impact star burst frame, flat colours, no text` (impact FX สำหรับวางบนเฟรมกระทบ)

## 10. AI video prompt examples
โมเดลวิดีโอส่วนใหญ่ไม่รับประกัน sync กับเพลงที่เรามี → gen ภาพ แล้วตัด/retime ให้ตรง beat ใน HyperFrames/ffmpeg
1. `a hand places eyeglasses on a wooden table, the glasses touch the table at the midpoint of the clip, static camera` (บอกจังหวะกระทบไว้กลางคลิปเพื่อให้หาเฟรมได้)
2. `slow push-in, no sudden movements, constant speed` (plate ที่ตัดตรงไหนก็ได้ตาม beat)
3. ถ้าโมเดลสร้างเสียงเองได้ (บางรุ่นของ Veo/Kling ตาม FD22) ให้ถือเป็น draft — แทนที่ด้วยเสียงจาก `sfxlib/` ที่เราคุม sync เอง

## 11. Shot list example (spotting sheet 8 s, 24 fps, 120 BPM = 12 F/beat)
| # | t | frame | ภาพ | เสียง | sync type | gain |
|---|---|---|---|---|---|---|
| 1 | 0.00 | 0 | wide ร้าน | ambience ร้าน + เพลงเริ่ม | play through | amb −22 |
| 2 | 2.00 | 48 | cut MS ทอน (downbeat bar 2) | — | beat cut | |
| 3 | 2.75 | 66 | ทอนหยิบแว่น | cloth rustle | foley | −14 |
| 4 | 3.50 | 84 | แว่นวาง | click+thump+tail | catch (hit) | −8 |
| 5 | 4.00–4.90 | 96–118 | — | duck เพลง −12 dB | silence-ish | |
| 6 | 5.00 | 120 | reveal เลนส์ (downbeat bar 3) | stinger shimmer | catch | −10 |
| 7 | 6.40 | 154 | cut โลโก้ | J-cut: เสียงประตูร้านเริ่ม 6.0 | J-cut | −12 |
→ ใช้ `Bed.hit('…', t, gain)` / `b.duck(4.0, 4.9, -12)` / soundtrack.py cues `{"t":3.5,"file":"pop"}`

## 12. ข้อผิดพลาดที่พบบ่อย
1. วาง whoosh ที่จุดเริ่มแทนจุดพีค
2. Riser จบก่อน/หลังคัต
3. เงียบ digital zero ระหว่างประโยค TTS (ไม่มี room tone)
4. ทุกคัตบน beat ตลอดคลิป (เครื่องจักร) หรือคัตทับ reaction
5. BPM ไม่ลงตัวแล้วบวกเฟรมสะสม → drift
6. เพลงดังจนกลบ VO (ดู MIX_PLAYBOOK: LD ≥ 10 LU)
7. ใช้เสียงเดียวกันซ้ำ (ฝีเท้าเหมือนกันทุกก้าว) — สุ่ม 3–4 variation + pitch ±3%

## 13. วิธีตรวจและแก้
- **Frame-step check**: เปิดวิดีโอที่ 24 fps เดินทีละเฟรมรอบ hit → waveform transient ต้องอยู่เฟรมเดียวกับภาพกระทบ (แก้: เลื่อน cue ให้ transient = frame/fps)
- **Mute test**: ปิดเสียงดู — คลิปยังเข้าใจไหม (ซับ/ภาพ); **eyes-closed test**: ฟังอย่างเดียว — รู้ไหมว่าเปลี่ยนสถานที่ตอนไหน
- **Cut audibility**: ฟังรอยตัดทุกจุด มี "รู" ไหม → เติม room tone/ crossfade 2–4 F
- **Beat grid**: overlay beat times (librosa) บน timeline; คัตใหญ่ควรอยู่ ±1 F จาก beat ที่ตั้งใจ
- **Loudness**: ตาม MIX_PLAYBOOK (−14 LUFS, TP −1.5)

## 14. แบบฝึกหัด + test case
1. **Synchresis**: ภาพแว่นวางโต๊ะเดียวกัน ใส่ 3 เสียง (คลิกพลาสติก / กริ๊งแก้ว / ทุ้มไม้) → ถามว่า "แว่นทำจากอะไร ราคาประมาณเท่าไร" (เสียงเปลี่ยนการรับรู้วัสดุ)
2. **Offset test**: hit เดียวกันวาง −2, −1, 0, +1, +2 F → ให้ 3 คนบอกว่าอันไหน "ตรง" (ทดสอบกฎ 2.1 กับการ์ตูนของเรา; บันทึกผลใน LEARNING-LOG)
3. **Music meaning**: ฉากกำกวม (ทอนมองประตู) กับเพลง major/ minor/ ไม่มีเพลง → ถามว่าจะเกิดอะไรต่อ (ทดลองซ้ำแบบ Boltz2001)
4. **Beat vs emotion**: montage 10 s คัตทุก beat vs คัตทุก 2 bar + 1 คัต off-beat ที่ reaction → อันไหนดูจบ
- ผ่านเมื่อ: ทุก hit อยู่ 0/+1 F, ไม่มีรูเสียง, คัตใหญ่ ±1 F จาก beat ที่ตั้งใจ, VO ชัด LD ≥ 10 LU

## 15. แหล่งอ้างอิง
`Chion2019_AudioVision`, `ITU_BT1359`, `vanWassenhove2007`, `VatakisSpence2010`, `LipscombKendall1994`, `Lipscomb1995_AccentAlignment`, `Cohen2015_CAM`, `Boltz2001`,
`SmithHenderson2008_EditBlindness`, `SmithSantacreu2017_MatchAction`, `SwenbergCarlgren2021_OnBeat`, `HammerschmidtWollner2018`, `Murch2001_Blink`,
`Sonnenschein2001_SoundDesign`, `KarlinWright2004_OnTheTrack`, `Adobe_JLCut`, `RoomTone_Presence`
+ repo: `story-clips/_craft/FX.md` Part 2, `sound.py`, `tools/soundtrack.py`, `creative-intelligence/knowledge/sound/` (README, SOUND_DESIGN_LIBRARY), `knowledge/music/MUSIC_DIRECTION.md`, `knowledge/audio-engineering/MIX_PLAYBOOK.md`
