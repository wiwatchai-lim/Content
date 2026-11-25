# Phase 0 — Project Audit (2026-11-25)

## What already exists (kept, linked into the new system)
| asset | content | quality signal |
|---|---|---|
| skill `ai-visual-artist` (2026-11-24) | 192 source keys (45 full text, 55 abstract, 38 bibliographic, 54 web/docs); palettes 204, lighting 51, compositions 30, styles 102, emotion→visual 114, 141 licensed artwork records, 239 prompt templates, 117 test cases; 6 tools | 729/729 offline tests; 2 real FLUX jobs (provisional 71.5–77.5/100, none passed 90) |
| skill `ai-voice-director` (2026-11-24) | 123 works (19 full text, 54 abstract); 108 voice emotions, 43 pronunciation entries, 207 directed lines, 48 test cases, 44 evidence claims; 5 tools | 388/388 offline tests; 27 real EP01 takes analysed; no native-listener ratings |
| `story-clips/_craft/` (2026-11-21→24) | GUIDE, STYLES, FX, LEARNING-LOG, rig.js v2, fx.js, sound.py, 83 CC0 SFX, 12-lesson curriculum (~3,150 lines, 292 unique web sources) | used in night-optic EP01, zombie, eyesight series |
| production skills | frame-kit, beat-clip, eye-break-clip, daily-post, flux-like-chatgpt, remove-spots | in daily use |
| tools/ | render, video, cutout, depth, flux, wan, gemini_tts, soundtrack, beat-audio, ambient | in daily use |
| output so far | 120 story carousels, 30 Slowly Growing stories, 4 story series, many clips | real production |

## Gaps against the directive (42 modules)
- **No knowledge at all:** M23 music, M28 audience, M29 marketing strategy, M30 culture, M31 comedy, M32 emotional architecture,
  M33 creative thinking, M41 critical thinking (as a written module), M16 world building, M38 continuity, M12 semiotics.
- **Practice without sourced knowledge:** M13 storytelling, M14 dialogue (120 carousels written), M17 acting, M22 sound,
  M27 branding (rules only), M35 computer vision (tools only).
- **Not linked:** two emotion libraries (voice 108, visual 114) with different ids; three separate source lists.
- **No human evaluation anywhere** → nothing can honestly be HUMAN REVIEWED or PRODUCTION READY.
- Missing structured libraries: symbols, story patterns, dialogue, archetypes, expressions, poses, shots, camera moves,
  animation moves, sound, music moods, editing, layouts.

## What Phase 1 built (this session)
`creative-intelligence/` with control files, schemas, a registry that imports all 607 existing sources with pointers to
their full records (no copying), validator, knowledge graph (64 nodes / 69 edges), capability matrix from real use,
quality score with critical failures, experiment template, experience memory files, and the `master-creative-director`
router skill. See CHANGELOG.md.

## Tools/limits found
- Web search/fetch available → research is possible; paywalled books can only be `bibliographic`.
- Codex and Gemini TTS cost quota → no generation without asking. FLUX/Wan/HTML are free.
- No audience panel → human evaluation = the user's ratings (+ IG/FB results via ads-meta later).
