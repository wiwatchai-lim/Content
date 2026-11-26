---
name: creative-critic
description: "Independent critique of any creative work before it reaches the user, or when the user asks for a review: images, posts, carousels, scripts, captions, voice-over direction, storyboards, clip plans, mixes, campaign concepts. The critic is a separate role from the maker: it runs as a fresh sub-agent that sees only the work, the brief, the house rules, memory and the rubric, and returns located findings (where, what, why with rule or source, fix, severity, confidence). Use for \"วิจารณ์งาน\", \"ตรวจงาน\", \"งานนี้ดีไหม\", \"มีอะไรผิดบ้าง\", \"เช็กก่อนส่ง\", \"ให้คะแนน\", and as the last step of every production skill before delivery. For pixel measurements of an image use ai-visual-artist's tools inside the critique; for voice takes use ai-voice-director qc.py."
---

# Creative Critic

The maker never grades its own work. The critic gets the work cold, finds what is wrong with evidence, and says how to
fix it. Talk to the user in Thai, short; the critique file itself can be English or Thai.

Why separate: makers overrate their own work and read intent into it (self-evaluation and IKEA-effect bias); AI judges
also prefer longer answers, the first option shown, and their own outputs. The packet below removes the maker's
reasoning and the rules in step 3 counter the rest. Evidence and method: `creative-intelligence/domains/12-independent-creative-criticism.md`
and `13-quality-assurance-evaluation.md`.

## 1. Build the packet (maker side — 1 command)
```bash
python creative-intelligence/tools/critic.py packet --work <file-or-folder> [--work <more>] --brief "<what was asked, for whom, where it runs>" \
  --kind image|post|carousel|script|caption|voice|storyboard|clip|mix|concept --tags <memory tags> --out <job>/critique/packet.md
```
It writes: the work paths, the brief, the house rules that apply (`STUDIO_RULES` section of this file), the memory brief
(`memory.py brief` — past rejections, known errors, characters, brand style), the rubric for the kind (from the domain
files) and the output format. It never includes the maker's notes, reasoning or self-score.

## 2. Run the critic (fresh sub-agent)
Launch a `general-purpose` agent with only: "Read `<packet.md>` and follow it. Write `<job>/critique/critique.json` and
`critique.md`." Do not add your opinion of the work. Several kinds of work in one job → one critic per kind, in parallel.
Small text jobs (a caption, a 4-line VO) may be critiqued inline only if no sub-agent is possible — then say so in the
critique (`"critic": "inline (not independent)"`).

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

## 5. After the critique (maker side)
1. Fix critical and major findings (or write why a finding is rejected — critics can be wrong).
2. Re-run the critic on the fixed version if there was any critical finding.
3. Record: `python creative-intelligence/tools/critic.py record <job>/critique/critique.json [--accepted F1,F3]`
   → stores the critique in Creative Memory and turns accepted critical/major findings into `error` records.
4. When the user gives a verdict, store it: `memory.py add --type approval|rejection` with their words (see
   `creative-intelligence/memory/README.md`). The user's verdict outranks the critic; when they disagree with the
   critic, record it — that is how the critic gets calibrated.
5. The same error in ≥ 2 jobs → fix the process (template, prompt, skill rule, memory `taste`), not just the job.
6. To compare scores over time keep the critic set-up fixed (same packet format, rubric, model), or the numbers don't compare.

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
