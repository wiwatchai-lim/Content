# Speed lines up (TEMPO), place them with the gaps below, write voice.wav (48 kHz stereo) and timing.json for the composition.
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.12; SR = 48000
GAP = {6: .4, 7: .4, 8: .5, 9: .4, 10: 3.0, 11: 3.0, 12: 2.8, 13: 3.0, 14: 4.8, 15: 3.0, 16: 1.6, 17: 3.2, 18: .8, 19: .5, 20: 1.0, 21: 1.0, 22: 1.8, 23: .8, 24: .7, 25: 1.4}  # pause before line n (default .3); the fight lines leave room for the beats between them
os.makedirs(f'{D}/fast', exist_ok=True)
t, out, cues = .5, [], []
for n in range(1, 26):
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
