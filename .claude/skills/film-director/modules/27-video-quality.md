# FD27 — Video Quality Assessment (การประเมินคุณภาพวิดีโอ: เทคนิค + AI artifact + คนดู)

> ต่อยอด: `story-clips/_craft/curriculum/12-production-qc.md` §1.4–1.5 (safe zone, loudness), `creative-intelligence/domains/13-quality-assurance-evaluation.md` (validity, reliability, rubric, machine vs human vs AI judge §3.7),
> `creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md` (100-pt score). โมดูลนี้เพิ่ม: **metric วิดีโอ (PSNR/SSIM/VMAF/FVD), มิติ AI video (VBench/EvalCrafter), การตรวจด้วย ffmpeg และ checklist มนุษย์**
> เครื่องมือ: `tools/video_qc.py`; checklist: `libraries/VIDEO_QUALITY_CHECKLIST.md`

## 1. นิยามและหลักการพื้นฐาน
คุณภาพวิดีโอมี 3 ชั้น ตรวจด้วยวิธีต่างกัน (ตรงกับ layer T/C/P ของ creative-critic):
| ชั้น | คำถาม | ตรวจด้วย | ตัวอย่าง |
|---|---|---|---|
| **Technical (signal)** | ไฟล์ถูกสเปก? encode เสียหายไหม? | ffprobe/ffmpeg, PSNR/SSIM/VMAF เทียบ master | 1080×1920, 30 fps, −14 LUFS, true peak ≤ −1 dBTP, ไม่มีจอดำ/ค้าง |
| **Generative fidelity (AI artifact)** | ภาพ "เป็นไปได้" และคงที่ไหม? | sample เฟรม + ตามนุษย์ + (ถ้ามี) metric แบบ VBench | identity drift, flicker, morph, มือ, ฟิสิกส์, ตัวหนังสือ AI |
| **Communicative/creative** | ทำงานตาม brief ไหม? | critic + ผู้ใช้ + ผลจริงบนแพลตฟอร์ม | hook, อารมณ์, ความเข้าใจ |
- **Full-reference metric** (PSNR, SSIM, VMAF) ต้องมีต้นฉบับเทียบ → ใช้ตรวจ "encode ทำให้เสียไหม" ไม่ใช่ "AI สร้างดีไหม" [EVIDENCE: SSIM2004, VMAFRepo]
  - **PSNR** = ค่าความต่างพิกเซลแบบ log (dB) — ง่าย แต่ไม่ตรงการรับรู้
  - **SSIM** = เทียบโครงสร้าง (luminance, contrast, structure) แทน error visibility; ประเมินกับคะแนนคนบนภาพ JPEG/JPEG2000 [EVIDENCE: SSIM2004, search_summary]
  - **VMAF** = metric รับรู้ของ Netflix ที่รวมหลาย metric; libvmaf คำนวณ PSNR/SSIM/MS-SSIM/CIEDE2000 ได้ด้วย; ใช้ผ่าน ffmpeg ที่ build `--enable-libvmaf`; มี NEG mode เพราะการ "แต่งภาพให้คม" หลอก VMAF ได้ [EVIDENCE: VMAFRepo]
- **Distribution metric** (FVD) = เทียบ "ชุดวิดีโอ" กับชุดจริง ใช้เปรียบเทียบโมเดล ไม่ใช่ตัดสินคลิปเดียว [EVIDENCE: FVD2018]
- **AI video benchmark dimensions:**
  - VBench 16 มิติ: subject_consistency, background_consistency, temporal_flickering, motion_smoothness, dynamic_degree, aesthetic_quality, imaging_quality, object_class, multiple_objects, human_action, color, spatial_relationship, scene, temporal_style, appearance_style, overall_consistency [EVIDENCE: VBenchRepo]
  - VBench-2.0 "intrinsic faithfulness": Human Fidelity, Controllability, Creativity, Physics, Commonsense [EVIDENCE: VBench2_2025]
  - EvalCrafter: visual quality, content quality, motion quality, text-video alignment; 17 metrics รวมด้วยน้ำหนักที่ fit กับความชอบของคน [EVIDENCE: EvalCrafter2023]

