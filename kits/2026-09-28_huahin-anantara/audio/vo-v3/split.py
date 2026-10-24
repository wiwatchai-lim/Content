# Split all.wav into 01..05.wav by STARTS; pauses inside a line are capped at MAXP s.
import wave, numpy as np, os
D = os.path.dirname(os.path.abspath(__file__)); MAXP = {1: 0.25, 2: 0.35, 4: 0.25, 5: 0.45}
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
# this take has short gaps between some lines: group by the line start times read off the take (s)
STARTS = [0, 5.0, 9.5, 12.8, 15.8]
lines = [[r for r in runs if STARTS[k] <= r[0]*.02 < (STARTS[k+1] if k+1 < len(STARTS) else 1e9)] for k in range(len(STARTS))]
print(len(lines))
for n, segs in enumerate(lines, 1):
    # merge runs separated by short gaps (< 0.25 s) so only real pauses get capped
    m = [list(segs[0])]
    for r in segs[1:]:
        (m[-1].__setitem__(1, r[1]) if (r[0]-m[-1][1])*.02 < 0.25 else m.append(list(r)))
    parts = []
    for k, (s0, s1) in enumerate(m):
        y = a[max(0, s0*hop-2*hop): s1*hop+2*hop].copy()
        f = int(.01*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
        parts.append(y)
        if k < len(m)-1:
            gap = min((m[k+1][0]-s1)*.02, MAXP.get(n, 9))
            parts.append(np.zeros(int(gap*sr)))
    y = np.concatenate(parts)
    with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
    print(f'{n:02d} {len(y)/sr:.2f}s parts {len(m)}')
