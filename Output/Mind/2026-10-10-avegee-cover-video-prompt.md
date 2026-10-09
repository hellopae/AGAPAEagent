# AVEGEE cover video prompt v5 (ยมบาทหันหน้า) — Mind, 2026-10-10

End frame: `Output/Claudy/refs/cover-v5-full.png` (16:9)
ตัวละคร: `/Users/agapae/agapae-work/AVEGEE/img/hero-yama.png`
ไม่ได้แก้ไฟล์ใดใน repo AVEGEE

## หลักคิด (ภาษาไทย)

ของเดิมมี 3 อย่างที่ AI video พังบ่อยที่สุด คือ หมุนตัว 180 องศา, เดินห่างกล้อง (เท้าลื่น/ลอย), และบังหน้าด้วยความมืด v5 ยมบาทหันหน้าอยู่แล้ว จึงตัดทั้งสามอย่างทิ้งได้:

- ยมบาทไม่ต้องหมุน ไม่ต้องเดิน ยืนที่เดิมตลอดคลิป ขยับแค่หายใจ กะพริบตา กำสมุดแน่นขึ้นนิด
- หน้าไม่ถูกซ่อน แต่ค่อยๆ สว่างขึ้นจากความมืด (แสงไฟลาวาส่องจากด้านหลังและด้านล่าง)
- การเคลื่อนไหวหลักมีอย่างเดียว คือกล้องถอยหลังตรงๆ (dolly out) ฉากกว้างขึ้นเผยด้วยแสง ยมบาทเล็กลงจนเท่าขนาดใน v5 แล้วหยุดค้าง 1 วินาที

ขนาดและตำแหน่งเป้าหมาย (วัดจาก v5): ยมบาทสูงราว 28 เปอร์เซ็นต์ของเฟรม อยู่ที่ราว 1 ใน 3 จากซ้าย เท้าอยู่ราว 60 เปอร์เซ็นต์ของความสูงเฟรม ดังนั้น start frame ต้องวางยมบาทใหญ่กว่าและอยู่กลางเฟรม แล้วกล้องถอยพร้อมเลื่อนไปทางขวาเล็กน้อยให้ยมบาทไปจอดที่ซ้ายกลาง

## START FRAME ที่ต้องเตรียม (สำคัญที่สุดสำหรับตัวเลือกหลัก)

ต้องทำภาพเปิดใหม่ 1 ภาพ สัดส่วน 16:9 เท่า end frame:

- ยมบาทหันหน้าตรง (หรือเฉียงเล็กน้อย) เต็มตัวเห็นเท้า สูงประมาณ 55-65 เปอร์เซ็นต์ของเฟรม อยู่กลางเฟรม ค่อนลงล่าง
- ท่าเดียวกับ v5 ทุกอย่าง: สองแขนกอดสมุดบัญชีแดงแนบอก สีหน้ากังวลตาโต
- แสงน้อยมาก ฉากหลังเกือบดำ เห็นแค่ขอบทองของบัลลังก์/แท่นที่ด้านหลังยมบาทรางๆ และประกายไฟเล็กๆ ไม่มีตัวละครอื่นชัดเจน ใบหน้ามีแสงส้มจางๆ จากด้านล่างให้พออ่านออก (ไม่ดำสนิท เพราะ AI ต้องเห็นหน้าเพื่อรักษาเอกลักษณ์)
- สไตล์ภาพวาดเกม/อนิเมะเดียวกับ v5 ไม่ใช่ภาพจริง เพื่อไม่ต้องให้ AI เปลี่ยนสไตล์ระหว่างคลิป

Prompt สร้าง start frame (ใช้กับโปรแกรมภาพ โดยแนบ v5 และ hero-yama.png เป็น reference):

```
Same illustration style, character design and rendering as the reference cover. Close shot of Yama, the small red-skinned young demon, standing front-facing, full body with bare feet visible, centered in a 16:9 frame, about 60 percent of frame height. He holds a closed red ledger against his chest with both arms, worried wide-eyed expression. Tall gold Thai crown, small red horns, black robe with gold trim and red center panel. Very dark scene: near-black background with only the faint gold edge of a throne dais behind him and a few drifting embers. Faint warm orange ember light from below and behind, just enough to read his face. No other characters, no text.
```

