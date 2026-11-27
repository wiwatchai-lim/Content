# FD26 — Video Production Workflow (ขั้นตอนการผลิตวิดีโอ: pre → production → post → deliver)

> ต่อยอดจาก `story-clips/_craft/curriculum/12-production-qc.md` (6 เฟสงานโฆษณา, เอกสาร 5 ชิ้น, versioning, archive, KPI)
> และ `.claude/skills/master-creative-director/SKILL.md` (การวางงานข้ามศาสตร์ + routing) — ไม่เขียนซ้ำ
> โมดูลนี้ = **pipeline จริงของสตูดิโอเป็นด่าน (gate) พร้อมคำสั่ง ผลลัพธ์ และเกณฑ์ผ่าน** สำหรับงานวิดีโอทุกชนิด
> หลักฐานส่วนใหญ่เป็น [CRAFT] + ประสบการณ์ภายใน (memory, LEARNING-LOG); งานวิจัยเรื่องประสิทธิภาพ workflow ไม่ได้ค้นในรอบนี้

## 1. นิยามและหลักการพื้นฐาน
- **Pre-production** = ตัดสินใจทุกอย่างที่ถูกเมื่อแก้บนกระดาษ: brief, ความทรงจำงานเก่า, บท, storyboard/shot list, การเลือกเครื่องมือ
- **Production** = สร้าง asset: ภาพ (FLUX/Codex), วิดีโอ (Wan/Kling/2.5D), เสียงพูด (Gemini TTS), rig/HTML
- **Post-production** = ตัดต่อ (HyperFrames), เสียง/มิกซ์ (sound.py, sfxlib, loudnorm), เกรดสี, ข้อความ, QC
- **Delivery** = export ตามสเปก, ป้าย AI, caption, archive, เก็บ feedback
- Pipeline สตูดิโอ (ลำดับบังคับ):
  ```
  brief → memory.py brief → (master-creative-director ถ้างานข้ามศาสตร์) → script → storyboard/shot list (+SCENE_DECISION.json)
  → assets (ถามโควตาก่อน Codex/Kling/TTS) → generate → select → edit → sound → grade → video_qc.py → creative-critic → deliver
  → memory.py add (approval/rejection ด้วยคำพูดผู้ใช้) → LEARNING-LOG
  ```

## 2. ทฤษฎีและหลักการขั้นสูง
- **Cost of change:** การแก้ยิ่งช้ายิ่งแพง (re-gen + re-edit + re-mix) → ด่านตรวจหนักที่สุดอยู่ที่ storyboard/shot list ก่อนใช้โควตา [CRAFT; สอดคล้องกับหลัก process control ใน `creative-intelligence/domains/13-quality-assurance-evaluation.md` §1.1]
- **Gate ไม่ใช่ความรู้สึก:** แต่ละด่านมี "เกณฑ์ผ่าน" ที่ตรวจได้ (ตารางข้อ 11) และผู้ตรวจไม่ใช่ผู้ทำ (creative-critic) — เหตุผล: self-preference ของ LLM judge [EVIDENCE: Panickssery2024] และ makers overrate own work (domains/12 §3.1)
- **Parallel vs serial:** สิ่งที่ขนานได้ — gen ฉากหลัง/ช็อตหลาย seed, TTS ทั้งบทใน request เดียว (memory: gemini-tts-sulafat); สิ่งที่ต้องรอ — การตัดต่อรอ VO (timing มาจากเสียง)
- **Audio-first สำหรับงานมีเสียงพูด:** TTS ก่อน → ความยาวช็อตมาจากเสียง → ค่อย gen วิดีโอให้พอดี (ประหยัด gen ที่ทิ้ง) [CRAFT: ประสบการณ์ Hua Hin clips ใน memory]
- **Versioning & reproducibility:** เก็บสูตร gen ครบ (tool, model, seed, size, prompt, refs) — CONTINUITY_SYSTEM §0.5; ชื่อไฟล์ตาม curriculum 12 §1.7

## 3. เหตุผลที่ใช้
- ใช้โควตา (Codex, Kling, Gemini TTS ~10 req/วัน) อย่างคุ้ม — ผิดตอน storyboard ถูกกว่าผิดหลัง gen
- งานต่อเนื่องหลายตอน (ซีรีส์) ต้องมีลำดับเดิมทุกครั้งเพื่อไม่ลืม continuity และกฎบ้าน
- ทำให้ข้อผิดพลาดซ้ำกลายเป็นการแก้ "กระบวนการ" (creative-critic §5.5)

