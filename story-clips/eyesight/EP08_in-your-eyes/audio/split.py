import wave, json, numpy as np, os
# Split all.wav into 01..23.wav. This take kept ~3.5 s between lines and ~0.5 s between phrases, but also paused 1.4 s inside
# line 2 and only 0.96 s between lines 21 and 22, so phrases (pauses > 0.3 s) are grouped by PHRASES = phrases per script line
# (checked against the phrase lengths). Pauses inside a line are capped at MAXP s.
# Also writes phrases.json: start of every phrase inside its line file (s), used by timeline.py for subtitle cues.
PHRASES = [2,3,2,2,1,4,3,2,4,3,2,3,5,2,4,2,2,2,3,1,1,2,2]
D = os.path.dirname(os.path.abspath(__file__)); MAXP = 0.4
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
    (ph.append([r]) if (r[0]-ph[-1][-1][1])*.02 > 0.3 else ph[-1].append(r))
assert len(ph) == sum(PHRASES), len(ph)
groups, k = [], 0
for c in PHRASES: groups.append(ph[k:k+c]); k += c
pstarts = []
for n, g in enumerate(groups, 1):
    m = []  # merged runs, each tagged with whether it starts a phrase
    for p in g:
        for j, r in enumerate(p):
            if m and j > 0 and (r[0]-m[-1][1])*.02 < 0.25: m[-1][1] = r[1]
            else: m.append([r[0], r[1], j == 0])
    parts, t, ps = [], 0.0, []
    for i, (s0, s1, new) in enumerate(m):
        if new: ps.append(round(t, 3))
        y = a[max(0, s0*hop-2*hop): s1*hop+3*hop].copy()
        f = int(.01*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
        parts.append(y); t += len(y)/sr
        if i < len(m)-1:
            z = np.zeros(int(min((m[i+1][0]-s1)*.02, MAXP)*sr)); parts.append(z); t += len(z)/sr
    y = np.concatenate(parts); pstarts.append(ps)
    with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
    print(f'{n:02d} {len(y)/sr:.2f}', ps)
json.dump(pstarts, open(f'{D}/phrases.json', 'w'))
