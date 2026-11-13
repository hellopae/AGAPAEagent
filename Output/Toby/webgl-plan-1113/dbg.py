import sys
from playwright.sync_api import sync_playwright
ARGS=['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist','--enable-gpu-rasterization']+(['--disable-frame-rate-limit','--disable-gpu-vsync'] if 'uncap' in sys.argv else [])
with sync_playwright() as p:
    b=p.chromium.launch(args=ARGS);ctx=b.new_context(viewport={'width':1792,'height':958},device_scale_factor=2);pg=ctx.new_page()
    pg.on('pageerror',lambda e:print('ERR',e));pg.on('console',lambda m:print('CON',m.type,m.text[:200]))
    pg.goto('http://127.0.0.1:8962/proto.html?mode=2d&dpr=2&root=/')
    for i in range(8):
        pg.wait_for_timeout(2500)
        print(i,pg.evaluate("window.__bench?[__bench.ready,__bench.frames.length,__bench.frames.slice(-5).map(x=>+x.toFixed(1))]:'no bench yet'"),flush=True)
    b.close()
