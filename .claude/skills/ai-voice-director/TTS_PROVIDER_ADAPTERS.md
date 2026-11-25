# TTS Provider Adapters

The direction file is provider-neutral. An adapter maps it to what a provider **actually documents**
(research/C_tts_ser_qc.md, docs read 2026-11-24). Never assume a provider supports SSML, emotion tags or pitch numbers
because another one does. Keys → RESEARCH_SOURCES.md.

## 0. Capability matrix (documented facts only)
| provider | natural-language style | SSML prosody | emotion/style tags | phoneme / lexicon | Thai | multi-speaker |
|---|---|---|---|---|---|---|
| **Gemini API** (AI Studio) — *used by this project* | yes — `style` field; this project uses a prompt preface | not documented | ~40 inline vocalisation tags in `<angle brackets>`, CAPS emphasis, `\|backchannel\|` | not documented | yes on 3.8 Flash TTS; **not** on 3.8 Flash-Lite | ≤ 2 speakers per request (prebuilt voices) |
| Google Cloud Gemini-TTS | yes — `prompt` field | not documented | `[square-bracket]` tags; some get read aloud | not documented | th-TH GA | yes (3.1 Flash, 2.5 Flash/Pro) |
| Google Cloud TTS (standard voices) | no (preview `google:style`: apologetic, calm, empathetic, firm, lively) | rate / pitch (st or %) / volume, emphasis, break | — | phoneme ipa / x-sampa | not checked | `<voice>` switching |
| Azure Speech | no | SSML prosody, emphasis | `mstts:express-as` style + styledegree 0.01–2 + role (voice subset) | phoneme, lexicon | 3 standard th-TH voices (no styles); 4 HD male voices with 10 styles | several `<voice>` |
| Amazon Polly | no | partial prosody; no emphasis on neural/generative | newscaster only | phoneme | **no Thai** | — |
| ElevenLabs v3 / v4 | via context + tags | no break tags on v3/v4 | `[tag]` audio tags | PLS/TXT dictionaries; phoneme tags only on flash_v2 | yes (v3, v4) | Text to Dialogue API |
| OpenAI gpt-4o-mini-tts | `instructions` | — | — | — | via Whisper language list, tuned for English; **models scheduled to shut down 2027-01-06** | — |

## 1. Gemini (default) — `tools/to_gemini.py`
**What the project has proven** (story-clips, kits, memory): prompt preface "Read … like …" + text, prebuilt voice in
`speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName`, models `gemini-2.5-flash-preview-tts` and
`gemini-3.1-flash-tts-preview`, 24 kHz mono 16-bit PCM. Free tier ≈ 10 requests/model/day for this account; a whole
scene in one request ("pause two seconds between lines") then split by silence saves quota.

**What the docs say (2026-11-24)** [GeminiTTSDocs]: models 3.8 Flash TTS / 3.8 Flash-Lite TTS / 3.1 Flash TTS preview /
2.5 Pro preview; `gemini-2.5-flash-preview-tts` was **not listed** any more — check before using it. Turn-level emotion,
pace, volume belong in `style`; inline tags only for vocal events and pauses (`<sigh>`, `<breath>`, `<gasp>`,
`<laugh>`, `<whispering>`, `<short pause>`, `<long pause>` …); CAPS = emphasis; don't put accent changes in style;
test with an empty style first. Cloud Gemini-TTS warns that some tags are spoken aloud [Google-CloudGeminiTTS].

**Mapping**
| direction field | Gemini (prompt mode) | Gemini (tags mode) |
|---|---|---|
| character (bible) | "Character: …; age …" in the preface | same |
| scene.situation, analysis.goal | "Situation: … Goal: …" | same |
| direction | "Direction: …" (actor note, verbatim) | same |
| emotion.primary + intensity | "Feeling: <name> — voice <voice_quality>; energy …; pace …" from EMOTION_LIBRARY.json ("very subtle" < 0.3, "strong" > 0.75). The entry's `gemini_style` is scene-specific — use it only when the scene matches | same |
| emotion.secondary / transition_to | "Underneath: …" / "Shift to … at \"word\"" | same |
| emotion.masked_by | "On the surface: X; the real feeling only leaks through." | same |
| prosody.* | words ("a little slower than normal", "breathy", "letting the end fall softly") | same |
| pauses | "…" (≥ 300 ms) or "," | `<short pause>` (< 600 ms) / `<long pause>` |
| nonverbal | words ("sigh before speaking") | `<sigh>`, `<gasp>`, `<breath>`, `<throat-clearing>`, `<tsk>` |
| emphasis | "lean on 'X'" (Thai: never CAPS) | CAPS only for Latin words |
| Thai lines | + "Natural Central Thai; keep every word's tone; final particles light and short; unreleased final stops." | same |
| spoken_text | sent instead of text (after thai_normalize.py) | same |
| voice | one fixed prebuilt voice per character | same |

Multi-speaker scenes: ≤ 2 prebuilt voices per request; for 3+ characters render per line (default) or per pair and
join in the edit. Keep one model for the whole clip (mixing models changes the voice).

## 2. SSML providers (Azure / Google Cloud standard / Polly) — mapping table (no tool yet)
| direction | SSML (W3C_SSML11) | provider notes |
|---|---|---|
| pitch_baseline slightly_higher / higher / much_higher | `<prosody pitch="+1st">` / `+3st` / `+5st` (lower = negative) | Google: st or %; Polly neural: partial |
| pitch_range narrow / wide | `<prosody range="-30%">` / `+30%` | not on every engine |
| rate slow … fast | `<prosody rate="85%">` … `115%` (very = 75% / 130%) | |
| loudness soft / projected | `<prosody volume="-4dB">` / `+3dB`; whisper → Azure style `whispering`, Polly `amazon:effect` (standard voices only) | |
| pauses | `<break time="450ms"/>` | ElevenLabs v3/v4: no breaks — use "…" |
| emphasis | `<emphasis level="moderate">` (Thai: prefer `<prosody duration>`/rate on the word) | Polly neural: no emphasis |
| emotion | Azure `<mstts:express-as style="sad" styledegree="0.6">` only for voices that list the style; th-TH HD voices: adventurous, caringempathy, curious, encouraging, excited, friendlycheerful, nostalgic, reflective, saddisappointed, serious | invalid style → element ignored |
| pronunciation | `<sub alias="…">`, `<phoneme alphabet="ipa" ph="…">`, PLS `<lexicon>` | Thai IPA support not verified per engine |

## 3. ElevenLabs (v3/v4) — mapping (no tool yet)
Emotion through context sentences and `[tags]` ([whispers], [sighs], [laughs], [sarcastic], [curious], [excited],
[crying]); pacing through "…" and punctuation; stability lower = more expressive, higher = more consistent; narrative
emotion text may be spoken aloud — trim [EL-v3Prompting, EL-Controls, EL-Settings].

## 4. Post-processing (all providers)
1. Trim edge silence to ≤ 0.15 s, keep internal pauses.
2. Loudness: normalise each line to the same speech loudness for the clip (the project's mix scripts: `kits/2026-09-28_huahin-anantara/audio/mix.sh`), peak ≤ -1 dBFS.
3. Room/FX (reverb for a ghost, phone EQ) is added in the mix, never requested from the TTS.
4. Run `tools/qc.py`; re-roll lines individually (stochastic models give a different rhythm each take — 2–4 takes, pick by ear) [Kim2021, EL-Settings].
