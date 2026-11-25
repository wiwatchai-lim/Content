# Environment Design

[finding: keys] → RESEARCH_SOURCES.md; [craft] = concept-art practice.

## 1. Purpose first
An environment supports the story: where we are, when, what happened here, what the characters feel. Decide its job
(establish, oppress, comfort, reveal, isolate) before designing detail [craft].

## 2. Legibility (orientation across shots)
- One memorable **landmark** per recurring location and a clear **edge** (counter, canal, shop front) so viewers stay oriented across cuts [finding: Lynch1960].
- Repeat the same camera vantage for the "home" shot of a location (establishing shot).

## 3. Depth & scale
- Foreground / midground / background with agreeing depth cues (occlusion, size, height in field, haze) [finding: CuttingVishton1995, OShea1994].
- Scale cues: people, doors, steps, glasses on a counter, chairs [craft].
- Aerial perspective indoors too (dust, lamp haze) to separate planes [finding: OShea1994].

## 4. Shape language & mood
Verticals = dignity/oppression, horizontals = calm, diagonals = instability; rounded organic shapes = safe/natural,
sharp angular = danger/modern; tight framing and low ceilings = claustrophobia; vast negative space = solitude or awe [craft].

## 5. Light as the main mood tool
Motivated sources (window, lamp, neon, moon) with one consistent direction and temperature; warm interior vs cool
exterior contrast; practical lights in frame for night scenes → LIGHTING_LIBRARY.json [finding for physics:
HyperPhysics_InverseSquare, Penumbra_SourceSize].

## 6. Storytelling through set dressing
Wear and tear, objects left behind, time of day, weather, signage (in HTML layer if readable text is needed),
culture-specific details (Thai shophouse, canal, spirit house — respectfully; no sacred imagery in ads).

## 7. Project locations (keep consistent)
| location | landmark | edge | palette / light |
|---|---|---|---|
| ร้านแว่นตีสอง — old wooden optician shophouse by a canal, Bangkok | glass display cabinets + wall clock + hanging bulb | the counter; the steel shutter | warm amber lamp vs blue night (practical_lamp, moonlight_blue) |
| Time Optic store (real) | `data/TimeOptic_store.png`, brand line art | storefront | brand palette |
| Slowly Growing world | a single bare tree, benches, simple street | ground line | graphite on cream paper |

## 8. For AI generation
Describe layout spatially ("counter in the midground running left to right, cabinets on the back wall, door at
right"), the time of day and the light source, 3–5 key props, and what must stay empty (text space). Generate the
empty set first (plate), then characters/products as layers when consistency matters.
