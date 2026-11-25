# Lessons Learned (index)

Lessons are written where the work happens and summarised here. Don't duplicate long entries.

| area | detailed log |
|---|---|
| story clips, animation, sound, rig | `story-clips/_craft/LEARNING-LOG.md` |
| images (FLUX/Codex, critique) | `.claude/skills/ai-visual-artist/CHANGELOG.md` |
| voice (TTS, Thai prosody, QC) | `.claude/skills/ai-voice-director/CHANGELOG.md` |
| per-project facts | auto-memory (`MEMORY.md` index) |
| this knowledge system | `CHANGELOG.md` here |

## Cross-cutting lessons
- 2026-11-24/25 — Most generation failures came from wording that names what we don't want, or from missing cultural detail.
  Describe the wanted effect positively and concretely (→ ANTI_PATTERNS.md).
- 2026-11-24 — Automated scores caught real problems (saliency, wrong aspect ratio) that eyeballing missed; keep tools in the loop.
- 2026-11-24 — No line or image has a full score yet because no human rating has been collected. The next quality jump needs
  the user's quick ratings (see experiments/README.md).
- 2026-11-25 — Quotas (Codex, Gemini TTS) are the real production bottleneck; plan free local passes (FLUX, HTML, rig) first.
- 2026-11-25 U1 spot-check caught a research agent attributing a private campaign to a government ministry (Coconuts_BuddhaMisuse). Summaries of news digests drift; for legal or official claims, the citation must be the primary page.
- 2026-11-25 U3 full-text pass: re-reading sources first noted from search snippets corrected many findings. In the optical
  module about 10 claims were removed (e.g. "20x focusing", 83.5% compliance, 90-98% progressive acceptance) and one paper
  was misattributed. Story: a wrong DOI and a reversed humour finding. Psychology: the fear-appeal "backfire" rule was wrong.
  A spot-check of 2-3 sources per module missed all of these. Rule: a module reaches SOURCE VERIFIED only at >=50% real
  reads; findings from snippets are leads to check, never facts.