## 4. ผลต่ออารมณ์และการรับรู้
- Workflow ไม่ได้ส่งผลต่อคนดูโดยตรง แต่กำหนดว่าการตัดสินใจทางอารมณ์ (target emotion ใน SCENE_DECISION) ถูกล็อกก่อนผลิต → ทุกเลเยอร์ชี้ไปทางเดียว (MASTER_QUALITY_SCORE "Emotional impact") [CRAFT]

## 5. ใช้เมื่อไร
- ทุกคลิป; งานสั้นมาก (เปลี่ยนข้อความเดียว) ข้ามได้ถึงขั้น edit แต่ **ไม่ข้าม video_qc + critic**

## 6. ไม่ควรใช้เมื่อไร (หรือย่อ)
- งาน routine ที่มี skill เฉพาะ (beat-clip, eye-break-clip, frame-kit) — ใช้ขั้นตอนของ skill นั้น แล้วเสริมแค่ QC ของโมดูลนี้
- ช่วงทดลอง/เรียนรู้ (exercise) — ข้าม critic ได้ แต่ต้องบันทึก LEARNING-LOG

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- Pixar Braintrust (แยกผู้ให้ notes กับผู้ตัดสิน) — อ้างผ่าน `creative-intelligence/domains/12-independent-creative-criticism.md` §7.1
- อื่น ๆ: ไม่มีแหล่งที่เปิดอ่านในรอบนี้

## 8. ประยุกต์ตามประเภทวิดีโอ
| ประเภท | จุดที่ต่าง |
|---|---|
| Story clip (ไทย) | continuity pre-episode check (CONTINUITY_SYSTEM §4) ก่อนเขียนบท; TTS ก่อนภาพ; rig.js lip-sync; ซับไทย |
| Product/promo | ถามราคา/โปรทุกครั้ง (ไม่มีไฟล์ราคา); frame-kit ให้รูปจริง; claim สุขภาพผ่าน FACT_CHECK_WORKFLOW |
| Reels 9:16 | safe zone x 60–940, y 220–1480; เพลงผู้ใช้ใส่เอง (export แบบ `--no-audio-ok` ได้); ป้าย AI ON |
| Explainer | สคริปต์ผ่าน SCRIPT_CHECKER; ข้อมูลเป็น HTML; ตรวจ fact |
| Cartoon | ตัวละครจาก ref sheet; anchor keyframes (FD23) |
| Talking head | เสียงจริง/ไมค์; ตัด jump cut; loudness ของเสียงพูด |

## 9. AI image prompt examples (ขั้น storyboard — ภาพร่างเร็วด้วย FLUX ฟรี)
- `Rough storyboard frame, loose pencil sketch, vertical 9:16, wide shot of a small optical shop at night, a shopkeeper behind the counter on the left third, door on the right, simple shapes, no text.`
- `Rough storyboard frame, pencil sketch, close-up of hands placing eyeglasses on a velvet tray, top-down view, no text.`

## 10. AI video prompt examples
- ใช้เฉพาะหลัง storyboard ผ่าน — ดู FD22 §10 และ `libraries/AI_VIDEO_PROMPT_LIBRARY.json`; ในขั้น animatic ใช้ 2.5D/HTML กับภาพร่างแทน gen วิดีโอจริง [CRAFT]

