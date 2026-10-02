# AVEGEE 28B — รีวิว + merge (สถานะ: เสร็จ merge + push + live)

## ผลรีวิว (branch `toby/28b`: `e93b80c` + `b0924d7`, ฐาน `f075d79`) — PASS
| # | เกณฑ์ | ผล |
|---|---|---|
| 1 | ตารางก่อน/หลัง · โซน 2<3<4 | ผ่าน — ค่าทั้งหมดอยู่ที่ `FOE_SCALE` ใน data.js ที่เดียว (`scaleFoeHp/scaleFoeAtk`) · ตารางในรายงาน Toby + เทสต์ `balance28b` เช็คทุกแถว |
| 2 | ยังชนะได้ | ผ่าน — บอตจำลอง: 11 ฉากอีเวนต์/บอส 100%, ศึกสุดท้าย 78–86% (เกณฑ์ ≥70%) |
| 3 | น้ำมนต์ซื้อ/ใช้ได้ | ผ่าน — พ่อค้า 45 เบี้ย เติม MP 30 · กระเป๋า + จุดพักศึกสุดท้าย + เตรียมศึกบอส (เทสต์) |
| 4 | หน้าต่างรางวัลไม่ซ้อน | ผ่าน — `afterReward` ห่อ callback ท้ายฉาก; ของ 28A `afterBreachBattle` ที่ poll `dlg.open` ก็รอกล่องรางวัลปิดก่อนเปิดแผนที่ชายแดน (ไม่ชนกัน) |
| 5 | เทสต์/check | ผ่าน |

ข้อสังเกต: Toby ไม่คูณ HP ศัตรูธรรมดาในอีเวนต์ (MP เป็นคอขวด จำลองแล้วชนะตก 100%→2%) ใช้ ATK แทน · เป็นการตัดสินใจเชิงออกแบบที่มีเหตุผล · ข้อเสนอเพิ่มน้ำมนต์ในวงคำสั่งต่อสู้/จุดพักที่ 3 ยังไม่ทำ (Claudy/คุณเป้ตัดสิน)

## Merge
- **Merge commit `0defd61`** (--no-ff) เข้า main — **ไม่มี conflict** กับ 28A/28C/hotfix
- ตรวจแล้ว: hotfix `String(f.sp ?? '').startsWith` ยังอยู่ (ui.js:2639) · `data-prep-water`/`prepWater` อยู่ครบ · ของ 28A (`afterBreachBattle`, ปุ่ม fin-float, clamp) ยังอยู่
- เทสต์บน main: `node --test tests/*.test.mjs` = **203/203 ผ่าน** · `node --check src/*.js` ผ่านทุกไฟล์ · `git diff --check` สะอาด
- push `163eb92..0defd61` main
- **manifest:** ไม่ได้เติมอะไร (`img/item-holywater.png` ยังไม่มี → ไม่ใส่ manifest ตามสั่ง) ไม่มี holywater ใน manifest

## 404 ของ item-holywater
`itemImg()` ใส่ `onerror` สลับเป็นป้าย SVG "MP" → UI ไม่พัง (มี 404 ของรูปเดียวตอนโหลดภาพ เป็นที่คาดไว้จนกว่า Codex วาดใน 28D) · ไอเท็มบนพื้น (scene.js drawStandee) ใช้ fallback glyph `🎁` ถ้าถูกใช้ ซึ่งน้ำมนต์ไม่อยู่ในตารางดรอปบนพื้น
(live ยืนยัน: `img/item-holywater.png` = 404 ตามคาด)

## Live
https://hellopae.github.io/AVEGEE/src/data.js มี `export const FOE_SCALE` (roam th 1/1, asia 1.15/1.1, west 1.3/1.2, cyberhell 1.45/1.3) หลัง deploy ~1.5 นาที

## ยังไม่ได้ทดสอบ
ไม่ได้เล่นศึกสุดท้ายผ่าน UI บน live และไม่ได้เทสต์มือถือจริง — Chris/คุณเป้ควรลองเล่นดูความยาก (ตามขั้นตอนใน `Output/Toby/2026-10-02-avegee-28b.md`)

## Rollback
`git revert -m 1 0defd61`
