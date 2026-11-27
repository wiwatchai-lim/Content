# Character Consistency Protocol (ตัวละครเดิมทุกช็อต ทุกตอน)

ใช้กับทุกงานที่ตัวละคร (หรือสินค้า) ปรากฏ ≥2 ช็อต เหตุผลและหลักฐาน: `modules/23-consistency.md`
ระบบระดับซีรีส์ (continuity.json, pre-episode check): `creative-intelligence/knowledge/continuity/CONTINUITY_SYSTEM.md` — protocol นี้คือ "ขั้นภาพ" ของระบบนั้น
Character bible: `.claude/skills/ai-visual-artist/CHARACTER_BIBLE_TEMPLATE.md`; ตัวละครใหม่ → `characters/<name>/`

## 1. Master pack (ทำครั้งเดียวต่อตัวละคร)
| ไฟล์ | เนื้อหา | ตัวอย่างที่มีแล้ว |
|---|---|---|
| `characters/<name>/<name>-reference-sheet.png` | turnaround หน้า/ข้าง/หลัง + expressions + poses, พื้นเรียบ | `characters/aaron/aaron-reference-sheet.png` |
| `characters/<name>/README.md` | identity markers (5–8 ข้อ, สังเกตได้), wardrobe ต่อฉาก, palette hex, สัดส่วน, สไตล์เส้น, สิ่งที่ห้ามเปลี่ยน | `characters/aaron/README.md` |
| scene refs | ตัวละครในฉากจริง 1–3 ภาพ (แสงฉาก) | `aaron-scene-polo-*.png` |
| memory record | `memory.py add --type character` (series tag) | ตาม memory README |

**Identity markers เขียนเป็นคำเดียวกันทุกครั้ง** (copy-paste ไม่พิมพ์ใหม่) — เปลี่ยนคำนิดเดียวตัวตนเปลี่ยนได้ [Sora2Cookbook]
ระบุซ้าย/ขวาเป็น "viewer's left/right" เสมอ (โมเดล mirror ได้)

## 2. ลำดับวิธีคุม (เลือกบนสุดที่เครื่องมือรองรับ)
1. **Asset จริง** (rig.js SVG, cutout สินค้าจริง) — คงที่ 100%
2. **Reference image conditioning** — Codex `-i <ref sheet>` (ถามโควตา), Veo `referenceImages` ≤3 (8 s), Runway References (ยังไม่ได้อ่านเอกสาร) [IPAdapter2023 อธิบายกลไก]
3. **Anchor keyframe → I2V** — gen keyframe ทุกช็อตจาก ref ก่อน ตรวจผ่านแล้วค่อย animate (Wan/Kling/Hailuo)
4. **First+last frame** เมื่อท่าจบสำคัญ (Kling 1080p, Hailuo FL2V, Luma frame1)
5. **Locked descriptor + palette** (ทุกเครื่องมือ) — markers + 3–5 สี [Sora2Cookbook]
6. **Seed lock** — เฉพาะเปรียบเทียบในเครื่องมือ/ขนาดเดิม; ไม่รับประกัน [VeoGeminiDocs]
7. (อนาคต, ต้องเทรน/ติดตั้ง) LoRA/DreamBooth [DreamBooth2022], StoryDiffusion [StoryDiffusion2024] — ดูความเป็นไปได้ใน `knowledge/cartoon/AI_CARTOON_GENERATION.md`

## 3. ขั้นตอนต่อช็อต
1. เปิด README ตัวละคร → copy markers + wardrobe ของฉากนี้
2. Keyframe: prompt = markers + wardrobe + การกระทำ + ฉาก + palette; แนบ ref sheet (+ scene ref ถ้าฉากเดิม)
3. ตรวจ keyframe ด้วยตาราง §4 → ไม่ผ่านข้อใด gen ใหม่ (อย่าส่งต่อไป animate)
4. Animate: prompt เฉพาะการเคลื่อนไหว + "the same <name> throughout"; คลิปสั้น 2–4 s
5. ตรวจคลิป: contact sheet 2 fps (`ffmpeg -i shot.mp4 -vf fps=2,scale=270:-1,tile=6x4 -frames:v 1 sheet.png`) → markers ทุกเฟรมที่หน้าเห็นชัด
6. ตัดช่วงที่ผ่านเท่านั้น
7. บันทึกสูตร: tool, model, seed, size, steps, prompt file, refs (CONTINUITY_SYSTEM `generation`)

## 4. ตารางตรวจ (ต่อภาพ/ต่อช็อต)
| # | Check | ระดับถ้าผิด |
|---|---|---|
| 1 | รูปหน้า/หัว/สัดส่วน ตรง sheet | critical |
| 2 | ทรงผม + สีผม | critical |
| 3 | แว่น/อุปกรณ์ประจำตัว (ทรง สี) | critical |
| 4 | จุดเด่นเฉพาะ (ไฝ ปาน แผล) ข้างถูก (viewer's left/right) | major |
| 5 | Wardrobe ตรงฉาก (สี, badge ข้างเดิม) | major |
| 6 | สไตล์เส้น/การลงสี เดิม | major |
| 7 | Palette ตัวละคร (ผิว ผม เสื้อ) ไม่เลื่อน | minor (major ถ้าตัดชนกัน) |
| 8 | มือ/นิ้ว ถูกต้องเมื่อเห็นชัด | major |
| 9 | Expression ตรงเจตนาบท | minor |
critical/major = แก้ก่อนส่ง (ตรงกับ creative-critic: "character continuity break in a series" = critical)

## 5. ข้ามตอน
- ก่อนตอนใหม่: `memory.py recall --type character --tags <series>` + CONTINUITY_SYSTEM §4
- Look ใหม่ (เปลี่ยนชุด/ทรงผมตามเรื่อง) → เพิ่ม `looks[]` พร้อม master_ref ใหม่ และ `established_in` — อย่าเปลี่ยนเงียบ
- ห้ามเปลี่ยนสไตล์ภาพกลางซีรีส์ (appearance ผูกกับ style — AI_CARTOON_GENERATION อ้าง ConsiStory)

## 6. สินค้า (แว่น) = ตัวละครที่ห้ามเพี้ยน
- ใช้รูปจริงจาก frame-kit; AI ห้ามวาดแว่นใหม่ในช็อต hero (2.5D/cutout + lens layer)
- ถ้าต้อง gen: แนบรูปจริง + ตรวจ ทรง/สี/โลโก้/ขาแว่น/บานพับ ทุกเฟรม = critical
