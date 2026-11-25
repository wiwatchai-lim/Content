# AI Cartoon Generation: การทำการ์ตูนและตัวละครที่คงที่ด้วยเครื่องมือของเรา (M44, part 1)

> Module M44 Cartoon, Comics & Illustration · ส่วนที่ 1 จาก research batch 2026-11-25 · แหล่งอ้างอิงทั้งหมดอยู่ใน `sources_ai.json` (ใช้ key ในวงเล็บเหลี่ยม)
> ใช้ได้กับงานทุกประเภทและทุกลูกค้า (mascot แบรนด์, การ์ตูนอธิบาย, carousel, story clip) งานของร้านเป็นแค่ตัวอย่าง

## 0. Scope & status
**ครอบคลุม:** FLUX.1 schnell ตอบสนองต่อ style word อย่างไร, ทำไม negative prompt ใช้ไม่ได้ที่ cfg 1, วิธีคุมตัวละครให้เหมือนเดิมแต่ละวิธี พร้อมป้ายว่าเครื่องเรา (RTX 3050 6 GB, ComfyUI + GGUF) ทำได้หรือไม่, วิธีวัดความคงที่ (DreamSim / DINO / CLIP), ลิขสิทธิ์และจริยธรรมเรื่องสไตล์, artefact ที่พบบ่อยในภาพการ์ตูน AI, และแผนทดลอง `ai_tests` ที่พร้อมรันได้ทันที 9 ชุด
**ไม่ครอบคลุม:** การรัน FLUX หรือ Codex จริง (session หลักเป็นคนรันการทดลอง), วิธี animate (ดู `story-clips/_craft/rig.js`), กฎหมายไทย, โมเดลแบบเสียเงินอื่น ๆ (Midjourney ฯลฯ)
**ตรวจเครื่องแล้ว (2026-11-25):** `nvidia-smi` แสดง RTX 3050 6144 MiB; `~/ComfyUI/custom_nodes` มีแค่ `ComfyUI-GGUF`; โฟลเดอร์ `models/clip_vision`, `style_models`, `loras` ว่าง; venv ของ ComfyUI มี `torch 2.11+cu128` และ `transformers` แต่ไม่มี `dreamsim`; Python ของระบบไม่มี torch

## 1. FLUX.1 schnell กับ style word
**คืออะไร:** schnell คือ rectified-flow transformer ขนาด 12B ที่ถูก distill ให้ได้ภาพใน 1–4 step และใช้ guidance 0 ใน Diffusers [BFL-FluxSchnellCard]. `tools/flux.py` รันแบบ 4 step, euler/simple, `cfg 1.0` และใส่ `ConditioningZeroOut` เป็นฝั่ง negative
**กลไก:** การ distill แบบ adversarial เก็บคุณภาพภาพไว้ได้ แต่ "แลกกับ prompt alignment" และทำให้เกิดปัญหา "object duplication and merging" บ่อยขึ้น [Sauer2024-LADD]. model card เองก็เขียนว่า "prompt following depends heavily on prompting style" [BFL-FluxSchnellCard]
**คำแนะนำทางการ (BFL):** ให้ตั้งชื่อสไตล์ **และ** อธิบายลักษณะทางภาพของมันด้วย เพราะคำอธิบายที่จับต้องได้ให้ทิศทางชัดกว่าคำกว้าง ๆ อย่าง "aesthetic" ส่วนบรรทัด style/mood ให้ใส่ไว้ท้าย prompt [BFL-StyleGuide]. **ข้อควรระวัง:** หน้านี้เขียนให้ FLUX 3 / FLUX.2 เป็นหลัก การนำมาใช้กับ schnell จึงยังเป็นสมมติฐานที่ต้องทดสอบ (T1, T2)
**สิ่งที่ทีมเราเห็นเองแล้ว (tier: observation ภายใน ไม่ใช่วิทยาศาสตร์):**
- VA-001: คำบอกทิศแสง "from above" ไปขยับ **กล้อง** ด้วย ภาพกลายเป็น flat-lay และรูปทรงสินค้าเปลี่ยน → คำหนึ่งคำรั่วไปกระทบหลายตัวแปรพร้อมกัน (`../visual-arts/VISUAL_EXPERIMENTS.json`)
- `CAPABILITY_MATRIX.json`: คำเกี่ยวกับเลนส์/ระยะชัด (lens/DoF) ดันภาพที่ไม่ใช่ภาพถ่ายให้ออกไปทางภาพถ่าย 3D; ใส่คำว่า "no lamp" แล้วกลับได้โคมไฟมา
- `flux-like-chatgpt`: ใช้ text-to-image อย่างเดียวไม่มีทางได้ภาพเหมือน ChatGPT ต้องใช้ img2img ที่ denoise 0.2 ถึงจะใกล้
**การใช้งาน:** เขียนสไตล์เป็น **ลักษณะทางภาพ** ได้แก่ เส้น (น้ำหนัก ความสม่ำเสมอ ขอบ), การลงสี (flat / cel 2 tone / ไล่เฉด), แรเงา (hatching / smudge / ไม่มีเลย), พื้นผิว (กระดาษ, halftone), สัดส่วนตัวละคร และ palette แล้วไม่ใส่คำกล้อง/เลนส์ในงานการ์ตูน และไม่ใส่ชื่อศิลปิน/สตูดิโอ (ดู §6)
**ข้อจำกัด:** ยังไม่มีหลักฐานที่ทดลองอย่างควบคุมว่าการเขียน "label อย่างเดียว" กับ "trait อย่างเดียว" ให้ผลต่างกันแค่ไหนบน schnell → T2 · **confidence: medium** (คำแนะนำของ vendor + ข้อสังเกตของเราเองชี้ไปทางเดียวกัน)