## 2. ทฤษฎีและหลักการขั้นสูง
- **Metric ไม่เท่ากับการรับรู้:** VBench เขียนเองว่า metric เดิม "ไม่ตรงการรับรู้ของคนทั้งหมด" จึงต้อง validate ด้วย human preference ทุกมิติ [EVIDENCE: VBench2023]; VideoScore: "None of the existing metric is able to provide reliable scores over generated videos" ก่อนจะเทรนด้วยคะแนนคน 37.6K คลิป [EVIDENCE: VideoScore2024]
- **Trade-off ที่วัดได้:** dynamic_degree สูง (ขยับเยอะ) มักแลกกับ consistency/flicker — VBench ต้องกรองวิดีโอนิ่งออกก่อนวัด flicker เพราะคลิปนิ่งได้คะแนน flicker ดีฟรี [EVIDENCE: VBenchRepo] → สำหรับเรา: คลิปสินค้า "นิ่งไว้ก่อน" ได้คุณภาพแต่เสี่ยงน่าเบื่อ (ใช้ dynamic จาก edit/2.5D แทน) [CRAFT]
- **Goodhart:** ถ้าไล่ metric (เช่น VMAF) ระบบจะหาทางหลอก (enhancement gain) — เหตุผลของ NEG mode [EVIDENCE: VMAFRepo]; ดู domains/13 §3.6
- **Loudness:** ITU-R BS.1770-5 (2023) กำหนดอัลกอริทึม loudness + true peak [EVIDENCE: ITUBS1770]; EBU R 128 v5.0 (2023) ตั้งเป้าออกอากาศ −23 LUFS พร้อม descriptor LRA และ Max True Peak [EVIDENCE: EBUR128]; โซเชียลไม่มีตัวเลขบังคับที่เปิดเผย — สตูดิโอใช้ −14 LUFS / TP −1.5 (FX.md §2.3) [CRAFT, house rule]
- **Subjective testing** มีมาตรฐาน: ITU-T P.910 (07/26) วิธีให้คนให้คะแนนวิดีโอ [EVIDENCE: ITUP910 — อ่านแค่หน้าชื่อ]; ถ้าจะทดสอบกับคนจริงให้ใช้วิธีมาตรฐานแทนโพลมั่ว ๆ
- **Platform spec:** YouTube แนะนำ MP4 fast-start, H.264 High, 4:2:0, progressive, 48 kHz AAC, 1080p SDR 8 Mbps (24–30 fps), BT.709 [EVIDENCE: YouTubeUpload]; Instagram help (snippet) ขั้นต่ำ 30 fps และ 720 px [EVIDENCE: InstagramReelsHelp, unverified]

## 3. เหตุผลที่ใช้
- ไฟล์ที่ผิดสเปก/เสียงพีค = ผิดพลาดที่ตรวจด้วยเครื่องได้ 100% → ไม่ควรหลุดถึงผู้ใช้
- AI artifact เป็นความเสี่ยงเฉพาะของงาน AI ที่ metric แบบเดิมจับไม่ได้ → ต้องมี checklist มนุษย์แยก

## 4. ผลต่ออารมณ์และการรับรู้
- เสียงดัง/เบาผิดปกติทำให้คนเลื่อนผ่านหรือปิดเสียง; พีคแตกหลัง re-encode ฟังเป็นเสียงแตก [CRAFT]
- Flicker/morph/มือผิด ทำให้คนดูรู้ทันทีว่า "AI" และลดความน่าเชื่อถือ (VBench-2.0 จัด Human Fidelity เป็นมิติหลัก) [EVIDENCE: VBench2_2025]
- เฟรมแรกดำ = ปก Reels ดำ ไม่มี hook [CRAFT]

