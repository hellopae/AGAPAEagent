"""zone 2 ground v7 vs v8 at the two spots; the game is served with ZONE2_GROUND_SET swapped in the browser copy of zone-skin.js (the repo file is not touched).  usage: v8.py <outdir>"""
import sys, os; sys.path.insert(0, '.')
from zrun import *
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
SPOTS = {'stairs-lava-bank': (1190, 925), 'cliff-pine-house': (1500, 940), 'probe-a': (1330, 1010), 'probe-b': (1250, 1060)}
def route(which):
    def f(ctx):
        ctx.route('**/src/zone-skin.js*', lambda r: r.fulfill(response=(rr := r.fetch()), body=rr.text().replace("export const ZONE2_GROUND_SET = 'v8';", f"export const ZONE2_GROUND_SET = '{which}';")))
    return f
for which in ('v7', 'v8'):
    with sync_playwright() as p:
        b, pg, errs = boot(p, 'asia', '', 390, 844, 2, extra_route=route(which))
        print(which, pg.evaluate("async()=>{const m=await import('./src/zone-skin.js');return m.ZONE2_GROUND_SET+' '+m.ZONE_SKIN.asia.terrain.dir}"))
        for name, (x, y) in SPOTS.items():
            look(pg, x, y, 1200)
            for _ in range(1): pg.evaluate("document.getElementById('town-zoom-more').click()"); pg.wait_for_timeout(500)
            look(pg, x, y, 2500); pg.screenshot(path=f'{out}/z2-{name}-{which}.png')
            pg.evaluate("document.getElementById('town-zoom-less').click()"); pg.wait_for_timeout(400)
        print(errs[:4]); b.close()
