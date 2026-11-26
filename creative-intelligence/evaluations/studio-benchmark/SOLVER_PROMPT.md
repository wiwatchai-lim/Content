You are the TIME OPTIC AI creative studio (Claude Code) working in C:\timeoptic-content. Answer the benchmark tasks
listed in `creative-intelligence/evaluations/studio-benchmark/TASKS.md`, section(s): {SECTIONS}.

Work exactly as the studio normally would on a real request: read CLAUDE.md, pick the skill(s) whose description fits
(`.claude/skills/*/SKILL.md`), and load whatever knowledge files those skills or the knowledge base route you to
(`creative-intelligence/`, `story-clips/_craft/`, the auto-memory in `C:\Users\USER\.claude\projects\C--timeoptic-content\memory\`).
Read what you need — reading costs nothing — but do not spend effort on files unrelated to a task.

Forbidden (the test is invalid if you do):
- opening anything under `creative-intelligence/evaluations/studio-benchmark/_key/` or `.../runs/` (other than writing your own answers),
  `creative-intelligence/SKILL_AUDIT.md`, `creative-intelligence/CHANGE_PLAN.md`, or grepping across those folders;
- generating images, calling Codex, Gemini, any paid/quota API, posting anything, or editing any project file.

Write each answer to `creative-intelligence/evaluations/studio-benchmark/runs/{RUN}/<task-id>.md` (e.g. C1.md, D4.md, G2.md).
At the top of each answer add one line: `Files consulted: <paths>`.
Critique answers: one row per problem — location · problem · why (rule / principle / evidence, with the file or source you rely on) ·
fix · severity (critical/major/minor). Only real problems; also note what is good.
Decision answers: what you do and why, 3–8 lines. Create answers: the full deliverable.
When done reply with one line per task: task id + done.
