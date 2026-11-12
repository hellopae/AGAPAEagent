# ใบงาน Toby — แถบ "มีเวอร์ชันใหม่" ที่หน้า Home · 12 พ.ย. 2569
คุณเป้: "ใส่เพิ่มในหน้า Home ได้เลย" — เหตุ: แท็บเก่าค้างหลัง deploy ขอไฟล์ชื่อเดิม รูปหาย (รายงาน `Output/Toby/2026-11-12-avegee-cook-anim-and-polish.md`)
## ขอบเขต
1. ตอน build ใส่เลขเวอร์ชัน (เช่น commit/วันที่) ลงไฟล์เล็ก `version.json` (อยู่ใน allowlist deploy — แก้ `.github/workflows/pages.yml` ถ้าต้อง) + ค่าในโค้ด
2. เกมเช็ค `version.json?t=<now>` ตอนเปิดหน้า Home, ทุก 10 นาที และตอนแท็บกลับมา visible · ถ้าไม่ตรง → แถบที่หน้า Home: **"มีเวอร์ชันใหม่ แตะเพื่อโหลดใหม่"** (อังกฤษ: "New version available — tap to reload") สไตล์ทองเข้ากับหน้า Home ไม่บังปุ่ม START
3. ระหว่างเล่น (ไม่อยู่หน้า Home): แค่ไอคอนเล็กมุมจอ ไม่ขัดจังหวะ · แตะ = เซฟก่อนแล้ว reload
4. ถ้าเจอรูปโหลดไม่ขึ้น (404) ระหว่างเล่นและเวอร์ชันไม่ตรง → แสดงแถบทันที
5. offline/เช็คพลาด → เงียบ ไม่แสดง error
## ที่ทำงาน / ข้อห้าม
worktree `~/agapae-work/.toby-worktrees/z1-v5` (= main c103c77c) · ห้ามแตะ AVEGEE หลัก/LaunchAgent · Claudy merge main เอง
## ส่งงาน
`Output/Toby/2026-11-12-avegee-update-banner.md` · commit · push branch · เทสต์ทั้งหมดผ่าน · ภาพหน้า Home 390/1792 ตอนแถบขึ้น
