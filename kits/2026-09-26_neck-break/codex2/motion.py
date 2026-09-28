# Smooth head moves for the staff version: RIFE frame interpolation between the Codex stills (closed <-> each pose),
# timed to the 15-second clip, written as one video for hf15-photo/assets/staff_motion.mp4.
#   python kits/2026-09-26_neck-break/codex/motion.py
# Needs rife-ncnn-vulkan in ~/tools-bin (https://github.com/nihui/rife-ncnn-vulkan, model rife-v4.6).
import math, shutil, subprocess, sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parents[2]
RIFE = Path.home() / 'tools-bin' / 'rife-ncnn-vulkan-20221029-windows'
FFMPEG = ROOT / 'node_modules' / 'ffmpeg-static' / ('ffmpeg.exe' if sys.platform == 'win32' else 'ffmpeg')
WORK = ROOT / 'tmp' / 'rife-moves2'
FPS = 30
INTRO, CLOSE, STEP = 2.5, 1.0, 2.0          # same as hf15: intro, "close your eyes", seconds per move
TOTAL = 20.5
N = 31                                     # interpolated frames per transition (incl. both ends)


def transition(a, b):
    """Frames a -> b, eased in/out, as a list of image paths."""
    d = WORK / f'{a}-{b}'
    if not (d / 'out').exists() or len(list((d / 'out').glob('*.png'))) < N:
        shutil.rmtree(d, ignore_errors=True); (d / 'in').mkdir(parents=True); (d / 'out').mkdir()
        shutil.copy(HERE / f'{a}.png', d / 'in' / '00000001.png'); shutil.copy(HERE / f'{b}.png', d / 'in' / '00000002.png')
        subprocess.run([str(RIFE / 'rife-ncnn-vulkan.exe'), '-i', str(d / 'in'), '-o', str(d / 'out'), '-n', str(N),
                        '-m', str(RIFE / 'rife-v4.6')], check=True, capture_output=True)
    return sorted((d / 'out').glob('*.png'))


def eased(frames, count):
    """Pick `count` frames from a linear sequence along an ease-in-out curve."""
    return [frames[round((0.5 - math.cos(math.pi * i / (count - 1)) / 2) * (len(frames) - 1))] for i in range(count)]


timeline = []  # (image path, seconds)
def hold(img, sec): timeline.append((HERE / f'{img}.png' if isinstance(img, str) else img, sec))
def move(a, b, sec):
    for f in eased(transition(a, b), max(2, round(sec * FPS))): timeline.append((f, 1 / FPS))


hold('open', INTRO + 0.5)                   # behind the intro, then the start of "close your eyes"
move('open', 'closed', 0.45)
hold('closed', INTRO + CLOSE + 0.05 - sum(s for _, s in timeline))
for i, p in enumerate(['up', 'right', 'left', 'back', 'chinright', 'chinleft']):
    t = INTRO + CLOSE + i * STEP
    move('closed', p, 0.7)
    hold(p, 0.55)
    back = transition('closed', p)[::-1]
    for f in eased(back, round(0.65 * FPS)): timeline.append((f, 1 / FPS))
    hold('closed', t + STEP + 0.05 - sum(s for _, s in timeline))
move('closed', 'open', 0.5)
hold('open', TOTAL - sum(s for _, s in timeline))

listing = WORK / 'frames.txt'
listing.write_text(''.join(f"file '{Path(p).as_posix()}'\nduration {s:.5f}\n" for p, s in timeline) + f"file '{Path(timeline[-1][0]).as_posix()}'\n")
out = ROOT / 'kits' / '2026-09-26_neck-break' / 'hf15-photo2-motion' / 'assets' / 'staff_motion.mp4'
subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(listing),
                '-vf', f'fps={FPS},scale=1080:1620:flags=lanczos', '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', str(out)], check=True)
print(out, f'{sum(s for _, s in timeline):.2f}s')
