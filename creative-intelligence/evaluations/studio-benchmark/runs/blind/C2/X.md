Files consulted: [hidden for blind judging]

# C2 — Promo clip plan, TIME OPTIC × Oakley OX8208 (critique)

Critic: inline (not independent). Verdict: **fail**.

**What it is:** a 15 s 9:16 promo for an Oakley optical frame, laid out as intro logo → hero shot → claim text → static cutout → price card, with the song baked in.

| # | Location | Problem | Why | Fix | Severity |
|---|---|---|---|---|---|
| 1 | 5.0–9.0 s text | "Blocks 100% blue light — protects kids from myopia". | This is a false and unsupported health claim. No clear lens blocks 100% of blue light (ZEISS BlueGuard: up to 40%, manufacturer data). Blue-light lenses have no evidence for myopia. Myopia control is a separate lens class (DIMS/HAL), and even those only "ช่วยชะลอ". "Protect retina from blue light" is a banned phrase (FACT_CHECK §4). Targeting "kids" also implies a health attribute of the viewer (Meta personal-attributes rule, ETHICS §6). The frame itself makes no lens claim. | Remove the claim. Show a product fact the user confirms, e.g. the model name and colour. Any lens claim needs the lens the user names and the safe wording from claims_library. | critical |
| 2 | 12–15 s price card | "฿1,990 only this week!" was invented. | Ask for the price/promo every time a promo clip is made; there is no price file (CLAUDE.md; tas-20260925-003). An unverified "this week" is false urgency (ETHICS §1.2). | Ask the user for the price and the real end date. Leave the card empty until then. | critical |
| 3 | 12–15 s position | The price card sits at y = 1700 of 1920. | It is under the TikTok/Reels caption UI. The safe zone is x 60–940, y 220–1480 (beat-clip "TikTok UI safe zone"; STUDIO_RULES). | Move the card into the safe box, around y 1150–1400. | major |
| 4 | 0–2 s | A slow fade-in from black with a centred static logo and a soft piano intro. | Hook rule: "never open with a slow fade". Frame 0 is the most striking shot, slammed in with an impact (beat-clip "Hook opening"). | Open on a detail close-up, such as the Oakley temple icon or the hinge, with a flash and a shake on the first beat. | major |
| 5 | 0–2 s logo | It is written "TimeOptic" and placed as a centred card. | The brand name is "Time Optic" (two words) or the spaced TIMEOPTIC wordmark, and in clips the wordmark moves (rises into its box with a Peach shine) (bra-20260925-001; tas-20260925-001). | Use `brand/logo/` with the spaced wordmark and the moving-wordmark animation near the end. | major |
| 6 | 2–5 s background | A busy marble-and-neon background with floating store line-art doodles. | Clips need calm backgrounds so the glasses stand out, and clips have no store line art (CLAUDE.md, 2026-09-25; tas-20260925-001). | Use a calm, low-contrast background in one hue family. Remove the line art. | major |
| 7 | 5–9 s text | Thai "แว่นสวย ราคาดี". | Product clips are English-only (CLAUDE.md; tas-20260925-002). Thai is only for the named series. | Write it in English, short, inside the safe zone. | major |
| 8 | 9–12 s | One static front shot "(only angle available)". | Clips need several angles plus detail punch-ins, hard cuts on the beat, and no long static holds (beat-clip "Many angles"). The kit already has 2 photos (`photos/OX8208-0552_1.jpg`, `_2.jpg`), and missing angles should be sourced as real photos of the same model and colour. | Use both photos plus punch-ins (hinge, temple logo, end piece). Find more angles of the same model and colour. | major |
| 9 | 9–12 s | Cutout with an empty lens area (no lens layer). | Cutout glasses in clips get a lens layer so they don't look empty (CLAUDE.md). `layers/OX8208-0552_1_lens.png` already exists. | Add the lens layer to every cutout. | major |
| 10 | Brand logo line | "Oakley logo not used". | The frame brand's logo sits top-left (64/64 px) for the whole clip (CLAUDE.md; beat-clip "Brand logo"). | Use `brand/partner-logos/oakley.*` at the top left with explicit width and height. | major |
| 11 | Audio | "Final song mixed into the export so the user doesn't have to add music". | Music is added later by the user. The upload file is SFX only, plus a preview with the song (tas-20260925-004; beat-clip §1). A baked-in song also raises licensing issues on a commercial post (MUSIC_DIRECTION §5). | Export SFX only plus a separate preview with the song. The user adds the sound in the app. | major |

**What is good:** 9:16 and 15 s are the right format. One frame per clip with a clear hero (OX8208) is correct. Ending on a price card is the right structure once the price is real.

**Top 3 fixes:** remove the blue-light/myopia claim; ask for the real price and move it into the safe zone; rebuild it as a hook-first, multi-angle clip with a lens layer, the Oakley logo top-left, a calm background, no line art and no baked-in song.
