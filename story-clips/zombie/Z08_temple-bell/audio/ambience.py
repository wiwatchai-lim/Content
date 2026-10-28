# Z08 bed + SFX (shared kit ../../_shared/sfx.py): a canal-side temple after midnight — crickets, wind, the horde's moan
# outside the wall, every hit / SFX word from audio/fx.json, a heartbeat under the slow-mo bite, real bell strikes, and
# the last strike with no sound at all. No music.
import os, sys
import numpy as np
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '_shared'))
from sfx import Mix
m = Mix(D, seed=8); S, E, t = m.S, m.E, m.t
m.bed += m.wind(.04) + m.crickets(.012, 1.0) + m.room(.02)
moan = m.env(S[4], S[20] + 1, 1.5, 2.5)
m.bed += m.lp(np.sin(2 * np.pi * np.cumsum(72 + 18 * m.slow_noise(.02, 16)) / 48000) * (1 + .5 * m.rng.standard_normal(m.n)), .05) * .06 * moan
m.bed += m.water(.03) * m.env(S[19] - .1, m.T + 1, .4, .1)
sm0, sm1 = S[11] - 1.3, S[11] + 1.4                                         # same as template.html
m.duck(sm0 - .1, sm1); m.heartbeat(sm0, sm1)
m.place_fx(skip=(r'เป๊ง',))                                                   # the bell gets real strikes below
BELLS = [S[19] + .05, S[19] + .8, S[19] + 1.55, S[20] + .4, S[20] + 1.6, S[21] - .2]
for b in BELLS: m.bell(b, .4, 300)
m.duck(S[22] - 1.3, S[23] - .3, .85)                                        # the last strike rings silent
L = int(.9 * 48000); k = np.arange(L) / 48000
m.add(S[17] + 1.4, .05 * np.sin(2 * np.pi * 2900 * k) * np.clip(np.minimum(k / .03, (.9 - k) / .3), 0, 1))   # a soft test of the whistle
for s in (S[1] - .3, S[4], S[11], S[14], S[23] + .55): m.boom(s)
m.write()
