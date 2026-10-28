# Speed lines up (TEMPO), place them with the gaps below, write voice.wav (48 kHz stereo) and timing.json for the composition.
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.15; SR = 48000
# Lines 3 (knocks), 12 (peripheral vision, said again) and 13 (it was the curtain) are not used: the knocks are SFX + on-screen text,
# line 11 already says it, the curtain is shown — keeps the clip near 100 s.
USE = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
# pause before line n (default .3); 4: three knocks first; 14: you look, it is the curtain; 16: the viewer does the triangle test (8 s)
GAP = {4: 2.0, 6: .5, 10: .7, 11: .5, 14: 1.8, 16: 8.0, 17: .6, 18: .5, 19: .6, 21: .4, 22: 1.1, 23: .4, 24: .9, 25: 1.2}
os.makedirs(f'{D}/fast', exist_ok=True)
t, out, cues = .5, [], []
for n in USE:
    src, dst = f'{D}/{n:02d}.wav', f'{D}/fast/{n:02d}.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-af', f'atempo={TEMPO}', '-ar', str(SR), '-ac', '1', dst], check=True)
    with wave.open(dst) as w: y = np.frombuffer(w.readframes(w.getnframes()), np.int16)
    if n > USE[0]: t += GAP.get(n, .3)
    cues.append({'n': n, 'start': round(t, 2), 'end': round(t + len(y)/SR, 2)})
    out.append((t, y)); t += len(y)/SR
total = round(t + 3.6, 2)
mix = np.zeros(int(total*SR), np.int32)
for s, y in out: i = int(s*SR); mix[i:i+len(y)] += y
mix = np.clip(mix, -32767, 32767).astype(np.int16)
with wave.open(f'{D}/voice.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(mix, 2).tobytes())
json.dump({'total': total, 'cues': cues}, open(f'{D}/timing.json', 'w'), indent=1)
for c in cues: print(c['n'], c['start'], c['end'])
print('total', total)
