// Local browser QA only; never saved into the game repository.
const qa=document.createElement('div');qa.id='z3-qa';qa.style='position:fixed;top:0;left:0;z-index:2147483647;background:#111;color:white;padding:5px;font:12px monospace';qa.innerHTML='<button id="z3-start">Z3 map review</button> <button id="z3-overview">Z3 overview</button><span id="z3-state"> Ready</span>';document.body.append(qa);
const qaErrors=[];addEventListener('error',e=>{qaErrors.push(e.message);qa.querySelector('#z3-state').textContent=qaErrors.join(';');});
qa.querySelector('#z3-start').onclick=async()=>{
 const {syncSceneZone}=await import('./data.js');
 g.save=()=>true;g.zone='west';g.taught=TUTOR.map(x=>x.k);g.discoveryQueue=[];g.discover=()=>{};g.storyQueue=[];g.pendingReward=null;g.pendingLevel=null;g.pendingZone=null;g.battle=null;
 syncSceneZone('west');g.stations=STATIONS.map(def=>({def,slots:[],build:0,fire:0,intensity:3}));g.syncBlocks(true);g.player.x=1920;g.player.y=1200;g.player.path=[];startPlay(false);if(dlg.open)dlg.close();g.paused=false;userPaused=false;document.getElementById('enter-gate')?.remove();cameraZone='west';MAP_ZOOM_LEVELS=townZoomLevels('west');mapCam.init=false;setMapZoom(0);refresh();qa.querySelector('#z3-state').textContent=' West sprites + owner mask / overview / errors: '+qaErrors.length;
};qa.querySelector('#z3-overview').onclick=()=>{setMapZoom(0);};

const z3close=document.createElement('button');z3close.textContent='Close QA overlay';z3close.onclick=()=>qa.remove();qa.append(z3close);
