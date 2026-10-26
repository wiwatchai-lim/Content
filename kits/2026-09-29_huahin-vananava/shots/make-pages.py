# Writes one 2.5D depth-parallax page per shot (sN.html), rendered with: npm run video -- kits/<kit>/shots/sN.html
# Shader and seek logic from kits/_template/clip-25d.html. cam = virtual camera offset (uv), zoom > 1 hides the edges.
import cv2
SHOTS = {  # name: (seconds, cam start (x,y), cam end, zoom start, zoom end, focus)
    's1': (5.4, (-0.05, 0.03), (0.05, -0.02), 1.06, 1.20, 0.45),
    's2': (3.0, (-0.05, 0.0), (0.05, 0.0), 1.08, 1.12, 0.5),
    's3': (3.4, (0.0, 0.05), (0.0, -0.03), 1.22, 1.06, 0.45),
    's4': (2.2, (0.07, 0.0), (-0.06, 0.01), 1.08, 1.16, 0.5),
    's5': (2.2, (0.0, -0.05), (0.02, 0.04), 1.10, 1.16, 0.45),
    's6': (2.3, (0.06, 0.0), (-0.05, 0.0), 1.10, 1.14, 0.5),
    's7': (4.2, (-0.02, 0.03), (0.03, -0.02), 1.06, 1.18, 0.5),
    's8': (3.3, (-0.06, 0.0), (0.05, 0.0), 1.10, 1.14, 0.5),
    's9': (3.2, (0.04, 0.02), (-0.04, -0.02), 1.20, 1.05, 0.45),
}
TPL = open('shot.tpl.html', encoding='utf-8').read()
for n, (d, c0, c1, z0, z1, f) in SHOTS.items():
    h, w = cv2.imread(f'{n}.jpg').shape[:2]
    page = TPL
    for k, v in dict(W=w, H=h, DUR=d, IMG=f'{n}.jpg', DEP=f'{n}_depth.png', FOCUS=f, CX0=c0[0], CY0=c0[1],
                     CX1=c1[0], CY1=c1[1], Z0=z0, Z1=z1).items():
        page = page.replace('{{%s}}' % k, str(v))
    open(f'{n}.html', 'w', encoding='utf-8').write(page)
    print(n, w, h, d)