## 2. ทำไม negative prompt ไม่ทำงานที่ cfg 1
**กลไก:** classifier-free guidance เอา prediction แบบมี condition กับแบบไม่มี condition มาผสมกันเพื่อแลกระหว่างคุณภาพกับความหลากหลาย [HoSalimans2022]. รูปที่ใช้กันทั่วไปคือ `ε = ε_uncond + w·(ε_cond − ε_uncond)` เวลาเราใส่ negative prompt มันจะไปแทนที่ `ε_uncond` ถ้า **w = 1** สมการจะเหลือแค่ `ε = ε_cond` ฝั่ง negative จึงหายไปจากสมการทั้งหมด (ข้อนี้เราพิสูจน์จากสูตรเอง abstract ไม่ได้เขียนไว้ตรง ๆ). LADD student สร้างภาพด้วย "four unguided sampling steps" และไม่มีค่า guidance ให้ปรับ [Sauer2024-LADD]. BFL ยืนยันตรง ๆ ว่า "FLUX models don't support negative prompts" และเตือนด้วยว่าการเอ่ยถึงสิ่งที่ไม่ต้องการอาจดึงสิ่งนั้นเข้ามาในภาพ [BFL-NegativeGuide]
**สิ่งที่ต้องทำ:** เขียนสิ่งที่อยากเห็นแทนสิ่งที่ไม่อยากเห็น [BFL-NegativeGuide]
| ไม่อยากได้ | เขียนแทนว่า |
|---|---|
| no text, no signature | plain unmarked paper with an empty clean lower-right corner |
| no extra characters | only two figures in the whole scene, a quiet empty street |
| no face | a smooth perfectly round blank head like an egg |
| no colours | drawn only in graphite grey on cream paper |
| bad hands | hands tucked into sweater pockets / holding a cup with both hands |
**ข้อยกเว้น:** IP-Adapter ของ XLabs แนะนำให้ใช้ `true_gs=2` คือกลับไปใช้ CFG จริง [XLabs-FluxIPAdapter] ซึ่งเวลา render จะนานขึ้นราว 2 เท่า และ workflow ของเราไม่ได้ใช้ · **confidence: high** (ได้จากทั้งสูตรและ docs ของ vendor)

## 3. วิธีคุมตัวละครให้คงที่ และสิ่งที่เครื่องเราทำได้
ป้ายในตาราง: **available now** = ใช้ได้ทันทีกับ `tools/flux.py` · **needs install** = ต้องดาวน์โหลด/ติดตั้งเพิ่มแต่ VRAM พอ · **not feasible** = VRAM หรือสัญญาอนุญาตไม่ให้ใช้กับงานเชิงพาณิชย์

