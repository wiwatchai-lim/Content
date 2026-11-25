"""Acoustic analysis of generated (or recorded) speech for QC — Praat via Parselmouth + NumPy.

  python analyze_audio.py take.wav                      # JSON report for one file
  python analyze_audio.py dir/*.wav --csv out.csv       # many files
  python analyze_audio.py take.wav --baseline base.wav  # + relative labels vs. the character's neutral take
  python analyze_audio.py take.wav --direction dir.json --line L03 --baseline base.wav   # does the take follow the direction?

Measures (AUDIO_ANALYSIS.md explains each and its limits): F0 mean/median (Hz and semitones re 100 Hz), F0 range
p5–p95 (st), F0 SD (st), final F0 movement (last voiced 300 ms, st) · intensity mean/SD (dB) · pauses ≥ 150 ms · speech
rate and articulation rate from syllable nuclei (intensity peaks in voiced frames, after de Jong & Wempe 2009) · HNR ·
jitter (local) · shimmer (local) · F1/F2 means · alpha ratio and Hammarberg index (spectral balance) · peak dBFS,
clipping, noise floor. Numbers describe the SOUND, not the speaker's real feelings.
"""
import argparse
import csv
import json
import math
import sys
from pathlib import Path

import numpy as np
import parselmouth
from parselmouth.praat import call

ST = lambda hz: 12 * math.log2(hz / 100.0)


