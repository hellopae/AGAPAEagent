# AVEGEE merge7 — 29 ต.ค. 2569

Live: https://hellopae.github.io/AVEGEE/ · main 5993a55 · Pages success · full tests 1669/0 fail

## Merge แล้ว (4 จาก 5)
- FOOD-ART 5fe9ef32 — ภายในโรงอาหาร + ข้าวปั้น (ภาพ: food-art-canteen-interior.png)
- CLEAN-404 58e7a10b — ไม่ probe ไฟล์ที่ไม่มี + HP ศัตรูมือถือ (ภาพ: clean404-battle-390.png) · แก้เทสต์ h5a-cover-video ให้ตามการเอา img/cover.png ออก
- SIG-ART 33e5fdd8 — ภาพอาร์ก img/story-sig/ ไม่มีโค้ด
- ART-GRACE 34c14227 — ผูกเฉพาะ profile/standing/cutscene/idle/sit (-f) · walk + combat atlas ยังเป็นร่างใน output/coordination/2026-10-29-art-grace/ ไม่ผูก คงของเดิม (ภาพ: art-grace-west-team-panel.png)

## ไม่ merge — MAP-B12 7e44a153 (FIX LIST)
1. ความละเอียดภาพยังเท่าเดิม 1672x941 (เกณฑ์ขอ 2 เท่า / Codex รายงานเองว่าเครื่องมือคืนขนาดเดิม)
2. ความกว้างทางไม่สม่ำเสมอ: ความหนาพื้นเดินตามสันกลาง (px ที่ 1672) median 22 -> 30, p25 16 -> 17, p10 14 -> 13; ช่วงแคบ 1 ใน 4 ไม่กว้างขึ้น · ทางตะวันตกแคบลง (0.69x ตามรายงานของ Codex)
3. ตัวละครสูง ~31-44 px กว้าง ~20 px สองคนเดินสวนต้องการ ~40 px — ผ่านแค่ ~p90 ของเส้นทาง
4. ที่ผ่าน: mask ผืนเดียว, เดินจริง 3 ด่าน+ถ้ำ+ปลายทาง (b12-border-pilot.test), ภาพดูดีกว่าเดิมชัด (ภาพ: b12-NOT-MERGED-route-1280.png ซึ่งถ่ายตอนลอง merge ชั่วคราว)
- branch/worktree 7e44a153 และ b27beb05 ยังอยู่ (ไม่ล้าง) · ถ้าเจ้าของอยากรับเป็น pilot: merge ได้ ชน index.html แค่ ?v= ของ battle-fx-tex/training (เอาฝั่ง main) + ambient=20261029-map-b12

## Rollback
git revert -m 1 <merge commit> ของแต่ละงาน (FOOD-ART 9deb4db, CLEAN-404 0a5d8bd, SIG-ART b8d0eae, ART-GRACE 782a8bd)

## หมายเหตุตรวจ
- console/network ไม่มี 404 ในเมือง + ฉากต่อสู้ 390x844 (เหลือแค่ intro-opening-v3.mp4 / blob ที่ headless chromium เล่นวิดีโอไม่ได้ ไม่เกี่ยวกับงานนี้)
- ภาพ Grace: ถ่ายจากพาเนลจัดทีมโซนตะวันตก (ไม่ได้เดินบนแผนที่ เพราะจัดตำแหน่งตัวละครไม่ได้ในสคริปต์)
- port 8791 มี server ของใครไม่ทราบรันอยู่ ไม่ได้แตะ ใช้ 8793 แทนแล้วปิดแล้ว
