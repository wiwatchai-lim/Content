# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โป๊ก are punchy. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'โฮ่ง! โฮ่ง!',
    'ข้าวตัง!',
    'มันวิ่งนำทางมา ถึงวัดริมคลอง',
    'แต่ไฟจากจตุจักร ลากฝูงมันตามมาด้วย',
    'ปิดประตู! ขึ้นกำแพง!',
    'ห้าคนกับหมาหนึ่งตัว สู้ทั้งเมือง ยุติธรรมดี',
    'มันปีนข้ามศพกันขึ้นมา!',
    'ฝั่งซ้าย! ตัววิ่ง!',
    'บุญยังไม่ทันทำ ต้องมาต่อยในวัดอีก!',
    'ประตูจะพังแล้ว!',
    'ลุง!!',
    'ไม่เป็นไร แค่ถลอก',
    'ประตูหลังมีเรือ ไปทางคลองได้',
    'เต้ ลุงโดนกัดแล้ว',
    'เสียงดังเรียกมันได้ใช่ไหม',
    'ลุงเฝ้าห้างมาสามสิบปี คืนนี้ขอเฝ้าพวกหนู',
    'มิว เป่านกหวีดนี้แทนลุงนะ',
    'ไป! อย่าหันกลับมา!',
    'เป๊ง เป๊ง เป๊ง',
    'ทั้งฝูงหันหลัง เดินไปหาเสียงระฆัง',
    'ลุงชาญยิ้ม',
    'แล้วระฆังก็เงียบ',
    'ตอนหน้า เจ้าพระยา',
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
