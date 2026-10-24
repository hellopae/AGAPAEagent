
// Memory-only early-game QA. No saved player data is written.
const ndcQa=document.createElement('div');ndcQa.id='ndc-qa';ndcQa.style='position:fixed;top:0;left:0;z-index:20000;background:#171018;color:white;font:12px monospace;padding:5px;max-width:100%;box-sizing:border-box';ndcQa.innerHTML='<button id="ndc-start">Opening scenario</button> <button id="ndc-pickup">Nira pickup</button> <button id="ndc-lead">Nira leading</button> <button id="ndc-finish">Finish delivery</button> <button id="ndc-hide">Hide QA</button><span id="ndc-state"></span>';document.body.append(ndcQa);
let ndcErrors=[];addEventListener('error',e=>ndcErrors.push(e.message));
const ndcStart=()=>{
 g.save=()=>true;g.restore(createGame().snapshot());g.save=()=>true;g.queue=g.queue.slice(0,1);g.courtArrivals=[];g.afterlifeWalks=[];g.transits=[];g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=null;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.courtClosed=true;g.mapTravel=null;
 g.startCourtArrival(g.queue[0]);Object.assign(g.player,g.harbourPoint(),{path:null,tx:null,ty:null});startPlay(false);if(dlg.open)dlg.close();g.paused=false;userPaused=false;document.getElementById('enter-gate')?.remove();cameraZone='th';MAP_ZOOM_LEVELS=townZoomLevels('th');mapCam.init=false;setMapZoom(1);refresh();
};
document.getElementById('ndc-start').onclick=ndcStart;
document.getElementById('ndc-pickup').onclick=()=>{g.advanceCourtArrivals(3600);const w=g.afterlifeWalks.find(w=>w.destination==='arrival');if(w){g.advanceAfterlife(Math.max(1,w.delay*.85-w.elapsed));}g.paused=true;};
document.getElementById('ndc-lead').onclick=()=>{g.paused=false;const w=g.afterlifeWalks.find(w=>w.destination==='arrival');if(w)g.advanceAfterlife(Math.max(1,w.delay+(w.duration-w.delay)*.2-w.elapsed));g.paused=true;};
document.getElementById('ndc-finish').onclick=()=>{g.paused=false;const w=g.afterlifeWalks.find(w=>w.destination==='arrival');if(w)g.advanceAfterlife(w.duration);};
document.getElementById('ndc-hide').onclick=()=>ndcQa.style.display='none';
setInterval(()=>{document.getElementById('ndc-state').textContent=' '+JSON.stringify({crew:g.crew.map(c=>c.k),workers:g.workers().length,zone:g.zone,arrivals:g.courtArrivals.map(a=>a.phase),courier:g.afterlifeWalks.map(w=>w.escort?.k),nira:{x:g.crewOf('nira')?.x,y:g.crewOf('nira')?.y,escort:g.crewOf('nira')?.escort},queue:g.queue.length,errors:ndcErrors});},500);
