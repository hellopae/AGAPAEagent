#!/usr/bin/env node
/* =====================================================================
   hook-skill.mjs — เก็บเกี่ยว skill อัตโนมัติหลังทำงานใหญ่จบ

   Stop → node hook-skill.mjs stop
       อ่าน transcript ของ session ดูว่ารอบนี้ "ทำงานใหญ่" ไหม
       (แก้ไฟล์หลายไฟล์ / เรียก agent / เขียน SOP-Output)
       ถ้าใหญ่พอแต่ยังไม่มีใครแตะ .claude/skills/ เลย → block 1 ครั้ง
       ให้ตัดสินใจว่าจะเก็บวิธีทำเป็น skill ไหม (เกณฑ์อยู่ใน skill `skill-harvest`)

   บล็อกได้ครั้งเดียวต่อ session เท่านั้น — ตอบว่า "ไม่เข้าเกณฑ์ เพราะ…" ก็จบเทิร์นได้
   ไม่มีทางวนลูป

   state เก็บที่ scripts/.skill-state.json (ไม่ commit)
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATE_FILE = join(ROOT, "scripts", ".skill-state.json");
const mode = process.argv[2] || "stop";

/* ---------- เกณฑ์ว่า "งานใหญ่" ---------- */
const MIN_FILES = 3;   // แก้/สร้างไฟล์ตั้งแต่กี่ไฟล์ขึ้นไปถือว่างานใหญ่
const WRITE_TOOLS = new Set(["Write", "Edit", "MultiEdit", "NotebookEdit"]);
const AGENT_TOOLS = new Set(["Task", "Agent"]);
// ไฟล์พวกนี้เป็นผลพลอยได้ของทุก session ไม่นับเป็นเนื้องาน
const NOISE = [
  "/status.json", "/worklog.json", "/scripts/.gate-state.json",
  "/scripts/.skill-state.json", "/.DS_Store",
];

function out(obj) { process.stdout.write(JSON.stringify(obj)); process.exit(0); }
function loadState() {
  try { return JSON.parse(readFileSync(STATE_FILE, "utf8")); } catch { return { sessions: {} }; }
}
function saveState(db, sid, s) {
  s.updatedAt = new Date().toISOString();
  db.sessions[sid] = s;
  const keys = Object.keys(db.sessions);
  if (keys.length > 20) {
    keys.sort((a, b) => (db.sessions[a].updatedAt || "").localeCompare(db.sessions[b].updatedAt || ""));
    for (const k of keys.slice(0, keys.length - 20)) delete db.sessions[k];
  }
  try { writeFileSync(STATE_FILE, JSON.stringify(db, null, 2)); } catch { /* เขียนไม่ได้ก็ช่างมัน */ }
}

/* ---------- อ่าน event ---------- */
let ev = {};
try { ev = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch { process.exit(0); }
const sid = ev.session_id || "no-session";

/* ---------- โหมด skip: บันทึกว่าเทิร์นนี้ตัดสินใจไม่เก็บ พร้อมเหตุผล ---------- */
if (mode === "skip") {
  const db = loadState();
  const s = db.sessions[sid] || {};
  s.decided = "skip";
  s.reason = process.argv.slice(3).join(" ") || "(ไม่ระบุเหตุผล)";
  saveState(db, sid, s);
  process.exit(0);
}

if (mode !== "stop") process.exit(0);

/* ---------- กันลูป ---------- */
if (ev.stop_hook_active) process.exit(0);

const db = loadState();
const st = db.sessions[sid] || { asked: false };
if (st.asked) process.exit(0);   // ถามไปแล้วใน session นี้ ไม่ถามซ้ำ

/* ---------- อ่าน transcript หาว่ารอบนี้ทำอะไรไปบ้าง ---------- */
const tpath = ev.transcript_path;
if (!tpath || !existsSync(tpath)) process.exit(0);

let raw;
try { raw = readFileSync(tpath, "utf8"); } catch { process.exit(0); }

const files = new Set();
let agentCalls = 0;
let touchedSkills = false;

function scan(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) { for (const x of node) scan(x); return; }
  if (node.type === "tool_use" && typeof node.name === "string") {
    const inp = node.input || {};
    if (AGENT_TOOLS.has(node.name)) agentCalls += 1;
    if (WRITE_TOOLS.has(node.name) && typeof inp.file_path === "string") {
      const p = inp.file_path;
      if (p.includes("/.claude/skills/")) touchedSkills = true;
      else if (!NOISE.some((n) => p.endsWith(n))) files.add(p);
    }
    // งานที่ทำผ่าน Bash (heredoc/sed) — จับแบบหยาบๆ พอให้รู้ว่าแตะ skill ไหม
    if (node.name === "Bash" && typeof inp.command === "string" && inp.command.includes("/.claude/skills/")) {
      touchedSkills = true;
    }
  }
  for (const k of Object.keys(node)) {
    if (k === "input" || k === "type" || k === "name") continue;
    scan(node[k]);
  }
}

for (const line of raw.split("\n")) {
  if (!line.trim()) continue;
  try { scan(JSON.parse(line)); } catch { /* บรรทัดเสีย ข้ามไป */ }
}

/* ---------- ตัดสิน ---------- */
if (touchedSkills) process.exit(0);                       // เก็บ skill ไปแล้วรอบนี้
const big = files.size >= MIN_FILES || agentCalls >= 1;
if (!big) process.exit(0);                                // งานเล็ก ไม่ต้องถาม

st.asked = true;
st.at = new Date().toISOString();
st.files = [...files].slice(0, 12);
st.agentCalls = agentCalls;
saveState(db, sid, st);

const why = [
  agentCalls ? `เรียก agent ${agentCalls} ครั้ง` : null,
  files.size ? `แตะไฟล์ ${files.size} ไฟล์` : null,
].filter(Boolean).join(" · ");

out({
  decision: "block",
  reason:
    `🧠 SKILL HARVEST (ถามครั้งเดียวต่อ session) — งานรอบนี้เข้าเกณฑ์งานใหญ่ (${why}) ` +
    `แต่ยังไม่มีใครแตะ \`.claude/skills/\` เลย\n\n` +
    `ก่อนจบเทิร์น ตัดสินใจ 1 ข้อ — ใช้ skill \`skill-harvest\` เป็นเกณฑ์:\n\n` +
    `**ถ้ารอบนี้ได้ "วิธีทำ" ที่จะใช้ซ้ำอีก** (มีลำดับขั้นที่ทำผิดลำดับแล้วพัง / มีกับดักที่เพิ่งเสียเวลาไป / ` +
    `เป็นงานที่จะเกิดอีกแน่ๆ) → เขียนหรืออัปเดต \`.claude/skills/<ชื่อ>/SKILL.md\` ตอนนี้เลย ` +
    `แล้วบอก Kittanate 1 บรรทัดว่าเก็บอะไรไว้\n\n` +
    `**ถ้าไม่เข้าเกณฑ์** (งานครั้งเดียว / เป็นข้อมูลผลลัพธ์ไม่ใช่วิธีทำ / skill เดิมครอบคลุมอยู่แล้ว) → ` +
    `ไม่ต้องเขียน บอก Kittanate สั้นๆ ว่าทำไมไม่เก็บ แล้วจบเทิร์นได้เลย ` +
    `hook จะไม่ถามซ้ำใน session นี้\n\n` +
    `ไฟล์ที่แตะรอบนี้: ${st.files.join(", ")}${files.size > 12 ? " …" : ""}`,
});
