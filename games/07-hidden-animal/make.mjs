// Game 7 — two kinds of hidden-animal puzzle:
// - Main clip (this folder): a 3-level COLOUR VISION test. Ishihara-style dot plates; the animal is made of dots in
//   one hue family, the background in another, with matched lightness. L1 orange on teal (everyone), L2 red vs
//   olive green (hard with red-green colour blindness), L3 two near hues. Animals are the bold PLATE_ANIMALS shapes.
// - puzzles/: single 15 s clips where an animal hides in a field of grass strokes (inside the animal the strokes
//   lean one way, outside they point every way).
// Usage: node games/07-hidden-animal/make.mjs [x seed]     -> the 3-level colour plate clip (clip.html here)
//        node games/07-hidden-animal/make.mjs plates 5 [seed] -> 5 more colour plate clips in plates/<NN>_<animals>/
//        node games/07-hidden-animal/make.mjs 10 [seed]    -> 10 new stroke puzzles in puzzles/<NN>_<animal>/
//        npm run video -- games/07-hidden-animal/puzzles/01_rabbit [...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rng, pct, page, countdown, answer, write, RED, STAGE } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';
import { ANIMALS, PLATE_ANIMALS } from './animals.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const D = 15, INTRO = 0.8, SECS = 10, REVEAL = INTRO + SECS;
const p = pct(D);

// One clip. `m` = [a, b, c, d, e, f] places the shapes on the stage; inside strokes lean around `lean` (radians).
function build({ shapes, m = [1, 0, 0, 1, 0, 0], lean = 0, seed, name, root }) {
  const script = `
(() => {
  // mulberry32, same as games/_lib
  let h = 1779033703; for (const c of ${JSON.stringify(seed)}) h = Math.imul(h ^ c.charCodeAt(0), 3432918353), h = (h << 13) | (h >>> 19);
  let a = h >>> 0;
  const rand = () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const cv = document.getElementById('field'), ctx = cv.getContext('2d');
  const shapes = ${JSON.stringify(shapes)}.map((d) => { const p = new Path2D(); p.addPath(new Path2D(d), new DOMMatrix(${JSON.stringify(m)})); return p; });
  const inside = (x, y) => shapes.some((p) => ctx.isPointInPath(p, x, y));
  const greens = ['#123A29', '#1F5A3E', '#2E7350', '#41996E', '#5E8C6E'];
  ctx.fillStyle = '#E9EDE4'; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.lineCap = 'round';
  const step = 13;
  for (let y = -step; y < cv.height + step; y += step) for (let x = -step; x < cv.width + step; x += step) {
    const px = x + (rand() - 0.5) * step, py = y + (rand() - 0.5) * step;
    const ang = inside(px, py) ? ${lean} + (rand() - 0.5) * 1.1 : rand() * Math.PI;
    const len = 18 + rand() * 8;
    ctx.strokeStyle = greens[Math.floor(rand() * greens.length)];
    ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.moveTo(px - Math.cos(ang) * len / 2, py - Math.sin(ang) * len / 2);
    ctx.lineTo(px + Math.cos(ang) * len / 2, py + Math.sin(ang) * len / 2);
    ctx.stroke();
  }
})();`;
  const article = /^[aeiou]/.test(name) ? 'AN' : 'A';
  const ans = answer({ D, at: REVEAL + 0.6, big: `${article} ${name.toUpperCase()}!`, small: 'YOUR EYES SPOT IT BY THE<br>DIRECTION OF THE LINES' });
  const cd = countdown({ D, start: INTRO, secs: SECS });
  const css = `
#field{position:absolute;inset:0;animation:in ${D}s both}
@keyframes in{0%{opacity:0}${p(0.5)},100%{opacity:1}}
.animal{position:absolute;inset:0}
.animal g{animation:reveal ${D}s both}
.animal path{fill:${RED};stroke:${RED};stroke-width:6;stroke-linejoin:round;vector-effect:non-scaling-stroke}
@keyframes reveal{0%,${p(REVEAL)}{opacity:0}${p(REVEAL + 0.6)},100%{opacity:.5}}
${cd.css}
${ans.css}`;
  return page({
    title: 'Hidden animal', D, css, script, root,
    head: { eyebrow: 'EYE TEST · LOOK CLOSER', title: 'SPOT THE<em>ANIMAL</em>', sub: 'SOMETHING IS HIDING IN HERE' },
    stage: `<canvas id="field" width="${STAGE.w}" height="${STAGE.h}"></canvas>
<svg class="animal" viewBox="0 0 ${STAGE.w} ${STAGE.h}" width="${STAGE.w}" height="${STAGE.h}"><g transform="matrix(${m.join(' ')})">${shapes.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`,
    extra: cd.html + ans.html,
  });
}


