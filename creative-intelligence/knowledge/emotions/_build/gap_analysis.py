import json, re, sys
import os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")) + "/"
v = json.load(open(ROOT+".claude/skills/ai-voice-director/EMOTION_LIBRARY.json", encoding="utf-8"))["emotions"]
w = json.load(open(ROOT+".claude/skills/ai-visual-artist/EMOTION_VISUAL_LIBRARY.json", encoding="utf-8"))["emotions"]
def toks(e):
    s = (e["id"] + " " + e["name_en"]).lower()
    return set(re.findall(r"[a-z]+", s))
lib = {}
for e in v: lib.setdefault(e["id"], set()).update(toks(e))
for e in w: lib.setdefault(e["id"], set()).update(toks(e))
# reference concepts from the research: name -> (source key, synonym tokens)
REF = {
 # Cowen & Keltner 2017, 27 categories
 "admiration":("CowenKeltner2017",["admiration"]),"adoration":("CowenKeltner2017",["adoration"]),
 "aesthetic appreciation":("CowenKeltner2017",["aesthetic","beauty"]),"amusement":("CowenKeltner2017",["amusement"]),
 "anger":("CowenKeltner2017",["anger"]),"anxiety":("CowenKeltner2017",["anxiety"]),"awe":("CowenKeltner2017",["awe"]),
 "awkwardness":("CowenKeltner2017",["awkwardness","awkward"]),"boredom":("CowenKeltner2017",["boredom"]),
 "calmness":("CowenKeltner2017",["calm","serenity"]),"confusion":("CowenKeltner2017",["confusion"]),
 "craving":("CowenKeltner2017",["craving","desire"]),"disgust":("CowenKeltner2017",["disgust"]),
 "empathic pain":("CowenKeltner2017",["empathic","empathy"]),"entrancement":("CowenKeltner2017",["entrancement","trance","absorption"]),
 "excitement":("CowenKeltner2017",["excitement"]),"fear":("CowenKeltner2017",["fear"]),"horror":("CowenKeltner2017",["horror"]),
 "interest":("CowenKeltner2017",["interest"]),"joy":("CowenKeltner2017",["joy","happiness"]),"nostalgia":("CowenKeltner2017",["nostalgia"]),
 "relief":("CowenKeltner2017",["relief"]),"romance":("CowenKeltner2017",["romantic","romance"]),"sadness":("CowenKeltner2017",["sadness"]),
 "satisfaction":("CowenKeltner2017",["satisfaction","contentment"]),"sexual desire":("CowenKeltner2017",["sexual"]),
 "surprise":("CowenKeltner2017",["surprise"]),
 # self-conscious / moral (TracyRobins2004, TangneyStuewigMashek2007, Keltner1995)
 "shame":("TangneyStuewigMashek2007",["shame"]),"guilt":("TangneyStuewigMashek2007",["guilt"]),
 "embarrassment":("Keltner1995",["embarrassment"]),"authentic pride":("TracyRobins2004",["authentic"]),
 "hubristic pride":("TracyRobins2004",["hubristic","hubris","arrogance"]),"humiliation":("TracyRobins2004",["humiliation"]),
 "elevation":("TangneyStuewigMashek2007",["elevation"]),"gratitude":("Algoe2012",["gratitude"]),
 "benign envy":("vandeVen2009",["benign"]),"malicious envy":("vandeVen2009",["malicious"]),
 "moral outrage":("TangneyStuewigMashek2007",["outrage","indignation"]),
 "contempt":("Ekman1992",["contempt"]),"compassion":("TangneyStuewigMashek2007",["compassion"]),
 "threat-based awe":("KeltnerHaidt2003",["eerie","dread"]),
 # Lazarus 1991 relational themes
 "hope":("Lazarus1991 article + book (book not read)",["hope"]),"jealousy":("Lazarus 1991 book (not read)",["jealousy"]),"love":("Lazarus 1991 book (not read)",["love","affection","tenderness"]),
 "hate":("Lazarus 1991 book (not read)",["hate","hatred"]),
 # dynamics / mixed
 "mixed (happy-sad)":("BerriosTotterdellKellett2015",["bittersweet","laughing"]),
 "ambivalence (generic)":("BerriosTotterdellKellett2015",["ambivalence","ambivalent"]),
 "being moved (kama muta) [not researched this session]":("",["moved","kama"]),
 # Thai / SE Asian cultural concepts
 "kreng jai":("WyattPromkandorn2012",["krengjai"]),"sanuk (fun-pleasure)":("Komin1990; Scroope2025",["sanuk"]),
 "jai yen (cool heart, equanimity)":("Scroope2025 (harmony); ThaiES16_2026",["jaiyen","equanimity"]),
 "nam jai (generosity of heart) [no source found this session]":("",["namjai"]),
 "sia na (loss of face)":("Scroope2025",["face","sia"]),
 "bun khun (gratitude-indebtedness) [no source found this session]":("",["bunkhun","indebtedness"]),
 "mai pen rai (letting go)":("Scroope2025",["maipenrai","letting"]),
 "low-arousal positive (calm content)":("TsaiKnutsonFung2006",["serenity","contentment","calm"]),
}
rows = []
for name, (src, syn) in REF.items():
    hits = sorted(i for i, t in lib.items() if t & set(syn))
    rows.append((name, src, hits))
missing = [r for r in rows if not r[2]]
covered = [r for r in rows if r[2]]
if "--md" in sys.argv:
    print("| concept | source key | library ids that match (programmatic) |\n|---|---|---|")
    for n, s, h in rows: print(f"| {n} | {s} | {', '.join(h) if h else '**MISSING**'} |")
print(f"\nreference concepts: {len(rows)}; covered: {len(covered)}; missing: {len(missing)}")
print("MISSING:", "; ".join(n for n, _, _ in missing))
