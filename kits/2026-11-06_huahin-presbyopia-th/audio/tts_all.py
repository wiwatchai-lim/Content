# One Gemini TTS request per group of cues (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
import sys
from lines import SPOKEN
A, B, OUT = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3]   # cues A..B (1-based) -> OUT wav
M = 'gemini-3.1-flash-tts-preview'; VOICE = 'Puck'
STYLE = ('Read this Thai eye-care tip about age-related farsightedness (presbyopia) from an eyewear shop in Hua Hin as a friendly, warm young Thai man talking to friends on TikTok. '
         'Clear and engaging like a short explainer, natural Thai pronunciation, curious and a little playful on the hook and on the stretch-your-arm joke. '
         'Pause for two full seconds between each line:\n\n')
body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(SPOKEN[A-1:B])}]}],
                   'generationConfig': {'responseModalities': ['AUDIO'],
                                        'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': VOICE}}}}}).encode()
req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                             {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
r = json.load(urllib.request.urlopen(req, timeout=900))
if 'content' not in r['candidates'][0]: print(json.dumps(r)[:1500]); raise SystemExit(1)
pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), OUT), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(round(len(pcm) / 48000, 2), 's')
