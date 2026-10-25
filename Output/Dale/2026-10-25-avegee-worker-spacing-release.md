# A4 — คนงานยืนทับวิญญาณ

คุณเป้สั่งรับช่วงต่อคิว 12.png ทุกโซน. เกม main 2f705814218ae1ef824c51e324661a4b3b74a775, tested2f78bd0, Pages built exact SHA, live4/4 byte-match. Game diff6files167insertions11deletions. Worktree/branchเก็บตามhandoff; ไม่แตะgameplayในcheckoutเก่าที่มีงานค้าง.

แก้ workers.js/escort.js +worker-escort-spacing.js: เข้ารับโดยไม่ตัดตัววิญญาณ, แยกทางคนงานและจุดส่งงานจากendpointเดิม. ลองด้านข้างก่อน; ทางแคบเดินตามโดยเว้นระยะ. ใช้floorและblocksเดิม;ไม่ขยายmask. จองจุดคนงานหลายคนไม่ทับคิว. Completed releaseตรวจjobที่ตรงกันก่อนคืนงานและเพิ่มledgerครั้งเดียว; cancelอยู่ตำแหน่งที่เห็น; legacyเลือกfloorปลอดภัย. index.htmlcachebustคงsuffixเดิม; docs/worker-spacing.mdบันทึกข้อจำกัด.

Self-check:
- ผ่าน: 4โซน ×arrival/prison/gate/queue, pickup>=39.5/transit>=39.5 sampled, final>=72, canWalkตลอด.
- ผ่าน: simultaneousreservation>=48,cancel,legacy,ไม่มีfloorไม่รับงาน,save/reloadsettlesonce,westfreeze/resume.
- ผ่าน: targeted23/23, full1500/1500(all219testfilesonce,218regular+workersisolated), syntax132, diffcheck0. No npm build: static ES-module game, no package.json.
- ผ่าน: nativebrowserbefore/afterendstate,โซน2beforegap0→after80,ทุก4โซนvalidfloor/ledger1/queue1,consoleempty. Screenshotคู่ก่อนหลังใช้กล้องเดียวกัน.
- ตรวจไม่ได้ในรอบนี้: natural-timebrowserjourney (fixturecallsrealcompletionimmediately); ownerartacceptance; โซน4/ชายแดนmaskที่ยังไม่ส่ง.

มือถือ390x844ดูแล้ว มีป้ายโลกโซน4ใหญ่จากระบบเดิม;ไม่อ้างUIผ่านทุกโซนจากงานนี้. ต้นไม้ยังบังactorบางส่วน เป็นรายการmapartเดิม. ไม่แก้crew/Nira escortหรือคิวA5ในงานนี้.

หลักฐาน: ../Codex/2026-10-25-avegee-worker-spacing-review/. คิวปรับA4checkedและA5next. Codex self-checkเท่านั้น รอคุณเป้ตรวจรับภาพ.
