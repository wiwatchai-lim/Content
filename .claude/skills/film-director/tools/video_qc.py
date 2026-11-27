#!/usr/bin/env python3
"""Technical QC for a finished video: ffprobe + one ffmpeg analysis pass -> JSON report.

    python .claude/skills/film-director/tools/video_qc.py <video.mp4> [--preset reels_9x16|youtube_16x9]
        [--no-audio-ok] [--allow-freeze] [--freeze-max 3] [--black-max 0.5] [--out report.json]

Checks: container/codec/pix_fmt, resolution + aspect, fps (constant?), duration, audio presence/codec/sample rate,
integrated loudness + true peak + LRA (EBU R128 scanner, ITU-R BS.1770 algorithm), black intervals (blackdetect),
frozen intervals (freezedetect), long silences (silencedetect).
Severity follows .claude/skills/film-director/libraries/VIDEO_QUALITY_CHECKLIST.md: critical / major / minor.
Uses only ffmpeg/ffprobe on PATH (or FFMPEG / FFPROBE env vars) and the Python standard library.
Exit code: 0 pass, 1 revise (major), 2 fail (critical), 3 tool error.
"""
import argparse, json, os, re, shutil, subprocess, sys
from fractions import Fraction

PRESETS = {
    # House rules + platform docs. Sources: libraries/VIDEO_QUALITY_CHECKLIST.md (keys in sources/ai-quality.json).
    'reels_9x16': {
        'label': 'Instagram/Facebook Reels, TikTok, Shorts (vertical)',
        'width': 1080, 'height': 1920, 'min_short_edge': 720,          # IG help: 720 px minimum (search_summary)
        'aspect': (9, 16), 'fps_ok': [24, 25, 30, 50, 60], 'fps_min_platform': 30,  # IG help: 30 fps minimum (search_summary)
        'duration_s': (3, 90),                                         # house default for Reels; platform limits differ
        'loudness_target': -14.0, 'loudness_tol': 2.0, 'true_peak_max': -1.0,  # FX.md loudnorm -14 / TP -1.5
        'audio_rate': 48000, 'video_codec': 'h264', 'pix_fmt': 'yuv420p', 'audio_codecs': ['aac'],
    },
    'youtube_16x9': {
        'label': 'YouTube horizontal 1080p (recommended upload settings)',
        'width': 1920, 'height': 1080, 'min_short_edge': 720,
        'aspect': (16, 9), 'fps_ok': [24, 25, 30, 48, 50, 60], 'fps_min_platform': None,
        'duration_s': (1, 3600),
        'loudness_target': -14.0, 'loudness_tol': 2.0, 'true_peak_max': -1.0,
        'audio_rate': 48000, 'video_codec': 'h264', 'pix_fmt': 'yuv420p', 'audio_codecs': ['aac', 'opus'],
    },
}


def tool(name):
    p = os.environ.get(name.upper()) or shutil.which(name)
    if not p:
        sys.exit(json.dumps({'error': f'{name} not found on PATH (install FFmpeg, CLAUDE.md step 7)'}))
    return p


def probe(path):
    out = subprocess.run([tool('ffprobe'), '-v', 'error', '-show_streams', '-show_format', '-of', 'json', path],
                         capture_output=True, text=True, encoding='utf-8', errors='replace')
    if out.returncode:
        raise RuntimeError(out.stderr.strip() or 'ffprobe failed')
    return json.loads(out.stdout)


