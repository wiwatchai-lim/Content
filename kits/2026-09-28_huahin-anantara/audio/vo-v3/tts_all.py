# Script v3 (user, 2026-10-02): one Gemini TTS request for all lines (saves the free daily quota); split with split.py.
# The first try on gemini-2.5-flash-preview-tts (all_bad.wav) read only ~4 s then went silent.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this in a soft, warm, calm and gentle voice, intriguing and a little playful, like a luxury travel film narrator inviting you to guess. '
         'Read all five lines below, in order, with a calm two-second pause between lines:\n\n')
LINES = ['At Time Optic, we notice the little details.', 'So... do you recognize this place?', 'Look a little closer.',
         'Have you figured it out yet?', 'Keep looking. Take care of your vision.']
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
