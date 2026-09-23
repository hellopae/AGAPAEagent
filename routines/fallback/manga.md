รัน `node scripts/routine-freshness.mjs manga` เป็นขั้นแรกจาก root ของ project
- exit 0: จบเงียบ ไม่เขียนอะไร
- exit 1: หยุดและรายงาน error ห้ามเดาหรือเขียน Firestore
- exit 10: เก็บ JSON 1 บรรทัดทั้งหมดเป็น snapshot ในโฟลเดอร์ชั่วคราวเฉพาะ run (`mktemp -d`) แล้วทำต่อ
ห้ามรัน freshness ซ้ำเพื่อเปลี่ยน updateTime ของ snapshot ระหว่างงาน
อ่านและทำตาม `routines/fallback/common.md` โดยใช้ key `manga` ทุกขั้น รวมถึงการเขียนแบบ precondition จาก snapshot แรก
ใช้ web search ของ Codex แทน WebSearch; ทำทุกขั้นด้วยตัวเอง ไม่เรียก agent และไม่อ้างว่าผ่าน Reese/Chris QA

อ่านวันที่จริง Asia/Bangkok ห้ามเดา; ตรวจมังงะทุกวัน แม้ไม่มีตอนใหม่
อ่าน payload เดิมตาม common.md เก็บเป็น manga_old.json ใน RUN_DIR; ถ้า snapshot 404 เท่านั้นจึงใช้ manga.json ใน repo เป็นฐาน
แทน <RUN_DIR> ในคำสั่งข้างล่างด้วยโฟลเดอร์ชั่วคราวเฉพาะ run

โครงสร้าง payload:
```json
{
  "updatedAt": "<ISO8601 UTC>",
  "note": "<หมายเหตุรวม ห้ามแก้>",
  "series": [
    { "title": "One Piece", "latest": 1189, "releasedAt": "2026-07-26", "next": 1190, "nextAt": "2026-08-09", "cadence": "รายสัปดาห์", "note": "...", "source": "MANGA Plus (ไทย)", "url": "..." }
  ]
}
```
- `latest` / `releasedAt` = ตอนล่าสุดที่ **ออกแล้ว** และวันที่ออก (วันที่แบบสากล/US ไม่ใช่วัน JST)
- `next` / `nextAt` = ตอนถัดไปและวันที่คาด (`nextAt` เป็น null ได้ถ้าไม่รู้)

## STEP 2 — One Piece + Dandadan: ค้นด้วย web search ของ Codex

**เฉพาะ 2 เรื่องนี้** ค้นด้วยคีย์เวิร์ดที่มีเลขตอน `next` ของเดิม + เดือน/ปีจาก TODAY เช่น:
- `One Piece chapter <next> release date <เดือน> <ปี>`
- `Dandadan chapter <next> release date <เดือน> <ปี>`

**ถ้า `nextAt` ของเรื่องนั้นยังไม่ถึง (เป็นวันในอนาคต) ให้ข้ามการค้นได้เลย** — ยังไงก็ยังไม่ออก ประหยัดเวลา

**Versus ห้ามใช้ web search ของ Codex** — เป็นแปลไทยของ niceoppai ซึ่ง search engine ไม่ index เลขตอนใหม่ ให้ไป STEP 2.5 แทน

กฎ:
1. ยืนยันจากอย่างน้อย 2 แหล่งที่ตรงกัน หรือ 1 แหล่งที่น่าเชื่อถือชัดเจน (Popverse, Viz, MANGA Plus, ComicK, League of Comic Geeks)
2. ถ้าตอน `next` ออกแล้ว ให้เลื่อน: `latest` = ตอนนั้น, `releasedAt` = วันที่ออกจริง, `next` = เลขถัดไป, แล้วค้นต่อว่าตอนถัดไปออกวันไหน (Jump มักพักบ่อย — เช็คคำว่า break/hiatus ด้วย) ใส่ `nextAt` ถ้ารู้ ไม่รู้ใส่ null
3. ถ้าเลื่อนแล้วสงสัยว่าอาจมีตอนใหม่กว่านั้นอีก ให้ค้นซ้ำจนกว่าจะถึงตอนที่ยังไม่ออก
4. `note` ของแต่ละเรื่อง = ข้อความไทยสั้นๆ เช่น `"พัก 1 สัปดาห์ — ตอน 1190 ออก 9 ส.ค."` ถ้าไม่มีอะไรพิเศษใส่ `""` · Versus ให้คง `"ONE × Azuma · แปลไทยที่ niceoppai"` ไว้เสมอ
5. **ห้ามเดาเลขตอนหรือวันที่จากความจำของโมเดล** ถ้าค้นไม่เจอข้อมูลยืนยัน ให้คงค่าเดิมของเรื่องนั้นไว้ อย่ามั่ว

