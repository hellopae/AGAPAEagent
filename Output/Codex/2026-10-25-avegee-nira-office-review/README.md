# UI-B2/B3 — Nira office cards

Concise duty/wage copy. Separate supply purchase, Nira rice distribution, and hire cards; prices use game constants and worker count. Empty inventory keeps visible disabled share card. Shared supplies elsewhere do not offer hiring; canteen explicitly allowHire:false. Mobile worker action buttons wrap beneath details. CSS uses existing palette tokens.

B3 removes bottom material/escort totals from worker panel and teamReportsHtml only from Nira office. Ledger/reports are not cleared; handbook/log views still render reports. Underlying economy and unlocks unchanged.

Native UI with external memory fixture: buy coin1000→990,food0→10; share rice2→1,food10→22; hire workers1→2,coin990→750; next hire price300. Ledger income987/escorts23/reports1 unchanged throughout. Before invasion hire disabled with reason; money0/rice0 disables all3service buttons. Native desktop1280 inspected initially; application viewport later fixed687x856 despite viewport override. Do not label687 screenshot390. For narrow QA use same-origin iframe viewport390x844 running native game, cards316px all inside390, buttons282x44, officeReports0. Its outer page white margin is QA-only. Mobile capture scrolls to lower worker actions. QA injection had a syntax error during adding bounds capture; fixed and checked before final mobile run. Browser wrapper emits MutationObserver observe error on iframe page; not attributed to production game. Final in-game error array empty; production boot checked separately before release.

Three new tests verify actual button binding economics, failed action guards/unlocks, hidden report accounting retention. First full run6fail all legacy cache suffix-order checks; inserted b2 before p8/p4/o2 to retain endings, targeted6files then full rerun. No assertion removed. QA files not deployed. Owner visual acceptance pending, worktree retained. Next floating Manage Team label beside Nira; map walkability deferred.

Diff5files55insertions23deletions (cache-order followup retains same net scope). Targeted6legacycachefiles54/54 and new3tests pass. Shared quick-management supplies use2cards, nohire. Screenshotmobile390 uses iframe because applicationviewport override remained687; finalbounds recorded by externalfixture nativeDOM.

Finaltested7c224a77a87f469a255995f457ee4e59d73a1b6b;full1525/1525,133syntax,223testfiles,zero skip/cancel/todo,duration412.11s. Mergef61849c4bbc9f98960c0ddbc765a695d5c1e2185 identical tree. Completed26Oct+07 (folder retains start date25Oct).

Published Pagesbuiltf61849c;live4/4byte-match(index/ui/worker-ui/team-hud),productionbootconsoleempty. Additional review image uses native800x1050iframe scaled0.8 only in QA wrapper; not a production layout change.

Finalnative desktop capture1280x720,3cards275px,buttons241x44,officeReports0,errorsempty. Browserviewport returned to1280 after reset; final screenshot b2-office-after-desktop.png needs no iframe scaling. Native390record copied asmobile-bounds-observed.json from observedAX/assertedvalues because browser-after.json now contains finaldesktoprecord.
