// story carousels 141-160 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-26.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on pale cream off-white textured sketch paper (not orange, not peach), smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'night-market', title: 'ตลาดนัดกลางคืน', plot: 'ไปเดินตลาดนัดตอนเย็น ตั้งใจจะซื้อแค่ของกิน สุดท้ายมือเต็มไปด้วยถุง แต่ที่ชอบที่สุดคือเดินไปด้วยกัน', slides: [
    ['ไปแค่<br>ซื้อของกินนะ', 'สัญญา<br><b>แค่ของกิน</b>', `An evening street market with simple stalls and hanging round lamps, no signs, no other people. On the left, ${L} points ahead excitedly. On the right, ${R} nods with hands in pockets.`],
    ['ไก่ทอด<br>ร้านนี้ดังนะ', 'ซื้อเลย<br><b>อีกสองร้าน</b>', `A market food stall with a tray of fried snacks, no other people. On the left, ${L} holds a paper bag of food. On the right, ${R} holds two skewers.`],
    ['เสื้อตัวนี้<br>สวยดี', 'ไหนว่า<br><b>แค่ของกิน</b>', `A clothes stall with shirts on hangers, no other people. On the left, ${L} holds a shirt up against their chest. On the right, ${R} crosses arms, amused.`],
    ['มือเต็ม<br>ไปหมดแล้ว', 'เอามา<br><b>ถือให้ครึ่งนึง</b>', `A quiet market lane with hanging round lamps, no other people. On the left, ${L} carries many shopping bags. On the right, ${R} takes some bags from them.`],
    ['คราวหน้า<br>ไม่ซื้อเยอะแล้ว', 'พูดแบบนี้<br><b>ทุกอาทิตย์</b>', `The end of a market lane with a few round lamps, no other people. Two people, ${L} and ${R}, walk away side by side, each carrying bags, shoulders close.`],
  ] },
  { slug: 'mango-rice', title: 'ข้าวเหนียวมะม่วง', plot: 'หน้ามะม่วงมาแล้ว ลองทำข้าวเหนียวมะม่วงเองครั้งแรก ข้าวแข็งไปหน่อย แต่ได้หัวเราะทั้งครัว', slides: [
    ['มะม่วงสุก<br>แล้วนะ', 'ทำข้าวเหนียว<br><b>มะม่วงกัน</b>', `A bright home kitchen. On the left, ${L} holds up a ripe mango. On the right, ${R} ties on an apron.`],
    ['นึ่งข้าว<br>นานแค่ไหน', 'ไม่รู้<br><b>เดาเอา</b>', `A kitchen stove with a bamboo steamer and soft steam. On the left, ${L} peeks into the steamer. On the right, ${R} reads a small recipe card.`],
    ['ข้าวมัน<br>แข็งไปนะ', 'เรียกว่า<br><b>ข้าวเหนียวกรุบ</b>', `A kitchen counter. On the left, ${L} pokes a bowl of sticky rice with a spoon. On the right, ${R} shrugs with open hands.`],
    ['มะม่วง<br>หั่นสวยไหม', 'สวยกว่า<br><b>ข้าวเยอะ</b>', `A kitchen table with a plate of sliced mango and sticky rice. On the left, ${L} carefully slices a mango. On the right, ${R} leans in to look.`],
    ['ไม่อร่อย<br>เท่าร้าน', 'แต่อร่อยกว่า<br><b>เพราะทำด้วยกัน</b>', `A small dining table by a sunny window. Two people, ${L} and ${R}, sit facing each other sharing one plate of mango sticky rice, laughing.`],
  ] },
  { slug: 'tom-yum', title: 'ต้มยำหม้อแรก', plot: 'ป่วยเป็นหวัด อีกคนเลยลองทำต้มยำให้ เผ็ดจนน้ำตาไหล แต่หายหวัดไปครึ่งนึง', slides: [
    ['จมูก<br>ตันไปหมด', 'เดี๋ยว<br><b>ทำต้มยำให้</b>', `A cozy living room. On the left, ${L} sits on the sofa wrapped in a blanket holding a tissue box. On the right, ${R} rolls up their sleeves.`],
    ['ใส่พริก<br>กี่เม็ด', 'เยอะ ๆ<br><b>หายไว</b>', `A kitchen counter with lemongrass, chilies and a pot. On the left, ${L} peeks from the doorway in a blanket. On the right, ${R} drops chilies into a pot.`],
    ['หอม<br>มากเลย', 'ชิมก่อน<br><b>ระวังร้อน</b>', `A kitchen. On the left, ${L} leans toward a steaming pot. On the right, ${R} holds out a spoon of soup.`],
    ['เผ็ด<br>น้ำตาไหล', 'จมูก<br><b>โล่งแล้วใช่ไหม</b>', `A small dining table with a bowl of soup. On the left, ${L} fans their head with a hand, shoulders up. On the right, ${R} pours a glass of water.`],
    ['หายไป<br>ครึ่งนึงแล้ว', 'อีกครึ่ง<br><b>นอนพักนะ</b>', `A living room sofa. Two people, ${L} wrapped in a blanket and ${R} sitting close beside them, an empty bowl on the table.`],
  ] },
  { slug: 'full-moon', title: 'พระจันทร์เต็มดวง', plot: 'คืนพระจันทร์เต็มดวง ออกไปนั่งดูที่ระเบียง ถ่ายรูปยังไงก็ไม่สวยเท่าตาเห็น เลยวางมือถือแล้วดูด้วยกัน', slides: [
    ['พระจันทร์<br>ดวงใหญ่มาก', 'ออกไป<br><b>ดูกันเถอะ</b>', `A living room window with a big round full moon in a pale evening sky. On the left, ${L} points at the window. On the right, ${R} gets up from a chair.`],
    ['ถ่ายรูป<br>ไม่สวยเลย', 'ในรูป<br><b>ดวงนิดเดียว</b>', `A balcony with plants and a big round full moon in a pale sky. On the left, ${L} holds up a phone toward the moon. On the right, ${R} looks over their shoulder.`],
    ['ซูมแล้ว<br>ก็เบลอ', 'งั้นจำ<br><b>ด้วยตาแทน</b>', `A balcony railing with a big round full moon. On the left, ${L} frowns at the phone in their hands. On the right, ${R} gently lowers the phone with one hand.`],
    ['เงียบ<br>ดีเนอะ', 'ใช่<br><b>ไม่ต้องพูดก็ได้</b>', `A balcony with two chairs under a big round full moon in a pale sky. Two people, ${L} and ${R}, sit side by side looking up.`],
    ['เดือนหน้า<br>ดูอีกนะ', 'ทุกเดือน<br><b>เลยก็ได้</b>', `A balcony at night with soft moonlight on the floor, the big round moon above, pale sky. Two people, ${L} and ${R}, lean on the railing, shoulders touching.`],
  ] },
  { slug: 'rooftop', title: 'ดาดฟ้าตึก', plot: 'วันที่งานหนัก อีกคนพาขึ้นดาดฟ้าไปดูเมืองตอนเย็น ลมเย็น ๆ พัดเรื่องหนักให้เบาลง', slides: [
    ['เหนื่อย<br>มากเลยวันนี้', 'ตามมา<br><b>มีที่จะพาไป</b>', `A building stairwell. On the left, ${L} slumps on a step with a bag. On the right, ${R} stands a few steps up, waving them to come.`],
    ['ขึ้นมา<br>ได้ด้วยเหรอ', 'ที่ลับ<br><b>ของเรา</b>', `A rooftop door opening onto a wide flat roof with a light sky. On the left, ${L} steps through the door looking around. On the right, ${R} holds the door open.`],
    ['เห็นเมือง<br>ทั้งเมืองเลย', 'เรื่องที่หนัก<br><b>ดูเล็กลงไหม</b>', `A rooftop edge with a low wall, a far city skyline drawn lightly. On the left, ${L} leans on the wall looking out. On the right, ${R} stands beside them.`],
    ['ลมเย็น<br>ดีจัง', 'ปล่อยให้มัน<br><b>พัดไปบ้าง</b>', `A rooftop with a light breeze, soft lines in the air, a far skyline. On the left, ${L} stretches arms out wide, eyes up. On the right, ${R} smiles with hands in coat pockets.`],
    ['ขอบคุณนะ<br>ที่พามา', 'เหนื่อยเมื่อไหร่<br><b>มาอีกได้เลย</b>', `A rooftop at dusk with a pale sky and a far skyline. Two people, ${L} and ${R}, sit side by side on the low wall, seen from behind.`],
  ] },
  { slug: 'badminton', title: 'ตีแบด', plot: 'ตีแบดในซอยหน้าบ้าน ลมพัดลูกปลิวทุกที ตีไม่ข้ามสักลูก แต่เหงื่อออกและหัวเราะจนท้องแข็ง', slides: [
    ['ตีแบด<br>กันไหม', 'มา<br><b>แพ้เลี้ยงน้ำ</b>', `A quiet street in front of a house. On the left, ${L} holds two badminton rackets. On the right, ${R} takes one racket.`],
    ['ลูกมัน<br>ปลิวไปไหน', 'ลม<br><b>ไม่ใช่ฝีมือ</b>', `A quiet street. On the left, ${L} swings a racket at empty air. On the right, ${R} points up at a shuttlecock drifting away.`],
    ['ติดต้นไม้<br>แล้ว', 'เดี๋ยว<br><b>เขย่าให้</b>', `A small tree beside the street with a shuttlecock stuck in the branches. On the left, ${L} looks up with hands on head. On the right, ${R} shakes a low branch.`],
    ['ได้มา<br>หนึ่งแต้ม', 'ลูกเดียว<br><b>ในครึ่งชั่วโมง</b>', `A quiet street. On the left, ${L} jumps with a racket raised in joy. On the right, ${R} leans on their knees, laughing.`],
    ['ใครแพ้<br>เนี่ย', 'เสมอ<br><b>เลี้ยงกันคนละขวด</b>', `A doorstep in front of a house. Two people, ${L} and ${R}, sit on the step with rackets beside them, each holding a bottle of water.`],
  ] },
  { slug: 'moo-kratha', title: 'หมูกระทะ', plot: 'ไปกินหมูกระทะ คนหนึ่งปิ้งให้อีกคนกินตลอด ตัวเองไม่ได้กินเลย จนอีกคนสลับมาปิ้งให้บ้าง', slides: [
    ['หิว<br>มากเลย', 'หมูกระทะ<br><b>จัดไป</b>', `A simple restaurant table with a round grill pan in the middle, no other people. On the left, ${L} rubs their hands together. On the right, ${R} sits down with chopsticks.`],
    ['สุกแล้ว<br>ยัง', 'นี่<br><b>ชิ้นแรกให้</b>', `A table with a round grill pan and soft smoke. On the left, ${L} holds out a bowl. On the right, ${R} places a piece of grilled meat into it with tongs.`],
    ['แล้วเธอ<br>ได้กินยัง', 'เดี๋ยว<br><b>ปิ้งให้อีก</b>', `A table with a grill pan and plates. On the left, ${L} eats happily from a full bowl. On the right, ${R} keeps grilling with tongs, their own bowl empty.`],
    ['เอาที่คีบ<br>มานี่', 'อ้าว<br><b>สลับกันเหรอ</b>', `A table with a grill pan. On the left, ${L} takes the tongs from the hand of ${R}, who looks surprised.`],
    ['ตาเธอ<br>กินบ้าง', 'อร่อยกว่า<br><b>ตอนมีคนปิ้งให้</b>', `A table with a grill pan and soft smoke. Two people, ${L} grilling and ${R} eating, leaning toward each other, relaxed and happy.`],
  ] },
  { slug: 'cat-cafe', title: 'คาเฟ่แมว', plot: 'ไปคาเฟ่แมว แมวทุกตัวไม่สนใจคนที่อยากเล่นด้วย แต่ไปนอนตักคนที่นั่งเฉย ๆ', slides: [
    ['แมวเต็ม<br>ไปหมด', 'อย่าเสียงดัง<br><b>เดี๋ยวตกใจ</b>', `A cozy cafe with cushions and a few cats lying around, no other people. On the left, ${L} clasps hands excitedly. On the right, ${R} raises one hand gently, palm down.`],
    ['มานี่<br>เหมียว', 'มัน<br><b>เดินหนีแล้ว</b>', `A cafe floor with cushions. On the left, ${L} kneels holding out a toy feather wand. On the right, ${R} watches a cat walk away with its tail up.`],
    ['ทำไม<br>ไม่มีใครมา', 'ลอง<br><b>นั่งเฉย ๆ</b>', `A cafe corner with cats sleeping on shelves. On the left, ${L} sits with shoulders slumped holding a toy. On the right, ${R} sits calmly reading a small book.`],
    ['ไม่ยุติธรรม<br>เลย', 'ไม่ได้ทำ<br><b>อะไรเลยนะ</b>', `A cafe bench. On the left, ${L} points with mock outrage. On the right, ${R} sits still with two cats curled up asleep on their lap.`],
    ['มาแล้ว<br>หนึ่งตัว', 'เห็นไหม<br><b>รอเป็นก็ได้</b>', `A cafe bench with cushions. Two people, ${L} and ${R}, sit side by side, each with a sleeping cat on their lap, very still and happy.`],
  ] },
  { slug: 'rainy-window', title: 'ฝนตกริมหน้าต่าง', plot: 'ฝนตกทั้งบ่าย ไปไหนไม่ได้ เลยนั่งริมหน้าต่างฟังเสียงฝน กินมาม่าคนละถ้วย กลายเป็นบ่ายที่ดีที่สุดของอาทิตย์', slides: [
    ['ฝนตก<br>อีกแล้ว', 'ก็ไม่ต้อง<br><b>ไปไหนสิ</b>', `A living room with a big window showing rain lines. On the left, ${L} stands at the window with shoulders down. On the right, ${R} sits on a cushion on the floor.`],
    ['เบื่อจัง', 'มานั่งนี่<br><b>ฟังเสียงฝน</b>', `A window seat with cushions and rain on the glass. On the left, ${L} drags their feet toward the window. On the right, ${R} pats the cushion beside them.`],
    ['หิวขึ้นมา<br>เลย', 'มาม่า<br><b>คนละถ้วย</b>', `A small kitchen corner. On the left, ${L} holds two cup noodles. On the right, ${R} pours hot water from a kettle with soft steam.`],
    ['อร่อยกว่า<br>วันแดดออก', 'ฝนมัน<br><b>ปรุงรสให้</b>', `A window seat with rain streaks on the glass. Two people, ${L} and ${R}, sit side by side eating from steaming cup noodles.`],
    ['ฝนหยุด<br>แล้ว', 'เสียดาย<br><b>นิดนึงนะ</b>', `A window with the last raindrops and a soft light sky outside. Two people, ${L} and ${R}, lean on the window frame looking out, empty cups beside them.`],
  ] },
  { slug: 'watermelon', title: 'แตงโมลูกใหญ่', plot: 'ซื้อแตงโมลูกใหญ่มา ผ่าไม่เป็น กลิ้งไปทั่วครัว สุดท้ายได้นั่งกินเย็น ๆ แข่งกันถุยเมล็ด', slides: [
    ['ลูกใหญ่<br>มากเลย', 'ถือ<br><b>ไม่ไหวแล้ว</b>', `A house doorway. On the left, ${L} holds the door open. On the right, ${R} carries a very big round watermelon with both arms, leaning back.`],
    ['ผ่ายังไง<br>ดี', 'เดี๋ยว<br><b>ลองดู</b>', `A kitchen counter with a big round watermelon and a cutting board. On the left, ${L} holds a knife uncertainly. On the right, ${R} steadies the melon with both hands.`],
    ['มันกลิ้ง<br>ไปแล้ว', 'จับไว้<br><b>จับไว้</b>', `A kitchen floor. On the left, ${L} chases a rolling round watermelon. On the right, ${R} bends down with arms out to stop it.`],
    ['แดง<br>หวานมาก', 'คุ้ม<br><b>ที่วิ่งไล่</b>', `A kitchen table with a watermelon cut in half showing red flesh. On the left, ${L} holds up a big wedge proudly. On the right, ${R} takes a bite of another wedge.`],
    ['แข่งถุย<br>เมล็ดกัน', 'แพ้<br><b>ล้างจาน</b>', `A shady back porch. Two people, ${L} and ${R}, sit on the step holding watermelon wedges, leaning forward playfully, a bowl of rinds between them.`],
  ] },
  { slug: 'building-blocks', title: 'ตัวต่อพันชิ้น', plot: 'ซื้อตัวต่อเป็นบ้านหลังเล็กมาต่อ หาชิ้นไม่เจอ ทะเลาะกันนิดนึง สุดท้ายต่อเสร็จตอนเที่ยงคืน', slides: [
    ['พันชิ้น<br>เลยเหรอ', 'เสร็จ<br><b>ภายในคืนนี้</b>', `A living room floor. On the left, ${L} holds a big plain box. On the right, ${R} pours many small building bricks onto the rug.`],
    ['ชิ้นสีแดง<br>อยู่ไหน', 'ในกอง<br><b>ตรงนั้นแหละ</b>', `A rug covered with small building bricks. On the left, ${L} digs through a pile of bricks. On the right, ${R} points at another pile.`],
    ['เธอใส่<br>ผิดด้านนะ', 'ไม่ผิด<br><b>เป็นดีไซน์</b>', `A low table with a half-built small brick house. On the left, ${L} points at the model. On the right, ${R} holds a brick defensively, turned slightly away.`],
    ['ขอโทษ<br>ที่บ่น', 'ขอโทษ<br><b>ที่ดื้อ</b>', `A low table with a half-built brick house. On the left, ${L} hands over a brick. On the right, ${R} takes it, their heads tilted toward each other.`],
    ['เที่ยงคืน<br>พอดี', 'บ้านหลังแรก<br><b>ของเรา</b>', `A living room lit by one lamp, a finished small brick house on the low table. Two people, ${L} and ${R}, sit on the floor admiring it, shoulders together.`],
  ] },
  { slug: 'pillow-fight', title: 'สงครามหมอน', plot: 'เถียงกันเรื่องใครจะปิดไฟ จบด้วยสงครามหมอน ขนนกปลิวทั่วห้อง แล้วหัวเราะจนลืมว่าเถียงเรื่องอะไร', slides: [
    ['เธอไป<br>ปิดไฟสิ', 'เธอนั่นแหละ<br><b>ใกล้กว่า</b>', `A bedroom with a lamp and a bed. On the left, ${L} lies on the bed pointing at the light switch. On the right, ${R} sits on the bed pointing back.`],
    ['งั้น<br>เอานี่ไป', 'โอ๊ย<br><b>เริ่มแล้วนะ</b>', `A bedroom. On the left, ${L} swings a pillow. On the right, ${R} raises a pillow to block, laughing.`],
    ['ยอมยัง', 'ไม่ยอม<br><b>ไม่มีวัน</b>', `A bedroom with small feathers floating in the air. Two people, ${L} and ${R}, both swing pillows at each other, playful and mid-motion.`],
    ['ขนนก<br>เต็มห้องเลย', 'ใครจะ<br><b>เก็บล่ะ</b>', `A bedroom floor covered with small feathers. On the left, ${L} sits on the floor holding a flat pillow. On the right, ${R} holds up a single feather.`],
    ['เมื่อกี้<br>เถียงเรื่องอะไรนะ', 'ลืมแล้ว<br><b>ไปปิดไฟกัน</b>', `A bedroom with feathers on the floor. Two people, ${L} and ${R}, lie side by side on the bed laughing, pillows scattered.`],
  ] },
  { slug: 'hammock', title: 'เปลญวน', plot: 'ผูกเปลญวนใต้ต้นไม้ ขึ้นไปทีไรตกทุกที ตลกจนท้องแข็ง จนสุดท้ายได้นอนแกว่งเบา ๆ ฟังเสียงใบไม้', slides: [
    ['ผูกเปล<br>เสร็จแล้ว', 'ใครจะ<br><b>ลองก่อน</b>', `A shady garden with a hammock tied between two trees. On the left, ${L} pulls on the hammock to test it. On the right, ${R} stands with arms crossed, watching.`],
    ['ดูนะ<br>ง่ายจะตาย', 'ระวัง<br><b>มันหมุน</b>', `A garden with a hammock between two trees. On the left, ${L} tries to climb into the swaying hammock, one leg in. On the right, ${R} reaches out a hand.`],
    ['โอ๊ย<br>ตกอีกแล้ว', 'ครั้งที่สาม<br><b>แล้วนะ</b>', `A garden with a flipped hammock between two trees. On the left, ${L} sits on the grass under the hammock. On the right, ${R} doubles over laughing.`],
    ['ช่วย<br>จับไว้หน่อย', 'จับแล้ว<br><b>ค่อย ๆ นะ</b>', `A garden with a hammock between two trees. On the left, ${L} lies carefully in the hammock. On the right, ${R} holds the edge of the hammock steady.`],
    ['แกว่ง<br>เบา ๆ ที', 'นอนเลย<br><b>เดี๋ยวไกวให้</b>', `A shady garden with leaves drifting down. On the left, ${L} lies relaxed in the hammock. On the right, ${R} sits on the grass, gently pushing the hammock with one hand.`],
  ] },
  { slug: 'flower-market', title: 'ตลาดดอกไม้', plot: 'ไปตลาดดอกไม้ตอนเช้ามืด จะซื้อดอกไม้ให้คนอื่น แต่สุดท้ายอีกคนแอบซื้อช่อเล็ก ๆ ให้', slides: [
    ['ตื่นเช้า<br>ขนาดนี้เลยเหรอ', 'ดอกไม้<br><b>สดตอนเช้า</b>', `An early morning flower market with buckets of flowers, no other people. On the left, ${L} yawns and stretches. On the right, ${R} walks ahead holding a basket.`],
    ['หอม<br>ไปหมดเลย', 'เลือกให้แม่<br><b>สักช่อ</b>', `A flower stall with many buckets of flowers, no other people. On the left, ${L} leans in to smell roses. On the right, ${R} looks at lilies.`],
    ['แบบนี้<br>แม่ชอบไหม', 'ชอบแน่<br><b>สีเดียวกับบ้าน</b>', `A flower stall, no other people. On the left, ${L} holds up a big bouquet. On the right, ${R} nods, holding the basket.`],
    ['ไปไหน<br>มาเนี่ย', 'เปล่า<br><b>เดินดูเฉย ๆ</b>', `A market lane with flower buckets, no other people. On the left, ${L} holds the big bouquet, looking around. On the right, ${R} walks back with one hand hidden behind their back.`],
    ['ของใคร<br>เหรอ', 'ของเธอ<br><b>ช่อเล็กหน่อยนะ</b>', `A flower market lane in the morning light, no other people. On the left, ${L} holds a big bouquet. On the right, ${R} offers a small bunch of daisies.`],
  ] },
  { slug: 'fix-chair', title: 'ซ่อมเก้าอี้', plot: 'เก้าอี้ตัวโปรดขาโยก ช่วยกันซ่อมเอง ตอกตะปูโดนนิ้ว ทาสีเลอะทั้งตัว แต่ได้เก้าอี้ตัวเดิมที่ดีกว่าเดิม', slides: [
    ['เก้าอี้<br>มันโยกแล้ว', 'ซ่อมเอง<br><b>ไม่ต้องทิ้ง</b>', `A sunny porch with an old wooden chair. On the left, ${L} wobbles the chair with one hand. On the right, ${R} carries a small toolbox.`],
    ['ตะปูอยู่ไหน', 'ในกล่อง<br><b>ใบเล็ก</b>', `A porch floor with tools laid out. On the left, ${L} kneels holding the chair upside down. On the right, ${R} looks into a small box of nails.`],
    ['โอ๊ย<br>โดนนิ้ว', 'มา<br><b>เป่าให้</b>', `A porch. On the left, ${L} holds one hand up, a hammer on the floor. On the right, ${R} leans in holding their hand gently.`],
    ['ทาสีด้วย<br>ไหม', 'เลอะ<br><b>ทั้งตัวแล้วเนี่ย</b>', `A porch with newspaper on the floor and a paint can. On the left, ${L} paints the chair with a brush. On the right, ${R} holds up their sleeve with a smudge on it, laughing.`],
    ['ตัวเดิม<br>แต่ดีกว่าเดิม', 'เหมือน<br><b>เรานั่นแหละ</b>', `A sunny porch with the freshly painted wooden chair. On the left, ${L} sits on the repaired chair. On the right, ${R} stands behind it with a hand resting on the backrest.`],
  ] },
  { slug: 'sticky-note', title: 'โน้ตบนตู้เย็น', plot: 'ตารางงานไม่ตรงกัน แทบไม่ได้เจอหน้า เลยคุยกันผ่านโน้ตแปะตู้เย็น จนตู้เย็นเต็มไปด้วยกระดาษ', slides: [
    ['พรุ่งนี้<br>เข้างานเช้าอีกแล้ว', 'ฉันกลับดึก<br><b>ไม่ได้เจอกันอีก</b>', `A small kitchen at night. On the left, ${L} puts on a bag at the door. On the right, ${R} sits at the table holding a mug.`],
    ['เหลือข้าว<br>ไว้ให้นะ', 'อ่านแล้ว<br><b>ขอบคุณ</b>', `A kitchen with a fridge covered in small blank paper notes. On the left, ${L} sticks a blank note on the fridge. On the right, ${R} stands at the fridge reading a blank note, at a different moment.`],
    ['วันนี้เหนื่อย<br>ไหม', 'เหนื่อย<br><b>แต่อ่านแล้วหาย</b>', `A fridge covered with many small blank square paper notes, no writing. On the left, ${L} holds a pen. On the right, ${R} holds a note close to their chest.`],
    ['ตู้เย็น<br>เต็มแล้วนะ', 'งั้น<br><b>แปะประตูต่อ</b>', `A kitchen with a fridge completely covered in small blank notes. On the left, ${L} looks at the full fridge with hands on hips. On the right, ${R} sticks a note on the kitchen door.`],
    ['วันหยุด<br>ตรงกันแล้ว', 'ไม่ต้อง<br><b>เขียนแล้วนะ</b>', `A bright kitchen on a weekend morning with notes on the fridge. Two people, ${L} and ${R}, sit together at the table with breakfast, facing each other.`],
  ] },
  { slug: 'slow-sunday', title: 'วันอาทิตย์ช้า ๆ', plot: 'วันอาทิตย์ที่ไม่มีแผนอะไรเลย ตื่นสาย อ่านหนังสือ รดน้ำต้นไม้ ไม่ได้ทำอะไรใหญ่ แต่เป็นวันที่ใจเบาที่สุด', slides: [
    ['วันนี้<br>ทำอะไรดี', 'ไม่ทำ<br><b>อะไรเลย</b>', `A bright bedroom in late morning. On the left, ${L} sits up in bed stretching. On the right, ${R} lies back with arms behind their head.`],
    ['ตื่นสาย<br>ไม่ผิดนะ', 'วันอาทิตย์<br><b>อนุญาต</b>', `A kitchen with soft light. On the left, ${L} pours coffee slowly. On the right, ${R} leans on the counter with a mug.`],
    ['อ่านหนังสือ<br>ไปครึ่งเล่ม', 'ฉันอ่าน<br><b>ไปหน้าเดียว</b>', `A living room with a sofa. On the left, ${L} reads a thick book. On the right, ${R} lies on the sofa with an open book on their chest, relaxed.`],
    ['รดน้ำต้นไม้<br>ด้วยกันไหม', 'ไปสิ<br><b>ช้า ๆ</b>', `A small balcony garden with potted plants. On the left, ${L} holds a watering can over the plants. On the right, ${R} touches a leaf gently.`],
    ['ไม่ได้ทำ<br>อะไรเลยนะ', 'แต่ใจ<br><b>เบาที่สุด</b>', `A sunny balcony in the afternoon with plants. Two people, ${L} and ${R}, sit on floor cushions leaning against the wall, eyes up to the sky.`],
  ] },
  { slug: 'resolution', title: 'ตั้งเป้าปีใหม่', plot: 'ช่วยกันเขียนเป้าหมายปีใหม่ คนหนึ่งเขียนยาวเป็นหน้า อีกคนเขียนข้อเดียว คือขอให้ปีหน้ายังอยู่ด้วยกัน', slides: [
    ['เขียนเป้า<br>ปีหน้ากัน', 'ได้<br><b>ข้อเดียวพอ</b>', `A desk by a window with two notebooks and pens. On the left, ${L} opens a notebook eagerly. On the right, ${R} picks up a pen.`],
    ['ลดน้ำหนัก<br>ออมเงิน<br>เที่ยวญี่ปุ่น', 'ยาว<br><b>เป็นหน้าเลย</b>', `A desk. On the left, ${L} writes fast in a notebook filled with lines of scribbles, no readable text. On the right, ${R} leans over to look, amused.`],
    ['แล้วเธอ<br>เขียนอะไร', 'ข้อเดียว<br><b>ห้ามแอบดู</b>', `A desk. On the left, ${L} tries to peek. On the right, ${R} covers a small notebook page with one hand, playful.`],
    ['ปีที่แล้ว<br>ทำได้กี่ข้อ', 'ข้อเดียว<br><b>ที่ทำได้ทุกปี</b>', `A desk with an old notebook and a small calendar. On the left, ${L} flips an old notebook with a sheepish shrug. On the right, ${R} smiles with head tilted.`],
    ['บอกได้ยัง<br>ข้ออะไร', 'ปีหน้า<br><b>ยังมีเธอ</b>', `A window seat in soft light. On the left, ${L} holds a notebook to their chest. On the right, ${R} shows them a small notebook page, leaning close.`],
  ] },
  { slug: 'countdown', title: 'นับถอยหลัง', plot: 'คืนส่งท้ายปีเก่า ตั้งใจจะนับถอยหลังด้วยกัน แต่เผลอหลับบนโซฟาก่อนเที่ยงคืน ตื่นมาอีกทีก็ปีใหม่แล้ว', slides: [
    ['คืนนี้<br>ห้ามหลับนะ', 'สัญญา<br><b>นับด้วยกัน</b>', `A cozy living room at night with a lamp and a round wall clock. On the left, ${L} puts snacks on a low table. On the right, ${R} sits on the sofa with a blanket.`],
    ['อีก<br>สองชั่วโมง', 'ง่ายมาก<br><b>สบาย ๆ</b>', `A living room with a round wall clock. On the left, ${L} points at the clock. On the right, ${R} gives a thumbs up from the sofa.`],
    ['ง่วง<br>นิดนึงแล้ว', 'พักตา<br><b>แป๊บเดียว</b>', `A living room sofa with a lamp. On the left, ${L} rubs their head sleepily. On the right, ${R} leans back with the blanket up to their chin.`],
    ['ตื่น ๆ<br>ปีใหม่แล้ว', 'เอ๊ะ<br><b>นับไปแล้วเหรอ</b>', `A living room with a round wall clock. On the left, ${L} jolts upright on the sofa. On the right, ${R} wakes up with the blanket sliding off, surprised.`],
    ['พลาดซะแล้ว', 'ไม่เป็นไร<br><b>สวัสดีปีใหม่นะ</b>', `A cozy living room lit by a lamp. Two people, ${L} and ${R}, sit close under one blanket on the sofa, laughing, heads leaning together.`],
  ] },
  { slug: 'fireworks', title: 'พลุปีใหม่', plot: 'ไปดูพลุปีใหม่ริมแม่น้ำ คนเยอะจนมองไม่เห็น เลยเดินกลับมาดูจากสะพานเล็ก ๆ เห็นพลุไกล ๆ แต่สวยที่สุด', slides: [
    ['ไปดูพลุ<br>ริมน้ำกัน', 'ไปสิ<br><b>ใส่เสื้ออุ่น ๆ นะ</b>', `A house doorway in the evening. On the left, ${L} pulls on a scarf. On the right, ${R} holds the door open, ready to go.`],
    ['คน<br>เยอะมาก', 'มองไม่เห็น<br><b>อะไรเลย</b>', `A riverside path, crowd shown only as soft blurry pencil shapes far away. On the left, ${L} stands on tiptoes. On the right, ${R} shrugs.`],
    ['กลับบ้าน<br>ดีไหม', 'มีที่หนึ่ง<br><b>ตามมา</b>', `A quiet side street, no other people. On the left, ${L} looks down, disappointed. On the right, ${R} takes their hand, leading the way.`],
    ['สะพาน<br>เล็ก ๆ นี่เอง', 'ไม่มีใคร<br><b>นอกจากเรา</b>', `A small empty footbridge over a canal in the evening, pale sky, no other people. On the left, ${L} leans on the railing. On the right, ${R} stands beside them.`],
    ['ไกลไปนิด<br>แต่สวยจัง', 'สวยที่สุด<br><b>ที่เคยดูมา</b>', `A small footbridge, distant fireworks drawn as light pencil starbursts in a pale evening sky. Two people, ${L} and ${R}, stand close together at the railing, seen from behind, looking up.`],
  ] },
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
    const dir = `${ROOT}/2026-11-26_${i + 141}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-26)

- ชุดที่ ${i + 141}/160 จาก \`carousel/stories/2026-11-26.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
