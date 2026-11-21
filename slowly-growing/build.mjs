// Builds one folder per episode + ALL-30-STORIES.md from stories.mjs
// Run: node slowly-growing/build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STORIES } from './stories.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

export const STYLE =
  'Warm pencil sketch cinematic illustration, detailed graphite drawing on aged cream paper with visible paper grain, ' +
  'hand-drawn cross-hatching and soft smudged shading, limited palette of beige, warm gray, charcoal and muted brown, ' +
  'subtle warm light, calm and contemplative mood, not cartoonish, no bright colors.';
export const CHARACTERS =
  'Two recurring faceless characters with smooth, perfectly round blank heads (no eyes, no mouth, no facial features), simple adult proportions: ' +
  '"Mint" wears an oversized oatmeal knit sweater, dark straight trousers and simple shoes; ' +
  '"Tao" is slightly taller, wears a long charcoal coat over a light shirt and a muted brown scarf. ' +
  'Their emotions are shown only through posture and gesture.';
export const COMPOSITION =
  'Vertical 9:16 composition, characters in the lower half, wide storytelling background, ' +
  'generous calm empty space in the upper third for overlay text. ' +
  'No text, no letters, no captions, no speech bubbles, no signature, no watermark.';
export const VIDEO_TAIL =
  'Keep the exact pencil-sketch look, paper grain, colors and the characters\' blank round heads (never add faces). ' +
  'Subtle, slow, cinematic motion only, locked or very gentle camera, no cuts, no flashy transitions, no text appearing, vertical 9:16, 5 seconds, seamless and calm.';

const pad = (n) => String(n).padStart(2, '0');
const lines = [];

STORIES.forEach((s, i) => {
  const ep = `ep${pad(i + 1)}`;
  const total = s.sb.reduce((t, [d]) => t + d, 0);
  let t = 0;
  const sb = s.sb.map(([d, text], k) => {
    const row = `- **ฉาก ${k + 1}** (${t}–${t + d} วิ) — ${text}`;
    t += d;
    return row;
  }).join('\n');

  const imagePrompt = `${STYLE} ${CHARACTERS} Scene: ${s.scene}. ${COMPOSITION}`;
  const videoPrompt = `Animate this pencil sketch illustration: ${s.motion}. Characters breathe softly and move very little. ${VIDEO_TAIL}`;

  const md = `# EP${pad(i + 1)} · ${s.title}

**1. ชื่อเรื่อง:** ${s.title}

**2. คนแรก (Mint):** “${s.a}”

**3. คนที่สอง (Tao):** “${s.b}”

**4. แนวภาพและสถานที่:** ${s.place}

**5. อารมณ์และโทนสี:** ${s.mood}

**6. Storyboard (${total} วินาที)**
${sb}

**7. Prompt สร้างภาพ 9:16**
\`\`\`
${imagePrompt}
\`\`\`

**8. Prompt สร้างวิดีโอจากภาพ**
\`\`\`
${videoPrompt}
\`\`\`

**9. เสียงประกอบ:** ${s.sound}

**10. แคปชั่น TikTok**
\`\`\`
${s.caption}
\`\`\`
`;
  const dir = join(ROOT, 'episodes', `${ep}-${s.slug}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'story.md'), md);
  lines.push(md);
});

writeFileSync(join(ROOT, 'ALL-30-STORIES.md'),
  `# Slowly Growing — 30 เรื่อง (ซีซั่น 1)\n\nดูกติกาซีรีส์ใน README.md\n\n---\n\n` + lines.join('\n---\n\n'));
console.log(`built ${STORIES.length} episodes`);
