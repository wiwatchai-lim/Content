# Audio Analysis

`tools/analyze_audio.py` measures a take with Praat through Parselmouth [Praat, Jadoul2018] plus NumPy. Definitions
follow GeMAPS where possible [Eyben2016]. The numbers describe the **sound**, not what the speaker felt — never infer
a real person's emotion from them, and treat them as indicators that guide listening.

## 1. Measures
| measure | how | use in this skill | limits |
|---|---|---|---|
| F0 mean / median (Hz, semitones re 100 Hz) | Praat autocorrelation pitch; floor/ceiling set from a first pass (quartiles) | pitch level vs the character's baseline (compare in st, not Hz) | octave errors on creaky / whispered speech |
| F0 range p5–p95 (st), F0 SD (st) | percentiles of voiced frames | narrow ↔ wide melody | Thai tones add range by themselves: compare within one voice and similar text length |
| final movement (st) | mean of last 3 vs first 3 voiced frames in the last 300 ms | ending rise / fall | **Thai: the final particle's own tone dominates** (see §4) |
| intensity mean / SD (dB) | Praat intensity (clamped ≥ 0 dB) | relative effort; TTS output is normalised, so small differences only | not loudness in LUFS |
| pauses | frames 25 dB below the 95th percentile, ≥ 150 ms, inside the speech | count / total / positions vs directed pauses | Thai stop closures + "…" both count |
| speech rate, articulation rate (syl/s) | syllable nuclei = intensity peaks ≥ 2 dB above neighbouring dips, voiced, above median (after de Jong & Wempe's Praat script idea; not a re-implementation of it) | rate vs baseline | over/under-counts diphthongs and clusters; use ratios, not absolutes |
| HNR (dB) | Praat harmonicity (cc) | breathy / rough ↔ clear | defined for sustained vowels; rough indicator on running speech [Praat-Manual] |
| jitter, shimmer (local %) | Praat PointProcess | tremor / roughness indicator | meant for sustained vowels; unreliable on running TTS speech [Praat-Manual] |
| F1 / F2 mean (Hz) | Burg formants (5000/5500 Hz ceiling by F0) | articulation / smile (F2 up) cues | vowel content dominates; same-text comparisons only |
| alpha ratio, Hammarberg index (dB) | energy 50–1000 vs 1–5 kHz; max peak 0–2 vs 2–5 kHz | spectral balance: lower values = tenser / louder, higher = softer / breathier (general tendency) [Eyben2016 definitions] | depends on recording chain |
| peak dBFS, clipping %, edge silence | waveform | technical QC (5 points) | — |

## 2. Relative labels (vs a baseline take of the same voice)
`--baseline neutral.wav` converts differences into the schema's labels so a take can be checked against its direction
(`follows_direction`): pitch ±0.75 / 2 / 4 st; range ratio 0.55 / 0.8 / 1.25 / 1.6; articulation-rate ratio 0.72 / 0.85 /
0.95 / 1.05 / 1.15 / 1.3. One step off = acceptable, two or more = listen and probably re-direct. Thresholds are
working values chosen for this skill [craft], not published norms.

## 3. Real measurements in this project
`research/ep01_analysis.csv` — 27 lines of ร้านแว่นตีสอง EP01 (Gemini 3.1 flash TTS, voice Charon):
F0 means 109–143 Hz, range 9–17 st, articulation rate 3.1–6.4 syl/s, HNR 12.5–19 dB, peaks ≈ -2.7 dBFS.
`research/ep01_qc_auto.json` — automatic QC of 9 retro-annotated lines (QUALITY_CONTROL.md §5).

## 4. Thai-specific cautions
- The last syllable is often a particle with its own tone (ครับ/คะ/นะ/จ๊ะ high, ไหม rising, ค่ะ falling). Measured on EP01:
  lines ending in high/rising particles measured as "rise" even where a soft fall was directed. Judge the ending on the
  last **content** word (cut the particle with the pause list or by ear) [finding: Pittayaporn2007 for particles carrying boundary tones; measurement craft].
- F0 range includes lexical-tone movement: a line full of falling/rising tones has a wider range at the same emotion.
  Compare takes of the **same text** (re-rolls) or use long passages for baselines.
- Do not use the analyser to check tones — use a native listener and the ASR check (`qc.py --asr`).

## 5. Emotional speech datasets — what we may and may not use
| dataset | language | licence / use | note |
|---|---|---|---|
| RAVDESS [Livingstone2018] | English (acted) | CC BY-NC-SA 4.0 (commercial licence sold separately) | reference listening / research only, not in shop content |
| CREMA-D [Cao2014] | English (acted) | Open Database License | study material |
| IEMOCAP [Busso2008] | English (acted, dyadic) | academic release form; not for commercial use (licence text not read) | don't use |
| MELD [Poria2019] | English (TV dialogue) | repo GPL-3.0; underlying *Friends* audio is third-party copyright | don't use the audio |
| ESD [Zhou2022] | English + Mandarin | research only, licence form | don't use commercially |
| THAI-SER [WongpithayadisaiEtAl2025] | **Thai** (acted, 200 actors, 5 emotions) | CC BY-SA 4.0 per paper (a thesis page shows BY-NC-ND) — check the official licence file | the only sizeable Thai corpus; good for building Thai baselines per emotion if the licence fits |

Nothing from these datasets is stored in this skill. Before analysing any dataset audio, read its licence again and
record the decision in CHANGELOG.md.
