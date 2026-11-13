// Frame anatomy: for a few sampled frames, add up the destination pixels every Canvas 2D draw touches (device px, clipped to the target canvas),
// split by target canvas (#cv = the map, other = offscreen), caller and composite op.  Read-only instrumentation, injected by anatomy.py.
(()=>{
const A=window.__anat={on:false,frames:0,rows:{},gl:{draws:0,px:0}};
const CT=CanvasRenderingContext2D.prototype;
const who=()=>{const s=(new Error().stack||'').split('\n').slice(2,12);
  for(const l of s){const m=/at (?:(\S+) \()?.*\/src\/([\w./-]+?\.js)[^:]*:(\d+)/.exec(l);if(!m)continue;
    const fn=m[1]||'anon';if(/drawImage$|^plain$|^blit$|__T$/.test(fn))continue;return m[2]+':'+fn;}
  return 'other';};
const area=(ctx,x,y,w,h)=>{const m=ctx.getTransform(),cv=ctx.canvas;
  const xs=[x,x+w,x,x+w],ys=[y,y,y+h,y+h];let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for(let i=0;i<4;i++){const px=m.a*xs[i]+m.c*ys[i]+m.e,py=m.b*xs[i]+m.d*ys[i]+m.f;x0=Math.min(x0,px);x1=Math.max(x1,px);y0=Math.min(y0,py);y1=Math.max(y1,py);}
  x0=Math.max(0,x0);y0=Math.max(0,y0);x1=Math.min(cv.width,x1);y1=Math.min(cv.height,y1);
  return x1>x0&&y1>y0?(x1-x0)*(y1-y0):0;};
const add=(ctx,kind,px)=>{const main=ctx.canvas&&ctx.canvas.id==='cv';const k=(main?'cv':'off')+'|'+who()+'|'+kind+'|'+ctx.globalCompositeOperation;
  const r=A.rows[k]||(A.rows[k]={n:0,px:0});r.n++;r.px+=px;};
const oD=CT.drawImage;CT.drawImage=function(im,...a){if(A.on){let px=0;try{
   if(a.length===2)px=area(this,a[0],a[1],im.width||im.naturalWidth||0,im.height||im.naturalHeight||0);
   else if(a.length===4)px=area(this,a[0],a[1],a[2],a[3]);else px=area(this,a[4],a[5],a[6],a[7]);}catch{}
   add(this,'drawImage'+(im instanceof HTMLCanvasElement&&im.getContext&&im.__gl?'(gl)':''),px);}
  return oD.call(this,im,...a);};
const oF=CT.fillRect;CT.fillRect=function(x,y,w,h){if(A.on){let px=0;try{px=area(this,x,y,w,h);}catch{}add(this,'fillRect',px);}return oF.call(this,x,y,w,h);};
for(const n of ['fill','stroke','fillText','strokeText','clip','clearRect','putImageData','getImageData']){const o=CT[n];CT[n]=function(...a){if(A.on)add(this,n,0);return o.apply(this,a);};}
// WebGL draws (the fluid / cloud shader canvas)
for(const G of [window.WebGLRenderingContext,window.WebGL2RenderingContext]){if(!G)continue;const P=G.prototype,o=P.drawArrays;
  P.drawArrays=function(...a){if(A.on){A.gl.draws++;const v=this.getParameter(this.VIEWPORT);A.gl.px+=v[2]*v[3];}return o.apply(this,a);};
  const gc=HTMLCanvasElement.prototype.getContext;}
const og=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...r){const c=og.call(this,t,...r);if(c&&/webgl/.test(t))this.__gl=true;return c;};
// sample N frames
A.sample=n=>new Promise(res=>{A.rows={};A.gl={draws:0,px:0};A.frames=0;let left=n;
  const step=()=>{A.on=true;requestAnimationFrame(()=>{A.frames++;if(--left>0)step();else{A.on=false;res({frames:A.frames,rows:A.rows,gl:A.gl,cv:[document.getElementById('cv').width,document.getElementById('cv').height]});}});};
  requestAnimationFrame(step);});
})();
