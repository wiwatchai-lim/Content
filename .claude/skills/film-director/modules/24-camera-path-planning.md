# FD24 — Camera Path Planning (วางเส้นทางกล้องเป็น keyframe: เฟรมเริ่ม/จบ, easing, ความเร็ว, parallax, 180°, แรงจูงใจ → JSON → rig.js / 2.5D / AI)

> ต่อยอด ไม่ซ้ำ: ทฤษฎี move/แรงจูงใจ/easing ใน `curriculum/05-movement-language.md` §1.2–1.3 และ FD03; ตาราง move→rig.js ใน `GUIDE.md` §2;
> API กล้องอ่านจาก `story-clips/_craft/rig.js` บรรทัด 556–584 (2026-11-27): `R.cam(sel)` → `set(t,{px,py,s,rot})`, `move(t,dur,{…},ease='sine.inOut')`,
> `shake(t,dur,amp=14,freq=18)`, `drift(t0,t1,amp=6)`, `rack(t,dur,blurSel,sharpSel,px=10)`, `vertigo(t,dur,bgSel,amt=.35)`, `state()`; layer `--d` = parallax.
> บทนี้เพิ่ม: **กระบวนการวางแผน** (blocking → key frames → segments → เครื่องมือ), **คณิตของข้อจำกัด** rig.js (clamp, roll coverage, ความเร็ว),
> **JSON template `fd.camera-path/1`** + ตัวแปลงเป็น rig.js + ตัวตรวจ (validator) + การแปลงเป็น 2.5D/Wan/Kling/Luma

## 1. นิยามและหลักการพื้นฐาน
- **Camera path** = ลำดับ **key** (สถานะกล้อง ณ เวลา t: ตำแหน่ง px/py, scale s, roll) + **segment** ระหว่าง key (ระยะเวลา, ease) + **effect** ที่ซ้อน (drift, shake, rack)
- **Start frame / end frame**: ทุก segment ต้องเริ่มและจบที่ภาพที่ "จัดองค์ประกอบแล้ว" — เพราะ (1) คนดูอ่านความหมายตอนกล้องหยุด (2) AI image-to-video
  และ first/last-frame modes ใช้สองภาพนี้เป็นอินพุต (curriculum 10) [CRAFT]
- **Easing** = การเร่ง/หน่วงของ segment; GSAP: `power1..4` = quad..quint, `sine`, `expo`, `back`, `none`(linear); default ของ GSAP = `power1.out`
  แต่ default ของ `cam.move` = `sine.inOut` (`GSAP-Eases`)
- **Motivation**: physical / attention / emotional / narrative (curriculum 05) — เป็นฟิลด์บังคับใน template
- **Payoff**: สิ่งที่ end frame เผยหรือเปลี่ยน — ถ้าไม่มี ให้เปลี่ยนเป็น static+drift (Bordwell: move ที่สัญญาแล้วไม่เผยคือขยะ — `Bordwell2023-CalmCamera`)

## 2. ทฤษฎีและหลักการขั้นสูง
### 2.1 กระบวนการวางแผน (จากงานจริง → ของเรา)
งาน *1917*: ซ้อม blocking ก่อน → ถ่ายภาพนิ่งของ blocking → storyboard + schematic ให้ทีม grip/operator → เลือก rig ต่อช่วง (เปลี่ยน rig กลางช็อตได้) →
Mendes/Deakins เรียกว่า "บทที่สองสำหรับการเคลื่อนกล้อง" (`Deakins1917-Planning`, D). ลำดับของเรา:
1. **Beat**: เขียนประโยคเดียว "กล้อง [move] เพราะ [motivation] จบที่ [payoff]"
2. **Blocking**: ตัวละคร/สินค้าอยู่ไหน เคลื่อนไปไหน ทิศสายตา (floor plan, FD04)
3. **Key frames**: วาด/สร้าง thumbnail ของ start และ end (และจุดกลางถ้าเปลี่ยนทิศ) — ภาพเหล่านี้คือ "first/last frame" ของ AI ด้วย
4. **Timing**: ระยะเวลา segment จากเสียง/บทพูด (กล้องถึงจุดหมาย *ก่อน* คำสำคัญ ~6–12 F)
5. **Ease + speed check** (2.3)
6. **Tool per segment**: rig.js (2D, deterministic), 2.5D (ภาพนิ่งจริง/AI, ปลอดภัยกับสินค้า), AI video (ต้องการการเคลื่อนไหวของวัตถุจริง) — **1 move ต่อ AI clip** (`Runway-CameraControl2026`)
7. **Validate** (สคริปต์ §2.6) → render ทดสอบ 2 s → ปรับ

