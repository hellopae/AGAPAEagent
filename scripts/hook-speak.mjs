#!/usr/bin/env node
/* =====================================================================
   hook-speak.mjs — อ่านคำตอบสุดท้ายของเทิร์นออกเสียงด้วย Kanya

   Stop → node hook-speak.mjs
       อ่าน transcript หยิบข้อความ assistant ล่าสุด ตัดให้สั้น แล้วส่งให้ speak.mjs

   ปิดอยู่โดยดีฟอลต์ — เปิดด้วย env AGAPAE_SPEAK=1
   ไม่เคย block ไม่เคยทำให้เทิร์นพัง (พังเมื่อไหร่ก็เงียบแล้วออก exit 0)
   ===================================================================== */
import { readFileSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

if (process.env.AGAPAE_SPEAK !== "1") process.exit(0);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAX_CHARS = 320;   // ยาวกว่านี้ฟังแล้วน่าเบื่อ ตัดทิ้ง

let ev = {};
try { ev = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch { process.exit(0); }
if (ev.stop_hook_active) process.exit(0);

const tpath = ev.transcript_path;
if (!tpath || !existsSync(tpath)) process.exit(0);

let raw;
try { raw = readFileSync(tpath, "utf8"); } catch { process.exit(0); }

/* หาข้อความ assistant ล่าสุดที่เป็นตัวอักษรจริง (ไม่ใช่ tool_use) */
let last = "";
for (const line of raw.split("\n")) {
  if (!line.trim()) continue;
  let rec;
  try { rec = JSON.parse(line); } catch { continue; }
  const msg = rec.message;
  if (!msg || msg.role !== "assistant" || !Array.isArray(msg.content)) continue;
  const text = msg.content.filter((c) => c?.type === "text").map((c) => c.text).join("\n").trim();
  if (text) last = text;
}
if (!last) process.exit(0);

/* เอาเฉพาะเนื้อร้อยแก้ว — โค้ด ตาราง หัวข้อ ฟังไม่รู้เรื่อง */
const prose = last
  .replace(/```[\s\S]*?```/g, " ")
  .split("\n")
  .filter((l) => !/^\s*\|/.test(l))
  .join("\n")
  .trim();
if (!prose) process.exit(0);

const say = prose.length > MAX_CHARS ? prose.slice(0, MAX_CHARS).replace(/\S*$/, "") + " ครับ" : prose;

const child = spawn("node", [join(ROOT, "scripts", "speak.mjs")], {
  detached: true,
  stdio: ["pipe", "ignore", "ignore"],
});
child.on("error", () => {});
try { child.stdin.end(say); } catch {}
child.unref();
process.exit(0);