## 5. ใช้เมื่อไร
- Technical QC: ทุก export (G8 ใน FD26)
- Artifact review: ทุกช็อตที่มาจาก gen ก่อนเข้า timeline และอีกครั้งในไฟล์สุดท้าย
- Full-reference (SSIM/VMAF): เมื่อสงสัยว่าการ export/upscale ทำลายรายละเอียด
- Benchmark-style (VBench): เมื่อเปรียบเทียบเครื่องมือ/ตั้งค่า (ต้องติดตั้ง PyTorch — ยังไม่มี, ห้ามติดตั้งเองโดยไม่ถาม)

## 6. ไม่ควรใช้เมื่อไร
- อย่าใช้ PSNR/SSIM ตัดสินความสวยของคลิป AI (ไม่มี reference ที่ "ถูก")
- อย่าใช้ FVD กับคลิปเดียว
- อย่าเอาตัวเลข metric/AI score ไปแทนคำตัดสินผู้ใช้ (MASTER_QUALITY_SCORE §3: แยกคอลัมน์ automated/human)

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- ไม่มีตัวอย่างหนังในแหล่งที่อ่าน; ตัวอย่างจริงของเราเอง (วัดด้วย video_qc 2026-11-27):
  - `story-clips/eyesight/EP01_lost-in-forest/export/EP01_lost-in-forest_th.mp4`: 1080×1920 30 fps 74.8 s, I = −13.0 LUFS, LRA 6.2, **true peak +0.1 dBTP (fail)**, จอดำกลางคลิป 63.0–67.4 s (4.4 s — ต้องเช็กว่าตั้งใจ)
  - `story-clips/night-optic/EP01_golden-frames/export/EP01_golden-frames_th.mp4`: 1920×1080 30 fps 161 s, I = −14.5 LUFS, **true peak 0.0 dBTP (fail)**

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip:** จอดำ/ค้างอาจตั้งใจ (fade, ภาพนิ่ง) → `--allow-freeze`, อ่าน black intervals เทียบ edit plan; ซับไทยต้องอ่านทัน
- **Product/promo:** checklist สินค้า (รูปทรง สี โลโก้ เลนส์) เป็น critical; punch-in ต้องคม (ไม่ upscale เกิน)
- **Reels 9:16:** preset `reels_9x16`; safe zone; เฟรมแรกไม่ดำ; ถ้าเพลงผู้ใช้ใส่เอง ใช้ `--no-audio-ok`
- **Explainer:** ข้อความอ่านได้ที่ขนาดมือถือ; loudness คำพูดสม่ำเสมอ (LRA ต่ำ)
- **Cartoon:** เส้นขอบ boil/flicker ชัดกว่าภาพถ่าย — sample 4 fps ช่วงเคลื่อนไหว
- **Talking head:** lip-sync offset, เสียงพูด −14 LUFS, ไม่มีช่วงเงียบยาวผิดปกติ (silencedetect)

## 9. AI image prompt examples
- (ไม่ใช่โมดูลสร้างภาพ) — prompt ที่ลด artifact ตั้งแต่ต้น: `clean simple background, even soft light, subject fully inside frame with margin, hands relaxed and visible with five fingers, no reflective clutter` [CRAFT; คำ positive ตาม RunwayGuide2026]

## 10. AI video prompt examples (เพื่อลด artifact ที่ QC มักเจอ)
- Flicker: `steady even lighting, smooth stable camera, slow gentle motion` (positive) แทน "no flicker"
- Identity drift: คลิปสั้น 2–4 s, `the same woman throughout`, ใช้ I2V จาก keyframe ที่ผ่านแล้ว
- Physics: ระบุลำดับเหตุผล `she lifts the glasses with her right hand, unfolds the temples, then places them on her nose` (ช็อตเดียวไม่เกิน 1 action หลัก — แยกเป็น 2 ช็อตถ้ายาว)

