# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ตีห้าห้าสิบ คุณเฝ้าปลายทางเดินมาทั้งคืน',
    'แสงแรกของเช้า ลอดเข้ามาทางหน้าต่าง',
    'แต่ร่างนั้น ยังยืนอยู่ที่เดิม',
    'คุณตัดสินใจ วิ่งออกไปนอกบ้าน',
    'คุณกระชากประตูเปิด แล้วทุกอย่างก็ขาวโพลน',
    'กฎข้อแรก อยู่ในความมืดมาทั้งคืน อย่าพุ่งออกไปกลางแสงจ้าทันที',
    'รูม่านตาคุณยังเบิกกว้าง แสงจึงทะลักเข้าตาเต็มที่',
    'หยุดที่ประตู หรี่ตา เอามือบังแสง ให้ตาปรับตัวก่อน',
    'ราวหนึ่งนาที ตาจะเริ่มมองเห็นชัดขึ้น',
    'ภาพค่อยๆ กลับมา พระอาทิตย์กำลังขึ้นตรงหน้า',
    'คุณอยากมองไปทางนั้น ว่ามันตามมาหรือเปล่า',
    'กฎข้อสอง ห้ามจ้องดวงอาทิตย์ แม้แต่ตอนเช้า',
    'เลนส์ตาจะรวมแสงเป็นจุดเล็กๆ แล้วเผาจอตาได้',
    'และจอตาไม่มีเส้นประสาทรับความเจ็บ คุณจะไม่รู้สึกอะไรเลย',
    'แว่นกันแดดที่กันยูวีได้ ช่วยถนอมตากลางแดด แต่ก็ใช้จ้องดวงอาทิตย์ไม่ได้',
    'คุณหลบสายตาลงมองพื้น',
    'ต้นไม้มีเงา เสาไฟมีเงา ตัวคุณเองก็มีเงา ทอดยาวไปทางเดียวกัน',
    'แล้วคุณก็เห็นมัน ยืนอยู่ที่ประตูรั้ว',
    'กลางแสงเช้าแบบนี้ มันไม่มีเงาเลย',
    'ตอนต่อไป ถ้ามันอยู่ในกระจก',
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
