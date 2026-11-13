# Split p1..p2.wav (v2; v1 used p1..p4) (8 cues each) into 01..32.wav. The model didn't pause evenly, so cue boundaries come from a
# faster-whisper transcript (approximate times below) snapped to the longest silence within +-1.5 s.
# Pauses inside a cue are capped at MAXP s.
import wave, numpy as np, os
D = os.path.dirname(os.path.abspath(__file__)); MAXP = 0.4
B = {1: [6.38, 14.86, 20.87, 26.26, 32.77, 39.72, 49.92], 2: [9.36, 19.33, 30.61, 39.64, 51.18, 60.41, 70.07]}   # v2 script
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
for p in sorted(B):
    a, sr, hop, runs = runs_of(f'{D}/p{p}.wav')
    gaps = [(i, (runs[i+1][0]-runs[i][1])*.02, (runs[i][1]+runs[i+1][0])*.01) for i in range(len(runs)-1)]
    cut = sorted(max((g for g in gaps if abs(g[2]-t) < 1.5), key=lambda g: g[1])[0] for t in B[p])
    assert len(set(cut)) == 7, (p, cut)
    edges = [-1] + cut + [len(runs)-1]
    for j in range(8):
        segs = runs[edges[j]+1: edges[j+1]+1]; n += 1
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
        print(f'{n:02d} {segs[0][0]*.02:6.2f}-{segs[-1][1]*.02:6.2f} {len(y)/sr:.2f}s')
