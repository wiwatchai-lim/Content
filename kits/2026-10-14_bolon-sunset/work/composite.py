# Put the sharp glasses from the original still over the Wan video (Wan keeps the glasses still but renders at 480 px).
#   python composite.py <wan.mp4> <still.png> <depth.png> <out.mp4> <depth_thr> <y_limit> [mask_preview.jpg]
# Mask = depth above depth_thr and above y_limit (still pixels), feathered. Output 1080x1920, same fps.
import subprocess, sys, cv2, numpy as np

wan, still, depth, out, thr, ylim = sys.argv[1:7]
W, H = 1080, 1920
s = cv2.resize(cv2.imread(still), (W, H), interpolation=cv2.INTER_CUBIC)
d = cv2.resize(cv2.imread(depth, 0), (W, H), interpolation=cv2.INTER_CUBIC)
m = (d > int(thr)).astype(np.uint8) * 255
m[round(int(ylim) * H / 1672):] = 0
m = cv2.dilate(m, np.ones((5, 5), np.uint8))
a = cv2.GaussianBlur(m, (0, 0), 3).astype(np.float32)[..., None] / 255
if len(sys.argv) > 7:
    p = s.copy(); p[m > 0] = (p[m > 0] * 0.4 + np.array([0, 0, 255]) * 0.6).astype(np.uint8)
    cv2.imwrite(sys.argv[7], cv2.resize(p, (540, 960)))
cap = cv2.VideoCapture(wan); fps = cap.get(cv2.CAP_PROP_FPS)
ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(fps), '-i', '-',
                       '-c:v', 'libx264', '-crf', '14', '-preset', 'slow', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
n = 0
while True:
    ok, f = cap.read()
    if not ok: break
    f = cv2.resize(f, (W, H), interpolation=cv2.INTER_LANCZOS4).astype(np.float32)
    ff.stdin.write((f * (1 - a) + s * a).astype(np.uint8).tobytes()); n += 1
ff.stdin.close(); ff.wait(); print('done', n)
