# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ตีสามห้านาที คุณมาถึงบ้าน',
    'ไฟสองดวงที่ตามมา หายไปตรงหัวโค้ง',
    'คุณเปิดประตู ทางเดินในบ้านมืดสนิท',
    'แล้วคุณก็เห็น เงาดำก้อนหนึ่งลอยอยู่กลางทางเดิน',
    'คุณมองซ้าย มันลอยไปซ้าย คุณมองขวา มันลอยไปขวา',
    'กฎข้อแรก ถ้ามันขยับตามสายตาคุณเป๊ะๆ มันไม่ได้อยู่ข้างนอก มันอยู่ในตาคุณ',
    'มันคือภาพติดตา จากไฟจ้าที่คุณจ้องมาตลอดทาง กะพริบตาช้าๆ แล้วมันจะจางไปเอง',
    'แต่มีอีกอย่างที่ต้องรู้',
    'ถ้าจู่ๆ เห็นจุดลอยเพิ่มขึ้นเยอะ หรือเห็นแสงแวบๆ ที่หางตา',
    'อาจเป็นสัญญาณจอตาฉีกขาด ต้องไปหาหมอตาทันที',
    'เงาดำจางหายไปแล้ว ปลายทางเดินว่างเปล่า',
    'คุณขยี้ตาซ้าย แล้วหลับมันไว้',
    'กฎข้อสอง ตาทุกข้างมีจุดบอด ตรงที่เส้นประสาทตาออกจากลูกตา',
    'ตอนหลับตาข้างเดียว อะไรที่อยู่ตรงจุดบอด จะหายไปเฉยๆ',
    'ลองเองตอนนี้ ปิดตาซ้าย จ้องกากบาท แล้วค่อยๆ ขยับหน้าเข้าใกล้จอ',
    'จุดแดงหายไปใช่ไหม',
    'คุณลืมตาทั้งสองข้าง',
    'และร่างนั้น ยืนอยู่ปลายทางเดินมาตลอด',
    'ตอนต่อไป ถ้าเช้าแล้ว มันยังไม่ไป',
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
