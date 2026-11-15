"""render-level check of the zone 2-4 fluid shader.  usage: check.py <zone> <tag> <x,y,zoom;...> [vw,vh,dsf]
per view (hero put at x,y, `zoom` = clicks of 'town-zoom-more'): 3 shader frames 0.45 s apart (only what the shader blits onto the map: hook.js) + the static ground (?fluid=none, canvas only).
 overflowPct = share of the shader layer that is NOT within 4 px of a liquid-coloured pixel of the static ground (loose test of build.loose)
 stuckPct    = share of the layer whose colour never moved over the 3 frames
 coverage    = share of strict liquid-coloured pixels that the layer covers
writes work/chk-<tag>-<i>-{static,a,diff}.png and work/chk-<tag>.json"""
import sys, io, base64, json
sys.path.insert(0, '.'); sys.argv_saved = sys.argv[:]
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from zrun import *
from zl import WORK
zone, tag = sys.argv[1], sys.argv[2]; views = [[float(a) for a in v.split(',')] for v in sys.argv[3].split(';')]
vw, vh, dsf = (390, 844, 2)
if len(sys.argv) > 4: vw, vh, dsf = [int(x) for x in sys.argv[4].split(',')]
Z = {'asia': 2, 'west': 3, 'cyberhell': 4}[zone]
sys.argv = ['build.py', str(Z)]
import build; from zl import hsv, disk
HOOK = open('hook.js').read()
HIDE = """(()=>{for(const el of document.querySelectorAll('body *')){if(el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;el.style.visibility='hidden';}for(const c of document.querySelectorAll('canvas'))if(c.width>=300){c.style.visibility='visible';let p=c.parentElement;while(p&&p!==document.body){p.style.visibility='visible';p=p.parentElement;}}})()"""
CROP = None
def shot(pg):
    global CROP
    im = np.array(Image.open(io.BytesIO(pg.screenshot())).convert('RGB'))
    if CROP is None:
        r = pg.evaluate("(()=>{let b=null;for(const c of document.querySelectorAll('canvas'))if(c.width>=300&&(!b||c.width*c.height>b.width*b.height))b=c;const r=b.getBoundingClientRect();return [r.left,r.top,b.width,b.height]})()")
        CROP = (int(round(r[0]*dsf)), int(round(r[1]*dsf)), int(r[2]), int(r[3]))
    x, y, w, h = CROP; return im[y:y+h, x:x+w]
def grab(pg):
    u = pg.evaluate("(()=>{const c=window.__sh; return c? c.toDataURL('image/png'):null})()")
    return np.array(Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).convert('RGBA')) if u else None
def settle(pg, n=2):
    f = pg.evaluate("window.__f"); pg.wait_for_function(f"window.__f>={f+n}")
res = []
with sync_playwright() as p:
    b, pg, errs = boot(p, zone, '', vw, vh, dsf, init=HOOK)
    cur = 0
    for i, (fx, fy, zm) in enumerate(views):
        look(pg, fx, fy, 1500)
        while cur < zm: pg.evaluate("document.getElementById('town-zoom-more').click()"); cur += 1; pg.wait_for_timeout(500)
        while cur > zm: pg.evaluate("document.getElementById('town-zoom-less').click()"); cur -= 1; pg.wait_for_timeout(500)
        look(pg, fx, fy, 2500); pg.evaluate(HIDE)
        fr, sh = [], []
        for k in range(3):
            settle(pg); fr.append(shot(pg)); sh.append(grab(pg)); pg.wait_for_timeout(450)
        pg.evaluate("import('./src/fluid-shader.js').then(m=>m.setFluidMode('none'))"); settle(pg, 3)
        S = shot(pg)
        pg.evaluate("import('./src/fluid-shader.js').then(m=>m.setFluidMode('shader'))")
        Image.fromarray(S).save(WORK + f'chk-{tag}-{i}-static.png'); Image.fromarray(fr[0]).save(WORK + f'chk-{tag}-{i}-a.png')
        img = Image.fromarray(S); A = [x[..., 3].astype(float)/255 for x in sh]; layer = A[0] > .5
        anyl = build.loose('lava', img) | build.loose('water', img)
        h_, s_, v_ = hsv(img)
        strict = ndi.binary_opening(((h_ > 11) & (h_ < 56) & (s_ > .72) & (v_ > .88)) | ((h_ > 170) & (h_ < 197) & (s_ > .62) & (v_ > .36)), disk(2))
        near = ndi.binary_dilation(anyl, disk(4)); over = layer & ~near
        rgb = [x[..., :3].astype(int) for x in sh]
        mv = (np.abs(rgb[0]-rgb[1]).sum(2) > 6) | (np.abs(rgb[1]-rgb[2]).sum(2) > 6) | (np.abs(rgb[0]-rgb[2]).sum(2) > 6)
        lay_all = (A[0] > .5) & (A[1] > .5) & (A[2] > .5); stuck = lay_all & ~mv; cover = strict & ~layer
        r = dict(view=views[i], layerPx=int(layer.sum()), overflowPct=round(100*over.sum()/max(1, layer.sum()), 2), stuckPct=round(100*stuck.sum()/max(1, lay_all.sum()), 2),
                 coveragePct=round(100*(1 - cover.sum()/max(1, strict.sum())), 1), pieces=int(pg.evaluate("window.__shn||0")))
        print(r); res.append(r)
        d = S.copy(); d[layer] = (d[layer]*.55 + np.array([0, 255, 0])*.45).astype(np.uint8); d[over] = [255, 0, 0]; d[stuck] = [0, 0, 255]; d[cover] = [255, 255, 0]
        Image.fromarray(d).save(WORK + f'chk-{tag}-{i}-diff.png')
    print('errors', errs[:4]); b.close()
json.dump(res, open(WORK + f'chk-{tag}.json', 'w'), indent=1)
