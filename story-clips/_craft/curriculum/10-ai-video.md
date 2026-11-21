# บทที่ 10 — AI Video Generation & Motion Control (สร้างวิดีโอด้วย AI และคุมการเคลื่อนไหว)

> เป้าหมาย: เข้าใจว่าโมเดลวิดีโอ "เดา" การเคลื่อนไหวอย่างไร จนเลือกเครื่องมือได้ถูก (Wan ในเครื่อง / Kling / 2.5D / HyperFrames) เขียน motion prompt ที่แยก "ของขยับ" กับ "กล้องขยับ" ได้ และส่งคลิปที่กรอบแว่นไม่ละลาย ไม่กระพริบ ติดป้าย AI ถูกต้อง
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21 (วงการนี้เปลี่ยนเร็วมาก ชื่อรุ่นและฟีเจอร์ในบทนี้ต้องตรวจซ้ำทุก 2–3 เดือน)

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — โมเดลวิดีโอทำงานอย่างไร
โมเดลวิดีโอส่วนใหญ่ในปี 2025–2026 (Wan, Kling, Veo, Runway, Luma) เป็น **diffusion model** แบบเดียวกับโมเดลภาพนิ่ง ต่างกันตรงที่มันสร้าง "ก้อนภาพหลายเฟรมพร้อมกัน" แทนภาพเดียว

| ขั้น | เกิดอะไรขึ้น | ผลต่องานเรา |
|---|---|---|
| **VAE encode** | บีบวิดีโอให้เป็น **latent** ขนาดเล็ก ทั้งแกนกว้าง-สูง และแกนเวลา (เช่น 4 เฟรมจริงต่อ 1 เฟรม latent) | จำนวนเฟรมต้องเป็นรูปแบบเฉพาะ เช่น Wan ต้องเป็น **4n+1** |
| **Denoise ทีละ step** | เริ่มจาก noise ล้วน แล้วค่อยๆ ลบ noise ตาม prompt (text encoder) และภาพเริ่มต้น (ถ้ามี) | step น้อย = เร็วแต่หยาบ / step มาก = ช้าแต่รายละเอียดดี |
| **Temporal attention** | ทุกเฟรม "มองเห็น" กันและกัน จึงเคลื่อนไหวต่อเนื่อง | ความจำของโมเดลสั้น คลิปยาวขึ้น = ของเพี้ยนมากขึ้น |
| **VAE decode** | แปลง latent กลับเป็นพิกเซล | รายละเอียดเล็ก (บานพับ, โลโก้บนขาแว่น) มักหายตรงนี้ |

สิ่งสำคัญที่สุด: **โมเดลไม่รู้ฟิสิกส์ ไม่รู้ว่าแว่นเป็นวัตถุแข็ง** มันรู้แค่ว่า "วิดีโอที่หน้าตาแบบนี้มักขยับแบบไหน" ของแข็งบางๆ โปร่งใส สมมาตร (= แว่นตา) จึงเป็นวัตถุที่ยากที่สุดชนิดหนึ่งสำหรับ AI video

### 1.2 สามโหมดหลัก
| โหมด | Input | ใช้เมื่อ | ความเสี่ยง |
|---|---|---|---|
| **Text-to-video (T2V)** | prompt อย่างเดียว | ฉากบรรยากาศ, b-roll ทะเล/ถนน ที่ไม่มีสินค้า | ควบคุมหน้าตาไม่ได้ สินค้าจริงไม่มีทางตรง |
| **Image-to-video (I2V)** | ภาพแรก + prompt | **งานหลักของร้าน** — ภาพแว่นจริง/ภาพ Codex แล้วสั่งให้ขยับ | เฟรมแรกตรง แต่ยิ่งห่างเฟรมแรก ยิ่งเพี้ยน |
| **Video-to-video (V2V)** | วิดีโอต้นฉบับ + prompt/สไตล์ | เปลี่ยนสไตล์ฟุตเทจที่ถ่ายจริง, ใช้ท่าทางจากคลิปจริง | การเคลื่อนไหวคงที่ แต่พื้นผิวอาจ flicker |

