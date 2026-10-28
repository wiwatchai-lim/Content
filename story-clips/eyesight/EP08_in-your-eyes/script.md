# EP08 — ถ้ามันโดนตา (follows EP07's voice outside the door)

Thai only. Same look and pipeline as EP01–06 (see ../SERIES.md). 107.6 s, including an 11 s pen test for the viewer.
Science: chemical in the eye → rinse at once with clean running water for at least 15 minutes, hold the eyelids open and roll the eye
so the water reaches everywhere; don't wait, don't put anything else in; household cleaners can badly injure the eye → see an eye
doctor right after rinsing. Grit/dust → don't rub (it can scratch the cornea); blink and let tears/water wash it out; still painful,
still feels stuck, or vision stays blurry → see a doctor. Depth: the two eyes together judge near/far; with one eye you misjudge
distance more easily (kept qualitative, no numbers).
Pen test: steps card (two pens or index fingers, arms straight, touch the tips quickly); phase 1 "ปิดตาข้างหนึ่ง" ring 6 → 0 (6 s),
phase 2 "ลืมตาทั้งสองข้าง" ring 5 → 0 (4.6 s); the demo pens miss with one eye and meet with two. Note: "ระวังปลายปากกา ทำช้าๆ ก็ได้".

Lines: audio/tts_all.py (23 lines, one request). This take kept ~3.5 s between lines but paused 1.4 s inside line 2 and only ~1 s
between lines 21 and 22, so audio/split.py groups phrases per line (PHRASES) and also writes phrases.json (phrase starts),
which timeline.py turns into absolute phrase cues in timing.json. TEMPO 1.1.
Clock 23:57 → 23:59, spins 15 minutes while you rinse (→ 00:14), 00:15 at the twist (turns red). Eye chip: both eyes shut after the
blow-back, right eye opens after the rinse, left eye opens at the twist.
Twist: with only the right eye open you judge the dark shape to be standing in the doorway across the room, "still far". The left eye
opens — the doorway is empty; it is right in front of you, at arm's length, the pen in your hand touching its face.
End card teases EP9 "ถ้ามันรออยู่ในหมอก".
