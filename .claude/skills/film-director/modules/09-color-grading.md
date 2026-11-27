# FD09 — Colour Theory & Grading (colour script, primary vs secondary, LUT, log, curves, skin tone line, look development, teal-orange, เกรดสำหรับ Reels, ffmpeg/HyperFrames)

> ต่อยอด ไม่ซ้ำ: correction ก่อน grading, scope (parade/vectorscope), ffmpeg พื้นฐาน, export สูตรเดิม อยู่ใน `story-clips/_craft/curriculum/11-edit-grade.md` §1.3, §4.3–4.4;
> colour script ทั้งเรื่องใน `creative-intelligence/knowledge/visual-arts/COLOR_SCRIPTING.md`; colour science (CIELAB/OKLCH, harmony evidence, metamerism)
> ใน `ADVANCED_COLOR_SCIENCE.md`; palette 204 ชุดใน `.claude/skills/ai-visual-artist/COLOR_PALETTE_LIBRARY.json` (`pal.*`).
> บทนี้เพิ่ม: **pipeline สี sRGB ↔ BT.709/BT.1886 (และบั๊กที่ทดสอบเจอใน ffmpeg)**, **ลำดับ correction → secondaries → look**, **หลักฐานสี-อารมณ์**,
> **skin tone line**, **teal-orange วิจารณ์**, **ACES/log สั้นๆ**, **เกรดสำหรับมือถือ**, และ look 18 แบบที่ **ทดสอบ syntax แล้ว** ใน
> `libraries/COLOR_GRADE_LIBRARY.json` (`grade.*` มี curve/hue/sat + ffmpeg filter + HyperFrames preset ที่ใกล้เคียง)

