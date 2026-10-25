# A7 — Yama outfit size and soles

Published main bfece144a074175d30a5bf030cd21af662e8ddf3; tested f3e0c13a35776f6cfffe1eb77b86593e5707fc58. Eight files,349 insertions,9 deletions. Art pixels unchanged.

Measured alpha>=64 from20sources/236frames. Per-outfit/direction visible height and soles replace fixed canvas-based scale. Idle/walk share fixed scale; walk foot lift remains natural. Sword/standing/legacy fallbacks measured too. Trial and battle retain existing alpha fitting. No coordinates, collision, reward or save changes.

Full1522/1522,syntax133,222testfiles,zero skip/cancel/todo. Targeted30/30. Pixel tests use actual production draw calls and source alpha to verify64idleframes,walk anchoring,sword and standing fits.

Browser native real setOutfit API: all4styles at fixed worldfoot[1862,1148],coin100000,zone th. QA grants outfits only in memory,does not enable locked maps. Room mirror th/cyberhell and trial th opened; no console errors. Comparison before/after shows16production-renderer cells,h110,four directions; this is a separate QA canvas,not a game screen. Screenshots preserve QA controls. No native mobile or full natural walking-cycle claim; node tests cover frames. Source QA server/injection is evidence-only and not shipped.

Owner visual acceptance pending. Worktree retained per handoff. Next B1 long spirit names; queue includes new L1–L3 lighting handoff,not implemented.
