#!/usr/bin/env bash
# Script v3, palm removed (user, 2026-10-02): ocean footage + its own sound: render hf-ocean-v4, place audio/v2 lines (Gemini 3.1 flash TTS, Sulafat), mix with the palm clip's own sound.
set -e; cd "$(dirname "$0")"; F=../../node_modules/ffmpeg-static/ffmpeg.exe; V=audio/v3
(cd hf-ocean-v4 && npx --yes hyperframes@0.8.59 render -o ../export/_v4_silent.mp4 --quiet >/dev/null 2>&1)
$F -y -loglevel error -i $V/01.wav -i $V/02.wav -i $V/03.wav -i $V/04.wav -i $V/05.wav -i $V/06.wav -filter_complex "[0]volume=2dB,adelay=100:all=1[v0];[1]volume=2dB,adelay=4100:all=1[v1];[2]volume=2dB,adelay=6400:all=1[v2];[3]volume=2dB,adelay=10000:all=1[v3];[4]volume=2dB,adelay=14100:all=1[v4];[5]volume=2dB,adelay=17400:all=1[v5];[v0][v1][v2][v3][v4][v5]amix=inputs=6:normalize=0,apad,atrim=0:20.5" -ar 48000 -ac 2 $V/voice.wav
$F -y -loglevel error -i export/_v4_silent.mp4 -i ../2026-09-26_neck-break/ocean/ocean_long.mp4 -i $V/voice.wav -filter_complex \
  "[1:a]atrim=0:20.5,asetpts=N/SR/TB,volume=12dB,afade=t=in:d=0.5,afade=t=out:st=19.6:d=0.9,aformat=sample_rates=48000:channel_layouts=stereo[bed];[2:a]aformat=sample_rates=48000:channel_layouts=stereo[vo];[vo]asplit[vk][vm];[bed][vk]sidechaincompress=threshold=0.03:ratio=3:attack=20:release=400[duck];[duck][vm]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest export/eye-break-15_ocean_v4_en.mp4
rm export/_v4_silent.mp4; echo export/eye-break-15_ocean_v4_en.mp4