ทางลัดถ้าไม่อยากสร้างภาพใหม่: ครอป v5 รอบยมบาท (ตัดให้ได้ 16:9) ขยาย (upscale) แล้วทำให้มืดพร้อม vignette ข้อเสียคือความละเอียดต่ำ และ AI จะเดาความต่อเนื่องของฉากรอบนอกที่ถูกครอปเอง

## ตัวเลือกหลัก: "ยืนนิ่ง แสงขึ้น กล้องถอย" (เสี่ยงน้อยที่สุดที่ยังได้ความเคลื่อนไหวครบ)

Start frame = ภาพด้านบน (ยมบาทใหญ่ หันหน้า ในความมืด) / End frame = cover-v5-full.png ความยาวแนะนำ 8-10 วินาที

```
The main character is Yama, the small red-skinned young demon holding a closed red ledger against his chest with both arms. Preserve his tall gold Thai crown, small red horns, black robe with gold trim and red center panel, bare feet, and his worried, wide-eyed expression. He faces the viewer from the first frame to the last.

Yama stands still on the same spot for the entire video. He does not turn, walk or step; his feet never move. His only motion is small and natural: slow breathing, a soft blink, a slight anxious tightening of his grip on the ledger, and a gentle sway of his robe. His mouth stays closed.

The video opens in near darkness with Yama close to the camera. Warm ember firelight slowly rises from below and behind him, gradually revealing his face, his crown and horns, then the red ledger.

Camera: one smooth, steady move. The camera slowly pulls straight back from Yama, rising very slightly and drifting a little to the right, so that Yama grows smaller and settles toward the left-center of the frame. No rotation, no orbiting, no zoom jumps.

As the camera pulls back, reveal the environment progressively through light and widening frame, always keeping Yama in place: first the red-and-gold throne directly behind him with his father, the dark-skinned king in gold armor seated on it holding a golden staff; then the lavender female clerk holding a stack of papers on the left, the stout red demon with a spiked cudgel on his shoulder on the right, the small flame-haired demon beside him; the elevated stone judgment platform, rivers of lava, the distant volcano and fortress, the green armored guard far right, and the diagonal stone bridge with a queue of pale blue praying spirits who sway very gently. Lava glow and torch flames flicker softly; only the glow, flames and embers already present in the end frame. Keep character identities and costumes consistent and keep the illustrated game-cover style throughout, never photorealistic.

Settle into the EXACT composition of the supplied end frame: same camera angle, framing, character positions, proportions, colors and environment, with Yama standing facing the viewer in front of his seated father's throne, ledger held against his chest. Stop all camera movement and let all motion ease to near-stillness, then hold the final frame perfectly steady for the last second, ready for a seamless transition to the static game cover. The supplied end frame is the final visual target, not merely a style reference. Do not redesign, rearrange or crop it.

No cuts, no sudden transformations, no turning around, no walking, no sliding feet, no floating, no head turns away from the viewer, no talking or lip movement, no extra main characters, no costume changes, no text, menus, logos or added visual effects.
```

## ตัวเลือกสำรอง: "กล้องล็อก แสงเปิดฉาก" (เสี่ยงต่ำสุด ใช้เมื่อแบบหลักฉากเพี้ยนหรือขนาดไม่ตรง)

ไม่มีการเคลื่อนกล้อง ไม่มีการเปลี่ยนขนาดยมบาท จึงแทบไม่มีโอกาสที่เฟรมสุดท้ายจะไม่ตรง ความเคลื่อนไหวมาจากแสงและแอนิเมชันฉากล้วนๆ

