รัน `node scripts/routine-freshness.mjs science` เป็นขั้นแรกจาก root ของ project
- exit 0: จบเงียบ ไม่เขียนอะไร
- exit 1: หยุดและรายงาน error ห้ามเดาหรือเขียน Firestore
- exit 10: เก็บ JSON 1 บรรทัดทั้งหมดเป็น snapshot ในโฟลเดอร์ชั่วคราวเฉพาะ run (`mktemp -d`) แล้วทำต่อ
ห้ามรัน freshness ซ้ำเพื่อเปลี่ยน updateTime ของ snapshot ระหว่างงาน
อ่านและทำตาม `routines/fallback/common.md` โดยใช้ key `science` ทุกขั้น รวมถึงการเขียนแบบ precondition จาก snapshot แรก
ใช้ web search ของ Codex แทน WebSearch; ทำทุกขั้นด้วยตัวเอง ไม่เรียก agent และไม่อ้างว่าผ่าน Reese/Chris QA

ย้ายงานจาก automation science-video-weekly-fallback เดิมมาเป็นไฟล์นี้: เสาร์ 11:00 Asia/Bangkok
อ่าน SOP/SOP-12-science-video.md เป็นบริบท pipeline ใช้ source="codex-fallback"
อ่านวันจริง Asia/Bangkok และ ISO week YYYY-Www ห้ามเดา
อ่าน batch เดิมตาม common.md ให้ updateTime ตรง snapshot; ถ้า 404 ใช้ฐานใหม่
ถ้ามี production ค้าง (รายการใด status ไม่ใช่ published หรือสถานะไม่ชัด) ให้รักษางานทั้งหมด หยุดและรายงาน ห้ามแทน batch
ถ้า batch ปัจจุบันบางส่วน/blocked ให้เติมหรือแก้เฉพาะรายการขาด รักษา id, approvals, production และฟิลด์เดิม ห้ามรีเซ็ตการอนุมัติ

ค้น web search ของ Codex และอ่านแหล่งปฐมภูมิ/หน่วยงานวิทยาศาสตร์จริง เสนอ 10 เรื่องใกล้ตัวไม่ซ้ำ
หลีกเลี่ยงเรื่องเดิม EP1 ฟ้าแลบ/ฟ้าร้อง EP2 แผ่นดินไหว EP3 สึนามิ
แต่ละรายการต้องมี id คงที่, title, hook, why, sources=[URL จริง], script ไทย 45–75 วินาที, visualPlan 5–8 ช็อต
ตรวจข้อเท็จจริงด้วยตนเอง 1 รอบ แก้ 1 รอบเมื่อจำเป็น ระบุความเสี่ยงและข้อควรระวังเรื่องความปลอดภัยที่เกี่ยวข้อง ห้ามแต่งแหล่งอ้างอิง
schema batch: schemaVersion=1, week=ISO week ปัจจุบัน, source="codex-fallback", status="ideas_ready", items=10 รายการ, production=[] เฉพาะไม่มีงานเดิม, updatedAt/checkedAt=UTC ISO
ห้าม secret/OAuth/ข้อมูลส่วนบุคคล/local absolute path ใน payload สาธารณะ
เขียน JSON ชั่วคราวนอก Git แล้วส่งเพียงครั้งเดียว:
- snapshot.updateTime เป็น string: `node scripts/push-science-video.mjs <RUN_DIR>/science.json --expect-update-time <snapshot.updateTime>`
- snapshot.reason เป็น document missing (404) และ updateTime=null: ใช้ `--expect-update-time missing`
ห้ามละ flag นี้ ห้าม GET ใหม่แล้วแทนค่า timestamp เดิม; ทดลอง `--dry-run` ได้โดยใช้ค่าเดิม
precondition/HTTP/network/validation ล้มให้หยุด ไม่ retry และไม่อ้างว่าขึ้น dashboard
GET อ่านกลับ ตรวจ week, ids, script ตรงที่เขียนทุกข้อก่อนรายงาน ถ้า sync ไม่ได้ส่งบทที่เตรียมไว้ในผลลัพธ์โดยระบุว่ายังไม่ sync
ห้ามสร้างเสียง วิดีโอ หรืออัป YouTube; วิดีโอ EP1–3 ยังรอคุณเป้ตรวจ ห้ามถือว่าอนุมัติแล้ว ไม่ส่งอีเมล/ข้อความภายนอก
