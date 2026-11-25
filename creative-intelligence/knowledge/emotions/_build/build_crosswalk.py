"""Build ../emotion_crosswalk.json from the two existing emotion libraries.

Step 1 (programmatic): exact id match between EMOTION_LIBRARY.json (voice) and
EMOTION_VISUAL_LIBRARY.json (visual), then a name-token match for leftovers.
Step 2 (manual review): the overrides below — visual-only atmosphere ids linked to
their nearest voice id(s) and flagged "uncertain".
Theory notes are short pointers into README.md (M02); source keys -> ../sources.json.
Run: python build_crosswalk.py
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "../../../.."))
V = json.load(open(os.path.join(ROOT, ".claude/skills/ai-voice-director/EMOTION_LIBRARY.json"), encoding="utf-8"))["emotions"]
W = json.load(open(os.path.join(ROOT, ".claude/skills/ai-visual-artist/EMOTION_VISUAL_LIBRARY.json"), encoding="utf-8"))["emotions"]
vi = {e["id"]: e for e in V}
wi = {e["id"]: e for e in W}

# kind = what sort of thing the entry is, in theory terms (see README "unified id scheme")
FAMILY = {
    "joy": ("state", "Positive-valence family. Basic-emotion view: happiness is one of six classic categories (Ekman1992). Constructionist view: a category built on pleasant core affect (Russell2003, Barrett2017). Cowen & Keltner split it further (joy, amusement, satisfaction, excitement...) along continuous gradients (CowenKeltner2017)."),
    "sadness": ("state", "Appraisal: loss / irrevocable goal failure with low coping potential (Lazarus1991, Moors2013). Sadness episodes tend to last longest of many emotions, driven by event importance and rumination (VerduynLavrijsen2015)."),
    "anger": ("state", "Appraisal: goal obstruction blamed on another agent, often unfairness, with coping potential high enough to confront (Lazarus1991, Moors2013). The scowl is produced in only a minority of real anger episodes, so never infer anger from a face alone (Barrett2019)."),
    "fear": ("state", "Appraisal: threat, uncertainty, low control (Moors2013). Anxiety = anticipated harm + doubt about coping (Lazarus1991). The 'gasping' fear face was read as threat/anger by Trobriand Islanders (Crivelli2016) — culture-dependent reading."),
    "disgust": ("state", "Basic emotion family in Ekman1992; contempt is the contested 7th. Disgust faces had weak cross-cultural support in posed studies reviewed by Barrett2019."),
    "surprise": ("state", "Appraisal of novelty/unexpectedness, valence-neutral until a second appraisal tips it (Moors2013, Scherer2009). Basic in Ekman1992; some constructionists treat it as a cognitive state rather than an emotion."),
    "cognitive": ("epistemic", "Knowledge emotions (interest, confusion, curiosity) — appraisals of novelty and comprehensibility; present in CowenKeltner2017 (interest, confusion) but outside Ekman's six."),
    "awe": ("state", "Prototype = perceived vastness + need for accommodation (KeltnerHaidt2003); flavours: threat, beauty, ability, virtue, supernatural (Allen2018). Linked to 'small self' and prosociality (Piff2015) — mechanism has a reported failed replication; see README."),
    "low": ("low_arousal", "Low-arousal states. Boredom is a Cowen-Keltner category; fatigue/drowsiness are bodily states that colour core affect (Russell2003) rather than emotions proper."),
    "calm": ("state", "Low-arousal positive (LAP). Valued more as an ideal state by East Asian samples than by European Americans (TsaiKnutsonFung2006) — relevant to Thai 'jai yen' (cultural reading, not tested in Thai samples here)."),
    "love": ("state", "Attachment/affiliation family; not among Ekman's six. Cowen & Keltner list adoration, romance and sexual desire separately (CowenKeltner2017)."),
    "social": ("social", "Social / interpersonal emotions whose appraisal involves another person's outcomes or standing (envy, jealousy, gratitude, schadenfreude). Gratitude: find-remind-bind (Algoe2012). Envy splits into benign vs malicious (vandeVen2009)."),
    "relief": ("state", "Appraisal: a feared bad outcome did not happen (goal-congruent change from expected threat) (Moors2013)."),
    "hope": ("state", "Appraisal: desired outcome still uncertain (Lazarus1991; Moors2013 'certainty' dimension)."),
    "will": ("motivational", "Action-readiness / approach states (determination, confidence, urgency). Frijda-style action tendencies within appraisal theory (Moors2013); not classic discrete emotions."),
    "selfconscious": ("self_conscious", "Self-conscious emotions need self-representation and internal attribution (TracyRobins2004). Shame = stable/global self ('I am bad'); guilt = specific behaviour ('I did bad'); embarrassment = public-self exposure (TracyRobins2004, TangneyStuewigMashek2007). Embarrassment has a distinct appeasement display: gaze down, controlled smile, face touch (Keltner1995)."),
    "regret": ("self_conscious", "Counterfactual, self-blaming family close to guilt (internal, specific attribution) (TracyRobins2004). Remorse/apology = guilt's reparative action tendency (TangneyStuewigMashek2007)."),
    "nostalgia": ("blend", "Typically a mixed (bittersweet) state; mixed emotions are a robust measurable experience (BerriosTotterdellKellett2015). Also a Cowen-Keltner category."),
    "vulnerable": ("state", "Not a standard category in the reviewed taxonomies; reads as anxiety + exposure of the self (fear + self-conscious appraisal). Treat as a constructed blend."),
    "care": ("social", "Other-oriented states (empathy, compassion, sympathy) and caregiving speech acts (reassurance, pleading, encouragement). Empathic pain is a Cowen-Keltner category; contagion via mimicry is the low-level route (Hatfield1993)."),
    "stance": ("stance", "Communicative stances (sarcasm, irony, suspicion...), not emotions in the theoretical sense: they are attitudes shown in how something is said. Inner emotion must not be inferred from them (Barrett2019)."),
    "suppressed": ("regulated", "Expressive suppression (Gross process model, response-focused): reduces visible expression but not felt experience, raises physiology and impairs memory (Gross2002); its social cost is smaller for people with Asian values (ButlerLeeGross2007). Story use: the audience sees the leak, the character keeps the mask."),
    "hidden": ("regulated", "Masking one emotion with another (display rules; Pothisitthiporn2016 on Thai smiles when not happy). Same mechanism as 'suppressed'."),
    "mixed": ("blend", "Co-activation of opposite-valence emotions; robust in experiments (d=0.77, 63 studies) (BerriosTotterdellKellett2015). Supports bivariate (ESM) over strictly bipolar circumplex models."),
    "transition": ("transition", "Emotion dynamics: emotions change by re-appraisal of the event (Moors2013 'continuous and recursive'); inertia and variability are person-level dynamics (KuppensVerduyn2017). Memory of the whole episode is weighted by peak and end (FredricksonKahneman1993)."),
    "conflict": ("blend", "Simultaneous competing appraisals of one event (e.g. love + anger at the same person); appraisal theory allows parallel episodes (Moors2013)."),
    "performance": ("register", "Performance registers (storyteller, sales, expert, condolence): a delivery style chosen for a communicative goal, not an inner emotion. Listener emotion may follow via contagion (Hatfield1993) but the label describes the speaker's act."),
    "visual": ("atmosphere", "Scene atmosphere / mood for an image, not a person's emotion. Constructionist framing: a scene supplies affective quality (pleasant/unpleasant, arousing/calm) that viewers may categorise as an emotion (Russell2003)."),
}
OVERRIDE = {
    "joy.pride": "Pride is self-conscious (internal attribution of success). Tracy & Robins split achievement-oriented ('authentic', unstable/specific) vs hubristic (stable/global) pride; this entry does not specify which (TracyRobins2004).",
    "social.envy": "Envy splits into benign (level-up, self-improvement) vs malicious (pull-down, harm the other) — appraisal of deservingness tips it (vandeVen2009). Entry does not specify the type.",
    "social.gratitude": "Gratitude finds, reminds and binds relationships (Algoe2012); a positive moral emotion (TangneyStuewigMashek2007). Thai 'bun khun' (indebted gratitude) is related but not covered.",
    "social.schadenfreude": "Linked to malicious envy and deservingness appraisals (vandeVen2009 discusses implications for Schadenfreude).",
    "selfconscious.shame": "Shame = negative evaluation of the stable, global self; linked to hiding, defensiveness, anger (TracyRobins2004, TangneyStuewigMashek2007). Do not merge with guilt.",
    "selfconscious.guilt": "Guilt = specific behaviour; motivates repair and apology (TangneyStuewigMashek2007). Guilt episodes outlast shame episodes in recall data (VerduynLavrijsen2015).",
    "selfconscious.embarrassment": "Distinct appeasement display: gaze down, controlled smile, head turn, face touch — a sequence over ~seconds, not a single face (Keltner1995).",
    "awe.awe": "Vastness + accommodation (KeltnerHaidt2003). Distinct category in CowenKeltner2017 with a gradient to aesthetic appreciation.",
    "awe.childlike_wonder": "Awe + interest blend; beauty/ability flavour of awe (Allen2018).",
    "fear.dread": "Close to threat-based awe when the source is vast (KeltnerHaidt2003 flavours) — uncertain overlap.",
    "fear.anxiety": "Anticipated harm + doubt about coping (Lazarus1991). Anxiety episodes last longer than fear episodes (VerduynLavrijsen2015).",
    "care.empathy": "Partial match to Cowen-Keltner 'empathic pain'; low-level route is mimicry-feedback contagion (Hatfield1993). Feedback effects exist but are small (ManySmiles2022).",
    "social.deference_krengjai": "Thai kreng jai: reluctance to impose / deference; many meanings documented in discourse analysis (WyattPromkandorn2012). It is a socio-moral stance with feelings, not a basic emotion.",
    "social.krengjai_refusal": "Kreng jai expressed as indirect refusal; display-rule smiles when not happy are documented for Thais (Pothisitthiporn2016).",
    "suppressed.forced_cheer": "Thai participants smiled more than Japanese when greeting/apologising while not happy (Pothisitthiporn2016) — a social smile, not evidence of joy (Barrett2019).",
    "calm.serenity": "LAP ideal affect (TsaiKnutsonFung2006); closest existing entry to Thai 'jai yen' but not identical (jai yen is a valued trait/regulation style).",
    "calm.acceptance": "Reads as the outcome of reappraisal (antecedent-focused regulation) rather than suppression (Gross1998, Gross2002).",
    "sadness.resignation": "Low coping-potential appraisal (Moors2013); distinguish from 'acceptance' (reappraised, settled).",
    "anger.indignation": "Other-condemning moral anger (unfairness appraisal; Lazarus1991 'unfairly slighted'). Partial match for 'moral outrage'.",
    "disgust.contempt": "Contempt = looking down on another; basic status contested (Ekman1992 discusses it; weak face evidence per Barrett2019).",
    "transition.fear_to_relief": "Classic peak-end shape: a relief ending dominates the remembered episode (FredricksonKahneman1993).",
    "transition.denial_to_acceptance": "Narrative of reappraisal over time; regulation is stage-wise identify-select-implement (Gross2015).",
    "mixed.laughing_through_tears": "Happy-sad co-activation is the most-studied mixed pair (BerriosTotterdellKellett2015).",
    "mixed.bittersweet_farewell": "Happy-sad mixed emotion (BerriosTotterdellKellett2015).",
    "nostalgia.nostalgia": "Cowen-Keltner category; typically bittersweet (mixed).",
}
# Manual review for visual-only ids (no exact voice id)
VISUAL_ONLY = {
    "visual.mystery": (["cognitive.curiosity", "cognitive.interest"], "uncertain", "mood.mystery"),
    "visual.warmth": (["love.affection", "love.tenderness"], "uncertain", "mood.warmth"),
    "visual.majesty": (["awe.awe", "awe.admiration"], "uncertain", "mood.majesty"),
    "visual.peaceful_solitude": (["calm.serenity"], "uncertain", "mood.peaceful_solitude"),
    "visual.coziness": (["joy.contentment", "calm.serenity"], "uncertain", "mood.coziness"),
    "will.courage": (["will.determination", "hidden.bravado_over_fear"], "uncertain", "will.courage"),
}

def fam(i):
    return i.split(".")[0]

def toks(name):
    return set(re.findall(r"[a-z]+", name.lower()))

out = []
for i in sorted(set(vi) | set(wi)):
    if i in vi and i in wi:
        match, voice, visual, uid = "exact_id", [i], [i], i
        n1, n2 = vi[i]["name_en"], wi[i]["name_en"]
        if toks(n1) != toks(n2):
            match = "exact_id_name_variant"
    elif i in VISUAL_ONLY:
        voice, match, uid = VISUAL_ONLY[i][0], VISUAL_ONLY[i][1], VISUAL_ONLY[i][2]
        visual = [i]
    elif i in vi:
        match, voice, visual, uid = "voice_only", [i], [], i
    else:
        match, voice, visual, uid = "visual_only_unmatched", [], [i], i
    kind, note = FAMILY.get(fam(i), ("state", ""))
    if i == "will.courage":
        kind, note = "motivational", "Courage = acting despite fear: a fear appraisal plus approach action tendency (Moors2013 components); not a discrete emotion in the reviewed taxonomies."
    if i == "cognitive.hesitation":
        kind = "epistemic"
    notes = OVERRIDE.get(i, note)
    vad = vi[i]["vad"] if i in vi else None
    out.append({
        "unified_id": uid,
        "voice_ids": voice,
        "visual_ids": visual,
        "kind": kind,
        "match": match,
        "name_en": (vi.get(i) or wi.get(i))["name_en"],
        "vad_from_voice_lib": vad,
        "theory_notes": notes,
    })

dst = os.path.join(HERE, "..", "emotion_crosswalk.json")
json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
from collections import Counter
print(len(out), Counter(o["match"] for o in out), Counter(o["kind"] for o in out))
print("empty notes:", [o["unified_id"] for o in out if not o["theory_notes"]])
