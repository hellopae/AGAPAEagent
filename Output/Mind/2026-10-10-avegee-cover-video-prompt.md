# AVEGEE cover video prompt v5 (ยมบาทหันหน้า) — Mind, 2026-10-10

End frame: `Output/Claudy/refs/cover-v5-full.png` (16:9)
ตัวละคร: `/Users/agapae/agapae-work/AVEGEE/img/hero-yama.png`
ไม่ได้แก้ไฟล์ใดใน repo AVEGEE

---

## ใช้ตัวนี้: ต่อจากวิดีโอเดิม (kling_20261008_VIDEO_The_main_c_2881_0.mp4)

คลิปใหม่ = ช่วงต่อ ไม่ใช่คลิปเต็ม
- Start frame = เฟรมสุดท้ายของวิดีโอเดิม: ยมบาทสไปรท์ pixel art หันหน้า ยืนกลางเฟรม บนพื้นดำสนิท มีแสงวงจางๆ
- End frame = cover-v5-full.png (สไตล์ illustration ยมบาทอยู่ซ้ายกลาง หน้าบัลลังก์พ่อ)
- ความยาวแนะนำ: **10 วินาที** ใน Kling (งานนี้มีทั้งกล้องถอยระยะไกล เผยฉากทั้งฉาก และเปลี่ยนสไตล์จาก pixel เป็น illustration ถ้าอัดใน 5 วินาทีจะกระชากและเฟรมสุดท้ายมักไม่ตรง)

### สิ่งที่คลิปนี้ต้องทำ (ภาษาไทย)
1. ยมบาทยืนที่เดิม หันหน้าตลอด ไม่หมุน ไม่เดิน เท้าไม่ขยับ ขยับแค่หายใจ กะพริบตา
2. ความมืดรอบตัวค่อยๆ สว่างด้วยแสงไฟลาวา ฉากปรากฏจากแสง (บัลลังก์พ่อ กลุ่มตัวละคร ลาวา ภูเขาไฟ ปราสาท สะพานวิญญาณ)
3. กล้องถอยตรงๆ และเลื่อนไปทางขวาเล็กน้อย ให้ยมบาทเล็กลงและไปจอดซ้ายกลางตามตำแหน่งใน v5
4. การเรนเดอร์ค่อยๆ เปลี่ยนจาก pixel sprite เป็นสไตล์ภาพปก (เส้นขอบ pixel นุ่มขึ้น รายละเอียดชัดขึ้น) พร้อมกับที่แสงสว่างขึ้น ไม่ใช่การตัดภาพ
5. จบตรง v5 ค้างเฟรมสุดท้าย 1 วินาที แล้วต่อเข้าภาพปกนิ่ง

### Prompt (ก๊อปไปวางได้เลย)

```
Continue directly from the start frame: Yama, the small red-skinned young demon in pixel-art style, standing front-facing in the center of a black void, holding a closed red ledger against his chest with both arms. Preserve his tall gold Thai crown, small red horns, black robe with gold trim and red center panel, bare feet, and his worried, wide-eyed expression. The first frames are identical to the start frame, with no fade-in and no jump.

Yama stays standing on the same spot for the entire video and faces the viewer from the first frame to the last. He does not turn, walk or step; his feet never move. His only motion is small and natural: slow breathing, a soft blink, a slight anxious tightening of his grip on the ledger, and a gentle sway of his robe. His mouth stays closed.

Warm ember firelight slowly rises from below and behind him, and the surrounding darkness gradually gives way to the environment. As it does, the rendering smoothly transitions from the pixel-art sprite into a richly detailed, painted illustrated game-cover style: pixel edges soften, shading and detail resolve, and Yama keeps exactly the same design, colors and proportions throughout.

Camera: one smooth, steady move. The camera slowly pulls straight back from Yama and drifts a little to the right, so that he grows smaller and settles toward the left-center of the frame. No rotation, no orbiting, no zoom jumps.

As the camera pulls back, reveal the environment progressively through light, always keeping Yama in place: first the red-and-gold throne directly behind him with his father, the dark-skinned king in gold armor seated on it holding a golden staff; then the lavender female clerk holding a stack of papers on the left, the stout red demon with a spiked cudgel on his shoulder on the right, and the small flame-haired demon beside him; then the elevated stone judgment platform, rivers of lava, the distant volcano and fortress, the green armored guard far right, and the diagonal stone bridge with a queue of pale blue praying spirits who sway very gently. Lava glow and torch flames flicker softly, using only the glow, flames and embers already present in the end frame. Keep character identities and costumes consistent.

Settle into the EXACT composition of the supplied end frame: same camera angle, framing, character positions, proportions, colors and environment, with Yama standing facing the viewer in front of his seated father's throne, ledger held against his chest. By this point the rendering fully matches the illustrated game-cover style of the end frame. Stop all camera movement and let all motion ease to near-stillness, then hold the final frame perfectly steady for the last second, ready for a seamless transition to the static game cover. The supplied end frame is the final visual target, not merely a style reference. Do not redesign, rearrange or crop it.

No cuts, no sudden transformations, no turning around, no walking, no sliding feet, no floating, no head turns away from the viewer, no talking or lip movement, no extra main characters, no costume changes, no text, menus, logos or added visual effects.
```

