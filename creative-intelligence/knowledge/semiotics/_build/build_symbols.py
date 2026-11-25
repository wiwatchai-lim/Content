import json, sys
C = "culture:"
COLOR = "see creative-intelligence/knowledge/visual-arts/ADVANCED_COLOR_SCIENCE.md section 7"

def E(id, symbol, category, sign_type, thai, western, east_asian, risks, use_for, avoid, flag, keys, note, conf, other=None):
    m = {"thai": thai, "western": western, "east_asian": east_asian}
    if other:
        m["other"] = other
    return {"id": id, "symbol": symbol, "category": category, "sign_type": sign_type, "meanings": m,
            "risks_misreadings": risks, "use_for": use_for, "avoid": avoid, "restriction": flag,
            "source_keys": keys, "evidence_note": note, "confidence": conf, "test_status": "untested"}

S = []
# ---------- Thai religious ----------
S.append(E("th.buddha_image", "Buddha image (statue, painting, silhouette, head)", "thai_religious", "icon+symbol",
  "The Buddha himself, object of veneration; kept above head height; shoes off in its chapel.",
  "Often read as generic 'zen / calm / spa / Asian decor'.",
  "Buddha in Mahayana traditions; also venerated.",
  ["Using it as decor, spa mood or product background offends many Thais", "Buddha heads/cropped bodies, tattoos, on floors/toilets/bars = documented controversies", "Penal Code s.206 covers acts against religious objects/places"],
  ["Respectful documentary of temple visits (shot from below/level, nothing placed above it)"],
  ["Any ad, product shot, meme, cartoon Buddha, cropped head, placing Buddha below feet or next to alcohol/sexualised content"],
  "legal", [C+"Coconuts_BuddhaMisuse", C+"ThaiPenalCode", C+"ThailandFoundation2024", C+"AVIA2024_ThaiAdMatrix"],
  "Press + law text + etiquette guides agree; no audience study.", "high"))
S.append(E("th.monk_figure", "Monk / saffron robe / alms bowl", "thai_religious", "symbol",
  "Sangha, merit, morality; monks are revered and bound by Vinaya rules.",
  "Exotic serenity, mindfulness; sometimes costume humour.",
  "Monks in Chinese/Japanese/Korean Buddhism wear other colours; similar reverence.",
  ["Costume monks, monks selling products, revered monks' faces on goods (Supreme case 2021)", "Penal Code s.208: wrongfully using monk dress/symbols to deceive"],
  ["Real merit-making scenes with consent; faceless silhouettes for culture explainers"],
  ["Monk characters endorsing products, comic monks, AI-generated 'monk' selling eyewear"],
  "legal", [C+"FashionLaw2021_Supreme", C+"ThaiPenalCode", C+"AVIA2024_ThaiAdMatrix"], "Law text + one enforcement case.", "high"))
S.append(E("th.religious_tattoo_yant", "Sak yant / yantra designs, Buddha tattoos", "thai_religious", "symbol",
  "Protective sacred designs blessed by monks/ajarn; Buddha tattoos considered disrespectful by authorities.",
  "Cool travel souvenir / tattoo art.",
  "", ["Culture Ministry asked parlours to stop Buddha tattoos for tourists", "Yant designs may be copyright-protected (DIP comment in Supreme case)"],
  ["Explained cultural content with practitioners' consent"], ["Decorative yant patterns on product graphics or merch"],
  "respect", [C+"Coconuts_BuddhaMisuse", C+"FashionLaw2021_Supreme"], "Press reports via search summary.", "medium"))
S.append(E("th.temple_wat", "Temple (wat) buildings, ubosot, stupa/chedi", "thai_religious", "icon+symbol",
  "Sacred space; shoes off in chapel; threshold not stepped on (guardian spirit); dress modestly.",
  "Tourist landmark, golden exotic backdrop.", "Temples - also sacred.",
  ["Fashion/product shoots in temples can read as using sacred space for sale", "Stepping on thresholds, pointing feet at images"],
  ["Respectful travel content; 'merit-making' themes"], ["Sexualised poses, product placement on altars, drone shots over ceremonies without permission"],
  "respect", [C+"ThailandFoundation2024", C+"ThaiPenalCode"], "Etiquette guide + law.", "high"))
