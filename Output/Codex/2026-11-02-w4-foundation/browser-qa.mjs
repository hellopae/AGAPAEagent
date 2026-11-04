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
 seed.zone='th';seed.level=5;seed.abilities={ice:true};seed.bossCleared={};seed.discoverySeen={};seed.discoveryQueue=['ability:ice','power:ice'];seed.gameCompleted=true;seed.finalEvent={...(seed.finalEvent||{}),phase:'completed'};seed.storySeen={...(seed.storySeen||{}),ending:true};seed.pendingReward=null;seed.storyQueue=[];seed.pendingVerdictScene=null;
 seed.zoneEvents={th:{frontierBreach:'pending',prisonBreak:'cleared',devaTest:'cleared',thBorderBoss:'cleared'},asia:{},west:{},cyberhell:{cyberRescue:'cleared',cyberBreach:'cleared',cyberFinal:'cleared'}};
 await c.addInitScript(seed=>localStorage.setItem('avegee.save.v2',JSON.stringify(seed)),seed);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);await p.locator('#t-start').click();await p.locator('[data-save-slot="1"]').click();
 const migrated=await p.evaluate(async()=>{window.w4UI=await import(document.querySelector('script[type=module][src*="src/ui.js"]').src);const {TUTOR}=await import('./src/data.js'),g=G;const migrated={iceLocked:g.powerLocked(g.powerOf('ice')),iceQueued:g.discoveryQueue.some(k=>k.endsWith(':ice'))};g.taught=[...new Set([...g.taught,...TUTOR.map(t=>t.k),'trial-calculation','interrogation-traits'])];g.stepWorld=()=>{};g.advanceAfterlife=()=>{};g.step=()=>{};g.syncDiscoveries();while(g.discoveryQueue.length)g.acknowledgeDiscovery(g.discoveryQueue[0]);document.querySelectorAll('dialog[open]').forEach(d=>d.close());g.pendingReward=null;g.pendingLevel=null;g.onChange=()=>{};g.battle=null;g.abilities.teamJudgment=false;g.paused=true;return migrated;});
 assert.equal(migrated.iceLocked,true);assert.equal(migrated.iceQueued,false);
 await p.evaluate(()=>{const g=G;g.startBattle({id:999,who:'ตรวจเงื่อนไขพลัง',name:'ตรวจเงื่อนไขพลัง',sp:1,deserved:4,resist:true});w4UI.openBattle();});await p.locator('#dlg .battle-yama-card').waitFor();assert.equal(await p.locator('.battle-team-ultimate').count(),0);await p.screenshot({path:out+`/battle-locked-${viewport.width}.png`});
 await p.evaluate(()=>{G.abilities.teamJudgment=true;w4UI.openBattle();});await p.locator('.battle-team-ultimate').waitFor();assert.ok(!(await p.locator('.battle-team-ultimate').innerText()).includes('ล็อก'));await p.screenshot({path:out+`/battle-earned-${viewport.width}.png`});
 await p.evaluate(()=>{document.querySelector('#dlg').close();G.battle=null;});await p.waitForTimeout(400);await p.evaluate(()=>{const s=G.queue[0];s.merits=[{t:'แบ่งอาหารให้ผู้หิวโหย',v:5,fake:false},{t:'อ้างว่าเคยช่วยผู้หิวโหย',v:5,fake:true}];s.ready=true;s.arrival=null;G.caseReady=()=>true;w4UI.openTrial();});
 await p.screenshot({path:out+`/trial-before-${viewport.width}.png`});console.log('TRIAL',JSON.stringify(await p.evaluate(()=>({open:document.querySelector('#dlg').open,cls:document.querySelector('#dlg').className,text:document.querySelector('#dlg').innerText.slice(0,80)}))));const merit=p.locator('#dlg .deed.merit').filter({hasText:'แบ่งอาหารให้ผู้หิวโหย'});await merit.waitFor();const colors=await p.locator('#dlg .deed.merit').evaluateAll(els=>els.map(el=>({text:el.textContent,color:getComputedStyle(el).color})));assert.ok(colors.length>=2);assert.equal(colors[0].color,colors[1].color);assert.ok(!['rgb(192, 57, 43)','rgb(255, 0, 0)'].includes(colors[0].color));await p.screenshot({path:out+`/trial-merits-${viewport.width}.png`});
 results.push({viewport,migrated,lockedMeterAbsent:true,earnedMeterVisible:true,meritColors:colors});await c.close();
}
assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({results,pageErrors:errors},null,2));console.log(JSON.stringify({results,errors}));
}catch(e){writeFileSync(out+'/browser-error.json',JSON.stringify({error:String(e),errors},null,2));throw e;}finally{await browser?.close();await new Promise(r=>server.close(r));}
