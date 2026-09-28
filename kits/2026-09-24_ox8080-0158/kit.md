# Oakley OX8080-0158

## ข้อมูลกรอบ
- SKU: Oakley OX8080-0158 (Crosslink Zero) · status: ยืนยัน — รหัส -0158 = สี 01 ไซซ์ 58 ตรงกับสี 808001 Satin Gray Smoke ของร้านค้า
- ที่มา: https://www.eyeons.com/oakley-ox8080-808001-58-satin-gray-smoke
- photos/: `OX8080-0158_1.jpg` หน้าตรง 980×490 · `OX8080-0158_2.jpg` มุมเฉียง 980×490 (รูปเล็ก ใช้แบบวางกลางภาพได้ ห้ามขยายเต็มจอแบบล้นขอบ)
- layers/: `OX8080-0158_1.png`, `OX8080-0158_2.png` ตัดพื้นผ่าน ขอบครบ ขาแว่นกับแป้นจมูกไม่แหว่ง
  - กรอบเป็นสีเทาควันแบบโปร่งแสง บนพื้นมืดจะดูเข้มขึ้น เหมาะกับพื้นสว่าง/กลางๆ มากกว่า
  - `_lens.png` = ชั้นเลนส์ (มาสก์ช่องเลนส์) ใส่เงาสะท้อนให้แว่นไม่ดูโล่ง

## สไตล์
- ทรง: rectangle / wrap เบาๆ แบบ sport · full-rim · วัสดุพลาสติกน้ำหนักเบาแบบ Oakley (O Matter) ผิวด้าน สีเทาควันโปร่งแสง Satin Gray Smoke
- ดีเทล: ปลายขาแว่นยางสีฟ้าสด, โลโก้ O สีฟ้าที่บานพับ, แป้นจมูกยางสีดำ
- แท็ก: sporty, street, minimal
- เหมาะกับ (คำแนะนำทั่วไป ไม่ใช่คำโฆษณาสินค้า): หน้ากลม / หน้ารูปไข่ ช่วยให้หน้าดูคมขึ้น · คนแอคทีฟ ใส่ทั้งวัน ทำงานหน้าจอแล้วออกไปข้างนอก

## เลนส์ + coating
- **ZEISS Single Vision SmartLife**: เลนส์ชั้นเดียว ใช้เทคโนโลยี ZEISS SmartView 2.0 ผู้ผลิตระบุว่าเหมาะกับการสลับมองระหว่างจอกับโลกจริงทั้งวัน (ผลสำรวจของ ZEISS: 94% รู้สึกว่ามีมุมมองสบายตาที่กว้าง) — https://www.zeiss.com.sg/vision-care/eye-care-professionals/lenses/lens-type/single-vision-lenses.html
- **ZEISS DuraVision Plus BlueProtect UV**: โค้ตลดทอนแสงสีฟ้า-ม่วงช่วง 390–440 nm แบบเลือกช่วง ZEISS ระบุว่า "can help to relieve the eyestrain perceived by the patients which is typically associated with blue light exposure" ด้านหลังเลนส์เป็น DuraVision Plus Platinum UV — https://www.zeiss.com/vision-care/us/eye-care-professionals/lenses/coatings-technologies/blue-light-coating.html
- จับคู่ตามบรรทัด "ใช้คู่กับ" ของ BlueProtect UV (เลนส์ใสของ ZEISS) · กรอบเต็มขอบ ใช้วัสดุเลนส์ได้ทุกแบบ

## คลิป (ทำแล้ว)
- **`export/clip-hf_privatejet.mp4`** (v3, ตัวล่าสุด) 1080×1920 ยาว 14.2 วิ มีเสียง = เพลง `PRIVATE JET!.m4a` ของผู้ใช้ ตัดช่วง 1.02–15.25 วิ เฟดออก 1.2 วิท้าย · `export/clip-hf.mp4` = ภาพเดียวกันไม่มีเสียง
  - เพลง ~135 BPM · คลิปเดินแบบ half-time 67.5 BPM (4 ห้อง = 16 จังหวะใหญ่) แว่นเด้งทุกจังหวะใหญ่ และขยับเล็กทุกบีทของเพลง · เช็กแล้วเสียงกับภาพตรงกันทั้งคลิป (คลาดไม่เกิน 1 เฟรม ไม่ไหล)
  - จังหวะ 0–4: แว่นหน้าตรง กล้องเอียงสไลด์ · 4: whip zoom แล้วซูมรายละเอียดทีละจังหวะ (โลโก้ O / ปลายขา / สะพานจมูก / เลนส์ รูปจริงขยาย 2 เท่า) · 8–12: มุมเฉียง + coating + รุ่น · 12: โลโก้ TIMEOPTIC ดันขึ้นกลางจอ ใหญ่ ค้างจนจบ
