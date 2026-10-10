# ใบงาน (Codex image): AVEGEE — แก้สไปรท์ฟันดาบไม้เท้าราตรี (cane) 2 เฟรมที่มีดาบเก่าค้าง

ผลตรวจของ Claudy (FIX LIST) ต่อ run `20261010T010405Z-861e70a4` (G3c-B-west)
ไฟล์ต้นทาง: `/Users/agapae/agapae-work/.codex-worktrees/20261010T010405Z-861e70a4/img/yama-sword-weapons/hero-yama-<outfit>-sword-cane.webp` + filmstrip ใน `.../output/Codex/g3c/`
ใบงานเดิม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-09-avegee-g3c-B-west.md`

1. **ชุด west เฟรม 3**: มีดาบตรงเล่มเก่า (ใบตรงด้ามทอง) ค้างคู่กับดาบโค้งเล่มใหม่ → ลบดาบเก่าออก เหลือดาบไม้เท้าราตรีเล่มเดียว
2. **ชุด cyberhell เฟรม 7**: มีใบดาบซ้อนสองเล่มขนานกัน → เหลือเล่มเดียว
3. ตรวจทุกเฟรมทั้ง 4 ชุด (th/asia/west/cyberhell) อีกรอบว่าไม่มีชิ้นดาบเก่าค้าง (รวม asia เฟรม 1 ช่วงใกล้ด้าม) · ตัวละคร/จุดเท้า/ขนาดเฟรม ไม่เปลี่ยน

ทำ: คัดลอก 4 ไฟล์ cane จาก worktree ข้างบนเข้า worktree ใหม่ของ run นี้ แล้วแก้เฉพาะเฟรมที่ระบุ · ชื่อไฟล์เดิม (`img/yama-sword-weapons/hero-yama-<outfit>-sword-cane.webp`) · manifest/preload ด้วยมือ (ชั้นโหลดเบื้องหลังใน `src/asset-preload.js`) · filmstrip ใหม่ทั้ง 4 ชุดใน `output/Codex/g3c-fix/`
ข้อห้าม: ห้ามรัน `scripts/make-manifest.py` · ไม่ commit ลง main ไม่ merge/push
เกณฑ์รับงาน: filmstrip 4 ชุดไม่มีดาบซ้อน · หันขวาทุกเฟรม · `node --test tests/*.test.mjs` ผ่าน
