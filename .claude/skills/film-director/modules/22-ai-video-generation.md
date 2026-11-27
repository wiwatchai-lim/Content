# FD22 — AI Video Generation (การสร้างวิดีโอด้วย AI: เลือกโมเดล คุมกล้อง คุมเฟรม)

> ต่อยอดจาก `story-clips/_craft/curriculum/10-ai-video.md` (ทฤษฎี diffusion, T2V/I2V/V2V, wan.py, ตาราง artifact) — ไม่เขียนซ้ำ
> โมดูลนี้เพิ่ม: **สิ่งที่เอกสารทางการแต่ละโมเดลบอกจริง ณ 2026-11-27**, ตารางเลือกเครื่องมือ, ไวยากรณ์ prompt แยกตามโมเดล
> ข้อมูลโมเดลเปลี่ยนเร็วมาก — ทุกบรรทัดมีวันที่และ source key; ตรวจซ้ำก่อนใช้จริงถ้าเกิน ~2 เดือน
> สิ่งที่เครื่องเรามีจริง: `creative-intelligence/CAPABILITY_MATRIX.json` (Wan 2.2 5B ในเครื่อง, FLUX schnell, Codex image, 2.5D depth, HyperFrames)

## 1. นิยามและหลักการพื้นฐาน
- **AI video generation** = โมเดล diffusion/flow (ส่วนใหญ่เป็น diffusion transformer) สร้างก้อน latent หลายเฟรมพร้อมกันจากข้อความ ภาพ หรือวิดีโอ [EVIDENCE: WanTeam2025, WanGitHub2025]
- โหมดที่เอกสารทางการรองรับ (2026-11):
  | โหมด | คำในเอกสาร | ใครรองรับ (ที่เปิดอ่านแล้ว) |
  |---|---|---|
  | Text-to-video | T2V | Wan 2.2 (A14B, 5B), Veo, Sora 2 (ปิดแล้ว), Hailuo, Seedance |
  | Image-to-video (ภาพ = เฟรมแรก) | `image`, `first_frame`, `input_reference`, `frame0` | ทุกตัว |
  | First + last frame | `lastFrame`, `last_frame`, `frame1`, FL2V, FLF2V | Veo 3.1, Kling 2.6 (ต้อง 1080p), Luma Ray 2, Hailuo FL2V, Wan 14B (ComfyUI) |
  | Reference images (หน้าตา/สินค้า) | `referenceImages` (≤3, type asset) | Veo 3.1 (ต้อง 8 s, ไม่มีใน Lite); Runway Gen-4 References (อ่านไม่ได้ 403) |
  | Extend / chain | extension, extend, generation-as-keyframe | Veo 3.1 (+7 s × ≤20), Luma (frame0 = generation), Sora 2 (เคยมี) |
  | Audio ในตัว | native audio | Veo 3.x (เปิดเสมอ), Kling 2.6 (`audio: native`, ห้ามคู่ last_frame), Sora 2 |
  | Speech/motion-driven | S2V, Animate | Wan 2.2 S2V-14B, Animate-14B |
- **หลักใหญ่ 3 ข้อที่เอกสารหลายเจ้าพูดตรงกัน** [EVIDENCE: RunwayGuide2026, Sora2Cookbook, MiniMaxI2V, KlingMotionBrush]
  1. หนึ่งช็อต = **หนึ่ง camera move + หนึ่ง subject action**
  2. เขียนสิ่งที่ "ต้องการเห็น" ไม่ใช่ "ไม่ต้องการ" (Runway; Google: ถ้าจะห้าม ให้ใส่รายการสิ่งที่ไม่เอาใน negative field โดยไม่ใช้คำว่า no) [EVIDENCE: VeoPromptGuideCloud]
  3. คลิปสั้นทำตามคำสั่งได้ดีกว่า — Sora cookbook แนะนำต่อ 2 คลิป 4 s ดีกว่า 1 คลิป 8 s

