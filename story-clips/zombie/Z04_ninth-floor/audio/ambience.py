# Z04 bed + SFX (shared kit ../../_shared/sfx.py): dawn wind on the rail, then the dead hospital — hum, a far alarm, wind
# down the lift shaft — every hit / SFX word from audio/fx.json, a heartbeat under the slow-mo, and the quiet wait. No music.
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '_shared'))
from sfx import Mix
m = Mix(D, seed=4); S, E, t = m.S, m.E, m.t
out = m.env(-1, S[4] + .2, .1, .4)                  # rail walk + hospital front: outdoors at dawn
inside = m.env(S[5] - .1, S[24] - .1, .3, .5)       # hospital interior
shaft = m.env(S[8] - .1, S[13] - .1, .3, .3)        # lift shaft: hollow wind
m.bed += (m.wind(.06) + m.birds(.012, 2.3)) * out
m.bed += (m.room(.03) + m.hum(50, .02) + m.alarm(.006, 700, 900, 1.2)) * inside
m.bed += m.wind(.07) * shaft + m.drone(38, .03) * shaft
m.bed += (m.wind(.04) + m.birds(.015, 1.9)) * m.env(S[24] - .1, m.T + 1, .4, .1)   # window: morning outside
SM0, SM1 = E[13] + 1.3, E[13] + 4.3                 # slow-mo runner (same as template.html)
m.duck(SM0 - .1, SM1); m.heartbeat(SM0, SM1)
m.place_fx()
m.breath(S[19], S[22], 1.0, .05)                    # the wait: breathing, then the timer
for b in [x for x in [S[20] + i * .5 for i in range(40)] if x < S[23]]: m.click(b, .08)
for s in (S[1] - .3, S[18], S[23], S[25] + .55): m.boom(s)
m.write()