Wan 2.2 **TI2V 5B** ที่เราใช้เป็นโมเดลไฮบริด ทำได้ทั้ง T2V และ I2V ในโมเดลเดียว (ทางการรองรับ 720p 24 fps ที่ 1280×704 / 704×1280 บน GPU 24 GB เราจึงลดเหลือ 480×848 + GGUF เพื่อให้ลง 6 GB)

### 1.3 ขั้นสูง — ตัวแปรที่คุมการเคลื่อนไหว
- **First / last frame (keyframe) control:** ให้ภาพเริ่มและภาพจบ โมเดลเติมการเคลื่อนไหวระหว่างกลาง (Kling start/end frame, Veo 3.1 `last_frame`, Luma `keyframes: frame0/frame1`) ใช้ได้ดีมากกับ "แว่นหมุนจากมุมหน้าไปมุมข้าง" เพราะบังคับให้ปลายทางเป็นรูปจริง แต่ถ้าสองภาพต่างกันมากเกินไป (แสงต่าง/ฉากต่าง) โมเดลจะ "morph" แทนการหมุน
- **Subject motion vs camera motion:** ต้องเขียนแยกกันทุกครั้ง "the glasses rotate slowly" (วัตถุหมุน) กับ "the camera orbits slowly around the glasses" (กล้องโคจร) ให้ภาพต่างกันโดยสิ้นเชิง — กล้องโคจรทำให้ฉากหลังเลื่อน (parallax) ส่วนวัตถุหมุนฉากหลังจะนิ่ง
- **Camera control แบบ UI:** Kling มีตัวเลือกกล้อง (pan/tilt/zoom/roll ฯลฯ) แยกจาก prompt, Luma ใช้ **Camera Motion Concepts** (เปิดตัวกับ Ray2 31 มี.ค. 2025) ที่ใส่คำกล้องลงใน prompt, Runway แนะนำให้เขียนการเคลื่อนกล้องเป็นภาษาธรรมชาติ และมีคลังคำศัพท์กล้องให้ดู
- **Motion brush:** ระบายส่วนของภาพแล้ววาดเส้นทาง (Kling ระบุได้ถึง 6 องค์ประกอบ และมี Static Brush ตรึงฉากหลังไว้) เหมาะกับ "ให้ผมนางแบบปลิว แต่แว่นห้ามขยับ"
- **Motion strength / CFG:**
  - **CFG (guidance)** = ความเข้มที่โมเดลเชื่อ prompt — สูงเกินไปสีจัด/ขอบแข็ง/เคลื่อนไหวกระชาก, ต่ำเกินไปไม่ทำตามสั่ง (wan.py ล็อก `cfg 5.0`)
  - **Motion strength / motion bucket** (บางเครื่องมือเรียกต่างกัน) = ปริมาณการขยับ ค่าสูง = ไดนามิกแต่ของละลายง่าย สำหรับสินค้า "น้อยไว้ก่อน" เสมอ
  - **Shift** (ของ Wan/Flow models) คุมว่า denoise ใช้เวลากับโครงใหญ่หรือรายละเอียดมากกว่า wan.py ใช้ `shift 8.0`
