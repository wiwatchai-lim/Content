# บทที่ 12 — Commercial Production & Quality Control (การผลิตงานโฆษณาและการตรวจคุณภาพ)

> เป้าหมาย: ทำงานโฆษณา 1 ชิ้นได้ครบวงจร ตั้งแต่ brief → กลยุทธ์ → pre-production → ผลิต → post → ส่งมอบ แล้ว **ตรวจก่อนปล่อย** ด้วย checklist เดียวกันทุกครั้ง (เทคนิค, แบรนด์, ความตรงของสินค้า, ร่องรอย AI, กฎหมาย) และ **วัดผลหลังปล่อย** เพื่อรู้ว่าชิ้นต่อไปควรแก้ตรงไหน
> ตรวจแหล่งอ้างอิงเมื่อ 2026-11-21

---

## 1. ทฤษฎี

### 1.1 พื้นฐาน — 6 เฟสของงานโฆษณา
งานโฆษณาไม่ได้เริ่มที่กล้องหรือ prompt แต่เริ่มที่ "ปัญหาทางธุรกิจ" ถ้าข้ามเฟสแรก ๆ งานจะสวยแต่ขายไม่ได้

| เฟส | คำถามที่ต้องตอบ | สิ่งที่ส่งออก (deliverable) |
|---|---|---|
| **1. Brief** | ขายอะไร ให้ใคร อยากให้เขาทำอะไร (ทักแชท/มาร้าน) วัดผลด้วยอะไร งบ/กำหนดส่ง | brief 1 หน้า |
| **2. Creative strategy** | insight ของลูกค้าคืออะไร มุมเล่า (angle) ไหน hook อะไร CTA อะไร | 1–3 concept + key message |
| **3. Pre-production** | ภาพหน้าตาแบบไหน ถ่าย/สร้างช็อตอะไรบ้าง ใคร เมื่อไร ใช้เงินเท่าไร | moodboard, shot list, call sheet, budget, schedule |
| **4. Production** | ได้วัตถุดิบครบตาม shot list ไหม | ไฟล์ดิบ, ภาพ AI, เสียง, cutout แว่นจริง |
| **5. Post-production** | ตัดต่อ เกรดสี เสียง ตัวอักษร ซับ | master + ไฟล์แยกตามแพลตฟอร์ม |
| **6. Delivery** | ผ่าน QC ไหม ตั้งชื่อไฟล์ถูกไหม เก็บต้นฉบับไว้ที่ไหน | ไฟล์ส่งมอบ + archive + แผนวัดผล |

**Brief ที่ดี** ตอบ 7 ข้อได้ในหน้าเดียว:
1. Objective — เช่น "ได้แชทถามราคาเลนส์โปรเกรสซีฟ" (ไม่ใช่ "ให้คนรู้จัก")
2. Audience — เช่น "อายุ 45+ ในหัวหิน เริ่มอ่านมือถือไม่ชัด"
3. Single-minded message — ประโยคเดียวที่อยากให้จำ
4. Proof — ทำไมต้องเชื่อ (วัดสายตาโดยนักทัศนมาตร, แบรนด์กรอบจริงในร้าน)
5. Offer/CTA — ราคา/โปร (**ทีมเราไม่มีไฟล์ราคา ต้องถามทุกครั้ง** ดู [CLAUDE.md](../../../CLAUDE.md) "Notes")
6. Mandatories — โลโก้, ภาษา, ข้อห้ามทางกฎหมาย
7. KPI + งบ + วันส่ง

### 1.2 Pre-production — เอกสาร 5 ชิ้น
- **Moodboard:** ภาพอ้างอิง 6–12 ภาพ บอกแสง สี องค์ประกอบ ฟอนต์ (ไม่ใช่ภาพที่จะ copy) ทีมเราใช้ "style profile" ใน `kits/` เป็น moodboard อยู่แล้ว
- **Shot list:** ตารางทุกช็อต — เลขช็อต, ขนาดภาพ (CU/MS/WS), มุมกล้อง, การเคลื่อนไหว, ความยาว (วินาที), เสียง/ข้อความบนจอ, วิธีได้มา (ถ่ายจริง / FLUX / Codex / Wan / 2.5D)
- **Call sheet:** ใบนัดวันถ่าย — เวลา สถานที่ ใครต้องมา สินค้าชิ้นไหน (รหัสกรอบ) อุปกรณ์ เบอร์ติดต่อ (สำหรับงาน AI ล้วนให้แทนด้วย "generation sheet": prompt, seed, ไฟล์อ้างอิงที่แนบ `-i`, quota ที่จะใช้)
- **Budget:** ค่าคน, ค่าสถานที่, ค่าเพลง, quota Codex (ทุกครั้งที่ `codex exec` สร้างภาพต้องขออนุญาตก่อน), ค่าโฆษณา (media spend) แยกจากค่าผลิต
- **Schedule:** ย้อนจากวันปล่อยแอด — ให้เผื่อ 1 วันสำหรับ QC + แก้ และ 1–2 วันสำหรับการรีวิวโฆษณาของแพลตฟอร์ม

