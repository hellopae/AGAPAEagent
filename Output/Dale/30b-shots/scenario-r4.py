MEASURE = """
async()=>{
 const stage=document.querySelector('.combat-arena');
 const vis=async img=>{
   const r=img.getBoundingClientRect();
   const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
   const x=c.getContext('2d'); x.drawImage(img,0,0); const d=x.getImageData(0,0,c.width,c.height).data;
   let t=c.height,b=-1; for(let y=0;y<c.height;y++) for(let xx=0;xx<c.width;xx+=2){ if(d[(y*c.width+xx)*4+3]>40){ if(y<t)t=y; if(y>b)b=y; } }
   const s=Math.min(r.width/img.naturalWidth, r.height/img.naturalHeight);
   return (b-t+1)*s;
 };
 const hero=await vis(stage.querySelector('.fig.you img:not(.fx)'));
 const crew=[];
 for(const im of stage.querySelectorAll('.battle-squad img')) crew.push({src:im.getAttribute('src').split('/').pop(), ratio:+(await vis(im)/hero).toFixed(2), facing:getComputedStyle(im).transform.startsWith('matrix(-1')?'mirrored':'native'});
 const foes=[...stage.querySelectorAll('.fig.foe img:not(.fx)')].map(im=>({src:im.getAttribute('src').split('/').pop(), facing:getComputedStyle(im).transform.startsWith('matrix(-1')?'mirrored':'native'}));
 return {hero:+hero.toFixed(1), crew, foes};
}
"""
def tryp(f):
    try: return f()
    except Exception as e: return {'error': str(e)[:160]}
def startfight(z):
    boss(z); pg.evaluate("document.querySelector('[data-prep-go]')?.click()"); pg.wait_for_timeout(600)
