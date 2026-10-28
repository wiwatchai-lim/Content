# EP04 bed + SFX, synthesised (deterministic): indoors at dawn (muffled crickets + wind, the hallway clock ticking) until the door
# opens at 15.3 s; outside, crickets fade out and birds come in. A bright whoosh on the white-out, low hits on 'never stare at the sun',
# 'it is at the gate' and 'it has no shadow'.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(4)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
DOOR = 15.3
m = n//8+1; wn = lp(rng.standard_normal(m), .02); wn = np.interp(np.arange(n)/8, np.arange(m), wn)
wind = wn/np.abs(wn).max()*(.5+.5*np.sin(2*np.pi*t/9.0))*.08
drone = (.03*np.sin(2*np.pi*55*t)+.018*np.sin(2*np.pi*82.4*t+1))*(.6+.4*np.sin(2*np.pi*t/13))
cr = np.zeros(n)
for rate, f, amp, ph in [(1.3, 4400, .03, 0), (1.05, 4700, .02, .4)]:
    for s in np.arange(ph, 40, 1/rate):
        for p in range(3):
            i0 = int((s+p*.045)*SR); L = int(.03*SR)
            env = np.sin(np.linspace(0, np.pi, L))**2
            cr[i0:i0+L] += amp*env*np.sin(2*np.pi*f*np.arange(L)/SR)
cr *= np.clip((40-t)/20, 0, 1)
# birds: short frequency glides, a few species, denser later
bd = np.zeros(n)
for s in np.sort(rng.uniform(DOOR+.3, T-6, 70)):
    f0 = rng.uniform(2600, 4200); f1 = f0*rng.uniform(1.2, 1.7); notes = rng.integers(2, 5)
    for k in range(notes):
        L = int(rng.uniform(.06, .14)*SR); i0 = int((s+k*.16)*SR)
        if i0+L >= n: break
        x = np.arange(L)/L; f = f0+(f1-f0)*(x if k % 2 == 0 else 1-x)
        bd[i0:i0+L] += .028*np.sin(np.pi*x)**2*np.sin(2*np.pi*np.cumsum(f)/SR)
inside = np.clip((DOOR-t)/.3, 0, 1)
bed = (wind+cr)*(1-.75*inside)+drone*(.3+.7*inside)+bd
tick = np.zeros(n)
for s0 in np.arange(.6, DOOR-.2, 1.0):
    i0 = int(s0*SR); L = int(.03*SR); k = np.arange(L)/SR
    tick[i0:i0+L] += .07*np.exp(-k*260)*np.sin(2*np.pi*(2600 if int(s0) % 2 else 2100)*k)
bed = bed+tick
fade = np.clip(np.minimum(t/1.5, (80.2-t)/1.0), 0, 1)
bed *= fade
fx = np.zeros(n)
i0 = int((DOOR-.5)*SR); L = int(2.2*SR); k = np.arange(L)/SR   # white-out whoosh
fx[i0:i0+L] += .12*lp(rng.standard_normal(L), .25)*np.sin(np.pi*k/2.2)**2
for s0 in (46.29, 72.88, 78.13):
    i0 = int(s0*SR); L = int(1.6*SR); k = np.arange(L)/SR
    fx[i0:i0+L] += .55*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k)
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
