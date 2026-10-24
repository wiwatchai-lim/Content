// Game 3 — same colour? three illusions: squares on a gradient (YES), a checkerboard with a shadow (YES),
// then White's illusion on stripes where the two greys really are different (NO — the twist).
// Each reveal proves it: a bar of the real colour joins the patches and the background fades away.
// Usage: node games/03-same-color/make.mjs   then   npm run video -- games/03-same-color
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { write, RED } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const lab = 'font-weight:800;line-height:1;text-align:center';
const fade = (id, name, D, p, rev, to = 0.08, at = 0.7) => `@keyframes ${id}${name}{0%,${p(rev + at)}{opacity:1}${p(rev + at + 0.7)},100%{opacity:${to}}}`;
const grow = (id, D, p, rev, axis = 'X') => `@keyframes ${id}bar{0%,${p(rev)}{transform:scale${axis}(0)}${p(rev + 0.6)},100%{transform:scale${axis}(1)}}`;

// Level 1: two equal squares on a dark-to-light gradient.
const gradient = ({ id, rev, p, D }) => {
  const SAME = '#7E8F86', SQ = 220, Y = 300, L = 110, R = 900 - 110 - SQ;
  return {
    stage: `<div class="${id}bg"></div><div class="${id}lab" style="left:${L}px;color:var(--to-snow)">A</div><div class="${id}lab ${id}lb" style="left:${R}px">B</div>
<div class="${id}sq" style="left:${L}px"></div><div class="${id}sq" style="left:${R}px"></div><div class="${id}bar"></div>`,
    css: `
.${id}bg{position:absolute;inset:0;background:linear-gradient(90deg,#0B2219 0%,#123A29 18%,#8FA59A 55%,#F4F1EA 100%);animation:${id}bgo ${D}s both}
${fade(id, 'bgo', D, p, rev)}
.${id}sq{position:absolute;top:${Y}px;width:${SQ}px;height:${SQ}px;background:${SAME}}
.${id}lab{position:absolute;top:${Y - 84}px;width:${SQ}px;${lab};font-size:68px;color:var(--to-green)}
.${id}lab:first-of-type{animation:${id}la ${D}s both}
@keyframes ${id}la{0%,${p(rev + 0.7)}{color:var(--to-snow)}${p(rev + 1.4)},100%{color:var(--to-green)}}
.${id}bar{position:absolute;top:${Y + SQ / 2 - 40}px;left:${L + SQ - 2}px;width:${R - L - SQ + 4}px;height:80px;background:${SAME};transform-origin:left;animation:${id}bar ${D}s both}
${grow(id, D, p, rev)}`,
    big: 'YES!',
    small: 'SAME COLOUR<br>THE BACKGROUND FOOLED YOU',
    focus: { x: 450, y: Y + SQ / 2, scale: 1.2 },
    answer: `YES. A and B are both ${SAME}; the dark-to-light gradient makes A look lighter`,
  };
};

// Level 2: checkerboard with a ball's shadow (Adelson's checker-shadow idea, flat). A = dark tile in the light,
// B = light tile in the shadow; both are drawn as the same solid colour on top of the board.
const checker = ({ id, rev, p, D }) => {
  const LIGHT = [222, 224, 218], DARK = '#6F706D', n = 7, T = 96;
  const ox = (900 - n * T) / 2, oy = (860 - n * T) / 2;
  const a = (1 - 111 / 222).toFixed(3);   // shadow strength that turns LIGHT into DARK
  const A = [1, 1], B = [1, 4];
  const cx = (c) => ox + (c + 0.5) * T, cy = (r) => oy + (r + 0.5) * T;
  let tiles = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++)
    tiles += `<i style="left:${ox + c * T}px;top:${oy + r * T}px;background:${(c + r) % 2 ? `rgb(${LIGHT})` : DARK}"></i>`;
  const tile = ([c, r], k) => `<div class="${id}tl" style="left:${ox + c * T}px;top:${oy + r * T}px"><span>${k}</span></div>`;
  return {
    stage: `<div class="${id}bd">${tiles}<div class="${id}shd"></div><div class="${id}ball"></div></div>${tile(A, 'A')}${tile(B, 'B')}
<div class="${id}bar"></div>`,
    css: `
.${id}bd{position:absolute;inset:0;animation:${id}bdo ${D}s both}
${fade(id, 'bdo', D, p, rev, 0.1)}
.${id}bd i{position:absolute;width:${T}px;height:${T}px}
.${id}shd{position:absolute;left:${ox}px;top:${oy}px;width:${n * T}px;height:${n * T}px;background:radial-gradient(ellipse 290px 220px at ${cx(B[0]) + 70 - ox}px ${cy(B[1]) - oy}px,rgba(0,0,0,${a}) 0,rgba(0,0,0,${a}) 38%,rgba(0,0,0,0) 100%)}
.${id}ball{position:absolute;left:${cx(4) - 115}px;top:${cy(4) - 150}px;width:230px;height:230px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#4E8C6B 0,#1F5A3E 45%,#0B2219 100%);box-shadow:0 30px 40px rgba(0,0,0,.25)}
.${id}tl{position:absolute;width:${T}px;height:${T}px;background:${DARK}}
.${id}tl span{position:absolute;left:10px;top:8px;${lab};font-size:34px;color:var(--to-snow)}
.${id}bar{position:absolute;left:${cx(A[0]) - 24}px;top:${oy + (A[1] + 1) * T - 2}px;width:48px;height:${(B[1] - A[1] - 1) * T + 4}px;background:${DARK};
  transform-origin:top;animation:${id}bar ${D}s both}
${grow(id, D, p, rev, 'Y')}`,
    big: 'YES!',
    small: 'A AND B ARE THE SAME GREY<br>THE SHADOW FOOLED YOU',
    focus: { x: cx(A[0]) + 60, y: (cy(A[1]) + cy(B[1])) / 2, scale: 1.3 },
    answer: `YES. Tiles A and B are both ${DARK}; B sits in the ball's shadow, so your brain brightens it`,
  };
};

