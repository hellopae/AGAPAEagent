#!/usr/bin/env node
/* =====================================================================
   build-meeting.mjs — ตัวประกอบ + ตัววาลิเดต "บันทึกการประชุม" → meetings.json + Firestore

   ปรัชญาของสคริปต์นี้ (อ่านก่อนแก้):
   สคริปต์ "ไม่อ่านความหมาย" ของไฟล์ใน Output/ — การสรุปว่าใครเสนออะไร ค้านใคร
   เป็นงานที่ต้องเข้าใจภาษาไทย regex ทำไม่ได้ และไม่ควรเดา
   → คนป้อนเนื้อหาคือ **agent (Libby)** ที่อ่านไฟล์จริงแล้วเขียนเป็น JSON
   → หน้าที่ของสคริปต์คือ ตรวจ (validate) + เติมฟิลด์ที่คำนวณได้ (normalize) + เขียน (write)
   ถ้าเนื้อหาไม่ครบหรืออ้างไฟล์/agent ที่ไม่มีจริง → error ชัด ๆ ไม่เขียนขยะลงไฟล์

   คำสั่ง
     node scripts/build-meeting.mjs template --id <YYYY-MM-DD-slug> --topic "…" \
          --files Output/Minnie/a.md,Output/Nick/b.md [--sop SOP-05] [--out draft.json]
         → พิมพ์โครง JSON ที่เติม agent/file ให้แล้ว รอ agent เติมเนื้อหาในช่องว่าง

     node scripts/build-meeting.mjs add <draft.json> [--replace] [--dry-run] [--no-firestore]
         → validate → เขียนลง meetings.json (record ใหม่อยู่บนสุด) → เขียน Firestore agents/meetings

     node scripts/build-meeting.mjs add --stdin  (รับ JSON ทาง stdin)

     node scripts/build-meeting.mjs validate [file.json]
         → ตรวจอย่างเดียว ไม่เขียนอะไร (ไม่ใส่ไฟล์ = ตรวจ meetings.json ทั้งก้อน)

   สคริปต์นี้ **ไม่ git commit/push** — hook (`hook-status.mjs`) หรือ Claudy จัดการตอนจบเทิร์น
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MEETINGS_FILE = join(ROOT, "meetings.json");
const STATUS_FILE = join(ROOT, "status.json");
/* schemaVersion 2 (31 ก.ค. 2026): verified(boolean) → factcheck(pending|passed|failed),
   เพิ่ม severity/quote/impact ใน disagreements, stance + factcheckFile ต่อ entry,
   participants กลายเป็น optional (derive จาก entries), decisions รับ object ได้ */
const SCHEMA_VERSION = 2;
const FS_PROJECT = "agapae-studio";
const FS_KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";

/* ---------- ทะเบียน agent: ใช้ status.json เป็นแหล่งความจริงเดียว ----------
   (agent ใหม่ที่เพิ่มตาม SOP-09 จะโผล่ที่นี่เองโดยไม่ต้องแก้สคริปต์) */
function loadAgents() {
  let db;
  try {
    db = JSON.parse(readFileSync(STATUS_FILE, "utf8"));
  } catch (e) {
    fail(`อ่าน status.json ไม่ได้: ${e.message}`);
  }
  const map = new Map();
  for (const a of db.agents || []) {
    if (!a?.id) continue;
    const name = a.name || a.id[0].toUpperCase() + a.id.slice(1);
    map.set(a.id, { id: a.id, name, img: a.img || `avatars/${name}.png`, pipeline: a.pipeline || "standalone" });
  }
  if (!map.size) fail("status.json ไม่มี agent เลย — ระบบผิดปกติ");
  return map;
}

/* ---------- ค่าที่ "แนะนำ" (ไม่ใช่บังคับ) — ไม่ตรงจะเตือน ไม่ error ----------
   เพราะ UI ใช้ค่าพวกนี้เลือกสี badge ถ้าเจอค่าแปลกให้ UI fallback เป็นสีกลาง */
