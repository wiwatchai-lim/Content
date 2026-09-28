#!/usr/bin/env bash
# Re-render every 2026-09-26 clip from its hf folder and put its sound back (3 renders at a time).
#   bash kits/2026-09-26_neck-break/rerender_all.sh [name ...]   (names from the table below; default all)
cd "$(dirname "$0")/../.." || exit 1
K=kits/2026-09-26_neck-break; P=kits/2026-09-26_pterygium; F=node_modules/ffmpeg-static/ffmpeg.exe
# name | hf folder | output | seconds | sound
TABLE="
en15|$K/hf15-en|$K/export/neck-break-15_en.mp4|20.5|ambient:$K/audio/en/track15.wav
girl|$K/hf15-girl|$K/export/neck-break-15_girl_en.mp4|20.5|ambient:$K/audio/en/track15.wav
staff|$K/hf15-photo|$K/export/neck-break-15_staff_en.mp4|20.5|ambient:$K/audio/en/track15.wav
staffm|$K/hf15-photo-motion|$K/export/neck-break-15_staff-motion_en.mp4|20.5|ambient:$K/audio/en/track15.wav
staff2|$K/hf15-photo2|$K/export/neck-break-15_staff2_en.mp4|20.5|ambient:$K/audio/en/track15.wav
staff2m|$K/hf15-photo2-motion|$K/export/neck-break-15_staff2-motion_en.mp4|20.5|ambient:$K/audio/en/track15.wav
en20|$K/hf-en|$K/export/neck-break_en.mp4|28.5|ambient:$K/audio/en/track.wav
th20|$K/hf|$K/export/neck-break_th.mp4|28.5|ambient:$K/audio/th/track.wav
pterygium|$P/hf|$P/export/pterygium_en.mp4|30.5|ambient:$P/audio/en/track.wav
ocean|$K/hf-ocean|$K/export/neck-break-15_ocean_en.mp4|20.5|nature:$K/ocean/ocean_long.mp4:12
crab|$K/hf-crab|$K/export/neck-break-15_crab_en.mp4|20.5|nature:$K/crab/crab_sea_audio.m4a:13
mountain|$K/hf-mountain|$K/export/neck-break-15_mountain_en.mp4|20.5|nature:$K/mountain/mountain_audio.m4a:12
clouds|$K/hf-clouds|$K/export/neck-break-15_clouds_en.mp4|20.5|nature:$K/clouds/clouds_audio.m4a:14
"
one() {
  exec < /dev/null  # ffmpeg/python must not eat the table rows on stdin
  IFS='|' read -r name dir out secs sound <<< "$1"
  silent="$out.silent.mp4"
  abs=$(realpath -m "$silent")
  (cd "$dir" && npx --yes hyperframes@0.8.59 render -o "$abs" --quiet >/dev/null 2>&1)
  if [[ $sound == ambient:* ]]; then
    python tools/ambient.py "$silent" "$out" "$secs" --no-chimes --voice "${sound#ambient:}" >/dev/null 2>&1
  else
    IFS=':' read -r _ bed gain <<< "$sound"
    $F -y -loglevel error -i "$silent" -i "$bed" -i $K/audio/en/voice15_ocean.wav -filter_complex \
      "[1:a]atrim=0:20.5,asetpts=N/SR/TB,volume=${gain}dB,afade=t=in:d=0.5,afade=t=out:st=19.3:d=1.2,aformat=sample_rates=48000:channel_layouts=stereo[bed];[2:a]aformat=sample_rates=48000:channel_layouts=stereo[vo];[vo]asplit[vk][vm];[bed][vk]sidechaincompress=threshold=0.03:ratio=3:attack=20:release=400[duck];[duck][vm]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]" \
      -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "$out"
  fi
  rm -f "$silent"; echo "done $name"
}
WANT=" $* "
n=0
while IFS= read -r row; do
  [ -z "$row" ] && continue
  name=${row%%|*}; [ $# -gt 0 ] && [[ $WANT != *" $name "* ]] && continue
  one "$row" & n=$((n + 1)); [ $((n % 3)) -eq 0 ] && wait
done <<< "$TABLE"
wait
