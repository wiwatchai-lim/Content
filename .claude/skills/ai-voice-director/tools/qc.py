"""Automatic part of the 100-point QC (QUALITY_CONTROL.md). Human scores are kept SEPARATE and never invented here.

  python qc.py --direction dir.json --audio-dir takes/ [--baseline neutral.wav] [--asr small] [--human ratings.csv] [--out report.json]

takes/<line id>.wav must exist for each line. What is measured automatically:
  - technical (5): peak ≤ -1 dBFS, no clipping, leading/trailing silence < 0.6 s, sample rate ≥ 22.05 kHz
  - timing (part of 10): duration vs target_duration_s, number of internal pauses vs directed pauses
  - prosody-follows-direction (indicator for emotional/contextual criteria, not a score): label steps vs baseline
  - intelligibility (indicator for pronunciation): character error rate of an ASR transcript vs spoken_text
    (faster-whisper; Thai CER ignores spaces/punctuation). ASR errors ≠ mispronunciation — always confirm by ear.
Human ratings CSV: rater,line,criterion,score (criteria: pronunciation 0-20, naturalness 0-20, emotion 0-20,
context 0-15, timing 0-10, character 0-10, technical 0-5). Report = auto block + human block + combined total where
human scores exist (auto technical replaces nothing: if a human technical score exists both are shown).
"""
import argparse
import csv
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from analyze_audio import analyze, compare, follows  # noqa: E402
from thai_normalize import normalize  # noqa: E402

MAX = {'pronunciation': 20, 'naturalness': 20, 'emotion': 20, 'context': 15, 'timing': 10, 'character': 10, 'technical': 5}


def technical(a):
    pts, notes = 5.0, []
    if a['peak_dbfs'] > -1:
        pts -= 2; notes.append(f"peak {a['peak_dbfs']} dBFS > -1")
    if a['clipping_pct'] > 0:
        pts -= 2; notes.append(f"clipping {a['clipping_pct']}%")
    lead = a['duration_s'] - a['speech_span_s']
    if lead > 1.2:
        pts -= 1; notes.append(f'{lead:.2f} s of silence at the edges')
    if a['sample_rate'] < 22050:
        pts -= 1; notes.append('sample rate < 22.05 kHz')
    return max(0, pts), notes


def timing(a, line):
    pts, notes = 5.0, []       # automatic half of the 10 timing points; the other half is human (rhythm feel)
    tgt = line.get('target_duration_s')
    if tgt:
        err = abs(a['speech_span_s'] - tgt) / tgt
        if err > .25:
            pts -= 3; notes.append(f"length {a['speech_span_s']} s vs target {tgt} s")
        elif err > .12:
            pts -= 1.5; notes.append(f"length {a['speech_span_s']} s vs target {tgt} s")
    want = len([p for p in line.get('pauses', []) if p['ms'] >= 150])
    if want and a['pause_count'] < want:
        pts -= 1; notes.append(f"{a['pause_count']} pauses heard, {want} directed")
    if not want and a['pause_count'] > max(2, len(line['text']) // 25):
        pts -= 1; notes.append(f"{a['pause_count']} pauses — choppy?")
    return max(0, pts), notes


def cer(ref, hyp):
    clean = lambda s: re.sub(r'[\s\.,!?…“”"\'\-–—()ๆฯ]', '', s.lower())
    r, h = clean(ref), clean(hyp)
    if not r:
        return None
    d = list(range(len(h) + 1))
    for i, rc in enumerate(r, 1):
        prev, d[0] = d[0], i
        for j, hc in enumerate(h, 1):
            cur = min(d[j] + 1, d[j - 1] + 1, prev + (rc != hc))
            prev, d[j] = d[j], cur
    return round(d[len(h)] / len(r), 3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--direction', required=True)
    ap.add_argument('--audio-dir', required=True)
    ap.add_argument('--baseline')
    ap.add_argument('--asr', help='faster-whisper model size (tiny/base/small/medium); downloads on first use')
    ap.add_argument('--human')
    ap.add_argument('--out')
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')
    doc = json.loads(Path(a.direction).read_text(encoding='utf-8'))
    base = analyze(a.baseline) if a.baseline else None
    asr = None
    if a.asr:
        from faster_whisper import WhisperModel
        asr = WhisperModel(a.asr, device='cpu', compute_type='int8')
    human = defaultdict(lambda: defaultdict(list))
    if a.human:
        for r in csv.DictReader(open(a.human, encoding='utf-8')):
            human[r['line']][r['criterion']].append(float(r['score']))
    report = []
    for ln in doc['lines']:
        wav = Path(a.audio_dir) / f"{ln['id']}.wav"
        if not wav.exists():
            report.append({'line': ln['id'], 'error': f'missing {wav}'}); continue
        m = analyze(wav)
        t_pts, t_notes = technical(m)
        tm_pts, tm_notes = timing(m, ln)
        item = {'line': ln['id'], 'auto': {'technical_5': t_pts, 'timing_auto_5': tm_pts, 'notes': t_notes + tm_notes}}
        if base:
            rel = compare(m, base); item['auto']['vs_baseline'] = rel
            item['auto']['follows_direction'] = follows(ln.get('prosody', {}), rel)
        if asr:
            lang = 'th' if ln['language'].startswith('th') else 'en'
            segs, _ = asr.transcribe(str(wav), language=lang, beam_size=5)
            hyp = ''.join(s.text for s in segs).strip()
            item['auto']['asr_text'] = hyp
            ref = normalize(ln.get('spoken_text') or ln['text'], dictionary=[])
            item['auto']['cer'] = cer(ref, normalize(hyp, dictionary=[]))   # both sides normalised: ASR writes '10 ปี', the script 'สิบปี'
        if ln['id'] in human:
            h = {k: round(sum(v) / len(v), 2) for k, v in human[ln['id']].items()}
            item['human'] = h; item['human_raters'] = max(len(v) for v in human[ln['id']].values())
            if all(k in h for k in MAX):
                item['total_100'] = round(sum(min(MAX[k], h[k]) for k in MAX), 1)
                item['pass_90'] = item['total_100'] >= 90
        report.append(item)
    out = json.dumps({'direction': a.direction, 'lines': report}, ensure_ascii=False, indent=1)
    if a.out:
        Path(a.out).write_text(out, encoding='utf-8'); print('wrote', a.out)
    else:
        print(out)


if __name__ == '__main__':
    main()