def analyse(path, has_audio, black_d, freeze_d, freeze_n):
    vf = f'blackdetect=d={black_d}:pix_th=0.10,freezedetect=n={freeze_n}:d={freeze_d}'
    cmd = [tool('ffmpeg'), '-hide_banner', '-nostats', '-i', path, '-map', '0:v:0', '-vf', vf]
    if has_audio:
        cmd += ['-map', '0:a:0', '-af', 'ebur128=peak=true:framelog=quiet,silencedetect=n=-50dB:d=2']
    cmd += ['-f', 'null', '-']
    log = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace').stderr
    res = {'black': [], 'freeze': [], 'silence': [], 'loudness': {}}
    for m in re.finditer(r'black_start:([\d.]+) black_end:([\d.]+) black_duration:([\d.]+)', log):
        res['black'].append({'start': float(m[1]), 'end': float(m[2]), 'dur': float(m[3])})
    starts = [float(x) for x in re.findall(r'freeze_start: ([\d.]+)', log)]
    ends = [float(x) for x in re.findall(r'freeze_end: ([\d.]+)', log)]
    for i, s in enumerate(starts):
        e = ends[i] if i < len(ends) else None          # a freeze running to the end of file has no freeze_end
        res['freeze'].append({'start': s, 'end': e, 'dur': round(e - s, 3) if e is not None else None})
    sil_s = [float(x) for x in re.findall(r'silence_start: (-?[\d.]+)', log)]
    sil_e = re.findall(r'silence_end: ([\d.]+) \| silence_duration: ([\d.]+)', log)
    for i, s in enumerate(sil_s):
        res['silence'].append({'start': s, 'end': float(sil_e[i][0]) if i < len(sil_e) else None,
                               'dur': float(sil_e[i][1]) if i < len(sil_e) else None})
    summ = log.split('Summary:')[-1] if 'Summary:' in log else ''
    for key, rx in (('integrated_lufs', r'I:\s+(-?[\d.]+|-inf) LUFS'), ('lra_lu', r'LRA:\s+(-?[\d.]+) LU'),
                    ('true_peak_dbtp', r'Peak:\s+(-?[\d.]+|-inf) dBFS')):
        m = re.search(rx, summ)
        if m:
            res['loudness'][key] = None if m[1] == '-inf' else float(m[1])  # -inf = digital silence
    return res


