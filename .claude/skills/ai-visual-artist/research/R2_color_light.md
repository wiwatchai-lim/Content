# R2 — Colour and light: verified literature

Scope: colour science, colour harmony/psychology, accessibility, colour temperature, lighting (cinema, portrait, art
history), atmospheric optics, physically based rendering, material perception. Research date 2026-11-24.

**How to read the "Accessed" field** (honesty rules in `_BRIEF.md`):
- *full text*: I fetched and read the page or document (or the named part of it).
- *abstract*: I read the abstract or an abstract-level summary from an index (PubMed, Europe PMC, publisher, repository).
- *bibliographic only*: I confirmed that the work exists and its details from publisher, library or index records. I
  have not read it, and any finding attributed to it comes only from the record or from secondary descriptions.
- *secondary*: the claim comes from a third party describing the source.

**Counts:** 43 entries. 42 are verified as existing (10 read in full or in part, 15 from abstracts, 17 bibliographic
or secondary). 1 is unverified (the origin of the 60-30-10 rule).

Evidence tags: `Standard`, `Colour science`, `Perception science`, `Psychology`, `Graphics research`, `Physics`,
`Documented history`, `Artistic` (practitioner craft).

---

## A. Colour science and colour spaces

### Albers1963
- **Title:** Interaction of Color. **Author:** Josef Albers. **Year:** 1963. Yale University Press published it as a
  silkscreen portfolio with 150 plates. It came out in paperback in 1971, and the 50th Anniversary Edition appeared in
  2013 (ISBN 9780300179354, foreword by Nicholas Fox Weber).
- **URL:** https://search.worldcat.org/title/Interaction-of-color/oclc/840431606 ; https://news.yale.edu/2023/02/17/book-color-never-fades
- **Evidence type:** Artistic plus Documented history (a teaching method based on exercises).
- **Accessed:** bibliographic only (retailer and museum shop listings, WorldCat, Yale News snippet).
- **Findings (from listings and its well-documented reputation, not from reading it):** (1) The book teaches colour
  as *relative*: the same colour looks different on different grounds. It works through studies with coloured paper
  rather than theory. (2) The 2013 edition reproduces close to 60 colour studies.
- **Limitations:** I did not read the book. It is a pedagogy, not a quantitative model. For the quantitative side of
  the same effect, use Chevreul1839, Land1977 and Fairchild2013.

### Itten1961
- **Title:** Kunst der Farbe (Ravensburg, 1961); English *The Art of Color: The Subjective Experience and Objective
  Rationale of Color* (Reinhold/Wiley, 1961; Van Nostrand Reinhold 1973 ed., ISBN 0-442-24037-6). **Author:** Johannes Itten.
- **URL:** https://api.philpapers.org/rec/ITTTAO-2 ; https://www.librarything.com/work/106006
- **Evidence type:** Artistic plus Documented history (Bauhaus colour teaching).
- **Accessed:** bibliographic only, plus secondary summaries.
- **Findings (secondary):** Itten's **seven colour contrasts**: contrast of hue, light-dark, cold-warm, complementary,
  simultaneous, saturation, and extension (proportion). Secondary sources agree on this list. It is a useful checklist
  for naming *which* contrast carries an image.
- **Limitations:** I did not read the book. Its subjective "seasonal" colour types and its mystical framing have no
  empirical support. Use the seven contrasts as vocabulary, not as laws.

### Chevreul1839
- **Title:** De la loi du contraste simultané des couleurs et de l'assortiment des objets colorés (Paris:
  Pitois-Levrault, 1839). English editions: *The Principles of Harmony and Contrast of Colours* (1854) and *The Laws of
  Contrast of Colour* (London 1861; Project Gutenberg ebook 76939). **Author:** Michel-Eugène Chevreul.
- **URL:** https://archive.org/details/Delaloiducontra00Chev ; https://gutenberg.org/ebooks/76939 ;
  https://www.webexhibits.org/colorart/simultaneous.html
- **Evidence type:** Documented history plus early perception science (systematic observation).
- **Accessed:** bibliographic, plus secondary summaries (archive.org record, Britannica, WebExhibits).
- **Findings (secondary):** (1) The law of simultaneous contrast: colours placed side by side look "as dissimilar as
  possible" in both hue and tone. (2) It started from a real production problem: Gobelins tapestry threads that looked
  faded were in fact shifted by their neighbours. (3) The book influenced Delacroix and later painters.
- **Limitations:** A 19th-century descriptive law. Modern colour appearance models (Fairchild2013) quantify these
  effects.

### Fairchild2013
- **Title:** Color Appearance Models, 3rd ed. **Author:** Mark D. Fairchild. **Year:** 2013. **Publisher:** John Wiley &
  Sons (Wiley-IS&T Series in Imaging Science and Technology), Chichester, 472 pp. ISBN 978-1-119-96703-3 (eText
  9781118653104). Review: J. Electronic Imaging 23(2) 029901, doi:10.1117/1.JEI.23.2.029901.
- **URL:** https://www.wiley-vch.de/en/areas-interest/engineering/color-appearance-models-978-1-119-96703-3
- **Evidence type:** Colour science (textbook).
- **Accessed:** bibliographic only (Wiley-VCH listing, Texas A&M library record, SPIE review listing). I found no DOI
  for the book itself.
- **Findings (from scope described in the records, not from reading):** the standard reference for chromatic
  adaptation, appearance phenomena (simultaneous contrast, Hunt and Stevens effects) and models such as CIECAM02.
  Practical implication: colourimetric values (XYZ, Lab) do not predict appearance once the surround, adapting white
  or luminance level changes.
- **Limitations:** Not read. Cite it for orientation and use CIE15_2018 and Moroney2002 for specific claims.

### IEC61966_2_1
- **Title:** IEC 61966-2-1:1999 Multimedia systems and equipment – Colour measurement and management – Part 2-1: Colour
  management – Default RGB colour space – sRGB. **Publisher:** IEC, 18 Oct 1999. Amendment 1 (2003) covers negative
  values. HP and Microsoft first proposed sRGB in 1996.
- **URL:** https://webstore.iec.ch/publication/6169 ; https://www.w3.org/Graphics/Color/sRGB.html
- **Evidence type:** Standard.
- **Accessed:** publisher listing (paywalled, not read). The transfer function is quoted second-hand in W3C_WCAG21,
  which I read.
