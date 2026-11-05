# ตรวจรับ Codex 2 run (5 พ.ย. 2569 ~09:30)

## Z1-V5-HD นำร่อง — run `20261105T020514Z-5d66c53d` (TimeoutExpired แต่ของครบเกือบหมด, ไม่มี README) commit `807f23f1` pushed
- 4 ชิ้น r2-c2/r2-c3/r3-c2/r3-c3 ขนาด 2048 · structure max 5 px (east-north-bank) ที่เหลือ ≤ 4 · register SIFT affine ≈ identity
- ⚠️ **ความละเอียดจริง ≈ 1.25×**: ImageGen คืนภาพ 1254 px ต่อพื้นที่ 1280 px (1×) → ขยายเป็น 2048 · ภาพดูคมขึ้นชัดที่ซูมเกม (`compare-game-zoom.jpg`) แต่รายละเอียดไม่ใช่ 2× จริง
  → ถ้าจะ 2× จริง ต้องวาดทีละ ¼ chunk (≈ 80 ครั้ง ≈ 7 run) หรือเฉพาะลาน/ทางเดิน
- ⚠️ เสาสะพานกลางหายเหลือราวเส้นบาง (ต้องวาดราว/เสาแยก หรือใช้ราวหิน #25)
- พุ่มไม้สีสดถูกลบ แทนด้วยบอนไซไม่กี่ต้น → ดูโล่งกว่าเดิม (รอบเต็มเพิ่มของจาก kit ใหม่)
- รอยต่อขอบนอกกับชิ้นเก่าเห็นความคมต่าง (หายเมื่อวาดครบ)
- inventory 143 ชิ้น (replace 116 / extract 16 / keep 11) · station-mapping ถูกแทนด้วยคำตัดสิน OWNER-DECISIONS-V5 (สถานีใช้ของเดิม ยกเว้น canteen) — เสนอเสาไซเบอร์เป็น torch = ผิด (โซน 4)

## Z1-V5-FLUIDS — run `20261105T020534Z-e4155fda` ready_for_review commit `f0f58821` pushed
- mask 6 ช่อง 1×/2× · 39 บริเวณ · 25 sheet (ใหม่ 23 + spirit-river, lava-surface) · ImageGen 6 ครั้ง · 56 MB
- เล่นเฉพาะเฟรมวาด ไม่เลื่อน (scrollSpeed 0) · contrast/saturation ≥ 1.0 เทียบ master
- หมอกวางเฉพาะ 7 หุบ — ทะเลหมอกใหญ่ด้านบน/ขอบที่ปนหิมะ ข้ามไว้ (`regions.json.omitted`)
- ยังไม่ได้ทดสอบหน้า index ในเบราว์เซอร์จริง (sandbox Codex)

พรีวิว (server 8932 root `.codex-worktrees`):
- http://127.0.0.1:8932/20261105T020514Z-5d66c53d/docs/art-reviews/2026-11-05-z1-v5-hd/index.html
- http://127.0.0.1:8932/20261105T020534Z-e4155fda/docs/art-reviews/2026-11-05-z1-v5-fluids/index.html
