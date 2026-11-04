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
for(const viewport of [{width:1280,height:800},{width:390,height:844}]){
 const c=await browser.newContext({viewport,reducedMotion:'reduce'}),seed=JSON.parse(readFileSync(root+'/tests/fixtures/b1-v3.json'));seed.zone='cyberhell';seed.gameCompleted=true;seed.finalEvent={...(seed.finalEvent||{}),phase:'completed'};seed.storySeen={...(seed.storySeen||{}),ending:true};seed.pendingReward=null;seed.storyQueue=[];seed.pendingVerdictScene=null;
 await c.addInitScript(seed=>localStorage.setItem('avegee.save.v2',JSON.stringify(seed)),seed);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);await p.locator('#t-start').click();await p.locator('[data-save-slot="1"]').click();
 await p.evaluate(async()=>{const {TUTOR,ZONE_EVENTS}=await import('./src/data.js'),g=G;for(const [zone,events]of Object.entries(ZONE_EVENTS))g.zoneEvents[zone]=Object.fromEntries(events.map(ev=>[ev.k,'cleared']));g.taught=[...new Set([...g.taught,...TUTOR.map(t=>t.k),'trial-calculation','interrogation-traits'])];g.stepWorld=()=>{};g.advanceAfterlife=()=>{};g.step=()=>{};g.syncDiscoveries();while(g.discoveryQueue.length)g.acknowledgeDiscovery(g.discoveryQueue[0]);document.querySelectorAll('dialog[open]').forEach(d=>d.close());g.pendingReward=null;g.pendingLevel=null;g.onChange=()=>{};g.battle=null;g.paused=false;g.player.x=1855;g.player.y=1102;const {startupImage}=await import('./src/town-startup.js'),{Z4_POLE_ART}=await import('./src/z4-pole-art.js');window.poleImage=startupImage(Z4_POLE_ART);window.poleBlits=0;const orig=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im,...args){if(im===window.poleImage)window.poleBlits++;return orig.call(this,im,...args);};});
 await p.waitForTimeout(1200);console.log(JSON.stringify(await p.evaluate(()=>({zone:G.zone,poleBlits:window.poleBlits,image:window.poleImage?{src:window.poleImage.src,w:window.poleImage.naturalWidth,h:window.poleImage.naturalHeight}:null,dialogs:[...document.querySelectorAll('dialog[open]')].map(d=>d.textContent.slice(0,80))}))));await p.screenshot({path:out+'/debug-poles.png'});
await p.screenshot({path:out+`/cyber-poles-${viewport.width}.png`});
 const asset=await p.evaluate(async()=>{const {startupImage}=await import('./src/town-startup.js'),{Z4_POLE_ART}=await import('./src/z4-pole-art.js');const im=startupImage(Z4_POLE_ART);return {src:Z4_POLE_ART,ready:!!im,dimensions:im?[im.naturalWidth,im.naturalHeight]:null,blits:window.poleBlits};});assert.ok(asset.ready);assert.deepEqual(asset.dimensions,[512,768]);results.push({viewport,asset});
 if(viewport.width===1280){const data=await p.evaluate(async()=>{const {drawZ4Pole}=await import('./src/z4-poles.js?v=z4-poles');const cv=document.createElement('canvas');cv.width=500;cv.height=500;const ctx=cv.getContext('2d');ctx.fillStyle='#25202e';ctx.fillRect(0,0,500,500);let blits=0;const originalDraw=ctx.drawImage.bind(ctx);ctx.drawImage=(...args)=>{if(args[0]===window.poleImage)blits++;return originalDraw(...args);};drawZ4Pole(ctx,{x:250,y:470,h:390,top:80,arm:117,variant:0,i:0},0,true);if(blits!==1)throw Error('Expected one painted pole blit, got '+blits);return cv.toDataURL('image/png');});writeFileSync(out+'/pole-render.png',Buffer.from(data.split(',')[1],'base64'));}
 await c.close();
}
assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({results,pageErrors:errors},null,2));console.log(JSON.stringify({results,errors}));
}catch(e){writeFileSync(out+'/browser-error.json',JSON.stringify({error:String(e),errors},null,2));throw e;}finally{await browser?.close();await new Promise(r=>server.close(r));}
