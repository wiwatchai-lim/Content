// Brand battle on a map of Thailand (Thai text, 60 s, 1080x1920).
// Ten eyewear brands from stock split the 77 provinces; each battle a random brand attacks a neighbour,
// both roll 3 dice x power (power grows with provinces), the winner takes all of the loser's provinces.
// node build.mjs [seed]  -> hf/index.html, clip-audio.json, data/battles.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const geo = JSON.parse(fs.readFileSync(path.join(DIR, 'data/thailand.json'), 'utf8'));

const BRANDS = [
  { id: 'rayban', name: 'Ray-Ban', color: '#E63B2E' },
  { id: 'oakley', name: 'Oakley', color: '#F28C28' },
  { id: 'ferrari', name: 'Ferrari', color: '#F4C20D' },
  { id: 'vogue', name: 'Vogue', color: '#EC6FAE' },
  { id: 'prada', name: 'Prada', color: '#8B6CF0' },
  { id: 'bolon', name: 'Bolon', color: '#2DBE7E' },
  { id: 'coach', name: 'Coach', color: '#B07A4A' },
  { id: 'paulhueman', name: 'Paul Hueman', color: '#3DA5F4' },
  { id: 'boss', name: 'BOSS', color: '#A9B4C4' },
  { id: 'timberland', name: 'Timberland', color: '#7FA33A' },
];
const NB = BRANDS.length;

// ---------- geometry ----------
const K = 100, COS = Math.cos((13 * Math.PI) / 180);
const proj = ([lon, lat]) => [(lon - 97) * COS * K, (21 - lat) * K];
const provs = geo.features.map((f, i) => {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const rings = polys.map((p) => p[0].map(proj));
  let d = '', pts = [], minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9, area = 0, cx = 0, cy = 0;
  for (const r of rings) {
    let last = null, s = '';
    for (const [x, y] of r) {
      pts.push([x, y]);
      minx = Math.min(minx, x); miny = Math.min(miny, y); maxx = Math.max(maxx, x); maxy = Math.max(maxy, y);
      if (last && Math.hypot(x - last[0], y - last[1]) < 0.35) continue;
      s += (s ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
      last = [x, y];
    }
    d += s + 'Z';
    for (let j = 0; j < r.length - 1; j++) {
      const [x0, y0] = r[j], [x1, y1] = r[j + 1], c = x0 * y1 - x1 * y0;
      area += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c;
    }
  }
  return { i, name: f.properties.name, d, pts, bb: [minx, miny, maxx, maxy], c: [cx / (3 * area), cy / (3 * area)], area: Math.abs(area / 2) };
});
const NP = provs.length;

// adjacency: provinces with vertices closer than EPS
const EPS = 1.0, cell = new Map();
provs.forEach((p) => p.pts.forEach(([x, y]) => {
  const k = Math.floor(x / EPS) + ',' + Math.floor(y / EPS);
  if (!cell.has(k)) cell.set(k, new Set());
  cell.get(k).add(p.i);
}));
const adj = provs.map(() => new Set());
for (const [k, set] of cell) {
  const [gx, gy] = k.split(',').map(Number);
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
    const o = cell.get(gx + dx + ',' + (gy + dy));
    if (!o) continue;
    for (const a of set) for (const b of o) if (a !== b) { adj[a].add(b); adj[b].add(a); }
  }
}
// connect islands (e.g. Phuket) to the nearest province
const comp = () => { const seen = new Set([0]), q = [0]; while (q.length) for (const n of adj[q.pop()]) if (!seen.has(n)) { seen.add(n); q.push(n); } return seen; };
for (let s = comp(); s.size < NP; s = comp()) {
  let best = null;
  for (const a of provs) if (!s.has(a.i)) for (const b of provs) if (s.has(b.i)) {
    const d = Math.hypot(a.c[0] - b.c[0], a.c[1] - b.c[1]);
    if (!best || d < best[0]) best = [d, a.i, b.i];
  }
  adj[best[1]].add(best[2]); adj[best[2]].add(best[1]);
}

// ---------- seeded rng ----------
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

// ---------- partition: farthest-point seeds + balanced growth ----------
function partition(r) {
  const seeds = [Math.floor(r() * NP)];
  while (seeds.length < NB) {
    let best = -1, bi = 0;
    for (const p of provs) {
      const d = Math.min(...seeds.map((s) => Math.hypot(p.c[0] - provs[s].c[0], p.c[1] - provs[s].c[1])));
      if (d > best) { best = d; bi = p.i; }
    }
    seeds.push(bi);
  }
  const owner = new Array(NP).fill(-1);
  seeds.forEach((s, b) => (owner[s] = b));
  let left = NP - NB;
  while (left > 0) {
    const sizes = Array.from({ length: NB }, (_, b) => owner.filter((o) => o === b).length);
    const order = [...Array(NB).keys()].sort((a, b) => sizes[a] - sizes[b]);
    let done = false;
    for (const b of order) {
      const cand = new Set();
      owner.forEach((o, i) => { if (o === b) for (const n of adj[i]) if (owner[n] < 0) cand.add(n); });
      if (!cand.size) continue;
      const s = provs[seeds[b]].c;
      const n = [...cand].sort((x, y) => Math.hypot(provs[x].c[0] - s[0], provs[x].c[1] - s[1]) - Math.hypot(provs[y].c[0] - s[0], provs[y].c[1] - s[1]))[0];
      owner[n] = b; left--; done = true; break;
    }
    if (!done) break;
  }
  return { seeds, owner };
}

