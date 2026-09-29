// Per-case verdict economics: expected score/coin/karma by player accuracy, using the REAL judge().
import fs from 'node:fs';
const SRC='/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
globalThis.Image=class{}; let NOW=1.8e12; Date.now=()=>NOW;
const {createGame}=await import(SRC+'game.js'); const D=await import(SRC+'data.js');
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const R=rng(42); Math.random=R;
const N=6000;
function mkWorld(stKeys){
  const g=createGame(); g.save=()=>true; g.onChange=()=>{};
  g.stations=[]; for(const k of ['sala','krata',...stKeys]) g.stations.push({def:D.STATIONS.find(s=>s.k===k),slots:[],crewK:null,build:0,intensity:3,fire:0,repair:0});
  g.casesDone=5; g.spawns=1;   // past first-case scripting
  return g;
}
const out={};
for (const [label, stKeys] of Object.entries({
  'krata only (start)':[], 'krata+dab':['dab'], 'all 5 punish stations':['dab','ngiw','lan','lokan'], 'all 5 + sawan':['dab','ngiw','lan','lokan','sawan']})) {
  const g=mkWorld(stKeys); g.crew.push(...['plerng','kan','boon','dam'].map(k=>({...D.CREW.find(c=>c.k===k),morale:90,hunger:100})));
  const souls=[]; g.queue=[];
  for(let i=0;i<N;i++){ g.queue=[]; g.spawnSoul(); const s=g.queue[0]; if(!s) continue; if(s.case && !s.pure) {} souls.push(s); }
  for (const acc of [1.0,0.85,0.6,0.3]) {
    const agg={n:0,score:0,coin:0,karma:0,green:0,red:0,star:[0,0,0,0,0,0],nan:0,tham:0,ked:0,over2:0,short:0,resist:0,dz:[0,0,0,0,0,0]};
    for(const s of souls){
      if(s.pure && !stKeys.includes('sawan')) continue;
      const avail=g.stations.filter(x=>x.def.pow>0&&x.def.k!=='sala'&&(s.pure? x.def.heaven : !x.def.heaven || false));
      const tot=s.deeds.reduce((a,d)=>a+d.w,0)||1;
      const w=st=>st.def.heaven? (s.pure?1:0) : s.pure?0 : s.deeds.filter(d=>st.def.tags.includes(d.s)).reduce((a,d)=>a+d.w,0)/tot;
      const pool=g.stations.filter(x=>x.def.pow>0&&x.def.k!=='sala');
      const ranked=[...pool].sort((a,b)=>w(b)-w(a));
      let st=ranked[0]; let inten=s.deserved||1;
      if(R()>=acc){ if(R()<0.7||pool.length<2){ inten=Math.max(1,Math.min(5,inten+[-1,-1,-1,1,1,-2,2][Math.floor(R()*7)])); } else st=pool[Math.floor(R()*pool.length)]; }
      st.crewK='kan'; g.queue=[]; const slot={soul:s,intensity:inten,progress:0,need:50};
      const r=g.judge(st,slot);
      if(!Number.isFinite(r.score)){agg.nan++; continue;}
      agg.n++; agg.score+=r.score; agg.coin+=r.coin; agg.karma+=r.karma; agg.tham+=r.tham; agg.ked+=r.ked; if(r.score>=78)agg.green++; if(r.score<50)agg.red++; agg.star[D.starsOf(r.score)]++; if(r.over>=2)agg.over2++; if(r.short>0)agg.short++; if(s.resist)agg.resist++; agg.dz[s.deserved||0]++;
    }
    const m=x=>+(x/agg.n).toFixed(2);
    (out[label] ||= {})[acc]={n:agg.n,nan:agg.nan,score:m(agg.score),coin:m(agg.coin),karma:m(agg.karma),tham:m(agg.tham),ked:m(agg.ked),green:+(100*agg.green/agg.n).toFixed(1),red:+(100*agg.red/agg.n).toFixed(1),over2pct:+(100*agg.over2/agg.n).toFixed(1),shortpct:+(100*agg.short/agg.n).toFixed(1),resistPct:+(100*agg.resist/agg.n).toFixed(1),deserved:agg.dz.slice(1).map(v=>+(100*v/agg.n).toFixed(0)).join('/')};
  }
}
fs.writeFileSync(new URL('./percase.json',import.meta.url),JSON.stringify(out,null,1));
for(const [k,v] of Object.entries(out)){console.log('\n'+k);console.table(v);}
