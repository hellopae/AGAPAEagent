import json, subprocess
from pathlib import Path
out=Path('/private/tmp/2026-10-11-prune')
b=json.loads((out/'scan-before.json').read_text());a=json.loads((out/'scan-after.json').read_text())
mib=lambda n:f'{n/1048576:,.2f}'
removed=b['unused'];total=sum(e['bytes'] for e in removed)
script=Path('scripts/find-unused-assets.mjs')
lines=[
'# AVEGEE — รายงานตัดไฟล์ที่ไม่มีการอ้างอิง',
'', 'วันที่ตรวจ: 11 ต.ค. 2569 (2026-10-11) · ผู้ทำ: Codex · ผู้ตรวจงานตาม brief: Dale',
'', f'Worktree: `{Path.cwd()}`',
'', 'Branch: `codex/20261011T090027Z-ffc540c1`',
'', f'ฐาน main: `{b["head"]}`; ตรวจด้วย `git ls-remote origin refs/heads/main refs/heads/codex-app/2026-10-04` แล้วตรงกับ refs ที่ใช้สแกน',
'', f'Branch ที่คุ้มครอง: `{b["protectedRef"]}` = `{b["branchCommit"]}`',
'', 'ไม่ได้ commit, stage, merge, push, deploy, แก้ hooks, status.json หรือ worklog.json; ไม่เรียก agent อื่น และไม่แก้พื้นที่ต้นฉบับ `/Users/agapae/Documents/Work PAE/Claude/AVEGEE`',
'', '## ผลที่ตรวจได้',
'', f'ลบ {len(removed)} ไฟล์ รวม {total:,} bytes ({mib(total)} MiB): output 58 ไฟล์ และ HTML ทดสอบ root 2 ไฟล์ ไม่มีภาพ/เสียง runtime ถูกลบหรือแก้ไข',
'', 'ขนาด runtime ไม่ลดในรอบนี้: เก็บภาพและเสียงทั้งหมด เพราะ manifest/catalog และ path ไดนามิกยังคุ้มครองไฟล์เหล่านั้น การมีชื่อรุ่นเก่าไม่ใช่หลักฐานพอสำหรับลบ',
'', '## ข้อจำกัดตำแหน่งส่งรายงาน',
'', 'ตำแหน่งที่ brief กำหนด: `/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-11-prune/REPORT.md`',
'', 'session นี้มีสิทธิ์เขียนเฉพาะ worktree และ temporary directories พร้อม approval policy = never จึงเขียนตำแหน่งนั้นไม่ได้ รายงานฉบับนี้อยู่ที่ `/private/tmp/2026-10-11-prune/REPORT.md` ไม่สร้าง `AGAPAE Agent/` ใน repo และเกณฑ์ตำแหน่งส่งยังไม่ครบ',
'', '## วิธีสแกนและข้อจำกัดการพิสูจน์',
'', '`node scripts/find-unused-assets.mjs > /tmp/unused-assets.json` เป็นคำสั่งอ่านอย่างเดียว ไม่ลบไฟล์เอง ไม่ execute โค้ดที่สแกน และไม่เปลี่ยน Git',
'', 'สแกน tracked text files ที่ยังมีอยู่ ได้แก่ index.html, src JS/CSS, manifest/preload-catalog, JSON/CSS อื่น, scripts, tests, output previews รวมถึงเอกสารเพื่อคุ้มครอง reference เพิ่มเติม จากทั้ง worktree และ branch ที่กำหนด โดยไม่แก้ Exam/docs',
'', 'ตรวจ literal paths, CSS url(...) ทั้งมี/ไม่มี quote, relative paths, JSON paths ใต้ img และ semantic keys เช่น artUrl("hero-yama-atk") พร้อม suffix variants ที่มีจริง Template strings/Python f-strings ที่คำนวณค่าไม่ได้ถูกแปลงเป็น wildcard แล้วแจกแจงไฟล์จริงทุกไฟล์ที่ตรงไว้ใน unresolvedPatterns; wildcard อนุญาต path separator จึงไม่เดาสุ่มขอบเขตของค่า',
'', 'กรณี `img/deva-intro/deva-intro-${zone}-v1-web.mp4` เก็บทุกไฟล์ที่ตรงรูปแบบ รวมค่าที่ไม่รู้ล่วงหน้า กรณี `"img/" + path` / generic artUrl fallback เก็บ img ทั้ง subtree อย่างอนุรักษ์นิยม Split joins ใน scripts คุ้มครอง directory ทั้งต้น ไม่ลบไฟล์ต้นฉบับเพื่อแลกขนาด',
'', 'แยก base href, ข้อความ i18n และ assertion prefixes ออกจากการอ้างทั้ง subtree ของไฟล์เสริม; concrete references ในเอกสาร/เทสต์ยังคุ้มครองไฟล์ รายการ unused เป็น candidate ที่ต้องทบทวน ไม่ใช่ static-analysis proof ทั่วไปสำหรับโค้ดทุกชนิด และไม่พิสูจน์ว่า retained ทุกไฟล์ถูกใช้ระหว่างเล่นจริง',
'', 'ภาพทุกไฟล์คงเดิม และไม่มี deletion ใน manifest/catalog จึงไม่จำเป็นต้อง regenerate หรือแก้ entry; ไม่มีการปรับเทสต์เพื่อลดมาตรฐาน',
'', '## จำนวน/ขนาดก่อน–หลัง',
'', 'หน่วยในตารางเป็น MiB = 1,048,576 bytes; มี bytes จริงสำหรับเทียบเพดานที่เอกสารใช้คำว่า MB',
'', '| ชุดไฟล์ | ก่อน (ไฟล์) | หลัง (ไฟล์) | ก่อน (bytes / MiB) | หลัง (bytes / MiB) |', '|---|---:|---:|---:|---:|'
]
for label,x,y in [('Runtime bundle upper bound',b['runtime'],a['runtime']),('Footprint ตามการนับกว้างใน brief',b['briefFootprint'],a['briefFootprint']),('Tracked files ที่ยังอยู่บนดิสก์',b['tracked'],a['tracked']),('output/',b['excluded']['output'],a['excluded']['output'])]:
 lines.append(f'| {label} | {x["count"]} | {y["count"]} | {x["bytes"]:,} / {mib(x["bytes"])} | {y["bytes"]:,} / {mib(y["bytes"])} |')
