# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โป๊ก are punchy. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ห้าโมงสี่สิบ อนุสาวรีย์ชัยฯ คนกำลังกัดคน',
    'เต้ วินมอไซค์ อดีตนักมวย กำลังจะเลิกงาน',
    'ผู้โดยสารคนสุดท้าย วิ่งมา เลือดเต็มคอ',
    'เขาไม่ได้จะไปไหน เขาจะกินเต้',
    'ตุ้บ! หมวกกันน็อกใบเดียว ลงกลางหัว',
    'เต้บิดคันเร่ง สวนทางคนที่วิ่งหนี',
    'รถเมล์ติดยาว บนหลังคา มีพยาบาลคนหนึ่ง',
    'ในมือมีแค่เสาน้ำเกลือ และมันกำลังปีนขึ้นมา',
    'พี่! รอแป๊บ! วินมาแล้ว!',
    'ล้อหน้ายกขึ้นกระบะท้ายรถ ลอยขึ้นหลังคา',
    'หมวกฟาดตัวแรก ตุ้บ! ร่วงลงถนน',
    'เข่าลอยใส่ตัวที่สอง ล้มทับเพื่อนมัน',
    'ตีที่หัว! ที่อื่นมันไม่หยุด!',
    'รู้แล้วพี่! ผมต่อยแต่หัวมาสิบปี!',
    'ตัวหนึ่งพุ่งจากหน้าต่าง คว้าข้อเท้าฝน',
    'เสาน้ำเกลือ กระแทกลงกลางหน้า เคร้ง!',
    'อีกตัวกระโจนใส่หลังเต้',
    'เต้หมุนตัว ศอกกลับหลัง โป๊ก!',
    'แต่เสียงดัง เรียกฝูงทั้งสี่แยก มาหาพวกเขา',
    'พี่ฝน! ขึ้นรถ! ค่าวินฟรี!',
    'กระโดดจากหลังคา ลงเบาะ บิดหนีสุดคันเร่ง',
    'ราชวิถี ร้านปิดประตูเหล็ก พวกเขามุดเข้าไปได้ทัน',
    'ฉันชื่อฝน พยาบาลห้องฉุกเฉิน',
    'เต้ครับ วันนี้ปิดยอดพอดี',
    'วิทยุในร้านดังขึ้น อย่าเข้าใกล้คนที่ถูกกัด',
    'ฝนดึงแขนเสื้อขึ้น มีรอยข่วน เลือดซึม',
    'เต้ค่อยๆ เอื้อมมือ ไปที่หมวกกันน็อก',
    'ตอนหน้า เซเว่นตีสอง',
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
