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
 const fixture=JSON.parse(readFileSync(root+'/tests/fixtures/b1-v3.json'));
 for(const zone of (process.argv[4]?[process.argv[4]]:['th','asia','west','cyberhell']))for(const viewport of [{width:390,height:844},{width:1280,height:800},...(zone==='th'?[{width:3840,height:2160}]:[])]){
  const d=structuredClone(fixture),original=d.zone;d.playTimeMs=3723000;d.coin=12345;d.order=87;d.karma=22;
  if(zone!==original){d.zoneSave[original]={crew:d.crew,guard:d.guard};d.crew=d.zoneSave[zone].crew;d.guard=d.zoneSave[zone].guard;d.zone=zone;}
  const c=await browser.newContext({viewport,reducedMotion:'reduce'});await c.addInitScript(data=>localStorage.setItem('avegee.save.slot.1.v1',JSON.stringify(data)),d);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);await p.locator('#t-start').click();await p.locator('.save-slots-modal').waitFor();await p.locator('.save-slot-portrait img').first().waitFor();await p.waitForFunction(()=>[...document.querySelectorAll('.save-slot-portrait img,.save-slot-stat>img')].every(im=>im.complete&&im.naturalWidth>0));
  await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('.save-slot-portrait img')].map(im=>im.decode()));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
  const info=await p.locator('.save-slots-modal').evaluate(el=>({width:el.getBoundingClientRect().width,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,portraits:[...el.querySelectorAll('.save-slot-portrait img')].map(im=>({id:im.dataset.crewId,zone:im.dataset.crewZone,src:im.getAttribute('src'),alt:im.alt,decoded:im.naturalWidth>0})),icons:[...el.querySelectorAll('.save-slot-stat>img')].map(im=>im.getAttribute('src')),back:[...el.querySelectorAll('button')].filter(b=>b.offsetWidth&&b.offsetHeight&&(/close|back|กลับ|ปิด/.test(b.getAttribute('aria-label')||''))).length}));
  assert.ok(info.width<=viewport.width);assert.ok(info.scrollWidth<=info.clientWidth+1);assert.ok(info.portraits.length>0&&info.portraits.every(im=>im.zone===zone&&im.decoded&&im.alt));assert.equal(info.back,1);assert.equal(info.icons.length,3);assert.equal(await p.locator('[data-save-slot]').count(),3);assert.equal(await p.getByText('New Game',{exact:true}).count(),2);
  assert.equal(await p.evaluate(()=>localStorage.getItem('avegee.save.slot.1.v1')),JSON.stringify(d));await p.screenshot({path:out+`/slots-${zone}-${viewport.width}.png`});results.push({zone,viewport,...info,saveUnchanged:true,awaitedImageDecode:true});await c.close();console.log('Verified',zone,viewport.width);
 }
 assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({method:'Real installed Chromium, clean temporary profiles, actual START/save-slot UI',results,pageErrors:errors},null,2));console.log('All save visual checks passed');
}catch(e){writeFileSync(out+'/browser-error.json',JSON.stringify({error:String(e),pageErrors:errors},null,2));throw e;}finally{await browser?.close();await new Promise(r=>server.close(r));}
