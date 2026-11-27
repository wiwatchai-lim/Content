# FD23 — Character & Scene Consistency (ความต่อเนื่องของตัวละครและฉาก ในงานภาพ/วิดีโอ AI)

> ระบบ continuity ระดับซีรีส์ (schema, pre-episode check, change blindness, situation model) อยู่ที่
> `creative-intelligence/knowledge/continuity/README.md` + `CONTINUITY_SYSTEM.md` — **อ่านก่อน ไม่เขียนซ้ำ**
> กฎ 180°/eyeline/screen direction: `story-clips/_craft/GUIDE.md`; หน้าตาตัวละคร: `.claude/skills/ai-visual-artist/CHARACTER_BIBLE_TEMPLATE.md`;
> ตัวอย่างตัวละครจริงของสตูดิโอ: `characters/aaron/` (reference sheet + 2 scene refs)
> โมดูลนี้เพิ่ม: **กลไกของแต่ละวิธีคุมตัวตนในโมเดล**, การต่อช็อตวิดีโอ (first/last-frame chaining), และ protocol ปฏิบัติ
> → `libraries/CHARACTER_CONSISTENCY_PROTOCOL.md`, `libraries/SCENE_CONTINUITY_PROTOCOL.md`

## 1. นิยามและหลักการพื้นฐาน
- **Character consistency** = ตัวละครถูกจำได้ว่าเป็นคนเดิมทุกช็อต: identity markers (รูปหน้า ทรงผม แว่น ไฝ สัดส่วน), wardrobe, palette, สไตล์เส้น
- **Scene continuity** = เวลา แสง ทิศทาง (screen direction) ตำแหน่งของ props สภาพอากาศ เสียงบรรยากาศ ต่อกันได้ข้ามคัท
- **Temporal consistency (ในคลิปเดียว)** = ไม่ morph/flicker ระหว่างเฟรม — VBench แยกเป็น subject_consistency, background_consistency, temporal_flickering [EVIDENCE: VBenchRepo]
- คลาสเครื่องมือคุมตัวตน (เรียงจากเบาไปหนัก):
  | วิธี | กลไก | ต้องเทรน? | สถานะในสตูดิโอ |
  |---|---|---|---|
  | Locked descriptor (ข้อความเดิมทุกช็อต) | text conditioning เหมือนเดิม | ไม่ | ใช้ได้ทุกเครื่องมือ |
  | Seed lock | noise เริ่มเดิม | ไม่ | ช่วยเปรียบเทียบ ไม่ใช่รับประกัน (Veo บอกเอง) |
  | Reference image / image prompt | IP-Adapter: decoupled cross-attention รับภาพเป็น prompt บนโมเดล frozen [EVIDENCE: IPAdapter2023]; Veo `referenceImages` ≤3 [EVIDENCE: VeoGeminiDocs] | ไม่ | Codex `-i` ref sheet (Aaron) — ใช้จริง |
  | Image-to-video จากภาพที่คุมแล้ว | เฟรมแรกล็อกหน้าตา | ไม่ | Wan, Kling |
  | First/last frame chaining | บังคับปลายทาง/ต่อช็อต | ไม่ | Kling/Luma/Hailuo/Veo; Wan 14B FLF (ไม่ใช่ 5B ของเรา) |
  | Batch consistent attention | StoryDiffusion: Consistent Self-Attention แบบไม่ต้องเทรน [EVIDENCE: StoryDiffusion2024] | ไม่ | ยังไม่ได้ติดตั้ง |
  | Fine-tune (DreamBooth / LoRA) | ผูก identifier กับ subject + prior preservation [EVIDENCE: DreamBooth2022] | ใช่ | ยังไม่ทำ (ต้องเทรน) |
  | Native multi-shot | Seedance อ้างว่าคุม subject ข้ามช็อตในการ gen เดียว [EVIDENCE: Seedance2025] | ไม่ | ไม่มีบริการ |

