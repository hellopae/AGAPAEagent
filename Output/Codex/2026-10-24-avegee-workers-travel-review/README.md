# WFT — workers, canteen and on-map travel

Branch codex/2026-10-24-workers-travel, basea720ec5. Implementation06c2685 plus compatibilityb27fdd0. Owner requested this while the three new walk masks remain pending. No other agents/workers were started. Existing dirty checkout gameplay untouched. New owner follow-ups are queued separately in Output/Claudy/briefs/2026-10-24-avegee-team-hud-interrogation.md.

## Behavior and scope
- Hiring unlocks after th frontierBreach victory, with cleared-boss evidence accepted for legacy progression. Existing workers are retained; old specialized modes migrate to logistics. Three work groups plus rest. No passive supervision bonus.
- Worker construction/repair starts while Taan is busy, at physical service points, up to2workers/site. Build/repair remains closed at ready100% until Taan physically inspects it. With no hired workers old builder/courier behavior remains. Source and branch saves retain progress and inspection state. Repair stops active punishment work too.
- Selected keepers collect judged souls, one journey at a time; next judged soul waits on the dais and cannot begin punishment while its keeper is still fetching another. Workers handle dock/court, completed punishment/prison/heaven routes. Existing identities and exactly-once save settlement retained.
- Gathering requires an actual built ngiw/dab; pay only at physical merchant sale. Carried cargo survives interruption. No offline material-income fabrication.
- Canteen reuses vacant house site2 without changing floor/collision. Free facility; hired idle Dam/Plerng walk to counter and cook. Portions capped6, shared supplies capped100 for additions (larger existing stores preserved); no new fees. Worker must pick up and reach a recipient before restoring hunger/morale; carried food survives restore. Assignment overrides cooking.
- Latest owner food steering applied: central supplies0 empties worker hunger and latches supplyRest. They walk to seats and sit; a later kitchen refill alone cannot resume them. Actual inventory rice consumes1 and adds existing12supplies, or player orders physical tea rest. Rest recovers hunger once at tea and supplies are available. New APIs/manual buttons are available in worker management; hiring is still Nira-only, canteen panel removes hiring.
- Travel uses actual world terrain, boat and character rendering. Nira/Kan walk to pier, Kan says exact owner sentence, Yama/Nira jump aboard, boat sails right and enters destination from left, then lands. Feet corrected against the actual boat deck. Destination assets load first. All map shortcuts/commands and simulation are held; only one guarded zone commit. Cancel before commitment, skip once, readable reduced-motion handoff. Border arrival receives the same handoff. No fares, new ports or disabled routes unlocked.

## Art
Built-in imagegen generated one canteen plus4regional seated poses. Exact prompts and raw/final PNG saved under art/. True alpha, aspect-preserving crop/fit, WebPq92/method4. Art contact reviewed. New files only; old atlases untouched.

## Verification
See validation-final/full.results.json for final acceptance; validation-before-compatibility is diagnostic only. Tests cover unlock/migration, independent construction/inspection and save/branch restore, paid manual food/tea-rest latch, actual gathering/sale, cooks/courier delivery, four-region complete soul lifecycles, legacy escort contracts, one-at-a-time keeper pickup, travel cancel/skip/reduced/one commit. Release cache URLs match canonical import-map targets; older tokens/endings preserved.

Browser fixture runs memory-only saves on localhost8794 (natural timeline) and8795 (final sources, optional Hold travel/Next phase controls injected only by review-server-final.py). The latter can freeze animation stages for screenshots; held-stage screenshots are not proof of natural frame timing. A natural full journey and real phase transitions were observed separately. Production has no QA controls. Desktop1280×800 and mobile390×844, empty console recorded in browser-final.json. Mobile panel width358.8 inside390viewport; document no horizontal overflow. Screenshots and logs are copied here before publication. Native OS reduced-motion emulation not claimed; JS reduced-motion controller is tested.

Self-check by Codex only, owner/Claude visual acceptance pending. No worktree/branch deletion. No map-mask changes. The new bottom-right team HUD and interrogation layout/relief reactions are queued, not claimed complete by WFT.

## Final acceptance
All213test files exactly once:212regular1424 +1workers20 =1444/1444, fail/cancel/skip/todo0. Syntax129, diffcheck clean. Run267.77s onb27fdd0. Merged/pushed335efec12b1ea6b5edffe6eb884637c96fd2e236; merged tree exactly equals tested branch. Browser cooks reached actual counter and served4meals, supply cap100; no console errors/warnings. Mobile paid gift consumed rice2→1, hunger0→40, worker2 entered physical tea-rest order; other workers stayed latched despite supply12. Document390/390, dialog364/364. Optional held-stage screenshots separate from natural journey observation.

Pages built exact335efec12b1ea6b5edffe6eb884637c96fd2e236. All20live runtime/art/index/state files byte-match local. West remains enabled; Cyberhell and both pending borders remain disabled.