- **Findings:** (1) sRGB is the default encoding on the web and on almost all consumer displays. WCAG and CSS both
  reference it. (2) It defines a piecewise transfer function: linear below about 0.04045 (encoded), and a power of 2.4
  with an offset above. Colour maths such as luminance, blending and averaging has to be done on *linearised* values.
- **Limitations:** I did not read the official text.

### Smith1978
- **Title:** Color gamut transform pairs. **Author:** Alvy Ray Smith. **Year:** 1978. **Venue:** SIGGRAPH '78 / ACM
  SIGGRAPH Computer Graphics 12(3), 12–19. **DOI:** 10.1145/800248.807361.
- **URL:** https://www.alvyray.com/Papers/CG/color78.pdf ; https://history.siggraph.org/?p=103220
- **Evidence type:** Graphics research (it defines HSV, the "hexcone" model).
- **Accessed:** bibliographic, plus secondary summaries (BibTeX, SIGGRAPH archive).
- **Findings:** (1) It defines polar transforms of RGB that are convenient for painting programs and were used at
  Xerox PARC and NYIT. (2) HSV/HSL are *reparameterisations of device RGB*, not perceptual spaces. Equal "V" or "L" does
  not mean equal perceived lightness (pure yellow and pure blue have the same V=1).
- **Limitations:** Use HSV/HSL for UI pickers only. For perceptual work use OKLCH or CIELAB.

### CIE15_2018
- **Title:** CIE 015:2018 Colorimetry, 4th Edition. **Publisher:** CIE (Vienna), 2018. **DOI:** 10.25039/TR.015.2018.
  ISBN 978-3-902842-13-8. It replaces CIE 15:2004.
- **URL:** https://cie.co.at/publications/colorimetry-4th-edition
- **Evidence type:** Standard.
- **Accessed:** publisher page and index records. I did not read the full text. A copy incorporated by reference is
  hosted at law.resource.org, which I did not open.
- **Findings:** It covers standard observers (CIE 1931 2°, 1964 10°), standard illuminants (D65, A), tristimulus and
  chromaticity calculation, the CIELAB/CIELUV uniform spaces, and colour-difference practice. It is the authoritative
  basis for "CIE 1931 XYZ" and "CIELAB" in any spec.
- **Limitations:** Paywalled. Formulas are not reproduced here from the source.

### Sharma2005
- **Title:** The CIEDE2000 color-difference formula: Implementation notes, supplementary test data, and mathematical
  observations. **Authors:** Gaurav Sharma, Wencheng Wu, Edul N. Dalal. **Year:** 2005. **Venue:** Color Research &
  Application 30(1), 21–30. **DOI:** 10.1002/col.20070.
- **URL:** https://hajim.rochester.edu/ece/sites/gsharma/ciede2000/
- **Evidence type:** Colour science.
- **Accessed:** abstract-level, via the author's site description and index summaries.
- **Findings:** (1) CIEDE2000 (ΔE00) is the current CIE colour-difference formula, computed from CIELAB. Correct
  implementation is easy to get wrong, so the authors supply test data, MATLAB code and an Excel implementation.
  (2) The formula has small mathematical discontinuities (in the related talk, under about 0.24 for pairs less than 5
  units apart).
- **Limitations:** Use a tested library rather than hand-coding it. The common "ΔE00 ≈ 1 is barely noticeable"
  heuristic is industry lore that I did not verify here.

### Ottosson2020
- **Title:** A perceptual color space for image processing (OKLab). **Author:** Björn Ottosson. **Date:** 23 Dec 2020,
  matrices updated 25 Jan 2021. **Venue:** personal technical blog.
- **URL:** https://bottosson.github.io/posts/oklab/
- **Evidence type:** Colour science (an engineered model fitted to perceptual data). Grey literature, but adopted by
  W3C_CSSColor4.
- **Accessed:** full text.
- **Findings:** Conversion from **linear** sRGB (apply the sRGB EOTF first):
  ```
  l = 0.4122214708 r + 0.5363325363 g + 0.0514459929 b
  m = 0.2119034982 r + 0.6806995451 g + 0.1073969566 b
  s = 0.0883024619 r + 0.2817188376 g + 0.6299787005 b
  l' = cbrt(l); m' = cbrt(m); s' = cbrt(s)
  L = 0.2104542553 l' + 0.7936177850 m' - 0.0040720468 s'
  a = 1.9779984951 l' - 2.4285922050 m' + 0.4505937099 s'
  b = 0.0259040371 l' + 0.7827717662 m' - 0.8086757660 s'
  ```
  OKLCH is the polar form: C = sqrt(a²+b²), h = atan2(b, a).
  (2) In the author's hue-prediction table, Oklab's hue RMS error is 0.49 against 0.69 for CIELAB (JzAzBz is best at
  0.43). The author says CIELAB's biggest weakness is hue prediction, especially for blues, which drift toward purple.
  (3) It is designed so that lightness, chroma and hue can be edited independently, which suits gradients, palette
  ramps and blending.
- **Limitations:** Not peer-reviewed. It is not a full appearance model (it has no surround or adaptation terms). The
  author's own benchmark is the evidence.

### W3C_CSSColor4
- **Title:** CSS Color Module Level 4. **Editors:** Tab Atkins Jr., Chris Lilley, Lea Verou. **Status:** W3C Candidate
  Recommendation Draft, 23 Nov 2026 (the version I fetched).
- **URL:** https://www.w3.org/TR/css-color-4/
- **Evidence type:** Standard (draft-track).
- **Accessed:** full text in part (characters 0–300k of about 500k).
- **Findings:** (1) It defines `oklab()` and `oklch()`. Example: #7654CD = oklab(54.43237% 0.0681665 -0.1656703).
  (2) "If the host syntax does not define what color space interpolation should take place in, it defaults to Oklab."
  This is the spec basis for interpolating gradients in OKLab/OKLCH. (3) A grey converted to OKLCH can have a
  near-zero chroma with a meaningless hue, so hue is treated as "powerless" at C≈0. Watch for this when generating
  ramps.
