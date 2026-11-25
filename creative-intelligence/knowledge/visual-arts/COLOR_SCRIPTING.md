# Colour Scripting — วางสีทั้งเรื่องก่อนวาดทีละภาพ (M09 · M18)

> Batch VA1 · tag `color` · 2026-11-25 · ภาษาไทย + ศัพท์อังกฤษ · ป้าย EVIDENCE / CRAFT / DERIVED / HYPOTHESIS ตาม `ADVANCED_COLOR_SCIENCE.md` §0
> ของเดิมที่ไม่ทำซ้ำ: `story-clips/_craft/GUIDE.md` §6 (colour script ของ EP01 ตัวอย่าง, warm=safe / cool=fear), curriculum บทที่ 4 (นิยามสั้น + แบบฝึก 5 ช่อง),
> บทที่ 11 (correction → grading, scopes, LUT, looks) · แหล่งเดิมใน registry: Blender Studio "Color scripting" (`web:studio.blender.org:85`)

## 0. สถานะหลักฐาน — อ่านก่อน
Colour script เป็น **CRAFT** ของสตูดิโอแอนิเมชัน (tier C–D) — ไม่พบงานวิจัยเชิงทดลองที่วัดว่า colour script ทำให้ผู้ชมเข้าใจ/จำ/รู้สึกมากขึ้น ·
สิ่งที่มีหลักฐานรองรับคือ *ชิ้นส่วน* ที่ colour script ใช้: successive contrast และ adaptation (สีฉากก่อนหน้าเปลี่ยนการรับรู้ฉากถัดไป) [Zaidi2012, WitzelGegenfurtner2018],
memory colour [WitzelGegenfurtner2018], มิติ warm–cool/heavy–light/active–passive ของ colour-emotion association [Ou2004, Jonauskaite2020] — ดู `COLOR_RELATIVITY.md`
ดังนั้นกฎในไฟล์นี้ส่วนใหญ่เป็น **CRAFT** หรือ **DERIVED**

---

## 1. นิยามและที่มา (sourced เท่านั้น)

| ฟิลด์ | เนื้อหา |
|---|---|
| นิยาม | ภาพย่อเรียงทั้งเรื่อง "หนึ่งเฟรมที่ระบายต่อฉาก" ให้เห็นว่าแต่ละช่วงของเรื่องจะถูกจัดแสง สี และ value อย่างไร และฉากสัมพันธ์กันอย่างไร [PixarInABox_ColorScripts — search_summary ของคำอธิบายบทเรียน] |
| ที่มา (Pixar) | Ralph Eggleston ทำครั้งแรกสำหรับ *Toy Story*: ไล่ทั้งบท ทำภาพสีพาสเทลเล็ก ๆ ต่อฉาก เน้น "basic color"; จากนั้นทุกเรื่องของ Pixar มี colour script (วันที่ต่างกันตามแหล่ง: 1993 vs ป้ายนิทรรศการ MoMA 1995) [Amidi2011 — publisher/review summaries] |
| เอกสารรวม | *The Art of Pixar: The Complete Color Scripts and Select Art from 25 Years of Animation* (Amidi, Chronicle 2011, คำนำ John Lasseter); ฉบับปรับปรุง 2020 มีคำนำโดย Eggleston และบทนำโดย Sharon Calahan, Harley Jessup [Amidi2011 bibliographic] |
| สอนแบบเปิด | Pixar in a Box (Khan Academy) มีบท "color scripts" (~7 นาที), "The Art of Lighting", และ "Learning Color Science from a Pixar Color Scientist" [PixarInABox_ColorScripts — search_summary; เปิดหน้า Khan Academy ไม่ได้ใน session นี้] |
| ฝั่งภาพยนตร์คนแสดง | Bellantoni เสนอว่าสีในหนังกำหนดปฏิกิริยาผู้ชมเป็นกลุ่มสี (ชื่อหนังสือ *If It's Purple, Someone's Gonna Die*) [Bellantoni2005 — bibliographic, CRAFT; ไม่ได้อ่านเนื้อหา — ห้ามอ้างข้อสรุปเฉพาะ] |
| Grading = colour script ในขั้นหลังถ่าย | *O Brother, Where Art Thou?* — เปลี่ยนความสัมพันธ์สีทั้งเรื่อง (เขียวใบไม้ → น้ำตาล/เหลืองแห้ง) ให้เป็น "old, hand-tinted postcards" [Deakins2000_ASC] |

