# ใบงาน M1: AVEGEE — แผนที่โซนตอนซูมแตก/เบลอ (ตัวละคร วิญญาณ อาคาร)

- วันที่: 11 ต.ค. 2569 · ผู้ทำ: Codex (`--write`) · ผู้ตรวจ: Dale · ฐาน: main ล่าสุด
- ภาพคุณเป้: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-11-avegee-m/m1.png` (ซูมแล้วทั้งฉากเบลอ) · `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-11-avegee-m/m4.png` (วิญญาณข้างบัลลังก์แตกเป็นจุดๆ) · `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-11-avegee-m/m2.png` `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/assets/2026-10-11-avegee-m/m3.png`
- คุณเป้ถาม "ภาพดูแตกมาก ตั้งใจให้ดูเป็น pixel ใช่ไหม" → **ไม่ได้ตั้งใจ**

## ต้นเหตุที่ Claudy เจอ (ยืนยันก่อนแก้)
- `src/ui.js` ~140: ซูมแผนที่ (1× ↔ 2.5×) ทำด้วย **CSS transform ขยายกล่อง `.scene-box` ทั้งกล่อง** → canvas `#cv` ที่มีขนาด backing คงที่ (SCENE.w×SCENE.h)
  ถูกขยายเป็นภาพบิตแมป 2.5× (× devicePixelRatio 2 บน Mac) → ทุกอย่างบนแผนที่ รวมสไปรต์ 512px ที่จริงคมได้ ถูกยืดจากความละเอียดต่ำ จึงเบลอ/แตก
- ภาพพื้นแผนที่ `img/theme-v4/map-*.webp` มีแค่ 1678×937 — ที่ 2.5× ยังไงก็นุ่มกว่าสไปรต์ (ข้อจำกัดของต้นฉบับ)

## งาน
1. เปลี่ยนการซูมให้วาด **ใน canvas** แทน CSS scale: backing store = ขนาดที่แสดงจริง × devicePixelRatio (cap ที่ 2) ·
   ซูม/กล้องตามตัว = `ctx.setTransform(scale…, translate…)` · คงพฤติกรรมเดิม: กล้องตามนุ่ม 130ms, ไม่เกินขอบภาพ, ปุ่ม #hud-zoom 1× ↔ 2.5×, พิกัดคลิก/แตะถูกต้อง, ป้ายชื่อ/ปุ่ม DOM ที่ลอยบนแผนที่อยู่ตรงตำแหน่ง
2. วาดสไปรต์ (ยมฯ ทีม วิญญาณ NPC บอส อาคาร `img/map-v5/st-*`) จากไฟล์ต้นฉบับความละเอียดเต็มที่ขนาดปลายทางจริง → คม
   ตั้ง `imageSmoothingQuality='high'` สำหรับย่อภาพ (สไปรต์ 512px ถูกย่อ) — วิญญาณใน m4.png ต้องไม่เป็นจุดแตกๆ
3. พื้นแผนที่: วาด smoothing สูงสุดที่ทำได้ ไม่ต้องหาภาพใหม่ในรอบนี้ (Claudy จะเสนอคุณเป้เรื่องภาพแผนที่ 2× แยก)
4. ประสิทธิภาพ: แผนที่ยังลื่น 60fps บนเครื่อง dev · cache พื้น/อาคารที่ไม่ขยับเป็น offscreen ถ้าจำเป็น
5. ไม่แตะฉากต่อสู้/ห้อง/หน้า Home

## ข้อห้าม
- ห้ามแตะ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE` · ห้ามแก้ภาพ · ห้ามเปลี่ยนตำแหน่ง/ขนาดอาคาร (เป็นงาน M2 ที่ทำคู่ขนาน) · ห้าม commit/merge/push

## เกณฑ์รับงาน
1. ภาพก่อน/หลัง ซูม 2.5× จุดเดียวกัน (วิญญาณข้างบัลลังก์, ยมฯ, อาคาร) ทั้ง 4 โซน — สไปรต์คมชัดขึ้นชัดเจน
2. คลิก/เดิน/ป้าย "เข้าไป" "คุยกับ…" ตรงตำแหน่งทั้ง 1× และ 2.5×
3. `node --test tests/*.test.mjs` ผ่านหมด · cache-bust ต่อท้าย `-m1`
4. รายงานใส่ใน report.md ของ run (ถ้าเขียนนอก worktree ไม่ได้) — ห้ามเขียนใน /tmp
