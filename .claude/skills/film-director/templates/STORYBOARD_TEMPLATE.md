# STORYBOARD — <project> · <scene> · <aspect 9:16|1:1|16:9> · <fps> · v<n> · <date>

> 1 panel = 1 ความคิด · ใต้ทุก panel กรอกช่องครบ (ผูกกับ 20 ขั้นใน `DECISION_ENGINE.md`; เลขในวงเล็บ)
> สัญลักษณ์ (curriculum 08 §2 + FD25 §2.3): ลูกศรทึบในกรอบ = ตัวละคร/วัตถุเคลื่อน · ลูกศรหนานอกกรอบ + `CAM` = กล้องเคลื่อน ·
> กรอบเส้นประซ้อน = end frame ของ push/zoom · `TI/TO nF` = truck in/out กี่เฟรม · เส้นประล่าง 20% = safe zone 9:16
> รูป panel: thumbnail ดินสอ, FLUX draft (local) หรือ screenshot จาก rig — วางไฟล์ไว้ `boards/<scene>-<shot>-<panel>.png`

## Scene header
- Objective (1): · Context (2): · Motivation (3): · Emotion + level (4): · Audience knows (5):
- Floor plan: `boards/<scene>-floorplan.png` (กล้อง, ตัวละคร, เส้น 180°, แสงหลัก)
- Intensity graph (Block): วาดเส้น 1–5 ใต้แถว panel — `1-1-2-2-3-5-3-2`

---
### Panel <scene>-<shot>-<a|b|c>
![panel](boards/<scene>-<shot>-a.png)

| ช่อง | ค่า |
|---|---|
| ⏱ in–out / duration (15) | 0.00–2.50 s · 60 F@24 / 75 F@30 |
| VO / dialogue | |
| Action (การแสดง: entry → key → exit) | |
| Visual focus — ตาไปที่ไหนก่อน (6) | |
| Camera pos / side of 180° (7) | |
| Size · angle (8, 9) | shot.__ · cam.__ |
| Move + ease (10) | move.__ · `power2.inOut` · TI 6F / pan E 24F |
| Lens (11) | |
| Composition (12) | |
| Light (13) · Palette (14) | |
| SFX / music / sync (16) | sync.__ @ frame __ |
| Transition in (17) | cut / J-cut 0.4 s / dissolve 0.8 s |
| Continuity (18) — ทิศมอง/เดิน, prop, เสื้อผ้า | |
| Tool + prompt (19) | rig / 2.5d / flux / wan / codex(ถาม) / kling(ถาม) |
| Pass when (20) | |
| Why this shot | |

---
### Animatic notes
- Timing source: `audio/timing.json` (cue n → panel) · handles ±6 F
- Export: HyperFrames draft 480p → ตรวจปิดเสียง 1 รอบ / ฟังอย่างเดียว 1 รอบ
- Changes after review (วันที่, panel, เปลี่ยนอะไร, เพราะอะไร):
