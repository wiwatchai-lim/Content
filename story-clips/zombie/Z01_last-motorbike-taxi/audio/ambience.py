# Z01 bed + SFX, synthesised (deterministic): rush-hour chaos at Victory Monument — traffic rumble, horns, distant screams,
# a siren; motorbike engine on the rides; hits synced to the composition (same formulas as template.html); slow-mo heartbeat;
# car alarm from the elbow hit until the shutter slams; quiet shop room tone and radio static at the end. No music.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
J = json.load(open(f'{D}/timing.json')); T = J['total']; n = int(T*SR); t = np.arange(n)/SR
S = {c['n']: c['start'] for c in J['cues']}; E = {c['n']: c['end'] for c in J['cues']}
rng = np.random.default_rng(1)
def lp(x, a):
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
def slow_noise(a, k=8):
    m = n//k+1; r = lp(rng.standard_normal(m), a); return np.interp(np.arange(n)/k, np.arange(m), r)
def env(t0, t1, fi=.3, fo=.3):
    return np.clip(np.minimum((t-t0)/fi, (t1-t)/fo), 0, 1)
def add(buf, s0, y):
    i0 = int(s0*SR); y = y[:max(0, n-i0)]; buf[i0:i0+len(y)] += y
inside = S[23]-.05; shop = S[22]-.05
# city: low rumble + mid hiss, loud outside, gone inside the shop
city = slow_noise(.02); city = city/np.abs(city).max()*.09
hiss = slow_noise(.25, 2); hiss = hiss/np.abs(hiss).max()*.025
out_env = np.clip((shop+1.8-t)/0.15, 0, 1)
bed = (city+hiss)*out_env
fx = np.zeros(n)
# horns, screams, siren (outside part)
for s0 in (1.2, 3.9, 9.5, 20.2, 23.8, 27.5, 59.0, 62.5, 66.0):
    L = int(.45*SR); k = np.arange(L)/SR; f = 420 if s0 % 2 > 1 else 360
    add(fx, s0, .05*np.sin(np.pi*k/.45)**.3*(np.sign(np.sin(2*np.pi*f*k))*.5+np.sin(2*np.pi*f*1.26*k)*.5))
for s0 in (0.6, 2.4, 6.8, 11.0, 22.6, 26.3, 45.0, 58.4, 63.4):
    L = int(1.1*SR); k = np.arange(L)/SR; f = 900+500*np.sin(np.pi*k/1.1)+40*np.sin(2*np.pi*6*k)
    y = np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*k/1.1)**2*.025
    add(fx, s0, lp(y, .3))
sir = .02*np.sin(2*np.pi*np.cumsum(700+250*np.sin(2*np.pi*t/3.2))/SR)*np.clip(np.minimum((t-4)/3, (shop-t)/2), 0, 1)*(.5+.5*np.sin(2*np.pi*t/17))
bed += sir
# motorbike engine on the rides
def engine(t0, t1, rev=1.0):
    e = env(t0, t1, .25, .4); f = (95+40*rev*np.clip((t-t0)/1.2, 0, 1))
    ph = 2*np.pi*np.cumsum(f)/SR; y = (np.sign(np.sin(ph))*.4+np.sin(2*ph)*.3+np.sin(3*ph)*.2)
    return lp(y*e, .15)*.12
bed += engine(S[6]-.05, S[7]-.05) + engine(S[10]-.05, E[10]+.1, 1.5) + engine(S[20]-.05, shop+1.2, 1.3)
# hits
def thump(s0, g=.9, f0=70):
    L = int(.5*SR); k = np.arange(L)/SR
    y = g*np.exp(-k*9)*np.sin(2*np.pi*(f0+120*np.exp(-k*30))*k) + g*.5*np.exp(-k*60)*rng.standard_normal(L)
    add(fx, s0, y)
def clang(s0, g=.6):
    L = int(1.2*SR); k = np.arange(L)/SR
    y = g*np.exp(-k*4)*(np.sin(2*np.pi*620*k)+.6*np.sin(2*np.pi*1310*k)+.4*np.sin(2*np.pi*2270*k))/2 + g*.6*np.exp(-k*50)*rng.standard_normal(L)
    add(fx, s0, y)
def whoosh(s0, d=.5, g=.25):
    L = int(d*SR); k = np.arange(L)/SR; y = lp(rng.standard_normal(L), .25)*np.sin(np.pi*k/d)**2*g; add(fx, s0, y)
thump(S[5]+.06); whoosh(S[5]-.25, .3)
whoosh(S[10]+.6, .9, .3); thump(E[10], 1.0, 50); clang(E[10]+.02, .3)
thump(S[11]+.75); whoosh(S[11]+.6, .2)
thump(S[12]+.8, .9, 90); thump(S[12]+1.3, .5, 40)
thump(S[14]+.95, .5, 120)
clang(S[16]+.55, .7)
# slow-mo: everything ducks, heartbeat, then the elbow
s0, s1 = S[17]-.1, E[18]-.25
duck = 1-.85*np.clip(np.minimum((t-s0)/.2, (s1-t)/.05), 0, 1)
bed *= duck
for b in np.arange(s0+.2, s1-.1, .75):
    thump(b, .35, 45); thump(b+.22, .22, 45)
thump(s1, 1.0, 80); whoosh(s1-.2, .25)
# car alarm from the elbow until the shutter slams
slam = shop+1.75
alarm = (np.sign(np.sin(2*np.pi*np.where((t*2.5) % 1 < .5, 900, 1250)*t))*.035)*np.clip(np.minimum((t-s1-.3)/.1, (slam-t)/.05), 0, 1)
bed += lp(alarm, .4)
thump(slam, .9, 60); clang(slam, .5)
# inside: room tone, breathing, groans outside, radio static
room = slow_noise(.03); room = room/np.abs(room).max()*.03*np.clip((t-slam)/.3, 0, 1)
bed += room
for b in np.arange(slam+.5, S[25], 1.1):
    L = int(.6*SR); k = np.arange(L)/SR; add(fx, b, lp(rng.standard_normal(L), .12)*np.sin(np.pi*k/.6)**2*.06)
for g0 in (S[23]+1.5, S[24]+.8, S[26]+1.0, S[27]+.6):
    L = int(1.4*SR); k = np.arange(L)/SR; f = 85+15*np.sin(2*np.pi*1.3*k)
    add(fx, g0, lp(np.sin(2*np.pi*np.cumsum(f)/SR)*(1+.5*rng.standard_normal(L))*np.sin(np.pi*k/1.4)**2*.06, .05))
st = rng.standard_normal(n)*.03*env(S[25]-.3, E[25]+.4, .2, .4)
bed += lp(st, .6)
# low hits on the reveals
for s in (S[1]-.4, S[4], S[15]+.3, S[19], S[26]+.6, S[27]+1.5, S[28]+.55):
    L = int(1.6*SR); k = np.arange(L)/SR; add(fx, s, .5*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
fade = np.clip(np.minimum(t/.3, (T-t)/1.0), 0, 1)
out = np.clip((bed+fx)*fade, -1, 1)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.repeat(out, 2)*32767).astype(np.int16).tobytes())
print('ok', T)
