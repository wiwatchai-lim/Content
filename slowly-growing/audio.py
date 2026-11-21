# Soft piano + nature ambience for Slowly Growing clips (synthesised here, so the channel owns it).
#   python slowly-growing/audio.py <clip.mp4> <out.mp4> [--seconds 20] [--amb rain|wind|water|night|none] [--seed 1]
import argparse, subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
FFMPEG = Path(__file__).parent.parent / 'node_modules' / 'ffmpeg-static' / ('ffmpeg.exe' if sys.platform == 'win32' else 'ffmpeg')
NOTE = lambda m: 440 * 2 ** ((m - 69) / 12)


def piano(f, dur, vel):
    t = np.arange(int(dur * SR)) / SR
    tone = sum(a * np.sin(2 * np.pi * f * k * (1 + 0.0004 * k * k) * t) * np.exp(-t * (0.9 + 0.6 * k))
               for k, a in ((1, 1), (2, .45), (3, .22), (4, .12), (5, .06)))
    env = np.minimum(1, t / 0.006) * np.exp(-t / 2.2)
    return tone * env * vel


def reverb(x, rng, secs=2.6):
    n = int(secs * SR)
    ir = rng.standard_normal((n, 2)) * np.exp(-np.arange(n) / SR / 0.7)[:, None]
    ir[:, 0] = np.convolve(ir[:, 0], np.ones(8) / 8, 'same'); ir[:, 1] = np.convolve(ir[:, 1], np.ones(8) / 8, 'same')
    out = np.stack([np.fft.irfft(np.fft.rfft(x, len(x) + n) * np.fft.rfft(ir[:, c], len(x) + n))[:len(x)] for c in range(2)], 1)
    return out / (np.abs(out).max() + 1e-9)


def ambience(kind, n, rng):
    t = np.arange(n) / SR
    noise = rng.standard_normal((n, 2))
    lp = lambda x, k: np.stack([np.convolve(x[:, c], np.ones(k) / k, 'same') for c in range(2)], 1)
    if kind == 'rain':
        hiss = noise - lp(noise, 6)            # bright steady hiss
        body = lp(noise, 30) * 2.5
        drops = np.zeros((n, 2))
        for i in rng.integers(0, n - 2000, int(n / SR * 40)):
            m = 600; d = rng.standard_normal(m) * np.exp(-np.arange(m) / 90) * rng.uniform(.2, 1)
            drops[i:i + m, rng.integers(0, 2)] += d
        x = 0.35 * hiss + 0.4 * body + 0.5 * lp(drops, 3)
    elif kind == 'wind':
        x = lp(noise, 300) * (0.6 + 0.4 * np.sin(2 * np.pi * t / 6))[:, None]
    elif kind == 'water':
        x = lp(noise, 60) * (0.7 + 0.3 * np.sin(2 * np.pi * t / 3.5))[:, None]
    elif kind == 'night':
        x = lp(noise, 200) * 0.5
        for s in np.arange(0.4, n / SR, 0.9):
            i = int(s * SR); m = int(0.25 * SR); tt = np.arange(m) / SR
            c = np.sin(2 * np.pi * 4300 * tt) * (np.sin(2 * np.pi * 28 * tt) > 0) * np.exp(-tt / 0.08)
            x[i:i + m, int(s * 10) % 2] += 0.15 * c[:n - i]
    else:
        return np.zeros((n, 2))
    return x / (np.abs(x).max() + 1e-9)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('clip'); ap.add_argument('out')
    ap.add_argument('--seconds', type=float, default=20); ap.add_argument('--amb', default='rain')
    ap.add_argument('--seed', type=int, default=1)
    a = ap.parse_args()
    rng = np.random.default_rng(a.seed)
    n = int(a.seconds * SR)
    mono = np.zeros(n + SR * 3)
    # Am – F – C – G, slow broken chords, a sparse melody on top (60 bpm)
    chords = [(45, 57, 60, 64), (41, 57, 60, 65), (48, 55, 60, 64), (43, 55, 59, 62)]
    melody = [76, None, 74, 72, None, 69, 72, None, 71, None, 67, None]
    beat = 1.0
    bar = 0
    for start in np.arange(0.4, a.seconds - 1.5, 4 * beat):
        ch = chords[bar % 4]
        for j, m in enumerate(ch):
            s = piano(NOTE(m), 4.5, 0.32 if j == 0 else 0.2)
            i = int((start + j * 0.42) * SR); mono[i:i + len(s)] += s[:len(mono) - i]
        for k in range(2):
            mel = melody[(bar * 2 + k) % len(melody)]
            if mel and start > 3:
                s = piano(NOTE(mel), 4, 0.26)
                i = int((start + 2 * k * beat + 0.8) * SR); mono[i:i + len(s)] += s[:len(mono) - i]
        bar += 1
    mono = mono[:n]
    dry = np.stack([mono * 0.95, mono], 1)
    wet = reverb(mono, rng)
    pno = dry / (np.abs(dry).max() + 1e-9) * 0.7 + wet * 0.45
    mix = pno * 0.75 + ambience(a.amb, n, rng) * 0.22
    fi, fo = int(1.2 * SR), int(2 * SR)
    mix[:fi] *= np.linspace(0, 1, fi)[:, None]; mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
    mix = np.tanh(mix / np.abs(mix).max() * 0.9) * 0.8
    wav = Path(a.out).with_suffix('.wav')
    with wave.open(str(wav), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((mix * 32767).astype(np.int16).tobytes())
    subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-y', '-i', a.clip, '-i', str(wav),
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', a.out], check=True)
    wav.unlink()
    print(a.out.encode("ascii", "replace").decode())


if __name__ == '__main__':
    main()
