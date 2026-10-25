
// External A4 fixture: no saves or production QA controls. Real delivery completion and native map.
const spacingQA=document.createElement('div');spacingQA.id='spacing-qa';spacingQA.style='position:fixed;top:0;left:0;z-index:20000;background:#170c12;color:white;font:12px monospace';
spacingQA.innerHTML=['th','asia','west','cyberhell'].map(z=>`<button data-spacing-zone="${z}">Arrival ${z}</button>`).join('')+'<button id="spacing-hide">Hide QA</button><span id="spacing-status"></span>';document.body.append(spacingQA);
let spacingErrors=[];addEventListener('error',e=>spacingErrors.push(e.message));
async function spacingSetup(zone){try{
 const {harbourTravel}=await import('../tests/helpers/travel.mjs');const {canWalk}=await import('./walk.js?v=k1d');
 g.save=()=>true;g.onChange=()=>{};g.restore(createGame().snapshot());g.save=()=>true;g.onChange=()=>{};g.coin=100000;g.food=1000;g.level=5;g.bossCleared={th:true,asia:true,west:true};
 for(const [z,events] of Object.entries(ZONE_EVENTS))g.zoneEvents[z]=Object.fromEntries(events.map(e=>[e.k,'cleared']));
 if(zone!=='th')harbourTravel(g,zone);
 g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=null;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.over=false;g.mapTravel=null;g.mobs=[];g.party.members=[];g.battle=null;
 await preloadZone(zone,g.outfit||zone);g.queue=[];g.courtArrivals=[];g.afterlifeWalks=[];g.courtClosed=true;g.paused=false;g.syncBlocks(true);
 const w=g.hireWorker();if(!w)throw Error('hire failed');
 const soul={id:988001,name:'วิญญาณนำส่ง',who:'ชายวัยกลางคน',sex:'m',sp:7,deeds:[],merits:[],said:[],courtDisembarked:true};g.queue=[soul];
 const dock=g.harbourPoint();if(!g.startAfterlifeWalk(soul,[dock.x,dock.y],QUEUE_LINE[0],'arrival'))throw Error('start failed');
 const walk=g.afterlifeWalks.find(a=>a.soul.id===soul.id);if(!walk?.escort?.workerId)throw Error('worker did not accept');
 g.advanceAfterlife(walk.duration);
 startPlay(false);if(dlg.open)dlg.close();if(pauseDlg.open)pauseDlg.close();userPaused=false;document.getElementById('enter-gate')?.remove();g.paused=true;
 g.player.x=QUEUE_LINE[0][0];g.player.y=QUEUE_LINE[0][1]+35;g.player.path=[];cameraZone=g.zone;MAP_ZOOM_LEVELS=townZoomLevels(g.zone);mapCam.init=false;setMapZoom(Math.min(3,MAP_ZOOM_LEVELS.length-1));refresh();
 const result={zone,worker:[w.x,w.y],soul:QUEUE_LINE[0],gap:Math.hypot(w.x-QUEUE_LINE[0][0],w.y-QUEUE_LINE[0][1]),walkable:canWalk(w.x,w.y),job:w.job,ledger:g.workerState.ledger.escortsDone,queue:g.queue.map(s=>s.id),formation:walk.escort?.formation||'legacy',errors:spacingErrors};
 spacingQA.querySelector('#spacing-status').textContent=JSON.stringify(result);fetch('/__qa-results',{method:'POST',body:JSON.stringify(result)});
 }catch(e){spacingQA.querySelector('#spacing-status').textContent='ERROR '+e.stack;}}
spacingQA.querySelectorAll('[data-spacing-zone]').forEach(b=>b.onclick=()=>spacingSetup(b.dataset.spacingZone));spacingQA.querySelector('#spacing-hide').onclick=()=>spacingQA.style.display='none';
