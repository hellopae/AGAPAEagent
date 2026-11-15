import sys; sys.path.insert(0,'.')
from zrun import *
with sync_playwright() as p:
    b,pg,errs=boot(p,'west','',390,844,2)
    look(pg,1000,1000,2500)
    print(pg.evaluate("({paused:G.paused, dlg:document.querySelectorAll('dialog[open]').length, hid:document.hidden, st:null})"))
    print(pg.evaluate(STATS)); pg.wait_for_timeout(1500); print(pg.evaluate(STATS))
    print(pg.evaluate("(async()=>{const m=await import('./src/graphics-setting.js');const w=await import('./src/map-ambient.js');return {gfx:m.getGraphicsMode&&m.getGraphicsMode(), weather:w.weatherEnabled(), reduced:matchMedia('(prefers-reduced-motion: reduce)').matches}})()"))
    print(errs); b.close()
