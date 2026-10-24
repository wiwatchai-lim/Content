// Game 9 — spot the difference between two line-art glasses, three levels, each harder and shorter:
//   L1 3 clear ones (7 s), L2 4 subtle ones (6 s), L3 5 tiny ones with pair B tilted a little (5 s).
// The differences are drawn at random from POOL (one per part of the frame, so they never collide), so every
// seed gives a new clip. Reveal: the differences are circled on pair B, with a punch-in on the subtlest one.
// Usage: node games/09-spot-the-difference/make.mjs [seed]            -> the main clip here
//        node games/09-spot-the-difference/make.mjs series 5 [seed]   -> 5 more clips in series/<NN>/
//        npm run video -- games/09-spot-the-difference [games/09-spot-the-difference/series/01 ...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rng, write, RED } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

// Line-art glasses (front view) in a 400×170 box. Every option is a detail a level can change.
const BASE = {
  lensRx: [30, 30], lensH: [112, 112], bridge: 'arch', bridgeY: 44, rivets: [[1, 1], [1, 1]], tips: ['curl', 'curl'],
  pads: ['in', 'in'], shine: [2, 2], marks: [true, true], markX: [66, 310],
};
function glasses(o = {}) {
  const g = { ...BASE, ...o }, sw = 8, stroke = 'var(--to-green)';
  const lens = (x, k) => `<rect x="${x}" y="30" width="160" height="${g.lensH[k]}" rx="${g.lensRx[k]}" ry="${g.lensRx[k]}" fill="rgba(18,58,41,.06)"/>`;
  const br = g.bridge === 'double'
    ? `<path d="M182 62 Q200 46 218 62" fill="none"/><path d="M178 34 L222 34" fill="none"/>`
    : `<path d="M182 62 Q200 ${g.bridgeY} 218 62" fill="none"/>`;
  // Endpiece: rivets[side] = [outer, inner] dots.
  const end = (x, dir, rv) => `<path d="M${x} 46 L${x + dir * 18} 46 L${x + dir * 18} 64 L${x} 64" fill="none"/>`
    + (rv[1] ? `<circle cx="${x + dir * 6}" cy="55" r="3.2" fill="${stroke}" stroke="none"/>` : '')
    + (rv[0] ? `<circle cx="${x + dir * 13}" cy="55" r="3.2" fill="${stroke}" stroke="none"/>` : '');
  const temple = (side, tip, mark) => {
    const x0 = side < 0 ? 4 : 396, x1 = side < 0 ? 150 : 250;
    const t = tip === 'curl' ? ` Q${x1 + side * 26} 122 ${x1 + side * 22} 140` : '';
    const m = mark ? `<rect x="${g.markX[side < 0 ? 0 : 1]}" y="107" width="24" height="10" rx="3" fill="${stroke}" stroke="none" opacity=".55"/>` : '';
    return `<path d="M${x0} 64 L${x0} 112 L${x1} 112${t}" fill="none" stroke-width="${sw * 0.75}" opacity=".55"/>${m}`;
  };
  // Nose-pad arms: 'in' curls toward the bridge, 'out' toward the lens, null = missing.
  const pad = (x, side, dir) => !dir ? '' : `<path d="M${x} 116 Q${x + side * 4} 128 ${x + side * (dir === 'in' ? -4 : 8)} 134" fill="none" stroke-width="${sw * 0.6}"/>`;
  // Shine: n short diagonal strokes in the upper-left of the lens.
  const shine = (x, n) => [[`M${x + 24} 74 L${x + 52} 46`], [`M${x + 24} 94 L${x + 72} 46`]].slice(0, n)
    .map((d) => `<path d="${d}" fill="none" stroke-width="${sw * 0.5}" opacity=".45"/>`).join('');
  return `<g stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">`
    + temple(-1, g.tips[0], g.marks[0]) + temple(1, g.tips[1], g.marks[1])
    + lens(22, 0) + lens(218, 1) + shine(22, g.shine[0]) + shine(218, g.shine[1]) + br
    + pad(170, 1, g.pads[0]) + pad(230, -1, g.pads[1])
    + end(22, -1, g.rivets[0]) + end(378, 1, g.rivets[1])
    + `</g>`;
}

