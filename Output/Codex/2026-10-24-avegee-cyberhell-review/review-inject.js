// Local browser QA only; never saved into the game repository.
const qa=document.createElement('div');qa.id='z4-qa';qa.style='position:fixed;top:0;left:0;z-index:2147483647;background:#111;color:white;padding:5px;font:12px monospace';qa.innerHTML='<button id="z4-start">Z4 map review</button> <button id="z4-overview">Z4 overview</button><span id="z4-state"> Ready</span>';document.body.append(qa);
const qaErrors=[];addEventListener('error',e=>{qaErrors.push(e.message);qa.querySelector('#z4-state').textContent=qaErrors.join(';');});
qa.querySelector('#z4-start').onclick=async()=>{
 const {syncSceneZone}=await import('./data.js');
 const {enableTownSkin}=await import('./zone-skin.js');
 enableTownSkin('cyberhell',{use:['judgment','houses','trees','lamp','torch','rock'],stations:{suffix:'cyberhell',facade:{sala:'img/map-v5/st-sala-cyberhell-v2.webp',tea:'img/theme-v4/st-tea-cyberhell-v2.webp',sawan:'img/map-v5/st-sawan-cyberhell-v2.webp',krajok:'img/map-v5/st-krajok-cyberhell-v2.webp'},facadeSizes:{sala:[280,330],tea:[260,270],sawan:[260,300],krajok:[280,340]}}});
 g.save=()=>true;g.zone='cyberhell';g.taught=TUTOR.map(x=>x.k);g.discoveryQueue=[];g.discover=()=>{};g.storyQueue=[];g.pendingReward=null;g.pendingLevel=null;g.pendingZone=null;g.battle=null;
 syncSceneZone('cyberhell');g.stations=STATIONS.map(def=>({def,slots:[],build:0,fire:0,intensity:3}));g.syncBlocks(true);g.player.x=1920;g.player.y=1200;g.player.path=[];startPlay(false);if(dlg.open)dlg.close();g.paused=false;userPaused=false;document.getElementById('enter-gate')?.remove();cameraZone='cyberhell';MAP_ZOOM_LEVELS=townZoomLevels('cyberhell');mapCam.init=false;setMapZoom(0);refresh();qa.querySelector('#z4-state').textContent=' Cyberhell art preview / borrowed Zone1 floor / overview / errors: '+qaErrors.length;
};qa.querySelector('#z4-overview').onclick=()=>{setMapZoom(0);};

const z4close=document.createElement('button');z4close.textContent='Close QA overlay';z4close.onclick=()=>qa.remove();qa.append(z4close);
