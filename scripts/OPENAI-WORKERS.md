# Codex และ Astra

สองบทบาทบน OpenAI: Codex ช่วยตรวจโค้ดและทดสอบ; Astra ช่วยวิเคราะห์สถาปัตยกรรมและเหตุผล ตัวรันทั้งสองใช้โมเดล `gpt-6-astra` โดยค่าเริ่มต้น (เปลี่ยนได้ด้วย `--model`) ชื่อการ์ดจึงเป็นบทบาท ไม่ได้แปลว่าเป็นบัญชีหรือโควตาแยกกัน

เรียกจากเครื่องที่ติดตั้ง Codex CLI และล็อกอินอยู่ ไม่จำเป็นต้องเปิด Claude:

```sh
python3 scripts/openai-worker.py --agent codex --task /absolute/path/brief.md --project /absolute/path/project
python3 scripts/openai-worker.py --agent astra --task /absolute/path/brief.md --project /absolute/path/project --run
```

คำสั่งแรกแสดงแผน ไม่มีการเรียกโมเดล; `--run` ใช้โควตา OpenAI ของบัญชีที่ล็อกอิน ไม่ใช่โควตา Claude. รุ่นแรกบังคับ sandbox `read-only` ทั้งสองบทบาท จึงเสนอแนวทาง/แพตช์ในรายงานได้ แต่ยังไม่แก้ไฟล์จริง

ผลเก็บใน `Output/Codex/runs/<id>/` หรือ `Output/Astra/runs/<id>/`: ใบงาน รายงาน บันทึกเหตุการณ์ ข้อผิดพลาด และสถานะ แยก `failed` จาก `ready_for_review` อย่างชัดเจน จำกัด 10 นาที ไม่มีการ retry ใช้โควตาอัตโนมัติ. Read-only ไม่ใช่การจำกัดว่าอ่านได้เฉพาะโฟลเดอร์ project

`--publish` เผยแพร่เฉพาะสถานะจำกัดของ Agent ที่เลือกไป Firestore ไม่ส่งใบงาน/รายงาน/เส้นทางส่วนตัว ไม่อัปเดตงานเก่าหรือ Work Log และไม่ push Git. ผลที่ได้ยังรอตรวจรับ ไม่ได้หมายความว่าผ่าน Reese หรือ Chris. ถ้าฝั่ง Claude ใช้งานไม่ได้ ให้คนตรวจผล หรือใช้ขั้นตรวจที่เจ้าของอนุญาตโดยบันทึกผู้ตรวจจริง

เว็บเป็น dashboard ดูข้อมูลและคัดลอกคำสั่งเท่านั้น ไม่มีช่องรับคำสั่งอัตโนมัติจากเว็บหรือ Firestore. ไม่มีโมเดล API key ฝังในเว็บ. `.claude/agents/` เป็น wrapper สำหรับ Claude และยังใช้ Claude quota; `.codex/agents/` กำหนดบทบาทใน Codex. การรันตรงจากคำสั่งข้างบนไม่เรียก wrapper ของ Claude และไม่เรียก hook-status ที่มี auto-push

เพิ่มสองการ์ดเข้า Firestore โดยไม่ seed สถานะของ Agent เดิม:

```sh
node scripts/seed-firestore.mjs codex astra
```

คำสั่ง seed เดิมเมื่อไม่ระบุชื่อยังคง seed ทุกคน ต้องระบุชื่อสองตัวนี้สำหรับการเพิ่มครั้งนี้

โฟลเดอร์ runs ถูก gitignore เพราะมีใบงานและบันทึกส่วนตัว; ไม่ควรเพิ่มไฟล์เหล่านี้ด้วย git add -f. ส่งรายงานที่ตรวจแล้วแยกเป็น Output/<Agent>/YYYY-MM-DD-topic.md เมื่อได้รับอนุญาตให้เผยแพร่

ตัวรันใช้ --ephemeral ไม่บันทึก session ของ Codex ถาวร; เมื่อ --publish จะส่ง working ก่อนเริ่ม และส่งผล ready_for_review/failed ตอนจบ โดยใช้ข้อความตายตัวที่ไม่เปิดเผยเนื้อหา. hook-status ข้าม wrapper ของสองตัวนี้ เพื่อไม่ให้การจบ wrapper ถูกนับเป็นงาน OpenAI สำเร็จ หรือส่งข้อความดิบขึ้นเว็บ
