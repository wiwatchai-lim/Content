# Speed lines up a touch (TEMPO), lay them one after another with a breath between (GAP, longer at scene changes),
# write voice.wav (48 kHz stereo) and timing.json (cue starts/ends) for the composition.
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.07; SR = 48000; N = 27
LEAD = 2.2                     # title over the night exterior before the first line
GAP = {3: 1.6, 5: 1.2, 8: .9, 11: 1.6, 13: 1.0, 14: 1.8, 15: .9, 16: .6, 17: .8, 19: 1.4, 20: 1.4, 21: 1.8, 22: .8, 23: 1.2,
       24: 2.0, 26: 1.2, 27: 2.2}
os.makedirs(f'{D}/fast', exist_ok=True)
t, out, cues = LEAD, [], []
for n in range(1, N + 1):
    src, dst = f'{D}/{n:02d}.wav', f'{D}/fast/{n:02d}.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-af', f'atempo={TEMPO}', '-ar', str(SR), '-ac', '1', dst], check=True)
    with wave.open(dst) as w: y = np.frombuffer(w.readframes(w.getnframes()), np.int16)
    if n > 1: t += GAP.get(n, .55)
    cues.append({'n': n, 'start': round(t, 2), 'end': round(t + len(y)/SR, 2)})
    out.append((t, y)); t += len(y)/SR
total = round(t + 4.0, 2)      # end card holds
mix = np.zeros(int(total*SR), np.int32)
for s, y in out: i = int(s*SR); mix[i:i+len(y)] += y
mix = np.clip(mix, -32767, 32767).astype(np.int16)
with wave.open(f'{D}/voice.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(mix, 2).tobytes())
json.dump({'total': total, 'cues': cues}, open(f'{D}/timing.json', 'w'), indent=1)
print('total', total)
