import sys,os,json,base64,io
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from PIL import Image
import numpy as np
JS="""async()=>{const L=await import('./src/town-lighting.js?v=fire-v2');const T=await import('./src/town-terrain.js?v=k1d');
 const url=T.townChunkUrl(2,3),r=T.townChunkRect(2,3);
 const img=new Image();img.src=url;await img.decode();
 await L.prepareTownLighting(img,[r.x,r.y,r.w,r.h],50);
 const cv=document.createElement('canvas');cv.width=1024;cv.height=1024;const c=cv.getContext('2d');
 const s=1024/r.w;c.setTransform(s,0,0,s,-r.x*s,-r.y*s);
 L.drawHellTerrain(c,img,0,true,r.x,r.y,r.w,r.h);
 return [cv.toDataURL('image/png'),L.townLightingBakeStats(),url];}"""
res={}
for mode in ('url','bitmap'):
    os.environ['PATCHES']=json.dumps([["town-lighting.js","let workerUrlFailed=false;","let workerUrlFailed=true;"]] if mode=='bitmap' else [])
    import importlib,harness
    importlib.reload(harness)
    from harness import setup,sync_playwright
    with sync_playwright() as p:
        b,ctx,pg=setup(p,8950,1792,958,2)
        pg.wait_for_timeout(2000)
        u,stats,url=pg.evaluate(JS)
        print(mode,stats,url)
        res[mode]=np.asarray(Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).convert('RGBA')).astype(int)
        b.close()
d=np.abs(res['url']-res['bitmap'])
print('max diff',d.max(),'mean',d.mean(),'nonblank',(res['url'][:,:,3]>0).mean())
