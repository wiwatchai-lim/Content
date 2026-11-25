# Continuity System — ไฟล์ continuity ต่อซีรีส์ + ขั้นตอนเช็กก่อนทำตอนใหม่

ใช้ได้กับทุกซีรีส์ ทุกลูกค้า (คลิปเรื่อง, carousel, แคมเปญโฆษณาหลายชิ้น, mascot แบรนด์).
เหตุผลเบื้องหลังอยู่ใน `README.md` (M38) และ `../world-building/README.md` (M16). Schema จริง: `continuity.schema.json`.

## 0. หลักคิด 5 ข้อ (สรุปจากหลักฐาน)
1. **ไฟล์เดียวเป็น source of truth** ต่อซีรีส์ — ไม่ใช่ความจำในแชต (production bible / "walking bible", Macdonald2018; Holocron, Chee2012)
2. **จัดลำดับความสำคัญตามสิ่งที่คนดูติดตามจริง:** ตัวตน (identity markers), นิสัย, ความรู้ของตัวละคร, ไทม์ไลน์, กฎของโลก, hero prop
   ก่อนรายละเอียดฉากหลัง (situation model 5 มิติ, ZwaanRadvansky1998; change blindness, SimonsLevin1997)
3. **แยก canon กับ planned** — สิ่งที่ออกอากาศแล้วแก้ไม่ได้ สิ่งที่อยู่ในแผนเปลี่ยนได้ (Macdonald2018: "which version?")
4. **ทุก fact มี "ตั้งขึ้นใน EP ไหน"** — เพื่อเช็กว่ากฎถูกปูไว้ก่อนใช้แก้ปม (Sanderson2007, tier D) และตัวละครไม่รู้อะไรเร็วเกิน
5. **AI: เก็บสูตรภาพครบชุด** (tool, model, seed, sampler, steps, size, prompt, reference) — seed อย่างเดียวทำซ้ำไม่ได้ (DiffusersReproDocs)
   ตัวคุมตัวละครจริง = master reference + identity markers เป็นคำ + ตรวจด้วยตา (OpenAIImageDocs ยอมรับเองว่าตัวละครซ้ำอาจเพี้ยน)

## 1. ที่เก็บไฟล์
```
<series-folder>/continuity.json      ← ไฟล์นี้ (validate กับ creative-intelligence/knowledge/continuity/continuity.schema.json)
<series-folder>/SERIES.md            ← bible แบบอ่านง่าย (โครงจาก ../world-building/STORY_BIBLE_TEMPLATE.md)
<series-folder>/_refs/               ← master images ที่อนุมัติแล้ว (ตัวละคร / ฉาก / prop)
```
ตัวอย่างสำหรับงานปัจจุบัน: `story-clips/zombie/continuity.json`, `story-clips/eyesight/continuity.json`,
`story-clips/night-optic/continuity.json`, `slowly-growing/continuity.json` (ยังไม่ได้สร้าง — เป็นข้อเสนอ)

