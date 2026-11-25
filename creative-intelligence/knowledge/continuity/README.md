# M38 Continuity Management (การคุมความต่อเนื่อง)

## Scope & status
**ครอบคลุม:** (1) งาน script supervision / continuity ในกองถ่าย: continuity log, daily report, props/wardrobe, screen direction
(2) วิทยาศาสตร์ว่าคนดูเห็น continuity error จริงไหม (change blindness, edit blindness, event segmentation, situation model)
(3) การคุมตัวละครให้เหมือนเดิมในงาน AI (reference image, seed, LoRA/DreamBooth, IP-Adapter, in-context editing) แยกตามเครื่องมือ
(4) การติดตามข้อมูลข้ามตอน (series bible แบบ "case law")

**ไม่ได้ครอบคลุม:** continuity ของเสียง/ดนตรีข้ามตอน (ดู M-sound), color grading matching เชิงเทคนิค, กฎหมายลิขสิทธิ์ตัวละคร,
การวัดผลว่าคนดู TikTok/IG สังเกต error มากกว่าคนดูหนังโรงแค่ไหน (ไม่พบงานวิจัย — ดู Open questions)

**Deliverable:** `CONTINUITY_SYSTEM.md` (schema ไฟล์ continuity ต่อซีรีส์ + ขั้นตอนเช็กก่อนทำตอนใหม่), `continuity.schema.json` (schema จริง ใช้ validate ได้)
ไม่ซ้ำกับของเดิม: กฎ 180°/eyeline/screen direction อยู่ใน `story-clips/_craft/GUIDE.md` แล้ว, หน้าตาตัวละครอยู่ใน
`.claude/skills/ai-visual-artist/CHARACTER_BIBLE_TEMPLATE.md`, เสียงตัวละครอยู่ใน `ai-voice-director/CHARACTER_VOICE_BIBLE.md` — ไฟล์นี้เป็น "ระบบ" ที่ชี้ไปหาไฟล์เหล่านั้น

Sources: 20 รายการ (`sources.json`) — อ่านจริง full_text 12, abstract 5, publisher_page 1, bibliographic 1, search_summary 1

---

## Core concepts

### 1. Change blindness — คนดูพลาดการเปลี่ยนแปลงที่ "ไม่เปลี่ยนความหมาย" ของฉาก
- **คืออะไร:** ความล้มเหลวในการเห็นการเปลี่ยนแปลงใหญ่ๆ ระหว่างสองมุมมอง (ข้ามคัท, ข้ามการกะพริบตา)
- **กลไก:** ระบบการมองเก็บ "gist" (ใครทำอะไรที่ไหน) ไม่เก็บรายละเอียดทุกจุด; ถ้าการเปลี่ยนไม่มี transient ที่ดึงความสนใจ และไม่เปลี่ยน gist ก็มักไม่ถูกเห็น
  — ในหนังทดลองของ Levin & Simons 1997 มี continuity error 9 จุดในฉากกินข้าว ดูครั้งแรกไม่มีใครรายงาน ดูรอบสองแบบตั้งใจหาเจอเฉลี่ย 2/9 ส่วนใหญ่จุดที่ใกล้หน้านักแสดง;
  เปลี่ยนตัวนักแสดงข้ามคัท มีแค่ 33% ของ 40 คนที่สังเกต (รายงานโดย Smith2012, SimonsLevin1998)
- **ใช้กับงานเรา:** อย่าเสียเวลากับรายละเอียดฉากหลังที่ไกลหน้า/มือ; ทุ่มกับสิ่งที่อยู่ใกล้หน้า, มือ, สินค้า (แว่น!) และสิ่งที่เรื่องชี้ให้ดู
- **ข้อจำกัด:** (ก) ทดลองแบบดูครั้งเดียว — โซเชียลมี pause, ดูซ้ำ, คอมเมนต์ชี้จุด; Simons & Levin 1997 เตือนเองว่าถ้ามีคนเดียวเห็น อินเทอร์เน็ตจะกระจายและคนอื่นจะหาตาม
  (ข) กลุ่มที่ใกล้ชิดตัวละคร (in-group / แฟนประจำ) เห็นมากกว่า (SimonsLevin1998: คนกลุ่มสังคมเดียวกับผู้ทดลองสังเกตได้) → แฟนซีรีส์ยาวให้อภัยน้อยกว่า
  (ค) "ไม่เห็นการเปลี่ยน" ≠ "ไม่มีความจำ" — ของที่ถูกจ้องมองถูกจำได้ค่อนข้างแม่น (SimonsRensink2005)
