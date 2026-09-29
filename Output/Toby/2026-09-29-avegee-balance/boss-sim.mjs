// Isolated boss-fight Monte Carlo: win rate + cost per zone boss under different resource loadouts.
import fs from 'node:fs';
const SRC=process.env.SRC_DIR||'/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
globalThis.Image=class{};
let NOW=1.8e12; Date.now=()=>NOW;
const {createGame}=await import(SRC+'game.js');
const D=await import(SRC+'data.js');
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

function fightOnce(zoneIdx, load, seed) {
  Math.random = rng(seed);
  const g=createGame(); g.save=()=>true; g.onChange=()=>{};
  const z=D.ZONES[zoneIdx];
  g.zone=z.k; g.level=load.level; g.hpMax=D.LEVELS[load.level-1].hpMax; g.hp=Math.round(g.hpMax*load.hpFrac);
  g.zoneCases[z.k]=10; g.coin=load.coin; g.fireAmmo=load.fire; g.fireAmmoMax=Math.max(3,load.fire);
  g.powers.forEach(p=>{ if(p.lv<=g.level){p.max=2+ (g.level>=2?g.level-1:0); p.ammo=load.ice&&p.k==='ice'?p.max:p.ammo;} });
  if (load.crew) { for (const k of load.crew) g.hire(k); g.coin=load.coin; g.party={members:load.crew.slice(0,2),guard:false}; }
  if (load.guard) g.guard={x:0,y:0};
  g.crew.forEach(c=>{c.morale=95;});
  g.startZoneBoss(); g.startBossFight();
  let turns=0, healUsed=0;
  const coin0=g.coin;
  while(g.battle && !g.battle.over && turns++<200){
    NOW+=3000; const B=g.battle;
    const low=B.youHp<load.healBelow;
    if(low&&g.coin>=45&&g.battleAct('health')){healUsed++;continue;}
    if(low&&g.coin>=22&&g.battleAct('tea')){healUsed++;continue;}
    let used=false;
    if(g.canCallCrew()) for(const c of g.battleCrew()){ if(!g.crewHelpWhy(c)&&g.battleAct('crew:'+c.k)){used=true;break;} }
    if(used)continue;
    if(g.guard&&!g.guardHelpWhy()&&g.battleAct('guard'))continue;
    if(g.fireAmmo>0&&g.battleAct('fire'))continue;
    const ice=g.powerOf('ice'); if(ice&&!g.powerLocked(ice)&&ice.ammo>0&&B.stun===0&&g.battleAct('ice'))continue;
    g.battleAct('atk');
  }
  const B=g.battle;
  return {win:B.over==='win', turns, cost:coin0-g.coin, healUsed, hpLeft:B.youHp};
}
const LOADS={
  'bare (no coin, no crew, hp 60%, 3 fire)':{level:3,hpFrac:0.6,coin:0,fire:3,ice:false,crew:null,guard:false,healBelow:40},
  'poor (coin 150, hp 60%)':{level:3,hpFrac:0.6,coin:150,fire:3,ice:false,crew:null,guard:false,healBelow:40},
  'ok (coin 300, hp 100%, 2 crew)':{level:3,hpFrac:1.0,coin:300,fire:3,ice:false,crew:['plerng','dam'],guard:false,healBelow:40},
  'prepared (coin 500, hp 100%, 2 crew, guard, ice)':{level:4,hpFrac:1.0,coin:500,fire:3,ice:true,crew:['plerng','dam'],guard:true,healBelow:40},
  'rich (coin 1000, hp 100%, 2 crew, guard, ice)':{level:5,hpFrac:1.0,coin:1000,fire:3,ice:true,crew:['plerng','dam'],guard:true,healBelow:45},
};
const N=400; const out={};
for(const [name,l] of Object.entries(LOADS)){
  out[name]=[];
  for(let zi=0;zi<4;zi++){
    // level appropriate to zone: use load.level but at least zone requirement
    const load={...l, level: Math.max(l.level, [1,3,4,5][zi]>l.level? l.level : l.level)};
    let w=0,turns=0,cost=0,heal=0;
    for(let s=1;s<=N;s++){const r=fightOnce(zi,load,s*7+zi); if(r.win)w++; turns+=r.turns; cost+=r.cost; heal+=r.healUsed;}
    out[name].push({zone:D.ZONES[zi].k,win:+(100*w/N).toFixed(1),turns:+(turns/N).toFixed(1),cost:+(cost/N).toFixed(0),heals:+(heal/N).toFixed(1),bossHp:(process.env.OUT_TAG?200+25*zi:200+35*zi),bossAtk:[14,22+(process.env.OUT_TAG?2:3)*zi]});
  }
}
fs.writeFileSync(new URL('./boss-results'+(process.env.OUT_TAG||'')+'.json',import.meta.url),JSON.stringify(out,null,1));
for(const [k,v] of Object.entries(out)){console.log(k);console.table(v);}
