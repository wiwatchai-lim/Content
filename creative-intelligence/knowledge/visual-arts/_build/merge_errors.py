"""Generate VISUAL_ERROR_LIBRARY.json from the per-area error files (the per-area files stay the source of truth).
Run from creative-intelligence/knowledge/visual-arts/:  python _build/merge_errors.py"""
import json

SRC = [('form_errors.json', 'errors', 'value/edge/shape'), ('PERSPECTIVE_ERROR_LIBRARY.json', None, 'perspective')]
out, seen = [], set()
for f, key, area in SRC:
    d = json.load(open(f, encoding='utf-8'))
    for e in (d[key] if key else d):
        if e['id'] in seen:
            raise SystemExit(f'duplicate id {e["id"]}')
        seen.add(e['id'])
        out.append({'id': e['id'], 'area': area, 'name': e['name'], 'symptom': e.get('symptom', ''),
                    'detect': e.get('detection_method') or e.get('detect') or e.get('how_to_detect', ''),
                    'fix': e.get('fix', ''), 'source_file': f})
json.dump({'generated_by': '_build/merge_errors.py', 'note': 'Generated index - edit the source files, then re-run.',
           'count': len(out), 'errors': out}, open('VISUAL_ERROR_LIBRARY.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(out), 'errors')
