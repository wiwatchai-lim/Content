#!/usr/bin/env bash
# Voice + soft music bed (no footage sound), muxed onto the silent render.
#   bash audio/mix.sh   ->  export/huahin-centara_sulafat.mp4
# Voice lines: audio/trim31 (Gemini TTS gemini-3.1-flash-tts-preview, voice Sulafat, silence trimmed); audio/fast = same lines sped up 1.2x (user: original felt slow and drawn out).
set -e
cd "$(dirname "$0")/.."
# Music: MUSIC=<file in music/> MSTART=<sec> OUT=<name> bash audio/mix.sh  (default Echoes from 0:00)
DEF="Echoes of What Could've Been.m4a"
M="../../music/${MUSIC:-$DEF}"
SS=${MSTART:-0}
OUT=${OUT:-huahin-centara_sulafat}
V=audio/fast
ffmpeg -v error -y -ss $SS -i "$M" -i $V/01.wav -i $V/02.wav -i $V/03.wav -i $V/04.wav -i $V/07.wav -filter_complex "\
[0:a]atrim=0:30,asetpts=N/SR/TB,aformat=sample_rates=48000:channel_layouts=stereo,equalizer=f=2800:t=q:w=1.2:g=-4,lowpass=f=11000,loudnorm=I=-30:TP=-9,afade=t=in:d=2,afade=t=out:st=27.5:d=2.5[mus];\
[1:a]adelay=500:all=1[a1];[2:a]adelay=6800:all=1[a2];[3:a]adelay=12500:all=1[a3];[4:a]adelay=17400:all=1[a4];[5:a]adelay=26200:all=1[a5];\
[a1][a2][a3][a4][a5]amix=inputs=5:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo,highpass=f=70,equalizer=f=200:t=q:w=1:g=1.5,equalizer=f=4000:t=q:w=1.5:g=-1.5,deesser=i=0.3,acompressor=threshold=0.1:ratio=2:attack=15:release=250:makeup=1.3,aecho=0.9:0.6:28:0.04,apad=whole_dur=30,loudnorm=I=-16:TP=-2,atrim=0:30[vo];\
[vo]asplit[vk][vm];[mus][vk]sidechaincompress=threshold=0.06:ratio=2:attack=150:release=900[duck];\
[duck][vm]amix=inputs=2:normalize=0,afade=t=out:st=29.4:d=0.6,alimiter=limit=0.9[a]" -map "[a]" -t 30 audio/$OUT.wav
ffmpeg -v error -y -i export/huahin-centara.mp4 -i audio/$OUT.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest export/$OUT.mp4
echo export/$OUT.mp4