const caption = `There is an animal hiding in this picture. Can you see it yet? 👀
Comment what you see before the reveal 👇
#eyetest #hiddenanimal #opticalillusion #brainteaser #puzzle #optical #fyp`;

const count = Number(process.argv[2]);
// ---- Main clip: colour-vision plates (Ishihara-style) ----
// A round plate packed with dots of random sizes (drawn on two canvases at page load, seeded). Dots whose centre
// falls inside the animal take the figure colours, the rest the background colours. Both vary in lightness
// (OKLCH, so lightness is perceptual and overlaps) — only the hue gives the animal away.
const PLATE = { x: 450, y: 430, r: 410 };
function plateScript({ id, shapes, m, fig, bg, seed }) {
  return `<canvas id="${id}bg" class="${id}bg" width="${STAGE.w}" height="${STAGE.h}"></canvas><canvas id="${id}fg" class="${id}fg" width="${STAGE.w}" height="${STAGE.h}"></canvas><script>
(() => {
  let h = 1779033703; for (const c of ${JSON.stringify(seed)}) h = Math.imul(h ^ c.charCodeAt(0), 3432918353), h = (h << 13) | (h >>> 19);
  let a = h >>> 0;
  const rand = () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const bg = document.getElementById('${id}bg').getContext('2d'), fg = document.getElementById('${id}fg').getContext('2d');
  const shapes = ${JSON.stringify(shapes)}.map((d) => { const p = new Path2D(); p.addPath(new Path2D(d), new DOMMatrix(${JSON.stringify(m)})); return p; });
  const inside = (x, y) => shapes.some((p) => fg.isPointInPath(p, x, y));
  const CX = ${PLATE.x}, CY = ${PLATE.y}, R = ${PLATE.r}, GAP = 2.6, CELL = 42, G = new Map();
  const key = (i, j) => i * 1000 + j;
  const fits = (x, y, r) => {
    const i = Math.floor(x / CELL), j = Math.floor(y / CELL);
    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) for (const d of G.get(key(i + di, j + dj)) || [])
      if (Math.hypot(d[0] - x, d[1] - y) < d[2] + r + GAP) return false;
    return true;
  };
  const dots = [];
  for (const [r0, tries] of [[12, 1800], [10, 3200], [8, 5500], [6.5, 9000], [5, 14000], [4, 18000]]) {
    for (let k = 0; k < tries; k++) {
      const r = r0 * (0.88 + rand() * 0.24), ang = rand() * Math.PI * 2, dist = Math.sqrt(rand()) * (R - r);
      const x = CX + Math.cos(ang) * dist, y = CY + Math.sin(ang) * dist;
      if (!fits(x, y, r)) continue;
      const d = [x, y, r], kk = key(Math.floor(x / CELL), Math.floor(y / CELL));
      if (!G.has(kk)) G.set(kk, []);
      G.get(kk).push(d);
      dots.push(d);
    }
  }
  const pal = { fig: ${JSON.stringify(fig)}, bg: ${JSON.stringify(bg)} };
  for (const [x, y, r] of dots) {
    const isFig = inside(x, y), P = isFig ? pal.fig : pal.bg, ctx = isFig ? fg : bg;
    const L = P.L[0] + rand() * (P.L[1] - P.L[0]), C = P.C * (0.8 + rand() * 0.4), H = P.h + (rand() - 0.5) * P.hj;
    ctx.fillStyle = 'oklch(' + L.toFixed(3) + ' ' + C.toFixed(3) + ' ' + H.toFixed(1) + ')';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
})();
</script>`;
}

