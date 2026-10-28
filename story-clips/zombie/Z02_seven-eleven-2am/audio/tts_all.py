# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โครม เปรี๊ยะ are punchy. The little girl line is small and scared. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ตีสอง ไฟดับทั้งเขต… มีมือแปะกระจก ทีละมือ',
    'แปดชั่วโมงก่อน ฝนโดนข่วน และเธอยังไม่เปลี่ยน',
    'แต่ไม่มีใครรู้… ว่ารอยข่วน นับด้วยไหม',
    'ถ้าฉันเปลี่ยน ตีหัวเลยนะ ไม่ต้องลังเล',
    'ได้พี่ แต่ขอซื้อขนมก่อนนะ',
    'หลังร้าน มีเสียงขูดประตูเบาๆ… แล้วเงียบ',
    'กลางคืน พวกมันไม่เดินแล้ว… มันวิ่ง',
    'กระจกร้าว เปรี๊ยะ! แล้วแตกทั้งบาน',
    'ฝนถีบชั้นวาง ล้มขวางทาง โครม!',
    'ตัวแรกข้ามมา โดนประตูตู้แช่ หนีบหัว เคร้ง!',
    'เต้ปากระป๋องปลากระป๋อง ใส่หน้าตัวที่สอง',
    'ซื้อครบสามร้อย ได้แสตมป์ไหมพี่!',
    'ตู้ไอติม! เปิดฝาไว้!',
    'ตัวที่สามพุ่งใส่ ฝนหลบ มันดิ่งลงตู้',
    'ปิดฝา! ฝนนั่งทับ มันทุบอยู่ข้างใต้',
    'ตัวใหญ่สุด กระโจนข้ามเคาน์เตอร์…',
    'เต้เหวี่ยงหมวกกลางอากาศ… ตุ้บ!',
    'แต่เต้ไม่เห็น ตัวที่คลานมาข้างหลัง',
    'โฮ่ง! เสียงหมาเห่า จากหลังร้าน',
    'เต้หันทัน ศอกลงกลางหัว ร่วงไม่ลุก',
    'ทั้งคู่ดันตู้น้ำ ปิดหน้าร้าน… เงียบแล้ว',
    'หมา… ในร้านเซเว่นเหรอพี่',
    'ประตูหลังร้าน ค่อยๆ แง้มออก',
    'ไฟฉายส่องหน้า… เด็กผู้หญิง กอดหมาสีน้ำตาล',
    'อย่าตีหนูนะ… ข้าวตังเห่าช่วยพี่แล้ว',
    'ในแสงไฟฉาย ฝนเห็นเศษกระจก ฝังอยู่ในแผล',
    'กระจกรถเมล์… ไม่ใช่เล็บมัน',
    'ตอนหน้า ขบวนสุดท้าย',
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
