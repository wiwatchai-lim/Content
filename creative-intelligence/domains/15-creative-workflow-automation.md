# Domain 15 — Creative Workflow Automation (ระบบอัตโนมัติในงานผลิตสร้างสรรค์: pipeline, ความทำซ้ำได้, คนตรวจ, ความเสี่ยง)

Module: **M37** (Production Engineering) · เขียน 2026-11-26 · ภาษา: อธิบายไทย + ศัพท์เทคนิคอังกฤษ

**Scope — ครอบคลุม:** ประวัติ pipeline (Shewhart/SPC → Toyota jidoka/poka-yoke → `make` 1979 → render farm และ production database ของ Pixar
ยุค *Toy Story* → USD/VFX Reference Platform → CI/CD และ DORA → ML pipeline debt → agentic LLM pipelines); หลัก reproducibility/determinism
(seed, seek-safe render, ความไม่ deterministic ของ GPU/LLM), idempotency, caching/skip-if-done, versioning และ naming, metadata/provenance
(C2PA, IPTC Digital Source Type, PROV, AI label ของแพลตฟอร์ม, กฎหมาย EU/ไทย), human-in-the-loop และงานวิจัย automation bias/complacency
(Bainbridge 1983; Parasuraman & Riley 1997; Parasuraman, Sheridan & Wickens 2000; Lee & See 2004; Parasuraman & Manzey 2010; Goddard 2012),
quality drift ใน batch (control chart, acceptance sampling), race condition ของงานขนาน, quota/rate limit, retry vs การเผา quota, ต้นทุนต่อชิ้นที่ผ่าน,
observability/log, docs-as-code, secret/ข้อมูลลูกค้า, ความเสี่ยง ToS ของ browser automation, และการประยุกต์กับ pipeline จริงของสตูดิโอ.

**Scope — ไม่ครอบคลุม:** การออกแบบ rubric/reliability ของผู้ตรวจ และ A/B test (อยู่ใน Domain 13 แล้ว); สเปกแพลตฟอร์ม (ขนาด/safe zone/loudness)
(อยู่ใน `story-clips/_craft/curriculum/12-production-qc.md`); การเขียนโค้ดเชิงลึก (queue system, workflow engine เช่น Airflow/Temporal — ไม่ได้ค้น);
ตาราง AQL/MIL-STD-105 (ไม่ได้อ่านต้นฉบับ); PDPA ฉบับเต็ม (ไม่ได้อ่านรอบนี้); render farm สมัยใหม่ (Deadline/Tractor — ไม่ได้ค้น).

**Status: SOURCE VERIFIED** — 46 จาก 49 แหล่ง (94%) อ่านเป็น full_text (38) หรือ abstract (8) ในรอบนี้.

**Counts:** tier S 4 · A 13 · B 9 · C 21 · D 1 · E 1 (รวม 49) · access_status: full_text 38 · abstract 8 · publisher_page 1 · bibliographic 1 · search_summary 1.
หมายเหตุ: tier C เยอะเพราะโดเมนนี้ "ความจริง" หลายเรื่องคือเอกสารมาตรฐาน/ผู้ให้บริการ (rate limit, ToS, spec) — ใช้เป็นข้อเท็จจริงเชิงนโยบายที่ **เปลี่ยนได้** ต้องเช็กใหม่ก่อนใช้.

**Builds on (ไม่ทำซ้ำ — ลิงก์ไปแทน; path นับจาก root ของ repo):**
- `creative-intelligence/CAPABILITY_MATRIX.json` — เครื่องมือที่ใช้ได้จริงบนเครื่องนี้ (Codex = quota ต้องถามก่อน; FLUX ฟรี ~40–170 s/ภาพ; Gemini TTS ~10 req/วัน/โมเดล; HyperFrames ต้องมี FFmpeg) — ไฟล์นี้เพิ่ม: *วิธีต่อเครื่องมือเหล่านั้นเป็น pipeline ที่ไม่พังเงียบ*
- `creative-intelligence/LEARNING_PROGRESS.json` → M37 "Production Engineering" (PRACTICALLY TESTED; ไฟล์ `12-production-qc.md`, `tools/render.mjs`, `tools/video.mjs`)
- `story-clips/_craft/curriculum/12-production-qc.md` — 6 เฟสงานโฆษณา, QC ก่อนปล่อย, สเปกแพลตฟอร์ม (ไฟล์นี้เพิ่ม: ส่วน "เครื่องจักร" ระหว่างเฟส)
- `.claude/skills/beat-clip/SKILL.md`, `docs/hyperframes.md` — กฎ seek-safe ("ลากไปเฟรมไหนก็ต้องได้ภาพเดิม") และ render คลิปขนาน
- `creative-intelligence/domains/13-quality-assurance-evaluation.md` — rubric, reliability, golden set (ไฟล์นี้ใช้ต่อในส่วน evaluation gate)
- `creative-intelligence/domains/14-knowledge-management-experience-learning.md` — learning log/postmortem (ไฟล์นี้เพิ่ม: postmortem ของเหตุ pipeline)
- เหตุจริงของสตูดิโอ: auto-memory `story-carousels-2026-11-16.md`, `promo-image-feed-style.md`, `gemini-tts-sulafat.md`, `ig-reels-1x1-ai-label.md`

ป้าย: **FACT** (ซ้ำได้/เป็นเอกสารทางการ) · **THEORY** (แบบจำลอง อาจโต้แย้ง) · **PRACTICE** (ธรรมเนียมวิชาชีพ) · **OPINION** · **(craft)** · **(opinion)** · **(our test)** = สิ่งที่เกิด/วัดในสตูดิโอนี้

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 ก่อนคอมพิวเตอร์: คุณภาพจากการควบคุม "กระบวนการ" ไม่ใช่ตรวจของท้ายสาย
- **16 พ.ค. 1924** Walter Shewhart (Bell Labs) เขียนบันทึกที่มีภาพร่าง control chart; **1931** หนังสือ *Economic Control of Quality of Manufactured Product*;
  Dodge และ Romig (Bell Labs) นำทฤษฎีการสุ่มตัวอย่างมาใช้กับ **sampling inspection** [NIST_SQC_History; Shewhart1931].
  แนวคิดที่สืบมาถึงงานเรา: ความแปรปรวนปกติ (common cause) ต่างจากความผิดปกติที่หาสาเหตุได้ (special cause) — อย่าแก้ระบบทุกครั้งที่ภาพหนึ่งใบออกมาแย่.
- **Toyota — jidoka** ("automation with a human touch"): ย้อนไปที่เครื่องทอผ้าอัตโนมัติของ Sakichi Toyoda ที่ "ใส่ความสามารถในการตัดสินใจไว้ในเครื่อง";
  สายการผลิต **หยุดทันทีเมื่อพบความผิดปกติ** เพื่อไม่ให้ของเสียไหลต่อ; **andon** แจ้งเตือนให้ "คนตอบสนองเฉพาะเมื่อมีความผิดปกติ";
  และ **Just-in-Time** — ทำเท่าที่ต้องใช้ เมื่อต้องใช้ ในจำนวนที่ต้องใช้ [ToyotaTPS].
- **Poka-yoke** (error-proofing): อุปกรณ์ราคาถูกที่กันความผิดพลาดที่ต้นทาง — แบบ **shutdown** (เครื่องไม่ยอมเริ่มถ้าวางชิ้นงานผิด) แรงที่สุด,
  แบบ **warning** (ไฟ/เสียงเตือน) อ่อนกว่า; LEI เทียบว่า sampling inspection อาจหลุด และ 100% inspection แพงและเจอหลังเกิดแล้ว [LEI_PokaYoke].
  (การให้เครดิต Shigeo Shingo ในทศวรรษ 1960 มาจากแหล่งรอง — หน้า LEI ที่อ่านไม่ได้ระบุชื่อ.)

### 1.2 1975–1979: `make` — "ทำเฉพาะส่วนที่ล้าสมัย"
- Stuart Feldman (Bell Labs) อธิบาย **Make** (ใช้บน UNIX ตั้งแต่ 1975, ตีพิมพ์ 1979): โปรแกรมที่จำความสัมพันธ์ระหว่างชิ้นส่วน แล้วสั่งคำสั่งที่จำเป็น
  ให้ชิ้นส่วนกลับมาสอดคล้องกันหลังมีการแก้ — "ความคิดพื้นฐานง่ายมากและปรับใช้กับสภาพแวดล้อมอื่นได้" [Feldman1979].
  นี่คือบรรพบุรุษของ "skip if done" ใน `carousel/stories/gen.sh` ของเรา (ข้ามภาพที่มีแล้ว → รันซ้ำหลังเครื่องดับได้).

### 1.3 1983: Ironies of Automation
- Lisanne Bainbridge (1983, *Automatica*) ชี้ว่า "ยิ่งระบบควบคุมก้าวหน้า บทบาทของคนยิ่งสำคัญ": ผู้ออกแบบที่อยากตัดคนออก
  ยังทิ้งงานที่ "คิดไม่ออกว่าจะทำอัตโนมัติอย่างไร" ไว้ให้คน — เป็นกองงานจับฉ่ายที่ไม่มีใครออกแบบสนับสนุน; คนเฝ้าจอที่แทบไม่มีอะไรเกิดขึ้น
  ได้ไม่เกิน "ราวครึ่งชั่วโมง"; ระบบอัตโนมัติ **"camouflage"** ความผิดพลาดจนสายเกินแก้ ดังนั้น **"automatic systems should fail obviously"**;
  และ "ระบบที่สำเร็จที่สุด ซึ่งแทบไม่ต้องให้คนเข้าไปแทรก อาจต้องลงทุนฝึกคนมากที่สุด" [Bainbridge1983].
- Strauch (2017) ทบทวนว่า ironies เหล่านี้ "ยังไม่ถูกแก้" และเห็นได้ในอุบัติเหตุยุคหลัง [Strauch2017].

### 1.4 1990s: Pipeline ภาพยนตร์คอมพิวเตอร์ — ฐานข้อมูลคือหัวใจ
- *Toy Story* (1995): ทีม Pixar เขียนใน COMPCON '96 ว่างานแอนิเมชัน "เป็นลำดับต่อเนื่องมาก การจัดการ pipeline อย่างมีประสิทธิภาพจึงสำคัญยิ่ง";
  มากกว่า 1,500 ช็อต คุมความต่อเนื่องด้วย sets และ **shot database**; ระบบ **Ringmaster** = relational database ที่เก็บ inventory ของ model/texture/ภาพ,
  ส่งงาน render ไปเครื่องที่ว่างใน **RenderFarm** (Sun >300 processors + SGI), ติดตามสถานะ แล้วสั่ง composite layer ต่อเอง;
  workstation ส่วนตัวที่ว่างถูกดึงเข้า pool งาน batch; ดิสก์ ~260 GB เก็บภาพ ~140,000 ไฟล์ [HenneEtAl1996].
  บทเรียน: **pipeline = inventory + สถานะงาน + การส่งต่ออัตโนมัติ** ไม่ใช่แค่ตัว render.
- ต่อมา Pixar พัฒนา scene description รุ่นที่ ~4 คือ **USD** (เริ่ม 2012) ให้ศิลปินหลายแผนกทำงานบนฉากเดียวกันขนานกันผ่าน **layers**
  ที่ซ้อนตามลำดับความแรง — override แบบ non-destructive และ referencing asset ที่ใช้ซ้ำ [OpenUSD_Intro].
- อุตสาหกรรม VFX ตั้ง **VFX Reference Platform** (ร่วมกับ VES Technology Committee) เป็นชุดเวอร์ชันเป้าหมายรายปีของ compiler/Python/Qt/OpenEXR
  เพื่อ "ลดความไม่เข้ากันระหว่างซอฟต์แวร์" — ปี CY2027 feature complete ณ 1 พ.ย. 2026 [VFXRefPlatform].

### 1.5 สิ่งพิมพ์: preflight = ด่านอัตโนมัติก่อนส่งโรงพิมพ์
- งานพิมพ์ดิจิทัลใช้ **preflight** ตรวจ PDF กับ profile ก่อนเข้า prepress; Ghent Workgroup (GWG) ออก spec ที่ตั้งค่าใน preflight tool
  เพื่อ "ให้เจอปัญหาเร็ว" เพราะไฟล์ที่ตั้งค่าผิดทำให้เกิด "ปัญหาการผลิต ความล่าช้า และต้นทุนที่ไม่คาดคิด" [GWG_Preflight].
  (รายละเอียด PDF/X-4 เป็นฐานของ GWG 2015 มาจาก search summary — ไม่ได้อ่านตัว spec.)

