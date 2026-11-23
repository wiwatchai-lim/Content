// story carousels 61-80 (5 slides each), same format as kits/2026-11-14_umbrella-story:
// charcoal faceless duo, 1080×1080, Thai bubbles in HTML, no logo.
// Left = person in a hoodie (speaks first), right = person in a long coat (answers, bold line).
//   node carousel/stories/2026-11-23b.mjs        -> writes kit.md, 01-05.html, dialogue.css, prompts.txt in each kit
// prompts.txt = one line per slide "NN<TAB>prompt"; carousel/stories/gen.sh runs FLUX on them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/timeoptic-content/carousel/kits';
const CSS = `${ROOT}/2026-11-14_umbrella-story/dialogue.css`;
export const STY = 'A detailed soft charcoal and graphite pencil drawing on pale cream off-white textured sketch paper (not orange, not peach), smudged tonal shading, rich grey mid-tones, visible pencil strokes and paper grain, black and grey only. Two large faceless mannequin people with smooth white round ball heads, simple clothes, gentle emotional body language. Quiet tender mood. The upper third of the picture is blank cream paper. The ball heads have no eyes, no mouth and no facial features. Light airy background, no dark sky. No signature, no text.';
const L = 'the left person, in a hooded sweatshirt,';
const R = 'the right person, in a long buttoned coat,';

