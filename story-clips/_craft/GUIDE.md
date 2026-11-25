# Craft guide — animation, acting, camera and editing for our 2D story clips

The baseline for every story clip (night-optic, eyesight, zombie, anything with characters). Read it before planning
a new episode. Sister docs: `STYLES.md` (cartoon/line-art looks, scene layering, FLUX prompts), `FX.md` (visual effects + sound design),
`LEARNING-LOG.md` (lessons after every clip — add to it). The code that applies these rules is `rig.js` (character + camera rig), `visemes.py` (lip-sync envelopes)
and `demo/` (a 23-second test scene that uses every helper; `demo/export/rig-demo.mp4`).
Written 2026-11-21 after EP01 of ร้านแว่นตีสอง, when the user asked for deep knowledge of animation and camera work.

Numbers are given in **frames at 24 fps** (F = 1/24 s ≈ .042 s), because that is how animators think about timing.
`rig.js` exposes `R.F` so code can say `6 * R.F`.

---

## 0. The order of work (do not skip steps)

1. **Story beats** — what changes in each beat (who wants what, what stops them, what they feel). One beat ≈ one narration line.
2. **Shot list** — for every line: shot size, angle, who is in frame, camera move, the one thing the viewer must notice.
   Write it in the episode's `script.md` as a table before writing any code.
3. **Acting plan** — for every character in the shot: entry pose → key poses → exit pose, the emotion and *when it changes*.
4. **Sound plan** — where silence goes, which hits need a sound, where the music would rise (the user adds music later).
5. Build, snapshot every shot at its key moment, fix, then render.

A shot that has no reason to exist gets cut. A shot that only shows the narration again (the narrator says "she smiled",
we see her smile) is fine — that is the format — but add something the words don't say (where she looks, what her hands do).

---

## 1. Shot grammar (what each shot size *means*)

| Size | Frames | Use it to | Our camera (`cam.set/move`, s for a 1920×1080 bg, character ~450 px tall) |
|---|---|---|---|
| Extreme wide (EWS) | the whole place, people tiny | where are we, time of day, loneliness | s 1.0–1.05 |
| Wide / establishing (WS) | full bodies + room | open a scene, geography, who is where | s 1.0–1.15 |
| Full shot (FS) | one body head to toe | walking, body language, entrances | s 1.2–1.4 on the character |
| Medium (MS) | waist up | normal dialogue, gestures | s 1.5–1.7 |
| Medium close-up (MCU) | chest up | most talking lines, reactions | s 1.8–2.0 |
| Close-up (CU) | face | emotion turns, decisions, the important line | s 2.2–2.6 |
| Extreme close-up (ECU) | eyes / mouth / a prop | shock, detail, horror, the clue | a separate insert scene |
| Insert | an object (cracked glasses, letter, ledger) | the plot needs the viewer to read/see it | separate scene, object fills 60% |
| Two-shot | two characters | relationship, balance of power (bigger / higher = stronger) | s 1.1–1.3 |
| OTS (over the shoulder) | back of A's head big in the foreground, B facing us | intimacy in dialogue | fg layer with A, `--d:1.3` |
| POV | what a character sees | put the viewer in their head; horror | camera shake/drift on, no character |

Rules of thumb:
- **Start wide, go closer as the emotion rises, pull back out when it resolves.** Wide = observe, close = feel.
- **Jump only one or two sizes per cut** (WS → MS → CU). WS → ECU is a deliberate shock cut.
- **The most important line of a scene gets the closest shot.** Don't spend the CU early.
- **Cut to the listener** for big lines: the reaction tells the viewer how to feel (Kuleshov effect).
- **Insert shots carry the plot**: if the story turns on an object (glasses, letter, a date in a ledger), give it its own shot, held long enough to read twice (≥ 2.5 s for a short text).