lines += ['', 'Runtime upper bound = index.html + .nojekyll + src/** + img/** + audio/** โดยตัด master ที่แจกแจงด้านล่างและ .md/.txt ออก ยังรวม fallback/catalog assets ที่ยังพิสูจน์ว่าเลิกใช้ไม่ได้ ไม่ใช่ zip build ที่ทดสอบบน itch.io แล้ว',
'', 'Footprint ตาม brief ตัด tests/scripts/docs/output/Exam แต่ยังรวมเอกสาร root และ HTML ทดสอบ จึงต่างจาก runtime นับจาก tracked files ที่มีจริง; Git index ยังมี 1,178 entry เพราะไม่ได้ stage การลบ สคริปต์ใหม่ยัง untracked และไม่รวมในสถิติ tracked ก่อน–หลัง หากรวมสคริปต์ใหม่ ชุดไฟล์ที่เหลือมี 1,119 ไฟล์',
'', f'สคริปต์ใหม่มี {script.stat().st_size:,} bytes; net ลดขนาด worktree เมื่อรวมสคริปต์ใหม่ {total-script.stat().st_size:,} bytes ({mib(total-script.stat().st_size)} MiB)',
'', '## Exam/docs — รายงานแยก ไม่แก้หรือลบ',
'', '| โฟลเดอร์ | ไฟล์ tracked | bytes | MiB |', '|---|---:|---:|---:|']
for d in ['Exam','docs']:
 e=b['excluded'][d];lines.append(f'| {d}/ | {e["count"]} | {e["bytes"]:,} | {mib(e["bytes"])} |')
lines += ['', '## ต้นฉบับ/authoring ที่เก็บไว้ ไม่ใช่ runtime bundle',
'', 'รายการนี้ควรตัดออกจากชุดส่ง itch.io ภายหลัง โดยเก็บใน repo สำหรับสร้างงานต่อ ไม่ได้ลบในงานนี้',
'', '| path | bytes | เหตุผล |', '|---|---:|---|']
for e in b['originals']:
 p=e['path'];reason='ต้นฉบับ cover ที่ h5b-cover-masks-v4.py อ่าน; make-preload-catalog.mjs ไม่ preload master' if p=='img/cover-v4-full.png' else 'raw master / aligned authoring intermediate สำหรับ export sword' if '/raw/' in p else 'atlas รุ่นก่อนที่ export-yama-sword-facing.py อ่านเป็น source; ไม่มีใน catalog/manifest ปัจจุบัน'
 lines.append(f'| `{p}` | {e["bytes"]:,} | {reason} |')
lines += ['', f'รวม {len(b["originals"])} ไฟล์ {sum(e["bytes"] for e in b["originals"]):,} bytes ({mib(sum(e["bytes"] for e in b["originals"]))} MiB)',
'', '## รายการไฟล์ที่ลบ',
'', 'ทุกแถวไม่มี incoming reference ที่พบใน worktree/branch ที่คุ้มครอง, catalogs/JSON/CSS, scripts และ auxiliary tests/previews/documents รวมทั้งไม่มี unresolved protected pattern ที่ตรง มี scan-before.json เป็นหลักฐานขนาดก่อนลบ ไม่อ้างว่าไฟล์ถูกแทนด้วยรุ่นใหม่หากไม่ได้พิสูจน์',
'', '| path | bytes | เหตุผล |', '|---|---:|---|']
for e in removed:
 p=e['path'];reason='หน้า debug ทดสอบ root ไม่มี incoming reference และไม่ใช่ entry point เกม' if not p.startswith('output/') else 'ผลผลิต/preview/ข้อมูลประกอบใน output ไม่มี incoming reference; ไม่ใช่ runtime หรือ source ที่ scripts อ่าน'
 lines.append(f'| `{p}` | {e["bytes"]:,} | {reason} |')
