# TIMEOPTIC Content

โปรเจกต์ทำคอนเทนต์โซเชียลของร้านแว่น TIMEOPTIC ทำงานผ่าน Claude Code (สั่งเป็นภาษาไทยได้เลย)

| ทำอะไรได้ | สั่งว่า | ผลอยู่ที่ |
|---|---|---|
| สุ่มแว่น + ชุดวัตถุดิบทำรูป (รูปหลายมุม, ตัดพื้น, prompt สำหรับ Codex) | "สุ่มแว่น" | `kits/` |
| คลิปแว่นตัดตามจังหวะเพลง (TikTok/Reels) | "ทำคลิป …" | `kits/<kit>/export/` |
| คลิปพักสายตา 15 วิ | "คลิปพักสายตา" | `kits/` |
| เกมทดสอบสายตา 3 ด่าน 10 เกม + ทดสอบตาบอดสี + จับผิดภาพแว่น | "ทำเกม …", "ทำคลิปเกม 7 เพิ่ม 5 คลิป" | `games/` (ดู `games/README.md`) |
| คารูเซลหลายสไลด์ | "ทำคารูเซล …" | `carousel/` (ดู `carousel/README.md`) |
| โพสต์สำเร็จรูป 1080×1080 | "ทำโพสต์วันนี้" | `posts/` |

## เกมทดสอบสายตา (`games/`)
คลิปแนวตั้ง 1080×1920 ยาวราว 28–37 วิ ทุกเกมมีฮุกเปิด ("ONLY 2% PASS LEVEL 3") → 3 ด่าน EASY / HARD / INSANE ที่เวลาน้อยลงเรื่อยๆ
(3 วิสุดท้ายตัวเลขแดง จอสั่น) → เฉลยพร้อมซูม → ตารางคะแนนชวนคอมเมนต์ ทุกโฟลเดอร์มี `export/clip.mp4`, `caption.txt`, `answer.txt`
- ส่วนกลางอยู่ที่ `games/_lib/levels.mjs` แต่ละเกมมี `make.mjs` สร้างคลิป แล้วเรนเดอร์ด้วย `npm run video -- games/<เกม>`
- เกม 7 ทดสอบตาบอดสี (จุดสีแบบ Ishihara) สร้างชุดใหม่: `node games/07-hidden-animal/make.mjs plates 5`
- เกม 9 จับผิดภาพแว่น สุ่มจุดต่างใหม่: `node games/09-spot-the-difference/make.mjs series 5`
- เพลงใส่เองตอนลง TikTok

## สุ่มแว่น / ชุดวัตถุดิบ

## ต้องใส่อะไร
1. `data/frames/` รูปกรอบ (ชื่อไฟล์ = รุ่น สี)
2. `data/lenses/`, `data/coatings/` ชื่อ + จุดเด่น ไฟล์แบบไหนก็ได้
3. `styles/<ชื่อสไตล์>/` รูปตัวอย่างที่ชอบ

## ใช้งาน
1. เปิด Claude Code ในโฟลเดอร์นี้
2. สั่ง "สุ่มแว่น" (หรือ "สุ่มมา 3 ตัว", "สุ่มแว่น Oakley", "ขอ kit RB2140")
   - ได้โฟลเดอร์ `kits/<วันที่>_<รุ่น>/`: `photos/` รูปต้นฉบับ, `layers/` PNG ตัดพื้น, `export/preview.png` ภาพตรวจ, `kit.md` ข้อมูล + สไตล์ + prompt
   - เอา prompt ใน `kit.md` ไปสั่ง Codex ต่อเอง (มีคำสั่งให้ในไฟล์)
3. ทำคลิปแบบคลิปเรฟ: ดูขั้นตอน 1–4 ใน `docs/clip-howto.md` (สั่ง "ตัดคลิปให้หน่อย" หลังวาง `V.mp4` ใน `gen/`)
4. ยังทำโพสต์สำเร็จรูปได้ถ้าสั่ง "ทำโพสต์วันนี้"
   ได้ `posts/<วันที่>/export/post.png` ขนาด 1080×1080 (โพสต์ได้เลย) + `post.psd` (แยก layer ไว้แก้)
   อยากได้คลิปด้วยให้สั่งเพิ่ม — ได้ `export/clip.mp4` 6 วิ วนลูป

## โฟลเดอร์ที่ควรรู้
- `brand/` ชุด CI ของร้าน — `tokens.css` (สี ฟอนต์ ระยะขอบ), โลโก้ SVG, `ci.html` · ทุกเทมเพลตดึงค่าจากที่นี่ ห้าม hardcode สีเอง
- `styles/` 14 สไตล์ แต่ละอันมี `base.html` + `preview.png`
- `docs/hyperframes.md` บันทึกไว้สำหรับตอนจะทำคลิปยาวหลายช็อต (ยังไม่ได้ติดตั้ง)

ส่วนอื่น (`log/`, `sources/`, `tools/`) Claude ดูแลเอง

## ติดตั้งบนเครื่องใหม่
1. ลง **Claude Code** — https://claude.com/claude-code
2. เปิด `claude` ในโฟลเดอร์นี้ แล้วพิมพ์ **"ติดตั้งให้หน่อย"**
3. Claude จะลง Node.js, Chrome, Python, Codex, ComfyUI + Wan 2.2 (ถ้ามีการ์ด NVIDIA) และ `npm install` ให้เอง ตามคำสั่งใน `CLAUDE.md` แล้วลองเรนเดอร์ภาพตัวอย่าง อาจมีหน้าต่างขอสิทธิ์ admin ให้กดยอมรับ
4. เสร็จแล้วสั่ง "สุ่มแว่น" ได้เลย

