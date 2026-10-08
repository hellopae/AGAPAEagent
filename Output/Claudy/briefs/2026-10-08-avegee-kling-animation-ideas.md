# ใบงาน: เลือกฉากทำ Animation เพิ่มใน AVEGEE (Kling AI) — Minnie

## บริบท
คุณเป้ซื้อเครดิต Kling AI มาทำ animation intro ของเกม AVEGEE แล้ว ยังมีเครดิตเหลือ "อีกหน่อย"
อยากรู้ว่าควรเอาไปทำ animation ฉากไหนเพิ่ม — โดยเฉพาะ **ฉากจบ** และฉากอื่นที่คุ้ม

Repo เกม: `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` (อ่านอย่างเดียว ห้ามแก้ไฟล์ใดๆ)

### วิดีโอที่มีอยู่แล้ว (ห้ามเสนอซ้ำ)
- `img/intro-opening-v2.mp4` — splash เปิดเกม (index.html)
- `img/home-animated.mp4` — พื้นหลังหน้าแรก (cover VFX)
- `img/yama-intro-combined-v1.mp4` — ยมเดินขึ้นบัลลังก์ (ดู `docs/yama-intro-animation-higgsfield-2026-10-08.json`)
- `img/intro-splash.mp4`, `img/home-embers.mp4`

### ที่เหลือเป็นภาพนิ่ง (คัตซีนภาพเดียว) — ผู้สมัครรับ animation
- ฉากจบ/อีเวนต์สุดท้าย: `src/final-event.js`, `src/game.js` (~2560–2600 reinforcementCutscene, `completeStory`), ภาพ leader-*-possessed, ตอนจบ
- คัตซีนบอสโซน: `src/data.js` ~1785 (`img/zone-boss-cutscene.jpeg`, `img/Asia/Boss Zone2-asia-cutscene.jpeg` ฯลฯ)
- คัตซีนลงโทษ: `src/narrative-cutscenes.js`
- การมาถึงของเทวดา/วัลคีรี/ลูเมน: `src/deva-map.js`, `src/west-events.js`, `src/zone-introductions.js`
- โครงเรื่องรวม: `CONCEPT.md`, `src/story.js`, `INTRO_PROMPTS.md`, `docs/narrative-cutscenes-2026-10-05.md`
- ลำดับอีเวนต์ที่คุณเป้วาด (สรุปแล้ว): `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-08-avegee-ev-storyboard.md`

## ขอบเขต
คิดและจัดอันดับฉากที่ควรทำ animation — **ไม่ต้อง** research ราคา Kling, ไม่ต้องเขียนโค้ด

## ขั้นตอน
1. อ่านไฟล์ข้างบนพอให้เข้าใจเนื้อเรื่อง 4 โซน + ฉากจบ และรู้ว่ามีภาพนิ่งต้นทางไฟล์ไหนบ้าง
2. ลิสต์ผู้สมัคร 8–10 ฉาก แล้วคัด **Top 5** เรียงความคุ้ม โดยดู:
   - ผลทางอารมณ์ (ฉากจบ/จุดหักเหหนักกว่าฉากที่ผ่านบ่อย)
   - ผู้เล่นทุกคนได้เห็นไหม (ฉากบังคับ > ฉากที่บางคนไม่เจอ)
   - มีภาพนิ่งต้นทางดีพร้อมทำ image-to-video ไหม (ประหยัดเครดิต)
   - ความยาวสั้นพอ (คลิปละ 5–10 วินาที) และ loop/ต่อกับเกมได้
3. แต่ละฉากใน Top 5 ให้ระบุ:
   - ฉาก/จังหวะในเกม
   - ทำไมคุ้ม (1–2 บรรทัด)
   - ภาพต้นทาง: path จริงใน repo หรือบอกว่าต้องวาดใหม่
   - ความยาวที่แนะนำ
   - prompt ภาษาอังกฤษพร้อมวางใน Kling (ท่าทาง กล้อง แสง และสิ่งที่ห้ามเปลี่ยน เช่น หน้าตัวละคร)
4. ต่อท้ายด้วยตัวเลือก "ถ้าเครดิตเหลือแค่ 1–2 คลิป ควรทำอะไร"

## ข้อห้าม
- ห้ามแก้ไฟล์ใน AVEGEE
- ห้ามแต่งข้อเท็จจริงเรื่องราคาหรือเครดิตของ Kling
- ห้ามเสนอฉากที่มีวิดีโออยู่แล้ว

## เกณฑ์รับงาน
1. Top 5 มีภาพต้นทางที่เป็น path จริง (ตรวจด้วย Glob แล้ว) หรือระบุชัดว่าต้องวาดใหม่
2. มีฉากจบอย่างน้อย 1–2 ฉากใน Top 5
3. มี prompt Kling ครบทุกฉาก
4. ผลรวมอ่านจบได้ใน 2 นาที เขียนเป็นภาษาไทย ยกเว้น prompt
5. บันทึกผลที่ `Output/Minnie/2026-10-08-avegee-kling-animation-ideas.md`
