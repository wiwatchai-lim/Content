# Carousel

งาน carousel (หลายสไลด์ปัดได้) แยกจากโพสต์เดี่ยว (`posts/`), kit แว่น (`kits/`) และคลิป

> **หมายเหตุ (2026-11-26):** style ทั้งหมดอยู่ใน `styles/` (มีมากกว่า 1 แบบ) · story carousel ชุด 1–160 (`kits/2026-11-16_*` เป็นต้นไป) เป็น **1:1 ภาษาไทย ไม่มีโลโก้**
> (ข้อยกเว้นจาก English-only) และทำ Reel 9:16 จากชุดนั้น — ขั้นตอนจริงอยู่ใน `stories/` (gen.sh → sheet.py → finish.py → render → reel.sh)
> ก่อนทำชุดใหม่: `python creative-intelligence/tools/memory.py brief --job "story carousel" --tags carousel,story-carousel,charcoal` · ก่อนส่ง: skill `creative-critic`

```
carousel/
  styles/<ชื่อลายเส้น>/    ref*.jpg (ดูลายเส้นเท่านั้น) + style.md (กติกา + prompt พื้นฐาน)
  kits/_template/          โครง kit เปล่า คัดลอกไปใช้ทุกครั้ง
  kits/YYYY-MM-DD_<เรื่อง>/
    kit.md                 เรื่อง, ลายเส้น, ขนาด, แผนสไลด์, prompt Codex ทีละสไลด์
    photos/                รูปกรอบแว่นจริง/cutout ที่ต้องแนบให้ Codex (-i)
    characters/            character sheet ตัวละครหลัก (ทำก่อน ใช้แนบทุกสไลด์ให้หน้าเหมือนกัน)
    slides/                ภาพจาก Codex ของแต่ละสไลด์ (ไม่มีตัวอักษร) slide-01.png ...
    export/                ภาพสำเร็จ 01.png, 02.png ... พร้อมโพสต์ + caption.md
```

## ลายเส้นที่มี
| โฟลเดอร์ | แบบ |
|---|---|
| `styles/anime-lineart` | การ์ตูนญี่ปุ่นยุค 2000 เส้นดำหนา cel shading สีสด มุมกล้องแรง ฟ้าเมฆขาว |

## ขั้นตอน
1. คัดลอก `kits/_template` เป็น `kits/YYYY-MM-DD_<เรื่อง>` แล้วกรอก `kit.md`
2. ถามผู้ใช้: เรื่อง/ข้อความ, จำนวนสไลด์, ขนาด (แนะนำ 1080×1350), แว่นรุ่นไหน
3. เขียน prompt ทีละสไลด์จาก `style.md` ของลายเส้นนั้น — ทุกครั้งที่จะรัน `codex exec` ต้องถามผู้ใช้ก่อน (ใช้โควตา)
4. ตัวอักษรใส่ใน HTML ทับภาพ (อังกฤษล้วน) แล้ว render ออก `export/`