- **Duration & fps:** โมเดลส่วนใหญ่สร้าง 4–10 วินาทีต่อครั้ง (Wan 5B ที่ 24 fps = 121 เฟรมสำหรับ 5 วินาที) คลิปยาวทำโดย **ต่อหลายช็อต** ไม่ใช่สั่งยาวรวด ถ้าต้องการ slow motion ให้ใช้ **frame interpolation** (RIFE/FILM) เพิ่มเฟรมแล้วยืดเวลา
- **Consistency ข้ามช็อต:** ใช้ภาพเดียวกัน (หรือภาพจากชุด kit เดียวกัน) เป็นเฟรมแรกทุกช็อต, ใช้ reference images (Veo 3.1 รับได้สูงสุด 3 ภาพ), ล็อก seed + prompt ส่วนคงที่ ("the same black acetate round frames") และเกรดสีรวมทีหลัง
- **Lip-sync:** แยกเป็นอีกขั้น — สร้างเสียงก่อน (TTS) แล้วใช้เครื่องมือ lip-sync ขยับปาก (หรือโมเดลที่สร้างเสียง+ภาพพร้อมกันอย่าง Veo 3.x) สำหรับตัวการ์ตูนของเรา `rig.js` ทำ lip-sync เองได้แม่นกว่าและฟรี
- **Upscale / interpolation:** สร้างที่ความละเอียดต่ำ (เร็ว ประหยัด VRAM) แล้วค่อย upscale เป็น 1080×1920 ตอนท้าย — upscaler วิดีโออาจ "แต่ง" รายละเอียดใหม่ที่ไม่มีจริง (โลโก้เปลี่ยน) ต้องเช็กทุกครั้ง

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Diffusion / denoise step | การลบ noise ทีละขั้นจนเป็นภาพ |
| Latent | ภาพ/วิดีโอแบบบีบอัดที่โมเดลทำงานด้วย |
| T2V / I2V / V2V | text-, image-, video-to-video |
| TI2V | โมเดลเดียวที่ทำได้ทั้ง T2V และ I2V (Wan 2.2 5B) |
| First / last frame, keyframe | ภาพที่บังคับให้คลิปเริ่ม/จบ |
| Subject motion | สิ่งที่วัตถุในฉากทำ (หมุน, เดิน, ผมปลิว) |
| Camera motion | การเคลื่อนกล้อง: pan, tilt, dolly/push in, truck, orbit, crane, roll, handheld |
| Locked-off shot | กล้องนิ่งสนิท (ต้องสั่งชัดๆ มิฉะนั้นโมเดลชอบขยับเอง) |
| Motion brush / static brush | ระบายส่วนที่จะขยับ / ส่วนที่ต้องนิ่ง |
| CFG / guidance scale | ความเข้มในการทำตาม prompt |
| Negative prompt | สิ่งที่ห้ามเกิด (Wan ใช้ได้, Runway แนะนำไม่ใช้ประโยคปฏิเสธ) |
| Seed | ตัวเลขสุ่ม ล็อกไว้เพื่อทำซ้ำ/เปรียบเทียบ |
| GGUF / quantization | บีบโมเดลให้ใช้ VRAM น้อยลง แลกคุณภาพเล็กน้อย |
| Morphing | วัตถุค่อยๆ เปลี่ยนรูป/กลายเป็นอย่างอื่น |
| Warping | เส้นตรงโค้งงอ (ขอบกรอบ, ขาแว่น) |
| Flicker / boiling | พื้นผิว/แสงกระพริบเปลี่ยนทุกเฟรม |
| Frame interpolation | สร้างเฟรมแทรกระหว่างเฟรม (RIFE, FILM) |
| 2.5D / depth parallax | ภาพนิ่ง + depth map แยกชั้น แล้วขยับกล้องปลอม |
| C2PA / content credentials | metadata ที่บอกว่าไฟล์ทำด้วย AI แพลตฟอร์มอ่านแล้วติดป้ายเอง |

---

## 3. ตัวอย่างงานจริง (เลือกเครื่องมือตามช็อต)
| ช็อต | เครื่องมือที่เหมาะ | ค่าโดยประมาณ | เหตุผล |
|---|---|---|---|
| แว่นวางบนโต๊ะ กล้อง push in ช้าๆ | **2.5D** (`depth.py` + HyperFrames) | 3–4 s, ซูม 5–8% | รูปทรงแว่นเป๊ะ 100% เพราะไม่มีการ generate ใหม่ |
| ลมพัดใบไม้ แสงแดดลอดผ่าน หลังแว่น | **Wan** (`wan.py`) | 480×848, 5 s, 20 steps | ของขยับเป็นธรรมชาติ ฟรี แต่แว่นต้องอยู่นิ่ง |
| นางแบบหันหน้ามาใส่แว่น ยิ้ม | **Kling** I2V (ภาพ Codex เป็นเฟรมแรก) | 5 s, motion ต่ำ | คนขยับ/หน้า ต้องการโมเดลใหญ่ |
| แว่นหมุนจากด้านหน้าไปด้านข้าง | **Kling start/end frame** ใช้รูป kit 2 มุมจริง | 5 s | บังคับมุมปลายทางให้เป็นสินค้าจริง |
| ชื่อรุ่น/ราคา/โลโก้ลอยเข้า | **HyperFrames** | ตามจังหวะเพลง | AI เขียนตัวหนังสือพัง — ข้อความอยู่ใน HTML เสมอ |
| คลิปพักสายตา ทะเล/เมฆ | Wan T2V หรือ I2V จากภาพวิว | 5 s ต่อช็อต แล้วต่อ | ไม่มีสินค้า ความเพี้ยนไม่เป็นปัญหา |

