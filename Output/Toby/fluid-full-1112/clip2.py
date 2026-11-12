"""usage: clip2.py <mode shader|frames> <name> <x> <y> <zoom>  -> clips/raw-<name>-<mode>.webm (8 s, 390x844 css px, HUD hidden)"""
import sys,os,glob,shutil
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/'
mode,name,x,y,z=sys.argv[1],sys.argv[2],float(sys.argv[3]),float(sys.argv[4]),int(sys.argv[5])
os.environ['QS']='?fluid=frames' if mode=='frames' else ''
tmp=OUTD+'clips/tmp-'+name+mode; shutil.rmtree(tmp,ignore_errors=True); os.makedirs(tmp)
HIDE="""(()=>{for(const el of document.querySelectorAll('body *')){if(el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;el.style.visibility='hidden';}for(const c of document.querySelectorAll('canvas'))if(c.width>=300){c.style.visibility='visible';let p=c.parentElement;while(p&&p!==document.body){p.style.visibility='visible';p=p.parentElement;}}})()"""
import time
T0=time.time()
with sync_playwright() as p:
    orig=p.chromium.launch
    def launch(**kw):
        b=orig(**kw); nc=b.new_context
        b.new_context=lambda **k: nc(record_video_dir=tmp,record_video_size={'width':390,'height':844},**k); return b
    p.chromium.launch=launch
    b,ctx,pg=setup(p,8795,390,844,1)
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate(f"G.mapTravel={{focus:{{x:{x},y:{y}}}}};G.paused=false")
    pg.wait_for_timeout(4500); pg.evaluate(HIDE); pg.wait_for_timeout(300); T1=time.time()-T0; pg.wait_for_timeout(8000)
    ctx.close(); b.close()
v=glob.glob(tmp+'/*.webm')[0]; os.rename(v,OUTD+f'clips/raw-{name}-{mode}.webm'); shutil.rmtree(tmp); open(OUTD+f'clips/off-{name}-{mode}.txt','w').write(str(T1)); print('ok',T1)