## 1. นิยามและหลักการพื้นฐาน
- **Colour correction** = ทำให้ถูก/สม่ำเสมอ (black/white point, white balance, exposure match); **grading** = สร้าง look เพื่อเรื่อง
- **Primary** = ปรับทั้งภาพ (lift/gamma/gain, offset, contrast, saturation, curves); **secondary** = ปรับเฉพาะช่วง (qualifier ตาม hue/sat/luma, window/mask) เช่นผิว ท้องฟ้า ใบไม้ — Van Hurkman เรียก "memory colours" [`VanHurkman2014_ColorCorrection`, publisher_page]
- **LUT** = ตารางแปลงสี (.cube); **technical LUT** แปลง log→display, **creative LUT** = look; **log** = การเข้ารหัสที่เก็บ dynamic range กว้าง ต้องแปลงก่อนดู
- **Colour script** = แผนสี/ความสว่างตามเวลาทั้งเรื่อง (ดู `COLOR_SCRIPTING.md`); **look development** = ออกแบบและทดสอบ look ก่อนใช้จริง
- **Skin tone line** = เส้นบน vectorscope (~123° ตรงกับเส้น "I" ของ NTSC ระหว่างแดงกับเหลือง) ที่ผิวมนุษย์ทุกสีผิวมักกระจุกอยู่ใกล้ๆ — เป็นจุดอ้างอิง ไม่ใช่เป้าบังคับ [`Vectorscope_SkinLine`, D, search_summary]

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 Pipeline สีของเรา (display-referred)** [EVIDENCE: มาตรฐาน]
- **BT.709** = primaries R(0.640,0.330) G(0.300,0.600) B(0.150,0.060) white D65 + OETF ฝั่งกล้อง; **ไม่ได้กำหนด EOTF ของจอ** [`ITU_BT709_6_2015`]
- **BT.1886** = EOTF จออ้างอิง gamma **2.40** (ขึ้นกับ black level ของจอ), 10-bit: ดำ 64 ขาว 940 (8-bit 16/235), วัดในห้องมืด [`ITU_BT1886_2011`, full_text]
- **sRGB** = primaries เดียวกับ BT.709, transfer ใกล้ gamma 2.2, จออ้างอิง 80 cd/m², สภาพแวดล้อมทั่วไป 200 lux [`Stokes1996_sRGB`]
- ผลต่อเรา: HTML (Chrome) เรนเดอร์ใน sRGB; วิดีโอถูกดูบนมือถือที่สว่าง/ห้องสว่าง → ภาพที่เกรดบนจอ gamma 2.4 ห้องมืดจะดู **สว่าง/จางขึ้น** บนจอ 2.2 และ **มืด/อ่านยาก** กลางแดดจ้า → ตรวจบนมือถือจริงทุกครั้ง [CRAFT inference จากมาตรฐาน]
- **บั๊กที่ทดสอบเจอ (ffmpeg 9.0, 2026-11-27):** แปลง RGB (PNG/Chrome frames) → yuv420p โดยไม่ระบุ matrix จะใช้ **BT.601** (แดงล้วน → Y81/Cb90; ด้วย `scale=out_color_matrix=bt709` → Y62/Cb102) แล้วถ้าติด tag bt709 = สีเลื่อน (แดง/เขียว/ผิว) และ `-color_primaries/-color_trc` อย่างเดียว **ไม่ถูกเขียนลงไฟล์** เมื่อมี filter chain (ffprobe = unknown) → ต้องจบ chain ด้วย `setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv` (คำสั่งเต็มใน `TECH_SPEC_PRESETS.json › spec.master_h264_bt709`) — สูตรใน curriculum 11 §4.4 มีปัญหานี้เมื่อ input เป็น RGB
**2.2 ลำดับงาน (node order)** [CRAFT, `VanHurkman2014_ColorCorrection`, Blackmagic Colorist Guide ใน curriculum 11]
1) normalise/แปลง log (ถ้ามี) → 2) primary balance ต่อช็อต (`grade.neutral_correct`) → 3) shot matching → 4) secondaries (ผิว/ท้องฟ้า/สินค้า) → 5) look ทั้ง scene (LUT/creative) → 6) platform pass (`grade.reels_daylight_lift`) → 7) grain/sharpen สุดท้าย
**2.3 ACES / log (เมื่อมีกล้องจริงผสม CG)** — ACES2065-1 = linear AP0 สำหรับแลกเปลี่ยน/เก็บ; ACEScg = linear AP1 สำหรับ CG; **ACEScct = log AP1 สำหรับเกรด**; Input Transform เข้า → Look Transform (LMT) ทำ look แบบ scene-referred → Output Transform (rendering + display encoding) ออกจอ [`ACES_Docs`] — pipeline ปัจจุบันของเรา (HTML/AI = display-referred sRGB) **ไม่จำเป็นต้องใช้ ACES**; ใช้เมื่อมีฟุตเทจ log จากกล้อง + 3D render
**2.4 หลักฐานสี-อารมณ์** [EVIDENCE, จากแผ่นสี ไม่ใช่ภาพยนตร์]
- Valdez & Mehrabian (1994): **ความสว่าง (B) และความอิ่มตัว (S) มีผลแรงและสม่ำเสมอ** — Pleasure = .69B + .22S; Arousal = −.31B + .60S; Dominance = −.76B + .32S; ผลของความสว่างคล้ายกันทั้งสีและไร้สี [`ValdezMehrabian1994`, abstract]
- Wilms & Oberfeld (2018): ผลทางอารมณ์ขึ้นกับ hue, saturation, brightness **และปฏิสัมพันธ์** ไม่ใช่ hue อย่างเดียว [`WilmsOberfeld2018`, search_summary]
- ใช้งาน: ถ้าอยากให้ "สงบ-น่าพอใจ" → ยกความสว่าง ลดความอิ่มตัวเล็กน้อย; "ตื่นเต้น" → เพิ่ม saturation; อย่าผูก hue ตายตัวกับอารมณ์ (เช่น "ฟ้า = เศร้า") — ข้อจำกัด: แผ่นสีนิ่ง ผู้ร่วมทดลองตะวันตก; ในหนัง บริบทเรื่องมีผลมากกว่า → confidence medium
**2.5 Teal-orange — ทำไมได้ผล และเมื่อไรไม่ควร** — เหตุผลที่อ้างกัน: ผิวอยู่ช่วงส้ม เงา/พื้นหลังไป teal จึงแยก subject ด้วยสีแทนแสง; "เลียนแสง golden hour" เป็นการเดา [`Cade2017_OrangeTeal`, E — บทความสรุป tutorial ขาย LUT ไม่มีหลักฐาน]; งานนักศึกษา (Appalachian State 2018) ที่พบว่า teal-orange ได้การตอบสนองบวกสุดเป็น thesis ปริญญาตรี ไม่ได้รวมในแหล่งหลัก (ความน่าเชื่อถือต่ำ) [ข้อสังเกต]
- **วิจารณ์ (CRAFT):** ใช้เป็นปุ่ม "cinematic" ทุกเรื่องทำให้หน้าตาเหมือนกันหมด; กินสินค้าสีฟ้า/teal; ค่าแรง (>0.08 ใน `colorbalance`) ผิวส้มและขาวอมฟ้า; ถ้าฉากไม่มีตรรกะอุ่น-เย็น (แหล่งแสง) look จะลอย → ใช้แบบ `grade.teal_orange_subtle` และเฉพาะเมื่อฉากมีแหล่งอุ่น vs สภาพแวดล้อมเย็นจริง
**2.6 Colour script + luminance arc** — ข้อมูลของ Cutting (2016) ว่ามืดสุด ~3/4 ของเรื่อง (FD08 §2.5) ใช้เป็นแกน value ของ colour script ได้; ใช้ contrast/affinity ของ Block: ช่วงสงบให้สีใกล้กัน (affinity) ช่วงขัดแย้งให้ complementary/ความต่างความสว่าง (contrast) [`Block2020_VisualStory`, `Cutting2016_Pace`]

