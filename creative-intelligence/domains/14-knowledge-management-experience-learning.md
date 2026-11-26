# 14 — Knowledge Management and Experience Learning (การจัดการความรู้และการเรียนรู้จากประสบการณ์)

Module: **M40** · วันที่: 2026-11-26 · ผู้เขียน: research agent (domain 14)

**Scope — ครอบคลุม:** ประวัติ KM (Polanyi tacit knowledge, Nonaka SECI + คำวิจารณ์, communities of practice, Argyris & Schön single/double loop, Senge, organisational learning/memory), experiential learning (Kolb + คำวิจารณ์, deliberate practice + meta-analysis/replication), after-action review / debrief (meta-analysis 2 ชิ้น), lessons-learned systems และเหตุที่ล้มเหลว (GAO 2002, NASA OIG 2012), postmortem ในอุตสาหกรรม (Google SRE, Pixar), case-based reasoning (Aamodt & Plaza 4R), memory/retrieval สำหรับ AI agent (RAG, Generative Agents, Reflexion, ExpeL, MemGPT, CoALA, lost-in-the-middle, distraction, self-correction limits), bias ในการทบทวน (hindsight, outcome bias), การบันทึกรสนิยม/การอนุมัติของผู้ใช้ (preference construction, implicit feedback), provenance (W3C PROV-O), data hygiene/privacy (GDPR Art. 5), บริบทไทย (kreng jai), การวัดว่าระบบบทเรียนช่วยจริงไหม.

**ไม่ครอบคลุม:** วิธีเขียนโค้ด vector database / embedding model เฉพาะยี่ห้อ; กฎหมาย PDPA ไทยฉบับเต็ม (ยังไม่ได้อ่านในรอบนี้ — ดู §9); knowledge graph / ontology engineering เชิงลึก; HR/talent management; ระบบ QA ของงานแต่ละชิ้น (อยู่ใน domain 13).

**Status: SOURCE VERIFIED** — 47 จาก 53 sources (89%) อ่านเป็น full_text หรือ abstract.

**Counts — tier:** S 11 · A 38 · B 2 · C 2 (D/E 0). **access_status:** full_text 9 · abstract 38 · publisher_page 1 · bibliographic 3 · search_summary 2.

**Builds on (ลิงก์ ไม่คัดลอก):** `creative-intelligence/MASTER_INDEX.md` · `creative-intelligence/LESSONS_LEARNED.md` · `creative-intelligence/memory/README.md` (+ `memory/FEEDBACK_HISTORY.json`, `PROMPT_EXPERIMENTS.json`, `QUALITY_BENCHMARKS.json`) · `creative-intelligence/DESIGN_PATTERNS.md` · `creative-intelligence/ANTI_PATTERNS.md` · `story-clips/_craft/LEARNING-LOG.md` · `creative-intelligence/LEARNING_PROGRESS.json` (M40 = DRAFTED, folder `knowledge/knowledge-management` ยังไม่มี, files = MASTER_INDEX + tools/registry.py).

**ป้ายกำกับที่ใช้:** `[Key]` = มีใน sources JSON · **FACT** (ทำซ้ำได้ดี/หลักฐานแข็ง) · **THEORY** (โมเดล อาจถูกโต้แย้ง) · **PRACTICE** (ธรรมเนียมวิชาชีพ) · **(craft)** / **(opinion)** / **(our test)** = ไม่ใช่ผลวิจัย · **(our analysis)** = การวิเคราะห์ของเราเองจากไฟล์ใน repo.

---

## 1. ประวัติศาสตร์และพัฒนาการ (History & development)

### 1.1 เส้นเวลา

| ปี | คน/งาน | ความคิดหลัก | ป้าย |
|---|---|---|---|
| 1966 | Polanyi, *The Tacit Dimension* | "tacit knowledge" — ความรู้ที่ฝังในการกระทำ อธิบายเป็นคำได้ไม่หมด; ภายหลังถูกใช้เป็นภาพ "ภูเขาน้ำแข็ง" (explicit อยู่เหนือน้ำ, tacit อยู่ใต้น้ำ) | [Polanyi1966] bibliographic; เนื้อหาผ่าน [Farnese2019] |
| 1976–78 | Argyris; Argyris & Schön | **single-loop** (แก้การกระทำให้ถึงเป้าเดิม) vs **double-loop** (ตั้งคำถามกับกฎ/เป้า/สมมติฐานที่กำกับการกระทำ) | [Argyris1976] [ArgyrisSchon1978] |
| 1984 | Kolb, *Experiential Learning* | วงจรเรียนรู้จากประสบการณ์; ใช้จัดโครงสร้างคาบ/คอร์ส; ผูกกับ "learning styles" | [Kolb1984] bibliographic; ผ่าน [HealeyJenkins2000] |
| 1988 | Levitt & March | องค์กรเรียนรู้โดย "encode inferences from history into routines" — บทเรียนกลายเป็นของ organisation เมื่อฝังใน routine | [LevittMarch1988] |
| 1990 | Senge, *The Fifth Discipline* | "learning organization" (ถูกอ้างโดย Weber et al. ว่าเป็นเป้าของ KM) | ผ่าน [Weber2000] — ตัวหนังสือไม่ได้อ่าน |
| 1990 | Argote & Epple (Science) | learning curve: องค์กรเก่งขึ้นตามประสบการณ์ แต่ "อัตรา" ต่างกันมาก — เพราะ organisational forgetting, turnover, transfer | [ArgoteEpple1990] |
| 1991 | Lave & Wenger | situated learning, **legitimate peripheral participation** — มือใหม่เรียนโดยเข้าร่วมงานจริงจากขอบเข้ากลาง | [LaveWenger1991] |
| 1991 | Walsh & Ungson | organisational memory: acquisition → retention → retrieval; memory ถูกใช้ ใช้ผิด หรือใช้ในทางที่ผิดได้ | [WalshUngson1991] |
| 1993 | Ericsson, Krampe, Tesch-Römer | **deliberate practice** อธิบายความเชี่ยวชาญ | [Ericsson1993] |
| 1993 | US Army TC 25-20 | คู่มือ AAR ของกองทัพ (ไม่ได้อ่านต้นฉบับในรอบนี้ — ไม่อ้างเนื้อหา) | — |
| 1994 | Nonaka | SECI: ความรู้ถูกสร้างจาก "dialogue" ระหว่าง tacit กับ explicit, 4 รูปแบบ | [Nonaka1994] |
| 1994 | Aamodt & Plaza | Case-Based Reasoning framework: retrieve → reuse → revise → retain (4R) | [AamodtPlaza1994] |
| 1995 | Darr, Argote, Epple | ร้านพิซซ่า 36 ร้าน: ความรู้จาก learning-by-doing **เสื่อมเร็ว**, ส่งต่อได้ในเครือเดียวกันแต่ไม่ข้ามเครือ | [Darr1995] |
| 1996 | Kluger & DeNisi | feedback ช่วยเฉลี่ย d=.41 แต่ >1/3 ทำให้แย่ลง | [KlugerDeNisi1996] |
| 1999 | Edmondson | psychological safety → learning behaviour → performance | [Edmondson1999] |
| 2000 | Wenger | communities of practice เป็นส่วนของ social learning systems | [Wenger2000] |
| 2000–01 | Weber, Aha et al. | lessons-learned repositories ส่วนใหญ่ "passive" — ผู้ใช้มองว่าไร้ประโยชน์; เสนอ **active lessons delivery** | [Weber2000] [Weber2001] |
| 2001 | Alavi & Leidner | KMS = สนับสนุน create/transfer/apply ความรู้ | [AlaviLeidner2001] |
| 2002 | GAO-02-195 | NASA: บทเรียนไม่ถูกเก็บ/แชร์/ใช้เป็นประจำ | [GAO2002] |
| 2003 | CAIB | Columbia: สาเหตุเชิงองค์กรของ Challenger ยังไม่ถูกแก้ | [CAIB2003] search_summary |
| 2005 | Ellis & Davidi | ทบทวนทั้งความสำเร็จและความล้มเหลวดีกว่าทบทวนแต่ความล้มเหลว | [EllisDavidi2005] |
| 2006 | Gourlay | วิจารณ์ SECI: ไม่มีหลักฐานที่อธิบายด้วยทางที่ง่ายกว่าไม่ได้ | [Gourlay2006] |
| 2008 | Pashler et al. | learning styles (meshing) ไม่มีหลักฐานพอ | [Pashler2008] |
| 2008 | Catmull (Pixar) | postmortem: คนเรียนรู้จากมันแต่ไม่ชอบทำ; เปลี่ยนรูปแบบ, top-5 keep / top-5 not, ใช้ข้อมูล | [Catmull2008] |
| 2010 | Bergsteiner et al. | วิจารณ์โมเดลภาพของ Kolb ว่ามีข้อผิดพลาดเชิงตรรกะ/นิยาม | [Bergsteiner2010] |
| 2012 | NASA OIG IG-12-012 | LLIS: ใช้ 57%, ป้อน 43%, $782k/ปี, "marginalized" | [NASAOIG2012] |
| 2012–13 | Tannenbaum & Cerasoli | meta-analysis debrief: ดีขึ้น ~25% (d=.67) | [TannenbaumCerasoli2013] |
| 2014 / 2019 | Macnamara et al.; Macnamara & Maitra; Ericsson & Harwell | deliberate practice อธิบาย variance น้อยกว่าที่อ้าง; replication ไม่ยืนยัน; ฝ่าย Ericsson โต้ว่านิยามผิด | [Macnamara2014] [MacnamaraMaitra2019] [EricssonHarwell2019] |
| 2016 | Google SRE book | blameless postmortem culture | [GoogleSRE2016] |
| 2020 | Lewis et al. | RAG: parametric + non-parametric memory | [Lewis2020] |
| 2021 | Keiser & Arthur | meta-analysis AAR: d=0.79; objective review media + alignment สำคัญ | [KeiserArthur2021] |
| 2023 | Park et al.; Shinn et al.; Zhao et al.; Packer et al.; Sumers et al. | agent memory: memory stream + reflection; verbal reinforcement; experiential insights; virtual context; CoALA memory taxonomy | [Park2023] [Shinn2023] [Zhao2023] [Packer2023] [Sumers2023] |
| 2023–24 | Shi et al.; Huang et al.; Liu et al.; Magesh et al. | ขีดจำกัด: distracted by irrelevant context; self-correction ไม่ได้ถ้าไม่มี external feedback; lost in the middle; RAG ยัง hallucinate 17–33% | [Shi2023] [HuangSelfCorrect2023] [Liu2024] [Magesh2024] |

### 1.2 ความคิดเปลี่ยนไปอย่างไร (สรุป)
1. **จาก "คลังเอกสาร" → "routine + การส่งถึงมือ"**: ยุคแรกเชื่อว่าเก็บบทเรียนให้ครบแล้วคนจะมาหาเอง; หลักฐานจาก NASA (2002, 2012) และ Weber et al. (2000) บอกว่าคลังแบบ passive ถูกเมิน [GAO2002] [NASAOIG2012] [Weber2000]. แนวคิดที่รอดคือ Levitt & March: บทเรียน = สิ่งที่ฝังใน routine [LevittMarch1988].
2. **จาก "แปลง tacit เป็น explicit ได้หมด" → "เก็บทั้งกฎและตัวอย่าง"**: SECI โด่งดังแต่หลักฐานอ่อน; Gourlay ชี้ว่าบางความรู้ tacit โดยเนื้อแท้ [Gourlay2006] [Farnese2019]. ผลทางปฏิบัติ: เก็บ case (ตัวอย่างจริง) คู่กับ rule.
3. **จาก "ฝึกมาก = เก่ง" → "ฝึกแบบมีเป้า+feedback ช่วย แต่ไม่ใช่ทั้งหมด"** [Macnamara2014] [MacnamaraMaitra2019] [EricssonHarwell2019].
4. **จาก "postmortem เมื่อพัง" → "debrief สั้นๆ เป็นประจำ ทั้งสำเร็จและล้มเหลว"** [TannenbaumCerasoli2013] [KeiserArthur2021] [EllisDavidi2005].
5. **ยุค AI agent (2020→)**: ปัญหาเดิมกลับมาในรูปใหม่ — ไม่ใช่ "คนไม่ค้น" แต่ "model ได้ context ผิด/มากเกิน" [Liu2024] [Shi2023]; และ agent เขียนบทเรียนจากความเห็นตัวเองโดยไม่มีสัญญาณภายนอกไม่ได้ผล [HuangSelfCorrect2023] [Shinn2023].

