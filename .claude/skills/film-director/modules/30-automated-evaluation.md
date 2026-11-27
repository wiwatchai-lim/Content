# FD30 — Automated Creative Evaluation (การประเมินงานสร้างสรรค์แบบอัตโนมัติ: rubric, AI judge, frame sampling, ffmpeg)

> ระบบที่มีอยู่แล้ว: skill `creative-critic` (packet → sub-agent อิสระ → critique.json → memory), `creative-intelligence/tools/critic.py`,
> `creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md` (100 คะแนน + critical failures), `creative-intelligence/domains/12-independent-creative-criticism.md` §3.5 (กลไก bias ของ LLM judge),
> `domains/13-quality-assurance-evaluation.md` §3.3 rubric, §3.7 machine vs human vs AI. โมดูลนี้เพิ่ม: **การประเมิน "วิดีโอ" อัตโนมัติ** — สิ่งที่เครื่องวัดได้, สิ่งที่ AI judge ดูวิดีโอได้/ไม่ได้, และ pipeline ที่ต่อกับ critic

## 1. นิยามและหลักการพื้นฐาน
- **Automated evaluation** = การให้คะแนน/ตรวจโดยเครื่อง แบ่ง 3 ชนิด:
  1. **Deterministic checks** — ffprobe/ffmpeg filters: ผลซ้ำได้ 100% (สเปก, loudness, จอดำ, ภาพค้าง, เงียบ) [EVIDENCE: FFmpegFilters, ITUBS1770]
  2. **Learned metrics** — โมเดลที่เทรนให้ตรงคน: VMAF (encode), VBench dimensions, VideoScore [EVIDENCE: VMAFRepo, VBenchRepo, VideoScore2024]
  3. **LLM/VLM-as-judge** — โมเดลภาษาที่ดูภาพ/เฟรมแล้วให้คะแนนตาม rubric [EVIDENCE: Zheng2023Judge]
- **Rubric** = เกณฑ์ที่เขียนเป็นพฤติกรรมสังเกตได้ต่อระดับคะแนน (domains/13 §3.3) — AI judge ต้องได้ rubric ไม่ใช่ "ให้คะแนนความสวย"
- **Frame sampling** = AI judge (และเรา ผ่าน Read รูป) ดูวิดีโอเป็นชุดภาพนิ่ง → สิ่งที่เกิดระหว่างเฟรมที่ไม่ได้ sample (flicker เร็ว, morph 3 เฟรม, lip-sync) **มองไม่เห็น** [CRAFT, ข้อจำกัดเชิงกลไก]

## 2. ทฤษฎีและหลักการขั้นสูง
- **Bias ของ LLM judge ที่มีหลักฐาน:**
  | Bias | หลักฐาน | มาตรการในสตูดิโอ |
  |---|---|---|
  | Position (ลำดับที่เห็นก่อน) | ลำดับเปลี่ยน → ผลจัดอันดับเปลี่ยน; Vicuna-13B ชนะ ChatGPT 66/80 เมื่อสลับ [Wang2023Fair] | เทียบ A/B สองลำดับ ชนะทั้งสองถึงนับ (critic rule 10) |
  | Verbosity | judge ชอบคำตอบยาว [Zheng2023Judge] | critique ห้าม padding; ให้คะแนนหลัง findings |
  | Self-preference / self-enhancement | โมเดลให้คะแนนงานตัวเองสูง และสัมพันธ์กับการจำงานตัวเองได้ [Panickssery2024, Zheng2023Judge] | maker ไม่ตรวจงานตัวเอง; critic เป็น sub-agent ใหม่ไม่เห็นเหตุผลของ maker |
  | Limited reasoning | judge พลาดโจทย์ต้องคิดหลายขั้น [Zheng2023Judge] | งานที่ต้องคำนวณ (loudness, ขนาด, safe zone) ให้เครื่องมือวัด — "tool wins" (critic rule 9) |
