# Speed lines up (TEMPO), place them with the gaps below, write voice.wav (48 kHz stereo) and timing.json for the composition.
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.12; SR = 48000
GAP = {2: 2.1, 3: .9, 4: 1.1, 5: 1.2, 6: 2.4, 7: 1.8, 8: 2.0, 9: .3, 10: 2.8, 11: 3.4, 12: 1.4, 13: 2.8, 14: 2.5, 15: 1.4, 16: 1.3, 17: 2.8, 18: 1.7, 19: 1.0, 20: .9, 21: 1.6, 22: .6, 23: .2, 24: .2, 25: .2, 26: .7, 27: 1.3}  # pause before line n (default .3); wide gaps leave room for the action between lines
os.makedirs(f'{D}/fast', exist_ok=True)
t, out, cues = .5, [], []
for n in range(1, 28):
    src, dst = f'{D}/{n:02d}.wav', f'{D}/fast/{n:02d}.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-af', f'atempo={TEMPO}', '-ar', str(SR), '-ac', '1', dst], check=True)
    with wave.open(dst) as w: y = np.frombuffer(w.readframes(w.getnframes()), np.int16)
    if n > 1: t += GAP.get(n, .3)
    cues.append({'n': n, 'start': round(t, 2), 'end': round(t + len(y)/SR, 2)})
    out.append((t, y)); t += len(y)/SR
total = round(t + 2.2, 2)
mix = np.zeros(int(total*SR), np.int32)
for s, y in out: i = int(s*SR); mix[i:i+len(y)] += y
mix = np.clip(mix, -32767, 32767).astype(np.int16)
with wave.open(f'{D}/voice.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(mix, 2).tobytes())
json.dump({'total': total, 'cues': cues}, open(f'{D}/timing.json', 'w'), indent=1)
for c in cues: print(c['n'], c['start'], c['end'])
print('total', total)