const power = (n) => +(1 + 0.1 * Math.floor(n / 6)).toFixed(1);

function simulate(seed) {
  const r = rng(seed);
  const { seeds, owner: own0 } = partition(r);
  // shuffle brands onto seeds
  const perm = [...Array(NB).keys()];
  for (let i = NB - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  const owner = own0.map((o) => perm[o]);
  const capital = []; seeds.forEach((s, k) => (capital[perm[k]] = s));
  const start = owner.slice();
  const alive = new Set([...Array(NB).keys()]);
  const battles = [];
  while (alive.size > 1) {
    const nbOf = (b) => { const s = new Set(); owner.forEach((o, i) => { if (o === b) for (const n of adj[i]) if (owner[n] !== b) s.add(owner[n]); }); return [...s]; };
    const att = pick(r, [...alive]);
    const def = pick(r, nbOf(att));
    const cnt = (b) => owner.filter((o) => o === b).length;
    const nA = cnt(att), nD = cnt(def), pA = power(nA), pD = power(nD);
    const dA = [1, 2, 3].map(() => 1 + Math.floor(r() * 6)), dD = [1, 2, 3].map(() => 1 + Math.floor(r() * 6));
    const sA = dA.reduce((a, b) => a + b), sD = dD.reduce((a, b) => a + b);
    const tA = +(sA * pA).toFixed(1), tD = +(sD * pD).toFixed(1);
    const win = tA > tD ? att : def, lose = win === att ? def : att;
    const lost = owner.map((o, i) => (o === lose ? i : -1)).filter((i) => i >= 0);
    // recolour order: BFS from the winner's border
    const depth = new Map(); let q = lost.filter((i) => [...adj[i]].some((n) => owner[n] === win));
    if (!q.length) q = [lost[0]];
    q.forEach((i) => depth.set(i, 0));
    while (q.length) { const nq = []; for (const i of q) for (const n of adj[i]) if (owner[n] === lose && !depth.has(n)) { depth.set(n, depth.get(i) + 1); nq.push(n); } q = nq; }
    lost.forEach((i) => { if (!depth.has(i)) depth.set(i, 0); });
    const before = owner.slice();
    lost.forEach((i) => (owner[i] = win));
    alive.delete(lose);
    battles.push({ att, def, nA, nD, pA, pD, dA, dD, sA, sD, tA, tD, win, lose, lost, depth: Object.fromEntries(depth), before, left: alive.size, upset: (win === att ? pA : pD) < (win === att ? pD : pA) });
  }
  return { start, capital, battles, champ: [...alive][0] };
}

// choose a seed with drama: close final, at least two upsets, no runaway early
const arg = process.argv[2];
let SEED = arg ? +arg : null, sim;
if (SEED === null) {
  for (let s = 1; s < 20000; s++) {
    const m = simulate(s), b = m.battles, f = b[b.length - 1];
    const sizes = Array.from({ length: NB }, (_, k) => m.start.filter((o) => o === k).length);
    if (Math.min(...sizes) < 5 || Math.max(...sizes) > 10) continue;
    if (Math.abs(f.tA - f.tD) > 3 || f.tA === f.tD) continue;
    if (b.filter((x) => x.upset).length < 2) continue;
    if (f.upset) continue;
    SEED = s; sim = m; break;
  }
} else sim = simulate(SEED);
console.log('seed', SEED, 'champion', BRANDS[sim.champ].name);
sim.battles.forEach((b, k) => console.log(k + 1, BRANDS[b.att].name, `${b.nA}p x${b.pA} [${b.dA}]=${b.tA}`, 'vs', BRANDS[b.def].name, `${b.nD}p x${b.pD} [${b.dD}]=${b.tD}`, '->', BRANDS[b.win].name, b.upset ? 'UPSET' : ''));

// ---------- camera ----------
const bbOf = (ids) => { const b = [1e9, 1e9, -1e9, -1e9]; ids.forEach((i) => { const p = provs[i].bb; b[0] = Math.min(b[0], p[0]); b[1] = Math.min(b[1], p[1]); b[2] = Math.max(b[2], p[2]); b[3] = Math.max(b[3], p[3]); }); return b; };
const fit = (bb, box, pad, maxS = 99) => {
  const w = bb[2] - bb[0], h = bb[3] - bb[1];
  const s = Math.min((box[2] - box[0] - 2 * pad) / w, (box[3] - box[1] - 2 * pad) / h, maxS);
  return { x: +((box[0] + box[2]) / 2 - s * (bb[0] + bb[2]) / 2).toFixed(2), y: +((box[1] + box[3]) / 2 - s * (bb[1] + bb[3]) / 2).toFixed(2), s: +s.toFixed(4) };
};
const ALL = bbOf([...Array(NP).keys()]);
const BIG = fit(ALL, [120, 430, 960, 1470], 0);
const SMALL = fit(ALL, [60, 430, 1020, 1060], 10);

// ---------- timeline ----------
const T_INTRO = 3.6, D = 5.4, D_FINAL = 8.2, DUR = 60;
const T_OUT = T_INTRO + (sim.battles.length - 1) * D + D_FINAL;
const js = [], sfx = [];
const S = (t, file, gain = 0.5) => sfx.push({ t: +t.toFixed(3), file, gain });
const L = (s) => js.push(s);
const light = (hex, k = 0.45) => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * k)); return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join(''); };
const sel = (ids) => JSON.stringify(ids.map((i) => '#p' + i).join(','));
const r2 = rng(SEED * 7 + 1);

