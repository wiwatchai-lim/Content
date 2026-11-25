---
name: master-creative-director
description: Plan a creative job across disciplines and route it to the right skills and knowledge — for new or unusual creative work that mixes story, emotion, visuals, voice, sound, editing and marketing ("คิดคอนเทนต์", "วางคอนเซ็ปต์", "ช่วยคิดเรื่อง", "ทำแคมเปญ", "ทำซีรีส์ใหม่", "อยากได้งานที่ดีที่สุด", "ทำให้ดีขึ้นทั้งเรื่อง"), for questions about the studio's knowledge base ("รู้อะไรเรื่อง…", "มีหลักฐานไหม", "เรียนรู้ต่อ", "เรียนรู้ภาพต่อ", "ความคืบหน้าการเรียนรู้"), or to continue the Creative Intelligence research batches. Routine jobs keep their own skills — frame kits `frame-kit`, beat clips `beat-clip`, eye-break clips `eye-break-clip`, one image `ai-visual-artist`, one voice-over `ai-voice-director`.
---

# Master Creative Director

Choose the smallest set of knowledge that serves the job. Never load the whole base. Talk to the user in Thai, short.
CLAUDE.md house rules and `creative-intelligence/USER_PREFERENCES.md` always apply.

## 1. Understand (always)
Purpose · audience · platform/format · the one feeling and the one message · locked assets (real frames, characters,
logo) · deadline · quota cost (Codex, Gemini TTS = ask first). Missing price for a promo → ask.