// One plate. `at` = where the animal's local (0, 0) lands on the stage, `s` its scale, `box` its local bounding box.
// One plate. The bold animal is scaled to fill most of the plate and centred on it (small random nudge).
const plate = ({ name, flip, nudge, fig, bg, small }) => ({ id, rev, p, D }) => {
  const { shapes, box } = PLATE_ANIMALS[name];
  const s = Math.min(640 / (box[2] - box[0]), 560 / (box[3] - box[1]));
  const bx = (box[0] + box[2]) / 2, by = (box[1] + box[3]) / 2;
  const cx = PLATE.x + nudge[0], cy = PLATE.y + nudge[1];
  const m = [+(s * flip).toFixed(3), 0, 0, +s.toFixed(3), +(cx - bx * s * flip).toFixed(1), +(cy - by * s).toFixed(1)];
  const article = /^[aeiou]/.test(name) ? 'AN' : 'A';
  const paths = shapes.map((d) => `<path d="${d}"/>`).join('');
  return {
    // Outline = thick stroke of the shapes, masked so only the part outside the union shows (no inner seams).
    stage: plateScript({ id, shapes, m, fig, bg, seed: `${SEED}-${id}` })
      + `<svg class="${id}ol" viewBox="0 0 ${STAGE.w} ${STAGE.h}" width="${STAGE.w}" height="${STAGE.h}">
<defs><mask id="${id}mk" maskUnits="userSpaceOnUse" x="0" y="0" width="${STAGE.w}" height="${STAGE.h}"><rect width="${STAGE.w}" height="${STAGE.h}" fill="#fff"/><g transform="matrix(${m.join(' ')})" fill="#000">${paths}</g></mask></defs>
<g mask="url(#${id}mk)"><g transform="matrix(${m.join(' ')})" fill="none" stroke="#123A29" stroke-width="${(14 / s).toFixed(1)}" stroke-linejoin="round">${paths}</g></g></svg>`,
    css: `
.${id}bg,.${id}fg,.${id}ol{position:absolute;inset:0}
.${id}bg{animation:${id}bgk ${D}s both}
@keyframes ${id}bgk{0%,${p(rev)}{opacity:1}${p(rev + 0.4)},100%{opacity:.12}}
.${id}fg{animation:${id}fgk ${D}s both}
@keyframes ${id}fgk{0%,${p(rev)}{filter:saturate(1)}${p(rev + 0.4)},100%{filter:saturate(1.6)}}
.${id}ol{animation:${id}olk ${D}s both}
@keyframes ${id}olk{0%,${p(rev + 0.2)}{opacity:0}${p(rev + 0.6)},100%{opacity:1}}`,
    big: `${article} ${name.toUpperCase()}!`,
    small,
    focus: { x: Math.round(cx), y: Math.round(cy), scale: 1.15 },
    answer: `${article === 'AN' ? 'an' : 'a'} ${name}, ${name === 'butterfly' ? 'wings open' : `facing ${flip < 0 ? 'right' : 'left'}`}`,
  };
};