lines += ['', '## เพดาน itch.io ที่ตรวจจากเอกสารปัจจุบัน',
'', 'แหล่งหลัก: [itch.io — Uploading HTML5 games / ZIP file requirements](https://itch.io/docs/creators/html5#zip-file-requirements), เปิดตรวจ 2026-10-11',
'', 'ZIP หลังแตกต้องไม่เกิน 1,000 ไฟล์, ขนาดรวมไม่เกิน 500 MB, ไฟล์เดี่ยวไม่เกิน 200 MB, ชื่อรวม path ไม่เกิน 240 characters; ชื่อ case-sensitive และ UTF-8, มี index.html เป็น entry point',
'', f'Runtime upper bound หลังงาน {a["runtime"]["count"]} ไฟล์ / {a["runtime"]["bytes"]:,} bytes ({mib(a["runtime"]["bytes"])} MiB) ยังเกิน 500 MB ทั้งเมื่ออ่านเป็น decimal MB และ binary MiB จึงไม่อ้างว่าพร้อมอัปโหลด ไม่ได้สร้างแพ็กเกจหรืออัปโหลด',
'', '## ผลการตรวจ',
'', '- `node --test tests/*.test.mjs` ก่อนลบ: exit 0; 743 tests, 743 pass, 0 fail / skipped / cancelled',
'- `node --test tests/*.test.mjs` หลังลบ: exit 0; 743 tests, 743 pass, 0 fail / skipped / cancelled',
'- Scanner fixtures ใน temporary directory: direct path, unquoted CSS, relative JSON, catalog, branch-only ref, script source, semantic suffix, unresolved zone templates, irrelevant placeholders/base href/assertion prefixes, split joins, broad fallback และ missing branch fail-closed ได้ผลตาม assertions; fixture ใช้ git shim ไม่ commit',
'- `node --check scripts/find-unused-assets.mjs`: exit 0',
'- `git diff --check`: exit 0',
'- สแกนซ้ำหลังลบ: exit 0; unused 0 ในชุดที่ยังอยู่ ไม่พบ protected candidate ถูกลบ เทียบรายการลบกับ scan-before และ git diff แล้วตรงกัน',
'- ตรวจ `node scripts/check-image-archive.mjs` เพิ่มเติม: ไม่สำเร็จ (exit 1) ระหว่าง import src/i18n.js เพราะ mock document ในสคริปต์ไม่มี documentElement; ไม่ได้แก้สคริปต์เดิมเพื่อขยายขอบเขต และไม่อ้างว่าการตรวจเสริมนี้ผ่าน',
'', 'ไม่มี browser gameplay QA หรือการอนุมัติ QA จาก Dale ในงานนี้ ผลเทสต์ข้างต้นเป็นผลคำสั่งที่รันเท่านั้น',
'', 'หลักฐานใน `/private/tmp/2026-10-11-prune/`: scan-before.json, scan-after.json, tests-before.tap, tests-after.tap, scanner-fixtures.mjs และ asset-check.txt',
'', '## Self-check ตามเกณฑ์รับงาน',
'', '1. **เนื้อหารายงานครบ แต่ตำแหน่งส่งยังไม่ครบ**: มีตารางลบพร้อมขนาด/เหตุผล, runtime ก่อน–หลัง, authoring originals, Exam/docs และเพดาน itch.io ที่ตรวจแล้ว รายงานอยู่ temporary path เพราะ sandbox ไม่อนุญาต path ที่กำหนด',
'2. **เทสต์ที่กำหนดได้ผลผ่านครบ**: 743/743 หลังลบ ไม่มีการแก้ tests ไม่อ้าง QA ผ่าน; การตรวจเสริม archive script มีข้อขัดข้องตามรายละเอียดด้านบน',
'3. **สคริปต์ใช้ซ้ำอยู่ใน scripts/**: scripts/find-unused-assets.mjs, read-only JSON output, คุ้มครอง branch ที่กำหนดและ fail เมื่อไม่มี branch ทดสอบด้วย fixtures และสแกน repo ก่อน/หลังแล้ว',
'', 'ยังไม่บรรลุเป้าลดขนาด runtime; รอบนี้ลดเฉพาะไฟล์นอก runtime ที่พิสูจน์ได้ตามนโยบายอนุรักษ์นิยม ไม่ขยายงานไปปรับ catalog/โค้ดเพื่อปลดการอ้างอิงภาพ',
]
(out/'REPORT.md').write_text('\n'.join(lines)+'\n')
print(out/'REPORT.md')
