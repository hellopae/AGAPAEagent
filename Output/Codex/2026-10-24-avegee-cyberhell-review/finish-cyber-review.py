from pathlib import Path
import json,hashlib,subprocess,shutil
from PIL import Image
r=Path('/Users/agapae/Documents/Work PAE/Claude/AGAPAE Agent/Output/Codex/2026-10-24-avegee-cyberhell-review')
w=Path('/Users/agapae/agapae-work/.codex-worktrees/cyberhell-art-20261024')
shutil.copy2('/private/tmp/cyber-composite-data.mjs',r/'composite-data.mjs')
files=subprocess.check_output(['git','diff','--name-only','--diff-filter=A','origin/main','HEAD'],cwd=w,text=True).splitlines()
assert len(files)==38 and all(f.startswith('img/') for f in files)
assert subprocess.check_output(['git','diff','--name-only','origin/main','HEAD','--','src','index.html','tests'],cwd=w,text=True)==''
inventory=json.loads((r/'art-inventory.json').read_text());assert len(inventory)==16
for a in inventory:
 im=Image.open(w/a['file']);assert list(im.size)==a['canvas'] and a['bottom_delta']==0 and abs(a['center_delta'])<=.5
 assert im.getchannel('A').getextrema()==(0,255)
report={'commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=w,text=True).strip(),'added_files':38,'sprites':16,'ground_chunks':20,'image_only_diff':True,'production_code_changed':False,'files':[{'path':f,'bytes':(w/f).stat().st_size,'sha256':hashlib.sha256((w/f).read_bytes()).hexdigest()} for f in files]}
(r/'asset-integrity.json').write_text(json.dumps(report,indent=2)+'\n')
(r/'README.md').write_text('''# Z4 Cyberhell — art-only handoff review

Implementation: `c089a4d` on `codex/cyberhell-art-20261024`, based on west main `3541c29`. Publication and final tests are recorded in review-status.json.

## Scope
38 new files only: 20 terrain chunks, stitched preview/report, and 16 transparent sprites. No production JavaScript, gameplay, preload catalog, reward logic, existing art, tree placements or walk mask changed. Cyberhell and both pending border routes remain disabled. The art preview enables the kit in an external HTTP-only fixture; its floor and placements are borrowed from Zone1, so it does **not** establish Cyberhell navigation acceptance.

## Ground
Four 1536×1024 built-in image-generation edits with Zone1 topology references and sequential overlap seeds. Theme follows Mind M1 sections2/3/6: obsidian, subdued gold circuitry, violet crystals, cyan spectral river/energy and original orange lava channels. `ground/` preserves exact prompts, raw quadrants, seed references, rejected SW draft and dry-landing correction. The first SW draft flooded the accessible bank landing under the lower left staircase; corrected before stitching. No additional docks. Final stitch4915×3277, preview1536×1024, 20 hashed chunks.

Reviewed whole ground and all four source/neighbor/blend seam strips. SIFT inliers NW–NE736, NW–SW51, NE–SE138, SW–SE209; p95 residuals1.662,2.061,2.443,2.086 canvas pixels. This supports feature alignment, not pixel-identical preservation or a semantic walk mask. Color differences remain between generated overlap regions and are blended by the standard stitcher.

`ground/cyberhell-ground-1536x1024.png` is the clean input for owner red walkability marks. Do not derive an authoritative floor mask from this art without owner input.

## Sprites
16: judgment platform, four houses, four trees, lamp, torch, rock, four station facades. Built-in image generation only, exact prompts/raw PNG/final PNG retained under art/. The first thorn draft had an oversized rocky island; a focused edit replaced it with compact exposed roots. No color-key transparency or painted replacement.

All exported WebP canvases match Thai reference dimensions, alpha>=8 visual bases have bottom delta0 and horizontal center delta<=0.5px. Resize is aspect-preserving and anchored to each reference base. Alpha0/255 verified for all16; white/dark/magenta edge contact sheets reviewed. Old sprites remain untouched. `art-inventory.json` contains dimensions/bboxes and per-file checks. Final export q92/method4.

## Visual QA
Actual production renderer served locally with external preview injection; desktop1280×800 overview/play and mobile390×844 screenshots saved here. Browser console warnings/errors empty. Mobile document clientWidth=scrollWidth390 and canvas374×828. `cyberhell-actual-scale-composite.jpg` uses production stationBox, actual prop resolution, house sites and depth ordering with the temporary Cyberhell art kit; no lighting/characters and no owner-approved placements implied. Contact sheet and alpha edges reviewed.

Self-check by Codex only. Owner visual acceptance and Claude review remain pending. Worktree/branch retained per handoff; no cleanup deletion.
''')
