# COACH HC5206D

## ข้อมูลกรอบ
- SKU: COACH HC5206D · สถานะรูป: `ยืนยัน` (รุ่นตรง) แต่สต็อกไม่มีรหัสสี รุ่นนี้มี 5 สี (9001/9005/9407/9407SB/9410) รูปเป็นสี Shiny Silver 9001 — **อย่าระบุสีในโพสต์** จนกว่าจะเช็กสีของจริงในร้าน
- ที่มารูป: https://www.eyeons.com/products/coach-hc5206d
- รูป (`photos/`):
  - `HC5206D_1.jpg` 2000×1000 — พับขา วางหน้าตรง (มุมมองจากด้านบนเล็กน้อย)
  - `HC5206D_2.jpg` 2000×1000 — กางขา หน้าตรง (ไม่ใช่มุมเอียง รุ่นนี้ไม่มีรูปมุมเอียงจริง)
- Layer ตัดพื้น (`layers/`): `HC5206D_1.png` · `HC5206D_2.png` — **ใช้ได้แค่บนพื้นสีอ่อน**
  - กรอบนี้เป็นแบบไร้ขอบ (เลนส์ใส) + โลหะสีเงินเงา ซึ่งใกล้กับพื้นขาวของรูปมาก ตัดพื้นแล้วส่วนเงินกับขอบเลนส์จะจางลง พอวางบนพื้นเข้ม ขาและสะพานจมูกจะเป็นเทาหม่น ขอบเลนส์แทบหาย (ดู `export/preview.png` แถวพื้นเทา)
  - วางบนพื้นขาว ครีม หรือเทาอ่อน = ใช้ได้ · อยากได้พื้นเข้ม = ใช้รูปใน `photos/` แล้วให้ Codex ทำฉากใหม่ (S1/S2) แทน
  - ตอนแนบรูปให้ Codex ให้แนบรูปจาก `photos/` จะได้รายละเอียดสีเงินกับขอบเลนส์ครบกว่า
- ตรวจ: `export/preview.png`

## สไตล์
- ทรง: สี่เหลี่ยมผืนผ้ามุมมน (rounded rectangle) เลนส์กว้าง
- กรอบ: ไร้ขอบ เจาะเลนส์ (rimless / drilled) · สะพานจมูกโลหะทรงโค้งคลื่นเล็กน้อย บล็อกบานพับโลหะสี่เหลี่ยม ขาโลหะ ปลายขา acetate ดำเงา · แป้นจมูกใส
- ในรูป: สีเงินเงา (Shiny Silver) — สต็อกอาจเป็นสีอื่น
- Style tags: minimal, luxury, business, classic
- เหมาะกับ (คำแนะนำทั่วไป): แทบทุกรูปหน้า เพราะกรอบแทบมองไม่เห็น ไม่บังโครงหน้า · คนที่อยากได้ลุคสุภาพ ดูแพงแบบเงียบ ๆ ผู้บริหาร คนทำงานที่ไม่อยากให้แว่นเด่นกว่าหน้า

## เลนส์ + coating
- **Shamir Tribrid®** — วัสดุเลนส์ไฮบริด รวมข้อดีของเลนส์ Hi-Index กับความแข็งแรงทนทานของ Trivex® ผู้ผลิตระบุว่าเป็นวัสดุ high index ที่เบาที่สุด ใส บาง เบา แข็งแรง และ **เหมาะกับกรอบเจาะ (rimless)** กรอบเอ็น และ inline — ตรงกับกรอบรุ่นนี้ที่ต้องใช้เลนส์เจาะได้
  - หมายเหตุ: มีบนเว็บ Shamir Australia แต่ยังไม่พบบนเว็บ Shamir ไทย ควรเช็กกับตัวแทนก่อนว่าสั่งได้
  - ที่มา: https://shamir.com/au/for-professionals/lenses_and_more/shamir-tribrid/
- **Shamir Glacier Plus UV™** — กันแสงสะท้อน + ป้องกัน UV ทั้งแสงตรงและแสงสะท้อนจากผิวเลนส์ด้านหลัง (index 1.53 ขึ้นไป) ลดแสงสะท้อนช่วยให้มองชัดและสบายตา ทนรอยขีดข่วน ทำความสะอาดง่าย กันน้ำ กันไฟฟ้าสถิต · เหมาะกับผู้ใส่แว่นทุกคน
  - ที่มา: https://shamir.com/for-professionals/lenses_and_more/shamir-glacier-plus-uv/
- คู่นี้ใช้ได้: ยี่ห้อเดียวกัน, Tribrid เป็นเลนส์ใส และ Glacier Plus UV ระบุ "ใช้คู่กับเลนส์ใส ... ทุกกรอบและทุกค่า index"

## Prompts

> L1 + L2 + รูปแว่นจริง = ปลอดภัยสุด เพราะแว่นในภาพคือรูปสินค้าจริง (กรอบนี้วางบนพื้นอ่อนเท่านั้น)
> L3, S1, S2 ให้ AI วาดแว่นใหม่จากรูปที่แนบ — กรอบไร้ขอบมีโอกาสเพี้ยนสูง (AI ชอบเติมขอบให้) ต้องเทียบกับ `photos/` ทุกครั้ง ถ้ามีขอบกรอบงอกขึ้นมา สะพานจมูกหรือบานพับเปลี่ยน ห้ามใช้