S.append(E("th.temple_roof_motifs", "Chofa finial, naga bargeboards, gilded gable motifs", "thai_religious", "icon+symbol",
  "Temple identity; chofa often read as Garuda or Hamsa; naga on roof edges and stair rails as guardians.",
  "Generic 'Thai style' ornament.", "",
  ["Lifting sacred architectural motifs into logos or packaging can look like appropriation of temple identity"],
  ["Abstracted, clearly secular Thai patterns (kanok-style lines) with care"], ["Exact chofa/naga temple elements on discount graphics"],
  "respect", ["Thailex"], "Chofa symbolism mainly from dealer/Wikipedia pages (weak).", "low"))
S.append(E("th.lotus", "Lotus (bua, bua luang)", "thai_religious", "symbol",
  "Purity, transcendence, faith; merit-making offering; Buddha seated on lotus; also used at funerals.",
  "Yoga/wellness, calm, beauty.", "Buddhist purity (China, Japan, Korea); purity rising from mud.",
  ["Funeral association in some Thai contexts (lotus in hands of the deceased)", "Lotus under feet / on floor mats can feel disrespectful"],
  ["Calm, eye-rest, wellness, gratitude content"], ["Comic contexts, on shoes/floor, with alcohol"],
  "respect", ["AsianArt_Lotus"], "Museum + Thai press; widely consistent.", "high"))
S.append(E("th.naga", "Naga (serpent deity)", "thai_folk_religious", "symbol",
  "Protector of waters, bringer of rain; temple guardian; associated with Mekong regions; Naga fireballs folklore.",
  "Snake = danger/evil, temptation.", "Chinese dragon/water deities (different creature).",
  ["Western viewers may read a serpent as threatening", "Cartoon nagas for sales can offend believers"],
  ["Water, rain, protection themes in Thai-only folklore stories"], ["Mascot use for promotions"],
  "respect", ["Thailex"], "Lexicon + academic folklore papers (not read).", "medium"))
S.append(E("th.garuda_emblem", "Garuda (Phra Khrut Pha) - national/royal emblem", "thai_royal_state", "symbol",
  "Emblem of the state and monarchy; royal warrant mark granted to selected companies.",
  "Eagle-like mythical bird; may be read as decorative.", "Garuda also in Indonesia (national emblem) and Hindu myth.",
  ["Use without permission violates the Garuda Emblem Act (PM's Office permission needed)", "Using it implies royal endorsement"],
  ["Never - unless a client legally holds the warrant and provides official artwork"], ["Any Garuda drawing in logos, merch, posts"],
  "legal", [C+"NationGaruda2021"], "Official statement reported in press.", "high"))
S.append(E("th.royal_portrait", "Royal portraits, royal family images, royal crests", "thai_royal_state", "icon",
  "Deep respect; displayed in homes/shops; banknotes carry the King's portrait.",
  "Celebrity/public-figure imagery.", "",
  ["Penal Code s.112 (lèse-majesté): defame/insult/threaten King, Queen, Heir, Regent - severe prison terms", "Anything placed above/over, edited, cropped, memed, or juxtaposed with products is high risk", "Stepping on banknotes (King's image) is taboo per etiquette guides"],
  ["Only official royal-occasion notices in the exact style the shop uses (e.g., closure/mourning), with untouched official imagery"],
  ["Any creative edit, humour, AI-generated royal likeness, product next to royal image, royal colours as sales hook"],
  "legal", [C+"ThaiPenalCode", C+"AVIA2024_ThaiAdMatrix"], "Law text; current penalty 3-15 years per press summaries.", "high"))
S.append(E("th.national_flag", "Thai national flag (tri-rong)", "thai_royal_state", "symbol",
  "Nation-Religion-King (red/white/blue as commonly taught); respect at 08:00/18:00 anthem.",
  "National identity.", "",
  ["Flag Act s.54 + Penal Code ss.118/135: tearing, damaging, soiling a flag publicly is an offence", "Flag on shoes, floors, trash, wipes"],
  ["Intact flags in national-day greetings"], ["Distorted, cropped-as-pattern, or stepped-on flags"],
  "legal", [C+"ChulaFlagThesis"], "Thesis summary; colour meaning is common teaching (unsourced here).", "medium"))
S.append(E("th.white_elephant", "White elephant (chang phueak)", "thai_royal_state", "symbol",
  "Royal sovereignty and prestige; historically royal possession.",
  "Idiom 'white elephant' = costly useless burden (English idiom - unsourced here).", "",
  ["English idiom gives the opposite connotation to foreign viewers", "Royal link makes jokey use risky"],
  ["Heritage/history content"], ["Product metaphors ('our white elephant deal')"],
  "respect", ["Nation_NationalSymbols"], "Thai side sourced; English idiom common knowledge, unsourced.", "medium"))
