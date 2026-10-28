# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โป๊ก are punchy. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ติดสิวะ! ติด!',
    'ระฆังเงียบแล้ว และพวกมันหันกลับมาหาเรา',
    'ตีหนึ่งสองนาที วันที่สาม',
    'เรือรบออกตอนรุ่งสาง ต้องถึงปากน้ำให้ทัน',
    'ติดแล้ว! นั่งดีๆ วินเรือมาแล้ว!',
    'ออกจากคลอง เจ้าพระยามืดสนิท',
    'แต่เสียงดัง คือเหยื่อล่อ',
    'ข้าวตังเห่าขึ้นไปบนสะพานพุทธ',
    'บนสะพาน! หมอบ!',
    'ลงผิดป้ายแล้วพี่!',
    'ตัวที่สอง สาม สี่ ร่วงลงมาไม่หยุด',
    'ฝนตกหนักเลย ไม่ได้หมายถึงเธอนะ!',
    'ตีที่หัว! อย่าให้มันกัด!',
    'เรือเอียง มิวลื่นไถลไปท้ายเรือ',
    'มิวเป่านกหวีดลุงชาญ ข้าวตังพุ่งมางับ!',
    'ค่าโดยสาร ซอมบี้ไม่รับ!',
    'ตัวสุดท้าย จมหายไปในแม่น้ำ',
    'ดับเครื่อง ลอยตามน้ำไปเงียบๆ ทั้งคืน',
    'ลุงชาญจะรู้ไหม ว่าเรารอด',
    'รู้สิ ลุงตีระฆังดังขนาดนั้น',
    'ไฟเรือรบอยู่ตรงหน้าแล้ว',
    'แต่ข้าวตัง ขู่ใส่น้ำใต้ท่าเรือ',
    'มือซีดๆ โผล่ขึ้นมาคว้ามิว',
    'ปล่อยน้องนะ!',
    'เต้ดึงมิวกลับมาได้ แต่แขนเขา',
    'แค่ ข่วนน่า',
    'ตอนหน้า รุ่งเช้าที่ปากน้ำ',
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
