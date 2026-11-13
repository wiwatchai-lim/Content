# One Gemini TTS request for all lines (saves the free daily quota); split with split.py.
import base64, json, os, urllib.request, wave
M = 'gemini-3.1-flash-tts-preview'; VOICE = 'Puck'
STYLE = ('Read this Thai promo for an eyewear shop in Hua Hin as a friendly, upbeat young Thai man talking to friends on TikTok. '
         'Lively and warm, natural Thai pronunciation, a little playful on the funny lines, smiling voice. '
         'Pause for two full seconds between each line:\n\n')
LINES = [
    'อยู่หัวหิน แต่ยังต้องทนใส่แว่นที่มองอะไรก็ไม่ชัดอยู่เหรอ?!',
    'เอาจริงนะ แว่นตาเนี่ย เป็นของที่เราใช้แทบทุกวัน',
    'ตื่นมาก็ใส่ ทำงานก็ใส่ ขับรถก็ใส่',
    'บางคนใส่จนแทบจะเป็นอวัยวะที่สามสิบสาม ไปแล้ว!',
    'แต่รู้ไหมว่า แว่นที่ดีไม่ได้มีแค่ใส่แล้วมองเห็นชัดนะ',
    'มันต้องใส่สบาย เข้ากับรูปหน้า น้ำหนักไม่กดจมูก',
    'และที่สำคัญคือต้องได้เลนส์ที่เหมาะกับสายตาของเราด้วย',
    'เพราะฉะนั้น ถ้ากำลังมองหาร้านแว่นดีๆ ในหัวหิน',
    'อยากให้ลองแวะมาที่ ไทม์ ออฟติก',
    'ร้านแว่นที่พร้อมดูแลเรื่องสายตาของคุณ',
    'ไม่ว่าจะกำลังหาแว่นสายตา แว่นใส่ทำงาน หรืออยากเปลี่ยนลุคให้ตัวเองดูดีขึ้น',
    'เพราะเราเชื่อว่า แว่นที่ใช่ ไม่ใช่แค่ทำให้คุณมองเห็นชัด แต่ต้องทำให้คุณใส่แล้วมั่นใจด้วย',
    'ใครอยู่หัวหิน หรือแวะมาเที่ยวหัวหิน แล้วกำลังมองหาแว่นคู่ใหม่',
    'จำชื่อร้านนี้ไว้เลยนะ ไทม์ ออฟติก',
    'แว่นคู่ใหม่ของคุณ อาจอยู่ใกล้กว่าที่คิด!',
    'แวะมาดูแลสายตากันได้ แล้วเจอกันที่ ไทม์ ออฟติก นะครับ!',
]
if __name__ == '__main__':
    body = json.dumps({'contents': [{'parts': [{'text': STYLE + '\n\n'.join(LINES)}]}],
                       'generationConfig': {'responseModalities': ['AUDIO'],
                                            'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': VOICE}}}}}).encode()
    req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{M}:generateContent', body,
                                 {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
    r = json.load(urllib.request.urlopen(req, timeout=600))
    pcm = base64.b64decode(r['candidates'][0]['content']['parts'][0]['inlineData']['data'])
    with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'all.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
    print(round(len(pcm) / 48000, 2), 's')
