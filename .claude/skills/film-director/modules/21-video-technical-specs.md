# FD21 — Video Technical Specs (ความละเอียด, fps และความรู้สึกการเคลื่อนไหว, shutter 180°, codec/bitrate, Rec.709/sRGB, สเปกแพลตฟอร์ม)

> ต่อยอด ไม่ซ้ำ: สูตร export เดิมและตาราง safe zone ทีม อยู่ใน `story-clips/_craft/curriculum/11-edit-grade.md` §4.4 และ `03-composition.md`;
> ความดัง (loudness) อยู่ใน `modules/19-sound-music-sync.md` §(Loudness → MIX_PLAYBOOK −14 LUFS, TP −1.5) และ knowledge `sound`/audio-engineering.
> บทนี้เพิ่ม: **สเปกจากหน้า help ทางการเท่านั้น (ลงวันที่ 2026-11-27)**, **fps/shutter กับความรู้สึก (มีหลักฐาน HFR)**, **มาตรฐานสี BT.709/BT.1886/sRGB**,
> **ปัญหา ffmpeg ที่ทดสอบเจอ** (matrix BT.601, tag หาย), **conform 24→30 สำหรับ Wan**, และ preset ส่งออกที่ทดสอบแล้ว
> ใน `libraries/TECH_SPEC_PRESETS.json` (`spec.*`, 11 รายการ)

## 1. นิยามและหลักการพื้นฐาน
- **Resolution / aspect** = จำนวนพิกเซลและสัดส่วน (1080×1920 = 9:16; 1920×1080 = 16:9; BT.709 HDTV = 1920×1080 square pixel) [`ITU_BT709_6_2015`]
- **Frame rate (fps)** = จำนวนภาพต่อวินาที (24, 25, 30, 48, 50, 60); **shutter angle** = เวลาเปิดชัตเตอร์เทียบกับช่วงเฟรม: exposure = (angle/360) × (1/fps) → 180° ที่ 24 fps ≈ 1/48 s [`RED_ShutterAngle`]
- **Codec** = วิธีบีบอัด (H.264/AVC, H.265/HEVC, ProRes); **container** = ไฟล์ห่อ (MP4, MOV); **bitrate/CRF** = ปริมาณข้อมูล/คุณภาพคงที่; **GOP** = ระยะ keyframe; **chroma subsampling** 4:2:0/4:2:2/4:4:4
- **Colour space** = primaries + white point + transfer + matrix + range; SDR วิดีโอ = **BT.709** (+ จออ้างอิง **BT.1886** gamma 2.4); เว็บ/ภาพนิ่ง = **sRGB** (primaries เดียวกัน, ~gamma 2.2) [`ITU_BT1886_2011`, `Stokes1996_sRGB`]
- **Range**: limited/tv (8-bit 16–235; 10-bit 64–940) vs full/pc (0–255) [`ITU_BT1886_2011`]

