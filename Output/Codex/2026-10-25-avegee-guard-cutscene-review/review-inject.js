
// Guard QA: memory-only scenes, no production hooks or saved player progress.
const qa=document.createElement('div');qa.id='guard-qa';qa.style='position:fixed;top:0;left:0;right:0;z-index:20000;padding:5px;background:#140a0e;color:white;font:12px monospace';
qa.innerHTML=['th','asia','west','cyberhell'].map(z=>`<button data-qa-zone="${z}">Guard ${z}</button>`).join('')+' <button id="qa-hide">Hide QA</button> <span id="qa-status"></span>';document.body.append(qa);
let qaErrors=[],qaTrace=[],qaCuts=[],qaPayments=[],qaCutFrames=[],qaSetupAt=0,qaBattle=null,qaBefore=null,qaLastHp=null;addEventListener('error',e=>qaErrors.push(e.message));
async function qaSetup(zone){
 qaErrors=[];
 const {syncSceneZone}=await import('./data.js');
 g.save=()=>true;g.restore(createGame().snapshot());g.save=()=>true;g.zone=zone;syncSceneZone(zone);g.coin=50000;g.level=5;g.hp=g.hpMax;g.mp=g.mpMax;
 g.zoneEvents={};g.bossCleared={};g.stations=[];g.mobs=[];g.party.members=[];g.battle=null;g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=null;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.over=false;g.mapTravel=null;
 if(!g.guard)g.hireGuard();Object.assign(g.guard,{morale:100,hunger:100,helpRemainingMs:0,recoverUntil:0,teaRest:null,speed:100});g.outfit=zone==='cyberhell'?'th':'cyberhell';
 startPlay(false);if(dlg.open)dlg.close();if(pauseDlg.open)pauseDlg.close();g.paused=false;userPaused=false;document.getElementById('enter-gate')?.remove();
 g.startBattle({id:99001,who:'อสูรคู่ซ้อม',sp:1,deserved:4,resist:true,said:[],deeds:[],merits:[]});
 const b=g.battle;for(const f of b.foes){f.hp=f.maxHp=10000;f.atk=[0,0];f.speed=1;}
 g.beginBattleTurns();g.selectBattleActor(g.guard.id);qaBattle=b;qaBefore={zone,outfit:g.outfit,hp:b.foes[0].hp,morale:g.guard.morale,cooldown:g.guard.helpRemainingMs};qaLastHp=b.foes[0].hp;qaSetupAt=performance.now();qaTrace=[];qaCuts=[];qaPayments=[];qaCutFrames=[];openBattle();refresh();
}
qa.querySelectorAll('[data-qa-zone]').forEach(b=>b.onclick=()=>qaSetup(b.dataset.qaZone));qa.querySelector('#qa-hide').onclick=()=>qa.style.display='none';
const seenCuts=new WeakSet();
setInterval(()=>{
 const parent=dlg.open?dlg:document.body;if(qa.parentElement!==parent)parent.append(qa);
 const b=g.battle,cut=dlg.querySelector('.action-cutscene'),image=cut?.querySelector('img');
 if(cut&&!seenCuts.has(cut)){seenCuts.add(cut);qaCuts.push({at:Math.round(performance.now()-qaSetupAt),src:image?.getAttribute('src'),title:cut.textContent,hp:b?.foes?.[0]?.hp,morale:g.guard?.morale});}
 if(b&&b===qaBattle&&b.foes?.[0]&&b.foes[0].hp!==qaLastHp){qaPayments.push({at:Math.round(performance.now()-qaSetupAt),before:qaLastHp,after:b.foes[0].hp,morale:g.guard?.morale,cooldown:g.guard?.helpRemainingMs});qaLastHp=b.foes[0].hp;}
 const current={at:Math.round(performance.now()-qaSetupAt),zone:g.zone,actor:b?.actorId,turn:g.currentBattleTurn()?.id,busy:b?.commandBusy,cut:!!cut,loaded:!!image?.naturalWidth,hp:b?.foes?.[0]?.hp,morale:g.guard?.morale,cooldown:g.guard?.helpRemainingMs};
 if(qaBattle){qaTrace.push(current);if(qaTrace.length>1000)qaTrace.shift();if(current.cut)qaCutFrames.push(current);}
 qa.querySelector('#qa-status').textContent=JSON.stringify({...current,cuts:qaCuts.length,payments:qaPayments.length,errors:qaErrors});
},25);
setInterval(()=>{if(qaBefore)fetch('/__qa-results',{method:'POST',body:JSON.stringify({before:qaBefore,cuts:qaCuts,payments:qaPayments,cutFrames:qaCutFrames,trace:qaTrace,errors:qaErrors})});},1000);