หลักที่ทีมตัดต่อมืออาชีพใช้: **ช็อตที่สินค้าต้องตรง → อย่าให้ AI วาดสินค้าใหม่** ใช้ 2.5D หรือ composite แว่นจริงทับ ส่วน AI video ใช้กับ "สิ่งรอบสินค้า" (คน, ลม, แสง, น้ำ)

---

## 4. นำไปใช้กับเครื่องมือของเรา

### 4.1 `tools/wan.py` (Wan 2.2 TI2V 5B GGUF, ฟรี ในเครื่อง)
```
python tools/wan.py <image> "<prompt>" [out.mp4] [--seconds 5] [--size 480x848] [--steps 20] [--seed N] [--negative "..."]
```
- **สิ่งที่สคริปต์ทำเอง:** เปิด ComfyUI (`~/ComfyUI`, โหมด `--lowvram`) ถ้ายังไม่รัน, อัปโหลดภาพ, ส่ง workflow, รอ แล้วรวม PNG เป็น MP4 ที่ **24 fps** (libx264 crf 18) ด้วย ffmpeg ของโปรเจกต์
- **`--seconds`** แปลงเป็นเฟรมแบบ 4n+1 (5 s → 121 เฟรม) ยิ่งยาว ยิ่งช้าและเพี้ยน ทดสอบด้วย 2 s ก่อนเสมอ
- **`--size`** ค่าเริ่ม 480x848 (แนวตั้ง) ต้องเป็นพหุคูณของ 32 บนการ์ด 6 GB (RTX 3050) อย่าเพิ่มเกินนี้
- **`--steps`** ค่าเริ่ม 20 ใช้ 8 สำหรับร่าง/ทดสอบ prompt แล้วค่อยกลับไป 20 ตอนจริง
- **`--seed`** ไม่ใส่ = สุ่ม ใส่เมื่อต้องการเปรียบเทียบ prompt สองแบบอย่างยุติธรรม (ล็อก seed เปลี่ยนแค่คำ)
- **`--negative`** ค่าเริ่มออกแบบมาสำหรับช็อตแว่น: `text, letters, watermark, logo change, deformed glasses, warped frame, melting, extra temples, blurry, low quality, jitter, flicker, cuts, people` — **ห้ามคน** ถ้าช็อตมีนางแบบต้องส่ง `--negative` ใหม่ที่ตัดคำว่า `people` ออก
- **ค่าที่ล็อกในโค้ด:** `cfg 5.0`, `shift 8.0`, sampler `uni_pc`, scheduler `simple` ถ้าคลิปขยับแรงเกินไป ให้แก้ที่ prompt ("very subtle", "almost still") ก่อนจะไปแตะโค้ด
- เวลา: 5 s ใช้หลายนาทีต่อคลิป → สั่งทีละหลาย seed ตอนพัก แล้วเลือกตัวที่ดีที่สุด

### 4.2 Kling / Codex video (มีค่าใช้จ่าย/โควตา)
- ใช้ภาพ Codex ที่ **ไม่มีตัวหนังสือ** (กฎบ้าน) เป็นเฟรมแรก
- ช็อตหมุนแว่น: ใช้ start/end frame จากรูป kit สองมุมจริง แสงเดียวกัน พื้นหลังเดียวกัน
- คุมกล้องด้วยตัวเลือก camera ของ UI หรือเขียนเส้นทางกล้องให้ชัด (จุดเริ่ม → ทิศ → เฟรมสุดท้าย) แทนคำกว้างๆ อย่าง "cinematic camera"
- Motion brush: ระบายแว่นด้วย Static Brush แล้วให้ผม/ผ้าขยับ
- ทุกครั้งที่ใช้ Codex สร้างภาพ ต้องถามผู้ใช้ก่อน (โควตา ChatGPT)

