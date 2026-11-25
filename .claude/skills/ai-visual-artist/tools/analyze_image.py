"""Measure an image for critique — composition, value, colour, sharpness, technical faults. Indicators, not verdicts.

  python analyze_image.py image.png                       # JSON report
  python analyze_image.py image.png --overlay out.png      # + overlay: thirds/phi grid, saliency peaks, balance point, notan
  python analyze_image.py image.png --aspect 9:16 --platform reels   # + safe-zone check for the platform UI
  python analyze_image.py a.png b.png --csv out.csv

Measures
- saliency: OpenCV spectral-residual (Hou & Zhang 2007) and fine-grained maps → top salient regions (normalised x, y),
  distance of the strongest to thirds / phi / centre points (COMPOSITION_LIBRARY overlay guides)
- visual balance: centre of mass of a "visual weight" map (saliency × local contrast × saturation) vs the frame centre
- value: luminance histogram, key (high/mid/low), RMS contrast, % clipped highlights/shadows, 3-value notan split
- colour: k-means in OKLab → dominant colours with share (%), hue spread, mean chroma, warm/cool balance,
  proportion check vs a 60-30-10 guide, nearest library palette
- sharpness: Laplacian variance overall and in the focal region vs background (subject isolation)
- edges/clutter: Canny edge density per third of the frame
- technical: size, aspect, noise estimate, JPEG blockiness hint
Saliency models predict where attention may go; they are not eye-tracking of real viewers [Itti1998, Hou & Zhang 2007].
"""
import argparse
import csv
import json
import math
import sys
from pathlib import Path

import cv2
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import color_tools as ct  # noqa: E402

SKILL = Path(__file__).resolve().parent.parent
GUIDES = {'thirds': [(1 / 3, 1 / 3), (2 / 3, 1 / 3), (1 / 3, 2 / 3), (2 / 3, 2 / 3)],
          'phi': [(.382, .382), (.618, .382), (.382, .618), (.618, .618)], 'centre': [(.5, .5)]}
SAFE = {  # fraction of height covered by platform UI (top, bottom) and right column — working values, check current specs
    'reels': {'top': 0.11, 'bottom': 0.22, 'right': 0.12}, 'tiktok': {'top': 0.09, 'bottom': 0.2, 'right': 0.14},
    'stories': {'top': 0.12, 'bottom': 0.12, 'right': 0.0}, 'none': {'top': 0, 'bottom': 0, 'right': 0}}


def to_oklab_img(img_bgr):
    rgb = img_bgr[..., ::-1].astype(np.float32) / 255
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    M1 = np.array([[0.4122214708, 0.5363325363, 0.0514459929], [0.2119034982, 0.6806995451, 0.1073969566], [0.0883024619, 0.2817188376, 0.6299787005]])
    M2 = np.array([[0.2104542553, 0.7936177850, -0.0040720468], [1.9779984951, -2.4285922050, 0.4505937099], [0.0259040371, 0.7827717662, -0.8086757660]])
    lms = np.cbrt(lin @ M1.T)
    return lms @ M2.T, lin


def saliency(img):
    small = cv2.resize(img, (256, int(256 * img.shape[0] / img.shape[1])))
    sr = cv2.saliency.StaticSaliencySpectralResidual_create()
    ok, m1 = sr.computeSaliency(small)
    fg = cv2.saliency.StaticSaliencyFineGrained_create()
    ok2, m2 = fg.computeSaliency(small)
    m1 = cv2.GaussianBlur(m1.astype(np.float32), (0, 0), 3); m2 = cv2.GaussianBlur(m2.astype(np.float32) / 255.0, (0, 0), 3)
    m = (m1 / (m1.max() + 1e-9)) * .5 + (m2 / (m2.max() + 1e-9)) * .5
    return cv2.resize(m, (img.shape[1], img.shape[0]))


def peaks(m, n=3):
    h, w = m.shape; mm = m.copy(); out = []
    r = int(0.12 * max(h, w))
    for _ in range(n):
        y, x = np.unravel_index(np.argmax(mm), mm.shape)
        if mm[y, x] <= 0:
            break
        out.append({'x': round(x / w, 3), 'y': round(y / h, 3), 'strength': round(float(mm[y, x]), 3)})
        cv2.circle(mm, (int(x), int(y)), r, 0, -1)
    return out


def nearest_guide(p):
    best = {}
    for k, pts in GUIDES.items():
        best[k] = round(min(math.dist((p['x'], p['y']), q) for q in pts), 3)
    return best


