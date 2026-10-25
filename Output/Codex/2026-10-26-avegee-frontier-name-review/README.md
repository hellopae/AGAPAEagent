# UI-B5a — Compact frontier enemy names

Name labels previously U*.024 became35canvaspx at native1280x720/Retina2 (17.5CSSpx). Use max(10*dpr,min(14*dpr,U*.014)) for regular enemy/invasion boss,challenge boss and released captain name labels. Text/name/level preserved. Other HUD/exit labels,actors,positions,collision,waves,reward and event logic unchanged.

Actual renderer test captures ctx.font for invasion labels across4zones atDPR1/2 (8cases),enemycount3 and original story start tests retained. Targeted9/9. Initial new test enumerated runtime-mutated CHALLENGE_STAND compatibility keys; changed to actual BOSS_NAMES4zone keys. Browser found fixed canvas14cap would be7CSSpx onRetina2; corrected DPR before finalvalidation. Outdated initialfullrun terminated intentionally,storedvalidation-pre-retina;not claimedcomplete.

NativeThai invasion frozen memory fixture: before35canvaspx,after20canvaspx/scale2=10CSSpx at1280x720. Mobile390x844 atscale1 draws12px. Full names preserved; boss+2adds,coin100000,food1000,eventpending unchanged. Click talk button opens actual introduction of ทัณฑสูร with prepare-team CTA; no battle/rewards triggered during visual check. Browserconsoleempty. QA debug code and captures outside game repository. Nativeall4zones notclaimed;renderer tests coverthem. Owner visual acceptance pending.

B5b boss relocation remains unchecked. Separate inspection identifies guideBoss(zone inspector),challengeBoss(frontier captain),releasedFrontierBoss and invasionboss roles. Onlyth:asia hascavegeometry;2–3/3–4have no authoredcave andpendingmasks;cyberhellnooutboundroute. Preserve these findings inbrief;do not silently move inspector or unlockunapprovedmaps. This release changesfontonly.

Finaltested2b224e7,full1526/1526,syntax133,223testfiles,zero skip/cancel/todo,522.89s. Published308bf8e61601274fc2e4bf0c11e249007e250d9c,Pagesbuilt/live2/2. Net3files22insertions6deletions.
