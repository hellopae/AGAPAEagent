# AVEGEE — prune img รอบ 2

วันที่ 11 ต.ค. 2569 · ผู้ทำ Codex · รอผู้ตรวจ Dale

Worktree: `/Users/agapae/agapae-work/.codex-worktrees/20261011T091552Z-42cb60c8`
Branch: `codex/20261011T091552Z-42cb60c8` · HEAD ฐาน main: `ec07870dc6e603eff4dbc080f52117b889ea58f1`

ทำงานบน isolated worktree/branch ที่ระบบสร้างไว้และสะอาดตอนเริ่ม ไม่มี commit/merge/push/deploy ไม่เรียก agent อื่น ไม่แก้ hooks/status.json/worklog.json และไม่เข้าถึงสองโฟลเดอร์ AVEGEE ที่ใบงานห้ามแตะ

## ผลและข้อจำกัด

ลบ 59 ไฟล์ที่มีหลักฐานแบบ static รวม 27,100,113 bytes · 27.10 MB · 25.84 MiB และย้าย 25 ไฟล์ต้นฉบับไป art-src/ รวม 30,178,414 bytes · 30.18 MB · 28.78 MiB โดยตรวจ SHA-256 เท่าเดิมทุกไฟล์ ไม่แปลง/บีบอัดภาพ

ยังไม่ผ่านการตรวจขณะเล่นจริง: Playwright ไม่มี executable รุ่น default ที่ตรงกับ package; ทดลอง headless ด้วย Chrome ที่ติดตั้งและ cached Chromium แล้ว process จบ SIGABRT พร้อม EPERM ระหว่าง cleanup จึงใช้ข้อยกเว้น static-only ตามข้อ 4 ของใบงาน รายงานนี้ไม่อ้าง QA ผ่าน

ขนาดยังเกินเพดาน 500 MB ไม่มีหลักฐานเพียงพอให้ลบกลุ่มอื่นอย่างปลอดภัยภายใต้การรัน browser ที่ล้มเหลว จึงคงภาพที่ยังมี fallback/ตัวแปรไม่ชัดเจนไว้

## วิธีพิสูจน์

- เพิ่ม scripts/audit-prune-round2.mjs เป็น read-only audit เฉพาะกลุ่มที่ตรวจแล้ว ไม่ถือ manifest/catalog เป็นหลักฐานการใช้งาน และไม่คุ้มครองทุกไฟล์ด้วย generic img/ + path
- ขยายคีย์ literal ใน src/index, station keys, crew ทุกคนและ poses, hero poses รวม atk-L/atk-R, spirit1–10, intro/Boss Zone1–4; ตรวจ 7,968 artUrl combinations (4 zones × 4 outfits × png/webp). ชุด path ก่อน/หลังเท่ากันทั้งหมด เป็น conservative finite probe ไม่ใช่ symbolic analysis ที่ครอบคลุมทุก JavaScript expression
- กลุ่มสถานี map-v5: themeArt ถูกเรียกก่อน ZMAP/legacy fallback ทุกโซน จึงไม่เลือก PNG รุ่นเก่า; กลุ่ม lokan ใช้ wideStationRoom ก่อน legacy resolver
- ตรวจ stBg, heroFace/heroAtk, story/deva ternary, intro template และ Home cover probe; scene-west-dusk-v3, scene-ground-v1, scene fallback และ cover-v3/cover.webp ยังอยู่เพราะยังอ้างถึง ไม่ลบ fallback
- คง BG รุ่นเก่า, hero-boss รุ่นเก่า และ hero walking รุ่นเก่าที่ resolver/old-manifest fallback หรือ tests ยังใช้อยู่ กลุ่มที่ไม่จัดประเภทไม่ถูกลบ
- origin/codex-app/2026-10-04 ใช้เป็นหลักฐานตรวจไฟล์ branch-only เท่านั้น ไม่คุ้มครอง reference เก่าทั้ง branch; รายการ branchOnly อยู่ใน audit-before.json ไม่มี candidate ทับ branch-only path
- เพิ่ม --prune-missing ให้ generators เดิม: คง tiers, zone registrations, walking metadata, order และ deliberate exclusions; generator แบบ rebuild เดิมทำข้อมูลที่เพิ่มด้วยมือหายและทำให้ tests ล้ม จึงไม่ได้ใช้ผล rebuild เป็นฉบับส่งมอบ
- tests รุ่นเก่าที่เปิด station PNG ถูกปรับให้ตรวจ map-v5 ที่ resolver เลือกจริง (alpha, catalog membership, selected path) และ deva test ตรวจ beggar-v2 ที่ story ใช้; เพิ่ม fixture test ว่า prune mode ไม่เพิ่มไฟล์ excluded และรันซ้ำได้ผลเดิม

