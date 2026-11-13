# Brand battle on the map of Thailand — EP.1 (Thai, 60 s)

Order (2026-11-11): "ทำคลิปแบบนี้ให้หน่อย ขอมันๆ ความยาว 1 นาที" + reference TikTok https://vt.tiktok.com/ZSp5ph8u7/
(a map battle format: random attacker vs neighbour, dice × power, the winner takes the loser's land; not copied: own name, look and rules).
User chose: eyewear brands fight over Thailand, Thai text.

- 77 provinces (GeoJSON `data/thailand.json`, github.com/apisit/thailand.json), split among 10 brands that are in stock and have cutouts:
  Ray-Ban RB5453D, Oakley OX8080-0158, Ferrari FZ6002U-504-81, Vogue 5676-2726, Prada (front from kits/2026-11-09_prada-linea-rossa-sail),
  Bolon BJ3185-B10, Coach HC5206D, Paul Hueman 5246D, BOSS BOSS1427, Timberland TB1670-F052. Images: `prep_glasses.py` (cutout + lens layer).
- Rules: 3 dice each; power = 1 + 0.1 × floor(provinces / 6); tie → defender holds. Result per seed in `data/battles.json`.
- Seed 17: 9 battles, 2 upsets (Timberland, Ferrari), final Prada 12.1 vs Ferrari 12.6 → champion Ferrari.
- Rebuild: `node build.mjs [seed]` → `hf/index.html` + `clip-audio.json`; then render + `python tools/beat-audio.py` as in beat-clip.
- Timing: hook 0–3.6 s, battles 1–8 every 5.4 s, final battle 46.8–55 s, champion + Time Optic end card 55–60 s.
- Audio: SFX only (dice clicks, whooshes, impacts). Preview song: Iron Riot Protocol.m4a from 0:00 (1:00 long, fits the clip).
