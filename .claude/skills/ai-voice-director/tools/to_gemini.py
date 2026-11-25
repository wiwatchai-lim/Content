"""Gemini TTS adapter: Voice Direction JSON → Gemini requests (dry run by default; --generate spends quota).

  python to_gemini.py direction.json                         # print the requests (no API call, no quota)
  python to_gemini.py direction.json --out req.json          # save them
  python to_gemini.py direction.json --generate --outdir takes/ [--model gemini-3.1-flash-tts-preview] [--only L03,L07]

Two prompt modes (TTS_PROVIDER_ADAPTERS.md §Gemini):
  prompt  (default) — the style is written as a short natural-language preface before the text. This is the form
                      this project has used successfully with gemini-2.5-flash-preview-tts and
                      gemini-3.1-flash-tts-preview (tools/gemini_tts.py, story-clips/*/audio/tts_all.py).
  tags              — additionally inserts the documented inline vocalisation / pause tags (<sigh>, <short pause>,
                      <long pause> …) from the Gemini speech-generation docs (checked 2026-11-24). Untested in this
                      project; tags can be read aloud by some models — listen for that in QC.
Rules: one voice per character (from the doc or CHARACTER_VOICE_BIBLE.md), the same model for a whole clip, one request
per line (default) so takes can be re-rolled one by one. Always ask the user before --generate (free tier ≈ 10 TTS
requests per model per day for this account).
"""
import argparse
import base64
import json
import os
import sys
import time
import urllib.request
import wave
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate import check, load_bible, load_emotions  # noqa: E402
from thai_normalize import normalize  # noqa: E402

WORDS = {
    'pitch_baseline': {'much_lower': 'a much lower voice than usual', 'lower': 'a lower voice than usual', 'slightly_lower': 'a slightly lower voice',
                       'slightly_higher': 'a slightly higher voice', 'higher': 'a higher voice than usual', 'much_higher': 'a much higher, excited voice'},
    'pitch_range': {'very_narrow': 'almost monotone', 'narrow': 'little melody', 'wide': 'lively, expressive melody', 'very_wide': 'very animated melody'},
    'rate': {'very_slow': 'very slowly', 'slow': 'slowly', 'slightly_slow': 'a little slower than normal', 'slightly_fast': 'a little faster than normal',
             'fast': 'quickly', 'very_fast': 'very fast, rushing'},
    'rhythm': {'clipped': 'short clipped phrases', 'drawn_out': 'drawing out the vowels', 'halting': 'halting, with small hesitations',
               'rushed': 'words tumbling out', 'sing_song': 'a sing-song lilt', 'conversational': 'natural conversational rhythm'},
    'energy': {'very_low': 'very low energy', 'low': 'low energy', 'high': 'high energy', 'very_high': 'very high energy'},
    'loudness': {'whisper': 'whispering', 'soft': 'softly', 'projected': 'projecting the voice', 'shout': 'shouting'},
    'breathiness': {'high': 'breathy', 'very_high': 'very breathy, airy'},
    'resonance': {'chest': 'a warm chest voice', 'head': 'a light head voice', 'nasal': 'a slightly nasal tone', 'pharyngeal_tight': 'a tight, pinched throat'},
    'articulation': {'slurred': 'slurring a little', 'relaxed': 'relaxed articulation', 'crisp': 'crisp articulation', 'over_articulated': 'over-articulating every syllable'},
    'voice_quality': {'breathy': 'a breathy voice', 'tense': 'a tense, tight voice', 'creaky': 'a creaky, gravelly edge', 'harsh': 'a harsh, rough voice',
                      'trembling': 'a trembling voice', 'smiling': 'a smile in the voice', 'falsetto': 'falsetto'},
    'tremor': {'medium': 'a slight tremble', 'high': 'a trembling voice', 'very_high': 'voice shaking'},
    'ending': {'fall': 'finishing each sentence with a clear fall', 'soft_fall': 'letting the end fall softly', 'rise': 'a questioning lift at the end',
               'trail_off': 'trailing off at the end', 'cut_off': 'cutting off the last word', 'smile_ending': 'ending with a smile'},
}
NONVERBAL_TAG = {'breath_in': '<breath>', 'sigh': '<sigh>', 'laugh_soft': '<chuckle>', 'laugh': '<laugh>', 'sob': '<sob>', 'sniff': '<breath>',
                 'gasp': '<gasp>', 'tsk': '<tsk>', 'clear_throat': '<throat-clearing>', 'hum': '<breath>', 'swallow': '<breath>'}
