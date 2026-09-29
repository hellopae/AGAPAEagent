"""Real-browser onboarding playthrough (AVEGEE batch 20). Analysis only — reads the game via http://127.0.0.1:8791.
Usage: python3 pw_session.py <label> <wall_seconds> [mobile]
Player model: 'careful human' — reads (pauses) ~READ_S per case in the trial, then picks station/crew/intensity by
the real wheel UI. Build via real UI (walk to plot, click plot, confirm). Hire/food via API (UI path is at Nira's desk)."""
import asyncio, json, sys, time, math
from pwlib import *
LABEL = sys.argv[1]; WALL = float(sys.argv[2]); MOBILE = len(sys.argv) > 3 and sys.argv[3] == 'mobile'
READ_S = float(sys.argv[4]) if len(sys.argv) > 4 else 8.0
W, H = (390, 844) if MOBILE else (1440, 810)
events = []; t0 = time.time()
def ev(kind, **kw):
    d = dict(t=round(time.time()-t0, 1), kind=kind, **kw); events.append(d); print(json.dumps(d, ensure_ascii=False)); sys.stdout.flush()
CLOSERS = ['รับทราบ','รับงาน','ตกลง','ต่อไป','เข้าใจแล้ว','เข้าใจ','ปิด','ดำเนินการต่อ','ไปต่อ','เริ่ม','รับรางวัล','ได้เลย','โอเค','ลงนาม','ยอมรับ']

async def dlg_text(page):
    return await page.evaluate("() => { const d=document.querySelector('dialog#dlg'); return d&&d.open ? d.innerText : null; }")

async def battle_turn(page):
    b = await page.evaluate("() => G.battle && ({over:G.battle.over, kind:G.battle.kind, you:G.battle.youHp, foe:G.battle.foeHp, coin:G.coin, fire:G.fireAmmo, guardOk: !!(G.guard && !G.guardHelpWhy())})")
    if not b: return 'none'
    if b['over']:
        return 'over'
    act = 'atk'; cmd = None
    if b['you'] < 40 and b['coin'] >= 45: act, cmd = 'health', '3'
    elif b['you'] < 40 and b['coin'] >= 22: act, cmd = 'tea', '3'
    elif b['fire'] > 0 and b['foe'] > 30: act, cmd = 'fire', '1'
    if cmd:
        await page.evaluate("(c) => document.querySelector(`dialog#dlg [data-command=\"${c}\"]`)?.click()", cmd); await page.wait_for_timeout(250)
    ok = await page.evaluate("(a) => { const e=document.querySelector(`dialog#dlg [data-act=\"${a}\"]`); if(!e||e.disabled) return false; e.click(); return true; }", act)
    if not ok:
        await page.evaluate("() => document.querySelector('dialog#dlg [data-act=\"atk\"]')?.click()")
    return act

async def handle_modal(page, txt):
    title = txt.strip().split('\n')[0][:60]
    if await page.evaluate("() => !!(G.battle)"):
        r = await battle_turn(page)
        if r == 'over':
            bt = [x for x in (await dlg_buttons(page) or []) if x]
            ev('battle-over', title=title, buttons=bt[:8])
            for c in CLOSERS + bt[-1:]:
                loc = page.locator('dialog#dlg button', has_text=c)
                if await loc.count():
                    try: await loc.last.click(timeout=1500); break
                    except Exception: pass
            else: await page.keyboard.press('Escape')
            await page.wait_for_timeout(700)
        else:
            await page.wait_for_timeout(900)
        return 'battle'
    bt = await dlg_buttons(page) or []
    bt = [b for b in bt if b]
    if 'สำนวน :' in txt or 'สำนวน : ' in txt: return 'trial'
    for c in CLOSERS:
        loc = page.locator('dialog#dlg button', has_text=c)
        if await loc.count():
            try:
                await loc.last.click(timeout=2000); ev('modal', title=title, click=c, buttons=bt[:6]); return 'closed'
            except Exception as e: pass
    # fallback: last button or close
    if bt:
        try:
            await page.locator('dialog#dlg button', has_text=bt[-1]).last.click(timeout=2000); ev('modal', title=title, click=bt[-1], buttons=bt[:6]); return 'closed'
        except Exception: pass
    await page.keyboard.press('Escape'); ev('modal-esc', title=title); return 'esc'

