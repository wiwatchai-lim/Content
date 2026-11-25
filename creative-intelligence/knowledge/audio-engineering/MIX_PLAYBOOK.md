# MIX_PLAYBOOK — VO-first mix for social video

ใช้กับทุกคลิปที่มีเสียงพูด (TTS หรืออัดจริง) + เพลง + SFX. หลักการ: **คำพูดต้องเข้าใจได้บนลำโพงมือถือที่เปิดเบา** ทุกอย่างอื่นจัดรอบ VO
ทฤษฎีและหลักฐาน: `README.md` ในโฟลเดอร์นี้. ป้าย: **[S/A]** = มีหลักฐานมาตรฐาน/วิจัย, **[C]** = เอกสารแพลตฟอร์ม, **[D]** = craft ค่าตั้งต้น (ปรับด้วยหู)
คำสั่งทั้งหมดทดสอบแล้วบน ffmpeg 9.0 (gyan.dev build) กับไฟล์สังเคราะห์ เมื่อ 2026-11-25

---

## 0. Targets (สรุปหน้าเดียว)

| สิ่งที่วัด | ค่าเป้า | ที่มา |
|---|---|---|
| Integrated loudness (คลิปโซเชียล) | **-14 LUFS** (±1) | [C] Spotify ทางการ; YouTube/TikTok/IG ไม่มีค่าทางการ — ค่าปลอดภัย |
| True peak ส่งออก | **≤ -1.5 dBTP** (ห้ามเกิน -1.0) | [S] R128 -1 dBTP; [C] Spotify -1/-2 สำหรับ lossy |
| Speech-only (podcast/เสียงล้วน) | -16 LUFS (Apple) / -18 (TD1008 speech) | [C]/[S] |
| Broadcast (ถ้าลูกค้าขอ) | -23 LUFS ±1 LU, ≤ -1 dBTP | [S] EBU R128 |
| VO vs music ระหว่างพูด | **VO ดังกว่า ≥ 10 LU** (12–15 ดีกว่าบนมือถือ) | [A] Torcoli 2019 |
| VO vs ambience/room tone | **≥ 15 LU** | [A] Torcoli 2019 |
| Loudness range (LRA) | 4–10 LU สำหรับคลิปสั้น | [D] |
| Mono fold | integrated ไม่ตกเกิน ~3 LU, VO ไม่จาง | [D] |
| Sample rate / format | 48 kHz, ทำงาน 24-bit/float, ส่ง AAC ≥ 192 kbps | [B]/[D] |
| ขอบเงียบ | หัว/ท้าย VO < 0.6 s (qc.py มีแล้ว) | (ของเดิม) |

---

## 1. Gain staging (ก่อนทุกอย่าง)
1. แปลงทุกไฟล์เป็น 48 kHz ครั้งเดียว: `ffmpeg -i in.wav -ar 48000 -c:a pcm_s24le in48.wav`
2. ตั้ง stem ให้อยู่ราว ๆ เดียวกันก่อน mix [D]: VO ~ -18 ถึง -16 LUFS, music bed ~ -30 ถึง -26 LUFS (ขณะมี VO), ambience ~ -36 ถึง -32 LUFS, SFX hit วัดเป็น momentary ไม่ใช่ integrated
3. ไม่มี stem ใดมี sample peak เกิน -3 dBFS ก่อนเข้า bus

## 2. VO chain (ตามลำดับ)

| # | ขั้น | ค่าเริ่ม [D] | หมายเหตุ |
|---|---|---|---|
| 1 | High-pass | 70–100 Hz (เสียงผู้ชายต่ำ 70, ผู้หญิง/TTS 90–100) | ตัด rumble/pop, ช่วย headroom |
| 2 | Noise reduction (เฉพาะเสียงอัดจริง) | `afftdn` nr 6–12 dB, nf -50 ถึง -40 | TTS ข้ามขั้นนี้; มากไป = เสียงใต้น้ำ |
| 3 | Gate/expander (เฉพาะเสียงอัด) | range ลดแค่ 10–20 dB | ไม่ปิดสนิท ให้ room tone เหลือ |
| 4 | Subtractive EQ | 200–400 Hz -2 ถึง -4 dB (Q ~1.2) ถ้าเสียงมัว/อู้ | ฟังก่อน ไม่ใช่ทุกเสียง |
| 5 | De-esser | 5–8 kHz, ลดสูงสุด 3–6 dB | [D] SOS; TTS ไทยบางเสียง ส/ช แหลม |
| 6 | Compressor | 2:1–4:1, GR 3–6 dB, attack 5–20 ms, release 80–200 ms, soft knee | ให้ VO เรียบบนมือถือ |
| 7 | Presence EQ (ถ้าจำเป็น) | 2–5 kHz +1 ถึง +3 dB หรือ high-shelf 8 kHz +1–2 | หลัง compressor |
| 8 | Limiter (กัน peak) | ceiling -3 dBFS ที่ระดับ stem | true-peak สุดท้ายทำที่ master |

