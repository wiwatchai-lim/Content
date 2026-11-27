# Video Quality Checklist (critical / major / minor — วิธีตรวจทุกข้อ)

ใช้ก่อนส่งทุกคลิป (G8–G9 ใน `modules/26-production-workflow.md`). หลักการ/หลักฐาน: `modules/27-video-quality.md`, `modules/30-automated-evaluation.md`.
**Verdict:** critical ข้อเดียว = `fail` (ห้ามส่ง) · มี major = `revise` · มีแต่ minor = `pass` (แจ้งผู้ใช้) — เหมือน `creative-critic`
เครื่องมือรวม: `python .claude/skills/film-director/tools/video_qc.py <file> --preset reels_9x16|youtube_16x9 [--no-audio-ok] [--allow-freeze] [--out qc.json]`
(exit 0 pass · 1 revise · 2 fail · 3 tool error). คำสั่งด้านล่างทดสอบกับ FFmpeg 9.0 บนเครื่องนี้ 2026-11-27

## A. Technical (เครื่องตัดสิน)
| id | Check | ระดับ | เกณฑ์ | วิธีตรวจ |
|---|---|---|---|---|
| T1 | ไฟล์เปิดได้ มี video stream | critical | ffprobe ไม่ error | `ffprobe -v error -show_streams -show_format -of json f.mp4` |
| T2 | Aspect ratio | critical | 9:16 (Reels) / 16:9 (YouTube) | ffprobe width/height (+ rotation side data) |
| T3 | Resolution | major (critical ถ้าด้านสั้น < 720) | 1080×1920 / 1920×1080 | ffprobe |
| T4 | Frame rate มาตรฐาน + คงที่ (CFR) | major / minor | 24/25/30/50/60; r_frame_rate = avg_frame_rate | `ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate,avg_frame_rate -of csv=p=0 f.mp4` · แก้ `-r 30 -fps_mode cfr` |
| T5 | fps ขั้นต่ำแพลตฟอร์ม (IG Reels) | minor | ≥30 (help snippet, ยังไม่ยืนยัน) | ffprobe |
| T6 | Duration | major | ตาม brief (Reels 3–90 s house default) | ffprobe format=duration |
| T7 | Codec / pix_fmt | major | H.264 High, yuv420p, progressive | ffprobe codec_name, profile, pix_fmt · แก้ `-c:v libx264 -profile:v high -pix_fmt yuv420p` |
| T8 | Fast start (YouTube แนะนำ) | minor | moov atom ต้นไฟล์ | export ด้วย `-movflags +faststart` |
| T9 | มีเสียง | critical (ยกเว้นงานที่ผู้ใช้ใส่เพลงเอง → `--no-audio-ok`) | audio stream | ffprobe |
| T10 | Audio codec / sample rate | major / minor | AAC, 48 kHz | ffprobe |
| T11 | Integrated loudness | major | −14 ± 2 LUFS (house rule FX.md) | `ffmpeg -i f.mp4 -af ebur128=peak=true:framelog=quiet -vn -f null -` → Summary `I:` |
| T12 | True peak | major | ≤ −1.0 dBTP | ebur128 Summary `Peak:` · แก้ `-af loudnorm=I=-14:TP=-1.5:LRA=11` แล้ววัดซ้ำ |
| T13 | Loudness range | minor | ≤ 15 LU (craft) | ebur128 `LRA:` |
| T14 | จอดำกลางคลิป | major | ไม่มี > 0.5 s ที่ไม่ได้ตั้งใจ | `ffmpeg -i f.mp4 -vf blackdetect=d=0.1:pix_th=0.10 -an -f null -` → `black_start/black_end` |
| T15 | จอดำเฟรมแรก/ท้าย | minor (major สำหรับ Reels ที่ต้องมี hook) | ≤ 0.5 s | blackdetect (ช่วงที่เริ่มที่ 0) · `ffmpeg -i f.mp4 -frames:v 1 first.png` |
| T16 | ภาพค้าง (freeze) | major (minor ถ้าตั้งใจ: ภาพนิ่ง/2.5D hold) | ไม่มี ≥ 3 s ที่ไม่ได้วางแผน | `ffmpeg -i f.mp4 -vf freezedetect=n=0.001:d=3 -an -f null -` → `freeze_start/duration/end` |
| T17 | เสียงเงียบผิดที่ | minor | ไม่มี ≥ 2 s (−50 dB) นอกจุดตั้งใจ | `ffmpeg -i f.mp4 -af silencedetect=n=-50dB:d=2 -vn -f null -` |
| T18 | Encode ทำลายรายละเอียด (เมื่อมี master) | minor–major | SSIM All ≈ ≥0.98 (craft) | `ffmpeg -i export.mp4 -i master.mov -lavfi "[0:v][1:v]ssim" -f null -` (หรือ psnr; libvmaf ถ้า build รองรับ) |

