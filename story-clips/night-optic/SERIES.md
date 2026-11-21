# ร้านแว่นตีสอง — Thai storytelling cartoon (16:9)

Started 2026-11-21 from a TikTok the user liked (นายจ๋อง "บ้านเช่าเดือนละ 1,500 บาท" format: one narrator "ผม", simple
round-head characters on painted gritty backgrounds, Thai subtitles, slow camera moves). Our own story and characters — copy the format only.

- Premise: Ton (ต้น) reopens his grandpa's old eyewear shop in a wooden shophouse by a canal; at 2 am, customers who are not alive come in.
  Warm ghost stories, light eyewear tie, no ads.
- Look: backgrounds = local FLUX (`EPxx/bg/gen.sh`, free), characters = SVG in `template.html` (ton / jan / chan functions).
- Voice: Gemini `gemini-3.1-flash-tts-preview`, voice **Charon** (male narrator). Long style prompts with "intimate", "ghost",
  "spooky" or acting directions for an old woman returned finishReason SAFETY; the plain style in EP01 `audio/tts_all.py`
  worked when sent in two halves (`tts_all.py 1 13`, `tts_all.py 14 27`, then `split.py first last part_xx.wav`).
- From EP02: plan a shot list per line and build with `../_craft/rig.js` (see `../_craft/GUIDE.md`); run `python ../_craft/visemes.py EPxx/audio` after timeline.py for lip-sync.
- Pipeline: tts_all.py → split.py → timeline.py → build.py → audio/ambience.py → make.sh → `export/EPxx_<slug>_th.mp4`.

| EP | Title | Status |
|----|-------|--------|
| EP01 | แว่นกรอบทองของยายจันทร์ | rendered 2026-11-21 (2:41) |
| EP02 | (teased: "ลูกค้าคนต่อไป มาก่อนตีสองด้วยซ้ำ") | — |
