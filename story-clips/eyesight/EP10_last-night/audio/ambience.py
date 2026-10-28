# EP10 bed + SFX, synthesised (deterministic): the village edge just before dawn — crickets and wind, a low drone, running footsteps,
# a wooden door + bolt, an oil-lamp room, nails scraping glass, then birds and a far rooster when the sky lightens. Low hits on the twists.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(10)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
def env(a, b, fi=1.0, fo=1.0):  # 0..1 window from a to b with fades
    return np.clip(np.minimum((t-a)/fi, (b-t)/fo), 0, 1)
DAWN = 77.8; END = 103.2
# wind: low-passed noise at 1/8 rate, slow swell
m = n//8+1; wn = lp(rng.standard_normal(m), .02); wn = np.interp(np.arange(n)/8, np.arange(m), wn)
wind = wn/np.abs(wn).max()*.05*(.6+.4*np.sin(2*np.pi*t/9))
# crickets: 4.4 kHz chirps in trains, fading out at dawn
cr = np.zeros(n)
for s0 in np.arange(0.2, DAWN, 0.62):
    for k in range(3):
        i0 = int((s0+k*.045+rng.uniform(0, .01))*SR); L = int(.03*SR); kk = np.arange(L)/SR
        if i0+L < n: cr[i0:i0+L] += .022*np.sin(np.pi*kk/.03)*np.sin(2*np.pi*4400*kk)
cr *= np.clip((DAWN+2-t)/3, 0, 1)
drone = .025*np.sin(2*np.pi*41.2*t)*(.6+.4*np.sin(2*np.pi*t/13))*np.clip((DAWN+1-t)/3, .25, 1)
# test screen (43.3-64.5): bed drops, a soft clock tick
quiet = 1-.6*env(43.3, 64.5, .8, .8)
tick = np.zeros(n)
for s0 in np.arange(51.4, 58.3, 1.0):
    i0 = int(s0*SR); L = int(.03*SR); k = np.arange(L)/SR
    tick[i0:i0+L] += .07*np.exp(-k*260)*np.sin(2*np.pi*2300*k)
# dawn: birds (short rising/falling chirps) + a far, muffled rooster
birds = np.zeros(n)
for s0 in np.arange(DAWN+.6, END, .9):
    s1 = s0+rng.uniform(0, .5); i0 = int(s1*SR); L = int(.09*SR); k = np.arange(L)/SR
    f = 3200+rng.choice([-1, 1])*1400*k/.09; ph = 2*np.pi*np.cumsum(f)/SR
    if i0+L < n: birds[i0:i0+L] += .03*np.sin(np.pi*k/.09)*np.sin(ph)
rooster = np.zeros(n)
for s0, notes in ((79.2, ((.16, 560, 600), (.16, 600, 640), (.22, 640, 700), (.75, 700, 520))),):
    tt = s0
    for d, f0, f1 in notes:
        i0 = int(tt*SR); L = int(d*SR); k = np.arange(L)/SR
        f = f0+(f1-f0)*k/d; ph = 2*np.pi*np.cumsum(f)/SR
        e = np.sin(np.pi*k/d)**.7
        rooster[i0:i0+L] += .06*e*(np.sin(ph)+.6*np.sin(2*ph)+.35*np.sin(3*ph)+.2*np.sin(4*ph)); tt += d+.03
rooster = lp(rooster, .12)
bed = (wind+cr+drone)*quiet+tick+birds+rooster
bed *= np.clip(np.minimum(t/1.5, (END+.8-t)/1.2), 0, 1)
fx = np.zeros(n)
def add(s0, y):
    i0 = int(s0*SR); fx[i0:i0+len(y)] += y[:max(0, n-i0)]
# running footsteps on dirt
for s0 in np.arange(0.6, 5.0, .34):
    L = int(.09*SR); k = np.arange(L)/SR
    add(s0, .22*np.exp(-k*45)*np.sin(2*np.pi*(90+40*np.exp(-k*30))*k)*(.7+.3*rng.random()))
# door creak (5.2) and bolt (8.3)
L = int(1.1*SR); k = np.arange(L)/SR; f = 300+120*np.sin(2*np.pi*1.3*k); ph = 2*np.pi*np.cumsum(f)/SR
add(5.2, lp(.05*np.sin(np.pi*k/1.1)*np.sign(np.sin(ph))*(1+.3*rng.standard_normal(L)), .25))
L = int(.25*SR); k = np.arange(L)/SR
add(8.3, .4*np.exp(-k*30)*np.sin(2*np.pi*140*k)+.15*np.exp(-k*60)*rng.standard_normal(L))
# nails scraping glass (65.0-67.4): resonant squeals with jitter
for s0, d in ((65.0, .7), (65.9, .6), (66.7, .8)):
    L = int(d*SR); k = np.arange(L)/SR
    f = 1900+500*k/d+60*np.sin(2*np.pi*31*k); ph = 2*np.pi*np.cumsum(f)/SR
    add(s0, .07*np.sin(np.pi*k/d)*(np.sin(ph)+.4*np.sin(2.01*ph))*(1+.5*lp(rng.standard_normal(L), .3)))
# paper rustle as the talisman unfolds (11.9) and glasses unfolding click (72.6)
L = int(.8*SR); k = np.arange(L)/SR
add(11.9, .06*np.sin(np.pi*k/.8)*lp(rng.standard_normal(L), .5))
L = int(.04*SR); k = np.arange(L)/SR
for s0 in (72.6, 72.85): add(s0, .12*np.exp(-k*200)*np.sin(2*np.pi*3000*k))
# low hits
for s0 in (9.7, 65.0, 75.6, 101.1):
    L = int(1.6*SR); k = np.arange(L)/SR
    add(s0, .55*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
# the last word: a soft rising shimmer (76.9)
L = int(1.4*SR); k = np.arange(L)/SR
add(76.8, .05*np.sin(np.pi*k/1.4)*(np.sin(2*np.pi*(660+200*k)*k)+np.sin(2*np.pi*(990+300*k)*k)))
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
