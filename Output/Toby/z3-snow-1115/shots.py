"""zone 3 snow: screenshots + brightness (with fog) of the game at 390x844 @2x, ground v7 (before) vs v8 (after).
 usage: shots.py [tag]      v7 is served by rewriting img/map-zone3/v8/* to img/map-zone3/v7/* in the browser (same tile names).
 writes work/shot-<view>-{v7,v8}.png and work/bright.json"""
import sys, io, json, os
sys.path.insert(0, os.path.expanduser('~/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-z234-1115'))
import numpy as np
from PIL import Image
from zrun import *
REPO = os.path.expanduser('~/agapae-work/.toby-worktrees/z1-v5/')
WORK = os.path.dirname(os.path.abspath(__file__)) + '/work/'
VIEWS = [('main-plaza', 1875, 1172, 2), ('bridge-head', 1922, 1555, 2), ('river', 1797, 1875, 2), ('cliff-foot', 1016, 1172, 2),
         ('north-stairs', 430, 469, 2), ('south-plaza', 1930, 2227, 2), ('east-bank', 3450, 880, 2), ('overview', 1920, 1280, 0)]
HIDE = """(()=>{for(const el of document.querySelectorAll('body *')){if(el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;el.style.visibility='hidden';}for(const c of document.querySelectorAll('canvas'))if(c.width>=300){c.style.visibility='visible';let p=c.parentElement;while(p&&p!==document.body){p.style.visibility='visible';p=p.parentElement;}}})()"""
SHOW = "(()=>{for(const el of document.querySelectorAll('body *')){el.style.visibility=''}})()"
def route_v7(ctx):
    def h(route):
        u = route.request.url.split('/img/map-zone3/v8/')[1].split('?')[0]
        route.fulfill(path=REPO + 'img/map-zone3/v7/' + u, headers={'Cache-Control': 'no-store'})
    ctx.route('**/img/map-zone3/v8/*', h)
def lum(png):
    a = np.array(Image.open(io.BytesIO(png)).convert('RGB')).astype(float); H, W = a.shape[:2]
    c = a[int(H*.12):int(H*.86), int(W*.04):int(W*.96)]
    return float((c @ [.299, .587, .114]).mean() / 2.55)
res = {}
for mode in ('v7', 'v8'):
    with sync_playwright() as p:
        b, pg, errs = boot(p, 'west', '', 390, 844, 2, extra_route=route_v7 if mode == 'v7' else None)
        vals = {}
        pg.evaluate("document.getElementById('town-overview').click()"); pg.wait_for_timeout(800); cur = 0
        for name, x, y, zm in VIEWS:
            while cur < zm: pg.evaluate("document.getElementById('town-zoom-more').click()"); cur += 1; pg.wait_for_timeout(400)
            while cur > zm: pg.evaluate("document.getElementById('town-zoom-less').click()"); cur -= 1; pg.wait_for_timeout(400)
            pg.evaluate(f"G.mapTravel={{focus:{{x:{x},y:{y}}}}};G.paused=false"); pg.wait_for_timeout(5000)
            pg.screenshot(path=WORK + f'shot-{name}-{mode}-hud.png')
            pg.evaluate(HIDE); v = []
            for k in range(3):
                pg.wait_for_timeout(1300); png = pg.screenshot(); v.append(lum(png))
            Image.open(io.BytesIO(png)).save(WORK + f'shot-{name}-{mode}.png')
            pg.evaluate(SHOW); vals[name] = round(sum(v) / 3, 2)
        res[mode] = vals; print(mode, vals, errs[:4]); b.close()
res['diffPct'] = {k: round(100 * (res['v8'][k] - res['v7'][k]) / res['v7'][k], 2) for k in res['v7']}
print(res['diffPct']); json.dump(res, open(WORK + 'bright.json', 'w'), indent=1)
