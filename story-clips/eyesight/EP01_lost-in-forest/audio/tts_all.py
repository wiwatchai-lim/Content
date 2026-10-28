# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ตีสองสิบนาที คุณหลงอยู่กลางป่า',
    'แบตมือถือเหลือสี่เปอร์เซ็นต์',
    'รถจอดอยู่ห่างไปหกร้อยเมตร',
    'กฎข้อแรก ห้ามเปิดไฟฉาย',
    'ตาคุณอยู่ในความมืดมาครึ่งชั่วโมงแล้ว มันปรับตัวเต็มที่แล้ว',
    'โดนแสงจ้าแค่ไม่กี่วินาที ต้องเริ่มปรับใหม่เกือบหมด',
    'ถ้าจำเป็นต้องดูจอ ปรับจอเป็นสีแดง แล้วหรี่ให้ต่ำสุด',
    'เพราะเซลล์ที่ใช้มองในที่มืด แทบไม่รับรู้แสงสีแดง',
    'คุณเดินตามทางดิน แต่พอจ้องตรงไปข้างหน้า ทางกลับเลือนหายไป',
    'เพราะตรงกลางตา แทบไม่มีเซลล์ที่มองในที่มืดเลย',
    'กฎข้อสอง เหลือบมองเยื้องไปข้างๆ นิดเดียว ทางจะชัดขึ้นทันที',
    'สี่ร้อยเมตร สองร้อยเมตร',
    'แล้วหางตาคุณก็เห็น ร่างหนึ่งยืนอยู่ข้างทาง',
    'คุณหันไปมองตรงๆ มันหายไป',
    'คุณบอกตัวเองว่า ตาฝาด',
    'แต่ตาคุณไม่ได้ฝาด มันแค่มองตรงกลางไม่เห็น',
    'แล้วเสียงฝีเท้าข้างหลังก็เริ่มดังขึ้น',
    'ตอนต่อไป ถ้าสิ่งที่ตามคุณมา รออยู่ที่รถ',
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
