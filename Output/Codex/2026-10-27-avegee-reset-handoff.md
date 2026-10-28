# AVEGEE — คิวค้างและจุดรับช่วงหลัง reset

วันที่27ตุลาคม2569. คุณเป้สั่งหยุดพักเพราะusageเหลือ4%. ไม่ทำงานต่อ/รันgeneration/เผยแพร่ระหว่างพัก. ไม่ตั้งautomation. เมื่อผู้ใช้กลับมาให้รับช่วงจากไฟล์นี้และคิวหลัก AVEGEE-WORK-QUEUE.md.

## สถานะเว็บและ checkout
- เผยแพร่ล่าสุด db88a609740794b666f39a65c876ef111c13f637 (C3โซน2): full1540/1540,syntax134,227files,Pagesbuilt/live26/26. งาน27ต.ค.เป็นข้อมูล/ตรวจ/ทดลอง ไม่มีproductioncommitใหม่.
- real main: /Users/agapae/agapae-work/AVEGEE
- managed worktree: /Users/agapae/agapae-work/.codex-worktrees/tea-rest-20261025, branch codex/2026-10-26-zone2-terrain-repaint,HEAD a341210,ตรวจแล้วclean. เริ่มงานโค้ดถัดไปต้องfetch/checkmainและสร้างcodex/branchใหม่ตามงาน.
- OLD /Users/agapae/Documents/Work PAE/Claude/AVEGEE dirtyเดิม:ห้ามstage/reset/แก้gameplay;ใช้เฉพาะoutput/coordinationที่เป็นงานเรา. เก็บbranches/worktreesmergedตามtakeover.
- ใบงาน/หลักฐาน/คิวอยู่ AGAPAE Agent/Output;ข้อมูล27ต.ค.บางส่วนยังuncommitted ต้องตรวจgitstatusแล้วเก็บเฉพาะงานเรา ห้ามรวมuntracked .agents/skills/map-markup-extract/ของผู้ใช้. ข้อมูลบันทึกลงดิสก์แล้ว ไม่อ้างว่าทั้งหมดpushแล้ว.

## คิวตามลำดับที่แนะนำหลังกลับมา
1. Z3-R: ใช้ภาพทางเดินโซน3ฉบับ27ต.ค. ตรวจและนำเข้าเกมก่อนขยับงานพื้น/เงา. รับภาพแล้วใน2026-10-27-avegee-zone3-inputs/. Map-Zone3-2 hash6ca6f623…ใหม่ เทียบold ee60d92e…. SIFT182inliers median0.158px/p950.894px; ORB25ไม่ผ่าน. candidate480x320มี27338cells ผืนหลัก27328และเกาะ10cellsมุมซ้ายบน. ต้องตรวจเกาะ/การsamplingและทางเข้าอาคาร,NPC,เซฟเดิม;ห้ามเติมทางผ่านสีแดงเอง. ยังไม่activate ยังคงmaskเดิม. Map-Zone3-1 hashf2f20898…ตรงข้อมูลต้นไม้ที่เผยแพร่แล้ว28ต้น(เขียว14 ฟ้า9 ขาว5) ไม่วางซ้ำ.
2. L1/L2: ปิดเกณฑ์ตรวจเงาหลักบนTown2ที่พร้อม. ของเดิมมีcast field+partial actor shadeอยู่แล้ว. ตรวจแดด/ครึ่งเงา/เต็มเงาและเดินขึ้นลงจริงผ่านแล้ว,UIไม่ย้อม. หลักฐาน2026-10-26-avegee-shadow-pilot-review/PROGRESS-2026-10-27.md. เหลือแยกcasterบ้าน/ต้นไม้,ตัวละครร่วมฉาก,มือถือ,OSreduced-motion,depth/zoomและการวัดperformanceตามสภาพจริง. CPUrefresh30ครั้งmedian1.70ms/p952.90msเป็นCPUdispatch ไม่ใช่FPS. ห้ามปิดคิวจากsource/testอย่างเดียวหรืออ้างเขียนใหม่.
3. C4: ความคมชัดซูม town2,3,4 และborder1–2,2–3,3–4. ต้องสร้างรายละเอียดจริง/แบ่งภาพและแยกชั้นพื้น-อาคาร-ต้นไม้ ไม่เพียงขยายภาพ. C3town2เปลี่ยนโทนแล้วแต่container4915x3277มีresampling1.8จากquadrants1536x1024 จึงไม่ปิดC4. เริ่มพื้นที่ผังนิ่งก่อน;พื้นที่รอmaskเตรียมภาพได้แต่ยังไม่เปิดเดิน.
4. L3: ทดสอบและนำเอฟเฟกต์เข้าrendererตามbiomeและscene:ใบไม้หล่น,ลาวาเดือด,น้ำไหล,หิมะ,ไฟ/ประกาย,นีออน,หมอก/แสงตามเหมาะสม. ขอบเขตล่าสุดทุกtown1–4,border1–2/2–3/3–4,ฉากต่อสู้และสอบสวน. ใช้ระบบเดิมเมื่อเหมาะ ไม่ใส่ทุกชนิดทุกพื้นที่. ตรวจloop/alpha/ภาพซูม/บังUI/ทางเดิน/reduced-motion/mobile/performance. Shadoเป็นเครื่องมือasset ไม่ใช่ย้ายเกมไปเอนจินใหม่.
5. C2 (พักตามคำสั่งข้ามงานทางเดิน): border1–2สิ่งก่อสร้างขวางทางและทางแคบ. รอข้อมูลตำแหน่งที่ผู้ใช้จะส่ง/ยืนยันพร้อมค่อยแก้ภาพกับcollisionให้ตรงกัน. ภาพต้นไม้C1ที่เผยแพร่แล้วไม่ถือว่าปิดงานนี้.
6. B5bโซน3: หลังeventย้ายบอสไปหน้าถ้ำ เมื่อมีmaskborder3–4. โซน1และ2ทำแล้ว. โซน4ม้าไม้คงตำแหน่งล่างเดิมทั้งช่วงและหลังeventตามผู้ใช้ ไม่สร้างถ้ำเพิ่ม.

