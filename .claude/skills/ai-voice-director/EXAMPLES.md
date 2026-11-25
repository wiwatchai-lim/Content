# Voice direction examples

207 directed lines (147 Thai / Thai-English, 60 English) for the characters in `CHARACTER_VOICE_BIBLE.md`. Emotion ids come from `EMOTION_LIBRARY.json`. Use them as patterns: copy the *kind* of direction, not the words.

## How to read a block

```
**E###** [character · language · emotion-id (+ secondary) · intensity 0-1]
> the line as written (subtitle text)
Spoken: normalised text for the TTS, only when it differs (numbers, dates, symbols, brand words)
Direction: what the actor DOES to the listener and why (action + intent), never just an emotion name
Prosody: pitch level / range, rate, energy, voice quality, ending; then where to pause and what to stress
Gemini style: short phrase for "Say this like <style>: <text>"
```

Notes that apply to every block:
- Prosody is **relative to the character's baseline**: "higher" for Jan is still an old woman's voice; "fast" for Jan is still slower than Mint.
- Thai: pitch, range and emphasis move *around* the lexical tones, never through them. Stress a word by length, loudness or a pause before it, not by bending its tone.
- Final particles (ครับ ค่ะ คะ นะ จ้ะ เนอะ ล่ะ) carry the attitude through their length and ending, but they are not stressed words. ไหม is read มั้ย and เขา เค้า in casual speech unless the line is formal.
- These are craft notes (practitioner advice, `Artistic`), not measured findings. The acoustic tendencies they lean on (high arousal → higher, wider, faster, louder; low arousal → lower, narrower, slower, softer; voice quality carrying attitude) are tendencies from mostly acted, mostly Western speech (BanseScherer1996, JuslinLaukka2003, GoblNiChasaide2003). Each line has more than one valid performance: these are one good choice, not the only one.


## (a) Everyday & shop dialogue

Counter talk, eye tests, friends chatting. Small stakes, so the performance lives in politeness level, particles and tiny pitch moves, not big emotion.

**E001** [ton · th · social.deference_krengjai · 0.4]
> สวัสดีครับ เชิญด้านในก่อนเลยครับ ข้างนอกร้อน

Direction: Hold the door for a customer you don't know yet and pull them in out of the heat; be a host, not a salesman.  
Prosody: baseline pitch, a little lift on เชิญ, conversational rate, soft-medium energy, smiling voice, soft fall on ครับ; micro pause after สวัสดีครับ.  
Gemini style: a polite young Thai optician warmly welcoming a customer in out of the heat

**E002** [ton · th · cognitive.interest · 0.5]
> ปกติใส่แว่นตอนไหนบ้างครับ อ่านหนังสือหรือขับรถ

Direction: Ask so the customer feels you really want the answer, not that you are filling in a form; lean in.  
Prosody: baseline, moderate range, conversational, medium energy, modal; light lift on ตอนไหน, rise at the end of ขับรถ; micro pause after บ้างครับ.  
Gemini style: an attentive optician asking a friendly, genuinely curious question

**E003** [ton · th · care.reassurance · 0.5]
> ไม่ต้องเกร็งนะครับ แค่มองตัวเลขแล้วอ่านให้ฟังเฉยๆ

Direction: The customer is tense in the test chair; make the task sound as easy as reading a menu.  
Prosody: slightly lower pitch, narrow range, slightly slow, soft energy, smiling, soft fall; breath pause after นะครับ, light weight on เฉยๆ.  
Gemini style: a gentle optician calmly putting a nervous customer at ease

**E004** [ton · th · cognitive.hesitation (+fear.nervousness) · 0.4]
> เอ่อ... เลนส์คู่นี้อาจจะต้องรอสักห้าวันนะครับ

Direction: The customer wanted the glasses today; break the news while bracing for them to walk out.  
Prosody: slightly lower, narrow, slightly slow, low energy, a little breathy, level ending on นะครับ; 400 ms hesitation after เอ่อ, weight on ห้าวัน.  
Gemini style: a timid young optician hesitantly breaking mildly bad news

**E005** [ton · th · joy.happiness · 0.6]
> ใส่แล้วหน้าดูสดใสขึ้นเยอะเลยครับ ลองส่องกระจกดูสิครับ

Direction: You honestly think this frame suits them; turn them toward the mirror so they see it too.  
Prosody: slightly higher, wide range on เยอะเลย, slightly fast, medium-high energy, smiling, rising ending; stress เยอะ.  
Gemini style: a happy optician sincerely complimenting a customer

**E006** [mint · th · surprise.pleasant · 0.6]
> อุ๊ย กรอบนี้น่ารักมากเลยค่ะ มีสีอื่นไหมคะ

Direction: You spot a frame you love on the shelf; half talking to yourself, half to the staff.  
Prosody: jump up on อุ๊ย, wide range, fast, high energy, smiling, rise on คะ; ไหม read as มั้ย; pause after อุ๊ย.  
Gemini style: a bright young woman delighted at finding a cute frame

**E007** [customer · th · anger.irritation · 0.5]
> ผมรอมาครึ่งชั่วโมงแล้วนะครับ ยังไม่เสร็จอีกเหรอ

Direction: Complain politely but let them hear your patience is almost gone; you still want the service.  
Prosody: slightly higher, narrow range, clipped rhythm, medium energy, tense, level-to-fall on เหรอ; stress ครึ่งชั่วโมง.  
Gemini style: an irritated customer complaining politely but firmly

**E008** [ton · th · regret.remorse_apology · 0.6]
> ขอโทษจริงๆ ครับ เดี๋ยวผมรีบทำให้เลย ไม่เกินสิบนาทีครับ

Direction: Own the delay first, then give a concrete promise so he can stop being angry.  
Prosody: slightly lower, narrow, slow on ขอโทษจริงๆ then baseline, soft-medium energy, soft fall; pause after the apology, stress สิบนาที.  
Gemini style: a sincere young man apologising and promising a quick fix

**E009** [chan · th · stance.skepticism · 0.4]
> แว่นอะไรวะ ตั้งสามพัน ใส่แล้วเห็นชัดกว่าเดิมจริงเหรอ

Direction: Needle the young optician you are fond of; you'll buy it anyway but want him to earn it.  
Prosody: lower, chest, narrow range, slow drawl, medium energy, level ending; lengthen ตั้ง, pause after สามพัน.  
Gemini style: a gruff old Thai uncle grumbling sceptically about a price

**E010** [chan · th · love.affection · 0.4]
> กินข้าวหรือยังไอ้หนู ทำงานทั้งวันเดี๋ยวก็เป็นลมหรอก

Direction: Show you care by scolding; it must never sound soft, the warmth leaks through only on กินข้าว.  
Prosody: low chest voice, narrow range, baseline rate, medium energy, gruff modal, fall; a touch softer on กินข้าวหรือยัง.  
Gemini style: a gruff but warm old uncle scolding a young man to eat

**E011** [jan · th · love.tenderness · 0.6]
> ทำงานดึกอีกแล้วนะลูก พักสายตาบ้างนะจ้ะ

Direction: Stroke his head with your voice; you worry, but you would never nag.  
Prosody: slightly lower, narrow, slow, soft, breathy, soft fall on จ้ะ; long pause after อีกแล้วนะลูก.  
Gemini style: a gentle elderly grandmother softly worrying about her grandson, slow and breathy

**E012** [tao · th · stance.dry_irony · 0.4]
> เอาแว่นกันแดดไปใส่ดูหนังในโรงเหรอ ไอเดียดีนะ

Direction: Point out the silly idea without laughing; let the deadpan do the work.  
Prosody: slightly lower, narrow, slow, low energy, flat modal, level ending; slight lengthening of ดี, pause before ไอเดีย.  
Gemini style: a calm man making a deadpan, dry remark

**E013** [mint · th · stance.playful_teasing · 0.5]
> เต๋าใส่แว่นแล้วดูฉลาดขึ้นนิดนึงนะ นิดเดียวนะ

Direction: Tease your friend; the second half is the punchline, land it with a grin.  
Prosody: higher, wide range, fast then slowing on นิดเดียวนะ, medium-high energy, smiling, rise; comic pause before นิดเดียว.  
Gemini style: a bright young woman playfully teasing her friend

**E014** [tao · th · calm.serenity · 0.3]
> ไม่ต้องรีบหรอก ร้านปิดสามทุ่ม ยังมีเวลาอีกเยอะ

Direction: Slow your friend down by being slow yourself.  
Prosody: lower, narrow, slow, low energy, relaxed modal, soft fall; breath pause after หรอก.  
Gemini style: a calm, unhurried man reassuring a friend

**E015** [customer · th · fear.worry · 0.5]
> ลูกชายบ่นว่ามองกระดานไม่ชัด จะสั้นเยอะไหมคะหมอ

Direction: A mother asking about her son; you want the truth but hope it is small.  
Prosody: slightly higher, narrow, slightly slow, medium-low energy, slight breathiness, rise on หมอ; ไหม read as มั้ย.  
Gemini style: a worried mother asking about her child's eyesight

**E016** [ton · th · performance.trusted_expert · 0.5]
> ค่าสายตาเพิ่มขึ้นห้าสิบครับ ถือว่าน้อย ไม่ต้องกังวลครับ

Direction: Give the number plainly, then interpret it so the mother can breathe out.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear articulation, firm soft fall; pause after ห้าสิบครับ, stress น้อย.  
Gemini style: a calm, knowledgeable optician explaining a result clearly

**E017** [ton · th · care.encouragement · 0.5]
> เก่งมากเลยครับน้อง อ่านถึงแถวสุดท้ายแล้ว

Direction: Praise the child as if he just scored a goal.  
Prosody: higher, wide, slightly fast, high energy, smiling, rise; stress เก่ง.  
Gemini style: a kind optician cheerfully praising a child

**E018** [mint · th · anger.impatience · 0.5]
> เร็วๆ หน่อยสิเต๋า หนังจะเริ่มแล้วนะ

Direction: Hurry him out of the door; annoyed but still affectionate.  
Prosody: slightly higher, medium range, fast, clipped, medium-high energy, a little tense, fall on นะ.  
Gemini style: an impatient young woman hurrying her friend

**E019** [tao · th · low.fatigue · 0.5]
> วันนี้ประชุมเจ็ดรอบ ตาจะปิดอยู่แล้ว

Direction: Report your day flatly; you are too tired to dramatise it.  
Prosody: lower, very narrow, slow, low energy, creaky at phrase end, trail off.  
Gemini style: an exhausted man describing his long day in a flat voice

**E020** [customer · th · social.krengjai_refusal · 0.5]
> ขอคิดดูก่อนนะคะ เดี๋ยวกลับมาใหม่ค่ะ

Direction: Say no to the sale without saying no; keep smiling so nobody loses face.  
Prosody: baseline to slightly higher, narrow, slightly slow, soft, smiling, soft fall; pause after ก่อนนะคะ.  
Gemini style: a polite customer gently declining with a smile

