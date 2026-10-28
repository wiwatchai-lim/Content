#!/usr/bin/env bash
# Z05: render hf/, then mix voice (audio/voice.wav, Gemini 3.1 flash TTS Sulafat, timeline.py) over the synthesised action bed (audio/ambience.py).
# No music: the user adds music later.
set -e; cd "$(dirname "$0")"
(python build.py && cd hf && npx --yes hyperframes@0.8.59 render -o ../export/_silent.mp4 --quiet >/dev/null 2>&1)
ffmpeg -y -loglevel error -i export/_silent.mp4 -i audio/ambience.wav -i audio/voice.wav -filter_complex \
  "[1:a]volume=0dB[bed];[2:a]volume=3dB,asplit[vk][vm];[bed][vk]sidechaincompress=threshold=0.03:ratio=3:attack=20:release=400[duck];[duck][vm]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest export/Z05_lung-chan_th.mp4
rm export/_silent.mp4; echo export/Z05_lung-chan_th.mp4
