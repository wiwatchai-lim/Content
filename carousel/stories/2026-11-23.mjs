// story carousels 51-60 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-23.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on warm beige textured sketch paper, smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'learn-swim', title: 'หัดว่ายน้ำ', plot: 'โตแล้วยังว่ายน้ำไม่เป็น อายที่จะหัด แต่เพื่อนลงสระไปสอนด้วยกันทีละนิด', slides: [
    ['โตขนาดนี้<br>ยังว่ายไม่เป็นเลย', 'ไม่มีใคร<br><b>แก่เกินจะเริ่มหรอก</b>', `The edge of a bright outdoor swimming pool. On the left, ${L} sits on the pool edge hugging their knees. On the right, ${R} stands beside them holding a pair of swim goggles. Calm water.`],
    ['กลัวจม<br>จังเลย', 'ฉันจับไว้<br><b>ไม่ปล่อยแน่นอน</b>', `A shallow swimming pool, water up to the waist. On the left, ${L} stands in the water gripping the pool edge. On the right, ${R} stands in the water holding out both hands toward them. Light airy daylight.`],
    ['เตะขา<br>แบบนี้ถูกไหม', 'ถูกแล้ว<br><b>ช้า ๆ ก็ได้</b>', `A swimming pool. On the left, ${L} floats on a foam kickboard kicking their legs. On the right, ${R} walks beside them in the shallow water, one hand under the board. Soft ripples.`],
    ['วันนี้ได้<br>ตั้งห้าเมตรแน่ะ', 'ห้าเมตร<br><b>ก็คือก้าวแรก</b>', `A swimming pool. On the left, ${L} stands in the water raising one fist in a small cheer. On the right, ${R} claps their hands. Lane rope floating on the water.`],
    ['ขอบคุณที่<br>ไม่หัวเราะฉันนะ', 'คนกล้าเริ่ม<br><b>ไม่มีอะไรน่าขำ</b>', `Two people sitting side by side on the edge of a swimming pool, ${L} and ${R}, towels over their shoulders, feet in the water, relaxed. Bright daylight.`],
  ]},
  { slug: 'pottery', title: 'แก้วเบี้ยว', plot: 'ไปเรียนปั้นดินด้วยกัน แก้วที่ปั้นออกมาเบี้ยว แต่กลายเป็นแก้วที่ใช้ทุกวัน', slides: [
    ['ไปลอง<br>ปั้นดินกันไหม', 'ไปสิ<br><b>ไม่เคยลองเหมือนกัน</b>', `A small bright pottery studio with shelves of clay pots. On the left, ${L} points at a pottery wheel. On the right, ${R} ties on an apron. Light airy room.`],
    ['มันหมุน<br>ไม่ยอมนิ่งเลย', 'ใจเย็น ๆ<br><b>มือนิ่งเดี๋ยวดินนิ่ง</b>', `A pottery studio. On the left, ${L} sits at a spinning pottery wheel, hands on wet clay. On the right, ${R} sits at the next wheel, showing their own hands shaping a small pot.`],
    ['แก้วฉัน<br>เบี้ยวไปหมดเลย', 'เบี้ยวแบบนี้<br><b>ไม่มีใครเหมือน</b>', `A pottery studio table. On the left, ${L} holds up a lopsided clay cup, shoulders dropped. On the right, ${R} leans in to look at it closely, one hand raised in approval.`],
    ['ทาสีด้วยกัน<br>นะ', 'วาดรูปดอกไม้<br><b>ให้ด้วย</b>', `A workshop table with paint brushes and small clay cups. Two people, ${L} and ${R}, sitting side by side painting little flowers on their clay cups. Both people fully visible.`],
    ['สุดท้าย<br>ก็ใช้ทุกวัน', 'ของที่ทำเอง<br><b>มันมีความหมาย</b>', `A sunny kitchen table. Two people sitting across from each other, ${L} and ${R}, each holding a slightly lopsided handmade cup of tea, relaxed. Bright daylight from a window.`],
  ]},
  { slug: 'slow-train', title: 'รถไฟชั้นสาม', plot: 'นั่งรถไฟชั้นสามไปต่างจังหวัด ช้ากว่ารถทัวร์ครึ่งวัน แต่ได้คุยกันทั้งทาง', slides: [
    ['รถไฟช้ากว่า<br>รถทัวร์ตั้งห้าชั่วโมง', 'งั้นก็ได้คุย<br><b>กันอีกห้าชั่วโมง</b>', `A small countryside railway station platform with an old train. On the left, ${L} holds two paper tickets and checks the time. On the right, ${R} carries a backpack and smiles toward the train.`],
    ['ที่นั่ง<br>แข็งจังเลย', 'เดี๋ยวก็ชิน<br><b>วิวมันคุ้ม</b>', `Inside an old third-class train carriage with wooden seats and open windows. On the left, ${L} shifts on the wooden bench. On the right, ${R} sits by the open window, looking out at rice fields.`],
    ['ซื้อข้าวเหนียว<br>ไก่ทอดไหม', 'เอาสองห่อ<br><b>กินบนรถไฟอร่อยกว่า</b>', `Inside a train carriage. On the left, ${L} holds two small food parcels wrapped in banana leaves. On the right, ${R} reaches out happily to take one. Fields passing outside the window.`],
    ['มองอะไร<br>อยู่เหรอ', 'มองให้จำ<br><b>เผื่อไม่ได้มาอีก</b>', `A train carriage by an open window. Two people side by side, ${L} and ${R}, leaning toward the window, looking out at a wide river and hills. Light airy daylight.`],
    ['ถึงช้า<br>แต่ไม่อยากให้ถึงเลย', 'บางทาง<br><b>สำคัญกว่าปลายทาง</b>', `A small station platform in the afternoon. Two people, ${L} and ${R}, stepping off an old train with backpacks, walking side by side. Soft bright light.`],
  ]},
  { slug: 'grandma-curry', title: 'แกงของยาย', plot: 'คิดถึงแกงของยายที่จากไป เลยลองทำตามสูตรที่ยายจดไว้ จนได้รสชาติที่คุ้นเคย', slides: [
    ['เจอสมุดสูตร<br>ของยาย', 'ลายมือยาย<br><b>ยังชัดอยู่เลย</b>', `A bright old wooden kitchen. On the left, ${L} holds an old open notebook with both hands. On the right, ${R} leans over their shoulder to look at the pages.`],
    ['ยายเขียนว่า<br>ใส่พอประมาณ', 'งั้นก็ต้อง<br><b>ชิมไปเรื่อย ๆ</b>', `A kitchen. On the left, ${L} holds a spoon over a cooking pot, puzzled. On the right, ${R} laughs, holding a bowl of chopped vegetables. Steam rising softly.`],
    ['ยังไม่เหมือน<br>ของยายเลย', 'ลองอีกที<br><b>ยายก็ทำมาทั้งชีวิตนะ</b>', `A kitchen stove. On the left, ${L} tastes from a small spoon, head tilted down. On the right, ${R} stands close, one hand on their back. A pot on the stove.`],
    ['คราวนี้...<br>ใช่แล้ว', 'รสชาติ<br><b>ที่บ้านเรา</b>', `A kitchen. Two people, ${L} and ${R}, standing at the stove, both tasting from small spoons at the same time, gentle surprised body language.`],
    ['เหมือนยาย<br>ยังอยู่ตรงนี้', 'ยายอยู่<br><b>ในทุกช้อนเลย</b>', `A simple dining table with two bowls of curry and rice and an old notebook beside them. Two people sitting side by side, ${L} and ${R}, eating quietly together. Soft bright window light.`],
  ]},
  { slug: 'job-interview', title: 'ไม่ผ่านอีกแล้ว', plot: 'สมัครงานไม่ผ่านเป็นครั้งที่สิบ เพื่อนชวนนั่งทบทวนแล้วลองใหม่จนได้งาน', slides: [
    ['ไม่ผ่าน<br>ครั้งที่สิบแล้ว', 'สิบครั้ง<br><b>แปลว่าเธอไม่ยอมแพ้</b>', `A park bench outside an office building. On the left, ${L} sits holding a phone, head bowed. On the right, ${R} sits beside them, turned toward them. Bright day.`],
    ['หรือฉัน<br>ไม่เก่งพอ', 'แค่ยังไม่เจอ<br><b>ที่ที่ใช่</b>', `A park. On the left, ${L} stands with a folder of papers held against the chest. On the right, ${R} stands facing them, one hand on their shoulder. Trees in the background.`],
    ['ช่วยซ้อม<br>สัมภาษณ์หน่อยนะ', 'มาเลย<br><b>ฉันเป็นกรรมการเอง</b>', `A bright living room with a small table. On the left, ${L} sits straight in a chair in a practice interview pose. On the right, ${R} sits across, holding papers like an interviewer.`],
    ['ใจเต้น<br>จะแย่แล้ว', 'หายใจลึก ๆ<br><b>เธอเตรียมมาดีแล้ว</b>', `The entrance of an office building. On the left, ${L} holds a folder and takes a deep breath. On the right, ${R} gives a thumbs up. Light airy daylight.`],
    ['ได้แล้ว!<br>ครั้งที่สิบเอ็ด', 'สิบครั้งก่อน<br><b>พาเธอมาถึงตรงนี้</b>', `A sunny street. On the left, ${L} holds up a phone, jumping with joy. On the right, ${R} opens their arms wide to celebrate. Bright light.`],
  ]},
  { slug: 'beach-cleanup', title: 'เก็บทีละชิ้น', plot: 'ไปทะเลแล้วเจอขยะเต็มหาด เริ่มเก็บกันสองคน แล้วคนอื่นก็เข้ามาช่วย', slides: [
    ['ทำไมขยะ<br>เยอะขนาดนี้', 'งั้นเรา<br><b>เริ่มเก็บกันเลย</b>', `A sandy beach with plastic bottles scattered on the sand. On the left, ${L} stands looking down at the rubbish. On the right, ${R} holds up an empty sack. Calm sea behind them.`],
    ['เก็บสองคน<br>จะหมดเหรอ', 'ไม่หมดก็ได้<br><b>แต่ดีขึ้นแน่</b>', `A beach. On the left, ${L} bends down to pick up a plastic bottle. On the right, ${R} holds open a sack for them. Light airy daylight.`],
    ['มีคน<br>มาช่วยด้วยแหละ', 'ความดี<br><b>มันติดต่อกันได้</b>', `A beach. On the left, ${L} carries a full sack. On the right, ${R} waves toward the sea. Small distant figures with sacks walking along the shore in the background.`],
    ['หาดสะอาด<br>ขึ้นเยอะเลย', 'เพราะเธอ<br><b>ก้มเก็บชิ้นแรก</b>', `A clean sandy beach. Two people, ${L} and ${R}, standing side by side beside a row of full sacks, looking at the sea. Bright daylight.`],
    ['ปีหน้า<br>มาอีกไหม', 'มาสิ<br><b>ชวนคนมาเพิ่มด้วย</b>', `Two people sitting on the sand, ${L} and ${R}, watching small waves, relaxed, shoulders close. Soft bright light over a calm sea.`],
  ]},
  { slug: 'first-salary', title: 'เงินเดือนแรก', plot: 'ได้เงินเดือนแรก อยากพาแม่ไปกินข้าวร้านดี ๆ เพื่อนช่วยเลือกร้านและของขวัญ', slides: [
    ['เงินเดือนแรก<br>เข้าแล้ว!', 'จะเอาไป<br><b>ทำอะไรก่อนดี</b>', `A bright street outside an office. On the left, ${L} holds up a phone excitedly. On the right, ${R} leans in to look at the screen, clapping.`],
    ['อยากพาแม่<br>ไปกินข้าว', 'ดีที่สุด<br><b>ที่เคยได้ยินเลย</b>', `A park bench. On the left, ${L} sits with hands together, thinking. On the right, ${R} sits beside them, one hand on their shoulder. Trees and soft light.`],
    ['ร้านไหน<br>แม่จะชอบนะ', 'ร้านที่แม่<br><b>ไม่เคยกล้าสั่งให้ตัวเอง</b>', `A small café table. On the left, ${L} scrolls a phone. On the right, ${R} points at the screen, suggesting. Two cups of coffee on the table.`],
    ['ซื้อผ้าพันคอ<br>ให้แม่ด้วย', 'สีนี้<br><b>เข้ากับแม่แน่นอน</b>', `A small bright clothing shop. On the left, ${L} holds up a soft scarf. On the right, ${R} nods and points at it. Shelves of folded clothes behind them.`],
    ['แม่ร้องไห้<br>เลยอะ', 'น้ำตาแบบนี้<br><b>คือความภูมิใจ</b>', `Two people walking side by side on a quiet street, ${L} and ${R}, the left person holding a small gift bag, relaxed. Bright warm daylight.`],
  ]},
  { slug: 'sunrise', title: 'ตื่นตีห้า', plot: 'นัดกันตื่นตีห้าไปดูพระอาทิตย์ขึ้น ง่วงแทบตาย แต่พอแสงแรกมาก็คุ้ม', slides: [
    ['ตีห้า...<br>ง่วงมาก', 'ลุกเถอะ<br><b>พระอาทิตย์ไม่รอนะ</b>', `The doorway of a small wooden guesthouse at early morning. On the left, ${L} rubs their eyes, hood up. On the right, ${R} holds two flashlights, ready to go. Pale morning light.`],
    ['ทางชัน<br>จังเลย', 'อีกนิดเดียว<br><b>ฉันได้ยินเสียงไก่แล้ว</b>', `A hill trail with grass and small trees in soft morning light. On the left, ${L} climbs slowly, one hand on a knee. On the right, ${R} walks a step ahead, reaching a hand back.`],
    ['หมอก<br>เต็มไปหมดเลย', 'รอแป๊บ<br><b>เดี๋ยวมันก็จาง</b>', `A hilltop covered in soft white mist. On the left, ${L} sits on a rock wrapped in a blanket. On the right, ${R} stands looking toward the horizon, hands in pockets. Pale light, airy.`],
    ['มาแล้ว!<br>แสงแรก', 'คุ้มกับ<br><b>ตาที่ลืมไม่ขึ้นไหม</b>', `A hilltop at sunrise above a sea of light mist. Two people, ${L} and ${R}, standing side by side facing a small rising sun on the horizon, arms relaxed. Light airy sky.`],
    ['พรุ่งนี้<br>มาอีกไหม', 'ไม่ไหว<br><b>แต่ปีหน้ามาแน่</b>', `A hilltop in bright morning light. Two people sitting on the grass, ${L} and ${R}, sharing a thermos of hot drink, steam rising, relaxed. Soft hills in the distance.`],
  ]},
  { slug: 'button', title: 'กระดุมเม็ดเดียว', plot: 'กระดุมเสื้อหลุดก่อนออกไปงานสำคัญ เพื่อนหยิบเข็มด้ายมาเย็บให้ทัน', slides: [
    ['กระดุมหลุด<br>ก่อนออกจากบ้าน', 'ใจเย็น<br><b>ฉันมีเข็มกับด้าย</b>', `A bright bedroom with a mirror. On the left, ${L} holds a loose button in an open palm, panicked. On the right, ${R} holds up a small sewing kit. A wardrobe behind them.`],
    ['เหลือ<br>สิบนาทีเอง', 'สิบนาที<br><b>เย็บได้สามรอบ</b>', `A bedroom. On the left, ${L} stands still holding their shirt front. On the right, ${R} threads a needle, focused. Soft window light.`],
    ['เย็บเป็น<br>ด้วยเหรอ', 'ยายสอนไว้<br><b>ไม่คิดว่าจะได้ใช้</b>', `A bedroom. On the left, ${L} stands with arms slightly raised. On the right, ${R} stands close, sewing a button onto the left person's shirt with needle and thread.`],
    ['แน่นเลย<br>ขอบคุณนะ', 'ไปเถอะ<br><b>วันนี้ของเธอ</b>', `A front door. On the left, ${L} straightens their shirt, standing tall. On the right, ${R} gently pushes them toward the open door with both hands. Bright daylight outside.`],
    ['วันนั้น<br>ผ่านไปด้วยดี', 'บางทีเรื่องใหญ่<br><b>ก็รอดเพราะเรื่องเล็ก</b>', `Two people sitting on the front steps of a house, ${L} and ${R}, the left person holding up a small sewing kit and laughing, relaxed. Warm bright afternoon light.`],
  ]},
  { slug: 'year-end-wish', title: 'คำอธิษฐานปลายปี', plot: 'ปลายปีไปเขียนคำอธิษฐานแขวนไว้ด้วยกัน แล้วรู้ว่าต่างคนต่างขอให้อีกคน', slides: [
    ['จะหมดปี<br>อีกแล้วเหรอ', 'ปีนี้<br><b>เราผ่านมาได้นะ</b>', `A quiet path lined with trees in soft daylight. On the left, ${L} walks with hands in their hoodie pocket. On the right, ${R} walks beside them, looking up at the trees.`],
    ['เขียนคำขอ<br>แขวนไว้ตรงนี้', 'ห้ามแอบดู<br><b>ของกันนะ</b>', `A garden with a wooden wish wall full of small hanging paper tags. On the left, ${L} writes on a small paper tag. On the right, ${R} covers their own tag with one hand, playful.`],
    ['ขอให้ปีหน้า<br>ใจดีกับเรา', 'ปีหน้า<br><b>เราใจดีกับตัวเองก่อน</b>', `A wooden wish wall with many paper tags. Two people, ${L} and ${R}, standing side by side, each tying a paper tag onto a string. Light airy daylight.`],
    ['แอบเห็น<br>ของเธอแล้ว...', 'อ่านแล้ว<br><b>ห้ามหัวเราะนะ</b>', `A wish wall. On the left, ${L} holds one hanging paper tag, reading it, hand on chest. On the right, ${R} looks away shyly, scratching their head.`],
    ['เธอขอให้ฉัน<br>มีความสุข', 'เพราะความสุขของเธอ<br><b>ก็คือของฉัน</b>', `Two people sitting on a wooden bench beside the wish wall, ${L} and ${R}, shoulders touching, paper tags fluttering softly above. Soft bright light.`],
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
    const dir = `${ROOT}/2026-11-23_${i + 51}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-23)

- ชุดที่ ${i + 51}/60 จาก \`carousel/stories/2026-11-23.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
