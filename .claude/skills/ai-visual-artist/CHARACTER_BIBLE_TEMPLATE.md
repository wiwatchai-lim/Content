# Character Bible — template (+ the project's existing characters)

One bible per recurring character. Fill every section before the character appears in more than one image. AI image
models do not remember a character from words alone: keep one **approved master image** per view and reuse it
(img2img / Codex `-i` / the SVG rig) — the text is for checking, the images are for generating.

```markdown
## <Character ID> — <name>
- Personality (3 words + one sentence of want/fear):
- Role in the stories / brand:
- Shape language: dominant shape (circle = friendly / square = steady / triangle = dynamic, sharp) and why
- Silhouette test: recognisable as a black fill at thumbnail size? (yes/no + what makes it so)
- Proportion guide: height in heads, head:body ratio, eye line, shoulder width (in head widths), limb lengths
- Views (master images, paths): front · three-quarter · side · back
- Expression sheet (paths or descriptions): neutral, happy, sad, angry, fear, surprise, thinking, shy, + signature
- Pose sheet: idle, walk, signature gesture, 3 action poses
- Colour palette: HEX list with roles (skin, hair, top, bottom, accent, line colour) + value pattern (light/dark map)
- Costume rules: fixed items, allowed variations (season, scene), never-change items
- Signature features (must appear in EVERY image): e.g. round black glasses, tuft of hair
- Line & rendering: line weight, outline colour, shading style
- Visual consistency rules: what may change (expression, pose, lighting colour) / what may not (face shape, glasses, palette ids)
- Prompt block (English, reusable): one paragraph that describes the stable traits only
- Readability checklist: face readable at 200 px, glasses visible, not confused with other characters
```

---

## Existing characters (from the project's rig and story files; masters to be confirmed by the user)

### ton — ต้น (ร้านแว่นตีสอง, SVG puppet in story-clips/_craft/rig.js)
- Personality: kind, timid at night, conscientious young optician (~28).
- Shape language: circles (round head r≈104 px at s=1, round glasses) on a soft rounded-rectangle torso → friendly, harmless.
- Proportion: ≈ 3.5 heads tall storybook puppet (520 px at s=1; head ≈ 210 px); legs short.
- Palette (rig LOOKS.ton): skin #F3E1CB, hair #1F1B22 (messy, one tuft), shirt #4F6B58 sage green, inner #EFE7D6, trousers #2B2A33, shoes #1B1A1F, outline #241C18.
- Signature: round black glasses, messy black hair with a tuft, sage-green open shirt over cream.
- Views: front puppet + profile puppet (rig v2, 2026-11-24). Never change: glasses, hair shape, shirt colour.

### jan — คุณยายจันทร์ (ghost grandma)
- Personality: gentle, sad, loving; never scary on purpose (~80).
- Shape: circles + a wide dress triangle (stable, grounded) with a soft cyan ghost glow.
- Palette (LOOKS.jan): skin #EEF2EF (pale), hair #D5DCDF silver bun, blouse #EFE5CF cream lace, shawl #9FB4B6, gold glasses #C8922E, eyes #3B3540.
- Signature: silver bun, gold round glasses, cream lace with a hem of small circles, glow.

### chan — ลุงชาญ
- Personality: gruff outside, sentimental inside (~65).
- Palette (LOOKS.chan): skin #ECD3B8, bald with grey sides #C9C9C9, jacket #7A5A3E, inner #E8E2D4, trousers #3B3630, moustache.
- Signature: bald head with side hair, moustache, brown jacket.

### mint & tao — Slowly Growing (pencil/charcoal dialogue stories, slowly-growing/README.md)
- Both: smooth round faceless heads (no facial features — emotion is told by posture, distance and composition).
- Mint: oversized oat-coloured knit sweater, dark trousers; shorter.
- Tao: long charcoal coat, muted brown scarf; slightly taller.
- Style lock: fine graphite pencil on aged cream paper; beige / warm grey / charcoal / muted brown; no text in the image; top third left empty for the HTML text layer.
- Consistency method already in use: attach the approved EP01 image as a reference to every new generation.
