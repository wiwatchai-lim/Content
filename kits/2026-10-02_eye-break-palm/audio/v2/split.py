# Split all.wav into 01..05.wav at pauses > 0.6 s.
import wave, numpy as np, os
D = os.path.dirname(os.path.abspath(__file__))
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
lines = [[runs[0]]]
for r in runs[1:]:
    (lines.append([r]) if (r[0]-lines[-1][-1][1])*.02 > .6 else lines[-1].append(r))
print(len(lines), [(round(l[0][0]*.02,2), round(l[-1][1]*.02,2)) for l in lines])
for n, seg in enumerate(lines, 1):
    y = a[max(0, seg[0][0]*hop-2*hop): seg[-1][1]*hop+3*hop].copy()
    f = int(.015*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
    with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
    print(f'{n:02d} {len(y)/sr:.2f}s')