## 2. ทฤษฎีและหลักการขั้นสูง
**2.1 fps กับความรู้สึก** [EVIDENCE + CRAFT]
- Wilcox et al. (2015, ACM TAP): คลิป S3D ที่ 24/48/60 fps กับ shutter หลายค่า → ผู้ดู **ชอบ fps สูงกว่าอย่างชัดเจน** โดยเฉพาะ 24 vs 48/60; shutter angle มีผลน้อย ยกเว้น "ความลื่น" ในคลิปบางชนิด [`Wilcox2015_HFR`, search_summary — S3D, ไม่ใช่ 2D มือถือ]
- ดังนั้น 24 fps เป็น **ธรรมเนียม/สุนทรียะ "หนัง"** ไม่ใช่ค่าที่การรับรู้ชอบที่สุด [CRAFT inference]; 30 fps = มาตรฐานโซเชียล/UI; 60 fps = กีฬา เกม UI ลื่น
- Instagram ระบุ Reels ควรมี **อย่างน้อย 30 fps** [`Instagram_ReelsSpec`] — ขัดกับ Wan 2.2 TI2V-5B ที่สร้าง **24 fps** [`Wan22_ModelCard`] และ `tools/wan.py` ที่เข้ารหัส 24 fps → ต้อง conform (`spec.conform_24_to_30`)
- YouTube: "อัปโหลดที่ fps เดียวกับที่บันทึก" [`YouTube_UploadEncoding`] → สำหรับ YouTube ไม่ต้องแปลง 24→30
**2.2 Shutter 180° และ motion blur สังเคราะห์** — ~180° "การตั้งค่าที่พบมากที่สุดในภาพยนตร์"; มุมเล็ก = กระตุก/แยกเป็นภาพๆ (แบบข่าวยุค 1950s), มุมใหญ่ = เบลอ/ลาก [`RED_ShutterAngle`, C]
- HTML/rig.js/kinetic type เรนเดอร์ **ไม่มี motion blur** (≈ shutter 0°) → การเคลื่อนเร็วดูกระตุก; ทำ 180° เทียมด้วยเรนเดอร์ 60 fps แล้ว `tmix=frames=2,fps=30` (ทดสอบคำสั่งแล้ว) หรือ blur ทิศทางเฉพาะชิ้นที่เร็ว — **ห้ามเบลอตัวหนังสือที่ต้องอ่าน** (`spec.motion_blur_180`)
**2.3 Codec & bitrate (จาก YouTube ทางการ)** — MP4 ไม่มี edit list, moov ไว้หน้า (faststart); H.264 High, progressive, B-frame 2, **closed GOP = ครึ่งหนึ่งของ fps**, CABAC, VBR, 4:2:0; SDR 1080p: 8 Mbps (24–30) / 12 Mbps (48–60); 2160p: 35–45 / 53–68 Mbps; เสียง AAC-LC/Opus 48 kHz, 384 kbps stereo; สี BT.709 [`YouTube_UploadEncoding`, full_text]
- แพลตฟอร์มบีบซ้ำเสมอ → ส่งไฟล์คุณภาพสูงกว่าที่แนะนำ (CRF 16–18) [CRAFT, curriculum 11]
- **H.265/HEVC:** ไม่พบหน้า help ทางการใน session นี้ที่ระบุว่าแพลตฟอร์มโซเชียล "แนะนำ" HEVC สำหรับอัปโหลด → ใช้ H.264 เป็นค่าปลอดภัย [ช่องว่างความรู้]
- **ProRes** (ระหว่างเครื่องมือเท่านั้น): 4444 ~330 Mbps @1080p29.97 มี alpha; 422 HQ ~220 Mbps 10-bit 4:2:2 [`Apple_ProRes`] → ใช้ส่งชั้นโปร่งใส (แว่น cutout ที่เคลื่อนไหว) เข้า CapCut/Resolve
**2.4 มาตรฐานสีในการส่งออก** — BT.709 primaries R(0.640,0.330) G(0.300,0.600) B(0.150,0.060) D65; OETF V=1.099L^0.45−0.099; BT.1886 EOTF L=a·max(V+b,0)^2.40 [`ITU_BT1886_2011`]
- **ปัญหาที่ทดสอบจริง (ffmpeg 9.0-full, 2026-11-27):**
  1. RGB→YUV ค่าเริ่มต้นใช้ **matrix BT.601** (แดงล้วน: Y81/Cb90/Cr240) ไม่ใช่ BT.709 (Y62/Cb102/Cr239) → ต้องใส่ `scale=out_color_matrix=bt709:out_range=tv`
  2. `-colorspace/-color_primaries/-color_trc` เป็น output option อย่างเดียว เมื่อมี filter chain ffprobe อ่าน primaries/transfer = **unknown** → ปิด chain ด้วย `setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv` (ทดสอบแล้วได้ bt709 ครบ)
  3. ผลรวม: สูตร export เดิมใน curriculum 11 §4.4 สีเลื่อนเล็กน้อยเมื่อ input เป็นเฟรม PNG/Chrome และ tag ไม่ครบ → ใช้ `spec.master_h264_bt709` / `spec.ig_reels_9x16` แทน