### L1 background
```text
Quiet luxury backdrop for a rimless eyewear photo, no people, no glasses. A soft pale ivory-to-light-grey seamless wall meeting a honed white marble surface in the lower third, a single thin sprig of dried pampas grass in a slim clear glass vase at the far left edge, slightly out of focus. Wide empty space in the centre for the product and in the upper third for a headline. Bright, even, high-key diffused daylight from above left, very gentle shadows, airy and clean. Palette of ivory, warm white, pale silver-grey — light enough that thin silver metal and clear lens edges stay visible. Square 1:1, photorealistic, shallow depth of field. No text, no logos, no watermark, no brand names.
```

### L2 model (ไม่ใส่แว่น)
```text
Head-and-shoulders portrait of a Thai woman around 40 years old, NOT wearing glasses, sleek shoulder-length black hair tucked behind one ear, minimal natural makeup, small silver stud earrings, tailored ivory silk blouse under a soft light-grey blazer. Face turned straight to the camera, calm confident expression with a slight closed-mouth smile, eyes looking into the lens, shoulders square. Soft high-key studio light, gentle fill, luminous even skin. Plain flat very light grey background in a single solid colour, no gradient, so the subject can be cut out cleanly. Square 1:1, photorealistic, sharp focus on the eyes. An original face that does not resemble any real person. No text, no logos, no watermark, no brand names.
```
(ท่าหน้าตรงให้เข้ากับ `HC5206D_2` ที่เป็นแว่นกางขาหน้าตรง)

### L3 product scene (แนบ `photos/HC5206D_1.jpg`)
```text
Use the attached glasses exactly as they are — rimless with NO frame around the lenses, same rounded-rectangle clear lens shape, same slim curved silver metal bridge, square silver hinge blocks, silver temples with black tips, clear nose pads, temples folded. Do not add rims, do not redesign, restyle, recolour or add logos. Place them folded, front facing the camera, resting on honed white marble with a soft realistic contact shadow and a faint reflection under the lenses. Bright high-key daylight from above left so the thin lens edges catch a fine highlight. Clean empty space above for a headline. Square 1:1, photorealistic, product-photography sharpness on the metal parts. No text, no logos, no watermark, no brand names.
```

### L4 light & props (optional)
```text
Isolated light effect on a transparent background: a few soft diagonal beams of warm morning sunlight with gentle dust-free glow, as if through tall window blinds from the upper left, fading toward the lower right. Nothing else in the image — no objects, no people, no glasses, no surfaces. Square 1:1. No text, no logos, no watermark.
```

### S1 on-model (แนบ `photos/HC5206D_2.jpg`)
```text
Use the attached glasses exactly as they are — rimless with NO frame around the lenses, same rounded-rectangle clear lens shape, same slim curved silver metal bridge, square silver hinge blocks, silver temples with black tips. Do not add rims, do not redesign, restyle, recolour or add logos. A Thai woman around 40 wearing these glasses, standing by a tall window in a bright minimalist office, glancing up from a tablet toward the camera with a composed, warm expression. Ivory silk blouse and light-grey blazer, sleek hair tucked behind one ear. Soft daylight from the window on the left, clear lenses with only a faint natural reflection so her eyes are fully visible, background of pale walls softly blurred. Square 1:1, photorealistic, sharp focus on the eyes and the glasses. An original face that does not resemble any real person. No text, no logos, no watermark, no brand names.
```

### S2 product hero (แนบ `photos/HC5206D_2.jpg`)
```text
Use the attached glasses exactly as they are — rimless with NO frame around the lenses, same rounded-rectangle clear lens shape, same slim curved silver metal bridge, square silver hinge blocks, silver temples with black tips, clear nose pads. Do not add rims, do not redesign, restyle, recolour or add logos. Editorial still life: the glasses open, front view, seeming to float a few centimetres above a pale grey stone slab with a soft shadow directly below, pale silver-grey gradient background. Crisp rim lighting from behind traces the thin edges of the clear lenses with fine white highlights so the rimless shape reads clearly; soft front fill on the polished silver. Minimal, weightless, premium, generous negative space. Square 1:1, photorealistic, product-photography sharpness. No text, no logos, no watermark, no brand names.
```

## วิธีใช้กับ Codex
รันจากโฟลเดอร์โปรเจกต์ (ใช้โควตา ChatGPT ทุกครั้ง) · ตัวอย่าง S2:
```
codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -o tmp/codex-last.txt "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached image as the product reference. Do not rewrite the prompt, do not generate variants. Reply with only the saved file path. PROMPT: <วาง prompt>" -i "kits/2026-09-18_hc5206d/photos/HC5206D_2.jpg"
```
- L1, L2, L4 ไม่ต้องใส่ `-i ...`
- ไฟล์ออกที่ `%USERPROFILE%\.codex\generated_images\<session>\` ก๊อปมาไว้ `kits/2026-09-18_hc5206d/gen/`