### 2.2 Parallax ใน rig.js (คณิต)
- layer เลื่อน `x·d` และ scale `1+(s−1)·d` → layer `d` มาก (fg) เลื่อน/ขยายมากกว่า = ใกล้กว่า; motion parallax อย่างเดียวก็พอให้รู้สึกลึก (`RogersGraham1979`)
- อัตราส่วน parallax fg:bg = `d_fg / d_bg` (1.3/0.8 ≈ 1.6×) — มากไป (>2×) ดูเป็นกระดาษตัด, น้อยไป (<1.2×) ดูแบน [CRAFT, ค่าจาก GUIDE]
- **zoom vs dolly**: ถ้าทุก layer `--d:1` การเพิ่ม s = zoom (ไม่มี parallax); `--d` ต่างกัน = dolly (FD03 §2.3)

### 2.3 ข้อจำกัด/สูตรตรวจ (DERIVED จากโค้ด rig.js)
| ตรวจ | สูตร | ถ้าไม่ผ่าน |
|---|---|---|
| clamp แนวนอน | `|px−960|·s ≤ (s−1)·960` ⇔ `s ≥ 960/(960−|px−960|)` | กล้องไม่ไปถึง px (เงียบ ๆ) → เพิ่ม s |
| clamp แนวตั้ง | `s ≥ 540/(540−|py−540|)` | เพิ่ม s |
| roll coverage (layer เต็มเฟรม 16:9) | scale ที่มีผลของ layer ≥ `cosθ + 1.778·sinθ` (bg img มี slack 1.12) | มุมดำโผล่ → เพิ่ม s/ลด θ (ประมาณการ — render ตรวจ) |
| ความเร็ว scale | `|Δs|/dur` ≤ 0.05/s (drift), ≤ 0.10/s (motivated), snap ใช้ 4–8 F | ลดหรือเปลี่ยนเป็น snap/cut [CRAFT, curriculum 05] |
| ความเร็ว pan/truck | วัตถุข้ามเฟรมใช้ ≥ 5–7 s หรือเร็วเป็น whip | judder ที่ 24 fps [CRAFT] |
| segment ซ้อน | `t_k ≥ t_{k−1} + dur_{k−1}` | tween บน `.cam` ชนกัน (rig RULE: เขียนตามลำดับเวลา) |
| settle ก่อนคัต | หยุด ≥ 6–12 F ก่อน cut (ยกเว้น whip/match) | GUIDE.md |
| 9:16 | ค่าคงที่ 960/540 ใน rig.js ผูก 1920×1080 | ต้องปรับเป็น 540/960 ก่อนใช้กับ 1080×1920 (ยังไม่ได้แก้ rig.js) |

### 2.4 กฎเชิงพื้นที่สำหรับเส้นทาง
- **180°**: arc/orbit ที่ข้ามเส้น A–B = การข้ามเส้นต่อหน้าคนดู (วิธีข้ามที่ถูกต้อง) — ต้องตั้งใจ และหลังจากนั้นแกนใหม่มีผลทุกช็อต (FD04)
- **ทิศการเคลื่อนที่**: truck ตามตัวละครให้ทิศเดียวกับ screen direction ของเรื่อง (ซ้าย→ขวา = ไปข้างหน้า; GUIDE)
- **Eye trace**: end frame ของ segment สุดท้ายวางจุดสนใจที่ช็อตถัดไปจะเริ่ม (Smith2012-AToCC attention cues; `Loschky2015` attentional synchrony)
- **Lead with motivation**: กล้องเริ่มขยับ *หลัง* cue (คนหัน/เสียง) 2–6 F สำหรับ physical/attention; emotional push เริ่มก่อนคำสำคัญ [CRAFT]
- **ความสบาย**: handheld + พุ่งหน้า + roll พร้อมกันเพิ่มความเสี่ยงเมาภาพ (`KeshavarzRiecke2015`) → เส้นทาง FPV สั้นและแกนเดียวเมื่อทำได้