**2.5 สเปกแพลตฟอร์ม (ทางการ, ตรวจ 2026-11-27 — เปลี่ยนได้ทุกเมื่อ)**
| แพลตฟอร์ม | ข้อกำหนดทางการ | แหล่ง |
|---|---|---|
| Instagram Reels | 1.91:1 ถึง 9:16; ≥30 fps; ≥720 px; ปกแนะนำ 420×654 (1:1.55) เปลี่ยนไม่ได้หลังอัป | `Instagram_ReelsSpec` |
| Meta Reels ads (IG) | 9:16, แนะนำ 1440×2560, MP4/MOV, ≤4 GB, 0 วิ–15 นาที; safe: บน 14% ล่าง 35% ข้าง 6%; primary text 44 ตัวอักษร | `Meta_AdsGuide_IGReels` |
| TikTok in-feed ads (non-Spark) | 9:16 ≥540×960 (แนะนำแนวตั้ง), 16:9 ≥960×540, 1:1 ≥640×640; ≤10 นาที; ≤500 MB; ≥516 kbps; safe zone = ดาวน์โหลด template (อัปเดต มิ.ย. 2026) | `TikTok_Ads_InFeedSpec` |
| YouTube Shorts | จัตุรัส/แนวตั้ง ≤3 นาที = Short (อัปโหลดตั้งแต่ 15 ต.ค. 2024); Short >1 นาทีที่มี Content ID claim ถูกบล็อกทั่วโลก | `YouTube_Shorts3min` |
| YouTube ทั่วไป | ตาม §2.3 | `YouTube_UploadEncoding` |
| Facebook Reels (organic) | ไม่พบหน้า help ทางการใน session นี้ → ใช้ master เดียวกับ IG | — |
| TikTok (organic) | ไม่พบหน้า help ทางการ → ใช้ 1080×1920 30 fps | — |
แหล่งรอง (Kapwing, Hootsuite ฯลฯ) ให้ตัวเลขขั้นต่ำ/ความยาว/ขนาดไฟล์ขัดกันเอง — **ไม่ใช้เป็นสเปก**
**2.6 Loudness** — EBU R 128 (broadcast): −23 LUFS ±0.2 LU (±1 LU live), gate −10 LU [`EBU_R128`]; สำหรับโซเชียลไม่มีตัวเลขทางการจากแพลตฟอร์มใน session นี้ → ใช้ค่าบ้านใน FD19 (−14 LUFS, TP −1.5) ซึ่งเป็นแนวปฏิบัติ ไม่ใช่สเปกแพลตฟอร์ม

## 3. เหตุผลที่ใช้
สเปกผิด = แพลตฟอร์มบีบซ้ำแรง, ครอปผิด, สีเลื่อน, ตัวหนังสือโดน UI ทับ, หรือไม่ถูกจัดเป็น Short/Reel; fps/shutter กำหนด "ความรู้สึก" ของการเคลื่อนไหวพอๆ กับกล้อง

## 4. ผลต่ออารมณ์และการรับรู้
- 24 fps + blur ~180°: "หนัง" (ธรรมเนียม) [CRAFT]; fps สูง: ลื่น จริง (ผู้ดูชอบมากกว่าใน S3D) [EVIDENCE `Wilcox2015_HFR`]
- shutter เล็ก: กระตุก ตื่นตัว ข่าว/สงคราม; ใหญ่: ฝัน เลือน [CRAFT `RED_ShutterAngle`]
- banding/บล็อกจากการบีบอัด: ดู "ถูก" ทำลายภาพลักษณ์ premium [CRAFT]
- สีเลื่อนจาก matrix ผิด: ผิว/กรอบแว่นเพี้ยน — ผิดข้อมูลสินค้า [ทดสอบแล้ว]

## 5. ใช้เมื่อไร
- `spec.ig_reels_9x16` สำหรับ IG/FB/TikTok ทุกคลิปแนวตั้ง; `spec.yt_16x9_1080p` สำหรับ story 16:9; `spec.yt_shorts` สำหรับ Shorts (fps เดิม)
- `spec.master_h264_bt709` เป็นไฟล์ต้นฉบับที่เกรดแล้วทุกงาน; `spec.master_prores4444_alpha` เมื่อส่งชั้นโปร่งใสข้ามโปรแกรม
- `spec.conform_24_to_30` ทุกครั้งที่ใส่คลิป Wan ในไทม์ไลน์ 30 fps