**E021** [ton · th · social.gratitude · 0.5]
> ขอบคุณที่แวะมานะครับ ใส่แล้วมีปัญหาอะไรทักมาได้ตลอดเลยครับ

Direction: See the customer off and leave the door open; you mean the offer.  
Prosody: baseline, moderate range, conversational, medium energy, smiling, soft fall; stress ตลอด.  
Gemini style: a grateful young optician warmly seeing a customer off

**E022** [chan · th · anger.frustration · 0.5]
> หาแว่นอ่านหนังสือไม่เจออีกแล้ว วางไว้ตรงนี้แท้ๆ

Direction: Mutter to yourself while turning the room upside down.  
Prosody: low, medium range, uneven rhythm, medium energy, slightly harsh, cut-off ending; stress แท้ๆ.  
Gemini style: a grumpy old man muttering while he searches for his glasses

**E023** [tao · th · cognitive.confusion · 0.4]
> เดี๋ยวนะ ตกลงเราจะไปกินข้าวหรือไปซื้อแว่น

Direction: Untangle a plan Mint has changed three times; you are not annoyed, just lost.  
Prosody: slightly higher, medium range, slow, low-medium energy, modal, rise on แว่น; pause after เดี๋ยวนะ.  
Gemini style: a calm, puzzled man trying to pin down the plan

**E024** [mint · th · selfconscious.embarrassment · 0.5]
> ตายแล้ว ทักผิดคน นึกว่าพี่ที่ร้าน ขอโทษค่ะ

Direction: You waved at a stranger; laugh at yourself and apologise fast.  
Prosody: higher, wide, fast, medium energy, smiling-breathy, soft laugh before ขอโทษค่ะ, fall at the end.  
Gemini style: an embarrassed young woman laughing at her own mistake

**E025** [jan · th · nostalgia.nostalgia · 0.5]
> สมัยยายยังสาวๆ แว่นกรอบทองแบบนี้ฮิตมากเลยนะ

Direction: Hold the old gold frame and see yourself at twenty for a moment.  
Prosody: lower, narrow-medium, slow, soft, warm breathy, soft fall; pause after สาวๆ.  
Gemini style: an old grandmother fondly remembering her youth

**E026** [customer · th-en · cognitive.curiosity · 0.4]
> เลนส์ blue light กับเลนส์ธรรมดา ต่างกันยังไงครับ

Direction: You saw an ad and want it explained, not sold; ask a real question.  
Prosody: baseline, medium range, baseline rate, medium energy, modal, rise; "blue light" said the Thai way (บลูไลท์), no English accent shift.  
Gemini style: a curious customer asking a genuine question

**E027** [ton · th-en · performance.trusted_expert · 0.4]
> Blue light ช่วยกรองแสงจากจอครับ ถ้าใช้คอมทั้งวันจะสบายตากว่า

Direction: Explain simply, like a friend who happens to know; no hard sell.  
Prosody: baseline, moderate range, conversational, medium energy, clear, soft fall; stress สบายตา.  
Gemini style: a friendly optician explaining a lens simply and honestly

**E028** [ton · th · fear.nervousness · 0.5]
> ลุงครับ... ผมทำแว่นลูกค้าหล่นครับ แต่เลนส์ไม่เป็นไรนะครับ

Direction: Confess quickly and get the good news in before he explodes.  
Prosody: slightly higher, narrow, fast on the second half, medium-low energy, slight tremor, rise on นะครับ; pause after ลุงครับ.  
Gemini style: a nervous young man confessing a small accident to his boss

**E029** [mint · th · social.gratitude · 0.5]
> ขอบใจนะเต๋า ถ้าไม่มีนายคงหลงทางไปแล้ว

Direction: Thank him lightly so it doesn't get awkward, but mean it.  
Prosody: baseline, medium range, conversational, medium energy, smiling, soft fall; stress นาย.  
Gemini style: a young woman lightly but sincerely thanking a friend

**E030** [customer · en · cognitive.hesitation · 0.3]
> Hi, I think my glasses are a little crooked. Could you take a look?

Direction: You feel silly bothering them with something small; ask anyway.  
Prosody: baseline, moderate range, slightly slow, soft-medium energy, modal, rise on "look"; small pause after "Hi".  
Gemini style: a slightly unsure customer politely asking for help

**E031** [ton · en · care.reassurance · 0.4]
> Of course. Have a seat, this will only take a minute.

Direction: Make it clear it's no trouble at all; you're glad they came in.  
Prosody: baseline, moderate range, conversational, medium-soft energy, smiling, soft fall; stress "minute".  
Gemini style: a friendly optician reassuring a customer it is no trouble

**E032** [customer · en · surprise.pleasant · 0.7]
> Wait, these are mine? They look brand new!

Direction: You can't believe the old pair came back this clean; show the staff they made your day.  
Prosody: higher, wide range, fast, high energy, smiling, rise on "mine", fall on "new"; pause after "Wait".  
Gemini style: a customer pleasantly amazed that her old glasses look new

**E033** [tao · en · stance.sarcasm · 0.5]
> Sure, I'd love to wait another hour. Best part of my day.

Direction: Make your point without raising your voice; the flatness is the joke.  
Prosody: lower, narrow range, slow, low energy, flat, level ending; lengthen "love", pause before "Best".  
Gemini style: a calm man being quietly sarcastic

**E034** [mint · en · stance.defensiveness (+joy.amusement) · 0.3]
> Okay, okay, you were right about the frame. Happy now?

Direction: Concede while pretending you haven't; you're smiling despite yourself.  
Prosody: slightly higher, medium range, fast, medium energy, smiling, rise on "now"; quick double "okay".  
Gemini style: a young woman admitting she was wrong, half annoyed and half amused

**E035** [customer · en · selfconscious.embarrassment · 0.5]
> I'm sorry, I really can't afford that today.

Direction: Admit it quietly so the people nearby don't hear.  
Prosody: slightly lower, narrow, slow, soft, slightly breathy, soft fall; pause after "sorry".  
Gemini style: an embarrassed customer quietly admitting she can't afford it

**E036** [ton · en · care.reassurance · 0.5]
> No problem at all. We have good options at a lower price.

Direction: Take the embarrassment off her immediately; sound like this happens every day.  
Prosody: baseline, moderate range, conversational, medium energy, warm smiling, soft fall; stress "good".  
Gemini style: a kind optician smoothly reassuring an embarrassed customer

**E037** [tao · en · stance.dry_irony · 0.4]
> Mint. Your glasses. On your head.

Direction: She's tearing the room apart looking for them; deliver it in three flat steps.  
Prosody: lower, very narrow, slow, low energy, flat, fall; 300 ms pause after each phrase.  
Gemini style: a deadpan man pointing out the obvious

**E038** [customer · en · cognitive.confusion · 0.4]
> Excuse me, is anyone here? Hello?

Direction: Call into an empty shop; unsure whether you should just leave.  
Prosody: slightly higher, medium range, slow, medium energy, projected, rise on both questions; pause before "Hello?".  
Gemini style: a puzzled customer calling into an empty shop

**E039** [chan · en · care.reassurance · 0.4]
> Glasses fix, ten minute. You sit, okay?

Direction: Help a tourist with the little English you have; your warmth does the translating.  
Prosody: lower, medium range, slow, medium energy, chest, rise on "okay"; Thai-accented, deliberate words, pause after "ten minute".  
Gemini style: an old Thai shopkeeper helping a tourist in simple, warm broken English

**E040** [customer · en · social.gratitude · 0.7]
> That's so kind of you. Thank you so much!

Direction: The old man fixed it for free; let him hear how much it means.  
Prosody: higher, wide, slightly fast, high energy, smiling, fall; stress "so" both times.  
Gemini style: a tourist warmly and gratefully thanking a shopkeeper

**E041** [mint · en · joy.amusement · 0.5]
> I can't see a thing without them. I'm basically a mole.

Direction: Laugh at yourself before anyone else can.  
Prosody: slightly higher, wide, fast, medium-high energy, smiling, fall; comic pause before "a mole".  
Gemini style: a bright young woman joking about her bad eyesight

**E042** [ton · en · regret.remorse_apology · 0.6]
> I'm really sorry, that was my mistake. I'll remake them for free.

Direction: Take the blame cleanly, no excuses, then fix it.  
Prosody: slightly lower, narrow, slow first half, medium energy, sincere modal, soft fall; stress "my".  
Gemini style: a sincere young optician owning his mistake

**E043** [customer · en · joy.contentment · 0.6]
> Honestly? These are the most comfortable glasses I've ever worn.

Direction: Tell them like a small confession of happiness, not a review.  
Prosody: baseline, medium range, slow, medium energy, warm, soft fall; pause after "Honestly?".  
Gemini style: a content customer quietly delighted with his new glasses

**E044** [tao · en · calm.acceptance (+joy.amusement) · 0.4]
> Fine. Pink frames. Whatever makes you happy.

Direction: Give in to Mint with a hidden smile; you lost and don't mind.  
Prosody: lower, narrow, slow, low energy, modal with a smile on "happy", soft fall; pauses after "Fine" and "Pink frames".  
Gemini style: a calm man good-naturedly giving in


## (b) Story / cartoon drama

ร้านแว่นตีสอง (Ton, Jan, Chan) and Mint & Tao. Higher stakes; keep every character's baseline (Jan slow and soft, Chan gruff, Tao flat) while the emotion moves on top of it.

**E045** [ton · th · fear.fear · 0.7]
> ใ...ใครอยู่ตรงนั้นครับ ร้านปิดแล้วนะครับ

Direction: Call into the dark shop at 2 a.m., trying to sound like the owner and failing.  
Prosody: higher, narrow, halting, medium-low energy, trembling, rise; stutter on ใ...ใคร, 300 ms pause after ตรงนั้นครับ.  
Gemini style: a frightened young man calling into a dark shop at night

**E046** [jan · th · performance.eerie_calm (+love.tenderness) · 0.5]
> ไม่ต้องกลัวนะลูก ยายแค่มาหาแว่นอ่านหนังสือ

Direction: You have been dead a long time and see nothing scary about it; calm the boy as you would a grandson.  
Prosody: lower, very narrow, very slow, soft, breathy, soft fall; long pause after นะลูก.  
Gemini style: a gentle ghost grandmother speaking calmly and slowly, almost a whisper

**E047** [ton · th · transition.fear_to_relief · 0.6]
> ยายเป็น... ผีเหรอครับ แต่ใจดีใช่ไหมครับ

Direction: Ask the terrifying question, then grab at the hope she is kind; the turn is on แต่.  
Prosody: first half higher, trembling, halting; after แต่ lower, softer, a small breath of a laugh, rise on ใช่ไหม (มั้ย); pause after ยายเป็น.  
Gemini style: a scared young man whose fear melts into relief mid-sentence

**E048** [jan · th · joy.amusement · 0.4]
> ฮึๆ ผีก็สายตายาวได้นะลูก

