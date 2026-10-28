# EP06 bed + SFX, synthesised (deterministic): a dark bedroom at night — fridge hum from the next room, a wall clock ticking,
# a dog barking far away now and then, low hits on the burning eyes, the screen going black and the second face.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(6)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
# room tone: low-passed noise (computed at 1/8 rate then upsampled for speed)
m = n//8+1; rn = lp(rng.standard_normal(m), .03); rn = np.interp(np.arange(n)/8, np.arange(m), rn)
room = rn/np.abs(rn).max()*.035
fridge = (.03*np.sin(2*np.pi*50*t)+.012*np.sin(2*np.pi*100*t)+.006*np.sin(2*np.pi*150*t))*(.75+.25*np.sin(2*np.pi*t/11))
drone = .02*np.sin(2*np.pi*41.2*t)*(.6+.4*np.sin(2*np.pi*t/13))
tick = np.zeros(n)
for s0 in np.arange(0.8, 80.5, 1.0):
    i0 = int(s0*SR); L = int(.03*SR); k = np.arange(L)/SR
    tick[i0:i0+L] += .06*np.exp(-k*260)*np.sin(2*np.pi*(2600 if int(s0) % 2 else 2100)*k)
# distant dog: short muffled barks (formant-ish tone with a falling pitch), low-passed
dog = np.zeros(n)
for s0 in (5.6, 6.1, 26.3, 26.8, 27.5, 69.0, 69.45):
    i0 = int(s0*SR); L = int(.18*SR); k = np.arange(L)/SR
    f = 520-260*k/.18; ph = 2*np.pi*np.cumsum(f)/SR
    env = np.sin(np.linspace(0, np.pi, L))**1.5
    dog[i0:i0+L] += .05*env*(np.sin(ph)+.5*np.sin(2*ph)+.25*np.sin(3*ph))
dog = lp(dog, .08)
bed = room+fridge+drone+tick+dog
fade = np.clip(np.minimum(t/1.5, (81.4-t)/1.0), 0, 1)
bed *= fade
fx = np.zeros(n)
for s0 in (11.4, 69.43, 74.87, 79.4):
    i0 = int(s0*SR); L = int(1.6*SR); k = np.arange(L)/SR
    fx[i0:i0+L] += .55*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k)
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
