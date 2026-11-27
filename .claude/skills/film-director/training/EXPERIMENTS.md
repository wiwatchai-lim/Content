# Experiments — ผลทดลองจริง

## EXP-001 (2026-11-27) — TC-FD02-A: ฉากเดียว 3 มุมกล้อง (FLUX schnell, seed 7, 768x1024, ฟรี)
ไฟล์: `exp-001/eye.png`, `low.png`, `high.png`, `contact.jpg` (ซ้าย→ขวา: eye / low / high)
Prompt เหมือนกันทุกตัว ต่างแค่คำมุมกล้องข้างหน้า: "...optician ... holding a pair of eyeglasses toward the viewer ...
soft window light from the left, 50mm lens, shallow depth of field, photorealistic, no text"

| ตัวแปร | ผล | สรุป |
|---|---|---|
| eye-level | ได้ระดับตา แต่มุมกว้างผิดเลนส์ (มือใหญ่ ผนังโค้ง) | คำมุมได้ผล, คำ "50mm" ไม่ได้ผล |
| low angle | ได้จริง — เห็นเพดาน/ไฟ, ตัวละครดูใหญ่ขึ้น | ทำตามได้ |
| high angle | **ไม่ได้** — กล้องยังเกือบระดับตา ไม่เห็นพื้น ไม่มองลง | FLUX ดึงกลับระดับตา (ตรงกับ `cam.eye_level` mistakes: AI drift) |
| ความต่อเนื่อง (seed เดียว) | หน้า/เสื้อ/ร้านใกล้กันมาก | seed คงที่ช่วย identity ระหว่างช็อตได้บางส่วน |
| prop | ภาพ low: ใส่แว่นด้วย + ถือแว่นอีกอัน, มีแหวนโผล่ | prop ซ้ำ = continuity error ที่ต้องเช็คทุกภาพ |

บทเรียน (ใช้ทันที):
1. FLUX: high angle ต้องบรรยายผลที่เห็น ไม่ใช่ชื่อมุม — เช่น "seen from above, the floor visible behind him, top of his head
   visible, he looks up at the camera" (ยังไม่ทดสอบ → EXP ถัดไป) หรือทำมุมใน 2.5D/HTML แทน
2. "holding X toward the viewer" ทำให้เกิด foreshortening แบบเลนส์กว้างเสมอ แม้เขียน 50mm — ถ้าต้องการหน้าคนเป็นหลัก ให้ถือแว่นระดับอก
3. ตรวจ prop ซ้ำทุกภาพ (แว่นบนหน้า + ในมือ) ก่อนส่ง
4. ยังไม่ได้ทดสอบความรู้สึกคนดู — ต้องให้ผู้ใช้เลือก "ภาพไหนน่าเชื่อที่สุด" ก่อนจึงสรุปผลด้านอารมณ์ได้

สถานะ: เทคนิค = ทดสอบแล้ว (FLUX), ผลต่อคนดู = รอผู้ใช้
