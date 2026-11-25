# Changelog — ai-visual-artist

## 1.0 — 2026-11-24
Built from the user's "MASTER INSTRUCTION — AI VISUAL ARTIST & ART DIRECTOR" brief.
- Research: four verified passes + reference-licence pages → 192 source keys in RESEARCH_SOURCES.md (full records in
  research/R1–R4). Read level: 45 full text, 55 abstract only, 38 bibliographic/secondary (books not read), 54 web/docs/museum pages.
  Unverified items (e.g. origin of 60-30-10, Z-pattern eye-tracking, Meta 14 % top safe zone, SIPA licence text) are listed, not cited.
- Libraries: COLOR_PALETTE_LIBRARY 204 · LIGHTING_LIBRARY 51 (brief said 52; the id list had 51) · COMPOSITION_LIBRARY 30 ·
  ART_STYLE_LIBRARY 102 · EMOTION_VISUAL_LIBRARY 114 (≥3 approaches each) · REFERENCE_DATABASE 141 open-licence artworks
  (AIC 53, Cleveland 41, Met 34, Wikimedia/Rijksmuseum 13; metadata only, licences from museum APIs; images not viewed;
  NGA/Smithsonian blocked; one Thai mural skipped for doubtful PD status).
- EXAMPLES.md 239 prompt templates (all 102 styles, 30 compositions, 51 lightings) · TEST_CASES.json 117 cases.
- Tools: color_tools, analyze_image (OpenCV saliency), validate_job, build_prompt (+ FLUX generation), score, run_tests.
- Tests: run_tests.py 729/729 pass (offline).
- Real generation test (FLUX schnell local, free): "golden glasses at 2 a.m." story frame, 9 takes over 4 prompt
  iterations + 1 post-fix. Lessons now in code/docs:
  1. lens/DoF words turned a gouache request into a 3D-photo look → build_prompt drops them for non-photo styles;
  2. "no lamp visible" kept producing lamps → never name unwanted objects; describe the light as coming from outside;
  3. fake signs/signatures in shop scenes → re-roll / inpaint;
  4. the word budget dropped the secondary story object → secondary focal point raised to priority 2;
  5. analyze_image found the moonlit window out-ranking the glasses (0.98) — darkening it made the glasses saliency #1–2.
  Provisional AI score of the final take: 77/100 (story_frame) — not a pass; envelope still missing.
- Real critique of an existing slide (ลูกนกตกรัง 01): the baby bird is not salient; provisional 65/100 — fixes listed in tests/real/babybird01_job.json.
- Not done: no Codex generation (quota — ask first); no viewer A/B test yet; analyze_image sharpness uses the top
  saliency peak, not the declared focal point (known limitation).

## 2026-11-24 — first real job: ฉากละครบ้านร้าง (kits/2026-11-24_abandoned-house-scene)
- 16:9 size in build_prompt was 1344×768 (1.75:1) — validate_job caught it; now 1360×768 (9:16 → 768×1360).
- "abandoned house" without culture words → Western cabin; describing Thai features concretely (tall round pillars, steep roof with gable boards sweeping up into curved horns, framed teak panels) produced a recognisable Thai house.
- img2img at denoise 0.55–0.6 could NOT remove an existing moon or add a new roof shape — use post inpaint for removals, text-to-image for shape changes.
- "moonlight" wording summons a visible moon (same lesson as the lamp): describe the light, not the source.
- Finals: A fog dusk (provisional 71.5/100, "abandoned" reads weakly), B night window (provisional 77.5/100, roof not Thai). Neither passes 90.

## 2026-11-25 — Visual arts deepening (batch VA1)
- New `tools/inspect_views.py`: 6-view sheet + 7 indicator checks; `--style lineart` thresholds calibrated on 26 published
  charcoal slides. Regression test on golden glasses v1 (fails) / v5 (passes) in run_tests.py.
- `score.py --profile art_mastery` (11 craft criteria of the visual-arts brief); tests 734/734.
- Deep reference files in `creative-intelligence/knowledge/visual-arts/` (183 new sources), routed from SKILL.md.
- Experiments VA-001 (FLUX light phrase leaks into camera/product — not a controlled test) and VA-002 (darken surround
  beats desaturate for a stolen focal point) logged in VISUAL_EXPERIMENTS.json.
