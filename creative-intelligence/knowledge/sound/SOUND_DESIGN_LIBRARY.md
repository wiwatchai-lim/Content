# SOUND_DESIGN_LIBRARY — event → sound recipe

ตารางสูตรเสียงตาม "เหตุการณ์" ใช้ได้กับทุกงาน (story, สินค้า, ลูกค้าอื่น). ไฟล์ที่อ้างอยู่ใน `story-clips/_craft/sfxlib/<category>/<name>.wav` (83 ไฟล์ ตรวจเมื่อ 2026-11-25; credits ใน `sfxlib/CREDITS.md` — ไฟล์ CC BY ต้องใส่เครดิตในแคปชัน)
วางด้วย `sound.py`: `b.hit(name, t, gain_db)`, `b.amb(name, t0, t1, gain_db)`, `b.steps(...)`, `b.duck(...)`, `b.muffle(...)`, `riser()/sub()/tone()/reverse()`

ป้าย: **[S/A]** หลักการมีหลักฐาน (README), **[D]** craft. ระดับเป็นค่าเริ่มสัมพัทธ์กับ VO ที่ -16 LUFS (ถ้าไม่มี VO ให้เทียบกับเพลง) — ปรับด้วยหู
กฎกลาง: hit ตรงเฟรม contact หรือเร็ว ≤ 1 เฟรม [S BT.1359]; ambience ≥ 15 LU ใต้ VO, เพลง ≥ 10 LU ใต้ VO [A Torcoli]; เสียงชนิดเดียวกันซ้อนไม่เกิน ~2.5 ชั้น, รวมต่างชนิดไม่เกิน ~5 ชั้นต่อ ~5 s [D Murch]
`—` = ไม่มีไฟล์ที่ตรงใน sfxlib (ใช้ synth ของ sound.py หรือ `fetch.py "<ชื่อเจาะจง>" <category>`)

---

## 1. Motion & transitions

| Event | Layers (sfxlib) | Timing | Level / processing | ทำไม |
|---|---|---|---|---|
| ของ/กล้องเคลื่อนเร็วผ่านเฟรม | `design/whoosh` หรือ `design/swoosh-fast` | peak ของ whoosh = จุดที่ของผ่านกลางเฟรม; ความยาว ≈ ระยะการเคลื่อน | -14 ถึง -10 dB, pan ตามทิศ (-0.6→+0.6) | added value + vectorisation [A Chion] |
| เปลี่ยนสไลด์/ช็อตแบบนุ่ม | `design/whoosh` ตัดหาง (`max_len`, fade_out) | จบตรง cut | -18 dB, lowpass 6 kHz | ไม่ให้ทุก cut ดังเท่ากัน |
| Whip pan / swipe | `design/swoosh-fast` + `cartoon/zip-whoosh-cartoon` (ถ้าโทนตลก) | ตรงกับเฟรม blur | -12 dB | |
| สร้างความตึงก่อน reveal | `design/riser-tension` หรือ `riser()` synth; หรือ `design/reverse-cymbal` | **จบตรงเฟรม reveal** (วาง t = cut − ความยาว) | ค่อย ๆ ดังขึ้นถึง -10 dB, cut ทันทีที่ reveal | looming bias: rising ดูใหญ่เกินจริง [A Neuhoff] → ใช้ ≤ 1–2 ครั้ง/30 s |
| Reveal / ราคา / โลโก้ปรากฏ | `design/impact-boom` หรือ `design/sub-drop` (+ `sub()`) + เงียบ 0.3 s ก่อน | ตรงเฟรมแรกที่เห็น | -8 ถึง -6 dB, ระวัง true peak | contrast จาก silence |
| คลายตัว/จบช่วง | `design/tape-stop` (ตลก/ขัดจังหวะ), reverse ของ riser (downlifter) | หลังจุดพีค | -14 dB | release ความตึง |
| ภาพ glitch / สัญญาณขัดข้อง | `design/glitch` + `objects/radio-static` | ตรงเฟรม glitch (1–3 F) | -14 dB, สั้น | synchresis กับภาพแตก |
| เปลี่ยนเวลา/ย้อนอดีต | `design/shimmer` → crossfade ambience ใหม่ | shimmer 0.5 s ก่อน cut | -18 dB | บอก "อีกโลก" |

## 2. Body & character (foley)

