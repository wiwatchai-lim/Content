Files consulted: [hidden for blind judging]

# C7 — Mix report, IG Reel "Hua Hin UV" export_v3 (critique)

Critic: inline (not independent; no audio file to measure, so I judged the numbers as reported). Verdict: **fail**.

**What it is:** the editor's measurements of a VO + music Reel and a "ship it" verdict.

| # | Location | Problem | Why | Fix | Severity |
|---|---|---|---|---|---|
| 1 | Music source | A "trending TikTok sound" ripped from a downloader is used in the export. | It is unlicensed commercial use of copyrighted music. Label and hit songs are not used in commercial work, and in-app sounds can't be pulled out for other uses (MUSIC_DIRECTION §5; copyright/licence = critical, critic rule 2). | Replace it with CC0/CC BY (credited) music, our own `tools/soundtrack.py`, or pick the sound inside the IG app at posting. Log title, link, licence and date in the kit. | critical |
| 2 | True peak | +0.8 dBTP, with audible clipping on the plosive at 0:07. | The target is ≤ −1.5 dBTP and never above −1.0 (MIX_PLAYBOOK targets; QC "True peak: ผิด = ต้องแก้"). Overs distort further after AAC encoding. | Fix the plosive at the stem (HPF around 80 Hz on the VO, clip-gain or de-plosive the "บ้า" at 0:07), then use a true-peak-aware ceiling of −1.5 dBTP and re-measure with `ebur128=peak=true`. | critical |
| 3 | Integrated loudness | −6.2 LUFS. | The social target is −14 LUFS ±1 (QC pass −15 to −13). IG/YouTube normalise loud files down, so the extra loudness buys nothing and costs dynamics (MIX_PLAYBOOK platform table). | Normalise to −14 LUFS (MIX_PLAYBOOK §5c: gain + limiter, re-measure). | major |
| 4 | Dynamics | 9 dB gain reduction on the master limiter. | That is over-compressed: LRA will be < 3 LU ("บีบเกิน" warning), with pumping and fatigue, and it is the cause of #2 and #3. | Get the balance from the stem levels (VO about −18 to −16 LUFS, bed about −30 to −26 under VO). Limit only 1–3 dB on the master. | major |
| 5 | VO vs music | Music only −2 dB under the VO, with no ducking. | VO-to-bed LD should be ≥ 10 LU while speaking (MIX_PLAYBOOK §3; MUSIC_DIRECTION §4; QC "ผิด = ต้องแก้"). Thai health information needs to be intelligible. | Use sidechain or timed ducking of 10–12 dB, 100–200 ms down before each line and 300–600 ms back up. Let the music rise in gaps > 1.5 s. | major |
| 6 | Verdict | "loud = better on phone, ship it". | Platforms turn loud uploads down, and the QC table marks LUFS, TP and LD failures as must-fix. The playbook requires a mono check and a real phone listen at low volume before shipping (§8 step 9). | Don't ship. Fix #1–#5, run the §7 QC list (ebur128, mono fold, LD), then listen on a phone. | major |
| 7 | Sample rate | VO 24 kHz, music 44.1 kHz, export 44.1 kHz. "Without dither notes" mixes up dither (bit depth) and resampling. | The master should be 48 kHz, with all stems converted to 48 kHz first (MIX_PLAYBOOK targets and §8 step 1). Gemini VO at 24 kHz is fine as a source once it is resampled with a good SRC. Dither only matters on the final bit-depth reduction. | Convert all stems to 48 kHz (soxr) and export 48 kHz AAC ≥ 192 kbps. Dither only when going to 16-bit. | minor |

**What is good:** The editor measured the right things (integrated LUFS, true peak, LD, sample rates, gain reduction) and found the exact problem point (the "บ้า" plosive at 0:07). That location makes the fix quick. VO over a music bed is the right structure for this Reel.

**Top 3 fixes:** replace the ripped song with licensed or own music; fix the 0:07 plosive and bring TP ≤ −1.5 dBTP; re-master to −14 LUFS with light limiting and ≥ 10 LU ducking under the VO.
