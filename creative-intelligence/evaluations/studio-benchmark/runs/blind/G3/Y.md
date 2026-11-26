Files consulted: [hidden for blind judging]

# Hua Hin branch — UV at the beach (UV400 sunglasses) · promo image set

**Format** ("ทำภาพโปรโมท" house style, bra-20261109-001): 3 square 1080×1080 cinematic scenes made with Codex image_gen, with the **real cutout of one stock sunglasses SKU attached via `-i`**. The glasses are the hero. All text is added afterwards in HTML (English on the image). There is no store line art. I ask before every Codex run, run the scenes one after another (never in parallel), and keep every version.
**Before any prompt is run, ask:** which sunglasses (a stock row with a verified photo), whether there is a price or promo, and whether a **source showing UV400 / 100% UVA-UVB for that exact model** exists.

## Shared prompt parts
`KEEP` = "Use the attached sunglasses exactly as they are: same shape, proportions, frame colour, lens tint, temples and hinges. Do not redesign, restyle, recolour or add any logo, text or extra parts. The glasses rest on the surface with both temple tips and the lower rims touching it, with a realistic contact shadow and believable reflections of the scene."
`STYLE` = "Square 1:1 premium eyewear advertising photograph, cinematic, high contrast, shot on a medium-format camera with a 100mm macro lens, shallow depth of field. A clean image without any text, letters, watermark or logos. Calm deep-toned negative space fills the top 18% and the bottom 14% of the frame for a logo overlay. Photorealistic."
(Positive wording throughout. The only "without" phrase is the standard guard line about text. No landmarks: Khao Takiab's standing Buddha must never be a product backdrop (CULTURAL C1), so the scenery is a generic Gulf-coast beach.)

### Scene 1 — "Noon sun" (the risk is real, the fix is simple)
```text
$STYLE The attached sunglasses, folded, lying on pale fine beach sand at high noon next to the brim of a woven straw sun hat. Hard overhead tropical sunlight, a crisp short shadow under the glasses, individual sand grains sharp in the foreground. The lenses reflect a small bright sun flare and a band of turquoise sea. Background softly out of focus: a calm turquoise Gulf of Thailand shoreline and a deep cobalt sky that darkens toward the top edge. Palette: deep cobalt, turquoise, warm sand, straw gold. Bright, clear, protective mood. $KEEP
```
Where the eye goes: the glasses (centred, sharpest, highest contrast), then the hat brim, then the sea. One hero, so it sits in the centre (ART_FUNDAMENTALS §8).

### Scene 2 — "Shade line" (visual metaphor: protection)
```text
$STYLE The attached sunglasses, open, standing on a weathered pale teak beach table. The sharp diagonal edge of a beach umbrella's shadow crosses the table exactly through the bridge of the glasses: one lens sits in bright hard sunlight, the other in cool blue shade. The sunlit side shows a crisp bright highlight on the frame; the shaded side shows the soft blue reflection of the sky. Background out of focus: sunlit sand and a pale sea horizon under a deep blue sky darkening toward the top. Palette: deep blue, warm teak, sand white. Calm, smart, premium. $KEEP
```
Where the eye goes: the shadow line leads straight into the bridge. Half sun / half shade reads as "protection" with no words. Check that the shadow edge does not cut the frame into something that looks broken.

### Scene 3 — "Golden hour, Hua Hin" (local, warm, end of the set)
```text
$STYLE The attached sunglasses, open, resting on smooth wet sand at the waterline in low golden late-afternoon sun, a thin sheet of retreating seawater around them mirroring the glasses and the sky. A soft line of sea foam curves behind them. Background out of focus: traditional wooden fishing boats moored in the shallows and a long calm beach, warm orange sun low on the horizon, the sky shifting from amber at the horizon to deep navy at the top. Palette: deep navy, amber, wet-sand bronze. Warm, relaxed, premium. $KEEP
```
(Fishing boats give a local feel without any brand marks or text. J4: zoom in and check the AI added no lettering on the boats.)

Command per scene (only after the user says yes to that run): the frame-kit `codex exec … "PROMPT: <scene>" -i "kits/<folder>/layers/<file>.png" < /dev/null`. Copy the result from `~/.codex/generated_images/<run>/` into `kits/<folder>/scenes/`, then md5sum all three scenes to make sure none came out identical (err-20261111-001).

## Layout (HTML overlay, each 1080×1080, same on all three)
- **Top centre:** white partner logo(s), e.g. `BRAND` alone, or `BRAND / lens-brand` when our lenses are fitted. Official files from `brand/partner-logos/`.
- **Under the logos:** one short uppercase spec line, white, tracked: S1 `UV400 PROTECTION` · S2 `<MODEL CODE>` · S3 `TIME OPTIC HUA HIN`. `UV400 PROTECTION` appears **only** if the UV400 source exists for that SKU; otherwise S1 uses the model code too.
- **Bottom centre:** white spaced wordmark `brand/logo/timeoptic-white-spaced.svg`.
- **Small Thai AI label**, readable on a phone, bottom-left in the bottom band: `ภาพสร้างโดย AI` (+ `Image created by AI`). It is required for AI ad images (CULTURAL J1) and sits alongside the English-only text rule.
- Margins ≥ 72 px. Logos and text stay off the glasses.

**Caption (English, fact-checked wording):** "Sun, sea and sand at Hua Hin. Sunglasses with UV400 lenses block 99–100% of UVA/UVB (manufacturer spec), which lowers how much UV reaches your eyes. Add a wide-brim hat for more cover. Tip: a darker tint does not mean more UV protection, so check for the UV400 label. We can check your sunglasses for you at Time Optic Hua Hin. LINE @timeoptichuahin · 032-511-360" plus the price or promo only if the user gives one. Image created by AI / ภาพสร้างโดย AI. (No "prevents pterygium/cataract": C09 is `partly`, so the wording stays at "lowers UV / risk factor". C12 darkness ≠ UV. C13 polarised ≠ UV, so don't mention polarised unless the lens is polarised and UV400 too. C11: sand and foam reflect some UV, so no "many times more dangerous". The in-shop UV check line is used only if the shop really has a UV meter.)

## Verify before publishing
1. **UV400 claim:** the maker spec sheet or product page for that exact model and lens is saved in the kit (CPA ม.28: we must be able to prove it), or the shop measured the lens with a UV meter. If there is no proof, there is no UV400 text anywhere.
2. **Product truth (J2):** each scene is compared with `photos/`. Shape, bridge, temples, tint and hinge must be unchanged, temples touching the surface (rej-20261109-002), no invented logo on the temple. Reject and redo (asking first) if anything changed.
3. **AI artefacts (J4):** zoom in and check for no stray letters, flags, religious symbols or extra people. The sky and sea must look physically sensible (sun direction matches the shadow).
4. **Claims:** every caption sentence goes through FACT_CHECK_WORKFLOW (FACTCHECK block with C09/C11/C12 keys). No prevent/cure/100%-safe/"best" words. Owner sign-off.
5. **Labels and platform:** Thai AI label on the image or in the caption, and the IG/FB AI label turned on.
6. **Brand and house rules:** spaced white TIME OPTIC, partner logos official, no line art, English on-image text, price only from the user.
7. **Readability:** white text over the top and bottom bands passes contrast (`color_tools.py` ≥ 4.5:1). Check on a phone-size render.
8. **Independent `creative-critic` run** on the 3 finished images + caption, then fix critical and major findings. Keep v1 when redoing. After the user reacts, run `memory.py add` with their words.
