# Put a soundtrack on a rendered clip: a beat synthesised here (so the shop owns it outright) plus
# sound effects placed on the animation's cue times, then muxed into <name>_music.mp4.
#   python tools/soundtrack.py <clip.mp4> <cues.json>
# cues.json: {"bpm": 120, "seconds": 10, "fade_out": 1.2,
#             "sfx": [{"t": 3.0, "file": "pop", "gain": 0.8}, ...]}
# SFX names come from the HyperFrames media-use library (Pixabay Content License, commercial use OK).
import json, subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
ROOT = Path(__file__).parent.parent
FFMPEG = ROOT / 'node_modules' / 'ffmpeg-static' / ('ffmpeg.exe' if sys.platform == 'win32' else 'ffmpeg')
SFX_DIRS = sorted((Path.home() / '.claude' / 'plugins' / 'cache' / 'claude-plugins-official' / 'hyperframes')
                  .glob('*/skills/media-use/audio/assets/sfx'))


def env(n, attack, decay):
    t = np.arange(n) / SR
    return np.minimum(t / attack, 1) * np.exp(-t / decay)


def note(freq, n, shape='saw'):
    t = np.arange(n) / SR
    if shape == 'sine':
        return np.sin(2 * np.pi * freq * t)
    return sum(np.sin(2 * np.pi * freq * k * t) / k for k in range(1, 8))  # soft band-limited saw


def beat(bpm, seconds):
    n = int(seconds * SR)
    out = np.zeros(n)
    b = 60 / bpm
    rng = np.random.default_rng(7)
    add = lambda at, sig: out.__setitem__(slice(int(at * SR), int(at * SR) + len(sig)),
                                          out[int(at * SR):int(at * SR) + len(sig)] + sig[:max(0, n - int(at * SR))])
    # A minor → F → C → G, one bar each, looped: bright but not cheesy.
    chords = [[220.0, 261.6, 329.6], [174.6, 220.0, 261.6], [196.0, 261.6, 329.6], [196.0, 246.9, 293.7]]
    bass = [110.0, 87.3, 130.8, 98.0]
    beats = int(seconds / b)
    for i in range(beats):
        at = i * b
        bar = (i // 4) % 4
        kick_n = int(.35 * SR)
        f = 110 * np.exp(-np.arange(kick_n) / SR / .04) + 45
        add(at, .9 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(kick_n, .002, .12))
        if i % 2 == 1:  # clap on 2 and 4
            m = int(.25 * SR)
            add(at, .35 * rng.standard_normal(m) * env(m, .001, .05))
        for h in (0, .5):  # off-beat hats
            if h:
                m = int(.06 * SR)
                noise = rng.standard_normal(m)
                add(at + h * b, .12 * (noise - np.convolve(noise, np.ones(8) / 8, 'same')) * env(m, .001, .015))
        m = int(b * SR)
        add(at, .22 * note(bass[bar], m, 'sine') * env(m, .005, .25))
        if i % 4 == 0:  # pad holds the bar
            m = int(4 * b * SR)
            pad = sum(note(fq, m) for fq in chords[bar]) / 3
            add(at, .07 * pad * env(m, .25, 2.5))
        # plucked arpeggio on 8ths
        for k in range(2):
            m = int(.3 * SR)
            fq = chords[bar][(i * 2 + k) % 3] * 2
            add(at + k * b / 2, .08 * note(fq, m, 'sine') * env(m, .002, .09))
    return out


def load_sfx(name):
    for d in SFX_DIRS:
        f = d / f'{name}.mp3'
        if f.exists():
            raw = subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-i', str(f), '-f', 's16le', '-ac', '1',
                                  '-ar', str(SR), '-'], capture_output=True, check=True).stdout
            return np.frombuffer(raw, np.int16).astype(float) / 32768
    sys.exit(f'sfx not found: {name}')


def main():
    clip, cues = Path(sys.argv[1]), json.loads(Path(sys.argv[2]).read_text())
    seconds = cues.get('seconds', 10)
    mix = beat(cues.get('bpm', 120), seconds) * cues.get('music_gain', 0.8)
    for c in cues.get('sfx', []):
        s = load_sfx(c['file']) * c.get('gain', 0.7)
        i = int(c['t'] * SR)
        s = s[:max(0, len(mix) - i)]
        mix[i:i + len(s)] += s
    fade = int(cues.get('fade_out', 1.2) * SR)
    mix[-fade:] *= np.linspace(1, 0, fade)
    mix[:int(.02 * SR)] *= np.linspace(0, 1, int(.02 * SR))
    mix = np.tanh(mix / max(1e-6, np.percentile(np.abs(mix), 99.9)) * .9) * .85  # soft limit
    wav = clip.with_name(clip.stem + '_music.wav')
    with wave.open(str(wav), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((mix * 32767).astype(np.int16).tobytes())
    out = clip.with_name(clip.stem + '_music.mp4')
    subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-y', '-i', str(clip), '-i', str(wav),
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-af', 'loudnorm=I=-14:TP=-1.5', '-shortest', str(out)], check=True)
    wav.unlink()
    print(out)


if __name__ == '__main__':
    main()
