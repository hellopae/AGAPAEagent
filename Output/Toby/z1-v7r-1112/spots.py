"""game screenshots of the 7 spots, v7 vs v7r, 390x844 @2x, game zoom.  usage: spots.py <set v7|v7r> [zoom]"""
import sys,os,json,io
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
os.environ['PATCHES']=json.dumps([["zone-skin.js","ZONE1_GROUND_SET = 'v7r'","ZONE1_GROUND_SET = '%s'"%sys.argv[1]]])
from harness import *
from PIL import Image
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/z1-v7r-1112/shots/'
zoom=int(sys.argv[2]) if len(sys.argv)>2 else 3
W=0.78125
HIDE=open('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/fluid-full-1112/render_check.py').read().split('HIDE="""')[1].split('"""')[0]
SP={'forest':(768,3170),'bridge':(3842,645),'lava-north':(660,870),'lava-mid':(720,1520),'lava-low':(762,2005),'plaza':(2520,2985),'pier':(2865,2180)}
with sync_playwright() as p:
    b,ctx,pg=setup(p,8795,390,844,2)
    print(pg.evaluate("import('./src/zone-skin.js').then(m=>m.ZONE1_GROUND_SET)"))
    pg.evaluate("document.getElementById('town-overview').click()")
    cur=0
    for k,(mx,my) in SP.items():
        while cur<zoom: pg.evaluate("document.getElementById('town-zoom-more').click()"); cur+=1
        pg.evaluate(f"G.mapTravel={{focus:{{x:{mx*W},y:{my*W}}}}};G.paused=false")
        pg.wait_for_timeout(4500); pg.evaluate(HIDE); pg.wait_for_timeout(400)
        pg.screenshot(path=OUTD+f'{sys.argv[1]}-z{zoom}-{k}.png')
    print('errors',pg.errors[:3]); b.close()
