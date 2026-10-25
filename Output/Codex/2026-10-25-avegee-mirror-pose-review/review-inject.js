
// External A6 native-room fixture; no saves or production QA controls.
const a6QA=document.createElement('div');a6QA.id='mirror-qa';a6QA.style='position:fixed;top:0;left:0;z-index:20000;background:#170c12;color:white;font:11px monospace';a6QA.innerHTML='<button id="a6-start">Room asia</button><button id="a6-left">Walk left of mirror</button><button id="a6-right">Walk right of mirror</button><button id="a6-swing">Residual swing</button><button id="a6-hide">Hide QA</button><span id="a6-status"></span>';document.body.append(a6QA);
let a6Room=null,a6History=[],a6Errors=[];addEventListener('error',e=>a6Errors.push(e.message));
async function a6Setup(){try{
 const {harbourTravel}=await import('../tests/helpers/travel.mjs');g.save=()=>true;g.onChange=()=>{};g.restore(createGame().snapshot());g.save=()=>true;g.onChange=()=>{};g.coin=100000;g.food=1000;g.level=5;g.hpMax=LEVELS[g.level-1].hpMax;g.hp=g.hpMax;g.bossCleared={th:true,asia:true,west:true};
 for(const [z,events] of Object.entries(ZONE_EVENTS))g.zoneEvents[z]=Object.fromEntries(events.map(e=>[e.k,'cleared']));harbourTravel(g,'asia');
 g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=g.pendingWarn=g.pendingVerdictScene=null;g.dadFight=false;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.over=false;g.mapTravel=null;g.mobs=[];g.party.members=[];g.battle=null;g.queue=[];g.courtArrivals=[];g.afterlifeWalks=[];
 g.outfit='asia';await preloadZone('asia','asia');if(!g.has('krajok'))g.stations.push({def:STATIONS.find(s=>s.k==='krajok'),build:0,repair:0,slots:[],fire:0});g.syncBlocks(true);g.powerOf('mirror').ammo=0;
 startPlay(false);if(dlg.open)dlg.close();if(pauseDlg.open)pauseDlg.close();userPaused=false;document.getElementById('enter-gate')?.remove();g.paused=false;openStation('krajok');a6Room=window.__room;a6History=[];a6Errors=[];a6Room.walkTo(.68,.68);
 }catch(e){a6QA.querySelector('#a6-status').textContent='ERROR '+e.stack;}}
a6QA.querySelector('#a6-start').onclick=a6Setup;a6QA.querySelector('#a6-left').onclick=()=>a6Room?.walkTo(.68,.68);a6QA.querySelector('#a6-right').onclick=()=>a6Room?.walkTo(.79,.68);a6QA.querySelector('#a6-swing').onclick=()=>{g.swingUntil=Date.now()+60000;};a6QA.querySelector('#a6-hide').onclick=()=>a6QA.style.display='none';
setInterval(async()=>{
 const parent=dlg.open?dlg:document.body;if(a6QA.parentElement!==parent)parent.append(a6QA);if(!a6Room)return;
 const {mirrorSolution}=await import('./mirror-charge.js');const roomEl=dlg.querySelector('.st-room');let solution=null;if(roomEl){const a=a6Room.anchor(0,0),x=a6Room.anchor(1,0),y=a6Room.anchor(0,1);solution=Math.round(mirrorSolution((x[0]-a[0])*roomEl.clientWidth/((y[1]-a[1])*roomEl.clientHeight),MIRROR_ROOM_LAYOUT));}
 const state={open:dlg.open,pos:a6Room.pos(),mirror:a6Room.mirrorState?.(),ammo:g.powerOf('mirror').ammo,coin:g.coin,hp:g.hp,mp:g.mp,solution,roomStillOpen:!!roomEl};
 if(JSON.stringify(a6History.at(-1))!==JSON.stringify(state))a6History.push(state);if(a6History.length>500)a6History.shift();a6QA.querySelector('#a6-status').textContent=JSON.stringify(state);fetch('/__qa-results',{method:'POST',body:JSON.stringify({history:a6History,errors:a6Errors})});
},300);
