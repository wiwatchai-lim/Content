# Vogue Eyewear VO5676 (3 สี)

## ข้อมูลกรอบ
- sku: Vogue 5676-W44, 5676-W656, 5676-2726 · status: ยืนยันทั้ง 3 สี
- สี (ตามแหล่งที่มา eyeons): W44 Black · W656 Dark Havana · 2726 Transparent Grey
- source: https://www.eyeons.com/products/vogue-eyewear-vo5676
- photos: มี 3 มุมครบทุกสี
  - มุมหน้า `_1` (980×490) มาจาก eyeons
  - มุมเฉียง `_2` กับด้านข้าง `_3` (1920×960) เป็นรูปทางการจาก vogue-eyewear.com (0VO5676 รหัสสีตรงกับสต็อก) บันทึกผลตรวจไว้ใน `_check/clip-2026-09-25-vogue-angles.csv`
- layers: ตัดพื้นผ่านทั้ง 3 สี ขอบครบ
  - สีดำกับฮาวาน่า ตัดพื้นแล้วโปร่งแสงนิดหน่อย แก้ให้ทึบแล้ว
  - 2726 เป็นกรอบใส เลยตั้งใจให้ยังโปร่งแสงอยู่ ใช้บนพื้นสว่างเท่านั้น
- layers `_2`/`_3` ใช้พื้นใสจากไฟล์ทางการ ตัดเงาสะท้อนบนพื้นออกแล้ว · lens masks: `layers/*_1_lens.png`, `layers/*_2_lens.png` (มุมข้างไม่ต้องมี)
- โลโก้แบรนด์: `brand/partner-logos/vogue.svg` (SVG ทางการจาก header ของ vogue-eyewear.com)

## สไตล์
- ทรง: cat-eye เหลี่ยมนุ่ม มุมบนยกขึ้น ขอบหนาที่หัวบานพับ
- ขอบ: full-rim · วัสดุ: nylon (ตาม note ของแหล่งที่มา) · ผิว: เงา
- style tags: soft/feminine, classic, bold
- เหมาะกับ (คำแนะนำ): หน้ากลมหรือหน้ารูปหัวใจ ลุคหวาน-เรียบร้อย

## เลนส์ + coating
- **Essilor Transitions GEN S**: เลนส์ปรับสีอัตโนมัติ ผู้ผลิตระบุ "fadeback in less than two minutes" มีสีให้เลือก 8 สี — https://www.essilor.com/th-th/products/transitions/transitions-gen-s/
- **Essilor Crizal Sapphire HR**: ผู้ผลิตเรียกว่า "the best anti-reflective coating overall" ทนรอยมากกว่ารุ่นก่อน "up to 70%" — https://www.essilor.com/th-th/products/crizal/crizal-sapphire-hr/
- ใช้คู่กันได้ตามกฎ: เลนส์ปรับแสงใช้โค้ทกันแสงสะท้อนทั่วไปของยี่ห้อเดียวกัน

## คลิป (beat clip อารมณ์ fashion romance pop)
- `export/clip-hf.mp4`: ไฟล์สำหรับโพสต์ มีเสียงเอฟเฟกต์ ไม่มีเพลง
- `export/clip-hf_preview-song.mp4`: มีเพลง ไว้ดูในเครื่องเท่านั้น ห้ามโพสต์
- เพลง: **"Tenfold Love"** (จาก `music/`) · 90 BPM · ในแอป TikTok ตั้งจุดเริ่มเพลงที่ **0:22.7**
  - ท่อน drop อยู่ที่วินาทีที่ 2.67 ของคลิป
- ความยาว 13.3 วินาที (20 บีท)
  - โลโก้ Vogue Eyewear อยู่มุมซ้ายบนตลอดคลิป
  - บีท 0-4 (hook): เฟรมแรกกระแทกขึ้นมาทันทีเป็นแว่นเรียง 3 สีบนพื้นชมพู พร้อมข้อความ "Three Shades" มีแฟลชกับกล้องสั่น แล้วตัดฉับตามบีท: ป้าย vogue ที่ขาแว่น → ฮาวาน่ามุมเฉียง → เทาใสด้านข้าง
  - บีท 4-8: "Pick Your Shade" โชว์มุมหน้าทีละสีทีละบีท (ดำ → ฮาวาน่า → เทาใส) แล้วเรียง 3 สีมุมเฉียงแนวทแยง
  - บีท 8-12: ซูมดูรายละเอียดบีทละจุด: ขาแว่นที่มีป้าย vogue, บานพับ, เลนส์เข้มขึ้น, เลนส์จางกลับ (Transitions)
  - บีท 12-16: สลับทั้งสีและมุมทุกบีทแบบค่อยๆ ละลาย (Crizal)
  - บีท 16-20: หน้าจบ ขึ้นโลโก้ TIMEOPTIC กับแว่นทั้ง 3 สีเรียงแถว
- ต้นฉบับคลิป: `hf/index.html` · เสียงเอฟเฟกต์: `clip-audio.json`