def analyze(path, f0min=None, f0max=None):
    snd = parselmouth.Sound(str(path))
    if snd.n_channels > 1:
        snd = snd.convert_to_mono()
    x = snd.values[0]
    sr = snd.sampling_frequency
    dur = snd.duration
    out = {'file': str(path), 'duration_s': round(dur, 3), 'sample_rate': int(sr)}
    peak = float(np.max(np.abs(x))) if x.size else 0.0
    out['peak_dbfs'] = round(20 * math.log10(peak + 1e-12), 2)
    out['clipping_pct'] = round(100 * float(np.mean(np.abs(x) >= 0.999)), 4)

    # pitch: a first pass decides the range (two-pass method, as in Hirst's prosody tools)
    p0 = snd.to_pitch_ac(time_step=0.01, pitch_floor=60, pitch_ceiling=700)
    f = p0.selected_array['frequency']; f = f[f > 0]
    if f0min is None and f.size:
        q1, q3 = np.percentile(f, [25, 75]); f0min, f0max = max(50, .75 * q1), min(800, 1.5 * q3 + 50)
    f0min, f0max = f0min or 75, f0max or 500
    pitch = snd.to_pitch_ac(time_step=0.01, pitch_floor=f0min, pitch_ceiling=f0max)
    fr = pitch.selected_array['frequency']; times = pitch.xs()
    voiced = fr > 0
    out['f0_floor_ceiling'] = [round(f0min), round(f0max)]
    out['voiced_fraction'] = round(float(voiced.mean()), 3) if fr.size else 0
    if voiced.sum() > 5:
        v = fr[voiced]; st = 12 * np.log2(v / 100.0)
        out.update({'f0_mean_hz': round(float(v.mean()), 1), 'f0_median_hz': round(float(np.median(v)), 1),
                    'f0_mean_st': round(float(st.mean()), 2), 'f0_sd_st': round(float(st.std()), 2),
                    'f0_range_st_p5_p95': round(float(np.percentile(st, 95) - np.percentile(st, 5)), 2)})
        tv = times[voiced]; last = tv[-1]
        tail = st[tv >= last - 0.30]; head = st[tv <= tv[0] + 0.30]
        out['final_movement_st'] = round(float(tail[-3:].mean() - tail[:3].mean()), 2) if tail.size >= 6 else None
        out['initial_vs_final_st'] = round(float(tail.mean() - head.mean()), 2) if tail.size and head.size else None

    inten = snd.to_intensity(minimum_pitch=max(60, f0min), time_step=0.01)
    iv = inten.values[0]; it = inten.xs()
    iv = np.maximum(iv, 0.0)   # digital silence comes out as -300 dB; clamp so means/SDs stay meaningful
    out['intensity_mean_db'] = round(float(iv.mean()), 2); out['intensity_sd_db'] = round(float(iv.std()), 2)
    floor = float(np.percentile(iv, 5)); out['noise_floor_db'] = round(floor, 1)

    # pauses: frames 25 dB under the 95th percentile, runs ≥ 150 ms, inside the speech (not the edges)
    thr = float(np.percentile(iv, 95)) - 25
    sil = iv < thr
    runs, start = [], None
    for i, s in enumerate(sil):
        if s and start is None:
            start = i
        if (not s or i == len(sil) - 1) and start is not None:
            end = i if not s else i + 1
            runs.append((it[start], it[end - 1])); start = None
    sp = np.where(~sil)[0]
    first, lastt = (it[sp[0]], it[sp[-1]]) if sp.size else (0, dur)
    pauses = [(a, b) for a, b in runs if b - a >= 0.15 and a > first and b < lastt]
    out['pauses'] = [[round(a, 2), round(b - a, 2)] for a, b in pauses]
    out['pause_count'] = len(pauses); out['pause_total_s'] = round(sum(b - a for a, b in pauses), 2)
    speech_time = max(1e-6, (lastt - first)); phonation = max(1e-6, speech_time - out['pause_total_s'])
    out['speech_span_s'] = round(speech_time, 2)

    # syllable nuclei: intensity peaks ≥ 2 dB above the surrounding dips, above the median, in voiced frames
    med = float(np.median(iv)); peaks = []
    for i in range(1, len(iv) - 1):
        if iv[i] > iv[i - 1] and iv[i] >= iv[i + 1] and iv[i] > med:
            l = iv[max(0, i - 12):i].min(); r = iv[i + 1:i + 13].min() if i + 1 < len(iv) else iv[i]
            if iv[i] - max(l, r) >= 2:
                f0 = pitch.get_value_at_time(it[i])
                if f0 == f0 and f0 > 0:
                    peaks.append(it[i])
    out['syllable_nuclei'] = len(peaks)
    out['speech_rate_syl_s'] = round(len(peaks) / speech_time, 2)
    out['articulation_rate_syl_s'] = round(len(peaks) / phonation, 2)

    harm = snd.to_harmonicity_cc(time_step=0.01, minimum_pitch=max(60, f0min))
    hv = harm.values[0]; hv = hv[hv > -200]
    out['hnr_db'] = round(float(hv.mean()), 2) if hv.size else None
    try:
        pp = call(snd, 'To PointProcess (periodic, cc)', f0min, f0max)
        out['jitter_local_pct'] = round(100 * call(pp, 'Get jitter (local)', 0, 0, 0.0001, 0.02, 1.3), 3)
        out['shimmer_local_pct'] = round(100 * call([snd, pp], 'Get shimmer (local)', 0, 0, 0.0001, 0.02, 1.3, 1.6), 3)
    except Exception:
        out['jitter_local_pct'] = out['shimmer_local_pct'] = None
    try:
        fm = snd.to_formant_burg(time_step=0.01, max_number_of_formants=5, maximum_formant=5000 if (out.get('f0_median_hz') or 120) < 165 else 5500)
        f1, f2 = [], []
        for t in times[voiced]:
            a, b = fm.get_value_at_time(1, t), fm.get_value_at_time(2, t)
            if a == a and b == b:
                f1.append(a); f2.append(b)
        out['f1_mean_hz'] = round(float(np.mean(f1))) if f1 else None
        out['f2_mean_hz'] = round(float(np.mean(f2))) if f2 else None
    except Exception:
        pass

    # spectral balance over voiced frames (eGeMAPS-style definitions)
    hop = int(0.01 * sr); win = int(0.04 * sr); ar, hb = [], []
    w = np.hanning(win); freqs = np.fft.rfftfreq(win, 1 / sr)
    lo, hi = (freqs >= 50) & (freqs < 1000), (freqs >= 1000) & (freqs < 5000)
    h0, h1 = (freqs < 2000), (freqs >= 2000) & (freqs < 5000)
    for t in times[voiced][::2]:
        c = int(t * sr); seg = x[max(0, c - win // 2): c + win // 2]
        if seg.size < win:
            continue
        P = np.abs(np.fft.rfft(seg * w)) ** 2 + 1e-12
        ar.append(10 * np.log10(P[lo].sum() / P[hi].sum()))
        hb.append(10 * np.log10(P[h0].max() / P[h1].max()))
    out['alpha_ratio_db'] = round(float(np.mean(ar)), 2) if ar else None     # higher = more low-frequency energy (softer/breathier); lower = tenser/louder
    out['hammarberg_db'] = round(float(np.mean(hb)), 2) if hb else None
    return out


# ---------- relative labels vs a baseline take (same character, neutral) ----------
def rel_pitch(d):
    for lim, lab in [(-4, 'much_lower'), (-2, 'lower'), (-.75, 'slightly_lower'), (.75, 'baseline'), (2, 'slightly_higher'), (4, 'higher')]:
        if d < lim:
            return lab
    return 'much_higher'


def rel_rate(r):
    for lim, lab in [(.72, 'very_slow'), (.85, 'slow'), (.95, 'slightly_slow'), (1.05, 'baseline'), (1.15, 'slightly_fast'), (1.3, 'fast')]:
        if r < lim:
            return lab
    return 'very_fast'


def rel_range(r):
    for lim, lab in [(.55, 'very_narrow'), (.8, 'narrow'), (1.25, 'baseline'), (1.6, 'wide')]:
        if r < lim:
            return lab
    return 'very_wide'


def compare(a, base):
    c = {}
    if a.get('f0_mean_st') is not None and base.get('f0_mean_st') is not None:
        d = a['f0_mean_st'] - base['f0_mean_st']; c['pitch_baseline'] = rel_pitch(d); c['pitch_diff_st'] = round(d, 2)
    if a.get('f0_range_st_p5_p95') and base.get('f0_range_st_p5_p95'):
        r = a['f0_range_st_p5_p95'] / base['f0_range_st_p5_p95']; c['pitch_range'] = rel_range(r); c['range_ratio'] = round(r, 2)
    if a.get('articulation_rate_syl_s') and base.get('articulation_rate_syl_s'):
        r = a['articulation_rate_syl_s'] / base['articulation_rate_syl_s']; c['rate'] = rel_rate(r); c['rate_ratio'] = round(r, 2)
    c['intensity_diff_db'] = round(a['intensity_mean_db'] - base['intensity_mean_db'], 2)
    fm = a.get('final_movement_st')
    if fm is not None:
        c['ending'] = 'rise' if fm > 1.5 else 'fall' if fm < -1.5 else 'level'
    return c


ORDER = {
    'pitch_baseline': ['much_lower', 'lower', 'slightly_lower', 'baseline', 'slightly_higher', 'higher', 'much_higher'],
    'rate': ['very_slow', 'slow', 'slightly_slow', 'baseline', 'slightly_fast', 'fast', 'very_fast'],
    'pitch_range': ['very_narrow', 'narrow', 'baseline', 'wide', 'very_wide'],
}


def follows(direction_prosody, measured):
    """Per field: steps between the directed and measured label (0 = exact, 1 = neighbour = acceptable)."""
    res = {}
    for k, order in ORDER.items():
        want, got = direction_prosody.get(k), measured.get(k)
        if want and got:
            res[k] = {'want': want, 'got': got, 'steps': abs(order.index(want) - order.index(got))}
    want_end = direction_prosody.get('ending')
    if want_end and measured.get('ending'):
        group = {'fall': 'fall', 'soft_fall': 'fall', 'trail_off': 'fall', 'cut_off': 'level', 'level': 'level', 'rise': 'rise', 'smile_ending': 'level'}
        res['ending'] = {'want': want_end, 'got': measured['ending'], 'steps': 0 if group.get(want_end) == measured['ending'] else 1}
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('files', nargs='+')
    ap.add_argument('--baseline')
    ap.add_argument('--direction'); ap.add_argument('--line')
    ap.add_argument('--csv')
    ap.add_argument('--f0min', type=float); ap.add_argument('--f0max', type=float)
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')
    base = analyze(a.baseline, a.f0min, a.f0max) if a.baseline else None
    rows = []
    for f in a.files:
        r = analyze(f, a.f0min, a.f0max)
        if base:
            r['vs_baseline'] = compare(r, base)
            if a.direction and a.line:
                doc = json.loads(Path(a.direction).read_text(encoding='utf-8'))
                ln = next(l for l in doc['lines'] if l['id'] == a.line)
                r['follows_direction'] = follows(ln.get('prosody', {}), r['vs_baseline'])
        rows.append(r)
    if a.csv:
        keys = [k for k in rows[0] if not isinstance(rows[0][k], (list, dict))]
        with open(a.csv, 'w', newline='', encoding='utf-8') as fh:
            w = csv.DictWriter(fh, keys, extrasaction='ignore'); w.writeheader(); w.writerows(rows)
        print('wrote', a.csv, len(rows), 'rows')
    else:
        print(json.dumps(rows if len(rows) > 1 else rows[0], ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
