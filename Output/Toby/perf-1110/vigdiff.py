import sys
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
JS="""async()=>{const m=await import('./src/art.js?v=20261110-perf');const w=1678,h=937;
 const mk=()=>{const c=document.createElement('canvas');c.width=3584;c.height=1916;return c;};
 const out=[];
 for(const [a,e,f] of [[3.7421875,-5400.48,-3076.08],[1.0,0,0],[2.0,-300,-100],[3.7421875,-1500,-800]]){
  const A=mk(),B=mk();
  for(const [cv,mode] of [[A,'old'],[B,'new']]){const c=cv.getContext('2d');c.setTransform(a,0,0,a,e,f);
   if(mode==='old'){const g=c.createRadialGradient(w/2,h/2,h*0.34,w/2,h/2,h*1.05);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(8,3,6,.52)');c.fillStyle=g;c.fillRect(0,0,w,h);}
   else m.drawVignette(c,w,h);}
  const da=A.getContext('2d').getImageData(0,0,3584,1916).data,db=B.getContext('2d').getImageData(0,0,3584,1916).data;
  let mx=0,sum=0,n=0,cov=0;for(let i=3;i<da.length;i+=4){const d=Math.abs(da[i]-db[i]);if(da[i]||db[i]){cov++;sum+=d;}if(d>mx)mx=d;}
  out.push({scale:a,coverPx:cov,maxAlphaDiff:mx,meanAlphaDiff:cov?sum/cov:0});}
 return out;}"""
with sync_playwright() as p:
    b,ctx,pg=setup(p,8950,1792,958,2)
    pg.wait_for_timeout(3000)
    for r in pg.evaluate(JS): print(r)
    b.close()
