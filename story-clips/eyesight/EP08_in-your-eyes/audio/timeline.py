# Speed lines up (TEMPO), place them with the gaps below, write voice.wav (48 kHz stereo) and timing.json for the composition
# (line start/end + absolute phrase starts from phrases.json).
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.1; SR = 48000; N = 23
# pause before line n (default .28). 16: viewer test with one eye (countdown 5 -> 0); 17: test with both eyes.
GAP = {6: .5, 10: .5, 12: .4, 14: .5, 16: 6.4, 17: 4.8, 18: .6, 20: .7, 21: .6, 22: .4, 23: 1.4}
PS = json.load(open(f'{D}/phrases.json'))
os.makedirs(f'{D}/fast', exist_ok=True)
t, out, cues = .5, [], []
for n in range(1, N+1):
    src, dst = f'{D}/{n:02d}.wav', f'{D}/fast/{n:02d}.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-af', f'atempo={TEMPO}', '-ar', str(SR), '-ac', '1', dst], check=True)
    with wave.open(dst) as w: y = np.frombuffer(w.readframes(w.getnframes()), np.int16)
    if n > 1: t += GAP.get(n, .28)
    cues.append({'n': n, 'start': round(t, 2), 'end': round(t + len(y)/SR, 2), 'phrases': [round(t + p/TEMPO, 2) for p in PS[n-1]]})
    out.append((t, y)); t += len(y)/SR
total = round(t + 3.6, 2)
mix = np.zeros(int(total*SR), np.int32)
for s, y in out: i = int(s*SR); mix[i:i+len(y)] += y
mix = np.clip(mix, -32767, 32767).astype(np.int16)
with wave.open(f'{D}/voice.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(mix, 2).tobytes())
json.dump({'total': total, 'cues': cues}, open(f'{D}/timing.json', 'w'), indent=1)
for c in cues: print(c['n'], c['start'], c['end'], c['phrases'])
print('total', total)
