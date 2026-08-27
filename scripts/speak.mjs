#!/usr/bin/env node
/* พูดข้อความออกลำโพงด้วยเสียงไทย Kanya ที่ติดมากับ macOS
   ใช้:  node speak.mjs "ข้อความ"
         node brief.mjs morning | node speak.mjs
   flags: --voice <ชื่อเสียง>  --rate <คำ/นาที>  --pitch <30-60 ต่ำ=ทุ้ม>
          --save <ไฟล์.aiff>  --dry (แค่พิมพ์ ไม่พูด)  --list (ดูเสียงไทยที่เครื่องมี)
   env:   AGAPAE_VOICE  AGAPAE_RATE  AGAPAE_PITCH */
import { spawn, execSync } from "node:child_process";

const argv = process.argv.slice(2);
/* flag ที่กินค่าถัดไป เช่น --rate 200 */
const flag = (name, def) => {
  const i = argv.indexOf(name);
  if (i === -1) return def;
  const v = argv[i + 1];
  if (v === undefined || v.startsWith("--")) { argv.splice(i, 1); return def; }
  argv.splice(i, 2);
  return v;
};
/* flag เปล่า เช่น --dry — ห้ามกินคำถัดไป ไม่งั้นข้อความหาย */
const boolFlag = (name) => {
  const i = argv.indexOf(name);
  if (i === -1) return false;
  argv.splice(i, 1);
  return true;
};

if (argv.includes("--list")) {
  /* เสียงอังกฤษอ่านภาษาไทยไม่ออก (ได้ไฟล์เงียบ) เลยโชว์เฉพาะ th_TH */
  const all = execSync("say -v '?'", { encoding: "utf8" });
  const thai = all.split("\n").filter((l) => l.includes("th_TH"));
  console.log(thai.length ? thai.join("\n") : "ไม่มีเสียงไทยในเครื่อง");
  console.log(`\nเสียงไทย ${thai.length} ตัว จากทั้งหมด ${all.trim().split("\n").length} ตัว`);
  console.log("macOS 15 มีเสียงไทยให้ตัวเดียวคือ Kanya (ตั้ง System speech language เป็น Thai แล้วก็ไม่มี Manage Voices ให้โหลดเพิ่ม)");
  console.log("ปรับบุคลิกเสียงได้ด้วย --rate (ความเร็ว) กับ --pitch 30-60 (ต่ำ=ทุ้ม)");
  process.exit(0);
}

const voice = flag("--voice", process.env.AGAPAE_VOICE || "Kanya");
const rate = flag("--rate", process.env.AGAPAE_RATE || "180");
const pitch = flag("--pitch", process.env.AGAPAE_PITCH || null);
const save = flag("--save", null);
const dry = boolFlag("--dry");

/* ล้างของที่เสียงสังเคราะห์อ่านแล้วพัง — emoji, URL, สัญลักษณ์ markdown, เส้นคั่น */
function clean(raw) {
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\p{Extended_Pictographic}️?/gu, " ")
    .replace(/[*_`~#>|]/g, " ")
    .replace(/^[ \t]*[-–—•]+[ \t]+/gm, " ")
    .replace(/[-–—]{2,}/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join(".\n");
}

async function readStdin() {
  if (process.stdin.isTTY) return "";
  let out = "";
  for await (const chunk of process.stdin) out += chunk;
  return out;
}

const text = clean(argv.join(" ").trim() || (await readStdin()));
if (!text) {
  console.error("ไม่มีข้อความให้พูด");
  process.exit(1);
}

if (dry) {
  console.log(text);
  process.exit(0);
}

const args = ["-v", voice, "-r", String(rate)];
if (save) args.push("-o", String(save));
const say = spawn("say", args, { stdio: ["pipe", "inherit", "inherit"] });
/* [[pbas n]] คือคำสั่งฝังของ say — Kanya ตอบสนองช่วง 30-60 สูงกว่านั้นไม่ต่างแล้ว */
say.stdin.end(pitch ? `[[pbas ${pitch}]] ${text}` : text);
say.on("exit", (code) => {
  if (code !== 0) console.error(`say ล้มเหลว (exit ${code})`);
  if (save && code === 0) console.log(`บันทึกเสียงแล้ว: ${save}`);
  process.exit(code ?? 0);
});