```bash
# VO chain (TTS) — ปรับค่าด้วยหู
ffmpeg -i vo48.wav -af "highpass=f=90,\
equalizer=f=300:t=q:w=1.2:g=-3,\
deesser=i=0.4:f=0.5,\
acompressor=threshold=0.1:ratio=3:attack=10:release=120:knee=2.8:makeup=2,\
equalizer=f=3500:t=q:w=1.0:g=2,\
alimiter=limit=0.708:attack=5:release=50" -ar 48000 vo_chain.wav
# limit=0.708 ≈ -3 dBFS.  เสียงอัดจริง: แทรก afftdn=nr=10:nf=-45 หลัง highpass
```
หมายเหตุ ffmpeg: `threshold`/`limit` เป็นค่า linear (0.1 ≈ -20 dBFS, 0.125 ≈ -18 dBFS); `deesser f` เป็นสัดส่วน 0–1 ของ Nyquist ไม่ใช่ Hz — ตั้งด้วยหู

## 3. Music bed around VO
1. **เลือกเพลงให้ถูกก่อน** (ดู `../music/MUSIC_DIRECTION.md`): ไม่มีเนื้อร้องใต้ VO, เพลงนิ่ง ๆ ดีกว่าเพลงที่เปลี่ยนสเปกตรัมถี่ [A irrelevant sound effect]
2. **Carve** [D]: ระหว่าง VO ลดเพลง 1–4 kHz -3 ถึง -6 dB (เปิด/ปิดตามช่วงพูด หรือทั้งคลิปถ้าพูดตลอด), HPF เพลง 100–150 Hz ถ้าเพลงเบสหนัก
3. **Duck**: เป้า LD ≥ 10 LU [A]; ramp ลง 100–200 ms ก่อนคำแรก, ขึ้นกลับ 300–600 ms หลังคำสุดท้าย; ช่องว่าง > 1.5 s ให้เพลงกลับขึ้นมาเป็น "ลมหายใจ" ของคลิป
4. **ห้าม** duck แบบ pumping ทุกพยางค์ — release ยาวพอ (≥ 300 ms) หรือใช้ automation จาก timing แทน

```bash
# 3a) Sidechain ducking: music ถูกกดโดย VO แล้วผสม
ffmpeg -i music48.wav -i vo_chain.wav -filter_complex "\
[1:a]aformat=channel_layouts=stereo,asplit=2[sc][vo];\
[0:a]equalizer=f=2500:t=q:w=0.8:g=-4,highpass=f=120[mus];\
[mus][sc]sidechaincompress=threshold=0.02:ratio=10:attack=15:release=450:knee=4[bed];\
[bed][vo]amix=inputs=2:normalize=0[mix]" -map "[mix]" -ar 48000 mix.wav
# amix normalize=0 สำคัญ: ไม่งั้น amix หารระดับแต่ละ input

# 3b) ทางเลือกที่คุมได้แน่นอนกว่า: volume automation จาก timing (เช่น VO พูด 2.0–5.0 s)
ffmpeg -i music48.wav -af "volume='if(between(t,1.85,5.4),0.25,1)':eval=frame" bed.wav
# (ramp ด้วย afade/หรือใช้ sound.py duck(t0,t1,-12, ramp=.15) ที่มีอยู่แล้ว)
```
**วัด LD จริง**: วัด VO stem และ music stem แยก เฉพาะช่วงที่พูด
```bash
ffmpeg -ss 2.0 -to 5.0 -i vo_chain.wav -af ebur128 -f null - 2>&1 | grep " I:"
ffmpeg -ss 2.0 -to 5.0 -i bed.wav      -af ebur128 -f null - 2>&1 | grep " I:"
# LD = I(vo) - I(bed)  → ต้อง ≥ 10 LU (music), ≥ 15 LU (ambience)
```