---

## 2. หลักการพื้นฐาน (Fundamentals)

### 2.1 นิยาม
- **Tacit knowledge** — ความรู้ที่ใช้ได้แต่พูดออกมาได้ไม่หมด (เช่น "ภาพนี้ดูแพง" ของผู้ใช้) [Polanyi1966 ผ่าน Farnese2019]. **Explicit knowledge** — เขียน/ส่งต่อเป็นเอกสาร กฎ โค้ดได้.
- **SECI** (THEORY): Socialization (tacit→tacit: ทำงานข้างกัน), Externalization (tacit→explicit: บทสนทนา อุปมา การสะท้อน), Combination (explicit→explicit: รวม/จัดระบบเอกสาร), Internalization (explicit→tacit: ลงมือจนเป็นนิสัย) [Farnese2019] [Nonaka1994].
- **Organisational memory** — ความรู้ที่องค์กรเก็บไว้ในคน ไฟล์ เครื่องมือ routine; กระบวนการ acquisition/retention/retrieval [WalshUngson1991] [LevittMarch1988].
- **Single-loop vs double-loop learning** (THEORY) — แก้ action ภายใต้กฎเดิม vs ตั้งคำถามกับกฎ/เป้า [Argyris1976].
- **After-action review (AAR) / debrief** — การสะท้อน อภิปราย และตั้งเป้าอย่างเป็นระบบหลังงาน/ช่วงงาน [TannenbaumCerasoli2013].
- **Lesson learned (LL)** — บทเรียนจากประสบการณ์ทำงาน ทั้งสำเร็จและล้มเหลว เพื่อปรับกระบวนการ [Weber2000].
- **Case-based reasoning (CBR)** — แก้ปัญหาใหม่ด้วยการดึง case เก่าที่คล้าย: **Retrieve → Reuse → Revise (ทดสอบ/แก้) → Retain (เก็บ)** [AamodtPlaza1994].
- **Deliberate practice** (THEORY, contested) — กิจกรรมฝึกที่ออกแบบมาเพื่อพัฒนาประสิทธิภาพ มีความพยายามสูง [Ericsson1993].
- **RAG** — ระบบที่รวม parametric memory (น้ำหนักโมเดล) กับ non-parametric memory (ดัชนีเอกสารภายนอก) [Lewis2020].
- **Agent memory types** (CoALA): working (context ตอนนี้), episodic (บันทึกเหตุการณ์/งาน), semantic (ข้อเท็จจริง/กฎ), procedural (ทักษะ/โค้ด/skill) [Sumers2023].
- **Provenance** — ข้อมูลว่า "สิ่งนี้มาจากไหน ใครทำ ด้วยกิจกรรมอะไร": Entity / Activity / Agent + wasGeneratedBy, used, wasDerivedFrom, wasAttributedTo, wasAssociatedWith [W3CPROVO2013].

### 2.2 หลักการแกน (core principles) — พร้อมระดับหลักฐาน
1. **บทเรียนที่ไม่ถูกส่งถึงจุดตัดสินใจ = ไม่มีอยู่** — คลัง passive ถูกเมินเพราะผู้ใช้ไม่มีเวลา ไม่รู้ที่ ค้นไม่เป็น ตีความไม่ได้ [Weber2000]; 58% ของผู้จัดการ NASA ดึงบทเรียนที่ถูกต้องในเวลาที่ถูกต้องไม่ได้ [GAO2002]. (FACT-ish: หลักฐานจาก audit/survey สม่ำเสมอ แต่ไม่ใช่ experiment)
2. **ฝังบทเรียนใน routine/เครื่องมือ ไม่ใช่แค่ในบันทึก** [LevittMarch1988]; NASA 6/10 ศูนย์ไม่ cross-reference บทเรียนเข้ามาตรฐาน → ลดผล [NASAOIG2012].
3. **ทบทวนเป็นประจำ สั้น มีโครงสร้าง อิงข้อมูลจริง** — debrief ช่วย ~20–25% (d=.67) [TannenbaumCerasoli2013]; d=0.79 และ objective review media ช่วย [KeiserArthur2021]. (FACT ระดับ meta-analysis ในบริบทการฝึก)
4. **ทบทวนความสำเร็จด้วย** — ไม่ใช่แค่ความล้มเหลว [EllisDavidi2005]; GAO แนะนำเพิ่ม positive lessons [GAO2002].
5. **feedback ต้องชี้ที่งาน ไม่ใช่ตัวคน** — feedback ที่ดึงความสนใจไปที่ "self" มีผลแย่ลง [KlugerDeNisi1996]; blameless postmortem [GoogleSRE2016].
6. **ความปลอดภัยทางจิตใจทำให้เกิดการเรียนรู้** [Edmondson1999]; ระวัง upward feedback ที่หายไปหรือบวกเกินจริง [TourishRobson2003].
7. **บันทึกความคาดหวังก่อนรู้ผล** — hindsight bias d≈.39 และการพยายามลดไม่ได้ผลในงานวิจัยรวม [Guilbault2004]; ตัดสินการตัดสินใจจากผลลัพธ์ (outcome bias) [BaronHershey1988].
8. **บทเรียนเสื่อม** — ความรู้จาก learning-by-doing เสื่อมเร็ว [Darr1995]; องค์กรมี "forgetting" [ArgoteEpple1990].
9. **สำหรับ AI: ดึงน้อยแต่ตรง วางของสำคัญหัว/ท้าย** [Liu2024] [Shi2023].
10. **สัญญาณภายนอกเท่านั้นที่ทำให้ agent เรียนรู้ได้จริง** [HuangSelfCorrect2023] [Shinn2023].
11. **เก็บเท่าที่จำเป็น ระบุที่มา ลบของเก่า** [GDPRArt5] [W3CPROVO2013].

---

## 3. ทฤษฎีขั้นสูง (Advanced theory)

### 3.1 กลไก: ทำไม debrief ได้ผล (THEORY + evidence)
- Debrief "systematize reflection, discussion, and goal setting" [TannenbaumCerasoli2013]. ผลขึ้นกับ **alignment** — ผู้ร่วม debrief, จุดโฟกัส, ระดับการวัด ต้องตรงกัน (เช่น debrief ทีมวัดผลทีม).
- Keiser & Arthur: ปัจจัยที่ช่วยคงที่ = alignment (บุคคล/ทีม) + **objective performance review media** (วิดีโอ บันทึก ตัวเลข); facilitation มีผลแบบ interaction — self-led + objective media ดีที่สุด; โครงสร้างแน่นช่วยในทหารแต่ไม่ต่างใน healthcare [KeiserArthur2021]. → สำหรับ AI studio ที่ agent "ทบทวนตัวเอง" ได้ ข้อมูลเชิงวัตถุ (ไฟล์ render, ตัวเลข analyzer, คำพูดผู้ใช้) คือส่วนที่ทำให้ self-led ใช้ได้ (our analysis).
- Ellis & Davidi: mental model ของเหตุการณ์ล้มเหลว "รวย" กว่าของความสำเร็จ — คนอธิบายความล้มเหลวละเอียดกว่า; การทบทวนความสำเร็จปิดช่องว่างนี้และเพิ่มผล [EllisDavidi2005].

### 3.2 ทำไมระบบ lessons-learned ล้มเหลว — โมเดลรวม (our analysis จาก sources)
| ชั้น | กลไกล้มเหลว | หลักฐาน |
|---|---|---|
| Capture | ไม่มีเวลา, กลัวบทเรียนลบ, ไม่เห็นประโยชน์, ให้เขียนตอนปิดโปรเจกต์ (ลืมแล้ว) | [GAO2002] [NASAOIG2012] [Catmull2008] |
| Quality | บทเรียนกว้าง/ไม่มีบริบท, ไม่มีผลลัพธ์ประกอบ, hindsight bias | [GAO2002] ("weed through irrelevant lessons"), [Guilbault2004] |
| Storage | หลายคลังไม่เชื่อมกัน, ไม่ link กับมาตรฐาน | [NASAOIG2012] |
| Retrieval | ค้นยาก, ต้องไปหาเอง (passive) | [Weber2000] [GAO2002] |
| Application | ไม่มีใครตรวจว่าใช้จริง; policy อ่อนลงเรื่อยๆ | [NASAOIG2012] [CAIB2003] |
| Measurement | ไม่มี metric ผลลัพธ์ → งบไม่สัมพันธ์กับผล | [NASAOIG2012] (JPL $70k→35 บทเรียน vs Glenn ~$470k→5) |
| Culture | intolerance of mistakes; upward feedback บิด | [GAO2002] [TourishRobson2003] [Edmondson1999] |

### 3.3 Competing models of knowledge
- **Conversion view (Nonaka)**: tacit ⇄ explicit แปลงกันได้เป็นวงจร [Nonaka1994]. ข้อดี: ให้ภาษาในการออกแบบ. ข้อเสีย: หลักฐานเชิงประจักษ์อ่อน, ไม่มี tacit แบบเนื้อแท้, นิยามอัตวิสัย [Gourlay2006]; tacit/explicit อาจเป็น continuum ไม่ใช่ขั้วตรงข้าม [Farnese2019].
- **Behaviour view (Gourlay, ตาม Dewey)**: ความรู้ต่างชนิดเกิดจากพฤติกรรมต่างชนิด — ไม่สะท้อน (tacit) vs สะท้อน (explicit) [Gourlay2006].
- **Practice/social view (Lave & Wenger)**: ความรู้อยู่ในการมีส่วนร่วมในชุมชน; เรียนโดยเข้าร่วม [LaveWenger1991] [Wenger2000].
- **Routine view (Levitt & March)**: ความรู้ขององค์กร = routine ที่สะสมจากประวัติ [LevittMarch1988].
→ สำหรับ studio: ใช้ทั้งสาม — rule (explicit), case/ตัวอย่าง (เพื่อ tacit ที่เขียนไม่ได้), routine ใน skill/tool (ฝังให้ทำโดยอัตโนมัติ) (our analysis).

### 3.4 Agent memory: กลไกที่วิจัยแสดง
- **Generative Agents** [Park2023]: memory stream เก็บทุกประสบการณ์เป็นภาษา; retrieval score = recency (decay 0.995/ชม.เกม) + importance (LLM ให้ 1–10) + relevance (cosine) น้ำหนักเท่ากัน; **reflection** เกิดเมื่อผลรวม importance > 150 สร้าง insight ที่อ้าง evidence แล้วเก็บกลับเป็น memory. Ablation: ตัด reflection → believability ลด (29.89 → 26.88), ตัด memory หมด → 21.21. แต่วัด "believability" ไม่ใช่ความถูกต้อง; มี retrieval miss, embellishment (~1.3%), พูดเป็นทางการเกิน, ต้นทุนสูง.
- **Reflexion** [Shinn2023]: actor + evaluator + self-reflection; เก็บ 1–3 reflection ใน episodic buffer. ได้ผลเมื่อมี evaluator ดี (HumanEval 91%) แต่ **ไม่ได้ผล** ใน WebShop (ต้องสำรวจหลากหลาย), แย่ลงเมื่อ test ที่สร้างเองผิด (false positive 16.3% ใน MBPP), และไม่ช่วยโมเดลอ่อน.
- **Self-correction limit** [HuangSelfCorrect2023]: ไม่มี external feedback → แก้ตัวเองไม่ได้ และบางทีแย่ลง.
- **ExpeL** [Zhao2023]: สองชั้น = เก็บประสบการณ์ + สกัด insight เป็นภาษา; ผลดีขึ้นเมื่อสะสมมากขึ้น (benchmark ที่มีสัญญาณสำเร็จชัด).
- **MemGPT** [Packer2023]: memory หลายชั้น (เร็ว/ช้า) paging เข้า context จำกัด — คล้าย index เล็กที่โหลดเสมอ + ไฟล์รายละเอียดเปิดเมื่อจำเป็น.
- **Context limits**: ข้อมูลสำคัญกลาง context ถูกใช้แย่ [Liu2024]; ข้อมูลไม่เกี่ยวลดความแม่น "dramatically" [Shi2023]; RAG ลดแต่ไม่ขจัด hallucination (17–33% ในเครื่องมือกฎหมาย) [Magesh2024].
- **CBR ↔ LLM memory** (our analysis): 4R ของ Aamodt & Plaza แมปตรงกับ agent memory: Retrieve = RAG; Reuse = ใช้ case เป็น few-shot/แม่แบบ; **Revise = evaluator ภายนอก (ผู้ใช้/tool)**; Retain = เก็บเฉพาะเมื่อ revise ผ่าน. งาน agent ส่วนใหญ่ข้าม Revise จึงเก็บของที่ไม่ผ่านการตรวจ.

