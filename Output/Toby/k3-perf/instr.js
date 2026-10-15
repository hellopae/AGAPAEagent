(()=>{
const P=window.__perf={frames:[],long:[],canv:0,canvPx:0,calls:{},imgs:[],t0:0};
P.reset=()=>{P.frames=[];P.long=[];P.canv=0;P.canvPx=0;P.calls={};P.t0=performance.now();P.last=0;};
P.summary=()=>{const f=P.frames.slice(1).sort((a,b)=>a-b);const n=f.length;const sum=f.reduce((a,b)=>a+b,0);
 const dur=performance.now()-P.t0;
 const p=q=>f[Math.min(n-1,Math.floor(q*n))];
 const ml=P.long.reduce((a,l)=>a+l.d,0);
 let imgBytes=0,imgN=0;for(const i of P.imgs){if(i.complete&&i.naturalWidth){imgBytes+=i.naturalWidth*i.naturalHeight*4;imgN++;}}
 const m=performance.memory||{};
 return {frames:n,secs:+(dur/1000).toFixed(2),fps_avg:+(1000*n/sum).toFixed(1),fps_min_1s:P.minFps1s?+P.minFps1s().toFixed(1):null,
  ft_avg:+(sum/n).toFixed(2),ft_p50:+p(.5).toFixed(2),ft_p95:+p(.95).toFixed(2),ft_p99:+p(.99).toFixed(2),ft_max:+f[n-1].toFixed(2),
  frames_over_33:f.filter(x=>x>33.4).length,
  long_tasks:P.long.length,long_ms:+ml.toFixed(0),long_max:P.long.length?+Math.max(...P.long.map(l=>l.d)).toFixed(0):0,
  canvases_created:P.canv,canvas_px_created_M:+(P.canvPx/1e6).toFixed(2),calls:P.calls,
  heap_MB:m.usedJSHeapSize?+(m.usedJSHeapSize/1048576).toFixed(1):null,
  decoded_imgs:imgN,decoded_img_MB:+(imgBytes/1048576).toFixed(0),
  canvases_live:document.querySelectorAll('canvas').length,
  main_canvases:[...document.querySelectorAll('canvas')].map(c=>c.width+'x'+c.height)};};
// rAF sampler
let last=0;const ring=[];
function tick(t){if(last){const d=t-last;P.frames.push(d);ring.push([t,d]);}last=t;requestAnimationFrame(tick);}
requestAnimationFrame(tick);
P.minFps1s=()=>{ // worst 1-second window fps
 const fr=P.frames;if(fr.length<10)return 0;let best=1e9,acc=0,cnt=0,q=[];
 for(const d of fr){q.push(d);acc+=d;while(acc>1000){acc-=q.shift();}if(acc>900)best=Math.min(best,q.length*1000/acc);}return best===1e9?0:best;};
try{new PerformanceObserver(l=>{for(const e of l.getEntries())P.long.push({d:e.duration,t:e.startTime});}).observe({entryTypes:['longtask']});}catch(e){}
// counters
const CT=CanvasRenderingContext2D.prototype;
for(const n of ['drawImage','fill','stroke','createPattern','fillRect','clip','createLinearGradient','createRadialGradient','getImageData','putImageData']){
 const o=CT[n];CT[n]=function(...a){P.calls[n]=(P.calls[n]||0)+1;return o.apply(this,a);};}
const ce=document.createElement.bind(document);
document.createElement=function(tag,...r){const e=ce(tag,...r);if(String(tag).toLowerCase()==='canvas'){
  P.canv++;let w=0,h=0;Object.defineProperty(e,'__x',{value:1});
  const d=Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,'width'),d2=Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,'height');
  Object.defineProperty(e,'width',{get(){return d.get.call(this)},set(v){d.set.call(this,v);P.canvPx+=v*(d2.get.call(this)||150);},configurable:true});
 }return e;};
const OI=window.Image;
window.Image=class extends OI{constructor(...a){super(...a);P.imgs.push(this);}};
})();
