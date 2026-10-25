# UI-B5a — ชื่อปีศาจชายแดนเล็กลง

คุณเป้สั่งคิวต่อ อ้าง2.png. ลดป้ายชื่อศัตรูทุกโซนและบอสจากสัดส่วนเดิม~22pxที่937hให้10–14pxตามviewport โดยยังแสดงชื่อ/levelครบ. รักษาบอสและNPCตำแหน่ง/บทบาท,event,reach,wave,rewardทั้งหมด. ตรวจcanvasจริง4zones/desktop/mobile,ภาพnativeและenterbattleเดิม. รอตรวจรับภาพ.

B5bตำแหน่งบอสยังแยกอยู่ในคิว ห้ามติ๊กตามงานfont: ปัจจุบันfrontier.jsมีguideBoss(zone-bossผู้ตรวจการ),challengeBoss(boss-frontierประลอง),releasedFrontierBoss(พ้นโทษ)และinvasion breach:bossคนละบทบาท. game.challengeCanTalkรองรับcaveเฉพาะthก่อนfarewell;หลังfarewellใช้ด่าน. routeBossCaveมีเฉพาะth:asia ส่วน2–3/3–4ไม่มีcavegeometryและยังdisabledตามmask;cyberhellไม่มีoutboundroute. ต้องออกแบบวางบทบาทให้ตรงกับคำขอใหม่ไม่ย้ายผู้ตรวจการผิดตัว/ไม่เปิดhitspotล่องหน/ไม่ปลดล็อกmaskผิด. บันทึกไว้สำหรับงานถัดไป ไม่ถือว่าB5bเสร็จ.