def main():
    for z in ['asia','west','cyberhell']:
        boss(z); shot(f'1-prep-boss-{z}')
    event('cyberhell','cyberFinal',4,True); shot('1-rest-wave4')
    event('cyberhell','cyberFinal',8,True); shot('1-rest-wave8')
    for z in ['th','asia','west','cyberhell']:
        startfight(z); shot(f'2-fight-{z}')
        m = tryp(lambda: pg.evaluate(MEASURE)); m.update(item='2/3 facing+size', zone=z, vp=W); results.append(m)
        pg.wait_for_timeout(500)
    for z in ['th','asia','west','cyberhell']:
        startfight(z)
        pg.evaluate("document.querySelector('[data-act=\"rage\"]').click()")
        pg.wait_for_timeout(1330)
        info = tryp(lambda: pg.evaluate("""()=>{const you=document.querySelector('.fig.you'); const im=you.querySelector('img:not(.fx)');
          return {heroSrc:im.getAttribute('src'), fxInYou:!!you.querySelector('.fx'), fxInFoe:!!document.querySelector('.fig.foe .fx'), foeStruck:[...document.querySelectorAll('.fig.foe')].some(f=>f.classList.contains('struck')), rageTurns:__t.g.battle.rageTurns}}"""))
        info.update(item='4 rage', zone=z, vp=W); results.append(info)
        pg.screenshot(path=f'{outdir}/{label}-4-rage-{z}-{W}.png')
        pg.wait_for_timeout(4200)
    for z in ['cyberhell','th']:
        startfight(z)
        pg.evaluate("__t.g.mp=6.4219999999995; __t.g.mpMax=72; __t.refresh(); __t.g.onChange()"); pg.wait_for_timeout(500)
        r = tryp(lambda: pg.evaluate("""()=>{const m=document.querySelector('.battle-meter.mana'); return {meterW:m&&Math.round(m.getBoundingClientRect().width), txt:[...document.querySelectorAll('.battle-numbered-meter small')].map(e=>e.textContent)}}"""))
        r.update(item='5 mp', zone=z, vp=W); results.append(r)
        pg.screenshot(path=f'{outdir}/{label}-5-mp-{z}-{W}.png', clip={'x':100,'y':H-250,'width':520,'height':200})
    event('cyberhell','cyberFinal',8,False)
    pg.evaluate("document.querySelector('[data-prep-go]')?.click()"); pg.wait_for_timeout(300)
    pg.evaluate("(()=>{const b=__t.g.battle; b.foes.slice(1).forEach(f=>f.hp=0); b.foes[0].hp=1; b.selectedFoeId=b.foes[0].id;})()")
    pg.evaluate("document.querySelector('[data-act=\"atk\"]').click()"); pg.wait_for_timeout(2600)
    info = tryp(lambda: pg.evaluate("""()=>{const f=document.querySelector('[data-fin]'); const r=f.getBoundingClientRect(); const d=document.querySelector('#dlg').getBoundingClientRect();
      return {text:f.textContent.trim(), btnCx:Math.round(r.left+r.width/2), btnCy:Math.round(r.top+r.height/2), dlgCx:Math.round(d.left+d.width/2), dlgCy:Math.round(d.top+d.height/2)}}"""))
    info.update(item='6 reward button wave8', vp=W); results.append(info); shot('6-wave8-win')
    reset('west')
    pg.evaluate("__t.g.startDadFight(); __t.openBattle(()=>{});"); pg.wait_for_timeout(800)
    pg.evaluate("document.querySelector('[data-act=\"atk\"]').click()"); pg.wait_for_timeout(1800)
    info = tryp(lambda: pg.evaluate("({text:document.querySelector('[data-fin]')?.textContent.trim(), hudImg:document.querySelector('.battle-boss-hud img')?.getAttribute('src')})"))
    info.update(item='7 lose button + zone3 ruler profile', vp=W); results.append(info); shot('7-dad-lose-west')
    pg.wait_for_timeout(2500); reset('cyberhell'); pg.wait_for_timeout(800)
    pg.evaluate("(()=>{const g=__t.g; g.inventory.spareHeart=1; g.pendingReward={coin:200, exp:10, abilities:[], items:[{k:'spareHeart',n:1},{k:'health',n:1}]}; g.onChange();})()")
    pg.wait_for_timeout(900)
    r = tryp(lambda: pg.evaluate("[...document.querySelectorAll('.reward-row img')].map(i=>i.getAttribute('src').slice(0,30))"))
    results.append({'item':'8 heart icon','icons':r,'vp':W}); shot('8-reward-heart')
    pg.evaluate("(()=>{const d=document.querySelector('#dlg'); if(d.open) d.close(); __t.g.pendingReward=null;})()"); pg.wait_for_timeout(300)
    startfight('west')
    pg.evaluate("__t.g.battle.youHp=40; __t.refresh();")
    pg.evaluate("document.querySelector('[data-act=\"crew:boon\"]').click()"); pg.wait_for_timeout(1550)
    r = tryp(lambda: pg.evaluate("({healing:!!document.querySelector('.fig.you.healing'), num:document.querySelector('.fig.you .heal-num')?.textContent||null})"))
    r.update(item='9 boon glow', vp=W); results.append(r)
    pg.screenshot(path=f'{outdir}/{label}-9-boon-glow-west-{W}.png'); pg.wait_for_timeout(4000)
    for z,k in [('west','guard'),('cyberhell','crew:plerng'),('asia','crew:kan')]:
        startfight(z)
        pg.evaluate("(k)=>{__t.playActionCutscene(k)}", k); pg.wait_for_timeout(650)
        r = tryp(lambda: pg.evaluate("(()=>{const c=document.querySelector('.action-cutscene'); const i=c.querySelector('img'); const a=c.getBoundingClientRect(), b=i.getBoundingClientRect(); return {cut:[Math.round(a.width),Math.round(a.height)], img:[Math.round(b.width),Math.round(b.height)], img_covers_frame: b.width>=a.width-3 && b.height>=a.height-3, imgTransform:getComputedStyle(i).transform}})()"))
        r.update(item='10 crew cutscene', zone=z, k=k, vp=W); results.append(r)
        pg.screenshot(path=f'{outdir}/{label}-10-cut-{z}-{k.replace(":","_")}-{W}.png'); pg.wait_for_timeout(900)

