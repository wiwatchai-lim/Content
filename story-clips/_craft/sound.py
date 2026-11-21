# sound.py — mix real recorded SFX (sfxlib/) + synth layers into a stereo bed for an episode. Theory: _craft/FX.md §Sound.
#   import sys; sys.path.insert(0, '<repo>/story-clips/_craft'); from sound import Bed
#   b = Bed(total_seconds)                      # or Bed.from_timing('audio/timing.json') -> b.S / b.E cue starts / ends
#   b.amb('night-crickets', 0, 30, -26)         # looping ambience with crossfaded seams, fades in/out
#   b.hit('shop-door-bell', 12.4, -8, pan=.4)   # one-shot: gain dB, pan -1..1 (screen position), rate (pitch/speed)
#   b.steps('footsteps-wooden-floor', [1.0, 1.5, 2.0], -14, pan_from=-.6, pan_to=.1)   # one footfall per contact
#   b.room('small')                             # reverb send for the location: 'none'|'small'|'room'|'hall'|'outdoor'
#   b.muffle(10, 14)                            # low-pass a window (behind a wall, underwater, fainting)
#   b.duck(20, 21.5, -18)                       # pull everything down (the silence before a scare)
#   b.write('audio/ambience.wav')               # 48 kHz stereo, peak-limited
import json, os, subprocess, wave
import numpy as np
SR = 48000
LIB = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sfxlib')
_cache = {}

def load(name):
    """name = manifest key (e.g. 'door-creak') or a path to any audio file."""
    if name in _cache: return _cache[name]
    man = json.load(open(os.path.join(LIB, 'manifest.json'), encoding='utf-8'))
    p = os.path.join(LIB, man[name]['file']) if name in man else name
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    y = np.frombuffer(raw, np.int16).astype(np.float32) / 32768; _cache[name] = y; return y

def names(category=None):
    man = json.load(open(os.path.join(LIB, 'manifest.json'), encoding='utf-8'))
    return [k for k, v in man.items() if category in (None, v['category'])]

def db(g): return 10 ** (g / 20)

def _lp(x, cut):   # one-pole low-pass at `cut` Hz (vectorised via scipy if present)
    a = 1 - np.exp(-2 * np.pi * cut / SR)
    try:
        from scipy.signal import lfilter; return lfilter([a], [1, a - 1], x).astype(np.float32)
    except ImportError:
        y = np.empty_like(x); acc = 0.0
        for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
        return y

def _resample(y, rate):
    if rate == 1: return y
    n = int(len(y) / rate); return np.interp(np.arange(n) * rate, np.arange(len(y)), y).astype(np.float32)