Direction: Chuckle at his shock; you find a long-sighted ghost funny too.  
Prosody: lower, medium range, slow, soft, smiling breathy, soft laugh at the start, soft fall.  
Gemini style: a sweet ghost grandmother chuckling softly

**E049** [chan · th · anger.hot · 0.7]
> ใครเอาแว่นของข้าไปวะ! บอกมาเดี๋ยวนี้!

Direction: You are sure someone took them; blast the whole shop with it.  
Prosody: higher, wide, fast, very high energy, shout, harsh, cut-off ending; stress เดี๋ยวนี้.  
Gemini style: an old man shouting angrily about his missing glasses

**E050** [ton · th · stance.defensiveness · 0.5]
> ไม่ใช่ผมนะลุง ผมยังไม่ได้แตะเลยครับ

Direction: Defend yourself without sounding rude to an elder.  
Prosody: slightly higher, medium range, fast, medium energy, a little tense, level ending; stress แตะ.  
Gemini style: a young man nervously defending himself to an elder

**E051** [chan · th · hidden.bravado_over_fear · 0.6]
> ผีเผออะไร ไม่มีหรอก ลุงไม่กลัวหรอกเว้ย

Direction: Laugh off the ghost talk loudly so you can't hear your own heart.  
Prosody: louder than needed, slightly higher, wide but shaky, fast, high energy, tense, fall; a crack on กลัว.  
Gemini style: an old man loudly pretending he isn't scared

**E052** [jan · th · sadness.loneliness · 0.5]
> ร้านนี้เงียบมานานแล้วนะ ไม่มีใครคุยกับยายเลย

Direction: Tell him plainly, without self-pity; you are just stating how it has been.  
Prosody: lower, narrow, slow, low energy, breathy, trail off; pause after นะ.  
Gemini style: a lonely old ghost speaking quietly about years of silence

**E053** [ton · th · care.empathy · 0.5]
> งั้นต่อไปผมคุยกับยายทุกคืนเลยนะครับ

Direction: Offer it shyly but firmly; you want her to know you mean every night.  
Prosody: baseline, medium range, slightly slow, medium-soft energy, warm, soft fall; stress ทุกคืน.  
Gemini style: a kind young man shyly promising to keep an old woman company

**E054** [jan · th · suppressed.holding_back_tears · 0.6]
> ขอบใจนะลูก... ยายไม่ได้ยินใครพูดแบบนี้มานานแล้ว

Direction: Thank him and keep your voice steady; the tears are there but you won't let him see.  
Prosody: lower, narrow, slow, soft, slight tremor on นานแล้ว, trail off; long pause after นะลูก, a swallow before ยาย.  
Gemini style: an old grandmother thanking someone while holding back tears

**E055** [chan · th · sadness.grief · 0.7]
> แว่นอันนี้ของเมียลุง... เขาใส่จนวันสุดท้าย

Direction: Say it aloud for the first time; you are holding her glasses, not performing.  
Prosody: lower, very narrow, very slow, low energy, creaky-breathy, trail off; long pause after เมียลุง; เขา read เค้า.  
Gemini style: an old man quietly grieving his late wife, slow and low

**E056** [ton · th · care.compassion_consoling · 0.6]
> ลุงครับ เดี๋ยวผมเปลี่ยนขาให้ใหม่ เก็บไว้ได้อีกนานเลยครับ

Direction: Comfort him by doing something useful; don't mention the wife.  
Prosody: slightly lower, narrow, slow, soft, warm, soft fall; pause after ลุงครับ.  
Gemini style: a gentle young man quietly consoling an old man

**E057** [mint · th · anger.indignation · 0.6]
> เขาพูดแบบนั้นได้ยังไง ไม่ยุติธรรมเลยนะ

Direction: Protest on your friend's behalf; you are angry because it is wrong, not because it is you.  
Prosody: higher, wide, fast, high energy, tense, fall; stress ยุติธรรม; เขา read เค้า.  
Gemini style: a young woman indignant about an injustice

**E058** [tao · th · care.compassion_consoling · 0.4]
> โกรธได้นะ แต่อย่าเพิ่งตอบตอนนี้ รอให้ใจเย็นก่อน

Direction: Slow her down without telling her she is wrong to be angry.  
Prosody: lower, narrow, slow, low-medium energy, modal, soft fall; pause after โกรธได้นะ.  
Gemini style: a calm man gently talking a friend down

**E059** [mint · th · sadness.disappointment · 0.5]
> นึกว่าวันนี้นายจะจำได้ซะอีก

Direction: It's your birthday; don't accuse him, let the small drop in your voice say it.  
Prosody: slightly lower, narrow, slow, low energy, soft, trail off; slight lengthening of จำได้.  
Gemini style: a young woman quietly disappointed her friend forgot

**E060** [tao · th · selfconscious.guilt · 0.5]
> ...ขอโทษนะ ฉันลืมจริงๆ

Direction: No jokes this time; own it.  
Prosody: lower, narrow, slow, low energy, soft, soft fall; breath before ขอโทษ, stress จริงๆ.  
Gemini style: a man quietly and guiltily apologising

**E061** [mint · th · joy.elation · 0.8]
> สอบผ่านแล้ว! เต๋า ฉันสอบผ่านแล้ว!

Direction: Burst through the door with the news; you need him to share it right now.  
Prosody: much higher, very wide, fast, very high energy, smiling, projected, fall-rise; louder on the second ผ่านแล้ว.  
Gemini style: a young woman bursting with joy at passing her exam

**E062** [tao · th · awe.admiration · 0.4]
> เก่งว่ะ บอกแล้วว่าทำได้

Direction: You are proud of her but won't gush; two words and a small smile.  
Prosody: baseline, narrow, slow, medium energy, warm smiling, soft fall; stress เก่ง.  
Gemini style: a dry-humoured man quietly proud of his friend

**E063** [ton · th · fear.panic · 0.9]
> ไฟดับ! ยายครับ ยายอยู่ไหน ยายครับ!

Direction: Total dark; find her before anything else finds you.  
Prosody: much higher, wide, very fast, very high energy, breathy-tense, projected, rise; gasp before ไฟดับ, short gasps between phrases.  
Gemini style: a panicking young man calling out in a blackout

**E064** [jan · th · care.reassurance · 0.5]
> ยายอยู่นี่จ้ะ จับมือยายไว้ ค่อยๆ หายใจนะลูก

Direction: Be the steady point in the dark; slow him with your own breathing.  
Prosody: lower, narrow, slow, soft, breathy, soft fall; pauses after อยู่นี่จ้ะ and ยายไว้.  
Gemini style: a calm grandmother steadying a frightened boy in the dark

**E065** [chan · th · will.determination · 0.6]
> ร้านนี้ลุงไม่ขายให้ใครทั้งนั้น อยู่มาสี่สิบปี จะอยู่ต่อ

Direction: Make it final; you've decided and nobody will move you.  
Prosody: lower, narrow, slow, medium-high energy, chest, firm fall; stress ทั้งนั้น and จะอยู่ต่อ, pause after สี่สิบปี.  
Gemini style: a stubborn old man firmly refusing to sell his shop

**E066** [customer · th · fear.quiet_menace · 0.6]
> ร้านเล็กๆ แบบนี้ ไฟไหม้ทีเดียวก็หมดนะลุง

Direction: A land developer; smile while you say it, the threat is in how relaxed you are.  
Prosody: slightly lower, narrow, slow, low energy, smooth smiling, level ending; pause after แบบนี้, softer on หมด.  
Gemini style: a smooth-talking man making a quiet, smiling threat

**E067** [ton · th · will.confidence · 0.5]
> ผมจะช่วยลุงเอง ไม่ต้องห่วงครับ

Direction: For once, no hedging; say it like a man.  
Prosody: baseline to slightly lower, moderate range, baseline rate, medium-high energy, chest, firm fall; stress เอง.  
Gemini style: a timid young man finding his confidence

**E068** [jan · th · sadness.melancholy · 0.5]
> คืนนี้พระจันทร์สวยเหมือนคืนที่ตายายเจอกันเลย

Direction: Look out of the window and drift back; you are talking to the moon as much as to Ton.  
Prosody: lower, narrow, slow, soft, breathy, soft fall; pause after สวย.  
Gemini style: an old ghost grandmother wistfully remembering the night she met her husband

**E069** [ton · th · cognitive.curiosity · 0.5]
> แล้วตาเขาไปอยู่ไหนครับยาย

Direction: Ask gently; you want to know but are afraid of the answer.  
Prosody: baseline, medium range, slightly slow, soft-medium energy, modal, rise on ยาย; เขา read เค้า.  
Gemini style: a young man gently asking a delicate question

**E070** [jan · th · calm.acceptance · 0.5]
> ไปก่อนยายนานแล้วจ้ะ ไม่เป็นไรหรอก เดี๋ยวก็ได้เจอกัน

Direction: You made peace with it long ago; comfort him instead of yourself.  
Prosody: lower, narrow, slow, soft, warm breathy, soft fall; pause after นานแล้วจ้ะ.  
Gemini style: a peaceful old grandmother speaking calmly about her late husband

**E071** [mint · th · conflict.love_vs_anger · 0.7]
> นายมันบ้า! ...แต่ถ้านายเป็นอะไรไป ฉันจะทำยังไง

Direction: Scream at him for the risk, then the fear underneath breaks through.  
Prosody: starts higher, wide, loud, tense; after the pause drops lower, soft, slow, trembling, trail off; 600 ms pause before แต่.  
Gemini style: a young woman whose anger collapses into fear for someone she loves

**E072** [tao · th · love.romantic · 0.5]
> ฉันไม่ไปไหนหรอก อยู่ตรงนี้แหละ

Direction: No jokes; say it close and simple, like a promise.  
Prosody: lower, narrow, slow, soft, warm, soft fall; stress ตรงนี้.  
Gemini style: a quiet man tenderly promising to stay

**E073** [ton · th · awe.childlike_wonder · 0.7]
> ว้าว... แว่นอันนี้มองเห็นดาวได้ทั้งฟ้าเลย

Direction: You put on the magic glasses and the sky opens; forget everyone else.  
Prosody: higher, wide, slow, medium energy, breathy, rise; long ว้าว, pause after it.  
Gemini style: a young man in wide-eyed childlike wonder

**E074** [chan · th · joy.amusement · 0.6]
> ฮ่าๆ ไอ้หนูนี่ ใส่แว่นกลับหัวมาทั้งวันเลยเหรอวะ

Direction: Laugh at the boy the way you'd laugh at your own son.  
Prosody: higher than his baseline, wide, fast, high energy, laughing, rise; laugh before ไอ้หนู.  
Gemini style: a gruff old man laughing heartily at a young man

**E075** [ton · th · selfconscious.embarrassment · 0.6]
> อ้าว... จริงด้วย ทำไมไม่มีใครบอกผมเลยครับ

Direction: Realise it, cringe, and complain half-laughing.  
Prosody: slightly higher, medium range, slow then fast, medium energy, smiling-breathy, rise; pause after อ้าว.  
Gemini style: an embarrassed young man laughing at himself

