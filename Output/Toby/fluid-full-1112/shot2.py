"""usage: shot2.py <label> <query> <x> <y> <zoomclicks> [vw,vh,dsf] [wait_ms]   world focus x,y  -> shots/<label>.png + stats"""
import sys,json,os
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/'
label,qs=sys.argv[1:3]; fx,fy,z=float(sys.argv[3]),float(sys.argv[4]),int(sys.argv[5])
vw,vh,dsf=(390,844,2)
if len(sys.argv)>6: vw,vh,dsf=[int(x) for x in sys.argv[6].split(',')]
wait=int(sys.argv[7]) if len(sys.argv)>7 else 4500
os.environ['QS']=qs
with sync_playwright() as p:
    b,ctx,pg=setup(p,8795,vw,vh,dsf)
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}};G.paused=false")
    pg.wait_for_timeout(wait)
    print(pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return JSON.stringify(m.townFluidFxStats())})()"))
    os.makedirs(OUTD+'shots',exist_ok=True)
    pg.screenshot(path=OUTD+f'shots/{label}.png')
    print('errors',pg.errors[:5])
    b.close()
