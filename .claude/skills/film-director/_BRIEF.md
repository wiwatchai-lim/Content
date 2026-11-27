# Research brief — film-director skill (2026-11-27)

The user pasted "MASTER LEARNING DIRECTIVE — Cinematography, Film Direction & AI Video Production" (30 modules,
16 libraries, a 20-step decision system) and asked to learn it and store it as a skill here:
`.claude/skills/film-director/`. You research ONE group of modules. Also obey `creative-intelligence/schemas/RESEARCH_BRIEF.md`
(hard rules on honesty, tiers, access_status) — read it first.

## Do not duplicate — extend and link
Already in the repo (read the parts relevant to your group, cite them by path, add only what is new or deeper):
- `story-clips/_craft/curriculum/01..12-*.md` (photo, lens, composition, lighting, movement, 2D, 3D, storyboard, AI image, AI video, edit/grade, QC)
- `story-clips/_craft/GUIDE.md`, `STYLES.md`, `FX.md`
- `creative-intelligence/knowledge/visual-arts/` (CAMERA_ANGLE_LIBRARY.json 31 entries, LENS_OPTICS.md, lens_examples.json,
  PERSPECTIVE_MASTERY.md, LIGHTING_PHYSICS.md, light_libraries.json, COLOR_SCRIPTING.md …)
- `.claude/skills/ai-visual-artist/` (COMPOSITION_LIBRARY.json, LIGHTING_LIBRARY.json, COLOR_PALETTE_LIBRARY.json)
- `creative-intelligence/knowledge/` acting, emotional-architecture, audience, sound, music, continuity, cartoon
- `creative-intelligence/CAPABILITY_MATRIX.json` (what our tools/models really do: FLUX, Codex, Wan 2.2, Kling, HTML/rig)
If an existing library already has an entry, reference its id (e.g. `cam.eye_level`) instead of rewriting it.

## Hard rules
- Real research with WebSearch/WebFetch. Never invent a source, film example, year, quote, or finding. A film example
  must be one a real source discusses, or mark it `[CRAFT, unverified example]`.
- Craft advice (tier D) is never written as science. Mark each claim [EVIDENCE] or [CRAFT].
- AI model capabilities: only from official docs/papers you actually opened (Wan, Kling, Runway, Luma, Veo, Sora, Hailuo…)
  plus CAPABILITY_MATRIX. Date them — they change.
- General-purpose knowledge (any client, any genre). Shop examples (Thai story clips, glasses clips, Mint & Tao,
  Aaron chibi, IG Reels 9:16) are applications, not limits.
- Do not install packages, do not download large files, do not run Codex/Gemini/Kling (quota). Write ONLY your files.

## Each module file: `modules/NN-slug.md` (Thai explanation, English terms), sections in this order
1. นิยามและหลักการพื้นฐาน  2. ทฤษฎีและหลักการขั้นสูง  3. เหตุผลที่ใช้  4. ผลต่ออารมณ์และการรับรู้
5. ใช้เมื่อไร  6. ไม่ควรใช้เมื่อไร  7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)  8. ประยุกต์ตามประเภทวิดีโอ
(story clip, product/promo, Reels/TikTok vertical, explainer, cartoon, documentary/talking head)
9. AI image prompt examples  10. AI video prompt examples  11. Shot list example  12. ข้อผิดพลาดที่พบบ่อย
13. วิธีตรวจและแก้  14. แบบฝึกหัด + test case (practical training: e.g. same scene, 3 variants, what to compare)
15. แหล่งอ้างอิง (keys into your sources file). Be dense and practical; no padding.

## Libraries: `libraries/<NAME>.json` — JSON array, each entry at least
{"id":"move.dolly_in","name":"","category":"","definition":"","how":"","purpose":"","emotional_effect":[""],
 "use_when":[""],"avoid_when":[""],"examples":[{"work":"","note":"","source_key":""}],
 "ai_image_prompt":"","ai_video_prompt":"","common_mistakes":[""],"check":"","combine_with":[""],
 "related_ids":[""],"source_keys":[""],"evidence":"EVIDENCE|CRAFT|MIXED","test_status":"untested"}
Add fields that the library needs (e.g. focal_length_mm, kelvin, duration_s). Real entries only — no padding to a number.

## Sources: `sources/<group>.json` — same item schema as RESEARCH_BRIEF.md, date_accessed "2026-11-27",
`modules` = ["FD01".."FD30"]. Validate every JSON you write with python json.load.

## Module numbers (FD = film-director)
FD01 shot sizes · FD02 camera angles · FD03 camera movement · FD04 camera positioning · FD05 lens & optical physics ·
FD06 composition & framing · FD07 perspective & spatial depth · FD08 cinematic lighting · FD09 colour theory & grading ·
FD10 editing & transitions · FD11 film grammar · FD12 visual psychology · FD13 emotional cinematography ·
FD14 visual storytelling · FD15 character acting & body language · FD16 animation principles · FD17 cartoon cinematography ·
FD18 motion design · FD19 sound design & music sync · FD20 genre & directing styles · FD21 video technical specs ·
FD22 AI video generation · FD23 character & scene consistency · FD24 camera path planning · FD25 storyboarding & shot planning ·
FD26 production workflow · FD27 video quality assessment · FD28 audience attention & retention ·
FD29 originality & creative identity · FD30 automated creative evaluation

Final reply (≤10 lines): files written, entry counts per library, sources by tier/access_status, biggest gaps.
