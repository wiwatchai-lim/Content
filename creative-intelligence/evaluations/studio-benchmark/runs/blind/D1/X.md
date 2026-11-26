Files consulted: [hidden for blind judging]

**What I do first:** "a clip of glasses" goes to the `beat-clip` skill. Before building anything I ask the user three short questions in Thai:
1. Which Ray-Ban model and colour exactly? "ตัวใหม่" is not in our data, and only models and colours in `data/frames/frames-stock-*.csv` may be used. The stock list has RB2140, RB3279, RB3447V, RB3774VD, RB4457D and others.
2. Is there a price or promo for this clip? There is no price file, so I never invent a price or reuse an old one.
3. Any song or mood they want? If not, I pick one from `music/songs.md` that hasn't been used recently.

Then I verify photos of that exact model and colour (≥ 980 px; web photos only if verified, logged in `_check/*.csv`) and pair a lens and coating using the daily-post pairing rules (sunglasses get no prescription lens). `brand/partner-logos/` has no Ray-Ban file, so I get the official logo before rendering.

**Rules for the clip:**
- 1080×1920, 10–15 s on a beat grid. Start from an approved kit's `hf/index.html` (the privatejet machinery, hyperframes@0.8.59).
- Hook: frame 0 is the most striking detail, slammed in with impact-bass. No slow fade. Hard cuts on the beat, several angles, one detail punch-in per beat.
- Calm background so the glasses are the hero. Lens layer on every cutout.
- Ray-Ban logo top-left (64/64 px, explicit width and height) for the whole clip. The moving TIMEOPTIC wordmark (spaced) ends big in the centre: colour on light grounds, white on dark. No storefront line art.
- English only. Text only from `data/`. All type inside the safe zone x 60–940, y 220–1480.
- The upload file has SFX only; the user adds the song in TikTok.
- Checks before handing over: `hyperframes check` with 0 errors, then a contact sheet with the safe-zone box, read with Read. I say that I cannot hear the audio.
