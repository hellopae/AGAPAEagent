"""Worker vs Yama on a flat background, 4 zones, drawn with the game's own draw functions at the real map scale (CHAR_SCALE_MAP).
Visible heights are the bbox of non-background pixels (soft shadow ignored by a threshold).  usage: actor_scale.py <label> <outdir>"""
import sys,json,io,base64
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
from PIL import Image
import numpy as np
label,OUTD=sys.argv[1],sys.argv[2]
JS="""async z=>{
  G.zone=z; await new Promise(r=>setTimeout(r,2500));
  document.querySelectorAll('dialog[open]').forEach(d=>d.close());
  const art=await import('./src/art.js'), wk=await import('./src/workers.js'), cs=await import('./src/character-scale.js'), sc=await import('./src/scene.js');
  const K=sc.CHAR_SCALE_MAP, HERO_H=cs.mapActorHeight('yama')*K, WH=cs.mapWorkerHeight()*K;
  const W={id:'worker:99',homeZone:z,x:0,y:0,face:1,moving:false,arrived:false,job:null,heading:'down'};
  const out={K,HERO_H,WH,imgs:{}};
  const mk=(draw)=>{const c=document.createElement('canvas');c.width=800;c.height=500;const x=c.getContext('2d');x.fillStyle='#ff00ff';x.fillRect(0,0,800,500);x.scale(2,2);draw(x);return c.toDataURL('image/png');};
  const yama=x=>{ if(!art.drawHeroWalk(x,110,200,HERO_H,0,1,'down')) art.drawStandee(x,'hero-yama',110,200,HERO_H,0,'x',1,false); };
  const worker=x=>wk.drawWorker(x,{...W,x:200,y:200},0,WH);
  mk(yama);mk(worker);await new Promise(r=>setTimeout(r,2000));   // first draw only starts loading the sheets
  out.imgs.yama=mk(yama); out.imgs.worker=mk(worker); out.imgs.both=mk(x=>{yama(x);worker(x);});
  return out;}"""
def hbox(dataurl):
    im=Image.open(io.BytesIO(base64.b64decode(dataurl.split(',')[1]))).convert('RGB'); a=np.asarray(im,dtype=int)
    d=(np.abs(a-np.array([255,0,255])).max(axis=2)>150)
    ys,xs=np.where(d)
    return (None if not len(ys) else [int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())]), im
res={}
with sync_playwright() as p:
    b,ctx,pg=setup(p,8950,1440,900,2)
    for zone in ['th','asia','west','cyberhell']:
        o=pg.evaluate(JS,zone)
        by,_=hbox(o['imgs']['yama']); bw,_=hbox(o['imgs']['worker']); _,both=hbox(o['imgs']['both'])
        hy=(by[3]-by[1]+1)/2 if by else None; hw=(bw[3]-bw[1]+1)/2 if bw else None
        res[zone]={'yama_h':hy,'worker_h':hw,'ratio':round(hw/hy,3) if hy and hw else None,'HERO_H':o['HERO_H'],'WH':o['WH'],'K':o['K']}
        both.crop((140,290,520,440)).resize((760,300),Image.NEAREST).save(OUTD+f'{label}-{zone}.png')
    b.close()
for z,v in res.items(): print(z,v)
json.dump(res,open(OUTD+f'{label}-heights.json','w'),indent=1)
