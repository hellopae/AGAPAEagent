import sys
from playwright.sync_api import sync_playwright
HTML='''<!doctype html><meta charset=utf-8><body style="margin:0;background:#1c1218;color:#ddd;font:11px sans-serif">
<canvas id=c></canvas><script type=module>
const Z=%(Z)s, COLS=%(COLS)s;
const {drawWorker}=await import('%(BASE)s/src/workers.js');
const ph=new Promise(r=>setTimeout(r,0));
const cw=%(CW)s, ch=%(CH)s, H=48, rows=12;
const c=document.getElementById('c');c.width=%(W)s;c.height=rows*ch+30;const ctx=c.getContext('2d');
ctx.fillStyle='#1c1218';ctx.fillRect(0,0,c.width,c.height);
const mk=(row)=>{ // craft a worker state that selects v2 row
  const w={homeZone:'th',x:0,y:0,face:1,job:null,moving:false,arrived:false,cargo:null,heading:'side'};
  switch(row){case 0:break;case 1:w.moving=true;break;case 2:w.arrived=true;w.job={kind:'build'};break;case 3:w.job={kind:'escort'};break;
   case 4:w.moving=true;w.heading='down';break;case 5:w.moving=true;w.heading='up';break;
   case 6:w.arrived=true;w.job={kind:'gather',phase:'collect',material:'ngiwWood'};break;
   case 7:w.arrived=true;w.job={kind:'gather',phase:'collect',material:'dabShards'};break;
   case 8:w.arrived=true;w.job={kind:'repair'};break;case 9:w.arrived=true;w.job={kind:'supervise'};break;
   case 10:w.moving=true;w.cargo='ngiwWood';break;case 11:w.moving=true;w.cargo='dabShards';break;}
  return w;};
// warm the image cache
for(let r=0;r<rows;r++){const w=mk(r);ctx.save();drawWorker(ctx,w,0,H);ctx.restore();}
await new Promise(r=>setTimeout(r,1500));
ctx.fillStyle='#1c1218';ctx.fillRect(0,0,c.width,c.height);
ctx.fillStyle='#ccc';ctx.font='11px sans-serif';
ctx.fillText('%(TITLE)s  (red = v1 height 46.2px at 48px, band +-2%%, yellow = cell centre)',6,14);
for(let r=0;r<rows;r++){
  const y0=30+r*ch, base=y0+ch-8;
  ctx.fillStyle='#ccc';ctx.fillText('row '+r,2,y0+12);
  for(let col=0;col<COLS;col++){
    const cx=%(X0)s+col*cw+cw/2;
    ctx.save();ctx.translate(cx,base);ctx.scale(Z,Z);
    // guides (in unscaled worker px)
    const hv=48*308/320;
    ctx.fillStyle='rgba(255,60,60,.18)';ctx.fillRect(-30,-hv*1.02,60,hv*.04);
    ctx.fillStyle='rgba(255,60,60,.9)';ctx.fillRect(-30,-hv,60,0.4);
    ctx.fillStyle='rgba(255,220,0,.55)';ctx.fillRect(-0.2,-56,0.4,56);
    ctx.restore();
    ctx.save();ctx.translate(cx,base);ctx.scale(Z,Z);ctx.translate(-0,0);ctx.restore();
    // draw: drawWorker positions at w.x,w.y, so set x,y and scale via ctx transform
    const w=mk(r);w.x=0;w.y=0;
    ctx.save();ctx.translate(cx,base);ctx.scale(Z,Z);
    drawWorker(ctx,w,col*160,H);
    ctx.restore();
  }
}
document.title='ready';
</script>'''
def run(base,out,vw,vh,title):
    mobile=vw<500
    if mobile: Z,COLS,CW,CH,W,X0=1.0,4,90,66,390,22
    else: Z,COLS,CW,CH,W,X0=1.6,4,160,84,1280,40
    html=HTML%dict(Z=Z,COLS=COLS,CW=CW,CH=CH,W=W,BASE=base,TITLE=title,X0=X0)
    with sync_playwright() as p:
        b=p.chromium.launch();ctx=b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2 if mobile else 1)
        pg=ctx.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)[:200]));pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='error' else None)
        pg.route('**/__lab.html',lambda r:r.fulfill(body=html,content_type='text/html'))
        pg.goto(base+'/__lab.html');pg.wait_for_function("document.title==='ready'",timeout=20000)
        pg.screenshot(path=out,full_page=True);print(out,errs);b.close()
for name,base in (('before','http://127.0.0.1:8761'),('after','http://127.0.0.1:8799')):
    run(base,f'/tmp/p5c/lab-{name}-390x844.png',390,844,f'{name} (390 wide, real size)')
    run(base,f'/tmp/p5c/lab-{name}-1280x720.png',1280,720,f'{name} (1280, 1.6x zoom)')
