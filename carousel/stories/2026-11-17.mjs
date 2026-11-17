// story carousels 21-30 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-17.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on warm beige textured sketch paper, smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'first-job', title: 'วันแรกของงานใหม่', plot: 'ตื่นเต้นจนมือสั่นในวันสัมภาษณ์ แต่มีเพื่อนรออยู่หน้าตึกจนได้งานแรก', slides: [
    ['พรุ่งนี้สัมภาษณ์<br>มือสั่นแล้วเนี่ย', 'ซ้อมกับฉันสิ<br><b>ฉันเป็นกรรมการเอง</b>', `A small living room. On the left, ${L} sits stiffly on a chair holding a resume paper with both hands. On the right, ${R} sits across a small table pretending to be an interviewer, holding a pen and notebook.`],
    ['ถ้าตอบไม่ได้<br>ล่ะ?', 'ก็บอกตรง ๆ<br><b>ความจริงใจก็เป็นคำตอบ</b>', `In front of a tall office building entrance. On the left, ${L} stands nervously holding a folder against their chest. On the right, ${R} fixes the collar of their hoodie gently.`],
    ['รอข้างนอก<br>ตั้งนานเลยเหรอ?', 'บอกแล้ว<br><b>ไม่ไปไหน</b>', `Outside an office building. On the left, ${L} walks out of the glass doors holding a folder. On the right, ${R} stands up from a street bench, two paper drink cups on the bench.`],
    ['เขารับฉัน<br>แล้ว!', 'รู้อยู่แล้ว<br><b>ว่าต้องเป็นเธอ</b>', `A city sidewalk. On the left, ${L} jumps with both arms up holding a phone in one hand, overjoyed. On the right, ${R} claps both hands, happy. Both people fully visible.`],
    ['เงินเดือนแรก<br>เลี้ยงข้าวนะ', 'งั้นขอ<br><b>ร้านเดิมที่เราชอบ</b>', `A small simple noodle shop with a street-side table. Two people sitting across from each other, ${L} and ${R}, two bowls of noodles between them, raising their glasses in a toast. Bright daytime.`],
  ]},
  { slug: 'moving-day', title: 'วันย้ายบ้าน', plot: 'กล่องกองเต็มห้องในวันย้ายบ้าน มีเพื่อนมาช่วยขน และห้องใหม่ที่กลายเป็นบ้าน', slides: [
    ['กล่องเยอะขนาดนี้<br>ทำคนเดียวไม่ไหว', 'ใครบอกว่า<br><b>เธอทำคนเดียว</b>', `A room full of stacked cardboard boxes. On the left, ${L} sits on the floor among the boxes, tired, holding a roll of tape. On the right, ${R} stands at the open door rolling up their sleeves, ready to help.`],
    ['กล่องนี้<br>หนักมากเลย', 'ยกพร้อมกัน<br><b>นับหนึ่ง สอง สาม</b>', `A narrow staircase. Two people carrying one big cardboard box together, ${L} on the left at the bottom end and ${R} on the right at the top end, both straining with effort.`],
    ['ห้องใหม่<br>ว่างจังเลย', 'เดี๋ยวก็เต็ม<br><b>ด้วยเรื่องราวใหม่</b>', `An empty bright new apartment room with a big window and bare walls. Two people standing in the middle, ${L} and ${R}, looking around the empty room, a few boxes on the floor.`],
    ['หิวแล้ว<br>ยังไม่มีโต๊ะเลย', 'กินบนกล่อง<br><b>ก็อร่อยเหมือนกัน</b>', `A new apartment room with boxes. Two people sitting on the floor, ${L} and ${R}, eating takeaway food from boxes placed on top of a cardboard box used as a table. Relaxed and laughing.`],
    ['ขอบคุณนะ<br>ที่มาช่วย', 'บ้านใหม่<br><b>ต้องมีความทรงจำแรก</b>', `A cozy furnished small apartment room with a sofa, a lamp and plants. Two people sitting on the sofa, ${L} and ${R}, holding mugs, looking at a framed picture just hung on the wall. Warm daylight.`],
  ]},
  { slug: 'krathong', title: 'กระทงใบแรก', plot: 'ทำกระทงครั้งแรก เบี้ยว ๆ ไม่สวย แต่ลอยไปพร้อมคำขอที่จริงใจที่สุด', slides: [
    ['ทำกระทงไม่เป็น<br>เลยสักนิด', 'ไม่ต้องสวย<br><b>แค่ทำด้วยกัน</b>', `A table outdoors with banana leaves, flowers, a round slice of banana trunk and pins. On the left, ${L} holds a folded banana leaf awkwardly. On the right, ${R} shows how to fold the leaf. Daytime.`],
    ['ของฉัน<br>เบี้ยวไปหมด', 'เบี้ยวแต่น่ารัก<br><b>เหมือนเจ้าของ</b>', `Two people sitting at an outdoor table, ${L} and ${R}, each holding a finished small floating flower boat made of banana leaves with a candle, the left one is crooked. Laughing body language.`],
    ['จะขออะไรดี<br>นะ?', 'ขออะไรก็ได้<br><b>ที่ทำให้เธอยิ้ม</b>', `A calm river bank in soft early evening with a pale cream sky. Two people kneeling at the water edge, ${L} and ${R}, holding small flower boats with candles in their hands, heads bowed, making a wish.`],
    ['มันลอยไปด้วยกัน<br>เลย', 'เหมือนเรา<br><b>ไม่ปล่อยกันง่าย ๆ</b>', `A calm river in soft early evening with a pale cream sky. Two small flower boats with candles floating side by side on the water. Two people standing on the bank, ${L} and ${R}, watching them, one pointing.`],
    ['ปีหน้า<br>ทำใหม่ด้วยกันนะ', 'ทุกปี<br><b>จนกว่าจะทำสวย</b>', `Two people walking side by side along a river bank path, seen from behind, ${L} and ${R}, soft light, pale cream sky, a few tiny floating flower boats on the river far away.`],
  ]},
  { slug: 'haircut', title: 'ทรงผมใหม่', plot: 'ตัดผมพังจนไม่กล้าออกจากบ้าน แต่มีคนบอกว่าทรงนี้คือทรงที่ดีที่สุด', slides: [
    ['ตัดผมพัง<br>ไม่กล้าออกไปไหนเลย', 'ถอดฮู้ดสิ<br><b>ขอดูหน่อย</b>', `A small room. On the left, ${L} sits on a bed hiding, pulling the hood of the sweatshirt down tightly with both hands. On the right, ${R} stands in front of them, leaning forward kindly.`],
    ['สั้นไปใช่ไหม?<br>ตอบตรง ๆ', 'ตอบตรง ๆ<br><b>เห็นหน้าเธอชัดขึ้นนะ</b>', `A small room with a standing mirror. On the left, ${L} with the hood down looks into the mirror touching their own head. On the right, ${R} stands beside the mirror with arms crossed, nodding.`],
    ['คนต้องหัวเราะ<br>แน่ ๆ', 'ใครหัวเราะ<br><b>เดี๋ยวฉันหัวเราะด้วย</b>', `A doorway. On the left, ${L} peeks nervously out of the half-open door. On the right, ${R} stands outside on the street holding out one hand, inviting them out.`],
    ['ไม่มีใคร<br>สนใจเลยแฮะ', 'เห็นไหม<br><b>เราคิดมากไปเอง</b>', `A city sidewalk with a few small passersby in the distance. Two people walking side by side in the foreground, ${L} with the hood down walking relaxed, and ${R}. Bright day.`],
    ['เดี๋ยวผม<br>ก็ยาวใช่ไหม', 'ยาวหรือสั้น<br><b>ก็ยังเป็นเธอคนเดิม</b>', `A café table by a window. Two people sitting facing each other, ${L} with the hood down and ${R}, laughing together, two cups on the table.`],
  ]},
  { slug: 'marathon', title: 'วิ่งครั้งแรก', plot: 'วิ่งได้แค่ร้อยเมตรก็หอบ แต่มีเพื่อนวิ่งข้าง ๆ ทุกเช้าจนถึงเส้นชัย', slides: [
    ['วิ่งได้ร้อยเมตร<br>ก็หอบแล้ว', 'งั้นพรุ่งนี้<br><b>ร้อยเอ็ดเมตร</b>', `A park running track in the morning. On the left, ${L} is bent over, hands on knees, out of breath. On the right, ${R} in running shoes jogs on the spot beside them, encouraging.`],
    ['ตื่นเช้าทุกวัน<br>เหนื่อยจัง', 'ไม่ต้องเร็ว<br><b>ขอแค่ไม่หยุด</b>', `A quiet park path in early morning, pale sky. Two people jogging side by side, ${L} and ${R}, slowly, relaxed. Trees along the path.`],
    ['ขาจะไม่ไหว<br>แล้ว…', 'อีกนิดเดียว<br><b>ฉันวิ่งข้าง ๆ เธอ</b>', `A road race with ropes on both sides and a few small runners far ahead. Two runners with race number bibs, ${L} on the left, tired and leaning forward, and ${R} on the right running beside them, pointing forward.`],
    ['เส้นชัย<br>อยู่ตรงนั้น!', 'ไปเลย<br><b>ไปพร้อมกัน</b>', `A blank finish line banner over a road. Two runners with race bibs crossing the finish line together, ${L} and ${R}, arms raised, joyful.`],
    ['เหรียญแรก<br>ในชีวิต', 'เหรียญนี้<br><b>หนักด้วยความพยายาม</b>', `Two runners sitting on a curb after a race, ${L} and ${R}, each holding up a medal on a ribbon around their neck, water bottles beside them. Tired but happy.`],
  ]},
  { slug: 'drawing', title: 'รูปวาดที่ไม่สวย', plot: 'วาดรูปไม่สวยจนอยากเลิก แต่มีคนเก็บทุกรูปไว้ เพราะมันเล่าเรื่องของเรา', slides: [
    ['วาดยังไง<br>ก็ไม่สวย', 'ขอดูหน่อย<br><b>ฉันชอบนะ</b>', `A small desk by a window with pencils and paper. On the left, ${L} sits at the desk and crumples a sheet of paper. On the right, ${R} leans over the desk looking at a drawing on the table.`],
    ['ทิ้งไปเถอะ<br>ไม่มีใครอยากดู', 'ไม่ทิ้ง<br><b>ฉันขอเก็บไว้</b>', `A room. On the right, ${R} picks up and smooths out a crumpled drawing paper from a wastebasket. On the left, ${L} sits on a chair, looking surprised.`],
    ['วาดเธอ<br>ได้ไหม?', 'ได้สิ<br><b>วาดแบบที่เธอเห็น</b>', `A sunny room. On the left, ${L} sits with a sketchbook on their knees, drawing. On the right, ${R} sits on a stool posing still, hands on knees, as a model.`],
    ['นี่ไง<br>ออกมาแปลก ๆ', 'แปลกแต่<br><b>เป็นฉันที่สุดเลย</b>', `Two people sitting side by side on a sofa, ${L} and ${R}, both looking at an open sketchbook on their laps with a simple drawing of a person. Happy body language.`],
    ['เก็บไว้<br>ทุกรูปเลยเหรอ?', 'ทุกรูป<br><b>เพราะมันคือเรื่องของเรา</b>', `A wall covered with many small pinned drawings on paper. Two people standing in front of the wall, ${L} and ${R}, looking at the drawings, seen from a three-quarter back angle.`],
  ]},
  { slug: 'swing', title: 'ชิงช้าตัวเก่า', plot: 'ชิงช้าตัวเก่าในสนามเด็กเล่น กับเพื่อนที่ยังผลักให้เหมือนตอนเด็ก', slides: [
    ['ชิงช้าตัวนี้<br>ยังอยู่เลย', 'ตัวเดิม<br><b>ที่เราแย่งกันตอนเด็ก</b>', `An old empty playground with a simple wooden swing hanging from a tree branch. On the left, ${L} touches the swing rope. On the right, ${R} stands with hands in coat pockets, looking at it.`],
    ['นั่งได้ไหม<br>โตแล้วนะ', 'นั่งเลย<br><b>เดี๋ยวฉันผลักให้</b>', `A wooden swing hanging from a big tree. On the left, ${L} sits on the swing holding the ropes. On the right, ${R} stands behind and to the side, hands ready to push.`],
    ['สูงอีก!<br>สูงอีก!', 'จับแน่น ๆ<br><b>ฉันอยู่ข้างหลัง</b>', `A wooden swing in motion swinging high under a big tree. On the left, ${L} on the swing with legs stretched out, joyful. On the right, ${R} standing below, arms reaching after a push.`],
    ['ตาเธอบ้าง<br>ขึ้นมาสิ', 'ตัวโตขนาดนี้<br><b>จะไหวเหรอ</b>', `A wooden swing under a big tree. On the right, ${R} sits awkwardly on the small swing. On the left, ${L} stands beside it, laughing and pushing gently.`],
    ['โตแล้ว<br>ก็ยังสนุกเหมือนเดิม', 'เพราะเรายังมี<br><b>กันและกันเหมือนเดิม</b>', `Two people sitting side by side on the ground leaning against a big tree trunk, ${L} and ${R}, an empty wooden swing hanging beside them, calm afternoon.`],
  ]},
  { slug: 'balloon', title: 'ลูกโป่งที่หลุดมือ', plot: 'ลูกโป่งหลุดมือลอยหายไป เสียใจกับสิ่งที่เสียไป จนได้รู้ว่าบางอย่างยังอยู่ตรงนี้', slides: [
    ['ลูกโป่ง<br>หลุดมือไปแล้ว', 'มันไปเที่ยว<br><b>ที่ที่เราไปไม่ถึง</b>', `An open park. On the left, ${L} stands with one empty hand raised, looking up at a single small balloon floating away high in a pale sky. On the right, ${R} also looks up, one hand on their shoulder.`],
    ['ทำไมของที่ชอบ<br>ชอบหายไป', 'ของหายได้<br><b>แต่ความสุขตอนนั้นไม่หาย</b>', `A park bench. On the left, ${L} sits with head down, holding a short loose string. On the right, ${R} sits beside them, leaning closer.`],
    ['ซื้อใหม่ให้เหรอ?', 'อันนี้<br><b>ผูกข้อมือไว้เลย</b>', `A park path. On the right, ${R} ties the string of a new balloon around the wrist of ${L} on the left, who holds out their arm. The balloon floats above them.`],
    ['ถ้าอันนี้<br>หลุดอีกล่ะ', 'ก็ยังมีฉัน<br><b>ที่ไม่หลุดไปไหน</b>', `Two people walking side by side in a park, ${L} with a balloon tied to the wrist and ${R}, holding hands. Bright pale sky.`],
    ['วันนี้<br>เป็นวันที่ดีนะ', 'วันที่ดี<br><b>เพราะมีเธอ</b>', `Two people sitting on a grassy hill, seen from behind, ${L} and ${R}, a balloon tied to a small stick in the grass beside them, looking at a wide open landscape under a pale sky.`],
  ]},
  { slug: 'puzzle', title: 'จิ๊กซอว์ชิ้นสุดท้าย', plot: 'ต่อจิ๊กซอว์พันชิ้นด้วยกันทีละนิด จนเจอว่าชิ้นสุดท้ายอยู่ในมืออีกคน', slides: [
    ['พันชิ้น<br>จะเสร็จไหมเนี่ย', 'เสร็จสิ<br><b>วันละนิดก็พอ</b>', `A low table covered with many scattered jigsaw puzzle pieces and an open box. Two people sitting on the floor on both sides, ${L} holding the box lid and ${R} picking up a piece.`],
    ['ชิ้นนี้<br>ไม่เข้าตรงไหนเลย', 'ลองหมุนดู<br><b>บางทีแค่มุมผิด</b>', `Two people at a low table with a half-built jigsaw puzzle. On the left, ${L} frowns at one piece in hand. On the right, ${R} reaches over and turns the piece in their hand.`],
    ['ดึกแล้ว<br>พอก่อนไหม', 'ไม่รีบ<br><b>มันไม่หนีไปไหน</b>', `A cozy softly lit room with a lamp. On the left, ${L} yawns and stretches beside a low table with a mostly finished jigsaw puzzle. On the right, ${R} spreads a blanket over their shoulders.`],
    ['ชิ้นสุดท้าย<br>หายไปไหน!', 'อยู่นี่<br><b>เก็บไว้ให้เธอใส่</b>', `A low table with an almost complete jigsaw puzzle with one missing piece. On the left, ${L} searches under the table. On the right, ${R} holds up the last puzzle piece between two fingers.`],
    ['ครบแล้ว<br>สวยจัง', 'ทุกชิ้นสำคัญ<br><b>เหมือนทุกวันที่มีเธอ</b>', `Two people standing side by side, ${L} and ${R}, holding up a large completed jigsaw puzzle picture of a simple landscape between them, proud.`],
  ]},
  { slug: 'old-photo', title: 'รูปเก่าในลิ้นชัก', plot: 'เจอรูปเก่าตอนเด็กในลิ้นชัก ย้อนดูวันที่ผ่านมาด้วยกัน แล้วถ่ายรูปใหม่อีกใบ', slides: [
    ['เจอรูปนี้<br>ในลิ้นชัก', 'นั่นเราตอนเด็ก<br><b>จำได้ไหม</b>', `A room with an open wooden drawer. On the left, ${L} holds up an old small photograph. On the right, ${R} leans in to look at the photo closely.`],
    ['ตอนนั้นเธอ<br>ร้องไห้ทั้งวัน', 'แต่เธอก็<br><b>นั่งข้าง ๆ ทั้งวัน</b>', `Two people sitting on the floor next to an open box of old photographs, ${L} and ${R}, looking through photos together, some scattered photos on the floor.`],
    ['ผ่านมา<br>ตั้งกี่ปีแล้วนะ', 'นานพอ<br><b>ที่จะรู้ว่าเธอสำคัญ</b>', `A window seat. Two people sitting side by side, ${L} and ${R}, an old photo album open on their laps, both looking at it quietly. Soft daylight.`],
    ['ถ่ายใหม่<br>สักใบไหม?', 'ท่าเดิม<br><b>เหมือนในรูปเลย</b>', `A small camera on a tripod in the foreground. Two people posing side by side in front of it, ${L} and ${R}, arms over each other's shoulders. Bright simple room.`],
    ['รูปเก่ากับรูปใหม่<br>วางคู่กัน', 'เราเปลี่ยนไป<br><b>แต่ไม่เคยห่างกัน</b>', `A wooden shelf with two simple picture frames side by side. Two people standing in front of the shelf, ${L} and ${R}, seen from a three-quarter back angle.`],
  ]},
];

