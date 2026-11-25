// story carousels 101-120 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-24b.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on pale cream off-white textured sketch paper (not orange, not peach), smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'laundry-day', title: 'ตากผ้าแล้วฝนตก', plot: 'ตากผ้าเต็มราว ฝนตกลงมาทันที วิ่งเก็บผ้ากันวุ่นจนเปียกทั้งคนทั้งผ้า', slides: [
    ['แดดดีจัง<br>ตากผ้าเลย', 'ตากเต็มราว<br><b>เลยนะ</b>', `A bright backyard with a long clothesline. On the left, ${L} hangs a shirt on the line with clothespins. On the right, ${R} holds a basket of laundry.`],
    ['เมฆมา<br>แล้วนะ', 'ไม่หรอก<br><b>เดี๋ยวก็ผ่าน</b>', `A backyard with laundry on a clothesline. On the left, ${L} points up at a few soft clouds. On the right, ${R} waves a hand, relaxed.`],
    ['ฝนตกแล้ว!<br>เก็บเร็ว!', 'เก็บไม่ทัน<br><b>แล้วล่ะ!</b>', `A backyard in light rain with drawn rain lines. Two people, ${L} and ${R}, running along the clothesline grabbing clothes in their arms, laughing.`],
    ['เปียกทั้งคน<br>ทั้งผ้าเลย', 'ซักใหม่ก็ได้<br><b>หัวเราะไปก่อน</b>', `A covered porch. Two people, ${L} and ${R}, sitting with a pile of wet laundry between them, both soaked, laughing.`],
    ['ฟ้าใส<br>อีกแล้วนะ', 'ตากรอบสอง<br><b>ด้วยกันเลย</b>', `A bright sunny backyard. Two people, ${L} and ${R}, hanging laundry on the clothesline together side by side. Light airy daylight.`],
  ]},
  { slug: 'som-tam', title: 'ส้มตำเผ็ดเกิน', plot: 'หัดตำส้มตำเอง ใส่พริกเยอะเกิน เผ็ดจนน้ำตาไหล แต่กินหมดจาน', slides: [
    ['วันนี้<br>ฉันตำเอง', 'พริกกี่เม็ด<br><b>ดีล่ะ</b>', `A bright simple kitchen with a clay mortar and wooden pestle. On the left, ${L} holds a wooden pestle proudly. On the right, ${R} holds up a small handful of chilies.`],
    ['ใส่หมด<br>เลยแล้วกัน', 'เดี๋ยว ๆ<br><b>หมดเลยเหรอ!</b>', `A kitchen. On the left, ${L} drops many chilies into the clay mortar. On the right, ${R} raises both hands in alarm.`],
    ['เผ็ด<br>มากกกก', 'น้ำ!<br><b>เอาน้ำมา!</b>', `A kitchen table with a plate of papaya salad. On the left, ${L} fans their mouth area with both hands. On the right, ${R} rushes in with a glass of water.`],
    ['น้ำตาไหล<br>แต่หยุดกินไม่ได้', 'แสดงว่า<br><b>อร่อยจริง</b>', `A kitchen table. Two people, ${L} and ${R}, sitting side by side eating from one plate, both wiping their cheeks, laughing.`],
    ['คราวหน้า<br>สองเม็ดพอ', 'ตกลง<br><b>สองเม็ดนะ</b>', `A bright kitchen. Two people, ${L} and ${R}, washing the clay mortar together at a sink, relaxed. Soft window light.`],
  ]},
  { slug: 'library', title: 'ห้องสมุดเงียบ ๆ', plot: 'ไปอ่านหนังสือในห้องสมุด เจอเรื่องตลก กลั้นหัวเราะกันจนตัวสั่น', slides: [
    ['ต้องเงียบ<br>นะในนี้', 'รู้แล้ว<br><b>จุ๊ ๆ</b>', `A bright quiet library with tall bookshelves. On the left, ${L} holds a finger up near their ball head. On the right, ${R} nods, carrying two books.`],
    ['เล่มนี้<br>ตลกมาก', 'ไหน<br><b>ขอดูหน่อย</b>', `A long library table. On the left, ${L} sits shaking with held-in laughter over an open book. On the right, ${R} leans over to look.`],
    ['กลั้นไม่ไหว<br>แล้ว...', 'อย่าหัวเราะ<br><b>อย่ามองฉัน</b>', `A library table. Two people, ${L} and ${R}, sitting side by side, both covering their ball heads with books, shoulders shaking.`],
    ['ออกไปข้างนอก<br>ก่อนดีกว่า', 'วิ่งเงียบ ๆ<br><b>ไปเลย</b>', `A library aisle between bookshelves. Two people, ${L} and ${R}, tiptoeing quickly toward a bright door, hunched over.`],
    ['หัวเราะได้<br>แล้ว!', 'หายใจ<br><b>ไม่ทันเลย</b>', `Stone steps outside a library on a sunny day. Two people, ${L} and ${R}, sitting on the steps bent over laughing. Light airy daylight.`],
  ]},
  { slug: 'zipline', title: 'โหนสลิง', plot: 'กลัวความสูงแต่อยากลองโหนสลิง ยืนสั่นอยู่บนจุดปล่อยนาน จนกล้าปล่อยตัว', slides: [
    ['สูงขนาดนี้<br>เลยเหรอ', 'ไม่ต้องรีบ<br><b>ฉันรอได้</b>', `A wooden platform on a tall tree with a zipline cable stretching away over a forest. On the left, ${L} clings to a railing. On the right, ${R} stands calmly in a harness.`],
    ['ขาสั่น<br>ไปหมดแล้ว', 'มองไปข้างหน้า<br><b>อย่ามองลง</b>', `A wooden platform high in a tree. On the left, ${L} stands at the edge in a harness, knees bent, frozen. On the right, ${R} points forward toward the horizon.`],
    ['ถ้าฉัน<br>ร้องดังมากล่ะ', 'ร้องให้สุด<br><b>เลยนะ</b>', `A wooden platform. On the left, ${L} holds the zipline handle with both hands. On the right, ${R} gives a thumbs up, smiling.`],
    ['บินได้<br>แล้วววว!', 'เธอทำได้!<br><b>ฉันตามไปนะ</b>', `A zipline cable over a forest. On the left, ${L} glides along the cable with legs kicking. On the right, ${R} waves from the platform. Wide light airy sky.`],
    ['อยากเล่น<br>อีกรอบ!', 'เมื่อกี้ใคร<br><b>บอกว่ากลัวนะ</b>', `The ground at the end of a zipline in a bright forest clearing. Two people, ${L} and ${R}, laughing, the left person jumping with arms raised.`],
  ]},
  { slug: 'rainbow', title: 'รุ้งหลังฝน', plot: 'วันที่ฝนตกทั้งวันจนเซ็ง พอฝนหยุดก็เห็นรุ้งเต็มฟ้า', slides: [
    ['ฝนตก<br>ทั้งวันเลย', 'นั่งฟังฝน<br><b>ไปก่อนนะ</b>', `A bright window with rain drops. On the left, ${L} rests chin on hands at the window, bored. On the right, ${R} sits nearby holding a warm mug.`],
    ['อยากออกไป<br>ข้างนอก', 'ฝนไม่ตก<br><b>ตลอดไปหรอก</b>', `A room by a window. On the left, ${L} stands with hands on the glass. On the right, ${R} reads a book on a chair, calm.`],
    ['หยุดแล้ว!', 'ไปเดินเล่น<br><b>กันเลย</b>', `An open front door to a bright wet garden. On the left, ${L} steps out with arms open. On the right, ${R} grabs a coat, following.`],
    ['รุ้ง!<br>ตรงนั้น!', 'เห็นไหม<br><b>รอแล้วคุ้ม</b>', `A wet grassy hill with puddles and a big soft rainbow arch in a light airy sky. Two people, ${L} and ${R}, standing side by side, the left person pointing at the rainbow.`],
    ['วันแย่ ๆ<br>ก็จบสวยได้', 'ใช่<br><b>ถ้ารอจนจบ</b>', `A wet grassy hill. Two people, ${L} and ${R}, sitting side by side on a bench, looking at a faint rainbow. Light airy sky.`],
  ]},
  { slug: 'art-gallery', title: 'ดูงานศิลปะ', plot: 'ไปดูนิทรรศการศิลปะ ดูไม่เข้าใจสักภาพ แต่ตั้งชื่อภาพกันเองจนสนุก', slides: [
    ['ภาพนี้<br>คืออะไรนะ', 'ไม่รู้<br><b>แต่ดูดีนะ</b>', `A bright white art gallery with simple abstract paintings of circles and lines on the walls. On the left, ${L} tilts their ball head at a painting. On the right, ${R} stands with hands behind the back.`],
    ['เหมือนไข่ดาว<br>เลยนะ', 'งั้นชื่อ<br><b>ไข่ดาวยามเช้า</b>', `An art gallery. On the left, ${L} points at a big abstract painting of a circle. On the right, ${R} pretends to read a label, finger on chin.`],
    ['อันนี้<br>เส้นยุ่ง ๆ', 'ชื่อว่า<br><b>วันจันทร์</b>', `An art gallery. Two people, ${L} and ${R}, standing in front of an abstract painting full of tangled lines, both laughing quietly.`],
    ['เราดูไม่เป็น<br>ใช่ไหม', 'ศิลปะ<br><b>ไม่มีคำตอบผิด</b>', `A gallery bench in the middle of a white room. Two people, ${L} and ${R}, sitting side by side looking at a large painting of soft shapes.`],
    ['ไปวาดเอง<br>ดีไหม', 'ชื่อภาพแรก<br><b>ไข่ดาวยามเช้า</b>', `A bright room with an easel. On the left, ${L} paints a simple circle on a canvas. On the right, ${R} watches, holding a brush.`],
  ]},
  { slug: 'latte-art', title: 'ลาเต้อาร์ต', plot: 'หัดเทลาเต้อาร์ตเป็นรูปหัวใจ ออกมาเป็นก้อนเมฆทุกแก้ว จนแก้วสุดท้ายได้หัวใจเบี้ยว ๆ', slides: [
    ['อยากเท<br>เป็นรูปหัวใจ', 'ลองดูสิ<br><b>นมเต็มเหยือก</b>', `A small bright café counter. On the left, ${L} holds a small milk pitcher over a cup. On the right, ${R} stands behind the counter with arms crossed, smiling.`],
    ['ทำไมออกมา<br>เป็นก้อนเมฆ', 'ก้อนเมฆ<br><b>ก็น่ารักนะ</b>', `A café counter with a cup. On the left, ${L} looks down into a coffee cup, puzzled. On the right, ${R} leans in to look, laughing.`],
    ['แก้วที่ห้า<br>แล้วนะ', 'ฉันดื่ม<br><b>ไม่ไหวแล้ว</b>', `A café counter with many coffee cups lined up. On the left, ${L} pours again, focused. On the right, ${R} holds their stomach, surrounded by empty cups.`],
    ['หัวใจ!<br>เบี้ยว ๆ แต่ใช่!', 'หัวใจเบี้ยว<br><b>ก็ยังเป็นหัวใจ</b>', `A café counter. Two people, ${L} and ${R}, leaning close over one coffee cup, both delighted, the left person raising a fist.`],
    ['แก้วนี้<br>ให้เธอนะ', 'จะดื่ม<br><b>ช้า ๆ เลย</b>', `A small café table by a window. On the left, ${L} slides a coffee cup across the table. On the right, ${R} takes it with both hands. Soft window light.`],
  ]},
  { slug: 'stairs', title: 'ลิฟต์เสีย', plot: 'ลิฟต์เสีย ต้องเดินขึ้นชั้นสิบพร้อมของหนัก นับขั้นบันไดกันไปจนถึง', slides: [
    ['ลิฟต์เสีย<br>อีกแล้ว', 'ชั้นสิบ<br><b>เดินกันเถอะ</b>', `A bright building lobby. On the left, ${L} stands in front of closed elevator doors holding heavy shopping bags. On the right, ${R} points toward a stairwell.`],
    ['ชั้นสาม<br>ขาจะหลุด', 'แบ่งถุง<br><b>มาให้ฉัน</b>', `A bright stairwell. On the left, ${L} climbs steps, bent under bags. On the right, ${R} reaches out to take one of the bags.`],
    ['ยังอีก<br>ตั้งเจ็ดชั้น', 'นับไปทีละขั้น<br><b>เดี๋ยวก็ถึง</b>', `A stairwell with a large number painted on the wall. Two people, ${L} and ${R}, climbing the stairs side by side, each carrying a bag.`],
    ['ถึงแล้ว!<br>ชั้นสิบ!', 'เก่งมาก<br><b>เราทั้งคู่</b>', `A bright landing at the top of the stairs. Two people, ${L} and ${R}, sitting on the top step, bags beside them, arms raised weakly.`],
    ['พรุ่งนี้<br>ขาคงระบม', 'แต่วันนี้<br><b>ออกกำลังกายแล้วนะ</b>', `A bright apartment balcony. Two people, ${L} and ${R}, lying on the floor with legs up on a chair, laughing. Light airy daylight.`],
  ]},
  { slug: 'sunflower', title: 'ทุ่งทานตะวัน', plot: 'ขับรถไปไกลเพื่อดูทุ่งทานตะวัน ไปถึงดอกหันหลังให้ แต่ก็สวยไปอีกแบบ', slides: [
    ['ขับมาไกล<br>เพื่อทานตะวัน', 'อีกนิด<br><b>ใกล้แล้ว</b>', `A bright country road with fields. On the left, ${L} leans out of a small car window. On the right, ${R} drives, one hand pointing ahead.`],
    ['ดอกหันหลัง<br>ให้เราหมดเลย', 'งั้นเรา<br><b>เดินไปอีกฝั่ง</b>', `A large sunflower field seen from the back of the flowers. On the left, ${L} stands with hands on hips. On the right, ${R} laughs, pointing around the field.`],
    ['ทางเดิน<br>ไกลมากเลย', 'ดอกไม้<br><b>เดินไปด้วย</b>', `A narrow path between tall sunflowers. Two people, ${L} and ${R}, walking in single file through the flowers.`],
    ['หันมาแล้ว!<br>สวยมาก', 'คุ้ม<br><b>ใช่ไหมล่ะ</b>', `A sunflower field with all the flowers facing the viewer. Two people, ${L} and ${R}, standing among the flowers, arms spread wide.`],
    ['เหมือนดอกไม้<br>ยิ้มให้เลย', 'ทานตะวัน<br><b>หันหาแสงเสมอ</b>', `The edge of a sunflower field in bright afternoon light. Two people, ${L} and ${R}, sitting on the grass side by side, one sunflower in the left person's hand.`],
  ]},
  { slug: 'hiccups', title: 'สะอึกไม่หยุด', plot: 'สะอึกไม่หยุดทั้งวัน ลองทุกวิธีที่รู้ จนหายเพราะหัวเราะ', slides: [
    ['ฮิก!<br>สะอึกอีกแล้ว', 'กลั้นหายใจ<br><b>สิบวิ</b>', `A bright room. On the left, ${L} stands with one hand on their chest, jumping slightly. On the right, ${R} holds up ten fingers.`],
    ['ไม่หาย<br>ฮิก!', 'ดื่มน้ำ<br><b>ทีละอึก</b>', `A kitchen. On the left, ${L} drinks from a glass of water, bent forward. On the right, ${R} holds a water jug, watching.`],
    ['วิธีไหน<br>ก็ไม่หาย', 'งั้นท่าสุดท้าย<br><b>แบ่ว!</b>', `A room. On the left, ${L} sits on a chair, slumped. On the right, ${R} jumps out from behind a door with both arms raised to surprise them.`],
    ['ตกใจ<br>แต่ยังสะอึก', 'ฮ่า ๆ ๆ<br><b>ขอโทษ</b>', `A room. Two people, ${L} and ${R}, both laughing hard, the right person bent over holding their stomach.`],
    ['หายแล้ว<br>เพราะหัวเราะ', 'ยาดีที่สุด<br><b>คือหัวเราะ</b>', `A bright sofa. Two people, ${L} and ${R}, leaning back side by side, relaxed and tired from laughing. Soft window light.`],
  ]},
  { slug: 'bamboo-bridge', title: 'สะพานไม้ไผ่', plot: 'ต้องข้ามสะพานไม้ไผ่ข้ามลำธาร กลัวตกจนไม่กล้าก้าว เพื่อนเดินนำทีละก้าว', slides: [
    ['ต้องข้าม<br>ตรงนี้เหรอ', 'สะพานไม้ไผ่<br><b>แข็งแรงนะ</b>', `A narrow bamboo bridge over a shallow stream in a bright forest. On the left, ${L} stands at the edge of the bridge, hesitating. On the right, ${R} stands on the bridge, testing it with one foot.`],
    ['มันโยก<br>นิดนึงนะ', 'โยกแต่<br><b>ไม่พัง</b>', `A bamboo bridge over a stream. On the left, ${L} takes a tiny step onto the bridge, arms out for balance. On the right, ${R} walks ahead, looking back.`],
    ['ไม่กล้า<br>มองลงเลย', 'มองหลังฉัน<br><b>เดินตามมา</b>', `A bamboo bridge. Two people walking on the bridge, ${R} in front and ${L} behind holding the end of their coat.`],
    ['ถึงอีกฝั่ง<br>แล้ว!', 'ข้ามได้<br><b>ทุกสะพาน</b>', `The far bank of a stream. On the left, ${L} jumps off the end of the bamboo bridge onto grass. On the right, ${R} catches their hand.`],
    ['ขากลับ<br>ต้องข้ามอีกนะ', 'รอบสอง<br><b>ง่ายกว่าเสมอ</b>', `A grassy bank by a stream with the bamboo bridge behind. Two people, ${L} and ${R}, sitting side by side, feet near the water. Light airy daylight.`],
  ]},
  { slug: 'piggy-bank', title: 'ทุบกระปุก', plot: 'หยอดกระปุกมาทั้งปี วันทุบกระปุกได้เงินไม่เยอะ แต่ภูมิใจที่ทำได้', slides: [
    ['ครบปี<br>แล้วนะ', 'ถึงเวลา<br><b>ทุบกระปุก</b>', `A bright table with a round ceramic piggy bank. On the left, ${L} holds the piggy bank up with both hands. On the right, ${R} holds a small wooden hammer.`],
    ['ใจหาย<br>นิดนึงนะ', 'ขอบคุณหมู<br><b>ที่เก็บให้</b>', `A table. On the left, ${L} pats the piggy bank gently. On the right, ${R} bows slightly to the piggy bank, playful.`],
    ['เหรียญเต็มเลย!', 'นับกัน<br><b>ทีละกอง</b>', `A table covered with coins and a broken piggy bank. Two people, ${L} and ${R}, sitting side by side stacking coins into small piles.`],
    ['ไม่เยอะ<br>อย่างที่คิด', 'แต่ทั้งหมดนี้<br><b>คือความตั้งใจ</b>', `A table with neat stacks of coins. On the left, ${L} shrugs with palms up. On the right, ${R} points proudly at the stacks.`],
    ['ปีหน้า<br>หยอดใหม่นะ', 'ซื้อกระปุก<br><b>ใบใหม่กัน</b>', `A bright shop shelf with small ceramic piggy banks. Two people, ${L} and ${R}, choosing a new piggy bank together, the left person holding one up.`],
  ]},
  { slug: 'shopping-list', title: 'ลืมของที่จะซื้อ', plot: 'เข้าซูเปอร์มาร์เก็ตมาซื้อของอย่างเดียว ออกไปได้ทุกอย่างยกเว้นของที่ตั้งใจซื้อ', slides: [
    ['มาซื้อ<br>ไข่อย่างเดียว', 'อย่างเดียว<br><b>จริงนะ</b>', `A bright supermarket entrance with shopping carts. On the left, ${L} holds up one finger. On the right, ${R} pushes an empty cart, doubtful.`],
    ['ขนมนี้<br>ลดราคา', 'นี่ไม่ใช่ไข่<br><b>นะ</b>', `A supermarket aisle with shelves of snacks. On the left, ${L} puts a bag of snacks into the cart. On the right, ${R} points at the cart, laughing.`],
    ['รถเข็น<br>เต็มแล้ว', 'แล้วไข่<br><b>อยู่ไหน?</b>', `A supermarket aisle. On the left, ${L} pushes an overflowing shopping cart. On the right, ${R} holds both hands up in a question.`],
    ['ลืมไข่!<br>จริงด้วย', 'วนกลับไป<br><b>อีกรอบ</b>', `Outside a supermarket. On the left, ${L} holds many shopping bags, hand on head. On the right, ${R} laughs, pointing back at the door.`],
    ['ต่อไปจด<br>ใส่กระดาษนะ', 'แล้วอย่าลืม<br><b>เอากระดาษมาด้วย</b>', `A bright kitchen. On the left, ${L} writes on a small paper list stuck on a fridge. On the right, ${R} holds a carton of eggs, laughing.`],
  ]},
  { slug: 'wind-chime', title: 'กระดิ่งลม', plot: 'ทำกระดิ่งลมจากเปลือกหอยที่เก็บจากทะเล แขวนไว้หน้าบ้าน ทุกครั้งที่ลมพัดได้ยินเสียงทะเล', slides: [
    ['เปลือกหอย<br>จากทะเลเยอะเลย', 'มาทำ<br><b>กระดิ่งลมกัน</b>', `A bright table with a pile of seashells and string. On the left, ${L} pours shells from a small bag. On the right, ${R} holds up a piece of driftwood.`],
    ['เจาะรู<br>ยากจัง', 'ค่อย ๆ<br><b>เดี๋ยวแตก</b>', `A table. On the left, ${L} carefully pokes a hole in a shell with a small tool. On the right, ${R} ties string, focused.`],
    ['แตกไป<br>สองอันแล้ว', 'เหลือ<br><b>อีกเยอะนะ</b>', `A table with shells. On the left, ${L} holds up two broken shell halves. On the right, ${R} laughs, pushing more shells toward them.`],
    ['เสร็จแล้ว<br>แขวนเลย', 'ตรงนี้<br><b>ลมดีที่สุด</b>', `A bright front porch. On the left, ${L} hangs a shell wind chime from the roof edge. On the right, ${R} points up, guiding.`],
    ['ได้ยินไหม<br>เสียงทะเล', 'ทะเลตามเรา<br><b>กลับบ้านมาด้วย</b>', `A front porch with a shell wind chime swaying. Two people, ${L} and ${R}, sitting on the steps side by side, listening. Light airy daylight.`],
  ]},
  { slug: 'dandelion', title: 'เป่าดอกไม้', plot: 'เจอดอกแดนดิไลออนกลางทุ่ง เป่าพร้อมกันแล้วอธิษฐาน ไม่บอกกันว่าขออะไร', slides: [
    ['ดอกไม้<br>ฟู ๆ นี่อะไร', 'แดนดิไลออน<br><b>เป่าแล้วขอพร</b>', `A bright grassy meadow. On the left, ${L} crouches, looking at a round fluffy dandelion. On the right, ${R} stands, smiling.`],
    ['ขอพรได้<br>จริงเหรอ', 'ถ้าเชื่อ<br><b>ก็จริง</b>', `A meadow. On the left, ${L} holds a dandelion carefully. On the right, ${R} picks another dandelion.`],
    ['พร้อมกันนะ<br>หนึ่ง สอง สาม', 'ฟู่ววว', `A meadow. Two people, ${L} and ${R}, blowing dandelions together, many tiny seeds floating in the air.`],
    ['ขออะไร<br>ไปเหรอ', 'บอกไม่ได้<br><b>เดี๋ยวไม่เป็นจริง</b>', `A meadow with floating seeds. On the left, ${L} leans in curiously. On the right, ${R} puts a finger in front of their ball head, secretive.`],
    ['ฉันขอ<br>เหมือนเธอแหละ', 'งั้นมัน<br><b>ต้องเป็นจริงแน่</b>', `A meadow in bright afternoon light. Two people, ${L} and ${R}, lying on the grass side by side, watching seeds float in the sky.`],
  ]},
  { slug: 'veggie-garden', title: 'ผักสวนครัว', plot: 'ปลูกผักสวนครัวหลังบ้าน ผักโตช้า หนอนกินบ้าง สุดท้ายได้ผักมาทำกับข้าวมื้อแรก', slides: [
    ['ปลูกผัก<br>กินเองดีไหม', 'ดีสิ<br><b>เริ่มจากผักบุ้ง</b>', `A small bright backyard with an empty garden bed. On the left, ${L} holds a small packet of seeds. On the right, ${R} digs the soil with a small shovel.`],
    ['ทำไม<br>ยังไม่โตเลย', 'เพิ่งสามวัน<br><b>ใจเย็น</b>', `A garden bed with tiny sprouts. On the left, ${L} crouches staring at the sprouts. On the right, ${R} waters them with a watering can.`],
    ['หนอนกิน<br>ไปครึ่งแปลง!', 'หนอนก็หิว<br><b>เหลือครึ่งนึง</b>', `A garden bed with leafy vegetables, some leaves with holes. On the left, ${L} holds up a nibbled leaf. On the right, ${R} laughs, kneeling.`],
    ['เก็บได้<br>แล้ว!', 'ตะกร้าแรก<br><b>ของเรา</b>', `A green garden bed. Two people, ${L} and ${R}, kneeling side by side, putting fresh vegetables into a small basket.`],
    ['อร่อยกว่า<br>ที่ซื้ออีก', 'เพราะเรา<br><b>รอมันโตด้วยกัน</b>', `A bright kitchen table with a plate of stir-fried vegetables. Two people, ${L} and ${R}, sitting side by side eating, happy.`],
  ]},
  { slug: 'magic-trick', title: 'มายากลพลาด', plot: 'ซ้อมมายากลเพื่อโชว์เพื่อน เล่นพลาดทุกท่า แต่เพื่อนปรบมือให้ทุกครั้ง', slides: [
    ['ดูนะ<br>มายากล!', 'พร้อมแล้ว<br><b>ตื่นเต้นเลย</b>', `A bright living room. On the left, ${L} wears a tall top hat and holds a fan of playing cards. On the right, ${R} sits on a sofa, clapping.`],
    ['เลือกไพ่<br>มาหนึ่งใบ', 'ใบนี้<br><b>จำแล้ว</b>', `A living room. On the left, ${L} holds out a fan of cards. On the right, ${R} picks one card, hiding it against their chest.`],
    ['ใบนี้ใช่ไหม!', 'ไม่ใช่<br><b>แต่เกือบนะ</b>', `A living room. On the left, ${L} holds up one card proudly. On the right, ${R} shakes their head, smiling, holding a different card.`],
    ['ไพ่หล่น<br>หมดเลย...', 'โชว์นี้<br><b>ฉันชอบที่สุด</b>', `A living room floor covered with scattered playing cards. On the left, ${L} kneels with the top hat tipped over. On the right, ${R} claps, laughing.`],
    ['ไม่มีท่าไหน<br>สำเร็จเลย', 'แต่ฉันยิ้ม<br><b>ทุกท่าเลยนะ</b>', `A bright sofa. Two people, ${L} and ${R}, sitting side by side, the right person wearing the top hat now, both relaxed.`],
  ]},
  { slug: 'paper-plane', title: 'เครื่องบินกระดาษ', plot: 'แข่งพับเครื่องบินกระดาษใครบินไกลกว่า ลำของตัวเองตกทุกรอบ จนพับใหม่ด้วยกัน', slides: [
    ['แข่งกันไหม<br>ใครบินไกล', 'มาเลย<br><b>ลำของฉันเร็วนะ</b>', `A bright grassy park. On the left, ${L} folds a paper airplane. On the right, ${R} holds up a finished paper airplane.`],
    ['ตกตรงหน้า<br>เลย', 'ปีกเบี้ยว<br><b>ไปนิดนึง</b>', `A park. On the left, ${L} looks down at a paper airplane lying on the grass right at their feet. On the right, ${R} laughs, pointing.`],
    ['ของเธอ<br>บินไกลจัง', 'มา<br><b>พับด้วยกัน</b>', `A park. On the left, ${L} watches a paper airplane fly far away. On the right, ${R} holds a sheet of paper, beckoning.`],
    ['ปีกเท่ากัน<br>แล้วนะ', 'ปล่อยพร้อมกัน<br><b>หนึ่ง สอง สาม!</b>', `A park. Two people, ${L} and ${R}, standing side by side throwing paper airplanes at the same moment.`],
    ['ไปตกที่<br>เดียวกันเลย', 'เสมอกัน<br><b>ก็ดีแล้ว</b>', `A grassy hill. Two people, ${L} and ${R}, walking side by side toward two paper airplanes lying together on the grass. Light airy sky.`],
  ]},
  { slug: 'hot-spring', title: 'น้ำพุร้อน', plot: 'เหนื่อยจากงานทั้งปี ไปแช่เท้าในบ่อน้ำพุร้อน ไอน้ำลอยจนลืมเรื่องเครียด', slides: [
    ['เหนื่อยมาก<br>ทั้งปีเลย', 'ไปแช่เท้า<br><b>น้ำพุร้อนกัน</b>', `A bright mountain path with soft steam rising in the distance. On the left, ${L} walks with shoulders slumped. On the right, ${R} carries two small towels.`],
    ['ร้อน<br>ไปไหมนะ', 'ค่อย ๆ จุ่ม<br><b>ทีละนิด</b>', `The stone edge of a small natural hot spring pool with soft steam. On the left, ${L} dips one toe into the water. On the right, ${R} sits on the edge, rolling up their trousers.`],
    ['โอ้ย<br>สบายจัง', 'ปล่อยให้<br><b>ความเหนื่อยละลาย</b>', `A hot spring pool edge. Two people, ${L} and ${R}, sitting side by side with feet in the steaming water, leaning back on their hands.`],
    ['ไม่อยาก<br>กลับเลย', 'อยู่ต่อ<br><b>อีกสิบนาที</b>', `A hot spring pool among rocks and trees, soft steam. Two people, ${L} and ${R}, sitting side by side with towels on their ball heads, relaxed.`],
    ['ปีหน้า<br>ขอเหนื่อยน้อยลง', 'ถ้าเหนื่อยอีก<br><b>มาแช่อีกนะ</b>', `A bright mountain viewpoint. Two people, ${L} and ${R}, standing side by side with towels around their necks, looking at the misty hills.`],
  ]},
  { slug: 'last-calendar', title: 'ปฏิทินแผ่นสุดท้าย', plot: 'ฉีกปฏิทินแผ่นสุดท้ายของปี นึกย้อนว่าปีนี้ผ่านอะไรมาบ้าง แล้วแขวนปฏิทินใหม่ด้วยกัน', slides: [
    ['แผ่นสุดท้าย<br>แล้วนะ', 'ปีนี้<br><b>ไวมากเลย</b>', `A bright room with a wall calendar showing a single last page. On the left, ${L} touches the calendar page. On the right, ${R} stands beside them, holding a mug.`],
    ['ปีนี้<br>ผ่านอะไรมาเยอะ', 'แต่เธอ<br><b>ผ่านมาได้หมด</b>', `A sofa. Two people, ${L} and ${R}, sitting side by side flipping through a thick stack of torn calendar pages.`],
    ['วันแย่ ๆ<br>ก็มีนะ', 'วันดี ๆ<br><b>มีมากกว่า</b>', `A table with torn calendar pages spread out. On the left, ${L} holds up one page. On the right, ${R} holds up two pages, laughing.`],
    ['ฉีกเลย<br>นะ', 'ขอบคุณ<br><b>ปีนี้</b>', `A wall with a calendar. On the left, ${L} tears off the last page. On the right, ${R} claps softly.`],
    ['ปฏิทินใหม่<br>แผ่นแรก', 'เริ่มใหม่<br><b>ไปด้วยกันนะ</b>', `A bright wall. Two people, ${L} and ${R}, hanging a new wall calendar together, both holding a corner. Soft window light.`],
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
    const dir = `${ROOT}/2026-11-24_${i + 101}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-24)

- ชุดที่ ${i + 101}/120 จาก \`carousel/stories/2026-11-24b.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
