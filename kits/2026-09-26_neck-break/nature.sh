#!/usr/bin/env bash
# Nature versions of the 15-second English neck-break (same overlay and voice as hf-ocean, only the footage and its sound change).
#   bash kits/2026-09-26_neck-break/nature.sh <name> <video 20.5 s+> <nature sound> [sound gain dB]
#   e.g. nature.sh crab crab/crab_slow.mp4 crab/crab_sea_audio.m4a 12  ->  export/neck-break-15_crab_en.mp4
# Sound = the footage's own sound only (no music bed), ducked a little under the voice (audio/en/voice15_ocean.wav, no ticks).
set -e
cd "$(dirname "$0")"
NAME=$1; VIDEO=$2; SOUND=$3; GAIN=${4:-12}
F=../../node_modules/ffmpeg-static/ffmpeg.exe
rm -rf hf-$NAME; cp -r hf-ocean hf-$NAME; rm -f hf-$NAME/assets/ocean.mp4; cp "$VIDEO" hf-$NAME/assets/bg.mp4
sed -i 's#src="assets/ocean.mp4"#src="assets/bg.mp4"#' hf-$NAME/index.html
(cd hf-$NAME && npx --yes hyperframes@0.8.59 render -o ../export/_${NAME}_silent.mp4 --quiet >/dev/null 2>&1)
$F -y -loglevel error -i export/_${NAME}_silent.mp4 -i "$SOUND" -i audio/en/voice15_ocean.wav -filter_complex \
  "[1:a]atrim=0:20.5,asetpts=N/SR/TB,volume=${GAIN}dB,afade=t=in:d=0.5,afade=t=out:st=19.3:d=1.2,aformat=sample_rates=48000:channel_layouts=stereo[bed];[2:a]aformat=sample_rates=48000:channel_layouts=stereo[vo];[vo]asplit[vk][vm];[bed][vk]sidechaincompress=threshold=0.03:ratio=3:attack=20:release=400[duck];[duck][vm]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest export/neck-break-15_${NAME}_en.mp4
rm export/_${NAME}_silent.mp4
echo export/neck-break-15_${NAME}_en.mp4
