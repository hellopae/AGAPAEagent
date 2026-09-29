const SRC='/Users/agapae/Documents/Work PAE/Claude/AVEGEE/src/';
globalThis.Image=class{};
const D=await import(SRC+'data.js');
const Q=D.QUEUE_LINE[0];
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
console.log('## keeper lock time per dispatch (s) = pickup(home->queue)/0.085 + 0.25+0.65 + travel(queue->station)/0.060, straight line x1.2 (game.js assign():623-628)');
const rows=[];
for (const c of D.CREW.filter(c=>!c.reader)) for (const st of D.STATIONS.filter(s=>s.pow>0&&s.k!=='sala')) {
  const pick=Math.max(900, dist([c.hx,c.hy],Q)*1.2/0.085), trav=Math.max(2400, dist(Q,[st.x,st.y])*1.2/0.060);
  rows.push({crew:c.k, st:st.k, lockSec:+((250+pick+650+trav)/1000).toFixed(1)});
}
const by={}; rows.forEach(r=>(by[r.st] ||= {})[r.crew]=r.lockSec);
console.table(by);
const all=rows.map(r=>r.lockSec); console.log('lock s: min',Math.min(...all),'median',all.sort((a,b)=>a-b)[Math.floor(all.length/2)],'max',Math.max(...all),' vs arrival period',14*0.7,'s');
console.log('\n## punishment ticks per soul (need/rate), crew taan raeng 8, morale .95, fed x1.18, 1 slot');
for (const d of [1,2,3,4,5]) { const need=18+d*8+d*7; const line=[]; for (const st of ['krata','dab','lokan','ngiw','lan']) { const s=D.STATIONS.find(x=>x.k===st); for (const cr of ['taan','dam']) { const c=D.CREW.find(x=>x.k===cr); const rate=(c.raeng*0.55+s.pow*0.9)*(0.55+0.45*0.95)*1.18; line.push(`${st}/${cr}:${(need/rate).toFixed(1)}`); } } console.log('deserved',d,'need',need,'->',line.join('  ')); }
console.log('\n## verdict coin = round(coinPerCase*score/100*(0.7+d*0.12)*orderTier)  (coinPerCase',D.BAL.coinPerCase,')');
for (const sc of [60,80,95]) { const row=[]; for (const d of [1,2,3,4,5]) { row.push(`d${d}:${Math.round(D.BAL.coinPerCase*sc/100*(0.7+d*0.12))}`);} console.log('score',sc,row.join(' '),' (x1.25 at order>=80, x0.8 at 30-54, x0.6 below 30)'); }
console.log('\n## income sources per event'); console.log({kpi:150,star5:60,star4:25,gateAscend:60,soulFightWin:D.BATTLE.winCoin,mobFightWin:Math.round(D.MOB.bounty*D.MOB.fightWin),guardStrike:D.MOB.bounty,levelBonus:{L3:300,L4:500},zoneGrant:D.ZONES.map(z=>z.k+':'+z.coin).join(','),miniGoal:90,frontierWin:'32+10*wave',sellMaterials:'34/24/18'});
console.log('\n## costs'); console.log({stations:Object.fromEntries(D.STATIONS.filter(s=>s.cost).map(s=>[s.k,s.cost])), hire:Object.fromEntries(D.CREW.filter(c=>c.hire).map(c=>[c.k,c.hire])), guard:D.GUARD.hire, guardPay:`${D.GUARD.pay}/${D.BAL.payEvery} ticks`, food:`${D.BAL.foodPrice}/unit (buy 10=20) ; merchant 18 for 2x12=24 food`, upgradeCrew:`90*(lv+1) x5 = ${90*15}`, lotus:`${D.KARMA_RELIEF.lotusCost} for -${D.KARMA_RELIEF.lotusCut}`});
const tot=D.STATIONS.filter(s=>s.cost).reduce((a,s)=>a+s.cost,0); console.log('all stations sum',tot,' punish-only (krata,dab,lokan,ngiw,lan)',180+220+260+160+150, ' crew all',120+180+260+300);
console.log('\n## mob income per case by karma tier: every = max(2, round(5*mult))');
for (const kt of D.KARMA_TIERS) { const every=Math.max(2,Math.round(D.MOB.spawnEvery*kt.mob)); console.log(kt.name,'karma<=',kt.max,'mob every',every,'cases -> fight bounty',Math.round(D.MOB.bounty*D.MOB.fightWin),'/',every,'=',(D.MOB.bounty*D.MOB.fightWin/every).toFixed(1),'coin/case'); }
