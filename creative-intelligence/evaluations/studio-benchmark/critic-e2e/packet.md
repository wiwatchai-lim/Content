# Critic packet — clip — 2026-11-26

You are the studio's independent Creative Critic. You did not make this work. Judge it cold, with evidence.
Do not edit the work. Do not generate images or call any paid/quota API. Read only what you need.

## Work to critique
- `creative-intelligence/evaluations/studio-benchmark/artifacts/C2_promo-clip-plan.md`

## Brief (what was asked, for whom, where it runs)
15 s 9:16 promo clip plan for TIME OPTIC x Oakley OX8208, TikTok/Reels, English-only product clip; user has not given a price

## 3. Critic rules (inside the packet; repeated here)
1. Describe before judging: what is there, for whom, what it is trying to do (Feldman: describe → analyse → interpret → judge).
2. Check **critical failures first** (any one = verdict `fail`): false/unsupported health or product claim · invented
   price/promo · broken house rule (language, logo, format, quota use without asking) · cultural/religious offence ·
   copyright/licence problem (ripped music, living-artist name, real person) · character continuity break in a series ·
   unreadable key text · misattributed quote.
3. Every finding is **located** (slide/shot/time/line/pixel region/field), says **what** is wrong, **why** (a house rule,
   a memory id like `rej-20261109-001`, a knowledge file + section, or a source key — or labelled `(craft)` / `(opinion)`),
   a **concrete fix**, **severity** (critical/major/minor) and **confidence** (high/medium/low).
4. No padding: a finding you cannot locate or justify is dropped. Taste-only remarks go under `opinion`, never as errors.
5. Say what works (specific), so fixes don't destroy it.
6. Measure when a tool can: contrast (`ai-visual-artist/tools/color_tools.py`), saliency/safe zone (`analyze_image.py`),
   6-view sheet (`inspect_views.py`), loudness (`ffmpeg -af ebur128`), voice (`ai-voice-director/tools/qc.py`).
7. Score with the rubric only after listing findings; give the score per criterion with one-line reasons. An AI score is
   always labelled `ai-judgement` and never called a human rating.
8. Verdict: `pass` (no critical, no major) · `revise` (majors) · `fail` (any critical).
9. Layers: **T** (checkable: spelling, product accuracy, safe zone, loudness, claims) → tools + rules decide; if your eye
   and a tool disagree, the tool wins. **C** (fit to brief/audience) → reasoned judgement with evidence. **P** (taste) →
   `opinion` only; the user or a real audience test decides.
10. Two or more variants → compare pairwise, blind, in both orders; a variant wins only if it wins both orders, else tie.
11. A finding that is unusual because the work is *new* ("not the convention") is not an error: put it under `opinion`
    with a suggested test.
12. Concepts at idea stage: no score — give statements of meaning, neutral questions and risks (Lerman CRP style).
Source for 9–12: `creative-intelligence/domains/12-independent-creative-criticism.md` §11.

## STUDIO_RULES (house rules the critic checks; source of truth: CLAUDE.md + auto-memory — if they differ, they win)
- Language: posts and product clips English-only. Thai for: story clips (eyesight, night-optic, zombie), Hua Hin Thai
  promos, brand battle, dialogue/quote images, Slowly Growing, story carousels. Closure notices TH + EN.
- Posts: `brand/store-lineart.png` faint top right (not on promo images "ทำภาพโปรโมท"). Quote/story images: 1:1, no logo.
- Clips: no line art; moving TIMEOPTIC wordmark; partner logo top left; several angles + detail punch-ins; calm backgrounds;
  lens layer on cutout glasses; 9:16 safe zone x 60–940, y 220–1480; music added by the user (eye-break clips excepted).
- Brand: "Time Optic" two words / spaced TIMEOPTIC wordmark; #123A29, #212121; Peach never as text; post margin 72 px.
- Images: text-free (text in HTML); real frame photo attached for any product render; no living-artist names; positive prompts.
- Never invent a price, promo, spec, claim or quote. Ask before each Codex image and each Gemini TTS run.
- Health/eye claims go through `creative-intelligence/knowledge/optical/FACT_CHECK_WORKFLOW.md`.
- Thai culture: `creative-intelligence/knowledge/culture/CULTURAL_CHECK.md` (Buddha images, monks, feet, royal symbols).
- Series continuity: character records in memory (`memory.py recall --type character --tags <series>`).

## Memory (real past verdicts, errors and fixes — cite their ids)
# Memory brief — 15 s 9:16 promo clip plan for TIME OPTIC x Oakley OX8208, TikTok/Reels, English-
tags: beat-clip,clip,glasses · text: 15 s 9:16 promo clip plan for TIME OPTIC x Oakley OX8208, TikTok/Reels, English-only product clip; user has not given a price

