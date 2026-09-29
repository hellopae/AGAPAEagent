// How would alternative deservedOf() formulas redistribute the "deserved" level (1-5)? (real soul generators, 5000 per zone)
const SRC='/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
globalThis.Image=class{}; let NOW=1.8e12; Date.now=()=>NOW;
const {createGame}=await import(SRC+'game.js'); const D=await import(SRC+'data.js');
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
Math.random=rng(11);
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const F={
  'ปัจจุบัน: max + 0.4*Σrest':(ws,m)=>ws[0]+ws.slice(1).reduce((s,w)=>s+w*0.4,0)-m,
  'A: 0.8*max + 0.3*Σrest':(ws,m)=>0.8*ws[0]+ws.slice(1).reduce((s,w)=>s+w*0.3,0)-m,
  'B: 0.7*max + 0.3*Σrest':(ws,m)=>0.7*ws[0]+ws.slice(1).reduce((s,w)=>s+w*0.3,0)-m,
  'C: 0.7*max + 0.25*Σrest':(ws,m)=>0.7*ws[0]+ws.slice(1).reduce((s,w)=>s+w*0.25,0)-m,
  'D: 0.65*max + 0.3*Σrest':(ws,m)=>0.65*ws[0]+ws.slice(1).reduce((s,w)=>s+w*0.3,0)-m,
};
for (const zone of ['th','asia','west','cyberhell']) {
  const g=createGame(); g.save=()=>true; g.onChange=()=>{}; g.zone=zone; g.stations=[]; for(const k of ['sala','krata','dab','ngiw','lan','lokan','sawan']) g.stations.push({def:D.STATIONS.find(s=>s.k===k),slots:[],crewK:null,build:0});
  g.casesDone=5; g.spawns=1;
  const souls=[]; for(let i=0;i<5000;i++){ g.queue=[]; g.usedCases=[]; g.spawnSoul(); const s=g.queue[0]; if(s&&!s.pure) souls.push(s); }
  console.log('\n== zone',zone,'n',souls.length);
  for (const [name,f] of Object.entries(F)) {
    const h=[0,0,0,0,0,0];
    for(const s of souls){ const ws=s.deeds.map(d=>d.w).sort((a,b)=>b-a); const merit=s.merits.filter(m=>!m.fake).reduce((a,m)=>a+m.v,0); h[clamp(Math.round(f(ws,merit)),1,5)]++; }
    console.log(name.padEnd(28), [1,2,3,4,5].map(i=>i+':'+String(Math.round(100*h[i]/souls.length)).padStart(2)+'%').join('  '));
  }
}
