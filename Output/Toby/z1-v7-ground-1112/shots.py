"""Z1 v7 ground: shots of the real game at 390x844 (DPR 2).  usage: shots.py <before|after> <outdir>
before = HEAD zone-skin.js (v7-partial);  after = working tree (v7).  Both served from the same worktree on :8795."""
import sys, os, importlib.util, subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright
WT = Path('/Users/agapae/agapae-work/.toby-worktrees/z1-v5')
spec = importlib.util.spec_from_file_location('ev', WT / 'scripts/z1-v5-fx-evidence.py'); ev = importlib.util.module_from_spec(spec); spec.loader.exec_module(ev)
ev.BASE = 'http://127.0.0.1:8795/index.html'
which, out = sys.argv[1], Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
SPOTS = {   # world units; seams = the old vertical joins of the HD chunks
    'seam-x800-y1200': (800, 1200), 'seam-x1600-y1200': (1600, 1200), 'seam-x2400-y1200': (2400, 1200), 'seam-x3200-y1100': (3200, 1100),
    'seam-x1600-y1800': (1600, 1800), 'seam-x2400-y700': (2400, 700),
    'corner-lava-nw': (330, 430), 'corner-heaven-ne': (3050, 520), 'corner-south-plaza': (2500, 2250), 'corner-pier': (2250, 1740), 'corner-central-bridge': (1850, 1700),
}
only = os.environ.get('ONLY'); spots = {k: v for k, v in SPOTS.items() if not only or k in only.split(',')}
with sync_playwright() as p:
    browser = p.chromium.launch(channel=ev.CH, args=['--autoplay-policy=no-user-gesture-required'])
    ctx = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    if which == 'before':
        body = subprocess.check_output(['git', 'show', 'HEAD:src/zone-skin.js'], cwd=WT, text=True)
        ctx.route('**/src/zone-skin.js*', lambda route: route.fulfill(status=200, content_type='text/javascript', body=body))
    pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('requestfailed', lambda r: errs.append('FAILED ' + r.url))
    pg.on('response', lambda r: errs.append(f'{r.status} {r.url}') if r.status >= 400 else None)
    pg.goto(ev.BASE); pg.wait_for_timeout(3000)
    try: pg.click('#enter-gate button', timeout=1500)
    except Exception: pass
    pg.wait_for_timeout(500); pg.click('#splash-skip'); pg.wait_for_timeout(2000); pg.click('#t-start'); pg.wait_for_timeout(1500)
    pg.click('text=SLOT 1'); pg.wait_for_timeout(2500); pg.click('#intro-skip'); pg.wait_for_timeout(1500)
    for _ in range(8):
        n = pg.evaluate("()=>{const ds=[...document.querySelectorAll('dialog[open]')];ds.forEach(d=>d.close());return ds.length}"); pg.wait_for_timeout(300)
        if not n: break
    pg.add_style_tag(content='#town-map-panel,.fabs,#res{visibility:hidden}')
    print('ground set', pg.evaluate("async()=>{const z=await import('./src/zone-skin.js');return [z.ZONE1_GROUND_SET,z.ZONE_SKIN.th.terrain.dir,z.ZONE_SKIN.th.terrain.chunk]}"))
    zoom = int(os.environ.get('ZOOM', '0'))
    for _ in range(zoom): pg.evaluate("document.getElementById('town-zoom-more').click()"); pg.wait_for_timeout(300)
    for name, (x, y) in spots.items():
        ev.look(pg, x, y); pg.wait_for_timeout(2500)
        pg.screenshot(path=str(out / f'{name}-{which}.png'))
        print(name, 'ok', flush=True)
    print('errors', errs[:8])
    browser.close()
