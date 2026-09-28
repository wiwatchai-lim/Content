# Voice track for the turtle eye-break (nature look, no ticks): Gemini TTS voice Aoede, all lines read in one request
# (tts_all.py -> audio/en/gemini_all.wav -> split_voice.py -> audio/en/gemini/NN.wav).
#   python kits/2026-09-28_eye-break-turtle/make_voice_15.py voice15_turtle.wav --no-ticks
# Voice: Gemini TTS (voice Sulafat) from audio/<lang>/gemini/NN.wav (NN = line number, 01 = first line), made with
#   python ~/Documents/coder/huahin-news/tools/gemini_tts.py audio/<lang>/gemini.txt audio/<lang>/gemini --voice Sulafat
# A missing file falls back to edge-tts (th) / Kokoro (en).
# Writes audio/<lang>/track.wav: voice lines at their cue times + a soft tick every second from 1 s to 15 s.
# Cue times are relative to the end of the 2 s intro (negative = during the intro).
import asyncio, subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
KIT = Path(__file__).parent / "audio"
ROOT = Path(__file__).parent.parent.parent
FFMPEG = ROOT / 'node_modules' / 'ffmpeg-static' / ('ffmpeg.exe' if sys.platform == 'win32' else 'ffmpeg')
SECONDS = 20.5
CLOSE, STEP, BODY = 1, 2, 15
INTRO = 2.5  # green "Let's take a break / 15 seconds" intro
OUT = sys.argv[1] if len(sys.argv) > 1 else 'track15.wav'
TICKS = '--no-ticks' not in sys.argv  # the ocean version: voice only, the waves are the bed

# (cue time after the intro, max length, text, file in gemini_fix/ or none = gemini/NN.wav)
LINES = {
    'en': [(0.05 - INTRO, 2.4, 'Drift like a sea turtle. Fifteen seconds.'),
           (0.1, 0.9, 'Close your eyes.'),
           (1.1, 1.85, 'Look up to the light.'),
           (3.1, 1.85, 'Turn right, slowly.'),
           (5.1, 1.85, 'Now turn left.'),
           (7.1, 1.9, 'Head back, stretch your neck.'),
           (9.1, 1.9, 'Chin to your right shoulder.'),
           (11.1, 1.9, 'Chin to your left shoulder.'),
           (13.1, 1.85, 'Open your eyes.'),
           (15.25, 2.6, 'Let Time Optic take care of your eyes.')],
}


def decode(path, tempo=1.0):
    trim = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
    af = ['-af', trim + (f',atempo={tempo:.3f}' if tempo != 1 else '')]
    raw = subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-i', str(path), *af, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(float) / 32768


async def edge(text, out):
    import edge_tts
    await edge_tts.Communicate(text, 'th-TH-PremwadeeNeural', rate='+5%').save(str(out))


def kokoro(text, out):
    from kokoro_onnx import Kokoro
    import soundfile as sf
    cache = Path.home() / '.cache' / 'hyperframes' / 'tts'
    k = kokoro.model if hasattr(kokoro, 'model') else None
    if k is None:
        kokoro.model = k = Kokoro(str(cache / 'models' / 'kokoro-v1.0.onnx'), str(cache / 'voices' / 'voices-v1.0.bin'))
    samples, sr = k.create(text, voice='af_heart', speed=1.0, lang='en-us')
    sf.write(str(out), samples, sr)


def tick(high):
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    f = 2200 if high else 1700
    return 0.22 * np.sin(2 * np.pi * f * t) * np.exp(-t * 90)


for lang, lines in LINES.items():
    d = KIT / lang
    track = np.zeros(int(SECONDS * SR))
    for s in (range(1, BODY + 1) if TICKS else []):
        k = tick(s % 2 == 1)
        i = int((s + INTRO) * SR)
        track[i:i + len(k)] += k
    for n, (at, maxlen, text, *key) in enumerate(lines):
        src = d / 'gemini_fix' / f'{key[0] if key else f"{n + 1:02d}"}.wav'  # hooks + single re-takes win over the split take
        if not src.exists():
            src = d / 'gemini' / f'{n + 1:02d}.wav'
        if not src.exists():
            raise SystemExit(f'missing {src}: make the Gemini take first (no silent fallback to another voice)')
            src = d / f'v{n:02d}.{"mp3" if lang == "th" else "wav"}'
            if lang == 'th':
                asyncio.run(edge(text, src))
            else:
                kokoro(text, src)
        v = decode(src)
        if len(v) / SR > maxlen:  # at most a little faster; above ~1.15x it sounds rushed and choppy
            v = decode(src, min(1.3, len(v) / SR / maxlen))  # the warning may run urgent
        print(lang, n, text, f'{len(v) / SR:.2f}s')
        v = v * (0.12 / (np.sqrt(np.mean(v[np.abs(v) > 0.02] ** 2)) + 1e-9))  # same loudness for every line
        v = v / max(1, np.abs(v).max() / 0.85)
        f = int(0.01 * SR)
        v[:f] *= np.linspace(0, 1, f); v[-f:] *= np.linspace(1, 0, f)
        i = int((at + INTRO) * SR)
        track[i:i + len(v)] += v[:len(track) - i]
    track = np.clip(track, -1, 1)
    with wave.open(str(d / OUT), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((track * 32767).astype(np.int16).tobytes())
