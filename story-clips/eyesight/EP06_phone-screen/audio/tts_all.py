# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'สี่ทุ่มสิบนาที แบตกลับมาแล้ว',
    'คุณนั่งไถมือถือในห้องมืด มาสามชั่วโมง',
    'ค้นหาอยู่ประโยคเดียว ทำยังไงให้มันไป',
    'ตาคุณเริ่มแสบ แห้ง เหมือนมีทรายอยู่ในตา',
    'กฎข้อแรก ตอนจ้องจอ คุณกะพริบตาน้อยลง เหลือราวหนึ่งในสาม',
    'ปกติเรากะพริบตา นาทีละราวสิบห้าครั้ง แต่ตอนจ้องจอ เหลือแค่ห้า',
    'ผิวตาแห้ง เลยแสบ ให้ตั้งใจกะพริบตา ช้าๆ ให้สุด',
    'กฎข้อสอง ทุกยี่สิบนาที มองไกลหกเมตร นานยี่สิบวินาที',
    'กล้ามเนื้อที่ใช้เพ่งใกล้ จะได้คลายตัว',
    'ลองเลยตอนนี้ ละสายตาจากจอ มองไปที่ไกลที่สุดในห้อง',
    'ดีมาก',
    'และอย่าเปิดจอสว่างเต็มที่ ในห้องมืดสนิท เปิดไฟในห้อง หรือหรี่จอลง',
    'คุณวางมือถือลง แล้วจอก็ดับไปเอง',
    'ในกระจกจอสีดำ คุณเห็นหน้าตัวเอง',
    'และอีกหน้าหนึ่ง อยู่ข้างหลังไหล่คุณ',
    'มันจ้องจอ อยู่กับคุณมาตลอด',
    'ตอนต่อไป ถ้ามันรู้ชื่อคุณ',
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
