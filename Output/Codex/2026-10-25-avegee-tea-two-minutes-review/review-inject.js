
// External memory-only A2 visual fixture. Real room renderer and real rest requests.
const qa=document.createElement('div');qa.id='tea-qa';qa.style='position:fixed;top:0;left:0;z-index:20000;background:#170c12;color:white;font:12px monospace';
qa.innerHTML=['th','asia','west','cyberhell'].map(z=>`<button data-qa-zone="${z}">Tea ${z}</button>`).join('')+'<button id="qa-hide">Hide QA</button><span id="qa-status"></span>';document.body.append(qa);
let qaErrors=[],qaTrace=[],qaZone=null,qaRequests=[],qaStart=0,qaHistory=[],qaLastCount=-1;addEventListener('error',e=>qaErrors.push(e.message));
async function qaSetup(zone){
 const {harbourTravel}=await import('../tests/helpers/travel.mjs');
 g.save=()=>true;g.onChange=()=>{};g.restore(createGame().snapshot());g.save=()=>true;g.coin=100000;g.level=5;g.bossCleared={th:true,asia:true,west:true};g.zoneEvents.th={frontierBreach:'cleared'};
 if(zone!=='th')harbourTravel(g,zone);g.stations=[];g.mobs=[];g.party.members=[];g.battle=null;g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=null;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.over=false;g.mapTravel=null;
 g.hireGuard();for(const k of ['taan','plerng','boon','dam','kan'])if(!g.crewOf(k))g.hire(k);
 g.stations.push({def:STATIONS.find(d=>d.k==='tea'),build:0,repair:0,slots:[],fire:0});g.syncBlocks();
 const workers=Array.from({length:6},()=>g.hireWorker());const actors=[...g.crew.filter(c=>!c.reader&&!c.self),g.guard];const now=Date.now();qaRequests=[];
 for(const c of actors){c.morale=30;c.hunger=10;qaRequests.push({id:c.id,ok:g.restActor(c.id,now)});}
 for(const w of workers.filter(Boolean)){w.morale=30;w.hunger=0;w.stamina=10;w.mode='gather';qaRequests.push({id:w.id,ok:g.restWorkerAtTea(w.id)});}
 // Arrival-only visual fixture: requests above use real route validation. Clear remaining path to show room now.
 for(const c of [...actors,...workers].filter(Boolean))if(c.teaRest){c.teaRest.path=[];c.teaRest.movedAt=now;}
 g.updateActorRecovery(now);qaStart=Date.now();qaErrors=[];qaTrace=[];qaHistory=[];qaLastCount=-1;qaZone=zone;
 startPlay(false);if(dlg.open)dlg.close();if(pauseDlg.open)pauseDlg.close();g.paused=false;userPaused=false;document.getElementById('enter-gate')?.remove();openStation('tea');refresh();
}
qa.querySelectorAll('[data-qa-zone]').forEach(b=>b.onclick=()=>qaSetup(b.dataset.qaZone));qa.querySelector('#qa-hide').onclick=()=>qa.style.display='none';
setInterval(()=>{
 const parent=dlg.open?dlg:document.body;if(qa.parentElement!==parent)parent.append(qa);
 if(!qaZone)return;const staff=[...Object.values(g.roster),...g.workerState.workers].filter(c=>!c.reader&&!c.self&&(c.homeZone===qaZone));
 const frame={at:Date.now()-qaStart,staff:staff.map(c=>({id:c.id,phase:c.teaRest?.phase,seat:c.teaRest?.seat,until:c.teaRest?.until,x:c.x,y:c.y,morale:c.morale,hunger:c.hunger,mode:c.mode}))};qaTrace.push(frame);if(qaTrace.length>600)qaTrace.shift();
 const count=frame.staff.filter(c=>c.phase==='rest').length;if(count!==qaLastCount){qaHistory.push(frame);qaLastCount=count;}
 qa.querySelector('#qa-status').textContent=JSON.stringify({zone:qaZone,at:frame.at,resting:frame.staff.filter(c=>c.phase==='rest').length,errors:qaErrors});
 fetch('/__qa-results',{method:'POST',body:JSON.stringify({zone:qaZone,requests:qaRequests,history:qaHistory,trace:qaTrace,errors:qaErrors})});
},500);
