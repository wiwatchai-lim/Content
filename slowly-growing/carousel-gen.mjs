// Prints "epdir<TAB>prompt" for every episode: square 1:1 FLUX art for the IG carousel (carousel-gen.sh runs FLUX).
import { STORIES } from './stories.mjs';
import { STYLE, CHARACTERS } from './build.mjs';
const SQUARE = 'Square 1:1 composition, both characters fully visible in the lower two thirds of the picture, ' +
  'the upper third is calm empty cream paper with only faint background. No text, no letters, no speech bubbles, no signature, no watermark.';
STORIES.forEach((s, i) => console.log(`episodes/ep${String(i + 1).padStart(2, '0')}-${s.slug}\t${STYLE} ${CHARACTERS} Scene: ${s.scene}. ${SQUARE}`));
