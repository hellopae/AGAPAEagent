# SOP-06 — Daily News Routine: ข่าวเช้า 09:00 ทุกวัน

> Routine นี้รันเป็น **cloud scheduled agent** อยู่แล้ว (3 routines บน Sonnet 5 พร้อม date-check)
> SOP นี้มีไว้ 2 กรณี: (1) ตรวจสอบว่า routine ทำงานถูก (2) รันซ่อมด้วยมือเมื่อ routine พลาด

> **เปลี่ยนวิธีส่งมอบ 19 ก.ค. 2569 (Kittanate สั่ง):** เลิกส่งอีเมล/Gmail draft ทั้ง 3 routines —
> ผลลัพธ์เขียนลง Firestore แทน: `agents/daily` (ข่าวเช้า) / `agents/weekly` (การเงิน) / `agents/monthly` (ไอเดียบทความ)
> แสดงบน **AGAPAE Widget (แอป macOS)** และ **หน้า Routines** https://hellopae.github.io/AGAPAEagent/routines.html
> สคริปต์เขียนด้วยมือ: `scripts/push-daily.mjs` — การเช็คว่า routine รันสำเร็จ = ดู `updatedAt` ของ doc แทนการเช็คอีเมล

## Pipeline

```
News (รวบรวม 6 ข่าว) → Chris (fact-check + คัดกรอง) → Rae (เรียบเรียงบรรทัดสรุป) → Firestore agents/daily → Widget + หน้า Routines
```

## โครงข่าว 6 slots (ตาม `.claude/agents/news-daily.md`)

| Slot | หมวด | หมายเหตุ |
|---|---|---|
| 1 | การเมืองไทยระดับชาติ | ความสำคัญสูงสุด |
| 2 | การเมืองท้องถิ่น / เลือกตั้ง / กฎหมาย | |
| 3 | ข่าวโลก: ความขัดแย้ง / ภูมิรัฐศาสตร์ | |
| 4 | ข่าวโลก: ภัยพิบัติ / ภูมิอากาศ | |
| 5 | เทคโนโลยี | |
| 6 | ทอง / เศรษฐกิจไทย / Bitcoin | **ไม่เอา** ตลาดหุ้น/การเงินเชิงลึก; Bitcoin = ราคา USD + % 24 ชม. เท่านั้น (ไม่มี technical analysis — เอา MA/RSI/MACD/Fibonacci ออกแล้ว 8 ก.ค. 2026 เพราะ cloud sandbox บล็อก network ไป api.coingecko.com/api.binance.com ทั้งทาง Bash ตรงและ WebFetch proxy) |

## กติกาคุณภาพ

- ทุกข่าวต้องเป็น **ข่าววันนี้จริง ๆ** (date-check บังคับ — เคยมีปัญหาข่าวเก่าปนมา)
- ทุกข่าวต้องมี source + ลิงก์ — Chris ตัดข่าวที่ยืนยันไม่ได้ทิ้ง ไม่แทนที่
- อีเมลของ Rae: หัวข้อละ 2-4 บรรทัด ภาษาไทยอ่านง่าย ใส่ลิงก์อ่านต่อ
- หัวเรื่องอีเมล: `ข่าวเช้า AGAPAE — <วันที่ไทย>`

## เมื่อ routine พลาด (รันซ่อมด้วยมือ)

1. เช็คก่อนว่าพลาดจริง: ไม่มีอีเมลใน inbox หลัง 09:30 หรือ worklog ไม่มี entry ของ news วันนี้
2. Delegate ตาม pipeline ข้างบนด้วย Task tool (`news-daily` → `chris-qa` → `rae-writer`)
3. บันทึกผลลง `Output/News/YYYY-MM-DD-news.md` แล้วให้ Rae ส่งอีเมล
4. รายงาน Kittanate ว่า routine พลาดเพราะอะไร (ถ้ารู้) — ถ้าพลาดซ้ำ ≥2 วัน ให้ escalate

## การแก้ตัว routine (แก้ schedule/prompt)

- Routine จัดการผ่านระบบ scheduled cloud agents (skill `schedule` ใน Claude Code)
- เปลี่ยนเนื้อหาข่าว/slot: แก้ `.claude/agents/news-daily.md` (local) แล้วอัปเดต prompt
  ของ cloud routine ให้ตรงกัน — สองที่นี้ต้อง sync กันเสมอ