- **Limitations:** I did not read the exact L/C value ranges, which are in a section past my fetch window. Browser
  support for the Candidate Recommendation can vary.

### Land1977
- **Title:** The Retinex Theory of Color Vision. **Author:** Edwin H. Land. **Year:** 1977. **Venue:** Scientific
  American 237(6), 108–128. **DOI:** 10.1038/scientificamerican1277-108.
- **URL:** https://ni.cmu.edu/~tai/cp_papers/E.Land_Retinex_Theory_ScientifcAmerican.pdf
- **Evidence type:** Perception science (colour constancy).
- **Accessed:** bibliographic, plus secondary summaries (I did not open the PDF).
- **Findings (secondary):** colour constancy. Perceived surface colour depends on *relative* lightness comparisons
  across the scene in each waveband, not on the absolute wavelength at a point. "Retinex" combines retina and cortex.
- **Limitations:** Retinex is one model among several (von Kries adaptation, CIECAM). It is a popular-science
  presentation.

### Moroney2002
- **Title:** The CIECAM02 Color Appearance Model. **Authors:** N. Moroney, M. D. Fairchild, R. W. G. Hunt, C. Li,
  M. R. Luo, T. Newman. **Year:** 2002. **Venue:** IS&T/SID 10th Color Imaging Conference, Scottsdale, pp. 23–27.
- **URL:** https://library.imaging.org/cic/articles/10/1/art00007 ; https://repository.rit.edu/other/143
- **Evidence type:** Colour science.
- **Accessed:** bibliographic only.
- **Findings (from records):** CIECAM02 revises and simplifies CIECAM97s. It models chromatic adaptation (a
  CAT02-based transform) plus viewing conditions (adapting luminance, surround) to predict lightness, chroma, hue,
  colourfulness and brightness.
- **Limitations:** Not read. It has since been succeeded by CIECAM16 / CIE 248:2022 (from the CIE "superseded" page in
  the search results, not checked further).

---

## B. Colour harmony, preference and emotion

### OuLuo2006
- **Title:** A colour harmony model for two-colour combinations. **Authors:** Li-Chen Ou, M. Ronnier Luo. **Year:**
  2006. **Venue:** Color Research & Application 31(3), 191–204. **DOI:** 10.1002/col.20208.
- **Evidence type:** Psychology / colour science (psychophysics).
- **Accessed:** abstract.
- **Findings:** (1) 1431 colour pairs rated on a 10-category harmony scale. A general pattern emerged and was fitted as
  a quantitative model with stated harmony principles. (2) The model was validated on an independent dataset with
  "satisfactory" performance. (3) The paper discusses how harmony relates to pleasantness and to colour order.
- **Limitations:** Two-colour patches only, in lab viewing. It does not cover images, semantics or proportion.

### SchlossPalmer2011
- **Title:** Aesthetic response to color combinations: preference, harmony, and similarity. **Authors:** Karen B.
  Schloss, Stephen E. Palmer. **Year:** 2011 (online Nov 2010). **Venue:** Attention, Perception & Psychophysics 73(2),
  551–571. **DOI:** 10.3758/s13414-010-0027-0. Open access (PMC3037488).
- **Evidence type:** Psychology.
- **Accessed:** abstract.
- **Findings:** (1) Preference for a pair, its perceived harmony, and preference for a figure colour on a ground are
  *distinct* judgments. (2) Both preference and harmony rise with hue similarity. Pair preference depends more on
  how much people like the component colours and on **lightness contrast**. (3) Average ratings correlated strongly,
  but individuals varied widely.
- **Limitations:** Western university samples and patch stimuli.

### PalmerSchloss2010
- **Title:** An ecological valence theory of human color preference. **Authors:** Stephen E. Palmer, Karen B. Schloss.
  **Year:** 2010. **Venue:** PNAS 107(19), 8877–8882. **DOI:** 10.1073/pnas.0906172107.
- **Evidence type:** Psychology.
- **Accessed:** abstract.
- **Findings:** (1) Colour preference tracks the average affective response to the objects associated with the colour
  (blue goes with clear sky and clean water; dark yellow-browns go with rot and faeces). (2) Ecological valence
  theory fit 32 colours better than cone-contrast, appearance and colour-emotion models, with fewer parameters. A
  related paper reports about 80% of variance explained.
- **Limitations:** Preference ≠ effectiveness. Associations depend on culture and on object context.

### Jonauskaite2020
- **Title:** Universal Patterns in Color-Emotion Associations Are Further Shaped by Linguistic and Geographic
  Proximity. **Authors:** Domicele Jonauskaite et al. **Year:** 2020. **Venue:** Psychological Science 31(10),
  1245–1260. **DOI:** 10.1177/0956797620948810.
- **URL:** https://biopen.bi.no/bi-xmlui/bitstream/11250/2761614/1/Jonauskaite_etal_2020_PsychScience.pdf
- **Evidence type:** Psychology (cross-cultural survey).
- **Accessed:** abstract.
- **Findings:** (1) 4,598 participants, 30 nations, 22 languages, 20 emotion concepts × 12 colour *terms*. (2) A strong
  shared pattern, with a mean similarity of r = .88 across nations. (3) Nation still predicted associations beyond the
  universal pattern, and nations close in language or geography were more similar.
- **Limitations:** Colour *words*, not colour samples or images. Association is not induced emotion. Thailand's
  inclusion was not checked here.

### Ou2004
- **Title:** A study of colour emotion and colour preference. Part I: Colour emotions for single colours. **Authors:**
  Li-Chen Ou, M. Ronnier Luo, Andrée Woodcock, Angela Wright. **Year:** 2004. **Venue:** Color Research & Application
  29(3), 232–240. **DOI:** 10.1002/col.20010.
- **Evidence type:** Psychology / colour science.
- **Accessed:** abstract (Coventry repository and index summaries). Note: the gwern copy lists a different issue and
  DOI (10.1002/col.20047, possibly another part of the series). Check before citing an issue number.
- **Findings:** (1) 31 observers (14 British, 17 Chinese), 20 colours, 10 emotion scales. (2) Three factors: **colour
  activity, colour weight, colour heat**. (3) Warm–cool, heavy–light, active–passive and hard–soft models were
  consistent across cultures. British and Chinese observers differed on tense–relaxed and like–dislike.