## 6. ไม่ควรใช้เมื่อไร
- อย่าอัปสเกลคลิป Wan 480×848 ไป 4K หรือ 1440×2560 แล้วคาดว่าคมขึ้น (`spec.yt_4k_sdr` เฉพาะงาน HTML/vector)
- อย่า interpolate (minterpolate) ช็อตหน้าคน/มือ/แว่นโดยไม่ตรวจทีละเฟรม (ขอบบิด)
- อย่าส่ง HDR หรือ ProRes ขึ้นโซเชียล
- อย่าเปลี่ยน fps กลางไทม์ไลน์ (cadence เปลี่ยนระหว่างช็อต)

## 7. ตัวอย่าง (มีแหล่ง)
- Cinema norm 180° ≈ 1/48 s @24 fps; มุมเล็ก ≈ ข่าวยุค 1950s [`RED_ShutterAngle`]
- งาน HFR ของ Wilcox et al. ใช้ footage S3D ถ่ายและฉายที่ 24/48/60 fps [`Wilcox2015_HFR`]
- (ตัวอย่างหนังเฉพาะเรื่องที่ใช้ shutter แคบ เช่นฉากสงคราม = [CRAFT, unverified example] ไม่ได้ตรวจใน session นี้)

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip 16:9 (YouTube):** ไทม์ไลน์ 24 fps (เข้ากับ Wan), ส่ง 1920×1080 CRF 17, GOP 12; ฉบับ Reels → reframe (FD06) + conform 30
- **Product/promo:** 30 fps, 1080×1920; ชั้นแว่นเรนเดอร์ HTML ที่ 1080×1920 native (ไม่สเกลภาพ cutout ขึ้น); ถ้าลงแอด Meta → 1440×2560 เฉพาะเมื่อทุกชั้นมีความละเอียดพอ
- **Reels/TikTok beat clip:** 30 fps; kinetic type เร็ว → `spec.motion_blur_180` กับกราฟิก (ไม่ใช่ตัวหนังสือที่ต้องอ่าน)
- **Explainer:** 30 fps; ข้อความ ≥ ~48 px ที่ 1080 กว้าง (CRAFT) อยู่ใน safe box
- **Cartoon (rig.js):** เรนเดอร์ 24 หรือ 30 ตามแพลตฟอร์มหลัก; animation on 2s (12 drawings/s) บน 24 fps ยังคงเป็น 24 fps ไฟล์
- **Documentary/talking head:** fps ตามกล้อง (มือถือมัก 30); อย่าแปลง 30→24 (judder)

## 9. AI image prompt examples (เตรียมขนาดให้ถูกตั้งแต่ต้น)
- ขอภาพที่ aspect ตรงปลายทาง: Codex/FLUX `vertical 9:16 composition` และสร้างที่ขนาดหาร 64 ลงตัว (FLUX; curriculum 03 §9 หมายเหตุ) เช่น 768×1344 แล้วค่อยสเกล 1080×1920
- เว้นพื้นที่: `empty top 14% and bottom third, subject in the middle band` (เผื่อ UI ตาม `Meta_AdsGuide_IGReels`)

## 10. AI video prompt examples
- Wan 2.2 TI2V-5B: 720P = 1280×704 / 704×1280 ที่ 24 fps (model card); เครื่องเรา (6 GB) ใช้ `--size 480x848` (CAPABILITY_MATRIX) → วางแผนให้คลิป Wan เป็น "ฉากหลัง/บรรยากาศ" ที่สเกลขึ้นได้ และให้รายละเอียดคม (แว่น ตัวหนังสือ) มาจากชั้น HTML ความละเอียดเต็ม
- prompt การเคลื่อนที่ช้าและนุ่ม (`slow`, `gentle`) ลด artefact เมื่อ conform เป็น 30 fps ด้วยการซ้ำเฟรม