S.append(E("th.elephant", "Elephant (chang) - national animal", "thai_national", "icon+symbol",
  "National animal (Cabinet 2001), strength, loyalty, national pride; National Elephant Day 13 Mar.",
  "Wisdom, memory, gentle giant; 'elephant in the room'.", "Strength; Ganesha (India) = remover of obstacles.",
  ["Elephant rides/performances raise animal-welfare backlash with foreign audiences (craft knowledge, unsourced)", "Tourist cliché overuse"],
  ["Pride, memory, steadiness metaphors; national day greetings"], ["Riding/chain imagery; elephants as cheap 'Thailand' shorthand"],
  "none", ["Nation_NationalSymbols"], "Designation sourced; welfare risk is unsourced craft.", "high"))
S.append(E("th.ratchaphruek", "Ratchaphruek / golden shower tree (Cassia fistula)", "thai_national", "icon+symbol",
  "National flower; yellow blooms associated with unity, loyalty, prosperity (and Buddhism, per summaries).",
  "Pretty yellow flowers (no specific meaning).", "",
  ["Yellow also carries royal/political associations - check timing"], ["Seasonal (Mar-May) Thai-identity visuals"], ["Political-season use"],
  "none", ["Nation_NationalSymbols"], "News summary.", "medium"))
S.append(E("th.sala_thai", "Sala Thai pavilion", "thai_national", "icon",
  "National architecture symbol; rest, hospitality, Thai identity.", "Exotic gazebo.", "",
  ["Low risk"], ["Calm 'Thai place' backgrounds, eye-break scenes"], [],
  "none", ["Nation_NationalSymbols"], "News summary.", "medium"))
S.append(E("th.fighting_fish", "Siamese fighting fish (pla kat)", "thai_national", "icon",
  "National aquatic animal; beauty, fighting spirit.", "Betta pet fish.", "",
  ["Fighting connotation; animal welfare in fish fights"], ["Colourful identity motifs"], ["Fight imagery"],
  "none", ["Nation_NationalSymbols"], "Search summary.", "low"))
S.append(E("th.spirit_house", "Spirit house (san phra phum)", "thai_folk_religious", "icon+symbol",
  "Home/land guardian; offerings daily; syncretism of animism, Brahmanism, Buddhism.",
  "Doll-house shrine; 'quaint'.", "Chinese ancestor/earth-god shrines (possible origin, disputed).",
  ["Mocking, kicking, using as prop; showing it neglected may read as bad omen"], ["Home, place, protection, respect"], ["Comic slapstick near shrine"],
  "respect", ["Wannavithyapa2026"], "Academic papers via search summary.", "medium"))
S.append(E("th.nang_kwak", "Nang Kwak (beckoning lady)", "thai_folk_religious", "icon+symbol",
  "Shop luck: beckons customers and money; kept by registers.", "Unknown figure.", "Compare maneki-neko (Japanese beckoning cat) - similar commercial role.",
  ["Using a sacred-ish figure as sale mascot may feel cheap to believers", "Beckoning gesture direction differs by culture"],
  ["Respectful 'opening day / welcome' shop-culture content"], ["Cartoon Nang Kwak pushing discounts"],
  "respect", ["Thailex"], "Lexicon summary; origin uncertain.", "low"))
S.append(E("th.sai_sin", "Sai sin (white sacred thread)", "thai_religious", "symbol",
  "Blessing/protection; wedding binding; animist + Buddhist roots; wrist strings after blessings.",
  "Friendship bracelet.", "Also Cambodia, Myanmar, Laos.",
  ["Low risk if shown in real ritual context"], ["Gratitude, blessing, new-beginning stories"], ["Cutting/throwing away string as a gag"],
  "respect", ["Thailex"], "Lexicon summary.", "medium"))
S.append(E("th.number_9", "Number 9 (kao)", "numbers", "symbol",
  "Auspicious: homophone with 'step forward/progress'; nine monks at blessings; nine desserts; lucky plates sell for millions.",
  "Neutral.", "Japanese 'ku' can sound like 'suffering' (general knowledge, unverified here); Chinese 9 ~ 'long-lasting' (unverified).",
  ["Japanese viewers may not share the positive reading"], ["Thai promos: 9.9, 99, 'ก้าวหน้า' wordplay"], [],
  "none", ["Naresuan2023_Nine"], "One academic article (text garbled) + strong popular evidence.", "medium"))
