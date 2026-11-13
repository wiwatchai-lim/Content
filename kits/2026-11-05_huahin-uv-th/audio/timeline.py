# Speed lines up (TEMPO), place them with the gaps below, write voice.wav (48 kHz stereo) and timing.json for the composition.
import json, os, subprocess, wave, numpy as np
D = os.path.dirname(os.path.abspath(__file__)); TEMPO = 1.08; SR = 48000; N = 16
END = [29, 30, 31, 32]   # closing lines taken from the v1 render (audio/end/<v1 cue>.wav, already at TEMPO)
GAP = {17: .5, 19: .45, 20: .4, 3: .45, 5: .45, 7: .45, 8: .4, 9: .3, 11: .55, 13: .35, 14: .3, 15: .5, 16: .3}   # pause before line n (default .25)
os.makedirs(f'{D}/fast', exist_ok=True)
t, out, cues = .3, [], []
for n in range(1, N + len(END) + 1):
    if n <= N:
        src, dst = f'{D}/{n:02d}.wav', f'{D}/fast/{n:02d}.wav'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-af', f'atempo={TEMPO}', '-ar', str(SR), '-ac', '1', dst], check=True)
    else: dst = f'{D}/end/{END[n - N - 1]}.wav'
    with wave.open(dst) as w: y = np.frombuffer(w.readframes(w.getnframes()), np.int16)
    if n > 1: t += GAP.get(n, .25)
    cues.append({'n': n, 'start': round(t, 2), 'end': round(t + len(y)/SR, 2)})
    out.append((t, y)); t += len(y)/SR
total = round(t + 3.0, 2)
mix = np.zeros(int(total*SR), np.int32)
for s, y in out: i = int(s*SR); mix[i:i+len(y)] += y
mix = np.clip(mix, -32767, 32767).astype(np.int16)
with wave.open(f'{D}/voice.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(mix, 2).tobytes())
json.dump({'total': total, 'cues': cues}, open(f'{D}/timing.json', 'w'), indent=1)
for c in cues: print(c['n'], c['start'], c['end'])
print('total', total)
