import { randomUUID } from 'node:crypto';
import { mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DAY = 24 * 60 * 60 * 1000;
const DEFAULT_OUTPUT = fileURLToPath(new URL('../src/data/visitor-stats.json', import.meta.url));
const isCount = (value) => Number.isSafeInteger(value) && value >= 0;

/** Keep only the aggregate fields intentionally published in the footer. */
export function createSnapshot(stats, metrics, startAt, endAt, updatedAt) {
  if (!stats || !isCount(stats.pageviews) || !isCount(stats.visitors)) {
    throw new Error('Umami returned invalid page-view or visitor totals.');
  }
  if (!Array.isArray(metrics) || metrics.length >= 500) {
    throw new Error('Umami returned invalid or potentially incomplete country data.');
  }

  const countries = new Map();
  let unknownCountryVisitors = 0;
  for (const row of metrics) {
    if (!row || !isCount(row.y) || (row.x !== null && typeof row.x !== 'string')) {
      throw new Error('Umami returned an invalid country metric.');
    }
    const code = (row.x ?? '').trim().toUpperCase();
    if (!code || code === 'ZZ') {
      unknownCountryVisitors += row.y;
    } else {
      if (!/^[A-Z]{2}$/.test(code) || countries.has(code)) {
        throw new Error('Umami returned an invalid or duplicate country code.');
      }
      countries.set(code, row.y);
    }
  }

  return {
    version: 1,
    source: 'umami',
    period: { startAt: new Date(startAt).toISOString(), endAt: new Date(endAt).toISOString() },
    updatedAt: new Date(updatedAt).toISOString(),
    pageviews: stats.pageviews,
    visitors: stats.visitors,
    countries: [...countries]
      .filter(([, visitors]) => visitors > 0)
      .map(([code, visitors]) => ({ code, visitors }))
      .sort((a, b) => b.visitors - a.visitors || a.code.localeCompare(b.code)),
    unknownCountryVisitors,
  };
}

export async function syncVisitorStats({
  env = process.env,
  fetchImpl = fetch,
  now = new Date(),
  outputPath = DEFAULT_OUTPUT,
} = {}) {
  const key = env.UMAMI_API_KEY?.trim();
  const websiteId = (env.UMAMI_WEBSITE_ID || env.PUBLIC_UMAMI_WEBSITE_ID)?.trim();
  const region = env.UMAMI_API_REGION?.trim();
  if (!key || !websiteId) {
    throw new Error('Set UMAMI_API_KEY and UMAMI_WEBSITE_ID before syncing visitor statistics.');
  }
  if (region && region !== 'us' && region !== 'eu') {
    throw new Error('UMAMI_API_REGION must be us or eu, or omitted for the account default.');
  }
  if (!Number.isFinite(now.getTime())) throw new Error('The snapshot date is invalid.');

  // Thirty complete UTC days. Store an exclusive end; Umami receives an inclusive end.
  const endAt = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const startAt = endAt - 30 * DAY;
  const apiBase = `https://api.umami.is/v1${region ? `/${region}` : ''}`;
  const query = new URLSearchParams({ startAt: String(startAt), endAt: String(endAt - 1) });
  const path = `${apiBase}/websites/${encodeURIComponent(websiteId)}`;

  async function request(endpoint) {
    let response;
    try {
      response = await fetchImpl(`${path}/${endpoint}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${key}` },
        redirect: 'error',
        signal: AbortSignal.timeout(20_000),
      });
    } catch {
      throw new Error('The Umami request failed or timed out.');
    }
    if (!response.ok) throw new Error(`The Umami API returned HTTP ${response.status}.`);
    try {
      return await response.json();
    } catch {
      throw new Error('The Umami API returned invalid JSON.');
    }
  }

  const responses = await Promise.allSettled([
    request(`stats?${query}`),
    request(`metrics?${query}&type=country&limit=500`),
  ]);
  const failed = responses.find((result) => result.status === 'rejected');
  if (failed) throw failed.reason;

  const snapshot = createSnapshot(responses[0].value, responses[1].value, startAt, endAt, now);
  await mkdir(dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, { flag: 'wx' });
    await rename(temporaryPath, outputPath);
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
  return snapshot;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const snapshot = await syncVisitorStats();
    console.info(`Updated the visitor snapshot through ${snapshot.period.endAt.slice(0, 10)} (exclusive, UTC).`);
  } catch (error) {
    console.error(`Visitor statistics were not updated; the previous file was preserved. ${error.message}`);
    process.exitCode = 1;
  }
}