def analyze(path, aspect=None, platform='none', overlay=None, k=6):
    img = cv2.imread(str(path), cv2.IMREAD_COLOR)
    if img is None:
        raise SystemExit(f'cannot read {path}')
    h, w = img.shape[:2]
    out = {'file': str(path), 'width': w, 'height': h, 'aspect': round(w / h, 4)}
    if aspect:
        a, b = (float(x) for x in aspect.split(':'))
        out['aspect_target'] = aspect; out['aspect_ok'] = abs(w / h - a / b) < 0.01
    lab, lin = to_oklab_img(img)
    L = lab[..., 0]; C = np.hypot(lab[..., 1], lab[..., 2])
    Y = (lin @ np.array([0.2126, 0.7152, 0.0722]))
    # value
    out['value'] = {'mean_L': round(float(L.mean()), 3), 'rms_contrast': round(float(L.std()), 3),
                    'key': 'high' if L.mean() > .72 else 'low' if L.mean() < .38 else 'mid',
                    'clipped_highlights_pct': round(100 * float((Y > .985).mean()), 2), 'crushed_shadows_pct': round(100 * float((Y < .002).mean()), 2),
                    'notan_3_pct': [round(100 * float((L < .4).mean()), 1), round(100 * float(((L >= .4) & (L < .7)).mean()), 1), round(100 * float((L >= .7).mean()), 1)]}
    # colour
    px = lab.reshape(-1, 3).astype(np.float32)
    sel = px[np.random.default_rng(0).choice(len(px), min(60000, len(px)), replace=False)]
    crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 40, 1e-4)
    _, labels, centers = cv2.kmeans(sel, k, None, crit, 3, cv2.KMEANS_PP_CENTERS)
    share = np.bincount(labels.ravel(), minlength=k) / len(labels)
    order = np.argsort(-share)
    dom = []
    for i in order:
        c = centers[i]; hexc = ct.rgb_to_hex(ct.oklab_to_rgb(tuple(float(v) for v in c)))
        dom.append({'hex': hexc, 'share_pct': round(100 * float(share[i]), 1), 'oklch': [round(float(c[0]), 3), round(float(math.hypot(c[1], c[2])), 3), round(math.degrees(math.atan2(c[2], c[1])) % 360, 1)]})
    chromatic = [d for d in dom if d['oklch'][1] > 0.04]
    hues = [d['oklch'][2] for d in chromatic]
    spread = 0
    if len(hues) > 1:
        hs = sorted(hues); gaps = [(hs[(i + 1) % len(hs)] - hs[i]) % 360 for i in range(len(hs))]; spread = round(360 - max(gaps), 1)
    warm = sum(d['share_pct'] for d in chromatic if d['oklch'][2] < 110 or d['oklch'][2] > 330)
    cool = sum(d['share_pct'] for d in chromatic if 150 < d['oklch'][2] < 300)
    shares = [d['share_pct'] for d in dom]
    out['color'] = {'dominant': dom, 'mean_chroma': round(float(C.mean()), 3), 'hue_spread_deg': spread,
                    'harmony_guess': 'achromatic/neutral' if not chromatic else 'monochromatic/analogous' if spread < 60 else 'analogous-wide' if spread < 120 else 'contrasting (complementary/triadic-like)',
                    'warm_pct': round(warm, 1), 'cool_pct': round(cool, 1),
                    'proportion_top3_pct': shares[:3], 'proportion_note': 'close to a 60-30-10 split' if len(shares) >= 3 and shares[0] >= 45 and shares[2] <= 18 else 'more even split than 60-30-10 (fine if intended)'}
    # saliency, balance, focal sharpness
    sal = saliency(img)
    pk = peaks(sal)
    for p in pk:
        p['nearest_guide_dist'] = nearest_guide(p)
    out['saliency_peaks'] = pk
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    local_c = cv2.GaussianBlur(np.abs(cv2.Laplacian(gray, cv2.CV_32F)), (0, 0), 6)
    weight = sal * (0.5 + local_c / (local_c.max() + 1e-9)) * (0.6 + C / (C.max() + 1e-9))
    ys, xs = np.mgrid[0:h, 0:w]
    cx, cy = float((weight * xs).sum() / weight.sum() / w), float((weight * ys).sum() / weight.sum() / h)
    out['balance'] = {'weight_centre': [round(cx, 3), round(cy, 3)], 'offset_from_centre': round(math.dist((cx, cy), (.5, .5)), 3),
                      'reading': 'centred/symmetrical' if math.dist((cx, cy), (.5, .5)) < .06 else 'asymmetrical' if math.dist((cx, cy), (.5, .5)) < .2 else 'strongly off-centre (check intent)'}
    lap = cv2.Laplacian(gray, cv2.CV_64F)
    if pk:
        fx, fy = int(pk[0]['x'] * w), int(pk[0]['y'] * h); r = int(.1 * min(w, h))
        roi = lap[max(0, fy - r):fy + r, max(0, fx - r):fx + r]
        mask = np.ones_like(lap, bool); mask[max(0, fy - r):fy + r, max(0, fx - r):fx + r] = False
        out['sharpness'] = {'overall': round(float(lap.var()), 1), 'focal': round(float(roi.var()), 1), 'background': round(float(lap[mask].var()), 1)}
        out['sharpness']['focal_vs_background'] = round(out['sharpness']['focal'] / (out['sharpness']['background'] + 1e-6), 2)
    edges = cv2.Canny(gray, 80, 160) > 0
    out['edge_density_thirds'] = {'rows_top_mid_bottom': [round(float(edges[int(i * h / 3):int((i + 1) * h / 3)].mean()), 4) for i in range(3)],
                                  'cols_left_mid_right': [round(float(edges[:, int(i * w / 3):int((i + 1) * w / 3)].mean()), 4) for i in range(3)]}
    noise = float(np.median(np.abs(lap - np.median(lap)))) * 1.4826 / math.sqrt(20)
    out['technical'] = {'noise_sigma_est': round(noise, 2)}
    sz = SAFE.get(platform, SAFE['none'])
    if platform != 'none':
        bad = [p for p in pk[:2] if p['y'] < sz['top'] or p['y'] > 1 - sz['bottom'] or p['x'] > 1 - sz['right']]
        out['safe_zone'] = {'platform': platform, 'zones': sz, 'focal_points_inside_ui': bad, 'ok': not bad}
    if overlay:
        ov = img.copy()
        for gx in (1 / 3, 2 / 3):
            cv2.line(ov, (int(gx * w), 0), (int(gx * w), h), (255, 255, 255), max(1, w // 600))
            cv2.line(ov, (0, int(gx * h)), (w, int(gx * h)), (255, 255, 255), max(1, w // 600))
        for gx in (.382, .618):
            cv2.line(ov, (int(gx * w), 0), (int(gx * w), h), (0, 215, 255), max(1, w // 900))
            cv2.line(ov, (0, int(gx * h)), (w, int(gx * h)), (0, 215, 255), max(1, w // 900))
        heat = cv2.applyColorMap((sal / sal.max() * 255).astype(np.uint8), cv2.COLORMAP_JET)
        ov = cv2.addWeighted(ov, .7, heat, .3, 0)
        for i, p in enumerate(pk):
            cv2.circle(ov, (int(p['x'] * w), int(p['y'] * h)), max(8, w // 40), (0, 0, 255), max(2, w // 300))
            cv2.putText(ov, str(i + 1), (int(p['x'] * w) + 12, int(p['y'] * h) - 12), cv2.FONT_HERSHEY_SIMPLEX, max(.6, w / 1200), (0, 0, 255), 2)
        cv2.drawMarker(ov, (int(cx * w), int(cy * h)), (0, 255, 0), cv2.MARKER_CROSS, max(20, w // 25), max(2, w // 300))
        if platform != 'none':
            cv2.rectangle(ov, (0, 0), (w, int(sz['top'] * h)), (0, 0, 255), 2); cv2.rectangle(ov, (0, int((1 - sz['bottom']) * h)), (w, h), (0, 0, 255), 2)
        notan = np.where(L < .4, 30, np.where(L < .7, 128, 230)).astype(np.uint8)
        th = cv2.resize(cv2.cvtColor(notan, cv2.COLOR_GRAY2BGR), (w // 4, h // 4))
        ov[h - th.shape[0]:, w - th.shape[1]:] = th
        cv2.imwrite(str(overlay), ov)
        out['overlay'] = str(overlay)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('files', nargs='+')
    ap.add_argument('--overlay'); ap.add_argument('--aspect'); ap.add_argument('--platform', default='none', choices=list(SAFE))
    ap.add_argument('--csv')
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')
    rows = [analyze(f, a.aspect, a.platform, a.overlay if len(a.files) == 1 else None) for f in a.files]
    if a.csv:
        flat = [{'file': r['file'], 'w': r['width'], 'h': r['height'], 'key': r['value']['key'], 'rms_contrast': r['value']['rms_contrast'],
                 'mean_chroma': r['color']['mean_chroma'], 'hue_spread': r['color']['hue_spread_deg'], 'harmony': r['color']['harmony_guess'],
                 'focal_x': r['saliency_peaks'][0]['x'] if r['saliency_peaks'] else '', 'focal_y': r['saliency_peaks'][0]['y'] if r['saliency_peaks'] else '',
                 'balance_offset': r['balance']['offset_from_centre'], 'focal_vs_bg_sharp': r.get('sharpness', {}).get('focal_vs_background', '')} for r in rows]
        with open(a.csv, 'w', newline='', encoding='utf-8') as fh:
            wr = csv.DictWriter(fh, list(flat[0])); wr.writeheader(); wr.writerows(flat)
        print('wrote', a.csv)
    else:
        print(json.dumps(rows[0] if len(rows) == 1 else rows, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