// Colour pairs per level (OKLCH). EASY: big hue + lightness gap, everyone sees it. RED–GREEN: matched lightness,
// the classic confusion pair. SUBTLE: two near hues (~45° apart), the figure a touch darker.
const PALETTES = [
  [
    { fig: { L: [0.66, 0.78], C: 0.16, h: 50, hj: 16 }, bg: { L: [0.56, 0.76], C: 0.09, h: 200, hj: 24 } },
    { fig: { L: [0.58, 0.70], C: 0.16, h: 25, hj: 12 }, bg: { L: [0.64, 0.80], C: 0.08, h: 250, hj: 20 } },
    { fig: { L: [0.80, 0.88], C: 0.15, h: 95, hj: 12 }, bg: { L: [0.50, 0.66], C: 0.09, h: 300, hj: 20 } },
  ],
  [
    { fig: { L: [0.62, 0.72], C: 0.115, h: 40, hj: 14 }, bg: { L: [0.62, 0.72], C: 0.11, h: 115, hj: 18 } },
    { fig: { L: [0.60, 0.70], C: 0.12, h: 28, hj: 12 }, bg: { L: [0.60, 0.70], C: 0.10, h: 135, hj: 16 } },
    { fig: { L: [0.64, 0.74], C: 0.11, h: 55, hj: 12 }, bg: { L: [0.64, 0.74], C: 0.10, h: 125, hj: 16 } },
  ],
  [
    { fig: { L: [0.67, 0.76], C: 0.12, h: 66, hj: 8 }, bg: { L: [0.70, 0.79], C: 0.10, h: 112, hj: 10 } },
    { fig: { L: [0.62, 0.72], C: 0.12, h: 22, hj: 8 }, bg: { L: [0.65, 0.75], C: 0.11, h: 64, hj: 10 } },
    { fig: { L: [0.63, 0.73], C: 0.09, h: 165, hj: 8 }, bg: { L: [0.66, 0.76], C: 0.08, h: 222, hj: 10 } },
  ],
];
const LEVEL = [
  { secs: 6, sub: 'NORMAL VISION CHECK · 6 SECONDS', small: 'EVERYONE SHOULD SEE THIS ONE' },
  { secs: 5, sub: 'RED–GREEN TEST · 5 SECONDS', small: 'RED–GREEN COLOUR BLINDNESS<br>HIDES THIS ONE' },
  { secs: 5, sub: 'ALMOST THE SAME COLOUR · 5 SECONDS', small: 'ONLY SHARP COLOUR VISION<br>CATCHES THIS ONE' },
];

// One 3-level clip. picks = [{ name, pal, flip, nudge }] for levels 1–3.
function plateClip(picks) {
  return levelClip({
    title: 'Colour vision test',
    root: ROOT,
    hook: { top: 'COLOUR VISION TEST · 3 LEVELS', big: 'CAN YOU SEE<br><em>ALL 3</em>?', small: 'COLOUR BLIND TEST' },
    levels: picks.map((k, i) => ({
      secs: LEVEL[i].secs,
      head: { eyebrow: `COLOUR VISION TEST · LEVEL ${i + 1}`, title: 'WHAT<em>ANIMAL?</em>', sub: LEVEL[i].sub },
      build: plate({ ...k, ...PALETTES[i][k.pal], small: LEVEL[i].small }),
    })),
    tiers: ['PERFECT COLOURS', 'GREAT COLOURS', 'COLOUR CHECK?', 'SEE AN EXPERT'],
    end: {
      question: 'HOW MANY<br>DID YOU SEE?',
      sub: `COMMENT YOUR SCORE 👇<div style="margin-top:26px;font:700 30px/1.35 var(--to-font-body);letter-spacing:.04em;color:var(--to-black);opacity:.75">Just for fun — not a medical test.<br>Unsure? See an eye-care professional.<br>TIMEOPTIC can help.</div>`,
    },
  });
}
const plateCaption = `Colour vision test 🎨👀 What animal hides in each plate? Level 3 is almost the same colour…
Comment your score: 1, 2 or 3 👇 Tag a friend who mixes up red and green 😅
Just for fun, not a medical test — if colours look off, see an eye-care professional (TIMEOPTIC can help 👓)
#colorblindtest #colourblind #eyetest #ishihara #opticalillusion #puzzle #glasses #optical #fyp`;

