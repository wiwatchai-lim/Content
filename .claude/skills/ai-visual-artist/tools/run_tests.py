"""All offline tests of the ai-visual-artist skill (no generation, no quota).

  python run_tests.py [-v]
"""
import json
import re
import sys
import tempfile
from pathlib import Path

import cv2
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import color_tools as ct  # noqa: E402
from validate_job import check, BLOCK  # noqa: E402
import build_prompt  # noqa: E402
import analyze_image  # noqa: E402
import score as scorer  # noqa: E402
import inspect_views  # noqa: E402

SKILL = Path(__file__).resolve().parent.parent
V = '-v' in sys.argv
R = []


def ok(g, n, c, info=''):
    R.append((g, n, bool(c)))
    if V or not c:
        print(('PASS ' if c else 'FAIL ') + f'[{g}] {n}' + (f' — {info}' if info and not c else ''))


def J(name):
    p = SKILL / name
    return json.loads(p.read_text(encoding='utf-8')) if p.exists() else None


# ---------------- colour maths
ok('color', 'white/black = 21', abs(ct.contrast('#FFFFFF', '#000000') - 21) < 1e-9)
ok('color', '#777 on white = 4.48', abs(ct.contrast('#777777', '#FFFFFF') - 4.478) < .01)
ok('color', 'OKLCH round-trip', ct.from_oklch(*ct.oklch('#EFCF9C')) == '#EFCF9C')
ok('color', 'OKLab white L=1', abs(ct.rgb_to_oklab((1, 1, 1))[0] - 1) < 1e-3)
lab = ct.xyz_to_lab(ct.rgb_to_xyz(ct.hex_to_rgb('#FFFFFF')))
ok('color', 'CIELAB white L=100', abs(lab[0] - 100) < .01 and abs(lab[1]) < .01)
ok('color', 'brand peach on snow fails text (accent only)', ct.contrast('#EFCF9C', '#FAFAFA') < 3)
ok('color', 'complementary hue +180', abs((ct.oklch(ct.harmony('#123A29', 'complementary')[1])[2] - ct.oklch('#123A29')[2]) % 360 - 180) < 3)
ok('color', 'deutan sim makes red/green closer', ct.ok_distance(ct.simulate('#C0392B', 'deutan'), ct.simulate('#27AE60', 'deutan')) < ct.ok_distance('#C0392B', '#27AE60'))

# ---------------- libraries
libs = {'palettes': J('COLOR_PALETTE_LIBRARY.json'), 'lightings': J('LIGHTING_LIBRARY.json'), 'styles': J('ART_STYLE_LIBRARY.json'),
        'emotions': J('EMOTION_VISUAL_LIBRARY.json'), 'compositions': J('COMPOSITION_LIBRARY.json')}
need = {'palettes': 150, 'lightings': 50, 'styles': 100, 'emotions': 100, 'compositions': 20}
ids = {}
for k, d in libs.items():
    ok('library', f'{k} file exists', d is not None)
    if not d:
        continue
    items = d[k]
    ids[k] = [x['id'] for x in items]
    ok('library', f'{k} ≥ {need[k]} ({len(items)})', len(items) >= need[k])
    ok('library', f'{k} ids unique', len(set(ids[k])) == len(ids[k]))
    empty = [x['id'] for x in items if any(v in ('', [], None) for kk, v in x.items() if kk != 'color_temperature_k')]   # CCT is null on purpose for neon/cel/AO
    ok('library', f'{k} no empty fields', not empty, str(empty[:5]))
S = {k: set(v) for k, v in ids.items()}
if 'styles' in libs and libs['styles']:
    bad = [(s['id'], f, i) for s in libs['styles']['styles'] for f, pool in (('lighting_ids', 'lightings'), ('composition_ids', 'compositions'), ('emotion_ids', 'emotions'))
           if pool in S for i in s.get(f, []) if i not in S[pool]]
    ok('crossref', 'style → lighting/composition/emotion ids exist', not bad, str(bad[:5]))
    names = [(s['id'], b) for s in libs['styles']['styles'] for b in BLOCK if b in (s['prompt_template'] + ' ' + s['prompt_example']).lower()]
    ok('ethics', 'no living artists / studio brands in style prompts', not names, str(names[:5]))
    ok('library', 'every style template has {subject}', all('{subject}' in s['prompt_template'] for s in libs['styles']['styles']))
