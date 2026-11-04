# ONBOARD-FOOD

Feature branch codex/2026-11-02-onboard-food, base df42fb1b. No merge/push.

New Game teaches opening court, receiving a soul and entering investigation. Free initial krata is removed only for explicit New Game; first investigation directs the player to actually walk/build the upper copper cauldron. Continued saves retain existing buildings. Merchant and reachable canteen sell pooled rice without Nira. Cook enters the actual canteen interior and remains inside while producing the paid batch; room progress and old already-cooking saves survive reload.

29/29 focused tests passed (onboarding, food, worker travel, BALANCE-2). Five changed runtime modules parse; git diff --check clean. No game.js or historical combat evidence changes. Parent owns final integrated full verification.

Real installed Chromium used clean temporary profiles. Actual New Game and court lesson, first-investigation build prompt/walk action, merchant rice purchase and canteen cook rendered at1280x800 and390x844. Screenshots were inspected; rice card layout was corrected before final proof. No page errors. slots-integration/browser-checks.json is final browser evidence. Its detached preview used parent bf021975 plus feature and the before-first-save hook described below. Instrumentation verified first selected slot2 write already omitted free krata, slot1 remained empty, and Continue slot1 retained existing krata.

Integration required: after g.saveSlot=id in enterSaveSlot add if(fresh)beginCourtOnboarding(g) before g.save. Keep idempotent startPlay fallback. Preserve both import blocks on room/scene/UI top conflicts. Version onboarding,canteen,scene,room,ui; source index and main branch remain untouched by this task.

Root browser-error.json records an earlier fixed duplicate export/harness issue and is historical; final checks are under slots-integration. No physical-device FPS claim.
