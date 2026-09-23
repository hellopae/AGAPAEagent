#!/usr/bin/env node
// GET only. stdout is JSONL; 0=all fresh, 10=at least one stale, 1=any error.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const PROJECT = 'agapae-studio';
const KEY = 'AIzaSyCtIZVYmibm4Rwb878iEdnxHjvpVcLfs2E';
export const registry = JSON.parse(readFileSync(new URL('../routines/fallback.json', import.meta.url), 'utf8'));
const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
export function bangkokDate(now) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
export function isoWeek(day) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const year = d.getUTCFullYear();
  const week = Math.ceil(((d - new Date(Date.UTC(year, 0, 1))) / 86400000 + 1) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}
function decode(v) {
  if ('stringValue' in v) return v.stringValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if (v.arrayValue) return (v.arrayValue.values || []).map(decode);
  if (v.mapValue) return decodeFields(v.mapValue.fields || {});
  throw new Error('unsupported Firestore value');
}
const decodeFields = f => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, decode(v)]));
const text = v => typeof v === 'string' && v.trim().length > 0;
const list = (v, min, max, check = text) => Array.isArray(v) && v.length >= min && v.length <= max && v.every(check);
const unique = a => new Set(a).size === a.length;
function thaiDay(value) {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^(?:\S+\s+)?(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!match || !months.includes(match[2])) return null;
  return `${Number(match[3]) - 543}-${String(months.indexOf(match[2]) + 1).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
}
export function evaluate(routine, raw, now = new Date()) {
  const fields = decodeFields(raw.fields || {});
  let data = fields;
  if (fields.dataJson !== undefined) {
    data = JSON.parse(fields.dataJson); // Invalid JSON must be an error, never permission to overwrite.
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('dataJson must be an object');
  }
  const today = bangkokDate(now), week = isoWeek(today);
  let fresh = false;
  switch (routine.freshness.strategy) {
    case 'thai-report':
      fresh = thaiDay(fields.date) === today && text(fields.title) && list(fields.items, routine.key === 'horoscope' ? 5 : 1, routine.key === 'horoscope' ? 5 : 6);
      if (routine.key === 'email') fresh &&= Number.isInteger(fields.count) && fields.count >= 0;
      break;
    case 'todo': {
      const sections = data.sections, items = data.items;
      fresh = data.updatedAt === today && list(sections, 1, Infinity, s => s && text(s.id) && text(s.name)) && sections[0].id === 'inbox'
        && unique(sections.map(s => s.id)) && list(items, 0, Infinity, i => i && text(i.id) && text(i.title) && text(i.when) && sections.some(s => s.id === i.section) && typeof i.repeat === 'boolean' && (i.due === null || /^\d{4}-\d{2}-\d{2}$/.test(i.due)))
        && unique(items.map(i => i.id)) && fields.count === items.length;
      break;
    }
    case 'manga': {
      const checked = new Date(fields.checkedAt);
      fresh = typeof fields.checkedAt === 'string' && Number.isFinite(+checked) && bangkokDate(checked) === today
        && list(data.series, 3, 3, (s) => s && text(s.title) && Number.isInteger(s.latest) && s.latest > 0 && Number.isInteger(s.next) && s.next > s.latest && text(s.releasedAt) && (s.nextAt === null || text(s.nextAt)) && text(s.source) && text(s.url) && text(s.cadence))
        && data.series.map(s => s.title).join('|') === 'One Piece|Dandadan|Versus';
      break;
    }
    case 'article': {
      const entries = Array.isArray(data.entries) ? data.entries.filter(e => e && e.week === week) : [];
      fresh = list(entries, 3, 3, e => ['id','date','displayDate','category','title','hook','audience','why','channel','status'].every(k => text(e[k])) && list(e.outline, 5, 7) && list(e.keywords, 3, 5)) && unique(entries.map(e => e.id));
      break;
    }
    case 'science':
      fresh = data.schemaVersion === 1 && data.week === week && ['ideas_ready','selected','voice_ready','video_ready','review','approved','scheduled','published'].includes(data.status)
        && Array.isArray(data.production) && list(data.items, 10, 10, i => i && ['id','title','hook','why','script'].every(k => text(i[k])) && list(i.sources, 1, Infinity, s => typeof s === 'string' && /^https?:\/\//.test(s)) && list(i.visualPlan, 5, 8, s => text(s) || (s && typeof s === 'object')))
        && unique(data.items.map(i => i.id));
      break;
    default: throw new Error('unknown freshness strategy');
  }
  return { fresh: Boolean(fresh), reason: fresh ? `complete content for ${routine.cadence === 'weekly' ? week : today}` : `missing/stale/incomplete content for ${routine.cadence === 'weekly' ? week : today}` };
}
export async function checkRoutine(routine, fetcher = fetch, now = new Date()) {
  const result = { key: routine.key, doc: routine.firestoreDoc, fresh: null, reason: '', updateTime: null };
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/${routine.firestoreDoc}?key=${KEY}`;
    const res = await fetcher(url, { signal: AbortSignal.timeout(15000) });
    if (res.status === 404) return { ...result, fresh: false, reason: 'document missing (404)' };
    if (!res.ok) throw new Error(`GET HTTP ${res.status}`);
    const raw = await res.json();
    if (!raw || !text(raw.updateTime)) throw new Error('document missing updateTime');
    result.updateTime = raw.updateTime;
    return { ...result, ...evaluate(routine, raw, now) };
  } catch (error) { return { ...result, reason: `error: ${error.message}${error.cause?.code ? ` (${error.cause.code})` : ''}` }; }
}
export async function main(args) {
  const selected = args.length === 1 && (args[0] === '--all' ? registry : registry.filter(r => r.key === args[0]));
  if (!selected || !selected.length) {
    console.log(JSON.stringify({ key: args[0] || null, doc: null, fresh: null, reason: 'error: use <key> or --all', updateTime: null }));
    return 1;
  }
  const results = await Promise.all(selected.map(r => checkRoutine(r)));
  for (const result of results) console.log(JSON.stringify(result));
  return results.some(r => r.fresh === null) ? 1 : results.some(r => !r.fresh) ? 10 : 0;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = await main(process.argv.slice(2));