const KNOWN_STATUS = ["กำลังประชุม", "รอ Kittanate ตัดสินใจ", "ตัดสินใจแล้ว", "เก็บเข้าคลัง"];
const KNOWN_ROLES = ["เสนอไอเดีย", "ตรวจสอบข้อเท็จจริง", "ประเมินต้นทุน", "ประเมินเทคนิค", "ออกแบบ", "QA", "จัดระบบ/สรุป"];

/* ---------- enum ปิด (ต่างจาก status/role ที่เป็นข้อความอิสระ) ----------
   3 ชุดนี้ UI ใช้ "เรียงลำดับ" และ "เลือกสี" ไม่ใช่แค่แสดงผล
   ค่าที่พิมพ์ผิดจึงต้อง error ไม่ใช่เตือน — ไม่งั้น blocker จะกลายเป็น challenge เงียบ ๆ
   แล้วของที่ทำงานพังจะไปโผล่ล่างสุดของหน้าโดยไม่มีใครรู้ */
const SEVERITIES = ["blocker", "challenge", "note"];
const SEVERITY_DEFAULT = "challenge"; // ไม่ระบุ = ระดับกลาง (ไม่ปั้นให้แรงขึ้น ไม่กลบให้เบาลง)
const FACTCHECKS = ["pending", "passed", "failed"];
const STANCES = ["propose", "support", "oppose", "neutral"];

const ID_RE = /^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SOP_RE = /^SOP-\d{2}$/;

const errs = [];
const warns = [];
const err = (m) => errs.push(m);
const warn = (m) => warns.push(m);
function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

/* =====================================================================
   VALIDATE + NORMALIZE
   คืน record ที่จัดฟิลด์เรียบร้อยแล้ว (หรือโยน error รวมทีเดียว)
   ===================================================================== */
