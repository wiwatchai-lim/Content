import wave, numpy as np, os, re
# Split all.wav into 01..NN.wav. This take paused about as long inside lines (at "…") as between them, so the longest-pause
# rule fails. Instead: cut into phrases (pauses > 0.3 s), then a DP groups consecutive phrases into the script lines so each
# group's length matches its line's character count (rate fitted to the take), with a small bonus for cutting at long pauses.
D = os.path.dirname(os.path.abspath(__file__)); MAXP = 0.35
LINES = re.findall(r"^    '(.*)',$", open(f'{D}/tts_all.py', encoding='utf-8').read(), re.M); N = len(LINES)
CH = np.array([len(re.sub(r'[\s…!,.?]', '', l)) for l in LINES], float)
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
P = len(ph); st = np.array([p[0][0] for p in ph])*.02; en = np.array([p[-1][1] for p in ph])*.02
gap_after = np.append(st[1:]-en[:-1], 9)
rate = (en-st).sum()/CH.sum()   # speech seconds per character (pauses inside a group are small)
INF = 1e18; C = np.full((N+1, P+1), INF); B = np.zeros((N+1, P+1), int); C[0, 0] = 0
for n in range(1, N+1):
    for j in range(n, P+1):
        for i in range(n-1, j):
            if C[n-1, i] >= INF: continue
            dur = en[j-1]-st[i] - sum(min(gap_after[k], 1.5) for k in range(i, j-1))*.5
            c = C[n-1, i] + ((dur-rate*CH[n-1])/(rate*CH[n-1]))**2 - .15*min(gap_after[j-1], 2)
            if c < C[n, j]: C[n, j] = c; B[n, j] = i
cuts, j = [], P
for n in range(N, 0, -1): i = B[n, j]; cuts.append((i, j)); j = i
cuts.reverse()
for n, (i, j) in enumerate(cuts, 1):
    segs = sum(ph[i:j], []); parts = []
    for k, (s0, s1) in enumerate(segs):
        y = a[max(0, s0*hop-2*hop): s1*hop+3*hop].copy()
        f = int(.01*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
        parts.append(y)
        if k < len(segs)-1: parts.append(np.zeros(int(min((segs[k+1][0]-s1)*.02, MAXP)*sr)))
    y = np.concatenate(parts)
    with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
    print(f'{n:02d} {len(y)/sr:5.2f}s  expect {rate*CH[n-1]:4.1f}  phrases {j-i}  {LINES[n-1]}')
