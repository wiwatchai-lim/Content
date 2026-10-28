# Speed lines up (TEMPO), place them at the script's timecodes below, write voice.wav (48 kHz stereo) and timing.json for the composition.
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.12; SR = 48000; N = 22
# earliest start of line n (script.md §1 + .5 s lead-in); a line never starts sooner than GAP after the previous one ends.
# The fight (7-13) and the roof chase (14-17) get the long holes the action plays in; after "ข้าวตัง!" (20) 1.5 s of silence.
AT = {1: .5, 2: 4.3, 3: 8.4, 4: 12.4, 5: 16.2, 6: 21.0, 7: 24.0, 8: 28.0, 9: 34.2, 10: 40.2, 11: 45.0, 12: 49.0, 13: 54.2,
      14: 58.0, 15: 63.0, 16: 67.2, 17: 72.0, 18: 76.4, 19: 80.2, 20: 84.0, 21: 87.6, 22: 90.0}
GAP = .2
os.makedirs(f'{D}/fast', exist_ok=True)
t, out, cues = 0, [], []
for n in range(1, N + 1):
    src, dst = f'{D}/{n:02d}.wav', f'{D}/fast/{n:02d}.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-af', f'atempo={TEMPO}', '-ar', str(SR), '-ac', '1', dst], check=True)
    with wave.open(dst) as w: y = np.frombuffer(w.readframes(w.getnframes()), np.int16)
    t = max(t + (GAP if n > 1 else 0), AT[n])
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
