"""Remove small unwanted spots (e.g. a rivet the AI added to a frame) from a video: each spot is tracked with
template matching inside its shot, an ellipse over it is inpainted from its surroundings, and the audio is copied.

usage: python remove_spots.py in.mp4 out.mp4 tracks.json [debug.jpg]
tracks.json: a list with one entry per spot per shot, times in seconds, pixels in the real video size:
  {"from": 0.0, "to": 1.9, "seed": 0.0, "x": 698, "y": 962, "w": 46, "h": 24, "note": "right end piece"}
  The spot must sit at (x, y) at time "seed"; it is followed forward to "to" and back to "from".
  Keep each track inside one shot (inspect_video.py lists the cuts). End it where the spot leaves the frame or is hidden.
  The older list form [first_frame, last_frame, seed_frame, x, y, w, h] also works.
Pass debug.jpg to only write a sheet of every 6th frame with the masks in red, to check the tracking before rendering.
"""
import json, subprocess, sys, cv2, numpy as np

def track(gray, f0, f1, cx, cy, w, h, seed):
    """Follow the patch forward and backward from the seed frame; returns {frame: (cx, cy)}."""
    pos = {seed: (cx, cy)}
    for step, rng in ((1, range(seed + 1, f1 + 1)), (-1, range(seed - 1, f0 - 1, -1))):
        x, y = cx, cy
        tpl = gray[seed][y - h // 2 - 6:y + h // 2 + 6, x - w // 2 - 6:x + w // 2 + 6]
        for i in rng:
            R = 50
            x0, y0 = max(0, x - w // 2 - 6 - R), max(0, y - h // 2 - 6 - R)
            win = gray[i][y0:y0 + tpl.shape[0] + 2 * R, x0:x0 + tpl.shape[1] + 2 * R]
            res = cv2.matchTemplate(win, tpl, cv2.TM_CCOEFF_NORMED)
            _, _, _, (mx, my) = cv2.minMaxLoc(res)
            x, y = x0 + mx + tpl.shape[1] // 2, y0 + my + tpl.shape[0] // 2
            pos[i] = (x, y)
            tpl = gray[i][y - h // 2 - 6:y + h // 2 + 6, x - w // 2 - 6:x + w // 2 + 6]
    return pos

src, dst = sys.argv[1], sys.argv[2]
fps = cv2.VideoCapture(src).get(cv2.CAP_PROP_FPS)
TRACKS = [t if isinstance(t, list) else [round(t["from"] * fps), round(t["to"] * fps), round(t["seed"] * fps), t["x"], t["y"], t["w"], t["h"]]
          for t in json.loads(open(sys.argv[3], encoding="utf-8").read())]
cap = cv2.VideoCapture(src)
frames = []
while True:
    ok, f = cap.read()
    if not ok: break
    frames.append(f)
gray = [cv2.cvtColor(f, cv2.COLOR_BGR2GRAY) for f in frames]
H, W = gray[0].shape
masks = [np.zeros((H, W), np.uint8) for _ in frames]
for f0, f1, seed, cx, cy, w, h in TRACKS:
    f1 = min(f1, len(frames) - 1)
    for i, (x, y) in track(gray, f0, f1, cx, cy, w, h, seed).items():
        cv2.ellipse(masks[i], (int(x), int(y)), (int(w * 0.75), int(h * 0.8)), 0, 0, 360, 255, -1)
if len(sys.argv) > 4:   # debug sheet: every 6th frame with the masks in red
    tiles = []
    for i in range(0, len(frames), 6):
        o = frames[i].copy(); o[masks[i] > 0] = (0, 0, 255)
        cv2.putText(o, f"{i / fps:.2f}", (20, 560), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 4)
        tiles.append(cv2.resize(o[500:1300], (270, 200)))
    rows = [np.hstack(tiles[k:k + 8] + [np.zeros_like(tiles[0])] * (8 - len(tiles[k:k + 8]))) for k in range(0, len(tiles), 8)]
    cv2.imwrite(sys.argv[4], np.vstack(rows))
    sys.exit()
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", str(fps), "-i", "-",
                       "-i", src, "-map", "0:v", "-map", "1:a?", "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p",
                       "-c:a", "copy", "-shortest", dst], stdin=subprocess.PIPE)
for f, m in zip(frames, masks):
    if m.any():
        f = cv2.inpaint(f, m, 9, cv2.INPAINT_TELEA)
    ff.stdin.write(f.tobytes())
ff.stdin.close(); ff.wait()
print("done", len(frames))
