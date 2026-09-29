import asyncio, json
from pwlib import *
async def intro(page):
    for i in range(5):
        btn = page.locator('dialog#dlg button', has_text='หน้าถัดไป')
        if await btn.count(): await btn.first.click(); await page.wait_for_timeout(150)
    await page.locator('dialog#dlg button', has_text='รับงาน').click(); await page.wait_for_timeout(600)
    await page.evaluate("() => { const d=document.querySelector('dialog#dlg[open]'); [...d.querySelectorAll('button')].find(b=>/รับทราบ/.test(b.innerText))?.click(); }"); await page.wait_for_timeout(500)
async def main():
    async with async_playwright() as p:
        for label, (w,h,mob) in {'d':(1440,810,False),'m':(390,844,True)}.items():
            b, page, logs = await launch(p, w, h, mob)
            await start_new(page); await intro(page)
            await page.evaluate("() => { G.zoneCases.th = 10; G.casesDone = 3; G.bossArriveSeen.th = true; G.courtClosed = false; G.bossPending = true; G.onChange(); }")
            await page.wait_for_timeout(25000)
            await shot(page, f'boss-prep-{label}.png')
            info = await page.evaluate("""() => { const d=document.querySelector('dialog#dlg[open]'); if(!d) return null;
              const bs=[...d.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>({t:b.innerText.trim().slice(0,30), top:Math.round(b.getBoundingClientRect().top), bottom:Math.round(b.getBoundingClientRect().bottom)}));
              const r=d.getBoundingClientRect(); return {vh:innerHeight, dlg:{top:Math.round(r.top),bottom:Math.round(r.bottom),scrollH:d.scrollHeight,clientH:d.clientHeight}, buttons:bs}; }""")
            print(label, json.dumps(info, ensure_ascii=False))
            scr = await page.evaluate("""() => { const d=document.querySelector('dialog#dlg[open]'); const out=[]; d.querySelectorAll('*').forEach(e=>{ const cs=getComputedStyle(e); if((cs.overflowY==='auto'||cs.overflowY==='scroll') && e.scrollHeight>e.clientHeight+2) out.push({cls:e.className.toString().slice(0,40), sh:e.scrollHeight, ch:e.clientHeight, ov:cs.overflowY}); });
               const btn=[...d.querySelectorAll('button')].find(b=>/เข้าสู้/.test(b.innerText)); const bs=getComputedStyle(btn.parentElement);
               return {scrollables:out, btnParent:btn.parentElement.className, btnParentPos:bs.position, dlgOverflow:getComputedStyle(d).overflow}; }""")
            print(label,'scrollables', json.dumps(scr, ensure_ascii=False))
            # try to click the fight button as a user would (mouse at its centre)
            r = await page.evaluate("() => { const b=[...document.querySelectorAll('dialog#dlg[open] button')].find(b=>/เข้าสู้/.test(b.innerText)); const r=b.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2, top:r.top, bottom:r.bottom}; }")
            print(label,'fight btn centre', r, 'viewport h', h)
            hit = await page.evaluate("([x,y]) => { const e=document.elementFromPoint(x,y); return e ? (e.tagName+'.'+e.className.toString().slice(0,30)+' '+(e.innerText||'').slice(0,20)) : null; }", [r['x'], min(r['y'], h-2)])
            print(label,'element at that point (clamped to viewport):', hit)
            await b.close()
asyncio.run(main())
