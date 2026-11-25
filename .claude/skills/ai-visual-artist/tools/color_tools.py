"""Colour maths for the ai-visual-artist skill (no dependencies beyond NumPy).

  python color_tools.py info "#123A29"                       # RGB, HSL, HSV, CIELAB (D65), OKLab, OKLCH
  python color_tools.py contrast "#FAFAFA" "#123A29"          # WCAG 2.x contrast ratio + AA/AAA verdicts
  python color_tools.py harmony "#123A29" complementary       # generate in OKLCH: complementary | analogous | triadic | split | tetradic | mono
  python color_tools.py cvd "#C0392B" "#27AE60"               # how two colours look under protan/deutan/tritan (Machado et al. 2009 matrices)
  python color_tools.py palette pal.brand_timeoptic           # check a library palette (contrast table + CVD distinctness)

Formulas: sRGB transfer + WCAG relative luminance (W3C_WCAG21); CIELAB via XYZ D65 (CIE 15); OKLab/OKLCH (Ottosson2020,
CSS Color 4); ΔE in OKLab (Euclidean, ×100) as a perceptual distance; CVD simulation with Machado, Oliveira &
Fernandes 2009 severity-1.0 matrices applied in linear RGB.
"""
import json
import math
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent


def hex_to_rgb(h):
    h = h.strip().lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def rgb_to_hex(rgb):
    return '#' + ''.join(f'{max(0, min(255, round(c * 255))):02X}' for c in rgb)


def lin(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def delin(c):
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def luminance(h):
    r, g, b = (lin(c) for c in hex_to_rgb(h))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def wcag(ratio):
    return {'AA_text': ratio >= 4.5, 'AAA_text': ratio >= 7, 'AA_large_text': ratio >= 3, 'non_text_UI': ratio >= 3}


def rgb_to_hsl(rgb):
    r, g, b = rgb; mx, mn = max(rgb), min(rgb); l = (mx + mn) / 2; d = mx - mn
    if d == 0:
        return 0.0, 0.0, l
    s = d / (1 - abs(2 * l - 1))
    h = ((g - b) / d % 6) if mx == r else ((b - r) / d + 2) if mx == g else ((r - g) / d + 4)
    return h * 60, s, l


def rgb_to_hsv(rgb):
    r, g, b = rgb; mx, mn = max(rgb), min(rgb); d = mx - mn
    h = 0 if d == 0 else (((g - b) / d % 6) if mx == r else ((b - r) / d + 2) if mx == g else ((r - g) / d + 4)) * 60
    return h, (0 if mx == 0 else d / mx), mx


def rgb_to_xyz(rgb):
    r, g, b = (lin(c) for c in rgb)
    return (0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
            0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
            0.0193339 * r + 0.1191920 * g + 0.9503041 * b)


def xyz_to_lab(xyz):
    wx, wy, wz = 0.95047, 1.0, 1.08883
    f = lambda t: t ** (1 / 3) if t > (6 / 29) ** 3 else t / (3 * (6 / 29) ** 2) + 4 / 29
    fx, fy, fz = f(xyz[0] / wx), f(xyz[1] / wy), f(xyz[2] / wz)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)


def rgb_to_oklab(rgb):
    r, g, b = (lin(c) for c in rgb)
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l, m, s = (math.copysign(abs(v) ** (1 / 3), v) for v in (l, m, s))
    return (0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s)


def oklab_to_rgb(lab):
    L, a, b = lab
    l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return tuple(delin(max(0.0, min(1.0, c))) for c in (r, g, bb))


def oklch(h):
    L, a, b = rgb_to_oklab(hex_to_rgb(h))
    return L, math.hypot(a, b), math.degrees(math.atan2(b, a)) % 360


def from_oklch(L, C, H):
    return rgb_to_hex(oklab_to_rgb((L, C * math.cos(math.radians(H)), C * math.sin(math.radians(H)))))


def ok_distance(a, b):
    p, q = rgb_to_oklab(hex_to_rgb(a)), rgb_to_oklab(hex_to_rgb(b))
    return 100 * math.dist(p, q)


