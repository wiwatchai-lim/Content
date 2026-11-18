#!/bin/bash
# Carousel kit -> 9:16 IG Reel with music: 5 slides, 4 s each, slow zoom, 0.6 s crossfades, 19 s.
# Slides sit at 960 px, x=60 y=360, clear of the Reels caption area and right-side buttons.
#   bash carousel/stories/reel.sh <music.m4a> <kit-dir>...   -> <kit>/export/reel.mp4
# Make the music once:  ffmpeg -i song.mp3 -t 19 -af "loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:d=0.5,afade=t=out:st=17:d=2" -c:a aac -b:a 192k music.m4a
cd /c/timeoptic-content
M=$1; shift
for d in "$@"; do
  e=$d/export; in=""
  for i in 01 02 03 04 05; do in="$in -loop 1 -t 4.6 -framerate 30 -i $e/$i.png"; done
  f="color=c=0xECD6BE:s=1080x1920:r=30:d=19[bg];"
  for i in 0 1 2 3 4; do
    if [ $((i % 2)) = 0 ]; then z="1+0.045*on/138"; else z="1.045-0.045*on/138"; fi
    f="$f[$i:v]scale=2160:2160,zoompan=z='$z':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=960x960:fps=30,format=yuv420p,setsar=1[v$i];"
  done
  f="$f[v0][v1]xfade=transition=fade:duration=0.6:offset=4[x1];[x1][v2]xfade=transition=fade:duration=0.6:offset=8[x2];[x2][v3]xfade=transition=fade:duration=0.6:offset=12[x3];[x3][v4]xfade=transition=fade:duration=0.6:offset=16[sq];[bg][sq]overlay=60:360:shortest=1,format=yuv420p,fade=t=out:st=18.3:d=0.7[out]"
  ffmpeg -y -hide_banner -loglevel error $in -i "$M" -filter_complex "$f" -map "[out]" -map 5:a -t 19 \
    -c:v libx264 -crf 18 -preset medium -c:a copy -movflags +faststart "$e/reel.mp4" && echo "ok $(basename $d)"
done