ต้องต่ออินเทอร์เน็ต (ฟอนต์โหลดจาก Google Fonts)

---

## Getting the project from GitHub

The project lives in https://github.com/wiwatchai-lim/Content (older copy: https://github.com/timeoptic/timeoptic-content).
`git clone https://github.com/wiwatchai-lim/Content.git timeoptic-content`, then follow the setup below.
Not in the repo (install or create on each machine): `node_modules/` (`npm install`), `tmp/`, `.env` (own Gemini key, only if new voice lines are needed).
Save work back with `git add -A`, `git commit -m "..."`, `git push`.

## For Claude: setup on a new machine (read this first)

This folder was copied from the owner's computer. Every rule for clips lives in the project skills in `.claude/skills/` (`beat-clip`, `eye-break-clip`, `frame-kit`, `daily-post`, `remove-spots`). Talk to the user in Thai, keep it short, install things yourself, and ask only when an installer needs admin rights or a login.

**Claude's memory from the owner's computer** is in `.claude/memory/`. On the first session copy every `.md` from there into this machine's memory folder for the project, `~/.claude/projects/<project-slug>/memory/` (the slug is the project path with `:`, `\` and `/` turned into `-`, e.g. `C:\timeoptic-content` → `C--timeoptic-content`). Don't overwrite memory files that already exist there. Copy back the other way (memory folder → `.claude/memory/`) before pushing, so GitHub keeps the latest notes.

### What to install
Do steps 1–7 of the setup in `CLAUDE.md` (Node 20+, Chrome/Edge, `npm install`, smoke test, Codex, Python, FFmpeg + HyperFrames plugin; step 8 Wan is optional). On top of that, beat clips need:

| Need | Why | Install |
|---|---|---|
| Python packages `numpy librosa soundfile` | BPM, beats and the drop of the song; audio mix | `python -m pip install numpy librosa soundfile` |
| System FFmpeg + ffprobe on PATH | HyperFrames render, contact sheets | Windows `winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements`, macOS `brew install ffmpeg` |
| HyperFrames plugin for Claude Code | the SFX files (whoosh, impact-bass, pop …) used by `tools/beat-audio.py`, and the `hyperframes` skills | ask the user to type `/plugin install hyperframes@claude-plugins-official`, then restart Claude Code |
| HyperFrames CLI | render the clip | nothing to install: `npx --yes hyperframes@0.8.59 …` downloads it on first use |
| Internet | Google Fonts, npx, Wikimedia/brand logos | — |

### Files that must be in the folder
If any of these are missing, ask the user to copy them again from the owner (don't fake them):
- `kits/2026-09-24_ox8080-0158/` — the reference "privatejet" clip (`export/clip-hf_privatejet.mp4`, `hf/index.html`, `clip-audio.json`)
- at least one recent kit with an `hf/` folder (its `assets/timeoptic.svg`, `timeoptic-mono.svg`, `tokens.css` are copied into each new clip)
- `music/` with the songs and `music/songs.md`
- `brand/partner-logos/`, `brand/` (TIMEOPTIC logo, tokens)
- `data/frames/` (stock CSVs + photos), `data/lenses/`, `data/coatings/`
- `kits/2026-09-26_neck-break/` — the reference for 15-second eye-break clips (skill `eye-break-clip`): approved renders in `export/`, compositions `hf15-photo*/` (person) and `hf-ocean/` (nature), finished voice tracks in `audio/en/`
- the approved beat clips listed in the beat-clip skill (`kits/2026-09-25_*`)

Eye-break clips reuse the finished voice, so they need no key. Only for new voice lines: `python -m pip install google-genai`, and the user of that machine puts their own free Gemini key in `.env` at the project root (`GEMINI_API_KEY=...`). Never copy the owner's key.

### Ready check
All of these must pass before the first clip:
```
node -v                                   # 20 or newer
npm run render -- posts/_example          # writes posts/_example/export/post.png
python -c "import numpy, librosa, cv2, onnxruntime"
ffmpeg -version && ffprobe -version
npx --yes hyperframes@0.8.59 --version
ls ~/.claude/plugins/cache/claude-plugins-official/hyperframes/*/skills/media-use/audio/assets/sfx
ls kits/2026-09-24_ox8080-0158/export/clip-hf_privatejet.mp4
ls ~/.claude/projects/*timeoptic-content*/memory/MEMORY.md
```
Then do a test: render the reference clip once from `kits/2026-09-24_ox8080-0158/hf/` (`npx --yes hyperframes@0.8.59 render -o ../../../tmp/ready-test.mp4 --quiet`) and look at a few frames with Read. When everything passes, tell the user in Thai that it is ready and they can order a clip, e.g. "ทำคลิป Vogue ซักรุ่น".

### Rules to remember (details in the beat-clip skill)
- Clips must look like the privatejet reference: kinetic type bouncing on the beat, glasses from many angles, hard cuts, calm backgrounds, frame brand logo top left, TIMEOPTIC wordmark at the end, English only.
- **TikTok UI covers parts of the clip.** Keep all text and logos inside x 60–940, y 220–1480 of the 1080×1920 canvas (top bar, bottom caption area and the right-hand like/comment/share column cover the rest).
- The upload file has no song; the user adds the same sound in TikTok.
