# บทที่ 9 — AI Image Prompt Engineering (การเขียน prompt สร้างภาพด้วย AI)

> เป้าหมาย: เข้าใจว่าโมเดลภาพ "อ่าน" prompt อย่างไร จนเขียน prompt เป็นโครงสร้างที่ทำซ้ำได้ คุมตัวแปร (seed, steps, guidance, denoise) ได้ทีละตัว และได้ภาพแว่นที่ตรงสินค้าจริง ไม่มีร่องรอย AI และติดป้าย AI ถูกต้อง
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — โมเดลอ่าน prompt อย่างไร
โมเดลภาพ (diffusion / flow matching) ไม่ได้ "เข้าใจ" ประโยคแบบคน มันทำ 3 ขั้น:

| ขั้น | เกิดอะไรขึ้น | ผลต่อการเขียน prompt |
|---|---|---|
| **1. Text encoder** | ตัดข้อความเป็น token แล้วแปลงเป็นเวกเตอร์ความหมาย | encoder แต่ละแบบ "อ่านเก่ง" ต่างกัน (ดูตารางล่าง) |
| **2. Denoising / flow** | เริ่มจาก noise (หรือจากภาพต้นฉบับใน img2img) แล้วค่อย ๆ ปั้นภาพทีละ step โดยมีเวกเตอร์ข้อความเป็นแรงดึง | step แรก ๆ กำหนด **องค์ประกอบใหญ่** step หลังเติม **รายละเอียด** |
| **3. VAE decode** | แปลงภาพจาก latent (ภาพย่อ) กลับเป็นพิกเซล | รายละเอียดเล็กมาก (ตัวหนังสือ, บานพับแว่น, นิ้ว) จึงพังง่าย |

**Text encoder สองตระกูลที่ต้องรู้จัก**
| Encoder | ใช้ในโมเดล | นิสัย |
|---|---|---|
| **CLIP** (เช่น CLIP-L) | SD 1.5, SDXL, และเป็นตัวช่วยใน FLUX | เรียนจากคู่ภาพ-แคปชันสั้น ๆ บนเว็บ → ชอบ **คำ/แท็กสั้น** ("portrait, bokeh, 85mm") จำกัด 77 token ส่วนที่เกินถูกตัดทิ้ง |
| **T5** (T5-XXL) | FLUX, SD3 | เป็นโมเดลภาษาเต็มตัว → เข้าใจ **ประโยคธรรมชาติ** ความสัมพันธ์ ("แว่นวางอยู่ **ทางซ้าย** ของถ้วยกาแฟ") และจำนวน ได้ดีกว่ามาก |
| **LLM ทั้งตัว** | GPT image (ChatGPT/Codex) | อ่านคำสั่งแบบสนทนา รับรูปอ้างอิงหลายรูป และ "คิด" ก่อนวาด → เขียนเป็นย่อหน้าบรีฟได้เลย |

`tools/flux.py` ใช้ **T5-XXL + CLIP-L คู่กัน** (`DualCLIPLoaderGGUF type=flux`) จึงควรเขียนเป็นประโยคธรรมชาติ ไม่ใช่กองแท็ก

### 1.2 Prompt anatomy — 9 ช่อง
เขียนเรียงจากสำคัญมากไปน้อย เพราะโมเดลให้น้ำหนักกับสิ่งที่มาก่อนมากกว่า (คู่มือ BFL แนะนำลำดับ subject → action → style → context ด้วยเหตุผลเดียวกัน)

| # | ช่อง | ตัวอย่าง |
|---|---|---|
| 1 | **Subject** — อะไร หน้าตาแบบไหน | `round tortoiseshell acetate eyeglasses with thin gold temples` |
| 2 | **Action / state** | `resting folded on an open book` |
| 3 | **Setting** | `on a teak desk in a quiet Hua Hin beach café` |
| 4 | **Composition** | `low three-quarter angle, subject in the left third, lots of empty space on the right` |
| 5 | **Camera** | `100mm macro, f/8` (บทที่ 1–2) |
| 6 | **Light** | `soft morning window light from the right, 5200K` (บทที่ 4) |
| 7 | **Style / medium** | `editorial product photography` / `graphite pencil drawing` |
| 8 | **Mood / color** | `calm, warm cream and sage palette` |
| 9 | **Constraints** | `the frame shape exactly as in the reference, empty clean background` |

ช่อง 4 ที่ทีมเราใช้บ่อยที่สุดคือ **"พื้นที่ว่างสำหรับตัวหนังสือ"** เพราะภาพทุกใบต้องไม่มีตัวหนังสือ (ข้อความอยู่ในเลเยอร์ HTML)