## 4. SFX & ambience ในมิกซ์ VO
- Ambience/room tone ต่อเนื่องใต้ทั้งฉาก (ไม่หายตอน cut) ≥ 15 LU ใต้ VO [A]
- SFX "hit" ที่เป็นจังหวะเรื่อง (ประตูปิด, แก้ววาง) วางในช่องว่างระหว่างประโยค ถ้าต้องทับคำ ให้ลด 6 dB หรือเลื่อน 1–3 เฟรมไปช่องว่าง
- เสียงใหญ่ (impact, sub-drop) ระวัง true peak — ให้ limiter master จัดการ ไม่ใช่ปล่อย clip
- Reverb ของ SFX ในฉาก = ห้องเดียวกับตัวละคร; narrator VO แห้ง

## 5. Loudness: master & platform table

| แพลตฟอร์ม | ค่าที่ประกาศ | สถานะ | เราส่ง |
|---|---|---|---|
| YouTube | ไม่ประกาศ; ผู้ปฏิบัติรายงานอ้างอิง -14 LUFS, ลดเฉพาะคลิปที่ดังกว่า ไม่ยกคลิปเบา | practitioner (Shepherd 2017; MeterPlugs 2019) | -14 / -1.5 dBTP |
| Instagram / Facebook (Reels, Stories) | ไม่ประกาศตัวเลข; xHE-AAC + MPEG-D DRC, แอปเลือก target ตามอุปกรณ์/บริบท | ทางการ (Meta engineering 2023) แต่ไม่มีตัวเลข | -14 / -1.5 dBTP |
| TikTok | **ไม่พบเอกสารทางการ**; บล็อกอ้าง -14 หรือ -16 ขัดกัน | unverified | -14 / -1.5 dBTP |
| Spotify | -14 LUFS (Loud -11, Quiet -19); < -1 dBTP lossy, < -2 ถ้าดังกว่า -14 | ทางการ | -14 / -1.5 (หรือ -2) |
| Apple Podcasts | -16 LKFS ±1, ≤ -1 dBTP | ทางการ | -16 / -1.5 |
| Broadcast EBU | -23 LUFS ±1 LU, ≤ -1 dBTP | มาตรฐาน | -23 / -1 |

### 5a) วัด (ใช้ ebur128 เป็นมิเตอร์อ้างอิงตัวเดียว)
```bash
ffmpeg -nostats -i mix.wav -af ebur128=peak=true -f null - 2>&1 | tail -12
# อ่าน I (LUFS), LRA (LU), True peak (dBFS = dBTP)
```

### 5b) Normalize แบบ linear (ไม่บีบ dynamics) — วิธีที่แนะนำ
```bash
# pass 1: วัด
ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p'
# pass 2: ใส่ค่าที่วัดได้ (ตัวอย่างค่า)
ffmpeg -i mix.wav -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=-22.08:measured_TP=-10.88:measured_LRA=7.10:measured_thresh=-32.12:linear=true:print_format=summary" -ar 48000 master.wav
# ต้องเห็น "Normalization Type: Linear" — ถ้าเป็น Dynamic แปลว่าเงื่อนไข linear ไม่ผ่าน (LRA เป้าต่ำกว่าต้นฉบับ หรือ gain ทำให้ TP เกิน)
# pass 3: วัดซ้ำด้วย ebur128 เสมอ (ทดสอบของเรา: ได้ -13.2 แทน -14.0 เพราะ pass-1 วัดต่างจาก ebur128 ~0.9 LU) แล้วแก้ด้วย volume=-0.8dB
```

### 5c) ทางเลือกที่คาดเดาได้ที่สุด: gain + true-peak limiter
```bash
# gain = เป้า - I ที่ ebur128 วัดได้ เช่น -14 - (-21.2) = +7.2 dB
ffmpeg -i mix.wav -af "volume=7.2dB,alimiter=limit=0.84:attack=5:release=50:level=false" -ar 48000 master.wav
# limit 0.84 ≈ -1.5 dBFS sample; alimiter ไม่ใช่ true-peak limiter → วัด ebur128 peak=true ซ้ำ ถ้า TP > -1.5 ลด limit เป็น 0.79 (-2 dBFS)
# level=false สำคัญ: ค่า default level=true จะ normalize เอง
```

### 5d) Encode
```bash
ffmpeg -i video.mp4 -i master.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest out.mp4
```
หมายเหตุของเดิม: `tools/soundtrack.py` ใช้ `loudnorm=I=-14:TP=-1.5` single-pass = โหมด **dynamic** (บีบ LRA; ทดสอบ LRA 7.1 → 3.6). เหมาะกับ beat clip ที่ต้องดังสม่ำเสมอ แต่ไม่เหมาะกับ story clip ที่มีเงียบ/ระเบิด — ใช้ 5b หรือ 5c

