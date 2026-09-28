# Read every line of audio/en/gemini.txt in ONE Gemini TTS request (free tier is about 10 requests a day),
# with a long pause between lines, into audio/en/gemini_all.wav; split_voice.py then cuts it into gemini/NN.wav.
#   GEMINI_API_KEY=... python kits/2026-09-28_eye-break-turtle/tts_all.py [--voice Aoede]
# The key comes from the environment or from .env at the project root (see tools/gemini_tts.py). Never write it into this folder.
import sys, wave
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'tools'))
from gemini_tts import MODEL, load_key
from google import genai
from google.genai import types

VOICE = sys.argv[sys.argv.index('--voice') + 1] if '--voice' in sys.argv else 'Aoede'
STYLE = ('a calm, soft, warm guide for a short ocean relaxation break, gentle and soothing like slow waves, '
         'but each cue short and clear, no long drawn-out words')
D = Path(__file__).parent / 'audio' / 'en'
lines = [l.split('|')[1] for l in (D / 'gemini.txt').read_text(encoding='utf-8').strip().splitlines()]
script = '\n\n'.join(f'{t}\n[pause for two seconds]' for t in lines)
prompt = (f'Read each of the following {len(lines)} lines like {STYLE}. After each line stay completely silent for two seconds '
          f'before the next line. Do not read the words in square brackets.\n\n{script}')
client = genai.Client(api_key=load_key())
r = client.models.generate_content(
    model=MODEL, contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['AUDIO'],
        speech_config=types.SpeechConfig(voice_config=types.VoiceConfig(
            prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=VOICE)))))
pcm = r.candidates[0].content.parts[0].inline_data.data
with wave.open(str(D / 'gemini_all.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(VOICE, round(len(pcm) / 48000, 2), 's')