- ใส่เสียงใหม่: `ffmpeg -i export/clip-hf.mp4 -ss 1.024 -t 14.224 -i "<เพลง>" -map 0:v -map 1:a -dn -map_chapters -1 -c:v copy -c:a aac -af "afade=t=out:st=13.0:d=1.2,loudnorm=I=-14:TP=-1.5" -shortest out.mp4`
- เวอร์ชันเก่า: `export/clip-hf-v1.mp4` (138 BPM), `export/clip-hf-v2-freakedout.mp4` (85 BPM), `export/clip-hf_music.mp4` (v2 + บีทสังเคราะห์) · โค้ด v1 `clip-v1.html.bak`
- เปลี่ยนเพลง: แก้ `BPM` และ `data-duration` ใน `hf/index.html` แล้ว render ใหม่ในโฟลเดอร์ `hf/`: `npx hyperframes@0.8.59 render . -o ../export/clip-hf.mp4`
- แว่นในคลิปคือรูปจริงจาก `layers/` ไม่ได้ให้ AI วาดใหม่

## Prompts
S1, S2, L3 และ C1–C3 ให้ AI วาดแว่นใหม่ ต้องเทียบผลกับ `photos/` ทุกครั้ง ถ้าทรง สะพานจมูก หรือขาแว่นเปลี่ยน ให้ทิ้งรูปนั้น เพราะโพสต์ต้องเป็นแว่นที่ร้านขายจริง ทางที่ปลอดภัยที่สุดคือเอา L1 + L2 มาวางซ้อนกับรูปตัดพื้นจริง

