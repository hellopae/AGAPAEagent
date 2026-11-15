import sys, time, json; sys.path.insert(0,'.'); sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from zrun import *
import harness
zone, qs, gfx, scene = sys.argv[1:5]
INSTR = open('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110/instr.js').read()
with sync_playwright() as p:
    b, pg, errs = boot(p, zone, qs, 1792, 958, 2, gfx=gfx, init=INSTR)
    look(pg, 1500, 1250, 1500)
    pg.evaluate("document.getElementById('town-overview').click()"); pg.wait_for_timeout(5000)
    cdp = pg.context.new_cdp_session(pg); cdp.send('Profiler.enable')
    pg.evaluate("__perf.reset()")
    r = harness.measure(pg, 8, None, profile=True, cdp=cdp)
    print('fps', r['fps_avg'])
    for k, ms, pc in r['profile']['top'][:14]: print(f'{pc:5.1f}%  {ms:7.1f}ms  {k}')
    b.close()
