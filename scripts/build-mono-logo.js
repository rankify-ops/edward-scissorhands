const sharp = require('sharp');
/*
 * Monochrome logo files for the white theme. Plain grayscale leaves the brass
 * as a pale mid-grey that washes out on an off-white ground, so the levels are
 * pulled down after desaturating — the gold lands as dark ink and the crest
 * reads as a black mark.
 */
const LEVELS = [1.25, -60];

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
