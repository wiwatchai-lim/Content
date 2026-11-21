# Build the shared real-recorded SFX library from Openverse (mostly Freesound), CC0 first, CC BY only if no CC0 fits.
# Each sound -> <category>/<name>.wav (48 kHz mono, trimmed, peak -1 dB) + manifest.json + CREDITS.md.
# Rate limit: anonymous Openverse = 20 searches/min, 200/day -> we sleep 3.5 s between searches.
# Usage: python fetch.py            (fetches whatever is missing)
#        python fetch.py "rain on roof" weather [key]   (one extra sound; key = manifest name, default = slug of the query)
#        python fetch.py --drop key ...            (remove entries so they are fetched again)
import json, os, re, subprocess, sys, time, urllib.parse, urllib.request
D = os.path.dirname(os.path.abspath(__file__))
UA = {'User-Agent': 'story-sfx-library/1.0'}
WANT = {   # category: [query, ...]  (concrete names search better than moods)
  'foley': ['footsteps wooden floor', 'footsteps gravel', 'footsteps running', 'door creak', 'door knock', 'door close', 'door slam',
            'metal shutter roll', 'key lock click', 'paper rustle', 'page turn', 'letter unfold', 'pen writing', 'cloth rustle',
            'glasses put on table', 'drawer open', 'chair creak', 'cup on table', 'pour water', 'match strike', 'light switch'],
  'objects': ['shop door bell', 'wind chime', 'clock ticking', 'clock chime', 'old phone ring', 'radio static', 'grinding machine',
              'camera shutter', 'typewriter', 'bicycle bell', 'motorbike pass', 'car pass by', 'glass shatter', 'coin drop'],
  'ambience': ['night crickets', 'canal water lapping', 'rain on roof', 'thunder', 'wind howling', 'room tone', 'city street ambience',
               'morning birds', 'forest night', 'ocean waves', 'market crowd', 'temple bell', 'dog barking distant', 'rooster crow'],
  'body': ['heartbeat', 'gasp', 'breath scared', 'sigh', 'whisper', 'footstep creak', 'swallow'],
  'cartoon': ['cartoon boing', 'slide whistle', 'cartoon pop', 'bonk', 'zip whoosh cartoon', 'cartoon spring', 'squeak toy', 'cartoon run'],
  'design': ['whoosh', 'swoosh fast', 'impact boom', 'sub drop', 'riser tension', 'reverse cymbal', 'magic sparkle', 'ghost whoosh',
             'horror drone', 'eerie ambience', 'shimmer', 'stinger horror', 'chime soft', 'tape stop', 'glitch'],
}
def slug(q): return re.sub(r'[^a-z0-9]+', '-', q.lower()).strip('-')
def search(q, lic):
    u = 'https://api.openverse.org/v1/audio/?' + urllib.parse.urlencode({'q': q, 'license': lic, 'page_size': 20})
    return json.load(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30)).get('results', [])
def pick(rs, long_ok):
    good = [r for r in rs if r.get('url') and r.get('duration') and 300 <= r['duration'] <= (60000 if long_ok else 12000)]
    return good[0] if good else None
man_p = os.path.join(D, 'manifest.json'); man = json.load(open(man_p, encoding='utf-8')) if os.path.exists(man_p) else {}
if len(sys.argv) > 1 and sys.argv[1] == '--drop':
    for k in sys.argv[2:]:
        v = man.pop(k, None)
        if v and os.path.exists(os.path.join(D, v['file'])): os.remove(os.path.join(D, v['file']))
    json.dump(man, open(man_p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); sys.exit(0)
KEY = sys.argv[3] if len(sys.argv) > 3 else None
items = [(c, q) for c, qs in WANT.items() for q in qs] if len(sys.argv) < 3 else [(sys.argv[2], sys.argv[1])]
for cat, q in items:
    key = KEY or slug(q)
    if key in man: continue
    try:
        long_ok = cat == 'ambience'
        r = pick(search(q, 'cc0'), long_ok); time.sleep(3.5)
        if not r: r = pick(search(q, 'by'), long_ok); time.sleep(3.5)
        if not r: print('MISS', q); continue
        os.makedirs(os.path.join(D, cat), exist_ok=True)
        raw = os.path.join(D, cat, key + '.src'); out = os.path.join(D, cat, key + '.wav')
        open(raw, 'wb').write(urllib.request.urlopen(urllib.request.Request(r['url'], headers=UA), timeout=60).read())
        # trim leading/trailing silence, mono 48 kHz, cap length (ambience 40 s, others 8 s), peak-normalise to -1 dB
        cap = 40 if long_ok else 8
        af = f'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,atrim=0:{cap},loudnorm=I=-20:TP=-1'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', af, '-ar', '48000', '-ac', '1', out], check=True)
        os.remove(raw)
        dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout or 0)
        man[key] = {'file': f'{cat}/{key}.wav', 'query': q, 'category': cat, 'duration': round(dur, 2), 'title': r.get('title'), 'creator': r.get('creator'),
                    'license': r.get('license'), 'source': r.get('foreign_landing_url')}
        print('ok  ', cat, key, round(dur, 1), 's', r.get('license'))
        json.dump(man, open(man_p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    except Exception as e:
        print('ERR ', q, str(e)[:120]); time.sleep(5)
cr = ['# SFX credits', '', 'CC0 needs no credit. CC BY sounds must be credited where a video using them is published:', '']
cr += [f"- {v['file']}: \"{v['title']}\" by {v['creator']} — CC BY — {v['source']}" for v in man.values() if v['license'] == 'by']
open(os.path.join(D, 'CREDITS.md'), 'w', encoding='utf-8').write('\n'.join(cr) + '\n')
print(len(man), 'sounds in manifest')