| Event | Layers | Timing | Level / processing | ทำไม |
|---|---|---|---|---|
| เดินบนพื้นไม้ (ในบ้าน/ร้าน) | `foley/footsteps-wooden-floor` (หรือ `b.steps` + `body/footstep-creak`) | ทุกเฟรมเท้าแตะ | -16 dB, vary=True | foley = น้ำหนักตัว [D Ament] |
| เดินนอกบ้าน/ทางกรวด | `foley/footsteps-gravel` | ทุก contact | -16 dB | วัสดุบอกสถานที่ |
| วิ่ง | `foley/footsteps-running` (จริง) / `cartoon/cartoon-run` (ตลก) | loop ตามช่วงวิ่ง | -14 dB | |
| ตัวละครขยับใหญ่ (ลุก นั่ง หมุนตัว) | `foley/cloth-rustle` (+ `foley/chair-creak` ถ้านั่ง) | ตรงการขยับ | -22 ถึง -20 dB (แทบไม่รู้ตัว) | ทำให้ฉาก "มีชีวิต" |
| ถอนหายใจ/เหนื่อย/ผิดหวัง | `body/sigh` | หลังประโยค ไม่ทับคำ | -14 dB | contagion ทางเสียง |
| ตกใจ | `body/gasp` + (`design/stinger-horror` ถ้าหนัก) | ตรงเฟรมตาเบิก | -12 dB | |
| กลัว/ตื่นเต้น | `body/heartbeat` (ช้าลงเมื่อสงบ) + `body/breath-scared` | ใต้ฉากตึง, ช่วง 0.75 s/ครั้ง | -20 dB + vignette pulse (FX.md) | arousal cue |
| กลืนน้ำลาย/ลังเล | `body/swallow` | ก่อนพูดประโยคยาก | -16 dB | |
| กระซิบ/ความลับ | `body/whisper` (off-screen) | — | -20 dB, pan ข้าง, wet .3 | ใกล้ชิด/ลึกลับ |
| คนดู/เพื่อนหัวเราะ | `body/crowd-laugh` | หลัง punchline 0.3–0.5 s | -14 dB | |

## 3. Objects & props

| Event | Layers | Timing | Level / processing | ทำไม |
|---|---|---|---|---|
| วางแว่นบนโต๊ะ (product hero) | `foley/glasses-put-on-table` | ตรงเฟรมขาแว่นแตะโต๊ะ | -10 dB, wet .15, ไม่มีเพลงทับ 0.3 s | synchresis = วัสดุ/น้ำหนักของสินค้า [A] |
| เปิดประตูร้าน / ลูกค้าเข้า | `objects/shop-door-bell` + `foley/door-creak` | กระดิ่งตรงประตูขยับ | -12 dB | |
| ประตูปิด / ปิดฉาก | `foley/door-close` (นุ่ม) / `foley/door-slam` (โกรธ) | ตรงเฟรมปิด | -10 / -6 dB + `cam.shake` เมื่อ slam | |
| เคาะประตู | `foley/door-knock` | ตามภาพ | -12 dB, muffle ถ้าอยู่อีกฝั่ง | |
| ล็อก/ไข/สำเร็จ | `foley/key-lock-click` | ตรงเฟรม | -14 dB | "click" = ปิดดีล |
| จดบันทึก/วางแผน | `foley/pen-writing` + `foley/paper-rustle` | ใต้ภาพเขียน | -20 dB | ตัวละครดินสอ Mint & Tao: ใช้เป็น "เสียงตัว" |
| เปิดจดหมาย/กระดาษ | `foley/letter-unfold`, `foley/page-turn` | ตามภาพ / เปลี่ยนสไลด์ | -16 dB | page-turn = transition ของ carousel |
| เครื่องดื่ม/คาเฟ่ | `foley/pour-water` + `foley/cup-on-table` | ตามภาพ | -14 dB | รส/สัมผัส |
| ไอเดีย/สวิตช์ | `foley/light-switch` (+ `cartoon/cartoon-pop`) | ตรงเฟรมไฟติด | -12 dB | |
| จุดไฟ/เทียน | `foley/match-strike` | | -12 dB | |
| ลิ้นชัก/ค้นของ | `foley/drawer-open` | | -14 dB | |
| ถ่ายรูป/บันทึกช่วงเวลา | `objects/camera-shutter` + white flash 1 F | ตรงแฟลช | -12 dB | |
| เงิน/ราคา/ส่วนลด | `objects/coin-drop` | ตรงตัวเลขเด้ง | -14 dB | ระวังดูถูก/ถูกเกิน — ใช้กับโปรที่ "คุ้ม" |
| เวลา/เดดไลน์ | `objects/clock-ticking` (ใต้ฉาก), `objects/clock-chime` (หมดเวลา) | tick ช่วงรอ | -24 / -12 dB | ticking = tension |
| โทรศัพท์โบราณ/ย้อนยุค | `objects/old-phone-ring` | | -12 dB | |
| พิมพ์/ข่าว/เรื่องเล่า | `objects/typewriter` | ใต้ตัวอักษรขึ้น | -18 dB | sync กับตัวอักษรทีละตัว |
| ของแตก/ความผิดพลาด | `objects/glass-shatter` | ตรงเฟรม | -8 dB, ระวัง TP | |
| ไฟกระพริบ/ผี | `objects/light-flicker` + `objects/electric-buzz` | ทุก dip ของไฟ | -16 dB | FX.md flicker |
| เครื่องจักรในแล็บเลนส์ | `objects/grinding-machine` | ใต้ช็อต | -20 dB | ความเป็นมืออาชีพ/craft ของร้าน |
| ถนน/ยานพาหนะผ่าน | `objects/car-pass-by`, `objects/motorbike-pass`, `objects/bicycle-bell` | pan ตามทิศ | -18 dB | ไทย: มอเตอร์ไซค์ = ถนนจริง |
| กระดิ่งลม/สงบ | `objects/wind-chime` | ช่วงเปิด/ปิด | -20 dB | |
| วิทยุ/ย้อนความทรงจำ | `objects/radio-static` → เพลงผ่าน `muffle` | | -18 dB | |

