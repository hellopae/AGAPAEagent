
// QA memory-only fixtures. Never modifies localStorage or production sources.
const wftQa=document.createElement('div');wftQa.id='wft-qa';wftQa.style='position:fixed;top:0;left:0;right:0;z-index:20000;background:#171018;color:white;padding:5px;font:12px monospace';
wftQa.innerHTML='<button id="wft-setup">WFT workers</button> <button id="wft-office">Worker office</button> <button id="wft-boat">Ready boat</button> <button id="wft-inspect">Release Taan</button> <button id="wft-lock">Hiring lock</button><button id="wft-empty">Empty supplies</button><button id="wft-hide">Hide QA</button><label><input type="checkbox" id="wft-hold-travel">Hold travel</label><button id="wft-next-phase">Next travel phase</button><span id="wft-status"></span>';document.body.append(wftQa);
let qaErrors=[];addEventListener('error',e=>qaErrors.push(e.message));
const wftSetup=async()=>{
 const {syncSceneZone}=await import('./data.js');const {normalizeWorkers}=await import('./workers.js');const {canteenPoint}=await import('./canteen.js');
 g.save=()=>true;g.zone='th';syncSceneZone('th');g.bossCleared={th:true};g.zoneEvents={th:{frontierBreach:'cleared',prisonBreak:'cleared',devaTest:'cleared',thBorderBoss:'cleared'}};
 g.coin=50000;g.food=70;g.level=5;g.workerState=normalizeWorkers();g.canteenState={};g.mobs=[];g.battle=null;g.pendingReward=g.pendingZone=g.pendingLevel=g.pendingRecovery=null;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.queue=[];g.courtArrivals=[];g.afterlifeWalks=[];g.transits=[];
 for(const k of ['dam','plerng','kan'])if(!g.crewOf(k))g.hire(k);if(!g.guard)g.hireGuard();
 for(const c of g.crew){c.at=null;c.buildK=null;c.escort=null;c.morale=100;c.hunger=100;}
 g.stations=STATIONS.filter(d=>['sala','krata','tarang','tea','ngiw','dab','sawan'].includes(d.k)).map(def=>({def,slots:[],build:0,repair:0,fire:0,intensity:3,crewK:null}));g.syncBlocks(true);
 const at=canteenPoint(g);Object.assign(g.player,{x:at[0],y:at[1]+130,path:null,tx:null,ty:null});
 for(let i=0;i<4;i++)g.hireWorker();g.setWorkerMode(g.workers()[1].id,'gather');g.setWorkerMode(g.workers()[2].id,'food');const rest=g.workers()[3];g.setWorkerMode(rest.id,'rest');rest.morale=0;
 g.crewOf('taan').hunger=10;g.crewOf('taan').morale=35;g.guard.morale=40;g.guard.hunger=15;
 g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.courtClosed=true;g.over=false;g.mapTravel=null;
 startPlay(false);if(dlg.open)dlg.close();g.paused=false;userPaused=false;document.getElementById('enter-gate')?.remove();cameraZone='th';MAP_ZOOM_LEVELS=townZoomLevels('th');mapCam.init=false;setMapZoom(1);refresh();
};
document.getElementById('wft-setup').onclick=wftSetup;
document.getElementById('wft-office').onclick=()=>openNiraOffice();
document.getElementById('wft-boat').onclick=()=>{g.zoneTravel.visited.th=g.zoneTravel.visited.asia=true;g.zoneTravel.ports.th=g.zoneTravel.ports.asia=true;g.zoneTravel.active=null;Object.assign(g.player,g.harbourPoint(),{path:null,tx:null,ty:null});if(dlg.open)dlg.close();g.paused=false;userPaused=false;setMapZoom(1);refresh();openHarbour();};
document.getElementById('wft-inspect').onclick=()=>{g.crewOf('taan').at=null;};
document.getElementById('wft-lock').onclick=()=>{g.workerState={version:3,nextId:1,workers:[],ledger:{}};g.zoneEvents.th={};g.bossCleared={};modal(workersPanelHtml(g),d=>bindWorkersPanel(d,g,()=>{}));};
setInterval(()=>{document.getElementById('wft-status').textContent=' '+JSON.stringify({zone:g.zone,phase:g.mapTravel?.phase,player:[g.player.x,g.player.y],cooks:g.crew.filter(c=>c.cook).map(c=>[c.k,c.x,c.y,c.cookX,c.cookY]),workers:g.workers().map(w=>({mode:w.mode,job:w.job?.kind,meal:w.meal,sitting:w.sitting})),kitchen:g.canteenState?.[g.zone],errors:qaErrors});},500);

document.getElementById('wft-next-phase').onclick=async()=>{const {advanceMapTravel}=await import('./map-travel.js');const a=g.mapTravel;if(!a)return;const phase=a.phase;a.qaAdvance=true;for(let i=0;i<1000&&g.mapTravel?.phase===phase;i++)advanceMapTravel(g,120);a.qaAdvance=false;};

const qaCss=document.createElement('style');qaCss.textContent='@media(max-width:600px){#wft-qa span{display:none}#wft-qa{max-height:66px;overflow:auto}}';document.head.append(qaCss);

document.getElementById('wft-empty').onclick=async()=>{const {stepWorkers}=await import('./workers.js');g.inventory.food=2;g.food=0;stepWorkers(g);openNiraOffice();};document.getElementById('wft-hide').onclick=()=>wftQa.style.display='none';