S.append(E("num.4", "Number 4", "numbers", "symbol",
  "Neutral in Thai (no strong taboo found this session).",
  "Neutral.", "Unlucky in Chinese, Japanese, Korean: 'four' ~ 'death'; floors labelled F or skipped; Chinese prices avoid 4.",
  ["Price endings, room numbers, '4 for 1' bundles for Chinese/Korean/Japanese customers"], ["Thai-only audiences: fine"], ["Tourist-facing prices ending in 4, '4-piece gift set' for Chinese buyers"],
  "none", ["Yang2012", "KoreaNet2020", "Phillips2001_BMJ"], "Practice well documented; health effects contested.", "high"))
S.append(E("num.8", "Number 8", "numbers", "symbol",
  "Neutral-positive (Chinese-Thai communities share Chinese reading).",
  "Neutral; infinity sign when rotated.", "Chinese: prosperity ('ba' ~ 'fa'); price endings in 8 common in Chinese/Singapore ads.",
  ["Over-use looks like a gimmick to Western viewers"], ["Chinese New Year promos, prices ending 88"], [],
  "none", ["Yang2012"], "Several price-ending studies.", "high"))
S.append(E("num.13", "Number 13 / Friday 13th", "numbers", "symbol",
  "Not traditionally significant.", "Unlucky (Western superstition - common knowledge).", "",
  ["Minor; a few Western viewers notice"], ["Horror/humour for Western audiences"], [],
  "none", [], "Unsourced common knowledge; Smith 2002 BMJ tested day 13 deaths (null) - see Phillips2001_BMJ limitations.", "low"))
# ---------- gestures ----------
S.append(E("gesture.wai", "Wai (palms together, slight bow)", "gestures", "symbol",
  "Greeting, thanks, apology, respect; height/depth depends on status; junior initiates; deeper for monks/Buddha.",
  "Namaste/prayer-hands or 'thank you'; sometimes misread as prayer.", "",
  ["Wrong hierarchy (senior wai-ing junior first) looks odd; foreigners over-wai service staff", "Wai with objects in hand, or as a jokey 'please buy'"],
  ["Thank-you posts, apology notices, staff greeting customers"], ["Mascots wai-ing products; mocking exaggerated wai"],
  "respect", [C+"ThailandFoundation2024", C+"Scroope2025"], "Etiquette guides consistent.", "high"))
S.append(E("gesture.head_touch", "Touching someone's head / objects over heads", "gestures", "index",
  "Head most sacred; touching (even children's) or passing objects over heads is offensive.",
  "Affectionate pat on head (children, friends).", "Also sensitive in parts of Asia.",
  ["Western 'pat on head' gesture reads as disrespect in Thailand"], [], ["Scenes where an adult pats a Thai child/elder; product held over a person's head"],
  "respect", [C+"ThailandFoundation2024", C+"Scroope2025"], "Consistent guides.", "high"))
S.append(E("gesture.feet_soles", "Feet / soles pointing, feet on tables", "gestures", "index",
  "Feet lowest and least clean: don't point soles at people or Buddha images; don't move things with feet; don't step over pillows/books/food.",
  "Feet up = relaxed; casual.", "Feet also impolite in much of Asia and Middle East (general).",
  ["Relaxed 'feet on desk' lifestyle shot is rude to Thai viewers"], [], ["Feet toward camera/Buddha, shoes on table, pointing with foot"],
  "respect", [C+"ThailandFoundation2024", C+"Scroope2025"], "Consistent guides.", "high"))
S.append(E("gesture.pointing", "Pointing with index finger", "gestures", "index",
  "Rude/accusatory toward people; prefer open hand or chin/lip gesture.", "Normal for directing attention.", "Impolite in several Asian contexts (general).",
  ["Character pointing at customer reads accusatory"], ["Pointing at objects/screens is mild"], ["Pointing at people, at Buddha images"],
  "none", [C+"Scroope2025"], "Cultural Atlas.", "medium"))
