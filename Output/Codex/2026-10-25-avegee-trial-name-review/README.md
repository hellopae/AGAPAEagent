# B1 — Long spirit names in trial

Root cause: outer badge max-width limited only its border while inner flex text retained min-width:auto + inherited nowrap. A 423px text box escaped a157px badge under the right panel.

Change: shrinkable text, normal wrapping and overflow-wrap:anywhere for unbroken names; icon never shrinks. Full names and accessible trait labels retained. Right-aligned rounded rectangle can grow leftward inside stage up to280px desktop/150px mobile; line-height1.6. No gameplay, camera, collision or map mask changes. Inline figure content naturally adjusts for multiline badges; actor anchors/render logic unchanged.

Native trial via external memory-only fixture, no real saves. Eight DOM measurements: long Thai at1280x720,390x844,1024x480,320x740; unbroken at390/1024; short at320/1280. Every badge inside stage, text inside badge, scrollWidth<=clientWidth+1; icon retained. Screenshots include external QA toolbar. Root stage may have existing scrollWidth from other elements; only name overflow is fixed. No console errors. Browser covered concealing and accepting traits; existing HTML tests cover all3traits and escaping.

Only3gamefiles: CSS,stylesheetloadercache,indeximportmapcache. No new snapshot/regex tests for low-impact CSS; native geometry checks are the primary layout verification. Full existing suite required before publish. Owner visual acceptance pending; no Claude/QA acceptance claim. Next Nira office cards/copy. Map walkability work deferred per owner until new annotated images.

Full suite1522/1522,133syntaxfiles,222testfiles,zero fail/skip/cancel/todo; duration253.66s at86cd972eddfff2f58d61b8e4f1ef35cb3ee89541. Merge239f506cb63e4464f1a62d0c6f252f1114009bb5 identical tree.

Pagesbuilt239f506;live3/3byte-match after build. First read while build was running still returned old files; retained live-during-build.json and checked again only after built.
