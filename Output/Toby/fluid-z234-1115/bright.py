"""mean luminance (0-100, centre of the map canvas, HUD hidden) before (?z234=old) / after, same spots, 3 frames 1.3 s apart.  usage: bright.py <zone> <x,y,zoom;...> [tag]"""
import sys, io, json
sys.path.insert(0, '.')
import numpy as np
from PIL import Image
from zrun import *
from zl import WORK
zone = sys.argv[1]; views = [[float(a) for a in v.split(',')] for v in sys.argv[2].split(';')]; tag = sys.argv[3] if len(sys.argv) > 3 else zone
HIDE = """(()=>{for(const el of document.querySelectorAll('body *')){if(el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;el.style.visibility='hidden';}for(const c of document.querySelectorAll('canvas'))if(c.width>=300){c.style.visibility='visible';let p=c.parentElement;while(p&&p!==document.body){p.style.visibility='visible';p=p.parentElement;}}})()"""
def lum(png):
    a = np.array(Image.open(io.BytesIO(png)).convert('RGB')).astype(float); H, W = a.shape[:2]
    c = a[int(H*.12):int(H*.86), int(W*.04):int(W*.96)]
    return float((c @ [.299, .587, .114]).mean() / 2.55)
res = {}
for mode, qs in (('old', '?z234=old'), ('new', '')):
    with sync_playwright() as p:
        b, pg, errs = boot(p, zone, qs, 390, 844, 2); cur = 0; vals = []
        for i, (fx, fy, zm) in enumerate(views):
            look(pg, fx, fy, 1500)
            while cur < zm: pg.evaluate("document.getElementById('town-zoom-more').click()"); cur += 1; pg.wait_for_timeout(500)
            while cur > zm: pg.evaluate("document.getElementById('town-zoom-less').click()"); cur -= 1; pg.wait_for_timeout(500)
            look(pg, fx, fy, 2500)
            pg.evaluate(HIDE); v = []
            for k in range(3): pg.wait_for_timeout(1300); v.append(lum(pg.screenshot()))
            vals.append(round(sum(v) / 3, 1)); pg.evaluate("location.reload") if False else None
            pg.screenshot(path=WORK + f'bright-{tag}-{i}-{mode}.png')
            pg.evaluate("(()=>{for(const el of document.querySelectorAll('body *')){el.style.visibility=''}})()")
        res[mode] = vals; print(mode, vals, errs[:3]); b.close()
res['diff'] = [round(n - o, 1) for n, o in zip(res['new'], res['old'])]; res['diffPct'] = [round(100 * (n - o) / o, 1) for n, o in zip(res['new'], res['old'])]
print(res); json.dump(res, open(WORK + f'bright-{tag}.json', 'w'))