S.append(E("gesture.beckon", "Beckoning (come here)", "gestures", "symbol",
  "Palm-down, fingers curled toward self; palm-up finger curl is offensive (used for animals).",
  "Palm-up finger curl is normal.", "Palm-down beckon common in East/Southeast Asia (general).",
  ["Western palm-up beckon offends Thais; Thai palm-down beckon can look like 'go away' to Westerners"], ["Show palm-down for Thai content"], ["Palm-up beckon"],
  "none", [C+"Scroope2025", "MatsumotoHwang2013"], "Guides + emblem research shows form/meaning varies.", "medium"))
S.append(E("gesture.ok_ring", "OK ring (thumb + index circle)", "gestures", "symbol",
  "Understood as OK by many (borrowed).", "OK/fine (US); 'precision'.", "Japan: money.",
  ["Obscene in Brazil (inverted); other meanings in parts of Europe; co-opted by some hate groups online (unsourced here)"], ["Avoid as hero gesture"], ["Mixed-audience ads relying on the gesture"],
  "none", ["MatsumotoHwang2013", "Maricopa_Nonverbal"], "Emblem study + textbook.", "medium", other="Brazil: obscene"))
S.append(E("gesture.thumbs_up", "Thumbs-up", "gestures", "symbol",
  "Generally understood as 'good' (borrowed from global media).", "Well done / approval.", "",
  ["Insulting in Greece and some other countries", "In VR command study, Chinese users preferred OK sign to confirm"], ["Thai-only casual posts"], ["Tourist-facing ads as the main message"],
  "none", ["Maricopa_Nonverbal", "MatsumotoHwang2013"], "Textbook claim; country list incomplete.", "medium", other="Greece etc.: insult"))
S.append(E("gesture.v_sign", "V sign (peace / victory)", "gestures", "symbol",
  "Cute photo pose (very common in Thai selfies).", "Peace/victory; UK/Aus/NZ palm-inward = insult.", "Common cute photo pose (Japan, Korea, China).",
  ["Palm-inward version offensive in UK/Commonwealth"], ["Palm-out in casual Thai/Asian content"], ["Palm-inward"],
  "none", [], "Unsourced common knowledge - verify before relying.", "low"))
S.append(E("gesture.smile_nod", "Smile and nod", "gestures", "index",
  "Smile can mask awkwardness/sadness/apology; nod = 'I hear you', not agreement.", "Smile = happy; nod = yes.", "",
  ["Foreign viewers may misread a Thai character's apologetic smile as indifference"], ["Subtle emotion in Mint & Tao via context"], ["Captioning a smile as 'happy' without context"],
  "none", [C+"Scroope2025"], "Cultural Atlas; see emotions/README section 2.10 on face reading.", "medium"))
# ---------- East Asian / cross-cultural ----------
S.append(E("ea.clock_gift", "Clock as gift", "gift_objects", "symbol",
  "Neutral for most Thais (Chinese-Thai families may share taboo).", "Thoughtful gift.", "Chinese: 'give a clock' ~ 'attend a deathbed/funeral' - wish of death, esp. to elders.",
  ["Watch/clock gift promos for Chinese customers"], [], ["'Gift a clock' campaigns for Chinese New Year"],
  "none", ["SCMP2025_GiftTaboos"], "Newspaper explainer.", "medium"))
S.append(E("ea.umbrella_gift", "Umbrella as gift", "gift_objects", "symbol",
  "Neutral.", "Neutral.", "Chinese: 'umbrella' ~ 'separate' - bad for couples/friends.",
  ["Couples promos for Chinese buyers"], [], ["Free umbrella with couple's purchase for Chinese market"],
  "none", ["SCMP2025_GiftTaboos"], "Newspaper explainer.", "medium"))
S.append(E("ea.chrysanthemum", "Chrysanthemum (esp. white/yellow)", "flowers", "symbol",
  "Generally neutral/decorative.", "Autumn, cheer (US); funerals in parts of Europe (unsourced).", "China/Korea/Japan: funeral flower (white); also Japanese imperial crest (yellow 16-petal, unsourced).",
  ["Giving chrysanthemums = funeral connotation for Chinese viewers"], [], ["Chrysanthemum bouquets as gift imagery for Chinese/Korean audiences"],
  "none", ["SCMP2025_GiftTaboos"], "Gift-avoid lists; imperial crest unsourced.", "medium"))
