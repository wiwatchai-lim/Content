#!/bin/bash
# Glasses-only angle scenes (no gift items). Each run costs ChatGPT quota.
cd /c/timeoptic-content
K=kits/2026-11-11_ferrari-varilux-gift
P=$K/photos
KEEP="Use the attached eyeglasses exactly as they are: rectangular matte black front, clear lenses, matte black temples ending in bright yellow rubber tips, a small yellow prancing-horse shield on the outer temple near the hinge, same shape, proportions and colors. Do not redesign, restyle, recolor or add any parts, logos or text. Show only the eyeglasses: no pouch, cards, booklets or other products. The glasses are the hero, sharp and in focus, physically resting on the surface with a realistic contact shadow (no floating parts)."
STYLE="Square 1:1 luxury eyewear advertising photograph, cinematic, dark and moody, shot on a medium-format camera with a 100mm macro lens, shallow depth of field. No added text, letters or watermarks anywhere. Leave calm dark negative space in the top 18% and bottom 14% of the frame for a logo overlay. Palette: deep black, carbon grey, a single warm yellow accent light echoing the yellow temple tips."
run () { codex exec -m gpt-5.6-luna -c model_reasoning_effort="low" -C "$PWD" --skip-git-repo-check -s workspace-write -i "$2" -o tmp/codex-$1.txt "Call the built-in image_gen tool exactly once with the prompt below, verbatim, using the attached photo as the product reference. Do not rewrite the prompt, do not generate variants, do not inspect or edit the result. Save the image as $K/scenes/$1.png and reply with only the saved file path. PROMPT: $3" < /dev/null > tmp/codex-$1.log 2>&1; }

run angle-front $P/S__27377688.jpg "$STYLE The eyeglasses seen straight from the front at eye level, temples open behind, standing on a glossy black carbon-fibre surface with a soft reflection beneath. Background: dark, with a faint out-of-focus yellow light streak. $KEEP" &
run angle-side-left $P/S__27377686.jpg "$STYLE The eyeglasses in three-quarter view from the left, the yellow shield on the left temple clearly visible, resting on a matte carbon-fibre surface. Low raking yellow rim light from behind draws the edge of the frame and the yellow temple tips. Dark background with soft bokeh. $KEEP" &
run angle-side-right $P/S__27377690.jpg "$STYLE The eyeglasses in three-quarter view from the right, the yellow shield on the right temple clearly visible, resting on the edge of a dark brushed-metal race car part. Background: a dark pit garage out of focus with a few warm yellow lights. $KEEP" &
run angle-folded $P/S__27377683.jpg "$STYLE The eyeglasses with temples folded, seen from the front and slightly above, resting on a woven carbon-fibre surface; the yellow temple tips cross behind the clear lenses. A single warm yellow light streak rakes across the carbon. $KEEP" &
wait
