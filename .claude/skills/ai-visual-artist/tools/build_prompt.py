"""Visual Job → provider prompt (and, for local FLUX, the image). Dry run by default.

  python build_prompt.py job.json                       # print the prompt for job.prompt.provider (default flux_local)
  python build_prompt.py job.json --provider codex      # Codex brief (reference photos attached with -i; ask the user first: quota)
  python build_prompt.py job.json --generate out.png [--count 2] [--seed 7]   # FLUX local (free, ~1–2 min per 1024² on the RTX 3050)

Prompt order (IMAGE_PROMPT_ENGINE.md): medium/style → subject + action + emotion read → composition & camera →
setting & depth layers → light → palette → texture/finish → constraints. Natural sentences (FLUX uses a T5 encoder;
negative prompts do nothing at CFG 1, so 'avoid' is rewritten as positive constraints). Text-free unless the job says
text_layer = in_image.
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate_job import check  # noqa: E402

SKILL = Path(__file__).resolve().parent.parent
ROOT = SKILL.parent.parent.parent
SIZES = {'1:1': (1024, 1024), '4:5': (896, 1120), '9:16': (768, 1360), '16:9': (1360, 768), '3:2': (1216, 832), '2:3': (832, 1216), '21:9': (1536, 640)}
SHOT = {'extreme_wide': 'an extreme wide shot', 'wide': 'a wide shot', 'full': 'a full shot', 'medium_wide': 'a medium-wide shot', 'medium': 'a medium shot',
        'medium_close': 'a medium close-up', 'close_up': 'a close-up', 'extreme_close_up': 'an extreme close-up', 'macro': 'a macro shot', 'insert': 'an insert shot'}
ANGLE = {'eye_level': 'at eye level', 'high': 'from a high angle', 'low': 'from a low angle', 'birds_eye': "from a bird's-eye view", 'worms_eye': "from a worm's-eye view",
         'dutch': 'with a tilted dutch angle', 'over_shoulder': 'over the shoulder', 'pov': 'from a first-person point of view', 'top_down_flatlay': 'as a top-down flat lay'}


def lib(name, key):
    p = SKILL / name
    return {e['id']: e for e in json.loads(p.read_text(encoding='utf-8'))[key]} if p.exists() else {}


def first(x, default=''):
    if isinstance(x, list):
        return x[0] if x else default
    return x or default


import re
NOTEXT = re.compile(r'\s*(?:for|to hold|reserved for|kept for)\s+(?:the |a |an )?(?:headline|text|title|copy|caption|logo|price|cta)[^,.;]*', re.I)
BUDGET = 175   # words; FLUX schnell reads ≤ 256 T5 tokens (HF-DiffusersFlux) — keep the important part first


def cap(t):
    t = t.strip()
    return t[:1].upper() + t[1:] if t else t


def compose(job, styles, comps, lights, pals):
    """Sentences in priority order; lower-priority ones are dropped until the prompt fits BUDGET."""
    d, bp = job['direction'], job['blueprint']
    st = styles.get(d['style'], {}); co = comps.get(bp['composition'], {}); li = lights.get(job.get('lighting', {}).get('id', ''), {})
    cam = bp.get('camera', {}); l = job.get('lighting', {}); p = job.get('palette', {}); pl = pals.get(p.get('id', ''), {})
    S = []   # (priority, order, sentence) — priority 1 = must keep
    add = lambda pr, txt: txt and S.append((pr, len(S), txt.strip().rstrip('.') + '.'))
    add(1, f"{st.get('name', d['style'].replace('_', ' '))} illustration: {st.get('visual_characteristics', '')}".rstrip(': '))
    add(1, cap(bp['primary_focal_point']['what']) + (f", {', '.join(d.get('mood_words', []))}" if d.get('mood_words') else ''))
    photo = st.get('family') in ('photography', '3d')
    shot = ' '.join(x for x in [SHOT.get(cam.get('shot_size'), ''), ANGLE.get(cam.get('angle'), '')] if x)
    if photo:   # lens/DoF words pull illustration styles toward photo renders (real test 2026-11-24, golden_v1)
        shot += f", {int(cam['lens_mm'])}mm lens" if cam.get('lens_mm') else ''
        shot += f", {cam['depth_of_field']} depth of field" if cam.get('depth_of_field') else ''
    elif cam.get('depth_of_field') == 'shallow':
        shot += ', background painted soft and loose with less detail'
    add(1, cap(shot.strip(', ')))
    place = bp.get('subject_placement') or ('the subject ' + bp['primary_focal_point']['where'])
    add(1, cap(place) if bp.get('negative_space') else f"{cap(first(co.get('ai_prompt_phrases'), bp['composition'].replace('_', ' ')))}; {place}")
    if bp.get('negative_space'):
        add(1, cap(NOTEXT.sub('', bp['negative_space'])))   # never mention headline/text to the model: it may draw letters
    if job.get('environment'):
        add(2, f"Setting: {job['environment']}")
    light = [l.get('quality') and f"{l['quality']} light", l.get('key_direction'), l.get('color_temperature_k') and f"warm-white about {l['color_temperature_k']}K"
             if l.get('color_temperature_k', 5000) < 4000 else l.get('color_temperature_k') and f"about {l['color_temperature_k']}K", l.get('notes')]
    if not any(light[:2]) and li.get('prompt_phrases'):
        light.insert(0, li['prompt_phrases'][-1])
    add(2, 'Light: ' + ', '.join(x for x in light if x) if any(light) else '')
    dl = bp.get('depth_layers', {})
    add(3, 'Depth: ' + '; '.join(f'{k} {v}' for k, v in dl.items() if v) if dl else '')
    if p:
        names = [c.get('name') for c in pl.get('colors', []) if c.get('name')][:3]
        add(2, f"Colour mood: {pl.get('emotional_intent', 'a restrained palette')}" + (f" — {', '.join(names)}" if names else '') +
            (f"; mostly {p['temperature'].replace('_', ' ')}" if p.get('temperature') else ''))
    add(3, f"Values: {bp['value_plan']}" if bp.get('value_plan') else '')
    if bp.get('secondary_focal_point'):
        add(2, f"Also {bp['secondary_focal_point']['what']}, {bp['secondary_focal_point']['where']}")   # was 4: got dropped (real test golden_v4)
    add(4, f"Texture: {st['texture_characteristics']}" if st.get('texture_characteristics') and photo else '')
    add(5, f"The picture quietly suggests {job['intent']['subtext']}" if job['intent'].get('subtext') else '')
    if job['format'].get('text_layer', 'html_overlay') != 'in_image':
        add(1, 'No text, letters, logos or watermark anywhere')
    add(1, cap(job.get('prompt', {}).get('avoid', '')))
    if not photo and st.get('texture_characteristics'):
        add(1, f"Everything is painted by hand as a {st.get('name', '').lower()}, not a photograph or 3D render: {st['texture_characteristics']}")
    keep = sorted(S, key=lambda x: x[1])
    for pr in (5, 4, 3, 2):
        if sum(len(t.split()) for _, _, t in keep) <= BUDGET:
            break
        keep = [x for x in keep if x[0] != pr or (pr == 2 and (x[2].startswith('Light') or x[2].startswith('Also')))]
    return ' '.join(t for _, _, t in keep)


def build(job, provider=None):
    styles, comps, lights = lib('ART_STYLE_LIBRARY.json', 'styles'), lib('COMPOSITION_LIBRARY.json', 'compositions'), lib('LIGHTING_LIBRARY.json', 'lightings')
    pals = lib('COLOR_PALETTE_LIBRARY.json', 'palettes')
    provider = provider or job.get('prompt', {}).get('provider', 'flux_local')
    if job.get('prompt', {}).get('positive') and provider == job.get('prompt', {}).get('provider'):
        body = job['prompt']['positive']                       # a hand-written prompt wins
    else:
        body = compose(job, styles, comps, lights, pals)
    w, h = SIZES.get(job['format']['aspect'], (1024, 1024))
    out = {'provider': provider, 'width': job['format'].get('width') or w, 'height': job['format'].get('height') or h, 'prompt': body, 'words': len(body.split())}
    if provider == 'codex':
        refs = [r for r in job.get('references', [])]
        lock = [f"- {r['path_or_url']}: {r['role']} — keep exactly: {', '.join(r.get('locked_details', []))}" for r in refs if r['role'].endswith('must_match')]
        out['codex_brief'] = ('Create one image.\n' + body + (('\nReference images attached with -i:\n' + '\n'.join(lock)) if lock else '') +
                              f"\nOutput {out['width']}x{out['height']} (or the nearest supported size), no text.")
        out['attach'] = [r['path_or_url'] for r in refs]
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('job'); ap.add_argument('--provider', choices=['flux_local', 'codex'])
    ap.add_argument('--generate'); ap.add_argument('--count', type=int, default=1); ap.add_argument('--seed', type=int)
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')
    job = json.loads(Path(a.job).read_text(encoding='utf-8'))
    e, w = check(job)
    for x in w:
        print('WARN ', x, file=sys.stderr)
    if e:
        for x in e:
            print('ERROR', x, file=sys.stderr)
        raise SystemExit('fix the job first (validate_job.py)')
    r = build(job, a.provider)
    print(json.dumps(r, ensure_ascii=False, indent=1))
    if a.generate:
        if r['provider'] != 'flux_local':
            raise SystemExit('only flux_local can be generated from here (Codex costs quota — run it by hand after asking the user)')
        pj = job.get('prompt', {})
        cmd = [sys.executable, str(ROOT / 'tools' / 'flux.py'), r['prompt'], a.generate, '--size', f"{r['width']}x{r['height']}",
               '--count', str(a.count), '--steps', str(pj.get('steps', 4))]
        seed = a.seed if a.seed is not None else pj.get('seed')
        if seed is not None:
            cmd += ['--seed', str(seed)]
        if pj.get('init_image'):
            cmd += ['--init', pj['init_image'], '--denoise', str(pj.get('denoise', .6))]
        subprocess.run(cmd, check=True)


if __name__ == '__main__':
    main()
