# R4 — Image generation, evaluation, art-history/style sources

Scope: generative models, prompting research, automatic evaluation, art-history/style glossaries, copyright.
All pages accessed **2026-11-24**. "Accessed" says exactly what was opened. Brief keys checked: Ho2020, Rombach2022,
Zhang2023, Talebi2018 (all verified, minor corrections noted under each).

Evidence types: `paper-abstract` (arXiv/publisher abstract page only), `paper-full` (full text read via PDF),
`vendor-doc` (model card / official docs: documented facts, vendor claims flagged), `museum-glossary`,
`gov-report`, `journalism/review`, `code-repo`. `Artistic` = craft, not evidence.

Counts: **62 verified** sources below (33 papers/docs/reports/repos + 29 museum/glossary/cultural/review pages),
**1 metadata-only** (Murray2012), **7 pages unreachable** (listed at the end, not cited).

---

## A. Generative models

### Ho2020
- Ho, J., Jain, A., Abbeel, P. (2020). *Denoising Diffusion Probabilistic Models*. arXiv:2006.11239 (cs.LG). The arXiv
  page names no venue (widely cited as NeurIPS 2020, but that was not confirmed on the page opened).
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) diffusion models = latent-variable models trained on a weighted variational bound linked to denoising
  score matching / Langevin dynamics; (2) reported CIFAR-10 FID 3.17, IS 9.46; LSUN 256² quality similar to ProgressiveGAN.
- Use: background only — explains why generation is iterative denoising from noise and why the seed changes the picture.
- Limits: unconditional, low-resolution; says nothing about prompting.

### Rombach2022
- Rombach, R., Blattmann, A., Lorenz, D., Esser, P., Ommer, B. (2022). *High-Resolution Image Synthesis with Latent
  Diffusion Models*. CVPR 2022 (per arXiv comments). arXiv:2112.10752.
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) diffusion runs in the latent space of a pretrained autoencoder → far cheaper than pixel space; (2)
  cross-attention lets text / boxes condition the model; (3) strong at inpainting, super-resolution.
- Use: explains img2img/`--denoise` (noise is added to the *latent* of the init image) and why fine pixel detail such
  as tiny text or thin frame temples can be lost through the autoencoder (inference, not stated in abstract).
- Limits: Stable Diffusion family, not FLUX; abstract only.

### HoSalimans2022
- Ho, J., Salimans, T. (2022). *Classifier-Free Diffusion Guidance*. arXiv:2207.12598; short version NeurIPS 2021
  Workshop on Deep Generative Models.
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) jointly train conditional + unconditional model and combine their estimates; (2) the guidance weight
  trades sample quality/fidelity against diversity, like classifier guidance.
- Use: the guidance scale is a fidelity↔diversity dial. With scale 1 the combination reduces to the conditional
  prediction alone, so there is no unconditional/negative branch to push away from (this follows from the method's
  formulation; the abstract states no formula).
- Limits: abstract gives no numbers.

### Zhang2023
- Zhang, L., Rao, A., Agrawala, M. (2023). *Adding Conditional Control to Text-to-Image Diffusion Models* (ControlNet).
  arXiv:2302.05543 (v3 Nov 2023). The arXiv page lists no venue; ICCV 2023 per brief — **not confirmed on the page opened**.
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) frozen base model + trainable copy joined by zero-initialised "zero convolutions"; (2) conditions:
  edges, depth, segmentation, human pose, etc., single or multiple, with or without text; (3) trains on <50k or >1M pairs.
- Use: layout control (pose, depth, edges) is a model *add-on*, not something a prompt can force. Our local setup has
  no ControlNet for FLUX schnell; the BFL Canny/Depth [dev] models are non-commercial (see BFL-FluxRepo).
- Limits: tested on Stable Diffusion.

### Ye2023
- Ye, H., Zhang, J., Liu, S., Han, X., Yang, W. (2023). *IP-Adapter: Text Compatible Image Prompt Adapter for
  Text-to-Image Diffusion Models*. arXiv:2308.06721.
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) 22M-parameter adapter adds an *image prompt*; (2) decoupled cross-attention for text vs image
  features; (3) base model frozen; works with models fine-tuned from the same base and with "existing controllable
  tools" (ControlNet not named on the page).
- Use: "attach a reference image" ≠ copying it; image prompts steer style/subject. Codex `-i` is a different,
  proprietary mechanism (see OpenAI-ImageGen).
- Limits: abstract only.