| วิธี | กลไก | สถานะบนเครื่องเรา | ต้นทุน/ข้อจำกัด | แหล่ง |
|---|---|---|---|---|
| **Fixed seed + prompt ส่วนตัวละครชุดเดิม** | noise ตั้งต้นเดิม + ข้อความเดิม → ภาพเดิมทุกครั้ง พอเปลี่ยนประโยคฉาก ตัวละครจะเพี้ยนไปเท่าไรยังไม่รู้ | **available now** (`--seed`) | ใช้ทำซ้ำได้ แต่ไม่ได้รับประกันว่าตัวละครจะคงที่; VA-001 พบว่าเปลี่ยนคำเดียวทุกอย่างขยับ | VA-001; CONTINUITY_SYSTEM §0.5 |
| **Identity markers เป็นคำ** (3–6 อย่าง เช่น เสื้อ oatmeal knit, หัวกลมเกลี้ยง) | ให้ text encoder มีจุดยึดเดิมทุกภาพ | **available now** | การผูก attribute กับตัวละครยังอ่อน (สลับเสื้อกันได้) | Sauer2024-LADD (prompt alignment), Borji2023-Failures |
| **Reference/turnaround sheet ในภาพเดียว** (front/side/back ภาพเดียว 1344×768) | ทุก view ถูก denoise ไปพร้อมกันในภาพเดียว จึงใช้ "ลายมือ" เดียวกัน | **available now** | view อาจรวมกันหรือซ้ำ (duplication) [Sauer2024-LADD]; ยังไม่ได้ทดสอบ → T4 | — (ข้อสันนิษฐาน, ทดสอบใน T4) |
| **img2img จาก master** (`--init master.png --denoise d`) | เติม noise ลงภาพต้นฉบับแล้ว denoise ใหม่ ค่า noise (denoise) คือตัวแลกระหว่างความเหมือนต้นฉบับกับความใหม่ | **available now** | denoise ต่ำ = ท่าเดิม; สูง = ตัวละครเพี้ยน; ติดแสงและ layout ของต้นฉบับมาด้วย (ทีมเห็นที่ 0.2 / 0.35 / 0.6) | flux-like-chatgpt SKILL; USCO-Part2-2025 (ภาพวาดเองใช้เป็น input ได้) |
| **Layout sketch → img2img** (วาดท่า/บล็อกใน HTML หรือ rig.js แล้วใช้เป็น init) | ภาพ input กำหนดท่าและองค์ประกอบ FLUX ลงสไตล์ให้ | **available now** | ที่ denoise 0.55–0.75 ท่ายังอยู่ หน้าตาตัวละครต้องตรวจอีกครั้ง; เป็นงานที่มนุษย์ควบคุมได้มากกว่า (ผลดีด้านลิขสิทธิ์) | IMAGE_PROVIDER_ADAPTERS; USCO-Part2-2025 |
| **Cartoon rig / HTML puppet** (rig.js) | ตัวละครเป็นเวกเตอร์ เหมือนเดิม 100% | **available now** | ภาพดูไม่เหมือนงานวาดมือ; ใช้ร่วมกับ FLUX ที่ทำฉากหลัง | GUIDE.md |
| **FLUX Redux (image prompt)** | ใช้ SigCLIP vision encoder + style model ให้ภาพเป็น prompt ตาม ComfyUI ใช้กับ schnell ได้ | **needs install** (sigclip + flux1-redux-dev) ทางเทคนิคทำได้; **not feasible สำหรับงานลูกค้า/ร้าน** เพราะเป็น FLUX.1 [dev] Non-Commercial License | ใช้กับงานทดลองภายในได้เท่านั้น | ComfyUI-FluxExamples, BFL-ReduxCard |
| **IP-Adapter for FLUX** (XLabs) | decoupled cross-attention ป้อนภาพเป็น prompt ขนาดราว 22M พารามิเตอร์ | **needs install** + เทรนบน dev, เป็นสัญญา non-commercial, ยังเป็น beta และแนะนำ true_gs=2 → **not feasible สำหรับงานเชิงพาณิชย์** | ไม่มีข้อมูล VRAM บน 6 GB | Ye2023-IPAdapter, XLabs-FluxIPAdapter |
| **PuLID-FLUX** | ฉีด identity จากหน้าคนจริงโดยไม่ต้อง fine-tune ใช้ ID loss | **not feasible**: ผู้พัฒนาบอกขั้นต่ำ 16 GB (demo 12 GB) และเป็นเครื่องมือสำหรับหน้าคน ใช้กับตัวละครไม่มีหน้าไม่ได้ | ใช้หน้าคนจริงต้องได้รับความยินยอม | Guo2024-PuLID, PuLID-Repo |
| **LoRA training (DreamBooth-style)** | ใช้ภาพ 3–5 ใบ (4 ใบดีที่สุด) สอนตัวละครให้โมเดล | **not feasible บนเครื่อง**: FluxGym บอกขั้นต่ำ 12 GB; schnell "not really recommended"; LoRA ที่เทรนบน dev ติดสัญญา dev | เทรนบน cloud แล้วโหลดมาใช้ได้ (GGUF LoRA ยัง "experimental"); ถึงจะเทรนแล้ว ตัวละครก็ยังเปลี่ยนตามบริบทได้ | Ruiz2023-DreamBooth, FluxGym, ComfyUI-GGUF |
| **Training-free shared attention** (ConsiStory) | แชร์ attention ระหว่างภาพทั้งชุด | **not feasible**: มีเฉพาะบน SDXL | ใช้ได้ดีที่สุดเมื่อทั้งชุดเป็นสไตล์เดียว | Tewel2024-ConsiStory |
| **Codex `-i` master reference** | GPT image รับภาพอ้างอิงได้ | ใช้ได้ แต่ **กิน quota ต้องถามผู้ใช้ทุกครั้ง** | ตัวละครยังเพี้ยนได้ (CONTINUITY_SYSTEM) | CAPABILITY_MATRIX |

