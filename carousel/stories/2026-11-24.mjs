// story carousels 81-100 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-24.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on pale cream off-white textured sketch paper (not orange, not peach), smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'baby-bird', title: 'ลูกนกตกรัง', plot: 'เจอลูกนกตกจากรัง ช่วยกันหาทางส่งกลับขึ้นต้นไม้จนแม่นกบินกลับมา', slides: [
    ['มีลูกนก<br>ตกอยู่ตรงนี้', 'ค่อย ๆ นะ<br><b>อย่าให้ตกใจ</b>', `A bright garden under a big tree. On the left, ${L} crouches, looking at a tiny bird on the grass. On the right, ${R} bends forward, one hand raised gently.`],
    ['รังอยู่<br>สูงมากเลย', 'ไปเอาบันได<br><b>มาช่วยกัน</b>', `Under a big leafy tree with a small nest on a branch. On the left, ${L} points up at the nest. On the right, ${R} carries a wooden ladder.`],
    ['มือสั่น<br>ไปหมดแล้ว', 'ฉันจับบันไดอยู่<br><b>ไม่ล้มแน่นอน</b>', `A big tree. On the left, ${L} stands on a wooden ladder holding a tiny bird in cupped hands. On the right, ${R} holds the ladder firmly with both hands.`],
    ['แม่นก<br>กลับมาแล้ว!', 'เห็นไหม<br><b>ทุกคนมีบ้านให้กลับ</b>', `Under a big tree. Two people, ${L} and ${R}, standing side by side looking up at a small bird flying back to a nest on a branch. Light airy daylight.`],
    ['ใจเต้นแรง<br>ทั้งวันเลย', 'วันนี้เธอ<br><b>เป็นฮีโร่ตัวจิ๋ว</b>', `A garden bench under a tree. Two people sitting side by side, ${L} and ${R}, relaxed, the ladder leaning against the tree. Soft bright light.`],
  ]},
  { slug: 'ice-cream', title: 'ไอติมหล่น', plot: 'ไอติมสกู๊ปแรกหล่นพื้นทันทีที่ซื้อ เพื่อนเลยแบ่งของตัวเองครึ่งหนึ่ง', slides: [
    ['ร้อนจัง<br>กินไอติมกัน', 'เอาสอง<br><b>สกู๊ปเลย</b>', `A bright sunny street with a small ice cream cart. On the left, ${L} fans themselves with one hand. On the right, ${R} points at the ice cream cart.`],
    ['ไอติม<br>หล่นแล้ว...', 'ยังไม่ทัน<br><b>ได้ชิมเลย</b>', `A sunny sidewalk. On the left, ${L} holds an empty cone, looking down at a scoop of ice cream on the ground. On the right, ${R} covers their ball head with a hand in sympathy.`],
    ['ซวยตลอด<br>เลยฉัน', 'งั้นกินของฉัน<br><b>ครึ่งนึง</b>', `A sunny sidewalk. On the left, ${L} stands with shoulders dropped. On the right, ${R} holds out their ice cream cone toward them.`],
    ['ครึ่งเดียว<br>แต่อร่อยกว่า', 'ของแบ่งกัน<br><b>อร่อยกว่าเสมอ</b>', `A low wall by a sunny street. Two people, ${L} and ${R}, sitting side by side sharing one ice cream cone, relaxed.`],
    ['พรุ่งนี้<br>ฉันเลี้ยงคืนนะ', 'ถือดี ๆ ล่ะ<br><b>อย่าทำหล่นอีก</b>', `A sunny street. Two people walking side by side, ${L} and ${R}, both laughing, the right person pointing playfully at the left person's hands.`],
  ]},
  { slug: 'flat-tire', title: 'ยางแบนกลางทาง', plot: 'ขี่มอเตอร์ไซค์ไปเที่ยว ยางแบนกลางทางเปลี่ยว เข็นด้วยกันจนเจอร้านปะยาง', slides: [
    ['ยางแบน<br>อีกแล้ว!', 'ไม่เป็นไร<br><b>เข็นไปด้วยกัน</b>', `A quiet country road with fields. On the left, ${L} crouches beside a small motorbike, looking at a flat back tyre. On the right, ${R} stands with hands on hips, calm.`],
    ['ร้านปะยาง<br>อยู่ไหนเนี่ย', 'เดินไป<br><b>เดี๋ยวก็เจอ</b>', `A long country road with trees. Two people, ${L} and ${R}, pushing a small motorbike together along the road. Bright daylight.`],
    ['ร้อนก็ร้อน<br>เหนื่อยก็เหนื่อย', 'พักใต้ต้นไม้<br><b>ก่อนแป๊บนึง</b>', `A big shady tree beside a country road. On the left, ${L} sits on the ground wiping their ball head. On the right, ${R} parks the motorbike and hands over a water bottle.`],
    ['เจอร้าน<br>แล้ว!', 'เห็นไหม<br><b>ทางมีเสมอ</b>', `A small roadside repair shed with tyres stacked outside. On the left, ${L} points excitedly at the shed. On the right, ${R} pushes the motorbike, laughing.`],
    ['ทริปนี้<br>ไม่เป็นตามแผนเลย', 'แต่จำ<br><b>ได้ไปนานเลยนะ</b>', `A country road at bright late afternoon. Two people sitting on a small motorbike, ${L} in front and ${R} behind, riding away happily.`],
  ]},
  { slug: 'temple-fair', title: 'งานวัด', plot: 'ไปงานวัดครั้งแรกในรอบหลายปี ปาลูกโป่งไม่โดนสักลูก แต่ได้ตุ๊กตาปลอบใจ', slides: [
    ['ไม่ได้มา<br>งานวัดนานมาก', 'มาเลย<br><b>เหมือนตอนเด็ก</b>', `A bright temple fair in daytime with paper flags and small stalls. On the left, ${L} looks around in wonder. On the right, ${R} gestures toward the stalls.`],
    ['ปาลูกโป่ง<br>ไม่โดนสักลูก', 'อีกสามดอก<br><b>ลองใหม่</b>', `A balloon dart stall with a board of balloons. On the left, ${L} throws a small dart, missing. On the right, ${R} holds out three more darts.`],
    ['โดนแล้ว<br>ลูกเดียว!', 'ลูกเดียว<br><b>ก็ได้รางวัล</b>', `A balloon dart stall. On the left, ${L} jumps with both arms raised. On the right, ${R} claps. One balloon popped.`],
    ['ได้ตุ๊กตา<br>ตัวเล็กนิดเดียว', 'ตัวเล็ก<br><b>แต่ความสุขตัวใหญ่</b>', `A temple fair path with paper flags. On the left, ${L} holds up a tiny stuffed toy proudly. On the right, ${R} laughs, holding a bag of sweets.`],
    ['ปีหน้า<br>มาอีกนะ', 'สัญญา<br><b>มาด้วยกัน</b>', `A temple fair in bright afternoon light. Two people walking side by side, ${L} carrying the small toy and ${R} carrying a bag of sweets, relaxed.`],
  ]},
  { slug: 'leaky-roof', title: 'หลังคารั่ว', plot: 'ฝนตกหลังคาห้องรั่วทั่วห้อง เพื่อนมาช่วยรองน้ำจนกลายเป็นวงดนตรีเสียงหยดน้ำ', slides: [
    ['หลังคารั่ว<br>ทั้งห้องเลย', 'เอากะละมัง<br><b>มารองก่อน</b>', `A small bright room with water drips falling from the ceiling. On the left, ${L} holds a bucket under a drip. On the right, ${R} comes in carrying a stack of bowls.`],
    ['ตรงนี้ก็รั่ว<br>ตรงนั้นก็รั่ว', 'ใช้ได้ทุกใบ<br><b>ในบ้านเลย</b>', `A small room with many bowls and buckets on the floor catching water drips. On the left, ${L} places a pot. On the right, ${R} places a cup.`],
    ['ฟังสิ<br>เสียงมันแปลก ๆ', 'ติ๋ง ต๋อง<br><b>เหมือนเพลงเลย</b>', `A small room with bowls catching drips. Two people, ${L} and ${R}, sitting on the floor among the bowls, listening, small music notes drawn in the air.`],
    ['ห้องพังขนาดนี้<br>ยังขำได้อีก', 'ขำไว้ก่อน<br><b>พรุ่งนี้ค่อยซ่อม</b>', `A small room. Two people, ${L} and ${R}, sitting on the floor laughing among bowls, wrapped in one blanket. Soft bright window light.`],
    ['ซ่อมเสร็จแล้ว<br>ไม่รั่วแล้ว', 'แต่คิดถึง<br><b>วงดนตรีเมื่อวานนะ</b>', `A low roof of a small house on a sunny day. On the left, ${L} sits on the roof with a hammer. On the right, ${R} stands on a ladder handing up a roof tile.`],
  ]},
  { slug: 'kayak', title: 'พายเรือคายัค', plot: 'พายเรือคายัคครั้งแรก หมุนวนอยู่ที่เดิม จนจับจังหวะพายพร้อมกันได้', slides: [
    ['ไม่เคยพาย<br>เรือเลยนะ', 'ฉันก็ไม่เคย<br><b>ลองไปด้วยกัน</b>', `A calm bright river bank with a two-seat kayak on the sand. On the left, ${L} holds a paddle awkwardly. On the right, ${R} pushes the kayak toward the water.`],
    ['ทำไมเรือ<br>หมุนเป็นวงกลม', 'เราพาย<br><b>คนละทางไง</b>', `A calm river. Two people, ${L} in front and ${R} behind, sitting in a kayak spinning in a circle, paddles in opposite directions, ripples around.`],
    ['นับจังหวะ<br>ด้วยกันไหม', 'หนึ่ง สอง<br><b>หนึ่ง สอง</b>', `A calm river. Two people in a kayak, ${L} in front and ${R} behind, paddling together on the same side, focused.`],
    ['ไปได้แล้ว!<br>ตรงด้วย', 'ไปทางเดียวกัน<br><b>ก็ไปได้ไกล</b>', `A wide calm river with trees on the banks. Two people, ${L} and ${R}, paddling a kayak smoothly forward in harmony. Light airy daylight.`],
    ['เปียกทั้งตัว<br>เลยนะ', 'ก็คุ้ม<br><b>เราไปถึงแล้ว</b>', `A sandy river bank. Two people, ${L} and ${R}, sitting on the sand beside the kayak, wringing water from their sleeves, laughing.`],
  ]},
  { slug: 'locked-out', title: 'ลืมกุญแจ', plot: 'ลืมกุญแจไว้ในห้อง ล็อกตัวเองอยู่ข้างนอก นั่งรอช่างกุญแจกับเพื่อนจนคุยกันเพลิน', slides: [
    ['ลืมกุญแจ<br>ไว้ในห้อง!', 'โทรเรียก<br><b>ช่างกุญแจกัน</b>', `A bright apartment hallway. On the left, ${L} pulls at a locked door handle. On the right, ${R} holds up a phone calmly.`],
    ['ช่างมาอีก<br>สองชั่วโมง', 'งั้นนั่งรอ<br><b>ตรงนี้แหละ</b>', `A bright hallway. On the left, ${L} slides down to sit against the locked door. On the right, ${R} sits down beside them on the floor.`],
    ['หิวแล้ว<br>ด้วยสิ', 'ฉันมีขนม<br><b>ในกระเป๋า</b>', `A hallway floor. Two people sitting against a door, ${L} and ${R}, the right person pulling a pack of snacks from a bag.`],
    ['ไม่ได้นั่งคุยกัน<br>นานแล้วนะ', 'ต้องขอบคุณ<br><b>กุญแจนะ</b>', `A hallway floor. Two people, ${L} and ${R}, sitting side by side sharing snacks, laughing and talking. Soft bright light.`],
    ['ประตูเปิด<br>แล้ว', 'แต่อยาก<br><b>นั่งคุยต่ออีกนิด</b>', `A hallway with an open door. Two people, ${L} and ${R}, still sitting on the floor outside the open door, relaxed, cups in hand.`],
  ]},
  { slug: 'waterfall', title: 'เดินป่าไปน้ำตก', plot: 'เดินป่าไปน้ำตก ทางชันจนอยากถอย เพื่อนจูงมือขึ้นไปจนถึง', slides: [
    ['น้ำตกอยู่<br>อีกไกลไหม', 'อีกนิดเดียว<br><b>ได้ยินเสียงแล้ว</b>', `A bright forest trail with tall trees. On the left, ${L} leans on a walking stick, tired. On the right, ${R} points ahead up the trail.`],
    ['ทางชัน<br>จนกลัวลื่น', 'จับมือฉันไว้<br><b>ก้าวทีละก้าว</b>', `A steep rocky forest path. On the left, ${L} reaches up a step of rock. On the right, ${R} stands above, holding out a hand to pull them up.`],
    ['ขาสั่น<br>ไปหมดแล้ว', 'พักได้<br><b>ไม่มีใครรีบ</b>', `A forest path. On the left, ${L} sits on a large rock catching breath. On the right, ${R} stands beside them offering a water bottle.`],
    ['ถึงแล้ว!<br>สวยมาก', 'เหนื่อยแค่ไหน<br><b>ก็คุ้มใช่ไหม</b>', `A bright waterfall flowing over rocks into a clear pool. Two people, ${L} and ${R}, standing on rocks with arms raised in front of the waterfall.`],
    ['ถ้าไม่มีเธอ<br>คงถอยไปแล้ว', 'เธอเดินเอง<br><b>ฉันแค่อยู่ข้าง ๆ</b>', `Rocks beside a waterfall pool. Two people, ${L} and ${R}, sitting side by side with their feet in the water, relaxed. Light airy daylight.`],
  ]},
  { slug: 'phone-free', title: 'วันไม่จับมือถือ', plot: 'ท้ากันวางมือถือหนึ่งวัน ตอนแรกอึดอัด สุดท้ายได้เห็นอะไรรอบตัวเยอะขึ้น', slides: [
    ['วางมือถือ<br>ทั้งวันเลยเหรอ', 'ลองดู<br><b>แค่วันเดียว</b>', `A bright room. On the left, ${L} hesitantly puts a phone into a small box on a table. On the right, ${R} closes the lid of the box.`],
    ['มือว่าง<br>ทำอะไรดี', 'มองรอบ ๆ<br><b>ดูสิ</b>', `A park. On the left, ${L} stands with empty hands, fidgeting. On the right, ${R} spreads both arms toward the trees.`],
    ['ไม่เคยเห็น<br>ต้นไม้นี้เลย', 'เดินผ่าน<br><b>ทุกวันนะ</b>', `A park with a big flowering tree. On the left, ${L} looks up at the tree in surprise. On the right, ${R} laughs, hands in coat pockets.`],
    ['คุยกันนาน<br>ไม่มีใครก้มจอ', 'แบบนี้<br><b>ได้ยินกันชัดขึ้น</b>', `A park bench. Two people, ${L} and ${R}, sitting side by side facing each other, talking, no phones. Bright daylight.`],
    ['พรุ่งนี้<br>ทำอีกไหม', 'วันละชั่วโมง<br><b>ก็ยังดี</b>', `A park at bright afternoon. Two people walking side by side, ${L} and ${R}, relaxed, empty hands swinging.`],
  ]},
  { slug: 'khanom-krok', title: 'ขนมครก', plot: 'หัดทำขนมครกครั้งแรก แคะไม่ออก แตกทุกหลุม แต่กินแล้วอร่อยเหมือนบ้านยาย', slides: [
    ['อยากกิน<br>ขนมครกแบบยาย', 'ทำเองเลย<br><b>ฉันมีกระทะ</b>', `A bright kitchen with a round cast-iron pan with many small holes. On the left, ${L} holds a bowl of batter. On the right, ${R} places the pan on a small stove.`],
    ['แคะไม่ออก<br>เลยสักหลุม', 'รอให้สุก<br><b>อีกนิดนะ</b>', `A kitchen. On the left, ${L} pokes at the pan with a small spoon, frustrated. On the right, ${R} leans in, one hand up asking to wait.`],
    ['แตก<br>ทุกหลุมเลย', 'แตกก็ขนมครก<br><b>รสเดิมนะ</b>', `A kitchen table with a plate of broken little round coconut cakes. On the left, ${L} holds up a broken piece. On the right, ${R} laughs.`],
    ['อร่อยแฮะ<br>เหมือนบ้านยาย', 'สูตรยาย<br><b>ไม่ได้อยู่ที่หน้าตา</b>', `A kitchen table. Two people, ${L} and ${R}, sitting side by side eating little coconut cakes from one plate, happy body language.`],
    ['เอาไปฝาก<br>ยายดีไหม', 'ยายต้อง<br><b>ยิ้มแน่เลย</b>', `A sunny village lane. Two people walking side by side, ${L} carrying a small box of sweets wrapped in banana leaf, ${R} beside them.`],
  ]},
  { slug: 'bowling', title: 'โบว์ลิ่งลงร่อง', plot: 'ไปโบว์ลิ่งครั้งแรก ลงร่องทุกลูก จนลูกสุดท้ายล้มหมดทุกพิน', slides: [
    ['ไม่เคยเล่น<br>โบว์ลิ่งเลย', 'ไม่ต้องเก่ง<br><b>แค่โยนให้สุด</b>', `A bright bowling alley. On the left, ${L} holds a heavy bowling ball with both hands. On the right, ${R} picks a ball from the rack.`],
    ['ลงร่อง<br>อีกแล้ว', 'ร่องมันชอบเธอ<br><b>ล่ะมั้ง</b>', `A bowling lane. On the left, ${L} watches a ball rolling into the gutter, hands on head. On the right, ${R} laughs. Pins standing at the end.`],
    ['คะแนนศูนย์<br>เลยนะ', 'ศูนย์ก็เป็น<br><b>จุดเริ่มต้นได้</b>', `A bowling alley bench. On the left, ${L} sits slumped. On the right, ${R} pats their shoulder, smiling.`],
    ['ล้มหมด<br>ทุกพิน!', 'สไตรค์!<br><b>เห็นไหมล่ะ</b>', `A bowling lane with all the pins falling down. Two people, ${L} and ${R}, jumping with arms raised in celebration.`],
    ['ลูกเดียว<br>ก็ภูมิใจแล้ว', 'ลูกเดียวที่ดี<br><b>จำได้ทั้งชีวิต</b>', `A bright street outside. Two people walking side by side, ${L} and ${R}, laughing, the left person mimicking a bowling throw.`],
  ]},
  { slug: 'strawberry', title: 'เก็บสตรอว์เบอร์รี่', plot: 'ขึ้นดอยไปเก็บสตรอว์เบอร์รี่ เก็บได้น้อยเพราะกินไปเยอะ', slides: [
    ['อากาศเย็น<br>สบายจัง', 'ไปเก็บ<br><b>สตรอว์เบอร์รี่กัน</b>', `A bright hillside farm with rows of strawberry plants. On the left, ${L} stretches arms, wearing a scarf. On the right, ${R} holds two small baskets.`],
    ['ลูกนี้<br>สวยสุดเลย', 'ใส่ตะกร้าก่อน<br><b>อย่าเพิ่งกิน</b>', `A strawberry field. On the left, ${L} crouches holding up one big strawberry. On the right, ${R} crouches nearby with a basket, pointing at it playfully.`],
    ['กินไปแล้ว<br>ลูกนึง...', 'ฉันก็กิน<br><b>ไปสามลูก</b>', `A strawberry field. Two people, ${L} and ${R}, crouching side by side eating strawberries, almost empty baskets beside them.`],
    ['ตะกร้า<br>แทบว่างเลย', 'แต่ท้อง<br><b>เต็มแล้วนะ</b>', `A strawberry field. On the left, ${L} holds up a nearly empty basket. On the right, ${R} pats their own stomach, laughing.`],
    ['มาอีก<br>ปีหน้านะ', 'คราวหน้า<br><b>เก็บก่อนกิน</b>', `A hillside viewpoint with misty hills. Two people, ${L} and ${R}, sitting side by side on a wooden bench, a small basket between them. Light airy sky.`],
  ]},
  { slug: 'knitting', title: 'ถักผ้าพันคอ', plot: 'หัดถักผ้าพันคอให้แม่ ถักผิดจนเบี้ยว แต่แม่ใส่ทุกวัน', slides: [
    ['อยากถัก<br>ผ้าพันคอให้แม่', 'ฉันสอนให้<br><b>เริ่มจากแถวแรก</b>', `A bright room with a sofa. On the left, ${L} holds knitting needles and a ball of yarn, puzzled. On the right, ${R} sits beside them demonstrating a stitch.`],
    ['ไหมพัน<br>กันยุ่งไปหมด', 'แกะทีละปม<br><b>ไม่ต้องรีบ</b>', `A sofa. On the left, ${L} is tangled in loose yarn around their arms. On the right, ${R} carefully untangles a knot, laughing.`],
    ['ทำไมมัน<br>เบี้ยวแบบนี้', 'เบี้ยวนิดหน่อย<br><b>แต่ถักด้วยใจ</b>', `A sofa. On the left, ${L} holds up a short crooked scarf. On the right, ${R} gives a thumbs up.`],
    ['เสร็จแล้ว!<br>ยาวพอไหม', 'ยาวพอ<br><b>ให้แม่อุ่นแล้ว</b>', `A bright room. Two people standing, ${L} holding up a long uneven knitted scarf, ${R} holding the other end, proud.`],
    ['แม่ใส่<br>ทุกวันเลยนะ', 'ของที่ทำเอง<br><b>อุ่นกว่าเสมอ</b>', `A sunny porch. Two people, ${L} and ${R}, sitting side by side, a knitted scarf draped around the left person's neck. Light airy daylight.`],
  ]},
  { slug: 'tree-house', title: 'บ้านต้นไม้', plot: 'ตอนเด็กฝันอยากมีบ้านต้นไม้ โตมาสร้างด้วยกันจนเสร็จแบบเล็ก ๆ', slides: [
    ['ตอนเด็ก<br>อยากมีบ้านต้นไม้', 'ตอนนี้<br><b>ก็ยังไม่สาย</b>', `A sunny backyard with a big tree. On the left, ${L} looks up at the tree branches. On the right, ${R} arrives carrying wooden planks.`],
    ['ตอกตะปู<br>โดนนิ้วอีกแล้ว', 'เดี๋ยวฉัน<br><b>จับไม้ให้</b>', `Under a big tree with planks. On the left, ${L} shakes their hand in pain holding a hammer. On the right, ${R} holds a plank steady.`],
    ['เบี้ยว<br>นิดหน่อยนะ', 'บ้านเรา<br><b>ไม่ต้องตรงเป๊ะ</b>', `A big tree with a small simple wooden platform in its branches. On the left, ${L} stands on a ladder checking a plank. On the right, ${R} looks up from below, laughing.`],
    ['เสร็จแล้ว!<br>ขึ้นมาสิ', 'ฝันเด็ก<br><b>เป็นจริงแล้วนะ</b>', `A small wooden tree house in a big tree. On the left, ${L} waves from the tree house. On the right, ${R} climbs up a rope ladder.`],
    ['เล็กกว่าที่ฝัน<br>นิดนึง', 'แต่มีที่<br><b>สำหรับสองคน</b>', `Inside a small open wooden tree house among leaves. Two people, ${L} and ${R}, sitting side by side with legs dangling over the edge. Bright daylight.`],
  ]},
  { slug: 'cleaning-day', title: 'ทำความสะอาดรับปีใหม่', plot: 'ทำความสะอาดบ้านรับปีใหม่ ฝุ่นเต็มไปหมด แต่เจอของเก่าที่ทำให้ยิ้ม', slides: [
    ['ใกล้ปีใหม่<br>บ้านรกมาก', 'ทำความสะอาด<br><b>ด้วยกันเลย</b>', `A bright cluttered room with boxes and books. On the left, ${L} holds a broom, overwhelmed. On the right, ${R} ties on an apron, ready.`],
    ['ฝุ่นเยอะ<br>จนจามไม่หยุด', 'เปิดหน้าต่าง<br><b>ให้ลมเข้า</b>', `A bright room with a cloud of dust. On the left, ${L} sneezes holding a feather duster. On the right, ${R} opens a big window wide.`],
    ['เจอสมุด<br>ตอนประถม', 'อ่านให้ฟังหน่อย<br><b>อยากรู้</b>', `A room with open boxes. Two people, ${L} and ${R}, sitting on the floor side by side, the left person holding an old notebook, both leaning in.`],
    ['ทิ้งอะไร<br>ไม่ลงเลย', 'ทิ้งของได้<br><b>เก็บความทรงจำไว้</b>', `A room. On the left, ${L} hugs an old box to their chest. On the right, ${R} holds an empty garbage bag, laughing gently.`],
    ['ห้องโล่ง<br>ใจก็โล่ง', 'พร้อมรับ<br><b>ปีใหม่แล้ว</b>', `A clean bright tidy room with sunlight. Two people, ${L} and ${R}, sitting on the floor side by side resting, brooms leaning on the wall.`],
  ]},
  { slug: 'ducks', title: 'ให้อาหารเป็ด', plot: 'วันที่เหนื่อยมาก เพื่อนพาไปให้อาหารเป็ดที่สวน เป็ดวิ่งไล่จนหัวเราะลืมเรื่องเครียด', slides: [
    ['วันนี้<br>เหนื่อยมากเลย', 'ไปสวนกัน<br><b>ไปหาเป็ด</b>', `A bright city sidewalk. On the left, ${L} walks with head down, bag on shoulder. On the right, ${R} holds up a small paper bag of bread.`],
    ['เป็ดเยอะ<br>ขนาดนี้เลย', 'โยนเบา ๆ<br><b>ทีละนิด</b>', `A calm park pond with several ducks. On the left, ${L} crouches at the edge holding bread. On the right, ${R} tosses small crumbs into the water.`],
    ['มันวิ่ง<br>ไล่ฉันแล้ว!', 'วิ่งเร็ว<br><b>มันหิว!</b>', `A grassy park by a pond. On the left, ${L} runs laughing, chased by a few ducks. On the right, ${R} doubles over with laughter.`],
    ['หัวเราะจน<br>ลืมเรื่องงานไปเลย', 'เป็ด<br><b>รักษาใจได้นะ</b>', `A park bench by a pond. Two people, ${L} and ${R}, sitting side by side, ducks gathered at their feet. Light airy daylight.`],
    ['พรุ่งนี้<br>เหนื่อยอีกแน่ ๆ', 'งั้นมา<br><b>หาเป็ดอีก</b>', `A park path by a pond in bright afternoon light. Two people walking side by side, ${L} and ${R}, relaxed, a few ducks following behind them.`],
  ]},
  { slug: 'broken-vase', title: 'แจกันแตก', plot: 'ทำแจกันของแม่แตก ช่วยกันต่อด้วยกาวจนกลับมาใช้ได้ มีรอยแต่สวยไปอีกแบบ', slides: [
    ['แจกันแม่<br>แตกแล้ว!', 'ใจเย็นก่อน<br><b>เก็บชิ้นส่วนกัน</b>', `A bright living room with broken pieces of a ceramic vase on the floor. On the left, ${L} stands frozen, hands on head. On the right, ${R} kneels to pick up a piece.`],
    ['แม่ต้อง<br>เสียใจแน่ ๆ', 'งั้นเราต่อ<br><b>มันกลับมา</b>', `A table with ceramic pieces laid out. On the left, ${L} sits with shoulders dropped. On the right, ${R} holds up a small tube of glue.`],
    ['ชิ้นนี้<br>ต่อตรงไหนนะ', 'เหมือนจิ๊กซอว์<br><b>ค่อย ๆ หา</b>', `A table. Two people, ${L} and ${R}, sitting side by side fitting ceramic pieces together carefully, focused.`],
    ['มีรอย<br>เต็มเลย', 'รอยพวกนี้<br><b>คือเรื่องราวของมัน</b>', `A table. On the left, ${L} holds up a repaired vase covered with visible crack lines. On the right, ${R} nods, smiling.`],
    ['แม่บอกว่า<br>สวยกว่าเดิมอีก', 'ของที่เคยแตก<br><b>ก็ยังมีค่าเสมอ</b>', `A bright windowsill with a repaired cracked vase holding a few flowers. Two people, ${L} and ${R}, standing side by side looking at it. Soft window light.`],
  ]},
  { slug: 'new-year-card', title: 'การ์ดปีใหม่', plot: 'เขียนการ์ดปีใหม่ด้วยมือส่งให้ทุกคนที่สำคัญ เขียนไม่เก่งแต่ทุกใบมาจากใจ', slides: [
    ['ปีนี้อยาก<br>เขียนการ์ดเอง', 'เขียนด้วยมือ<br><b>คนรับต้องดีใจ</b>', `A bright table with blank cards and colored pencils. On the left, ${L} holds a blank card. On the right, ${R} pushes a box of pencils toward them.`],
    ['ลายมือ<br>ไม่สวยเลย', 'ลายมือเธอ<br><b>คือเสียงของเธอ</b>', `A table with cards. On the left, ${L} writes on a card, hunched over. On the right, ${R} looks at the card, nodding.`],
    ['ต้องเขียน<br>อีกสิบใบ', 'ฉันช่วย<br><b>วาดรูปให้</b>', `A table covered with cards and envelopes. Two people, ${L} and ${R}, sitting side by side, one writing and one drawing small stars on a card.`],
    ['ใบนี้<br>ให้เธอนะ', 'ฉันก็มี<br><b>ให้เธอเหมือนกัน</b>', `A table. On the left, ${L} holds out a card with both hands. On the right, ${R} holds out another card at the same moment, both surprised.`],
    ['ส่งครบ<br>แล้ว', 'ปีหน้า<br><b>เขียนกันอีกนะ</b>', `A mailbox on a bright street. Two people, ${L} and ${R}, standing beside it, the left person dropping a stack of envelopes into the slot.`],
  ]},
  { slug: 'christmas-tree', title: 'ต้นคริสต์มาสต้นเล็ก', plot: 'ห้องเล็กเกินจะมีต้นคริสต์มาส เลยทำต้นเล็ก ๆ จากกิ่งไม้ แขวนของที่ทำเองทั้งหมด', slides: [
    ['ห้องเล็ก<br>ไม่มีที่วางต้นไม้', 'งั้นทำ<br><b>ต้นเล็ก ๆ กัน</b>', `A small bright room. On the left, ${L} spreads arms showing the tiny room. On the right, ${R} holds up a bundle of dry branches.`],
    ['ใช้กิ่งไม้<br>แทนต้นสนเหรอ', 'อะไรก็ได้<br><b>ถ้าใส่ใจ</b>', `A table. On the left, ${L} ties branches together into a small tree shape. On the right, ${R} sets it upright in a small pot.`],
    ['ของแขวน<br>ทำจากกระดาษ', 'ดาวดวงนี้<br><b>ให้เธอแขวนนะ</b>', `A table with paper ornaments. On the left, ${L} cuts paper stars with scissors. On the right, ${R} holds out one paper star.`],
    ['เบี้ยวไปหมด<br>เลยนะ', 'ต้นไม้ของเรา<br><b>สวยที่สุดแล้ว</b>', `A small branch Christmas tree with paper stars on a table. Two people, ${L} and ${R}, standing side by side admiring it, proud.`],
    ['ปีนี้ไม่เหงา<br>แล้วนะ', 'สุขสันต์<br><b>คริสต์มาส</b>', `A small bright room with the small branch tree on a table. Two people, ${L} and ${R}, sitting on the floor side by side holding warm mugs. Soft window light.`],
  ]},
  { slug: 'hundred-steps', title: 'เดินมาด้วยกัน', plot: 'เรื่องที่ร้อย เดินย้อนทางเดิมที่เคยผ่านมาด้วยกัน นึกถึงทุกวันที่ผ่านมา', slides: [
    ['เดินมา<br>ไกลแค่ไหนแล้วนะ', 'ไม่ได้นับ<br><b>แต่จำได้ทุกก้าว</b>', `A long bright country path through fields. Two people, ${L} and ${R}, walking side by side seen from behind, relaxed.`],
    ['จำวันที่<br>ฉันร้องไห้ได้ไหม', 'จำได้<br><b>ฉันนั่งข้าง ๆ</b>', `A simple park bench beside the path. On the left, ${L} touches the back of the bench. On the right, ${R} stands beside, one hand on their shoulder.`],
    ['วันที่หัวเราะ<br>ก็เยอะนะ', 'เยอะกว่า<br><b>วันที่ร้องไห้อีก</b>', `A grassy hill. Two people, ${L} and ${R}, sitting on the grass laughing, leaning toward each other. Light airy daylight.`],
    ['ขอบคุณ<br>ที่อยู่ด้วยกันมา', 'ขอบคุณ<br><b>ที่ให้ฉันอยู่ด้วย</b>', `A path under a big tree. On the left, ${L} bows slightly with hands together. On the right, ${R} places a hand on their own chest.`],
    ['ต่อจากนี้<br>ไปไหนดี', 'ไปไหนก็ได้<br><b>ไปด้วยกัน</b>', `A wide bright open path leading toward distant hills. Two people walking side by side seen from behind, ${L} and ${R}, a long road ahead. Light airy sky.`],
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
    const dir = `${ROOT}/2026-11-24_${i + 81}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-24)

- ชุดที่ ${i + 81}/100 จาก \`carousel/stories/2026-11-24.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
