---
name: film-director
description: Think like a full film crew (director, DOP, camera operator, editor, lighting, colourist, animation/motion, sound, storyboard, AI-video specialist, QC) before any shot is made — choose shot size, angle, movement, lens, composition, light, colour, timing, transition and sound for a story reason, write AI image/video prompts and shot lists, plan camera paths, keep characters and scenes consistent, and grade a video before delivery. Use when the user wants a clip/scene/storyboard/shot list planned or directed ("กำกับ", "วางช็อต", "ทำ shot list", "ทำสตอรี่บอร์ด", "มุมกล้อง", "เคลื่อนกล้อง", "แสงแบบหนัง", "เกรดสี", "ตัดต่อยังไงดี", "เขียน prompt วิดีโอ", "ทำคลิปให้เหมือนหนัง", "ตรวจคลิป", "คลิปนี้ดีไหม"), asks why a camera choice works, or asks about cinematography knowledge. Routine production stays in its own skill (beat-clip, eye-break-clip, story-clips GUIDE) — this skill supplies the directing decisions and QC for them.
---

# Film Director

ทีมกำกับในสกิลเดียว เป้าหมายไม่ใช่แค่ภาพสวย แต่ **ทุกการเลือกต้องอธิบายเหตุผลทางการเล่าเรื่องได้**
คุยกับผู้ใช้เป็นภาษาไทย สั้น ๆ กฎบ้าน (CLAUDE.md) ใช้เสมอ: คลิปภาษาอังกฤษ ยกเว้นซีรีส์ที่ memory บอกว่าไทย,
ภาพสำหรับคลิป gen แบบไม่มีตัวหนังสือ, การ gen ที่ใช้โควตา (Codex, Kling, Gemini TTS) ถามก่อนทุกครั้ง

## 1. ก่อนเริ่ม
1. `python creative-intelligence/tools/memory.py brief --job "<job>" --tags <tags>` — ทำตามที่มันบอก (รสนิยม, สิ่งที่เคยถูกปฏิเสธ, ตัวละคร)
2. รู้: จุดประสงค์ · คนดู · แพลตฟอร์ม/อัตราส่วน · อารมณ์เดียว + ข้อความเดียว · สิ่งที่ล็อกไว้ (แว่นจริง, ตัวละคร, โลโก้) · เครื่องมือที่ใช้ได้

## 2. ตัดสินใจทีละฉาก — `DECISION_ENGINE.md` (20 ขั้น)
กรอก `templates/SCENE_DECISION.json` ทุกช็อต แล้วรัน `python .claude/skills/film-director/tools/check_scene.py <file>`
จนผ่าน ทุกช่องต้องมี `why` ที่เป็นเหตุผลเรื่อง ไม่ใช่ "สวยดี"

