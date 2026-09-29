import fs from 'node:fs';
const FILE = process.argv[2] || 'sim-results.json';
const r = JSON.parse(fs.readFileSync(new URL('./' + FILE, import.meta.url)));
const med = a => { a = a.filter(x => x != null).sort((x, y) => x - y); return a.length ? a[Math.floor(a.length / 2)] : null; };
const mean = a => { a = a.filter(x => x != null); return a.length ? a.reduce((s, x) => s + x, 0) / a.length : null; };
const q = (a, p) => { a = a.filter(x => x != null).sort((x, y) => x - y); return a.length ? a[Math.min(a.length - 1, Math.floor(a.length * p))] : null; };
const min = t => t == null ? '-' : (t * 0.7 / 60).toFixed(1);
const fmt = (a) => a.filter(x=>x!=null).length ? `${min(med(a))} (${min(q(a,0.1))}-${min(q(a,0.9))}) n=${a.filter(x=>x!=null).length}` : 'ไม่ถึง';
const out = [];
for (const k of Object.keys(r)) {
  const R = r[k]; if (!R.length) continue;
  out.push(`\n### ${k} (n=${R.length})`);
  out.push(`จบเกมชนะ: ${R.filter(m => String(m.over).startsWith('win')).length}/${R.length} · ล้มละลาย: ${R.filter(m => m.over === 'coin').length} · dad-game-over: ${R.filter(m => m.over === 'dad').length} · timeout(ตัน): ${R.filter(m => m.over === 'timeout').length}`);
  out.push(`เวลาที่เปิดศาล (นาที, median (p10-p90)):`);
  for (const l of [2, 3, 4, 5]) out.push(`  ถึงขั้น ${l}: ${fmt(R.map(m => m.levelAt[l]))}`);
  for (const z of ['th', 'asia', 'west', 'cyberhell']) {
    out.push(`  บอส ${z}: พร้อม ${fmt(R.map(m => m.bossReadyAt[z]))} · ชนะ ${fmt(R.map(m => m.bossWinAt[z]))} · ครั้งที่ลอง(med) ${med(R.map(m => m.bossTries[z]))}`);
  }
  out.push(`  ชนะทั้งเกม: ${fmt(R.map(m => String(m.over).startsWith('win') ? m.endTick : null))}`);
  out.push(`  เบี้ยติดลบ (tick ที่ coin<0, med): ${med(R.map(m => m.negCoinTicks))} · minCoin p10: ${q(R.map(m => m.minCoin), 0.1)} · runs ที่เคยติดลบ: ${R.filter(m => m.negCoinTicks > 0).length}`);
  out.push(`  คิวยาวสุด (med / p90): ${med(R.map(m => m.maxQueue))} / ${q(R.map(m => m.maxQueue), 0.9)} · % tick คิว>=6: ${(100 * mean(R.map(m => m.ticksQueueGE6 / m.ticks))).toFixed(1)}`);
  out.push(`  ระเบียบ tier% [>=80,55-79,30-54,<30]: ${[0,1,2,3].map(i => (100 * mean(R.map(m => m.orderTier[i] / m.ticks))).toFixed(1)).join(' / ')}`);
  out.push(`  ระเบียบตกเตือน(3 ครั้ง=พ่อลง): runs ที่โดน ≥1: ${R.filter(m => m.orderWarns >= 1).length} · โดน 3: ${R.filter(m => m.orderWarns >= 3).length} · dadFights med ${med(R.map(m => m.dadFights))} max ${Math.max(...R.map(m => m.dadFights))}`);
  out.push(`  กรรมท่านปลายทาง med ${med(R.map(m => m.karma))} p90 ${q(R.map(m => m.karma), 0.9)}`);
  out.push(`  green% ${mean(R.map(m => m.greenPct)).toFixed(1)} · avgScore ${mean(R.map(m => m.avgScore)).toFixed(1)}`);
  out.push(`  ว่างงาน(ไม่มีอะไรให้ทำ) % tick: ${mean(R.map(m => m.idlePct)).toFixed(1)}`);
  out.push(`  ต่อสู้วิญญาณ/แพ้: ${mean(R.map(m => m.battles.soul)).toFixed(0)} / ${mean(R.map(m => m.battles.soulLost)).toFixed(1)} · ปีศาจ ${mean(R.map(m => m.battles.mob)).toFixed(0)}`);
  out.push(`  ระเบียบ/เสบียงหมด: foodEmpty% ${(100 * mean(R.map(m => m.foodEmptyTicks / m.ticks))).toFixed(1)} · hungerZero% ${(100 * mean(R.map(m => m.hungerZero / m.ticks))).toFixed(1)}`);
}
// flow table (won runs only, per 1000 ticks avg) for careful
for (const k of ['careful', 'sloppy', 'perfect']) {
  if (!r[k] || !r[k].length) continue;
  const R = r[k].filter(m => String(m.over).startsWith('win'));
  if (!R.length) continue;
  const tot = {};
  let ticks = 0;
  for (const m of R) { ticks += m.ticks; for (const [n, f] of Object.entries(m.flow)) { const t = tot[n] ||= { in: 0, out: 0 }; t.in += f.in; t.out += f.out; } }
  out.push(`\n### flow ${k} (เฉพาะรอบที่ชนะ n=${R.length}; ต่อ 100 tick) `);
  const rows = Object.entries(tot).map(([n, f]) => [n, (100 * f.in / ticks).toFixed(1), (100 * f.out / ticks).toFixed(1)]).sort((a, b) => (b[1] - b[2]) - (a[1] - a[2]));
  for (const row of rows) out.push(`  ${row[0].padEnd(14)} in ${String(row[1]).padStart(6)}  out ${String(row[2]).padStart(6)}`);
}
console.log(out.join('\n'));
fs.writeFileSync(new URL('./' + FILE.replace('.json', '-summary.txt'), import.meta.url), out.join('\n'));