S.append(E("ea.red_ink_name", "Name written in red", "text_colour", "symbol",
  "Some Thais also avoid writing names in red (unverified).", "Red ink = correction/urgent.", "Korea: writing a living person's name in red is taboo (death records/wreaths); seal stamps exempt; similar beliefs elsewhere in East Asia (unverified).",
  ["Red customer names in thank-you graphics, winner announcements"], [], ["Korean (and East Asian) customer names in red"],
  "none", ["KoreaNet2020"], "Volunteer-reporter article; Thai practice unverified.", "medium"))
S.append(E("ea.shoes_gift", "Shoes as gift", "gift_objects", "symbol",
  "Neutral (feet low - giving shoes to elders may feel odd, unsourced).", "Neutral.", "Korea: recipient will 'run away'; China: on avoid lists.",
  [], [], ["Couple-gift shoe promos for Korean audiences"],
  "none", ["KoreaNet2020", "SCMP2025_GiftTaboos"], "Folk-belief reporting.", "low"))
S.append(E("x.swastika", "Swastika / manji", "religious_cross_cultural", "symbol",
  "Seen on some Buddhist/Hindu items; auspicious.", "Nazi hate symbol (dominant reading since WWII).", "Japan: manji marks temples on maps; Hindu/Buddhist/Jain auspicious sign.",
  ["Western viewers read Nazism instantly regardless of orientation or context"], ["Explained in religious-history content only"], ["Any decorative use; even incidental in temple backgrounds for foreign audiences - crop or explain"],
  "respect", ["Britannica_Swastika"], "Encyclopedia + ADL agree.", "high"))
S.append(E("x.dragon", "Dragon", "animals_mythic", "icon+symbol",
  "Chinese-Thai: auspicious (Chinese New Year, Yaowarat); naga is a separate Thai creature.", "Menace, chaos, evil (Revelation); also heroic fantasy pets in modern media.", "China: benevolent power, water, emperor; 'loong' naming debate.",
  ["Aggressive dragon art for Western viewers; Western 'slay the dragon' metaphors for Chinese viewers"], ["Chinese New Year promos with friendly, dancing dragons"], ["Dragon as villain in content aimed at Chinese customers"],
  "none", ["CGTN2024_Dragon"], "State-media comparison; no perception study.", "medium"))
S.append(E("x.fair_skin", "Light vs dark skin as before/after or status cue", "body_representation", "symbol",
  "Fair skin long associated with beauty/status in Thai advertising - and now a backlash trigger (colourism).", "Racism/colourism red flag.", "Fair-skin ideal common, increasingly criticised.",
  ["Seoul Secret 2016 'white makes you a winner' ad pulled after outcry"], [], ["Darkening/lightening skin to show 'better', winners lighter than losers, filters that whiten faces"],
  "respect", [C+"SlutskiyHamilton2017"], "Case + content analysis.", "high"))
S.append(E("x.archetype_light_dark", "Light vs darkness (dawn, lamp, shadow)", "archetypal", "icon+index",
  "Light = wisdom/merit (Buddhist 'light of Dhamma'), clarity; Loy Krathong/candles (unsourced).", "Good vs evil, hope, revelation.", "Similar broad pattern.",
  ["Broadly shared, but specific colour/lamp meanings vary"], ["Eyesight/clarity metaphors (clear vision = light)"], ["Assuming 'universal archetype' means no test is needed"],
  "none", ["ArchetypeReplication2013"], "Archetype evidence weak; light-dark is a common experience-based metaphor.", "medium"))
S.append(E("x.archetype_height", "Height / up-down (high = power, sacred)", "archetypal", "index+symbol",
  "Very strong: head high, feet low; Buddha and royalty placed highest; elders' heads not looked down on.", "Up = good/power (common metaphor).", "Similar.",
  ["In Thailand vertical placement is a respect rule, not just a metaphor - a product placed above a Buddha image or royal portrait is offensive"], ["Compose respect: elders/teachers higher in frame"], ["Product above sacred items; looming camera over elders in sincere scenes"],
  "respect", [C+"ThailandFoundation2024", C+"Scroope2025"], "Etiquette guides; conceptual-metaphor claim general.", "high"))
# ---------- semiotic examples useful for production ----------
S.append(E("sign.steam_index", "Steam from cup/food", "everyday_index", "index",
  "Freshly made, warmth, care (e.g., morning coffee before shop opens).", "Same.", "Same.",
  ["Low"], ["Showing 'fresh / just made / warm welcome' without words"], [],
  "none", ["SEP_PeirceSemiotics"], "Index type per Peirce (smoke-fire); reading itself untested.", "medium"))
