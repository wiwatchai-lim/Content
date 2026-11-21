# template.html + audio/timing.json + the script lines (audio/tts_all.py) -> hf/index.html
import json, os, re
D = os.path.dirname(os.path.abspath(__file__))
t = json.load(open(f'{D}/audio/timing.json'))
lines = re.findall(r"^    '(.*)',$", open(f'{D}/audio/tts_all.py', encoding='utf-8').read(), re.M)
h = open(f'{D}/template.html', encoding='utf-8').read()
h = h.replace('/*TIMING*/', json.dumps(t)).replace('/*LINES*/', json.dumps(lines, ensure_ascii=False)).replace('@TOTAL@', str(t['total']))
open(f'{D}/hf/index.html', 'w', encoding='utf-8').write(h)
print('index.html', t['total'])
