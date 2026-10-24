// Game 8 — count the triangles, three levels: a square with both diagonals, then a triangle cut by two lines from the
// apex and two cross bars, then a pentagon with every diagonal drawn (the famous one).
// The count is not typed in: every figure is a list of segments, and count() finds all intersection points and
// counts each triple of points whose three sides all lie on drawn segments (and that is not a flat line).
// Reveal: every triangle flashes in turn while a counter runs up to the total.
// Usage: node games/08-count-triangles/make.mjs   then   npm run video -- games/08-count-triangles
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { write, RED } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EPS = 1e-6;

// ---- Counting ---------------------------------------------------------------------------------------------
function cross(ax, ay, bx, by) { return ax * by - ay * bx; }
function intersect([p, q], [r, s]) {
  const dx1 = q[0] - p[0], dy1 = q[1] - p[1], dx2 = s[0] - r[0], dy2 = s[1] - r[1];
  const den = cross(dx1, dy1, dx2, dy2);
  if (Math.abs(den) < EPS) return null;                     // parallel (collinear overlaps share endpoints anyway)
  const t = cross(r[0] - p[0], r[1] - p[1], dx2, dy2) / den, u = cross(r[0] - p[0], r[1] - p[1], dx1, dy1) / den;
  if (t < -EPS || t > 1 + EPS || u < -EPS || u > 1 + EPS) return null;
  return [p[0] + t * dx1, p[1] + t * dy1];
}
function onSeg([p, q], [x, y]) {
  const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
  if (Math.abs(cross(q[0] - p[0], q[1] - p[1], x - p[0], y - p[1])) / len > 1e-3) return false;
  const d = ((x - p[0]) * (q[0] - p[0]) + (y - p[1]) * (q[1] - p[1])) / (len * len);
  return d > -1e-6 && d < 1 + 1e-6;
}
export function count(segs) {
  const pts = [];
  const add = (pt) => { if (!pts.some((o) => Math.hypot(o[0] - pt[0], o[1] - pt[1]) < 1e-3)) pts.push(pt); };
  segs.forEach((s) => { add(s[0]); add(s[1]); });
  for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) { const x = intersect(segs[i], segs[j]); if (x) add(x); }
  // Two points are joined by a drawn line when one segment holds both.
  const on = pts.map((pt) => segs.map((s) => onSeg(s, pt)));
  const joined = (a, b) => segs.some((_, k) => on[a][k] && on[b][k]);
  const tris = [];
  for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) {
    if (!joined(a, b)) continue;
    for (let c = b + 1; c < pts.length; c++) {
      if (!joined(a, c) || !joined(b, c)) continue;
      const area = cross(pts[b][0] - pts[a][0], pts[b][1] - pts[a][1], pts[c][0] - pts[a][0], pts[c][1] - pts[a][1]) / 2;
      if (Math.abs(area) > 1) tris.push({ p: [pts[a], pts[b], pts[c]], area: Math.abs(area) });
    }
  }
  return tris.sort((u, v) => u.area - v.area);              // flash from the smallest to the biggest
}

// ---- Figures (stage px, 900×860) --------------------------------------------------------------------------
const square = () => {
  const L = 190, R = 710, T = 170, B = 690;
  return [[[L, T], [R, T]], [[R, T], [R, B]], [[R, B], [L, B]], [[L, B], [L, T]], [[L, T], [R, B]], [[R, T], [L, B]]];
};
// Triangle with 2 lines from the apex to the base and 2 cross bars parallel to the base.
const fan = () => {
  const A = [450, 70], BL = [70, 790], BR = [830, 790], n = 3, bars = [0.4, 0.68];
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const segs = [[BL, BR], [A, BL], [A, BR]];
  for (let i = 1; i < n; i++) segs.push([A, lerp(BL, BR, i / n)]);
  for (const t of bars) segs.push([lerp(A, BL, t), lerp(A, BR, t)]);
  return segs;
};
// Regular pentagon with all five diagonals (the star inside).
const pentagon = () => {
  const cx = 450, cy = 455, r = 390;
  const v = Array.from({ length: 5 }, (_, k) => [cx + r * Math.sin((k * 2 * Math.PI) / 5), cy - r * Math.cos((k * 2 * Math.PI) / 5)]);
  const segs = [];
  for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) segs.push([v[a], v[b]]);
  return segs;
};

