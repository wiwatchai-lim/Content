#!/usr/bin/env bash
# Script v3 on any nature footage (template hf-ocean-v4: punchy start, slow pull-out, deep green end).
#   bash make_v3.sh <name> <video 20.5 s+> <nature sound> [gain dB]  ->  export/eye-break-15_<name>_v3_en.mp4
set -e; cd "$(dirname "$0")"; NAME=$1; VIDEO=$2; SOUND=$3; GAIN=${4:-12}
rm -rf hf-$NAME-v3; cp -r hf-ocean-v4 hf-$NAME-v3; rm -f hf-$NAME-v3/assets/ocean.mp4; cp "$VIDEO" hf-$NAME-v3/assets/bg.mp4
sed -i 's#src="assets/ocean.mp4"#src="assets/bg.mp4"#' hf-$NAME-v3/index.html
sed -e "s#hf-ocean-v4#hf-$NAME-v3#g" -e "s#_v4_silent#_${NAME}_silent#g" -e "s#ocean_v4_en#${NAME}_v3_en#g" -e "s#-i ../2026-09-26_neck-break/ocean/ocean_long.mp4#-i $SOUND#" -e "s#volume=12dB#volume=${GAIN}dB#" mix_v4.sh > _mix_$NAME.sh
bash _mix_$NAME.sh
rm _mix_$NAME.sh
