---
name: deploy-pages
description: Deploy โปรเจกต์ขึ้น GitHub Pages พร้อมกันหน้าขาว/stall — ใช้เมื่อต้อง deploy เว็บใหม่, dashboard ไม่อัปเดต, หรือ Pages แสดงหน้าขาว
---

# Skill: deploy-pages

รวมบทเรียนที่จ่ายค่าเรียนมาแล้วทั้งหมด (อ้างอิง `SOP/SOP-07-worklog-dashboard.md` §Pages Gotchas)

## Deploy ครั้งแรกของ repo

1. `.nojekyll` ไฟล์เปล่าที่ root ของสิ่งที่ deploy — **ทำก่อนอย่างอื่น** ไม่มีไฟล์นี้ = Pages stall
2. Vite app: ตั้ง `base: "/<ชื่อ-repo>/"` ใน `vite.config` (ยกเว้นใช้ custom domain → `base: "/"`)
3. Push ขึ้น GitHub แล้วตั้ง Pages source: Settings → Pages → branch `main` / root
   (หรือ `gh api repos/<owner>/<repo>/pages -X POST` — token อยู่ใน keychain เครื่องนี้)
4. Custom domain (agapaedesign.com, 2richmap.com): ต้องมีไฟล์ `CNAME` ใน branch ที่ deploy
5. รอ 1-2 นาที แล้วเปิด URL จริงทดสอบ — อย่าประกาศเสร็จก่อนเห็นหน้าเว็บขึ้นจริง

## Debug หน้าขาว (ไล่ตามลำดับ)

1. View source บน URL จริง — HTML มาไหม?
   - ไม่มา/404 → Pages source ยังไม่ตั้ง หรือ build ยังไม่เสร็จ (เช็ค Actions tab)
   - มาแต่ขาว → ข้อ 2
2. Console มี 404 ของ JS/CSS ไหม → `base` ผิดใน `vite.config` (พบบ่อยสุด)
3. Asset โหลดแต่หน้ายังขาว → JS error ใน console (มักเป็น env/config ที่ production ไม่มี)
4. แก้แล้ว push แล้ว "ยังเหมือนเดิม" → hard refresh / cache bust (`?v=2`) ก่อนสรุปว่ายังพัง
5. ทุกอย่างถูกแต่ stall นาน → เช็ค `.nojekyll` ยังอยู่ไหม

## หลัง deploy สำเร็จ

- ทดสอบบนมือถือ (จอแคบ) + เช็คฟอนต์ไทย render
- บันทึกผลใน `Output/Dale/` หรือ `Output/Nick/` + worklog ต้องมี entry (skill `worklog-sync` ถ้า hook พลาด)
- รายงาน URL จริงให้ Kittanate พร้อมสิ่งที่ deploy
