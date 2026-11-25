# Thai Typography for Image Work

Thai text is **never** drawn by the image model. Plates are generated text-free; every Thai glyph, price and logo is
set in the HTML layer (`npm run render`) and proofread on the render. Sources: research/R3_design_type_story.md (keys in
RESEARCH_SOURCES.md). Tags: [key] research/spec · [craft] practice.

## Quick setup (CSS)
```css
.th { font-family: 'Prompt', 'Noto Sans Thai', sans-serif; line-height: 1.5; }        /* body / captions */
.th-head { font-family: 'Prompt', 'Noto Sans Thai', sans-serif; font-weight: 700; line-height: 1.3; }
.th-bubble { font-family: 'Sriracha', 'Itim', cursive; line-height: 1.35; padding: .35em .6em; overflow: visible; }
.no-break { white-space: nowrap; }      /* brand names, prices, ๆ with its word */
```
`<p class="th" lang="th">…</p>` — set `lang="th"`; break headlines yourself (`<br>` or one span per line).
Brand fonts for Latin: Archivo (display), Inter (body) — pair with Prompt/Noto Sans Thai, scale the Thai span 1.05–1.15× until heights match (rule 19).

## Workflow
1. Write the copy; a native reader checks spelling (ค่ะ/คะ, การันต์, ๆ).
2. Choose face by job (rule 12–15), size by format (rule 16), line-height (rule 3).
3. Place text in the planned calm zone / safe zone (GRAPHIC_DESIGN.md), check contrast ≥ 4.5:1 (`tools/color_tools.py contrast`).
4. Render, then proofread the **render** with the checklist (rule 25) at phone size.

## Rules

Tags: [source key] = backed by an entry above. [craft] = Artistic practice and house judgement, not research.

