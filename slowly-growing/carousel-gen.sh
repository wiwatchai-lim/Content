#!/bin/bash
# FLUX 1024x1024 art for the IG carousels: 2 seeds per episode -> episodes/epXX-*/img/square-1.png, square-2.png (skips done ones)
#   bash slowly-growing/carousel-gen.sh
cd /c/timeoptic-content/slowly-growing
node carousel-gen.mjs | grep $'\t' > ../tmp/sg-prompts.txt
n=0
while IFS=$'\t' read -r ep p; do
  n=$((n+1))
  [ -f "$ep/img/square-2.png" ] && continue
  python ../tools/flux.py "$p" "$ep/img/square.png" --count 2 --seed $((n*100)) </dev/null
done < ../tmp/sg-prompts.txt
echo ALL DONE