### 1.6 2000s–2010s: DevOps/CI แนวคิดที่ย้ายมาใช้กับสื่อได้
- **Continuous Integration** (Fowler, เผยแพร่ 2000, แก้ล่าสุด 18 ม.ค. 2024): repository เดียว, build ด้วยคำสั่งเดียว, build ที่ทดสอบตัวเอง,
  รวมเข้า mainline ทุกวัน, **build แดงต้องแก้ทันที**, build ควรเร็ว (~10 นาที) [Fowler2024_CI].
- **Reproducible builds**: source + environment + instructions เดียวกัน → ใครก็สร้าง artifact ที่เหมือนกันทุก bit ได้ ตรวจด้วย hash [ReproBuilds_Def].
- **Semantic Versioning**: เวอร์ชันที่ปล่อยแล้ว "MUST NOT be modified" — แก้ = ออกเวอร์ชันใหม่ [SemVer].
- **Docs as code**: เอกสารใช้เครื่องมือเดียวกับโค้ด (version control, review, test) และบล็อกการ merge ฟีเจอร์ที่ไม่มีเอกสาร [WriteTheDocs_DocsAsCode].
- **DORA**: วัด lead time, ความถี่ deploy, เวลากู้คืน, change fail rate, rework rate; DORA อ้างว่า "speed and stability are not tradeoffs" [DORA_Metrics]
  (เป็นงานวิจัยแบบสำรวจ — ไม่ได้ตรวจวิธีวิจัยในรอบนี้).
- **Google SRE** (2016): blameless postmortem [GoogleSRE2016]; การรับมือ cascading failure ด้วย backoff/retry budget [GoogleSRE_Cascading].

### 1.7 2015–2026: ML pipeline และ agentic pipeline
- Sculley et al. (2015): ระบบ ML ที่โตเต็มที่อาจเป็น "ML code ≤5% และ glue code ≥95%"; **pipeline jungles** = สคริปต์ scrape/join/sample
  ที่งอกเองพร้อมไฟล์ intermediate จนตรวจข้อผิดพลาดและกู้คืนยาก; dead experimental codepaths (ยกกรณี Knight Capital เสีย $465M ใน 45 นาที) [Sculley2015].
- Anthropic (ธ.ค. 2024) แยก **workflow** (เส้นทางโค้ดกำหนดไว้ก่อน) กับ **agent** (LLM กำหนดขั้นตอนเอง) และแนะนำ "ทางที่ง่ายที่สุดก่อน" [Anthropic2024_Agents].
- Cemri et al. (2025, MAST) วิเคราะห์ 1,642 trace ของระบบ multi-agent 7 framework: 14 failure modes; การ verify ไม่ครบ/ผิดเป็นกลุ่มใหญ่ [Cemri2025_MAST].
- Kapoor et al. (2024): benchmark agent ดูแต่ accuracy → agent แพงเกินจำเป็น ต้องวัด **cost คู่ accuracy** [Kapoor2024_AgentsMatter].
- He (Thinking Machines, ก.ย. 2025): LLM ที่ temperature 0 ก็ไม่ deterministic เพราะ kernel ไม่ batch-invariant — 1,000 ครั้งได้ 80 แบบ [He2025_Nondeterminism].

### 1.8 2024–2026: provenance และการติดป้าย AI เป็นเรื่องบังคับมากขึ้น
- C2PA Content Credentials (spec 2.x) [C2PA_Explainer22]; IPTC Digital Source Type (เช่น `trainedAlgorithmicMedia`) [IPTC_DigitalSourceType].
- Meta ประกาศแนวทางติดป้าย 5 เม.ย. 2024 → เปลี่ยน "Made with AI" เป็น "AI info" 1 ก.ค. 2024 [Meta2024_AILabels].
- EU AI Act มาตรา 50 มีผล 2 ส.ค. 2026 (ระบบเดิมได้ถึง 2 ธ.ค. 2026 สำหรับ machine-readable marking — ตามข้อตกลงชั่วคราว) [EU_AIAct_Art50_FLI].
- ไทย: สคบ. ออกประกาศ/แนวทางโฆษณาที่ใช้ AI ให้ติดป้ายชัด และสินค้าที่โฆษณาต้องตรงของจริง (บทความ 12 มี.ค. 2026) [Tilleke2026_AIAds].

**สรุปการเปลี่ยนของความคิด:** ตรวจของท้ายสาย → คุมกระบวนการ (SPC) → หยุดสายเมื่อผิดปกติ (jidoka) → ทำเฉพาะสิ่งที่เปลี่ยน (make) →
ฐานข้อมูลสถานะงาน (Ringmaster) → ทำงานขนานโดยไม่ทับกัน (USD layers) → ทดสอบอัตโนมัติทุกการเปลี่ยน (CI) → ทำซ้ำได้ทุก bit (reproducible builds) →
ยอมรับว่า generative AI *ทำซ้ำไม่ได้เต็มที่* จึงต้องเก็บ artifact + provenance และให้คนตรวจที่ด่านสำคัญ.

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 นิยามที่ใช้ในไฟล์นี้
| คำ | ความหมาย | ตัวอย่างในสตูดิโอ |
|---|---|---|
| **Pipeline** | ลำดับขั้นที่เปลี่ยน input เป็น deliverable โดยแต่ละขั้นมี input/output ชัด | story `.mjs` → `gen.sh` (FLUX) → `sheet.py` (contact sheet) → pick → `finish.py` → `npm run render` → `reel.sh` → schedule |
| **Asset / artifact** | ไฟล์ที่ขั้นหนึ่งผลิตและขั้นถัดไปใช้ | `raw/04-2.png`, `export/03.png`, `export/reel.mp4` |
| **Deterministic** | input เดียวกัน → output เดียวกันทุกครั้ง | HTML render ของ `tools/render.mjs` (ถ้า font โหลดครบ) |
| **Seek-safe** | ภาพของเฟรม t ขึ้นกับ t เท่านั้น ไม่ขึ้นกับว่าเล่นมาจากไหน | กฎ HyperFrames/`tools/video.mjs` (pause + seek ทีละเฟรม) ใน `docs/hyperframes.md` |
| **Idempotent** | ทำซ้ำกี่ครั้งผลเท่ากับทำครั้งเดียว | `gen.sh` ข้ามไฟล์ที่มีแล้ว; Stripe ใช้ idempotency key [Stripe_Idempotency] |
| **Cache / skip-if-done** | ไม่ทำงานซ้ำถ้า output ยังใช้ได้ | `make` [Feldman1979]; `gen.sh` |
| **Provenance** | ข้อมูลว่า entity ใด เกิดจาก activity ใด โดย agent ใด [W3C_PROV_Overview2013] | kit.md บันทึก seed ที่เลือก + raw ที่ใช้ |
| **Human-in-the-loop (HITL) checkpoint** | จุดที่คนต้องตัดสินก่อนไปต่อ | เลือก seed จาก contact sheet; ถามผู้ใช้ก่อนรัน Codex |
| **Gate** | ด่านตรวจที่ "ไม่ผ่าน = ไม่ไปต่อ" (อัตโนมัติหรือคน) | ตรวจ md5 ซ้ำหลังรัน Codex ขนาน |
| **Quota / rate limit** | เพดานการใช้บริการต่อนาที/วัน | Gemini: RPM/TPM/RPD ต่อ *project*, RPD reset เที่ยงคืน Pacific [GeminiRateLimits] |
| **Race condition** | งานขนานแย่งทรัพยากรร่วมในช่วงเวลาหนึ่งจนผลผิด [CWE362] | Codex ขนานคัดลอก "ไฟล์ใหม่ล่าสุด" ใบเดียวกัน |

### 2.2 หลักแกน 12 ข้อ (แต่ละข้อมีที่มา)
1. **ทำให้ทำซ้ำได้เท่าที่ทำได้ และเก็บของจริงในส่วนที่ทำซ้ำไม่ได้.** Reproducible = source + environment + instructions [ReproBuilds_Def];
   แต่ diffusion "ไม่รับประกันแม้ seed เดียวกัน" และ GPU generator ต่างจาก CPU [DiffusersReproDocs]; LLM temp 0 ยังได้หลายแบบ [He2025_Nondeterminism].
   → **FACT**: seed ช่วยแต่ไม่พอ; **PRACTICE**: เก็บ accepted output + seed + prompt + เวอร์ชันโมเดล.
2. **ทุกขั้นต้อง idempotent และ resumable.** รันซ้ำต้องไม่สร้างซ้ำซ้อน; Stripe: retry ปลอดภัยเพราะ key เดียวกันคืนผลเดิม [Stripe_Idempotency];
   AWS: "APIs with side effects aren't safe to retry unless they provide idempotency" [AWS_Brooker2019_Retries].
3. **ทำเฉพาะส่วนที่เปลี่ยน (dependency-aware caching)** [Feldman1979].
4. **ล้มให้ดัง (fail obviously) และหยุดสายเมื่อผิดปกติ** [Bainbridge1983; ToyotaTPS]. สคริปต์ต้อง exit non-zero และหยุด batch ไม่ใช่เขียนไฟล์ที่ "ดูเหมือนใช้ได้".
5. **กันผิดที่ต้นทาง (poka-yoke) ดีกว่าตรวจท้ายสาย** [LEI_PokaYoke]: ตรวจ input ก่อนรัน (มี prompts.txt ไหม, ชื่อ kit ถูก pattern ไหม).
6. **ชื่อและเวอร์ชันต้องเป็นระบบตั้งแต่ก่อนเริ่ม** — YYYYMMDD, v01, leading zeros, ไม่มีช่องว่าง, 40–50 ตัวอักษร [HMS_FileNaming];
   ของที่ปล่อยแล้วห้ามแก้ทับ [SemVer].
7. **แยก config/secret ออกจากโค้ด** — "เปิด repo เป็น open source ได้ทันทีโดยไม่หลุด credential" [TwelveFactor_Config]; ห้าม log secret [OWASP_Secrets].
8. **Retry อย่างมีงบ** — exponential backoff + jitter, จำกัดจำนวน, retry ชั้นเดียว, แยก error ที่ retry ได้/ไม่ได้ [GoogleSRE_Cascading; AWS_Brooker2019_Retries].
9. **งานขนานต้องไม่แชร์ทรัพยากรที่เปลี่ยนได้โดยไม่ล็อก** [CWE362]; แยก layer/ไฟล์ต่อคน/ต่องาน [OpenUSD_Intro].
10. **คนตรวจต้องเห็นหลักฐาน ไม่ใช่แค่คำตัดสิน** — aid แบบ status/information ทำให้ automation bias น้อยกว่าแบบ command [ParasuramanManzey2010; Goddard2012].
11. **วัดต้นทุนต่อชิ้นที่ผ่าน (cost per accepted output) ไม่ใช่ต่อชิ้นที่ผลิต** [Kapoor2024_AgentsMatter] — (craft) ต่อยอดมาใช้กับ GPU นาที/quota/นาทีคน.
12. **เอกสารอยู่กับโค้ดและอัปเดตใน commit เดียวกัน** [WriteTheDocs_DocsAsCode].

### 2.3 ระดับของ automation (types × levels)
Parasuraman, Sheridan & Wickens (2000) แบ่งหน้าที่เป็น 4 ประเภท — (1) เก็บข้อมูล (2) วิเคราะห์ข้อมูล (3) ตัดสินใจ/เลือก (4) ลงมือ —
แต่ละประเภทเลือกระดับได้ตั้งแต่ manual ถึง fully automatic และเกณฑ์หลักคือผลต่อสมรรถนะของคน [ParasuramanSheridanWickens2000].