1. **Never let the image model draw Thai.** Generate text-free plates and set every Thai glyph in the HTML/Chrome layer. Subword text encoders can't spell reliably, and Thai's stacked marks and rare training data make it worse. [Liu2023, inference for Thai]
2. **Budget vertical space for four above-levels and two below-levels.** A syllable can carry vowel + tone + karan above (e.g. ปั๊ม, ที่, ศักดิ์) and ุ/ู below. Line height must clear the tallest stacks of the line above and the deepest stacks of the line below. [MS-ThaiOpenType, W3C-ThaiLreq2026]
3. **Line-height defaults:** Thai body/caption copy 1.5–1.7, Thai headlines 1.25–1.4. Never below about 1.2 for Thai, even in tight display type. Latin-only headlines can go to about 1.0–1.1. Start from 1.5 (the WCAG robustness floor), then tune per font. [W3C-WCAG21-1.4.12 as floor; values are craft]
4. **Different Thai fonts have different built-in metrics** (Google targets about 130% UPM, more for tall scripts). The same `line-height` number looks different in Mitr and Noto Sans Thai, so judge by eye on the render. [GoogleFonts-Metrics]
5. **Check for clipping** at the top of the first line and the bottom of the last line: tone marks above ป ฝ ฟ and tails of ฎ ฏ. Keep `overflow` visible and add padding inside text boxes, pills and speech bubbles. [GoogleFonts-Metrics, MS-ThaiOpenType]
6. **A dotted circle ◌ in a render means invalid mark order or a wrong font.** It is a stop-ship error. [MS-ThaiOpenType]
7. **Type marks in Unicode order:** consonant → above/below vowel → tone mark. Pre-base vowels (เ แ โ ใ ไ) are typed first. Wrong order gives floating or misplaced marks that look "almost right". [Unicode18-Ch16, Ishida-ThaiOrthography]
8. **Thai has no spaces between words; spaces separate phrases.** Don't add a space between every word for "readability", because that is a different, wrong orthography. [Unicode18-Ch16, W3C-ThaiLreq2026]
9. **Control line breaks yourself in headlines.** Chrome breaks Thai with an ICU dictionary that can split names, brand words and loanwords. Set headlines line by line (`<br>` or separate spans), or insert U+200B where a break is allowed and U+2060 or `white-space: nowrap` where it isn't. [ICU-BoundaryAnalysis, Ishida-ThaiOrthography]
10. **No orphaned single syllable or lone ๆ on a line.** Keep ๆ attached to its word (it must never wrap alone). Avoid a last line with one short word: rebalance, or use `text-wrap: balance` and check the result. [Ishida-ThaiOrthography; orphan rule is craft]
11. **Keep ฯ with its word** (กรุงเทพฯ) and follow it with a space. ฯลฯ means "etc.". [Ishida-ThaiOrthography]
12. **Choose looped or loopless by context.** Looped type for longer reading, information-dense or formal and older-audience text: all age groups rated it more legible there. Loopless for short display headlines, a modern or young tone, and small UI-like labels, where younger readers did better. [MangasAfonso2025, Typotheque2025]
13. **Loopless risk: confusable glyphs** (ก/ถ/ภ, บ/ป, ข/ช, ฎ/ฏ) in very short texts, single words and prices. For one-word signs or names in a loopless font, enlarge and test, or switch to a looped face. [GoogleFonts-ThaiFamilies]
14. **Wider, open letterforms survive blur and distance better.** For Reels text read at a glance, prefer wide-proportioned faces (Mitr, Prompt, Kanit) over condensed ones. [Punsongserm2017, Punsongserm2025; family choice is craft]
15. **Project font map:** Prompt/Kanit = clean, modern promo headlines. Mitr = friendly, rounded casual posters. Noto Sans Thai = neutral UI and body text, and the safest fallback. Sriracha = informal loopless handwriting (speech bubbles). Itim = informal looped handwriting (warm notes). Mali = childlike handwriting (story carousels). All are OFL. [GoogleFonts-ThaiFamilies; mapping is craft]
16. **Minimum sizes on mobile.** On a 1080-px-wide canvas, Thai body text should be at least about 36–40 px, Thai headlines 64 px or more, and fine print never below about 28 px. Thai needs roughly 10–15% more size than Latin at the same apparent weight, because its x-height-bound letters and marks are smaller. [craft — no Thai mobile standard found]
17. **Never stretch, squash or fake-bold Thai.** Scaling distorts the thick/thin stroke logic and mark positions that the foundry tuned. Use a real weight (Prompt and Kanit ship 9 weights) and never add `-webkit-text-stroke` to fatten. [GoogleFonts-ThaiFamilies mark-position note; rule is craft]
18. **Don't letter-space Thai body text.** Tracking breaks clusters visually and pulls marks away from their bases. Small positive tracking is fine on Latin caps (e.g. the spaced TIME OPTIC wordmark). [craft; Unicode18-Ch16 notes ZWSP is ignored in letter spacing]
19. **Thai + Latin pairing:** match by the visual height of Thai body letters versus the Latin x-height, then stroke weight, then terminals (rounded with rounded, flat with flat). Prefer families designed as Thai + Latin pairs (Prompt, Kanit, Mitr, Noto Sans Thai + Noto Sans) over mixing Inter with an unrelated Thai face. If you mix, scale the Thai span (`font-size` about 1.05–1.15×) until the heights look equal. [craft; pairing intent noted in GoogleFonts-ThaiFamilies (Prompt Latin "developed to work harmoniously")]
20. **Set `lang="th"`** on Thai elements so the browser picks Thai line breaking and the right font fallback, and declare the Thai font first in the stack for Thai spans. [ICU-BoundaryAnalysis; implementation craft]
21. **Use OFL fonts for anything published.** The original SIPA licence text was not verified, so use the Google Fonts OFL revisions (Sarabun, K2D, Mali, Chakra Petch…). [GoogleFonts-ThaiFamilies, NationalFonts-SIPA]
22. **9:16 safe zone:** keep all Thai text, prices and logos out of the bottom 35% (Meta). As house margins, also keep about 14% at the top and about 6% at the sides clear (third-party figures, unconfirmed). For TikTok, overlay the official safe-zone template, which varies with caption length. [Meta-ReelsAds, TikTok-InFeedSpecs; top/side values craft]
23. **4:5 / 1:1 feed:** design at 1080×1350 (or 1440×1800 for ads) and keep text inside about 1:1 centre margins, because grid previews crop 4:5 posts. [Meta-AdsGuide-IGFeed; crop margin is craft]
24. **Contrast:** Thai strokes are thinner than Latin caps at the same size. Put Thai text on calm, low-detail areas or a scrim (use the WCAG 4.5:1 target for small text). [W3C_WCAG21; Thai stroke note craft]
25. **Proofreading checklist before export** (read the render, not the source):
    - สระ: pre-base vowels on the correct side; sara am (ำ) intact; above/below vowels not colliding.
    - วรรณยุกต์: correct tone mark (่ ้ ๊ ๋) on the right consonant, sitting above the vowel when there is one, not floating or clipped.
    - การันต์ (์): present on loanwords and names (คอนแทคเลนส์, ฟิล์ม, เลนส์), placed above the silent letter.
    - ๆ and ฯ: spacing correct, not wrapped alone.
    - No ◌ dotted circles, tofu boxes □ or Latin-fallback glyphs.
    - Line breaks fall between words; no split names or brand words; no single-syllable orphan line.
    - Numbers, prices and dates: consistent Arabic or Thai digits throughout the piece.
    - Spelling checked by a native reader for any public promo. [MS-ThaiOpenType, Ishida-ThaiOrthography; checklist is craft]
