// ============================================================================================================
// fx.js — visual effects for the 2D story clips (seek-safe GSAP, deterministic). Theory: _craft/STYLES.md + FX.md.
// Inline after rig.js (build.py replaces /*FX*/). Needs `tl` (paused timeline).
//   const X = FX(tl, { seed: 3 });
//   X.boil('#chars svg', 0, 20)                  hand-drawn line boil (3 displacement states, on twos/threes)
//   X.particles(svg, 'dust'|'rain'|'snow'|'fireflies'|'embers'|'petals'|'leaves', t0, t1, { box, n, ... })
//   X.sparks(svg, t, x, y)   X.lightning(t)   X.impact(t, x, y)   X.speedLines(svg, t0, t1, x, y)
//   X.rays(svg, t0, t1, { x, angle })   X.fog(svg, t0, t1)   X.flicker(sel, t0, t1)   X.glitch(sel, t, dur)
//   X.grade(sel, t, 'night'|'dawn'|'memory'|'horror'|'noir'|'warm'|'cold'|'none', dur)   X.film(t0, t1)
//   X.iris(sel, t, dur, x, y, 'in'|'out')   X.wipe(sel, t, dur, 'left'|'right'|'up'|'down', 'in'|'out')   X.ghostWarp(sel, t0, t1)
// Every effect is built at setup time from a seeded random, so any seek renders the same frame.
// ============================================================================================================
function FX(tl, opt = {}) {
  const NS = 'http://www.w3.org/2000/svg', F = 1 / 24;
  let seed = opt.seed || 3; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const el = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e; };
  const root = document.querySelector('[data-composition-id]');
  const q = s => typeof s === 'string' ? document.querySelectorAll(s) : [s];

  // ---------- shared SVG filter defs ----------
  const defsSvg = el('svg', { width: 0, height: 0, style: 'position:absolute' }); root.prepend(defsSvg); const defs = el('defs', {}, defsSvg);
  function filt(id, inner) { const f = el('filter', { id, x: '-10%', y: '-10%', width: '120%', height: '120%' }, defs); f.innerHTML = inner; return f; }
  // line boil: 3 noise seeds; scale 2–4 = subtle hand-drawn, 6–10 = nervous / horror
  const BOIL = opt.boil ?? 2.6;
  for (let i = 0; i < 3; i++) filt('fxBoil' + i, `<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="${i * 7 + 1}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${BOIL}" xChannelSelector="R" yChannelSelector="G"/>`);
  filt('fxRough', `<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/>`);
  filt('fxGlow', `<feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>`);
  filt('fxSoft', `<feGaussianBlur stdDeviation="14"/>`);
  filt('fxWarp', `<feTurbulence id="fxWarpN" type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="0" id="fxWarpD" xChannelSelector="R" yChannelSelector="G"/>`);
  filt('fxRGB', `<feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/><feOffset in="r" dx="-6" result="r2"/>
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/><feOffset in="gb" dx="6" result="gb2"/><feBlend in="r2" in2="gb2" mode="screen"/>`);
  filt('fxPoster', `<feComponentTransfer><feFuncR type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncG type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncB type="discrete" tableValues="0 .25 .5 .75 1"/></feComponentTransfer>`);
  const grad = (id, stops, type = 'radialGradient') => { const g = el(type, { id }, defs); stops.forEach(([o, c, a]) => el('stop', { offset: o, 'stop-color': c, 'stop-opacity': a }, g)); };
  grad('fxDot', [[0, '#fff', 1], [1, '#fff', 0]]); grad('fxFly', [[0, '#fffbd0', 1], [.4, '#d9ff6a', .6], [1, '#9cff3a', 0]]);
  grad('fxEmber', [[0, '#fff2b0', 1], [.5, '#ff8a2a', .8], [1, '#ff3a00', 0]]); grad('fxFog', [[0, '#c8d6e8', .5], [1, '#c8d6e8', 0]]);
  const ray = el('linearGradient', { id: 'fxRay', x1: 0, y1: 0, x2: 0, y2: 1 }, defs); el('stop', { offset: 0, 'stop-color': '#fff3d6', 'stop-opacity': .45 }, ray); el('stop', { offset: 1, 'stop-color': '#fff3d6', 'stop-opacity': 0 }, ray);

  // ---------- line boil (hand-drawn wobble). on = frames per state: 2 ("on twos", lively) or 3 (calmer) ----------
  function boil(sel, t0, t1, on = 3) { const els = [...q(sel)]; let i = 0;
    for (let t = t0; t < t1; t += on * F, i++) els.forEach(e => tl.set(e, { attr: { filter: `url(#fxBoil${i % 3})` } }, t));
    els.forEach(e => tl.set(e, { attr: { filter: 'none' } }, t1)); }

  // ---------- particles ----------
  // box = [x, y, w, h] where they live. Each particle gets its own finite tween(s) so seeking is exact.
  function particles(svg, kind, t0, t1, o = {}) {
    const box = o.box || [0, 0, 1920, 1080], [bx, by, bw, bh] = box, dur = t1 - t0, g = el('g', { opacity: 0, 'pointer-events': 'none' }, svg);
    tl.to(g, { opacity: 1, duration: .6 }, t0); tl.to(g, { opacity: 0, duration: .6 }, t1 - .6);
    const N = o.n ?? { dust: 40, rain: 160, snow: 90, fireflies: 22, embers: 45, petals: 18, leaves: 14 }[kind];
    for (let i = 0; i < N; i++) {
      const x = bx + rnd() * bw, y = by + rnd() * bh, ph = rnd();
      if (kind === 'dust') {      // motes floating in a light beam: slow random drift, twinkle
        const c = el('circle', { cx: x, cy: y, r: .8 + rnd() * 2.2, fill: 'url(#fxDot)', opacity: .2 + rnd() * .5 }, g);
        tl.fromTo(c, { attr: { cx: x, cy: y } }, { attr: { cx: x + (rnd() - .5) * 160, cy: y + (rnd() - .3) * 120 }, duration: dur, ease: 'sine.inOut', immediateRender: false }, t0);
        tl.fromTo(c, { opacity: .1 }, { opacity: .7, duration: 1.5 + rnd() * 2, yoyo: true, repeat: Math.floor(dur / 2), ease: 'sine.inOut', immediateRender: false }, t0 + ph);
      } else if (kind === 'rain') {   // three depths: near = long, fast, bright; far = short, slow, dim
        const z = rnd(), len = 30 + z * 60, sp = .35 + (1 - z) * .45, ang = o.angle ?? 12, dx = Math.tan(ang * Math.PI / 180) * (bh + len);
        const l = el('line', { x1: 0, y1: 0, x2: -Math.tan(ang * Math.PI / 180) * len, y2: -len, stroke: '#cfe0ff', 'stroke-width': .8 + z * 1.6, opacity: .15 + z * .4, 'stroke-linecap': 'round' }, g);
        for (let t = t0 + ph * sp; t < t1; t += sp) tl.fromTo(l, { attr: { transform: `translate(${x} ${by - len})` } }, { attr: { transform: `translate(${x + dx} ${by + bh})` }, duration: sp, ease: 'none', immediateRender: false }, t);
      } else if (kind === 'snow') {
        const r = 1.5 + rnd() * 4, c = el('circle', { r, fill: '#fff', opacity: .4 + rnd() * .5 }, g), sp = 5 + rnd() * 6;
        for (let t = t0 - ph * sp; t < t1; t += sp) tl.fromTo(c, { attr: { transform: `translate(${x} ${by - 10})` } }, { attr: { transform: `translate(${x + (rnd() - .5) * 200} ${by + bh + 10})` }, duration: sp, ease: 'none', immediateRender: false }, Math.max(0, t));
      } else if (kind === 'fireflies') {
        const c = el('circle', { cx: 0, cy: 0, r: 9, fill: 'url(#fxFly)' }, g); let px = x, py = y;
        for (let t = t0; t < t1; t += 2.2) { const nx = Math.min(bx + bw, Math.max(bx, px + (rnd() - .5) * 220)), ny = Math.min(by + bh, Math.max(by, py + (rnd() - .5) * 160));
          tl.fromTo(c, { attr: { transform: `translate(${px} ${py})` } }, { attr: { transform: `translate(${nx} ${ny})` }, duration: 2.2, ease: 'sine.inOut', immediateRender: false }, t); px = nx; py = ny; }
        tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: .7 + rnd(), yoyo: true, repeat: Math.floor(dur), ease: 'sine.inOut', immediateRender: false }, t0 + ph * 2);
      } else if (kind === 'embers') {
        const c = el('circle', { r: 2 + rnd() * 4, fill: 'url(#fxEmber)' }, g), sp = 2.5 + rnd() * 3;
        for (let t = t0 - ph * sp; t < t1; t += sp) tl.fromTo(c, { attr: { transform: `translate(${x} ${by + bh})` }, opacity: 1 }, { attr: { transform: `translate(${x + (rnd() - .5) * 240} ${by})` }, opacity: 0, duration: sp, ease: 'power1.out', immediateRender: false }, Math.max(0, t));
      } else if (kind === 'petals' || kind === 'leaves') {
        const p = el('g', {}, g); const col = o.color || (kind === 'petals' ? '#fff6f0' : ['#c98a2e', '#a8642a', '#d8b04a'][i % 3]);
        el('path', { d: kind === 'petals' ? 'M0 -9 Q7 0 0 9 Q-7 0 0 -9 Z' : 'M0 -12 Q10 0 0 12 Q-10 0 0 -12 Z M0 -12 L0 12', fill: col, stroke: kind === 'leaves' ? '#5a3a1a' : 'none', 'stroke-width': 1 }, p);
        const sp = 5 + rnd() * 4;
        for (let t = t0 - ph * sp; t < t1; t += sp) { const x1 = x + 150 + rnd() * 250;
          tl.fromTo(p, { attr: { transform: `translate(${x} ${by - 20}) rotate(0) scale(1 1)` } }, { attr: { transform: `translate(${x1} ${by + bh + 20}) rotate(${360 + rnd() * 360}) scale(1 ${(rnd() * .6 + .3).toFixed(2)})` }, duration: sp, ease: 'none', immediateRender: false }, Math.max(0, t)); }
      }
    }
    return g;
  }
  function sparks(svg, t, x, y, n = 18, col = '#ffe39a') {
    for (let i = 0; i < n; i++) { const a = -Math.PI * rnd(), d = 60 + rnd() * 160, c = el('circle', { cx: x, cy: y, r: 1.5 + rnd() * 3, fill: col, opacity: 0 }, svg);
      tl.fromTo(c, { attr: { cx: x, cy: y }, opacity: 1 }, { attr: { cx: x + Math.cos(a) * d, cy: y + Math.sin(a) * d + 80 }, opacity: 0, duration: .4 + rnd() * .3, ease: 'power2.out', immediateRender: false }, t + rnd() * .08); }
  }

  // ---------- light ----------
  function overlay(color, z = 40, blend = 'normal') { const d = document.createElement('div'); d.style.cssText = `position:absolute;inset:0;background:${color};opacity:0;z-index:${z};pointer-events:none;mix-blend-mode:${blend}`; root.appendChild(d); return d; }
  const flashW = overlay('#fff', 45), flashB = overlay('#000', 44), tint = overlay('#7fa8ff', 43, 'screen');
  function lightning(t, scene, o = {}) {   // o.back = the scene's grade to return to   // flash–dark–flash, bluish; thunder ~0.3–2 s later in the sound
    [[0, .4], [2, 0], [4, .3], [6, 0], [9, .14], [13, 0]].forEach(([f, o]) => tl.set(flashW, { opacity: o }, t + f * F));   // the scene itself brightens; the white is only a kiss
    tl.set(tint, { opacity: .5 }, t); tl.to(tint, { opacity: 0, duration: .6 }, t + 6 * F);
    if (scene) { const back = o.back || 'none'; [[0, 'brightness(2.1) contrast(1.15) saturate(.6)'], [2, back], [4, 'brightness(1.8) contrast(1.1) saturate(.7)'], [6, back], [9, 'brightness(1.35)'], [13, back]].forEach(([f, v]) => tl.set(scene, { filter: v }, t + f * F)); }
  }
  function impact(t, x = 960, y = 540, svg) {   // 1 F white, 1 F inverted, speed lines burst — pair with cam.shake + a hit sound
    tl.set(flashW, { opacity: 1 }, t); tl.set(flashW, { opacity: 0 }, t + F);
    tl.set(root, { filter: 'invert(1)' }, t + F); tl.set(root, { filter: 'none' }, t + 2 * F);
    if (svg) speedLines(svg, t, t + 8 * F, x, y, 40);
  }
  function speedLines(svg, t0, t1, x, y, n = 60, col = '#fff') {   // anime focus lines, redrawn every 2 frames
    const g = el('g', { opacity: 0 }, svg); const sets = [];
    for (let k = 0; k < 3; k++) { const s = el('g', { opacity: 0 }, g); sets.push(s);
      for (let i = 0; i < n; i++) { const a = rnd() * Math.PI * 2, r0 = 260 + rnd() * 220, r1 = 1400, w = 2 + rnd() * 10;
        el('path', { d: `M${x + Math.cos(a - .004 * w) * r1} ${y + Math.sin(a - .004 * w) * r1} L${x + Math.cos(a) * r0} ${y + Math.sin(a) * r0} L${x + Math.cos(a + .004 * w) * r1} ${y + Math.sin(a + .004 * w) * r1} Z`, fill: col, opacity: .75 }, s); } }
    tl.set(g, { opacity: 1 }, t0); tl.set(g, { opacity: 0 }, t1);
    let i = 0; for (let t = t0; t < t1; t += 2 * F, i++) sets.forEach((s, k) => tl.set(s, { opacity: k === i % 3 ? 1 : 0 }, t));
  }
  function rays(svg, t0, t1, o = {}) {   // god rays from a window/lamp; slow shimmer
    const x = o.x ?? 1400, ang = o.angle ?? 25, n = o.n ?? 5, g = el('g', { opacity: 0, style: 'mix-blend-mode:screen', filter: 'url(#fxSoft)' }, svg);
    for (let i = 0; i < n; i++) { const w = 60 + rnd() * 140, r = el('rect', { x: x + i * 110 - w / 2, y: -200, width: w, height: 1700, fill: 'url(#fxRay)', transform: `rotate(${ang} ${x} -200)` }, g);
      tl.fromTo(r, { opacity: .4 }, { opacity: 1, duration: 2 + rnd() * 2, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 3)), ease: 'sine.inOut', immediateRender: false }, t0 + rnd()); }
    tl.to(g, { opacity: o.op ?? .8, duration: 1.2 }, t0); tl.to(g, { opacity: 0, duration: 1 }, t1 - 1); return g;
  }
  function fog(svg, t0, t1, o = {}) {   // layered drifting fog banks (lower = denser)
    const g = el('g', { opacity: 0 }, svg);
    for (let i = 0; i < (o.n ?? 7); i++) { const y = (o.y ?? 760) + rnd() * 260, x = rnd() * 1920, e = el('ellipse', { cx: x, cy: y, rx: 500 + rnd() * 400, ry: 70 + rnd() * 60, fill: 'url(#fxFog)', opacity: .5 + rnd() * .4 }, g);
      const dx = (rnd() < .5 ? -1 : 1) * (150 + rnd() * 250); tl.fromTo(e, { attr: { cx: x } }, { attr: { cx: x + dx }, duration: t1 - t0, ease: 'none', immediateRender: false }, t0); }
    tl.to(g, { opacity: o.op ?? .7, duration: 1.5 }, t0); tl.to(g, { opacity: 0, duration: 1.5 }, t1 - 1.5); return g;
  }
  function flicker(sel, t0, t1, o = {}) {   // a failing bulb: mostly on, irregular dips, sometimes a double blink
    const lo = o.lo ?? .35; for (let t = t0 + rnd(); t < t1; t += .4 + rnd() * 1.6) { tl.set(sel, { opacity: lo }, t); tl.set(sel, { opacity: 1 }, t + (1 + Math.floor(rnd() * 3)) * F);
      if (rnd() < .3) { tl.set(sel, { opacity: lo }, t + 4 * F); tl.set(sel, { opacity: 1 }, t + 6 * F); } }
  }

  // ---------- distortion ----------
  function glitch(sel, t, dur = .4) {   // RGB split + horizontal jitter, on random frames
    for (let k = 0; k < dur / F; k++) { const tt = t + k * F, on = rnd() < .6;
      tl.set(sel, { filter: on ? 'url(#fxRGB)' : 'none', x: on ? (rnd() - .5) * 30 : 0 }, tt); }
    tl.set(sel, { filter: 'none', x: 0 }, t + dur);
  }
  function ghostWarp(sel, t0, t1, amt = 14) {   // heat-haze / ghostly ripple: displacement scale breathes
    tl.set(sel, { filter: 'url(#fxWarp)' }, t0); const d = defs.querySelector('#fxWarpD'), n = defs.querySelector('#fxWarpN');
    tl.fromTo(d, { attr: { scale: 0 } }, { attr: { scale: amt }, duration: 1, ease: 'sine.inOut', immediateRender: false }, t0);
    tl.fromTo(n, { attr: { baseFrequency: '0.012 0.04' } }, { attr: { baseFrequency: '0.016 0.06' }, duration: t1 - t0, ease: 'none', immediateRender: false }, t0);
    tl.to(d, { attr: { scale: 0 }, duration: .6 }, t1 - .6); tl.set(sel, { filter: 'none' }, t1);
  }

  // ---------- grading ----------
  const GRADES = { none: 'none', night: 'brightness(.62) saturate(.7) hue-rotate(-12deg) contrast(1.08)', dawn: 'brightness(1.1) saturate(.85) contrast(.95) sepia(.12)',
    memory: 'sepia(.65) saturate(.8) brightness(1.05) contrast(.9) blur(.4px)', horror: 'saturate(.45) hue-rotate(40deg) brightness(.75) contrast(1.25)',
    noir: 'grayscale(1) contrast(1.45) brightness(.9)', warm: 'saturate(1.15) sepia(.18) brightness(1.04)', cold: 'saturate(.8) hue-rotate(-18deg) brightness(.95)',
    poster: 'url(#fxPoster) saturate(1.3)' };
  function grade(sel, t, name, dur = 0) { if (dur) tl.to(sel, { filter: GRADES[name], duration: dur, ease: 'sine.inOut' }, t); else tl.set(sel, { filter: GRADES[name] }, t); }

  // ---------- film look ----------
  function film(t0, t1, o = {}) {   // grain (re-seeded on twos), scratches, dust specks, gate weave, optional letterbox
    const s = el('svg', { viewBox: '0 0 1920 1080', style: 'position:absolute;inset:0;width:1920px;height:1080px;z-index:41;pointer-events:none;mix-blend-mode:overlay', opacity: o.grain ?? .12 }); root.appendChild(s);
    const gr = []; for (let k = 0; k < 4; k++) { const f = el('filter', { id: 'fxGrain' + k }, defs); f.innerHTML = `<feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${k * 13 + 2}"/>`;
      gr.push(el('rect', { width: 1920, height: 1080, filter: `url(#fxGrain${k})`, opacity: 0 }, s)); }
    let i = 0; for (let t = t0; t < t1; t += 2 * F, i++) gr.forEach((r, k) => tl.set(r, { attr: { opacity: k === i % 4 ? 1 : 0 } }, t));
    if (o.scratches !== false) { const sc = el('svg', { viewBox: '0 0 1920 1080', style: 'position:absolute;inset:0;width:1920px;height:1080px;z-index:42;pointer-events:none' }); root.appendChild(sc);
      for (let t = t0; t < t1; t += F) { if (rnd() > .12) continue; const x = rnd() * 1920, l = el('line', { x1: x, y1: 0, x2: x + (rnd() - .5) * 8, y2: 1080, stroke: rnd() < .5 ? '#fff' : '#000', 'stroke-width': 1 + rnd() * 1.5, opacity: 0 }, sc);
        tl.set(l, { attr: { opacity: .35 } }, t); tl.set(l, { attr: { opacity: 0 } }, t + F);
        if (rnd() < .5) { const d = el('circle', { cx: rnd() * 1920, cy: rnd() * 1080, r: 1 + rnd() * 3, fill: '#111', opacity: 0 }, sc); tl.set(d, { attr: { opacity: .6 } }, t); tl.set(d, { attr: { opacity: 0 } }, t + F); } } }
    if (o.weave) for (let t = t0; t < t1; t += 2 * F) tl.set(o.weave, { y: (rnd() - .5) * 2.4, x: (rnd() - .5) * 1.2 }, t);
    if (o.letterbox) { const h = o.letterbox; ['top', 'bottom'].forEach(side => { const b = document.createElement('div'); b.style.cssText = `position:absolute;left:0;right:0;${side}:0;height:${h}px;background:#000;z-index:46;transform:scaleY(0);transform-origin:${side}`; root.appendChild(b);
      tl.to(b, { scaleY: 1, duration: .8, ease: 'power2.inOut' }, t0); }); }
  }

  // ---------- shape transitions ----------
  function iris(sel, t, dur, x = 960, y = 540, dir = 'out') {   // circle closes (out) / opens (in) on a point — classic cartoon ending
    const big = 'circle(1400px at ' + x + 'px ' + y + 'px)', small = 'circle(0px at ' + x + 'px ' + y + 'px)';
    tl.fromTo(sel, { clipPath: dir === 'out' ? big : small }, { clipPath: dir === 'out' ? small : big, duration: dur, ease: dir === 'out' ? 'power2.in' : 'power2.out', immediateRender: false }, t);
  }
  function wipe(sel, t, dur, from = 'left', dir = 'in') {
    const full = 'inset(0% 0% 0% 0%)', hid = { left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)', up: 'inset(100% 0% 0% 0%)', down: 'inset(0% 0% 100% 0%)' }[from];
    tl.fromTo(sel, { clipPath: dir === 'in' ? hid : full }, { clipPath: dir === 'in' ? full : hid, duration: dur, ease: 'power2.inOut', immediateRender: false }, t);
  }
  return { F, rnd, boil, particles, sparks, lightning, impact, speedLines, rays, fog, flicker, glitch, ghostWarp, grade, GRADES, film, iris, wipe, overlay };
}