def fps_of(s):
    try:
        f = Fraction(s)
        return float(f) if f else None
    except (ValueError, ZeroDivisionError):
        return None


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument('video')
    ap.add_argument('--preset', default='reels_9x16', choices=sorted(PRESETS))
    ap.add_argument('--no-audio-ok', action='store_true', help='silent master is expected (music added later by the user)')
    ap.add_argument('--allow-freeze', action='store_true', help='held stills are intended (slideshow, 2.5D pauses)')
    ap.add_argument('--freeze-max', type=float, default=3.0, help='longest acceptable frozen interval, s')
    ap.add_argument('--freeze-noise', type=float, default=0.001, help='freezedetect noise tolerance (ffmpeg default 0.001)')
    ap.add_argument('--black-max', type=float, default=0.5, help='longest acceptable black interval inside the clip, s')
    ap.add_argument('--out', help='also write the JSON report here')
    a = ap.parse_args()
    P = PRESETS[a.preset]
    checks = []

    def add(cid, severity, ok, measured, expected, how, note=''):
        checks.append({'id': cid, 'severity': severity, 'status': 'pass' if ok else 'fail',
                       'measured': measured, 'expected': expected, 'how': how, **({'note': note} if note else {})})

    try:
        info = probe(a.video)
    except Exception as e:  # noqa: BLE001
        print(json.dumps({'file': a.video, 'verdict': 'fail', 'error': str(e)}, indent=1)); sys.exit(3)
    v = next((s for s in info['streams'] if s.get('codec_type') == 'video'), None)
    au = next((s for s in info['streams'] if s.get('codec_type') == 'audio'), None)
    dur = float(info.get('format', {}).get('duration') or 0)
    if v is None:
        add('video_stream', 'critical', False, None, 'one video stream', 'ffprobe -show_streams')
        report = {'file': a.video, 'preset': a.preset, 'checks': checks, 'verdict': 'fail'}
        print(json.dumps(report, indent=1)); sys.exit(2)

    w, h = int(v.get('width', 0)), int(v.get('height', 0))
    rot = 0
    for sd in v.get('side_data_list', []) or []:
        if 'rotation' in sd:
            rot = abs(int(sd['rotation']))
    if rot in (90, 270):
        w, h = h, w
    PROBE = 'ffprobe -v error -show_streams -show_format -of json <file>'
    exp_ratio = P['aspect'][0] / P['aspect'][1]
    add('aspect_ratio', 'critical', h > 0 and abs(w / h - exp_ratio) < 0.01, f'{w}x{h}',
        f"{P['aspect'][0]}:{P['aspect'][1]}", PROBE)
    add('resolution', 'major', (w, h) == (P['width'], P['height']), f'{w}x{h}', f"{P['width']}x{P['height']}", PROBE,
        'below min_short_edge is critical' if min(w, h) < P['min_short_edge'] else '')
    if min(w, h) < P['min_short_edge']:
        add('resolution_minimum', 'critical', False, min(w, h), f">= {P['min_short_edge']} px short edge", PROBE)
    rf, af = fps_of(v.get('r_frame_rate', '0/0')), fps_of(v.get('avg_frame_rate', '0/0'))
    fps = af or rf
    add('fps_standard', 'major', fps is not None and any(abs(fps - x) < 0.02 for x in P['fps_ok']),
        round(fps, 3) if fps else None, P['fps_ok'], PROBE)
    add('fps_constant', 'minor', rf is not None and af is not None and abs(rf - af) < 0.02,
        {'r_frame_rate': v.get('r_frame_rate'), 'avg_frame_rate': v.get('avg_frame_rate')}, 'equal (CFR)', PROBE,
        'VFR can drift audio sync after platform re-encode; re-export with -r <fps> -fps_mode cfr')
    if P['fps_min_platform'] and fps:
        add('fps_platform_minimum', 'minor', fps >= P['fps_min_platform'] - 0.02, round(fps, 3),
            f">= {P['fps_min_platform']}", PROBE, 'Instagram help states 30 fps minimum for Reels (search snippet, '
            'unverified full text); 24 fps uploads have worked for this studio — confirm on the platform')
    lo, hi = P['duration_s']
    add('duration', 'major', lo <= dur <= hi, round(dur, 3), f'{lo}-{hi} s', PROBE)
    add('video_codec', 'major', v.get('codec_name') == P['video_codec'], v.get('codec_name'), P['video_codec'], PROBE)
    add('pix_fmt', 'major', v.get('pix_fmt') == P['pix_fmt'], v.get('pix_fmt'), P['pix_fmt'], PROBE,
        'yuv444p/yuv422p or 10-bit may play black or be re-encoded badly on phones')

    if au is None:
        add('audio_present', 'minor' if a.no_audio_ok else 'critical', a.no_audio_ok, 'no audio stream',
            'audio stream' if not a.no_audio_ok else 'none (allowed by --no-audio-ok)', PROBE)
    else:
        add('audio_present', 'critical', True, au.get('codec_name'), 'audio stream', PROBE)
        add('audio_codec', 'major', au.get('codec_name') in P['audio_codecs'], au.get('codec_name'), P['audio_codecs'], PROBE)
        add('audio_sample_rate', 'minor', int(au.get('sample_rate', 0)) == P['audio_rate'], au.get('sample_rate'),
            P['audio_rate'], PROBE)

    an = analyse(a.video, au is not None, black_d=min(a.black_max, 0.1) if a.black_max > 0 else 0.1,
                 freeze_d=a.freeze_max, freeze_n=a.freeze_noise)
    BLACK = 'ffmpeg -i <file> -vf blackdetect=d=0.1:pix_th=0.10 -an -f null -'
    head_tail = [b for b in an['black'] if b['start'] < 0.05 or b['end'] > dur - 0.05]
    inner = [b for b in an['black'] if b not in head_tail]
    add('black_inside', 'major', all(b['dur'] <= a.black_max for b in inner), inner, f'none longer than {a.black_max} s',
        BLACK, 'a deliberate fade/dip to black is fine: confirm against the edit plan')
    add('black_head_tail', 'minor', all(b['dur'] <= 0.5 for b in head_tail), head_tail, '<= 0.5 s at start/end', BLACK,
        'a black first frame becomes the Reels cover/thumbnail and wastes the hook')
    FREEZE = f'ffmpeg -i <file> -vf freezedetect=n={a.freeze_noise}:d={a.freeze_max} -an -f null -'
    add('freeze', 'minor' if a.allow_freeze else 'major', a.allow_freeze or not an['freeze'], an['freeze'],
        f'no frozen interval >= {a.freeze_max} s' + (' (allowed by --allow-freeze)' if a.allow_freeze else ''), FREEZE,
        'stills/2.5D holds trigger this on purpose; a freeze at an unplanned spot = render/encode fault')
    if au is not None:
        L = an['loudness']
        EBU = 'ffmpeg -i <file> -af ebur128=peak=true:framelog=quiet -vn -f null -'
        i_l, tp = L.get('integrated_lufs'), L.get('true_peak_dbtp')
        add('loudness_integrated', 'major', i_l is not None and abs(i_l - P['loudness_target']) <= P['loudness_tol'],
            i_l, f"{P['loudness_target']} +/- {P['loudness_tol']} LUFS", EBU,
            'house target from story-clips/_craft/FX.md (loudnorm I=-14); social platforms publish no binding figure')
        add('true_peak', 'major', tp is not None and tp <= P['true_peak_max'], tp, f"<= {P['true_peak_max']} dBTP", EBU,
            'over 0 dBTP clips after AAC re-encode; fix with loudnorm=I=-14:TP=-1.5:LRA=11')
        add('loudness_range', 'minor', L.get('lra_lu') is None or L['lra_lu'] <= 15, L.get('lra_lu'), '<= 15 LU', EBU,
            'very wide LRA = whispers lost on phone speakers (craft threshold)')
        sil = [s for s in an['silence'] if (s['dur'] or 0) >= 2 and s['start'] > 0.5 and (s['end'] or dur) < dur - 0.5]
        add('silence_inside', 'minor', not sil, sil, 'no silence >= 2 s inside the clip (-50 dB)',
            'ffmpeg -i <file> -af silencedetect=n=-50dB:d=2 -vn -f null -', 'intended pauses are fine')

    sev = {c['severity'] for c in checks if c['status'] == 'fail'}
    verdict = 'fail' if 'critical' in sev else 'revise' if 'major' in sev else 'pass'
    report = {'file': a.video, 'preset': a.preset, 'preset_label': P['label'],
              'probe': {'width': w, 'height': h, 'fps': round(fps, 3) if fps else None, 'duration_s': round(dur, 3),
                        'video_codec': v.get('codec_name'), 'profile': v.get('profile'), 'pix_fmt': v.get('pix_fmt'),
                        'bit_rate': info.get('format', {}).get('bit_rate'),
                        'audio': {k: au.get(k) for k in ('codec_name', 'sample_rate', 'channels')} if au else None},
              'measurements': an, 'checks': checks,
              'failed': [c['id'] for c in checks if c['status'] == 'fail'], 'verdict': verdict,
              'note': 'Technical layer (T) only. Visual artefacts (identity drift, hands, warped product, AI text) need '
                      'frame sampling + human/critic review: see VIDEO_QUALITY_CHECKLIST.md.'}
    text = json.dumps(report, indent=1, ensure_ascii=False, default=str)
    if a.out:
        with open(a.out, 'w', encoding='utf-8') as fh:
            fh.write(text)
    print(text)
    sys.exit({'pass': 0, 'revise': 1, 'fail': 2}[verdict])


if __name__ == '__main__':
    main()