### 2.5 JSON template `fd.camera-path/1`
```json
{
  "schema": "fd.camera-path/1",
  "id": "ep12_sc03_realisation",
  "stage": { "w": 1920, "h": 1080, "fps": 24 },
  "scene": "#shop",
  "intent": { "beat": "Tao realises the glasses were his father's", "motivation": "emotional", "payoff": "CU on Tao's eyes as he says the line" },
  "axis": { "a": "Mint", "b": "Tao", "a_screen_side": "left", "note": "camera stays south of the Mint–Tao line" },
  "layers": [ { "sel": "#shop .bg", "d": 0.8 }, { "sel": "#shop .chars", "d": 1.0 }, { "sel": "#shop .fg", "d": 1.3 } ],
  "keys": [
    { "t": 0.0, "px": 960,  "py": 540, "s": 1.05, "rot": 0, "label": "WS establish (start frame)" },
    { "t": 2.0, "dur": 3.0, "px": 1180, "py": 470, "s": 1.6, "ease": "power2.inOut", "label": "push to MCU Tao" },
    { "t": 6.5, "dur": 0.25, "px": 1220, "py": 440, "s": 2.4, "ease": "power3.out", "label": "snap to CU on the line" },
    { "t": 9.0, "dur": 1.2, "type": "vertigo", "bg": "#shop .bg", "amt": 0.3, "label": "floor drops" }
  ],
  "fx": [
    { "type": "drift", "t0": 0, "t1": 12, "amp": 5 },
    { "type": "rack",  "t": 5.2, "dur": 0.8, "blur": "#shop .fg", "sharp": "#shop .chars", "px": 10 },
    { "type": "shake", "t": 6.5, "dur": 0.3, "amp": 8, "freq": 18 }
  ],
  "cuts": [ 12.0 ],
  "ai": {
    "segment": "push to MCU Tao",
    "wan": "slow dolly in toward the boy's face, background parallax, the camera moves closer",
    "kling": { "type": "simple", "horizontal": 0, "vertical": 0, "zoom": 0, "pan": 0, "tilt": 0, "roll": 0, "note": "zoom axis = focal length per ComfyUI doc; prefer prompt for a dolly" },
    "luma": [ "push_in" ],
    "runway": "Slow push-in on the boy's face as he recognises the glasses."
  },
  "qc": { "max_scale_rate": 0.2, "settle_s": 0.25 }
}
```
หมายเหตุ: `type:"vertigo"` อยู่ใน `keys` (ไม่ใช่ fx) เพราะมันเรียก `move` ภายในและเปลี่ยน s ของกล้อง; `drift/shake/rack` อยู่ใน `fx` เพราะเขียนคนละ property
(`--dx/--dy`, `--shx/--shy`, `--blur` ของ layer) จึงซ้อนกับ move ได้; key ที่ไม่มี `dur` = `cam.set` (คัตกระโดด)

### 2.6 ตัวแปลงเป็น rig.js (วางในคอมโพสิชันหลัง `const R = Rig(tl, …)`)
```js
// fd.camera-path/1 → rig.js. Keys are authored in time order (rig.js RULE). Returns the cam api.
function playPath(R, P) {
  for (const L of P.layers || []) document.querySelectorAll(L.sel).forEach(e => e.style.setProperty('--d', L.d));
  const pick = k => { const o = {}; for (const n of ['px', 'py', 's', 'rot']) if (k[n] !== undefined) o[n] = k[n]; return o; };
  const cam = R.cam(P.scene), ks = [...P.keys].sort((a, b) => a.t - b.t);
  cam.set(ks[0].t, pick(ks[0]));
  for (const k of ks.slice(1)) {
    if (k.type === 'vertigo') cam.vertigo(k.t, k.dur, k.bg, k.amt);
    else if (!k.dur) cam.set(k.t, pick(k));
    else cam.move(k.t, k.dur, pick(k), k.ease || 'sine.inOut');
  }
  for (const f of P.fx || []) {
    if (f.type === 'drift') cam.drift(f.t0, f.t1, f.amp);
    else if (f.type === 'shake') cam.shake(f.t, f.dur, f.amp, f.freq);
    else if (f.type === 'rack') cam.rack(f.t, f.dur, f.blur, f.sharp, f.px);
  }
  return cam;
}
```
(2026-11-27: ทดสอบด้วย mock แล้ว — template ตัวอย่างสร้างลำดับ `set → move → move → vertigo → drift → rack → shake` ถูกต้อง; validator ผ่าน `OK`
กับตัวอย่าง และจับ clamp/ซ้อนเวลา/roll/settle ได้ในกรณีเสีย; **ยังไม่ได้ render จริง** — test_status: partially tested. `drift` ต้องการช่วง ≥ 4 s ไม่งั้นไม่ทำอะไร ตามโค้ด)