## 2. ทฤษฎีและหลักการขั้นสูง
- **MoE สองผู้เชี่ยวชาญ (Wan 2.2 A14B):** expert แรกจัด layout ตอน noise สูง expert หลังเติมรายละเอียด → อธิบายว่าทำไม "องค์ประกอบใหญ่" ถูกตัดสินตั้งแต่ step แรก ๆ: ถ้าโครงผิด เพิ่ม step ไม่ช่วย ต้องเปลี่ยนภาพเริ่ม/prompt [EVIDENCE: WanGitHub2025] [CRAFT: ข้อสรุปเชิงปฏิบัติ]
- **VAE บีบเวลา 4 เท่า** (Wan2.2-VAE 4×16×16) → จำนวนเฟรม 4n+1 และรายละเอียดเล็ก (บานพับ โลโก้) หายตอน decode [EVIDENCE: WanGitHub2025]
- **Prompt extension:** Wan แนะนำให้ LLM/VLM ขยาย prompt; Hailuo มี `prompt_optimizer` เปิดเป็นค่าเริ่ม — **ปิด** (`false`) เมื่อต้องการคุมเป๊ะ [EVIDENCE: WanGitHub2025, MiniMaxI2V]
- **Camera control 3 แบบ:**
  | แบบ | ตัวอย่าง | ความแม่น |
  |---|---|---|
  | ภาษาธรรมชาติใน prompt | Runway, Veo, Sora, Wan | ขึ้นกับโมเดล |
  | คำสั่งแยก/คำศัพท์ทางการ | Hailuo `[Push in]` 15 คำสั่ง (≤3 ต่อวงเล็บ = พร้อมกัน, คนละวงเล็บ = ต่อกัน); Luma `/camera_motion/list` + concepts (`dolly_zoom`) | Hailuo บอกเองว่า "explicit commands more accurate" |
  | UI/พารามิเตอร์ + brush | Kling Motion Brush ≤6 องค์ประกอบ + Static Brush | trajectory ที่เป็นไปไม่ได้ถูกตีความเป็นทางกล้อง |
- **First/last frame = บังคับปลายทาง** ใช้หมุนสินค้าระหว่างรูปจริงสองมุม; ComfyUI แนะนำ "เขียน prompt ให้ตรงกับทั้งสองเฟรม" [EVIDENCE: ComfyWan22]; ถ้าสองภาพต่างแสง/ฉาก โมเดล morph [CRAFT: curriculum 10]
- **Seed ไม่ใช่ determinism:** Veo บอกตรง ๆ ว่า seed "improves but does not guarantee" [EVIDENCE: VeoGeminiDocs]; Sora cookbook: prompt เดิมให้ผลต่างกันทุกครั้งเป็นเรื่องปกติ
- **ข้อจำกัดที่เอกสารยอมรับเอง:** Veo — ภาษาอังกฤษดีสุด, ไม่รองรับ reasoning ข้ามหลายวิดีโอ; Sora — รายละเอียดที่ไม่ระบุจะถูกแต่งเอง, เปลี่ยนคำนิดเดียวตัวตน/ท่าเปลี่ยน, ความละเอียดต่ำมี artifact, แนะนำ ≤2 ตัวละครต่อ generation [EVIDENCE: VeoGeminiDocs, Sora2Cookbook]
- **สถานะบริการ (ตรวจ 2026-11-27):** Veo 3.1 Preview ใน Gemini API **ปิด 22 ต.ค. 2026** (แนะนำ Gemini Omni Flash / Veo GA บน Enterprise); Sora 2 API ปิด 24 ก.ย. 2026 (curriculum 10) และ cookbook ถูก archive; Kling API 2.6 ไม่มี negative_prompt field แยก; Luma ชี้ไป Agents API

## 3. เหตุผลที่ใช้
- ได้การเคลื่อนไหวจริง (ผม ผ้า น้ำ แสง คน) ที่ 2.5D/HTML ทำไม่ได้ [CRAFT]
- ต้นทุน: Wan ในเครื่องฟรี (ช้า), Kling/Veo มีค่าใช้จ่าย → ใช้เฉพาะช็อตที่คุ้ม [CAPABILITY_MATRIX]
- ลดงานถ่ายจริงสำหรับ b-roll บรรยากาศ