def harmony(base, kind):
    L, C, H = oklch(base)
    offs = {'complementary': [180], 'analogous': [-30, 30], 'triadic': [120, 240], 'split': [150, 210], 'tetradic': [90, 180, 270]}
    if kind == 'mono':
        return [from_oklch(min(.97, max(.15, L + d)), C * (1 - abs(d)), H) for d in (-.3, -.15, 0, .15, .3)]
    return [base.upper()] + [from_oklch(L, C, (H + o) % 360) for o in offs[kind]]


CVD = {   # Machado, Oliveira & Fernandes 2009, severity 1.0, linear RGB
    'protan': [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
    'deutan': [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
    'tritan': [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
}


def simulate(h, kind):
    v = [lin(c) for c in hex_to_rgb(h)]
    m = CVD[kind]
    out = [sum(m[i][j] * v[j] for j in range(3)) for i in range(3)]
    return rgb_to_hex([delin(max(0, min(1, c))) for c in out])


def info(h):
    rgb = hex_to_rgb(h)
    hs, ss, ls = rgb_to_hsl(rgb); hv, sv, vv = rgb_to_hsv(rgb)
    L, a, b = xyz_to_lab(rgb_to_xyz(rgb)); oL, oa, ob = rgb_to_oklab(rgb); _, C, H = oklch(h)
    return {'hex': h.upper(), 'rgb': [round(c * 255) for c in rgb], 'hsl': [round(hs, 1), round(ss * 100, 1), round(ls * 100, 1)],
            'hsv': [round(hv, 1), round(sv * 100, 1), round(vv * 100, 1)], 'cielab_d65': [round(L, 2), round(a, 2), round(b, 2)],
            'oklab': [round(oL, 4), round(oa, 4), round(ob, 4)], 'oklch': [round(oL, 4), round(C, 4), round(H, 1)],
            'relative_luminance': round(luminance(h), 4), 'contrast_vs_white': round(contrast(h, '#FFFFFF'), 2), 'contrast_vs_black': round(contrast(h, '#000000'), 2)}


def check_palette(p):
    cols = {c['role'] + ':' + c['hex']: c['hex'] for c in p['colors']}
    bg = p['background']; rows = []
    for k, v in cols.items():
        if v != bg:
            r = contrast(v, bg); rows.append({'color': k, 'on_background': round(r, 2), **wcag(r)})
    worst = []
    hexes = [c['hex'] for c in p['colors']]
    for kind in ('protan', 'deutan'):
        sims = [simulate(x, kind) for x in hexes]
        dmin = min((ok_distance(sims[i], sims[j]), hexes[i], hexes[j]) for i in range(len(sims)) for j in range(i + 1, len(sims))) if len(sims) > 1 else (99, '', '')
        worst.append({'cvd': kind, 'closest_pair': [dmin[1], dmin[2]], 'ok_distance': round(dmin[0], 1), 'distinct': dmin[0] >= 8})
    return {'id': p['id'], 'contrast': rows, 'cvd': worst}


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    a = sys.argv[1:]
    if not a:
        print(__doc__); return
    cmd = a[0]
    if cmd == 'info':
        print(json.dumps(info(a[1]), indent=1))
    elif cmd == 'contrast':
        r = contrast(a[1], a[2]); print(json.dumps({'ratio': round(r, 2), **wcag(r)}))
    elif cmd == 'harmony':
        print(json.dumps(harmony(a[1], a[2])))
    elif cmd == 'cvd':
        out = {k: [simulate(x, k) for x in a[1:]] for k in CVD}
        if len(a) == 3:
            out['ok_distance'] = {k: round(ok_distance(*v), 1) for k, v in out.items()}
            out['ok_distance']['normal'] = round(ok_distance(a[1], a[2]), 1)
        print(json.dumps(out, indent=1))
    elif cmd == 'palette':
        lib = json.loads((SKILL / 'COLOR_PALETTE_LIBRARY.json').read_text(encoding='utf-8'))
        p = next(x for x in lib['palettes'] if x['id'] == a[1])
        print(json.dumps(check_palette(p), indent=1, ensure_ascii=False))


if __name__ == '__main__':
    main()
