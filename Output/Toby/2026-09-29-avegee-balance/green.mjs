// green-rate by zone for 100% / 85% / 60% players at thresholds (score >= T). crew taan rabiab5, queue 2 => rab 63.
const SRC='/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
globalThis.Image=class{}; let NOW=1.8e12; Date.now=()=>NOW;
const {createGame}=await import(SRC+'game.js'); const D=await import(SRC+'data.js');
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const R=rng(5); Math.random=R;
for (const zone of ['th','asia','west','cyberhell']) {
  const g=createGame(); g.save=()=>true; g.onChange=()=>{}; g.zone=zone; g.stations=[]; for(const k of ['sala','krata','dab','ngiw','lan','lokan','sawan']) g.stations.push({def:D.STATIONS.find(s=>s.k===k),slots:[],crewK:null,build:0});
  g.casesDone=5; g.spawns=1; g.crew.push({...D.CREW.find(c=>c.k==='taan'),morale:90,hunger:100});
  const souls=[]; for(let i=0;i<4000;i++){ g.queue=[]; g.usedCases=[]; g.spawnSoul(); if(g.queue[0]) souls.push(g.queue[0]); }
  const res={};
  for (const acc of [1,0.85,0.6]) {
    const sc=[];
    for(const s of souls){ const pool=g.stations.filter(x=>x.def.pow>0&&x.def.k!=='sala'); const tot=s.deeds.reduce((q,d)=>q+d.w,0)||1;
      const w=st=>st.def.heaven?(s.pure?1:0):s.pure?0:s.deeds.filter(d=>st.def.tags.includes(d.s)).reduce((q,d)=>q+d.w,0)/tot;
      let st=[...pool].sort((a,b)=>w(b)-w(a))[0], inten=s.deserved||1;
      if(R()>=acc){ if(R()<0.7) inten=Math.max(1,Math.min(5,inten+[-1,-1,-1,1,1,-2,2][Math.floor(R()*7)])); else st=pool[Math.floor(R()*pool.length)]; }
      st.crewK='taan'; g.queue=[1,2]; const r=g.judge(st,{soul:s,intensity:inten,progress:0,need:50}); if(Number.isFinite(r.score)) sc.push(r.score); }
    res[acc]={g78:+(100*sc.filter(x=>x>=78).length/sc.length).toFixed(0), g74:+(100*sc.filter(x=>x>=74).length/sc.length).toFixed(0), g70:+(100*sc.filter(x=>x>=70).length/sc.length).toFixed(0), star5:+(100*sc.filter(x=>x>=90).length/sc.length).toFixed(1), mean:+(sc.reduce((a,b)=>a+b,0)/sc.length).toFixed(1)};
  }
  console.log(zone); console.table(res);
}
