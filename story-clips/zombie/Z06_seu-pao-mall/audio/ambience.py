# Z06 bed + SFX (shared kit ../../_shared/sfx.py): Seu Pao's mall at night — generator thrum, a karaoke beat leaking from
# upstairs, the gang's room tone; the street outside full of runners; every hit / SFX word from audio/fx.json, a heartbeat
# under the slow-mo, then the quiet storeroom and the laugh in the dark. No music beyond the diegetic karaoke thump.
import os, sys
import numpy as np
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '_shared'))
from sfx import Mix
m = Mix(D, seed=6); S, E, t = m.S, m.E, m.t
F0 = E[10] + .1; SM0, SM1 = S[17] - .15, E[17] + .05                          # same as template.html
inside = m.env(S[4] - .1, S[19] - .1, .3, .5)
m.bed += m.city(.05) * m.env(-1, S[4], .1, .4) + m.engine(-1, S[3] - .1, .08, 70, 10)   # outside + the pickup
m.bed += (m.hum(60, .02) + m.room(.025)) * inside
beat = np.zeros(m.n)
for b in np.arange(S[4], S[11], .5): m.add(b, .25 * np.exp(-np.arange(int(.15 * 48000)) / 48000 * 30) * np.sin(2 * np.pi * 55 * np.arange(int(.15 * 48000)) / 48000), beat)
m.bed += m.lp(beat, .2) * .5
m.bed += m.crickets(.008, 1.2) * m.env(S[9] - .1, S[11], .2, .2)
m.duck(SM0 - .1, SM1); m.heartbeat(SM0, SM1)
m.place_fx()
m.breath(S[19], S[22], 1.1, .05)
m.bed += m.room(.02) * m.env(S[19] - .1, m.T + 1, .3, .1)
for s in (S[1] - .3, S[7], S[9], S[17], S[24], S[26] + .55): m.boom(s)
m.write()
