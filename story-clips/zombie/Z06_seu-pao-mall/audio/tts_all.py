# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai zombie action story as an intense, fast, exciting Thai action-movie narrator. '
         'Punchy energy, clear Thai pronunciation, urgent during the fight, lower and tense near the end. '
         'Lines that are characters shouting should be acted out with energy. Sound words like ตุ้บ เคร้ง โป๊ก are punchy. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'ไฟหน้ารถส่องเข้ามา ไม่มีทางหนี',
    'อยากไปป้อมพระจุลฯ ใช่มั้ย ขึ้นรถสิ',
    'เสี่ยเปา เจ้าของห้างที่ยังมีไฟใช้',
    'ข้าวร้อนๆ น้ำเย็นๆ เหมือนโลกยังไม่จบ',
    'แต่เสี่ยมองแผลที่แขนมิวนานเกินไป',
    'เด็กไม่กลายร่าง… คนบนเรือจ่ายหนักแน่',
    'ประตูเหล็กปิดลง เราติดอยู่ในกรง',
    'แล้วคาราโอเกะของพวกมันก็ดังเกินไป',
    'กลางคืน… ตัววิ่งได้ยินทุกอย่าง',
    'เพล้ง! กระจกหน้าห้างแตกทั้งแผง',
    'ข้าวตังมุดลอดกรง คาบกุญแจกลับมา',
    'หมาตัวเดียว ทำงานเยอะกว่าผมอีก',
    'ข้างหน้าคือลูกน้องเสี่ย ข้างหลังคือฝูงตัววิ่ง',
    'ลุงชาญยืนขวางบันไดเลื่อน คนเดียว',
    'เสี่ยลากมิวขึ้นไปชั้นบน',
    'พี่เต้!',
    'ฝนเหวี่ยงเสาน้ำเกลือ กระชากมิวกลับมา',
    'แต่ตัววิ่งตัวหนึ่ง กัดมือเสี่ยเข้าเต็มๆ',
    'เราขังตัวเองในห้องเก็บของ',
    'ฝนพันแผลให้เต้ มือยังสั่นอยู่',
    'มิวกอดข้าวตังแน่น ไม่ยอมปล่อย',
    'ลุงชาญมองผ่านช่องประตู',
    'เสี่ยเปายืนดูมือตัวเอง… แล้วหัวเราะ',
    'ไว้เจอกันที่ท่าเรือนะ เด็กน้อย',
    'แล้วเขาก็หายไปในความมืด',
    'ตอนหน้า จตุจักรเที่ยงคืน',
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
