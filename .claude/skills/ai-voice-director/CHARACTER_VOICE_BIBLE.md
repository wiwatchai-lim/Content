# Character Voice Bible

One profile per recurring character. A character's **identity** (voice, baseline pitch, habits, particles) stays the same
in every scene; **emotion** only moves things *relative to that baseline*. `tools/validate.py` reads the JSON block at
the bottom (keep it in sync with the tables). Add a character: copy a profile, fill every row, audition 2–3 voices with
the same 3 test lines (neutral / happy / sad), lock one, write it into `voice_by_provider`, record the baseline with
`tools/analyze_audio.py` on the neutral take.

**Status of voices:** the Gemini voice names are the provider's prebuilt voices. Only `narrator_th = Charon`
(ร้านแว่นตีสอง EP01, 2026-11-21), `shop_vo_th = Sulafat` (chosen by the user's friend, 2026-09-28) and Puck (Thai male
promo VO, 2026-11-03) were heard in this project. All other assignments are **proposals to audition** — mark
`locked: true` only after the user approves a take.

Measured baseline (only one so far): EP01 narrator, Charon, `gemini-3.1-flash-tts-preview`, 27 lines —
F0 mean 109–143 Hz (median of lines ≈ 121 Hz), F0 range p5–p95 9–17 st, articulation rate 3.1–6.4 syl/s (median ≈ 4.5),
HNR 12.5–19 dB (`research/ep01_analysis.csv`). Note: the grandma's and Ton's lines in EP01 were read by the same
narrator voice with nearly the same pitch (lines 06, 07, 09, 18 = 113–132 Hz) — the characters were *not* vocally
distinct. Fix for EP02+: separate voices per character (below) or one voice with very different style prompts.

---

## ton — ต้น (ร้านแว่นตีสอง)
| field | value |
|---|---|
| Character ID | `ton` |
| Personality | kind, conscientious, a bit timid at night, curious; hides fear with politeness; grandson who inherited the shop |
| Perceived vocal age | 26–30 |
| Language / accent | Central Thai (Bangkok), standard; English loanwords Thai-ised (เลนส์, แว่นกรอบทอง) |
| Default pitch | medium-low male; relaxed |
| Pitch range | moderate; widens when startled; narrows when he is being careful |
| Speaking style | polite casual: ครับ with elders/customers, ผม; to himself: short, half-swallowed phrases |
| Speech habits | "เอ่อ…" before awkward questions; repeats a word when scared ("ปิด… ปิดแล้วครับ"); trails off when thinking |
| Default energy | medium-low |
| Emotional range | wide inside, small outside — fear and tenderness leak through a polite surface |
| Pronunciation rules | clear ร/ล in careful speech, relaxed ร→ล allowed only in fast casual lines; ครับ unstressed, short |
| Signature | slightly breathy soft onsets; smiles audibly when he is relieved |
| Relationship styles | grandma Jan: gentle, respectful (ครับยาย); Chan: casual respect (ลุง… ครับ); customers: warm service voice; alone: inner monologue, closer and quieter |
| Consistency rules | never shouts above "projected"; never cold/sarcastic; keeps ครับ even when scared |
| Gemini voice | Puck (proposal; heard in project for Thai male promo) |

## jan — คุณยายจันทร์ (ghost grandma)
| field | value |
|---|---|
| Character ID | `jan` |
| Personality | gentle, patient, a little sad, loving; a ghost who is never scary on purpose |
| Perceived vocal age | ~80 |
| Language / accent | Central Thai, old-fashioned softness; จ้ะ / นะลูก / พ่อหนุ่ม |
| Default pitch | medium (elderly female voice: slightly lower than a young woman, a little unsteady) |
| Pitch range | narrow-to-moderate; soft rises on จ้ะ/นะ, never sharp |
| Speaking style | slow, long vowels at phrase ends, warm breathy quality |
| Speech habits | soft "อือ…" before answering; pauses before names; ends lines softly (soft_fall / trail_off) |
| Default energy | low |
| Emotional range | tenderness, longing, quiet joy, grief — no anger, no shouting |
| Pronunciation rules | full, unhurried syllables; final particles lengthened slightly (จ้ะ, นะ) without changing their tone |
| Signature | breathiness + a slight age tremor (low, not wobbly); never echo/robotic "ghost" effects in the TTS — reverb is added in the mix only if the scene calls for it |
| Relationship styles | to Ton: grandmotherly; to her son (letter): tears held back |
| Consistency rules | max loudness "conversational"; tremor ≤ "low" unless crying; rate ≤ "slightly_slow" |
| Gemini voice | Vindemiatrix or Achernar (proposal — audition with "an 80-year-old Thai grandmother, soft and warm") |

## chan — ลุงชาญ (old uncle / visitor)
| field | value |
|---|---|
| Character ID | `chan` |
| Personality | gruff on the outside, sentimental inside; plain-spoken |
| Perceived vocal age | 60–70 |
| Language / accent | Central Thai, everyday register; with friends วะ/ว่ะ, with strangers ครับ |
| Default pitch | low male |
| Pitch range | narrow; widens only on surprise or when his voice breaks |
| Speaking style | short sentences, firm endings, occasional sigh before speaking |
| Speech habits | "เออ…", clears throat before emotional lines |
| Default energy | medium |
| Emotional range | gruff → moved; hides tears with a cough or a joke |
| Signature | slightly rough (harsh/creaky at phrase ends), chest resonance |
| Relationship styles | to Ton: like a nephew; to the memory of his mother: voice breaks, slower |
| Consistency rules | never high-pitched or giggly; keeps the rough quality even when gentle |
| Gemini voice | Algenib (proposal — "gravelly") |