let SEED = 'colour-plates', ROOT = '../..';
if (process.argv[2] === 'plates') {
  // Series: N clips in plates/<NN>_<a>-<b>-<c>/, each with 3 different animals and random colour pairs.
  const n = Number(process.argv[3]) || 5, seed = process.argv[4] || new Date().toISOString().slice(0, 10);
  const rand = rng(seed), OUT = path.join(HERE, 'plates');
  fs.mkdirSync(OUT, { recursive: true });
  const start = fs.readdirSync(OUT).filter((d) => /^\d+_/.test(d)).length;
  const names = Object.keys(PLATE_ANIMALS);
  ROOT = '../../../..';
  // Deal animals from a shuffled deck (refilled when empty) so every animal comes up about equally often.
  let deck = [];
  const deal = (taken) => {
    if (!deck.some((x) => !taken.includes(x))) deck = [...names].sort(() => rand() - 0.5).concat(deck);
    return deck.splice(deck.findIndex((x) => !taken.includes(x)), 1)[0];
  };
  for (let c = 0; c < n; c++) {
    const picks = [];
    for (let i = 0; i < 3; i++) {
      const name = deal(picks.map((k) => k.name));
      picks.push({ name, pal: Math.floor(rand() * 3), flip: rand() < 0.5 ? -1 : 1, nudge: [Math.round((rand() - 0.5) * 50), Math.round((rand() - 0.5) * 40)] });
    }
    const folder = `${String(start + c + 1).padStart(2, '0')}_${picks.map((k) => k.name).join('-')}`;
    SEED = `${seed}-${folder}`;
    const { html, answer: ans } = plateClip(picks);
    fs.mkdirSync(path.join(OUT, folder), { recursive: true });
    write(path.join(OUT, folder), { html, caption: plateCaption, answer: ans });
  }
} else if (!count) {
  SEED = process.argv[3] || SEED;
  const { html, answer: ans } = plateClip([
    { name: 'fish', pal: 0, flip: 1, nudge: [10, 0] },
    { name: 'rabbit', pal: 0, flip: 1, nudge: [-10, 0] },
    { name: 'cat', pal: 0, flip: -1, nudge: [0, 0] },
  ]);
  write(HERE, { html, caption: plateCaption, answer: ans });
} else {
  const seed = process.argv[3] || new Date().toISOString().slice(0, 10);
  const rand = rng(seed);
  const OUT = path.join(HERE, 'puzzles');
  fs.mkdirSync(OUT, { recursive: true });
  const start = fs.readdirSync(OUT).filter((d) => /^\d+_/.test(d)).length;
  // Shuffle the animals; repeat the list if more puzzles than animals are asked for.
  const names = Object.keys(ANIMALS);
  for (let i = names.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [names[i], names[j]] = [names[j], names[i]]; }
  for (let i = 0; i < count; i++) {
    const n = start + i + 1, name = names[i % names.length];
    const s = 0.9 + rand() * 0.15, flip = rand() < 0.5 ? -1 : 1;
    // Shapes reach about ±215 sideways and -300…+210 up/down (the giraffe's head is the tallest).
    const x = 240 + rand() * 420, y = Math.max(name === 'giraffe' ? 330 : 270, 270 + rand() * 320);
    const where = `${y < 380 ? 'top' : y > 500 ? 'bottom' : 'middle'} ${x < 380 ? 'left' : x > 520 ? 'right' : 'centre'}`;
    const lean = (rand() * Math.PI).toFixed(3);
    const folder = `${String(n).padStart(2, '0')}_${name}`;
    const dir = path.join(OUT, folder);
    fs.mkdirSync(dir, { recursive: true });
    write(dir, {
      html: build({ shapes: ANIMALS[name], m: [s * flip, 0, 0, s, +x.toFixed(1), +y.toFixed(1)], lean, seed: `${seed}-${n}`, name, root: '../../../..' }),
      caption,
      answer: `${name[0].toUpperCase() + name.slice(1)}, ${where} of the picture${flip < 0 && name !== 'butterfly' && name !== 'owl' ? ' (facing right)' : ''}`,
    });
  }
}
