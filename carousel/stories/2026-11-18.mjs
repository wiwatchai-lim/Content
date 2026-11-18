// story carousels 31-50 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-18.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on warm beige textured sketch paper, smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'baking', title: 'เค้กก้อนแรก', plot: 'อบเค้กครั้งแรกแล้วยุบกลางเตา แต่กินด้วยกันแล้วอร่อยที่สุด', slides: [
    ['อยากอบเค้ก<br>ให้แม่สักก้อน', 'งั้นฉันช่วย<br><b>ตีไข่ให้เอง</b>', `A bright simple kitchen. On the left, ${L} reads a recipe card next to a mixing bowl. On the right, ${R} whisks eggs in a bowl. Flour bag and eggs on the counter.`],
    ['แป้งเลอะ<br>ไปทั้งตัวแล้ว', 'ไม่เป็นไร<br><b>ก็แค่แป้ง</b>', `A kitchen counter. On the left, ${L} with flour dust on the hoodie holds a sieve. On the right, ${R} laughs and pats flour off the left person's shoulder.`],
    ['ทำไมมัน<br>ยุบล่ะ...', 'ยุบก็ยัง<br><b>เป็นเค้กอยู่ดี</b>', `A kitchen. On the left, ${L} holds a cake tin with a sunken flat cake, shoulders dropped. On the right, ${R} leans in to look at it, one hand on the left person's back. An oven behind them.`],
    ['ตกแต่งยังไง<br>ให้ดูดีขึ้น?', 'ใส่ผลไม้<br><b>ปิดตรงที่ยุบไว้</b>', `A kitchen table. Two people, ${L} and ${R}, decorating a small round cake together, placing strawberries on top. Both people fully visible.`],
    ['แม่ชิมแล้ว<br>บอกว่าอร่อย', 'เพราะใส่<br><b>ความตั้งใจไปเต็ม ๆ</b>', `A dining table with a small cake with one candle. Two people sitting side by side, ${L} and ${R}, each holding a small plate with a slice of cake, smiling body language. Bright daylight.`],
  ]},
  { slug: 'lost-way', title: 'หลงทาง', plot: 'เที่ยวต่างจังหวัดแล้วหลงทาง แต่ทางที่หลงพาไปเจอที่สวยที่สุดของทริป', slides: [
    ['แผนที่บอกว่า<br>ต้องเลี้ยวซ้าย', 'แต่ซ้ายมัน<br><b>เป็นทุ่งนานะ</b>', `A country road with rice fields. On the left, ${L} holds up a phone looking at a map. On the right, ${R} points at an empty field, puzzled.`],
    ['เราหลงแล้ว<br>ใช่ไหม', 'หลงด้วยกัน<br><b>ก็ไม่น่ากลัวหรอก</b>', `A dirt path between fields. On the left, ${L} scratches their head with one hand. On the right, ${R} holds two backpack straps and shrugs calmly.`],
    ['ถามทาง<br>ใครดีล่ะ', 'ร้านนั้น<br><b>มีป้าขายน้ำอยู่</b>', `A small wooden roadside stall with drink bottles. On the left, ${L} walks with a backpack. On the right, ${R} points toward the stall. No other people.`],
    ['ป้าบอกว่า<br>ข้างหน้ามีน้ำตก', 'ทางหลง<br><b>ก็มีของดีนะ</b>', `A forest path. Two people walking side by side, ${L} and ${R}, carrying backpacks, a small waterfall visible ahead between trees. Light airy daylight.`],
    ['ที่สวยที่สุด<br>ไม่อยู่ในแผนที่', 'อยู่ในวันที่<br><b>เดินไปด้วยกัน</b>', `Two people sitting on a rock beside a small waterfall, ${L} and ${R}, feet near the water, relaxed. Soft bright daylight.`],
  ]},
  { slug: 'fishing', title: 'ตกปลา', plot: 'นั่งตกปลาทั้งวันไม่ได้สักตัว แต่ได้คุยกันเรื่องที่ไม่เคยพูด', slides: [
    ['วันนี้ต้อง<br>ได้ปลาใหญ่', 'ได้สักตัว<br><b>ก็ดีใจแล้ว</b>', `A wooden pier by a calm lake. On the left, ${L} holds a fishing rod proudly. On the right, ${R} carries a small bucket and a folding stool.`],
    ['ชั่วโมงแล้ว<br>ยังเงียบอยู่เลย', 'ปลาคง<br><b>กำลังคิดอยู่</b>', `Two people sitting on stools at the end of a wooden pier, ${L} and ${R}, both holding fishing rods over calm water, bored body language.`],
    ['จริง ๆ ช่วงนี้<br>เหนื่อยมากเลย', 'เล่ามาสิ<br><b>วันนี้เวลาเยอะ</b>', `A wooden pier. On the left, ${L} sits hunched holding a fishing rod loosely. On the right, ${R} turns toward them, listening, rod resting on the knees.`],
    ['ไม่ได้ปลา<br>สักตัวเลย', 'แต่เธอ<br><b>ยิ้มได้แล้วนะ</b>', `A pier by a lake. On the left, ${L} holds up an empty fishing line, laughing. On the right, ${R} shows an empty bucket, laughing too.`],
    ['พรุ่งนี้<br>มาอีกไหม', 'มาสิ<br><b>ปลาไม่สำคัญหรอก</b>', `Two people walking away along a lakeside path, ${L} and ${R}, fishing rods on their shoulders, seen from behind. Soft bright daylight over the lake.`],
  ]},
  { slug: 'market', title: 'ตลาดเช้า', plot: 'ตื่นเช้าไปตลาดด้วยกัน ซื้อของเยอะจนถือไม่ไหว แต่ได้ข้าวเช้าที่อร่อยที่สุด', slides: [
    ['ตีห้าครึ่ง<br>ตื่นไหวเหรอ', 'ตลาดเช้า<br><b>ของอร่อยหมดไว</b>', `A quiet street in soft morning light. On the left, ${L} yawns and stretches. On the right, ${R} holds a woven shopping basket, ready to go.`],
    ['ซื้ออะไร<br>ก่อนดี', 'ผักก่อน<br><b>แล้วค่อยไปขนม</b>', `A simple open-air market with vegetable stalls. On the left, ${L} picks up a bunch of vegetables. On the right, ${R} holds the basket open. No other people.`],
    ['มือเต็ม<br>แล้วนะ', 'อีกร้านเดียว<br><b>สัญญา</b>', `A market lane. On the left, ${L} carries many plastic bags in both hands, struggling. On the right, ${R} points at another stall with a cheeky gesture.`],
    ['แบ่งกันถือ<br>ก็เบาลงเยอะเลย', 'ทุกอย่าง<br><b>แบ่งกันก็เบาลง</b>', `A market street. Two people walking side by side, ${L} and ${R}, each carrying half of the shopping bags. Both people fully visible.`],
    ['ข้าวเช้า<br>อร่อยจัง', 'เพราะตื่นมา<br><b>กินด้วยกัน</b>', `A small table by a sunny window. Two people sitting across from each other, ${L} and ${R}, bowls of rice porridge and cups of tea between them. Bright morning.`],
  ]},
  { slug: 'guitar', title: 'กีตาร์ตัวแรก', plot: 'หัดกีตาร์จนนิ้วเจ็บ เกือบเลิก แต่สุดท้ายเล่นเพลงแรกให้เพื่อนฟังได้', slides: [
    ['ซื้อกีตาร์มา<br>แล้วนะ!', 'งั้นสัญญา<br><b>ว่าจะไม่เลิก</b>', `A bright bedroom. On the left, ${L} holds up a new acoustic guitar proudly. On the right, ${R} sits on the bed, clapping.`],
    ['นิ้วเจ็บ<br>มากเลย', 'ทุกคนก็<br><b>เจ็บแบบนี้มาก่อน</b>', `A bedroom. On the left, ${L} sits with the guitar on the lap, looking at sore fingertips. On the right, ${R} sits beside them and hands over a glass of water.`],
    ['คอร์ดนี้<br>ไม่ได้สักที', 'ช้า ๆ<br><b>ทีละนิ้ว</b>', `A bedroom floor. On the left, ${L} sits cross-legged playing the guitar, frustrated. On the right, ${R} leans in and points at the guitar neck, helping.`],
    ['เกือบเลิก<br>ไปแล้วนะ', 'แต่เธอ<br><b>ก็ยังซ้อมทุกวัน</b>', `A bedroom with a window. On the left, ${L} plays the guitar with focus. On the right, ${R} reads a book on a chair, glancing over. Daylight.`],
    ['เพลงแรก<br>เล่นให้เธอฟัง', 'เพลงที่ดีที่สุด<br><b>ที่เคยได้ยิน</b>', `A porch in soft afternoon light. Two people sitting on the steps, ${L} playing the guitar and ${R} listening with head tilted, relaxed.`],
  ]},
  { slug: 'sorry-letter', title: 'จดหมายขอโทษ', plot: 'ทะเลาะกันจนไม่คุยกันหลายวัน สุดท้ายคนหนึ่งเขียนจดหมายขอโทษ', slides: [
    ['ไม่ต้อง<br>มาพูดแล้ว', 'ก็ได้<br><b>ตามใจ</b>', `A simple room. On the left, ${L} turns away with arms crossed. On the right, ${R} walks off in the other direction. Both people fully visible, distance between them.`],
    ['สามวันแล้ว<br>ที่ไม่ได้คุยกัน', 'เงียบแบบนี้<br><b>ไม่ชินเลย</b>', `Two separate park benches side by side. On the left bench, ${L} sits alone looking at a phone. On the right bench, ${R} sits alone looking down. Light airy daytime.`],
    ['เขียนอะไรดี<br>ให้เขาอ่าน', 'เขียนตรง ๆ<br><b>ว่ายังอยากเป็นเพื่อน</b>', `A desk by a window. On the left, ${L} sits writing a letter with a pen, crumpled paper balls around. On the right, ${R} is a small figure seen outside through the window, walking past.`],
    ['จดหมาย<br>ของเธอเหรอ', 'ฉันขอโทษ<br><b>จริง ๆ นะ</b>', `A front door. On the left, ${L} stands holding out a folded letter, head down. On the right, ${R} stands in the doorway taking the letter.`],
    ['ฉันก็<br>ขอโทษเหมือนกัน', 'งั้นไป<br><b>กินข้าวกันไหม</b>', `A sunny sidewalk. Two people walking side by side, ${L} and ${R}, close together again, the right person with an arm over the left person's shoulder.`],
  ]},
  { slug: 'sick-visit', title: 'เยี่ยมไข้', plot: 'ป่วยอยู่คนเดียวในห้อง เพื่อนถือโจ๊กมาหาโดยไม่ต้องบอก', slides: [
    ['ไม่สบาย<br>ไม่ต้องมาหรอก', 'มาถึง<br><b>หน้าห้องแล้ว</b>', `A small bedroom. On the left, ${L} lies in bed under a blanket with a towel on the forehead. On the right, ${R} opens the door holding a plastic bag with food.`],
    ['ซื้ออะไร<br>มาเยอะแยะ', 'โจ๊ก ยา<br><b>แล้วก็ผลไม้</b>', `A bedroom. On the left, ${L} sits up in bed wrapped in a blanket. On the right, ${R} unpacks a bowl, medicine box and fruit onto a bedside table.`],
    ['กินไม่ค่อย<br>ลงเลย', 'คำเดียวก็ยังดี<br><b>นะ</b>', `A bedroom. On the left, ${L} sits in bed holding a bowl. On the right, ${R} sits on a chair beside the bed, holding a spoon toward them gently.`],
    ['อยู่เป็นเพื่อน<br>ได้ไหม', 'อยู่จน<br><b>เธอหลับเลย</b>', `A bedroom in soft daylight. On the left, ${L} lies in bed, blanket pulled up. On the right, ${R} sits on a chair reading a book beside the bed.`],
    ['หายแล้ว<br>ขอบคุณนะ', 'หายแล้ว<br><b>เลี้ยงโจ๊กคืนด้วย</b>', `A sunny street food stall table. Two people sitting side by side, ${L} and ${R}, each with a bowl of rice porridge, cheerful body language.`],
  ]},
  { slug: 'graduation', title: 'วันรับปริญญา', plot: 'วันรับปริญญาที่ครอบครัวมาไม่ได้ แต่เพื่อนมาพร้อมดอกไม้ช่อใหญ่', slides: [
    ['ที่บ้าน<br>มาไม่ได้', 'ไม่เป็นไร<br><b>ฉันจะไปเอง</b>', `A university lawn. On the left, ${L} wears a graduation gown and holds a phone, looking down sadly. On the right, ${R} stands nearby, talking gently.`],
    ['ดอกไม้<br>ใหญ่ขนาดนี้เลย?', 'ใหญ่เท่า<br><b>ความภูมิใจ</b>', `A campus walkway. On the left, ${L} in a graduation gown, surprised. On the right, ${R} holds out a big bouquet of flowers.`],
    ['ถ่ายรูป<br>ให้หน่อย', 'ยิ้มกว้าง ๆ<br><b>หนึ่ง สอง สาม</b>', `A campus lawn with a building behind. On the left, ${L} in a graduation gown holds the bouquet and a diploma tube, posing. On the right, ${R} holds up a camera to take a photo.`],
    ['สี่ปีที่ผ่านมา<br>ไม่ง่ายเลย', 'แต่เธอ<br><b>ทำได้แล้ว</b>', `Steps in front of a university building. Two people sitting side by side, ${L} in a graduation gown and ${R}, the bouquet between them, quiet moment.`],
    ['ถ่ายคู่กัน<br>สักรูปนะ', 'รูปนี้<br><b>ต้องใส่กรอบ</b>', `A campus lawn. Two people standing side by side, ${L} in a graduation gown holding flowers and ${R}, arms over each other's shoulders, posing. Bright daylight.`],
  ]},
  { slug: 'road-trip', title: 'รถเสียกลางทาง', plot: 'ขับรถเที่ยวแล้วรถเสียกลางทาง แต่รอช่างพร้อมกินมะม่วงริมทาง', slides: [
    ['ทริปนี้<br>ต้องสนุกแน่', 'เปิดเพลง<br><b>เลยเพื่อน</b>', `A small car on a country road. On the left, ${L} sits at the wheel. On the right, ${R} sits in the passenger seat raising a hand happily. Seen from the front, both people visible through the windshield.`],
    ['เสียงอะไร<br>น่ะ?', 'ควัน...<br><b>ออกจากฝากระโปรง</b>', `A country roadside. A small car with the hood open and a little smoke. On the left, ${L} stands with hands on the head. On the right, ${R} looks under the hood.`],
    ['ช่างบอกว่า<br>อีกสองชั่วโมง', 'งั้นเรา<br><b>ปิกนิกริมทาง</b>', `A country roadside with a big tree. On the left, ${L} holds a phone, sighing. On the right, ${R} spreads a mat under the tree.`],
    ['มะม่วงริมทาง<br>หวานมากเลย', 'บางทีรถเสีย<br><b>ก็ไม่แย่นะ</b>', `Under a big tree by a country road. Two people sitting on a mat, ${L} and ${R}, eating sliced mango from a bag, the parked car behind them.`],
    ['ทริปที่จำได้<br>ที่สุดเลย', 'เพราะ<br><b>ไม่เป็นไปตามแผน</b>', `A country road in soft afternoon light. Two people leaning on the side of a small car, ${L} and ${R}, looking at the fields ahead, relaxed.`],
  ]},
  { slug: 'stray-dog', title: 'หมาหน้าปากซอย', plot: 'หมาจรตัวเล็กเดินตามกลับบ้าน สองคนช่วยกันดูแลจนกลายเป็นครอบครัว', slides: [
    ['มันเดินตาม<br>มาตั้งแต่ปากซอย', 'สงสัย<br><b>เลือกเธอแล้ว</b>', `A quiet street. On the left, ${L} walks looking back over the shoulder. On the right, ${R} points at a small scruffy puppy following behind them.`],
    ['ผอมมาก<br>เลยนะ', 'เอาข้าว<br><b>มาให้กินก่อน</b>', `A doorstep. On the left, ${L} crouches and puts a bowl of food on the ground for a small puppy. On the right, ${R} crouches holding a bottle of water.`],
    ['พาไปหาหมอ<br>ด้วยกันไหม', 'ไปสิ<br><b>ค่าหมอแบ่งกัน</b>', `A simple vet clinic entrance. On the left, ${L} holds the puppy wrapped in a towel. On the right, ${R} opens the door for them.`],
    ['ตั้งชื่อ<br>ว่าอะไรดี', 'ชื่อ<br><b>"ข้าวเหนียว" ไง</b>', `A living room floor. Two people sitting on the floor, ${L} and ${R}, a happy small dog between them wagging its tail. Both people fully visible.`],
    ['บ้านนี้<br>มีสมาชิกเพิ่มแล้ว', 'ครอบครัว<br><b>ไม่ต้องเหมือนใคร</b>', `A sunny park path. Two people walking side by side, ${L} holding a leash with a small dog and ${R}, seen from a three-quarter back angle.`],
  ]},
  { slug: 'favorite-book', title: 'หนังสือเล่มโปรด', plot: 'ให้ยืมหนังสือเล่มโปรด เพื่อนอ่านจบแล้วเขียนโน้ตไว้ในเล่มก่อนคืน', slides: [
    ['เล่มนี้<br>ต้องอ่านนะ', 'เล่มโปรด<br><b>ของเธอเหรอ</b>', `A small bookstore corner. On the left, ${L} holds out a book with both hands. On the right, ${R} takes the book, curious.`],
    ['อ่านถึงไหน<br>แล้ว?', 'บทที่สาม<br><b>ร้องไห้ไปแล้ว</b>', `A cafe table. On the left, ${L} leans forward, excited. On the right, ${R} holds the open book and wipes the eyes with one hand.`],
    ['ห้ามสปอยล์<br>นะ!', 'ไม่พูดเลย<br><b>สัญญา</b>', `A park bench. On the left, ${L} sits with a hand over their own mouth playfully. On the right, ${R} sits reading the book, holding it away teasingly.`],
    ['คืนแล้วนะ<br>ขอบคุณ', 'มีอะไร<br><b>เสียบไว้ในเล่มเหรอ</b>', `A doorway. On the left, ${L} holds the returned book, pulling out a small folded note from the pages. On the right, ${R} stands with hands behind the back, shy.`],
    ['เขียนว่า<br>"ขอบคุณที่แบ่งให้"', 'เล่มโปรด<br><b>ของเราสองคนแล้ว</b>', `A window seat with soft daylight. Two people sitting side by side, ${L} and ${R}, reading the same book together.`],
  ]},
  { slug: 'camping', title: 'เต็นท์ล้ม', plot: 'ไปตั้งแคมป์ครั้งแรก กางเต็นท์ไม่เป็นจนเต็นท์ล้ม สุดท้ายนอนดูวิวด้วยกัน', slides: [
    ['กางเต็นท์<br>ไม่ยากหรอก', 'คู่มือ<br><b>อยู่ไหนนะ</b>', `A grassy campsite by a hill. On the left, ${L} holds tent poles confidently. On the right, ${R} searches inside a big bag. Bright daytime.`],
    ['ทำไมเสา<br>เหลืออันนึง', 'ไม่รู้<br><b>แต่ดูทรงแปลก ๆ</b>', `A campsite. A crooked half-built tent. On the left, ${L} holds one extra tent pole, confused. On the right, ${R} tilts their head looking at the tent.`],
    ['ล้มแล้ว...', 'ใหม่อีกรอบ<br><b>ช่วยกันจับ</b>', `A campsite. A collapsed tent on the grass. On the left, ${L} sits on the grass laughing. On the right, ${R} lifts one side of the tent fabric.`],
    ['ตั้งได้แล้ว<br>ในที่สุด!', 'สามรอบ<br><b>ก็ถือว่าเก่งนะ</b>', `A campsite. A small standing tent. Two people, ${L} and ${R}, giving each other a high five in front of it. Both people fully visible.`],
    ['วิวตรงนี้<br>คุ้มที่เหนื่อยเลย', 'เหนื่อยด้วยกัน<br><b>ก็คุ้มเสมอ</b>', `Two people sitting on camping chairs in front of a small tent, ${L} and ${R}, holding mugs, looking at soft hills in bright late afternoon light.`],
  ]},
  { slug: 'picnic', title: 'ปิกนิกกลางสวน', plot: 'เตรียมปิกนิกมาอย่างดี แต่ลืมเอาของสำคัญ สุดท้ายกินแซนด์วิชกับลมเย็น ๆ', slides: [
    ['ทำแซนด์วิช<br>มาตั้งสิบชิ้น', 'ฉันเอา<br><b>น้ำผลไม้มา</b>', `A green park. On the left, ${L} carries a picnic basket. On the right, ${R} carries two juice bottles and a folded mat.`],
    ['ปูตรงนี้<br>ดีไหม', 'ใต้ต้นไม้<br><b>ลมเย็นดี</b>', `A park lawn under a big tree. Two people, ${L} and ${R}, spreading a checkered picnic mat together, each holding one side.`],
    ['ลืม<br>แก้วน้ำ...', 'ดื่มจากขวด<br><b>ก็ได้นี่นา</b>', `A picnic mat. On the left, ${L} searches the basket, hands on the head. On the right, ${R} laughs and holds up a juice bottle.`],
    ['มดมาแล้ว!', 'แบ่งมัน<br><b>สักชิ้นก็ได้</b>', `A picnic mat in a park. On the left, ${L} lifts a sandwich away from a line of tiny ants. On the right, ${R} places a small crumb on the grass for the ants.`],
    ['วันธรรมดา<br>แต่ดีจัง', 'วันธรรมดา<br><b>ที่มีกันและกัน</b>', `Two people lying on a picnic mat under a big tree, ${L} and ${R}, looking up at the leaves, relaxed. Soft dappled daylight.`],
  ]},
  { slug: 'dance', title: 'หัดเต้น', plot: 'ต้องเต้นในงานแต่งเพื่อน ซ้อมจนเหยียบเท้ากันเจ็บ แต่วันจริงเต้นได้สวย', slides: [
    ['ต้องเต้น<br>ในงานแต่งเพื่อน', 'ฉันซ้อม<br><b>เป็นคู่ให้</b>', `A living room with furniture pushed aside. On the left, ${L} looks nervous holding a phone with music. On the right, ${R} holds out a hand inviting to dance.`],
    ['โอ๊ย!<br>เหยียบเท้าอีกแล้ว', 'ไม่เป็นไร<br><b>นับใหม่นะ</b>', `A living room. Two people dancing, ${L} and ${R}, the left person accidentally stepping on the right person's foot, the right person hopping in mock pain.`],
    ['หนึ่ง สอง สาม<br>หนึ่ง สอง สาม', 'ดีขึ้น<br><b>เยอะแล้วนะ</b>', `A living room. Two people in a simple waltz pose, ${L} and ${R}, counting steps, looking at their feet.`],
    ['ถ้าพลาด<br>ต่อหน้าคนอื่นล่ะ', 'ก็ยิ้ม<br><b>แล้วเต้นต่อ</b>', `A doorway of a decorated hall with flower garlands. On the left, ${L} stands nervously. On the right, ${R} fixes the left person's collar, reassuring.`],
    ['เต้นได้แล้ว<br>ไม่พลาดเลย', 'เพราะเรา<br><b>ซ้อมด้วยกัน</b>', `A bright wedding party hall with string lights and flowers. Two people, ${L} and ${R}, dancing gracefully together in the middle of the floor.`],
  ]},
  { slug: 'bus-stop', title: 'ตกรถเมล์', plot: 'ตกรถเมล์คันสุดท้ายของวัน เลยเดินกลับบ้านด้วยกันจนได้คุยกันยาว', slides: [
    ['รถเมล์มา<br>แล้ว! วิ่ง!', 'รอด้วย<br><b>รอด้วย!</b>', `A city street. Two people running, ${L} and ${R}, toward a bus that is driving away from a bus stop. Daytime, light sky.`],
    ['ไปแล้ว...', 'คันต่อไป<br><b>อีกตั้งชั่วโมง</b>', `A bus stop with a bench and a sign. On the left, ${L} bends over with hands on the knees, out of breath. On the right, ${R} reads the timetable sign.`],
    ['เดินกลับ<br>ไหม?', 'ห้ากิโลนะ<br><b>ได้สิ</b>', `A sidewalk. On the left, ${L} points down the street. On the right, ${R} adjusts a backpack strap and nods.`],
    ['เดินไปคุยไป<br>ไม่เหนื่อยเลย', 'ไม่ได้คุยกัน<br><b>นานขนาดนี้มานานแล้ว</b>', `A tree-lined sidewalk in soft afternoon light. Two people walking side by side, ${L} and ${R}, talking, one gesturing with a hand.`],
    ['ถึงบ้าน<br>แล้วล่ะ', 'พรุ่งนี้<br><b>ตกรถอีกไหม</b>', `A small house gate. On the left, ${L} stands at the gate waving. On the right, ${R} walks away waving back over the shoulder. Bright evening glow, light sky.`],
  ]},
  { slug: 'new-shoes', title: 'รองเท้าคู่ใหม่', plot: 'ใส่รองเท้าคู่ใหม่ไปเที่ยว รองเท้ากัดจนเดินไม่ไหว เพื่อนเลยถอดรองเท้าเดินเท้าเปล่าเป็นเพื่อน', slides: [
    ['รองเท้าใหม่<br>สวยไหม', 'สวย<br><b>แต่ใส่เดินไกลเหรอ</b>', `A city street. On the left, ${L} shows off new shiny shoes, one foot forward. On the right, ${R} looks down at the shoes with doubt.`],
    ['เท้าเริ่ม<br>เจ็บแล้ว...', 'ให้นั่ง<br><b>พักก่อนไหม</b>', `A park path. On the left, ${L} limps, holding one foot. On the right, ${R} reaches out a hand to support them.`],
    ['รองเท้ากัด<br>จนเป็นแผล', 'มีพลาสเตอร์<br><b>ในกระเป๋าพอดี</b>', `A park bench. On the left, ${L} sits with one shoe off, looking at the heel. On the right, ${R} crouches with a small first-aid box, holding a bandage.`],
    ['ถอดเดินเลย<br>ก็ได้', 'งั้นฉัน<br><b>ถอดด้วย</b>', `A grassy park. Two people, ${L} and ${R}, both barefoot, each holding a pair of shoes in one hand, laughing.`],
    ['เดินเท้าเปล่า<br>ก็สบายดีนะ', 'ไปไหน<br><b>ก็ไปด้วยกัน</b>', `A sandy path by a river. Two people walking barefoot side by side, ${L} and ${R}, shoes in their hands, seen from behind. Bright daylight.`],
  ]},
  { slug: 'paper-cranes', title: 'นกกระดาษพันตัว', plot: 'พับนกกระดาษพันตัวให้คนที่รักที่กำลังป่วย เพื่อนมาช่วยพับจนครบ', slides: [
    ['เขาว่าพับครบ<br>พันตัวจะสมหวัง', 'งั้นเริ่ม<br><b>คืนนี้เลย</b>', `A desk with a stack of colorful square papers. On the left, ${L} folds a paper crane. On the right, ${R} pulls up a chair to join.`],
    ['ร้อยตัวแล้ว<br>อีกเก้าร้อย', 'ทีละตัว<br><b>เดี๋ยวก็ถึง</b>', `A table covered with small paper cranes. Two people sitting across the table, ${L} and ${R}, folding paper cranes together. Daylight from a window.`],
    ['มือล้า<br>มากเลย', 'พักก่อน<br><b>ฉันพับต่อเอง</b>', `A room with paper cranes everywhere. On the left, ${L} rests the head on the table, tired. On the right, ${R} keeps folding a crane quietly.`],
    ['ตัวที่พัน<br>ครบแล้ว!', 'ร้อยเป็นพวง<br><b>ให้สวย ๆ</b>', `A room. Two people, ${L} and ${R}, holding up long strings of paper cranes between them, happy.`],
    ['คุณแม่<br>ยิ้มแล้วนะ', 'แค่นั้น<br><b>ก็คุ้มแล้ว</b>', `A bright hospital corridor beside a door. Two people, ${L} carrying strings of paper cranes and ${R}, walking side by side, hopeful body language.`],
  ]},
  { slug: 'airport', title: 'สนามบิน', plot: 'เพื่อนต้องไปเรียนต่อต่างประเทศ ส่งกันที่สนามบินพร้อมสัญญาว่าจะไม่ห่างกัน', slides: [
    ['ไฟลต์<br>อีกสองชั่วโมง', 'ยังกินข้าว<br><b>ด้วยกันทัน</b>', `A bright airport hall with big windows. On the left, ${L} pulls a large suitcase. On the right, ${R} walks beside them carrying a small bag.`],
    ['ไปตั้งสองปี<br>นานไหมนะ', 'เดี๋ยวก็<br><b>ผ่านไปเร็ว</b>', `An airport cafe table. Two people sitting across from each other, ${L} and ${R}, cups of coffee between them, quiet mood.`],
    ['อันนี้<br>ให้เธอ', 'พวงกุญแจ<br><b>ฉันมีอันเหมือนกัน</b>', `An airport hall. On the left, ${L} receives a small keychain. On the right, ${R} holds up a matching keychain, smiling body language.`],
    ['ต้องไป<br>แล้วล่ะ', 'โทรหา<br><b>ทุกวันนะ</b>', `An airport security gate area. Two people, ${L} and ${R}, hugging goodbye, a suitcase beside them.`],
    ['เครื่องขึ้น<br>แล้ว', 'อีกสองปี<br><b>เจอกันที่เดิม</b>', `A big airport window with an airplane taking off in a light sky. ${R} stands at the window waving, and ${L} is a small figure on a walkway in the distance waving back. Both people visible.`],
  ]},
  { slug: 'homecoming', title: 'กลับมาแล้ว', plot: 'สองปีผ่านไป เพื่อนกลับมาจากต่างประเทศ และทุกอย่างยังเหมือนเดิม', slides: [
    ['เครื่องลง<br>แล้วนะ!', 'รอ<br><b>ที่ประตูเดิม</b>', `A bright airport arrival hall. On the left, ${L} walks out pulling a suitcase, waving. On the right, ${R} stands holding a hand-made welcome sign with no letters, just a drawn heart.`],
    ['พวงกุญแจ<br>ยังอยู่ไหม', 'อยู่สิ<br><b>ไม่เคยถอดเลย</b>', `An airport hall. Two people, ${L} and ${R}, both holding up matching small keychains toward each other, laughing.`],
    ['ร้านข้าวเดิม<br>ยังเปิดอยู่ไหม', 'เปิด<br><b>ป้ายังจำเธอได้</b>', `A small noodle shop table. Two people sitting across from each other, ${L} and ${R}, bowls of noodles between them, the suitcase beside the table.`],
    ['เมืองเปลี่ยน<br>ไปเยอะเลย', 'แต่เรา<br><b>ยังเหมือนเดิม</b>', `A city sidewalk with new buildings. Two people walking side by side, ${L} pulling the suitcase and ${R} carrying a bag for them.`],
    ['ยินดีต้อนรับ<br>กลับบ้าน', 'บ้านคือ<br><b>ที่ที่มีเธอรอ</b>', `A front porch of a small house in soft afternoon light. Two people sitting on the steps, ${L} and ${R}, shoulder to shoulder, the suitcase beside them.`],
  ]},
  { slug: 'friday-hill', title: 'เนินหญ้าเย็นวันศุกร์', plot: 'ทำงานหนักทั้งสัปดาห์ เย็นวันศุกร์ขึ้นเนินหญ้าไปนอนดูเมฆด้วยกัน', slides: [
    ['สัปดาห์นี้<br>หนักมากเลย', 'เย็นนี้<br><b>ไปเนินหญ้ากัน</b>', `An office building entrance. On the left, ${L} walks out with a tired slumped posture carrying a laptop bag. On the right, ${R} waits by the steps, waving.`],
    ['เดินขึ้นเนิน<br>เหนื่อยจัง', 'ข้างบน<br><b>มีลมรออยู่</b>', `A grassy hill path. Two people walking uphill, ${L} and ${R}, the right person a step ahead holding out a hand to help.`],
    ['เมฆก้อนนั้น<br>เหมือนแมวเลย', 'ก้อนนี้<br><b>เหมือนเธอตอนง่วง</b>', `The top of a grassy hill. Two people lying on the grass, ${L} and ${R}, pointing up at fluffy clouds in a pale sky.`],
    ['ลืมเรื่องงาน<br>ไปได้แล้ว', 'เพราะงั้น<br><b>ต้องมาทุกศุกร์</b>', `A grassy hilltop. Two people sitting side by side, ${L} and ${R}, hugging their knees, wind blowing the grass. Light airy sky.`],
    ['ขอบคุณที่<br>ลากมานะ', 'ลากได้<br><b>ทุกสัปดาห์เลย</b>', `A grassy hill in soft golden afternoon light. Two people walking down the hill side by side, ${L} and ${R}, seen from behind, the town small in the distance. Pale sky.`],
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
    const dir = `${ROOT}/2026-11-18_${i + 31}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-18)

- ชุดที่ ${i + 31}/50 จาก \`carousel/stories/2026-11-18.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
