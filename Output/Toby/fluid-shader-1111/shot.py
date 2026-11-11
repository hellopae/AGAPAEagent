"""usage: shot.py <label> <query> <view> [vw,vh,dsf]   view = name of a preset below. Saves shots/<label>-<view>.png"""
import sys,json,os
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-shader-1111/'
VIEWS={'fall':(918,737,3),'stream':(1010,860,2),'both':(950,800,2)}   # focus x,y (world), zoom clicks
label,qs,view=sys.argv[1:4]
vw,vh,dsf=(1792,958,2)
if len(sys.argv)>4: vw,vh,dsf=[int(x) for x in sys.argv[4].split(',')]
os.environ['QS']=qs
with sync_playwright() as p:
    b,ctx,pg=setup(p,8942,vw,vh,dsf)
    fx,fy,z=VIEWS[view]
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}};G.paused=false")
    pg.wait_for_timeout(5000)
    print(pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return JSON.stringify(m.townFluidFxStats())})()"))
    os.makedirs(OUTD+'shots',exist_ok=True)
    pg.screenshot(path=OUTD+f'shots/{label}-{view}.png')
    print('errors',pg.errors[:5])
    b.close()