// Every possible difference: [tier 1 clear | 2 subtle | 3 tiny, part it changes, label, change to pair B,
// spot x, y, ring r — all in the glasses box].
const side = (k, v, arr) => arr.map((x, i) => (i === k ? v : x));
const POOL = [];
for (const [k, S, lx, ex, tx, px, mx] of [[0, 'LEFT', 102, 13, 134, 168, 78], [1, 'RIGHT', 298, 387, 266, 232, 322]]) {
  POOL.push(
    [1, `lens${k}`, `${S} LENS SHAPE`, (g) => ({ lensRx: side(k, 62, g.lensRx) }), lx, 86, 70],
    [1, `riv${k}`, `${S} RIVETS`, (g) => ({ rivets: side(k, [0, 0], g.rivets) }), ex, 55, 26],
    [1, `tip${k}`, `${S} TEMPLE TIP`, (g) => ({ tips: side(k, 'straight', g.tips) }), tx, 128, 26],
    [2, `lens${k}`, `${S} LENS CORNERS`, (g) => ({ lensRx: side(k, 12, g.lensRx) }), lx, 86, 70],
    [2, `pad${k}`, `${S} NOSE PAD`, (g) => ({ pads: side(k, null, g.pads) }), px, 125, 22],
    [2, `shine${k}`, `${S} SHINE`, (g) => ({ shine: side(k, 0, g.shine) }), lx - 30, 66, 30],
    [2, `mark${k}`, `${S} TEMPLE MARK`, (g) => ({ marks: side(k, false, g.marks) }), mx, 112, 22],
    [3, `riv${k}`, `${S} RIVET`, (g) => ({ rivets: side(k, [1, 0], g.rivets) }), ex + (k ? -6 : 6), 55, 20],
    [3, `pad${k}`, `${S} NOSE PAD`, (g) => ({ pads: side(k, 'out', g.pads) }), px, 126, 20],
    [3, `shine${k}`, `${S} SHINE`, (g) => ({ shine: side(k, 1, g.shine) }), lx - 22, 76, 30],
    [3, `mark${k}`, `${S} TEMPLE MARK`, (g) => ({ markX: side(k, g.markX[k] + (k ? 34 : -34), g.markX) }), mx + (k ? 17 : -17), 112, 34],
    [3, `lens${k}`, `${S} LENS HEIGHT`, (g) => ({ lensH: side(k, 103, g.lensH) }), lx, 138, 40],
  );
}
POOL.push(
  [1, 'bridge', 'BRIDGE', () => ({ bridge: 'double' }), 200, 42, 30],
  [3, 'bridge', 'BRIDGE CURVE', () => ({ bridgeY: 55 }), 200, 52, 24],
);

// Pick n differences, one per part: share[i] of them from tiers[i]. The last one (the subtlest) gets the punch-in.
function pick(rand, n, tiers, share) {
  const out = [], used = new Set();
  tiers.forEach((t, i) => {
    const opts = POOL.filter((d) => d[0] === t);
    for (let want = share[i]; want > 0 && opts.length;) {
      const d = opts.splice(Math.floor(rand() * opts.length), 1)[0];
      if (used.has(d[1])) continue;
      used.add(d[1]); out.push(d); want--;
    }
  });
  return out.slice(0, n);
}

// Glasses box drawn at 2.1× into the 900-wide stage; A on top, B below.
const SC = 2.1, VX = -10, VY = 10, OX = 9, TOP = 30, BOT = 470;
const sx = (x) => OX + (x - VX) * SC, sy = (y0, y) => y0 + (y - VY) * SC;

// On screen the rings show where, so the list drops LEFT/RIGHT and merges repeats ("SHINE ×2"); two lines at most.
function shortList(diffs) {
  const n = new Map();
  for (const d of diffs) { const k = d[2].replace(/^(LEFT|RIGHT) /, ''); n.set(k, (n.get(k) || 0) + 1); }
  const items = [...n].map(([k, c]) => (c > 1 ? `${k} ×${c}` : k));
  return items.length > 3 ? `${items.slice(0, 3).join(' · ')}<br>${items.slice(3).join(' · ')}` : items.join(' · ');
}