**สรุปลำดับที่แนะนำ (ฟรี ใช้ได้ทันที):** ใช้ rig หรือ HTML คุมท่าก่อน → ใช้ FLUX img2img ลงสไตล์ (denoise ต่ำถึงกลาง) → กำหนด identity markers เป็นคำ → ใช้ seed family เดิม → ตรวจด้วยตาตาม checklist → ใช้ Codex เฉพาะช็อตที่ยากและผู้ใช้อนุญาตแล้ว · **confidence: medium** (ตารางสถานะได้จาก docs และการตรวจเครื่องจริง ส่วนประสิทธิภาพของแต่ละวิธีบน schnell ยังไม่ได้ทดสอบ)

**ข้อจำกัดที่ทุกวิธีมีร่วมกัน:** แม้แต่ DreamBooth ก็ยังเจอ "context-appearance entanglement" (สีของวัตถุเปลี่ยนตาม prompt) และรายละเอียดที่โมเดลแต่งขึ้นเอง [Ruiz2023-DreamBooth]; ConsiStory ระบุว่า appearance กับ style ผูกกันอยู่ [Tewel2024-ConsiStory] → **ห้ามเปลี่ยนสไตล์กลางซีรีส์** ถ้าต้องการให้ตัวละครยังเหมือนเดิม

## 4. วิธีวัดความคงที่ของตัวละคร (consistency evaluation)
| metric | วัดอะไร | ตรงกับการตัดสินของคนแค่ไหน | สถานะ |
|---|---|---|---|
| PSNR / SSIM | ความต่างระดับพิกเซล | 57% บน NIGHTS 2AFC (แทบเท่าการเดา) [Fu2023-DreamSim] | ใช้ได้ทันที แต่ **อย่าใช้วัดตัวละคร** |
| LPIPS | ระดับ texture/ต่ำ | 70.7%, ถูกสีพื้นหลังครอบงำ [Fu2023-DreamSim] | — |
| CLIP-I (cosine ของ CLIP embedding) | ความหมายระดับ class | 83.1%; แยกตัวละคร 2 ตัวที่บรรยายด้วยคำคล้ายกันไม่ได้ [Fu2023-DreamSim; Ruiz2023-DreamBooth] | **needs install**: โหลดโมเดลผ่าน `transformers` ใน venv ของ ComfyUI |
| DINO (ViT-S/16 หรือ B/16) | รายละเอียดที่ใช้แยกตัวตน | 90.1%; สัมพันธ์กับความชอบของคน 0.32 เทียบกับ CLIP-I 0.27 [Fu2023-DreamSim; Ruiz2023-DreamBooth] | **needs install** (ดาวน์โหลดโมเดลราวร้อย MB) |
| DreamSim | ความเหมือนแบบองค์รวม เน้นวัตถุหลัก + สี + layout | 96.2% [Fu2023-DreamSim]; ConsiStory ลบพื้นหลังก่อนแล้ววัดเป็นคู่ [Tewel2024-ConsiStory] | **needs install** (`pip install dreamsim` ใน venv) |
| CLIP-T / CLIP score | ภาพตรงกับ prompt แค่ไหน | ใช้คู่กับ consistency เพื่อจับภาพที่ "เหมือนเพราะไม่ทำตาม prompt" [Tewel2024-ConsiStory] | needs install |
| Identity-marker checklist (คนตรวจ) | marker ทีละข้อ ผ่าน/ไม่ผ่าน | ไม่มีตัวเลขเทียบกับคน; สอดคล้องกับ CONTINUITY_SYSTEM §4C | **available now** |
| `inspect_views.py` | value span, thumbnail, notan, focal, silhouette | วัดองค์ประกอบภาพ ไม่ได้วัดตัวตนตัวละคร | **available now** |
**ข้อควรระวัง:** NIGHTS สร้างจากภาพ Stable Diffusion ซึ่งส่วนใหญ่ดูเหมือนภาพถ่าย จึงยังไม่รู้ว่าตัวเลขพวกนี้ใช้กับภาพลายเส้นดินสอได้ดีแค่ไหน [Fu2023-DreamSim]; DreamSim ยังไวต่อ layout ด้วย ท่าที่แทบไม่ขยับจึงได้คะแนนสูงเกินจริง [Tewel2024-ConsiStory] → ใช้ metric ช่วย **คัดภาพเบื้องต้น** ส่วนคำตัดสินสุดท้ายให้คนตรวจ checklist · **confidence: high** สำหรับลำดับว่า metric ไหนตรงกับคนกว่ากันบนภาพถ่าย, **low** สำหรับภาพการ์ตูน