**E076** [jan · th · joy.mischief · 0.5]
> ยายซ่อนแว่นลุงไว้ในตู้เย็นเองแหละ อย่าบอกเขานะ

Direction: Confess your prank like a naughty child; you're proud of it.  
Prosody: slightly higher, medium range, conversational, medium-soft energy, smiling, near-whisper on อย่าบอกเขานะ; เขา read เค้า.  
Gemini style: a mischievous old grandmother confessing a prank

**E077** [chan · th · surprise.shock · 0.8]
> หา! แว่นไปอยู่ในตู้เย็นได้ยังไง!

Direction: Open the fridge and find them; you can't believe it.  
Prosody: much higher, wide, fast, very high energy, projected, rise on หา, fall at the end; pause after หา.  
Gemini style: an old man shocked to find his glasses in the fridge

**E078** [mint · th · social.jealousy · 0.5]
> ใครอ่ะ ผู้หญิงที่ทักนายเมื่อกี้

Direction: Ask as casually as you can; the casualness is a bit too careful.  
Prosody: baseline, narrow, slightly slow, medium-low energy, tight, level ending; pause after ใครอ่ะ.  
Gemini style: a young woman trying too hard to sound casual while jealous

**E079** [tao · th · stance.playful_teasing · 0.4]
> หึงเหรอ

Direction: Two syllables; let a slow smile carry it.  
Prosody: lower, narrow, slow, low energy, smiling, rise; lengthen หึง.  
Gemini style: a man teasing gently and slowly

**E080** [mint · th · stance.defensiveness · 0.6]
> ใครหึง! ไม่ได้หึงสักหน่อย

Direction: Deny it too fast and too loud.  
Prosody: higher, wide, fast, high energy, tense, fall; stress ไม่ได้.  
Gemini style: a flustered young woman denying she is jealous

**E081** [ton · th · sadness.despair · 0.7]
> ทำทุกอย่างแล้ว แต่ร้านก็ยังต้องปิดอยู่ดี

Direction: You have nothing left to try; say it to the floor.  
Prosody: lower, very narrow, slow, low energy, creaky, trail off; pause after ทำทุกอย่างแล้ว.  
Gemini style: a young man in quiet despair

**E082** [jan · th · hope.hope · 0.5]
> ยังไม่หมดหรอกลูก ตราบใดที่ไฟในร้านยังเปิดอยู่

Direction: Lift his chin with your words; you believe it.  
Prosody: baseline, medium range, slow, medium energy, warm, gentle rise on ยังเปิดอยู่; pause after ลูก.  
Gemini style: a gentle grandmother giving hope

**E083** [chan · th · will.triumph · 0.8]
> เห็นไหม! บอกแล้วว่าร้านเราไม่มีวันเจ๊ง!

Direction: Celebrate the win loudly and slap the counter.  
Prosody: higher, wide, fast, very high energy, projected, fall; ไหม read มั้ย, stress ไม่มีวัน.  
Gemini style: an old man shouting in triumph

**E084** [customer · en · fear.anxiety · 0.5]
> Who turned off the lights? This isn't funny.

Direction: Try to make it a prank so it isn't something worse.  
Prosody: slightly higher, medium range, slightly fast, medium energy, tense, fall on "funny"; pause between sentences.  
Gemini style: an anxious woman in a dark room trying to stay calm

**E085** [tao · en · will.authority_command · 0.6]
> Look at me. Breathe. We'll get out of here.

Direction: Take charge quietly; your calm is the only thing holding her together.  
Prosody: lower, narrow, slow, medium energy, firm chest, fall; pauses after "me" and "Breathe".  
Gemini style: a calm man taking charge in a crisis

**E086** [mint · en · sadness.betrayal_hurt · 0.7]
> You promised. You stood right there and promised me.

Direction: Point to the spot; the hurt is sharper than the anger.  
Prosody: slightly lower, narrow, slow, medium energy, trembling, fall; stress "right there", pause after "You promised".  
Gemini style: a hurt young woman confronting a broken promise

**E087** [ton · en · care.pleading · 0.7]
> I can't do this alone. Please, I need your help.

Direction: Drop your pride completely; you have no other option.  
Prosody: slightly higher, medium range, slow, medium energy, breathy, fall-rise on "help"; stress "Please".  
Gemini style: a desperate young man pleading for help

**E088** [jan · en · calm.serenity · 0.4]
> Hush now, child. The night is long, but it always ends.

Direction: Sing it almost like a lullaby.  
Prosody: lower, narrow, very slow, soft, breathy, soft fall; pause after "child".  
Gemini style: a serene old grandmother soothing a child

**E089** [chan · en · anger.cold · 0.6]
> Forty years I kept this shop. Nobody takes it from me.

Direction: No shouting; each word is a nail.  
Prosody: lower, very narrow, slow, medium energy, tense chest, hard fall; stress "Nobody", pause after "shop".  
Gemini style: an old man coldly and quietly furious

**E090** [customer · en · fear.dread · 0.7]
> Please, just tell me she's going to be okay.

Direction: You already suspect the answer; you are begging for a lie.  
Prosody: slightly lower, narrow, slow, low energy, trembling, soft fall; stress "okay".  
Gemini style: a woman filled with dread waiting for bad news


## (c) Narration

narrator_th for the Thai series, shop_vo / Tao for English narration and eye-break guides. Narration serves the picture: steadier than dialogue, pauses do most of the work.

**E091** [narrator_th · th · performance.storyteller_warmth · 0.5]
> ในซอยเล็กๆ กลางเมือง มีร้านแว่นเก่าแก่ร้านหนึ่ง ที่ไฟไม่เคยดับ

Direction: Open the storybook for a child at bedtime; invite them in, don't announce.  
Prosody: slightly lower, medium range, slow, medium-soft energy, warm, soft fall; pauses after กลางเมือง and ร้านหนึ่ง, slight weight on ไม่เคยดับ.  
Gemini style: a warm Thai storyteller opening a bedtime tale

**E092** [narrator_th · th · performance.eerie_calm · 0.6]
> ตีสองตรง... เสียงกระดิ่งหน้าร้านดังขึ้น ทั้งที่ไม่มีใครเปิดประตู

Direction: Lower your voice as if the bell might hear you; make the listener lean closer.  
Prosody: lower, narrow, slow, low energy, breathy, level ending; long pause after ตีสองตรง, softer on ไม่มีใคร.  
Gemini style: a storyteller narrating a spooky moment in a calm hush

**E093** [narrator_th · th · fear.dread · 0.5]
> และคืนนั้น ต้นก็ได้รู้ว่า ลูกค้าคนสุดท้ายของร้าน ไม่ใช่คนเป็น

Direction: Build to the reveal and drop it quietly; the quiet is the scare.  
Prosody: lower, narrow, slow, low energy, slightly breathy, fall; dramatic pause before ไม่ใช่คนเป็น, softer on the last phrase.  
Gemini style: a storyteller quietly delivering a chilling reveal

**E094** [narrator_th · th · nostalgia.longing · 0.5]
> ยายจันรอคนคนหนึ่งมาตลอดหกสิบปี รอที่โต๊ะตัวเดิม ใต้โคมไฟดวงเดิม

Direction: Let the repetition of เดิม ache; you feel for her.  
Prosody: lower, narrow, slow, soft, warm breathy, soft fall; pauses after หกสิบปี and ตัวเดิม, lengthen เดิม each time.  
Gemini style: a warm storyteller narrating a long, patient longing

**E095** [narrator_th · th · calm.serenity · 0.4]
> เช้าวันนั้น แดดอ่อนๆ ส่องเข้ามาในร้าน ทุกอย่างดูสงบเหมือนไม่เคยมีอะไรเกิดขึ้น

Direction: Exhale after the long night; paint the morning light.  
Prosody: baseline, narrow, slow, soft, relaxed, soft fall; pause after เช้าวันนั้น.  
Gemini style: a gentle storyteller describing a peaceful morning

**E096** [narrator_th · th · performance.storyteller_warmth · 0.4]
> ตอนที่แล้ว ต้นได้เจอยายจันเป็นครั้งแรก คืนนี้ เรื่องราวจะเริ่มต้นจริงๆ

Direction: Catch the audience up, then lean forward on คืนนี้ as if sharing a secret.  
Prosody: baseline, medium range, conversational, medium energy, warm, slight rise on จริงๆ; pause after ครั้งแรก and คืนนี้.  
Gemini style: a warm storyteller recapping and teasing the next part

**E097** [narrator_th · th · hope.excitement · 0.6]
> ติดตามตอนต่อไป วันศุกร์นี้ สองทุ่มตรง

Direction: Leave them wanting more; a friendly invitation, not a shout.  
Prosody: slightly higher, medium-wide range, slightly fast, medium-high energy, smiling, fall; pauses between the three phrases.  
Gemini style: an upbeat narrator inviting viewers to the next episode

**E098** [narrator_th · th · sadness.melancholy · 0.5]
> บางคนจากไปโดยไม่ได้บอกลา บางคนยังอยู่ เพื่อรอคำลานั้น

Direction: Two balanced halves; let the second land softly like a closed door.  
Prosody: lower, narrow, slow, soft, breathy, soft fall; pause after บอกลา and ยังอยู่.  
Gemini style: a storyteller speaking a quiet, melancholy line

**E099** [narrator_th · th · joy.amusement · 0.5]
> ลุงชาญหาแว่นอยู่ครึ่งชั่วโมง ทั้งที่มันเสียบอยู่บนหัวตัวเอง

Direction: Tell it with a twinkle; hold back the laugh so the audience gets to have it.  
Prosody: baseline, medium range, conversational, medium energy, smiling, fall; comic pause before ทั้งที่, slight weight on บนหัว.  
Gemini style: a storyteller amused by a character's silly mistake

**E100** [narrator_th · th · will.urgency · 0.7]
> ไฟเริ่มลามมาถึงหน้าร้าน ต้นมีเวลาไม่ถึงนาที

Direction: Push the pace; the audience should feel the clock.  
Prosody: slightly higher, medium range, fast, high energy, tense, fall; stress ไม่ถึงนาที.  
Gemini style: a narrator speeding up with urgency during an action scene

**E101** [narrator_th · th · mixed.bittersweet_farewell · 0.6]
> และนั่นคือคืนสุดท้าย ที่ร้านแว่นตีสองเปิดไฟ

Direction: Close the series gently; sad, but grateful it happened.  
Prosody: lower, narrow, slow, soft, warm with slight tremor, soft fall; long pause after คืนสุดท้าย.  
Gemini style: a storyteller ending a story with a bittersweet farewell

**E102** [narrator_th · th · joy.contentment · 0.4]
> มิ้นท์กับเต๋ารู้จักกันตั้งแต่ ป.1

Spoken: มิ้นท์กับเต๋ารู้จักกันตั้งแต่ ประถมหนึ่ง  
Direction: Introduce the two like old friends of yours.  
Prosody: baseline, medium range, conversational, medium energy, smiling, soft fall; ป.1 spoken ประถมหนึ่ง.  
Gemini style: a warm narrator introducing two lifelong friends