// hook
L(`tl.fromTo('#mapwrap',{scale:1.32,filter:'blur(14px)'},{scale:1,filter:'blur(0px)',duration:0.18,ease:'power3.out'},0);`);
L(`tl.fromTo('#flash',{opacity:0.85},{opacity:0,duration:0.35,ease:'power2.out'},0.02);`);
L(`tl.fromTo('#stage',{x:0,y:0},{keyframes:[{x:-16,y:10,duration:0.04},{x:14,y:-8,duration:0.04},{x:-9,y:6,duration:0.04},{x:6,y:-3,duration:0.04},{x:0,y:0,duration:0.05}]},0.12);`);
L(`tl.fromTo('#title',{scale:2.2,opacity:0},{scale:1,opacity:1,duration:0.22,ease:'back.out(2)'},0.0);`);
L(`tl.fromTo('#sub',{y:20,opacity:0},{y:0,opacity:1,duration:0.35,ease:'power2.out'},0.45);`);
L(`tl.fromTo('#counter',{scale:0,rotation:-20},{scale:1,rotation:0,duration:0.35,ease:'back.out(2.4)'},0.3);`);
L(`tl.fromTo('#smallmark',{opacity:0,x:-20},{opacity:0.85,x:0,duration:0.4},0.6);`);
L(`tl.fromTo('.lbl .in',{scale:0},{scale:1,duration:0.3,ease:'back.out(2.5)',stagger:0.07},0.25);`);
L(`tl.fromTo('#hook1',{scale:0,opacity:0},{scale:1,opacity:1,duration:0.3,ease:'back.out(2.2)'},0.9);`);
L(`tl.fromTo('#hook2',{scale:2.4,opacity:0},{scale:1,opacity:1,duration:0.22,ease:'power4.in'},1.55);`);
L(`tl.fromTo('#stage',{x:0},{keyframes:[{x:-10,duration:0.04},{x:9,duration:0.04},{x:-5,duration:0.04},{x:0,duration:0.04}]},1.77);`);
L(`tl.to(['#hook1','#hook2'],{opacity:0,y:-30,duration:0.3,ease:'power2.in'},2.75);`);
L(`tl.fromTo(cam,{x:${BIG.x},y:${BIG.y},s:${BIG.s}},{x:${SMALL.x},y:${SMALL.y},s:${SMALL.s},duration:0.7,ease:'power3.inOut'},2.8);`);
L(`tl.fromTo('#botshade',{opacity:0},{opacity:1,duration:0.5},2.9);`);
L(`tl.fromTo('#panel',{y:900},{y:0,duration:0.55,ease:'power3.out'},2.95);`);
S(0, 'impact-bass-1', 0.9); S(0.02, 'whoosh-cinematic', 0.45);
for (let k = 0; k < NB; k++) S(0.25 + k * 0.07, 'pop', 0.18);
S(0.9, 'pop', 0.5); S(1.6, 'impact-bass-2', 0.8); S(2.8, 'whoosh', 0.4);

