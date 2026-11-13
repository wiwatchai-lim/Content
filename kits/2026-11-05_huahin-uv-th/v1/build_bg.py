# Cut the 18 AI clips (C:/timeoptic-content/Video-Edit + /01, 720x1280 24 fps) into one 1080x1920 30 fps background that follows
# the voice (audio/timing.json): one shot per voice cue, cut 0.2 s before the line starts, speed changed to fit.
# The last shot holds its last frame under the end card.
import json, os, subprocess
D = os.path.dirname(os.path.abspath(__file__)); R = 'C:/timeoptic-content'
C = {1: 'Video-Edit/กล้องค่อยๆขยับออก_68ea3a22', 2: 'Video-Edit/กล้องค่อยๆขยับออก_d9e86c3e', 3: 'Video-Edit/ตัวละครกำลังทำทางปวดตา_a739010a',
     4: 'Video-Edit/ตัวละครกำลังทำท่าทางเลืกแว่น_5716dd76', 5: 'Video-Edit/ตัวละครกำลังเดินเข้าไปในร้าน_37e2cc6f',
     6: 'Video-Edit/ตัวละครชี้ไปที่หน้าร้านแบบหน้านิ่งๆ_9e8afb83', 7: 'Video-Edit/ทำภาพเคลื่อนไหว_27fd1e55',
     8: '01/Character_teaching_about_eyes_98a38300', 9: '01/กล้องค่อยๆหมุนรอบตัวละคร_fb71fc1b', 10: '01/ตัวละครกำลังขยี้ตา_9b721cf3',
     11: '01/ตัวละครกำลังซื้อของ_8bb8ee7d', 12: '01/ตัวละครกำลังทาครีมกันดีด_847664cf', 13: '01/ตัวละครกำลังสอนเกี่ยวกับเรื่องลูกตา_9be917fc',
     14: '01/ตัวละครกำลังหยอดตา_fd6f4262', 15: '01/ตัวละครกำลังเดิน_8c991ecb', 16: '01/ตัวละครกำลังเดินถ่ายรูป_f7dc77ea',
     17: '01/ตัวละครกำลังแสบตา_8f71c716', 18: '01/ตัวละครทั้งหมดเดินหนีออกลูกตา_bf12c779'}
T = json.load(open(f'{D}/audio/timing.json')); cue = {c['n']: c['start'] for c in T['cues']}; total = T['total']
def at(n): return 0 if n == 1 else round(cue[n] - .2, 2)
SHOTS = [  # clip, in, out, cue[, seconds after the cut]
    (18, 0, 3.0, 1),     # giant eyeball with pinguecula + pterygium on the beach   hook
    (17, 0, 2.2, 2),     # sun rays on the beach                                     "แสงแดด!"
    (11, 0, 4.03, 3),    # buying souvenirs                                          ของฝากจากทะเล
    (12, 0, 4.03, 4),    # sunscreen in a deck chair                                  ครีมกันแดด
    (17, 2.2, 4.3, 5),   # rubbing his eyes in the sun                                "ดวงตา!"
    (2, 0, 3.0, 6),      # aerial Hua Hin beach road                                 UV ที่ทะเล
    (2, 3.0, 6.04, 7),   #   ...sea and sand glare                                    แสงสะท้อน
    (10, 0, 3.5, 8),     # wind and sand, rubbing eyes by the horses                  ลม ฝุ่น ทราย
    (3, 0, 4.0, 9),      # market, rubbing his eye                                    UV สะสม
    (8, 0, 5.0, 10),     # doctor + eyeball models                                    ต้อลม
    (13, 0, 4.0, 11),    # doctor points at the red triangle                          ต้อเนื้อ
    (13, 4.0, 7.0, 12),  #   ...                                                      ลามเข้าตาดำ
    (8, 5.0, 10.03, 13), # doctor, continued                                          ไม่ใช่ทุกคน
    (14, 0, 4.03, 14),   # eye drops in the hotel room                                ตาแดง แสบ เคือง
    (15, 0, 2.0, 15),    # night market, squinting                                    ต้อเนื้อลาม
    (15, 2.0, 4.03, 16), #   ...                                                      มองไม่ชัด
    (13, 7.0, 10.03, 17),# doctor close-up                                            ผ่าตัด
    (1, 0, 6.04, 18),    # Hua Hin station from above                                 ทริปเดียว
    (17, 4.3, 6.04, 19), # walking on in the sun                                      UV สะสมนาน
    (9, 0, 4.03, 20),    # sunglasses at the sea, camera orbits                        ป้องกันยังไง
    (4, 0, 2.0, 21),     # choosing frames in the shop                                 แว่นกันแดด
    (4, 2.0, 6.04, 22),  #   ...trying frames                                         UV400
    (16, 0, 2.0, 23),    # sunset sea in sunglasses                                    โพลาไรซ์
    (7, 0, 3.0, 24),     # lens / eye check                                            เช็ก UV
    (9, 2.0, 4.03, 25),  # orbit to the side of the sunglasses                         ปิดด้านข้าง
    (10, 3.5, 6.04, 26), # sand and wind                                               ลมและทราย
    (3, 4.0, 6.04, 27),  # market, holding his glasses                                 ตาแดงเรื้อรัง
    (7, 3.0, 6.04, 28),  # eye test                                                    จักษุแพทย์
    (6, 0, 6.04, 29),    # pointing at the TIME OPTIC storefront                       ไทม์ ออฟติก หัวหิน
    (5, 0, 6.04, 30),    # walking into the shop                                       ดูเลนส์ ดูทรง
    (16, 2.0, 4.03, 31), # taking photos at sunset                                     รูปสวย ๆ
    (2, 3.0, 6.04, 31, 2.5),  # aerial beach at dusk                                 ความทรงจำดี ๆ
    (18, 3.0, 6.04, 32), # everyone walks away from the eyeball; holds under end card  ทิ้งไว้ที่ชายหาด
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
