# C — Speech technology: expressive TTS, provider controls, emotional speech data, analysis tools, quality evaluation

Research scope C for the `ai-voice-director` skill. Accessed 2026-11-24. Follows `_BRIEF.md` honesty rules.

**How to read this file**
- "Accessed" says what was actually read: **full text**, **abstract only** (arXiv/publisher abstract page), **docs page** (official documentation, current version on the access date), **catalogue only** (standards body listing: title, version and status, no content), or **bibliographic only** (citation details confirmed through search or indexing, not read).
- Provider docs change often. Everything under "Provider docs" describes the page **as of 2026-11-24**. Re-check before you rely on a model name or limit.
- The new keys below use the AuthorYear or Org-Doc format. Content agents may cite only the keys listed in `_BRIEF.md`. These keys are for skill reference and QC files.

---

## 1. Expressive TTS research: what control each approach gives

| key | title | authors / venue | ID | accessed |
|---|---|---|---|---|
| Shen2018 | Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions (Tacotron 2) | Shen, Pang, Weiss, Schuster, Jaitly, Yang, Chen, Zhang, Wang, Skerry-Ryan, Saurous, Agiomyrgiannakis, Wu. ICASSP 2018 | arXiv:1712.05884 | abstract only |
| Wang2018 | Style Tokens: Unsupervised Style Modeling, Control and Transfer in End-to-End Speech Synthesis (GST) | Wang, Stanton, Zhang, Skerry-Ryan, Battenberg, Shor, Xiao, Ren, Jia, Saurous. arXiv 2018 (the arXiv page lists no venue; usually cited as ICML 2018, **not verified here**) | arXiv:1803.09017 | abstract only |
| SkerryRyan2018 | Towards End-to-End Prosody Transfer for Expressive Speech Synthesis with Tacotron | Skerry-Ryan, Battenberg, Xiao, Wang, Stanton, Shor, Weiss, Clark, Saurous. arXiv 2018 (no venue on the page) | arXiv:1803.09047 | abstract only |
| Ren2021 | FastSpeech 2: Fast and High-Quality End-to-End Text to Speech | Ren, Hu, Tan, Qin, Zhao, Zhao, Liu. ICLR 2021 | arXiv:2006.04558 | abstract only |
| Kim2021 | Conditional Variational Autoencoder with Adversarial Learning for End-to-End TTS (VITS) | Kim, Kong, Son. ICML 2021 | arXiv:2106.06103 | abstract only |
| Schroder2001 | Emotional Speech Synthesis: A Review | M. Schröder. Eurospeech 2001, Aalborg, vol. 1, pp. 561–564 | ISCA archive schroder01b_eurospeech; PDF cs.columbia.edu/~julia/papers/schroeder01.pdf | **full text** |
| Zhou2022 | Emotional Voice Conversion: Theory, Databases and ESD | Zhou, Sisman, Liu, Li. Speech Communication 137 (2022) 1–18 | doi:10.1016/j.specom.2021.11.006; arXiv:2105.14762 | abstract only (the DOI comes from a library record found by search) |
| Zhou2021 | Seen and Unseen Emotional Style Transfer for Voice Conversion with a New Emotional Speech Dataset | Zhou, Sisman, Liu, Li. ICASSP 2021, pp. 920–924 | doi:10.1109/ICASSP39728.2021.9413391 (from a researchr BibTeX entry); arXiv:2010.14794 | bibliographic only |
| Guo2023 | PromptTTS: Controllable Text-to-Speech with Text Descriptions | Guo, Leng, Wu, Zhao, Tan. Submitted to ICASSP 2023 | arXiv:2211.12171 | abstract only |
| Yang2023 | InstructTTS: Modelling Expressive TTS in Discrete Latent Space with Natural Language Style Prompt | Yang, Liu, Huang, Weng, Meng. Submitted to IEEE/ACM TASLP | arXiv:2301.13662 | abstract only |
| LythKing2024 | Natural language guidance of high-fidelity text-to-speech with synthetic annotations (Parler-TTS method) | Lyth & King. arXiv 2024 (no venue listed) | arXiv:2402.01912 | abstract only |
| HF-ParlerTTS | Parler-TTS repository | Lacombe, Srivastav, Gandhi (Hugging Face) 2024 | github.com/huggingface/parler-tts | docs page (README) |
| Wang2023 | Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers (VALL-E) | C. Wang, S. Chen, Y. Wu et al. (Microsoft). arXiv 2023, work in progress | arXiv:2301.02111 | abstract only |

