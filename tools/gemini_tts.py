"""Gemini TTS for mixed Thai/English scripts, one wav per line.

usage: python gemini_tts.py script.txt out_dir [--voice Puck] [--only 03,07]
script.txt lines: seg|spoken text|translation|style (style optional)
Reads GEMINI_API_KEY from the environment or from .env at the project root (each machine uses its own key;
never copy one machine's key into the folder). Skips lines whose wav exists.
Eye-break clips: python tools/gemini_tts.py <kit>/audio/en/gemini.txt <kit>/audio/en/gemini --voice Sulafat
"""
import argparse
import os
import time
import wave
from pathlib import Path

from google import genai
from google.genai import types

ROOT = Path(__file__).resolve().parent.parent
MODEL = "gemini-2.5-flash-preview-tts"
DEFAULT_STYLE = "an excited, playful travel vlogger on an adventure"


def load_key():
    if os.environ.get("GEMINI_API_KEY"):
        return os.environ["GEMINI_API_KEY"]
    env = ROOT / ".env"
    if not env.exists():
        raise SystemExit("GEMINI_API_KEY not found: put GEMINI_API_KEY=... in .env at the project root")
    for line in env.read_text(encoding="utf-8").splitlines():
        if line.startswith("GEMINI_API_KEY="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("GEMINI_API_KEY not found: put GEMINI_API_KEY=... in .env at the project root")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script")
    ap.add_argument("out")
    ap.add_argument("--voice", default="Puck")
    ap.add_argument("--only", default="")
    a = ap.parse_args()
    client = genai.Client(api_key=load_key())
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    only = {s for s in a.only.split(",") if s}
    lines = Path(a.script).read_text(encoding="utf-8").strip().splitlines()
    for i, line in enumerate(lines, 1):
        n = f"{i:02d}"
        cols = line.split("|")
        text = cols[1]
        style = cols[3] if len(cols) > 3 and cols[3] else DEFAULT_STYLE
        dest = out / f"{n}.wav"
        if (only and n not in only) or (not only and dest.exists()):
            continue
        prompt = f"Say this like {style}:\n{text}"
        for attempt in range(4):
            try:
                r = client.models.generate_content(
                    model=MODEL,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_modalities=["AUDIO"],
                        speech_config=types.SpeechConfig(
                            voice_config=types.VoiceConfig(
                                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=a.voice))),
                    ),
                )
                pcm = r.candidates[0].content.parts[0].inline_data.data
                break
            except Exception as e:  # rate limits: wait and retry
                print(n, "retry", attempt, str(e)[:120], flush=True)
                time.sleep(20 * (attempt + 1))
        else:
            raise SystemExit(f"line {n} failed")
        with wave.open(str(dest), "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(24000)
            w.writeframes(pcm)
        print(n, "ok", round(len(pcm) / 48000, 2), "s", flush=True)


if __name__ == "__main__":
    main()
