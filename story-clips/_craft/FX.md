# Visual effects + sound effects — the playbook

Companion to `GUIDE.md` (shots/acting) and `STYLES.md` (looks). Code: `fx.js` (visual), `sound.py` + `sfxlib/` (audio).
Rule zero for both: **an effect must serve the story beat**. If you can't say what it makes the viewer feel, remove it.

---

## Part 1 — Visual effects

### 1.1 Atmosphere (always-on texture, low intensity)
| Effect | Feeling | fx.js | Settings |
|---|---|---|---|
| Dust motes in light | stillness, old places, time | `particles(svg,'dust',t0,t1,{box})` | 30–50, only inside the light beam box |
| God rays | morning, holiness, hope | `rays(svg,t0,t1,{x,angle})` | op .6–.8, from a real window in the BG |
| Fog banks | mystery, cold, the unknown | `fog(svg,t0,t1,{y})` | lower half, op .5–.7, slow (drift over the whole shot) |
| Rain | sadness, danger, cleansing | `particles(svg,'rain',...,{angle})` | 120–200 drops, 3 depths; add FG rain on glass for interiors |
| Snow | quiet, loneliness, wonder | `'snow'` | 60–100 |
| Fireflies | magic, childhood, night garden | `'fireflies'` | 15–25 |
| Embers | fire, anger, aftermath | `'embers'` | 30–50 rising |
| Petals / leaves | season, passing time, a soul leaving | `'petals'/'leaves'` | 10–20 |
| Grain / scratches / weave | film, memory, age | `film(t0,t1,{grain, weave, letterbox})` | grain .07–.15 |
| Vignette | focus, intimacy, dread | CSS radial | 45–60 % edge darkening |

