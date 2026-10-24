// Optional reproduction aid for a human/Claude QA runner with Playwright installed.
// Not executed by Codex: this session used CUA for every browser interaction.
// Start review-server.py first. Only that local fixture provides the qa-* buttons.
import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const out=join(dirname(fileURLToPath(import.meta.url)),'browser-script');await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const base=process.env.AVEGEE_QA_URL||'http://127.0.0.1:8791/';
try{
 for(const viewport of [{width:1280,height:720},{width:390,height:844}]){
  const context=await browser.newContext({viewport}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const ready=async()=>{await page.goto(base,{waitUntil:'domcontentloaded'});await page.locator('#boot').waitFor({state:'hidden',timeout:90000});await page.locator('#qa-paid').waitFor({state:'visible'});};
  for(const kind of ['paid','empty','long','reduced','english','guide','missing']){
   await ready();await page.locator('#qa-'+kind).click();await page.locator('dialog.battle-reward[open]').waitFor();
   await page.waitForFunction(()=>{const b=document.querySelector('[data-reward-next]');return b&&!/แสดงยอดทันที|Show totals now/.test(b.textContent);},{},{timeout:10000});
   const name=viewport.width+'-'+kind;await page.screenshot({path:join(out,name+'.png')});
   const metrics=await page.locator('.battle-reward').evaluate(el=>{const body=el.querySelector('.reward-content'),r=el.querySelector('[data-reward-next]').getBoundingClientRect();return {width:el.clientWidth,scrollWidth:el.scrollWidth,columns:getComputedStyle(body).gridTemplateColumns,contentHeight:body.clientHeight,contentScrollHeight:body.scrollHeight,buttonTop:r.top,buttonBottom:r.bottom};});
   await writeFile(join(out,name+'.json'),JSON.stringify({metrics,errors},null,2));
   if(kind==='long'){await page.locator('.reward-content').evaluate(el=>el.scrollTop=el.scrollHeight);await page.screenshot({path:join(out,name+'-bottom.png')});}
   await page.locator('[data-reward-next]').click();
  }
  await ready();await page.locator('#qa-fight').click();await page.locator('.combat-arena').waitFor();await page.screenshot({path:join(out,viewport.width+'-statuses.png')});
  if(viewport.width===1280){
   await page.locator('#qa-hold').click();await page.locator('[data-command="power"]').click();await page.getByRole('button',{name:'ฟาดกระบอง 35 ท่าพิเศษ / Special',exact:true}).click();await page.getByRole('button',{name:'เป้าหมายที่สอง 10000/10000',exact:true}).click();
   await page.waitForFunction(()=>document.querySelector('.battle-dashing')?.dataset.dashPhase==='attack');await page.screenshot({path:join(out,'1280-move-held.png')});await page.locator('#qa-hold').click();
  }
  await context.close();
 }
}finally{await browser.close();}
