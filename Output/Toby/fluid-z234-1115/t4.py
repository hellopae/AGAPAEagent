import sys; sys.path.insert(0,'.')
from zrun import *
zone=sys.argv[1]; out=sys.argv[2]; x,y=float(sys.argv[3]),float(sys.argv[4]); less=int(sys.argv[5]); w,h,d=1000,720,1
with sync_playwright() as p:
    b,pg,errs=boot(p,zone,'',w,h,d)
    look(pg,x,y,2000)
    for _ in range(less): pg.evaluate("document.getElementById('town-zoom-less').click()"); pg.wait_for_timeout(400)
    look(pg,x,y,3500)
    print(pg.evaluate("(async()=>{const m=await import('./src/zone-clouds.js');return m.zoneCloudsDrawn()})()"))
    pg.add_style_tag(content='.hud,#hud,.fabs,#res,[class*=hud]{visibility:hidden}')
    pg.screenshot(path=out+'.png'); print(errs[:5]); b.close()
