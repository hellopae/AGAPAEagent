# AVEGEE M1 แผนที่คมขึ้น + ตัดปุ่มซูม — build note (Dale, 11 ต.ค. 2569)

- Merge: `1d76108` (Codex run 20261011T091920Z-8340a2e9 + แก้โดย Dale) · live: https://hellopae.github.io/AVEGEE/
- สิ่งที่เปลี่ยน: canvas แผนที่ backing = viewport × DPR (cap 2) แทนยืดบิตแมป · ตัด `#hud-zoom` ล็อก 1× (ตามคุณเป้) · ลบ `icon-zoom-in/out.png` + เทสต์ zoom-icon
- **Dale แก้เพิ่มจากงาน Codex** (พบตอนวัดจริง): ของ Codex ทำให้ Chrome DPR 2 ตกเหลือ ~8.5 fps (resample 'high' ทุกเฟรม) → เพิ่ม (1) cache พื้นแผนที่ที่ขนาดจอ resample ครั้งเดียว (2) cache สไปรต์ที่ย่อ (resample 'high' ครั้งเดียวต่อขนาด แล้ว blit 1:1) ผลคม + กลับมา ~60 fps (ก่อน 60 / หลัง 59–60 บน Chrome จริง DPR 2) (3) คลิกนอกขอบแผนที่ (letterbox) ถูกเมินเพราะ canvas ครอบทั้ง stage (4) offset canvas ใช้ค่าทศนิยมจาก getBoundingClientRect ให้ตรงกับ overlay DOM
- ตรวจ: คลิก→พิกัดฉาก และตำแหน่ง overlay ตรงกับ ec07870 (≤0.0px) ที่ 1600×900@2, 1280×720@1, 900×1200@2 · ภาพก่อน/หลัง 4 โซน DPR 2: `Output/Codex/2026-10-11-m1/` (วิญญาณข้างบัลลังก์ไม่เป็นจุดแตก) · เทสต์ 746/746
- ข้อจำกัด: ภาพพื้น `theme-v4/map-*.webp` 1678×937 ต้นฉบับ ยังนุ่มกว่าสไปรต์เล็กน้อย (ตามใบงาน ไม่ทำภาพ 2×)
- Verify: เปิด live บน Retina/มือถือ → ดูวิญญาณ/ยมฯ/อาคารบนแผนที่ · ไม่มีปุ่มแว่นขยายมุมขวาล่าง
- Rollback: `git revert -m 1 1d76108`
