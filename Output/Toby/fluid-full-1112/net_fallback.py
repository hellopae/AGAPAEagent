"""usage: net_fallback.py  -> work/net-fallback.json : (1) shader mode: which fluid files a walk across lava + overview fetches (2) no-WebGL fallback: frames play again"""
import sys,os,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/'
def run(label,noGL,qs=''):
    os.environ['QS']=qs
    reqs=[]; ROOT=os.path.expanduser('~/agapae-work/.toby-worktrees/z1-v5/')
    def rt(route):
        u=route.request.url; path=ROOT+u.split(':8795/')[1].split('?')[0]
        reqs.append((u,os.path.getsize(path) if os.path.exists(path) else 0)); route.continue_()
    with sync_playwright() as p:
        orig=p.chromium.launch
        def launch(**kw):
            b=orig(**kw); nc=b.new_context
            def newctx(**k):
                c=nc(**k)
                if noGL: c.add_init_script("const g=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...a){if(/webgl/i.test(t))return null;return g.call(this,t,...a)}")
                c.route('**/v5-fx/**',rt); return c
            b.new_context=newctx; return b
        p.chromium.launch=launch
        b,ctx,pg=setup(p,8795,390,844,2)
        pg.evaluate("document.getElementById('town-overview').click()"); pg.wait_for_timeout(2500)
        for (x,y,z) in [(700,400,2),(900,1450,2),(1000,1700,2),(2900,1760,2),(3000,1280,2),(3250,450,2),(1920,1280,0)]:
            cur=int(pg.evaluate("1"))
            pg.evaluate(f"G.mapTravel={{focus:{{x:{x},y:{y}}}}};G.paused=false")
            if z==2:
                for _ in range(2): pg.evaluate("document.getElementById('town-zoom-more').click()")
            else:
                for _ in range(3): pg.evaluate("document.getElementById('town-zoom-less').click()")
            pg.wait_for_timeout(3500)
        st=pg.evaluate("(async()=>{const m=await import('./src/town-fluid-fx.js');return m.townFluidFxStats()})()")
        b.close()
    kinds={}
    for u,n in reqs:
        f=u.split('/v5-fx/')[1].split('?')[0]
        k='shader-flow' if f.startswith('shader/') and f.endswith('.png') else 'shader-json' if f.startswith('shader/') else 'sheets/'+f.split('/')[-1] if f.startswith('sheets/') else 'masks' if f.startswith('masks/') else 'other:'+f
        d=kinds.setdefault(k,[0,0]); d[0]+=1; d[1]+=n
    return dict(label=label,stats=st,errors=pg.errors[:3],requests=kinds,totalMB=round(sum(v[1] for v in kinds.values())/1048576,2))
res=[run('shader (default)',False),run('no WebGL',True),run('?fluid=frames',False,'?fluid=frames')]
json.dump(res,open(OUTD+'work/net-fallback.json','w'),indent=1)
for r in res:
    print(r['label'],r['stats']['shader'],'drawn',r['stats']['drawn'],'shaderDrawn',r['stats']['shaderDrawn'],'MB',r['totalMB'],'errors',r['errors']); print('  ',{k:v for k,v in r['requests'].items()})
