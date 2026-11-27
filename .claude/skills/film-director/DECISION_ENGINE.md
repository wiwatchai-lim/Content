# Creative Decision Engine — 20 ขั้นก่อนสร้างทุกฉาก

กฎ: **ห้ามเลือกกล้อง แสง สี การเคลื่อนไหว หรือจังหวะตัด โดยไม่มีเหตุผลทางการเล่าเรื่อง**
ทุกช่องต้องตอบ "เพราะอะไร" ได้ 1 บรรทัด ช่องไหนตอบไม่ได้ = ยังไม่พร้อมสร้าง

## ลำดับการคิด (บนลงล่าง — ช่องล่างต้องสอดคล้องกับช่องบน)
| # | ช่อง | คำถามที่ต้องตอบ | ดูความรู้ที่ |
|---|---|---|---|
| 1 | Scene Objective | ฉากนี้ต้องเปลี่ยนอะไรในเรื่อง/ในใจคนดู (ถ้าตัดทิ้งแล้วเรื่องไม่เสีย = ตัด) | modules/14 |
| 2 | Narrative Context | อยู่ตรงไหนของโครงเรื่อง ก่อน/หลังฉากนี้คืออะไร | modules/14, 25 |
| 3 | Character Motivation | ตัวละครอยากได้อะไร ขวางด้วยอะไร | modules/15 |
| 4 | Target Emotion | คนดูควรรู้สึกอะไร (1 อารมณ์หลัก + ระดับ 1–5) | libraries/EMOTIONAL_CAMERA_MATRIX.json |
| 5 | Audience Perspective | คนดูรู้มากกว่า / เท่ากับ / น้อยกว่าตัวละคร (suspense vs surprise) · มองแทนใคร | modules/12, 13 |
| 6 | Visual Focus | ตาคนดูต้องไปที่ไหนก่อน (1 จุด) — ทำด้วย contrast, focus, motion, ตำแหน่ง | modules/06, 12 |
| 7 | Camera Position | กล้องอยู่ตรงไหนในพื้นที่ ฝั่งไหนของเส้น 180° | modules/04, 11 |
| 8 | Shot Size | ใกล้/ไกลแค่ไหน = ความใกล้ชิดทางอารมณ์ | libraries/SHOT_TYPE_LIBRARY.json |
| 9 | Camera Angle | สูง/ต่ำ/ระดับตา = อำนาจ, ความเปราะบาง | libraries/CAMERA_ANGLE_LIBRARY.json |
| 10 | Camera Movement | นิ่ง หรือขยับ — ขยับเพราะอะไร (motivated) | libraries/CAMERA_MOVEMENT_LIBRARY.json, modules/24 |
| 11 | Lens Selection | กว้าง/ปกติ/เทเล = พื้นที่, ระยะ, ความอึดอัด | libraries/LENS_KNOWLEDGE_LIBRARY.json |
| 12 | Composition | วางตัวละครตรงไหน, พื้นที่ว่าง, เส้นนำสายตา, 9:16 safe zone | libraries/COMPOSITION_LIBRARY.json |
| 13 | Lighting | ทิศ, ความแข็ง, ratio, motivated source | libraries/LIGHTING_PRESET_LIBRARY.json |
| 14 | Color Palette | สีหลัก/รอง, warm-cool, saturation ตามอารมณ์, ต่อเนื่องกับ color script | libraries/COLOR_GRADE_LIBRARY.json |
| 15 | Scene Duration | กี่วินาที, จังหวะ (ให้คนดูอ่านภาพทันไหม) | modules/10, 28 |
| 16 | Sound Design | เสียงหลัก, SFX ที่ hit point, เพลง/เงียบ, J/L cut | libraries/SOUND_SYNC_LIBRARY.json |
| 17 | Transition | เข้า/ออกฉากยังไง และทำไม (cut ธรรมดาเป็นค่าเริ่มต้น) | libraries/TRANSITION_LIBRARY.json |
| 18 | Continuity | ทิศการมอง, ทิศการเดิน, แสง, เสื้อผ้า, prop ตรงกับช็อตข้างเคียง | libraries/SCENE_CONTINUITY_PROTOCOL.md |
| 19 | Generation Constraints | เครื่องมือไหน (HTML/rig, 2.5D, FLUX, Wan, Codex, Kling), ข้อจำกัดที่รู้, โควตา (ต้องถาม) | modules/22, libraries/AI_VIDEO_PROMPT_LIBRARY.json |
| 20 | Quality Criteria | ผ่านเมื่อ… (เช็คได้จริง) + critical failures | libraries/VIDEO_QUALITY_CHECKLIST.md, modules/27, 30 |

## กติกาความสอดคล้อง (ตรวจหลังกรอกครบ)
- ข้อ 4 อารมณ์ → ข้อ 8–14 ต้องไปทางเดียวกัน หรือขัดกันอย่างตั้งใจ (เขียนเหตุผล เช่น ironic contrast)
- ข้อ 5 ถ้ามองแทนตัวละคร (POV) → ข้อ 7, 9, 11 ต้องเป็นตำแหน่ง/ระดับตา/เลนส์ของตัวละครนั้น
- ข้อ 10 ทุกการเคลื่อนต้องมีแรงจูงใจ: ตามตัวละคร · เผยข้อมูล · เปลี่ยนความสัมพันธ์ · สะท้อนสภาพใจ ไม่มี = นิ่ง
- ข้อ 15 ช็อตที่มีข้อมูลใหม่มาก (ข้อความ, ของหลายชิ้น) ต้องยาวพอให้อ่าน — ข้อความไทย ~11 ตัวอักษร/วินาที (SCRIPT_CHECKER)
- ข้อ 18 ข้ามเส้น 180° ได้เฉพาะเมื่อตั้งใจและมีช็อตพาข้าม (กล้องเดินข้าม, ช็อตกลาง, insert)
- ข้อ 19 เลือกเครื่องมือที่ควบคุมได้ก่อน (HTML/rig/2.5D) แล้วค่อย AI; ทุกการ gen ที่ใช้โควตา → ถามก่อน
- ห้ามใช้ทุกช็อตเหมือนกัน: ขนาดช็อตต้องเปลี่ยนตามจังหวะอารมณ์ ไม่ใช่สลับแบบสุ่ม

## ผลลัพธ์
กรอกใน `templates/SCENE_DECISION.json` (หนึ่งไฟล์ต่อฉาก) หรือ shot list ตาม `templates/SHOT_LIST_TEMPLATE.md`
แล้วตรวจด้วย `python .claude/skills/film-director/tools/check_scene.py <file.json>` — มันบอกช่องที่ว่าง,
ช่องที่ไม่มีเหตุผล และค่าที่ไม่อยู่ใน library
