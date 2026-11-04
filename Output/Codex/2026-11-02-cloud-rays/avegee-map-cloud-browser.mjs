import {createServer} from 'node:http';
import {createReadStream,readFileSync,statSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require('/Users/agapae/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.argv[2]||'/Users/agapae/agapae-work/AVEGEE/.codex-worktrees/2026-11-01-home-save-slots',out=process.argv[3]||'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-11-01-home-save-slots';mkdirSync(out,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.mp3':'audio/mpeg','.ogg':'audio/ogg','.woff2':'font/woff2'};
const server=createServer((req,res)=>{let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!path.startsWith(root+'/')&&path!==root){res.writeHead(403).end();return;}if(path===root)path+='/index.html';try{const info=statSync(path);const range=req.headers.range?.match(/bytes=(\d+)-(\d*)/);const headers={'Content-Type':mime[extname(path)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-store'};if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),info.size-1):info.size-1;res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1});createReadStream(path,{start,end}).pipe(res);}else{res.writeHead(200,{...headers,'Content-Length':info.size});createReadStream(path).pipe(res);}}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/`;let browser;
const results=[],errors=[];
async function title(page){
 await page.goto(url,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.documentElement.dataset.bootReady==='true',null,{timeout:60000});
 const start=page.locator('#t-start'),enter=page.locator('#enter-button'),skip=page.locator('#splash-skip');
 await Promise.any([start.waitFor({state:'visible',timeout:60000}),enter.waitFor({state:'visible',timeout:60000}),skip.waitFor({state:'visible',timeout:60000})]);
 if(await start.isVisible())return;
 if(await enter.isVisible())await enter.click();else if(await skip.isVisible())await skip.click();
 await start.waitFor({state:'visible',timeout:15000});
}

try{browser=await chromium.launch({headless:true,executablePath:'/Users/agapae/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell'});
 for(const zone of ['th','asia','west','cyberhell']){
 const c=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'}),seed=JSON.parse(readFileSync(root+'/tests/fixtures/b1-v3.json'));seed.zone=zone;seed.zoneEvents.west={...(seed.zoneEvents.west||{}),westHypnotized:'cleared'};seed.zoneEvents.cyberhell={...(seed.zoneEvents.cyberhell||{}),cyberRescue:'cleared'};seed.eventMapClosed={...(seed.eventMapClosed||{}),'west:westHypnotized':true,'cyberhell:cyberRescue':true};
 await c.addInitScript(seed=>{localStorage.setItem('avegee.save.v2',JSON.stringify(seed));localStorage.setItem('avegee.weather','on');window.cloudFrames=0;const draw=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(src,...args){if(this.canvas.id==='cv'&&src instanceof HTMLCanvasElement&&src.width>=250&&src.width<=900&&src.width!==384&&Math.abs(this.globalAlpha-.2)<1e-6){window.cloudFrames++;window.cloudLayer=src;window.cloudAlpha=this.globalAlpha;}return draw.call(this,src,...args);};},seed);
 const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);await p.locator('#t-start').click();await p.locator('[data-save-slot="1"]').click();await p.waitForTimeout(1800);
 await p.evaluate(()=>{const g=window.G;g.onChange=()=>{};g.save=()=>true;g.stepWorld=()=>{};g.advanceAfterlife=()=>{};g.step=()=>{};g.paused=false;document.querySelectorAll('dialog[open]').forEach(d=>d.close());});await p.emulateMedia({reducedMotion:'no-preference'});await p.waitForFunction(()=>window.cloudFrames>2&&window.cloudLayer);await p.waitForTimeout(800);
 const sample=()=>p.evaluate(()=>{const cv=window.cloudLayer,d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;let hash=2166136261,clear=0,peak=0;for(let i=3;i<d.length;i+=4){hash=Math.imul(hash^d[i],16777619);peak=Math.max(peak,d[i]);if(d[i]<5)clear++;}return{hash:hash>>>0,clear:clear/(d.length/4),peak,alpha:window.cloudAlpha,frames:window.cloudFrames};});
 const a=await sample();await p.locator('#cv').screenshot({path:out+`/${zone}-map-cloud-a.png`});await p.waitForTimeout(1600);const b=await sample();await p.locator('#cv').screenshot({path:out+`/${zone}-map-cloud-b.png`});assert.equal(a.alpha,.2);assert.notEqual(a.hash,b.hash,zone+' cloud mask moves in actual map renderer');assert.ok(b.frames>a.frames);assert.ok(a.clear>.05&&a.clear<.95,'clouds have visible bright gaps');results.push({zone,a,b});await c.close();
 }
 const c=await browser.newContext({viewport:{width:1280,height:800}}),p=await c.newPage();await p.goto(url);const rays=await p.evaluate(async()=>{const {drawAsiaSunRays}=await import('./src/sun-shafts.js'),cv=document.createElement('canvas');cv.width=900;cv.height=600;cv.style='position:fixed;inset:0;background:#344936;z-index:2147483647';document.body.append(cv);const ctx=cv.getContext('2d');drawAsiaSunRays(ctx,{x:0,y:0,w:900,h:600},1000);const d=ctx.getImageData(0,0,900,600).data;let active=0,soft=0;for(let i=3;i<d.length;i+=4){if(d[i])active++;if(d[i]>0&&d[i]<50)soft++;}return {active,soft};});assert.ok(rays.active>10000&&rays.soft>10000);await p.screenshot({path:out+'/soft-sun-shafts.png'});results.push({rays});assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({results,pageErrors:errors,method:'Actual production map canvas drawImage instrumentation and moving cloud-layer pixel hashes; generated textured light inspection'},null,2));console.log(JSON.stringify({results,errors}));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