ตัวอย่างการจัดระดับ pipeline story carousel (our test — สภาพปัจจุบัน):
| ขั้น | ประเภท | ระดับปัจจุบัน | หมายเหตุ |
|---|---|---|---|
| สร้างภาพ FLUX 2 seed/สไลด์ | (4) action | สูง (อัตโนมัติ) | ฟรี; ล้มเพราะ RAM ได้ |
| ทำ contact sheet | (1)(2) acquisition/analysis | สูง | `sheet.py` |
| เลือก seed | (3) decision | **ต่ำ (คน)** | จุดที่คุณภาพเกิดจริง: หน้า/ใบหน้าจริง/เชือกเหมือนบ่วง |
| วัด sig box (ลบลายเซ็น FLUX) | (2) analysis | ต่ำ→กลาง | ตัวหาอัตโนมัติถูกทิ้ง เพราะพลาดลายเซ็นจาง + จับก้อนหิน/หญ้าผิด (our test 2026-11-23) |
| finish (charcoal tone, ข้อความ) | (4) action | สูง | `finish.py` |
| render + reel | (4) action | สูง | `npm run render`, `reel.sh` |
| ตั้งเวลา IG | (4) action | กลาง (browser script + คนดู) | ความเสี่ยง ToS — ดู §5, §9 |
| ติดป้าย AI | (3) decision | **ต้องเป็นกฎตายตัว** | เคยถูกคัดลอกค่า OFF จากชุดเก่า (our test 2026-11-18) |

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 Automation complacency และ automation bias (THEORY ที่มีหลักฐานทดลองหนุน)
Parasuraman & Manzey (2010) รวมงานวิจัยและเสนอว่าทั้งสองเป็นปรากฏการณ์ที่ทับกัน โดยมี **attention** เป็นแกน [ParasuramanManzey2010]:
- **Complacency** = ตรวจจับความผิดพลาดของระบบได้แย่กว่าตอนทำเอง เกิดเมื่อมี **หลายงานแย่งความสนใจ** (multiple-task load);
  เจอทั้งมือใหม่และผู้เชี่ยวชาญ; ฝึกเพิ่ม 60 นาทีก็ไม่ลด (Singh, Sharma & Parasuraman 2001).
- ตัวเลขคลาสสิก (Parasuraman, Molloy & Singh 1993): ระบบที่เชื่อถือได้ **คงที่** → จับ failure ได้ 33%; ระบบที่ความน่าเชื่อถือ **แปรผัน** → 82%;
  ขณะที่ทำงานเดียวจับได้ ~97%. นัยสำหรับเรา: script ที่ "ไม่เคยพลาด" อันตรายกว่า script ที่พลาดบ่อย เพราะคนเลิกดู.
- **Automation bias** = ใช้คำแนะนำของระบบแทนการหาข้อมูลเอง → **omission error** (ระบบไม่เตือน คนก็ไม่ทำ) และ **commission error** (ทำตามคำแนะนำที่ผิด):
  Mosier et al. 1992 นักบิน 75% ทำตาม electronic checklist ที่ให้ดับเครื่องยนต์ผิดตัว เทียบ 25% เมื่อใช้ checklist กระดาษ;
  Mosier et al. 1998 นักบินทุกคน (100%) ดับเครื่องตาม EICAS alert ปลอม และ 67% "จำได้" ว่าเห็นสัญญาณยืนยันที่ไม่มีอยู่จริง (phantom memory).
- **ตัวปรับ:** การรู้สึก *รับผิดชอบ* (accountability) ลด bias (Skitka, Mosier & Burdick 2000); การ *ได้เจอ* ระบบพลาดตอนฝึก ลด commission error
  ได้ดีกว่าการแค่ "บอกให้ตรวจ" (Bahner, Hüper & Manzey 2008); การให้ข้อมูลความมั่นใจรายครั้งช่วย (McGuirl & Sarter 2006);
  aid แบบ "status" ทำให้ bias น้อยกว่าแบบ "command" แต่ผลนี้ **ไม่ replicate สม่ำเสมอ** [ParasuramanManzey2010].
- Goddard et al. (2012, systematic review 74 งาน): ตัวกลางคือประสบการณ์เฉพาะงาน, trust, ภาระงาน, ความซับซ้อน, **ความกดดันด้านเวลา**;
  ตัวลดคือการฝึก, เน้น accountability, ตำแหน่งคำแนะนำบนจอ, ระดับความมั่นใจ, ให้ "ข้อมูล" แทน "คำแนะนำ" [Goddard2012].
- Lee & See (2004): เป้าหมายคือ **calibrated trust** — ความไว้ใจที่ตรงกับความน่าเชื่อถือจริง ไม่ใช่ไว้ใจมากที่สุด [LeeSee2004].
- Parasuraman & Riley (1997): misuse (พึ่งเกิน), **disuse** (เลิกใช้เพราะ false alarm มาก), abuse (ทำอัตโนมัติโดยไม่คิดผลต่อคน) [ParasuramanRiley1997].

**การแปลไปงานสร้างสรรค์ (inference, medium confidence):** contact sheet ที่มีเครื่องหมาย "ผ่าน" จาก critic อัตโนมัติ = command display;
คนที่เลือก 100 สไลด์ตอนท้ายวันจะคลิกตาม. ทางแก้ตามหลักฐาน: แสดง *หลักฐาน* (crop ใบหน้า/ขอบ/มุม) แทนคำตัดสิน, สอดภาพเสียที่รู้ผล (canary) เข้าไปบางใบ,
ให้คนเลือกเป็นเจ้าของ (ชื่อผู้เลือกใน kit.md), ไม่ตรวจตอนรีบ.

### 3.2 Ironies of automation เป็นกลไก 4 ชั้น (THEORY)
จาก [Bainbridge1983]:
1. **งานที่เหลือให้คนเป็นงานยาก/จับฉ่าย** — ในสตูดิโอ: เครื่องทำ 200 ภาพ คนเหลือ "เลือก + วัด sig box + แก้ redraw" ซึ่งเป็นงานที่ต้องการทักษะสูงสุด.
2. **คนเฝ้าระบบที่นิ่งได้ไม่นาน** (~ครึ่งชั่วโมง) — การดู contact sheet ทีละ 100 ภาพต่อเนื่องเกินขีดนี้.
3. **ระบบอำพรางความผิดปกติ** — `finish.py` ทำให้ภาพทุกใบดู "charcoal" จนความผิด (กล่องเทา, ใบหน้าจริงเล็ก ๆ) มองยากใน thumbnail.
4. **ทักษะเสื่อมเมื่อไม่ใช้** — ถ้าให้ critic อัตโนมัติเลือก seed หมด คนจะตัดสินภาพยากไม่เป็นเมื่อระบบพลาด.

### 3.3 Variation: common vs special cause, control chart และ run rules (FACT ทางสถิติ)
- ขีดจำกัด 3σ เป็นมาตรฐานอุตสาหกรรม; **control limit ≠ specification limit** (เสถียรหรือไม่ ≠ ผ่านสเปกหรือไม่) [NIST_ControlCharts].
- Western Electric rules จับ pattern ที่ไม่สุ่ม เช่น 8 จุดติดกันด้านเดียวของเส้นกลาง; แต่เพิ่ม false alarm จาก ~1/371 จุดเป็น ~1/91.75 [NIST_ControlCharts]
  → trade-off เดียวกับ "disuse เพราะ false alarm" [ParasuramanRiley1997].
- **การประยุกต์ (craft):** อัตรา redraw ต่อ set (เช่น สไลด์ที่ต้องทำ `0Nr-*`) เป็นข้อมูลนับ → ใช้ p-chart ได้; การที่ 3 set ติดกันมีปัญหา "หน้า/ยิ้มบนหัวลูกบอล"
  เป็นสัญญาณ special cause (prompt หรือ style string เปลี่ยน) ไม่ใช่โชคร้าย.

### 3.4 Acceptance sampling vs 100% inspection vs poka-yoke (FACT + PRACTICE)
- Acceptance sampling ใช้เมื่อ 100% inspection แพง/ช้า/ทำลายของ — ตัดสิน "รับ/ไม่รับทั้ง lot" ไม่ได้ประเมินคุณภาพ และเป็น "one-shot" [NIST_AcceptanceSampling].
- Poka-yoke มุ่ง "100% quality โดยหา defect ที่ต้นทาง" [LEI_PokaYoke].
- **ข้อสรุปเชิงออกแบบ (craft):** งานที่ตรวจด้วยเครื่องได้ถูก (ขนาดไฟล์, ความยาวคลิป, loudness, md5 ซ้ำ) → ตรวจ 100% อัตโนมัติ;
  งานที่ต้องใช้ตาคน (ใบหน้า, สื่อความหมาย) → คนดูทุกชิ้น *ที่จะเผยแพร่* (ไม่ใช่ทุก seed); งานรองที่ปริมาณมาก (เฟรมกลางคลิป) → สุ่มตัวอย่าง.

### 3.5 Determinism ของ render: seek-safe และ "time as the only input"
- HyperFrames/`tools/video.mjs` ของเราใช้หลัก "ทุกค่าที่ขยับต้องขึ้นกับเวลาในไทม์ไลน์ ลากไปเฟรมไหนก็ต้องได้ภาพเดิม" (`docs/hyperframes.md`) —
  ทำให้ render ขนานแบ่งช่วงเฟรมได้ และ render ซ้ำได้ผลเดิม (our test: ใช้มาตลอดซีรีส์คลิป).
- ข้อยกเว้นที่ทำให้ไม่ deterministic: font จาก Google Fonts ที่โหลดไม่ทัน (CAPABILITY_MATRIX: "Google Fonts need internet"), `Math.random()` ที่ไม่ seed,
  เวลา wall-clock, การเล่นวิดีโอด้วย real-time. (craft — ตรงกับรายการ timestamps/randomness/locale ของ reproducible builds [ReproBuilds_Def])

### 3.6 Nondeterminism ของโมเดลที่ host โดยคนอื่น (FACT จากแหล่ง industry)
- Batch invariance: ผลของ kernel เปลี่ยนตาม batch size ซึ่งขึ้นกับโหลดเซิร์ฟเวอร์ → output เปลี่ยนแม้ prompt/temperature เดิม [He2025_Nondeterminism].
- นัย: Gemini TTS / Codex จะไม่ให้ take เดิมซ้ำ — **take ที่ผ่านคือทรัพย์สิน** ต้องเก็บ (เช่น reuse `huahin-centara/audio/vo31/07.wav` ตาม memory TTS).

### 3.7 Retry economics: retry = การใช้ทรัพยากรเพิ่ม
- "Retries are selfish" และขยายตัวข้ามชั้น (243x ในตัวอย่าง AWS; 3 retry × 4 ชั้น = 64 ครั้งในตัวอย่าง Google) [AWS_Brooker2019_Retries; GoogleSRE_Cascading].
- เมื่อทรัพยากรคือ **quota รายวัน** ไม่ใช่ CPU: retry ทุกครั้งคือการใช้งบที่หายากที่สุด → ต้องแยก 429 ต่อนาที (รอแล้วลองครั้งเดียว) กับ 429 ต่อวัน (หยุด) (craft จาก [GeminiRateLimits]).

### 3.8 Pipeline debt (THEORY/position)
- Glue code ≥95% และ pipeline jungles [Sculley2015] — ในสตูดิโอ: สคริปต์รายวันใน `tmp/` (picks24.txt, sigs25.txt, finish26.sh, redo26.py, ig-reel.mjs)
  คือ "jungle" ที่ทำงานได้แต่ไม่ถูก version และหายได้ (tmp/ = scratch ตาม CLAUDE.md).
- Dead codepaths/configuration debt: ค่าเริ่มต้นเก่า (AI label OFF) ที่ติดมากับ script → ส่งผลกับงานใหม่โดยไม่มีใครตั้งใจ (our test 2026-11-18).

### 3.9 Agentic pipelines: workflow vs agent และ failure modes
- Workflow เหมาะกับงานซ้ำที่รู้ขั้นตอน; agent เหมาะกับงานเปิด แต่แพงกว่าและ error สะสม ต้องมี stopping condition และ guardrail [Anthropic2024_Agents].
- MAST: failure ที่พบบ่อย — ทำขั้นซ้ำ 15.7%, เหตุผลไม่ตรงการกระทำ 13.2%, ไม่รู้ว่างานเสร็จ 12.4%, ไม่ทำตาม spec 11.8%, verify ผิด 9.1%, verify ไม่ครบ 8.2%;
  มี verifier ช่วยแต่ "ไม่ใช่ยาวิเศษ" — โปรแกรมหมากรุก compile ผ่านแต่ผิดกติกา [Cemri2025_MAST].