- **Judge ตรงกับคนได้แค่ไหน:** GPT-4 ตรงกับความชอบของคน >80% ในงานแชต ≈ ระดับคน-คน [EVIDENCE: Zheng2023Judge] — แต่สำหรับวิดีโอ AI, VideoScore รายงานว่า metric เดิมไม่มีตัวไหนให้คะแนนเชื่อถือได้ และต้องเทรนด้วยคะแนนคน 37.6K คลิปจึงได้ Spearman 77.1 บนชุดทดสอบของตัวเอง [EVIDENCE: VideoScore2024] → **คะแนน AI judge ต่อวิดีโอของเรายังไม่ถูก calibrate: ใช้เป็นสัญญาณ ไม่ใช่คำตัดสิน**
- **การแก้ bias แบบมีหลักฐาน:** ให้เหตุผล/หลักฐานก่อนคะแนน (multiple evidence), เฉลี่ยข้ามลำดับ (balanced position), ส่งเคสยากให้คน (human-in-the-loop) [EVIDENCE: Wang2023Fair]; survey ทบทวนแนวทางเพิ่มความน่าเชื่อถือ [Gu2024Survey, search_summary]
- **Fitted weights > equal weights:** EvalCrafter รวม 17 metric ด้วยค่าน้ำหนักที่ fit กับความชอบของผู้ใช้ ได้ความสัมพันธ์กับคนดีกว่าเฉลี่ยเท่ากัน [EVIDENCE: EvalCrafter2023] → MASTER_QUALITY_SCORE ใช้น้ำหนักตั้งต้น แต่ควรปรับตาม verdict จริงของผู้ใช้เมื่อมีข้อมูลพอ
- **Goodhart:** เมื่อ metric กลายเป็นเป้า มันหยุดวัดสิ่งที่ตั้งใจ (domains/13 §3.6) → ตัวเลขอัตโนมัติไม่ใช่ KPI ของงานสร้างสรรค์

## 3. เหตุผลที่ใช้
- เครื่องจับ error ที่ตาพลาดได้ (true peak +0.1 dBTP ในคลิปที่ส่งไปแล้ว)
- ลดภาระผู้ใช้ (ไม่ใช่คนเทคนิค) — งาน T-layer ควรไม่ถึงมือเขา
- ทำให้การตรวจสม่ำเสมอทุกงาน และเก็บเป็นข้อมูลเพื่อ calibrate

## 4. ผลต่ออารมณ์และการรับรู้
- Automated evaluation ไม่วัดอารมณ์ได้ตรง; AI judge "อ่าน" อารมณ์จากเฟรมนิ่งได้แค่บางส่วน (ไม่ได้ยินจังหวะ/เสียง) → คะแนนอารมณ์ต้องมาจากผู้ใช้/คนดู [CRAFT]

## 5. ใช้เมื่อไร
- Deterministic checks: ทุก export (ไม่มีข้อยกเว้น)
- Frame-sampled AI review: ทุกคลิปที่มีช็อต AI — มองหา identity, มือ, ตัวหนังสือ, สินค้า, safe zone
- AI rubric score: เพื่อติดตามแนวโน้ม/เทียบเวอร์ชัน ด้วย set-up เดิม (critic §5.6)

## 6. ไม่ควรใช้เมื่อไร
- ห้ามใช้คะแนน AI แทนคำตัดสินผู้ใช้ หรือเรียกว่า "human rating"
- ห้ามให้ AI judge ตัดสินสิ่งที่เครื่องมือวัดได้ (loudness, ขนาด, fps)
- ห้ามเทียบคะแนนข้ามช่วงเวลาถ้าเปลี่ยน model/rubric/packet
- ห้ามให้ judge ประเมินเรื่องเวลา (flicker เร็ว, sync) จาก contact sheet

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- ไม่มีตัวอย่างหนัง; ตัวอย่างจริงของเรา: video_qc กับ eyesight EP01 → verdict `revise` (black_inside 4.4 s, true_peak +0.1) — เครื่องจับ, คนตัดสินว่าจอดำตั้งใจหรือไม่

## 8. ประยุกต์ตามประเภทวิดีโอ
| ประเภท | Deterministic | Frame-sampled AI review | คนต้องตัดสิน |
|---|---|---|---|
| Story clip | spec, loudness, black/freeze (`--allow-freeze` ถ้าภาพนิ่ง) | identity markers ทุกคัท, ซับอ่านได้ | อารมณ์, การแสดงเสียงไทย |
| Product | spec, loudness | สินค้าตรงรูปจริง, โลโก้, safe zone | ความน่าซื้อ |
| Reels | preset reels_9x16, เฟรมแรกไม่ดำ | hook frame (0–1 s) ชัด | hook แรงไหม |
| Explainer | silencedetect, LRA | ข้อความถูก/อ่านทัน | เข้าใจไหม |
| Cartoon | flicker (sample ถี่) | เส้น/สี/ตัวละคร | เสน่ห์ |
| Talking head | loudness คำพูด | — | ความเป็นธรรมชาติ, sync |

## 9. AI image prompt examples (ใช้กับ judge — rubric prompt สำหรับภาพนิ่ง/คีย์เฟรม)
```
You are checking one keyframe against a character reference. List each marker as PASS/FAIL with the pixel region:
1 big round head 2 messy spiky black hair with bangs 3 black rectangular glasses 4 small black oval eyes
5 small mole on the left cheek (viewer's left) 6 thick black outlines, flat colours 7 about 2.5 heads tall.
Describe what you see before judging. No overall score.
```

