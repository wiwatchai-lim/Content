Files consulted: [hidden for blind judging]

บันทึกเฉพาะสิ่งที่เกิดขึ้นจริง ลงใน Creative Memory store (`creative-intelligence/memory/store/`) โดยใช้ `memory.py`
1. **approval** (`memory.py add --type approval`): `summary` (งานอะไร), `artifact` = path ของไฟล์ที่ผู้ใช้ชอบ (เช่น `kits/<job>/gen/xx.png` ระบุ seed ด้วย), `user_words` = **"อันนี้ใช้ได้เลย ชอบ"** คำต่อคำ, `evidence: "user"`, `elicitation: "said-unprompted"`, `source: "user 2026-11-26"`, `job`, `tags` (ชื่อซีรีส์หรือประเภทงาน, `flux`), `prompt_ref` ชี้ไปที่ record prompt ข้อ 2 ส่วน `what_worked` ให้เขียนเฉพาะสิ่งที่ผู้ใช้พูดหรือสังเกตเห็นได้จริง ห้ามเดาเหตุผลแทนผู้ใช้
2. **prompt** (`--type prompt`): `model` (FLUX.1 schnell Q4 GGUF ผ่าน `tools/flux.py`), `text` = พรอมต์เต็มที่ใช้จริง, `settings` (ขนาด, steps, `--init` หรือ `--denoise` ถ้ามี), `seed`, `output` = path, `outcome` = "user approved", `use_when` = งานแบบไหนที่ควรใช้ซ้ำ
3. **ไม่บันทึก** rating ที่เป็นตัวเลข เพราะผู้ใช้ไม่ได้ให้คะแนน ถ้ามีคะแนนที่ผมให้เอง (AI) ต้องติดป้าย `ai-judgement` และห้ามบันทึกเป็นคะแนนของผู้ใช้
4. ถ้าเหตุผลที่ชอบมีผลกับงานครั้งต่อไป ให้ถามคำถามสั้น ๆ ข้อเดียว เช่น "ชอบตรงลายเส้นหรือการจัดภาพคะ" แล้วเพิ่มคำตอบลงใน record ถ้าผู้ใช้ไม่ตอบก็เก็บแค่คำพูดเดิม
5. รัน `memory.py validate && memory.py digest` เพื่ออัปเดต MEMORY_DIGEST.md และจด seed หรือภาพที่เลือกไว้ใน `kit.md` ของงาน ถ้าเป็นบทเรียนเรื่องพรอมต์ที่ใช้ได้ทั่วไป ให้เพิ่มลง CHANGELOG ของ ai-visual-artist หรือ LEARNING-LOG ด้วย การชมครั้งเดียวไม่นับเป็น `taste` ถาวร ต้องเห็นซ้ำหลายครั้งหรือผู้ใช้พูดเป็นกฎเองก่อน
