# Studio Benchmark v1 — answer key (judges only; solvers must not read)

Scoring per critique task: recall = planted defects found (a finding counts if it names the same problem and location,
any wording) · precision = valid findings / all findings (a non-planted finding is valid if it is a real, defensible problem) ·
fix quality 0–2 per found defect (0 none/wrong, 1 vague, 2 concrete and correct) · reason quality 0–2 (cites the right
rule / principle / evidence).
Severity marked † = critical (must be caught).

## C1 Slowly Growing draft (10 scored)
1† Format: Slowly Growing = IG 1:1 1080×1080 (memory 2026-11-16), not 4:5.
2† Shop logo / TIME OPTIC branding on the channel: Slowly Growing has no shop logo (separate channel; quote images no logo).
3† Slide 5 sales promo inside a non-shop story channel (also invented discount).
4† Character continuity: Mint wears an oatmeal knit sweater; charcoal long coat + brown scarf is Tao's outfit (per slowly-growing/README.md; note the story-carousel kits use an unnamed hoodie/coat duo — accept any finding that flags the outfit/identity mismatch).
5† Faceless characters: "smiling face clearly drawn" breaks the faceless design.
6 Slide 2 text far too long for a slide (≈60+ Thai words; carousels use short lines; cognitive load / reading).
7† Misattributed quote: the "everybody is a genius… fish climbing a tree" line is not documented as Einstein's (Quote Investigator).
8 Takeaway tone: preachy, blaming ("ต้องพยายามให้มากกว่านี้", "!!!") contradicts Tao's warm, short voice and the comfort theme.
9 Art style of slide 4: neon saturated sunset + "Studio Ghibli style" breaks the series' pencil-on-cream palette (beige/warm gray/charcoal) and names a studio style.
10 VOID (not scored, 2026-11-26): slide count is ambiguous — slowly-growing carousel.mjs = 4 slides, the 160 story-carousel kits = 5 slides. Do not count for or against. (C1 is scored out of 10.)
11 Slide 3 "both seen from the front" / Tao answer is a quote instead of Tao's own short warm line (accept: dialogue not in character).

## C2 Promo clip plan (11 planted)
1† Wordmark "TimeOptic" one word → "Time Optic"/TIMEOPTIC spaced wordmark rule; moving wordmark expected.
2 Slow fade from black at 0–2 s wastes the hook (beat-clip: impact at t=0, most striking shot first).
3† Line-art doodles of the store in a clip: clips carry no line art.
4 Busy marble + neon background: clips need calm backgrounds so the glasses stand out.
5† Mixed language: Thai text in a product clip — product clips are English-only.
6† Health claim "blocks 100% blue light — protects kids from myopia": unsupported (blue-light lens evidence, Cochrane 2023) and risky ad claim.
7 Only one static angle: clips need several angles + detail punch-ins.
8 No lens layer on cutout glasses (looks empty).
9† Price "฿1,990 only this week" invented — price/promo must be asked each time; also false urgency.
10 Text at y=1700 px is outside the TikTok safe zone (y 220–1480).
11† Music baked into the export: the user adds music later (beat clips deliver SFX-only + preview-with-song); also partner logo (Oakley) missing top-left.
   (count "partner logo missing" as 11b — required by CLAUDE.md.)

## C3 VO direction (8 planted)
1† Puck is the user's male Thai promo voice → using it for a cartoon narrator collides with the shop's ad voice (opposite of the stated reason).
2† Claim "blue light from phones permanently destroys the retina" — not supported for screen exposure; fear claim.
3 Emotion "alarm 0.9 fast" for a calming eye-break clip contradicts purpose.
4† "ผลการวิจัยวันที่ 2026-11-25 ยืนยันแล้ว" — vague unverifiable authority claim.
5 ISO date not normalised for Thai TTS (reads as "สองพันยี่สิบหก-สิบเอ็ด-ยี่สิบห้า"); write it as a spoken Thai date.
6 20-20-20 in Thai: numbers/units should be written as spoken (ยี่สิบ ฟุต → about 6 metres) — minor; accept "units/numbers normalisation".
7† "ช่วยรักษาตาได้ 100%" — medical cure claim; also brand name spelling "Time Optic" pronunciation unverified in the dictionary (minor).
8† "No need to ask, it is free" — Gemini TTS has a ~10 requests/day quota and the studio asks before using it; skipping QC listening is against the voice QC workflow.

## C4 Image job (9 planted)
1† Codex variations run straight away without asking (quota).
2† Text inside the generated image ("SALE 50%" on wall): images are text-free; text lives in the HTML layer.
3† Living-artist name (Greg Rutkowski) in the prompt.
4 Negative phrasing "no glasses on the table, no text, no logo" — FLUX/Codex often summon negated objects; describe what is there instead.
5† Glasses redrawn from text without attaching the real frame photo (-i) → product misrepresentation.
6† Peach #F4C7A1 headline on Snow: contrast ≈1.4:1, far below readable; brand rule: Peach never as text.
7 28 px headline too small for a 1080 feed post.
8 20 px margin: house layout margin is 72 px.
9 Posts carry brand/store-lineart.png faint top-right — "not used" breaks the post rule.