// Font size that keeps the widest line inside the bubble (Thai combining marks take no width).
const MARKS = /[ัิ-ฺ็-๎]/g;
const fit = (txt, inner, max) => {
  const w = Math.max(...txt.replace(/<\/?b>/g, '').split('<br>').map((t) => [...t.replace(MARKS, '')].length));
  return Math.min(max, Math.floor(inner / (w * 0.65)));
};
const html = (n, title, [l, r]) => `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<title>${title} ${String(n).padStart(2, '0')}</title>
<link href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap" rel="stylesheet">
<link rel="stylesheet" href="dialogue.css">
<style>.page{right:34px;bottom:30px;font:400 30px/1 'Sriracha',cursive;color:#3a3a3a;opacity:.7}</style>
</head>
<body class="charcoal" data-width="1080" data-height="1080">
  <div class="background" data-layer="background"></div>
  <img class="art" data-layer="art" src="slides/slide-${String(n).padStart(2, '0')}.png" alt="" onerror="this.remove()">
  <div class="bubble left" data-layer="bubble-left" style="font-size:${fit(l, 368, 46)}px"><div>${l}</div></div>
  <div class="bubble right" data-layer="bubble-right" style="font-size:${fit(r, 398, 44)}px"><div>${r}</div></div>
  <div class="page" data-layer="page">${n}/5</div>
</body>
</html>
`;

