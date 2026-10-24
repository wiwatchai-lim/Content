// Game 1 — find the 6, three levels: a 6 among 8s, then a bigger grid, then a 6 among 8s, 9s and 0s with only 3 seconds.
// Usage: node games/01-find-the-6/make.mjs [seed]   then   npm run video -- games/01-find-the-6
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rng, write, RED, STAGE } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const rand = rng(process.argv[2] || 'find-the-6');

// Pick a cell away from the centre and the outer ring, where eyes land last.
function spot(cols, rows) {
  for (;;) {
    const c = 1 + Math.floor(rand() * (cols - 2)), r = 1 + Math.floor(rand() * (rows - 3));
    if (Math.hypot((c - (cols - 1) / 2) / cols, (r - (rows - 1) / 2) / rows) > 0.18) return [c, r];
  }
}

const level = ({ cols, rows, fillers, size = 0.8 }) => ({ id, rev, p, D }) => {
  const cell = Math.min(STAGE.w / cols, STAGE.h / rows);
  const ox = (STAGE.w - cell * cols) / 2, oy = (STAGE.h - cell * rows) / 2;
  const [tc, tr] = spot(cols, rows);
  let cells = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const hit = r === tr && c === tc;
    cells += `<span class="ch${hit ? ' hit' : ''}">${hit ? 6 : fillers[Math.floor(rand() * fillers.length)]}</span>`;
  }
  const x = ox + (tc + 0.5) * cell, y = oy + (tr + 0.5) * cell;
  return {
    stage: `<div class="${id}g">${cells}</div><div class="${id}ring"></div>`,
    css: `
.${id}g{position:absolute;left:${ox}px;top:${oy}px;display:grid;grid-template-columns:repeat(${cols},${cell}px);grid-auto-rows:${cell}px;font-size:${Math.round(cell * size)}px}
.${id}g .ch{display:flex;align-items:center;justify-content:center;font-weight:700;line-height:1;animation:${id}dim ${D}s both}
@keyframes ${id}dim{0%,${p(rev)}{color:var(--to-green)}${p(rev + 0.4)},100%{color:rgba(18,58,41,.15)}}
.${id}g .hit{animation:${id}pop ${D}s both}
@keyframes ${id}pop{0%,${p(rev)}{transform:scale(1);color:var(--to-green)}${p(rev + 0.35)}{transform:scale(1.9);color:${RED}}${p(rev + 0.7)},100%{transform:scale(1.4);color:${RED}}}
.${id}ring{position:absolute;left:${x}px;top:${y}px;width:${cell * 1.9}px;height:${cell * 1.9}px;margin:${-cell * 0.95}px 0 0 ${-cell * 0.95}px;
  border:${Math.max(5, Math.round(cell / 10))}px solid ${RED};border-radius:50%;animation:${id}ring ${D}s both}
@keyframes ${id}ring{0%,${p(rev)}{opacity:0;transform:scale(3)}${p(rev + 0.4)}{opacity:1;transform:scale(.9)}${p(rev + 0.6)},100%{opacity:1;transform:scale(1)}}`,
    big: 'FOUND IT?',
    small: `ROW ${tr + 1} · COLUMN ${tc + 1}`,
    focus: { x, y, scale: 2.2 },
    answer: `row ${tr + 1}, column ${tc + 1} (${cols}×${rows}, fillers ${fillers.join('/')})`,
  };
};

const { html, answer } = levelClip({
  title: 'Find the 6',
  hook: { big: 'ONLY <em>2%</em><br>PASS LEVEL 3', small: 'FIND THE 6' },
  levels: [
    { secs: 5, head: { title: 'FIND THE<em>6</em>', sub: '5 SECONDS' }, build: level({ cols: 9, rows: 10, fillers: [8] }) },
    { secs: 4, head: { title: 'FIND THE<em>6</em>', sub: 'BIGGER GRID · 4 SECONDS' }, build: level({ cols: 12, rows: 13, fillers: [8] }) },
    { secs: 3, head: { title: 'FIND THE<em>6</em>', sub: 'NOW WITH 9s · 3 SECONDS' }, build: level({ cols: 14, rows: 15, fillers: [8, 8, 9, 5, 0, 8] }) },
  ],
});

write(HERE, {
  html,
  caption: `Only 2% pass level 3 👀 Find the 6 before the timer runs out!
Comment your score: 1, 2 or 3 👇 Tag a friend who needs an eye check 👓
#eyetest #findthe6 #puzzle #brainteaser #glasses #optical #fyp`,
  answer,
});