## 4. ผลต่ออารมณ์และการรับรู้
- การเคลื่อนไหวเล็ก ๆ ในภาพนิ่ง (cinemagraph-like) ดึงสายตาโดยไม่ทำลายองค์ประกอบ [CRAFT]
- Artifact (morph, มือเพี้ยน, หน้าเปลี่ยน) ทำลายความเชื่อทันที — VBench-2.0 ยกให้ Human Fidelity/Physics/Commonsense เป็นมิติแยก เพราะภาพ "สวย" ยังผิดฟิสิกส์ได้ [EVIDENCE: VBench2_2025]
- แพลตฟอร์ม (TikTok/Meta) ติดป้าย AI กับวิดีโอสมจริง → กระทบการรับรู้ความจริงใจ ต้องเปิดป้ายเอง (curriculum 10 §4.5)

## 5. ใช้เมื่อไร
| ช็อต | เลือก | เหตุผล |
|---|---|---|
| สินค้าต้องตรง 100% | 2.5D / composite cutout จริง | ไม่มีการวาดใหม่ |
| สภาพแวดล้อมขยับ (ใบไม้ แสง ฝุ่น ทะเล) | Wan 2.2 5B I2V (`tools/wan.py`) | ฟรี, ไม่มีคน |
| คน/หน้า แสดงอารมณ์ | Kling 2.6 I2V หรือ Veo (ถ้ามีบริการ) | โมเดลใหญ่ทำหน้าดีกว่า (ถามโควตาก่อน) |
| หมุนสินค้าระหว่างสองรูปจริง | first+last frame (Kling 1080p / Hailuo FL2V / Luma) | บังคับปลายทาง |
| ตัวละครเดิมหลายช็อต | reference images (Veo ≤3) หรือ I2V จากภาพที่ gen ด้วย ref sheet | ดู FD23 |
| ต้องการเสียงพูดในตัว | Veo / Kling native audio | แต่ไทยไม่รับประกัน — ใช้ TTS ของเรา (ai-voice-director) |
| ตัวการ์ตูน rig ที่ lip-sync | `rig.js` (HTML) | แม่นและฟรีกว่า |

## 6. ไม่ควรใช้เมื่อไร
- ตัวหนังสือ ราคา โลโก้ ในเฟรม → HTML layer เสมอ (กฎบ้าน)
- ช็อตที่ต้องการให้สินค้าหมุน > ~45° จากรูปเดียว (โมเดลเดาด้านที่ไม่เห็น) [CRAFT: curriculum 10]
- ภาษาไทยพูดในตัวโมเดล (Veo: ภาษาอื่นนอกจากอังกฤษ "results vary") [EVIDENCE: VeoGeminiDocs]
- คลิปยาวรวดเดียว — สร้างทีละช็อตแล้วตัดต่อ
- เมื่อ 2.5D หรือ HTML ให้ผลเท่ากันโดยไม่เสี่ยง

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- งานวิจัย/เอกสารที่อ่านไม่ได้อ้างภาพยนตร์จริงที่ทำด้วยโมเดลเหล่านี้; ตัวอย่างในเอกสารเป็นคลิปสาธิต เช่น "Slow dolly forward through foggy forest", "Drone ascending from single red poppy" [EVIDENCE: RunwayGuide2026], "Extreme close-up: a single raindrop landing on a red rose petal" [EVIDENCE: VeoPromptGuideCloud]
- ตัวอย่างหนังเรื่องใดใช้ AI video → `[CRAFT, unverified example]` ยังไม่มีแหล่งที่เปิดอ่าน — ไม่ใส่

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip (ไทย, ตัวละคร):** ฉากหลังจาก FLUX/Codex → Wan ขยับบรรยากาศ 2–3 s; ตัวละครเป็น rig หรือ I2V จากภาพ ref (FD23); เสียงจาก TTS ไม่ใช่โมเดลวิดีโอ
- **Product/promo (แว่น):** แว่นจริง = 2.5D/cutout + lens layer; AI video เฉพาะ "รอบสินค้า"; การหมุน = first/last frame จากรูป kit
- **Reels/TikTok 9:16:** gen แนวตั้งตรง ๆ (Veo/Kling/Hailuo รองรับ 9:16; Wan 5B 704×1280 ทางการ, เราใช้ 480×848) แล้ว upscale; อย่า crop จาก 16:9 ถ้าหน้า/สินค้าจะหลุด safe zone
- **Explainer:** AI video เป็น b-roll ประกอบ; ข้อมูล/แผนภาพทำด้วย HTML
- **Cartoon:** ภาพสไตล์ flat/outline มักเพี้ยนน้อยกว่าเมื่อการเคลื่อนไหวน้อย; ใส่สไตล์ไว้ต้น prompt (Sora: style first) [EVIDENCE: Sora2Cookbook]
- **Documentary/talking head:** ห้ามใช้ AI สร้างคนจริงพูดแทน; ใช้เป็น b-roll ที่ติดป้าย AI เท่านั้น