### 1.3 ขั้นสูง
- **Natural language vs tag style:**
  - FLUX / SD3 / GPT image → ประโยคเต็ม เขียนเหมือนบรีฟช่างภาพ
  - SD 1.5 / SDXL (CLIP ล้วน) → แท็กคั่นด้วยจุลภาค + negative prompt ได้ผลดีกว่า
  - Midjourney → ประโยคสั้นกระชับ + พารามิเตอร์ `--ar`, `--no`, `--raw`
- **Token weight** `(word:1.3)` เป็นไวยากรณ์ของ ComfyUI/A1111 ที่ออกแบบมากับ CLIP ใน SD; กับ FLUX (T5) ผลอ่อนและคาดเดายาก วิธีที่ได้ผลกว่าคือ **ย้ายคำขึ้นต้นประโยค + บรรยายให้ละเอียดขึ้น**
- **ความยาว prompt:** CLIP อ่านแค่ 77 token; T5 อ่านยาวกว่ามาก แต่ไม่ใช่ไม่จำกัด ประโยคท้าย ๆ ของ prompt ยาวเกินไปมักถูกละเลย → เก็บสิ่งสำคัญไว้ 2 ประโยคแรก
- **Negative prompt ทำงานผ่าน CFG:** โมเดลคำนวณ 2 ครั้ง (มี prompt / ไม่มีหรือใช้ negative) แล้วดันผลออกจากฝั่ง negative ด้วยสูตร `uncond + CFG × (cond − uncond)` ถ้า **CFG = 1** สูตรนี้เหลือแค่ `cond` → negative prompt **ไม่มีผลเลย**
  - FLUX schnell/dev เป็นโมเดล **guidance-distilled** รัน CFG 1 → ไม่รองรับ negative prompt (BFL ยืนยันใน docs) และ `flux.py` ส่ง `ConditioningZeroOut` เป็นฝั่ง negative + `cfg 1.0`
  - คำว่า "no text, no people" ใน prompt บวกก็มักถูกละเลยหรือกลับดึงสิ่งนั้นเข้ามา เพราะโมเดลเห็นคำว่า "text/people" → **เขียนเชิงบวกแทน** เช่น `an empty promenade`, `blank clean wall`
  - GPT image อ่านคำสั่งแบบภาษาได้ จึงรับ "ห้าม…" ได้ดีกว่า แต่ยังควรเขียนเชิงบวกเป็นหลัก
- **Seed / steps / guidance:**
  - **Seed** = ลายของ noise ตั้งต้น seed เดิม + prompt เดิม + ค่าเดิม = ภาพเดิม → เป็นเครื่องมือทดลองที่สำคัญที่สุด
  - **Steps** = จำนวนรอบปั้นภาพ; schnell ถูก distill ให้ได้ภาพใน **1–4 step** ใส่มากกว่านี้ไม่ช่วยและอาจเลอะ; SDXL/dev ใช้ 20–50
  - **Guidance / CFG** = แรงดึงเข้าหา prompt สูง = ตรงคำแต่สีจัด/แข็ง/พลาสติก, ต่ำ = สวยเป็นธรรมชาติแต่หลุดคำ (diffusers ตั้ง SD img2img ไว้ 7.5) FLUX dev ใช้ "distilled guidance" แยกต่างหาก (~3.5) ส่วน schnell ไม่มีให้ปรับ
- **img2img strength (= `denoise`):** ใส่ noise ลงในภาพต้นฉบับกี่ส่วนแล้วปั้นใหม่ 0.2 = แทบเหมือนเดิม, 0.6 = เค้าโครงเดิมแต่วาดใหม่, 0.9 = เหลือแค่สีโดยรวม **แสงและโทนของต้นฉบับติดมาด้วยเสมอ** (กลางคืนแปลงเป็นกลางวันไม่ได้)
- **Inpainting / outpainting:** วาดใหม่เฉพาะส่วนที่ระบายมาสก์ (ลบลายน้ำปลอม, แก้นิ้ว) / ขยายผืนภาพออกด้านข้าง (ทำภาพ 1:1 เป็น 9:16) — prompt ของ inpaint ควรบรรยาย **สิ่งที่จะอยู่ในมาสก์** ไม่ใช่ทั้งภาพ
- **Reference & consistency:**
  - **IP-Adapter** (SD/SDXL/FLUX ผ่าน custom node) = ป้อนภาพเป็น "prompt ภาพ" ดึงสไตล์หรือหน้าตา
  - **FLUX Kontext** = โมเดลแก้ภาพด้วยคำสั่ง ("change the background to a beach, keep the glasses and face identical") คงตัวละครได้ข้ามหลายรอบ แต่ BFL เองแสดงว่าราว 6 รอบขึ้นไปภาพเริ่มเสื่อม → แก้จากภาพ master ไม่ใช่ต่อจากภาพที่แก้แล้ว
  - **GPT image** รับรูปอ้างอิงได้หลายรูป (คู่มือ OpenAI: สูงสุด 16) ให้ **ตั้งชื่อแต่ละรูปตามลำดับและบอกหน้าที่** ("Image 1 = the real frame, keep its shape and color exactly; Image 2 = lighting/style reference only") และมี `input_fidelity: high` ใน API สำหรับรักษาหน้า/รายละเอียด