### 1.3 ขั้นสูง — Hook, โครงเรื่องสั้น และ CTA
- **3 วินาทีแรกคือทั้งหมด** ในฟีดแนวตั้ง คนตัดสินใจเลื่อนผ่านภายในไม่กี่วินาที โครงที่ใช้ได้กับ 15–30 วินาที:
  `Hook (0–3 s) → Problem/Desire (3–8 s) → Product/Proof (8–20 s) → Offer + CTA (ช่วงท้าย 3–5 s)`
- **ประเภท hook:** คำถามตรงใจ ("อ่านเมนูต้องยื่นมือออกไปไกล?"), ภาพแปลกตา (punch-in แว่นจนเห็นบานพับ), before/after, ตัวเลข, เสียงที่สะดุดหู ต้องมี **ทั้งภาพและข้อความบนจอ** เพราะคนจำนวนมากดูแบบปิดเสียง
- **CTA ต้องตรงกับ objective:** แอดหาแชท → "ทักแชทเช็กราคา" (ใช้ปุ่ม Send Message) ไม่ใช่ "ติดตามเพจ"
- **Ad formats:**
  - TikTok In-Feed / Spark Ads (โปรโมตโพสต์ออร์แกนิกเดิม)
  - Meta: Feed, Stories, Reels (ไฟล์ 9:16 ไฟล์เดียวใช้ได้หลาย placement ถ้าออกแบบตาม safe zone ของ Reels)
  - YouTube: Shorts ads, in-stream (16:9), Demand Gen
- **Master ครั้งเดียว ตัดหลายสัดส่วน:** ออกแบบ 9:16 (1080×1920) เป็นหลัก วางสาระสำคัญไว้กลางภาพ แล้วค่อยครอปเป็น 4:5 / 1:1 / 16:9

### 1.4 ขั้นสูง — สเปกและ Safe zone ที่ตรวจแล้ว
| แพลตฟอร์ม | สิ่งที่แหล่งทางการบอก | หมายเหตุ |
|---|---|---|
| TikTok In-Feed | 9:16 แนะนำ; หน้า help ทางการบอกว่า **safe zone ขึ้นกับสัดส่วนภาพ ความยาว caption และ format เสริม** และมี template ให้ดาวน์โหลด | ตัวเลข % ที่เว็บอื่นอ้างเป็นการวัดของบุคคลที่สาม — ใช้ template จริงเสมอ |
| Meta Reels/Stories | 9:16; Ads Manager มีตัวช่วย "safe zone" แสดงกรอบ | ตัวเลขขอบ (เช่น บน 14% ล่าง 35%) มาจากแหล่งรอง และขัดกันเอง → ตรวจกับ preview ใน Ads Manager |
| YouTube Shorts ads | Google แนะนำวิดีโอแนวตั้ง และแอดสั้นกว่า 60 วินาที | ดูหน้า Video ads specs ของ Google Ads |

กฎทีมเรา: ข้อความ/ราคา/โลโก้พาร์ทเนอร์ ต้องไม่อยู่ใต้ปุ่มด้านขวา หรือใต้ caption/ปุ่ม CTA ด้านล่าง (ดู memory IG Reels: text in safe zone)

### 1.5 ขั้นสูง — เสียงและ Loudness
- มาตรฐานการวัดคือ **ITU-R BS.1770** (หน่วย LUFS = LKFS, 1 LU = 1 dB); **EBU R 128** ใช้การวัดนี้ ตั้งเป้าออกอากาศที่ **−23 LUFS** และ true peak ไม่เกิน −1 dBTP
- โซเชียลไม่ใช่ทีวี: บริการสตรีมมิ่งหลายแห่งปรับเสียงรอบ **−14 LUFS** (YouTube ไม่ได้เผยสเปกทางการ ตัวเลขนี้มาจากการวัดของชุมชน) ทีมเราจึงใช้ `loudnorm=I=-14:TP=-1.5:LRA=11` ตอน export ตาม [FX.md §2.3](../FX.md)
- เสียงพูดต้องชัดกว่าเพลง (เพลงคลอใต้เสียงพูดราว −24 LUFS ตาม FX.md)

### 1.6 ขั้นสูง — กฎหมายและสิทธิ์ (อ่านให้ครบก่อนปล่อยแอด)
- **เพลง:**
  - บน TikTok ธุรกิจต้องใช้ **Commercial Music Library (CML)** ซึ่งเคลียร์สิทธิ์ไว้แล้ว ส่วน General Music Library ไม่ได้เคลียร์สำหรับเนื้อหาเชิงพาณิชย์
  - แหล่งรองระบุว่าสิทธิ์ CML ใช้ได้เฉพาะบน TikTok ถ้าเอาคลิปเดียวกันไปลง IG/YouTube ต้องเคลียร์เพลงใหม่
  - กฎบ้านเรา: ผู้ใช้ใส่เพลงเอง ([CLAUDE.md](../../../CLAUDE.md)) ทีมผลิตส่ง **ไฟล์ไม่มีเพลง + ไฟล์ SFX/VO แยก**
