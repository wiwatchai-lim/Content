// Game 4 — count the black dots on a scintillating grid, three levels: the white dots at the crossings flicker
// black, but only a few dots are really black. Each level has a denser grid, more real dots and less time.
// Reveal: the grid lines fade (the flicker stops), the real black dots are circled and numbered.
// Usage: node games/04-count-black-dots/make.mjs [seed]   then   npm run video -- games/04-count-black-dots
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rng, write, RED, STAGE } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const rand = rng(process.argv[2] || 'count-dots');

// `count` real dots off the border, not next to each other and not on the centre crossing.
function pick(n, count) {
  const out = [];
  while (out.length < count) {
    const c = 1 + Math.floor(rand() * (n - 2)), r = 1 + Math.floor(rand() * (n - 2));
    if (Math.abs(c - (n - 1) / 2) < 1 && Math.abs(r - (n - 1) / 2) < 1) continue;
    if (out.some(([a, b]) => Math.max(Math.abs(a - c), Math.abs(b - r)) < 2)) continue;
    out.push([c, r]);
  }
  return out.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}

const level = ({ n, gap, lw, dot, count }) => ({ id, rev, p, D }) => {
  const span = gap * (n - 1), ox = (STAGE.w - span) / 2, oy = (STAGE.h - span) / 2;
  const ext = Math.min(40, oy - 4);
  const real = pick(n, count), isReal = (c, r) => real.some(([a, b]) => a === c && b === r);
  let lines = '', dots = '', rings = '';
  for (let k = 0; k < n; k++) {
    lines += `<rect x="${ox + k * gap - lw / 2}" y="${oy - ext}" width="${lw}" height="${span + 2 * ext}"/>`;
    lines += `<rect x="${ox - ext}" y="${oy + k * gap - lw / 2}" width="${span + 2 * ext}" height="${lw}"/>`;
  }
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++)
    dots += `<circle cx="${ox + c * gap}" cy="${oy + r * gap}" r="${dot / 2}" fill="${isReal(c, r) ? '#000' : '#fff'}"/>`;
  const R = Math.round(gap * 0.36);
  real.forEach(([c, r], k) => {
    const x = ox + c * gap, y = oy + r * gap;
    rings += `<g class="${id}rg" style="animation-delay:${(k * 0.2).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="${R}" fill="none" stroke="${RED}" stroke-width="${Math.max(5, Math.round(gap / 14))}"/>`
      + `<text x="${x + R * 1.25}" y="${y - R * 1.15}" class="${id}nm">${k + 1}</text></g>`;
  });
  return {
    stage: `<div class="${id}bd"><svg viewBox="0 0 ${STAGE.w} ${STAGE.h}" width="${STAGE.w}" height="${STAGE.h}"><g class="${id}ln">${lines}</g>${dots}${rings}</svg></div>`,
    css: `
.${id}bd{position:absolute;inset:0;background:#000;animation:${id}bdk ${D}s both}
@keyframes ${id}bdk{0%,${p(rev)}{background:#000}${p(rev + 0.6)},100%{background:#4A4A4A}}
.${id}bd svg{position:absolute;inset:0}
.${id}ln{fill:#8A8A8A;animation:${id}ln ${D}s both}
@keyframes ${id}ln{0%,${p(rev)}{opacity:1}${p(rev + 0.6)},100%{opacity:0}}
.${id}rg{transform-box:fill-box;transform-origin:center;animation:${id}rg ${D}s both}
@keyframes ${id}rg{0%,${p(rev + 0.5)}{opacity:0;transform:scale(2.5)}${p(rev + 0.85)}{opacity:1;transform:scale(.9)}${p(rev + 1)},100%{opacity:1;transform:scale(1)}}
.${id}nm{font:800 ${Math.round(gap * 0.4)}px var(--to-font-display);fill:#F4F1EA;text-anchor:middle;dominant-baseline:central}`,
    big: `ONLY ${count}!`,
    small: 'THE OTHER BLACK DOTS<br>ARE IN YOUR BRAIN',
    focus: { x: STAGE.w / 2, y: STAGE.h / 2, scale: 1.1 },
    answer: `${count} real black dots on a ${n}×${n} grid (column,row from top-left, 1-based): ${real.map(([c, r]) => `${c + 1},${r + 1}`).join(' · ')}`,
  };
};

const L = [
  { n: 8, gap: 106, lw: 14, dot: 24, count: 3, secs: 6 },
  { n: 10, gap: 86, lw: 12, dot: 21, count: 5, secs: 5 },
  { n: 12, gap: 70, lw: 10, dot: 18, count: 6, secs: 4 },
];

const { html, answer } = levelClip({
  title: 'Count the black dots',
  hook: { big: 'ONLY <em>4%</em><br>COUNT LEVEL 3', small: 'HOW MANY BLACK DOTS?' },
  levels: L.map((o, i) => ({
    secs: o.secs,
    head: { title: 'COUNT THE<em>DOTS</em>', sub: `${['REAL BLACK DOTS ONLY · ', 'DENSER GRID · ', 'TINY GRID · '][i]}${o.secs} SECONDS` },
    build: level(o),
  })),
  end: { question: 'HOW MANY<br>DID YOU GET?' },
});

write(HERE, {
  html,
  caption: `How many black dots can you count? 👀 Only 4% get level 3 right — your brain adds dots that aren't there!
Comment your score: 1, 2 or 3 👇 Tag a friend who needs an eye test 👓
#eyetest #opticalillusion #scintillatinggrid #brainteaser #illusion #optical #fyp`,
  answer,
});
