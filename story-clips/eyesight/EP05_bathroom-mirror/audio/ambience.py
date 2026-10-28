# EP05 bed + SFX, synthesised (deterministic): bathroom at dawn — a mains hum from the dim lamp, a dripping tap, a low room drone;
# the lock click on 'แล้วล็อกประตู', a blink thump, low hits on the blurry shape and on 'ไม่กะพริบตาม'.
import numpy as np, wave, json, os
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
T = json.load(open(f'{D}/timing.json'))['total']; n = int(T*SR); t = np.arange(n)/SR
rng = np.random.default_rng(5)
hum = (.018*np.sin(2*np.pi*100*t)+.008*np.sin(2*np.pi*200*t+.5)+.004*np.sin(2*np.pi*300*t+1))*(.8+.2*np.sin(2*np.pi*t/7))
drone = (.03*np.sin(2*np.pi*55*t)+.018*np.sin(2*np.pi*73.4*t+1))*(.6+.4*np.sin(2*np.pi*t/11))
air = rng.standard_normal(n)*.004
drip = np.zeros(n)
for s0 in np.arange(1.2, 89.0, 1.7):  # every 1.7 s, in sync with the drop in hf/index.html
    i0 = int(s0*SR); L = int(.12*SR); k = np.arange(L)/SR
    f = 900+700*np.exp(-k*40)  # pitch rises then falls, like a drop hitting water
    drip[i0:i0+L] += .09*np.exp(-k*45)*np.sin(2*np.pi*np.cumsum(f)/SR)
bed = hum+drone+air+drip
fade = np.clip(np.minimum(t/1.5, (89.4-t)/1.0), 0, 1)
bed *= fade
fx = np.zeros(n)
def click(s0, a=.35):
    i0 = int(s0*SR); L = int(.05*SR); k = np.arange(L)/SR
    fx[i0:i0+L] += a*np.exp(-k*120)*rng.standard_normal(L)
click(3.98); click(4.10, .25)
for s0 in (16.4, 87.16):
    i0 = int(s0*SR); L = int(1.6*SR); k = np.arange(L)/SR
    fx[i0:i0+L] += .55*np.exp(-k*3)*np.sin(2*np.pi*(48+30*np.exp(-k*8))*k)
out = np.clip(bed+fx, -1, 1)
st = (np.repeat(out, 2)*32767).astype(np.int16)
with wave.open(f'{D}/ambience.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', T)