NONVERBAL_WORDS = {'breath_in': 'take a breath first', 'sigh': 'sigh before speaking', 'laugh_soft': 'a soft chuckle', 'laugh': 'laughing', 'sob': 'sobbing',
                   'sniff': 'sniffling', 'gasp': 'a gasp first', 'tsk': 'a small tsk', 'clear_throat': 'clear the throat first', 'hum': 'a small hum', 'swallow': 'swallow first'}


def character_line(cid, bible_md):
    import re
    m = re.search(r'## (?:\w+ / )*' + re.escape(cid) + r'(?: / \w+)* — [^\n]*\n(.*?)(?=\n## |\n---)', bible_md, re.S)
    if not m:
        return ''
    rows = dict(re.findall(r'^\| ([^|]+?) \| (.+?) \|$', m.group(1), re.M))
    bits = [rows.get('Personality', ''), ('age ' + rows['Perceived vocal age']) if rows.get('Perceived vocal age') else '', rows.get('Signature', '')]
    return '; '.join(b for b in bits if b)[:260]


def style_text(doc, ln, emotions, bible_md):
    e = emotions.get(ln['emotion']['primary'], {})
    parts = []
    who = character_line(ln['character'], bible_md)
    if who:
        parts.append(f"Character: {who}.")
    sc = doc.get('scene', {})
    if sc.get('situation'):
        parts.append(f"Situation: {sc['situation']}.")
    if ln.get('analysis', {}).get('goal'):
        parts.append(f"Goal: {ln['analysis']['goal']}.")
    parts.append(f"Direction: {ln['direction'].rstrip('.')}.")
    if e:
        # library gemini_style phrases are often tied to one example scene ("a nervous patient…"), so the prompt
        # uses the emotion name + its generic voice fields; the character and situation come from above.
        inten = ln['emotion']['intensity']
        q = 'very subtle ' if inten < .3 else 'strong ' if inten > .75 else ''
        parts.append(f"Feeling: {q}{e['name_en'].lower()} — voice {e['voice_quality']}; energy {e['energy']}; pace {e['rate']}.")
        if ln['emotion'].get('secondary') in emotions:
            parts.append(f"Underneath: {emotions[ln['emotion']['secondary']]['name_en'].lower()}.")
        if ln['emotion'].get('transition_to') in emotions:
            at = ln['emotion'].get('transition_at')
            parts.append(f"Shift to {emotions[ln['emotion']['transition_to']]['name_en'].lower()}" + (f" at \"{at}\"." if at else ' by the end.'))
    if ln['emotion'].get('masked_by') and ln['emotion']['masked_by'] in emotions:
        parts.append(f"On the surface: {emotions[ln['emotion']['masked_by']].get('name_en', '').lower()}; the real feeling only leaks through.")
    pr = ln.get('prosody', {})
    v = [WORDS[k][pr[k]] for k in WORDS if k in pr and pr[k] in WORDS[k]]
    v += [NONVERBAL_WORDS[n] for n in ln.get('nonverbal', [])]
    if ln.get('emphasis'):
        v.append('lean on ' + ', '.join(f"\"{x['word']}\"" for x in ln['emphasis']))
    if v:
        parts.append('Voice: ' + ', '.join(v) + '.')
    if ln['language'] in ('th', 'th-en'):
        parts.append('Natural Central Thai; keep every word\'s tone; final particles light and short; unreleased final stops.')
    return ' '.join(parts)


