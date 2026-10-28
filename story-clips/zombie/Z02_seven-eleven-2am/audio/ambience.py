# Z02 bed + SFX, synthesised (deterministic): a dark 7-Eleven at 2 a.m. in a power cut — near-silent room tone, far crickets and
# wind, palms slapping the glass, the glass cracking then shattering, runners' snarls, fight hits (same H formulas as
# template.html), ice-cream-freezer lid bangs, a dog bark from the stock room, a quiet reveal. No music.
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
H = dict(slap=[S[1]+.25, S[1]+1.05, S[1]+1.85], crack=S[8]+.45, shatter=S[8]+1.5, shelf=S[9]+.9, bonk=S[10]+1.0,
         clamp=min(S[10]+2.0, S[11]-.4), atm=S[11]+.75, can=min(S[11]+1.7, S[12]-.35), head=min(S[12]+1.95, S[13]-.3),
         dive=min(S[14]+1.8, S[15]-.35), lid=S[15]+.3, swing=E[17]-.2, bark=S[19]+.1, elbow=min(S[20]+.7, S[21]-.5), seal=S[21]+2.0)
H['shin'] = H['head']-.75
H['thump'] = [x for x in (S[15]+1.0, S[15]+1.8, S[15]+2.6) if x < S[16]-.25]
# bed: room tone + a low drone, far crickets, wind outside (louder once the glass is gone, quieter after the seal)
room = slow_noise(.03); room = room/np.abs(room).max()*.03
drone = .022*np.sin(2*np.pi*43*t)*(.6+.4*np.sin(2*np.pi*t/11))
crick = np.zeros(n)
for s0 in np.arange(0.4, T, 0.9):
    L = int(.06*SR); k = np.arange(L)/SR; add(crick, s0+rng.random()*.3, .012*np.sin(2*np.pi*4300*k)*(np.sin(2*np.pi*40*k) > 0))
wind = slow_noise(.06, 4); wind = wind/np.abs(wind).max()*.04
open_env = np.clip((t-H['shatter'])/.2, 0, 1)*np.clip((H['seal']+.3-t)/.4, 0, 1)
bed = room+drone+crick*.7+wind*(.3+.9*open_env)
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
for s0 in H['slap']: thump(s0, .45, 140)
glass(H['crack'], .25, .6); glass(H['shatter'], .8, 1.8); thump(H['shatter'], .6, 60)
for s0 in (S[7]+.5, S[7]+1.6, S[8]+2.2, S[9]+.2, S[12]+.3, S[14]+.4, S[16]+.2, S[18]+.4): snarl(s0)
thump(H['shelf']+.22, 1.0, 50); clang(H['shelf']+.25, .25, 300)
whoosh(S[10]+.5); thump(H['bonk'], .7, 110)
clang(H['clamp'], .55, 520); thump(H['clamp'], .5)
clang(H['atm'], .25, 900); thump(H['can'], .6, 130); clang(H['can']+.01, .2, 1400)
whoosh(S[12]+.3, .3); thump(H['shin'], .6, 100); thump(H['head'], .9)
whoosh(H['dive']-.65, .5); thump(H['dive'], .8, 60); clang(H['lid'], .45, 380)
for s0 in H['thump']: thump(s0, .45, 60)
# slow-mo counter leap: everything ducks to a heartbeat, the helmet swing snaps it back
s0, s1 = S[16]-.1, H['swing']
duck = 1-.8*np.clip(np.minimum((t-s0)/.2, (s1-t)/.05), 0, 1); bed *= duck
for b in np.arange(s0+.2, s1-.1, .75): thump(b, .3, 45); thump(b+.22, .2, 45)
thump(H['swing'], 1.0, 80); thump(H['swing']+.35, .7, 50)
# bark from the stock room, elbow, cooler pushed against the door
for b in (H['bark'], H['bark']+.3): 
    L = int(.18*SR); k = np.arange(L)/SR; ph = 2*np.pi*np.cumsum(560-260*k/.18)/SR
    add(fx, b, lp(.25*np.sin(np.pi*k/.18)**1.5*(np.sin(ph)+.5*np.sin(2*ph)+.25*np.sin(3*ph)), .25))
thump(H['elbow'], .9, 90)
L = int(1.2*SR); k = np.arange(L)/SR; add(fx, H['seal']-1.2, lp(rng.standard_normal(L), .05)*np.sin(np.pi*k/1.2)*.15)  # cooler dragged
thump(H['seal'], .8, 55)
for s in (S[22]+.5, S[22]+1.4): thump(s, .3, 60)
# door creak + reveal, the glass sliver "ting", low hits on the reveals
L = int(1.6*SR); k = np.arange(L)/SR; add(fx, S[23], .05*np.sin(2*np.pi*np.cumsum(300+120*np.sin(2*np.pi*.8*k))/SR)*np.sin(np.pi*k/1.6)*(1+.5*rng.standard_normal(L)))
ting = min(S[26]+2.6, S[27]-.3); L = int(1.5*SR); k = np.arange(L)/SR; add(fx, ting, .12*np.exp(-k*4)*np.sin(2*np.pi*3100*k))
for s in (S[1]-.4, S[7], S[18], S[24], S[27]+.4, S[28]+.55):
    L = int(1.6*SR); k = np.arange(L)/SR; add(fx, s, .5*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k))
fade = np.clip(np.minimum(t/.3, (T-t)/1.0), 0, 1)
out = np.clip((bed+fx)*fade, -1, 1)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.repeat(out, 2)*32767).astype(np.int16).tobytes())
print('ok', T)
