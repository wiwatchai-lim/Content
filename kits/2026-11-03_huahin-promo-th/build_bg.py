# Cut the 11 AI clips (D:/timeoptic-content/ดาวน์โหลด, 720x1280 24 fps, 6.04 s each) into one 1080x1920 30 fps background
# that follows the voice (audio/timing.json). Each shot = [clip, in, out, start]; it runs until the next shot starts
# (speed changed to fit). The last shot holds its last frame under the end card.
import json, os, subprocess
D = os.path.dirname(os.path.abspath(__file__)); SRC = 'D:/timeoptic-content/ดาวน์โหลด'
C = {1: 'Blue-shirted_character_walking_h…_2ed6b824', 2: 'Character_holding_injured_eye_bea900f0', 3: 'Character_pointing_at_sign_3c4fa5bd',
     4: 'Character_walking_into_shop_d150f519', 5: 'กล้องค่อยๆขยับออก_68ea3a22', 6: 'กล้องค่อยๆซูมออก_e0af2ef0', 7: 'กล้องซูมเข้าช้าๆ_35bbdfe9',
     8: 'ตัวละครเสื้อฟ้าถอดแว่นแล้วขยี้ตา_05e48e9a', 9: 'ตัวละครเสื้อฟ้าถอดแว่นแล้วขยี้ตา_0b9c1985', 10: 'ตัวละครเสื้อฟ้าถอดแว่นแล้วขยี้ตา_d244b6ab',
     11: 'ทำภาพเคลื่อนไหว_c2126ff8'}
T = json.load(open(f'{D}/audio/timing.json')); cue = {c['n']: c['start'] for c in T['cues']}; total = T['total']
def at(n): return 0 if n == 1 else round(cue[n] - .2, 2)      # cut slightly before the line starts
SHOTS = [  # clip, in, out, start
    (10, 0, 4.7, at(1)),      # clock tower, glasses off, squinting      L1 hook
    (5, 0, 4.0, at(2)),       # Hua Hin station miniature                 L2
    (8, 0, 3.6, at(3)),       # cafe laptop                               L3 wake/work/drive
    (6, 0, 3.6, at(4)),       # sleeping on the beach in glasses          L4 "33rd organ"
    (9, 0, 3.8, at(5)),       # Hua Hin Coffee, rubbing eyes              L5
    (2, 0, 3.9, at(6)),       # market, rubbing nose/eyes                 L6 comfort / weight on nose
    (7, 0, 3.4, at(7)),       # tray of frames + lenses                   L7 right lens
    (1, 0, 3.4, at(8)),       # walking the night market, looking         L8 looking for a shop
    (4, 0, 2.5, at(9)),       # TIME OPTIC storefront                     L9
    (11, 0, 2.7, at(10)),     # eye test                                  L10
    (4, 2.5, 6.04, at(11)),   # inside, browsing frames                   L11
    (11, 2.7, 6.04, at(12)),  # eye test, smiling                         L12a
    (1, 3.4, 6.04, 43.2),     # walking with confidence                   L12b "ใส่แล้วมั่นใจ"
    (6, 2.2, 6.04, at(13)),   # wide beach                                L13 Hua Hin
    (3, 0, 2.9, at(14)),      # at the TIME OPTIC sign                    L14
    (7, 3.4, 6.04, at(15)),   # glasses close-up                          L15
    (3, 2.9, 6.04, at(16)),   # pointing at the sign                      L16 + end card (holds last frame)
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
                '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{D}/hf/assets/bg.mp4'], check=True)
print('total', total)
