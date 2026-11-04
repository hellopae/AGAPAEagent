# SAVE-VISUAL

Branch codex/2026-11-02-save-visual; base27fb00a7. No merge/push.

Cards use existing HUD money/order/karma icons and region-specific owned crew portraits. Only current saved zone plus global Nira is displayed; saveSlotSummary and raw save data retain all actors. Existing assets only. West/Cyber Guard use cropped existing cutscenes because no profile files exist. Time/zone,3slots,New Game and accessible image labels remain. Save-only CSS hides duplicate close.

Focused12/12; syntax/whitespace clean. Real clean-profile installed Chromium against actual START/slots:4zones at390/1280 plus TH3840 (9contexts), pageErrors[], no missing portrait/icon decodes, correct regional IDs,3slots,2New Game choices,1visible back/close, no horizontal overflow, raw save unchanged. All screenshots inspected. Earlier async decoding produced pending paint in screenshots; production portraits now request sync decoding and QA explicitly awaits image.decode before screenshots. Final Cyber Guard head positioning separately rechecked at390/1280 under guard-crop/.

Root browser-checks.json is9context proof; guard-crop/browser-checks.json and screenshots are final Cyber crop proof. Root browser-error.json records the earlier fixed close CSS specificity issue, not final status. Parent owns full integrated test run.

Owned runtime/index edits:src/save-slot-menu.js and only SAVE-SLOT CSS/cache destination in index.html. Cache version20261102-save-visual. No map/scene/game/save storage changes and no new media generated.
