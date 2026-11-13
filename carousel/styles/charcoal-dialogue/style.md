# charcoal-dialogue — ดินสอถ่านขาวดำ อบอุ่นเศร้านิด ๆ
รูปแบบเรื่อง/บอลลูน: ดู `../blue-pen-dialogue/style.md`
ตัวอักษร: Sriracha สีดำถ่าน, บอลลูนขอบดินสอสีเทาเข้ม พื้นขาวนวล

## Prompt พื้นฐาน
```
Soft charcoal and graphite pencil drawing on warm off-white textured sketch paper, smudged tonal shading, visible pencil strokes and paper grain, black and grey only. Simple faceless human figures with smooth round blank heads, gentle emotional body language. Quiet, tender, slightly melancholic mood. Keep the top 40% of the image empty plain paper (space for speech bubbles added later). No text, no letters, no speech bubbles, no signature.
```

## วาดฟรีในเครื่องด้วย FLUX (`python tools/flux.py "<prompt>" out.png --count 2`)
- FLUX ไม่เข้าใจคำว่า "no ..." (ใส่ "no signature" แล้วกลับวาดลายเซ็น) ให้เขียนแต่สิ่งที่อยากเห็น เป็นประโยคเล่าภาพ
- บอกขนาดคนชัด ๆ "Two large faceless mannequin people with smooth white round ball heads" ไม่งั้นได้คนตัวจิ๋วสีดำ
- ปิดท้ายด้วย "The upper third of the picture is blank cream paper." เพื่อเว้นที่ให้บอลลูน
- ตัวอย่างที่ใช้ได้: `carousel/kits/2026-11-13_dialogue-quotes/slides-flux/test-05b-2.png` (seed 22)
- ให้ภาพแน่นเหมือน Codex: ใส่ "fully shaded from edge to edge with rich grey mid-tones" + บรรยายฉากทุกชิ้นละเอียด ๆ แล้วปรับโทนด้วย `python tools/charcoal_tone.py in.png out.png` (ตัวอย่าง `slides-flux/w06-1.png` → `slide-06.png`)
- ถ้าต้องการให้ "เหมือน ChatGPT" จริง ๆ: ใช้ภาพ Codex/ChatGPT เป็นต้นแบบ `--init ref.png --denoise 0.35` (0.45 = เปลี่ยนมากขึ้น, 0.6+ = เพี้ยน) — ต้องครอปต้นแบบให้เป็นจัตุรัสเหมือนที่ HTML ครอปก่อน
