import sys,os
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-shader-1111/'
os.environ['QS']='?fluid=shader'
with sync_playwright() as p:
    orig=p.chromium.launch
    def launch(**kw):
        b=orig(**kw); nc=b.new_context
        def newctx(**k):
            c=nc(**k)
            c.add_init_script("const g=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...a){if(/webgl/i.test(t))return null;return g.call(this,t,...a)}")
            return c
        b.new_context=newctx; return b
    p.chromium.launch=launch
    b,ctx,pg=setup(p,8942,1792,958,2)
    pg.evaluate("document.getElementById('town-overview').click()")
    for _ in range(2): pg.evaluate("document.getElementById('town-zoom-more').click()")
    pg.evaluate("G.mapTravel={focus:{x:950,y:800}}"); pg.wait_for_timeout(5000)
    print(pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return JSON.stringify(m.townFluidFxStats())})()"))
    pg.screenshot(path=OUTD+'shots/fallback-no-webgl.png'); print('errors',pg.errors[:3]); b.close()
