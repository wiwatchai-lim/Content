# Bolon BJ3205-B10

## ข้อมูลกรอบ
- SKU: Bolon BJ3205-B10 (รุ่น Vancouver) · status: ยืนยัน — สี B10 Shiny Black ตรงกับรหัสสีของ Bolon
- ที่มา: https://boloneyewear.com/products/vancouver
- photos/: `BJ3205-B10_1.jpg` หน้าตรง 3000×3000 · `BJ3205-B10_2.jpg` มุมเฉียง 3000×3000
- layers/: `BJ3205-B10_1.png`, `BJ3205-B10_2.png` ตัดพื้นผ่าน ขอบครบ ขาแว่นกับแป้นจมูกไม่แหว่ง ใช้ได้กับพื้นทุกสี
  - `_lens.png` = ชั้นเลนส์ (มาสก์ช่องเลนส์) เอาไว้ใส่เงาสะท้อนให้แว่นไม่ดูโล่ง · ในมุมเฉียง (`_2`) มาสก์เลนส์ฝั่งไกลไม่เต็มช่อง เพราะมีขาแว่นพาดผ่าน
- โลโก้ BOLON สีทองที่ขาแว่นเป็นส่วนหนึ่งของสินค้าจริง ไม่ใช่ลายน้ำ

## สไตล์
- ทรง: oval / round-oval · full-rim · acetate เงา สีดำ Shiny Black
- ดีเทล: ขาแว่นมีตัวอักษร BOLON โลหะสีทอง, สะพานจมูกตรงแบบ saddle, มีแป้นจมูกใส
- แท็ก: classic, retro, soft/feminine, minimal
- เหมาะกับ (คำแนะนำทั่วไป ไม่ใช่คำโฆษณาสินค้า): หน้าเหลี่ยม / กรามชัด ช่วยให้หน้าดูนุ่มขึ้น · ลุคเรียบหรู สไตล์ vintage สายคาเฟ่ สายทำงาน

## เลนส์ + coating
- **Shamir Relax™**: เลนส์ชั้นเดียวสำหรับคนใช้จอ ผู้ผลิตระบุว่า "เพิ่มพื้นที่ช่วยที่ผิวเลนส์ด้านล่าง เพื่อความสบายตาเวลาดูจอดิจิทัลระยะ 40–70 ซม." มีให้เลือก 3 รุ่นตามช่วงอายุ เหมาะกับคนอายุ 18–45 ปีที่ใช้จอบ่อย — https://shamir.com/th-th/lenses_and_more/shamir-relax/
- **Shamir Glacier Plus UV™**: เคลือบกันแสงสะท้อน + UV ผู้ผลิตระบุว่า "ป้องกัน UV ทั้งแสงที่ส่องเข้าตาโดยตรงและแสงสะท้อนจากผิวเลนส์ด้านหลัง" ทนรอยขีดข่วน ทำความสะอาดง่าย กันน้ำ กันไฟฟ้าสถิต — https://shamir.com/for-professionals/lenses_and_more/shamir-glacier-plus-uv/
- ทั้งคู่มีในเว็บ Shamir ไทย · Glacier Plus UV™ ใช้ได้กับเลนส์ใส (ตามบรรทัด "ใช้คู่กับ")

## คลิป (ทำแล้ว)
- **`export/clip-hf.mp4`** 1080×1920 ยาว 10 วิ ไม่มีเสียง (ใส่เพลงเองใน CapCut) ทำด้วย HyperFrames แบบ 2.5D: ฉากแบ่งเป็นหลายชั้น แต่ละชั้นขยับด้วยความเร็วต่างกัน ตัวอักษรเด้งทีละตัว เลนส์มีเงาสะท้อน
- แว่นในคลิปคือรูปจริงจาก `layers/` ไม่ได้ให้ AI วาดใหม่
- แก้ได้ที่ `hf/index.html` แล้วสั่ง `npx hyperframes render . -o ../export/clip-hf.mp4` จากในโฟลเดอร์ `hf/`
- ลองใช้ Wan ทำฉากไปแล้ว 1 ช็อต (`gen/V1.mp4`) แต่ไม่ได้ใช้ในคลิปนี้
- ถ้าอยากได้แบบคลิป Oakley ต้องทำรูป C1–C3 ใน Codex ก่อน (ครั้งนี้โควต้าเต็ม)

