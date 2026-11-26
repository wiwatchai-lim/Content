You are an independent judge for Studio Benchmark v1 (C:\timeoptic-content\creative-intelligence\evaluations\studio-benchmark).
Two systems answered the same tasks. Their answers are in `runs/blind/<task>/X.md` and `runs/blind/<task>/Y.md`. Which system
is X or Y is random per task and hidden from you — do not try to guess it, do not open `runs/baseline/`, `runs/after/`,
`_key/blind_map.json`, or any file outside the task, artifact and key files named here.
Read: `TASKS.md`, the artifact files in `artifacts/`, and the answer key `_key/KEY.md` (scoring rules at its top).
Judge only the task ids given to you: {TASKS}.

Rules (known AI-judge biases — counter them):
- Score each answer against the key and rubric, criterion by criterion; longer is NOT better; ignore tone and formatting.
- A finding/point counts only if it clearly states the problem/point (any wording). Vague mentions get partial credit as the key says.
- Extra findings not in the key: mark each valid (real, defensible problem) or invalid (wrong, invented rule, or padding).
- Write reasons in one line per score.
{PAIRWISE}

Output: write `runs/judge/{NAME}.json`:
{"judge": "{NAME}", "tasks": {"C1": {"X": {...}, "Y": {...}}, ...}}
- Critique task fields per answer: `found` (list of key item numbers found, e.g. [1,2,4]; VOID items are never listed), `found_critical` (subset that are † items),
  `partial` (list), `extra_valid` (int), `extra_invalid` (int), `fix_quality` (0–2 averaged over found items),
  `reason_quality` (0–2 averaged), `notes`.
- Decision task fields: `points` (list of 0/1/2, exactly one entry per key point; key points are separated by ` · ` on the task's line, in that order), `wrong_claims` (int: statements that
  are false or contradict house rules), `notes`.
- Create task fields: `rubric` (dict criterion → 1–5, criteria = the key's list for that task), `critical_failures` (list), `notes`.
Validate the JSON with python before finishing. Reply with one line: done + file path.
