import wave, numpy as np, os
# Split all.wav into 01..16.wav. Pauses > GROUP s separate takes; PHRASES = takes per script line (line 12 was read as two takes).
# Pauses inside a line are capped at MAXP s.
PHRASES = [1]*11 + [2, 1, 1, 1, 1]
D = os.path.dirname(os.path.abspath(__file__)); MAXP = 0.35; GROUP = 1.2
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
ph = [[runs[0]]]
for r in runs[1:]:
    (ph.append([r]) if (r[0]-ph[-1][-1][1])*.02 > GROUP else ph[-1].append(r))
assert len(ph) == sum(PHRASES), len(ph)
lines, k = [], 0
for c in PHRASES: lines.append(sum(ph[k:k+c], [])); k += c
for n, segs in enumerate(lines, 1):
    m = [list(segs[0])]
    for r in segs[1:]:
        (m[-1].__setitem__(1, r[1]) if (r[0]-m[-1][1])*.02 < 0.25 else m.append(list(r)))
    parts = []
    for k, (s0, s1) in enumerate(m):
        y = a[max(0, s0*hop-2*hop): s1*hop+3*hop].copy()
        f = int(.01*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
        parts.append(y)
        if k < len(m)-1: parts.append(np.zeros(int(min((m[k+1][0]-s1)*.02, MAXP)*sr)))
    y = np.concatenate(parts)
    with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
    print(f'{n:02d} {len(y)/sr:.2f}')
