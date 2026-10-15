import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
port=sys.argv[1]
def line(k,v): print(f"{k:34} fps {v['fps_avg']:5} p95 {v['ft_p95']:6} jsframe? calls/frame drawImage {v['calls'].get('drawImage',0)/v['frames']:.0f}")
with sync_playwright() as p:
    b,ctx,pg=setup(p,port)
    pg.wait_for_timeout(1500)
    line('baseline',measure(pg,5))
    pg.evaluate("document.getElementById('hud-zoom').click()")  # unused toggle
    pg.wait_for_timeout(1000); line('after zoom toggle',measure(pg,4))
    pg.evaluate("document.getElementById('hud-zoom').click()");pg.wait_for_timeout(1500)
    pg.add_style_tag(content="*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}")
    pg.wait_for_timeout(500); line('no backdrop-filter',measure(pg,4))
    pg.add_style_tag(content="*{filter:none!important;box-shadow:none!important;text-shadow:none!important}")
    pg.wait_for_timeout(500); line('+ no filter/box-shadow',measure(pg,4))
    pg.add_style_tag(content=".wrap>*:not(.stage):not(.scene-box){display:none!important}")
    pg.wait_for_timeout(500); line('+ hide HUD siblings',measure(pg,4))
    pg.evaluate("document.querySelectorAll('#ov,.fabs').forEach(e=>e.style.display='none')")
    pg.wait_for_timeout(500); line('+ hide overlay',measure(pg,4))
    print(pg.evaluate("""[...document.querySelectorAll('canvas')].map(c=>c.id+' '+c.width+'x'+c.height+' css '+c.clientWidth+'x'+c.clientHeight+' '+(c.parentElement.className))"""))
    b.close()
