# Emotion Transitions

How emotion moves **inside a line**, **between lines** and **across scenes**. The acoustic direction of each change
follows the arousal/valence tendencies in PROSODY_RULES.md (arousal ↔ F0 level/range, rate, loudness; valence and
attitude ↔ voice quality and contour) [JuslinLaukka2003, BanseScherer1996, GoblNiChasaide2003]. How fast people
switch and what triggers it is craft knowledge [Artistic]. In the schema: `emotion.transition_to` + `transition_at`
for changes inside a line; consecutive lines for changes between lines.

## 1. Rules
1. **A transition needs a trigger** the listener can hear or infer: a word, a realisation, a sound, the other person's line. Put the change *on or right after* the trigger word, not at the start of the line.
2. **The body changes before the words.** Breath (gasp, sigh, held breath) or a micro-pause usually comes 100–400 ms before the new emotion is in the voice.
3. **Arousal moves faster up than down.** Calm → panic can happen in one word; panic → calm takes a sentence or two (residual fast rate, shaky breath, pitch settling).
4. **Leaks before floods.** In suppressed → open transitions, the inner emotion first leaks in one feature (tremor on one word, a cracked vowel, a too-long pause), then takes over.
5. **One transition per line** for TTS. Two changes inside one line rarely render well — split the line into two generation units and join them in the edit.
6. **Keep the character.** A transition changes the emotion layer only; voice, accent, particles and habits stay.
7. **Thai:** transitions move pitch *level and range*, rate, loudness, voice quality and particles — never a word's lexical tone. A falling-tone word stays falling even when the line gets higher and faster.

## 2. Common transitions (start → trigger → end)
| transition | where it turns | prosody path | TTS approach |
|---|---|---|---|
| calm → shock | the unexpected word / sound | rate stops (pause 300–700 ms), gasp, pitch jumps up, range widens | split: calm half / gasp+shock half |
| fear → relief | proof of safety ("ไม่มีอะไร…") | long exhale, pitch drops, rate slows, voice quality from tense to breathy; a small laugh may follow | one line, style "starts scared, ends with a relieved sigh" |
| anger → sadness | realising the real hurt | loudness drops, pitch falls, rate slows, voice becomes breathy / cracked; the last word may be almost whispered | split at the realisation word |
| denial → acceptance | repeating the fact | first part fast/insistent with wide range → pause → slow, narrow, soft fall | two units |
| brave mask → tears | an affectionate word from the other person | steady → tremor on one word → voice breaks → stops to breathe | two units, second with "voice breaking" |
| polite → cold anger | the other side crosses a line | rate slows, articulation becomes crisp, pitch lowers, range narrows, particles become curt (ครับ short and flat or dropped) | one line can work with explicit style |
| teasing → sincere | the joke lands badly / a serious memory | smile quality drops, pitch lower, rate slower, pause before the sincere part | split |
| nervous → confident | first success | rate settles, pauses become intentional, endings fall firmly | between lines |
| excitement → disappointment | the bad news word | energy collapses: pitch falls 3–6 st over the line, rate slows, ending trails off | split |
| suspicion → recognition (warmth) | seeing who it is | tense → released breath, pitch rises gently, smile quality | split |

## 3. Between lines and scenes
- Track an **intensity curve** per character per scene (0–1 per line). Big jumps (> 0.3) only at turning points.
- After a peak, give one or two lines of **settling** rather than snapping back to neutral.
- A new scene may reset the level, but carry **residue** if little story time has passed (e.g. the morning after the ghost: Ton is tired, not neutral).
- Narration bridges: the narrator's level sits *between* the two scenes it connects.

## 4. Test that a transition worked
`tools/analyze_audio.py` on the two halves: the measured change (pitch_diff_st, rate_ratio, intensity_diff_db) should
point in the directed direction, and a listener should be able to say *where* it turned. If the turn is smeared over
the whole line, split the line (rule 5).
