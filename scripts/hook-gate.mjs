#!/usr/bin/env node
/* =====================================================================
   hook-gate.mjs — บังคับ quality gate + Definition of Done ด้วยโค้ด ไม่ใช่ด้วยคำสั่งใน SOP

   PreToolUse  (Agent) → node hook-gate.mjs pre
       ปฏิเสธการเรียก Chris QA ถ้ายังมีงานที่มี factual claims ค้างไม่ผ่าน Reese
   SubagentStop        → node hook-gate.mjs agent-done
       บันทึกว่าใครทำงานจบ / ใครผ่าน fact-check / Chris ตัดสินว่าอะไร
   Stop                → node hook-gate.mjs stop
       เช็ค Definition of Done ก่อนปล่อยให้จบเทิร์น — ไม่ครบ = block ให้ทำต่อ

   state เก็บที่ scripts/.gate-state.json (แยกตาม session_id, ไม่ commit)
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATE_FILE = join(ROOT, "scripts", ".gate-state.json");
const mode = process.argv[2] || "stop";

/* ---------- ใครเป็นใคร ---------- */
// ชื่อ agent (frontmatter name) → id สั้นที่ dashboard ใช้
const MAP = {
  "minnie-ideas": "minnie",
  "reese-research": "reese",
  "rae-writer": "rae",
  "vera-design": "vera",
  "chris-qa": "chris",
  "nick-analytics": "nick",
  "claudy": "claudy",
  "news-daily": "news",
  "libby-index": "libby",
  "mind-visual": "mind",
  "dale-devops": "dale",
  "toby-gamedev": "toby",
};
const NAME = {
  minnie: "Minnie", reese: "Reese", rae: "Rae", vera: "Vera", chris: "Chris",
  nick: "Nick", libby: "Libby", mind: "Mind", dale: "Dale", news: "News", claudy: "Claudy",
  toby: "Toby",
};

// output ของ agent เหล่านี้มี factual claims ได้ → ต้องผ่าน Reese ก่อน Chris (CLAUDE.md ข้อ 6)
const FACTUAL = new Set(["minnie", "rae", "nick", "dale", "news", "toby"]);
// งาน pure design/layout — ข้าม fact-check ได้ตาม SOP
const VISUAL = new Set(["vera", "mind", "libby"]);
// agent ที่ควรมีไฟล์ผลงานใน Output/<Name>/ (DoD ข้อ 1)
const WRITES_OUTPUT = new Set(["minnie", "reese", "rae", "vera", "mind", "nick", "dale", "chris", "news", "toby"]);

const MAX_BLOCKS = 3;     // กันลูป: block ได้มากสุด 3 ครั้งต่อ session
const MAX_QA_ROUNDS = 3;  // SOP-01: แก้เกิน 3 รอบยังไม่ผ่าน = หยุด รายงาน Kittanate