if libs.get('emotions'):
    bad = []
    for e in libs['emotions']['emotions']:
        aps = e['approaches']
        if len(aps) < 3:
            bad.append((e['id'], 'approaches<3'))
        if len({a['camera_angle'] + a['camera_distance'] for a in aps}) < 2:
            bad.append((e['id'], 'same camera in all approaches'))
        for a in aps:
            for f, pool in (('composition_ids', 'compositions'), ('lighting_ids', 'lightings'), ('style_ids_that_fit', 'styles')):
                for i in a.get(f, []):
                    if pool in S and i not in S[pool]:
                        bad.append((e['id'], i))
    ok('crossref', 'emotions: ≥3 approaches, varied camera, valid ids', not bad, str(bad[:6]))
if libs.get('palettes'):
    worst = min(ct.contrast(p['text'], p['background']) for p in libs['palettes']['palettes'])
    ok('color', f'every palette text ≥ 4.5:1 (min {worst:.2f})', worst >= 4.5)
    bp = next((p for p in libs['palettes']['palettes'] if p['id'] == 'pal.brand_timeoptic'), None)
    ok('brand', 'pal.brand_timeoptic has exact brand hexes', bp and {'#123A29', '#212121', '#FAFAFA', '#EFCF9C', '#D9D4CB'} <= {c['hex'].upper() for c in bp['colors']})
    if 'emotions' in S:
        bad = [(p['id'], e) for p in libs['palettes']['palettes'] for e in p.get('emotion_ids', []) if e not in S['emotions']]
        ok('crossref', 'palette emotion ids exist', not bad, str(bad[:5]))
ref = J('REFERENCE_DATABASE.json')
if ref:
    ents = ref['entries']
    ok('reference', f'≥ 60 licensed entries ({len(ents)})', len(ents) >= 60)
    ok('reference', 'every entry has source_url + licence + evidence', all(e.get('source_url', '').startswith('http') and e.get('license') and e.get('license_evidence') for e in ents))
    bad = [(e['ref_id'], i) for e in ents for f, pool in (('style_ids', 'styles'), ('composition_ids', 'compositions'), ('lighting_ids', 'lightings'), ('emotion_ids', 'emotions'))
           if pool in S for i in e.get(f, []) if i not in S[pool]]
    ok('crossref', 'reference ids exist', not bad, str(bad[:6]))

# ---------------- analyze_image on a synthetic image with a known focal point
with tempfile.TemporaryDirectory() as td:
    img = np.full((900, 1200, 3), 40, np.uint8)
    cv2.circle(img, (800, 300), 70, (230, 230, 240), -1)
    p = Path(td) / 'syn.png'; cv2.imwrite(str(p), img)
    a = analyze_image.analyze(p)
    pk = a['saliency_peaks'][0]
    ok('analyze', f"focal peak found near the bright disc ({pk['x']}, {pk['y']})", abs(pk['x'] - .667) < .08 and abs(pk['y'] - .333) < .1)
    ok('analyze', 'nearest guide = thirds point', pk['nearest_guide_dist']['thirds'] < .08)
    ok('analyze', 'low key detected', a['value']['key'] == 'low')
    ok('analyze', 'balance offset to the upper right', a['balance']['weight_centre'][0] > .5 and a['balance']['weight_centre'][1] < .5)

# ---------------- inspect_views on real images (golden glasses: v1 lamp steals the eye, v5 judged fixed on 2026-11-24)
with tempfile.TemporaryDirectory() as td:
    real = SKILL / 'tests' / 'real'
    if (real / 'golden_v5.png').exists():
        r1 = inspect_views.inspect(real / 'golden_v1-2.png', Path(td) / 'a.jpg', (.48, .72))
        r5 = inspect_views.inspect(real / 'golden_v5.png', Path(td) / 'b.jpg', (.4, .68))
        ok('inspect', 'v1 flags the competing lamp (focal not strongest)', 'focal_point' in r1['flags'])
        ok('inspect', 'v5 focal point holds the strongest saliency', 'focal_point' not in r5['flags'])
        ok('inspect', 'six-view sheet written', (Path(td) / 'b.jpg').exists())

