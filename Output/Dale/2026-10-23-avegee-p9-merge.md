# Dale — AVEGEE P9 merge: เสียบภาพ Codex รอบ 23 ต.ค.

## สรุป
- merge `toby/p9-art-insert` (4f2f42e) เข้า main ด้วย `--no-ff` → **a7f06e9** (จาก 272cf1f) · push origin/main สำเร็จ
- Pages run `39892091821` (pages build and deployment) = success · URL `https://hellopae.github.io/AVEGEE/`
- เทสต์บน main หลัง merge: `node --test tests/*.test.mjs` = **1369 pass / 0 fail** (ไม่มี build step, เกมเป็น static)

## ผลรีวิว (4 ข้อตามใบงาน)
1. diff = สลับ path เป็น v2 (นิรา 4 โซน, คนงาน asia/west/cyberhell, ม้าทรอย cyberhell, ภาพชม/ตำหนิหัวหน้าโซน 2-4 ใน VERDICT_ART) + เอาการพลิก idle/hurt ของนิราออก (`niraPoseFacesRight`, v1 ยังคงพฤติกรรมเดิม) + ตารางสเกลคนงานต่อโซน + manifest cache key `night-v1-p9` (3 ไฟล์ src + importmap bust) · ไม่มีตัวเลขเกม (ดาเมจ/ราคา/เวลา) เปลี่ยน
2. ไฟล์ภาพใหม่ 15 ไฟล์ — เทียบ blob hash ตรงกับ branch Codex ทุกไฟล์: nira ← `0007*` (57eb77b9, 848d07ed) · worker asia/west/cyberhell ← 3e1be997, 69d28762, e545ce1b · ม้าทรอย ← 0f296a44 · head ← `0039*` ทั้ง 3 · ไม่มีโค้ด Codex (ไฟล์ที่ไม่ใช่ภาพทั้งหมดเป็นของ Toby)
3. แก้เทสต์เดิม 5 ไฟล์ (nira-combat, o2-battle-audit, p3-verdict-scene, p5b, p5c) — ตรวจแล้วเป็นการปรับให้ตรงของใหม่ ไม่ลดมาตรฐาน: assert path v1→v2, กฎหันหน้าแทนที่ด้วยฟังก์ชันที่ assert ตรงๆ, เคส "โซน asia ใช้ v1" ถูกแทนด้วย "โซนไม่รู้จักใช้ v1" (ยังเทสต์ fallback), regex cache-bust ผ่อนเฉพาะ suffix `-p9` · เพิ่ม `tests/p9-art-insert.test.mjs` 10 เทสต์
4. เว็บจริง 390×844 (Playwright, mobile): ไม่มี pageerror · โหลด `nira-{th,asia,west,cyberhell}-sheet-v2`, `worker-{th,asia,west,cyberhell}-sheet-v2` จริง ไม่มีการขอ v1 ของ nira/worker/boss-frontier · live manifest ชี้ `boss-frontier-v2.webp` (200, 1,809,232 ไบต์) · ภาพหัวหน้าโซน 2-4 ชม/ตำหนิ 6 ภาพ decode ได้ กว้าง 1672 · scrollWidth 390 (ไม่เลื่อนแนวนอน) · 404 ที่เหลือมีอยู่ก่อนแล้ว (`audio/bgm-*.ogg`, `img/hero-yama-side.png`)
- ข้อจำกัดการตรวจ: ฉากรบจริงบนเว็บไม่ได้เล่นสด (ต้อง state เกม) — เมานต์สไปรต์นิราผ่านโมดูลจริงของเว็บ, วาดคนงาน, เช็ก manifest แทน · หลักฐานฉากรบเต็มอยู่ใน `Output/Toby/p9-evidence/`
- ข้อสังเกตจาก Toby ที่ยังเปิด: ภาพชม asia อาจสว่างน้อยกว่าที่คุณเป้ชอบ (ส่วนบน luma 53.8 vs ลงโทษ 49.4); ยังไม่ผ่าน chris-culture (งานผู้ตรวจ)

## วิธีตรวจ / roll back
- ตรวจ: เปิด `https://hellopae.github.io/AVEGEE/index.html` ที่ 390 px แล้วเข้าศึกชายแดนที่มีนิรา (ต้องหันหาศัตรูทุกท่า) · บอสโซน 4 ท่าโจมตี (ม้าตัวเดียว) · ให้ 5 ดาว/ตัดสินแดงในโซน 2-4 (ภาพชม/ตำหนิ)
- roll back: `git revert -m 1 a7f06e9` แล้ว push (กลับ 272cf1f) · ภาพ v2 ที่เหลือเป็นไฟล์เสริม ไม่กระทบ

## สิ่งที่ล้าง
- worktree + branch local: `.toby-worktrees/p4` (toby/p4-build, merge แล้วที่ 272cf1f) · `.toby-worktrees/p9` (toby/p9-art-insert)
- worktree Codex 14 อัน + branch local + branch remote `codex/*`: `20261021T172150Z-67a0cee8` (b91355e), `…172153Z-6cfa3ba6` (d2450db), `…172156Z-04256945` (2095cd5), `…172200Z-c723f4eb` (9d73d23), `…172858Z-598eb176` (03d9534), `20261023T000745Z-57eb77b9` (20c59a7), `…000749Z-848d07ed` (8f15919), `…000753Z-3e1be997` (22ce210), `…000757Z-69d28762` (c2ba137), `…000801Z-e545ce1b` (251f255), `…000805Z-0f296a44` (fd92b4a), `…003947Z-a0b3db23` (932d341), `…003951Z-1b4c6834` (722bfc6), `…003955Z-552b719b` (076904f)
- ตรวจก่อนลบ: ทุก worktree สะอาด (dirty 0) · ไฟล์ที่ไม่ใช่ `output/` ของทุก branch อยู่ใน main ตรง blob · **สิ่งที่หายไปพร้อม branch** = ไฟล์ `output/art-queue-2026-10-22|23/**` (prompt, ภาพกลางทาง, gif, verification) ของ Codex ซึ่งไม่เคยเข้า main — กู้ได้จาก SHA ปลาย branch ข้างบนผ่าน `git branch x <sha>` ตราบที่ git ยังไม่ gc (ราว 30 วัน)
- **ไม่ลบ:** `.codex-worktrees/20261023T0106*` (3 อัน: 26aabb0e, fc2043b3, 87aa7055 — ยังชี้ 272cf1f ไม่มี diff, ตามคำสั่งห้ามลบ) · worktree/branch `toby/*` และ `dale/*` อื่นที่ค้าง (p1-p7, n*, o*, m*) ไม่อยู่ในคำสั่ง ยังไม่แตะ · worktree `/private/tmp/n4/base` เป็น prunable (ของเก่า) ไม่แตะ
