# Voice lines for the pterygium clip: Gemini TTS, voice Sulafat, one request per line.
#   python kits/2026-09-26_pterygium/tts.py   (needs GEMINI_API_KEY; skips lines already made)
import os, io, wave
from pathlib import Path
from google import genai
from google.genai import types
LINES = [
    "What's this growing on your eye?",
    "It's called a pterygium.",
    "A fleshy growth with blood vessels, creeping from the white of the eye onto the cornea.",
    "What causes it?",
    "Number one: UV from the sun.",
    "Wind and dust that keep irritating your eyes.",
    "And dry eyes, when you don't blink enough.",
    "Wear UV-blocking sunglasses, blink often, and see an eye doctor if it grows.",
    "Let Time Optic take care of your eyes.",
]
out = Path(__file__).parent / 'audio' / 'en'
c = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
for n, text in enumerate(LINES, 1):
    dest = out / f'{n:02d}.wav'
    if dest.exists():
        continue
    for model in ["gemini-3.1-flash-tts-preview", "gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts", "gemini-2.5-flash-preview-tts"]:
        try:
            r = c.models.generate_content(model=model, contents=text, config=types.GenerateContentConfig(
                response_modalities=["AUDIO"], speech_config=types.SpeechConfig(voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Sulafat")))))
            d = r.candidates[0].content.parts[0].inline_data.data
            if d[:4] != b'RIFF':
                b = io.BytesIO(); w = wave.open(b, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(d); w.close(); d = b.getvalue()
            dest.write_bytes(d); print(n, model, 'ok'); break
        except Exception as e:
            print(n, model, str(e)[:60])
