# Master Quality Score (100) — internal QC, not a universal standard of beauty

Use with the specialist scorers that already exist: images → `.claude/skills/ai-visual-artist/tools/score.py`
(purpose weights), voice → `.claude/skills/ai-voice-director/QUALITY_CONTROL.md` + `tools/qc.py`.
This sheet combines them for a whole piece (clip, carousel, post).

## 1. Critical failures — check first; any one = fix before delivery, no score
- [ ] Important text misspelt (Thai: spelling, vowels, tone marks; English: brand/product names)
- [ ] Product changed from the real photo (frame shape, colour, logo, lens tint)
- [ ] Character face/identity changed without permission (vs character bible)
- [ ] Wrong science/health claim (eyesight, UV, presbyopia) — check against a source
- [ ] Voice says something different from the script, or a tone error changes a Thai word's meaning
- [ ] Content contradicts the brief
- [ ] Asset used without licence/consent (music, SFX, photos, faces, voices)
- [ ] File broken; wrong size, aspect, length or format for the platform
- [ ] House-rule break (language, logo placement, text inside AI image)

## 2. Score (default weights; change per job type and write the weights down)
| criterion | pts | how to judge (evidence, not feeling) |
|---|---|---|
| Concept & creativity | 10 | one clear idea; was it chosen from ≥2 options? |
| Storytelling | 10 | setup → turn → payoff readable without explanation |
| Emotional impact | 15 | target emotion stated in brief; does every layer (image, light, voice, music, timing) point at it? |
| Visual aesthetics | 15 | from score.py visual sub-scores |
| Composition & lighting | 10 | focal point = salient point (analyze_image), readable at phone size |
| Character consistency | 10 | compare against bible / previous episode frames |
| Voice & audio | 10 | qc.py: CER, loudness, clipping; tone check by a Thai listener |
| Editing & timing | 5 | cuts motivated; captions on screen long enough to read |
| Technical accuracy | 5 | ffprobe specs, resolution, safe zones |
| Audience appropriateness | 5 | fits platform + audience; no stereotypes |
| Brand consistency | 5 | house rules (USER_PREFERENCES.md) |

Bands: 95–100 Premium · 90–94 Professional · 80–89 Good, refine · 70–79 Needs improvement · <70 Significant revision.

## 3. Rules
- Every score line needs a reason ("8/10 — focal glasses are 2nd most salient, window wins").
- Keep **automated** scores (tools) and **human** scores (the user, viewers) in separate columns. AI self-scores are provisional.
- Never give a high score without evidence. Log the result in `LESSONS_LEARNED.md` / the project log.
