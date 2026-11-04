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
 const context=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message);});
 await title(page);assert.equal(await page.locator('.title-actions button').count(),1);assert.equal(await page.evaluate(()=>localStorage.getItem('avegee.save.slot.1.v1')),null);await page.screenshot({path:out+'/home-desktop.png'});console.log('Home START ready, no save before selection');
 await page.locator('#t-start').click();await page.locator('.save-slots-modal').waitFor();assert.equal(await page.locator('[data-save-slot]').count(),3);assert.equal(await page.getByText('New Game',{exact:true}).count(),3);await page.screenshot({path:out+'/empty-slots-desktop.png'});
 await page.locator('[data-save-slot="2"]').click();await page.waitForFunction(()=>document.querySelector('#title').classList.contains('gone'));await page.waitForTimeout(1500);await page.evaluate(()=>dispatchEvent(new Event('pagehide')));const created=await page.evaluate(()=>({one:localStorage.getItem('avegee.save.slot.1.v1'),two:JSON.parse(localStorage.getItem('avegee.save.slot.2.v1')),three:localStorage.getItem('avegee.save.slot.3.v1'),legacy:localStorage.getItem('avegee.save.v2')}));assert.equal(created.one,null);assert.equal(created.three,null);assert.equal(created.legacy,null);assert.ok(created.two.playTimeMs>0);results.push({case:'new slot2',onlySlot2Written:true,playTimeMs:created.two.playTimeMs});
 await title(page);await page.locator('#t-start').click();assert.equal(await page.getByText('New Game',{exact:true}).count(),2);assert.ok((await page.locator('[data-save-slot="2"]').innerText()).includes('เวลาเล่น'));await page.locator('[data-save-slot="2"]').click();await page.waitForFunction(()=>document.querySelector('#title').classList.contains('gone'));results.push({case:'reload and continue slot2',passed:true});await context.close();
 const legacy=JSON.parse(readFileSync(root+'/tests/fixtures/b1-v3.json'));legacy.coin=12345;legacy.order=87;legacy.karma=22;legacy.playTimeMs=3723000;
 for(const viewport of [{width:1280,height:800},{width:390,height:844}]){
  const c=await browser.newContext({viewport,reducedMotion:'reduce'});await c.addInitScript(data=>localStorage.setItem('avegee.save.v2',JSON.stringify(data)),legacy);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await title(p);await p.screenshot({path:out+`/home-${viewport.width}.png`});await p.locator('#t-start').click();await p.locator('.save-slots-modal').waitFor();const text=await p.locator('[data-save-slot="1"]').innerText();for(const value of ['01:02:03','12,345','87','22','ยมทูต'])assert.ok(text.includes(value),value);assert.equal(await p.getByText('New Game',{exact:true}).count(),2);const bounds=await p.locator('.save-slots-modal').evaluate(el=>({width:el.getBoundingClientRect().width,client:el.clientWidth,scroll:el.scrollWidth,height:el.getBoundingClientRect().height}));assert.ok(bounds.width<=viewport.width);assert.ok(bounds.scroll<=bounds.client+1);await p.screenshot({path:out+`/occupied-slots-${viewport.width}.png`});const preserved=await p.evaluate(()=>localStorage.getItem('avegee.save.v2')===localStorage.getItem('avegee.save.slot.1.v1'));assert.ok(preserved);results.push({case:'legacy migration and occupied slots',viewport,bounds,preserved});await c.close();console.log('Occupied slot and layout verified',viewport.width);
 }
 assert.deepEqual(errors,[]);writeFileSync(out+'/browser-checks.json',JSON.stringify({method:'Real Playwright Chromium with a clean temporary profile and local HTTP server; no personal browser data',results,pageErrors:errors},null,2));console.log('All real browser Home/slot checks passed');
}catch(e){writeFileSync(out+'/browser-error.json',JSON.stringify({error:String(e),pageErrors:errors},null,2));throw e;}finally{await browser?.close();await new Promise(r=>server.close(r));}