const strip = (s) => s.replace(/<br>/g, ' / ').replace(/<\/?b>/g, '');

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  STORIES.forEach((s, i) => {
    const dir = `${ROOT}/2026-11-17_${i + 21}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-17)

- ชุดที่ ${i + 21}/30 จาก \`carousel/stories/2026-11-17.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
- ลายเส้น: \`carousel/styles/charcoal-dialogue\` แบบเดียวกับ \`2026-11-14_umbrella-story\`
- 1080×1080 (IG 1:1) × 5, ไม่มีโลโก้, ข้อความไทยใน HTML
- ภาพ: FLUX ในเครื่อง — \`bash carousel/stories/gen.sh\` → \`raw/0N-1.png, 0N-2.png\` → \`python carousel/stories/finish.py raw/X.png slides/slide-0N.png --scale S --sig box\`
- ตัวละคร: ซ้าย = คนใส่ฮู้ด, ขวา = คนใส่โค้ทยาว
- เนื้อเรื่อง: ${s.plot}
- แคปชั่น: \`export/caption.md\`

| # | ซ้าย (ฮู้ด) | ขวา (โค้ท) |
|---|---|---|
${s.slides.map((sl, j) => `| ${j + 1} | ${strip(sl[0])} | ${strip(sl[1])} |`).join('\n')}
`);
    console.log(dir);
  });
}
