# AVEGEE: merge toby/cover-fx (Home fx + map zones 1-2)

- Changed: Home cover fx rewritten (src/cover-fx-h5b.js), src/cover-atmosphere.js deleted, H3 map fx (src/map-fx-h3.js, src/map-ambient.js) raised to zone 3-4 level, asia/th lantern glow now drawn.
- Merge commit: b787da2 on main (hellopae/AVEGEE). Tests 720/720.
- Live: https://hellopae.github.io/AVEGEE/ (Pages built; cache-bust h5b-intro-v3-coverfx / ...-i1b-mapfx)
- Verify: Home after intro skip, 2-3s shows flames/lava/volcano moving (live diff ~3.3% per 0.5s at 1600x900). Map: G.canMoveZone=()=>true; G.moveZone('th'|'asia').
- Rollback: git revert -m 1 b787da2 && git push origin main
- Note: pre-existing live 404s: img/hero-yama-side.png, audio/bgm-{title,zone,battle}.ogg (not from this change).
