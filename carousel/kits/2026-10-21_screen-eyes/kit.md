# Screens all day — eye habits (2026-10-21)

- ลายเส้น: `carousel/styles/anime-lineart`
- ขนาด: 1080×1350 × 5 สไลด์ (`01.html`–`05.html`, layout ร่วม `carousel.css`)
- เรื่อง: ความรู้ ใช้สายตากับจอนาน ๆ ให้ไหวทั้งวัน — hook + 4 นิสัย
- แว่น: ตัวละครใส่แว่นทั่วไป (ไม่ได้อิงกรอบจริงของร้าน)
- Render: `npm run render -- carousel/kits/2026-10-21_screen-eyes` → `export/01.png`…`05.png`
- ภาพการ์ตูนวางที่ `slides/slide-01.png`…`slide-05.png` (ไม่มีไฟล์ = พื้นฟ้าชั่วคราว)

## แผนสไลด์
| # | หัวข้อ | ภาพ | ข้อความ |
|---|---|---|---|
| 1 | SCREENS ALL DAY? | พระเอกมุมเงยจากล่าง ชี้นิ้วเข้ากล้อง ด้านหลังมีจอแล็ปท็อป | 4 habits to keep your eyes going strong |
| 2 | 20-20-20 RULE | หันจากโต๊ะคอมไปมองภูเขา/เมฆไกล ๆ | 20 min / 20 ft (6 m) / 20 s |
| 3 | BLINK ON PURPOSE | หน้าซูมใกล้ กะพริบตาแรง ๆ แบบการ์ตูน | blink fully, drink water |
| 4 | SET UP YOUR SCREEN | ยื่นแขนวัดระยะจอ มองด้านข้าง | arm's length, eye level, no glare |
| 5 | RIGHT LENSES, YEARLY CHECK | เพื่อน 4 คนใส่แว่นหัวชนกัน มองจากล่าง ชูนิ้วโป้ง | updated prescription, anti-reflective, yearly check |

ข้อความบนภาพใช้เฉพาะคำแนะนำทั่วไป ไม่อ้างตัวเลขทางการแพทย์ที่ไม่แน่นอน ไม่อ้างว่าเลนส์กรองแสงสีฟ้าแก้ตาล้า

## Prompt Codex
ทุกภาพ: ไม่มีตัวอักษร, แนวตั้ง 4:5, เว้นพื้นที่ให้ข้อความตามที่บอก ใช้คำสั่ง `codex exec` จาก `data/models/README.md` (ไม่ต้องใช้ "Transparent background") แล้วก๊อปไฟล์จาก `~/.codex/generated_images/` เอง

STYLE = prompt พื้นฐานใน `carousel/styles/anime-lineart/style.md`

### characters/main.png (ทำก่อน แนบ `-i` ทุกสไลด์)
```
Character sheet of one original character: a cheerful 20-year-old guy with messy spiky dark brown hair, warm skin, wearing an open teal zip hoodie over a mustard-yellow T-shirt, beige cargo pants and white sneakers, and black rectangular eyeglasses with clear lenses. Front view, three-quarter view and side view, full body, standing, plain white background. STYLE
```

### slide-01
```
Use the attached character. Dramatic worm's-eye view: he leans toward the camera pointing his index finger straight at the viewer, the hand huge in the foreground from strong foreshortening, huge confident toothy grin, eyeglasses on, slightly tired eyes but determined. Behind him a glowing laptop screen and a phone float in the air. Bright blue sky with puffy white cartoon clouds. Keep the character in the upper 60% of the frame; the bottom 40% is calm sky and clouds with nothing important, for text. Vertical 4:5. STYLE
```

### slide-02
```
Use the attached character. He sits at a desk with a laptop, turning his head and whole body away from the screen to gaze out at a distant mountain and clouds far away, hand shading his eyes, relieved happy expression, eyeglasses on. Dynamic three-quarter angle. Character and desk in the middle band of the frame; keep the top 30% simple blue sky and the bottom 30% plain floor/desk area, for text. Vertical 4:5. STYLE
```

### slide-03
```
Use the attached character. Close-up of his face behind his eyeglasses, eyes squeezed shut in a big exaggerated comic blink with small motion lines around the eyes, a sparkle of a water drop near the eye, a glass of water in his hand raised to the camera. Background: blue with white circle bubble pattern. Face in the middle band; top 30% and bottom 30% plain background, for text. Vertical 4:5. STYLE
```

### slide-04
```
Use the attached character. Side view: he sits upright at a desk and stretches one arm straight out, fingertips just touching a computer monitor, showing an arm's-length distance; the top edge of the monitor is level with his eyes; a window is beside him, not behind the screen. Confident grin, eyeglasses on. Character and desk in the middle band; top 30% plain sky-blue wall, bottom 30% plain floor, for text. Vertical 4:5. STYLE
```

### slide-05
```
Use the attached character plus three new original friends (a girl with orange hair, a guy with green short hair, a guy with blond hair), all four wearing different stylish eyeglasses. Worm's-eye view: they stand in a circle with heads together looking down at the camera, big grins, thumbs up toward the viewer. Bright blue sky with white clouds in the centre. Faces in the middle band; top 30% and bottom 30% sky only, for text. Vertical 4:5. STYLE
```

## Caption
```
Staring at screens all day? 👀 Save these 4 habits for your eyes:
1️⃣ 20-20-20 rule
2️⃣ Blink on purpose
3️⃣ Set up your screen right
4️⃣ Right lenses + a yearly eye check

Eyes feeling tired lately? Drop by TIMEOPTIC for an eye check 👓
#eyecare #screentime #eyestrain #2020rule #glasses #TIMEOPTIC
```
