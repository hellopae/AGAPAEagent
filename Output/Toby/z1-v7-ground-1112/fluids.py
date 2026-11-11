"""fluid layer on|off at the places where Codex's painted frames sit, on the v7 ground.  usage: fluids.py <outdir> [shader]"""
import sys, os, importlib.util
from pathlib import Path
from playwright.sync_api import sync_playwright
WT = Path('/Users/agapae/agapae-work/.toby-worktrees/z1-v5')
spec = importlib.util.spec_from_file_location('ev', WT / 'scripts/z1-v5-fx-evidence.py'); ev = importlib.util.module_from_spec(spec); spec.loader.exec_module(ev)
ev.BASE = 'http://127.0.0.1:8795/index.html' + ('?fluid=shader' if 'shader' in sys.argv else '')
out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
VIEWS = {'lava-fall-west': (330, 640), 'lava-fall-bridge': (560, 330), 'river-bridge': (1880, 1700), 'ice-waterfall': (2380, 960), 'heaven-gate': (2480, 470), 'lava-flat': (700, 1000)}
with sync_playwright() as p:
    pp = p
    if os.environ.get('BEFORE'):       # the game as it was at HEAD (ground set v7-partial): serve HEAD's zone-skin.js
        import subprocess
        body = subprocess.check_output(['git', 'show', 'HEAD:src/zone-skin.js'], cwd=WT, text=True)
        class _B:
            def __init__(s, b): s.b = b
            def new_context(s, **k):
                c = s.b.new_context(**k); c.route('**/src/zone-skin.js*', lambda r: r.fulfill(status=200, content_type='text/javascript', body=body)); return c
            def __getattr__(s, n): return getattr(s.b, n)
        class _C:
            def launch(s, **k): return _B(p.chromium.launch(**k))
        class _P: chromium = _C()
        pp = _P()
    browser, ctx, pg, errs, _ = ev.boot(pp, 390, 844, 2, True)
    pg.evaluate("document.getElementById('town-zoom-more').click()"); pg.wait_for_timeout(500)
    for n, (x, y) in VIEWS.items():
        ev.look(pg, x, y); pg.wait_for_timeout(2500)
        for on in (True, False):
            pg.evaluate(ev.SETW, on); pg.wait_for_timeout(900)
            pg.screenshot(path=str(out / f'{n}-{"on" if on else "off"}.png'))
        pg.evaluate(ev.SETW, True)
        print(n, pg.evaluate(ev.STATS), flush=True)
    print('errors', [e for e in errs if 'willRead' not in e][:5]); browser.close()
