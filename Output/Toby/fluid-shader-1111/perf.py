"""usage: perf.py <label> <query> <gfx high|performance> <view> [vw,vh,dsf]  -> fps with the camera parked on the pilot (both pieces on screen)"""
import sys,os,json,subprocess
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-shader-1111/'
VIEWS={'fall':(918,737,3),'stream':(1010,860,2),'both':(950,800,2)}
label,qs,gfx,view=sys.argv[1:5]
vw,vh,dsf=(1792,958,2)
if len(sys.argv)>5: vw,vh,dsf=[int(x) for x in sys.argv[5].split(',')]
os.environ['QS']=qs
ld=lambda: subprocess.run("uptime | sed 's/.*averages: //'",shell=True,capture_output=True,text=True).stdout.strip()
l0=ld()
with sync_playwright() as p:
    b,ctx,pg=setup(p,8942,vw,vh,dsf)
    pg.evaluate("async m=>{const g=await import('./src/graphics-setting.js');g.setGraphicsMode(m)}",gfx)
    fx,fy,z=VIEWS[view]
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}}")
    pg.evaluate(f"globalThis.__fsdbg={int(os.environ.get('FSDBG','0'))}")
    pg.wait_for_timeout(4000)
    r=measure(pg,8)
    st=pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return m.townFluidFxStats()})()")
    b.close()
out=dict(dbg=os.environ.get('FSDBG','0'),label=label,qs=qs,gfx=gfx,view=view,vp=[vw,vh,dsf],load_before=l0,load_after=ld(),fps=r['fps_avg'],min1s=r['fps_min_1s'],p95=r['ft_p95'],long=r['long_tasks'],fx_ms=st['ms'],shader=st.get('shader'))
print(json.dumps(out)); open(OUTD+'perf-results.jsonl','a').write(json.dumps(out)+'\n')
