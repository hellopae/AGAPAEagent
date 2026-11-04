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

try{
 browser=await chromium.launch({headless:true,executablePath:'/Users/agapae/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell'});
 const c=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'}),p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);
 await p.emulateMedia({reducedMotion:'no-preference'});
 for(const zone of ['th','asia','west','cyberhell'])for(const context of ['trial','battle']){
 await p.emulateMedia({reducedMotion:'reduce'});await title(p);await p.emulateMedia({reducedMotion:'no-preference'});
 await p.evaluate(async({zone,context})=>{
  const ui=await import(document.querySelector('script[type=module][src*="src/ui.js"]').src),g=window.G;
  document.querySelectorAll('dialog[open]').forEach(d=>d.close());g.save=()=>true;g.onChange=()=>{};g.paused=true;g.zone=zone;g.battle=null;g.pendingReward=null;g.taught.push('trial-calculation','interrogation-traits');
  if(context==='battle'){g.startBattle({id:999,who:'ตรวจเอฟเฟกต์',name:'ตรวจเอฟเฟกต์',sp:1,deserved:4,resist:true});ui.openBattle();}
  else{const s=g.queue[0];g.caseReady=()=>true;s.ready=true;s.arrival=null;ui.openTrial();}
 },{zone,context});
 const canvas=p.locator(`dialog[open] canvas.scene-atmosphere[data-context="${context}"]`);await canvas.waitFor();await p.waitForTimeout(350);
 const data=await canvas.evaluate(el=>({pixels:el.width*el.height,particles:+el.dataset.particles,elapsed:+el.dataset.elapsed,events:getComputedStyle(el).pointerEvents,width:el.getBoundingClientRect().width}));assert.ok(data.pixels<=900000);assert.ok(data.particles<=160);assert.equal(data.events,'none');assert.ok(data.width>100);const features=await canvas.getAttribute('data-effects');assert.ok(features.includes(zone==='west'?'snow':zone==='cyberhell'?'lightning':'lava'));let lava=null;if(['th','asia'].includes(zone)){await p.waitForFunction(()=>document.querySelector('dialog[open] .scene-atmosphere-ground')?.dataset.lavaDrawn==='true');lava=await p.locator('dialog[open] .scene-atmosphere-ground').evaluate(el=>{const d=el.getContext('2d').getImageData(0,0,el.width,el.height).data;let count=0;for(let i=3;i<d.length;i+=4)if(d[i])count++;return{pixels:el.width*el.height,nonzero:count};});assert.ok(lava.pixels+data.pixels<=900000);if(zone==='th')assert.ok(lava.nonzero>0);}results.push({zone,context,features,lava,...data});await p.screenshot({path:out+`/${zone}-${context}.png`});
 }
 const cloud=await p.evaluate(async()=>{const m=await import('./src/map-ambient.js'),result=[];for(const zone of ['th','asia']){const c=document.createElement('canvas');c.width=640;c.height=360;const ctx=c.getContext('2d'),alphas=[],draw=ctx.drawImage.bind(ctx);ctx.drawImage=(...args)=>{alphas.push(ctx.globalAlpha);return draw(...args);};m.drawMapWeather(ctx,{zone,time:1000,W:640,H:360,viewport:{width:640,height:360,dpr:1}});const pixels=ctx.getImageData(0,0,640,360).data;let max=0;for(let i=3;i<pixels.length;i+=4)max=Math.max(max,pixels[i]);result.push({zone,maxAlpha:max,compositeAlphas:alphas});}return result;});
 // Cloud alpha is measured separately from the biome's additive leaves/light.
 assert.ok(cloud.every(x=>x.maxAlpha>0&&x.compositeAlphas.length===1&&Math.abs(x.compositeAlphas[0]-.2)<1e-6));results.push({cloudComposite:cloud});

 const controls=await p.evaluate(async()=>{const {mountSceneAtmosphere}=await import('./src/scene-atmosphere.js'),{setWeatherEnabled}=await import('./src/map-ambient.js');document.querySelectorAll('dialog[open]').forEach(d=>d.close());const stage=document.createElement('div');stage.style='position:fixed;inset:0;width:640px;height:360px';stage.innerHTML='<div class="cam-world" style="position:relative;width:640px;height:360px"></div>';document.body.append(stage);let paused=false;const fx=mountSceneAtmosphere(stage,{zone:'west',paused:()=>paused}),wait=ms=>new Promise(r=>setTimeout(r,ms));await wait(200);paused=true;await wait(50);const before=fx.stats().elapsed;await wait(150);const after=fx.stats().elapsed;setWeatherEnabled(false);await wait(80);const data=fx.canvas.getContext('2d').getImageData(0,0,fx.canvas.width,fx.canvas.height).data;let alpha=0;for(let i=3;i<data.length;i+=4)alpha=Math.max(alpha,data[i]);fx.destroy();stage.remove();setWeatherEnabled(true);return {before,after,weatherOffMaxAlpha:alpha,disposed:fx.stats().disposed};});assert.equal(controls.before,controls.after);assert.equal(controls.weatherOffMaxAlpha,0);assert.ok(controls.disposed);results.push({controls});
 assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({results,pageErrors:errors,method:'Actual production trial/battle dialogs in isolated Chromium; canvas budgets and click-through verified'},null,2));console.log(JSON.stringify({results,errors}));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