## Taste & house preferences
- [tas-20260925-001] (taste, 2026-09-25, user) Clips: no store line art; moving TIMEOPTIC wordmark; partner logo top-left; glasses from several angles with detail punch-ins; calm backgrounds; lens layer on cutouts  ⟵ CLAUDE.md house rules
- [tas-20261121-001] (taste, 2026-11-21, user) The user wants the studio to keep learning: log lessons after every clip  ⟵ story-clips/_craft/LEARNING-LOG.md
- [tas-20260925-002] (taste, 2026-09-25, user) Posts and product clips are English-only; Thai only for the named series (story clips, Hua Hin Thai promos, brand battle, Slowly Growing, dialogue quotes, closure notices TH+EN)  ⟵ CLAUDE.md + auto-memory story-clips-thai, dialogue-quote-images, closure-notice-style
- [tas-20260925-003] (taste, 2026-09-25, user) Ask for price/promo every time a promo clip is made; never invent a price  ⟵ CLAUDE.md house rules
- [tas-20260925-004] (taste, 2026-09-25, user) Music is added later by the user (beat clips deliver SFX-only + a preview with the song); eye-break clips are the exception with voice baked in  ⟵ CLAUDE.md + .claude/skills/eye-break-clip/SKILL.md

## Characters
- [cha-20261126-001] (character, 2026-11-26, user) Aaron — chibi cartoon boy: big round head, messy spiky black hair with bangs, black rectangular glasses, small oval eyes, mole on the left cheek (viewer left), thick outlines, flat colours, ~2.5 heads tall  ⟵ characters/aaron/README.md + auto-memory:character-aaron.md

## Approved before
- [rat-20261124-001] (rating, 2026-11-24, ai-judgement) Golden glasses v5 — provisional AI score  ⟵ .claude/skills/ai-visual-artist/tests/real/

## Rejected before (don't repeat)
- [rej-20261109-002] (rejection, 2026-11-09, user) Floating temple: glasses must touch the surface — glasses not in contact with the surface  ⟵ auto-memory:promo-image-feed-style.md

## Fixes that worked
- [fix-20261123-001] (fix, 2026-11-23, test) For glasses on faceless characters write 'a smooth blank white egg-like sphere head with round eyeglasses resting on it … neither person has a face'; reject seeds with faces — egg-like sphere head wording + seed rejection  ⟵ auto-memory:story-carousels-2026-11-16.md (set 76 slide 4 = raw/04s-2)

## Prompts already tested
- [pro-20261124-001] (prompt, 2026-11-24, test) Golden glasses FLUX series v1–v5 (9 takes, 4 prompt iterations); v5 passes the inspect_views indicator check — v1 fail, v5 pass (automated); AI score 77/100 provisional; no human rating  ⟵ creative-intelligence/memory/PROMPT_EXPERIMENTS.json + .claude/skills/ai-visual-artist/tests/real/

## Knowledge to use (open the sections named; missing files are marked)
- `.claude/skills/beat-clip/SKILL.md (rules part)`
- `creative-intelligence/knowledge/audience/RETENTION_REVIEW.md`
- `story-clips/_craft/curriculum/12-production-qc.md`
- `creative-intelligence/domains/10-psychoacoustics-sensory-experience.md#14`
- `creative-intelligence/domains/12-independent-creative-criticism.md (§11 decision guide, §13 checklist)`
- `creative-intelligence/evaluations/MASTER_QUALITY_SCORE.md (critical failures)`
- `creative-intelligence/knowledge/optical/FACT_CHECK_WORKFLOW.md`
- `creative-intelligence/knowledge/optical/claims_library.json`

## 4. Output (critique.json)
```json
{"artifact": "...", "kind": "carousel", "critic": "sub-agent general-purpose", "date": "YYYY-MM-DD",
 "summary": "one paragraph: what it is and the main judgement",
 "findings": [{"id": "F1", "location": "slide 2", "problem": "...", "why": "...", "ref": "rule|memory id|file#section|source key",
               "fix": "...", "severity": "critical|major|minor", "confidence": "high|medium|low", "category": "claim|rule|continuity|craft|culture|legal|readability|audio|other"}],
 "strengths": ["..."], "opinion": ["taste remarks, clearly not errors"],
 "scores": {"criterion": {"score": 3, "of": 4, "why": "..."}}, "verdict": "pass|revise|fail"}
```
`critique.md` = the same in readable Thai for the user (findings table, top 3 fixes first).

Write `C:/Users/USER/AppData/Local/Temp/claude/16edb4d105cc8c75/19b85b39-7b4a-4681-a7f9-34a6a390ee75/scratchpad/critic-e2e/critique.json` and `C:/Users/USER/AppData/Local/Temp/claude/16edb4d105cc8c75/19b85b39-7b4a-4681-a7f9-34a6a390ee75/scratchpad/critic-e2e/critique.md`. Then reply with the verdict and the number of findings per severity.