## 9. AI image prompt examples (ภาพเริ่มต้นสำหรับ I2V — text-free)
1. `Vertical 9:16 photograph, black acetate round eyeglasses resting on a pale oak table by a window, soft morning side light from the left, shallow depth of field, calm cream and sage palette, empty space above for later titles, clean background.`
2. `Flat 2D cartoon background, small Thai optical shop at night, warm lamp light, deep blue shadows, thick clean outlines, no characters, wide establishing view, vertical 9:16.`
3. (end frame คู่กับข้อ 1) `Same eyeglasses, same table, same window light, viewed from a three-quarter right angle, identical background and colour palette.`

## 10. AI video prompt examples (ดูทั้งหมดใน `libraries/AI_VIDEO_PROMPT_LIBRARY.json`)
- **Wan I2V (motion-only):** `Locked-off static camera. The glasses stay rigid and still on the table. Sunlight shifts softly across the wood, a few dust motes drift in the light beam.`
- **Runway formula:** `Slow dolly forward. A quiet optical shop at dusk. The shopkeeper looks up from the counter and smiles. Warm tungsten light, gentle film grain.` [RunwayGuide2026]
- **Hailuo commands:** `[Push in] The woman slowly lifts her gaze to the camera and smiles softly, hair moving in a light breeze.` + `prompt_optimizer=false` [MiniMaxI2V]
- **Veo (audio):** `Medium close-up, eye level. An elderly man puts on new glasses and reads a letter, his eyes widening. Warm afternoon window light. Audio: paper rustle, a soft exhale, distant birdsong.` [VeoGeminiDocs]
- **Shot-list template (Sora cookbook, ใช้ได้ทุกโมเดล):** prose scene → `Cinematography: Camera shot / Mood` → `Actions:` 1–3 beats → `Dialogue:` สั้นตามความยาวคลิป

## 11. Shot list example (คลิปแว่น 12 s, 9:16)
| # | s | เนื้อหา | เครื่องมือ | Camera | Subject motion | เฟรมอ้างอิง |
|---|---|---|---|---|---|---|
| 1 | 0–2 | ร้านยามเช้า แสงลอดหน้าต่าง | Wan I2V จากภาพ FLUX | locked-off | ฝุ่นลอย แสงเลื่อน | bg_shop.png |
| 2 | 2–5 | แว่นบนโต๊ะ push in | 2.5D depth | push in 6% | ไม่มี | kit front.png |
| 3 | 5–8 | แว่นหมุนหน้า → ¾ | Kling first+last 1080p | orbit ขวา 45° | rigid | front.png / 34.png |
| 4 | 8–10 | นางแบบหันมายิ้ม | Kling I2V + Static Brush ที่แว่น | static | หันหน้า ยิ้ม | model_codex.png |
| 5 | 10–12 | โลโก้ + wordmark | HyperFrames | — | text animate | HTML |

