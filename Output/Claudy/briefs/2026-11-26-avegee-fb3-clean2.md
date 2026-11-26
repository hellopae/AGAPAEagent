# ใบงาน Dale — FB3-CLEAN2 ลบไฟล์กลุ่มไม่แน่ใจ A1–A3 A5 A6 · 26 พ.ย. 2569

## บริบท
ต่อจาก CLEAN (`Output/Dale/2026-11-26-avegee-fb3-clean.md` ตาราง "ไม่แน่ใจ" A1–A6)
คุณเป้ตอบ 26 พ.ย. (รอบ 2): **"ถ้าไม่ได้ใช้ลบได้เลยครับ"**
→ ลบกลุ่มที่เกมไม่ได้ใช้จริง: **A1 A2 A3 A5 A6** · **A4 (ศิลป์ CyberHell ที่เตรียมไว้เปิด skin โซน 4) เก็บไว้** เพราะเป็นงานที่วางแผนจะใช้ ไม่ใช่ของเลิกใช้

## ที่ทำงาน
repo `/Users/agapae/agapae-work/AVEGEE` · branch ใหม่จาก origin/main ล่าสุด (หลัง T4 merge) · ห้ามแตะ clone ของ Codex (`Documents/Work PAE/Claude/AVEGEE`)
ระวัง: Toby อาจทำงานใน worktree `~/agapae-work/.toby-worktrees/fb3` — งานนี้ทำก่อน T5 เริ่ม (Claudy จะรอให้เสร็จ)

## ขอบเขต
1. **A1** `nira-combat/nira-*-sheet-v1.webp` ×4 — ลบ + แก้เทสต์ `p9-art-insert` ที่ล็อก "v1 kept"
2. **A2** `frontier-route/zone1-2-v4.webp` (ตัดออกจาก `preload-catalog.json` ด้วย) + `zone1-2-v5.webp`
3. **A3** `theme-v4/town-tree{,-b,-c}-asia-v1`
4. **A5** ชุดพื้น rollback ที่ไม่ได้ใช้ (ใช้อยู่จริงชุดเดียวต่อโซน — ตรวจ `ZONE*_GROUND_SET` ใน `zone-skin.js` ก่อน ห้ามลบชุดที่ active) — ลบรายการลงทะเบียนในโค้ด + เทสต์ที่ล็อกว่าต้องอยู่บนดิสก์ · comment บอกว่าย้อนได้จาก git commit ไหน
5. **A6** พื้นเก่าที่สคริปต์ครั้งเดียวอ่าน — ลบ (เก็บ `flow-v4.png` ที่ใช้อยู่) · สคริปต์ที่อ้างถึงใส่ comment ว่าภาพอยู่ใน git commit ไหน
- ไฟล์ที่ไล่แล้วพบว่า **ยังใช้จริง** (โค้ดเรียก/ชื่อประกอบแบบไดนามิก) → ไม่ลบ จดในรายงาน
- ห้ามลบนอก A1 A2 A3 A5 A6

## ส่งงาน
เทสต์เต็มรอบ `node --test --test-concurrency=6 tests/*.test.mjs > "$TMPDIR/t.log" 2>&1` grep `ℹ (tests|pass|fail|cancelled)` · scan 404 ทุกภาพที่โค้ดเรียก = 0 · เปิดเกมดู 4 โซน (Chromium 1792×1120) พื้นขึ้นครบ · merge main push · deploy Pages สำเร็จ + ขนาด artifact ก่อน/หลัง · รายงาน `Output/Dale/2026-11-26-avegee-fb3-clean2.md`

## เกณฑ์รับงาน
1. ลบครบ A1 A2 A3 A5 A6 (ยกเว้นที่พบว่าใช้จริง พร้อมเหตุผล) · A4 อยู่ครบ
2. 404 = 0 · พื้น 4 โซนขึ้นปกติ
3. เทสต์เต็มรอบผ่าน · deploy สำเร็จ · รายงานขนาดที่ได้คืน
