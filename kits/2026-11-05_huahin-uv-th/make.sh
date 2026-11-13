#!/usr/bin/env bash
# Hua Hin beach UV tip (Thai): cut the background from the AI clips, write + render hf/, lay the voice on top.
#   audio: tts_all.py (4 requests of 8 cues: p1..p4.wav) -> split.py -> timeline.py -> voice.wav + timing.json
# No music: the user adds it later.
set -e; cd "$(dirname "$0")"; OUT=export/huahin-uv_th_v2.mp4   # v1 (32-cue script): export/huahin-uv_th.mp4, sources in v1/
python build_bg.py
python build_html.py
(cd hf && npx --yes hyperframes@0.8.59 render -o ../export/_silent.mp4 --quiet >/dev/null 2>&1)
ffmpeg -y -loglevel error -i export/_silent.mp4 -i audio/voice.wav -filter_complex "[1:a]volume=2dB,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest $OUT
rm export/_silent.mp4; echo $OUT
