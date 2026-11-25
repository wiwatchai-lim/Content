"""Validate a Voice Direction document before any audio is generated.

  python validate.py direction.json            # one document
  python validate.py --library                 # check EMOTION_LIBRARY.json itself

Checks: JSON Schema (VOICE_DIRECTION_SCHEMA.json) · every emotion id exists in EMOTION_LIBRARY.json · every character
exists in CHARACTER_VOICE_BIBLE.md (or is declared in the document) · one voice per character per provider · pause
'after' text and emphasis words really occur in the line · Thai lines have no raw digits left in spoken_text (run
thai_normalize.py) · direction is an action/intent note, not just an emotion name. Exit code 1 on any error.
"""
import json
import re
import sys
from pathlib import Path

import jsonschema

SKILL = Path(__file__).resolve().parent.parent


def load_schema():
    return json.loads((SKILL / 'VOICE_DIRECTION_SCHEMA.json').read_text(encoding='utf-8'))


def load_emotions():
    p = SKILL / 'EMOTION_LIBRARY.json'
    if not p.exists():
        return {}
    return {e['id']: e for e in json.loads(p.read_text(encoding='utf-8'))['emotions']}


def load_bible():
    """Characters from the ```json block marked <!-- characters:json --> in CHARACTER_VOICE_BIBLE.md."""
    p = SKILL / 'CHARACTER_VOICE_BIBLE.md'
    if not p.exists():
        return {}
    m = re.search(r'<!-- characters:json -->\s*```json\s*(.*?)```', p.read_text(encoding='utf-8'), re.S)
    return {c['id']: c for c in json.loads(m.group(1))['characters']} if m else {}


def check(doc, emotions=None, bible=None):
    emotions = load_emotions() if emotions is None else emotions
    bible = load_bible() if bible is None else bible
    errors, warnings = [], []
    v = jsonschema.Draft202012Validator(load_schema())
    for e in sorted(v.iter_errors(doc), key=lambda e: list(e.path)):
        errors.append(f"schema: /{'/'.join(map(str, e.path))}: {e.message[:200]}")
    if errors:
        return errors, warnings
    declared = {c['id']: c for c in doc.get('characters', [])}
    for c in declared.values():
        b = bible.get(c['id'])
        if b and c.get('voice_by_provider'):
            for prov, voice in c['voice_by_provider'].items():
                bv = b.get('voice_by_provider', {}).get(prov)
                if bv and bv != voice:
                    errors.append(f"character {c['id']}: {prov} voice '{voice}' differs from the bible ('{bv}')")
    ids = set()
    for ln in doc['lines']:
        lid = ln['id']
        if lid in ids:
            errors.append(f'line {lid}: duplicate id')
        ids.add(lid)
        ch = ln['character']
        if ch not in declared and ch not in bible:
            errors.append(f"line {lid}: character '{ch}' is not in CHARACTER_VOICE_BIBLE.md or doc.characters")
        for key in ('primary', 'secondary', 'masked_by', 'transition_to'):
            eid = ln['emotion'].get(key)
            if eid and emotions and eid not in emotions:
                errors.append(f"line {lid}: emotion.{key} '{eid}' not in EMOTION_LIBRARY.json")
        text = ln.get('spoken_text') or ln['text']
        for p in ln.get('pauses', []):
            if p['after'] not in ln['text'] and p['after'] not in text:
                errors.append(f"line {lid}: pause after '{p['after']}' — text not found in the line")
        for e in ln.get('emphasis', []):
            if e['word'] not in ln['text'] and e['word'] not in text:
                errors.append(f"line {lid}: emphasis word '{e['word']}' not found in the line")
        if ln['language'] in ('th', 'th-en') and re.search(r'\d', text) and not re.search(r'[A-Za-z]\d|\d[A-Za-z]', text):
            warnings.append(f"line {lid}: digits left in Thai text — run tools/thai_normalize.py and put the result in spoken_text")
        d = ln['direction'].strip().lower()
        if emotions and (d in emotions or len(d.split()) < 4 and not re.search(r'[ก-๛]{12,}', d)):
            warnings.append(f"line {lid}: direction looks like a label; describe the action and intent (SCRIPT_ANALYSIS.md)")
        if ln['emotion'].get('intensity', 0) > .85 and ln.get('prosody', {}).get('loudness') == 'shout' and ch in bible \
                and bible[ch].get('max_loudness') and bible[ch]['max_loudness'] != 'shout':
            warnings.append(f"line {lid}: {ch} never shouts in the bible (max {bible[ch]['max_loudness']})")
    return errors, warnings


def source_keys():
    p = SKILL / 'RESEARCH_SOURCES.md'
    if not p.exists():
        return set()
    return set(re.findall(r'^\| ([A-Za-z][\w.\-]*)(?: \(= [^)]*\))? \|', p.read_text(encoding='utf-8'), re.M)) - {'key'}


def check_library():
    p = SKILL / 'EMOTION_LIBRARY.json'
    lib = json.loads(p.read_text(encoding='utf-8'))
    req = ['id', 'name_en', 'name_th', 'type', 'family', 'vad', 'meaning', 'speaker_intent', 'pitch_level', 'pitch_range', 'rate',
           'energy', 'pauses', 'voice_quality', 'breath', 'emphasis', 'thai_note', 'examples_th', 'examples_en', 'variants',
           'ai_mistakes', 'gemini_style', 'refs', 'confidence', 'evidence_note']
    errs, seen = [], set()
    keys = source_keys()
    for e in lib['emotions']:
        for k in req:
            if k not in e or e[k] in ('', [], None):
                errs.append(f"{e.get('id')}: missing {k}")
        if e['id'] in seen:
            errs.append(f"{e['id']}: duplicate")
        seen.add(e['id'])
        if len(e.get('variants', [])) < 2:
            errs.append(f"{e['id']}: needs ≥2 variants (no single 'correct' performance)")
        for r in e.get('refs', []):
            if keys and r != 'Artistic' and r not in keys:
                errs.append(f"{e['id']}: ref '{r}' not in RESEARCH_SOURCES.md")
        v = e.get('vad', {})
        if not (-1 <= v.get('valence', 9) <= 1 and 0 <= v.get('arousal', 9) <= 1 and 0 <= v.get('dominance', 9) <= 1):
            errs.append(f"{e['id']}: vad out of range")
    return errs, len(lib['emotions'])


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    if '--library' in sys.argv:
        errs, n = check_library()
        print(f'{n} emotions, {len(errs)} errors'); [print(' ', e) for e in errs[:60]]
        sys.exit(1 if errs else 0)
    doc = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    errors, warnings = check(doc)
    for w in warnings:
        print('WARN ', w)
    for e in errors:
        print('ERROR', e)
    print('OK' if not errors else f'{len(errors)} error(s)')
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
