import sys,os,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
os.environ['QS']='?fluid=shader'
VIEWS={'both':(950,800,2)}
with sync_playwright() as p:
    b,ctx,pg=setup(p,8942,1792,958,2)
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(2): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate("G.mapTravel={focus:{x:950,y:800}}")
    pg.wait_for_timeout(4000)
    for fin in (False,True):
        pg.evaluate(f"globalThis.__fsfinish={str(fin).lower()};globalThis.__fs=null")
        pg.wait_for_timeout(4000)
        print('finish',fin,pg.evaluate("(()=>{const d=__fs;return d&&{n:d.n,cap:d.cap/d.n,up:d.up/d.n,gl:d.gl/d.n,blit:d.blit/d.n,pxK:d.px/d.n/1000}})()"))
    b.close()
