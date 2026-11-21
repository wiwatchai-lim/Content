# EP01 sound bed (shared synth kit from the zombie series, numpy only, no music — the user adds music later):
# canal night outside, quiet room + crickets + clock tick in the shop, the door bell at 2 am, a soft shimmer when grandma
# appears and leaves, the lens grinder through the night, birds at dawn, pen + chime on "จ่ายแล้ว", street morning, low hit on the end card.
import os, sys
import numpy as np
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..', '..', 'zombie', '_shared'))
from sfx import Mix, SR
m = Mix(D, seed=21); S, E, t = m.S, m.E, m.t
shop0, bench0, dawn0, ledger0, day0, end0 = S[3] - .3, S[11] - .4, S[14] - .7, S[21] - .6, S[24] - .6, S[27] - .5
night = m.env(0, dawn0, 1.0, 1.5)
m.bed += m.water(.03) * m.env(0, shop0 + .4, .5, .6) + m.wind(.02) * m.env(0, shop0 + .4)
m.bed += m.room(.025) * m.env(shop0, ledger0 + .5, .6, .8)
m.bed += m.crickets(.008, 1.1) * night
m.bed += m.drone(55, .012) * m.env(shop0, dawn0, 2, 2) + m.drone(82.5, .006) * m.env(S[5], S[11], 2, 2)
m.bed += m.birds(.012, 1.6) * m.env(dawn0, ledger0, 2, 1) + m.birds(.016, 1.2) * m.env(day0, end0, 1, 1) + m.city(.03) * m.env(day0, end0, 1, 1)
for k in np.arange(shop0, dawn0, 1.0):                                    # clock tick
    if not (bench0 < k < dawn0) or True: m.click(k, .05)
# shop bell "กริ๊ง" at 2 am
def chime(s0, f, g=.18, d=2.5):
    L = int(d * SR); k = np.arange(L) / SR
    y = sum(a * np.sin(2 * np.pi * f * r * k) for a, r in ((1, 1), (.5, 2.76), (.25, 5.4))) * np.exp(-k * 2.2)
    for j in range(3): m.add(s0 + j * .09, g * y * (.8 ** j))
chime(S[3] + 1.7, 1760); chime(S[3] + 1.95, 1975, .12)
def shimmer(s0, d=2.2, g=.05):
    L = int(d * SR); k = np.arange(L) / SR; e = np.sin(np.pi * k / d) ** 2
    m.add(s0, g * e * sum(np.sin(2 * np.pi * f * k + 3 * np.sin(2 * np.pi * .7 * k)) for f in (880, 1320, 1760)))
shimmer(S[5] + .2); shimmer(S[19] + 1.4, 1.8, .06)
m.engine(S[12] - .2, E[13], .06, 120, 30)                                 # lens grinder
for d in (0, .9, 2.6): m.click(S[12] + d, .12)                             # the lamp buzzing on/off
m.whoosh(S[8] - .3, .5, .1); m.whoosh(S[15] - .3, .6, .08)               # glasses / letter in
m.scrape(S[22] + .1, E[22] - S[22], .02)                                  # grandpa's pen
chime(E[23] - 1.0, 1320, .1); m.boom(E[23] - 1.0, .25)
m.whoosh(S[26] - .4, .6, .08)
m.boom(end0 + .3, .4)
m.write(fade_in=1.0, fade_out=1.5)
