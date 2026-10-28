# EP03 bed + SFX, synthesised (deterministic): crickets + wind outside (muffled once you're in the car), engine hum while driving,
# EP03: crickets + wind outside the house, muffled indoors (8 s); a wall clock ticking in the hallway; low hits on 'it's in your eye',
# the retina warning and the reveal.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(3)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
# wind: low-passed noise with slow swell (computed at 1/8 rate then upsampled for speed)
m = n//8+1; wn = lp(rng.standard_normal(m), .02); wn = np.interp(np.arange(n)/8, np.arange(m), wn)
wind = wn/np.abs(wn).max()*(.5+.5*np.sin(2*np.pi*t/9.0))*.10
drone = (.035*np.sin(2*np.pi*55*t)+.02*np.sin(2*np.pi*82.4*t+1))*(.6+.4*np.sin(2*np.pi*t/13))
# crickets: 4.4 kHz chirps, 3 pulses per chirp, a few insects at different rates
cr = np.zeros(n)
for k, (rate, f, amp, ph) in enumerate([(1.3, 4400, .035, 0), (1.05, 4700, .025, .4), (1.6, 4150, .02, .8)]):
    for s in np.arange(ph, T, 1/rate):
        for p in range(3):
            i0 = int((s+p*.045)*SR); L = int(.03*SR)
            if i0+L >= n: break
            env = np.sin(np.linspace(0, np.pi, L))**2
            cr[i0:i0+L] += amp*env*np.sin(2*np.pi*f*np.arange(L)/SR)
inside = np.clip((t-8.0)/.6, 0, 1)
bed = (wind+cr)*(1-.8*inside)+drone*(.4+.6*inside)
tick = np.zeros(n)
for s0 in np.arange(8.6, 89.0, 1.0):
    i0 = int(s0*SR); L = int(.03*SR); k = np.arange(L)/SR
    tick[i0:i0+L] += .07*np.exp(-k*260)*np.sin(2*np.pi*(2600 if int(s0) % 2 else 2100)*k)
bed = bed+tick*inside
fade = np.clip(np.minimum(t/1.5, (89.4-t)/1.0), 0, 1)
bed *= fade
fx = np.zeros(n)
for s0 in (27.53, 43.44, 85.15):
    i0 = int(s0*SR); L = int(1.6*SR); k = np.arange(L)/SR
    fx[i0:i0+L] += .55*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k)
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
