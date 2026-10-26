#!/usr/bin/env bash
# Centara script v4 (user, 2026-10-08), 20 s, same mix as mix-v3.sh: 01-04 new (vo-v4), 05 from vo-v3.
#   bash audio/mix-v4.sh  ->  export/huahin-centara_v4.mp4
set -e
cd "$(dirname "$0")/.."
M="../../music/Echoes of What Could've Been.m4a"
V=audio/vo-v4
TEMPO=${TEMPO:-1.12}
(cd hf-v4 && npx --yes hyperframes@0.8.59 render -o ../export/_v4_silent.mp4 --quiet >/dev/null 2>&1)
ffmpeg -v error -y -i "$M" -i $V/01.wav -i $V/02.wav -i $V/03.wav -i $V/04.wav -i $V/05.wav -filter_complex "\
[0:a]atrim=0:20,asetpts=N/SR/TB,aformat=sample_rates=48000:channel_layouts=stereo,equalizer=f=2800:t=q:w=1.2:g=-4,lowpass=f=11000,loudnorm=I=-30:TP=-9,afade=t=in:d=1.5,afade=t=out:st=18:d=2[mus];\
[1:a]atempo=${TEMPO},adelay=300:all=1[a1];[2:a]atempo=${TEMPO},adelay=4500:all=1[a2];[3:a]atempo=${TEMPO},adelay=8400:all=1[a3];[4:a]atempo=${TEMPO},adelay=13300:all=1[a4];[5:a]atempo=${TEMPO},adelay=16800:all=1[a5];\
[a1][a2][a3][a4][a5]amix=inputs=5:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo,highpass=f=70,equalizer=f=200:t=q:w=1:g=1.5,equalizer=f=4000:t=q:w=1.5:g=-1.5,deesser=i=0.3,acompressor=threshold=0.1:ratio=2:attack=15:release=250:makeup=1.3,aecho=0.9:0.6:28:0.04,apad=whole_dur=20,loudnorm=I=-16:TP=-2,atrim=0:20[vo];\
[vo]asplit[vk][vm];[mus][vk]sidechaincompress=threshold=0.06:ratio=2:attack=150:release=900[duck];\
[duck][vm]amix=inputs=2:normalize=0,afade=t=out:st=19.8:d=0.2,alimiter=limit=0.9[a]" -map "[a]" -t 20 audio/mix-v4.wav
ffmpeg -v error -y -i export/_v4_silent.mp4 -i audio/mix-v4.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest export/huahin-centara_v4.mp4
rm export/_v4_silent.mp4
echo export/huahin-centara_v4.mp4
