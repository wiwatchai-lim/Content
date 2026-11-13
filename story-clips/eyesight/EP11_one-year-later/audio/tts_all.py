# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'
STYLE = ('Read this Thai ghost survival story as a calm, low, suspenseful Thai storyteller, speaking to the listener as "you". '
         'Natural pace, clear Thai pronunciation, slightly tense, never shouting. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'หนึ่งปีผ่านไป คุณกลับมาตรวจตา ตามที่สัญญาไว้',
    'ทุ่มครึ่ง คลินิกกำลังจะปิด คุณคือคนไข้คนสุดท้าย',
    'หมอให้มองจุดตรงกลางเครื่อง เห็นแสงตรงไหน ให้กดปุ่ม',
    'แสงวาบขึ้นทีละจุด แต่ทางซ้าย คุณไม่เห็นอะไรเลย',
    'ผลที่ออกมา มีรอยดำ อยู่ด้านซ้าย',
    'คุณไม่เจ็บ ไม่ปวด ไม่รู้สึกอะไรเลย',
    'กฎข้อแรก ต้อหิน ขโมยภาพจากด้านข้างก่อน',
    'ต้อหินส่วนใหญ่ไม่เจ็บ ภาพตรงกลางยังชัด สมองก็เติมส่วนที่หายให้ จนเราไม่รู้ตัว',
    'ส่วนที่หายไปแล้ว เอากลับคืนไม่ได้ แต่ถ้าเจอเร็ว รักษาเพื่อชะลอได้',
    'ลองเองตอนนี้ ปิดตาข้างหนึ่ง มองจุดกลางจอ',
    'ยื่นมือไปด้านข้าง กระดิกนิ้ว แล้วค่อยๆ เลื่อนเข้ามา',
    'หยุดตรงที่เริ่มเห็นนิ้ว โดยที่ตายังไม่ขยับ',
    'แล้วสลับตา ถ้าสองข้างเห็นต่างกันมาก ให้ไปตรวจ',
    'แต่ถึงเห็นเท่ากัน ก็ยังเป็นได้ เพราะระยะแรก ตรวจเองไม่เจอ',
    'กฎข้อสอง ต้อหินต้องให้หมอตรวจ',
    'วัดความดันตา ดูขั้วประสาทตา และตรวจลานสายตา',
    'อายุเกินสี่สิบ มีคนในบ้านเป็นต้อหิน หรือสายตาสั้นมาก ยิ่งควรตรวจ',
    'หมอตรวจคุณซ้ำทุกอย่าง แล้วเงยหน้าขึ้นมา',
    'ความดันปกติ เส้นประสาทปกติ ตาคุณไม่ได้เป็นอะไรเลย',
    'หมอหยิบผลตรวจขึ้นมาดูอีกครั้ง',
    'รอยดำนั้น มีหัว มีไหล่',
    'มันคือเงาของอะไรบางอย่าง ที่ยืนบังแสงอยู่ทางซ้ายของคุณ',
    'ตลอดการตรวจ',
    'ตอนต่อไป ถ้าโลกเริ่มขุ่น',
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