### Angles
- **Eye level** — neutral, default.
- **Low angle** (camera below eye line, look up) — power, threat, heroism. In 2D: character lower in frame + bigger, floor visible, ceiling cropped (cam py higher than the face, s up).
- **High angle** (look down) — weakness, loneliness, being watched. Character small and low in a lot of floor.
- **Dutch tilt** (`cam.move(.., { rot: 4–8 })`) — something is wrong. Use for one or two shots, never a whole scene.
- **Overhead / top-down** — maps, desks, the ledger, fate. Needs its own background.

### Composition
- **Rule of thirds**: eyes on the upper third line; the subject on a vertical third, not dead centre (centre = formal, symmetric, uncanny — good for ghosts).
- **Look room / lead room**: leave empty space in the direction a character looks or moves. A character looking at the frame edge with no space = trapped / tense (use on purpose).
- **Headroom**: small in close-ups (cropping the top of the head in a CU is normal and more intimate).
- **Depth**: foreground (`--d` 1.2–1.4, blurred), middle (characters, 1.0), background (0.7–0.85). Three planes make even a still feel 3D when the camera moves.
- **Frames within frames**: doors, windows, display cabinets — put the ghost *inside* a frame.
- **Negative space** for dread: a lot of dark empty frame with the character small at one side; the viewer searches the darkness.
- **Contrast guides the eye**: the brightest + sharpest + most saturated thing is where people look. Put the light on the face or the clue; dim and blur the rest (`cam.rack`).
- **Staging = readable silhouette**: a pose must read as a black shape. Arms away from the body when the gesture matters.

### Screen direction & continuity
- **180° rule**: in a dialogue, A stays on the left and B on the right in every shot. Never swap sides without showing the move.
- **Eyeline match**: if A looks right, the next shot shows what is to the right; B then looks left back at A.
- **Movement direction**: journeys keep one direction (left → right = going forward / out; right → left = coming back / home / resistance).
- **Cut on action**: cut in the middle of a movement (stand up, turn, open the letter) — the motion hides the cut.
- **Match cut**: shape or motion repeated across a cut (round lens → round moon; clock face → coin). Great for time jumps.

---

## 2. Camera moves (and how to fake them in 2D)

| Move | Feeling | rig.js |
|---|---|---|
| Push-in (dolly in) | growing importance / emotion, "this matters" | `cam.move(t, 2–4 s, { s: +.1 … +.4 })`, `sine.inOut` |
| Pull-out | reveal, isolation, ending | `cam.move` to smaller s |
| Pan / truck | follow, discover, connect two things | change `px` (parallax layers make it a truck) |
| Tilt | reveal height (a tall figure, a staircase) | change `py` |
| Crane / pedestal | rising hope / descending dread | `py` + s together |
| Handheld | nerves, POV, chaos | `cam.drift(amp 6–12)` + small `shake` |
| Shake | impact, scare, explosion | `cam.shake(t, .3–.6 s, 8–20 px)` |
| Whip pan | energy, time skip, comedy | 6–8 F move with `expo.inOut` + blur on layers, cut at the blurred middle |
| Rack focus | move attention between planes | `cam.rack(t, .6–1 s, blurSel, sharpSel, 8–12)` |
| Dolly zoom (vertigo) | realisation, dread, "the floor drops" | `cam.vertigo(t, .8–1.5 s, '#bgLayer', .2–.4)` |
| Static (locked) | calm, observation, comedy timing, horror waiting | `cam.drift(amp 3–5)` only — never fully dead |

Rules:
- **Motivate every move**: the camera moves because a character moves, looks, or the emotion changes. A random zoom = amateur.
- **Speed**: slow moves are 3–8 % scale per second at most. Fast moves (snap zoom) happen in 4–8 F with `power3.out`.
- **Ease**: `sine.inOut` for drifts, `power2.inOut` for motivated moves, `power3.out` for snaps; `none` only for constant drifts and walks.
- **Don't move the camera and cut at the same time unless it is a whip.** Let a move land (settle 6–12 F) before the cut.
- **One move per shot.** A push and a pan in the same shot is fine only when they are one gesture (curving toward a face).
- **Parallax is what sells depth**: put the background on `--d:.8`, characters on 1, foreground props on 1.3. Even a 2 % scale drift then looks like a real camera.
- **Hold still for jokes and scares**: comedy and horror both need the frame to be still so the viewer looks for the change.

