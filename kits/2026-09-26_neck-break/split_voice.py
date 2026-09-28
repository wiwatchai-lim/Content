# Split one Gemini TTS take (all lines read in one request, to save the 10-requests/day free quota)
# into audio/<lang>/gemini/NN.wav, one file per line of audio/<lang>/gemini.txt.
#   python kits/2026-09-26_neck-break/split_voice.py
# Lines are separated by pauses longer than GAP; pauses inside a line are kept as read.
import wave
from pathlib import Path
import numpy as np

KIT = Path(__file__).parent / 'audio'
GAP = {'th': 0.9, 'en': 0.6}  # Thai reads with longer pauses inside a line

for lang in ['th', 'en']:
    src = KIT / lang / 'gemini_all.wav'
    with wave.open(str(src)) as w:
        sr = w.getframerate()
        a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
    a = a[64:]  # the API returns a WAV file; skip any header bytes wrapped in on save
    hop = int(0.02 * sr)
    rms = np.array([np.sqrt(np.mean(a[i:i + hop] ** 2)) for i in range(0, len(a) - hop, hop)])
    loud = 20 * np.log10(rms / 32768 + 1e-9) > -40
    runs, start = [], None  # speech runs in frames
    for i, v in enumerate(loud):
        if v and start is None:
            start = i
        if not v and start is not None:
            runs.append([start, i]); start = None
    if start is not None:
        runs.append([start, len(loud)])
    runs = [r for r in runs if r[1] - r[0] >= 3]
    if (runs[-1][1] - runs[-1][0]) * 0.02 < 0.3:
        runs.pop()  # the take ends with a short full-scale noise burst after the last word: drop it
    lines = [[runs[0]]]
    for r in runs[1:]:
        (lines.append([r]) if (r[0] - lines[-1][-1][1]) * 0.02 > GAP[lang] else lines[-1].append(r))
    want = len((KIT / lang / 'gemini.txt').read_text(encoding='utf-8').strip().splitlines())
    print(lang, 'lines found', len(lines), 'expected', want, [(round(l[0][0] * .02, 2), round(l[-1][1] * .02, 2)) for l in lines])
    assert len(lines) == want
    out = KIT / lang / 'gemini'
    out.mkdir(exist_ok=True)
    for n, segs in enumerate(lines, 1):
        # keep the line in one piece, natural pauses included (cutting pauses out made it sound choppy)
        y = a[max(0, segs[0][0] * hop - 2 * hop): segs[-1][1] * hop + 3 * hop].copy()
        f = int(0.015 * sr)
        y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
        print(f'  {n:02d} {len(y) / sr:.2f}s')
        with wave.open(str(out / f'{n:02d}.wav'), 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
            w.writeframes(y.astype(np.int16).tobytes())