### 2.7 ตัวตรวจ (validator) — รันด้วย `python -I check_path.py path.json` (สคริปต์นี้อยู่ในเอกสาร ยังไม่ได้บันทึกเป็นไฟล์เครื่องมือ)
```python
import json, math, sys
P = json.load(open(sys.argv[1], encoding='utf-8'))
W, H = P['stage']['w'], P['stage']['h']; cx, cy = W / 2, H / 2; fps = P['stage'].get('fps', 24)
ks = sorted(P['keys'], key=lambda k: k['t']); cur = dict(px=cx, py=cy, s=1, rot=0); prev_end = -1; out = []
for k in ks:
    if k['t'] < prev_end - 1e-6: out.append(f"{k.get('label')}: starts before previous segment ends ({prev_end:.2f}s)")
    nxt = {**cur, **{n: k[n] for n in ('px', 'py', 's', 'rot') if n in k}}
    if k.get('type') == 'vertigo': nxt['s'] = max(1, cur['s'] - k.get('amt', .35) * .6)
    s = nxt['s']
    for axis, c in (('px', cx), ('py', cy)):
        off = abs(nxt[axis] - c)
        if off and (off >= c or s < c / (c - off)): out.append(f"{k.get('label')}: {axis} {nxt[axis]} clamped; needs s >= {c / max(1e-9, c - off):.2f}")
    th = math.radians(abs(nxt['rot']))
    if th and s < math.cos(th) + (W / H) * math.sin(th): out.append(f"{k.get('label')}: rot {nxt['rot']} may show corners; s >= {math.cos(th) + (W / H) * math.sin(th):.2f} (approx.)")
    d = k.get('dur', 0)
    if d:
        rate = abs(s - cur['s']) / d
        if rate > P.get('qc', {}).get('max_scale_rate', .2) and d > 8 / fps: out.append(f"{k.get('label')}: scale rate {rate:.2f}/s - too fast for a move, too slow for a snap")
        if k.get('ease', 'sine.inOut') == 'none' and k.get('type') != 'follow': out.append(f"{k.get('label')}: linear ease on a start-stop move looks mechanical")
    prev_end = k['t'] + d; cur = nxt
for c in P.get('cuts', []):
    if 0 <= c - prev_end < P.get('qc', {}).get('settle_s', .25): out.append(f"cut at {c}s: camera settles only {c - prev_end:.2f}s before it")
if not P.get('intent', {}).get('payoff'): out.append("intent.payoff missing - every move needs a payoff")
print('\n'.join(out) or 'OK')
```

### 2.8 แปลงเส้นทางเดียวกันไปเครื่องมืออื่น
| ปลายทาง | วิธี map (ของเรา, untested) |
|---|---|
| 2.5D `clip-25d.html` | `zoom = 1.08·s` (ช่วงปลอดภัย 1.08–1.22), `cam.x ≈ −(px−960)/960 × 0.06`, `cam.y ≈ −(py−540)/540 × 0.03`; `FOCUS` = ความลึกของ subject (= pivot ของ orbit); ease ของ template = cubic inOut |
| Wan 2.2 (`tools/wan.py`) | หนึ่ง segment = หนึ่งคลิป; เขียน move+ความเร็ว+ทิศ เป็นภาษาอังกฤษสั้น; start frame = ภาพอินพุต; ไม่มีพารามิเตอร์กล้อง (`Wan22-TI2V5B-Card`) |
| Kling | แกนเดียวต่อคลิป: truck=`horizontal`, pedestal=`vertical`, roll=`roll`; pan/tilt ของ Kling **สลับ** กับภาษาหนังตาม ComfyUI doc; zoom=focal length (`Comfy-KlingCameraNode`) |
| Luma | `concepts:[{key:"push_in"}]` ฯลฯ, รวมได้หลาย key (`Luma-Concepts`) |
| Runway/Veo | ประโยค: move + speed + subject + reason; multi-stage อธิบายสิ่งที่แต่ละช่วงเผย (`Runway-CameraControl2026`, `Google-VeoPromptGuide`) |
| งานวิจัย | ระบบอย่าง CameraCtrl/MotionCtrl รับ trajectory/pose จริง — ถ้าวันหนึ่งมีในเครื่อง JSON นี้แปลงเป็น pose sequence ได้ (`He2024-CameraCtrl`, `Wang2024-MotionCtrl`) |