## 4. Places (ambience beds)
ใช้ `b.amb(name, t0, t1, gain_db=-24 … -30)` ต่อเนื่องข้าม cut ในฉากเดียวกัน; crossfade 0.5–1 s เมื่อเปลี่ยนที่ [D]

| สถานที่/เวลา | Bed | เสริม (spot) | อารมณ์ |
|---|---|---|---|
| ในห้อง/ร้าน (เงียบ) | `ambience/room-tone` | `objects/clock-ticking` เบามาก | กลาง, ใกล้ชิด |
| เช้าไทย/หมู่บ้าน | `ambience/morning-birds` | `ambience/rooster-crow`, `ambience/dog-barking-distant` | สดใส เริ่มต้นใหม่ |
| ตลาด/งานวัด | `ambience/market-crowd` | `ambience/kids-playing`, `ambience/temple-bell` | มีชีวิต ชุมชน |
| ถนนในเมือง | `ambience/city-street-ambience` | `objects/motorbike-pass`, `objects/car-pass-by` | เร่งรีบ |
| ทะเล/หัวหิน | `ambience/ocean-waves` | ลม `ambience/wind-howling` (เบา, lowpass) | ผ่อนคลาย/กว้าง |
| ริมคลอง | `ambience/canal-water-lapping` | | ช้า สงบ |
| กลางคืน | `ambience/night-crickets` หรือ `ambience/forest-night` | `ambience/dog-barking-distant` | เหงา สงบ หรือเปลี่ยว |
| ฝน/อารมณ์เศร้า | `ambience/rain-on-roof` | `ambience/thunder` (ช้ากว่าแฟลช 0.3–2 s = ระยะ) | เศร้า ล้างใจ อันตราย |
| ลมแรง/เปล่าเปลี่ยว | `ambience/wind-howling` | | โดดเดี่ยว |
| ลึกลับ/ผี | `ambience/eerie-ambience` หรือ `ambience/horror-drone` / `drone()` | `design/ghost-whoosh` | กลัว ไม่แน่นอน |

## 5. Emotion → sound recipe
เลือกจากอารมณ์ก่อน แล้วค่อยเลือกไฟล์ (คลังอารมณ์ id ใน M02/voice/visual ใช้คู่กันได้)