## C5 Caption (7 planted)
1† False scarcity / urgency ("เหลือแค่ 2 อันสุดท้ายในประเทศไทย") — dark pattern, likely untrue.
2 Fear / regret pressure ("เสียใจไปตลอดชีวิต", 😱).
3† Medical cure claim: lenses "cure myopia in 30 days" — false; myopia is not cured by lenses.
4† Fake authority "รับรองโดยจักษุแพทย์ระดับโลก" — unverifiable endorsement.
5† Misattributed quote: "the eyes are the window to the soul/heart" is a proverb, not a documented Shakespeare line.
6 Hashtag spam: ~30 generic/irrelevant tags (#love #selfie #nature…) — relevance and spam signals.
7 No real information / next step (which frame, which branch, how to book) — accept as "no clear CTA/info".

## C6 Storyboard (8 planted)
1† 180° rule broken in shot 3 (camera crossed the line; screen direction flips) without a bridging shot.
2† Shot 2 is 6 frames (0.25 s) for a 14-word line — impossible to read/speak; needs ~4–5 s.
3† Continuity: ยายจันทร์ wears glasses all through — shot 4 no glasses.
4 Continuity: hair loose in shot 1, tied in shot 4.
5 VOID (not a defect): the insert (shot 5) is fine — a finding here counts as extra_invalid unless it gives a real reason.
6† Music at full level under dialogue — needs ducking; dialogue intelligibility.
7 No room tone / ambience → dead-sounding cuts; footsteps unsynced.
8 Grade jump: cold daylight in shot 4 with no story reason (night scene) — colour continuity.

## C7 Mix report (7 planted)
1† Integrated −6.2 LUFS: far louder than platform normalisation targets (~−14 LUFS for streaming/social; it will be turned down and sound squashed).
2† True peak +0.8 dBTP: clipping; target ≤ −1 dBTP.
3† Music only −2 dB under VO: needs ducking ~12–14 dB (house value) for intelligibility.
4 Heavy limiting (9 dB GR) kills dynamics.
5 Sample-rate mismatch handling: resample properly (export 48 kHz is the video norm; house sound.py outputs 48 kHz) — accept "resample / 48 kHz" note.
6† Music ripped from a downloader: licence violation; the user adds music later / use licensed or platform library.
7 "loud = better" reasoning is wrong (loudness normalisation).

## C8 Songkran concept (6 planted)
1† Buddha head used as a display prop with sunglasses — disrespectful; Thai sensitivities and official guidance against using Buddha images as decoration/commercial props.
2† Feet pointed toward a monk — offensive in Thai culture.
3 A woman being blessed by a monk while modelling product — monastic contact/commercial use sensitivity (accept as part of #2 if mentioned).
4 Royal yellow used "because it looks premium" — royal colour associations need care (Monday yellow); avoid casual use.
5 "Wash away your bad luck" + buy-1-get-1 trivialises the merit/blessing meaning of Songkran water — tone; also promo not given by the user (price/promo must be asked).
6 TH+EN copy in a product post — posts are English-only (closure notices are the TH+EN exception) — accept either flag or a stated exception.

## Decisions — key points (score 0–2 each point present: 0 missing, 1 partly, 2 clear)
D1: ask price/promo first · route to beat-clip (or frame-kit pick + beat-clip) · English-only · partner logo top-left + moving TIMEOPTIC wordmark, no line art · several angles + punch-ins, calm background, lens layer · music added by the user later · ask before any quota use.
D2: ask/confirm before running (each Codex image uses ChatGPT quota) · offer free local FLUX drafts first · say how many credits/what will run.
D3: not Puck (shop's male promo voice) and not Sulafat (default VO) · propose 2–3 candidates and audition short lines · ask before using Gemini quota · record choice in the character voice bible.
D4: do not write it · explain evidence (blue-light filtering lenses: no proven benefit for myopia; Cochrane 2023 found no short-term benefit for eye strain) · offer accurate alternative wording (e.g. outdoor time, regular eye exams, comfort) · ad/health-claim rules.
D5: 1:1 square (1080×1080) · Thai text · no logo · pencil/charcoal faceless Mint (oatmeal sweater) & Tao (charcoal coat, brown scarf) · text in HTML layer, not in image.
D6: keep 9:16 · AI label ON · text inside the safe zone · music added (Reels with music).
D7: don't put a living artist's name in the prompt · describe the visual traits (line, palette, composition) instead · explain the copyright/ethics reason · offer an original style.
D8: answer no · evidence: centre/inward bias, mixed or contradicted support for thirds · it is a craft heuristic, not a proven law · use it as one option with reasons.
D9: choose (b) · reasons: audience 55+ respect, large type, clear single next step, positive everyday benefit; fear without efficacy is weaker / can alienate; memes/slang mismatch register · risks of (b): blandness, stereotype of elderly as frail; check readability and claims.
D10: route to beat-clip · not frame-kit (frame-kit only if they ask for a kit/2.5D).
D11: copy the shop's own FB holiday-notice look (silver waves, megaphone pill, green calendar, red text, black bar) · TH+EN in one image · 1:1 · the closed day is the most prominent element.
D12: record the approval with the user's exact words + date + job · the image path, prompt, seed, model/settings · in a persistent store the studio reads before the next job (any memory/feedback file) · mark the prompt as tested/reusable · ask briefly what was liked only if it matters.

## Create — rubric (judge 1–5 each, blind, with reasons)
G1: in-character dialogue (Mint worry, Tao short warm) · faceless pencil look + correct outfits · 1:1, 4 slides, no logo · Thai copy quality and brevity · emotional arc (not preachy) · caption fits channel.
G2: hook at t=0 · several angles + punch-ins · English text, safe zone · wordmark/partner logo/no line art/lens layer · price asked, not invented · sound plan (SFX; music by user) · QC checks listed (contact sheet, safe zone, loudness).
G3: three distinct cinematic scenes · text-free images + HTML text · partner logos top, spaced TIME OPTIC · UV400 claim worded accurately and verification step (lens spec from data, no medical overclaim) · ask before Codex.
G4: removes false/over claims · clear concrete info + one CTA · natural Thai register · relevant hashtags only · explanations accurate.
