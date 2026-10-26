"""Look at a video before removing spots: size, fps, shot cuts, a timestamped contact sheet, and gridded full-size frames.

usage: python inspect_video.py in.mp4 out_dir [--every 0.25] [--at 0.5,2.0,7.5] [--crop x,y,w,h]
  out_dir/sheet.jpg      every --every seconds, timestamp on each tile (find which shots have spots)
  out_dir/at_<t>.png     full-resolution frame at each --at time with a 100 px grid and pixel labels (read x, y, w, h)
  --crop limits the gridded frames to a region (pixels of the real video) so small spots are easy to read.
Prints the shot cuts, ready to use as track "from"/"to" boundaries.
"""
import argparse
import os
import subprocess

import cv2
import numpy as np


def cuts(path):
    r = subprocess.run(["ffmpeg", "-i", path, "-vf", "select='gt(scene,0.2)',showinfo", "-an", "-f", "null", "-"],
                       capture_output=True, text=True)
    return [float(x.split("pts_time:")[1].split()[0]) for x in r.stderr.splitlines() if "pts_time:" in x]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("out")
    ap.add_argument("--every", type=float, default=0.25)
    ap.add_argument("--at", default="")
    ap.add_argument("--crop", default="")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    cap = cv2.VideoCapture(a.video)
    fps, n = cap.get(cv2.CAP_PROP_FPS), int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w, h = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    c = cuts(a.video)
    print(f"{w}x{h}, {fps:g} fps, {n} frames, {n / fps:.2f} s")
    print("shots (s):", " | ".join(f"{s:.3f}-{e:.3f}" for s, e in zip([0.0] + c, c + [n / fps])))

    tiles, step = [], max(1, round(a.every * fps))
    for i in range(0, n, step):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ok, f = cap.read()
        if not ok:
            break
        t = cv2.resize(f, (240, round(240 * h / w)))
        cv2.putText(t, f"{i / fps:.2f}", (6, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 4)
        cv2.putText(t, f"{i / fps:.2f}", (6, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        tiles.append(t)
    cols = 8
    rows = [np.hstack(tiles[k:k + cols] + [np.zeros_like(tiles[0])] * (cols - len(tiles[k:k + cols]))) for k in range(0, len(tiles), cols)]
    cv2.imwrite(os.path.join(a.out, "sheet.jpg"), np.vstack(rows))

    x0, y0, cw, ch = map(int, a.crop.split(",")) if a.crop else (0, 0, w, h)
    for t in filter(None, a.at.split(",")):
        cap.set(cv2.CAP_PROP_POS_FRAMES, round(float(t) * fps))
        ok, f = cap.read()
        if not ok:
            continue
        g = f[y0:y0 + ch, x0:x0 + cw].copy()
        for gx in range(-(x0 % 100), cw, 100):
            cv2.line(g, (gx, 0), (gx, ch), (255, 255, 0), 1)
            cv2.putText(g, str(x0 + gx), (gx + 2, 14), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 0), 1)
        for gy in range(-(y0 % 100), ch, 100):
            cv2.line(g, (0, gy), (cw, gy), (255, 255, 0), 1)
            cv2.putText(g, str(y0 + gy), (2, gy - 3), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 0), 1)
        cv2.imwrite(os.path.join(a.out, f"at_{float(t):.2f}.png"), g)
    print("wrote", a.out)


if __name__ == "__main__":
    main()
