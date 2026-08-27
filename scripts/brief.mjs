#!/usr/bin/env node
/* ประกอบ "สรุปเช้า" จากข้อมูลจริงใน Firestore (agents/*) ออกมาเป็นข้อความสำหรับอ่านออกเสียง
   ใช้:  node brief.mjs                 → สรุปเช้าเต็ม
         node brief.mjs --only ราคา     → เฉพาะบางหมวด (ดวง|อีเมล|งาน|ข่าว|มังงะ|ราคา)
         node brief.mjs | node speak.mjs
   หมวด "ราคา" ดึงสดจาก API ทุกครั้ง (Binance / ทองไทย / Fear&Greed) ไม่ผ่าน Firestore
   หมายเหตุ: พิมพ์ออก stdout อย่างเดียว ไม่เขียนไฟล์ ไม่แตะ Firestore */

const PROJECT = "agapae-studio";
const KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/agents`;

const argv = process.argv.slice(2);
const only = (() => {
  const i = argv.indexOf("--only");
  return i === -1 ? null : argv[i + 1];
})();

/* แปลงค่า Firestore REST → ค่า JS ธรรมดา */
function unwrap(v) {
  if (!v || typeof v !== "object") return v;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(unwrap);
  if ("mapValue" in v) return Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, unwrap(x)]));
  return null;
}

async function doc(name) {
  try {
    const res = await fetch(`${BASE}/${name}?key=${KEY}`);
    if (!res.ok) return null;
    const j = await res.json();
    return Object.fromEntries(Object.entries(j.fields || {}).map(([k, v]) => [k, unwrap(v)]));
  } catch {
    return null;
  }
}

const today = new Date().toISOString().slice(0, 10);
const plusDays = (n) => new Date(Date.now() + n * 86400e3).toISOString().slice(0, 10);
const want = (section) => !only || only === section;

/* 2026-09-06 → "6 ก.ย. 69" ให้เสียงอ่านแล้วเข้าใจ */
const TH_MON = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
const thDate = (iso) => {
  if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return null;
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d} ${TH_MON[m - 1]} ${String(y + 543).slice(-2)}`;
};

/* ---------- ราคา: ดึงสดทุกครั้ง ไม่ใช้ค่าที่ routine แช่ไว้ ---------- */
async function json(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}
const num = (n, d = 0) => Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

async function prices() {
  const [btc, fx, fng, gold] = await Promise.all([
    json("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"),
    json("https://open.er-api.com/v6/latest/USD"),
    json("https://api.alternative.me/fng/?limit=1"),
    json("https://api.chnwt.dev/thai-gold-api/latest"),
  ]);
  const lines = [];
  if (btc?.lastPrice) {
    const usd = Number(btc.lastPrice);
    const pct = Number(btc.priceChangePercent);
    const dir = pct >= 0 ? "ขึ้น" : "ลง";
    const thb = fx?.rates?.THB ? ` คิดเป็นเงินไทยราว ${num(usd * fx.rates.THB / 1e6, 2)} ล้านบาท` : "";
    lines.push(`บิตคอยน์ ${num(usd)} ดอลลาร์ ${dir} ${Math.abs(pct).toFixed(2)} เปอร์เซ็นต์ใน 24 ชั่วโมง${thb}`);
    lines.push(`ช่วง 24 ชั่วโมง สูงสุด ${num(btc.highPrice)} ต่ำสุด ${num(btc.lowPrice)} ดอลลาร์`);
  }
  const f = fng?.data?.[0];
  if (f) {
    const TH = { "Extreme Fear": "กลัวสุดขีด", Fear: "กลัว", Neutral: "กลางๆ", Greed: "โลภ", "Extreme Greed": "โลภสุดขีด" };
    lines.push(`ดัชนีความกลัวความโลภอยู่ที่ ${f.value} คือโซน${TH[f.value_classification] || f.value_classification}`);
  }
  const g = gold?.response?.price;
  /* ".00" ท้ายราคาทองทำให้เสียงอ่าน "จุดศูนย์ศูนย์" ตัดทิ้ง */
  const baht = (v) => String(v).replace(/\.00$/, "");
  if (g) lines.push(`ทองรูปพรรณขายออก ${baht(g.gold.sell)} บาท ทองแท่งขายออก ${baht(g.gold_bar.sell)} บาท`);
  return lines;
}

