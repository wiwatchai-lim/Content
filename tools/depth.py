# Estimate a depth map for an image with Depth Anything V2 (small, ONNX, CPU).
#   python tools/depth.py <image> [out.png]   ->  <image>_depth.png (8-bit grey, white = near)
# The model lives in tools/models/depth-anything-v2-small.onnx; download it with
#   curl -L -o tools/models/depth-anything-v2-small.onnx https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/main/onnx/model.onnx
import sys
from pathlib import Path

import cv2
import numpy as np
import onnxruntime as ort

MODEL = Path(__file__).parent / 'models' / 'depth-anything-v2-small.onnx'
SIZE = 518  # model's native input size, a multiple of 14


def depth(path):
    img = cv2.cvtColor(cv2.imread(str(path)), cv2.COLOR_BGR2RGB)
    h, w = img.shape[:2]
    x = cv2.resize(img, (SIZE, SIZE), interpolation=cv2.INTER_CUBIC).astype(np.float32) / 255
    x = (x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    x = x.transpose(2, 0, 1)[None].astype(np.float32)
    d = ort.InferenceSession(str(MODEL)).run(None, {'pixel_values': x})[0][0]
    d = cv2.resize(d, (w, h), interpolation=cv2.INTER_CUBIC)
    d = (d - d.min()) / (d.max() - d.min())
    # Soften edges a little so the parallax shader doesn't tear thin frame parts.
    d = cv2.bilateralFilter(d.astype(np.float32), 9, 0.1, 5)
    return (d * 255).clip(0, 255).astype(np.uint8)


if __name__ == '__main__':
    src = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else src.with_name(src.stem + '_depth.png')
    cv2.imwrite(str(out), depth(src))
    print(out)
