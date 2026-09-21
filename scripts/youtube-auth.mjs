#!/usr/bin/env node
/* OAuth one-time setup for the YouTube uploader.

   1) Create a Google OAuth Desktop client and download its JSON.
   2) Run: node scripts/youtube-auth.mjs --client /absolute/path/client_secret.json
   3) Open the printed URL, sign in as agapaedesign@gmail.com, and approve.

   The saved token is outside this repository by default and chmod 600.
*/
import { createServer } from "node:http";
import { createHash, randomBytes } from "node:crypto";
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";

const DEFAULT_TOKEN = join(homedir(), "Library", "Application Support", "AGAPAE", "youtube-oauth.json");
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
];

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}
function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}
function base64url(buffer) {
  return buffer.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

const clientPath = arg("--client");
const tokenPath = resolve(arg("--token") || DEFAULT_TOKEN);
if (!clientPath) fail("ระบุ --client /absolute/path/client_secret.json");

let source;
try { source = JSON.parse(readFileSync(resolve(clientPath), "utf8")); }
catch (error) { fail(`อ่าน OAuth client JSON ไม่สำเร็จ: ${error.message}`); }

const client = source.installed || source.web;
if (!client?.client_id || !client?.client_secret) fail("OAuth JSON ต้องมี client_id และ client_secret");

const state = base64url(randomBytes(24));
const verifier = base64url(randomBytes(48));
const challenge = base64url(createHash("sha256").update(verifier).digest());
let redirectUri = "";

const server = createServer(async (req, res) => {
  const callback = new URL(req.url, "http://127.0.0.1");
  if (callback.pathname !== "/oauth2callback") {
    res.writeHead(404).end("Not found");
    return;
  }
  if (callback.searchParams.get("state") !== state) {
    res.writeHead(400).end("Invalid OAuth state");
    server.close();
    return;
  }
  const oauthError = callback.searchParams.get("error");
  const code = callback.searchParams.get("code");
  if (oauthError || !code) {
    res.writeHead(400).end(`OAuth failed: ${oauthError || "missing code"}`);
    server.close();
    return;
  }

  try {
    const tokenRes = await fetch(client.token_uri || "https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: client.client_id,
        client_secret: client.client_secret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code_verifier: verifier,
      }),
    });
    const token = await tokenRes.json();
    if (!tokenRes.ok || !token.access_token) throw new Error(token.error_description || token.error || `HTTP ${tokenRes.status}`);

    const channelRes = await fetch("https://www.googleapis.com/youtube/v3/channels?part=id,snippet&mine=true", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const channelData = await channelRes.json();
    if (!channelRes.ok) throw new Error(channelData.error?.message || `ตรวจช่องไม่สำเร็จ HTTP ${channelRes.status}`);
    const channel = channelData.items?.[0];
    if (!channel) throw new Error("บัญชีนี้ยังไม่มี YouTube channel — สร้างช่องก่อนแล้วรันใหม่");

    const saved = {
      client_id: client.client_id,
      client_secret: client.client_secret,
      token_uri: client.token_uri || "https://oauth2.googleapis.com/token",
      scope: SCOPES,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at: Date.now() + Number(token.expires_in || 3600) * 1000,
      channel_id: channel.id,
      channel_title: channel.snippet?.title || "",
      authorized_at: new Date().toISOString(),
    };
    if (!saved.refresh_token) throw new Error("Google ไม่ส่ง refresh token — ถอนสิทธิ์แอปเดิมแล้วรันใหม่ด้วย prompt=consent");

    mkdirSync(dirname(tokenPath), { recursive: true, mode: 0o700 });
    writeFileSync(tokenPath, `${JSON.stringify(saved, null, 2)}\n`, { mode: 0o600 });
    chmodSync(tokenPath, 0o600);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>เชื่อม YouTube สำเร็จ</h1><p>กลับไปที่ Codex ได้เลย ปิดแท็บนี้ได้ครับ</p>");
    console.log(`✅ Authorized channel: ${saved.channel_title} (${saved.channel_id})`);
    console.log(`✅ Token saved securely: ${tokenPath}`);
  } catch (error) {
    res.writeHead(500).end("OAuth setup failed. Return to Codex for details.");
    console.error(`❌ ${error.message}`);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.listen(0, "127.0.0.1", () => {
  const address = server.address();
  redirectUri = `http://127.0.0.1:${address.port}/oauth2callback`;
  const authUrl = new URL(client.auth_uri || "https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.search = new URLSearchParams({
    client_id: client.client_id,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent select_account",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });
  console.log("เปิด URL นี้ในเบราว์เซอร์ แล้วล็อกอินด้วย agapaedesign@gmail.com:\n");
  console.log(authUrl.toString());
  console.log("\nกำลังรอ OAuth callback…");
});
