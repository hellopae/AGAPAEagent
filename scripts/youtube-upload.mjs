#!/usr/bin/env node
/* Safe YouTube uploader. Dry-run is the default; --execute is required to upload. */
import { chmodSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, extname, isAbsolute, join, resolve } from "node:path";

const DEFAULT_TOKEN = join(homedir(), "Library", "Application Support", "AGAPAE", "youtube-oauth.json");
const MIME = { ".mp4": "video/mp4", ".mov": "video/quicktime", ".m4v": "video/x-m4v", ".webm": "video/webm" };

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}
function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}
function loadJson(path, label) {
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch (error) { fail(`${label}: ${error.message}`); }
}
function savePrivate(path, value) {
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  chmodSync(path, 0o600);
}

const jobArg = arg("--job");
const execute = process.argv.includes("--execute");
const tokenPath = resolve(arg("--token") || DEFAULT_TOKEN);
if (!jobArg) fail("ระบุ --job /absolute/path/job.json");

const jobPath = resolve(jobArg);
const job = loadJson(jobPath, "อ่าน job JSON ไม่สำเร็จ");
if (!job.id || !/^[a-zA-Z0-9._-]+$/.test(job.id)) fail("job.id ต้องเป็นค่าคงที่และใช้เฉพาะ a-z A-Z 0-9 . _ -");
if (!job.title || !job.description) fail("job ต้องมี title และ description");
if (!job.videoPath || !isAbsolute(job.videoPath)) fail("job.videoPath ต้องเป็น absolute path");
if (!existsSync(job.videoPath) || !statSync(job.videoPath).isFile()) fail("ไม่พบไฟล์วิดีโอตาม job.videoPath");
if (!MIME[extname(job.videoPath).toLowerCase()]) fail("รองรับเฉพาะ mp4, mov, m4v และ webm");
if (!new Set(["approved", "scheduled"]).has(job.status)) fail("อัปโหลดได้เฉพาะ job.status = approved หรือ scheduled");
if (!job.approvedAt || !job.approvedBy) fail("job ต้องมี approvedAt และ approvedBy");

const privacyStatus = job.privacyStatus || "private";
if (!new Set(["private", "unlisted", "public"]).has(privacyStatus)) fail("privacyStatus ไม่รองรับ");
if (privacyStatus === "public" && job.status !== "approved") fail("Public ต้องมี status = approved");
if (job.publishAt && privacyStatus !== "private") fail("YouTube scheduling ต้องใช้ privacyStatus = private");

const summary = {
  id: job.id,
  title: job.title,
  videoPath: job.videoPath,
  bytes: statSync(job.videoPath).size,
  privacyStatus,
  publishAt: job.publishAt || null,
  approvedBy: job.approvedBy,
};
console.log(JSON.stringify(summary, null, 2));
if (!execute) {
  console.log("✅ DRY RUN ผ่าน — ยังไม่ได้เชื่อมต่อหรืออัปโหลด YouTube (เพิ่ม --execute เมื่อตรวจแล้ว)");
  process.exit(0);
}

if (!existsSync(tokenPath)) fail(`ไม่พบ OAuth token: ${tokenPath}\nรัน scripts/youtube-auth.mjs ก่อน`);
const oauth = loadJson(tokenPath, "อ่าน OAuth token ไม่สำเร็จ");
if (!oauth.refresh_token || !oauth.client_id || !oauth.client_secret) fail("OAuth token ไม่สมบูรณ์");

const historyPath = join(dirname(tokenPath), "youtube-upload-history.json");
const history = existsSync(historyPath) ? loadJson(historyPath, "อ่าน upload history ไม่สำเร็จ") : { jobs: {} };
if (history.jobs?.[job.id]?.videoId) {
  console.log(`⏭️ งานนี้อัปโหลดแล้ว: https://youtu.be/${history.jobs[job.id].videoId}`);
  process.exit(0);
}

async function accessToken() {
  if (oauth.access_token && Number(oauth.expires_at || 0) > Date.now() + 120_000) return oauth.access_token;
  const res = await fetch(oauth.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: oauth.client_id,
      client_secret: oauth.client_secret,
      refresh_token: oauth.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) fail(`ต่ออายุ OAuth ไม่สำเร็จ: ${data.error_description || data.error || res.status}`);
  oauth.access_token = data.access_token;
  oauth.expires_at = Date.now() + Number(data.expires_in || 3600) * 1000;
  savePrivate(tokenPath, oauth);
  return oauth.access_token;
}

const token = await accessToken();
const channelRes = await fetch("https://www.googleapis.com/youtube/v3/channels?part=id,snippet&mine=true", {
  headers: { Authorization: `Bearer ${token}` },
});
const channelData = await channelRes.json();
if (!channelRes.ok) fail(`ตรวจ channel ไม่สำเร็จ: ${channelData.error?.message || channelRes.status}`);
const channel = channelData.items?.[0];
if (!channel) fail("OAuth account ไม่มี YouTube channel");
if (oauth.channel_id && channel.id !== oauth.channel_id) fail("Channel ID ไม่ตรงกับตอนอนุญาต OAuth — หยุดเพื่อป้องกันอัปโหลดผิดช่อง");
if (job.expectedChannelId && channel.id !== job.expectedChannelId) fail("Channel ID ไม่ตรงกับ expectedChannelId ใน job");
console.log(`Channel: ${channel.snippet?.title || ""} (${channel.id})`);

const metadata = {
  snippet: {
    title: job.title,
    description: job.description,
    tags: Array.isArray(job.tags) ? job.tags.slice(0, 30) : [],
    categoryId: String(job.categoryId || 28),
    defaultLanguage: job.defaultLanguage || "th",
  },
  status: {
    privacyStatus,
    selfDeclaredMadeForKids: Boolean(job.madeForKids),
    ...(job.publishAt ? { publishAt: job.publishAt } : {}),
  },
};

const video = readFileSync(job.videoPath);
const mime = MIME[extname(job.videoPath).toLowerCase()];
const initUrl = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";
const initRes = await fetch(initUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=UTF-8",
    "X-Upload-Content-Length": String(video.length),
    "X-Upload-Content-Type": mime,
  },
  body: JSON.stringify(metadata),
});
if (!initRes.ok) fail(`เริ่ม upload ไม่สำเร็จ: ${initRes.status} ${await initRes.text()}`);
const uploadUrl = initRes.headers.get("location");
if (!uploadUrl) fail("YouTube ไม่ส่ง resumable upload URL");

const uploadRes = await fetch(uploadUrl, {
  method: "PUT",
  headers: { "Content-Type": mime, "Content-Length": String(video.length) },
  body: video,
});
const result = await uploadRes.json();
if (!uploadRes.ok || !result.id) fail(`อัปโหลดไม่สำเร็จ: ${uploadRes.status} ${JSON.stringify(result)}`);

history.jobs ||= {};
history.jobs[job.id] = {
  videoId: result.id,
  channelId: channel.id,
  privacyStatus,
  uploadedAt: new Date().toISOString(),
};
savePrivate(historyPath, history);
console.log(`✅ Uploaded: https://youtu.be/${result.id}`);
