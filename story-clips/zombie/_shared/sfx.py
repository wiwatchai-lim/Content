# Shared synthesised sound kit for the zombie series (deterministic, numpy only). An episode's audio/ambience.py builds its
# bed from these layers, then calls place_fx() to drop a sound on every hit / SFX word the composition logged (audio/fx.json,
# written by _shared/fxlog.py), so the sound always lands where the picture shows it. No music: the user adds music later.
import json, os, re, wave
import numpy as np

SR = 48000


class Mix:
    def __init__(self, folder, seed=1):
        self.D = folder
        J = json.load(open(os.path.join(folder, 'timing.json')))
        self.T = J['total']; self.n = int(self.T * SR); self.t = np.arange(self.n) / SR
        self.S = {c['n']: c['start'] for c in J['cues']}; self.E = {c['n']: c['end'] for c in J['cues']}
        self.rng = np.random.default_rng(seed)
        self.bed = np.zeros(self.n); self.fx = np.zeros(self.n)

    # ---------- primitives ----------
    @staticmethod
    def lp(x, a):  # one-pole low-pass
        y = np.empty_like(x); acc = 0.0
        for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
        return y

    def slow_noise(self, a, k=8):
        m = self.n // k + 1; r = self.lp(self.rng.standard_normal(m), a)
        r = np.interp(np.arange(self.n) / k, np.arange(m), r); return r / (np.abs(r).max() + 1e-9)

    def env(self, t0, t1, fi=.3, fo=.3):
        return np.clip(np.minimum((self.t - t0) / fi, (t1 - self.t) / fo), 0, 1)

    def add(self, s0, y, buf=None):
        buf = self.fx if buf is None else buf
        i0 = int(max(0, s0) * SR); y = y[:max(0, self.n - i0)]; buf[i0:i0 + len(y)] += y

    # ---------- bed layers (return arrays to scale / envelope and add to self.bed) ----------
    def room(self, g=.03): return self.slow_noise(.03) * g
    def wind(self, g=.05): return self.slow_noise(.06, 4) * g
    def city(self, g=.08): return self.slow_noise(.02) * g + self.slow_noise(.25, 2) * g * .3
    def hum(self, f=50, g=.03): t = self.t; return (g * np.sin(2 * np.pi * f * t) + g * .4 * np.sin(4 * np.pi * f * t)) * (.8 + .2 * np.sin(2 * np.pi * t / 7))
    def drone(self, f=41, g=.022): t = self.t; return g * np.sin(2 * np.pi * f * t) * (.6 + .4 * np.sin(2 * np.pi * t / 13))
    def water(self, g=.05): return self.lp(self.rng.standard_normal(self.n), .3) * self.slow_noise(.01, 16) * g + self.slow_noise(.08, 2) * g * .5

    def crickets(self, g=.012, every=.9):
        y = np.zeros(self.n)
        for s0 in np.arange(.4, self.T, every):
            L = int(.06 * SR); k = np.arange(L) / SR
            self.add(s0 + self.rng.random() * .3, g * np.sin(2 * np.pi * 4300 * k) * (np.sin(2 * np.pi * 40 * k) > 0), y)
        return y

    def birds(self, g=.02, every=1.7):
        y = np.zeros(self.n)
        for s0 in np.arange(.5, self.T, every):
            L = int(.25 * SR); k = np.arange(L) / SR; f = 2600 + 900 * np.sin(2 * np.pi * (6 + self.rng.random() * 4) * k)
            self.add(s0 + self.rng.random() * .8, g * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * k / .25) ** 2, y)
        return y

    def siren(self, g=.02): t = self.t; return g * np.sin(2 * np.pi * np.cumsum(700 + 250 * np.sin(2 * np.pi * t / 3.2)) / SR) * (.5 + .5 * np.sin(2 * np.pi * t / 17))
    def alarm(self, g=.03, f1=900, f2=1250, rate=2.5): t = self.t; return np.sign(np.sin(2 * np.pi * np.where((t * rate) % 1 < .5, f1, f2) * t)) * g

    def engine(self, t0, t1, g=.12, base=95, rev=40):
        t = self.t; e = self.env(t0, t1, .25, .4); f = base + rev * np.clip((t - t0) / 1.2, 0, 1)
        ph = 2 * np.pi * np.cumsum(f) / SR; y = np.sign(np.sin(ph)) * .4 + np.sin(2 * ph) * .3 + np.sin(3 * ph) * .2
        return self.lp(y * e, .15) * g

    def bell(self, s0, g=.35, f=320):
        L = int(4 * SR); k = np.arange(L) / SR
        self.add(s0, g * np.exp(-k * 1.1) * (np.sin(2 * np.pi * f * k) + .6 * np.sin(2 * np.pi * f * 2.76 * k) + .3 * np.sin(2 * np.pi * f * 5.4 * k)) / 1.9)

    # ---------- one-shots ----------
    def thump(self, s0, g=.9, f0=70):
        L = int(.5 * SR); k = np.arange(L) / SR
        self.add(s0, g * np.exp(-k * 9) * np.sin(2 * np.pi * (f0 + 120 * np.exp(-k * 30)) * k) + g * .5 * np.exp(-k * 60) * self.rng.standard_normal(L))

    def clang(self, s0, g=.6, f=620):
        L = int(1.2 * SR); k = np.arange(L) / SR
        self.add(s0, g * np.exp(-k * 4) * (np.sin(2 * np.pi * f * k) + .6 * np.sin(2 * np.pi * f * 2.1 * k) + .4 * np.sin(2 * np.pi * f * 3.7 * k)) / 2
                 + g * .6 * np.exp(-k * 50) * self.rng.standard_normal(L))

    def glass(self, s0, g=.6, d=1.4):
        L = int(d * SR); k = np.arange(L) / SR; y = np.zeros(L)
        for _ in range(40):
            i = int(self.rng.random() ** 2 * L * .8); m = int(.05 * SR); kk = np.arange(m) / SR; f = 2500 + self.rng.random() * 5000
            y[i:i + m] += np.exp(-kk * 60) * np.sin(2 * np.pi * f * kk) * (.5 + self.rng.random())
        self.add(s0, g * (y / 8 + np.exp(-k * 12) * self.rng.standard_normal(L) * .6))

    def whoosh(self, s0, d=.4, g=.25):
        L = int(d * SR); k = np.arange(L) / SR; self.add(s0, self.lp(self.rng.standard_normal(L), .25) * np.sin(np.pi * k / d) ** 2 * g)

    def click(self, s0, g=.35):
        L = int(.12 * SR); k = np.arange(L) / SR
        self.add(s0, g * np.exp(-k * 70) * (self.rng.standard_normal(L) * .6 + np.sin(2 * np.pi * 1800 * k)))

    def snarl(self, s0, g=.08, d=1.0):
        L = int(d * SR); k = np.arange(L) / SR; f = 110 + 30 * np.sin(2 * np.pi * 2.3 * k)
        self.add(s0, self.lp(np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 + .8 * self.rng.standard_normal(L)) * np.sin(np.pi * k / d) ** 2 * g, .08))

    def bark(self, s0, g=.25):
        L = int(.18 * SR); k = np.arange(L) / SR; ph = 2 * np.pi * np.cumsum(560 - 260 * k / .18) / SR
        self.add(s0, self.lp(g * np.sin(np.pi * k / .18) ** 1.5 * (np.sin(ph) + .5 * np.sin(2 * ph) + .25 * np.sin(3 * ph)), .25))

    def hiss(self, s0, d=1.0, g=.2):
        L = int(d * SR); k = np.arange(L) / SR; self.add(s0, self.lp(self.rng.standard_normal(L), .7) * np.clip(np.minimum(k / .05, (d - k) / .3), 0, 1) * g)

    def scrape(self, s0, d=.8, g=.08):
        L = int(d * SR); k = np.arange(L) / SR; f = 300 + 120 * np.sin(2 * np.pi * .8 * k)
        self.add(s0, g * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * k / d) * (1 + .5 * self.rng.standard_normal(L)))

    def boom(self, s0, g=.5):  # low hit for reveals and cards
        L = int(1.6 * SR); k = np.arange(L) / SR; self.add(s0, g * np.exp(-k * 3) * np.sin(2 * np.pi * (48 + 30 * np.exp(-k * 8)) * k))

    def heartbeat(self, t0, t1, g=.3):
        for b in np.arange(t0 + .2, t1 - .1, .75): self.thump(b, g, 45); self.thump(b + .22, g * .65, 45)

    def duck(self, t0, t1, depth=.8):  # pull the bed down (slow-mo), snap back at t1
        self.bed *= 1 - depth * np.clip(np.minimum((self.t - t0) / .2, (t1 - self.t) / .05), 0, 1)

    def breath(self, t0, t1, every=1.1, g=.05):
        for b in np.arange(t0, t1, every):
            L = int(.6 * SR); k = np.arange(L) / SR; self.add(b, self.lp(self.rng.standard_normal(L), .12) * np.sin(np.pi * k / .6) ** 2 * g)

    # ---------- SFX words -> sounds ----------
    RULES = [
        (r'เคร้ง|แกร๊ง|เป๊ง', 'clang'), (r'เพล้ง|เปรี๊ยะ|แตก', 'glass'), (r'โครม|ตูม|บึ้ม', 'crash'),
        (r'ฟิ้ว|ฟึ่บ|วู้ม|วืด|ฟุ่บ|ซวบ', 'whoosh'), (r'โฮ่ง|บ็อก', 'bark'), (r'งับ|หมับ|แง่บ|กัด', 'bite'),
        (r'แกร๊ก|กึก|กริ๊ง|แคว่ก|ติ๊ก|คลิก', 'click'), (r'แฮ่|กร๊าว|โฮก', 'snarl'), (r'ฟู่|ซู่|ฉ่า', 'hiss'),
        (r'ครืด|เอี๊ยด|แอ๊ด|แกรก', 'scrape'), (r'บรื้น|บรึ้น', 'rev'), (r'หง่าง|เหง่ง|ดัง', 'bell'),
        (r'ตุ้บ|ปั้ก|ป้าก|โป๊ก|พลั่ก|ปึ้ง|ปัง|ป๊อก|กร้วบ|กร๊อบ|ป้าบ|ตึง|โป้ง|พลั่ก|ผัวะ|เปรี้ยง|ปึก', 'thump'),
    ]

    def place_fx(self, path=None, gain=1.0, skip=()):
        fx = json.load(open(path or os.path.join(self.D, 'fx.json'), encoding='utf-8'))
        hits = {round(e['t'], 2) for e in fx if e['kind'] == 'hit'}
        for e in fx:
            if e['kind'] != 'word': continue
            t, txt = e['t'], e['txt']
            if any(re.search(s, txt) for s in skip): continue
            big = round(t, 2) in hits; g = gain * (1.0 if big else .55)
            kind = next((k for pat, k in self.RULES if re.search(pat, txt)), 'thump')
            if kind == 'clang': self.clang(t, .6 * g); self.thump(t, .4 * g)
            elif kind == 'glass': self.glass(t, .7 * g, 1.6 if big else .8)
            elif kind == 'crash': self.thump(t, 1.0 * g, 50); self.clang(t + .02, .2 * g, 300)
            elif kind == 'whoosh': self.whoosh(t - .1, .45, .3 * g)
            elif kind == 'bark': self.bark(t, .25); self.bark(t + .28, .2)
            elif kind == 'bite': self.click(t, .4 * g); self.thump(t, .3 * g, 140)
            elif kind == 'click': self.click(t, .35 * g)
            elif kind == 'snarl': self.snarl(t - .1, .1 * g)
            elif kind == 'hiss': self.hiss(t, 1.2, .2 * g)
            elif kind == 'scrape': self.scrape(t, .8, .08 * g)
            elif kind == 'rev': self.bed += self.engine(t - .2, t + 1.4, .12, 110, 60)
            elif kind == 'bell': self.bell(t, .35 * g)
            else: self.thump(t, .9 * g, 70 + (hash(txt) % 50))

    def write(self, name='ambience.wav', fade_in=.3, fade_out=1.0):
        t = self.t; fade = np.clip(np.minimum(t / fade_in, (self.T - t) / fade_out), 0, 1)
        out = np.clip((self.bed + self.fx) * fade, -1, 1)
        with wave.open(os.path.join(self.D, name), 'wb') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.repeat(out, 2) * 32767).astype(np.int16).tobytes())
        print('ok', self.T)
