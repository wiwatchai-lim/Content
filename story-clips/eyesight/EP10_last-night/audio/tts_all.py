# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ตีห้ายี่สิบ คุณวิ่งมาถึงบ้านหลังสุดท้าย ท้ายหมู่บ้าน',
    'ลุงคนหนึ่งเปิดประตู ดึงคุณเข้าไป แล้วลงกลอน',
    'มันตามมาถึงหน้าบ้านแล้ว',
    'ลุงคลี่ยันต์เก่าออกมา บอกว่าต้องอ่านให้จบ ก่อนมันเข้ามา',
    'แต่ตัวหนังสือเล็กนิดเดียว ลุงยื่นออกไปสุดแขน ก็ยังอ่านไม่ออก',
    'กฎข้อแรก เลนส์ในตา จะแข็งขึ้นตามอายุ',
    'พออายุราวสี่สิบ การเพ่งดูใกล้ จะเริ่มยากขึ้น',
    'เราเลยถือมือถือ ถือกระดาษ ห่างออกไปเรื่อยๆ เหมือนแขนสั้นลง',
    'นี่คือสายตายาวตามวัย เป็นเรื่องปกติ ไม่ใช่โรค',
    'แว่นอ่านหนังสือ หรือเลนส์โปรเกรสซีฟ ช่วยได้',
    'ลองเองตอนนี้ ยื่นนิ้วชี้ออกไปสุดแขน',
    'แล้วค่อยๆ เลื่อนเข้าหาหน้า มองลายนิ้วไว้',
    'หยุดตรงที่เริ่มเบลอ',
    'ระยะนั้น คือจุดใกล้สุดที่ตาคุณยังชัด อายุยิ่งมาก มันยิ่งไกลออกไป',
    'เสียงเล็บขูดกระจก ดังมาจากหน้าต่าง',
    'แล้วคุณก็เห็น แว่นอ่านหนังสือ เสียบอยู่ในกระเป๋าเสื้อลุง',
    'คุณสวมแว่นให้ลุง ลุงอ่านคำสุดท้าย ตอนที่มันแนบหน้ากับกระจก',
    'ฟ้าสาง แสงแรกส่องเข้ามา แล้วมันก็หายไป',
    'กฎข้อสอง ตรวจสายตาปีละครั้ง',
    'สายตาเปลี่ยนช้าๆ จนเราไม่รู้ตัว และตาข้างที่ดี ก็บังตาข้างที่อ่อนไว้ได้',
    'ถ้าเริ่มอ่านใกล้ไม่ชัด ไปตรวจกับจักษุแพทย์ หรือนักทัศนมาตร',
    'บนกระจกที่ขึ้นฝ้า มีตัวหนังสือเล็กๆ เขียนไว้จากข้างนอก',
    'เจอกันปีหน้า',
    'จบซีซั่นหนึ่ง ขอบคุณที่รอดมาด้วยกัน',
]
if __name__ == '__main__':
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
