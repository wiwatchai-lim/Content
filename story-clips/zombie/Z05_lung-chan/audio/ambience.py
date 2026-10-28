# Z05 bed + SFX (shared kit ../../_shared/sfx.py): a dead mall car park, level B2, mid-afternoon — concrete room tone, a low
# ventilation drone, drips; every hit / SFX word from audio/fx.json (car alarm, whistle, krabong cracks), a heartbeat under the
# slow-mo, the radio crackle, and the pickup engine passing at the end. No music.
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '_shared'))
from sfx import Mix
m = Mix(D, seed=5); S, E, t = m.S, m.E, m.t
park = m.env(-1, S[21] - .1, .1, .4)
m.bed += (m.room(.035) + m.drone(46, .025) + m.hum(60, .008)) * park
for s0 in range(2, int(S[21]), 3): m.click(s0 + .37 * (s0 % 5), .05)           # drips
K1, SM0, I = S[14] + .4, E[14] + .15, S[16] - .3                              # same as template.html
m.bed += m.alarm(.03) * m.env(S[11] - .2, S[12] + .3, .05, .05)               # the pickup's alarm until the whistle
m.duck(SM0 - .1, I); m.heartbeat(SM0, I)
m.place_fx()
L = int(.9 * 48000)
import numpy as np
k = np.arange(L) / 48000; m.add(S[12], .12 * np.sin(2 * np.pi * 2900 * k) * (1 + .3 * np.sin(2 * np.pi * 30 * k)) * np.clip(np.minimum(k / .03, (.9 - k) / .2), 0, 1))   # whistle
m.breath(S[17], S[21] - .3, 1.2, .045)
m.bed += m.lp(m.rng.standard_normal(m.n), .6) * .025 * m.env(S[21] - .1, S[24] - .2, .2, .3)   # radio static
m.bed += m.engine(S[24] - .3, S[25] - .1, .1, 70, 30) + m.wind(.03) * m.env(S[21], m.T + 1, .5, .1)
for s in (S[1] - .3, S[7], S[13], S[22], S[24], S[25] + .55): m.boom(s)
m.write()
