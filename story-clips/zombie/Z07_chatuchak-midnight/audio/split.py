import wave, numpy as np, os, sys
# Split all.wav into 01..22.wav: the 21 longest pauses are the line breaks (the take may read every pause alike,
# so check the printed lengths against the lines). Pauses inside a line are capped at MAXP s.
N = 22; D = os.path.dirname(os.path.abspath(__file__)); MAXP = 0.35
with wave.open(f'{D}/all.wav') as w:
    sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
hop = int(.02 * sr)
rms = np.array([np.sqrt(np.mean(a[i:i+hop]**2)) for i in range(0, len(a)-hop, hop)])
loud = 20*np.log10(rms/32768+1e-9) > -40
runs, s = [], None
for i, v in enumerate(loud):
    if v and s is None: s = i
    if not v and s is not None: runs.append([s, i]); s = None
if s is not None: runs.append([s, len(loud)])
runs = [r for r in runs if r[1]-r[0] >= 3]
gaps = [runs[i+1][0]-runs[i][1] for i in range(len(runs)-1)]
cut = sorted(sorted(range(len(gaps)), key=lambda i: -gaps[i])[:N-1])
print('breaks (s):', [round(gaps[i]*.02, 2) for i in cut], 'next largest:', round(sorted(gaps)[-N]*.02, 2))
lines, k = [], 0
for c in cut + [len(runs)-1]: lines.append(runs[k:c+1]); k = c+1
for n, segs in enumerate(lines, 1):
    parts = []
    for j, (s0, s1) in enumerate(segs):
        y = a[max(0, s0*hop-2*hop): s1*hop+3*hop].copy()
        f = int(.01*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
        parts.append(y)
        if j < len(segs)-1: parts.append(np.zeros(int(min((segs[j+1][0]-s1)*.02, MAXP)*sr)))
    y = np.concatenate(parts)
    with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
    print(f'{n:02d} {len(y)/sr:.2f}')
