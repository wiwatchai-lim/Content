#!/usr/bin/env bash
# Script v2 (user, 2026-10-02): render hf-palm-v2, place audio/v2 lines (Gemini 3.1 flash TTS, Sulafat; 06 reused from huahin-centara), mix with the palm clip's own sound.
set -e; cd "$(dirname "$0")"; F=../../node_modules/ffmpeg-static/ffmpeg.exe; V=audio/v2
(cd hf-palm-v2 && npx --yes hyperframes@0.8.59 render -o ../export/_v2_silent.mp4 --quiet >/dev/null 2>&1)
$F -y -loglevel error -i $V/01.wav -i $V/02.wav -i $V/03.wav -i $V/04.wav -i $V/05.wav -i $V/06.wav -filter_complex "[0]volume=3dB,adelay=200:all=1[a];[1]volume=3dB,adelay=4800:all=1[b];[2]volume=3dB,adelay=6400:all=1[c];[3]volume=3dB,adelay=8000:all=1[d];[4]volume=3dB,adelay=11000:all=1[e];[5]atrim=start=0.2,asetpts=N/SR/TB,aresample=24000,adelay=16500:all=1[f];[a][b][c][d][e][f]amix=inputs=6:normalize=0,apad,atrim=0:20.5" -ar 48000 -ac 2 $V/voice.wav
$F -y -loglevel error -i export/_v2_silent.mp4 -i palm/palm_audio.wav -i $V/voice.wav -filter_complex \
  "[1:a]atrim=0:20.5,asetpts=N/SR/TB,volume=14dB,afade=t=in:d=0.5,afade=t=out:st=19.6:d=0.9,aformat=sample_rates=48000:channel_layouts=stereo[bed];[2:a]aformat=sample_rates=48000:channel_layouts=stereo[vo];[vo]asplit[vk][vm];[bed][vk]sidechaincompress=threshold=0.03:ratio=3:attack=20:release=400[duck];[duck][vm]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest export/eye-break-15_palm_v2_en.mp4
rm export/_v2_silent.mp4; echo export/eye-break-15_palm_v2_en.mp4
