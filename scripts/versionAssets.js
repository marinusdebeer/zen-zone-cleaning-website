#!/usr/bin/env node
/**
 * Post-build: append a version query (?v=<id>) to image URLs in built assets
 * so browsers fetch fresh files after each deploy.
 *
 * Targets: build files (.html, .css, .js)
 * Matches: /images/*.avif|webp (already our optimized formats)
 */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

function getBuildId() {
  try {
    const sha = child_process.execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    if (sha) return sha;
  } catch (_) {}
  return String(Date.now());
}

function* walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(full);
    } else {
      yield full;
    }
  }
}

function shouldEdit(file) {
  return /(\.html|\.css|\.js)$/.test(file);
}

function versionUrls(content, buildId) {
  // Match /images/<name>.avif|webp optionally with existing query
  const re = /(\/images\/[\w\-./]+\.(?:avif|webp))(\?[^\s"')]*)?/g;
  return content.replace(re, (m, url, query) => {
    if (query && /([?&])v=/.test(query)) return m; // already versioned
    const sep = query ? '&' : '?';
    return `${url}${query || ''}${sep}v=${buildId}`;
  });
}

function run() {
  const buildDir = path.resolve(process.cwd(), 'build');
  if (!fs.existsSync(buildDir)) {
    console.log('[version] No build/ directory; skipping.');
    return;
  }
  const buildId = getBuildId();
  let edited = 0;
  for (const file of walkFiles(buildDir)) {
    if (!shouldEdit(file)) continue;
    const orig = fs.readFileSync(file, 'utf8');
    const next = versionUrls(orig, buildId);
    if (next !== orig) {
      fs.writeFileSync(file, next);
      edited++;
    }
  }
  console.log(`[version] Appended ?v=${buildId} to image URLs in ${edited} files.`);
}

run();