---

## 3. Editing rhythm

- Average shot length for TikTok storytelling: **2–4 s**; emotional beats may hold 5–7 s; nothing static for more than ~6 s (add a push, a blink, a dust drift).
- **First 2 seconds = the hook**: the most intriguing image + the most intriguing line (a question). Titles can come after the hook.
- **Cut on the word**: cut to the person/thing at the moment the narration names it (or 2–4 F before).
- **J-cut**: the next shot's sound starts before its picture (we hear the bell, then see the door). **L-cut**: the sound of the previous shot continues over the new picture (her voice continues over his face = reaction shot). Both feel professional; use them every scene.
- **Transitions have meaning**: cut = same time, continuous. Dissolve (`R.dissolve`, .6–1.2 s) = time passes a little / dreamy. Dip to black (`R.dip`) = a chapter ends, a night passes. Dip to white = memory, heaven, flash. Smash cut = sudden contrast (quiet → loud).
- **Pacing curve** of an episode: hook (fast) → setup (medium) → rising (shots get shorter, closer) → climax (longest hold on the key image) → resolution (slower, wider) → teaser (quick, ends on a question).
- **Silence is a cut too**: 0.5–1.5 s of near-silence before a scare or an emotional reveal makes it land.

---

## 4. The 12 principles, applied to our SVG puppets

1. **Squash & stretch** — keep the volume: when sy goes down, sx goes up by 1/√sy (`R.squash`, `R.jolt`). Small for realistic (0.95–1.05), big for cartoon (0.85–1.12). Faces/heads squash less than bodies.
2. **Anticipation** — before any big action, a small opposite action: crouch before a jump (3–6 F), lean back before a run, inhale before a shout, eyes look before the head turns. `walk` leans in 4 F before the first step; `jolt` squashes 3 F before rising.
3. **Staging** — one idea per moment; everything else in frame is still or dimmed. Pose the body so the action reads in silhouette.
4. **Straight ahead vs pose to pose** — we work pose-to-pose: define key poses, ease between them, then add overlap.
5. **Follow-through & overlapping action** — parts don't stop together. Hair, tuft, shawl, hem, forearm and hands lag the body by 2–4 F and overshoot. In `rig.js` the forearm starts 2 F after the upper arm; hair 1 F after the face.
6. **Slow in / slow out** — most moves ease in and out (`sine.inOut`). Mechanical things and constant motion use `none`. Snappy cartoon poses use `back.out(1.5–2.5)` (a small overshoot = life).
7. **Arcs** — living things move on arcs. We get arcs for free by rotating joints (arms swing around the shoulder, head tilts around the neck) instead of sliding x/y.
8. **Secondary action** — a second, smaller action that supports the main one: fiddling with glasses while talking, tucking the letter while thanking, the tuft bouncing on a walk. Never let it steal focus.
9. **Timing** — the number of frames decides weight and mood: a light thing moves in 4–6 F, a heavy one in 12–20 F. Grandma moves ~1.5× slower than Ton. Holds read as thought.
10. **Exaggeration** — push the key pose 20–30 % further than real (shock jump 30 px, not 5). Keep the in-betweens natural.
11. **Solid drawing** — consistent volumes; in our style that means the same head size, line weight (5 px at s=1), and palette per character in every shot. Faking a 3/4 turn = slide face features 20 px toward the look direction, hair the other way.
12. **Appeal** — clear simple shapes, a readable face, asymmetry in poses (one arm up, one down; head tilted), never perfectly mirrored ("twinning" looks dead).

---

