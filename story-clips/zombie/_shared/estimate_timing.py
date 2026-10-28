# Placeholder audio/timing.json from the script lines in audio/tts_all.py, for building visuals before the TTS take exists.
# Usage: python ../_shared/estimate_timing.py  (run in the episode folder). Rerun split.py + timeline.py once all.wav exists.
import json, re, os
L = re.findall(r"^    '(.*)',$", open('audio/tts_all.py', encoding='utf-8').read(), re.M)
GAP = {}
src = open('audio/timeline.py', encoding='utf-8').read() if os.path.exists('audio/timeline.py') else ''
m = re.search(r'^GAP = (\{.*?\})', src, re.M)
if m: GAP = eval(m.group(1))
t, cues = .5, []
for n, l in enumerate(L, 1):
    d = .5 + .1 * len(re.sub(r'\s', '', l))
    if n > 1: t += GAP.get(n, .3)
    cues.append({'n': n, 'start': round(t, 2), 'end': round(t + d, 2)}); t += d
json.dump({'total': round(t + 2.2, 2), 'estimated': True, 'cues': cues}, open('audio/timing.json', 'w'), indent=1)
print('estimated', round(t + 2.2, 2), len(cues), 'lines')