class Bed:
    def __init__(self, total):
        self.T = total; self.n = int(total * SR); self.t = np.arange(self.n) / SR
        self.L = np.zeros(self.n, np.float32); self.R = np.zeros(self.n, np.float32)
        self.send = np.zeros(self.n, np.float32); self.space = 'none'

    @classmethod
    def from_timing(cls, path, tail=0):
        J = json.load(open(path)); b = cls(J['total'] + tail)
        b.S = {c['n']: c['start'] for c in J['cues']}; b.E = {c['n']: c['end'] for c in J['cues']}; return b

    # ---- placement ----
    def _put(self, t0, y, gain, pan, wet):
        i0 = int(max(0, t0) * SR); y = y[:max(0, self.n - i0)] * gain
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)   # constant-power pan
        self.L[i0:i0 + len(y)] += y * l * 1.414; self.R[i0:i0 + len(y)] += y * r * 1.414
        self.send[i0:i0 + len(y)] += y * wet

    def hit(self, name, t, gain_db=-10, pan=0.0, rate=1.0, wet=.25, fade_out=None, max_len=None, lowpass=None):
        y = _resample(load(name), rate)
        if max_len: y = y[:int(max_len * SR)]
        if fade_out: k = int(min(fade_out, len(y) / SR) * SR); y = y.copy(); y[-k:] *= np.linspace(1, 0, k)
        if lowpass: y = _lp(y, lowpass)
        self._put(t, y, db(gain_db), pan, wet)

    def amb(self, name, t0, t1, gain_db=-24, pan=0.0, fade=1.0, wet=.1, rate=1.0, lowpass=None):
        """loop an ambience between t0 and t1 with 0.5 s crossfaded seams and fades at both ends"""
        src = _resample(load(name), rate); L = int((t1 - t0) * SR); xf = min(int(.5 * SR), len(src) // 4)
        out = np.zeros(L, np.float32); pos = 0; ramp = np.linspace(0, 1, xf, dtype=np.float32)
        while pos < L:
            seg = src.copy(); seg[:xf] *= ramp; seg[-xf:] *= ramp[::-1]
            e = min(L, pos + len(seg)); out[pos:e] += seg[:e - pos]; pos += len(seg) - xf
        f = int(min(fade, (t1 - t0) / 2) * SR); out[:f] *= np.linspace(0, 1, f); out[-f:] *= np.linspace(1, 0, f)
        if lowpass: out = _lp(out, lowpass)
        self._put(t0, out, db(gain_db), pan, wet)

    def steps(self, name, times, gain_db=-14, pan_from=0.0, pan_to=0.0, vary=True, wet=.25):
        """one footfall per contact time. Cuts the library clip into individual steps by its loudness peaks and cycles
        through them with small gain/pitch variation (no machine-gun repetition)."""
        y = load(name); hop = SR // 100; env = np.array([np.abs(y[i:i + hop]).max() for i in range(0, len(y) - hop, hop)])
        thr = env.max() * .35; on = [i for i in range(1, len(env)) if env[i] > thr and env[i - 1] <= thr]
        on = [o for k, o in enumerate(on) if k == 0 or o - on[k - 1] > 15] or [0]
        clips = [y[max(0, o * hop - 200): o * hop + int(.28 * SR)] for o in on]
        rng = np.random.default_rng(len(times))
        for k, t in enumerate(times):
            c = clips[k % len(clips)]; r = 1 + (rng.random() - .5) * .08 if vary else 1
            p = pan_from + (pan_to - pan_from) * (k / max(1, len(times) - 1))
            self._put(t, _resample(c, r), db(gain_db + (rng.random() - .5) * 3 if vary else gain_db), p, wet)

    def synth(self, t0, y, gain_db=0, pan=0.0, wet=.2):
        self._put(t0, np.asarray(y, np.float32), db(gain_db), pan, wet)

    # ---- shaping ----
    def room(self, kind='room'):
        self.space = kind

    def _reverb(self):
        p = {'none': None, 'small': (.25, .55), 'room': (.6, .6), 'hall': (1.8, .65), 'outdoor': (.35, .25)}[self.space]
        if not p: return
        dur, mix = p; n = int(dur * SR); k = np.arange(n) / SR; rng = np.random.default_rng(1)
        ir = (rng.standard_normal(n) * np.exp(-k * 6.9 / dur)).astype(np.float32); ir[:int(.012 * SR)] = 0; ir /= np.abs(ir).sum() ** .5 * 8
        from numpy.fft import rfft, irfft
        m = len(self.send) + n; N = 1 << (m - 1).bit_length()
        wet = irfft(rfft(self.send, N) * rfft(ir, N), N)[:len(self.send)].astype(np.float32) * mix
        self.L += wet; self.R += np.roll(wet, int(.011 * SR))        # small L/R offset = width

    def muffle(self, t0, t1, cut=700):
        i0, i1 = int(t0 * SR), int(t1 * SR)
        for ch in (self.L, self.R): ch[i0:i1] = _lp(ch[i0:i1], cut)

    def duck(self, t0, t1, gain_db=-18, ramp=.15):
        g = 1 - (1 - db(gain_db)) * np.clip(np.minimum((self.t - t0) / ramp, (t1 - self.t) / ramp), 0, 1)
        self.L *= g; self.R *= g

    def write(self, path, fade_in=.5, fade_out=1.5, peak=.89):
        self._reverb()
        fade = np.clip(np.minimum(self.t / fade_in, (self.T - self.t) / fade_out), 0, 1)
        st = np.stack([self.L * fade, self.R * fade], 1)
        m = np.abs(st).max()
        if m > peak: st *= peak / m
        with wave.open(path, 'wb') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
        print('ok', path, round(self.T, 2), 's')

# ---- synth helpers (when the library has nothing that fits) ----
def tone(f, d, decay=3.0, harm=((1, 1), (.5, 2.76), (.25, 5.4))):   # bell / chime
    k = np.arange(int(d * SR)) / SR; return (sum(a * np.sin(2 * np.pi * f * r * k) for a, r in harm) * np.exp(-k * decay)).astype(np.float32)
def sub(d=1.6, f0=48):   # sub-bass hit for reveals / cards
    k = np.arange(int(d * SR)) / SR; return (np.exp(-k * 3) * np.sin(2 * np.pi * (f0 + 30 * np.exp(-k * 8)) * k)).astype(np.float32)
def riser(d=3.0, f0=200, f1=1800):   # tension riser that ends exactly at t0 + d (place it at cut - d)
    k = np.arange(int(d * SR)) / SR; f = f0 * (f1 / f0) ** (k / d); n = np.random.default_rng(2).standard_normal(len(k)) * .3
    return ((np.sin(2 * np.pi * np.cumsum(f) / SR) * .5 + _lp(n.astype(np.float32), 3000)) * (k / d) ** 2).astype(np.float32)
def drone(d, f=55):   # horror bed
    k = np.arange(int(d * SR)) / SR; return ((np.sin(2 * np.pi * f * k) + .5 * np.sin(2 * np.pi * f * 1.5 * k + np.sin(k)) + .3 * np.sin(2 * np.pi * f * 2.01 * k)) * (.6 + .4 * np.sin(2 * np.pi * k / 9))).astype(np.float32) * .3
def reverse(y): return np.asarray(y)[::-1].copy()   # reverse swell: reverse a cymbal/whoosh so it peaks INTO the cut
