# Z09 bed + SFX (shared kit ../../_shared/sfx.py): the canal behind the temple and the Chao Phraya at night — water lapping,
# a long-tail engine (cut after the fight: they drift), crickets on the banks; every hit / SFX word from audio/fx.json, a
# heartbeat under the slow-mo, dawn birds near the fort, and the quiet bite at the pier. No music.
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '_shared'))
from sfx import Mix
m = Mix(D, seed=9); S, E, t = m.S, m.E, m.t
m.bed += m.water(.05) + m.crickets(.01, 1.1) * m.env(-1, S[18], .1, .5)
m.bed += m.engine(S[3] + .3, S[18] - .2, .1, 60, 25)          # long-tail running from "ติดแล้ว!" until they cut it
m.bed += m.wind(.03) * m.env(S[6], S[18], .5, .5)
m.bed += m.birds(.012, 2.2) * m.env(S[21] - .1, m.T + 1, .6, .1)
B12, SM0, H9 = S[16] - 1.4, S[16] - .5, E[16] + .35            # same as template.html
m.duck(SM0 - .1, H9); m.heartbeat(SM0, H9)
m.place_fx()
for s0 in (S[1] + .2, S[1] + .6): m.click(s0, .25)            # starter cord
for s in (S[2], S[9], S[22], S[25] + .3, S[27] + .55): m.boom(s)
m.write()