- **Limitations:** Small sample and single patches. Part III found that preference was most affected by "clean".

### ElliotMaier2014
- **Title:** Color psychology: effects of perceiving color on psychological functioning in humans. **Authors:**
  Andrew J. Elliot, Markus A. Maier. **Year:** 2014. **Venue:** Annual Review of Psychology 65, 95–120. **DOI:**
  10.1146/annurev-psych-010213-115035. PMID 23808916.
- **Evidence type:** Psychology (review).
- **Accessed:** abstract-level summary (the PubMed page blocked the fetch, so I used index summaries).
- **Findings:** (1) Colour can carry meaning and influence affect, cognition and behaviour (achievement, affiliation
  and attraction, some consumer and food work). (2) The field is at an early stage. Boundary conditions, moderators
  and real-world generalisability need more research before confident applied recommendations can be made.
- **Limitations:** Some flagship effects (for example red and attractiveness) have had mixed replications since then.
  Treat applied claims as tentative.

### Unverified_60_30_10
- **Claim:** The "60-30-10" colour proportion rule (60% dominant, 30% secondary, 10% accent).
- **Status:** **Unverified origin.** Searches found only interior-design magazines (Homes & Gardens, Livingetc, Bob
  Vila, Apartment Therapy, Homebuilding) calling it an old interior-decorating guideline. None names an originator,
  publication or date, and several describe it as "a guideline, not a mandate".
- **Evidence type:** Artistic (decorating and UI craft heuristic). It is related in spirit to Itten's "contrast of
  extension" (Itten1961), but I found no source that links the two.
- **Use:** Label it `Artistic`. Offer alternatives such as 70-20-10, a single accent on near-neutrals, or an
  analogous wash without an accent.

---

## C. Accessibility and colour-vision deficiency

### W3C_WCAG21
- **Title:** Web Content Accessibility Guidelines (WCAG) 2.1. **Publisher:** W3C Recommendation (2018, updated). SC
  1.4.3, 1.4.6, 1.4.11.
- **URL:** https://www.w3.org/TR/WCAG21/
- **Evidence type:** Standard.
- **Accessed:** full text (success criteria and glossary).
- **Findings:**
  - **Relative luminance (sRGB):** each channel c = 8-bit/255. If c ≤ 0.04045, then C = c/12.92, else
    C = ((c+0.055)/1.055)^2.4. Then **L = 0.2126 R + 0.7152 G + 0.0722 B**. (The threshold was 0.03928 before May
    2021. The note says this has no practical effect.)
  - **Contrast ratio = (L1 + 0.05) / (L2 + 0.05)**, with L1 the lighter colour. The range is 1:1 to 21:1.
  - **1.4.3 AA:** text 4.5:1, large-scale text 3:1. **1.4.6 AAA:** 7:1 and 4.5:1. **1.4.11 AA:** UI components and
    meaningful graphics 3:1 against adjacent colours. Large-scale = at least 18 pt, or at least 14 pt bold. Logotypes
    and pure decoration are exempt.
- **Limitations:** The formula is known to misjudge some pairs, especially dark backgrounds and orange or blue text,
  which motivated APCA. It is built for web text, but it is a sound floor for text on social images.

### W3C_WCAG3_WD
- **Title:** W3C Accessibility Guidelines (WCAG) 3.0, Working Draft. Drafts dated 4 Sep 2025 and 10 Sep 2026
  (TR/2026/WD-wcag-3.0-20260910). Commentary: A. Roselli, "WCAG3 Contrast as of April 2026".
- **URL:** https://www.w3.org/TR/wcag-3.0/ ; https://www.w3.org/standards/history/wcag-3.0 ;
  https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html
- **Evidence type:** Standard (draft) plus practitioner commentary.
- **Accessed:** search-result excerpts of the W3C pages and the commentary. I did not read the full draft.
- **Findings:** (1) WCAG 3 is still a Working Draft. Its editor's note says the contrast algorithm "is yet to be
  determined". (2) APCA was removed from the July 2023 draft, and exploratory content is excluded. (3) WCAG 2.x
  contrast remains the operative, citable standard.
- **Limitations:** Drafts change. Re-check before claiming anything about APCA.

### Machado2009
- **Title:** A Physiologically-based Model for Simulation of Color Vision Deficiency. **Authors:** Gustavo M.
  Machado, Manuel M. Oliveira, Leandro A. F. Fernandes. **Year:** 2009. **Venue:** IEEE TVCG 15(6), 1291–1298.
  **DOI:** 10.1109/TVCG.2009.113.
- **URL:** https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
- **Evidence type:** Graphics research / perception science.
- **Accessed:** full text of the project page (abstract, matrices table, erratum note).
- **Findings:** (1) A single model covers normal vision, anomalous trichromacy and dichromacy, based on stage theory
  and electrophysiological data. (2) Simulation is **one 3×3 matrix multiply per pixel**. Precomputed matrices are
  given for protan, deutan and tritan at severities 0.0–1.0 in steps of 0.1, and intermediate severities can be
  interpolated. (3) The page lists an erratum for Eqs. 17–18.
- **Limitations:** Apply it to *linear* RGB, as is common practice (check the paper). It is a simulation, not a
  measure of how a person actually experiences colour.

### Birch2012
- **Title:** Worldwide prevalence of red-green color deficiency. **Author:** Jennifer Birch. **Year:** 2012. **Venue:**
  JOSA A 29(3), 313–320. **DOI:** 10.1364/JOSAA.29.000313.
- **Evidence type:** Perception science / epidemiology review.
- **Accessed:** abstract.
- **Findings:** Inherited red-green deficiency affects about **8% of European Caucasian men and about 0.4% of women**,
  and **4–6.5% of men of Chinese and Japanese ethnicity**.
- **Limitations:** Prevalence for Thai populations is not given in the abstract. Expect a figure of the same order
  (several percent of men), but treat that as unverified.

---

## D. Colour temperature

### McCamy1992
- **Title:** Correlated color temperature as an explicit function of chromaticity coordinates. **Author:** C. S.
  McCamy. **Year:** 1992. **Venue:** Color Research & Application 17(2), 142–144. **DOI:** 10.1002/col.5080170211.
