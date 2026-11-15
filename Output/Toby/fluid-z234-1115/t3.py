import sys; sys.path.insert(0,'.')
from zrun import *
zone=sys.argv[1]; out=sys.argv[2]; w,h=(int(sys.argv[3]),int(sys.argv[4])) if len(sys.argv)>4 else (390,844)
with sync_playwright() as p:
    b,pg,errs=boot(p,zone,'',w,h,2)
    look(pg,1900,1200,2500)
    pg.evaluate("document.getElementById('town-overview').click()"); pg.wait_for_timeout(4000)
    print(pg.evaluate("(async()=>{const m=await import('./src/zone-clouds.js');return m.zoneCloudsDrawn()})()"))
    pg.screenshot(path=out+'.png'); print(errs[:5]); b.close()
