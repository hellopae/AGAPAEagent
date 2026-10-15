"""K3 perf harness. usage: harness.py <port> <label> [scenes,comma] [--profile]"""
import sys,json,time,re
from playwright.sync_api import sync_playwright
OUT='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf/'
MEM="""(()=>{const m=new Map();Object.defineProperty(window,'localStorage',{value:{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear(),key:i=>[...m.keys()][i]??null,get length(){return m.size}}});})()"""
INSTR=open(OUT+'instr.js').read()
ARGS=['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist','--enable-gpu-rasterization']

def setup(p,port,vw=1440,vh=900,dsf=2):
    b=p.chromium.launch(args=ARGS)
    ctx=b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=dsf)
    ctx.add_init_script(MEM); ctx.add_init_script(INSTR)
    pg=ctx.new_page(); pg.errors=[]
    pg.on('pageerror',lambda e:pg.errors.append(str(e)))
    # share one module instance of ui.js between the page and our test hooks (review pages do the same)
    def fix(route):
        r=route.fetch(); body=r.text()
        body=re.sub(r'src="src/ui\.js\?[^"]*"','src="src/ui.js"',body)
        body=body.replace('</body>','<script type="module">window.__ui=await import("./src/ui.js");</script></body>')
        route.fulfill(response=r,body=body)
    pg.route(re.compile(r'.*/index\.html$'),fix)
    pg.goto(f'http://127.0.0.1:{port}/index.html')
    pg.wait_for_timeout(2500)
    for _ in range(10):
        if pg.is_visible('#t-new') and not pg.is_visible('#enter-gate'): break
        for sel in ('#splash-skip','#enter-button'):
            if pg.is_visible(sel):
                try: pg.click(sel,timeout=2000)
                except Exception: pass
        pg.wait_for_timeout(700)
    pg.click('#t-new'); pg.wait_for_timeout(1500)
    if pg.is_visible('#intro-skip'): pg.click('#intro-skip'); pg.wait_for_timeout(800)
    for _ in range(4):  # close any leftover dialogs
        if pg.evaluate("!!document.querySelector('dialog[open]')"):
            pg.keyboard.press('Escape'); pg.wait_for_timeout(400)
    pg.evaluate("G.save=()=>true;G.coin=10000")
    return b,ctx,pg

def measure(pg,secs,action=None,profile=False,cdp=None):
    pg.evaluate("__perf.reset()")
    if profile:
        cdp.send('Profiler.setSamplingInterval',{'interval':250}); cdp.send('Profiler.start')
    t0=time.time()
    while time.time()-t0<secs:
        if action: action()
        pg.wait_for_timeout(100)
    prof=None
    if profile: prof=cdp.send('Profiler.stop')['profile']
    r=pg.evaluate("__perf.summary()")
    if prof: r['profile']=summarize_profile(prof)
    return r

def summarize_profile(prof):
    nodes={n['id']:n for n in prof['nodes']}
    self_us={}
    dts=prof['timeDeltas']; samples=prof['samples']
    for s,d in zip(samples,dts): self_us[s]=self_us.get(s,0)+d
    agg={}
    total=sum(dts)
    for i,us in self_us.items():
        cf=nodes[i]['callFrame']; name=cf['functionName'] or '(anon)'
        url=cf['url'].split('/')[-1].split('?')[0]
        k=f"{name} {url}:{cf['lineNumber']+1}" if url else name
        agg[k]=agg.get(k,0)+us
    top=sorted(agg.items(),key=lambda kv:-kv[1])[:18]
    return {'total_ms':total/1000,'top':[(k,round(v/1000,1),round(100*v/total,1)) for k,v in top]}

def walk_action(pg):
    pg.evaluate("""()=>{const P=G.player;if(P.tx==null&&!(P.path&&P.path.length)){window.__wi=((window.__wi||0)+1)%4;const T=[[2100,1300],[1500,1250],[1700,700],[2300,900]][window.__wi];G.walkTo(T[0],T[1]);}}""")
