// Game 6 — follow the line, three levels: 3 lines, then 5, then 7 tangled lines. Numbers on top, letters at
// the bottom; which letter does the marked line end at? Reveal: that line is traced in red.
// Each puzzle is checked so the asked line never runs along another line (only clean crossings).
// Usage: node games/06-follow-the-line/make.mjs [seed]   then   npm run video -- games/06-follow-the-line
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rng, write, RED, STAGE } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const rand = rng(process.argv[2] || 'follow-line');
const LETTERS = 'ABCDEFG', Y0 = 100, Y1 = 760, TRACE = 1.1;

// Catmull-Rom through the waypoints -> cubic Bézier segments [p1, c1, c2, p2].
function segs(pts) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    out.push([p1, [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6], p2]);
  }
  return out;
}
const d = (sg) => `M${sg[0][0][0]} ${sg[0][0][1]}` + sg.map(([, c1, c2, e]) => ` C${c1.map((v) => v.toFixed(1)).join(' ')} ${c2.map((v) => v.toFixed(1)).join(' ')} ${e[0]} ${e[1]}`).join('');
// Points every few px along the curve.
function sample(sg) {
  const out = [];
  for (const [a, b, c, e] of sg) for (let k = 0; k < 40; k++) {
    const t = k / 40, u = 1 - t;
    out.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * e[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * e[1]]);
  }
  return out;
}

// Fair puzzle: along the asked line, no stretch longer than `maxRun` px stays within `near` px of another
// line (a crossing is short; running side by side is not), and every line stays inside the stage.
function fair(all, ti, near = 12, maxRun = 70) {
  const S = all.map(sample);
  if (S.some((s) => s.some(([x, y]) => x < 25 || x > STAGE.w - 25))) return false;
  for (let j = 0; j < S.length; j++) {
    if (j === ti) continue;
    let run = 0;
    for (let k = 1; k < S[ti].length; k++) {
      const [x, y] = S[ti][k];
      const close = S[j].some(([u, v]) => Math.abs(u - x) < near && Math.abs(v - y) < near && Math.hypot(u - x, v - y) < near);
      run = close ? run + Math.hypot(x - S[ti][k - 1][0], y - S[ti][k - 1][1]) : 0;
      if (run > maxRun) return false;
    }
  }
  return true;
}

const level = ({ n, ask, rows, sw = 7 }) => ({ id, rev, p, D }) => {
  const m = n <= 3 ? 150 : 80;
  const xs = Array.from({ length: n }, (_, i) => Math.round(m + (i * (STAGE.w - 2 * m)) / (n - 1)));
  const ti = ask - 1;
  let perm, sg;
  for (let tries = 0; ; tries++) {
    if (tries > 5000) throw new Error(`no fair puzzle for ${n} lines`);
    perm = xs.map((_, i) => i);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    // The asked line must travel at least two columns, and no line ends straight under its own start.
    if (Math.abs(perm[ti] - ti) < 2 || perm.some((e, i) => e === i)) continue;
    sg = xs.map((x, i) => {
      const pts = [[x, 60]]; // starts under its number disc
      for (let k = 1; k < rows; k++) pts.push([Math.round(60 + rand() * (STAGE.w - 120)), Math.round(Y0 + ((Y1 - Y0) * k) / rows)]);
      pts.push([xs[perm[i]], Y1]);
      return segs(pts);
    });
    if (fair(sg, ti)) break;
  }
  const r = n <= 5 ? 40 : 34, fs = n <= 5 ? 52 : 44;
  const tops = xs.map((x, i) => `<circle cx="${x}" cy="44" r="${r}" fill="${i === ti ? RED : 'var(--to-green)'}"/><text x="${x}" y="${44 + fs * 0.35}" fill="var(--to-snow)" style="font-size:${fs}px">${i + 1}</text>`).join('');
  const bots = xs.map((x, i) => `<text x="${x}" y="842" fill="var(--to-green)" style="font-size:${fs}px">${LETTERS[i]}</text>`).join('');
  const end = LETTERS[perm[ti]];
  return {
    stage: `<svg class="${id}svg" viewBox="0 0 ${STAGE.w} ${STAGE.h}" width="${STAGE.w}" height="${STAGE.h}">
<g class="${id}ln">${sg.map((s) => `<path d="${d(s)}"/>`).join('')}</g>
<path class="${id}tr" pathLength="1" d="${d(sg[ti])}"/>
${tops}${bots}
<circle class="${id}end" cx="${xs[perm[ti]]}" cy="${842 - fs * 0.36}" r="${r + 6}" fill="none" stroke="${RED}" stroke-width="7"/>
</svg>`,
    css: `
.${id}svg{position:absolute;inset:0;overflow:visible}
.${id}svg text{font-family:var(--to-font-display);font-weight:800;text-anchor:middle}
.${id}ln path{fill:none;stroke:var(--to-green);stroke-width:${sw};stroke-linecap:round;animation:${id}dim ${D}s both}
@keyframes ${id}dim{0%,${p(rev)}{opacity:1}${p(rev + 0.3)},100%{opacity:.18}}
.${id}tr{fill:none;stroke:${RED};stroke-width:${sw + 5};stroke-linecap:round;stroke-dasharray:1 1;animation:${id}tr ${D}s both}
@keyframes ${id}tr{0%,${p(rev + 0.1)}{stroke-dashoffset:1}${p(rev + 0.1 + TRACE)},100%{stroke-dashoffset:0}}
.${id}end{transform-box:fill-box;transform-origin:center;animation:${id}end ${D}s both}
@keyframes ${id}end{0%,${p(rev + 0.1 + TRACE)}{opacity:0;transform:scale(2.5)}${p(rev + 0.45 + TRACE)},100%{opacity:1;transform:scale(1)}}`,
    big: `${ask} → ${end}`,
    small: 'DID YOU GET IT RIGHT?',
    answer: `line ${ask} ends at ${end} (${n} lines; all: ${perm.map((e, i) => `${i + 1}→${LETTERS[e]}`).join(', ')})`,
  };
};

const { html, answer } = levelClip({
  title: 'Follow the line',
  hook: { big: 'ONLY <em>3%</em><br>PASS LEVEL 3', small: 'EYES ONLY · NO FINGERS' },
  levels: [
    { secs: 5, head: { title: 'FOLLOW LINE<em>1</em>', sub: 'WHICH LETTER? · 5 SECONDS' }, build: level({ n: 3, ask: 1, rows: 4 }) },
    { secs: 6, head: { title: 'FOLLOW LINE<em>4</em>', sub: '5 LINES · 6 SECONDS' }, build: level({ n: 5, ask: 4, rows: 6 }) },
    { secs: 6, head: { title: 'FOLLOW LINE<em>3</em>', sub: '7 LINES · 6 SECONDS' }, build: level({ n: 7, ask: 3, rows: 7, sw: 6 }) },
  ],
});

write(HERE, {
  html,
  caption: `Only 3% pass level 3 👀 Follow the red-numbered line with your eyes only — no fingers!
3 lines, then 5, then 7 tangled lines…
Comment your score: 1, 2 or 3 👇 Tag a friend who needs an eye check 👓
#eyetest #followtheline #puzzle #brainteaser #glasses #optical #fyp`,
  answer,
});