export const STORIES = [
  { slug: 'karaoke', title: 'ร้องเพี้ยน', plot: 'ไปคาราโอเกะครั้งแรก ร้องเพี้ยนทั้งเพลง แต่เพื่อนร้องเพี้ยนตามจนกลายเป็นคืนที่สนุกที่สุด', slides: [
    ['ฉันร้องเพลง<br>ไม่เป็นนะ', 'ไม่ต้องเป็น<br><b>แค่ร้องให้สนุก</b>', `A small bright karaoke room with a sofa and a screen. On the left, ${L} hesitates, holding a microphone at arm's length. On the right, ${R} sits on the sofa, waving them on.`],
    ['เพี้ยนตั้งแต่<br>ท่อนแรกเลย', 'เพี้ยนแบบนี้<br><b>ฟังแล้วยิ้ม</b>', `A karaoke room. On the left, ${L} sings into a microphone, one hand covering their ball head in embarrassment. On the right, ${R} claps along on the sofa.`],
    ['อายจัง<br>ไม่ร้องแล้ว', 'งั้นร้องด้วยกัน<br><b>เพี้ยนสองคน</b>', `A karaoke room. On the left, ${L} holds out the microphone. On the right, ${R} stands up and takes a second microphone. Light airy room.`],
    ['เราร้อง<br>คนละคีย์เลย', 'แต่เพลงเดียวกัน<br><b>ก็พอแล้ว</b>', `A karaoke room. Two people, ${L} and ${R}, singing together side by side, each with a microphone, arms over each other's shoulders, joyful body language.`],
    ['พรุ่งนี้<br>เสียงคงหาย', 'คุ้มนะ<br><b>หัวเราะทั้งคืน</b>', `A quiet street outside in bright afternoon light. Two people walking side by side, ${L} and ${R}, laughing, the left person holding their throat playfully.`],
  ]},
  { slug: 'driving-test', title: 'สอบใบขับขี่', plot: 'สอบใบขับขี่ตกท่าถอยจอด เพื่อนพาไปซ้อมที่ลานว่างจนผ่าน', slides: [
    ['ตกท่า<br>ถอยจอดอีกแล้ว', 'ถอยจอด<br><b>ใครก็เคยตก</b>', `A driving test yard with traffic cones. On the left, ${L} stands beside a small car, head bowed, holding a paper. On the right, ${R} walks toward them, one hand raised.`],
    ['ชนกรวย<br>ไปสามอัน', 'งั้นไปซ้อม<br><b>กับกรวยของฉัน</b>', `An empty parking lot with a few orange cones. On the left, ${L} sits in the driver's seat of a small car with the door open. On the right, ${R} sets down a traffic cone.`],
    ['หมุนพวงมาลัย<br>ทางไหนนะ', 'ดูกระจก<br><b>ใจเย็น ๆ</b>', `Inside a small car. On the left, ${L} grips the steering wheel, looking over their shoulder. On the right, ${R} sits in the passenger seat pointing at the side mirror.`],
    ['รอบนี้<br>ไม่ชนเลย!', 'เห็นไหม<br><b>เธอทำได้</b>', `An empty parking lot. On the left, ${L} stands beside a neatly parked small car, both arms raised. On the right, ${R} gives two thumbs up. Cones standing upright.`],
    ['ได้ใบขับขี่<br>แล้วนะ', 'คนแรกที่นั่ง<br><b>ต้องเป็นฉัน</b>', `A sunny road. Two people, ${L} and ${R}, standing beside a small car, the left person holding up a small card proudly. Bright daylight.`],
  ]},
  { slug: 'chess', title: 'หมากรุกกับตา', plot: 'หัดเล่นหมากรุกเพื่อไปเล่นกับตา แพ้ทุกตาแต่ตาก็ยิ้มทุกครั้ง', slides: [
    ['อยากเล่นหมากรุก<br>กับตาให้ได้', 'ฉันสอนให้<br><b>เริ่มจากเบี้ย</b>', `A bright porch with a small wooden table and a chess board. On the left, ${L} sits looking at the chess pieces, puzzled. On the right, ${R} sits across and holds up one small pawn.`],
    ['ม้าเดิน<br>ยังไงนะ', 'เดินเป็นตัว L<br><b>เหมือนชีวิตไง</b>', `A porch table with a chess board. On the left, ${L} holds a knight piece in the air. On the right, ${R} draws an L shape in the air with one finger.`],
    ['แพ้ตาอีกแล้ว', 'แพ้ตา<br><b>ไม่ใช่แพ้ตัวเอง</b>', `A porch table with a chess board. On the left, ${L} leans back with hands on their head. On the right, ${R} laughs, resetting the chess pieces.`],
    ['ตาบอกว่า<br>เก่งขึ้นเยอะ', 'ตาไม่ได้รอดูเธอชนะ<br><b>ตารอเธอมานั่งเล่นด้วย</b>', `A porch. Two people, ${L} and ${R}, sitting side by side at a chess board, one holding a cup of tea, relaxed. Bright afternoon light.`],
    ['พรุ่งนี้<br>ไปหาตาอีกนะ', 'เอาขนม<br><b>ไปฝากด้วย</b>', `A country lane with trees. Two people walking side by side, ${L} carrying a folded chess board and ${R} carrying a small bag of snacks. Light airy daylight.`],
  ]},
  { slug: 'lost-wallet', title: 'กระเป๋าตังหาย', plot: 'กระเป๋าสตางค์หาย ตามหาทั้งวัน จนมีคนแปลกหน้าโทรมาคืน', slides: [
    ['กระเป๋าตัง<br>หายแล้ว!', 'ใจเย็น<br><b>ย้อนทางกันดู</b>', `A bright sidewalk. On the left, ${L} pats their empty pockets, panicked. On the right, ${R} puts both hands on their shoulders calmly.`],
    ['ร้านกาแฟ<br>ก็ไม่มี', 'ยังเหลือ<br><b>อีกหลายที่</b>', `In front of a small café. On the left, ${L} looks under a table outside the café. On the right, ${R} checks behind a flower pot.`],
    ['บัตรทุกใบ<br>อยู่ในนั้นเลย', 'ของหายหาใหม่ได้<br><b>เธออย่าหายก็พอ</b>', `A park bench. On the left, ${L} sits with their head in their hands. On the right, ${R} sits beside them, one arm around their back. Trees around.`],
    ['มีคนโทรมา<br>บอกว่าเก็บได้', 'โลกนี้<br><b>ยังใจดีอยู่นะ</b>', `A park. On the left, ${L} holds a phone to their ear, standing up in surprise. On the right, ${R} smiles with both hands open. Light airy daylight.`],
    ['วันหลัง<br>ฉันจะคืนแบบนี้บ้าง', 'ความดี<br><b>ส่งต่อกันไปเรื่อย ๆ</b>', `A sunny street. Two people walking side by side, ${L} holding a wallet up happily, ${R} beside them. Bright daylight.`],
  ]},
  { slug: 'old-radio', title: 'วิทยุของพ่อ', plot: 'เจอวิทยุเก่าของพ่อที่เสีย เพื่อนช่วยซ่อมจนเปิดเพลงที่พ่อชอบได้อีกครั้ง', slides: [
    ['วิทยุของพ่อ<br>เปิดไม่ติดแล้ว', 'เอามา<br><b>ลองซ่อมกัน</b>', `A bright room with a wooden table. On the left, ${L} holds an old radio with both hands. On the right, ${R} pulls out a small screwdriver set.`],
    ['ข้างในมีแต่<br>สายไฟเต็มไปหมด', 'ทีละเส้น<br><b>เดี๋ยวก็เจอ</b>', `A worktable. On the left, ${L} holds a flashlight over an opened old radio. On the right, ${R} looks inside with a screwdriver, focused.`],
    ['ซ่อมไม่ได้<br>ใช่ไหม...', 'ยังไม่ยอมแพ้<br><b>อีกรอบเดียว</b>', `A worktable with radio parts. On the left, ${L} sits back with shoulders dropped. On the right, ${R} leans in closer to the radio, determined.`],
    ['มีเสียง<br>แล้ว!', 'เพลงนี้<br><b>พ่อชอบใช่ไหม</b>', `A worktable. Two people, ${L} and ${R}, leaning close to an old radio, surprised joyful body language, small music notes drawn in the air.`],
    ['เหมือนพ่อ<br>นั่งฟังอยู่ด้วย', 'บางเสียง<br><b>พาคนกลับมาได้</b>', `A bright living room. Two people sitting side by side on a sofa, ${L} and ${R}, an old radio on a small table in front of them, listening quietly. Soft window light.`],
  ]},
  { slug: 'long-queue', title: 'ต่อคิวสองชั่วโมง', plot: 'ต่อคิวร้านดังสองชั่วโมง ของหมดก่อนถึงคิว แต่คุยกันจนลืมเวลา', slides: [
    ['คิวยาว<br>ขนาดนี้เลย', 'มาแล้ว<br><b>ก็ต่อเถอะ</b>', `A sidewalk in front of a small bakery shop with an awning. On the left, ${L} looks at a long line, hands on hips. On the right, ${R} points to the end of the line.`],
    ['ผ่านไป<br>ชั่วโมงนึงแล้ว', 'ก็ได้คุยกัน<br><b>ชั่วโมงนึงแล้ว</b>', `A sidewalk. Two people, ${L} and ${R}, standing in a line, chatting, the left person checking a wristwatch. Light airy daylight.`],
    ['ขาจะหัก<br>แล้วนะ', 'นั่งพักบน<br><b>ฟุตบาทก่อน</b>', `A sidewalk. On the left, ${L} sits on the curb stretching their legs. On the right, ${R} squats beside them sharing a bottle of water.`],
    ['ของหมด<br>พอดีเลย...', 'งั้นไปร้าน<br><b>ข้าง ๆ แทน</b>', `In front of the bakery. On the left, ${L} stares at a closed sign hanging on the door, shoulders dropped. On the right, ${R} laughs and points down the street.`],
    ['ไม่ได้กิน<br>แต่ก็สนุกนะ', 'บางวัน<br><b>สนุกที่ได้รอด้วยกัน</b>', `A simple street food stall table. Two people sitting side by side, ${L} and ${R}, eating noodles from bowls, relaxed. Bright daylight.`],
  ]},
  { slug: 'film-camera', title: 'กล้องฟิล์ม', plot: 'ถ่ายรูปด้วยกล้องฟิล์มทั้งม้วน ล้างออกมาเบลอเกือบหมด แต่ทุกรูปมีความทรงจำ', slides: [
    ['ได้กล้องฟิล์ม<br>มาจากพ่อ', 'ไปเดินถ่าย<br><b>กันไหม</b>', `A bright room. On the left, ${L} holds up an old film camera. On the right, ${R} picks up a small bag, ready to go.`],
    ['ถ่ายแล้ว<br>ดูไม่ได้เลย', 'ต้องรอ<br><b>ถึงจะรู้</b>', `A quiet old street with shophouses. On the left, ${L} looks through the camera viewfinder. On the right, ${R} poses awkwardly with one hand up.`],
    ['เหลือ<br>รูปสุดท้ายแล้ว', 'งั้นถ่ายเรา<br><b>สองคนเลย</b>', `A small park. Two people, ${L} and ${R}, standing side by side, the left person holding the film camera at arm's length toward them both.`],
    ['เบลอ<br>เกือบหมดเลย', 'แต่จำได้<br><b>ทุกรูปเลยนะ</b>', `A table with scattered printed photographs. On the left, ${L} holds up a blurry photo. On the right, ${R} holds another photo, laughing.`],
    ['รูปเราสองคน<br>ชัดอยู่รูปเดียว', 'รูปเดียว<br><b>ก็พอแล้ว</b>', `A wall with one small photograph pinned up. Two people, ${L} and ${R}, standing side by side looking at it, relaxed. Soft bright light.`],
  ]},
  { slug: 'yoga', title: 'หัดโยคะ', plot: 'หัดโยคะครั้งแรก ล้มทุกท่า แต่หัวเราะกันจนหายเครียด', slides: [
    ['เครียดมาก<br>อยากลองโยคะ', 'ไปด้วยกัน<br><b>ฉันก็ตัวแข็งเหมือนกัน</b>', `A bright empty studio with wooden floor. On the left, ${L} carries a rolled yoga mat. On the right, ${R} unrolls a yoga mat on the floor.`],
    ['ท่านี้<br>ทำยังไงนะ', 'ไม่รู้<br><b>ล้มไปพร้อมกันเลย</b>', `A yoga studio. Two people, ${L} and ${R}, both losing balance in a one-legged tree pose, arms waving. Light airy room.`],
    ['ก้มไม่ถึง<br>ปลายเท้าเลย', 'ถึงเข่า<br><b>ก็เก่งแล้ว</b>', `A yoga studio. On the left, ${L} sits on a mat reaching toward their toes, hands only at the knees. On the right, ${R} sits on another mat in the same pose.`],
    ['หายใจออกยาว ๆ<br>แบบนี้ใช่ไหม', 'ใช่<br><b>ปล่อยมันออกไป</b>', `A yoga studio. Two people, ${L} and ${R}, sitting cross-legged on mats side by side, eyes-free ball heads tilted up, hands resting on knees, calm.`],
    ['หายเครียด<br>เพราะหัวเราะมากกว่า', 'ก็ถือว่า<br><b>ได้ผลนะ</b>', `Two people lying on their backs on yoga mats, ${L} and ${R}, arms spread, relaxed. Bright window light.`],
  ]},
  { slug: 'flowers-for-me', title: 'ดอกไม้ให้ตัวเอง', plot: 'ไม่เคยซื้อดอกไม้ให้ตัวเอง เพื่อนพาไปตลาดดอกไม้ เลือกช่อเล็ก ๆ ให้ตัวเองครั้งแรก', slides: [
    ['ซื้อดอกไม้<br>ให้คนอื่นตลอด', 'วันนี้<br><b>ซื้อให้ตัวเองบ้าง</b>', `A bright flower market street with buckets of flowers. On the left, ${L} walks with hands in their hoodie pocket. On the right, ${R} gestures toward the flower stalls.`],
    ['ไม่รู้<br>ชอบดอกอะไร', 'แปลว่า<br><b>ถึงเวลาหาคำตอบแล้ว</b>', `A flower stall. On the left, ${L} looks at many buckets of flowers, puzzled. On the right, ${R} holds up one daisy.`],
    ['ดอกนี้<br>ดูธรรมดาไปไหม', 'ชอบก็พอ<br><b>ไม่ต้องอธิบาย</b>', `A flower stall. On the left, ${L} holds a small bunch of simple daisies close to the chest. On the right, ${R} nods, hands in coat pockets.`],
    ['รู้สึกแปลก ๆ<br>แต่ดีนะ', 'ใจดีกับตัวเอง<br><b>มันรู้สึกแบบนี้แหละ</b>', `A sunny street. Two people walking side by side, ${L} holding a small bouquet, ${R} beside them. Light airy daylight.`],
    ['ใส่แจกัน<br>ไว้ข้างหน้าต่าง', 'ทุกเช้า<br><b>จะได้ยิ้มให้ตัวเอง</b>', `A bright room with a window. On the left, ${L} places a small vase of daisies on the windowsill. On the right, ${R} watches, leaning on the wall.`],
  ]},
  { slug: 'garage-sale', title: 'ขายของมือสอง', plot: 'เคลียร์ห้องเอาของเก่ามาขาย ขายแทบไม่ได้ แต่เจอของความทรงจำเพียบ', slides: [
    ['ของเต็มห้อง<br>ไปหมดแล้ว', 'เอามาขาย<br><b>มือสองกัน</b>', `A bright room crowded with boxes. On the left, ${L} holds a big cardboard box. On the right, ${R} carries a folding table.`],
    ['ตั้งร้าน<br>เสร็จแล้ว!', 'ป้ายราคา<br><b>ฉันเขียนเอง</b>', `A sunny front yard with a folding table covered in old toys and books. On the left, ${L} arranges items on the table. On the right, ${R} sticks small blank price tags.`],
    ['ขายได้<br>สองชิ้นเอง', 'แต่เจอของเก่า<br><b>ตั้งหลายชิ้น</b>', `A front yard table with old things. On the left, ${L} sits on a stool, chin on hand. On the right, ${R} holds up an old teddy bear, laughing.`],
    ['อันนี้<br>ไม่ขายแล้ว', 'บางของ<br><b>ราคาเท่าความทรงจำ</b>', `A front yard. On the left, ${L} hugs an old teddy bear. On the right, ${R} smiles, holding an old photo album.`],
    ['ห้องโล่งขึ้น<br>ใจก็โล่งด้วย', 'เก็บไว้แต่<br><b>ของที่มีความหมาย</b>', `A tidy bright room with one shelf holding a teddy bear and a few books. Two people, ${L} and ${R}, sitting on the floor, relaxed. Soft window light.`],
  ]},
  { slug: 'rice-planting', title: 'ดำนาครั้งแรก', plot: 'กลับบ้านต่างจังหวัดไปช่วยดำนา เลอะโคลนทั้งตัว แต่เข้าใจว่าข้าวทุกเม็ดมีที่มา', slides: [
    ['กลับบ้านปีนี้<br>ช่วยดำนาด้วย', 'ฉันไม่เคย<br><b>แต่จะลองดู</b>', `A wide green rice field with a small wooden hut. On the left, ${L} rolls up their trouser legs. On the right, ${R} holds bundles of rice seedlings.`],
    ['ขาจม<br>โคลนเลย!', 'ดึงขาช้า ๆ<br><b>อย่าตกใจ</b>', `A muddy flooded rice paddy. On the left, ${L} stands in mud up to the shins, arms out for balance. On the right, ${R} stands nearby, laughing, holding seedlings.`],
    ['ปักยังไง<br>ให้ตรงแถว', 'ไม่ตรงก็ได้<br><b>ข้าวมันโตเอง</b>', `A rice paddy. Two people, ${L} and ${R}, bending over planting rice seedlings in rows. Light airy sky.`],
    ['ปวดหลัง<br>มากเลย', 'ทีนี้รู้แล้ว<br><b>ว่าข้าวมาจากไหน</b>', `The edge of a rice paddy. On the left, ${L} stretches their back with hands on hips. On the right, ${R} looks at the long rows of planted seedlings.`],
    ['กินข้าวทุกเม็ด<br>จากนี้ไป', 'ข้าวทุกเม็ด<br><b>มีคนเหนื่อยมาก่อน</b>', `A small wooden hut beside rice fields. Two people sitting side by side, ${L} and ${R}, eating rice from small bowls, muddy legs, relaxed. Bright daylight.`],
  ]},
  { slug: 'paint-room', title: 'ทาสีห้องใหม่', plot: 'ทาสีห้องใหม่ด้วยกัน สีเลอะทั้งตัว ห้องที่เคยเศร้ากลายเป็นห้องที่สดใส', slides: [
    ['ห้องนี้<br>ดูเศร้าจัง', 'งั้นทาสีใหม่<br><b>ให้สดใสเลย</b>', `An empty bright room with plain walls. On the left, ${L} stands looking at a blank wall. On the right, ${R} holds up a paint roller and a can of paint.`],
    ['สีหยด<br>ใส่หัวแล้ว', 'เป็นศิลปิน<br><b>เต็มตัวแล้วไง</b>', `A room with half-painted walls. On the left, ${L} on a small ladder holds a roller, with paint drops on their ball head. On the right, ${R} laughs, holding a brush.`],
    ['ทาเบี้ยว<br>ตรงมุมห้อง', 'มองจากไกล ๆ<br><b>ก็สวยนะ</b>', `A room. Two people, ${L} and ${R}, standing back side by side, looking at a painted wall, the right person framing it with both hands.`],
    ['วาดรูปเล็ก ๆ<br>ไว้มุมนี้ด้วย', 'วาดดอกไม้<br><b>ให้ห้องยิ้ม</b>', `A room. On the left, ${L} paints a small flower on a corner of the wall with a brush. On the right, ${R} holds the paint tray for them.`],
    ['ห้องใหม่<br>ใจก็ใหม่', 'บางทีแค่เปลี่ยนสี<br><b>ก็เริ่มใหม่ได้</b>', `A bright freshly painted room. Two people sitting on the floor against the wall, ${L} and ${R}, paint-splattered clothes, sharing drinks, relaxed. Window light.`],
  ]},
  { slug: 'mango-tree', title: 'ต้นมะม่วงหลังบ้าน', plot: 'มะม่วงหลังบ้านออกลูกเต็มต้น ช่วยกันสอยแล้วแจกเพื่อนบ้านทั้งซอย', slides: [
    ['มะม่วง<br>เต็มต้นเลย', 'เอาไม้สอย<br><b>มาเลย</b>', `A backyard with a big mango tree full of fruit. On the left, ${L} points up at the mangoes. On the right, ${R} carries a long bamboo picking pole.`],
    ['สอยไม่ถึง<br>อีกแล้ว', 'เขย่งอีกนิด<br><b>ฉันจับไม้ให้</b>', `Under a mango tree. On the left, ${L} on tiptoes reaches up with the long pole. On the right, ${R} holds the bottom of the pole steady.`],
    ['ตกใส่หัว<br>พอดีเลย!', 'หัวกลม ๆ<br><b>รับได้พอดี</b>', `Under a mango tree. On the left, ${L} rubs their round ball head, a mango on the ground beside them. On the right, ${R} doubles over laughing.`],
    ['เยอะขนาดนี้<br>กินไม่หมดแน่', 'งั้นแจก<br><b>ทั้งซอยเลย</b>', `A backyard. Two people, ${L} and ${R}, standing beside two baskets full of mangoes, looking at each other. Light airy daylight.`],
    ['ป้าข้างบ้าน<br>ให้ขนมกลับมา', 'แบ่งกันกิน<br><b>อร่อยกว่าเสมอ</b>', `A small lane with houses. Two people walking side by side, ${L} carrying a basket of mangoes and ${R} carrying a small plate of sweets. Bright daylight.`],
  ]},
  { slug: 'speak-english', title: 'ฝึกพูดอังกฤษ', plot: 'กลัวพูดภาษาอังกฤษผิด เพื่อนพาไปฝึกคุยจนกล้าบอกทางนักท่องเที่ยวได้', slides: [
    ['กลัวพูด<br>อังกฤษผิด', 'ผิดก็ได้<br><b>ขอแค่กล้าพูด</b>', `A café table with notebooks. On the left, ${L} hides behind an open notebook. On the right, ${R} sits across, holding a cup, encouraging.`],
    ['ฝึกกับฉัน<br>ก่อนนะ', 'ได้เลย<br><b>ฉันพูดผิดเหมือนกัน</b>', `A café table. On the left, ${L} reads from a small notebook, one hand raised as if speaking. On the right, ${R} listens with chin on hand.`],
    ['มีฝรั่ง<br>มาถามทาง!', 'ลองดูสิ<br><b>ฉันอยู่ข้าง ๆ</b>', `A bright street corner with a simple map signboard without text. On the left, ${L} stands frozen. On the right, ${R} gives a small push on their back. A small distant traveler with a backpack in the background.`],
    ['พูดได้แล้ว<br>เขาเข้าใจด้วย!', 'เห็นไหม<br><b>ไม่ต้องเป๊ะก็ได้</b>', `A street. On the left, ${L} jumps with joy. On the right, ${R} claps. Light airy daylight.`],
    ['พรุ่งนี้<br>ฝึกอีกนะ', 'ทีละคำ<br><b>ก็ไปถึงได้</b>', `A park bench. Two people sitting side by side, ${L} and ${R}, sharing one open notebook, relaxed. Soft bright light.`],
  ]},
  { slug: 'sandcastle', title: 'ปราสาททราย', plot: 'ก่อปราสาททรายอยู่ครึ่งวัน คลื่นซัดพังในพริบตา แต่ก็หัวเราะแล้วสร้างใหม่', slides: [
    ['สร้างปราสาท<br>ให้ใหญ่ที่สุดเลย', 'ฉันขุด<br><b>คูน้ำให้</b>', `A bright sandy beach. On the left, ${L} kneels piling sand with a small bucket. On the right, ${R} digs a little trench with a spade.`],
    ['มีหอคอย<br>ด้วยนะ', 'สวยกว่า<br><b>ปราสาทจริงอีก</b>', `A beach. Two people, ${L} and ${R}, kneeling on either side of a tall sandcastle with towers. Calm sea behind.`],
    ['คลื่นมา<br>แล้ว!', 'วิ่งไม่ทัน<br><b>แล้วล่ะ</b>', `A beach. A small foamy wave washing over a sandcastle. On the left, ${L} raises both hands in shock. On the right, ${R} stands with hands on head.`],
    ['พังหมด<br>เลย...', 'ก็สร้างใหม่<br><b>ทรายยังเหลือเยอะ</b>', `A beach with a melted lump of sand. On the left, ${L} sits on the sand, shoulders dropped. On the right, ${R} holds out a bucket toward them.`],
    ['ปราสาทใหม่<br>ไกลน้ำหน่อยนะ', 'พังแล้วเรียนรู้<br><b>ก็ไม่เสียเปล่า</b>', `A beach in soft bright light. Two people, ${L} and ${R}, building a new small sandcastle farther up the beach, laughing. Gentle waves behind.`],
  ]},
  { slug: 'first-glasses', title: 'แว่นอันแรก', plot: 'มองกระดานไม่ชัดมานาน เพื่อนพาไปตัดแว่น ใส่ครั้งแรกแล้วโลกชัดขึ้นทั้งใบ', slides: [
    ['ป้ายรถเมล์<br>อ่านไม่ออกเลย', 'ไปวัด<br><b>สายตากันไหม</b>', `A bus stop with a blank sign. On the left, ${L} squints toward the far sign, leaning forward. On the right, ${R} stands beside them, pointing at the sign.`],
    ['กลัวใส่แว่น<br>แล้วไม่สวย', 'ชัดก่อน<br><b>สวยตามมาเอง</b>', `A bright optical shop with shelves of glasses frames. On the left, ${L} hesitates at the door. On the right, ${R} holds the door open, inviting.`],
    ['อันไหน<br>เข้ากับฉัน', 'อันที่ใส่แล้ว<br><b>เธอยิ้ม</b>', `An optical shop counter with a small mirror. On the left, ${L} tries on a pair of round glasses on their ball head. On the right, ${R} holds up another frame, thinking.`],
    ['โลกมัน<br>ชัดขนาดนี้เลยเหรอ', 'ยินดีต้อนรับ<br><b>สู่โลกที่ชัด</b>', `A sunny street with trees. On the left, ${L} wearing glasses, looks up at the leaves, arms open in wonder. On the right, ${R} smiles, hands in coat pockets.`],
    ['เห็นใบไม้<br>ทีละใบเลย', 'มองให้ชัด<br><b>แล้วใช้ชีวิตให้เต็ม</b>', `A park bench under a tree. Two people sitting side by side, ${L} wearing glasses and ${R}, looking at the view, relaxed. Bright daylight.`],
  ]},
  { slug: 'songkran', title: 'สงกรานต์', plot: 'สงกรานต์ปีนี้ไม่อยากเปียก แต่สุดท้ายเปียกด้วยกัน และได้รดน้ำดำหัวผู้ใหญ่', slides: [
    ['ปีนี้<br>ไม่อยากเปียก', 'ไม่เปียก<br><b>ไม่ใช่สงกรานต์นะ</b>', `A bright Thai street lined with trees. On the left, ${L} holds their hands up defensively. On the right, ${R} holds a small water bowl, playful.`],
    ['เปียก<br>หมดแล้ว!', 'เย็นชื่นใจ<br><b>ใช่ไหมล่ะ</b>', `A sunny street. On the left, ${L} soaked, laughing, water dripping. On the right, ${R} holds an empty bowl. Water splashes in the air.`],
    ['เอาคืน<br>บ้าง!', 'ยอม ๆ<br><b>เปียกด้วยกัน</b>', `A sunny street. On the left, ${L} pours a bowl of water over the right person. On the right, ${R} laughs with arms raised.`],
    ['ไปรดน้ำ<br>ดำหัวยายกัน', 'ขอพร<br><b>ให้ยายแข็งแรง</b>', `A shaded house porch. Two people, ${L} and ${R}, kneeling side by side, each pouring water gently from a small bowl over cupped hands. Jasmine garlands on a tray.`],
    ['ปีหน้า<br>เล่นด้วยกันอีกนะ', 'ทุกปี<br><b>ตราบที่ยังมีกัน</b>', `A sunny street. Two people sitting on a curb side by side, ${L} and ${R}, soaked, sharing cold drinks, relaxed. Bright daylight.`],
  ]},
  { slug: 'do-nothing', title: 'วันที่ไม่ทำอะไร', plot: 'เหนื่อยจนหมดแรง เพื่อนชวนใช้วันหนึ่งไม่ทำอะไรเลย แล้วค้นพบว่าการพักก็สำคัญ', slides: [
    ['ไม่ไหวแล้ว<br>เหนื่อยมาก', 'วันนี้<br><b>ไม่ต้องทำอะไรเลย</b>', `A bright room with a desk covered in papers. On the left, ${L} slumps over the desk. On the right, ${R} gently closes a laptop.`],
    ['รู้สึกผิด<br>ที่อยู่เฉย ๆ', 'พักไม่ใช่ขี้เกียจ<br><b>พักคือการเติม</b>', `A sofa near a window. On the left, ${L} sits stiffly on the sofa holding a phone. On the right, ${R} takes the phone and puts it in a drawer.`],
    ['นอนดู<br>เพดานเฉย ๆ', 'เพดานวันนี้<br><b>สวยนะ</b>', `A floor with cushions. Two people, ${L} and ${R}, lying on their backs side by side on cushions, looking up at the ceiling. Soft window light.`],
    ['ได้ยิน<br>เสียงนกด้วย', 'ปกติมันร้องทุกวัน<br><b>แค่เราไม่ได้ฟัง</b>', `A window with a small bird on a branch outside. Two people sitting on the windowsill bench, ${L} and ${R}, looking out calmly. Light airy daylight.`],
    ['พรุ่งนี้<br>มีแรงแล้ว', 'เหนื่อยเมื่อไหร่<br><b>พักแบบนี้อีกนะ</b>', `A small balcony with plants in the morning. Two people, ${L} and ${R}, stretching their arms up side by side, fresh and relaxed. Bright light.`],
  ]},
  { slug: 'old-teacher', title: 'กลับไปหาครู', plot: 'สิบปีผ่านไป กลับไปหาครูที่โรงเรียนเก่า ครูยังจำได้และยังเชื่อในตัวเราเหมือนเดิม', slides: [
    ['ไปหาครู<br>กันไหม', 'สิบปีแล้วนะ<br><b>ครูจะจำได้เหรอ</b>', `In front of an old school gate with trees. On the left, ${L} holds a small gift box. On the right, ${R} looks at the school building, hands in pockets.`],
    ['ห้องเรียน<br>ยังเหมือนเดิมเลย', 'โต๊ะตัวนั้น<br><b>ที่เธอนั่งหลับ</b>', `An empty bright classroom with wooden desks and a blank chalkboard. On the left, ${L} touches an old desk. On the right, ${R} points at a desk in the back row, laughing.`],
    ['ครูเรียก<br>ชื่อเราถูกด้วย', 'ครูไม่เคยลืม<br><b>ลูกศิษย์หรอก</b>', `A school corridor. On the left, ${L} bows politely with hands together in a Thai wai. On the right, ${R} also bows. A small figure of an older person with a ball head and cardigan in the background doorway.`],
    ['ครูบอกว่า<br>รู้อยู่แล้วว่าเราทำได้', 'บางคนเชื่อในเรา<br><b>ก่อนเราเชื่อตัวเอง</b>', `A school bench under a big tree. Two people, ${L} and ${R}, sitting side by side, the left person holding a small note, touched body language.`],
    ['ปีหน้า<br>มาอีกนะ', 'มาทุกปี<br><b>จนกว่าครูจะเบื่อ</b>', `An old school gate in bright afternoon light. Two people walking out side by side, ${L} and ${R}, looking back and waving. Trees around.`],
  ]},
  { slug: 'new-neighbor', title: 'เพื่อนบ้านใหม่', plot: 'ย้ายมาอยู่ที่ใหม่ไม่รู้จักใคร เพื่อนบ้านห้องข้าง ๆ เคาะประตูมาพร้อมขนม', slides: [
    ['ย้ายมาใหม่<br>ไม่รู้จักใครเลย', 'สวัสดี<br><b>ฉันอยู่ห้องข้าง ๆ</b>', `A bright apartment hallway with doors. On the left, ${L} stands in an open doorway with moving boxes behind. On the right, ${R} stands outside holding a small plate of cookies.`],
    ['ขนม<br>ให้ฉันเหรอ', 'ต้อนรับ<br><b>เพื่อนบ้านใหม่</b>', `An apartment doorway. On the left, ${L} takes the plate of cookies with both hands. On the right, ${R} smiles, one hand behind their head shyly.`],
    ['ช่วยยกตู้<br>หน่อยได้ไหม', 'มาเลย<br><b>นับหนึ่งสองสาม</b>', `A small apartment room with boxes. Two people, ${L} and ${R}, lifting a small wooden cabinet together from both ends.`],
    ['แถวนี้<br>มีร้านอร่อยไหม', 'เดี๋ยวพาไป<br><b>ร้านลับของฉัน</b>', `A quiet bright street with small shops. On the left, ${L} looks around curiously. On the right, ${R} leads the way, pointing ahead.`],
    ['ที่นี่<br>เริ่มเหมือนบ้านแล้ว', 'บ้านไม่ใช่ที่<br><b>แต่เป็นคนรอบตัว</b>', `A small balcony between two apartments. Two people, ${L} and ${R}, leaning on the railing side by side, holding cups, chatting. Bright afternoon light.`],
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
    const dir = `${ROOT}/2026-11-23_${i + 61}-${s.slug}`;
    for (const d of ['raw', 'slides', 'export']) fs.mkdirSync(`${dir}/${d}`, { recursive: true });
    fs.copyFileSync(CSS, `${dir}/dialogue.css`);
    s.slides.forEach((sl, j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, html(j + 1, s.title, sl)));
    if (fs.existsSync(`${dir}/kit.md`) && !process.argv.includes('--force')) return;  // keep picks logged in kit.md
    fs.writeFileSync(`${dir}/prompts.txt`, s.slides.map((sl, j) => `0${j + 1}\t${sl[2]} ${STY}`).join('\n') + '\n');
    fs.writeFileSync(`${dir}/kit.md`, `# ${s.title} — carousel เรื่องราว 5 สไลด์ (2026-11-23)

- ชุดที่ ${i + 61}/80 จาก \`carousel/stories/2026-11-23b.mjs\` (แก้ข้อความ/prompt ที่นั่นแล้วรันใหม่)
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
