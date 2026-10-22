# AVEGEE O2 — งานวาดให้ Codex (จากการตรวจภาพการต่อสู้)

repo `/Users/agapae/agapae-work/AVEGEE` · branch `toby/o2-battle-audit` · เรียงตามความสำคัญ · ทุกชิ้น: ห้ามแตะโค้ด วางไฟล์ทับชื่อเดิม (manifest/โค้ดไม่ต้องแก้) · สไตล์อ้างอิง = ไฟล์เดิมของโซนเดียวกัน (pixel-chibi, เส้นขอบเข้ม, พื้นโปร่ง)

กฎร่วมทุกชิ้น: พื้นโปร่งใสจริง · เว้นขอบโปร่ง ≥ 8px รอบทุกด้านของทุกช่อง (ห้ามตัวละคร/เอฟเฟกต์แตะขอบช่อง) · จุดเท้าอยู่ตำแหน่งเดิมของแต่ละช่อง · ตัวละครหันตามที่ระบุ

## 1. นิรา — แผ่นต่อสู้ 4 โซน (ด่วนที่สุด: เห็นทุกศึกชายแดน)
ไฟล์: `img/nira-combat/nira-{th,asia,west,cyberhell}-sheet-v1.webp` · 1280×1280 · กริด 4×4 (ช่อง 320×320) · แถว 0 idle / 1 attack / 2 hurt / 3 heal (ลำดับเดิม) · เท้าชิดล่างช่อง

ปัญหาที่เห็น (สแกนพิกเซลชั้น alpha ทุกช่อง + ดูด้วยตา):
- **attack f6 (แถว1 ช่อง3 = เฟรมที่ 6)** ลำแสง/หนังสือพุ่งไปทางขวา **ล้นขอบขวาของช่อง** (th/asia/west/cyberhell ทั้งสี่ชุด) ส่วนที่ล้นไปอยู่ขอบซ้ายของเฟรม 7 เป็นรูปเพชร/เศษแสงลอยข้างตัวนิรา — โค้ดลบส่วนที่ล้นของเฟรม 7 ให้แล้ว (ฝั่งโค้ด `stripNeighbourLeaks`) แต่ปลายลำแสงของเฟรม 6 ยังถูกตัดเป็นเส้นตรงที่ขอบขวา
- เฟรม hurt (แถว2) f9, f10 และ attack f4,f5 มีท่า/เอฟเฟกต์ติดขอบซ้าย-ขวา-ล่าง (asia/west/cyberhell) ล่างช่อง: idle f0–3 ของ asia/west/cyberhell ชายเสื้อ/รองเท้า "แตะขอบล่าง" 100–340px ต่อช่อง (เท้าถูกตัด/ชนขอบ) · heal f12–15 ของทุกโซน ออร่า/ฮาโลถูกตัดที่ขอบบน
- ทิศ: แถว idle และ hurt วาดหัน "ซ้าย/เข้ากล้อง" (ถือตรายางไว้ซ้ายจอ) ส่วน attack/heal หัน "ขวา" — โค้ดพลิก idle/hurt ให้ตอนนี้ แต่ถ้าวาดใหม่ **ขอให้ทุกแถวหันขวา (หาศัตรู)** แล้วแจ้ง Toby เพื่อเอาการพลิกออก

สิ่งที่ต้องวาด: ส่งออกใหม่ทั้ง 4 แผ่นให้ทุกท่าอยู่ในช่อง 320×320 พร้อมขอบโปร่ง ≥ 8px (ย่อตัวละครลง ~6% ถ้าจำเป็น แต่ทุกโซนต้องย่อเท่ากัน) · วาด attack f6 ใหม่ให้ปลายลำแสงจบในช่อง (ลำแสงสั้นลงหรือวางตัวชิดซ้ายขึ้น) · ไม่เปลี่ยนชุด/สีผมของแต่ละโซน

Prompt (EN, ใช้กับไฟล์เดิมเป็น reference ต่อโซน):
"Re-export this 4x4 sprite sheet of the same chibi pixel-art character (Nira, purple skin, hair bun, small horns, holding a stamped paper stack; outfit unchanged for this region). Keep every pose, palette and line style exactly as in the reference. Fix only the layout: every pose must sit fully inside its own 320x320 cell with at least 8 px of transparent margin on all four sides, feet resting on the same baseline in every cell (24 px above the cell bottom). In the attack row, frame 3 (golden book beam to the RIGHT) must end inside the cell: shorten the beam so its tip finishes at least 8 px before the right edge. In the heal row keep the green aura and halo fully inside the cell (shrink the aura rather than cropping it). Draw ALL rows with the character facing RIGHT (three-quarter view toward the right edge). Transparent background, no shadows baked in, no neighbouring-cell overlap. 1280x1280 total, 4 columns x 4 rows (rows: idle, attack, hurt, heal)."

