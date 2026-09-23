#!/usr/bin/env node
// All HTTP is mocked; this suite never writes to Firestore.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { registry, evaluate, bangkokDate, isoWeek, checkRoutine } from './routine-freshness.mjs';
const now = new Date('2026-09-23T17:01:00Z');
const stamp = '2026-09-23T16:00:00.123456Z';
const val = v => v === null ? { nullValue: null } : typeof v === 'string' ? { stringValue: v } : typeof v === 'boolean' ? { booleanValue: v } : typeof v === 'number' ? { integerValue: String(v) } : Array.isArray(v) ? { arrayValue: { values: v.map(val) } } : { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, val(x)])) } };
const raw = fields => ({ updateTime: stamp, fields: val(fields).mapValue.fields });
const science = { schemaVersion: 1, week: '2026-W39', status: 'ideas_ready', production: [], items: Array.from({ length: 10 }, (_, i) => ({ id: String(i), title: 'title', hook: 'hook', why: 'why', script: 'script', sources: ['https://example.org/paper'], visualPlan: ['1','2','3','4','5'] })) };
const examples = {
  horoscope: { title: 'รายงาน', date: 'พฤหัสบดี 24 ก.ย. 2569', items: ['1','2','3','4','5'] },
  email: { title: 'รายงาน', date: 'พฤหัสบดี 24 ก.ย. 2569', items: ['ยังไม่มีอีเมลใหม่'], count: 0 },
  daily: { title: 'รายงาน', date: 'พฤหัสบดี 24 ก.ย. 2569', items: ['ไม่มีข่าวใหม่ภายใน 48 ชม.'] },
  todo: { count: 0, dataJson: JSON.stringify({ updatedAt: '2026-09-24', sections: [{ id: 'inbox', name: 'Inbox' }], items: [] }) },
  manga: { checkedAt: now.toISOString(), dataJson: JSON.stringify({ updatedAt: '2026-01-01', series: ['One Piece','Dandadan','Versus'].map(title => ({ title, latest: 1, next: 2, releasedAt: '2026-01-01', nextAt: null, source: 'publisher', url: 'https://example.org', cadence: 'monthly' })) }) },
  article: { dataJson: JSON.stringify({ entries: Array.from({ length: 3 }, (_, i) => ({ id: String(i), week: '2026-W39', date: '2026-09-21', displayDate: 'สัปดาห์นี้', category: 'กระดาษ', title: 'title', hook: 'hook', audience: 'audience', why: 'why', channel: 'web', status: 'selected', outline: ['1','2','3','4','5'], keywords: ['1','2','3'] })) }) },
  science: { dataJson: JSON.stringify(science) },
};
test('Bangkok midnight and ISO year boundary', () => {
  assert.equal(bangkokDate(now), '2026-09-24');
  assert.equal(bangkokDate(new Date('2026-09-23T16:59:59Z')), '2026-09-23');
  assert.equal(isoWeek('2021-01-01'), '2020-W53');
  assert.equal(isoWeek('2024-12-30'), '2025-W01');
});
for (const r of registry) test(`${r.key}: complete content fresh, partial status stale, old content stale`, () => {
  assert.equal(evaluate(r, raw(examples[r.key]), now).fresh, true);
  assert.equal(evaluate(r, raw({ status: 'working', checkedAt: now.toISOString() }), now).fresh, false);
  assert.equal(evaluate(r, raw(examples[r.key]), new Date('2026-10-05T01:00:00Z')).fresh, false);
});
test('blocked, missing script, duplicate IDs, incomplete article and unknown todo section are stale', () => {
  const r = registry.find(r => r.key === 'science');
  for (const batch of [{ ...science, status: 'blocked' }, { ...science, items: science.items.slice(1) }, { ...science, items: science.items.map(i => ({ ...i, id: 'same' })) }, { ...science, items: science.items.map(i => ({ ...i, script: '' })) }]) assert.equal(evaluate(r, raw({ dataJson: JSON.stringify(batch) }), now).fresh, false);
  assert.equal(evaluate(registry.find(r => r.key === 'article'), raw({ dataJson: '{"entries":[]}' }), now).fresh, false);
  assert.equal(evaluate(registry.find(r => r.key === 'todo'), raw({ count: 1, dataJson: JSON.stringify({ updatedAt: '2026-09-24', sections: [{ id: 'inbox', name: 'Inbox' }], items: [{ id: '1', section: 'missing', title: 'task', when: 'today', repeat: false, due: null }] }) }), now).fresh, false);
});
test('404 is stale; HTTP, network, malformed JSON and missing updateTime fail closed', async () => {
  const r = registry[0];
  assert.equal((await checkRoutine(r, async () => ({ status: 404 }), now)).fresh, false);
  for (const fetcher of [async () => { throw Error('offline'); }, async () => ({ status: 403, ok: false }), async () => ({ ok: true, json: async () => { throw Error('invalid JSON'); } }), async () => ({ ok: true, json: async () => ({}) }), async () => ({ ok: true, json: async () => raw({ dataJson: '{broken' }) })]) assert.equal((await checkRoutine(r, fetcher, now)).fresh, null);
});
function cli(script, args, responses) {
  const code = `let queue=${JSON.stringify(responses)};globalThis.fetch=async(url,options={})=>{ console.error(JSON.stringify({method:options.method||'GET',url:String(url)}));const r=queue.shift();if(!r)throw Error('unexpected fetch');return {status:r.status,ok:r.status>=200&&r.status<300,json:async()=>r.body,text:async()=>JSON.stringify(r.body)}};process.argv=['node',${JSON.stringify(fileURLToPath(new URL(script, import.meta.url)))},...${JSON.stringify(args)}];await import(${JSON.stringify(new URL(script, import.meta.url).href)});`;
  return spawnSync(process.execPath, ['--input-type=module', '-e', code], { encoding: 'utf8' });
}
test('freshness CLI exits 0/10/1 and --all JSONL/error priority', () => {
  // CLI uses real date, so construct the report date from Bangkok today.
  const today = new Date();
  const parts = new Intl.DateTimeFormat('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short', year: 'numeric' }).format(today).replace('พ.ศ. ', '');
  const fresh = cli('./routine-freshness.mjs', ['daily'], [{ status: 200, body: raw({ title: 'news', date: parts, items: ['news'] }) }]);
  assert.equal(fresh.status, 0, fresh.stdout + fresh.stderr);
  assert.equal(cli('./routine-freshness.mjs', ['daily'], [{ status: 404 }]).status, 10);
  assert.equal(cli('./routine-freshness.mjs', ['daily'], [{ status: 500 }]).status, 1);
  const all = cli('./routine-freshness.mjs', ['--all'], registry.map((_, i) => ({ status: i === 3 ? 403 : 404 })));
  assert.equal(all.status, 1); assert.equal(all.stdout.trim().split('\n').length, 7);
  assert.equal(cli('./routine-freshness.mjs', ['--all'], registry.map(() => ({ status: 404 }))).status, 10);
});
test('Science GET/precondition, caller snapshot, dry-run and no retry on conflicts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'routine-test-'));
  try {
    const input = join(dir, 'batch.json'); writeFileSync(input, JSON.stringify(science));
    for (const response of [{ status: 404 }, { status: 200, body: { updateTime: stamp } }]) {
      const r = cli('./push-science-video.mjs', [input, '--dry-run'], [response]);
      assert.equal(r.status, 0, r.stderr);
      const request = JSON.parse(r.stdout), url = new URL(request.url);
      assert.equal(url.searchParams.get(response.status === 404 ? 'currentDocument.exists' : 'currentDocument.updateTime'), response.status === 404 ? 'false' : stamp);
      assert.equal(r.stderr.trim().split('\n').length, 1); // GET only
      assert.equal(url.searchParams.getAll('updateMask.fieldPaths').length, 5);
    }
    const dry = cli('./push-science-video.mjs', [input, '--expect-update-time', stamp, '--dry-run'], []);
    assert.equal(dry.status, 0); assert.equal(dry.stderr, '');
    for (const status of [400, 409, 412]) {
      const r = cli('./push-science-video.mjs', [input, '--expect-update-time', stamp], [{ status, body: { error: { status: 'FAILED_PRECONDITION' } } }]);
      assert.equal(r.status, 1); assert.match(r.stderr, /ไม่ retry/);
      assert.equal(r.stderr.split('\n').filter(l => l.startsWith('{')).length, 1);
      assert.match(r.stderr, /PATCH/); // No GET refresh and no second PATCH
    }
    const missing = cli('./push-science-video.mjs', [input, '--expect-update-time', 'missing'], [{ status: 200, body: {} }]);
    assert.equal(missing.status, 0); assert.match(missing.stderr, /currentDocument.exists=false/);
    for (const response of [{ status: 403 }, { status: 200, body: {} }]) assert.equal(cli('./push-science-video.mjs', [input], [response]).status, 1);
    assert.equal(cli('./push-science-video.mjs', [input, '--expect-update-time', 'bad'], []).status, 1);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test('registry and prompts have matching gates, schedules and privacy boundaries', () => {
  assert.deepEqual(registry.map(r => r.key), ['horoscope','todo','email','manga','daily','article','science']);
  for (const r of registry) {
    const prompt = readFileSync(new URL(`../${r.promptFile}`, import.meta.url), 'utf8');
    assert.ok(prompt.startsWith(`รัน \`node scripts/routine-freshness.mjs ${r.key}\``));
    assert.match(prompt, /common.md/); assert.match(prompt, /snapshot/);
    assert.equal(r.timezone, 'Asia/Bangkok'); assert.ok(r.freshness.reason);
  }
  for (const [key, connector] of [['email','Gmail'],['todo','Todoist']]) assert.match(readFileSync(new URL(`../routines/fallback/${key}.md`, import.meta.url), 'utf8'), new RegExp(`fallback ต้องการ connector ${connector}`));
});
test('shared prompt writer encodes snapshot, preserves mask, verifies readback and never retries', () => {
  const dir = mkdtempSync(join(tmpdir(), 'routine-writer-test-'));
  const snippet = readFileSync(new URL('../routines/fallback/common.md', import.meta.url), 'utf8').split('```python\n')[1].split('```')[0];
  try {
    const snapshotPath = join(dir, 'snapshot.json'), fieldsPath = join(dir, 'fields.json');
    writeFileSync(fieldsPath, JSON.stringify({ fields: { title: { stringValue: 'test' } } }));
    for (const expected of [stamp, null]) for (const status of [200, 400, 409, 412]) {
      writeFileSync(snapshotPath, JSON.stringify({ key: 'daily', doc: 'agents/daily', fresh: false, updateTime: expected, reason: expected ? 'stale' : 'document missing (404)' }));
      const harness = `import io,json,sys,urllib.request,urllib.error\nsys.argv=['write.py','daily',${JSON.stringify(snapshotPath)},${JSON.stringify(fieldsPath)}]\ncalls=[]\ndef fake(request,timeout):\n    url=request.full_url if hasattr(request,'full_url') else request\n    method=request.get_method() if hasattr(request,'get_method') else 'GET'\n    print('CALL',method,url)\n    calls.append(method)\n    if ${status} != 200: raise urllib.error.HTTPError(url,${status},'FAILED_PRECONDITION',{},io.BytesIO(b''))\n    return io.BytesIO(json.dumps({'updateTime':'same','fields':{'title':{'stringValue':'test'}}}).encode())\nurllib.request.urlopen=fake\nexec(${JSON.stringify(snippet)})`;
      const result = spawnSync('python3', ['-c', harness], { encoding: 'utf8' });
      assert.equal(result.status, status === 200 ? 0 : 1, result.stderr);
      assert.match(result.stdout, expected ? /currentDocument.updateTime=2026-09-23T16%3A00%3A00.123456Z/ : /currentDocument.exists=false/);
      assert.match(result.stdout, /updateMask.fieldPaths=title/);
      assert.equal(result.stdout.split('\n').filter(l => l.startsWith('CALL PATCH')).length, 1);
      assert.equal(result.stdout.split('\n').filter(l => l.startsWith('CALL GET')).length, status === 200 ? 1 : 0);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
