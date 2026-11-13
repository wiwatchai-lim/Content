# EP11 — หนึ่งปีต่อมา (season 2 opener, pays off EP10's "เจอกันปีหน้า")

Thai only. Same look and pipeline as EP01–10 (see ../SERIES.md). ~106 s, including a 6 s pause in the voice for the viewer's side-vision test.
Science: most glaucoma (ต้อหิน) has no pain, takes side vision first while the centre stays sharp, and the brain fills in the gaps, so people don't
notice. Lost vision can't be restored; found early, treatment slows it. The doctor checks eye pressure, the optic nerve and the visual field.
Age over 40, glaucoma in the family, or high myopia: all the more reason to get checked. The viewer test is rough only and can't clear anyone
(early glaucoma can't be found at home) — the screen and the VO both say so.

Test screen: "ลองเองตอนนี้" — 1 cover one eye, look at the dot, 2 hand out to the side, wiggle a finger, slide it in, 3 stop where you start to see it,
eye still on the dot. Then swap eyes; a big difference = go get checked; "ระยะแรก ตรวจเองไม่เจอ".

Lines: audio/tts_all.py (24 lines). This take paused ~1 s after every phrase, so audio/split.py groups phrases per line (PHRASES), MAXP .3. TEMPO 1.1.
Story: one year on you come back for the yearly exam, last patient at 19:30. Visual-field machine: lights flash, none on the left. The printout has a
black patch on the left. After the two rules the doctor re-checks everything: pressure normal, nerve normal, your eyes are fine.
Twist: the patch has a head and shoulders. It is the shadow of something that stood blocking the light on your left, the whole exam.
Ending: POV in the machine, the figure fades in on the left. Next: EP12 "ถ้าโลกเริ่มขุ่น". End card: "ตรวจตาปีละครั้ง ก่อนภาพจะหายไปโดยไม่รู้ตัว".
Chips: clock 19:30 → 19:58; "คลินิกปิดในอีก" counts down (red from the twist).
