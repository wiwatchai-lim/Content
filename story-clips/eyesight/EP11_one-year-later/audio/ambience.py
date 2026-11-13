# EP11 bed + SFX, synthesised (deterministic): night street, then a clinic after hours — fluorescent hum, a low drone, the machine's soft beeps and
# button clicks, a printer, paper. Low hits on the twists. No music.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(11)
def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
def env(a, b, fi=1.0, fo=1.0):  # 0..1 window from a to b with fades
    return np.clip(np.minimum((t-a)/fi, (b-t)/fo), 0, 1)
END = 103.4
# street: crickets outside only
cr = np.zeros(n)
for s0 in np.arange(0.2, 6.0, 0.62):
    for k in range(3):
        i0 = int((s0+k*.045+rng.uniform(0, .01))*SR); L = int(.03*SR); kk = np.arange(L)/SR
        if i0+L < n: cr[i0:i0+L] += .02*np.sin(np.pi*kk/.03)*np.sin(2*np.pi*4400*kk)
# clinic: mains hum and a thin buzz from the tubes; drone grows toward the twist
hum = (.012*np.sin(2*np.pi*100*t)+.004*np.sin(2*np.pi*200*t)+.002*np.sin(2*np.pi*3000*t)*(.6+.4*np.sin(2*np.pi*7*t)))*env(5.2, END, 1.2, .8)
drone = .025*np.sin(2*np.pi*41.2*t)*(.6+.4*np.sin(2*np.pi*t/13))*np.clip((t-2)/4, 0, 1)*(1+1.2*env(89, 100.2, 3, .3))
# test screen (42.4-68.6): bed drops, a soft clock tick during the pause
quiet = 1-.6*env(42.4, 68.6, .8, .8)
tick = np.zeros(n)
for s0 in np.arange(53.7, 59.6, 1.0):
    i0 = int(s0*SR); L = int(.03*SR); k = np.arange(L)/SR
    tick[i0:i0+L] += .07*np.exp(-k*260)*np.sin(2*np.pi*2300*k)
bed = (cr+hum+drone)*quiet+tick
bed *= np.clip(np.minimum(t/1.5, (END+.3-t)/.8), 0, 1)
fx = np.zeros(n)
def add(s0, y):
    i0 = int(s0*SR); fx[i0:i0+len(y)] += y[:max(0, n-i0)]
# footsteps on the pavement, door (5.0)
for s0 in np.arange(0.7, 4.8, .5):
    L = int(.09*SR); k = np.arange(L)/SR
    add(s0, .16*np.exp(-k*50)*np.sin(2*np.pi*(110+40*np.exp(-k*30))*k))
L = int(.25*SR); k = np.arange(L)/SR
add(5.0, .25*np.exp(-k*30)*np.sin(2*np.pi*170*k)+.1*np.exp(-k*60)*rng.standard_normal(L))
# lights switching off in the waiting room
for s0 in (7.0, 7.8, 8.6):
    L = int(.04*SR); k = np.arange(L)/SR; add(s0, .1*np.exp(-k*150)*rng.standard_normal(L))
# machine: a short beep with each light, a click on each press (same times as DOTS in index.html)
for s0 in (14.7, 15.4, 16.1, 16.9, 17.6, 18.3):
    L = int(.09*SR); k = np.arange(L)/SR; add(s0, .05*np.sin(np.pi*k/.09)*np.sin(2*np.pi*1200*k))
    L = int(.03*SR); k = np.arange(L)/SR; add(s0+.3, .12*np.exp(-k*220)*np.sin(2*np.pi*2600*k))
# printer (18.9-20.6): a stepped buzz
L = int(1.7*SR); k = np.arange(L)/SR
add(18.9, .05*np.sign(np.sin(2*np.pi*320*k))*(np.sin(2*np.pi*14*k) > 0)*np.sin(np.pi*k/1.7)**.3)
# paper (89.8), low hits
L = int(.8*SR); k = np.arange(L)/SR
add(89.8, .06*np.sin(np.pi*k/.8)*lp(rng.standard_normal(L), .5))
for s0 in (19.0, 92.0, 94.9, 100.2):
    L = int(1.6*SR); k = np.arange(L)/SR
    add(s0, .55*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
