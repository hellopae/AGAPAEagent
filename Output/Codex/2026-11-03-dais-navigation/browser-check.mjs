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
 const c=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'}),seed=JSON.parse(readFileSync(root+'/tests/fixtures/b1-v3.json'));
 seed.zone=zone;seed.gameCompleted=true;seed.finalEvent={...(seed.finalEvent||{}),phase:'completed'};seed.storySeen={...(seed.storySeen||{}),ending:true};seed.pendingReward=null;seed.storyQueue=[];seed.pendingVerdictScene=null;
 await c.addInitScript(seed=>localStorage.setItem('avegee.save.v2',JSON.stringify(seed)),seed);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);await p.locator('#t-start').click();await p.locator('[data-save-slot="1"]').click();
 await p.evaluate(async()=>{const {TUTOR,ZONE_EVENTS}=await import('./src/data.js'),g=G;for(const [zone,events] of Object.entries(ZONE_EVENTS))g.zoneEvents[zone]=Object.fromEntries(events.map(ev=>[ev.k,'cleared']));g.taught=[...new Set([...g.taught,...TUTOR.map(t=>t.k),'trial-calculation','interrogation-traits'])];g.advanceAfterlife=()=>{};g.step=()=>{};g.stepWorld=()=>{};g.syncDiscoveries();while(g.discoveryQueue.length)g.acknowledgeDiscovery(g.discoveryQueue[0]);document.querySelectorAll('dialog[open]').forEach(d=>d.close());g.pendingReward=null;g.pendingLevel=null;g.onChange=()=>{};g.battle=null;g.paused=false;});
 const nav=await p.evaluate(async()=>{const L=await import('./src/town-layout.js?v=k1d'),D=await import('./src/town-dais-geometry.js'),w=await import('./src/walk.js?v=k1d'),g=G;g.syncBlocks(true);const from=[L.TOWN_DAIS.x,L.TOWN_DAIS.y+40],to=L.TOWN_CREW.nira,path=w.findPath(...from,...to);let last=from,clear=!!path,samples=0;for(const next of path||[]){const n=Math.ceil(Math.hypot(next[0]-last[0],next[1]-last[1]));for(let i=1;i<=n;i++){clear=clear&&w.canWalk(last[0]+(next[0]-last[0])*i/n,last[1]+(next[1]-last[1])*i/n);samples++;}last=next;}const rails=D.DAIS_GEOMETRY[g.zone].rail.map((point,i,arr)=>{if(!i)return true;const prev=arr[i-1],p=D.daisWorldPoint([(point[0]+prev[0])/2,(point[1]+prev[1])/2],L.TOWN_DAIS);return !w.canWalk(...p);});g.player.x=from[0];g.player.y=from[1];g.player.path=null;const nira=g.crewOf('nira');if(nira){nira.x=to[0];nira.y=to[1];nira.path=null;nira.wait=999999;}return {zone:g.zone,dais:{...L.TOWN_DAIS},from,to,path,clear,samples,railsBlocked:rails.every(Boolean),niraWalkable:w.canWalk(...to)};});
 assert.equal(nav.zone,zone);assert.ok(nav.clear);assert.ok(nav.railsBlocked);assert.ok(nav.niraWalkable);assert.deepEqual(nav.path.at(-1),nav.to);await p.waitForTimeout(800);
 await p.screenshot({path:out+`/dais-${zone}.png`});results.push(nav);await c.close();
}
assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({results,pageErrors:errors},null,2));console.log(JSON.stringify({results,errors}));
}catch(e){writeFileSync(out+'/browser-error.json',JSON.stringify({error:String(e),errors},null,2));throw e;}finally{await browser?.close();await new Promise(r=>server.close(r));}
