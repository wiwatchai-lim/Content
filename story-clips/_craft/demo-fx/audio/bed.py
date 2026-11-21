# Sound for the fx demo — every layer from FX.md Part 2 with the real SFX library (../../sfxlib) via ../../sound.py.
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(D, '..', '..'))
from sound import Bed, names, sub, riser, drone, reverse, tone, load
have = set(names())
b = Bed(25)
def H(n, *a, **k):            # play if the library has it (library may still be growing)
    if n in have: b.hit(n, *a, **k)
    else: print('missing', n)
def A(n, *a, **k):
    if n in have: b.amb(n, *a, **k)
    else: print('missing', n)

# 1. rainy street 0–5.5: rain + canal + wind, footsteps on each walk contact panning with the character, thunder after the flash
A('rain-on-roof', 0, 5.9, -16); A('canal-water-lapping', 0, 5.9, -26, pan=-.3); A('wind-howling', 0, 5.9, -30)
steps = [.4 + i * .5 for i in range(8)]
if 'footsteps-gravel' in have: b.steps('footsteps-gravel', steps, -20, pan_from=.55, pan_to=-.2)
H('thunder', 2.6, -6, wet=.1)
# J-cut: the shop's room tone and clock start before the picture (dip at 5.2–5.8)
A('room-tone', 5.0, 11.2, -28); A('clock-ticking', 5.0, 11.2, -24, pan=.2)
A('rain-on-roof', 5.5, 11.2, -30, lowpass=900)            # the rain outside, muffled through the walls
# 2. flicker = electrical clicks; ghost: reversed swell INTO the appearance, shimmer while she rises, low drone under
for t in (6.3, 7.1, 8.0, 9.6): H('electric-buzz', t, -22, pan=.5, max_len=.5, fade_out=.2)
A('horror-drone', 6.0, 11.0, -24)
y = load('reverse-cymbal') if 'reverse-cymbal' in have else reverse(load('ghost-whoosh')) if 'ghost-whoosh' in have else None
if y is not None: b.synth(7.2 - len(y) / 48000, y, -14)
H('magic-sparkle', 7.2, -18, pan=.5); H('shimmer', 7.4, -20, pan=.5)
b.synth(6.5, drone(4.4, 49), -18)
# 3. impact: silence before (duck), hit on the frame, cartoon boing on the jump, debris of the comic text
b.duck(8.55, 9.0, -20, ramp=.2)
H('impact-boom', 9.0, -4); b.synth(9.0, sub(1.4), -6); H('cartoon-boing', 9.05, -12)
H('glitch', 10.85, -12)
# 4. memory: muffled, warm, music-box-like chimes, page turn, distant children; film projector hum
A('kids-playing', 11.1, 17.0, -30, lowpass=2500)
for i, t in enumerate((11.4, 12.4, 13.4, 14.4, 15.4)): b.synth(t, tone([1047, 1319, 1568, 1319, 1175][i], 1.6, 2.5), -24, pan=(i - 2) * .2)
H('page-turn', 11.2, -16); H('letter-unfold', 13.0, -18)
b.muffle(11.1, 17.0, 1800)
H('whoosh', 16.7, -14)                                    # into the white dip
# 5. dawn: birds + rooster + gentle wind chime; a soft sub on the iris close
A('morning-birds', 17.1, 25, -20); H('rooster-crow', 18.2, -22, pan=.7, wet=.4); H('wind-chime', 19.0, -20, pan=.5)
b.synth(23.4, sub(1.6, 44), -10)
b.room('room')
b.write(os.path.join(D, 'bed.wav'))
