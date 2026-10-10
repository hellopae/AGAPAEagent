from lib import *
import sys, json
w,h=int(sys.argv[1]),int(sys.argv[2]); tag=sys.argv[3]
EV='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/evidence/2026-10-10-i1b/'
ST="""()=>{const a=JSON.parse(localStorage.getItem('avegee.audio')||'{}'); const m=document.querySelector('#mute'); 
 return {saved:a, quickSrc:m&&m.querySelector('img').getAttribute('src'), quickText:m&&m.textContent.trim(), pressed:m&&m.getAttribute('aria-pressed'), sMute:!!document.querySelector('#s-mute'),
 setBgm:document.querySelector('#s-bgm-toggle img')?.getAttribute('src'), setSfx:document.querySelector('#s-sfx-toggle img')?.getAttribute('src')}}"""
with sync_playwright() as p:
    b,pg,logs=boot(p,w,h,mobile=(w<700 or h<500))
    dismiss_all(pg)
    # 1) settings page (default on)
    pg.evaluate("document.querySelector('#hud-settings').click()"); pg.wait_for_timeout(500)
    print('settings default', json.dumps(pg.evaluate(ST)))
    pg.screenshot(path=EV+f'5-settings-default-{tag}.png')
    # toggle music + sfx icons
    pg.evaluate("document.querySelector('#s-bgm-toggle').click()"); pg.wait_for_timeout(200)
    print('after music off', json.dumps(pg.evaluate(ST)))
    pg.evaluate("document.querySelector('#s-sfx-toggle').click()"); pg.wait_for_timeout(300)
    print('after sfx off ', json.dumps(pg.evaluate(ST)))
    pg.screenshot(path=EV+f'5-settings-both-off-{tag}.png')
    pg.evaluate("document.querySelector('.settings-close').click()"); pg.wait_for_timeout(300)
    # 2) quick mute in legacy drawer
    pg.evaluate("document.querySelector('#hud-pause').click()"); pg.wait_for_timeout(500)
    pg.evaluate("document.querySelector('#pause-more').click()"); pg.wait_for_timeout(500)
    print('drawer (muted via settings)', json.dumps(pg.evaluate(ST)))
    pg.screenshot(path=EV+f'5-quick-mute-OFF-{tag}.png')
    pg.evaluate("document.querySelector('#mute').click()"); pg.wait_for_timeout(300)
    print('drawer after quick-unmute ', json.dumps(pg.evaluate(ST)))
    pg.screenshot(path=EV+f'5-quick-mute-ON-{tag}.png')
    pg.evaluate("document.querySelector('#mute').click()"); pg.wait_for_timeout(300)
    print('drawer after quick-mute   ', json.dumps(pg.evaluate(ST)))
    # reload persistence
    pg.evaluate("document.querySelector('#legacy-drawer-close').click()")
    pg.reload(); pg.wait_for_function("window.G && document.documentElement.dataset.bootReady==='true'", timeout=60000); pg.wait_for_timeout(1500)
    print('after reload', json.dumps(pg.evaluate("()=>{const a=JSON.parse(localStorage.getItem('avegee.audio')||'{}');return a}")))
    # legacy migration: on=false
    pg.evaluate("localStorage.setItem('avegee.audio', JSON.stringify({on:false,sfx:.5,bgm:.2}))")
    pg.reload(); pg.wait_for_function("window.G && document.documentElement.dataset.bootReady==='true'", timeout=60000); pg.wait_for_timeout(1500)
    print('migrated old on=false save', json.dumps(pg.evaluate("()=>({saved:JSON.parse(localStorage.getItem('avegee.audio')), quick:document.querySelector('#mute img').getAttribute('src')})")))
    b.close()
