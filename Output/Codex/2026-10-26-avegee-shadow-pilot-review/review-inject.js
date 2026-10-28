
// Local memory-only town fixture; never deployed, never saves the player game.
const coldQA=document.createElement('div');coldQA.style='position:fixed;top:0;left:0;z-index:20000;background:#170c12;color:white;font:11px monospace';coldQA.innerHTML='<button id="cold-start">Town center</button><button id="cold-lava">Lava</button><button id="cold-ice">Ice</button><button id="cold-entry">Entry</button><button id="cold-overview">Overview</button><button id="cold-hide">Hide QA</button><span id="cold-state"></span>';document.body.append(coldQA);let coldReady=false;const coldErrors=[];addEventListener('error',e=>coldErrors.push(e.message));
coldQA.querySelector('#cold-start').onclick=async()=>{g.save=()=>true;g.restore(createGame().snapshot());g.save=()=>true;g.onChange=()=>{};g.zone='asia';(await import('./data.js')).syncSceneZone('asia');g.coin=100000;g.food=1000;g.bossCleared={th:true,asia:true,west:true,cyberhell:true};g.level=5;g.hpMax=LEVELS[g.level-1].hpMax;g.hp=g.hpMax;g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=g.pendingWarn=g.pendingVerdictScene=null;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.over=false;g.mobs=[];g.battle=null;g.queue=[];g.courtArrivals=[];g.afterlifeWalks=[];g.courtClosed=true;g.stations=STATIONS.map(def=>({def,slots:[],build:0,fire:0,intensity:3}));startPlay(false);if(dlg.open)dlg.close();if(pauseDlg.open)pauseDlg.close();userPaused=false;document.getElementById('enter-gate')?.remove();g.paused=true;g.player.x=1920;g.player.y=1250;g.player.path=[];cameraZone=g.zone;MAP_ZOOM_LEVELS=townZoomLevels(g.zone);mapCam.init=false;setMapZoom(2);await preloadZone('asia',g.outfit);refresh();coldReady=true;};
coldQA.querySelector('#cold-hide').onclick=()=>coldQA.style.display='none';
setInterval(()=>{if(!coldReady)return;const v={zone:g.zone,foot:[g.player.x,g.player.y],coin:g.coin,errors:coldErrors};coldQA.querySelector('#cold-state').textContent=JSON.stringify(v);fetch('/__qa',{method:'POST',body:JSON.stringify(v)});},500);

for(const [name,x,y,zoom]of [['lava',650,1450,2],['ice',3500,650,2],['entry',1920,2200,2],['overview',1920,1280,0]])coldQA.querySelector('#cold-'+name).onclick=()=>{g.player.x=x;g.player.y=y;g.player.path=[];mapCam.init=false;setMapZoom(zoom);refresh();};

const shadowQA=document.createElement('div');shadowQA.style='position:fixed;left:0;bottom:0;background:#170c12;color:white;z-index:20001;font:11px monospace';shadowQA.innerHTML='<button id="shade-find">Find shadow edge</button><button id="shade-off">Shade off</button><button id="shade-on">Shade on</button><span id="shade-data"></span>';document.body.append(shadowQA);
let pilotPoints=[];
shadowQA.querySelector('#shade-find').onclick=async()=>{
 const shade=await import('./town-shade.js?v=l1'),walk=await import('./walk.js?v=k1d');const found=[];
 for(let y=500;y<1700;y+=8)for(let x=500;x<3400;x+=8){if(!walk.canWalkAvoid(x,y))continue;const lo=shade.townShadeAt(x,y,0),hi=shade.townShadeAt(x,y,70);if(lo<8&&hi>100)found.push({x,y,lo,hi});}
 pilotPoints=found;shadowQA.querySelector('#shade-data').textContent=JSON.stringify({stats:shade.townShadeStats(),points:found.slice(0,12),count:found.length});
 if(found.length){const p=found[Math.floor(found.length/2)];g.player.x=p.x;g.player.y=p.y;g.player.path=[];mapCam.init=false;setMapZoom(3.5);refresh();}
};
for(const key of ['off','on'])shadowQA.querySelector('#shade-'+key).onclick=async()=>{(await import('./town-shade.js?v=l1')).setActorShade(key==='on');refresh();};
// Audit controls only, served outside the shipped source.
for(const [id,label] of [['walk','Resume walking'],['freeze','Freeze'],['perf','Measure render CPU']]){
 const b=document.createElement('button');b.textContent=label;b.id='pilot-'+id;shadowQA.prepend(b);
 b.onclick=async()=>{if(id==='walk'){g.paused=false;userPaused=false;}else if(id==='freeze'){g.paused=true;}else{
 const samples=[];for(let i=0;i<30;i++){const t=performance.now();refresh();samples.push(performance.now()-t);}
 samples.sort((a,b)=>a-b);shadowQA.querySelector('#shade-data').textContent=JSON.stringify({metric:'refresh CPU dispatch ms; not GPU FPS',n:30,median:samples[15],p95:samples[28],max:samples[29]});
 }refresh();};
}
for(const mode of ['sunny','full']){const b=document.createElement('button');b.textContent='Find '+mode;b.id='pilot-'+mode;shadowQA.prepend(b);b.onclick=async()=>{const s=await import('./town-shade.js?v=l1'),w=await import('./walk.js?v=k1d');let best=null,dist=Infinity;for(let y=600;y<1800;y+=8)for(let x=600;x<3200;x+=8){if(!w.canWalkAvoid(x,y))continue;const rows=[0,15,30,45,60].map(h=>s.townShadeAt(x,y-h,0));if(!(mode==='sunny'?rows.every(v=>v<8):rows.every(v=>v>180)))continue;const d=Math.hypot(x-1920,y-1250);if(d<dist){dist=d;best={x,y,rows};}}if(best){g.paused=true;g.player.x=best.x;g.player.y=best.y;g.player.path=[];mapCam.init=false;setMapZoom(3.5);refresh();}shadowQA.querySelector('#shade-data').textContent=JSON.stringify({mode,selected:best});};}
