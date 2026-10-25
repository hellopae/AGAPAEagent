# A5 — คัตซีนหัวหน้าทุกคำตัดสิน

Owner9.png → mainbfc54da78cd416208644be9e8100e6202d2840d1, tested537ca13. PagesbuiltตรงSHA/live4/4byte-match. Game diff8files119insertions19deletions (รวมdocsและtests). Worktree/branchesเก็บตามhandoff. ไม่แตะgameplayในcheckoutเก่าที่dirty.

Rootcause: P3สร้างsceneเฉพาะ5ดาวและscore<50. เติมsceneคะแนนกลางและเกินกรรมที่ไม่แดงโดยคอมเมนต์เกรดจริง,reason,โบนัส4ดาว25ตามที่ได้รับ. สีคำติงไม่อิงrawscoreอย่างเดียว. เดิม5ดาว/สตรีคแดงใช้sceneเดิม. ไม่มีการย้ายสูตร/รางวัล/ความเสียหายมาไว้ในUI.

ไฟล์: src/game.jsเติมsceneที่ขาด+flag/restorebadge,src/verdict-scene.jsordinaryreview,src/ui.jsquietแม้consumeแล้ว+reason/criticalcolor+consumematchingbadge,index.htmlcache/CSSreason;docs/verdict-comments.md;testsP3/P9ตามพฤติกรรมใหม่+verdict-comments-a5.

Self-check:
- ผ่าน realassign18ช่วงคะแนน0–100×4โซน; scene/id/stars/bonus/redsจริง. Ordinarysceneไม่เพิ่มรางวัล,เกินกรรมcriticalและไม่เพิ่มสตรีค.
- ผ่านเซฟpendingทุกโซน,โหลดซ้ำ,consumeก่อนsave,skip/reloadไม่จ่ายซ้ำ,warningคงeffects,staletimerไม่ลบfeedbackใหม่.
- full1511/1511,220testfilesonce (219regular+workersisolated),syntax132,diffcheck0;targeted31/31+cache17/17. Static ESmodulesไม่มีnpm build.
- Browsernativebefore80คะแนนไม่มีsceneมีbubble→afterเป็นheadscene;4โซนartถูก/ไม่มีbubble,มือถือ390x844fit. red2scene→warningลูกไฟ,HP85ไม่ลดซ้ำ;5ดาวcoin100460/HP124ไม่เพิ่มหลังskip.
- ตรวจไม่ได้: natural gradingจากคำตอบสอบสวน (browserstubjudgeคะแนนแน่นอนแต่doVerdict/assignจริง),ownerตรวจรับภาพ. โซน4fixtureไม่ปลดล็อกmask.

Initialfullมี2regexcacheเก่าคาดsuffixตายตัว;รักษาP8endingและให้P9รับsuffixต่อท้ายพร้อมตรวจPNGเดิม. Finalfullผ่านครบหลังสีcriticalสุดท้าย. Evidence../Codex/2026-10-25-avegee-verdict-comments-review/. NextA6mirrorpose11.png. Codexself-checkเท่านั้น.
