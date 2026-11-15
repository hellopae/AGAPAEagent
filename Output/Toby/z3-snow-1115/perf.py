"""fps of zone 3 with ground v7 (before) / v8 (after).  usage: perf.py <v7|v8> <high|performance> <walk|river|overview|pan> [secs]  -> appends work/perf.jsonl
1792x958 @2x like the earlier fluid / fog measurements (headless Chromium, software-ish GPU path: compare old with new only)."""
import sys, os, json, subprocess, time
sys.path.insert(0, os.path.expanduser('~/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-z234-1115'))
from zrun import *
WORK = os.path.dirname(os.path.abspath(__file__)) + '/work/'
REPO = os.path.expanduser('~/agapae-work/.toby-worktrees/z1-v5/')
zone = 'west'; mode, gfx, scene = sys.argv[1:4]; secs = int(sys.argv[4]) if len(sys.argv) > 4 else 8
INSTR = open('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110/instr.js').read()
VIEWS = {'river': (1300, 1800, 2), 'overview': (1920, 1280, 0), 'lava': (700, 800, 2), 'pan': (700, 800, 2)}
ld = lambda: subprocess.run("uptime | sed 's/.*averages: //'", shell=True, capture_output=True, text=True).stdout.strip()
def measure(pg, secs, action=None):
    pg.evaluate("__perf.reset()"); t0 = time.time()
    while time.time() - t0 < secs:
        if action: action()
        pg.wait_for_timeout(100)
    return pg.evaluate("__perf.summary()")
def route_v7(ctx):
    def h(route):
        u = route.request.url.split('/img/map-zone3/v8/')[1].split('?')[0]
        route.fulfill(path=REPO + 'img/map-zone3/v7/' + u, headers={'Cache-Control': 'no-store'})
    ctx.route('**/img/map-zone3/v8/*', h)
l0 = ld()
with sync_playwright() as p:
    b, pg, errs = boot(p, zone, '', 1792, 958, 2, gfx=gfx, init=INSTR, extra_route=route_v7 if mode == 'v7' else None)
    look(pg, 1500, 1250, 1500)
    if scene == 'walk':
        T = {'asia': [[2100, 1300], [1500, 1250], [1700, 700], [2300, 900]]}.get(zone) or [[2100, 1300], [1500, 1250], [1700, 700], [2300, 900]]
        def act():
            pg.evaluate("""(T)=>{const P=G.player;if(P.tx==null&&!(P.path&&P.path.length)){window.__wi=((window.__wi||0)+1)%4;G.walkTo(T[window.__wi][0],T[window.__wi][1]);}}""", T)
        pg.wait_for_timeout(2500); r = measure(pg, secs + 2, act)
    else:
        fx, fy, z = VIEWS[scene]
        pg.evaluate("document.getElementById('town-overview').click()")
        for _ in range(z): pg.evaluate("document.getElementById('town-zoom-more').click()"); pg.wait_for_timeout(300)
        pg.evaluate(f"G.mapTravel={{focus:{{x:{fx},y:{fy}}}}};G.paused=false"); pg.wait_for_timeout(4500)
        act = (lambda: pg.evaluate("(()=>{const t=performance.now()/1000*.8;G.mapTravel={focus:{x:700+300*Math.cos(t),y:1000+500*Math.sin(t)}}})()")) if scene == 'pan' else None
        r = measure(pg, secs, act)
    st = pg.evaluate(STATS); b.close()
out = dict(zone=zone, mode=mode, gfx=gfx, scene=scene, load=l0, fps=r['fps_avg'], min1s=r['fps_min_1s'], p95=r['ft_p95'], long=r['long_tasks'], fx_ms=(st or {}).get('ms'), err=errs[:2])
print(json.dumps(out)); open(WORK + 'perf.jsonl', 'a').write(json.dumps(out) + '\n')