### 4.3 2.5D (`tools/depth.py` → HyperFrames)
- `python tools/depth.py <image> [out.png]` ได้ depth map เทา (ขาว = ใกล้) จาก Depth Anything V2 small รันบน CPU
- เอา depth แยกเลเยอร์ แล้วขยับกล้องปลอมใน HyperFrames: push in / slight orbit / parallax ไม่เกิน ~8% ก่อนขอบฉากจะฉีก
- **ข้อดีสำคัญ:** กรอบแว่นไม่มีวันละลาย ข้อเสีย: ไม่มีการขยับของวัตถุจริง (ผมไม่ปลิว)
- ใช้คู่กับ Wan ได้: Wan ทำฉากหลังขยับ + แว่นจริง (cutout + lens layer) วางทับใน HyperFrames

### 4.4 ประกอบคลิปใน HyperFrames
- AI clip 5 s ใช้จริงแค่ 1.5–3 s ที่ดีที่สุด (ตัดก่อนเริ่มเพี้ยน — ส่วนท้ายคลิปมักแย่สุด)
- ตัดตาม beat, ใส่ข้อความ/โลโก้/TIMEOPTIC wordmark ในชั้น HTML
- เกรดสีรวมทั้งคลิปให้ช็อตจาก Wan/Kling/2.5D ดูมาจากกล้องเดียวกัน
- เปิดป้าย AI ตอนโพสต์ (ดูข้อ 4.5)

### 4.5 ป้าย AI บนแพลตฟอร์ม
- **TikTok:** ต้องติดป้ายเนื้อหา AI ที่ดูสมจริง (เปิด AI-generated content ก่อนโพสต์) และ TikTok อาจติดป้ายอัตโนมัติจาก metadata ซึ่งเจ้าของลบไม่ได้ เนื้อหาสมจริงที่ไม่ติดป้ายอาจถูกลบ การติดป้ายไม่ลดการกระจาย
- **Meta (FB/IG/Threads):** อาจ **บังคับ** ป้าย "AI info" เมื่อมีวิดีโอสมจริงหรือเสียงสมจริงที่ทำด้วย AI (ภาพนิ่งไม่บังคับ) และติดอัตโนมัติถ้าตรวจพบ metadata
- นโยบายร้าน: Reels ที่มี AI video → เปิดป้าย AI ทุกครั้ง (ตรงกับ memory "IG Reels 9:16 + AI label")

### 4.6 สถานะเครื่องมือ ณ 2026-11-21 (เปลี่ยนเร็ว)
- **Sora 2:** เอกสาร OpenAI ระบุว่า Sora 2 models และ Videos API **ปิดให้บริการแล้วเมื่อ 24 ก.ย. 2026** ไม่มี API ทดแทนโดยตรง ข้อมูลเดิม (คลิป 4/8/12 s, 720×1280 ฯลฯ) ใช้เป็นความรู้ประวัติเท่านั้น
- **Veo 3.1** (Gemini API, ประกาศ 15 ต.ค. 2025): first/last frame, reference images สูงสุด 3 ภาพ, รุ่น Fast ถูกกว่า
- **Runway:** แนะนำ Gen-4.5 แทน Gen-4 สำหรับงานใหม่
- **Luma:** เอกสาร Dream Machine API รุ่นเก่าถูกแทนด้วย Luma Agents API — ตรวจ endpoint ก่อนใช้

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ
1. **Wan I2V — แว่นนิ่ง ฉากรอบขยับ (ใช้ negative ค่าเริ่ม)**
   `Locked-off camera, completely static shot. The black acetate round glasses stay perfectly still and rigid on the wooden table. Soft afternoon sunlight flickers gently through leaves outside the window, thin dust particles drift slowly in the light beam. Calm, subtle motion only in the background.`
