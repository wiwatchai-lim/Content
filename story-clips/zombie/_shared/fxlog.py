# Run the episode's hf/index.html in headless Chrome and save the SFX log (window.__fx from cast.js) to audio/fx.json,
# so audio/ambience.py can place sounds exactly where the composition shows hits and SFX words.
# Usage (in the episode folder, after build.py): python ../_shared/fxlog.py
import json, os, pathlib, re, subprocess
CHROME = next(p for p in [os.environ.get('CHROME_PATH', ''), r'C:\Program Files\Google\Chrome\Application\chrome.exe',
                          r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'] if p and os.path.exists(p))
h = open('hf/index.html', encoding='utf-8').read()
h = h.replace('</body>', "<script>document.body.insertAdjacentHTML('beforeend', '<pre id=\"fxout\">' + JSON.stringify(window.__fx || []) + '</pre>');</script></body>")
tmp = os.path.join(os.path.abspath('hf'), '_fxlog.html'); open(tmp, 'w', encoding='utf-8').write(h)
try:
    out = subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--virtual-time-budget=15000', '--dump-dom', pathlib.Path(tmp).as_uri()],
                         capture_output=True, text=True, encoding='utf-8', timeout=120).stdout
finally:
    os.remove(tmp)
m = re.findall(r'<pre id="fxout">(\[.*?\])</pre>', out, re.S)   # the last match is the rendered <pre>, not the script source
fx = sorted(json.loads(m[-1].replace('&quot;', '"').replace('&amp;', '&')), key=lambda e: e['t'])
json.dump(fx, open('audio/fx.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(len(fx), 'events ->', 'audio/fx.json')