### Usable points (evidence: peer-reviewed or preprint system papers)
- **Shen2018 (Tacotron 2).** A seq2seq model maps characters to a mel spectrogram, and a WaveNet vocoder turns that into audio. It reported MOS 4.53, against 4.58 for professional recordings. *Control:* none beyond the text. It shows that MOS on read-aloud single-speaker English can approach recordings. It does not show that expressive or dialogue speech can.
- **Wang2018 (GST).** A bank of "global style tokens" is learned **without labels**. The tokens control "varying speed and speaking style" independently of the text. The style of one reference clip can be carried over a whole long-form text. *Control:* token weights or a reference clip. Tokens are not named emotions, so someone has to interpret them.
- **SkerryRyan2018.** A latent prosody embedding taken from a **reference recording** makes the output copy the reference's prosody "with fine time detail". This works across speakers and on different text. *Control:* the reference audio, "say it like this". The abstract gives no failure cases.
- **Ren2021 (FastSpeech 2).** Pitch, energy and duration are taken from the waveform. The model trains on the true values and **predicts** them at inference, to deal with the one-to-many text-to-speech problem. *Control:* explicit per-phoneme pitch, energy and duration that can be scaled. This is the clearest research basis for the "pitch / rate / volume" knobs.
- **Kim2021 (VITS).** A stochastic duration predictor produces **different rhythms from the same text**. The paper argues that text can be spoken with "different pitches and rhythms". *Practical:* a re-roll, meaning another generation from the same prompt, is a legitimate way to vary the performance.
- **Schroder2001 (full text).**
  1. Each synthesis method trades flexibility for naturalness. Formant synthesis gives control over many source and tract parameters but sounds robotic. Diphone synthesis usually controls **only F0 and duration**, not voice quality. Unit selection sounds natural but has little flexibility.
  2. Reported success with prosody rules alone is mixed. Some diphone studies got recognition near chance, and how much prosody contributes versus voice quality depends on the emotion and the speaker.
  3. Table 1 gives example rule sets with recognition rates. Joy (German): F0 mean +50%, range +100%, tempo +30%, 81%. Sadness (US English, Cahn scales): lower range, slower, softer, more breathiness, 91%. Anger (British English): F0 +10 Hz, range +9 st, +30 wpm, +6 dB, 'laryngealisation' (creaky voice) +78%. Fear (German): F0 +150%, falsetto, 52%. Boredom (Dutch): duration 150%, 94%.
  4. In animation, human expression features "need to be exaggerated in synthetic expression in order to be believable". Schröder cites Bates 1994 for this.
  5. Typical evaluation is a forced-choice test with semantically neutral sentences. Schröder notes this is closer to discrimination than to identification, and it says nothing about naturalness. He recommends testing perceived naturalness **in an emotion-defining context**.
  6. Most systems model 3–9 extreme emotions. He argues real applications need **less intense** emotions. *Limitation:* written in 2001 and predates neural TTS.
- **Zhou2022 / Zhou2021 (ESD and emotional voice conversion).** The paper reviews emotional voice conversion and emotional speech databases, then introduces ESD (see section 3). It runs several emotional voice conversion systems on ESD as a reference study.
- **Guo2023 (PromptTTS).** One prompt carries **both a style description and the content**. Style is given as plain text, for example "A lady whispers to her friend slowly". The goal is to spare users acoustic knowledge such as pitch values. *Limitation:* the abstract does not list which factors are controllable.
- **Yang2023 (InstructTTS).** It names the problems with fixed category labels (limited diversity) and with reference audio (hard to interpret), then uses free-text style prompts, for example "Sigh tone in full of sad mood with some helpless feeling". It reduces style-speaker and style-content leakage so that the prompt does not change who is speaking.
- **LythKing2024 and HF-ParlerTTS.** Speaker identity, style and recording conditions are **labelled automatically** over 45k hours, and the model is controlled by a natural-language description. The README says gender, speaking rate, pitch and reverberation can be set directly in the prompt, along with expressiveness and background noise. Tips from the README: "very clear audio" gives the highest quality, and commas add small breaks. Licence Apache-2.0. The README's examples are English only and it lists multilingual training as future work.
- **Wang2023 (VALL-E).** Zero-shot cloning from a **3-second** prompt. It "preserves the speaker's emotion and acoustic environment" of the prompt. It was trained on 60k hours of English. *Practical implication:* in prompt-cloned systems, the emotion and room sound of the reference clip carry into the output. Choose reference audio with the emotion you want.

**Summary of control types (synthesis of the papers above):**
1. Fixed labels (emotion classes)
2. Reference audio (GST, prosody transfer, zero-shot cloning)
3. Explicit prosody knobs (FastSpeech 2 pitch, energy and duration; SSML)
4. Natural-language description (PromptTTS, InstructTTS, Parler-TTS, Gemini, gpt-4o-mini-tts)
5. Re-sampling (stochastic duration in VITS)

Gemini TTS, which this project uses, works through type 4 plus inline tags.

---

## 2. Provider documentation (accessed 2026-11-24)

| key | page | URL | accessed |
|---|---|---|---|
| GeminiTTSDocs | Gemini API speech generation | https://ai.google.dev/gemini-api/docs/speech-generation (**now 301-redirects** to https://aistudio.google.com/docs/speech-generation) | docs page |
| Google-CloudGeminiTTS | Cloud Text-to-Speech: Gemini-TTS | https://docs.cloud.google.com/text-to-speech/docs/gemini-tts | docs page |
| Google-CloudSSML | Cloud Text-to-Speech: SSML | https://docs.cloud.google.com/text-to-speech/docs/ssml | docs page |
| W3C_SSML11 | Speech Synthesis Markup Language 1.1, W3C Recommendation 7 Sep 2010 | https://www.w3.org/TR/speech-synthesis11/ | full text |
| Azure-SSMLVoice | Azure Speech: voice and sound with SSML (ms.date 2026-01-30) | https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-synthesis-markup-voice | docs page |
| Azure-LangSupport | Azure Speech language and voice support (TTS tab) | https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts | docs page |
| AWS-PollySSML | Amazon Polly: supported SSML tags | https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html | docs page |
| AWS-PollyVoices | Amazon Polly: available voices | https://docs.aws.amazon.com/polly/latest/dg/available-voices.html | docs page |
| EL-v3Prompting | ElevenLabs: prompting Eleven v3 | https://elevenlabs.io/docs/best-practices/prompting/eleven-v3 | docs page |
| EL-Controls | ElevenLabs: prompting controls (pauses, pronunciation, speed) | https://elevenlabs.io/docs/best-practices/prompting/controls | docs page |
| EL-Settings | ElevenLabs: TTS playground (voice settings) | https://elevenlabs.io/docs/product-guides/playground/text-to-speech | docs page |
| EL-Models | ElevenLabs: models overview | https://elevenlabs.io/docs/overview/models | docs page |
| OpenAI-TTS | OpenAI text-to-speech guide | https://platform.openai.com/docs/guides/text-to-speech (now redirects to https://developers.openai.com/api/docs/guides/text-to-speech) | docs page |