## STEP 2.5 — Versus: อ่านเลขตอนจาก niceoppai ตรง ๆ (บังคับ ห้ามข้าม)

ต้นฉบับบันทึกว่า search ไม่พบ niceoppai และ web fetch เคยได้ HTTP 403 จึงกำหนดให้อ่านด้วย curl + User-Agent แบบเบราว์เซอร์

```bash
curl -s -m 30 -A 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' \
  https://www.niceoppai.net/Versus/ -o <RUN_DIR>/versus.html -w 'HTTP %{http_code}\n'
python3 - <<'EOF'
import re
s = open('<RUN_DIR>/versus.html', encoding='utf-8', errors='replace').read()
rows = re.findall(r'data-ch="([\d.]+)"[\s\S]{0,400}?chrow__d">([^<]+)<', s)
rows = sorted(((float(c), c, d.strip()) for c, d in rows), reverse=True)
print('พบ', len(rows), 'ตอน')
for n, c, d in rows[:3]:
    print('  ตอน', c, '|', d)
EOF
```

- ถ้า `HTTP` ไม่ใช่ 200 หรือ `พบ 0 ตอน` → **คง Versus ค่าเดิมไว้** แล้วรายงานว่าอ่าน niceoppai ไม่ได้ (เว็บอาจเปลี่ยนโครงสร้าง)
- ถ้าอ่านได้ ให้ใช้ตอนบนสุดเป็น `latest` (ตัดตอนย่อยแบบ `.2` ทิ้ง — นับเฉพาะเลขเต็ม)
  `releasedAt` = วันที่ของตอนนั้นแปลงเป็น `YYYY-MM-DD` · `next` = เลขเต็มถัดไป · `nextAt` = `null` (เว็บไม่บอกล่วงหน้า)
- ตัวเลขจากเว็บนี้ถือเป็นข้อยุติของ Versus — **ห้ามเอา web search ของ Codex มาค้านหรือมาแทน**

## STEP 3 — เขียน <RUN_DIR>/manga_new.json

เอา `<RUN_DIR>/manga_old.json` มาแก้เฉพาะฟิลด์ที่เปลี่ยนจริง คงลำดับคีย์เดิมและลำดับเรื่องเดิม (One Piece → Dandadan → Versus) · ห้ามแก้ `note` ระดับบนสุด · ห้ามแก้ `url` / `source` / `cadence` · ไม่ต้องยุ่งกับ `updatedAt` (สคริปต์ STEP 4 จัดการให้)

**ถ้าไม่มีอะไรเปลี่ยนเลย ก็ก๊อป `<RUN_DIR>/manga_old.json` มาเป็น `<RUN_DIR>/manga_new.json` ตรงๆ** — ยังต้องไป STEP 4 อยู่ดี เพราะต้องอัปเดต `checkedAt`


## STEP 4 — ตรวจและเขียน
assert series เป็น list จำนวนเท่าฐานและครบ 3 เรื่องตามลำดับ; title ต้องตรงกันทุกตำแหน่ง และ latest ใหม่ >= latest เดิม ห้ามปิด assert
changed = new.series != old.series; new.updatedAt = nowUTC ถ้า changed มิฉะนั้นคง old.updatedAt (ถ้าไม่มีใช้ nowUTC)
fields: dataJson=JSON.stringify(new), updatedAt=new.updatedAt, checkedAt=nowUTC, by="Manga Sync routine", source="codex-fallback"
ใช้ writer common.md พร้อม snapshot เดิม แม้ไม่มีตอนใหม่ก็เขียนผลตรวจ (เฉพาะ exit 10)
รายงานสั้น: เรื่องไหนมีตอนใหม่หรือไม่มี · Versus อ่าน niceoppai ได้หรือไม่ได้ · ผลอ่านกลับ Firestore หาก error ระบุ error
