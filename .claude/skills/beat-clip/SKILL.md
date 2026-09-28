---
name: beat-clip
description: Make or edit vertical beat clips (kinetic type + real glasses cut to a song) for TikTok/Reels. One clip per frame, several in parallel. Use when the user asks for a clip ("ทำคลิป", "ขอคลิป", "ทำ beat clip", "ทำคลิป 5 ตัว", "คลิปแว่น …"), names frames for clips, pastes an order from `สั่งคลิป.html`, or asks to change a clip ("แก้คลิป …", "เปลี่ยนเพลง", "ขอ hook ใหม่"). Also for captions/titles of those clips ("ขอแคปชั่น", "ขอชื่อคลิป"). Eye-break / close-your-eyes / neck-stretch clips ("คลิปหลับตา", "คลิปพักสายตา") belong to `eye-break-clip`.
---

# Beat clip

A 10–15 s vertical clip (1080×1920) where glasses, type and backgrounds move on the beat of a song from `music/`. The upload file has **no song**: the user adds the same sound in the TikTok app. Talk to the user in Thai, short. On-screen text and captions are English.

The user calls these "คลิปตัวหนังสือเด้ง" / "คลิปเด้งๆ"; the agreed name is **beat clip**, and the look they want to repeat is the **"privatejet"** style. Everything needed is in this file and the project folder; nothing depends on Claude's memory on the original machine. First time on a new machine: run the "Ready check" in `README.md` before the first clip.

## The privatejet style (the reference)

Reference render `kits/2026-09-24_ox8080-0158/export/clip-hf_privatejet.mp4`, source `kits/2026-09-24_ox8080-0158/hf/index.html` (HyperFrames + GSAP) plus `clip-audio.json` (SFX cues). Watch it (contact sheet with ffmpeg + Read) before your first clip on a machine.
- 1080×1920, 4 bars (16 beats) at the song's half-time BPM, about 14 s.
- Beats 0–4: front cutout flies in and bops. Type: NEW IN STORE / brand (mega) / × / lens brand / model line.
- Beats 4–8: whip zoom, then one detail punch-in per beat (hinge, temple tip, bridge, lens). Type: THE LENS + lens name + one line.
- Beats 8–12: three-quarter cutout whips in and sways. Type: THE COATING + name + spec, chip with the model code.
- Beat 12 to end: veil, the TIMEOPTIC wordmark pushes up to the centre big, letters hop, a shine sweeps across.
- Type is split into letters: `bounceIn` (back.out, alternating rotation), `hop` on beats, `bounceOut` before each whip.
- Look: light, calm studio grounds (the original is light grey with faint wall lines and a floor, white rings pulsing on each beat); strong dark type; the glasses big and sharp in the middle band.
- Keep the beat grid and the energy, but not the same moves every clip (see Motion variety), and the newer rules below (hook opening, calm backgrounds) override the original clip where they differ.

## Why a copy on another machine can look different (read first)

A friend's machine once produced clips that didn't look like ours. The usual causes, all avoidable:
- **Not watching the references.** Before the first clip in a session, make contact sheets (step 7 command) of `kits/2026-09-24_ox8080-0158/export/clip-hf_privatejet.mp4` and of two of the approved clips below, and look at them with Read. Match their pace (a cut or move on every beat), type size and weight, and how big the glasses sit.
  Approved clips after the reference (`export/clip-hf_preview-song.mp4` in each): `kits/2026-09-25_vogue-5676`, `2026-09-25_bj3185-b10`, `2026-09-25_fz6002u-504-81`, `2026-09-25_ox8166-0754`, `2026-09-25_ph-5246d`, `2026-09-25_tb1670f`.
- **Writing the composition from a blank page.** Always start from a copy of the reference's or an approved clip's `hf/index.html` and keep its machinery: `B = 60/BPM`, `b(n)`, `bounceIn` / `hop` / `bounceOut` for letter type, `whip` between sections, the letter-slice TIMEOPTIC wordmark with the shine. Then change shots, text, backgrounds and moves for the new frame.
- **Missing files.** If `kits/2026-09-24_ox8080-0158/`, the approved kits above, `music/` or `brand/partner-logos/` are missing, stop and ask the user to copy them from the owner; don't improvise a replacement.
- **Other versions.** Always `hyperframes@0.8.59` and GSAP 3.14.2 from the reference, the same fonts (Archivo + Inter from Google Fonts, variables in `assets/tokens.css`).
- **Skipping the check.** Never hand over without the contact sheet check in step 7.

## How the user orders