S.append(E("sign.market_bag_freshness", "Open shopping bag spilling fresh produce", "everyday_connotation", "icon+symbol",
  "Market freshness, home cooking (Thai talad).", "Freshness, domestic preparation (Barthes' Panzani).", "Similar.",
  ["Connotation depends on cultural knowledge (Barthes: 'Italianicity' invisible to Italians)"], ["Freshness/'new arrivals' visual"], [],
  "none", ["Barthes1977"], "Classic semiotic analysis, not tested.", "medium"))
S.append(E("sign.eye_chart", "Eye chart (Snellen letters / Thai E-chart)", "eyewear_domain", "icon+symbol",
  "Eye test, optometrist, 'time to check your eyes'.", "Same.", "Same (letters vary).",
  ["Using a chart with wrong letters/medical claims may imply clinical service the shop does not offer"], ["Eye-check reminders, 'how clear is your vision?' hooks"], ["Claims of diagnosis"],
  "none", [], "Craft/common knowledge; untested. Links: marketing/ETHICS_AND_THAI_AD_RULES.md (health claims).", "low"))
S.append(E("sign.blur_focus", "Blur -> sharp focus transition", "eyewear_domain", "icon",
  "Seeing clearly with right glasses.", "Same; also 'realisation'.", "Same.",
  ["Exaggerated 'cure' implication if paired with health claims"], ["Product clips: before/after clarity as experience, not medical claim"], ["Implying glasses fix eye disease"],
  "none", ["SEP_PeirceSemiotics"], "Iconic simulation of experience; untested.", "low"))
S.append(E("sign.warning_triangle", "Warning triangle / safety pictograms", "pictogram", "symbol",
  "Caution (international ISO convention).", "Same.", "Same.",
  ["Pictograms below ~67% comprehension are not safe to stand alone (ISO 3864 criterion)"], ["Safety/eye-strain warnings with text"], ["Icon-only safety messages"],
  "none", ["ISO9186_1_2014", "SafetySignComp_PMC10258412"], "Standard method + criterion via secondary.", "medium"))
S.append(E("rhet.juxtaposition", "Visual figure: juxtaposition (two things side by side)", "visual_rhetoric", "figure",
  "Works if both objects are familiar to Thai viewers.", "Same.", "Same.",
  ["Unrelated pairs are processed slowest and liked least"], ["Glasses beside a matching object (shape rhyme) - easiest metaphor"], ["Obscure pairings"],
  "none", ["PhillipsMcQuarrie2004", "Lagerwerf2023"], "Typology + experiments.", "medium"))
S.append(E("rhet.fusion", "Visual figure: fusion / hybrid (two objects merged)", "visual_rhetoric", "figure",
  "Engaging for followers who stop to look.", "Same.", "Same.",
  ["Harder to comprehend; complexity lowers liking past a point"], ["Hero images for engaged audience"], ["Fast-scroll ads, tourist audiences"],
  "none", ["vanMulken2010", "PhillipsMcQuarrie2004"], "Hybrids preferred in one European study; harder in another - mixed.", "low"))
S.append(E("rhet.replacement", "Visual figure: replacement (expected object swapped)", "visual_rhetoric", "figure",
  "Needs strong context or caption anchorage.", "Same.", "Same.",
  ["Highest risk of non-comprehension, especially for viewers lacking cultural competency"], ["Only with a caption that anchors"], ["Standalone cross-cultural ads"],
  "none", ["PhillipsMcQuarrie2004", "McQuarrieMick1999"], "Complexity ordering from typology; cultural competency effect.", "low"))
# ---------- colours (link only) ----------
S.append(E("colour.link", "Colour symbolism (day colours, black/white mourning, red+gold, saffron, yellow/royal)", "colour", "symbol",
  COLOR, COLOR, COLOR, ["Royal colours and mourning periods are timing-sensitive"], ["Look up before choosing palette"], [],
  "respect", [], "Covered in ADVANCED_COLOR_SCIENCE.md 7.2 - not repeated here.", "medium"))

ids = [s["id"] for s in S]
assert len(ids) == len(set(ids))
out = {"module": "M12", "version": "2026-11-25", "schema_note": "meanings by culture; source_keys without prefix -> semiotics/sources.json, 'culture:' prefix -> culture/sources.json; restriction: none|respect|legal; test_status always 'untested' until a comprehension test (see README section 5) is logged", "count": len(S), "symbols": S}
json.dump(out, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(S))
