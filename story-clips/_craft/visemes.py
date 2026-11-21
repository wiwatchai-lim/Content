# Per-line loudness envelopes for lip-sync (rig.js talk()). Reads <audio>/fast/NN.wav (the tempo-adjusted lines that
# timeline.py placed in voice.wav) and writes <audio>/env.json = {"N": [0..1 per 1/24 s], ...}.
# Usage: python story-clips/_craft/visemes.py <episode>/audio
import json, os, sys, wave
import numpy as np
D = sys.argv[1]; FPS = 24; out = {}
src = os.path.join(D, 'fast') if os.path.isdir(os.path.join(D, 'fast')) else D
for f in sorted(os.listdir(src)):
    if not (f[:2].isdigit() and f.endswith('.wav')): continue
    with wave.open(os.path.join(src, f)) as w:
        sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
        if w.getnchannels() == 2: a = a[::2]
    hop = sr // FPS; n = len(a) // hop
    rms = np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2)) for i in range(n)])
    db = 20 * np.log10(rms / 32768 + 1e-9)
    ref = np.percentile(db[db > -45], 90) if (db > -45).any() else -20
    v = np.clip((db + 45) / (ref + 45), 0, 1)                 # -45 dB = closed, the line's loud 10% = fully open
    v = np.convolve(v, [.25, .5, .25], 'same')                 # 3-frame smoothing so the jaw doesn't jitter
    out[str(int(f[:2]))] = [round(x, 2) for x in v]
json.dump(out, open(os.path.join(D, 'env.json'), 'w'))
print(len(out), 'lines ->', os.path.join(D, 'env.json'))
