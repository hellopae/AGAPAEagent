"""usage: perf3.py <mode shader|frames> <gfx high|performance> <scene walk|lava|river|overview|pan|ice|maxzoom> [secs]   -> appends work/perf-full.jsonl"""
import sys,os,json,subprocess
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/'
mode,gfx,scene=sys.argv[1:4]; secs=int(sys.argv[4]) if len(sys.argv)>4 else 8
os.environ['QS']='?fluid=frames' if mode=='frames' else ''
VIEWS={'lava':(700,800,2),'river':(1000,1700,2),'overview':(1920,1280,0),'ice':(3000,1280,2),'maxzoom':(918,737,5),'pan':(700,800,2)}
ld=lambda: subprocess.run("uptime | sed 's/.*averages: //'",shell=True,capture_output=True,text=True).stdout.strip()
l0=ld()
with sync_playwright() as p:
    b,ctx,pg=setup(p,8795,1792,958,2)
    pg.evaluate("async m=>{const g=await import('./src/graphics-setting.js');g.setGraphicsMode(m)}",gfx)
    if scene=='walk':
        pg.wait_for_timeout(3000); r=measure(pg,secs+2,lambda:walk_action(pg))
    else:
        fx,fy,z=VIEWS[scene]
        pg.evaluate("document.getElementById('town-overview').click()")
        for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
        pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}}"); pg.wait_for_timeout(4500)
        act=(lambda: pg.evaluate("(()=>{const t=performance.now()/1000*.8;G.mapTravel={focus:{x:700+300*Math.cos(t),y:1000+500*Math.sin(t)}}})()")) if scene=='pan' else None
        r=measure(pg,secs,act)
    st=pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return m.townFluidFxStats()})()")
    mem=pg.evaluate("(()=>{const m=performance.memory||{};return Math.round((m.usedJSHeapSize||0)/1048576)})()")
    b.close()
out=dict(mode=mode,gfx=gfx,scene=scene,load_before=l0,load_after=ld(),fps=r['fps_avg'],min1s=r['fps_min_1s'],p95=r['ft_p95'],long=r['long_tasks'],fx_ms=st['ms'],shader=st.get('shader'),heapMB=mem)
print(json.dumps(out)); open(OUTD+'work/perf-full.jsonl','a').write(json.dumps(out)+'\n')
