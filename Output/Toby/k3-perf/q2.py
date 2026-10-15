import sys
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
with sync_playwright() as p:
    b,ctx,pg=setup(p,8103)
    pg.wait_for_timeout(5000)
    print(pg.evaluate("""async()=>{
      const T=await import('./src/town-terrain.js?v=k3');const A=await import('./src/art.js');
      const out={};
      for(const [name,w,h,sc] of [['chunk512@1',512,512,1],['chunk256@2',512,512,2],['chunk128@4',512,512,4],['chunk128@8',1024,1024,8]]){
        const N=8,ts=[];
        for(let i=0;i<N;i++){
          const cv=document.createElement('canvas');cv.width=w;cv.height=h;const c=cv.getContext('2d');
          c.setTransform(sc,0,0,sc,-(300+i*7)*sc,-(900+i*5)*sc);
          const t0=performance.now();
          // full-world draw call uses chunk cache keyed by ctx; here ctx canvas small so visible chunk set is 1-4 chunks
          T.drawTownTerrain(c,A.img);c.getImageData(0,0,1,1);
          ts.push(performance.now()-t0);
        }
        out[name]=ts.map(x=>+x.toFixed(0));
      }
      return JSON.stringify(out);}"""))
    b.close()