- **Creative Commons:**
  - **CC BY** ใช้เชิงพาณิชย์ได้ ถ้าให้เครดิตตามที่เจ้าของกำหนด ใส่ลิงก์ license และบอกว่าแก้ไขอะไร
  - **NC** = ห้ามใช้เชิงพาณิชย์ (แอด = เชิงพาณิชย์)
  - **CC0** ไม่ต้องให้เครดิต (`sfxlib/` ของเราเป็น CC0)
  - CC ไม่ได้ครอบคลุมสิทธิ์อื่น เช่น สิทธิ์ในภาพลักษณ์บุคคล (publicity/privacy)
- **Model / property release:**
  - คนจริงที่เห็นหน้าในแอด (พนักงาน ลูกค้า) ต้องมีหนังสือยินยอมเป็นลายลักษณ์อักษรว่าใช้ในโฆษณาได้ ช่องทางไหน นานเท่าไร
  - ถ่ายในสถานที่เอกชนหรือมีโลโก้ร้านอื่น ต้องขออนุญาตเจ้าของ
  - โลโก้แบรนด์กรอบ (`brand/partner-logos/`) ใช้ตามข้อตกลงกับแบรนด์
  - ข้อนี้เป็นแนวปฏิบัติทั่วไปของวงการ ไม่ใช่คำแนะนำทางกฎหมาย ถ้าไม่แน่ใจให้ถามนักกฎหมาย
- **AI disclosure:**
  - **TikTok:** ต้องติดป้ายเนื้อหา AI ที่มีภาพ เสียง หรือวิดีโอสมจริง และ TikTok อาจติด auto label ซึ่งเอาออกไม่ได้
  - **Meta:** แสดง "AI info" กับภาพแอดที่สร้างหรือแก้มากด้วยเครื่องมือ AI ของ Meta และประกาศว่าจะตรวจจับเครื่องมือ AI ภายนอกผ่าน industry-standard signals
    - ถ้าเป็นภาพคนสมจริงที่ AI สร้าง ป้ายจะอยู่ข้าง "Sponsored"
    - การแก้เล็กน้อย เช่น ย่อขนาดหรือแก้สี ไม่ทำให้ติดป้าย
  - กฎทีม: เปิด AI label ทุกครั้งที่มีภาพ AI สมจริง (memory "IG Reels 9:16 + AI label")
- **โฆษณาสินค้าทางสายตาในไทย (ระวังที่สุด):**
  - ไทยมี **พระราชบัญญัติเครื่องมือแพทย์ พ.ศ. 2551** (ราชกิจจานุเบกษา 5 มี.ค. 2551)
  - อย. ย้ำว่าการโฆษณาเครื่องมือแพทย์ต้องได้รับอนุญาตก่อน ข่าวการปราบโฆษณาเครื่องมือแพทย์เสริมความงามที่ผิดกฎหมายระบุโทษ **จำคุกไม่เกิน 6 เดือน หรือปรับ 5 หมื่นบาท**
  - คำขออนุญาตโฆษณาผลิตภัณฑ์สุขภาพยื่นผ่านระบบ **e-Submission** ของ อย. และปรึกษาก่อนผ่าน **e-Consult** ได้
  - ประชาชนตรวจใบอนุญาตโฆษณาได้ที่เว็บ อย. และร้องเรียนได้ที่สายด่วน 1556
  - คอนแทคเลนส์ต้องมีเครื่องหมาย อย. บนกล่อง
  - **สิ่งที่เรายังไม่ได้ยืนยันจากแหล่งทางการ:** มาตราที่ว่าด้วยการโฆษณา และกรอบแว่น/เลนส์สายตาประเภทใดต้องขออนุญาตโฆษณา
  - **แนวปฏิบัติทีม:**
    - ห้ามอ้างผลการรักษา เช่น "รักษาสายตาสั้น" "หยุดสายตาสั้นเด็ก 100%" "ป้องกันต้อ"
    - ห้ามใช้ตัวเลขทางการแพทย์ที่ไม่มีเอกสารรองรับ
    - ใช้คำบรรยายคุณสมบัติที่ผู้ผลิตรับรองแทน เช่น "เลนส์กรองแสง UV400 ตามสเปกผู้ผลิต"
    - แอดคอนแทคเลนส์หรือแอดที่มีคำกล่าวอ้างทางสุขภาพ ให้ปรึกษา อย. ผ่าน e-Consult ก่อนเสมอ

### 1.7 ขั้นสูง — QC, Versioning, Archive, วัดผล
- **QC คือด่านสุดท้าย ไม่ใช่ความรู้สึก:** ใช้ checklist ข้อ 8 ทุกชิ้น และให้คนที่ไม่ได้ทำชิ้นนั้นเป็นผู้ตรวจ (fresh eyes)
- **Versioning:** ตั้งชื่อ `YYYY-MM-DD_<frame>_<concept>_<ratio>_v03.mp4` อย่าใช้ `final_final2.mp4`
  - เปลี่ยน v เมื่อเนื้อหาเปลี่ยน
  - ใส่ `_A` / `_B` เมื่อเป็นตัวแปรสำหรับทดสอบ (A/B test ทีละตัวแปร เช่น hook เท่านั้น)
- **Archive:**
  - เก็บ kit (prompt, seed, ภาพอ้างอิง, cutout) ไว้คู่กับ export
  - บันทึกบทเรียนใน [LEARNING-LOG.md](../LEARNING-LOG.md)
  - เก็บไฟล์ release และหลักฐานสิทธิ์เพลงไว้ในโฟลเดอร์เดียวกับงาน