---

## 2. Colour script ทำงานอย่างไร (กลไก)

1. **สีเปลี่ยน = เรื่องเปลี่ยน** (CRAFT): ผู้ชมไม่ได้จำ hex แต่จำ *การเปลี่ยน* — ช่วงที่ palette คงที่ = ช่วงเรื่องคงที่; จุดเปลี่ยน palette = turning point
   (GUIDE.md §6: "The palette change *is* the story arc")
2. **Value ก่อน hue** (CRAFT + DERIVED): colour script ของ Pixar ถูกบรรยายว่าวาง "overall color and value structure" ต่อ beat [PixarInABox_ColorScripts] —
   และ luminance คือช่องที่รับภาระเงา/รูปทรง [WitzelGegenfurtner2018] → ถ้าดู strip เป็นขาวดำแล้วไม่เห็นจังหวะ เรื่องจะแบน
3. **ความต่างสัมพัทธ์ระหว่างฉาก** (DERIVED จาก successive contrast/adaptation): ฉากอุ่น "อุ่นที่สุด" เมื่ออยู่หลังฉากเย็นยาว → ไม่ต้องดันทุกฉากจนสุด
4. **Motif colour** (CRAFT): สีหนึ่งผูกกับตัวละคร/วัตถุ/ความหมาย แล้ววนกลับ (เช่น peach ของแบรนด์ปรากฏทุกครั้งที่ "แว่นช่วยได้")
   — ความหมายของสีถูกตีความ *เทียบกับสีอื่นในชุด* [Schloss2024] จึงต้องกันไม่ให้สี motif ไปโผล่ในบทบาทอื่น
5. **Protect memory colours** (EVIDENCE→DERIVED): ผิว/ฟ้า/ใบไม้ เป็นตัวอ้างอิงที่ผู้ชมใช้ตัดสินความ "ผิด" ของภาพ [WitzelGegenfurtner2018] → shift ทั้งฉากได้ แต่ผิวต้องอยู่ในช่วงที่รับได้

---

## 3. องค์ประกอบของ colour script หนึ่งแผ่น (template ของเรา)

| แถว | สิ่งที่ใส่ | ตัวอย่าง (story clip ร้านแว่นตีสอง) |
|---|---|---|
| Beat | ชื่อ beat 2–4 คำ | "ร้านปิด เงียบ" |
| Thumbnail | ภาพเล็กมาก (เฟรมจริงหรือ blob สี) | ฟ้าเข้มเกือบดำ + โคมเหลืองจุดเดียว |
| Key / value | high / mid / low + notan | low key, notan ~80/15/5 |
| Light relationship | id จาก `color_relationships.json` | `crel.practical_warm_pool_in_cool_dark` |
| Dominant hue / temp | h (OKLCH) + warm/cool | h≈255 cool, accent h≈80 warm |
| Chroma level | C เฉลี่ยโดยประมาณ | 0.03 (หม่น) |
| Emotion target | คำเดียว (association, ไม่ใช่ claim) | เหงา/ลึกลับ |
| Change from previous | ↑/↓ ใน L, C, temp | first beat |

กฎทำงาน: อ่านทั้งแถว "Change" ก่อน — ถ้ามีมากกว่า ~1 จุดใหญ่ต่อ 15 วินาที หรือทุก beat ↑↓ สลับกัน สียิ่งดูวุ่น (**CRAFT**)

---

## 4. ใช้กับงานของเรา (แต่ละรูปแบบ)

