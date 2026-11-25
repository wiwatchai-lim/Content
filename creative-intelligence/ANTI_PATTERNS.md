# Anti-Patterns (things that failed here, with the fix)

Each line: what went wrong · why · fix · where it was learned. Only real observations or sourced warnings.

## Image generation
- Naming the unwanted thing ("no lamp", "moonlight") makes FLUX draw it · text encoders attend to the noun · describe the light/effect, not the source · ai-visual-artist CHANGELOG 2026-11-24
- Lens/DoF words in a painted-style prompt → 3D photo look · photographic tokens pull style · drop them for non-photo styles (build_prompt does this) · same
- "abandoned house" with no cultural detail → Western cabin · model default bias · describe Thai features concretely (round pillars, curved gable horns, teak panels) · same
- img2img 0.55–0.6 cannot remove a moon or reshape a roof; cannot turn night into day · it keeps source lighting/layout · inpaint for removals, text-to-image for shape changes, generate day/night separately · CHANGELOG + LEARNING-LOG
- Changing only the light phrase with a fixed seed and calling it a lighting test · FLUX moved the camera ('from above' → flat-lay), restyled the product and ignored 'rim light' · change the variable outside the model (HTML layer, grade, crop) or start from the real photo · experiment VA-001
- Asking FLUX for a cartoon style by name only ('anime', 'webtoon', 'chibi') · the subject's default look wins; only concrete traits (outline weight, texture, b/w ink, proportions) change the style; colour words in the subject override 'black and white' · experiment C1-001
- Fake signs, signatures, watermark text from FLUX · training data · re-roll or cv2.inpaint · LEARNING-LOG 2026-11-21
- Product not the most salient thing (window wins) · bright/high-contrast regions attract attention · check analyze_image, darken competitors · golden glasses test
- Text baked into AI images · unfixable typos, no layers · house rule: text-free images, text in HTML

## Voice / audio
- Long acting/"ghost"/"intimate" style prompts to Gemini TTS → finishReason SAFETY · plain style + split the script · LEARNING-LOG
- Probing or retry loops on a daily 429 burn the Gemini quota · don't probe; one request with all lines; stop on PerDay · memory gemini-tts-sulafat
- Mixing TTS models inside one clip → inconsistent voice · one model per clip · same
- One narrator voice for all characters (EP01) → characters not distinct · character voice bible · ai-voice-director CHANGELOG
- Importing Western emotional exaggeration into Thai lines; word-level pitch rises in Thai break tones · EVIDENCE claims V007, V016

## Animation / editing
- Limbs same colour as shirt disappear · outline every limb · LEARNING-LOG
- Scene div left at opacity 0 renders black silently · explicit show/cut-in per scene · LEARNING-LOG
- Full white flash overlay washes out the frame · brighten the scene, white kiss ≤ 0.4 · LEARNING-LOG
- Guessed camera offsets · compute from the framed point and clamp · LEARNING-LOG
- `'abc'.includes('')` is true → lip-sync bug at string end · LEARNING-LOG 2026-11-24

## Knowledge / writing
- Fake or misattributed quotes (Buddha, Lao Tzu, Marcus Aurelius) · do-not-use list in knowledge/philosophy/README.md (40 quotes) · EVIDENCE P2-007
- Stating craft rules (rule of thirds, golden ratio, 60-30-10) as science · weak/no evidence · say "craft convention"
- Reading inner emotion from a face or voice alone · Jack2012 (checked), Barrett2019 · EVIDENCE P2-003
- Padding libraries to hit a number · low-quality duplicates mislead later jobs · targets are not quotas (directive part 6)
- Fear content with no action step (scary pterygium image, then end) → weaker effect than fear + efficacy message; extreme fear adds nothing over moderate fear (the old 'viewers flee' claim did not hold up in full-text: no average backfire) · EVIDENCE P2-001 (corrected 2026-11-25)
- Inventing Thai-audience facts: P2 found almost no Thai-sample studies; mark Thai claims as hypotheses to A/B test
- Health wording that overclaims: 'วิธีป้องกันง่าย ๆ' for sunglasses vs pterygium (UV clip 2026-11-05, cue 11) - no trial shows prevention · write 'ลดความเสี่ยง' + hat; add when to see an eye doctor · knowledge/optical/FACT_CHECK_WORKFLOW.md
- Quoting attention-span or 'Gen Z only watches X seconds' numbers · no research source (goldfish myth) · EVIDENCE T1-001, T1-005
