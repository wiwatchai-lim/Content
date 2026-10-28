# EP08 bed + SFX, synthesised (deterministic): your room just before midnight — room tone, fridge hum, a wall clock ticking;
# knocks and a rattling lock, the door bursting open, spray hiss and the blow-back, running water at the sink,
# soft ticks for the viewer's countdown, low hits on the twist.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
J = json.load(open(f'{D}/timing.json')); T = J['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(8)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
def slow_noise(a, div=8):  # low-passed noise computed at 1/div rate, upsampled
    m = n//div+1; r = lp(rng.standard_normal(m), a); return np.interp(np.arange(n)/div, np.arange(m), r)
def put(dst, s0, y):
    i0 = int(s0*SR); L = min(len(y), n-i0)
    if L > 0: dst[i0:i0+L] += y[:L]
END = 101.3  # bed fades out before the next-episode card
room = slow_noise(.03); room = room/np.abs(room).max()*.035
fridge = (.03*np.sin(2*np.pi*50*t)+.012*np.sin(2*np.pi*100*t)+.006*np.sin(2*np.pi*150*t))*(.75+.25*np.sin(2*np.pi*t/11))
drone = .022*np.sin(2*np.pi*41.2*t)*(.6+.4*np.sin(2*np.pi*t/13))
tick = np.zeros(n)
for s0 in np.arange(0.8, END, 1.0):
    if 59 < s0 < 82: continue  # the countdown has its own ticks
    L = int(.03*SR); k = np.arange(L)/SR
    put(tick, s0, .05*np.exp(-k*260)*np.sin(2*np.pi*(2600 if int(s0) % 2 else 2100)*k))
bed = room+fridge+drone+tick
fade = np.clip(np.minimum(t/1.5, (END-t)/1.0), 0, 1)
bed *= fade
fx = np.zeros(n)
def knock(s0, g=.5):  # dull knock on wood
    L = int(.25*SR); k = np.arange(L)/SR
    y = g*np.exp(-k*28)*(np.sin(2*np.pi*95*k)+.5*np.sin(2*np.pi*190*k)) + g*.3*np.exp(-k*80)*rng.standard_normal(L)
    put(fx, s0, y)
def rattle(s0, d=.6, g=.12):  # metal lock rattle
    L = int(d*SR); k = np.arange(L)/SR
    y = g*rng.standard_normal(L)*(np.sin(2*np.pi*22*k) > .2)*np.exp(-k*2)
    put(fx, s0, np.diff(np.concatenate([[0], y]))*3)
def hit(s0, g=.55):  # low cinematic hit
    L = int(1.6*SR); k = np.arange(L)/SR
    put(fx, s0, g*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
def hiss(s0, d, g):  # spray / air
    L = int(d*SR); k = np.arange(L)/SR; w = rng.standard_normal(L); w = w-lp(w, .25)
    put(fx, s0, g*w*np.minimum(1, np.minimum(k/.03, (d-k)/.15)))
for s0 in (1.6, 1.85, 2.1, 2.9, 3.15, 5.2, 5.45, 5.7, 6.4, 6.65, 6.9): knock(s0)
for s0 in (1.6, 2.9, 5.2, 6.4): rattle(s0)
knock(7.9, .9); rattle(7.9, 1.0, .2); hit(7.95, .6)
for s0 in np.arange(10.2, 11.0, .2): hiss(s0, .14, .18)
hiss(12.9, 1.8, .14); hit(13.0, .5)
hit(16.5, .45)
# running water at the sink
L = int(8.0*SR); k = np.arange(L)/SR; w = rng.standard_normal(L); w = lp(w, .35) - lp(w, .05)
put(fx, 39.3, .25*w*(.8+.2*np.sin(2*np.pi*3.3*k))*np.minimum(1, np.minimum(k/.4, (8.0-k)/.8)))
# countdown ticks (test): one per second
for s0 in list(np.arange(68.7, 74.6, 1.0)) + list(np.arange(77.2, 81.7, 1.0)):
    L = int(.05*SR); k = np.arange(L)/SR; put(fx, s0, .12*np.exp(-k*120)*np.sin(2*np.pi*1500*k))
hit(96.1, .4); hit(97.7, .75); hiss(97.65, .5, .1)
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