## Prompts
S1, S2, L3 และ C1–C3 ให้ AI วาดแว่นใหม่ ต้องเทียบผลกับ `photos/` ทุกครั้ง ถ้าทรง สะพานจมูก หรือขาแว่นเปลี่ยน ให้ทิ้งรูปนั้น เพราะโพสต์ต้องเป็นแว่นที่ร้านขายจริง ทางที่ปลอดภัยที่สุดคือเอา L1 + L2 มาวางซ้อนกับรูปตัดพื้นจริง

**L1 background**
```text
An empty warm-toned set for an eyewear still life: a cream plaster wall meeting a pale natural linen tabletop, soft afternoon sunlight falling diagonally from the upper left, blurred palm-leaf shadows across the top right of the wall, a faint peach glow in the light. Calm, quiet, vintage-cafe mood. Leave the centre of the tabletop completely clear for a pair of glasses, and keep the upper third of the wall plain for a headline. No people, no product, no objects on the table. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**L2 model**
```text
Studio portrait of a woman in her late 20s with a soft, slightly angular jaw, hair in a low loose bun with a few face-framing strands, wearing a cream knit top and small gold stud earrings, natural warm makeup. Face turned straight to the camera, eyes looking into the lens, calm gentle half-smile, shoulders relaxed. She is NOT wearing glasses. Plain flat warm beige background, even soft light, sharp focus on the face, so she can be cut out cleanly. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names, an original face that does not resemble any real person.
```

**L3 product scene** — แนบ `-i "kits/2026-09-22_bj3205-b10/layers/BJ3205-B10_2.png"`
```text
Place the attached glasses on a pale linen tabletop in front of a cream plaster wall, three-quarter view, in soft warm afternoon sunlight with blurred palm-leaf shadows on the wall, a realistic soft contact shadow under the rims and temples. Use the attached glasses exactly as they are — same oval shape, proportions, glossy black acetate, gold lettering on the temples, hinges and nose pads; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**L4 light & props** (ใช้ถ้าต้องการ)
```text
On a fully transparent background: a soft warm window-light streak with a gentle glow of a laptop screen from below and a few floating dust specks in the light — light effects only, no objects, no people. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**S1 on-model** — แนบ `-i "kits/2026-09-22_bj3205-b10/photos/BJ3205-B10_1.jpg"`
```text
A woman in her late 20s wearing the attached glasses, sitting at a wooden cafe table by a window with a laptop open, turning from the screen to look at the camera with a relaxed smile, cream knit top, hair in a low bun, warm afternoon light, softly blurred plants behind. Use the attached glasses exactly as they are — same oval shape, proportions, glossy black acetate, gold lettering on the temples, hinges and nose pads; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names, an original face that does not resemble any real person.
```

**S2 product hero** — แนบ `-i "kits/2026-09-22_bj3205-b10/photos/BJ3205-B10_2.jpg"`
```text
Editorial still life: the attached glasses resting folded-open on a stack of two cream linen-bound books on a warm beige surface, a small ceramic cup blurred in the background, low warm side light making the black acetate gleam and the gold temple details catch the light, soft long shadow. Use the attached glasses exactly as they are — same oval shape, proportions, glossy black acetate, gold lettering on the temples, hinges and nose pads; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**C1 wide** (9:16) — แนบ `-i "kits/2026-09-22_bj3205-b10/photos/BJ3205-B10_1.jpg"`
```text
Vertical 9:16 cinematic wide shot: the attached glasses standing on a pale linen tabletop in the lower middle of the frame, cream plaster wall behind, warm afternoon sun from the upper left, blurred palm-leaf shadows on the wall, lots of calm empty wall above. Use the attached glasses exactly as they are — same oval shape, proportions, glossy black acetate, gold lettering on the temples, hinges and nose pads; do not redesign, restyle or add logos. Photorealistic, no text, no logos, no watermark, no brand names.
```