- **Survey view** [Zhang2024]: งาน agent memory ยังกระจัดกระจาย ขาดการเปรียบเทียบเชิงระบบ และวิธี evaluate memory ยังไม่เป็นมาตรฐาน → อย่าเลือก architecture เพราะ "paper ใหม่"; วัดกับงานของเราเอง.

### 3.4b Taxonomy / tagging — ออกแบบให้ดึงได้ (craft + evidence)
- ปัญหาที่ GAO พบ "weed through all the irrelevant lessons to get to the few jewels" และคำแนะนำ "better coding and search" [GAO2002] ชี้ว่า **การ tag คือส่วนของ retrieval ไม่ใช่งานเอกสาร**.
- JULLS ใช้ 43 attributes ต่อบทเรียน [Weber2000] — มากเกินสำหรับทีมเล็ก; สิ่งที่ต้องมีขั้นต่ำ (craft): `task` (carousel/story-clip/product-clip/post/voice), `stage` (brief/prompt/render/edit/mix/caption/delivery), `tool_model` (FLUX schnell, Codex, Gemini TTS Sulafat/Puck, rig.js), `platform` (IG 1:1, Reels 9:16, FB, TikTok), `language` (TH/EN), `failure_mode` (คำควบคุมชุดเดียว เช่น wrong-culture, unwanted-object, text-in-image, safe-zone, lip-sync-drift, quota-waste).
- Controlled vocabulary สั้นๆ ดีกว่า free tags เพราะ tag ที่สะกดต่างกันทำให้ retrieval พลาด (opinion; ไม่มี source ในรอบนี้).
- ห้ามใช้ "learning style" เป็น tag ของผู้ใช้/agent — ไม่มีหลักฐาน meshing [Pashler2008].

### 3.4c การวัดผลของระบบบทเรียน — งานวิจัยบอกอะไร
- ระดับที่มีหลักฐานดีที่สุดคือ **การ debrief** (วัด performance เทียบ control) [TannenbaumCerasoli2013] [KeiserArthur2021] — ไม่ใช่ "ฐานข้อมูลบทเรียน".
- ระดับองค์กร: learning curve ต่อหน่วยผลผลิตเป็นตัววัดที่ใช้ในงานวิจัยจริง (unit cost/productivity ตามประสบการณ์สะสม) [ArgoteEpple1990] [Darr1995].
- ระดับ audit: อัตราการใช้/การป้อน, การ link กับมาตรฐาน, งบเทียบผล [NASAOIG2012]; GAO แนะนำ "objective performance metrics" สำหรับ lessons learning [GAO2002].
- ระดับ agent: ablation (มี/ไม่มี memory/reflection) บน task เดียวกัน [Park2023] [Shinn2023] — วิธีนี้ studio ทำได้เองในขนาดเล็ก (ดู Exercise 7).
- **ข้อควรระวัง:** feedback/บทเรียนบางชนิดทำให้แย่ลง [KlugerDeNisi1996]; ผลดี/ร้ายบังเอิญหลอกการประเมิน [BaronHershey1988]; ทุก metric ต้องมี baseline ก่อนเริ่ม.

### 3.5 Preference / taste theory
- **Preference construction** [Slovic1995]: ความชอบมัก "ถูกสร้างตอนถูกถาม"; วิธีถามที่เทียบเท่ากันให้คำตอบต่างกันอย่างเป็นระบบ → บันทึกรสนิยมต้องเก็บ "วิธีถาม + บริบท".
- **Implicit feedback** [Hu2008]: การกระทำ (ใช้/ไม่ใช้) บอกความชอบด้วย confidence ต่างกัน และแทบไม่บอก "ไม่ชอบ" → ความเงียบไม่ใช่การอนุมัติ.
- **Upward feedback distortion** [TourishRobson2003] + **kreng jai** [AndrewsChompusri2013] → ในบริบทไทย คำติอาจไม่ถูกพูด.

### 3.6 Experiential learning ที่ใช้ได้ vs ที่เป็นตำนาน
- Kolb cycle: ใช้เป็นโครงสร้างคาบเรียน/การทบทวนได้ [HealeyJenkins2000] แต่โมเดลภาพมีข้อผิดพลาดเชิงตรรกะ [Bergsteiner2010]; ส่วน "learning styles" ไม่มีหลักฐานแบบ meshing [Pashler2008].
- Deliberate practice: ฝึกแบบมีเป้า+feedback สำคัญ แต่อธิบาย variance ได้ 26% (games) ถึง <1% (professions) [Macnamara2014]; ฝ่าย Ericsson reanalysis ได้ 29–61% ภายใต้นิยามแคบ [EricssonHarwell2019]. → ความจริงอยู่ระหว่างกลาง; ข้อสรุปปลอดภัย: practice ที่มีเป้า+feedback ช่วย แต่ไม่ใช่ปัจจัยเดียว.

---

## 4. งานวิจัยและตำราสำคัญ (Key research & texts)

| key | พบ/เสนออะไร | tier | access |
|---|---|---|---|
| TannenbaumCerasoli2013 | 46 samples, N=2,136: debrief ดีขึ้น ~25% (d=.67); ทีม=บุคคล; alignment สำคัญ | S | abstract |
| KeiserArthur2021 | 61 studies: AAR d=0.79; alignment + objective review media; facilitation มี interaction | S | abstract |
| EllisDavidi2005 | ทบทวนทั้งสำเร็จ+ล้มเหลว > ล้มเหลวอย่างเดียว | A | abstract |
| GAO2002 | NASA: 23% ส่งบทเรียน, 58% ดึงไม่ทัน, 53% เห็นประโยชน์ <25% ของเวลา; แนะนำ 7 ข้อ | S | full_text |
| NASAOIG2012 | LLIS ใช้ 57%, ป้อน 43%, $782k, policy อ่อนลง, ไม่ link มาตรฐาน | S | full_text |
| CAIB2003 | Columbia: สาเหตุองค์กรของ Challenger ไม่ถูกแก้ | S | search_summary |
| Weber2000 | คลัง LL ส่วนใหญ่ passive, ถูกมองว่าไร้ประโยชน์; active delivery | A | full_text |
| Weber2001 | ระบบเผยแพร่บทเรียนไม่ส่งเสริมการแชร์ (ตาม snippet) | A | search_summary |
| GoogleSRE2016 | blameless postmortem; triggers; review; reading clubs | C | full_text |
| Catmull2008 | postmortem ไม่มีใครชอบ; เปลี่ยนรูปแบบ; top-5/top-5; ใช้ข้อมูล; dailies | C | full_text |
| AamodtPlaza1994 | CBR 4R framework | A | abstract |
| Nonaka1994 | SECI / tacit–explicit dialogue | A | abstract |
| Gourlay2006 | วิจารณ์ SECI | A | abstract |
| Farnese2019 | นิยาม SECI 4 mode + แบบวัด 8 มิติ + รวมคำวิจารณ์ | A | full_text |
| Polanyi1966 | tacit knowledge (bibliographic) | A | bibliographic |
| Argyris1976 / ArgyrisSchon1978 | single/double loop | A | abstract / bibliographic |
| LevittMarch1988 | learning = encode history into routines; organisational memory | A | abstract |
| WalshUngson1991 | organisational memory: acquisition, retention, retrieval; misuse | A | abstract |
| ArgoteEpple1990 | learning curve, forgetting, turnover | A | abstract |
| Darr1995 | ความรู้เสื่อมเร็ว; transfer ภายในเครือเท่านั้น | A | abstract |
| AlaviLeidner2001 | KMS: create/transfer/apply | A | abstract |
| Wenger2000; LaveWenger1991 | communities of practice; LPP | A | abstract |
| Kolb1984; HealeyJenkins2000; Bergsteiner2010; Pashler2008 | Kolb cycle; ใช้ได้เป็นโครงสร้าง; โมเดลมีข้อบกพร่อง; learning styles ไม่มีหลักฐาน | A/B/A/S | biblio/abstract |
| Ericsson1993; Macnamara2014; MacnamaraMaitra2019; EricssonHarwell2019 | deliberate practice และการโต้แย้ง | A/S/A/A | abstract |
| KlugerDeNisi1996 | feedback d=.41, >1/3 แย่ลง; self-focus แย่ | S | abstract |
| Edmondson1999 | psychological safety → learning behaviour | A | abstract |
| TourishRobson2003 | upward feedback หายไป/บวกเกิน | A | abstract |
| AndrewsChompusri2013 | kreng jai กับการรับ practice ในบริษัทไทย | A | abstract |
| Guilbault2004; BaronHershey1988 | hindsight d=.39, ลดยาก; outcome bias | S/A | abstract |
| Slovic1995; Hu2008 | preference construction; implicit feedback confidence | A | abstract |
| Lewis2020 | RAG | A | abstract |
| Park2023 | memory stream + reflection + ablation + failure modes | A | full_text |
| Shinn2023 | Reflexion + limits | A | full_text |
| HuangSelfCorrect2023 | self-correction ไม่ได้ถ้าไม่มี external feedback | A | abstract |
| Zhao2023; Packer2023; Sumers2023; Zhang2024 | ExpeL; MemGPT; CoALA; memory survey | A/A/A/B | abstract |
| Liu2024; Shi2023; Magesh2024 | lost in the middle; distraction; RAG ยัง hallucinate | A | abstract |
| W3CPROVO2013 | provenance model | S | publisher_page |
| GDPRArt5 | data minimisation, storage limitation ฯลฯ | S | full_text |

---

## 5. หลักฐานและข้อจำกัด (Evidence & limits)

