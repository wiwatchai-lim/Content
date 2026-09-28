#!/usr/bin/env bash
# Smooth head moves for the staff version: Wan 2.2 image-to-video from the Codex stills, one short clip per move.
# bash kits/2026-09-26_neck-break/codex/wan_moves.sh [move ...]   -> codex/wan/<move>.mp4 (skips existing)
cd "$(dirname "$0")/../../.." || exit 1
D=kits/2026-09-26_neck-break/codex; mkdir -p $D/wan
NEG="text, watermark, logo, glasses, extra people, second person, face change, different face, deformed face, distorted eyes, extra limbs, blurry, low quality, jitter, flicker, cuts, camera movement, zoom"
KEEP="Static camera, fixed framing, same woman, same face, same hair and white T-shirt with black sleeves, plain grey studio background, soft light, realistic, smooth slow natural motion."
run() { # move image seconds prompt
  [ -f "$D/wan/$1.mp4" ] && { echo "$1 exists"; return; }
  python tools/wan.py "$D/$2.png" "$4 $KEEP" "$D/wan/$1.mp4" --seconds $3 --size 512x768 --steps 20 --seed 7 --negative "$NEG" 2>&1 | tail -1
}
M=("$@"); [ ${#M[@]} -eq 0 ] && M=(close up right left back chinright chinleft open)
for m in "${M[@]}"; do case $m in
  close) run close open 1.2 "The young woman looks at the camera, then gently closes her eyes and relaxes, keeping her head still." ;;
  up) run up closed 2 "With her eyes closed, the young woman slowly tilts her head up toward the ceiling, holds for a moment, then slowly brings her head back down to face the camera." ;;
  right) run right closed 2 "With her eyes closed, the young woman slowly turns her head toward the right side of the frame, holds, then slowly turns back to face the camera. Her shoulders stay still." ;;
  left) run left closed 2 "With her eyes closed, the young woman slowly turns her head toward the left side of the frame, holds, then slowly turns back to face the camera. Her shoulders stay still." ;;
  back) run back closed 2 "With her eyes closed, the young woman slowly tilts her head far back, stretching her neck, chin up, holds, then slowly returns to face the camera." ;;
  chinright) run chinright closed 2 "With her eyes closed, the young woman slowly turns her head toward the right side of the frame and lowers her chin toward her shoulder in a gentle neck stretch, holds, then slowly comes back to face the camera." ;;
  chinleft) run chinleft closed 2 "With her eyes closed, the young woman slowly turns her head toward the left side of the frame and lowers her chin toward her shoulder in a gentle neck stretch, holds, then slowly comes back to face the camera." ;;
  open) run open closed 2.2 "The young woman slowly opens her eyes, looks at the camera and gives a small fresh smile. Head still." ;;
esac; done