def body_text(ln, mode):
    t = ln.get('spoken_text') or (normalize(ln['text']) if ln['language'] != 'en' else ln['text'])
    pauses = sorted(ln.get('pauses', []), key=lambda p: -len(p['after']))
    for p in pauses:
        if mode == 'tags':
            tag = '<short pause>' if p['ms'] < 600 else '<long pause>'
        else:
            tag = '…' if p['ms'] >= 300 else ','
        t = t.replace(p['after'], p['after'] + ' ' + tag + ' ', 1) if tag.startswith('<') else t.replace(p['after'], p['after'] + tag, 1)
    if mode == 'tags':
        pre = [NONVERBAL_TAG[n] for n in ln.get('nonverbal', []) if n in ('breath_in', 'sigh', 'gasp', 'clear_throat', 'tsk')]
        t = ' '.join(pre + [t])
    return ' '.join(t.split())


def build(doc, mode='prompt'):
    emotions, bible = load_emotions(), load_bible()
    bible_md = (Path(__file__).resolve().parent.parent / 'CHARACTER_VOICE_BIBLE.md').read_text(encoding='utf-8')
    voices = {c['id']: c.get('voice_by_provider', {}).get('gemini') for c in doc.get('characters', [])}
    reqs = []
    for ln in doc['lines']:
        voice = voices.get(ln['character']) or bible.get(ln['character'], {}).get('voice_by_provider', {}).get('gemini')
        if not voice:
            raise SystemExit(f"line {ln['id']}: no Gemini voice for character {ln['character']}")
        style = style_text(doc, ln, emotions, bible_md)
        text = body_text(ln, mode)
        prompt = f"{style}\nRead only the words after the colon, nothing else:\n{text}"
        reqs.append({'line': ln['id'], 'voice': voice, 'prompt': prompt, 'chars': len(prompt)})
    return reqs


def generate(req, model, outdir):
    body = json.dumps({'contents': [{'parts': [{'text': req['prompt']}]}],
                       'generationConfig': {'responseModalities': ['AUDIO'],
                                            'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': req['voice']}}}}}).encode()
    key = os.environ.get('GEMINI_API_KEY')
    if not key:
        raise SystemExit('GEMINI_API_KEY not set')
    r = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent', body,
                               {'Content-Type': 'application/json', 'x-goog-api-key': key})
    data = json.load(urllib.request.urlopen(r, timeout=600))
    cand = data['candidates'][0]
    if 'content' not in cand:
        raise SystemExit('no audio: ' + json.dumps(data, ensure_ascii=False)[:600])
    pcm = base64.b64decode(cand['content']['parts'][0]['inlineData']['data'])
    out = Path(outdir) / f"{req['line']}.wav"
    with wave.open(str(out), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
    return out, round(len(pcm) / 48000, 2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('direction')
    ap.add_argument('--mode', default='prompt', choices=['prompt', 'tags'])
    ap.add_argument('--out')
    ap.add_argument('--generate', action='store_true')
    ap.add_argument('--model', default='gemini-3.1-flash-tts-preview')
    ap.add_argument('--outdir', default='takes')
    ap.add_argument('--only', default='')
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')
    doc = json.loads(Path(a.direction).read_text(encoding='utf-8'))
    errors, warnings = check(doc)
    for w in warnings:
        print('WARN ', w, file=sys.stderr)
    if errors:
        for e in errors:
            print('ERROR', e, file=sys.stderr)
        raise SystemExit('fix the direction file first (tools/validate.py)')
    reqs = build(doc, a.mode)
    only = {x for x in a.only.split(',') if x}
    if only:
        reqs = [r for r in reqs if r['line'] in only]
    if a.out:
        Path(a.out).write_text(json.dumps({'model': a.model, 'mode': a.mode, 'requests': reqs}, ensure_ascii=False, indent=1), encoding='utf-8')
        print('wrote', a.out, len(reqs), 'requests')
    if not a.generate:
        if not a.out:
            print(json.dumps(reqs, ensure_ascii=False, indent=1))
        return
    Path(a.outdir).mkdir(parents=True, exist_ok=True)
    for r in reqs:
        try:
            p, s = generate(r, a.model, a.outdir)
            print(r['line'], 'ok', s, 's ->', p)
        except urllib.error.HTTPError as e:
            msg = e.read().decode('utf-8', 'replace')[:300]
            print(r['line'], 'HTTP', e.code, msg)
            if e.code == 429:
                print('quota hit: stop (do not loop retries on a per-day quota)'); break
        time.sleep(2)


if __name__ == '__main__':
    main()