**C2 macro** (9:16) — แนบ `-i "kits/2026-09-22_bj3205-b10/photos/BJ3205-B10_2.jpg" "kits/2026-09-22_bj3205-b10/gen/C1.png"`
```text
Vertical 9:16 macro detail shot from the same scene and light as the second attached image: extreme close-up of the hinge and gold temple lettering of the first attached glasses, glossy black acetate reflecting the warm sun, linen texture and leaf shadows softly out of focus. Use the attached glasses exactly as they are — same shape, proportions, colour, temples and hinges; do not redesign, restyle or add logos. Photorealistic, no text, no logos, no watermark, no brand names.
```

**C3 low hero** (9:16) — แนบ `-i "kits/2026-09-22_bj3205-b10/photos/BJ3205-B10_2.jpg" "kits/2026-09-22_bj3205-b10/gen/C1.png"`
```text
Vertical 9:16 low-angle hero shot from the same scene and light as the second attached image: camera almost at table level, the first attached glasses in three-quarter view large in the frame, sun flare behind them, the cream wall and leaf shadows blurred into warm bokeh. Use the attached glasses exactly as they are — same oval shape, proportions, glossy black acetate, gold lettering on the temples, hinges and nose pads; do not redesign, restyle or add logos. Photorealistic, no text, no logos, no watermark, no brand names.
```

**V-A** (CapCut AI / Seedance 2.5 ใส่รูปอ้างอิง C1, C2, C3 ตามลำดับ) · 9:16 · 10 วิ · ได้ไฟล์แล้วเซฟเป็น `gen/V.mp4`
```text
One continuous 10-second vertical shot, no cuts. 0–3.5 s: slow dolly-in on the wide scene (image 1), leaf shadows swaying on the cream wall. 3.5–6.5 s: the camera keeps moving and pushes into the macro of the hinge and gold temple lettering (image 2). 6.5–10 s: low arc around the glasses ending on the low hero angle (image 3), hold the last second. The glasses stay perfectly still: oval glossy black acetate frame with gold lettering on the temples, exact shape and colours unchanged. Only the light and shadows move. No text, no people.
```

**V-B** (เฟรมแรก C1 + เฟรมสุดท้าย C3)
```text
One continuous 10-second vertical shot from the first frame to the last frame, no cuts: slow dolly-in across the sunlit linen table, passing close over the gold temple lettering, then lowering into a low arc that ends on the final hero angle and holds for one second. Palm-leaf shadows drift and warm light flickers softly. The glasses stay perfectly still — oval glossy black acetate, gold lettering on the temples, exact shape and colours unchanged. No text, no people.
```
ถ้าวิดีโอออกมาแล้วกรอบแว่นบิดหรือเพี้ยน ให้สั่งทำใหม่

## วิธีใช้กับ Codex
รันจากโฟลเดอร์โปรเจกต์ ทุกครั้งที่สั่งจะใช้โควต้า ChatGPT
```
codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -o tmp/codex-last.txt "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached image as the product reference. Do not rewrite the prompt, do not generate variants. Reply with only the saved file path. PROMPT: <prompt>" -i "kits/2026-09-22_bj3205-b10/layers/BJ3205-B10_2.png"
```
- `-i` ต้องอยู่หลัง prompt เสมอ · L1, L2, L4 ไม่ต้องใส่ `-i`
- ไฟล์ที่ได้จะอยู่ใน `%USERPROFILE%\.codex\generated_images\<session>\` ให้ copy มาไว้ที่ `kits/2026-09-22_bj3205-b10/gen/`