Start frame = ภาพ v5 ที่ทำให้มืด (ไล่ความสว่างลงเกือบดำ เหลือแสงส้มจางๆ ที่หน้ายมบาทและขอบบัลลังก์ เฟรมและองค์ประกอบเหมือน v5 ทุกพิกเซล) / End frame = cover-v5-full.png ความยาว 5-6 วินาที ทำได้ใน Photoshop หรือโปรแกรมภาพอื่นภายในไม่กี่นาที

```
Locked camera, completely static framing, identical to the supplied end frame throughout. The scene begins almost completely dark. Yama, the small red-skinned young demon in the center-left, stands facing the viewer holding a closed red ledger against his chest, his face faintly lit by ember light. He stays in place and keeps his pose: only slow breathing and a soft blink.

Light spreads outward from Yama across the scene: first the throne and his seated father, then the clerk, the stout demon with the cudgel and the small flame-haired demon, then the lava, the volcano, the fortress and the bridge with its queue of pale blue spirits, who sway very gently. Lava glow and torch flames flicker softly.

The scene reaches the full brightness and exact composition of the supplied end frame, then all motion eases to stillness and the final frame holds perfectly steady for the last second, ready for a seamless transition to the static game cover. The supplied end frame is the final visual target. Keep the illustrated game-cover style.

No camera movement, no cuts, no zoom, no turning, no walking, no sliding feet, no extra characters, no costume changes, no text, menus, logos or added visual effects.
```

## สิ่งที่เปลี่ยนจาก prompt เดิม

| ของเดิม | ของใหม่ |
|---|---|
| หมุนตัว 180 องศา หันหลัง | ยืนนิ่ง หันหน้าตลอด ห้ามหมุน |
| เดินห่างกล้องเข้าหาบัลลังก์ | ไม่เดิน เท้าไม่ขยับ (ตัดความเสี่ยงเท้าลื่น/ลอย) |
| ซ่อนหน้าด้วยความมืด | หน้าค่อยๆ สว่างขึ้นจากความมืด (หน้ากังวลเป็นจุดขายของ v5) |
| ฉากสว่างหลังหมุนตัว | แสงไฟสว่างขึ้นต่อเนื่องจากต้นคลิป |
| กล้องถอยเผยฉาก | คงไว้ แต่เป็นการเคลื่อนไหวหลักเพียงอย่างเดียว บอกทิศ (ถอยตรง เลื่อนขวาเล็กน้อย) |
| จบที่ end frame ค้าง 1 วินาที | คงไว้ เพิ่มให้การเคลื่อนไหวรอบข้างค่อยๆ นิ่งก่อนค้าง |
| รายการห้าม | คงไว้ เพิ่ม: ห้ามหมุนตัว ห้ามเดิน ห้ามเอียงหน้าหนี ห้ามขยับปาก ห้ามเป็นภาพเหมือนจริง |

## เคล็ดลับตอนเจนวิดีโอ

- เจน 3-4 seed แล้วเลือกเฟรมสุดท้ายที่ตรง v5 ที่สุด ปรับทีละอย่าง
- ถ้าโปรแกรมมีตั้งค่า motion strength ให้ใช้ต่ำถึงกลาง และถ้ามีช่อง camera control ให้ตั้งเป็นถอยหลัง (zoom out/dolly out) ให้ตรงกับ prompt ไม่ให้ขัดกัน
- ถ้ายมบาทเริ่มขยับเท้าหรือหันหน้าหนี ให้เสริมคำสั่งห้ามซ้ำท้าย prompt หรือสลับไปใช้ตัวเลือกสำรอง
- ถ้าตัวละครข้างๆ ผุดมาช้า/ไม่ตรงตำแหน่ง ให้ลดรายการตัวละครในประโยคเผยฉากเหลือแค่กลุ่มหลัก (บัลลังก์ เสมียน ปีศาจแดง) เพราะ end frame ดึงที่เหลือเข้ามาเองได้

อ้างอิงแนวทาง prompt image-to-video: https://magichour.ai/blog/how-to-keep-characters-consistent-in-ai-video และ https://www.cliprise.app/learn/guides/best-practices/image-to-video-prompt-guide
