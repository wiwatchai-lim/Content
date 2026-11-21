# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, sys, urllib.request, wave
# usage: tts_all.py [first last]  (1-based, inclusive) -> all.wav or part_<first>.wav
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai short story as a calm Thai male storyteller, gentle and heartfelt, natural pace, clear Thai pronunciation. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ร้านแว่นของปู่… ปิดมาสิบปี จนคืนที่ผมย้ายเข้ามาอยู่',
    'ตึกแถวไม้ริมคลอง กลิ่นฝุ่น กับตู้กระจกที่เต็มไปด้วยแว่นเก่า',
    'คืนแรก ตีสองตรง… กระดิ่งหน้าร้านดังขึ้น',
    'ทั้งที่ประตูเหล็ก ผมล็อกเองกับมือ',
    'หน้าตู้กระจก มีคุณยายคนหนึ่งยืนอยู่ ผมมวยสีเงิน ชุดลูกไม้สีครีม',
    'พ่อหนุ่ม… ร้านเปิดอยู่ไหมจ๊ะ',
    'ปิดแล้วครับยาย… เอ่อ ยายเข้ามาได้ยังไงครับ',
    'ยายไม่ตอบ แค่ยื่นแว่นกรอบทองให้ เลนส์ร้าวทั้งสองข้าง',
    'ยายอ่านจดหมายไม่ออกมาหลายปีแล้ว… ช่วยยายหน่อยนะ',
    'ผมควรจะกลัว… แต่มือยายสั่น เหมือนมือยายของผมเอง',
    'ผมเปิดลิ้นชักของปู่ เครื่องมือยังอยู่ครบ เหมือนรอใครสักคน',
    'ผมฝนเลนส์ใหม่ทั้งคืน ไฟในร้านกะพริบตามเสียงเครื่อง',
    'พอใส่เลนส์ข้างสุดท้ายเสร็จ นาฬิกาบอกตีห้า',
    'ยายสวมแว่น… แล้วยิ้ม เหมือนเด็กเห็นทะเลครั้งแรก',
    'ยายคลี่จดหมายกระดาษสีเหลือง ลายมือเอียงๆ ตัวเล็กๆ',
    'แม่ครับ ผมได้งานแล้ว ปีใหม่นี้ผมจะกลับบ้าน',
    'ยายอ่านซ้ำสามรอบ แล้วกอดจดหมายไว้แน่น',
    'ขอบใจนะพ่อหนุ่ม… ค่าแว่น ยายฝากไว้ในสมุดของปู่แล้ว',
    'ผมก้มลงหยิบผ้าเช็ดแว่น… พอเงยหน้าขึ้นมา ร้านว่างเปล่า',
    'เหลือแต่กลิ่นดอกมะลิ กับประตูเหล็กที่ยังล็อกอยู่',
    'ผมเปิดสมุดบัญชีของปู่ หน้าสุดท้าย ลายมือปู่เขียนไว้ว่า',
    'คุณยายจันทร์ แว่นกรอบทอง ยังไม่ได้มารับ ปีสองห้าหนึ่งเก้า',
    'ใต้บรรทัดนั้น มีหมึกสีใหม่เอี่ยม… จ่ายแล้ว',
    'สายวันนั้น มีชายแก่คนหนึ่งเดินเข้าร้าน ในมือถือรูปถ่ายเก่าๆ',
    'ผมตามหาบ้านของแม่มาสี่สิบปี… ใช่ที่นี่ไหมครับ',
    'ในรูป… คือคุณยายผมมวยสีเงิน ใส่แว่นกรอบทอง',
    'ร้านแว่นตีสอง… ลูกค้าคนต่อไป มาก่อนตีสองด้วยซ้ำ',
]
A, B = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (1, len(LINES))
OUT = 'all.wav' if (A, B) == (1, len(LINES)) else f'part_{A:02d}.wav'
body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES[A-1:B])}]}],
                   'generationConfig': {'responseModalities': ['AUDIO'],
                                        'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': 'Charon'}}}}}).encode()
req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                             {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
r = json.load(urllib.request.urlopen(req, timeout=600))
if 'content' not in r['candidates'][0]: raise SystemExit('no audio: ' + json.dumps(r, ensure_ascii=False)[:800])
pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), OUT), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
print(round(len(pcm) / 48000, 2), 's')
