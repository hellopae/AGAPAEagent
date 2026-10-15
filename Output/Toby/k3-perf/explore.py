import sys,time
from playwright.sync_api import sync_playwright
port=sys.argv[1]
MEM="""(()=>{const m=new Map();Object.defineProperty(window,'localStorage',{value:{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear(),key:i=>[...m.keys()][i]??null,get length(){return m.size}}});})()"""
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist','--enable-gpu-rasterization'])
    ctx=b.new_context(viewport={'width':1440,'height':900},device_scale_factor=2)
    ctx.add_init_script(MEM)
    pg=ctx.new_page()
    logs=[]
    pg.on('console',lambda m:logs.append(m.text))
    pg.on('pageerror',lambda e:logs.append('ERR '+str(e)))
    pg.goto(f'http://127.0.0.1:{port}/index.html')
    pg.wait_for_timeout(4000)
    pg.screenshot(path='/private/tmp/claude-501/-Users-agapae-Documents-Work-PAE-Claude-AGAPAE-Agent/26c1095c-e4ae-4228-aee1-af324c68ff82/scratchpad/e0.png')
    print(pg.evaluate("[...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.id+':'+b.textContent.trim().slice(0,20)).slice(0,20)"))
    print(logs[:10])
    b.close()
