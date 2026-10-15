# ใบงาน L4a: AVEGEE — ดาบดำที่ปักหน้าแท่น ห้องป่าดาบอสิปัตตะ ให้เหมือนดาบในภาพพื้นหลัง · suffix `-l4a`

## บริบท
- คำสั่ง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Kittanate-source/2026-10-15-avegee-l-requests.md` ข้อ 6 — **คุณเป้บอกแก้มาหลายรอบแล้ว** (เคยอยู่ในใบ J2 `Output/Claudy/briefs/2026-10-11-avegee-j2-art.md` ข้อ 2)
- ภาพที่คุณเป้วง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-15-avegee-l/l4-asipatta-swords.jpg`
  ดาบ 4 เล่มสีดำหน้าแท่น (วงฟ้า) เป็นแค่ polygon เรียบๆ → ต้องเป็น**ดาบแบบเดียวกับที่ปักอยู่ในภาพพื้นหลัง** (ลูกศรชี้): ใบดาบเหล็กเข้ม/เงินหม่น ขอบคม มีแสงสะท้อนลาวา ด้ามและโกร่งลายไทยทอง ปักเอียงลงพื้น
- พื้นหลังห้อง: `img/rooms-wide/th-dab.webp` (และ asia/west/cyberhell-dab) · ค้นใน `src/` ว่าดาบหน้าแท่นวาดจากไฟล์ภาพไหน หรือเป็น polygon ในโค้ด
- repo `/Users/agapae/agapae-work/AVEGEE` (worktree ของ run นี้)

## งาน
1. **ตรวจก่อน**: ตอนนี้ (main ล่าสุด) ดาบหน้าแท่นมาจากอะไร — ภาพ J2 ถูกวาดแล้วแต่ไม่ได้ใช้? หรือโค้ดยังวาด polygon? เขียนในรายงาน
2. วาด sprite ดาบปัก RGBA พื้นโปร่ง (อย่างน้อย 2 แบบ ให้ 4 เล่มไม่ซ้ำกันทั้งหมด) สไตล์/แสง/มุมมองเหมือนดาบในพื้นหลัง โดย crop ดาบจากพื้นหลังเป็นต้นแบบ
   - ทำครบทุกโซนที่ห้องนี้ใช้ (th / asia / west / cyberhell) ปรับโทนตามพื้นหลังแต่ละโซน
3. เสียบเข้าห้อง: แทน polygon/ภาพเดิม ตำแหน่งและจุดปักเดิม (ยมยังยืนหน้าดาบได้) · ห้าม `ctx.filter` ต่อเฟรม · เพิ่ม manifest/preload
4. cache-bust `-l4a` · `node --test tests/*.test.mjs` ผ่าน

## ข้อห้าม
ห้ามแก้ภาพพื้นหลังห้อง · ห้ามแตะ sprite/animation ยม, `town-*` · ห้าม commit/merge/push · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## เกณฑ์รับงาน
1. ภาพ composite ห้องจริง 4 โซน (PIL ได้) ดาบหน้าแท่นกลืนกับดาบพื้นหลัง ไม่ใช่ polygon
2. รายงาน: สาเหตุที่รอบก่อนไม่ติด, ไฟล์ที่เพิ่ม/แก้, prompt จริง, ผลเทสต์