## ขนาด runtime และเพดาน

นิยามชุด runtime: index.html, .nojekyll, src/**, img/**, audio/** ยกเว้น .md/.txt; ชุด itch ต้องตัด art-src/, scripts/, tests/, docs/, output/ ออก จึงจะได้ตัวเลขหลังนี้ ไม่ใช่ขนาด ZIP ที่สร้างและทดสอบกับ itch แล้ว

| ฐานวัด | ไฟล์ก่อน | ขนาดก่อน | ไฟล์หลัง | ขนาดหลัง |
|---|---:|---|---:|---|
| Physical runtime ก่อนย้าย originals | 895 | 582,202,468 bytes · 582.20 MB · 555.23 MiB | 812 | 524,922,458 bytes · 524.92 MB · 500.61 MiB |
| เทียบรอบแรกที่ไม่นับ originals ตั้งแต่ก่อนทำ | 871 | 552,026,056 bytes · 552.03 MB · 526.45 MiB | 812 | 524,922,458 bytes · 524.92 MB · 500.61 MiB |

หลังทำเกิน 500,000,000 bytes อยู่ 24,922,458 bytes · 24.92 MB · 23.77 MiB และเกิน 500 MiB อยู่ 0.61 MiB; ไม่อ้างว่าเข้าเพดานแล้ว

## Runtime requests

ไม่มีรายการ request ที่จับจากเกมจริง: จำนวน img/, audio/, จำนวนทั้งหมด และ intersection กับไฟล์ที่ลบ = **ไม่ทราบ/ไม่ได้ตรวจ** ไม่ใช่ 0 รายการ เส้นทาง Home → เริ่มเกม → 4 โซน → ห้อง → ต่อสู้ → ชายแดนยังไม่ได้รันครบ ดู runtime-requests.json และ browser-attempt.log

## ตารางไฟล์ที่ลบ

ทุกแถวผ่าน finite resolver probe ว่าไม่อยู่ใน path ที่เลือก และมีหลักฐาน caller เฉพาะกลุ่มตามคอลัมน์ หลักฐาน “ไม่ถูกโหลดขณะรัน” ยังไม่ได้พิสูจน์ทุกแถวเนื่องจาก browser เปิดไม่ได้

| Path | Bytes | MiB | Resolver/caller evidence | ไฟล์ที่ใช้แทน | Runtime |
|---|---:|---:|---|---|---|
| `img/st-dab.png` | 258,984 | 0.247 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-dab-th.webp` | ไม่ได้ตรวจ |
| `img/st-ngiw.png` | 232,680 | 0.222 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-ngiw-th.webp` | ไม่ได้ตรวจ |
| `img/st-krata.png` | 121,095 | 0.115 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krata-th.webp` | ไม่ได้ตรวจ |
| `img/st-tarang.png` | 146,936 | 0.140 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-tarang-th.webp` | ไม่ได้ตรวจ |
| `img/st-sala.png` | 308,385 | 0.294 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sala-th.webp` | ไม่ได้ตรวจ |
| `img/st-lan.png` | 200,784 | 0.191 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-lan-th.webp` | ไม่ได้ตรวจ |
| `img/st-krajok.png` | 96,289 | 0.092 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krajok-th.webp` | ไม่ได้ตรวจ |
| `img/st-sawan.png` | 139,583 | 0.133 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sawan-th.webp` | ไม่ได้ตรวจ |
| `img/st-frontier.png` | 317,052 | 0.302 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-frontier-th.webp` | ไม่ได้ตรวจ |
| `img/rooms-wide/th-lokan.webp` | 535,638 | 0.511 | src/room-art-assets.js wideStationRoom selects lokan-ice-v2; src/ui.js stBg uses it before legacy artUrl | `img/rooms-wide/th-lokan-ice-v2.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-dab-asia.png` | 302,384 | 0.288 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-dab-asia.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-ngiw-asia.png` | 313,827 | 0.299 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-ngiw-asia.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-krata-asia.png` | 156,524 | 0.149 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krata-asia.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-tarang-asia.png` | 180,756 | 0.172 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-tarang-asia.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-sala-asia.png` | 188,533 | 0.180 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sala-asia.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-lan-asia.png` | 132,589 | 0.126 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-lan-asia.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-krajok-asia.png` | 90,453 | 0.086 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krajok-asia.webp` | ไม่ได้ตรวจ |
| `img/Asia/st-sawan-asia.png` | 202,596 | 0.193 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sawan-asia.webp` | ไม่ได้ตรวจ |
| `img/rooms-wide/asia-lokan.webp` | 601,928 | 0.574 | src/room-art-assets.js wideStationRoom selects lokan-ice-v2; src/ui.js stBg uses it before legacy artUrl | `img/rooms-wide/asia-lokan-ice-v2.webp` | ไม่ได้ตรวจ |
| `img/West/st-dab-west.png` | 290,415 | 0.277 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-dab-west.webp` | ไม่ได้ตรวจ |
| `img/West/st-ngiw-west.png` | 176,234 | 0.168 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-ngiw-west.webp` | ไม่ได้ตรวจ |
| `img/West/st-krata-west.png` | 198,150 | 0.189 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krata-west.webp` | ไม่ได้ตรวจ |
| `img/West/st-tarang-west.png` | 310,790 | 0.296 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-tarang-west.webp` | ไม่ได้ตรวจ |
| `img/West/st-sala-west.png` | 244,782 | 0.233 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sala-west.webp` | ไม่ได้ตรวจ |
| `img/West/st-lan-west.png` | 183,433 | 0.175 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-lan-west.webp` | ไม่ได้ตรวจ |
| `img/West/st-krajok-west.png` | 164,180 | 0.157 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krajok-west.webp` | ไม่ได้ตรวจ |
| `img/West/st-sawan-west.png` | 202,965 | 0.194 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sawan-west.webp` | ไม่ได้ตรวจ |
| `img/rooms-wide/west-lokan.webp` | 533,954 | 0.509 | src/room-art-assets.js wideStationRoom selects lokan-ice-v2; src/ui.js stBg uses it before legacy artUrl | `img/rooms-wide/west-lokan-ice-v2.webp` | ไม่ได้ตรวจ |
| `img/CyberHell/st-dab-cyberhell.png` | 330,338 | 0.315 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-dab-cyberhell.webp` | ไม่ได้ตรวจ |
| `img/CyberHell/st-ngiw-cyberhell.png` | 285,028 | 0.272 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-ngiw-cyberhell.webp` | ไม่ได้ตรวจ |
| `img/CyberHell/st-krata-cyberhell.png` | 169,316 | 0.161 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krata-cyberhell.webp` | ไม่ได้ตรวจ |
| `img/CyberHell/st-tarang-cyberhell.png` | 1,877,961 | 1.791 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-tarang-cyberhell.webp` | ไม่ได้ตรวจ |
| `img/CyberHell/st-sala-cyberhell.png` | 314,496 | 0.300 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sala-cyberhell.webp` | ไม่ได้ตรวจ |
| `img/CyberHell/st-krajok-cyberhell.png` | 131,482 | 0.125 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-krajok-cyberhell.webp` | ไม่ได้ตรวจ |
| `img/CyberHell/st-sawan-cyberhell.png` | 1,463,377 | 1.396 | src/art.js themeArt runs before ZMAP/fallback; src/map-art-v5.js maps this station in every zone | `img/map-v5/st-sawan-cyberhell.webp` | ไม่ได้ตรวจ |
| `img/rooms-wide/cyberhell-lokan.webp` | 581,322 | 0.554 | src/room-art-assets.js wideStationRoom selects lokan-ice-v2; src/ui.js stBg uses it before legacy artUrl | `img/rooms-wide/cyberhell-lokan-ice-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-01.png` | 172,361 | 0.164 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-01-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-01.webp` | 101,486 | 0.097 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-01-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-02.png` | 175,058 | 0.167 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-02-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-02.webp` | 135,256 | 0.129 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-02-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-03.png` | 126,262 | 0.120 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-03-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-03.webp` | 50,380 | 0.048 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-03-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-04.png` | 192,135 | 0.183 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-04-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-04.webp` | 175,066 | 0.167 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-04-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-05.png` | 157,233 | 0.150 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-05-v2.webp` | ไม่ได้ตรวจ |
| `img/intro-panel-05.webp` | 88,712 | 0.085 | src/ui.js showIntro constructs only intro-panel-0${page+1}-v2.webp; old CONTENT_ROWS entries are layout metadata, not image requests | `img/intro-panel-05-v2.webp` | ไม่ได้ตรวจ |
| `img/cover-v5.webp` | 387,738 | 0.370 | src/ui.js cover probe lists v4, v3, cover.webp, cover.png; v5 absent. All remaining fallback files retained | `img/cover-v4.webp` | ไม่ได้ตรวจ |
| `img/home-intro-v5.mp4` | 3,080,073 | 2.937 | index.html splash-video uses v3; src/ui.js has no home video layer | `img/intro-opening-v3.mp4` | ไม่ได้ตรวจ |
| `img/home-animated.mp4` | 775,396 | 0.739 | No runtime call/path; replaced Home splash is index.html splash-video v3 | `img/intro-opening-v3.mp4` | ไม่ได้ตรวจ |
| `img/home-embers.mp4` | 543,773 | 0.519 | No runtime call/path; Home effects now use src/cover-fx-h5b.js canvas and v4 masks | `img/cover-v4.webp` | ไม่ได้ตรวจ |
| `img/intro-splash.mp4` | 1,707,037 | 1.628 | No runtime call/path; index.html splash-video selects v3 | `img/intro-opening-v3.mp4` | ไม่ได้ตรวจ |
| `img/intro-opening-v2.mp4` | 2,325,782 | 2.218 | index.html splash-video selects v3 without v2 fallback | `img/intro-opening-v3.mp4` | ไม่ได้ตรวจ |
| `img/deva-intro/deva-intro-th-v1.png` | 3,010,842 | 2.871 | src/story.js devaIntro ternary selects beggar-v2 for th; other zones retain v1 | `img/deva-intro/deva-intro-th-beggar-v2.webp` | ไม่ได้ตรวจ |
| `img/scene-asia.png` | 671,350 | 0.640 | src/data.js ZONES scene selects asia-v3; zoneImg(scene) reads zone manifest, not root scene-asia | `img/scene-asia-v3.png` | ไม่ได้ตรวจ |
| `img/scene-west.png` | 710,631 | 0.678 | src/data.js ZONES scene selects west-v2; scene-west-dusk-v3 runtime call retained | `img/scene-west-v2.png` | ไม่ได้ตรวจ |
| `img/scene-foreground.png` | 274,227 | 0.262 | src/view3d.js uses ground-v1, no foreground layer path | `img/scene-ground-v1.png` | ไม่ได้ตรวจ |
| `img/prop-throne-platform.png` | 243,575 | 0.232 | src/view3d.js groundDecal explicitly selects v1; assetTier regex only ranks inventory | `img/prop-throne-platform-v1.png` | ไม่ได้ตรวจ |
| `img/minigames/sala-books.png` | 6,826 | 0.007 | src/minigames/sala.js bookSvg uses only v2 | `img/minigames/sala-books-v2.png` | ไม่ได้ตรวจ |
| `img/minigames/sala-book-gold.png` | 3,675 | 0.004 | src/minigames/sala.js bookSvg uses v2 atlas, including gold book | `img/minigames/sala-books-v2.png` | ไม่ได้ตรวจ |

## ตารางต้นฉบับที่ย้าย (ไม่ใช่ลบ)

| จาก | ไป | Bytes | SHA-256 เดิม/ใหม่ |
|---|---|---:|---|
| `img/cover-v4-full.png` | `art-src/cover-v4-full.png` | 2,684,462 | `8c9abee772e09af9efa274aed8ed626cb64918cb4d90f187b2a7c2408ee0eb48` |
| `img/raw/yama-sword-v1/asia-aligned.png` | `art-src/raw/yama-sword-v1/asia-aligned.png` | 1,609,682 | `c6fe751228e5eb1158466539eb297e5c05dce77782a6a1374c363f72f25d7a19` |
| `img/raw/yama-sword-v1/asia.png` | `art-src/raw/yama-sword-v1/asia.png` | 1,553,091 | `3624c2753fce587024550074ffac95ac8de1e27dbc3adcad64eb083350b77dc8` |
| `img/raw/yama-sword-v1/cyberhell-aligned.png` | `art-src/raw/yama-sword-v1/cyberhell-aligned.png` | 1,311,631 | `0bc0e922e839c42bea24b0ec30e068fc95dc19256099133225ae244663074611` |
| `img/raw/yama-sword-v1/cyberhell.png` | `art-src/raw/yama-sword-v1/cyberhell.png` | 1,274,950 | `077187bcef0baf9c1a89661221d350882c64ed1d749af8f4324d913d712df5cc` |
| `img/raw/yama-sword-v1/th-aligned.png` | `art-src/raw/yama-sword-v1/th-aligned.png` | 1,236,656 | `24b5bca392dcbb3fc76d0cedc8ec20dfed1f5c2b14462a150478d2a2fc220b03` |
| `img/raw/yama-sword-v1/th.png` | `art-src/raw/yama-sword-v1/th.png` | 1,191,578 | `aac4ce8957ee71de643ed78384036e42e8c367e0c7455920bc5888158f425230` |
| `img/raw/yama-sword-v1/west-aligned.png` | `art-src/raw/yama-sword-v1/west-aligned.png` | 1,702,989 | `c02bcab6f1c3df8ac23f8a6ed17979829d0b6299bb5bbc92004a0f51fa891a85` |
| `img/raw/yama-sword-v1/west.png` | `art-src/raw/yama-sword-v1/west.png` | 1,665,489 | `e9fd5aae26b1d74bd3c4292f473d81a6f5265c546ccb0bd36c9335815c6de20c` |
| `img/raw/yama-sword-v2/asia-aligned.png` | `art-src/raw/yama-sword-v2/asia-aligned.png` | 1,354,801 | `04c1780db670065b2f4f421639aeb2464e20f7c0f6c4b678294a46ca1f20f1bc` |
| `img/raw/yama-sword-v2/asia.png` | `art-src/raw/yama-sword-v2/asia.png` | 1,330,450 | `722bfccf0f20c78a16cd2823f35c1d6acce1b41aee02ab8478cc4c3b1a7a7858` |
| `img/raw/yama-sword-v2/cyberhell-aligned.png` | `art-src/raw/yama-sword-v2/cyberhell-aligned.png` | 1,209,683 | `565968bc9bea98f54005d7f21dcb2b65a88f031476038afa319b81ad935b1457` |
| `img/raw/yama-sword-v2/cyberhell.png` | `art-src/raw/yama-sword-v2/cyberhell.png` | 1,189,184 | `7de418f30648d4f418e209a577487b5ed283ee993a7fe21d88a3973905fda1a7` |
| `img/raw/yama-sword-v2/th-aligned.png` | `art-src/raw/yama-sword-v2/th-aligned.png` | 1,192,771 | `ea0913bde2f3e24787ec566c02561bb9d99b5d463443b1ccc87feda01c63fe6a` |
| `img/raw/yama-sword-v2/th.png` | `art-src/raw/yama-sword-v2/th.png` | 1,173,743 | `ee22d2706a3e7ee60f4de69afdbdfc02cadd3946057605378646c2ea2b90504d` |
| `img/raw/yama-sword-v2/west-aligned.png` | `art-src/raw/yama-sword-v2/west-aligned.png` | 1,379,421 | `62c332c4abc8751c186d4302fbbbb273a78facbb7e873a3a7a0a0bde9ee6a019` |
| `img/raw/yama-sword-v2/west.png` | `art-src/raw/yama-sword-v2/west.png` | 1,364,765 | `bfc380a73789ca6919d2443a6fcd1fd8e43a000d3262ea910de1e84a71641f46` |
| `img/raw/yama-sword-v3/th-aligned.png` | `art-src/raw/yama-sword-v3/th-aligned.png` | 1,227,119 | `699fbdb5920f855389475581023e506fc308ebf4d74b7580772d5e04af54d81a` |
| `img/raw/yama-sword-v3/th-facing-right.png` | `art-src/raw/yama-sword-v3/th-facing-right.png` | 676,347 | `7efc2aeab965b1400420211690719b4d23b6d5205dbf398cbd9a9b4ba0ef96da` |
| `img/yama-sword-v2/README.md` | `art-src/yama-sword-v2/README.md` | 2,002 | `97ee93f23bb3532b6762f93f5a358a6d6355af04ea0c4f9b5f4ea5fa2008fad9` |
| `img/yama-sword-v2/hero-yama-asia-sword.webp` | `art-src/yama-sword-v2/hero-yama-asia-sword.webp` | 1,039,796 | `1de4d2bf1eaf07c961f217cdc9a8ffc0041936179c1b495a650f1b40e08842a0` |
| `img/yama-sword-v2/hero-yama-cyberhell-sword.webp` | `art-src/yama-sword-v2/hero-yama-cyberhell-sword.webp` | 857,062 | `5c600b1fb026c55899c4942fe953390629b48798399c175b6496804e6ce2015e` |
| `img/yama-sword-v2/hero-yama-th-sword.webp` | `art-src/yama-sword-v2/hero-yama-th-sword.webp` | 935,902 | `ff63d5dfb74afb3f23b50d284f1c92f26e3449cc80eff96b8789b960bc53f00b` |
| `img/yama-sword-v2/hero-yama-west-sword.webp` | `art-src/yama-sword-v2/hero-yama-west-sword.webp` | 1,007,310 | `9f42f77cd7a78ec556cca552ffe094fe9e25afcf18c734601b1186c48f35307c` |
| `img/yama-sword-v2/prompts.json` | `art-src/yama-sword-v2/prompts.json` | 7,530 | `5bcf4978176efe7aa4e4aeb461dd4d1478f31274ab35a05b47ccbc72e42c58bf` |

แก้ source/read/output path ในสคริปต์ที่เกี่ยวข้อง และให้ export-yama-sword-v2 เก็บ frame geometry ของชุดเก่าใน art-src แทนการเขียนทับ runtime v3/v4 table ไม่มีการรัน export/prep เพื่อแปลงภาพ

## ผลทดสอบ/ตรวจ

- node --test tests/*.test.mjs: **744 tests, 744 pass, 0 fail, 0 skipped**; exit 0 (tests-final.tap)
- node --test tests/prune-catalogs.test.mjs: 1 pass; fixture ตรวจ curated metadata/order และ idempotence (prune-tests.tap)
- audit ก่อน/หลัง: 7,968 selections เท่ากัน; 59 deleted files ไม่อยู่แล้ว; 25 move hashes เท่ากัน; manifest/catalog 1,241 entries ชี้ไฟล์ที่มีอยู่และไม่มี deleted/moved path (verification.log)
- Python AST parse ของสคริปต์ที่แก้: สำเร็จ; git diff --check: exit 0
- รันเต็มครั้งแรก 743 tests: 733 pass/10 fail จาก manifest rebuild และ assertions ภาพรุ่นเก่า; แก้ปัญหาและรันใหม่ตามผลข้างต้น (tests.tap)
- supplemental node scripts/check-image-archive.mjs: ล้มด้วย TypeError document.documentElement ที่ stub เดิมของสคริปต์ ไม่ได้แก้สคริปต์นี้นอกขอบเขต; ไม่ใช้ผลนี้อ้างผ่าน (archive-check.log)
- Playwright browser launch: ไม่สำเร็จ (browser-attempt.log); ไม่มี gameplay/request QA

## Self-check เกณฑ์รับงาน

| ข้อ | ผล | หลักฐาน/ช่องว่าง |
|---|---|---|
| 1 ตาราง path/size/resolver/replacement/runtime | บางส่วน | ตารางครบ 59 ไฟล์และ static evidence; runtime ไม่ได้ตรวจ ใช้ข้อยกเว้นตามใบงาน |
| 2 Runtime ก่อน/หลังเทียบ itch.io | มีผลวัด | วัดทั้ง physical และฐานเดิม; หลัง 524.92 MB ยังเกิน 500 MB |
| 3 Requests จริงและ 0 รายการถูกลบ | ยังพิสูจน์ไม่ได้ | browser เปิดไม่ได้; จำนวน/intersection เป็น unknown ไม่อ้าง 0 |
| 4 node --test tests/*.test.mjs ผ่านหมด | ผลทดสอบผ่าน | 744/744 exit 0; ไม่เท่ากับ QA ผ่าน |

## Changed files

รายการเต็มที่แก้/ลบจาก git diff --name-status (D ของไฟล์ที่ย้ายจับคู่ในตารางต้นฉบับด้านบน):

```text
D	img/Asia/st-dab-asia.png
D	img/Asia/st-krajok-asia.png
D	img/Asia/st-krata-asia.png
D	img/Asia/st-lan-asia.png
D	img/Asia/st-ngiw-asia.png
D	img/Asia/st-sala-asia.png
D	img/Asia/st-sawan-asia.png
D	img/Asia/st-tarang-asia.png
D	img/CyberHell/st-dab-cyberhell.png
D	img/CyberHell/st-krajok-cyberhell.png
D	img/CyberHell/st-krata-cyberhell.png
D	img/CyberHell/st-ngiw-cyberhell.png
D	img/CyberHell/st-sala-cyberhell.png
D	img/CyberHell/st-sawan-cyberhell.png
D	img/CyberHell/st-tarang-cyberhell.png
D	img/West/st-dab-west.png
D	img/West/st-krajok-west.png
D	img/West/st-krata-west.png
D	img/West/st-lan-west.png
D	img/West/st-ngiw-west.png
D	img/West/st-sala-west.png
D	img/West/st-sawan-west.png
D	img/West/st-tarang-west.png
D	img/cover-v4-full.png
D	img/cover-v5.webp
D	img/deva-intro/deva-intro-th-v1.png
D	img/home-animated.mp4
D	img/home-embers.mp4
D	img/home-intro-v5.mp4
D	img/intro-opening-v2.mp4
D	img/intro-panel-01.png
D	img/intro-panel-01.webp
D	img/intro-panel-02.png
D	img/intro-panel-02.webp
D	img/intro-panel-03.png
D	img/intro-panel-03.webp
D	img/intro-panel-04.png
D	img/intro-panel-04.webp
D	img/intro-panel-05.png
D	img/intro-panel-05.webp
D	img/intro-splash.mp4
M	img/manifest.json
D	img/minigames/sala-book-gold.png
D	img/minigames/sala-books.png
M	img/preload-catalog.json
D	img/prop-throne-platform.png
D	img/raw/yama-sword-v1/asia-aligned.png
D	img/raw/yama-sword-v1/asia.png
D	img/raw/yama-sword-v1/cyberhell-aligned.png
D	img/raw/yama-sword-v1/cyberhell.png
D	img/raw/yama-sword-v1/th-aligned.png
D	img/raw/yama-sword-v1/th.png
D	img/raw/yama-sword-v1/west-aligned.png
D	img/raw/yama-sword-v1/west.png
D	img/raw/yama-sword-v2/asia-aligned.png
D	img/raw/yama-sword-v2/asia.png
D	img/raw/yama-sword-v2/cyberhell-aligned.png
D	img/raw/yama-sword-v2/cyberhell.png
D	img/raw/yama-sword-v2/th-aligned.png
D	img/raw/yama-sword-v2/th.png
D	img/raw/yama-sword-v2/west-aligned.png
D	img/raw/yama-sword-v2/west.png
D	img/raw/yama-sword-v3/th-aligned.png
D	img/raw/yama-sword-v3/th-facing-right.png
D	img/rooms-wide/asia-lokan.webp
D	img/rooms-wide/cyberhell-lokan.webp
D	img/rooms-wide/th-lokan.webp
D	img/rooms-wide/west-lokan.webp
D	img/scene-asia.png
D	img/scene-foreground.png
D	img/scene-west.png
D	img/st-dab.png
D	img/st-frontier.png
D	img/st-krajok.png
D	img/st-krata.png
D	img/st-lan.png
D	img/st-ngiw.png
D	img/st-sala.png
D	img/st-sawan.png
D	img/st-tarang.png
D	img/yama-sword-v2/README.md
D	img/yama-sword-v2/hero-yama-asia-sword.webp
D	img/yama-sword-v2/hero-yama-cyberhell-sword.webp
D	img/yama-sword-v2/hero-yama-th-sword.webp
D	img/yama-sword-v2/hero-yama-west-sword.webp
D	img/yama-sword-v2/prompts.json
M	scripts/export-map-v5.py
M	scripts/export-yama-sword-facing.py
M	scripts/export-yama-sword-v2.py
M	scripts/export-yama-sword.py
M	scripts/h5b-cover-masks-v4.py
M	scripts/make-manifest.py
M	scripts/make-preload-catalog.mjs
M	scripts/prep-art.py
M	scripts/prep-ui-icons.py
M	tests/30d.test.mjs
M	tests/30f.test.mjs
M	tests/e3-events-z1z2.test.mjs
```

ไฟล์/โฟลเดอร์ใหม่:

- art-src/ (25 moved originals; SHA-256 ตามตาราง)
- scripts/audit-prune-round2.mjs
- tests/prune-catalogs.test.mjs
- output/prune-round2/report.md และหลักฐาน audit-before.json, audit-after.json, browser-attempt.log, runtime-requests.json, tests.tap, tests-final.tap, prune-tests.tap, verification.log, archive-check.log