/* ---------- อ่าน event ---------- */
let ev = {};
try { ev = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch { process.exit(0); }
const sid = ev.session_id || "no-session";

/* ---------- state ---------- */
function loadState() {
  try { return JSON.parse(readFileSync(STATE_FILE, "utf8")); } catch { return { sessions: {} }; }
}
function blankSession() {
  return {
    updatedAt: new Date().toISOString(),
    ran: [],              // id ของ agent ที่ทำงานจบไปแล้วใน session นี้
    pendingFactCheck: null, // { id, name, task, at } — งานที่มี factual claims ยังไม่ผ่าน Reese
    factCheckedAt: null,
    qa: null,             // { verdict: "PASS"|"FAIL", at, round }
    missingOutput: [],    // ชื่อ agent ที่ยังไม่เจอไฟล์ใน Output/<Name>/
    blocks: 0,
    waived: false,        // Kittanate/Claudy ขอข้ามด้วย [skip-factcheck]
  };
}
function saveState(db, s) {
  s.updatedAt = new Date().toISOString();
  db.sessions[sid] = s;
  // เก็บแค่ 10 session ล่าสุด ไม่ให้ไฟล์บวม
  const keys = Object.keys(db.sessions)
    .sort((a, b) => (db.sessions[b].updatedAt || "").localeCompare(db.sessions[a].updatedAt || ""))
    .slice(0, 10);
  db.sessions = Object.fromEntries(keys.map((k) => [k, db.sessions[k]]));
  try { writeFileSync(STATE_FILE, JSON.stringify(db, null, 2) + "\n"); } catch {}
}

const db = loadState();
const st = db.sessions[sid] || blankSession();

/* ---------- helper ---------- */
function out(obj) { process.stdout.write(JSON.stringify(obj)); process.exit(0); }

// มีไฟล์ใน Output/<Name>/ ที่แก้ล่าสุดภายใน N ชั่วโมงไหม
function hasRecentOutput(name, hours = 6) {
  const dir = join(ROOT, "Output", name);
  if (!existsSync(dir)) return false;
  const cutoff = Date.now() - hours * 3600e3;
  try {
    return readdirSync(dir).some((f) => {
      try { return statSync(join(dir, f)).mtimeMs > cutoff; } catch { return false; }
    });
  } catch { return false; }
}

function gitDirty() {
  try {
    return execFileSync("git", ["-C", ROOT, "status", "--porcelain"], {
      encoding: "utf8", timeout: 10000,
    }).trim();
  } catch { return ""; }
}

/* =====================================================================
   MODE: pre — PreToolUse บน Agent/Task
   ปฏิเสธ Chris ถ้ายังไม่ผ่าน Reese
   ===================================================================== */
if (mode === "pre") {
  const input = ev.tool_input || {};
  const id = MAP[input.subagent_type];
  if (!id) process.exit(0);

  const prompt = `${input.description || ""}\n${input.prompt || ""}`;

  // ทางออกฉุกเฉิน: ระบุ [skip-factcheck] ใน prompt = ยืนยันว่างานนี้ไม่มี factual claims
  if (/\[skip-factcheck\]/i.test(prompt)) {
    st.waived = true;
    st.pendingFactCheck = null;
    saveState(db, st);
    process.exit(0);
  }

  if (id === "chris" && st.pendingFactCheck && !st.waived) {
    const p = st.pendingFactCheck;
    saveState(db, st);
    out({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason:
          `❌ GATE: ข้าม Reese [Fact-check] ไม่ได้ (CLAUDE.md ข้อ 6 / SOP-01 STEP 4)\n\n` +
          `งานของ ${p.name} ("${p.task}") ยังไม่ผ่าน fact-check — ส่ง Chris ตอนนี้ไม่ได้\n\n` +
          `ทำอย่างใดอย่างหนึ่ง:\n` +
          `1. delegate reese-research โหมด [Fact-check] ก่อน โดยแนบไฟล์ผลงานของ ${p.name} ให้ครบ ` +
          `แล้วค่อยเรียก Chris (ผลต้องมาร์กทุก claim เป็น ✅ VERIFIED / ⚠️ UNVERIFIED / ❌ INCORRECT / 💬 OPINION)\n` +
          `2. ถ้างานนี้เป็น pure design/layout ไม่มี factual claim จริงๆ ให้ใส่ [skip-factcheck] ใน prompt ของ Chris พร้อมเหตุผล`,
      },
    });
  }
  process.exit(0);
}

/* =====================================================================
   MODE: agent-done — SubagentStop
   บันทึกสถานะ ไม่ block (ปล่อยให้ Stop hook เป็นคนบังคับ)
   ===================================================================== */
if (mode === "agent-done") {
  const id = MAP[ev.agent_type];
  if (!id) process.exit(0);
  const msg = String(ev.last_assistant_message || "");
  const name = NAME[id] || id;

  if (!st.ran.includes(id)) st.ran.push(id);

  // Reese โหมด fact-check → เคลียร์ค้าง (ดูจากมาร์กเกอร์ที่ scaffold กำหนดไว้)
  if (id === "reese" && /VERIFIED|UNVERIFIED|INCORRECT|fact[- ]?check|แฟกต์เช็ก|ตรวจสอบข้อเท็จจริง/i.test(msg)) {
    st.pendingFactCheck = null;
    st.factCheckedAt = new Date().toISOString();
  }

  // Chris → เก็บ verdict
  if (id === "chris") {
    const fail = /❌\s*FAIL|\bFAIL\b/i.test(msg);
    const pass = /✅\s*PASS|\bPASS\b/i.test(msg);
    const round = (st.qa?.round || 0) + 1;
    st.qa = { verdict: fail && !pass ? "FAIL" : pass ? "PASS" : "UNKNOWN", at: new Date().toISOString(), round };
    if (st.qa.verdict === "FAIL") st.waived = false; // ต้องเข้า gate ใหม่ตั้งแต่ fact-check
  }

  // agent ที่ output มี factual claims ได้ → ตั้งธงรอ fact-check
  if (FACTUAL.has(id)) {
    // ชื่องานมาจาก status.json ที่ hook-status.mjs เขียนไว้ตอน start
    let task = "";
    try {
      const s = JSON.parse(readFileSync(join(ROOT, "status.json"), "utf8"));
      task = s.agents.find((a) => a.id === id)?.task || "";
    } catch {}
    st.pendingFactCheck = {
      id, name,
      task: String(task || msg.split("\n")[0] || "งานล่าสุด").slice(0, 80),
      at: new Date().toISOString(),
    };
    st.factCheckedAt = null;
    st.waived = false;
  }
  if (VISUAL.has(id)) { /* pure design/layout — ไม่ตั้งธง ตาม SOP */ }

  // DoD ข้อ 1: ต้องมีไฟล์ผลงานใน Output/<Name>/
  st.missingOutput = st.missingOutput.filter((n) => n !== name);
  if (WRITES_OUTPUT.has(id) && !hasRecentOutput(name)) st.missingOutput.push(name);

  saveState(db, st);
  process.exit(0);
}

