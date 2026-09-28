# Calm ambient bed synthesised here (so the shop owns it outright) and muxed onto a clip.
#   python tools/ambient.py <clip.mp4> <out.mp4> [seconds] [--no-chimes] [--voice voice.wav]
#   --voice mixes a spoken track (mono/stereo wav, same length or shorter) over the bed, with the bed ducked a little.
# Slow major-seventh pad + soft filtered air noise + a few gentle chimes, fade in/out.
import subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
ROOT = Path(__file__).parent.parent
FFMPEG = ROOT / 'node_modules' / 'ffmpeg-static' / ('ffmpeg.exe' if sys.platform == 'win32' else 'ffmpeg')


def pad(freqs, n, rng):
    t = np.arange(n) / SR
    out = np.zeros((n, 2))
    for f in freqs:
        for ch, det in ((0, -0.6), (1, 0.6)):  # slight stereo detune
            ph = rng.uniform(0, 2 * np.pi)
            lfo = 1 + 0.004 * np.sin(2 * np.pi * 0.13 * t + ph)
            out[:, ch] += np.sin(2 * np.pi * (f + det) * lfo * t + ph) + 0.25 * np.sin(2 * np.pi * 2 * f * t + ph)
    return out / len(freqs)


def main():
    args = sys.argv[1:]
    chimes = '--no-chimes' not in args
    voice = args[args.index('--voice') + 1] if '--voice' in args else None
    pos = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or args[i - 1] != '--voice')]
    clip, dst = pos[0], pos[1]
    seconds = float(pos[2]) if len(pos) > 2 else 15
    n = int(seconds * SR)
    rng = np.random.default_rng(3)
    t = np.arange(n) / SR
    # two chords, crossfaded: Cmaj7 -> Fmaj7 (soft, open voicing)
    a = pad([130.8, 196.0, 246.9, 329.6], n, rng)
    b = pad([174.6, 220.0, 261.6, 329.6], n, rng)
    x = np.clip((t - seconds * 0.45) / 3, 0, 1)[:, None]
    mix = 0.16 * (a * (1 - x) + b * x)
    # air: low-passed noise with a slow swell, like distant wind
    noise = rng.standard_normal((n, 2))
    k = np.ones(400) / 400
    air = np.stack([np.convolve(noise[:, c], k, 'same') for c in range(2)], 1)
    air *= (0.6 + 0.4 * np.sin(2 * np.pi * t / 7))[:, None]
    mix += 0.9 * air / np.abs(air).max() * 0.12
    # chimes on the section changes
    for at, f in () if not chimes else ((0.3, 1046.5), (3.0, 784.0), (6.6, 880.0), (10.0, 784.0), (12.9, 1046.5), (13.3, 1318.5)):
        m = int(3 * SR)
        i = int(at * SR)
        tt = np.arange(m) / SR
        c = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2.76 * f * tt)) * np.exp(-tt / 0.9) * 0.07
        c = c[:n - i]
        mix[i:i + len(c), 0] += c * 0.9
        mix[i:i + len(c), 1] += c
    fade_in, fade_out = int(1.0 * SR), int(1.5 * SR)
    mix[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    mix[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None]
    mix = np.tanh(mix / np.abs(mix).max() * 0.8) * 0.7
    if voice:
        with wave.open(voice) as w:
            v = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
            v = v.reshape(-1, w.getnchannels())
        v = np.repeat(v, 2, 1) if v.shape[1] == 1 else v
        v = np.pad(v, ((0, max(0, n - len(v))), (0, 0)))[:n]
        mix = mix * 0.55 + v / max(1e-6, np.abs(v).max()) * 0.8
        mix = np.clip(mix, -1, 1)
    wav = Path(dst).with_suffix('.wav')
    with wave.open(str(wav), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((mix * 32767).astype(np.int16).tobytes())
    subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-y', '-i', clip, '-i', str(wav),
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', dst], check=True)
    wav.unlink()
    print(dst)


if __name__ == '__main__':
    main()