### GeminiTTSDocs (AI Studio / Gemini API page)
- **Models listed:**
  - `gemini-3.8-flash-tts`: single-speaker, multi-speaker, voice design, replication, remixing
  - `gemini-3.8-flash-lite-tts`: same features; described as the replacement for `gemini-3.1-flash-tts-preview`
  - `gemini-3.1-flash-tts-preview`: single- and multi-speaker
  - `gemini-2.5-pro-preview-tts`: single- and multi-speaker
  - **`gemini-2.5-flash-preview-tts`, which this project's `tools/gemini_tts.py` uses, was not in the extracted model list.** Check before assuming it is still served.
- **Prebuilt voices (30, name and descriptor as listed):**

  | voices | | | | | |
  |---|---|---|---|---|---|
  | Zephyr (Bright) | Puck (Upbeat) | Charon (Informative) | Kore (Firm) | Fenrir (Excitable) | Leda (Youthful) |
  | Orus (Firm) | Aoede (Breezy) | Callirrhoe (Easy-going) | Autonoe (Bright) | Enceladus (Breathy) | Iapetus (Clear) |
  | Umbriel (Easy-going) | Algieba (Smooth) | Despina (Smooth) | Erinome (Clear) | Algenib (Gravelly) | Rasalgethi (Informative) |
  | Laomedeia (Upbeat) | Achernar (Soft) | Alnilam (Firm) | Schedar (Even) | Gacrux (Mature) | Pulcherrima (Forward) |
  | Achird (Friendly) | Zubenelgenubi (Casual) | Vindemiatrix (Gentle) | Sadachbia (Lively) | Sadaltager (Knowledgeable) | Sulafat (Warm) |

  An "Extended Voice Library" can be listed with `client.voices.list()`.
- **Style.** Quote: "Put emotions, delivery style, prosody, pacing, and volume that apply across an entire turn in the `style` field" (`speech_metadata.style`). Examples on the page: "cheerful and friendly", "whispered urgently", "speaking slowly", "high pitch, cheerful and excited inflection".
- **Inline audio tags** go in **angle brackets**. Recommended tags as quoted:

  | tags | | | |
  |---|---|---|---|
  | `<argh>` | `<breath>` | `<heavy breath>` | `<exhales>` |
  | `<cackle>` | `<cheer>` | `<chuckle>`/`<chuckles>` | `<cough>` |
  | `<cry>` | `<gasp>` | `<giggle>` | `<groan>` |
  | `<growl>` | `<grunt>` | `<grr>` | `<hiss>` |
  | `<laugh>`/`<laughter>` | `<moan>` | `<pant>` | `<pff>`/`<phew>` |
  | `<scream>` | `<shout>` | `<shriek>` | `<sigh>`/`<sighs>` |
  | `<sneeze>` | `<snicker>` | `<snort>` | `<sob>` |
  | `<throat-clearing>` | `<tsk>` | `<whimper>` | `<whispers>`/`<whispering>` |
  | `<yawn>` | `<short pause>` | `<long pause>` | |

  Use human vocalisations, not sound effects.
- **Other controls:**
  - Emphasis: CAPITALS, for example "VERY important point".
  - Backchannels: wrap them in pipes, `|oh really?|`, to get overlapping speech.
  - Accent: do **not** put permanent accent changes in `style`. Pick a regional voice or use voice design.
  - Advice: first test with an empty `style`, and leave out meta-instructions such as "maintain identical timbre".
- **Multi-speaker.** Quote: "Single-request multi-speaker generation (`speech_config.speakers`) supports up to 2 speakers using prebuilt voices." For custom voices, synthesize each turn separately and join the audio yourself.
- **Languages.** Language is detected automatically. Flash TTS supports ">130 languages" and Flash-Lite ">100 languages". The Thai row reads "| Thai | ✔️ | — |", so **Thai is supported on 3.8 Flash TTS but not on 3.8 Flash-Lite TTS**.
- **Output.**
  - WAV: 24 kHz, mono, 16-bit PCM.
  - Streaming: headerless L16 at 24 kHz.
  - μ-law and A-law: 8 kHz.
  - `sample_rate`: 24000, 16000 or 8000.
  - Custom voices: up to 200 per project, one-year TTL.
- The page states no context or token limit. It does not mention SynthID.

### Google-CloudGeminiTTS (Cloud Text-to-Speech page; it lists a different model set from the AI Studio page)
- Models: Gemini 3.1 Flash TTS (preview), 2.5 Flash TTS and 2.5 Pro TTS (single and multi-speaker), and 2.5 Flash Lite TTS (preview, single speaker only).
- **Style.** The `prompt` field is "the primary driver of the overall emotional tone and delivery". It uses **square-bracket** markup tags such as `[sigh]`, `[whispering]` and `[extremely fast]`. Pair each tag with a matching style prompt.
- **Warning:** some tags are **spoken aloud** instead of acted out. Emotional adjective tags such as `[scared]` are "likely an undesired side effect".
- **Thai `th-TH` is GA.** The page does not mention SSML.
- Limits:
  - `text` and `prompt`: at most 4,000 bytes each, 8,000 bytes combined.
  - Multi-speaker dialogue: at most 4,000 bytes.
  - Output: about 655 s, then audio is truncated.
  - Gemini 3.1 Flash TTS: 8,192 input tokens and 16,384 output tokens.
- *Note:* the same Google model family uses `<tag>` on one page and `[tag]` on the other. Follow the syntax of the API you actually call.

### W3C_SSML11 (full text)

