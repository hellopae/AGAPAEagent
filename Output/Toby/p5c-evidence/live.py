import sys
from playwright.sync_api import sync_playwright
URL='http://127.0.0.1:%s/index.html'
def go(port,vw,vh,tag):
    with sync_playwright() as p:
        b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        mob=vw<500
        ctx=b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2 if mob else 1,has_touch=mob,is_mobile=mob)
        pg=ctx.new_page();errs=[]
        pg.on('console',lambda m: errs.append(m.text[:160]) if m.type=='error' else None)
        pg.on('pageerror',lambda e: errs.append('PAGEERR '+str(e)[:200]))
        pg.goto(URL%port);pg.wait_for_selector('#enter-button',state='attached',timeout=90000);pg.wait_for_timeout(6000)
        J=pg.evaluate
        J("document.querySelector('#enter-button').click()");pg.wait_for_timeout(1500)
        J("document.querySelector('#t-new').click()");pg.wait_for_timeout(2500)
        J("document.querySelector('#intro-skip').click()");pg.wait_for_timeout(2000)
        J("[...document.querySelectorAll('button')].filter(b=>b.offsetParent&&b.textContent.trim()==='รับทราบ').forEach(b=>b.click())");pg.wait_for_timeout(800)
        for _ in range(8):
            r0=J("(()=>{const d=document.getElementById('dlg');if(!d||!d.open)return 0;const bs=[...d.querySelectorAll('button')].filter(b=>b.offsetParent&&!b.disabled);const pick=bs.find(b=>/รับทราบ|เข้าใจแล้ว|ตกลง|ปิด|ต่อไป/.test(b.textContent))||bs[bs.length-1];if(pick){pick.click();return 1}return 2})()")
            pg.wait_for_timeout(500)
            if r0==0:break
        r=J("""(async()=>{const m=await import('./src/workers.js');G.coin=99999;const out=[];
          for(let i=0;i<4;i++){const w=m.hireWorker(G);out.push(!!w);}
          const ws=m.zoneWorkers(G);ws[0].mode='gather';ws[1].mode='escort';ws[2].mode='build';ws[3].mode='gather';
          return [out,ws.length,G.zone,JSON.stringify(G.player&&[G.player.x,G.player.y]),JSON.stringify(ws.map(w=>[w.x|0,w.y|0]))]})()""")
        print(tag,r)
        pg.wait_for_timeout(2500)
        for i in range(3):
            pg.screenshot(path=f'/tmp/p5c/live-{tag}-{i}.png');pg.wait_for_timeout(4000)
        print(tag,'errors',[e for e in errs if 'sound' not in e.lower() and 'getImageData' not in e][:6])
        b.close()
go(sys.argv[1],390,844,'390x844'+sys.argv[2])
go(sys.argv[1],1280,720,'1280x720'+sys.argv[2])
