# Cut lines 5, 6, 9 out of fix_all.wav (phrase times heard in this take) into 05/06/09.wav; pause inside a line = GAP s.
import wave, numpy as np, os
D = os.path.dirname(os.path.abspath(__file__))
LINES = {5: [(.28,1.26),(2.14,3.16),(3.94,6.04)], 6: [(7.54,8.06),(8.94,10.04),(10.78,12.66),(13.94,15.12),(16.18,17.38),(18.36,19.5)], 9: [(22.32,24.56)]}
GAP = {5: .3, 6: .15, 9: 0}
with wave.open(f'{D}/fix_all.wav') as w:
    sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
for n, ph in LINES.items():
    parts = []
    for k, (s, e) in enumerate(ph):
        y = a[max(0, int((s-.04)*sr)): int((e+.06)*sr)].copy(); f = int(.01*sr); y[:f] *= np.linspace(0,1,f); y[-f:] *= np.linspace(1,0,f)
        parts.append(y)
        if k < len(ph)-1: parts.append(np.zeros(int(GAP[n]*sr)))
    y = np.concatenate(parts)
    with wave.open(f'{D}/{n:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(y.astype(np.int16).tobytes())
    print(n, round(len(y)/sr, 2), round(len(y)/sr/1.08, 2))
