# Creative Memory (long-term experience)

The studio learns only from what it **stores and retrieves**, not from claims that it "remembers". Every record is
something that really happened, with a pointer to where it came from.

## Store — `memory/store/<type>.jsonl` (one JSON per line; tool: `creative-intelligence/tools/memory.py`)
| type | what | key fields |
|---|---|---|
| approval | work the user approved | artifact, what_worked, user_words, prompt_ref |
| rejection | work the user rejected / asked to redo, and why | artifact, what_failed, user_words, fixed_by |
| taste | a stable preference of the user | applies_to, not_for, user_words |
| brand_style | a brand's rules | brand, tokens, do, dont |
| character | a recurring character's fixed traits | series, name, look, voice, personality, never |
| prompt | a prompt that was actually run | model, text, settings, seed, output, outcome, use_when |
| error | a mistake that happened or a critic caught (accepted) | what, cause, detect_by, fix_ref |
| fix | a fix that worked, with proof | problem, solution, proof, error_ref |
| rating | a score — human, or AI labelled `ai-judgement` | rater, score, scale, criteria, artifact |
| critique | a Creative Critic report | artifact, verdict, findings, accepted, rejected |

Common fields: `id` (auto), `date`, `summary`, `source` (file / user words / kit path), `evidence`
(`user` · `test` · `observed` · `sourced` · `ai-judgement`), `tags` (lower-case: series, job type, tool, brand).
A record that is replaced gets `superseded_by: <id>` — never delete history.

## Use it
```bash
python creative-intelligence/tools/memory.py brief --job "Slowly Growing EP162" --tags slowly-growing,mint-tao,carousel   # BEFORE a job
python creative-intelligence/tools/memory.py add --type approval --json '{"summary":"...","artifact":"...","user_words":"อันนี้ใช้ได้เลย ชอบ","source":"user 2026-11-26","evidence":"user","tags":["flux","carousel"]}'
python creative-intelligence/tools/memory.py recall --type error --tags flux
python creative-intelligence/tools/memory.py validate && python creative-intelligence/tools/memory.py digest   # → MEMORY_DIGEST.md
```
- **Before a job:** run `brief` with the job's tags; obey `taste`/`brand_style`/`character`; check every `error` listed.
- **After the user reacts:** store `approval` or `rejection` with their exact words. If the user says only "ชอบ",
  store it anyway and ask one short question only if the reason matters for the next job.
- **After a critic run:** `critic.py record` (stores the critique; accepted critical/major findings become `error`s).
- **After a fix proves itself:** `fix` with proof (file or kit) and `error_ref`.
- **After a real generation run worth reusing:** `prompt` with model, settings, seed, output and outcome.

## Rules
- Never store passwords, API keys, customer data (names, phone numbers, invoices) — `memory.py` refuses obvious secrets.
- AI judgements are never stored as human ratings.
- Source of truth for house rules stays CLAUDE.md + auto-memory; when they change, add a new `taste` record and mark the
  old one `superseded_by`.
- Older files kept for history: `FEEDBACK_HISTORY.json`, `PROMPT_EXPERIMENTS.json`, `QUALITY_BENCHMARKS.json` (seeded into
  the store on 2026-11-26 by `tools/seed_memory.py`). SUCCESSFUL/FAILED pattern summaries: `../DESIGN_PATTERNS.md`,
  `../ANTI_PATTERNS.md`; model limits: `../CAPABILITY_MATRIX.json`.