### 4.1 Story carousel IG 1:1 (Mint & Tao ถ่าน/ดินสอ, 5–10 สไลด์)
- งานถ่านแทบไม่มี hue → colour script = **value script + accent 1 สี** (CRAFT): สไลด์ปัญหา = mid-low key, สไลด์คลี่คลาย = high key, accent สีเดียวโผล่เฉพาะสไลด์ turning point
- การปัดดูทีละสไลด์คือ "successive viewing" — สไลด์ที่สว่างจัดหลังสไลด์มืดจะรู้สึกโล่ง (DERIVED, `crel.successive_relief_after_dark`)
- ตรวจ: ต่อทุกสไลด์เป็น strip แนวนอนย่อ 10% แล้วดูเป็นขาวดำ

### 4.2 Story clips 16:9 / 9:16 (night-optic, eyesight series)
- ทำ colour script **ก่อน** เขียน rig (GUIDE.md สั่ง shot list first) — ใส่ id ความสัมพันธ์แสงต่อฉาก
- ใช้ global tint ทั้งฉาก (รวมผิว puppet) เมื่อต้องการบอก "แสงเปลี่ยน/เวลาเปลี่ยน" และ tint เฉพาะวัตถุเมื่อต้องการบอก "วัตถุนี้พิเศษ" [LaferSousa2015 → DERIVED]
- ช็อตเปลี่ยนฉาก: ใช้ successive contrast — ฉากปลอดภัยหลังฉากเย็นไม่ต้องเกรดอุ่นจัด

### 4.3 Beat clips / promo (15–60 วินาที, แว่นเป็นพระเอก)
- palette ของคลิปผูกกับ **วัสดุกรอบ**: acetate สด → ฉากหลัง muted คงที่ทั้งคลิป (ให้กรอบเป็นสีที่เคลื่อนไหวเดียว); โลหะ/ใส → ฉากหลังเปลี่ยน temp ได้เพื่อสร้างจังหวะ และสะท้อนในเลนส์/โลหะ
- house rule: พื้นหลังต้องสงบพอให้แว่นเด่น (CLAUDE.md) = saturation hierarchy (`crel.chroma_reserved_for_focal`)
- จุด CTA/ราคา = จุด value contrast สูงสุดของคลิป

### 4.4 ภาพโปรโมท 3 ฉาก (Codex/FLUX)
- 3 ภาพในชุดเดียว = colour script ขนาดเล็ก: ให้ 2 ภาพใช้ความสัมพันธ์แสงเดียวกัน 1 ภาพเปลี่ยน (เช่น กลางวัน–กลางวัน–golden hour) เพื่อให้ feed มีทั้ง unity และจังหวะ (CRAFT)
- ใส่ความสัมพันธ์ใน prompt เป็นภาษาแสง ("warm low sun from left, cool sky-blue shadows, warm bounce from sand") แทนการระบุ hex — ภาพ AI ตอบสนองคำบรรยายแสงได้ดีกว่า (HYPOTHESIS — ยังไม่ทดสอบ)

---

## 5. Grading ตาม colour script (ไม่ซ้ำบท 11)
1. **Correction ให้เป็นกลางก่อน** (บท 11) — โดยเฉพาะภาพ AI ที่แต่ละช็อต WB ไม่เท่ากัน
2. **Shift ความสัมพันธ์ ไม่ใช่ทาสีทับ**: แบบ Deakins — เลือกช่วง hue ที่เป็นปัญหา (เขียว) แล้วย้ายไปตำแหน่งที่เรื่องต้องการ, แตะส่วนอื่นน้อยที่สุด, เพราะยิ่งแต่งยิ่งเกิด noise/artifact [Deakins2000_ASC]
3. **ปกป้องผิวและสีสินค้า**: qualifier กันผิว; สีกรอบแว่นต้องใกล้ของจริง (ถ้าเกรดทั้งฉากอุ่น ให้มีช็อตกลางอย่างน้อยหนึ่งช็อตที่สีกรอบถูก) — **DERIVED** (memory colour + ความซื่อตรงต่อสินค้า)
4. **ดูต่อเนื่อง** ไม่ใช่ทีละเฟรม (successive contrast)
5. **Scene-referred thinking**: compose/blend ใน linear light ก่อน แล้วค่อย look แล้วค่อยแปลงเป็น Rec.709/sRGB [ACES_Docs → DERIVED]

---

## 6. ตรวจ colour script จากคลิปจริงด้วยเครื่องมือที่มี (ยังไม่ได้รัน — วิธีที่เสนอ)

