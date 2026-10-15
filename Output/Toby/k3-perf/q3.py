import sys
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/k3-perf')
from harness import *
with sync_playwright() as p:
    b,ctx,pg=setup(p,8104)
    pg.wait_for_timeout(5000)
    print(pg.evaluate("""async()=>{
      const T=await import('./src/town-terrain.js');const A=await import('./src/art.js');
      window.__skip={render:true};
      let n=0;
      for(let i=0;i<10;i++){
          const cv=document.createElement('canvas');cv.width=512;cv.height=512;const c=cv.getContext('2d');
          c.setTransform(1,0,0,1,-(300+i*600)%3000,-(900+i*5)); T.drawTownTerrain(c,A.img);c.getImageData(0,0,1,1);}
      return JSON.stringify(Object.fromEntries(Object.entries(window.__tt).map(([k,v])=>[k,+(v/10).toFixed(1)])));}"""))
    b.close()
