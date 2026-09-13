const sharp = require('sharp');
/*
 * Monochrome logo files for the white theme, which keeps the near-black ground
 * and swaps the brass for white. Plain grayscale leaves the gold as a muddy
 * mid-grey on black, so the levels are lifted after desaturating — the gold
 * lands close to white and reads as the same accent as the rest of the page.
 */
const LEVELS = [1.35, 30];

(async () => {
  const jobs = [
    ['assets-raw/logo-horizontal-source.png', 'logo-wide-mono', [1200, 560]],
    ['public/img/logo-source.png', 'logo-mono', [900, 420]],
  ];
  for (const [src, name, widths] of jobs) {
    const t = await sharp(src).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
    const [big, small] = widths;
    await sharp(t.data).grayscale().linear(...LEVELS).resize({ width: big })
      .png({ compressionLevel: 9 }).toFile(`public/img/${name}.png`);
    await sharp(t.data).grayscale().linear(...LEVELS).resize({ width: small })
      .png({ compressionLevel: 9 }).toFile(`public/img/${name}-sm.png`);
    console.log(`${name}: ${t.info.width}x${t.info.height} -> ${big}px, ${small}px`);
  }
})();