```bash
# 1) ดึง 1 เฟรม/วินาที แล้วต่อเป็นแถบ (ffmpeg มีใน PATH ตาม setup)
mkdir -p tmp/cs && ffmpeg -i clip.mp4 -vf fps=1 tmp/cs/f_%03d.png
ffmpeg -i tmp/cs/f_%03d.png -vf "scale=96:-1,tile=30x1" -frames:v 1 tmp/cs/strip.png
# 2) วัดทุกเฟรม แล้วพิมพ์ mean L, mean chroma, hue ของสีเด่นที่มีสี
python .claude/skills/ai-visual-artist/tools/analyze_image.py tmp/cs/f_*.png > tmp/cs/all.json
python -c "import json;R=json.load(open('tmp/cs/all.json',encoding='utf-8'));R=R if isinstance(R,list) else [R];[print(r['file'][-9:],r['value']['mean_L'],r['color']['mean_chroma'],next((d['oklch'][2] for d in r['color']['dominant'] if d['oklch'][1]>0.04),'-')) for r in R]"
```
อ่านผล: เส้น mean_L ต้องมีจังหวะตาม beat; mean_chroma ควรขึ้นสูงสุดที่ climax/CTA; hue ของสีเด่นควรเปลี่ยนเฉพาะที่ colour script สั่ง ·
ข้อจำกัด: k-means นับตามพื้นที่, เฟรมที่มีตัวอักษรขาวใหญ่จะดึง L ขึ้น

---

## 7. Topic card (ฟิลด์ตาม brief)
| ฟิลด์ | เนื้อหา |
|---|---|
| Definition | §1 |
| Foundation | CRAFT (สตูดิโอ) + องค์ประกอบ EVIDENCE (successive contrast, adaptation, memory colour) |
| Practical | ทำ strip ก่อนผลิต; หนึ่งช่องต่อ beat; value ก่อน hue |
| Visual example | EP night-optic: คลองกลางคืนฟ้า+โคมอำพัน → ในร้านอำพันมืด → โต๊ะทำงานโคมอุ่น/เงาเขียว → รุ่งเช้าฟ้าเย็น+พีช → สมุดบัญชีซีเปียอุ่น → เช้าสว่าง (จาก GUIDE.md) |
| Correct use | การเปลี่ยน palette ตรงกับ turning point; motif colour มีความหมายเดียว |
| Incorrect use | ทุกฉาก saturation สูงเท่ากัน; motif colour โผล่มั่ว; เกรดทีละช็อตไม่ดูต่อเนื่อง |
| Exceptions | คลิป 6–10 วินาทีที่มี beat เดียว — ไม่ต้องเปลี่ยน palette, ใช้ความต่าง value ภายในเฟรมพอ |
| Emotional use | association warm/cool, heavy/light (ไม่ใช่ causal) [Ou2004, Jonauskaite2020] |
| Technical use | §6 วัด; §5 เกรด |
| Common mistakes | ระบุ hex แทนความสัมพันธ์; ลืมผิว/สีสินค้า; ใช้ teal-orange ทุกเรื่อง |
| Source keys | PixarInABox_ColorScripts, Amidi2011, Bellantoni2005, Deakins2000_ASC, ACES_Docs, WitzelGegenfurtner2018, Zaidi2012, Schloss2024, LaferSousa2015, web:studio.blender.org:85 |
| Tier / confidence | C–D (craft) + A (กลไก) · medium สำหรับกลไก, low–medium สำหรับผลต่อผู้ชม |

## 8. Open questions
- อ่านบทเรียน Pixar in a Box จริง (เปิดไม่ได้ในรอบนี้) และหาคำให้สัมภาษณ์ Eggleston/Calahan ที่เข้าถึงได้ (MoMA transcript ตอบ 403)
- ทดลอง: คลิปเดียวกันสองเวอร์ชัน (มี/ไม่มี colour script) ให้ทีมเล่าเรื่องย้อน — วัดว่าจำ beat ได้มากขึ้นไหม
- หา Bellantoni ฉบับเต็มก่อนอ้างกฎเฉพาะของสีใด ๆ
