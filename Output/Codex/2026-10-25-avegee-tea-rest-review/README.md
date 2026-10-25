# A2 — พักศาลาน้ำชาคนละ 60 วินาที

แก้ตามภาพ1.png: ยมทูต Guard และคนงานที่ส่งไปพัก นั่งบนฟูกแยกคงที่ในห้อง ไม่เดินวน. ใช้ระบบจองที่นั่งเดียวกัน, เวลา60วินาทีเริ่มเมื่อถึงศาลา; Guardเดิม120วินาทีลดเหลือ60 และคนงานไม่ฟื้นจบตามจำนวนวาระ. จบแล้วคืนตำแหน่ง กำลังใจ/ความอิ่ม100 และคืนหน้าที่คนงานเดิม. ระหว่างพักไม่ทำงานหรือร่วมศึก, คนงานไม่วาดซ้ำบนแผนที่.

ภาพcrewท่านั่งใหม่ตามอัตลักษณ์แต่ละโซน จาก reference28ตัวโดยimagegen; เก็บoriginalภาพเดิม ใช้cropalphaแยกWebP28ใบ. คนงานใช้rest-v1เดิม4โซน. ไม่เปลี่ยนแผนที่/การเดินคนงาน/ระยะยามานอนหรือดื่มชา/นิราพักตามstory. พื้นที่ฟูกชุดใหม่พ้นโต๊ะชา เตียงและทางออก; รายชื่อพับได้และส่วนเลื่อนสูง150px ไม่บังทั้งห้อง.

## Self-check ตามเกณฑ์

- ผ่าน: unitระบบจริงทุก4โซน ส่งยมทูต5+Guard+คนงาน6พร้อมกัน ที่นั่ง12จุดไม่ซ้ำ, 59999msยังพัก/60000msจบ, ไม่มีตำแหน่งไหล, คืนจุด/หน้าที่, save/restore และสถานะข้ามโซน
- ผ่าน: กดพักซ้ำไม่รีเซ็ตเวลา; เปลี่ยนหน้าที่คนงานยกเลิกจอง; worker booleanเก่าเปลี่ยนเป็นเดินไปพักเต็มนาที; Guardsave120วินาทีใช้กฎนาทีใหม่
- ผ่าน: browser th,asia,west,cyberhell ใช้realroomและrealrestrequests; fixtureย้ายเฉพาะจุดจบเส้นทางเพื่อให้เห็นในห้องทันที ไม่ใช่หลักฐานเดินตามpath. เส้นทางจริงตรวจในunit และไม่เขียนเซฟผู้เล่น
- ผ่าน: nativewallclockจากhistory th12→0ที่60340ms, asiaที่59810ms, westที่59784ms,cyberhellที่60141ms (historyเริ่มหลังreal request/arrivalหลายร้อยms; boundaryที่แน่นอนตรวจในunit). ครบทุกคนฟื้นครั้งเดียว ไม่ได้เร่งนาฬิกาเบราว์เซอร์
- ผ่าน: desktop1280และmobile390×844 ไม่ล้นจอ; เปิดรายชื่อแล้วยังคงexpandedระหว่างrefresh, listheight150px, scrollWidthเท่ากับviewport
- Browserไม่มีruntimeerror; พบwarningเดิมจากi18n keyคำว่า“นอนพัก”ที่ไม่ได้แก้ในชุดนี้
- targeted50/50 และlayouttargeted19/19; fullผลสุดท้ายดูvalidation-final/full.results.json

ชุดvalidation-before-layoutเป็นผลระหว่างงาน (P9cachetokenลงท้ายผิด1ข้อ) แก้โดยรักษา-p9เดิม ไม่ลดassertion; ชุดสุดท้ายรันใหม่ทั้งชุด. ภาพbefore-layoutเก็บไว้แสดงปัญหาแถบยาว/ฟูกใกล้ทางออกที่แก้แล้ว.

StaticESmodules ไม่มีpackage.jsonหรือขั้นตอนnpm build. ไฟล์เกม42ไฟล์ (28WebP+metadata+module+UI/game/tests/doc); รายละเอียดdiffstatบันทึกก่อนส่ง. ผลทั้งหมดCodex self-check รอคุณเป้ตรวจรับภาพ ไม่อ้างว่าClaudeหรือQAรับรอง. Worktreeเก็บตามhandoff. คิวถัดไปA3ท่าเดินคนงานชูมือยังไม่ได้ทำในชุดนี้.

ผลสุดท้าย: full1471/1471 ที่225876f, syntax131, diffผ่าน; หลังจากนั้นเปลี่ยนเฉพาะyฟูกให้พ้นหัวเสาระเบียง(.57/.68), รัน19ข้อที่เกี่ยวข้องผ่านและตรวจภาพใหม่. ไม่อ้างว่าfullsuiteรันหลังcommitปรับพิกัดนี้. หลักฐานfinal-placement-validation.json.

เผยแพร่ main04edb9638549aa3af71271bd8700d8026145dc03; mergedtreeเท่ากับfinal0009088; PagesbuiltตรงSHA, live36/36(8ไฟล์runtime+28ภาพ) byte-match. diff42files,689insertions/56deletions. finalภาพตรวจรับtea-rest-th-clean-final-1280.png / tea-rest-th-mobile-final.png / tea-rest-cyberhell-final-1280.png. ภาพinvalid-before-resize-390.pngถ่ายก่อนresizeจัดฉากเสร็จ ให้ใช้tea-rest-th-mobile-final.pngแทน.

หน้าเว็บจริงโหลดแล้ว ไม่มีconsoleerror/warn; ภาพtea-live-loaded.png. หน้าinteriorQAมีwarningi18nเดิมตามข้างต้น.
