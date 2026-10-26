
// Local QA fixture only: saved games are never written, this code is never deployed.
const borderQA=document.createElement('div');borderQA.style='position:fixed;top:0;left:0;z-index:20000;background:#170c12;color:white;font:11px monospace';borderQA.innerHTML='<button id="border-start">Route entry</button><button id="border-stair">Stair fixture</button><button id="border-exit">Exit fixture</button><button id="border-hide">Hide QA</button><span id="border-state"></span>';document.body.append(borderQA);let borderReady=false;const borderErrors=[];addEventListener('error',e=>borderErrors.push(e.message));
async function borderFixture(mode){
 g.save=()=>true;g.restore(createGame().snapshot());g.save=()=>true;g.onChange=()=>{};g.zone='asia';g.coin=100000;g.food=1000;g.bossCleared.asia=true;g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=g.pendingWarn=g.pendingVerdictScene=null;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.over=false;g.mobs=[];g.battle=null;g.queue=[];
 const z=await import('./zone-travel.js');z.initializeZoneTravel(g);z.beginDungeon(g,'west');
 const a=g.zoneTravel.active;a.checkpoint=mode==='exit'?3:mode==='stair'?1:0;a.cleared=Array.from({length:a.checkpoint},(_,i)=>`asia:west:${i}`);a.defeated=[...a.cleared];a.patrolDefeated=z.dungeonPatrols('asia:west').map(p=>p.id);
 const v=await import('./dungeon-view.js');const p=mode==='exit'?v.dungeonPoint(1,'asia:west'):mode==='stair'?[.44,.446]:v.dungeonPoint(0,'asia:west');a.position={x:p[0],y:p[1]};
 startPlay(false);if(dlg.open)dlg.close();userPaused=true;g.paused=true;openDungeon();borderReady=true;
}
for(const mode of ['start','stair','exit'])borderQA.querySelector('#border-'+mode).onclick=()=>borderFixture(mode==='start'?'entry':mode);
borderQA.querySelector('#border-hide').onclick=()=>borderQA.style.display='none';
setInterval(()=>{const parent=dlg.open?dlg:document.body;if(borderQA.parentElement!==parent)parent.append(borderQA);if(!borderReady)return;const v={route:g.zoneTravel.active?.route,position:g.zoneTravel.active?.position,checkpoint:g.zoneTravel.active?.checkpoint,cleared:g.zoneTravel.active?.cleared,coin:g.coin,food:g.food,errors:borderErrors};borderQA.querySelector('#border-state').textContent=JSON.stringify(v);fetch('/__qa',{method:'POST',body:JSON.stringify(v)});},500);
