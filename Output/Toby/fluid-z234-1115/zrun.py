"""game driver for the zone 2-4 FX work.   import zrun; with sync_playwright() as p: b, pg, errs = zrun.boot(p, zone, qs, w, h, dpr, gfx)
zrun.look(pg, x, y, zoom) puts the hero (camera follows) at world x,y; zoom = number of 'town-zoom-more' clicks from the default."""
import os, sys, time, json
from playwright.sync_api import sync_playwright
BASE = os.environ.get('BASE', 'http://127.0.0.1:8961/index.html')
ARGS = ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--autoplay-policy=no-user-gesture-required']
DISMISS = "()=>{const ds=[...document.querySelectorAll('dialog[open]')];ds.forEach(d=>d.close());return ds.length}"
# the story dialogs the way a player closes them (first button; the west rescue alert with Escape) - d.close() on that alert starts its fight
DISMISS_UI = "()=>{const d=document.querySelector('dialog[open]');if(!d)return 0;const b=d.querySelector('button');if(b)b.click();else d.close();return 1}"
def boot(p, zone, qs='', w=390, h=844, dpr=2, gfx='high', extra_route=None, init=None):
    b = p.chromium.launch(args=ARGS)
    ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=dpr)
    if extra_route: extra_route(ctx)
    if init: ctx.add_init_script(init)
    pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)))
    pg.on('console', lambda m: errs.append('console.error: ' + m.text) if m.type == 'error' else None)
    pg.on('response', lambda r: errs.append(f'http {r.status}: {r.url}') if r.status >= 400 else None)
    pg.goto(BASE + qs); pg.wait_for_timeout(3000)
    try: pg.click('#enter-gate button', timeout=1500)
    except Exception: pass
    pg.wait_for_timeout(500); pg.click('#splash-skip'); pg.wait_for_timeout(2000)
    pg.click('#t-start'); pg.wait_for_timeout(1500); pg.click('text=SLOT 1'); pg.wait_for_timeout(2500)
    pg.click('#intro-skip'); pg.wait_for_timeout(1500)
    for _ in range(8):
        n = pg.evaluate(DISMISS_UI); pg.wait_for_timeout(300)
        if not n: break
    pg.evaluate("G.save=()=>true")
    if gfx != 'high': pg.evaluate("async m=>{const g=await import('./src/graphics-setting.js');g.setGraphicsMode(m)}", gfx)
    pg.evaluate("""async(k)=>{const z=G.zoneTravel;for(const q of ['th','asia','west','cyberhell']){z.visited[q]=true;z.ports[q]=true;}
      const p=G.harbourPoint();G.player.x=p.x;G.player.y=p.y;G.player.tx=p.x;G.player.ty=p.y;if(G.zone!==k)G.moveZone(k);}""", zone)
    pg.wait_for_timeout(2500)
    for _ in range(4): pg.evaluate(DISMISS_UI); pg.wait_for_timeout(500)
    pg.add_style_tag(content='#town-map-panel,.fabs,#res{visibility:hidden} dialog{display:none!important}')
    return b, pg, errs
def look(pg, x, y, wait=1500):
    pg.evaluate("([x,y])=>{G.player.x=x;G.player.y=y;G.player.tx=x;G.player.ty=y}", [x, y]); pg.wait_for_timeout(wait)
    for _ in range(30):
        if pg.evaluate("async()=>{const m=await import('./src/town-terrain.js');return m.townTerrainViewStats().mode}") == 'detail': break
        pg.wait_for_timeout(250)
    pg.wait_for_timeout(500)
    for _ in range(3):
        if not pg.evaluate(DISMISS_UI): break
        pg.wait_for_timeout(400)
    pg.evaluate("G.paused=false"); pg.wait_for_timeout(300)
STATS = "async()=>{const m=await import('./src/town-fluid-fx.js');return m.townFluidFxStats()}"
