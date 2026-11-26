Files consulted: [hidden for blind judging]

# EP161 — รถเข็นคันแรก (การเริ่มต้นใหม่หลังล้มเหลว)

**Why this story:** sets 1–160 already cover small failures (job rejections #55, driving test #62, sandcastle #75, roller skate #123…). EP161 goes bigger and more adult: **a small café that had to close**, and the restart is a tiny coffee cart. The arc avoids toxic positivity: grief is accepted first → mistakes turned into lessons → fear named → a smaller start → reframe ("not from zero").

**Format (same as sets 1–160):**
- 5 slides, 1080×1080 (IG 1:1), charcoal faceless duo, Thai bubbles in HTML (`dialogue.css`), **no logo**.
- Left = person in a hoodie (speaks first, the one who failed); right = person in a long coat (answers, bold line).
- Bubble lines ≤ ~12 Thai chars, `<br>` set by hand.
- Kit: `carousel/kits/2026-11-27_161-coffee-cart/`; story added to a new `carousel/stories/2026-11-27.mjs`; FLUX through `gen.sh` → pick → `finish.py` → render.

**Emotional arc:** loss (low, still) → reflection (quiet) → fear (tight, small) → first step (morning light, lift) → quiet pride (warm, open).

## Slides

| # | ซ้าย (ฮู้ด) | ขวา (โค้ท) — ตัวหนา = บรรทัด 2 |
|---|---|---|
| 1 | ร้านปิด<br>แล้วจริง ๆ | ไม่เป็นไรนะ<br>**เสียใจได้** |
| 2 | พลาดไป<br>ตั้งหลายเรื่อง | จดไว้สิ<br>**บทเรียนทั้งนั้น** |
| 3 | ถ้าเริ่มใหม่<br>แล้วพังอีกล่ะ | เริ่มเล็ก ๆ<br>**ก่อนก็ได้** |
| 4 | เล็กกว่า<br>ร้านเดิมเยอะ | แต่รู้มากกว่า<br>**เดิมเยอะ** |
| 5 | เริ่มใหม่<br>จากศูนย์เลย | ไม่ใช่ศูนย์<br>**เรามีบทเรียน** |

## Art direction per slide

For every slide:
- Style prefix = the series `STY` (soft charcoal and graphite on pale cream paper, faceless mannequin people with smooth white ball heads, upper third blank, light airy background, no dark sky, no signature, no text).
- Figures sit in the lower two-thirds, left/right as in the series.
- Rejects: no signs or lettering (FLUX writes fake text), no third person (FLUX draws real faces), no night scenes (charcoal turns them into grey boxes).

**Slide 1 — loss.** Value: mostly mid-greys, the lowest-energy slide. Static, horizontal composition: the hoodie person sits on a cardboard box, shoulders down; the coat person stands close and puts a hand on their shoulder (comfort, not advice).
> A small empty shop front with a plain metal roller shutter pulled half down, no signs, no lettering, a few stacked cardboard boxes, no other people. On the left, the left person, in a hooded sweatshirt, sits on a cardboard box with shoulders slumped and head lowered. On the right, the right person, in a long buttoned coat, stands close and rests one hand on their shoulder.

**Slide 2 — reflection.** Indoors, soft window light from the right (toward the future side). Props carry the story: an apron, cups, an open notebook. The coat person points to the notebook, which turns pain into something to write down.
> An empty small café interior with bare shelves and a wooden counter, an apron folded on the counter and a few cups in a box, soft window light from the right, no other people. On the left, the left person, in a hooded sweatshirt, holds an old coffee mug and looks down at it. On the right, the right person, in a long buttoned coat, holds an open notebook and a pencil toward them.

**Slide 3 — fear.** The tightest framing; the figures a little smaller in wider empty space to show doubt. Body language: arms hugging self vs. an open palm.
> A quiet pavement beside a low wall, a little empty space around the two people, light airy background, no other people. On the left, the left person, in a hooded sweatshirt, hugs their own arms, head tilted down, unsure. On the right, the right person, in a long buttoned coat, holds out one open palm with a small paper cup on it, gently.

**Slide 4 — the first step.** Early-morning light, brighter paper, lighter shading. The hero prop is a **small wooden coffee cart** in the centre between them (a single hero object, so centred); both people work on it, which shows partnership.
> Early morning on a calm street corner with a small wooden coffee cart on two wheels between them, a little kettle and a row of paper cups on the cart, plain cart with no signs and no lettering, soft morning light, no other people. On the left, the left person, in a hooded sweatshirt, wipes the cart top with a cloth. On the right, the right person, in a long buttoned coat, hangs a small round lamp on the cart's pole.

**Slide 5 — reframe.** The warmest and most open slide: a wider shot, a little headroom, steam rising. The hoodie person hands over the **first cup of the new cart**; the coat person receives it with both hands (a Thai polite gesture). The ending holds a peak of quiet pride.
> A small wooden coffee cart on a calm street corner in soft daylight, plain cart with no signs, a little steam rising from a paper cup, no other people. On the left, the left person, in a hooded sweatshirt, stands behind the cart and hands a paper cup of coffee across with a small proud lean. On the right, the right person, in a long buttoned coat, receives the cup with both hands, head tilted warmly.

**QC before render:** reject seeds with dot eyes or smiles on the ball heads, an extra person, a cart with letters, or a grey-box sky. Erase signatures with `--sig` boxes padded upward. Check the bubbles don't cover heads. Read the rendered slides.

## Caption (option 1 — main)

☕ รถเข็นคันแรก

ร้านเล็ก ๆ ที่ตั้งใจทำ ต้องปิดลง
วันแรกไม่ต้องรีบเข้มแข็ง เสียใจได้
แล้วค่อย ๆ จดว่าพลาดตรงไหน

เริ่มใหม่ไม่ต้องใหญ่เท่าเดิม
รถเข็นคันเล็ก ๆ ก็พอ
เพราะเราไม่ได้เริ่มจากศูนย์
เราเริ่มจากทุกอย่างที่เคยเรียนรู้มา 🤍

ปัดดูให้จบนะ 👉
ส่งให้คนที่กำลังจะเริ่มใหม่อีกครั้ง 🌱

#เริ่มต้นใหม่ #ล้มแล้วลุก #กำลังใจ #เรื่องสั้น #คำคม #ข้อคิดดีๆ #มิตรภาพ #คำคมชีวิต #แคปชั่นซึ้งๆ #เรื่องเล่าอบอุ่นใจ

**Option 2 (short):** ไม่ใช่เริ่มจากศูนย์ / เราเริ่มจากบทเรียน ☕🌱 — ปัดดูเรื่องราวให้จบ 👉 #เริ่มต้นใหม่ #กำลังใจ #คำคม #ข้อคิดดีๆ

**Option 3 (conversation):** เคยต้องเริ่มอะไรใหม่หลังล้มไหม? ครั้งนั้นเริ่มจากอะไร เล่าให้ฟังหน่อยในคอมเมนต์ 👇 #เริ่มต้นใหม่ #เล่าให้ฟังหน่อย #กำลังใจ

**If it is turned into a Reel:** 9:16, ~4 s per slide, the user's music, AI label ON, and the caption ending changes to "ดูให้จบนะ 👀".