| element | values (from the spec) |
|---|---|
| `prosody pitch` | number + "Hz", a relative change, or the labels x-low, low, medium, high, x-high, default |
| `prosody contour` | (time %, target) pairs; overrides `pitch` and `range` |
| `prosody range` | same value types as `pitch` |
| `prosody rate` | non-negative % multiplier of the default rate (100% = no change), or x-slow, slow, medium, fast, x-fast, default; `duration` overrides `rate` |
| `prosody duration` | e.g. "250ms", "3s" |
| `prosody volume` | signed dB relative to the current level (+6dB, −6dB), or silent, x-soft, soft, medium, loud, x-loud, default |
| relative changes | signed % for any attribute; signed semitones ("st") or signed Hz for `pitch` and `range` |
| `break` | `strength` none, x-weak, weak, medium (default), strong, x-strong; `time` e.g. "850ms" |
| `emphasis level` | strong, moderate (default), none, reduced |
| `phoneme` | `ph` (required); `alphabet` "ipa", a registry value, or "x-organization"; processors **should** support IPA |
| `say-as` | `interpret-as` (required), `format`, `detail`; the spec does **not** standardise the values; unknown values are rendered as if the tag were absent |
| `lexicon` / `lookup` | link to a PLS lexicon (`application/pls+xml`); if the lexicon fails to load, synthesis continues as if it were empty |

### Google-CloudSSML (the standard Cloud TTS voices)
- Supported: `break`, `say-as`, `audio`, `p`/`s`, `sub`, `mark`, `prosody` (rate, pitch, volume), `emphasis`, `phoneme`, `voice`, `lang`.
  - `say-as` values: currency, telephone, verbatim/spell-out, date, characters, cardinal, ordinal, fraction, expletive, unit, time, duration.
  - `prosody pitch` accepts labels, "+2st" or "+10%". No numeric ranges are given.
  - `phoneme` alphabets: ipa, x-sampa, plus yomigana and pinyin/jyutping.
  - `lang`: best effort.
- It also has a preview `<google:style>` tag with the values apologetic, calm, empathetic, firm and lively.
- Caveat on the page: "not all of the elements and options described in the W3 SSML specification are currently supported".
- The voice-compatibility table covers Neural2, Studio, Wavenet, News and Standard voices only.

### Azure-SSMLVoice and Azure-LangSupport
- **`mstts:express-as` attributes:**
  - `style`: required. If the value is missing or invalid, the whole element is ignored and the voice speaks neutrally.
  - `styledegree`: optional, **0.01 to 2** inclusive, default 1. 2 = "a doubling of the default style intensity". Ignored if the voice does not support it.
  - `role`: optional. Girl, Boy, YoungAdultFemale, YoungAdultMale, OlderAdultFemale, OlderAdultMale, SeniorFemale, SeniorMale. The voice "can imitate a different age and gender".
- **Documented style values:** advertisement_upbeat, affectionate, angry, assistant, calm, chat, cheerful, customerservice, depressed, disgruntled, documentary-narration, embarrassed, empathetic, envious, excited, fearful, friendly, gentle, hopeful, lyrical, narration-professional, narration-relaxed, newscast, newscast-casual, newscast-formal, poetry-reading, sad, serious, shouting, sports_commentary, sports_commentary_excited, whispering, terrified, unfriendly.
- Some descriptions include acoustic hints:
  - "fearful": higher pitch, higher vocal energy, faster rate
  - "depressed": lower pitch and energy
  - "gentle": lower pitch and vocal energy
  - "calm": prosody more uniform
- Styles exist only for **a subset of voices**. Check the language-support table or the list-voices API.
- **Thai voices (`th-TH`), from the TTS table:**
  - Standard voices with no styles: `th-TH-PremwadeeNeural` (F), `th-TH-NiwatNeural` (M), `th-TH-AcharaNeural` (F).
  - Neural HD and HD Flash voices: `th-TH-Krit:MAI-Voice-2`, `th-TH-Krit:MAI-Voice-2-Flash`, `th-TH-Nattapong:MAI-Voice-2`, `th-TH-Nattapong:MAI-Voice-2-Flash` (all male).
  - These HD voices **have styles**: adventurous, caringempathy, curious, encouraging, excited, friendlycheerful, nostalgic, reflective, saddisappointed, serious. Roles are not supported.
  - Other examples: `en-US-AriaNeural` has 16 styles and no roles. `zh-CN-XiaoxiaoNeural` has 20 styles.

### AWS-PollySSML and AWS-PollyVoices

| SSML tag | neural | long-form | generative |
|---|---|---|---|
| `break`, `lang`, `p`, `s`, `speak`, `sub`, `w` | full | full | full |
| `emphasis` | not available | not available | not available |
| `prosody` | partial | partial | partial |
| `phoneme` | full | full | partial |
| `say-as` | partial | full | full |
| `amazon:effect name="whispered"`, `phonation="soft"`, `vocal-tract-length`, `amazon:auto-breaths` | not available | not available | not available |
| `amazon:domain name="news"` | select neural voices only | not available | not available |

- Standard voices support all tags except `amazon:domain name="news"`.
- Unsupported tags cause **an error** on standard, neural and long-form voices.
- **Thai is not in the Polly voice list** (42 language rows, none Thai).

### ElevenLabs
- **EL-Models:**

  | model | languages | Thai |
  |---|---|---|
  | Eleven v3 | 70+ | yes ("Thai (th)"); 5,000 characters per request (about 5 min); Text to Dialogue API, "natural multi-speaker dialogue" |
  | Eleven v4 | 90+ | yes ("Thai (th)") |
  | Multilingual v2 | 29 | no |
  | Flash v2.5 | 32 | no |

- **EL-v3Prompting:**
  - Audio tags in **square brackets**:
    - voice: [laughs], [laughs harder], [starts laughing], [wheezing], [whispers], [sighs], [exhales], [sarcastic], [curious], [excited], [crying], [snorts], [mischievously]
    - sound effects: [gunshot], [applause], [clapping], [explosion], [swallows], [gulps]
    - experimental: [strong X accent], [sings], [woo]
  - "Eleven v4 and Eleven v3 do not support SSML break tags." Use ellipses, CAPITALS and punctuation for pacing and emphasis.
  - For dialogue, give each speaker a voice and label each line.
  - Professional Voice Clones are not fully optimised for v3.
