# Script Analysis — do this before choosing any emotion

Emotion is a *result* of what a character wants in a situation, not a label on a line. Punctuation ("!", "…") and
single words ("ขอบคุณ", "ไม่เป็นไร") are weak evidence: "ไม่เป็นไร" can be relief, a brave mask, a krengjai refusal or
cold anger. Read the whole scene, then fill the analysis block for each line (`analysis` in VOICE_DIRECTION_SCHEMA.json).
The questions come from acting practice (given circumstances, objective/intention, subtext — Stanislavski tradition,
taught in most drama schools) — they are craft, not science [Artistic].

## 1. Scene level (once per scene)
| question | write down |
|---|---|
| What happened just before? | the event the scene starts from (EP01: Ton locked the door himself; the bell rang at 2 a.m.) |
| Where / when / who can hear? | room size, time of night, whether anyone else listens → loudness and intimacy |
| What is at stake? | what is lost if the speaker fails |
| Scene arc | start state → turning point → end state, in one line |
| Previous / next scene | emotional level we come from and must hand over (avoid resetting to neutral every line) |

## 2. Line level (every line)
1. **Speaker → listener, relationship.** Age/status gap decides politeness (Thai: ครับ/ค่ะ/จ้ะ/นะลูก, pronouns ผม/หนู/ยาย/พ่อหนุ่ม) [BrownLevinson1987 for the general politeness model; Thai particles: see THAI_PRONUNCIATION.md].
2. **Goal (a verb).** *To calm, to warn, to get forgiveness, to sell, to hide, to tease, to test.* One per line; a change of verb = a new beat.
3. **What the speaker wants the listener to feel.**
4. **The unsaid.** What they do not dare to say — this is the subtext the voice must leak.
5. **Outer vs inner emotion.** Outer = what they show; inner = what they feel. If they differ, the line is *suppressed / hidden / masked*: set `emotion.primary` = inner, `emotion.masked_by` = outer, and decide **where the inner leaks** (one word, the breath before the line, the ending).
6. **Beat & turning point.** Mark lines where the intention changes (`turning_point: true`). Only these get the biggest prosody change; neighbours change less.
7. **Continuity.** Intensity normally moves in steps of ≤ 0.3 between consecutive lines of one character unless an event in the scene justifies a jump (a shock, a reveal).
8. **Choose the emotion from EMOTION_LIBRARY.json**, then pick ONE of its `variants` that fits this character's bible (a timid character shows anger as cold, tight and quiet, not loud).
9. **Write the direction as action + intent + how**, e.g. "comfort him without letting him hear you are scared — keep the voice low and even, the fear only shows as a quick breath before 'ไม่เป็นไร'". Never only "sad" or "happy".

## 3. Red flags (re-analyse)
- every line of a scene has a different emotion → the scene has no through-line;
- the most intense emotion is on the first line → nowhere to build;
- emotion picked from a keyword ("ร้องไห้" in the line → sob) while the character is *telling* about crying calmly;
- polite words + anger: decide whether it is *polite anger* (suppressed) or real politeness — the context decides, not the words;
- narrator lines directed like character lines (the narrator colours, the character lives it).

## 4. Worked example (ร้านแว่นตีสอง EP01, line 7)
Line: "ปิดแล้วครับยาย… เอ่อ ยายเข้ามาได้ยังไงครับ"
- before: bell at 2 a.m., door locked by Ton; an old woman stands inside.
- speaker Ton (28) → Jan (80, stranger, maybe a ghost); relationship: elder → polite ครับ, ยาย.
- goal: *to send her away politely* → turns into *to find out how she got in* (turning point at "เอ่อ").
- wants her to feel: respected, not accused. Unsaid: "are you a ghost?"
- outer: polite service tone; inner: fear (fear.anxiety 0.6) → `emotion: {primary: fear.anxiety, masked_by: social.deference_krengjai, intensity: .6, transition_to: cognitive.confusion, transition_at: "เอ่อ"}`.
- direction: "Answer like a shopkeeper on autopilot, then it hits you that the door is locked — the 'เอ่อ' is the moment; the second half is quieter and slower, the polite ครับ almost a whisper."
- prosody: first half baseline rate, level ending; pause 400 ms after "ยาย…" (dramatic), "เอ่อ" short with breath; second half slightly_slow, pitch slightly_higher, narrow range, soft_fall.