async def judge(page):
    """Operate the real trial wheel. Returns True if dispatched."""
    info = await page.evaluate("""() => { const s=G.queue[0]; if(!s) return null;
      const tot=s.deeds.reduce((a,d)=>a+d.w,0)||1;
      const opts=G.stations.filter(x=>x.def.pow>0 && x.def.k!=='sala' && !x.build && !x.repair && G.stFree(x)>0);
      const score=x=>{ if(x.def.heaven) return s.pure?9:-1; if(s.pure) return -1; return s.deeds.filter(d=>x.def.tags.includes(d.s)).reduce((a,d)=>a+d.w,0)/tot; };
      opts.sort((a,b)=>score(b)-score(a));
      return {pure:!!s.pure, dz:s.deserved, resist:!!(s.resist&&!s.beaten), st: opts.map(o=>o.def.k), idle:G.freeCrew().map(c=>c.k), score: opts[0]?score(opts[0]):null, presses:s.presses}; }""")
    if not info: return False
    if not info['st'] or not info['idle']: return False
    st = info['st'][0]; crew_k = None
    for cmd, key, val in (('1','st',st),('2','cr',None),('3','inten',None)):
        if cmd == '3' and st == 'sawan': continue
        await page.evaluate("(c) => document.querySelector(`dialog#dlg [data-command=\"${c}\"]`).click()", cmd)
        await page.wait_for_timeout(300)
        if key == 'st': sel = f'dialog#dlg .options-1 [data-pickkey="st"][data-k="{val}"]'
        elif key == 'cr':
            # prefer non-plerng with best rabiab
            k = crew_k = await page.evaluate("() => { const c=G.freeCrew().filter(c=>!c.self).sort((a,b)=>(b.rabiab+b.metta*.5-(b.k==='plerng'?3:0))-(a.rabiab+a.metta*.5-(a.k==='plerng'?3:0)))[0]; return c&&c.k; }")
            sel = f'dialog#dlg .options-2 [data-pickkey="cr"][data-k="{k}"]'
        else: sel = f'dialog#dlg .options-3 [data-pickkey="inten"][data-v="{info["dz"]}"]'
        try: await page.evaluate("(s) => document.querySelector(s).click()", sel)
        except Exception as e:
            ev('judge-click-fail', sel=sel, err=str(e)[:120]); await shot(page, f'{LABEL}-judgefail.png'); return False
        await page.wait_for_timeout(300)
    go = page.locator('dialog#dlg #t-go')
    if await go.is_enabled():
        pre = await page.evaluate("() => G.casesDone")
        await page.evaluate("() => document.querySelector('dialog#dlg #t-go').click()")
        await page.wait_for_timeout(900)
        post = await page.evaluate("() => G.casesDone")
        if post == pre and not await page.evaluate("() => !!G.battle"):
            diag = await page.evaluate("""() => ({ q0: G.queue[0] && {resist:G.queue[0].resist, beaten:G.queue[0].beaten, pure:G.queue[0].pure, deserved:G.queue[0].deserved},
               stations: G.stations.map(s=>({k:s.def.k, slots:s.slots.length, crewK:s.crewK, free:G.stFree(s), build:!!s.build, fire:s.fire})),
               crew: G.crew.map(c=>({k:c.k, at:c.at, esc:c.escort, buildK:c.buildK})), paused:G.paused, log0:G.logs[0].text })""")
            diag['chosen'] = dict(st=st, cr=crew_k)
            ev('assign-fail-diag', **diag)
        return True
    return False

