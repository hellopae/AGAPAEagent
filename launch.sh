#!/bin/bash
# AGAPAE Agent — Launch Workspace
# เปิด VS Code + local server สำหรับ dashboard

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 AGAPAE Agent Workspace"
echo "================================"

# 1. เปิด local server สำหรับ dashboard (status.json fetch ได้)
echo "▶ เริ่ม local server ที่ http://localhost:3333"
osascript -e "
  tell application \"Terminal\"
    do script \"cd '${DIR}' && echo '🌐 Dashboard: http://localhost:3333' && python3 -m http.server 3333\"
  end tell
" &>/dev/null

sleep 1

# 2. เปิด dashboard ใน browser
echo "▶ เปิด dashboard ใน browser"
open "http://localhost:3333/tanapat-studio-dashboard.html"

# 3. เปิด VS Code workspace
echo "▶ เปิด VS Code workspace"
if command -v code &>/dev/null; then
  code "${DIR}/agapae-agent.code-workspace"
else
  echo "⚠️  ไม่พบ 'code' command — เปิด VS Code แล้วลาก agapae-agent.code-workspace เข้าไปเองครับ"
  open "${DIR}"
fi

echo ""
echo "✅ เสร็จแล้ว!"
echo "   Dashboard → http://localhost:3333/tanapat-studio-dashboard.html"
echo "   Output files → ${DIR}/Output/"