## 5. Artefact ที่พบบ่อยในการ์ตูน AI (QC checklist)
หมวดหมู่ตาม [Borji2023-Failures] ปรับให้เข้ากับงานการ์ตูน:
1. **ร่างกาย:** มือ/นิ้วเกินหรือหลอมรวมกัน, แขนขาเกิน, **แว่นตา** (เป็นหมวดย่อยในงานวิจัยนี้ด้วย) → จัดท่าให้มือเรียบง่าย หรือซ่อนมือไว้ (T7)
2. **เรขาคณิต:** เส้นตรงที่ควรตรงกลับคด, perspective ของฉากหลังกับตัวละครไม่ตรงกัน, ความสมมาตรเพี้ยน
3. **ฟิสิกส์:** เงาไม่ตรงกับทิศแสง, ของลอยโดยไม่มีอะไรรองรับ
4. **ความหมาย/ตรรกะ:** ความสัมพันธ์เชิงพื้นที่ผิด (ใครยื่นอะไรให้ใคร), **ตัวละครหรือวัตถุซ้ำ** ซึ่งเข้ากับที่ LADD ระบุไว้เรื่อง "object duplication and merging" [Sauer2024-LADD] → ฉากสองตัวละครต้องตรวจทุกภาพ (T6)
5. **ตัวหนังสือ/รายละเอียด:** ตัวอักษรมั่ว, **ลายเซ็นหรือลายน้ำปลอม** (FLUX ใส่ที่มุมขวาล่าง ตาม flux-like-chatgpt SKILL) → ภาพต้องไม่มีตัวหนังสือ ข้อความทั้งหมดอยู่ในเลเยอร์ HTML
6. **เฉพาะงานการ์ตูนลายเส้น (ข้อสังเกตของทีม):** เส้นขยุกขยิกหรือเป็นริ้ว ("หยักเกิน" ที่ denoise 0.35), เส้นซ้อนหรือเส้นเกิน, หัวที่ควรเกลี้ยงกลับมีหน้าโผล่ขึ้นมา → ต้องเขียน marker แบบบอกสิ่งที่มี ("smooth blank egg-like head")

## 6. ลิขสิทธิ์และจริยธรรมเรื่องสไตล์
- **ภาพที่ AI สร้างล้วน ๆ ไม่ได้รับความคุ้มครองลิขสิทธิ์ (กฎหมายสหรัฐฯ):** "Copyright does not extend to purely AI-generated material…" และ "prompts do not alone provide sufficient control" [USCO-Part2-2025]. ส่วนที่คุ้มครองได้คือ งานของมนุษย์ที่ยังเห็นได้ในผลลัพธ์ (เช่น ภาพร่างที่เราวาดเองแล้วใช้เป็น img2img init), การเลือกและจัดเรียงเชิงสร้างสรรค์, การแก้ไขภายหลัง; กรณี *Zarya of the Dawn* (นิยายภาพ) ได้จดทะเบียนเฉพาะข้อความและการจัดเรียง ส่วนภาพ AI ไม่ได้ [USCO-Part2-2025]
  → **การใช้งาน:** ข้อความไทยที่มนุษย์เขียน, layout HTML, rig, ภาพร่าง และการเลือกภาพ คือ "ส่วนที่เป็นของเรา" ให้บันทึก process ไว้ใน kit.md
- **สไตล์ไม่ได้รับความคุ้มครองโดยตัวมันเอง แต่การเลียนสไตล์อาจลอกส่วนที่คุ้มครองได้ไปด้วย และเป็นความเสียหายทางตลาด ("market dilution") ได้** [USCO-Part3-2025] รายงานยกตัวอย่าง prompt "in the style of" ที่ใส่ชื่อศิลปิน และกระแสภาพเลียนแบบสตูดิโอแอนิเมชันญี่ปุ่น
  → **กฎของทีม (เข้มกว่ากฎหมาย):** ห้ามใส่ชื่อศิลปินที่ยังมีชีวิต ชื่อสตูดิโอ ชื่อตัวละคร หรือชื่อ franchise ใน prompt (`validate_job.py` บล็อกอยู่แล้ว); ให้อธิบายลักษณะของ **ยุคหรือขบวนการ** แทน (เช่น "1930s rubber-hose traits: bendy jointless limbs, pie-cut eyes, white four-finger gloves") และอย่าสร้างตัวละครที่ silhouette เหมือนตัวละครที่มีเจ้าของ