# ---------------- score profiles
ok('score', 'all weight profiles sum to 100', all(sum(v) == 100 for v in scorer.PROFILES.values()))
demo = {'score': {'criteria': {c: 9 for c in scorer.CRIT}}, 'critique': [{'area': 'artifacts', 'where': 'right hand', 'problem': 'six fingers', 'severity': 'critical', 'fix': 'crop'}]}
s = scorer.score(demo)
ok('score', '90 with a critical issue does not pass', s['total'] == 90 and not s['pass_90'])
ok('score', 'art_mastery weights sum to 100 over 11 criteria', sum(scorer.ART_PROFILES['art_mastery']) == 100 and len(scorer.CRIT_ART) == 11)
sa = scorer.score({'score': {'criteria': {c: 10 for c in scorer.CRIT_ART}}, 'critique': []}, 'art_mastery')
ok('score', 'art_mastery all-10 scores 100 and passes', sa['total'] == 100 and sa['pass_90'])

# ---------------- test cases
tc = J('TEST_CASES.json')
cats = {}
if tc:
    for c in tc['cases']:
        cats[c['category']] = cats.get(c['category'], 0) + 1
        job = c['input']
        e, w = check(job)
        ok('cases', f"{c['id']} validates", not e, '; '.join(e[:2]))
        pos = job.get('prompt', {}).get('positive', '')
        for chk in c.get('auto_checks', []):
            t = chk['type']
            if t in ('schema_valid', 'ids_exist'):
                ok('cases', f"{c['id']} {t}", not e)
            elif t == 'contrast_min':
                r = ct.contrast(chk['fg'], chk['bg']); ok('cases', f"{c['id']} contrast ≥ {chk['min']}", r >= chk['min'], f'{r:.2f}')
            elif t == 'prompt_contains':
                ok('cases', f"{c['id']} prompt contains '{chk['text']}'", chk['text'].lower() in pos.lower())
            elif t == 'prompt_not_contains':
                ok('cases', f"{c['id']} prompt lacks '{chk['text']}'", chk['text'].lower() not in pos.lower())
            elif t == 'aspect_size':
                f = job['format']; ok('cases', f"{c['id']} size {chk['width']}x{chk['height']}", f.get('aspect') == chk['aspect'] and f.get('width') == chk['width'] and f.get('height') == chk['height'])
            elif t == 'text_layer':
                ok('cases', f"{c['id']} text_layer", job['format'].get('text_layer', 'html_overlay') == chk['value'])
        if not e:
            b = build_prompt.build(job, 'flux_local')
            ok('prompt', f"{c['id']} builds (≤ 260 words, no Thai script)", b['words'] <= 260 and not re.search(r'[฀-๿]', b['prompt']), f"{b['words']} words")
    for cat in ['blueprint_completeness', 'composition_choice', 'color_palette_fit', 'lighting_fit', 'style_fit', 'emotion_translation', 'character_consistency',
                'thai_typography', 'product_fidelity', 'critique_quality', 'platform_format']:
        ok('cases', f'category {cat} ≥ 10', cats.get(cat, 0) >= 10, str(cats.get(cat, 0)))
    ok('cases', '≥ 100 cases', len(tc['cases']) >= 100, str(len(tc['cases'])))

# ---------------- examples
ex = (SKILL / 'EXAMPLES.md').read_text(encoding='utf-8') if (SKILL / 'EXAMPLES.md').exists() else ''
heads = re.findall(r'^\*\*T(\d{3})\*\* \[([^\]]+)\]', ex, re.M)
ok('examples', f'≥ 200 prompt templates ({len(heads)})', len(heads) >= 200)
used = {k: set() for k in ('styles', 'compositions', 'lightings')}
for _, h in heads:
    parts = [x.strip() for x in h.split('·')]
    if len(parts) >= 5:
        used['styles'].add(parts[2]); used['compositions'].add(parts[3]); used['lightings'].add(parts[4])
for k, minimum in (('styles', 70), ('compositions', 30), ('lightings', 40)):
    if k in S:
        badids = sorted(used[k] - S[k])
        ok('examples', f'{k} ids valid', not badids, str(badids[:6]))
        ok('examples', f'covers ≥ {minimum} {k} ({len(used[k] & S[k])})', len(used[k] & S[k]) >= minimum)
names = [b for b in BLOCK if b in ex.lower() and b != 'in the style of']
ok('ethics', 'no blocked names in EXAMPLES.md', not names, str(names))

passed = sum(r[2] for r in R)
print(f'\n{passed}/{len(R)} checks passed')
g = {}
for a, _, c in R:
    g.setdefault(a, [0, 0]); g[a][0] += c; g[a][1] += 1
print('  ' + '  '.join(f'{k} {p}/{t}' for k, (p, t) in g.items()))
if cats:
    print('  cases per category:', cats)
sys.exit(0 if passed == len(R) else 1)
