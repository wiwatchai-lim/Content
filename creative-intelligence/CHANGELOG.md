# Changelog — Creative Intelligence

## 2026-11-25 — "Learn everything, general-purpose" (user): batches U1–U3
- The user said the knowledge is for every field, not only eyewear, so RESEARCH_BRIEF is now domain-neutral and has a
  "getting full text" section (OpenAlex, Europe PMC). Preference saved.
- U1 (9 modules: story, script/copy, comedy, emotional architecture, sound, music, audio engineering, semiotics, culture),
  U2 (6: world building, continuity, branding, acting, neuroaesthetics, aesthetics). No module is NOT STARTED any more.
- U3 full-text upgrade of 9 DRAFTED modules: read ratios rose to 50-93%; many snippet-based findings corrected (LESSONS_LEARNED).
  EVIDENCE P2-001 corrected: fear without efficacy does not backfire on average; efficacy still helps.
- Spot-checks: U1 8 (1 wrong, corrected), U2 12 (0 wrong); U3 check running.
- The Thai OCPB AI-label rule (official example labels are in Thai) is recorded in culture/CULTURAL_CHECK.md J1 → the
  user still has to decide how it fits the English-only post rule.

## 2026-11-25 — Brief v3: plan + batch T1
- `MASTER_CREATIVE_INTELLIGENCE_PLAN.md`: Phase 0 answers, phase→module map, 35 deliverables → files (D007), roadmap,
  7 proposed new topics. New module M43 optical & eye health (+ graph edges).
- T1 research (6 modules, 185 sources → registry 1176): optical + fact-check workflow + 28 claims; Thai pronunciation
  proposals (28), style guide, normalisation rules; pre-delivery check; ideation playbook; retention review; content
  types; ethics + Thai ad rules. Spot-check 13/13 confirmed.
- Voice skill: normaliser reads lens powers (ลบ/บวก), SPH/CYL/AXIS/ADD/PD, VA 6/6, ranges (ถึง), °C; brand fixes HOYA
  โฮยา, Essilor เอสซีลอร์, Varilux วารีลักซ์, + Comfort Max. Tests 396/396.
- Statuses: M41, M33, M28, M29 → SOURCE VERIFIED; M43 DRAFTED (20% read). EVIDENCE +5 (T1-001…005).

## 2026-11-25 — Visual-arts brief: VA0 audit + batch VA1
- VA0: term-coverage audit of 37 existing files (`knowledge/visual-arts/_build/audit.py` → `_audit.json`); gap table in
  `knowledge/visual-arts/README.md`. Decision D006 (deepen the skill, no second visual skill).
- VA1: 4 research agents → 16 deep files + libraries (60 colour relationships, 13 tonal plans, 11 edge, 12 shape, 17 new
  lighting setups, 31 materials, 16 atmospheres, 31 shots/angles, 19 lens uses, 49 error patterns), 183 new sources
  (991 total). Spot-check 12: 9 confirmed, 3 partly (corrected), 0 wrong. M34 → SOURCE VERIFIED.
- Tools: `inspect_views.py` (6-view sheet, `--style lineart`), `score.py --profile art_mastery`; tests 734/734.
- Experiments: VA-000 (tool agrees with golden-glasses judgement), VA-001 (FLUX light phrase is not a controlled
  variable), VA-002 (darken surround > desaturate). EVIDENCE_MATRIX +5 (VA-001…005).

## 2026-11-25 — Phase 2 batch P2 (first pass)
- 4 research agents (shared brief) → `knowledge/psychology` (48 sources), `knowledge/emotions` (50 + crosswalk of 114 rows,
  22 emotions missing from both libraries, unified-id proposal), `knowledge/philosophy` (52, 40 misattributed quotes,
  12 Mint & Tao examples), `knowledge/cognitive-science` (51, production rules tagged EVIDENCE/DERIVED/INDUSTRY).
- Registry 607 → 808 sources. Spot-check of 4: 2 confirmed (Kang2009 from PDF, Jack2012), 2 unreachable, 0 wrong.
- Status rule added: new modules need ≥50% sources really read + clean spot-check for SOURCE VERIFIED.
  → M03, M04 SOURCE VERIFIED; M01 (25% read), M02 (44%) DRAFTED.
- EVIDENCE_MATRIX +7 claims (P2-001…007); DESIGN_PATTERNS +6, ANTI_PATTERNS +2.

## 2026-11-25 — Phase 0 + Phase 1
- Audit of skills, knowledge and tools → `reports/PHASE0_AUDIT.md`.
- Infrastructure: MASTER_INDEX, KNOWLEDGE_MAP (generated), RESEARCH_INDEX, SOURCE_REGISTRY (generated, 607 legacy sources
  imported with pointers), EVIDENCE_MATRIX (44 voice claims imported), LEARNING_PROGRESS (42 modules, honest statuses),
  CAPABILITY_MATRIX (12 tools, observed only), CROSS_DOMAIN_RELATIONSHIPS (64 nodes / 69 edges), USER_PREFERENCES,
  LESSONS_LEARNED, DESIGN_PATTERNS, ANTI_PATTERNS, DECISION_LOG (D001–D005), RESUME.
- Schemas: source.schema.json, RESEARCH_BRIEF.md. Tools: registry.py (build / validate / stats / map), seed scripts.
- Evaluations: MASTER_QUALITY_SCORE.md (100 pts + critical failures). Experiments template. memory/ experience files.
- New skill: `.claude/skills/master-creative-director` (router; no 42 thin skills, see D002).