- **Tier/keys:** A — LevinSimons1997 (bibliographic, ผ่านแหล่งรอง), SimonsLevin1997, SimonsLevin1998, SimonsRensink2005, Smith2012
- **Confidence:** high ว่าปรากฏการณ์มีจริง; medium ว่าขนาดผลใช้ได้กับคลิปสั้นที่ดูซ้ำได้

### 2. Change blindness blindness — คนทำงานประเมินคนดูสูงเกิน
- **คืออะไร:** คนส่วนใหญ่เชื่อมั่นว่าตัวเองจะเห็นการเปลี่ยนใหญ่ๆ ทั้งที่จริงไม่เห็น (SimonsRensink2005 อ้าง Levin et al. 2000)
- **ใช้:** ตอน QC ให้แยก "error ที่เราเห็นเพราะรู้ว่ามี" ออกจาก "error ที่คนดูครั้งแรกจะเห็น" — ใช้คำถาม: อยู่ใกล้จุดสนใจไหม? เปลี่ยนความหมายไหม? pause แล้วเห็นชัดไหม?
- **Confidence:** medium (อ้างผ่าน review)

### 3. Edit blindness & continuity editing — คัทแบบไหนซ่อนการเปลี่ยนได้
- **ผล:** คนดูที่ "ตั้งใจหาคัท" ยังพลาด 15.8% ของคัททั้งหมด; คัทในฉากเดียวกันพลาด 25.1%, match-action 32.4% มากกว่าคัทข้ามฉาก 9.4% (SmithHenderson2008)
  กลไกหลักคือความสนใจถูกเรื่องดึงไป ไม่ใช่การกะพริบตา
- **ทฤษฎี:** AToCC — ต้องแมตช์ "สิ่งที่ความสนใจจะอยู่ตรงนั้นตอนคัท" (หน้า, การเคลื่อนไหว, ทิศทางจอ) ไม่ต้องแมตช์ทั้งฉาก (Smith2012)
- **Event segmentation:** คนดูตัดเรื่องเป็นตอนๆ ตาม "action" มากกว่าเวลา/สถานที่ — กระโดดที่/เวลาแต่ action ต่อเนื่อง ยังรู้สึกต่อกัน (MaglianoZacks2011 — search_summary, confidence low-medium)
- **ใช้:** ในคลิป 2D/AI ถ้าภาพ gen สองช็อตไม่เหมือนกันเป๊ะ ให้คัทกลางการเคลื่อนไหว (หันหน้า, ยกแก้ว) และคงทิศทางจอ → คนดูไม่รู้สึก
- **Tier:** A; **Confidence:** high (ผลแล็บ), medium (ย้ายมาใช้กับ puppet SVG/AI)