- **ตัวชี้วัด** (สูตรด้านล่างเป็นสูตรที่วงการนิยมใช้ ไม่ใช่ชื่อ metric ทางการของทุกแพลตฟอร์ม):
  - **Hook rate** ≈ วิว 3 วินาที ÷ impressions → วัดว่า 3 วินาทีแรกได้ผลไหม
  - **Hold rate** ≈ ThruPlay (หรือวิว 15 วินาที) ÷ วิว 3 วินาที → วัดกลางเรื่อง
  - **CTR (link)** = คลิก ÷ impressions → วัดแรงจูงใจของ offer/CTA
  - **Cost per chat** = ค่าโฆษณา ÷ จำนวนแชทที่เริ่ม → KPI จริงของร้านเรา (ดูได้ด้วย skill `ads-meta`)
  - วิธีอ่าน:
    - hook ต่ำ → แก้ 3 วินาทีแรก
    - hook ดีแต่ hold ต่ำ → แก้กลางเรื่อง
    - hold ดีแต่ CTR ต่ำ → แก้ offer/CTA
    - CTR ดีแต่ cost/chat สูง → แก้กลุ่มเป้าหมายหรือข้อความทักแชท

---

## 2. คำศัพท์และเทคนิคที่ต้องรู้
| คำ | ความหมายสั้น |
|---|---|
| Brief / Creative brief | เอกสาร 1 หน้าบอกเป้าหมาย กลุ่มเป้าหมาย ข้อความ ข้อบังคับ KPI |
| Insight / Angle | ความจริงในใจลูกค้า / มุมเล่าที่หยิบ insight มาใช้ |
| Moodboard | ภาพอ้างอิงกำหนดหน้าตา (ไม่ใช่ภาพให้ copy) |
| Shot list / Storyboard | ตารางช็อต / ภาพร่างเรียงช็อต |
| Call sheet | ใบนัดวันถ่าย: ใคร ที่ไหน เมื่อไร อะไร |
| Master / Cutdown | ไฟล์หลัก / เวอร์ชันสั้นหรือสัดส่วนอื่นที่ตัดจาก master |
| Safe zone | พื้นที่ที่ UI ของแอป (ปุ่ม, caption) ไม่บัง |
| Spark Ads | แอด TikTok ที่โปรโมตโพสต์ออร์แกนิกที่มีอยู่ |
| Hook / CTA | ตัวดึงความสนใจช่วงต้น / คำชวนให้ทำ action |
| LUFS, true peak (dBTP) | ความดังตามการรับรู้ / พีคจริงหลังแปลงเป็นอนาล็อก |
| CML | Commercial Music Library ของ TikTok สำหรับธุรกิจ |
| CC BY / NC / CC0 | ต้องให้เครดิต / ห้ามเชิงพาณิชย์ / สละสิทธิ์ |
| Model / property release | หนังสือยินยอมใช้ภาพบุคคล / สถานที่หรือทรัพย์สิน |
| AI info / AI-generated label | ป้ายเปิดเผยว่าเนื้อหาสร้างหรือแก้ด้วย AI |
| e-Submission / e-Consult (อย.) | ระบบยื่นขออนุญาต / ปรึกษาเรื่องโฆษณาผลิตภัณฑ์สุขภาพ |
| QC / Fresh eyes | การตรวจคุณภาพ / ให้คนที่ไม่ได้ทำงานชิ้นนั้นตรวจ |
| Versioning | ระบบตั้งชื่อและเลขเวอร์ชันไฟล์ |
| Hook rate, Hold rate, CTR, Cost per chat | ตัวชี้วัดช่วงต้น / ช่วงกลาง / การคลิก / ต้นทุนต่อแชท |
| A/B test | เทียบ 2 เวอร์ชันที่ต่างกันทีละตัวแปร |

---

## 3. ตัวอย่างงานจริง (ขั้นตอนที่ใช้จริง)
| งาน | Brief ย่อ | Pre-production | Delivery + QC จุดเสี่ยง |
|---|---|---|---|
| Beat clip กรอบใหม่ (TikTok/Reels) | "ให้คนทักถามรุ่นนี้" อายุ 20–35 | `frame-kit` → cutout + style profile, shot list 8–12 ช็อต: มุมหน้า/ข้าง/punch-in บานพับ | 9:16, ไม่มีเพลง (ผู้ใช้ใส่เอง), wordmark TIMEOPTIC เคลื่อนไหว, โลโก้แบรนด์มุมซ้ายบน, เลนส์ไม่โบ๋ |
| คลิปโปรโมตหัวหิน ภาษาไทย VO | "ลูกค้าแถวหัวหินมาตรวจสายตา" 40+ | สคริปต์ไทย → TTS (Puck), ซีน Codex 3 ฉาก (ขออนุญาตใช้ quota) | ซับไทยสะกดถูก, −14 LUFS, ห้ามอ้าง "รักษา", ถามราคา/โปรก่อนใส่ |
| ภาพโปรโมต feed 3 ภาพ | "รับรู้ว่ามีแบรนด์ X ที่ร้าน" | moodboard cinematic, prompt Codex แนบภาพกรอบจริง `-i` | แว่นในภาพตรงกับกรอบจริง, โลโก้พาร์ทเนอร์ด้านบน, AI label |
| Reel จาก carousel เรื่องสั้น | "ให้คนกดติดตามช่อง" | ใช้สไลด์เดิม + เพลง | 9:16, ข้อความใน safe zone, AI label ON |
| แอดคอนแทคเลนส์ (ถ้ามี) | "ขายคอนแทครายเดือน" | ตรวจสถานะ อย. ของสินค้าก่อนเขียนสคริปต์ | ปรึกษา อย. (e-Consult) ก่อนผลิต ไม่มีคำอ้างทางการแพทย์ |

