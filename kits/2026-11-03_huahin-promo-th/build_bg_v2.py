# v2: cut the 14 AI clips (C:/timeoptic-content/Video-Edit, 720x1280 24 fps, 6.04 s each) into one 1080x1920 30 fps background
# that follows the voice (audio/timing.json). Each shot = [clip, in, out, start]; it runs until the next shot starts
# (speed changed to fit). The last shot holds its last frame under the end card.
import json, os, subprocess
D = os.path.dirname(os.path.abspath(__file__)); SRC = 'C:/timeoptic-content/Video-Edit'
C = {1: 'Blue_shirt_character_rubbing_eyes_8d311b44', 2: 'Character_sleeping_camera_moving_c38f10f9', 3: 'กล้องค่อยๆขยับออก_68ea3a22',
     4: 'กล้องค่อยๆขยับออก_d9e86c3e', 5: 'ตัวละครเสื้อฟ้าถอดแว่นแล้วขยี้ตา_a7762fad', 6: 'ตัวละครเสื้อฟ้าถอดแว่นแล้วขยี้ตา_c6ee55f9',
     7: 'ตัวละครกำลังเดินเข้าไปในร้าน_37e2cc6f', 8: 'ตัวละครกำลังเดินแบบมีความสุข_904f8833', 9: 'ตัวละครกำลังทำทางปวดตา_a739010a',
     10: 'ตัวละครกำลังทำท่าทางเลืกแว่น_5716dd76', 11: 'ตัวละครชี้ไปที่หน้าร้านแบบหน้านิ่งๆ_9e8afb83', 12: 'ทำภาพเคลื่อนไหว_27fd1e55',
     13: 'ทำภาพเคลื่อนไหว_52ee3e7d', 14: 'รถกำลังขยับไปข้างหน้า_6a2e9f07'}
T = json.load(open(f'{D}/audio/timing.json')); cue = {c['n']: c['start'] for c in T['cues']}; total = T['total']
def at(n): return 0 if n == 1 else round(cue[n] - .2, 2)      # cut slightly before the line starts
SHOTS = [  # clip, in, out, start
    (6, 0, 4.7, at(1)),       # clock tower, glasses off                  L1 hook
    (4, 0, 3.9, at(2)),       # aerial Hua Hin beach road                 L2
    (1, 0.8, 2.0, at(3)),     # waking up in bed                          L3 "ตื่นมาก็ใส่"
    (5, 0, 1.15, 9.75),       # cafe laptop                               L3 "ทำงานก็ใส่"
    (14, 0, 1.3, 10.9),       # driving                                   L3 "ขับรถก็ใส่"
    (2, 0, 3.6, at(4)),       # asleep on the beach in glasses            L4 "อวัยวะที่ 33"
    (9, 0, 3.7, at(5)),       # market, rubbing eyes                      L5
    (5, 1.4, 5.2, at(6)),     # cafe, rubbing the nose bridge             L6
    (12, 0, 3.5, at(7)),      # eye test                                  L7 right lens
    (8, 0, 3.3, at(8)),       # night market, looking around              L8
    (11, 0, 2.5, at(9)),      # at the TIME OPTIC storefront              L9
    (12, 3.5, 6.04, at(10)),  # eye test, continued                       L10   (clip 13 removed by user)
    (10, 0, 5.1, at(11)),     # choosing frames                           L11
    (9, 3.7, 6.04, at(12)),   # market, looking at his glasses            L12a "แว่นที่ใช่"
    (8, 3.3, 6.04, 43.2),     # happy walk                                L12b "ใส่แล้วมั่นใจ"
    (3, 0, 4.1, at(13)),      # Hua Hin station                           L13
    (11, 2.5, 5.4, at(14)),   # pointing at the shop                      L14
    (14, 1.3, 4.3, at(15)),   # driving closer                            L15 "ใกล้กว่าที่คิด"
    (7, 0, 6.04, at(16)),     # walking into the shop, holds under end card  L16
]
parts, filt = [], []
for i, (c, a, b, s) in enumerate(SHOTS):
    e = SHOTS[i+1][3] if i + 1 < len(SHOTS) else total
    dur = e - s; last = i == len(SHOTS) - 1
    k = 1.0 if last else dur / (b - a)
    pad = max(0, dur - (b - a)) + .5 if last else 0
    parts += ['-i', f'{SRC}/{C[c]}.mp4']
    filt.append(f'[{i}:v]trim={a}:{b},setpts=(PTS-STARTPTS)*{k:.4f},scale=1080:1920:flags=lanczos,fps=30,'
                f'tpad=stop_mode=clone:stop_duration={pad:.2f},trim=duration={dur:.3f},setsar=1[s{i}]')
    print(f'{i+1:2d} clip{c:02d} {a}-{b} at {s:.2f}-{e:.2f} speed {1/k:.2f}')
filt.append(''.join(f'[s{i}]' for i in range(len(SHOTS))) + f'concat=n={len(SHOTS)}:v=1:a=0[v]')
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *parts, '-filter_complex', ';'.join(filt), '-map', '[v]',
                '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{D}/hf/assets/bg-v2.mp4'], check=True)
print('total', total)
