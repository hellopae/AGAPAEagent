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
for(const viewport of [{width:1280,height:800},{width:390,height:844}])for(const zone of ['th','asia','west','cyberhell']){
 const c=await browser.newContext({viewport,reducedMotion:'reduce'}),seed=JSON.parse(readFileSync(root+'/tests/fixtures/b1-v3.json'));seed.zone=zone;seed.gameCompleted=true;seed.finalEvent={...(seed.finalEvent||{}),phase:'completed'};seed.storySeen={...(seed.storySeen||{}),ending:true};seed.pendingReward=null;seed.storyQueue=[];seed.pendingVerdictScene=null;
 await c.addInitScript(seed=>localStorage.setItem('avegee.save.v2',JSON.stringify(seed)),seed);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);await p.locator('#t-start').click();await p.locator('[data-save-slot="1"]').click();
 await p.evaluate(async()=>{const {TUTOR,ZONE_EVENTS}=await import('./src/data.js'),g=G;for(const [zone,events]of Object.entries(ZONE_EVENTS))g.zoneEvents[zone]=Object.fromEntries(events.map(ev=>[ev.k,'cleared']));g.taught=[...new Set([...g.taught,...TUTOR.map(t=>t.k),'trial-calculation','interrogation-traits'])];g.stepWorld=()=>{};g.advanceAfterlife=()=>{};g.step=()=>{};g.syncDiscoveries();while(g.discoveryQueue.length)g.acknowledgeDiscovery(g.discoveryQueue[0]);document.querySelectorAll('dialog[open]').forEach(d=>d.close());g.pendingReward=null;g.pendingLevel=null;g.onChange=()=>{};g.battle=null;g.paused=false;g.player.x=1855;g.player.y=1102});

 const probe=await p.evaluate(async()=>{
  const {drawMapTravel,mapTravelPose}=await import('./src/map-travel.js');
  const cv=document.createElement('canvas');cv.width=1000;cv.height=760;
  const ctx=cv.getContext('2d');ctx.fillStyle='#27404b';ctx.fillRect(0,0,1000,760);
  const a={mode:'boat',pier:{x:140,y:100},waterY:160,niraPath:[[140,100],[140,100]],boardingHop:8,reduced:true,phase:'depart',progress:0};
  ctx.scale(3.5,3.5);drawMapTravel(ctx,{zone:G.zone,mapTravel:a},0,48);
  return {png:cv.toDataURL(),zone:G.zone,pose:mapTravelPose(a)};
 });
 writeFileSync(out+`/deck-${zone}-${viewport.width}.png`,Buffer.from(probe.png.split(',')[1],'base64'));delete probe.png;results.push(probe);
 await p.screenshot({path:out+`/game-${zone}-${viewport.width}.png`});

 await c.close();
}
assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({results,pageErrors:errors},null,2));console.log(JSON.stringify({results,errors}));
}catch(e){writeFileSync(out+'/browser-error.json',JSON.stringify({error:String(e),errors},null,2));throw e;}finally{await browser?.close();await new Promise(r=>server.close(r));}