ทีมมืออาชีพ **เขียน QC checklist ก่อนผลิต** ไม่ใช่หลังผลิต เพราะ checklist บังคับให้ shot list มีมุมรายละเอียดแว่นตั้งแต่แรก

---

## 4. นำไปใช้กับ AI Image / Video
1. **Brief → prompt pack ไม่ใช่ prompt เดียว:**
   - หนึ่ง concept = ชุด prompt ที่ใช้คำบรรยายแสง สี เลนส์ เดียวกัน (ล็อก "style block") ต่างกันแค่ action/มุม
   - งานจึงดูเป็นแคมเปญเดียว ไม่ใช่ภาพสุ่ม 5 ใบ
2. **สร้างภาพไม่มีตัวอักษร (text-free):**
   - ข้อความ ราคา โลโก้ อยู่ในเลเยอร์ HTML เสมอ (กฎบ้าน) เพราะ AI สะกดผิดและแก้ทีหลังไม่ได้
   - ใส่ `no text, no letters, no logos` ทุก prompt
3. **ความตรงของสินค้า (product accuracy) คือข้อตายตัว:**
   - แว่นในภาพ AI ต้องเหมือนกรอบจริง: รูปทรงเลนส์ สี วัสดุ บานพับ หมุด ลายขา
   - วิธีของเรา:
     - แนบรูปจริง (Codex `-i`) หรือคอมโพสิต cutout จริงทับฉาก AI
     - ถ้า AI วิดีโอเติมหมุดหรือจุดที่ไม่มีจริง ใช้ skill `remove-spots`
     - cutout ต้องมีเลเยอร์เลนส์
4. **AI-artifact check** (ซูม 200% ดูทีละเฟรมในช่วงสำคัญ):
   - มือ/นิ้วเกินหรือขาด
   - แว่นละลายเข้ากับหน้า
   - ขาแว่นทะลุหู
   - เลนส์สะท้อนผิดทิศกับไฟ
   - ตัวอักษรมั่วบนป้ายพื้นหลัง
   - ใบหน้าเปลี่ยนระหว่างช็อต
   - วิดีโอ: วัตถุกระพริบ (flicker), เกรนเดือด (boiling), ฟิสิกส์ผิด
5. **Prompt ที่รู้ว่าจะไปลงที่ไหน:**
   - ใส่ `vertical 9:16 composition, subject centered, empty space at top and bottom for text` เพื่อเว้น safe zone ตั้งแต่ตอนสร้าง
   - ถ้ารอให้ไปครอปทีหลัง มักตัดหัวแว่น
6. **AI disclosure ตั้งแต่ตอนเก็บไฟล์:**
   - บันทึกใน kit ว่าภาพไหนเป็น AI (FLUX/Codex/Wan) เพื่อเปิดป้ายถูกตอนอัปโหลด
   - อย่าพยายามลบ metadata เพื่อเลี่ยงป้าย
7. **Generation sheet แทน call sheet:**
   - จด prompt, seed, โมเดล, ขนาด, ไฟล์ที่แนบ, เวลา, quota ที่ใช้
   - ทำให้ทำซ้ำหรือแก้เวอร์ชันได้ (versioning ของงาน AI)

---

## 5. ตัวอย่าง Prompt (อังกฤษ) 5 แบบ
1. **Hook frame (3 วินาทีแรก) — punch-in รายละเอียด**
   `Extreme macro close-up of the hinge of a matte black titanium eyeglass frame, a single sharp specular highlight sliding along the rim, deep charcoal background, 100mm macro at f/8, vertical 9:16 composition with the hinge centered and clean empty space at top and bottom for overlay text, no text, no letters, no logos.`
2. **Product/Proof shot — ต้องตรงกับกรอบจริง (แนบภาพกรอบด้วย `-i`)**
   `Use the attached photo as the exact product reference: keep the frame shape, color, rim thickness, hinge and temple pattern identical. Place these glasses on a light oak counter in a calm, softly lit optical shop, soft window light from the left at 5200K, realistic clear lenses with subtle reflections, vertical 9:16, glasses in the middle third, no text, no logos, do not add rivets or details that are not in the reference.`
3. **Lifestyle model (คนสมจริง → ต้องเปิด AI label)**
   `A Thai woman in her late 40s reading a phone menu at a seaside café in Hua Hin, wearing thin gold round eyeglasses, relaxed smile, golden hour backlight, 85mm f/2, natural skin texture, vertical 9:16 with her face in the upper-middle and the lower third kept calm and uncluttered, no text, no logos.`