- **License ของโมเดล:** schnell เป็น Apache-2.0 ใช้เชิงพาณิชย์ได้ [BFL-FluxSchnellCard]; Redux / IP-Adapter / Fill / Canny / Depth เป็นตระกูล dev ซึ่งไม่อนุญาตเชิงพาณิชย์ [BFL-ReduxCard; XLabs-FluxIPAdapter; ComfyUI-FluxExamples]
- **ตัวอย่างในไทย:** "ขายหัวเราะ ฉบับ AI" (2566) ให้ AI เขียนมุกและวาดภาพ ส่วนทีมคน 5–6 คนเป็นคน prompt คัดเลือก และแก้ไข สรุปว่า AI "ยังแทนความคิดสร้างสรรค์ของมนุษย์ไม่ได้" [Thairath2023-KhaiHuaRaoAI]
- ภาพ AI ที่ดูสมจริง → เปิด AI label ตามนโยบายแพลตฟอร์ม (บทที่ 9 ใน curriculum)
- **confidence:** high สำหรับข้อสรุปของ USCO (อ่านรายงานฉบับเต็ม) แต่เป็นกฎหมายสหรัฐฯ เท่านั้น กฎหมายไทยยังไม่ได้ค้นคว้า

## 7. Applied patterns (ตัวอย่างใช้งาน)
- **Mint & Tao (ดินสอ, ไม่มีหน้า):** marker = Mint: oversized oatmeal knit sweater, dark straight trousers; Tao: taller, long charcoal coat over light shirt, muted brown scarf; ทั้งคู่ "smooth perfectly round blank heads" (จาก prompt ของ Slowly Growing). ลำดับงาน: ท่าจาก rig หรือภาพร่าง → img2img 0.2–0.45 → ตรวจ marker → `inspect_views --style lineart`
- **Mascot แบรนด์ลูกค้า:** ทำ turnaround sheet ภาพเดียว (T4) แล้วให้ลูกค้าอนุมัติเป็น master → ภาพต่อ ๆ ไปทำด้วย img2img จาก master (อย่าทำต่อจากภาพที่แก้ไปแล้ว ภาพจะเสื่อมลงเรื่อย ๆ)
- **การ์ตูนอธิบาย (explainer):** ใช้ AI ทำฉากและบรรยากาศ ส่วนตัวละครหลักทำใน rig หรือ HTML เพราะต้องเหมือนกันทุกช็อต
- **คอมิกหลายช่อง:** ใช้ seed family เดียวกัน (seed, seed+1…) และย่อหน้าบรรยายสถานที่ชุดเดิม เปลี่ยนแค่ประโยค action (T8)

## 8. Anti-patterns
- เขียน "no X" ใน FLUX (ได้ X มาแทน) · ใส่ "masterpiece, 8k, trending" (เป็นนิสัยของชุมชนที่ไม่มีใครทดสอบ ดู IMAGE_PROMPT_ENGINE) · ใส่คำเลนส์ในงานการ์ตูน (ภาพหลุดไปเป็นภาพถ่าย 3D)
- ใช้ชื่อศิลปิน/สตูดิโอ/franchise แทนการบรรยายสไตล์ · เปลี่ยนสไตล์กลางซีรีส์แล้วคาดว่าตัวละครจะยังเหมือนเดิม
- ใช้ PSNR/SSIM วัดว่า "ตัวละครเหมือนกันไหม" · เชื่อตัวเลข DreamSim โดยไม่ลบพื้นหลังก่อน
- ติดตั้ง Redux/IP-Adapter (dev) แล้วเอาไปใช้กับงานลูกค้า · ใช้ PuLID กับหน้าคนจริงโดยไม่ได้รับความยินยอม
- เปลี่ยน seed กับ prompt พร้อมกัน แล้วสรุปว่าคำไหนได้ผล (VA-001 แสดงแล้วว่าแม้เปลี่ยนแค่คำเดียวก็ยังกระทบหลายอย่าง)

## 9. `ai_tests` — แผนทดลอง FLUX พร้อมรัน (session หลักเป็นคนรัน; ฟรี ไม่กิน quota)
**กติกาทุกชุด:** `python tools/flux.py "<prompt>" creative-intelligence/experiments/m44-<id>/<name>.png --seed 101 --count 3 --size <size>` (ได้ seed 101, 102, 103 → แก้จุดอ่อนของ VA-001 ที่ใช้ seed เดียว) แล้ววัดด้วย
`python .claude/skills/ai-visual-artist/tools/inspect_views.py creative-intelligence/experiments/m44-<id>/*.png --style lineart --json creative-intelligence/experiments/m44-<id>/views.json`
(ใช้ `--style painted` กับภาพสีแบบ flat/cel) แล้วบันทึกผลลง `../visual-arts/VISUAL_EXPERIMENTS.json` เฉพาะชุดที่รันจริงแล้วเท่านั้น
ค่าจาก inspect_views ที่ใช้: `value_range.span`, `thumbnail_readability.thumb_L_std`, `value_grouping`, `focal_contrast.edge_density_focal_vs_rest`, `silhouette.fill_pct`, `flags` + checklist ที่คนตรวจ (marker / artefact §5)
เวลาโดยประมาณ: 1–2 นาทีต่อภาพที่ 1024² (≈ 25–60 นาทีต่อชุด)

