"""Six-view inspection sheet + checks: the way an art director squints at a picture.

  python inspect_views.py image.png                     # writes image_views.jpg next to it + prints JSON checks
  python inspect_views.py image.png --out sheet.jpg --focal 0.5,0.4   # give the intended focal point (normalised x,y)
  python inspect_views.py a.png b.png --json report.json
  python inspect_views.py slide.png --style lineart          # charcoal/pencil carousels (paper-white by design)

Views (one 3x2 contact sheet):
 1 original colour   2 grayscale (OKLab L, perceptual)   3 thumbnail (64 px wide, blown up: does it still read?)
 4 silhouette / notan (2-value Otsu + 3-value bands)     5 edges & local contrast (where the eye is pulled)
 6 technical (clipped highlights red, crushed shadows blue, thirds/centre lines, saliency peaks)

Checks are indicators, not verdicts. Thresholds marked DERIVED are this studio's working values, not science; they come
from the value/notan and perception research in creative-intelligence/knowledge/visual-arts/ and from our own tests.
Saliency is a model prediction of where attention MAY go, never a substitute for real eye-tracking [Itti1998].
"""
import argparse
import json
import math
import sys
from pathlib import Path

import cv2
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
from analyze_image import to_oklab_img, saliency, peaks  # noqa: E402

CELL = 480
# DERIVED thresholds per look. 'lineart' calibrated on approved charcoal story carousels (thumbnail L std 0.09-0.12 on
# 26 published slides; < 0.08 = drawing too faint, VALUE_AND_NOTAN.md section 5) - these are mostly paper white by design.
TH = {'painted': {'thumb_std': .12, 'span': .45, 'dominant_band': .4},
      'lineart': {'thumb_std': .08, 'span': .35, 'dominant_band': .6}}


def _fit(img, w=CELL):
    h = int(img.shape[0] * w / img.shape[1])
    return cv2.resize(img, (w, h), interpolation=cv2.INTER_AREA)


def _label(img, text):
    out = img.copy()
    cv2.rectangle(out, (0, 0), (out.shape[1], 26), (0, 0, 0), -1)
    cv2.putText(out, text, (8, 19), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (255, 255, 255), 1, cv2.LINE_AA)
    return out


def _roi_mask(h, w, fx, fy, r=0.12):
    m = np.zeros((h, w), bool)
    rr = int(r * min(h, w))
    cx, cy = int(fx * w), int(fy * h)
    m[max(0, cy - rr):cy + rr, max(0, cx - rr):cx + rr] = True
    return m