function normalizeMeeting(raw, agents, { where = "meeting" } = {}) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    err(`${where}: ต้องเป็น object`);
    return null;
  }
  // ฟิลด์ที่ขึ้นต้นด้วย _ คือหมายเหตุสำหรับคนกรอก — ตัดทิ้งตอนเขียนจริง
  const m = Object.fromEntries(Object.entries(raw).filter(([k]) => !k.startsWith("_")));

  const str = (v) => (typeof v === "string" ? v.trim() : "");
  const arr = (v) => (Array.isArray(v) ? v : null);

  // --- id / date ---
  const id = str(m.id);
  if (!id) err(`${where}: ขาด "id"`);
  else if (!ID_RE.test(id)) err(`${where}: "id" ต้องเป็นรูปแบบ YYYY-MM-DD-slug (ตัวพิมพ์เล็ก) — ได้ "${id}"`);

  let date = str(m.date);
  if (!date && ID_RE.test(id)) date = id.slice(0, 10);
  if (!DATE_RE.test(date)) err(`${where}: "date" ต้องเป็น YYYY-MM-DD — ได้ "${date || "(ว่าง)"}"`);
  else if (ID_RE.test(id) && id.slice(0, 10) !== date) err(`${where}: "date" (${date}) ไม่ตรงกับวันที่ใน id (${id.slice(0, 10)})`);

  // --- ฟิลด์ข้อความหลัก ---
  const topic = str(m.topic);
  if (!topic) err(`${where}: ขาด "topic" (หัวข้อประชุม)`);
  const conclusion = str(m.conclusion);
  if (!conclusion) err(`${where}: ขาด "conclusion" — ประชุมแล้วต้องมีข้อสรุป ถ้ายังไม่สรุปให้เขียนว่ายังไม่สรุปเพราะอะไร`);

  const status = str(m.status);
  if (!status) err(`${where}: ขาด "status"`);
  else if (!KNOWN_STATUS.includes(status)) warn(`${where}: "status" = "${status}" ไม่อยู่ในชุดที่ UI รู้จัก (${KNOWN_STATUS.join(" / ")}) — badge จะเป็นสีกลาง`);

  const sop = str(m.sop);
  if (sop && !SOP_RE.test(sop)) {
    err(`${where}: "sop" ต้องเป็นรูปแบบ SOP-05 — ได้ "${sop}"`);
  } else if (sop && !listDir(join(ROOT, "SOP")).some((f) => f.startsWith(sop + "-"))) {
    warn(`${where}: ไม่พบไฟล์ที่ขึ้นต้นด้วย "${sop}-" ในโฟลเดอร์ SOP/`);
  }

  // --- entries (อ่านก่อน participants เพราะ participants derive จากตรงนี้ได้) ---
  const rawEntries = arr(m.entries);
  if (!rawEntries || !rawEntries.length) err(`${where}: "entries" ต้องมีอย่างน้อย 1 รายการ — บันทึกประชุมที่ไม่มีใครพูดคือ worklog ไม่ใช่ meeting`);

  /* --- participants ---
     ไม่ใส่มาก็ได้ → derive จาก entries[].agent (ข้อมูลซ้ำสองที่มีวันขัดกันเอง)
     ใส่มาก็ยังตรวจตามเดิม — กรณีที่ต้องใส่คือมีคนร่วมประชุมแต่ไม่ได้เขียนเอกสาร
     (เช่น Claudy สั่งงาน) ซึ่ง derive เอาเองไม่ได้ */
  const derivedParticipants = [...new Set((rawEntries || []).map((e) => (e && typeof e === "object" ? String(e.agent ?? "").trim() : "")).filter(Boolean))];
  const givenParticipants = arr(m.participants);
  const participants = givenParticipants ? givenParticipants.map((p) => String(p).trim()).filter(Boolean) : derivedParticipants;
  if (!participants.length) err(`${where}: "participants" ว่างและ derive จาก entries ไม่ได้ — ต้องมีอย่างน้อย 1 คน`);
  for (const p of participants) {
    if (!agents.has(p)) err(`${where}: participant "${p}" ไม่มีใน status.json (agent ที่มีจริง: ${[...agents.keys()].join(", ")})`);
  }
  if (new Set(participants).size !== participants.length) err(`${where}: "participants" มีชื่อซ้ำ`);

  const seenAgents = new Set();
  const entries = (rawEntries || []).map((e0, i) => {
    const at = `${where}.entries[${i}]`;
    if (!e0 || typeof e0 !== "object") { err(`${at}: ต้องเป็น object`); return null; }
    const e = Object.fromEntries(Object.entries(e0).filter(([k]) => !k.startsWith("_")));

    const agentId = str(e.agent);
    if (!agentId) err(`${at}: ขาด "agent"`);
    else if (!agents.has(agentId)) err(`${at}: agent "${agentId}" ไม่มีใน status.json`);
    else {
      if (!participants.includes(agentId)) err(`${at}: agent "${agentId}" ไม่อยู่ใน participants — ตัวกรองบน dashboard จะพัง`);
      if (seenAgents.has(agentId)) warn(`${at}: agent "${agentId}" มีหลาย entry ในประชุมเดียว — ตั้งใจหรือเปล่า`);
      seenAgents.add(agentId);
    }

    const role = str(e.role);
    if (!role) err(`${at}: ขาด "role" (บทบาทในประชุมนี้ เช่น "เสนอไอเดีย")`);
    else if (!KNOWN_ROLES.includes(role)) warn(`${at}: "role" = "${role}" เป็นค่าใหม่ (ที่ใช้อยู่: ${KNOWN_ROLES.join(" / ")})`);

    const proposal = str(e.proposal);
    if (!proposal) err(`${at}: ขาด "proposal" — ต้องสรุปว่าคนนี้เสนออะไร 2-4 บรรทัด`);
    else if (proposal.length > 600) warn(`${at}: "proposal" ยาว ${proposal.length} ตัวอักษร — ตั้งใจให้ 2-4 บรรทัด (~300) การ์ดบน dashboard จะล้น`);

    /* stance — enum คู่กับ role (role เป็นข้อความอิสระ เอามาเลือกสี pill ไม่ได้)
       ไม่ใส่ก็ได้: UI derive เอง (มี disagreements = ค้าน / ไม่มี = เสนอ) */
    let stance = str(e.stance).toLowerCase() || null;
    if (stance && !STANCES.includes(stance)) {
      err(`${at}: "stance" = "${e.stance}" ต้องเป็นค่าใดค่าหนึ่งใน ${STANCES.join(" / ")} (หรือไม่ใส่เลยให้ UI เดาจาก disagreements)`);
      stance = null;
    }

    const keyPoints = (arr(e.keyPoints) || []).map((k) => String(k).trim()).filter(Boolean);
    if (arr(e.keyPoints) === null && e.keyPoints !== undefined) err(`${at}: "keyPoints" ต้องเป็น array ของข้อความ`);

    const disagreements = (arr(e.disagreements) || []).map((d, j) => {
      const dat = `${at}.disagreements[${j}]`;
      if (!d || typeof d !== "object") { err(`${dat}: ต้องเป็น object { with, severity, point }`); return null; }
      const w = str(d.with), point = str(d.point);
      if (!w) err(`${dat}: ขาด "with" (ไม่เห็นด้วยกับใคร)`);
      else if (!agents.has(w)) err(`${dat}: "with" = "${w}" ไม่มีใน status.json`);
      else if (!participants.includes(w)) err(`${dat}: "with" = "${w}" ไม่ได้อยู่ในประชุมนี้ — ค้านคนที่ไม่ได้เข้าประชุมไม่ได้`);
      else if (w === agentId) err(`${dat}: "with" ชี้กลับมาที่ตัวเอง (${w})`);
      if (!point) err(`${dat}: ขาด "point" — ต้องระบุว่าเห็นต่างเรื่องอะไร`);

      let severity = str(d.severity).toLowerCase();
      if (!severity) {
        severity = SEVERITY_DEFAULT;
        warn(`${dat}: ไม่ได้ระบุ "severity" — ใช้ "${SEVERITY_DEFAULT}" ให้ (ระบุเองได้: ${SEVERITIES.join(" / ")})`);
      } else if (!SEVERITIES.includes(severity)) {
        err(`${dat}: "severity" = "${d.severity}" ต้องเป็น ${SEVERITIES.join(" / ")} — UI ใช้ค่านี้เรียงลำดับความแรง`);
        severity = SEVERITY_DEFAULT;
      }
      // quote/impact = optional; quote คือประโยคจริงจากไฟล์ ห้ามเรียบเรียงใหม่
      return { with: w, severity, point, quote: str(d.quote), impact: str(d.impact) };
    }).filter(Boolean);
    if (arr(e.disagreements) === null && e.disagreements !== undefined) err(`${at}: "disagreements" ต้องเป็น array`);

    const file = str(e.file).replace(/\\/g, "/");
    if (!file) err(`${at}: ขาด "file" — ต้องอ้างไฟล์ผลงานจริงใน Output/`);
    else if (!file.startsWith("Output/")) err(`${at}: "file" ต้องเป็น path จาก root ที่ขึ้นต้นด้วย Output/ — ได้ "${file}"`);
    else if (!existsSync(join(ROOT, file))) err(`${at}: ไม่พบไฟล์ "${file}" บนดิสก์ — พิมพ์ path ผิด หรือยังไม่ได้เซฟผลงาน`);

    /* factcheck — แทน verified(boolean) ตั้งแต่ schemaVersion 2
       เหตุผล: gate ของเรามี 3 สถานะจริง (⚠️ ยังไม่ตรวจ / ✅ ผ่าน / ❌ ไม่ผ่าน)
       boolean แยก "ยังไม่ตรวจ" กับ "ตรวจแล้วไม่ผ่าน" ไม่ออก ซึ่งเป็นคนละเรื่องกันคนละขั้ว */
    let factcheck = str(e.factcheck).toLowerCase();
    if (!factcheck && e.verified !== undefined) {
      factcheck = e.verified === true ? "passed" : "pending";
      warn(`${at}: "verified" เป็นฟิลด์เก่า (schemaVersion 1) — แปลงเป็น "factcheck": "${factcheck}" ให้แล้ว`);
    }
    if (!factcheck) factcheck = "pending";
    else if (!FACTCHECKS.includes(factcheck)) {
      err(`${at}: "factcheck" = "${e.factcheck}" ต้องเป็น ${FACTCHECKS.join(" / ")}`);
      factcheck = "pending";
    }

    // อ้างไฟล์ผล fact-check ของ Reese (optional) — มีไว้ให้กดจากป้ายสถานะไปอ่านของจริงได้
    const factcheckFile = str(e.factcheckFile).replace(/\\/g, "/");
    if (factcheckFile) {
      if (!factcheckFile.startsWith("Output/")) err(`${at}: "factcheckFile" ต้องขึ้นต้นด้วย Output/ — ได้ "${factcheckFile}"`);
      else if (!existsSync(join(ROOT, factcheckFile))) err(`${at}: ไม่พบไฟล์ fact-check "${factcheckFile}" บนดิสก์`);
    } else if (factcheck !== "pending") {
      warn(`${at}: "factcheck" = "${factcheck}" แต่ไม่ได้อ้าง "factcheckFile" — ผลตรวจอยู่ไฟล์ไหน`);
    }

    const a = agents.get(agentId);
    return {
      agent: agentId,
      // แคชชื่อ/รูปไว้ให้ผู้อ่านไฟล์ที่ไม่มีทะเบียน agent (Firestore client, สคริปต์อื่น)
      // — dashboard ใช้ AGENTS ของตัวเองก่อนเสมอ ค่านี้เป็นแค่ทางถอย
      agentName: a?.name ?? agentId,
      agentImg: a?.img ?? `avatars/${agentId}.png`,
      role,
      stance,
      proposal,
      keyPoints,
      disagreements,
      file,
      factcheck,
      factcheckFile: factcheckFile || null,
    };
  }).filter(Boolean);

  for (const p of participants) {
    if (!seenAgents.has(p)) warn(`${where}: participant "${p}" ไม่มี entry — ถ้าไม่ได้พูดอะไรก็ไม่ควรอยู่ใน participants`);
  }

  /* --- decisions ---
     รับได้ 2 แบบ: ข้อความล้วน หรือ { question, options?, owner? }
     (ของเดิมเป็น string ทั้งหมด — ต้องไม่พังตอนอ่านย้อนหลัง) */
  const decisions = (arr(m.decisions) || []).map((d, j) => {
    if (typeof d === "string") return d.trim();
    if (d && typeof d === "object" && !Array.isArray(d)) {
      const q = str(d.question);
      if (!q) { err(`${where}.decisions[${j}]: object ต้องมี "question"`); return null; }
      const options = (arr(d.options) || []).map((o) => String(o).trim()).filter(Boolean);
      const owner = str(d.owner);
      if (owner && !agents.has(owner) && owner !== "kittanate") warn(`${where}.decisions[${j}]: "owner" = "${owner}" ไม่ใช่ agent ใน status.json (ใส่ "kittanate" ได้ถ้าเป็นเจ้าของกิจการ)`);
      return { question: q, options, owner: owner || null };
    }
    err(`${where}.decisions[${j}]: ต้องเป็นข้อความ หรือ object { question, options?, owner? }`);
    return null;
  }).filter((d) => d && (typeof d !== "string" || d.length));
  if (arr(m.decisions) === null && m.decisions !== undefined) err(`${where}: "decisions" ต้องเป็น array`);
  if (status === "รอ Kittanate ตัดสินใจ" && !decisions.length) {
    warn(`${where}: status บอกว่ารอ Kittanate ตัดสินใจ แต่ "decisions" ว่าง — รอตัดสินใจเรื่องอะไร`);
  }

  return {
    id,
    topic,
    date,
    sop: sop || null,
    status,
    participants,
    entries,
    conclusion,
    decisions,
    createdAt: typeof m.createdAt === "string" && m.createdAt ? m.createdAt : new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    updatedAt: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
  };
}