4. **CTA end card background (เรียบเพื่อวางข้อความ)**
   `Minimal end-card background: soft warm beige paper texture with a gentle vignette, a faint shadow of eyeglasses falling from the top right, large calm empty center area for a headline and a "message us" button, vertical 9:16, no text, no letters, no logos.`
5. **QC/self-check prompt สำหรับ LLM ตรวจภาพ (ใช้กับ Claude/Codex ที่ดูภาพได้)**
   `You are a strict ad QC reviewer. Compare image A (real product photo) and image B (AI ad frame). List every difference in frame shape, color, rim thickness, hinge, nose pads, temple pattern and lens tint. Then list AI artifacts (hands, ears, lens reflections, warped text, extra objects). Then check whether any important element sits in the top 15% or bottom 35% of a 9:16 frame. Answer as a numbered checklist with PASS or FAIL per item.`

---

## 6. ข้อผิดพลาดที่พบบ่อย
- เริ่มทำภาพก่อนมี brief ทำให้ได้ภาพสวยแต่ไม่รู้ว่าวัดผลด้วยอะไร
- Hook เป็นโลโก้หรือชื่อร้านในวินาทีแรก (คนยังไม่สนใจแบรนด์ แต่สนใจปัญหาตัวเอง)
- CTA ไม่ตรงกับ objective เช่น แอดหาแชทแต่จบด้วย "กดติดตาม"
- วางราคา/ข้อความใต้ปุ่มหรือ caption ของแอป เพราะไม่เปิด safe zone template ตรวจ
- ส่งไฟล์ 16:9 ไปลง Reels/TikTok หรือ export 720p ทั้งที่ master เป็น 1080×1920
- เสียงดังไม่เท่ากันระหว่างคลิป (บางชิ้นดังเกิน clip บางชิ้นเบาจนต้องเร่ง) เพราะไม่ทำ loudnorm
- ใช้เพลงฮิตจาก General Music Library หรือเพลงจาก YouTube ในแอด / ใช้ภาพ CC BY-NC ในงานขาย
- ใช้หน้าลูกค้าหรือพนักงานโดยไม่มีหนังสือยินยอม
- เขียนคำอ้างทางการแพทย์ เช่น "รักษาสายตาสั้น" "ป้องกันต้อกระจก 100%" "แพทย์รับรอง" โดยไม่มีเอกสารและไม่ได้ตรวจกับ อย.
- สะกดผิดในซับไทย/อังกฤษ (โดยเฉพาะชื่อแบรนด์กรอบ) เพราะไม่มีคนที่สองตรวจ
- (AI) แว่นในภาพ AI ไม่เหมือนกรอบจริง ลูกค้ามาร้านแล้วไม่เจอรุ่นนั้น ทำให้เสียความเชื่อถือ
- (AI) ปิด/ไม่เปิดป้าย AI กับภาพคนสมจริง
- (AI) ไม่จด prompt/seed ทำให้แก้เวอร์ชันต่อไม่ได้
- ตั้งชื่อไฟล์ `final_v2_ใหม่จริง.mp4` แล้วอัปโหลดผิดเวอร์ชัน
- ตัดสินแอดจากยอดไลก์ แทน cost per chat

---

## 7. แบบฝึกหัด 3 ระดับ
- **ระดับ 1 (เข้าใจ):**
  - เขียน brief 1 หน้า (7 ข้อในหัวข้อ 1.1) สำหรับ "เลนส์โปรเกรสซีฟ ลูกค้า 45+ หัวหิน"
  - จากแอดสมมุติ: impressions 20,000 · วิว 3 s 5,000 · ThruPlay 1,000 · คลิก 200 · ค่าแอด 1,500 บาท · แชท 30 → คำนวณ hook rate, hold rate, CTR, cost per chat แล้วบอกว่าควรแก้ส่วนไหน (คำตอบ: 25%, 20%, 1%, 50 บาท/แชท — hook ดี, hold ต่ำ → แก้กลางเรื่อง)
  - จัดกลุ่มประโยคเหล่านี้เป็น "ใช้ได้ / ต้องตรวจกับ อย. / ห้ามใช้": "กรอบไทเทเนียมน้ำหนักเบา", "เลนส์ชะลอสายตาสั้นเด็ก", "รักษาตาขี้เกียจหายขาด", "วัดสายตาโดยนักทัศนมาตร"
- **ระดับ 2 (ประยุกต์):**
  - ทำ pre-production ครบ 5 ชิ้น (moodboard, shot list, generation sheet, budget รวม quota, schedule) ของ beat clip 15 วินาที 1 กรอบจาก `frame-kit`
  - ผลิตจริง แล้ว export 9:16 + cutdown 1:1
  - ตรวจด้วย checklist ข้อ 8 โดยให้เพื่อนในทีมเป็นผู้ตรวจ
