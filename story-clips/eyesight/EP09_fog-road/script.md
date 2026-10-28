# EP09 — ถ้ามันรออยู่ในหมอก (follows EP08's end card)

Thai only. Same look and pipeline as EP01–06 (see ../SERIES.md). 102.7 s, including two 4.3 s pauses in the voice for the viewer's astigmatism check.
04:50, you escaped and drive out of town; thick fog on a small rural road. POV from the driver's seat (cabin frame reused from EP02).
Science: in fog use low beams (and fog lights if the car has them), not high beams — the light scatters back off the droplets into a
white wall and you see less; fog lowers contrast, so things look farther away than they really are → slow down, keep a bigger gap,
follow the left edge line (left-hand traffic); halos or starbursts around lights are normal in fog, but on a CLEAR night they can mean
uncorrected short sight or astigmatism (older people: also cataract) → get your eyes checked. No numbers are claimed.
Test screen: astigmatism dial — 12 directions every 15°, each a group of 3 parallel black lines, clock numbers 1–12, centre dot, white
on cream, 780 px wide, static. Pill "ปิดตาซ้าย · มองจุดกลาง" with a 4 → 1 countdown and a bar, then "ปิดตาขวา". After the test one direction
(12–6) is drawn darker as an example of what astigmatism looks like, then "อาจเป็นสายตาเอียง → ไปตรวจกับนักทัศนมาตร".
Small note on screen: "เช็กเบื้องต้นเท่านั้น ไม่แทนการตรวจตา".

Lines: audio/tts_all.py (21 lines). This take read every pause alike (~0.8 s) and gave exactly one phrase per comma/space (61 in all),
so audio/split.py groups by PHRASES = phrases per script line. The take is slower than EP06's, so timeline.py uses TEMPO 1.18.
Twist: the shape on the road looked far away and pale the whole time — fog lowers contrast, so it looks farther than it is. You brake
(you were driving slowly, by rule 2) and it is standing right at your bumper, eyes open.
Clock 04:50–04:54, speed chip 70 → 60 (white wall) → 30 (rule 2) → 0 (brake).
End card teases EP10 "คืนสุดท้าย" (season finale).