## 12. ข้อผิดพลาดที่พบบ่อย
- ใช้ prompt ยาวบรรยายภาพซ้ำใน I2V (ภาพบอกฉากแล้ว) — เขียนแค่สิ่งที่ขยับ
- ใส่คำว่า "no camera shake / no people" ในโมเดลที่ไม่มี negative field → เรียกสิ่งนั้นออกมา [RunwayGuide2026]
- ลืมว่าฟีเจอร์ผูกกันในเอกสาร: Kling last_frame ต้อง 1080p และห้ามคู่ native audio; Veo reference images ต้อง 8 s; Hailuo 1080p ได้แค่ 6 s
- ใช้คำว่า "then / after that" หลายท่อนในช็อตเดียว [RunwayGuide2026]
- เชื่อว่า seed เดิม = ผลเดิม [VeoGeminiDocs]
- ใช้ชื่อโมเดล/endpoint จากความจำ — Veo 3.1 Preview และ Sora 2 ปิดไปแล้วในปี 2026
- ปล่อย `prompt_optimizer` เปิดแล้วงงว่าทำไมได้ของที่ไม่ได้สั่ง

## 13. วิธีตรวจและแก้
1. ก่อน gen: ตรวจตาราง §1 ว่าโมเดลรองรับโหมด/ความยาว/อัตราส่วนที่ต้องการ (เปิดเอกสารซ้ำถ้าข้อมูลเกิน 2 เดือน)
2. ทดสอบสั้น/ถูกก่อน (Wan `--seconds 2 --steps 8`; Hailuo 768P 6 s)
3. หลัง gen: sample เฟรม `ffmpeg -i clip.mp4 -vf fps=2,scale=270:-1,tile=6x4 sheet.png` แล้วตรวจตาม `libraries/VIDEO_QUALITY_CHECKLIST.md` (identity, มือ, สินค้า, ตัวหนังสือ, flicker)
4. ตัดใช้เฉพาะช่วงดี (ท้ายคลิปมักแย่สุด — curriculum 10)
5. แก้ทีละตัวแปร (Sora cookbook: "one controlled change per edit") แล้วบันทึกใน `_craft/LEARNING-LOG.md`
6. ไฟล์สุดท้าย: `python .claude/skills/film-director/tools/video_qc.py out.mp4 --preset reels_9x16`

## 14. แบบฝึกหัด + test case
- **Test A (ไวยากรณ์กล้อง):** ภาพเดียว 3 เวอร์ชันบน Wan seed เดียว: (1) ไม่ระบุกล้อง (2) "locked-off static camera" (3) "slow push in" → วัด: กล้องขยับเองไหมใน (1)? background parallax ต่างกันไหม? บันทึก dynamic degree ด้วยตา (0–2)
- **Test B (positive vs negative):** Wan `--negative` ค่าเริ่ม vs prompt ที่ไม่มีคำปฏิเสธ แต่เขียน "rigid glasses keep their exact shape" → นับเฟรมที่กรอบ warp (sample 2 fps)
- **Test C (ความยาว):** 2 s × 2 ต่อกัน vs 4 s รวด (เท่าที่ VRAM ไหว) → เทียบ identity drift ช่วงท้าย (ข้อเสนอของ Sora cookbook — ยังไม่ทดสอบในเครื่องเรา: `test_status: untested`)
- ผ่านเมื่อ: เขียนผลลง LEARNING-LOG พร้อม seed/prompt/เวลา และสรุปว่าข้อแนะนำไหนจริงกับ Wan 5B GGUF

## 15. แหล่งอ้างอิง (`sources/ai-quality.json`)
WanGitHub2025 · WanTeam2025 · ComfyWan22 · RunwayGuide2026 · RunwayGen4Help (403, ยังไม่อ่าน) · VeoGeminiDocs · VeoPromptGuideCloud · LumaDocsRay2 · Sora2Cookbook · KlingAPI26 · KlingMotionBrush · MiniMaxI2V · Seedance2025 · VBench2_2025
ภายใน: `story-clips/_craft/curriculum/10-ai-video.md`, `creative-intelligence/CAPABILITY_MATRIX.json`, `tools/wan.py`, `tools/flux.py`, `tools/depth.py`
