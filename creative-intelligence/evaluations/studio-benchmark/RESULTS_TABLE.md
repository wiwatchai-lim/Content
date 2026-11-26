# Studio Benchmark v1 — results (unblinded by blind.py)

Scores are AI-judge scores against the answer key (`_key/KEY.md`); not human ratings.

## A. Critique — planted-defect recall

| task | items | after found · critical · extra valid/invalid · fix · reason | baseline found · critical · extra valid/invalid · fix · reason |
|---|---|---|---|
| C1 | 10 | 10.0/10 · 6.0/6 · 1.0/0.0 · 2.00 · 2.00 | 10.0/10 · 6.0/6 · 0.0/1.0 · 2.00 · 1.90 |
| C2 | 11 | 11.0/11 · 6.0/6 · 0.0/0.0 · 2.00 · 2.00 | 11.0/11 · 6.0/6 · 2.0/0.0 · 2.00 · 2.00 |
| C3 | 8 | 7.0/8 · 5.0/5 · 1.0/0.0 · 1.90 · 2.00 | 8.0/8 · 5.0/5 · 2.0/0.0 · 2.00 · 1.90 |
| C4 | 9 | 9.0/9 · 5.0/5 · 2.0/0.0 · 2.00 · 2.00 | 8.5/9 · 5.0/5 · 2.0/1.0 · 1.80 · 1.75 |
| C5 | 7 | 7.0/7 · 4.0/4 · 1.0/1.0 · 2.00 · 2.00 | 7.0/7 · 4.0/4 · 2.0/0.0 · 2.00 · 2.00 |
| C6 | 7 | 7.0/7 · 4.0/4 · 1.0/0.0 · 2.00 · 2.00 | 7.0/7 · 4.0/4 · 1.0/2.0 · 2.00 · 2.00 |
| C7 | 7 | 7.0/7 · 4.0/4 · 0.0/0.0 · 2.00 · 2.00 | 7.0/7 · 4.0/4 · 0.0/1.0 · 2.00 · 2.00 |
| C8 | 6 | 6.0/6 · 2.0/2 · 1.0/0.0 · 2.00 · 2.00 | 6.0/6 · 2.0/2 · 1.0/0.0 · 2.00 · 2.00 |
| **total** | | **64.0/65 (98%) · crit 36.0/36 (100%) · extra 7/1 · fix 1.99 · reason 2.00** | **64.5/65 (99%) · crit 36.0/36 (100%) · extra 10/5 · fix 1.98 · reason 1.94** |

## B. Decisions — key points (0–2 each)

| task | after points · wrong claims | baseline points · wrong claims |
|---|---|---|
| D1 | 12.0/14 · 0.0 | 12.0/14 · 0.0 |
| D2 | 6.0/6 · 0.0 | 6.0/6 · 0.0 |
| D3 | 7.0/8 · 0.0 | 6.0/8 · 1.0 |
| D4 | 8.0/8 · 0.0 | 8.0/8 · 0.0 |
| D5 | 10.0/10 · 0.0 | 10.0/10 · 0.0 |
| D6 | 8.0/8 · 0.0 | 8.0/8 · 0.0 |
| D7 | 8.0/8 · 0.0 | 8.0/8 · 0.0 |
| D8 | 8.0/8 · 0.0 | 8.0/8 · 0.0 |
| D9 | 6.0/6 · 0.0 | 6.0/6 · 0.0 |
| D10 | 4.0/4 · 0.0 | 4.0/4 · 0.0 |
| D11 | 8.0/8 · 0.0 | 8.0/8 · 0.0 |
| D12 | 10.0/10 · 0.0 | 7.0/10 · 0.0 |
| **total** | **95.0/98 (97%) · wrong 0.0** | **91.0/98 (93%) · wrong 1.0** |

## C. Create — rubric mean (1–5) and pairwise preference (both orders)

| task | after rubric mean · critical failures | baseline rubric mean · critical failures | pairwise votes |
|---|---|---|---|
| G1 | 4.42 · 0.0 | 3.50 · 0.0 | after, after |
| G2 | 4.93 · 0.0 | 5.00 · 0.0 | baseline, baseline |
| G3 | 5.00 · 0.0 | 5.00 · 0.0 | after, after |
| G4 | 4.30 · 0.0 | 4.60 · 0.0 | after, baseline |
| **mean** | **4.66** | **4.53** | |