## 2. ทฤษฎีและหลักการขั้นสูง
- **ทำไมเพี้ยน:** โมเดลทุกตัว sample ใหม่ทุกครั้ง; รายละเอียดที่ไม่ระบุจะถูกแต่ง และ "เปลี่ยนคำนิดเดียว ตัวตน/ท่าเปลี่ยน" [EVIDENCE: Sora2Cookbook] → ความต่อเนื่องเป็น **ระบบ** (ref + คำเดิม + ตรวจ) ไม่ใช่พารามิเตอร์เดียว
- **Drift ตามเวลา:** I2V ตรงที่เฟรมแรก ยิ่งไกลยิ่งเพี้ยน → คลิปสั้น + ต่อหลายช็อต (Sora cookbook แนะนำ 2×4 s ดีกว่า 8 s) [EVIDENCE: Sora2Cookbook] [CRAFT: curriculum 10]
- **Chaining สองแบบ:**
  1. *Last-frame handoff* — ดึงเฟรมสุดท้ายช็อต A (`ffmpeg -sseof -0.05 -i A.mp4 -frames:v 1 -update 1 A_last.png`) เป็นเฟรมแรกช็อต B → ต่อเนื่องแบบ "continuous take" แต่ error สะสม (สีเลื่อน, หน้าเพี้ยนต่อเนื่อง) [CRAFT]
  2. *Anchor keyframes* — gen keyframe ทุกช็อตจาก ref sheet เดียวกันก่อน (ภาพนิ่ง ตรวจง่าย) แล้วค่อย animate แต่ละช็อตจาก keyframe ของมัน; ใช้ first+last frame เมื่อต้องการบังคับท่าจบ → error ไม่สะสม [CRAFT; สอดคล้องกับแนวคิด StoryDiffusion ที่สร้างชุดภาพให้คงก่อนแล้วจึงทำ motion]
  - Luma ทำ chaining ในตัว: `frame0` = generation id ก่อนหน้า (extend) [EVIDENCE: LumaDocsRay2]; Veo extend +7 s จาก "the final second" ของคลิปก่อน และเสียงพูดต่อไม่ดีถ้าวินาทีสุดท้ายไม่มีเสียงพูด [EVIDENCE: VeoGeminiDocs]
- **Palette lock:** Sora cookbook แนะนำระบุสี 3–5 สีเพื่อคุม look ข้ามช็อต [EVIDENCE: Sora2Cookbook]; เกรดสีรวมตอนตัดต่อ (curriculum 11)
- **ลำดับความสำคัญจากวิทยาศาสตร์การรับรู้:** คนดูพลาดการเปลี่ยนแปลงที่ไม่เปลี่ยนความหมาย (change blindness) แต่ติดตามตัวตน/เป้าหมาย/สถานที่/เวลา (situation model) → ทุ่มเวลาที่หน้า มือ สินค้า ไม่ใช่ฉากหลังไกล [EVIDENCE: ดู continuity/README §1, §4]

## 3. เหตุผลที่ใช้
- ซีรีส์ (eyesight, night-optic, zombie, Mint & Tao, Aaron) อยู่ได้ด้วยการจำตัวละครได้; ตัวละครเพี้ยน = critical failure ใน `creative-critic` STUDIO_RULES
- สินค้า (แว่น) เพี้ยน = ข้อมูลเท็จเรื่องสินค้า

## 4. ผลต่ออารมณ์และการรับรู้
- ตัวตนที่คงที่ทำให้คนดูผูกพันและตามเรื่องได้; การเปลี่ยนหน้าตากลางเรื่องอ่านเป็น "คนอื่น" และทำลายความเชื่อ [CRAFT + situation model]
- screen direction กลับด้านโดยไม่มีเหตุ ทำให้คนดูสับสนทิศทาง/ความสัมพันธ์ (GUIDE.md) [CRAFT]

## 5. ใช้เมื่อไร
- ทุกงานที่มีตัวละครหรือสินค้าปรากฏ ≥2 ช็อต; ทุกตอนของซีรีส์ (pre-episode check ใน CONTINUITY_SYSTEM §4)
- Reference images: เมื่อเครื่องมือรองรับ (Codex `-i`, Veo refs) — แนบ master ref ทุกครั้ง
- Chaining: ฉาก continuous action (เดินต่อเนื่อง, กล้องตามต่อ)

