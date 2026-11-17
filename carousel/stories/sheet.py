# Contact sheet of a kit's raw FLUX images (rows = slides, cols = seeds) for picking.
#   python carousel/stories/sheet.py carousel/kits/2026-11-16_01-bench out.jpg
import sys, glob, os, cv2, numpy as np
kit, out = sys.argv[1], sys.argv[2]
T = 380
rows = []
for n in range(1, 6):
    cells = []
    for f in sorted(glob.glob(f'{kit}/raw/0{n}*-[0-9].png')):
        im = cv2.resize(cv2.imread(f), (T, T))
        cv2.putText(im, os.path.basename(f)[:-4], (8, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        cells.append(im)
    while len(cells) < 3: cells.append(np.full((T, T, 3), 255, np.uint8))
    rows.append(np.hstack(cells[:3]))
cv2.imwrite(out, np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 85])