- **Criteria drift**: เกณฑ์ตรวจเกิดจากการเห็น output — นิยามครบก่อนเห็นไม่ได้ [Shankar2024_EvalGen]. ตรงกับประสบการณ์เรา: รายการ reject ของ FLUX
  (เชือกเหมือนบ่วง, หน้าคนในหน้าต่างรถ, ตัวอักษรบนเสื้อ, ยิ้มบนหัวลูกบอล) โตขึ้นทุก batch (our test 2026-11-16 → 11-26).

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| Key | พบ/เสนออะไร (ย่อ) | Tier | Access |
|---|---|---|---|
| Bainbridge1983 | Ironies: งานเหลือให้คนยากขึ้น, เฝ้าได้ ~30 นาที, ระบบควร fail obviously, ระบบดีสุดต้องฝึกคนมากสุด | A | full_text |
| Strauch2017 | Ironies ยังไม่ถูกแก้ ปรากฏในอุบัติเหตุภายหลัง | A | abstract |
| ParasuramanRiley1997 | use / misuse / disuse / abuse; false alarm → disuse | A | abstract |
| ParasuramanSheridanWickens2000 | 4 ประเภท × ระดับ automation; เกณฑ์ = ผลต่อคน | A | abstract |
| LeeSee2004 | trust in automation → appropriate (calibrated) reliance | A | abstract |
| ParasuramanManzey2010 | complacency 33% vs 82%; automation bias 75% vs 25%; accountability และประสบการณ์ failure ช่วย | A | full_text |
| Goddard2012 | SR 74 งาน: mediators (เวลา/ภาระ/ความไว้ใจ) และ mitigators | S | abstract |
| ToyotaTPS | jidoka, andon, JIT | C | full_text |
| LEI_PokaYoke | shutdown vs warning; หา defect ที่ต้นทาง | B | full_text |
| NIST_SQC_History / Shewhart1931 | กำเนิด SPC 1924/1931; sampling inspection | B / A | full_text / bibliographic |
| NIST_ControlCharts | 3σ, control ≠ spec, WECO rules และ false alarm | B | full_text |
| NIST_AcceptanceSampling | เมื่อใดใช้ sampling; one-shot | B | full_text |
| HenneEtAl1996 | Toy Story: shot database, Ringmaster, RenderFarm >300 CPU | A | full_text |
| OpenUSD_Intro | layers/override/referencing เพื่องานขนาน | C | full_text |
| VFXRefPlatform | ชุดเวอร์ชันเป้าหมายรายปีกันความไม่เข้ากัน | C | full_text |
| Feldman1979 | make: dependency + rebuild เฉพาะส่วน | A | abstract |
| Fowler2024_CI | แนวปฏิบัติ CI | B | full_text |
| DORA_Metrics | 5 metrics; speed กับ stability ไม่ขัดกัน (อ้าง) | C | full_text |
| ReproBuilds_Def | นิยาม reproducible build | C | full_text |
| DiffusersReproDocs | seed/CPU generator; ไม่รับประกันแม้ seed เดิม | C | full_text |
| He2025_Nondeterminism | LLM temp-0 ไม่ deterministic เพราะ batch invariance | C | full_text |
| Sculley2015 | glue code, pipeline jungles, config debt | A | full_text |
| Anthropic2024_Agents | workflow vs agent; 5 patterns; simplest first | C | full_text |
| Cemri2025_MAST | 14 failure modes ของ multi-agent; verification gap | A | full_text |
| Kapoor2024_AgentsMatter | ต้องวัด cost คู่ accuracy; overfitting; reproducibility | A | abstract |
| Shankar2024_EvalGen | criteria drift; evaluator ต้องถูก validate โดยคน | A | abstract |
| AWS_Brooker2019_Retries | backoff + jitter, token bucket, idempotency | C | full_text |
| GoogleSRE_Cascading | retry budget, retry ชั้นเดียว, deadline | B | full_text |
| GoogleSRE2016 | blameless postmortem + triggers | B | full_text |
| Stripe_Idempotency | idempotency key | C | full_text |
| CWE362 | race condition / TOCTOU | B | full_text |
| TwelveFactor_Config / OWASP_Secrets | config ใน env; ห้าม hardcode/log secret | C / C | full_text |
| WriteTheDocs_DocsAsCode | docs-as-code | D | full_text |
| SemVer / HMS_FileNaming | ห้ามแก้ของที่ปล่อยแล้ว / ตั้งชื่อไฟล์ | C / B | full_text |
| C2PA_Explainer22 | Content Credentials: hard/soft binding; ไม่พิสูจน์ความจริง | S | full_text |
| IPTC_DigitalSourceType | ศัพท์แหล่งที่มาของภาพ รวม generative AI | S | full_text |
| W3C_PROV_Overview2013 | นิยาม provenance: entity/activity/agent | S | full_text |
| Meta2024_AILabels | "AI info" label; self-disclosure | C | full_text |
| EU_AIAct_Art50_FLI | Art. 50: marking + deepfake disclosure, 2 ส.ค. 2026 | C | full_text |
| Tilleke2026_AIAds | ไทย สคบ.: ป้าย AI + สินค้าต้องตรง | C | full_text |
| Meta_ADCTerms2024 / IG_TermsOfUse | ห้าม automated collection โดยไม่ได้รับอนุญาต | C / C | full_text / search_summary |
| IG_ContentPublishingAPI | ช่องทางทางการ: Reels/carousel, 100 (หรือ 50) โพสต์/24 ชม. | C | full_text |
| GeminiRateLimits | RPM/TPM/RPD ต่อ project; reset เที่ยงคืน Pacific | C | full_text |
| GWG_Preflight | preflight ให้เจอปัญหาเร็ว | C | publisher_page |
| XKCD1205 | ตาราง "คุ้มไหมที่จะทำอัตโนมัติ" — craft เท่านั้น | E | full_text |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| ข้อกล่าว | ความแข็งของหลักฐาน | หมายเหตุ / ข้อโต้แย้ง |
|---|---|---|
| Automation bias และ complacency มีจริง เกิดทั้งมือใหม่และผู้เชี่ยวชาญ | **high** (หลายการทดลอง + SR) [ParasuramanManzey2010; Goddard2012] | ส่วนใหญ่เป็น lab/simulator การบิน/แพทย์; การโอนไปงานศิลป์เป็น inference |
| ระบบที่ reliable คงที่ทำให้คนจับ failure แย่กว่าระบบที่แปรผัน (33% vs 82%) | **medium-high** — replicate โดย Singh et al. 1997 | ยังไม่ชัดว่ามีระดับ reliability ต่ำสุดที่ complacency หายไป [ParasuramanManzey2010] |
| การฝึก/คำสั่ง "ให้ตรวจ" ไม่พอป้องกัน bias; การได้เจอ failure จริงช่วย | **medium** | งาน Bahner 2008 เป็นนักศึกษาวิศวะใน microworld |
| Accountability ลด bias | **medium** (Skitka 2000) | ผลต่อ complacency ยังไม่ศึกษาเป็นระบบ [ParasuramanManzey2010] |
| Status display ดีกว่า command display | **low-medium** | McGuirl & Sarter 2006 replicate ไม่ได้ (ตามที่ P&M 2010 รายงาน) |
| First-failure effect | **low-medium** | Rovira 2007 พบ แต่ Wickens et al. 2000 ไม่พบสม่ำเสมอ |
| Ironies of automation | **medium** (argument + อุบัติเหตุภายหลัง) [Bainbridge1983; Strauch2017] | ไม่ใช่การทดลอง; ทรงพลังเชิงอธิบาย |
| Jidoka / poka-yoke ได้ผล | **PRACTICE** (เอกสารบริษัท/LEI) [ToyotaTPS; LEI_PokaYoke] | ไม่มี RCT; หลักฐานเชิงประสบการณ์อุตสาหกรรม |
| Control chart 3σ และ run rules | **FACT** ทางสถิติ [NIST_ControlCharts] | สมมติฐานความเป็นอิสระ/ปกติ; ข้อมูลนับน้อยต้องใช้ p/c chart |
| Speed กับ stability ไม่ขัดกัน (DORA) | **medium** (survey research) [DORA_Metrics] | ถูกวิจารณ์เรื่อง self-report และ causality — ไม่ได้ตรวจรอบนี้ |
| Seed ทำให้ภาพซ้ำได้ | **medium** — ภายใน library/hardware เดียวกันใช่; ข้ามเครื่อง/เวอร์ชันไม่รับประกัน [DiffusersReproDocs] | ComfyUI ไม่ได้ทดสอบข้ามเครื่องในรอบนี้ |
| LLM temp 0 ไม่ deterministic | **medium-high** (การทดลองชัด แต่เป็น blog ไม่ peer-review) [He2025_Nondeterminism] | ผลเฉพาะ stack ที่ทดสอบ |
| Glue code 95% | **low-medium** ("might be") [Sculley2015] | ตัวเลขเชิงสำนวนจากประสบการณ์ Google |
| MAST failure distribution | **medium** (kappa 0.88 มนุษย์; 0.77 LLM) [Cemri2025_MAST] | งาน coding/math; สัดส่วนขึ้นกับ LLM annotator |
| C2PA พิสูจน์ provenance ได้ | **FACT ด้านกลไก** แต่ "ไม่บอกว่าเนื้อหาจริงหรือไม่" และถูกลบได้ [C2PA_Explainer22] | แพลตฟอร์มหลายแห่ง re-encode ลบ metadata (ไม่ได้ทดสอบบน IG รอบนี้) |
| IG ห้าม automation | **uncertain** — ข้อความทางการโหลดไม่ได้; เหลือ search summary [IG_TermsOfUse] + Meta ADC Terms (ห้าม *collection*) [Meta_ADCTerms2024] | การ *โพสต์* เนื้อหาตัวเองผ่าน UI script ไม่ได้ถูกระบุชัดในสิ่งที่อ่าน → ถือเป็นความเสี่ยง ไม่ใช่ข้อห้ามที่ยืนยันแล้ว |
| Gemini quota ต่อ project, reset เที่ยงคืน Pacific | **FACT ณ วันที่อ่าน** [GeminiRateLimits] | ค่า free-tier TTS ไม่อยู่ในหน้า; memory สตูดิโอบันทึก ~10 req/วัน/โมเดล (our test 2026-09-28) |
| Content Publishing API limit | **conflicting** — 100 vs 50 ต่อ 24 ชม. ในหน้าเดียวกัน [IG_ContentPublishingAPI] | ใช้ endpoint `content_publishing_limit` ตรวจค่าจริง |
| XKCD "คุ้มไหม" | **craft/opinion** [XKCD1205] | ไม่นับการลด error และค่าดูแลรักษา |

**ข้อจำกัดของโดเมนนี้โดยรวม:** งานวิจัย human factors แข็งแรงแต่มาจากการบิน/แพทย์/process control; งาน "pipeline สื่อ" ส่วนใหญ่เป็นเอกสารผู้ปฏิบัติ (tier C/D)
ไม่มีงานทดลองที่วัดว่า pipeline แบบใดให้งานสร้างสรรค์ดีกว่า — ข้อสรุปเชิงสร้างสรรค์ในไฟล์นี้จึงเป็น **(craft)** หรือ **(our test)** เว้นแต่ระบุแหล่ง.

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 แบบทั่วไป (domain-neutral): ออกแบบ pipeline 8 ขั้น
1. **เขียนแผนผังขั้น** input → output → คนหรือเครื่อง → ด่านตรวจ (ใช้ตาราง types × levels §2.3) [ParasuramanSheridanWickens2000].
2. **ตั้งชื่อก่อนเริ่ม**: `YYYY-MM-DD_NNN-slug/` + `raw/NN-k.png` + `export/NN.png`; เลขชุดเผื่อ 3 หลัก; ไม่มีช่องว่าง [HMS_FileNaming].
3. **กำหนด key ที่ deterministic** ให้ทุก artifact (kit + slide + seed) → รันซ้ำแล้ว skip/overwrite ได้ ไม่สร้างซ้ำ [Stripe_Idempotency; Feldman1979].
4. **เขียน output แบบ atomic**: เขียนไปไฟล์ชั่วคราวแล้วค่อย rename/move เมื่อเสร็จ เพื่อให้ "มีไฟล์ = เสร็จจริง" (craft; สอดคล้อง atomic operations ใน [CWE362]).
   (our test: `tools/flux.py` ให้ ComfyUI เขียนเสร็จก่อนแล้ว `shutil.move` มาที่ปลายทาง — ใช้กับ skip-if-exists ของ `gen.sh` ได้ปลอดภัยกว่าการเขียนตรง.)
5. **ด่าน poka-yoke ก่อนรัน**: input ครบไหม, glob จับครบไหม (พิมพ์รายการก่อนรัน), quota พอไหม, disk/RAM พอไหม [LEI_PokaYoke].
6. **jidoka ระหว่างรัน**: ถ้าขั้นใดล้ม → exit non-zero, หยุด, บอกชัดว่าล้มที่ไหน; ห้ามเขียนไฟล์ "เกือบถูก" [Bainbridge1983; ToyotaTPS].
7. **ด่านคน (HITL) ที่ออกแบบตามงานวิจัย bias**: ให้เห็นหลักฐาน (crop ขยาย, side-by-side) ไม่ใช่แค่ ✓; ใส่ canary; บันทึกชื่อผู้ตรวจ; ไม่ตรวจตอนรีบ
   [ParasuramanManzey2010; Goddard2012].
