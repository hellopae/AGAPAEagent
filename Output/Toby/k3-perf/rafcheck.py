import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
  for name,args in [('gpu',['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist','--enable-gpu-rasterization']),('default',[]),('gpu+nothrottle',['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist','--enable-gpu-rasterization','--disable-renderer-backgrounding','--disable-background-timer-throttling','--disable-backgrounding-occluded-windows'])]:
    b=p.chromium.launch(args=args); pg=b.new_context(viewport={'width':1440,'height':900},device_scale_factor=2).new_page()
    pg.goto('about:blank')
    print(name,pg.evaluate("""()=>new Promise(r=>{let n=0,t0=performance.now();const f=()=>{n++;if(performance.now()-t0>2000)r(n/2);else requestAnimationFrame(f)};requestAnimationFrame(f)})"""))
    b.close()
