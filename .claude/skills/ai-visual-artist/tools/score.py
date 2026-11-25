"""100-point visual score with purpose-specific weight profiles + a prioritised fix list.

  python score.py job.json                         # uses job.score.criteria (each rated 0–10) + job.critique
  python score.py job.json --profile product_ad    # override the weight profile
  python score.py --profiles                       # list profiles

Raters give every criterion a 0–10 rating (10 = could not be better for this purpose). The profile turns ratings into
points (weight × rating / 10), so the same ratings can be re-weighted for a product ad vs a story frame. Pass = ≥ 90
(internal bar). An AI rating is a judgement, not proof that people will like the image — prefer audience A/B tests.
Fix order: critical → major → minor → polish; within a level, issues on the primary focal point first; one change per
iteration so good parts are kept (IMAGE_CRITIQUE_ENGINE.md).
"""
import json
import sys
from pathlib import Path

CRIT = ['composition', 'color_harmony', 'lighting', 'visual_hierarchy', 'emotional_impact', 'storytelling', 'art_style', 'technical_accuracy', 'originality', 'finishing']
PROFILES = {   # weights sum to 100
    'default':          [15, 10, 10, 10, 15, 10, 10, 10, 5, 5],
    'product_ad':       [12, 10, 12, 15, 8, 5, 6, 20, 4, 8],     # product fidelity & hierarchy first (technical = product unchanged, no artefacts)
    'story_frame':      [15, 8, 10, 10, 20, 20, 7, 5, 3, 2],
    'character_sheet':  [8, 8, 5, 5, 7, 5, 20, 30, 7, 5],        # technical = consistency across views/proportions
    'social_post_text': [12, 8, 6, 22, 10, 7, 7, 15, 5, 8],      # hierarchy incl. text legibility, safe zones
    'key_visual':       [15, 12, 12, 12, 15, 8, 8, 6, 8, 4],
    'infographic':      [12, 8, 2, 25, 3, 10, 5, 25, 2, 8],
}
# Craft-mastery set (Advanced Visual Arts directive, 2026-11-25): its own criteria, used with --profile art_mastery.
# Fine art / illustration / key frames where perspective, value and material truth must be judged separately.
CRIT_ART = ['composition', 'color_science', 'value_structure', 'perspective', 'lighting', 'visual_hierarchy',
            'material_rendering', 'shape_form', 'emotional_communication', 'artistic_taste', 'technical_accuracy']
ART_PROFILES = {'art_mastery': [15, 15, 10, 10, 10, 10, 5, 5, 10, 5, 5]}
SEV = {'critical': 0, 'major': 1, 'minor': 2, 'polish': 3}


def score(job, profile=None):
    prof = profile or job.get('score', {}).get('weights_profile') or 'default'
    crit = CRIT_ART if prof in ART_PROFILES else CRIT
    w = ART_PROFILES[prof] if prof in ART_PROFILES else PROFILES[prof]
    ratings = job.get('score', {}).get('criteria', {})
    missing = [c for c in crit if c not in ratings]
    pts = {c: round(w[i] * min(10, ratings.get(c, 0)) / 10, 2) for i, c in enumerate(crit)}
    total = round(sum(pts.values()), 1)
    issues = sorted(job.get('critique', []), key=lambda x: (SEV[x['severity']], 0 if 'focal' in x['where'].lower() else 1))
    plan = [f"{i + 1}. [{x['severity']}] {x['area']} @ {x['where']}: {x['problem']} → {x['fix']}" + (f" (watch: {x['side_effects']})" if x.get('side_effects') else '')
            for i, x in enumerate(issues)]
    blocking = [x for x in issues if x['severity'] == 'critical']
    return {'profile': prof, 'weights': dict(zip(crit, w)), 'points': pts, 'total': total, 'missing_ratings': missing,
            'pass_90': total >= 90 and not blocking, 'blocking_issues': len(blocking), 'rater': job.get('score', {}).get('rater', 'unknown'), 'fix_order': plan}


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    if '--profiles' in sys.argv:
        print(json.dumps({**{k: dict(zip(CRIT, v)) for k, v in PROFILES.items()}, **{k: dict(zip(CRIT_ART, v)) for k, v in ART_PROFILES.items()}}, indent=1)); return
    job = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    prof = sys.argv[sys.argv.index('--profile') + 1] if '--profile' in sys.argv else None
    print(json.dumps(score(job, prof), ensure_ascii=False, indent=1))


if __name__ == '__main__':
    assert all(sum(v) == 100 for v in [*PROFILES.values(), *ART_PROFILES.values()])
    main()