const level = ({ diffs, tilt = 0 }) => ({ id, rev, p, D }) => {
  let b = { ...BASE };
  for (const d of diffs) b = { ...b, ...d[3](b) };
  // Rings live inside pair B's svg so they follow its tilt.
  const rings = diffs.map((d, k) => `<circle class="${id}sp" style="animation-delay:${(k * 0.15).toFixed(2)}s" cx="${d[4]}" cy="${d[5]}" r="${d[6]}"/>`).join('');
  const pair = (inner, top, tag, rot) => `<div class="${id}pair" style="top:${top}px"><div class="${id}tag">${tag}</div>`
    + `<svg viewBox="${VX} ${VY} 420 150" width="${420 * SC}" height="${150 * SC}" style="overflow:visible"><g transform="rotate(${rot} 200 85)">${inner}</g></svg></div>`;
  const f = diffs[diffs.length - 1];
  return {
    stage: pair(glasses(), TOP, 'A', 0) + `<div class="${id}split"></div>` + pair(glasses(b) + rings, BOT, 'B', tilt),
    css: `
.${id}pair{position:absolute;left:0;width:900px;height:340px}
.${id}pair svg{position:absolute;left:${OX}px;top:0}
.${id}tag{position:absolute;left:0;top:-10px;font:800 44px var(--to-font-display);color:var(--to-green);opacity:.5}
.${id}split{position:absolute;left:60px;right:60px;top:425px;height:4px;background:var(--to-hairline)}
.${id}sp{fill:none;stroke:${RED};stroke-width:3.4;transform-box:fill-box;transform-origin:center;animation:${id}sp ${D}s both}
@keyframes ${id}sp{0%,${p(rev + 0.1)}{opacity:0;transform:scale(2.5)}${p(rev + 0.4)}{opacity:1;transform:scale(.9)}${p(rev + 0.55)},100%{opacity:1;transform:scale(1)}}`,
    big: `ALL ${diffs.length}?`,
    small: shortList(diffs),
    focus: { x: sx(f[4]), y: sy(BOT, f[5]), scale: 1.3 },
    answer: `${diffs.length} differences in B: ${diffs.map((d) => d[2].toLowerCase()).join(', ')}${tilt ? ' (B is tilted, that is not a difference)' : ''}`,
  };
};

let ROOT = '../..';
function clip(seed) {
  const rand = rng(seed);
  return levelClip({
    title: 'Spot the difference',
    root: ROOT,
    hook: { big: 'ONLY <em>1%</em><br>FIND ALL 12', small: 'SPOT THE DIFFERENCE' },
    levels: [
      { secs: 7, head: { title: 'FIND<em>3</em>', sub: 'DIFFERENCES · 7 SECONDS' }, build: level({ diffs: pick(rand, 3, [1, 2], [2, 1]) }) },
      { secs: 6, head: { title: 'FIND<em>4</em>', sub: 'SUBTLE ONES · 6 SECONDS' }, build: level({ diffs: pick(rand, 4, [2, 3], [2, 2]) }) },
      { secs: 5, head: { title: 'FIND<em>5</em>', sub: 'TINY + TILTED · 5 SECONDS' },
        build: level({ diffs: pick(rand, 5, [2, 3], [1, 4]), tilt: rand() < 0.5 ? -3 : 3 }) },
    ],
  });
}
const caption = `12 differences, 3 levels, only 1% find them all 👓🔍
Level 3 hides 5 tiny ones in 5 seconds — and pair B is tilted 😈
Comment your score: 0, 1, 2 or 3 👇 Tag a friend with sharp eyes!
#eyetest #spotthedifference #puzzle #brainteaser #glasses #optical #fyp`;

if (process.argv[2] === 'series') {
  const n = Number(process.argv[3]) || 5, seed = process.argv[4] || new Date().toISOString().slice(0, 10);
  const OUT = path.join(HERE, 'series');
  fs.mkdirSync(OUT, { recursive: true });
  const start = fs.readdirSync(OUT).filter((d) => /^\d+$/.test(d)).length;
  ROOT = '../../../..';
  for (let c = 0; c < n; c++) {
    const dir = path.join(OUT, String(start + c + 1).padStart(2, '0'));
    fs.mkdirSync(dir, { recursive: true });
    const { html, answer } = clip(`${seed}-${start + c + 1}`);
    write(dir, { html, caption, answer });
  }
} else {
  const { html, answer } = clip(process.argv[2] || 'spot-diff');
  write(HERE, { html, caption, answer });
}
