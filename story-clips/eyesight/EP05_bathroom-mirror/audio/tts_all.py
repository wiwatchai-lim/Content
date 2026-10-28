# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'หกโมงยี่สิบ คุณวิ่งเข้าห้องน้ำ แล้วล็อกประตู',
    'แว่นของคุณหล่นหายไประหว่างทาง',
    'ไฟในห้องน้ำสลัว เหนืออ่างล้างหน้ามีกระจกบานหนึ่ง',
    'และข้างหลังเงาของคุณ มีร่างพร่าๆ ยืนอยู่',
    'กฎข้อแรก ถ้าไม่มีแว่น ให้ทำรูเล็กๆ ด้วยนิ้ว แล้วมองผ่านมัน',
    'รูเล็กๆ ตัดแสงที่กระเจิงออกไป ภาพที่ตกบนจอตาจึงคมขึ้น',
    'ใช้ได้ทั้งคนสายตาสั้นและยาว แต่มันแค่ทางรอดชั่วคราว ไม่ใช่แว่น',
    'คุณมองผ่านรูนิ้ว ร่างนั้น คือผ้าเช็ดตัวที่แขวนอยู่หลังประตู',
    'คุณถอนหายใจ แล้วจ้องหน้าตัวเองในกระจก',
    'ยิ่งจ้องนาน หน้าในกระจกยิ่งบิดเบี้ยว',
    'กฎข้อสอง ในที่สลัว ถ้าจ้องจุดเดียวนิ่งๆ ไม่ขยับตา',
    'สิ่งรอบๆ จะค่อยๆ จางหาย เพราะสมองหยุดรายงานสิ่งที่ไม่เปลี่ยน',
    'แค่กลอกตา แล้วกะพริบตา ทุกอย่างจะกลับมา',
    'ลองเองตอนนี้ จ้องจุดตรงกลาง ห้ามขยับตา',
    'วงสีรอบๆ จางหายไปใช่ไหม',
    'คุณกะพริบตา',
    'แต่เงาในกระจก ไม่กะพริบตาม',
    'ตอนต่อไป ถ้ามันออกมาจากจอ',
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
