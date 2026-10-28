# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โป๊ก are punchy. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'อย่ามองลงไป! เดินต่อ!',
    'เดินบนรางมาทั้งคืน ข้างล่างตามมาตลอด',
    'ฟ้าเริ่มสาง… พวกมันเริ่มช้าลง',
    'โรงพยาบาลของฝน อยู่ตรงหน้าแล้ว',
    'ห้องยากับวิทยุ อยู่ชั้นเก้า',
    'ลิฟต์ล่ะ… อ๋อ ไฟดับ',
    'บันไดเต็ม เราขึ้นทางช่องลิฟต์',
    'โฮ่ง!',
    'ข้างบน… มีบางอย่างตกลงมา',
    'จับสายไว้! อย่าปล่อย!',
    'ปีนเชือกครั้งสุดท้าย สอบพละ ป.6!',
    'ชั้นหก… ออกทางบันได',
    'ซ้าย! หัวมัน!',
    'ใครอยู่เวรดึก ยกมือหน่อย!',
    'ชั้นเก้า! ประตูอยู่ตรงนั้น!',
    'พี่เต้ ข้างหลัง!',
    'ประตูปิดแล้ว… ปลอดภัย',
    'หนู… โดนกัด',
    'หนึ่งถึงสามนาที… แล้วจะกลายเป็นพวกมัน',
    'ฝนจับชีพจร เต้ถือหมวกไว้แน่น',
    'สองนาที… สามนาที…',
    'พี่… หนูหิวข้าว',
    'มิวไม่กลายร่าง…',
    'ถ้าใครรู้เข้า… ทุกคนจะต้องการตัวเธอ',
    'ตอนหน้า ลุงชาญ',
]
body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES)}]}],
                   'generationConfig': {'responseModalities': ['AUDIO'],
                                        'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': 'Sulafat'}}}}}).encode()
req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                             {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
r = json.load(urllib.request.urlopen(req, timeout=600))
pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'all.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(round(len(pcm) / 48000, 2), 's')
