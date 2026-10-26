# C5 — cold trees beside Zone2 ice court

Implementation commit0cada57 on codex/2026-10-26-zone2-cold-trees, based on tested C6 bf94fb2. Main publication remains pending explicit owner approval after automatic review rejected the C6 merge/push. This is a separate reversible branch; old checkout untouched.

Both owner-white tree marks by lokan become snow pines using the already available town-tree-c-west-v1.webp. ASIA_TREE_KEYS.white selects town-tree-snow-th, and the Asia skin maps this key to the cold pine. The shared asset is now included in the Asia preload catalog. No image pixels are edited; the previously used bamboo is retained for other routes. This does not finish C3 ground repaint, C4 zoom detail, or general tree grounding/shadows.

Coordinates are exactly the two original normalized feet(.9479,.2333) and(.8888,.2304) on3840×2560. Width160,collider16×11,on_walk and depth sorting are unchanged; all29 owner trees and other placements remain. The Zone1 and West skin mappings remain their existing values.

Native before/after server pins the two old modules for the before case and serves current modules for after. review-inject.js is temporary memory-only/no saves, camera at(3500,650),zoom2,built buildings to show the ice court and both tree feet. Screenshots c5-cold-before.png and c5-cold-after.png use the same1280×720 view. After console warnings/errors empty. Before shows the green bamboo at both marks; after shows the cold pines.

Related tests19/19 cover all owner feet/kinds/width/colliders, actual detours and station/NPC routes, Asia loader/fallback, zone restore and cache pins. Full suite pending. Owner visual acceptance not claimed.

Publication verified: owner explicitly approved this and future fully checked queue releases. C6 main mergec62c728; C5 final merge384af89770be17b6c8eba0870a5925dec8838be9. Pagesbuiltexact finalSHA;8/8live files matched. Native production boot completes with no console warnings/errors. C5 final full1530/1530,134syntax,224files,618.47seconds at0cada57. The approval rejection above is historical and resolved; no bypass was used.
