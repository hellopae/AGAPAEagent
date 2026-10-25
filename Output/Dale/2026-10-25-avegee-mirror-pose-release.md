# A6 — หอกระจกไม่ใช้ท่ายิงลูกไฟ

คุณเป้สั่งคิว11.png. main5fef1a2f6a3da7f963750783860cd149c3bf6dae,testedd7ce523,Pagesbuilt/live2/2byte-match. Diff5files51insertions15deletions. Worktree/branchesเก็บตามhandoff ไม่แตะgameplaycheckoutเก่าที่dirty.

แก้src/room.js: ถอนragePoseSrcจากท่าปรับกระจก,ใช้ordinaryoutfitidle/standingfallbackและหันหาpivotเมื่อหยุด;ขณะเดินคงheadingจริง. ห้องกระจกignoreg.swingUntilในการวาด แต่ไม่ลบtimer/แก้ท่าcombatห้องอื่น. index.htmlcacheใหม่,docs/mirror-adjustment-pose.md,tests/mirror-pose-a6และupdateI1-Aที่เคยบังคับattackposeให้ตรงโจทย์ใหม่.

Self-check:
- ผ่านrenderer callback4outfits,สองด้าน,walking,closedpanel,loaded/fallback,residualswing และkrataattack/dab/ngiwSwordยังอยู่.
- targeted24/24,realmakeRoomrenderer15/15,full1517/1517(all221filesonce,220regular+workersisolated),syntax132,diffcheck0. StaticESmodulesไม่มีnpm build.
- BrowsermemoryfixtureAsiaoutfit: เดินจริงไปmirror,Place/Adjust/rangeจริง,13องศาก่อนเป็นลูกไฟหลังเป็นidle,อีกด้านและresidualswingปกติ.17องศาammo0→1;เปิดแผงรอบใหม่หลังcooldownชาร์จ1→2ตามกฎเดิม. Coin100400/HP140/MP40คงเดิม. Mobile390x844,ปิดแผงยังอยู่ห้อง/Escapeกลับmap,consoleempty.
- ตรวจไม่ได้: nativebrowserทั้ง4outfits (rendererครอบคลุมแทน),ownerตรวจรับภาพ. ไม่เปลี่ยนoptics/chargeformula/reward/geometry/masks. A7ยังค้าง.

Initialfullเจอ1assertionเก่าของI1-Aที่บังคับatk;เปลี่ยนassertionเป็นnormalartและคงcombatassetchecks. Finalfullผ่านครบ. QA codeอยู่reviewfolderเท่านั้นไม่deploy. Evidence../Codex/2026-10-25-avegee-mirror-pose-review/. Codexself-checkรอคุณเป้ตรวจรับ.
