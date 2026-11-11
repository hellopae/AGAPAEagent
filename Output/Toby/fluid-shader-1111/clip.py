"""usage: clip.py <label> <query> <view>  -> clips/raw-<label>-<view>.webm (10 s of the pilot with the camera parked)"""
import sys,os,time,glob,shutil
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-shader-1111/'
VIEWS={'fall':(918,737,3),'both':(950,800,2)}
label,qs,view=sys.argv[1:4]; os.environ['QS']=qs
tmp=OUTD+'clips/tmp-'+label+'-'+view; shutil.rmtree(tmp,ignore_errors=True); os.makedirs(tmp)
with sync_playwright() as p:
    orig=p.chromium.launch
    def launch(**kw):
        b=orig(**kw); nc=b.new_context
        b.new_context=lambda **k: nc(record_video_dir=tmp,record_video_size={'width':1280,'height':684},**k); return b
    p.chromium.launch=launch
    b,ctx,pg=setup(p,8942,1792,958,2)
    fx,fy,z=VIEWS[view]
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}}")
    pg.wait_for_timeout(4000)
    pg.evaluate("window.__t10=performance.now()")
    t0=time.time(); pg.wait_for_timeout(10500); dur=time.time()-t0
    ctx.close(); b.close()
v=glob.glob(tmp+'/*.webm')[0]; os.rename(v,OUTD+f'clips/raw-{label}-{view}.webm'); shutil.rmtree(tmp)
print('ok',dur)
