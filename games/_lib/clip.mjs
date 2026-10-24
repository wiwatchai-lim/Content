// Shared building blocks for the eye-test game clips (1080×1920, CSS-animated, rendered with `npm run video`).
// Layout matches games/hidden-letter: title block at the top, a 900×860 stage, countdown + timer bar, answer block.
import fs from 'node:fs';
import path from 'node:path';

export const STAGE = { left: 90, top: 470, w: 900, h: 860 };
export const RED = '#C0392B';

// Small deterministic PRNG (mulberry32) seeded from a string.
export function rng(seedStr) {
  let h = 1779033703;
  for (const c of String(seedStr)) h = Math.imul(h ^ c.charCodeAt(0), 3432918353), h = (h << 13) | (h >>> 19);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seconds -> keyframe percentage of a D-second clip.
export const pct = (D) => (t) => ((Math.min(Math.max(t, 0), D) / D) * 100).toFixed(3) + '%';

// Visible only between `from` and `to` (seconds), with short fades.
export function window_(name, D, from, to = D, fade = 0.3) {
  const p = pct(D);
  const end = to >= D ? `${p(from + fade)},100%{opacity:1}` : `${p(from + fade)},${p(to - fade)}{opacity:1}${p(to)},100%{opacity:0}`;
  return `@keyframes ${name}{0%,${p(from)}{opacity:0}${end}}`;
}

// Countdown digits + draining timer bar, running `secs` seconds from `start`. `id` keeps several apart.
export function countdown({ D, start, secs, id = 'c' }) {
  const p = pct(D);
  const css = [], html = [];
  for (let s = 0; s < secs; s++) {
    const from = ((start + s) / D) * 100, to = ((start + s + 1) / D) * 100;
    css.push(`@keyframes ${id}d${s}{0%,${(from - 0.01).toFixed(3)}%{opacity:0;transform:scale(1.4)}`
      + `${from.toFixed(3)}%{opacity:1;transform:scale(1.4)}${(from + 1.2).toFixed(3)}%{opacity:1;transform:scale(1)}`
      + `${(to - 0.01).toFixed(3)}%{opacity:1;transform:scale(1)}${to.toFixed(3)}%,100%{opacity:0}}`
      + `.${id}d${s}{animation:${id}d${s} ${D}s linear both}`);
    html.push(`<b class="dg ${id}d${s}">${secs - s}</b>`);
  }
  css.push(`.${id}t{animation:${id}tf ${D}s both}.${id}t i{animation:${id}tn ${D}s linear both}`
    + `@keyframes ${id}tn{0%,${p(start)}{transform:scaleX(1)}${p(start + secs)},100%{transform:scaleX(0)}}`
    + `@keyframes ${id}tf{0%,${p(start - 0.3)}{opacity:0}${p(start)},${p(start + secs)}{opacity:1}${p(start + secs + 0.3)},100%{opacity:0}}`);
  return {
    css: css.join('\n'),
    html: `<div class="count">${html.join('')}</div><div class="timer ${id}t"><i></i></div>`,
  };
}

// Answer text that rises in at `at` seconds.
export function answer({ D, at, big, small = '', id = 'ans', until = D }) {
  const p = pct(D);
  const out = until < D ? `${p(until - 0.3)}{opacity:1;transform:none}${p(until)},100%{opacity:0;transform:none}` : '100%{opacity:1;transform:none}';
  return {
    css: `.${id}{animation:${id}k ${D}s both}@keyframes ${id}k{0%,${p(at)}{opacity:0;transform:translateY(30px)}${p(at + 0.5)}{opacity:1;transform:none}${out}}`,
    html: `<div class="answer ${id}"><div class="big">${big}</div>${small ? `<div class="where">${small}</div>` : ''}</div>`,
  };
}

// Full page; `root` is the path from the page to the project root. `head` = { eyebrow, title (may hold <em>), sub }; `stage` = HTML placed in the 900×860 stage.
export function page({ title, D, head, stage, css = '', extra = '', script = '', root = '../..' }) {
  const p = pct(D);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="${root}/brand/tokens.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=Inter:wght@500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;overflow:hidden;background:var(--to-snow);color:var(--to-green);font-family:var(--to-font-display);position:relative}
.logo{position:absolute;top:96px;left:50%;width:210px;transform:translateX(-50%);opacity:.85}
.head{position:absolute;top:200px;left:0;right:0;text-align:center;animation:drop ${D}s both}
.eyebrow{font:700 30px/1 var(--to-font-body);letter-spacing:var(--to-track-eyebrow);color:var(--to-black);opacity:.7}
.title{margin-top:18px;font-weight:800;font-size:92px;letter-spacing:var(--to-track-display);line-height:1}
.title em{font-style:normal;display:inline-block;background:var(--to-green);color:var(--to-snow);padding:0 22px;margin-left:10px}
.sub{margin-top:20px;font:700 30px/1 var(--to-font-body);letter-spacing:.12em;color:var(--to-green-on-dark)}
@keyframes drop{0%{opacity:0;transform:translateY(-40px)}${p(0.5)},100%{opacity:1;transform:none}}
.stage{position:absolute;left:${STAGE.left}px;top:${STAGE.top}px;width:${STAGE.w}px;height:${STAGE.h}px}
.count{position:absolute;left:0;right:0;top:1355px;height:180px;text-align:center}
.dg{position:absolute;left:0;right:0;font-weight:800;font-size:170px;line-height:180px;opacity:0}
.timer{position:absolute;left:90px;right:90px;top:1545px;height:16px;background:var(--to-timberwolf)}
.timer i{position:absolute;inset:0;background:var(--to-green);transform-origin:left}
.answer{position:absolute;left:0;right:0;top:1370px;text-align:center}
.answer .big{font-weight:800;font-size:96px;letter-spacing:var(--to-track-display)}
.answer .where{margin-top:14px;font:700 40px/1.25 var(--to-font-body);letter-spacing:.08em;color:var(--to-black)}
${css}
</style></head>
<body data-width="1080" data-height="1920" data-duration="${D}" data-fps="30">
<img class="logo" src="${root}/brand/logo/timeoptic.svg" alt="">
${head ? `<div class="head">
  <div class="eyebrow">${head.eyebrow}</div>
  <div class="title">${head.title}</div>
  ${head.sub ? `<div class="sub">${head.sub}</div>` : ''}
</div>` : ''}
<div class="stage">
${stage}
</div>
${extra}
${script ? `<script>\n${script}\n</script>` : ''}
</body></html>
`;
}

// Write clip.html, caption.txt and answer.txt into the game's folder.
export function write(dir, { html, caption, answer: ans }) {
  fs.writeFileSync(path.join(dir, 'clip.html'), html);
  fs.writeFileSync(path.join(dir, 'caption.txt'), caption.trim() + '\n');
  fs.writeFileSync(path.join(dir, 'answer.txt'), ans.trim() + '\n');
  console.log(`${path.basename(dir)}: ${ans.trim().split('\n')[0]}`);
}

// Line-art glasses (front view) as SVG markup, drawn in a 400×170 box. Options switch the details
// that the spot-the-difference games change.
export function glasses({
  lensRx = 34, bridge = 'arch', rivets = [true, true], tips = ['curl', 'curl'], temples = true,
  stroke = 'var(--to-green)', sw = 8, tint = 'rgba(18,58,41,.06)',
} = {}) {
  const L = { x: 22, y: 30, w: 160, h: 112 }, R = { x: 218, y: 30, w: 160, h: 112 };
  const lens = (b) => `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${lensRx}" ry="${lensRx}" fill="${tint}"/>`;
  const br = bridge === 'double'
    ? `<path d="M182 62 Q200 46 218 62" fill="none"/><path d="M178 34 L222 34" fill="none"/>`
    : bridge === 'keyhole'
      ? `<path d="M182 70 Q186 50 200 50 Q214 50 218 70" fill="none"/>`
      : `<path d="M182 62 Q200 44 218 62" fill="none"/>`;
  // Endpieces with optional rivet pairs.
  const end = (x, dir, on) => `<path d="M${x} 46 L${x + dir * 18} 46 L${x + dir * 18} 64 L${x} 64" fill="none"/>`
    + (on ? `<circle cx="${x + dir * 6}" cy="55" r="3.2" fill="${stroke}" stroke="none"/><circle cx="${x + dir * 13}" cy="55" r="3.2" fill="${stroke}" stroke="none"/>` : '');
  // Temples folded behind the lenses; the tip either curls down or ends straight.
  const temple = (side, tip) => {
    const x0 = side < 0 ? 4 : 396, x1 = side < 0 ? 150 : 250;
    const t = tip === 'curl' ? ` Q${x1 + side * 26} 122 ${x1 + side * 22} 140` : '';
    return `<path d="M${x0} 64 L${x0} 112 L${x1} 112${t}" fill="none" stroke-width="${sw * 0.75}" opacity=".55"/>`;
  };
  return `<g stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">`
    + (temples ? temple(-1, tips[0]) + temple(1, tips[1]) : '')
    + lens(L) + lens(R) + br
    + `<path d="M170 116 Q174 128 166 134" fill="none" stroke-width="${sw * 0.6}"/><path d="M230 116 Q226 128 234 134" fill="none" stroke-width="${sw * 0.6}"/>`
    + end(22, -1, rivets[0]) + end(378, 1, rivets[1])
    + `</g>`;
}