## 3. เหตุผลที่ใช้
การเขียนเส้นทางเป็นข้อมูล (JSON) ทำให้ (1) ตรวจได้ก่อน render (clamp, ความเร็ว, settle) (2) ใช้ซ้ำข้ามคลิป/ตอน (3) แปลงเป็นหลายเครื่องมือจากแผนเดียว
(4) critic/QC อ่านเจตนา (`intent`) เทียบกับผลได้

## 4. ผลต่ออารมณ์และการรับรู้
เส้นทางกำหนด "ร่างกายคนดู" — การเข้าใกล้ด้วยการย้ายกล้องสัมพันธ์กับการตอบสนองแบบ embodied มากกว่า zoom (`Heimann2019`); ease ที่ดีทำให้รู้สึกว่ามีคนถือกล้อง (CRAFT);
ความเร็ว = น้ำหนักอารมณ์ (CRAFT); เส้นทางที่จบตรงจุดที่ตาคนดูอยู่ทำให้คัตลื่น (`Smith2012-AToCC`, `Loschky2015`)

## 5. ใช้เมื่อไร
- ทุกช็อตที่มี move ใน story clip (rig.js) และ promo 2.5D
- ก่อนสั่ง AI video ที่มีโควตา (Kling/Codex) — วางแผนให้ 1 segment ต่อคลิปและได้ start/end frame ก่อน
- long take หลายช่วง (shop tour)

## 6. ไม่ควรใช้เมื่อไร
- ช็อตนิ่งล้วน (แค่ `drift` ในโค้ดก็พอ) · การทดลองเร็ว ๆ ที่ยังไม่รู้ beat (ทำ thumbnail ก่อน) · งาน handheld สารคดีจริงที่ความไม่แน่นอนคือสไตล์

## 7. ตัวอย่างจากภาพยนตร์/แอนิเมชัน (sourced)
- *1917* (2019): blocking ซ้อม → ภาพนิ่ง → storyboard/schematic → rig ต่อช่วง; "บทที่สอง" ของการเคลื่อนกล้อง (`Deakins1917-Planning`)
- *Bound for Glory* (1976): เส้นทางเดียวที่เริ่มบนเครนแล้วต่อด้วย Steadicam เดินผ่านฉาก = เปลี่ยน rig กลางเส้นทาง (`Wiki-Steadicam`)
- *Vertigo* (1958) dolly zoom: เส้นทาง (dolly) + เลนส์ (zoom) ถูกวางคู่กันให้ subject ขนาดคงที่ (`Wiki-DollyZoom`)

## 8. ประยุกต์ตามประเภทวิดีโอ
- **Story clip**: หนึ่งไฟล์ `camera-path` ต่อซีน เก็บข้าง `build.py`; ใช้ `playPath` แทนการเขียน `cam.move` ด้วยมือ; ใส่ `intent` ให้ creative-critic ตรวจ
- **Product/promo**: path สั้น 2–4 s ต่อช็อต, FOCUS ที่แว่นใน 2.5D; orbit ≤ ~0.06–0.08
- **Reels 9:16**: (หลังปรับค่าคงที่ rig) ใช้ py/tilt-like path แนวตั้งมากกว่า px; จุดจบเว้น safe zone ของ caption
- **Explainer**: path แบบ "หยุด-ไป-หยุด" ตามหัวข้อ, settle ≥ 0.5 s ให้อ่าน
- **Cartoon carousel**: ไม่มีเวลา — path คือ "สถานะกล้องต่อสไลด์" (key ไม่มี dur) ทำให้ต่อเนื่องเหมือนกล้องเลื่อน
- **Documentary/talking head**: path = punch-in ดิจิทัล (key ไม่มี dur ที่คำสำคัญ) + drift