- **LoRA:** ไฟล์ปรับน้ำหนักเล็ก ๆ (10–300 MB) ที่ "สอนเพิ่ม" สไตล์ ตัวละคร หรือสินค้าหนึ่งชิ้นจาก 15–40 ภาพ ใช้ร่วมกับโมเดลหลักรุ่นเดียวกันเท่านั้น (LoRA ของ SDXL ใช้กับ FLUX ไม่ได้) มีค่า strength 0.6–1.0 และมักมี **trigger word** ที่ต้องใส่ใน prompt
- **Text rendering:** GPT image และ FLUX รุ่นใหญ่เขียนตัวอักษรอังกฤษได้ค่อนข้างดี; schnell Q4 เขียนผิดบ่อยและ **ภาษาไทยพังทุกโมเดล** → นโยบายเรา: ภาพไม่มีตัวหนังสือ ข้อความทั้งหมดอยู่ใน HTML

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Diffusion / flow matching | กระบวนการปั้นภาพจาก noise ทีละ step (FLUX ใช้ rectified flow) |
| Latent / VAE | ภาพย่อที่โมเดลทำงานด้วย / ตัวแปลง latent ↔ พิกเซล |
| Text encoder (CLIP, T5) | ตัวแปลงข้อความเป็นเวกเตอร์ |
| Token | หน่วยย่อยของข้อความ (≈ คำหรือส่วนของคำ) |
| Prompt weight `(x:1.3)` | เพิ่มน้ำหนักคำ (ได้ผลกับ CLIP/SD มากกว่า FLUX) |
| Negative prompt | สิ่งที่ไม่ต้องการ ทำงานเฉพาะเมื่อ CFG > 1 |
| CFG / guidance scale | แรงดึงเข้าหา prompt |
| Guidance-distilled | โมเดลที่ฝึกให้ไม่ต้องใช้ CFG (FLUX schnell/dev) → ไม่มี negative |
| Seed | เลขตั้งต้นของ noise; ล็อกไว้เพื่อทดลองทีละตัวแปร |
| Steps / sampler / scheduler | จำนวนรอบ / วิธีเดิน (euler) / การแบ่งช่วง noise (simple) |
| txt2img / img2img | สร้างจากข้อความ / สร้างจากภาพตั้งต้น |
| Denoise / strength | สัดส่วนที่ปั้นใหม่ใน img2img (0–1) |
| Inpaint / outpaint / mask | วาดใหม่เฉพาะจุด / ขยายขอบภาพ / พื้นที่ที่อนุญาตให้แก้ |
| IP-Adapter | ใช้ภาพเป็น prompt (สไตล์/หน้า) |
| Kontext | โมเดล FLUX สำหรับแก้ภาพด้วยคำสั่ง คงตัวละคร |
| `input_fidelity` | ค่าใน OpenAI API ให้รักษารายละเอียดภาพอินพุต (หน้า, โลโก้) |
| LoRA / trigger word | ไฟล์เสริมสอนสไตล์/วัตถุ / คำที่เรียกใช้ LoRA |
| ControlNet | คุมโครงภาพด้วย edge/depth/pose (เกี่ยวกับบทที่ 3 และ 10) |
| AI tells | ร่องรอยที่ฟ้องว่าเป็น AI: มือ 6 นิ้ว, ผิวพลาสติก, ลายน้ำปลอม, ตัวอักษรมั่ว |
| C2PA / Content Credentials | metadata มาตรฐานบอกที่มาของภาพ แพลตฟอร์มใช้ติดป้าย AI อัตโนมัติ |

---

