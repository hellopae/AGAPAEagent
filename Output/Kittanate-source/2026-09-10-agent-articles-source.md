# แหล่งข้อมูลต้นทาง — บทความเรื่อง Agent 2 ชิ้น (ส่งโดย Kittanate 10 ก.ย. 2569)

## บทความ A — QuantCorner: "Google ปล่อยคอร์สสอนทำ Multi-Agent ระดับ Production ฟรี 11 ตอนรวด"

หัวข้อในโพสต์ (สรุปตามที่โพสต์อ้าง — ยังไม่ verify):

**Core Architecture & Routing**
- 3 โครงสร้างพื้นฐานของ Agent (Foundational patterns)
- Loop pattern: จัดคู่หู Generator & Critic ช่วยตรวจทานงาน
- Coordinator pattern: กระจายงานแบบ Dynamic routing
- เลือกระหว่างทำ "Agent เป็น Tool" กับ "ส่งต่อให้ Sub-agents"

**Memory Architecture (จุดตายของงาน Production)**
5. Short-term memory: จัดการ Sessions, Events และ State
6. Persistent memory: เซฟความจำข้ามการรีสตาร์ตระบบ
7. Long-term memory: ใช้งาน Memory Bank
8. เจาะลึก SessionService vs MemoryService
9. ทำ Semantic search ด้วย PreloadMemoryTool

**Scaling & Integration**
10. Multi-agent systems & Agent hierarchy
11. Workflow agents: ทำงานแบบ Sequential, Parallel และ Loop
12. ต่อ Agent เข้ากับ MCP servers (Model Context Protocol)
13. วิธีเขียน MCP server ขึ้นมาใช้เอง
14. เชื่อม Database MCP servers ด้วย MCP Toolbox
15. พีระมิดการทดสอบ Agent 3 ระดับ (Testing Pyramid & Evaluation)

**ข้ออ้างเชิงความเห็นในโพสต์:** คนทำ demo สร้าง agent ตัวเดียวแล้วตัน / ข้ามเรื่อง memory /
ดูแค่ผลลัพธ์สุดท้าย — ส่วนสาย production ออกแบบ pattern ถูกตั้งแต่แรก, ติดตั้ง persistent memory,
และเทสต์ทั้ง trajectory (กระบวนการคิดและตัดสินใจ)

**หลักฐานในภาพ:** playlist ชื่อ "AI Agent Crash Course" โดย Google Cloud Tech — 11 วิดีโอ,
ยอดดู ~57,789 ครั้ง ณ เวลาที่แคป; วิดีโอที่เห็นชื่อ: "AI agent design patterns",
"How to evaluate agents in practice", "How to add short-term memory to your AI agent"
(หมายเหตุ: พาดหัวบอก 11 ตอน แต่รายการหัวข้อในโพสต์มี 15 ข้อ — ต้องตรวจ)

---

## บทความ B — 100WEALTH: "ถูกเลิกจ้าง เลยสร้าง AI-Agent 27 ตัว มาช่วยหาเงิน"

**ตัวละคร:** Linara Mulukova Bozieva, อดีตพนักงาน eBay 11 ปี สาย Analytics, อายุ 39,
ย้ายจากสวิตเซอร์แลนด์มา San Jose แล้วถูกเลิกจ้าง — ในภาพระบุ
"Founder, Ravenopus & Built, Not Hired"

**โครงสร้าง 3 ชั้นที่เธอสร้าง:**
1. **Directives** — ชั้นกำหนดตัวตน ความรู้ และกฎการทำงานของ agent แต่ละตัว
   (เทียบได้กับ "ใบงาน + คู่มือพนักงาน")
2. **Orchestration** — 6 agent ทำหน้าที่ "สมอง" ก่อนลงมือ: วิจัยตลาด / วิเคราะห์ข้อมูล /
   ครีเอทีฟ / การเงิน / กฎหมาย / ตัวประสานงานที่ส่งต่องานลงชั้นล่าง
3. **Execution** — 18 agent: 3 ตัวสร้างโครงสร้างทางเทคนิค / 10 ตัวดึงคนเข้ามา (acquisition) /
   5 ตัวเปลี่ยน traffic เป็นรายได้ (conversion)

**ข้ออ้างเชิงตัวเลข (ต้อง fact-check ทุกตัว):**
- ทีม 27 agent, งบ < ~32,000 บาท/เดือน ครอบคลุม Claude Code, Codex, ChatGPT, HeyGen,
  ElevenLabs และ API อื่น
- ทดสอบกับลูกค้ามาแล้ว 14 ราย, ปัจจุบันดูแล 5 รายพร้อมกัน
- ใช้เวลาเธอ ~2 ชม./สัปดาห์/ลูกค้า → อ้างว่าสเกลได้ 20–25 ลูกค้าคนเดียว
- อ้างว่าแทบไม่เขียนโค้ดเอง — อธิบายเป็นภาษาธรรมดาแล้วให้ AI สร้าง เธอตรวจและปรับ

**ข้อจำกัดที่เธอบอกเองว่า AI ทำไม่ได้:**
- อ่านไม่ออกว่าลูกค้ากังวลอะไรจริง ๆ / ตอนไหนพูด "โอเค" แต่ไม่โอเค
- ตัดสินใจขั้นสุดท้ายเมื่อ agent เจอทางแยกที่ข้อมูลไม่พอ
- ถ้าเจ้าของไม่มี domain expertise ก็สร้าง agent สายนั้นไม่ได้ (ตัวอย่าง Healthcare)
- มุมมอง: คนที่มีค่าในอนาคตคือ "VP ที่ควบคุมสถาปัตยกรรม AI"

**หลักฐานในภาพ:** diagram เป็น workflow แบบ n8n (AI Agent Tools Agent → Switch route rules →
HTTP nodes, Auto-fixing Output Parser, "Grog Chat Model" ซึ่งน่าจะหมายถึง Groq) —
ไม่ใช่โครงสร้าง 27 agent ตามที่บทความบรรยาย ให้ระวังว่าภาพประกอบอาจเป็นภาพ stock
