Files consulted: [hidden for blind judging]

# C4 — Image job: prompts + layout for a TIME OPTIC IG post (critique)

Critic: inline (not independent). Verdict: **fail**.

**What it is:** a 1:1 feed post made from two Codex images (a background and a model) plus an HTML headline.

| # | Location | Problem | Why | Fix | Severity |
|---|---|---|---|---|---|
| 1 | "Glasses: redrawn by Codex from text description" | The product is invented by the model, with no reference photo. | Any product render needs the real frame photo attached with `-i` (CLAUDE.md; frame-kit). Product size, colour and shape must match reality (CULTURAL_CHECK J2 [STOP]). | Attach the real cutout or photo with `-i` and describe it to match. | critical |
| 2 | Generator line | "run 6 variations straight away". | Every Codex image costs the user's ChatGPT quota, so ask before each run (CLAUDE.md; tas-20261113-002). | Ask first. Offer free local FLUX for drafts. Run 1 scene first, then more on approval. | critical |
| 3 | Prompt 1 | "the words 'SALE 50%' painted on the wall". | Generated images are text-free; text lives in HTML (tas-20260925-005). "50%" is an invented promo (never invent a price/promo). AI text also comes out garbled. | Remove the text from the prompt. Ask the user for the real promo and set it in HTML. | critical |
| 4 | Prompt 1 | "in the style of Greg Rutkowski". | This is a living-artist name, banned by the house rule (STUDIO_RULES) and an ethics/licensing risk. | Describe the qualities instead: "soft painterly light, warm low-key studio, gentle rim light". | major |
| 5 | Prompt 2 | "no glasses on the table, no text, no logo". | Negative phrases make the model draw what they name (err-20261121-001). Describe what is there instead (fix-20261121-001). | "a clean wooden table with only a ceramic cup; plain wall". | major |
| 6 | Layout: headline colour | Peach #F4C7A1 text on Snow #FAFAF7. | The measured contrast is 1.48:1, which fails AA even for large text. The brand rule says Peach is never text on a light ground, only a rule, bar or fill (daily-post brand rules; bra-20260925-001). | Set the headline in #212121 or Phthalo green #123A29 and use Peach as a bar or underline. | major |
| 7 | Layout: size and margin | 28 px headline, 20 px from the edge. | The post safe margin is 72 px (`--to-margin`). A 28 px headline on a 1080 square is body size, too small to read in the feed grid. | Make the headline 64–96 px Archivo 700/800 at the 72 px margin. | major |
| 8 | "Store line-art: not used" | The post has no line art. | Posts carry `brand/store-lineart.png` faint at the top right (CLAUDE.md; daily-post). The only exception is the "ทำภาพโปรโมท" cinematic promo set (promo-image-feed-style), which this is not (beige studio). | Add the line art at about 0.6 opacity top-right, or confirm with the user that this is a promo set (then use the dark cinematic format instead). | major |
| 9 | Whole job | No TIME OPTIC logo and no AI label are planned. | Posts carry the logo in a corner at the margin (daily-post). Ads with AI-made images need a Thai label such as "ภาพสร้างโดย AI" plus the platform AI label (CULTURAL_CHECK J1). | Add the logo at 170 px in a free corner and the AI label line in the caption or on the image. | minor |
| 10 | Prompt 2 | "a woman wearing glasses" with no product, pose, lighting or contact described. | The glasses must sit correctly on the face and touch it, matching the real product (rej-20261109-002 floating-temple lesson). | Specify a 3/4 head-and-shoulders view, the frame from the attached photo resting on the nose bridge and ears, and soft window light. | minor |

**What is good:** 1080×1080 is the right feed size. Splitting the job into background, model and an HTML text layer is the right layered approach. The calm beige/wood setting suits a product post.

**Top 3 fixes:** attach the real frame photo and ask before any Codex run; remove the painted "SALE 50%" and the artist name; set the headline in #212121 or #123A29 at 72 px margin with the store line art and logo.
