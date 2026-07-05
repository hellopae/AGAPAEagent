#!/usr/bin/env node
/* =====================================================================
   hook-status.mjs — Claude Code hook bridge → status.json + worklog.json + Firestore + git push
   PreToolUse  (Task) → node hook-status.mjs start
   PostToolUse (Task) → node hook-status.mjs done
     done: อัปเดต status + เพิ่ม worklog entry (local + Firestore) + git push อัตโนมัติ
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATUS_FILE = join(ROOT, "status.json");
const WORKLOG_FILE = join(ROOT, "worklog.json");
const FS_PROJECT = "agapae-studio";
const FS_KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";
const mode = process.argv[2] === "done" ? "done" : "start";

const MAP = {
  "minnie-ideas":   "minnie",
  "reese-research": "reese",
  "rae-writer":     "rae",
  "vera-design":    "vera",
  "chris-qa":       "chris",
  "nick-analytics": "nick",
  "claudy":         "claudy",
  "news-daily":     "news",
  "libby-index":    "libby",
  "mind-visual":    "mind",
  "dale-devops":    "dale",
};

// ---- read stdin ----
let raw = "";
try { raw = readFileSync(0, "utf8"); } catch { process.exit(0); }
let ev = {};
try { ev = JSON.parse(raw || "{}"); } catch { process.exit(0); }

const input = ev.tool_input || {};
const id = MAP[input.subagent_type];
if (!id) process.exit(0);

// ---- update status.json ----
let db;
try { db = JSON.parse(readFileSync(STATUS_FILE, "utf8")); } catch { process.exit(0); }
const agent = db.agents.find((a) => a.id === id);
if (!agent) process.exit(0);

if (mode === "start") {
  agent.status = "working";
  agent.task = (input.description || input.prompt || "กำลังทำงาน").split("\n")[0].slice(0, 120);
} else {
  agent.status = "done";
  const out = String(ev.tool_response?.content ?? ev.tool_response ?? "").trim();
  if (out) {
    agent.report = {
      when: new Date().toLocaleString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      title: agent.task || "ผลงานล่าสุด",
      body: out.slice(0, 800) + (out.length > 800 ? " …" : ""),
    };
  }
}
db.updatedAt = new Date().toISOString();
try { writeFileSync(STATUS_FILE, JSON.stringify(db, null, 2) + "\n"); } catch {}

// ---- on done: append worklog entry (local worklog.json) ----
let wlEntry = null;
if (mode === "done") {
  const now = new Date();
  const name = agent.name || id[0].toUpperCase() + id.slice(1);
  wlEntry = {
    id: `wl-${now.toISOString().slice(2, 10).replace(/-/g, "")}-${id}-${now.getTime().toString(36).slice(-4)}`,
    datetime: now.toISOString().replace(/\.\d+Z$/, "Z"),
    displayDate: now.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" }),
    displayTime: now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
    agent: id,
    agentName: name,
    agentImg: `avatars/${name}.png`,
    pipeline: agent.pipeline || "standalone",
    status: "done",
    title: agent.task || "ผลงานล่าสุด",
    summary: (agent.report?.body || "").slice(0, 300),
  };
  try {
    const wl = JSON.parse(readFileSync(WORKLOG_FILE, "utf8"));
    wl.entries.unshift(wlEntry);
    wl.updatedAt = db.updatedAt;
    writeFileSync(WORKLOG_FILE, JSON.stringify(wl, null, 2) + "\n");
  } catch {}

  // ---- auto commit + push (best-effort, detached — ไม่ block hook) ----
  const msg = `worklog: ${name} — ${(agent.task || "งานเสร็จ").slice(0, 60)}`;
  spawn("bash", ["-c",
    `cd "${ROOT}" && git add status.json worklog.json Output && git commit -m ${JSON.stringify(msg)} -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git push origin main`,
  ], { detached: true, stdio: "ignore" }).unref();
}

// ---- write to Firestore via REST ----
function fsVal(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: v } : { doubleValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(fsVal) } };
  if (typeof v === "object") return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, val]) => [k, fsVal(val)])) } };
  return { stringValue: String(v) };
}

const updateFields = mode === "start"
  ? { status: agent.status, task: agent.task }
  : { status: agent.status, report: agent.report ?? null };

const mask = Object.keys(updateFields).map(k => `updateMask.fieldPaths=${k}`).join("&");
const statusUrl = `https://firestore.googleapis.com/v1/projects/${FS_PROJECT}/databases/(default)/documents/agents/${id}?key=${FS_KEY}&${mask}`;
const statusBody = JSON.stringify({ fields: Object.fromEntries(Object.entries(updateFields).map(([k, v]) => [k, fsVal(v)])) });

const jobs = [fetch(statusUrl, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: statusBody })];

// worklog entry → arrayUnion บน agents/worklog (dashboard ฟัง doc นี้แบบ real-time)
if (wlEntry) {
  const commitUrl = `https://firestore.googleapis.com/v1/projects/${FS_PROJECT}/databases/(default)/documents:commit?key=${FS_KEY}`;
  const commitBody = JSON.stringify({
    writes: [{
      transform: {
        document: `projects/${FS_PROJECT}/databases/(default)/documents/agents/worklog`,
        fieldTransforms: [{ fieldPath: "entries", appendMissingElements: { values: [fsVal(wlEntry)] } }],
      },
    }],
  });
  jobs.push(fetch(commitUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: commitBody }));
}

Promise.allSettled(jobs).finally(() => process.exit(0));
