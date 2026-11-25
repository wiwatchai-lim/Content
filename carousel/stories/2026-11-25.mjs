// story carousels 121-140 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-25.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on pale cream off-white textured sketch paper (not orange, not peach), smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'cold-morning', title: 'เช้าแรกของหน้าหนาว', plot: 'ตื่นมาเจออากาศหนาวครั้งแรกของปี ไม่อยากลุกจากผ้าห่ม จนได้โกโก้ร้อนแก้วเดียวแบ่งกัน', slides: [
    ['หนาวแล้ว<br>จริง ๆ ด้วย', 'ลุกได้แล้ว<br><b>สายแล้วนะ</b>', `A bright cozy bedroom in the morning. On the left, ${L} sits wrapped in a thick blanket on the bed. On the right, ${R} stands by the curtain, opening it to soft light.`],
    ['ขออีก<br>ห้านาที', 'ห้านาที<br><b>รอบที่สามแล้ว</b>', `A bedroom. On the left, ${L} curled up under a big blanket like a round bundle. On the right, ${R} stands with hands on hips.`],
    ['ได้กลิ่น<br>อะไรหอม ๆ', 'โกโก้ร้อน<br><b>ลุกมาสิ</b>', `A bedroom doorway. On the left, ${L} peeks out of the blanket. On the right, ${R} holds out a steaming mug with soft steam lines.`],
    ['แก้วเดียว<br>เหรอ', 'แบ่งกัน<br><b>อุ่นกว่า</b>', `A bright living room sofa. Two people, ${L} and ${R}, sharing one big blanket, passing a steaming mug between them.`],
    ['ชอบหน้าหนาว<br>ขึ้นมานิดนึง', 'เพราะมี<br><b>คนชงให้</b>', `A sunny balcony with plants in the morning. Two people, ${L} and ${R}, wrapped in one blanket, looking out at a pale misty morning sky.`],
  ]},
  { slug: 'boat-noodles', title: 'ก๋วยเตี๋ยวเรือ', plot: 'ไปกินก๋วยเตี๋ยวเรือริมคลอง สั่งทีละถ้วยจนถ้วยซ้อนกันสูง', slides: [
    ['ถ้วยเล็ก<br>จังเลย', 'สั่งเพิ่ม<br><b>ได้เรื่อย ๆ</b>', `A bright canal-side noodle shop with small wooden tables. On the left, ${L} holds up a tiny noodle bowl. On the right, ${R} sits with chopsticks ready.`],
    ['อีกถ้วย<br>นะ', '<b>ฉันด้วย!</b>', `A canal-side noodle shop table with a few small empty bowls stacked. On the left, ${L} raises a hand to order. On the right, ${R} raises a hand too, cheerfully.`],
    ['กี่ถ้วย<br>แล้วนะ', 'อย่านับ<br><b>กินต่อ</b>', `A small table with two tall stacks of small empty bowls. On the left, ${L} points at the stacks. On the right, ${R} keeps eating.`],
    ['อิ่มจน<br>เดินไม่ไหว', 'นั่งพัก<br><b>ริมคลองก่อน</b>', `A wooden pier by a calm canal. Two people, ${L} and ${R}, sitting on the edge, leaning back, holding their full bellies.`],
    ['พรุ่งนี้<br>มาอีกไหม', 'มา!<br><b>ตกลงตามนั้น</b>', `A calm canal with a small wooden boat. Two people, ${L} and ${R}, walking along the canal path side by side. Light airy daylight.`],
  ]},
  { slug: 'roller-skate', title: 'หัดโรลเลอร์สเก็ต', plot: 'หัดเล่นโรลเลอร์สเก็ต ล้มไม่รู้กี่รอบ มีคนจับมือพาไถจนไปได้เอง', slides: [
    ['ใส่แล้ว<br>ยืนไม่ได้เลย', 'จับแขน<br><b>ฉันไว้</b>', `A bright park path. On the left, ${L} wobbles on roller skates with arms out. On the right, ${R} offers an arm for support.`],
    ['ล้มอีกแล้ว', 'ไม่เป็นไร<br><b>ลุกใหม่</b>', `A park path. On the left, ${L} sits on the ground with roller skates on. On the right, ${R} reaches down a hand.`],
    ['อย่าปล่อย<br>นะ!', 'ไม่ปล่อย<br><b>ค่อย ๆ ไถ</b>', `A long park path. Two people, ${L} on roller skates and ${R} walking beside, holding both hands, moving slowly forward.`],
    ['เดี๋ยวนะ...<br>ปล่อยแล้วเหรอ', 'ไปได้เอง<br><b>แล้วไง!</b>', `A park path. On the left, ${L} glides alone on roller skates with arms out. On the right, ${R} stands behind, cheering with both arms up.`],
    ['ล้มสิบรอบ<br>คุ้มนะ', 'ล้มได้<br><b>ก็ลุกได้</b>', `A park bench under trees. Two people, ${L} and ${R}, sitting together, roller skates beside them, relaxed. Light airy daylight.`],
  ]},
  { slug: 'first-omelette', title: 'ไข่เจียวไหม้', plot: 'ทำไข่เจียวครั้งแรกให้กิน ไหม้ดำ แต่คนกินบอกว่าอร่อย', slides: [
    ['วันนี้<br>ฉันทำเอง', 'ไข่เจียว<br><b>ง่ายจะตาย</b>', `A bright simple kitchen. On the left, ${L} cracks an egg into a bowl. On the right, ${R} leans on the counter, watching.`],
    ['ทำไม<br>มีควัน', 'ไฟแรง<br><b>ไปแล้ว!</b>', `A kitchen with a frying pan on the stove giving off soft grey smoke lines. On the left, ${L} holds a spatula in panic. On the right, ${R} waves the smoke away.`],
    ['มัน...<br>ดำนิดหน่อย', 'กรอบดี<br><b>ไม่เป็นไร</b>', `A kitchen table with a plate holding a dark burnt omelette. On the left, ${L} hunches shyly. On the right, ${R} picks up a spoon.`],
    ['ไม่ต้อง<br>ฝืนกินนะ', 'อร่อยจริง<br><b>ขอข้าวเพิ่ม</b>', `A kitchen table. On the left, ${L} watches nervously. On the right, ${R} eats happily from the plate with rice.`],
    ['พรุ่งนี้<br>ทำอีกนะ', 'ไฟอ่อน<br><b>ลงหน่อยนะ</b>', `A bright kitchen. Two people, ${L} and ${R}, cooking together at the stove side by side. Soft window light.`],
  ]},
  { slug: 'giraffe-zoo', title: 'ให้อาหารยีราฟ', plot: 'ไปสวนสัตว์ ยื่นผักให้ยีราฟครั้งแรก ตกใจลิ้นยาวจนผักหล่น แล้วลองใหม่จนสำเร็จ', slides: [
    ['ยีราฟ<br>ตัวสูงมาก', 'ยื่นผักให้<br><b>สิ</b>', `A bright open zoo with a tall giraffe behind a low wooden fence. On the left, ${L} looks up at the giraffe. On the right, ${R} hands over a bunch of leafy greens.`],
    ['ลิ้นยาว<br>มาก!', 'อย่าทำ<br><b>ผักหล่นนะ</b>', `A wooden zoo platform. The giraffe leans its head down toward the left person, who jumps back startled, dropping greens. The left person is in a hooded sweatshirt. On the right, ${R} laughs.`],
    ['ขอลอง<br>อีกที', 'ยื่นแขน<br><b>ให้สุดเลย</b>', `A wooden zoo platform. On the left, ${L} holds out greens at full arm length, leaning away. On the right, ${R} stands close behind, encouraging.`],
    ['มันกินแล้ว!', '<b>เก่งมาก!</b>', `A wooden zoo platform. The giraffe gently eats greens from the hand of the left person in a hooded sweatshirt. On the right, ${R} claps.`],
    ['ยีราฟ<br>ใจดีจัง', 'กลัวแค่<br><b>ตอนแรกแหละ</b>', `A zoo path with tall trees and a giraffe in the distance. Two people, ${L} and ${R}, walking side by side. Light airy daylight.`],
  ]},
  { slug: 'bubble-tea', title: 'ชานมหวานน้อย', plot: 'สั่งชานมไข่มุกหวานน้อย แต่แก้วสลับกัน ได้หวานมากไปจนต้องแลกกัน', slides: [
    ['เอาหวาน<br>น้อยนะ', 'ฉันหวาน<br><b>เต็มที่เลย</b>', `A bright small tea shop counter. On the left, ${L} points at a blank menu board. On the right, ${R} holds up a hand happily.`],
    ['ทำไมหวาน<br>ขนาดนี้', 'ของฉัน<br><b>จืดจัง</b>', `A tea shop table with two tall cups with wide straws. On the left, ${L} shivers after sipping. On the right, ${R} tilts their head, puzzled, holding a cup.`],
    ['แก้วสลับ<br>กันแน่เลย', 'แลกกัน<br><b>เดี๋ยวนี้!</b>', `A tea shop table. Two people, ${L} and ${R}, swapping their tall cups across the table, laughing.`],
    ['แบบนี้<br>แหละใช่', 'ของฉัน<br><b>ก็ใช่</b>', `A tea shop table. Two people, ${L} and ${R}, sipping from their cups at the same time, relaxed and happy.`],
    ['ครั้งหน้า<br>เขียนชื่อนะ', 'เขียนแล้ว<br><b>ก็ยังสลับ</b>', `A bright street with small shops. Two people, ${L} and ${R}, walking side by side holding their cups. Light airy daylight.`],
  ]},
  { slug: 'bird-watching', title: 'ดูนก', plot: 'ตื่นเช้าไปดูนก รอนานไม่เห็นสักตัว กำลังจะกลับ นกตัวเล็กมาเกาะใกล้ ๆ', slides: [
    ['ตื่นเช้า<br>มาดูนก', 'ต้องเงียบ<br><b>ใจเย็นนะ</b>', `A bright misty forest edge in the morning. On the left, ${L} holds a pair of binoculars. On the right, ${R} carries a small guide book.`],
    ['ไม่เห็น<br>สักตัวเลย', 'รออีกนิด<br><b>นะ</b>', `A forest edge. Two people, ${L} and ${R}, sitting on a log, the left person holding binoculars toward empty trees.`],
    ['กลับบ้าน<br>กันเถอะ', 'อะ...<br><b>เดี๋ยวก่อน</b>', `A forest path. On the left, ${L} stands up to leave, packing binoculars. On the right, ${R} raises a hand to stop them, looking at a branch.`],
    ['ตัวเล็ก<br>นิดเดียว', 'มาหาเรา<br><b>เองเลย</b>', `A low branch close to two people. A tiny round songbird sits on the branch. On the left, ${L}, and on the right, ${R}, both frozen still, leaning in to look.`],
    ['รอนาน<br>แต่คุ้ม', 'ของดี<br><b>ต้องรอ</b>', `A sunny forest path. Two people, ${L} and ${R}, walking home side by side, a few small birds flying above the trees. Light airy daylight.`],
  ]},
  { slug: 'puddle-jump', title: 'กระโดดแอ่งน้ำ', plot: 'หลังฝนตก เดินเลี่ยงแอ่งน้ำอยู่ดี ๆ เพื่อนกระโดดลงไปก่อน เลยกระโดดตามจนเปียกเหมือนเด็ก', slides: [
    ['ระวัง<br>แอ่งน้ำนะ', 'ทำไมต้อง<br><b>ระวังล่ะ</b>', `A bright street after rain with puddles on the ground. On the left, ${L} steps carefully around a puddle. On the right, ${R} looks at a big puddle with a playful pose.`],
    ['อย่านะ...', '<b>ตู้ม!</b>', `A street with puddles. On the right, ${R} jumps into a big puddle with water splashing. On the left, ${L} raises both arms, startled.`],
    ['เปียกหมด<br>แล้ว!', 'ลองดูสิ<br><b>สนุกนะ</b>', `A street with puddles. On the left, ${L} stands with splashed trousers. On the right, ${R} stands in the puddle, waving them in.`],
    ['ก็ได้!<br>ตู้ม!', 'นั่นแหละ<br><b>เด็กกว่าอีก</b>', `A street with puddles. Two people, ${L} and ${R}, both jumping in a puddle together with big splashes, joyful.`],
    ['เปียกแต่<br>ใจฟูมาก', 'เป็นเด็ก<br><b>บ้างก็ดี</b>', `A bright street after rain with a clearing sky. Two people, ${L} and ${R}, walking home side by side, wet and happy. Light airy daylight.`],
  ]},
  { slug: 'post-office', title: 'ส่งของให้แม่', plot: 'แพ็กกล่องส่งของให้แม่ที่ต่างจังหวัด ใส่ของจนกล่องปิดไม่ลง สุดท้ายเขียนการ์ดใบเล็กแนบไป', slides: [
    ['ส่งของ<br>ให้แม่', 'ใส่อะไร<br><b>บ้างล่ะ</b>', `A bright living room floor with an open cardboard box. On the left, ${L} kneels, putting things in the box. On the right, ${R} holds a roll of packing tape.`],
    ['ขนม ยา<br>ผ้าพันคอ', 'กล่องจะ<br><b>ระเบิดแล้ว</b>', `A living room floor with an overflowing cardboard box. On the left, ${L} adds one more scarf. On the right, ${R} pushes the lid down with both hands.`],
    ['นั่งทับ<br>ช่วยหน่อย', 'ได้เลย<br><b>หนึ่ง สอง สาม</b>', `A living room floor. On the right, ${R} sits on top of the cardboard box. On the left, ${L} tapes the box shut, laughing.`],
    ['ลืมอะไร<br>ไปอย่างนึง', 'การ์ด<br><b>เขียนสิ</b>', `A small table. On the left, ${L} writes on a small blank card with a pen. On the right, ${R} holds the taped box, waiting.`],
    ['แม่คง<br>ดีใจ', 'ในกล่อง<br><b>คือคิดถึง</b>', `A bright small post office counter with parcels. Two people, ${L} and ${R}, handing over the taped box together. Light airy daylight.`],
  ]},
  { slug: 'football', title: 'เตะบอลแพ้', plot: 'ไปเตะบอลทีมเล็ก ๆ แพ้ขาดลอย แต่ยิงได้หนึ่งประตูจากการส่งของเพื่อน', slides: [
    ['วันนี้<br>ต้องชนะ', 'ขอแค่<br><b>ไม่เจ็บตัว</b>', `A bright open grass field with a small goal. On the left, ${L} holds a soccer ball under one arm. On the right, ${R} stretches their legs.`],
    ['โดนยิงอีก<br>แล้ว!', 'ห้าศูนย์<br><b>แล้วนะ</b>', `A grass field. On the left, ${L} stands in front of the small goal with the ball behind them in the net. On the right, ${R} holds their ball head in both hands.`],
    ['ส่งมา<br>ทางนี้!', '<b>รับไปเลย!</b>', `A grass field. On the right, ${R} kicks the ball across. On the left, ${L} runs toward the ball.`],
    ['เข้า!<br>เข้าแล้ว!', '<b>หนึ่งประตู!</b>', `A grass field near a small goal with the ball in the net. Two people, ${L} and ${R}, jumping and hugging in celebration.`],
    ['แพ้ห้าหนึ่ง<br>แต่ดีใจ', 'ประตูนั้น<br><b>ของเราสองคน</b>', `A grass field at the end of the day. Two people, ${L} and ${R}, sitting on the grass, a soccer ball between them, relaxed. Light airy daylight.`],
  ]},
  { slug: 'sea-of-mist', title: 'ทะเลหมอก', plot: 'ตื่นตีห้าขึ้นดอยไปดูทะเลหมอก ไปถึงหมอกหนาจนมองไม่เห็น รอจนหมอกเปิด', slides: [
    ['หนาวมาก<br>ง่วงด้วย', 'อีกนิด<br><b>ถึงแล้ว</b>', `A bright misty mountain path in pale morning light. On the left, ${L} walks with a scarf, sleepy. On the right, ${R} walks ahead, pointing up the path.`],
    ['ไม่เห็น<br>อะไรเลย', 'หมอก<br><b>หนาไปหน่อย</b>', `A mountain viewpoint covered in thick white fog, everything pale. Two people, ${L} and ${R}, standing at a wooden railing, looking into blank white mist.`],
    ['มาเสียเที่ยว<br>แล้วล่ะ', 'รอก่อน<br><b>หมอกจะเปิด</b>', `A mountain viewpoint in fog. Two people, ${L} and ${R}, sitting on a wooden bench, sharing a flask of hot tea.`],
    ['ว้าว...', 'บอกแล้ว<br><b>คุ้มที่รอ</b>', `A mountain viewpoint. The fog opens to reveal soft layered hills floating in a sea of white mist below. Two people, ${L} and ${R}, standing at the railing, amazed.`],
    ['ตื่นเช้า<br>ครั้งนี้คุ้ม', 'ปีหน้า<br><b>มาอีกนะ</b>', `A mountain viewpoint above a sea of mist in soft pale morning light. Two people, ${L} and ${R}, sitting together, seen from behind.`],
  ]},
  { slug: 'pancake-flip', title: 'โยนแพนเค้ก', plot: 'อยากโยนแพนเค้กให้กลับด้านแบบในคลิป โยนพลาดจนติดเพดาน ตกพื้นบ้าง จนได้หนึ่งชิ้นสวย', slides: [
    ['ดูนะ<br>จะโยนแล้ว', 'แน่ใจ<br><b>เหรอ</b>', `A bright kitchen. On the left, ${L} holds a frying pan with a pancake, ready to flip. On the right, ${R} watches with arms crossed.`],
    ['แพนเค้ก<br>หายไปไหน', 'ข้างบน<br><b>นั่นไง</b>', `A kitchen. On the left, ${L} holds an empty frying pan looking around. On the right, ${R} points up at a pancake stuck to the ceiling.`],
    ['อีกรอบ!', 'ตกพื้น<br><b>อีกแล้ว</b>', `A kitchen with a few pancakes on the floor. On the left, ${L} holds the frying pan. On the right, ${R} picks up a pancake from the floor, laughing.`],
    ['ได้แล้ว!<br>กลับด้าน!', '<b>เก่งมาก!</b>', `A kitchen. On the left, ${L} catches a flipping pancake in the frying pan with motion lines. On the right, ${R} claps.`],
    ['ชิ้นนี้<br>ให้เธอ', 'ชิ้นที่ดี<br><b>ที่สุดเลย</b>', `A bright kitchen table with a plate of pancakes. Two people, ${L} and ${R}, sitting together, sharing the pancakes. Soft window light.`],
  ]},
  { slug: 'bookstore', title: 'เลือกหนังสือให้กัน', plot: 'ไปร้านหนังสือ ตกลงจะเลือกหนังสือให้อีกคนโดยไม่บอก แล้วมาเปิดดูพร้อมกัน', slides: [
    ['เลือกให้กัน<br>ไหม', 'ห้ามแอบดู<br><b>นะ</b>', `A bright cozy bookstore with tall wooden shelves. On the left, ${L} points at the shelves. On the right, ${R} nods, holding a finger up.`],
    ['เล่มนี้<br>หรือเล่มนั้น', 'ใจเย็น<br><b>ยังมีเวลา</b>', `A bookstore aisle. On the left, ${L} holds two books, comparing. On the right, further down the aisle, ${R} reaches for a book on a high shelf.`],
    ['ได้แล้ว!', 'ฉันก็<br><b>ได้แล้ว</b>', `A bookstore counter. Two people, ${L} and ${R}, each holding a wrapped book behind their back, standing facing each other.`],
    ['เปิดพร้อม<br>กันนะ', 'หนึ่ง สอง<br><b>สาม!</b>', `A cafe table. Two people, ${L} and ${R}, unwrapping books at the same time, paper in their hands.`],
    ['เล่มเดียว<br>กันเลย!', 'รู้ใจ<br><b>กันขนาดนี้</b>', `A cafe table. Two people, ${L} and ${R}, each holding up the same plain book, laughing. Soft window light.`],
  ]},
  { slug: 'river-ferry', title: 'นั่งเรือข้ามฟาก', plot: 'นั่งเรือข้ามฟากแม่น้ำ ลมพัดสบาย นั่งดูเมืองริมน้ำไปเรื่อย ๆ ไม่ต้องรีบ', slides: [
    ['นั่งเรือ<br>ไปไหม', 'ไปไหนก็ได้<br><b>ไม่รีบ</b>', `A bright wooden river pier with a small ferry boat. On the left, ${L} points at the boat. On the right, ${R} holds two small paper tickets.`],
    ['โยกเยก<br>จัง', 'จับราว<br><b>ไว้นะ</b>', `A ferry boat deck on a wide river. On the left, ${L} holds the railing, wobbling. On the right, ${R} stands steady, holding the railing too.`],
    ['ลมเย็น<br>สบายจัง', 'เห็นวัด<br><b>ฝั่งโน้นไหม</b>', `A ferry deck. Two people, ${L} and ${R}, sitting on a bench by the railing, a temple roof on the far riverbank.`],
    ['นกบิน<br>ตามมา', 'มันก็<br><b>ไม่รีบนะ</b>', `A ferry on the wide river with a few birds flying beside it. Two people, ${L} and ${R}, leaning on the railing, looking at the birds.`],
    ['อีกรอบ<br>ได้ไหม', 'นั่งกลับ<br><b>ด้วยกันนะ</b>', `A wooden river pier. Two people, ${L} and ${R}, sitting on the edge of the pier, a ferry crossing the calm river. Light airy daylight.`],
  ]},
  { slug: 'jump-rope', title: 'กระโดดเชือก', plot: 'หยิบเชือกกระโดดสมัยเด็กมาเล่น กระโดดได้สามทีก็เหนื่อย แต่หัวเราะกันจนหายเหนื่อย', slides: [
    ['เจอเชือก<br>สมัยเด็ก', 'มาแข่ง<br><b>กันไหม</b>', `A bright backyard. On the left, ${L} holds up an old jump rope with wooden handles. On the right, ${R} rolls up their sleeves.`],
    ['สมัยก่อน<br>ได้ร้อยที', 'ตอนนี้<br><b>ลองดูสิ</b>', `A backyard. On the left, ${L} jumps rope, the rope swinging low around their feet. On the right, ${R} counts on their fingers.`],
    ['สาม...<br>เหนื่อยแล้ว', 'ร้อยที<br><b>หายไปไหน</b>', `A backyard. On the left, ${L} bends over with hands on knees, tired, the rope on the ground. On the right, ${R} laughs, pointing.`],
    ['กระโดด<br>คู่กันไหม', 'นับพร้อม<br><b>กันนะ</b>', `A backyard. Two people, ${L} and ${R}, both jumping together over one long rope that swings low near the ground, one end tied to a tree.`],
    ['ขาไม่ไหว<br>แต่สนุก', 'ใจยังเด็ก<br><b>เหมือนเดิม</b>', `A backyard lawn. Two people, ${L} and ${R}, lying on the grass side by side, the jump rope between them, laughing. Light airy daylight.`],
  ]},
  { slug: 'coconut', title: 'ปอกมะพร้าว', plot: 'ซื้อมะพร้าวทั้งลูกมาจะเปิดเอง ทุบเท่าไหร่ก็ไม่แตก จนเปิดได้แล้วน้ำหวานชื่นใจ', slides: [
    ['เปิดเอง<br>ประหยัด', 'ทำเป็น<br><b>เหรอ</b>', `A bright outdoor table under a palm tree. On the left, ${L} holds a whole green coconut proudly. On the right, ${R} holds a small wooden mallet.`],
    ['ทำไม<br>มันแข็งจัง', 'ทุบอีก<br><b>แรง ๆ</b>', `An outdoor table. On the left, ${L} taps the coconut with the mallet. On the right, ${R} holds the coconut steady with both hands, flinching.`],
    ['ยอมแล้ว...', 'ให้ฉัน<br><b>ลองบ้าง</b>', `An outdoor table. On the left, ${L} sits slumped on a stool. On the right, ${R} stands with the mallet, ready.`],
    ['เปิดแล้ว!', '<b>ได้ดื่มแล้ว</b>', `An outdoor table. Two people, ${L} and ${R}, leaning in over a green coconut with a small hole and a straw in it, cheering.`],
    ['หวาน<br>ชื่นใจ', 'เพราะเหนื่อย<br><b>มาด้วยกัน</b>', `A shady spot under palm trees. Two people, ${L} and ${R}, sitting on a bench, each holding a coconut with a straw. Light airy daylight.`],
  ]},
  { slug: 'photo-booth', title: 'ตู้ถ่ายรูป', plot: 'เข้าตู้ถ่ายรูปสติกเกอร์ ตั้งท่าไม่ทันทุกช็อต ได้รูปตลก ๆ เต็มแผ่น แต่เก็บไว้ทั้งหมด', slides: [
    ['เข้าตู้<br>ถ่ายรูปกัน', 'ท่าอะไร<br><b>ดีล่ะ</b>', `A bright shopping hall with a small photo booth with a curtain. On the left, ${L} pulls the curtain open. On the right, ${R} follows, excited.`],
    ['มันถ่าย<br>แล้วเหรอ!', 'ยังไม่ได้<br><b>ตั้งท่าเลย!</b>', `Inside a small photo booth with a plain light wall. Two people, ${L} and ${R}, squeezed together, caught mid-movement, arms everywhere.`],
    ['ช็อตนี้<br>ต้องสวย', '<b>หนึ่ง สอง...</b>', `Inside a photo booth with a plain light wall. Two people, ${L} and ${R}, making a heart shape with their arms together above their ball heads.`],
    ['ดูรูปสิ<br>ตลกมาก', 'ไม่มีรูปไหน<br><b>ดีเลย</b>', `A bright shopping hall. Two people, ${L} and ${R}, looking at a small photo strip together, laughing hard.`],
    ['ทิ้งไหม', 'เก็บไว้<br><b>ทุกรูปเลย</b>', `A bright room with a cork board. On the left, ${L} pins a photo strip to the board. On the right, ${R} holds a second strip. Light airy daylight.`],
  ]},
  { slug: 'goat-farm', title: 'ฟาร์มแพะ', plot: 'ไปฟาร์มแพะ ซื้ออาหารมาถ้วยเดียว แพะรุมทั้งฝูง วิ่งหนีกันวุ่นจนหัวเราะ', slides: [
    ['แพะน่ารัก<br>จัง', 'ซื้ออาหาร<br><b>มาแล้ว</b>', `A bright farm with a wooden fence and green hills. On the left, ${L} points at a few small goats. On the right, ${R} holds up a small cup of goat food.`],
    ['มาตัวนึง<br>แล้ว', 'อีกตัว<br><b>ก็มา...</b>', `A farm pen. A few goats gather around. On the left, ${L} holds out a hand of food. On the right, ${R} looks around at more goats coming.`],
    ['ทั้งฝูง<br>เลย!', 'วิ่ง!<br><b>วิ่งเร็ว!</b>', `A farm pen. Two people, ${L} and ${R}, running away laughing, followed by a crowd of small goats.`],
    ['มันกิน<br>เสื้อฉัน!', 'ให้อาหาร<br><b>มันไปเลย</b>', `A farm pen. On the left, ${L} pulls their sweatshirt hem away from a goat nibbling it. On the right, ${R} throws food on the ground for the goats.`],
    ['ถ้วยเดียว<br>วุ่นทั้งฟาร์ม', 'แต่สนุก<br><b>ที่สุดเลย</b>', `A grassy hill by the farm. Two people, ${L} and ${R}, sitting on the grass, a small goat resting beside them. Light airy daylight.`],
  ]},
  { slug: 'gift-wrap', title: 'ห่อของขวัญ', plot: 'ห่อของขวัญปีใหม่ให้กันเอง ห่อเบี้ยว เทปเต็ม แต่คนรับชอบที่สุด', slides: [
    ['ห่อเอง<br>ให้พิเศษ', 'กระดาษ<br><b>ไม่พอแล้ว</b>', `A bright living room floor with wrapping paper and a roll of tape. On the left, ${L} wraps a box with paper. On the right, ${R} holds up a short piece of leftover paper.`],
    ['เทปติดมือ<br>อีกแล้ว', 'ติดหัว<br><b>ฉันด้วย</b>', `A living room floor. On the left, ${L} tangled in strips of tape on both hands. On the right, ${R} laughs with a piece of tape stuck on their ball head.`],
    ['ห่อเบี้ยว<br>ไปหน่อย', 'เห็นแล้ว<br><b>รู้ว่าเธอห่อ</b>', `A living room table with a lumpy, crooked gift box covered in tape with a big ribbon. On the left, ${L} presents it shyly. On the right, ${R} reaches for it.`],
    ['แกะเบา ๆ<br>นะ', 'จะเก็บ<br><b>กระดาษไว้</b>', `A sofa. On the right, ${R} carefully unwraps the gift, folding the paper. On the left, ${L} watches nervously.`],
    ['ชอบไหม', 'ชอบที่<br><b>เธอห่อให้</b>', `A bright living room. Two people, ${L} and ${R}, sitting together on the sofa, the right person holding a small gift, folded paper beside them. Soft window light.`],
  ]},
  { slug: 'new-diary', title: 'สมุดเล่มใหม่', plot: 'ซื้อสมุดบันทึกเล่มใหม่ไว้รับปีใหม่ นั่งเขียนหน้าแรกด้วยกันว่าอยากทำอะไร', slides: [
    ['สมุดใหม่<br>รับปีใหม่', 'หน้าแรก<br><b>เขียนอะไรดี</b>', `A bright stationery shop with shelves of notebooks. On the left, ${L} holds up a plain new notebook. On the right, ${R} holds another one.`],
    ['กลัวเขียน<br>ไม่สวย', 'หน้าแรก<br><b>ไม่ต้องสวย</b>', `A cafe table with two open blank notebooks and pens. On the left, ${L} hesitates with a pen in hand. On the right, ${R} is already writing.`],
    ['อยากเที่ยว<br>อยากอ่าน', 'อยากนอน<br><b>ให้พอ</b>', `A cafe table. Two people, ${L} and ${R}, writing in their notebooks side by side, cups of coffee next to them.`],
    ['ขออ่าน<br>ได้ไหม', 'ข้อสุดท้าย<br><b>มีชื่อเธอ</b>', `A cafe table. On the left, ${L} leans over to look at the notebook of the right person, ${R}, who shows the page.`],
    ['ปีหน้า<br>ไปด้วยกันนะ', 'ทุกหน้า<br><b>ไปด้วยกัน</b>', `A bright park bench. Two people, ${L} and ${R}, sitting together, each holding a closed new notebook. Light airy daylight.`],
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
    const dir = `${ROOT}/2026-11-25_${i + 121}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-25)

- ชุดที่ ${i + 121}/140 จาก \`carousel/stories/2026-11-25.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