### 4. Situation model — คนดูติดตาม 5 มิติโดยอัตโนมัติ
- **คืออะไร:** คนอ่าน/ดูสร้างโมเดลสถานการณ์ตาม **เวลา, สถานที่, เหตุผล-ผล, เป้าหมาย (intentionality), ตัวเอก** (ZwaanRadvansky1998)
- **หลักฐานสำคัญ:** การกระทำที่ขัดกับนิสัยที่บอกไว้ก่อน (มังสวิรัติแล้วสั่งแฮมเบอร์เกอร์) ทำให้อ่านช้าลง = คนดูจับได้ แม้นิสัยนั้นไม่ได้ถูกพูดถึงมาหลายประโยค (Albrecht & O'Brien ผ่าน ZwaanRadvansky1998)
- **ใช้:** continuity ที่สำคัญที่สุดไม่ใช่สีผ้าพันคอ แต่คือ **นิสัย, ความรู้ของตัวละคร, กฎของโลก, ไทม์ไลน์** — ใส่เป็น field หลักใน schema
- **Tier:** A; **Confidence:** medium-high (งานอ่าน text, ย้ายมาวิดีโอโดยอนุมาน)

### 5. Script supervision practice (craft, tier C/D)
- **คืออะไร:** หน้าที่ "scripty": เตรียมบท, จดทุก take (action, ตำแหน่ง, มุมกล้อง, เลนส์), ถ่ายภาพ continuity, จดสิ่งที่เบี่ยงจากบท, ส่ง continuity notes + lined script ให้ editor ทุกวัน, ส่ง daily report ให้ฝ่ายผลิต (IATSE856_2024)
- **รายละเอียดจากคู่มือ:** breakdown ต่อฉาก = เลขฉาก, สถานที่, สรุป action, เวลาในเรื่อง, จำนวนหน้า, นักแสดง, props, เสื้อผ้า; การกระทำต่อเนื่อง (สูบบุหรี่ ดื่ม กิน) จับคู่ยากที่สุด; ถ่ายรูปอ้างอิงหลัง take แรก (VassarScriptSup2016)
- **ใช้:** แปลงเป็น 2 ไฟล์ของเรา: **continuity file ของซีรีส์** (สิ่งที่คงที่/สะสม) + **episode log** (สิ่งที่ตอนนี้แสดง/เปลี่ยน) — ดู `CONTINUITY_SYSTEM.md`
- **Confidence:** high ว่าเป็นแนวปฏิบัติในอุตสาหกรรม (ไม่ใช่ผลวิจัย)

### 6. Series bible as "case law" (ต่อกับ M16)
- Production bible ของซีรีส์ยาวกลายเป็นฐานข้อมูล "fictional facts" + มี "walking bible" (คนที่จำทุกอย่าง); bible ไม่เคยนิ่ง ต้องถามเสมอว่า "เวอร์ชันไหน" (Macdonald2018, A, full_text)
- **ใช้:** ทุก fact บันทึกว่า "ตั้งขึ้นใน EP ไหน" และ "อยู่บนจอแล้ว (canon) หรือแค่วางแผน" — ไฟล์ JSON ทำหน้าที่ walking bible ให้ Claude

### 7. Character consistency ในงาน AI — แยกตามคลาสเครื่องมือ
| คลาส | ตัวอย่าง (แหล่ง) | จุดแข็ง | จุดอ่อน |
|---|---|---|---|
| Reference image / image prompt | IP-Adapter (Ye2023, DiffusersIPAdapterDocs), GPT Image refs (OpenAIImageDocs), Runway Gen-4 (RunwayGen4, vendor claim) | ไม่ต้องเทรน, ใช้ภาพ master เดียว | ไม่การันตี; OpenAI ระบุเองว่า "may occasionally struggle to maintain visual consistency for recurring characters" |
| In-context editing | FLUX.1 Kontext (BFL2025Kontext) | แก้จากภาพที่อนุมัติแล้ว คงตัวละครข้ามหลายรอบได้ดีกว่า (ตาม vendor) | benchmark ของ vendor เอง |
| Fine-tune ต่อ subject | DreamBooth (Ruiz2023), LoRA (Hu2021 — ต้นฉบับเป็นงาน LLM) | ล็อกตัวตนแน่นที่สุดเมื่อต้องใช้หลายร้อยภาพ | ต้องเทรน/GPU, เสี่ยง overfit |
| Shared attention ใน batch | ConsiStory (Tewel2024) | ไม่ต้องเทรน, ภาพในชุดเดียวกันเหมือนกัน | คงที่ภายใน batch ไม่ใช่ข้ามตอน |
| Seed | DiffusersReproDocs | ทำซ้ำภาพเดิมได้ถ้าทุกอย่างเหมือนเดิม | seed เปลี่ยนเครื่อง/โมเดล/ขนาด/sampler = ไม่ซ้ำ; "not guaranteed even with an identical seed" |
- **ข้อสรุปเชิงปฏิบัติ:** seed ไม่ใช่เครื่องมือคุมตัวละคร แต่เป็นเครื่องมือ "ทำซ้ำภาพเดิม" → ต้องเก็บ seed + model + sampler + steps + size + prompt ครบชุด
  ตัวคุมตัวละครจริงคือ **master reference image + identity markers ที่เขียนเป็นคำ + QC ด้วยตา**
- **Confidence:** medium (abstract/docs; ไม่มีงานเปรียบเทียบอิสระที่อ่านได้)

---

## Contested / replication notes
- **ขนาดของ change blindness ใน "การดูจริง":** งานคลาสสิกเป็นการดูครั้งเดียวในแล็บ; บนโซเชียล คนดูซ้ำและคอมเมนต์ชี้ — ทั้ง Simons & Levin 1997 เองก็บอกว่าเมื่อมีคนชี้ คนอื่นจะหาตาม → ความเสี่ยงไม่ใช่ "คนส่วนใหญ่เห็นไหม" แต่ "มีคนหนึ่งเห็นแล้วกลายเป็นประเด็นไหม"
- **Sparse representation หรือไม่:** Simons & Rensink 2005 เตือนว่าการพลาดเห็นไม่ได้แปลว่าไม่มีการจำ; Hollingworth & Henderson 2002 (อ้างใน review) พบความจำภาพของวัตถุที่จ้องค่อนข้างแม่น → ของที่เป็นจุดสนใจต้องแมตช์
- **Gaze-match cut:** สมมติฐานว่า eyeline match ช่วยซ่อนคัทไม่ได้รับการสนับสนุนใน SmithHenderson2008 (ไม่ต่างจากคัทข้ามฉาก) — แต่กฎ eyeline ยังสำคัญต่อความเข้าใจพื้นที่ (คนละเรื่องกับการซ่อนคัท)
- **AI consistency claims:** ส่วนใหญ่เป็นของ vendor (Runway, BFL); ยังไม่พบ benchmark อิสระที่อ่านได้ → ถือเป็น tier C

## Applied patterns for our production
1. **Slowly Growing (Mint & Tao):** identity markers ของตัวละครหน้าว่างคือ silhouette + เสื้อผ้า (Mint สเวตเตอร์สีข้าวโอ๊ตตัวโคร่ง; Tao สูงกว่า โค้ทชาร์โคล ผ้าพันคอน้ำตาลหม่น) — เพราะไม่มีหน้า เสื้อผ้าคือ "หน้า" ที่ห้ามเพี้ยน.
   ฉากหลัง (ต้นไม้ ม้านั่ง) เปลี่ยนได้ตามเรื่องโดยคนดูไม่สะดุด (change blindness ช่วย) แต่ **ฝั่งซ้าย/ขวาของแต่ละคน** ควรคงที่ทั้งชุด (180° rule)
2. **Zombie (Z01–Z10):** continuity เสี่ยงที่สุดคือ "state" สะสม: ใครตายแล้ว (ลุงชาญ Z08), ใครโดนกัด (มิว Z04 ไม่กลายร่าง), เสี่ยเปาถูกกัด Z06 → กลับมาเป็น brute Z10, ข้าวตังต้องอยู่กับมิว, วัน/เวลา (Day 1→Day 3 รุ่งเช้า), กฎซอมบี้ (กลายร่าง 1–3 นาที, กลางคืนวิ่ง) — ใส่ใน `timeline` + `rules` + `state_by_episode`
3. **Eyesight (EP01–EP11):** ซีรีส์แบบ anthology แต่มี "running device" (clock chip มุมซ้ายบน, การ์ดครีมขอบทอง, EP ก่อนหน้า tease ตอนถัดไป) — continuity ของ **format** สำคัญกว่าของตัวละคร; และ **science facts** ห้ามขัดกันข้ามตอน (เช่น เวลาปรับตาในมืด ~20 นาที) → ใช้ `rules` ชนิด `fact`
4. **ร้านแว่นตีสอง:** ghost rules (มาตอนตีสอง, ใครเห็นได้บ้าง) ต้องตั้งก่อนใช้แก้ปม (ดู M16 Sanderson); ระวังชื่อชนกันข้ามซีรีส์: มี "ลุงชาญ" ทั้งใน zombie และ night-optic → **ID ต้องมี prefix ซีรีส์** (`zombie.chan`, `nightoptic.chan`)
5. **คลิปสินค้าแว่น:** "hero prop" คือแว่น — รุ่น สี กรอบ เลนส์ต้องตรงกันทุกช็อต (อยู่ใกล้หน้าและเป็นจุดสนใจ = คนดูเห็นแน่); ฉากหลังเปลี่ยนได้
6. **คัทซ่อนรอยภาพ AI:** ถ้าสองช็อตหน้าเพี้ยนเล็กน้อย ให้คัทกลาง action หรือ match-action แทนการคัทค้างนิ่ง

## Anti-patterns
- เชื่อว่า "ใส่ seed เดิม = ตัวละครเดิม" (ผิด: seed ทำซ้ำได้เฉพาะเมื่อพารามิเตอร์ทุกตัวเหมือนเดิม และยังไม่การันตี)
- ใช้ change blindness เป็นข้ออ้างปล่อย error ที่จุดสนใจ (หน้า มือ สินค้า ข้อความ) — งานวิจัยบอกแค่ว่ารายละเอียด "ไกลจุดสนใจ" มักไม่ถูกเห็น
- จำ continuity ไว้ในหัว/ในแชต — ซีรีส์ 10+ ตอนต้องมีไฟล์เดียวเป็น source of truth (Holocron, production bible)
- อัปเดตเฉพาะหน้าตาแต่ไม่อัปเดต "สิ่งที่ตัวละครรู้" และ "สถานะ" (บาดแผล, ของที่ถืออยู่, ใครตาย)
- ลอก claim ของ vendor ("solves character consistency") ไปเป็นข้อเท็จจริง

## Open questions / research next
- มีงานวิจัยไหมว่าคนดู short-form (ดูวน, pause) สังเกต continuity error มากกว่าการดูหนังปกติเท่าไร และ error ทำให้ engagement/คอมเมนต์ลบเพิ่มไหม
- benchmark อิสระของ character consistency ข้าม session (ไม่ใช่ในชุดเดียว) สำหรับ FLUX/GPT Image/Kling
- อ่านฉบับเต็ม Magliano & Zacks 2011 และ Levin & Simons 1997 (ถูกบล็อก/ไม่มี open copy ในรอบนี้)
- ทำ CLIP/DINO similarity เป็นตัวช่วย QC identity อัตโนมัติ — ต้องหาแหล่งที่ validate ว่าสัมพันธ์กับการรับรู้ของคน
