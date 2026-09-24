# ข้อตกลงร่วมสำหรับ fallback ทั้ง 6 ตัว

Claude primary รันก่อนตามเวลาเดิม; Codex ทำเฉพาะเมื่อ freshness exit 10
ห้ามแก้ไฟล์ repo, commit/push/merge/deploy, hooks, status.json, worklog.json, work-mode.json, automation หรือ Claude cloud routine
ไม่ส่งอีเมล/ข้อความภายนอก ไม่เรียก agent อื่น ไม่อ้าง QA ผ่าน
เก็บไฟล์ทำงานในโฟลเดอร์เฉพาะ run นอก Git (`mktemp -d`); ไม่ใช้ชื่อไฟล์ /tmp ร่วมกันระหว่าง run

## Snapshot และข้อมูลเดิม

เก็บ stdout JSON จาก freshness ครั้งแรกใน `RUN_DIR/snapshot.json` พร้อม exit code จริง (shell อย่าใช้ `&&` เพราะ exit 10 คือให้ทำต่อ)
ตัวอย่างเปลี่ยน KEY เป็น key ของ prompt ก่อนรัน; นี่คือคำสั่งแรกของ run ไม่ใช่การรันซ้ำ:

```sh
RUN_DIR=$(mktemp -d)
node scripts/routine-freshness.mjs KEY > "$RUN_DIR/snapshot.json"
freshness_exit=$?
```

0 จบเงียบ; 1 หยุดรายงาน; 10 ทำต่อ; ค่าอื่นหยุดรายงานเช่นกัน
ห้ามตีความ fresh=null เป็น stale; updateTime=null ใช้ exists=false ได้เฉพาะ reason="document missing (404)"
อ่านวันจริง Asia/Bangkok ทุกครั้ง; ถ้าข้ามวัน/ISO week ระหว่างทำงาน ให้หยุดและรอ run ใหม่ ห้ามติดป้ายวันที่ใหม่ให้ข้อมูลที่ค้นจากวันเก่า

ถ้าต้องใช้เนื้อหาเดิม (article/manga/science) ให้ GET doc จาก registry ด้วย public Firebase project/key เดียวกับ scripts/push-science-video.mjs
- GET ครั้งนี้ต้องมี updateTime ตรง snapshot แรก ไม่ตรงให้หยุดทันที (ห้ามเปลี่ยน snapshot)
- snapshot missing แต่ GET พบ doc หรือ snapshot มี doc แต่ GET 404 ให้หยุด
- network/HTTP/parse error หยุด ห้ามใช้ไฟล์ repo กลบ error
- เฉพาะ snapshot 404 ที่ยัง 404: article/manga ใช้ไฟล์ JSON ใน repo เป็นฐานได้; science สร้างฐานใหม่
- parse fields.dataJson.stringValue เป็น payload; ห้ามใช้ข้อมูล malformed เป็นฐาน

## การเขียนปลายทาง (email/todo/manga/article/daily)

เตรียม `RUN_DIR/fields.json` เป็น Firestore REST `{ "fields": { ... } }` ตาม schema ใน prompt
ใช้ stringValue, integerValue (เลขฐานสิบแบบ string), arrayValue.values, mapValue.fields ตามชนิดจริง ห้ามเปลี่ยน dataJson จาก string เป็น map
เขียนเฉพาะ doc ใน registry พร้อม source="codex-fallback" ระดับ fields (รักษา source เดิมภายใน payload เมื่อบอกแหล่งข้อมูล เช่น Todoist/Manga)
ห้ามเขียน working/error/partial status ก่อนผลครบ; precondition ต้องอ้าง snapshot เริ่มงานเท่านั้น

บันทึกโค้ดนี้เป็น `RUN_DIR/write.py` แล้วรัน `python3 RUN_DIR/write.py KEY RUN_DIR/snapshot.json RUN_DIR/fields.json` หลัง validation ของแต่ละ prompt:

```python
import json, sys, urllib.request, urllib.parse, urllib.error
from pathlib import Path
key, snapshot_path, fields_path = sys.argv[1:]
registry = json.loads(Path('routines/fallback.json').read_text())
routine = next(r for r in registry if r['key'] == key)
snapshot = json.loads(Path(snapshot_path).read_text())
assert snapshot['key'] == key and snapshot['doc'] == routine['firestoreDoc']
assert snapshot['fresh'] is False
body = json.loads(Path(fields_path).read_text())
assert isinstance(body['fields'], dict) and body['fields']
params = [('key', 'AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E')]
if snapshot['updateTime']:
    params.append(('currentDocument.updateTime', snapshot['updateTime']))
else:
    assert snapshot['reason'] == 'document missing (404)'
    params.append(('currentDocument.exists', 'false'))
params += [('updateMask.fieldPaths', k) for k in body['fields']]
base = 'https://firestore.googleapis.com/v1/projects/agapae-studio/databases/(default)/documents/' + routine['firestoreDoc']
url = base + '?' + urllib.parse.urlencode(params)
request = urllib.request.Request(url, json.dumps(body).encode(), {'Content-Type':'application/json'}, method='PATCH')
try:
    with urllib.request.urlopen(request, timeout=20) as response:
        written = json.load(response)
    # Read back; do not retry if another writer changes the document afterwards.
    with urllib.request.urlopen(base + '?key=' + params[0][1], timeout=20) as response:
        actual = json.load(response)
    assert actual['updateTime'] == written['updateTime'], 'changed after write; stop'
    for name, value in body['fields'].items():
        assert actual.get('fields', {}).get(name) == value, 'readback mismatch: ' + name
    print('SYNC verified:', key)
except urllib.error.HTTPError as error:
    print('SYNC failed HTTP', error.code, 'precondition/write rejected; no retry')
    sys.exit(1)
except Exception as error:
    print('SYNC failed:', type(error).__name__, 'no retry; delivery not verified')
    sys.exit(1)
```

Science ใช้ push-science-video.mjs ตาม science.md แทน writer นี้
HTTP 400/409/412 หรือ FAILED_PRECONDITION หมายถึงหยุด ห้าม retry/rebase timestamp/เขียนทับ
error อื่นรวมถึง timeout ก็หยุด (อาจเขียนสำเร็จแต่ response หาย) ห้ามอ้าง sync สำเร็จหากไม่อ่านกลับยืนยัน
รายงาน error สั้นชัดโดยไม่เปิดเผยข้อมูลส่วนตัวหรือ response ที่อาจมีข้อมูล email
