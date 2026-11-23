# raw FLUX -> slide: erase signature boxes, shrink onto a larger paper sheet (figures lower, room for bubbles), charcoal tone.
#   python finish.py raw/01-2.png slides/slide-01.png [--scale 0.8] [--sig x0,y0,x1,y1 ...]  (sig box in raw pixels)
import argparse, subprocess, cv2, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--scale', type=float, default=0.8); ap.add_argument('--sig', nargs='*', default=[])
a = ap.parse_args()
im = cv2.imread(a.src); h, w = im.shape[:2]
for box in a.sig:
    x0, y0, x1, y1 = map(int, box.split(','))
    m = np.zeros((h, w), np.uint8); m[y0:y1, x0:x1] = 255
    ring = im[max(0, y0-30):min(h, y1+30), max(0, x0-30):min(w, x1+30)].reshape(-1, 3)
    paper = ring[ring.sum(1) >= np.percentile(ring.sum(1), 75)].mean(0)  # brightest = paper
    im[y0:y1, x0:x1] = paper
S = int(round(w / a.scale)); ox = (S - w) // 2; oy = S - h
top = im[:40].reshape(-1, 3); paper = top[top.sum(1) >= np.percentile(top.sum(1), 60)].mean(0)  # brightest = paper (leaves at the top edge pulled the median dark)
can = np.empty((S, S, 3), np.float32); can[:] = paper
f = 90; alpha = np.ones((h, w), np.float32)
r = np.clip(np.arange(w) / f, 0, 1); alpha *= np.minimum(r, r[::-1])[None, :]
alpha *= np.clip(np.arange(h) / f, 0, 1)[:, None]
alpha = alpha ** 1.5
can[oy:, ox:ox+w] = im * alpha[..., None] + paper * (1 - alpha[..., None])
tmp = a.out.replace('.png', '-pad.png'); cv2.imwrite(tmp, can.astype(np.uint8))
subprocess.run(['python', 'C:/timeoptic-content/tools/charcoal_tone.py', tmp, a.out,
                '--paper', 'C:/timeoptic-content/carousel/kits/2026-11-13_dialogue-quotes/slides/slide-06.png'], check=True)
import os; os.remove(tmp)
