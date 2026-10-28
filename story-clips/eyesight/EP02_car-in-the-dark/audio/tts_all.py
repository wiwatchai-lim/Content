# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ตีสองสามสิบหก คุณมาถึงรถ แบตเหลือหนึ่งเปอร์เซ็นต์',
    'หางตาคุณเห็น ใครบางคนยืนอยู่ข้างประตูคนขับ',
    'คุณหันไปมองตรงๆ ไม่มีใคร',
    'คุณขึ้นรถ แล้วล็อกประตูทันที',
    'กฎข้อแรก ห้ามเปิดไฟในรถ',
    'ถ้าในรถสว่างกว่าข้างนอก กระจกรถจะสะท้อนเหมือนกระจกเงา',
    'คุณจะเห็นแค่หน้าตัวเอง แต่สิ่งที่อยู่ข้างนอก มองเห็นคุณชัดทุกอย่าง',
    'คุณสตาร์ทรถ แล้วขับออกไปบนถนนมืด',
    'ห้านาทีต่อมา มีไฟสองดวงตามมาข้างหลัง',
    'แสงในกระจกมองหลัง จ้าจนตาพร่า',
    'กฎข้อสอง ดึงก้านใต้กระจกมองหลัง ปรับเป็นโหมดกลางคืน',
    'กระจกจะสะท้อนแสงแค่นิดเดียว ไฟข้างหลังจะจางลงทันที',
    'กฎข้อสาม ถ้ามีรถสวนมา อย่ามองไฟหน้า ให้มองเส้นขอบถนนด้านซ้าย',
    'เพราะตาที่โดนแสงจ้า ต้องใช้เวลาหลายวินาทีกว่าจะมองเห็นอีกครั้ง แค่สองวินาทีที่แปดสิบกิโล คือสี่สิบกว่าเมตรที่คุณขับแบบมองไม่เห็น',
    'คุณมองกระจกอีกครั้ง ไฟสองดวงนั้นยังอยู่',
    'แล้วมันก็กะพริบ พร้อมกันทั้งสองดวง',
    'เหมือนมีใครกำลังกะพริบตา',
    'ตอนต่อไป ถ้ามันตามคุณไปถึงบ้าน',
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