- **Evidence type:** Colour science.
- **Accessed:** bibliographic, plus secondary (the `colour` Python library documentation and an R package
  description).
- **Findings:** (1) CCT is the temperature (in K) of the Planckian radiator whose chromaticity is closest to the
  light's. McCamy gives a cubic approximation from CIE 1931 x,y with no interpolation step. Validity is roughly
  1,600–34,500 K, depending on the locus used. (2) CCT → xy is not unique, because many chromaticities (green and
  magenta tints) share one CCT. This is why lighting also specifies Duv or tint.
- **Limitations:** CCT says nothing about colour rendering (CRI/TM-30) or tint.

### Fotios2017
- **Title:** A Revised Kruithof Graph Based on Empirical Data. **Author:** Steve Fotios. **Year:** 2017. **Venue:**
  LEUKOS 13(1), 3–17. **DOI:** 10.1080/15502724.2016.1159137. Open access.
- **URL:** https://eprints.whiterose.ac.uk/98531/
- **Evidence type:** Perception science (review).
- **Accessed:** abstract.
- **Findings:** (1) Kruithof's 1941 curve, which says low illuminance should be warm and high illuminance cool, is
  widely used but poorly supported by credible studies. (2) For "pleasant" interiors, the evidence mainly says to
  *avoid low illuminance*. CCT across roughly 2500–6500 K showed no clear effect.
- **Limitations:** Interior lighting judgements, not pictures. "Warm = cosy" in images is an *Artistic* convention
  and a cultural association, not a law.

---

## E. Lighting: cinema, portrait, art history, sky

### Brown2019
- **Title:** Motion Picture and Video Lighting for Cinematographers, Gaffers and Lighting Technicians, 3rd ed.
  **Author:** Blain Brown. **Year:** 2018/2019 (catalogues differ). **Publisher:** Routledge / Focal Press. ISBN
  9780415854139, 368 pp. Earlier editions 1995 and 2007. 4th ed., Routledge 2024 (ISBN 9781032370347).
- **URL:** https://www.routledge.com/Motion-Picture-and-Video-Lighting/Brown-Brown/p/book/9781032370347
- **Evidence type:** Artistic (professional practice handbook).
- **Accessed:** bibliographic only.
- **Findings (from listing):** covers technical, aesthetic and practical lighting for film: key/fill/back, ratios,
  motivated light, colour correction gels. I am not quoting it beyond the listing.
- **Limitations:** Not read.

### Portrait_Patterns_SLRLounge
- **Title:** "5 Common Key Light Patterns Every Portrait Photographer Should Know". **Author:** Pye Jirsa. **Date:** 26
  Jul 2026 (page date). **Publisher:** SLR Lounge (photography education).
- **URL:** https://www.slrlounge.com/common-key-light-patterns/ . Corroborated by search excerpts from Fstoppers,
  Digital Photography School and Adorama (the PPA "9 Types of Portrait Lighting" page returned 403).
- **Evidence type:** Artistic.
- **Accessed:** full text.
- **Findings:** **Butterfly/Paramount:** frontal, raised and angled down, small butterfly shadow under the nose.
  **Loop:** about 25–50° off-axis, the nose shadow forms a small loop on the cheek. **Rembrandt:** rotated further
  until the nose shadow meets the far-cheek shadow, leaving a lit triangle under the eye. **Split:** 90° to the side,
  half the face lit. **Short:** lights the side of the face away from the camera, which slims and adds contrast.
  **Broad:** lights the side toward the camera, which widens. **Clamshell:** butterfly plus a reflector or fill
  below. Broad and short combine with any pattern.
- **Limitations:** Practitioner convention. The angles are approximate and sources differ slightly on Rembrandt
  height.

### Tate_Chiaroscuro
- **Title:** Art term: Chiaroscuro. **Publisher:** Tate.
- **URL:** https://www.tate.org.uk/art/art-terms/c/chiaroscuro
- **Evidence type:** Documented history (museum glossary).
- **Accessed:** search excerpt of the museum page.
- **Findings:** Italian for "light-dark": "the balance and pattern of light and shade in a painting or drawing". It is
  usually remarked on only when it is a prominent feature of the work. Art UK links it to Leonardo, Caravaggio,
  Rembrandt and Goya.
- **Limitations:** Glossary-level. Wikipedia notes an older Renaissance meaning (drawing on coloured paper).

### NG_Tenebrism
- **Title:** Glossary: Tenebrism. **Publisher:** The National Gallery, London.
- **URL:** https://www.nationalgallery.org.uk/paintings/glossary/tenebrism
- **Evidence type:** Documented history (museum glossary).
- **Accessed:** full text.
- **Findings:** From *tenebroso* ("darkened and obscuring"). In a tenebrist painting, "significant details such as
  faces and hands are illuminated by highlights which are contrasted with a predominantly dark setting". It is
  associated with late Caravaggio and his followers. So tenebrism is an *extreme, selective* chiaroscuro: most of the
  frame is near-black.
- **Limitations:** Definitional only.

### USNO_Twilight
- **Title:** Rise, Set, and Twilight Definitions. **Publisher:** U.S. Naval Observatory, Astronomical Applications.
- **URL:** https://aa.usno.navy.mil/faq/RST_defs
- **Evidence type:** Standard (astronomical definitions).
- **Accessed:** search excerpt of the official page.
- **Findings:** Civil twilight: Sun's centre 0 to −6° below the horizon. Nautical: −6 to −12°. Astronomical: −12 to
  −18°. The definitions assume sea level, good weather and a level horizon.
- **Limitations:** These are the only *official* sun-angle terms. "Golden hour" and "blue hour" are not official
  (next entry).

### TPE_GoldenBlueHour
- **Title:** Magical Gold and Blue: Confusion in the Twilight Zone. **Publisher:** The Photographer's Ephemeris (Photo
  Ephemeris). The author is not named on the page, which was originally published on Medium.
- **URL:** https://photoephemeris.com/en/articles/magical-gold-and-blue-confusion-in-the-twilight-zone
- **Evidence type:** Artistic / practitioner survey, plus astronomy.
- **Accessed:** full text.
- **Findings:** (1) "Clearly there are no agreed definitions." Apps use a golden hour anywhere from −4° to +6° up to
  0° to +10° sun elevation. The author's own definition is 0° to +6°. (2) Blue hour in the surveyed apps runs from −4°
  to −6°, −4° to −8°, or −3° to −10°, which falls within civil twilight. Timeanddate and Wikipedia agree that "golden
  hour" has no official definition.
