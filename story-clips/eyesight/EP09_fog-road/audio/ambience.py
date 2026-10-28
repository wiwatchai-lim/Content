# EP09 bed + SFX, synthesised (deterministic): inside a car on a foggy rural road before dawn — engine hum and tyre/road noise
# (quieter while the viewer does the astigmatism test), far frogs/insects, a light-switch click (high beams on 10.6, low beams 28.3),
# low hits (white wall, the shape on the road), test countdown ticks, then the brake squeal and a hit when it is at the bumper.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(9)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
def env(pts):  # piecewise-linear envelope over time
    xs, ys = zip(*pts); return np.interp(t, xs, ys)
# road noise: low-passed noise (computed at 1/8 rate then upsampled for speed)
m = n//8+1; rn = lp(rng.standard_normal(m), .05); rn = np.interp(np.arange(n)/8, np.arange(m), rn); rn /= np.abs(rn).max()
# driving level: outside shot quieter, cabin from 9.9, slower after 39 s, test 62-84 ducked, stop at the brake 91.8
drive = env([(0, .45), (9.9, .45), (10.2, 1), (39.2, 1), (41.8, .7), (62, .7), (62.6, .25), (83.6, .25), (84.2, .7), (91.7, .7), (92.8, 0), (T, 0)])
road = .06*rn*drive
rpm = 32 + 6*drive  # engine fundamental, Hz
ph = 2*np.pi*np.cumsum(rpm)/SR
engine = (.035*np.sin(ph)+.015*np.sin(2*ph)+.006*np.sin(3*ph))*(.35+.65*drive)*env([(0, 1), (95, 1), (96.3, 0), (T, 0)])
drone = .018*np.sin(2*np.pi*41.2*t)*(.6+.4*np.sin(2*np.pi*t/13))
# far frogs: short pulsed croaks now and then
frog = np.zeros(n)
for s0 in np.arange(1.3, 95, 2.7) + rng.uniform(0, 1.5, len(np.arange(1.3, 95, 2.7))):
    i0 = int(s0*SR); L = int(.09*SR); k = np.arange(L)/SR
    if i0+L < n: frog[i0:i0+L] += .012*np.sin(2*np.pi*620*k)*(np.sin(2*np.pi*55*k) > 0)*np.sin(np.linspace(0, np.pi, L))
bed = road+engine+drone+frog
bed *= np.clip(np.minimum(t/1.5, (100.0-t)/1.0), 0, 1)
fx = np.zeros(n)
def add(s0, y):
    i0 = int(s0*SR); y = y[:max(0, n-i0)]; fx[i0:i0+len(y)] += y
def hit(s0, g=.55):
    k = np.arange(int(1.6*SR))/SR; add(s0, g*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
def click(s0, g=.18):
    k = np.arange(int(.04*SR))/SR; add(s0, g*np.exp(-k*180)*np.sin(2*np.pi*1800*k))
for s0 in (10.6, 28.3): click(s0)
hit(10.7, .4); hit(31.0, .5)
for s0 in np.arange(67.9, 72.2, 1.0).tolist() + np.arange(73.65, 77.9, 1.0).tolist():
    k = np.arange(int(.03*SR))/SR; add(s0, .07*np.exp(-k*260)*np.sin(2*np.pi*2400*k))
# brake squeal: band-limited noise with a falling tone, 91.72-92.9
L = int(1.2*SR); k = np.arange(L)/SR
sq = rng.standard_normal(L); sq = sq - lp(sq, .25)  # high-passed hiss
tone = np.sin(2*np.pi*np.cumsum(2300-500*k/1.2)/SR)
add(91.72, (.05*sq+.09*tone)*np.minimum(1, k/.05)*np.clip((1.2-k)/.4, 0, 1))
hit(91.75, .6); hit(93.45, .7)
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