**L1 background**
```text
An empty, bright, cool-toned urban set for a sport-eyewear still life: a pale grey polished concrete floor meeting a smooth light blue-grey wall, crisp morning daylight from the right casting one clean diagonal shadow of a window frame across the wall, a very subtle cyan reflection on the floor. Clean, energetic, minimal city mood. Leave the centre of the floor completely clear for a pair of glasses, and keep the upper third of the wall plain for a headline. No people, no product, no objects. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**L2 model**
```text
Studio portrait of a fit man in his early 30s with an oval face, short textured hair with a clean fade, light stubble, wearing a charcoal technical zip jacket over a white tee. Face turned straight to the camera, eyes looking into the lens, confident easy smile, shoulders square. He is NOT wearing glasses. Plain flat light grey background, even soft light, sharp focus on the face, so he can be cut out cleanly. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names, an original face that does not resemble any real person.
```

**L3 product scene** — แนบ `-i "kits/2026-09-24_ox8080-0158/layers/OX8080-0158_2.png"`
```text
Place the attached glasses on a pale grey polished concrete floor in front of a light blue-grey wall, three-quarter view, in crisp morning daylight with a clean diagonal window shadow, a realistic soft contact shadow under the rims and temples and a faint reflection on the floor. Use the attached glasses exactly as they are — same rectangular sporty shape, proportions, matte translucent smoke-grey frame, bright sky-blue temple tips and hinge emblem, black nose pads, hinges; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**L4 light & props** (ใช้ถ้าต้องการ)
```text
On a fully transparent background: a soft cool glow of a laptop screen spilling from the lower left, a thin blue-violet light streak and a few crisp daylight flares — light effects only, no objects, no people. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

**S1 on-model** — แนบ `-i "kits/2026-09-24_ox8080-0158/photos/OX8080-0158_1.jpg"`
```text
A fit man in his early 30s wearing the attached glasses, standing at a standing desk in a bright modern loft office with a laptop open, turning from the screen toward the camera with an easy confident smile, charcoal technical zip jacket, a gym bag on the chair behind him, large windows with the city softly blurred outside, crisp morning light. Use the attached glasses exactly as they are — same rectangular sporty shape, proportions, matte translucent smoke-grey frame, bright sky-blue temple tips and hinge emblem, black nose pads, hinges; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names, an original face that does not resemble any real person.
```

**S2 product hero** — แนบ `-i "kits/2026-09-24_ox8080-0158/photos/OX8080-0158_2.jpg"`
```text
Editorial product hero: the attached glasses standing open on a matte light-grey block, floating slightly above its own sharp shadow, cool blue-grey studio backdrop, a hard rim light from behind making the translucent smoke-grey frame glow at the edges and the sky-blue temple tips pop. Clean, sporty, precise. Use the attached glasses exactly as they are — same rectangular sporty shape, proportions, matte translucent smoke-grey frame, bright sky-blue temple tips and hinge emblem, black nose pads, hinges; do not redesign, restyle or add logos. Square 1:1, photorealistic, no text, no logos, no watermark, no brand names.
```

### Clip shots (cinematic 9:16)

**C1 wide** — แนบ `-i "kits/2026-09-24_ox8080-0158/photos/OX8080-0158_2.jpg"`
```text
Wide vertical shot: the attached glasses resting open on the edge of a pale concrete ledge on a city rooftop at early morning, cool blue-grey sky, soft haze over distant buildings, low sun from the right giving a crisp rim light on the frame and a long clean shadow. Glasses small in the lower-middle of the frame, lots of calm sky above. Use the attached glasses exactly as they are — same rectangular sporty shape, proportions, matte translucent smoke-grey frame, bright sky-blue temple tips and hinge emblem, black nose pads, hinges; do not redesign, restyle or add logos. Vertical 9:16, photorealistic, no text, no logos, no watermark, no brand names.
```

**C2 macro detail** — แนบ `-i "kits/2026-09-24_ox8080-0158/photos/OX8080-0158_2.jpg" "kits/2026-09-24_ox8080-0158/gen/C1.png"`
```text
Macro vertical close-up in the same rooftop scene and light as the second attached image: the hinge and temple of the attached glasses, the matte translucent smoke-grey texture and the sky-blue emblem and temple tip sharp, the city haze melted into soft bokeh, a gentle cool reflection sliding across the clear lens. Use the attached glasses exactly as they are — same rectangular sporty shape, proportions, matte translucent smoke-grey frame, bright sky-blue temple tips and hinge emblem, black nose pads, hinges; do not redesign, restyle or add logos. Vertical 9:16, photorealistic, no text, no logos, no watermark, no brand names.
```

**C3 low hero** — แนบ `-i "kits/2026-09-24_ox8080-0158/photos/OX8080-0158_1.jpg" "kits/2026-09-24_ox8080-0158/gen/C1.png"`
```text
Low-angle vertical hero shot in the same rooftop scene and light as the second attached image: camera almost at ledge level looking slightly up at the attached glasses seen from the front, the morning sky behind them, the low sun just flaring past the right temple, the frame outlined by a crisp rim light. Use the attached glasses exactly as they are — same rectangular sporty shape, proportions, matte translucent smoke-grey frame, bright sky-blue temple tips and hinge emblem, black nose pads, hinges; do not redesign, restyle or add logos. Vertical 9:16, photorealistic, no text, no logos, no watermark, no brand names.
```

**V แบบ A** — CapCut Seedance 2.5, ใส่รูปอ้างอิง C1, C2, C3 ตามลำดับ · 9:16 · 10 วิ · ส่งออกเป็น `gen/V.mp4` · แว่นบิดเมื่อไรให้สร้างใหม่
```text
One continuous 10-second vertical camera take through the three reference images in order, no cuts. 0–3.5 s: slow dolly-in on the rooftop wide shot of image 1, haze drifting between the distant buildings. 3.5–6.5 s: the camera keeps pushing in until it becomes the macro of image 2, a cool reflection gliding across the lens. 6.5–10 s: the camera lowers and arcs round to the low front hero of image 3, the sun flaring gently past the temple; hold the last second. Only the camera, light and haze move; the glasses stay perfectly still with their exact rectangular sporty shape, matte translucent smoke-grey frame, sky-blue temple tips and emblem, black nose pads. No text, no logos, no people.
```

**V แบบ B** — เฟรมแรก C1 เฟรมสุดท้าย C3
```text
One continuous 10-second vertical camera take from the first frame to the last frame, no cuts. 0–3.5 s: slow dolly-in on the rooftop wide shot, haze drifting between the distant buildings. 3.5–6.5 s: push in close past the hinge, a cool reflection gliding across the lens. 6.5–10 s: the camera lowers and arcs round to the low front hero of the last frame, the sun flaring gently past the temple; hold the last second. Only the camera, light and haze move; the glasses stay perfectly still with their exact rectangular sporty shape, matte translucent smoke-grey frame, sky-blue temple tips and emblem, black nose pads. No text, no logos, no people.
```

## วิธีใช้กับ Codex
ทุกครั้งที่รันใช้โควตา ChatGPT · รันจากโฟลเดอร์โปรเจกต์ · `-i` ต้องอยู่หลัง prompt · L1, L2, L4 ไม่ต้องใส่ `-i`

```
codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -o tmp/codex-last.txt "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached image as the product reference. Do not rewrite the prompt, do not generate variants. Reply with only the saved file path. PROMPT: <prompt>" -i "kits/2026-09-24_ox8080-0158/layers/OX8080-0158_2.png"
```
รูปที่ได้อยู่ใน `%USERPROFILE%\.codex\generated_images\<session>\` คัดลอกมาไว้ที่ `kits/2026-09-24_ox8080-0158/gen/`