function listDir(p) { try { return readdirSync(p); } catch { return []; } }

function reportIssues(strict = true) {
  for (const w of warns) console.warn(`⚠️  ${w}`);
  if (errs.length) {
    console.error(`\n❌ ไม่ผ่าน validate (${errs.length} ข้อ) — ไม่เขียนไฟล์:`);
    for (const e of errs) console.error(`   • ${e}`);
    console.error("");
    if (strict) process.exit(1);
    return false;
  }
  return true;
}

/* =====================================================================
   FIRESTORE (แบบเดียวกับ hook-status.mjs — REST + API key)
   ต่างกันตรงเดียว: worklog ใช้ arrayUnion (append อย่างเดียว)
   แต่ meeting ถูก "แก้ทีหลัง" ได้ (factcheck / conclusion) → arrayUnion จะกลายเป็นของซ้ำ
   จึง PATCH ทั้ง array แทน เป็น idempotent
   ===================================================================== */
function fsVal(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: v } : { doubleValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(fsVal) } };
  if (typeof v === "object") return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, val]) => [k, fsVal(val)])) } };
  return { stringValue: String(v) };
}

async function pushFirestore(doc) {
  const fields = {
    meetings: fsVal(doc.meetings),
    updatedAt: fsVal(doc.updatedAt),
    schemaVersion: fsVal(doc.schemaVersion ?? SCHEMA_VERSION),
    source: fsVal(doc.source || "meetings.json"),
  };
  const mask = Object.keys(fields).map((k) => `updateMask.fieldPaths=${k}`).join("&");
  const url = `https://firestore.googleapis.com/v1/projects/${FS_PROJECT}/databases/(default)/documents/agents/meetings?key=${FS_KEY}&${mask}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    console.warn(`⚠️  เขียน Firestore ไม่สำเร็จ (${res.status}) — meetings.json ในเครื่องอัปเดตแล้ว`);
    console.warn(`   ${(await res.text()).slice(0, 300)}`);
    return false;
  }
  return true;
}

/* ---------- ไฟล์ meetings.json ---------- */
function loadStore() {
  if (!existsSync(MEETINGS_FILE)) return { schemaVersion: SCHEMA_VERSION, source: "meetings.json", updatedAt: null, meetings: [] };
  try {
    const s = JSON.parse(readFileSync(MEETINGS_FILE, "utf8"));
    if (!Array.isArray(s.meetings)) throw new Error('ไม่มี array "meetings"');
    return { schemaVersion: s.schemaVersion ?? 1, source: s.source || "meetings.json", updatedAt: s.updatedAt ?? null, meetings: s.meetings };
  } catch (e) {
    fail(`meetings.json เสีย: ${e.message} — แก้ไฟล์ก่อนแล้วค่อยรันใหม่ (สคริปต์ไม่เขียนทับให้)`);
  }
}
const saveStore = (store) => writeFileSync(MEETINGS_FILE, JSON.stringify(store, null, 2) + "\n");

/* ---------- args ----------
   flag ที่ "กินค่าถัดไป" ต้องประกาศไว้ที่นี่ ตัวอื่นถือเป็น boolean ทั้งหมด
   (ไม่งั้น `add --replace draft.json` จะกลืน draft.json ไปเป็นค่าของ --replace) */
const VALUE_FLAGS = new Set(["id", "topic", "files", "sop", "out"]);
const argv = process.argv.slice(2);
const cmd = argv[0];
const flags = {};
const positional = [];
for (let i = 1; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const name = a.slice(2);
    if (VALUE_FLAGS.has(name)) { flags[name] = argv[++i] ?? null; }
    else flags[name] = true;
  } else positional.push(a);
}
const flag = (name) => (typeof flags[name] === "string" ? flags[name] : null);
const has = (name) => flags[name] !== undefined;

function readJsonArg(label) {
  if (has("stdin")) {
    let raw = "";
    try { raw = readFileSync(0, "utf8"); } catch { fail("อ่าน stdin ไม่ได้"); }
    try { return JSON.parse(raw); } catch (e) { fail(`stdin ไม่ใช่ JSON ที่ถูกต้อง: ${e.message}`); }
  }
  const p = positional[0];
  if (!p) fail(`${label}: ต้องระบุไฟล์ JSON หรือใช้ --stdin`);
  const abs = p.startsWith("/") ? p : join(ROOT, p);
  if (!existsSync(abs)) fail(`ไม่พบไฟล์ ${p}`);
  try { return JSON.parse(readFileSync(abs, "utf8")); } catch (e) { fail(`${p} ไม่ใช่ JSON ที่ถูกต้อง: ${e.message}`); }
}

const USAGE = `
build-meeting.mjs — ประกอบ/ตรวจ บันทึกการประชุม

  template   สร้างโครง JSON ให้ agent กรอกเนื้อหา
             --id <YYYY-MM-DD-slug> --topic "…" --files a.md,b.md [--sop SOP-05] [--out draft.json]
  add        ตรวจแล้วเขียนลง meetings.json + Firestore
             <draft.json> | --stdin  [--replace] [--dry-run] [--no-firestore]
  validate   ตรวจอย่างเดียว  [file.json]  (ไม่ใส่ไฟล์ = ตรวจ meetings.json ทั้งก้อน)
  sync       ดัน meetings.json ที่มีอยู่ขึ้น Firestore agents/meetings (ใช้ตอนซ่อม/seed)
`;

/* =====================================================================
   COMMANDS
   ===================================================================== */
const agents = loadAgents();

if (cmd === "template") {
  const id = flag("id");
  if (!id || !ID_RE.test(id)) fail('template: ต้องมี --id รูปแบบ YYYY-MM-DD-slug เช่น --id 2026-07-30-mirofish');
  const files = (flag("files") || "").split(",").map((f) => f.trim().replace(/\\/g, "/")).filter(Boolean);
  if (!files.length) fail("template: ต้องมี --files ชี้ไฟล์ใน Output/ อย่างน้อย 1 ไฟล์ (คั่นด้วย ,)");

  const entries = files.map((file) => {
    const seg = file.split("/");
    if (seg[0] !== "Output" || seg.length < 3) fail(`template: "${file}" ต้องอยู่ในรูป Output/<Agent>/<ไฟล์>.md`);
    if (!existsSync(join(ROOT, file))) fail(`template: ไม่พบไฟล์ "${file}"`);
    const guess = seg[1].toLowerCase();
    if (!agents.has(guess)) fail(`template: เดา agent จากโฟลเดอร์ "${seg[1]}" ไม่ได้ — ไม่มี id "${guess}" ใน status.json`);
    return {
      agent: guess,
      role: "",
      stance: "",
      proposal: "",
      keyPoints: [],
      disagreements: [],
      file,
      factcheck: "pending",
      factcheckFile: "",
    };
  });

  const draft = {
    _howto: [
      "กรอกช่องว่างจากการอ่านไฟล์ใน field \"file\" ของแต่ละ entry — ห้ามเดาแทนเจ้าของงาน",
      "role: บทบาทในประชุมนี้ เช่น เสนอไอเดีย / ประเมินต้นทุน / ประเมินเทคนิค",
      `stance: ${STANCES.join(" / ")} — ไม่ใส่ก็ได้ UI จะเดาจาก disagreements ให้`,
      "proposal: สรุปว่าคนนี้เสนออะไร 2-4 บรรทัด (~300 ตัวอักษร)",
      `disagreements: [{ with: '<agent id>', severity: '${SEVERITIES.join("|")}', point: '…', quote: '(optional) ประโยคจริงจากไฟล์', impact: '(optional) ค้านแล้วเกิดอะไร' }]`,
      "  severity: blocker = ทำให้ข้อเสนอเดินต่อไม่ได้ · challenge = ค้านสาระสำคัญแต่ยังเดินต่อได้ · note = ข้อสังเกต · ไม่ใส่ = challenge",
      "  quote ต้องเป็นประโยคจริงที่ยกมาจากไฟล์ ห้ามเรียบเรียงใหม่ — ถ้าไม่มีประโยคตรง ๆ ให้เว้นว่าง",
      `factcheck: ${FACTCHECKS.join(" / ")} — "passed"/"failed" ใส่ได้เฉพาะเมื่อมีผล Reese fact-check จริง และควรอ้าง factcheckFile ด้วย`,
      "participants: ไม่ใส่ก็ได้ (สคริปต์ derive จาก entries) — ใส่เมื่อมีคนร่วมประชุมที่ไม่ได้เขียนเอกสาร",
      "decisions: ข้อความ หรือ { question, options: [], owner } ก็ได้",
      "ฟิลด์ที่ขึ้นต้นด้วย _ จะถูกตัดทิ้งตอน add — ใช้เขียนโน้ตได้",
      `agent ที่ใช้ได้: ${[...agents.keys()].join(", ")}`,
    ],
    id,
    topic: flag("topic") || "",
    date: id.slice(0, 10),
    sop: flag("sop") || null,
    status: "รอ Kittanate ตัดสินใจ",
    participants: entries.map((e) => e.agent),
    entries,
    conclusion: "",
    decisions: [],
  };

  const out = JSON.stringify(draft, null, 2) + "\n";
  const outPath = flag("out");
  if (outPath) {
    const abs = outPath.startsWith("/") ? outPath : join(ROOT, outPath);
    writeFileSync(abs, out);
    console.log(`📝 เขียนโครงแล้ว → ${outPath}\n   กรอกเนื้อหาให้ครบ แล้วรัน: node scripts/build-meeting.mjs add ${outPath}`);
  } else {
    process.stdout.write(out);
  }
  process.exit(0);
}

if (cmd === "validate") {
  if (positional[0] || has("stdin")) {
    const raw = readJsonArg("validate");
    normalizeMeeting(raw, agents);
  } else {
    const store = loadStore();
    if (!store.meetings.length) console.log("meetings.json ยังว่าง (0 record) — โครงถูกต้อง");
    const ids = new Set();
    store.meetings.forEach((m, i) => {
      normalizeMeeting(m, agents, { where: `meetings[${i}]` });
      if (m?.id) { if (ids.has(m.id)) err(`id ซ้ำ: ${m.id}`); ids.add(m.id); }
    });
  }
  if (reportIssues()) console.log(`✅ ผ่าน validate${warns.length ? ` (มีคำเตือน ${warns.length} ข้อ)` : ""}`);
  process.exit(0);
}

if (cmd === "sync") {
  const store = loadStore();
  store.meetings.forEach((m, i) => normalizeMeeting(m, agents, { where: `meetings[${i}]` }));
  reportIssues();
  const ok = await pushFirestore(store);
  console.log(ok ? `☁️  ดัน ${store.meetings.length} รายการขึ้น Firestore agents/meetings แล้ว` : "ดัน Firestore ไม่สำเร็จ");
  process.exit(ok ? 0 : 1);
}

if (cmd === "add") {
  const raw = readJsonArg("add");
  const record = normalizeMeeting(raw, agents);
  reportIssues();

  const store = loadStore();
  const dupIdx = store.meetings.findIndex((m) => m?.id === record.id);
  if (dupIdx !== -1 && !has("replace")) {
    fail(`มี meeting id "${record.id}" อยู่แล้วใน meetings.json — ใส่ --replace ถ้าตั้งใจเขียนทับ`);
  }
  if (dupIdx !== -1) {
    // เขียนทับของเดิม แต่รักษา createdAt เดิมไว้ (ประวัติต้องไม่ถูกเลื่อน)
    record.createdAt = store.meetings[dupIdx].createdAt || record.createdAt;
    store.meetings[dupIdx] = record;
  } else {
    store.meetings.unshift(record); // record ใหม่อยู่บนสุด เหมือน worklog.json
  }
  store.updatedAt = record.updatedAt;
  store.schemaVersion = SCHEMA_VERSION;
  store.source = store.source || "meetings.json";

  if (has("dry-run")) {
    console.log("🧪 dry-run — ผ่าน validate แล้ว แต่ไม่เขียนอะไร\n");
    console.log(JSON.stringify(record, null, 2));
    process.exit(0);
  }

  saveStore(store);
  console.log(`✅ ${dupIdx !== -1 ? "อัปเดต" : "เพิ่ม"} meeting "${record.id}" → meetings.json (ทั้งหมด ${store.meetings.length} รายการ)`);
  console.log(`   ผู้เข้าร่วม ${record.participants.length} · entries ${record.entries.length} · เห็นต่าง ${record.entries.reduce((n, e) => n + e.disagreements.length, 0)} จุด`);

  if (has("no-firestore")) {
    console.log("   (ข้าม Firestore ตาม --no-firestore)");
    process.exit(0);
  }
  const ok = await pushFirestore(store);
  console.log(ok ? "☁️  เขียน Firestore agents/meetings แล้ว" : "   ลองใหม่ภายหลังด้วย: node scripts/build-meeting.mjs add <file> --replace");
  process.exit(0);
}

console.log(USAGE);
process.exit(cmd ? 1 : 0);
