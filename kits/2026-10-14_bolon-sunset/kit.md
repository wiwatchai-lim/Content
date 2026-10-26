# BOLON golden hour (2026-10-14)

- Source: two AI stills from the user (`photos/front.png` "แว่น BOLON ใต้แสงจันทร์ทองคำ", `photos/side.png` "แว่น BOLON ทองอร่ามเหนือผิวน้ำยามอาทิตย์อัสดง") and the user's screenshot of the real temple (`photos/ref-temple.png`: gold BOLON letters on a black temple, no rivets).
- Model code not given; the user asked for no model name on screen. No lens/coating in this clip.
- `photos/front_clean.png`: the extra gold rivets and blobs next to both BOLON plates removed (cv2.inpaint) to match the real temple.
- Motion: Wan 2.2 TI2V 5B, 480x848, 5 s each (`work/wan-*.mp4`); the glasses were still in both, so the sharp glasses from the still (depth mask, `work/composite.py`) sit on top -> `hf/assets/side_comp.mp4`, `front_comp.mp4`.

## Clip
- Song: Kabut Senja, 161.5 BPM (cut at half-time 80.75), TikTok start 0:16.0. 18 beats = 13.4 s.
- Hook on the gold letters (side), hard cuts side / front left temple / front right temple, drop on the front view (GOLDEN HOUR), side view (THE SIGNATURE GOLD LETTERS), end card with the white TIMEOPTIC wordmark.
- Upload `export/clip-hf.mp4` (SFX only); preview with the song `export/clip-hf_preview-song.mp4`.
