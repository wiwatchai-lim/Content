# Z10 bed + SFX (shared kit ../../_shared/sfx.py): the fort pier at dawn — sea wind, waves on the piles, the ship's low engine
# and horn, gulls once the sun is up; a heartbeat under the whole episode that slows as the bite timer runs out; every hit /
# SFX word from audio/fx.json; total silence at zero, one heartbeat on the eyes, then the dry radio line. No music.
import os, sys
import numpy as np
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '_shared'))
from sfx import Mix
m = Mix(D, seed=10); S, E, t = m.S, m.E, m.t
H_knee = S[21] - .5; slow0 = S[20] - .3                                       # same as template.html
zero, eyes = S[26] + .3, E[27] + .4
live = np.clip((zero - t) / .05, 0, 1)
m.bed += (m.wind(.05) + m.water(.05) + m.hum(42, .02)) * live
m.bed += m.birds(.014, 1.8) * m.env(slow0, zero, 1.5, .2)
L = int(2.5 * 48000); k = np.arange(L) / 48000
horn = .12 * (np.sin(2 * np.pi * 98 * k) + .5 * np.sin(2 * np.pi * 196 * k)) * np.clip(np.minimum(k / .2, (2.5 - k) / .6), 0, 1)
m.add(S[2] + .2, horn)
b, gap = S[1], .7                                                             # heartbeat that slows toward zero
while b < zero - .3:
    if not (slow0 - .2 < b < H_knee + .2): m.thump(b, .22, 45); m.thump(b + .2, .14, 45)
    b += gap; gap = min(1.4, gap * 1.012)
m.duck(slow0 - .1, H_knee); m.heartbeat(slow0, H_knee, .35)
m.place_fx()
L = int(1.4 * 48000); k = np.arange(L) / 48000                                # the whistle
m.add(S[18] + .15, .12 * np.sin(2 * np.pi * 2900 * k) * (1 + .3 * np.sin(2 * np.pi * 30 * k)) * np.clip(np.minimum(k / .03, (1.4 - k) / .3), 0, 1))
m.bed *= live; m.fx *= np.clip((zero - t) / .05, 0, 1) + (t > eyes - .05)    # silence from zero until the eyes
m.thump(eyes, .5, 45)
m.bed += m.lp(m.rng.standard_normal(m.n), .6) * .02 * m.env(S[28] - .2, E[28] + .3, .1, .3)   # radio crackle
m.add(S[28] - .5, horn * .5)
for s in (S[1] - .3, S[8] + .3, S[22]): m.boom(s)
m.write()
