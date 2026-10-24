#!/usr/bin/env bash
# Voice + soft music bed (no footage sound), muxed onto the silent render.
#   bash audio/mix.sh   ->  export/huahin-anantara_sulafat.mp4
# Voice lines (script 2, 2026-09-29): audio/vo-n/trim 01-05 + the end line audio/vo-s/trim/06s ("Time Optic. Take care of your vision.").
# Script 1 lines: audio/vo-s/trim (Gemini TTS Sulafat, silence trimmed; 06s = line 6 with the pause after "Time Optic" shortened).
set -e
cd "$(dirname "$0")/.."
M="../../music/Echoes of What Could've Been.m4a"
V=audio/vo-s/trim
N=audio/vo-n/trim
TEMPO=${TEMPO:-1.12}  # voice speed (user: the voice was too slow at 1.0)
ffmpeg -v error -y -i "$M" -i $N/01.wav -i $N/02.wav -i $N/03.wav -i $N/04.wav -i $N/05.wav -i $V/06s.wav -filter_complex "\
[0:a]atrim=0:30,asetpts=N/SR/TB,aformat=sample_rates=48000:channel_layouts=stereo,equalizer=f=2800:t=q:w=1.2:g=-4,lowpass=f=11000,loudnorm=I=-30:TP=-9,afade=t=in:d=2,afade=t=out:st=27.5:d=2.5[mus];\
[1:a]atempo=${TEMPO},adelay=450:all=1[a1];[2:a]atempo=${TEMPO},adelay=5250:all=1[a2];[3:a]atempo=${TEMPO},adelay=9750:all=1[a3];[4:a]atempo=${TEMPO},adelay=14650:all=1[a4];[5:a]atempo=${TEMPO},adelay=21000:all=1[a5];[6:a]atempo=${TEMPO},adelay=25500:all=1[a6];\
[a1][a2][a3][a4][a5][a6]amix=inputs=6:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo,highpass=f=70,equalizer=f=200:t=q:w=1:g=1.5,equalizer=f=4000:t=q:w=1.5:g=-1.5,deesser=i=0.3,acompressor=threshold=0.1:ratio=2:attack=15:release=250:makeup=1.3,aecho=0.9:0.6:28:0.04,apad=whole_dur=30,loudnorm=I=-16:TP=-2,atrim=0:30[vo];\
[vo]asplit[vk][vm];[mus][vk]sidechaincompress=threshold=0.06:ratio=2:attack=150:release=900[duck];\
[duck][vm]amix=inputs=2:normalize=0,afade=t=out:st=29.4:d=0.6,alimiter=limit=0.9[a]" -map "[a]" -t 30 audio/mix-sulafat.wav
ffmpeg -v error -y -i export/huahin-anantara.mp4 -i audio/mix-sulafat.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest export/huahin-anantara_sulafat.mp4
echo export/huahin-anantara_sulafat.mp4
