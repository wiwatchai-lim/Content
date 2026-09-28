# Voice track for the pterygium clip: the Gemini lines from audio/en/NN.wav at their cue times + a soft pop on each row.
#   python kits/2026-09-26_pterygium/make_audio.py   -> audio/en/track.wav (then tools/ambient.py lays the bed under it)
import subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
KIT = Path(__file__).parent
ROOT = KIT.parent.parent
FFMPEG = ROOT / 'node_modules' / 'ffmpeg-static' / ('ffmpeg.exe' if sys.platform == 'win32' else 'ffmpeg')
SECONDS = 30.5
CUES = [0.15, 2.45, 4.5, 10.3, 11.45, 14.3, 17.8, 21.0, 27.2]   # one per audio/en/NN.wav, same times as hf/index.html
POPS = [11.45, 14.3, 17.8, 21.0, 22.9, 24.4]                     # rows coming in


def decode(path):
    trim = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
    raw = subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-i', str(path), '-af', trim, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(float) / 32768


track = np.zeros(int(SECONDS * SR))
for n, at in enumerate(CUES, 1):
    v = decode(KIT / 'audio' / 'en' / f'{n:02d}.wav')
    v = v * (0.12 / (np.sqrt(np.mean(v[np.abs(v) > 0.02] ** 2)) + 1e-9))  # same loudness for every line
    v = v / max(1, np.abs(v).max() / 0.85)
    f = int(0.01 * SR); v[:f] *= np.linspace(0, 1, f); v[-f:] *= np.linspace(1, 0, f)
    i = int(at * SR); track[i:i + len(v)] += v[:len(track) - i]
    print(n, f'{at:5.2f}-{at + len(v) / SR:5.2f}')
t = np.arange(int(0.12 * SR)) / SR
pop = 0.16 * np.sin(2 * np.pi * (520 + 900 * t) * t) * np.exp(-t * 38)
for at in POPS:
    i = int(at * SR); track[i:i + len(pop)] += pop
track = np.clip(track, -1, 1)
with wave.open(str(KIT / 'audio' / 'en' / 'track.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((track * 32767).astype(np.int16).tobytes())