```json
{"ai_tests": [
 {"id": "M44-T1", "question": "Does a style phrase change only the style, or also camera/composition (like VA-001's light words)?",
  "variable": "style sentence only: A 'soft graphite pencil drawing with smudged shading on cream paper' / B 'clean uniform black ink outlines with flat pastel colour fills, no shading gradients' / C 'bold flat vector shapes with thick even outlines' / D 'bendy jointless rubbery limbs, pie-cut eyes, white four-finger gloves, black and white 1930s cartoon look'",
  "prompt": "A small round-headed cartoon cat sitting on a wooden bench in a quiet park, seen from the side at eye level, full body in the centre of the frame, a single tree behind it, wide plain sky above. {STYLE}.",
  "seeds": "101-103 per variant (12 images), size 1024x1024",
  "measure": "inspect_views: value span, edge_density, silhouette fill_pct, flags; by eye: did camera angle, pose or framing change between variants with the same seed? (yes/no per pair)",
  "success": "same seed keeps pose+framing across A-D in >=2 of 3 seeds"},
 {"id": "M44-T2", "question": "Label vs traits: is a historical style label alone weaker than a trait description?",
  "variable": "L 'in a 1930s rubber hose cartoon style' / T traits only (variant D of T1) / LT label + traits",
  "prompt": "A cheerful round cartoon teapot character walking along a kitchen counter, full body, side view at eye level, plain kitchen wall behind. {STYLE}.",
  "seeds": "101-103 per variant (9 images)",
  "measure": "count of listed traits visible per image (0-4: bendy limbs, pie eyes, gloves, B/W); inspect_views value span (B/W should be high)",
  "success": "LT >= T > L in mean trait count; if L == LT, labels are enough for schnell"},
 {"id": "M44-T3", "question": "Do 'no ...' phrases backfire for text and signatures in line-art?",
  "variable": "N '..., no text, no signature, no watermark' / P '..., plain unmarked paper with an empty clean lower-right corner' / 0 neither",
  "prompt": "Soft graphite pencil drawing on aged cream paper: a faceless figure with a smooth round blank head, wearing an oversized knit sweater, standing alone at a rainy bus stop, small in the lower half of the frame, wide empty space above. {CONSTRAINT}",
  "seeds": "101-106 per variant (18 images), 896x1120",
  "measure": "by eye: images with any glyph/signature/watermark (zoom 4 corners); inspect_views --style lineart flags",
  "success": "P has fewer text artefacts than N; report counts, not a verdict, if difference is 1 image"},
 {"id": "M44-T4", "question": "Does a 3-view turnaround in ONE image keep a character more consistent than 3 separate generations?",
  "variable": "S sheet: one 1344x768 image 'character turnaround sheet, the same character shown three times side by side: front view, side view, back view, evenly spaced on plain cream paper' / G three separate 768x768 images (front / side / back prompts)",
  "prompt": "Clean graphite pencil character design of a faceless young woman with a smooth perfectly round blank head, oversized oatmeal knit sweater, dark straight trousers, simple flat shoes, standing relaxed with arms at her sides, even soft light, plain cream paper background.",
  "seeds": "101-103 for S (3 sheets); 101-103 for each view of G (9 images)",
  "measure": "crop sheets into 3 views; identity-marker checklist per view (5 markers); count merged/duplicated figures; optional DreamSim/DINO pairwise within each set once installed",
  "success": "S marker pass rate > G and duplication <= 1 of 3 sheets"},
 {"id": "M44-T5", "question": "img2img denoise ladder: where does a new pose appear before identity breaks?",
  "variable": "denoise 0.30 / 0.45 / 0.60 / 0.75 with --init = best T4 front view (or an approved master)",
  "prompt": "Same character as before: faceless young woman with a smooth round blank head, oversized oatmeal knit sweater, dark trousers, now sitting on a low wooden stool and holding a mug with both hands, graphite pencil on cream paper.",
  "seeds": "101-103 per denoise (12 images), size equal to the init",
  "measure": "pose changed? (yes/no); marker checklist; streaky-line artefact (yes/no, cf. flux-like-chatgpt 0.35 'too jagged'); inspect_views silhouette fill_pct change vs init",
  "success": "find the lowest denoise where pose changes in >=2/3 seeds with >=4/5 markers kept"},
 {"id": "M44-T6", "question": "Two-character relation: how often is 'who does what to whom' correct, and are characters duplicated/merged?",
  "variable": "R1 one-sentence relation 'the taller one hands a cup to the shorter one' / R2 split into positions first ('On the left stands X... On the right stands Y... X holds out a cup toward Y')",
  "prompt": "Soft graphite pencil drawing on cream paper of exactly two faceless figures with smooth round blank heads on an empty street at dusk. Mint wears an oversized oatmeal knit sweater; Tao is taller and wears a long charcoal coat with a muted brown scarf. {RELATION}",
  "seeds": "101-106 per variant (12 images), 1344x768",
  "measure": "by eye: relation correct, outfit swap (yes/no), figure count == 2; inspect_views focal_contrast with --focal at the cup",
  "success": "R2 relation-correct and no-swap rate higher than R1"},
 {"id": "M44-T7", "question": "Hand strategy: visible gesturing hands vs tucked/occupied hands - rate of malformed hands",
  "variable": "H1 'waving with one open hand' / H2 'both hands tucked into sweater pockets' / H3 'both hands wrapped around a mug'",
  "prompt": "Graphite pencil drawing on cream paper, medium shot of a faceless figure with a smooth round blank head in an oversized knit sweater, standing by a window. {HANDS}",
  "seeds": "101-106 per variant (18 images), 1024x1024",
  "measure": "by eye: malformed/extra/merged fingers per image (Borji body-part category)",
  "success": "H2/H3 malformed rate < H1; feeds a hands rule in the style guide"},
 {"id": "M44-T8", "question": "Comic sequence: does keeping the same seed + same place paragraph keep the background consistent across panels while only the action sentence changes?",
  "variable": "SS same seed 101 for all 3 panels / DS seeds 101,202,303",
  "prompt": "Place: a small corner noodle shop at night with a red plastic stool, a steaming pot on the left and a single warm hanging bulb, seen at eye level, graphite pencil on cream paper. Action: {PANEL_ACTION: 1 'a faceless figure in an oversized knit sweater sits down' / 2 '... lifts a bowl' / 3 '... laughs with head tilted back'}.",
  "seeds": "SS: 101 x3 panels; DS: 101/202/303 (6 images), 1344x768",
  "measure": "by eye: same layout of pot/bulb/stool across panels (0-3 objects kept); optional DreamSim between panels on background-only crops",
  "success": "SS keeps more background objects than DS; note any panel where action change also moved the camera (VA-001 effect)"},
 {"id": "M44-T9", "question": "Cartoon look vs lens words: do camera/lens words push a flat cartoon toward a 3D/photo look?",
  "variable": "C0 no camera words / C1 add 'shot on a 50mm lens at f/1.8 with shallow depth of field' / C2 add 'flat 2D, no perspective depth, even lighting'",
  "prompt": "Flat cartoon illustration with clean even black outlines and flat cel colours: a round friendly mascot shaped like a pair of glasses with tiny arms, standing on a plain pastel floor, full body, centred. {CAMERA}",
  "seeds": "101-103 per variant (9 images)",
  "measure": "by eye: photo/3D shading present (yes/no); inspect_views value_grouping (flat cel should have a dominant band) and edge density",
  "success": "confirms or rejects the CAPABILITY_MATRIX note 'lens/DoF words push non-photo styles toward 3D photo look'"}
]}
```
**ข้อจำกัดของแผน:** ยังเป็นการตัดสินด้วยตา (คนเดียวหรือ Claude) ไม่ใช่ผู้ชมหลายคน; 3–6 seed ยังน้อยเกินกว่าจะสรุปเชิงสถิติ ให้รายงานเป็นจำนวนนับ; metric อัตโนมัติ (DreamSim/DINO) ต้องติดตั้งก่อน

## 10. Contested / open questions
- คำแนะนำของ BFL เรื่อง style เขียนให้ FLUX 3 / FLUX.2 ยังไม่รู้ว่าใช้กับ schnell ได้แค่ไหน (T1, T2)
- metric ความเหมือนทั้งหมดถูก validate บนภาพแนวภาพถ่าย ภาพลายเส้นการ์ตูนยังไม่มีงานวิจัยรองรับ → ควรเก็บชุดภาพ Mint & Tao ที่ผู้ใช้ตัดสินแล้วว่า "เหมือน/ไม่เหมือน" มาไว้เทียบ
- Redux ใช้กับ schnell ได้ทางเทคนิค แต่ติดสัญญา dev → ถ้าต้องการใช้เชิงพาณิชย์ต้องถาม BFL เรื่อง licence หรือรอ adapter ที่เป็น Apache
- กฎหมายลิขสิทธิ์ไทยเรื่องงาน AI และการเลียนสไตล์: ยังไม่ได้ค้นคว้า (งานถัดไป)
- การเทรน LoRA บน cloud สำหรับ mascot ลูกค้า: ต้องเทียบต้นทุนกับความคงที่ที่ได้จริง (DreamBooth บอกว่ายังเพี้ยนตามบริบท)