**E103** [narrator_th · th · cognitive.interest · 0.5]
> รู้ไหม เด็กไทยหลายคนสายตาสั้นโดยไม่รู้ตัว

Direction: Hook the viewer with a fact they didn't know; ask, don't lecture.  
Prosody: baseline, medium range, conversational, medium energy, modal, rise on รู้ไหม (มั้ย), pause after it.  
Gemini style: a friendly narrator sharing a surprising fact

**E104** [narrator_th · th · care.encouragement · 0.5]
> ทุกๆ 20 นาที ลองละสายตาจากจอ มองไกลสัก 20 วินาทีนะ

Spoken: ทุกๆ ยี่สิบนาที ลองละสายตาจากจอ มองไกลสักยี่สิบวินาทีนะ  
Direction: Give the tip like a friend nudging you, not a doctor.  
Prosody: baseline, medium range, slightly slow, medium energy, warm, soft fall; pause after นาที, ทุกๆ read ทุกทุก.  
Gemini style: a friendly narrator gently encouraging a healthy habit

**E105** [narrator_th · th · awe.awe · 0.5]
> ดวงตาของเรา แยกสีได้นับล้านเฉด ทั้งที่มันเล็กกว่าลูกปิงปองเสียอีก

Direction: Marvel at it yourself; let the listener share your amazement.  
Prosody: slightly higher, wide on นับล้าน, slow, medium energy, breathy, fall; pause after ดวงตาของเรา.  
Gemini style: a narrator full of wonder about the human eye

**E106** [narrator_th · th · calm.serenity · 0.6]
> หลับตาเบาๆ ... หายใจเข้าลึกๆ ... แล้วค่อยๆ ผ่อนลมออก

Direction: Breathe with the listener; each pause is their breath.  
Prosody: lower, very narrow, very slow, soft, breathy, soft fall; 1500 ms pauses at each ellipsis.  
Gemini style: a soft calm guide leading a slow breathing exercise

**E107** [narrator_th · th · performance.eerie_calm · 0.5]
> ไม่มีใครรู้ว่า แว่นอันนั้นมาจากไหน รู้แต่ว่า ใครใส่... จะเห็นสิ่งที่คนอื่นมองไม่เห็น

Direction: Tell a legend around a campfire; slow down where it matters.  
Prosody: lower, narrow, slow, low energy, breathy, level ending; pauses after มาจากไหน and ใครใส่.  
Gemini style: a storyteller telling an eerie legend calmly

**E108** [narrator_th · th · transition.calm_to_panic · 0.7]
> ทุกอย่างเงียบสนิท จนกระทั่ง... เสียงกระจกแตกดังลั่น!

Direction: Lull them, then hit them; the switch is on จนกระทั่ง.  
Prosody: first half low, slow, soft; after the pause much higher, fast, loud, sharp fall on ดังลั่น; dramatic pause after จนกระทั่ง.  
Gemini style: a narrator going from a hush to a sudden shock

**E109** [narrator_th · th · sadness.grief · 0.6]
> ลุงชาญไม่ได้ร้องไห้ในงานศพ เขาร้องคนเดียว หลังร้านปิด

Direction: Report it simply; the restraint makes it hurt.  
Prosody: lower, narrow, slow, low energy, soft, soft fall; pause after งานศพ and คนเดียว; เขา read เค้า.  
Gemini style: a storyteller quietly narrating a man's private grief

**E110** [narrator_th · th · joy.happiness · 0.5]
> และตั้งแต่วันนั้น ร้านแว่นเล็กๆ ก็ไม่เคยเหงาอีกเลย

Direction: End with a warm smile you can hear.  
Prosody: baseline, medium range, slow, medium energy, smiling, soft fall; pause after ตั้งแต่วันนั้น.  
Gemini style: a storyteller ending a tale happily and warmly

**E111** [jan · th · performance.storyteller_warmth · 0.5]
> กาลครั้งหนึ่ง นานมาแล้ว มีช่างแว่นหนุ่มคนหนึ่ง ทำแว่นให้คนทั้งหมู่บ้าน

Direction: Tell Ton the old tale the way you told your grandchildren; this is your own story in disguise.  
Prosody: lower, narrow-medium, slow, soft, warm breathy, soft fall; pauses after กาลครั้งหนึ่ง and นานมาแล้ว.  
Gemini style: an old grandmother telling a bedtime story slowly and warmly

**E112** [shop_vo · en · performance.storyteller_warmth · 0.5]
> Every pair of glasses has a story. This one starts on a rainy Tuesday.

Direction: Open a brand story like a short film; intimate, not salesy.  
Prosody: slightly lower, medium range, slow, medium-soft energy, warm, soft fall; pause between sentences.  
Gemini style: a warm narrator opening a short brand story

**E113** [shop_vo · en · calm.serenity · 0.6]
> Close your eyes. Let your shoulders drop. Breathe in, slowly.

Direction: Guide the viewer's body, one instruction per breath.  
Prosody: lower, very narrow, very slow, soft, breathy, soft fall; 1000 ms pause after each sentence.  
Gemini style: a calm guide leading a slow relaxation

**E114** [shop_vo · en · care.encouragement · 0.5]
> Now roll your neck to the left... and gently back to the center.

Direction: Move with the viewer; let the voice travel like the neck does.  
Prosody: lower, narrow, slow, soft, warm, soft fall; long pause at the ellipsis, lengthen "gently".  
Gemini style: a gentle guide leading a neck stretch

**E115** [tao · en · stance.dry_irony (+nostalgia.nostalgia) · 0.4]
> We met in first grade. She stole my eraser. I never got it back.

Direction: Narrate your own story deadpan; the fondness hides under the complaint.  
Prosody: lower, narrow, slow, low energy, flat with a faint smile at the end, fall; pause after each sentence.  
Gemini style: a dry-humoured man fondly narrating how he met his best friend

**E116** [shop_vo · en · performance.eerie_calm · 0.5]
> Nobody knew who left the glasses on the counter. Nobody wanted to find out.

Direction: Calm, slightly too calm; the second sentence is a door creaking.  
Prosody: lower, narrow, slow, low energy, breathy, level ending; pause between sentences.  
Gemini style: a narrator telling a mystery in a calm, eerie voice

**E117** [shop_vo · en · awe.awe · 0.5]
> Your eyes adjust to light faster than any camera ever built.

Direction: Share a fact you still find amazing.  
Prosody: slightly higher, wide on "faster", slow, medium energy, breathy, fall.  
Gemini style: a narrator marvelling at the human eye

**E118** [shop_vo · en · mixed.bittersweet_farewell · 0.6]
> And that was the last night the little shop kept its lights on.

Direction: Close the story softly; sad and grateful at once.  
Prosody: lower, narrow, slow, soft, warm, soft fall; pause after "last night".  
Gemini style: a narrator ending a story with a bittersweet farewell


## (d) Commercial VO

shop_vo in Thai and English. `Spoken:` is the normalised text the TTS must read (prices, dates, times, phone numbers, brand names, symbols). Subtitles keep the written form.

**E119** [shop_vo · th · performance.sales_enthusiasm · 0.6]
> โปรแรงส่งท้ายปี! แว่นสายตาครบชุด เริ่มต้นเพียง 1,290 บาท

Spoken: โปรแรงส่งท้ายปี! แว่นสายตาครบชุด เริ่มต้นเพียงหนึ่งพันสองร้อยเก้าสิบบาท  
Direction: Excite them about a good deal like a friend who found it first; never shout.  
Prosody: slightly higher, wide range, slightly fast, high energy, smiling, fall; pause before เริ่มต้น, stress the price.  
Gemini style: an upbeat, friendly Thai shop announcer excited about a deal

**E120** [shop_vo · th · performance.trusted_expert · 0.5]
> ตรวจวัดสายตาฟรี โดยนักทัศนมาตรที่มีใบอนุญาต

Direction: State it like a fact you're proud of; calm credibility.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, firm fall; pause after ฟรี.  
Gemini style: a trustworthy, friendly Thai voice stating a fact with confidence

**E121** [shop_vo · th · will.urgency · 0.4]
> โปรโมชันนี้ถึงวันที่ 31 ธันวาคม 2569 เท่านั้น

Spoken: โปรโมชันนี้ถึงวันที่สามสิบเอ็ด ธันวาคม พุทธศักราชสองพันห้าร้อยหกสิบเก้า เท่านั้น  
Direction: Remind them of the deadline without pressure.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, fall; stress เท่านั้น, year read in full (พ.ศ.).  
Gemini style: a friendly announcer giving a deadline clearly

**E122** [shop_vo · th · performance.trusted_expert · 0.3]
> เปิดทุกวัน 10:00–20:00 น.

Spoken: เปิดทุกวัน สิบโมงเช้า ถึง สองทุ่ม  
Direction: Plain shop information; friendly and clear.  
Prosody: baseline, narrow, slightly slow, medium energy, clear, soft fall; pause after ทุกวัน; times read conversationally.  
Gemini style: a friendly, clear voice giving opening hours

**E123** [shop_vo · th · hope.excitement · 0.7]
> ลด 50% ทั้งร้าน เฉพาะเสาร์-อาทิตย์นี้

Spoken: ลดห้าสิบเปอร์เซ็นต์ทั้งร้าน เฉพาะเสาร์อาทิตย์นี้  
Direction: Share big news; you want them to tell a friend.  
Prosody: higher, wide, fast, high energy, smiling, fall; stress ห้าสิบ.  
Gemini style: an excited, upbeat Thai announcer

**E124** [shop_vo · th · will.urgency · 0.4]
> โทรเลย 081-234-5678

Spoken: โทรเลย ศูนย์แปดหนึ่ง สองสามสี่ ห้าหกเจ็ดแปด  
Direction: Say the number so someone can write it down.  
Prosody: baseline, narrow, slow, medium energy, crisp, level then fall at the end; digits grouped 3-3-4 with pauses.  
Gemini style: a clear, friendly announcer reading a phone number slowly

**E125** [shop_vo · th-en · performance.trusted_expert · 0.5]
> เลนส์ Hoya ของแท้ รับประกันหนึ่งปีเต็ม

Spoken: เลนส์โฮย่าของแท้ รับประกันหนึ่งปีเต็ม  
Direction: Reassure about quality; you know the product.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, firm fall; stress ของแท้, brand read Thai-style โฮย่า.  
Gemini style: a trustworthy shop voice vouching for quality

**E126** [shop_vo · th-en · performance.sales_enthusiasm · 0.6]
> แว่นกันแดด Ray-Ban ลดสูงสุด 30%

Spoken: แว่นกันแดดเรย์แบน ลดสูงสุดสามสิบเปอร์เซ็นต์  
Direction: Sell the deal with a smile.  
Prosody: slightly higher, wide, slightly fast, high energy, smiling, fall; brand read เรย์แบน.  
Gemini style: an upbeat Thai announcer promoting a sunglasses sale

