#!/bin/bash
# FLUX text-to-image for every kit made by 2026-11-16.mjs: 2 seeds per slide -> raw/0N-1.png, raw/0N-2.png
# Skips images that already exist, so it can be re-run after a stop.
#   bash carousel/stories/gen.sh [kit-glob]   (default: all 2026-11-16_* kits)
cd /c/timeoptic-content
for K in carousel/kits/${1:-2026-11-1[678]_*}/; do
  K=${K%/}; [ -f "$K/prompts.txt" ] || continue
  seedbase=$(( 10#$(basename "$K" | cut -d_ -f2 | cut -d- -f1) * 1000 ))
  while IFS=$'\t' read -r n p; do
    [ -f "$K/raw/$n-2.png" ] && continue
    python tools/flux.py "$p" "$K/raw/$n.png" --count 2 --seed $(( seedbase + 10#$n * 10 )) </dev/null
  done < "$K/prompts.txt"
done
echo ALL DONE
