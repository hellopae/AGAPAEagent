import asyncio, json
from pwlib import *
from pw_probe import intro, pick_and_go, close_popups
async def main():
    async with async_playwright() as p:
        b, page, logs = await launch(p)
        await start_new(page); await intro(page)
        await page.evaluate("""() => { const o=G.assign; G.assign=function(...a){ const r=o.apply(this,a); (window.__calls ||= []).push({args:a.slice(1), r, queue:this.queue.length}); return r; }; G.queue.forEach(s=>{s.resist=false;s.beaten=true;}); }""")
        await page.click('#hud-open-court'); await page.wait_for_timeout(400)
        await page.click('#hud-trial'); await page.wait_for_timeout(600)
        await pick_and_go(page, 'krata', 'taan', 3); await close_popups(page)
        await page.evaluate("() => { G.build('dab'); G.spawnSoul(); G.queue.forEach(s=>{s.resist=false;s.beaten=true;}); }")
        await page.wait_for_timeout(1500)
        await page.click('#hud-trial'); await page.wait_for_timeout(600)
        print('state before 2nd go', await page.evaluate("() => ({taan:{at:G.crewOf('taan').at, esc:G.crewOf('taan').escort, bk:G.crewOf('taan').buildK}, krata:{slots:G.stations[1].slots.length, crewK:G.stations[1].crewK}, q:G.queue.length})"))
        await pick_and_go(page, 'krata', 'taan', 3)
        print('calls', json.dumps(await page.evaluate("() => window.__calls"), ensure_ascii=False))
        print('dialog open after go?', await page.evaluate("() => !!document.querySelector('dialog#dlg[open]')"), 'q', await page.evaluate("() => G.queue.length"))
        await b.close()
asyncio.run(main())