let camNow = SMALL;
const cards = [];
sim.battles.forEach((b, k) => {
  const fin = k === sim.battles.length - 1;
  const T = T_INTRO + k * D, f = fin ? 1.5 : 1, t = (x) => +(T + (fin ? 0.9 : 0) + x * f).toFixed(3);
  const A = BRANDS[b.att], Dd = BRANDS[b.def];
  const attP = b.before.map((o, i) => (o === b.att ? i : -1)).filter((i) => i >= 0);
  const defP = b.before.map((o, i) => (o === b.def ? i : -1)).filter((i) => i >= 0);
  const others = b.before.map((o, i) => (o !== b.att && o !== b.def ? i : -1)).filter((i) => i >= 0);
  const zoom = fit(bbOf([...attP, ...defP]), [70, 450, 1010, 1050], 40, SMALL.s * 3.4);
  cards.push({ k, b, fin });
  if (fin) {
    L(`tl.fromTo('#finalban',{scale:3,opacity:0},{scale:1,opacity:1,duration:0.25,ease:'power4.in'},${T});`);
    L(`tl.fromTo('#stage',{x:0},{keyframes:[{x:-12,duration:0.04},{x:10,duration:0.04},{x:-6,duration:0.04},{x:0,duration:0.04}]},${T + 0.25});`);
    L(`tl.to('#finalban',{opacity:0,scale:0.8,duration:0.25},${T + 1.05});`);
    S(T - 0.9, 'riser', 0.5); S(T + 0.25, 'impact-bass-1', 0.9);
  }
  if (camNow !== SMALL) { L(`tl.fromTo(cam,{x:${camNow.x},y:${camNow.y},s:${camNow.s}},{x:${SMALL.x},y:${SMALL.y},s:${SMALL.s},duration:0.45,ease:'power2.inOut'},${T});`); camNow = SMALL; }
  // attacker in, defender '?'
  L(`tl.fromTo('#A${k}',{x:-460,opacity:1},{x:0,duration:0.35,ease:'back.out(1.4)'},${t(0.05)});`);
  L(`tl.fromTo('#Q${k}',{scale:0,opacity:1},{scale:1,duration:0.3,ease:'back.out(2)'},${t(0.15)});`);
  L(`tl.fromTo(${sel(attP)},{fill:'${A.color}'},{fill:'${light(A.color, 0.6)}',duration:0.16,yoyo:true,repeat:3,ease:'sine.inOut'},${t(0.15)});`);
  S(t(0.05), 'whoosh-short', 0.45);
  // zoom + defender reveal
  L(`tl.fromTo(cam,{x:${SMALL.x},y:${SMALL.y},s:${SMALL.s}},{x:${zoom.x},y:${zoom.y},s:${zoom.s},duration:0.55,ease:'power3.inOut'},${t(0.8)});`); camNow = zoom;
  if (others.length) L(`tl.fromTo(${sel(others)},{opacity:1},{opacity:0.28,duration:0.4},${t(0.8)});`);
  const otherL = [...new Set(b.before)].filter((o) => o !== b.att && o !== b.def).map((o) => '#L' + o);
  if (otherL.length) L(`tl.to(${JSON.stringify(otherL.join(','))},{opacity:0,duration:0.3},${t(0.8)});`);
  L(`tl.to('#Q${k}',{scale:0,opacity:0,duration:0.15},${t(0.85)});`);
  L(`tl.fromTo('#D${k}',{scale:0.4,rotationY:90,opacity:0},{scale:1,rotationY:0,opacity:1,duration:0.35,ease:'back.out(1.8)'},${t(0.9)});`);
  L(`tl.fromTo(${sel(defP)},{fill:'${Dd.color}'},{fill:'${light(Dd.color, 0.6)}',duration:0.14,yoyo:true,repeat:3},${t(0.9)});`);
  L(`tl.fromTo('#X${k}',{scale:0,rotation:-90,opacity:1},{scale:1,rotation:0,duration:0.3,ease:'back.out(3)'},${t(1.05)});`);
  S(t(0.8), 'whoosh', 0.45); S(t(1.05), 'click', 0.7);
  // dice roll
  const steps = Math.round((1.2 * f) / 0.08);
  for (let s = 0; s < steps; s++) {
    const tt = +(t(1.4) + s * 0.08).toFixed(3);
    const fa = [0, 1, 2].map(() => 1 + Math.floor(r2() * 6)), fd = [0, 1, 2].map(() => 1 + Math.floor(r2() * 6));
    L(`F(${tt},'A${k}',[${fa}]);F(${tt},'D${k}',[${fd}]);`);
    if (s % 2 === 0) S(tt, 'click-soft', 0.22 + r2() * 0.12);
  }
  L(`tl.fromTo('#A${k} .die,#D${k} .die',{rotation:-25,y:-6},{rotation:25,y:6,duration:0.08,repeat:${steps - 1},yoyo:true,ease:'none'},${t(1.4)});`);
  const land = +(t(1.4) + steps * 0.08).toFixed(3);
  L(`F(${land},'A${k}',[${b.dA}]);F(${land},'D${k}',[${b.dD}]);`);
  L(`tl.set('#A${k} .die,#D${k} .die',{rotation:0,y:0},${land});`);
  L(`tl.fromTo('#A${k} .die,#D${k} .die',{scale:1.35},{scale:1,duration:0.25,ease:'back.out(3)'},${land});`);
  S(land, 'click', 0.8);
  // sums, then x power
  L(`tl.fromTo('#A${k} .sum,#D${k} .sum',{scale:0,opacity:1},{scale:1,duration:0.25,ease:'back.out(2.5)'},${t(2.65)});`);
  S(t(2.65), 'pop', 0.5);
  L(`tl.to('#A${k} .sum,#D${k} .sum',{opacity:0,y:-20,duration:0.15},${t(3.1)});`);
  L(`tl.fromTo('#A${k} .tot,#D${k} .tot',{scale:2,opacity:0},{scale:1,opacity:1,duration:0.25,ease:'back.out(2)'},${t(3.15)});`);
  L(`tl.fromTo('#A${k} .pw,#D${k} .pw',{scale:1},{scale:1.35,duration:0.15,yoyo:true,repeat:1},${t(3.05)});`);
  S(t(3.15), 'pop', 0.6);
  // result
  const W = b.win === b.att ? 'A' : 'D', Lz = W === 'A' ? 'D' : 'A';
  L(`tl.to('#${W}${k} .role0',{opacity:0,duration:0.12},${t(3.6)});tl.fromTo('#${W}${k} .roleW',{opacity:0,scale:1.6},{opacity:1,scale:1,duration:0.25,ease:'back.out(2)'},${t(3.6)});`);
  L(`tl.to('#${Lz}${k} .role0',{opacity:0,duration:0.12},${t(3.6)});tl.fromTo('#${Lz}${k} .roleL',{opacity:0},{opacity:1,duration:0.2},${t(3.6)});`);
  L(`tl.to('#${W}${k} .tot',{color:'#3BE08A',scale:1.15,duration:0.25,ease:'back.out(3)'},${t(3.6)});`);
  L(`tl.to('#${Lz}${k}',{filter:'grayscale(1) brightness(0.6)',duration:0.3},${t(3.6)});`);
  L(`tl.fromTo('#X${k}',{rotation:0},{rotation:${W === 'A' ? 35 : -35},duration:0.25,ease:'back.out(3)'},${t(3.6)});`);
  S(t(3.6), 'impact-bass-2', 0.75);
  if (b.upset) {
    L(`tl.fromTo('#UP${k}',{scale:2.5,opacity:0,rotation:-8},{scale:1,opacity:1,rotation:-4,duration:0.22,ease:'power4.in'},${t(3.75)});tl.to('#UP${k}',{opacity:0,duration:0.2},${t(4.75)});`);
    S(t(3.95), 'glitch-2', 0.45);
  }
  // conquest wave
  const Wb = BRANDS[b.win], Lb = BRANDS[b.lose];
  const maxDepth = Math.max(...Object.values(b.depth)), step = Math.min(0.09, (0.8 * f) / Math.max(1, maxDepth));
  const byDepth = {};
  b.lost.forEach((i) => (byDepth[b.depth[i]] ??= []).push(i));
  Object.entries(byDepth).forEach(([d, ids]) => {
    L(`tl.fromTo(${sel(ids)},{fill:'${Lb.color}'},{fill:'${Wb.color}',duration:0.22,ease:'power1.out'},${(t(3.9) + +d * step).toFixed(3)});`);
  });
  L(`tl.to('#L${b.lose} .in',{scale:0,opacity:0,duration:0.25,ease:'back.in(2)'},${t(4.0)});`);
  L(`tl.fromTo('#L${b.win} .in',{scale:1},{scale:1.3,duration:0.18,yoyo:true,repeat:1},${t(4.3)});`);
  S(t(3.9), 'whoosh-short', 0.4);
  // counter
  L(`tl.to('#n${b.left + 1}',{y:-60,opacity:0,duration:0.2},${t(4.3)});tl.fromTo('#n${b.left}',{y:60,opacity:0},{y:0,opacity:1,duration:0.25,ease:'back.out(2)'},${t(4.3)});`);
  L(`tl.fromTo('#counter',{scale:1},{scale:1.18,duration:0.12,yoyo:true,repeat:1},${t(4.3)});`);
  S(t(4.3), 'ping', 0.35);
  // clear
  if (!fin) {
    L(`tl.to(['#A${k}','#D${k}','#X${k}'],{opacity:0,y:30,duration:0.25,ease:'power2.in'},${t(4.95)});`);
    if (others.length) L(`tl.to(${sel(others)},{opacity:1,duration:0.3},${t(4.95)});`);
    if (otherL.length) L(`tl.to(${JSON.stringify(otherL.join(','))},{opacity:1,duration:0.3},${t(4.95)});`);
  } else {
    L(`tl.to(['#A${k}','#D${k}','#X${k}'],{opacity:0,duration:0.3},${T_OUT - 0.1});`);
    if (others.length) L(`tl.to(${sel(others)},{opacity:1,duration:0.3},${T_OUT});`);
  }
});