## 3. ตัวอย่างงานจริง (วิธีที่ใช้กันจริง)
| สถานการณ์ | เครื่องมือ + ค่าโดยประมาณ | เหตุผล |
|---|---|---|
| ฉากหลังว่างสำหรับคลิป/โพสต์ (ไม่มีคน ไม่มีแว่น) | `flux.py` txt2img · 1344×768 หรือ 768×1344 · 4 step · `--count 4` | ฟรี ได้ 4 seed เลือกใบดีที่สุด แล้ววางแว่น cutout จริงทับใน HTML |
| แว่นจริงอยู่ในฉาก (ต้องตรงสินค้า) | Codex + แนบภาพแว่นจริง `-i` (ถามผู้ใช้ก่อน เพราะใช้ quota) | GPT image ใช้รูปอ้างอิงคงรูปทรง/สีได้ดีกว่า FLUX txt2img มาก |
| ทำภาพ ChatGPT ให้เป็นสไตล์เดิมแบบฟรี | `flux.py --init ref.png --denoise 0.2` | สกิล `flux-like-chatgpt`: 0.2 เหมือนเกือบทั้งหมด, 0.35 เริ่มมีเส้นหยัก, 0.6+ หลุดจากต้นฉบับ |
| ฉากเดียวกันหลายมุม/หลายเวลา | prompt ย่อหน้า "สถานที่" ชุดเดียว + seed เดียว เปลี่ยนแค่ประโยคแสง | คงความต่อเนื่อง (STYLES.md §5) |
| ภาพมีลายเซ็น/ตัวหนังสือปลอมมุมขวาล่าง | inpaint (ComfyUI Mask Editor) หรือ `cv2.inpaint` บนสี่เหลี่ยมนั้น | FLUX txt2img ชอบเติมลายเซ็น และ "no text" ไม่ช่วย |
| ภาพ 1:1 ต้องการเป็น 9:16 | outpaint ขอบบน-ล่าง หรือ generate ใหม่ที่ 768×1344 | `flux.py --init` ใช้ crop กลาง (`crop: center`) ไม่ได้ขยายภาพ |
| ตัวละครเดิมหลายตอน | Codex แนบภาพตัวละคร master ทุกครั้ง / Kontext แก้จาก master | อย่าแก้ต่อจากภาพที่แก้แล้วหลายทอด ภาพจะเสื่อม |

สิ่งที่มืออาชีพทำจริงคือ **แยกงานให้ถูกเครื่องมือ**: AI ทำ "บรรยากาศ" ส่วนสิ่งที่ต้องตรงความจริง (สินค้า, โลโก้, ข้อความ, ราคา) ใช้ภาพจริงหรือเลเยอร์ HTML ทับ

---

## 4. นำไปใช้กับ AI Image / Video (เครื่องมือของเรา)
1. **`tools/flux.py` ทำอะไรได้บ้าง (อ่านจากโค้ดจริง):**
   ```
   python tools/flux.py "<prompt>" out.png [--size 1024x1024] [--steps 4] [--seed N] [--count N] [--init ref.png --denoise 0.6]
   ```
   - โมเดล: FLUX.1 schnell GGUF Q4 + T5-XXL Q5 + CLIP-L, sampler `euler`/`simple`, **cfg 1.0** ตายตัว → **ไม่มี negative prompt และไม่มีค่า guidance ให้ปรับ**
   - `--seed` ไม่ใส่ = สุ่ม แต่สคริปต์ **พิมพ์ seed ออกมาทุกครั้ง** ให้จดไว้ใน `kit.md`
   - `--count N` ใช้ seed, seed+1, … ได้ไฟล์ `out-1.png`, `out-2.png` … เหมาะกับการเลือกภาพ
   - `--steps` ค่าเดิม 4 คือจุดที่ schnell ถูกฝึกมา ไม่ต้องเพิ่ม
   - `--size` ใช้ค่าที่หาร 16 ลงตัว (1024×1024, 1344×768, 768×1344) RTX 3050 6 GB ใช้ราว 1–2 นาทีต่อภาพ 1024²
   - `--init` + `--denoise` = img2img ภาพอ้างอิงถูกย่อ/ครอปกลางให้ตรงกับ `--size` ก่อน → ใส่ภาพสัดส่วนเดียวกันมาเสมอ
   - **inpaint ไม่มีใน flux.py** ใช้ workflow mask ใน ComfyUI (`~/ComfyUI`, ตัวเดียวกัน) หรือ `cv2.inpaint` สำหรับลบลายเซ็นเล็ก ๆ
