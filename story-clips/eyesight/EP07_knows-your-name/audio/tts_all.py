# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ห้าทุ่มครึ่ง คุณปิดไฟ นอนอยู่ในห้องมืด',
    'เพื่อนพิมพ์มาว่า กำลังไปหา ใส่เสื้อแดง ถึงแล้วจะเคาะ',
    'แล้วก็มีเสียงเคาะประตู สามครั้ง',
    'เสียงจากนอกประตู เรียกชื่อคุณ',
    'คุณลุกไปที่ประตู ทุกอย่างในห้อง เป็นสีเทาไปหมด',
    'กฎข้อแรก ในที่มืด ตาเปลี่ยนไปใช้เซลล์ที่ไวแสง แต่มองไม่เห็นสี',
    'เซลล์พวกนี้แทบไม่รับแสงสีแดง ของสีแดงจึงดูมืด จนเหมือนสีดำ',
    'ส่วนสีฟ้าสีเขียว กลับดูสว่างกว่า',
    'ในความมืด อย่าเชื่อสีที่ตาเห็น',
    'แล้วมีอะไรบางอย่าง ขยับแวบที่หางตา',
    'กฎข้อสอง หางตาจับการเคลื่อนไหวได้ไว แต่เห็นรายละเอียดและสีได้น้อย',
    'มันบอกได้แค่ว่ามีอะไรขยับ แต่บอกไม่ได้ว่าคืออะไร',
    'คุณหันไปมองตรงๆ มันคือม่าน ที่โดนลมพัด',
    'เวลาส่องรูเล็กๆ คนเรามักใช้ตาข้างถนัด ลองหาตาข้างถนัดของคุณดู',
    'ทำสามเหลี่ยมด้วยมือสองข้าง เหยียดแขน ลืมตาทั้งสองข้าง แล้วส่องของที่อยู่ไกล',
    'ตาข้างที่ยังเห็นของอยู่ในสามเหลี่ยม คือตาข้างถนัดของคุณ',
    'คุณเอาตาข้างถนัด แนบตาแมว',
    'ไฟทางเดินดับ มีแค่แสงไฟทางหนีไฟสีเขียว',
    'มีคนยืนก้มหน้าอยู่ ใส่เสื้อสีดำ',
    'คุณบอกตัวเอง ในที่มืด สีแดงก็ดูเป็นสีดำ',
    'คุณเอื้อมมือไปปลดกลอน',
    'แล้วมือถือก็สั่นอีกครั้ง',
    'เพื่อนพิมพ์มาว่า รถติดมาก ยังไม่ถึงเลย',
    'แล้วเสียงหน้าประตู ก็เรียกชื่อคุณอีกครั้ง',
    'ตอนต่อไป ถ้ามันโดนตา',
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