| claim | strength | เหตุผล / ข้อโต้แย้ง |
|---|---|---|
| Debrief/AAR ที่ทำดีเพิ่มประสิทธิภาพ (d≈.67–.79) | **high** (ในบริบทฝึก/งาน) | 2 meta-analyses อิสระสอดคล้อง [TannenbaumCerasoli2013] [KeiserArthur2021]; แต่ส่วนใหญ่ training/simulation, ผลระยะสั้น; Keiser & Arthur เป็น bare-bones meta-analysis. ไม่มีงานใน "AI creative studio" โดยตรง |
| ทบทวนความสำเร็จ + ล้มเหลว ดีกว่าล้มเหลวอย่างเดียว | **medium** | quasi-field experiment ชิ้นเดียว (ทหาร navigation) [EllisDavidi2005]; สอดคล้อง practice ของ Pixar [Catmull2008] |
| คลังบทเรียนแบบ passive ถูกใช้น้อย | **medium-high** | audit/survey ของ NASA สองครั้งห่าง 10 ปี [GAO2002] [NASAOIG2012] + สัมภาษณ์ของ Weber [Weber2000]; ไม่มี RCT; เป็นองค์กรขนาดใหญ่ |
| Active delivery (push บทเรียนตอนตัดสินใจ) ดีกว่า | **low-medium** | มีแค่ prototype [Weber2000] และเหตุผลจากความล้มเหลวของ passive; ยังไม่มี outcome study ที่เราอ่าน |
| Feedback อาจทำให้แย่ลง (>1/3) | **high** | meta-analysis 607 effect sizes [KlugerDeNisi1996]; moderators ยังเข้าใจไม่ดี |
| Psychological safety → learning | **medium-high** | Edmondson 1999 (51 ทีม, cross-sectional) [Edmondson1999]; มีงานต่อยอดมาก (ไม่ได้อ่านรอบนี้) |
| Hindsight bias มีจริงและลดยาก | **high** | 95 studies d=.39 [Guilbault2004] |
| Outcome bias | **medium-high** | 5 การทดลอง [BaronHershey1988]; vignettes |
| Knowledge depreciation | **medium** | pizza franchises [Darr1995] + manufacturing review [ArgoteEpple1990]; บริบทการผลิต |
| SECI เป็นกลไกที่ถูกต้อง | **low** | หลักฐานส่วนใหญ่ anecdotal [Gourlay2006] [Farnese2019]; แบบวัดใหม่ valid แต่ยังเป็น self-report |
| Kolb cycle เป็นโมเดลเชิงสาเหตุ | **low**; learning styles meshing | **ไม่มีหลักฐาน** [Bergsteiner2010] [Pashler2008] |
| Deliberate practice อธิบายความเชี่ยวชาญส่วนใหญ่ | **contested** | 26%→<1% [Macnamara2014]; replication ล้ม [MacnamaraMaitra2019]; ฝ่ายผู้คิดค้น reanalysis 29–61% [EricssonHarwell2019]. สรุป: practice สำคัญ ขนาดผลขึ้นกับ domain และนิยาม |
| Reflection memory ช่วย agent | **medium (narrow)** | ablation ใน sandbox วัด believability [Park2023]; Reflexion ช่วยเมื่อมี evaluator ดี แต่ไม่ช่วยใน WebShop [Shinn2023]; ExpeL ดีขึ้นตามประสบการณ์ [Zhao2023]. ทั้งหมดเป็น benchmark ที่มีสัญญาณถูก/ผิดชัด — **งานสร้างสรรค์ไม่มีสัญญาณแบบนั้น** จึงต้องใช้ผู้ใช้/tool เป็น evaluator |
| Self-correction โดยไม่มี external feedback ไม่ได้ผล | **medium-high** | [HuangSelfCorrect2023] + Reflexion ที่ไม่ได้ผลกับโมเดลอ่อน [Shinn2023]; โมเดลรุ่นใหม่อาจต่าง |
| Long context: กลาง context ถูกใช้แย่; irrelevant context ทำร้าย | **medium-high** (2023–24 models) | [Liu2024] [Shi2023]; โมเดลใหม่อาจดีขึ้น — ควรทดสอบเอง (our test ยังไม่มี) |
| RAG ไม่ขจัด hallucination | **high** สำหรับเครื่องมือที่ทดสอบ | preregistered [Magesh2024] |
| Preference สร้างตอนถาม | **high** (lab) | [Slovic1995]; การขยายสู่ความงาม/รสนิยมภาพเป็น inference ของเรา |
| Kreng jai ทำให้การรับ practice/feedback ต่างจากที่โมเดลวัฒนธรรมทำนาย | **low-medium** | qualitative single case [AndrewsChompusri2013] |

**จุดที่ยังโต้แย้ง/ไม่รู้:** (1) ไม่มีงานวิจัยที่วัดว่า "lessons database" ของทีมสร้างสรรค์ขนาดเล็กเพิ่มคุณภาพงาน; (2) ไม่รู้ว่ากี่บทเรียนต่อ brief เหมาะที่สุดสำหรับ LLM รุ่นปัจจุบัน (ต้อง our test); (3) Kirkpatrick-style การวัดผลการเรียนรู้ไม่ได้ค้นในรอบนี้.

---

## 6. การประยุกต์ใช้จริง (Applications)

### 6.1 Generic — ระบบเรียนรู้จากประสบการณ์ 6 ชั้น (any field)
1. **Trigger** (กำหนดล่วงหน้าเมื่อไหร่ต้องทบทวน) — แบบ SRE: กำหนดเงื่อนไขก่อนเกิดเหตุ [GoogleSRE2016]. ตัวอย่าง: ลูกค้าปฏิเสธงาน, ต้องทำซ้ำ >2 รอบ, เสียงบ/โควตาเกินแผน, งานผ่านแบบ "ว้าว".
2. **Debrief 5–10 นาที** — 4 คำถามแบบ AAR (คาดอะไร / เกิดอะไร / ทำไมต่าง / ครั้งหน้าทำอะไร) **(PRACTICE)**; อิงข้อมูลเชิงวัตถุ [KeiserArthur2021]; มีทั้ง keep และ change [EllisDavidi2005] [Catmull2008]; ชี้ที่งานไม่ชี้ที่คน [KlugerDeNisi1996].
3. **Record** — lesson card ที่มีบริบท + หลักฐาน + provenance [W3CPROVO2013] + confidence; บันทึก "ความคาดหวังก่อนรู้ผล" แยก [Guilbault2004].
4. **Encode** — บทเรียนที่ซ้ำ ≥2 ครั้ง → เปลี่ยน routine: ขั้นใน checklist/skill, ค่า default ของ tool, template [LevittMarch1988]; link กับมาตรฐานที่มันแก้ [NASAOIG2012].
5. **Deliver (active)** — ตอนเริ่มงานใหม่ ดึง 3–5 บทเรียน/case ที่ตรงที่สุดมาใส่หัว brief [Weber2000] [Liu2024] [Shi2023].
6. **Measure + prune** — วัดว่าใช้จริงและผลดีขึ้น; ลบ/รวมของเก่า [GDPRArt5] [Darr1995] [NASAOIG2012].

### 6.2 Lesson card schema (generic)
```
id: L-2026-11-26-001
title: (คำสั่ง 1 บรรทัด, ทำได้ทันที)  e.g. "Describe light effect, never name the light source in FLUX prompts"
when_applies: task type + conditions (model, style, platform)
evidence: path ของไฟล์/ภาพ/log + ตัวเลข  (objective media)
outcome: what happened (before/after)
expectation_before: (ถ้ามี — เขียนก่อนรู้ผล)
type: failure | success | taste | capability
confidence: high/medium/low + n (กี่ครั้งที่เห็น)
provenance: derived_from (job id), judged_by (user|tool|agent), date
encoded_in: skill/tool/checklist ที่แก้แล้ว (หรือ "not yet")
review_by: วันที่ต้องตรวจซ้ำ (model เปลี่ยนเร็ว)
```
(craft — สังเคราะห์จาก [Weber2000] (attributes ต่อบทเรียน), [W3CPROVO2013], [AamodtPlaza1994])

### 6.3 Case record (CBR) schema
`problem` (brief, platform, ratio, audience, ภาษา) · `solution` (prompt/settings/layout/script path) · `outcome` (user verdict คำต่อคำ + ตัวเลข) · `revise_notes` · `retained: yes/no + เหตุผล`. เก็บเฉพาะ case ที่ผ่าน Revise (ผู้ใช้หรือ tool ตัดสิน) [AamodtPlaza1994] [HuangSelfCorrect2023].

### 6.4 Taste / approval record schema
`statement` (คำผู้ใช้ตรงตัว ภาษาไทย) · `elicitation` (เลือก A/B, ตอบคำถาม, พูดเอง, ใช้งานโดยไม่พูด) [Slovic1995] · `signal_strength`: explicit-approve 1.0 / explicit-reject 1.0 / used-without-comment 0.5 / silence 0 [Hu2008] **(craft weights)** · `scope` (ใช้กับงานแบบไหน — series, platform) · `date`, `superseded_by`. ห้ามสรุปว่า "ชอบ" จากความเงียบ [TourishRobson2003].

### 6.5 Studio applications (TIME OPTIC) — (our analysis ของ repo + sources)

**สภาพปัจจุบัน (อ่านไฟล์ 2026-11-26):**
- มีหลายคลังแล้ว: auto-memory `MEMORY.md` (index โหลดทุก session — คล้าย MemGPT tier ที่โหลดเสมอ [Packer2023]), `story-clips/_craft/LEARNING-LOG.md` (บทเรียนวันที่ + ✔ เมื่อ fold เข้า GUIDE/rig.js — **นี่คือ Levitt & March encode-into-routine ที่ทำถูกแล้ว**), `DESIGN_PATTERNS.md` (มี status tested/sourced/craft — ดี), `ANTI_PATTERNS.md` (what·why·fix·where — ดี), `LESSONS_LEARNED.md` (index), skill CHANGELOGs.
- จุดอ่อน: `memory/FEEDBACK_HISTORY.json` มีแค่ 2 รายการ, `PROMPT_EXPERIMENTS.json` 1 รายการ, LESSONS_LEARNED บอกเอง "No line or image has a full score yet because no human rating has been collected" → **ชั้น Revise/evaluator ของ CBR ขาด** ซึ่งเป็นชั้นที่ทำให้ Reflexion ทำงาน [Shinn2023]. ความเสี่ยงแบบ NASA: หลายคลัง ไม่มี metric การใช้ [NASAOIG2012].

**การประยุกต์รายงาน:**
1. **Mint & Tao story carousels (Slowly Growing)**: หลังทุกชุด 10 เรื่อง ทำ debrief 5 นาที: keep 3 / change 3 [Catmull2008] + ตัวเลข (กี่ภาพต้อง rerender, กี่ข้อความเกิน safe zone, ผู้ใช้แก้อะไร). บทเรียนที่ซ้ำ 2 ชุด → แก้ template/ตัว render (encode). ตอนเริ่มชุดใหม่ ดึง 3 บทเรียนล่าสุดที่ tag `carousel/charcoal` มาไว้หัว brief.
2. **Story clips (rig.js, TTS)**: LEARNING-LOG ทำอยู่แล้ว — เพิ่ม `evidence` (path ของ frame/snapshot) และ `expectation_before` ใน shot list (เขียนก่อน render ว่าคาดว่าจะดูอย่างไร) เพื่อกัน hindsight [Guilbault2004].
3. **Eyewear product clips/posts**: house rules ใน CLAUDE.md คือ "routine" ที่ encode แล้ว; ความชอบใหม่ของผู้ใช้ (เช่น "clips do not carry line art", 2026-09-25) ต้องมี `superseded_by` ที่กฎเก่า (posts carry line art) เพื่อไม่ให้ retrieval ดึงกฎเก่ามาขัด.
4. **TTS voice**: บทเรียนแบบ "≤8 lines per Gemini request", "long ghost/intimate style → SAFETY" เป็น capability lessons ที่ **เสื่อมตามรุ่นโมเดล** → ใส่ `review_by` (เช่น 90 วัน) และ `model_version` [Darr1995] (our analysis).
5. **Codex/FLUX quota**: บันทึก `quota_used_per_accepted_output` ต่อชนิดงาน = learning curve ของ studio [ArgoteEpple1990].
6. **Taste capture ที่ไม่ฝืน kreng jai**: ถามแบบเลือก "A หรือ B" หรือ "ชอบ 1–5" แทนถาม "มีอะไรไม่ชอบไหม" [AndrewsChompusri2013] [TourishRobson2003]; บันทึกคำตอบลง FEEDBACK_HISTORY ด้วย `elicitation` [Slovic1995].
7. **Agent brief**: master-creative-director ใส่ "Relevant lessons (max 5)" ที่ **หัว** brief, เรียงตาม relevance × importance × recency (แบบ Park2023), ไม่ dump ทั้ง ANTI_PATTERNS [Liu2024] [Shi2023].
8. **Reflection periodic**: ทุก ~10 งาน สร้าง reflection สั้นที่อ้าง lesson ids (แบบ Park2023 ที่ reflection อ้าง evidence) → ย้ายเข้า DESIGN/ANTI_PATTERNS เฉพาะเมื่อมี evidence ภายนอก [HuangSelfCorrect2023].

### 6.6 แผนที่ memory ของ studio ตาม CoALA (our analysis)
CoALA แยก memory เป็น working / episodic / semantic / procedural [Sumers2023]; Walsh & Ungson ให้ถามว่า memory "อยู่ที่ไหน" และ "ถูกดึงอย่างไร" [WalshUngson1991].

