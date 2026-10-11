import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const fixture = mkdtempSync(join(tmpdir(), 'avegee-scan-'));
const scanner = process.argv[2];
const files = {
  'index.html': '<link href="src/styles.css"><img src="img/direct.png">',
  'src/styles.css': '.a{background:url(../img/css.png)}',
  'src/story.js': 'const video = `img/deva-intro/deva-intro-${zone}-v1-web.mp4`; artUrl("hero-yama-atk");',
  'img/manifest.json': '{"rest":["manifest.png"]}',
  'img/preload-catalog.json': '{"shared":["img/preload.png"]}',
  'scripts/export.py': 'source="img/raw/master.png"',
  'output/preview.html': '<base href="../../"><img src="../../img/direct.png">',
  'src/text.js': 'const a="{name}", b="output";',
  'tests/example.mjs': 'assert(!files.some(p=>p.startsWith("output/")));',
  'img/direct.png':'x', 'img/css.png':'x', 'img/manifest.png':'x', 'img/preload.png':'x',
  'img/branch.png':'x', 'img/raw/master.png':'x', 'img/hero-yama-atk-L.png':'x',
  'img/deva-intro/deva-intro-asia-v1-web.mp4':'x',
  'img/deva-intro/deva-intro-mystery-v1-web.mp4':'x',
  'img/deva-intro/deva-intro-th-v2-web.mp4':'x',
  'img/unused.png':'x', 'output/unreferenced.txt':'x', '_walktest.html':'test', '_depthtest.html':'test',
};
try {
  mkdirSync(join(fixture,'scripts'),{recursive:true});
  mkdirSync(join(fixture,'bin'));
  copyFileSync(scanner, join(fixture,'scripts/find-unused-assets.mjs'));
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(fixture,p,'..'),{recursive:true}); writeFileSync(join(fixture,p),text);
  }
  writeFileSync(join(fixture,'listing.json'),JSON.stringify(Object.keys(files)));
  writeFileSync(join(fixture,'bin/git'), `#!/usr/bin/env node
const fs=require('node:fs'); const a=process.argv.slice(2);
if(a[0]==='rev-parse'){if(process.env.FAIL_BRANCH && a.includes('--verify'))process.exit(1);process.stdout.write('fixture-sha\\n');}
else if(a[0]==='ls-files')process.stdout.write(JSON.parse(fs.readFileSync('listing.json')).join('\\0')+'\\0');
else if(a[0]==='ls-tree')process.stdout.write('src/branch.js\\0');
else if(a[0]==='show')process.stdout.write('const b="img/branch.png";');
else process.exit(1);
`, {mode:0o755});
  const env={...process.env,PATH:join(fixture,'bin')+':'+process.env.PATH};
  const run=()=>JSON.parse(execFileSync(process.execPath,[join(fixture,'scripts/find-unused-assets.mjs')],{env,encoding:'utf8'}));
  let result=run();
  const retained=new Set(result.retained.map(e=>e.path));
  for(const p of ['img/direct.png','img/css.png','img/manifest.png','img/preload.png','img/branch.png','img/raw/master.png','img/hero-yama-atk-L.png','img/deva-intro/deva-intro-asia-v1-web.mp4','img/deva-intro/deva-intro-mystery-v1-web.mp4'])assert(retained.has(p),p);
  const unused=new Set(result.unused.map(e=>e.path));
  for(const p of ['img/unused.png','img/deva-intro/deva-intro-th-v2-web.mp4','output/unreferenced.txt','_walktest.html','_depthtest.html'])assert(unused.has(p),p);
  assert(result.unresolvedPatterns.some(p=>p.pattern==='img/deva-intro/deva-intro-*-v1-web.mp4' && p.matches.length===2));
  writeFileSync(join(fixture,'scripts/export.py'), 'RAW = os.path.join(ROOT, "img", "raw")');
  result=run(); assert(result.retained.some(e=>e.path==='img/raw/master.png'));
  writeFileSync(join(fixture,'src/story.js'), 'const p = "img/" + unknownKey;');
  result=run(); assert(!result.unused.some(e=>e.path.startsWith('img/')));
  const failed=spawnSync(process.execPath,[join(fixture,'scripts/find-unused-assets.mjs')],{env:{...env,FAIL_BRANCH:'1'}});
  assert.notEqual(failed.status,0);
  console.log('Scanner fixtures: direct/CSS/JSON/catalog/branch/script/semantic/dynamic/false-positive/missing-branch checks passed.');
} finally {rmSync(fixture,{recursive:true,force:true});}
