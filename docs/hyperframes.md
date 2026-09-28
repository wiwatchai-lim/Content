# HyperFrames — บันทึกไว้ใช้ตอนทำคลิป

บันทึกเมื่อ 2026-09-16 · ที่มา: Notion ของทีม (workspace `Japiica Workspace`)
- [HyperFrames — Skill สร้างวิดีโอจาก HTML ด้วย AI](https://app.notion.com/p/7065c4f60d3283f4a7b3818aac87ccf1)
- [Prompt ตัดต่อคลิปด้วย HyperFrames — หาฟุตเทจฟรี + ทำงานคู่ Codex](https://app.notion.com/p/16d5c4f60d3283658a5a8166087d80bb)
- [ComfyUI · Kling · Google Flow](https://app.notion.com/p/c9e5c4f60d328364a84401250d5028cb) · [Higgsfield](https://app.notion.com/p/7a65c4f60d3282d894408186444c27d7)

## สถานะบนเครื่องนี้ (ตรวจจริง 2026-09-16)

**ยังไม่ได้ติดตั้งอะไรเลย** — เอกสาร Notion เขียนว่า "เครื่องนี้มี" แต่เป็นคนละเครื่องหรือโปรไฟล์ที่ถูกล้างไปแล้ว

| ของ | สถานะจริง |
|---|---|
| skill `hyperframes*`, `media-use` | ไม่มีใน `~/.claude/skills` และ `~/.agents/skills` |
| skill `higgsfield-*` | ไม่มี |
| CLI `hyperframes`, `higgsfield`, `comfy` | ไม่มีบน PATH |
| npm global | มีแค่ `pnpm` |
| ComfyUI Desktop | ไม่มี |
| FFmpeg ในเครื่อง | ไม่มี — โปรเจกต์นี้ใช้ `ffmpeg-static` (npm) แทน |
| Node.js | มี |
| Codex CLI | มี และล็อกอินด้วยบัญชี ChatGPT อยู่ |

## HyperFrames คืออะไร

ให้ AI เขียนวิดีโอเป็นไฟล์ HTML แล้วแปลงเป็น MP4 (Chrome headless + FFmpeg) · ปลั๊กอิน `hyperframes@claude-plugins-official` ของ HeyGen + CLI `npx hyperframes`

**ติดตั้งเมื่อจะใช้ (เลือกทางเดียว ห้ามลงทั้งสองทาง เดี๋ยว skill ซ้ำ):**
```
/plugin install hyperframes@claude-plugins-official
```
ต้องมี Node.js 22+ และ FFmpeg · เช็กด้วย `npx hyperframes doctor --json` แล้วดูค่า `.ok` (คำสั่งนี้ exit 0 เสมอ ห้ามดูแค่ exit code)

**คำสั่งหลัก:** `init` · `catalog --query "<อังกฤษ>"` · `add` · `lint` · `check` · `snapshot --at 1.5,4,8` · `preview --background` · `render --quality draft|high`

## เทียบกับ pipeline ที่โปรเจกต์นี้มีอยู่แล้ว

เรามี `npm run render` (HTML → PNG + PSD แยก layer) และ `npm run video` (HTML → MP4 วนลูป) ที่เขียนเองใน `tools/` ใช้ puppeteer + ffmpeg-static

- **งานโพสต์สินค้า** (ที่ทำอยู่ทุกวัน) — ใช้ของเราพอ คุมทุก layer เอง ได้ PSD ไปแก้ต่อ HyperFrames ไม่จำเป็น
- **งานคลิปยาวหลายช็อต** มีฟุตเทจจริง ซับ เพลง ทรานซิชัน — ตรงนี้ HyperFrames คุ้ม เพราะมี workflow, registry เอฟเฟกต์, ตัวตรวจ (`check`) และ Studio preview ให้

## กติกาที่จดไว้จากงานจริงของทีม (เอามาใช้ได้เลยตอนทำคลิป)

- **ฟอนต์ไทยต้องฝังในโปรเจกต์** (`assets/fonts/` เช่น Noto Sans Thai) — ฟอนต์ 18 ตระกูลที่ตัวเรนเดอร์ bundle มาไม่รองรับไทย
- **เจนฟุตเทจตามสัดส่วนปลายทางตั้งแต่แรก ห้ามครอปทีหลัง** — ครอป 16:9 720p เป็น 9:16 แล้วภาพเบลอ
- **ข้อความและโลโก้อยู่ชั้น HTML เสมอ** ห้ามให้โมเดลวิดีโอใส่ตัวอักษร (ตัวอักษรเละ)
- **ทรานซิชัน**: ตัดชนเป็นหลัก ใช้ละลายภาพ 0.4–0.6 วิ เฉพาะตอนเปลี่ยนบท · ช็อตยาวไม่เท่ากัน · เปลี่ยนซับตรงคัท
- **ห้ามแอนิเมต `clip-path` / mask / blend** ทำให้เรนเดอร์ช้ามาก (ต้องจับภาพทีละเฟรม) ใช้ `transform` กับ `opacity`
- **ทุกค่าที่ขยับต้องขึ้นกับเวลาในไทม์ไลน์** ลากไปเฟรมไหนก็ต้องได้ภาพเดิม (seek-safe) — กฎเดียวกับที่ `tools/video.mjs` ของเราใช้ (pause + seek ทีละเฟรม)
- **หยุดที่ `snapshot` / preview รออนุมัติก่อน `render`** — เรนเดอร์รอบละหลายนาที
- **ฟุตเทจฟรี**: Pexels ก่อน แล้ว Pixabay · ห้ามเห็นหน้าคนชัด (คนดูจะเข้าใจผิดว่าเป็นตัวจริง) · จดที่มาทุกคลิปลง `MANIFEST.md`

## ทำงานคู่ Codex

Codex ใช้ตรวจงานซ้ำ ไม่ใช่ตัวแก้ — ส่งโค้ด + ภาพเฟรมให้มันอ่านอย่างเดียว แล้วให้ Claude เช็กทุกข้อกับโค้ดจริงก่อนแก้
- ก่อนแก้: "ให้ codex ดูเรื่องเอฟเฟกและทรานซิชันหน่อย"
- หลังแก้: "ให้ codex ตรวจหน่อย" (ดู diff + เฟรมกลางทรานซิชัน)
- **บทเรียนของทีม: Codex ไม่ได้ถูกทุกข้อ** เคยเสนอให้ปิดจอดำที่ตั้งใจไว้ · เรียกผ่าน MCP อาจอ่านไฟล์ไม่ได้ ต้องใช้ `codex exec` ทาง CLI

## ถ้าต้องสร้างภาพ/วิดีโอด้วย AI (สำหรับสไตล์ 13 ที่ต้องมีรูปคน)

เรียงตามความพร้อมบนเครื่องนี้:
1. **Codex built-in `image_gen`** — พร้อมใช้ทันที ไม่ต้องติดตั้ง ไม่ต้องมี `OPENAI_API_KEY` หักโควตาแพลน ChatGPT · สกิลอยู่ที่ `~/.codex/skills/.system/imagegen/` มี `remove_chroma_key.py` สำหรับทำพื้นโปร่งด้วย
2. **Higgsfield CLI** (`npm i -g @higgsfield/cli`) — GPT Image 2 / Nano Banana / Kling หักเครดิต Higgsfield · ต้องเช็ก `generate cost` ก่อนทุกครั้ง เพราะ skill เลือกโมเดลแพงให้เอง
3. **ComfyUI** — ฟรีแต่ต้องลง Desktop + โมเดล และการ์ด RTX 4060 8GB ตึงมากกับงานวิดีโอ

**กฎที่ทีมตั้งไว้เอง: สินค้าและโลโก้จริงของแบรนด์ห้ามเจน** เจนได้แค่ฉากหลังและบรรยากาศ — ตรงกับที่ตกลงกันในโปรเจกต์นี้ว่า gen คนแล้วเอากรอบแว่นจริงที่ตัดพื้นหลังไว้ประกบเข้าไป
