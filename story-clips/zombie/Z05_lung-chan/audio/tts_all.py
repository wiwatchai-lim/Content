# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โป๊ก are punchy. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'สามนาทีแล้ว… มิวยังไม่กลายร่าง',
    'แผลกัดชัดๆ แต่ตาเธอยังใสอยู่',
    'ฝนนับชีพจรซ้ำเป็นรอบที่สี่',
    'ปกติดี… ปกติเกินไปด้วยซ้ำ',
    'ข้าวตังหันไปทางทางลาด แล้วเห่าไม่หยุด',
    'ตึง… ตึง… อะไรบางอย่างที่หนักมาก',
    'ตัวยักษ์ เกราะทำจากประตูรถ',
    'เต้ใส่หมวกกันน็อก พี่ขอเรียกวินได้มั้ย',
    'ฟาดหัวมันไม่ถึง สูงเกินไป',
    'ฝนตะโกน ขามัน! เอ็นร้อยหวาย!',
    'มันล้มไม่ลง แล้วจับเต้ได้',
    'แล้วเสียงนกหวีดก็ดังขึ้นจากความมืด',
    'ชายแก่ในชุด รปภ. ถือไม้พลอง',
    'กระบี่กระบอง… ทีละจังหวะ ไม่มีพลาด',
    'ไอ้หนุ่ม! ตอนนี้แหละ หัวมัน!',
    'ตุ้บ! ตัวยักษ์ล้มลงทั้งตัว',
    'ลุงชื่อชาญ เฝ้าห้างนี้มาสามสิบปี',
    'ห้างปิดแล้ว… แต่ลุงยังไม่ได้เลิกงาน',
    'ลุงมองแผลที่แขนมิว ไม่พูดอะไรสักคำ',
    'แค่ยื่นลูกอมให้หนึ่งเม็ด',
    'วิทยุที่เอวลุงดังแทรกขึ้นมา',
    'เรือหลวงรอที่ป้อมพระจุลฯ…',
    'ออกเรือตอนรุ่งเช้า วันที่สาม',
    'เหลือเวลาไม่ถึงสี่สิบชั่วโมง',
    'ตอนหน้า ห้างของเสี่ย',
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