**E127** [shop_vo · th · performance.sales_enthusiasm · 0.8]
> ซื้อแว่น 1 แถม 1 ฟรี!

Spoken: ซื้อแว่นหนึ่ง แถมหนึ่ง ฟรี!  
Direction: The big reveal; let them hear you can't believe it either.  
Prosody: higher, very wide, fast, very high energy, smiling, fall; pause before ฟรี, stress ฟรี.  
Gemini style: an enthusiastic announcer revealing a buy-one-get-one deal

**E128** [shop_vo · th · performance.storyteller_warmth · 0.5]
> ไทม์ ออพติก ใส่ใจทุกการมองเห็น

Direction: The tagline; say it like a promise to one person.  
Prosody: slightly lower, narrow, slow, medium-soft energy, warm, soft fall; pause after ออพติก.  
Gemini style: a warm, sincere brand voice delivering a tagline

**E129** [shop_vo · th · care.encouragement · 0.5]
> เด็กๆ สายตาเปลี่ยนเร็ว ตรวจปีละครั้ง ช่วยได้มากนะคะ

Direction: Speak to parents as a caring friend, not to scare them.  
Prosody: baseline, medium range, slightly slow, medium energy, warm, soft fall; pause after เปลี่ยนเร็ว.  
Gemini style: a caring female Thai voice gently advising parents

**E130** [shop_vo · th · performance.sales_enthusiasm · 0.6]
> เลนส์ปรับแสงออโต้ ราคาพิเศษ 3,500 บาท จากปกติ 4,900 บาท

Spoken: เลนส์ปรับแสงออโต้ ราคาพิเศษสามพันห้าร้อยบาท จากปกติสี่พันเก้าร้อยบาท  
Direction: Let the comparison do the selling; emphasise the special price, throw away the old one.  
Prosody: slightly higher, wide, baseline rate, high energy, smiling, fall; stress สามพันห้าร้อย, lighter on the old price.  
Gemini style: an upbeat announcer presenting a price drop

**E131** [shop_vo · th · hope.excitement · 0.5]
> ผ่อน 0% นาน 10 เดือน

Spoken: ผ่อนศูนย์เปอร์เซ็นต์ นานสิบเดือน  
Direction: Make it sound easy and good.  
Prosody: slightly higher, medium range, baseline rate, medium-high energy, smiling, fall; pause after เปอร์เซ็นต์.  
Gemini style: a friendly upbeat announcer presenting an instalment plan

**E132** [shop_vo · th · care.reassurance · 0.3]
> ร้านหยุดวันที่ 1–3 มกราคม เปิดอีกครั้งวันที่ 4 นะคะ

Spoken: ร้านหยุดวันที่หนึ่งถึงสาม มกราคม เปิดอีกครั้งวันที่สี่นะคะ  
Direction: Tell regulars the shop is closing briefly; the reassurance is in "we'll be back".  
Prosody: baseline, medium range, slightly slow, medium energy, warm, soft fall; pause after มกราคม.  
Gemini style: a friendly shop voice announcing a holiday closure

**E133** [shop_vo · th · performance.trusted_expert · 0.3]
> สาขาหัวหิน ซอย 94 เดินจากตลาดแค่สองนาที

Spoken: สาขาหัวหิน ซอยเก้าสิบสี่ เดินจากตลาดแค่สองนาที  
Direction: Give directions like a local helping a visitor.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, soft fall; pause after ซอยเก้าสิบสี่.  
Gemini style: a friendly local voice giving directions

**E134** [shop_vo · th · performance.trusted_expert · 0.4]
> บริการครบ ทั้งตรวจสายตา ปรับแว่น เปลี่ยนแป้นจมูก ฯลฯ

Spoken: บริการครบ ทั้งตรวจสายตา ปรับแว่น เปลี่ยนแป้นจมูก และอื่นๆ อีกมากมาย  
Direction: List the services lightly, one beat each; ฯลฯ becomes a phrase, never the symbol name.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, soft fall; short pauses between items.  
Gemini style: a trustworthy shop voice listing services

**E135** [shop_vo · th · performance.sales_enthusiasm · 0.5]
> ลูกค้าใหม่ รับส่วนลดเพิ่ม 200 บาททันที

Spoken: ลูกค้าใหม่ รับส่วนลดเพิ่มสองร้อยบาททันที  
Direction: Welcome new customers with a gift.  
Prosody: slightly higher, medium range, slightly fast, high energy, smiling, fall; stress สองร้อย.  
Gemini style: a friendly upbeat announcer welcoming new customers

**E136** [shop_vo · th · care.empathy · 0.4]
> ทำงานหน้าจอวันละ 8 ชั่วโมงขึ้นไป ตาล้าแน่นอน ลองเลนส์ตัวนี้ดูนะ

Spoken: ทำงานหน้าจอวันละแปดชั่วโมงขึ้นไป ตาล้าแน่นอน ลองเลนส์ตัวนี้ดูนะ  
Direction: Show you understand their tired eyes before you suggest anything.  
Prosody: baseline, medium range, slightly slow, medium energy, warm, soft fall; pause after แน่นอน.  
Gemini style: an understanding friendly voice suggesting a lens

**E137** [shop_vo · th-en · will.urgency · 0.3]
> สแกน QR Code รับคูปองได้เลย

Spoken: สแกนคิวอาร์โค้ด รับคูปองได้เลย  
Direction: A quick, friendly call to action.  
Prosody: slightly higher, medium range, slightly fast, medium-high energy, smiling, fall; QR read คิวอาร์.  
Gemini style: a friendly upbeat call to action

**E138** [shop_vo · th-en · hope.excitement · 0.5]
> งาน Open House วันเสาร์ที่ 6 ธันวาคม เวลา 14:30 น.

Spoken: งานโอเพ่นเฮาส์ วันเสาร์ที่หก ธันวาคม เวลาบ่ายสองโมงครึ่ง  
Direction: Invite them to the event like a party.  
Prosody: slightly higher, medium range, baseline rate, medium-high energy, smiling, fall; pauses after โอเพ่นเฮาส์ and ธันวาคม.  
Gemini style: a cheerful announcer inviting people to an event

**E139** [shop_vo · th · performance.formal_condolence · 0.5]
> ไทม์ ออพติก ขอร่วมแสดงความเสียใจกับผู้ประสบภัยทุกท่าน

Direction: Formal and sincere; no smile, no sales energy.  
Prosody: lower, narrow, slow, low energy, soft, soft fall; pause after ไทม์ ออพติก.  
Gemini style: a formal, sincere voice expressing condolences

**E140** [shop_vo · th · social.gratitude · 0.6]
> ขอบคุณลูกค้าทุกท่าน ที่อยู่กับเรามาครบ 10 ปี

Spoken: ขอบคุณลูกค้าทุกท่าน ที่อยู่กับเรามาครบสิบปี  
Direction: Thank them like family at an anniversary dinner.  
Prosody: baseline, medium range, slow, medium energy, warm, soft fall; pause after ทุกท่าน, stress สิบปี.  
Gemini style: a warm, grateful brand voice celebrating an anniversary

**E141** [shop_vo · th · will.urgency · 0.7]
> เหลือแค่ 20 ชิ้นสุดท้ายเท่านั้น รีบเลยค่ะ!

Spoken: เหลือแค่ยี่สิบชิ้นสุดท้ายเท่านั้น รีบเลยค่ะ!  
Direction: Real urgency, but friendly; you want them not to miss out.  
Prosody: higher, wide, fast, high energy, smiling, fall; stress ยี่สิบ.  
Gemini style: an urgent but friendly female Thai announcer

**E142** [shop_vo · th · performance.trusted_expert · 0.4]
> ราคา 2,590.- รวมเลนส์กรองแสงแล้วค่ะ

Spoken: ราคาสองพันห้าร้อยเก้าสิบบาท รวมเลนส์กรองแสงแล้วค่ะ  
Direction: Be clear and transparent about what the price includes.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, soft fall; ".-" read as บาท, pause after the price.  
Gemini style: a clear, trustworthy female Thai shop voice

**E143** [shop_vo · en · performance.sales_enthusiasm · 0.6]
> Year-end sale! Complete prescription glasses from just 1,290 baht.

Spoken: Year-end sale! Complete prescription glasses from just one thousand two hundred and ninety baht.  
Direction: Share the deal like a friend; excited but never shouting.  
Prosody: slightly higher, wide, slightly fast, high energy, smiling, fall; pause before "from just".  
Gemini style: an upbeat, friendly shop announcer

**E144** [shop_vo · en · performance.trusted_expert · 0.5]
> Free eye exams by a licensed optometrist. No appointment needed.

Direction: Calm, confident, friendly; this is a promise of quality.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, firm fall; pause between sentences.  
Gemini style: a trustworthy, friendly voice

**E145** [shop_vo · en · will.urgency · 0.4]
> Offer ends December 31st, 2026.

Spoken: Offer ends December thirty-first, twenty twenty-six.  
Direction: A clear reminder, not a threat.  
Prosody: baseline, moderate range, baseline rate, medium energy, crisp, fall.  
Gemini style: a clear, friendly announcer stating a deadline

**E146** [shop_vo · en · performance.trusted_expert · 0.3]
> Open daily, 10 a.m. to 8 p.m.

Spoken: Open daily, ten A M to eight P M.  
Direction: Plain information, friendly.  
Prosody: baseline, narrow, baseline rate, medium energy, clear, soft fall.  
Gemini style: a friendly voice giving opening hours

**E147** [shop_vo · en · hope.excitement · 0.7]
> Up to 50% off sunglasses, this weekend only.

Spoken: Up to fifty percent off sunglasses, this weekend only.  
Direction: Big news; you want them to grab a friend and come.  
Prosody: higher, wide, fast, high energy, smiling, fall; stress "fifty".  
Gemini style: an excited, upbeat announcer

**E148** [shop_vo · en · performance.storyteller_warmth · 0.5]
> See clearly. Live brightly. Time Optic.

Direction: Three beats, each a small promise.  
Prosody: slightly lower, narrow, slow, medium energy, warm, soft fall; pauses after each phrase.  
Gemini style: a warm, sincere brand voice

**E149** [shop_vo · en · joy.amusement (+performance.sales_enthusiasm) · 0.5]
> Buy one pair, get the second one free. Yes, really.

Direction: Sell it, then wink; "Yes, really" is a smile at the listener.  
Prosody: slightly higher, wide, baseline rate, high energy, smiling, fall; comic pause before "Yes, really".  
Gemini style: an upbeat announcer with a playful wink

**E150** [shop_vo · en · care.empathy · 0.4]
> Your eyes work hard all day. Give them the lenses they deserve.

Direction: Understand first, then suggest.  
Prosody: baseline, medium range, slightly slow, medium energy, warm, soft fall; pause between sentences.  
Gemini style: an understanding, warm voice

**E151** [shop_vo · en · will.urgency · 0.4]
> Call us at 081 234 5678.

