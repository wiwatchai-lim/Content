# Scene Continuity Protocol (ฉากต่อเนื่องข้ามคัท — แสง เวลา ทิศ props เสียง)

หลักฐาน: `modules/23-consistency.md`; วิทยาศาสตร์การรับรู้ (change blindness, situation model, edit blindness): `creative-intelligence/knowledge/continuity/README.md`;
กฎ 180°/eyeline/screen direction: `story-clips/_craft/GUIDE.md`; schema ฉาก/places/props: `continuity.schema.json`

## 1. Scene sheet (กรอกก่อน gen ฉากใดก็ตามที่มี ≥2 ช็อต)
```json
{"scene_id": "night-optic_EP02_S03", "place": "shop interior", "layout": "counter left, door right, window back",
 "time": "night 02:00", "weather": "rain outside", "key_light": "warm lamp above counter, camera-left",
 "fill_ambient": "cool blue from window", "palette": ["#2B3A55", "#F2B66D", "#1E1E1E"],
 "axis": "shopkeeper screen-left facing right; customer screen-right facing left",
 "props": [{"id": "golden-frames", "state": "on velvet tray, open temples", "position": "counter centre"}],
 "ambience_sfx": "rain on glass, fridge hum", "master_frame": "S03_master.png"}
```
`master_frame` = ภาพ wide ของฉากที่ทุกช็อตอ้างอิง (gen ก่อน, ผู้ใช้/critic ผ่านก่อน)

## 2. ลำดับทำงาน
1. Gen master frame (wide) → ตรวจ layout/แสง/palette
2. ทุกช็อตอื่น: แนบ master frame เป็น reference (หรือ crop/img2img จาก master: FLUX `--init master.png --denoise 0.35–0.6`) แล้วเปลี่ยนแค่ขนาดช็อต/มุม
3. เขียนทิศแสงเป็นคำเดิมทุกช็อต ("warm lamp above the counter from camera-left") และ palette เดิม
4. รักษาแกน 180°: ฝั่งจอของแต่ละตัวละครตาม `axis`; ข้ามแกนเฉพาะเมื่อมีช็อตพาข้าม (กล้องเดินข้ามบนจอ / ช็อตกลางแกน) — GUIDE.md
5. Props: state + position ต่อช็อต; hero prop (สินค้า) ตรงเป๊ะ
6. AI video: ใช้ I2V จากภาพที่ผ่านแล้ว; ไม่สั่งให้แสง "เปลี่ยน" ในช็อตที่ต้องต่อกับช็อตแสงนิ่ง
7. เสียงบรรยากาศ (ambience) วางยาวต่อเนื่องใต้ทุกคัทของฉาก (ช่วยซ่อนรอยต่อภาพ — `creative-intelligence/knowledge/sound/`, FX.md)
8. เกรดสีรวมทั้งฉากในขั้นตัดต่อ (curriculum 11)

## 3. ตารางตรวจข้ามคัท (ดูจาก cut sheet)
คำสั่ง: `ffmpeg -i edit.mp4 -vf "select='gt(scene,0.3)',scale=320:-1,tile=4x3" -frames:v 1 -fps_mode vfr cuts.png`
| # | Check | ระดับถ้าผิด |
|---|---|---|
| 1 | เวลา/กลางวัน-กลางคืน ตรงกันในฉาก | critical (ถ้าเปลี่ยนความหมาย) / major |
| 2 | ทิศแสงหลัก (key side) เดิม | major |
| 3 | Screen direction / แกน 180° / eyeline | major |
| 4 | ทิศการเคลื่อนที่ต่อเนื่อง (ออกขวา → เข้าซ้าย) | major |
| 5 | Hero prop: state + ตำแหน่ง + รูปทรง | critical (สินค้า) / major |
| 6 | Layout ฉาก (ประตู หน้าต่าง เคาน์เตอร์) | major ถ้าอยู่ใกล้จุดสนใจ, minor ถ้าไกล |
| 7 | Palette/white balance ระหว่างช็อต (หลังเกรด) | minor–major |
| 8 | สภาพอากาศ/ควัน/ฝน ต่อเนื่อง | minor–major |
| 9 | Ambience เสียงไม่ขาดตอนคัท (ฟัง) | minor |
| 10 | รายละเอียดฉากหลังไกลจุดสนใจ | minor — ยอมรับได้ (change blindness), ตรวจแค่ pause-frame ไม่สะดุดตา |

## 4. แก้เมื่อไม่ต่อ (ถูก → แพง)
1. เปลี่ยนจุดคัทให้อยู่กลาง action (match on action ซ่อนการเปลี่ยน — continuity README §3)
2. เกรดสี/WB ให้เข้ากัน
3. Crop/punch-in ตัดส่วนที่ผิดออก
4. ใส่ cutaway/insert ระหว่างสองช็อต
5. Gen ใหม่จาก master frame
6. บันทึกใน `discrepancies[]` ถ้าออกอากาศไปแล้ว (อย่าแก้เงียบ)

## 5. ข้ามตอน
`places[].layout` เดิมทุกตอน (ประตูอยู่ที่เดิม, ทิศ "ออกจากบ้าน" บนจอเดิม) — CONTINUITY_SYSTEM §4 B4