## 11. Shot list example (ตาราง delivery ของ 1 คลิปเรื่อง)
| deliverable | spec id | ขนาด | fps | หมายเหตุ |
|---|---|---|---|---|
| master เกรดแล้ว | `spec.master_h264_bt709` | 1920×1080 | 24 | แหล่งของทุกฉบับ |
| YouTube | `spec.yt_16x9_1080p` | 1920×1080 | 24 | GOP 12, AAC 384k |
| Reels/TikTok | `spec.ig_reels_9x16` | 1080×1920 | 30 | reframe ทีละช็อต + `fps=30` + safe box |
| Shorts | `spec.yt_shorts` | 1080×1920 | 24 | ≤180 วิ; เพลงที่มี claim ≤60 วิ |
| ชั้นแว่นโปร่งใส | `spec.master_prores4444_alpha` | 1080×1920 | 30 | เฉพาะส่งต่อโปรแกรม |

## 12. ข้อผิดพลาดที่พบบ่อย
- ส่ง Reels ที่ 24 fps (ต่ำกว่าขั้นต่ำที่ IG ระบุ)
- tag bt709 แต่แปลงด้วย BT.601 / tag ไม่ถูกเขียนลงไฟล์ (§2.4)
- full range หลุดเข้าไฟล์ที่ tag tv → ดำยก/ขาวหม่น หรือดำจม
- GOP ยาวเกิน/ไม่มี faststart (YouTube แนะนำ moov หน้าไฟล์)
- ใช้ตัวเลขสเปกจากบล็อกที่ขัดกันเอง
- อัปสเกลหลายรอบ (480→720→1080→1440)

## 13. วิธีตรวจและแก้ (QC ก่อนส่งทุกไฟล์)
```bash
ffprobe -v error -show_entries stream=codec_name,profile,width,height,r_frame_rate,pix_fmt,color_space,color_primaries,color_transfer,color_range -of compact out.mp4
# ต้องได้: h264 High, ขนาดตาม spec, r_frame_rate ตาม spec, yuv420p, bt709/bt709/bt709, tv
ffmpeg -ss 1 -i out.mp4 -frames:v 1 -vf "drawbox=x=65:y=269:w=950:h=980:color=yellow@0.9:t=6" tmp/safebox.png   # 1080x1920 safe box
ffmpeg -i out.mp4 -af ebur128 -f null - 2>&1 | tail -12   # ดู Integrated loudness เทียบ FD19
```
แก้: matrix/tag → ใช้คำสั่งใน `spec.master_h264_bt709`; fps → `spec.conform_24_to_30`; ตัวหนังสือนอก box → ย้ายใน HTML (ไม่ใช่ครอปภาพ)

## 14. แบบฝึกหัด + test case
- **T1 Matrix:** PNG ผิว+กรอบแดง ส่งออก 2 แบบ (default vs bt709+setparams) ดูบน iPhone และ Android — บันทึกความต่าง
- **T2 Conform:** คลิป Wan 5 วิ → `fps=30` vs `minterpolate` — ดูหน้า/มือ/ขอบแว่นทีละเฟรม เลือกค่าเริ่มต้นของบ้าน
- **T3 Motion blur:** kinetic type เดียวกัน 30 fps ไม่มี blur vs 60→tmix→30 — ถามผู้ดูว่าอันไหน "ลื่น/ดูแพง" และอ่านออกไหม
- **T4 Bitrate floor:** ส่ง CRF 14/18/23 ขึ้นบัญชีทดสอบ (ถ้าผู้ใช้อนุญาต) ดาวน์โหลดกลับ เทียบ banding บน gradient ฟ้า
- **T5 Shorts rule:** คลิป 9:16 ยาว 2:50 vs 16:9 ยาว 2:50 — ยืนยันการจัดหมวดตาม `YouTube_Shorts3min`
อัปเดต `test_status` ใน `TECH_SPEC_PRESETS.json`

## 15. แหล่งอ้างอิง
`ITU_BT709_6_2015`, `ITU_BT1886_2011`, `Stokes1996_sRGB`, `YouTube_UploadEncoding`, `YouTube_Shorts3min`, `Instagram_ReelsSpec`, `Meta_AdsGuide_IGReels`,
`TikTok_Ads_InFeedSpec`, `EBU_R128`, `Apple_ProRes`, `RED_ShutterAngle`, `Wilcox2015_HFR`, `Wan22_ModelCard` — ใน `sources/image.json`