const f = (n) => n.toFixed(1);
const level = (segs, { sw }) => ({ id, rev, p, D }) => {
  const tris = count(segs);
  const N = tris.length, STEP = Math.min(0.24, 1.9 / N), T0 = rev + 0.15;
  const lines = segs.map(([a, b]) => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}"/>`).join('');
  let polys = '', css = '', nums = '';
  tris.forEach((t, k) => {
    const from = T0 + k * STEP, to = from + STEP, last = k === N - 1;
    polys += `<polygon class="${id}t${k}" points="${t.p.map((q) => `${f(q[0])},${f(q[1])}`).join(' ')}"/>`;
    css += `.${id}t${k}{animation:${id}t${k} ${D}s both}@keyframes ${id}t${k}{0%,${p(from - 0.001)}{fill-opacity:0;stroke-opacity:0}${p(from)},${p(to - 0.001)}{fill-opacity:.42;stroke-opacity:1}${p(to)},100%{fill-opacity:0;stroke-opacity:0}}\n`;
    nums += `<b class="${id}n${k}">${k + 1}</b>`;
    css += `.${id}n${k}{animation:${id}n${k} ${D}s both}@keyframes ${id}n${k}{0%,${p(from - 0.001)}{opacity:0}${p(from)}{opacity:1;transform:scale(${last ? 1.6 : 1.15})}${p(from + 0.12)}{transform:scale(1)}${last ? '100%{opacity:1}' : `${p(to - 0.001)}{opacity:1}${p(to)},100%{opacity:0}`}}\n`;
  });
  const end = T0 + N * STEP;
  return {
    stage: `<svg class="${id}svg" viewBox="0 0 900 860" width="900" height="860"><g class="${id}hl">${polys}</g><g class="${id}fig">${lines}</g></svg><div class="${id}ctr">${nums}</div>`,
    css: `
.${id}svg{position:absolute;inset:0;overflow:visible}
.${id}fig line{stroke:var(--to-green);stroke-width:${sw};stroke-linecap:round;animation:${id}ln ${D}s both}
@keyframes ${id}ln{0%,${p(rev)}{stroke:var(--to-green)}${p(rev + 0.3)},${p(end)}{stroke:rgba(18,58,41,.45)}${p(end + 0.3)},100%{stroke:var(--to-green)}}
.${id}hl polygon{fill:${RED};stroke:${RED};stroke-width:${sw + 4};stroke-linejoin:round;fill-opacity:0;stroke-opacity:0}
.${id}ctr{position:absolute;right:-10px;top:-20px;width:170px;height:170px;border-radius:50%;background:${RED};animation:${id}ctr ${D}s both}
@keyframes ${id}ctr{0%,${p(T0 - 0.1)}{opacity:0;transform:scale(.4)}${p(T0 + 0.1)},100%{opacity:1;transform:none}}
.${id}ctr b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:800 92px/1 var(--to-font-display);color:var(--to-snow);opacity:0}
${css}`,
    big: `${N} TRIANGLES`,
    small: 'DID YOU COUNT THEM ALL?',
    focus: null,
    answer: `${N} triangles`,
    N,
  };
};

const figs = [square(), fan(), pentagon()];
const counts = figs.map((s) => count(s).length);

const { html, answer } = levelClip({
  title: 'Count the triangles',
  hook: { big: 'ONLY <em>1%</em><br>PASS LEVEL 3', small: 'COUNT THE TRIANGLES' },
  levels: [
    { secs: 8, head: { title: 'HOW MANY<em>▲</em>', sub: '8 SECONDS · COUNT THEM ALL' }, build: level(figs[0], { sw: 10 }) },
    { secs: 7, head: { title: 'HOW MANY<em>▲</em>', sub: "7 SECONDS · DON'T MISS THE BIG ONES" }, build: level(figs[1], { sw: 8 }) },
    { secs: 6, head: { title: 'HOW MANY<em>▲</em>', sub: '6 SECONDS · GENIUS LEVEL' }, build: level(figs[2], { sw: 8 }) },
  ],
  end: { question: 'HOW MANY<br>DID YOU GET?' },
});

write(HERE, {
  html,
  caption: `Only 1% get level 3 right 🔺 Count every triangle before the timer runs out!
Level 1 is a warm-up… level 3 breaks everyone 😵
Comment your score: 0, 1, 2 or 3 👇 Tag a friend who thinks they're a genius 👓
#eyetest #counttriangles #puzzle #brainteaser #iqtest #optical #glasses #fyp`,
  answer: answer + `\n(counted by script: ${counts.join(' / ')}; square with both diagonals; triangle with 2 apex lines + 2 cross bars; pentagon with all diagonals)`,
});