8. **บันทึก provenance + log** ต่อ artifact (entity/activity/agent) [W3C_PROV_Overview2013] และเขียน postmortem เมื่อเกิดเหตุตาม trigger ที่ตั้งไว้ [GoogleSRE2016].

### 6.2 Retry policy สำหรับบริการที่มี quota (generic)
```
error type                         action
---------------------------------  -----------------------------------------------
network/timeout (ไม่ได้ใช้ quota)  retry ≤2 ครั้ง, backoff 2^n s + jitter
429 per-minute (RPM/TPM)           รอ ≥60 s + jitter, retry 1 ครั้ง แล้วหยุด
429 per-day (quotaId มี PerDay)    หยุดทันที, บันทึก, เลื่อนไปหลัง reset
SAFETY / content block             ห้าม retry prompt เดิม — แก้ prompt ก่อน (คนตัดสิน)
4xx อื่น (request ผิด)             ห้าม retry — แก้ request
5xx                                retry 1 ครั้ง; ถ้าซ้ำ หยุด
```
หลักที่มา: backoff + jitter + จำกัดจำนวน + แยก retriable [GoogleSRE_Cascading; AWS_Brooker2019_Retries]; RPD reset เที่ยงคืน Pacific, quota ต่อ project [GeminiRateLimits].
**ห้าม probe** (ส่ง request ทดสอบ) เมื่อแต่ละ request คือ quota (our test 2026-09-29).

### 6.3 งานขนาน (parallel) อย่างปลอดภัย
- ให้แต่ละงานมี **output path ของตัวเอง** (unique dir/uuid) — อย่าให้หลายงานอ่าน "ไฟล์ใหม่ล่าสุด" ในโฟลเดอร์ร่วม [CWE362].
- หลังงานขนาน ตรวจ **hash ซ้ำ** (`md5sum`) เป็น gate อัตโนมัติ — ถ้าไฟล์ "ต่างฉาก" มี hash เดียวกัน = race.
- แยกไฟล์ตามความรับผิดชอบ (prompt / picks / finish config) เหมือน USD layers [OpenUSD_Intro].
- จำกัดจำนวนงานขนานตามทรัพยากรที่แย่งกัน (GPU VRAM, RAM) — FLUX ช้าลงเป็น 3–4 นาที/ภาพเมื่อแอปอื่นจับ GPU (our test 2026-11-17).

### 6.4 ต้นทุนต่อชิ้นที่ผ่าน (cost per accepted output)
สูตร (craft ต่อยอดจาก [Kapoor2024_AgentsMatter]):
```
cost_per_accepted = (GPU_min + quota_units × value_per_unit + human_min × value_per_min) / accepted_outputs
yield = accepted / generated
```
ตัวอย่างประกอบ (our test, ตัวเลขประมาณจาก memory 2026-11-24): 20 set × 5 สไลด์ × 2 seed = 200 ภาพ FLUX ใน ~2.5 ชม. GPU →
ถ้า redraw ~6–8 สไลด์ (`0Nr-*`) และทิ้ง seed บางใบ yield ต่อ seed ~45–50% แต่ yield ต่อสไลด์ (มีอย่างน้อย 1 seed ใช้ได้) ~93–95%.
นัย: การสร้าง 2 seed ต่อสไลด์คุ้มกว่า 1 seed + redraw เพราะเวลาคน (รอบแก้) แพงกว่าเวลา GPU ฟรี — แต่สำหรับ **Codex (quota)** สมการกลับข้าง: ถามผู้ใช้ก่อนทุกครั้ง (CLAUDE.md).

### 6.5 Provenance และการติดป้าย AI (generic)
- ระบุแหล่งที่มาด้วยศัพท์ IPTC: ภาพจาก FLUX/Codex ล้วน = `trainedAlgorithmicMedia`; รูปแว่นจริง (cutout) วางในฉาก AI = `compositeSynthetic`;
  แก้บางส่วนด้วย inpaint = `compositeWithTrainedAlgorithmicMedia`; ภาพถ่ายจริงปรับแสง = `algorithmicallyEnhanced`/`minorHumanEdits` [IPTC_DigitalSourceType].
- C2PA เป็นการ *เปิดเผย* ไม่ใช่การรับรองคุณภาพหรือความจริง และอาจถูกลบระหว่างอัปโหลด [C2PA_Explainer22] → **ติดป้ายที่แพลตฟอร์มเอง** (AI info) แทนพึ่ง detection [Meta2024_AILabels].
- โฆษณาสินค้าในไทย: สินค้าในภาพต้องตรงของจริง + ป้าย "ภาพสร้างด้วย AI" ที่อ่านได้ชัด [Tilleke2026_AIAds]; EU ต้อง machine-readable marking (ฝั่ง provider) [EU_AIAct_Art50_FLI].

### 6.6 ประยุกต์กับ pipeline จริงของสตูดิโอ

#### (ก) Story carousels — `gen.sh → sheet.py → pick → finish.py → render → reel.sh → schedule`
| ขั้น | สภาพปัจจุบัน (our test) | ปรับตามหลัก |
|---|---|---|
| `gen.sh` | seed = เลขชุด×1000 + สไลด์×10 (+k); skip ถ้ามี `-2.png`; resumable หลังเครื่องดับเพราะ RAM (2026-11-16) | (1) ก่อน 2026-11-24 seed ตัดเลขชุดผิดทำให้ชุด 3 หลักใช้ seed ซ้ำกัน — เพิ่ม **assert ว่า seed ไม่ซ้ำข้าม kit** (poka-yoke); (2) พิมพ์รายการ kit ที่ glob จับได้ก่อนเริ่ม เพราะ `1[01][0-9]` พลาดชุด 120; (3) log seed ลงไฟล์ ไม่ใช่แค่ stdout |
| `sheet.py` + เลือก | คนเลือก; reject list โตทุก batch (criteria drift) | แสดง crop ขยายบริเวณหัว/หน้าต่าง/ขอบกระดาษ (หลักฐาน) ข้าง thumbnail; บันทึก "เหตุผล reject" เป็นหมวด → รายการตรวจใหม่ [Shankar2024_EvalGen] |
| sig box | วัดจาก strip ย่อพลาดทุกกล่อง → ต้องใช้ crop full-res + grid; ตัวหาอัตโนมัติถูกทิ้ง | ถูกต้องตาม Bainbridge: อย่าให้เครื่องทำครึ่ง ๆ กลาง ๆ แล้วคนเชื่อ; ถ้าจะลองใหม่ ให้เครื่อง *เสนอ* กล่อง + คนยืนยัน (status ไม่ใช่ command) |
| `finish.py` | charcoal tone ทำให้ภาพขาว/ส้มกลายเป็นกล่องเทา (special cause) | gate อัตโนมัติ: วัด contrast/สีของพื้นกระดาษหลัง tone; ถ้าเกิน threshold → หยุดและแจ้ง (jidoka) |
| render + reel | deterministic (HTML/ffmpeg) | gate: ความยาว 19 s, 1080×1920, มีเสียง, loudness ตามสเปกใน 12-production-qc |
| schedule IG | browser automation (`tmp/ig-reel.mjs`), retry loop เพราะรันติดกันล้มทุกครั้งที่สอง; AI label เคยเป็น OFF | ย้าย AI label เป็นค่าคงที่ใน script + gate ก่อนกด schedule; พิจารณาช่องทางทางการ (Meta Business Suite/Content Publishing API) — ดู §9.3 |

#### (ข) Frame-kit → beat-clip (HyperFrames)
- กฎ seek-safe ทำให้ render ซ้ำและขนานได้ (our test). เพิ่ม: pin เวอร์ชัน HyperFrames/FFmpeg ต่อฤดูกาล (แนวคิด VFX Reference Platform) [VFXRefPlatform].
- Codex ขนาน: ให้แต่ละ run เก็บจาก `~/.codex/generated_images/<run-id>/` ของตัวเอง ไม่ใช่ไฟล์ใหม่ล่าสุด; md5 gate หลังรัน (our test 2026-11-11);
  ใส่ `< /dev/null` เมื่อรัน foreground กัน "Reading additional input from stdin" ค้าง (our test).
- Gate ก่อนส่ง: wordmark/โลโก้แบรนด์อยู่ครบ, ไม่มีโลโก้ร้านบนคลิป (house rule), ภาพไม่มีตัวอักษร (ข้อความอยู่ใน HTML layer).

#### (ค) TTS → split → mix
- One request ต่อคลิป ("อ่านทุกบรรทัด เว้น 2 วินาที") แล้ว split by silence ประหยัด quota 7 เท่า (our test 2026-10-02) — แต่ต้องมี gate: ตรวจความยาวเสียงพูดจริงก่อน split
  เพราะ 2.5-flash เคยให้พูด ~4 s แล้วเงียบ 20 s.
- ใช้โมเดลเดียวทั้งคลิป (ความสม่ำเสมอ) และเก็บ take ที่ผ่านเป็น asset ใช้ซ้ำ (เพราะ hosted model ไม่ deterministic [He2025_Nondeterminism]).
- Key อยู่ใน env var `GEMINI_API_KEY` ห้ามเขียนลงไฟล์ (memory + [TwelveFactor_Config; OWASP_Secrets]).

#### (ง) Observability ขั้นต่ำ (craft)
ไฟล์ `kit.md` ต่อ kit มีตาราง: slide · raw ที่เลือก · seed · เหตุผล reject · sig box · ผู้เลือก · วันที่ · เครื่องมือ/เวอร์ชัน · ป้าย AI ที่ตั้ง · วันที่ schedule.
นี่คือ Ringmaster ฉบับสตูดิโอเล็ก [HenneEtAl1996] และ provenance แบบ PROV [W3C_PROV_Overview2013].

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

### 7.1 Pixar *Toy Story* (1995) — pipeline ที่มีฐานข้อมูลเป็นแกน
- **เอกสาร:** ทีม Pixar รายงานใน COMPCON '96 ว่ามี shot database, ระบบ Ringmaster ที่เก็บ inventory + ส่งงาน render ไป RenderFarm >300 CPU
  + ติดตามสถานะ + สั่ง composite อัตโนมัติ, และดึง workstation ว่างเข้า pool; ภาพ ~140,000 ไฟล์ [HenneEtAl1996].
- **การวิเคราะห์ (ของเรา):** สิ่งที่ทำให้ "ภาพยนตร์ทั้งเรื่อง" เป็นไปได้ไม่ใช่ render เร็ว แต่คือ *ทุก asset มีสถานะในฐานข้อมูล* —
  เทียบได้กับ kit.md + โครงโฟลเดอร์มาตรฐานของเรา; บทเรียนคือ "รู้เสมอว่าแต่ละชิ้นอยู่ขั้นไหน".

### 7.2 Toyota — jidoka/andon เป็นหลักออกแบบ automation ที่ให้คนตอบสนองเฉพาะเมื่อผิดปกติ
- **เอกสาร:** Toyota อธิบายว่าเครื่อง/คนหยุดสายทันทีเมื่อพบความผิดปกติ และ andon ทำให้ไม่ต้องเฝ้าเครื่องตลอดเวลา [ToyotaTPS].
- **การวิเคราะห์:** ตรงกับปัญหาเฝ้าจอได้ ~30 นาทีของ Bainbridge — แทนที่จะให้คนเฝ้าทุกภาพ ให้เครื่องตรวจสิ่งที่ตรวจได้ (กล่องเทา, md5 ซ้ำ, ความยาวเสียง)
  และ "ส่งสัญญาณ" เมื่อผิดปกติ; คนเก็บพลังไว้ตัดสินสิ่งที่เครื่องตัดสินไม่ได้.

### 7.3 USD — ทำงานขนานโดยไม่ทับกัน
- **เอกสาร:** USD ให้ศิลปินทำงานใน layer แยก รวมตามลำดับความแรง override แบบ non-destructive [OpenUSD_Intro]; ถูกพัฒนาเป็นรุ่นที่ 4 ของระบบ scene description ของ Pixar.
- **การวิเคราะห์:** หลักเดียวกันแก้ race ของเรา — แยก "ไฟล์ของใครของมัน" แล้วค่อยรวมด้วยกฎชัดเจน แทนการเขียนทับโฟลเดอร์เดียวกัน.