BUILD_COST = {'dab':220,'ngiw':160,'lan':150,'lokan':260,'sawan':240,'tea':120,'tarang':300}
async def ui_build(page, k):
    """Real UI: walk to the empty plot (click-to-walk == G.walkTo), click plot on canvas, confirm in modal."""
    info = await page.evaluate("""(k) => { const d=window.__DEFS ? null : null; return null; }""", k)
    pos = await page.evaluate("""async (k) => { const m = await import('./src/data.js'); const d = m.STATIONS.find(x=>x.k===k); return {x:d.x,y:d.y,hit:d.hit, sw:m.SCENE.w, sh:m.SCENE.h}; }""", k)
    t0 = time.time()
    ok = await page.evaluate("([x,y]) => G.walkTo(x,y)", [pos['x'], pos['y']])
    ev('build-walk', k=k, ok=ok)
    for _ in range(90):
        d = await page.evaluate("([x,y]) => Math.hypot(G.player.x-x, G.player.y-y)", [pos['x'], pos['y']])
        if d < 80: break
        await page.wait_for_timeout(400)
    cv = await page.evaluate("() => { const r=document.querySelector('#cv').getBoundingClientRect(); return {l:r.left,t:r.top,w:r.width,h:r.height}; }")
    hx = (pos['hit'][0]+pos['hit'][2])/2; hy = (pos['hit'][1]+pos['hit'][3])/2
    px = cv['l'] + hx/pos['sw']*cv['w']; py = cv['t'] + hy/pos['sh']*cv['h']
    await page.mouse.click(px, py); await page.wait_for_timeout(700)
    txt = await dlg_text(page)
    if not txt or 'สร้าง' not in txt:
        ev('build-modal-missing', k=k, txt=(txt or '')[:80]); await shot(page, f'{LABEL}-build-fail-{k}.png'); return False
    await shot(page, f'{LABEL}-build-modal-{k}.png') if k == 'dab' else None
    await page.evaluate("() => document.querySelector('#bd')?.click()")
    await page.wait_for_timeout(500)
    ev('build-done', k=k, walk_secs=round(time.time()-t0,1))
    return True