### 1.2 Light events
- **Flicker** (`flicker(sel,t0,t1)`) — failing bulb, presence of a ghost, power struggle. Mostly on; irregular dips of 1–3 frames; occasional double blink. Pair every dip with an electrical buzz/click sound.
- **Lightning** (`lightning(t, scene)`) — flash 2 F, dark 2 F, flash 2 F, fade; blue tint; thunder 0.3–2 s later (distance).
- **Sunrise/sunset** — `grade(sel, t, 'dawn', 3)` + rays fading in + bird ambience crossfade.
- **Light sweep** (a car's headlights passing a room) — a soft white rect sliding across the wall with screen blend, 1–1.5 s.
- **Glow** (`url(#fxGlow)`) on magic objects, ghost, the key prop.

### 1.3 Impact & energy (action, comedy, shock)
- **Impact frame** (`impact(t,x,y,svg)`) — 1 F white, 1 F inverted, speed-line burst 8 F. Always with `cam.shake` (8–20 px, .3–.5 s) and a hit sound on the same frame.
- **Speed/focus lines** (`speedLines`) — anime emphasis on a face or an object; redraw every 2 F.
- **Smear** — on a very fast move, blur the moving element for 1–2 F (`filter: blur(6px)` set/unset) or stretch it along the motion (scaleX 1.3).
- **Squash on landing**, **dust puff** on feet contact (small grey ellipses expanding + fading in 8 F).
- **Comic text SFX** (ตุ้บ! เคร้ง!) — big, slanted, white stroke, scale 1.4 → 1 in 3 F, hold, fade. Max one per beat.
- **Sparks** (`sparks(svg,t,x,y)`) — metal hits, machines, electricity.

### 1.4 Supernatural & psychological
- **Ghost appear**: rig `R.appear` (2 false flickers, slow rise) + glow + cold grade on the room + `ghostWarp` 1 s + a reversed swell sound into the moment.
- **Ghost leave**: fade 0.3 s on a cut-away beat (the hero looks down, looks up — gone). Leave petals/smell cues (jasmine).
- **Warp / heat haze** (`ghostWarp`) — dizziness, dream, magic, heat.
- **Glitch** (`glitch(sel,t,.3)`) — digital horror, a phone/screen ghost, memory corruption, a jump in time.
- **Vertigo** (`cam.vertigo`) — the realisation moment. Use once per episode.
- **Desaturate to one colour** — everything grey except the important object (CSS grayscale on the BG layer + the prop on its own layer).
- **Heartbeat vignette** — vignette opacity pulses with a heartbeat sound (.75 s interval, fast attack, slow release).

### 1.5 Transitions (meaning)
| Transition | Meaning | Code |
|---|---|---|
| Cut | continuous time | `R.cut` |
| Match cut | connection between two moments | cut on matching shape/motion |
| Dissolve | time passes a little / dreamy | `R.dissolve(t,.8–1.2)` |
| Dip to black | chapter end, night falls, death | `R.dip(t,1–1.6)` |
| Dip to white | memory, flash, heaven, blinding light | `R.dip(..., '#fff')` |
| Iris out | cartoon ending, "the end" on a face | `X.iris(sel,t,1,x,y,'out')` |
| Wipe | change of place, storybook page | `X.wipe(sel,t,.6,'left')` |
| Whip pan | energy, "meanwhile" | fast cam move + blur, cut at the blur |
| Glitch cut | digital, disorientation | `X.glitch` across the cut |

### 1.6 Grades (`X.grade(sel, t, name, dur)`)
`night` (dark, cool, slightly contrasty) · `dawn` (lifted, warm-cool mix) · `memory` (sepia, soft) · `horror` (green-cyan, crushed) · `noir` (B/W hard) · `warm` · `cold` · `poster` (flat colour bands, comic).
Grade the **background layer**, not the characters, when the characters must stay readable; grade the whole scene for a time-of-day change.

---

## Part 2 — Sound design

### 2.1 The five layers (build every scene from all five)
1. **Dialogue / narration** — king. Everything else ducks under it (sidechain in make.sh, −6 to −12 dB).
2. **Ambience (backgrounds)** — the place: room tone + 1–3 location loops (crickets, canal, street, birds). Never total digital silence inside a scene; silence is a *choice* (2.6).
3. **Foley** — sounds a character makes with the body and props: footsteps (one per contact frame), cloth, paper, cups, doors. Foley is what makes cartoons feel real.
4. **Hard effects** — things in the world: bell, car, thunder, machine, glass.
5. **Design / stingers** — sounds that are not "in the world": whooshes on fast moves and transitions, risers into cuts, sub hits on reveals, reversed swells into scares, shimmers for magic.

### 2.2 Sync rules
- A hit sounds **on the contact frame** (same frame as the impact flash). Sound 1 frame early feels tighter than 1 frame late.
- Footsteps on the walk's contact times (`walk` contacts = each step start); pan follows the character's screen position.
- A whoosh **peaks at the fastest point** of the move — place its loudest moment there, not its start.
- A riser **ends exactly on the cut** (place it at `cut − duration`); then silence or the hit.
- Lightning → thunder delay = distance (0.3 s close crack, 2–4 s far rumble).
- J-cut ambience: the next location's ambience starts 0.3–0.6 s before its picture.
- Lip-sync is picture following sound (rig `talk`); never shift the voice to fit the picture.

### 2.3 Mixing levels (target −14 LUFS integrated for TikTok/Reels/YouTube)
| Layer | Typical level vs narration |
|---|---|
| Narration | 0 dB (peaks ≈ −3 dBFS after +3 dB in make.sh) |
| Ambience | −18 to −26 dB (`amb(..., -22)`) |
| Foley | −10 to −16 dB |
| Hard effects | −6 to −12 dB (big moments up to −3) |
| Design whooshes | −14 to −20 dB |
| Music (user adds) | −16 to −20 dB under voice |
- Final export: `loudnorm=I=-14:TP=-1.5:LRA=11` on the mixed track (a bed alone sits around −24 LUFS — that is right under a voice).
- **Pan** by screen position (−1 left … +1 right), keep narration centred.
- **Space**: reverb matches the room (`b.room('small'|'room'|'hall'|'outdoor')`); off-screen sounds are quieter, darker (lowpass 2–4 kHz) and wetter.
- **Muffle** (`b.muffle`) for behind-a-wall, underwater, fainting, a memory.
- High-pass ambience under 80 Hz unless it's a deliberate rumble; leave 2–4 kHz clear for the voice.

### 2.4 Genre palettes
- **Horror / ghost**: low drone (`drone`), room tone, distant dogs, a creak, clock ticks getting louder, reversed swells into the reveal, sub hit + silence, whispers panned hard L/R, high shimmer for the ghost. Take the ambience **away** right before the scare.
- **Heartwarming**: soft room tone, morning birds, gentle chimes, paper/cloth foley close and detailed, no hard hits; leave space for music.
- **Comedy / cartoon**: boing, slide whistle (rising = up, falling = drop), pop on appear, zip on exits, bonk on heads, squeak toy steps for small characters, a cartoon run loop. Timing is everything: the sound lands on the frame, then a beat of silence.
- **Action**: punchy layered hits (body thump + crack + whoosh), sub on big blows, debris after, fast ambience changes, risers into set-pieces.

### 2.5 Thai places (ambience recipes)
- ตึกแถวริมคลอง at night: crickets + canal water + distant motorbike + a dog far away + room tone inside.
- ตลาดเช้า: market crowd + vendors (keep under narration) + motorbikes + birds.
- วัด: temple bell (rare), birds, broom sweeping, wind in trees.
- ทะเลหัวหิน: waves, wind, gulls, distant kids, longtail boat engine.
- กรุงเทพฯ กลางคืน: city street ambience + traffic + 7-Eleven door chime (synth `tone(1760)`).

### 2.6 Silence & dynamics
- The loudest moment needs quiet before it. Duck everything (`b.duck`) 0.5–1.5 s before the reveal/scare, then hit.
- Don't fill every second — give the narration space; ambience breathes between lines.
- End cards: a low hit or a single chime, then fade so the user's music can take over.

### 2.7 Library (`sfxlib/`)
Real recordings from Openverse (Freesound etc.), CC0 first; CC BY only when nothing else fit — those are listed in `sfxlib/CREDITS.md` and must be credited in the post caption/description if used.
`python sfxlib/fetch.py "<concrete name>" <category>` adds one more (name things concretely: "wooden door creak", not "scary sound").
List: `python -c "import sys; sys.path.insert(0,'story-clips/_craft'); from sound import names; print(names())"`.
