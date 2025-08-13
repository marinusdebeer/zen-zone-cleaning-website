#!/usr/bin/env node
/**
 * Purge Cloudflare cache after a deploy.
 *
 * Required env vars:
 * - CF_ZONE_ID: Cloudflare Zone ID
 * - CF_API_TOKEN: API token with Zone.Cache Purge permission
 *
 * Optional env vars:
 * - CF_PURGE_URLS: Comma-separated list of absolute URLs to purge instead of purge_everything
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env if available
try {
  // Prefer dotenv if installed
  require('dotenv').config();
} catch (_) {
  // Lightweight fallback parser so we don't require an extra dependency
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#') && line.includes('='))
        .forEach((line) => {
          const idx = line.indexOf('=');
          const key = line.slice(0, idx).trim();
          let value = line.slice(idx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) process.env[key] = value;
        });
    }
  } catch (_) {}
}

function exitWithError(message, error) {
  console.error(`\n[Cloudflare Purge] ERROR: ${message}`);
  if (error) {
    console.error(error.stack || error.toString());
  }
  process.exit(1);
}

function postJson({ hostname, path, headers, body }) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data || '{}');
            resolve({ statusCode: res.statusCode, body: json });
          } catch (e) {
            resolve({ statusCode: res.statusCode, body: data });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

async function run() {
  const zoneId = process.env.CF_ZONE_ID;
  const token = process.env.CF_API_TOKEN;
  const purgeUrls = (process.env.CF_PURGE_URLS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!zoneId) {
    exitWithError('Missing CF_ZONE_ID environment variable.');
  }
  if (!token) {
    exitWithError('Missing CF_API_TOKEN environment variable.');
  }

  const body = purgeUrls.length > 0 ? { files: purgeUrls } : { purge_everything: true };

  console.log('\n[Cloudflare Purge] Starting…');
  if (purgeUrls.length > 0) {
    console.log(`[Cloudflare Purge] Purging specific URLs (count: ${purgeUrls.length})`);
  } else {
    console.log('[Cloudflare Purge] Purging entire cache for zone');
  }

  const { statusCode, body: response } = await postJson({
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/purge_cache`,
    headers: { Authorization: `Bearer ${token}` },
    body,
  });

  const ok = statusCode && statusCode >= 200 && statusCode < 300 && response && response.success !== false;

  if (!ok) {
    exitWithError(`Cloudflare responded with status ${statusCode}.`, response);
  }

  const ids = (response && response.result && response.result.id) || null;
  console.log('[Cloudflare Purge] Success ✅');
  if (ids) console.log(`[Cloudflare Purge] Job ID: ${ids}`);
}

run().catch((err) => exitWithError('Unhandled error while purging cache.', err));