## 6. ไม่ควรใช้เมื่อไร
- Last-frame handoff เกิน ~3 ช็อตติดกัน (error สะสม) — กลับไป anchor keyframe [CRAFT]
- ล็อกทุกอย่างจนภาพแข็ง: งานที่ตั้งใจให้ตัวละคร "เปลี่ยน" (อารมณ์ เวลาผ่าน) ต้องบันทึก `state_changes` แทนการบังคับเหมือนเดิม
- อย่าใช้ seed เป็นเครื่องมือคุมตัวตนข้ามโมเดล/ข้ามขนาดภาพ — seed มีความหมายเฉพาะชุดค่าเดิม

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- งานทดลอง continuity error ในฉากกินข้าว (Levin & Simons 1997) และการเปลี่ยนตัวนักแสดงข้ามคัท — อ้างผ่าน `creative-intelligence/knowledge/continuity/README.md` §1 (sources: Smith2012, SimonsLevin1998 ในไฟล์ sources ของ continuity)
- ตัวอย่างหนัง AI ที่คุมตัวละครสำเร็จ: ไม่มีแหล่งที่เปิดอ่าน → ไม่ใส่

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip:** character record ใน memory (`memory.py recall --type character --tags <series>`) + continuity.json; rig.js ตัวละคร SVG คงที่โดยธรรมชาติ — AI ใช้เฉพาะฉากหลัง
- **Product/promo:** แว่น = asset จริง (cutout + lens layer) ไม่ใช่ gen; ถ้าต้อง gen ให้แนบรูปจริง (Codex `-i`) และตรวจรูปทรง/สี/โลโก้ทุกช็อต
- **Reels:** หลายช็อตจากหลายโมเดล → เกรดสีเดียว, grain เดียว, ขนาดตัวอักษรเดียว
- **Explainer:** ไอคอน/ตัวละครอธิบายใช้ไฟล์ SVG เดียวกันตลอด
- **Cartoon (Aaron):** แนบ `characters/aaron/aaron-reference-sheet.png` ทุกครั้ง; ใส่ markers เป็นคำ: "big round head, messy spiky black hair with bangs, black rectangular glasses, small black oval eyes, small mole on the left cheek (viewer's left), thick black outlines, flat colours, ~2.5 heads tall"; wardrobe ตามฉาก (turtleneck บน sheet, navy polo + name badge ในฉากห้องไม้)
- **Documentary/talking head:** ฟุตเทจจริง — continuity = แสง/ไมค์/ตำแหน่งเดิมระหว่างเทค

## 9. AI image prompt examples
1. (Codex + `-i aaron-reference-sheet.png`) `Use the attached character sheet as the exact design reference. Aaron, same face, hair, black rectangular glasses and mole on the left cheek (viewer's left), wearing a navy polo with a small name badge and dark grey trousers, standing in a warm wooden room, hand on chin, thinking. Flat colours, thick black outlines, chibi proportions about 2.5 heads tall. Vertical 9:16, no text.`
2. (keyframe ชุด, palette lock) `Same character and same room as the reference image. Palette: warm oak brown, cream, navy, soft amber lamp light, charcoal outlines. Morning light from the window on the left. Aaron sits at the desk facing screen right.`

## 10. AI video prompt examples
- **I2V จาก keyframe (Wan/Kling):** `Static camera. Aaron slowly lowers his hand from his chin and looks toward screen right, a small smile. His glasses, hair and polo keep exactly the same design. Warm window light stays constant.`
- **First+last frame (Kling 1080p / Hailuo FL2V):** `The same boy walks from the doorway to the desk at a steady pace, facing screen right the whole time; camera tracks alongside at eye level; lighting and room unchanged.`
- **Veo reference images (ถ้ามีบริการ, 8 s):** แนบ ref ตัวละคร + ref สินค้า แล้ว `The boy from the reference picks up the eyeglasses from the reference and puts them on, medium close-up, eye level, warm afternoon light.`

