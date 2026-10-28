# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ตีสี่ห้าสิบ คุณหนีออกมาได้ ขับรถออกจากเมือง',
    'ถนนเส้นเล็กกลางทุ่ง หมอกลงหนา จนแทบมองไม่เห็นทาง',
    'คุณเปิดไฟสูง แต่ข้างหน้า กลับกลายเป็นกำแพงสีขาว',
    'กฎข้อแรก ในหมอก ใช้ไฟต่ำ อย่าใช้ไฟสูง',
    'แสงไฟสูงกระทบละอองน้ำ แล้วสะท้อนกลับเข้าตาคุณ ยิ่งมองเห็นน้อยลง',
    'ถ้ารถมีไฟตัดหมอก ให้เปิดด้วย',
    'คุณลดไฟลง แล้วไกลออกไปในหมอก มีเงาดำ ยืนอยู่กลางถนน',
    'กฎข้อสอง หมอกทำให้ภาพจางลง ทุกอย่างจึงดูไกลกว่าที่เป็นจริง',
    'ขับให้ช้าลง เว้นระยะให้มากขึ้น แล้วมองเส้นขอบถนนด้านซ้ายไว้',
    'เสาไฟข้างทาง มีวงแสงฟุ้ง และแสงแตกเป็นแฉก',
    'ในหมอก แบบนี้เป็นเรื่องปกติ แต่ถ้าคืนฟ้าโปร่ง คุณก็ยังเห็นแบบนี้',
    'อาจเป็นสายตาสั้น หรือสายตาเอียง ที่ยังไม่ได้แก้',
    'ในผู้สูงอายุ อาจเป็นต้อกระจก ควรไปตรวจตา',
    'ลองเช็กสายตาเอียงตอนนี้ ใส่แว่นถ้ามี ปิดตาข้างหนึ่ง แล้วมองจุดตรงกลาง',
    'สลับ ปิดอีกข้าง',
    'ถ้ามีบางเส้น ดูเข้มหรือคมกว่าเส้นอื่น อาจเป็นสายตาเอียง ไปให้นักทัศนมาตรตรวจ',
    'คุณกลับมามองถนน ขับช้าๆ เงานั้นยังดูอยู่ไกล',
    'แต่คุณลืมไปแล้ว ว่าหมอกหลอกระยะ',
    'มันไม่ได้อยู่ไกลเลย',
    'มันยืนอยู่ ตรงหน้ากันชนคุณ',
    'ตอนต่อไป คืนสุดท้าย',
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
