# template.html + ../rig.js + ../fx.js -> hf/index.html
import os
D = os.path.dirname(os.path.abspath(__file__))
h = open(f'{D}/template.html', encoding='utf-8').read()
h = h.replace('/*RIG*/', open(f'{D}/../rig.js', encoding='utf-8').read()).replace('/*FX*/', open(f'{D}/../fx.js', encoding='utf-8').read())
open(f'{D}/hf/index.html', 'w', encoding='utf-8').write(h); print('ok')
