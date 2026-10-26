# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, sys, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this in a warm, calm, clear voice, gentle but at a natural pace, not slow, like a caring wellness guide. '
         'Pause for two full seconds between each line:\n\n')
LINES = ['Stop scrolling. Your eyes need fifteen seconds.', 'Look away from the screen.', 'Look at the horizon.', 'Blink. Breathe. Relax.', 'Give your eyes a moment to rest.', 'Time Optic. Take care of your vision.']
body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES)}]}],
                   'generationConfig': {'responseModalities': ['AUDIO'],
                                        'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': 'Sulafat'}}}}}).encode()
req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                             {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
r = json.load(urllib.request.urlopen(req, timeout=300))
pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
with wave.open(os.path.join(os.path.dirname(__file__), 'all.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(round(len(pcm) / 48000, 2), 's')