## 3. เหตุผลที่ใช้
ทำให้ช็อตจากต่างแหล่ง (Codex, FLUX, Wan, ภาพถ่ายจริง, HTML) ดูเป็นโลกเดียว, บอกเวลา/ความทรงจำ/อารมณ์, นำสายตา (สิ่งที่สว่าง/อิ่มสุด), และให้ภาพรอดจากการบีบอัดและจอมือถือ

## 4. ผลต่ออารมณ์และการรับรู้
| ปรับ | ผล | หลักฐาน |
|---|---|---|
| สว่างขึ้น | pleasure ↑, dominance ↓ | EVIDENCE (แผ่นสี) |
| saturation ขึ้น | arousal ↑ | EVIDENCE (แผ่นสี) |
| desaturate + contrast | กร้าน รุนแรง (bleach bypass) | CRAFT |
| lifted blacks | ความทรงจำ ละมุน | CRAFT |
| warm vs cool | อบอุ่น/ใกล้ vs ห่าง/คลินิก | CRAFT (ผลจริงขึ้นกับปฏิสัมพันธ์ `WilmsOberfeld2018`) |

## 5. ใช้เมื่อไร (เลือก look)
- ทุกคลิป: `grade.neutral_correct` ก่อนเสมอ
- คลินิก/เลนส์: `grade.high_key_clean`; ไลฟ์สไตล์: `grade.warm_daylight`; ทะเล UV ตอนเย็น: `grade.golden_hour`
- flashback: `grade.memory_flashback` (ใช้เฉพาะอดีต); ซอมบี้: `grade.bleach_bypass` / `grade.sickly_green_horror`
- Mint & Tao ถ่าน: `grade.charcoal_paper_warm`; การ์ตูนเด็ก: `grade.pastel_storybook`
- Reels ที่มืด: ปิดท้ายด้วย `grade.reels_daylight_lift`

## 6. ไม่ควรใช้เมื่อไร
- ห้ามเกรดชั้นสินค้า (cutout แว่นจริง) ด้วย look แรง — เกรดเฉพาะชั้นฉากหลัง (curriculum 11 §4.1 ข้อ 5)
- ห้ามซ้อน LUT สองตัวหรือ lift สองชั้น (film_fade + reels_lift)
- ห้ามสั่ง look แรงใน prompt AI แล้วเกรดซ้ำอีก (สีเพี้ยนสองชั้น) — สั่ง neutral แล้วเกรดเอง
- ห้ามใช้ HDR สำหรับโซเชียล (curriculum 11 §4.4)

