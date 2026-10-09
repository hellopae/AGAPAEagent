# ใบงาน (Dale): AVEGEE — เล่นจริง + รวม H3 (เอฟเฟกต์แผนที่โซน 1–2) และ H4 (krajok/ประตูสวรรค์/แฟ้มการ์ด/หนังสือรุ้ง)

ทั้งสอง run ฐาน main `6eb32e5` · ยังไม่ commit · `git fetch` + pull main ก่อน (อาจมี H1/G2b/G4/H2 เข้ามา)
- **H3** run `20261009T171748Z-b7c51ec9` · worktree `/Users/agapae/agapae-work/.codex-worktrees/20261009T171748Z-b7c51ec9` (ที่ root) · ใบงาน `Output/Claudy/briefs/2026-10-10-avegee-h3-map-ambience.md` · รายงาน `output/Codex/h3/README.md`
- **H4** run `20261009T171753Z-812b7e9c` · **โฟลเดอร์ซ้อน** `.../20261009T171753Z-812b7e9c/h4` (branch `codex/h4-location-ui`) · ใบงาน `Output/Claudy/briefs/2026-10-10-avegee-h4-location-ui.md` · รายงาน `h4/output/Codex/h4/REPORT.md`
- Claudy ดูภาพหนังสือสีรุ้งแล้ว PASS

## Codex ไม่ได้เล่นใน Chrome — คุณต้องเล่นจริง (844×390 และ 390×844) ตามคำสั่งคุณเป้ในใบงานแต่ละใบ
H3:
- ลาวา/น้ำตกลาวา/แม่น้ำ/ทะเล/น้ำตก เคลื่อนไหวจริง อยู่ในขอบ ไม่ทับอาคาร ทางเดิน ตัวละคร ปุ่ม · ซูมแผนที่แล้วยังตรงตำแหน่ง
- ประสิทธิภาพ: Chrome Performance ที่ 390×844 + CPU throttle 4× — fps ก่อน/หลัง (ถ้าตกเกิน ~15% หรือต่ำกว่า 50fps → ลดจำนวน particle/draw call เองได้)
H4:
- หอส่องกรรม: แท่นกระจกอยู่บนพื้นว่างด้านขวา เดินไปหมุนในห้องได้ ลำแสงถึงกระจกวิเศษ เติมพลังได้ แท่นชนได้
- ประตูสวรรค์: กรรมคงเหลือใต้ปุ่ม + ใต้ชื่อวิญญาณ · มอบดอกบัว ตัวเลขลด + "−N" · ตรวจกรรม/ส่งเกิด/ส่งสวรรค์ มีแสงและเสียงต่างกัน
- หอทะเบียนกรรม "เปิดเอกสาร": การ์ดมีรูปวิญญาณ กดดูรายละเอียด · ไม่มีกล่องชื่อห้อง/HUD ทับ
- จัดเอกสาร: รวมแล้วได้หนังสือสีรุ้ง
- console ไม่มี error ใหม่ · ภาพหลักฐาน `Output/Dale/h3h4-evidence/` (ลบได้หลัง merge)

## รวม
- ข้อเล็กแก้เองได้ · ข้อใหญ่ → FIX LIST ไม่รวมงานนั้น (รวมอีกงานได้)
- ชนกับงานอื่นใน `src/ui.js`/`index.html`/manifest: ใส่เฉพาะส่วนที่เปลี่ยน ไม่ก๊อปทับ · ไฟล์ภาพใหม่ใส่กลุ่มโหลดเบื้องหลัง (ถ้า H1 เข้า main แล้ว ใช้ระบบชั้นของ H1)
- ไม่เอา `output/Codex/` · cache-bust ต่อท้าย · `node --check src/*.js` + `node --test tests/*.test.mjs` ผ่าน · push (ชนให้ pull --rebase เทสต์ใหม่ ไม่ force) · ตรวจ Pages
- ห้ามรัน `scripts/make-manifest.py` · ไม่ลบ worktree

## ส่งผล
`Output/Dale/2026-10-10-avegee-merge-h3-h4.md`: PASS/FIX LIST แยกงาน · commit · fps · ผลเล่นจริง · Pages