// Level 3: White's illusion. Grey bars on black stripes (A) vs on white stripes (B) — but here the greys
// really differ, so the answer is NO. The reveal fades the stripes and puts the two greys side by side.
const COL_A = '#868686', COL_B = '#969696';
const stripes = ({ id, rev, p, D }) => {
  const H = 44, N = 15, oy = (860 - H * N) / 2 + 30, X0 = 70, X1 = 830, W = 230, LA = 110, LB = 900 - 110 - W;
  let st = '', bars = '';
  for (let k = 0; k < N; k++) {
    st += `<i style="top:${oy + k * H}px;background:${k % 2 ? '#F4F1EA' : '#111'}"></i>`;
    if (k > 0 && k < N - 1) bars += `<b class="${id}gb" style="left:${k % 2 ? LB : LA}px;top:${oy + k * H}px;background:${k % 2 ? COL_B : COL_A}"></b>`;
  }
  const py = oy + 7 * H - 40;
  return {
    stage: `<div class="${id}st">${st}</div>${bars}<div class="${id}lab" style="left:${LA}px">A</div><div class="${id}lab" style="left:${LB}px">B</div>
<div class="${id}pf"><b style="background:${COL_A}">A</b><b style="background:${COL_B}">B</b></div>`,
    css: `
.${id}st{position:absolute;inset:0;animation:${id}sto ${D}s both}
${fade(id, 'sto', D, p, rev, 0.06, 0.2)}
.${id}st i{position:absolute;left:${X0}px;width:${X1 - X0}px;height:${H}px}
.${id}gb{position:absolute;width:${W}px;height:${H}px}
.${id}lab{position:absolute;top:${oy - 82}px;width:${W}px;${lab};font-size:64px;color:var(--to-green)}
.${id}pf{position:absolute;left:${450 - 160}px;top:${py}px;width:320px;height:124px;display:flex;animation:${id}pf ${D}s both;box-shadow:0 0 0 6px ${RED}}
.${id}pf b{flex:1;${lab};font-size:52px;line-height:124px;color:var(--to-snow)}
@keyframes ${id}pf{0%,${p(rev + 0.7)}{opacity:0;transform:scale(.6)}${p(rev + 1)}{opacity:1;transform:scale(1.08)}${p(rev + 1.2)},100%{opacity:1;transform:none}}`,
    big: 'NO!',
    small: 'B IS LIGHTER THAN A<br>DID THE TWIST GET YOU?',
    focus: { x: 450, y: py + 62, scale: 1.1 },
    answer: `NO. A bars are ${COL_A}, B bars are ${COL_B} (B is lighter); on black stripes A looks lighter than it is (White's illusion), so they look about the same`,
  };
};

const { html, answer } = levelClip({
  title: 'Same colour',
  hook: { big: 'ONLY <em>3%</em><br>GET ALL 3', small: 'SAME COLOUR? YES OR NO' },
  levels: [
    { secs: 5, head: { title: 'SAME<em>COLOUR?</em>', sub: 'IS A THE SAME AS B? · 5 SECONDS' }, build: gradient },
    { secs: 4, head: { title: 'SAME<em>COLOUR?</em>', sub: 'TILE A VS TILE B · 4 SECONDS' }, build: checker },
    { secs: 3, head: { title: 'SAME<em>COLOUR?</em>', sub: 'LAST ONE · 3 SECONDS' }, build: stripes },
  ],
  end: { question: 'HOW MANY<br>DID YOU GET?' },
});

write(HERE, {
  html,
  caption: `Same colour or not? Only 3% get all 3 right 👀 Say YES or NO before the timer runs out — level 3 has a twist!
Comment your score: 1, 2 or 3 👇 Tag a friend who trusts their eyes 👓
#eyetest #opticalillusion #illusion #brainteaser #colortest #optical #fyp`,
  answer,
});
