#!/bin/bash
# FLUX text-to-image, 2 seeds per slide -> raw/0N-1.png, raw/0N-2.png
cd /c/timeoptic-content
K=carousel/kits/2026-11-14_umbrella-story
STY="A detailed soft charcoal and graphite pencil drawing on warm beige textured sketch paper, smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper."
P1="A small city bus stop shelter in heavy rain, slanted rain lines and puddles. The left person, in a hoodie, stands under the shelter edge with no umbrella, hugging their own arms, looking out at the rain. The right person, in a long coat, has just stepped closer holding a large open black umbrella, tilting it toward the left person, offering to share."
P2="Two people walking together along a wet city sidewalk in the rain under one large black umbrella, seen from behind at a three-quarter angle. The umbrella is tilted far over the left person in a hoodie, so the right person in a long coat has one shoulder out in the rain, coat shoulder dark and wet. Reflections in puddles, rain lines."
P3="A cozy small room with a window showing rain. The right person, in a long coat draped like a blanket, sits on a sofa wrapped in a thick blanket, sick, holding a tissue, a bit hunched. The left person, in a hoodie, stands beside them holding out a steaming bowl of soup with both hands. A small table with a mug and tissues."
P4="The same small city bus stop shelter in the rain, a few days later. Now the left person in a hoodie holds a large open umbrella high over the right person in a long coat, who looks up at the umbrella surprised, one hand raised. The left person carries a second folded umbrella under their arm. Puddles and rain lines."
P5="After the rain, two people walking away side by side down a long wet street toward soft sunlight breaking through clouds, seen from behind. Each holds a closed umbrella hanging down, and their free hands are close together. Glittering puddles, gentle light rays, a faint rainbow arc low over distant rooftops."
for i in 1 2 3 4 5; do
  v="P$i"
  python tools/flux.py "${!v} $STY" $K/raw/0$i.png --count 2 --seed $((100*i))
done
# Slide 4 redo (used 04b-3, seed 412):
# python tools/flux.py "A small city bus stop with a simple shelter post in the rain, puddles and slanted rain lines. On the left, a person wearing a hooded sweatshirt raises one arm high, gripping the handle of a large open black umbrella, holding it over the head of the person on the right. On the right, a person in a long buttoned coat with empty hands looks up at the umbrella, surprised and touched, both hands near their chest. Both people stand close together, full bodies visible, in the lower part of the picture. $STY" $K/raw/04b.png --count 3 --seed 410