## 2. Route — load only the rows the job needs
| the job needs… | go to |
|---|---|
| frame kit / Codex prompts for a frame | skill `frame-kit` |
| one image, poster, character sheet, critique | skill `ai-visual-artist` |
| deep visual craft (colour science, value, perspective, lens maths, light physics, materials) | `creative-intelligence/knowledge/visual-arts/README.md` |
| voice-over, Thai TTS, voice emotion | skill `ai-voice-director` |
| glasses beat clip / eye-break clip | skills `beat-clip` / `eye-break-clip` |
| story clip with characters | `story-clips/_craft/GUIDE.md` → STYLES/FX, `rig.js`, `sound.py` |
| story carousel (Mint & Tao etc.) | `carousel/README.md`, `slowly-growing/README.md` + knowledge below |
| human motivation, biases, needs | `creative-intelligence/knowledge/psychology/README.md` |
| emotion theory, mixed/social emotions, regulation | `creative-intelligence/knowledge/emotions/README.md` (+ voice/visual emotion libraries via `emotion_crosswalk.json`) |
| meaning, wisdom themes, quotes | `creative-intelligence/knowledge/philosophy/README.md` (check its misattributed-quote list) |
| words per slide, caption timing, attention | `creative-intelligence/knowledge/cognitive-science/README.md` |
| **any eye-health / lens claim** (UV, myopia, presbyopia, blue light, progressive, coatings) | `creative-intelligence/knowledge/optical/FACT_CHECK_WORKFLOW.md` + `claims_library.json` (module DRAFTED: say what is unverified) |
| ad wording rules, Thai CPA/PDPA, Meta health ads, dark patterns | `creative-intelligence/knowledge/marketing/ETHICS_AND_THAI_AD_RULES.md`; content type → `CONTENT_TYPES.md` |
| hook, pacing, retention review of a clip | `creative-intelligence/knowledge/audience/RETENTION_REVIEW.md` (no invented attention numbers) |
| ideas: 3 truly different directions | `creative-intelligence/knowledge/creative-thinking/IDEATION_PLAYBOOK.md` |
| Thai register, particles, speaking to elderly / foreigners | `creative-intelligence/knowledge/thai-language/STYLE_GUIDE.md` |
| story structure, templates 5 s – 10 min | `creative-intelligence/knowledge/storytelling/STORY_TEMPLATES.md` (DRAFTED) |
| script / VO / caption check (spoken style, length, duration ~11 Thai chars/s fallback) | `creative-intelligence/knowledge/screenwriting/SCRIPT_CHECKER.md` |
| jokes, gentle humour, red lines | `creative-intelligence/knowledge/comedy/COMEDY_PLAYBOOK.md` (DRAFTED) |
| emotion over time; emotion → voice/colour/light/camera/music/SFX/cut | `creative-intelligence/knowledge/emotional-architecture/EMOTION_DESIGN_MATRIX.md`, `ARC_TEMPLATES.md` |
| mix, loudness, ducking, ffmpeg | `creative-intelligence/knowledge/audio-engineering/MIX_PLAYBOOK.md` |
| sound effects per event, music brief | `creative-intelligence/knowledge/sound/SOUND_DESIGN_LIBRARY.md`, `creative-intelligence/knowledge/music/MUSIC_DIRECTION.md` (DRAFTED) |
| symbols, Thai religious/royal limits, gestures | `creative-intelligence/knowledge/semiotics/SYMBOL_LIBRARY.json`, `creative-intelligence/knowledge/culture/CULTURAL_CHECK.md` (DRAFTED — not legal advice) |
| series bible, world rules, continuity before a new episode | `creative-intelligence/knowledge/world-building/STORY_BIBLE_TEMPLATE.md`, `creative-intelligence/knowledge/continuity/CONTINUITY_SYSTEM.md` (+ continuity.schema.json; ids prefixed by series) |
| brand book for any client, brand consistency check | `creative-intelligence/knowledge/branding/BRAND_GUIDE_TEMPLATE.md`, `BRAND_CHECK.md` |
| poses / body acting (incl. faceless characters, Thai etiquette) | `creative-intelligence/knowledge/acting/POSE_LIBRARY.json`, `ACTING_GUIDE.md` |
| "make it look premium / minimal / not AI-looking", taste vs error in critique | `creative-intelligence/knowledge/aesthetics/LOOK_DICTIONARY.md`, `CRITIQUE_PROTOCOL.md`; why people like images → `creative-intelligence/knowledge/neuroaesthetics/README.md` |
| cartoon / comic / manga / webtoon / sticker / illustration in any style | `creative-intelligence/knowledge/cartoon/README.md` (style cards, rendering recipes, panel layouts, AI tests) |
| "is this true?" | `creative-intelligence/EVIDENCE_MATRIX.json`, `SOURCE_REGISTRY.json` (lookup by key with python, don't read whole) |
| what a model/tool can really do | `creative-intelligence/CAPABILITY_MATRIX.json` |
| which file covers a module | `creative-intelligence/KNOWLEDGE_MAP.md` |

Check a module's status in KNOWLEDGE_MAP before trusting it: NOT STARTED / RESEARCHING = say the knowledge is thin.

## 3. Develop
For new or important work give 2–3 directions (one Thai line each: idea · feeling · look) and recommend one.
Write a one-page brief in the job folder: emotional timeline (beat → image, light, colour, voice, sound, cut),
then hand each part to its skill.

## 4. QC and learn
- Before handing over anything factual or important: `creative-intelligence/knowledge/critical-thinking/PRE_DELIVERY_CHECK.md`
  (assumptions · evidence · criteria · what could be wrong · who could be misled).
- Score with `creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md` — critical failures first; automated and human
  scores in separate columns; every number has a reason.
- After delivery: add lessons (DESIGN_PATTERNS / ANTI_PATTERNS / the area log), the user's words to
  `creative-intelligence/memory/FEEDBACK_HISTORY.json`, real model runs to `memory/PROMPT_EXPERIMENTS.json`.

## 5. Continue learning (when asked "เรียนรู้ต่อ" = next P batch, "เรียนรู้ภาพต่อ" = next visual-arts VA batch, or there is spare time)
Follow `creative-intelligence/RESUME.md`: next batch, shared brief `schemas/RESEARCH_BRIEF.md`, then
`python creative-intelligence/tools/registry.py build` and `validate`, update LEARNING_PROGRESS.json + CHANGELOG.md.
Never mark HUMAN REVIEWED / PRODUCTION READY without the user's review.
