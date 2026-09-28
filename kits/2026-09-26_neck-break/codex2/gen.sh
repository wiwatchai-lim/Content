#!/usr/bin/env bash
# Codex stills of the second staff member (consent given 2026-09-26) in each neck-break pose, one image_gen call each.
# bash kits/2026-09-26_neck-break/codex/gen.sh [pose ...]   (default: all poses; skips poses already in codex/)
# Each finished image is copied from ~/.codex/generated_images/<new session>/ to codex/<pose>.png
cd "$(dirname "$0")/../../.." || exit 1
OUT=kits/2026-09-26_neck-break/codex2
REF=$OUT/ref-staff.png
BASE="Photograph of the exact same young woman as in the attached photo: keep her face, eyes, eyebrows, nose, lips and skin tone identical, long straight dark-brown hair with a centre part falling past her shoulders, cream ruffled camisole top with thin straps, small gold pendant necklace. No glasses. Vertical 2:3 portrait, framed from mid-chest up with room above the head, she is centred, facing the camera. Plain soft light sage-grey studio background, soft even front light, natural skin texture, realistic photo, sharp focus. No text, no watermark, no logo. Pose:"
declare -A POSE=(
  [closed]="she faces the camera straight on with a relaxed neutral face and both eyes gently closed."
  [up]="she tilts her head up and looks up toward the ceiling, chin raised, eyes closed, face still turned to the camera."
  [right]="she turns her head to her left (toward the right side of the picture) about 60 degrees, showing her face in three-quarter profile, eyes closed, shoulders still square to the camera."
  [left]="she turns her head to her right (toward the left side of the picture) about 60 degrees, showing her face in three-quarter profile, eyes closed, shoulders still square to the camera."
  [back]="she tilts her head far back, stretching the front of her neck, chin pointing up, eyes closed, shoulders square to the camera."
  [chinright]="she turns her head to her left (toward the right side of the picture) and lowers her chin down toward her left shoulder, a gentle neck stretch, eyes closed."
  [chinleft]="she turns her head to her right (toward the left side of the picture) and lowers her chin down toward her right shoulder, a gentle neck stretch, eyes closed."
  [open]="she faces the camera straight on with her eyes open and a small fresh smile, relaxed and refreshed."
)
POSES=("$@"); [ ${#POSES[@]} -eq 0 ] && POSES=(closed up right left back chinright chinleft open)
for p in "${POSES[@]}"; do
  [ -f "$OUT/$p.png" ] && { echo "$p exists"; continue; }
  before=$(ls ~/.codex/generated_images 2>/dev/null)
  codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" -C "$PWD" --skip-git-repo-check -s workspace-write -o tmp/codex2-$p.txt --image="$REF" \
    "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached image as the reference for the person. Do not rewrite the prompt, do not generate variants, do not inspect or edit the result. Reply with only the saved file path. PROMPT: $BASE ${POSE[$p]}" >/dev/null 2>&1
  new=$(comm -13 <(echo "$before") <(ls ~/.codex/generated_images))
  f=$(ls -t ~/.codex/generated_images/$new/*.png 2>/dev/null | head -1)
  if [ -n "$f" ]; then cp "$f" "$OUT/$p.png"; echo "$p ok"; else echo "$p FAILED: $(tail -c 300 tmp/codex2-$p.txt 2>/dev/null)"; fi
done
