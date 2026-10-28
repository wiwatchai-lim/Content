# template.html + audio/timing.json + ../_shared/cast.js -> hf/index.html
import json, os
D = os.path.dirname(os.path.abspath(__file__))
t = json.load(open(f'{D}/audio/timing.json'))
cast = open(f'{D}/../_shared/cast.js', encoding='utf-8').read()
h = open(f'{D}/template.html', encoding='utf-8').read()
h = h.replace('/*CAST*/', cast).replace('/*TIMING*/', json.dumps(t)).replace('@TOTAL@', str(t['total']))
open(f'{D}/hf/index.html', 'w', encoding='utf-8').write(h)
print('index.html', t['total'])