// outro
const C = BRANDS[sim.champ];
L(`tl.fromTo(cam,{x:${camNow.x},y:${camNow.y},s:${camNow.s}},{x:${BIG.x},y:${BIG.y},s:${BIG.s},duration:0.8,ease:'power3.inOut'},${T_OUT});`);
L(`tl.to('#panel',{y:900,duration:0.45,ease:'power2.in'},${T_OUT});`);
L(`tl.fromTo('#veil',{opacity:0},{opacity:0.78,duration:0.5},${T_OUT + 0.6});`);
L(`tl.to('.lbl',{opacity:0,duration:0.3},${T_OUT + 0.6});`);
L(`tl.to(['#title','#sub','#smallmark','#counter'],{opacity:0,y:-20,duration:0.3},${T_OUT + 0.5});`);
L(`tl.fromTo('#champ1',{scale:2.6,opacity:0},{scale:1,opacity:1,duration:0.24,ease:'power4.in'},${T_OUT + 0.75});`);
L(`tl.fromTo('#stage',{x:0},{keyframes:[{x:-14,duration:0.04},{x:12,duration:0.04},{x:-6,duration:0.04},{x:0,duration:0.04}]},${T_OUT + 0.99});`);
L(`tl.fromTo('#champTile',{y:80,opacity:0,scale:0.7},{y:0,opacity:1,scale:1,duration:0.45,ease:'back.out(1.6)'},${T_OUT + 1.0});`);
L(`tl.fromTo('#champTile img',{rotation:-6},{rotation:6,duration:0.6,yoyo:true,repeat:3,ease:'sine.inOut'},${T_OUT + 1.45});`);
L(`tl.fromTo('#champName',{y:30,opacity:0},{y:0,opacity:1,duration:0.35,ease:'back.out(2)'},${T_OUT + 1.2});`);
L(`tl.fromTo('#champSub',{opacity:0},{opacity:1,duration:0.35},${T_OUT + 1.45});`);
L(`tl.fromTo('#endmark',{y:60,opacity:0,scale:0.8},{y:0,opacity:1,scale:1,duration:0.5,ease:'back.out(1.6)'},${T_OUT + 2.3});`);
L(`tl.fromTo('#shine',{x:-700},{x:700,duration:0.8,ease:'power2.inOut'},${T_OUT + 2.85});`);
L(`tl.fromTo('#endline',{y:20,opacity:0},{y:0,opacity:1,duration:0.4},${T_OUT + 2.75});`);
L(`tl.fromTo('#endcta',{scale:0.6,opacity:0},{scale:1,opacity:1,duration:0.35,ease:'back.out(2)'},${T_OUT + 3.2});`);
L(`tl.fromTo('#endcta',{scale:1},{scale:1.06,duration:0.35,yoyo:true,repeat:3,ease:'sine.inOut'},${T_OUT + 3.6});`);
S(T_OUT, 'whoosh-cinematic', 0.5); S(T_OUT + 0.99, 'impact-bass-1', 0.9); S(T_OUT + 1.0, 'sparkle', 0.5);
S(T_OUT + 2.3, 'whoosh', 0.4); S(T_OUT + 2.85, 'chime', 0.5); S(T_OUT + 3.2, 'pop', 0.5);