Short Thai orders are enough. Examples:
- `ทำคลิป Bolon BJ3185 B10` · `ทำคลิป 3 ตัว: Vogue ซักรุ่น, Oakley ซักรุ่น, Ferrari กันแดด` · `สุ่มแว่นทำคลิป 2 ตัว`
- Optional: `เพลง Neon Show` · `อารมณ์ มินิมอล/สปอร์ต/แฟชั่น/เอาท์ดอร์/หรู` · `ใส่ ... ด้วย`
- Edits: `แก้คลิป <brand/model หรือ folder>: <what>`, e.g. `แก้คลิป Ferrari: รถช้าลง`
- The order page `สั่งคลิป.html` (double-click to open) builds these orders; the user pastes the result here. Rebuild it after stock or music changes: `node tools/build-order-page.mjs`.

"ซักรุ่น" means pick one from stock yourself. Only models **and colours** in `data/frames/frames-stock-*.csv`. If a model has several stock colours, show them all in the one clip.

## House rules (every clip)

- **Hook opening**: never open with a slow fade or the plain whole frame. Frame 0 is the most striking shot of the clip, slammed in with a "ปึ้ง": over-scale + blur + flash snapping to rest in ~0.15 s, a shake, and `impact-bass` at t=0. Good openers are a detail close-up (a temple emblem like the Ferrari shield) or a clip highlight (like the Vogue three-colour line-up). After it, **hard cuts on the beat** between shots (details, angles, colours). No slow camera slides along the frame; the user rejected those.
- **Many angles**, like the reference clip `kits/2026-09-24_ox8080-0158/export/clip-hf_privatejet.mp4`: front, three-quarter, side, and one detail punch-in per beat in a detail section. Missing angles: find real photos of the same model + colour on the web.
- **Glasses are the hero**: calm backgrounds that make the frame pop. The user rejected neon/busy sets that hid the glasses. Each section still changes background, with a different transition per cut.
- **Motion variety**: mix letter bounce, fades, slides, wipes and mask reveals; glasses glide, teleport/warp and bop. Don't repeat the previous clip's moves.
- **TikTok UI safe zone**: TikTok (and Reels) draws its UI over the clip, so nothing that must be seen — type, logos, prices, model codes, the wordmark, the detail a shot is about — may sit under it. On the 1080×1920 canvas:
  - top 0–220 px: status bar, LIVE, Following / For You, search
  - bottom 1480–1920 px: username, caption, sound name, nav bar
  - right 940–1080 px, from y ≈ 700 down: avatar, like, comment, save, share, spinning disc
  - left 0–60 px: edge margin
  Keep all type and logos inside **x 60–940, y 220–1480**, and put key text in the middle band (y 300–1400). Backgrounds and glasses may run under the UI, but the part that matters (emblem, hinge, lens) stays inside. Check this on the contact sheet by drawing the zone: `-vf "drawbox=x=60:y=220:w=880:h=1260:color=red@0.8:t=4"` before tiling.
