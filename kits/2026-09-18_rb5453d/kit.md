# Ray-Ban RB5453D

## ข้อมูลกรอบ
- SKU: Ray-Ban RB5453D · สถานะรูป: `รุ่นตรง สีต่าง` (สต็อกไม่ระบุรหัสสี รูปเป็นสีดำ 2000 — **อย่าระบุสีในโพสต์**)
- ที่มารูป: https://www.eyeons.com/products/ray-ban-rb5453d
- รูป (`photos/`): `RB5453D_1.jpg` หน้าตรง 2000×1000 · `RB5453D_2.jpg` มุมเอียง 2000×1000
- Layer ตัดพื้น (`layers/`): `RB5453D_1.png` 1900×646 · `RB5453D_2.png` 1899×648 — ขอบสะอาด ไม่มีขอบขาว
  - ข้อควรรู้: ขาแว่นสีเงินจะโปร่งแสงนิดหน่อยหลังตัดพื้น (ตัดด้วยสีพื้นขาว สีเงินอ่อนเลยถูกลดความทึบ) บนพื้นเข้มจะดูเป็นเทาเข้ม ถ้าต้องการขาเงินสว่างชัดให้ใช้รูปใน `photos/`
- ตรวจ: `export/preview.png` (แต่ละมุมบนพื้นขาว เทา และลายตาราง)

## สไตล์
- ทรง: เหลี่ยมมน (rounded square) ออกแนว panto เล็กน้อย ขอบล่างโค้ง
- กรอบ: เต็มขอบ (full-rim) · หน้ากรอบ acetate ดำเงา + ขาโลหะสีเงิน ปลายขาดำ (combination) · แป้นจมูกโลหะ
- Style tags: classic, minimal, business, preppy
- เหมาะกับ (คำแนะนำทั่วไป): หน้ารูปไข่ หน้าเหลี่ยม คางชัด · ลุคทำงานออฟฟิศ สุภาพ ดูฉลาด ไม่หวือหวา

## เลนส์ + coating
- **ZEISS Digital ClearMind** — เลนส์ digital ช่วยการมองใกล้สำหรับคนยังไม่ถึงวัยโปรเกรสซีฟ มีกำลังเสริมระยะใกล้ โซนมองชัดระยะใกล้ใหญ่กว่า ZEISS Digital lenses สูงสุด 28% ใช้เทคโนโลยี ZEISS NeurOptix · เหมาะกับคนวัย 30 ถึงกลาง 40 ที่มีอาการตาล้าหรือมองเบลอตอนท้ายวัน
  - ที่มา: https://www.zeiss.com.sg/vision-care/eye-care-professionals/lenses/lens-type/digital-lenses.html
- **ZEISS DuraVision Plus BlueProtect UV** — ลดทอนแสงสีฟ้า-ม่วงช่วง 390–440 nm แบบเลือกช่วง ZEISS ระบุว่า "can help to relieve the eyestrain perceived by the patients which is typically associated with blue light exposure" · เหมาะกับคนที่อยู่ในอาคารนาน เจอแสงจาก LED จอคอม แท็บเล็ต
  - ที่มา: https://www.zeiss.com/vision-care/us/eye-care-professionals/lenses/coatings-technologies/blue-light-coating.html
- คู่นี้ใช้ได้: Digital ClearMind ระบุ "ใช้คู่กับ ZEISS DuraVision Plus" และ BlueProtect เป็นโค้ตสำหรับเลนส์ใสของ ZEISS

## Prompts

> L1 + L2 + layer แว่นจริง = ปลอดภัยสุด เพราะแว่นในภาพคือรูปสินค้าจริง
> L3, S1, S2 ให้ AI วาดแว่นใหม่จากรูปที่แนบ — ต้องเทียบกับ `photos/` ทุกครั้ง ถ้าทรง สะพานจมูก หรือขาแว่นเพี้ยน ห้ามใช้

