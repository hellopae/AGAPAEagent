import sys
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
with sync_playwright() as p:
    b,ctx,pg=setup(p,8101)
    for i in range(4):
        pg.wait_for_timeout(1500)
        print(pg.evaluate("(()=>{const c=document.getElementById('cv');const m=c.getContext('2d').getTransform();return [m.a,m.d,c.width,c.height]})()"))
        pg.evaluate("document.getElementById('town-zoom-more').click()")
    b.close()
