"""before / after pictures (3 views per zone) and one GIF of the liquid flowing per zone.  usage: evidence.py <outdir>
before = ?z234=old (old particle flow, old gradient cloud banks, old blob shadows), after = the new layers.  390x844 @2x; the 3rd view of each zone is one zoom step out (clouds + shadows show more)."""
import sys, os, io, time; sys.path.insert(0, '.')
from zrun import *
from PIL import Image
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
VIEWS = {'asia': [('lava-canyon', 800, 900, 0), ('right-cascades', 2850, 950, 0), ('river-lava-mouth', 1000, 1560, 1)],
         'west': [('bridge-cascade', 1000, 1000, 0), ('right-cascades', 2900, 950, 0), ('river', 1500, 1700, 1)],
         'cyberhell': [('lava-canyon', 700, 500, 0), ('right-river', 2900, 900, 0), ('river-lava-mouth', 1300, 1650, 1)]}
GIF = {'asia': (800, 900), 'west': (1500, 1700), 'cyberhell': (700, 500)}
NOFIGHT = "()=>{for(const k of ['startBattle','startMobBattle','startQuestFight','startFrontierBattle','startBossFight'])G[k]=()=>{}}"   # evidence only: an enemy that catches the hero would open a battle in the middle of the shot
N = {'asia': 'z2', 'west': 'z3', 'cyberhell': 'z4'}
class Battle(Exception): pass
def chk(pg):
    # west: closing the rescue alert with close() (what the screenshot harness does) starts that fight; flee it so the map is on screen again
    for _ in range(3):
        if not pg.evaluate('!!G.battle'): return
        pg.evaluate('()=>{try{G.fleeBattle()}catch(e){}}'); pg.wait_for_timeout(1500); pg.evaluate("()=>{for(const d of document.querySelectorAll('dialog[open]'))d.close();G.paused=false}")
    if pg.evaluate('!!G.battle'): raise Battle()
def shots(zone, qs, tag):
    with sync_playwright() as p:
        b, pg, errs = boot(p, zone, qs, 390, 844, 2); cur = 0; pg.evaluate(NOFIGHT)
        for i, (name, x, y, zm) in enumerate(VIEWS[zone]):
            look(pg, x, y, 1500)
            while cur < zm: pg.evaluate("document.getElementById('town-zoom-more').click()"); cur += 1; pg.wait_for_timeout(400)
            while cur > zm: pg.evaluate("document.getElementById('town-zoom-less').click()"); cur -= 1; pg.wait_for_timeout(400)
            chk(pg); look(pg, x, y, 3500); chk(pg)
            Image.open(io.BytesIO(pg.screenshot())).convert('RGB').save(f'{out}/{N[zone]}-{i+1}-{name}-{tag}.jpg', quality=88)
        print(zone, tag, errs[:3]); b.close()
def gif(zone):
    x, y = GIF[zone]; frames = []; t0 = time.time()
    with sync_playwright() as p:
        b, pg, errs = boot(p, zone, '', 390, 844, 1); pg.evaluate(NOFIGHT)
        look(pg, x, y, 3000)
        for k in range(26):
            pg.evaluate("([x,y])=>{const P=G.player;P.x=x;P.y=y;P.tx=x;P.ty=y;P.path=[]}", [x, y])   # hold the hero still (the west rescue alert's button sends him walking)
            frames.append(Image.open(io.BytesIO(pg.screenshot())).convert('RGB')); pg.wait_for_timeout(60)
            if pg.evaluate('!!G.battle'):
                frames.pop()
                if len(frames) >= 12: break
                raise Battle()
        el = time.time() - t0; b.close()
    ms = 110
    pal = [f.quantize(colors=96, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE) for f in frames]
    pal[0].save(f'{out}/{N[zone]}-liquid-flowing.gif', save_all=True, append_images=pal[1:], duration=ms, loop=0, optimize=True)
    print(zone, 'gif', os.path.getsize(f'{out}/{N[zone]}-liquid-flowing.gif') // 1024, 'KB')
ONLY = sys.argv[3] if len(sys.argv) > 3 else None
for zone in (sys.argv[2].split(',') if len(sys.argv) > 2 else ('asia', 'west', 'cyberhell')):
    for fn in [f for f, nm in ((lambda: shots(zone, '?z234=old', 'before'), 'shots'), (lambda: shots(zone, '', 'after'), 'shots'), (lambda: gif(zone), 'gif')) if not ONLY or nm == ONLY]:
        for attempt in range(5):
            try: fn(); break
            except Battle: print(zone, 'a battle started in the shot, again', attempt)