## Shado: พร้อมใช้ แต่ไฟทดลองยังไม่ผ่านภาพ
- MCP namespace mcp__shado_game_studio มีจริง;statusล่าสุดPro,spriteSheettrue,vfxLayers32,native. Whitelistได้แล้ว ไม่ต้องสมัคร/ซื้อซ้ำ. ผู้ใช้สมัครเอง.
- Skills/AGENTS pack1.8.0อยู่ /Users/agapae/Documents/Work PAE/Claude/Shado/shado-ai-pack/. statusก่อนใช้,ai_providersก่อนgeneration. ทุกproviderreadyfalse;ไม่มีAIgenerationหรือAPIkeyในรอบนี้. ใช้preset+แก้layers/customtextureเท่านั้น.
- บัญชี shado.ghostframes.ai ในภาพก่อนหน้าคนละเว็บกับstudio.playshado.com. ไม่ใช้เครดิต$2เว็บนั้นมาสร้างassetsโดยพลการ.
- ต้นแบบ Fireส่งออกPNG768x768/36เฟรม128px/91msและJSON/APNGได้จริง. rawtest OLD/output/coordination/shado-exports/test-2026-10-27/.
- ทดลองปรับ4รุ่น OLD/output/coordination/shado-exports/fire-pilot-2026-10-27/{v1,v2,v3,v4}/. v1/v2clipping,v3เล็ก,v4ไม่ชนขอบแต่ภาพบาง/ขาว/แตกเมื่อmaxzoom. ไม่ยอมรับใช้แทนไฟเดิมและยังไม่เผยแพร่. v4alphaunion[69,59,76,90],36/36nonempty. Custompenwhiteถูกเก็บในexportJSONเป็นimage/dataUrl;ระวังvfx_get/vfx_set roundtripก่อนหน้าเคยเสียcustomtextureเป็นsoft ต้องตรวจจริง.
- REVIEW.md+native-before/after/still.pngครบ. LocalQAแทรกdrawTorchFlameเฉพาะHTTPresponse,ใช้originalเมื่อcyber/loading. ทดลองTown2เท่านั้น ไม่ใช่ครบ7maps/ทุกscene. ภาพนิ่งframe20ผ่านQAcontrolไม่เท่ากับตรวจOSreducedmotion. ขนาดsource7pxกว้างจึงแตก/บาง. ยังต้องปรับให้ส้มและอ่านรูปทรงได้/เลือกเอฟเฟกต์อื่นถ้าเหมาะกว่า ไม่ฝืนใช้assetด้อยกว่าของเดิม.
- Shadoปัจจุบันเปิด VFX AVEGEE Torch Pilot;export_vfx(engine="sprite"|"shado",out_dir=...) ใช้ได้. NativeMCPดีกว่าUIเพราะnativeAXอ่านได้เฉพาะwindowและCUAเคยtimeout.

