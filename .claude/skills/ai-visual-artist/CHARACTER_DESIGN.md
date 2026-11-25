# Character Design

Sources: research/R3 (EkmanFriesen1971/1978, Faigin1990, Lorenz1943, Glocker2009, Gould1979, Mori2012,
ThomasJohnston1981) + R1 (proportion teaching sources). Template + existing characters → CHARACTER_BIBLE_TEMPLATE.md.

## 1. Readability first
- **Silhouette test:** the character must read as a black shape at thumbnail size (distinct head shape, hair, props such as glasses) [Artistic].
- **Shape language** (hypothesis, not law): round = friendly/soft, square = stable/stubborn, triangle = dynamic/dangerous; combine (a round face on a square body = gentle but dependable) [Artistic; studio source unverified].
- **Value pattern:** one dominant value area (light shirt / dark coat) so two characters separate in a scene.
- **Colour:** 3–5 colours per character + line colour; the signature colour never shared with another main character.

## 2. Proportion & appeal
- Choose a canon (DRAWING_TECHNIQUES §2) and keep it across the series.
- **Cute / mascot levers (baby schema):** larger head-to-body ratio, larger and lower-set eyes, high forehead, small nose and mouth, round cheeks — push for warmth; pull back for credibility (a shop expert) [finding: Lorenz1943, Glocker2009, Gould1979].
- **Uncanny valley:** prefer clearly stylised characters, or fully photographic people checked for hands/eyes/teeth; near-real AI faces with small errors are the worst case [finding: Mori2012].
- "Appeal" and "solid drawing" (Disney animators' vocabulary) = clear, pleasing, believable design — not prettiness [ThomasJohnston1981].

## 3. Expression & body language
- Describe expressions as **muscle actions**: sad = inner brows raised, lip corners down; genuine joy = cheeks raised, eye corners crinkled (Duchenne); anger = brows lowered and drawn together, lips pressed; fear = brows raised and drawn together, upper lids raised; surprise = brows up, jaw dropped; disgust = nose wrinkled, upper lip raised [finding: EkmanFriesen1978, Faigin1990].
- Posed basic expressions are recognised fairly reliably across cultures [finding: EkmanFriesen1971] — exaggerate for small mobile frames.
- **Body language** carries emotion when faces are absent (this project's faceless Mint & Tao): distance between figures, head tilt, shoulder height, open vs closed arms, weight direction [Artistic].
- **Expression sheet:** neutral, happy, sad, angry, fear, surprise, thinking, shy + 1–2 signature expressions.

## 4. Costume
Costume tells role, era, personality, wealth, weather; keep fixed items (glasses, scarf), allowed variations
(season), and never-change items in the bible. For an eyewear brand, glasses are the signature prop — draw them
consistently (same shape, colour, bridge, temple).

## 5. Consistency across AI images (practical)
1. Make one **master** per view (front, 3/4, side, back) and get it approved.
2. Reuse masters as references: Codex `-i`, FLUX img2img (`--init`, denoise 0.35–0.6 for the same character in a new pose), or the SVG rig for cartoons.
3. Keep a stable **prompt block** with only the fixed traits; put scene variables elsewhere.
4. Fixed palette hexes; fixed line style; fixed proportions.
5. Critique every new image against the bible (IMAGE_CRITIQUE_ENGINE → character_consistency).
Text-only prompts do not guarantee identity — no ControlNet/IP-Adapter/LoRA is installed here (IMAGE_PROVIDER_ADAPTERS §5).

## 6. Character psychology → design
Want / fear / flaw → posture, colour temperature, shape. E.g. Ton (timid, kind): round shapes, soft sage green,
slightly hunched when afraid, glasses as the "seeing" motif of the series.