### Ruiz2023
- Ruiz, N., Li, Y., Jampani, V., Pritch, Y., Rubinstein, M., Aberman, K. (2023). *DreamBooth: Fine Tuning
  Text-to-Image Diffusion Models for Subject-Driven Generation*. CVPR 2023. arXiv:2208.12242.
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) "just a few images" of a subject; (2) binds a unique identifier to the subject; (3) class-specific prior
  preservation loss keeps the class prior so the subject appears in new poses/views/lighting.
- Use: the only research-backed way to make a model draw *our exact frame* repeatedly is fine-tuning (DreamBooth/LoRA)
  or reference-image editing — prompt words alone will not reproduce a specific product.
- Limits: abstract only; fine-tuning not set up in this project.

### Hu2021
- Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., Chen, W. (2021). *LoRA: Low-Rank
  Adaptation of Large Language Models*. arXiv:2106.09685 (cs.CL).
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) frozen weights + trainable low-rank matrices; (2) up to ~10,000× fewer trainable params and ~3× less
  memory vs full GPT-3 fine-tuning; (3) no added inference latency.
- Use: LoRA was introduced for language models; its use for image models is community practice (not in this paper).
- Limits: LLM paper; image application not evidenced here.

### Podell2023
- Podell, D. et al. (2023). *SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis*.
  arXiv:2307.01952 (no venue listed).
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) ~3× larger UNet, second text encoder; (2) trained on multiple aspect ratios; (3) separate refiner
  (img2img pass) improves fidelity.
- Use: precedent for "generate, then low-denoise refine" two-pass workflows (our `--init --denoise`).
- Limits: SDXL-specific.

### Esser2024
- Esser, P. et al. (2024). *Scaling Rectified Flow Transformers for High-Resolution Image Synthesis* (Stable Diffusion 3).
  arXiv:2403.03206 (no venue on page).
- Evidence: paper-abstract. Accessed: arXiv abstract page.
- Points: (1) rectified flow connects data and noise in a straight line; (2) MMDiT: separate weights for image and
  text tokens with bidirectional flow → reported gains in text comprehension, typography, human preference;
  (3) predictable scaling.
- Use: background for why FLUX-class (flow-matching transformer) models follow sentence-style prompts better than
  older CLIP-only models. Typography gains ≠ reliable text: we still keep text in HTML.
- Limits: SD3, not FLUX; vendor-authored.

### BFL-FluxSchnellCard
- Black Forest Labs. *FLUX.1 [schnell]* model card, Hugging Face, https://huggingface.co/black-forest-labs/FLUX.1-schnell
- Evidence: vendor-doc. Accessed: model card page.
- Points: (1) 12B-parameter rectified flow transformer; (2) trained with **latent adversarial diffusion distillation**,
  1–4 steps; (3) **Apache-2.0** (personal, scientific, commercial); (4) listed limitations: not factual, may amplify
  societal biases, may not match the prompt, "prompt following is heavily influenced by the prompting-style";
  (5) example: `guidance_scale=0.0`, `num_inference_steps=4`, `max_sequence_length=256`.
- Use: the authoritative facts for our local model; out-of-scope list (no deceptive/harmful content, no PII).
- Limits: vendor document; quality claims not independently tested.

### HF-DiffusersFlux
- Hugging Face. *Flux* pipeline docs (Diffusers), https://huggingface.co/docs/diffusers/main/en/api/pipelines/flux
- Evidence: vendor-doc. Accessed: first ~100k characters of the page.
- Points: (1) schnell = **timestep-distilled**, dev = **guidance-distilled**; (2) schnell: `guidance_scale` "needs to be
  0", `max_sequence_length` "cannot be more than 256", ~4 steps; dev ~50 steps, guidance 3.5; (3) `negative_prompt` is
  ignored unless `true_cfg_scale > 1` (true CFG); page does not say schnell supports true CFG.
- Use: negative prompts do nothing in our setup (ComfyUI `cfg: 1.0` in `tools/flux.py` — project code observation);
  prompts beyond the 256-token T5 limit are truncated in Diffusers.
- Limits: Diffusers ≠ ComfyUI implementation; behaviour in ComfyUI inferred, not documented here.

### BFL-FluxRepo
- Black Forest Labs. *flux* GitHub repository, https://github.com/black-forest-labs/flux
- Evidence: code-repo / vendor-doc. Accessed: README.
- Points: (1) schnell Apache-2.0; dev, Fill, Canny, Depth, Redux, Kontext, Krea [dev] under FLUX.1-dev
  **Non-Commercial** licence; (2) autoencoder Apache-2.0; (3) commercial use of open-weight dev models needs a BFL licence.
- Use: for shop (commercial) content only schnell is cleanly licensed among local FLUX models.
- Limits: licence terms can change; re-check before adding a model.

