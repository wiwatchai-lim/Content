# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story (the season finale) as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โครม เปรี๊ยะ are punchy. The little girl line is small and scared. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'สองนาทีสี่สิบวิ… ก่อนเต้จะไม่ใช่เต้',
    'ป้อมพระจุลฯ ตีห้าห้าสิบสี่ วันที่สาม',
    'วิ่งไปที่สะพานเรือ! อย่าหยุด!',
    'หยุด! คนถูกกัดห้ามขึ้นเรือ!',
    'ผมไม่ขึ้นหรอก… พาน้องขึ้นไป',
    'ข้าวตังหันไปเห่าใส่ตู้คอนเทนเนอร์',
    'เขาบอกว่า… เจอกันที่ท่าเรือ',
    'ประตูตู้ปลิวออก… เสี่ยเปามาตามนัด',
    'สูงสามเมตร ใส่ประตูรถเป็นเกราะ',
    'เสี่ย… มาทวงหนี้ถึงปากน้ำเลยเหรอ',
    'เข่า! ศอก! …ไม่สะเทือนเลยว่ะ',
    'ไม้กอล์ฟฟาดทีเดียว เต้ลอยไปชนถังน้ำมัน',
    'ข้อพับเข่า! ตรงนั้นไม่มีเกราะ!',
    'เสาน้ำเกลือฟาดเข้าข้อพับ… มันทรุดลง',
    'มือเต้เริ่มสั่น… เส้นสีเทาวิ่งขึ้นคอ',
    'ยังก่อน… ขอต่อยให้จบยกนี้ก่อน',
    'เสี่ยเปาคว้าตัวมิวขึ้นมา',
    'มิวเป่านกหวีด… ข้าวตังงับมือที่โดนกัด!',
    'เสี่ย… ขึ้นเรือผิดลำแล้ว!',
    'พระอาทิตย์โผล่… เข่าลอยครั้งสุดท้าย',
    'ตุ้มถ่วงร่วง… ลากเสี่ยเปาจมลงทะเล',
    'เงียบ… เหลือแต่เสียงคลื่น',
    'ฝน… ถ้าผมเปลี่ยน ตีหัวผมแรงๆ นะ',
    'หุบปาก… นายจะไม่เป็นอะไร',
    'เลือดหนูกันได้… ใช่ไหมพี่ฝน',
    'ศูนย์…',
    'แล้วเต้… ลืมตา',
    'ยืนยัน… พบตัวเด็กแล้ว',
]
body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES)}]}],
                   'generationConfig': {'responseModalities': ['AUDIO'],
                                        'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': 'Sulafat'}}}}}).encode()
req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                             {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
r = json.load(urllib.request.urlopen(req, timeout=600))
if 'content' not in r['candidates'][0]: raise SystemExit('no audio: ' + json.dumps(r, ensure_ascii=False)[:800])
pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'all.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(round(len(pcm) / 48000, 2), 's')
