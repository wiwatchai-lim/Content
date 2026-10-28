# Z03 bed + SFX, synthesised (deterministic): a stuck BTS train on the viaduct at 2:30 a.m. — wind, far alarms and a helicopter,
# the emergency-power hum and buzzing lights; fight hits on the same H formulas as template.html; slow-mo heartbeat; the jump,
# the breather, then silence and a rising groan from the street below. No music.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
J = json.load(open(f'{D}/timing.json')); T = J['total']; n = int(T*SR); t = np.arange(n)/SR
S = {c['n']: c['start'] for c in J['cues']}; E = {c['n']: c['end'] for c in J['cues']}
rng = np.random.default_rng(2)
def lp(x, a):
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += a*(x[i]-acc); y[i] = acc
    return y
def slow_noise(a, k=8):
    m = n//k+1; r = lp(rng.standard_normal(m), a); return np.interp(np.arange(n)/k, np.arange(m), r)
def add(buf, s0, y):
    i0 = int(s0*SR); y = y[:max(0, n-i0)]; buf[i0:i0+len(y)] += y
H = dict(slam=S[1]+.15, pin=S[10]-2.2, helm=S[10]-1.0, kick=S[11]-2.0, elbow=S[11]-.8, bar=S[12]-1.7, knee=S[12]-.7,
         dom1=S[13]-2.5, dom2=S[13]-2.2, teeth=S[13]-1.2, duck=E[13]+.25, swing=S[14]-.45, door1=S[15]-1.8, door2=S[15]-1.2,
         lever=E[15]+.1, trip=S[16]-.9, land=S[17]-.35)
H['slowA'] = H['duck']+.45
car0, car1 = S[5]-.05, S[16]+.9
inside = np.clip(np.minimum((t-car0)/.2, (car1-t)/.2), 0, 1)
wind = slow_noise(.06, 4); wind = wind/np.abs(wind).max()*.06
hum = (.03*np.sin(2*np.pi*100*t)+.012*np.sin(2*np.pi*200*t))*(.8+.2*np.sin(2*np.pi*t/3))
buzz = .008*np.sign(np.sin(2*np.pi*120*t))*(np.sin(2*np.pi*t*.7) > .6)
heli = .03*np.abs(np.sin(2*np.pi*11*t))*lp(rng.standard_normal(n), .05)*np.clip(1-np.abs(t-30)/40, 0, 1)
alarm = .012*np.sin(2*np.pi*np.where((t*1.2) % 1 < .5, 800, 1000)*t)
calm = np.clip(np.minimum((t-S[20])/.3, 1), 0, 1)  # the street goes silent at line 20
bed = (wind*(1-.6*inside) + (hum+buzz)*inside + heli*(1-inside) + alarm*(1-inside))*(1-.9*calm*(t < S[21]))
fx = np.zeros(n)
def thump(s0, g=.9, f0=70):
    L = int(.5*SR); k = np.arange(L)/SR
    add(fx, s0, g*np.exp(-k*9)*np.sin(2*np.pi*(f0+120*np.exp(-k*30))*k) + g*.5*np.exp(-k*60)*rng.standard_normal(L))
def clang(s0, g=.6, f=620):
    L = int(1.2*SR); k = np.arange(L)/SR
    add(fx, s0, g*np.exp(-k*4)*(np.sin(2*np.pi*f*k)+.6*np.sin(2*np.pi*f*2.1*k)+.4*np.sin(2*np.pi*f*3.7*k))/2 + g*.6*np.exp(-k*50)*rng.standard_normal(L))
def glass(s0, g=.6, d=1.4):
    L = int(d*SR); k = np.arange(L)/SR; y = np.zeros(L)
    for _ in range(40):
        i = int(rng.random()**2*L*.8); m = int(.05*SR); kk = np.arange(m)/SR; f = 2500+rng.random()*5000
        y[i:i+m] += np.exp(-kk*60)*np.sin(2*np.pi*f*kk)*(.5+rng.random())
    add(fx, s0, g*(y/8 + np.exp(-k*12)*rng.standard_normal(L)*.6))
def whoosh(s0, d=.4, g=.25):
    L = int(d*SR); k = np.arange(L)/SR; add(fx, s0, lp(rng.standard_normal(L), .25)*np.sin(np.pi*k/d)**2*g)
def snarl(s0, g=.08, d=1.0):
    L = int(d*SR); k = np.arange(L)/SR; f = 110+30*np.sin(2*np.pi*2.3*k)
    add(fx, s0, lp(np.sin(2*np.pi*np.cumsum(f)/SR)*(1+.8*rng.standard_normal(L))*np.sin(np.pi*k/d)**2*g, .08))
thump(H['slam'], .9, 120); glass(H['slam'], .15, .4)
for s0 in (S[7]+.2, S[9]+.5, H['kick']-1.0, H['bar']-1.3, S[12]+.3, H['teeth']-.6, H['trip']-.3): snarl(s0)
for s0 in np.arange(H['bar']-1.25, H['bar'], .14): thump(s0, .12, 160)   # runner footfalls on the metal floor
clang(H['pin'], .55); thump(H['helm'], .9); thump(H['kick'], 1.0, 50); thump(H['elbow'], .9, 90)
clang(H['bar'], .6, 480); thump(H['bar'], .6, 60); thump(H['knee'], .9)
thump(H['dom1'], .9, 55); thump(H['dom2'], .9, 50)
L = int(.08*SR); k = np.arange(L)/SR; add(fx, H['teeth'], .3*np.exp(-k*90)*rng.standard_normal(L))   # teeth on the pole
clang(H['duck'], .6, 640)
s0, s1 = H['slowA']-.1, H['swing']
duck = 1-.8*np.clip(np.minimum((t-s0)/.2, (s1-t)/.05), 0, 1); bed *= duck
for b in np.arange(s0+.2, s1-.1, .75): thump(b, .3, 45); thump(b+.22, .2, 45)
L = int(1.0*SR); k = np.arange(L)/SR; add(fx, s0+.3, lp(np.sin(2*np.pi*np.cumsum(140+20*np.sin(2*np.pi*9*k))/SR)*np.sin(np.pi*k)*.06, .1))  # dog growl
thump(H['swing'], 1.0, 80)
for s in (H['door1'], H['door2']): thump(s, .6, 70)
clang(H['lever'], .35, 900); thump(H['lever'], .4, 120)
for i in range(3): thump(H['trip']+.1+i*.15, .5, 60)
whoosh(S[16]+1.0, 1.2, .3); thump(H['land'], .9, 55)
for b in np.arange(S[17], S[20], 1.2):
    L = int(.6*SR); k = np.arange(L)/SR; add(fx, b, lp(rng.standard_normal(L), .12)*np.sin(np.pi*k/.6)**2*.05)
L = int((S[22]-S[21]+1.5)*SR); k = np.arange(L)/SR
add(fx, S[21], lp(np.sin(2*np.pi*np.cumsum(70+30*k/k[-1])/SR)*(1+.6*rng.standard_normal(L))*np.clip(k/2, 0, 1)*.12, .04))  # the groan
for s in (S[1]-.3, S[7]+.2, S[21], S[23]+.55):
    L = int(1.6*SR); k = np.arange(L)/SR; add(fx, s, .5*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
fade = np.clip(np.minimum(t/.3, (T-t)/1.0), 0, 1)
out = np.clip((bed+fx)*fade, -1, 1)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.repeat(out, 2)*32767).astype(np.int16).tobytes())
print('ok', T)
