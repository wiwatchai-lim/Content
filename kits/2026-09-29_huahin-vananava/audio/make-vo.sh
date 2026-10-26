#!/usr/bin/env bash
# Voice lines 01-06 (Gemini TTS, voice Sulafat, gemini-3.1-flash-tts-preview), then trim + 1.2x into audio/fast and mix.
# Free tier = 10 requests/day, resets ~14:00 Thai. Skips lines already made; one try per line, stops on the first 429.
cd "$(dirname "$0")/.."
KEY=$(powershell.exe -NoProfile -Command "[Environment]::GetEnvironmentVariable('GEMINI_API_KEY','User')" | tr -d '\r')
LINES=("Welcome to Vana Nava, Hua Hin."
  "Where the mountains meet the water, and every day feels like summer."
  "Every slide. Every splash. Every smile."
  "These are the moments you'll want to remember."
  "So see every one of them clearly."
  "See more. Experience more.")
for i in 1 2 3 4 5 6; do
  n=$(printf %02d $i); [ -f audio/raw/$n.wav ] && continue
  START=$i TRIES=1 GEMINI_API_KEY="$KEY" python audio/gemini_tts.py audio/raw Sulafat "${LINES[$((i-1))]}" || { echo "stopped at line $n (quota?)"; break; }
done
for f in audio/raw/0[1-6].wav; do
  n=$(basename $f); ffmpeg -v error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo=1.2" audio/fast/$n
  echo "$n $(ffprobe -v error -show_entries format=duration -of csv=p=0 audio/fast/$n)"
done
bash audio/mix.sh
