# AVEGEE prune — merge note (2026-10-11)

- What: merged Codex run 20261011T090027Z-ffc540c1. Removed output/ (58 files), _walktest.html, _depthtest.html, Exam/ (12 files, moved to AVEGEE-reference). Added scripts/find-unused-assets.mjs. img/ and audio/ untouched.
- Merge commit: ec07870 on hellopae/AVEGEE main. Pages: built, HTTP 200 at https://hellopae.github.io/AVEGEE/
- Review: no src/index.html/scripts/tests reference any deleted file (only comments in src/data.js, walk-motion.js). Tests that read output/Codex/* still have their files. node --test: 743/743 pass.
- Browser smoke (local, Chrome headless): splash -> title -> new game -> intro -> trial scene. No 404 on img/ or output/. Remaining 404s pre-exist and are optional probes: audio/bgm-*.ogg|m4a (only mp3 committed), img/hero-yama-side.png (guarded fallback in src/ui.js), favicon.ico.
- Size (tracked): 1,178 files / 611.3 MB -> 1,107 files / 566.7 MB (-71 files, -44.5 MB: ~5.7 MB output/, ~38.9 MB Exam/).
- Verify: open the live URL, start new game, no console errors beyond the optional probes above.
- Rollback: git revert -m 1 ec07870 in AVEGEE (Exam/ originals are in AVEGEE-reference).