## B. Generative fidelity (คน/critic ตัดสิน จาก contact sheet + ดูความเร็วจริง)
Contact sheet: `ffmpeg -i f.mp4 -vf fps=2,scale=270:-1,tile=6x4 -frames:v 1 sheet.png` · Cut sheet: `ffmpeg -i f.mp4 -vf "select='gt(scene,0.3)',scale=320:-1,tile=4x3" -frames:v 1 -fps_mode vfr cuts.png`
ดูช่วงสงสัยทีละเฟรม: `ffmpeg -ss 4.0 -i f.mp4 -frames:v 12 -vf scale=540:-1 f_%02d.png`
| id | Check | ระดับ | วิธีตรวจ (มิติอ้างอิง) |
|---|---|---|---|
| G1 | สินค้าตรงรูปจริง (ทรง สี โลโก้ ขาแว่น เลนส์) ทุกเฟรมที่ใช้ | critical | เทียบรูป kit ข้างกัน |
| G2 | ตัวละครตรง markers (CHARACTER_CONSISTENCY_PROTOCOL §4) | critical/major | sheet + ref (VBench subject_consistency) |
| G3 | Identity drift ภายในช็อต (หน้าเปลี่ยนตอนท้าย) | major | เฟรมแรก vs สุดท้ายของช็อต |
| G4 | Morph/warp วัตถุแข็ง | major (critical ถ้าเป็นสินค้า) | sheet 2–4 fps ช่วงเคลื่อนไหว |
| G5 | Flicker/boiling พื้นผิว/เส้น | major ที่จุดเด่น, minor ที่ฉากหลัง | ดูความเร็วจริง 2 รอบ (sheet มองไม่เห็น) (VBench temporal_flickering) |
| G6 | การเคลื่อนไหวกระตุก/ไม่ลื่น | minor–major | ดูความเร็วจริง (VBench motion_smoothness) |
| G7 | มือ/นิ้ว/แขนขา ผิดกายวิภาค | major | เฟรมที่มือชัด (VBench-2.0 Human Fidelity) |
| G8 | ฟิสิกส์/สามัญสำนึกผิด (ของทะลุ ลอย เงาผิดทิศ) | major | ดูความเร็วจริง (VBench-2.0 Physics, Commonsense) |
| G9 | ตัวหนังสือ/โลโก้ที่ AI แต่ง | critical (กฎบ้าน: ข้อความอยู่ใน HTML) | ทุกเฟรม sheet + ซูม |
| G10 | กล้องขยับเองทั้งที่สั่ง static | minor–major | เทียบมุมฉากหลังต้น/ท้าย |
| G11 | Background consistency | minor | (VBench background_consistency) |
| G12 | ตรงกับ prompt/shot list (action, camera) | major | อ่าน shot list ข้างคลิป (EvalCrafter text-video alignment) |

## C. Edit, text, platform (คน/critic + เครื่องช่วย)
| id | Check | ระดับ | วิธีตรวจ |
|---|---|---|---|
| E1 | ข้อความ/ราคา/โลโก้ใน safe zone (9:16: x 60–940, y 220–1480) | major | first.png + เฟรมที่มีข้อความ, วัดพิกเซล (ai-visual-artist analyze_image) |
| E2 | สะกดไทย/อังกฤษ ชื่อแบรนด์/สินค้า | critical | อ่านทีละคำ |
| E3 | ภาษาตามกฎบ้าน (สินค้า = อังกฤษ; ซีรีส์ไทยตาม memory) | critical | STUDIO_RULES |
| E4 | Wordmark TIMEOPTIC เคลื่อนไหว + โลโก้พาร์ทเนอร์บนซ้าย (คลิปสินค้า), ไม่มี line art | major | first/last frames |
| E5 | ซับ/ข้อความอยู่บนจอนานพอที่จะอ่าน | major | เวลาเทียบจำนวนคำ (knowledge/cognitive-science) |
| E6 | Hook 0–1 s มีภาพหลักชัด | major (Reels) | first.png |
| E7 | VO ตรงบท, ไม่มีคำผิด/วรรณยุกต์ผิด | critical | ai-voice-director `tools/qc.py` (CER) + ฟัง |
| E8 | เสียงพูดชัดกว่าเพลง/SFX | major | ฟัง + ebur128 ช่วงพูด |
| E9 | Claim สุขภาพ/สินค้า มีแหล่ง | critical | optical/FACT_CHECK_WORKFLOW.md |
| E10 | สิทธิ์เพลง/SFX/ฟอนต์/ภาพ, ไม่มีชื่อศิลปินใน prompt | critical | CREDITS, prompt log (modules/29) |
| E11 | ป้าย AI ตอนโพสต์ (วิดีโอ AI สมจริง) | major | curriculum 10 §4.5 |
| E12 | ราคา/โปรมาจากผู้ใช้ ไม่เดา | critical | brief |

## D. บันทึกผล
`qc.json` (จาก video_qc) + ตาราง B/C ลงใน critique (creative-critic §4) — แยกคอลัมน์ automated / ai-judgement / user