const out = [];
const push = (head, lines) => {
  const clean = (lines || []).filter(Boolean);
  if (!clean.length) return;
  out.push(head, ...clean, "");
};

const [horo, email, todo, daily, manga, price] = await Promise.all([
  want("ดวง") ? doc("horoscope") : null,
  want("อีเมล") ? doc("email") : null,
  want("งาน") ? doc("todo") : null,
  want("ข่าว") ? doc("daily") : null,
  want("มังงะ") ? doc("manga") : null,
  want("ราคา") ? prices() : null,
]);

const stamp = horo?.date || email?.date || today;
if (!only) out.push(`สวัสดีครับพี่เป้ วันนี้ ${stamp} สรุปเช้าให้ฟังครับ`, "");

if (horo?.items?.length) push("ดวงวันนี้", horo.items);

if (email) {
  const n = email.count ?? 0;
  push("อีเมล", n ? [`มีอีเมลใหม่ ${n} ฉบับ`, ...email.items.slice(0, 5)] : ["ยังไม่มีอีเมลใหม่"]);
}

if (todo?.dataJson) {
  try {
    const t = JSON.parse(todo.dataJson);
    const dated = t.items.filter((i) => i.due);
    const late = dated.filter((i) => i.due < today);
    const now = dated.filter((i) => i.due === today);
    const soon = dated.filter((i) => i.due > today && i.due <= plusDays(7)).sort((a, b) => a.due.localeCompare(b.due));
    const lines = [];
    if (late.length) lines.push(`เลยกำหนด ${late.length} งาน`, ...late.slice(0, 4).map((i) => i.title));
    if (now.length) lines.push(`วันนี้มี ${now.length} งาน`, ...now.map((i) => i.title));
    if (soon.length) lines.push(`ใน 7 วันข้างหน้า`, ...soon.slice(0, 4).map((i) => `${thDate(i.due) || i.when} ${i.title}`));
    if (!lines.length) lines.push(`ไม่มีงานที่ถึงกำหนดใน 7 วันนี้ ค้างในลิสต์ทั้งหมด ${t.items.length} รายการ`);
    push("งาน", lines);
  } catch {}
}

if (price?.length) push("ราคาตอนนี้", price);

if (daily?.items?.length) {
  /* ข่าวที่ routine แช่ไว้มีบรรทัดทอง+BTC อยู่ด้วย ถ้าดึงราคาสดมาได้แล้วก็ไม่ต้องอ่านซ้ำ */
  const items = price?.length ? daily.items.filter((t) => !/ทอง|Bitcoin|BTC/i.test(t)) : daily.items;
  push("ข่าววันนี้", items.slice(0, 6));
}

if (manga?.dataJson) {
  try {
    const m = JSON.parse(manga.dataJson);
    const hot = m.series.filter((s) => s.nextAt === today || (s.releasedAt && s.releasedAt >= plusDays(-2)));
    if (hot.length) push("มังงะ", hot.map((s) => (s.nextAt === today ? `${s.title} ตอน ${s.next} ออกวันนี้` : `${s.title} ตอน ${s.latest} ออกแล้ว`)));
    else if (only === "มังงะ")
      push("มังงะ", m.series.map((s) => {
        const next = thDate(s.nextAt);
        return `${s.title} ล่าสุดตอน ${s.latest}` + (next ? ` ตอนหน้า ${next}` : " ยังไม่ประกาศตอนหน้า");
      }));
  } catch {}
}

if (!out.length) {
  console.error("ดึงข้อมูลไม่ได้ หรือไม่มีอะไรจะสรุป");
  process.exit(1);
}
console.log(out.join("\n").trim());