## 2. โครง schema (สรุป)
| ส่วน | ใช้ทำอะไร | field สำคัญ |
|---|---|---|
| `series` | ข้อมูลซีรีส์ | `id` (prefix ของทุก entity), `kind`: serial / anthology / episodic / campaign |
| `canon_through` | ตอนล่าสุดที่ออกจริง | ใช้ตัดสินว่า fact ไหนแก้ได้ |
| `characters[]` | ตัวละคร | `identity_markers` (3–6 อย่างที่ต้องเห็นทุกภาพ), `traits`, `never`, `screen_side`, `looks[]` (ช่วง EP + master_ref + generation), `knowledge[]` (รู้อะไรตั้งแต่ EP ไหน), `state_changes[]`, `alive` |
| `props[]` | ของ | `hero` (true = ต้องตรงเป๊ะ เช่น แว่นสินค้า), `states[]` ต่อ EP (เต็ม/แตก/หาย) |
| `places[]` | สถานที่ | `layout` (ประตูอยู่ไหน, ทิศ "ออก" บนจอ), `lighting`, `master_ref` |
| `timeline[]` | เวลาในเรื่อง | `when` ("Day 1 17:40"), `event`, `who`, `where` |
| `running_elements[]` | มุกประจำ, catchphrase, motif, format device, tease | `rule` (วิธีเล่นซ้ำ: ยกระดับ/กลับด้าน/พัก), `appearances[]`, `rest_after` |
| `rules[]` | กฎโลก, ข้อเท็จจริงวิทยาศาสตร์, format, แบรนด์ | `cost_or_limit`, `established_in`, `may_resolve_plot`, `source` |
| `open_threads[]` | ปมที่ปูไว้รอจ่าย | `setup_ep`, `payoff_ep`, `state` |
| `episodes[]` | รายการตอน | `status`, `introduces`, `changes`, `tease_next`, `check` |
| `discrepancies[]` | error ที่ออกไปแล้ว + การตัดสินใจ | `decision`: fix_reupload / retcon / explain_in_story / ignore |
| `spelling[]` | ชื่อไทย/อังกฤษ/วิธีอ่าน TTS | กันชื่อสะกดไม่ตรงกันข้ามตอน |

**ID ต้องมี namespace ซีรีส์** (`zombie.chan`, `nightoptic.chan`) — ในโปรเจกต์นี้มี "ลุงชาญ" สองคนในสองซีรีส์

## 3. ตัวอย่าง (ตัดย่อจากซีรีส์ zombie — ข้อมูลจาก `story-clips/zombie/SERIES.md`)
```json
{
 "series": {"id": "zombie", "title": {"th": "กรุงเทพฯ ไม่มีพรุ่งนี้"}, "format": "9:16 clip ~90 s", "language": "th", "kind": "serial", "bible": "story-clips/zombie/SERIES.md", "branding": "none - no eyewear or shop content"},
 "version": 1,
 "updated": "2026-11-25",
 "canon_through": "Z10",
 "characters": [
  {"id": "zombie.mew", "names": {"th": "มิว", "en": "Mew"}, "role": "girl, immune", "age": 10,
   "traits": ["found alone in Z02"], "identity_markers": ["10-year-old girl", "always with brown dog Khao Tang"],
   "knowledge": [{"fact": "she is immune", "since": "Z04"}],
   "state_changes": [{"ep": "Z04", "change": "bitten, does not turn", "status": "canon"}], "first_ep": "Z02", "alive": true},
  {"id": "zombie.chan", "names": {"th": "ลุงชาญ", "en": "Lung Chan"}, "role": "mall guard, Krabong master", "age": 61,
   "identity_markers": ["security guard uniform", "Krabong staff"],
   "state_changes": [{"ep": "Z08", "change": "dies ringing the temple bell", "status": "canon"}], "first_ep": "Z05", "alive": false}
 ],
 "rules": [
  {"id": "zombie.bite", "type": "world", "statement": "a bite turns a person in 1-3 min", "cost_or_limit": "except Mew", "established_in": "Z01", "may_resolve_plot": true, "status": "canon"},
  {"id": "zombie.night", "type": "world", "statement": "runners sprint at night; walkers slow by day, hunt by sound", "established_in": "Z02", "status": "canon"}
 ],
 "timeline": [
  {"ep": "Z01", "when": "Day 1 17:40", "event": "outbreak at Victory Monument", "who": ["zombie.tae", "zombie.fon"], "where": "Victory Monument"},
  {"ep": "Z05", "when": "Day 2", "event": "radio: navy ship leaves at dawn of Day 3", "where": "mall car park"}
 ],
 "open_threads": [
  {"id": "zombie.s2tease", "setup_ep": "Z10", "description": "Tae's eyes open after Mew's blood", "state": "open"}
 ],
 "episodes": [
  {"ep": "Z08", "title": {"th": "ระฆังวัด"}, "status": "rendered", "folder": "story-clips/zombie/Z08_temple-bell", "changes": ["zombie.chan dies"], "tease_next": "bell stops"}
 ]
}
```
(ใน `rules[].established_in` และ `timeline[].when` ของ Z02/Z05 เป็นตัวอย่างการกรอก — ให้ยืนยันกับบทจริงก่อนใช้)