## 7. ตัวอย่างจากภาพยนตร์ (มีแหล่ง)
- *The Grand Budapest Hotel* (2014) — ใช้ aspect ratio แยกยุค (ตัวอย่างการ "เข้ารหัสเวลา" แบบเดียวกับ grade ของ flashback) [`Hellerman2021_GrandBudapest`]
- *1917* (2019) — ความเรียบของ dailies สำคัญเพราะ one-shot (continuity ของ exposure/สี) [`Bosley2020_Deakins`]
- หนังฮอลลีวูด 1935–2010 มืดลงตามเวลา; แอนิเมชันสว่างคงที่ [`Cutting2011_QuickerDarker`]
- ตัวอย่างหนังที่ "teal-orange" ชื่อดัง = [CRAFT, unverified example] ไม่ได้ตรวจกับแหล่งใน session นี้

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip:** colour script → กำหนด grade id ต่อฉาก; เปลี่ยน look ช้า (`fx.js` `X.grade(sel,t,name,dur)` dur 1–3 s) เมื่อเวลาในเรื่องเปลี่ยน, ทันทีเมื่อเปลี่ยนฉาก
- **Product/promo:** ภาพแว่นจริงไม่เกรด; ฉากหลังเกรดให้ "เข้ากับ" สีกรอบ (เช่นกรอบกระ → `pal.eyewear_tortoise_editorial` + `grade.muted_editorial`)
- **Reels/TikTok:** หลีกเลี่ยงดำยก (lifted) มากและ gradient ฟ้าเรียบ (banding หลังบีบอัด) — ใส่ `noise=alls=2:allf=t` เบาๆ; ปิดท้าย `grade.reels_daylight_lift`
- **Explainer:** neutral/high-key คงที่ทั้งคลิป; ใช้สีเน้นเพียง 1 สี (accent) สำหรับข้อมูลสำคัญ
- **Cartoon:** สีมาจาก palette ตอนวาด; เกรดแค่รวมโทน (paper tone/grain) ไม่ใช่สร้าง look ใหม่
- **Documentary/talking head:** ผิวบน skin line, white balance ตรง; look เบา (`grade.warm_daylight` mix ต่ำ)

## 9. AI image prompt examples (ขอ "วัตถุดิบเกรดได้")
1. `neutral colour balance, natural contrast, no heavy colour grade, soft highlight roll-off` (สำหรับช็อตที่จะเกรดเอง)
2. `LOOK: muted editorial palette, desaturated natural tones, deep but not crushed blacks` (copy ทุกช็อตถ้าให้ AI ทำ look)
3. `charcoal drawing on warm cream paper, monochrome, visible paper texture`
4. `bright clean clinical colour, white surfaces, slightly cool neutral, accurate product colours`
5. `golden hour colour, warm highlights, cool open-shade shadows, natural skin`

## 10. AI video prompt examples
1. `consistent neutral colour throughout the shot, no colour shift, no flicker` (Wan/Kling รักษาสีภาพต้นทาง → เกรดภาพนิ่งก่อนหรือเกรดวิดีโอทีหลัง; ไม่หวังให้ motion prompt เปลี่ยนสี — curriculum 11 §4.1)
2. `the colour slowly warms as the sun sets` — ไม่แนะนำให้ AI ทำ; ทำด้วย `X.grade(...,'dawn',3)` หรือ keyframe ใน HyperFrames แทน (คุมได้, ไม่ flicker)

## 11. Shot list example (คลิปเรื่อง 60 วิ "ตาล้าจากจอ", grade ต่อช็อต)
| ช่วง | ฉาก | grade | เหตุผล |
|---|---|---|---|
| 0–10 | ออฟฟิศกลางวัน | `grade.cold_clinical` | ห่างเหิน ล้า |
| 10–30 | กลางคืน จอมือถือ | `grade.cold_clinical` + `lp.screen_glow` | ความมืดเพิ่ม (contrast ↑) |
| 30–45 | ฝันถึงทะเลตอนเด็ก | `grade.memory_flashback` | เข้ารหัสอดีต |
| 45–50 | จุดต่ำสุด: ปวดตา | `grade.low_key_noir_mono` (สั้น) | มืดสุดที่ ~3/4 |
| 50–60 | ตรวจตา ได้แว่นใหม่ | `grade.warm_daylight` → `grade.reels_daylight_lift` | คลี่คลาย อุ่น |

