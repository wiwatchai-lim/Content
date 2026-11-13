# Merge each brand's front cutout with its lens layer (or a filled lens when none exists), trim, resize to 640 px wide.
import cv2, numpy as np, sys
from pathlib import Path
R = Path(__file__).resolve().parents[2]
OUT = Path(__file__).parent / 'hf' / 'assets' / 'g'
SRC = {
 'rayban': 'kits/2026-09-18_rb5453d/layers/RB5453D_1',
 'coach': 'kits/2026-09-18_hc5206d/layers/HC5206D_1',
 'boss': 'kits/2026-09-21_boss1427/layers/BOSS1427_1',
 'oakley': 'kits/2026-09-24_ox8080-0158/layers/OX8080-0158_1',
 'bolon': 'kits/2026-09-25_bj3185-b10/layers/BJ3185-B10_1',
 'ferrari': 'kits/2026-09-25_fz6002u-504-81/layers/FZ6002U-504-81_1',
 'paulhueman': 'kits/2026-09-25_ph-5246d/layers/5246D_1',
 'timberland': 'kits/2026-09-25_tb1670f/layers/TB1670-F052_1',
 'vogue': 'kits/2026-09-25_vogue-5676/layers/5676-2726_1',
 'prada': 'kits/2026-11-09_prada-linea-rossa-sail/layers/front',
}
def over(dst, src):
    a = src[..., 3:4] / 255.0; b = dst[..., 3:4] / 255.0
    o = a + b * (1 - a)
    rgb = (src[..., :3] * a + dst[..., :3] * b * (1 - a)) / np.maximum(o, 1e-6)
    return np.dstack([rgb, o * 255]).astype(np.uint8)
for k, p in SRC.items():
    im = cv2.imread(str(R / (p + '.png')), cv2.IMREAD_UNCHANGED)
    lens_p = R / (p + '_lens.png')
    if lens_p.exists():
        lens = cv2.imread(str(lens_p), cv2.IMREAD_UNCHANGED)
        if lens.shape[2] == 3: lens = np.dstack([lens, np.full(lens.shape[:2], 255, np.uint8)])
        lens = cv2.resize(lens, im.shape[1::-1])
    else:
        solid = (im[..., 3] > 40).astype(np.uint8)
        ff = solid.copy(); h, w = ff.shape
        m = np.zeros((h + 2, w + 2), np.uint8)
        cv2.floodFill(ff, m, (0, 0), 1)
        holes = (ff == 0).astype(np.uint8)
        n, lab, st, _ = cv2.connectedComponentsWithStats(holes)
        keep = np.zeros_like(holes)
        for i in range(1, n):
            if st[i, 4] > 5000: keep[lab == i] = 1
        keep = cv2.dilate(keep, np.ones((11, 11), np.uint8))
        lens = np.zeros_like(im); lens[..., :3] = (236, 232, 226); lens[..., 3] = keep * 90
    m = over(lens, im)
    ys, xs = np.where(m[..., 3] > 10)
    m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    s = 640 / m.shape[1]
    m = cv2.resize(m, (640, round(m.shape[0] * s)), interpolation=cv2.INTER_AREA)
    cv2.imwrite(str(OUT / f'{k}.png'), m)
    print(k, m.shape, 'lens' if lens_p.exists() else 'filled')