### ตัวอย่างสั้นสำหรับซีรีส์ประเภทอื่น
- **Anthology (eyesight):** characters แทบว่าง; ส่วนหลักคือ `running_elements` (clock chip มุมซ้ายบน, การ์ดครีมขอบทอง, end card tease ตอนถัดไป) และ `rules[type=fact]` พร้อม `source` (เช่น dark adaptation ~20 นาที) เพื่อไม่ให้ข้อมูลวิทยาศาสตร์ขัดกันข้ามตอน
- **Carousel คู่ตัวละคร (Slowly Growing):** `characters` 2 ตัวที่ `identity_markers` เป็นเสื้อผ้า/silhouette (ไม่มีหน้า), `screen_side` คงที่, `rules[type=format]` (ดินสอบนกระดาษครีม, เว้นบน 1/3 สำหรับข้อความ, ไม่มีโลโก้), `episodes` 140+ เรื่อง พร้อม `introduces` ถ้ามีตัวละครรอง
- **แคมเปญแบรนด์/สินค้า:** `props[hero=true]` คือสินค้า (รุ่น สี โลโก้ต้องตรงทุกชิ้น), `rules[type=brand]` (โลโก้มุมไหน, ภาษา, ราคา/โปรต้องถามทุกครั้ง), `running_elements[type=format_device]` (wordmark เคลื่อนไหว)

## 4. ขั้นตอนเช็กก่อนทำตอนใหม่ (Pre-episode continuity check)
ทำทุกครั้งก่อนเขียนบท/สั่ง gen ภาพของตอนใหม่ (ใช้ประมาณ 5–10 นาที; Claude ทำได้เองโดยอ่าน `continuity.json` + บทใหม่)

**A. โหลดสถานะ**
1. Validate ไฟล์: `python -c "import json,jsonschema;jsonschema.validate(json.load(open('continuity.json',encoding='utf-8')),json.load(open('creative-intelligence/knowledge/continuity/continuity.schema.json',encoding='utf-8')))"`
2. อ่าน `canon_through`, `open_threads` ที่ `open`, `episodes[-1].tease_next` — ตอนใหม่ต้องรับ tease ที่สัญญาไว้ หรือบันทึกว่าตั้งใจทิ้ง

**B. เช็กบทกับ 5 มิติ (situation model)**
3. **เวลา:** `when` ของตอนใหม่ต่อจาก `timeline` ได้ไหม (กลางวัน/กลางคืน, วันที่, ฤดู); ถ้ากระโดดเวลา ต้องมีสัญญาณบนจอ
4. **สถานที่:** ใช้ `places[].layout` เดิม (ประตูอยู่ที่เดิม, ทิศ "ออกจากบ้าน" บนจอเดิม)
5. **เหตุ-ผล + กฎ:** ทุกครั้งที่กฎ/พลังพิเศษช่วยแก้ปม → `rules[].may_resolve_plot` ต้องเป็น true และ `established_in` มาก่อนตอนนี้; ห้ามมีกฎใหม่ที่โผล่มาเพื่อแก้ปมพอดี
6. **เป้าหมาย/นิสัย:** การกระทำของตัวละครไม่ขัด `traits` / `never`; ถ้าจะขัด ต้องเป็นจุดเปลี่ยนที่ตั้งใจและบันทึกเป็น `state_changes`
7. **ตัวละคร:** ใครตายแล้ว/หายไป (`alive`), ใครรู้อะไรแล้ว (`knowledge.since`) — ห้ามพูดถึงสิ่งที่ยังไม่รู้; ของที่ถือ/บาดแผลต่อเนื่อง (`state_changes`, `props.states`)

