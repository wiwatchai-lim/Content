---
name: remove-spots
description: Erase small unwanted marks from a video and leave everything else untouched: a rivet, dot, screw, logo blemish, sticker, speck, watermark corner or any small detail an AI video model added that the real product does not have, or dust and dead pixels. Works on moving and rotating objects across several shots; keeps the original audio. Use when the user asks to remove, erase or clean a dot, rivet, mark, blemish or small object from a clip ("ลบจุด", "ลบหมุด", "ลบติ่ง", "ลบโลโก้เล็กๆ").
---

# Remove spots from a video

Two scripts sit in this skill's folder. They need Python with `opencv-python` and `numpy`, and `ffmpeg` on PATH.
Never overwrite the user's original video; write `<name>_clean.mp4` next to it unless told otherwise.

## 1. Inspect

```
python inspect_video.py in.mp4 work/ --every 0.25
```
Prints size, fps and the shot list, and writes `work/sheet.jpg` (a tile every 0.25 s with its timestamp).
Read the sheet and list every place the mark appears: each shot, BOTH sides of a symmetric product (left and right
end pieces, both hinges, both earrings...), and the moments where the object moves, turns or is half hidden.
If the user sent reference photos of the real product, compare against them to know what does not belong.

Then get exact positions:
```
python inspect_video.py in.mp4 work/ --at 0.0,2.0,6.5 --crop 0,800,1080,300
```
`work/at_<t>.png` shows that frame (or the cropped region) at full resolution with a 100 px grid labelled in real
video pixels. Read the centre x, y and the width and height of each mark.

## 2. Write tracks.json

One entry per mark per shot, times in seconds:
```json
[
 {"from": 0.0, "to": 1.875, "seed": 0.0, "x": 698, "y": 962, "w": 46, "h": 24, "note": "shot 1, right rivet"}
]
```
- `seed` is a time where you measured x, y; the mark is tracked forward to `to` and backward to `from`.
- `from`/`to` must stay inside one shot (use the shot list); end earlier if the mark leaves the frame or gets hidden.
- Make `w`/`h` just cover the mark; the mask is an ellipse slightly larger than the box.
- `examples/` has a worked file.

## 3. Check, then render

```
python remove_spots.py in.mp4 out.mp4 tracks.json work/debug.jpg   # writes only the check sheet, masks in red
python remove_spots.py in.mp4 out.mp4 tracks.json                  # renders
```
In `debug.jpg` every mark must be red in every tile where it is visible, and nothing that belongs (printed text,
logos the user wants kept, highlights, the object's edge) may be red. Fix the tracks and check again until it is clean.

After rendering, compare before and after with crops at a few times per shot
(`ffmpeg -ss T -i in.mp4 -ss T -i out.mp4 -filter_complex "[0]crop=...[a];[1]crop=...[b];[a][b]hstack"`),
including the frames where the object moves. Then give the user the output path.

## Notes

- Do not find marks by brightness or colour alone: small or motion-blurred marks get missed and printed text gets hit.
  Measure the seed by eye and let the tracker follow it.
- Inpainting fills from the surroundings, so it is best on plain areas (a black frame, skin, sky). On busy texture it
  can leave a soft smudge; say so if it does.
- A mark that changes size a lot inside one shot (fast zoom) may need the shot split into two tracks with their own seeds.