| อารมณ์ (valence/arousal) | สูตรเสียง | ไฟล์ | หลีกเลี่ยง |
|---|---|---|---|
| สงบ/อบอุ่น (+/ต่ำ) | bed ธรรมชาติช้า + foley นุ่ม + โน้ตใส | `ocean-waves`/`canal-water-lapping`, `wind-chime`, `chime-soft` | hit แรง, whoosh |
| ดีใจ/ตื่นเต้น (+/สูง) | hit สั้นสว่าง + sparkle + เสียงคน | `magic-sparkle`, `cartoon-pop`, `crowd-laugh`, `shimmer` | drone ต่ำ |
| ตลก (+/สูง) | cartoon SFX ตรงเฟรมแล้ว **เงียบ 1 beat** | `bonk`, `cartoon-boing`, `slide-whistle`, `squeak-toy`, `cartoon-spring` | ใช้หลายตัวต่อมุก |
| เศร้า/สูญเสีย (−/ต่ำ) | ลดเสียงทั้งฉาก → room tone + ฝน + ถอนหายใจ; เงียบแทนดนตรี | `rain-on-roof`, `sigh`, `room-tone` | stinger, ดนตรีเร้า |
| เหงา/คิดถึง (−/ต่ำ) | ambience กลางคืน + ของหนึ่งชิ้นที่มีความหมาย (motif) | `night-crickets`, `clock-ticking`, `radio-static` | ฝูงชน |
| ตึง/รอ (−/กลาง→สูง) | ticking + drone ต่ำ + riser ไป reveal | `clock-ticking`, `horror-drone`, `riser-tension`, `heartbeat` | ใช้ riser ซ้ำ |
| กลัว/ตกใจ (−/สูง) | silence 0.5–1 s → stinger/blast; ลมหายใจ | `stinger-horror`, `breath-scared`, `gasp`, `ghost-whoosh` | jump scare ในคอนเทนต์ร้านค้า (ผิดโทน) |
| โกรธ (−/สูง) | slam + impact + เสียงต่ำหยาบ | `door-slam`, `impact-boom`, `sub-drop` | sparkle |
| พรีเมียม/ใหม่ (+/กลาง) | whoosh ช้า + shimmer + foley วัสดุชัด + เงียบรอบสินค้า | `whoosh`, `shimmer`, `glasses-put-on-table` | cartoon SFX |
| ไว้ใจ/มืออาชีพ (+/ต่ำ) | เสียงเครื่องมือจริงเบา ๆ + room tone สะอาด | `grinding-machine`, `key-lock-click`, `room-tone` | glitch |

## 6. Silence recipes

| ใช้เมื่อ | ทำอย่างไร | ความยาว |
|---|---|---|
| ก่อน punchline / reveal | `b.duck(t0, t1, -18)` ทุกอย่าง เหลือ room tone | 0.4–1.0 s |
| หลังข่าวร้าย/ประโยคหนัก | ตัดเพลง ให้เหลือ ambience 1 ชั้น | 1–2 s |
| ก่อน jump scare | ทุกอย่างลง ≥ 18 dB แล้ว blast | 0.7–1.5 s |
| "สมาธิ" / หลับตา (eye-break) | ambience ธรรมชาติชั้นเดียว + VO, ไม่มี SFX | ทั้งช่วง |
| ห้าม | digital silence 0 (ยกเว้นต้น/ท้ายไฟล์) | — |

## 7. Motif (sonic signature)
- 1 motif ต่อแบรนด์/ช่อง: 2–4 โน้ต, < 1.5 s, วางตำแหน่งเดิมทุกคลิป (เช่น ท้ายคลิปตอนโลโก้) — ใช้ `tone()` ใน sound.py หรือ `design/chime-soft`
- Motif ตัวละคร (Mint vs Tao): สีเสียงต่างกัน (ระฆังใส vs ไม้เคาะ), โน้ตเดียวกัน = ความผูกพัน
- ห้ามเปลี่ยน motif บ่อย — ค่าของมันคือการซ้ำ [A Krishnan 2012, Mas 2021: ลักษณะเสียงกำหนดบุคลิก]

## 8. Spot-sheet template (ใช้ก่อนวางเสียง)
```
time  | event (ภาพ)              | ประเภท      | file / synth                  | gain | pan | note
00:01 | Mint เดินเข้าร้าน         | foley       | foley/footsteps-wooden-floor  | -16  | 0→.3| ทุก contact
00:02 | ประตูร้านเปิด             | object      | objects/shop-door-bell        | -12  | .4  |
00:00-| ร้าน (bed)                | ambience    | ambience/room-tone            | -30  | 0   | ทั้งฉาก
00:05 | แว่นวางบนโต๊ะ (hero)      | object      | foley/glasses-put-on-table    | -10  | 0   | เงียบเพลง 0.3 s
00:06 | reveal ราคา               | design      | design/sub-drop               | -8   | 0   | silence ก่อน 0.4 s
```
ตรวจ: เสียงหลักต่อช่วง = 1? ทับคำ VO หรือไม่? riser ≤ 2? มี room tone ตลอด? hit เร็วไม่เกิน 1 เฟรม?

## 9. ช่องว่างของ sfxlib (ควร fetch เพิ่ม)
- keyboard/mouse click, phone notification/vibrate, ข้อความ LINE (UI sounds สำหรับคอนเทนต์ร้าน/ลูกค้า)
- lens cleaning cloth squeak, frame hinge click (แว่นพับ/กาง) — สำคัญสำหรับคลิปแว่น
- cash register / receipt print
- soft "ui pop" ที่ไม่ใช่การ์ตูน, low "boom" ที่ไม่ใช่สยอง
- ambience: ห้างแอร์ (mall air-con hum), ร้านกาแฟ, ฝนบนกระจก
