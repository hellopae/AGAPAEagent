# A7 — ขนาดยามาเท่ากันทุกชุด

คุณเป้สั่งต่อคิว15/16.png พร้อมถามจำนวนค้าง. เริ่มรอบนี้12รายการทำได้+2กลุ่มรอmask(3แผนที่). Base5fef1a2,branchcodex/2026-10-25-yama-outfit-sizeในworktreeสะอาดเดิม.

วัดalphaภาพจริง: bookidleบางทิศสูง308เทียบ320ทั้งที่rendererหาร320เหมือนกัน. Normalizeด้วยheightและfootbaselineของแต่ละstyle/directionจากunionทุกidleframe ใช้scaleคงที่ร่วมidle+walkเพื่อไม่หายใจยืดหด;เก็บการยกเท้าธรรมชาติของท่าเดิน. Swordidleและstandingfallbackใช้visiblebodyfitด้วย. ไม่เปลี่ยนworldposition/speed/collision/gameplay/ภาพต้นฉบับ. UItrialและbattleใช้การfitเดิมที่คำนวณbodyอยู่แล้ว ให้ตรวจว่าเปลี่ยนชุดไม่ยืด/หลุดกรอบ และแก้เฉพาะเมื่อมีหลักฐาน.

เกณฑ์: 4outfits×4directions idleheightเท่ากันจากalphaจริง,เท้าอยู่baselineเดียวกัน,8walkframesและtimingเดิม,เปลี่ยนชุดในmap/roomไม่ขยับworldfoot;fallbackเมื่อโหลดช้าคงขนาด,combat/swordไม่ถอยหลัง. Generatedmetadataมีscriptตรวจซ้ำ+hashsource. Browsernativeสลับชุดที่ตำแหน่งเดียวกัน/room/mobile+trial,fullzero-red/Pages/liveก่อนติ๊กคิว. A6คงidleไม่ยิงลูกไฟ. งานUIใหม่ไม่ทำในA7. Ownervisualacceptancepending.
