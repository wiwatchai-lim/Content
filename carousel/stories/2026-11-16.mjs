// 10 story carousels (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-16.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on warm beige textured sketch paper, smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'bench', title: 'ม้านั่งตัวเดิม', plot: 'คนแปลกหน้าสองคนเจอกันที่ม้านั่งในสวนทุกวัน จนกลายเป็นนัดที่ไม่มีใครอยากพลาด', slides: [
    ['ขอนั่งด้วย<br>ได้ไหม?', 'เชิญเลย<br><b>ม้านั่งยาวพอสองคน</b>', `A long wooden park bench under a big tree. On the right, ${R} sits reading a book. On the left, ${L} stands beside the bench, pointing politely at the empty seat. Fallen leaves on the path.`],
    ['มาที่นี่<br>ทุกวันเลยเหรอ?', 'ทุกวัน<br><b>ไม่มีใครรอที่บ้าน</b>', `Two people sitting on a long wooden park bench, ${L} and ${R}, tossing bread crumbs to a few pigeons on the ground in front of them. A big tree behind.`],
    ['วันนี้<br>ฉันซื้อมาเผื่อ', 'ไม่มีใครทำแบบนี้<br><b>ให้ฉันนานแล้ว</b>', `Two people on a long wooden park bench. ${L[0].toUpperCase() + L.slice(1)} hands a paper coffee cup to ${R}, who receives it with both hands, touched. Steam rising from the cups.`],
    ['มาสายนะ<br>นึกว่าไม่มาแล้ว', 'รู้ว่ามีคนรอ<br><b>ยังไงก็ต้องมา</b>', `A long wooden park bench in autumn. On the left, ${L} sits on the bench, turning to look. On the right, ${R} is walking toward the bench slowly with a wooden walking cane, waving one hand.`],
    ['พรุ่งนี้<br>เจอกันที่เดิมนะ', 'ที่เดิม<br><b>เวลาเดิม</b>', `Two people sitting close together on a long wooden park bench, seen from behind, looking at a soft sunset over the park and distant trees. ${L[0].toUpperCase() + L.slice(1)} and ${R}. Long shadows, warm calm evening.`],
  ]},
  { slug: 'little-plant', title: 'ต้นไม้ต้นเล็ก', plot: 'ต้นกล้าเล็ก ๆ ที่ใครก็คิดว่าไม่รอด แต่มีคนรดน้ำทุกวันจนออกดอก — โตช้าก็โตได้', slides: [
    ['ให้นะ<br>ต้นไม้ต้นเล็ก ๆ', 'เล็กจัง<br><b>จะรอดไหมเนี่ย</b>', `On the left, ${L} holds out a tiny clay flower pot with a small seedling. On the right, ${R} leans down to look at the little sprout curiously. Simple room with a window.`],
    ['ยังไม่โต<br>อีกเหรอ?', 'ยังเลย<br><b>แต่ฉันจะรดน้ำทุกวัน</b>', `By a window, ${R} on the right waters a small clay pot with a tiny sprout using a little watering can. On the left, ${L} leans on the window frame watching. Sunlight through the window.`],
    ['ลมแรงขนาดนี้<br>ปล่อยมันไปเถอะ', 'ไม่ปล่อย<br><b>ฉันดูแลมันมาตั้งนาน</b>', `Strong wind and rain outside, swirling leaves. On the right, ${R} hunches over and shields a small potted plant against their chest with both arms. On the left, ${L} holds their hood against the wind.`],
    ['ดอกแรก<br>ออกแล้ว!', 'เห็นไหม<br><b>ช้า ๆ ก็ไปถึง</b>', `Two people crouching on both sides of a clay pot on the floor, ${L} and ${R}, looking closely at one small flower that has just bloomed on the plant. Joyful gesture, hands raised.`],
    ['ต้นไม้โตแล้ว<br>เธอก็โตขึ้นนะ', 'เพราะมีคน<br><b>รอฉันอย่างใจเย็น</b>', `A garden. Two people, ${L} and ${R}, kneel side by side planting a young leafy tree into the ground with a small shovel. A watering can beside them. Bright calm day.`],
  ]},
  { slug: 'blackout', title: 'คืนไฟดับ', plot: 'เพื่อนบ้านห้องติดกันที่ไม่เคยคุยกัน ได้รู้จักกันเพราะคืนที่ไฟดับทั้งตึก', slides: [
    ['ไฟดับทั้งตึก<br>มืดไปหมดเลย', 'เข้ามาสิ<br><b>ฉันมีเทียนอยู่</b>', `A dark apartment corridor at night. On the left, ${L} holds up a small phone flashlight. On the right, ${R} stands in an open doorway holding a lit candle, inviting them in. Strong candle glow, deep shadows.`],
    ['อยู่ห้องติดกันตั้งนาน<br>ไม่เคยคุยกันเลย', 'นั่นสิ<br><b>ต้องรอไฟดับก่อน</b>', `A dark small room lit by one candle on a low table. Two people sit on the floor facing each other, ${L} and ${R}, sharing a bag of snacks. Warm candle glow, deep shadows.`],
    ['ไม่มีมือถือ<br>ก็สนุกได้นะ', 'สนุกกว่าเดิม<br><b>อีกนะ</b>', `A dark room lit by candles. Two people sit on the floor playing cards, ${L} laughing with cards in hand, ${R} laughing too. Scattered cards and a candle between them.`],
    ['ไฟมาแล้ว…', 'เสียดาย<br><b>นิด ๆ แฮะ</b>', `A small room as the ceiling lamp turns back on, bright light. Two people sitting on the floor, ${L} and ${R}, both looking up at the ceiling lamp. A blown-out candle with a thin smoke trail between them, playing cards on the floor.`],
    ['ไฟไม่ดับ<br>ก็มาหาได้ใช่ไหม?', 'ได้สิ<br><b>ประตูนี้เปิดเสมอ</b>', `A bright apartment corridor in daytime. On the left, ${L} holds a small cake box. On the right, ${R} opens the door, happy to see them. Two neighbouring doors.`],
  ]},
  { slug: 'bicycle', title: 'จักรยานคันแรก', plot: 'หัดขี่จักรยาน ล้มแล้วลุก จนวันที่รู้ตัวว่าอีกคนปล่อยมือไปนานแล้ว', slides: [
    ['อย่าปล่อยนะ<br>ห้ามปล่อยเด็ดขาด', 'ไม่ปล่อย<br><b>ฉันจับไว้อยู่</b>', `A park path. On the left, ${L} sits wobbling on a bicycle, gripping the handlebars nervously. On the right, ${R} walks beside the bicycle holding the back of the seat steady.`],
    ['ล้มอีกแล้ว<br>ฉันคงทำไม่ได้หรอก', 'ล้มเป็น<br><b>ก็ลุกเป็น</b>', `A park path. On the left, ${L} sits on the ground next to a fallen bicycle, head down. On the right, ${R} kneels beside them, one hand on their shoulder.`],
    ['เจ็บนะ…', 'เจ็บแป๊บเดียว<br><b>แต่ขี่ได้ทั้งชีวิต</b>', `Sitting on a park bench, ${L} on the left stretches out one leg. On the right, ${R} kneels and carefully puts a small bandage on their knee. A bicycle leans against the bench.`],
    ['เธอยังจับอยู่<br>ใช่ไหม?', 'ปล่อยตั้งนานแล้ว<br><b>เธอไปเองได้</b>', `A long park path. On the left in the foreground, ${L} rides a bicycle forward alone, balanced, looking back over their shoulder. On the right, far behind, ${R} stands still with both empty hands open, proud.`],
    ['ขอบคุณนะ<br>ที่ไม่ยอมแพ้แทนฉัน', 'ฉันแค่เชื่อ<br><b>ในสิ่งที่เธอยังไม่เชื่อ</b>', `Two people riding bicycles side by side along a country road toward a soft sunset, seen from behind, ${L} and ${R}. Long shadows, open fields.`],
  ]},
  { slug: 'second-coffee', title: 'กาแฟแก้วที่สอง', plot: 'เพื่อนทะเลาะกัน เงียบใส่กันสามวัน จนมีคนยื่นกาแฟแก้วที่สองให้ก่อน', slides: [
    ['เรื่องนี้<br>ฉันไม่ผิดนะ', 'ฉันก็ไม่ผิด<br><b>เหมือนกัน</b>', `Two people standing back to back on a city sidewalk, both with arms crossed, heads turned away from each other, ${L} and ${R}. Tense, stubborn body language.`],
    ['เงียบแบบนี้<br>มาสามวันแล้ว', 'ใครจะพูดก่อน<br><b>ก็ไม่รู้</b>', `A long park bench. ${L[0].toUpperCase() + L.slice(1)} sits at the far left end, ${R} sits at the far right end, both looking away in opposite directions. A big empty gap between them.`],
    ['เอ้า<br>ซื้อมาเผื่อ', 'นี่คือ<br><b>ขอโทษใช่ไหม?</b>', `On the left, ${L} holds out a paper coffee cup with an awkward shy posture, looking down. On the right, ${R} looks at the cup, arms still half crossed, softening. Street café background.`],
    ['ขอโทษนะ<br>ฉันพูดแรงไป', 'ฉันก็ขอโทษ<br><b>ที่ฟังไม่พอ</b>', `Two people hugging warmly on a city sidewalk, ${L} and ${R}, each still holding a paper coffee cup in one hand. Gentle, relieved body language.`],
    ['ทะเลาะกันอีก<br>ก็ไม่เป็นไรนะ', 'ขอแค่<br><b>กลับมาคุยกันเหมือนเดิม</b>', `Two people walking side by side down a city street, seen from behind at a three-quarter angle, ${L} and ${R}, both holding paper coffee cups, heads turned toward each other, relaxed and happy.`],
  ]},
  { slug: 'mountain', title: 'ช้าแต่ถึง', plot: 'ขึ้นเขากับเพื่อนที่ไม่เคยเร่ง ใครแซงก็ช่าง เพราะยอดเขารอเราอยู่เสมอ', slides: [
    ['เธอเดินเร็วจัง<br>ฉันตามไม่ทัน', 'ไม่ต้องรีบ<br><b>เราไม่ได้แข่งกับใคร</b>', `A mountain trail with pine trees. On the left, ${L} with a small backpack is bent over, tired, hands on knees. On the right, ${R} with a backpack has stopped a few steps ahead and turns back to wait.`],
    ['คนอื่นแซง<br>ไปหมดแล้ว', 'ให้เขาไปเถอะ<br><b>ทางนี้เป็นของเรา</b>', `Two hikers resting on a big rock beside a mountain trail. On the right, ${R} hands a water bottle to ${L} on the left. Small distant figures of other hikers far up the trail.`],
    ['ไม่ไหวแล้ว…', 'จับมือฉันไว้<br><b>อีกนิดเดียว</b>', `A steep rocky part of a mountain trail. On the right, ${R} stands higher on a rock and reaches one hand down. On the left, ${L} climbs below, reaching up to grab the hand.`],
    ['ถึงแล้ว!<br>สวยกว่าที่คิดอีก', 'ช้าแต่ถึง<br><b>ก็คือถึง</b>', `A mountain summit above a sea of clouds at sunrise. Two hikers stand on the top, ${L} with both arms raised in joy, ${R} beside them with hands on hips. Sun rays over the clouds.`],
    ['ถ้ามาเร็วกว่านี้<br>คงพลาดแสงแรกไป', 'บางครั้ง<br><b>ช้าคือจังหวะที่พอดี</b>', `Two hikers sitting side by side on the mountain summit, seen from behind, ${L} and ${R}, looking at the sunrise over a sea of clouds and distant peaks. Calm, peaceful.`],
  ]},
  { slug: 'birthday', title: 'วันเกิดที่มีคนจำได้', plot: 'วันเกิดที่คิดว่าไม่มีใครจำ จนมีคนหนึ่งเคาะประตูพร้อมของขวัญ', slides: [
    ['วันนี้วันเกิดฉัน<br>ไม่มีใครจำได้เลย', 'ใครบอก?<br><b>ฉันจำได้นะ</b>', `A small dim room. On the left, ${L} sits alone at a small table with one cupcake and one lit candle, shoulders slumped. On the right, ${R} stands in the open doorway holding a small wrapped gift box.`],
    ['ของขวัญ<br>ให้ฉันเหรอ?', 'เปิดดูสิ<br><b>เลือกอยู่นานเลย</b>', `A small room. On the right, ${R} holds out a small wrapped gift box with a ribbon. On the left, ${L} reaches out with both hands, surprised and happy. A cupcake with a candle on the table.`],
    ['ผ้าพันคอ<br>อุ่นจัง', 'หน้าหนาวนี้<br><b>จะได้ไม่หนาวคนเดียว</b>', `A small room. On the left, ${L} wraps a thick knitted scarf around their neck, hugging it happily. On the right, ${R} watches with a gentle gesture. An open gift box and ribbon on the table.`],
    ['ช่วยคิดหน่อย<br>อธิษฐานอะไรดี?', 'ขอให้ปีนี้<br><b>เธอใจดีกับตัวเองบ้าง</b>', `Two people leaning toward a small cupcake with one lit candle on a table, ${L} wearing a knitted scarf and ${R}, about to blow out the candle together. Warm candlelight glow.`],
    ['ปีนี้<br>ไม่เหงาแล้ว', 'ปีหน้า<br><b>ฉันก็จะจำได้อีก</b>', `Two people standing by a big window at night, seen from behind, ${L} wearing a knitted scarf and ${R}, holding mugs, looking out at city lights. Cozy, calm.`],
  ]},
  { slug: 'platform', title: 'ชานชาลา', plot: 'เพื่อนต้องย้ายไปทำงานไกล วันลาที่ชานชาลา และวันที่กลับมาโดยไม่บอก', slides: [
    ['ต้องไปจริง ๆ<br>เหรอ?', 'งานอยู่ไกล<br><b>แต่ใจไม่ได้ไกล</b>', `A train station platform with a waiting train. On the right, ${R} stands with a suitcase. On the left, ${L} stands facing them, hands in pockets, sad.`],
    ['เก็บไว้นะ<br>รูปเราสองคน', 'จะตั้งไว้<br><b>ข้างเตียงเลย</b>', `A train station platform. On the left, ${L} hands a small framed photograph to ${R} on the right, who holds a suitcase handle in the other hand. A train behind them.`],
    ['ถึงแล้ว<br>โทรมานะ', 'ทุกคืน<br><b>สัญญา</b>', `A train starting to leave the station. On the right, ${R} looks out of an open train window waving. On the left, ${L} stands on the platform waving back with one raised hand.`],
    ['กลับมาแล้ว!<br>ไม่บอกกันเลย', 'อยากเห็น<br><b>หน้าตอนตกใจ</b>', `A train station platform months later. On the right, ${R} has just stepped off a train with a suitcase, arms open. On the left, ${L} runs toward them excitedly.`],
    ['ไกลแค่ไหน<br>ก็ยังเป็นเพื่อนกันนะ', 'ระยะทาง<br><b>แพ้ความคิดถึงเสมอ</b>', `Two people hugging tightly on a train station platform, ${L} and ${R}, a suitcase standing beside them. A train in the background, soft light.`],
  ]},
  { slug: 'kite', title: 'ว่าวที่มีรอยซ่อม', plot: 'ว่าวขาดที่ถูกซ่อมจนบินได้สูงกว่าเดิม — รอยซ่อมไม่เคยทำให้เราบินต่ำลง', slides: [
    ['ว่าวขาด<br>บินไม่ได้แล้ว', 'ซ่อมได้<br><b>มานั่งช่วยกัน</b>', `An open grassy field. On the left, ${L} holds a torn diamond-shaped paper kite with a tangled string, head down. On the right, ${R} walks over with a roll of tape in hand.`],
    ['ซ่อมแล้ว<br>ก็ไม่สวยเหมือนเดิม', 'ไม่ต้องสวย<br><b>แค่บินได้ก็พอ</b>', `Two people sitting on the grass, ${L} and ${R}, repairing a diamond-shaped paper kite between them with tape patches and string.`],
    ['พร้อมนะ<br>ปล่อยเลย!', 'วิ่งเลย<br><b>อย่าหันกลับมา</b>', `An open grassy field with wind. On the left, ${L} runs forward pulling a kite string. On the right, ${R} holds a patched diamond-shaped kite up high, about to let it go.`],
    ['บินได้แล้ว!<br>สูงกว่าเดิมอีก', 'รอยซ่อม<br><b>ไม่ได้ทำให้บินต่ำลง</b>', `Two people standing in a grassy field looking up, ${L} holding the kite string and ${R} pointing up. A patched diamond-shaped kite flies high in the sky with a long tail.`],
    ['ฉันก็มีรอยซ่อม<br>เยอะเหมือนกันนะ', 'แต่เธอก็ยัง<br><b>บินได้สูงเสมอ</b>', `Two people sitting on top of a grassy hill at sunset, seen from behind, ${L} holding a kite string and ${R} beside them, watching a kite float high in the evening sky.`],
  ]},
  { slug: 'bad-day', title: 'วันแย่ ๆ', plot: 'วันที่แย่ที่สุด เพื่อนไม่ถามอะไรเลย แค่นั่งอยู่ข้าง ๆ จนพรุ่งนี้มาถึง', slides: [
    ['วันนี้แย่ที่สุด<br>ไม่อยากคุยกับใคร', 'งั้นไม่ต้องคุย<br><b>ฉันนั่งเป็นเพื่อนเฉย ๆ</b>', `Outdoor concrete steps in front of a building in the evening. On the left, ${L} sits hunched with head on their knees. On the right, ${R} is about to sit down quietly beside them.`],
    ['ร้องไห้แบบนี้<br>ดูอ่อนแอไหม?', 'ไม่เลย<br><b>เธอแค่เหนื่อยมามาก</b>', `Two people sitting side by side on outdoor concrete steps. On the right, ${R} gently offers a folded handkerchief to ${L} on the left, who wipes their face.`],
    ['เพลงอะไร<br>เพราะดี', 'เพลงที่ฉันฟัง<br><b>ในวันแย่ ๆ</b>', `Two people sitting close on outdoor concrete steps at dusk, ${L} and ${R}, sharing one pair of wired earphones, one earbud each, heads tilted, listening quietly.`],
    ['ขอบคุณนะ<br>ที่ไม่ถามอะไรเลย', 'บางวัน<br><b>มีคนอยู่ข้าง ๆ ก็พอ</b>', `A small street food stall at night with hanging light bulbs. Two people sitting on stools at the counter, ${L} and ${R}, eating bowls of noodles, steam rising.`],
    ['พรุ่งนี้<br>คงดีขึ้นใช่ไหม?', 'ถ้าไม่ดีขึ้น<br><b>ฉันก็ยังอยู่ตรงนี้</b>', `A quiet street at night lit by street lamps. Two people walking home side by side, seen from behind, ${L} and ${R}, shoulders close, relaxed.`],
  ]},
  // ---- set 11-20 (added the same day) ----
  { slug: 'paper-boat', title: 'เรือกระดาษ', plot: 'เรือกระดาษจมแล้วพับใหม่ จนลอยได้และกล้าไปไกล — ไม่มีอะไรจมตลอดไป', slides: [
    ['เรือกระดาษ<br>ของฉันจมแล้ว', 'พับใหม่สิ<br><b>กระดาษยังมีอีกเยอะ</b>', `A wet street after rain with a big puddle. On the left, ${L} crouches looking sadly at a soggy sunken paper boat in the puddle. On the right, ${R} stands holding a few sheets of plain paper.`],
    ['ถ้าจมอีก<br>ล่ะ?', 'ก็พับอีก<br><b>จนกว่าจะลอยได้</b>', `Two people sitting side by side on front door steps, ${L} and ${R}, both folding small paper boats from plain paper. A few finished paper boats on the step.`],
    ['ลอยแล้ว!<br>มันลอยแล้ว!', 'เห็นไหม<br><b>ไม่มีอะไรจมตลอดไป</b>', `Two people crouching at the edge of a large rain puddle, ${L} and ${R}, watching a small paper boat floating on the water. ${L[0].toUpperCase() + L.slice(1)} raises both hands happily.`],
    ['ไปไกลแล้ว<br>จะไปถึงไหนนะ', 'ไม่รู้สิ<br><b>แต่มันกล้าไปแล้ว</b>', `A small stream of rainwater running along a street gutter, a little paper boat drifting far away down the stream. Two people standing by the curb, ${L} and ${R}, watching it go, one pointing.`],
    ['พรุ่งนี้<br>พับลำใหญ่กว่านี้นะ', 'พับด้วยกัน<br><b>ลำใหญ่ที่สุดเลย</b>', `Two people walking home side by side along a wet street at sunset, seen from behind, ${L} carrying a big folded paper boat and ${R} beside them. Puddles reflecting light.`],
  ]},
  { slug: 'stars', title: 'ดาวดวงเล็ก', plot: 'คนที่คิดว่าตัวเองเป็นแค่ดาวดวงเล็ก กับเพื่อนที่เห็นแสงนั้นมาตั้งแต่แรก', slides: [
    ['ดาวเยอะจัง<br>ฉันคงเป็นดวงเล็ก ๆ', 'ดวงเล็ก<br><b>ก็ยังส่องแสงนะ</b>', `Night on a grassy hill under a sky full of stars. Two people lying on their backs on the grass side by side, ${L} and ${R}, looking up at the stars.`],
    ['ไม่มีใคร<br>สังเกตเห็นหรอก', 'ฉันเห็น<br><b>ตั้งแต่แรกแล้ว</b>', `Night on a grassy hill under many stars. Two people sitting on the grass, ${L} hugging their knees, ${R} pointing up at one small bright star.`],
    ['ดาวตก!<br>รีบขอพรเร็ว', 'ขอแล้ว<br><b>ขอให้เธอเห็นค่าตัวเอง</b>', `Night sky with a long bright shooting star streak. Two people sitting on a grassy hill, ${L} pointing at the shooting star excitedly, ${R} with hands pressed together making a wish.`],
    ['แล้วเธอล่ะ<br>เป็นดาวดวงไหน?', 'ดวงข้าง ๆ เธอ<br><b>ไง</b>', `Night sky with two bright stars close together. Two people lying shoulder to shoulder on a blanket on the grass, ${L} and ${R}, one pointing at the pair of stars.`],
    ['คืนนี้<br>สวยที่สุดเลย', 'เพราะเรา<br><b>ดูด้วยกัน</b>', `Two people sitting side by side on top of a grassy hill at night, seen from behind, ${L} and ${R}, looking at a wide starry sky and the milky way, a small thermos between them.`],
  ]},
  { slug: 'fried-rice', title: 'ข้าวผัดจานแรก', plot: 'คนที่ทำอาหารไม่เป็น ทำข้าวผัดไหม้ ๆ จานแรก แต่อร่อยที่สุดเพราะมีคนกินด้วย', slides: [
    ['ฉันทำอาหาร<br>ไม่เป็นเลย', 'งั้นวันนี้<br><b>เริ่มจานแรกกัน</b>', `A small cozy kitchen. On the left, ${L} holds a spatula awkwardly in front of a stove with a frying pan. On the right, ${R} ties an apron around their waist, ready to help.`],
    ['ไหม้แล้ว!<br>ทำไงดี', 'ไม่เป็นไร<br><b>ไหม้นิดเดียวเอง</b>', `A small kitchen with smoke rising from a frying pan on the stove. On the left, ${L} panics holding the spatula up. On the right, ${R} laughs while opening the kitchen window.`],
    ['หน้าตา<br>ไม่น่ากินเลย', 'ไม่ต้องสวย<br><b>ขอแค่อร่อย</b>', `Two people sitting at a small kitchen table facing each other, ${L} and ${R}, two plates of messy fried rice between them, spoons in hand.`],
    ['อร่อยจริง ๆ<br>เหรอ?', 'อร่อยที่สุด<br><b>เพราะเธอทำให้</b>', `At a small kitchen table, ${R} on the right eats a spoonful of fried rice and gives a thumbs up. On the left, ${L} leans forward watching anxiously, hands clasped.`],
    ['พรุ่งนี้<br>ฉันทำให้อีกนะ', 'งั้นฉัน<br><b>ล้างจานเอง</b>', `Two people standing side by side at a kitchen sink by a window, ${L} drying a plate with a towel and ${R} washing dishes, relaxed and happy.`],
  ]},
  { slug: 'exam', title: 'สอบอีกครั้ง', plot: 'สอบไม่ผ่านอีกแล้ว แต่มีเพื่อนนั่งติวด้วยทุกคืน จนวันที่ผ่าน', slides: [
    ['สอบไม่ผ่าน<br>อีกแล้ว', 'แล้วเธอ<br><b>ยังไหวไหม?</b>', `A school hallway with a notice board. On the left, ${L} holds a sheet of paper, head down, shoulders slumped. On the right, ${R} stands close, one hand on their back.`],
    ['ทุกคนผ่านหมด<br>เหลือแต่ฉัน', 'เส้นชัย<br><b>ไม่ได้หนีไปไหนหรอก</b>', `Two people sitting on the outdoor steps of a school building, ${L} with head in hands, ${R} sitting beside them speaking gently. Scattered leaves.`],
    ['ช่วยติว<br>ให้หน่อยได้ไหม?', 'ได้สิ<br><b>เริ่มคืนนี้เลย</b>', `Night, a desk lit by a desk lamp, stacks of books. Two people sitting side by side at the desk, ${L} holding a pencil and ${R} pointing at an open book.`],
    ['ง่วงแล้ว<br>ไม่ไหวแล้ว', 'อีกหน้าเดียว<br><b>แล้วพักกัน</b>', `Late night at a desk with a lamp and books. On the left, ${L} rests their head on a pile of books, exhausted. On the right, ${R} holds up one finger with a smile, two mugs of coffee on the desk.`],
    ['ผ่านแล้ว!<br>ฉันผ่านแล้ว!', 'รู้อยู่แล้ว<br><b>ว่าเธอทำได้</b>', `A school courtyard on a sunny day. On the left, ${L} jumps in joy holding a sheet of paper high. On the right, ${R} claps happily.`],
  ]},
  { slug: 'kitten', title: 'แมวในกล่อง', plot: 'ลูกแมวตัวสั่นในกล่องข้างทาง ไม่ยอมไว้ใจใคร จนเจอคนที่รออย่างใจเย็น', slides: [
    ['มีแมวตัวเล็ก<br>อยู่ในกล่อง', 'ตัวสั่นเลย<br><b>คงหนาวมาก</b>', `A narrow alley on a cold evening. A small cardboard box on the ground with a tiny kitten inside. Two people crouching on both sides of the box, ${L} and ${R}, looking at the kitten.`],
    ['เอากลับบ้าน<br>ได้ไหม?', 'ได้สิ<br><b>ห่อผ้าพันคอไว้ก่อน</b>', `In an alley, ${R} on the right gently wraps a tiny kitten in their scarf. On the left, ${L} holds the empty cardboard box, watching hopefully.`],
    ['มันไม่ยอม<br>กินอะไรเลย', 'ใจเย็น ๆ<br><b>มันยังไม่ไว้ใจเรา</b>', `A small room. A tiny kitten hides in a corner behind a chair, a small bowl of food on the floor. Two people sit quietly on the floor at a distance, ${L} and ${R}, watching it.`],
    ['มันมาหา<br>ฉันแล้ว!', 'เพราะเธอ<br><b>รอมันอย่างใจเย็น</b>', `A small room. Two people sit on the floor. A tiny kitten climbs onto the lap of ${L} on the left, who holds still in delight. On the right, ${R} watches with a gentle gesture.`],
    ['ตั้งชื่อ<br>ว่าอะไรดี?', 'ชื่อ "บ้าน"<br><b>เพราะมันเจอบ้านแล้ว</b>', `Two people sitting on a sofa, ${L} and ${R}, a small cat sleeping curled up on a cushion between them. Warm lamp light.`],
  ]},
  { slug: 'sea', title: 'ทะเลครั้งแรก', plot: 'คนที่ไม่เคยเห็นทะเล กับเพื่อนที่พาไปเก็บความทรงจำครั้งแรก', slides: [
    ['ไม่เคยเห็นทะเล<br>มาก่อนเลย', 'งั้นวันนี้<br><b>ไปดูด้วยกัน</b>', `A sandy path over a dune with beach grass, the wide sea in the distance. On the left, ${L} stops in amazement looking at the sea. On the right, ${R} gestures toward the sea with an open hand.`],
    ['คลื่นมาแล้ว!', 'ไม่ต้องกลัว<br><b>ฉันอยู่ตรงนี้</b>', `A shoreline with a wave rolling in. On the left, ${L} jumps back from the wave, startled. On the right, ${R} with rolled-up trousers holds their arm and laughs.`],
    ['เปลือกหอย<br>สวยจัง', 'เก็บไว้สิ<br><b>เป็นที่ระลึก</b>', `Two people crouching on wet sand at the beach, ${L} holding up a seashell, ${R} holding a small bucket with more shells. Gentle waves behind.`],
    ['ปราสาททราย<br>ของเราสวยที่สุด', 'คลื่นพังได้<br><b>แต่วันนี้ไม่หายไปไหน</b>', `Two people kneeling on the beach, ${L} and ${R}, building a sandcastle together with their hands, a small bucket and spade beside them. Waves approaching.`],
    ['ปีหน้า<br>มาอีกนะ', 'ทุกปี<br><b>เลย</b>', `Two people sitting side by side on the sand, seen from behind, ${L} and ${R}, watching the sun set over the sea. Long reflections on the water.`],
  ]},
  { slug: 'time-capsule', title: 'จดหมายถึงอีกสิบปี', plot: 'เขียนจดหมายถึงตัวเองแล้วฝังไว้ใต้ต้นไม้ สิบปีต่อมากลับมาเปิดด้วยกัน', slides: [
    ['เขียนจดหมาย<br>ถึงตัวเองอีกสิบปี', 'ดีจัง<br><b>เขียนว่าอะไรดีนะ</b>', `Two people sitting at a small café table facing each other, ${L} and ${R}, blank sheets of paper, envelopes and pens on the table, two cups.`],
    ['ฉันจะบอกว่า<br>อย่ายอมแพ้นะ', 'ฉันจะบอกว่า<br><b>ขอบคุณที่อดทน</b>', `Two people at a café table, ${L} and ${R}, both bent over writing letters carefully, focused and quiet.`],
    ['ฝังไว้ตรงนี้<br>นะ', 'ใต้ต้นไม้ต้นนี้<br><b>จำไว้ให้ดี</b>', `Under a young tree in a park. On the left, ${L} kneels placing a small metal tin box into a hole in the ground. On the right, ${R} holds a small shovel.`],
    ['สิบปีผ่านไป<br>ต้นไม้โตจัง', 'เราก็โตขึ้น<br><b>เหมือนกัน</b>', `The same spot years later under a huge old tree with a thick trunk. Two people kneeling at its roots, ${L} and ${R}, lifting an old rusty tin box out of the ground.`],
    ['ฉันไม่ยอมแพ้<br>จริง ๆ ด้วย', 'ฉันก็ยังอยู่<br><b>ตรงนี้เหมือนเดิม</b>', `Two people sitting with their backs against a huge tree trunk, ${L} and ${R}, each reading an old letter, an open tin box between them. Dappled light.`],
  ]},
  { slug: 'piano', title: 'เพลงที่เล่นผิด', plot: 'หัดเปียโน เล่นผิดซ้ำ ๆ แต่มีคนฟังที่ไม่เคยลุกหนี จนเล่นจบบนเวที', slides: [
    ['เล่นผิดอีกแล้ว<br>ไม่เก่งเลย', 'ผิดก็เล่นต่อ<br><b>เพลงยังไม่จบ</b>', `A room with an upright piano. On the left, ${L} sits at the piano slumped over the keys. On the right, ${R} stands leaning on the side of the piano.`],
    ['นิ้วมัน<br>ไม่ไปตามใจ', 'ช้า ๆ ก่อน<br><b>ทีละโน้ต</b>', `Two people sitting together on a piano bench at an upright piano, ${L} with hands on the keys, ${R} pointing gently at the keys.`],
    ['ซ้อมทุกวัน<br>จะเก่งไหม?', 'เก่งไม่เก่ง<br><b>ไม่สำคัญเท่าสนุก</b>', `Evening in a room with a lamp. On the left, ${L} practices at an upright piano. On the right, ${R} relaxes on a sofa holding a cup of tea, listening.`],
    ['ตื่นเต้น<br>มือสั่นไปหมด', 'เล่นให้ฉันฟัง<br><b>คนเดียวก็พอ</b>', `A small stage with a grand piano under a spotlight, empty rows of chairs. On the left, ${L} stands nervously beside the piano. On the right, ${R} sits in the front row giving a reassuring nod.`],
    ['เล่นจบแล้ว!<br>ไม่หยุดเลย', 'ผิดก็ยังเพราะ<br><b>เพราะเธอไม่หยุด</b>', `A small stage with a grand piano. On the left, ${L} bows after playing. On the right, ${R} stands up from the front row clapping. Spotlight.`],
  ]},
  { slug: 'waiting-room', title: 'ห้องรอผล', plot: 'วันที่ต้องรอผลตรวจคนเดียว แต่มีเพื่อนลางานมานั่งรอด้วย', slides: [
    ['รอผลตรวจ<br>กลัวจังเลย', 'ไม่ต้องกลัวคนเดียว<br><b>ฉันรอด้วย</b>', `A hospital waiting room with rows of chairs. Two people sitting side by side, ${L} clutching a small paper queue ticket nervously, ${R} sitting close beside them.`],
    ['ถ้าผล<br>ไม่ดีล่ะ?', 'ก็สู้ไปด้วยกัน<br><b>ทีละวัน</b>', `Two people sitting on hospital waiting room chairs, ${R} on the right holding the hand of ${L} on the left on the armrest. Quiet mood.`],
    ['ขอบคุณนะ<br>ที่ลางานมา', 'งานรอได้<br><b>เธอสำคัญกว่า</b>', `A hospital hallway with a vending machine. On the right, ${R} hands a bottle of water to ${L} on the left, who receives it gratefully.`],
    ['ผลออกแล้ว<br>ไม่เป็นอะไรมาก!', 'โล่งอก<br><b>ที่สุดในโลกเลย</b>', `A hospital corridor. On the left, ${L} raises a sheet of paper happily. On the right, ${R} exhales with one hand on their chest, relieved.`],
    ['เลี้ยงข้าว<br>ตอบแทนนะ', 'แค่เธอสุขภาพดี<br><b>ก็พอแล้ว</b>', `Two people walking out of a hospital entrance into bright sunlight, side by side, ${L} and ${R}, a few trees outside.`],
  ]},
  { slug: 'crossroads', title: 'ทางแยก', plot: 'เพื่อนสองคนถึงทางแยกที่ต้องเดินคนละทาง แต่สัญญาว่าจะกลับมาเจอกันที่เดิม', slides: [
    ['ถึงทางแยก<br>แล้วนะ', 'เธอไปทางซ้าย<br><b>ฉันไปทางขวา</b>', `A country road splitting into two paths at a wooden signpost with blank arrow boards. Two people standing at the fork, ${L} and ${R}, each looking down a different path.`],
    ['ไม่อยาก<br>แยกกันเลย', 'แยกทาง<br><b>ไม่ได้แปลว่าแยกใจ</b>', `Two people hugging warmly beside a wooden signpost at a fork in a country road, ${L} and ${R}, two small backpacks on the ground.`],
    ['ถ้าคิดถึง<br>จะทำยังไง?', 'มองฟ้าไว้<br><b>เราเห็นฟ้าเดียวกัน</b>', `Night. Two people standing back to back at a fork in a country road, ${L} and ${R}, both looking up at the same full moon.`],
    ['เจอกันอีกที<br>ที่ไหนดี?', 'ที่ทางแยกนี้<br><b>ปีหน้า</b>', `A fork in a country road. Two people walking away from each other down different paths, ${L} on the left path and ${R} on the right path, both looking back and waving.`],
    ['มาตามสัญญา<br>แล้วนะ', 'ไม่เคยลืม<br><b>สักวัน</b>', `A year later at the same fork in a country road with a wooden signpost. Two people running toward each other from the two paths, ${L} and ${R}, arms open. Bright day.`],
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
    const dir = `${ROOT}/2026-11-16_${String(i + 1).padStart(2, '0')}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-16)

- ชุดที่ ${i + 1}/10 จาก \`carousel/stories/2026-11-16.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
