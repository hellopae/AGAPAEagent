"""download size of the zone-1 ground: boot -> stand at spawn -> walk the whole map route (390x844 @3).  usage: dl.py <port>"""
import sys, importlib.util, json, re
from pathlib import Path
from playwright.sync_api import sync_playwright
WT = Path('/Users/agapae/agapae-work/.toby-worktrees/z1-v5')
spec = importlib.util.spec_from_file_location('ev', WT / 'scripts/z1-v5-fx-evidence.py'); ev = importlib.util.module_from_spec(spec); spec.loader.exec_module(ev)
port = sys.argv[1]; ev.BASE = f'http://127.0.0.1:{port}/index.html'
sizes = {}
with sync_playwright() as p:
    pp = p
    browser, ctx, pg, errs, _ = ev.boot(p, 390, 844, 3, True)
    def on(r):
        if '/img/map-zone1/v' in r.url and 'v5-fx' not in r.url and 'v4/' not in r.url:
            try: sizes[r.url] = int(r.headers.get('content-length') or len(r.body()))
            except Exception: pass
    pg.on('response', on)
    # boot already finished before the listener: count the preview + first tiles by reloading the zone view
    route = [(1900, 1850), (1900, 1000), (900, 760), (700, 1500), (1500, 1760), (2500, 2200), (3100, 1200), (2500, 500), (1500, 500), (500, 400)]
    for x, y in route:
        ev.look(pg, x, y); pg.wait_for_timeout(2500)
    print(port, 'tiles fetched', len([u for u in sizes if re.search(r'/r\d+-c\d+\.webp', u)]), 'tile+sprite MB', round(sum(sizes.values()) / 1e6, 2))
    browser.close()