- **EL-Controls:**
  - `<break time="x.xs"/>` allows pauses up to 3 s, but not on v3 or v4. Too many breaks cause instability.
  - Phoneme tags work only on `eleven_flash_v2`, with CMU Arpabet or IPA; CMU is recommended for v2. v4 uses IPA between slashes.
  - Pronunciation dictionaries can be uploaded as TXT or **.PLS**. Phoneme rules give a spelling; alias rules substitute text, which is useful on Multilingual v2. Matching is case-sensitive and only the first matching rule applies.
  - Emotion via narrative text may be **spoken aloud**, so trim it afterwards.
- **EL-Settings:**
  - Stability: lower gives a wider emotional range, higher gives more consistency. Default 50.
  - Similarity: about 75; not available on v3.
  - Style exaggeration: recommended 0; it can reduce stability.
  - Speaker Boost: on/off; not available on v3.
  - Speed: 0.7–1.2, default 1.0. The page contradicts itself on whether Speed is available on v3.
  - Not on this page: the v3 stability modes (Creative/Natural/Robust); they are listed under Unverified.

### OpenAI-TTS
- Models: `gpt-4o-mini-tts` (prompt-based style), `tts-1` and `tts-1-hd`. The page says **all three are scheduled to shut down on 2027-01-06** and points to the Realtime API with `gpt-realtime-2.1-mini`.
- 13 voices: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer, verse, marin, cedar. marin and cedar are recommended.
- **`instructions`** (shown with `gpt-4o-mini-tts`) can control "accent, emotional range, intonation, impressions, speaking speed, tone, and whispering". The page does not say whether older models accept it.
- Languages follow Whisper's list, so **Thai is included**, but voices are "optimized for English".
- Formats: mp3, opus, aac, flac, wav, pcm (24 kHz 16-bit).
- Usage policy requires "clear disclosure to end users that the TTS voice they are hearing is AI-generated".

### Provider capability matrix (documented facts only, 2026-11-24)

| provider | natural-language style | SSML prosody | emotion/style tags | phoneme / lexicon | Thai | multi-speaker |
|---|---|---|---|---|---|---|
| Gemini API (AI Studio) | yes, `style` field (GeminiTTSDocs) | not documented | yes, ~40 `<tag>` vocalisations, CAPS emphasis, `\|backchannel\|` | not documented | yes on 3.8 Flash TTS; no on 3.8 Flash-Lite | yes, up to 2 speakers per request (prebuilt voices) |
| Google Cloud Gemini-TTS | yes, `prompt` field | not documented on the Gemini-TTS page | yes, `[tag]` markup; some tags get read aloud | not documented | yes, th-TH GA | yes (3.1 Flash, 2.5 Flash/Pro); not on 2.5 Flash Lite |
| Google Cloud TTS (standard voices) | no (only preview `google:style` with 5 values) | yes, rate/pitch/volume, emphasis, break | `google:style` (preview): apologetic, calm, empathetic, firm, lively | yes, phoneme ipa/x-sampa | not checked on the SSML page (not documented here) | `<voice>` element switching |
| Azure Speech | not documented | yes (prosody, emphasis per SSML) | yes, `mstts:express-as` style + styledegree 0.01–2 + role, on a voice subset | yes (phoneme, lexicon; per SSML, not detailed here) | yes, 3 standard voices without styles; 4 HD MAI-Voice-2 voices with 10 styles | yes, several `<voice>` elements in one document |
| Amazon Polly | no | partial `prosody` on neural/generative; no `emphasis` | only newscaster (select neural voices); whisper/soft not on neural/generative | `phoneme` full on neural, partial on generative | **no** | not documented |
| ElevenLabs v3 | through narrative context and tags; no style field documented | no (no break tags on v3) | yes, `[tag]` audio tags | phoneme tags only on flash_v2; PLS/TXT dictionaries (model coverage not fully stated) | yes (v3, v4) | yes, Text to Dialogue API |
| OpenAI gpt-4o-mini-tts | yes, `instructions` | not documented | not documented | not documented | yes (Whisper list), tuned for English | not documented |

---

## 3. Emotional speech datasets (with licences)