2. **เคล็ดลับ FLUX ของทีม** อยู่แล้วใน [`../STYLES.md` §5](../STYLES.md) (ขนาด, "empty scene with no people, no text", img2img คงแสงเดิม, ย่อหน้าสถานที่ซ้ำ, wide master) และ [`flux-like-chatgpt` SKILL](../../../.claude/skills/flux-like-chatgpt/SKILL.md) (ตาราง denoise) — อ่านที่นั่น ไม่ทำซ้ำในบทนี้ เพิ่มเติมเพียง: ถ้า "no text" ยังมีตัวหนังสือ ให้เปลี่ยนเป็นคำบวก `plain blank wall`, `unmarked surfaces` แล้วเปลี่ยน seed
3. **Codex / ChatGPT (GPT image) — ทุกครั้งต้องถามผู้ใช้ก่อน เพราะใช้ quota**
   - คำสั่งและข้อควรระวังอยู่ใน `data/models/README.md` และสกิล `frame-kit`; prompt สำเร็จรูปอยู่ใน `kits/*/kit.md`
   - แนบภาพแว่นจริงด้วย `-i` แล้วเขียนหน้าที่ของแต่ละรูป: `Image 1 is the exact product: keep frame shape, color, bridge and temple details identical. Do not redesign it.`
   - เขียนเป็นบรีฟย่อหน้าเดียวตาม 9 ช่อง และปิดท้ายด้วย `No text, letters, logos or watermarks anywhere in the image.` (GPT image อ่านประโยคปฏิเสธได้ดีกว่า FLUX)
   - ส่วนที่ต้องเหมือนต้นฉบับทุกพิกเซล (แว่น, โลโก้) → คู่มือ OpenAI แนะนำให้ **คอมโพสิตส่วนที่อนุมัติแล้วกลับลงภาพต้นฉบับ** ทีมเราทำแบบเดียวกัน: วางแว่น cutout จริงทับใน HTML
4. **ทดลองอย่างเป็นระบบ (change one variable):**
   - ล็อก seed → เปลี่ยนแค่ 1 ช่องของ prompt → generate → จดผลในตาราง (`seed | ช่องที่เปลี่ยน | ผล`)
   - เปลี่ยน seed เฉพาะตอนหาองค์ประกอบใหม่ เปลี่ยน prompt เฉพาะตอนหาสาระใหม่ อย่าเปลี่ยนสองอย่างพร้อมกัน
   - เก็บ prompt ที่ได้ผลไว้ใน `kit.md` หรือ `../LEARNING-LOG.md`
5. **กันร่องรอย AI (AI tells):**
   - มือ: ให้มืออยู่ในท่าง่าย (ถือขาแว่น, วางบนโต๊ะ) หรือตัดออกนอกเฟรม; ตรวจนับนิ้วทุกภาพ
   - ผิวพลาสติก: เลี่ยง "8k, masterpiece, flawless skin"; ใช้ `natural skin texture, visible pores, subtle film grain` (บทที่ 1)
   - ลายน้ำ/ลายเซ็นปลอม/ตัวอักษรมั่ว: ซูมตรวจ 4 มุม แล้ว inpaint
   - **แว่นโดยเฉพาะ:** ขาแว่นสองข้างไม่เท่ากัน, ขาแว่นทะลุหู/ผม, บานพับละลาย, เลนส์ไม่สะท้อนอะไรเลยหรือสะท้อนผิดทิศ, กรอบไม่สมมาตร, nose pad หายไป → ตรวจทุกข้อก่อนใช้
