"""Coverage audit: for every directive term, how often existing knowledge files mention it (case-insensitive).
A mention is not depth: grade is a proxy (0 hits = missing, 1-3 = thin, 4+ = covered). Run from this folder."""
import re, json, glob
from topics import T

ROOT = '../../../../'
files = sorted(glob.glob(ROOT + '.claude/skills/ai-visual-artist/*.md') + glob.glob(ROOT + '.claude/skills/ai-visual-artist/research/R*.md')
               + glob.glob(ROOT + 'story-clips/_craft/curriculum/[01]*.md') + glob.glob(ROOT + 'creative-intelligence/knowledge/*/README.md'))
text = {f.replace(ROOT, ''): open(f, encoding='utf-8').read().lower() for f in files}
out = {}
for mod, terms in T.items():
    rows = []
    for t in terms.split('|'):
        pat = re.compile(re.escape(t.lower()))
        hits = {f: n for f, n in ((f, len(pat.findall(s))) for f, s in text.items()) if n}
        tot = sum(hits.values())
        rows.append({'term': t, 'hits': tot, 'grade': 'missing' if tot == 0 else 'thin' if tot < 4 else 'covered',
                     'top_files': sorted(hits, key=hits.get, reverse=True)[:3]})
    out[mod] = {'terms': len(rows), 'covered': sum(r['grade'] == 'covered' for r in rows),
                'thin': [r['term'] for r in rows if r['grade'] == 'thin'],
                'missing': [r['term'] for r in rows if r['grade'] == 'missing'], 'rows': rows}
json.dump({'corpus_files': sorted(text), 'modules': out}, open('../_audit.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for m, v in out.items():
    print(f"{m}: {v['covered']}/{v['terms']} covered | thin: {', '.join(v['thin'])} | MISSING: {', '.join(v['missing'])}")
