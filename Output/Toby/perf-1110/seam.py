"""Find the vertical brightness step in the town map (B).  usage: seam.py <label> [zone] [js to run first]"""
import sys,io,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
from PIL import Image
import numpy as np
label=sys.argv[1]; zones=sys.argv[2].split(',') if len(sys.argv)>2 else ['th']; pre=sys.argv[3] if len(sys.argv)>3 else ''
OUT='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-11-10-avegee-map-seam/'
import os; os.makedirs(OUT,exist_ok=True)
with sync_playwright() as p:
    b,ctx,pg=setup(p,8950,1440,900,1)
    pg.add_style_tag(content='.hud-top,.hud-bottom,#team-hud,.fabs,#town-map-panel,#res,#hud{visibility:hidden!important}')
    for z in zones:
        pg.evaluate("z=>{G.zone=z}",z); pg.wait_for_timeout(2500)
        for _ in range(3): pg.evaluate("()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close())"); pg.wait_for_timeout(400)
        if pre: pg.evaluate(pre)
        pg.evaluate("G.paused=true"); pg.wait_for_timeout(1500)
        im=Image.open(io.BytesIO(pg.screenshot())).convert('RGB'); im.save(OUT+f'{label}-{z}.png')
        a=np.asarray(im,dtype=float); lum=(a[:,:,0]*.3+a[:,:,1]*.59+a[:,:,2]*.11).mean(axis=0)
        k=8; sm=np.array([lum[max(0,i-k):i+k].mean() for i in range(len(lum))])
        step=np.abs(np.array([lum[i+1:i+7].mean()-lum[i-6:i].mean() for i in range(10,len(lum)-10)]))
        top=np.argsort(-step)[:5]+10
        print(z,'step@150-158:',round(float(max(abs(lum[i+1:i+7].mean()-lum[i-6:i].mean()) for i in range(150,159))),2))
        print(z,'biggest column steps at x=',[(int(x),round(float(lum[x+1:x+7].mean()-lum[x-6:x].mean()),2)) for x in top])
        pg.evaluate("G.paused=false")
    b.close()
