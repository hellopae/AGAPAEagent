#!/usr/bin/env node
/* =====================================================================
   hook-status.mjs — Claude Code hook bridge → status.json + Firestore
   PreToolUse  (Task) → node hook-status.mjs start
   PostToolUse (Task) → node hook-status.mjs done
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "status.json");
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
try { db = JSON.parse(readFileSync(FILE, "utf8")); } catch { process.exit(0); }
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
try { writeFileSync(FILE, JSON.stringify(db, null, 2) + "\n"); } catch {}

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
const url = `https://firestore.googleapis.com/v1/projects/${FS_PROJECT}/databases/(default)/documents/agents/${id}?key=${FS_KEY}&${mask}`;
const body = JSON.stringify({ fields: Object.fromEntries(Object.entries(updateFields).map(([k, v]) => [k, fsVal(v)])) });

fetch(url, { method: "PATCH", headers: { "Content-Type": "application/json" }, body })
  .catch(() => {})
  .finally(() => process.exit(0));
