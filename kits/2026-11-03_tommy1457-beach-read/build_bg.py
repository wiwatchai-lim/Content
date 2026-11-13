# Join the 7 AI clips from C:/timeoptic-content/ดาวน์โหลด01 (720x1280, 24 fps, 4.03 s each) into one 1080x1920 30 fps
# background with soft cross-dissolves, 20 s (user, 2026-11-03; was 15 s). Shots = [clip, in, out]. Prints the cut times for build_html.py.
import os, subprocess
D = os.path.dirname(os.path.abspath(__file__)); SRC = 'C:/timeoptic-content/ดาวน์โหลด01'; X = 0.35
SHOTS = [
    ('กล้องค่อยๆขยับออก_879a757b', 0, 3.2),        # glasses on a book by the sea, pull back (TOMMY 1457 baked in)
    ('ตัวละครอ่านหนังสือ_8bbbe81f', 0.4, 3.4),        # wide: reading in a beach chair
    ('ตัวละครกำลังอ่านหนังสือ_11fd31e8', 0.6, 3.6),   # close: smiling, turning a page
    ('ตัวละครกำลังอ่านหนังสือ_398f98cf', 0.6, 3.6),   # profile over the waves
    ('กล้องขยับไปรอบๆแว่น_352a50e3', 0.6, 3.9),       # detail: camera circles the frame
    ('ตัวละครกำลังอ่านหนังสือ_ac20c384', 0.6, 3.6),   # golden-hour profile
    ('ทำภาพเคลื่อนไหว_e0f252de', 1.05, 4.0),        # standing on the dunes (skips the 3-panel intro) -> end card
]
args, f, t, cuts = [], [], 0, []
for i, (n, a, b) in enumerate(SHOTS):
    args += ['-i', f'{SRC}/{n}.mp4']
    f.append(f'[{i}:v]trim={a}:{b},setpts=PTS-STARTPTS,scale=1080:1920:flags=lanczos,fps=30,setsar=1,format=yuv420p'
             + (',tpad=stop_mode=clone:stop_duration=0.65' if i == len(SHOTS) - 1 else '') + f'[s{i}]')
prev, t = 's0', SHOTS[0][2] - SHOTS[0][1]
for i in range(1, len(SHOTS)):
    off = t - X; cuts.append(round(off, 2))
    f.append(f'[{prev}][s{i}]xfade=transition=fade:duration={X}:offset={off:.3f}[x{i}]'); prev = f'x{i}'
    t = off + SHOTS[i][2] - SHOTS[i][1]
t += 0.65
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *args, '-filter_complex', ';'.join(f), '-map', f'[{prev}]',
                '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', f'{D}/hf/assets/bg.mp4'], check=True)
print('dissolves start at', cuts, 'total', round(t, 2))
