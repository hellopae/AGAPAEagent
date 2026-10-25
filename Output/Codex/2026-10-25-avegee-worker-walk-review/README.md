# A3 — แก้ท่าเดินคนงานชูมือ

สาเหตุ: workerRowให้escortrow3(ท่ายื่นแขน)ทับmovingและheadingเสมอ ทุกโซนจึงเดินชูมือ. แก้ให้คนงานที่ขนส่งวิญญาณใช้side/down/up rows1/4/5ตามการเคลื่อนที่จริง และidle0เมื่อจุดtimelineไม่เปลี่ยน. อัปเดตmoving/headingจากdx/dyของตำแหน่งจริง; v1fallbackเดินปกติด้วย. คงcarryrows10/11และworkrowsเดิม,fit/insets/footbaselineเดิม. ไม่แก้ภาพ/ความเร็ว/เส้นทาง/lead/ระยะวิญญาณ/การจ่ายรางวัลหรือเซฟ.

## Self-check

- ผ่าน: targeted43/43; full1477/1477(218testfiles),syntax131,diffcheck0 ที่b558a23
- ผ่าน: realadvanceWorkerEscortทุก4โซน/ซ้ายขวาขึ้นลง/หยุด, pickupheading, repeatedpositionidle, cargo/workprecedenceและv1fallback
- ผ่าน: realdrawWorkerใช้row/columnถูกทั้ง4โซนและ4เฟรม,footbaselineไม่ขยับ; existingfit/art/route/delivery/court-cancel/two-minute-restregressionsรวมในfullแล้ว
- ผ่าน: browserภาพก่อน–หลังใช้productiondrawWorkerและadvanceWorkerEscortบนพื้นทดสอบภายนอก ทั้ง4โซน5โหมด; ก่อนrow3ตลอด หลังrow1/4/5/0และหันซ้ายถูก ไม่มีconsoleerror/warn. ภาพไม่ได้เป็นการเดินในแผนที่จริงและไม่ใช้เซฟผู้เล่น; ไม่อ้างว่าbrowserตรวจpathหรือmask. Browserข้อมูลในbrowser-results.json/summaryและภาพworker-walk-a3-*.png
- เปลี่ยนเฉพาะ5ไฟล์,55insertions/9deletions. ไม่มีnpm buildเพราะstaticESmodules. ไม่มีภาพใหม่

สถานะเป็นCodex self-check รอคุณเป้ตรวจรับภาพ ไม่อ้างว่าClaude/DaleQAตรวจแล้ว. Worktreeสะอาดเดิมtea-rest-20261025ใช้branchใหม่codex/2026-10-25-worker-walk; เก็บbranchเก่าไว้ตามhandoff. คิวถัดไปA4ระยะคนงานกับวิญญาณ(12.png)ยังรอทำ; ไม่รวมแก้ในชุดนี้.

เผยแพร่ main542b7d1fbe346f7fd482165ccb8c41e09ec265bb; mergedtreeตรงtestedb558a23; PagesbuiltตรงSHA; live2/2 byte-match.
