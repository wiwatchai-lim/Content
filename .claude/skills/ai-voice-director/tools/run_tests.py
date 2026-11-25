"""Run every offline test of the skill (no API calls, no quota).

  python run_tests.py            # summary
  python run_tests.py -v         # list every check

1. Thai normaliser unit tests (numbers, prices, dates, times, phones, dictionary guards).
2. EMOTION_LIBRARY.json integrity (fields, ≥2 variants, refs exist in RESEARCH_SOURCES.md, VAD ranges).
3. PRONUNCIATION_DICTIONARY.json integrity.
4. TEST_CASES.json: every input validates (schema, emotion ids, characters, voices) + its auto_checks.
5. Gemini adapter dry run on every test input (prompt built, one fixed voice per character, no digits left in Thai).
6. EXAMPLES.md counts (≥ 200 examples, ≥ 120 Thai) and that every emotion id used exists.
Behavioural expectations in TEST_CASES ("must"/"must_not") need audio + a listener — they are listed, not auto-passed.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from thai_normalize import normalize, num_to_thai, casual_time  # noqa: E402
from validate import check, check_library, load_bible, load_emotions  # noqa: E402
import to_gemini  # noqa: E402

SKILL = Path(__file__).resolve().parent.parent
V = '-v' in sys.argv
results = []


def ok(group, name, cond, info=''):
    results.append((group, name, bool(cond), info))
    if V or not cond:
        print(('PASS ' if cond else 'FAIL ') + f'[{group}] {name}' + (f' — {info}' if info and not cond else ''))


# 1 ---------------------------------------------------------------- normaliser
N = [
    (num_to_thai(0), 'ศูนย์'), (num_to_thai(11), 'สิบเอ็ด'), (num_to_thai(21), 'ยี่สิบเอ็ด'), (num_to_thai(101), 'หนึ่งร้อยเอ็ด'),
    (num_to_thai(20), 'ยี่สิบ'), (num_to_thai(1290), 'หนึ่งพันสองร้อยเก้าสิบ'), (num_to_thai(2569), 'สองพันห้าร้อยหกสิบเก้า'),
    (num_to_thai(1_000_000), 'หนึ่งล้าน'), (num_to_thai(12_500_000), 'สิบสองล้านห้าแสน'),
    (normalize('ราคา 1,290 บาท', dictionary=[]), 'ราคา หนึ่งพันสองร้อยเก้าสิบ บาท'),
    (normalize('2.50 บาท', dictionary=[]), 'สอง บาท ห้าสิบ สตางค์'),
    (normalize('เลนส์ 1.67', dictionary=[]), 'เลนส์ หนึ่งจุดหกเจ็ด'),
    (normalize('ลด 20%', dictionary=[]), 'ลด ยี่สิบเปอร์เซ็นต์'),
    (normalize('ราคา 990.-', dictionary=[]), 'ราคา เก้าร้อยเก้าสิบ บาท'),
    (normalize('ค่าสายตา -1.00', dictionary=[]), 'ค่าสายตา ลบ หนึ่งจุดศูนย์ศูนย์'),
    (normalize('ADD +2.25', dictionary=[]), 'แอด บวก สองจุดสองห้า'),
    (normalize('ช่วง 10-20 นาที', dictionary=[]), 'ช่วง สิบ ถึง ยี่สิบ นาที'),
    (normalize('สายตา 6/6', dictionary=[]), 'สายตา หก ส่วน หก'),
    (normalize('ADD-ON', dictionary=[]), 'ADD-ON'),
    (normalize('วันที่ 25/12/2569', dictionary=[]), normalize('วันที่ 25/12/2569', dictionary=[])),
    (normalize('ร้อน 35°C', dictionary=[]), 'ร้อน สามสิบห้า องศาเซลเซียส'),
    (normalize('SPH -2.25 CYL -0.75 AXIS 180', dictionary=[]), 'สเฟียร์ ลบ สองจุดสองห้า ซิลินเดอร์ ลบ ศูนย์จุดเจ็ดห้า แอกซิส หนึ่งร้อยแปดสิบ'),
    (normalize('1,290.- บาท', dictionary=[]), 'หนึ่งพันสองร้อยเก้าสิบ บาท'),
    (normalize('14:30 น.', dictionary=[]), 'สิบสี่นาฬิกาสามสิบนาที'),
    (normalize('09.30 น.', dictionary=[]), 'เก้านาฬิกาสามสิบนาที'),
    (normalize('14:30', 'casual', dictionary=[]), 'บ่ายสองโมงครึ่ง'),
    (casual_time(2, 0), 'ตีสอง'), (casual_time(19, 0), 'หนึ่งทุ่ม'), (casual_time(12, 0), 'เที่ยง'), (casual_time(0, 0), 'เที่ยงคืน'),
    (normalize('30/11/2569', dictionary=[]), 'วันที่ สามสิบ พฤศจิกายน พุทธศักราช สองพันห้าร้อยหกสิบเก้า'),
    (normalize('วันที่ 5 ธ.ค. 2569', dictionary=[]), 'วันที่ ห้า ธันวาคม พุทธศักราช สองพันห้าร้อยหกสิบเก้า'),
    (normalize('โทร 081-234-5678', dictionary=[]), 'โทร ศูนย์ แปด หนึ่ง  สอง สาม สี่  ห้า หก เจ็ด แปด'),
    (normalize('รุ่น RB3025', dictionary=[]), 'รุ่น RB3025'),
    (normalize('ฯลฯ', dictionary=[]), 'และอื่นๆ'),
    (normalize('ไปกรุงเทพฯ', dictionary=[]), 'ไปกรุงเทพ'),
]
for got, want in N:
    ok('normalise', want, got == want, f'got {got!r}')
D = None
ok('dictionary', 'Time Optic → ไทม์ ออปติก', normalize('ร้าน Time Optic') == 'ร้าน ไทม์ ออปติก', normalize('ร้าน Time Optic'))
ok('dictionary', 'casual ไหม → มั้ย', normalize('ว่างไหม', 'casual') == 'ว่างมั้ย', normalize('ว่างไหม', 'casual'))
ok('dictionary', 'ผ้าไหม protected', normalize('ซื้อผ้าไหมไหม', 'casual') == 'ซื้อผ้าไหมมั้ย', normalize('ซื้อผ้าไหมไหม', 'casual'))
ok('dictionary', 'ภูเขา protected', normalize('เขาไปภูเขา', 'casual') == 'เค้าไปภูเขา', normalize('เขาไปภูเขา', 'casual'))
ok('dictionary', 'formal keeps ไหม', normalize('ว่างไหม') == 'ว่างไหม', normalize('ว่างไหม'))

# 2 ---------------------------------------------------------------- emotion library
errs, n = check_library()
ok('library', f'{n} emotions, 0 integrity errors', not errs, '; '.join(errs[:5]))
ok('library', '≥ 100 emotions', n >= 100, str(n))
emotions = load_emotions()
types = {e['type'] for e in emotions.values()}
for t in ['primary', 'secondary', 'mixed', 'suppressed', 'hidden', 'conflict', 'transition', 'social', 'stance']:
    ok('library', f'has type {t}', t in types)

# 3 ---------------------------------------------------------------- pronunciation dictionary
pd = json.loads((SKILL / 'PRONUNCIATION_DICTIONARY.json').read_text(encoding='utf-8'))
w = [e['written'] for e in pd['entries']]
ok('dictionary', 'no duplicate written forms', len(w) == len(set(w)), str([x for x in w if w.count(x) > 1]))
ok('dictionary', 'every entry has spoken + category', all(e.get('spoken') and e.get('category') for e in pd['entries']))

# 4 + 5 ---------------------------------------------------------------- test cases
tc_path = SKILL / 'TEST_CASES.json'
bible = load_bible()
ORD = {'rate': ['very_slow', 'slow', 'slightly_slow', 'baseline', 'slightly_fast', 'fast', 'very_fast'],
       'pitch_baseline': ['much_lower', 'lower', 'slightly_lower', 'baseline', 'slightly_higher', 'higher', 'much_higher'],
       'energy': ['very_low', 'low', 'medium', 'high', 'very_high'],
       'loudness': ['whisper', 'soft', 'conversational', 'projected', 'shout']}
cats = {}
if tc_path.exists():
    tc = json.loads(tc_path.read_text(encoding='utf-8'))
    for case in tc['cases']:
        cats[case['category']] = cats.get(case['category'], 0) + 1
        doc = case['input']
        e, wn = check(doc, emotions, bible)
        ok('cases', f"{case['id']} validates", not e, '; '.join(e[:3]))
        lines = {l['id']: l for l in doc.get('lines', [])}
        for ac in case.get('auto_checks', []):
            t = ac['type']
            if t == 'schema_valid' or t == 'emotion_ids_exist':
                ok('cases', f"{case['id']} {t}", not e)
            elif t == 'same_character_same_voice':
                vs = {}
                for c in doc.get('characters', []):
                    for prov, v in c.get('voice_by_provider', {}).items():
                        vs.setdefault((c['id'], prov), set()).add(v)
                ok('cases', f"{case['id']} one voice per character", all(len(s) == 1 for s in vs.values()))
            elif t in ('spoken_text_contains', 'spoken_text_not_contains'):
                ln = lines.get(ac['line'], {})
                st = ln.get('spoken_text') or normalize(ln.get('text', ''))
                has = ac['text'] in st
                ok('cases', f"{case['id']} {t} '{ac['text']}'", has if t.endswith('contains') and 'not' not in t else not has, st)
            elif t == 'prosody_order':
                a, b = lines.get(ac['line_a'], {}), lines.get(ac['line_b'], {})
                f = ac['field']; va, vb = a.get('prosody', {}).get(f), b.get('prosody', {}).get(f)
                if va is None or vb is None:
                    ok('cases', f"{case['id']} prosody_order {f}", False, 'field missing'); continue
                ia, ib = ORD[f].index(va), ORD[f].index(vb)
                ok('cases', f"{case['id']} prosody_order {f} {ac['relation']}", {'lt': ia < ib, 'gt': ia > ib, 'eq': ia == ib}[ac['relation']], f'{va} vs {vb}')
        if not e:
            try:
                reqs = to_gemini.build(doc)
                okv = True
                per_char = {}
                for r, ln in zip(reqs, doc['lines']):
                    per_char.setdefault(ln['character'], set()).add(r['voice'])
                    body = r['prompt'].split('nothing else:\n', 1)[1]
                    if ln['language'] != 'en' and re.search(r'(?<![A-Za-z])\d', body):
                        okv = False
                ok('adapter', f"{case['id']} gemini dry run", okv and all(len(v) == 1 for v in per_char.values()))
            except SystemExit as x:
                ok('adapter', f"{case['id']} gemini dry run", False, str(x))
    need = ['same_text_diff_emotion', 'emotion_contradicts_words', 'sarcasm', 'transition_between_sentences', 'character_consistency',
            'thai_pronunciation', 'multi_character_dialogue', 'narrative_continuity']
    for c in need:
        ok('cases', f'category {c} ≥ 6', cats.get(c, 0) >= 6, str(cats.get(c, 0)))
else:
    ok('cases', 'TEST_CASES.json exists', False)

# 6 ---------------------------------------------------------------- examples
ex = (SKILL / 'EXAMPLES.md').read_text(encoding='utf-8') if (SKILL / 'EXAMPLES.md').exists() else ''
heads = re.findall(r'^\*\*E(\d{3})\*\* \[([^\]]+)\]', ex, re.M)
th = [h for h in heads if re.search(r'·\s*th(-en)?\s*·', h[1])]
ok('examples', f'≥ 200 examples ({len(heads)})', len(heads) >= 200)
ok('examples', f'≥ 120 Thai ({len(th)})', len(th) >= 120)
used = set(re.findall(r'·\s*([a-z]+\.[a-z_]+)', ex))
bad = sorted(u for u in used if u not in emotions)
ok('examples', 'every emotion id exists', not bad, str(bad[:10]))

passed = sum(1 for r in results if r[2])
print(f'\n{passed}/{len(results)} checks passed')
groups = {}
for g, _, c, _ in results:
    groups.setdefault(g, [0, 0]); groups[g][0] += c; groups[g][1] += 1
print('  ' + '  '.join(f'{g} {p}/{t}' for g, (p, t) in groups.items()))
if cats:
    print('  cases per category:', cats)
sys.exit(0 if passed == len(results) else 1)