- **Limitations:** The duration depends strongly on latitude. Near the equator (Thailand, about 13°N) the sun crosses
  these bands quickly, so the windows are short (my inference from geometry; not checked against a source).

### HyperPhysics_Scattering
- **Title:** Blue Sky (Rayleigh scattering). **Author/Publisher:** C. R. Nave, HyperPhysics, Georgia State University.
- **URL:** https://hyperphysics.gsu.edu/hbase/atmos/blusky.html
- **Evidence type:** Physics (educational reference).
- **Accessed:** full text. The formula appears only as an image.
- **Findings:** (1) Rayleigh scattering by air molecules is "more effective at short wavelengths". The sky away from
  the sun is predominantly blue, and more saturated farther from the sun. (2) "For particle sizes larger than a
  wavelength, Mie scattering predominates". Mie scattering is not strongly wavelength-dependent, which is why there is
  white glare around the sun and why haze, fog and clouds look white or grey. (The standard textbook result is a
  λ⁻⁴ dependence for Rayleigh scattering. I did not confirm it in the text because it is shown as an image.)
- **Limitations:** Introductory level. Sunset reddening (a long path removes the blue) is not covered on this page.

### Nishita1993
- **Title:** Display of the Earth Taking into Account Atmospheric Scattering. **Authors:** T. Nishita, T. Sirai
  (also spelled Shirai), K. Tadamura, E. Nakamae. **Year:** 1993. **Venue:** Proc. SIGGRAPH '93, 175–182.
- **URL:** https://history.siggraph.org/?p=118606
- **Evidence type:** Graphics research.
- **Accessed:** bibliographic, plus secondary (Scratchapixel describes it as the seminal sky-colour paper).
- **Findings (secondary):** physically based sky and atmosphere colour from Rayleigh (molecules → blue sky) and Mie
  (aerosols → haze, sun halo) single scattering. It is the basis of the "aerial perspective" and "god rays" models in
  renderers.
- **Limitations:** Not read.

### HyperPhysics_InverseSquare
- **Title:** Inverse Square Law, Light. **Publisher:** HyperPhysics, Georgia State University.
- **URL:** https://hyperphysics.gsu.edu/hbase/vision/isql.html
- **Evidence type:** Physics.
- **Accessed:** full text.
- **Findings:** For a point source, irradiance falls with the square of distance: light per unit area at 2 m is a
  quarter of that at 1 m. Practical consequence: moving a subject a short distance from a near light causes a big
  exposure fall-off and darkens the background. A distant source (the sun) gives even illumination across depth.
- **Limitations:** Exact only for point sources. Large softboxes close to a subject fall off more slowly than 1/d² at
  short range (my inference; not checked against a source).

### Penumbra_SourceSize
- **Title:** Hard and soft light: source-size explanations. **Publishers:** Adorama "Photo 101: Large Source of
  Light", Canon Asia SNAPSHOT "Lighting basics: hard and soft light", PetaPixel "An Intro to Shadows in Photography".
- **URL:** https://www.adorama.com/alc/large-source-of-light ;
  https://snapshot.canon-asia.com/article/lighting-basic-hard-and-soft-light
- **Evidence type:** Physics (geometric optics) as explained by practitioners.
- **Accessed:** search excerpts only.
- **Findings:** (1) Penumbra width depends on the **apparent (angular) size** of the source as seen from the subject.
  Bigger or closer means softer shadow edges, and smaller or farther means harder. (2) Example: the same light at 1 m
  gives softer shadows than at 3 m.
- **Limitations:** Secondary. Diffusion, bounce and subject shape also matter.

---

## F. Physically based rendering and material appearance

### Kajiya1986
- **Title:** The Rendering Equation. **Author:** James T. Kajiya. **Year:** 1986. **Venue:** SIGGRAPH '86, Computer
  Graphics 20(4), 143–150. **DOI:** 10.1145/15922.15902.
- **URL:** https://www.cs.princeton.edu/courses/archive/fall14/cos526/papers/kajiya86.pdf
- **Evidence type:** Graphics research.
- **Accessed:** bibliographic, plus secondary (Wikipedia, BibSonomy).
- **Findings (secondary):** outgoing radiance = emitted + the integral over the hemisphere of BRDF × incoming radiance
  × cosθ. This is the formal basis of global illumination: every surface lights every other surface, which gives
  bounce light and colour bleeding. Immel et al. introduced it independently in the same year.
- **Limitations:** Not read.

### PBRT4
- **Title:** Physically Based Rendering: From Theory to Implementation, 4th ed. **Authors:** Matt Pharr, Wenzel Jakob,
  Greg Humphreys. **Year:** 2023. **Publisher:** MIT Press, 1312 pp., ISBN 9780262048026. Free online since 1 Nov 2023.
- **URL:** https://pbr-book.org/4ed/contents ; https://pharr.org/matt/blog/2022/12/22/pbr-4ed
- **Evidence type:** Graphics research (reference textbook).
- **Accessed:** bibliographic, plus the author's announcement. I did not read chapters.
- **Findings:** the canonical open reference for light transport, BSDFs (dielectric and conductor Fresnel,
  microfacets), participating media (volumetrics) and sampling.
- **Limitations:** I did not read chapters, so the specific formulas are not reproduced from it.

### Burley2012
- **Title:** Physically-Based Shading at Disney. **Author:** Brent Burley. **Year:** 2012. **Venue:** SIGGRAPH 2012
  course "Practical Physically Based Shading in Film and Game Production" (course notes).
- **URL:** https://disneyanimation.com/publications/physically-based-shading-at-disney ;
  https://blog.selfshadow.com/publications/s2012-shading-course/
- **Evidence type:** Graphics research (production).
- **Accessed:** publisher page and slide summary.
- **Findings:** (1) A new "principled" BRDF built for *Wreck-It Ralph* and later films, with artist-friendly
  parameters. The well-known parameter set is baseColor, metallic, roughness, specular, subsurface, sheen,
  clearcoat (this list is from general knowledge, not re-read). (2) The notes include BRDF observations from measured
  data, the GTR microfacet distribution and a history of 30+ BRDFs. Its metallic/roughness vocabulary became the
  industry PBR workflow and is good vocabulary for prompts.