def inspect(path, out=None, focal=None, style='painted'):
    th_ = TH[style]
    img = cv2.imread(str(path), cv2.IMREAD_UNCHANGED)
    if img is None:
        raise SystemExit(f'cannot read {path}')
    alpha = img[..., 3] if img.ndim == 3 and img.shape[2] == 4 else None
    if img.ndim == 2:
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    img = img[..., :3]
    h, w = img.shape[:2]
    lab, lin = to_oklab_img(img)
    L = np.clip(lab[..., 0], 0, 1)
    Y = lin @ np.array([0.2126, 0.7152, 0.0722])
    g8 = (L * 255).astype(np.uint8)

    # 2 grayscale
    gray = cv2.cvtColor(g8, cv2.COLOR_GRAY2BGR)
    # 3 thumbnail
    tw = 64; th = max(1, int(h * tw / w))
    thumb_small = cv2.resize(img, (tw, th), interpolation=cv2.INTER_AREA)
    thumb = cv2.resize(thumb_small, (w, h), interpolation=cv2.INTER_NEAREST)
    # 4 silhouette / notan
    if alpha is not None:
        sil2 = np.where(alpha > 127, 0, 255).astype(np.uint8)
    else:
        _, sil2 = cv2.threshold(cv2.GaussianBlur(g8, (0, 0), max(1, w / 300)), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    notan3 = np.where(L < .4, 30, np.where(L < .7, 128, 230)).astype(np.uint8)
    sil_view = np.hstack([sil2[:, : w // 2], notan3[:, w // 2:]])
    sil_view = cv2.cvtColor(sil_view, cv2.COLOR_GRAY2BGR)
    cv2.line(sil_view, (w // 2, 0), (w // 2, h), (0, 0, 255), max(1, w // 400))
    # 5 edges & local contrast
    edges = cv2.Canny(g8, 60, 140)
    k = max(3, int(w / 40)) | 1
    mean = cv2.blur(L.astype(np.float32), (k, k)); sq = cv2.blur((L * L).astype(np.float32), (k, k))
    lc = np.sqrt(np.maximum(sq - mean * mean, 0))
    lc_n = (lc / (lc.max() + 1e-9) * 255).astype(np.uint8)
    edge_view = cv2.applyColorMap(lc_n, cv2.COLORMAP_INFERNO)
    edge_view[edges > 0] = (255, 255, 255)
    # 6 technical
    sal = saliency(img); pk = peaks(sal)
    tech = (img * 0.55).astype(np.uint8)
    tech[Y > .985] = (0, 0, 255); tech[Y < .002] = (255, 80, 0)
    lw = max(1, w // 500)
    for gx in (1 / 3, 2 / 3):
        cv2.line(tech, (int(gx * w), 0), (int(gx * w), h), (200, 200, 200), lw)
        cv2.line(tech, (0, int(gx * h)), (w, int(gx * h)), (200, 200, 200), lw)
    cv2.line(tech, (w // 2, 0), (w // 2, h), (0, 200, 255), lw); cv2.line(tech, (0, h // 2), (w, h // 2), (0, 200, 255), lw)
    for i, p in enumerate(pk):
        cv2.circle(tech, (int(p['x'] * w), int(p['y'] * h)), max(8, w // 30), (0, 255, 0), max(2, w // 250))
        cv2.putText(tech, str(i + 1), (int(p['x'] * w) + 10, int(p['y'] * h) - 10), cv2.FONT_HERSHEY_SIMPLEX, max(.6, w / 900), (0, 255, 0), 2)

    views = [('1 colour', img), ('2 grayscale (OKLab L)', gray), ('3 thumbnail 64px', thumb),
             ('4 silhouette | notan-3', sil_view), ('5 edges + local contrast', edge_view), ('6 technical: clip/grid/saliency', tech)]
    cells = [_label(_fit(v), t) for t, v in views]
    ch = max(c.shape[0] for c in cells)
    cells = [cv2.copyMakeBorder(c, 0, ch - c.shape[0], 0, 0, cv2.BORDER_CONSTANT, value=(40, 40, 40)) for c in cells]
    sheet = np.vstack([np.hstack(cells[:3]), np.hstack(cells[3:])])
    out = Path(out) if out else Path(path).with_name(Path(path).stem + '_views.jpg')
    cv2.imwrite(str(out), sheet, [cv2.IMWRITE_JPEG_QUALITY, 88])

    # ---- checks ----
    fx, fy = focal if focal else ((pk[0]['x'], pk[0]['y']) if pk else (.5, .5))
    roi = _roi_mask(h, w, fx, fy)
    p2, p98 = np.percentile(L, [2, 98])
    bands = [float((L < .4).mean()), float(((L >= .4) & (L < .7)).mean()), float((L >= .7).mean())]
    lc_focal, lc_rest = float(lc[roi].mean()), float(lc[~roi].mean())
    ed_focal, ed_rest = float((edges[roi] > 0).mean()), float((edges[~roi] > 0).mean())
    tL = cv2.cvtColor(thumb_small, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    sil_fill = float((sil2 == 0).mean()) if alpha is not None else float(min((sil2 == 0).mean(), (sil2 > 0).mean()))
    sf, so = float(sal[roi].max()), float(sal[~roi].max())
    s1 = pk[0]['strength'] if pk else 0; s2 = pk[1]['strength'] if len(pk) > 1 else 0
    checks = {
        'focal_point': ({'used': [round(fx, 3), round(fy, 3)], 'source': 'given',
                         'saliency_focal_vs_strongest_elsewhere': round(sf / (so + 1e-9), 2),
                         'ok': bool(sf >= so), 'rule': 'DERIVED: the intended focal area should hold the strongest predicted saliency; if not, something else steals the eye'}
                        if focal else
                        {'used': [round(fx, 3), round(fy, 3)], 'source': 'saliency peak 1 (model)',
                         'saliency_peak1_vs_peak2': round(s1 / (s2 + 1e-9), 2),
                         'ok': bool(s1 / (s2 + 1e-9) >= 1.15), 'rule': 'DERIVED: peak 1 should beat peak 2 by >=15% or two things compete; pass --focal to test the intended point'}),
        'value_range': {'L_p2_p98': [round(float(p2), 3), round(float(p98), 3)], 'span': round(float(p98 - p2), 3),
                        'ok': bool(p98 - p2 >= th_['span']), 'rule': 'DERIVED: span < 0.45 OKLab L reads flat/foggy (fine only if intended, e.g. mist)'},
        'value_grouping': {'notan3_pct_dark_mid_light': [round(100 * b, 1) for b in bands],
                           'ok': bool(max(bands) >= th_['dominant_band']), 'rule': 'CRAFT: one value family should dominate (~40%+); three equal bands read busy'},
        'focal_contrast': {'local_contrast_focal_vs_rest': round(lc_focal / (lc_rest + 1e-9), 2), 'edge_density_focal_vs_rest': round(ed_focal / (ed_rest + 1e-9), 2),
                           'ok': bool(lc_focal >= lc_rest * 1.2), 'rule': 'CRAFT+EVIDENCE: strongest contrast/edges belong at the focal point (contrast drives bottom-up saliency)'},
        'thumbnail_readability': {'thumb_L_std': round(float(tL.std()), 3), 'ok': bool(tL.std() >= th_['thumb_std']),
                                  'rule': 'DERIVED: at 64 px the big shapes must still separate (gist is read from coarse structure)'},
        'silhouette': {'fill_pct': round(100 * sil_fill, 1), 'source': 'alpha' if alpha is not None else 'Otsu on L, smaller of the two masses',
                       'ok': bool(.08 <= sil_fill <= .85), 'rule': 'DERIVED: subject mass 8-85% of frame; outside that the silhouette is a speck or a wall'},
        'technical': {'clipped_highlights_pct': round(100 * float((Y > .985).mean()), 2), 'crushed_shadows_pct': round(100 * float((Y < .002).mean()), 2),
                      'ok': bool((Y > .985).mean() < .02 and (Y < .002).mean() < .05), 'rule': 'DERIVED: <2% clipped, <5% crushed unless it is a deliberate style'},
    }
    flags = [k for k, v in checks.items() if not v['ok']]
    return {'file': str(path), 'style': style, 'sheet': str(out), 'size': [w, h], 'checks': checks, 'flags': flags,
            'note': 'Indicators only. Perspective, anatomy, material truth, emotion and text legibility need a human/AI look at the sheet.'}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('files', nargs='+'); ap.add_argument('--out'); ap.add_argument('--json')
    ap.add_argument('--focal', help='intended focal point x,y (0-1)')
    ap.add_argument('--style', default='painted', choices=list(TH), help='threshold set: painted/photo (default) or lineart (charcoal/pencil on paper)')
    a = ap.parse_args()
    foc = tuple(float(v) for v in a.focal.split(',')) if a.focal else None
    res = [inspect(f, a.out if len(a.files) == 1 else None, foc, a.style) for f in a.files]
    txt = json.dumps(res if len(res) > 1 else res[0], indent=1, ensure_ascii=False)
    if a.json:
        Path(a.json).write_text(txt, encoding='utf-8')
    print(txt)


if __name__ == '__main__':
    main()