## 10. AI video prompt examples (judge บน contact sheet)
```
These are frames sampled at 2 fps from a 12 s vertical clip (left-to-right, top-to-bottom, timestamps under each).
For each frame report: product shape matches the attached product photo (yes/no + what differs); hands (count fingers when visible);
any generated text or logo; subject inside the safe area x 60-940, y 220-1480 of 1080x1920. Report only located findings
(frame index + region). You cannot see motion between frames: do not judge flicker, smoothness or lip-sync.
```

## 11. Shot list example — Auto-eval pipeline ต่อคลิป
| ขั้น | คำสั่ง | ผล | ใครตัดสิน |
|---|---|---|---|
| 1 Spec+audio+black/freeze | `python .claude/skills/film-director/tools/video_qc.py clip.mp4 --preset reels_9x16 --out critique/qc.json` | qc.json + exit code | เครื่อง |
| 2 Cut sheet | `ffmpeg -i clip.mp4 -vf "select='gt(scene,0.3)',scale=320:-1,tile=4x3" -frames:v 1 -fps_mode vfr critique/cuts.png` | ภาพทุกคัท | critic (continuity) |
| 3 Motion sheet | `ffmpeg -i clip.mp4 -vf fps=2,scale=270:-1,tile=6x4 -frames:v 1 critique/sheet.png` | 24 เฟรม | critic (artifact) |
| 4 First frame | `ffmpeg -i clip.mp4 -frames:v 1 critique/first.png` | ปก/hook | critic |
| 5 Packet | `python creative-intelligence/tools/critic.py packet --work clip.mp4 --work critique/qc.json --work critique/sheet.png --kind clip ...` | packet.md | — |
| 6 Critic | sub-agent อิสระ (creative-critic §2) | critique.json | AI judge (labelled) |
| 7 User | ส่งพร้อม critique สรุป | approval/rejection | **ผู้ใช้ (สูงสุด)** |
| 8 Calibrate | `memory.py add` + `critic.py record --accepted` | ข้อมูลเทียบ critic vs user | — |

## 12. ข้อผิดพลาดที่พบบ่อย
- ให้ AI ดูคลิปแล้วบอก "ดีมาก 9/10" โดยไม่มี rubric/findings
- ส่งเฉพาะเฟรมสวยให้ judge (selection bias)
- ใช้ judge ตัวเดียวกับ maker ในบทสนทนาเดียวกัน
- เชื่อ metric ภาพนิ่ง (aesthetic score) ว่าแทนคุณภาพวิดีโอ
- ปรับ rubric ไปเรื่อย ๆ แล้วเทียบคะแนนกับของเก่า

## 13. วิธีตรวจและแก้ (ตรวจระบบประเมินเอง)
- **Calibration log:** ทุกงานเก็บ (critic verdict, คะแนน, verdict ผู้ใช้) → เมื่อครบ ≥10 งาน ดูว่าตรงกันกี่ % และ critic พลาดทางไหน (domains/12 §6.4)
- **Golden set:** เก็บคลิปที่ผู้ใช้อนุมัติ/ปฏิเสธชัดเจน 5–10 ชิ้นเป็นชุดทดสอบ; เปลี่ยน rubric/prompt judge แล้วต้องรันชุดนี้ก่อน (domains/13 §6.4)
- **Order test:** A/B สลับลำดับทุกครั้ง; ถ้าผลกลับ = tie
- **Tool vs eye:** ขัดกัน → เครื่องมือชนะสำหรับ T-layer; ถ้าเครื่องมือผิด (เช่น freeze ที่ตั้งใจ) ให้แก้ preset/flag ไม่ใช่ปิด check

## 14. แบบฝึกหัด + test case
- **Test A (position bias ของเรา):** คลิป 2 เวอร์ชัน → critic sub-agent 2 ตัว คนละลำดับ → ผลตรงกันไหม (บันทึกใน domains/12 §6.4 calibration)
- **Test B (sampling blind spot):** สร้างคลิปทดสอบที่มี flicker 3 เฟรม (ffmpeg overlay) → contact sheet 2 fps เห็นไหม? freezedetect/blackdetect จับไหม? → สรุปว่าอะไรต้องคนดูความเร็วจริง
- **Test C (agreement):** 10 คลิปเก่า: verdict critic vs verdict ผู้ใช้ (จาก memory) → % ตรงกัน และ critic เข้มหรือหลวมไป

## 15. แหล่งอ้างอิง
Zheng2023Judge · Wang2023Fair · Panickssery2024 · Gu2024Survey · VideoScore2024 · EvalCrafter2023 · VBench2023 · VBenchRepo · VBench2_2025 · VMAFRepo · FFmpegFilters · ITUBS1770 · ITUP910
ภายใน: `.claude/skills/creative-critic/SKILL.md`, `creative-intelligence/tools/critic.py`, `creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md`, domains/12, domains/13