## 5. Acting for limited animation (the นายจ๋อง style and anime both live here)

Limited animation = few moving parts, so every motion must be chosen. What keeps it alive:

- **Moving holds**: a held character still breathes (`R.breathe`, 3–3.5 s cycle, 1–1.5 % chest), blinks (`R.blinks`), and the camera drifts. A fully frozen character for more than ~1 s reads as a bug.
- **Blinks**: every 2–5 s, about 15 % double blinks. A blink = close 2 F, closed 1 F, open 3 F (`R.blink`). Blink **on head turns** (hides the eye travel), **after a realisation** (a slow blink), **never during shock or a stare** (pass `avoid` windows), more often when lying/nervous, rarely when focused or scary.
- **Eyes lead**: pupils move first (3 F), the head follows 2 F later (8–9 F turn), the body last (6 F later, 12 F). `R.look` does this order. Ghosts and predators can break it (the head turns with no eye lead = uncanny).
- **The thought shows before the line**: change the face 6–12 F *before* the character speaks; react 4–8 F *after* the other speaks. People think, then talk.
- **Lip-sync**: don't flap — accents on loud syllables. Mouth shapes lead the sound by 1–2 F; minimum hold 2 F; close the mouth (M) on stops before pauses; between phrases go back to the character's rest mouth (smile/frown keeps the emotion while silent). `R.talk(P, t, ENV[n], text)` splits the Thai text into syllables, spreads them over the loud beats of the line (long beats hold several syllables), and per syllable shows: the vowel (`า ะ ั ำ ไ ใ เ-า` → A, `ิ ี ึ ื เ แ` → E, `ุ ู` → U, `โ อ ว เ-ือ` → O), the onset consonant for 2 F — **ม บ ป พ ผ ภ = lips closed (M)**, **ฟ ฝ = G** (top teeth on lower lip), **ส ซ ต ด ท ช จ … = B** (teeth together) — and closes the lips on finals ม บ ป พ (ครับ, หนุ่ม). Check `P.lastTalk` in the console if a line looks off.
- **Talking heads move**: small head accents (2–3°) on stressed words, not on every syllable. A big gesture once per line at most.
- **Listeners act**: nods, blinks, small smile changes while the other talks (`R.listen`). The reaction is half the scene.
- **Emotion = brows + eyes + mouth + body, in that order of speed**: brows/eyes change in 3–6 F, mouth 2 F later, body 8–20 F. `R.emote(P, t, kind)` packages: neutral, happy, joy, sad, shock, fear, angry, think, shy, tender.
  - sad: inner brows up, lids half down, head drops, shoulders round, everything slow (18–20 F).
  - fear: brows worried, eyes wide, mouth stretched, lean back, hands in, fast in (4–8 F) then trembling hold.
  - shock: 3 F squash, 4 F jump, wide eyes with small pupils, O mouth, tuft flips, then **hold still** ≥ 12 F.
  - joy: up and outward — chest out, arms up, quick (5–8 F) with overshoot.
  - tender/thankful: eyes closed-smile, head tilt toward the other, hand to chest, slow.