### BFL-Launch2024
- Black Forest Labs (1 Aug 2024). *Announcing Black Forest Labs* (FLUX.1 launch), https://bfl.ai/announcements/24-08-01-bfl
- Evidence: vendor-doc (launch post). Accessed: page.
- Points: (1) hybrid multimodal + parallel diffusion transformer, 12B, flow matching; (2) aspect ratios / resolutions
  0.1–2.0 MP; (3) dev is guidance-distilled from pro; schnell is the few-step Apache-2.0 model.
- Use: keep generations within ~0.1–2 MP (1024² ≈ 1 MP is safe; also fits 6 GB VRAM).
- Limits: benchmark comparisons are vendor claims.

### OpenAI-ImageGen
- OpenAI. *Image generation* guide, https://developers.openai.com/api/docs/guides/image-generation (redirected from
  platform.openai.com).
- Evidence: vendor-doc. Accessed: full page (two reads).
- Points (as documented on 2026-11-24; model line-up has changed since gpt-image-1): (1) current models named
  `gpt-image-2.5-sunburst` (edit precision) and `gpt-image-2.5-flare` (fast), GPT-Image-2.6 variants; older `gpt-image-2`
  mentioned; (2) recommended sizes 1024×1024, 1536×1024, 1024×1536; custom sizes multiples of 16, aspect 1:3–3:1, edge
  ≤3840, 655,360–8,294,400 px; (3) quality low/medium/high/xhigh/max/auto; png/jpeg/webp, transparent background with
  png/webp; (4) edits can combine several reference images (example uses four); masks are prompt-guided and "may not
  follow its exact shape with complete precision"; (5) documented limitations: latency up to ~2 min, text rendering
  "can still struggle with precise text placement and clarity", recurring characters/brand elements may not stay
  consistent, layout-sensitive composition hard to control; (6) Responses API may auto-revise prompts (`revised_prompt`).
- Use: Codex CLI uses OpenAI image models but which model/size Codex picks is **not documented here** — don't assume API
  parameters apply to `codex exec`. The documented limits justify: text in HTML layer, verify frame shape against photo.
- Limits: API doc, not Codex CLI doc; fast-changing page.

## B. Prompting research and known limitations

### LiuChilton2022
- Liu, V., Chilton, L. B. (2022). *Design Guidelines for Prompt Engineering Text-to-Image Generative Models*. CHI '22,
  New Orleans, Article 384, doi:10.1145/3491102.3501825. arXiv:2109.06977.
- Evidence: paper-full (PDF text read). Model studied: **VQGAN+CLIP** (256², 300 steps).
- Points: (1) Exp. 1, nine rephrasings of the same keywords: **no significant difference** (χ² p=0.55) → "focus on
  subject and style keywords instead of connecting words"; (2) Exp. 2: seed choice **significantly** changes quality →
  "generate between 3 to 9 different seeds"; (3) styles: "feel free to try any styles"; pick subjects that match the
  style in abstractness; 5,493 generations, 51 subjects × 51 styles.
- Use: batch 3–9 seeds before rewriting a prompt; spend words on content, not glue words.
- Limits: old CLIP-guided model; word-order findings may not transfer to T5/transformer models like FLUX.

### Oppenlaender2023
- Oppenlaender, J. (2022/2023). *A Taxonomy of Prompt Modifiers for Text-To-Image Generation*. arXiv:2204.13988 (v3
  June 2023); journal version exists (DOI shown on page, journal not named there; it is listed by others as Behaviour &
  Information Technology — **not confirmed**).
