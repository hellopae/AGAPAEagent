import sys,base64,io
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
from PIL import Image
import numpy as np
JS="""async(pos)=>{const m=await import('./src/town-shade.js?v=l1');
 G.player.x=pos[0];G.player.y=pos[1];G.player.tx=null;G.player.ty=null;G.player.path=null;
 await new Promise(r=>setTimeout(r,2500));
 const cv=document.createElement('canvas');cv.width=3584;cv.height=1916;const c=cv.getContext('2d');
 const mc=document.getElementById('cv').getContext('2d');
 const t=mc.getTransform();c.setTransform(t.a,t.b,t.c,t.d,t.e,t.f);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
 m.drawTownShadows(c);
 return cv.toDataURL('image/png');}"""
out={}
for port in (8951,8950):
    with sync_playwright() as p:
        b,ctx,pg=setup(p,port,1792,958,2)
        pg.wait_for_timeout(5000)
        for name,pos in (('hub',[1922,1078]),('south',[2300,1500]),('corner',[900,520]),('west',[1100,1200])):
            u=pg.evaluate(JS,pos)
            out[(port,name)]=np.asarray(Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).convert('RGBA')).astype(int)
        b.close()
for name in ('hub','south','corner','west'):
    a=out[(8951,name)];n=out[(8950,name)]
    d=np.abs(a-n).max(axis=2)
    cover=(a[:,:,3]>0).mean()*100
    print(name,'shadow coverage %.1f%%'%cover,'max diff',d.max(),'mean diff over shadow px %.3f'%(d[a[:,:,3]>0].mean() if cover>0 else 0),'px diff>6: %d'%(d>6).sum(),'alpha mean A %.2f B %.2f'%(a[:,:,3].mean(),n[:,:,3].mean()))
