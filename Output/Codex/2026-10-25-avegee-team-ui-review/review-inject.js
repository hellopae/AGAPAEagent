
// QA memory-only fixtures. Never modifies localStorage or production sources.
const wftQa=document.createElement('div');wftQa.id='wft-qa';wftQa.style='position:fixed;top:0;left:0;right:0;z-index:20000;background:#171018;color:white;padding:5px;font:12px monospace';
wftQa.innerHTML='<button id="qa-team">Team scenario</button><button id="qa-empty">Starve workers</button><button id="qa-trial">Mitigating case</button><button id="qa-fear">Incriminating case</button><button id="qa-hide">Hide QA</button><span id="qa-state"></span>';document.body.append(wftQa);
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
 startPlay(false);if(dlg.open)dlg.close();g.paused=false;userPaused=false;document.getElementById('enter-gate')?.remove();cameraZone='th';MAP_ZOOM_LEVELS=townZoomLevels('th');mapCam.init=false;setMapZoom(0);g.inventory.food=5;refresh();
};

document.getElementById('qa-team').onclick=wftSetup;
document.getElementById('qa-empty').onclick=async()=>{const {stepWorkers}=await import('./workers.js');g.food=0;stepWorkers(g);refresh();};
const qaTrial=async relief=>{
 if(!g.crewOf('kan'))await wftSetup();
 for(const c of g.crew){c.at=null;c.buildK=null;c.escort=null;c.cook=false;c.morale=100;c.hunger=100;}
 const hidden=relief?{t:'ทั้งเจ็ดคนคือคนที่ทำร้ายเด็กแล้วหลุดคดี',s:'kha',w:-2,known:false}:{t:'จงใจทำร้ายผู้บริสุทธิ์',s:'kha',w:4,known:false};
 const s={id:relief?108:107,case:'qa',who:'ชายวัยกลางคน',name:'ชายวัยกลางคน',sex:'m',sp:'soul-middle',waited:0,said:[],deeds:[{t:'ฆ่าคนตายเจ็ดคน',s:'kha',w:5,known:true,visible:false},hidden],merits:[],presses:2,pure:false,lines:[{i:0,kind:relief?'plea':'deny',t:relief?'ผมรู้ว่าผมผิดครับท่าน ผมแค่ไม่รู้ว่าจะให้ใครทำแทน':'ผมไม่เคยทำร้ายใคร',reveal:relief?'ผมดีใจที่ท่านรับฟังความจริงจนจบ':'ผมยอมรับว่าทำจริง'},{i:1,kind:'solid',t:'ผมไม่มีอะไรจะแก้ตัวแล้วครับ'}],traitKey:'accepting'};
 // Use an existing portrait asset, while the dossier is an isolated memory fixture.
 s.sp=relief?'soul-recruit':'soul-pol';g.queue=[s];g.courtArrivals=[];g.afterlifeWalks=[];g.pendingLevel=g.pendingRecovery=g.pendingZone=g.pendingReward=null;g.storyQueue=[];g.taught.push('trial-calculation','interrogation-traits');g.paused=false;userPaused=false;openTrial();
};
document.getElementById('qa-trial').onclick=()=>qaTrial(true);document.getElementById('qa-fear').onclick=()=>qaTrial(false);document.getElementById('qa-hide').onclick=()=>wftQa.style.display='none';
setInterval(()=>{document.getElementById('qa-state').textContent=JSON.stringify({food:g.food,inventory:g.inventory.food,workers:g.workers().map(w=>({id:w.id,hunger:w.hunger,supplyRest:w.supplyRest,mode:w.mode,sitting:w.sitting})),crew:g.crew.map(c=>({id:c.id,hunger:c.hunger,rest:!!c.teaRest})),errors:qaErrors});},500);