## mint — มิ้นต์ (Slowly Growing)
| field | value |
|---|---|
| Character ID | `mint` |
| Personality | bright, quick, anxious under pressure, honest about worries |
| Perceived vocal age | 23–27 |
| Language / accent | Bangkok Thai, casual; ค่ะ/นะ/อะ; some English words (deadline, stress) |
| Default pitch | medium-high female |
| Pitch range | wide; rises when worried, narrows when tired |
| Speaking style | fast when anxious, slows to a halting rhythm when admitting something |
| Speech habits | "แบบ…", self-interrupting, small laughs when nervous |
| Default energy | medium-high |
| Emotional range | anxiety, tiredness, hope, embarrassment, relief |
| Consistency rules | never deep/authoritative; the nervous laugh is hers, not Tao's |
| Gemini voice | Leda or Zephyr (proposal) |

## tao — เต๋า (Slowly Growing)
| field | value |
|---|---|
| Character ID | `tao` |
| Personality | calm, dry humour, few words, deep |
| Perceived vocal age | 25–30 |
| Language / accent | Bangkok Thai, casual-polite; ครับ rarely, mostly bare sentences |
| Default pitch | low-medium male |
| Pitch range | narrow — meaning comes from timing, not melody |
| Speaking style | slow, even, a beat of silence before the important word |
| Speech habits | short answers; dry irony with a flat contour and a tiny smile at the end |
| Default energy | low-medium |
| Emotional range | calm, warmth, dry irony, quiet concern |
| Consistency rules | never rushes; never sarcastic in a cruel way |
| Gemini voice | Umbriel or Charon (proposal) |

## narrator_th — ผู้เล่าเรื่อง
| field | value |
|---|---|
| Character ID | `narrator_th` |
| Personality | warm storyteller, calm, intimate (story-clips) |
| Perceived vocal age | 30–45 |
| Default pitch | medium-low male (measured: Charon ≈ 121 Hz median) |
| Pitch range | moderate (measured 9–17 st p5–p95) |
| Speaking style | natural pace (≈ 4.5 syl/s articulation), pauses at commas and after "…" |
| Consistency rules | narration never imitates the characters' emotions fully — colours them; characters are voiced separately |
| Gemini voice | Charon (heard, EP01) |

## shop_vo_th / shop_vo_en / shop_vo — Time Optic commercial VO
| field | value |
|---|---|
| Character ID | `shop_vo_th`, `shop_vo_en` |
| Personality | trustworthy, friendly expert; never pushy |
| Perceived vocal age | 30–40 |
| Default pitch | medium; smiling quality |
| Speaking style | clear articulation, brand name crisp, prices slower than the rest of the line, call-to-action warm not shouted |
| Pronunciation rules | brand and lens names from PRONUNCIATION_DICTIONARY.json; prices/dates normalised; Thai VO uses ค่ะ/ครับ only at the end of the spot |
| Consistency rules | same voice across every spot of a campaign; same model (don't mix TTS models within one clip) |
| Gemini voice | Sulafat (heard; user's choice for VO) · Puck for a male Thai VO (heard) |

---

<!-- characters:json -->
```json
{
  "characters": [
    { "id": "ton", "voice_by_provider": { "gemini": "Puck" }, "locked": false, "max_loudness": "projected", "baseline": null },
    { "id": "jan", "voice_by_provider": { "gemini": "Vindemiatrix" }, "locked": false, "max_loudness": "conversational", "baseline": null },
    { "id": "chan", "voice_by_provider": { "gemini": "Algenib" }, "locked": false, "max_loudness": "shout", "baseline": null },
    { "id": "mint", "voice_by_provider": { "gemini": "Leda" }, "locked": false, "max_loudness": "shout", "baseline": null },
    { "id": "tao", "voice_by_provider": { "gemini": "Umbriel" }, "locked": false, "max_loudness": "projected", "baseline": null },
    { "id": "narrator_th", "voice_by_provider": { "gemini": "Charon" }, "locked": true, "max_loudness": "projected",
      "baseline": { "source": "story-clips/night-optic/EP01_golden-frames/audio (27 lines)", "f0_median_hz": 121, "range_st": [9, 17], "articulation_rate_syl_s": 4.5 } },
    { "id": "shop_vo_th", "voice_by_provider": { "gemini": "Sulafat" }, "locked": true, "max_loudness": "projected", "baseline": null },
    { "id": "shop_vo_en", "voice_by_provider": { "gemini": "Sulafat" }, "locked": true, "max_loudness": "projected", "baseline": null },
    { "id": "shop_vo", "voice_by_provider": { "gemini": "Sulafat" }, "locked": true, "max_loudness": "projected", "baseline": null, "note": "alias used in EXAMPLES/TEST_CASES for shop_vo_th / shop_vo_en" },
    { "id": "customer", "voice_by_provider": {}, "locked": false, "max_loudness": "shout", "baseline": null }
  ]
}
```
