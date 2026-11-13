# Cut the user's 9 AI clips (clips/, 6 s each, 720x1280 or 1280x2274, 24 fps) into one 1080x1920 30 fps background that follows
# the voice (audio/timing.json): shots cut 0.2 s before their line starts, speed changed to fit. The last shot holds its last frame
# under the end card.
import json, os, subprocess, sys
D = os.path.dirname(os.path.abspath(__file__))
T = json.load(open(f'{D}/audio/timing.json')); cue = {c['n']: c['start'] for c in T['cues']}; total = T['total']
def at(n): return 0 if n == 1 else round(cue[n] - .2, 2)
SHOTS = [  # clip, in, out, cue[, seconds after the cut]
    ('phone-bench', 0, 4.0, 1),      # park bench, phone held close                    เคยสังเกต / อ่านใกล้ ๆ ก็ชัด
    ('phone-cafe', 0.5, 6.04, 3),    # beach cafe, arm stretched far out                ยื่นแขนออกไปไกล
    ('phone-bench', 2.0, 6.04, 4),   # bench, pulls the phone away, squints             มือถือมีปัญหา หรือสายตา
    ('menu', 0, 4.5, 5),             # seaside restaurant, squinting at the menu        สัญญาณของสายตายาวตามวัย
    ('rub-book', 0, 4.6, 6),         # rubbing his eyes by the lamp                     อายุ 40 เลนส์ตาไม่ยืดหยุ่น
    ('rub-book', 3.0, 6.04, 7),      # holding the book away                            โฟกัสระยะใกล้ยาก
    ('menu', 4.0, 6.04, 8),          # close-up, menu at arm's length                   เมนูอาหาร
    ('phone-cafe', 1.5, 6.04, 9),    # phone at arm's length                            เล่นมือถือ ขยับออกห่าง
    ('rub-book', 0.5, 4.5, 10),       # lamp + rubbing tired eyes                        เพิ่มแสง ล้าตา
    ('aerial', 0, 6.04, 11),         # Hua Hin beach road at dusk                       ต่อให้สายตาดีมาก ก็เป็นได้
    ('eye-test', 0, 6.04, 12),       # eye test with the optometrist                    แก้ยังไง / ตรวจวัดสายตา
    ('shop-try', 0, 6.04, 14),       # trying frames in the shop                        แว่นอ่านหนังสือ / โปรเกรสซีฟ
    ('phone-bench', 0, 6.04, 16),    # bench, phone                                     แขนสั้น
    ('phone-cafe', 2.0, 4.6, 17),    # arm stretched to the max                         ไม่ต้องหาวิธียืดแขน
    ('point-store', 0.3, 4.5, 18),   # points at the TIME OPTIC storefront              ตรวจวัดสายตาฟรี TIME OPTIC หัวหิน
    ('walk-in', 0, 6.04, 19),        # walks into the shop; holds under the end card    มองชัด + สบายตา
]
parts, filt = [], []
st = lambda sh: at(sh[3]) + (sh[4] if len(sh) > 4 else 0)
for i, (c, a, b, n, *_) in enumerate(SHOTS):
    s = st(SHOTS[i]); e = st(SHOTS[i+1]) if i + 1 < len(SHOTS) else total
    dur = e - s; last = i == len(SHOTS) - 1
    k = 1.0 if last else dur / (b - a)
    pad = max(0, dur - (b - a)) + .5 if last else 0
    parts += ['-i', f'{D}/clips/{c}.mp4']
    filt.append(f'[{i}:v]trim={a}:{b},setpts=(PTS-STARTPTS)*{k:.4f},scale=1080:1920:flags=lanczos,fps=30,'
                f'tpad=stop_mode=clone:stop_duration={pad:.2f},trim=duration={dur:.3f},setsar=1[s{i}]')
    print(f'cue{n:2d} {c:12s} {a}-{b} at {s:.2f}-{e:.2f} speed {1/k:.2f}')
filt.append(''.join(f'[s{i}]' for i in range(len(SHOTS))) + f'concat=n={len(SHOTS)}:v=1:a=0[v]')
if '--dry' not in sys.argv:
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *parts, '-filter_complex', ';'.join(filt), '-map', '[v]',
                    '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{D}/hf/assets/bg.mp4'], check=True)
print('total', total)
