# Learning log — keep getting better

The user wants this craft to keep growing ("เรียนรู้อีกเรื่อยๆ", 2026-11-21). Rules:
- After every clip: add 1–5 dated lessons here (what looked/sounded wrong, the fix, the number that worked).
- When a lesson is general, also fold it into GUIDE.md / STYLES.md / FX.md and the code (rig.js / fx.js / sound.py), then mark it ✔ here.
- When the user reacts to a clip (likes/dislikes), log it with their words.
- Open study topics at the bottom: pick one when there is time and write what was learned.
- Deep curriculum (12 topics, one lesson at a time, verified sources only): `curriculum/README.md`.

## Lessons

### 2026-11-21 — ร้านแว่นตีสอง EP01 + rig/fx demos
- ✔ Arms the same colour as the shirt disappear; hands look like floating dots → outline every limb with a darker stroke under the fill (rig.js).
- ✔ A scene div left at opacity 0 renders black with no error — every scene needs an explicit show/cut in (EP01 night shop bug).
- ✔ Hand props drawn as small blobs next to a face read as extra eyes — drop them or make them clearly hands.
- ✔ Lightning as a full white overlay washes out the whole frame; brighten the scene itself (filter) and keep the white kiss ≤ .4.
- ✔ Camera targets must be computed from the point to frame (F()/cam px,py) and clamped, never guessed offsets.
- ✔ FLUX img2img keeps the source lighting: it cannot turn night into day. Generate day/night separately.
- ✔ Gemini TTS: long style prompts with ghost/"intimate"/acting directions → finishReason SAFETY; plain style + two halves worked.
- ✔ FLUX adds fake watermark text sometimes — inpaint it (cv2.inpaint).
- ✔ Lip-sync from loudness envelope + Thai vowels looks right; checked frame-by-frame (demo, grandma line 6).

## Open study topics
- Walk cycles in 3/4 view (side-facing puppets) — needs a side-view rig variant.
- Mouth shapes for Thai tones/finals in close-ups (bigger mouth set for CU shots).
- Rain on window glass (drops + streaks + refraction) for interior rain scenes.
- Water reflections for canal scenes (mirrored layer + ripple displacement).
- Crowd scenes cheaply (silhouette instancing with offset idle cycles).
- Music-driven editing (beat-synced cuts) for when the user adds music.
- A sound "Foley pass" helper: auto-place footsteps from rig.walk contacts and cloth rustles on big poses.
- 9:16 versions of the 16:9 story clips (re-framing each shot, not just cropping).
- rig.js ideas from curriculum lesson 6: global "on twos" stepping for characters (camera stays on 1s); extra mouths (teeth-together for ส ซ ต ด ช, ฟ/ฝ lip-bite); `R.smear(P,t,dir)`; side-view look + 4-pose `walkSide`.
- Sora 2 + API shut down 2026-09-24 per OpenAI docs (curriculum lesson 10) — don't plan around it.
- Thai อย. rules for eyewear ads not verified — ask อย. (e-Consult / 1556) before medical claims (lesson 12).