- **Limitations:** I did not read the notes in full.

### Schlick1994
- **Title:** An Inexpensive BRDF Model for Physically-based Rendering. **Author:** Christophe Schlick. **Year:** 1994.
  **Venue:** Computer Graphics Forum 13(3), 233–246. **DOI:** 10.1111/1467-8659.1330233.
- **Evidence type:** Graphics research.
- **Accessed:** abstract plus secondary (Wikipedia on Schlick's approximation).
- **Findings:** It is the source of **Schlick's Fresnel approximation**, F(θ) ≈ F0 + (1 − F0)(1 − cosθ)^5 (the
  standard form as given in secondary sources). Reflectance rises toward 1 at grazing angles. Dielectrics (glass,
  plastic, skin) have low F0, a few percent. Metals have high, tinted F0. Consequence for eyewear: lens reflections
  get much stronger at grazing angles, so controlling camera and light angle controls lens glare.
- **Limitations:** An approximation. The typical F0 ≈ 0.04 for glass and plastic is standard practice and was not
  checked against this paper.

### Jensen2001
- **Title:** A Practical Model for Subsurface Light Transport. **Authors:** Henrik Wann Jensen, Stephen R. Marschner,
  Marc Levoy, Pat Hanrahan. **Year:** 2001. **Venue:** SIGGRAPH 2001, 511–518. **DOI:** 10.1145/383259.383319.
- **URL:** https://graphics.stanford.edu/papers/bssrdf/
- **Evidence type:** Graphics research.
- **Accessed:** abstract.
- **Findings:** It models translucency (skin, marble, milk) as a BSSRDF that combines exact single scattering with a
  dipole diffusion approximation for multiple scattering. Light enters at one point and leaves at another, which
  softens skin and gives red-glowing edges. Without it, skin looks like painted plaster.
- **Limitations:** Rendering model. It is used here only as vocabulary ("subsurface scattering").

### Zhukov1998
- **Title:** An Ambient Light Illumination Model. **Authors:** S. Zhukov, A. Iones, G. Kronin. **Year:** 1998.
  **Venue:** Rendering Techniques '98 (9th Eurographics Workshop on Rendering), Springer, 45–56. **DOI:**
  10.1007/978-3-7091-6453-2_5.
- **Evidence type:** Graphics research.
- **Accessed:** bibliographic, plus secondary (Purdue course notes, GPU Gems).
- **Findings (secondary):** it introduced "obscurances", of which ambient occlusion is a special case. Ambient light
  is attenuated by how much nearby geometry occludes each point.
- **Limitations:** Not read.

### Landis2002
- **Title:** Production-Ready Global Illumination. **Author:** Hayden Landis (ILM). **Year:** 2002. **Venue:**
  SIGGRAPH 2002 Course 16 "RenderMan in Production", pp. 87–101/102.
- **URL:** https://developer.nvidia.com/gpugems/gpugems/part-iii-materials/chapter-17-ambient-occlusion (secondary)
- **Evidence type:** Graphics research (production).
- **Accessed:** secondary only (GPU Gems ch. 17, CGW article).
- **Findings (secondary):** ILM developed and popularised ambient occlusion in production. Landis, Koch and McGaugh
  received an Academy Technical Achievement Award for it. AO gives soft **contact shadows** in creases and where
  objects meet the ground. Missing contact shadows are a classic tell of "floating" cutouts.
- **Limitations:** I did not read the course notes.

### Fleming2014
- **Title:** Visual perception of materials and their properties. **Author:** Roland W. Fleming. **Year:** 2014.
  **Venue:** Vision Research 94, 62–75. **DOI:** 10.1016/j.visres.2013.11.004.
- **Evidence type:** Perception science (review).
- **Accessed:** abstract (Europe PMC).
- **Findings:** (1) The same material can look very different under different lighting, shape and viewpoint. (2) The
  visual system likely does not invert optics to estimate physical parameters. It learns **statistical appearance
  models**, so perceived gloss depends on low- and mid-level image cues (highlight shape, sharpness, contrast,
  alignment with shading) rather than estimated BRDF values. (3) Implication: to read as "glossy acetate" or "brushed
  titanium", an image needs the *right highlight cues in context*, so lighting and shape strongly change how a material
  is perceived.
- **Limitations:** A review and theoretical position. The specific cue findings are in the cited primary studies.

### Gurney2010
- **Title:** Color and Light: A Guide for the Realist Painter. **Author:** James Gurney. **Year:** 2010. **Publisher:**
  Andrews McMeel, ISBN 9780740797712, about 224 pp. (LC ND1500 .G86 2010).