async def main():
    async with async_playwright() as p:
        b, page, logs = await launch(p, W, H, MOBILE)
        await start_new(page)
        ev('start', mobile=MOBILE)
        # intro
        intro_pages = 0
        while True:
            nxt = page.locator('dialog#dlg button', has_text='หน้าถัดไป')
            if await nxt.count(): await nxt.first.click(); intro_pages += 1; await page.wait_for_timeout(250); continue
            fin = page.locator('dialog#dlg button', has_text='รับงาน')
            if await fin.count(): await fin.first.click(); break
            break
        ev('intro-done', pages=intro_pages, wall=round(time.time()-t0,1))
        await page.wait_for_timeout(800)
        await shot(page, f'{LABEL}-01-after-intro.png')
        last_shot = time.time(); cases_prev = 0; last_state = time.time()
        trial_started = None; waiting_since = None; idle_total = 0.0; court_opened = False
        wait_log = []
        opened_court_at = None
        stuck_no_court = 0
        built_plan = ['dab','ngiw','lan','lokan']
        while time.time() - t0 < WALK if False else time.time() - t0 < WALL:
            txt = await dlg_text(page)
            st = await state(page)
            if txt:
                r = await handle_modal(page, txt)
                if r == 'trial' and trial_started is None:
                    trial_started = time.time(); ev('trial-open', case=st['cases'], q=st['q'], waited=None if waiting_since is None else round(time.time()-waiting_since,1))
                    if waiting_since is not None: wait_log.append(time.time()-waiting_since); waiting_since = None
                    await shot(page, f'{LABEL}-trial-{st["cases"]:02d}.png') if st['cases'] in (0,1,6) else None
                    await page.wait_for_timeout(int(READ_S*1000))       # human reads
                    ok = await judge(page)
                    ev('judge', ok=ok, secs=round(time.time()-trial_started,1))
                    if not ok:
                        # cannot judge (no station/crew free) -> close trial
                        skip = page.locator('dialog#dlg #t-skip')
                        if await skip.count() and await skip.is_enabled(): await skip.click()
                        else: await page.keyboard.press('Escape')
                        ev('trial-abort', st=st)
                    trial_started = None
                await page.wait_for_timeout(600); continue
            # no dialog
            if st['battle']:
                ev('battle-open'); await shot(page, f'{LABEL}-battle.png')
                await page.wait_for_timeout(800); continue
            if not st['court']:
                if opened_court_at is None:
                    await page.click('#hud-open-court'); opened_court_at = time.time(); ev('court-open', wall=round(time.time()-t0,1)); await page.wait_for_timeout(600); continue
            if st['court'] and st['q'] > 0 and not st['paused']:
                # anyone free + station free?
                can = await page.evaluate("() => G.freeCrew().length>0 && G.stations.some(x=>x.def.pow>0 && x.def.k!=='sala' && !x.build && G.stFree(x)>0)")
                if can:
                    btn = page.locator('#hud-trial')
                    if await btn.is_enabled():
                        await btn.click(); await page.wait_for_timeout(700); continue
            if st['court'] and st['q'] == 0 and waiting_since is None: waiting_since = time.time()
            # UI build when affordable
            if st['court'] and st['q'] <= 2 and not st['battle']:
                have = st['stations'].split(',')
                nxt = next((k for k in ['dab','ngiw','lan','lokan','sawan','tea'] if k not in have), None)
                busy_build = await page.evaluate("() => G.stations.some(s=>s.build) || !!(G.crew.find(c=>c.k==='taan')||{}).buildK")
                if nxt and not busy_build and st['coin'] >= BUILD_COST[nxt] + 100 and time.time() - globals().get('last_build_try', 0) > 20:
                    globals()['last_build_try'] = time.time()
                    await ui_build(page, nxt); continue
            # mobs: walk to them and press the on-canvas fight button
            if st['mobs'] and st['hp'] >= 45 and not st['battle']:
                gd = await page.evaluate("() => !!G.guard")
                if not gd:
                    fab = page.locator('.mobfab, #fab-atk:visible, [data-mobfab]')
                    if await fab.count() and await fab.first.is_visible():
                        try: await fab.first.click(timeout=1500); ev('mob-fab-click'); await page.wait_for_timeout(800); continue
                        except Exception as e: pass
                    await page.evaluate("() => { const m=G.mobs[0]; if(m && !G.huntMob) G.attack(); }")
            # economy chores (API): food, hire, build (real UI)
            chores = await page.evaluate("""() => { const out=[]; if(G.food<25 && G.coin>=60){ G.buy('food',2); out.push('food'); }
               if(G.queue.length>=3 && G.freeCrew().filter(c=>!c.self).length===0){ for(const k of ['dam','plerng','kan','boon']){ if(!G.crew.some(c=>c.k===k)){ const d={dam:120,plerng:180,kan:260,boon:300}[k]; if(G.coin>=d+80){ if(G.hire(k)) out.push('hire:'+k); } break; } } }
               return out; }""")
            for c in chores: ev('chore', what=c)
            if time.time() - last_shot > 75:
                last_shot = time.time(); await shot(page, f'{LABEL}-t{int(time.time()-t0):04d}.png')
            if time.time() - last_state > 15:
                last_state = time.time(); ev('state', **{k:v for k,v in st.items() if k!='dlg'})
            await page.wait_for_timeout(500)
        st = await state(page)
        ev('end', **{k:v for k,v in st.items() if k!='dlg'}, waits=[round(w,1) for w in wait_log], errors=logs[:20])
        await shot(page, f'{LABEL}-99-end.png')
        json.dump(events, open(OUT + f'../{LABEL}-events.json', 'w'), ensure_ascii=False, indent=1)
        await b.close()
asyncio.run(main())
