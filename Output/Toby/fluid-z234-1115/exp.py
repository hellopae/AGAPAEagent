"""experiment: fps with a patched src/fluid-shader.js.  usage: exp.py <zone> <gfx> <name>   names: base | interval100 | noblit | nodraw"""
import sys, time, re; sys.path.insert(0,'.')
from zrun import *
zone, gfx, name = sys.argv[1:4]
INSTR = open('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110/instr.js').read()
P = {'base': [], 'interval100': [("const fluidMs = graphicsProfile().fluidIntervalMs;", "const fluidMs = 100;")],
     'freeze': [("fluidMs = Math.max(fluidMs, h.lodMs);", "fluidMs = 1e9;")],
     'lod250': [("fluidMs = Math.max(fluidMs, h.lodMs);", "fluidMs = 250;")],
     'far25': [("SHADER_MAX_SCALE_FAR = .5;", "SHADER_MAX_SCALE_FAR = .2;")],
     'noblit': [("function blit(ctx, source, sx, sy, geo, dx, dy) {", "function blit(ctx, source, sx, sy, geo, dx, dy) { return;")],
     'nodraw': [("  if (!fluidShaderActive(st)) return 0;", "  return 0;")]}[name]
def route(ctx):
    def f(r):
        rr = r.fetch(); body = rr.text()
        for a, b in P: assert a in body, a; body = body.replace(a, b)
        r.fulfill(response=rr, body=body, headers={**rr.headers, 'content-type': 'text/javascript'})
    if P: ctx.route(re.compile(r'.*/src/fluid-shader\.js.*'), f)
with sync_playwright() as p:
    b, pg, errs = boot(p, zone, '', 1792, 958, 2, gfx=gfx, init=INSTR, extra_route=route)
    look(pg, 1500, 1250, 1500)
    pg.evaluate("document.getElementById('town-overview').click()"); pg.wait_for_timeout(5000)
    pg.evaluate("__perf.reset()"); pg.wait_for_timeout(8000); r = pg.evaluate("__perf.summary()")
    print(zone, gfx, name, 'fps', r['fps_avg'], errs[:2]); b.close()