// ---------- html ----------
const pathsSvg = provs.map((p) => `<path id="p${p.i}" d="${p.d}" style="fill:${BRANDS[sim.start[p.i]].color}"/>`).join('');
const labels = BRANDS.map((B, k) => {
  const c = provs[sim.capital[k]].c;
  return `<div class="lbl" id="L${k}" data-x="${c[0].toFixed(1)}" data-y="${c[1].toFixed(1)}"><div class="in"><img src="assets/g/${B.id}.png" alt=""/><span style="--c:${B.color}">${B.name}</span></div></div>`;
}).join('');
const die = (v) => `<div class="die" data-f="${v}"><i class="tl"></i><i class="tr"></i><i class="ml"></i><i class="c"></i><i class="mr"></i><i class="bl"></i><i class="br"></i></div>`;
const col = (side, k, B, n, p, s, tot) => `<div class="col ${side}" id="${side === 'l' ? 'A' : 'D'}${k}">
  <div class="role"><span class="role0">${side === 'l' ? 'ผู้บุก' : 'ผู้ตั้งรับ'}</span><span class="roleW">ชนะ!</span><span class="roleL">แพ้</span></div>
  <div class="tile" style="--c:${B.color}"><img src="assets/g/${B.id}.png" alt=""/></div>
  <div class="bn">${B.name}</div>
  <div class="st">${n} จังหวัด · <b class="pw">พลัง ×${p.toFixed(1)}</b></div>
  <div class="dice">${die(1)}${die(1)}${die(1)}</div>
  <div class="score"><span class="sum">${s}</span><span class="tot">${tot.toFixed(1)}</span></div>
</div>`;
const panelCards = cards.map(({ k, b }) => `<div class="q" id="Q${k}">?</div>
${col('l', k, BRANDS[b.att], b.nA, b.pA, b.sA, b.tA)}
${col('r', k, BRANDS[b.def], b.nD, b.pD, b.sD, b.tD)}
<svg class="x" id="X${k}" viewBox="0 0 100 100"><g stroke="#F5C84C" stroke-width="7" stroke-linecap="round"><path d="M18 18 L78 78"/><path d="M82 18 L22 78"/></g><g stroke="#fff" stroke-width="7" stroke-linecap="round"><path d="M64 70 L74 60"/><path d="M36 70 L26 60"/></g></svg>
${b.upset ? `<div class="upset" id="UP${k}">พลิกล็อก!</div>` : ''}`).join('\n');
const counters = Array.from({ length: NB }, (_, i) => `<span class="n" id="n${i + 1}">${i + 1}</span>`).join('');

