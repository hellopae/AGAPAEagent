---
name: worklog-sync
description: ซ่อม/เขียน worklog.json + status.json + push ด้วยมือ เมื่อ hook อัตโนมัติพลาด หรือทำงานเสร็จนอก Task tool (dashboard ไม่อัปเดต) ใช้เมื่อ git status ไม่สะอาดหลังจบงาน หรือ worklog ไม่มี entry ของงานที่เพิ่งทำ
---

# Skill: worklog-sync

ใช้เมื่อกลไกอัตโนมัติ (`scripts/hook-status.mjs`) ไม่ได้ทำงาน — schema เต็มอยู่ใน `SOP/SOP-07-worklog-dashboard.md`

## 1. วินิจฉัยก่อน

```bash
git status && git log --oneline -3
```
- Working tree ไม่สะอาด + ไม่มี commit `worklog: ...` ล่าสุด = hook พลาดจริง → ทำต่อ
- สะอาดและ commit ครบ = ไม่ต้องทำอะไร (อย่าสร้าง entry ซ้ำ)

## 2. เพิ่ม worklog entry (unshift บนสุดของ `entries`)

เขียน Node script ชั่วคราวหรือแก้ตรง ๆ ตาม schema:
```json
{
  "id": "wl-YYMMDD-<agentId>-<4ตัวท้าย timestamp ฐาน36>",
  "datetime": "<ISO ตอนนี้>",
  "displayDate": "<วันที่ไทย พ.ศ. เช่น 5 ก.ค. 2569>",
  "displayTime": "<HH:MM>",
  "agent": "<agentId>", "agentName": "<ชื่อ>", "agentImg": "avatars/<ชื่อ>.png",
  "pipeline": "<pipeline ของ agent ใน status.json>",
  "status": "done",
  "title": "<ชื่องาน>", "summary": "<สรุป ≤300 ตัวอักษร>"
}
```
อัปเดต `updatedAt` บนสุดของทั้ง worklog.json และ status.json เป็น ISO เดียวกัน

## 3. อัปเดต status.json
Agent ที่เพิ่งทำงาน: `status: "done"`, `task: "<ชื่องาน>"`,
`report: { when: "<HH:MM>", title, body (≤800 ตัวอักษร) }`

## 4. Firestore (dashboard real-time)
Hook ปกติเขียน 2 ที่: doc `agents/<id>` (status) + doc `agents/worklog` (arrayUnion entries)
— ใช้ REST pattern จาก `scripts/hook-status.mjs` บรรทัด 96-129 ถ้าต้อง sync ด้วยมือ
(ข้ามได้ถ้ารีบ: dashboard fallback อ่าน worklog.json จาก Pages ได้ แต่ real-time จะไม่เด้ง)

## 5. Commit + push (ไม่ต้องรอคำสั่ง)
```bash
git add status.json worklog.json Output
git commit -m "worklog: <AgentName> — <งาน ≤60 ตัวอักษร>"
git push origin main
```
เช็คปิดท้าย: `git status` สะอาด + เปิด dashboard ดูว่า entry ขึ้น
