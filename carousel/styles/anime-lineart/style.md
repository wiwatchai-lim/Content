# anime-lineart — ลายเส้นการ์ตูนญี่ปุ่นยุค 2000 (สำหรับ carousel)

`ref*.jpg/png` เป็นภาพลิขสิทธิ์ของคนอื่น ใช้ดู "ลายเส้น" เท่านั้น ห้ามใช้ตัวละคร โลโก้ หมวกฟาง หัวกะโหลก หรือชื่อเรื่องในงานของร้าน
และห้ามใส่ชื่อเรื่อง/ชื่อตัวละคร/ชื่อคนวาดลงใน prompt — อธิบายลายเส้นด้วยคำทั่วไปตามด้านล่าง

## ลายเส้น
- เส้นขอบดำหนาไม่เท่ากัน (หนาตรงเงา/ขอบนอก บางตรงรายละเอียด) ปลายเส้นแหลมแบบปากกาจุ่มหมึก
- เส้นผมเป็นแฉกแหลม ๆ ทรงกระเซิง, รอยยับเสื้อผ้าเป็นเส้นสั้นคม
- ลงสีแบบ cel shading: สีพื้น 1 ชั้น + เงา 1 ชั้นขอบคม ไม่มีไล่สี มี highlight ขาวเล็กน้อยบนผม/ผิวมัน
- สีอิ่ม สด: แดงสด, เหลืองฟาง, น้ำเงินเข้ม, เขียว, ผิวโทนส้มอุ่น

## ตัวละคร / อารมณ์
- ตากลมโต รูม่านตาเล็ก ปากกว้างยิ้มเห็นฟันเต็มแถว, สีหน้าเกินจริง มีพลัง
- มือ/นิ้ว/เท้าใหญ่เกินจริงเมื่อยื่นเข้าหากล้อง (foreshortening แรง) — ชี้นิ้ว ชูกำปั้น ชูนิ้วโป้ง
- กลุ่มเพื่อนรวมตัว ทุกคนหันมาหากล้อง

## องค์ประกอบภาพ
- มุมกล้องแรง: ก้มมองจากล่าง (worm's-eye), วงกลมหัวชนกันมองจากด้านล่าง, คนกลางเด่นล้นขอบ
- ฉากหลังฟ้าสดเมฆขาวก้อนกลม หรือพื้นฟ้ามีวงกลมขาว (bubble pattern)
- ตัวละครแน่นเต็มเฟรม ล้นขอบได้

## ใช้กับร้านแว่น
- ตัวละครใส่แว่นของร้าน (แนบรูปกรอบจริงด้วย `-i` ตามกติกาใน `frame-kit`) กรอบต้องตรงทรงจริง วาดด้วยลายเส้นเดียวกัน
- รูปจาก Codex ไม่มีตัวอักษร ข้อความทั้งหมดใส่ใน HTML (อังกฤษล้วน)
- ตัวอักษรบนสไลด์: ตัวหนาเอียงแบบปกการ์ตูน ขอบดำหนา เงาตกแข็ง สีแดง/เหลือง/ขาว

## Prompt พื้นฐาน (ต่อท้ายเรื่องของแต่ละสไลด์)
```
Japanese shonen anime illustration in early-2000s TV anime style: bold black ink outlines with varied line weight and tapered ends, spiky hair strands, flat cel shading with one hard-edged shadow tone, small white highlights, saturated bright colours (vivid red, straw yellow, deep blue, warm skin tones). Big round expressive eyes with small pupils, wide toothy grins, exaggerated energetic poses with strong foreshortening (hands and fists reaching toward the camera). Dynamic low-angle camera, characters filling the frame. Background: bright blue sky with puffy white cartoon clouds. Original characters only, no existing anime characters, no logos, no text, no letters.
```

## Carousel
- ขนาดแนะนำ 1080×1350 ต่อสไลด์ (ต้องถามผู้ใช้ทุกครั้ง ค่าเริ่มต้นของ styles คือ 1080×1080)
- สไลด์ 1 = hook ภาพมุมแรงที่สุด, สไลด์กลาง = เนื้อหาทีละข้อ, สไลด์สุดท้าย = ร้าน/ปิดท้าย
- ใช้ตัวละครชุดเดิมทุกสไลด์ (สร้าง character sheet ก่อน แล้วแนบภาพนั้นด้วย `-i` ทุกสไลด์ ให้หน้าตาคงที่)