6. **Product-accurate eyewear:** AI ห้ามเป็นแหล่ง "ข้อมูลสินค้า" รูปทรง สี วัสดุ ต้องมาจากรูปจริงใน kit เสมอ ถ้า AI วาดแว่นเพี้ยน ให้ใช้ภาพ AI เป็นแค่ฉาก/นายแบบ แล้ววาง cutout จริง (มีเลเยอร์เลนส์) ทับ
7. **จริยธรรม, ลิขสิทธิ์, ป้าย AI:**
   - FLUX.1 schnell เป็น Apache-2.0 ใช้เชิงพาณิชย์ได้; (ระวัง FLUX.1 **dev** เป็นสัญญาอนุญาตแบบ non-commercial)
   - ห้ามใส่ชื่อช่างภาพ/ศิลปินที่ยังมีชีวิต หรือชื่อแบรนด์คู่แข่ง หรือหน้าคนจริงที่ไม่ได้ยินยอม ลงใน prompt
   - ห้ามทำภาพ "ก่อน/หลัง" หรือผลการรักษาสายตาที่สร้างด้วย AI แล้วนำเสนอเหมือนเป็นของจริง
   - Meta ติดป้าย "AI info" อัตโนมัติจาก metadata (C2PA) และ TikTok **บังคับให้ผู้สร้างติดป้าย** สำหรับภาพ/วิดีโอสมจริงที่สร้างด้วย AI → นโยบายทีม: เปิด AI label ทุกครั้งที่มีภาพ AI สมจริง (ตรงกับที่ทำกับ IG Reels อยู่แล้ว)

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ
1. **ฉากหลังว่างสำหรับวางแว่น (FLUX txt2img, 768×1344)**
   `A calm empty teak tabletop beside a large window in a quiet seaside café in the morning, soft diffused daylight from the right at about 5200K, a ceramic cup and a small potted plant far in the background softly out of focus, the lower two thirds of the frame clear and uncluttered, shot at eye level on a 50mm lens at f/2.8, warm cream and sage tones, plain blank walls, empty scene with no people.`
2. **img2img ทำภาพ ChatGPT ให้เป็นเวอร์ชันฟรี (FLUX `--init ref.png --denoise 0.2`)**
   `A detailed graphite pencil drawing with sepia tone on warm beige textured paper, soft smooth shading. An old optician in a cardigan cleans a pair of round glasses at his workbench while a young woman waits beside him. Quiet tender mood, fully shaded from edge to edge.`
3. **แว่นจริงในฉาก ไลฟ์สไตล์ (Codex + `-i frame.png`)**
   `Image 1 is the exact product: a pair of rectangular matte black titanium eyeglasses. Keep the frame shape, color, bridge, nose pads and temple tips identical to Image 1; do not redesign it. Place these glasses on the face of a Thai woman in her 30s laughing in a sunlit Bangkok co-working space, three-quarter view, the glasses sharp and clearly visible, 85mm lens at f/2, soft window light from the left, natural skin texture with visible pores, the right third of the frame calm and empty for a headline. No text, letters, logos or watermarks anywhere in the image.`
4. **ตัวละครเดียวกันข้ามภาพ (Codex/Kontext แก้จาก master)**
   `Using the character in Image 1 as the master reference, keep his face, grey hair, round tortoiseshell glasses and blue cardigan exactly the same. Change only the setting: he now stands at the counter of a small eyewear shop at night, lit by one warm 2700K desk lamp, cool moonlight through the window behind him. Same illustration style, same line weight and colors as Image 1.`
