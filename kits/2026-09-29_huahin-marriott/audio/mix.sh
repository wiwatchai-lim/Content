#!/usr/bin/env bash
# Voice + soft music bed (no footage sound), muxed onto the silent render. Same recipe as huahin-centara.
#   bash audio/mix.sh ["song name" start-sec out-suffix]  ->  export/huahin-marriott_<suffix>.mp4
# Voice lines: audio/fast2/NN.wav (script 2; audio/fast = the first script) = Gemini TTS (gemini-3.1-flash-tts-preview, voice Sulafat), silence trimmed, sped up 1.2x.
#   07 is copied from huahin-centara (same model and voice). 05 is from gemini-2.5-flash-preview-tts (3.1 quota ran out), -3 dB to match. Missing lines are skipped.
set -e
cd "$(dirname "$0")/.."
SONG=${1:-}; [ -n "$SONG" ] || SONG="Echoes of What Could've Been"; M="../../music/$SONG.m4a"; SS=${2:-0}; OUT=${3:-sulafat}
V=audio/fast2
declare -A AT=([01]=300 [02]=5100 [03]=10800 [04]=16300 [05]=20300 [06]=24500 [07]=26900)
IN=(); F=""; L=""; n=0
for k in 01 02 03 04 05 06 07; do
  [ -f $V/$k.wav ] || { echo "missing voice line $k"; continue; }
  n=$((n+1)); IN+=(-i $V/$k.wav)
  F+="[$n:a]adelay=${AT[$k]}:all=1[a$n];"; L+="[a$n]"
done
ffmpeg -v error -y -i "$M" "${IN[@]}" -filter_complex "\
[0:a]atrim=$SS:$(python -c "print($SS+30)"),asetpts=N/SR/TB,aformat=sample_rates=48000:channel_layouts=stereo,equalizer=f=2800:t=q:w=1.2:g=-4,lowpass=f=11000,loudnorm=I=-30:TP=-9,afade=t=in:d=2,afade=t=out:st=27.5:d=2.5[mus];\
$F${L}amix=inputs=$n:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo,highpass=f=70,equalizer=f=200:t=q:w=1:g=1.5,equalizer=f=4000:t=q:w=1.5:g=-1.5,deesser=i=0.3,acompressor=threshold=0.1:ratio=2:attack=15:release=250:makeup=1.3,apad=whole_dur=30,loudnorm=I=-16:TP=-2,atrim=0:30[vo];\
[vo]asplit[vk][vm];[mus][vk]sidechaincompress=threshold=0.06:ratio=2:attack=150:release=900[duck];\
[duck][vm]amix=inputs=2:normalize=0,afade=t=out:st=29.4:d=0.6,alimiter=limit=0.9[a]" -map "[a]" -t 30 audio/mix-$OUT.wav
ffmpeg -v error -y -i export/huahin-marriott.mp4 -i audio/mix-$OUT.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest export/huahin-marriott_$OUT.mp4
echo export/huahin-marriott_$OUT.mp4