| CoALA type | ความหมาย | ไฟล์ใน studio ตอนนี้ | ช่องว่าง (analysis) |
|---|---|---|---|
| working | สิ่งที่อยู่ใน context ของงานนี้ | brief ของ sub-agent, CLAUDE.md, MEMORY.md index | ยังไม่มีช่อง "Relevant lessons (max 5)" มาตรฐาน |
| episodic | เหตุการณ์/งานที่เกิดขึ้นจริง | LEARNING-LOG (dated), auto-memory per project, FEEDBACK_HISTORY, PROMPT_EXPERIMENTS | feedback/experiments แทบว่าง; ไม่มี job id ร่วม |
| semantic | ข้อเท็จจริง/กฎทั่วไป | DESIGN_PATTERNS, ANTI_PATTERNS, knowledge/*/README, EVIDENCE_MATRIX, USER_PREFERENCES | ไม่มี confidence/n/review_by ต่อแถว |
| procedural | ทักษะ/โค้ดที่ทำงานได้ | `.claude/skills/*`, rig.js, fx.js, sound.py, build_prompt, tools/*.py | ✔-fold ใน LEARNING-LOG ทำแล้ว; skill อื่นยังไม่มี "encoded_in" กลับไปยังบทเรียน |

**หลักการแมป:** episodic → (reflection ที่มี evidence) → semantic → (ซ้ำ ≥2) → procedural. นี่คือ Levitt & March (history → routine) [LevittMarch1988] + Generative Agents (memory → reflection) [Park2023] + ExpeL (experiences → insights) [Zhao2023] ในรูปไฟล์.

### 6.7 ตัวอย่าง debrief ที่ทำเสร็จ (worked example จากบันทึกจริงใน LEARNING-LOG 2026-11-21)
เหตุการณ์ที่บันทึกไว้: "FLUX img2img keeps the source lighting: it cannot turn night into day. Generate day/night separately." (LEARNING-LOG; ANTI_PATTERNS).

| คำถาม AAR | คำตอบ (ตัวอย่างการเขียน) |
|---|---|
| คาดว่าจะเกิดอะไร | img2img denoise 0.55–0.6 จากภาพกลางคืนจะได้ภาพกลางวันฉากเดิม |
| เกิดอะไรจริง | แสง/layout เดิมยังอยู่; ได้ภาพกลางคืนที่สีเปลี่ยน |
| ทำไมต่าง | img2img เก็บโครงสร้างค่าน้ำหนัก (value structure) ของภาพต้นทาง; denoise ระดับนี้ไม่พอเปลี่ยนแสงทั้งฉาก (craft explanation, ไม่ได้ทดสอบกลไก) |
| ครั้งหน้าทำอะไร | สร้าง day/night แยกด้วย text-to-image seed เดียว; ถ้าต้องเอาวัตถุออกใช้ inpaint |
| keep | การทดสอบ denoise หลายค่าแล้วเทียบภาพ (objective media) |
| encoded_in | ANTI_PATTERNS (Image generation) ✔; ควรเพิ่มเป็น warning ใน build_prompt/flux.py เมื่อ prompt มีคำ "day" แต่ input เป็นภาพกลางคืน (not yet) |
| confidence | medium (เกิดซ้ำในหลายงาน ตาม ANTI_PATTERNS ระบุ "CHANGELOG + LEARNING-LOG") |
| review_by | เมื่อเปลี่ยน FLUX model/version |

สังเกต: ข้อ "ทำไมต่าง" เป็นคำอธิบายเชิง craft — การ์ดต้องติดป้ายนี้ ไม่เขียนเป็นข้อเท็จจริง (ตาม RESEARCH_BRIEF).

### 6.8 Retrieval scoring (pseudo-code, craft; ดัดแปลงจาก Park2023)
```
score(lesson, job) =
    w_rel * relevance(lesson.tags, job.tags)          # task/platform/model/ภาษา ตรงกันกี่ tag (0..1)
  + w_imp * importance(lesson)                        # severity (critical/major/minor) x confidence
  + w_rec * 0.99 ** days_since(lesson.last_confirmed) # decay; ยืนยันซ้ำ = รีเซ็ต
exclude if lesson.review_by < today and lesson.type == capability
exclude if lesson.superseded_by
take top 5; order: critical first (หัว brief), แล้วตาม score
```
- Park2023 ใช้น้ำหนักเท่ากันและ decay 0.995/ชั่วโมงเกม; ค่า 0.99/วันในที่นี้เป็น **craft guess** ต้องปรับจากการใช้จริง.
- relevance ใช้ tag ก่อน (อธิบายได้, ตรวจได้) แล้วค่อยเพิ่ม embedding ถ้าคลังโตเกินร้อยรายการ (opinion).

### 6.9 Pruning & hygiene routine (craft, ตาม [GDPRArt5] [Darr1995] [NASAOIG2012])
1. ทุกเดือน: list lessons ที่ไม่ถูกดึงใน 90 วัน → รวม/ลบ/ทำเครื่องหมาย archived.
2. capability lessons ที่เลย review_by → ทดสอบซ้ำ 1 ครั้งหรือ archived.
3. ซ้ำความหมาย ≥2 บรรทัด → รวมเป็นหนึ่ง, n = ผลรวม.
4. สแกนหา personal data/คีย์ (regex ง่ายๆ: เบอร์โทร, อีเมล, "key", "token") → ลบ.
5. ตรวจว่ากฎใน DESIGN/ANTI_PATTERNS ไม่ขัด CLAUDE.md/USER_PREFERENCES; ถ้าขัด ให้ถามผู้ใช้.

### 6.10 แผนเริ่มใช้ 3 ขั้น (opinion — ลำดับความคุ้ม)
1. **สัปดาห์แรก (ถูกที่สุด):** เพิ่ม feedback 1 บรรทัดต่องานลง FEEDBACK_HISTORY (คำผู้ใช้ + elicitation + job path). นี่คือชั้นที่ขาดที่สุดและเป็นเงื่อนไขให้ loop ทำงาน [Shinn2023].
2. **สัปดาห์ที่ 2–3:** ช่อง "Relevant lessons (≤5)" ใน brief ของ master-creative-director, เลือกด้วย tag (active delivery) [Weber2000].
3. **เดือนแรก:** metrics 3 ตัว (first-pass acceptance, rerenders/accepted, repeat-error) + pruning รายเดือน; หลัง 30 งานค่อยดูว่าตัวเลขเปลี่ยนไหม (ระวัง n เล็กและ outcome bias [BaronHershey1988]).

---

## 7. กรณีศึกษาที่ประสบความสำเร็จ (Success case studies)

> แยก **documented** (สิ่งที่แหล่งบอก) กับ **analysis** (การตีความของเรา).

### 7.1 Debriefs across medicine, aviation, military — meta-analytic success
- **Documented:** 46 samples, ดีขึ้น ~25%; ใช้มาหลายสิบปีโดย US Army, ขยายสู่การแพทย์/การบิน [TannenbaumCerasoli2013]; 61 studies d=0.79 [KeiserArthur2021].
- **Analysis:** ความสำเร็จอยู่ที่ "เล็ก บ่อย ใกล้งาน อิงข้อมูล" ไม่ใช่ฐานข้อมูลใหญ่. สำหรับ studio: debrief 5 นาทีต่อชิ้นงานคุ้มกว่าระบบ KM ใหญ่.

### 7.2 Israeli soldiers — reviewing successes too
- **Documented:** กลุ่มที่ debrief ทั้งความสำเร็จและล้มเหลวหลังวันฝึก navigation ดีขึ้นกว่ากลุ่มที่ทบทวนแต่ความล้มเหลว; mental model ของความสำเร็จละเอียดขึ้น [EllisDavidi2005].
- **Analysis:** สำหรับงานสร้างสรรค์ ความสำเร็จ (เช่น ภาพ "golden glasses" ที่ผู้ใช้ชอบ) ต้องถูกถอดเหตุผลเท่ากับความล้มเหลว ไม่งั้นทำซ้ำไม่ได้.

### 7.3 Pixar — postmortems that people actually do
- **Documented (Catmull เขียนเอง):** postmortem ครั้งแรก (A Bug's Life) สำเร็จ, ครั้งต่อมาผลต่างกันมาก; คนไม่ชอบทำ, อยากชม, อยากไปต่อ; แก้โดยเปลี่ยนรูปแบบทุกครั้ง, ให้แต่ละกลุ่มเขียน top-5 ทำอีก / top-5 ไม่ทำ, ใช้ข้อมูล (อัตรา rework, งานครบไหมตอนส่งต่อ); dailies ให้ดูงานยังไม่เสร็จทุกวัน [Catmull2008].
- **Limit:** คำบอกเล่าของผู้บริหารเอง ไม่ใช่การประเมินอิสระ (tier C).
- **Analysis:** "dailies" = ส่ง draft เร็วให้ผู้ใช้ดู (FLUX draft ก่อน Codex) — ตรงกับ pattern ที่ studio ใช้แล้ว (DESIGN_PATTERNS: "FLUX first for drafts").

### 7.4 Google SRE — blameless postmortem kept alive
- **Documented:** triggers ล่วงหน้า, review โดย senior, เผยแพร่และเก็บในคลัง, "postmortem of the month", reading clubs, Wheel of Misfortune [GoogleSRE2016].
- **Limit:** ไม่มีตัวเลขผลลัพธ์ในบท.
- **Analysis:** ส่วนที่ทำให้ "ใช้จริง" คือกิจกรรมที่ดึงบทเรียนกลับมาอ่าน (active) ไม่ใช่การเขียน.

### 7.5 Generative Agents / Reflexion — memory that measurably helps (narrow)
- **Documented:** ตัด reflection/planning/memory แล้ว believability ลดเป็นลำดับ [Park2023]; Reflexion 91% HumanEval [Shinn2023].
- **Limit:** benchmark/sandbox; Reflexion ล้มใน WebShop.
- **Analysis:** หลักฐานว่า "การสะท้อนที่เก็บไว้แล้วดึงกลับมา" ช่วยได้เมื่อมีตัวตัดสินที่เชื่อถือได้.

---

## 8. วิเคราะห์ผลงานที่ผิดพลาด (Failure analysis)

### 8.1 NASA LLIS (2002 → 2012) — คลังที่ไม่มีใครใช้ (documented)
- **What:** 2002: 23% ส่งบทเรียน, 27% ไม่รู้ว่ามีระบบ, 58% ดึงบทเรียนที่ใช่ไม่ทัน [GAO2002]. 2012 (หลังปรับปรุงแล้ว): ใช้ 16/28, ป้อน 12/28; policy 2007 ให้เขียนแค่ตอนปิดโปรเจกต์; 6/10 ศูนย์ไม่ link กับมาตรฐาน; $782k/ปี; งบไม่สัมพันธ์กับจำนวนบทเรียน; ถูก "marginalized" [NASAOIG2012].
- **Why:** passive retrieval, ค้นยาก, เขียนตอนจบ (ลืม), ไม่ encode เข้ามาตรฐาน, ไม่มี metric, วัฒนธรรมกลัวบทเรียนลบ.
- **Lesson:** เก็บระหว่างงาน, link กับ routine, push ตอนตัดสินใจ, วัดการใช้.

### 8.2 Columbia after Challenger — "recorded, not learned" (search_summary)
- **What (ตาม snippet ของรายงาน):** คณะกรรมการเห็น "echoes" ของ Challenger; สาเหตุเชิงองค์กรไม่ถูกแก้ [CAIB2003].
- **Why (our analysis, ระวัง):** single-loop fix (แก้ชิ้นส่วน) โดยไม่ double-loop (แก้ assumption/วัฒนธรรมการยอมรับความเสี่ยง) [Argyris1976].
- **Lesson:** ถ้าปัญหาชนิดเดียวกันกลับมา ให้ถามว่า "กฎ/เป้าข้อไหนทำให้มันกลับมา".

### 8.3 Military LL repositories viewed as useless (documented, interview-based)
- **What:** Weber et al. สัมภาษณ์เจ้าหน้าที่หลายคน: คลัง LL ส่วนใหญ่ถูกมองว่าไร้ประโยชน์; ระบบ assume ว่าผู้ใช้มีเวลา รู้ที่ ค้นเป็น ตีความได้ [Weber2000].
- **Lesson:** ออกแบบโดยสมมติว่าผู้ใช้ (หรือ agent) จะ **ไม่** ไปค้นเอง.

### 8.4 Reflexion on WebShop / weak models (documented)
- **What:** ไม่ดีขึ้นใน WebShop; ไม่ดีขึ้นกับ starchat-beta; test ที่สร้างเองผิด 16.3% → ยอมรับคำตอบผิด [Shinn2023]; self-correction ที่ไม่มี feedback ภายนอกทำให้แย่ลงบางครั้ง [HuangSelfCorrect2023].
- **Lesson:** agent ที่ "สอนตัวเอง" จาก critique ของตัวเองอาจสะสมบทเรียนผิด → ทุก lesson ต้องมี `judged_by` ภายนอก.

### 8.5 Typical failure (clearly labelled — composite, not a single documented case): "Memory dump"
- **What:** ใส่ ANTI_PATTERNS ทั้งไฟล์ + memory ทั้งหมดลงใน prompt ของ sub-agent; agent ทำตามกฎที่ไม่เกี่ยว หรือพลาดกฎสำคัญที่อยู่กลางข้อความ.
- **Why:** lost-in-the-middle [Liu2024], distraction [Shi2023].
- **Lesson:** ≤5 บทเรียนที่ตรงงาน, ไว้หัว brief.

### 8.6 Typical failure (labelled): "Stale capability lesson"
- **What:** บทเรียน "Sora 2 ใช้ได้" หรือ "max 8 TTS lines" ยังถูกดึงหลังโมเดล/API เปลี่ยน (LEARNING-LOG บันทึกแล้วว่า Sora 2 ถูกปิด 2026-09-24).
- **Why:** knowledge depreciation [Darr1995]; ไม่มี review date.
- **Lesson:** capability lessons ต้องมี `model_version` + `review_by`.

### 8.7 Pixar's later postmortems — same format, same lessons (documented)
- **What:** หลัง postmortem ครั้งแรกที่สำเร็จ ครั้งต่อๆ มาผลต่างกันมาก; คนใช้โอกาสชมทีม พูดแต่สิ่งที่ดี และ "game the system" [Catmull2008].
- **Why:** รูปแบบเดิมซ้ำ → เจอบทเรียนเดิม; แรงจูงใจทางสังคมให้หลีกเลี่ยงเรื่องไม่สบายใจ.
- **Lesson:** หมุนรูปแบบ debrief (เช่น เดือนนี้ "keep/change", เดือนหน้า "pre-mortem ของชุดถัดไป", เดือนต่อไป "อ่านบทเรียนเก่า 5 ข้อแล้วตรวจว่ายังจริงไหม") และบังคับให้มีข้อมูล.

### 8.8 Typical failure (labelled): "Taste inferred from silence"
- **What:** ผู้ใช้ไม่ทักภาพสไตล์หนึ่ง 3 ครั้ง → agent บันทึกว่า "ผู้ใช้ชอบสไตล์นี้" แล้วใช้ต่อ จนผู้ใช้ปฏิเสธทีหลัง.
- **Why:** implicit feedback ไม่มีหลักฐานของ "ไม่ชอบ" และมี confidence ต่ำ [Hu2008]; upward feedback ที่ติมักหายไป [TourishRobson2003]; บริบท kreng jai [AndrewsChompusri2013].
- **Lesson:** taste record ต้องมี signal_strength; สิ่งที่มาจากความเงียบไม่ถูก promote เป็นกฎ; ถาม A/B สั้นๆ เมื่อจะใช้ซ้ำ.

---

## 9. ข้อยกเว้นและบริบทที่ต่างกัน (Exceptions & context)

- **ไทย vs ตะวันตก — การให้ feedback:** kreng jai (ความเกรงใจ) ทำให้การรับ practice ต่างประเทศ (performance appraisal, empowerment) ไม่เป็นไปตามที่โมเดลวัฒนธรรมทั่วไปทำนาย — บางทีเสริม บางทีขัด [AndrewsChompusri2013]. งานตะวันตกก็พบว่า upward feedback ที่ติเตียนหายไปและบวกเกินจริง [TourishRobson2003] — คือปัญหาสากลที่อาจหนักขึ้นในบริบทไทย (inference). → ใช้การเลือก/ให้คะแนนแทนการขอคำติ; ผู้ใช้ของ studio พูดสั้น ("ยังไม่เหมือน") — บันทึกคำตรงตัว.
- **Blameless culture ในทีมเล็ก/คนเดียว:** SRE/Pixar เป็นองค์กรใหญ่; ใน studio มีผู้ใช้หนึ่งคน + agents — "blame" ไม่ใช่ปัญหาหลัก แต่ **การไม่ได้ feedback** คือปัญหาหลัก (our analysis).
- **Military vs healthcare:** structure สูงช่วยในทหาร ไม่ต่างใน healthcare [KeiserArthur2021] → debrief template ไม่ควรแข็งเกินสำหรับงานสร้างสรรค์ (inference).
- **Domain ของ practice:** deliberate practice อธิบาย <1% ใน professions vs 26% ใน games [Macnamara2014] → งานที่กติกาชัด/feedback ทันที (เช่น lip-sync timing, subtitle chars/s) ได้ประโยชน์จาก practice loop มากกว่างาน taste-driven (inference).
- **Platform/genre:** บทเรียนของ IG Reels (9:16, safe zone) ไม่ transfer ไป FB feed 1:1; knowledge transfer เกิดได้ในกลุ่มที่เชื่อมกัน [Darr1995] → tag `platform` ทุกบทเรียน.
- **AI model generation:** บทเรียนเกี่ยวกับพฤติกรรมโมเดล (FLUX วาดสิ่งที่ถูกปฏิเสธ) ผูกกับรุ่นโมเดล; ผลวิจัย LLM 2023–24 [Liu2024] [Shi2023] อาจเปลี่ยนในโมเดลใหม่ → ทดสอบซ้ำ.
- **Privacy/law:** GDPR Art. 5 เป็นหลักสากลที่ดี (minimisation, storage limitation) [GDPRArt5]; กฎหมายที่ใช้จริงในไทยคือ PDPA (พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562) — **ไม่ได้อ่านในรอบนี้** อย่าอ้างมาตรา. memory/README ของ studio ห้ามเก็บ password/API key/personal data อยู่แล้ว — สอดคล้อง.
- **เมื่อไม่ควรเก็บบทเรียน:** งานครั้งเดียว ไม่มีโอกาสซ้ำ; บทเรียนที่ไม่มี evidence; ความเห็นของ agent เอง (ให้เป็น "hypothesis" ไม่ใช่ lesson).

---

## 10. การประยุกต์ข้ามศาสตร์ (Cross-discipline use)

| domain | เชื่อมอย่างไร |
|---|---|
| 01 creative thinking & cognitive science | hindsight/outcome bias [Guilbault2004] [BaronHershey1988] ใช้ตอน review ไอเดีย; incubation ไม่เกี่ยวกับ log แต่ "case" ช่วย analogical reasoning (CBR) [AamodtPlaza1994] |
| 02 psychology & EI | psychological safety [Edmondson1999]; feedback ที่ไม่โจมตี self [KlugerDeNisi1996] — ใช้กับวิธีพูดกับผู้ใช้เมื่อรายงานความผิดพลาด |
| 03 aesthetic intelligence & taste | taste record + preference construction [Slovic1995]; tacit taste ต้องเก็บเป็น case/ภาพตัวอย่าง ไม่ใช่แค่กฎ [Gourlay2006] |
| 04 visual language | บทเรียน composition/saliency ต้องมี evidence เป็นภาพ + ตัวเลข analyzer (objective media) [KeiserArthur2021] |
| 05 semiotics | บทเรียนวัฒนธรรม (สัญลักษณ์ไทยถูก/ผิด) = case ที่มี provenance (ใครยืนยัน) [W3CPROVO2013] |
| 06 character psychology | character bible = semantic memory; continuity errors ที่พบ = episodic lessons [Sumers2023] |
| 07 worldbuilding & continuity | series memory (Mint & Tao, night-optic) ต้อง retrieve ตอนเขียน EP ใหม่ (active delivery) [Weber2000]; superseded facts |
| 08 philosophy/literature | verified-quote list = curated knowledge base; RAG ยัง hallucinate → อ้างเฉพาะรายการที่ตรวจแล้ว [Magesh2024] |
| 09 cultural studies | kreng jai กับการขอ feedback [AndrewsChompusri2013] |
| 10 psychoacoustics | TTS capability lessons ผูก model_version; QC ตัวเลข (loudness) = objective media |
| 11 consumer psychology & marketing | outcome bias กับโพสต์ที่ viral โดยบังเอิญ [BaronHershey1988]; วัดซ้ำก่อนสรุป "สูตร" |
| 12 independent criticism | critic = evaluator ภายนอกใน loop (Revise ของ CBR); critic ที่เป็น LLM ตัวเดียวกันไม่พอ [HuangSelfCorrect2023] |
| 13 QA & evaluation | rubric scores เป็น `outcome` ใน case; metrics §11.3 ใช้ร่วม |
| 15 workflow automation | trigger → debrief → encode → deliver ทำเป็น step ใน skill/hook; retrieval scoring [Park2023]; tiered memory [Packer2023] |

Modules: M40 (นี่), และเกี่ยวกับ master-creative-director skill (brief), LEARNING-LOG (story-clips), FEEDBACK_HISTORY / PROMPT_EXPERIMENTS / QUALITY_BENCHMARKS (memory/).

---

## 11. แนวทางตัดสินใจ (Decision guide)

### 11.1 เมื่อไหร่ต้อง debrief / ทำอะไรกับบทเรียน
| ถ้า… | แล้ว… | อ้างอิง |
|---|---|---|
| ผู้ใช้ปฏิเสธ/สั่งแก้ใหญ่ | debrief 4 คำถาม ทันที; lesson type=failure; คำผู้ใช้ตรงตัว | [GoogleSRE2016] [KeiserArthur2021] |
| ผู้ใช้ชม/อนุมัติแบบชัด | debrief สั้น "ทำไมได้ผล"; lesson type=success + case retained | [EllisDavidi2005] |
| ผู้ใช้เงียบ/ใช้งานโดยไม่พูด | บันทึก taste signal 0.5 (ใช้) หรือ 0 (ไม่ใช้); ไม่สรุปว่าชอบ | [Hu2008] [TourishRobson2003] |
| บทเรียนเดียวกันเกิด ≥2 ครั้ง | encode: แก้ skill/tool/template; ติด ✔ + `encoded_in` | [LevittMarch1988] [NASAOIG2012] |
| ปัญหาชนิดเดียวกันกลับมาหลัง encode แล้ว | double-loop: ถามว่ากฎ/เป้า/assumption ไหนผิด | [Argyris1976] |
| บทเรียนมาจาก agent critique อย่างเดียว | เก็บเป็น hypothesis; ต้องมี tool/ผู้ใช้ยืนยันก่อนเป็น lesson | [HuangSelfCorrect2023] [Shinn2023] |
| บทเรียนเกี่ยวกับพฤติกรรมโมเดล/API | ใส่ model_version + review_by (≤90 วัน, craft) | [Darr1995] |
| กฎใหม่ขัดกฎเก่า | ใส่ superseded_by ที่กฎเก่า; อย่าลบ provenance | [W3CPROVO2013] |
| ข้อมูลมีชื่อลูกค้า/ข้อมูลส่วนตัว | ไม่เก็บ หรือ anonymise; เก็บแค่สิ่งที่ purpose ต้องใช้ | [GDPRArt5] |

### 11.2 ดึงอะไรใส่ brief
| สถานการณ์ | ดึง | วาง |
|---|---|---|
| งานชนิดเคยทำ | 1–2 case ที่ผ่านการอนุมัติ + ≤3 lessons ที่ tag ตรง | หัว brief |
| งานชนิดใหม่ | ≤3 lessons ทั่วไป (high confidence) + ระบุว่า "ไม่มี case" | หัว brief |
| sub-agent critic | rubric + house rules ที่เกี่ยว ≤10 ข้อ | หัว + ซ้ำสั้นๆ ท้าย |
| ไม่แน่ใจว่าเกี่ยว | ไม่ใส่ | — |
(ตาม [Liu2024] [Shi2023]; ตัวเลข 3/5/10 = craft, ต้อง our test)

### 11.3 Metrics — วัดว่าระบบบทเรียนช่วยจริงไหม (ตาม GAO แนะนำ objective metrics [GAO2002]; craft design)
- **Repeat-error rate**: % งานที่เกิดปัญหาที่มี lesson อยู่แล้ว (ควรลด).
- **First-pass acceptance**: % งานที่ผู้ใช้รับรอบแรก.
- **Rerenders / quota per accepted output** (learning curve) [ArgoteEpple1990].
- **Lesson reuse rate**: % lessons ที่ถูกดึงใส่ brief อย่างน้อย 1 ครั้งใน 30 วัน; lessons ที่ไม่เคยถูกใช้ 90 วัน → ทบทวน/ลบ.
- **Encode ratio**: % lessons ที่มี `encoded_in`.
- **Feedback coverage**: % งานที่มีคำตัดสินของผู้ใช้บันทึก (ตอนนี้ต่ำมาก: FEEDBACK_HISTORY 2 รายการ).
- เปรียบเทียบก่อน/หลังแบบง่าย (interrupted time series) ระวัง outcome bias [BaronHershey1988]; อย่าอ้าง causal จาก n เล็ก.

### 11.4 ความรู้ชนิดนี้ควรไปอยู่ที่ไหน (routing table, craft ตาม LESSONS_LEARNED index + CoALA [Sumers2023])
| ชนิดความรู้ | เก็บที่ | ทำไม |
|---|---|---|
| คำผู้ใช้เกี่ยวกับงานชิ้นหนึ่ง (verdict) | `memory/FEEDBACK_HISTORY.json` | episodic; ต้องคำต่อคำ + elicitation [Slovic1995] |
| ความชอบที่ผู้ใช้ยืนยันว่าใช้ทุกครั้ง | CLAUDE.md / auto-memory → สรุปใน USER_PREFERENCES | house rule; source of truth ตามที่ USER_PREFERENCES ระบุ |
| ผลการทดลอง generation | `memory/PROMPT_EXPERIMENTS.json` / experiments/ | ห้ามใส่ run ที่ไม่ได้เกิด (ตาม note ในไฟล์) |
| บทเรียน craft ของคลิป/rig/เสียง | `story-clips/_craft/LEARNING-LOG.md` → fold เข้า GUIDE/rig.js (✔) | ทำงานอยู่แล้ว — encode-into-routine [LevittMarch1988] |
| pattern ที่ได้ผล / ล้มเหลว (ข้ามงาน) | DESIGN_PATTERNS / ANTI_PATTERNS | semantic; ต้องมี evidence pointer |
| ความสามารถ/ข้อจำกัดของโมเดล | CAPABILITY_MATRIX.json | ต้อง model_version + review_by [Darr1995] |
| ความรู้จากงานวิจัย | knowledge/<module>/ + sources.json | มี tier + access_status |
| ขั้นตอนที่ต้องทำทุกครั้ง | skill SKILL.md / tool default | procedural — ที่เดียวที่ "ใช้แน่" |

---

## 12. แบบฝึกหัด (Exercises)

1. **(พื้นฐาน)** เขียน lesson card จากบรรทัด ANTI_PATTERNS "Naming the unwanted thing makes FLUX draw it" ให้ครบทุก field ใน §6.2. *คำตอบดี:* when_applies ระบุ model (FLUX schnell), evidence เป็น path, judged_by=tool/ผู้ใช้, encoded_in ชี้ build_prompt หรือ "not yet", มี review_by.
2. **(พื้นฐาน)** แยกบทเรียน 10 บรรทัดใน LEARNING-LOG เป็น failure/success/capability/taste. *ดี:* เห็นว่าส่วนใหญ่เป็น failure/capability, success น้อย → ชี้ช่องว่างตาม [EllisDavidi2005].
3. **(กลาง)** ทำ debrief 4 คำถามของ carousel ชุดล่าสุดโดยใช้แต่ objective media (ไฟล์, ตัวเลข, คำผู้ใช้). *ดี:* ทุกข้ออ้างไฟล์; มี keep 3 / change 3; ไม่มีประโยคตำหนิตัวผู้ทำ [KlugerDeNisi1996].
4. **(กลาง)** ออกแบบคำถาม feedback 2 ข้อสำหรับผู้ใช้ที่ใช้เวลา <10 วินาที และไม่บังคับให้ติตรงๆ. *ดี:* A/B หรือ 1–5 + ช่องคำพูดอิสระไม่บังคับ; บันทึก elicitation [Slovic1995] [AndrewsChompusri2013].
5. **(กลาง)** เขียน retrieval rule ที่เลือก ≤5 lessons สำหรับ "Thai story clip ใหม่ 9:16 ใช้ Gemini TTS" — ระบุ scoring. *ดี:* relevance (tag ตรง) × importance (severity/confidence) × recency พร้อม decay; ตัด capability lessons ที่เลย review_by [Park2023] [Liu2024].
6. **(สูง)** หา 1 ปัญหาที่เกิดซ้ำแม้มี lesson แล้ว และทำ double-loop analysis. *ดี:* ชี้ assumption/goal ที่ทำให้ซ้ำ (เช่น "ต้องประหยัดโควตา" ทำให้ข้ามการตรวจ), เสนอเปลี่ยน routine ไม่ใช่เพิ่มบทเรียน [Argyris1976].
7. **(สูง)** ออกแบบการทดลองเล็กว่า "ใส่ lessons 5 ข้อหัว brief" ดีกว่า "ไม่ใส่" สำหรับงาน FLUX prompt. *ดี:* งานชุดเดียวกัน สุ่มลำดับ, วัด rerenders และคะแนน rubric, เขียน expectation ก่อน, คนให้คะแนนไม่รู้เงื่อนไข (blind), ยอมรับว่า n เล็ก [Guilbault2004] [BaronHershey1988].
8. **(สูง)** Audit คลังความจำของ studio ด้วย 8 มิติ KMSP-Q (mentoring, sharing, reflexivity, memory, communication, tech support, training, development) แปลเป็นบริบท human+agents. *ดี:* ให้คะแนนพร้อมหลักฐานไฟล์; ระบุมิติอ่อน (เช่น reflexivity เป็นระบบไหม) [Farnese2019].

---

## 13. Checklist (ก่อนส่ง / ก่อนปิดงาน)

1. ☐ งานนี้เข้า trigger ที่ต้อง debrief ไหม (ปฏิเสธ, แก้ ≥2 รอบ, เกินโควตา, ชมชัด)?
2. ☐ บันทึกคำตัดสินของผู้ใช้ **คำต่อคำ** + วิธีที่ถาม (elicitation)?
3. ☐ debrief มีทั้ง keep และ change?
4. ☐ ทุกข้อในบทเรียนอ้าง objective evidence (path/ตัวเลข/คำพูด)?
5. ☐ บทเรียนชี้ที่งาน/กระบวนการ ไม่ใช่ตัวคน/agent?
6. ☐ มี `judged_by` ภายนอก (ผู้ใช้/tool) — ไม่ใช่ความเห็นของ agent อย่างเดียว?
7. ☐ ระบุ when_applies (task, model, platform, ภาษา) ชัด?
8. ☐ capability lesson มี model_version + review_by?
9. ☐ เช็กว่ามี lesson ซ้ำอยู่แล้วไหม — ถ้ามี ให้ +1 count และพิจารณา encode แทนเพิ่มบรรทัดใหม่?
10. ☐ ถ้าซ้ำ ≥2: แก้ skill/tool/template แล้ว และติด `encoded_in`?
11. ☐ กฎที่ขัดกันถูกติด superseded_by?
12. ☐ ไม่มีข้อมูลส่วนบุคคล/คีย์/รหัสผ่านในบันทึก?
13. ☐ บันทึกอยู่ในที่เดียวที่ถูก (ตาม LESSONS_LEARNED index) ไม่กระจายซ้ำหลายไฟล์?
14. ☐ brief งานถัดไปจะดึงบทเรียนนี้ได้ (tag ตรง) และไม่เกิน 5 ข้อ?
15. ☐ metric ของงานนี้ (rerenders, quota, first-pass) ถูกบันทึก?

---

## 14. Evaluation Rubric (ระบบ/บันทึกการเรียนรู้จากประสบการณ์)

ใช้ประเมิน (a) lesson/case ที่เพิ่งเขียน หรือ (b) ระบบ memory ทั้งหมดรายเดือน. ให้คะแนน 1–4 ต่อเกณฑ์.

| เกณฑ์ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **A. Evidence & provenance** | ไม่มีหลักฐาน/ที่มา | อ้างความจำ ("รู้สึกว่า") | มี path หรือตัวเลข + วันที่ | มี evidence เชิงวัตถุ + judged_by ภายนอก + derived_from job |
| **B. Actionability & scope** | ข้อความกว้าง ("ทำให้ดีขึ้น") | มีคำแนะนำแต่ไม่บอกเงื่อนไข | คำสั่งทำได้ + when_applies | คำสั่ง + เงื่อนไข + ตัวอย่าง (case) + ข้อยกเว้น |
| **C. Encoding into routine** | อยู่แค่ใน log | ถูกอ้างใน index | ถูกเพิ่มใน checklist/skill | ถูกฝังใน tool default/template และติด ✔ |
| **D. Delivery & reuse** | ไม่มีทางถูกดึง | ต้องค้นเอง | ถูก tag ให้ retrieval เลือกได้ | ถูก push เข้า brief จริงและมีบันทึกการใช้ |
| **E. Balance & bias control** | failure-only หรือ blame | มี success บ้าง | keep+change; expectation บันทึกก่อนบางครั้ง | keep+change ทุกครั้ง; expectation ก่อนผล; ระวัง outcome bias |
| **F. Hygiene** | มีข้อมูลส่วนตัว/ซ้ำ/ขัดกัน | ซ้ำหรือเก่าค้าง | ไม่มีข้อมูลส่วนตัว, มี superseded | + review_by, pruning ตามรอบ, metrics ติดตาม |

**วิธีให้คะแนน:** รวม 6–24. ≥20 = ดีมาก; 15–19 = ใช้ได้ ปรับจุดต่ำสุดก่อน; ≤14 = ยังไม่ควรถือเป็นบทเรียน (เก็บเป็น hypothesis).
**Critical failures (ตกทันทีไม่ว่าคะแนนรวม):** (1) มีข้อมูลส่วนบุคคล/API key/password; (2) อ้าง source หรือคำผู้ใช้ที่ไม่มีจริง; (3) บทเรียนจากความเห็น agent อย่างเดียวถูกเขียนเป็นกฎถาวร; (4) กฎใหม่ขัด house rule ใน CLAUDE.md/memory โดยไม่มีคำยืนยันของผู้ใช้.

---

## 15. แหล่งอ้างอิง (References)

| key | full citation | URL | access |
|---|---|---|---|
| AamodtPlaza1994 | Aamodt, A., & Plaza, E. (1994). Case-based reasoning: Foundational issues, methodological variations, and system approaches. *AI Communications, 7*(1), 39–59. | https://doi.org/10.3233/AIC-1994-7104 | abstract |
| AlaviLeidner2001 | Alavi, M., & Leidner, D. E. (2001). Review: Knowledge management and knowledge management systems. *MIS Quarterly, 25*(1), 107–136. | https://doi.org/10.2307/3250961 | abstract |
| AndrewsChompusri2013 | Andrews, T. G., & Chompusri, N. (2013). Understanding organizational practice adoption at the Thai subsidiary corporation: Antecedents and consequences of kreng jai. *Management International Review, 53*(1), 61–82. | https://doi.org/10.1007/s11575-012-0163-y | abstract |
| ArgoteEpple1990 | Argote, L., & Epple, D. (1990). Learning curves in manufacturing. *Science, 247*(4945), 920–924. | https://doi.org/10.1126/science.247.4945.920 | abstract |
| Argyris1976 | Argyris, C. (1976). Single-loop and double-loop models in research on decision making. *Administrative Science Quarterly, 21*(3), 363ff. | https://doi.org/10.2307/2391848 | abstract |
| ArgyrisSchon1978 | Argyris, C., & Schön, D. A. (1978). *Organizational Learning: A Theory of Action Perspective.* Addison-Wesley. | https://doi.org/10.2307/40183951 | bibliographic |
| BaronHershey1988 | Baron, J., & Hershey, J. C. (1988). Outcome bias in decision evaluation. *Journal of Personality and Social Psychology, 54*(4), 569–579. | https://doi.org/10.1037/0022-3514.54.4.569 | abstract |
| Bergsteiner2010 | Bergsteiner, H., Avery, G. C., & Neumann, R. (2010). Kolb's experiential learning model: Critique from a modelling perspective. *Studies in Continuing Education, 32*(1), 29–46. | https://doi.org/10.1080/01580370903534355 | abstract |
| CAIB2003 | Columbia Accident Investigation Board. (2003). *Report, Volume I* (Ch. 8, History as Cause). NASA/GPO. | https://www.nasa.gov/wp-content/uploads/static/history/columbia/reports/CAIBreportv1.pdf | search_summary |
| Catmull2008 | Catmull, E. (2008, September). How Pixar fosters collective creativity. *Harvard Business Review*, 64–72. | https://hbr.org/2008/09/how-pixar-fosters-collective-creativity | full_text (course-hosted copy) |
| Darr1995 | Darr, E. D., Argote, L., & Epple, D. (1995). The acquisition, transfer, and depreciation of knowledge in service organizations. *Management Science, 41*(11), 1750–1762. | https://doi.org/10.1287/mnsc.41.11.1750 | abstract |
| Edmondson1999 | Edmondson, A. C. (1999). Psychological safety and learning behavior in work teams. *Administrative Science Quarterly, 44*(2), 350–383. | https://doi.org/10.2307/2666999 | abstract |
| EllisDavidi2005 | Ellis, S., & Davidi, I. (2005). After-event reviews: Drawing lessons from successful and failed experience. *Journal of Applied Psychology, 90*(5), 857–871. | https://doi.org/10.1037/0021-9010.90.5.857 | abstract |
| Ericsson1993 | Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C. (1993). The role of deliberate practice in the acquisition of expert performance. *Psychological Review, 100*(3), 363–406. | https://doi.org/10.1037/0033-295X.100.3.363 | abstract |
| EricssonHarwell2019 | Ericsson, K. A., & Harwell, K. W. (2019). Deliberate practice and proposed limits on the effects of practice on the acquisition of expert performance. *Frontiers in Psychology, 10*, 2396. | https://doi.org/10.3389/fpsyg.2019.02396 | abstract |
| Farnese2019 | Farnese, M. L., Barbieri, B., Chirumbolo, A., & Patriotta, G. (2019). Managing knowledge in organizations: A Nonaka's SECI model operationalization. *Frontiers in Psychology, 10*, 2730. | https://doi.org/10.3389/fpsyg.2019.02730 | full_text |
| GAO2002 | U.S. General Accounting Office. (2002). *NASA: Better Mechanisms Needed for Sharing Lessons Learned* (GAO-02-195). | https://www.govinfo.gov/content/pkg/GAOREPORTS-GAO-02-195/html/GAOREPORTS-GAO-02-195.htm | full_text |
| GDPRArt5 | Regulation (EU) 2016/679 (General Data Protection Regulation), Article 5. | https://gdpr-info.eu/art-5-gdpr/ | full_text |
| GoogleSRE2016 | Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). *Site Reliability Engineering*, Ch. 15 "Postmortem Culture: Learning from Failure". O'Reilly/Google. | https://sre.google/sre-book/postmortem-culture/ | full_text |
| Gourlay2006 | Gourlay, S. (2006). Conceptualizing knowledge creation: A critique of Nonaka's theory. *Journal of Management Studies, 43*(7), 1415–1436. | https://doi.org/10.1111/j.1467-6486.2006.00637.x | abstract |
| Guilbault2004 | Guilbault, R. L., Bryant, F. B., Brockway, J. H., & Posavac, E. J. (2004). A meta-analysis of research on hindsight bias. *Basic and Applied Social Psychology, 26*(2–3), 103–117. | https://doi.org/10.1080/01973533.2004.9646399 | abstract |
| HealeyJenkins2000 | Healey, M., & Jenkins, A. (2000). Kolb's experiential learning theory and its application in geography in higher education. *Journal of Geography, 99*(5), 185–195. | https://doi.org/10.1080/00221340008978967 | abstract |
| Hu2008 | Hu, Y., Koren, Y., & Volinsky, C. (2008). Collaborative filtering for implicit feedback datasets. *Proc. IEEE ICDM 2008*, 263–272. | https://doi.org/10.1109/ICDM.2008.22 | abstract |
| HuangSelfCorrect2023 | Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X., & Zhou, D. (2023). Large language models cannot self-correct reasoning yet. arXiv:2310.01798. | https://arxiv.org/abs/2310.01798 | abstract |
| KeiserArthur2021 | Keiser, N. L., & Arthur, W., Jr. (2021). A meta-analysis of the effectiveness of the after-action review (or debrief) and factors that influence its effectiveness. *Journal of Applied Psychology, 106*(7), 1007–1032. | https://doi.org/10.1037/apl0000821 | abstract |
| KlugerDeNisi1996 | Kluger, A. N., & DeNisi, A. (1996). The effects of feedback interventions on performance. *Psychological Bulletin, 119*(2), 254–284. | https://doi.org/10.1037/0033-2909.119.2.254 | abstract |
| Kolb1984 | Kolb, D. A. (1984). *Experiential Learning: Experience as the Source of Learning and Development.* Prentice-Hall. | https://doi.org/10.1002/job.4030080408 (review record) | bibliographic |
| LaveWenger1991 | Lave, J., & Wenger, E. (1991). *Situated Learning: Legitimate Peripheral Participation.* Cambridge University Press. | https://doi.org/10.1017/CBO9780511815355 | abstract |
| LevittMarch1988 | Levitt, B., & March, J. G. (1988). Organizational learning. *Annual Review of Sociology, 14*, 319–338. | https://doi.org/10.1146/annurev.so.14.080188.001535 | abstract |
| Lewis2020 | Lewis, P., Perez, E., Piktus, A., et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *NeurIPS 2020*; arXiv:2005.11401. | https://arxiv.org/abs/2005.11401 | abstract |
| Liu2024 | Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the middle: How language models use long contexts. *TACL, 12*, 157–173. | https://doi.org/10.1162/tacl_a_00638 | abstract |
| Macnamara2014 | Macnamara, B. N., Hambrick, D. Z., & Oswald, F. L. (2014). Deliberate practice and performance in music, games, sports, education, and professions: A meta-analysis. *Psychological Science, 25*(8), 1608–1618. | https://doi.org/10.1177/0956797614535810 | abstract |
| MacnamaraMaitra2019 | Macnamara, B. N., & Maitra, M. (2019). The role of deliberate practice in expert performance: Revisiting Ericsson, Krampe & Tesch-Römer (1993). *Royal Society Open Science, 6*, 190327. | https://doi.org/10.1098/rsos.190327 | abstract |
| Magesh2024 | Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E. (2024). Hallucination-free? Assessing the reliability of leading AI legal research tools. arXiv:2405.20362. | https://arxiv.org/abs/2405.20362 | abstract |
| NASAOIG2012 | NASA Office of Inspector General. (2012, March 6). *Review of NASA's Lessons Learned Information System* (IG-12-012). | https://www.oversight.gov/sites/default/files/oig-reports/IG-12-012.pdf | full_text |
| Nonaka1994 | Nonaka, I. (1994). A dynamic theory of organizational knowledge creation. *Organization Science, 5*(1), 14–37. | https://doi.org/10.1287/orsc.5.1.14 | abstract |
| Packer2023 | Packer, C., Wooders, S., Lin, K., Fang, V., Patil, S. G., Stoica, I., & Gonzalez, J. E. (2023). MemGPT: Towards LLMs as operating systems. arXiv:2310.08560. | https://arxiv.org/abs/2310.08560 | abstract |
| Park2023 | Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P., & Bernstein, M. S. (2023). Generative agents: Interactive simulacra of human behavior. *UIST '23*. | https://doi.org/10.1145/3586183.3606763 | full_text (ar5iv) |
| Pashler2008 | Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning styles: Concepts and evidence. *Psychological Science in the Public Interest, 9*(3), 105–119. | https://doi.org/10.1111/j.1539-6053.2009.01038.x | abstract |
| Polanyi1966 | Polanyi, M. (1966/2009). *The Tacit Dimension.* University of Chicago Press (2009 ed., foreword by A. Sen). | https://doi.org/10.1007/s11016-010-9328-0 (review record) | bibliographic |
| Shi2023 | Shi, F., Chen, X., Misra, K., Scales, N., Dohan, D., Chi, E., Schärli, N., & Zhou, D. (2023). Large language models can be easily distracted by irrelevant context. *ICML 2023*; arXiv:2302.00093. | https://arxiv.org/abs/2302.00093 | abstract |
| Shinn2023 | Shinn, N., Cassano, F., Berman, E., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language agents with verbal reinforcement learning. *NeurIPS 2023*; arXiv:2303.11366. | https://arxiv.org/abs/2303.11366 | full_text |
| Slovic1995 | Slovic, P. (1995). The construction of preference. *American Psychologist, 50*(5), 364–371. | https://doi.org/10.1037/0003-066X.50.5.364 | abstract |
| Sumers2023 | Sumers, T. R., Yao, S., Narasimhan, K., & Griffiths, T. L. (2023). Cognitive architectures for language agents. arXiv:2309.02427. | https://arxiv.org/abs/2309.02427 | abstract |
| TannenbaumCerasoli2013 | Tannenbaum, S. I., & Cerasoli, C. P. (2013). Do team and individual debriefs enhance performance? A meta-analysis. *Human Factors, 55*(1), 231–245. | https://doi.org/10.1177/0018720812448394 | abstract |
| TourishRobson2003 | Tourish, D., & Robson, P. (2003). Critical upward feedback in organisations. *Journal of Communication Management, 8*(2), 150–167. | https://doi.org/10.1108/13632540410807628 | abstract |
| W3CPROVO2013 | Lebo, T., Sahoo, S., & McGuinness, D. (Eds.). (2013). *PROV-O: The PROV Ontology.* W3C Recommendation, 30 April 2013. | https://www.w3.org/TR/prov-o/ | publisher_page |
| WalshUngson1991 | Walsh, J. P., & Ungson, G. R. (1991). Organizational memory. *Academy of Management Review, 16*(1), 57–91. | https://doi.org/10.5465/amr.1991.4278992 | abstract |
| Weber2000 | Weber, R., Aha, D. W., Branting, L. K., Lucas, J. R., & Becerra-Fernandez, I. (2000). Active case-based reasoning for lessons delivery systems. *Proc. FLAIRS-2000*, AAAI. | https://cdn.aaai.org/FLAIRS/2000/FLAIRS00-033.pdf | full_text |
| Weber2001 | Weber, R., Aha, D. W., & Becerra-Fernandez, I. (2001). Intelligent lessons learned systems. *Expert Systems with Applications, 20*(1), 17–34. | https://doi.org/10.1016/S0957-4174(00)00046-4 | search_summary |
| Wenger2000 | Wenger, E. (2000). Communities of practice and social learning systems. *Organization, 7*(2), 225–246. | https://doi.org/10.1177/135050840072002 | abstract |
| Zhang2024 | Zhang, Z., Bo, X., Ma, C., Li, R., Chen, X., et al. (2024). A survey on the memory mechanism of large language model based agents. arXiv:2404.13501. | https://arxiv.org/abs/2404.13501 | abstract |
| Zhao2023 | Zhao, A., Huang, D., Xu, Q., Lin, M., Liu, Y.-J., & Huang, G. (2023). ExpeL: LLM agents are experiential learners. *AAAI 2024*; arXiv:2308.10144. | https://arxiv.org/abs/2308.10144 | abstract |

**หมายเหตุความซื่อตรง:** volume/issue/page ของบทความวารสารตรวจกับ metadata OpenAlex ในรอบนี้ (Argyris 1976 OpenAlex ให้แค่หน้าแรก). DOI ทุกตัวตรวจผ่าน OpenAlex/arXiv ยกเว้น Weber2001 (DBLP snippet: ESWA 20(1):17–34) และ CAIB2003 (snippet). ชื่อร่วมเขียนของ arXiv papers บางรายการหลังคนที่ 5 มาจากความรู้ทั่วไป ไม่ได้ตรวจ — ใช้ 'et al.' เมื่ออ้าง. Senge 1990 ถูกกล่าวถึงผ่าน Weber2000 เท่านั้น ไม่มี key แยก. US Army TC 25-20 ไม่ได้อ่าน — ไม่อ้างเนื้อหา. Klein premortem (HBR 2007) พบแต่ไม่ได้อ่าน — ไม่ได้ใส่.