5. **Inpaint ลบลายน้ำปลอม (prompt บรรยายเฉพาะในมาสก์)**
   `Plain smooth light oak wood surface with soft even grain, matching the warm afternoon light and soft shadow of the surrounding table.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- ใส่ negative prompt หรือ `(word:1.5)` กับ FLUX แล้วคิดว่ามันทำงาน (cfg 1 → ไม่มีผล)
- เขียน "no text, no people" แล้วได้คนและตัวหนังสือ เพราะคำนามถูกดึงเข้ามา → ใช้คำบวก
- เพิ่ม `--steps` ของ schnell เป็น 20–30 หวังให้คมขึ้น ได้แค่ช้าลง/เลอะ
- เปลี่ยน seed + prompt + ขนาดพร้อมกัน แล้วไม่รู้ว่าอะไรทำให้ภาพดีขึ้น
- ไม่จด seed ทำให้ภาพที่ลูกค้าชอบสร้างซ้ำไม่ได้
- img2img ด้วยภาพคนละสัดส่วน → ถูกครอปกลาง เสียองค์ประกอบ
- denoise สูงเกิน (0.7+) แล้วหวังให้ "เหมือนเดิมแต่สวยขึ้น"
- แก้ภาพต่อจากภาพที่แก้แล้ว 7–8 ทอด จนหน้าคน/แว่นเพี้ยนสะสม
- prompt ยาว 10 บรรทัดโดยสิ่งสำคัญ (แว่น) อยู่บรรทัดสุดท้าย
- กองแท็ก "8k, ultra HD, masterpiece, trending" ได้ภาพพลาสติก
- ให้ AI วาดแว่นสินค้าจากข้อความล้วน แล้วโพสต์เป็นสินค้าจริง (รูปทรงไม่ตรง = ข้อมูลเท็จต่อลูกค้า)
- ให้ AI เขียนข้อความ/ราคา/ภาษาไทยในภาพ แทนที่จะใส่ใน HTML
- ลืมเปิดป้าย AI ตอนโพสต์ภาพคนสมจริงที่สร้างด้วย AI
- กดรัน Codex เองโดยไม่ถามผู้ใช้ก่อน (เสีย quota)

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - เขียน prompt ภาพฉากร้านแว่นเดียวกัน 2 แบบ: แบบแท็ก (SDXL style) และแบบประโยค (FLUX style) แล้วอธิบายว่าทำไม FLUX ควรใช้แบบหลัง
  - แยก prompt ตัวอย่างข้อ 3 ในส่วน 5 ออกเป็น 9 ช่องตามตาราง 1.2
  - ตอบ: ทำไม negative prompt ไม่มีผลเมื่อ CFG = 1 (ใช้สูตรใน 1.3)
- **ระดับ 2 (ประยุกต์):**
  - ล็อก `--seed 42` แล้วสร้างฉากหลัง 4 ใบด้วย `flux.py` โดยเปลี่ยน **ช่องเดียว** ต่อใบ (light → composition → style → mood) จดตาราง seed/ช่อง/ผล
  - img2img ภาพเดียวกันที่ `--denoise` 0.2, 0.4, 0.6, 0.8 แล้วเขียนว่าแต่ละค่ารักษาอะไรไว้และเสียอะไรไป
  - หาร่องรอย AI ในภาพเก่าของทีม 5 ภาพ (มือ, ลายน้ำ, ขาแว่น, เลนส์) แล้วเสนอวิธีแก้แต่ละจุด
- **ระดับ 3 (เชี่ยวชาญ):**
  - วางแผน key visual แว่นหนึ่งตัวจาก kit จริง:
    - เลือกว่าส่วนไหนใช้ FLUX (ฉาก), ส่วนไหนใช้ Codex (นายแบบ + แว่นจริง — ถามผู้ใช้ก่อน), ส่วนไหนเป็นภาพจริง/HTML (แว่น cutout, ข้อความ, โลโก้)
    - เขียน prompt ตาม 9 ช่องพร้อมเหตุผลของแต่ละช่อง
    - ทำ checklist ความถูกต้องของสินค้า (รูปทรง, สี, bridge, nose pad, ขาแว่น, เลนส์) และตรวจทุกข้อ
  - ทำซ้ำจนได้ ≥ 8/10 ตามเกณฑ์ข้อ 8 แล้วบันทึกบทเรียนลง `../LEARNING-LOG.md`

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| โครงสร้าง prompt | ครบ 9 ช่องที่จำเป็น เรียงสำคัญก่อน เขียนตามนิสัยโมเดล | ขาด 1–2 ช่อง หรือสไตล์ไม่ตรงโมเดล | กองแท็ก/คำฟุ่มเฟือย หรือคำขัดกันเอง |
| การทดลองที่ทำซ้ำได้ | จด seed/ค่า/ไฟล์ เปลี่ยนทีละตัวแปร | จดบางส่วน | สร้างซ้ำไม่ได้ |
| ความถูกต้องของสินค้า | แว่นตรงของจริงทุกจุด (หรือใช้ cutout จริง) | เพี้ยนเล็กน้อยที่ไม่ใช่จุดขาย | รูปทรง/สี/รายละเอียดผิด |
| ไม่มีร่องรอย AI | มือ ผิว ขอบ เลนส์ เป็นธรรมชาติ ไม่มีลายน้ำ/ตัวอักษร | มีจุดเล็กที่ต้องซูมถึงเห็น | เห็นชัดตั้งแต่แวบแรก |
| ใช้งานได้จริงและถูกกติกา | ภาพไม่มีตัวหนังสือ มีพื้นที่ว่างสำหรับข้อความ ใช้เครื่องมือ/ใบอนุญาตถูก ติดป้าย AI | ขาด 1 ข้อ | ฝ่าฝืนลิขสิทธิ์/ป้าย AI หรือใช้ quota โดยไม่ถาม |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- FLUX prompting (Black Forest Labs):
  - BFL docs — [Prompting fundamentals (text-to-image)](https://docs.bfl.ai/guides/prompting_guide_t2i_fundamentals)
  - BFL docs — [Negative prompts: FLUX does not support them](https://docs.bfl.ai/guides/prompting_guide_t2i_negative)
  - BFL docs — [Technical prompting (positive rewrites)](https://docs.bfl.ai/guides/prompting_unified_technical)
  - BFL docs — [FLUX.2 prompting guide](https://docs.bfl.ai/guides/prompting_guide_flux2)
  - BFL docs — [Prompting summary](https://docs.bfl.ai/guides/prompting_summary)
  - BFL docs — [Unified reference (API parameters)](https://docs.bfl.ai/guides/prompting_unified_reference)
  - BFL Help — [Does FLUX.2 support negative prompting?](https://help.bfl.ai/articles/7734566352-does-flux-2-support-negative-prompting)
- FLUX Kontext / consistency:
  - BFL docs — [Kontext image-to-image prompting guide](https://docs.bfl.ai/guides/prompting_guide_kontext_i2i)
  - BFL docs — [Kontext image editing](https://docs.bfl.ai/kontext/kontext_image_editing)
  - BFL blog — [FLUX.1 Kontext](https://bfl.ai/blog/flux-1-kontext)
  - arXiv — [FLUX.1 Kontext: Flow Matching for In-Context Image Generation and Editing in Latent Space](https://arxiv.org/html/2506.15742v2)
  - ComfyUI docs — [FLUX.1 Kontext dev tutorial](https://docs.comfy.org/tutorials/flux/flux-1-kontext-dev)
- FLUX.1 schnell (โมเดล/ใบอนุญาต):
  - Hugging Face — [black-forest-labs/FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell/tree/main)
  - NVIDIA — [FLUX.1-schnell model card](https://build.nvidia.com/black-forest-labs/flux_1-schnell/modelcard)
- OpenAI GPT image:
  - OpenAI — [Image prompting guide](https://developers.openai.com/api/docs/guides/image-prompting?model=gpt-image-2.6)
  - OpenAI Cookbook — [GPT image generation models prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
  - OpenAI Cookbook — [Generate images with high input fidelity](https://developers.openai.com/cookbook/examples/generate_images_with_high_input_fidelity)
  - OpenAI API reference — [Images: edit](https://developers.openai.com/api/reference/resources/images/methods/edit)
- Diffusion parameters / img2img / inpaint:
  - Hugging Face diffusers — [Stable Diffusion img2img pipeline](https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img)
  - Hugging Face diffusers — [Image-to-image guide](https://huggingface.co/docs/diffusers/v0.39.0/using-diffusers/img2img.md)
  - Hugging Face diffusers — [Inpainting pipeline](https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/inpaint)
  - ComfyUI docs — [Inpaint tutorial](https://docs.comfy.org/tutorials/basic/inpaint)
  - ComfyUI docs — [Outpaint tutorial](https://docs.comfy.org/tutorials/basic/outpaint.md)
  - Comfy.org Learning — [Inpainting, outpainting & upscaling](https://comfy.org/learning/basics/inpainting-outpainting-upscaling)
- ป้าย AI:
  - Meta Help — [How to identify AI content on Meta products](https://www.meta.com/help/artificial-intelligence/1783222608822690/)
  - TechCrunch — [Meta is making its AI info label less visible on edited content (2024-09)](https://techcrunch.com/2024/09/12/meta-is-making-its-ai-info-label-less-visible-on-content-edited-or-modified-by-ai-tools)
  - TikTok Support — [About AI-generated content](https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content)
  - TikTok Transparency — [Supporting responsible, transparent AI-generated content](https://www.tiktok.com/transparency/en/supporting-responsible-transparent-ai-generated-content/)
  - TikTok Newsroom — [Partnering with our industry to advance AI transparency and literacy (C2PA)](https://newsroom.tiktok.com/partnering-with-our-industry-to-advance-ai-transparency-and-literacy?lang=en)
- หมายเหตุ:
  - ค่าตัวเลขเชิงประสบการณ์ (ความยาว token ของ T5 ใน schnell, LoRA 15–40 ภาพ, strength 0.6–1.0, FLUX dev guidance ~3.5, ช่วง denoise) เป็นแนวปฏิบัติทั่วไปของวงการ ไม่ได้ยืนยันจากแหล่งในรายการนี้; ตาราง denoise 0.2/0.35 มาจากการทดลองของทีมเอง (สกิล `flux-like-chatgpt`)
  - ไม่พบหน้า IP-Adapter ใน docs ทางการของ ComfyUI ตอนค้น จึงอธิบายเชิงหลักการเท่านั้น; ไม่ได้อ้าง docs ของ Midjourney ในบทนี้ (ดูลิงก์ Midjourney ในบทที่ 1)
  - นโยบายป้าย AI ของ Meta/TikTok เปลี่ยนบ่อย ตรวจหน้า Help ล่าสุดก่อนโพสต์งานโฆษณา
