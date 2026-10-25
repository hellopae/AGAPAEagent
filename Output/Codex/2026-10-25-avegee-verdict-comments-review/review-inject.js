
// External memory-only A5 fixture. Deterministic judge score, real doVerdict/assign and production dialog queue.
const a5Change=g.onChange;
const a5QA=document.createElement('div');a5QA.id='verdict-qa';a5QA.style='position:fixed;top:0;left:0;z-index:20000;background:#170c12;color:white;font:12px monospace';
const a5Cases=[['th',80,0,0],['asia',80,0,0],['west',60,0,0],['cyberhell',95,3,0],['th',30,0,1],['asia',95,0,0]];
a5QA.innerHTML=a5Cases.map(([z,s,o,r],i)=>`<button data-a5="${i}">Review ${z} ${s}${o?' over':''}${r?' red2':''}</button>`).join('')+'<button id="a5-hide">Hide QA</button><span id="a5-status"></span>';document.body.append(a5QA);
let a5Errors=[],a5Label=null,a5History=[];addEventListener('error',e=>a5Errors.push(e.message));
async function a5Setup(index){try{
 const [zone,score,over,reds]=a5Cases[index];const {harbourTravel}=await import('../tests/helpers/travel.mjs');
 g.save=()=>true;g.onChange=()=>{};g.restore(createGame().snapshot());g.save=()=>true;g.onChange=()=>{};g.coin=100000;g.food=1000;g.level=5;g.hpMax=LEVELS[g.level-1].hpMax;g.hp=g.hpMax-20;g.bossCleared={th:true,asia:true,west:true};
 for(const [z,events] of Object.entries(ZONE_EVENTS))g.zoneEvents[z]=Object.fromEntries(events.map(e=>[e.k,'cleared']));
 if(zone!=='th')harbourTravel(g,zone);
 g.pendingZone=g.pendingLevel=g.pendingReward=g.pendingRecovery=g.pendingWarn=g.pendingVerdictScene=null;g.dadFight=false;g.storyQueue=[];g.discoveryQueue=[];g.taught=TUTOR.map(x=>x.k);g.discover=()=>{};g.nextArrive=g.nextEvent=g.nextPay=g.nextKpi=1e9;g.over=false;g.mapTravel=null;g.mobs=[];g.party.members=[];g.battle=null;g.reds=reds;
 await preloadZone(zone,g.outfit||zone);g.queue=[];g.courtArrivals=[];g.afterlifeWalks=[];g.courtClosed=true;g.paused=false;
 g.hire('taan');if(!g.has('krata'))g.stations.push({def:STATIONS.find(s=>s.k==='krata'),build:0,repair:0,slots:[],fire:0});g.syncBlocks(true);
 const soul={id:999001,name:'ผู้ต้องคดีทดสอบ',who:'ผู้ต้องคดีทดสอบ',sex:'m',sp:7,deserved:2,deeds:[],merits:[],said:[],courtDisembarked:true};g.queue=[soul];
 g.judge=()=>({score,tham:70,ked:60,over,short:0,karma:0,reason:over?'เลือกสถานที่ตรงกรรม แต่ระดับทัณฑ์เกินกรรม 3 ระดับ':score>=90?'เลือกสถานที่และระดับทัณฑ์ตรงกรรม':'เลือกสถานที่ตรงกรรม แต่ระดับทัณฑ์ยังคลาดเคลื่อน'});
 startPlay(false);if(dlg.open)dlg.close();if(pauseDlg.open)pauseDlg.close();userPaused=false;document.getElementById('enter-gate')?.remove();g.paused=true;
 const c=g.crew.find(c=>!c.reader&&!c.self);a5Label=`${zone}-${score}${over?'-over':''}${reds?'-red2':''}`;a5History=[];a5Errors=[];
 if(!doVerdict(soul,'krata',c.k,2))throw Error('assign failed');g.onChange=a5Change;g.onChange();
 }catch(e){a5QA.querySelector('#a5-status').textContent='ERROR '+e.stack;}}
a5QA.querySelectorAll('[data-a5]').forEach(b=>b.onclick=()=>a5Setup(Number(b.dataset.a5)));a5QA.querySelector('#a5-hide').onclick=()=>a5QA.style.display='none';
setInterval(()=>{
 const parent=dlg.open?dlg:document.body;if(a5QA.parentElement!==parent)parent.append(a5QA);if(!a5Label)return;
 const state={dialog:dlg.open?dlg.className:null,scene:!!dlg.querySelector('.verdict-scene')&&dlg.open,title:dlg.open?dlg.querySelector('.intro-comic-head')?.textContent:null,coin:g.coin,hp:g.hp,karma:g.karma,reds:g.reds,cases:g.casesDone,pendingScene:!!g.pendingVerdictScene,pendingWarn:!!g.pendingWarn,bubble:!!document.querySelector('[data-dismiss-verdict]'),quiet:fx?.quiet};
 const last=a5History.at(-1);if(JSON.stringify(last)!==JSON.stringify(state))a5History.push(state);
 a5QA.querySelector('#a5-status').textContent=JSON.stringify(state);fetch('/__qa-results',{method:'POST',body:JSON.stringify({label:a5Label,history:a5History,errors:a5Errors})});
},300);
