// Per-case verdict economics by ZONE and by POLICY (real judge()). All 5 punish stations + sawan built, right crew rabiab=5.
import fs from 'node:fs';
const SRC='/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
globalThis.Image=class{}; let NOW=1.8e12; Date.now=()=>NOW;
const {createGame}=await import(SRC+'game.js'); const D=await import(SRC+'data.js');
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const R=rng(7); Math.random=R;
const N=5000;
const out={};
const POL={
  'ถูกทั้งสถานี+วาระ (100%)': (s,best,pool)=>({st:best,inten:s.deserved||1}),
  'ถูก 85% (พลาด: วาระ±1-2 หรือสถานีผิด)': (s,best,pool)=>{ let st=best,inten=s.deserved||1; if(R()>=0.85){ if(R()<0.7) inten=Math.max(1,Math.min(5,inten+[-1,-1,-1,1,1,-2,2][Math.floor(R()*7)])); else st=pool[Math.floor(R()*pool.length)]; } return {st,inten}; },
  'ถูก 60%': (s,best,pool)=>{ let st=best,inten=s.deserved||1; if(R()>=0.60){ if(R()<0.7) inten=Math.max(1,Math.min(5,inten+[-1,-1,-1,1,1,-2,2][Math.floor(R()*7)])); else st=pool[Math.floor(R()*pool.length)]; } return {st,inten}; },
  'สถานีถูก แต่ซัดวาระ 5 ทุกคดี': (s,best,pool)=>({st:best,inten:5}),
  'สถานีถูก แต่วาระ 4 ทุกคดี': (s,best,pool)=>({st:best,inten:4}),
  'สถานีถูก แต่วาระ 3 ทุกคดี': (s,best,pool)=>({st:best,inten:3}),
  'มั่ว (สถานีสุ่ม วาระสุ่ม)': (s,best,pool)=>({st:pool[Math.floor(R()*pool.length)],inten:1+Math.floor(R()*5)}),
};
for (const zone of ['th','asia','west','cyberhell']) {
  const g=createGame(); g.save=()=>true; g.onChange=()=>{};
  g.zone=zone; g.stations=[]; for(const k of ['sala','krata','dab','ngiw','lan','lokan','sawan']) g.stations.push({def:D.STATIONS.find(s=>s.k===k),slots:[],crewK:null,build:0,intensity:3,fire:0,repair:0});
  g.casesDone=5; g.spawns=1; g.usedCases=[];
  const crew={...D.CREW.find(c=>c.k==='taan'),morale:90,hunger:100}; g.crew.push(crew);
  const souls=[];
  for(let i=0;i<N;i++){ g.queue=[]; g.usedCases=[]; g.spawnSoul(); if(g.queue[0]) souls.push(g.queue[0]); }
  const dz=[0,0,0,0,0,0]; souls.forEach(s=>dz[s.deserved||0]++);
  const rec={n:souls.length, deservedPct: dz.slice(0).map((v,i)=>i+':'+(100*v/souls.length).toFixed(0)).join(' '), pure: +(100*souls.filter(s=>s.pure).length/souls.length).toFixed(1), resist:+(100*souls.filter(s=>s.resist).length/souls.length).toFixed(1), multiSin:+(100*souls.filter(s=>new Set(s.deeds.filter(d=>d.w>0).map(d=>d.s)).size>1).length/souls.length).toFixed(1), policies:{}};
  for (const [pn,pf] of Object.entries(POL)) {
    const a={n:0,score:0,coin:0,karma:0,tham:0,ked:0,green:0,red:0,cruel:0,fire:0};
    for(const s of souls){
      const pure=!!s.pure;
      const pool=g.stations.filter(x=>x.def.pow>0&&x.def.k!=='sala');
      const tot=s.deeds.reduce((q,d)=>q+d.w,0)||1;
      const w=st=>st.def.heaven?(pure?1:0):pure?0:s.deeds.filter(d=>st.def.tags.includes(d.s)).reduce((q,d)=>q+d.w,0)/tot;
      const best=[...pool].sort((x,y)=>w(y)-w(x))[0];
      const {st,inten}=pf(s,best,pool);
      st.crewK='taan'; g.queue=[];
      const r=g.judge(st,{soul:s,intensity:inten,progress:0,need:50});
      if(!Number.isFinite(r.score)) continue;
      a.n++; a.score+=r.score; a.coin+=r.coin; a.karma+=r.karma; a.tham+=r.tham; a.ked+=r.ked; if(r.score>=78)a.green++; if(r.score<50)a.red++; if(r.over>=2&&r.score>=50)a.cruel++; if(D.starsOf(r.score)===0)a.fire++;
    }
    const m=x=>+(x/a.n).toFixed(2);
    rec.policies[pn]={score:m(a.score),coin:m(a.coin),karma:m(a.karma),tham:m(a.tham),ked:m(a.ked),green:+(100*a.green/a.n).toFixed(0),red:+(100*a.red/a.n).toFixed(0),cruel:+(100*a.cruel/a.n).toFixed(0)};
  }
  out[zone]=rec;
}
fs.writeFileSync(new URL('./percase2.json',import.meta.url),JSON.stringify(out,null,1));
for(const [z,r] of Object.entries(out)){console.log('\n=== zone',z,'n',r.n,'deserved%',r.deservedPct,'pure%',r.pure,'resist%',r.resist,'multi-sin%',r.multiSin);console.table(r.policies);}