| key | dataset | size | language | acted / natural | emotions | licence / use | accessed |
|---|---|---|---|---|---|---|---|
| Livingstone2018 | RAVDESS (PLOS ONE 13(5): e0196391, doi:10.1371/journal.pone.0196391; data doi:10.5281/zenodo.1188976) | 7,356 files, 24 actors (12F/12M), 2 fixed sentences, speech and song | North American English | acted | speech: neutral, calm, happy, sad, angry, fearful, surprise, disgust; normal and strong intensity | **CC BY-NC-SA 4.0**; commercial licence for sale | Zenodo page + article abstract/summary |
| Cao2014 | CREMA-D (IEEE TAC 5(4) 377–390, doi:10.1109/TAFFC.2014.2336244) | 7,442 clips, 91 actors aged 20–74, 12 sentences | English | acted | anger, disgust, fear, happy, neutral, sad; 4 levels | **Open Database License** (contents: Database Contents License) | GitHub README |
| Busso2008 | IEMOCAP (Language Resources & Evaluation 42(4) 335–359, doi:10.1007/s10579-008-9076-6) | about 12 h audiovisual, dyadic | English | acted, scripted and improvised | categorical and dimensional (details not verified here) | release form needs an **academic e-mail**; not shared for commercial purposes (per search summary; licence text **not read**) | bibliographic + search summary (site certificate failed) |
| Poria2019 | MELD (ACL 2019) | about 1,433 dialogues, 13,708 utterances | English | TV-series dialogue (*Friends*), not acted for the corpus | anger, disgust, sadness, joy, neutral, surprise, fear + 3 sentiments | repository lists **GPL-3.0** (the TV audio's own copyright is not addressed) | GitHub README |
| Zhou2021 / Zhou2022 | ESD | 350 parallel utterances × 10 English + 10 Mandarin speakers, >29 h | English, Mandarin | acted | neutral, happy, angry, sad, surprise | "can only be used for research purpose"; signed licence form required; the repo's MIT licence covers the code, not clearly the data | GitHub README + abstract |
| Wongpithayadisai2025 | **THAI-SER** (arXiv:2507.09618; VISTEC, Chulalongkorn, AIResearch/depa) | 41 h 36 min, 27,854 utterances, 200 professional actors (112F/88M, 18–55) | **Thai** | acted, scripted and improvised, Zoom and studio | neutral, angry, happy, sad, frustrated | **CC BY-SA 4.0** (paper and SEACrowd mirror); a thesis page shows CC BY-NC-ND, probably for the thesis document only | abstract + search |

### Usable points
- **RAVDESS.** Validity from 247 raters: about 80% correct for audio-visual clips, 75% for video-only and **about 60% for audio-only**. Fleiss' κ is about .61 for strong intensity and about .52 for normal intensity. Test-retest κ is about .73. *Implication:* even a validated, acted, voice-only emotion is recognised only about 60% of the time, so don't expect a TTS line to carry an emotion through voice alone. Supply context through picture, words and music.
- **CREMA-D.** 2,443 crowd raters, with most clips rated more than 7 times. It labels emotion **intensity levels**, which supports the "styledegree"-like idea that intensity is a separate dimension from category.
- **THAI-SER.** This is the only sizeable **Thai** emotional speech corpus found.
  - Krippendorff's α is 0.692 after filtering, and human recognition reaches **0.772** after filtering.
  - It includes "frustrated", which suits shop and customer dialogue.
  - CC BY-SA allows commercial use, but derivatives must be shared alike. Check the dataset's own licence file before using it commercially.
- **Limitations (all datasets).** Except MELD, they are acted with fixed sentences, and they are almost all English or Mandarin. None covers mixed, social or hidden emotions. This fits the brief's warning that acoustic profiles are tendencies.

---

## 4. Analysis tools and feature definitions

| key | tool / paper | ref | accessed |
|---|---|---|---|
| Praat | Boersma, Weenink (and Shchupak, per the current site), *Praat: doing phonetics by computer*, version 7.0.03 shown on the site | https://www.fon.hum.uva.nl/praat/ | docs page |
| Praat-Manual | Praat manual pages: Voice 2. Jitter, Voice 3. Shimmer, Harmonicity | https://www.fon.hum.uva.nl/praat/manual/ | docs pages |
| Jadoul2018 | Jadoul, Thompson & de Boer, Introducing Parselmouth: A Python interface to Praat, J. Phonetics 71, 1–15 | doi:10.1016/j.wocn.2018.07.001 | docs page (citation on parselmouth.readthedocs.io) |
| Eyben2010 | Eyben, Wöllmer & Schuller, openSMILE – The Munich Versatile and Fast Open-Source Audio Feature Extractor, Proc. ACM Multimedia 2010, Florence, pp. 1459–1462 | DOI not shown on the repo (commonly 10.1145/1873951.1874246, **not verified**) | GitHub README |
| Eyben2016 | GeMAPS (key in `_BRIEF.md`) | doi:10.1109/TAFFC.2015.2457417 | **full text** (Augsburg repository PDF) |
| McFee2015 | McFee, Raffel, Liang, Ellis, McVicar, Battenberg, Nieto, librosa: Audio and Music Signal Analysis in Python, Proc. SciPy 2015 | doi:10.25080/Majora-7b98e3ed-003 | abstract page |

### Feature definitions (from Eyben2016 full text, Section 3.1, unless noted)
- **F0 / pitch.** "logarithmic F0 on a semitone frequency scale, starting at 27.5 Hz (semitone 0)". Measure in **semitones relative to the speaker's own baseline**, not in Hz, when you compare characters.
- **Jitter.** "deviations in individual consecutive F0 period lengths".
  - Praat jitter (local) = average absolute difference between consecutive periods ÷ average period.
  - MDVP pathology threshold 1.040%; Praat notes the correct threshold is probably lower.
  - "typically measured only on long sustained vowels" (Praat-Manual).
- **Shimmer.** "difference of the peak amplitudes of consecutive F0 periods". Praat shimmer (local, dB) has an MDVP threshold of 0.350 dB.
- **HNR.** "relation of energy in harmonic components to energy in noise-like components". Praat: a healthy sustained [a] or [i] is about 20 dB, [u] about 40 dB; 0 dB means equal energy. *Use:* lower HNR goes with breathier or rougher voice.
- **Formants F1–F3.** Centre frequencies (and F1 bandwidth).
- **Alpha ratio.** Ratio of the summed energy in 50–1000 Hz to that in 1–5 kHz.
- **Hammarberg index.** Ratio of the strongest energy peak in 0–2 kHz to the strongest peak in 2–5 kHz.
- **Spectral slope.** Linear regression slope of the log power spectrum in the 0–500 Hz and 500–1500 Hz bands.
- Alpha ratio, Hammarberg index and spectral slope are the **spectral tilt / balance** family. A flatter tilt (more high-frequency energy) is typical of tense or loud voice. *That interpretation is a general phonetics tendency, not a quote from the paper.*
- **H1–H2, H1–A3.** Harmonic differences, used as voice-quality measures.
- **Loudness.** Perceived intensity estimated from an auditory spectrum.
- **Temporal measures, a proxy for speaking rate:**
  - rate of loudness peaks per second
  - mean and SD of voiced and unvoiced segment lengths (unvoiced segments approximate pauses)
  - number of continuous voiced regions per second, the "pseudo syllable rate"
- **Set sizes.** GeMAPS has 18 LLDs and **62 parameters**. eGeMAPS adds MFCC 1–4, spectral flux, F2/F3 bandwidth and the equivalent sound level, for **88 parameters**. Selection criteria: physiological relevance, proven value in earlier studies, and theoretical significance.

### Tool notes
- **Parselmouth.** Calls Praat's own C/C++ code, so results match Praat. It exposes Sound, Pitch, Formant, Intensity, Spectrogram, TextGrid, and `call()` for any Praat command. Cite Praat as well. **This is the easiest QC route for this project**, which already has Python.
- **openSMILE licence.** The open-source version is free for private, research and educational use. "It is not allowed to use the open-source version of openSMILE for any sort of commercial product." Use for a product needs a commercial licence. Internal analysis by a shop is a grey area; prefer Parselmouth or librosa for anything commercial.
- **librosa.** A general audio and music library (v0.4.0 is described in the 2015 paper). It is already in this project's setup. It is useful for RMS energy, onsets, `pyin` F0 and spectral features. Exact function names were not checked in this research.

---

## 5. Quality evaluation

| key | document | ref | accessed |
|---|---|---|---|
| ITU-T-P800 | ITU-T P.800 (08/96) Methods for subjective determination of transmission quality; in force | https://www.itu.int/rec/T-REC-P.800-199608-I/en | catalogue only |
| ITU-T-P800.2 | ITU-T P.800.2 (07/16) Mean opinion score interpretation and reporting; in force | https://www.itu.int/rec/T-REC-P.800.2/en | catalogue only |
| ITU-R-BS1534 | ITU-R BS.1534-3 (10/2015) Method for the subjective assessment of intermediate quality level of audio systems (MUSHRA); in force | https://www.itu.int/rec/R-REC-BS.1534/en | catalogue only |
| ITU-T-P808 | ITU-T P.808 (06/21) Subjective evaluation of speech quality with a crowdsourcing approach; in force (06/18 superseded) | https://www.itu.int/rec/T-REC-P.808/en | catalogue only |
| NaderiCutler2020 | An Open Source Implementation of ITU-T Recommendation P.808 with Validation, Interspeech 2020 | arXiv:2005.08138 | abstract only |
| Wiki-MOS / Wiki-MUSHRA | Wikipedia "Mean opinion score" and "MUSHRA" (**secondary**, used for content the catalogue pages lack) | en.wikipedia.org | page read |
| Lo2019 | MOSNet: Deep Learning based Objective Assessment for Voice Conversion, Interspeech 2019 | arXiv:1904.08352 | abstract only |
| Saeki2022 | UTMOS: UTokyo-SaruLab System for VoiceMOS Challenge 2022, Interspeech 2022 | arXiv:2204.02152 | abstract only |
| King2014 | S. King, Measuring a decade of progress in Text-to-Speech, Loquens 1(1) e006 | doi:10.3989/loquens.2014.006 (per the Edinburgh Blizzard site, via search) | bibliographic only (journal site certificate failed) |
| Radford2022 | Robust Speech Recognition via Large-Scale Weak Supervision (Whisper) | arXiv:2212.04356 | abstract only |

### Usable points
- **MOS / ACR (secondary: Wiki-MOS citing ITU-T).**
  - 5-point ACR scale: 1 Bad, 2 Poor, 3 Fair, 4 Good, 5 Excellent. MOS is the mean of the ratings.
  - P.800.2, as quoted by Wikipedia: "it is not meaningful to directly compare MOS values produced from separate experiments." Listeners spread their scores across the whole scale (range-equalisation bias).
  - *Use:* compare takes **inside one listening session**, never against numbers from papers.
- **MUSHRA (secondary: Wiki-MUSHRA citing BS.1534-3).**
  - For **intermediate** quality.
  - Each trial has a hidden reference plus a 3.5 kHz and a 7 kHz low-pass anchor, rated on a 0–100 scale.
  - Common post-screening: drop listeners who rate the hidden reference below 90 on more than 15% of items.
  - Designed for expert listeners.
- **P.808 crowdsourcing (NaderiCutler2020).** An open-source implementation of ACR, DCR and CCR on Mechanical Turk. Qualification is merged into the main task, and quality is controlled with environment and headset checks, gold and trapping questions, and rating-pattern checks. Results are validated against a P.800 lab test; the abstract gives no correlation number.
- **Automatic MOS.**
  - MOSNet correlates "highly" with human MOS **at system level** but only "fairly" **at utterance level** (Lo2019).
  - UTMOS uses an ensemble of fine-tuned SSL models and was top on several metrics in VoiceMOS 2022 (Saeki2022).
  - *Use:* utterance-level predicted MOS is a **rough screen**, not a verdict on single takes.
  - Neither model was shown for Thai or for expressive or cartoon speech, so its validity for this use case is unknown.
- **Blizzard Challenge (King2014, bibliographic only).** An annual evaluation since 2005 in which teams build voices from a common corpus and listeners rate the results. The CSTR site hosts past listening-test tools and results. Specific test dimensions (naturalness, similarity, SUS intelligibility) were **not confirmed** from the sources read; see Unverified.
- **Intelligibility via ASR.** Whisper was trained on 680k hours of multilingual data and is robust zero-shot (Radford2022). The OpenAI TTS page says its language list follows Whisper, which includes Thai.
  - *Practice (method, not a cited benchmark):* transcribe each TTS take and compute **CER** for Thai. Thai is written without spaces, so WER depends on the word segmenter. Use WER for English.
  - A high error rate flags a misread word or a wrong tone or word. ASR is not the same as a human listener, so confirm flagged lines by ear.
- **Emotion-specific evaluation (Schroder2001).**
  - A forced-choice emotion test with neutral carrier sentences measures discrimination, not believability.
  - Add naturalness or believability ratings and test **in context**.
  - Murray & Arnott's paradigm adds distractor categories plus "other", and compares neutral against emotional prosody on neutral and emotional texts. The prosody gain was larger for emotional texts.

---

## 6. Practical implications for the skill
These are syntheses, not single-source findings. The source each one draws on is named.
1. **Gemini style prompt = turn-level.** Put emotion, pace and volume in `style`; use inline tags only for vocal events and pauses (GeminiTTSDocs). Keep accent out of the style. Test an empty style first.
2. **One request = at most 2 speakers (prebuilt voices).** For the 3-character night-optic scenes (Ton, Jan, Chan), render per speaker or per pair and edit them together (GeminiTTSDocs).
3. **Model name drift.** The project's `gemini-2.5-flash-preview-tts` was not in the AI Studio model list on 2026-11-24. The `-lite` 3.8 model does **not** list Thai, so do not switch Thai jobs to Flash-Lite.
4. **Tags can be read aloud.** Google Cloud warns about emotional adjective tags such as `[scared]`, and ElevenLabs warns about narrative emotion text. QC must listen for spoken stage directions. ASR CER also catches them as inserted words.
5. **Re-roll is legitimate.** Stochastic models give different rhythms each time (Kim2021). ElevenLabs advises lower stability plus several generations for livelier reads (EL-Settings). Render 2–4 takes and choose by ear.
6. **Exaggerate slightly for cartoons.** Synthetic or animated expression may need exaggeration to be believable (Schroder2001, citing Bates 1994). That source is about animated agents, so the claim is low confidence.
7. **Voice alone carries emotion only partly.** In RAVDESS, about 60% of audio-only clips were identified correctly, even for acted, validated material. Support emotion with words, picture and music.
8. **Measurement for QC.** Use Parselmouth (Praat) for F0 in semitones re the speaker's baseline, intensity, HNR and pauses (unvoiced segment lengths). Jitter and shimmer are meant for sustained vowels, so treat them as rough indicators on running TTS speech. Use spectral tilt (alpha ratio, Hammarberg) to check "tense versus soft" reads.
9. **Listening tests.** Compare A/B takes within one session, using ACR 1–5 or CCR. Do not compare MOS across sessions or with published numbers (P.800.2 via Wiki-MOS).

---

## 7. Unverified / not confirmed (do not cite as fact)
- **Wang2018 venue (ICML 2018).** The arXiv page lists no venue.
- **openSMILE ACM MM DOI 10.1145/1873951.1874246.** Not shown on the pages read.
- **IEMOCAP licence wording.** USC SAIL pages failed with a certificate error. The terms come from a search summary only. Emotion label set not verified.
- **King2014 content.** The Loquens page failed with a certificate error, so Blizzard test dimensions (naturalness MOS, similarity, SUS-based WER) are not confirmed from a source read here. The DOI suffix ".006" comes from the Blizzard site via search; one other listing pattern suggested ".005".
- **ITU P.800, P.808 and BS.1534 content.** Only the catalogue pages were read. Details of the ACR labels and MUSHRA anchors come from Wikipedia (secondary).
- **ElevenLabs v3 stability modes (Creative/Natural/Robust).** Not on the pages read.
- **Gemini SynthID watermark.** Not mentioned on the speech-generation page.
- **Gemini input token limits on AI Studio.** Not stated. The Cloud page gives 8,192 input tokens for 3.1 Flash TTS.
- **Exact factor lists for PromptTTS and Parler-TTS (paper).** The abstracts do not enumerate them. The Parler README lists gender, speaking rate, pitch and reverberation.
- **THAI-SER licence conflict.** The paper and mirror say CC BY-SA 4.0, and a thesis page shows CC BY-NC-ND 4.0. Check the official airesearch.in.th or GitHub licence file.
- **MELD.** The repo is GPL-3.0, but the underlying *Friends* audio is third-party copyrighted. Do not assume the licence allows commercial reuse of the audio.
- **Azure phoneme/lexicon detail and Polly multi-speaker.** Not covered by the pages read.
- **Praat software licence.** The home page links to it but does not state it (the page text itself is CC-BY-SA 4.0).

## Source count
- Papers (peer-reviewed or preprint): 26. Shen2018, Wang2018, SkerryRyan2018, Ren2021, Kim2021, Schroder2001, Zhou2022, Zhou2021*, Guo2023, Yang2023, LythKing2024, Wang2023, Livingstone2018, Cao2014, Busso2008*, Poria2019, Wongpithayadisai2025, Jadoul2018, Eyben2010, Eyben2016, McFee2015, NaderiCutler2020, Lo2019, Saeki2022, King2014*, Radford2022 (*bibliographic only).
- Provider, tool and standards docs: 20. GeminiTTSDocs, Google-CloudGeminiTTS, Google-CloudSSML, W3C_SSML11, Azure-SSMLVoice, Azure-LangSupport, AWS-PollySSML, AWS-PollyVoices, EL-v3Prompting, EL-Controls, EL-Settings, EL-Models, OpenAI-TTS, HF-ParlerTTS, Praat, Praat-Manual, ITU-T-P800, ITU-T-P800.2, ITU-T-P808, ITU-R-BS1534 (the 4 ITU entries are catalogue only).
- Secondary: 2 (Wiki-MOS, Wiki-MUSHRA).
- **Total: 48 sources.** 45 were accessed directly (full text, abstract, docs or catalogue page) and 3 are bibliographic only. 2 were read in full: Schroder2001 and Eyben2016.