## รอคุณเป้
- masktown4
- maskborder3–4 (ต้องใช้ก่อนเปิดเส้นทางและB5bโซน3)
- งานทางเดินที่ผู้ใช้สั่งข้ามคงพัก;town3ฉบับใหม่รับแล้วจึงทำZ3-Rได้ ไม่ต้องขอรูปซ้ำ

## เสร็จและขึ้นเว็บแล้ว ไม่ทำซ้ำ
- ระบบคนงาน/ปลดล็อกหลังevent,ขนส่ง/สร้างซ่อมรอทัณฑ์ตรวจรับ/ขายวัสดุ/แจกอาหาร,โรงอาหาร;ช่วงไม่มีคนงานใช้นิรารับวิญญาณ.
- เดินทางเรือยามา+นิรา,กานต์ฝากโซน;UIทีม/อาหาร/ใครคุม/กานต์/อารมณ์บรรเทาโทษ.
- A1–A7:guardcutscene,พักชา2นาที,ท่าเดินคนงาน,ระยะวิญญาณ,หัวหน้าคอมเมนต์,หอกระจกidle,ขนาดยามา.
- B1–B5a:ชื่อไม่ล้น,โต๊ะนิราการ์ด/ข้อความ,ซ่อนรายละเอียดท้าย,ป้ายจัดทีมใกล้นิรา,ชื่อศัตรูเล็กลง.
- B5bโซน1cef1202/โซน21127c84. C1border1–2ต้นไม้986751d. C3town2โทนและrootdb88a60. C5ต้นไม้หนาว+C6maskborder2–3/บันได384af89.
- ภาพtrailerยามาเรื่องเขา/หางเป็นงานก่อนหน้าที่ไม่อยู่checkboxค้างปัจจุบัน;หากจะกล่าวสถานะเพิ่มเติมต้องดูบันทึกต้นทาง ไม่สั่งสร้างซ้ำจากความจำ.

## จุดเริ่มและกติกาสืบต่อ
- ก่อนแก้โค้ดอ่านใบงานเฉพาะงานและคิวหลัก. ไม่ใช้subagent/ส่งแชตอื่น. ผู้ใช้อนุมัติทำต่อเนื่อง+merge/pushmainเมื่อผ่านตรวจแล้ว ไม่ขออนุมัติซ้ำ.
- Fullreview runner: OLD/output/coordination/run-full-review.py;รันบนcandidateที่ไม่เปลี่ยนระหว่างตรวจ แล้วตรวจPages/livebytes/nativeก่อนปิดงาน. ไม่มีbuildnpmในเกมstaticESmodules.
- เลี่ยงclaimed QAจากClaude:ผลเป็นself-checkรอคุณเป้ตรวจหน้าตา.
- Localserversที่เคยค้าง:8826/8827C3,8828shadow,8829firepilot(session58159). ตรวจPID/commandก่อนหยุดหรือใช้ต่อ อย่าฆ่าพอร์ตอื่นจากการเดา. browserอาจรีเซ็ตIDหลังapprestart; inventoryก่อนใช้และCUArewriteDocumentationหลังcompaction. ไม่มีprocessgeneration/fullsuiteกำลังรัน.
- ผู้ใช้สั่งพักรอresetแล้ว:จบการสรุปและหยุด ไม่ทำทดลอง/แก้โค้ด/เผยแพร่เพิ่ม.
