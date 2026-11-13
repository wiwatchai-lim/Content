# Make a FLUX drawing match the Codex charcoal look: warm beige paper texture, sepia-grey ink, charcoal grain.
#   python tools/charcoal_tone.py in.png out.png [--paper carousel/kits/2026-11-13_dialogue-quotes/slides/slide-06.png]
# The paper texture is cut from the empty top of a Codex charcoal slide.
import argparse, cv2, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--paper', default='carousel/kits/2026-11-13_dialogue-quotes/slides/slide-06.png')
ap.add_argument('--grain', type=float, default=0.22)
a = ap.parse_args()
im = cv2.imread(a.src); h, w = im.shape[:2]
g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(np.float32)
lo, hi = np.percentile(g, 1), np.percentile(g, 90)
g = np.clip((g - lo) / (hi - lo), 0, 1)                      # 1 = paper, 0 = darkest stroke
p = cv2.imread(a.paper); ph = p.shape[0]
tile = p[int(ph*0.02):int(ph*0.30), int(p.shape[1]*0.05):int(p.shape[1]*0.95)]
tile = np.vstack([tile, tile[::-1]] * 4)[:max(h, 1)]
tile = np.hstack([tile, tile[:, ::-1]] * 4)[:h, :w].astype(np.float32)
tex = cv2.cvtColor(tile.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
tex = (tex - tex.mean()) / 255.0                              # paper tooth, about +-0.05
rng = np.random.default_rng(7)
noise = cv2.GaussianBlur(rng.normal(0, 1, (h, w)).astype(np.float32), (0, 0), 0.8)
mid = 4 * g * (1 - g)                                         # grain strongest in the mid-tones
g = np.clip(g + tex * 3.0 * (1 - g) + noise * a.grain * mid * 0.35, 0, 1)
g = cv2.GaussianBlur(g, (0, 0), 0.6)                          # soften clean ink edges
ink = np.array([52, 58, 66], np.float32)                     # BGR warm dark grey
out = tile * g[..., None] + ink * (1 - g[..., None])
cv2.imwrite(a.out, np.clip(out, 0, 255).astype(np.uint8))
print(a.out)
