import fs from 'node:fs';
const r=JSON.parse(fs.readFileSync(new URL('./sim-results.json',import.meta.url)));
const at=(m,t)=>{ const s=m.series; let best=s[0]; for(const x of s) if(x.tick<=t) best=x; return best; };
const med=a=>{a=a.filter(x=>x!=null&&x===x).sort((x,y)=>x-y);return a.length?a[Math.floor(a.length/2)]:null;};
const mins=[...Array(29)].map((_,i)=>i*0.5);
function series(prof,key,scale=1){ return mins.map(mn=>{ const t=Math.round(mn*60/0.7); const rows=r[prof].filter(m=>m.endTick>=t||m.over==='timeout').map(m=>at(m,t)[key]); return rows.length>=8?med(rows)*scale:null; }); }
const W=760,H=380,L=50,B=40,T=30,R=20;
const X=mn=>L+(W-L-R)*mn/14, Y=v=>H-B-(H-B-T)*v/100;
const lines=[
 ['careful · ระเบียบ (order)',series('careful','order'),'#2e7d32',''],
 ['sloppy · ระเบียบ (order)',series('sloppy','order'),'#c62828',''],
 ['sloppy · กรรมท่าน (karma)',series('sloppy','karma'),'#6a1b9a','6 4'],
 ['careful · กรรมท่าน (karma)',series('careful','karma'),'#66bb6a','6 4'],
 ['sloppy · เปรตค้าง x10 (mobs*10)',series('sloppy','mobs',10),'#ef6c00','2 3'],
];
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H+70}" font-family="sans-serif" font-size="12"><rect width="100%" height="100%" fill="#fff"/>`;
svg+=`<text x="${L}" y="18" font-size="14" font-weight="bold">AVEGEE headless sim — median of runs (n=30/profile), x = นาทีที่เปิดศาลจริง (1 tick = 0.7s)</text>`;
for(let v=0;v<=100;v+=25){ svg+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#ddd"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end">${v}</text>`; }
for(let mn=0;mn<=14;mn+=2){ svg+=`<line x1="${X(mn)}" x2="${X(mn)}" y1="${T}" y2="${H-B}" stroke="#eee"/><text x="${X(mn)}" y="${H-B+16}" text-anchor="middle">${mn}</text>`; }
for(const [name,ys,c,dash] of lines){ const pts=ys.map((v,i)=>v==null?null:`${X(mins[i]).toFixed(1)},${Y(Math.min(100,v)).toFixed(1)}`).filter(Boolean).join(' '); svg+=`<polyline fill="none" stroke="${c}" stroke-width="2.2" stroke-dasharray="${dash}" points="${pts}"/>`; }
lines.forEach(([name,,c,dash],i)=>{ const y=H+10+i*15; svg+=`<line x1="${L}" x2="${L+30}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="2.2" stroke-dasharray="${dash}"/><text x="${L+38}" y="${y+4}">${name}</text>`; });
svg+='</svg>';
fs.writeFileSync(new URL('./chart-order-karma-mobs.svg',import.meta.url),svg);
console.log('svg written');