**C. เช็กภาพ (ก่อนและหลัง gen)**
8. เลือก `looks[]` ที่ครอบ EP นี้ → แนบ `master_ref` ทุกครั้ง; ใส่ `identity_markers` เป็นคำใน prompt
9. หลัง gen: ไล่ตรวจ identity markers ทีละข้อในทุกภาพ (ผ่าน/ไม่ผ่าน); hero prop ต้องตรงเป๊ะ; ฉากหลังเพี้ยนเล็กน้อยยอมรับได้ถ้าไม่ใกล้จุดสนใจ
10. Two-shot: `screen_side` ถูกฝั่ง (180°), eyeline/ทิศการเดินตาม `story-clips/_craft/GUIDE.md`
11. ถ้าภาพสองช็อตต่อกันเพี้ยน: แก้ด้วยการคัทกลาง action / match-action ก่อนจะ gen ใหม่ (SmithHenderson2008)
12. เก็บ `generation` (tool, model, seed, sampler, steps, size, prompt_file, references) ของภาพที่ใช้จริง

**D. เช็ก running elements & format**
13. มุก/catchphrase: ดู `appearances` + `rest_after` — ใช้ซ้ำติดกันเกินไปไหม; ถ้าใช้ ให้ "ยกระดับหรือกลับด้าน" ตาม `rule`
14. Format device ครบ (โลโก้/ไม่มีโลโก้ตามกฎ, ภาษา, ขนาด, safe zone, end card)
15. ชื่อเฉพาะสะกดตาม `spelling[]` ทั้งในซับและใน TTS

**E. หลังทำเสร็จ (อัปเดต — สำคัญที่สุด)**
16. เพิ่ม/อัปเดต `episodes[]` (status, introduces, changes, tease_next, check.issues)
17. อัปเดตทุก entity ที่เปลี่ยน (state_changes, knowledge, props.states, timeline) และ `open_threads` ที่จ่ายแล้ว → `paid_off`
18. เลื่อน `canon_through` เมื่อออกอากาศจริง, `version` +1, `updated`
19. ถ้าพบ error ในตอนที่ออกไปแล้ว → `discrepancies[]` พร้อมการตัดสินใจ (อย่าแก้เงียบ)

### ระดับความรุนแรง (ใช้ตัดสินว่าต้องแก้ไหม)
| ระดับ | ตัวอย่าง | ทำอะไร |
|---|---|---|
| critical | ตัวละครที่ตายแล้วโผล่, กฎโลกขัดกัน, ข้อเท็จจริงวิทยาศาสตร์ผิด, สินค้า/โลโก้/ราคาผิด | แก้ก่อนปล่อยเสมอ |
| major | identity marker หาย/ผิด (เสื้อผ้าเปลี่ยน, ฝั่งจอสลับ), ตัวละครรู้สิ่งที่ยังไม่รู้, ชื่อสะกดผิด | แก้ก่อนปล่อย ถ้าไม่ได้ให้บันทึกใน discrepancies |
| minor | รายละเอียดฉากหลังไกลจุดสนใจ, ของประกอบที่เรื่องไม่ได้ชี้ | ยอมรับได้ (change blindness) — แต่เช็ก pause-frame ว่าไม่สะดุดตา |

## 5. ข้อจำกัดของระบบนี้
- เป็นข้อเสนอเชิงปฏิบัติ (craft + หลักฐานการรับรู้) ไม่มีงานวิจัยที่ทดสอบ "schema" แบบนี้โดยตรง
- ระดับความรุนแรงอิงหลักฐานที่ว่าคนดูพลาดรายละเอียดไกลจุดสนใจ แต่หลักฐานเป็นการดูครั้งเดียวในแล็บ; บนโซเชียล คนดูซ้ำ/pause ได้ → ปรับเข้มขึ้นสำหรับซีรีส์ที่มีแฟนประจำ