## 9. AI image prompt examples (start/end frame ของ path เดียวกัน)
```
START: wide shot of a cosy optician's shop at dusk, a boy (Tao) right of centre at the counter, a girl (Mint) on the left, foreground shelf blurred at the left edge, eye-level, warm practical lights
END:   medium close-up of the same boy at the same counter, same warm light from the left, the girl's blurred shoulder at the left edge, his eyes on the upper third
```

## 10. AI video prompt examples
```
(segment 1, image-to-video from START)  Slow push-in from the doorway toward the boy at the counter; he looks down at an old pair of glasses.
(Luma)  concepts: [push_in] + prompt "the boy looks down at an old pair of glasses"
(Kling) camera_control simple, horizontal 0 … ; prompt: "slow camera move forward toward the boy"   ← ทดสอบ 2 s ก่อน (แกนยังไม่ยืนยัน)
```

## 11. Shot list example (ซีน 12 s → camera path)
| t | key/segment | ease | motivation | payoff |
|---|---|---|---|---|
| 0–2 | WS hold + drift | — | establish | ใครอยู่ไหน |
| 2–5 | push → MCU Tao | power2.inOut | emotional | Tao เห็นแว่น |
| 5.2–6 | rack fg→chars | power2.inOut | attention | โฟกัสที่หน้า |
| 6.5 | snap → CU (0.25 s) + shake | power3.out | emotional | ประโยค "ของพ่อ" |
| 9–10.2 | vertigo | sine.inOut | narrative | โลกเปลี่ยน |
| 12 | cut | — | settle 1.8 s | — |

## 12. ข้อผิดพลาดที่พบบ่อย
1. px/py ที่ s ต่ำ → clamp เงียบ กล้องไม่ไปไหน 2. move สองอันซ้อนเวลา → กระตุก 3. ลืม settle ก่อนคัต 4. path ไม่มี payoff 5. roll โดยไม่เพิ่ม s
6. ใช้ path เดียวกับ AI ทั้งเส้น (หลาย move ในคลิปเดียว → บิด) 7. ใช้ `drift` ช่วง < 4 s (ไม่ทำงาน) 8. ลืมว่า rig.js เป็น 1920×1080

## 13. วิธีตรวจและแก้
- รัน validator §2.7 → แก้จนขึ้น `OK`
- render เฟรมที่ t ของทุก key (seek) → ดู start/end frame ว่าจัดองค์ประกอบดี
- ดูเส้นโค้ง ease: ควรเร่ง-หน่วง; linear เฉพาะ follow
- ส่งให้ `creative-critic` พร้อม `intent` ใน JSON

## 14. แบบฝึกหัด + test case
- **TC-FD24-A (ease)**: path เดียว 3 ease (`none`, `sine.inOut`, `power2.inOut`) → อันไหน "มีคนถือกล้อง"; คาด: inOut
- **TC-FD24-B (clamp)**: key px 1300 ที่ s 1.1 vs 1.6 → validator ต้องเตือนอันแรก; render ยืนยันว่ากล้องไม่ไปถึง
- **TC-FD24-C (หนึ่งแผน หลายเครื่องมือ)**: path push 3 s เดียวกัน → rig.js, 2.5D (mapping §2.8), Wan (`--seconds 3 --steps 8`) → เทียบ parallax, เสถียรภาพสินค้า, เวลาที่ใช้; บันทึกผลลง LEARNING-LOG และอัปเดต `test_status`

## 15. แหล่งอ้างอิง
`sources/camera.json`: Deakins1917-Planning, Wiki-Steadicam, Wiki-DollyZoom, GSAP-Eases, RogersGraham1979, Heimann2019, Smith2012-AToCC, Loschky2015, Kachkovski2019,
KeshavarzRiecke2015, Bordwell2023-CalmCamera, Runway-CameraControl2026, Google-VeoPromptGuide, Kling-CameraGuide, Comfy-KlingCameraNode, Luma-Concepts,
Wan22-TI2V5B-Card, He2024-CameraCtrl, Wang2024-MotionCtrl, Lin2025-CameraBench, Katz2019 · ในเครื่อง: `story-clips/_craft/rig.js`, `kits/_template/clip-25d.html`.
**Gaps**: `playPath`/validator ยังไม่ได้ render ทดสอบ; mapping 2.5D เป็นค่าประมาณของเรา; rig.js ยังไม่รองรับ 9:16 โดยตรง; ไม่มีงานวิจัยเรื่อง easing ของกล้องกับการรับรู้
