# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โป๊ก are punchy. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'เงียบ… มันได้ยินทุกอย่าง',
    'หนีจากห้างเสี่ยเปามาได้ แต่น้ำมันหมด',
    'เสี่ยถูกกัดแล้วหายไป… หัวเราะด้วย',
    'ตัดผ่านจตุจักร ทางสั้นที่สุด',
    'เที่ยงคืนเดินจตุจักร… ไม่มีของลดราคาด้วย',
    'ข้าวตังขู่… มีอะไรอยู่ในซอย',
    'ตัววิ่ง! กลางคืนมันวิ่ง!',
    'ตีที่หัว! อย่าให้มันกัด!',
    'หมวกกันน็อก ใบละสามร้อย คุ้มมาก!',
    'ก้มหัว!',
    'มาอีก… ทั้งซอยเลย',
    'ไฟ! มันกลัวไฟ… แต่เสียงจะเรียกมาอีก',
    'เลือกไม่ได้แล้ว! จุด!',
    'ขึ้นหลังคา! วิ่ง!',
    'สังกะสีร้อนจะเป็นโรตีแล้ว!',
    'พี่เต้! ข้างหลัง!',
    'กระโดด…!',
    'หลุดมาได้… ทุกคนครบไหม',
    'ข้าวตัง… ข้าวตังล่ะ?',
    'ข้าวตัง! ข้าวตัง!',
    'ไม่มีเสียงเห่าตอบ',
    'ตอนหน้า ระฆังวัด',
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
