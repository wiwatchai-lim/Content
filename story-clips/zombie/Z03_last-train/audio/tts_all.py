# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โครม เปรี๊ยะ are punchy. The little girl line is small and scared. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'อย่าหายใจดัง… มันฟังอยู่',
    'ตีสองครึ่ง ข้างล่างเต็มไปด้วยพวกมัน',
    'ฝนบอก โรงพยาบาลอยู่อีกฝั่งของราง',
    'ทางเดียวที่ไม่มีพวกมัน… คือข้างบน',
    'รถไฟฟ้าขบวนนี้ จอดค้างตั้งแต่เย็น',
    'ในรถ… มีคนนั่งอยู่',
    'ไม่ใช่คนแล้วจ้ะหนู',
    'โฮ่ง! โฮ่ง!',
    'โอเค… ป้ายหน้า โรงพยาบาลครับ',
    'ตีหัว! ที่อื่นไม่หยุด!',
    'ขอโทษพี่ ไม่ได้ลุกให้คนแก่!',
    'ตู้สอง… ยังมีอีก',
    'ก้มลง!',
    'บัตรรถไฟฟ้าหักอีก ซวยซ้ำ!',
    'ประตูฉุกเฉิน… ดึงคันโยก!',
    'โดด!',
    'ทุกคนยังอยู่ครบ… มิว ข้าวตัง ฝน',
    'พี่เต้ เลือดออก',
    'เลือดมัน ไม่ใช่ของพี่',
    'แล้วเสียงข้างล่าง… ก็เงียบไป',
    'ทั้งถนน… เงยหน้าขึ้นมามองเรา',
    'ทางเดียวที่เหลือ… คือรางนี้',
    'ตอนหน้า ชั้นเก้า',
]
body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES)}]}],
                   'generationConfig': {'responseModalities': ['AUDIO'],
                                        'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': 'Sulafat'}}}}}).encode()
req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                             {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
r = json.load(urllib.request.urlopen(req, timeout=600))
if 'content' not in r['candidates'][0]: raise SystemExit('no audio: ' + json.dumps(r, ensure_ascii=False)[:800])
pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'all.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(round(len(pcm) / 48000, 2), 's')
