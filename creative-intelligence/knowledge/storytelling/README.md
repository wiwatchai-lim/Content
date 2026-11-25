# M13 — Storytelling (การเล่าเรื่อง)

โมดูลความรู้ทั่วไป ใช้ได้กับทุกสาขา ทุกลูกค้า ตัวอย่างที่ยกเป็นงานของสตูดิโอ (carousel Mint & Tao "Slowly Growing", คลิปเล่าเรื่องไทยพร้อม TTS, คลิปสินค้า) เป็นแค่ตัวอย่าง
แหล่งอ้างอิงอยู่ใน `sources.json` (อ้างด้วย key เช่น `[Mar2021]`) ค้นคว้าเมื่อ 2026-11-25
เอกสารใช้งานคู่กัน: **`STORY_TEMPLATES.md`** (แม่แบบตามความยาว 5 s ถึง 10 min)

ป้ายกำกับหลักฐาน: **SCIENCE** = มีงานวิจัยรองรับ (ระบุ tier) · **CRAFT** = แนวปฏิบัติของคนทำงาน (tier D) ไม่ใช่ข้อเท็จจริงทางวิทยาศาสตร์ · **DERIVED** = ข้อสรุปที่เราอนุมานจากแหล่งอื่น

---

## 1. Scope & status

**ครอบคลุม:** narratology พื้นฐาน (fabula/syuzhet), โครงเรื่อง (three-act, Freytag, Story Spine, Story Circle, Hero's Journey + ข้อวิจารณ์, kishōtenketsu, nonlinear), emotional arcs (Reagan 2016), narrative transportation (Green & Brock 2000, van Laer 2014), narrative persuasion meta-analyses, identification กับตัวละคร, suspense/curiosity/surprise (Brewer & Lichtenstein), spoilers, setup/payoff, show-don't-tell, micro-story, documentary modes, การเรียนรู้ผ่านเรื่องเล่า (Mar 2021), brand storytelling

**ไม่ทำซ้ำ (ลิงก์ไปแทน):**
- shot grammar / ภาพเล่าเรื่อง → `.claude/skills/ai-visual-artist/VISUAL_STORYTELLING.md`
- storyboard → `story-clips/_craft/curriculum/08-storyboard.md`; การตัดต่อ/กล้อง/การแสดง → `story-clips/_craft/GUIDE.md`
- curiosity gap (Loewenstein, Kang) → `knowledge/psychology/README.md` §2.3
- จุดตรวจ hook/retention ตามวินาที → `knowledge/audience/RETENTION_REVIEW.md`
- AIDA/PAS และประเภทคอนเทนต์ → `knowledge/marketing/CONTENT_TYPES.md`
- การเขียนบท/บทพูด/VO → โมดูล M14 `knowledge/screenwriting/`

**ยังบาง / ไม่ครอบคลุม:** comedy (ข้ามตามโจทย์), งานวิจัยกับผู้ชมไทยโดยตรง (**ไม่พบเลย**), งานวิจัยที่ทดสอบโครงเรื่องกับคลิปสั้นแนวตั้ง 5–60 s โดยตรง (**ไม่พบ** — เวลาของ beat ใน STORY_TEMPLATES จึงเป็น CRAFT เกือบทั้งหมด), interactive/branching narrative

**สถานะการเข้าถึง (อัปเกรด 2026-11-25):** 29 แหล่ง — S 5 · A 17 · B 4 · D 2 · E 1; อ่านฉบับเต็ม 14 (Reagan, Mar, O'Keefe & Hoeken, Oh, Brewer & Lichtenstein 1981 + 1982 tech report, van Laer 2014 accepted manuscript, Green & Brock 2000, Bower & Clark 1969, Gamst & Freund 1978, Cohen 2001, LHN, NPR Story Spine, StudioBinder Story Circle), abstract 2, bibliographic 2, search_summary 11 → **อ่านจริง 16/29 = 55%** (ก่อนหน้า 7/28 = 25%). ยังเข้าไม่ได้: Braddock & Dillard 2016 (publisher 403, ไม่มี OA), Dahlstrom 2014 (PMC/Europe PMC ล่ม/บล็อก), Shen 2015, Leavitt & Christenfeld 2011, Rogers 2023

---

## 2. Core concepts

รูปแบบ: **คืออะไร · กลไก · ใช้ในงาน · ข้อจำกัด · tier + key · confidence**

### 2.1 Fabula vs syuzhet (เรื่อง vs การเล่า)
- **คืออะไร:** fabula = เหตุการณ์ตามลำดับเวลาและเหตุผล; syuzhet (sujet) = การจัดเรียง/เลือกเล่าเหตุการณ์นั้นจริง ๆ ในงาน `[LHN_Narratology]`
- **กลไก:** เหตุการณ์ชุดเดียวกันเล่าได้หลายลำดับ และลำดับนั้นเองที่สร้างอารมณ์ (ดู 2.6)
- **ใช้:** ก่อนเขียนบท เขียน fabula 3–5 บรรทัดก่อน แล้วค่อยเลือก syuzhet: เล่าตามลำดับ / เปิดด้วยผลลัพธ์ / ซ่อนข้อมูลไว้เฉลย
- **ข้อจำกัด:** คำศัพท์ถูกใช้ต่างกันในแต่ละสำนัก (Wikipedia บางหน้านิยามกลับด้าน — ระวัง)
- B · `[LHN_Narratology]` · confidence: **high** (เป็นแนวคิดพื้นฐาน)

### 2.2 Narrative transportation (การถูกพาเข้าไปในเรื่อง)
- **คืออะไร:** การจมเข้าไปในโลกของเรื่อง ประกอบด้วย attention + imagery + feelings ยิ่งถูกพาเข้าไปมาก ความเชื่อยิ่งขยับตามเรื่อง `[GreenBrock2000]`; van Laer et al. รวม 132 effect sizes จาก 76 บทความ `[VanLaer2014]`: ปัจจัยที่ผู้เล่าคุมได้สัมพันธ์กับ transportation แค่ระดับเล็ก (ตัวละครที่ระบุตัวได้ ρ = .20, plot ที่นึกภาพได้ .29, ความสมจริง .27) ส่วนปัจจัยผู้ชม attention .29, transportability .30, อายุ .00; เมื่อถูกพาเข้าเรื่องแล้วสัมพันธ์กับอารมณ์ร่วม .57, attitude .44, intention .31, belief .26 และความคิดแย้ง −.20 (เป็น correlation กับ transportation ที่วัดได้ ไม่ใช่ผลของ 'ใช้เรื่อง vs ไม่ใช้')
- **กลไก (ตามทฤษฎี):** เมื่อจมอยู่ในเรื่อง คนโต้แย้งน้อยลง และอารมณ์ร่วมกับตัวละคร
- **ใช้:** ฉากเดียวที่จับต้องได้ + รายละเอียดทางประสาทสัมผัส + ไม่ขัดจังหวะด้วยโลโก้/ข้อความขายกลางเรื่อง; ใส่ CTA หลังเรื่องจบ
- **ข้อจำกัด:** บางการศึกษา transportation ไม่ได้เป็นตัวกลางของการโน้มน้าว หรือการ manipulate ล้มเหลว; ผลเฉลี่ยเล็ก (2.3). Green & Brock พบว่าติดป้าย 'fiction' หรือ 'ข่าวจริง' ให้เรื่องเดียวกันแทบไม่เปลี่ยน transportation/ความเชื่อ → เรื่องแต่ง Mint & Tao ก็ยังเปลี่ยนความเชื่อได้ ข้อเท็จจริงสุขภาพในเรื่องจึงต้องถูกต้อง `[GreenBrock2000]`
- A/S · `[GreenBrock2000]` `[VanLaer2014]` · confidence: **medium-high** ว่ากลไกมีจริง, **ต่ำ** ว่าจะได้ผลมากในคลิปสั้น

### 2.3 เรื่องเล่าโน้มน้าวได้ "นิดหน่อย" — ไม่ใช่เวทมนตร์
- **หลักฐาน:** Braddock & Dillard: ผลเชิงบวกเล็กต่อ belief/attitude/intention/behaviour `[BraddockDillard2016]`; Shen et al. (สุขภาพ, 25 studies) r = .063 รวม — **audio/video มีผล, print ไม่มีผลชัด**; ข้อความแบบ "ตรวจ/ป้องกัน" ได้ผล, แบบ "เลิก" ไม่ได้ผล `[ShenSheerLi2015]`; O'Keefe & Hoeken: narrative vs non-narrative r = .067, prediction interval −.107 ถึง .237 → **บางครั้งเรื่องเล่าแพ้** `[OKeefeHoeken2021]`
- **ใช้:** เรื่องเล่าเหมาะกับคลิปที่ชวน "ไปตรวจสายตา" (detection/prevention) มากกว่าข้อความ "เลิกทำ X"; ทดสอบสองเวอร์ชันจริงเมื่อทำได้
- S · confidence: **high** ว่าผลเฉลี่ยเล็กและแปรปรวนมาก

### 2.4 เรื่องเล่าช่วยให้เข้าใจและจำ (การเรียนรู้)
- **หลักฐาน:** meta-analysis 33,078 คน: เรื่องเล่าเข้าใจและจำได้ดีกว่าบทความแบบอธิบาย g = .55 (จำ .72, เข้าใจ .48) ไม่ขึ้นกับอายุหรือฟัง/อ่าน `[Mar2021]`; การผูกคำเป็นเรื่องช่วยจำรายการ: 12 รายการ × 10 คำ ทดสอบท้ายรวม 93% vs 13% (N = 24) `[BowerClark1969]` แต่กับรายการเดียว 30 คำไม่พบข้อได้เปรียบ `[GamstFreund1978]` → ได้ผลชัดเมื่อข้อมูลเยอะจนตีกัน; ในการสื่อสารวิทยาศาสตร์ เรื่องเล่าเพิ่มความเข้าใจและความสนใจ แต่ก็แพร่ข้อมูลผิดได้ `[Dahlstrom2014]`
- **ใช้:** คลิปให้ความรู้ (เช่นสายตายาวตามวัย) = ตัวละครหนึ่งคนเจอปัญหา → ข้อเท็จจริงถูกพูดชัด ๆ ตรงจุดเฉลย → ทางออก
- **ข้อจำกัด:** Mar เตือนเองว่าอย่ายัดทุกอย่างเป็นเรื่องเล่า; heterogeneity 98%; มี publication bias ฝั่ง memory
- S/A · confidence: **high** (ทิศทาง), **medium** (ขนาด)
- **Myth:** "เรื่องเล่าจำได้มากกว่าข้อเท็จจริง 22 เท่า" — ไม่พบต้นตอใน Bruner `[PatienceDavies2021]` → ห้ามใช้

### 2.5 Emotional arcs (เส้นอารมณ์)
- **หลักฐาน:** นิยาย 1,327 เล่ม พบ 6 รูปหลัก: Rags to riches (ขึ้น), Tragedy (ลง), Man in a hole (ลง-ขึ้น), Icarus (ขึ้น-ลง), Cinderella (ขึ้น-ลง-ขึ้น), Oedipus (ลง-ขึ้น-ลง); ที่ยอดดาวน์โหลดสูงสุด = Icarus, Oedipus, และ Man-in-a-hole สองรอบ — รูปที่พบบ่อยที่สุดไม่ใช่รูปที่ยอดนิยมที่สุด `[Reagan2016]`
- **ใช้:** วาดเส้นอารมณ์ของคลิปก่อนเขียน (−/+ ต่อ beat); problem-solution สั้น ๆ = Man in a hole; เรื่องหลายตอนลองหลุมสองหลุม
- **ข้อจำกัด:** วัดอารมณ์ของถ้อยคำในนิยายยาว ไม่ใช่วิดีโอ; downloads เป็นตัวแทนความสำเร็จแบบหยาบ (ผู้เขียนบอกเอง)
- A · confidence: **medium** สำหรับนิยาย, **low** เมื่อเอามาใช้กับคลิป (DERIVED)

### 2.6 Suspense · Curiosity · Surprise (structural-affect theory)
- **คืออะไร:** suspense = บอกเหตุตั้งต้น ยืดผลออกไป; curiosity = บอกว่ามีอะไรเกิดขึ้น/บอกผลก่อน แต่ซ่อนว่าเกิดอย่างไร; surprise = ซ่อนข้อมูลสำคัญ แล้วเปิดตอนท้ายทำให้ตีความใหม่ `[BrewerLichtenstein1982]`
- **หลักฐาน:** เรื่องที่มีโครง suspense ถูกชอบ 4.85/7 vs เวอร์ชันเรียงเหตุการณ์ธรรมดา 2.15; ตัดตอนจบ (no resolution) คะแนน "เป็นเรื่อง" ตกจาก 5.05 เหลือ 2.75 `[BrewerLichtenstein1981]`
- **ใช้:** ทุกคลิปเลือก 1 โหมดหลักให้ชัด; **อย่าจบโดยไม่คลี่คลาย** ยกเว้นเป็นซีรีส์ที่บอกตอนต่อไปชัด
- **ข้อจำกัด:** เรื่องเดียว นักศึกษาตะวันตก ปี 1981
- A/B · confidence: **medium-high**

### 2.7 Spoilers — ผลขัดกัน
- Leavitt & Christenfeld: spoiler ไม่ทำให้เสียอรรถรส (อาจชอบมากขึ้น) `[LeavittChristenfeld2011]` แต่ Johnson & Rosenbaum และ Levine et al. พบตรงข้าม: spoiler ลดความเพลิดเพลิน `[SpoilerReplications]`
- **ใช้:** ค่าเริ่มต้น = อย่าเฉลย twist ใน caption/thumbnail; โครง "ผลก่อน" (curiosity) ใช้ได้เมื่อความสนุกอยู่ที่ "อย่างไร" ไม่ใช่ "อะไร"
- A · confidence: **low** (contested)

### 2.8 Identification กับตัวละคร & motivation
- **คืออะไร:** ผู้ชมรับเรื่อง "จากข้างใน" รับเป้าหมายและมุมมองของตัวละคร ต่างจากการดูแบบคนนอก `[Cohen2001]`
- **ใช้:** beat แรกต้องบอก "ตัวละครอยากได้อะไร/กลัวอะไร"; Mint & Tao ไม่มีหน้า → ให้เป้าหมายและท่าทางชัด; ตัวละครต้องมี want (ภายนอก) และถ้าทำได้มี need (ภายใน) — CRAFT
- **Conflict:** ในโครงตะวันตก conflict = ช่องว่างระหว่าง want กับอุปสรรค (CRAFT); kishōtenketsu แสดงว่าเรื่องไม่จำเป็นต้องมี conflict กลาง (2.10)
- A (identification) / D (want-need) · confidence: **medium**

### 2.9 โครงเรื่องหลัก (ทั้งหมดเป็น CRAFT เว้นแต่ระบุ)
| โครง | ลำดับ | เหมาะกับ | หลักฐาน |
|---|---|---|---|
| Three-act | setup → confrontation → resolution | ทุกความยาว ≥15 s | CRAFT (Aristotle: beginning-middle-end) |
| Freytag 5 ส่วน | exposition → rising → climax → falling → denouement | โฆษณา 30–90 s | primary text `[Freytag1900]`; ad 108 ชิ้นที่ครบ 5 ส่วนได้คะแนนชอบสูงกว่า (correlational) `[QuesenberryCoolsen2014]` |
| Story Spine | Once upon a time / Every day / But one day / Because of that ×n / Until finally / Ever since then | 15–90 s, carousel | CRAFT `[Adams_StorySpine]` |
| Story Circle | You–Need–Go–Search–Find–Take–Return–Change | 3–10 min, ตอนซีรีส์ | CRAFT `[Harmon_StoryCircle]` |
| Hero's Journey | departure–initiation–return (~17 stages) | ยาว ≥5 min, เรื่องชีวิต | CRAFT; มีหลักฐานแค่ว่าการเล่าชีวิตตัวเองแบบนี้เพิ่ม meaning `[Rogers2023]`; นักคติชนวิจารณ์หนักเรื่อง "สากล" `[Dundes2005]` |
| Kishōtenketsu | ki แนะนำ → shō พัฒนา → ten พลิก → ketsu สรุป | slice-of-life, carousel 4–8 สไลด์, เรื่องไม่มีผู้ร้าย | B `[Oh2025]` (ไม่ใช่กฎตายตัว) |
| Nonlinear | in medias res / flash-forward / ผลก่อน / วน | hook สั้น, เรื่องลึกลับ | ตรงกับ curiosity structure `[BrewerLichtenstein1982]` |

### 2.10 Kishōtenketsu
- **คืออะไร:** โครง 4 ส่วนที่ขับด้วยการค่อย ๆ เปิดเผยและ "ten" ซึ่งเปลี่ยนมุมมองต่อทุกอย่างก่อนหน้า ไม่ใช่การเอาชนะอุปสรรค; ตัวเอกเฉื่อยได้ ตอนจบวนกลับได้ `[Oh2025]`
- **ข้อจำกัด:** นักวิชาการญี่ปุ่น/จีนไม่มีนิยามตายตัว ไม่ควรใช้เพื่อ "ความเป็นญี่ปุ่น"; ประวัติที่มาในเว็บยอดนิยมมีข้อโต้แย้ง
- **ใช้:** เหมาะกับ "Slowly Growing" มาก — สไลด์ 1 ฉาก, 2 สิ่งเล็ก ๆ, 3 มุมพลิก, 4 ความหมายใหม่
- B · confidence: **medium**

### 2.11 Setup / payoff / foreshadowing
- **คืออะไร (CRAFT):** อะไรที่โชว์ไว้ต้องถูกใช้ (Chekhov's gun); ทุก payoff ต้องมี setup
- **หลักฐานใกล้เคียง:** เวอร์ชัน foreshadowing ใน Brewer & Lichtenstein ถูกชอบ 4.30 vs ปกติ 4.85 — คือ foreshadow ที่ชัดเกินลด suspense ได้บ้าง `[BrewerLichtenstein1981]`
- **ใช้:** คลิป 15 s: setup ในวินาทีแรก (เช่นมือถือถูกยื่นไกล) payoff ตอนจบ (ใส่แว่นแล้วถือใกล้ได้); ใน carousel วางสิ่งของในสไลด์ 1 ให้กลับมาสไลด์สุดท้าย
- D/B · confidence: **medium**

### 2.12 Show, don't tell
- **คืออะไร (CRAFT):** ให้ผู้ชมอนุมานอารมณ์/ข้อมูลจากการกระทำและภาพ แทนการบอกตรง ๆ
- **เชื่อมกับวิทยาศาสตร์ (DERIVED):** transportation ต้องการ imagery `[GreenBrock2000]`; แต่การเรียนรู้ต้องการข้อเท็จจริงที่ชัด `[Mar2021]` `[Dahlstrom2014]` → **show อารมณ์, tell ข้อเท็จจริง**
- **ข้อจำกัด:** คลิปสั้นที่ดูไม่มีเสียง/ดูผ่าน ๆ ต้อง tell สิ่งสำคัญด้วยข้อความ; ข้อเท็จจริงทางสุขภาพห้ามปล่อยให้ "อนุมานเอง"
- D · confidence: **medium**

### 2.13 Micro-storytelling (5–15 s)
- **หลักฐาน:** ไม่พบงานวิจัยโครงเรื่องในวิดีโอ ≤15 s โดยตรง ใกล้ที่สุดคือโฆษณาออนไลน์ 30 s: joy/surprise ช่วยให้ดูต่อ และผลของ joy ไม่สมมาตร `[Teixeira2012]`
- **CRAFT:** เรื่องเล็กสุด = สถานะ A → เหตุ → สถานะ B (ภาพ before/after); 1 ตัวละคร 1 เป้าหมาย 1 การเปลี่ยนแปลง
- A (ใกล้เคียง) / D · confidence: **low**

### 2.14 Documentary modes
- poetic, expository, observational, participatory, reflexive, performative — โหมดซ้อนกันได้ `[Nichols2001]`
- **ใช้:** คลิปร้าน/ลูกค้าจริง: observational (ถ่ายการวัดตาโดยไม่กำกับ), participatory (สัมภาษณ์), expository (VO + B-roll); **ห้ามจัดฉากแล้วอ้างว่าจริง** (ดู `knowledge/marketing/ETHICS_AND_THAI_AD_RULES.md`)
- A (bibliographic) · confidence: **medium**

### 2.15 Brand / commercial storytelling
- **หลักฐาน:** narrative ad กระตุ้น narrative processing → self-brand connection → attitude/intention `[Escalas2004]`; โฆษณา Super Bowl ที่เล่าเรื่องครบ 5 ส่วนได้คะแนนชอบสูงกว่า `[QuesenberryCoolsen2014]` (correlation); ผลรวมการโน้มน้าวเล็ก `[OKeefeHoeken2021]`
- **ใช้:** ให้ลูกค้าเป็นพระเอก แบรนด์เป็นผู้ช่วย (CRAFT); เรื่องต้องจบครบก่อนขาย
- A/S · confidence: **medium**

---

## 3. Contested / replication notes
| ประเด็น | ฝั่ง A | ฝั่ง B | confidence |
|---|---|---|---|
| Spoilers | ไม่เสีย/อาจดีขึ้น `[LeavittChristenfeld2011]` | ลดความเพลิดเพลิน `[SpoilerReplications]` | low |
| อ่าน literary fiction ครั้งเดียว → ToM ดีขึ้น | Kidd & Castano 2013 | ล้มเหลวใน 3 แล็บ N=792 `[Panero2016]`; มี replication หนึ่งที่สอดคล้อง | low |
| "เรื่องเล่า → oxytocin → ความไว้ใจ" | งานของ Zak (สื่อนิยมพูดถึง) | หลักฐาน oxytocin–trust ไม่ robust `[NaveCamererMcCullough2015]` | low → **อย่าอ้าง** |
| Narrative ชนะ non-narrative | ค่าเฉลี่ยบวก `[BraddockDillard2016]` `[ShenSheerLi2015]` | prediction interval ข้ามศูนย์ `[OKeefeHoeken2021]` | high ว่าเล็ก+แปรปรวน |
| Fiction vs non-fiction ใน Braddock & Dillard | สรุปหนึ่งว่า fiction เปลี่ยน attitude | อีกสรุปว่า non-fiction เปลี่ยน belief; snippet ที่อ้าง abstract: ผล moderator 'mixed' | **ยังเข้าต้นฉบับไม่ได้** — อย่าอ้างทิศทาง; Green & Brock 2000 (อ่านแล้ว) พบว่าป้าย fact/fiction แทบไม่มีผล |
| Hero's Journey สากล | Campbell / วงการเขียนบท | Dundes, Toelken: เลือกเฉพาะเรื่องที่เข้าแบบ `[Dundes2005]` | medium ว่าไม่สากล |

---

## 4. Applied patterns for our production
1. **Carousel Mint & Tao (6–10 สไลด์):** kishōtenketsu หรือ Story Spine; สไลด์ 1 = ฉาก + สิ่งที่ตัวละครอยาก; สไลด์ "ten" = มุมพลิกที่ทำให้ย้อนอ่านใหม่; สไลด์สุดท้าย = ความหมาย/ประโยคอบอุ่น (ตอนจบสำคัญ — ดู peak-end ใน psychology README)
2. **คลิปความรู้สุขภาพตา 30–60 s:** Man-in-a-hole: ปัญหาในชีวิตจริง (ลง) → ข้อเท็จจริงที่ตรวจแล้ว (จุดต่ำสุด/เฉลย) → ทางออก (ขึ้น) → CTA ไปตรวจ (detection behaviour = ประเภทที่ narrative ได้ผล `[ShenSheerLi2015]`)
3. **คลิปสินค้า 8–15 s:** before/after หนึ่งการเปลี่ยนแปลง; ไม่ต้องฝืนเป็นเรื่อง ถ้าจุดขายคือความสวยของแว่น (ดู "เมื่อไรไม่ควรใช้เรื่อง" ใน STORY_TEMPLATES)
4. **ซีรีส์ (night-optic, eyesight EP):** Story Circle ต่อตอน + ปมใหญ่ข้ามตอน; cliffhanger ได้เฉพาะเมื่อตอนต่อไปมีจริง
5. **โฆษณา 30–60 s:** Freytag 5 ส่วนแบบย่อ; แบรนด์โผล่ชัดหลัง climax, ไม่ขัดจังหวะ transportation

---

## 5. Anti-patterns
- อ้าง "22 เท่า", "oxytocin", "สมองคนชอบเรื่องเล่าจึงซื้อ" — myth/neuro-lore
- ใช้ Hero's Journey 17 ขั้นกับคลิป 30 s (โครงใหญ่เกินเนื้อ)
- จบแบบค้าง (ไม่มี resolution) โดยไม่มีตอนต่อ → คะแนน "เป็นเรื่อง" ตกหนัก `[BrewerLichtenstein1981]`
- hook ที่สัญญาเรื่องหนึ่งแต่เล่าอีกเรื่อง (ดู M14 SCRIPT_CHECKER)
- ใช้เรื่องเล่าดราม่าปลอมเป็น "ลูกค้าจริง" — ผิดจริยธรรม/กฎโฆษณา
- ปล่อยให้ข้อเท็จจริงทางสุขภาพ "อนุมานเอง" ด้วย show-don't-tell
- ยัดทุกเนื้อหาเป็นเรื่อง (Mar เตือน) — ตารางราคา/ข้อมูลโปรควรตรง ๆ

---

## 6. Open questions / research next
- งานวิจัยโครงเรื่องในวิดีโอสั้นแนวตั้ง (TikTok/Reels) ที่วัด retention จริง — ยังไม่พบ
- ผู้ชมไทย/เอเชียตะวันออกเฉียงใต้กับ kishōtenketsu vs three-act — ไม่มีข้อมูล
- อ่านฉบับเต็ม Braddock & Dillard (fiction moderator) และ Dahlstrom 2014 เมื่อเข้าถึงได้ (van Laer 2014 อ่านแล้ว 2026-11-25)
- Hoeken/Hinyard & Kreuter: narrative ใน health communication แบบละเอียด
- ทดสอบเองแบบ A/B: เวอร์ชันเรื่องเล่า vs เวอร์ชันตรง ๆ ของคลิปเดียวกัน (วัด 3-s hold, completion, saves)
