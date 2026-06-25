#!/usr/bin/env node
/* =====================================================================
   set-status.mjs — update one agent's live status in status.json
   ใช้ให้ agent หรือ Claude Code hook เรียก เพื่อให้ dashboard เห็นสถานะจริง

   ตัวอย่าง:
     node scripts/set-status.mjs reese --status working --task "วิเคราะห์คู่แข่งบน Etsy"
     node scripts/set-status.mjs reese --status done \
          --report-title "สรุปคู่แข่ง 12 ร้าน" \
          --report-body "ราคาเฉลี่ย 180 บาท · ช่องว่าง: การ์ดสังฆทาน A6"
     node scripts/set-status.mjs reese --status idle        # ล้าง task

   flags:
     --status   working | idle | done   (ต้องระบุ)
     --task     ข้อความงานปัจจุบัน (idle จะถูกล้างเป็น null อัตโนมัติ)
     --report-title / --report-body / --report-when  เพิ่ม/อัปเดตรายงานล่าสุด
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "status.json");

const [, , agentId, ...rest] = process.argv;
if (!agentId) {
  console.error("usage: set-status.mjs <agentId> --status <working|idle|done> [--task ...] [--report-title ...] [--report-body ...]");
  process.exit(1);
}

// parse --flag value pairs
const args = {};
for (let i = 0; i < rest.length; i += 2) args[rest[i].replace(/^--/, "")] = rest[i + 1];

const db = JSON.parse(readFileSync(FILE, "utf8"));
const agent = db.agents.find((a) => a.id === agentId);
if (!agent) {
  console.error(`agent "${agentId}" not found in status.json`);
  process.exit(1);
}

if (args.status) {
  if (!["working", "idle", "done"].includes(args.status)) {
    console.error(`bad --status "${args.status}" (working|idle|done)`);
    process.exit(1);
  }
  agent.status = args.status;
}
if (args.status === "idle") agent.task = null;
else if (args.task !== undefined) agent.task = args.task;

if (args["report-title"] || args["report-body"]) {
  agent.report = {
    when: args["report-when"] || new Date().toLocaleString("th-TH", { hour: "2-digit", minute: "2-digit" }),
    title: args["report-title"] || agent.report?.title || "รายงาน",
    body: args["report-body"] || agent.report?.body || "",
  };
}

db.updatedAt = new Date().toISOString();
writeFileSync(FILE, JSON.stringify(db, null, 2) + "\n");
console.log(`✓ ${agent.name}: status=${agent.status}${agent.task ? ` · task="${agent.task}"` : ""}`);