- **Status** (from theatre): high status = still, slow, takes space, looks directly; low status = fidgets, touches face, smaller, looks away. Ghosts often play high status even when kind (still, centred).
- **Walk = personality**: step time .42 s brisk/young, .5 s normal, .6–.7 s elderly/tired/sad; bob 5–9 px; arm swing 10–18°. Sneak: longer steps, low body. Ghosts don't walk — they glide on a slow arc with the hem lagging (`R.glide`). Crossing the screen = side view (`R.walkSide`: contact → down → passing → up, leg angle computed from speed so the planted foot never slides); toward/away from camera = front `R.walk`. Turn between them with `R.turn`.
- **On twos vs ones**: TV/anime characters move on 2s (`R.twos(P, true)` or `Rig(tl, { twos: true })`), which reads as hand-drawn and calmer; switch to 1s for the one big action of a scene (sakuga) and back. Camera moves always stay on 1s (a pan on 2s judders). Lip-sync stays on 1s.
- **Smear**: on any move faster than ~6 F across 200 px+, add `R.smear` for 1–2 frames in the direction of travel (Looney Tunes / anime). Never 3 F+.
- **Entrances and exits**: enter already moving (start the walk off-frame), exit fully out of frame or behind something; a ghost appears with 2 false flickers then rises in 1.2 s (`R.appear`).
- **Gestures** (`R.pose`): idle, open, shrug, chest, chin, point, wave, cover, hug, hips, reach, fistsUp, behind. A gesture has a preparation (2–4 F), a stroke (on the stressed word), and a hold, then releases.
- **Cheats that read as more animation than they are**: camera moves, a light flicker, particles (dust, petals), a cut to a reaction, a smear frame (a 1–2 F blur on a fast move), sweat drops / emotion marks, shadows moving.

---

## 6. Light, colour and atmosphere

- **Colour script**: decide the palette per scene before building — e.g. EP01: canal night (blue + amber lamp) → shop night (amber, dark) → workbench (warm lamp, green shade) → dawn (cool blue + peach) → ledger (warm sepia) → morning (bright) → end card (dark). The palette change *is* the story arc.
- **Warm = safe / memory / love; cool = night / fear / loneliness / ghosts**. A ghost is the coolest thing in a warm room.
- **Motivated light**: every glow comes from a source in the background (lamp, window, screen). Add a soft radial glow on characters near that source.
- **Vignette** always (edges 40–55 % darker), **film grain** 5–8 % for texture, and dust/particles drifting in light beams.
- **Light change = time change**: a lamp flicker, a sunrise grade (`filter` on the bg + a screen-blend gradient), rays.
- Darken and desaturate everything except the subject for dread; lift everything for relief.

---

## 7. Genre grammar

**Horror / mystery**
- Dread > shock. Slow push-ins, long holds, negative space, sound dropping out.
- Show less: the ghost first in the background, out of focus, or in a reflection; the hero notices after the viewer.
- Rule of the scare: silence (0.5–1.5 s) → the hit within 1–2 F of a cut or a sound → a hold on the reaction.
- Break the rules only for the uncanny: centred symmetric framing, a head that turns with no eye lead, no blinking.

**Heartwarming**
- Warm light, slow moves, soft focus on the background, closer shots for the tender line, hold after it.
- Let small gestures carry the emotion (hand to chest, hugging the letter) — not big ones.
- The payoff shot (the photo, the "จ่ายแล้ว") gets an insert and a beat of silence before the narration names it.

**Action / comedy**
- Fast cuts (1–2 s), snap zooms, impact frames (1–2 F flash), shake, speed lines; comedy needs a still frame and a pause before the punchline (the "beat").

---

## 8. Sound (picture is half the film)

- **Room tone** in every interior; ambience changes with every location (canal, room, street, birds at dawn).
- **Spot sounds** for every visible action that matters: bell, door, footsteps (one per step at the contact time from `walk`), paper, pen, machine.
- **J-cut the ambience** of the next scene 0.3–0.5 s before the picture cut.
- Leave **space under the voice** (the mix ducks the bed with sidechain in `make.sh`).
- **Silence before reveals**, a low hit (`boom`) under title cards and big reveals.
- The user adds the music later — leave room for it (no busy SFX under the final card).

---

## 9. Platform (TikTok / Reels / YouTube)

- 16:9 for the นายจ๋อง-style long story; 9:16 for Reels/TikTok-native. In 9:16, the safe zone avoids the bottom ~20 % (captions/UI) and the right ~12 % (buttons); keep faces in the upper-middle.
- Subtitles: bottom centre, 44–58 px, white with a thick black stroke; colour per speaker (narrator white, ghost pale cyan, letter/written text amber).
- Hook in 2 s, a visual change at least every 3–4 s, a mid-video turn at ~50–60 %, end on a question (teaser) to drive follows.

