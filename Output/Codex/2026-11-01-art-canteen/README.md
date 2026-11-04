# ART-CANTEEN — รอตรวจรับ

Branch `codex/2026-11-01-art-canteen` จาก main ในเครื่อง `6f2328b8` (มี B23 แล้ว; B34 ยังรออนุญาตแก้ conflict)

- วาดใหม่ด้วย built-in imagegen ครบ 4 โซน: ไทย, เอเชียหลังคาหยก, เมืองหิมะแบบ Gothic, cyberhell โลหะดำ/cyan/ม่วง
- ไฟล์ชื่อเดิม `img/food-art/canteen-{th,asia,west,cyberhell}.webp` ครบ 768×640 RGBA โปร่งใสจริง
- ขยายภาพ 8% เฉพาะการวาด; ไม่เปลี่ยน def.bw, hit boxes, จุดวางอาคาร, ประตู หรือจุดพ่อค้า
- วัด solid alpha foot จากไฟล์ใหม่เพื่อยึดฐานที่ bx/by เดิม ไม่ให้ช่องโปร่งใสทำให้อาคารลอย; คงการกลับด้าน th/asia/cyberhell ตามเดิม
- หลักฐานจาก scene.render จริงบน native canvas ครบ 4 โซน ทั้งภาพรวมเมืองและระยะใกล้ เปรียบเทียบ main เดิมกับ worktree ใหม่ ไม่ใช่ภาพตัดต่ออาคารวางบนพื้นเอง
- หลังโหลด alpha จริงและสร้าง collision แล้ว ประตูโรงอาหารและพ่อค้าเดินถึงได้ครบทั้ง 4 โซน; พิกัดฐานและประตูเท่าของเดิมทุกโซน ดู before-runtime.json / after-runtime.json
- food-a และ z4-town-a ผ่าน 19/19; full suite ผ่าน 1786/1786, 0 fail (`tests-full.log`)
- Native renderer ไม่ใช่ browser/CSS/GPU หรือการวัด FPS มือถือจริง; รอตรวจรับภาพในเกมจริง
- ยังไม่มี commit/push/merge งาน ART-CANTEEN และไม่มีผล Reese/Chris

ภาพ: th-before-after.png, asia-before-after.png, west-before-after.png, cyberhell-before-after.png
ไฟล์ alpha/ฐาน: asset-qa.json · ภาพก่อนแก้: before/ · ภาพ imagegen ต้นฉบับ: generated/

Prompt/specification: repaint each existing 768×640 canteen as an isometric three-quarter transparent fantasy game sprite, keep camera/light/footprint and bottom-center foot, theme-specific Thai/Asian/snowy Gothic/cyberhell architecture, clear doorway, compact serving counter and dining area, no people/text/background; deliver same filename. Built-in image_gen only; converted generated RGBA to lossless WebP preserving alpha and original dimensions.

คิวต่อไป ART-DAIS2 กำลังทำ; ไม่แตะ status.json/worklog.json/work-mode.json
