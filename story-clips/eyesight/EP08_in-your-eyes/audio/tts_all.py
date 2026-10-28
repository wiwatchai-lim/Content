# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ห้าทุ่มห้าสิบเจ็ด อีกสามนาทีเที่ยงคืน',
    'เสียงนั้นเรียกชื่อคุณอีกครั้ง แล้วกลอนประตูก็หลุด',
    'คุณฉีดน้ำยาล้างห้องน้ำ ใส่มันสุดแรง',
    'แต่ละอองน้ำยากับฝุ่น ย้อนเข้าตาคุณเอง',
    'แสบจนลืมตาไม่ขึ้น',
    'กฎข้อแรก สารเคมีเข้าตา ล้างด้วยน้ำสะอาดไหลผ่านทันที อย่างน้อยสิบห้านาที',
    'ถ่างเปลือกตาไว้ กลอกตาไปมา ให้น้ำล้างทั่ว',
    'อย่ารอ อย่าเอาอย่างอื่นมาหยอดแทน',
    'น้ำยาล้างห้องน้ำ ทำร้ายตาได้รุนแรง ล้างเสร็จ ต้องไปหาหมอตาทันที',
    'คุณคลำไปที่อ่าง ล้างตาไม่หยุด จนตาขวาลืมได้',
    'แต่ตาซ้ายยังมีฝุ่นติด เคืองจนอยากขยี้',
    'กฎข้อสอง อย่าขยี้ ฝุ่นอาจขูดกระจกตาเป็นแผล',
    'กะพริบตา ให้น้ำตาชะมันออก ถ้ายังเจ็บ เคืองค้าง หรือตามัว ไปหาหมอ',
    'ตอนนี้คุณเหลือตาเดียว ลองดูว่าต่างกันแค่ไหน',
    'ถือปากกาสองด้าม เหยียดแขน ปิดตาข้างหนึ่ง แล้วแตะปลายให้ชนกันเร็วๆ',
    'ทีนี้ลืมสองตา แล้วลองใหม่',
    'ตาเดียว กะระยะพลาดง่ายกว่า เพราะสองตาช่วยกัน บอกความใกล้ไกล',
    'คุณเงยหน้า มองด้วยตาขวาข้างเดียว',
    'มันยืนอยู่ตรงประตู อีกฟากห้อง ยังไกลอยู่',
    'แล้วตาซ้ายก็ลืมขึ้น',
    'มันไม่ได้อยู่ที่ประตู',
    'มันอยู่ตรงหน้าคุณ ห่างแค่ช่วงแขน',
    'ตอนต่อไป ถ้ามันรออยู่ในหมอก',
]
if __name__ == '__main__':
    body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES)}]}],
                       'generationConfig': {'responseModalities': ['AUDIO'],
                                            'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': 'Sulafat'}}}}}).encode()
    req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                                 {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
    r = json.load(urllib.request.urlopen(req, timeout=600))
    c = r['candidates'][0]
    if 'content' not in c: raise SystemExit('no audio: ' + json.dumps({k: v for k, v in c.items() if k != 'content'})[:500])
    pcm = base64.b64decode(c['content']['parts'][0]['inlineData']['data'])
    with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'all.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
    print(round(len(pcm) / 48000, 2), 's')
