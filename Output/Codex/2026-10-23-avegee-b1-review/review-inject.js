// Local QA only. The HTTP server appends this; it is never saved into the game source.
const qa=document.createElement('div');qa.id='b1-review';qa.style='position:fixed;top:0;left:0;z-index:2147483647;background:#111;color:white;padding:6px;font:13px monospace;max-width:100vw';
qa.innerHTML='<button id="qa-normal">B1 normal</button> <button id="qa-reduced">B1 reduced</button> <button id="qa-boss">B1 boss finale</button> <button id="qa-deva">B1 deva interlude</button> <button id="qa-crew">B1 crew</button> <button id="qa-sample">Record next attack</button> <button id="qa-snapshot">Freeze contact</button><pre id="qa-state" style="max-height:120px;overflow:auto;margin:0">Ready</pre>';
document.body.append(qa);new MutationObserver(()=>{if(dlg.open&&qa.parentElement!==dlg)dlg.append(qa);}).observe(dlg,{childList:true});
const qaErrors=[];window.addEventListener('error',e=>(qaErrors.push(e.message),qa.querySelector('#qa-state').textContent=e.message));window.addEventListener('unhandledrejection',e=>qaErrors.push(String(e.reason)));
const realMatch=window.matchMedia.bind(window);let qaReduced=false,qaSamples=[],qaStarted=0,qaRecording=false;
window.matchMedia=query=>query==='(prefers-reduced-motion: reduce)'?{...realMatch(query),matches:qaReduced}:realMatch(query);
function qaStart(reduced,kind){
 qaReduced=reduced;g.save=()=>true;g.taught=TUTOR.map(x=>x.k);g.discoveryQueue=[];g.queueDiscovery=()=>{};g.storyQueue=[];g.pendingReward=null;g.pendingLevel=null;g.pendingZone=null;
 startPlay(false);if(dlg.open)dlg.close();g.battle=null;g.party.members=[];g.guard=null;g.startBattle({id:99,who:'B1 QA target',deserved:4,resist:true});
 g.battle.foes.forEach(f=>{f.hp=f.maxHp=10000;f.atk=[1,1];f.speed=1;});
 if(kind==='boss'){g.battle=null;g.zone='th';g.zoneCases.th=10;g.zoneEvents.th=Object.fromEntries(ZONE_EVENTS.th.filter(e=>e.atCases<10).map(e=>[e.k,'cleared']));g.refreshZoneEvents();g.startZoneEvent('thBorderBoss');g.battle.foes.forEach(f=>{f.hp=1;f.speed=1;});g.battle.prepStarted=true;}
 if(kind==='deva'){g.battle=null;g.zone='asia';g.zoneCases.asia=3;g.zoneEvents.asia={};g.refreshZoneEvents();g.startZoneEvent('asiaPrisonFire');g.battle.foes[0].hp=0;g.battle.foes[1].hp=1;g.battle.foes[2].hp=10000;g.battle.selectedFoeId=g.battle.foes[1].id;g.battle.foes.forEach(f=>f.speed=1);}
 if(kind==='crew'){g.coin=10000;g.level=5;g.hire('taan');g.hire('dam');g.party.members=['taan','dam'];g.crewOf('taan').speed=100;}
 openBattle();dlg.append(qa);qa.querySelector('#qa-sample').click();
 document.getElementById('enter-gate')?.remove();document.querySelector('#qa-state').textContent='Scenario '+(reduced?'reduced':'normal')+'; choose Attack and target in actual UI';
}
qa.querySelector('#qa-crew').onclick=()=>qaStart(false,'crew');
qa.querySelector('#qa-boss').onclick=()=>qaStart(false,'boss');qa.querySelector('#qa-deva').onclick=()=>qaStart(false,'deva');
qa.querySelector('#qa-normal').onclick=()=>qaStart(false);qa.querySelector('#qa-reduced').onclick=()=>qaStart(true);
qa.querySelector('#qa-snapshot').onclick=()=>{window.__qaFreeze=true;};
qa.querySelector('#qa-sample').onclick=()=>{qaSamples=[];qaStarted=performance.now();qaRecording=true;
 const read=()=>{const el=document.querySelector('.battle-dashing')||document.querySelector('.fig.you'),b=g.battle;if(!el||!b)return;
 const r=el.getBoundingClientRect(),phase=el.dataset.dashPhase||'idle';
 qaSamples.push({at:Math.round(performance.now()-qaStarted),x:r.x,y:r.y,phase,hp:b.foes[0].hp,busy:b.commandBusy,turn:g.currentBattleTurn()?.side});
 if(window.__qaFreeze&&phase==='hit'){g.paused=true;userPaused=true;window.__qaFreeze=false;}
 if(qaSamples.some(s=>s.phase!=='idle')&&phase==='idle'&&qaSamples.at(-2)?.phase!=='idle'){
  qaRecording=false;const active=qaSamples.filter(s=>s.phase!=='idle'),hits=active.filter(s=>s.hp<10000),x=active.map(s=>s.x);
  const summary={reduced:qaReduced,phases:[...new Set(active.map(s=>s.phase))],damageOnce:new Set(hits.map(s=>s.hp)).size===1,beforeHitUnchanged:active.filter(s=>['outbound','attack'].includes(s.phase)).every(s=>s.hp===10000),heldTurn:active.every(s=>s.turn==='ally'),motion:Math.round(Math.max(...x)-Math.min(...x)),errors:qaErrors};
  qa.querySelector('#qa-state').textContent=JSON.stringify(summary);fetch('/__qa-results',{method:'POST',body:JSON.stringify({summary,samples:qaSamples})});return;
 }
 if(performance.now()-qaStarted<30000){qa.querySelector('#qa-state').textContent='Recording '+phase+' HP '+b.foes[0].hp;requestAnimationFrame(read);}else qa.querySelector('#qa-state').textContent='Timeout '+JSON.stringify(qaSamples.slice(-2));
 };read();};