Spoken: Call us at oh eight one, two three four, five six seven eight.  
Direction: Read the number so someone can write it down.  
Prosody: baseline, narrow, slow, medium energy, crisp, fall; digits grouped 3-3-4.  
Gemini style: a clear announcer reading a phone number slowly

**E152** [shop_vo · en · performance.trusted_expert · 0.5]
> Hoya lenses, one-year warranty, fitted in under an hour.

Direction: Three facts, each confident.  
Prosody: baseline, moderate range, baseline rate, medium energy, clear, fall; short pauses between items; Hoya said HOY-uh.  
Gemini style: a confident, trustworthy voice listing facts

**E153** [shop_vo · en · care.encouragement · 0.5]
> Kids' eyes change fast. A yearly check-up makes a real difference.

Direction: Speak to parents as a friend.  
Prosody: baseline, medium range, slightly slow, medium energy, warm, soft fall.  
Gemini style: a caring, friendly voice advising parents

**E154** [shop_vo · en · will.urgency · 0.3]
> Scan the QR code for an extra 200-baht discount.

Spoken: Scan the Q R code for an extra two hundred baht discount.  
Direction: A quick call to action.  
Prosody: slightly higher, medium range, slightly fast, medium-high energy, smiling, fall.  
Gemini style: a friendly call to action

**E155** [shop_vo · en · joy.amusement · 0.4]
> Walk in squinting. Walk out smiling.

Direction: A light joke; let the second phrase smile.  
Prosody: baseline, medium range, slow, medium energy, smiling, fall; pause between phrases.  
Gemini style: a warm voice with a light, playful tone

**E156** [shop_vo · en · care.reassurance · 0.3]
> We're closed January 1st to 3rd. See you again on the 4th!

Spoken: We're closed January first to third. See you again on the fourth!  
Direction: Holiday closure with a friendly wave.  
Prosody: baseline, medium range, baseline rate, medium energy, smiling, fall.  
Gemini style: a friendly shop voice announcing a holiday

**E157** [shop_vo · en · hope.excitement · 0.4]
> Pay in 10 monthly instalments at 0% interest.

Spoken: Pay in ten monthly instalments at zero percent interest.  
Direction: Make it sound easy and good.  
Prosody: slightly higher, medium range, baseline rate, medium-high energy, smiling, fall.  
Gemini style: a friendly upbeat announcer

**E158** [shop_vo · en · social.gratitude · 0.6]
> Ten years of helping Hua Hin see clearly. Thank you.

Direction: Sincere thanks; slow down on "Thank you".  
Prosody: baseline, medium range, slow, medium energy, warm, soft fall; pause before "Thank you".  
Gemini style: a warm, grateful brand voice

**E159** [shop_vo · en · performance.formal_condolence · 0.5]
> Our thoughts are with everyone affected by the floods.

Direction: Formal, quiet, sincere; no sales energy.  
Prosody: lower, narrow, slow, low energy, soft, soft fall.  
Gemini style: a sincere, formal voice expressing sympathy

**E160** [shop_vo · en · will.urgency · 0.7]
> Hurry, only 20 frames left at this price!

Spoken: Hurry, only twenty frames left at this price!  
Direction: Real urgency, still friendly.  
Prosody: higher, wide, fast, high energy, smiling, fall; stress "twenty".  
Gemini style: an urgent but friendly announcer


## (e) Hard cases

Masked emotions, sarcasm, krengjai, transitions inside a line, comic timing, and the same words played three ways. Here the words and the voice deliberately disagree, so the Direction note matters more than the emotion id.

**E161** [ton · th · suppressed.forced_cheer (+sadness.sadness) · 0.6]
> ไม่เป็นไรครับ! ผมโอเคมาก วันนี้ดีที่สุดเลย

Direction: Your girlfriend just broke up with you by text and the customer must not notice; push the brightness one notch too high.  
Prosody: higher than baseline, wide but stiff, slightly fast, medium-high energy, smiling but tense, smile-ending that sags on เลย; slight over-stress on ดีที่สุด.  
Gemini style: a young man forcing a cheerful voice to hide that he is hurt

**E162** [mint · th · suppressed.polite_anger · 0.6]
> ค่ะ เข้าใจค่ะ งั้นรบกวนคุยกับผู้จัดการได้ไหมคะ

Direction: Stay perfectly polite while making it clear this conversation is over.  
Prosody: slightly lower, narrow, slow and even, controlled medium energy, crisp articulation, tense, level ending; each ค่ะ clipped short; ไหม read มั้ย.  
Gemini style: a young woman very politely hiding her anger

**E163** [tao · th · stance.sarcasm · 0.6]
> โห เก่งมาก ทำแว่นหายเป็นอันที่สามของเดือน

Direction: Praise the opposite of what you mean; the lengthened words are the irony cue.  
Prosody: lower, narrow, slow, low energy, flat, level ending; lengthen โห and เก่ง, pause before ทำแว่นหาย.  
Gemini style: a man being slowly, dryly sarcastic

**E164** [mint · th · stance.sarcasm · 0.5]
> ดีจังเลยนะ ฝนตกวันที่ลืมร่มพอดี

Direction: Complain to the sky with a bright fake smile.  
Prosody: slightly higher, narrow, slow, medium energy, exaggerated smile, level ending; lengthen ดีจัง, pause after นะ.  
Gemini style: a young woman being sarcastic about bad luck

**E165** [customer · th · social.krengjai_refusal · 0.6]
> จริงๆ ก็สวยนะคะ แต่... ขอดูอันอื่นก่อนดีกว่าค่ะ

Direction: Don't hurt the staff's feelings; the "no" hides inside the pause after แต่.  
Prosody: baseline, narrow, slow, soft, smiling, soft fall; hesitation pause after แต่, soft on ดีกว่าค่ะ.  
Gemini style: a polite customer gently declining without causing offence

**E166** [ton · th · social.deference_krengjai · 0.5]
> ลุงครับ ถ้าไม่รบกวน... ผมขอกลับก่อนได้ไหมครับ วันนี้แม่ไม่สบาย

Direction: Ask the elder for a favour while making yourself small; the reason comes last, almost apologetic.  
Prosody: slightly lower, narrow, slow, soft, slightly breathy, rise on ได้ไหมครับ (มั้ย); pause after ไม่รบกวน; ครับ unstressed.  
Gemini style: a polite young man humbly asking an elder for permission

**E167** [ton · th · social.krengjai_refusal · 0.5]
> เอ่อ... ขอบคุณมากครับลุง แต่ผมไม่ดื่มครับ พรุ่งนี้ต้องเปิดร้านแต่เช้า

Direction: Refuse the elder's drink without making him lose face; thank first, excuse last.  
Prosody: baseline, narrow, slow, soft-medium energy, smiling, soft fall; hesitation after เอ่อ, pause before แต่.  
Gemini style: a young man politely refusing a drink from an elder

**E168** [jan · th · mixed.laughing_through_tears · 0.7]
> ฮึๆ... ดูสิ ยายตายไปตั้งนาน ยังร้องไห้เป็นอยู่อีก

Direction: Laugh at yourself so the boy doesn't worry about the tears.  
Prosody: lower, medium range, slow, soft, trembling with a smile, soft fall; soft laugh then sniff at the start, pause after ดูสิ.  
Gemini style: an old grandmother laughing softly through tears

**E169** [chan · th · suppressed.holding_back_tears · 0.7]
> ไปเถอะ... ไปได้แล้ว อย่ามาทำให้ลุงเสียเวลา

Direction: Ton is moving away; push him out gruffly because if he stays one more second you'll cry.  
Prosody: lower, narrow, slow then clipped, medium energy, gruff with a tremor on ไปได้แล้ว, fall; long pause after ไปเถอะ.  
Gemini style: a gruff old man pushing someone away to hide that he is about to cry

**E170** [ton · th · transition.anger_to_sadness · 0.6]
> ทำไมลุงไม่บอกผมเลย! ...ผมจะได้ไปหาลุงทันไง

Direction: Shout the first half at him; the second half breaks as you realise it's too late.  
Prosody: first half higher, loud, fast, tense; after the pause lower, soft, slow, trembling, trail off; 700 ms pause before ผมจะได้.  
Gemini style: a young man whose anger turns into grief mid-line

**E171** [mint · th · transition.denial_to_acceptance · 0.6]
> ไม่จริงหรอก เขาต้องโทรมาแน่... ไม่โทรมาแล้วล่ะ เนอะ

Direction: Insist, then hear yourself and let it go; the เนอะ is to yourself.  
Prosody: first half slightly higher, fast, firm; after the pause lower, slow, soft, breathy, soft fall on เนอะ; เขา read เค้า.  
Gemini style: a young woman going from denial to quiet acceptance

**E172** [ton · th · transition.calm_to_panic · 0.7]
> ไม่เป็นไรครับ แค่ไฟกระพริบ... เดี๋ยวนะ ทำไมประตูล็อก!

Direction: Reassure the customer, notice the door, and lose it.  
Prosody: first half baseline, calm, conversational; from เดี๋ยวนะ higher, faster, louder, tense, rise-cut on ล็อก; pause before เดี๋ยวนะ.  
Gemini style: a young man going from calm to panic in one line

**E173** [tao · th · hidden.bravado_over_fear (+joy.amusement) · 0.5]
> ผีไม่มีจริงหรอก ฉันเดินนำเอง ...นายเดินข้างหน้าแล้วกัน

Direction: Comic timing: confident first, then the pause, then quietly reverse yourself as if it were the plan all along.  
Prosody: first half lower, firm, slow; comic pause 600 ms; last phrase slightly higher, quicker, softer, level ending.  
Gemini style: a man pretending to be brave, then quietly backing down

**E174** [chan · th · conflict.pride_vs_hurt · 0.6]
> ไม่ต้องมาช่วยหรอก ลุงทำเองได้ ...แต่ก็ขอบใจนะ

Direction: Your pride says no; your heart sneaks the thanks out at the end, quietly.  
Prosody: first half lower, gruff, firm; pause; last phrase softer, slower, warm, soft fall.  
Gemini style: a proud old man refusing help, then grudgingly thanking

**E175** [mint · th · mixed.nervous_laughter · 0.5]
> ฮะๆ ใช่ๆ ฉันพูดเล่นน่ะ ไม่ได้ชอบนายจริงๆ หรอก

Direction: You just confessed by accident; laugh it off too quickly.  
Prosody: higher, wide, fast, medium-high energy, breathy laugh, level ending; laugh at the start, rushed rhythm.  
Gemini style: a young woman laughing nervously to cover a confession

**E176** [jan · th · stance.conspiratorial_whisper · 0.5]
> ชู่ว์... ลุงเขามาแล้ว ทำเป็นไม่รู้เรื่องนะลูก

Direction: Pull the boy into the secret; you're enjoying it.  
Prosody: whisper, baseline pitch, narrow, slightly fast, low energy, breathy, smiling, soft fall; long ชู่ว์, เขา read เค้า.  
Gemini style: an old grandmother whispering a playful secret

