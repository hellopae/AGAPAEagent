# ใบงาน L4b: AVEGEE — ไอคอนชุดประจำโซนในร้านพ่อค้านรก (โซน 2/3/4) · suffix `-l4b`

## บริบท
- คำสั่ง: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Kittanate-source/2026-10-15-avegee-l-requests.md` ข้อ 9
- ภาพ: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-15-avegee-l/l4-merchant-outfit-icon.jpg` — "ชุดบูรพา" ใช้ไอคอนสำเร็จรูป (emoji กิโมโน) ไม่เข้ากับไอคอนสินค้าอื่น (น้ำชา กล่องยา ข้าวปั้น ดอกบัว น้ำมนต์ — ภาพวาดจริง)
- ชุดของยมแต่ละโซนมีภาพตัวละครอยู่แล้ว (ค้น `hero-yama-*` / outfit ใน `src/` และ `img/Asia`, `img/West`, `img/CyberHell`) — ใช้เป็นต้นแบบหน้าตาชุด
- repo `/Users/agapae/agapae-work/AVEGEE` (worktree ของ run นี้)

## งาน
1. หาว่าร้านมีชุดอะไรบ้าง (โซน 2 บูรพา/Asia, โซน 3 West, โซน 4 CyberHell — ยืนยันชื่อจริงจากโค้ด) และไอคอนสินค้าอื่นใช้ไฟล์ขนาด/สไตล์อะไร
2. วาดไอคอนชุดละ 1 ไฟล์ สไตล์เดียวกับไอคอนสินค้าที่มีอยู่ (ภาพวาดพิกเซล-กึ่งสมจริง พื้นโปร่ง มุมเฉียงเล็กน้อย) — ชุดพับ/แขวน หรือหุ่นใส่ชุด ให้จำได้ว่าเป็นชุดของโซนนั้น (ลาย สี เครื่องประดับตรงกับภาพยมชุดนั้น) ขนาดเท่าไอคอนสินค้าเดิม
3. แทน emoji ในร้าน (และที่อื่นที่แสดงชุดนี้ เช่น กระเป๋า/ตู้ชุด ถ้ามี) · manifest/preload · cache-bust `-l4b` · `node --test tests/*.test.mjs` ผ่าน

## ข้อห้าม
ห้ามแก้ sprite/animation ยม · ห้ามแก้ราคา/กติกาการซื้อ · ห้าม commit/merge/push · ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`

## เกณฑ์รับงาน
contact sheet ไอคอนใหม่ข้างไอคอนสินค้าเดิม + ข้างภาพยมชุดนั้น · ภาพร้าน (PIL composite ได้) · prompt จริง · ผลเทสต์