- **ระดับ 3 (เชี่ยวชาญ):**
  - ทำแคมเปญ A/B: 1 concept, 2 hook (A = คำถาม, B = macro punch-in) ที่ส่วนอื่นเหมือนกันทุกเฟรม
  - เตรียม delivery package ครบ:
    - ไฟล์ตามมาตรฐานตั้งชื่อ
    - kit + prompt/seed
    - หลักฐานสิทธิ์เพลง/release
    - บันทึกป้าย AI
  - หลังรันแอด 3–7 วัน ดึงผลด้วย `ads-meta` เทียบ hook rate และ cost per chat เขียนบทเรียนลง LEARNING-LOG
  - ต้องได้ ≥ 8/10 ตามเกณฑ์ข้อ 8

---

## 8. เกณฑ์ประเมินผลงาน (10 คะแนน)
| เกณฑ์ | 2 = ดี | 1 = พอใช้ | 0 = ไม่ผ่าน |
|---|---|---|---|
| Brief & strategy | objective วัดได้, hook และ CTA ตรง objective | มีแต่คลุมเครือ | ไม่มี brief / CTA ผิดเป้า |
| Technical QC | 1080×1920 (หรือสัดส่วนที่ถูก), fps คงที่ตาม master, −14 LUFS / TP ≤ −1.5, ข้อความใน safe zone, ซับครบและสะกดถูก | พลาด 1 ข้อเล็ก | ถูก UI บัง / เสียงเพี้ยน / สะกดชื่อแบรนด์ผิด |
| Brand QC | wordmark TIMEOPTIC, โลโก้พาร์ทเนอร์ถูกตำแหน่ง, สี/ฟอนต์ตาม kit, ภาษาตามกฎ (อังกฤษ เว้นซีรีส์ที่กำหนดเป็นไทย) | เพี้ยนเล็กน้อย | โลโก้ผิด/หาย หรือใช้โลโก้ที่ไม่มีสิทธิ์ |
| Product accuracy & AI artifacts | แว่นตรงกับกรอบจริงทุกจุด, มีเลนส์, ไม่มี artifact ที่มองเห็น | ต่างเล็กน้อยที่ไม่ใช่จุดขาย | รูปทรง/สีแว่นผิด หรือมี artifact ชัด |
| Legal & delivery | เพลง/CC/release ถูกต้อง, ป้าย AI ถูก, ไม่มีคำอ้างทางการแพทย์ที่ไม่มีหลักฐาน, ไฟล์ตั้งชื่อ + archive ครบ | เอกสารไม่ครบ 1 อย่าง | เพลงไม่มีสิทธิ์ / อ้างรักษาโรค / ไม่เปิดป้าย AI กับคนสมจริง |

**QC checklist ฉบับพกพา (ติ๊กก่อนกดเผยแพร่):**
- [ ] สัดส่วนและความละเอียดถูกตามแพลตฟอร์ม, เล่นได้ทั้งไฟล์ ไม่มีเฟรมดำ/กระตุก
- [ ] Loudness −14 LUFS, true peak ≤ −1.5 dBTP ([FX.md §2.3](../FX.md)), เสียงพูดชัดกว่า bed
- [ ] ข้อความ ราคา โลโก้ อยู่ใน safe zone (เปิด template TikTok / preview Ads Manager)
- [ ] ซับ/ข้อความสะกดถูก ทั้งไทยและอังกฤษ ชื่อแบรนด์และรุ่นถูก ราคา/โปรได้รับการยืนยันจากผู้ใช้
- [ ] แบรนด์: wordmark, โลโก้พาร์ทเนอร์ซ้ายบน (คลิป) / line-art มุมขวาบน (โพสต์), สีตาม kit
- [ ] แว่นตรงกับรูปกรอบจริง เทียบภาพข้างกัน, เลนส์ไม่โบ๋
- [ ] ไม่มี AI artifact ที่ 200% (มือ หู แสงสะท้อน ตัวอักษรมั่ว ใบหน้าเปลี่ยน flicker)
- [ ] เพลง: ไม่มีในไฟล์ หรือมีสิทธิ์ (CML บน TikTok เท่านั้น) / SFX CC0 หรือ CC BY พร้อมเครดิต
- [ ] Release ของคนและสถานที่ครบ
- [ ] ป้าย AI เปิดเมื่อมีภาพ/คน/เสียงสมจริงจาก AI
- [ ] ไม่มีคำอ้างการรักษา/ป้องกันโรค ถ้ามีคำอ้างด้านสุขภาพ ตรวจกับ อย. แล้ว
- [ ] ชื่อไฟล์ตามมาตรฐาน + archive kit/prompt/seed + จดแผนวัดผล (KPI, วันอ่านผล)

---

