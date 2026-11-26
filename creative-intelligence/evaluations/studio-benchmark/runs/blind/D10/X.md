Files consulted: [hidden for blind judging]

**The `beat-clip` skill handles it** ("ทำคลิป …" / "คลิปแว่น …" = a glasses beat clip; `frame-kit` is only for kits and Codex prompts; `eye-break-clip` is only for eye-break clips).

**Model and colour:** OX8208 is in stock in three colours: 0252, 0352 and 0552. The user named no colour, so I check `data/frames/images/Oakley/` for verified photos and, following the skill rule, **show every stock colour in the one clip** (a colour line-up section). Any colour without verified photos I find on the web and verify, or I tell the user it's missing.

**What I can reuse:** an older kit already exists (`kits/2026-09-21_ox8208-0552`, with Eyezen+ / Crizal Prevencia and a motion poster), so I can reuse its photos and cutouts after checking them. The beat clip itself is a new kit, `kits/2026-11-26_ox8208/`, and I vary the lens pairing and the moves from earlier clips.

**Pipeline:** steps 1–8 of beat-clip:
1. Frame row and photos.
2. Lens and coating pairing.
3. Cutouts with lens layers (`npm run cutout`).
4. Song from `music/songs.md` (BPM and drop with librosa).
5. Copy an approved kit's `hf/`, then `hyperframes check`.
6. Render, `clip-audio.json`, `tools/beat-audio.py`.
7. Contact sheet with the safe zone.
8. `kit.md`, `caption.md` (English), `log/kits.csv`, `songs.md`.

The Oakley logo is already in `brand/partner-logos/oakley.svg` and goes top-left. I ask about a price or promo first.