_main_orig = main
def main():
    # extras first: pause in prep + in battle
    boss('west')
    pg.evaluate("document.querySelector('[data-prep-pause]')?.click()"); pg.wait_for_timeout(500)
    r = tryp(lambda: pg.evaluate("({pauseOpen:!!document.querySelector('#pause-dlg')?.open, paused:__t.g.paused})"))
    r.update(item='pause in prep', vp=W); results.append(r); shot('pause-prep')
    pg.evaluate("document.querySelector('#pause-dlg')?.dispatchEvent(new Event('cancel',{cancelable:true}))"); pg.wait_for_timeout(500)
    r = tryp(lambda: pg.evaluate("({pauseOpen:!!document.querySelector('#pause-dlg')?.open, prepStillOpen:!!document.querySelector('[data-prep-go]'), paused:__t.g.paused})"))
    r.update(item='pause closed -> prep still there', vp=W); results.append(r)
    pg.evaluate("document.querySelector('[data-prep-go]')?.click()"); pg.wait_for_timeout(700)
    pg.evaluate("document.querySelector('[data-battle-pause]')?.click()"); pg.wait_for_timeout(500)
    r = tryp(lambda: pg.evaluate("({pauseOpen:!!document.querySelector('#pause-dlg')?.open, battleOpen:!!document.querySelector('.combat-arena')})"))
    r.update(item='pause in battle', vp=W); results.append(r); shot('pause-battle')
    pg.evaluate("document.querySelector('#pause-dlg')?.dispatchEvent(new Event('cancel',{cancelable:true}))"); pg.wait_for_timeout(500)
    r = tryp(lambda: pg.evaluate("({pauseOpen:!!document.querySelector('#pause-dlg')?.open, battleOpen:!!document.querySelector('.combat-arena'), act:!!document.querySelector('[data-act=atk]')})"))
    r.update(item='pause closed -> battle intact', vp=W); results.append(r)
    pg.wait_for_timeout(500)
    # prep window: 3 slots clickable
    for z in ['asia','west']:
        boss(z)
        pg.evaluate("(()=>{const g=__t.g; g.hp=Math.max(1,g.hpMax-40); g.mp=Math.max(0,g.mpMax-30); g.onChange(); __t.refresh();})()"); pg.wait_for_timeout(300)
        st = tryp(lambda: pg.evaluate("({hp:__t.g.hp,hpMax:__t.g.hpMax,mp:__t.g.mp,health:__t.g.inventory.health,hw:__t.g.inventory.holyWater, layerVisible:!document.querySelector('[data-prep-layer]')?.hidden, cards:[...document.querySelectorAll('[data-event-prep],[data-prep-med],[data-prep-water]')].map(e=>({k:e.getAttribute('data-event-prep')||Object.keys(e.dataset)[0], dis:e.disabled, w:Math.round(e.getBoundingClientRect().width), h:Math.round(e.getBoundingClientRect().height)}))})"))
        st.update(item='prep state', zone=z, vp=W); results.append(st); shot(f'prep-{z}')
        for sel in ['[data-event-prep=merchant]','[data-event-prep=nira]']:
            pg.evaluate("(s)=>document.querySelector(s).click()", sel); pg.wait_for_timeout(800)
            r = tryp(lambda: pg.evaluate("({dlgOpen:document.querySelector('#dlg').open, h2:document.querySelector('#dlg h2')?.textContent?.slice(0,40)})"))
            r.update(item='click '+sel, zone=z, vp=W); results.append(r); shot(f'prep-click-{sel[18:-1]}-{z}')
            pg.evaluate("(()=>{const d=document.querySelector('#dlg'); if(d.open) d.close();})()"); pg.wait_for_timeout(900)
            r = tryp(lambda: pg.evaluate("({prepGo:!!document.querySelector('[data-prep-go]'), layerVisible:!document.querySelector('[data-prep-layer]')?.hidden, battle:!!__t.g.battle})"))
            r.update(item='after close '+sel, zone=z, vp=W); results.append(r)
        for sel in ['[data-prep-med]','[data-prep-water]']:
            b4 = pg.evaluate("({hp:__t.g.hp,mp:__t.g.mp,health:__t.g.inventory.health,hw:__t.g.inventory.holyWater})")
            pg.evaluate("(s)=>document.querySelector(s)?.click()", sel); pg.wait_for_timeout(600)
            af = pg.evaluate("({hp:__t.g.hp,mp:__t.g.mp,health:__t.g.inventory.health,hw:__t.g.inventory.holyWater, chips:[...document.querySelectorAll('.prep-chips button')].map(e=>e.textContent.trim())})")
            results.append({'item':'click '+sel,'zone':z,'vp':W,'before':b4,'after':af})
        shot(f'prep-after-items-{z}')
    _main_orig()
