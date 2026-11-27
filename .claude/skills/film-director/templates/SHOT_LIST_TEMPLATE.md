# SHOT LIST — <project> · <episode/scene> · <format: reels_9x16 | square_1x1 | wide_16x9> · <fps 24|30>

> ใช้คู่กับ `DECISION_ENGINE.md` (20 ขั้น) — คอลัมน์ข้างล่างครอบคลุมครบทั้ง 20 ข้อ (เลขในวงเล็บ = ข้อของ engine)
> ต้องการตรวจด้วยเครื่อง → กรอกแบบเดียวกันใน `templates/SCENE_DECISION.json` แล้วรัน `tools/check_scene.py`
> ทุกช่องที่เป็นการเลือก ต้องมี "why" (เหตุผลทางเรื่อง ไม่ใช่ "สวยดี") · id อ้าง library: `libraries/*.json`

## A. หัวฉาก (กรอกครั้งเดียวต่อฉาก)
| ช่อง | ค่า |
|---|---|
| Scene objective (1) — ฉากนี้เปลี่ยนอะไร | |
| Narrative context (2) — ก่อน/หลังฉากนี้ | |
| Character motivation (3) — อยากได้ / อะไรขวาง | |
| Target emotion (4) + ระดับ 1–5 | |
| Audience perspective (5) — knows more / same / less, POV ของใคร | |
| Location + floor plan (ไฟล์/รูป) | |
| Light motivation (13) — แหล่งแสงหลักในฉาก | |
| Colour script slot (14) | |
| Music/sound plan ทั้งฉาก (16) — bpm, silence, hit points | |
| Tool budget (19) — html/rig/2.5d/flux/wan/codex/kling, โควตา (ต้องถามผู้ใช้: yes/no) | |

## B. ตารางช็อต
| shot | t in–out (s) / frames | VO / beat | visual focus (6) | cam pos + side of 180° (7) | size (8) | angle (9) | move (10) + ease | lens (11) | composition (12) | light (13) | palette (14) | dur + why (15) | sound / sync (16) | transition in (17) | continuity (18) | tool + prompt id (19) | pass when (20) | why (1 บรรทัด) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01-01 | 0.00–2.50 / 0–60 | | | C1, side A | shot.ws | cam.eye_level | move.truck_r · sine.inOut | lens.wide | comp.thirds | | | 2.5 · ต้องอ่านป้าย | amb + J-cut 0.4 s | cut | ทอนมองขวา→ | rig + flux BG#1 | ป้ายอ่านออกที่ 64 px | |
| 01-02 | | | | | | | | | | | | | | | | | | |

คอลัมน์เสริมสำหรับงานแอนิเมชัน/motion (ใส่เมื่อมี):
| shot | acting plan (entry → key poses → exit) | motion ids (`ANIMATION_MOTION_LIBRARY`) | timing (F@24/F@30) | on 1s/2s | sync ids (`SOUND_SYNC_LIBRARY`) | X-sheet camera note (TI/TO, pan, field) |
|---|---|---|---|---|---|---|
| 01-02 | idle → look door → shock → settle | anim.moving_hold, anim.head_turn(ทัก), anim.take | 9F/11F, 18F/23F | 2s (cam 1s) | sync.hit_contact | TI 6F on held |

## C. Coverage & inserts
| ฉาก | master | singles | overs | inserts (สินค้า/รายละเอียด) | reaction สำรอง |
|---|---|---|---|---|---|
| | | | | | |

## D. Shoot / generate order (จัดกลุ่มตาม setup — BG เดียวกัน/มุมเดียวกัน/prompt เดียวกัน)
1. setup A (BG#1, cam C1): shots …
2. setup B: …

## E. QC ก่อนส่ง (20)
- [ ] ทุกช็อตมี why · [ ] ไม่ข้ามเส้น 180° โดยไม่ตั้งใจ · [ ] ขนาดช็อตไล่ตามกราฟอารมณ์ · [ ] ข้อความอ่านทัน (~11 ตัวอักษรไทย/s)
- [ ] hit ทุกจุด 0/+1 F · [ ] ไม่มีรูเสียง (room tone) · [ ] safe zone 9:16 · [ ] house rules (โลโก้, ภาษา, ภาพ text-free)
