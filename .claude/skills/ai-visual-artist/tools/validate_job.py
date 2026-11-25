"""Validate a Visual Job (VISUAL_QUALITY_SCHEMA.json) before generating.

  python validate_job.py job.json

Checks: JSON Schema · ids exist (composition, lighting, style, emotion, palette) · palette text contrast (if colours
given) · width/height match the aspect · Thai or any text requested inside the image while text_layer is
html_overlay · living-artist / studio-brand / franchise names in prompts (blocklist, extend it) · product references
have locked details · 9:16 jobs mention safe zones. Exit 1 on errors.
"""
import json
import re
import sys
from pathlib import Path

import jsonschema

sys.path.insert(0, str(Path(__file__).resolve().parent))
import color_tools as ct  # noqa: E402

SKILL = Path(__file__).resolve().parent.parent
ASPECTS = {'1:1': 1, '4:5': .8, '9:16': 9 / 16, '16:9': 16 / 9, '3:2': 1.5, '2:3': 2 / 3, '21:9': 21 / 9}
BLOCK = ['pixar', 'disney', 'ghibli', 'miyazaki', 'dreamworks', 'marvel', 'pokemon', 'doraemon', 'studio trigger', 'makoto shinkai',
         'greg rutkowski', 'artgerm', 'wlop', 'loish', 'beeple', 'kim jung gi', 'yoshitaka amano', 'moebius-style', 'in the style of']
TEXT_ASK = re.compile(r'(?:text|caption|headline|title|words?|letters?|typography|logo)\s+(?:that\s+)?(?:says|reading|saying|with)|[฀-๿]', re.I)


def load(name, key):
    p = SKILL / name
    if not p.exists():
        return None
    return {e['id'] for e in json.loads(p.read_text(encoding='utf-8'))[key]}


def emotion_ids():
    p = SKILL / 'EMOTION_VISUAL_LIBRARY.json'
    if p.exists():
        return {e['id'] for e in json.loads(p.read_text(encoding='utf-8'))['emotions']}
    ids = set((SKILL / 'research' / '_emotion_ids.txt').read_text(encoding='utf-8').split())
    return ids | {'visual.mystery', 'visual.warmth', 'will.courage', 'visual.peaceful_solitude', 'visual.majesty', 'visual.coziness'}


def check(job):
    errors, warnings = [], []
    schema = json.loads((SKILL / 'VISUAL_QUALITY_SCHEMA.json').read_text(encoding='utf-8'))
    for e in jsonschema.Draft202012Validator(schema).iter_errors(job):
        errors.append(f"schema /{'/'.join(map(str, e.path))}: {e.message[:160]}")
    if errors:
        return errors, warnings
    comp, light, style, pal = load('COMPOSITION_LIBRARY.json', 'compositions'), load('LIGHTING_LIBRARY.json', 'lightings'), \
        load('ART_STYLE_LIBRARY.json', 'styles'), load('COLOR_PALETTE_LIBRARY.json', 'palettes')
    emo = emotion_ids()
    if comp and job['blueprint']['composition'] not in comp:
        errors.append(f"composition '{job['blueprint']['composition']}' not in COMPOSITION_LIBRARY.json")
    if light and job.get('lighting', {}).get('id') and job['lighting']['id'] not in light:
        errors.append(f"lighting '{job['lighting']['id']}' not in LIGHTING_LIBRARY.json")
    if style and job['direction']['style'] not in style:
        errors.append(f"style '{job['direction']['style']}' not in ART_STYLE_LIBRARY.json")
    if job['direction']['emotion'] not in emo:
        errors.append(f"emotion '{job['direction']['emotion']}' not in the emotion library")
    pid = job.get('palette', {}).get('id')
    if pal and pid and pid not in pal and pid not in ('brand', 'custom'):
        errors.append(f"palette '{pid}' not in COLOR_PALETTE_LIBRARY.json")
    f = job['format']
    if f.get('width') and f.get('height') and f['aspect'] in ASPECTS and abs(f['width'] / f['height'] - ASPECTS[f['aspect']]) > .01:
        errors.append(f"size {f['width']}x{f['height']} does not match aspect {f['aspect']}")
    pos = (job.get('prompt', {}).get('positive') or '')
    low = pos.lower()
    for b in BLOCK:
        if b in low:
            errors.append(f"prompt names '{b}' — describe the technique traits instead (no living artists / studio brands / franchises)")
    if f.get('text_layer', 'html_overlay') == 'html_overlay' and TEXT_ASK.search(pos):
        errors.append('prompt asks for text/Thai characters inside the image but text_layer is html_overlay — keep the image text-free, set text in HTML')
    for r in job.get('references', []):
        if r['role'] in ('product_must_match', 'person_must_match', 'logo_must_match') and not r.get('locked_details'):
            errors.append(f"reference {r['path_or_url']}: role {r['role']} needs locked_details")
        if r['role'] == 'product_must_match' and job.get('prompt', {}).get('provider') == 'flux_local' and not job['prompt'].get('init_image'):
            warnings.append('product must match but FLUX text-to-image cannot see the photo: composite the real cut-out in HTML, or use Codex with -i (ask first)')
    if f['aspect'] == '9:16' and not f.get('safe_zones'):
        warnings.append('9:16 without safe_zones — Reels/TikTok UI covers the top and bottom; see GRAPHIC_DESIGN.md')
    cols = job.get('palette', {}).get('colors', [])
    if len(cols) >= 2:
        best = max(ct.contrast(a, b) for a in cols for b in cols if a != b)
        if best < 4.5:
            warnings.append(f'no colour pair in the palette reaches 4.5:1 (best {best:.2f}) — text needs a darker/lighter colour or a backing shape')
    if len(pos.split()) > 180:
        warnings.append(f'prompt is {len(pos.split())} words — FLUX/T5 handles long prompts but later details get weaker; put the key subject first')
    return errors, warnings


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    job = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    e, w = check(job)
    for x in w:
        print('WARN ', x)
    for x in e:
        print('ERROR', x)
    print('OK' if not e else f'{len(e)} error(s)')
    sys.exit(1 if e else 0)


if __name__ == '__main__':
    main()
