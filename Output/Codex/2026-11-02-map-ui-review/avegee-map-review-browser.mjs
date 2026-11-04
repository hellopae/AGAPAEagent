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
for(const viewport of [{width:1280,height:800},{width:390,height:844},{width:844,height:390}]){
 const c=await browser.newContext({viewport,reducedMotion:'reduce'}),seed=JSON.parse(readFileSync(root+'/tests/fixtures/b1-v3.json'));
 seed.zone='th';seed.gameCompleted=true;seed.finalEvent={...(seed.finalEvent||{}),phase:'completed'};seed.storySeen={...(seed.storySeen||{}),ending:true};seed.pendingReward=null;seed.storyQueue=[];seed.pendingVerdictScene=null;
 await c.addInitScript(seed=>localStorage.setItem('avegee.save.v2',JSON.stringify(seed)),seed);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);
 const start=await p.locator('#t-start').evaluate(el=>{const r=el.getBoundingClientRect(),parent=el.parentElement.getBoundingClientRect();return {width:r.width,height:r.height,parentWidth:parent.width,font:getComputedStyle(el.querySelector('b')).fontSize};});
 assert.ok(start.width/start.parentWidth<.8);assert.ok(start.height>=44);await p.screenshot({path:out+`/home-${viewport.width}.png`});
 await p.locator('#t-start').click();await p.locator('[data-save-slot="1"]').click();
 await p.evaluate(async()=>{window.reviewUI=await import(document.querySelector('script[type=module][src*="src/ui.js"]').src);const {TUTOR}=await import('./src/data.js'),g=G;g.taught=[...new Set([...g.taught,...TUTOR.map(t=>t.k),'trial-calculation','interrogation-traits'])];g.stepWorld=()=>{};g.advanceAfterlife=()=>{};g.step=()=>{};g.syncDiscoveries();while(g.discoveryQueue.length)g.acknowledgeDiscovery(g.discoveryQueue[0]);document.querySelectorAll('dialog[open]').forEach(d=>d.close());g.pendingReward=null;g.pendingLevel=null;g.onChange=()=>{};g.battle=null;});
 await p.locator('#hud-pause').click();const resume=p.locator('#pause-resume');await resume.waitFor();await resume.hover();
 const hover=await resume.evaluate(el=>({background:getComputedStyle(el).backgroundColor,image:getComputedStyle(el).backgroundImage,shadow:getComputedStyle(el).textShadow,filter:getComputedStyle(el.querySelector('img')).filter}));
 assert.equal(hover.background,'rgba(0, 0, 0, 0)');assert.equal(hover.image,'none');assert.notEqual(hover.shadow,'none');await p.screenshot({path:out+`/pause-hover-${viewport.width}.png`});
 await resume.click();await p.waitForTimeout(400);
 const harbour=await p.evaluate(async()=>{const g=G,point=g.harbourPoint();g.player.x=point.x;g.player.y=point.y;g.player.path=null;g.paused=false;return point;});await p.waitForTimeout(500);
 assert.ok(await p.locator('#town-action').isHidden());await p.screenshot({path:out+`/harbour-${viewport.width}.png`});
 const clip=await p.evaluate(async()=>{const {drawMapWeather}=await import('./src/map-ambient.js');const cv=document.createElement('canvas');cv.width=400;cv.height=240;const cx=cv.getContext('2d');cx.fillStyle='#eee';cx.fillRect(0,0,400,240);let clipped=[];const clip=cx.clip.bind(cx);cx.clip=(...args)=>{clipped.push(args);return clip(...args);};drawMapWeather(cx,{zone:'west',time:3500,W:400,H:240,reduced:true,labels:[[100,100,60,20]],viewport:{width:400,height:240,dpr:1}});return {clipped};});assert.ok(clip.clipped.length);assert.ok(clip.clipped.every(args=>!args.includes('evenodd')));
 const navigation=await p.evaluate(async()=>{const w=await import('./src/walk.js?v=k1d');const points=[[900,1150],[950,1150],[1000,1150],[1080,1155]];const blocked=points.map(p=>!w.canWalk(...p));G.player.x=950;G.player.y=1150;G.syncBlocks(true);const recovered={x:G.player.x,y:G.player.y,walkable:w.canWalk(G.player.x,G.player.y)};const from=[1270,1050],to=[1410,1190],path=w.findPath(...from,...to);let last=from,clear=!!path;for(const next of path||[]){clear=clear&&w.clearLine(last,next);last=next;}return {points,blocked,recovered,bridgeRouteClear:clear,path};});assert.ok(navigation.blocked.every(Boolean));assert.ok(navigation.recovered.walkable);assert.ok(navigation.bridgeRouteClear);
 results.push({viewport,start,pauseHover:hover,harbour,duplicateHarbourHidden:true,weatherClip:clip,navigation});await c.close();
}
assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({results,pageErrors:errors},null,2));console.log(JSON.stringify({results,errors}));
}catch(e){writeFileSync(out+'/browser-error.json',JSON.stringify({error:String(e),errors},null,2));throw e;}finally{await browser?.close();await new Promise(r=>server.close(r));}
