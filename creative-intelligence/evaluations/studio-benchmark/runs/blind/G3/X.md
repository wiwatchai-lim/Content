Files consulted: [hidden for blind judging]

# Promo image set — TIME OPTIC Hua Hin: UV protection at the beach

**Brief:** a set of 3 square cinematic scenes in the shop's feed style ("ทำภาพโปรโมท").
- Glasses are the hero; one real pair of sunglasses from stock is attached to every prompt with `-i`.
- Message, readable in 2 seconds: *real UV400 sunglasses for Hua Hin sun*.
- Feeling: calm confidence, not fear.

**Needed from the user first:**
1. Which sunglasses (stock model + colour).
2. Proof of UV400 for that model (see Verification).
3. A price or promo, if any.
4. OK for 3 Codex runs, which use 3 ChatGPT quota. FLUX is free but can't keep the real product, so Codex is the right tool here.

**Light concept:** the feed is dark and moody; the beach is bright. I bridge them with **hard tropical sun and deep shadows**: low-key areas around a sunlit hero, strong contrast and a teal-sea / warm-sand palette. That keeps the cinematic feed look while making the sun the story.

## Scene prompts (Codex, the real cutout attached `-i "kits/<folder>/layers/<sunglasses>_1.png"`)

**S1 — "Noon on the sand" (product hero, establishing).**
> Square 1:1 cinematic product photograph. The attached sunglasses rest folded on smooth pale beach sand at midday on a calm tropical gulf beach, lenses facing the camera, both temples and the bridge touching the sand with a crisp, realistic contact shadow directly beneath. Hard overhead sun, deep short shadows, bright specular highlight along the top of the frame, a faint reflection of the sky in the lenses. Background: soft-focus turquoise sea and a thin line of gentle surf, a few distant wooden beach chairs as simple blurred shapes, empty beach, no people. Camera low at sand level, 85 mm look, shallow depth of field, the glasses sharp and centred in the lower middle, clear sky space in the top quarter for logos. Use the attached glasses exactly as they are — same shape, proportions, colour, lens tint, temples and hinges; do not redesign, restyle or add logos. Photorealistic, no text, no logos, no watermark, no brand names.

**S2 — "Shade and glare" (the problem the lens solves, shown calmly).**
> Square 1:1 cinematic still life. The attached sunglasses lie open on a folded striped beach towel at the edge of a beach umbrella's shadow, half in deep shade and half in blazing sun, a sharp diagonal shadow line crossing the towel beside them. Behind, out of focus, bright glitter of sunlight on the sea surface. Warm sand tones, teal water, high contrast, rich blacks in the shade. Camera at a three-quarter angle slightly above, glasses sharp in the centre, their frame and temples resting on the towel with a realistic contact shadow; empty top area of clear sky. No people. Use the attached glasses exactly as they are — same shape, proportions, colour, lens tint, temples and hinges; do not redesign, restyle or add logos. Photorealistic, no text, no logos, no watermark, no brand names.

**S3 — "Golden walk home" (emotion, end of the day).**
> Square 1:1 cinematic photograph at golden hour on a long quiet beach with a low green headland in the far distance, warm low sun behind, long shadows on wet sand that mirrors the sky. In the foreground the attached sunglasses sit on top of a woven straw sun hat lying on the sand, lenses catching a warm rim light, the hat and glasses in clear contact with a soft shadow. Gentle sea foam lines in soft focus, a few horse hoof prints in the sand, no people, no buildings, no temples or statues. Glasses sharp in the lower centre, clear sky in the top quarter. Use the attached glasses exactly as they are — same shape, proportions, colour, lens tint, temples and hinges; do not redesign, restyle or add logos. Photorealistic, no text, no logos, no watermark, no brand names.

(The hat in S3 also supports the accurate message: UV400 sunglasses plus a hat.)

## Layout (HTML layer over each 1080×1080 image; English only)
- **Top centre:** white partner logo of the frame brand (official file from `brand/partner-logos/`; fetch it if missing). Sunglasses have no Rx lens, so there is no lens-brand logo unless the lens itself is a branded product.
- **One short uppercase spec line** under the logo, letter-spaced, white with a soft shadow for contrast on the sky:
  - S1 `UV400 LENSES`
  - S2 `UV400 · 100% UVA/UVB` (only if the spec says so)
  - S3 `HUA HIN SUN, COVERED`
  - Change these if the user prefers.
- **Bottom centre:** white spaced TIME OPTIC logo (`brand/logo/timeoptic-white-spaced.svg`), with a small "Hua Hin" line under it if the user wants the branch.
- No store line art (feed promo rule). No price unless the user gives one, and then real terms only.
- Check text contrast against the actual pixels (WCAG ≥ 4.5:1 for the spec line). Keep a 4:5 crop safe if the set is reused on FB.

**Caption (accurate wording, for the user):** "Hua Hin sun is strong all year. Sunglasses with UV400 lenses (100% UVA/UVB, per the maker's spec) cut the UV reaching your eyes — add a hat for the best cover. Come try them on at Time Optic Hua Hin." No "prevents pterygium/cataract", no "darker = safer", no "polarized = UV protection".

## Must be verified before publishing
1. **UV400 is real for this exact model:** the maker's spec sheet or tag, or a reading with the shop's UV meter. Keep the proof (CPA ม.28). There is no UV400 entry in `data/`, so it cannot be assumed.
2. **Claim wording** follows the claims library:
   - UV is a *risk factor* for pterygium, not "the cause" (C07);
   - sunglasses *reduce UV reaching the eye*, they don't "prevent" disease (C09);
   - beach reflection adds exposure but water and sand are moderate reflectors (C11);
   - tint darkness ≠ UV protection (C12);
   - polarized ≠ UV (C13).
3. **Product truth:** compare each image to `photos/`: shape, bridge, temples, lens tint and colour unchanged; glasses touching the surface, not floating; no extra logos or baked-in text. Reject and regenerate (ask first) any image that drifted. CPA ม.22 counts images as advertising "text".
4. **After the Codex runs:** run them one at a time. md5sum the three results (parallel runs can save identical files) and recover the originals from `~/.codex/generated_images/<run>/` if needed.
5. **AI disclosure:** AI label ON when posting, and a small "AI-generated image / ภาพสร้างโดย AI" note on the image or in the caption, following the สคบ. guidance noted in the ethics file.
6. **Culture and place:** no temples, Buddha images, flags or royal symbols in the scenes. No recognisable hotels or brands in the background.
7. **Logos:** official partner logo file, correct colours, and nothing implying the brand endorses the shop.
8. **Branch details** (name, contact) match the shop's real info. Spelling of the English lines checked.
9. **Final render:** read with Read at full size and as a 1:1 thumbnail. The glasses stay the first thing the eye lands on.