## 3. โหลดเฉพาะที่ต้องใช้ (อย่าโหลดทั้งหมด)
| ต้องการ | ไฟล์ |
|---|---|
| ขนาดช็อต / มุม / การเคลื่อน / ตำแหน่งกล้อง | `modules/01–04`, `libraries/SHOT_TYPE_LIBRARY.json`, `CAMERA_ANGLE_LIBRARY.json`, `CAMERA_MOVEMENT_LIBRARY.json` |
| เลนส์ ระยะชัด ฟิสิกส์ภาพ | `modules/05-lens-optics.md`, `libraries/LENS_KNOWLEDGE_LIBRARY.json` |
| วางเส้นทางกล้อง (keyframes, rig.js) | `modules/24-camera-path-planning.md` |
| องค์ประกอบ / มิติลึก | `modules/06`, `07`, `libraries/COMPOSITION_LIBRARY.json` |
| แสงแบบหนัง | `modules/08`, `libraries/LIGHTING_PRESET_LIBRARY.json` |
| สี / เกรด (+ ffmpeg) | `modules/09`, `libraries/COLOR_GRADE_LIBRARY.json` |
| สเปกไฟล์ / แพลตฟอร์ม | `modules/21`, `libraries/TECH_SPEC_PRESETS.json` |
| ตัดต่อ / ทรานซิชัน / ไวยากรณ์ภาพยนตร์ | `modules/10`, `11`, `libraries/TRANSITION_LIBRARY.json` |
| อารมณ์ → กล้อง แสง สี จังหวะ | `modules/12`, `13`, `libraries/EMOTIONAL_CAMERA_MATRIX.json` |
| เล่าเรื่องด้วยภาพ / การแสดง | `modules/14`, `15` |
| แนวหนัง / สไตล์กำกับ | `modules/20`, `libraries/GENRE_STYLE_LIBRARY.json` |
| hook / การดูจนจบ | `modules/28-attention-retention.md` |
| แอนิเมชัน / การ์ตูน / motion design | `modules/16`, `17`, `18`, `libraries/ANIMATION_MOTION_LIBRARY.json` |
| เสียง + ซิงก์เพลง | `modules/19`, `libraries/SOUND_SYNC_LIBRARY.json` |
| สตอรี่บอร์ด / shot list | `modules/25`, `templates/STORYBOARD_TEMPLATE.md`, `templates/SHOT_LIST_TEMPLATE.md`, `libraries/STORYBOARD_TEMPLATES.json` |
| prompt วิดีโอ AI (Wan, Kling, Veo, Sora …) | `modules/22`, `libraries/AI_VIDEO_PROMPT_LIBRARY.json` |
| ตัวละคร/ฉากต่อเนื่อง | `modules/23`, `libraries/CHARACTER_CONSISTENCY_PROTOCOL.md`, `SCENE_CONTINUITY_PROTOCOL.md` |
| ขั้นตอนผลิต | `modules/26-production-workflow.md` |
| ตรวจคุณภาพ | `modules/27`, `30`, `libraries/VIDEO_QUALITY_CHECKLIST.md`, `python .claude/skills/film-director/tools/video_qc.py <video> --preset reels_9x16` |
| ความเป็นต้นฉบับ / ลายเซ็นของสตูดิโอ | `modules/29-originality-identity.md` |
| แบบฝึกหัด | `training/EXERCISES.md` |

ความรู้ที่มีอยู่แล้ว ใช้ร่วมกัน (ไม่ copy): `story-clips/_craft/GUIDE.md` + `curriculum/`, `creative-intelligence/knowledge/visual-arts/`,
skill `ai-visual-artist` (ภาพนิ่ง), `ai-voice-director` (เสียงพูด), `creative-intelligence/knowledge/emotional-architecture/`.

## 4. สร้าง
เลือกเครื่องมือที่คุมได้ก่อน: HTML/HyperFrames + `rig.js` (กล้อง/หุ่น) → 2.5D (`tools/depth.py`) → FLUX ฟรี → Wan ฟรี (NVIDIA)
→ Codex/Kling (ใช้โควตา ถามก่อน) prompt วิดีโอเขียนเป็นภาษากล้อง: subject + action + camera move + lens + light + mood + duration
และไม่มีตัวหนังสือในภาพ

## 5. ตรวจก่อนส่ง
1. `video_qc.py` (เทคนิค: ดำ, ค้าง, ความดัง, ขนาด, fps)
2. `libraries/VIDEO_QUALITY_CHECKLIST.md` (critical → major → minor)
3. skill `creative-critic` — ผู้วิจารณ์อิสระ คนทำห้ามให้คะแนนงานตัวเอง
4. อธิบายให้ผู้ใช้ 2–3 บรรทัด: เลือกอะไรเพราะอะไร

## 6. เรียนรู้
หลังผู้ใช้ตอบรับ/ปฏิเสธ → `memory.py add --type approval|rejection` ด้วยคำพูดของผู้ใช้ บทเรียนจากคลิปเรื่อง →
`story-clips/_craft/LEARNING-LOG.md` ผลการทดลองจริง → `training/EXPERIMENTS.md` (เปลี่ยน `test_status` ใน library จาก
untested → tested เฉพาะเมื่อทดลองจริงแล้ว) ห้ามอ้างว่าอ่านแหล่งที่ยังไม่ได้เข้าถึง — ดู `access_status` ใน `sources/*.json`