---

## 10. Pre-render checklist

- [ ] Shot list written; every shot has a size, angle, move and purpose.
- [ ] 180° rule and screen direction hold through each dialogue.
- [ ] No character frozen > 1 s (breathe + blinks on everyone visible).
- [ ] Faces change *before* lines; listeners react.
- [ ] Lip-sync from `env.json` (run `python story-clips/_craft/visemes.py <ep>/audio` after `timeline.py`).
- [ ] Each camera move is motivated and settles before the cut; no edges visible (bg layers oversized, `F()` clamps).
- [ ] Every important prop has an insert shot held ≥ 2.5 s.
- [ ] Palette follows the colour script; vignette + grain on.
- [ ] Sound: ambience per location, spot SFX on visible actions, silence before the reveal.
- [ ] Snapshots at the key moment of *every* shot (`npx hyperframes snapshot --describe false --at ...`), check poses read in silhouette and nothing overlaps the subtitles.

---

## 11. rig.js quick reference

```js
const R = Rig(tl, { seed: 7, twos: false });         // after: const tl = gsap.timeline({ paused: true }); twos = default for all puppets
const P = R.puppet(svg, { x, y, s }, R.LOOKS.ton);   // LOOKS: ton, jan, chan — add new characters as looks
const S = R.puppet(svg, { x, y, s, view: 'side', dir: 1|-1, twos }, R.LOOKS.ton);   // profile puppet (same joints, talk/emote work)
R.walkSide(S, t0, t1, { x, y, s }, { step, bob, swing, lift })   // 4-pose side walk, stride = speed (no foot slide)
R.turn(t, fromP, toP)            // swap views (side→front, left→right) on the spot, hidden by a squash + blink
R.smear(P, t, 1|-1|'up'|'down', { frames: 1|2, amt })    // smear frame on a fast move (≤ 2 F)
R.twos(P, true|false)            // from here on this puppet animates on 2s (camera stays on 1s); off for the big moment
R.place(P, t, { x, y, s })      R.walk(P, t0, t1, { x, y, s }, { step, bob, swing })      R.glide(P, t0, t1, { x, y })
R.look(P, t, dx, dy, { tilt, body, blink })          R.emote(P, t, 'happy|joy|sad|shock|fear|angry|think|shy|tender|neutral')
R.pose(P, t, name, dur, ease)   R.arm(P, 'L'|'R', t, dur, up, bend)   R.wave(P, t, n)   R.nod(P, t, n)   R.shake(P, t, n)
R.talk(P, t, ENV[n], TEXT)      R.listen(P, t0, t1)   R.blinks(P, t0, t1, avoid)   R.breathe(P, t0, t1)   R.appear(P, t)   R.fade(P, t, d, op)
R.mouth(P, t, 'rest|M|B|G|A|E|O|U|smile|grin|frown|wail')   R.eyes(P, t, 'dot|wide|smile|closed')   R.brows(P, t, d, 'neutral|up|sad|angry|worried|skeptic')
const cam = R.cam('#sceneId');  cam.set(t, { px, py, s, rot }).move(t, dur, {...}, ease).shake(t, d, amp).drift(t0, t1, amp)
cam.rack(t, d, '#blurLayer', '#sharpLayer', px);  cam.vertigo(t, d, '#bgLayer', amt)
R.cut(t, outId, inId)   R.dissolve(t, d, outId, inId)   R.dip(t, d, outId, inId, '#000')
```

Scene markup for the camera: `<div class="scene" id="x"><div class="cam"><div class="layer bg" style="--d:.8"><img></div>
<div class="layer" style="--d:1"><svg viewBox="0 0 1920 1080"></svg></div><div class="layer" style="--d:1.3">fg</div></div></div>`.
Author each puppet and each camera **in time order** (helpers tween from the last value they wrote).
