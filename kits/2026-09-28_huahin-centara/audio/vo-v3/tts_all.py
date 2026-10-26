# Centara script v3 (user, 2026-10-02): only line 1 is new; 02-05 come from huahin-anantara/audio/vo-v3.
# The first run still asked for 'five lines': the model read line 1 (0-3.3 s, kept as 01.wav) then improvised four more; all.wav keeps that take.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this in a soft, warm, calm and gentle voice, intriguing and a little playful, like a luxury travel film narrator inviting you to guess. '
         '\n\n')
LINES = ['Time Optic has a question for you.']
body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES)}]}],
                   'generationConfig': {'responseModalities': ['AUDIO'],
                                        'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': 'Sulafat'}}}}}).encode()
req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                             {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
r = json.load(urllib.request.urlopen(req, timeout=300))
pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'all.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(round(len(pcm) / 48000, 2), 's')