## 6. Stereo / mono / phone checks
```bash
# mono fold: เทียบ I กับ stereo
ffmpeg -nostats -i master.wav -af "pan=mono|c0=0.5*c0+0.5*c1,ebur128" -f null - 2>&1 | grep " I:" | tail -1
# phone-speaker preview (ฟังเอง): ตัดต่ำกว่า 150 Hz และสูงกว่า 10 kHz, mono
ffmpeg -i master.wav -af "pan=mono|c0=0.5*c0+0.5*c1,highpass=f=150,lowpass=f=10000" phone_preview.wav
```
- VO/SFX หลักอยู่ center; ambience กว้างได้
- ถ้า mono ตก > 3 LU หรือ VO จาง → มี phase ปัญหา (widener, stereo reverb หนัก)
- ฟัง `phone_preview.wav` ที่ระดับเบา: ทุกคำยังได้ยิน? เบสที่หายไปทำให้จังหวะเพลงหายหรือไม่?

## 7. QC checks ที่ qc.py ควรเพิ่ม (ข้อเสนอ)
`qc.py` ปัจจุบัน: sample peak ≤ -1 dBFS, clipping, ขอบเงียบ < 0.6 s, sample rate ≥ 22.05 kHz (ต่อบรรทัด VO). ข้อเสนอเพิ่ม (ระดับไฟล์ master/คลิป):

| Check | วิธี | ผ่านเมื่อ | ความรุนแรง |
|---|---|---|---|
| Integrated loudness | ffmpeg `ebur128` → I | -15 ถึง -13 LUFS (โซเชียล) หรือตาม profile | ผิด = ต้องแก้ |
| True peak | `ebur128=peak=true` | ≤ -1.0 dBTP (เตือนถ้า > -1.5) | ผิด = ต้องแก้ |
| LRA | `ebur128` → LRA | 3–12 LU (เตือนถ้า < 3 = บีบเกิน) | เตือน |
| Max short-term | ebur128 framelog / `metadata=1` | ไม่เกิน I + 8 LU (กัน SFX ตะโกน) [D] | เตือน |
| VO-to-bed LD | วัด stem VO กับ stem อื่นในช่วงพูด (จาก timing json ของ VO) | ≥ 10 LU (music), ≥ 15 (ambience) | ผิด = ต้องแก้ |
| Mono fold | `pan=mono` แล้ว I | ตกไม่เกิน 3 LU | เตือน |
| Phase correlation | `aphasemeter` (ค่าเฉลี่ย) | > 0 (เตือนถ้า < 0.2 ช่วงยาว) | เตือน |
| DC offset | `astats` DC_offset | |x| < 0.001 | เตือน |
| Noise floor ในช่องว่าง VO | `astats` Noise_floor บนช่วงไม่พูด | ≤ -60 dBFS (TTS) / ≤ -50 (อัดจริง) | เตือน |
| Sibilance ratio | พลังงาน 5–9 kHz / ทั้งหมด บนช่วงพูด | ไม่โดดเกินค่าฐานของเสียงนั้น +6 dB | เตือน |
| Sample rate / channels ของ master | ffprobe | 48 kHz, stereo (หรือ dual-mono) | ผิด = ต้องแก้ |
| ความยาวเสียง = ความยาววิดีโอ | ffprobe ทั้งสอง | ต่างไม่เกิน 1 เฟรม | ผิด = ต้องแก้ |
| Digital silence กลางคลิป | `silencedetect=n=-70dB:d=0.3` | ไม่มี (ยกเว้นตั้งใจ) | เตือน |

ตัวอย่างโค้ดดึงค่า (Python):
```python
import subprocess, re
def ebur128(path, ss=None, to=None):
    cmd = ['ffmpeg', '-nostats', '-hide_banner']
    if ss is not None: cmd += ['-ss', str(ss), '-to', str(to)]
    cmd += ['-i', path, '-af', 'ebur128=peak=true', '-f', 'null', '-']
    err = subprocess.run(cmd, capture_output=True, text=True).stderr
    tail = err[err.rfind('Summary:'):]
    num = lambda k: float(re.search(k + r':\s+(-?[\d.]+)', tail).group(1))
    return {'I': num('I'), 'LRA': num('LRA'), 'TP': num('Peak')}
```

## 8. ลำดับทำงานต่อคลิป (checklist)
1. ทุก stem 48 kHz → 2. VO chain → 3. วาง SFX/ambience (sound.py) → 4. เพลง: carve + duck → 5. วัด LD ช่วงพูด → 6. bus/master normalize (5b/5c) → 7. ebur128 + mono + phone preview → 8. encode AAC 192k → 9. ฟังบนมือถือจริง 1 รอบ (เปิดเบา) ก่อนส่ง
