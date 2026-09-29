"""Probes: (1) silent assign failure, (2) NaN verdict from named case 'hammer'."""
import asyncio, json
from pwlib import *
async def intro(page):
    for i in range(5):
        btn = page.locator('dialog#dlg button', has_text='หน้าถัดไป')
        if await btn.count(): await btn.first.click(); await page.wait_for_timeout(200)
    await page.locator('dialog#dlg button', has_text='รับงาน').click(); await page.wait_for_timeout(800)
    await page.evaluate("() => { const d=document.querySelector('dialog#dlg[open]'); [...d.querySelectorAll('button')].find(b=>/รับทราบ/.test(b.innerText))?.click(); }"); await page.wait_for_timeout(600)
async def close_popups(page, n=4):
    for _ in range(n):
        ok = await page.evaluate("() => { const d=document.querySelector('dialog#dlg[open]'); if(!d) return false; const b=[...d.querySelectorAll('button')].find(b=>/รับทราบ|รับไว้|ตกลง|ปิด/.test(b.innerText)); if(b){b.click(); return true;} return false; }")
        if not ok: break
        await page.wait_for_timeout(350)
async def pick_and_go(page, st, cr, inten):
    for cmd, sel in (('1',f'.options-1 [data-pickkey="st"][data-k="{st}"]'),('2',f'.options-2 [data-pickkey="cr"][data-k="{cr}"]'),('3',f'.options-3 [data-pickkey="inten"][data-v="{inten}"]')):
        await page.evaluate("(c) => document.querySelector(`dialog#dlg [data-command=\"${c}\"]`).click()", cmd); await page.wait_for_timeout(200)
        await page.evaluate("(s) => document.querySelector('dialog#dlg '+s).click()", sel); await page.wait_for_timeout(200)
    await page.evaluate("() => document.querySelector('dialog#dlg #t-go').click()"); await page.wait_for_timeout(700)
async def main():
    async with async_playwright() as p:
        # ---------- probe 1 ----------
        b, page, logs = await launch(p)
        await start_new(page); await intro(page)
        await page.evaluate("() => { G.hire('dam'); G.spawnSoul(); G.queue.forEach(s=>{s.resist=false; s.beaten=true;}); }")
        await page.click('#hud-open-court'); await page.wait_for_timeout(500)
        await page.click('#hud-trial'); await page.wait_for_timeout(700)
        await pick_and_go(page, 'krata', 'taan', 3)
        # close verdict popup(s)
        await close_popups(page)
        print('after case1', await state(page), 'taan.escort=', await page.evaluate("() => G.crewOf('taan').escort"))
        # second case straight away
        await page.click('#hud-trial'); await page.wait_for_timeout(700)
        before = await page.evaluate("() => ({q:G.queue.length, top:G.logs[0].text})")
        await shot(page, 'p1-second-trial-before-go.png')
        await pick_and_go(page, 'krata', 'dam', 3)
        after = await page.evaluate("() => ({q:G.queue.length, top:G.logs[0].text, dlg: !!document.querySelector('dialog#dlg[open]')})")
        await shot(page, 'p1-second-trial-after-go.png')
        print('PROBE1 before', before, 'after', after)
        await b.close()
        # ---------- probe 2 ----------
        b, page, logs = await launch(p)
        await start_new(page); await intro(page)
        await page.evaluate("""async () => {
          const m = await import('./src/data.js');
          G.coin = 2000; G.casesDone = 1;
          const lan = m.STATIONS.find(s=>s.k==='lan');
          G.stations.push({def: lan, slots: [], crewK: null, intensity: 3, build: 0, buildWait:false, repair:0, repairWait:false, fire:0, speedLv:0, capLv:0, fuelLv:0, mgCd:0});
          const keys = (await import('./src/cases.js')).CASES_BY_ZONE.th.map(c=>c.k).filter(k=>k!=='hammer');
          G.usedCases = keys; G.queue = []; G.spawns = 2; G.spawnSoul();
        }""")
        print('queue front', await page.evaluate("() => ({case:G.queue[0].case, name:G.queue[0].name, deeds:G.queue[0].deeds.map(d=>d.s+':'+d.w), deserved:G.queue[0].deserved})"))
        await page.click('#hud-open-court'); await page.wait_for_timeout(400)
        await page.click('#hud-trial'); await page.wait_for_timeout(800)
        await shot(page, 'p2-nan-trial.png')
        await pick_and_go(page, 'lan', 'taan', 1)
        await close_popups(page)
        await page.wait_for_timeout(500)
        res = await page.evaluate("() => ({coin:G.coin, order:G.order, ledger:G.ledger.at(-1), logs:G.logs.slice(0,3).map(l=>l.text)})")
        print('PROBE2', json.dumps(res, ensure_ascii=False, default=str))
        await shot(page, 'p2-nan-after.png')
        # 2nd normal soul afterwards, do economy still NaN?
        await page.evaluate("() => { G.spawnSoul(); }")
        print('coin text in HUD:', await page.evaluate("() => document.querySelector('#res').innerText.replace(/\\s+/g,' ')"))
        await b.close()
asyncio.run(main())