## 11. Shot list example — ตารางด่าน (gate) ที่ใช้จริง
| ด่าน | คำสั่ง/ไฟล์ | Output | เกณฑ์ผ่าน |
|---|---|---|---|
| G0 Brief | ถามผู้ใช้: จุดประสงค์ คนดู แพลตฟอร์ม อารมณ์เดียว ข้อความเดียว ราคา/โปร | brief 5 บรรทัด | ครบทุกช่อง ไม่เดาราคา |
| G1 Memory | `python creative-intelligence/tools/memory.py brief --job "<job>" --tags <tags>` | taste, rejections, characters | ทำตามทุกข้อ หรือบอกว่าไม่มีประวัติ |
| G2 Script | SCRIPT_CHECKER, fact-check | บท + เวลา | ความยาว ≈ ตามอัตราพูด; claim มีแหล่ง |
| G3 Storyboard | `templates/SCENE_DECISION.json` ต่อช็อต → `tools/check_scene.py` | shot list + เหตุผล | check_scene ผ่าน; เครื่องมือ/โควตาต่อช็อตระบุ |
| G4 Assets | FLUX ฟรี / Codex (ถามก่อน) / kit | ภาพ text-free + สูตร gen | identity markers ผ่าน; สินค้าตรงรูปจริง |
| G5 Generate | wan.py / Kling / 2.5D | คลิปดิบ หลาย seed | contact sheet ผ่าน (ไม่มี morph ที่จุดเด่น) |
| G6 Edit | HyperFrames | timeline | ตัดช่วงดี, ข้อความใน HTML, wordmark/โลโก้ตามกฎ |
| G7 Sound | TTS (ถามก่อน), sound.py, sfxlib, `loudnorm=I=-14:TP=-1.5:LRA=11` | mix | video_qc loudness/true peak ผ่าน |
| G8 Tech QC | `python .claude/skills/film-director/tools/video_qc.py out.mp4 --preset reels_9x16` | JSON | verdict pass (หรือ revise ที่อธิบายได้) |
| G9 Critic | skill `creative-critic` (sub-agent อิสระ) | critique.json | ไม่มี critical/major ค้าง |
| G10 Deliver | export + caption + ป้าย AI + archive kit | ไฟล์ส่ง | ชื่อไฟล์ตาม versioning |
| G11 Learn | `memory.py add --type approval\|rejection` ด้วยคำผู้ใช้; LEARNING-LOG | record | บันทึกภายในวันเดียวกัน |

## 12. ข้อผิดพลาดที่พบบ่อย
- gen ก่อนมี shot list → เสียโควตากับช็อตที่ไม่ใช้
- ทำภาพก่อนเสียงในงานมี VO → ต้องยืด/ตัดภาพทีหลัง
- ข้าม memory brief → ทำซ้ำสิ่งที่ผู้ใช้เคยปฏิเสธ
- ให้ตัวเองเป็น critic (maker grades own work)
- export ไม่ normalize เสียง: คลิปจริงในรีโปตรวจด้วย video_qc เมื่อ 2026-11-27 — eyesight EP01 true peak +0.1 dBTP, night-optic EP01 0.0 dBTP (เกินเกณฑ์ −1 dBTP)
- ไม่เก็บสูตร gen → ทำตอนต่อไปไม่เหมือน

## 13. วิธีตรวจและแก้
- ทุกงานจบด้วย G8 + G9; ถ้า G8 ไม่ผ่านเรื่องเสียง → รัน loudnorm two-pass หรืออย่างน้อย `-af loudnorm=I=-14:TP=-1.5:LRA=11` แล้วตรวจซ้ำ
- ข้อผิดพลาดเดิม ≥2 งาน → แก้ template/skill (creative-critic §5.5) ไม่ใช่แก้รายงาน
- ทบทวนตาราง gate นี้ทุกครั้งที่ผู้ใช้ปฏิเสธงาน: ด่านไหนควรจับได้?

## 14. แบบฝึกหัด + test case
- **Test A:** เอาคลิปที่เคยส่งแล้ว 1 ชิ้น ไล่ย้อนตาราง G0–G11 — ด่านไหนไม่มีหลักฐาน (ไฟล์/บันทึก)? เขียนสิ่งที่ขาด
- **Test B (audio-first vs image-first):** คลิป 15 s เดียวกัน ทำ 2 ลำดับ → วัดจำนวน gen ที่ทิ้งและเวลาที่ใช้
- **Test C:** รัน video_qc กับ export ทุกตอนของซีรีส์หนึ่ง → ตารางสรุป loudness/true peak/black → ตัดสินว่าต้องแก้ export template ไหม

## 15. แหล่งอ้างอิง
Panickssery2024 · Wang2023Fair · FFmpegFilters · EBUR128 · ITUBS1770 · YouTubeUpload · InstagramReelsHelp
ภายใน: `story-clips/_craft/curriculum/12-production-qc.md`, `.claude/skills/master-creative-director/SKILL.md`, `.claude/skills/creative-critic/SKILL.md`,
`creative-intelligence/tools/memory.py`, `creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md`, `creative-intelligence/domains/12-…`, `13-…`, `15-creative-workflow-automation.md`
