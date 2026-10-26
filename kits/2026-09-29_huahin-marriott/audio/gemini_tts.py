# Gemini TTS, one wav per line.  GEMINI_API_KEY in env.
#   python audio/gemini_tts.py <out dir> <voice> "line 1" "line 2" ...
import base64, json, os, sys, time, urllib.request, wave
MODELS = [os.environ.get('TTS_MODEL', 'gemini-3.1-flash-tts-preview')]
STYLE = 'Read this in a soft, warm, calm and gentle voice, unhurried, like a luxury travel film narrator: '
out, voice, lines = sys.argv[1], sys.argv[2], sys.argv[3:]
key = os.environ['GEMINI_API_KEY']
START = int(os.environ.get('START', 1))
for i, text in enumerate(lines, START):
    body = json.dumps({'contents': [{'parts': [{'text': STYLE + text}]}],
                       'generationConfig': {'responseModalities': ['AUDIO'],
                                            'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': voice}}}}}).encode()
    for m in MODELS * 3:
        req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent', body,
                                     {'Content-Type': 'application/json', 'x-goog-api-key': key})
        try:
            r = json.load(urllib.request.urlopen(req, timeout=300)); break
        except Exception as e:
            print(m, repr(e)[:300]); r = None; time.sleep(20)
    if not r: sys.exit(1)
    pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
    with wave.open(os.path.join(out, f'{i:02d}.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
    print(f'{i:02d}', round(len(pcm) / 48000, 2), 's')