- **Brand logo** of the frame right in the top-left corner (left 64 px, top 64 px), for the whole clip. This one item is an exception to the safe zone: the user wants it in the corner even though TikTok's top bar can cover it (user, 2026-09-28, "เอาไว้ตรงมุมเลย"). Logo file: `brand/partner-logos/<brand>.svg|png`. Missing → get the official file (brand site, Wikimedia), save it there. Give the logo `<img>` an explicit width **and** height, or it can render in the middle of the frame.
- **TIMEOPTIC wordmark** moves (letters in, shine) and ends big in the centre. Use the logo as it is (green TIME, black OPTIC) on light grounds and the all-white logo on dark footage (user, 2026-09-26). Leave a small space between TIME and OPTIC (the letter-slice wordmark: shift the OPTIC slices right by 12 px on the 300 px box, `LOGO_GAP` in `kits/2026-09-26_neck-break/hf15-en/index.html`; the white logo: `hf-ocean/assets/timeoptic-white-spaced.svg`). **No storefront line art in clips.** Any small wordmark during the clip stays above y 1480 (not at the bottom edge, where TikTok's caption covers it).
- **English only** on screen and in captions.
- **The shop name in running text** (not the logo) is written **Time Optic**, two words, both bold, in the logo's colours on light grounds: "Time" green `#123A29`, "Optic" black `#212121` (e.g. `<b class="bt">Time</b> <b class="bo">Optic</b>`); plain white on dark footage. Never "TIMEOPTIC" as one plain word in sentences.
- Lens layer on every cutout (`<file>_lens.png`) so the glasses don't look empty; tinted sun lenses stay as shot.
- Text only from `data/` (frame, lens + coating names and the maker's wording). Price/promo only when the user gives it for that clip.
- Extra assets (people, cars, props) come only from Pexels / Unsplash / Pixabay, from the user, or from Codex after the user approves each generation (quota). Never Giphy/Tenor/Google Images. Record every source in `<kit>/assets-sources.md`.

## Steps

1. **Frame + data**: find the stock row. Photos in `data/frames/images/<Brand>/`? If not, search the web for the model + colour code, ≥ 980 px, and verify both. Save as `<Model-colour>_1/_2/_3.jpg` and add a row to a new `data/frames/images/_check/*.csv`. Can't verify → tell the user, never fake.
2. **Pair lens + coating** with the Pairing rules in `.claude/skills/daily-post/SKILL.md`. Vary the lens brand between clips; sunglasses get no Rx lens.
3. **Kit** `kits/YYYY-MM-DD_<slug>/`: `photos/`; `layers/` via `npm run cutout -- <kit>/layers <photos…>`.
   - Check alpha percentiles. A median below ~230 means a semi-transparent cutout: boost alpha and rebuild the colour from the shot-on-white original.
   - Lens masks: fill the holes of the alpha (> 40), keep components > 5000 px, dilate 5 px.
   - Check `export/preview.png` (template `kits/_template/preview.html`) with Read.
4. **Song**: the user picks the frame, you pick a song from `music/songs.md` that fits the frame's style (mood + BPM), unless the user names one; avoid songs used recently. Copy it to `<kit>/audio/sound.<ext>`.
   - `music/` holds songs the user downloaded, named after the TikTok sound so they can find it in the app. New song not in the folder: `npm run sound -- <tiktok video url> <kit>/audio` saves it through TikWM (only its POST /api/ endpoint works; search/music endpoints sit behind Cloudflare, so the user must send a link to a video that uses the song). Add new songs to `songs.md` with BPM and mood.
   - Decode with ffmpeg. Use librosa for BPM, beats, the bass/kick pattern and the drop.
   - Set `song_start` so the drop lands on a section cut (usually beat 4).
   - Use 16–24 beats, or up to 30 when fast.
5. **Composition** `<kit>/hf/`: copy `AGENTS.md, CLAUDE.md, hyperframes.json, package.json, meta.json, assets/{timeoptic.svg,timeoptic-mono.svg,tokens.css}` from a recent approved kit's `hf/`, plus the layers and the logo. Start `index.html` from a copy of that kit's `index.html` (see "Why a copy … can look different") and rework it for this frame's mood: GSAP paused timeline on `window.__timelines.main`, `B = 60/BPM`, `b(n)`, sections on beats. Typical sections:
   - hook (detail tease)
   - drop (full reveal and brand)
   - details, one per beat, with the lens story
   - coating or colourways
   - end card
   Then run `npx --yes hyperframes@0.8.59 check` until there are 0 errors.
6. **Render + audio**:
   - Render: `npx --yes hyperframes@0.8.59 render -o ../export/_silent.mp4 --quiet` (from `hf/`).
   - Write `<kit>/clip-audio.json`: `{seconds, song, song_start, fade_out, sfx:[{t,file,gain}]}`. SFX names come from the HyperFrames sfx folder (whoosh-short, whoosh, whoosh-cinematic, impact-bass-1/2, pop, click-soft, glitch-1..3, riser, sparkle, chime …).
   - Mix: `python tools/beat-audio.py <kit> <kit>/export/_silent.mp4`, then delete `_silent.mp4`. This makes `export/clip-hf.mp4` (SFX only, for upload) and `export/clip-hf_preview-song.mp4` (song + SFX, stays on this machine).
7. **Check before showing**: contact sheet with one frame per beat and the safe zone drawn (`ffmpeg … -vf "fps=<1/B>,drawbox=x=60:y=220:w=880:h=1260:color=red@0.8:t=4,scale=216:-2,tile=7x3"`) plus frames at the hook and the drop, read with Read. Type and logos inside the red box, type readable, nothing overlapping, glasses clear and not upscaled past their pixels. You can't hear the audio, so say so.
8. **Hand over**:
   - `kit.md` (frame data, style, lens + coating with sources, clip section with song + BPM + TikTok start time).
   - `caption.md`: title, TikTok sound + start, a short English caption from data only, hashtags.
   - Append the row to `log/kits.csv` and a "used for" line to `music/songs.md`.
   - Open the previews: `Start-Process <kit>\export\clip-hf_preview-song.mp4`.
   - Report in Thai: the file to post, the song name and where to start it in TikTok, and anything uncertain.

## Several clips at once

One forked agent per clip (Agent tool, `subagent_type: fork`), all in one message, each with its frame, mood and song assigned by you so moods and songs don't repeat. Workers must not write `log/kits.csv` (you append after), and each writes its own `_check` file. Keep the agents: edits later go to the same agent with SendMessage, since it already knows its clip.

## Edits

Apply the change, re-render, re-mix, re-check, re-open the preview. When a change is a new general preference, add it to the house rules above (this file, not only Claude's memory, so it travels with the folder when it is copied to another machine).