- **URL:** https://publishing.andrewsmcmeel.com/?p=1506
- **Evidence type:** Artistic (painter's guide that cross-checks dogma against observation and science).
- **Accessed:** bibliographic only (publisher and library listings).
- **Findings (from publisher description):** covers how light reveals form, properties of colour and pigment, and
  atmospheric effects, and tests colour "dogma" against science and observation.
- **Limitations:** Not read. Do not attribute specific rules to it.

---

## Synthesis for an AI art director

**Colour spaces: which one for which task**
1. Do all colour maths (blending, averaging, luminance, CVD simulation) on **linearised** sRGB, never on encoded hex
   values. [finding: IEC61966_2_1, W3C_WCAG21, Machado2009]
2. Build palette ramps, tints, shades and gradients in **OKLCH/OKLab**: change L for value steps and C for
   saturation, and hold h. Hue stays more stable than in CIELAB, especially for blues. CSS defaults interpolation to
   Oklab. [finding: Ottosson2020, W3C_CSSColor4]
3. Use **HSL/HSV only for UI pickers**. They are reparameterisations of device RGB, so equal L or V is not equal
   perceived lightness. [finding: Smith1978]
4. Use **CIELAB + ΔE00** when you need to *measure* a difference, for example "is this brand green drifting across
   renders?". Use a tested library. [finding: CIE15_2018, Sharma2005]
5. Appearance is relative. The same swatch shifts on different grounds and under different adapting light, so judge
   brand colours *in the composite*, not as isolated hex values. [finding: Chevreul1839, Land1977, Fairchild2013;
   craft: Albers1963]
6. Phthalo #123A29 is a very dark, low-chroma green. Next to Peach #EFCF9C it gets most of its punch from **value
   contrast** plus a warm/cool contrast, two of Itten's seven contrasts. Name the contrast that carries each image.
   [finding: Itten1961 (vocabulary), SchlossPalmer2011; craft]

**Harmony and emotion: how strong is the evidence?**
7. Harmony and preference are *measurable* for colour pairs. Harmony rises with hue similarity, and preference leans
   on lightness contrast and liked component colours. Treat this as evidence for patches, and as weaker evidence for
   whole images. [finding: OuLuo2006, SchlossPalmer2011]
8. Preference follows associations with objects (sky, water, food, rot). The same hue can be loved or disliked
   depending on what it appears to be *on*. Context beats the hue chart. [finding: PalmerSchloss2010]
9. Colour-emotion links have a strong cross-cultural core (r≈.88) **plus** real national and linguistic variation.
   The data are colour *words*, not images. Call it **moderate, culture-dependent and context-dependent** evidence.
   [finding: Jonauskaite2020, Ou2004]
10. The most robust "emotion" dimensions are activity, weight and heat (warm–cool, heavy–light, active–passive,
    hard–soft), and they hold across British and Chinese observers. Use these, not "red = passion" tables. [finding:
    Ou2004]
11. Applied colour-psychology claims (a colour boosts sales or attraction) are early-stage and partly unreplicated.
    Never state them as fact in briefs. [finding: ElliotMaier2014]
12. 60-30-10 is a decorating heuristic of unknown origin. Offer it as one option among others (single accent on
    neutrals, analogous wash, 70-20-10). [Artistic; Unverified_60_30_10]

**Contrast and accessibility numbers**
13. Text contrast floor: **4.5:1** for normal text, **3:1** for large text (≥18 pt or ≥14 pt bold), **7:1** for AAA.
    Logos, CTA pills and icons that carry meaning need **3:1** against their surroundings. [finding: W3C_WCAG21]
14. Check contrast with L = 0.2126R + 0.7152G + 0.0722B on linearised channels, and ratio = (L1+0.05)/(L2+0.05). For
    text over photos, test against the *lightest* local background pixel area, or add a scrim. [finding:
    W3C_WCAG21; craft]
15. Do not cite APCA as a standard. WCAG 3's contrast method is still undecided. [finding: W3C_WCAG3_WD]
16. About 8% of men of European descent (4–6.5% of Chinese and Japanese men) have red-green CVD. Never encode
    meaning in red vs green alone. Run a Machado deutan/protan simulation (severity 1.0) on key frames. [finding:
    Birch2012, Machado2009]

**Light: physical relationships to direct**
17. **Source size ↔ shadow softness:** the larger the light's *apparent* size from the subject (bigger, or closer),
    the softer the shadow edge. Small or distant sources (bare bulb, noon sun) give hard edges. [finding:
    Penumbra_SourceSize]
18. **Inverse square:** doubling the distance gives a quarter of the light. A close key light gives fast fall-off and
    a dark background (moody). A distant source lights foreground and background evenly. [finding:
    HyperPhysics_InverseSquare]
19. **Colour temperature ↔ mood:** low-CCT warm light reads as evening, candle or cosy, and high-CCT cool light as
    daylight, clinical or night-blue. This is a *cultural and associative* convention. Lab evidence that CCT drives
    pleasantness is weak (Kruithof is not supported). Use warm/cool *contrast* (warm key, cool fill) for depth.
    [finding: McCamy1992, Fotios2017; Artistic]
20. Golden hour and blue hour have **no official definition**. Use sun elevation: golden hour is roughly 0° to +6°
    (apps range −4° to +10°), and blue hour falls within civil twilight, around −4° to −8°. Near the equator these
    windows are short. [finding: TPE_GoldenBlueHour, USNO_Twilight]
21. Sky and atmosphere: Rayleigh scattering gives blue skies and blue distance, which increase with depth. Mie
    scattering (haze, smoke, fog) gives white or grey glow and makes visible light shafts. To get god rays, specify
    *particles in the air* plus a hard source behind occluders. [finding: HyperPhysics_Scattering, Nishita1993]
22. Name portrait patterns precisely in prompts: butterfly (shadow under the nose), loop (small nose loop on the
    cheek), Rembrandt (lit cheek triangle), split (half the face), plus broad or short. For eyewear, a frontal
    butterfly or clamshell light puts reflections in the lens. Move the key off-axis (loop or short) to clear the
    glass. [Artistic: Portrait_Patterns_SLRLounge]
23. Chiaroscuro means a designed light-dark pattern. Tenebrism means faces and hands lit against a mostly dark field.
    Pick tenebrism only when the subject can carry a near-black frame. [finding: Tate_Chiaroscuro, NG_Tenebrism]

**Specular vs diffuse by material**
24. Fresnel: every material gets more reflective at grazing angles. Dielectrics (acetate, lens glass, skin) have weak,
    *white* reflections. Metals (titanium, gold frames) have strong, *tinted* reflections with almost no diffuse
    colour. In prompts, describe metal by what it reflects, and acetate by its base colour plus a clean highlight.
    [finding: Schlick1994, Burley2012, PBRT4]
25. Perceived gloss comes from highlight cues: sharp and bright for polished, broad and dim for satin. Those cues must
    match the shape and the light, or the material reads as painted. Choose the light to show the material. [finding:
    Fleming2014]
26. Skin and translucent materials need subsurface scattering (soft terminator, warm edge glow). Its absence is a
    common "plastic AI skin" tell. [finding: Jensen2001]
27. Composited cutouts (frame photos on generated scenes) need **contact shadows and occlusion** where they touch
    surfaces, plus bounce colour from the scene (global illumination). Missing contact shadows are the main tell of a
    floating product. [finding: Zhukov1998, Landis2002, Kajiya1986]
28. Physical correctness is a tool, not a rule. Cel and flat styles deliberately drop fall-off, GI and Fresnel, so pick
    the physics level to suit the style. [Artistic; Gurney2010 (bibliographic only)]
