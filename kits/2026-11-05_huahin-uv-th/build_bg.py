# Cut the 18 AI clips (C:/timeoptic-content/Video-Edit + /01, 720x1280 24 fps) into one 1080x1920 30 fps background that follows
# the voice (audio/timing.json): one shot per voice cue, cut 0.2 s before the line starts, speed changed to fit.
# The last shot holds its last frame under the end card.
import json, os, subprocess
D = os.path.dirname(os.path.abspath(__file__)); R = 'C:/timeoptic-content'
C = {1: 'Video-Edit/กล้องค่อยๆขยับออก_68ea3a22', 2: 'Video-Edit/กล้องค่อยๆขยับออก_d9e86c3e', 3: 'Video-Edit/ตัวละครกำลังทำทางปวดตา_a739010a',
     4: 'Video-Edit/ตัวละครกำลังทำท่าทางเลืกแว่น_5716dd76', 5: 'Video-Edit/ตัวละครกำลังเดินเข้าไปในร้าน_37e2cc6f',
     6: 'Video-Edit/ตัวละครชี้ไปที่หน้าร้านแบบหน้านิ่งๆ_9e8afb83', 7: 'Video-Edit/ทำภาพเคลื่อนไหว_27fd1e55',
     8: '01/Character_teaching_about_eyes_98a38300', 9: '01/กล้องค่อยๆหมุนรอบตัวละคร_fb71fc1b', 10: '01/ตัวละครกำลังขยี้ตา_9b721cf3',
     11: '01/ตัวละครกำลังซื้อของ_8bb8ee7d', 12: '01/ตัวละครกำลังทาครีมกันดีด_847664cf', 13: '01/ophthalmology-exhibit_817c26da_1080p',
     14: '01/ตัวละครกำลังหยอดตา_fd6f4262', 15: '01/ตัวละครกำลังเดิน_8c991ecb', 16: '01/ตัวละครกำลังเดินถ่ายรูป_f7dc77ea',
     17: '01/ตัวละครกำลังแสบตา_8f71c716', 18: '01/ตัวละครทั้งหมดเดินหนีออกจากลูกตา_d418343d_1080p',
     19: '01/ทุกคนกำลังชี้และโวยวายไปที่ดวงตา_0f7d02d5_1080p'}   # 13, 18, 19: user's replacements (2026-11-05)
T = json.load(open(f'{D}/audio/timing.json')); cue = {c['n']: c['start'] for c in T['cues']}; total = T['total']
def at(n): return 0 if n == 1 else round(cue[n] - .2, 2)
SHOTS = [  # clip, in, out, cue[, seconds after the cut]      (v2 script; v1 shot list in v1/build_bg.py)
    (13, 1.0, 4.0, 1),    # exhibit: doctor points, close-up of the yellow bump        hook ก้อนเหลือง  (user: open on the doctor)
    (13, 6.0, 7.5, 1, 2.9),  # exhibit: close-up of the red triangle                  hook แผ่นเนื้อแดง
    (17, 0, 2.6, 2),      # sun rays on the beach                                     แสง UV จากแดด
    (11, 0, 2.0, 2, 3.0), #   souvenir stall on the beach                              ปัจจัยเสี่ยง
    (12, 0, 4.03, 3),     # sunscreen in a deck chair                                  ทาครีมกันแดด
    (17, 2.6, 4.6, 4),    # rubbing his eyes in the sun                                "ดวงตา!"
    (2, 0, 3.0, 5),       # aerial Hua Hin beach road                                 UV ไม่ได้มาจากแดดตรง
    (2, 3.0, 6.04, 6),    #   ...sea and sand glare                                    สะท้อนผิวน้ำ ผืนทราย
    (10, 0, 3.5, 7),      # wind and sand, rubbing eyes                                UV สะสม
    (3, 0, 4.0, 7, 3.4),  # market, rubbing his eye                                    ต้อลม ต้อเนื้อ
    (13, 1.0, 4.0, 8),    # exhibit: doctor, then close-up of the yellow bump           ต้อลม   (clip 08 dropped by user)
    (13, 4.0, 7.6, 9),    # exhibit: doctor points, close-up of the red triangle       ต้อเนื้อ
    (15, 0, 2.0, 10),     # night market, squinting                                    มองไม่ชัด
    (7, 0, 2.5, 10, 1.6), # eye test                                                   สายตาเอียง
    (4, 0, 3.0, 11),      # choosing frames in the shop                                วิธีป้องกัน แว่นกันแดด
    (4, 3.0, 6.04, 12),   #   ...                                                      UV400
    (16, 0, 2.6, 13),     # sunset sea in sunglasses                                   โพลาไรซ์
    (9, 1.5, 4.03, 14),   # orbit to the side of the sunglasses                        โอบกระชับด้านข้าง
    (12, 0, 4.03, 15),    # sunscreen                                                  ทาครีม + ใส่แว่นกันแดด
    (9, 0, 2.5, 16),      # sunglasses at the sea, camera orbits                        ดวงตาต้องการการปกป้อง
    # closing lines, same footage as v1
    (6, 0, 6.04, 17),     # pointing at the TIME OPTIC storefront                       ไทม์ ออฟติก หัวหิน
    (5, 0, 6.04, 18),     # walking into the shop                                       ดูเลนส์ ดูทรง
    (16, 2.0, 4.03, 19),  # taking photos at sunset                                     รูปสวย ๆ
    (2, 3.0, 6.04, 19, 2.5),  # aerial beach at dusk                                 ความทรงจำดี ๆ
    (18, 0, 5.97, 20),    # everyone walks away from the eyeball; holds under end card  ทิ้งไว้ที่ชายหาด
]
parts, filt = [], []
st = lambda sh: at(sh[3]) + (sh[4] if len(sh) > 4 else 0)
for i, (c, a, b, n, *_) in enumerate(SHOTS):
    s = st(SHOTS[i]); e = st(SHOTS[i+1]) if i + 1 < len(SHOTS) else total
    dur = e - s; last = i == len(SHOTS) - 1
    k = 1.0 if last else dur / (b - a)
    pad = max(0, dur - (b - a)) + .5 if last else 0
    parts += ['-i', f'{R}/{C[c]}.mp4']
    filt.append(f'[{i}:v]trim={a}:{b},setpts=(PTS-STARTPTS)*{k:.4f},scale=1080:1920:flags=lanczos,fps=30,'
                f'tpad=stop_mode=clone:stop_duration={pad:.2f},trim=duration={dur:.3f},setsar=1[s{i}]')
    print(f'cue{n:2d} clip{c:02d} {a}-{b} at {s:.2f}-{e:.2f} speed {1/k:.2f}')
filt.append(''.join(f'[s{i}]' for i in range(len(SHOTS))) + f'concat=n={len(SHOTS)}:v=1:a=0[v]')
if '--dry' not in __import__('sys').argv:
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *parts, '-filter_complex', ';'.join(filt), '-map', '[v]',
                    '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{D}/hf/assets/bg.mp4'], check=True)
print('total', total)
