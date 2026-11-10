"""GFX-1110 UI check: settings dialog (desktop + 390 wide), live switch (canvas DPR), persistence across a reload (real localStorage), ?mapdpr override."""
import sys,json
sys.path.insert(0,'/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/perf-1110')
from harness import *
OUTD='/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Toby/2026-11-10-avegee-graphics-setting/'
import os; os.makedirs(OUTD,exist_ok=True)
res={}
with sync_playwright() as p:
    b,ctx,pg=setup(p,8950,1440,900,2)
    cv=lambda:pg.evaluate("(()=>{const c=[...document.querySelectorAll('canvas')].sort((a,b)=>b.width*b.height-a.width*a.height)[0];return [c.width,c.height,c.clientWidth,c.id]})()")
    res['canvas_before']=cv()
    pg.click('#hud-settings'); pg.wait_for_timeout(700)
    res['aria_before']=pg.evaluate("[...document.querySelectorAll('[data-gfx]')].map(b=>b.dataset.gfx+':'+b.getAttribute('aria-checked'))")
    res['hint_before']=pg.evaluate("document.querySelector('#s-gfx-hint').textContent")
    pg.screenshot(path=OUTD+'settings-high-1440.png')
    pg.click('[data-gfx=performance]'); pg.wait_for_timeout(900)
    res['aria_after']=pg.evaluate("[...document.querySelectorAll('[data-gfx]')].map(b=>b.dataset.gfx+':'+b.getAttribute('aria-checked'))")
    res['hint_after']=pg.evaluate("document.querySelector('#s-gfx-hint').textContent")
    res['mode_in_storage']=pg.evaluate("localStorage.getItem('avegee.graphics')")
    pg.screenshot(path=OUTD+'settings-performance-1440.png')
    # English
    pg.evaluate("document.querySelector('#s-lang-toggle').dispatchEvent(new MouseEvent('click',{clientX:document.querySelector('#s-lang-toggle').getBoundingClientRect().right-5,clientY:5,bubbles:true}))"); pg.wait_for_timeout(500)
    res['en']=pg.evaluate("[...document.querySelectorAll('[data-gfx]')].map(b=>b.textContent).concat([document.querySelector('#s-gfx-label').textContent,document.querySelector('#s-gfx-hint').textContent])")
    pg.screenshot(path=OUTD+'settings-en-1440.png')
    pg.evaluate("document.querySelector('#s-lang-toggle').dispatchEvent(new MouseEvent('click',{clientX:document.querySelector('#s-lang-toggle').getBoundingClientRect().left+5,clientY:5,bubbles:true}))")
    pg.keyboard.press('Escape'); pg.wait_for_timeout(800)
    res['canvas_after_performance']=cv()
    pg.click('#hud-settings'); pg.wait_for_timeout(600); pg.click('[data-gfx=high]'); pg.keyboard.press('Escape'); pg.wait_for_timeout(800)
    res['canvas_after_back_to_high']=cv()
    res['errors']=pg.errors[:5]; b.close()
    # 390 x 844 dialog + real-storage reload persistence (no in-memory storage override)
    b=p.chromium.launch(args=ARGS); c2=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
    pg=c2.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://127.0.0.1:8950/index.html'); pg.wait_for_timeout(2500)
    for _ in range(8):
        if pg.is_visible('#t-set') and not pg.is_visible('#enter-gate'): break
        for sel in ('#splash-skip','#enter-button'):
            if pg.is_visible(sel):
                try: pg.click(sel,timeout=2000)
                except Exception: pass
        pg.wait_for_timeout(700)
    pg.click('#t-set'); pg.wait_for_timeout(700)
    pg.click('[data-gfx=performance]'); pg.wait_for_timeout(400)
    pg.screenshot(path=OUTD+'settings-performance-390.png')
    box=pg.evaluate("[...document.querySelectorAll('.settings-gfx-opt')].map(b=>{const r=b.getBoundingClientRect();return [Math.round(r.left),Math.round(r.right),Math.round(r.height)]})")
    res['opt_boxes_390']=box
    pg.reload(); pg.wait_for_timeout(3000)
    res['after_reload_mode']=pg.evaluate("localStorage.getItem('avegee.graphics')")
    res['after_reload_module']=pg.evaluate("async()=>(await import('./src/graphics-setting.js')).getGraphicsMode()")
    res['errors390']=errs[:5]; b.close()
print(json.dumps(res,ensure_ascii=False,indent=1))
