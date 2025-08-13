#!/usr/bin/env node
/**
 * Batch convert public images to modern formats (WebP/AVIF).
 *
 * - Scans public/images recursively
 * - Converts .png/.jpg/.jpeg to .avif next to originals
 * - For a small allow‑list (critical assets + gallery), also outputs .webp fallbacks
 * - Skips if target exists and is newer than source
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('\n[images] Missing dependency: sharp');
  console.error('Run: npm i -D sharp');
  process.exit(1);
}

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

// Generate WebP fallbacks only for critical assets and gallery
const SHOULD_ALSO_WEBP = (filePath) => {
  const p = filePath.replace(/\\/g, '/');
  if (p.includes('/public/images/gallery/')) return true;
  return /\/public\/images\/(hero|logo|moose_in_suit|peaking_moose|cleaning_background(?:_dark)?|map(?:_dark)?|reviews(?:_dark)?|bucket|box|broom|house|building)\.(png|jpe?g)$/i.test(
    p
  );
};

const VALID_SRC_EXT = new Set(['.png', '.jpg', '.jpeg', '.JPG', '.JPEG']);

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip backup or hidden folders (e.g., _png_backup, backup-images, backup images)
      const nameLower = entry.name.toLowerCase();
      if (entry.name.startsWith('_') || nameLower.startsWith('backup')) continue;
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function isNewer(source, target) {
  try {
    const s = fs.statSync(source);
    const t = fs.statSync(target);
    return s.mtimeMs > t.mtimeMs + 1000; // 1s fuzz
  } catch (_) {
    return true; // target missing or error → treat as needs build
  }
}

async function convertOne(srcPath) {
  const ext = path.extname(srcPath);
  if (!VALID_SRC_EXT.has(ext)) return;

  const base = srcPath.slice(0, -ext.length);
  const outAvif = `${base}.avif`;
  const outWebp = `${base}.webp`;

  const img = sharp(srcPath);
  const meta = await img.metadata();
  const width = meta.width || null;

  // Reasonable quality defaults
  const avifOptions = { quality: 55, effort: 4 }; // avif compresses more
  const webpOptions = { quality: 80, effort: 4 };

  if (isNewer(srcPath, outAvif)) {
    await img.clone().toFormat('avif', avifOptions).toFile(outAvif);
    console.log(`[images] avif  ${path.relative(ROOT, outAvif)}${width ? `  (${width}w)` : ''}`);
  }

  if (SHOULD_ALSO_WEBP(srcPath) && isNewer(srcPath, outWebp)) {
    await img.clone().toFormat('webp', webpOptions).toFile(outWebp);
    console.log(`[images] webp  ${path.relative(ROOT, outWebp)}${width ? `  (${width}w)` : ''}`);
  }
}

async function run() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('[images] No public/images directory found. Skipping.');
    return;
  }
  const files = Array.from(walk(IMAGES_DIR));
  await Promise.all(
    files.map((f) => convertOne(f).catch((e) => console.error('[images] Failed for', f, e.message)))
  );
  console.log('[images] Done.');
}

run();