## 9. แหล่งอ้างอิง (ตรวจพบจริงเมื่อ 2026-11-21)
- สเปกแอดและ safe zone:
  - TikTok Ads Help — [TikTok Auction In-Feed Ads (video ads specifications)](https://ads.tiktok.com/help/article/video-ads-specifications?lang=en)
  - Meta for Developers — [Unlock the power of Reel ads](https://developers.facebook.com/blog/post/2024/11/07/unlock-the-power-of-reel-ads/)
  - Meta Marketing API — [Reels ads](https://developers.facebook.com/documentation/ads-commerce/marketing-api/creative/reels-ads)
  - Google Ads Help — [Your guide to YouTube Shorts ads](https://support.google.com/google-ads/answer/16041697?hl=en)
  - Google Ads Help — [Video ads specs and format requirements](https://support.google.com/google-ads/answer/17091270?hl=en)
  - Emplifi — [TikTok ad specs and safe zone](https://emplifi.io/resources/blog/tiktok-ad-specs) (แหล่งรอง)
- Loudness:
  - EBU — [R 128 v4.0 (PDF)](https://tech.ebu.ch/docs/r/r128v4_0.pdf)
  - EBU — [Tech 3341 Loudness Metering "EBU Mode" (PDF)](https://tech.ebu.ch/docs/tech/tech3341.pdf)
  - EBU — [Tech 3343 Guidelines for production of programmes in accordance with R 128 (PDF)](https://tech.ebu.ch/docs/tech/tech3343.pdf)
  - Wikipedia — [EBU R 128](https://en.wikipedia.org/wiki/EBU_R_128)
  - Production Advice — [YouTube loudness "Stats for nerds"](https://productionadvice.co.uk/stats-for-nerds/) (แหล่งรอง ระบุว่า YouTube ไม่เผยสเปกทางการ)
- เพลงและ Creative Commons:
  - TikTok Ads Help — [About the Commercial Music Library](https://ads.tiktok.com/help/article/commercial-music-library)
  - TikTok for Business — [Explore royalty-free music in our Commercial Music Library](https://ads.tiktok.com/business/en-US/blog/audio-library-royalty-free-music)
  - Adobe Help — [Personal versus commercial music use](https://helpx.adobe.com/premiere/mobile/add-audio/personal-versus-commercial-music-use.html)
  - Creative Commons — [About CC Licenses](https://creativecommons.org/learn-more/cclicenses/)
  - Creative Commons — [CC licenses](https://creativecommons.org/cc-licenses)
- AI disclosure:
  - Meta Help — [How AI-generated images in ads are identified and labelled on Meta](https://www.meta.com/en-gb/help/artificial-intelligence/355108217670024/)
  - Meta Newsroom — [Expanding GenAI Transparency for Meta's Ads Products (Feb 2025)](https://about.fb.com/news/2025/02/gen-ai-transparency-metas-ads-products/)
  - TikTok Help — [About AI-generated content](https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content)
  - TikTok Transparency — [Supporting responsible, transparent AI-generated content](https://www.tiktok.com/transparency/en/supporting-responsible-transparent-ai-generated-content/)
- กฎหมายไทย / อย.:
  - มหาวิทยาลัยมหิดล (สำเนาราชกิจจานุเบกษา) — [พระราชบัญญัติเครื่องมือแพทย์ พ.ศ. 2551 (PDF)](https://condosalaya.mahidol.ac.th/th/LAW/law/med-51.pdf)
  - มติชน — [แบบไหนต้องขอ อย.? ปลดล็อกข้อสงสัย "โฆษณาผลิตภัณฑ์สุขภาพ"](https://www.matichon.co.th/publicize/news_5836019) (e-Submission / e-Consult)
  - The Bangkok Insight — [อย. เข้มตรวจจับโฆษณาเครื่องมือแพทย์เสริมความงามผิดกฎหมาย](https://www.thebangkokinsight.com/news/business/1160640/)
  - มติชน — [อย. เปิดระบบออนไลน์ให้ประชาชนร่วมตรวจสอบโฆษณาเกินจริง](https://www.matichon.co.th/local/news_1773368)
  - ผู้จัดการออนไลน์ — [เลือกซื้อคอนแทคเลนส์ที่มีเครื่องหมาย อย.](https://mgronline.com/qol/detail/9550000021537)
- เอกสารภายในทีม:
  - [CLAUDE.md — Notes (house rules)](../../../CLAUDE.md)
  - [FX.md §2.3 — Mixing levels −14 LUFS](../FX.md)
  - [GUIDE.md](../GUIDE.md) · [LEARNING-LOG.md](../LEARNING-LOG.md)
- หมายเหตุ:
  - ตัวเลข safe zone เป็น % (เช่น บน 14% / ล่าง 35%) มาจากแหล่งรองและขัดกันเอง ใช้ template/preview ของแพลตฟอร์มเป็นหลัก
  - −14 LUFS เป็นค่าที่ชุมชนวัดได้จากบริการสตรีมมิ่ง ไม่ใช่สเปกที่ TikTok/Meta/YouTube ประกาศ
  - Hook rate / hold rate เป็นสูตรที่วงการนิยมใช้ ไม่ใช่ metric ทางการในทุก Ads Manager
  - หัวข้อกฎหมาย (release, การโฆษณาเครื่องมือแพทย์) เป็นแนวปฏิบัติเพื่อความปลอดภัย **ไม่ใช่คำแนะนำทางกฎหมาย** เรายังไม่ได้ยืนยันมาตราเรื่องการโฆษณาใน พ.ร.บ.เครื่องมือแพทย์ และยังไม่ได้ยืนยันว่ากรอบ/เลนส์ประเภทใดต้องขออนุญาตโฆษณา ให้ถาม อย. (e-Consult / สายด่วน 1556) ก่อนใช้คำอ้างด้านสุขภาพทุกครั้ง