## 11. Shot list example — QC sheet ต่อช็อต
| ช็อต | ที่มา | identity | flicker | morph/warp | มือ | ตัวหนังสือ AI | ฟิสิกส์ | ผล |
|---|---|---|---|---|---|---|---|---|
| 1 | Wan seed 7 | n/a | ok | ok | n/a | ไม่มี | ok | ใช้ 0.0–2.4 s |
| 3 | Kling FLF | แว่นตรง | ok | ขาแว่นงอ 3.8 s | n/a | ไม่มี | ok | ใช้ 0–3.5 s |
| 4 | Kling I2V | หน้าเปลี่ยน 4.2 s | ok | ok | นิ้ว 6 ที่ 2.1 s | ไม่มี | ok | gen ใหม่ |

## 12. ข้อผิดพลาดที่พบบ่อย
- ไม่ตรวจ true peak (ตรวจแค่ "ดังพอ") → คลิปเราเองเกิน 0 dBTP
- ใช้ `loudnorm` single-pass แล้วเชื่อว่าได้ค่าเป๊ะ — ต้องวัดซ้ำหลัง export
- ดูคลิปที่ความเร็วปกติครั้งเดียว — morph สั้น ๆ หลุด; ต้อง contact sheet/เฟรมต่อเฟรมช่วงสำคัญ
- คลิป VFR จากมือถือ → เสียงเลื่อนหลังอัปโหลด
- ตัดสินด้วย AI score อย่างเดียว

## 13. วิธีตรวจและแก้
1. `python .claude/skills/film-director/tools/video_qc.py <file> --preset reels_9x16` (exit 0 pass, 1 revise, 2 fail)
2. Contact sheet 2 fps: `ffmpeg -i <file> -vf fps=2,scale=270:-1,tile=6x4 -frames:v 1 sheet.png` → อ่านด้วยตา (Read รูป)
3. Encode check เทียบ master: `ffmpeg -i export.mp4 -i master.mov -lavfi "[0:v][1:v]ssim" -f null -` (SSIM All ≥ ~0.98 = ใกล้เคียงมาก [CRAFT threshold])
4. แก้เสียง: `ffmpeg -i in.mp4 -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k out.mp4` แล้วรัน 1 ซ้ำ
5. แก้ fps: `-r 30 -fps_mode cfr`; แก้ pix_fmt: `-pix_fmt yuv420p`; fast start: `-movflags +faststart`
6. Artifact: ตัดช่วงเสีย / gen ใหม่ / composite asset จริง (FD22 §13)

## 14. แบบฝึกหัด + test case
- **Test A:** รัน video_qc กับ export ทุกไฟล์ใน `story-clips/*/EP*/export/` → ตาราง I/TP/LRA/black → หาแพทเทิร์น (export template ขาด limiter?)
- **Test B (ตาคน vs เครื่อง):** คลิป AI 5 ชิ้น ให้ผู้ใช้ให้คะแนน 1–5 และให้ critic ให้คะแนนตาม checklist → ดูว่าเรียงลำดับตรงกันไหม (Spearman ด้วยมือ) — ฐานของการ calibrate (FD30)
- **Test C:** export คลิปเดียวที่ CRF 18/23/28 → SSIM เทียบ master + ดูบนมือถือ → หาค่า CRF ต่ำสุดที่คนแยกไม่ออก

## 15. แหล่งอ้างอิง
SSIM2004 · VMAFRepo · FVD2018 · VBench2023 · VBenchRepo · VBench2_2025 · EvalCrafter2023 · VideoScore2024 · FFmpegFilters · EBUR128 · ITUBS1770 · ITUP910 · YouTubeUpload · InstagramReelsHelp · RunwayGuide2026
ภายใน: curriculum 12, `story-clips/_craft/FX.md` §2.3, domains/13, MASTER_QUALITY_SCORE.md