2. **Camera motion ล้วน — push in ช้า**
   `Slow, smooth dolly push-in toward the titanium eyeglass frames on dark slate, moving about ten percent closer over five seconds, ending on a close-up of the hinge. The frames themselves do not move or change shape. Steady, no shake, crisp specular highlight sliding along the rim as the camera approaches.`
3. **Subject motion — คน + แว่น (Kling, เปิด Static Brush ที่แว่น)**
   `A young Thai woman in a cream linen shirt slowly turns her head from profile to face the camera and gives a small natural smile, wearing the same tortoiseshell cat-eye glasses throughout. Her hair moves lightly in a sea breeze. Camera stays still at eye level, 85mm look, soft golden-hour backlight.`
4. **Start/end frame — แว่นหมุนระหว่างสองมุมจริง**
   `Start frame: front view of the glasses. End frame: three-quarter side view of the same glasses. The camera orbits 45 degrees to the right around the glasses at a constant slow speed; the glasses are a rigid object, temples and lenses keep their exact shape, same studio light and seamless grey background throughout.`
5. **T2V b-roll สำหรับคลิปพักสายตา (ไม่มีสินค้า)**
   `Wide shot of a calm turquoise sea at Hua Hin in the early morning, small waves rolling gently onto pale sand, thin clouds drifting slowly across a soft blue sky. Very slow pan from left to right, gentle, meditative pace, natural colours, no people, no text.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- ใช้ T2V ทำช็อตสินค้า แล้วหวังว่าแว่นจะเหมือนของจริง — ต้องใช้ I2V จากรูปจริง หรือ 2.5D
- เขียน prompt บรรยายฉากซ้ำทั้งหมด (สิ่งที่อยู่ในภาพแรกแล้ว) แทนการบรรยาย **การเคลื่อนไหว** — ใน I2V ภาพบอกฉากแล้ว prompt ควรบอกแค่ว่าอะไรขยับอย่างไร
- ไม่แยก subject motion กับ camera motion ("the glasses move around") ทำให้โมเดลเดาเอง ผลคือแว่นลอยหรือบิด
- สั่งการเคลื่อนไหวหลายอย่างในคลิป 5 วินาที (หมุน + ซูม + นางแบบเดิน + เปลี่ยนแสง) — หนึ่งช็อต หนึ่งการเคลื่อนไหวหลัก
- เปิด motion strength / CFG สูงเพื่อ "ให้ดูไดนามิก" → กรอบแว่น warp ขาแว่นงอกเพิ่ม เลนส์หาย
- ใช้คลิปเต็ม 5 วินาที ทั้งที่ 1–2 วินาทีท้ายเพี้ยนแล้ว
- ใส่ข้อความ/ราคา/โลโก้ใน prompt วิดีโอ — ตัวหนังสือจะ boil และสะกดผิด
- (wan.py) ช็อตมีคนแต่ใช้ negative ค่าเริ่มที่มี `people` → คนหาย/หน้าเพี้ยน
- (wan.py) เพิ่ม `--size` เกิน 480x848 บนการ์ด 6 GB → out of memory หรือช้ามาก
- start/end frame ที่แสงหรือพื้นหลังต่างกัน → โมเดล morph แทนการหมุน
- upscale แล้วไม่เช็กโลโก้บนขาแว่น — upscaler อาจวาดตัวอักษรใหม่
- ลืมเปิดป้าย AI บน TikTok/Meta — เสี่ยงโดนลบหรือโดนติดป้ายอัตโนมัติแบบลบไม่ได้

### วิธีแก้ artifact ที่เจอบ่อย
| อาการ | สาเหตุหลัก | วิธีแก้ |
|---|---|---|
| กรอบแว่น warp/ละลาย | วัตถุบาง สมมาตร โปร่งใส + motion แรง | ลด motion, สั่ง "rigid, does not change shape", ใช้ 2.5D หรือวางแว่นจริง (cutout) ทับ |
| ขาแว่นงอก/หาย | โมเดลเดาด้านที่มองไม่เห็น | หมุนไม่เกิน ~45°, ใช้ start/end frame จากรูปจริง |
| Flicker/boiling พื้นผิว | denoise ต่างกันทุกเฟรม, step น้อย | เพิ่ม steps (8 → 20), ลดรายละเอียดพื้นหลัง, deflicker ตอนตัดต่อ |
| หน้าคนเปลี่ยนกลางคลิป | ความจำสั้นของโมเดล | ตัดให้สั้น, ใช้ reference image, เลือก seed ที่นิ่งที่สุด |
| กล้องขยับเองทั้งที่ไม่ได้สั่ง | โมเดลชอบใส่ motion | เขียน "locked-off camera, static shot" ให้ชัด |
| ตัวหนังสือมั่ว | AI วาดตัวอักษรไม่ได้ | ภาพต้นทาง text-free, ข้อความไปอยู่ HyperFrames |

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - ใช้ภาพแว่นภาพเดียว รัน `wan.py` 2 ครั้ง seed เดียวกัน (`--seconds 2 --steps 8 --seed 7`): ครั้งแรก prompt แบบ subject motion ("the glasses rotate slowly") ครั้งที่สองแบบ camera motion ("the camera orbits slowly") แล้วเขียนว่าฉากหลังต่างกันอย่างไร
  - ตอบ: ถ้า `--seconds 3` จะได้กี่เฟรม (คำตอบ: 3×24 = 72 → ปัดเป็น 4n+1 = 73)
- **ระดับ 2 (ประยุกต์):**
  - ทำช็อตเดียวกัน "แว่นบนโต๊ะริมหน้าต่าง push in" ด้วย 3 วิธี: 2.5D, Wan, Kling (ถ้ามีโควตา — ถามก่อน)
  - ตารางเปรียบเทียบ: ความตรงของรูปทรงแว่น, ความเป็นธรรมชาติของการเคลื่อนไหว, เวลาที่ใช้, ค่าใช้จ่าย แล้วสรุปว่าช็อตแบบไหนควรใช้เครื่องมือไหน
- **ระดับ 3 (เชี่ยวชาญ):**
  - วางแผนคลิป 15 วินาที 5 ช็อตสำหรับแว่น 1 รุ่น
    - เขียน shot list: เครื่องมือ, motion (subject/camera แยกกัน), ระยะที่ใช้จริง, เฟรมเริ่ม/จบ
    - สร้าง ตัดให้เหลือช่วงดีที่สุด ประกอบใน HyperFrames พร้อมข้อความ โลโก้ wordmark เกรดสีรวม
    - ตรวจทุกเฟรมว่าแว่นไม่ warp และตรงกับสินค้าจริง ติดป้าย AI ตอนโพสต์
  - ทำซ้ำจนได้ ≥ 8/10 ตามเกณฑ์ข้อ 8 แล้วบันทึกบทเรียนใน `_craft/LEARNING-LOG.md`

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| ความตรงของสินค้า | รูปทรง สี โลโก้ ตรงของจริงทุกเฟรมที่ใช้ | เพี้ยนเล็กน้อยช่วงสั้นๆ | กรอบ warp ขาแว่นงอก/หาย |
| Motion ตรงเจตนา | subject/camera motion ตรงกับ shot list | ทำตามบางส่วน | ขยับมั่ว กล้องไหลเอง |
| Artifact | ไม่มี flicker/morph ที่สังเกตได้ | มีเล็กน้อยที่พื้นหลัง | flicker/morph ชัดที่จุดเด่น |
| ความต่อเนื่องข้ามช็อต | สี แสง สินค้า เหมือนมาจากกล้องเดียว | ต่างกัน 1 ช็อต | ดูเป็นคนละคลิปปะกัน |
| การประกอบและกฎแพลตฟอร์ม | ตัดตรงจังหวะ ข้อความอยู่ใน HTML ติดป้าย AI | ขาดหนึ่งอย่าง | มีตัวหนังสือ AI มั่ว หรือไม่ติดป้าย AI |

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- Wan 2.2 (โมเดลที่เราใช้):
  - GitHub — [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) (TI2V-5B 720p 24 fps, 1280×704)
  - Hugging Face — [Wan-AI/Wan2.2-TI2V-5B](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B)
  - Hugging Face — [Wan-AI/Wan2.2-TI2V-5B-Diffusers](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B-Diffusers)
- ComfyUI:
  - ComfyUI docs — [Wan2.2 tutorial](https://docs.comfy.org/tutorials/video/wan/wan2_2) (5B ลง 8 GB ด้วย native offloading)
  - Comfy hub — [Wan 2.2 5B Video Generation workflow](https://comfy.org/hub/workflows/wan-2-2-5b-video-generation-f83ee3caa04e/)
  - ComfyUI Wiki — [Wan2.2 Workflows: T2V, I2V and GGUF](https://comfyui-wiki.com/en/tutorial/advanced/video/wan2.2/wan2-2)
- Kling:
  - Kling (ทางการ) — [How to animate image parts (Motion Brush)](https://kling.ai/ar/quickstart/how-to-animate-image-parts)
  - Higgsfield — [Kling Start End Frames](https://higgsfield.ai/blog/Kling-Start-End-Frames) (บุคคลที่สาม)
  - Pollo AI — [How to use Kling AI camera movement](https://pollo.ai/hub/how-to-use-kling-ai-camera-movement) (บุคคลที่สาม)
- Runway:
  - Runway Help — [Gen-4 Video Prompting Guide](https://help.runwayml.com/hc/en-us/articles/39789879462419)
  - Runway Help — [Image to Video Prompting Guide](https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide)
  - Runway Help — [Camera terminology library](https://help.runwayml.com/hc/en-us/articles/46749315925395)
  - Runway — [AI video prompting guide](https://runwayml.com/resources/ai-video-prompting-guide)
- Luma:
  - Luma docs — [Video Generation (keyframes frame0/frame1)](https://docs.lumalabs.ai/docs/video-generation)
  - Luma — [Launching Camera Motion Concepts](https://lumalabs.ai/changelog/camera-motion-concepts-launch)
- Google Veo:
  - Gemini API docs — [Generate videos with Veo 3.1](https://ai.google.dev/gemini-api/docs/veo?hl=en)
  - Google Developers Blog — [Introducing Veo 3.1 and new creative capabilities in the Gemini API](https://developers.googleblog.com/en/introducing-veo-3-1-and-new-creative-capabilities-in-the-gemini-api/)
  - Google Cloud — [Generate videos from first and last frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames)
- OpenAI Sora:
  - OpenAI docs — [Video generation guide](https://developers.openai.com/api/docs/guides/video-generation) (ระบุการปิดบริการ 24 ก.ย. 2026)
  - OpenAI API reference — [Videos: create](https://developers.openai.com/api/reference/resources/videos/methods/create)
- ป้าย AI บนแพลตฟอร์ม:
  - TikTok Support — [About AI-generated content](https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content)
  - Meta Help — [How to identify AI content on Meta products](https://www.meta.com/en-gb/help/artificial-intelligence/1783222608822690/)
  - Meta Newsroom — [Expanding GenAI Transparency for Meta's Ads Products](https://about.fb.com/news/2025/02/gen-ai-transparency-metas-ads-products/)
- หมายเหตุ:
  - ข้อมูล Kling ส่วนใหญ่มาจากเว็บบุคคลที่สาม (ยกเว้นหน้า Motion Brush) ฟีเจอร์ต่างกันตามรุ่นและแพลตฟอร์ม ตรวจใน UI จริงก่อนใช้
  - ตัวเลข VRAM ของ Wan ที่ความละเอียดต่างๆ มาจากชุมชน ไม่ใช่เอกสารทางการ ค่า 480×848 ของเราได้จากการทดลองบน RTX 3050 6 GB
  - หัวข้อ lip-sync, upscaling และ frame interpolation (RIFE/FILM) เป็นแนวปฏิบัติทั่วไปของวงการ ยังไม่ได้แนบแหล่งทางการในรอบตรวจนี้
  - ค่าใน wan.py (cfg 5.0, shift 8.0, uni_pc, 24 fps, 4n+1 เฟรม) อ่านจากโค้ดในโปรเจกต์ ณ วันที่ตรวจ
