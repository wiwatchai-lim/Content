#!/usr/bin/env bash
# Hua Hin Thai promo: write + render hf/ over a background cut from AI clips, lay the voice (audio/voice.wav) on top.
#   ./make.sh      v1: clips from D:/timeoptic-content/ดาวน์โหลด (build_bg.py)    -> export/huahin-promo_th.mp4
#   ./make.sh v2   v2: clips from C:/timeoptic-content/Video-Edit (build_bg_v2.py) -> export/huahin-promo_th_v2.mp4
# No music: the user adds it later.
set -e; cd "$(dirname "$0")"
V=${1:-}; BG=bg${V:+-$V}.mp4; OUT=export/huahin-promo_th${V:+_$V}.mp4
[ -f hf/assets/$BG ] || python build_bg${V:+_$V}.py
python build_html.py $BG
(cd hf && npx --yes hyperframes@0.8.59 render -o ../export/_silent.mp4 --quiet >/dev/null 2>&1)
ffmpeg -y -loglevel error -i export/_silent.mp4 -i audio/voice.wav -filter_complex "[1:a]volume=2dB,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest $OUT
rm export/_silent.mp4; echo $OUT