## 2. บอสโซน 4 (Trojan ม้าไม้) — ท่า attack/hurt ช่องซ้ำ/ขาด
ไฟล์: `img/boss-combat-v1/cyberhell/boss-frontier.webp` (ตรวจจากคอนแทคชีตแผ่นที่ 3 ของโซน cyberhell) · 1152×2048 · ช่อง 384×512 · 3 คอลัมน์×4 แถว · เฟรม 0–2 idle / 3–8 attack / 9–11 hurt
ปัญหา: เฟรม 6 และ 7 (attack) เห็นหัวม้า/ลำแสงชมพู "ซ้ำสองตัวในช่องเดียว" และเศษล้อลอยตามขอบล่าง/ซ้าย — เป็นส่วนล้นของเฟรมข้างเคียงที่สคริปต์ N2 ไม่ลบเพราะติดกับตัวหลัก (ตัวอาวุธตัดกลางด้วยหน้าต่าง 346px ตามที่ `docs/n2-sprite-bleed.md` บันทึกไว้)
สิ่งที่ต้องวาด: วาดเฟรม attack 6,7 ใหม่ให้เป็นภาพเดียวในช่อง (ลำแสงชมพูพุ่งซ้าย หัวม้าเดียว) ขอบโปร่ง ≥ 8px · หันซ้าย (หาทีมเรา) เท้า/ล้อชิดเส้นฐานเดิม
Prompt (EN): "Redraw frames 6 and 7 of this boss attack sheet (pixel-art wooden Trojan horse on wheels, magenta glow, facing LEFT toward the player team). Each frame must contain ONE horse only, fully inside its 384x512 cell with 8 px transparent margin on every side; the magenta beam fires to the left and ends inside the cell. Wheels rest on the original baseline. Keep the same palette, outlines and size as frames 3-5. Transparent background, no pieces of neighbouring frames."

## 3. ชุดท่าที่ถูกหน้าต่าง 346px ตัดเอง (ของเดิม ยังค้าง — รายการเต็มมีแล้ว)
`docs/n2-clipped-frames.json` (203 เฟรม จาก 448; 116 เฟรมตัดยาว ≥ 60px) — ผมตรวจซ้ำ: เฟรมที่ manifest ใช้จริงไม่มีพิกเซลชนขอบช่อง (ขอบซ้าย/ขวา 19px/364px ตายตัว ตัดเป็นเส้นตรงที่ x=19 / x=364 ตามเดิม) **ยังไม่ได้วาดใหม่** · แนะนำให้ Codex ส่งออกใหม่เป็นแผ่นช่องกว้าง 512 แทน 384 (ต้องแจ้ง Toby ปรับ `frameWidth/anchor` ใน manifest — งานโค้ดเล็ก) · ลำดับ: ยมทูตที่โชว์บ่อยก่อน (taan f3 ตัดซ้าย 173px, boon f4 ตัดขวา 63px, plerng f3)

## 4. ไม่ต้องวาด (ตรวจแล้ว)
- ยามา hurt 4 โซน (`img/yama-animation-v1/*/sword-hurt.webp` 768×1024, ช่อง 384×512, 2×2) — ครบ 4 เฟรม ไม่ว่าง ไม่เห็นเฟรมข้างเคียงติด
- ภาพแตกของยามา (ข้อ K) = ปัญหาโค้ด (canvas ความละเอียดต่ำกว่าจอ) แก้แล้วใน O2 · ความละเอียดต้นฉบับพอ: แผ่นดาบ 640×640 ต่อเฟรมวาดที่ ~114px สูง = ย่อลง ~5 เท่า · ไม่ต้องวาดใหม่
- คัตซีนยามา/ยมทูต/ยักษ์ (ข้อ J) = ขอบแหว่งเกิดจาก CSS clip-path เฉียง + ซูมออก แก้ด้วยโค้ดแล้ว · ภาพต้นฉบับสมบูรณ์
