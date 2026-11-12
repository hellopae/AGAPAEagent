"""usage: ab.py <label> <x> <y> <zoom> [vw,vh,dsf] -> shots/<label>-{shader1,shader2,static,frames}.png  (static = weather off = painted ground only)"""
import sys,json,os
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/'
label=sys.argv[1]; fx,fy,z=float(sys.argv[2]),float(sys.argv[3]),int(sys.argv[4])
vw,vh,dsf=(390,844,2)
if len(sys.argv)>5: vw,vh,dsf=[int(x) for x in sys.argv[5].split(',')]
os.makedirs(OUTD+'shots',exist_ok=True)
HIDE="document.querySelectorAll('#hud, .hud, #town-hud, #bottom-bar, #team-bar, [id^=t-]').forEach(e=>e.style.visibility='hidden')"
def run(qs,tag,weatherOff=False,two=False):
    os.environ['QS']=qs
    with sync_playwright() as p:
        b,ctx,pg=setup(p,8795,vw,vh,dsf)
        pg.evaluate("document.getElementById('town-overview').click()")
        for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()")
        pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}};G.paused=false")
        pg.wait_for_timeout(4500)
        if weatherOff: pg.evaluate("(async()=>{const m=await import('./src/map-ambient.js');m.setWeatherEnabled(false)})()"); pg.wait_for_timeout(800)
        pg.screenshot(path=OUTD+f'shots/{label}-{tag}.png')
        if two:
            pg.wait_for_timeout(900); pg.screenshot(path=OUTD+f'shots/{label}-{tag}2.png')
        print(tag,pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return JSON.stringify(m.townFluidFxStats())})()"),pg.errors[:3])
        b.close()
run('','shader',two=True)
run('','static',weatherOff=True)
run('?fluid=frames','frames')