/* =====================================================================
   MODE: stop — Stop hook, ตรวจ Definition of Done
   ===================================================================== */
if (mode === "stop") {
  // session ที่ไม่มี agent ทำงานเลย (เช่นคุยเฉยๆ) → ไม่ต้องตรวจ
  if (!st.ran.length) process.exit(0);
  // ชนเพดานแล้วและเตือนไปแล้ว → เงียบ ไม่งั้นวนไม่จบ
  if (st.blocks >= MAX_BLOCKS && st.capNotified) process.exit(0);

  const blockers = [];
  const notes = [];

  // 1) fact-check ค้าง
  if (st.pendingFactCheck && !st.waived) {
    const p = st.pendingFactCheck;
    blockers.push(
      `งานของ ${p.name} ("${p.task}") ยังไม่ผ่าน Reese [Fact-check] — ` +
      `delegate reese-research ให้ตรวจก่อนปิดงาน (CLAUDE.md ข้อ 6)`
    );
  }

  // 2) Chris ตี FAIL แล้วยังไม่ได้แก้จนผ่าน
  if (st.qa?.verdict === "FAIL") {
    if (st.qa.round >= MAX_QA_ROUNDS) {
      notes.push(
        `Chris ตี FAIL ครบ ${st.qa.round} รอบแล้ว — SOP-01 บอกให้หยุดวนแล้วรายงาน Kittanate ` +
        `พร้อมสรุปข้อติดขัด อย่าวนแก้ต่อ`
      );
    } else {
      blockers.push(
        `Chris QA verdict = ❌ FAIL (รอบที่ ${st.qa.round}) — ส่ง verdict ทั้งฉบับกลับให้ agent เจ้าของงานแก้ ` +
        `ตั้งชื่อเวอร์ชันใหม่ -v${st.qa.round + 1} แล้วเข้า gate ใหม่ตั้งแต่ fact-check`
      );
    }
  }

  // 3) git ยังไม่สะอาด (DoD ข้อ 5) — hook push เป็น detached ให้เวลามันหายใจก่อน
  let dirty = gitDirty();
  if (dirty) {
    execFileSync("sleep", ["2"]);
    dirty = gitDirty();
  }
  if (dirty) {
    const files = dirty.split("\n").slice(0, 8).join("\n");
    blockers.push(
      `git ยังไม่สะอาด (DoD ข้อ 5) — commit + push ขึ้น origin/main เองทันที ไม่ต้องรอ Kittanate สั่ง:\n${files}`
    );
  }

  // 4) ไฟล์ผลงานหาย — เตือน ไม่ block (เป็นการเดาจาก mtime)
  if (st.missingOutput.length) {
    notes.push(
      `ยังไม่เจอไฟล์ผลงานที่แก้ล่าสุดใน Output/ ของ: ${st.missingOutput.join(", ")} — ` +
      `DoD ข้อ 1 กำหนดให้เซฟผลงานเต็มลง Output/<Agent>/YYYY-MM-DD-slug.md`
    );
  }

  if (blockers.length && st.blocks < MAX_BLOCKS) {
    st.blocks += 1;
    saveState(db, st);
    out({
      decision: "block",
      reason:
        `🚦 DoD GATE (ครั้งที่ ${st.blocks}/${MAX_BLOCKS}) — ปิดงานไม่ได้ ยังเหลือ:\n\n` +
        blockers.map((b, i) => `${i + 1}. ${b}`).join("\n\n") +
        (notes.length ? `\n\nหมายเหตุ:\n- ${notes.join("\n- ")}` : ""),
    });
  }

  if (blockers.length) {
    // ชนเพดานแล้ว — ปล่อยจบ แต่เตือนครั้งเดียวให้รายงาน Kittanate ตามจริง
    st.capNotified = true;
    saveState(db, st);
    out({
      hookSpecificOutput: {
        hookEventName: "Stop",
        additionalContext:
          `⚠️ DoD ยังไม่ครบและ gate ชนเพดาน ${MAX_BLOCKS} ครั้งแล้ว — ` +
          `รายงาน Kittanate ตามจริงว่าเหลืออะไร อย่าบอกว่างานเสร็จ:\n- ${blockers.join("\n- ")}`,
      },
    });
  }

  if (notes.length) {
    saveState(db, st);
    out({ hookSpecificOutput: { hookEventName: "Stop", additionalContext: notes.join("\n") } });
  }

  saveState(db, st);
  process.exit(0);
}

process.exit(0);
