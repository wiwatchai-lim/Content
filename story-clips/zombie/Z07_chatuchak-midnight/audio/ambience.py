# Z07 bed + SFX (shared kit ../../_shared/sfx.py): Chatuchak at midnight — wind through the tin roofs, a far car alarm, the
# horde moan rising after the fire, runner footfalls, fire crackle under the roof chase, a heartbeat under the slow-mo jump,
# then silence where the bark should be. Every hit / SFX word comes from audio/fx.json. No music.
import os, sys
import numpy as np
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '_shared'))
from sfx import Mix
m = Mix(D, seed=7); S, E, t = m.S, m.E, m.t
m.bed += m.wind(.05) + m.room(.02) + m.alarm(.006, 700, 900, 1.5) * m.env(S[2], S[11], 1, 1)
lamp = S[13] + .7; slow0, land = S[17] - .25, S[18] - .35               # same as template.html
fire = m.env(lamp + .3, S[20], .3, 2.0)
m.bed += m.lp(m.rng.standard_normal(m.n), .5) * .03 * fire * (1 + .6 * (m.rng.random(m.n) > .995))   # crackle
moan = m.env(S[11], S[18], 2, 2) * m.slow_noise(.01, 16)
m.bed += m.lp(np.sin(2 * np.pi * np.cumsum(70 + 20 * m.slow_noise(.02, 16)) / 48000) * (1 + .5 * m.rng.standard_normal(m.n)), .05) * .05 * np.abs(moan)
for s0 in np.arange(S[7], S[7] + 1.5, .13): m.thump(s0, .12, 170)          # runner 1 on all fours
for s0 in np.arange(S[11], S[11] + 2.5, .09): m.thump(s0, .05, 160 + 40 * m.rng.random())   # the alley fills
for s0 in np.arange(S[14], slow0, .28): m.clang(s0, .05, 260)              # feet on tin
m.duck(slow0 - .1, land); m.heartbeat(slow0, land)
m.place_fx()
m.breath(S[18], S[20], 1.0, .05)
m.duck(E[20], S[22] - .2, .7)                                               # no bark: let it go almost silent
for s in (S[1] - .3, S[6] + 1.4, S[11], S[19], S[22] + .55): m.boom(s)
m.write()
