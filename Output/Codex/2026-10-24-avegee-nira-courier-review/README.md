# NDC — Nira harbour courier fallback

Owner reported initial two-character game could not bring spirits off the pier after WFT gated worker hiring. This was an omitted early-game fallback, fixed here on branchcodex/2026-10-24-nira-dock-courier, base335efec, implementationd63e817.

Nira uses the real collision-aware pickup and soul-leading timeline only when no current-zone worker is hired. Her coordinates and renderer use the same path; she is not duplicated at home. One trip at a time, unavailable/resting Nira holds passengers at the dock. Taan's duty is untouched. Arrival completion frees Nira at the court and normal movement returns her home. Early-trial cancellation frees her at her visible position; load retries from the dock once. Existing workers keep new pickups and their supply/rest restrictions; an already dispatched Nira finishes if a worker is hired mid-trip.

No hiring unlock, supply grants, path-mask changes or art generation. A waiting no-worker passenger now says “รอนิราที่ท่าเรือ”. Import-map game/scene versions carry new ndc token and retain all previous tokens.

Targeted23/23:11 new tests include actual four-zone geometry, opening roster Nira/Taan only, food0 without new hiring, one-at-a-time dispatch, resting/busy Nira, early cancellation in pickup/lead phases, mid-trip worker hire, no Nira bypass around hired workers and saved retry; existing12dock/release regressions included. Full acceptance is validation-final/full.results.json, not a claim inferred from targeted tests.

Browser: localhost8796 with memory-only opening scenario. Yama placed at pier as observer, Nira/Taan remain at actual homes, no workers and no cleared boss. Real Open Court control launches normal ferry and Nira timeline. Optional QA pickup/lead buttons advance game APIs to hold a visual phase; held screenshots are not proof of native timing. No production test hooks. Browser snapshots/logs/screenshots saved here. Owner/Claude acceptance pending; worktrees retained. Previous bottom-right HUD/interrogation queue remains separate after this hotfix.

Final: implementation d63e817, merge 854f088, Pages built exact merge. All 1,455/1,455 tests, 129 syntax files and diff check pass. Four live runtime files byte-match. Natural browser journey completed with Nira returned home, queue1, zero errors; ndc-natural.json. Held screenshots show selected timeline positions only.