### 7.4 Thinking Machines — ทำ LLM inference ให้ deterministic ได้ (ด้วยต้นทุน)
- **เอกสาร:** batch-invariant kernels ทำให้ 1,000/1,000 completions เหมือนกัน จากเดิม 80 แบบ; ช้าลง 26 s → 42 s (kernel ที่ปรับแล้ว) [He2025_Nondeterminism].
- **การวิเคราะห์:** determinism เป็น *ทางเลือกทางวิศวกรรมที่มีราคา* — สำหรับเรา (ใช้บริการคนอื่น) ทางเลือกที่ถูกกว่าคือเก็บ output ที่ยอมรับแล้ว.

### 7.5 (our test) สตูดิโอ — resumable FLUX batch รอดจากเครื่อง RAM เต็ม
- **บันทึก:** 2026-11-16 gen ถูก kill สองครั้งเพราะ RAM ต่ำ (ชุด 13–20 ไม่มีภาพ) → รัน `gen.sh` ซ้ำวันถัดไป ข้ามภาพที่มีแล้ว ทำต่อจนครบ 20 ชุด (memory story-carousels).
  ต่อมาทำ 160 ชุด (ภาพ ~1,600 ใบ) ด้วย pipeline เดียวกัน.
- **การวิเคราะห์:** idempotent + deterministic seed + atomic move ทำให้ "พัง = แค่หยุดพัก" ไม่ใช่ "พัง = เริ่มใหม่" [Feldman1979; Stripe_Idempotency].

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 (our test) Codex ขนานคัดลอกภาพเดียวกัน — race condition บนทรัพยากรร่วม (2026-11-11)
- **อะไร:** รัน `codex exec` หลายตัวพร้อมกันเพื่อทำ 3 ฉากโปรโมท; แต่ละตัว copy ไฟล์ **ใหม่ล่าสุด** ใน `~/.codex/generated_images` → หลายฉากออกมาเป็นภาพเดียวกัน
  (memory promo-image-feed-style).
- **ทำไม:** time-of-check/time-of-use บนโฟลเดอร์ร่วม — "ใหม่ล่าสุด" ตอนตรวจ ไม่ใช่ภาพของ run นั้น [CWE362].
- **แก้/บทเรียน:** อ่านจาก `<run-id>/` ของตัวเอง; md5 gate หลังงานขนาน; เมื่อแต่ละครั้งใช้ quota ของผู้ใช้ ความเสียหายคือ quota ที่เสียไปกับภาพซ้ำ.

### 8.2 (our test) Gemini TTS: retry loop + probe เผา quota รายวัน (2026-09-29)
- **อะไร:** free tier ~10 request/วัน/โมเดล; quota ทั้งสองโมเดลหมดก่อน 10:30 น.; หลัง reset ได้ take ดีแค่ 4–5 ครั้งก่อน 429 —
  สันนิษฐานว่า retry loop (3 ครั้ง × 20 s) และ probe request กิน quota (memory gemini-tts-sulafat).
- **ทำไม:** retry ถูกออกแบบสำหรับ error ชั่วคราว แต่ 429 ที่ `quotaId` เป็น PerDay ไม่ใช่ชั่วคราว; "retries are selfish" [AWS_Brooker2019_Retries];
  ไม่ได้แยก retriable/non-retriable [GoogleSRE_Cascading]; quota ต่อ project ไม่ใช่ต่อ key [GeminiRateLimits].
- **บทเรียน:** นโยบาย §6.2; รวมทุกบรรทัดเป็น request เดียว; ไม่ probe; วางแผน 1 คลิป/วัน. (หมายเหตุ: ว่า retry ที่ได้ 429 ถูกนับ quota หรือไม่ — เป็น *ข้อสันนิษฐาน* จากการสังเกต ยังไม่ยืนยันกับเอกสาร.)

### 8.3 (our test) ค่า config เก่าติดมา: AI label OFF บน Reels (2026-11-18)
- **อะไร:** ตั้งเวลา Reels โดยคัดลอกค่าจาก flow carousel เดิมที่ AI label OFF; ผู้ใช้ต้องการ ON (memory ig-reels-1x1-ai-label).
- **ทำไม:** configuration debt / dead defaults [Sculley2015]; automation bias แบบ omission — script ไม่ได้ "เตือน" ก็เลยไม่มีใครตรวจ [ParasuramanManzey2010].
- **บทเรียน:** ค่าที่มีผลทางกฎหมาย/นโยบาย (ป้าย AI, ภาษา, โลโก้) ต้องเป็นค่าคงที่ที่ตรวจได้ + gate ก่อนกดยืนยัน; ทบทวนคู่กับ [Meta2024_AILabels; Tilleke2026_AIAds].

### 8.4 (our test) seed ซ้ำข้ามชุดและ glob ตกหล่น — poka-yoke ที่ขาด (2026-11-24)
- **อะไร:** `gen.sh` เวอร์ชันก่อนหน้าแยกเลขชุดไม่ครบ ทำให้ชุด 3 หลักใช้ seed ชุดเดียวกัน (ภาพคล้ายกันข้ามชุด); glob `1[01][0-9]` ไม่จับชุด 120 (memory story-carousels).
- **ทำไม:** ข้อสมมติเงียบ ("เลขชุดมี 2 หลัก") ไม่มีการตรวจ; ระบบไม่ fail obviously [Bainbridge1983].
- **บทเรียน:** assert ความไม่ซ้ำของ seed; พิมพ์/นับ kit ที่จะรันก่อนรัน; ใช้รายการชัดเจนแทน glob ที่ซับซ้อน; ตั้งชื่อเผื่อ 3 หลักตั้งแต่ต้น [HMS_FileNaming].

### 8.5 (documented, ภายนอก) Knight Capital — dead codepath ใน production
- **เอกสาร (ตามที่ Sculley et al. อ้าง):** เสีย $465 ล้านใน 45 นาที "ดูเหมือนเพราะพฤติกรรมไม่คาดคิดจาก experimental codepath ที่เลิกใช้แล้ว" [Sculley2015].
- **บทเรียนต่อสตูดิโอ:** สคริปต์รายวันเก่าใน `tmp/` ที่ยังรันได้ (เช่น caption script ของชุดเก่า) อาจถูกเรียกผิดชุด; ลบหรือย้ายเข้า `tools/` พร้อมเอกสาร.

### 8.6 (typical, labelled) "ตรวจแล้วผ่าน" แต่ผิด requirement จริง
- **แบบแผน:** MAST พบ verification ที่ผ่านแบบผิวเผิน (compile ผ่านแต่ผิดกติกา) [Cemri2025_MAST]. ในสตูดิโอ: "render สำเร็จ / ไฟล์มี 5 ใบ" ไม่ได้แปลว่า
  "ไม่มีใบหน้าจริง, bubble ≤ ~12 ตัวอักษรไทย, ป้าย AI ถูก".
- **บทเรียน:** gate ต้องทดสอบ requirement จริง (ดู checklist §13).

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

### 9.1 ขนาดสตูดิโอ: คนเดียว + agent ≠ สตูดิโอ 300 คน
- Pixar ต้อง database เพราะคนหลายร้อย [HenneEtAl1996]; สตูดิโอเราคนเดียว + agent → "database" = โครงโฟลเดอร์ + kit.md ก็พอ (craft).
- XKCD: งานที่ทำปีละครั้งไม่คุ้มเขียนสคริปต์ยาว [XKCD1205] — แต่ (opinion) ตารางนี้ไม่นับ *ความผิดพลาดที่ลดลง* และงานที่ agent เขียนสคริปต์ให้ถูกลงมาก
  จึงควรคิดเป็น "ความเสี่ยงที่ลด + เวลาที่ประหยัด − ค่าดูแล".

### 9.2 ไทย vs ตะวันตก (กฎหมาย/นโยบาย)
- ไทย (สคบ.): เน้น *การโฆษณาสินค้า* — สินค้าต้องตรงของจริง + ป้าย AI [Tilleke2026_AIAds]. ใช้กับโพสต์แว่น (ขายของ) มากกว่า story carousel (ไม่ขายของ).
- EU: แยกหน้าที่ provider (machine-readable) กับ deployer (เปิดเผย deepfake); งาน artistic/fiction เปิดเผยแบบไม่รบกวนได้ [EU_AIAct_Art50_FLI].
  Mint & Tao = fiction ชัดเจน แต่เราก็ยังเปิดป้าย AI บน Reels (house rule 2026-11-18).
- ข้อมูลลูกค้า: รูปงานลูกค้ามักมีใบเสร็จ/ข้อมูลส่วนตัว → ตัดออกเสมอ (memory promo-image-feed-style); PDPA ฉบับเต็มไม่ได้อ่านรอบนี้ — ดู Domain 09/13 ที่เกี่ยวข้อง.

### 9.3 แพลตฟอร์ม: automation ผ่าน UI vs API ทางการ
- Meta ห้าม *automated data collection* โดยไม่มีหนังสืออนุญาต [Meta_ADCTerms2024]; IG Terms (ตามแหล่งรอง) ห้ามเข้าถึง/เก็บข้อมูลด้วยวิธีที่ไม่ได้รับอนุญาต [IG_TermsOfUse].
- สคริปต์ของเรา *โพสต์เนื้อหาตัวเองในบัญชีตัวเอง* ผ่าน Chrome ที่ผู้ใช้ล็อกอินเอง — ไม่ใช่การเก็บข้อมูล แต่เป็นการขับ UI อัตโนมัติ; ข้อความ ToS ที่อ่านได้
  ไม่ได้ระบุกรณีนี้ชัด → **ความเสี่ยงระดับกลาง ไม่ยืนยัน** (เช่น บัญชีถูกจำกัดถ้าพฤติกรรมดูเหมือน bot). ทางเลือกทางการ: Content Publishing API
  (Reels/carousel, ~100 โพสต์/24 ชม., แอปที่ตั้งเวลาต้องคุม limit เอง) [IG_ContentPublishingAPI] หรือ scheduler ของ Meta เอง.
- แนวปฏิบัติถ้ายังใช้ UI script (craft): ช้าเหมือนคน, ทีละโพสต์, ไม่วน retry ไม่จำกัด, คนดูขั้นสุดท้าย, หยุดทันทีเมื่อ UI เปลี่ยน (jidoka).

### 9.4 ประเภทงาน
- **งานซ้ำปริมาณมาก** (carousel 20 ชุด/วัน): workflow แบบตายตัว + gate อัตโนมัติ + คนตัดสินจุดเดียว [Anthropic2024_Agents].
- **งานชิ้นเดียวมูลค่าสูง** (โปรโมทแบรนด์, คลิปลูกค้า): automation ต่ำ คนตรวจทุกขั้น; quota (Codex) ถามก่อน.
- **งานเสียง/พูด**: hosted TTS ไม่ deterministic + quota ต่ำ → เก็บ take, ไม่ regenerate ถ้าไม่จำเป็น.
- **ซีรีส์ต่อเนื่อง** (story clips EP): ความต่อเนื่องสำคัญ → pin โมเดล/เสียง/สไตล์ต่อซีซัน (VFX ref platform idea) [VFXRefPlatform].

