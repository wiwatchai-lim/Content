# Speed lines up (TEMPO), place them at the script's timecodes below, write voice.wav (48 kHz stereo) and timing.json for the composition.
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.12; SR = 48000; N = 28
# earliest start of line n (script.md §1 + .5 s lead-in); a line never starts sooner than GAP after the previous one ends.
# The fight (11-21) gets the long holes the action plays in; 26 "ศูนย์…" is followed by ~3 s of total silence.
AT = {1: .5, 2: 4.5, 3: 8.5, 4: 11.5, 5: 15.5, 6: 19.5, 7: 22.5, 8: 25.5, 9: 29.5, 10: 32.5, 11: 37.5, 12: 42.5, 13: 47.5, 14: 52.5,
      15: 56.5, 16: 60.5, 17: 64.5, 18: 67.5, 19: 71.5, 20: 75.5, 21: 80.5, 22: 86.5, 23: 90.5, 24: 95.5, 25: 99.5, 26: 104.5, 27: 107.5, 28: 111.5}
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
total = round(t + 4.5, 2)   # the season-2 card holds after the radio line
mix = np.zeros(int(total*SR), np.int32)
for s, y in out: i = int(s*SR); mix[i:i+len(y)] += y
mix = np.clip(mix, -32767, 32767).astype(np.int16)
with wave.open(f'{D}/voice.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(mix, 2).tobytes())
json.dump({'total': total, 'cues': cues}, open(f'{D}/timing.json', 'w'), indent=1)
for c in cues: print(c['n'], c['start'], c['end'])
print('total', total)