const html = `<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <!-- Brand battle on the map of Thailand (Thai text, 60 s). Generated by ../build.mjs (seed ${SEED}); edit that, not this file. -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@500;600;700;800&family=Archivo:wght@700;800;900&display=swap" rel="stylesheet" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0B1620; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: 'Prompt', sans-serif; color: #fff; background: #0B1620; }
      .layer { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
      #bg { background: radial-gradient(ellipse at 50% 42%, #16303F 0%, #0B1620 62%);
            background-image: radial-gradient(ellipse at 50% 42%, rgba(30,70,90,.55) 0%, rgba(11,22,32,0) 65%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
            background-size: auto, 54px 54px, 54px 54px; }
      #stage { position: absolute; inset: 0; }
      #mapwrap { position: absolute; inset: 0; transform-origin: 540px 950px; }
      #map { position: absolute; left: 0; top: 0; }
      #map path { stroke: #0B1620; stroke-width: 1.1; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
      .lbl { position: absolute; left: 0; top: 0; width: 0; height: 0; }
      .lbl .in { position: absolute; left: -70px; top: -34px; width: 140px; display: flex; flex-direction: column; align-items: center; }
      .lbl img { width: 92px; height: auto; filter: drop-shadow(0 2px 4px rgba(0,0,0,.6)); }
      .lbl span { margin-top: 2px; padding: 3px 12px 4px; border-radius: 99px; background: #fff; color: #111; font: 800 21px/1 'Archivo', sans-serif; white-space: nowrap;
                  border-left: 8px solid var(--c); box-shadow: 0 3px 10px rgba(0,0,0,.45); }
      #topshade { background: linear-gradient(to bottom, rgba(11,22,32,.95) 0, rgba(11,22,32,.9) 400px, rgba(11,22,32,0) 470px); }
      #botshade { background: linear-gradient(to top, rgba(11,22,32,1) 0, rgba(11,22,32,.96) 380px, rgba(11,22,32,0) 560px); }
      #botshade { opacity: 0; }
      #title { position: absolute; left: 64px; top: 228px; font-weight: 800; font-size: 76px; line-height: 1.15; transform-origin: 0 50%;
               background: linear-gradient(180deg, #FFE27A, #F5A524); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 4px 0 #7A3A00); }
      #sub { position: absolute; left: 66px; top: 330px; font-weight: 600; font-size: 31px; color: #DCE6EE; }
      #sub b { color: #fff; background: #E5383B; padding: 0 10px; border-radius: 8px; margin-right: 8px; }
      #smallmark { position: absolute; left: 66px; top: 386px; width: 210px; }
      #counter { position: absolute; left: 768px; top: 236px; width: 166px; height: 142px; border-radius: 22px; background: #E5383B; box-shadow: 0 6px 0 #8E1C1F, 0 10px 24px rgba(0,0,0,.4); overflow: hidden; }
      #counter .n { position: absolute; left: 0; right: 0; top: 2px; text-align: center; font: 900 84px/1.1 'Archivo', sans-serif; opacity: 0; }
      #counter #n10 { opacity: 1; }
      #counter .cap { position: absolute; left: 0; right: 0; bottom: 10px; text-align: center; font-weight: 600; font-size: 22px; }
      .hook { position: absolute; left: 60px; right: 140px; text-align: center; font-weight: 800; opacity: 0; }
      #hook1 { top: 1150px; font-size: 54px; color: #fff; text-shadow: 0 4px 16px rgba(0,0,0,.9); }
      #hook2 { top: 1240px; font-size: 110px; color: #FFE27A; text-shadow: 0 6px 0 #8E1C1F, 0 8px 30px rgba(0,0,0,.8); }
      #panel { position: absolute; left: 60px; top: 1068px; width: 880px; height: 404px; border-radius: 30px; background: rgba(17,33,45,.96);
               border: 2px solid rgba(255,255,255,.08); box-shadow: 0 -10px 40px rgba(0,0,0,.45); }
      .col { position: absolute; top: 0; width: 340px; height: 404px; display: flex; flex-direction: column; align-items: center; opacity: 0; }
      .col.l { left: 34px; } .col.r { left: 506px; transform-origin: 50% 50%; }
      .role { position: relative; height: 40px; width: 100%; margin-top: 14px; }
      .role span { position: absolute; left: 0; right: 0; text-align: center; font-weight: 800; font-size: 28px; letter-spacing: 1px; }
      .role0 { color: #FF6B5E; } .col.r .role0 { color: #58B7FF; }
      .roleW { color: #3BE08A; opacity: 0; } .roleL { color: #8A97A3; opacity: 0; }
      .tile { width: 300px; height: 112px; border-radius: 18px; background: #F4F6F8; border-top: 10px solid var(--c); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(0,0,0,.35); }
      .tile img { width: 250px; max-height: 92px; object-fit: contain; }
      .bn { margin-top: 10px; font: 900 40px/1.05 'Archivo', sans-serif; text-transform: uppercase; letter-spacing: .5px; white-space: nowrap; }
      .st { margin-top: 4px; font-weight: 500; font-size: 23px; color: #B9C6D1; }
      .st b { display: inline-block; color: #FFD25E; font-weight: 700; }
      .dice { display: flex; gap: 12px; margin-top: 10px; }
      .die { position: relative; width: 50px; height: 50px; border-radius: 11px; background: #fff; box-shadow: inset 0 -4px 0 #C9D2DA, 0 3px 6px rgba(0,0,0,.4); }
      .die i { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #13222E; display: none; }
      .die .tl { left: 9px; top: 8px; } .die .tr { right: 9px; top: 8px; } .die .ml { left: 9px; top: 19px; } .die .c { left: 20px; top: 19px; }
      .die .mr { right: 9px; top: 19px; } .die .bl { left: 9px; bottom: 10px; } .die .br { right: 9px; bottom: 10px; }
      .die[data-f="1"] .c, .die[data-f="3"] .c, .die[data-f="5"] .c { display: block; }
      .die[data-f="2"] .tl, .die[data-f="2"] .br, .die[data-f="3"] .tl, .die[data-f="3"] .br { display: block; }
      .die[data-f="4"] i, .die[data-f="5"] i, .die[data-f="6"] i { display: block; }
      .die[data-f="4"] .ml, .die[data-f="4"] .mr, .die[data-f="4"] .c, .die[data-f="5"] .ml, .die[data-f="5"] .mr, .die[data-f="6"] .c { display: none; }
      .score { position: relative; width: 100%; height: 70px; margin-top: 4px; }
      .score span { position: absolute; left: 0; right: 0; text-align: center; font: 900 64px/1.1 'Archivo', sans-serif; opacity: 0; }
      .q { position: absolute; left: 576px; top: 70px; width: 200px; height: 200px; border-radius: 30px; background: rgba(255,255,255,.07); border: 3px dashed rgba(255,255,255,.3);
           font: 900 130px/190px 'Archivo', sans-serif; text-align: center; color: #58B7FF; opacity: 0; }
      .x { position: absolute; left: 400px; top: 150px; width: 80px; height: 80px; opacity: 0; }
      .upset { position: absolute; left: 180px; top: -170px; width: 520px; text-align: center; font-weight: 800; font-size: 80px; color: #fff; background: #E5383B;
               border-radius: 20px; padding: 6px 0 12px; box-shadow: 0 8px 0 #8E1C1F, 0 12px 30px rgba(0,0,0,.6); opacity: 0; }
      #finalban { position: absolute; left: 90px; top: 760px; width: 840px; text-align: center; font-weight: 800; font-size: 104px; color: #FFE27A;
                  text-shadow: 0 7px 0 #8E1C1F, 0 10px 40px rgba(0,0,0,.9); opacity: 0; }
      #veil { background: radial-gradient(ellipse at 50% 45%, rgba(11,22,32,.55), rgba(11,22,32,.97) 75%); opacity: 0; }
      #champ1 { position: absolute; left: 60px; width: 880px; top: 330px; text-align: center; font-weight: 800; font-size: 96px; color: #FFE27A; text-shadow: 0 7px 0 #7A3A00, 0 10px 30px rgba(0,0,0,.8); opacity: 0; }
      #champTile { position: absolute; left: 190px; top: 500px; width: 700px; height: 270px; border-radius: 34px; background: #F4F6F8; border-top: 16px solid ${C.color};
                   display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px rgba(255,226,122,.5), 0 20px 60px rgba(0,0,0,.6); opacity: 0; }
      #champTile img { width: 600px; max-height: 230px; object-fit: contain; }
      #champName { position: absolute; left: 60px; width: 880px; top: 800px; text-align: center; font: 900 100px/1 'Archivo', sans-serif; text-transform: uppercase; opacity: 0; }
      #champSub { position: absolute; left: 60px; width: 880px; top: 918px; text-align: center; font-weight: 600; font-size: 40px; color: #DCE6EE; opacity: 0; }
      #endmark { position: absolute; left: 230px; top: 1050px; width: 620px; height: 120px; overflow: hidden; opacity: 0; }
      #endmark img { width: 620px; position: absolute; left: 0; top: 50%; transform: translateY(-50%); }
      #shine { position: absolute; top: -40px; left: 200px; width: 140px; height: 220px; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.75), rgba(255,255,255,0)); transform: skewX(-20deg); mix-blend-mode: overlay; }
      #endline { position: absolute; left: 60px; width: 880px; top: 1196px; text-align: center; font-weight: 600; font-size: 42px; opacity: 0; }
      #endline b { font-weight: 800; }
      #endcta { position: absolute; left: 120px; width: 760px; top: 1290px; text-align: center; font-weight: 700; font-size: 38px; color: #13222E; background: #FFE27A; border-radius: 99px; padding: 10px 0 14px; opacity: 0; }
      #flash { background: #fff; opacity: 0; pointer-events: none; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="bg" class="clip layer" data-start="0" data-duration="${DUR}" data-track-index="0"></div>
      <div id="stagewrap" class="clip layer" data-start="0" data-duration="${DUR}" data-track-index="1">
        <div id="stage">
          <div id="mapwrap">
            <svg id="map" width="1080" height="1920" viewBox="0 0 1080 1920"><g id="cam">${pathsSvg}</g></svg>
            <div id="labels">${labels}</div>
          </div>
          <div id="topshade" class="layer"></div>
          <div id="botshade" class="layer"></div>
          <div id="title">ศึกแว่นยึดไทย</div>
          <div id="sub"><b>EP.1</b>10 แบรนด์ ทอยเต๋าแย่งจังหวัด</div>
          <img id="smallmark" src="assets/timeoptic-white-spaced.svg" alt="TIMEOPTIC" />
          <div id="counter">${counters}<div class="cap">แบรนด์ที่เหลือ</div></div>
          <div id="hook1" class="hook">ใครแพ้ เสียทั้งดินแดน</div>
          <div id="hook2" class="hook">รอดแค่ 1!</div>
          <div id="panel">${panelCards}</div>
          <div id="finalban">ศึกชิงแชมป์!</div>
          <div id="veil" class="layer"></div>
          <div id="champ1">แชมป์ยึดไทย!</div>
          <div id="champTile"><img src="assets/g/${C.id}.png" alt="" /></div>
          <div id="champName" style="color:${C.color}">${C.name}</div>
          <div id="champSub">ครองครบทั้ง 77 จังหวัด</div>
          <div id="endmark"><img src="assets/timeoptic-white-spaced.svg" alt="TIMEOPTIC" /><div id="shine"></div></div>
          <div id="endline">ทุกแบรนด์ในศึกนี้ มีครบที่ <b>Time</b> <b>Optic</b></div>
          <div id="endcta">EP.2 แบรนด์ไหนควรมาท้าชิง? คอมเมนต์เลย</div>
        </div>
      </div>
      <div id="flash" class="clip layer" data-start="0" data-duration="1" data-track-index="2"></div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      const cam = { x: ${BIG.x}, y: ${BIG.y}, s: ${BIG.s} };
      const camEl = document.getElementById('cam');
      const lbls = [...document.querySelectorAll('.lbl')].map((el) => [el, +el.dataset.x, +el.dataset.y]);
      function applyCam() {
        camEl.setAttribute('transform', 'translate(' + cam.x + ',' + cam.y + ') scale(' + cam.s + ')');
        for (const [el, x, y] of lbls) el.style.transform = 'translate(' + (cam.x + cam.s * x) + 'px,' + (cam.y + cam.s * y) + 'px)';
      }
      function F(t, id, faces) {
        const ds = document.querySelectorAll('#' + id + ' .die');
        faces.forEach((f, i) => tl.set(ds[i], { attr: { 'data-f': f } }, t));
      }
      // every fromTo waits for its start time; resting states come from CSS and earlier tweens (seek-safe)
      const FT = (t, a, b, p) => tl.fromTo(t, a, Object.assign({ immediateRender: false }, b), p);
      tl.eventCallback('onUpdate', applyCam);
      tl.set('#panel', { y: 900 }, 0);
      ${js.map((l) => l.replace(/tl\.fromTo\(/g, 'FT(')).join('\n      ')}
      tl.set({}, {}, ${DUR});
      window.__timelines['main'] = tl;
      applyCam();
      tl.seek(0);
      applyCam();
    </script>
  </body>
</html>
`;
fs.writeFileSync(path.join(DIR, 'hf/index.html'), html);
fs.writeFileSync(path.join(DIR, 'clip-audio.json'), JSON.stringify({ seconds: DUR, song: 'audio/sound.m4a', song_start: 0, fade_out: 1.0, sfx }, null, 1));
fs.writeFileSync(path.join(DIR, 'data/battles.json'), JSON.stringify({ seed: SEED, champion: C.name, start: sim.start.map((o, i) => [provs[i].name, BRANDS[o].name]), battles: sim.battles.map((b) => ({ attacker: BRANDS[b.att].name, defender: BRANDS[b.def].name, dice: [b.dA, b.dD], power: [b.pA, b.pD], total: [b.tA, b.tD], winner: BRANDS[b.win].name, provinces_taken: b.lost.length, upset: b.upset })) }, null, 1));
console.log('T_OUT', T_OUT.toFixed(2), 'sfx', sfx.length);
