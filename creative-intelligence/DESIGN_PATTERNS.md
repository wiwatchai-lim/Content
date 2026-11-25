# Design Patterns (worked here, with evidence)

Status per pattern: tested (used in a real job, result observed) · sourced (backed by research, not yet tried here) · craft (convention).

| pattern | status | evidence |
|---|---|---|
| Codex picture → FLUX img2img `--denoise 0.35` to make free variants "like ChatGPT" | tested | memory local-flux; flux-like-chatgpt skill |
| FLUX first for drafts/bulk, Codex only for exact poses (ask first) | tested | memory local-flux |
| All TTS lines in one request "pause two seconds between lines" → split by silence | tested | memory gemini-tts-sulafat |
| Max ~8 lines per Gemini TTS request | tested | memory huahin-uv-th |
| Shot list before animation; puppets/camera/lip-sync from rig.js | tested | story-clips/_craft/GUIDE.md |
| Animating on twos for a hand-made feel (frame-diff alternates ~1/~7) | tested | LEARNING-LOG 2026-11-24 |
| Hide a side-view swap behind squash + blink | tested | LEARNING-LOG 2026-11-24 |
| Thai lip-sync from syllable split + loudness beats; M closures before ม บ ป พ | tested | LEARNING-LOG 2026-11-24 |
| Centre placement as a strong default for a single product | sourced | ai-visual-artist ART_FUNDAMENTALS (evidence: centre bias; thirds weak) |
| Name the emotion member + intensity in voice direction (hot vs cold anger) | sourced | EVIDENCE_MATRIX V003 |
| Text in HTML over text-free images (layers, editable, no AI typos) | tested | house rule, every post |
| Carousel → Reel: keep 9:16, AI label on, text in safe zone | tested | memory ig-reels-1x1-ai-label |
| Health/UV message = risk shot, then at once an easy action (UV400, eye test) | sourced | EVIDENCE P2-001 |
| Hook as a question the viewer half-knows (~50% sure) | sourced | EVIDENCE P2-002 |
| SFX/lip-sync never ahead of the picture; ≤1 frame late is fine | sourced | EVIDENCE P2-004 |
| Thai subtitles ≤17 chars/s (aim 12–15), ≤35 base chars/line, ≤2 lines | craft (Netflix Thai guide, industry) | knowledge/cognitive-science |
| ~4 meaning units per carousel slide | derived heuristic, untested | EVIDENCE P2-006 |
| Philosophy in dialogue: idea in the character's own words, real quotes only from the verified list | sourced | knowledge/philosophy, P2-007 |
| Locked details list from reference photos before generating | craft | ai-visual-artist SKILL step 1 |

Add a row only with a real evidence pointer. When a P2+ batch produces an applied pattern, add it as `sourced` until used.

## Visual arts (VA batch, 2026-11-25)
- Stolen focal point fix order: crop/remove the competitor > darken the surround > desaturate it. Measured: darken +0.24, desaturate +0.05 in focal saliency ratio · experiment VA-002
- Check every generated image with `inspect_views.py --focal x,y` before critique: 6 views + 7 indicators · VA-000
