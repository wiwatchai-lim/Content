# Split p1..p3.wav (cues 1-7, 8-13, 14-19) into 01..19.wav at the longest silences (the model paused cleanly between lines).
# Pauses inside a cue are capped at MAXP s.
import wave, numpy as np, os
D = os.path.dirname(os.path.abspath(__file__)); MAXP = 0.4
PARTS = {1: 7, 2: 6, 3: 6}
# p2 was read with short even pauses: cut at the silence nearest these faster-whisper line ends instead of the longest gaps
NEAR = {2: [2.1, 8.5, 13.4, 19.3, 20.9]}
def runs_of(path):
    with wave.open(path) as w:
        sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
    hop = int(.02 * sr)
    rms = np.array([np.sqrt(np.mean(a[i:i+hop]**2)) for i in range(0, len(a)-hop, hop)])
    loud = 20*np.log10(rms/32768+1e-9) > -40
    runs, s = [], None
    for i, v in enumerate(loud):
        if v and s is None: s = i
        if not v and s is not None: runs.append([s, i]); s = None
    if s is not None: runs.append([s, len(loud)])
    return a, sr, hop, [r for r in runs if r[1]-r[0] >= 3]
n = 0
for p, k in PARTS.items():
    a, sr, hop, runs = runs_of(f'{D}/p{p}.wav')
    gaps = sorted(range(len(runs)-1), key=lambda i: runs[i+1][0]-runs[i][1], reverse=True)
    cut = sorted(gaps[:k-1])
    if p in NEAR:
        mid = lambda i: (runs[i][1]+runs[i+1][0])*.01
        cut = sorted(min(range(len(runs)-1), key=lambda i: abs(mid(i)-t)) for t in NEAR[p])
    print(f'p{p}: gaps used', [round((runs[i+1][0]-runs[i][1])*.02, 2) for i in cut],
          'next longest', [round((runs[i+1][0]-runs[i][1])*.02, 2) for i in gaps[k-1:k+2]])
    edges = [-1] + cut + [len(runs)-1]
    for j in range(k):
        segs = runs[edges[j]+1: edges[j+1]+1]; n += 1
        m = [list(segs[0])]
        for r in segs[1:]:
            (m[-1].__setitem__(1, r[1]) if (r[0]-m[-1][1])*.02 < 0.25 else m.append(list(r)))
        parts = []
        for q, (s0, s1) in enumerate(m):
            y = a[max(0, s0*hop-2*hop): s1*hop+3*hop].copy()
            f = int(.01*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
            parts.append(y)
            if q < len(m)-1: parts.append(np.zeros(int(min((m[q+1][0]-s1)*.02, MAXP)*sr)))
        y = np.concatenate(parts)
        with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
        print(f'{n:02d} {segs[0][0]*.02:6.2f}-{segs[-1][1]*.02:6.2f} {len(y)/sr:.2f}s')
