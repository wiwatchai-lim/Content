# Put the audio on a rendered beat clip.
#   python tools/beat-audio.py <kit folder> <silent clip.mp4>
# Reads <kit>/clip-audio.json: {"seconds", "song", "song_start", "fade_out", "sfx": [{"t", "file", "gain"}]}
# Writes <kit>/export/clip-hf.mp4 (SFX only, for upload; the song is added in TikTok)
#    and <kit>/export/clip-hf_preview-song.mp4 (song + SFX, stays on this machine).
import json, subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
ROOT = Path(__file__).parent.parent
FFMPEG = ROOT / 'node_modules' / 'ffmpeg-static' / ('ffmpeg.exe' if sys.platform == 'win32' else 'ffmpeg')
SFX_DIRS = sorted((Path.home() / '.claude' / 'plugins' / 'cache' / 'claude-plugins-official' / 'hyperframes')
                  .glob('*/skills/media-use/audio/assets/sfx'))


def decode(args):
    raw = subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', *args, '-f', 's16le', '-ac', '2', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(float).reshape(-1, 2) / 32768


def sfx_file(name):
    for d in SFX_DIRS:
        f = d / f'{name}.mp3'
        if f.exists():
            return f
    sys.exit(f'sfx not found: {name}')


def main():
    kit, clip = Path(sys.argv[1]), Path(sys.argv[2])
    c = json.loads((kit / 'clip-audio.json').read_text())
    n = int(c['seconds'] * SR)
    sfx = np.zeros((n, 2))
    for e in c['sfx']:
        s = decode(['-i', str(sfx_file(e['file']))]) * e.get('gain', 0.5)
        i = int(e['t'] * SR)
        s = s[:n - i]
        sfx[i:i + len(s)] += s
    song = decode(['-ss', str(c['song_start']), '-t', str(c['seconds']), '-i', str(kit / c['song'])])
    song = np.pad(song, ((0, max(0, n - len(song))), (0, 0)))[:n]
    fade = int(c.get('fade_out', 0.8) * SR)

    def write(mix, name):
        mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
        wav = kit / 'export' / f'{name}.wav'
        with wave.open(str(wav), 'wb') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
            w.writeframes((np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes())
        out = kit / 'export' / f'{name}.mp4'
        subprocess.run([str(FFMPEG), '-nostdin', '-loglevel', 'error', '-y', '-i', str(clip), '-i', str(wav),
                        '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', str(out)], check=True)
        wav.unlink()
        print(out)

    write(sfx * 0.8, 'clip-hf')
    write(song * 0.85 + sfx * 0.55, 'clip-hf_preview-song')


if __name__ == '__main__':
    main()