### L1 background
```text
Minimal modern workspace backdrop for an eyewear photo, no people, no glasses. A pale warm-grey wall and the edge of a light oak desk in the lower third, a closed laptop and a single ceramic mug pushed to the far right edge, soft out of focus. Large calm empty space in the centre and upper-left for a product and a headline. Soft diffused daylight from a window on the left, gentle falloff, muted palette of warm grey, oak and off-white so a glossy black frame will stand out. Square 1:1, photorealistic, shallow depth of field. No text, no logos, no watermark, no brand names.
```

### L2 model (ไม่ใส่แว่น)
```text
Head-and-shoulders portrait of a Southeast Asian man around 32 years old, NOT wearing glasses, neat short side-parted black hair, clean-shaven, light blue oxford shirt with a navy knit tie loosened slightly. Face turned straight to the camera, relaxed confident half smile, eyes looking into the lens, shoulders square. Soft studio key light from the left, gentle fill, even skin tones. Plain flat light-grey background in a single solid colour, no gradient, so the subject can be cut out cleanly. Square 1:1, photorealistic, sharp focus on the eyes. An original face that does not resemble any real person. No text, no logos, no watermark, no brand names.
```
(อยากได้มุมเอียงให้เข้ากับ `RB5453D_2` ให้เปลี่ยน "Face turned straight to the camera" เป็น "Head turned about 30 degrees to his right, eyes still looking at the camera")

### L3 product scene (แนบ `layers/RB5453D_2.png`)
```text
Use the attached glasses exactly as they are — same shape, proportions, glossy black acetate front, silver metal temples, hinges and nose pads. Do not redesign, restyle, recolour or add logos. Place them open, three-quarter view, resting on a light oak desk beside the corner of a closed laptop, with a realistic soft contact shadow under the rims and temples. Soft window daylight from the left, a faint cool reflection on the lenses. Calm empty space above the glasses for a headline. Square 1:1, photorealistic, product-photography sharpness on the frame. No text, no logos, no watermark, no brand names.
```

### L4 light & props (optional)
```text
Isolated light effect on a transparent background: a soft rectangular glow of cool white screen light spilling from the lower right, with a faint blue-violet edge, as if from a laptop screen just out of frame. Nothing else in the image — no objects, no people, no glasses, no surfaces. Square 1:1. No text, no logos, no watermark.
```

### S1 on-model (แนบ `layers/RB5453D_1.png`)
```text
Use the attached glasses exactly as they are — same shape, proportions, glossy black acetate front, silver metal temples and nose pads. Do not redesign, restyle, recolour or add logos. A Southeast Asian man around 32 wearing these glasses, sitting at a light oak desk in a bright modern office late in the afternoon, turning from his laptop toward the camera with a relaxed, focused expression. Light blue oxford shirt, sleeves rolled once. Warm window light from the left, cool screen light on the lenses, background softly blurred. Square 1:1, photorealistic, sharp focus on the eyes and the frame. An original face that does not resemble any real person. No text, no logos, no watermark, no brand names.
```

### S2 product hero (แนบ `layers/RB5453D_2.png`)
```text
Use the attached glasses exactly as they are — same shape, proportions, glossy black acetate front, silver metal temples and hinges. Do not redesign, restyle, recolour or add logos. Editorial still life: the glasses open in three-quarter view standing on a matte warm-grey stone plinth, a single hard spotlight from upper left casting a crisp graphic shadow to the right, deep charcoal background fading to black at the edges. Highlights trace the polished acetate rim and the silver temple. Minimal, premium, lots of negative space above. Square 1:1, photorealistic, product-photography sharpness. No text, no logos, no watermark, no brand names.
```

## วิธีใช้กับ Codex
รันจากโฟลเดอร์โปรเจกต์ (ใช้โควตา ChatGPT ทุกครั้ง) · ตัวอย่าง S2:
```
codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -o tmp/codex-last.txt "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached image as the product reference. Do not rewrite the prompt, do not generate variants. Reply with only the saved file path. PROMPT: <วาง prompt>" -i "kits/2026-09-18_rb5453d/layers/RB5453D_2.png"
```
- L1, L2, L4 ไม่ต้องใส่ `-i ...`
- ไฟล์ออกที่ `%USERPROFILE%\.codex\generated_images\<session>\` ก๊อปมาไว้ `kits/2026-09-18_rb5453d/gen/`