### เคล็ดลับ
- ตั้งความยาว 10 วินาที ใช้โหมด start + end frame ตั้ง motion/creativity ต่ำถึงกลาง ถ้ามีช่อง camera control อย่าตั้งอะไรที่ขัดกับ "ถอยตรง"
- เจน 3-4 seed เลือกอันที่เฟรมสุดท้ายตรง v5 และเท้ายมบาทไม่ขยับ ถ้าสไตล์เปลี่ยนแบบตัดภาพ (pixel หายวับ) ให้เพิ่มประโยค "the transition from pixel art to illustration is gradual and continuous across the whole clip" ท้ายย่อหน้าที่ 3
- ถ้าตัวละครข้างๆ ผุดช้าหรือตำแหน่งเพี้ยน ลดรายการในประโยค reveal เหลือบัลลังก์ เสมียน ปีศาจแดง เพราะ end frame ดึงที่เหลือเข้ามาเอง

### หมายเหตุขนาด (ให้ Claudy ตรวจ)
ผมดู last.jpg และ sheet.jpg แล้ว สไปรท์ในเฟรมสุดท้ายดูสูงราว 85-90 เปอร์เซ็นต์ของเฟรม ไม่ใช่ 40-45 เปอร์เซ็นต์ ถ้าเป็นแบบนี้กล้องต้องถอยประมาณ 3 เท่าถึงจะได้ขนาดใน v5 (ราว 28 เปอร์เซ็นต์) ซึ่งเป็นเหตุผลเพิ่มที่ควรใช้ 10 วินาที prompt ไม่ได้ระบุเลขขนาด จึงใช้ได้ทั้งสองกรณี

---

## (เก็บไว้อ้างอิง ไม่ใช้) ชุดแรก: เริ่มจากภาพเปิดใหม่ในความมืด

ชุดนี้เขียนก่อนรู้ว่ามีวิดีโอช่วงแรกแล้ว ต้องเตรียม start frame ใหม่ ใช้เฉพาะถ้าต้องทำคลิปเต็มโดยไม่ใช้วิดีโอเดิม

หลักคิดร่วม: ตัดการหมุน 180 องศา การเดิน และการซ่อนหน้า ทิ้ง เหลือยมบาทยืนนิ่งหันหน้า แสงขึ้น กล้องถอยอย่างเดียว

Start frame ที่ต้องเตรียม: 16:9, ยมบาทหันหน้าเต็มตัวสูง 55-65 เปอร์เซ็นต์ กลางเฟรม ท่ากอดสมุดแดงเหมือน v5 ฉากมืดเกือบดำ เห็นขอบทองบัลลังก์รางๆ ไม่มีตัวละครอื่น หน้ามีแสงส้มจางๆ สไตล์เดียวกับ v5

Prompt สร้าง start frame:

```
Same illustration style, character design and rendering as the reference cover. Close shot of Yama, the small red-skinned young demon, standing front-facing, full body with bare feet visible, centered in a 16:9 frame, about 60 percent of frame height. He holds a closed red ledger against his chest with both arms, worried wide-eyed expression. Tall gold Thai crown, small red horns, black robe with gold trim and red center panel. Very dark scene: near-black background with only the faint gold edge of a throne dais behind him and a few drifting embers. Faint warm orange ember light from below and behind, just enough to read his face. No other characters, no text.
```

### ตัวเลือกหลักชุดแรก (8-10 วินาที)

