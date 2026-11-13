#!/usr/bin/env bash
# TOMMY 1457 beach-read clip, 20 s: join the clips (build_bg.py), render hf/, lay real sea sound under it
# (audio/sea.m4a = waves recorded with the neck-break crab footage). Nature sound only; the user adds music later.
set -e; cd "$(dirname "$0")"
[ -f hf/assets/bg.mp4 ] || python build_bg.py
(cd hf && npx --yes hyperframes@0.8.59 render -o ../export/_silent.mp4 --quiet >/dev/null 2>&1)
ffmpeg -y -loglevel error -i export/_silent.mp4 -i audio/sea.m4a -filter_complex \
  "[1:a]atrim=3:23,asetpts=N/SR/TB,aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-20:TP=-2:LRA=11,afade=t=in:d=1.0,afade=t=out:st=18.2:d=1.8[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest export/tommy1457-beach-read_20s.mp4
rm export/_silent.mp4; echo export/tommy1457-beach-read_20s.mp4
