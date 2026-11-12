"""render-level check.  usage: render_check.py <tag> <x,y,zoom;x,y,zoom;...> [vw,vh,dsf]
per view: static (weather off = painted ground only) + 3 shader frames 0.45 s apart (canvas only, HUD hidden).
 changed   = pixels where any shader frame differs from the static ground
 overflow  = changed pixels that are NOT within 4 px of a liquid-coloured pixel of the static ground (loose test of build_fluids.loose, all three liquids)
 stuck     = pixels of the strict liquid colour (cutting gamut) whose value never moved between the 3 shader frames and the static ground
writes shots/<tag>-<i>-{static,a}.png and work/render-<tag>.json"""
import sys,json,os
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110'); sys.path.insert(0,'.')
from harness import *
import numpy as np, io
from PIL import Image
from scipy import ndimage as ndi
from cls import GAMUT
from build_fluids import loose
from fl import hsv, disk
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/'
tag=sys.argv[1]; views=[[float(a) for a in v.split(',')] for v in sys.argv[2].split(';')]
vw,vh,dsf=(390,844,2)
if len(sys.argv)>3: vw,vh,dsf=[int(x) for x in sys.argv[3].split(',')]
HIDE="""(()=>{for(const el of document.querySelectorAll('body *')){if(el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;el.style.visibility='hidden';}for(const c of document.querySelectorAll('canvas'))if(c.width>=300){c.style.visibility='visible';let p=c.parentElement;while(p&&p!==document.body){p.style.visibility='visible';p=p.parentElement;}}})()"""
res=[]
CROP=None
def shot(pg):
    global CROP
    im=np.array(Image.open(io.BytesIO(pg.screenshot())).convert('RGB'))
    if CROP is None:
        r=pg.evaluate("(()=>{let b=null;for(const c of document.querySelectorAll('canvas'))if(c.width>=300&&(!b||c.width*c.height>b.width*b.height))b=c;const r=b.getBoundingClientRect();return [r.left,r.top,b.width,b.height]})()")
        CROP=(int(round(r[0]*dsf)),int(round(r[1]*dsf)),int(r[2]),int(r[3]))
    x,y,w,h=CROP; return im[y:y+h,x:x+w]
import harness
harness.INSTR+=open(OUTD+'hook.js').read()
GRAB="""(()=>{const c=window.__sh; return c? c.toDataURL('image/png'):null})()"""
def grab(pg):
    import base64
    u=pg.evaluate(GRAB)
    return np.array(Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).convert('RGBA')) if u else None
def settle(pg,n=2):
    f=pg.evaluate("window.__f")
    pg.wait_for_function(f"window.__f>={f+n}")
with sync_playwright() as p:
    b,ctx,pg=setup(p,8795,vw,vh,dsf)
    pg.evaluate("document.getElementById('town-overview').click()")
    cur=0
    for i,(fx,fy,z) in enumerate(views):
        while cur<z: pg.evaluate("document.getElementById('town-zoom-more').click()"); cur+=1
        while cur>z: pg.evaluate("document.getElementById('town-zoom-less').click()"); cur-=1
        pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}};G.paused=false")
        pg.wait_for_timeout(4200); pg.evaluate(HIDE)
        fr=[]; sh=[]
        for k in range(3):
            settle(pg); fr.append(shot(pg)); sh.append(grab(pg)); pg.wait_for_timeout(450)
        pg.evaluate("import('./src/fluid-shader.js').then(m=>m.setFluidMode('none'))"); settle(pg,3)
        S=shot(pg)
        pg.evaluate("import('./src/fluid-shader.js').then(m=>m.setFluidMode('shader'))")
        Image.fromarray(S).save(OUTD+f'shots/{tag}-{i}-static.png'); Image.fromarray(fr[0]).save(OUTD+f'shots/{tag}-{i}-a.png')
        img=Image.fromarray(S)
        A=[x[...,3].astype(float)/255 for x in sh]
        layer=A[0]>.5                       # where the shader painted (alpha > .5)
        any_liq=np.zeros(S.shape[:2],bool); strict=np.zeros(S.shape[:2],bool); any_liq|=loose('cloud',img)
        for kind in ('lava','ice','spirit'):
            any_liq|=loose(kind,img); strict|=ndi.binary_opening(GAMUT[kind](img),disk(2))
        near=ndi.binary_dilation(any_liq,disk(4))
        over=layer&~near
        rgb=[x[...,:3].astype(int) for x in sh]
        mv=(np.abs(rgb[0]-rgb[1]).sum(2)>6)|(np.abs(rgb[1]-rgb[2]).sum(2)>6)|(np.abs(rgb[0]-rgb[2]).sum(2)>6)
        lay_all=(A[0]>.5)&(A[1]>.5)&(A[2]>.5)
        stuck=lay_all&~mv
        cover=strict&~layer
        r=dict(view=views[i],layerPx=int(layer.sum()),overflowPx=int(over.sum()),overflowPct=round(100*over.sum()/max(1,layer.sum()),2),stuckPx=int(stuck.sum()),stuckPct=round(100*stuck.sum()/max(1,lay_all.sum()),2),strictLiquidPx=int(strict.sum()),uncoveredStrictPx=int(cover.sum()),uncoveredPct=round(100*cover.sum()/max(1,strict.sum()),2),pieces=int(pg.evaluate("window.__shn||0")))
        print(r); res.append(r)
        d=S.copy(); d[layer]=(d[layer]*.55+np.array([0,255,0])*.45).astype(np.uint8); d[over]=[255,0,0]; d[stuck]=[0,0,255]; d[cover]=[255,255,0]
        Image.fromarray(d).save(OUTD+f'shots/{tag}-{i}-diff.png')
    print('errors',pg.errors[:3]); b.close()
json.dump(res,open(OUTD+f'work/render-{tag}.json','w'),indent=1)