### 9.5 ฮาร์ดแวร์
- RTX 3050 6 GB: FLUX ~40 s–3 นาที/ภาพตามการแย่ง GPU; Wan 480×848 (CAPABILITY_MATRIX) → ตารางงานควรรัน batch ตอนเครื่องว่าง (เหมือน Pixar ดึงเครื่องว่างเข้า pool [HenneEtAl1996]).

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| Domain | เชื่อมอย่างไร |
|---|---|
| 01 creative thinking | automation ทำงานซ้ำ → เวลาคนไปที่ divergent ideation; แต่ระวัง "ทำง่าย = ทำเยอะ" กลบการคิดใหม่ (JIT: ทำเท่าที่ต้องใช้) [ToyotaTPS] |
| 02 psychology & EI | automation bias, complacency, accountability เป็นจิตวิทยาของผู้ตรวจ [ParasuramanManzey2010]; ความเหนื่อยท้าย batch = time pressure [Goddard2012] |
| 03 aesthetic taste | ทักษะเลือก seed เสื่อมถ้าไม่ใช้ (irony) → คนต้องเลือกเองสม่ำเสมอ [Bainbridge1983] |
| 04 visual language | gate อัตโนมัติวัดได้เฉพาะสิ่งวัดได้ (contrast, safe zone); ไวยากรณ์ภาพยังต้องคน |
| 05 semiotics | reject list เชิงความหมาย (เชือกเหมือนบ่วง) เป็นเกณฑ์ที่ต้องคน + criteria drift [Shankar2024_EvalGen] |
| 06 character | character bible เป็น "config ที่ pin" ต่อซีซัน — เปลี่ยนต้องเป็นเวอร์ชันใหม่ [SemVer] |
| 07 worldbuilding/continuity | shot database/continuity log แบบ Toy Story [HenneEtAl1996] = continuity bible ที่ query ได้ |
| 08 philosophy/literature | (opinion) ความเป็นผู้ประพันธ์ในงานที่เครื่องผลิต — provenance บอกว่าใครทำอะไร [W3C_PROV_Overview2013] |
| 09 cultural studies | กฎป้าย AI ต่างประเทศ/ไทย [EU_AIAct_Art50_FLI; Tilleke2026_AIAds] |
| 10 psychoacoustics | gate loudness/ความยาวเสียงอัตโนมัติก่อน mix; TTS take เป็น asset |
| 11 consumer psychology | ป้าย AI กับความไว้ใจ (ดู KoningVoorveld2025 ใน registry — ไม่ได้อ่านซ้ำรอบนี้); cadence การโพสต์ vs ToS |
| 12 criticism | critic อัตโนมัติ = decision aid → ใช้แบบ status ไม่ใช่ command เพื่อลด bias [ParasuramanManzey2010] |
| 13 QA & evaluation | rubric/golden set (Domain 13) คือเนื้อของ gate; ไฟล์นี้คือ *ตำแหน่ง* และ *กลไก* ของ gate; SPC จาก NIST เหมือนกัน |
| 14 knowledge management | blameless postmortem → LEARNING-LOG; docs-as-code ให้ SKILL.md ไม่ล้าสมัย [GoogleSRE2016; WriteTheDocs_DocsAsCode] |

Module อื่นในระบบ: M37 Production Engineering (โมดูลนี้), และ critic tools (`creative-intelligence/tools/critic.py`, skill `creative-critic`) ควรถูกออกแบบเป็น evidence-showing aid.

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 ควรทำอัตโนมัติไหม
| เงื่อนไข | ตัดสิน |
|---|---|
| งานทำ ≥ สัปดาห์ละครั้ง, ขั้นตอนนิ่ง, ตรวจผลด้วยเครื่องได้ | **ทำอัตโนมัติเต็ม** + gate อัตโนมัติ |
| งานซ้ำแต่ผลต้องใช้ตาคนตัดสิน | อัตโนมัติ *รอบ ๆ* การตัดสิน (สร้าง, จัดเรียง, แสดงหลักฐาน) คนตัดสิน |
| งานทำครั้งเดียว/ปีละครั้ง และเสี่ยงต่ำ | ทำมือ (ดู XKCD เป็นสัญชาตญาณ) [XKCD1205] |
| งานใช้ quota/เงินของผู้ใช้ (Codex, Ads) | อัตโนมัติได้แค่เตรียม; **ถามก่อนรันทุกครั้ง** (CLAUDE.md) |
| งานกระทบนโยบาย/กฎหมาย (ป้าย AI, ข้อมูลลูกค้า) | ค่าคงที่ + gate บังคับ + คนยืนยัน |
| งานขับ UI ของแพลตฟอร์มภายนอก | ใช้ API/เครื่องมือทางการก่อน; UI script เป็นทางเลือกสุดท้าย + ช้า + มีคนดู [IG_ContentPublishingAPI] |

### 11.2 Workflow หรือ agent
- ขั้นตอนรู้ล่วงหน้า + ต้องทำซ้ำ → **workflow (สคริปต์)**; ขั้นตอนเปิด/ต้องคิด → agent พร้อม stopping condition [Anthropic2024_Agents].
- ถ้า agent ทำขั้นเดิมซ้ำ (step repetition) หรือไม่รู้ว่าเสร็จ → เปลี่ยนเป็น workflow ที่มีเงื่อนไขจบชัด [Cemri2025_MAST].

### 11.3 ตรวจแบบไหน
| ลักษณะ defect | วิธี |
|---|---|
| วัดด้วยเครื่องได้ ถูก (ขนาด, ความยาว, hash, loudness) | 100% อัตโนมัติ (poka-yoke) |
| ต้องใช้ตา แต่ทุกชิ้นถูกเผยแพร่ (สไลด์, ปกคลิป) | คนดูทุกชิ้น พร้อมหลักฐานขยาย |
| ต้องใช้ตา ปริมาณมาก ความเสี่ยงต่ำ (เฟรมกลางคลิป) | สุ่มตัวอย่าง; เจอ 1 → ตรวจทั้ง lot [NIST_AcceptanceSampling] |
| อัตราเสียเปลี่ยนตามเวลา | ทำ p-chart ต่อ batch [NIST_ControlCharts] |

### 11.4 Retry หรือหยุด
- ใช้ตาราง §6.2. กฎสั้น: *ถ้า retry ใช้ quota ที่หายาก → ไม่ retry อัตโนมัติ เกิน 1 ครั้ง; ถ้า error บอกว่ารายวัน → หยุด*.

### 11.5 ขนานได้ไหม
- ขนานได้ถ้า: แต่ละงานมี output path ของตัวเอง, ทรัพยากรแย่ง (GPU/RAM/quota) พอ, และมี gate ตรวจซ้ำหลังจบ.
- ห้ามขนานถ้า: เครื่องมืออ่าน "ไฟล์ล่าสุด" ร่วมกัน (Codex แบบเดิม), หรือ quota แชร์ต่อ project (Gemini) ที่ทำให้ขนาน = เผาเร็วขึ้น.

### 11.6 แก้ไขของที่ปล่อยแล้ว
- ห้ามเขียนทับ; ทำเวอร์ชันใหม่ (`04r-1`, `v2`) และเก็บต้นฉบับ ("อย่าลบ") [SemVer].

---

## 12. แบบฝึกหัด (Exercises)

1. **(พื้นฐาน) วาด pipeline:** เลือก pipeline หนึ่งของสตูดิโอ เขียนตาราง ขั้น · input · output · คน/เครื่อง · gate · artifact key.
   *คำตอบที่ดี:* ทุกขั้นมี output ที่ตั้งชื่อ deterministic, ระบุจุดที่คนตัดสินไม่เกิน 1–2 จุด, มี gate ก่อนเผยแพร่.
2. **(พื้นฐาน) Retry policy:** เขียนนโยบาย retry ให้ `gemini_tts.py` จาก error 5 แบบ.
   *ดี:* แยก PerDay 429 ออกจาก per-minute, ไม่ probe, ไม่ retry SAFETY, อ้าง [GoogleSRE_Cascading].
3. **(กลาง) หา race:** อ่านขั้นตอนรัน Codex ขนานแล้วระบุทรัพยากรร่วม 2 อย่างและวิธีแยก.
   *ดี:* ชี้ `generated_images` และ quota; เสนอ per-run dir + md5 gate; อธิบาย TOCTOU [CWE362].
4. **(กลาง) ออกแบบ HITL ตามงานวิจัย:** ออกแบบหน้าจอเลือก seed ที่ลด automation bias.
   *ดี:* แสดงหลักฐาน (crop) ไม่ใช่ ✓, ใส่ canary, บันทึกผู้เลือก, จำกัดเวลาต่อรอบ ~30 นาที, อ้าง [ParasuramanManzey2010; Bainbridge1983].
5. **(กลาง) Provenance:** เขียน record PROV สำหรับสไลด์ 04 ของชุด 141 (entity/activity/agent) และเลือก IPTC digital source type.
   *ดี:* ระบุ raw → finish → export เป็นสาย, seed, โมเดล, ผู้เลือก; เลือก `trainedAlgorithmicMedia` และอธิบายว่าทำไมไม่ใช่ `compositeSynthetic`.
6. **(สูง) Control chart:** ใช้จำนวน redraw ต่อชุด 20 ชุดล่าสุด (จาก kit.md) ทำ p-chart, ระบุว่ามี special cause ไหม.
   *ดี:* คำนวณ p̄ และขีด 3σ ถูก, ใช้ run rule อย่างระวัง false alarm, เชื่อมสาเหตุกับการเปลี่ยน prompt/STY [NIST_ControlCharts].
7. **(สูง) ToS risk memo:** เขียน 1 หน้าเปรียบเทียบ UI script vs Content Publishing API สำหรับตั้งเวลา Reels.
   *ดี:* แยกสิ่งที่ยืนยันได้ (ADC terms, API limit) จากสิ่งที่ไม่ยืนยัน (ข้อความ IG ToS), ระบุข้อมูลที่ต้องเช็ก, ไม่ฟันธงเกินหลักฐาน.
8. **(สูง) Postmortem:** เขียน blameless postmortem ของเหตุ AI label OFF (2026-11-18).
   *ดี:* timeline, impact, root cause (config debt + omission), action items ที่เป็น gate จริง ไม่ใช่ "ระวังมากขึ้น" [GoogleSRE2016].

---

## 13. Checklist (ก่อนส่งมอบ/ก่อนรัน batch)

ก่อนรัน
1. [ ] รายการงานที่จะรัน (kits/slides) ถูกพิมพ์และนับแล้ว ตรงกับที่ตั้งใจ (ไม่มี glob ตกหล่น)
2. [ ] seed/ชื่อ output ไม่ซ้ำข้ามงาน (assert ผ่าน)
3. [ ] ถ้าใช้ quota/เงินผู้ใช้ — ผู้ใช้อนุญาตแล้วในรอบนี้
4. [ ] ทรัพยากรพอ (RAM/GPU/disk; quota เหลือ; เวลา reset ทราบแล้ว)
5. [ ] งานขนานมี output path แยก ไม่มีการอ่าน "ไฟล์ล่าสุด" ร่วมกัน
6. [ ] ไม่มี secret อยู่ในไฟล์/สคริปต์/log ที่จะ commit

ระหว่าง/หลังรัน
7. [ ] ทุกขั้นที่ล้ม exit non-zero และหยุด (ไม่มีไฟล์ครึ่ง ๆ ที่ดูเหมือนเสร็จ)
8. [ ] ตรวจ hash ซ้ำหลังงานขนานแล้ว
9. [ ] gate อัตโนมัติผ่าน: ขนาด/อัตราส่วน, ความยาว, มีเสียง, loudness, ไม่มีกล่องเทา/พื้นผิดปกติ
10. [ ] คนตรวจทุกชิ้นที่จะเผยแพร่ ด้วยหลักฐานขยาย (ใบหน้า/ตัวอักษร/วัตถุอันตราย) ไม่ใช่จาก thumbnail
11. [ ] เหตุผล reject ใหม่ถูกเพิ่มลง checklist/reject list

ก่อนเผยแพร่
12. [ ] ป้าย AI ตั้งตามกฎ (Reels story = ON; โฆษณาสินค้า = ป้ายชัด + สินค้าตรงของจริง)
13. [ ] ไม่มีข้อมูลลูกค้า (ใบเสร็จ, ชื่อ, เบอร์) ในภาพ
14. [ ] ไม่ได้เขียนทับไฟล์ที่ปล่อยแล้ว — เวอร์ชันใหม่มีชื่อใหม่ ต้นฉบับยังอยู่
15. [ ] kit.md บันทึก raw/seed/ผู้เลือก/เครื่องมือ/วันที่/ป้าย AI/วันตั้งเวลา
16. [ ] ถ้าใช้ UI automation กับแพลตฟอร์ม — รันทีละโพสต์ มีคนดู และไม่วน retry ไม่จำกัด
17. [ ] เอกสาร (SKILL.md/kit.md/LEARNING-LOG) อัปเดตพร้อมการเปลี่ยนสคริปต์

---

## 14. Evaluation Rubric (ประเมิน pipeline/การรัน 1 ครั้ง)

