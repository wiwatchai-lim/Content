# EP07 bed + SFX, synthesised (deterministic): a condo room at night — air-con hum, a wall clock ticking, phone buzzes,
# three knocks on the door, low hits on your name, wind in the curtain, the deadbolt turning, the name again.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(7)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
def add(buf, s0, y):
    i0 = int(s0*SR); m = min(len(y), len(buf)-i0); buf[i0:i0+m] += y[:m]
# room tone: low-passed noise (computed at 1/8 rate then upsampled for speed)
m = n//8+1; rn = lp(rng.standard_normal(m), .03); rn = np.interp(np.arange(n)/8, np.arange(m), rn)
room = rn/np.abs(rn).max()*.035
aircon = (.022*np.sin(2*np.pi*60*t)+.01*np.sin(2*np.pi*120*t))*(.8+.2*np.sin(2*np.pi*t/9))
drone = .02*np.sin(2*np.pi*41.2*t)*(.6+.4*np.sin(2*np.pi*t/13))
tick = np.zeros(n)
for s0 in np.arange(0.8, 97.0, 1.0):
    L = int(.03*SR); k = np.arange(L)/SR
    add(tick, s0, .05*np.exp(-k*260)*np.sin(2*np.pi*(2600 if int(s0) % 2 else 2100)*k))
bed = room+aircon+drone+tick
bed *= np.clip(np.minimum(t/1.5, (97.4-t)/1.0), 0, 1)
fx = np.zeros(n)
# phone buzz: two short 170 Hz buzzes
for s0 in (4.65, 87.8):
    for d in (0, .35):
        L = int(.22*SR); k = np.arange(L)/SR
        add(fx, s0+d, .09*np.sign(np.sin(2*np.pi*170*k))*np.sin(np.pi*k/.22)**.5)
# knocks on a wooden door: low thump + short noise click
for s0 in (9.95, 10.45, 10.95):
    L = int(.25*SR); k = np.arange(L)/SR
    add(fx, s0, .45*np.exp(-k*28)*np.sin(2*np.pi*95*k) + .12*np.exp(-k*120)*lp(rng.standard_normal(L), .3))
# wind in the curtain: band of filtered noise, swelling
for s0, d in ((38.3, 1.6), (46.4, 1.6)):
    L = int(d*SR); k = np.arange(L)/SR
    add(fx, s0, .18*np.sin(np.pi*k/d)**2*lp(rng.standard_normal(L), .05))
# deadbolt turning: two small clicks
for s0 in (86.7, 87.3):
    L = int(.04*SR); k = np.arange(L)/SR
    add(fx, s0, .2*np.exp(-k*200)*np.sin(2*np.pi*1800*k))
# low hits: your name, the figure, the buzz, the name again
for s0 in (11.57, 78.35, 87.85, 93.96):
    L = int(1.6*SR); k = np.arange(L)/SR
    add(fx, s0, .55*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