**E177** [tao · th · social.gloating · 0.4]
> ใครบอกว่าไม่ต้องพกร่มนะ ใครนะ

Direction: She's soaked; enjoy being right, slowly.  
Prosody: lower, narrow, slow, low energy, smiling, rise on the second ใครนะ; pause between the two questions.  
Gemini style: a dry man quietly gloating about being right

**E178** [mint · th · social.schadenfreude · 0.5]
> สมน้ำหน้า ใครใช้ให้แอบกินขนมของฉันล่ะ

Direction: Laugh at his stomach ache; he deserved it and you both know it.  
Prosody: higher, wide, fast, medium-high energy, laughing, fall; stress สมน้ำหน้า.  
Gemini style: a young woman laughing at someone getting what they deserved

**E179** [ton · th · social.deference_krengjai (+joy.amusement) · 0.4]
> ลูกค้าครับ แว่นที่หาอยู่... อยู่บนหัวครับ

Direction: Comic timing: tell the elder customer politely, hold the pause, deliver the punchline with a straight face.  
Prosody: baseline, narrow, slow, soft-medium energy, polite, soft fall; comic pause 700 ms before อยู่บนหัวครับ.  
Gemini style: a polite young optician pointing out something funny with a straight face

**E180** [chan · th · stance.dry_irony · 0.5]
> ดีมาก ร้านแว่นที่เจ้าของหาแว่นตัวเองไม่เจอ

Direction: Laugh at yourself without laughing.  
Prosody: lower, narrow, slow, low energy, flat, level ending; pause after ดีมาก.  
Gemini style: an old man making a dry joke at his own expense

**E181** [tao · th · stance.mockery · 0.5]
> อุ้ย ผู้เชี่ยวชาญมาแล้วค่ะ ทุกคนหลีกทางด้วย

Direction: Imitate a fawning shop assistant (the ค่ะ is part of the mockery); she showed off once too often.  
Prosody: much higher than his baseline, exaggerated wide range, sing-song, medium energy, nasal, rise; stretched อุ้ย.  
Gemini style: a man mockingly imitating an over-the-top voice

**E182** [mint · th · stance.suspicion · 0.5]
> เมื่อคืนนายบอกว่านอนเร็วนี่ แล้วทำไมออนไลน์ตีสาม

Direction: Lay the trap slowly; you already know the answer.  
Prosody: slightly lower, narrow, slow, medium energy, tight, rise on ตีสาม; pause after นี่.  
Gemini style: a young woman suspiciously catching her friend in a lie

**E183** [ton · th · performance.formal_condolence · 0.5]
> ผมขอแสดงความเสียใจด้วยนะครับลุง ถ้ามีอะไรให้ช่วย บอกผมได้เลยครับ

Direction: Formal words, but you mean them; offer real help.  
Prosody: lower, narrow, slow, soft, sincere, soft fall; pause after ลุง.  
Gemini style: a young man sincerely offering condolences

**E184** [jan · th · performance.eerie_calm · 0.6]
> ยายรู้นะ ว่าลูกเห็นยายตั้งแต่คืนแรกแล้ว

Direction: Gentle, but the calm is unsettling; you have known all along.  
Prosody: lower, very narrow, very slow, soft, breathy, level ending; pause after ยายรู้นะ.  
Gemini style: a ghostly grandmother speaking with unsettling calm

**E185** [ton · th · low.drowsy · 0.6]
> อืม... อีกห้านาทีครับยาย... ห้านาทีเดียว

Direction: Half-asleep, bargaining with your eyes closed.  
Prosody: lower, very narrow, very slow, low energy, slurred, breathy, trail off; long pauses at the ellipses.  
Gemini style: a drowsy young man mumbling half-asleep

**E186** [chan · th · anger.cold · 0.6]
> พูดอีกทีสิ ลองพูดอีกทีซิ

Direction: Don't raise your voice; the repetition is the threat.  
Prosody: lower, very narrow, slow, medium energy, tense, fall; pause between the two halves, stress ลอง.  
Gemini style: an old man coldly daring someone to repeat themselves

**E187** [mint · th · anger.resentment · 0.5]
> ไม่เป็นไรหรอก ฉันชินแล้วล่ะ ที่ต้องเป็นตัวเลือกสุดท้าย

Direction: Say "it's fine" so that it obviously isn't; years of being second.  
Prosody: slightly lower, narrow, slow, low energy, tight, fall; pause before ที่ต้อง, stress สุดท้าย.  
Gemini style: a young woman quietly resentful

**E188** [tao · th · sadness.resignation · 0.5]
> ก็ได้ ตามใจเธอเลย

Direction: You stopped fighting; there's nothing left to argue.  
Prosody: lower, narrow, slow, low energy, soft, trail off; pause after ก็ได้.  
Gemini style: a tired man giving up an argument

**E189** [tao · th · love.affection · 0.5]
> ก็ได้ ตามใจเธอเลย

Direction: Indulge her with a smile; you'd give her anything.  
Prosody: baseline, medium range, slightly slow, medium energy, smiling, soft fall; lengthen ก็ได้ playfully.  
Gemini style: a man affectionately giving in

**E190** [tao · th · anger.bitterness · 0.5]
> ก็ได้ ตามใจเธอเลย

Direction: Concede with a sting; you'll remember this.  
Prosody: lower, narrow, clipped, medium energy, tense, cut-off ending; short ก็ได้.  
Gemini style: a man bitterly conceding

**E191** [ton · th · will.urgency · 0.7]
> ยาย! ยายต้องไปแล้ว ฟ้าจะสางแล้วครับ!

Direction: Get her out before sunrise; no time for politeness, though ครับ stays.  
Prosody: higher, wide, fast, high energy, projected, fall; stress ต้องไป.  
Gemini style: a young man urgently warning someone

**E192** [jan · th · mixed.bittersweet_farewell · 0.7]
> ไม่ต้องร้องนะลูก ยายแค่ไปก่อน ...ขอบใจที่ทำแว่นให้ยายนะจ้ะ

Direction: Leave him with a smile; your own sadness stays underneath.  
Prosody: lower, narrow, very slow, soft, warm with slight tremor, soft fall; long pause before ขอบใจ.  
Gemini style: a ghost grandmother saying a bittersweet goodbye

**E193** [customer · th · social.envy · 0.4]
> ดีจังเนอะ ได้แว่นใหม่ทุกปีเลย

Direction: Compliment with a little sting you hope nobody notices.  
Prosody: baseline, narrow, slightly slow, medium energy, smiling but tight, level ending; lengthen ดีจัง.  
Gemini style: a woman complimenting someone with a hint of envy

**E194** [mint · th · stance.indifference · 0.4]
> อ๋อ เหรอ ก็ดีนะ

Direction: He's bragging; give him nothing.  
Prosody: lower, very narrow, slow, low energy, flat, level ending; short pauses between words.  
Gemini style: a young woman sounding completely uninterested

**E195** [tao · en · stance.sarcasm · 0.6]
> Oh, great. Another "quick" meeting. Can't wait.

Direction: Lean on "quick"; flat everywhere else.  
Prosody: lower, narrow, slow, low energy, flat, level ending; lengthen "great" and "quick".  
Gemini style: a man being dryly sarcastic about a meeting

**E196** [mint · en · suppressed.forced_cheer · 0.6]
> No, it's fine! Totally fine! I love surprises.

Direction: Keep smiling while everything goes wrong; the cheer cracks a little on "surprises".  
Prosody: higher, wide but stiff, fast, high energy, smiling-tense, sagging fall at the end.  
Gemini style: a young woman forcing cheerfulness

**E197** [customer · en · suppressed.polite_anger · 0.6]
> I understand. I'd still like to speak with the manager, please.

Direction: Every word polite; every word final.  
Prosody: slightly lower, narrow, slow and even, medium energy, crisp, level ending; stress "still".  
Gemini style: a customer politely but firmly angry

**E198** [ton · en · transition.fear_to_relief · 0.6]
> Is someone there? ...Oh. It's just the cat. Thank god.

Direction: Terrified, then deflate completely.  
Prosody: first part higher, tense, halting; after "Oh" lower, slower, relaxed, breathy exhale before "Thank god".  
Gemini style: a scared young man suddenly relieved

**E199** [tao · en · stance.dry_irony · 0.5]
> I have a plan. It's a bad plan. But it's a plan.

Direction: Comic timing in three flat beats; never smile.  
Prosody: lower, narrow, slow, low energy, flat, fall; pause after each sentence, stress "bad".  
Gemini style: a deadpan man explaining a bad plan

**E200** [mint · en · conflict.love_vs_anger · 0.6]
> I hate that you're always right. I hate that I missed you.

Direction: The first "hate" is anger, the second is love dressed up as anger.  
Prosody: first sentence higher, tense, fast; second lower, softer, slower, slight tremor; pause between.  
Gemini style: a young woman torn between anger and love

**E201** [chan · en · hidden.bravado_over_fear · 0.5]
> Ghosts? Ha! I've seen worse things at the tax office.

Direction: Laugh too loudly to prove you're not scared.  
Prosody: higher, wide, fast, high energy, forced laugh, fall; laugh after "Ghosts?".  
Gemini style: an old man loudly pretending he isn't scared

**E202** [jan · en · performance.eerie_calm · 0.6]
> You can stop pretending, dear. I know you can see me.

Direction: Kind, but unsettling; you've known all along.  
Prosody: lower, very narrow, very slow, soft, breathy, level ending; pause after "dear".  
Gemini style: a ghostly grandmother speaking with eerie calm

**E203** [ton · en · social.deference_krengjai · 0.5]
> If it's not too much trouble... could I maybe leave a little early?

Direction: Make yourself small while asking.  
Prosody: slightly lower, narrow, slow, soft, breathy, rise; hesitation after "trouble".  
Gemini style: a timid young man politely asking a favour

**E204** [mint · en · mixed.nervous_laughter · 0.5]
> Ha, ha, I was joking! Obviously. Totally joking.

Direction: Laugh too fast; you meant it.  
Prosody: higher, wide, fast, medium-high energy, breathy laugh, level ending; rushed rhythm.  
Gemini style: a young woman laughing nervously

**E205** [tao · en · stance.sarcasm · 0.5]
> Nice job.

Direction: Flat and slow; he broke the frame.  
Prosody: lower, narrow, slow, low energy, flat, level ending; lengthen "Nice".  
Gemini style: a man dryly sarcastic

**E206** [tao · en · awe.admiration · 0.5]
> Nice job.

Direction: Genuinely impressed; a quiet nod in the voice.  
Prosody: baseline, medium range, slightly slow, medium energy, warm smiling, soft fall; stress "Nice".  
Gemini style: a calm man genuinely impressed

**E207** [customer · en · transition.calm_to_panic · 0.7]
> Sure, I'll just check my bag... wait. Where's my wallet? Where's my wallet?!

Direction: Relaxed, then the floor drops out.  
Prosody: first part baseline, calm; from "wait" higher, faster, louder, tense, rise; second question louder than the first.  
Gemini style: a customer going from calm to panic