- Evidence: paper-full (PDF text read); 3-month ethnographic study of online communities.
- Points: six modifier types — **subject terms, style modifiers, image prompts, quality boosters** ("trending on
  artstation", "8k"…), **repeating terms**, **magic terms**; weights/negative weights in VQGAN-CLIP; author notes some
  practitioner choices "may fall into the realm of folk theories".
- Use: a vocabulary for prompt anatomy. Quality boosters and artist-name modifiers are *community practice*, not tested
  effects — and artist names conflict with our no-living-artist rule.
- Limits: descriptive, not experimental; 2022 tools.

### Huang2023
- Huang, K., Duan, C., Sun, K., Xie, E., Li, Z., Liu, X. *T2I-CompBench++* (journal version of T2I-CompBench, NeurIPS
  2023 conference paper — conference listing not opened). arXiv:2307.06350 (v3 Mar 2025).
- Evidence: paper-abstract.
- Points: (1) 8,000 compositional prompts in 4 groups: attribute binding, object relationships (incl. 3D-spatial),
  generative numeracy, complex compositions; (2) benchmarks 11 models incl. FLUX.1, SD3, DALL·E 3, SDXL;
  (3) detection-based metrics plus MLLM evaluation, with discussion of MLLM-judge limits.
- Use: colour-to-object binding, counts and left/right placement are named weak points → put exact counts/positions in
  layout (HTML/compositing) and check outputs.
- Limits: abstract gives no per-model scores.

### Cho2023
- Cho, J., Zala, A., Bansal, M. *DALL-Eval: Probing the Reasoning Skills and Social Biases of Text-to-Image Generation
  Models*. ICCV 2023 (per arXiv comments). arXiv:2202.04053.
- Evidence: paper-abstract.
- Points: (1) PaintSkills: object recognition, counting, spatial relations; (2) models "far below" upper-bound accuracy
  on counting and spatial relations; (3) gender and skin-tone biases learned from web image–text pairs.
- Use: same as Huang2023; also a check for people in promo scenes.
- Limits: 2022-era models.

### Bianchi2023
- Bianchi, F. et al. *Easily Accessible Text-to-Image Generation Amplifies Demographic Stereotypes at Large Scale*.
  FAccT 2023. arXiv:2211.03759.
- Evidence: paper-abstract.
- Points: (1) neutral prompts (traits, occupations, objects) yield stereotypes; (2) whiteness as default, American
  norms for objects; (3) "Stereotypes persist despite mitigation strategies" incl. counter-stereotype prompting.
- Use: for a Thai shop, specify people explicitly (age, Thai setting, varied) and review casts; don't trust defaults.
- Limits: models tested (Stable Diffusion, DALL·E) predate FLUX.

## C. Evaluation

### Talebi2018
- Talebi, H., Milanfar, P. (2018). *NIMA: Neural Image Assessment*. IEEE Trans. Image Processing 27(8),
  doi:10.1109/TIP.2018.2831899. arXiv:1709.05424.
- Evidence: paper-full (PDF text).
- Points: (1) predicts the **distribution** of human ratings, not just a mean (EMD loss); (2) no-reference;
  (3) trained/evaluated on AVA (aesthetics), TID2013 and LIVE (technical quality); AVA ≈255k images, ~200 raters each,
  mean score 5.5, mean SD 1.43, from dpchallenge photo contests.
- Use: a score's spread matters; aesthetic models learned *amateur-photo-contest* taste.
- Limits: photography taste, not illustration, branding or Thai audiences.

### Murray2012
- Murray, N., Marchesotti, L., Perronnin, F. (2012). *AVA: A large-scale database for aesthetic visual analysis*.
  CVPR 2012, pp. 2408–2415, doi:10.1109/CVPR.2012.6247954.
- Evidence: **metadata only** (Crossref record opened; IEEE page returned empty). Dataset description taken from
  Talebi2018 and LAION2022 (secondary).
- Use/limits: cite as the origin of AVA only; content not read.

### LAION2022
- Schuhmann, C. (with Beaumont, R.) (16 Aug 2022). *LAION-Aesthetics*, LAION blog, https://laion.ai/blog/laion-aesthetics/
- Evidence: vendor-doc/blog.
- Points: (1) linear model on CLIP ViT-L/14 embeddings predicting "How much do you like this image (1–10)"; (2) v2
  trained on SAC 176k, LAION-Logos 15k, AVA ~250k; (3) subsets by threshold (≥5: 600M; ≥6.5: 625k); CompVis used
  the 5+ subset for Stable Diffusion v1; (4) model choice was based on the authors' "subjective view".
- Use: many open models were *trained toward* this score — so it partly measures "looks like what the model already
  likes". No bias/limitations analysis given.
- Limits: blog, no peer review.

### LAION-AestheticRepo
- Schuhmann, C. *improved-aesthetic-predictor*, GitHub, https://github.com/christophschuhmann/improved-aesthetic-predictor
- Evidence: code-repo. Points: CLIP-embedding MLP/linear predictor; weights named sac+logos+ava, l14; Apache-2.0;
  score range and caveats not stated on the page.
- Use: could be run locally as a *sort* aid, never as a verdict.

### Hessel2021
- Hessel, J., Holtzman, A., Forbes, M., Le Bras, R., Choi, Y. (2021). *CLIPScore: A Reference-free Evaluation Metric for
  Image Captioning*. EMNLP 2021. arXiv:2104.08718.
- Evidence: paper-abstract.
- Points: (1) CLIP image–text compatibility without references; (2) highest correlation with human caption judgements
  in their tests; (3) weaker where rich context is needed (news captions).
- Use: CLIP-type scores measure "does the image match the words", not beauty or brand fit.
- Limits: designed for captions, applied to T2I by later work.

### Heusel2017
- Heusel, M., Ramsauer, H., Unterthiner, T., Nessler, B., Hochreiter, S. (2017). *GANs Trained by a Two Time-Scale Update
  Rule Converge to a Local Nash Equilibrium*. NIPS 2017. arXiv:1706.08500.
- Evidence: paper-abstract. Points: introduces FID; claims it tracks similarity to real images better than IS.
- Use: FID compares *distributions of many images*; meaningless for judging one post.

### Kynkaanniemi2023
- Kynkäänniemi, T., Karras, T., Aittala, M., Aila, T., Lehtinen, J. *The Role of ImageNet Classes in Fréchet Inception
  Distance*. ICLR 2023. arXiv:2203.06026.
- Evidence: paper-abstract.
- Points: FID features are so ImageNet-class-bound that matching class histograms lowers FID without better images;
  FID "sometimes disagrees with human judgement".
- Use: evidence that a metric can be gamed.

### Jayasumana2024
- Jayasumana, S. et al. *Rethinking FID: Towards a Better Evaluation Metric for Image Generation*. arXiv:2401.09603.
- Evidence: paper-abstract.
- Points: FID's Inception features poorly represent T2I content, wrong normality assumption, sample-size dependence,
  "contradicts human raters"; proposes CMMD (CLIP embeddings + MMD).
- Limits: preprint (CVPR 2024 publication not confirmed on page).

### Xu2023
- Xu, J. et al. *ImageReward: Learning and Evaluating Human Preferences for Text-to-Image Generation*. arXiv:2304.05977.
- Evidence: paper-abstract. Points: 137k expert comparisons; outperforms "existing scoring models and metrics" in their
  human eval; ReFL tunes diffusion models against the reward.
- Limits: annotator pool/guidelines not on page; venue (NeurIPS 2023 commonly cited) not confirmed on page.

### Wu2023
- Wu, X. et al. *Human Preference Score v2*. arXiv:2306.09341.
- Evidence: paper-abstract. Points: HPD v2 = 798,090 choices over 433,760 pairs; CLIP fine-tuned → HPS v2; prompts
  collected "to eliminate potential bias".
- Limits: preference of their annotators on general prompts.

### Kirstain2023
- Kirstain, Y. et al. *Pick-a-Pic: An Open Dataset of User Preferences for Text-to-Image Generation*. arXiv:2305.01569.
- Evidence: paper-abstract. Points: preferences collected from real users of a web app; PickScore (CLIP-based)
  correlates better with human rankings than other metrics; usable for reranking outputs.
- Limits: size and NeurIPS venue not on page; users self-selected (tech-savvy early adopters — inference).

## D. Art history / style sources (museum glossaries)

All Tate pages are `https://www.tate.org.uk/art/art-terms/<letter>/<term>`; evidence: museum-glossary; accessed: page.
They describe **movement characteristics** (usable as prompt vocabulary) — never a licence to copy a named artwork.

### Tate-Impressionism
- Painted outdoors, quickly, from the scene; "momentary and transient effects of sunlight"; quick fragmented brushwork;
  landscapes and everyday life. → `impressionism`.

### Tate-PostImpressionism
- From c.1886 (term by Roger Fry, 1910); Cézanne's structured nature, Seurat's scientific colour, Van Gogh/Gauguin's
  emotional colour and brushwork. → `post_impressionism`.

### Tate-NeoImpressionism
- Tiny adjacent dabs of pure colour mixing optically (term "pointillism" rejected by Signac); based on Chevreul's 1839
  colour-contrast theory; optical mixing reads more luminous. → `pointillism`.

### Tate-ArtNouveau
- 1890s–WWI; sinuous lines, flowing plant-based organic shapes; sometimes curves inside rigid geometry. → `art_nouveau`.

### Tate-ArtDeco
- 1920s–30s (name from 1925 Paris exhibition); fragmented geometric character influenced by cubism; Egyptian/Aztec
  motifs; streamlined lines of ships, trains, cars. → `art_deco`.

### Tate-Baroque
- Dominant 17th-c. style, peak Rome c.1630–80; dynamic movement, bold realism, direct emotional appeal. → `baroque_dramatic`.

### Tate-Renaissance
- Begins Italy c.1400, revival of classical art; High Renaissance c.1500–30. Page does **not** discuss perspective —
  don't cite it for that. → `renaissance_realism`.

### Tate-Romanticism
- c.1780–1830; emotion over classical restraint; new responses to nature (Constable, Turner); personal feeling. Page
  does not mention "sublime". → `romanticism_landscape`.

### Tate-Expressionism
- Early 20th c. Germany (Die Brücke, Der Blaue Reiter); intense non-naturalistic colour, distorted forms, loose thick
  paint, inner feeling. → `expressionism`.

### Tate-Fauvism
- c.1905–1910; intense colour often straight from the tube, loose dabs, flattened forms. → `fauvism`.

### Tate-Cubism
- Analytical c.1908–12 (subdued earthy tones, fragmented planes, multiple viewpoints); synthetic c.1912–14 (simpler
  shapes, brighter colour, collage). → `cubism`.

### Tate-Surrealism
- Breton's 1924 manifesto, "pure psychic automatism"; dreams and the unconscious. → `surrealism`.

### Tate-Constructivism
- Russia c.1915–1920s; art reflecting industrial modernity; abstract, industrial materials. → `constructivism`.

### Tate-Bauhaus
- School 1919 Weimar → Dessau 1925 → Berlin 1932, closed 1933; equal weight to design, architecture, crafts and fine
  art. (Page is about the school, not a visual recipe.) → `bauhaus_modernist`.

### Tate-AbstractExpressionism
- 1940s–50s New York; action painting (gestural, poured paint) vs colour field (large single-colour areas,
  contemplative). → `abstract_expressionism`.

### Tate-PopArt
- Mid-1950s UK / late-1950s US, peak 1960s; imagery from ads, packaging, comics, film; hard edges, impersonal. →
  `pop_art`, `vintage_comic_halftone` (context).

### Tate-OpArt
- 1960s; purely geometric forms; based on colour theory and perception; effects from subtle to disorienting. → `op_art`.

### Tate-Minimalism
- Late 1950s–1970s US; plain geometry (squares, oblongs); the object is the reality ("What you see is what you see"). →
  `minimalism`.

### Tate-Woodcut
- Relief print carved along the grain; carved-away areas print blank; ukiyo-e printed by hand pressure. →
  `woodcut_print`, `ukiyo_e_woodblock`.

### Tate-Screenprint
- Stencil through stretched mesh, squeegee; photo-stencils; commercial 1920s, artists 1930s, widespread 1950s+. →
  `screenprint_poster`.

### Tate-Collage
- Paper, photos, fabric, found materials fixed to a support; from *papiers collés*, early 20th c. → `collage_mixed_media`.

### Tate-Impasto
- Paint thick enough to stand out from the surface; Titian/Tintoretto origin; visible strokes. → `oil_impasto`.

### Tate-Gouache
- Water-soluble, **opaque** (paper white doesn't show), more binder + chalk-like fillers. Page does not say "matte". →
  `gouache_flat`, `storybook_gouache`.

### NG-Chiaroscuro
- National Gallery glossary, https://www.nationalgallery.org.uk/paintings/glossary/chiaroscuro — "light-dark"; strong
  tonal contrast to model volume; Leonardo for three-dimensionality, Caravaggio for drama. → lighting `chiaroscuro`,
  `tenebrism`, style `baroque_dramatic`.

### NG-Sfumato
- National Gallery glossary, .../glossary/sfumato — soft edges, gradual tonal transitions, no sharp outlines, figures
  emerging from shadow (Leonardo, Giorgione). → `renaissance_realism`, soft portrait lighting.

### VA-Ukiyoe
- Victoria and Albert Museum, *Japanese woodblock prints (ukiyo-e)*, https://www.vam.ac.uk/articles/japanese-woodblock-prints-ukiyo-e
- Evidence: museum page. Points: "pictures of the floating world"; Edo period 1615–1868; full-colour *nishiki-e*
  perfected 1765; publisher–designer–block cutter–printer; subjects: kabuki actors, beauties, landscapes, legends.
  → `ukiyo_e_woodblock` (describe flat colour areas, keyblock outlines, landscape/genre subjects; no copying of named prints).

### ThaiEmbassy-Murals
- Royal Thai Embassy Seoul (republishing thailandnow.in.th, 18 Sep 2023), *Take a Closer Look at Siamese Buddhist Murals*,
  https://seoul.thaiembassy.org/en/content/take-a-closer-look-at-siamese-buddhist-murals
- Evidence: government cultural page (no named author). Points: Jataka scenes at eye level between windows, clockwise;
  scenes divided by zigzag *sinthao* lines; upper registers of Buddhas/angels; everyday genre inserts (*phap kaak*);
  subjects Jataka, Traiphum, Ramakien. → `thai_traditional_mural`.
- Limits: popular article; no claims about flat colour / perspective / gold on this page.

### Charoenkijkajorn2025
- Charoenkijkajorn, P., Nakano, Y. (2025). *Oblique structure in Thai traditional mural painting during the early
  Rattanakosin period: a composition analysis*. Art and Architecture Journal, Naresuan University 16(1),
  doi:10.71185/ajnu.2025.270312.
- Evidence: paper-abstract. Points: oblique (diagonal) composition is a distinctive formal feature of early Rattanakosin
  murals. → `thai_traditional_mural` composition (diagonal/oblique arrangement).
- Limits: abstract only; specific findings not read.

### Apollo-Manga2019
- Martin, W. (4 Jun 2019). *Lost without words – Manga at the British Museum, reviewed*. Apollo, https://apollo-magazine.com/manga-british-museum/
- Evidence: journalism/review. Points: "manga" first meant 19th-c. woodblock sketch compilations (after Hokusai);
  Kawanabe Kyōsai's 1880 theatre curtain as precursor (bold inky outlines); modern manga postwar from Tezuka Osamu;
  pacing/landscape storytelling examples.
- Use: history context for `manga_bw_screentone`, `anime_cel`. Screentone technique not covered — no verified source here.

## E. Copyright / ethics

### USCO-AI
- U.S. Copyright Office, *Copyright and Artificial Intelligence* hub, https://www.copyright.gov/ai/ — lists 2023 guidance;
  Report Part 1 Digital Replicas (31 Jul 2024), Part 2 Copyrightability (29 Jan 2025), Part 3 Generative AI Training
  (pre-publication 9 May 2025). Evidence: gov page.

### USCO2023
- U.S. Copyright Office (2023). *Copyright Registration Guidance: Works Containing Material Generated by Artificial
  Intelligence*, 88 Fed. Reg. 16,190 (16 Mar 2023). PDF https://www.copyright.gov/ai/ai_policy_guidance.pdf
- Evidence: gov-report, full text read (Federal Register site blocked; Office's PDF copy used).
- Points: (1) prompt-only outputs: "traditional elements of authorship" are executed by the technology → not
  registrable; (2) human selection/arrangement or modification can be protected; (3) applicants must disclose and
  exclude more-than-de-minimis AI content (cites Zarya of the Dawn decision).

### USCO2025-Part2
- U.S. Copyright Office (Jan 2025). *Copyright and Artificial Intelligence, Part 2: Copyrightability*. Full text read.
- Points: (1) "prompts alone do not provide sufficient human control to make users … the authors of the output";
  (2) human **expressive inputs** perceptible in the output (e.g. own drawing) are protected, plus selection/arrangement;
  (3) modification tools that control placement of elements may qualify case by case; (4) style-transfer of a photo
  "in the style of The Starry Night" (Suryast) was refused.
- Use: our real frame photos, HTML layout and typography are the human-authored, protectable layer; a raw AI background
  may not be. US law only — Thai law not researched here.

### USCO2025-Part3
- U.S. Copyright Office (May 2025, pre-publication). *Part 3: Generative AI Training*. Passage on p.65 read via text search.
- Points: AI outputs imitating a creator's style raise market-harm concerns, but style is something "copyright does not
  protect" (citing Part 1); stylistic imitation may still weigh in fair-use market analysis.
- Use: describe movements and techniques, not living artists → legally safer *and* our house rule.
- Limits: pre-publication; US; fair-use discussion is about training, not our prompts.

---

## Unverified / not accessed
- **Met Heilbrunn Timeline** essays (Impressionism, Art Nouveau, Art Deco, ukiyo-e): HTTP 429 on every attempt (WebFetch
  and curl) — not cited.
- **Smarthistory** (ukiyo-e beginner's guide; Wat Phra Kaew): HTTP 403.
- **MoMA art terms** (pop art): HTTP 403.
- **British Museum** Hiroshige woodblock blog: HTTP 403. **Library of Congress** comic-art exhibition: HTTP 403.
- **Tate tenebrism** page and **V&A** "introduction to Japanese woodblock prints" URL: HTTP 404 (V&A ukiyo-e article
  at another URL was used instead). Tenebrism has no own verified source; NG-Chiaroscuro covers the contrast idea.
- No verified source found in this pass for: prompt **length/word-order** effects on modern T5/flow models (only
  LiuChilton2022 on VQGAN+CLIP), **hands** failure rates, screentone/halftone technique, Persian miniature, Chinese
  gongbi, sumi-e, risograph, Thai-language mural sources (Silpa Bhirasri journal seen in search only).

---

## Synthesis for an AI art director (~20 bullets)

**FLUX.1 schnell prompting — facts vs folklore**
1. **Fact** [BFL-FluxSchnellCard, HF-DiffusersFlux]: schnell is timestep-distilled for 1–4 steps and run with guidance
   0 (Diffusers) / cfg 1.0 (our ComfyUI workflow). More steps than ~4–8 is not where quality comes from.
2. **Fact** [HF-DiffusersFlux, HoSalimans2022]: negative prompts need true CFG > 1; at cfg 1 the negative branch has no
   effect. *Folklore:* "add `ugly, blurry, extra fingers` to the negative". Instead describe what you **want**
   positively (e.g. "clean empty tabletop" rather than "no clutter").
3. **Fact** [HF-DiffusersFlux]: schnell's T5 prompt is capped at 256 tokens in Diffusers — keep prompts to a few
   descriptive sentences; put the most important content early (inference: truncation drops the end).
4. **Fact** [BFL-FluxSchnellCard]: "prompt following is heavily influenced by the prompting-style" — write plain natural
   language sentences (subject → setting → light → lens/medium → mood). *Folklore:* comma-stacked tag soup and
   "masterpiece, 8k, trending on artstation" quality boosters [Oppenlaender2023 documents them as community habit, untested].
5. **Fact** [LiuChilton2022, older model]: seeds change quality significantly; generate 3–9 seeds per prompt before
   rewriting. Glue-word rephrasing barely mattered.
6. **Fact** [Huang2023, Cho2023]: counting, attribute binding and spatial relations remain weak → never rely on the model
   for "exactly 3 frames, the green one on the left"; composite or lay out in HTML.
7. **Fact** [OpenAI-ImageGen, Esser2024]: text rendering improved but still unreliable → all text, logos and Thai
   typography stay in the HTML layer (house rule, now evidence-backed).
8. **Fact** [BFL-FluxRepo]: only schnell (+ VAE) is Apache-2.0 among local FLUX weights; dev/Kontext/Canny/Depth are
   non-commercial — don't add them for shop content without a licence.
9. **Fact** [BFL-Launch2024]: stay within 0.1–2.0 MP; generate near 1 MP at the target aspect and upscale/crop in
   the renderer.
10. **Artistic + Fact** [Ruiz2023, Zhang2023, Ye2023]: a specific real product cannot be reproduced from words; use the
    real cutout composited over a generated background, or Codex edits with the frame photo attached — then
    check the frame shape against the photo [OpenAI-ImageGen: masks/consistency are approximate].
11. **Fact** [Rombach2022, Podell2023]: low-denoise img2img (`--init --denoise 0.3–0.5`, Artistic range) refines texture while
    keeping layout; high denoise re-invents it.
12. **Fact** [Bianchi2023, BFL card]: defaults drift to stereotypes; specify people (Thai, ages, settings) and review.

**What automatic aesthetic scores can and cannot tell**
13. **Can** [Talebi2018, LAION2022]: roughly rank many images by "average liking" of photo-contest-style raters — useful
    to pre-sort a batch of seeds.
14. **Cannot** [LAION2022, Talebi2018]: judge brand fit, Thai audience taste, illustration/line-art styles, or message
    clarity — training data is amateur photography, logos and SAC generations, with no bias analysis published.
15. **Circularity** [LAION2022]: Stable Diffusion v1 was trained on images filtered by this very score, so high scores
    partly reward the generic "AI look" — inference from the documented filtering.
16. **CLIPScore / PickScore / HPS v2 / ImageReward** [Hessel2021, Kirstain2023, Wu2023, Xu2023] measure prompt match or
    general preference of their annotator pools; good for "which of 6 seeds follows the prompt", not for "is this our brand".
17. **FID is for model comparison, never single images** [Heusel2017]; it can be gamed and contradicts humans
    [Kynkaanniemi2023, Jayasumana2024].
18. **Rule** (Artistic): an automatic score is a sorting hint; the final call is a human/art-director checklist (subject
    readable at phone size, glasses stand out, palette on brand, no artefacts on frame/lens, text-free).

**Styles and rights**
19. **Fact** [Tate glossary set, NG, V&A, ThaiEmbassy-Murals]: describe styles by *movement traits* (e.g. Fauvism =
    intense unmixed colour, loose dabs, flattened forms; Thai mural = zigzag *sinthao* scene dividers, registers,
    oblique composition) rather than artist names — matches brief rules.
20. **Fact** [USCO2025-Part3]: style itself is not protected by US copyright, but imitating a living creator's style
    raises market-harm concerns → keep living artists out of prompts (house rule).
21. **Fact** [USCO2023, USCO2025-Part2]: prompt-only images are not registrable in the US; human expressive inputs
    (our frame photos, layout, typography, edits) are the protectable part — another reason the HTML layer carries
    the brand.
