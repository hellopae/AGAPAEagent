#!/usr/bin/env node
/* =====================================================================
   push-limit.mjs — Claude usage (5h block) → Firestore agents/claude_limit
   ใช้ ccusage อ่าน ~/.claude/projects แบบ offline แล้ว PATCH ขึ้น Firestore
   ให้ widget "Claude Limit" บน dashboard แสดง % แบบ real-time
   รันเอง:  node scripts/push-limit.mjs
   อัตโนมัติ: ถูก spawn จาก hook-status.mjs ทุกครั้งที่ agent ทำงาน
   ===================================================================== */
import { execFileSync } from "node:child_process";

const FS_PROJECT = "agapae-studio";
const FS_KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";

let data;
try {
  const out = execFileSync("npx", ["--yes", "ccusage@latest", "blocks", "--json", "--offline"],
    { encoding: "utf8", timeout: 90000, stdio: ["ignore", "pipe", "ignore"] });
  data = JSON.parse(out);
} catch { process.exit(0); }

const blocks = (data.blocks || []).filter(b => !b.isGap);
const active = blocks.find(b => b.isActive);
if (!active) process.exit(0);

// limit = block ที่หนักที่สุดในอดีต (แนวเดียวกับ ccusage --token-limit max)
const limitTokens = Math.max(...blocks.map(b => b.totalTokens || 0), 1);
const usedTokens = active.totalTokens || 0;
const pct = Math.min(100, (usedTokens / limitTokens) * 100);

const fields = {
  pct: { doubleValue: Math.round(pct * 10) / 10 },
  usedTokens: { integerValue: usedTokens },
  limitTokens: { integerValue: limitTokens },
  costUSD: { doubleValue: Math.round((active.costUSD || 0) * 100) / 100 },
  resetAt: { stringValue: active.endTime || "" },
  updatedAt: { stringValue: new Date().toISOString() },
};
const mask = Object.keys(fields).map(k => `updateMask.fieldPaths=${k}`).join("&");
const url = `https://firestore.googleapis.com/v1/projects/${FS_PROJECT}/databases/(default)/documents/agents/claude_limit?key=${FS_KEY}&${mask}`;

fetch(url, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fields }),
}).then(r => {
  console.log(r.ok ? `✓ claude_limit → ${fields.pct.doubleValue}%` : `✗ Firestore ${r.status}`);
  process.exit(0);
}).catch(() => process.exit(0));
