# Experiments

A technique "works" only after we tested it here. Never record an experiment that was not run.
One file per experiment: `experiments/EXP-YYYYMMDD-<slug>.md`, plus a line in `PROMPT_EXPERIMENTS.json` when it involves a model.

## Template
```
# EXP-YYYYMMDD-slug
Research question:
Hypothesis:
Independent variable (the ONE thing changed):
Dependent variable (what is measured, how):
Controls (same seed/model/prompt/voice/etc.):
Test inputs:
Outputs (paths):
Automated evaluation (tool + numbers):
Human evaluation (who, how many, what they said — or "none yet"):
Result:
Limitations:
Conclusion (confidence):
Follow-up:
```

## Cheap experiments we can run for free (no quota)
- Same FLUX prompt + seed, change only the lighting phrase → analyze_image contrast/saliency + user pick.
- Same carousel story, two layouts (words per slide) → user pick, later IG saves/shares.
- Same sentence, two Thai voice directions → only when the user OKs spending Gemini quota.
- Same story clip, two cut rhythms (HyperFrames re-render) → user pick.

## Log
| id | date | question | result |
|---|---|---|---|
| (from ai-visual-artist) golden glasses | 2026-11-24 | prompt wording vs saliency of the product | darkening the window made glasses salient #1–2 (see skill CHANGELOG) |
