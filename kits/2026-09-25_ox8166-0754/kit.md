# Oakley OX8166-0754 (Wheel House)

## ข้อมูลกรอบ
- sku: Oakley OX8166-0754 · status: ยืนยัน (colour 07 Matte Olive, size 54)
- source: https://www.eye-oo.com/en-us/products/oakley-wheel-house-ox8166-07-matte-olive
- photos: `photos/OX8166-0754_1.jpg` (front, 2048×1155), `photos/OX8166-0754_2.jpg` (three-quarter, 2048×1155)
- layers: `layers/OX8166-0754_1.png`, `layers/OX8166-0754_2.png` — ตัดพื้นผ่าน, ขอบครบ ขาแว่นไม่แหว่ง
  - ตัวตัดพื้นตอนแรกโปร่งแสง (สีกรอบใกล้พื้นขาว) แก้ให้ทึบแล้ว มีขอบสว่างบางๆ บนพื้นมืดมาก → ใช้บนพื้นสว่าง/กลางดีที่สุด
- lens masks: `layers/OX8166-0754_1_lens.png`, `layers/OX8166-0754_2_lens.png` (สำหรับชั้นกระจกในคลิป)

## สไตล์
- ทรง: สี่เหลี่ยมผืนผ้าทรงสูง ขอบบนตรงแบบ flat-top, สะพานจมูกหนา
- ขอบ: full-rim · วัสดุดูเป็นพลาสติกด้าน (O Matter) ขาเป็นโลหะสีบรอนซ์
- สี: เขียวมะกอกด้าน (matte olive) ขาด้านในสีส้ม ปลายขาดำ
- style tags: sporty, street, bold, minimal
- เหมาะกับ (คำแนะนำ): หน้ากลมหรือหน้ารูปไข่ ผู้ชายวัยทำงาน-วัยรุ่นที่ชอบลุคสตรีท/เอาท์ดอร์

## เลนส์ + coating
- **HOYA Sync III** — เลนส์ single vision สำหรับคนใช้จอ มี "boost zone" ช่วงล่าง ผู้ผลิตระบุว่า "ช่วยป้องกันหรือลดอาการตาล้าจากการใช้อุปกรณ์ดิจิทัล" เหมาะอายุ 13–45 ปีที่ใช้จอวันละ 2 ชม.ขึ้นไป — https://www.hoyavision.com/th/vision-products/single-vision-lenses/sync-iii/
- **HOYA Hi-Vision LongLife BlueControl** — "Neutralises the blue light emitted by digital screens", "ลดแสงสีฟ้า ป้องกันอาการตาล้า", กันรอยมากกว่าคู่แข่งหลักถึง 30% — https://www.hoyavision.com/th/vision-products/anti-reflective-coatings/hi-vision-longlife-blue-control/

## Prompts

S1, S2, L3 วาดสินค้าใหม่ — เทียบกับ `photos/` ทุกครั้ง ถ้าทรง สะพานจมูก หรือขาเปลี่ยน ให้ทิ้ง. ทางปลอดภัย = L1 + L2 + layer จริง

**L1 background**
```text
Minimal urban concrete backdrop at golden hour, warm low sun raking across a smooth grey-beige concrete wall with a soft burnt-orange light patch, subtle olive-green shadows, clean empty centre third for a pair of glasses and a headline above it, shallow depth, calm and bold street mood. No people, no product. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**L2 model**
```text
Man in his late 20s, short textured hair, light stubble, olive utility overshirt over a black tee, confident relaxed expression, looking straight into the camera, head facing front and level, shoulders square, not wearing glasses, plain flat light-grey background for easy cutout, soft even studio light. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names, an original face that does not resemble any real person.
```

**L3 product scene** (`-i layers/OX8166-0754_2.png`)
```text
The attached glasses resting on a raw concrete ledge beside a matte black water bottle, warm late sun from the left casting a long crisp contact shadow, soft olive and orange tones in the background blur. Use the attached glasses exactly as they are — same shape, proportions, colour, temples and hinges; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**L4 light & props** (transparent)
```text
Soft cool-blue screen glow and a thin warm lens flare streak, light effects only, on a transparent background, nothing else. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**S1 on-model** (`-i photos/OX8166-0754_1.jpg`)
```text
Man in his late 20s wearing the attached glasses, working on a laptop at a rooftop café table at dusk, city lights soft behind him, screen light on his face, relaxed focused look, olive overshirt. Use the attached glasses exactly as they are — same shape, proportions, colour, temples and hinges; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names, an original face that does not resemble any real person.
```

**S2 product hero** (`-i layers/OX8166-0754_2.png`)
```text
Editorial still life: the attached glasses floating slightly above a matte olive plinth, burnt-orange backdrop gradient, one hard key light with a crisp shadow, bold and sporty mood. Use the attached glasses exactly as they are — same shape, proportions, colour, temples and hinges; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

## วิธีใช้กับ Codex
```
codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -o tmp/codex-last.txt "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached image as the product reference. Do not rewrite the prompt, do not generate variants. Reply with only the saved file path. PROMPT: <prompt>" -i "kits/2026-09-25_ox8166-0754/layers/OX8166-0754_2.png"
```
L1, L2, L4 ไม่ต้องใส่ `-i`. ไฟล์ออกที่ `%USERPROFILE%\.codex\generated_images\` → copy มา `kits/2026-09-25_ox8166-0754/gen/`

## คลิป (beat clip สไตล์ privatejet)
- `export/clip-hf.mp4` — ไฟล์สำหรับโพสต์ TikTok: ภาพ + เสียงเอฟเฟกต์ ไม่มีเพลง
- `export/clip-hf_preview-song.mp4` — ไว้ดูในเครื่องเท่านั้น (มีเพลงจริง ห้ามโพสต์ไฟล์นี้)
- เพลง: **"original sound - nastelbom"** (Dmitrii Spis / Upbeat Hip Hop Rise) — https://www.tiktok.com/@nastelbom/video/7562637443548155192
  - 92 BPM · ในแอป TikTok ตั้งจุดเริ่มเพลงที่ **0:26** (drop ตรงกับวินาทีที่ 2.6 ของคลิป)
- ต้นฉบับคลิป: `hf/index.html` · เสียงเอฟเฟกต์: `clip-audio.json`
- แก้ 2026-09-25: เปิดด้วย hook "ปึ้ง" — เฟรมแรกกระแทกเข้าที่บานพับโลโก้ Oakley (เบลอ+แฟลช+สั่น+เสียงเบส) แล้วตัดฉับตามบีท: ปลายขาแว่น → ขาด้านในสีส้ม → ทั้งตัว → drop สีส้ม (ภาพ 2048px ไม่ขยายเกิน 1:1) · โลโก้ Oakley มุมซ้ายบนตลอดคลิป (`brand/partner-logos/oakley.svg`, จาก Wikimedia Commons "File:Oakley logo.svg") · ไม่มีรูปร้านมุมขวาบน
