"""Build RESEARCH_SOURCES.md (index) from research/R1..R4 (### Key blocks) + REFERENCE_DATABASE.json terms pages.
Run: python research/merge_sources.py  (from the skill folder or anywhere)."""
import json
import re
from pathlib import Path

R = Path(__file__).resolve().parent
SKILL = R.parent
FILES = [('R1_fundamentals_perception.md', 'fundamentals / perception'), ('R2_color_light.md', 'colour / light / materials'),
         ('R3_design_type_story.md', 'design / Thai type / story / character'), ('R4_ai_eval_styles.md', 'AI generation / evaluation / styles / rights')]


def clean(s, n):
    s = re.sub(r'\*\*|\*|`', '', re.sub(r'\s+', ' ', s)).replace('|', '/').strip(' -')
    return s if len(s) <= n else s[:n - 1] + '…'


def level(acc):
    a = acc.lower()
    if 'full' in a and 'not' not in a.split('full')[0][-6:]:
        return 'full text'
    if 'abstract' in a:
        return 'abstract'
    if any(k in a for k in ['museum', 'glossary', 'docs', 'page opened', 'web page', 'readme', 'course page', 'model card', 'repo', 'guide', 'help page', 'spec']):
        return 'docs / museum / web page'
    if any(k in a for k in ['bibliograph', 'catalogue', 'record', 'listing', 'metadata', 'secondary', 'publisher']):
        return 'bibliographic / secondary'
    return 'web page (access level in file)'


rows, unver, seen = [], [], set()
for fn, area in FILES:
    s = (R / fn).read_text(encoding='utf-8')
    cut = re.search(r'^## .*Unverified', s, re.M | re.I)
    main = s[:cut.start()] if cut else s
    if cut:
        rest = s[cut.start():]
        nxt = re.search(r'^## (?!.*Unverified)', rest[3:], re.M)
        unver.append((fn, rest[:nxt.start() + 3] if nxt else rest))
    for blk in re.split(r'^### ', main, flags=re.M)[1:]:
        head, _, body = blk.partition('\n')
        key = head.strip().split()[0]
        if key.startswith('Unverified') or key in seen:
            continue
        seen.add(key)
        lines = [l.strip('- ').strip() for l in body.splitlines() if l.strip()]
        ref = ' '.join(lines[:3])
        acc = next((l for l in lines if re.match(r'\**Access', l)), '') or next((l for l in lines if 'Accessed' in l), '') or next((l for l in lines if re.match(r'\**Evidence', l)), '')
        rows.append((key, clean(ref, 230), level(acc), area, fn))

db = json.loads((SKILL / 'REFERENCE_DATABASE.json').read_text(encoding='utf-8')) if (SKILL / 'REFERENCE_DATABASE.json').exists() else {}
for t in db.get('terms_pages', []):
    key = 'Terms-' + re.sub(r'[^A-Za-z0-9]+', '', t['source'])[:30]
    if key not in seen:
        seen.add(key); rows.append((key, clean(f"{t['source']} — open-access / licence terms page. {t['url']}", 230), 'docs / museum / web page', 'reference licences', 'REFERENCE_DATABASE.json'))

counts = {}
for r in rows:
    counts[r[2]] = counts.get(r[2], 0) + 1
by_area = {}
for r in rows:
    by_area[r[3]] = by_area.get(r[3], 0) + 1
out = [f"""# Research Sources

Checked 2026-11-24 by web search / fetch (four research passes + the licence pages of the reference database).
**{len(rows)} verified source keys.** By area: {', '.join(f'{k} {v}' for k, v in by_area.items())}.
What was actually read: {', '.join(f'{k} {v}' for k, v in sorted(counts.items(), key=lambda x: -x[1]))}.

**Honesty notes.** "abstract" = only the abstract/summary was read; "bibliographic / secondary" = the work's existence
and details were confirmed (catalogue, publisher, library record) and any content cited comes from a named secondary
source — the book itself was not read; "docs / museum / web page" = the page was opened. No reference was invented.
Items that could not be confirmed are listed at the bottom and are not cited. Full records (authors, venue, DOI/URL,
findings, limitations): `research/R1_fundamentals_perception.md`, `R2_color_light.md`, `R3_design_type_story.md`,
`R4_ai_eval_styles.md`; licensed artworks: REFERENCE_DATABASE.json. `Artistic` = craft advice, not a source.
Regenerate this file with `python research/merge_sources.py`.

| key | reference (short) | accessed | area | file |
|---|---|---|---|---|"""]
out += [f'| {k} | {ref} | {acc} | {area} | research/{fn}' + ' |' if fn.endswith('.md') else f'| {k} | {ref} | {acc} | {area} | {fn} |' for k, ref, acc, area, fn in rows]
out.append('\n---\n\n# Unverified (do not cite)\n')
for fn, txt in unver:
    out.append(f'### From {fn}\n' + re.sub(r'^## [^\n]*\n', '', txt).strip() + '\n')
(SKILL / 'RESEARCH_SOURCES.md').write_text('\n'.join(out), encoding='utf-8')
print(len(rows), counts, by_area)