## 12. ข้อผิดพลาดที่พบบ่อย
- ใส่ LUT ก่อนบาลานซ์ (LUT ขยายความผิด)
- ติด tag bt709 แต่แปลงด้วย matrix BT.601 (สีเลื่อน — §2.1)
- ทุกคลิปในซีรีส์ teal-orange เหมือนกันโดยไม่ดูเรื่อง
- ผิวหลุด skin line ไปทางเขียว/ม่วงหลัง look; ขาวไม่ขาว
- เกรดบนจอแล็ปท็อปมืดแล้วไม่ดูบนมือถือ
- อ่าน .cube เข้าบริบท (HyperFrames: ห้ามอ่าน LUT body — ใช้ `hyperframes grade-compare`)

## 13. วิธีตรวจและแก้
1. **Scope ทุกช็อต:** parade + vectorscope (คำสั่งใน curriculum 11 §4.3); ผิวต้องอยู่ใกล้ skin line, เทาอยู่กลาง
2. **Shot match:** ดึง 1 เฟรม/ช็อต ต่อแถบ (`COLOR_SCRIPTING.md` §6) ดูว่าค่าเฉลี่ย L และ hue เด่นเปลี่ยนตามแผน ไม่ใช่สุ่ม
3. **ไฟล์:** `ffprobe -v error -show_entries stream=color_space,color_primaries,color_transfer,color_range -of compact out.mp4` ต้องได้ bt709 ทั้งสามช่อง + tv
4. **มือถือ:** ดูไฟล์ส่งออกบนมือถือ (ในร่ม + กลางแจ้ง) ก่อนส่ง
5. **HyperFrames:** ใช้ preset ที่มีจริง (`neutral, warm-daylight, clean-studio, skin-soft, food-pop, night-lift, muted-editorial, vintage-wash, mono-clean, mono-fade, soft-boost, bright-pop, deep-contrast, creator-camcorder, vhs-playback, home-movie-8mm, editorial-halftone, two-ink-print`; LUT: `teal-orange-blockbuster, bleach-bypass, film-fade`) ผ่าน `hyperframes media-treatment --grading '{"preset":"…","intensity":…}'` — ไม่แก้ HTML เอง (ที่มา: `~/.claude/plugins/cache/claude-plugins-official/hyperframes/0.8.61/packages/core/src/colorGrading.ts`, `skills/media-use/references/grading.md`)

## 14. แบบฝึกหัด + test case
- **T1 Same scene, 3 looks:** ช็อตเดียว → `grade.warm_daylight` / `grade.cold_clinical` / `grade.muted_editorial`; ผู้ดู 3 คนให้คำอารมณ์; ตรวจว่าความต่างมาจาก brightness/saturation มากกว่า hue ไหม (ทดสอบ `ValdezMehrabian1994` ในบริบทวิดีโอของเรา)
- **T2 Matrix bug:** ส่งออก PNG เดียวกันสองแบบ (สูตรเก่า vs `spec.master_h264_bt709`) เปิดบน iPhone/Android เทียบสีแดงและผิว
- **T3 Teal-orange strength:** ค่า 0.03 / 0.06 / 0.12 บนช็อตคน+แว่นสีฟ้า — หาจุดที่ผิวเริ่มส้มและกรอบฟ้าหาย
- **T4 Phone lift:** ฉาก low-key ก่อน/หลัง `grade.reels_daylight_lift` ดูกลางแดด
- **T5 Flashback code:** ใช้ `grade.memory_flashback` เฉพาะอดีต — ถามผู้ดูว่าแยกเวลาได้ไหมโดยไม่มีข้อความ
อัปเดต `test_status` ใน `COLOR_GRADE_LIBRARY.json` หลังทดสอบ (ตอนนี้ = syntax_tested เท่านั้น)

## 15. แหล่งอ้างอิง
`ITU_BT709_6_2015`, `ITU_BT1886_2011`, `Stokes1996_sRGB`, `VanHurkman2014_ColorCorrection`, `ACES_Docs`, `ValdezMehrabian1994`, `WilmsOberfeld2018`,
`Cade2017_OrangeTeal`, `Vectorscope_SkinLine`, `Cutting2011_QuickerDarker`, `Cutting2016_Pace`, `Block2020_VisualStory`, `Hellerman2021_GrandBudapest`, `Bosley2020_Deakins` — ใน `sources/image.json`