```
The main character is Yama, the small red-skinned young demon holding a closed red ledger against his chest with both arms. Preserve his tall gold Thai crown, small red horns, black robe with gold trim and red center panel, bare feet, and his worried, wide-eyed expression. He faces the viewer from the first frame to the last.

Yama stands still on the same spot for the entire video. He does not turn, walk or step; his feet never move. His only motion is small and natural: slow breathing, a soft blink, a slight anxious tightening of his grip on the ledger, and a gentle sway of his robe. His mouth stays closed.

The video opens in near darkness with Yama close to the camera. Warm ember firelight slowly rises from below and behind him, gradually revealing his face, his crown and horns, then the red ledger.

Camera: one smooth, steady move. The camera slowly pulls straight back from Yama, rising very slightly and drifting a little to the right, so that Yama grows smaller and settles toward the left-center of the frame. No rotation, no orbiting, no zoom jumps.

As the camera pulls back, reveal the environment progressively through light and widening frame, always keeping Yama in place: first the red-and-gold throne directly behind him with his father, the dark-skinned king in gold armor seated on it holding a golden staff; then the lavender female clerk holding a stack of papers on the left, the stout red demon with a spiked cudgel on his shoulder on the right, the small flame-haired demon beside him; the elevated stone judgment platform, rivers of lava, the distant volcano and fortress, the green armored guard far right, and the diagonal stone bridge with a queue of pale blue praying spirits who sway very gently. Lava glow and torch flames flicker softly; only the glow, flames and embers already present in the end frame. Keep character identities and costumes consistent and keep the illustrated game-cover style throughout, never photorealistic.

Settle into the EXACT composition of the supplied end frame: same camera angle, framing, character positions, proportions, colors and environment, with Yama standing facing the viewer in front of his seated father's throne, ledger held against his chest. Stop all camera movement and let all motion ease to near-stillness, then hold the final frame perfectly steady for the last second, ready for a seamless transition to the static game cover. The supplied end frame is the final visual target, not merely a style reference. Do not redesign, rearrange or crop it.

No cuts, no sudden transformations, no turning around, no walking, no sliding feet, no floating, no head turns away from the viewer, no talking or lip movement, no extra main characters, no costume changes, no text, menus, logos or added visual effects.
```

### ตัวเลือกสำรองชุดแรก: กล้องล็อก แสงเปิดฉาก (5-6 วินาที)

Start frame = v5 ที่ปรับให้มืดเกือบดำ เหลือแสงส้มจางๆ ที่หน้ายมบาท

```
Locked camera, completely static framing, identical to the supplied end frame throughout. The scene begins almost completely dark. Yama, the small red-skinned young demon in the center-left, stands facing the viewer holding a closed red ledger against his chest, his face faintly lit by ember light. He stays in place and keeps his pose: only slow breathing and a soft blink.

Light spreads outward from Yama across the scene: first the throne and his seated father, then the clerk, the stout demon with the cudgel and the small flame-haired demon, then the lava, the volcano, the fortress and the bridge with its queue of pale blue spirits, who sway very gently. Lava glow and torch flames flicker softly.

The scene reaches the full brightness and exact composition of the supplied end frame, then all motion eases to stillness and the final frame holds perfectly steady for the last second, ready for a seamless transition to the static game cover. The supplied end frame is the final visual target. Keep the illustrated game-cover style.

No camera movement, no cuts, no zoom, no turning, no walking, no sliding feet, no extra characters, no costume changes, no text, menus, logos or added visual effects.
```

## สิ่งที่เปลี่ยนจาก prompt เดิมของคุณเป้
- ตัดการหมุนตัว การเดิน และการซ่อนหน้าด้วยความมืดออก
- การเคลื่อนไหวหลักเหลือกล้องถอยอย่างเดียว ระบุทิศ (ถอยตรง เลื่อนขวาเล็กน้อย)
- คงไว้: รายละเอียดตัวละคร เผยฉากด้วยแสง จบตรง end frame ค้าง 1 วินาที รายการห้าม
- เพิ่ม: การเคลื่อนไหวค่อยๆ นิ่งก่อนค้างเฟรม ห้ามหมุนตัว/เดิน/หันหน้าหนี/ขยับปาก

อ้างอิงแนวทาง prompt image-to-video: https://magichour.ai/blog/how-to-keep-characters-consistent-in-ai-video และ https://www.cliprise.app/learn/guides/best-practices/image-to-video-prompt-guide
