#!/usr/bin/env node
/* =====================================================================
   push-limit.mjs — Claude usage → Firestore agents/claude_limit
   ให้การ์ด "Claude Limit" บน dashboard แสดง % ที่ตรงกับบัญชีจริง

   แหล่งข้อมูล (ไล่ตามลำดับ):
   1. api.anthropic.com/api/oauth/usage — ตัวเลขจริง 5 ชม. + 7 วัน
      token อ่านสดจาก macOS Keychain ทุกครั้ง (เดิมงานนี้อยู่ในแอป AGAPAE Widget
      ฝั่ง Rust — 7 ก.ย. 2569 ยกเลิกแอปแล้ว ย้าย logic มาไว้ที่นี่)
   2. ccusage แบบ offline — ประมาณการจาก ~/.claude/projects ใช้เมื่อ (1) ล้มเหลว

   ⚠️ ห้าม log token / ห้ามเขียน token ลงไฟล์ — ส่งขึ้น Firestore เฉพาะ % + เวลารีเซ็ต
   รันเอง:  node scripts/push-limit.mjs
   อัตโนมัติ: ถูก spawn จาก hook-status.mjs ทุกครั้งที่ agent ทำงาน
   ===================================================================== */
import { execFileSync } from "node:child_process";

const FS_PROJECT = "agapae-studio";
const FS_KEY = "AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E";
const USAGE_URL = "https://api.anthropic.com/api/oauth/usage";
const KEYCHAIN_SERVICE = "Claude Code-credentials";
const FALLBACK_CLI_VERSION = "2.1.263";

const sh = (cmd, args, ms = 15000) =>
  execFileSync(cmd, args, { encoding: "utf8", timeout: ms, stdio: ["ignore", "pipe", "ignore"] });

/* --- 1) ตัวเลขจริงจาก oauth/usage --------------------------------- */
function accessToken() {
  const raw = sh("security", ["find-generic-password", "-s", KEYCHAIN_SERVICE, "-w"], 10000);
  return JSON.parse(raw.trim())?.claudeAiOauth?.accessToken || null;
}

/* User-Agent ต้องเป็นเวอร์ชัน CLI จริง ไม่งั้นโดน 429 */
function cliVersion() {
  try { return sh("claude", ["--version"], 10000).trim().split(/\s+/)[0] || FALLBACK_CLI_VERSION; }
  catch { return FALLBACK_CLI_VERSION; }
}

const win = (o) => (o && typeof o.utilization === "number"
  ? { pct: Math.round(Math.min(100, o.utilization) * 10) / 10, resetAt: o.resets_at || "" }
  : null);

async function realUsage() {
  let token;
  try { token = accessToken(); } catch { return null; }
  if (!token) return null;

  const res = await fetch(USAGE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": `claude-code/${cliVersion()}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(15000),
  }).catch(() => null);
  if (!res?.ok) return null;

  const body = await res.json().catch(() => null);
  const five = win(body?.five_hour);
  const seven = win(body?.seven_day);
  if (!five && !seven) return null;   // endpoint ไม่ official — โครงสร้างเปลี่ยนเมื่อไหร่ก็ตกไปใช้ ccusage

  return {
    fiveHourPct: { doubleValue: five?.pct ?? 0 },
    fiveHourResetAt: { stringValue: five?.resetAt ?? "" },
    sevenDayPct: { doubleValue: seven?.pct ?? 0 },
    sevenDayResetAt: { stringValue: seven?.resetAt ?? "" },
    source: { stringValue: "hook" },
  };
}

/* --- 2) fallback: ccusage ประมาณการ -------------------------------- */
function ccusage() {
  let data;
  try {
    data = JSON.parse(sh("npx", ["--yes", "ccusage@latest", "blocks", "--json", "--offline"], 90000));
  } catch { return null; }

  const blocks = (data.blocks || []).filter((b) => !b.isGap);
  const active = blocks.find((b) => b.isActive);
  if (!active) return null;

  // limit = block ที่หนักที่สุดในอดีต (แนวเดียวกับ ccusage --token-limit max)
  const limitTokens = Math.max(...blocks.map((b) => b.totalTokens || 0), 1);
  const usedTokens = active.totalTokens || 0;

  return {
    pct: { doubleValue: Math.round(Math.min(100, (usedTokens / limitTokens) * 100) * 10) / 10 },
    usedTokens: { integerValue: usedTokens },
    limitTokens: { integerValue: limitTokens },
    costUSD: { doubleValue: Math.round((active.costUSD || 0) * 100) / 100 },
    resetAt: { stringValue: active.endTime || "" },
    source: { stringValue: "ccusage" },
    // ล้างค่าตัวจริงทิ้ง ไม่งั้นหน้าเว็บจะยึดเลขเก่าที่ค้างอยู่ (renderLimit เลือกตัวนี้ก่อนเสมอ)
    fiveHourPct: { nullValue: null },
    fiveHourResetAt: { nullValue: null },
    sevenDayPct: { nullValue: null },
    sevenDayResetAt: { nullValue: null },
  };
}

/* --- ส่งขึ้น Firestore --------------------------------------------- */
const fields = (await realUsage()) || ccusage();
if (!fields) process.exit(0);
fields.updatedAt = { stringValue: new Date().toISOString() };

const mask = Object.keys(fields).map((k) => `updateMask.fieldPaths=${k}`).join("&");
const url = `https://firestore.googleapis.com/v1/projects/${FS_PROJECT}/databases/(default)/documents/agents/claude_limit?key=${FS_KEY}&${mask}`;

const res = await fetch(url, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fields }),
}).catch(() => null);

const shown = fields.fiveHourPct?.doubleValue ?? fields.pct?.doubleValue;
console.log(res?.ok ? `✓ claude_limit → ${shown}% (${fields.source.stringValue})` : `✗ Firestore ${res?.status ?? "network"}`);
