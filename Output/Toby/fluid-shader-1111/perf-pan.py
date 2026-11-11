"""camera pans in a circle over the pilot (shader pieces on screen and moving every frame). usage: perf-pan.py <label> <query> <gfx>"""
import sys,os,json,subprocess
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-shader-1111/'
label,qs,gfx=sys.argv[1:4]; os.environ['QS']=qs
ld=lambda: subprocess.run("uptime | sed 's/.*averages: //'",shell=True,capture_output=True,text=True).stdout.strip()
l0=ld()
with sync_playwright() as p:
    b,ctx,pg=setup(p,8942,1792,958,2)
    pg.evaluate("async m=>{const g=await import('./src/graphics-setting.js');g.setGraphicsMode(m)}",gfx)
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(2): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate("G.mapTravel={focus:{x:950,y:800}}"); pg.wait_for_timeout(4000)
    act=lambda: pg.evaluate("(()=>{const t=performance.now()/1000*.8;G.mapTravel={focus:{x:950+170*Math.cos(t),y:800+110*Math.sin(t)}}})()")
    r=measure(pg,10,act)
    st=pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return m.townFluidFxStats()})()")
    b.close()
out=dict(label=label,qs=qs,gfx=gfx,load_before=l0,load_after=ld(),fps=r['fps_avg'],min1s=r['fps_min_1s'],p95=r['ft_p95'],long=r['long_tasks'],shader=st.get('shader'))
print(json.dumps(out)); open(OUTD+'perf-pan.jsonl','a').write(json.dumps(out)+'\n')
