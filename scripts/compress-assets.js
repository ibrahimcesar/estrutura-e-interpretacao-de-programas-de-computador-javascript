#!/usr/bin/env node

/**
 * Compress Assets Script
 * Compresses HTML, JS, CSS files in the build directory using gzip and brotli
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { pipeline } = require('stream');
const zlib = require('zlib');
const { glob } = require('glob');

const pipelineAsync = promisify(pipeline);

// Build directory
const BUILD_DIR = path.join(__dirname, '..', 'build');

// File patterns to compress
const COMPRESS_PATTERNS = [
  '**/*.html',
  '**/*.js',
  '**/*.css',
  '**/*.json',
  '**/*.svg',
  '**/*.xml',
];

// Minimum file size to compress (in bytes) - skip very small files
const MIN_SIZE = 1024; // 1KB

/**
 * Compress a file with gzip
 */
async function compressGzip(filePath) {
  const gzipPath = `${filePath}.gz`;
  const source = fs.createReadStream(filePath);
  const destination = fs.createWriteStream(gzipPath);
  const gzip = zlib.createGzip({ level: 9 }); // Maximum compression

  await pipelineAsync(source, gzip, destination);
  return gzipPath;
}

/**
 * Compress a file with brotli
 */
async function compressBrotli(filePath) {
  const brotliPath = `${filePath}.br`;
  const source = fs.createReadStream(filePath);
  const destination = fs.createWriteStream(brotliPath);
  const brotli = zlib.createBrotliCompress({
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // Maximum compression
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    },
  });

  await pipelineAsync(source, brotli, destination);
  return brotliPath;
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Main compression function
 */
async function compressAssets() {
  console.log('🗜️  Starting asset compression...\n');

  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found:', BUILD_DIR);
    process.exit(1);
  }

  try {
    // Find all files to compress
    const files = await glob(COMPRESS_PATTERNS, {
      cwd: BUILD_DIR,
      absolute: true,
      nodir: true,
    });

    console.log(`📦 Found ${files.length} files to process\n`);

    let compressedCount = 0;
    let skippedCount = 0;
    let totalOriginalSize = 0;
    let totalGzipSize = 0;
    let totalBrotliSize = 0;

    // Compress each file
    for (const file of files) {
      const fileSize = getFileSize(file);

      // Skip small files
      if (fileSize < MIN_SIZE) {
        skippedCount++;
        continue;
      }

      const relativePath = path.relative(BUILD_DIR, file);

      try {
        // Compress with both gzip and brotli
        const [gzipPath, brotliPath] = await Promise.all([
          compressGzip(file),
          compressBrotli(file),
        ]);

        const gzipSize = getFileSize(gzipPath);
        const brotliSize = getFileSize(brotliPath);

        totalOriginalSize += fileSize;
        totalGzipSize += gzipSize;
        totalBrotliSize += brotliSize;

        const gzipRatio = ((1 - gzipSize / fileSize) * 100).toFixed(1);
        const brotliRatio = ((1 - brotliSize / fileSize) * 100).toFixed(1);

        console.log(`✅ ${relativePath}`);
        console.log(`   Original: ${formatBytes(fileSize)}`);
        console.log(`   Gzip: ${formatBytes(gzipSize)} (-${gzipRatio}%)`);
        console.log(`   Brotli: ${formatBytes(brotliSize)} (-${brotliRatio}%)\n`);

        compressedCount++;
      } catch (error) {
        console.error(`❌ Failed to compress ${relativePath}:`, error.message);
      }
    }

    // Summary
    console.log('📊 Compression Summary');
    console.log('═'.repeat(50));
    console.log(`Files compressed: ${compressedCount}`);
    console.log(`Files skipped (< ${formatBytes(MIN_SIZE)}): ${skippedCount}`);
    console.log(`\nOriginal size: ${formatBytes(totalOriginalSize)}`);
    console.log(`Gzip total: ${formatBytes(totalGzipSize)} (-${((1 - totalGzipSize / totalOriginalSize) * 100).toFixed(1)}%)`);
    console.log(`Brotli total: ${formatBytes(totalBrotliSize)} (-${((1 - totalBrotliSize / totalOriginalSize) * 100).toFixed(1)}%)`);
    console.log('\n✨ Compression complete!');

  } catch (error) {
    console.error('❌ Error during compression:', error);
    process.exit(1);
  }
}

// Run the script
compressAssets();
