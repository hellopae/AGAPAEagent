# ใบงาน (Codex image): AVEGEE — แก้สไปรท์ฟันดาบท้องม้าโทรจัน (trojan) ชุด west ขนาด/ตำแหน่งกระโดด

FIX LIST ของ Claudy ต่อ run `20261010T011856Z-712275e7` (โฟลเดอร์ซ้อน `.../avegee-g3c-b-cyberhell/`)
ไฟล์ต้นทาง: `/Users/agapae/agapae-work/.codex-worktrees/20261010T011856Z-712275e7/avegee-g3c-b-cyberhell/img/yama-sword-weapons/hero-yama-<outfit>-sword-trojan.webp` · รายงานเดิม `.../output/Codex/g3c/REPORT.md`
ใบงานเดิม: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Claudy/briefs/2026-10-09-avegee-g3c-B-cyberhell.md`
แบบที่ผ่านแล้ว (ใช้เป็นมาตรฐานขนาด/จุดเท้า): `img/yama-sword-weapons/hero-yama-west-sword-fang.webp` / `-chain.webp` บน main

1. **ชุด west**: ตัวละครทั้ง 8 เฟรมใหญ่กว่าแอตลาสฐานชัดเจน และเฟรม 0–3 ใหญ่/ต่ำกว่าเฟรม 4–7 → สเกลและวางใหม่ให้ขนาดตัว จุดเท้า (240,570) ความสูงลำตัว 346 ตรงฐานทุกเฟรม ไม่กระโดด
2. ชุด th/asia/cyberhell: วัดจุดเท้า/ความสูงลำตัวทุกเฟรมเทียบฐาน (355/352/320) — คลาดเกิน ±3px ให้แก้เหมือนข้อ 1
3. เปลี่ยนเฉพาะอาวุธ: ถ้าทำได้ ให้ใช้ตัวละครจากแอตลาสฐานแล้ววางอาวุธใหม่ทับ (ไม่ re-generate ตัวละคร)
4. หันขวาทุกเฟรม · ความยาวใบ ±15% ของดาบเดิม

ทำ: คัดลอก 4 ไฟล์ trojan เข้า worktree ใหม่ของ run นี้ แล้วแก้ · ชื่อไฟล์เดิม · manifest/preload ด้วยมือ (ชั้นโหลดเบื้องหลังใน `src/asset-preload.js`) · filmstrip เทียบ ฐาน/ใหม่ ทั้ง 4 ชุด + ตาราง foot/height ต่อเฟรม ใน `output/Codex/g3c-trojan-fix/`
ข้อห้าม: ห้ามรัน `scripts/make-manifest.py` · ไม่ commit ลง main ไม่ merge/push
เกณฑ์รับงาน: ตาราง foot/height ทุกเฟรมอยู่ใน ±3px ของฐาน · ไม่มีดาบเก่าค้าง · `node --test tests/*.test.mjs` ผ่าน
