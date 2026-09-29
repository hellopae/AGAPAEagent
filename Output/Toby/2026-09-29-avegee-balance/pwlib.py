import asyncio, json, time
from playwright.async_api import async_playwright
OUT='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-09-29-avegee-balance/shots/'
URL='http://127.0.0.1:8791/index.html'
STATE_JS = """() => { const d=document.querySelector('dialog#dlg'); return ({tick: G.tick, paused: G.paused, court: !G.courtClosed, coin: Math.round(G.coin), food: Math.round(G.food), order: Math.round(G.order), karma: +G.karma.toFixed(1), hp: Math.round(G.hp), lvl: G.level, greens: G.greens, q: G.queue.length, cases: G.casesDone, zone: G.zone, battle: !!G.battle, stations: G.stations.map(s=>s.def.k).join(','), crew: G.crew.map(c=>c.k).join(','), mobs: G.mobs.length, dlg: d && d.open ? d.innerText.slice(0,160).replace(/\\n+/g,' | ') : null}); }"""
async def state(page): return await page.evaluate(STATE_JS)
async def dlg_buttons(page):
    return await page.evaluate("() => { const d=document.querySelector('dialog#dlg'); return d&&d.open ? [...d.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.innerText.trim()) : null; }")
async def shot(page, name): await page.screenshot(path=OUT+name)
async def launch(p, w=1440, h=810, mobile=False):
    b = await p.chromium.launch()
    ctx = await b.new_context(viewport={'width':w,'height':h}, has_touch=mobile, is_mobile=mobile)
    page = await ctx.new_page()
    logs=[]
    page.on('console', lambda m: logs.append((m.type, m.text)) if m.type in ('error',) else None)
    page.on('pageerror', lambda e: logs.append(('pageerror', str(e))))
    await page.goto(URL)
    await page.wait_for_timeout(1000)
    return b, page, logs
async def start_new(page):
    await page.click('#enter-button'); await page.wait_for_timeout(1200)
    await page.click('#t-new'); await page.wait_for_timeout(1200)
