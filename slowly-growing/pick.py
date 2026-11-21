# Pick a FLUX seed as the episode's carousel art: erase FLUX's signature scribble(s), mute colours toward sepia,
# and shrink the picture onto a bigger sheet of the same paper (figures sit lower, the top stays free for text).
#   python slowly-growing/pick.py slowly-growing/episodes/ep01-next-bus 2 [x0,y0,x1,y1 ...] [--scale 0.78]
#   -> img/scene-square.png (1080x1080)
import sys, cv2, numpy as np
args = sys.argv[1:]
scale = 0.78
if '--scale' in args:
    i = args.index('--scale'); scale = float(args[i + 1]); del args[i:i + 2]
ep, seed, boxes = args[0], args[1], args[2:]
im = cv2.imread(f'{ep}/img/square-{seed}.png').astype(np.float32); h, w = im.shape[:2]
for b in boxes:
    x0, y0, x1, y1 = map(int, b.split(','))
    ring = im[max(0, y0-30):min(h, y1+30), max(0, x0-30):min(w, x1+30)].reshape(-1, 3)
    im[y0:y1, x0:x1] = ring[ring.sum(1) >= np.percentile(ring.sum(1), 75)].mean(0)
# sepia mute: keep 45% of the colour, rest = warm grey of the same brightness
g = cv2.cvtColor(im.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)[..., None] / 255
sepia = np.concatenate([g * 205, g * 228, g * 245], axis=2)   # BGR warm paper tint
im = im * 0.45 + sepia * 0.55
paper = np.median(im[:40].reshape(-1, 3), axis=0)
S = int(round(w / scale)); ox = (S - w) // 2; oy = S - h
can = np.empty((S, S, 3), np.float32); can[:] = paper
f = 80; alpha = np.ones((h, w), np.float32)
r = np.clip(np.arange(w) / f, 0, 1); alpha *= np.minimum(r, r[::-1])[None, :]
alpha *= np.clip(np.arange(h) / f, 0, 1)[:, None]
alpha = alpha ** 1.5
can[oy:, ox:ox + w] = im * alpha[..., None] + paper * (1 - alpha[..., None])
cv2.imwrite(f'{ep}/img/scene-square.png', cv2.resize(np.clip(can, 0, 255).astype(np.uint8), (1080, 1080), interpolation=cv2.INTER_AREA))
print(f'{ep}/img/scene-square.png')