## 11. Shot list example (ฉาก Aaron 3 ช็อต, anchor-keyframe method)
| # | Keyframe (Codex/FLUX + ref sheet) | Motion | Screen direction | Continuity notes |
|---|---|---|---|---|
| 1 | Aaron ยืน คิด (มีอยู่แล้ว: `aaron-scene-polo-standing-thinking.png`) | Wan: static, หายใจ/กระพริบตา | หันซ้ายจอ | polo navy, badge, มือในกระเป๋า |
| 2 | Aaron หันขวา ยิ้ม | Kling I2V: หันหน้า | หันขวาจอ (มีแรงจูงใจ: ได้ยินเสียง) | badge ด้านเดียวกับช็อต 1 |
| 3 | CU แว่น + ไฝ | 2.5D push in | — | ไฝแก้มซ้าย (ซ้ายของคนดู) |

## 12. ข้อผิดพลาดที่พบบ่อย
- เขียนคำบรรยายตัวละครไม่เหมือนกันทุกช็อต ("black glasses" / "dark specs") [Sora2Cookbook: keep phrasing consistent]
- ไฝ/ปาน/ข้างของ badge สลับซ้ายขวาเพราะโมเดล mirror ภาพ — ต้องระบุ "viewer's left"
- ใช้ last-frame handoff ต่อกันยาวจนหน้าเพี้ยนสะสม
- gen แต่ละช็อตคนละโมเดลแล้วไม่เกรดสีรวม
- เชื่อ seed ข้ามความละเอียด/โมเดล
- ไม่บันทึกสูตร (tool, model, seed, size, prompt, refs) ทำให้ทำซ้ำไม่ได้ (CONTINUITY_SYSTEM §0.5)

## 13. วิธีตรวจและแก้
- ตรวจด้วยตาแบบ checklist identity markers ทีละข้อ ทุกช็อต (CHARACTER_CONSISTENCY_PROTOCOL §4)
- Contact sheet ข้ามช็อต: `ffmpeg -i edit.mp4 -vf "select='gt(scene,0.3)',scale=320:-1,tile=4x3" -frames:v 1 -fps_mode vfr shots.png` → ดูทุกคัทในภาพเดียว
- ภายในช็อต: sample 2 fps (`fps=2,tile=6x4`) หา morph
- แก้: (1) ตัดให้สั้นลง (2) gen keyframe ใหม่จาก ref (3) ปิด/ซ่อนด้วยคัทกลาง action (4) composite asset จริงทับ
- ตัวตนผิด = critical (creative-critic) → แก้ก่อนส่งเสมอ

## 14. แบบฝึกหัด + test case
- **Test A (3 วิธีคุมตัวตน):** ฉากเดียว "Aaron เปิดประตู" 3 เวอร์ชัน: (1) text descriptor อย่างเดียว (2) Codex `-i` ref sheet (3) ภาพจาก (2) → Wan I2V. ให้คะแนน markers 7 ข้อ (หัว ผม แว่น ตา ไฝ เส้น สัดส่วน) ต่อเวอร์ชัน (ถามโควตา Codex ก่อน)
- **Test B (chaining):** 3 ช็อตต่อกันแบบ last-frame handoff vs anchor keyframes → นับ markers ที่หลุดในช็อต 3
- **Test C (mirror):** ขอภาพ Aaron หันขวา 4 seed → นับว่าไฝย้ายข้างกี่ครั้งเมื่อระบุ/ไม่ระบุ "viewer's left"
- บันทึกผลใน `story-clips/_craft/LEARNING-LOG.md` และ memory (`memory.py add --type error` ถ้าเจอแพทเทิร์น)

## 15. แหล่งอ้างอิง
IPAdapter2023 · DreamBooth2022 · StoryDiffusion2024 · Seedance2025 · VeoGeminiDocs · LumaDocsRay2 · Sora2Cookbook · KlingAPI26 · KlingMotionBrush · ComfyWan22 · VBenchRepo
ภายใน: `creative-intelligence/knowledge/continuity/` (README, CONTINUITY_SYSTEM.md, continuity.schema.json, sources.json), `characters/aaron/README.md`, `story-clips/_craft/GUIDE.md`, `.claude/skills/ai-visual-artist/CHARACTER_BIBLE_TEMPLATE.md`