| เกณฑ์ | 1 — อ่อน | 2 — พอใช้ | 3 — ดี | 4 — ยอดเยี่ยม |
|---|---|---|---|---|
| **A. Reproducibility & provenance** | ไม่รู้ว่าภาพมาจาก seed/โมเดลไหน | seed อยู่ใน stdout เท่านั้น | kit.md บันทึก raw + seed + โมเดล | บันทึกครบ entity/activity/agent + เวอร์ชันเครื่องมือ + IPTC type; ทำซ้ำได้ภายใน tolerance |
| **B. Idempotency & failure handling** | รันซ้ำแล้วซ้ำซ้อน/ทับ; ล้มเงียบ | resumable บางขั้น | ทุกขั้น skip-if-done + exit non-zero | + atomic write + jidoka gate หยุดเมื่อผิดปกติ + retry policy แยก error |
| **C. Human checkpoint design** | คนกด ✓ ตาม thumbnail | คนดูภาพเต็มบางส่วน | คนดูทุกชิ้นที่เผยแพร่ด้วยหลักฐาน | + canary, บันทึกผู้ตรวจ, รอบไม่เกิน ~30 นาที, reject reason ถูกเก็บเป็นเกณฑ์ |
| **D. Concurrency & resource/quota** | ขนานบนทรัพยากรร่วม; quota หมดไม่รู้ตัว | รู้ quota แต่ไม่วางแผน | path แยก + md5 gate; quota วางแผนตาม reset | + ต้นทุนต่อชิ้นที่ผ่านถูกวัดและใช้ตัดสินจำนวน seed/งานขนาน |
| **E. Compliance & safety** | ป้าย AI ผิด/ข้อมูลลูกค้าหลุด/secret ในไฟล์ | ตรวจด้วยความจำ | ค่าคงที่ + checklist | + gate บังคับ + ใช้ช่องทางทางการเมื่อมี + บันทึกความเสี่ยง ToS ที่ยังไม่ยืนยัน |
| **F. Maintainability (docs & debt)** | สคริปต์กระจายใน tmp/ ไม่มีเอกสาร | มีเอกสารแต่ล้าสมัย | สคริปต์หลักอยู่ใน tools/ + เอกสารตรง | + docs-as-code, postmortem หลังเหตุ, ลบ dead path |

**วิธีให้คะแนน:** ให้ A–F ละ 1–4 (รวม 6–24). ≥20 = พร้อมใช้ซ้ำ; 15–19 = ใช้ได้แต่ต้องปรับ; <15 = อย่าขยาย batch.
**Critical failures (ไม่ผ่านทันทีไม่ว่าคะแนนรวม):** (1) secret อยู่ในไฟล์ที่ commit หรือ log; (2) ข้อมูลลูกค้าในภาพที่เผยแพร่;
(3) ใช้ quota/เงินผู้ใช้โดยไม่ได้ถาม; (4) ป้าย AI ผิดจากกฎที่ตกลง; (5) เขียนทับ/ลบงานที่ปล่อยแล้วหรือที่ผู้ใช้บอกให้เก็บ; (6) ภาพที่เผยแพร่มีใบหน้าจริงในซีรีส์ faceless.

---

## 15. แหล่งอ้างอิง (References)

- **[Bainbridge1983]** Bainbridge, L. (1983). Ironies of automation. *Automatica*, 19(6), 775–779. doi:10.1016/0005-1098(83)90046-8. https://gwern.net/doc/sociology/technology/1983-bainbridge.pdf — full_text
- **[Strauch2017]** Strauch, B. (2017). Ironies of Automation: Still Unresolved After All These Years. *IEEE Transactions on Human-Machine Systems*. doi:10.1109/THMS.2017.2732506 — abstract
- **[ParasuramanRiley1997]** Parasuraman, R., & Riley, V. (1997). Humans and Automation: Use, Misuse, Disuse, Abuse. *Human Factors*, 39(2). doi:10.1518/001872097778543886 — abstract
- **[ParasuramanSheridanWickens2000]** Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Trans. SMC-A*, 30(3). doi:10.1109/3468.844354 — abstract
- **[LeeSee2004]** Lee, J. D., & See, K. A. (2004). Trust in Automation: Designing for Appropriate Reliance. *Human Factors*, 46(1). doi:10.1518/hfes.46.1.50_30392 — abstract
- **[ParasuramanManzey2010]** Parasuraman, R., & Manzey, D. H. (2010). Complacency and Bias in Human Use of Automation: An Attentional Integration. *Human Factors*, 52(3). doi:10.1177/0018720810376055. Author copy: https://doi.org/10.14279/depositonce-8052 — full_text
- **[Goddard2012]** Goddard, K., Roudsari, A., & Wyatt, J. C. (2012). Automation bias: a systematic review of frequency, effect mediators, and mitigators. *JAMIA*, 19(1). doi:10.1136/amiajnl-2011-000089. https://europepmc.org/articles/PMC3240751 — abstract
- **[ToyotaTPS]** Toyota Motor Corporation. Toyota Production System. https://global.toyota/en/company/vision-and-philosophy/production-system/ — full_text
- **[LEI_PokaYoke]** Lean Enterprise Institute. Poka yoke (Lean Lexicon). https://www.lean.org/lexicon-terms/poka-yoke/ — full_text
- **[NIST_SQC_History]** NIST/SEMATECH e-Handbook of Statistical Methods, 6.1.1. https://itl.nist.gov/div898/handbook/pmc/section1/pmc11.htm — full_text
- **[NIST_AcceptanceSampling]** NIST/SEMATECH e-Handbook, 6.2.1 What is acceptance sampling? https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc21.htm — full_text
- **[NIST_ControlCharts]** NIST/SEMATECH e-Handbook, 6.3.2 What are Variables Control Charts? https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm — full_text
- **[Shewhart1931]** Shewhart, W. A. (1931). *Economic Control of Quality of Manufactured Product*. Van Nostrand (per NIST). — bibliographic
- **[HenneEtAl1996]** Henne, M., Hickel, H., Johnson, E., & Konishi, S. (1996). The Making of Toy Story. *Proceedings of COMPCON Spring '96*, IEEE, 463–468. https://people.uncw.edu/ricanekk/teaching/spring09/csc100/lectures/pattersone/TheMakingOfToyStory.pdf — full_text
- **[OpenUSD_Intro]** Pixar / OpenUSD. Introduction to USD. https://openusd.org/release/intro.html — full_text
- **[VFXRefPlatform]** VES Technology Committee. VFX Reference Platform. https://vfxplatform.com/ — full_text
- **[Feldman1979]** Feldman, S. I. (1979). Make — a program for maintaining computer programs. *Software: Practice and Experience*, 9(4). doi:10.1002/spe.4380090402 — abstract
- **[Fowler2024_CI]** Fowler, M. (2000, rev. 2024). Continuous Integration. https://martinfowler.com/articles/continuousIntegration.html — full_text
- **[DORA_Metrics]** DORA. DORA's software delivery metrics. https://dora.dev/guides/dora-metrics/ — full_text
- **[ReproBuilds_Def]** Reproducible Builds. Definitions. https://reproducible-builds.org/docs/definition/ — full_text
- **[DiffusersReproDocs]** Hugging Face. Reproducibility (Diffusers v0.43). https://huggingface.co/docs/diffusers/using-diffusers/reusing_seeds — full_text
- **[He2025_Nondeterminism]** He, H., & Thinking Machines Lab (2025, 10 Sep). Defeating Nondeterminism in LLM Inference. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/ — full_text
- **[Sculley2015]** Sculley, D., Holt, G., Golovin, D., Davydov, E., Phillips, T., et al. (2015). Hidden Technical Debt in Machine Learning Systems. *NIPS 28*, 2503–2511. https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf — full_text
- **[Anthropic2024_Agents]** Schluntz, E., & Zhang, B. (2024, 19 Dec). Building effective agents. Anthropic. https://www.anthropic.com/engineering/building-effective-agents — full_text
- **[Cemri2025_MAST]** Cemri, M., Pan, M. Z., Yang, S., et al. (2025). Why Do Multi-Agent LLM Systems Fail? arXiv:2503.13657 (NeurIPS 2025). https://arxiv.org/abs/2503.13657 — full_text
- **[Kapoor2024_AgentsMatter]** Kapoor, S., Stroebl, B., Siegel, Z. S., Nadgir, N., & Narayanan, A. (2024). AI Agents That Matter. arXiv:2407.01502. https://arxiv.org/abs/2407.01502 — abstract
- **[Shankar2024_EvalGen]** Shankar, S., Zamfirescu-Pereira, J. D., Hartmann, B., Parameswaran, A. G., & Arawjo, I. (2024). Who Validates the Validators? arXiv:2404.12272 (UIST 2024). https://arxiv.org/abs/2404.12272 — abstract
- **[AWS_Brooker2019_Retries]** Brooker, M. (2019). Timeouts, retries, and backoff with jitter. Amazon Builders' Library. https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter — full_text
- **[GoogleSRE_Cascading]** Ulrich, M. (2016). Addressing Cascading Failures. In Beyer et al. (eds.), *Site Reliability Engineering*, O'Reilly. https://sre.google/sre-book/addressing-cascading-failures/ — full_text
- **[GoogleSRE2016]** Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (eds.) (2016). Postmortem Culture: Learning from Failure. *Site Reliability Engineering*. https://sre.google/sre-book/postmortem-culture/ — full_text
- **[Stripe_Idempotency]** Stripe. Idempotent requests. https://docs.stripe.com/api/idempotent_requests — full_text
- **[CWE362]** MITRE. CWE-362: Concurrent Execution using Shared Resource with Improper Synchronization ('Race Condition'). https://cwe.mitre.org/data/definitions/362.html — full_text
- **[TwelveFactor_Config]** Wiggins, A. The Twelve-Factor App — III. Config. https://12factor.net/config — full_text
- **[OWASP_Secrets]** OWASP. Secrets Management Cheat Sheet. https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html — full_text
- **[WriteTheDocs_DocsAsCode]** Write the Docs. Docs as Code. https://www.writethedocs.org/guide/docs-as-code/ — full_text
- **[SemVer]** Preston-Werner, T. Semantic Versioning 2.0.0. https://semver.org/ — full_text
- **[HMS_FileNaming]** Harvard Medical School Data Management. File naming conventions. https://datamanagement.hms.harvard.edu/collect/file-naming-conventions — full_text
- **[C2PA_Explainer22]** C2PA. C2PA Explainer v2.2. https://spec.c2pa.org/specifications/specifications/2.2/explainer/Explainer.html — full_text
- **[IPTC_DigitalSourceType]** IPTC. NewsCodes Digital Source Type. https://cv.iptc.org/newscodes/digitalsourcetype/ — full_text
- **[W3C_PROV_Overview2013]** W3C Provenance WG (2013). PROV-Overview. https://www.w3.org/TR/prov-overview/ — full_text
- **[Meta2024_AILabels]** Meta (2024, updated). Our Approach to Labeling AI-Generated Content and Manipulated Media. https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/ — full_text
- **[EU_AIAct_Art50_FLI]** Future of Life Institute (2026). The EU AI Act's Transparency Rules: A Practical Guide to Article 50. https://artificialintelligenceact.eu/transparency-rules-article-50/ — full_text
- **[Tilleke2026_AIAds]** Tilleke & Gibbins (2026). Thailand's Advertising Guidelines Targeting AI-Generated Content. https://www.tilleke.com/insights/thailands-advertising-guidelines-targeting-ai-generated-content/ — full_text
- **[Meta_ADCTerms2024]** Meta. Automated Data Collection Terms (effective 7 Oct 2024). https://www.facebook.com/legal/automated_data_collection_terms — full_text
- **[IG_TermsOfUse]** Instagram. Terms of Use. https://help.instagram.com/581066165581870 — search_summary (official page did not load; unverified wording)
- **[IG_ContentPublishingAPI]** Meta for Developers. Instagram Platform: Content Publishing. https://developers.facebook.com/docs/instagram-platform/content-publishing/ — full_text
- **[GeminiRateLimits]** Google. Gemini API rate limits. https://aistudio.google.com/docs/rate-limits — full_text
- **[GWG_Preflight]** Ghent Workgroup. Everything you need to know about commercial print. https://gwg.org/commercial-print/ — publisher_page
- **[XKCD1205]** Munroe, R. Is It Worth the Time? (xkcd 1205). https://xkcd.com/1205/ — full_text

**แหล่งภายใน (ไม่ใช่ research source; เป็นบันทึก our test):** auto-memory `story-carousels-2026-11-16.md`, `promo-image-feed-style.md`, `gemini-tts-sulafat.md`,
`ig-reels-1x1-ai-label.md`; `carousel/stories/gen.sh`, `carousel/stories/reel.sh`, `tools/flux.py`, `docs/hyperframes.md`, `creative-intelligence/CAPABILITY_MATRIX.json`.

**ยังไม่ได้เข้าถึง/ตรวจ:** ข้อความทางการปัจจุบันของ Instagram Terms (หน้า JS โหลดไม่ได้); spec GWG/PDF/X ฉบับเต็ม; MIL-STD-105/AQL; Shewhart 1931 ฉบับเต็ม;
ตัวบท EU AI Act ใน Official Journal และสถานะสุดท้ายของ AI Omnibus; ค่า free-tier TTS ปัจจุบันของ Gemini; ว่า 429 ถูกนับเข้า quota หรือไม่ (ยังเป็นข้อสันนิษฐานจากการสังเกต).
